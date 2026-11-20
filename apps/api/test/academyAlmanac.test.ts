import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { InMemoryAcademyRepository } from '../src/modules/academy/academy.repository.js';

describe('Academy Interactive Almanac v2 API & Playbook Persistence (PLAN-46)', () => {
  let app: FastifyInstance;
  let userCookie: string;

  beforeEach(async () => {
    const authRepo = new InMemoryAuthRepository();
    const academyRepo = new InMemoryAcademyRepository();

    app = await buildApp({
      logger: false,
      authRepository: authRepo,
      academyRepository: academyRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });

    const reg = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'almanac.parent@example.com',
        password: 'Password123!',
        fullName: 'Almanac Parent',
      },
    });
    expect(reg.statusCode).toBe(201);
    const cookies = reg.headers['set-cookie'] as string | string[];
    userCookie = (Array.isArray(cookies) ? cookies[0] : cookies) ?? '';
  });

  afterEach(async () => {
    await app.close();
  });

  it('hydrates episodeRole and default playbookState on lesson detail', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/academy/lessons/by-slug/older-toddler-one-safe-food-rule',
      headers: { cookie: userCookie },
    });

    expect(res.statusCode).toBe(200);
    const lesson = res.json().data.lesson;
    expect(lesson.episodeRole).toBe('FAST_WIN');
    expect(lesson.playbookState).toEqual({
      isCompleted: false,
      chosenMoveId: null,
      bookmarkedTruth: false,
      savedPushbackIds: [],
      completedAt: null,
    });
  });

  it('persists mid-lesson bookmarks and chosenMoveId via PATCH /playbook without marking completed', async () => {
    const lessonId =
      'les-nutrition-older-toddler-independence-and-snacking-older-toddler-one-safe-food-rule';

    const patchRes = await app.inject({
      method: 'PATCH',
      url: `/api/v1/academy/lessons/${lessonId}/playbook`,
      headers: { cookie: userCookie },
      payload: {
        chosenMoveId: 'anchor',
        bookmarkedTruth: true,
        savedPushbackIds: ['louder', 'throws'],
      },
    });

    expect(patchRes.statusCode).toBe(200);
    const patchBody = patchRes.json();
    expect(patchBody.success).toBe(true);
    expect(patchBody.data.playbookState).toMatchObject({
      isCompleted: false,
      chosenMoveId: 'anchor',
      bookmarkedTruth: true,
      savedPushbackIds: ['louder', 'throws'],
    });

    // Verify GET lesson hydrates saved playbook state
    const getRes = await app.inject({
      method: 'GET',
      url: `/api/v1/academy/lessons/${lessonId}`,
      headers: { cookie: userCookie },
    });
    expect(getRes.statusCode).toBe(200);
    expect(getRes.json().data.lesson.playbookState).toMatchObject({
      isCompleted: false,
      chosenMoveId: 'anchor',
      bookmarkedTruth: true,
      savedPushbackIds: ['louder', 'throws'],
    });
  });

  it('seals Pocket Card atomically via POST /complete with playbook payload and preserves prior bookmarks', async () => {
    const lessonId =
      'les-nutrition-older-toddler-independence-and-snacking-older-toddler-one-safe-food-rule';

    await app.inject({
      method: 'PATCH',
      url: `/api/v1/academy/lessons/${lessonId}/playbook`,
      headers: { cookie: userCookie },
      payload: {
        bookmarkedTruth: true,
        savedPushbackIds: ['partner'],
      },
    });

    const completeRes = await app.inject({
      method: 'POST',
      url: `/api/v1/academy/lessons/${lessonId}/complete`,
      headers: { cookie: userCookie },
      payload: {
        chosenMoveId: 'nobites',
      },
    });

    expect(completeRes.statusCode).toBe(200);
    const data = completeRes.json().data;
    expect(data.progress.isCompleted).toBe(true);
    expect(data.progress.chosenMoveId).toBe('nobites');
    expect(data.playbookState).toMatchObject({
      isCompleted: true,
      chosenMoveId: 'nobites',
      bookmarkedTruth: true,
      savedPushbackIds: ['partner'],
    });
  });

  it('rejects unauthenticated PATCH /playbook with 401 and missing lesson with 404', async () => {
    const unauth = await app.inject({
      method: 'PATCH',
      url: '/api/v1/academy/lessons/les-nonexistent/playbook',
      payload: { bookmarkedTruth: true },
    });
    expect(unauth.statusCode).toBe(401);

    const missing = await app.inject({
      method: 'PATCH',
      url: '/api/v1/academy/lessons/les-nonexistent/playbook',
      headers: { cookie: userCookie },
      payload: { bookmarkedTruth: true },
    });
    expect(missing.statusCode).toBe(404);
  });

  it('hydrates featuredVideoLecture on course detail response', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/academy/modules/behavior-infant-coregulation',
    });
    expect(res.statusCode).toBe(200);
    const mod = res.json().data.module;
    expect(mod.hasMasterLecture).toBe(true);
    expect(mod.featuredVideoLecture).toBeDefined();
    expect(mod.featuredVideoLecture.title).toContain("5 S's");
    expect(mod.featuredVideoLecture.videoUrl).toBe(
      'https://www.youtube.com/watch?v=BiXIs_-tCdo'
    );
  });
});
