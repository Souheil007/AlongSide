import { DevelopmentalTier } from '../constants/index.js';

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
 * Maps child's age into AlongSide v2.4 6 canonical lifespan tiers:
 * - Ages 0–3   -> TIER_0_INFANCY_TODDLER_0_3 (Teething, First Words, Motor, BLW, Puppets)
 * - Ages 4–6   -> TIER_1_EARLY_CHILDHOOD_4_6 (Preschool, Theory of Mind, Blocks, Picky Eating)
 * - Ages 7–9   -> TIER_2_MIDDLE_CHILDHOOD_7_9 (Elementary, Logic Puzzles, Sports, Sleep)
 * - Ages 10–12 -> TIER_3_PRE_TEEN_10_12 (Adrenarche, Device Readiness, Slang, Peers)
 * - Ages 13–15 -> TIER_4_EARLY_ADOLESCENCE_13_15 (Puberty, Circadian Delay, Pacts, 8:30 Curfew)
 * - Ages 16–18+-> TIER_5_LATE_ADOLESCENCE_16_18 (Executive Autonomy, Consequence, Self-Regulation)
 */
export function mapAgeToLifespanTier(age: number): DevelopmentalTier {
  if (age <= 3) {
    return DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;
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
 * while mapping ages 0–6 to the canonical v2.4 early childhood tiers.
 * If system === 'lifespan', returns the 6 canonical v2.4 tiers.
 */
export function mapAgeToDevelopmentalTier(
  age: number,
  system: 'legacy' | 'lifespan' = 'legacy'
): DevelopmentalTier {
  if (system === 'lifespan') {
    return mapAgeToLifespanTier(age);
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
  return mapAgeToDevelopmentalTier(age, system);
}

/**
 * Calculates the v2.4 lifespan developmental tier directly from birth year and month.
 */
export function calculateLifespanTier(
  birthYear: number,
  birthMonth: number,
  currentDate: Date = new Date()
): DevelopmentalTier {
  const age = calculateChildAge(birthYear, birthMonth, currentDate);
  return mapAgeToLifespanTier(age);
}
