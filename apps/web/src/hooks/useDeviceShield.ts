import * as React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ShieldBlockableService,
  ShieldPlatform,
  buildRecommendedShieldPolicy,
  type DeviceShieldDTO,
  type UpdateDeviceShieldInput,
} from '@alongside/shared';
import {
  getChildDeviceShield,
  getChildDeviceShieldStatus,
  updateChildDeviceShield,
  generateClientMobileConfigXml,
  triggerMobileConfigDownload,
  setCustomNextDnsProfileId,
} from '@/lib/api/deviceShield';

export interface UseDeviceShieldOptions {
  childId?: string | null;
  childName?: string;
  childAge?: number;
  initialPlatform?: ShieldPlatform;
  initialData?: DeviceShieldDTO;
}

export function useDeviceShield({
  childId,
  childName = 'Child',
  childAge = 10,
  initialPlatform = ShieldPlatform.APPLE_IOS,
  initialData,
}: UseDeviceShieldOptions) {
  const queryClient = useQueryClient();
  const [copiedHostname, setCopiedHostname] = React.useState(false);
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  const queryKey = React.useMemo(() => ['device-shield', childId], [childId]);
  const statusQueryKey = React.useMemo(
    () => ['device-shield-status', childId],
    [childId]
  );

  const {
    data: shield,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => {
      if (!childId) {
        return Promise.reject(new Error('No child specified'));
      }
      return getChildDeviceShield(childId, childAge, childName);
    },
    enabled: Boolean(childId),
    initialData,
    staleTime: 60 * 1000,
  });

  const { data: liveHealth } = useQuery({
    queryKey: statusQueryKey,
    queryFn: () => {
      if (!childId) {
        return Promise.reject(new Error('No child specified'));
      }
      return getChildDeviceShieldStatus(childId);
    },
    enabled: Boolean(childId && shield?.isProvisioned),
    refetchInterval: 30 * 1000,
  });

  // Effective shield combining cached shield with live health updates
  const effectiveShield: DeviceShieldDTO | undefined = React.useMemo(() => {
    if (!shield) return undefined;
    if (!liveHealth) return shield;
    return {
      ...shield,
      health: liveHealth,
    };
  }, [shield, liveHealth]);

  const mutation = useMutation({
    mutationFn: (input: UpdateDeviceShieldInput) => {
      if (!childId) throw new Error('No child selected');
      return updateChildDeviceShield(childId, input);
    },
    onMutate: async (newInput: UpdateDeviceShieldInput) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<DeviceShieldDTO>(queryKey);

      if (previous) {
        const optimistic: DeviceShieldDTO = {
          ...previous,
          platform: newInput.platform,
          blockAdultContent: newInput.blockAdultContent,
          safeSearch: newInput.safeSearch,
          youtubeRestrictedMode: newInput.youtubeRestrictedMode,
          blockBypass: newInput.blockBypass,
          blockedServices: newInput.blockedServices,
          bedtimeServices: newInput.bedtimeServices,
          bedtimeEnabled: newInput.bedtimeEnabled,
          bedtimeStart: newInput.bedtimeStart,
          bedtimeEnd: newInput.bedtimeEnd,
          timezone: newInput.timezone,
        };
        queryClient.setQueryData<DeviceShieldDTO>(queryKey, optimistic);
      }

      return { previous };
    },
    onSuccess: (data: DeviceShieldDTO) => {
      queryClient.setQueryData<DeviceShieldDTO>(queryKey, data);
    },
    onError: (_err, _newInput, context) => {
      // Only roll back if we have a valid previous state and no data in cache
      const current = queryClient.getQueryData<DeviceShieldDTO>(queryKey);
      if (!current && context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: statusQueryKey });
    },
  });

  const toInput = React.useCallback(
    (current: DeviceShieldDTO | undefined): UpdateDeviceShieldInput => {
      if (current) {
        return {
          platform: current.platform,
          blockAdultContent: current.blockAdultContent,
          safeSearch: current.safeSearch,
          youtubeRestrictedMode: current.youtubeRestrictedMode,
          blockBypass: current.blockBypass,
          blockedServices: current.blockedServices,
          bedtimeServices: current.bedtimeServices,
          bedtimeEnabled: current.bedtimeEnabled,
          bedtimeStart: current.bedtimeStart,
          bedtimeEnd: current.bedtimeEnd,
          timezone: current.timezone,
        };
      }
      return buildRecommendedShieldPolicy(childAge, 'UTC', initialPlatform);
    },
    [childAge, initialPlatform]
  );

  const setPlatform = React.useCallback(
    (platform: ShieldPlatform) => {
      const base = toInput(effectiveShield);
      if (base.platform === platform) return;
      mutation.mutate({ ...base, platform });
    },
    [effectiveShield, toInput, mutation]
  );

  const toggleCoreSetting = React.useCallback(
    (
      key:
        | 'blockAdultContent'
        | 'safeSearch'
        | 'youtubeRestrictedMode'
        | 'blockBypass'
    ) => {
      const base = toInput(effectiveShield);
      mutation.mutate({
        ...base,
        [key]: !base[key],
      });
    },
    [effectiveShield, toInput, mutation]
  );

  const toggleBlockedService = React.useCallback(
    (service: ShieldBlockableService) => {
      const base = toInput(effectiveShield);
      const isBlocked = base.blockedServices.includes(service);
      const nextBlocked = isBlocked
        ? base.blockedServices.filter((s) => s !== service)
        : [...base.blockedServices, service];

      mutation.mutate({
        ...base,
        blockedServices: nextBlocked,
      });
    },
    [effectiveShield, toInput, mutation]
  );

  const toggleBedtimeService = React.useCallback(
    (service: ShieldBlockableService) => {
      const base = toInput(effectiveShield);
      const isBedtime = base.bedtimeServices.includes(service);
      const nextBedtime = isBedtime
        ? base.bedtimeServices.filter((s) => s !== service)
        : [...base.bedtimeServices, service];

      mutation.mutate({
        ...base,
        bedtimeServices: nextBedtime,
      });
    },
    [effectiveShield, toInput, mutation]
  );

  const setBedtimeSchedule = React.useCallback(
    (enabled: boolean, start?: string, end?: string) => {
      const base = toInput(effectiveShield);
      mutation.mutate({
        ...base,
        bedtimeEnabled: enabled,
        bedtimeStart: start || base.bedtimeStart,
        bedtimeEnd: end || base.bedtimeEnd,
      });
    },
    [effectiveShield, toInput, mutation]
  );

  const setEnforcementMode = React.useCallback(
    (mode: 'scheduled' | '247') => {
      const base = toInput(effectiveShield);
      if (mode === '247') {
        const allBlocked = Array.from(
          new Set([...base.blockedServices, ...base.bedtimeServices])
        );
        mutation.mutate({
          ...base,
          blockedServices: allBlocked,
          bedtimeServices: [],
          bedtimeEnabled: true,
          bedtimeStart: '00:00',
          bedtimeEnd: '00:00',
        });
      } else {
        const fallbackStart =
          base.bedtimeStart === '00:00' ? '20:30' : base.bedtimeStart || '20:30';
        const fallbackEnd =
          base.bedtimeEnd === '00:00' ? '06:30' : base.bedtimeEnd || '06:30';
        mutation.mutate({
          ...base,
          bedtimeEnabled: true,
          bedtimeStart: fallbackStart,
          bedtimeEnd: fallbackEnd,
        });
      }
    },
    [effectiveShield, toInput, mutation]
  );

  const downloadProfile = React.useCallback(
    (childName: string) => {
      const cid = childId || 'child';
      const dohUrl =
        effectiveShield?.dohUrl ||
        `https://dns.nextdns.io/alongside-${cid.slice(0, 8)}`;
      const xml = generateClientMobileConfigXml({
        childName,
        childId: cid,
        dohUrl,
        serverAddresses: effectiveShield?.ipv4Servers,
      });

      triggerMobileConfigDownload(childName, xml);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);

      // Ensure shield is provisioned in local state / backend
      const base = toInput(effectiveShield);
      mutation.mutate(base);
    },
    [childId, effectiveShield, mutation, toInput]
  );

  const copyAndroidHostname = React.useCallback(async () => {
    const hostname =
      effectiveShield?.dotHostname ||
      `alongside-${(childId || 'child').slice(0, 8)}.dns.nextdns.io`;
    try {
      await navigator.clipboard.writeText(hostname);
      setCopiedHostname(true);
      setTimeout(() => setCopiedHostname(false), 2000);
    } catch {
      // Fallback for non-secure contexts
      setCopiedHostname(true);
      setTimeout(() => setCopiedHostname(false), 2000);
    }
  }, [effectiveShield?.dotHostname, childId]);

  const setCustomProfileId = React.useCallback(
    (profileId: string) => {
      if (!childId) return;
      const updated = setCustomNextDnsProfileId(childId, profileId);
      queryClient.setQueryData(queryKey, updated);
    },
    [childId, queryClient, queryKey]
  );

  return {
    shield: effectiveShield,
    isLoading,
    isSaving: mutation.isPending,
    isError,
    error,
    copiedHostname,
    downloadSuccess,
    refetch,
    setPlatform,
    toggleCoreSetting,
    toggleBlockedService,
    toggleBedtimeService,
    setBedtimeSchedule,
    setEnforcementMode,
    downloadProfile,
    copyAndroidHostname,
    setCustomProfileId,
  };
}
