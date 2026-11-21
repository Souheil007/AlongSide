import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { FastifyInstance } from 'fastify';
import type { PrismaClient } from '@alongside/database';
import {
  CANONICAL_DIGEST_TIERS,
  DevelopmentalTier,
  Role,
  type CanonicalDigestTier,
} from '@alongside/shared';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { InMemoryChildrenRepository } from '../src/modules/children/children.repository.js';
import {
  InMemoryDigestRepository,
  PrismaDigestRepository,
} from '../src/modules/digest/digest.repository.js';
import {
  buildYouTubeChannelFeedUrl,
  CURATED_BLOG_FEEDS,
  CURATED_YOUTUBE_CHANNELS,
  TIER_FALLBACK_SEARCH_QUERIES,
  type CuratedBlogFeed,
  type CuratedYouTubeChannel,
} from '../src/modules/digest/ingestion/curatedSources.js';
import {
  assertSafeExternalUrl,
  computeCanonicalHash,
  FakeBlogFeedFetcher,
  MAX_RSS_EXCERPT_CHARS,
  normalizeCanonicalUrl,
  RssBlogFeedAdapter,
  sanitizeRssExcerpt,
  type RawBlogCandidate,
} from '../src/modules/digest/ingestion/adapters/blogFeedFetcher.js';
import {
  DEFAULT_MAX_RESPONSE_BYTES,
  fetchSafeText,
} from '../src/modules/digest/ingestion/adapters/safeFetch.js';
import {
  FakeYouTubeFeedFetcher,
  parseIso8601DurationSeconds,
  YouTubeWeeklyFeedAdapter,
  type RawVideoCandidate,
} from '../src/modules/digest/ingestion/adapters/youtubeFeedFetcher.js';
import {
  ALLOWED_DIGEST_TOPIC_LABELS,
  DeterministicDigestCuratorFake,
  LlmDigestCuratorAdapter,
} from '../src/modules/digest/ingestion/adapters/digestCurator.js';
import { DigestIngestionOrchestrator } from '../src/modules/digest/ingestion/digestIngestion.orchestrator.js';
import { MultiProviderLlmOrchestrator } from '../src/modules/ai-advisor/adapters/llm-orchestrator.js';
import type { LlmClientAdapter } from '../src/modules/ai-advisor/adapters/llm.adapter.js';

const WEEK_43_START = new Date('2026-11-15T00:00:00.000Z');
const WEEK_43_END = new Date('2026-11-22T00:00:00.000Z');
const WEEK_44_START = new Date('2026-11-22T00:00:00.000Z');
const WEEK_44_END = new Date('2026-11-29T00:00:00.000Z');

function mockResponse(
  body: string | Record<string, unknown>,
  status = 200,
  contentType = 'application/xml'
): Response {
  const payload = typeof body === 'string' ? body : JSON.stringify(body);
  return new Response(payload, {
    status,
    headers: { 'content-type': contentType },
  });
}

