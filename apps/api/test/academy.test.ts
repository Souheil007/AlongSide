import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { InMemoryAcademyRepository } from '../src/modules/academy/academy.repository.js';

describe('Parent Intelligence Academy API (PLAN-08)', () => {
  let app: FastifyInstance;
  let authRepo: InMemoryAuthRepository;
  let academyRepo: InMemoryAcademyRepository;

  let userACookie: string;
  let userBCookie: string;

  beforeEach(async () => {
    authRepo = new InMemoryAuthRepository();
    academyRepo = new InMemoryAcademyRepository();

    app = await buildApp({
      logger: false,
      authRepository: authRepo,
      academyRepository: academyRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });

    // Register User A
    const resA = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'parent.a@example.com',
        password: 'Password123!',
        fullName: 'Parent A',
      },
    });
    expect(resA.statusCode).toBe(201);
    const cookiesA = resA.headers['set-cookie'] as string | string[];
    userACookie = (Array.isArray(cookiesA) ? cookiesA[0] : cookiesA) ?? '';

    // Register User B
    const resB = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'parent.b@example.com',
        password: 'Password123!',
        fullName: 'Parent B',
      },
    });
    expect(resB.statusCode).toBe(201);
    const cookiesB = resB.headers['set-cookie'] as string | string[];
    userBCookie = (Array.isArray(cookiesB) ? cookiesB[0] : cookiesB) ?? '';
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/academy/modules', () => {
    it('returns all 6 lifespan neurodevelopmental modules across ages 0-18 when no tier filter is provided', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(Array.isArray(payload.data.modules)).toBe(true);
      expect(payload.data.modules.length).toBe(6);

      const tiers = payload.data.modules.map((m: any) => m.developmentalTier);
      expect(tiers).toContain('TIER_0_INFANCY_TODDLER_0_3');
      expect(tiers).toContain('TIER_1_EARLY_CHILDHOOD_4_6');
      expect(tiers).toContain('TIER_2_MIDDLE_CHILDHOOD_7_9');
      expect(tiers).toContain('TIER_3_PRE_TEEN_10_12');
      expect(tiers).toContain('TIER_4_EARLY_ADOLESCENCE_13_15');
      expect(tiers).toContain('TIER_5_LATE_ADOLESCENCE_16_18');
    });

    it('filters modules strictly by developmental tier (e.g. TIER_0_INFANCY_TODDLER_0_3)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules?tier=TIER_0_INFANCY_TODDLER_0_3',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.modules.length).toBe(1);

      const mod = payload.data.modules[0];
      expect(mod.slug).toBe('infant-sensory-milestones-and-coregulation');
      expect(mod.title).toContain('Infant & Toddler');
      expect(mod.developmentalTier).toBe('TIER_0_INFANCY_TODDLER_0_3');
      expect(mod.lessonCount).toBe(3);
      expect(mod.completedLessonCount).toBe(0);
      expect(mod.isCompleted).toBe(false);
    });

    it('supports backward-compatible legacy tier queries (e.g. TIER_2_AGES_10_11)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules?tier=TIER_2_AGES_10_11',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.modules.length).toBe(1);

      const mod = payload.data.modules[0];
      expect(mod.slug).toBe('tween-neurobiology-and-adrenarche');
      expect(mod.title).toContain('Tween Brain');
      expect(mod.developmentalTier).toBe('TIER_3_PRE_TEEN_10_12');
      expect(mod.lessonCount).toBe(3);
      expect(mod.completedLessonCount).toBe(0);
      expect(mod.isCompleted).toBe(false);
    });

    it('rejects invalid tier filter with 400 Validation Error', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules?tier=INVALID_TIER',
      });

      expect(response.statusCode).toBe(400);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/academy/modules/:slug', () => {
    it('returns module details with structured lesson summaries', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules/tween-neurobiology-and-adrenarche',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.module).toBeDefined();

      const mod = payload.data.module;
      expect(mod.slug).toBe('tween-neurobiology-and-adrenarche');
      expect(mod.lessons).toHaveLength(3);
      expect(mod.lessons[0].title).toBe(
        'Adrenarche: The Biological Awakening to Social Standing'
      );
      expect(mod.lessons[0].readingMinutes).toBe(5);
      expect(mod.lessons[0].isCompleted).toBe(false);
    });

    it('returns 404 NOT_FOUND for non-existent module slug', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules/non-existent-module-slug',
      });

      expect(response.statusCode).toBe(404);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('NOT_FOUND');
    });
  });

  describe('GET /api/v1/academy/lessons/:id', () => {
    it('returns full lesson markdown and parent module metadata', async () => {
      const lessonId =
        'les-tween-neurobiology-and-adrenarche-adrenarche-and-identity';

      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/academy/lessons/${lessonId}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.lesson).toBeDefined();

      const lesson = payload.data.lesson;
      expect(lesson.id).toBe(lessonId);
      expect(lesson.title).toBe(
        'Adrenarche: The Biological Awakening to Social Standing'
      );
      expect(lesson.contentMarkdown).toContain('adrenarche');
      expect(lesson.contentMarkdown).toContain('Alongside Empathetic Response');
      expect(lesson.module).toBeDefined();
      expect(lesson.module.slug).toBe('tween-neurobiology-and-adrenarche');
      expect(lesson.module.developmentalTier).toBe('TIER_3_PRE_TEEN_10_12');
    });

    it('returns 404 NOT_FOUND for non-existent lesson id', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/lessons/les-non-existent-id',
      });

      expect(response.statusCode).toBe(404);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('NOT_FOUND');
    });
  });

  describe('POST /api/v1/academy/lessons/:id/complete', () => {
    const lesson1Id =
      'les-tween-neurobiology-and-adrenarche-adrenarche-and-identity';
    const lesson2Id = 'les-tween-neurobiology-and-adrenarche-group-chats-fomo';
    const lesson3Id =
      'les-tween-neurobiology-and-adrenarche-calm-tech-conversations';

    it('rejects unauthenticated completion attempts with 401 UNAUTHORIZED', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/academy/lessons/${lesson1Id}/complete`,
      });

      expect(response.statusCode).toBe(401);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('UNAUTHORIZED');
    });

    it('records progress and updates module completion percentage', async () => {
      // User A completes lesson 1
      const res1 = await app.inject({
        method: 'POST',
        url: `/api/v1/academy/lessons/${lesson1Id}/complete`,
        headers: { cookie: userACookie },
      });

      expect(res1.statusCode).toBe(200);
      const payload1 = res1.json();
      expect(payload1.success).toBe(true);
      expect(payload1.data.progress.lessonId).toBe(lesson1Id);
      expect(payload1.data.progress.isCompleted).toBe(true);
      expect(payload1.data.module.completedLessonCount).toBe(1);
      expect(payload1.data.module.percentComplete).toBe(33);
      expect(payload1.data.module.isCompleted).toBe(false);

      // Verify module detail now reflects completion for User A
      const modResA = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules/tween-neurobiology-and-adrenarche',
        headers: { cookie: userACookie },
      });
      const modPayloadA = modResA.json();
      expect(modPayloadA.data.module.completedLessonCount).toBe(1);
      expect(modPayloadA.data.module.lessons[0].isCompleted).toBe(true);
      expect(modPayloadA.data.module.lessons[1].isCompleted).toBe(false);

      // User A completes lessons 2 and 3
      await app.inject({
        method: 'POST',
        url: `/api/v1/academy/lessons/${lesson2Id}/complete`,
        headers: { cookie: userACookie },
      });

      const res3 = await app.inject({
        method: 'POST',
        url: `/api/v1/academy/lessons/${lesson3Id}/complete`,
        headers: { cookie: userACookie },
      });

      const payload3 = res3.json();
      expect(payload3.data.module.completedLessonCount).toBe(3);
      expect(payload3.data.module.percentComplete).toBe(100);
      expect(payload3.data.module.isCompleted).toBe(true);
    });

    it('enforces tenant isolation: progress of User A does not affect User B', async () => {
      // User A completes lesson 1
      await app.inject({
        method: 'POST',
        url: `/api/v1/academy/lessons/${lesson1Id}/complete`,
        headers: { cookie: userACookie },
      });

      // User B inspects the module: should have 0 completed lessons
      const resB = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules/tween-neurobiology-and-adrenarche',
        headers: { cookie: userBCookie },
      });

      expect(resB.statusCode).toBe(200);
      const payloadB = resB.json();
      expect(payloadB.data.module.completedLessonCount).toBe(0);
      expect(payloadB.data.module.isCompleted).toBe(false);
      expect(payloadB.data.module.lessons[0].isCompleted).toBe(false);
    });

    it('returns 404 NOT_FOUND when attempting to complete non-existent lesson', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/academy/lessons/les-does-not-exist/complete',
        headers: { cookie: userACookie },
      });

      expect(response.statusCode).toBe(404);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('NOT_FOUND');
    });
  });
});
