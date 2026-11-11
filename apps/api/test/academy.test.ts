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
    it('returns all lifespan neurodevelopmental modules across ages 0-18 when no tier filter is provided', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(Array.isArray(payload.data.modules)).toBe(true);
      expect(payload.data.modules.length).toBe(40);

      const tiers = payload.data.modules.map((m: any) => m.developmentalTier);
      expect(tiers).toContain('TIER_0A_INFANCY_0_1');
      expect(tiers).toContain('TIER_0B_TODDLER_1_2');
      expect(tiers).toContain('TIER_0C_OLDER_TODDLER_2_3');
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
      expect(payload.data.modules.length).toBe(15);

      const mod = payload.data.modules.find((m: any) =>
        m.slug.includes('infant')
      );
      expect(mod).toBeDefined();
      expect(mod.title).toContain('Infant');
      expect(mod.developmentalTier).toBe('TIER_0A_INFANCY_0_1');
      expect(mod.lessonCount).toBe(4);
      expect(mod.completedLessonCount).toBe(0);
      expect(mod.isCompleted).toBe(false);
    });

    it('filters modules strictly by decomposed tier (e.g. TIER_0A_INFANCY_0_1)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules?tier=TIER_0A_INFANCY_0_1',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.modules.length).toBe(5);

      for (const mod of payload.data.modules) {
        expect(mod.developmentalTier).toBe('TIER_0A_INFANCY_0_1');
        expect(mod.lessonCount).toBe(4);
      }
    });

    it('supports backward-compatible legacy tier queries (e.g. TIER_2_AGES_10_11)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules?tier=TIER_2_AGES_10_11',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.modules.length).toBe(5);

      const mod = payload.data.modules.find((m: any) =>
        m.slug.includes('tween')
      );
      expect(mod).toBeDefined();
      expect(mod.title).toContain('Tween');
      expect(mod.developmentalTier).toBe('TIER_3_PRE_TEEN_10_12');
      expect(mod.lessonCount).toBe(4);
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
      expect(mod.lessons).toHaveLength(4);
      expect(mod.lessons[0].title).toBe(
        'The Non-Reactive Neutral Stance: Neutralizing Sarcasm Instantly'
      );
      expect(mod.lessons[0].readingMinutes).toBe(4);
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
        'les-behavior-tween-adrenarche-tween-non-reactive-neutral-stance';

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
        'The Non-Reactive Neutral Stance: Neutralizing Sarcasm Instantly'
      );
      expect(lesson.contentMarkdown).toContain('adrenarche');
      expect(lesson.contentMarkdown).toContain('What to Say Instead');
      expect(lesson.module).toBeDefined();
      expect(lesson.module.slug).toBe('behavior-tween-adrenarche');
      expect(lesson.module.developmentalTier).toBe('TIER_3_PRE_TEEN_10_12');

      // PLAN-38 / SOU-99 Enriched DTO Fields
      expect(typeof lesson.reliefTagline).toBe('string');
      expect(lesson.reliefTagline.length).toBeGreaterThan(0);
      expect(lesson.adaptiveModuleType).toBe('SOMATIC_RESET');
      expect(lesson.thirtySecondGlance).toBeDefined();
      expect(typeof lesson.thirtySecondGlance.coreProblem).toBe('string');
      expect(typeof lesson.thirtySecondGlance.immediateShift).toBe('string');
      expect(typeof lesson.thirtySecondGlance.exactWords).toBe('string');
      expect(Array.isArray(lesson.dialogueCards)).toBe(true);
      expect(lesson.dialogueCards.length).toBeGreaterThan(0);
      expect(lesson.dialogueCards[0]).toHaveProperty('instinctiveMistake');
      expect(lesson.dialogueCards[0]).toHaveProperty('whyItBackfires');
      expect(lesson.dialogueCards[0]).toHaveProperty('empatheticScript');
      expect(lesson.dialogueCards[0]).toHaveProperty('deliveryTip');
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

    it('resolves category-specific adaptive module types across all 5 canonical categories', async () => {
      // 1. Behavior -> SOMATIC_RESET
      const resBehavior = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/lessons/by-slug/infant-somatic-soothing-sequence',
      });
      expect(resBehavior.statusCode).toBe(200);
      expect(resBehavior.json().data.lesson.adaptiveModuleType).toBe('SOMATIC_RESET');

      // 2. Health & Sleep -> CIRCADIAN_TIMELINE
      const resHealth = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/lessons/by-slug/infant-safe-sleep-and-circadian-reset',
      });
      expect(resHealth.statusCode).toBe(200);
      expect(resHealth.json().data.lesson.adaptiveModuleType).toBe('CIRCADIAN_TIMELINE');

      // 3. Nutrition -> FEEDING_LADDER
      const resNutrition = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/lessons/by-slug/early-allergen-introduction-science',
      });
      expect(resNutrition.statusCode).toBe(200);
      expect(resNutrition.json().data.lesson.adaptiveModuleType).toBe('FEEDING_LADDER');

      // 4. Play & Development -> PLAY_BLUEPRINT
      const resPlay = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/lessons/by-slug/tummy-time-without-tears',
      });
      expect(resPlay.statusCode).toBe(200);
      expect(resPlay.json().data.lesson.adaptiveModuleType).toBe('PLAY_BLUEPRINT');

      // 5. Digital Health -> PACT_CLAUSE
      const resDigital = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/lessons/by-slug/background-tv-and-acoustic-smog',
      });
      expect(resDigital.statusCode).toBe(200);
      expect(resDigital.json().data.lesson.adaptiveModuleType).toBe('PACT_CLAUSE');
    });

    it('GET /api/v1/academy/lessons/by-slug/:slug retrieves enriched lesson by slug', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/lessons/by-slug/tween-non-reactive-neutral-stance',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.lesson.slug).toBe('tween-non-reactive-neutral-stance');
      expect(payload.data.lesson.reliefTagline).toBeDefined();
      expect(payload.data.lesson.thirtySecondGlance).toBeDefined();
      expect(payload.data.lesson.dialogueCards.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/academy/lessons/by-slug/:slug returns 404 for unknown slug', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/lessons/by-slug/non-existent-slug-xyz',
      });

      expect(response.statusCode).toBe(404);
      expect(response.json().success).toBe(false);
      expect(response.json().error.code).toBe('NOT_FOUND');
    });

    it('GET /api/v1/academy/modules/:slug includes reliefTagline in lesson summaries', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules/tween-neurobiology-and-adrenarche',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      const lessons = payload.data.module.lessons;
      expect(Array.isArray(lessons)).toBe(true);
      expect(lessons.length).toBeGreaterThan(0);
      expect(typeof lessons[0].reliefTagline).toBe('string');
      expect(lessons[0].reliefTagline.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/v1/academy/lessons/:id/complete', () => {
    const lesson1Id =
      'les-behavior-tween-adrenarche-tween-non-reactive-neutral-stance';
    const lesson2Id =
      'les-behavior-tween-adrenarche-tween-adrenarche-and-dhea-neurobiology';
    const lesson3Id =
      'les-behavior-tween-adrenarche-tween-side-by-side-communication';
    const lesson4Id =
      'les-behavior-tween-adrenarche-tween-respectful-repair-contracts';

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
      expect(payload1.data.module.percentComplete).toBe(25);
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

      // User A completes lessons 2, 3, and 4
      await app.inject({
        method: 'POST',
        url: `/api/v1/academy/lessons/${lesson2Id}/complete`,
        headers: { cookie: userACookie },
      });

      await app.inject({
        method: 'POST',
        url: `/api/v1/academy/lessons/${lesson3Id}/complete`,
        headers: { cookie: userACookie },
      });

      const res4 = await app.inject({
        method: 'POST',
        url: `/api/v1/academy/lessons/${lesson4Id}/complete`,
        headers: { cookie: userACookie },
      });

      const payload4 = res4.json();
      expect(payload4.data.module.completedLessonCount).toBe(4);
      expect(payload4.data.module.percentComplete).toBe(100);
      expect(payload4.data.module.isCompleted).toBe(true);
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
