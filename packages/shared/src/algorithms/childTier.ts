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
 * Maps child's age in years into AlongSide's 4 neurodevelopmental tiers:
 * - Ages 8–9   -> TIER_1_AGES_8_9 (Early Curiosity & Impulse Centers)
 * - Ages 10–11 -> TIER_2_AGES_10_11 (Tween Awakening & Peer Shift)
 * - Ages 12–13 -> TIER_3_AGES_12_13 (Pubertal Shift & Circadian Sleep Delay)
 * - Ages 14+   -> TIER_4_AGES_14_PLUS (Teens, Autonomy & Self-Regulation)
 *
 * Note: Ages under 8 are categorized under TIER_1_AGES_8_9 as the baseline tier.
 */
export function mapAgeToDevelopmentalTier(age: number): DevelopmentalTier {
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
 *
 * @param birthYear 4-digit birth year (e.g. 2014)
 * @param birthMonth 1-indexed birth month (1 = January, 12 = December)
 * @param currentDate Optional reference date (defaults to current system time)
 * @returns Canonical DevelopmentalTier enum value
 */
export function calculateDevelopmentalTier(
  birthYear: number,
  birthMonth: number,
  currentDate: Date = new Date()
): DevelopmentalTier {
  const age = calculateChildAge(birthYear, birthMonth, currentDate);
  return mapAgeToDevelopmentalTier(age);
}
