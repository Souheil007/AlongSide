import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryMilestonesRepository } from '../src/modules/milestones/milestones.repository.js';
import { DevelopmentalTier, MilestoneCategory, MilestoneStatus } from '@alongside/shared';

describe('Developmental Milestones & Growth API (PLAN-16)', () => {
  let app: FastifyInstance;
  let milestonesRepo: InMemoryMilestonesRepository;

  beforeEach(async () => {
    milestonesRepo = new InMemoryMilestonesRepository();

    app = await buildApp({
      logger: false,
      milestonesRepository: milestonesRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/milestones', () => {
    it('returns all CDC & Bright Futures developmental milestones', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/milestones',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.milestones.length).toBeGreaterThanOrEqual(40);

      const first = payload.data.milestones[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('title');
      expect(first).toHaveProperty('category');
      expect(first).toHaveProperty('targetTier');
    });

    it('filters milestones by developmental tier', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/milestones?tier=${DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.milestones.length).toBeGreaterThanOrEqual(20);

      const allMatchTier = payload.data.milestones.every(
        (m: any) => m.targetTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );
      expect(allMatchTier).toBe(true);
    });

    it('filters milestones by category (e.g. GROSS_MOTOR)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/milestones?category=${MilestoneCategory.GROSS_MOTOR}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.milestones.length).toBeGreaterThan(0);

      const allMatchCategory = payload.data.milestones.every(
        (m: any) => m.category === MilestoneCategory.GROSS_MOTOR
      );
      expect(allMatchCategory).toBe(true);
    });

    it('filters milestones by age in months (targetAgeMonths <= limit)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/milestones?ageMonths=12',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);

      const allWithinAge = payload.data.milestones.every(
        (m: any) => m.targetAgeMonths <= 12
      );
      expect(allWithinAge).toBe(true);
    });

    it('rejects invalid filter query with 400 validation error', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/milestones?category=INVALID_CATEGORY',
      });

      expect(response.statusCode).toBe(400);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/v1/milestones/children/:childId (Achievement Tracking)', () => {
    it('records milestone achievement with notes', async () => {
      const allRes = await app.inject({
        method: 'GET',
        url: '/api/v1/milestones',
      });
      const firstMilestone = allRes.json().data.milestones[0];

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/milestones/children/child-demo-1',
        payload: {
          milestoneId: firstMilestone.id,
          status: MilestoneStatus.ACHIEVED,
          parentNotes: 'Smiled back at mommy this morning during feed!',
        },
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.childMilestone.milestoneId).toBe(firstMilestone.id);
      expect(payload.data.childMilestone.status).toBe(MilestoneStatus.ACHIEVED);
      expect(payload.data.childMilestone.parentNotes).toContain('Smiled back');
      expect(payload.data.childMilestone.achievedAt).not.toBeNull();
    });

    it('returns 404 when tracking non-existent milestoneId', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/milestones/children/child-demo-1',
        payload: {
          milestoneId: 'ms-non-existent-id',
          status: MilestoneStatus.ACHIEVED,
        },
      });

      expect(response.statusCode).toBe(404);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('NOT_FOUND');
    });

    it('rejects invalid payload with 400 validation error', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/milestones/children/child-demo-1',
        payload: {
          // missing milestoneId
          status: 'INVALID_STATUS',
        },
      });

      expect(response.statusCode).toBe(400);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('VALIDATION_ERROR');
    });
  });
});
