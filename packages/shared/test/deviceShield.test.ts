import { describe, expect, it } from 'vitest';
import {
  buildRecommendedShieldPolicy,
  SHIELD_SERVICE_CATALOG,
} from '../src/algorithms/deviceShield.js';
import {
  ShieldBlockableService,
  ShieldPlatform,
} from '../src/constants/index.js';
import { UpdateDeviceShieldSchema } from '../src/schemas/deviceShield.js';

describe('Device Shield Policy Defaults & Schema (PLAN-52)', () => {
  it('provides a complete service catalog aligned with ShieldBlockableService', () => {
    const catalogIds = SHIELD_SERVICE_CATALOG.map((item) => item.id);
    const enumValues = Object.values(ShieldBlockableService);
    expect(catalogIds).toEqual(expect.arrayContaining(enumValues));
    expect(catalogIds.length).toBe(enumValues.length);
  });

  it('builds valid age-calibrated recommendations across developmental brackets', () => {
    for (const age of [7, 10, 14, 17]) {
      const policy = buildRecommendedShieldPolicy(
        age,
        'America/New_York',
        ShieldPlatform.ANDROID
      );
      const parsed = UpdateDeviceShieldSchema.safeParse(policy);
      expect(parsed.success).toBe(true);
      expect(policy.platform).toBe(ShieldPlatform.ANDROID);
      expect(policy.timezone).toBe('America/New_York');
      expect(policy.blockAdultContent).toBe(true);
    }
  });

  it('rejects invalid 24h bedtime formats and unknown services', () => {
    const base = buildRecommendedShieldPolicy(11);

    expect(
      UpdateDeviceShieldSchema.safeParse({
        ...base,
        bedtimeStart: '25:00',
      }).success
    ).toBe(false);

    expect(
      UpdateDeviceShieldSchema.safeParse({
        ...base,
        blockedServices: ['unknown-app'],
      }).success
    ).toBe(false);
  });
});
