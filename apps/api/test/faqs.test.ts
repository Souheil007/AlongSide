import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryFaqRepository } from '../src/modules/faqs/faqs.repository.js';
import { DevelopmentalTier, RoadType } from '@alongside/shared';

describe('Modern Parenting FAQ Vault API (PLAN-10)', () => {
  let app: FastifyInstance;
  let faqRepo: InMemoryFaqRepository;

  beforeEach(async () => {
    faqRepo = new InMemoryFaqRepository();

    app = await buildApp({
      logger: false,
      faqsRepository: faqRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/faqs/categories', () => {
    it('retrieves all 5 core clinical parenting FAQ categories', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs/categories',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(Array.isArray(payload.data.categories)).toBe(true);
      expect(payload.data.categories.length).toBe(5);

      const slugs = payload.data.categories.map((c: any) => c.slug);
      expect(slugs).toContain('device-decisions');
      expect(slugs).toContain('social-media-group-chats');
      expect(slugs).toContain('gaming-microtransactions');
      expect(slugs).toContain('inappropriate-content-safety');
      expect(slugs).toContain('bedtime-sleep-hygiene');

      // Verify category fields
      const deviceCat = payload.data.categories.find(
        (c: any) => c.slug === 'device-decisions'
      );
      expect(deviceCat.name).toBe('Device Decisions & Smartwatches');
      expect(deviceCat.faqCount).toBeGreaterThanOrEqual(20);
    });
  });

  describe('GET /api/v1/faqs (Search & Filter)', () => {
    it('returns default paginated list of FAQs with total exceeding 100', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.total).toBeGreaterThanOrEqual(100);
      expect(payload.data.faqs.length).toBeLessThanOrEqual(20);

      const firstFaq = payload.data.faqs[0];
      expect(firstFaq.question).toBeDefined();
      expect(firstFaq.answerMarkdown).toBeDefined();
      expect(firstFaq.deEscalationScript).toBeDefined();
      expect(firstFaq.categorySlug).toBeDefined();
    });

    it('filters FAQs by category slug', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs?category=bedtime-sleep-hygiene',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.faqs.length).toBeGreaterThanOrEqual(20);

      // Verify all returned FAQs belong to the category
      for (const faq of payload.data.faqs) {
        expect(faq.categorySlug).toBe('bedtime-sleep-hygiene');
      }
    });

    it('filters FAQs by developmental tier (e.g. TIER_1_AGES_8_9)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/faqs?tier=${DevelopmentalTier.TIER_1_AGES_8_9}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.faqs.length).toBeGreaterThan(0);

      for (const faq of payload.data.faqs) {
        expect(
          faq.targetTier === null ||
            faq.targetTier === DevelopmentalTier.TIER_1_AGES_8_9
        ).toBe(true);
      }
    });

    it('filters FAQs by road type (PRE_DEVICE vs ACTIVE_DEVICE)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/faqs?road=${RoadType.PRE_DEVICE}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.faqs.length).toBeGreaterThan(0);

      for (const faq of payload.data.faqs) {
        expect(
          faq.targetRoad === null || faq.targetRoad === RoadType.PRE_DEVICE
        ).toBe(true);
      }
    });

    it('searches FAQs by keyword (e.g. "calculator" for vault apps)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs?q=calculator',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.faqs.length).toBeGreaterThan(0);

      const matchedQuestions = payload.data.faqs.map((f: any) => f.question.toLowerCase());
      expect(
        matchedQuestions.some((q: string) => q.includes('calculator'))
      ).toBe(true);
    });

    it('supports pagination with limit and offset', async () => {
      const page1Res = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs?limit=5&offset=0',
      });
      expect(page1Res.statusCode).toBe(200);
      const page1 = page1Res.json();
      expect(page1.data.faqs.length).toBe(5);

      const page2Res = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs?limit=5&offset=5',
      });
      expect(page2Res.statusCode).toBe(200);
      const page2 = page2Res.json();
      expect(page2.data.faqs.length).toBe(5);

      // Verify page 1 and page 2 don't overlap
      const ids1 = new Set(page1.data.faqs.map((f: any) => f.id));
      for (const item of page2.data.faqs) {
        expect(ids1.has(item.id)).toBe(false);
      }
    });
  });

  describe('GET /api/v1/faqs/:id', () => {
    it('retrieves individual FAQ by ID with clinical script', async () => {
      const listRes = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs?limit=1',
      });
      const firstId = listRes.json().data.faqs[0].id;

      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/faqs/${firstId}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.faq.id).toBe(firstId);
      expect(payload.data.faq.answerMarkdown.length).toBeGreaterThan(20);
      expect(payload.data.faq.deEscalationScript).toBeDefined();
    });

    it('returns 404 for non-existent FAQ ID', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs/non-existent-faq-id',
      });

      expect(response.statusCode).toBe(404);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('FAQ_NOT_FOUND');
    });
  });
});
