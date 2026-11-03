import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryDigestRepository } from '../src/modules/digest/digest.repository.js';

describe('Weekly Youth Culture & Exploit Digest API (PLAN-08)', () => {
  let app: FastifyInstance;
  let digestRepo: InMemoryDigestRepository;

  beforeEach(async () => {
    digestRepo = new InMemoryDigestRepository();

    app = await buildApp({
      logger: false,
      digestRepository: digestRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/digest/latest (Sunday Briefing)', () => {
    it('retrieves current Sunday briefing issue with slang dictionary and exploit alerts', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/latest',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.digest).toBeDefined();

      const digest = payload.data.digest;
      expect(digest.issueNumber).toBe(42);
      expect(digest.title).toContain("Decoding 'Crashout'");
      expect(digest.conversationStarter).toContain('funniest meme');
      expect(Array.isArray(digest.slangTerms)).toBe(true);
      expect(digest.slangTerms.length).toBeGreaterThanOrEqual(6);
      expect(Array.isArray(digest.exploitAlerts)).toBe(true);
      expect(digest.exploitAlerts.length).toBeGreaterThanOrEqual(3);

      // Verify specific terms are present in the digest
      const termNames = digest.slangTerms.map((s: any) => s.term);
      expect(termNames).toContain('Crashout');
      expect(termNames).toContain('Rizz');
      expect(termNames).toContain('Skibidi');
      expect(termNames).toContain('Looksmaxing');
      expect(termNames).toContain('Cooked');
      expect(termNames).toContain('Gyatt');

      // Verify specific exploit alerts are present
      const exploitAppNames = digest.exploitAlerts.map((e: any) => e.appName);
      expect(
        exploitAppNames.some((name: string) => name.includes('Calculator'))
      ).toBe(true);
      expect(
        exploitAppNames.some((name: string) => name.includes('Translate'))
      ).toBe(true);
      expect(
        exploitAppNames.some((name: string) => name.includes('Sendit'))
      ).toBe(true);
    });

    it('returns 404 NOT_FOUND when no digest exists', async () => {
      const emptyRepo = new InMemoryDigestRepository(false);
      const customApp = await buildApp({
        logger: false,
        digestRepository: emptyRepo,
      });

      const response = await customApp.inject({
        method: 'GET',
        url: '/api/v1/digest/latest',
      });

      expect(response.statusCode).toBe(404);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('NOT_FOUND');

      await customApp.close();
    });
  });

  describe('GET /api/v1/digest/slang (Slang Search & Decoders)', () => {
    it('returns the full alphabetized slang dictionary when no search term is passed', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/slang',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.slangTerms.length).toBe(6);

      const terms = payload.data.slangTerms.map((s: any) => s.term);
      // Alphabetical order assertion
      expect(terms).toEqual([
        'Cooked',
        'Crashout',
        'Gyatt',
        'Looksmaxing',
        'Rizz',
        'Skibidi',
      ]);
    });

    it('searches slang terms case-insensitively using ?term= query parameter', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/slang?term=crashout',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.slangTerms.length).toBe(1);

      const slang = payload.data.slangTerms[0];
      expect(slang.term).toBe('Crashout');
      expect(slang.definition).toContain('irrational overreaction');
      expect(slang.exampleSentence).toContain('Fortnite');
      expect(slang.contextTone).toContain('Playful exaggeration');
    });

    it('searches slang terms using ?q= query parameter synonym', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/slang?q=rizz',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.slangTerms.length).toBe(1);
      expect(payload.data.slangTerms[0].term).toBe('Rizz');
      expect(payload.data.slangTerms[0].definition).toContain('Charisma');
    });

    it('returns empty array when search query matches no known slang terms', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/slang?term=nonexistentxyz123',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.slangTerms).toEqual([]);
    });
  });

  describe('GET /api/v1/digest/exploits (Exploit Early Warnings)', () => {
    it('returns all exploit early warnings when no severity filter is passed', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/exploits',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.exploitAlerts.length).toBe(3);

      for (const alert of payload.data.exploitAlerts) {
        expect(alert.appName).toBeDefined();
        expect(alert.exploitDescription).toBeDefined();
        expect(alert.howKidsBypass).toBeDefined();
        expect(alert.parentRemedy).toBeDefined();
        expect(alert.severity).toBeDefined();
      }
    });

    it('filters exploit alerts by severity HIGH', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/exploits?severity=HIGH',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.exploitAlerts.length).toBe(2);

      for (const alert of payload.data.exploitAlerts) {
        expect(alert.severity).toBe('HIGH');
      }
    });

    it('filters exploit alerts by severity MEDIUM', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/exploits?severity=MEDIUM',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.exploitAlerts.length).toBe(1);
      expect(payload.data.exploitAlerts[0].severity).toBe('MEDIUM');
      expect(payload.data.exploitAlerts[0].appName).toContain('Google Translate');
    });

    it('rejects invalid severity parameter with 400 Validation Error', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/exploits?severity=DANGEROUS',
      });

      expect(response.statusCode).toBe(400);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('VALIDATION_ERROR');
    });
  });
});
