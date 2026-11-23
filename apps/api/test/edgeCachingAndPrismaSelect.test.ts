import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { CHILD_SELECT_FIELDS } from '../src/modules/children/children.repository.js';
import { USER_SELECT_FIELDS } from '../src/modules/auth/auth.repository.js';

describe('HTTP Edge Caching Headers on Catalog Endpoints & Prisma Selective Fields', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await buildApp({
      logger: false,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Edge Caching Headers (Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=600)', () => {
    const EXPECTED_EDGE_CACHE =
      'public, max-age=60, s-maxage=300, stale-while-revalidate=600';

    it('emits Edge Caching headers on GET /api/v1/academy/categories', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/categories',
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['cache-control']).toBe(EXPECTED_EDGE_CACHE);
    });

    it('emits Edge Caching headers on public GET /api/v1/academy/modules', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules',
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['cache-control']).toBe(EXPECTED_EDGE_CACHE);
    });

    it('emits Edge Caching headers on GET /api/v1/digest/latest', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/latest',
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['cache-control']).toBe(EXPECTED_EDGE_CACHE);
    });

    it('emits Edge Caching headers on GET /api/v1/digest/issues', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/issues',
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['cache-control']).toBe(EXPECTED_EDGE_CACHE);
    });

    it('emits Edge Caching headers on GET /api/v1/faqs', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs',
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['cache-control']).toBe(EXPECTED_EDGE_CACHE);
    });

    it('emits Edge Caching headers on GET /api/v1/faqs/categories', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs/categories',
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['cache-control']).toBe(EXPECTED_EDGE_CACHE);
    });
  });

  describe('Prisma Selective Fields Projections', () => {
    it('CHILD_SELECT_FIELDS defines explicit scalar and relation projections without unneeded answer blobs', () => {
      expect(CHILD_SELECT_FIELDS.id).toBe(true);
      expect(CHILD_SELECT_FIELDS.name).toBe(true);
      expect(CHILD_SELECT_FIELDS.userId).toBe(true);
      expect(CHILD_SELECT_FIELDS.roadType).toBe(true);
      expect(CHILD_SELECT_FIELDS.developmentalTier).toBe(true);

      // Verify quizAttempts does NOT pull full JSON answer blobs
      expect(CHILD_SELECT_FIELDS.quizAttempts.select).toEqual({
        id: true,
        quizId: true,
        userId: true,
        childId: true,
        overallScore: true,
        dimensionScores: true,
        completedAt: true,
      });

      // Verify deviceProfiles only pulls the status field
      expect(CHILD_SELECT_FIELDS.deviceProfiles.select).toEqual({
        status: true,
      });
    });

    it('USER_SELECT_FIELDS defines explicit selective fields for user queries', () => {
      expect(USER_SELECT_FIELDS.id).toBe(true);
      expect(USER_SELECT_FIELDS.email).toBe(true);
      expect(USER_SELECT_FIELDS.fullName).toBe(true);
      expect(USER_SELECT_FIELDS.role).toBe(true);
      expect(USER_SELECT_FIELDS.subscription.select).toEqual({
        id: true,
        userId: true,
        tier: true,
        isActive: true,
        trialEndsAt: true,
        currentPeriodEnd: true,
      });
    });
  });
});
