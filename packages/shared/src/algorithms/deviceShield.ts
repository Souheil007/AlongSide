import {
  ShieldBlockableService,
  ShieldPlatform,
} from '../constants/index.js';
import type { UpdateDeviceShieldInput } from '../schemas/deviceShield.js';

export interface ShieldServiceMeta {
  id: ShieldBlockableService;
  label: string;
  category: 'social' | 'video' | 'gaming';
}

export const SHIELD_SERVICE_CATALOG: ShieldServiceMeta[] = [
  { id: ShieldBlockableService.TIKTOK, label: 'TikTok', category: 'social' },
  { id: ShieldBlockableService.SNAPCHAT, label: 'Snapchat', category: 'social' },
  { id: ShieldBlockableService.INSTAGRAM, label: 'Instagram', category: 'social' },
  { id: ShieldBlockableService.DISCORD, label: 'Discord', category: 'social' },
  { id: ShieldBlockableService.ROBLOX, label: 'Roblox', category: 'gaming' },
  { id: ShieldBlockableService.YOUTUBE, label: 'YouTube', category: 'video' },
  { id: ShieldBlockableService.TWITCH, label: 'Twitch', category: 'video' },
  { id: ShieldBlockableService.FORTNITE, label: 'Fortnite', category: 'gaming' },
  { id: ShieldBlockableService.REDDIT, label: 'Reddit', category: 'social' },
];

/**
 * Pure algorithmic builder for age-calibrated default Live DNS Shield policies.
 * Zero network side effects; shared between frontend draft initialization and backend defaults.
 */
export function buildRecommendedShieldPolicy(
  age: number,
  timezone = 'UTC',
  platform: ShieldPlatform = ShieldPlatform.APPLE_IOS
): UpdateDeviceShieldInput {
  if (age <= 9) {
    return {
      platform,
      blockAdultContent: true,
      safeSearch: true,
      youtubeRestrictedMode: true,
      blockBypass: true,
      blockedServices: [
        ShieldBlockableService.TIKTOK,
        ShieldBlockableService.SNAPCHAT,
        ShieldBlockableService.INSTAGRAM,
        ShieldBlockableService.DISCORD,
        ShieldBlockableService.REDDIT,
        ShieldBlockableService.TWITCH,
      ],
      bedtimeServices: [
        ShieldBlockableService.YOUTUBE,
        ShieldBlockableService.ROBLOX,
      ],
      bedtimeEnabled: true,
      bedtimeStart: '20:00',
      bedtimeEnd: '06:30',
      timezone,
    };
  }

  if (age <= 12) {
    return {
      platform,
      blockAdultContent: true,
      safeSearch: true,
      youtubeRestrictedMode: true,
      blockBypass: true,
      blockedServices: [
        ShieldBlockableService.TIKTOK,
        ShieldBlockableService.SNAPCHAT,
        ShieldBlockableService.INSTAGRAM,
        ShieldBlockableService.DISCORD,
        ShieldBlockableService.REDDIT,
      ],
      bedtimeServices: [
        ShieldBlockableService.YOUTUBE,
        ShieldBlockableService.ROBLOX,
      ],
      bedtimeEnabled: true,
      bedtimeStart: '20:30',
      bedtimeEnd: '06:30',
      timezone,
    };
  }

  if (age <= 15) {
    return {
      platform,
      blockAdultContent: true,
      safeSearch: true,
      youtubeRestrictedMode: false,
      blockBypass: true,
      blockedServices: [ShieldBlockableService.REDDIT],
      bedtimeServices: [
        ShieldBlockableService.TIKTOK,
        ShieldBlockableService.INSTAGRAM,
        ShieldBlockableService.SNAPCHAT,
        ShieldBlockableService.YOUTUBE,
      ],
      bedtimeEnabled: true,
      bedtimeStart: '21:30',
      bedtimeEnd: '06:30',
      timezone,
    };
  }

  return {
    platform,
    blockAdultContent: true,
    safeSearch: true,
    youtubeRestrictedMode: false,
    blockBypass: false,
    blockedServices: [],
    bedtimeServices: [],
    bedtimeEnabled: false,
    bedtimeStart: '22:30',
    bedtimeEnd: '06:30',
    timezone,
  };
}
