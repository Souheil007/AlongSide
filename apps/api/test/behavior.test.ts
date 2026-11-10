import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryBehaviorRepository } from '../src/modules/behavior/behavior.repository.js';
import { DevelopmentalTier } from '@alongside/shared';

describe('Behavioral Translation & De-escalation Scripts API (PLAN-16)', () => {
  let app: FastifyInstance;
  let behaviorRepo: InMemoryBehaviorRepository;

  beforeEach(async () => {
    behaviorRepo = new InMemoryBehaviorRepository();

    app = await buildApp({
      logger: false,
      behaviorRepository: behaviorRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/behavior/guides', () => {
    it('returns behavioral translation guides across tiers', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/behavior/guides',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.guides.length).toBeGreaterThanOrEqual(8);

      const first = payload.data.guides[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('slug');
      expect(first).toHaveProperty('triggerSituation');
      expect(first).toHaveProperty('underlyingNeed');
      expect(first).toHaveProperty('coRegulationScript');
      expect(first).toHaveProperty('authoritativeLimit');
    });

    it('filters behavioral guides by tier (e.g. TIER_0_INFANCY_TODDLER_0_3)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/behavior/guides?tier=${DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.guides.length).toBeGreaterThan(0);

      const earlyChildhoodTiers = [
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
        DevelopmentalTier.TIER_0A_INFANCY_0_1,
        DevelopmentalTier.TIER_0B_TODDLER_1_2,
        DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
      ];
      const allMatchTier = payload.data.guides.every(
        (g: any) => earlyChildhoodTiers.includes(g.targetTier)
      );
      expect(allMatchTier).toBe(true);
    });

    it('filters behavioral guides by decomposed tier (TIER_0A_INFANCY_0_1)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/behavior/guides?tier=${DevelopmentalTier.TIER_0A_INFANCY_0_1}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.guides.length).toBeGreaterThan(0);
      expect(
        payload.data.guides.every(
          (g: any) =>
            g.targetTier === DevelopmentalTier.TIER_0A_INFANCY_0_1 ||
            g.targetTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
        )
      ).toBe(true);
    });
  });

  describe('GET /api/v1/behavior/guides/:slug', () => {
    it('retrieves individual behavioral guide by slug', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/behavior/guides/toddler-grocery-store-meltdown',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.guide.slug).toBe('toddler-grocery-store-meltdown');
      expect(payload.data.guide.coRegulationScript).toContain('candy');
      expect(payload.data.guide.underlyingNeed).toContain('HALT');
    });

    it('returns 404 for unknown behavioral guide slug', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/behavior/guides/unknown-behavior-slug',
      });

      expect(response.statusCode).toBe(404);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('NOT_FOUND');
    });
  });
});
