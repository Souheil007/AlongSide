import {
  buildRecommendedShieldPolicy,
  type DeviceShieldDTO,
  type DeviceShieldHealthDTO,
  type UpdateDeviceShieldInput,
} from '@alongside/shared';
import { apiClient, ApiClientError } from './client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function getAppleProfileDownloadUrl(enrollmentToken: string): string {
  return `${API_BASE_URL.replace(/\/$/, '')}/api/v1/devices/shield/profile/${enrollmentToken}`;
}

export function getShieldQrEndpointUrl(enrollmentToken: string): string {
  return `${API_BASE_URL.replace(/\/$/, '')}/api/v1/devices/shield/qr/${enrollmentToken}`;
}

function buildFallbackShield(childId: string, age = 10): DeviceShieldDTO {
  const policy = buildRecommendedShieldPolicy(age);
  return {
    id: null,
    childId,
    platform: policy.platform,
    providerType: 'NEXTDNS',
    isProvisioned: false,
    dohUrl: null,
    dotHostname: null,
    ipv4Servers: ['45.90.28.0', '45.90.30.0'],
    enrollmentToken: null,
    appleProfileDownloadUrl: null,
    enrollmentQrUrl: null,
    blockAdultContent: policy.blockAdultContent,
    safeSearch: policy.safeSearch,
    youtubeRestrictedMode: policy.youtubeRestrictedMode,
    blockBypass: policy.blockBypass,
    blockedServices: policy.blockedServices,
    bedtimeServices: policy.bedtimeServices,
    bedtimeEnabled: policy.bedtimeEnabled,
    bedtimeStart: policy.bedtimeStart,
    bedtimeEnd: policy.bedtimeEnd,
    timezone: policy.timezone,
    lastSyncedAt: null,
    health: {
      isActive: false,
      totalQueries24h: 0,
      blockedQueries24h: 0,
      checkedAt: null,
    },
  };
}

/**
 * Retrieves the child's live DNS shield configuration.
 * Falls back gracefully to age-calibrated defaults if unauthenticated or offline.
 */
export async function getChildDeviceShield(
  childId: string,
  age = 10
): Promise<DeviceShieldDTO> {
  try {
    const res = await apiClient<{ shield: DeviceShieldDTO }>(
      `/api/v1/devices/shield/${childId}`
    );
    return res.shield;
  } catch (err) {
    if (err instanceof ApiClientError && (err.status === 401 || err.status === 404)) {
      return buildFallbackShield(childId, age);
    }
    // Return fallback so UI never crashes if network is offline
    return buildFallbackShield(childId, age);
  }
}

/**
 * Saves and updates the child's live DNS shield configuration.
 * Automatically provisions external DNS policy on first activation.
 */
export async function updateChildDeviceShield(
  childId: string,
  input: UpdateDeviceShieldInput
): Promise<DeviceShieldDTO> {
  const res = await apiClient<{ shield: DeviceShieldDTO }>(
    `/api/v1/devices/shield/${childId}`,
    {
      method: 'PUT',
      body: JSON.stringify(input),
    }
  );
  return res.shield;
}

/**
 * Queries aggregate 24-hour DNS query and blocked counters.
 * Privacy-preserving: zero visited URLs or domain logs are ever returned.
 */
export async function getChildDeviceShieldStatus(
  childId: string
): Promise<DeviceShieldHealthDTO> {
  try {
    const res = await apiClient<{ health: DeviceShieldHealthDTO }>(
      `/api/v1/devices/shield/${childId}/status`
    );
    return res.health;
  } catch {
    return {
      isActive: false,
      totalQueries24h: 0,
      blockedQueries24h: 0,
      checkedAt: null,
    };
  }
}
