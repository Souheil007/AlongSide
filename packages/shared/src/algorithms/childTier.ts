import { DevelopmentalTier, EarlyChildhoodTranche } from '../constants/index.js';

/**
 * Calculates a child's current age in whole years from birth year and birth month.
 *
 * @param birthYear 4-digit birth year (e.g. 2014)
 * @param birthMonth 1-indexed birth month (1 = January, 12 = December)
 * @param currentDate Optional reference date (defaults to current system time)
 * @returns Age in completed years (non-negative integer)
 */
export function calculateChildAge(
  birthYear: number,
  birthMonth: number,
  currentDate: Date = new Date()
): number {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() is 0-indexed

  let age = currentYear - birthYear;
  if (currentMonth < birthMonth) {
    age -= 1;
  }

  return Math.max(0, age);
}

/**
 * Calculates a child's age in whole months from birth date.
 *
 * @param birthDate Child's date of birth
 * @param currentDate Optional reference date (defaults to current system time)
 * @returns Age in completed months (non-negative integer)
 */
export function calculateChildAgeMonths(
  birthDate: Date,
  currentDate: Date = new Date()
): number {
  const years = currentDate.getFullYear() - birthDate.getFullYear();
  const months = currentDate.getMonth() - birthDate.getMonth();
  let totalMonths = years * 12 + months;
  if (currentDate.getDate() < birthDate.getDate()) {
    totalMonths -= 1;
  }
  return Math.max(0, totalMonths);
}

/**
 * Resolves the granular early childhood intra-tier micro-tranche (0-36 months).
 * - 0–3m   -> INFANT_FOURTH_TRIMESTER_0_3M
 * - 4–6m   -> INFANT_AWAKENING_4_6M
 * - 7–12m  -> INFANT_MOBILE_EXPLORER_7_12M
 * - 12–18m -> TODDLER_FIRST_STEPS_12_18M
 * - 18–24m -> TODDLER_LANGUAGE_BURST_18_24M
 * - 24–30m -> OLDER_TODDLER_AUTONOMY_24_30M
 * - 30–36m -> OLDER_TODDLER_PRESCHOOL_PREP_30_36M
 */
export function resolveEarlyChildhoodTranche(
  ageMonths: number
): EarlyChildhoodTranche | null {
  if (ageMonths < 0 || ageMonths > 36) {
    return null;
  }
  if (ageMonths <= 3) {
    return EarlyChildhoodTranche.INFANT_FOURTH_TRIMESTER_0_3M;
  }
  if (ageMonths <= 6) {
    return EarlyChildhoodTranche.INFANT_AWAKENING_4_6M;
  }
  if (ageMonths <= 12) {
    return EarlyChildhoodTranche.INFANT_MOBILE_EXPLORER_7_12M;
  }
  if (ageMonths <= 18) {
    return EarlyChildhoodTranche.TODDLER_FIRST_STEPS_12_18M;
  }
  if (ageMonths <= 24) {
    return EarlyChildhoodTranche.TODDLER_LANGUAGE_BURST_18_24M;
  }
  if (ageMonths <= 30) {
    return EarlyChildhoodTranche.OLDER_TODDLER_AUTONOMY_24_30M;
  }
  return EarlyChildhoodTranche.OLDER_TODDLER_PRESCHOOL_PREP_30_36M;
}

/**
 * Maps child's age into AlongSide v2.6 8 canonical lifespan tiers (Tier 0 decomposed):
 * - Ages 0–1 / 0–12m  -> TIER_0A_INFANCY_0_1 (Somatic Regulation, Sleep Architecture & Feeding Foundations)
 * - Ages 1–2 / 12–24m -> TIER_0B_TODDLER_1_2 (Locomotion, First Words & Amygdala Co-Regulation)
 * - Ages 2–3 / 24–36m -> TIER_0C_OLDER_TODDLER_2_3 (Autonomy, Language Burst, Boundary Testing & Potty Learning)
 * - Ages 4–6   -> TIER_1_EARLY_CHILDHOOD_4_6 (Preschool, Theory of Mind, Blocks, Picky Eating)
 * - Ages 7–9   -> TIER_2_MIDDLE_CHILDHOOD_7_9 (Elementary, Logic Puzzles, Sports, Sleep)
 * - Ages 10–12 -> TIER_3_PRE_TEEN_10_12 (Adrenarche, Device Readiness, Slang, Peers)
 * - Ages 13–15 -> TIER_4_EARLY_ADOLESCENCE_13_15 (Puberty, Circadian Delay, Pacts, 8:30 Curfew)
 * - Ages 16–18+-> TIER_5_LATE_ADOLESCENCE_16_18 (Executive Autonomy, Consequence, Self-Regulation)
 */
