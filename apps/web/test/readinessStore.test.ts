import { describe, expect, it, beforeEach } from 'vitest';
import {
  useReadinessStore,
  CANONICAL_READINESS_QUESTIONS,
} from '../src/stores/useReadinessStore';
import { READINESS_DIMENSIONS, ReadinessPreset } from '@alongside/shared';

describe('useReadinessStore', () => {
  beforeEach(() => {
    useReadinessStore.getState().reset();
  });

  describe('Canonical Questions Specification', () => {
    it('contains exactly 10 canonical questions', () => {
      expect(CANONICAL_READINESS_QUESTIONS).toHaveLength(10);
    });

    it('covers all 10 canonical dimensions from READINESS_DIMENSIONS', () => {
      const questionDimensionKeys = CANONICAL_READINESS_QUESTIONS.map((q) => q.dimensionKey);
      for (const dimension of READINESS_DIMENSIONS) {
        expect(questionDimensionKeys).toContain(dimension);
      }
    });

    it('ensures each question has 4 options with descending scores 10, 7, 4, 1', () => {
      for (const question of CANONICAL_READINESS_QUESTIONS) {
        expect(question.options).toHaveLength(4);
        const scores = question.options.map((opt) => opt.score);
        expect(scores).toEqual([10, 7, 4, 1]);
        expect(question.expertInsight).toBeDefined();
        expect(question.expertInsight.length).toBeGreaterThan(20);
      }
    });
  });

  describe('Store Actions & State Transitions', () => {
    it('sets child information correctly', () => {
      const store = useReadinessStore.getState();
      store.setChild('child-123', 'Leo');

      const state = useReadinessStore.getState();
      expect(state.childId).toBe('child-123');
      expect(state.childName).toBe('Leo');
    });

    it('navigates next, previous, and jumps across questions', () => {
      const store = useReadinessStore.getState();
      expect(store.currentQuestionIndex).toBe(0);

      store.nextQuestion();
      expect(useReadinessStore.getState().currentQuestionIndex).toBe(1);

      store.nextQuestion();
      expect(useReadinessStore.getState().currentQuestionIndex).toBe(2);

      store.prevQuestion();
      expect(useReadinessStore.getState().currentQuestionIndex).toBe(1);

      store.jumpToQuestion(8);
      expect(useReadinessStore.getState().currentQuestionIndex).toBe(8);

      // Boundary check: cannot jump past max index
      store.jumpToQuestion(99);
      expect(useReadinessStore.getState().currentQuestionIndex).toBe(8);

      // Boundary check: cannot jump below 0
      store.jumpToQuestion(-5);
      expect(useReadinessStore.getState().currentQuestionIndex).toBe(8);
    });

    it('records and updates answers per dimension', () => {
      const store = useReadinessStore.getState();
      const question = CANONICAL_READINESS_QUESTIONS[0];
      expect(question).toBeDefined();
      if (!question) return;

      const firstOption = question.options[0];
      expect(firstOption).toBeDefined();
      if (!firstOption) return;

      store.setAnswer(question.dimensionKey, {
        questionId: question.id,
        dimensionKey: question.dimensionKey,
        score: 10,
        maxScore: 10,
        selectedOptionId: firstOption.id,
      });

      const updated = useReadinessStore.getState();
      expect(updated.answers[question.dimensionKey]).toEqual({
        questionId: question.id,
        dimensionKey: question.dimensionKey,
        score: 10,
        maxScore: 10,
        selectedOptionId: firstOption.id,
      });
    });

    it('computes local result accurately for all optimal answers (score 100)', () => {
      const store = useReadinessStore.getState();

      // Answer all 10 questions with highest score (10)
      for (const question of CANONICAL_READINESS_QUESTIONS) {
        const option = question.options[0];
        expect(option).toBeDefined();
        if (!option) continue;

        store.setAnswer(question.dimensionKey, {
          questionId: question.id,
          dimensionKey: question.dimensionKey,
          score: 10,
          maxScore: 10,
          selectedOptionId: option.id,
        });
      }

      const result = store.computeLocalResult();
      expect(result.overallScore).toBe(100);
      expect(result.isReadyForPersonalPhone).toBe(true);
      expect(result.recommendedRoadmapPreset).toBe(ReadinessPreset.ROAD_2_AUTONOMY_CHARTER);
      expect(result.strengths.length).toBe(10);
      expect(result.growthAreas.length).toBe(0);

      const stateResult = useReadinessStore.getState().result;
      expect(stateResult).not.toBeNull();
      expect(stateResult?.overallScore).toBe(100);
    });

    it('computes local result accurately for developing answers (score 40)', () => {
      const store = useReadinessStore.getState();

      // Answer all 10 questions with score 4
      for (const question of CANONICAL_READINESS_QUESTIONS) {
        const option = question.options[2];
        expect(option).toBeDefined();
        if (!option) continue;

        store.setAnswer(question.dimensionKey, {
          questionId: question.id,
          dimensionKey: question.dimensionKey,
          score: 4,
          maxScore: 10,
          selectedOptionId: option.id,
        });
      }

      const result = store.computeLocalResult();
      expect(result.overallScore).toBe(40);
      expect(result.isReadyForPersonalPhone).toBe(false);
      expect(result.recommendedRoadmapPreset).toBe(ReadinessPreset.ROAD_1_PRE_DEVICE_FOUNDATION);
      expect(result.growthAreas.length).toBe(10);
      expect(result.strengths.length).toBe(0);
    });

    it('resets store cleanly', () => {
      const store = useReadinessStore.getState();
      store.setChild('child-999', 'Maya');
      store.nextQuestion();
      store.nextQuestion();
      store.setAnswer('executive_function', {
        questionId: 'q-exec',
        dimensionKey: 'executive_function',
        score: 10,
        maxScore: 10,
        selectedOptionId: 'ef-10',
      });
      store.computeLocalResult();

      store.reset();

      const state = useReadinessStore.getState();
      expect(state.currentQuestionIndex).toBe(0);
      expect(Object.keys(state.answers)).toHaveLength(0);
      expect(state.result).toBeNull();
      expect(state.isSubmitting).toBe(false);
    });
  });
});
