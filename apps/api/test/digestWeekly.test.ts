import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import {
  CANONICAL_DIGEST_TIERS,
  DevelopmentalTier,
  DigestContentStatus,
  DigestItemType,
  Gender,
  RoadType,
} from '@alongside/shared';
import { WEEKLY_DIGEST_SEED_EDITIONS } from '@alongside/database';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { InMemoryChildrenRepository } from '../src/modules/children/children.repository.js';
import { InMemoryDigestRepository } from '../src/modules/digest/digest.repository.js';

describe('Culture & Trends Weekly Hub API (PLAN-49)', () => {
  let app: FastifyInstance;
  let authRepo: InMemoryAuthRepository;
  let childrenRepo: InMemoryChildrenRepository;
  let digestRepo: InMemoryDigestRepository;
  let parentCookie: string;
  let parentUserId: string;

  beforeEach(async () => {
    authRepo = new InMemoryAuthRepository();
    childrenRepo = new InMemoryChildrenRepository();
    digestRepo = new InMemoryDigestRepository();

    app = await buildApp({
      logger: false,
      authRepository: authRepo,
      childrenRepository: childrenRepo,
      digestRepository: digestRepo,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });

    const reg = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'weekly.digest.parent@example.com',
        password: 'Password123!',
        fullName: 'Digest Parent',
      },
    });
    expect(reg.statusCode).toBe(201);
    parentUserId = reg.json().data.user.id;
    const cookies = reg.headers['set-cookie'] as string | string[];
    parentCookie = (Array.isArray(cookies) ? cookies[0] : cookies) ?? '';
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Seed dataset integrity', () => {
    it('contains 3 distinct weekly issues with unique hashes, verified HTTPS URLs, unique video IDs, and zero phrases for ages 0-6', () => {
      expect(WEEKLY_DIGEST_SEED_EDITIONS).toHaveLength(3);
      expect(WEEKLY_DIGEST_SEED_EDITIONS.map((e) => e.issueNumber)).toEqual([
        42, 41, 40,
      ]);

      for (const edition of WEEKLY_DIGEST_SEED_EDITIONS) {
        const hashes = new Set<string>();
        for (const article of edition.articles) {
          expect(article.sourceUrl.startsWith('https://')).toBe(true);
          expect(article.isOriginalEditorial).toBe(false);
          expect(hashes.has(article.canonicalHash)).toBe(false);
          hashes.add(article.canonicalHash);
        }

        const videoIds = new Set<string>();
        for (const video of edition.videos) {
          expect(video.isEmbeddable).toBe(true);
          expect(videoIds.has(video.youtubeVideoId)).toBe(false);
          videoIds.add(video.youtubeVideoId);
        }

        for (const phrase of edition.phrases) {
          expect(phrase.targetTiers).not.toContain(
            DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
          );
          expect(phrase.targetTiers).not.toContain(
            DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6
          );
        }
      }
    });
  });

  describe('GET /api/v1/digest/issues', () => {
    it('lists published weekly issues in descending order with tier-scoped counts', async () => {
      const res = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/issues?tier=${DevelopmentalTier.TIER_0A_INFANCY_0_1}`,
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.success).toBe(true);
      expect(body.data.issues).toHaveLength(3);
      expect(body.data.issues.map((i: any) => i.issueNumber)).toEqual([
        42, 41, 40,
      ]);

      const issue42 = body.data.issues[0];
      expect(issue42.status).toBe('PUBLISHED');
      expect(issue42.weekStart).toBe('2026-11-08T00:00:00.000Z');
      expect(issue42.weekEnd).toBe('2026-11-15T00:00:00.000Z');
      expect(issue42.articleCount).toBe(3);
      expect(issue42.videoCount).toBe(3);
    });
  });

  describe('GET /api/v1/digest/issues/:issueNumber', () => {
    it('returns full weekly editions across all 6 canonical tiers and strictly enforces phrases=[] for ages 0-6', async () => {
      // Inject a rogue phrase tagged for 0-3 to verify DigestService defense-in-depth invariant
      digestRepo.seedTestItems({
        phrase: {
          id: 'ph-rogue-t0',
          digestId: 'digest-issue-42',
          issueNumber: 42,
          word: 'RogueSlang',
          shortMeaning: 'Should never appear',
          fullMeaning: 'Must be stripped for 0-3',
          cringeLevel: 3,
          cringeLabel: 'Never',
          calmScript: 'Never',
          targetTiers: [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3],
          sortOrder: 99,
        },
      });

      for (const tier of CANONICAL_DIGEST_TIERS) {
        const res = await app.inject({
          method: 'GET',
          url: `/api/v1/digest/issues/42?tier=${tier}`,
        });

        expect(res.statusCode).toBe(200);
        const edition = res.json().data.edition;
        expect(edition.issue.issueNumber).toBe(42);
        expect(edition.resolvedTier).toBe(tier);
        expect(edition.articles.length).toBe(3);
        expect(edition.articles[0].isLead).toBe(true);
        expect(edition.articles[0].isOriginalEditorial).toBe(false);
        expect(edition.videos.length).toBeGreaterThanOrEqual(3);
        expect(edition.dinnerPrompts.length).toBe(3);
        expect(edition.readArticleCount).toBe(0);
        expect(edition.totalArticleCount).toBe(3);

        if (
          tier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3 ||
          tier === DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6
        ) {
          expect(edition.phrases).toEqual([]);
        } else {
          expect(edition.phrases).toHaveLength(3);
        }
      }
    });

    it('supports "latest" slug, normalizes Tier 0B & legacy aliases, and filters out non-approved/non-embeddable items', async () => {
      digestRepo.seedTestItems({
        article: {
          id: 'art-42-pending',
          digestId: 'digest-issue-42',
          issueNumber: 42,
          canonicalHash: 'pending-hash-1',
          sourceUrl: 'https://childmind.org/article/pending-draft/',
          sourceName: 'Child Mind Institute',
          sourceDomain: 'childmind.org',
          publishedAt: new Date('2026-11-12T10:00:00.000Z'),
          isOriginalEditorial: false,
          topicLabel: 'Media & Tech',
          readMinutes: 3,
          title: 'Unapproved pending draft',
          summary: 'Should not appear.',
          keyShift: 'Should not appear.',
          targetTiers: [DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15],
          isLead: false,
          sortOrder: 99,
          ingestionStatus: DigestContentStatus.PENDING_REVIEW,
        },
        video: {
          id: 'vid-42-blocked',
          digestId: 'digest-issue-42',
          issueNumber: 42,
          youtubeVideoId: 'blocked12345',
          videoUrl: 'https://www.youtube.com/watch?v=blocked12345',
          title: 'Disabled Embed Video',
          presenter: 'Test',
          channelName: 'Test',
          publishedAt: new Date('2026-11-12T10:00:00.000Z'),
          durationMinutes: 8,
          formatLabel: 'Talk',
          takeaway: 'Blocked.',
          skimBullets: [],
          targetTiers: [DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15],
          isEmbeddable: false,
          sortOrder: 99,
          ingestionStatus: DigestContentStatus.APPROVED,
        },
      });

      const res = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/issues/latest?tier=${DevelopmentalTier.TIER_3_AGES_12_13}`,
      });

      expect(res.statusCode).toBe(200);
      const edition = res.json().data.edition;
      expect(edition.issue.issueNumber).toBe(42);
      expect(edition.resolvedTier).toBe(
        DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15
      );
      expect(edition.phrases).toHaveLength(3);
      expect(
        edition.articles.some((a: any) => a.id === 'art-42-pending')
      ).toBe(false);
      expect(
        edition.videos.some((v: any) => v.id === 'vid-42-blocked')
      ).toBe(false);
    });

    it('resolves childId to the authenticated parent child tier without blocking anonymous callers', async () => {
      const toddler = await childrenRepo.create({
        userId: parentUserId,
        name: 'Maya',
        gender: Gender.FEMALE,
        birthYear: 2025,
        birthMonth: 4,
        roadType: RoadType.PRE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
      });

      // Authenticated call with childId -> resolves to TIER_0_INFANCY_TODDLER_0_3 (phrases: [])
      const authRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/issues/42?childId=${toddler.id}`,
        headers: { cookie: parentCookie },
      });

      expect(authRes.statusCode).toBe(200);
      expect(authRes.json().data.edition.resolvedTier).toBe(
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );
      expect(authRes.json().data.edition.phrases).toEqual([]);

      // Anonymous call with childId -> still 200 (never 401), safely falls back to default tier
      const anonRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/issues/42?childId=${toddler.id}`,
      });
      expect(anonRes.statusCode).toBe(200);
      expect(anonRes.json().data.edition.resolvedTier).toBe(
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12
      );
    });

    it('derives tier from birthYear/birthMonth before stored legacy tier so a 14-year-old with TIER_4_AGES_14_PLUS resolves to TIER_4_EARLY_ADOLESCENCE_13_15', async () => {
      const now = new Date();
      const teen14 = await childrenRepo.create({
        userId: parentUserId,
        name: 'Jordan',
        gender: Gender.MALE,
        birthYear: now.getFullYear() - 14,
        birthMonth: 1,
        roadType: RoadType.ACTIVE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_4_AGES_14_PLUS,
      });

      const editionRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/issues/42?childId=${teen14.id}`,
        headers: { cookie: parentCookie },
      });

      expect(editionRes.statusCode).toBe(200);
      const edition = editionRes.json().data.edition;
      expect(edition.resolvedTier).toBe(
        DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15
      );
      expect(edition.phrases).toHaveLength(3);

      const articlesRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/articles?issueNumber=42&childId=${teen14.id}`,
        headers: { cookie: parentCookie },
      });
      expect(articlesRes.statusCode).toBe(200);
      expect(articlesRes.json().data.articles.length).toBeGreaterThan(0);
      for (const article of articlesRes.json().data.articles) {
        expect(article.targetTiers).toContain(
          DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15
        );
      }
    });

    it('returns 400 for invalid issueNumber and 404 for unknown issueNumber', async () => {
      const invalidRes = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/issues/not-a-number',
      });
      expect(invalidRes.statusCode).toBe(400);
      expect(invalidRes.json().error.code).toBe('VALIDATION_ERROR');

      const missingRes = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/issues/999',
      });
      expect(missingRes.statusCode).toBe(404);
      expect(missingRes.json().error.code).toBe('NOT_FOUND');
    });
  });

  describe('GET /api/v1/digest/articles (week-scoped vs archive & unread filtering)', () => {
    it('strictly scopes to issueNumber=41 by default and widens to all issues on scope=all', async () => {
      const weekRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/articles?issueNumber=41&tier=${DevelopmentalTier.TIER_3_PRE_TEEN_10_12}`,
      });

      expect(weekRes.statusCode).toBe(200);
      const weekData = weekRes.json().data;
      expect(weekData.issueNumber).toBe(41);
      expect(weekData.totalInScope).toBe(3);
      expect(weekData.unreadCount).toBe(3);
      expect(weekData.articles).toHaveLength(3);
      for (const article of weekData.articles) {
        expect(article.issueNumber).toBe(41);
      }

      const archiveRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/articles?scope=all&tier=${DevelopmentalTier.TIER_3_PRE_TEEN_10_12}`,
      });

      expect(archiveRes.statusCode).toBe(200);
      const archiveData = archiveRes.json().data;
      expect(archiveData.issueNumber).toBeUndefined();
      expect(archiveData.totalInScope).toBe(9);
      expect(archiveData.articles).toHaveLength(9);
      expect(archiveData.articles[0].issueNumber).toBe(42);
      expect(archiveData.articles[8].issueNumber).toBe(40);
    });

    it('reflects PUT /interactions isRead immediately in unreadOnly=true and edition readArticleCount', async () => {
      const markRead = await app.inject({
        method: 'PUT',
        url: '/api/v1/digest/interactions',
        headers: { cookie: parentCookie },
        payload: {
          itemType: DigestItemType.ARTICLE,
          itemId: 'art-41-t3-1',
          isRead: true,
        },
      });
      expect(markRead.statusCode).toBe(200);
      expect(markRead.json().data.interaction).toEqual({
        itemType: DigestItemType.ARTICLE,
        itemId: 'art-41-t3-1',
        isRead: true,
        isSaved: false,
      });

      const unreadRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/articles?issueNumber=41&tier=${DevelopmentalTier.TIER_3_PRE_TEEN_10_12}&unreadOnly=true`,
        headers: { cookie: parentCookie },
      });

      expect(unreadRes.statusCode).toBe(200);
      const unreadData = unreadRes.json().data;
      expect(unreadData.totalInScope).toBe(3);
      expect(unreadData.unreadCount).toBe(2);
      expect(unreadData.articles).toHaveLength(2);
      expect(
        unreadData.articles.some((a: any) => a.id === 'art-41-t3-1')
      ).toBe(false);

      const editionRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/issues/41?tier=${DevelopmentalTier.TIER_3_PRE_TEEN_10_12}`,
        headers: { cookie: parentCookie },
      });
      expect(editionRes.statusCode).toBe(200);
      expect(editionRes.json().data.edition.readArticleCount).toBe(1);
    });

    it('supports case-insensitive search filtering via ?q=', async () => {
      const res = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/articles?issueNumber=42&tier=${DevelopmentalTier.TIER_3_PRE_TEEN_10_12}&q=group%20chats`,
      });

      expect(res.statusCode).toBe(200);
      const articles = res.json().data.articles;
      expect(articles).toHaveLength(1);
      expect(articles[0].id).toBe('art-42-t3-2');
    });
  });

  describe('GET /api/v1/digest/videos (week-scoped & duration buckets)', () => {
    it('strictly scopes to issueNumber=42 and filters accurately by durationBucket=short, medium, deep', async () => {
      const shortRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/videos?issueNumber=42&tier=${DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15}&durationBucket=short`,
      });
      expect(shortRes.statusCode).toBe(200);
      const shortData = shortRes.json().data;
      expect(shortData.issueNumber).toBe(42);
      expect(shortData.totalInScope).toBe(3);
      expect(shortData.videos).toHaveLength(1);
      expect(shortData.videos[0].durationMinutes).toBeLessThan(12);
      expect(shortData.videos[0].issueNumber).toBe(42);

      const mediumRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/videos?issueNumber=42&tier=${DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15}&durationBucket=medium`,
      });
      expect(mediumRes.statusCode).toBe(200);
      expect(mediumRes.json().data.videos).toHaveLength(1);
      expect(mediumRes.json().data.videos[0].durationMinutes).toBeGreaterThanOrEqual(12);
      expect(mediumRes.json().data.videos[0].durationMinutes).toBeLessThanOrEqual(25);

      const deepRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/videos?issueNumber=42&tier=${DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15}&durationBucket=deep`,
      });
      expect(deepRes.statusCode).toBe(200);
      expect(deepRes.json().data.videos).toHaveLength(1);
      expect(deepRes.json().data.videos[0].durationMinutes).toBeGreaterThan(25);

      // Compare against Issue #41 videos for the same tier: distinct YouTube IDs!
      const issue41Res = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/videos?issueNumber=41&tier=${DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15}`,
      });
      expect(issue41Res.statusCode).toBe(200);
      const ids42 = new Set([
        ...shortData.videos.map((v: any) => v.youtubeVideoId),
        ...mediumRes.json().data.videos.map((v: any) => v.youtubeVideoId),
        ...deepRes.json().data.videos.map((v: any) => v.youtubeVideoId),
      ]);
      for (const vid of issue41Res.json().data.videos) {
        expect(vid.issueNumber).toBe(41);
        expect(ids42.has(vid.youtubeVideoId)).toBe(false);
      }
    });
  });

  describe('GET /api/v1/digest/saved & PUT /api/v1/digest/interactions', () => {
    it('returns 401 UNAUTHORIZED for unauthenticated requests', async () => {
      const savedRes = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/saved',
      });
      expect(savedRes.statusCode).toBe(401);
      expect(savedRes.json().error.code).toBe('UNAUTHORIZED');

      const putRes = await app.inject({
        method: 'PUT',
        url: '/api/v1/digest/interactions',
        payload: {
          itemType: DigestItemType.ARTICLE,
          itemId: 'art-42-t3-1',
          isSaved: true,
        },
      });
      expect(putRes.statusCode).toBe(401);
      expect(putRes.json().error.code).toBe('UNAUTHORIZED');
    });

    it('returns 404 NOT_FOUND for unknown itemId and 400 VALIDATION_ERROR when neither isRead nor isSaved is sent', async () => {
      const missingRes = await app.inject({
        method: 'PUT',
        url: '/api/v1/digest/interactions',
        headers: { cookie: parentCookie },
        payload: {
          itemType: DigestItemType.VIDEO,
          itemId: 'vid-does-not-exist',
          isSaved: true,
        },
      });
      expect(missingRes.statusCode).toBe(404);
      expect(missingRes.json().error.code).toBe('NOT_FOUND');

      const emptyFieldsRes = await app.inject({
        method: 'PUT',
        url: '/api/v1/digest/interactions',
        headers: { cookie: parentCookie },
        payload: {
          itemType: DigestItemType.ARTICLE,
          itemId: 'art-42-t3-1',
        },
      });
      expect(emptyFieldsRes.statusCode).toBe(400);
      expect(emptyFieldsRes.json().error.code).toBe('VALIDATION_ERROR');
    });

    it('preserves independent isRead/isSaved toggles and aggregates articles, videos, and dinnerPrompts in GET /saved', async () => {
      // Mark article read first, then save it separately -> both must remain true
      await app.inject({
        method: 'PUT',
        url: '/api/v1/digest/interactions',
        headers: { cookie: parentCookie },
        payload: {
          itemType: DigestItemType.ARTICLE,
          itemId: 'art-42-t3-1',
          isRead: true,
        },
      });

      const saveArticleRes = await app.inject({
        method: 'PUT',
        url: '/api/v1/digest/interactions',
        headers: { cookie: parentCookie },
        payload: {
          itemType: DigestItemType.ARTICLE,
          itemId: 'art-42-t3-1',
          isSaved: true,
        },
      });
      expect(saveArticleRes.statusCode).toBe(200);
      expect(saveArticleRes.json().data.interaction).toEqual({
        itemType: DigestItemType.ARTICLE,
        itemId: 'art-42-t3-1',
        isRead: true,
        isSaved: true,
      });

      await app.inject({
        method: 'PUT',
        url: '/api/v1/digest/interactions',
        headers: { cookie: parentCookie },
        payload: {
          itemType: DigestItemType.VIDEO,
          itemId: 'vid-42-t3-2',
          isSaved: true,
        },
      });

      await app.inject({
        method: 'PUT',
        url: '/api/v1/digest/interactions',
        headers: { cookie: parentCookie },
        payload: {
          itemType: DigestItemType.DINNER_PROMPT,
          itemId: 'dp-42-t3-1',
          isSaved: true,
        },
      });

      // Also save a Tier 0 article to verify tier filtering on GET /saved
      await app.inject({
        method: 'PUT',
        url: '/api/v1/digest/interactions',
        headers: { cookie: parentCookie },
        payload: {
          itemType: DigestItemType.ARTICLE,
          itemId: 'art-42-t0-1',
          isSaved: true,
        },
      });

      const allSavedRes = await app.inject({
        method: 'GET',
        url: '/api/v1/digest/saved',
        headers: { cookie: parentCookie },
      });
      expect(allSavedRes.statusCode).toBe(200);
      const allSaved = allSavedRes.json().data;
      expect(allSaved.totalCount).toBe(4);
      expect(allSaved.articles).toHaveLength(2);
      expect(allSaved.videos).toHaveLength(1);
      expect(allSaved.dinnerPrompts).toHaveLength(1);

      const savedT3Article = allSaved.articles.find(
        (a: any) => a.id === 'art-42-t3-1'
      );
      expect(savedT3Article.isRead).toBe(true);
      expect(savedT3Article.isSaved).toBe(true);

      // Filter GET /saved by Tier 3 -> excludes the Tier 0 article
      const tierSavedRes = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/saved?tier=${DevelopmentalTier.TIER_3_PRE_TEEN_10_12}`,
        headers: { cookie: parentCookie },
      });
      expect(tierSavedRes.statusCode).toBe(200);
      expect(tierSavedRes.json().data.totalCount).toBe(3);
      expect(tierSavedRes.json().data.articles).toHaveLength(1);

      // Un-save the video and confirm totalCount decrements
      await app.inject({
        method: 'PUT',
        url: '/api/v1/digest/interactions',
        headers: { cookie: parentCookie },
        payload: {
          itemType: DigestItemType.VIDEO,
          itemId: 'vid-42-t3-2',
          isSaved: false,
        },
      });

      const afterUnsave = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/saved?tier=${DevelopmentalTier.TIER_3_PRE_TEEN_10_12}`,
        headers: { cookie: parentCookie },
      });
      expect(afterUnsave.statusCode).toBe(200);
      expect(afterUnsave.json().data.totalCount).toBe(2);
      expect(afterUnsave.json().data.videos).toHaveLength(0);
    });
  });
});