export function mapAgeToLifespanTier(
  age: number,
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

  if (age <= 1) {
    return DevelopmentalTier.TIER_0A_INFANCY_0_1;
  }
  if (age === 2) {
    return DevelopmentalTier.TIER_0B_TODDLER_1_2;
  }
  if (age === 3) {
    return DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3;
  }
  if (age <= 6) {
    return DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
  }
  if (age <= 9) {
    return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
  }
  if (age <= 12) {
    return DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
  }
  if (age <= 15) {
    return DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
  }
  return DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;
}

/**
 * Maps child's age in years into AlongSide's neurodevelopmental tiers.
 * By default, preserves backward compatibility with v2.3 smartphone-bridge tiers for ages >= 8,
 * while mapping ages 0–3 to TIER_0_INFANCY_TODDLER_0_3 (or decomposed if system === 'lifespan').
 */
export function mapAgeToDevelopmentalTier(
  age: number,
  system: 'legacy' | 'lifespan' = 'legacy',
  ageMonths?: number
): DevelopmentalTier {
  if (system === 'lifespan') {
    return mapAgeToLifespanTier(age, ageMonths);
  }
  if (age <= 3) {
    return DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;
  }
  if (age <= 6) {
    return DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
  }
  if (age <= 9) {
    return DevelopmentalTier.TIER_1_AGES_8_9;
  }
  if (age <= 11) {
    return DevelopmentalTier.TIER_2_AGES_10_11;
  }
  if (age <= 13) {
    return DevelopmentalTier.TIER_3_AGES_12_13;
  }
  return DevelopmentalTier.TIER_4_AGES_14_PLUS;
}

/**
 * Calculates the developmental tier directly from birth year and month.
 */
export function calculateDevelopmentalTier(
  birthYear: number,
  birthMonth: number,
  currentDate: Date = new Date(),
  system: 'legacy' | 'lifespan' = 'legacy'
): DevelopmentalTier {
  const age = calculateChildAge(birthYear, birthMonth, currentDate);
  const birthDate = new Date(birthYear, birthMonth - 1, 1);
  const ageMonths = calculateChildAgeMonths(birthDate, currentDate);
  return mapAgeToDevelopmentalTier(age, system, ageMonths);
}

/**
 * Calculates the v2.6 lifespan developmental tier directly from birth year and month.
 */
export function calculateLifespanTier(
  birthYear: number,
  birthMonth: number,
  currentDate: Date = new Date(),
  ageMonths?: number
): DevelopmentalTier {
  const age = calculateChildAge(birthYear, birthMonth, currentDate);
  const months =
    ageMonths !== undefined
      ? ageMonths
      : calculateChildAgeMonths(new Date(birthYear, birthMonth - 1, 1), currentDate);
  return mapAgeToLifespanTier(age, months);
}

/**
 * Resolves equivalent tiers for querying when querying by legacy or macro tiers.
 * E.g. 'TIER_0_INFANCY_TODDLER_0_3' expands to include 'TIER_0A_INFANCY_0_1', 'TIER_0B_TODDLER_1_2', 'TIER_0C_OLDER_TODDLER_2_3'.
 */
export function getEquivalentTiers(tier: string): string[] {
  switch (tier) {
    case 'TIER_0_INFANCY_TODDLER_0_3':
      return [
        'TIER_0_INFANCY_TODDLER_0_3',
        'TIER_0A_INFANCY_0_1',
        'TIER_0B_TODDLER_1_2',
        'TIER_0C_OLDER_TODDLER_2_3',
      ];
    case 'TIER_0A_INFANCY_0_1':
      return ['TIER_0A_INFANCY_0_1', 'TIER_0_INFANCY_TODDLER_0_3'];
    case 'TIER_0B_TODDLER_1_2':
      return ['TIER_0B_TODDLER_1_2', 'TIER_0_INFANCY_TODDLER_0_3'];
    case 'TIER_0C_OLDER_TODDLER_2_3':
      return ['TIER_0C_OLDER_TODDLER_2_3', 'TIER_0_INFANCY_TODDLER_0_3'];
    case 'TIER_1_AGES_8_9':
    case 'TIER_2_MIDDLE_CHILDHOOD_7_9':
      return ['TIER_1_AGES_8_9', 'TIER_2_MIDDLE_CHILDHOOD_7_9'];
    case 'TIER_2_AGES_10_11':
    case 'TIER_3_PRE_TEEN_10_12':
      return ['TIER_2_AGES_10_11', 'TIER_3_PRE_TEEN_10_12'];
    case 'TIER_3_AGES_12_13':
    case 'TIER_4_EARLY_ADOLESCENCE_13_15':
      return ['TIER_3_AGES_12_13', 'TIER_4_EARLY_ADOLESCENCE_13_15'];
    case 'TIER_4_AGES_14_PLUS':
    case 'TIER_5_LATE_ADOLESCENCE_16_18':
      return ['TIER_4_AGES_14_PLUS', 'TIER_5_LATE_ADOLESCENCE_16_18'];
    default:
      return [tier];
  }
}

