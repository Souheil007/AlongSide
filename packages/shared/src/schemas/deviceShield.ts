import { z } from 'zod';
import { ShieldBlockableService, ShieldPlatform } from '../constants/index.js';

const HHMM_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

const shieldServiceValues = Object.values(ShieldBlockableService) as [
  ShieldBlockableService,
  ...ShieldBlockableService[],
];

const shieldPlatformValues = Object.values(ShieldPlatform) as [
  ShieldPlatform,
  ...ShieldPlatform[],
];

export const ShieldBlockableServiceSchema = z.enum(shieldServiceValues);

export const UpdateDeviceShieldSchema = z.object({
  platform: z.enum(shieldPlatformValues),
  blockAdultContent: z.boolean(),
  safeSearch: z.boolean(),
  youtubeRestrictedMode: z.boolean(),
  blockBypass: z.boolean(),
  blockedServices: z.array(ShieldBlockableServiceSchema).max(20),
  bedtimeServices: z.array(ShieldBlockableServiceSchema).max(20).default([]),
  bedtimeEnabled: z.boolean(),
  bedtimeStart: z.string().regex(HHMM_REGEX, 'bedtimeStart must use 24h HH:MM format'),
  bedtimeEnd: z.string().regex(HHMM_REGEX, 'bedtimeEnd must use 24h HH:MM format'),
  timezone: z.string().trim().min(2).max(64).default('UTC'),
});

export type UpdateDeviceShieldInput = z.infer<typeof UpdateDeviceShieldSchema>;
