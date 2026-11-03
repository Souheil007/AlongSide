import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../../../src/app.js';
import { InMemoryAuthRepository } from '../../../src/modules/auth/auth.repository.js';
import { InMemoryChildrenRepository } from '../../../src/modules/children/children.repository.js';
import { DevelopmentalTier, RoadType } from '@alongside/shared';

describe('Child Profile & Contextual Road Fork API (PLAN-04 / SOU-21)', () => {
  let app: FastifyInstance;
  let authRepo: InMemoryAuthRepository;
  let childrenRepo: InMemoryChildrenRepository;

  const parent1Id = 'parent-user-uuid-1';
  const parent2Id = 'parent-user-uuid-2';

  let parent1Token: string;
  let parent2Token: string;

  beforeEach(async () => {
    authRepo = new InMemoryAuthRepository();
    childrenRepo = new InMemoryChildrenRepository();

    app = await buildApp({
      logger: false,
      authRepository: authRepo,
      childrenRepository: childrenRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });

    // Generate JWT tokens for test parent users
    parent1Token = app.jwt.sign({
      id: parent1Id,
      userId: parent1Id,
      email: 'parent1@example.com',
      role: 'PARENT',
    });

    parent2Token = app.jwt.sign({
      id: parent2Id,
      userId: parent2Id,
      email: 'parent2@example.com',
      role: 'PARENT',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/v1/children (Create Child Profile)', () => {
    it('creates a child on PRE_DEVICE road and calculates correct developmental tier (Tier 1)', async () => {
      // Child born in 2018 (age ~8 in 2026) -> Tier 1
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: {
          authorization: `Bearer ${parent1Token}`,
        },
        payload: {
          name: 'Maya',
          birthYear: 2018,
          birthMonth: 5,
          roadType: RoadType.PRE_DEVICE,
          schoolGrade: '3rd Grade',
        },
      });

      expect(response.statusCode).toBe(201);
      const body = response.json();
      expect(body.success).toBe(true);
      expect(body.data.child).toBeDefined();
      expect(body.data.child.name).toBe('Maya');
      expect(body.data.child.roadType).toBe(RoadType.PRE_DEVICE);
      expect(body.data.child.developmentalTier).toBe(DevelopmentalTier.TIER_1_AGES_8_9);
      expect(body.data.child.schoolGrade).toBe('3rd Grade');
      expect(body.data.child.userId).toBe(parent1Id);
      expect(body.data.child.age).toBeGreaterThanOrEqual(7);
    });

    it('creates a child on ACTIVE_DEVICE road and calculates Tier 3 for 12-year-old', async () => {
      // Child born in 2014 (age 12 in 2026) -> Tier 3
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: {
          authorization: `Bearer ${parent1Token}`,
        },
        payload: {
          name: 'Leo',
          birthYear: 2014,
          birthMonth: 6,
          roadType: RoadType.ACTIVE_DEVICE,
          schoolGrade: '6th Grade',
        },
      });

      expect(response.statusCode).toBe(201);
      const body = response.json();
      expect(body.success).toBe(true);
      expect(body.data.child.name).toBe('Leo');
      expect(body.data.child.roadType).toBe(RoadType.ACTIVE_DEVICE);
      expect(body.data.child.developmentalTier).toBe(DevelopmentalTier.TIER_3_AGES_12_13);
    });

    it('rejects unauthenticated request with 401 Unauthorized', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        payload: {
          name: 'Alex',
          birthYear: 2015,
          birthMonth: 4,
          roadType: RoadType.PRE_DEVICE,
        },
      });

      expect(response.statusCode).toBe(401);
      const body = response.json();
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('UNAUTHORIZED');
    });

    it('validates input and rejects invalid roadType with 400 Bad Request', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: {
          authorization: `Bearer ${parent1Token}`,
        },
        payload: {
          name: 'Sam',
          birthYear: 2015,
          birthMonth: 4,
          roadType: 'INVALID_ROAD',
        },
      });

      expect(response.statusCode).toBe(400);
      const body = response.json();
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('validates input and rejects empty child name with 400 Bad Request', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: {
          authorization: `Bearer ${parent1Token}`,
        },
        payload: {
          name: '',
          birthYear: 2015,
          birthMonth: 4,
          roadType: RoadType.PRE_DEVICE,
        },
      });

      expect(response.statusCode).toBe(400);
      const body = response.json();
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/children (List Children with Tenant Isolation)', () => {
    it('returns only current user children and hides other parents children', async () => {
      // Create children for parent 1
      await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Child 1 of Parent 1',
          birthYear: 2016,
          birthMonth: 3,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Child 2 of Parent 1',
          birthYear: 2013,
          birthMonth: 8,
          roadType: RoadType.ACTIVE_DEVICE,
        },
      });

      // Create child for parent 2
      await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent2Token}` },
        payload: {
          name: 'Child of Parent 2',
          birthYear: 2014,
          birthMonth: 1,
          roadType: RoadType.ACTIVE_DEVICE,
        },
      });

      // Query parent 1's children
      const response1 = await app.inject({
        method: 'GET',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
      });

      expect(response1.statusCode).toBe(200);
      const body1 = response1.json();
      expect(body1.success).toBe(true);
      expect(body1.data.children).toHaveLength(2);
      expect(body1.data.children.map((c: any) => c.name)).toEqual([
        'Child 1 of Parent 1',
        'Child 2 of Parent 1',
      ]);

      // Query parent 2's children
      const response2 = await app.inject({
        method: 'GET',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent2Token}` },
      });

      expect(response2.statusCode).toBe(200);
      const body2 = response2.json();
      expect(body2.success).toBe(true);
      expect(body2.data.children).toHaveLength(1);
      expect(body2.data.children[0].name).toBe('Child of Parent 2');
    });
  });

  describe('GET /api/v1/children/:id (Get Child by ID & Tenant Isolation)', () => {
    it('returns child details when requested by owning parent', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Chloe',
          birthYear: 2015,
          birthMonth: 2,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      const childId = createRes.json().data.child.id;

      const getRes = await app.inject({
        method: 'GET',
        url: `/api/v1/children/${childId}`,
        headers: { authorization: `Bearer ${parent1Token}` },
      });

      expect(getRes.statusCode).toBe(200);
      const body = getRes.json();
      expect(body.success).toBe(true);
      expect(body.data.child.id).toBe(childId);
      expect(body.data.child.name).toBe('Chloe');
    });

    it('returns 404 Not Found when another parent attempts to read child (tenant isolation check)', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Private Child',
          birthYear: 2016,
          birthMonth: 9,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      const childId = createRes.json().data.child.id;

      // Parent 2 attempts to read Parent 1's child
      const getRes = await app.inject({
        method: 'GET',
        url: `/api/v1/children/${childId}`,
        headers: { authorization: `Bearer ${parent2Token}` },
      });

      expect(getRes.statusCode).toBe(404);
      const body = getRes.json();
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });

    it('returns 404 Not Found for non-existent child ID', async () => {
      const getRes = await app.inject({
        method: 'GET',
        url: '/api/v1/children/non-existent-uuid',
        headers: { authorization: `Bearer ${parent1Token}` },
      });

      expect(getRes.statusCode).toBe(404);
    });
  });

  describe('PUT /api/v1/children/:id (Update Child Profile)', () => {
    it('updates child name and recalculates developmental tier when birthdate changes', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Oliver',
          birthYear: 2018, // Age 8 -> Tier 1
          birthMonth: 6,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      const childId = createRes.json().data.child.id;
      expect(createRes.json().data.child.developmentalTier).toBe(
        DevelopmentalTier.TIER_1_AGES_8_9
      );

      // Update birthYear to 2014 (Age 12 -> Tier 3)
      const updateRes = await app.inject({
        method: 'PUT',
        url: `/api/v1/children/${childId}`,
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          birthYear: 2014,
          roadType: RoadType.ACTIVE_DEVICE,
        },
      });

      expect(updateRes.statusCode).toBe(200);
      const updatedChild = updateRes.json().data.child;
      expect(updatedChild.birthYear).toBe(2014);
      expect(updatedChild.roadType).toBe(RoadType.ACTIVE_DEVICE);
      expect(updatedChild.developmentalTier).toBe(DevelopmentalTier.TIER_3_AGES_12_13);
    });

    it('returns 404 Not Found when attempting to update another parent child', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Parent1 Child',
          birthYear: 2015,
          birthMonth: 1,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      const childId = createRes.json().data.child.id;

      const updateRes = await app.inject({
        method: 'PUT',
        url: `/api/v1/children/${childId}`,
        headers: { authorization: `Bearer ${parent2Token}` },
        payload: {
          name: 'Hacked Name',
        },
      });

      expect(updateRes.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/v1/children/:id (Delete Child Profile)', () => {
    it('deletes child profile and ensures it is no longer listed', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Child To Delete',
          birthYear: 2015,
          birthMonth: 7,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      const childId = createRes.json().data.child.id;

      const deleteRes = await app.inject({
        method: 'DELETE',
        url: `/api/v1/children/${childId}`,
        headers: { authorization: `Bearer ${parent1Token}` },
      });

      expect(deleteRes.statusCode).toBe(200);
      expect(deleteRes.json().success).toBe(true);

      // Verify child is gone
      const getRes = await app.inject({
        method: 'GET',
        url: `/api/v1/children/${childId}`,
        headers: { authorization: `Bearer ${parent1Token}` },
      });
      expect(getRes.statusCode).toBe(404);
    });

    it('returns 404 Not Found when attempting to delete another parent child', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Protected Child',
          birthYear: 2015,
          birthMonth: 7,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      const childId = createRes.json().data.child.id;

      const deleteRes = await app.inject({
        method: 'DELETE',
        url: `/api/v1/children/${childId}`,
        headers: { authorization: `Bearer ${parent2Token}` },
      });

      expect(deleteRes.statusCode).toBe(404);
    });
  });

  describe('POST /api/v1/children/:id/readiness-assessment (Readiness Assessment Engine)', () => {
    it('evaluates 10-dimension readiness assessment, computes 0-100 score, and persists attempt', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Jordan',
          birthYear: 2014,
          birthMonth: 10,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      const childId = createRes.json().data.child.id;

      const assessmentResponse = await app.inject({
        method: 'POST',
        url: `/api/v1/children/${childId}/readiness-assessment`,
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          answers: [
            { questionId: 'q1', dimensionKey: 'executive_function', score: 8, maxScore: 10 },
            { questionId: 'q2', dimensionKey: 'online_safety', score: 8, maxScore: 10 },
            { questionId: 'q3', dimensionKey: 'bedtime_habits', score: 7, maxScore: 10 },
            { questionId: 'q4', dimensionKey: 'peer_pressure_resilience', score: 7, maxScore: 10 },
            { questionId: 'q5', dimensionKey: 'emotional_regulation', score: 8, maxScore: 10 },
            { questionId: 'q6', dimensionKey: 'privacy_awareness', score: 8, maxScore: 10 },
            { questionId: 'q7', dimensionKey: 'content_critical_thinking', score: 7, maxScore: 10 },
            { questionId: 'q8', dimensionKey: 'digital_etiquette', score: 8, maxScore: 10 },
            { questionId: 'q9', dimensionKey: 'time_management', score: 7, maxScore: 10 },
            { questionId: 'q10', dimensionKey: 'parent_communication', score: 9, maxScore: 10 },
          ],
        },
      });

      expect(assessmentResponse.statusCode).toBe(201);
      const body = assessmentResponse.json();
      expect(body.success).toBe(true);

      const attempt = body.data.attempt;
      expect(attempt).toBeDefined();
      expect(attempt.childId).toBe(childId);
      expect(attempt.overallScore).toBe(77); // (77/100) -> 77%
      expect(attempt.isReadyForPersonalPhone).toBe(true);
      expect(attempt.recommendedRoadmapPreset).toBe('ROAD_2_SCAFFOLDED_PACT');
      expect(attempt.dimensionScores.executive_function).toBe(80);
      expect(attempt.dimensionScores.parent_communication).toBe(90);

      // Verify that list children endpoint now shows Jordan with latestAssessmentScore = 77
      const listRes = await app.inject({
        method: 'GET',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
      });
      expect(listRes.statusCode).toBe(200);
      const jordan = listRes.json().data.children.find((c: any) => c.id === childId);
      expect(jordan.latestAssessmentScore).toBe(77);
    });

    it('recommends ROAD_1_BRIDGE_CHARTER when assessment score is below 75', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Ben',
          birthYear: 2016,
          birthMonth: 4,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      const childId = createRes.json().data.child.id;

      const assessmentResponse = await app.inject({
        method: 'POST',
        url: `/api/v1/children/${childId}/readiness-assessment`,
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          answers: [
            { questionId: 'q1', dimensionKey: 'executive_function', score: 5, maxScore: 10 },
            { questionId: 'q2', dimensionKey: 'online_safety', score: 6, maxScore: 10 },
            { questionId: 'q3', dimensionKey: 'bedtime_habits', score: 4, maxScore: 10 },
          ],
        },
      });

      expect(assessmentResponse.statusCode).toBe(201);
      const attempt = assessmentResponse.json().data.attempt;
      expect(attempt.overallScore).toBe(50);
      expect(attempt.isReadyForPersonalPhone).toBe(false);
      expect(attempt.recommendedRoadmapPreset).toBe('ROAD_1_BRIDGE_CHARTER');
    });

    it('enforces tenant isolation and returns 404 if parent attempts assessment on another parent child', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${parent1Token}` },
        payload: {
          name: 'Parent1 Child',
          birthYear: 2015,
          birthMonth: 1,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      const childId = createRes.json().data.child.id;

      // Parent 2 submits assessment for Parent 1's child
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/children/${childId}/readiness-assessment`,
        headers: { authorization: `Bearer ${parent2Token}` },
        payload: {
          answers: [
            { questionId: 'q1', dimensionKey: 'executive_function', score: 10, maxScore: 10 },
          ],
        },
      });

      expect(response.statusCode).toBe(404);
    });
  });
});
