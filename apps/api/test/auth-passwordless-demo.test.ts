import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { DevelopmentalTier, Gender, RoadType } from '@alongside/shared';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { FakeGoogleOAuthAdapter } from '../src/modules/auth/google.oauth.js';
import { InMemoryChildrenRepository } from '../src/modules/children/children.repository.js';
import { InMemoryFaqRepository } from '../src/modules/faqs/faqs.repository.js';
import { InMemoryAiAdvisorRepository } from '../src/modules/ai-advisor/ai-advisor.repository.js';
import { DeterministicAiAdvisorFake } from '../src/modules/ai-advisor/adapters/fake.adapter.js';
import { MultiProviderLlmOrchestrator } from '../src/modules/ai-advisor/adapters/llm-orchestrator.js';
import { clearRevokedTokens } from '../src/plugins/auth.plugin.js';

function extractCookieValue(setCookieHeader: string | string[] | undefined, name: string): string {
  const cookies = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : setCookieHeader
      ? [setCookieHeader]
      : [];
  const match = cookies.find((c) => c.startsWith(`${name}=`));
  return match ? match.split(';')[0]! : '';
}

describe('Google OAuth & Live Demo Session Auth', () => {
  let app: FastifyInstance;
  let authRepo: InMemoryAuthRepository;
  let childrenRepo: InMemoryChildrenRepository;
  let faqRepo: InMemoryFaqRepository;
  let advisorRepo: InMemoryAiAdvisorRepository;
  let googleAdapter: FakeGoogleOAuthAdapter;

  beforeEach(async () => {
    clearRevokedTokens();
    authRepo = new InMemoryAuthRepository();
    childrenRepo = new InMemoryChildrenRepository();
    faqRepo = new InMemoryFaqRepository();
    advisorRepo = new InMemoryAiAdvisorRepository();
    googleAdapter = new FakeGoogleOAuthAdapter();

    const orchestrator = new MultiProviderLlmOrchestrator({
      adapters: [
        new DeterministicAiAdvisorFake({
          providerName: 'openai',
          tokens: ['Demo live ', 'advisor reply.'],
        }),
      ],
      logger: { warn: () => {} },
    });

    app = await buildApp({
      logger: false,
      authRepository: authRepo,
      googleOAuthAdapter: googleAdapter,
      childrenRepository: childrenRepo,
      faqsRepository: faqRepo,
      aiAdvisorRepository: advisorRepo,
      llmOrchestrator: orchestrator,
      appPublicUrl: 'http://localhost:3000',
      apiPublicUrl: 'http://localhost:4000',
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/auth/providers', () => {
    it('reports active auth providers based on Google configuration', async () => {
      const enabledRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/providers',
      });
      expect(enabledRes.statusCode).toBe(200);
      expect(enabledRes.json().data).toEqual({
        google: true,
        demo: true,
        emailPassword: true,
      });

      googleAdapter.setConfigured(false);
      const disabledGoogleRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/providers',
      });
      expect(disabledGoogleRes.statusCode).toBe(200);
      expect(disabledGoogleRes.json().data).toEqual({
        google: false,
        demo: true,
        emailPassword: true,
      });
    });
  });

  describe('GET /api/v1/auth/google & /google/callback', () => {
    it('completes Google PKCE flow, creates user, sets session cookie, and redirects', async () => {
      const startRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/google',
      });
      expect(startRes.statusCode).toBe(302);
      const authLocation = String(startRes.headers.location || '');
      expect(authLocation).toContain('https://accounts.google.com/o/oauth2/v2/auth');
      const parsedLocation = new URL(authLocation);
      const state = parsedLocation.searchParams.get('state');
      expect(state).toBeTruthy();

      const stateCookie = extractCookieValue(startRes.headers['set-cookie'], 'alongside_google_oauth');
      expect(stateCookie).toContain('alongside_google_oauth=');

      const callbackRes = await app.inject({
        method: 'GET',
        url: `/api/v1/auth/google/callback?code=fake-code&state=${encodeURIComponent(state!)}`,
        headers: {
          cookie: stateCookie,
        },
      });
      expect(callbackRes.statusCode).toBe(302);
      const callbackLocation = new URL(String(callbackRes.headers.location || ''));
      expect(`${callbackLocation.origin}${callbackLocation.pathname}`).toBe(
        'http://localhost:3000/children/new'
      );
      const hashToken = new URLSearchParams(callbackLocation.hash.replace(/^#/, '')).get('session');
      expect(hashToken).toBeTruthy();

      const sessionCookie = extractCookieValue(callbackRes.headers['set-cookie'], 'alongside_session');
      expect(sessionCookie).toContain('alongside_session=');

      const meRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { cookie: sessionCookie },
      });
      expect(meRes.statusCode).toBe(200);
      expect(meRes.json().data.user.email).toBe('google.parent@example.com');

      // Also works via Bearer token alone (mobile browsers blocking third-party cookies)
      const meBearerRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { authorization: `Bearer ${hashToken}` },
      });
      expect(meBearerRes.statusCode).toBe(200);
      expect(meBearerRes.json().data.user.email).toBe('google.parent@example.com');
    });

    it('auto-links an existing email+password account when Google email is verified', async () => {
      const regRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'existing.google@example.com',
          password: 'StrongPassword123!',
          fullName: 'Existing Parent',
        },
      });
      const existingId = regRes.json().data.user.id;

      googleAdapter.setProfile({
        sub: 'google-sub-existing',
        email: 'existing.google@example.com',
        emailVerified: true,
        fullName: 'Existing Parent',
      });

      const startRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/google',
      });
      const stateCookie = extractCookieValue(startRes.headers['set-cookie'], 'alongside_google_oauth');
      const state = new URL(String(startRes.headers.location)).searchParams.get('state')!;

      const callbackRes = await app.inject({
        method: 'GET',
        url: `/api/v1/auth/google/callback?code=fake-code&state=${encodeURIComponent(state)}`,
        headers: { cookie: stateCookie },
      });
      expect(callbackRes.statusCode).toBe(302);

      const sessionCookie = extractCookieValue(callbackRes.headers['set-cookie'], 'alongside_session');
      const meRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { cookie: sessionCookie },
      });
      expect(meRes.statusCode).toBe(200);
      expect(meRes.json().data.user.id).toBe(existingId);
    });

    it('rejects callback with mismatched state or unverified email', async () => {
      const startRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/google',
      });
      const stateCookie = extractCookieValue(startRes.headers['set-cookie'], 'alongside_google_oauth');

      const badStateRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/google/callback?code=fake&state=wrong-state',
        headers: { cookie: stateCookie },
      });
      expect(badStateRes.statusCode).toBe(302);
      expect(badStateRes.headers.location).toBe('http://localhost:3000/login?error=google_auth_failed');

      const validState = new URL(String(startRes.headers.location)).searchParams.get('state')!;
      googleAdapter.setProfile({
        sub: 'google-sub-unverified',
        email: 'unverified@example.com',
        emailVerified: false,
        fullName: 'Unverified',
      });

      const unverifiedRes = await app.inject({
        method: 'GET',
        url: `/api/v1/auth/google/callback?code=fake&state=${encodeURIComponent(validState)}`,
        headers: { cookie: stateCookie },
      });
      expect(unverifiedRes.statusCode).toBe(302);
      expect(unverifiedRes.headers.location).toBe('http://localhost:3000/login?error=google_auth_failed');
    });

    it('returns 503 when Google OAuth is unconfigured', async () => {
      googleAdapter.setConfigured(false);
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/google',
      });
      expect(res.statusCode).toBe(503);
      expect(res.json().error.code).toBe('GOOGLE_OAUTH_UNCONFIGURED');
    });
  });

  describe('POST /api/v1/auth/demo & Read-Only Demo Guard', () => {
    it('lazily seeds Maya & Leo idempotently with Maya first, allows reads, blocks writes, and permits logout', async () => {
      const demoRes1 = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/demo',
      });
      expect(demoRes1.statusCode).toBe(200);
      const user1 = demoRes1.json().data.user;
      expect(user1.email).toBe('demo@alongside.app');
      expect(user1.isDemo).toBe(true);
      expect(user1.childrenCount).toBe(2);

      const demoRes2 = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/demo',
      });
      expect(demoRes2.statusCode).toBe(200);
      expect(demoRes2.json().data.user.childrenCount).toBe(2);

      const sessionCookie = extractCookieValue(demoRes2.headers['set-cookie'], 'alongside_session');

      // /me preserves isDemo: true
      const meRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { cookie: sessionCookie },
      });
      expect(meRes.statusCode).toBe(200);
      expect(meRes.json().data.user.isDemo).toBe(true);

      // Reads work and return Maya first so she is selected by default
      const childrenRes = await app.inject({
        method: 'GET',
        url: '/api/v1/children',
        headers: { cookie: sessionCookie },
      });
      expect(childrenRes.statusCode).toBe(200);
      const names = childrenRes.json().data.children.map((c: { name: string }) => c.name);
      expect(names).toEqual(['Maya', 'Leo']);

      // Mutating writes are blocked centrally
      const writeRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: { cookie: sessionCookie },
        payload: {
          name: 'Unauthorized Child',
          gender: 'MALE',
          birthYear: 2020,
          birthMonth: 5,
          roadType: 'PRE_DEVICE',
        },
      });
      expect(writeRes.statusCode).toBe(403);
      expect(writeRes.json().error.code).toBe('DEMO_MODE_READ_ONLY');

      // Live Ask Advisor SSE chat works ephemerally without persisting to shared demo history
      const mayaId = childrenRes.json().data.children[0].id as string;
      const chatRes = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: { cookie: sessionCookie },
        payload: {
          childId: mayaId,
          message: 'How do I handle bedtime refusal?',
        },
      });
      expect(chatRes.statusCode).toBe(200);
      expect(chatRes.headers['content-type']).toContain('text/event-stream');
      expect(chatRes.body).toContain('Demo live ');
      expect(chatRes.body).toContain('advisor reply.');

      const convRes = await app.inject({
        method: 'GET',
        url: '/api/v1/ai-advisor/conversations',
        headers: { cookie: sessionCookie },
      });
      expect(convRes.statusCode).toBe(200);
      expect(convRes.json().data.conversations).toEqual([]);

      // Logout remains permitted
      const logoutRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/logout',
        headers: { cookie: sessionCookie },
      });
      expect(logoutRes.statusCode).toBe(200);
    });

    it('returns Maya before Leo in demo sessions even when pre-existing DB rows have Leo created first', async () => {
      const existingDemoUser = await authRepo.create({
        email: 'demo@alongside.app',
        passwordHash: 'placeholder-hash',
        fullName: 'Alex Rivera',
      });

      await childrenRepo.create(existingDemoUser.id, {
        name: 'Leo',
        gender: Gender.MALE,
        birthYear: 2023,
        birthMonth: 6,
        roadType: RoadType.PRE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        schoolGrade: 'Preschool',
      });

      await childrenRepo.create(existingDemoUser.id, {
        name: 'Maya',
        gender: Gender.FEMALE,
        birthYear: 2015,
        birthMonth: 6,
        roadType: RoadType.ACTIVE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        schoolGrade: '6th Grade',
      });

      const demoRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/demo',
      });
      expect(demoRes.statusCode).toBe(200);

      const sessionCookie = extractCookieValue(demoRes.headers['set-cookie'], 'alongside_session');
      const childrenRes = await app.inject({
        method: 'GET',
        url: '/api/v1/children',
        headers: { cookie: sessionCookie },
      });
      expect(childrenRes.statusCode).toBe(200);
      const names = childrenRes.json().data.children.map((c: { name: string }) => c.name);
      expect(names).toEqual(['Maya', 'Leo']);
    });

    it('authenticates and revokes demo sessions via Bearer token alone when third-party cookies are dropped', async () => {
      const demoRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/demo',
      });
      expect(demoRes.statusCode).toBe(200);
      const token = demoRes.json().data.token as string;
      expect(token).toBeTruthy();

      // Simulate mobile browser (e.g. Samsung Internet / iOS Safari) dropping Set-Cookie
      const meRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { authorization: `Bearer ${token}` },
      });
      expect(meRes.statusCode).toBe(200);
      expect(meRes.json().data.user.isDemo).toBe(true);

      const childrenRes = await app.inject({
        method: 'GET',
        url: '/api/v1/children',
        headers: { authorization: `Bearer ${token}` },
      });
      expect(childrenRes.statusCode).toBe(200);
      const mayaId = childrenRes.json().data.children[0].id as string;

      const chatRes = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          childId: mayaId,
          message: 'Quick test for bedtime limits',
        },
      });
      expect(chatRes.statusCode).toBe(200);
      expect(chatRes.body).toContain('Demo live ');

      const logoutRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/logout',
        headers: { authorization: `Bearer ${token}` },
      });
      expect(logoutRes.statusCode).toBe(200);

      // Revoked Bearer token must now be rejected
      const afterLogoutMeRes = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { authorization: `Bearer ${token}` },
      });
      expect(afterLogoutMeRes.statusCode).toBe(401);
    });
  });
});
