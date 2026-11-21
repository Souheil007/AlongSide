import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  DevelopmentalTier,
  DigestItemType,
  ExploitSeverity,
} from '@alongside/shared';
import {
  getLatestDigest,
  searchSlang,
  getExploitAlerts,
  listDigestIssues,
  getWeeklyDigestEdition,
  listDigestArticles,
  listDigestVideos,
  getSavedDigestShortlist,
  upsertDigestInteraction,
} from '../src/lib/api/digest';

describe('Culture & Trends Digest API Client Specification (PLAN-08 + PLAN-49/51)', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe('Legacy Digest Endpoints (Preserved Compatibility)', () => {
    it('invokes GET /api/v1/digest/latest and returns the latest issue', async () => {
      const mockDigest = {
        id: 'dig-1',
        issueNumber: 42,
        publishDate: '2026-11-15T00:00:00.000Z',
        title: 'Crashout and Vault Apps',
        summary: 'Tween breakdown',
        conversationStarter: 'What was your funniest meme this week?',
        slangTerms: [
          {
            id: 'slang-1',
            term: 'Crashout',
            definition: 'Explosive emotional reaction',
            exampleSentence: 'He had a crashout over his math test',
            contextTone: 'Playful or venting',
          },
        ],
        exploitAlerts: [
          {
            id: 'exp-1',
            appName: 'Calculator+',
            exploitDescription: 'Secret photo vault',
            howKidsBypass: 'Looks like working calculator',
            parentRemedy: 'Inspect storage usage',
            severity: ExploitSeverity.HIGH,
          },
        ],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: { digest: mockDigest },
        }),
      });

      const res = await getLatestDigest();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/digest/latest'),
        expect.any(Object)
      );
      expect(res.digest.issueNumber).toBe(42);
      expect(res.digest.slangTerms).toHaveLength(1);
      expect(res.digest.exploitAlerts).toHaveLength(1);
    });

    it('invokes GET /api/v1/digest/slang with search term query parameter', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: {
            slangTerms: [
              {
                id: 'slang-2',
                term: 'Rizz',
                definition: 'Charisma',
                exampleSentence: 'Unspoken rizz',
                contextTone: 'Harmless Slang',
              },
            ],
          },
        }),
      });

      const res = await searchSlang('rizz');
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/digest/slang?q=rizz&term=rizz'),
        expect.any(Object)
      );
      expect(res.slangTerms).toHaveLength(1);
      expect(res.slangTerms[0]?.term).toBe('Rizz');
    });

    it('invokes GET /api/v1/digest/exploits with severity query parameter', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: {
            exploitAlerts: [
              {
                id: 'exp-crit',
                appName: 'Tor Proxy Browser',
                exploitDescription: 'Bypasses router DNS locks',
                howKidsBypass: 'Encrypted onion routing',
                parentRemedy: 'Block app installation via Pact profile',
                severity: ExploitSeverity.CRITICAL,
              },
            ],
          },
        }),
      });

      const res = await getExploitAlerts(ExploitSeverity.CRITICAL);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/digest/exploits?severity=CRITICAL'),
        expect.any(Object)
      );
      expect(res.exploitAlerts[0]?.severity).toBe('CRITICAL');
    });
  });

  describe('Weekly Culture & Trends Hub Endpoints (PLAN-49 / PLAN-51)', () => {
    it('fetches published weekly issues via GET /api/v1/digest/issues with tier param', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: {
            issues: [
              {
                id: 'digest-issue-42',
                issueNumber: 42,
                publishDate: '2026-11-15T00:00:00.000Z',
                weekStart: '2026-11-08T00:00:00.000Z',
                weekEnd: '2026-11-15T00:00:00.000Z',
                title: 'Issue 42',
                summary: 'Summary',
                status: 'PUBLISHED',
                articleCount: 3,
                videoCount: 3,
              },
            ],
          },
        }),
      });

      const issues = await listDigestIssues(
        DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          '/api/v1/digest/issues?tier=TIER_4_EARLY_ADOLESCENCE_13_15'
        ),
        expect.any(Object)
      );
      expect(issues).toHaveLength(1);
      expect(issues[0]?.issueNumber).toBe(42);
    });

    it('falls back cleanly to 3-issue mock fixtures when network is offline', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

      const issues = await listDigestIssues(
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );
      expect(issues.map((i) => i.issueNumber)).toEqual([42, 41, 40]);

      const edition = await getWeeklyDigestEdition(42, {
        tier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
      });
      expect(edition.issue.issueNumber).toBe(42);
      expect(edition.phrases).toEqual([]);
      expect(edition.articles.length).toBeGreaterThanOrEqual(2);
      expect(edition.videos.length).toBeGreaterThanOrEqual(2);
    });

    it('scopes GET /api/v1/digest/articles and /videos to selected issue by default', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: {
            articles: [],
            unreadCount: 0,
            totalInScope: 0,
            issueNumber: 41,
          },
        }),
      });

      await listDigestArticles({
        issueNumber: 41,
        tier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
      });
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/digest/articles?issueNumber=41&scope=issue'),
        expect.any(Object)
      );

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: {
            videos: [],
            totalInScope: 0,
            issueNumber: 41,
          },
        }),
      });

      await listDigestVideos({
        issueNumber: 41,
        durationBucket: 'short',
        tier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
      });
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          '/api/v1/digest/videos?issueNumber=41&scope=issue&tier=TIER_3_PRE_TEEN_10_12&durationBucket=short'
        ),
        expect.any(Object)
      );
    });

    it('sends PUT /api/v1/digest/interactions and falls back gracefully on 401 guest mode', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Auth required' },
        }),
      });

      const interaction = await upsertDigestInteraction({
        itemType: DigestItemType.ARTICLE,
        itemId: 'art-42-t3-1',
        isRead: true,
        isSaved: true,
      });
      expect(interaction).toEqual({
        itemType: DigestItemType.ARTICLE,
        itemId: 'art-42-t3-1',
        isRead: true,
        isSaved: true,
      });

      const saved = await getSavedDigestShortlist({
        tier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
      });
      expect(saved).toHaveProperty('articles');
      expect(saved).toHaveProperty('videos');
      expect(saved).toHaveProperty('dinnerPrompts');
    });
  });
});
