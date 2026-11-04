import { describe, expect, it } from 'vitest';
import {
  deriveChildAge,
  calculateEstimatedWeightLbs,
  deriveFeedingStage,
  deriveDevelopmentalTier,
} from '../src/hooks/useChildAge';
import {
  DevelopmentalTier,
  NutritionStage,
  RoadType,
  type ChildDTO,
} from '@alongside/shared';

describe('Automatic Child Age Derivation & Pediatric Calibration Specification (PLAN-26)', () => {
  const fixedNow = new Date(2026, 10, 4); // November 4, 2026

  it('correctly calculates infant < 6 months with Ibuprofen contraindication and weight estimate', () => {
    const infant: Partial<ChildDTO> = {
      id: 'child-infant-1',
      name: 'Baby Noah',
      birthYear: 2026,
      birthMonth: 7, // July 2026 -> 4 months old in Nov 2026
      age: 0,
      roadType: RoadType.PRE_DEVICE,
      developmentalTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    };

    const derived = deriveChildAge(infant, fixedNow);

    expect(derived.childId).toBe('child-infant-1');
    expect(derived.name).toBe('Baby Noah');
    expect(derived.ageMonths).toBe(4);
    expect(derived.ageYears).toBe(0);
    expect(derived.ageDisplay).toBe('4 mo');
    expect(derived.isUnder6Months).toBe(true);
    expect(derived.isInfantUnder6Mo).toBe(true);
    expect(derived.feedingStage).toBe(NutritionStage.MILK_ONLY);
    expect(derived.developmentalTier).toBe(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);

    // Barton Schmitt weight formula: Math.round(8 + 1.2 * 4) = 13 lbs (between 12-15 lbs)
    expect(derived.estimatedWeightLbs).toBe(13);
    expect(derived.estimatedWeightLbs).toBeGreaterThanOrEqual(12);
    expect(derived.estimatedWeightLbs).toBeLessThanOrEqual(15);
    expect(derived.isAutoCalibrated).toBe(true);
  });

  it('correctly derives toddler at 14 months (1 yr old, 24 lbs)', () => {
    const toddler: Partial<ChildDTO> = {
      id: 'child-toddler-mateo',
      name: 'Mateo',
      birthYear: 2025,
      birthMonth: 9, // Sept 2025 -> 14 months old in Nov 2026
      age: 1,
      roadType: RoadType.PRE_DEVICE,
      developmentalTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    };

    const derived = deriveChildAge(toddler, fixedNow);

    expect(derived.name).toBe('Mateo');
    expect(derived.ageMonths).toBe(14);
    expect(derived.ageYears).toBe(1);
    expect(derived.ageDisplay).toBe('14 mo');
    expect(derived.estimatedWeightLbs).toBe(24);
    expect(derived.isUnder6Months).toBe(false);
    expect(derived.isInfantUnder6Mo).toBe(false);
    expect(derived.isToddlerUnder2).toBe(true);
    expect(derived.feedingStage).toBe(NutritionStage.TODDLER_TABLE);
    expect(derived.developmentalTier).toBe(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
    expect(derived.isAutoCalibrated).toBe(true);
  });

  it('correctly derives elementary child at 7 years (7 yrs, 55 lbs, balanced school stage)', () => {
    const child: Partial<ChildDTO> = {
      id: 'child-maya-7',
      name: 'Maya',
      age: 7,
      roadType: RoadType.PRE_DEVICE,
    };

    const derived = deriveChildAge(child, fixedNow);

    expect(derived.name).toBe('Maya');
    expect(derived.ageYears).toBe(7);
    expect(derived.ageDisplay).toBe('7 yrs');
    expect(derived.estimatedWeightLbs).toBe(55); // 20 + 7 * 5 = 55 lbs
    expect(derived.isUnder6Months).toBe(false);
    expect(derived.isElementary).toBe(true);
    expect(derived.feedingStage).toBe(NutritionStage.BALANCED_SCHOOL);
    expect(derived.developmentalTier).toBe(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
    expect(derived.isAutoCalibrated).toBe(true);
  });

  it('correctly derives adolescent at 14 years (14 yrs, 90 lbs, pubertal growth stage)', () => {
    const teen: Partial<ChildDTO> = {
      id: 'child-julian-14',
      name: 'Julian',
      age: 14,
      roadType: RoadType.ACTIVE_DEVICE,
    };

    const derived = deriveChildAge(teen, fixedNow);

    expect(derived.name).toBe('Julian');
    expect(derived.ageYears).toBe(14);
    expect(derived.ageDisplay).toBe('14 yrs');
    expect(derived.estimatedWeightLbs).toBe(90); // 20 + 14 * 5 = 90 lbs
    expect(derived.isUnder6Months).toBe(false);
    expect(derived.isAdolescent).toBe(true);
    expect(derived.feedingStage).toBe(NutritionStage.PUBERTAL_GROWTH);
    expect(derived.developmentalTier).toBe(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
    expect(derived.isAutoCalibrated).toBe(true);
  });

  it('returns safe fallback defaults when no child is provided', () => {
    const fallback = deriveChildAge(null, fixedNow);

    expect(fallback.childId).toBeNull();
    expect(fallback.name).toBe('Child');
    expect(fallback.ageYears).toBe(1);
    expect(fallback.ageMonths).toBe(14);
    expect(fallback.ageDisplay).toBe('14 mo');
    expect(fallback.estimatedWeightLbs).toBe(24);
    expect(fallback.feedingStage).toBe(NutritionStage.TODDLER_TABLE);
    expect(fallback.developmentalTier).toBe(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
    expect(fallback.isUnder6Months).toBe(false);
    expect(fallback.isInfantUnder6Mo).toBe(false);
    expect(fallback.isAutoCalibrated).toBe(false);
  });

  it('verifies pure calculation helpers independently', () => {
    // Weight estimations
    expect(calculateEstimatedWeightLbs(2, 0)).toBe(10); // 8 + 1.2*2 = 10.4 -> 10
    expect(calculateEstimatedWeightLbs(6, 0)).toBe(15); // 8 + 1.2*6 = 15.2 -> 15
    expect(calculateEstimatedWeightLbs(18, 1)).toBe(24);
    expect(calculateEstimatedWeightLbs(48, 4)).toBe(40); // 20 + 4*5 = 40

    // Feeding stages
    expect(deriveFeedingStage(3, 0)).toBe(NutritionStage.MILK_ONLY);
    expect(deriveFeedingStage(8, 0)).toBe(NutritionStage.SOLIDS_INTRODUCED);
    expect(deriveFeedingStage(20, 1)).toBe(NutritionStage.TODDLER_TABLE);
    expect(deriveFeedingStage(84, 7)).toBe(NutritionStage.BALANCED_SCHOOL);
    expect(deriveFeedingStage(156, 13)).toBe(NutritionStage.PUBERTAL_GROWTH);

    // Developmental tiers
    expect(deriveDevelopmentalTier(2)).toBe(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
    expect(deriveDevelopmentalTier(5)).toBe(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
    expect(deriveDevelopmentalTier(8)).toBe(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
    expect(deriveDevelopmentalTier(11)).toBe(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
    expect(deriveDevelopmentalTier(14)).toBe(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
    expect(deriveDevelopmentalTier(17)).toBe(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
  });
});
