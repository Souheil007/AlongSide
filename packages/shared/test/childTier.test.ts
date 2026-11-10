import { describe, expect, it } from 'vitest';
import {
  calculateChildAge,
  calculateChildAgeMonths,
  calculateDevelopmentalTier,
  calculateLifespanTier,
  mapAgeToDevelopmentalTier,
  mapAgeToLifespanTier,
  resolveEarlyChildhoodTranche,
} from '../src/algorithms/childTier.js';
import {
  calculateReadinessScore,
  READINESS_DIMENSIONS,
} from '../src/algorithms/readinessScoring.js';
import { DevelopmentalTier, EarlyChildhoodTranche } from '../src/constants/index.js';

describe('childTier algorithm', () => {
  const mockCurrentDate = new Date('2026-11-03T12:00:00Z');

  describe('calculateChildAge', () => {
    it('calculates age when birthday has passed in the current year', () => {
      // Born June 2014, current Nov 2026 -> 12 years old
      const age = calculateChildAge(2014, 6, mockCurrentDate);
      expect(age).toBe(12);
    });

    it('calculates age when birthday is later in the current year', () => {
      // Born Dec 2014, current Nov 2026 -> 11 years old
      const age = calculateChildAge(2014, 12, mockCurrentDate);
      expect(age).toBe(11);
    });

    it('handles exact current month', () => {
      // Born Nov 2016, current Nov 2026 -> 10 years old
      const age = calculateChildAge(2016, 11, mockCurrentDate);
      expect(age).toBe(10);
    });
  });

  describe('resolveEarlyChildhoodTranche', () => {
    it('resolves all 7 intra-tier sub-tranches accurately', () => {
      // 0-3m: Fourth Trimester
      expect(resolveEarlyChildhoodTranche(0)).toBe(EarlyChildhoodTranche.INFANT_FOURTH_TRIMESTER_0_3M);
      expect(resolveEarlyChildhoodTranche(2)).toBe(EarlyChildhoodTranche.INFANT_FOURTH_TRIMESTER_0_3M);
      expect(resolveEarlyChildhoodTranche(3)).toBe(EarlyChildhoodTranche.INFANT_FOURTH_TRIMESTER_0_3M);

      // 4-6m: Awakening & Allergen Window
      expect(resolveEarlyChildhoodTranche(4)).toBe(EarlyChildhoodTranche.INFANT_AWAKENING_4_6M);
      expect(resolveEarlyChildhoodTranche(6)).toBe(EarlyChildhoodTranche.INFANT_AWAKENING_4_6M);

      // 7-12m: Mobile Explorer
      expect(resolveEarlyChildhoodTranche(7)).toBe(EarlyChildhoodTranche.INFANT_MOBILE_EXPLORER_7_12M);
      expect(resolveEarlyChildhoodTranche(12)).toBe(EarlyChildhoodTranche.INFANT_MOBILE_EXPLORER_7_12M);

      // 12-18m: First Steps & Locomotion
      expect(resolveEarlyChildhoodTranche(13)).toBe(EarlyChildhoodTranche.TODDLER_FIRST_STEPS_12_18M);
      expect(resolveEarlyChildhoodTranche(18)).toBe(EarlyChildhoodTranche.TODDLER_FIRST_STEPS_12_18M);

      // 18-24m: Language Burst
      expect(resolveEarlyChildhoodTranche(19)).toBe(EarlyChildhoodTranche.TODDLER_LANGUAGE_BURST_18_24M);
      expect(resolveEarlyChildhoodTranche(24)).toBe(EarlyChildhoodTranche.TODDLER_LANGUAGE_BURST_18_24M);

      // 24-30m: Autonomy & Boundaries
      expect(resolveEarlyChildhoodTranche(25)).toBe(EarlyChildhoodTranche.OLDER_TODDLER_AUTONOMY_24_30M);
      expect(resolveEarlyChildhoodTranche(30)).toBe(EarlyChildhoodTranche.OLDER_TODDLER_AUTONOMY_24_30M);

      // 30-36m: Preschool Preparation
      expect(resolveEarlyChildhoodTranche(31)).toBe(EarlyChildhoodTranche.OLDER_TODDLER_PRESCHOOL_PREP_30_36M);
      expect(resolveEarlyChildhoodTranche(36)).toBe(EarlyChildhoodTranche.OLDER_TODDLER_PRESCHOOL_PREP_30_36M);
    });

    it('returns null for ages outside 0-36 months', () => {
      expect(resolveEarlyChildhoodTranche(-1)).toBeNull();
      expect(resolveEarlyChildhoodTranche(37)).toBeNull();
      expect(resolveEarlyChildhoodTranche(48)).toBeNull();
    });
  });

  describe('mapAgeToLifespanTier', () => {
    it('decomposes early childhood into 0A, 0B, 0C when ageMonths is provided', () => {
      expect(mapAgeToLifespanTier(0, 2)).toBe(DevelopmentalTier.TIER_0A_INFANCY_0_1);
      expect(mapAgeToLifespanTier(1, 12)).toBe(DevelopmentalTier.TIER_0A_INFANCY_0_1);
      expect(mapAgeToLifespanTier(1, 15)).toBe(DevelopmentalTier.TIER_0B_TODDLER_1_2);
      expect(mapAgeToLifespanTier(2, 24)).toBe(DevelopmentalTier.TIER_0B_TODDLER_1_2);
      expect(mapAgeToLifespanTier(2, 28)).toBe(DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3);
      expect(mapAgeToLifespanTier(3, 36)).toBe(DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3);
    });

    it('decomposes early childhood when only age in years is provided', () => {
      expect(mapAgeToLifespanTier(0)).toBe(DevelopmentalTier.TIER_0A_INFANCY_0_1);
      expect(mapAgeToLifespanTier(1)).toBe(DevelopmentalTier.TIER_0A_INFANCY_0_1);
      expect(mapAgeToLifespanTier(2)).toBe(DevelopmentalTier.TIER_0B_TODDLER_1_2);
      expect(mapAgeToLifespanTier(3)).toBe(DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3);
      expect(mapAgeToLifespanTier(5)).toBe(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
      expect(mapAgeToLifespanTier(8)).toBe(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
      expect(mapAgeToLifespanTier(11)).toBe(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
      expect(mapAgeToLifespanTier(14)).toBe(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
      expect(mapAgeToLifespanTier(17)).toBe(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
    });
  });

  describe('calculateLifespanTier', () => {
    it('computes decomposed early childhood tiers from birth year and month', () => {
      // Born May 2026 -> 6 months in Nov 2026 -> Tier 0A
      expect(calculateLifespanTier(2026, 5, mockCurrentDate)).toBe(DevelopmentalTier.TIER_0A_INFANCY_0_1);

      // Born Jan 2025 -> 22 months in Nov 2026 -> Tier 0B
      expect(calculateLifespanTier(2025, 1, mockCurrentDate)).toBe(DevelopmentalTier.TIER_0B_TODDLER_1_2);

      // Born Nov 2023 -> 36 months in Nov 2026 -> Tier 0C
      expect(calculateLifespanTier(2023, 11, mockCurrentDate)).toBe(DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3);

      // Born Nov 2021 -> age 5 in Nov 2026 -> Tier 1
      expect(calculateLifespanTier(2021, 11, mockCurrentDate)).toBe(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
    });
  });

  describe('mapAgeToDevelopmentalTier (legacy backward compatibility)', () => {
    it('maps infancy/toddlerhood (ages 0-3) to TIER_0_INFANCY_TODDLER_0_3 in legacy mode', () => {
      expect(mapAgeToDevelopmentalTier(0)).toBe(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
      expect(mapAgeToDevelopmentalTier(2)).toBe(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
      expect(mapAgeToDevelopmentalTier(3)).toBe(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
    });

    it('maps early childhood (ages 4-6) to TIER_1_EARLY_CHILDHOOD_4_6', () => {
      expect(mapAgeToDevelopmentalTier(4)).toBe(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
      expect(mapAgeToDevelopmentalTier(5)).toBe(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
      expect(mapAgeToDevelopmentalTier(6)).toBe(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
    });

    it('maps ages 8-9 (or younger) to TIER_1_AGES_8_9', () => {
      expect(mapAgeToDevelopmentalTier(7)).toBe(DevelopmentalTier.TIER_1_AGES_8_9);
      expect(mapAgeToDevelopmentalTier(8)).toBe(DevelopmentalTier.TIER_1_AGES_8_9);
      expect(mapAgeToDevelopmentalTier(9)).toBe(DevelopmentalTier.TIER_1_AGES_8_9);
    });

    it('maps ages 10-11 to TIER_2_AGES_10_11', () => {
      expect(mapAgeToDevelopmentalTier(10)).toBe(DevelopmentalTier.TIER_2_AGES_10_11);
      expect(mapAgeToDevelopmentalTier(11)).toBe(DevelopmentalTier.TIER_2_AGES_10_11);
    });

    it('maps ages 12-13 to TIER_3_AGES_12_13', () => {
      expect(mapAgeToDevelopmentalTier(12)).toBe(DevelopmentalTier.TIER_3_AGES_12_13);
      expect(mapAgeToDevelopmentalTier(13)).toBe(DevelopmentalTier.TIER_3_AGES_12_13);
    });

    it('maps ages 14+ to TIER_4_AGES_14_PLUS', () => {
      expect(mapAgeToDevelopmentalTier(14)).toBe(DevelopmentalTier.TIER_4_AGES_14_PLUS);
      expect(mapAgeToDevelopmentalTier(16)).toBe(DevelopmentalTier.TIER_4_AGES_14_PLUS);
    });
  });

  describe('calculateDevelopmentalTier', () => {
    it('computes developmental tier from birth year and month', () => {
      // Born 2014-06 -> age 12 in 2026 -> Tier 3
      const tier12 = calculateDevelopmentalTier(2014, 6, mockCurrentDate);
      expect(tier12).toBe(DevelopmentalTier.TIER_3_AGES_12_13);

      // Born 2016-01 -> age 10 in 2026 -> Tier 2
      const tier10 = calculateDevelopmentalTier(2016, 1, mockCurrentDate);
      expect(tier10).toBe(DevelopmentalTier.TIER_2_AGES_10_11);

      // Born 2018-05 -> age 8 in 2026 -> Tier 1
      const tier8 = calculateDevelopmentalTier(2018, 5, mockCurrentDate);
      expect(tier8).toBe(DevelopmentalTier.TIER_1_AGES_8_9);

      // Born 2011-03 -> age 15 in 2026 -> Tier 4
      const tier15 = calculateDevelopmentalTier(2011, 3, mockCurrentDate);
      expect(tier15).toBe(DevelopmentalTier.TIER_4_AGES_14_PLUS);
    });
  });
});

describe('readinessScoring algorithm', () => {
  it('defines 10 canonical dimensions', () => {
    expect(READINESS_DIMENSIONS).toHaveLength(10);
    expect(READINESS_DIMENSIONS).toContain('executive_function');
    expect(READINESS_DIMENSIONS).toContain('online_safety');
    expect(READINESS_DIMENSIONS).toContain('bedtime_habits');
    expect(READINESS_DIMENSIONS).toContain('peer_pressure_resilience');
  });

  it('calculates score with 10 dimensions, strengths, and growth areas', () => {
    const answers = [
      { questionId: 'q1', dimensionKey: 'executive_function', score: 9, maxScore: 10 },
      { questionId: 'q2', dimensionKey: 'online_safety', score: 8, maxScore: 10 },
      { questionId: 'q3', dimensionKey: 'bedtime_habits', score: 5, maxScore: 10 },
      { questionId: 'q4', dimensionKey: 'peer_pressure_resilience', score: 7, maxScore: 10 },
      { questionId: 'q5', dimensionKey: 'emotional_regulation', score: 8, maxScore: 10 },
      { questionId: 'q6', dimensionKey: 'privacy_awareness', score: 9, maxScore: 10 },
      { questionId: 'q7', dimensionKey: 'content_critical_thinking', score: 7, maxScore: 10 },
      { questionId: 'q8', dimensionKey: 'digital_etiquette', score: 8, maxScore: 10 },
      { questionId: 'q9', dimensionKey: 'time_management', score: 6, maxScore: 10 },
      { questionId: 'q10', dimensionKey: 'parent_communication', score: 9, maxScore: 10 },
    ];

    const result = calculateReadinessScore(answers);
    expect(result.overallScore).toBe(76);
    expect(result.isReadyForPersonalPhone).toBe(true);
    expect(result.recommendedRoadmapPreset).toBe('ROAD_2_SCAFFOLDED_PACT');
    expect(result.strengths).toContain('executive_function');
    expect(result.strengths).toContain('privacy_awareness');
    expect(result.growthAreas).toContain('bedtime_habits');
    expect(result.dimensionBreakdown?.bedtime_habits?.rating).toBe('DEVELOPING');
  });
});
