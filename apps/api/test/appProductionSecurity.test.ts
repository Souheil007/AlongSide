import { describe, expect, it, afterEach } from 'vitest';
import { buildApp } from '../src/app.js';

describe('Production Environment Secret Hardening (PLAN-44)', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalJwtSecret = process.env.JWT_SECRET;
  const originalCookieSecret = process.env.COOKIE_SECRET;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    process.env.JWT_SECRET = originalJwtSecret;
    process.env.COOKIE_SECRET = originalCookieSecret;
  });

  it('rejects boot in production when JWT_SECRET uses default dev secret', async () => {
    process.env.NODE_ENV = 'production';
    delete process.env.JWT_SECRET;
    delete process.env.COOKIE_SECRET;

    await expect(buildApp({ logger: false })).rejects.toThrow(
      /FATAL CONFIGURATION ERROR: JWT_SECRET must be explicitly configured/
    );
  });

  it('rejects boot in production when COOKIE_SECRET uses default dev secret', async () => {
    process.env.NODE_ENV = 'production';
    process.env.JWT_SECRET = 'valid_production_jwt_secret_with_more_than_32_characters!';
    delete process.env.COOKIE_SECRET;

    await expect(buildApp({ logger: false })).rejects.toThrow(
      /FATAL CONFIGURATION ERROR: COOKIE_SECRET must be explicitly configured/
    );
  });

  it('rejects boot in production when secrets are shorter than 32 characters', async () => {
    process.env.NODE_ENV = 'production';
    process.env.JWT_SECRET = 'too_short';
    process.env.COOKIE_SECRET = 'valid_production_cookie_secret_with_32_chars_long!';

    await expect(buildApp({ logger: false })).rejects.toThrow(
      /FATAL CONFIGURATION ERROR: JWT_SECRET must be explicitly configured/
    );
  });

  it('boots successfully in production when secure production secrets are provided', async () => {
    process.env.NODE_ENV = 'production';
    const app = await buildApp({
      logger: false,
      jwtSecret: 'prod_jwt_super_secret_key_at_least_32_characters_long_clean',
      cookieSecret: 'prod_cookie_super_secret_key_at_least_32_chars_long_clean',
    });

    expect(app).toBeDefined();
    await app.close();
  });

  it('allows boot with default fallbacks in development/test mode', async () => {
    process.env.NODE_ENV = 'test';
    delete process.env.JWT_SECRET;
    delete process.env.COOKIE_SECRET;

    const app = await buildApp({ logger: false });
    expect(app).toBeDefined();
    await app.close();
  });
});
