import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryNutritionRepository } from '../src/modules/nutrition/nutrition.repository.js';
import { DietaryStage } from '@alongside/shared';

describe('Pediatric Nutrition & Complementary Feeding API (PLAN-16)', () => {
  let app: FastifyInstance;
  let nutritionRepo: InMemoryNutritionRepository;

  beforeEach(async () => {
    nutritionRepo = new InMemoryNutritionRepository();

    app = await buildApp({
      logger: false,
      nutritionRepository: nutritionRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/nutrition/guides', () => {
    it('returns all pediatric nutrition guides', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/nutrition/guides',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.guides.length).toBe(5);

      const stages = payload.data.guides.map((g: any) => g.stage);
      expect(stages).toContain(DietaryStage.MILK_ONLY);
      expect(stages).toContain(DietaryStage.SOLIDS_INTRODUCED);
      expect(stages).toContain(DietaryStage.TODDLER_TABLE);
      expect(stages).toContain(DietaryStage.BALANCED_SCHOOL);
      expect(stages).toContain(DietaryStage.PUBERTAL_GROWTH);
    });

    it('filters nutrition guides by stage (e.g. SOLIDS_INTRODUCED)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/nutrition/guides?stage=${DietaryStage.SOLIDS_INTRODUCED}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.guides.length).toBe(1);

      const guide = payload.data.guides[0];
      expect(guide.stage).toBe(DietaryStage.SOLIDS_INTRODUCED);
      expect(guide.title).toContain('Baby-Led Weaning');
      expect(guide.chokingHazards.length).toBeGreaterThan(0);
      expect(guide.safeFoods.length).toBeGreaterThan(0);
      expect(guide.allergenProtocol).not.toBeNull();
    });

    it('rejects invalid stage with 400 Validation Error', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/nutrition/guides?stage=FAST_FOOD_STAGE',
      });

      expect(response.statusCode).toBe(400);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/nutrition/allergens', () => {
    it('returns early allergen introduction schedule for 7-month infant', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/nutrition/allergens?childAgeMonths=7',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(Array.isArray(payload.data.schedule)).toBe(true);
      expect(payload.data.schedule.length).toBeGreaterThanOrEqual(4);

      const allergens = payload.data.schedule.map((s: any) => s.allergen.toLowerCase());
      expect(allergens.some((a: string) => a.includes('peanut'))).toBe(true);
      expect(allergens.some((a: string) => a.includes('egg'))).toBe(true);
    });
  });
});
