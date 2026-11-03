import { describe, expect, it } from 'vitest';
import {
  calculateReadinessScore,
  evaluateSlangQuizScore,
  resolvePactPresetClauses,
} from '../src/algorithms/quizScoring.js';
import { DevelopmentalTier, RoadType } from '../src/constants/index.js';

describe('quizScoring Algorithms', () => {
  describe('calculateReadinessScore', () => {
    it('returns 0 when answers array is empty', () => {
      const res = calculateReadinessScore([]);
      expect(res.overallScore).toBe(0);
      expect(res.isReadyForPersonalPhone).toBe(false);
      expect(res.recommendedRoadmapPreset).toBe('ROAD_1_PRE_DEVICE_FOUNDATION');
    });

    it('calculates score and identifies readiness when score >= 75', () => {
      const answers = [
        { questionId: 'q1', dimensionKey: 'executive_function', score: 9, maxScore: 10 },
        { questionId: 'q2', dimensionKey: 'online_safety', score: 8, maxScore: 10 },
        { questionId: 'q3', dimensionKey: 'emotional_regulation', score: 8, maxScore: 10 },
      ];
      const res = calculateReadinessScore(answers);
      expect(res.overallScore).toBe(83);
      expect(res.dimensionScores.executive_function).toBe(90);
      expect(res.dimensionScores.online_safety).toBe(80);
      expect(res.isReadyForPersonalPhone).toBe(true);
      expect(res.recommendedRoadmapPreset).toBe('ROAD_2_SCAFFOLDED_PACT');
    });

    it('recommends Road 1 Bridge Charter when score is between 50 and 74', () => {
      const answers = [
        { questionId: 'q1', dimensionKey: 'executive_function', score: 6, maxScore: 10 },
        { questionId: 'q2', dimensionKey: 'online_safety', score: 6, maxScore: 10 },
      ];
      const res = calculateReadinessScore(answers);
      expect(res.overallScore).toBe(60);
      expect(res.isReadyForPersonalPhone).toBe(false);
      expect(res.recommendedRoadmapPreset).toBe('ROAD_1_BRIDGE_CHARTER');
    });
  });

  describe('resolvePactPresetClauses', () => {
    it('resolves Tier 1 and 20:00 bedtime for age 8', () => {
      const result = resolvePactPresetClauses(8, RoadType.PRE_DEVICE);
      expect(result.developmentalTier).toBe(DevelopmentalTier.TIER_1_AGES_8_9);
      expect(result.recommendedBedtime).toBe('20:00');
      expect(result.clauses.length).toBe(7);
      expect(result.clauses.some((c) => c.title.includes('20:00'))).toBe(true);
    });

    it('resolves Tier 2 and 20:30 bedtime for age 11', () => {
      const result = resolvePactPresetClauses(11, RoadType.ACTIVE_DEVICE);
      expect(result.developmentalTier).toBe(DevelopmentalTier.TIER_2_AGES_10_11);
      expect(result.recommendedBedtime).toBe('20:30');
      expect(result.clauses.length).toBe(6);
    });

    it('resolves Tier 3 and 21:00 bedtime for age 13', () => {
      const result = resolvePactPresetClauses(13, RoadType.ACTIVE_DEVICE);
      expect(result.developmentalTier).toBe(DevelopmentalTier.TIER_3_AGES_12_13);
      expect(result.recommendedBedtime).toBe('21:00');
    });

    it('resolves Tier 4 and 21:30 bedtime for age 15', () => {
      const result = resolvePactPresetClauses(15, RoadType.ACTIVE_DEVICE);
      expect(result.developmentalTier).toBe(DevelopmentalTier.TIER_4_AGES_14_PLUS);
      expect(result.recommendedBedtime).toBe('21:30');
    });
  });

  describe('evaluateSlangQuizScore', () => {
    it('evaluates perfect score as Tween Whisperer', () => {
      const answers = [
        { questionId: 'q1', isCorrect: true },
        { questionId: 'q2', isCorrect: true },
        { questionId: 'q3', isCorrect: true },
        { questionId: 'q4', isCorrect: true },
        { questionId: 'q5', isCorrect: true },
      ];
      const res = evaluateSlangQuizScore(answers);
      expect(res.percentage).toBe(100);
      expect(res.badge).toBe('Tween Whisperer');
    });

    it('evaluates low score as Needs Translation', () => {
      const answers = [
        { questionId: 'q1', isCorrect: false },
        { questionId: 'q2', isCorrect: false },
      ];
      const res = evaluateSlangQuizScore(answers);
      expect(res.percentage).toBe(0);
      expect(res.badge).toBe('Needs Translation');
    });
  });
});