describe('Culture & Trends Live Weekly Sourcing & Curation Pipeline (PLAN-50)', () => {
  describe('Curated allowlist source registry', () => {
    it('includes all 8 core clinical & youth-culture blog publishers with safe HTTPS feed URLs', () => {
      const domains = new Set(CURATED_BLOG_FEEDS.map((f) => f.sourceDomain));
      for (const requiredDomain of [
        'healthychildren.org',
        'childmind.org',
        'commonsensemedia.org',
        'zerotothree.org',
        'greatergood.berkeley.edu',
        'developingchild.harvard.edu',
        'understood.org',
        'screenagersmovie.com',
      ]) {
        expect(domains.has(requiredDomain)).toBe(true);
      }

      for (const feed of CURATED_BLOG_FEEDS) {
        expect(() => assertSafeExternalUrl(feed.feedUrl)).not.toThrow();
        expect(feed.defaultTiers.length).toBeGreaterThan(0);
        expect([1, 2, 3]).toContain(feed.authorityWeight);
      }
    });

    it('covers all 6 canonical developmental tiers across curated YouTube channels and search queries', () => {
      expect(CURATED_YOUTUBE_CHANNELS.length).toBeGreaterThanOrEqual(30);

      for (const tier of CANONICAL_DIGEST_TIERS) {
        const matchingChannels = CURATED_YOUTUBE_CHANNELS.filter((c) =>
          c.defaultTiers.includes(tier)
        );
        expect(matchingChannels.length).toBeGreaterThanOrEqual(4);
        expect(TIER_FALLBACK_SEARCH_QUERIES[tier].length).toBeGreaterThanOrEqual(
          1
        );
      }

      for (const channel of CURATED_YOUTUBE_CHANNELS) {
        expect(channel.channelId.startsWith('UC')).toBe(true);
        const atomUrl = buildYouTubeChannelFeedUrl(channel.channelId);
        expect(() => assertSafeExternalUrl(atomUrl)).not.toThrow();
      }
    });
  });

  describe('SSRF guard, URL normalization & RSS copyright sanitization', () => {
    it('rejects non-HTTPS schemes, localhost, private RFC 1918, link-local, and IPv6 local hosts', () => {
      const unsafeUrls = [
        'http://childmind.org/feed/',
        'file:///etc/passwd',
        'javascript:alert(1)',
        'https://localhost/feed.xml',
        'https://sub.localhost/feed.xml',
        'https://internal.local/rss',
        'https://127.0.0.1/feed',
        'https://10.0.0.8/feed',
        'https://172.16.5.4/feed',
        'https://192.168.1.25/feed',
        'https://169.254.169.254/latest/meta-data/',
        'https://[::1]/feed',
        'https://[::]/feed',
        'https://[fe80::1]/feed',
        'https://[fc00::1]/feed',
        'https://[::ffff:127.0.0.1]/feed',
        'https://[::ffff:0:127.0.0.1]/feed',
        'https://[64:ff9b::7f00:1]/feed',
        'https://user:pass@childmind.org/feed/',
        'https://2130706433/feed',
      ];

      for (const url of unsafeUrls) {
        expect(() => assertSafeExternalUrl(url)).toThrow();
      }

      expect(assertSafeExternalUrl('https://childmind.org/feed/').hostname).toBe(
        'childmind.org'
      );
    });

    it('rejects SSRF redirect hops (302 -> cloud metadata) and oversized >2MB response bodies', async () => {
      let redirectFetchCalls = 0;
      const redirectFetch: typeof fetch = async () => {
        redirectFetchCalls += 1;
        return new Response(null, {
          status: 302,
          headers: { location: 'http://169.254.169.254/latest/meta-data/' },
        });
      };

      await expect(
        fetchSafeText('https://childmind.org/feed/', {
          fetchImpl: redirectFetch,
        })
      ).rejects.toThrow(/HTTPS required|Private or reserved/i);
      expect(redirectFetchCalls).toBe(1);

      let httpsMetadataCalls = 0;
      const httpsMetadataRedirect: typeof fetch = async () => {
        httpsMetadataCalls += 1;
        return new Response(null, {
          status: 302,
          headers: { location: 'https://169.254.169.254/latest/meta-data/' },
        });
      };

      await expect(
        fetchSafeText('https://childmind.org/feed/', {
          fetchImpl: httpsMetadataRedirect,
        })
      ).rejects.toThrow(/Private or reserved IPv4/i);
      expect(httpsMetadataCalls).toBe(1);

      // Streamed response exceeding 2 MiB without Content-Length header must be rejected
      const oversizedFetch: typeof fetch = async () => {
        const chunk = new Uint8Array(512 * 1024).fill(65); // 512 KiB of 'A'
        let chunksEmitted = 0;
        const stream = new ReadableStream<Uint8Array>({
          pull(controller) {
            if (chunksEmitted < 5) {
              chunksEmitted += 1; // 5 * 512 KiB = 2.5 MiB > 2 MiB
              controller.enqueue(chunk);
            } else {
              controller.close();
            }
          },
        });
        return new Response(stream, {
          status: 200,
          headers: { 'content-type': 'application/xml' },
        });
      };

      await expect(
        fetchSafeText('https://childmind.org/feed/', {
          fetchImpl: oversizedFetch,
          maxBytes: DEFAULT_MAX_RESPONSE_BYTES,
        })
      ).rejects.toThrow(/exceeds maximum allowed size/i);
    });

    it('normalizes canonical URLs by stripping tracking params and producing deterministic hashes', () => {
      const a = normalizeCanonicalUrl(
        'https://childmind.org/article/sleep-routines/?utm_source=rss&utm_medium=feed&fbclid=abc#section-2'
      );
      const b = normalizeCanonicalUrl(
        'https://childmind.org/article/sleep-routines'
      );

      expect(a).toBe('https://childmind.org/article/sleep-routines');
      expect(a).toBe(b);
      expect(computeCanonicalHash(a)).toBe(computeCanonicalHash(b));
      expect(computeCanonicalHash(a)).toHaveLength(64);
    });

    it('strips HTML/scripts cleanly (including double-encoded RSS entities) and caps plain-text excerpts strictly to <= 600 chars', () => {
      const longBody = `<script>alert('xss')</script><p>Evidence-based &amp; calm parenting tips: ${'word '.repeat(220)}</p>`;
      const excerpt = sanitizeRssExcerpt(longBody);

      expect(excerpt).not.toContain('<script>');
      expect(excerpt).not.toContain('<p>');
      expect(excerpt).toContain('Evidence-based & calm parenting tips:');
      expect(excerpt.length).toBeLessThanOrEqual(MAX_RSS_EXCERPT_CHARS);

      // Double-encoded entities must decode BEFORE tag stripping so zero <p> markup leaks
      expect(sanitizeRssExcerpt('&amp;lt;p&amp;gt;Hello&amp;lt;/p&amp;gt;')).toBe(
        'Hello'
      );
      expect(
        sanitizeRssExcerpt(
          '&amp;lt;script&amp;gt;alert(1)&amp;lt;/script&amp;gt;&amp;lt;p&amp;gt;Calm &amp;amp; clear&amp;lt;/p&amp;gt;'
        )
      ).toBe('Calm & clear');
    });
  });

  describe('RssBlogFeedAdapter (RSS 2.0 / Atom 1.0 parsing & partial failure resilience)', () => {
    it('enforces strict [weekStart, weekEnd] window, rejects unsafe item links, caps excerpts, and survives feed failure', async () => {
      const testFeeds: CuratedBlogFeed[] = [
        {
          id: 'rss-good',
          sourceName: 'Child Mind Institute',
          sourceDomain: 'childmind.org',
          feedUrl: 'https://childmind.org/feed/',
          defaultTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
          authorityWeight: 3,
        },
        {
          id: 'atom-good',
          sourceName: 'ZERO TO THREE',
          sourceDomain: 'zerotothree.org',
          feedUrl: 'https://www.zerotothree.org/feed/',
          defaultTiers: [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3],
          authorityWeight: 3,
        },
        {
          id: 'rss-failing',
          sourceName: 'Timeout Publisher',
          sourceDomain: 'example.org',
          feedUrl: 'https://example.org/broken-rss.xml',
          defaultTiers: [DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9],
          authorityWeight: 2,
        },
      ];

      const overlongParagraph = 'Helpful developmental guidance. '.repeat(40);
      const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
          <channel>
            <title>Child Mind Institute</title>
            <item>
              <title>In-Window Calm Homework Bridge</title>
              <link>https://childmind.org/article/calm-homework-bridge/?utm_source=rss</link>
              <pubDate>Wed, 18 Nov 2026 14:00:00 GMT</pubDate>
              <dc:creator>Dr. Rachel Busman</dc:creator>
              <description><![CDATA[<p>${overlongParagraph}</p>]]></description>
            </item>
            <item>
              <title>Too Old Article Outside Window</title>
              <link>https://childmind.org/article/too-old/</link>
              <pubDate>Mon, 02 Nov 2026 10:00:00 GMT</pubDate>
              <description>Published before weekStart.</description>
            </item>
            <item>
              <title>Unsafe HTTP Link Should Be Rejected</title>
              <link>http://childmind.org/article/insecure-http/</link>
              <pubDate>Thu, 19 Nov 2026 10:00:00 GMT</pubDate>
              <description>Non-HTTPS link must be rejected.</description>
            </item>
          </channel>
        </rss>`;

      const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
        <feed xmlns="http://www.w3.org/2005/Atom">
          <title>ZERO TO THREE</title>
          <entry>
            <title>Toddler Floor Play &amp; Language Bursts</title>
            <link rel="alternate" href="https://www.zerotothree.org/resource/floor-play?fbclid=xyz" />
            <published>2026-11-20T09:30:00Z</published>
            <author><name>ZERO TO THREE Team</name></author>
            <summary type="html">&lt;p&gt;Warm back-and-forth play supports toddler vocabulary.&lt;/p&gt;</summary>
          </entry>
        </feed>`;

      const mockFetch: typeof fetch = async (input) => {
        const url = String(input);
        if (url === 'https://childmind.org/feed/') return mockResponse(rssXml);
        if (url === 'https://www.zerotothree.org/feed/') {
          return mockResponse(atomXml, 200, 'application/atom+xml');
        }
        throw new Error('Simulated feed timeout');
      };

      const adapter = new RssBlogFeedAdapter({
        feeds: testFeeds,
        fetchImpl: mockFetch,
      });
      const result = await adapter.fetchCandidates({
        weekStart: WEEK_43_START,
        weekEnd: WEEK_43_END,
      });

      expect(result.warnings).toHaveLength(1);
      expect(result.warnings[0]).toContain('Timeout Publisher');
      expect(result.rejectedCount).toBe(1); // Unsafe HTTP item rejected
      expect(result.candidates).toHaveLength(2);

      const rssItem = result.candidates.find(
        (c) => c.title === 'In-Window Calm Homework Bridge'
      )!;
      expect(rssItem.sourceUrl).toBe(
        'https://childmind.org/article/calm-homework-bridge'
      );
      expect(rssItem.rssExcerpt.length).toBeLessThanOrEqual(
        MAX_RSS_EXCERPT_CHARS
      );
      expect(rssItem.authorName).toBe('Dr. Rachel Busman');

      const atomItem = result.candidates.find((c) =>
        c.title.includes('Toddler Floor Play')
      )!;
      expect(atomItem.sourceUrl).toBe(
        'https://www.zerotothree.org/resource/floor-play'
      );
    });
  });

  describe('YouTubeWeeklyFeedAdapter (duration parsing, embed verification & chapter extraction)', () => {
    it('accurately parses ISO-8601 YouTube durations', () => {
      expect(parseIso8601DurationSeconds('PT14M22S')).toBe(862);
      expect(parseIso8601DurationSeconds('PT1H2M5S')).toBe(3725);
      expect(parseIso8601DurationSeconds('PT45S')).toBe(45);
      expect(parseIso8601DurationSeconds('PT2M')).toBe(120);
      expect(parseIso8601DurationSeconds('P0D')).toBeNull();
      expect(parseIso8601DurationSeconds('invalid')).toBeNull();
    });

    it('batches videos.list verification when YOUTUBE_API_KEY is set, rejects non-embeddable & <90s Shorts, and parses real chapters', async () => {
      const testChannels: CuratedYouTubeChannel[] = [
        {
          channelId: 'UCtestChannel000000000001',
          channelName: 'PedsDocTalk',
          defaultPresenter: 'Dr. Mona Amin, DO, FAAP',
          defaultTiers: [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3],
          topicHint: 'Sleep & Routines',
        },
      ];

      const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
        <feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
          <title>PedsDocTalk</title>
          <entry>
            <yt:videoId>ValidVid001</yt:videoId>
            <title>Calm Toddler Bedtime Walkthrough</title>
            <link rel="alternate" href="https://www.youtube.com/watch?v=ValidVid001"/>
            <author><name>PedsDocTalk</name></author>
            <published>2026-11-18T12:00:00+00:00</published>
            <media:group><media:description>Placeholder atom desc</media:description></media:group>
          </entry>
          <entry>
            <yt:videoId>NoEmbed0002</yt:videoId>
            <title>Non-Embeddable Talk</title>
            <link rel="alternate" href="https://www.youtube.com/watch?v=NoEmbed0002"/>
            <author><name>PedsDocTalk</name></author>
            <published>2026-11-19T12:00:00+00:00</published>
            <media:group><media:description>Embed disabled</media:description></media:group>
          </entry>
          <entry>
            <yt:videoId>ShortVid003</yt:videoId>
            <title>Quick 45 Second Teaser</title>
            <link rel="alternate" href="https://www.youtube.com/watch?v=ShortVid003"/>
            <author><name>PedsDocTalk</name></author>
            <published>2026-11-20T12:00:00+00:00</published>
            <media:group><media:description>Short clip</media:description></media:group>
          </entry>
          <entry>
            <yt:videoId>OldVideo004</yt:videoId>
            <title>Last Month Talk</title>
            <link rel="alternate" href="https://www.youtube.com/watch?v=OldVideo004"/>
            <author><name>PedsDocTalk</name></author>
            <published>2026-10-10T12:00:00+00:00</published>
            <media:group><media:description>Old</media:description></media:group>
          </entry>
        </feed>`;

      let searchCalled = false;
      let videosListCalled = false;

      const mockFetch: typeof fetch = async (input) => {
        const url = String(input);
        if (url.includes('/feeds/videos.xml')) {
          return mockResponse(atomXml, 200, 'application/atom+xml');
        }
        if (url.includes('/youtube/v3/search')) {
          searchCalled = true;
          return mockResponse(
            {
              items: [
                {
                  id: { videoId: 'SearchVid05' },
                  snippet: {
                    title: 'Supplemental Teen Sleep Talk',
                    description: 'No chapter timestamps in description.',
                    channelTitle: 'Child Mind Institute',
                    channelId: 'UCJWqhYTN2h00RsOBQSFEytg',
                    publishedAt: '2026-11-19T16:00:00Z',
                  },
                },
              ],
            },
            200,
            'application/json'
          );
        }
        if (url.includes('/youtube/v3/videos')) {
          videosListCalled = true;
          return mockResponse(
            {
              items: [
                {
                  id: 'ValidVid001',
                  contentDetails: { duration: 'PT14M22S' },
                  status: { embeddable: true, privacyStatus: 'public' },
                  snippet: {
                    title: 'Calm Toddler Bedtime Walkthrough',
                    description:
                      'Chapters:\n0:00 Bedtime biology\n4:15 Transition cues\n9:30 Lights-out script',
                    channelTitle: 'PedsDocTalk',
                    channelId: 'UCtestChannel000000000001',
                    publishedAt: '2026-11-18T12:00:00Z',
                  },
                },
                {
                  id: 'NoEmbed0002',
                  contentDetails: { duration: 'PT12M00S' },
                  status: { embeddable: false, privacyStatus: 'public' },
                  snippet: { title: 'Non-Embeddable Talk', description: '' },
                },
                {
                  id: 'ShortVid003',
                  contentDetails: { duration: 'PT45S' },
                  status: { embeddable: true, privacyStatus: 'public' },
                  snippet: { title: 'Quick 45 Second Teaser', description: '' },
                },
                {
                  id: 'SearchVid05',
                  contentDetails: { duration: 'PT11M10S' },
                  status: { embeddable: true, privacyStatus: 'public' },
                  snippet: {
                    title: 'Supplemental Teen Sleep Talk',
                    description: 'Pure overview without timestamps.',
                    channelTitle: 'Child Mind Institute',
                    channelId: 'UCJWqhYTN2h00RsOBQSFEytg',
                    publishedAt: '2026-11-19T16:00:00Z',
                  },
                },
              ],
            },
            200,
            'application/json'
          );
        }
        return mockResponse({}, 404, 'application/json');
      };

      const adapter = new YouTubeWeeklyFeedAdapter({
        channels: testChannels,
        apiKey: 'AIzaSyRealTestKeyForUnitVerification',
        fetchImpl: mockFetch,
      });

      const res = await adapter.fetchFreshVideos(
        { weekStart: WEEK_43_START, weekEnd: WEEK_43_END },
        { minPerTier: 3, sparseTiers: [DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15] }
      );

      expect(searchCalled).toBe(true);
      expect(videosListCalled).toBe(true);
      expect(res.rejectedCount).toBe(2); // NoEmbed0002 + ShortVid003
      expect(res.candidates).toHaveLength(2);

      const validVid = res.candidates.find(
        (v) => v.youtubeVideoId === 'ValidVid001'
      )!;
      expect(validVid.durationSeconds).toBe(862);
      expect(validVid.durationMinutes).toBe(14);
      expect(validVid.isEmbeddable).toBe(true);
      expect(validVid.jumpChips).toEqual([
        { seconds: 0, label: '0:00 · Bedtime biology' },
        { seconds: 255, label: '4:15 · Transition cues' },
        { seconds: 570, label: '9:30 · Lights-out script' },
      ]);

      // Zero fabricated timestamps when description has no chapters
      const searchVid = res.candidates.find(
        (v) => v.youtubeVideoId === 'SearchVid05'
      )!;
      expect(searchVid.jumpChips).toEqual([]);
    });

    it('falls back cleanly to YouTube oEmbed HTTP 200 verification when YOUTUBE_API_KEY is omitted', async () => {
      const testChannels: CuratedYouTubeChannel[] = [
        {
          channelId: 'UCtestOembed000000000001',
          channelName: 'Common Sense Media',
          defaultPresenter: 'Common Sense Media Editors',
          defaultTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
          topicHint: 'Media & Tech',
        },
      ];

      const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
        <feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
          <entry>
            <yt:videoId>OembedOk001</yt:videoId>
            <title>Group Chat Etiquette for Pre-Teens</title>
            <link rel="alternate" href="https://www.youtube.com/watch?v=OembedOk001"/>
            <author><name>Common Sense Media</name></author>
            <published>2026-11-18T14:00:00+00:00</published>
            <media:group><media:description>0:00 Group chat norms\n3:20 Pausing before replying</media:description></media:group>
          </entry>
          <entry>
            <yt:videoId>Oembed40102</yt:videoId>
            <title>Private Or Blocked Video</title>
            <link rel="alternate" href="https://www.youtube.com/watch?v=Oembed40102"/>
            <author><name>Common Sense Media</name></author>
            <published>2026-11-19T14:00:00+00:00</published>
            <media:group><media:description>Blocked embed</media:description></media:group>
          </entry>
          <entry>
            <yt:videoId>ShortLink03</yt:videoId>
            <title>Vertical Short Clip</title>
            <link rel="alternate" href="https://www.youtube.com/shorts/ShortLink03"/>
            <author><name>Common Sense Media</name></author>
            <published>2026-11-19T15:00:00+00:00</published>
            <media:group><media:description>Short clip</media:description></media:group>
          </entry>
        </feed>`;

      const mockFetch: typeof fetch = async (input) => {
        const url = String(input);
        if (url.includes('/feeds/videos.xml')) {
          return mockResponse(atomXml, 200, 'application/atom+xml');
        }
        if (url.includes('OembedOk001')) {
          return mockResponse(
            {
              title: 'Group Chat Etiquette for Pre-Teens',
              author_name: 'Common Sense Media',
              width: 480,
              height: 270,
              html: '<iframe src="https://www.youtube.com/embed/OembedOk001"></iframe>',
            },
            200,
            'application/json'
          );
        }
        return mockResponse({ error: 'Unauthorized' }, 401, 'application/json');
      };

      const adapter = new YouTubeWeeklyFeedAdapter({
        channels: testChannels,
        apiKey: '',
        fetchImpl: mockFetch,
      });

      const res = await adapter.fetchFreshVideos({
        weekStart: WEEK_43_START,
        weekEnd: WEEK_43_END,
      });

      expect(res.candidates).toHaveLength(1);
      expect(res.candidates[0]!.youtubeVideoId).toBe('OembedOk001');
      expect(res.candidates[0]!.jumpChips).toHaveLength(2);
      expect(res.rejectedCount).toBe(2); // ShortLink03 + Oembed40102
    });
  });

  describe('LlmDigestCuratorAdapter & DeterministicDigestCuratorFake', () => {
    it('rejects sensationalist/advertorial candidates and strictly enforces phrases=[] for ages 0-6 even if LLM returns phrases', async () => {
      const mockLlmAdapter: LlmClientAdapter = {
        providerName: 'mock-llm',
        hasApiKey: true,
        async *stream(options) {
          const userPrompt = options.messages[1]?.content ?? '';
          if (userPrompt.includes('weekly parenting blog')) {
            yield JSON.stringify({
              items: [
                {
                  canonicalHash: 'hash-calm',
                  approved: true,
                  topicLabel: 'Sleep & Routines',
                  targetTiers: [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3],
                  summary:
                    'Consistent evening wind-down rhythms help toddlers transition smoothly toward sleep. Keeping lighting dim supports natural melatonin signaling.',
                  keyShift:
                    'Use steady environmental cues rather than verbal negotiations at bedtime.',
                  perspectiveNote: null,
                },
                {
                  canonicalHash: 'hash-alarmist',
                  approved: true,
                  topicLabel: 'Media & Tech',
                  targetTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
                  summary: 'Even if LLM approves, heuristic filter must block advertorials.',
                  keyShift: 'Should be rejected.',
                },
              ],
            });
            return;
          }

          // Deliberately emit rogue phrases for Tier 0 to prove defense-in-depth strips them
          yield JSON.stringify({
            dinnerPrompts: [
              {
                question: 'What made you giggle today?',
                parentTip: 'Mirror your toddler’s smile warmly.',
                followUp: 'Can you show me that silly sound?',
              },
              {
                question: 'Which toy felt most fun to stack?',
                parentTip: 'Celebrate effort and curiosity.',
                followUp: 'Should we build a taller tower tomorrow?',
              },
              {
                question: 'When did your body want a big hug today?',
                parentTip: 'Normalize co-regulation openly.',
                followUp: 'Do you want a bear squeeze right now?',
              },
            ],
            phrases: [
              {
                word: 'Skibidi',
                shortMeaning: 'Must be stripped for 0-3',
                fullMeaning: 'Infants and toddlers must never receive youth slang phrases.',
                cringeLevel: 3,
                cringeLabel: 'Never',
                calmScript: 'Never shown for 0-3.',
              },
            ],
          });
        },
      };

      const llmOrchestrator = new MultiProviderLlmOrchestrator({
        adapters: [mockLlmAdapter],
        logger: { warn: () => {} },
      });
      const curator = new LlmDigestCuratorAdapter({
        llmOrchestrator,
        logger: { warn: () => {} },
      });

      const curatedArticles = await curator.curateArticles([
        {
          feedId: 'ztt',
          sourceName: 'ZERO TO THREE',
          sourceDomain: 'zerotothree.org',
          authorityWeight: 3,
          defaultTiers: [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3],
          sourceUrl: 'https://www.zerotothree.org/resource/calm-sleep',
          canonicalHash: 'hash-calm',
          title: 'Calm Evening Routines for Two-Year-Olds',
          rssExcerpt: 'Steady lighting and predictable stories support toddler sleep.',
          authorName: null,
          imageUrl: null,
          publishedAt: new Date('2026-11-18T10:00:00.000Z'),
          categories: ['Sleep'],
        },
        {
          feedId: 'spam',
          sourceName: 'Sponsored Blog',
          sourceDomain: 'example.com',
          authorityWeight: 1,
          defaultTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
          sourceUrl: 'https://example.com/sponsored-alarm',
          canonicalHash: 'hash-alarmist',
          title: 'Sponsored: The Terrifying New App Destroying Your Kids!',
          rssExcerpt: 'Paid partnership promo code inside.',
          authorName: null,
          imageUrl: null,
          publishedAt: new Date('2026-11-18T10:00:00.000Z'),
          categories: [],
        },
      ]);

      expect(curatedArticles[0]!.approved).toBe(true);
      expect(ALLOWED_DIGEST_TOPIC_LABELS).toContain(
        curatedArticles[0]!.topicLabel
      );
      expect(curatedArticles[1]!.approved).toBe(false);

      const extrasT0 = await curator.synthesizeWeeklyExtras({
        weekStart: WEEK_43_START,
        weekEnd: WEEK_43_END,
        tier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
        articles: curatedArticles,
        videos: [],
      });
      expect(extrasT0.dinnerPrompts).toHaveLength(3);
      expect(extrasT0.phrases).toEqual([]);

      const extrasT1 = await curator.synthesizeWeeklyExtras({
        weekStart: WEEK_43_START,
        weekEnd: WEEK_43_END,
        tier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        articles: [],
        videos: [],
      });
      expect(extrasT1.phrases).toEqual([]);

      // Failing LLM provider seamlessly falls back to DeterministicDigestCuratorFake
      const failingLlm = new MultiProviderLlmOrchestrator({
        adapters: [
          {
            providerName: 'down-provider',
            async *stream() {
              throw new Error('Provider rate limited');
            },
          },
        ],
        logger: { warn: () => {} },
      });
      const resilientCurator = new LlmDigestCuratorAdapter({
        llmOrchestrator: failingLlm,
        logger: { warn: () => {} },
      });

      const extrasT4 = await resilientCurator.synthesizeWeeklyExtras({
        weekStart: WEEK_43_START,
        weekEnd: WEEK_43_END,
        tier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        articles: [],
        videos: [],
      });
      expect(extrasT4.dinnerPrompts).toHaveLength(3);
      expect(extrasT4.phrases).toHaveLength(3);
    });
  });

  describe('DigestIngestionOrchestrator (dedup, idempotency, sparse-tier lookback & dryRun)', () => {
    it('is 100% idempotent on repeated syncs of the same week and deduplicates cross-issue items on the next week', async () => {
      const repo = new InMemoryDigestRepository(true);
      const orchestrator = new DigestIngestionOrchestrator({
        blogFeedFetcher: new FakeBlogFeedFetcher({
          warnings: ['Simulated minor RSS timeout on 1 optional feed'],
        }),
        youtubeFeedFetcher: new FakeYouTubeFeedFetcher(),
        curator: new DeterministicDigestCuratorFake(),
        repository: repo,
        logger: { warn: () => {} },
      });

      // Run 1 for Week 43 -> creates Issue #43
      const run1 = await orchestrator.syncWeeklyEdition({
        weekStart: WEEK_43_START,
        weekEnd: WEEK_43_END,
      });

      expect(run1.issueNumber).toBe(43);
      expect(run1.persisted).toBe(true);
      expect(run1.dryRun).toBe(false);
      expect(run1.articles.persisted).toBeGreaterThanOrEqual(18);
      expect(run1.videos.persisted).toBeGreaterThanOrEqual(18);
      expect(run1.videos.rejected).toBe(2); // non-embeddable + <90s short rejected
      expect(run1.warnings).toContain(
        'Simulated minor RSS timeout on 1 optional feed'
      );

      for (const tierMetric of run1.perTier) {
        expect(tierMetric.articlesSelected).toBeGreaterThanOrEqual(3);
        expect(tierMetric.articlesSelected).toBeLessThanOrEqual(6);
        expect(tierMetric.videosSelected).toBeGreaterThanOrEqual(3);
        expect(tierMetric.videosSelected).toBeLessThanOrEqual(6);
        expect(tierMetric.dinnerPromptsGenerated).toBe(3);
        expect(tierMetric.usedFallbackLookback).toBe(false);

        if (
          tierMetric.tier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3 ||
          tierMetric.tier === DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6
        ) {
          expect(tierMetric.phrasesGenerated).toBe(0);
        } else {
          expect(tierMetric.phrasesGenerated).toBe(3);
        }
      }

      const edition43AfterRun1 = await repo.findEditionByIssueNumber(
        43,
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12
      );
      expect(edition43AfterRun1).not.toBeNull();
      expect(edition43AfterRun1!.articles[0]!.isLead).toBe(true);
      const run1ArticleIds = edition43AfterRun1!.articles.map((a) => a.id);

      // Run 2 for the exact same Week 43 -> 100% idempotent (updates Issue #43, same counts & IDs)
      const run2 = await orchestrator.syncWeeklyEdition({
        weekStart: WEEK_43_START,
        weekEnd: WEEK_43_END,
      });
      expect(run2.issueNumber).toBe(43);
      expect(run2.articles.persisted).toBe(run1.articles.persisted);
      expect(run2.videos.persisted).toBe(run1.videos.persisted);

      const edition43AfterRun2 = await repo.findEditionByIssueNumber(
        43,
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12
      );
      expect(edition43AfterRun2!.articles.map((a) => a.id)).toEqual(
        run1ArticleIds
      );

      // Run 3 for Week 44 reusing identical canonical URLs/video IDs -> cross-issue deduplication drops them!
      const duplicateNextWeekOrchestrator = new DigestIngestionOrchestrator({
        blogFeedFetcher: new FakeBlogFeedFetcher({
          candidates: [
            {
              feedId: 'dup-blog',
              sourceName: 'Common Sense Media',
              sourceDomain: 'commonsensemedia.org',
              authorityWeight: 3,
              defaultTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
              sourceUrl:
                'https://commonsensemedia.org/articles/t3-1?utm_campaign=repost',
              canonicalHash: computeCanonicalHash(
                'https://commonsensemedia.org/articles/t3-1'
              ),
              title: 'Repeated Article From Issue #43 Must Not Appear In #44',
              rssExcerpt: 'Duplicate URL across issues.',
              authorName: null,
              imageUrl: null,
              publishedAt: new Date('2026-11-25T10:00:00.000Z'),
              categories: ['Media'],
            },
            {
              feedId: 'fresh-blog',
              sourceName: 'Common Sense Media',
              sourceDomain: 'commonsensemedia.org',
              authorityWeight: 3,
              defaultTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
              sourceUrl: 'https://commonsensemedia.org/articles/t3-brand-new-44',
              canonicalHash: computeCanonicalHash(
                'https://commonsensemedia.org/articles/t3-brand-new-44'
              ),
              title: 'Brand New Issue #44 Pre-Teen Digital Briefing',
              rssExcerpt: 'Fresh content for Week 44.',
              authorName: null,
              imageUrl: null,
              publishedAt: new Date('2026-11-25T12:00:00.000Z'),
              categories: ['Media'],
            },
          ],
        }),
        youtubeFeedFetcher: new FakeYouTubeFeedFetcher({
          candidates: [
            {
              youtubeVideoId: 'vidT3Fresh01', // Already published in Issue #43!
              videoUrl: 'https://www.youtube.com/watch?v=vidT3Fresh01',
              title: 'Repeated Video From Issue #43',
              presenter: 'Common Sense Media Editors',
              channelName: 'Common Sense Media',
              channelId: 'UCfaket300000000000000',
              publishedAt: new Date('2026-11-25T11:00:00.000Z'),
              durationSeconds: 660,
              durationMinutes: 11,
              description: 'Repeated video.',
              jumpChips: [],
              defaultTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
              topicHint: 'Media & Tech',
              isEmbeddable: true,
              privacyStatus: 'public',
            },
            {
              youtubeVideoId: 'vidT3New441',
              videoUrl: 'https://www.youtube.com/watch?v=vidT3New441',
              title: 'Brand New Issue #44 Pre-Teen Talk',
              presenter: 'Common Sense Media Editors',
              channelName: 'Common Sense Media',
              channelId: 'UCfaket300000000000000',
              publishedAt: new Date('2026-11-25T15:00:00.000Z'),
              durationSeconds: 720,
              durationMinutes: 12,
              description: '0:00 New week intro\n5:00 Practical pact check-in',
              jumpChips: [],
              defaultTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
              topicHint: 'Media & Tech',
              isEmbeddable: true,
              privacyStatus: 'public',
            },
          ],
        }),
        curator: new DeterministicDigestCuratorFake(),
        repository: repo,
        logger: { warn: () => {} },
      });

      const run44 = await duplicateNextWeekOrchestrator.syncWeeklyEdition({
        weekStart: WEEK_44_START,
        weekEnd: WEEK_44_END,
        fallbackLookbackDays: 0,
      });

      expect(run44.issueNumber).toBe(44);
      expect(run44.articles.deduplicated).toBe(1);
      expect(run44.articles.persisted).toBe(1);
      expect(run44.videos.deduplicated).toBe(1);
      expect(run44.videos.persisted).toBe(1);

      const edition44 = await repo.findEditionByIssueNumber(
        44,
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12
      );
      expect(edition44!.articles).toHaveLength(1);
      expect(edition44!.articles[0]!.sourceUrl).toBe(
        'https://commonsensemedia.org/articles/t3-brand-new-44'
      );
      expect(edition44!.videos).toHaveLength(1);
      expect(edition44!.videos[0]!.youtubeVideoId).toBe('vidT3New441');
    });

    it('widens lookback ONLY for sparse tiers while preserving exact original publishedAt timestamps', async () => {
      const repo = new InMemoryDigestRepository(false);
      const t0 = DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;
      const t5 = DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;

      const makeBlog = (
        slug: string,
        tiers: CanonicalDigestTier[],
        publishedIso: string
      ): RawBlogCandidate => {
        const sourceUrl = normalizeCanonicalUrl(
          `https://healthychildren.org/articles/${slug}`
        );
        return {
          feedId: 'aap',
          sourceName: 'HealthyChildren.org (AAP)',
          sourceDomain: 'healthychildren.org',
          authorityWeight: 3,
          defaultTiers: tiers,
          sourceUrl,
          canonicalHash: computeCanonicalHash(sourceUrl),
          title: `Pediatric Briefing ${slug}`,
          rssExcerpt: 'Calm evidence-backed family guidance for healthy routines.',
          authorName: 'AAP Editorial',
          imageUrl: null,
          publishedAt: new Date(publishedIso),
          categories: ['Parenting'],
        };
      };

      const makeVideo = (
        id: string,
        tiers: CanonicalDigestTier[],
        publishedIso: string
      ): RawVideoCandidate => ({
        youtubeVideoId: id,
        videoUrl: `https://www.youtube.com/watch?v=${id}`,
        title: `Pediatric Talk ${id}`,
        presenter: 'Dr. Mona Amin, DO, FAAP',
        channelName: 'PedsDocTalk',
        channelId: 'UCx2hGbeaOvy8P5m357V3gBw',
        publishedAt: new Date(publishedIso),
        durationSeconds: 660,
        durationMinutes: 11,
        description: '0:00 Overview\n4:00 Practical steps',
        jumpChips: [],
        defaultTiers: tiers,
        topicHint: 'Sleep & Routines',
        isEmbeddable: true,
        privacyStatus: 'public',
      });

      const fallbackDateIso = '2026-11-11T09:15:00.000Z'; // 11 days before WEEK_43_END (outside 7d, inside 14d)

      const orchestrator = new DigestIngestionOrchestrator({
        blogFeedFetcher: new FakeBlogFeedFetcher({
          candidates: [
            // Tier 0 already satisfies minArticlesPerTier=3 inside strict 7-day window
            makeBlog('t0-in-1', [t0], '2026-11-21T10:00:00.000Z'),
            makeBlog('t0-in-2', [t0], '2026-11-20T10:00:00.000Z'),
            makeBlog('t0-in-3', [t0], '2026-11-19T10:00:00.000Z'),
            // Tier 5 only has 1 in-window blog -> sparse!
            makeBlog('t5-in-1', [t5], '2026-11-20T12:00:00.000Z'),
            // Older fallback item tagged [t0, t5]: MUST attach ONLY to sparse t5, NOT already-full t0!
            makeBlog('older-shared', [t0, t5], fallbackDateIso),
            makeBlog('older-t5-only', [t5], '2026-11-10T14:00:00.000Z'),
          ],
        }),
        youtubeFeedFetcher: new FakeYouTubeFeedFetcher({
          candidates: [
            makeVideo('vidT0In0001', [t0], '2026-11-21T10:00:00.000Z'),
            makeVideo('vidT0In0002', [t0], '2026-11-20T10:00:00.000Z'),
            makeVideo('vidT0In0003', [t0], '2026-11-19T10:00:00.000Z'),
            makeVideo('vidT5In0001', [t5], '2026-11-20T12:00:00.000Z'),
            makeVideo('vidOldShr01', [t0, t5], fallbackDateIso),
          ],
        }),
        curator: new DeterministicDigestCuratorFake(),
        repository: repo,
        logger: { warn: () => {} },
      });

      const report = await orchestrator.syncWeeklyEdition({
        weekStart: WEEK_43_START,
        weekEnd: WEEK_43_END,
        issueNumber: 1,
        fallbackLookbackDays: 14,
      });

      const t0Metric = report.perTier.find((m) => m.tier === t0)!;
      const t5Metric = report.perTier.find((m) => m.tier === t5)!;

      expect(t0Metric.usedFallbackLookback).toBe(false);
      expect(t0Metric.articlesSelected).toBe(3);
      expect(t0Metric.videosSelected).toBe(3);

      expect(t5Metric.usedFallbackLookback).toBe(true);
      expect(t5Metric.articleLookbackDaysUsed).toBe(14);
      expect(t5Metric.videoLookbackDaysUsed).toBe(14);
      expect(t5Metric.articlesSelected).toBe(3);
      expect(t5Metric.videosSelected).toBe(2);

      // Verify exact original publishedAt preserved on fallback items & zero leakage to Tier 0
      const t0Edition = await repo.findEditionByIssueNumber(1, t0);
      expect(t0Edition!.articles).toHaveLength(3);
      expect(
        t0Edition!.articles.every(
          (a) => new Date(a.publishedAt).getTime() >= WEEK_43_START.getTime()
        )
      ).toBe(true);

      const t5Edition = await repo.findEditionByIssueNumber(1, t5);
      const fallbackArticle = t5Edition!.articles.find((a) =>
        a.sourceUrl.endsWith('/older-shared')
      );
      expect(fallbackArticle).toBeDefined();
      expect(fallbackArticle!.publishedAt).toBe(fallbackDateIso);
      expect(fallbackArticle!.targetTiers).toEqual([t5]);

      const fallbackVideo = t5Edition!.videos.find(
        (v) => v.youtubeVideoId === 'vidOldShr01'
      );
      expect(fallbackVideo).toBeDefined();
      expect(fallbackVideo!.publishedAt).toBe(fallbackDateIso);
      expect(fallbackVideo!.targetTiers).toEqual([t5]);
    });

    it('supports dryRun=true without mutating the repository', async () => {
      const repo = new InMemoryDigestRepository(false);
      const orchestrator = new DigestIngestionOrchestrator({
        blogFeedFetcher: new FakeBlogFeedFetcher(),
        youtubeFeedFetcher: new FakeYouTubeFeedFetcher(),
        curator: new DeterministicDigestCuratorFake(),
        repository: repo,
        logger: { warn: () => {} },
      });

      const report = await orchestrator.syncWeeklyEdition({
        weekStart: WEEK_43_START,
        weekEnd: WEEK_43_END,
        dryRun: true,
      });

      expect(report.dryRun).toBe(true);
      expect(report.persisted).toBe(false);
      expect(report.articles.selected).toBeGreaterThanOrEqual(18);
      expect(report.articles.persisted).toBe(0);
      expect(report.videos.selected).toBeGreaterThanOrEqual(18);
      expect(report.videos.persisted).toBe(0);
      expect(report.issue).toBeUndefined();
      expect(await repo.listPublishedIssues()).toHaveLength(0);
    });

    it('aborts persistence with persisted=false and warning on total feed failure without wiping existing published issues', async () => {
      const repo = new InMemoryDigestRepository(true);
      const beforeEdition42 = await repo.findEditionByIssueNumber(
        42,
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12
      );
      expect(beforeEdition42).not.toBeNull();
      const beforeArticleIds = beforeEdition42!.articles.map((a) => a.id);
      const beforeVideoIds = beforeEdition42!.videos.map((v) => v.id);
      const beforePromptIds = beforeEdition42!.dinnerPrompts.map((p) => p.id);

      const orchestrator = new DigestIngestionOrchestrator({
        blogFeedFetcher: {
          fetchCandidates: vi.fn().mockRejectedValue(new Error('All RSS feeds unreachable')),
        },
        youtubeFeedFetcher: {
          fetchFreshVideos: vi.fn().mockRejectedValue(new Error('YouTube Atom outage')),
        },
        curator: new DeterministicDigestCuratorFake(),
        repository: repo,
        logger: { warn: () => {} },
      });

      const report = await orchestrator.syncWeeklyEdition({
        issueNumber: 42,
        weekStart: new Date('2026-11-08T00:00:00.000Z'),
        weekEnd: new Date('2026-11-15T00:00:00.000Z'),
      });

      expect(report.persisted).toBe(false);
      expect(report.issue).toBeUndefined();
      expect(report.articles.selected).toBe(0);
      expect(report.articles.persisted).toBe(0);
      expect(report.videos.selected).toBe(0);
      expect(report.videos.persisted).toBe(0);
      expect(
        report.warnings.some((w) => w.includes('Sync aborted: all upstream blog and video feeds'))
      ).toBe(true);

      // Existing Issue #42 must remain completely intact
      const afterEdition42 = await repo.findEditionByIssueNumber(
        42,
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12
      );
      expect(afterEdition42).not.toBeNull();
      expect(afterEdition42!.articles.map((a) => a.id)).toEqual(beforeArticleIds);
      expect(afterEdition42!.videos.map((v) => v.id)).toEqual(beforeVideoIds);
      expect(afterEdition42!.dinnerPrompts.map((p) => p.id)).toEqual(beforePromptIds);
    });
  });

  describe('PrismaDigestRepository.upsertWeeklyEdition (transactional safeguards)', () => {
    it('passes { timeout: 30_000 }, preserves dinner-prompt UUIDs in place across re-sync, and guards empty arrays against wiping existing rows', async () => {
      const capturedTxOptions: unknown[] = [];
      let promptSeq = 0;
      let phraseSeq = 0;

      const storedPrompts = new Map<
        string,
        {
          id: string;
          digestId: string;
          question: string;
          parentTip: string;
          followUp: string;
          targetTiers: string[];
          sortOrder: number;
        }
      >();
      const storedPhrases = new Map<
        string,
        {
          id: string;
          digestId: string;
          word: string;
          shortMeaning: string;
          fullMeaning: string;
          cringeLevel: number;
          cringeLabel: string;
          calmScript: string;
          targetTiers: string[];
          sortOrder: number;
        }
      >();

      const articleDeleteMany = vi.fn().mockResolvedValue({ count: 0 });
      const articleUpsert = vi.fn().mockResolvedValue({});
      const videoDeleteMany = vi.fn().mockResolvedValue({ count: 0 });
      const videoUpsert = vi.fn().mockResolvedValue({});
      const promptUpdate = vi.fn(async ({ where, data }: any) => {
        const existing = storedPrompts.get(where.id)!;
        const updated = { ...existing, ...data };
        storedPrompts.set(where.id, updated);
        return updated;
      });
      const promptCreate = vi.fn(async ({ data }: any) => {
        promptSeq += 1;
        const id = `dp-uuid-preserved-${promptSeq}`;
        const row = { id, ...data };
        storedPrompts.set(id, row);
        return row;
      });
      const promptDeleteMany = vi.fn(async ({ where }: any) => {
        for (const id of where.id.in as string[]) {
          storedPrompts.delete(id);
        }
        return { count: where.id.in.length };
      });

      const txMock = {
        cultureDigest: {
          upsert: vi.fn(async ({ create }: any) => ({
            id: 'digest-uuid-43',
            ...create,
          })),
        },
        digestArticle: {
          deleteMany: articleDeleteMany,
          upsert: articleUpsert,
        },
        digestVideo: {
          deleteMany: videoDeleteMany,
          upsert: videoUpsert,
        },
        digestDinnerPrompt: {
          findMany: vi.fn(async () => Array.from(storedPrompts.values())),
          update: promptUpdate,
          create: promptCreate,
          deleteMany: promptDeleteMany,
        },
        digestPhrase: {
          findMany: vi.fn(async () => Array.from(storedPhrases.values())),
          update: vi.fn(async ({ where, data }: any) => {
            const existing = storedPhrases.get(where.id)!;
            const updated = { ...existing, ...data };
            storedPhrases.set(where.id, updated);
            return updated;
          }),
          create: vi.fn(async ({ data }: any) => {
            phraseSeq += 1;
            const id = `ph-uuid-preserved-${phraseSeq}`;
            const row = { id, ...data };
            storedPhrases.set(id, row);
            return row;
          }),
          deleteMany: vi.fn(async ({ where }: any) => {
            for (const id of where.id.in as string[]) {
              storedPhrases.delete(id);
            }
            return { count: where.id.in.length };
          }),
        },
      };

      const prismaMock = {
        $transaction: vi.fn(async (fn: any, options?: unknown) => {
          capturedTxOptions.push(options);
          return fn(txMock);
        }),
      } as unknown as PrismaClient;

      const prismaRepo = new PrismaDigestRepository(prismaMock);

      const basePayload = {
        issueNumber: 43,
        publishDate: WEEK_43_END,
        weekStart: WEEK_43_START,
        weekEnd: WEEK_43_END,
        title: 'Week of Nov 15–Nov 22',
        summary: 'Summary',
        conversationStarter: 'Starter',
        articles: [
          {
            canonicalHash: 'hash-1',
            sourceUrl: 'https://childmind.org/articles/a1',
            sourceName: 'Child Mind Institute',
            sourceDomain: 'childmind.org',
            publishedAt: new Date('2026-11-18T10:00:00.000Z'),
            topicLabel: 'Media & Tech',
            readMinutes: 4,
            title: 'Article 1',
            summary: 'Calm summary.',
            keyShift: 'Calm shift.',
            targetTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
            isLead: true,
            sortOrder: 1,
          },
        ],
        videos: [
          {
            youtubeVideoId: 'vidTxGuard1',
            videoUrl: 'https://www.youtube.com/watch?v=vidTxGuard1',
            title: 'Video 1',
            presenter: 'Presenter',
            channelName: 'Channel',
            publishedAt: new Date('2026-11-18T10:00:00.000Z'),
            durationMinutes: 10,
            formatLabel: 'Quick Briefing',
            takeaway: 'Calm takeaway.',
            skimBullets: ['Bullet 1'],
            targetTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
            isEmbeddable: true,
            sortOrder: 1,
          },
        ],
        dinnerPrompts: [
          {
            question: 'Original dinner question 1?',
            parentTip: 'Original tip 1',
            followUp: 'Original follow-up 1',
            targetTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
            sortOrder: 1,
          },
          {
            question: 'Original dinner question 2?',
            parentTip: 'Original tip 2',
            followUp: 'Original follow-up 2',
            targetTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
            sortOrder: 2,
          },
        ],
        phrases: [
          {
            word: 'Locked in',
            shortMeaning: 'Focused',
            fullMeaning: 'Deeply focused on a task.',
            cringeLevel: 1,
            cringeLabel: 'Positive',
            calmScript: 'Calm script.',
            targetTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
            sortOrder: 1,
          },
        ],
      };

      // Run 1: initial creation
      await prismaRepo.upsertWeeklyEdition(basePayload);
      expect(capturedTxOptions[0]).toEqual({ timeout: 30_000 });
      expect(promptCreate).toHaveBeenCalledTimes(2);
      expect(promptUpdate).toHaveBeenCalledTimes(0);
      const initialPromptIds = Array.from(storedPrompts.keys());
      expect(initialPromptIds).toEqual([
        'dp-uuid-preserved-1',
        'dp-uuid-preserved-2',
      ]);

      articleDeleteMany.mockClear();
      videoDeleteMany.mockClear();
      promptCreate.mockClear();
      promptUpdate.mockClear();
      promptDeleteMany.mockClear();

      // Run 2: re-sync updates dinner prompts IN PLACE (preserving UUIDs) and skips article/video wipe when empty
      await prismaRepo.upsertWeeklyEdition({
        ...basePayload,
        articles: [],
        videos: [],
        dinnerPrompts: [
          {
            question: 'Updated dinner question 1?',
            parentTip: 'Updated tip 1',
            followUp: 'Updated follow-up 1',
            targetTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
            sortOrder: 1,
          },
          {
            question: 'Updated dinner question 2?',
            parentTip: 'Updated tip 2',
            followUp: 'Updated follow-up 2',
            targetTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
            sortOrder: 2,
          },
        ],
      });

      expect(capturedTxOptions[1]).toEqual({ timeout: 30_000 });
      expect(articleDeleteMany).not.toHaveBeenCalled();
      expect(videoDeleteMany).not.toHaveBeenCalled();
      expect(promptCreate).not.toHaveBeenCalled();
      expect(promptDeleteMany).not.toHaveBeenCalled();
      expect(promptUpdate).toHaveBeenCalledTimes(2);
      expect(Array.from(storedPrompts.keys())).toEqual(initialPromptIds);
      expect(storedPrompts.get('dp-uuid-preserved-1')?.question).toBe(
        'Updated dinner question 1?'
      );
      expect(storedPrompts.get('dp-uuid-preserved-2')?.question).toBe(
        'Updated dinner question 2?'
      );
    });
  });

  describe('POST /api/v1/digest/issues/sync (Fastify .inject() auth & integration)', () => {
    const SYNC_SECRET = 'super_secret_digest_cron_sync_token_32_chars';
    let app: FastifyInstance;
    let authRepo: InMemoryAuthRepository;
    let digestRepo: InMemoryDigestRepository;
    let parentCookie: string;
    let adminCookie: string;

    beforeEach(async () => {
      authRepo = new InMemoryAuthRepository();
      const childrenRepo = new InMemoryChildrenRepository();
      digestRepo = new InMemoryDigestRepository(true);

      const orchestrator = new DigestIngestionOrchestrator({
        blogFeedFetcher: new FakeBlogFeedFetcher(),
        youtubeFeedFetcher: new FakeYouTubeFeedFetcher(),
        curator: new DeterministicDigestCuratorFake(),
        repository: digestRepo,
        logger: { warn: () => {} },
      });

      app = await buildApp({
        logger: false,
        authRepository: authRepo,
        childrenRepository: childrenRepo,
        digestRepository: digestRepo,
        digestIngestionOrchestrator: orchestrator,
        digestSyncSecret: SYNC_SECRET,
        jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
        cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
      });

      // Register standard PARENT user
      const parentReg = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'parent.sync.test@example.com',
          password: 'Password123!',
          fullName: 'Regular Parent',
        },
      });
      const parentCookies = parentReg.headers['set-cookie'] as string | string[];
      parentCookie =
        (Array.isArray(parentCookies) ? parentCookies[0] : parentCookies) ?? '';

      // Create ADMIN user and mint valid signed JWT session cookie
      const adminUser = await authRepo.create({
        email: 'admin.sync.test@example.com',
        passwordHash: 'not-used-for-direct-jwt',
        fullName: 'Alongside Admin',
        role: Role.ADMIN,
      });
      const adminToken = app.jwt.sign({
        id: adminUser.id,
        userId: adminUser.id,
        email: adminUser.email,
        role: Role.ADMIN,
      });
      adminCookie = `alongside_session=${adminToken}`;
    });

    afterEach(async () => {
      await app.close();
    });

    it('returns 401 UNAUTHORIZED when unauthenticated or when X-Digest-Sync-Secret is invalid', async () => {
      const anonRes = await app.inject({
        method: 'POST',
        url: '/api/v1/digest/issues/sync',
        payload: { dryRun: true },
      });
      expect(anonRes.statusCode).toBe(401);
      expect(anonRes.json().error.code).toBe('UNAUTHORIZED');

      const badSecretRes = await app.inject({
        method: 'POST',
        url: '/api/v1/digest/issues/sync',
        headers: { 'x-digest-sync-secret': 'wrong-secret-value' },
        payload: { dryRun: true },
      });
      expect(badSecretRes.statusCode).toBe(401);
      expect(badSecretRes.json().error.code).toBe('UNAUTHORIZED');
    });

    it('returns 403 FORBIDDEN when called by an authenticated non-admin PARENT user', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/digest/issues/sync',
        headers: { cookie: parentCookie },
        payload: { dryRun: true },
      });

      expect(res.statusCode).toBe(403);
      expect(res.json().error.code).toBe('FORBIDDEN');
    });

    it('returns 200 OK with DigestSyncReportDTO for ADMIN JWT and persists queryable weekly edition', async () => {
      const syncRes = await app.inject({
        method: 'POST',
        url: '/api/v1/digest/issues/sync',
        headers: { cookie: adminCookie },
        payload: {
          weekStart: '2026-11-15',
          weekEnd: '2026-11-22',
        },
      });

      expect(syncRes.statusCode).toBe(200);
      const report = syncRes.json().data.report;
      expect(report.issueNumber).toBe(43);
      expect(report.persisted).toBe(true);
      expect(report.articles.persisted).toBeGreaterThanOrEqual(18);
      expect(report.videos.persisted).toBeGreaterThanOrEqual(18);
      expect(report.issue.issueNumber).toBe(43);

      // Query persisted edition via public GET route across ages 0-3 and 10-12
      const t0Res = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/issues/43?tier=${DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3}`,
      });
      expect(t0Res.statusCode).toBe(200);
      expect(t0Res.json().data.edition.phrases).toEqual([]);
      expect(t0Res.json().data.edition.articles.length).toBeGreaterThanOrEqual(3);
      expect(t0Res.json().data.edition.videos.length).toBeGreaterThanOrEqual(3);

      const t3Res = await app.inject({
        method: 'GET',
        url: `/api/v1/digest/issues/43?tier=${DevelopmentalTier.TIER_3_PRE_TEEN_10_12}`,
      });
      expect(t3Res.statusCode).toBe(200);
      expect(t3Res.json().data.edition.phrases).toHaveLength(3);
      expect(t3Res.json().data.edition.dinnerPrompts).toHaveLength(3);
    });

    it('returns 200 OK when authorized via valid constant-time X-Digest-Sync-Secret header', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/digest/issues/sync',
        headers: { 'x-digest-sync-secret': SYNC_SECRET },
        payload: {
          weekStart: '2026-11-15',
          weekEnd: '2026-11-22',
          dryRun: true,
        },
      });

      expect(res.statusCode).toBe(200);
      const report = res.json().data.report;
      expect(report.dryRun).toBe(true);
      expect(report.persisted).toBe(false);
      expect(report.perTier).toHaveLength(6);
    });

    it('returns 400 VALIDATION_ERROR for invalid sync date range or out-of-bounds fallbackLookbackDays', async () => {
      const badRange = await app.inject({
        method: 'POST',
        url: '/api/v1/digest/issues/sync',
        headers: { 'x-digest-sync-secret': SYNC_SECRET },
        payload: {
          weekStart: '2026-11-22',
          weekEnd: '2026-11-15',
        },
      });
      expect(badRange.statusCode).toBe(400);
      expect(badRange.json().error.code).toBe('VALIDATION_ERROR');

      const badLookback = await app.inject({
        method: 'POST',
        url: '/api/v1/digest/issues/sync',
        headers: { 'x-digest-sync-secret': SYNC_SECRET },
        payload: {
          fallbackLookbackDays: 60,
        },
      });
      expect(badLookback.statusCode).toBe(400);
      expect(badLookback.json().error.code).toBe('VALIDATION_ERROR');
    });

    it('returns 409 CONFLICT (SYNC_IN_PROGRESS) when a concurrent sync is already running', async () => {
      let notifyFetchStarted!: () => void;
      const fetchStarted = new Promise<void>((resolve) => {
        notifyFetchStarted = resolve;
      });
      let releaseFirstFetch!: () => void;
      const holdFirstFetch = new Promise<void>((resolve) => {
        releaseFirstFetch = resolve;
      });

      const baseBlogFetcher = new FakeBlogFeedFetcher();
      let firstCall = true;
      const lockedOrchestrator = new DigestIngestionOrchestrator({
        blogFeedFetcher: {
          async fetchCandidates(window) {
            if (firstCall) {
              firstCall = false;
              notifyFetchStarted();
              await holdFirstFetch;
            }
            return baseBlogFetcher.fetchCandidates(window);
          },
        },
        youtubeFeedFetcher: new FakeYouTubeFeedFetcher(),
        curator: new DeterministicDigestCuratorFake(),
        repository: new InMemoryDigestRepository(true),
        logger: { warn: () => {} },
      });

      const concurrentApp = await buildApp({
        logger: false,
        authRepository: authRepo,
        childrenRepository: new InMemoryChildrenRepository(),
        digestRepository: new InMemoryDigestRepository(true),
        digestIngestionOrchestrator: lockedOrchestrator,
        digestSyncSecret: SYNC_SECRET,
        jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
        cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
      });

      try {
        const firstSyncPromise = concurrentApp.inject({
          method: 'POST',
          url: '/api/v1/digest/issues/sync',
          headers: { 'x-digest-sync-secret': SYNC_SECRET },
          payload: {
            weekStart: '2026-11-15',
            weekEnd: '2026-11-22',
            dryRun: true,
          },
        });

        await fetchStarted;

        const secondSyncRes = await concurrentApp.inject({
          method: 'POST',
          url: '/api/v1/digest/issues/sync',
          headers: { 'x-digest-sync-secret': SYNC_SECRET },
          payload: {
            weekStart: '2026-11-15',
            weekEnd: '2026-11-22',
            dryRun: true,
          },
        });

        expect(secondSyncRes.statusCode).toBe(409);
        expect(secondSyncRes.json().success).toBe(false);
        expect(secondSyncRes.json().error.code).toBe('SYNC_IN_PROGRESS');

        releaseFirstFetch();
        const firstSyncRes = await firstSyncPromise;
        expect(firstSyncRes.statusCode).toBe(200);
        expect(firstSyncRes.json().success).toBe(true);
      } finally {
        releaseFirstFetch();
        await concurrentApp.close();
      }
    });

    it('rejects sync secret auth with 401 UNAUTHORIZED when DIGEST_SYNC_SECRET is unset or empty', async () => {
      const previousEnvSecret = process.env.DIGEST_SYNC_SECRET;
      delete process.env.DIGEST_SYNC_SECRET;

      const unsetSecretApp = await buildApp({
        logger: false,
        authRepository: authRepo,
        childrenRepository: new InMemoryChildrenRepository(),
        digestRepository: new InMemoryDigestRepository(true),
        digestIngestionOrchestrator: new DigestIngestionOrchestrator({
          blogFeedFetcher: new FakeBlogFeedFetcher(),
          youtubeFeedFetcher: new FakeYouTubeFeedFetcher(),
          curator: new DeterministicDigestCuratorFake(),
          repository: new InMemoryDigestRepository(true),
          logger: { warn: () => {} },
        }),
        jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
        cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
      });

      const emptySecretApp = await buildApp({
        logger: false,
        authRepository: authRepo,
        childrenRepository: new InMemoryChildrenRepository(),
        digestRepository: new InMemoryDigestRepository(true),
        digestIngestionOrchestrator: new DigestIngestionOrchestrator({
          blogFeedFetcher: new FakeBlogFeedFetcher(),
          youtubeFeedFetcher: new FakeYouTubeFeedFetcher(),
          curator: new DeterministicDigestCuratorFake(),
          repository: new InMemoryDigestRepository(true),
          logger: { warn: () => {} },
        }),
        digestSyncSecret: '',
        jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
        cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
      });

      try {
        const unsetRes = await unsetSecretApp.inject({
          method: 'POST',
          url: '/api/v1/digest/issues/sync',
          headers: { 'x-digest-sync-secret': 'some-secret-attempt' },
          payload: { dryRun: true },
        });
        expect(unsetRes.statusCode).toBe(401);
        expect(unsetRes.json().error.code).toBe('UNAUTHORIZED');

        const emptyHeaderRes = await unsetSecretApp.inject({
          method: 'POST',
          url: '/api/v1/digest/issues/sync',
          headers: { 'x-digest-sync-secret': '' },
          payload: { dryRun: true },
        });
        expect(emptyHeaderRes.statusCode).toBe(401);
        expect(emptyHeaderRes.json().error.code).toBe('UNAUTHORIZED');

        const emptyConfigRes = await emptySecretApp.inject({
          method: 'POST',
          url: '/api/v1/digest/issues/sync',
          headers: { 'x-digest-sync-secret': 'another-secret-attempt' },
          payload: { dryRun: true },
        });
        expect(emptyConfigRes.statusCode).toBe(401);
        expect(emptyConfigRes.json().error.code).toBe('UNAUTHORIZED');
      } finally {
        if (previousEnvSecret !== undefined) {
          process.env.DIGEST_SYNC_SECRET = previousEnvSecret;
        }
        await unsetSecretApp.close();
        await emptySecretApp.close();
      }
    });
  });
});
