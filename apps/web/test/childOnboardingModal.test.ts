import { describe, expect, it, beforeEach } from 'vitest';
import {
  ONBOARDING_YEARS,
  getTierDisplay,
} from '../src/components/children/ChildOnboardingFlow';
import {
  useChildContextStore,
  selectActiveChild,
  DEMO_FAMILY_CHILDREN,
} from '../src/stores/useChildContextStore';
import {
  DevelopmentalTier,
  RoadType,
  calculateLifespanTier,
  calculateChildAge,
  type ChildDTO,
} from '@alongside/shared';

describe('Child Onboarding Modal Hardening & Lifespan Age Engine Specification (PLAN-24)', () => {
  const currentYear = new Date().getFullYear();

  beforeEach(() => {
    useChildContextStore.getState().reset();
  });

  describe('Task 1: Age & Birth Year Range Expansion (0–18 Years)', () => {
    it('covers all birth years from current year (infant age 0) down to 18 years ago', () => {
      expect(ONBOARDING_YEARS).toHaveLength(19);
      expect(ONBOARDING_YEARS[0]).toBe(currentYear); // Age 0 / Newborn
      expect(ONBOARDING_YEARS[ONBOARDING_YEARS.length - 1]).toBe(currentYear - 18); // Age 18
    });

    it('calculates infant and toddler ages accurately', () => {
      // Newborn born in current year
      const infantAge = calculateChildAge(currentYear, new Date().getMonth() + 1);
      expect(infantAge).toBe(0);

      // 1-year old toddler
      const toddlerAge = calculateChildAge(currentYear - 1, 1);
      expect(toddlerAge).toBeGreaterThanOrEqual(1);
    });

    it('maps all 6 canonical lifespan tiers correctly in calculateLifespanTier', () => {
      // Age 0-3 -> TIER_0_INFANCY_TODDLER_0_3
      expect(calculateLifespanTier(currentYear - 1, 6)).toBe(
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );

      // Age 4-6 -> TIER_1_EARLY_CHILDHOOD_4_6
      expect(calculateLifespanTier(currentYear - 5, 6)).toBe(
        DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6
      );

      // Age 7-9 -> TIER_2_MIDDLE_CHILDHOOD_7_9
      expect(calculateLifespanTier(currentYear - 8, 6)).toBe(
        DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9
      );

      // Age 10-12 -> TIER_3_PRE_TEEN_10_12
      expect(calculateLifespanTier(currentYear - 11, 6)).toBe(
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12
      );

      // Age 13-15 -> TIER_4_EARLY_ADOLESCENCE_13_15
      expect(calculateLifespanTier(currentYear - 14, 6)).toBe(
        DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15
      );

      // Age 16-18 -> TIER_5_LATE_ADOLESCENCE_16_18
      expect(calculateLifespanTier(currentYear - 17, 6)).toBe(
        DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18
      );
    });
  });

  describe('Task 2: Full Lifespan Tier Display Calibration (getTierDisplay)', () => {
    it('returns rich descriptive metadata for early childhood tiers', () => {
      const tier0 = getTierDisplay(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
      expect(tier0.name).toBe('Infancy & Toddler (0–3)');
      expect(tier0.focus).toContain('BLW');
      expect(tier0.badgeColor).toContain('amber');

      const tier1 = getTierDisplay(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
      expect(tier1.name).toBe('Early Childhood (4–6)');
      expect(tier1.focus).toContain('Preschool');
      expect(tier1.badgeColor).toContain('emerald');
    });

    it('returns calibrated metadata for middle childhood and pre-teen tiers', () => {
      const tier2 = getTierDisplay(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
      expect(tier2.name).toBe('Middle Childhood (7–9)');
      expect(tier2.focus).toContain('Curiosity');

      const tier3 = getTierDisplay(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
      expect(tier3.name).toBe('Pre-Teen (10–12)');
      expect(tier3.focus).toContain('Device Readiness');
    });

    it('returns calibrated metadata for adolescent tiers', () => {
      const tier4 = getTierDisplay(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
      expect(tier4.name).toBe('Early Adolescence (13–15)');
      expect(tier4.focus).toContain('Curfew Lockout');

      const tier5 = getTierDisplay(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
      expect(tier5.name).toBe('Late Adolescence (16–18)');
      expect(tier5.focus).toContain('Executive Autonomy');
    });

    it('preserves backwards compatibility with legacy tier enum aliases', () => {
      expect(getTierDisplay(DevelopmentalTier.TIER_1_AGES_8_9).name).toBe('Middle Childhood (7–9)');
      expect(getTierDisplay(DevelopmentalTier.TIER_2_AGES_10_11).name).toBe('Pre-Teen (10–12)');
      expect(getTierDisplay(DevelopmentalTier.TIER_3_AGES_12_13).name).toBe('Early Adolescence (13–15)');
      expect(getTierDisplay(DevelopmentalTier.TIER_4_AGES_14_PLUS).name).toBe('Late Adolescence (16–18)');
    });
  });

  describe('Task 3: Modal Submission & Household Context Store Synchronization', () => {
    it('immediately registers newly created child and selects as active profile', () => {
      useChildContextStore.getState().setChildren(DEMO_FAMILY_CHILDREN);
      expect(useChildContextStore.getState().children).toHaveLength(3);

      const newInfantChild: ChildDTO = {
        id: 'child-sophia-newborn',
        userId: 'demo-parent',
        name: 'Sophia',
        birthYear: currentYear,
        birthMonth: 2,
        age: 0,
        roadType: RoadType.PRE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
        schoolGrade: 'Infant Care',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Emulate modal success handler
      const currentList = useChildContextStore.getState().children;
      useChildContextStore.getState().setChildren([...currentList, newInfantChild]);
      useChildContextStore.getState().setActiveChild(newInfantChild.id);

      const stateAfter = useChildContextStore.getState();
      expect(stateAfter.children).toHaveLength(4);
      expect(stateAfter.activeChildId).toBe('child-sophia-newborn');

      const active = selectActiveChild(stateAfter);
      expect(active?.name).toBe('Sophia');
      expect(active?.roadType).toBe(RoadType.PRE_DEVICE);
    });
  });
});
