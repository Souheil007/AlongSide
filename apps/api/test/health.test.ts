import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';

describe('System Health API (Server Uptime & Liveness)', () => {
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

  describe('GET /api/v1/health (System Health Check)', () => {
    it('returns status 200 with status ok, uptime, and ISO timestamp', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/health',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload).toMatchObject({ status: 'ok' });
      expect(typeof payload.uptime).toBe('number');
      expect(payload.uptime).toBeGreaterThanOrEqual(0);
      expect(typeof payload.timestamp).toBe('string');
      expect(new Date(payload.timestamp).toString()).not.toBe('Invalid Date');
    });
  });
});
