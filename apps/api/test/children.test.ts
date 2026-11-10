import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { InMemoryChildrenRepository } from '../src/modules/children/children.repository.js';

describe('Child Profile CRUD, Contextual Road Fork & Readiness API (PLAN-04)', () => {
  let app: FastifyInstance;
  let inMemoryAuthRepo: InMemoryAuthRepository;
  let inMemoryChildrenRepo: InMemoryChildrenRepository;

  let userACookie: string;
  let userBCookie: string;

  beforeEach(async () => {
    inMemoryAuthRepo = new InMemoryAuthRepository();
    inMemoryChildrenRepo = new InMemoryChildrenRepository();

    app = await buildApp({
      logger: false,
      authRepository: inMemoryAuthRepo,
      childrenRepository: inMemoryChildrenRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });

    // Register User A (Parent A)
    const userARes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'parent.a@example.com',
        password: 'Password123!',
        fullName: 'Parent A',
      },
    });
    expect(userARes.statusCode).toBe(201);
    const cookiesA = userARes.headers['set-cookie'] as string | string[];
    userACookie = (Array.isArray(cookiesA) ? cookiesA[0] : cookiesA) ?? '';

    // Register User B (Parent B)
    const userBRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'parent.b@example.com',
        password: 'Password123!',
        fullName: 'Parent B',
      },
    });
    expect(userBRes.statusCode).toBe(201);
    const cookiesB = userBRes.headers['set-cookie'] as string | string[];
    userBCookie = (Array.isArray(cookiesB) ? cookiesB[0] : cookiesB) ?? '';
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/v1/children (Child Creation & Road Fork)', () => {
    it('creates child profile for PRE_DEVICE road type and calculates TIER_1_AGES_8_9', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Leo',
          birthYear: 2018,
          birthMonth: 6,
          roadType: 'PRE_DEVICE',
          schoolGrade: '3rd Grade',
        },
      });

      expect(response.statusCode).toBe(201);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.child).toBeDefined();
      expect(payload.data.child.name).toBe('Leo');
      expect(payload.data.child.birthYear).toBe(2018);
      expect(payload.data.child.birthMonth).toBe(6);
      expect(payload.data.child.roadType).toBe('PRE_DEVICE');
      expect(payload.data.child.developmentalTier).toBe('TIER_1_AGES_8_9');
      expect(payload.data.child.schoolGrade).toBe('3rd Grade');
      expect(payload.data.child.id).toBeDefined();
    });

    it('creates child profile for ACTIVE_DEVICE road type and calculates TIER_3_AGES_12_13', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Maya',
          birthYear: 2014,
          birthMonth: 6,
          roadType: 'ACTIVE_DEVICE',
          schoolGrade: '7th Grade',
        },
      });

      expect(response.statusCode).toBe(201);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.child.name).toBe('Maya');
      expect(payload.data.child.roadType).toBe('ACTIVE_DEVICE');
      expect(payload.data.child.developmentalTier).toBe('TIER_3_AGES_12_13');
    });

    it('correctly assigns TIER_2_AGES_10_11 for age 10-11', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Ethan',
          birthYear: 2016,
          birthMonth: 1,
          roadType: 'PRE_DEVICE',
        },
      });

      expect(response.statusCode).toBe(201);
      const payload = response.json();
      expect(payload.data.child.developmentalTier).toBe('TIER_2_AGES_10_11');
    });

    it('correctly assigns TIER_4_AGES_14_PLUS for teens 14+', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Chloe',
          birthYear: 2011,
          birthMonth: 1,
          roadType: 'ACTIVE_DEVICE',
        },
      });

      expect(response.statusCode).toBe(201);
      const payload = response.json();
      expect(payload.data.child.developmentalTier).toBe('TIER_4_AGES_14_PLUS');
    });

    it('correctly assigns TIER_1_EARLY_CHILDHOOD_4_6 for ages 4-6', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Toby',
          birthYear: 2020,
          birthMonth: 5,
          roadType: 'PRE_DEVICE',
        },
      });

      expect(response.statusCode).toBe(201);
      const payload = response.json();
      expect(payload.data.child.developmentalTier).toBe('TIER_1_EARLY_CHILDHOOD_4_6');
    });

    it('correctly assigns TIER_0B_TODDLER_1_2 for toddlers (and computes ageMonths)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Noah',
          birthYear: 2025,
          birthMonth: 5,
          roadType: 'PRE_DEVICE',
        },
      });

      expect(response.statusCode).toBe(201);
      const payload = response.json();
      expect(payload.data.child.developmentalTier).toBe('TIER_0B_TODDLER_1_2');
      expect(payload.data.child.ageMonths).toBeGreaterThan(11);
      expect(payload.data.child.ageMonths).toBeLessThanOrEqual(24);
      expect(payload.data.child.earlyChildhoodTranche).toBeDefined();
    });

    it('correctly assigns TIER_0A_INFANCY_0_1 for infants under 1 year', async () => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Baby Mia',
          birthYear: currentYear,
          birthMonth: currentMonth,
          roadType: 'PRE_DEVICE',
        },
      });

      expect(response.statusCode).toBe(201);
      const payload = response.json();
      expect(payload.data.child.developmentalTier).toBe('TIER_0A_INFANCY_0_1');
      expect(payload.data.child.ageMonths).toBe(0);
      expect(payload.data.child.earlyChildhoodTranche).toBe('INFANT_FOURTH_TRIMESTER_0_3M');
    });

    it('correctly assigns TIER_0C_OLDER_TODDLER_2_3 for older toddlers', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Liam',
          birthYear: 2023,
          birthMonth: 5,
          roadType: 'PRE_DEVICE',
        },
      });

      expect(response.statusCode).toBe(201);
      const payload = response.json();
      expect(payload.data.child.developmentalTier).toBe('TIER_0C_OLDER_TODDLER_2_3');
      expect(payload.data.child.ageMonths).toBeGreaterThan(24);
      expect(payload.data.child.earlyChildhoodTranche).toBeDefined();
    });

    it('honors explicitly provided canonical lifespan developmentalTier', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Sofia',
          birthYear: 2018,
          birthMonth: 5,
          roadType: 'PRE_DEVICE',
          developmentalTier: 'TIER_2_MIDDLE_CHILDHOOD_7_9',
        },
      });

      expect(response.statusCode).toBe(201);
      const payload = response.json();
      expect(payload.data.child.developmentalTier).toBe('TIER_2_MIDDLE_CHILDHOOD_7_9');
    });

    it('rejects unauthenticated requests with 401 Unauthorized', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        payload: {
          name: 'Ghost',
          birthYear: 2015,
          birthMonth: 1,
          roadType: 'PRE_DEVICE',
        },
      });

      expect(response.statusCode).toBe(401);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('UNAUTHORIZED');
    });

    it('rejects invalid input with 400 Bad Request and RFC 7807 envelope', async () => {
      // Empty name
      const resEmptyName = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: '',
          birthYear: 2015,
          birthMonth: 5,
          roadType: 'PRE_DEVICE',
        },
      });
      expect(resEmptyName.statusCode).toBe(400);
      const payloadEmpty = resEmptyName.json();
      expect(payloadEmpty.success).toBe(false);
      expect(payloadEmpty.error.code).toBe('VALIDATION_ERROR');
      expect(payloadEmpty.error.details.some((d: any) => d.field === 'name')).toBe(true);

      // Future birth year
      const resFutureYear = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Future Kid',
          birthYear: 2099,
          birthMonth: 5,
          roadType: 'PRE_DEVICE',
        },
      });
      expect(resFutureYear.statusCode).toBe(400);
      expect(resFutureYear.json().error.code).toBe('VALIDATION_ERROR');

      // Invalid road type
      const resBadRoad = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Kid',
          birthYear: 2015,
          birthMonth: 5,
          roadType: 'INVALID_ROAD',
        },
      });
      expect(resBadRoad.statusCode).toBe(400);
      expect(resBadRoad.json().error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/children (List Children & Tenant Isolation)', () => {
    it('returns only current authenticated parent children, enforcing strict tenant isolation', async () => {
      // Create 2 children for Parent A
      await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: { name: 'Child A1', birthYear: 2015, birthMonth: 3, roadType: 'PRE_DEVICE' },
      });
      await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: { name: 'Child A2', birthYear: 2017, birthMonth: 8, roadType: 'ACTIVE_DEVICE' },
      });

      // Create 1 child for Parent B
      await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userBCookie },
        payload: { name: 'Child B1', birthYear: 2016, birthMonth: 4, roadType: 'ACTIVE_DEVICE' },
      });

      // Parent A lists children
      const resA = await app.inject({
        method: 'GET',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
      });
      expect(resA.statusCode).toBe(200);
      const dataA = resA.json().data.children;
      expect(dataA).toHaveLength(2);
      expect(dataA.map((c: any) => c.name)).toEqual(['Child A1', 'Child A2']);

      // Parent B lists children
      const resB = await app.inject({
        method: 'GET',
        url: '/api/v1/children',
        headers: { cookie: userBCookie },
      });
      expect(resB.statusCode).toBe(200);
      const dataB = resB.json().data.children;
      expect(dataB).toHaveLength(1);
      expect(dataB[0].name).toBe('Child B1');
    });
  });

  describe('Cross-Tenant Access Rejection (GET, PUT, DELETE)', () => {
    let childAId: string;

    beforeEach(async () => {
      // Create Child under User A
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Sarahs Kid',
          birthYear: 2015,
          birthMonth: 5,
          roadType: 'PRE_DEVICE',
        },
      });
      childAId = res.json().data.child.id;
    });

    it('rejects User B GET on User A child with 404 Not Found', async () => {
      const res = await app.inject({
        method: 'GET',
        url: `/api/v1/children/${childAId}`,
        headers: { cookie: userBCookie },
      });

      expect(res.statusCode).toBe(404);
      const payload = res.json();
      expect(payload.success).toBe(false);
      expect(['NOT_FOUND', 'CHILD_NOT_FOUND']).toContain(payload.error.code);
    });

    it('rejects User B PUT on User A child with 404 Not Found', async () => {
      const res = await app.inject({
        method: 'PUT',
        url: `/api/v1/children/${childAId}`,
        headers: { cookie: userBCookie },
        payload: {
          name: 'Malicious Update',
        },
      });

      expect(res.statusCode).toBe(404);
      expect(['NOT_FOUND', 'CHILD_NOT_FOUND']).toContain(res.json().error.code);

      // Verify User A child was not modified
      const checkRes = await app.inject({
        method: 'GET',
        url: `/api/v1/children/${childAId}`,
        headers: { cookie: userACookie },
      });
      expect(checkRes.json().data.child.name).toBe('Sarahs Kid');
    });

    it('rejects User B DELETE on User A child with 404 Not Found', async () => {
      const res = await app.inject({
        method: 'DELETE',
        url: `/api/v1/children/${childAId}`,
        headers: { cookie: userBCookie },
      });

      expect(res.statusCode).toBe(404);
      expect(['NOT_FOUND', 'CHILD_NOT_FOUND']).toContain(res.json().error.code);

      // Verify User A child still exists
      const checkRes = await app.inject({
        method: 'GET',
        url: `/api/v1/children/${childAId}`,
        headers: { cookie: userACookie },
      });
      expect(checkRes.statusCode).toBe(200);
    });

    it('allows User A to successfully update child and recalculates developmental tier', async () => {
      // Change birth year from 2015 (age 11 -> Tier 2) to 2013 (age 13 -> Tier 3)
      const res = await app.inject({
        method: 'PUT',
        url: `/api/v1/children/${childAId}`,
        headers: { cookie: userACookie },
        payload: {
          birthYear: 2013,
          schoolGrade: '8th Grade',
        },
      });

      expect(res.statusCode).toBe(200);
      const child = res.json().data.child;
      expect(child.birthYear).toBe(2013);
      expect(child.schoolGrade).toBe('8th Grade');
      expect(child.developmentalTier).toBe('TIER_3_AGES_12_13');
    });

    it('allows User A to successfully delete child', async () => {
      const res = await app.inject({
        method: 'DELETE',
        url: `/api/v1/children/${childAId}`,
        headers: { cookie: userACookie },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().success).toBe(true);

      // Verify child is now gone
      const getRes = await app.inject({
        method: 'GET',
        url: `/api/v1/children/${childAId}`,
        headers: { cookie: userACookie },
      });
      expect(getRes.statusCode).toBe(404);
    });
  });

  describe('POST /api/v1/children/:id/readiness-assessment', () => {
    let childId: string;

    beforeEach(async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
        payload: {
          name: 'Ready Leo',
          birthYear: 2015,
          birthMonth: 6,
          roadType: 'PRE_DEVICE',
        },
      });
      childId = res.json().data.child.id;
    });

    it('evaluates high readiness (>= 85) and recommends ROAD_2_AUTONOMY_CHARTER', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/children/${childId}/readiness-assessment`,
        headers: { cookie: userACookie },
        payload: {
          responses: [
            { questionId: 'q1', dimensionKey: 'executive_function', score: 10, maxScore: 10 },
            { questionId: 'q2', dimensionKey: 'online_safety', score: 9, maxScore: 10 },
            { questionId: 'q3', dimensionKey: 'bedtime_habits', score: 9, maxScore: 10 },
            { questionId: 'q4', dimensionKey: 'peer_pressure_resilience', score: 9, maxScore: 10 },
            { questionId: 'q5', dimensionKey: 'emotional_regulation', score: 8, maxScore: 10 },
            { questionId: 'q6', dimensionKey: 'family_communication', score: 9, maxScore: 10 },
            { questionId: 'q7', dimensionKey: 'screen_time_balance', score: 8, maxScore: 10 },
            { questionId: 'q8', dimensionKey: 'critical_thinking', score: 9, maxScore: 10 },
            { questionId: 'q9', dimensionKey: 'privacy_awareness', score: 10, maxScore: 10 },
            { questionId: 'q10', dimensionKey: 'co_regulation_readiness', score: 9, maxScore: 10 },
          ],
        },
      });

      expect(response.statusCode).toBe(201);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.attempt).toBeDefined();

      const attempt = payload.data.attempt;
      expect(attempt.overallScore).toBe(90);
      expect(attempt.isReadyForPersonalPhone).toBe(true);
      expect(attempt.recommendedRoadmapPreset).toBe('ROAD_2_AUTONOMY_CHARTER');
      expect(attempt.dimensionScores.executive_function).toBe(100);
      expect(attempt.dimensionScores.privacy_awareness).toBe(100);
      expect(attempt.dimensionScores.online_safety).toBe(90);
      expect(attempt.recommendation).toContain('exceptional self-regulation');

      // Verify that listing children now reflects the latest assessment score
      const listRes = await app.inject({
        method: 'GET',
        url: '/api/v1/children',
        headers: { cookie: userACookie },
      });
      const listedChild = listRes.json().data.children.find((c: any) => c.id === childId);
      expect(listedChild.latestAssessmentScore).toBe(90);
    });

    it('evaluates moderate readiness (75-84) and recommends ROAD_2_SCAFFOLDED_PACT', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/children/${childId}/readiness-assessment`,
        headers: { cookie: userACookie },
        payload: {
          responses: [
            { questionId: 'q1', dimensionKey: 'executive_function', score: 8, maxScore: 10 },
            { questionId: 'q2', dimensionKey: 'online_safety', score: 8, maxScore: 10 },
            { questionId: 'q3', dimensionKey: 'bedtime_habits', score: 6, maxScore: 10 },
            { questionId: 'q4', dimensionKey: 'emotional_regulation', score: 8, maxScore: 10 },
            { questionId: 'q5', dimensionKey: 'family_communication', score: 8, maxScore: 10 },
          ],
        },
      });

      expect(response.statusCode).toBe(201);
      const attempt = response.json().data.attempt;
      expect(attempt.overallScore).toBe(76);
      expect(attempt.isReadyForPersonalPhone).toBe(true);
      expect(attempt.recommendedRoadmapPreset).toBe('ROAD_2_SCAFFOLDED_PACT');
    });

    it('evaluates developing readiness (50-74) and recommends ROAD_1_BRIDGE_CHARTER', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/children/${childId}/readiness-assessment`,
        headers: { cookie: userACookie },
        payload: {
          responses: [
            { questionId: 'q1', dimensionKey: 'executive_function', score: 6, maxScore: 10 },
            { questionId: 'q2', dimensionKey: 'bedtime_habits', score: 6, maxScore: 10 },
          ],
        },
      });

      expect(response.statusCode).toBe(201);
      const attempt = response.json().data.attempt;
      expect(attempt.overallScore).toBe(60);
      expect(attempt.isReadyForPersonalPhone).toBe(false);
      expect(attempt.recommendedRoadmapPreset).toBe('ROAD_1_BRIDGE_CHARTER');
    });

    it('evaluates foundation readiness (< 50) and recommends ROAD_1_PRE_DEVICE_FOUNDATION', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/children/${childId}/readiness-assessment`,
        headers: { cookie: userACookie },
        payload: {
          responses: [
            { questionId: 'q1', dimensionKey: 'executive_function', score: 3, maxScore: 10 },
            { questionId: 'q2', dimensionKey: 'online_safety', score: 4, maxScore: 10 },
          ],
        },
      });

      expect(response.statusCode).toBe(201);
      const attempt = response.json().data.attempt;
      expect(attempt.overallScore).toBe(35);
      expect(attempt.isReadyForPersonalPhone).toBe(false);
      expect(attempt.recommendedRoadmapPreset).toBe('ROAD_1_PRE_DEVICE_FOUNDATION');
    });

    it('rejects cross-tenant assessment submission with 404 Not Found', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/children/${childId}/readiness-assessment`,
        headers: { cookie: userBCookie },
        payload: {
          responses: [
            { questionId: 'q1', dimensionKey: 'executive_function', score: 8, maxScore: 10 },
          ],
        },
      });

      expect(response.statusCode).toBe(404);
      expect(['NOT_FOUND', 'CHILD_NOT_FOUND']).toContain(response.json().error.code);
    });

    it('rejects assessment with empty responses with 400 Bad Request', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/children/${childId}/readiness-assessment`,
        headers: { cookie: userACookie },
        payload: {
          responses: [],
        },
      });

      expect(response.statusCode).toBe(400);
      expect(response.json().error.code).toBe('VALIDATION_ERROR');
    });
  });
});
