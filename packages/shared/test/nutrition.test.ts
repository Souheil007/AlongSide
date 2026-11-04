import { describe, expect, it } from 'vitest';
import {
  generateAllergenSchedule,
  resolveDietaryStage,
  validateChokingHazards,
} from '../src/algorithms/nutrition.js';
import { DietaryStage } from '../src/constants/index.js';

describe('nutrition algorithms', () => {
  describe('resolveDietaryStage', () => {
    it('maps age in months to clinical dietary stages', () => {
      expect(resolveDietaryStage(4)).toBe(DietaryStage.MILK_ONLY);
      expect(resolveDietaryStage(7)).toBe(DietaryStage.SOLIDS_INTRODUCED);
      expect(resolveDietaryStage(24)).toBe(DietaryStage.TODDLER_TABLE);
      expect(resolveDietaryStage(72)).toBe(DietaryStage.BALANCED_SCHOOL);
      expect(resolveDietaryStage(160)).toBe(DietaryStage.PUBERTAL_GROWTH);
    });
  });

  describe('generateAllergenSchedule', () => {
    it('provides clinical allergen introduction schedule with eligibility flags', () => {
      const schedule4m = generateAllergenSchedule(4);
      const peanut4m = schedule4m.find((a) => a.allergen === 'Peanut');
      expect(peanut4m?.isEligible).toBe(true);

      const dairy4m = schedule4m.find((a) => a.allergen.includes('Dairy'));
      expect(dairy4m?.isEligible).toBe(false);

      const schedule7m = generateAllergenSchedule(7);
      const dairy7m = schedule7m.find((a) => a.allergen.includes('Dairy'));
      expect(dairy7m?.isEligible).toBe(true);
    });
  });

  describe('validateChokingHazards', () => {
    it('detects whole grapes and uncut hot dogs for toddlers under 4', () => {
      const result = validateChokingHazards(['Whole grapes', 'Apple juice', 'Hot dog rounds'], 18);
      expect(result.hasChokingHazards).toBe(true);
      expect(result.flaggedFoods).toContain('Whole grapes');
      expect(result.flaggedFoods).toContain('Hot dog rounds');
      expect(result.safetyGuidance.length).toBeGreaterThan(0);
    });

    it('does not flag foods for older children >= 4 years', () => {
      const result = validateChokingHazards(['Whole grapes', 'Hot dogs'], 60);
      expect(result.hasChokingHazards).toBe(false);
      expect(result.flaggedFoods).toHaveLength(0);
    });
  });
});
