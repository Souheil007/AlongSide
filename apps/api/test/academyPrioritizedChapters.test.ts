import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { InMemoryAcademyRepository } from '../src/modules/academy/academy.repository.js';
import { AcademyCategory, ChapterPriority } from '@alongside/shared';

describe('Parent Intelligence Academy Categories & Prioritized Chapters API (PLAN-30)', () => {
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
        email: 'academy.parent.a@example.com',
        password: 'Password123!',
        fullName: 'Academy Parent A',
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
        email: 'academy.parent.b@example.com',
        password: 'Password123!',
        fullName: 'Academy Parent B',
      },
    });
    expect(resB.statusCode).toBe(201);
    const cookiesB = resB.headers['set-cookie'] as string | string[];
    userBCookie = (Array.isArray(cookiesB) ? cookiesB[0] : cookiesB) ?? '';
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/academy/categories & GET /api/academy/categories', () => {
    it('returns all 5 canonical categories with complete stats and descriptions', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/categories',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(Array.isArray(payload.data.categories)).toBe(true);
      expect(payload.data.categories.length).toBe(5);

      const categoryKeys = payload.data.categories.map((c: any) => c.category);
      expect(categoryKeys).toEqual([
        AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        AcademyCategory.HEALTH_AND_WELLNESS,
        AcademyCategory.NUTRITION_AND_FEEDING,
        AcademyCategory.DEVELOPMENT_AND_PLAY,
        AcademyCategory.DIGITAL_AND_DEVICES,
      ]);

      for (const cat of payload.data.categories) {
        expect(cat.title).toBeDefined();
        expect(cat.title.length).toBeGreaterThan(0);
        expect(cat.description).toBeDefined();
        expect(cat.description.length).toBeGreaterThan(0);
        expect(cat.moduleCount).toBe(8);
        expect(cat.lessonCount).toBe(32);
      }
    });

    it('supports direct /api/academy/categories path alias', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/academy/categories',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.categories).toHaveLength(5);
    });

    it('filters category course counts by developmental tier (e.g. TIER_0_INFANCY_TODDLER_0_3)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/categories?tier=TIER_0_INFANCY_TODDLER_0_3',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.categories).toHaveLength(5);

      const totalModules = payload.data.categories.reduce(
        (acc: number, cat: any) => acc + cat.moduleCount,
        0
      );
      expect(totalModules).toBe(15);

      const behavior = payload.data.categories.find(
        (c: any) => c.category === AcademyCategory.BEHAVIOR_AND_EMOTIONS
      );
      expect(behavior?.moduleCount).toBe(3);

      const digital = payload.data.categories.find(
        (c: any) => c.category === AcademyCategory.DIGITAL_AND_DEVICES
      );
      expect(digital?.moduleCount).toBe(3);
    });

    it('filters category course counts by decomposed tier (TIER_0A_INFANCY_0_1)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/categories?tier=TIER_0A_INFANCY_0_1',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.categories).toHaveLength(5);

      const totalModules = payload.data.categories.reduce(
        (acc: number, cat: any) => acc + cat.moduleCount,
        0
      );
      expect(totalModules).toBe(5);

      for (const cat of payload.data.categories) {
        expect(cat.moduleCount).toBe(1);
        expect(cat.lessonCount).toBe(4);
      }
    });
  });

  describe('GET /api/v1/academy/modules (Category & Tier Filtering)', () => {
    it('filters courses strictly by category (e.g. BEHAVIOR_AND_EMOTIONS)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules?category=BEHAVIOR_AND_EMOTIONS',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.modules.length).toBe(8);

      for (const mod of payload.data.modules) {
        expect(mod.category).toBe(AcademyCategory.BEHAVIOR_AND_EMOTIONS);
        expect(mod.lessonCount).toBe(4);
      }
    });

    it('filters courses by both category and developmental tier', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules?category=HEALTH_AND_WELLNESS&tier=TIER_0A_INFANCY_0_1',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.modules.length).toBe(1);

      const mod = payload.data.modules[0];
      expect(mod.slug).toBe('health-infant-sleep-foundations');
      expect(mod.category).toBe(AcademyCategory.HEALTH_AND_WELLNESS);
      expect(mod.developmentalTier).toBe('TIER_0A_INFANCY_0_1');
      expect(mod.title).toContain('Infant Sleep');
      expect(mod.lessonCount).toBe(4);
    });

    it('returns all 40 courses when no filter is provided (backward compatibility)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.modules.length).toBe(40);
    });

    it('rejects invalid category query parameter with 400 Validation Error', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules?category=INVALID_CATEGORY',
      });

      expect(response.statusCode).toBe(400);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/academy/modules/:slug (Prioritized Chapters Hierarchy)', () => {
    it('returns module with chapters ordered strictly by priority (1 = Critical, 2 = Routines, 3 = Scaffolding)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules/nutrition-infant-first-foods',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.module).toBeDefined();

      const mod = payload.data.module;
      expect(mod.slug).toBe('nutrition-infant-first-foods');
      expect(mod.category).toBe(AcademyCategory.NUTRITION_AND_FEEDING);
      expect(mod.chapters).toHaveLength(3);

      // Verify strict priority ascending order: 1 -> 2 -> 3
      expect(mod.chapters[0].priority).toBe(ChapterPriority.PRIORITY_1_CRITICAL);
      expect(mod.chapters[0].title).toContain('Critical Win');
      expect(mod.chapters[0].lessons).toHaveLength(1);

      expect(mod.chapters[1].priority).toBe(ChapterPriority.PRIORITY_2_ROUTINES);
      expect(mod.chapters[1].title).toContain('Biological Root & Routines');
      expect(mod.chapters[1].lessons).toHaveLength(2);

      expect(mod.chapters[2].priority).toBe(ChapterPriority.PRIORITY_3_SCAFFOLDING);
      expect(mod.chapters[2].title).toContain('Scaffolding & Long-Term Repair');
      expect(mod.chapters[2].lessons).toHaveLength(1);

      // Backward compatibility: verify flat lessons array also exists
      expect(mod.lessons).toHaveLength(4);
    });

    it('ensures lesson content includes clinical insights and What to Say script blocks', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/lessons/les-nutrition-infant-first-foods-early-allergen-introduction-science',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);

      const lesson = payload.data.lesson;
      expect(lesson.title).toContain('The Critical 4-11 Month Window');
      expect(lesson.contentMarkdown).toContain('> **Clinical Insight:**');
      expect(lesson.contentMarkdown).toContain('What to Say');
      expect(lesson.module).toBeDefined();
      expect(lesson.module.category).toBe(AcademyCategory.NUTRITION_AND_FEEDING);
      expect(lesson.chapter).toBeDefined();
      expect(lesson.chapter.priority).toBe(1);
    });

    it('returns 404 NOT_FOUND for non-existent module slug', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules/unknown-nonexistent-course',
      });

      expect(response.statusCode).toBe(404);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('NOT_FOUND');
    });
  });

  describe('Tenant Isolation & Progress Tracking with Prioritized Chapters', () => {
    it('completing a lesson updates both chapter and module completion statistics', async () => {
      const lessonId =
        'les-play-preschool-executive-function-preschool-freeze-dance-inhibitory-control';

      // Verify User A initial state
      const beforeRes = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules/play-preschool-executive-function',
        headers: { cookie: userACookie },
      });
      const beforeMod = beforeRes.json().data.module;
      expect(beforeMod.completedLessonCount).toBe(0);
      expect(beforeMod.chapters[0].completedLessonCount).toBe(0);
      expect(beforeMod.chapters[0].isCompleted).toBe(false);

      // User A marks lesson in Chapter 1 complete
      const completeRes = await app.inject({
        method: 'POST',
        url: `/api/v1/academy/lessons/${lessonId}/complete`,
        headers: {
          cookie: userACookie,
          'content-type': 'application/json',
        },
      });
      expect(completeRes.statusCode).toBe(200);

      // Verify User A reflected state
      const afterRes = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules/play-preschool-executive-function',
        headers: { cookie: userACookie },
      });
      const afterMod = afterRes.json().data.module;
      expect(afterMod.completedLessonCount).toBe(1);
      expect(afterMod.chapters[0].completedLessonCount).toBe(1);
      expect(afterMod.chapters[0].isCompleted).toBe(true);
      expect(afterMod.chapters[1].completedLessonCount).toBe(0);
      expect(afterMod.chapters[1].isCompleted).toBe(false);

      // Verify User B remains completely uncompleted (Tenant Isolation)
      const userBRes = await app.inject({
        method: 'GET',
        url: '/api/v1/academy/modules/play-preschool-executive-function',
        headers: { cookie: userBCookie },
      });
      const userBMod = userBRes.json().data.module;
      expect(userBMod.completedLessonCount).toBe(0);
      expect(userBMod.chapters[0].completedLessonCount).toBe(0);
      expect(userBMod.chapters[0].isCompleted).toBe(false);
    });
  });
});
