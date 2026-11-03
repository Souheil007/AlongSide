import { describe, expect, it } from 'vitest';
import {
  calculateChildAge,
  calculateDevelopmentalTier,
  mapAgeToDevelopmentalTier,
} from '../src/algorithms/childTier.js';
import {
  calculateReadinessScore,
  READINESS_DIMENSIONS,
} from '../src/algorithms/readinessScoring.js';
import { DevelopmentalTier } from '../src/constants/index.js';

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

  describe('mapAgeToDevelopmentalTier', () => {
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
