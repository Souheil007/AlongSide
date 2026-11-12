import { describe, expect, it } from 'vitest';
import { NutritionStage } from '@alongside/shared';
import {
  CANONICAL_NUTRITION_GUIDES,
  CANONICAL_ALLERGEN_SCHEDULE,
  CANONICAL_CHOKING_HAZARDS,
  getNutritionGuides,
  getAllergenSchedule,
  getChokingHazards,
} from '../src/lib/api/nutrition';

describe('Pediatric Nutrition, Feeding Hub & BLW Specification (PLAN-18)', () => {
  describe('Lifespan Nutritional Guides & Hazard Mechanisms', () => {
    it('covers all 5 developmental feeding stages from infancy through adolescence', () => {
      expect(CANONICAL_NUTRITION_GUIDES.length).toBe(5);

      const stages = CANONICAL_NUTRITION_GUIDES.map((g) => g.stage);
      expect(stages).toContain(NutritionStage.MILK_ONLY);
      expect(stages).toContain(NutritionStage.SOLIDS_INTRODUCED);
      expect(stages).toContain(NutritionStage.TODDLER_TABLE);
      expect(stages).toContain(NutritionStage.BALANCED_SCHOOL);
      expect(stages).toContain(NutritionStage.PUBERTAL_GROWTH);
    });

    it('Stage 1 strictly prohibits water intoxication and honey botulism', () => {
      const stage1 = CANONICAL_NUTRITION_GUIDES.find((g) => g.stage === NutritionStage.MILK_ONLY);
      expect(stage1).toBeDefined();

      const hazards = stage1!.foodsToAvoid;
      const waterHazard = hazards.find((h) => h.food.includes('Water'));
      expect(waterHazard).toBeDefined();
      expect(waterHazard!.mechanism).toContain('dilutes infant serum sodium');

      const honeyHazard = hazards.find((h) => h.food.includes('Honey'));
      expect(honeyHazard).toBeDefined();
      expect(honeyHazard!.mechanism).toContain('Clostridium botulinum');
      expect(honeyHazard!.strictAgeMonths).toBe(12);
    });

    it('Stage 2 enforces baby-led weaning safe slicing and choking prevention', () => {
      const stage2 = CANONICAL_NUTRITION_GUIDES.find((g) => g.stage === NutritionStage.SOLIDS_INTRODUCED);
      expect(stage2).toBeDefined();

      const hazards = stage2!.foodsToAvoid;
      const grapeHazard = hazards.find((h) => h.food.includes('Grapes'));
      expect(grapeHazard).toBeDefined();
      expect(grapeHazard!.exceptionAllowed).toContain('sliced lengthwise into 4 thin spears');

      expect(stage2!.blwTips.some((t) => t.includes('Gagging vs. Choking'))).toBe(true);
      expect(stage2!.dorPrinciples.goldenRule).toContain('Food before one is just for fun');
    });

    it('Stage 3 enforces Ellyn Satter Division of Responsibility and excessive milk warnings', () => {
      const stage3 = CANONICAL_NUTRITION_GUIDES.find((g) => g.stage === NutritionStage.TODDLER_TABLE);
      expect(stage3).toBeDefined();

      const dor = stage3!.dorPrinciples;
      expect(dor.parentDecides.length).toBeGreaterThan(0);
      expect(dor.childDecides.length).toBeGreaterThan(0);
      expect(dor.goldenRule).toContain('Parents provide, child decides');

      const milkHazard = stage3!.foodsToAvoid.find((h) => h.hazardType === 'MILK_ANEMIA');
      expect(milkHazard).toBeDefined();
      expect(milkHazard!.mechanism).toContain('blocks iron absorption');
    });
  });

  describe('Safe Early Allergen Introduction Tracker (LEAP & EAT Trials)', () => {
    it('catalogs the top 8 major food allergens with high-trust pediatric trial citations', () => {
      expect(CANONICAL_ALLERGEN_SCHEDULE.length).toBe(8);

      const allergens = CANONICAL_ALLERGEN_SCHEDULE.map((a) => a.allergen);
      expect(allergens).toContain('Peanut');
      expect(allergens).toContain('Egg');
      expect(allergens).toContain('Cow’s Milk (Dairy)');
      expect(allergens).toContain('Tree Nuts (Almond, Cashew, Walnut)');
      expect(allergens).toContain('Wheat (Gluten)');
      expect(allergens).toContain('Fish (Salmon, Cod)');
      expect(allergens).toContain('Soy');
      expect(allergens).toContain('Sesame');

      const peanut = CANONICAL_ALLERGEN_SCHEDULE.find((a) => a.allergen === 'Peanut');
      expect(peanut!.evidenceTrial).toContain('LEAP Trial');
      expect(peanut!.safetyWarning).toContain('Never offer whole peanuts or sticky spoonfuls');
      expect(peanut!.recommendedFormat).toContain('thinned with warm water');
      expect(peanut!.recommendedStartMonth).toBe(4);
    });

    it('specifies regular maintenance exposure frequency to preserve immune tolerance', () => {
      for (const item of CANONICAL_ALLERGEN_SCHEDULE) {
        expect(item.frequencyMaintenance).toBeDefined();
        expect(item.frequencyMaintenance.length).toBeGreaterThan(5);
        expect(item.preparationInstructions).toBeDefined();
        expect(item.recommendedStartMonth).toBeGreaterThanOrEqual(4);
      }
    });
  });

  describe('High-Risk Choking Hazards Registry & Modification Protocol', () => {
    it('documents high-risk round and firm foods requiring mandatory lengthwise slicing', () => {
      expect(CANONICAL_CHOKING_HAZARDS.length).toBeGreaterThanOrEqual(6);

      const items = CANONICAL_CHOKING_HAZARDS.map((h) => h.foodItem);
      expect(items.some((i) => i.includes('Grapes'))).toBe(true);
      expect(items.some((i) => i.includes('Hot Dogs'))).toBe(true);
      expect(items.some((i) => i.includes('Raw Carrots'))).toBe(true);
      expect(items.some((i) => i.includes('Popcorn'))).toBe(true);
      expect(items.some((i) => i.includes('Peanut Butter'))).toBe(true);
      expect(items.some((i) => i.includes('Hard Candies'))).toBe(true);

      const grapeItem = CANONICAL_CHOKING_HAZARDS.find((h) => h.foodItem.includes('Grapes'));
      expect(grapeItem!.riskLevel).toBe('CRITICAL');
      expect(grapeItem!.safeModification.toLowerCase()).toContain('quarter lengthwise');
      expect(grapeItem!.avoidUntilAgeYears).toBe(4);
    });
  });

  describe('Offline Fallback & API Client Integration', () => {
    it('retrieves nutrition guides with offline fallback', async () => {
      const allGuides = await getNutritionGuides();
      expect(allGuides.length).toBe(5);

      const stage2Guides = await getNutritionGuides(NutritionStage.SOLIDS_INTRODUCED);
      expect(stage2Guides.length).toBe(1);
      expect(stage2Guides[0]!.stage).toBe(NutritionStage.SOLIDS_INTRODUCED);
    });

    it('retrieves allergen schedule and choking hazards with offline fallback', async () => {
      const schedule = await getAllergenSchedule();
      expect(schedule.length).toBe(8);

      const hazards = await getChokingHazards();
      expect(hazards.length).toBe(6);
    });
  });
});
