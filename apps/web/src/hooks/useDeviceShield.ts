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
} from '@/lib/api/deviceShield';

export interface UseDeviceShieldOptions {
  childId?: string | null;
  childAge?: number;
  initialPlatform?: ShieldPlatform;
  initialData?: DeviceShieldDTO;
}

export function useDeviceShield({
  childId,
  childAge = 10,
  initialPlatform = ShieldPlatform.APPLE_IOS,
  initialData,
}: UseDeviceShieldOptions) {
  const queryClient = useQueryClient();
  const [copiedHostname, setCopiedHostname] = React.useState(false);

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
      return getChildDeviceShield(childId, childAge);
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
    onError: (_err, _newInput, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
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

  const copyAndroidHostname = React.useCallback(async () => {
    if (!effectiveShield?.dotHostname) return;
    try {
      await navigator.clipboard.writeText(effectiveShield.dotHostname);
      setCopiedHostname(true);
      setTimeout(() => setCopiedHostname(false), 2000);
    } catch {
      // Ignore clipboard write failures
    }
  }, [effectiveShield?.dotHostname]);

  return {
    shield: effectiveShield,
    isLoading,
    isSaving: mutation.isPending,
    isError,
    error,
    copiedHostname,
    refetch,
    setPlatform,
    toggleCoreSetting,
    toggleBlockedService,
    toggleBedtimeService,
    setBedtimeSchedule,
    copyAndroidHostname,
  };
}
