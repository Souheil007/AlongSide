import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import {
  hashPassword,
  verifyPassword,
} from '../src/modules/auth/auth.security.js';
import { clearRevokedTokens } from '../src/plugins/auth.plugin.js';

describe('Auth Security Utilities', () => {
  it('hashes password with argon2id and verifies correctly', async () => {
    const password = 'SuperSecretParentPassword123!';
    const hash = await hashPassword(password);

    expect(hash).toMatch(/^\$argon2id\$/);
    expect(await verifyPassword(hash, password)).toBe(true);
    expect(await verifyPassword(hash, 'WrongPassword123!')).toBe(false);
  });

  it('safely handles malformed password hashes without throwing', async () => {
    const isMatch = await verifyPassword('not-a-valid-argon-hash', 'test');
    expect(isMatch).toBe(false);
  });
});

describe('Authentication & Parent Account API (PLAN-02)', () => {
  let app: FastifyInstance;
  let inMemoryRepo: InMemoryAuthRepository;

  beforeEach(async () => {
    clearRevokedTokens();
    inMemoryRepo = new InMemoryAuthRepository();
    app = await buildApp({
      logger: false,
      authRepository: inMemoryRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/v1/auth/register', () => {
    it('successfully registers parent, starts 7-day trial, and sets HttpOnly SameSite=Strict cookie', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'sarah.parent@example.com',
          password: 'StrongPassword123!',
          fullName: 'Sarah Jenkins',
        },
      });

      expect(response.statusCode).toBe(201);

      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.user).toBeDefined();
      expect(payload.data.user.email).toBe('sarah.parent@example.com');
      expect(payload.data.user.fullName).toBe('Sarah Jenkins');
      expect(payload.data.user.role).toBe('PARENT');
      expect(payload.data.user.childrenCount).toBe(0);

      // Verify 7-day trial subscription
      expect(payload.data.user.subscription).toBeDefined();
      expect(payload.data.user.subscription.tier).toBe('TRIAL');
      expect(payload.data.user.subscription.isActive).toBe(true);
      expect(payload.data.user.subscription.trialEndsAt).toBeDefined();

      const trialEnd = new Date(payload.data.user.subscription.trialEndsAt);
      const now = Date.now();
      const diffDays = (trialEnd.getTime() - now) / (1000 * 60 * 60 * 24);
      expect(diffDays).toBeGreaterThan(6.9);
      expect(diffDays).toBeLessThanOrEqual(7.1);

      // Verify Set-Cookie header security properties
      const setCookie = response.headers['set-cookie'];
      expect(setCookie).toBeDefined();
      const cookieStr = Array.isArray(setCookie) ? setCookie.join('; ') : String(setCookie || '');
      expect(cookieStr).toContain('alongside_session=');
      expect(cookieStr).toContain('HttpOnly');
      expect(cookieStr).toContain('SameSite=Strict');
      expect(cookieStr).toContain('Path=/');
    });

    it('rejects registration with duplicate email with 409 Conflict', async () => {
      // First registration
      await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'duplicate@example.com',
          password: 'StrongPassword123!',
          fullName: 'First Account',
        },
      });

      // Second registration with same email
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'duplicate@example.com',
          password: 'AnotherPassword123!',
          fullName: 'Second Account',
        },
      });

      expect(response.statusCode).toBe(409);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('EMAIL_ALREADY_EXISTS');
      expect(payload.error.message).toContain('already exists');
    });

    it('rejects registration with invalid email format', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'not-an-email',
          password: 'ValidPassword123!',
          fullName: 'Valid Name',
        },
      });

      expect(response.statusCode).toBe(400);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects registration with short password (< 8 chars)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'shortpass@example.com',
          password: '123',
          fullName: 'Short Pass',
        },
      });

      expect(response.statusCode).toBe(400);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      // Create user for login testing
      await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'login.test@example.com',
          password: 'CorrectPassword123!',
          fullName: 'Login Tester',
        },
      });
    });

    it('successfully logs in with valid credentials and sets session cookie', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        payload: {
          email: 'login.test@example.com',
          password: 'CorrectPassword123!',
        },
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.user.email).toBe('login.test@example.com');

      const setCookie = response.headers['set-cookie'];
      expect(setCookie).toBeDefined();
      const cookieStr = Array.isArray(setCookie) ? setCookie.join('; ') : String(setCookie || '');
      expect(cookieStr).toContain('alongside_session=');
      expect(cookieStr).toContain('HttpOnly');
    });

    it('rejects login with wrong password with 401 Unauthorized', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        payload: {
          email: 'login.test@example.com',
          password: 'WrongPassword999!',
        },
      });

      expect(response.statusCode).toBe(401);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('INVALID_CREDENTIALS');
      expect(payload.error.message).toContain('Invalid email or password');
    });

    it('rejects login for non-existent email with 401 Unauthorized', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        payload: {
          email: 'nonexistent@example.com',
          password: 'AnyPassword123!',
        },
      });

      expect(response.statusCode).toBe(401);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('INVALID_CREDENTIALS');
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    it('clears alongside_session cookie and returns success response', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/logout',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);

      const setCookie = response.headers['set-cookie'];
      expect(setCookie).toBeDefined();
      const cookieStr = Array.isArray(setCookie) ? setCookie.join('; ') : String(setCookie || '');
      expect(
        cookieStr.includes('alongside_session=;') ||
        cookieStr.includes('Max-Age=0') ||
        cookieStr.includes('Expires=Thu, 01 Jan 1970')
      ).toBe(true);
    });

    it('revokes session token and prevents subsequent /me requests', async () => {
      // 1. Register a user to get a valid session
      const regRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'revoke.test@example.com',
          password: 'Password123!',
          fullName: 'Revoke Test',
        },
      });
      const cookieHeader = regRes.headers['set-cookie'];
      const rawCookie = (Array.isArray(cookieHeader) ? cookieHeader[0] : (cookieHeader as string | undefined)) ?? '';
      const sessionCookie = rawCookie.split(';')[0];

      // 2. Verify /me works before logout
      const meBefore = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { cookie: sessionCookie },
      });
      expect(meBefore.statusCode).toBe(200);

      // 3. Call logout
      const logoutRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/logout',
        headers: { cookie: sessionCookie },
      });
      expect(logoutRes.statusCode).toBe(200);

      // 4. Verify /me returns 401 Unauthorized after logout
      const meAfter = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { cookie: sessionCookie },
      });
      expect(meAfter.statusCode).toBe(401);
      expect(meAfter.json().error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('GET /api/v1/auth/me', () => {
    let sessionCookie: string;
    let jwtToken: string;

    beforeEach(async () => {
      const regRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'me.parent@example.com',
          password: 'ParentPassword123!',
          fullName: 'Me Test Parent',
        },
      });

      const rawCookie = regRes.headers['set-cookie'] as string;
      sessionCookie = Array.isArray(rawCookie) ? rawCookie[0].split(';')[0] : rawCookie.split(';')[0];
      jwtToken = sessionCookie.replace('alongside_session=', '');
    });

    it('returns parent user profile using session cookie', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: {
          cookie: sessionCookie,
        },
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.user.email).toBe('me.parent@example.com');
      expect(payload.data.user.fullName).toBe('Me Test Parent');
      expect(payload.data.user.childrenCount).toBe(0);
    });

    it('returns parent user profile using Authorization Bearer token header', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: {
          authorization: `Bearer ${jwtToken}`,
        },
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.user.email).toBe('me.parent@example.com');
    });

    it('rejects /me request without authentication with 401 Unauthorized', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
      });

      expect(response.statusCode).toBe(401);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('UNAUTHORIZED');
    });

    it('rejects /me request with invalid token with 401 Unauthorized', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: {
          cookie: 'alongside_session=invalid.garbage.token',
        },
      });

      expect(response.statusCode).toBe(401);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('UNAUTHORIZED');
    });
  });
});
