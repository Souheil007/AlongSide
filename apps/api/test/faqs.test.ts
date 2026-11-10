import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryFaqRepository } from '../src/modules/faqs/faqs.repository.js';
import { DevelopmentalTier, RoadType } from '@alongside/shared';

describe('Modern Parenting FAQ Vault API (PLAN-20)', () => {
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
      expect(slugs).toContain('pediatric-health-and-sleep');
      expect(slugs).toContain('nutrition-and-feeding');
      expect(slugs).toContain('development-and-milestones');
      expect(slugs).toContain('behavior-and-discipline');
      expect(slugs).toContain('modern-world-and-devices');

      // Verify category fields
      const healthCat = payload.data.categories.find(
        (c: any) => c.slug === 'pediatric-health-and-sleep'
      );
      expect(healthCat.name).toBe('Pediatric Health & Sleep Triage');
      expect(healthCat.faqCount).toBeGreaterThanOrEqual(20);
    });
  });

  describe('GET /api/v1/faqs (Search & Filter)', () => {
    it('returns default paginated list of FAQs with total exceeding 250', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.total).toBeGreaterThanOrEqual(250);
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
        url: '/api/v1/faqs?category=pediatric-health-and-sleep',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.faqs.length).toBeGreaterThanOrEqual(20);

      // Verify all returned FAQs belong to the category
      for (const faq of payload.data.faqs) {
        expect(faq.categorySlug).toBe('pediatric-health-and-sleep');
      }
    });

    it('filters FAQs by developmental tier (e.g. TIER_0_INFANCY_TODDLER_0_3)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/faqs?tier=${DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.faqs.length).toBeGreaterThan(0);

      const earlyChildhoodTiers = [
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
        DevelopmentalTier.TIER_0A_INFANCY_0_1,
        DevelopmentalTier.TIER_0B_TODDLER_1_2,
        DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
      ];
      for (const faq of payload.data.faqs) {
        expect(
          faq.targetTier === null || earlyChildhoodTiers.includes(faq.targetTier)
        ).toBe(true);
      }
    });

    it('filters FAQs by decomposed tier (TIER_0A_INFANCY_0_1)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/faqs?tier=${DevelopmentalTier.TIER_0A_INFANCY_0_1}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.faqs.length).toBeGreaterThan(0);

      for (const faq of payload.data.faqs) {
        expect(
          faq.targetTier === null ||
            faq.targetTier === DevelopmentalTier.TIER_0A_INFANCY_0_1 ||
            faq.targetTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
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

    it('searches FAQs by keyword (e.g. "fever" for pediatric health)', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/faqs?q=fever',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.faqs.length).toBeGreaterThan(0);

      const matchedQuestions = payload.data.faqs.map((f: any) =>
        f.question.toLowerCase()
      );
      expect(
        matchedQuestions.some((q: string) => q.includes('fever'))
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

      // Verify disjoint sets
      const ids1 = page1.data.faqs.map((f: any) => f.id);
      const ids2 = page2.data.faqs.map((f: any) => f.id);
      const intersection = ids1.filter((id: string) => ids2.includes(id));
      expect(intersection.length).toBe(0);
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
      expect(payload.data.faq.question).toBeDefined();
      expect(payload.data.faq.answerMarkdown).toBeDefined();
      expect(payload.data.faq.deEscalationScript).toBeDefined();
      expect(payload.data.faq.categoryName).toBeDefined();
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
