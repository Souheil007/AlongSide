import { describe, expect, it } from 'vitest';
import {
  CreateChildSchema,
  RoadType,
  DevelopmentalTier,
  calculateChildAge,
  calculateDevelopmentalTier,
  mapAgeToDevelopmentalTier,
} from '@alongside/shared';

describe('Child Onboarding & Road Selection Validation', () => {
  describe('CreateChildSchema', () => {
    it('validates a valid child on Road 1 (PRE_DEVICE)', () => {
      const payload = {
        name: 'Leo Jenkins',
        birthYear: 2015,
        birthMonth: 5,
        roadType: RoadType.PRE_DEVICE,
        schoolGrade: '5th Grade',
      };

      const result = CreateChildSchema.safeParse(payload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Leo Jenkins');
        expect(result.data.roadType).toBe(RoadType.PRE_DEVICE);
      }
    });

    it('validates a valid child on Road 2 (ACTIVE_DEVICE) without optional grade', () => {
      const payload = {
        name: 'Maya Jenkins',
        birthYear: 2012,
        birthMonth: 10,
        roadType: RoadType.ACTIVE_DEVICE,
      };

      const result = CreateChildSchema.safeParse(payload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.roadType).toBe(RoadType.ACTIVE_DEVICE);
        expect(result.data.schoolGrade).toBeUndefined();
      }
    });

    it('rejects empty child name', () => {
      const payload = {
        name: '   ',
        birthYear: 2014,
        birthMonth: 6,
        roadType: RoadType.PRE_DEVICE,
      };

      const result = CreateChildSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toMatch(/name is required/i);
      }
    });

    it('rejects future birth year', () => {
      const payload = {
        name: 'Future Kid',
        birthYear: new Date().getFullYear() + 1,
        birthMonth: 1,
        roadType: RoadType.PRE_DEVICE,
      };

      const result = CreateChildSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toMatch(/cannot be in the future/i);
      }
    });

    it('rejects birth year prior to 2000', () => {
      const payload = {
        name: 'Too Old',
        birthYear: 1999,
        birthMonth: 1,
        roadType: RoadType.PRE_DEVICE,
      };

      const result = CreateChildSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toMatch(/2000 or later/i);
      }
    });

    it('rejects invalid birth months (< 1 or > 12)', () => {
      const payloadUnder = {
        name: 'Invalid Month',
        birthYear: 2014,
        birthMonth: 0,
        roadType: RoadType.PRE_DEVICE,
      };
      expect(CreateChildSchema.safeParse(payloadUnder).success).toBe(false);

      const payloadOver = {
        name: 'Invalid Month',
        birthYear: 2014,
        birthMonth: 13,
        roadType: RoadType.PRE_DEVICE,
      };
      expect(CreateChildSchema.safeParse(payloadOver).success).toBe(false);
    });

    it('rejects an invalid road type enum value', () => {
      const payload = {
        name: 'Leo',
        birthYear: 2014,
        birthMonth: 6,
        roadType: 'UNMANAGED_DEVICE' as any,
      };

      const result = CreateChildSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toMatch(/PRE_DEVICE or ACTIVE_DEVICE/i);
      }
    });
  });

  describe('Developmental Tier & Age Derivation', () => {
    const fixedDate = new Date(2026, 10, 3); // Nov 3, 2026

    it('calculates child age accurately taking birth month into account', () => {
      // Born May 2015 -> 11 full years on Nov 2026
      expect(calculateChildAge(2015, 5, fixedDate)).toBe(11);

      // Born Dec 2015 -> 10 full years on Nov 2026 (birthday hasn't occurred yet)
      expect(calculateChildAge(2015, 12, fixedDate)).toBe(10);
    });

    it('maps ages 8-9 to Tier 1', () => {
      expect(mapAgeToDevelopmentalTier(8)).toBe(DevelopmentalTier.TIER_1_AGES_8_9);
      expect(mapAgeToDevelopmentalTier(9)).toBe(DevelopmentalTier.TIER_1_AGES_8_9);
      expect(calculateDevelopmentalTier(2017, 5, fixedDate)).toBe(DevelopmentalTier.TIER_1_AGES_8_9);
    });

    it('maps ages 10-11 to Tier 2 (Tween)', () => {
      expect(mapAgeToDevelopmentalTier(10)).toBe(DevelopmentalTier.TIER_2_AGES_10_11);
      expect(mapAgeToDevelopmentalTier(11)).toBe(DevelopmentalTier.TIER_2_AGES_10_11);
      expect(calculateDevelopmentalTier(2015, 5, fixedDate)).toBe(DevelopmentalTier.TIER_2_AGES_10_11);
    });

    it('maps ages 12-13 to Tier 3 (Early Teen)', () => {
      expect(mapAgeToDevelopmentalTier(12)).toBe(DevelopmentalTier.TIER_3_AGES_12_13);
      expect(mapAgeToDevelopmentalTier(13)).toBe(DevelopmentalTier.TIER_3_AGES_12_13);
      expect(calculateDevelopmentalTier(2013, 5, fixedDate)).toBe(DevelopmentalTier.TIER_3_AGES_12_13);
    });

    it('maps ages 14+ to Tier 4 (Adolescent Autonomy)', () => {
      expect(mapAgeToDevelopmentalTier(14)).toBe(DevelopmentalTier.TIER_4_AGES_14_PLUS);
      expect(mapAgeToDevelopmentalTier(16)).toBe(DevelopmentalTier.TIER_4_AGES_14_PLUS);
      expect(calculateDevelopmentalTier(2010, 5, fixedDate)).toBe(DevelopmentalTier.TIER_4_AGES_14_PLUS);
    });
  });
});
