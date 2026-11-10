import * as React from 'react';
import {
  DevelopmentalTier,
  EarlyChildhoodTranche,
  NutritionStage,
  type ChildDTO,
  resolveEarlyChildhoodTranche,
} from '@alongside/shared';
import { useChildContextStore, selectActiveChild } from '@/stores/useChildContextStore';

export interface ChildAgeProfile {
  childId: string | null;
  name: string;
  ageYears: number;
  ageMonths: number;
  ageDisplay: string;
  developmentalTier: DevelopmentalTier;
  earlyChildhoodTranche: EarlyChildhoodTranche | null;
  estimatedWeightLbs: number;
  feedingStage: NutritionStage;
  isUnder6Months: boolean;
  isInfantUnder6Mo: boolean;
  isToddlerUnder2: boolean;
  isElementary: boolean;
  isAdolescent: boolean;
  isAutoCalibrated: boolean;
}

/**
 * Barton Schmitt pediatric weight estimation formula.
 * - < 12 months: Math.max(8, Math.round(8 + 1.2 * ageMonths))
 * - 12-23 months (1 yr): 24 lbs
 * - >= 24 months (2+ yrs): Math.round(20 + ageYears * 5) lbs
 */
export function calculateEstimatedWeightLbs(ageMonths: number, ageYears: number): number {
  if (ageMonths < 12) {
    return Math.max(8, Math.round(8 + 1.2 * ageMonths));
  }
  if (ageMonths < 24) {
    return 24;
  }
  return Math.round(20 + ageYears * 5);
}

/**
 * Maps recommended feeding stage to child age.
 * - < 6 mo: MILK_ONLY
 * - 6-11 mo: SOLIDS_INTRODUCED
 * - 12-35 mo: TODDLER_TABLE
 * - 3-10 yr: BALANCED_SCHOOL
 * - >= 11 yr: PUBERTAL_GROWTH
 */
export function deriveFeedingStage(ageMonths: number, ageYears: number): NutritionStage {
  if (ageMonths < 6) {
    return NutritionStage.MILK_ONLY;
  }
  if (ageMonths < 12) {
    return NutritionStage.SOLIDS_INTRODUCED;
  }
  if (ageMonths < 36) {
    return NutritionStage.TODDLER_TABLE;
  }
  if (ageYears <= 10) {
    return NutritionStage.BALANCED_SCHOOL;
  }
  return NutritionStage.PUBERTAL_GROWTH;
}

/**
 * Derives canonical lifespan developmental tier from age in years and optional months.
 * Supports early childhood decomposition: 0A (0-12m), 0B (13-24m), 0C (25-36m).
 */
export function deriveDevelopmentalTier(
  ageYears: number,
  ageMonths?: number
): DevelopmentalTier {
  if (ageMonths !== undefined && ageMonths <= 36) {
    if (ageMonths <= 12) {
      return DevelopmentalTier.TIER_0A_INFANCY_0_1;
    }
    if (ageMonths <= 24) {
      return DevelopmentalTier.TIER_0B_TODDLER_1_2;
    }
    return DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3;
  }
  if (ageYears <= 1) {
    return DevelopmentalTier.TIER_0A_INFANCY_0_1;
  }
  if (ageYears === 2) {
    return DevelopmentalTier.TIER_0B_TODDLER_1_2;
  }
  if (ageYears === 3) {
    return DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3;
  }
  if (ageYears <= 6) {
    return DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
  }
  if (ageYears <= 9) {
    return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
  }
  if (ageYears <= 12) {
    return DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
  }
  if (ageYears <= 15) {
    return DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
  }
  return DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;
}

/**
 * Pure helper to derive a complete, authoritative ChildAgeProfile from a child record or fallback.
 */
export function deriveChildAge(
  child?: Partial<ChildDTO> | null,
  now: Date = new Date()
): ChildAgeProfile {
  if (!child) {
    return {
      childId: null,
      name: 'Child',
      ageYears: 1,
      ageMonths: 14,
      ageDisplay: '14 mo',
      developmentalTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
      earlyChildhoodTranche: resolveEarlyChildhoodTranche(14),
      estimatedWeightLbs: 24,
      feedingStage: NutritionStage.TODDLER_TABLE,
      isUnder6Months: false,
      isInfantUnder6Mo: false,
      isToddlerUnder2: true,
      isElementary: false,
      isAdolescent: false,
      isAutoCalibrated: false,
    };
  }

  let ageMonths: number;
  let ageYears: number;

  if (child.birthYear && child.birthMonth) {
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-12
    const totalMonths = (currentYear - child.birthYear) * 12 + (currentMonth - child.birthMonth);
    ageMonths = Math.max(0, totalMonths);
    ageYears = Math.floor(ageMonths / 12);
  } else if (typeof child.ageMonths === 'number' && child.ageMonths >= 0) {
    ageMonths = child.ageMonths;
    ageYears = Math.floor(ageMonths / 12);
  } else if (typeof child.age === 'number') {
    if (child.age === 0) {
      ageMonths = 4;
      ageYears = 0;
    } else {
      ageYears = child.age;
      ageMonths = child.age * 12 + 6;
    }
  } else {
    ageMonths = 14;
    ageYears = 1;
  }

  const ageDisplay = ageMonths < 24 ? `${ageMonths} mo` : `${ageYears} yrs`;
  const estimatedWeightLbs = calculateEstimatedWeightLbs(ageMonths, ageYears);
  const developmentalTier = deriveDevelopmentalTier(ageYears, ageMonths);
  const earlyChildhoodTranche = resolveEarlyChildhoodTranche(ageMonths);
  const feedingStage = deriveFeedingStage(ageMonths, ageYears);
  const isUnder6Months = ageMonths < 6;

  return {
    childId: child.id ?? null,
    name: child.name?.trim() || 'Child',
    ageYears,
    ageMonths,
    ageDisplay,
    developmentalTier,
    earlyChildhoodTranche,
    estimatedWeightLbs,
    feedingStage,
    isUnder6Months,
    isInfantUnder6Mo: isUnder6Months,
    isToddlerUnder2: ageMonths >= 6 && ageMonths < 24,
    isElementary: ageYears >= 6 && ageYears <= 11,
    isAdolescent: ageYears >= 12,
    isAutoCalibrated: true,
  };
}

/**
 * Authoritative React hook providing reactive, automatic child age calibration.
 * Reads the active child from useChildContextStore and derives all biological,
 * nutritional, and developmental parameters.
 */
export function useChildAge(): ChildAgeProfile {
  const { children, activeChildId } = useChildContextStore();
  const activeChild = selectActiveChild({ children, activeChildId });

  return React.useMemo(() => {
    return deriveChildAge(activeChild);
  }, [activeChild]);
}
