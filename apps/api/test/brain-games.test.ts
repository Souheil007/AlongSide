import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryBrainGamesRepository } from '../src/modules/brain-games/brain-games.repository.js';
import {
  DevelopmentalPlayAdapter,
  FakePlayRecommender,
} from '../src/modules/brain-games/play.recommender.js';
import { DevelopmentalTier, PlayCategory } from '@alongside/shared';

describe('Brain Games & Purposeful Play API (PLAN-16)', () => {
  let app: FastifyInstance;
  let brainGamesRepo: InMemoryBrainGamesRepository;
  let playRecommender: DevelopmentalPlayAdapter;

  beforeEach(async () => {
    brainGamesRepo = new InMemoryBrainGamesRepository();
    playRecommender = new DevelopmentalPlayAdapter(brainGamesRepo);

    app = await buildApp({
      logger: false,
      brainGamesRepository: brainGamesRepo,
      playRecommender,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/brain-games', () => {
    it('returns purposeful play catalog', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/brain-games',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.activities.length).toBeGreaterThanOrEqual(10);

      const first = payload.data.activities[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('title');
      expect(first).toHaveProperty('instructions');
      expect(first).toHaveProperty('targetSkills');
    });

    it('filters brain games by developmental tier (e.g. TIER_0_INFANCY_TODDLER_0_3)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/brain-games?tier=${DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.activities.length).toBeGreaterThan(0);

      const earlyChildhoodTiers = [
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
        DevelopmentalTier.TIER_0A_INFANCY_0_1,
        DevelopmentalTier.TIER_0B_TODDLER_1_2,
        DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
      ];
      const allMatchTier = payload.data.activities.every(
        (a: any) => earlyChildhoodTiers.includes(a.targetTier)
      );
      expect(allMatchTier).toBe(true);
    });

    it('filters brain games by decomposed tier (TIER_0A_INFANCY_0_1)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/brain-games?tier=${DevelopmentalTier.TIER_0A_INFANCY_0_1}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.activities.length).toBeGreaterThan(0);
      expect(
        payload.data.activities.every(
          (a: any) =>
            a.targetTier === DevelopmentalTier.TIER_0A_INFANCY_0_1 ||
            a.targetTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
        )
      ).toBe(true);
    });

    it('filters brain games by play category (e.g. PUPPET)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/brain-games?category=${PlayCategory.PUPPET}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.activities.length).toBeGreaterThan(0);

      const allMatchCategory = payload.data.activities.every(
        (a: any) => a.category === PlayCategory.PUPPET
      );
      expect(allMatchCategory).toBe(true);
    });

    it('rejects invalid category with 400 validation error', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/brain-games?category=INVALID_PLAY_CATEGORY',
      });

      expect(response.statusCode).toBe(400);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/brain-games/daily (Seam 9 Recommender)', () => {
    it('returns daily purposeful play recommendation for tier', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/brain-games/daily?tier=${DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.activity).toHaveProperty('title');
      expect(payload.data.activity).toHaveProperty('instructions');
      expect(payload.data.activity.isScreenFree).toBe(true);
    });

    it('allows substituting FakePlayRecommender at Seam 9', async () => {
      const fakeRecommender = new FakePlayRecommender();
      fakeRecommender.setRecommendation({
        id: 'canned-play-id',
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        category: PlayCategory.CONSTRUCTION,
        title: 'Canned Unit Block Bridge',
        summary: 'Canned summary for testing',
        instructions: 'Test instructions',
        materialsNeeded: ['1 block'],
        targetSkills: ['Testing skill'],
        estimatedMinutes: 5,
        isScreenFree: true,
      });

      const customApp = await buildApp({
        logger: false,
        brainGamesRepository: brainGamesRepo,
        playRecommender: fakeRecommender,
      });

      const response = await customApp.inject({
        method: 'GET',
        url: `/api/v1/brain-games/daily?tier=${DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.data.activity.title).toBe('Canned Unit Block Bridge');
      expect(payload.data.activity.id).toBe('canned-play-id');

      await customApp.close();
    });
  });
});
