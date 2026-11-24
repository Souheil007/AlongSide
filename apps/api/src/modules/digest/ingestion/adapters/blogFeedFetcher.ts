import { createHash } from 'node:crypto';
import { XMLParser } from 'fast-xml-parser';
import {
  CANONICAL_DIGEST_TIERS,
  DevelopmentalTier,
  stripEmDashes,
  type CanonicalDigestTier,
} from '@alongside/shared';
import {
  CURATED_BLOG_FEEDS,
  type CuratedBlogFeed,
} from '../curatedSources.js';
import {
  asArray,
  assertSafeExternalUrl,
  DEFAULT_FEED_TIMEOUT_MS,
  DEFAULT_MAX_RESPONSE_BYTES,
  fetchSafeText,
} from './safeFetch.js';

export { assertSafeExternalUrl, DEFAULT_FEED_TIMEOUT_MS };

export const MAX_RSS_EXCERPT_CHARS = 600;

export interface DigestFetchWindow {
  weekStart: Date;
  weekEnd: Date;
}

export interface RawBlogCandidate {
  feedId: string;
  sourceName: string;
  sourceDomain: string;
  authorityWeight: 1 | 2 | 3;
  defaultTiers: CanonicalDigestTier[];
  sourceUrl: string;
  canonicalHash: string;
  title: string;
  rssExcerpt: string;
  authorName: string | null;
  imageUrl: string | null;
  publishedAt: Date;
  categories: string[];
}

export interface BlogFeedFetchResult {
  candidates: RawBlogCandidate[];
  warnings: string[];
  rejectedCount: number;
}

export interface BlogFeedFetcher {
  fetchCandidates(window: DigestFetchWindow): Promise<BlogFeedFetchResult>;
}

const TRACKING_QUERY_PARAMS = new Set([
  'fbclid',
  'gclid',
  'dclid',
  'msclkid',
  'mc_cid',
  'mc_eid',
  'ref',
  'ref_src',
  'igshid',
  'yclid',
  'mkt_tok',
  'vero_id',
  'hsctatracking',
  '_hsenc',
  '_hsmi',
  'spm',
]);

const SAFE_TEXT_HTML_ENTITIES: Record<string, string> = {
  amp: '&',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '–',
  mdash: ', ',
  hellip: '…',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
};

const NAMED_HTML_ENTITIES: Record<string, string> = {
  ...SAFE_TEXT_HTML_ENTITIES,
  lt: '<',
  gt: '>',
};

const XML_PARSER = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  trimValues: true,
  parseTagValue: false,
  processEntities: true,
});

/**
 * Normalizes a safe HTTPS publisher URL by stripping tracking query parameters
 * (`utm_*`, `fbclid`, `gclid`, etc.), removing hash fragments, sorting remaining
 * query parameters, and normalizing trailing slashes.
 */
export function normalizeCanonicalUrl(rawUrl: string): string {
  const url = assertSafeExternalUrl(rawUrl);
  url.hash = '';

  const retainedParams: [string, string][] = [];
  for (const [key, value] of url.searchParams.entries()) {
    const lowerKey = key.toLowerCase();
    if (lowerKey.startsWith('utm_') || TRACKING_QUERY_PARAMS.has(lowerKey)) {
      continue;
    }
    retainedParams.push([key, value]);
  }
  retainedParams.sort(([a], [b]) => a.localeCompare(b));

  url.search = '';
  for (const [key, value] of retainedParams) {
    url.searchParams.append(key, value);
  }

  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '');
  }

  return url.toString();
}

export function computeCanonicalHash(canonicalUrl: string): string {
  return createHash('sha256')
    .update(canonicalUrl.trim().toLowerCase())
    .digest('hex');
}

function decodeHtmlEntities(input: string, safeTextOnly = false): string {
  const table = safeTextOnly ? SAFE_TEXT_HTML_ENTITIES : NAMED_HTML_ENTITIES;
  return input.replace(
    /&(#x?[0-9a-f]+|[a-z]+);/gi,
    (full, entity: string) => {
      if (entity.startsWith('#x') || entity.startsWith('#X')) {
        const code = parseInt(entity.slice(2), 16);
        if (safeTextOnly && (code === 60 || code === 62)) {
          return full;
        }
        return Number.isFinite(code) && code > 0 && code <= 0x10ffff
          ? String.fromCodePoint(code)
          : full;
      }
      if (entity.startsWith('#')) {
        const code = parseInt(entity.slice(1), 10);
        if (safeTextOnly && (code === 60 || code === 62)) {
          return full;
        }
        return Number.isFinite(code) && code > 0 && code <= 0x10ffff
          ? String.fromCodePoint(code)
          : full;
      }
      return table[entity.toLowerCase()] ?? full;
    }
  );
}

/**
 * Strips all HTML/script/style markup (including double-encoded RSS entities)
 * from RSS summaries and enforces a hard plain-text length cap (`<= 600` chars)
 * to respect publisher copyright.
 */
export function sanitizeRssExcerpt(
  rawHtml: string,
  maxChars: number = MAX_RSS_EXCERPT_CHARS
): string {
  if (!rawHtml || typeof rawHtml !== 'string') {
    return '';
  }

  const effectiveMax = Math.min(Math.max(1, maxChars), MAX_RSS_EXCERPT_CHARS);

  // Decode up to 2 passes before tag stripping so single- and double-encoded HTML tags are removed cleanly
  let decoded = rawHtml;
  for (let pass = 0; pass < 2; pass += 1) {
    const next = decodeHtmlEntities(decoded, false);
    if (next === decoded) break;
    decoded = next;
  }

  const stripped = decoded
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

  const plain = stripEmDashes(decodeHtmlEntities(stripped, true))
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= effectiveMax) {
    return plain;
  }

  const slice = plain.slice(0, effectiveMax - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const clipped =
    lastSpace > Math.floor(effectiveMax * 0.65)
      ? slice.slice(0, lastSpace)
      : slice;
  return `${clipped.trimEnd()}…`;
}

function extractText(node: unknown): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (node && typeof node === 'object') {
    const obj = node as Record<string, unknown>;
    if (typeof obj['#text'] === 'string') return obj['#text'];
    if (typeof obj['__cdata'] === 'string') return obj['__cdata'];
  }
  return '';
}

function extractAtomLink(linkNode: unknown): string {
  const links = asArray(linkNode);
  for (const link of links) {
    if (typeof link === 'string' && link.trim()) {
      return link.trim();
    }
    if (link && typeof link === 'object') {
      const rec = link as Record<string, unknown>;
      const rel = String(rec['@_rel'] ?? 'alternate').toLowerCase();
      const href = rec['@_href'];
      if (rel === 'alternate' && typeof href === 'string' && href.trim()) {
        return href.trim();
      }
    }
  }
  for (const link of links) {
    if (link && typeof link === 'object') {
      const href = (link as Record<string, unknown>)['@_href'];
      if (typeof href === 'string' && href.trim()) {
        return href.trim();
      }
    }
  }
  return '';
}

function extractImageUrl(item: Record<string, unknown>): string | null {
  const candidates: string[] = [];

  for (const thumb of asArray(item['media:thumbnail'])) {
    if (thumb && typeof thumb === 'object') {
      const url = (thumb as Record<string, unknown>)['@_url'];
      if (typeof url === 'string') candidates.push(url);
    }
  }

  for (const media of asArray(item['media:content'])) {
    if (media && typeof media === 'object') {
      const rec = media as Record<string, unknown>;
      const url = rec['@_url'];
      const medium = String(rec['@_medium'] ?? '').toLowerCase();
      const type = String(rec['@_type'] ?? '').toLowerCase();
      if (
        typeof url === 'string' &&
        (medium === 'image' || type.startsWith('image/') || !medium)
      ) {
        candidates.push(url);
      }
    }
  }

  for (const enc of asArray(item.enclosure)) {
    if (enc && typeof enc === 'object') {
      const rec = enc as Record<string, unknown>;
      const url = rec['@_url'];
      const type = String(rec['@_type'] ?? '').toLowerCase();
      if (typeof url === 'string' && type.startsWith('image/')) {
        candidates.push(url);
      }
    }
  }

  for (const candidate of candidates) {
    try {
      return assertSafeExternalUrl(candidate).toString();
    } catch {
      // Ignore unsafe image URLs
    }
  }

  return null;
}

function extractCategories(item: Record<string, unknown>): string[] {
  const rawCategories = asArray(item.category);
  const categories: string[] = [];
  for (const cat of rawCategories) {
    if (typeof cat === 'string' && cat.trim()) {
      categories.push(cat.trim());
    } else if (cat && typeof cat === 'object') {
      const rec = cat as Record<string, unknown>;
      const label =
        (typeof rec['@_term'] === 'string' && rec['@_term']) ||
        (typeof rec['@_label'] === 'string' && rec['@_label']) ||
        extractText(rec);
      if (label.trim()) {
        categories.push(label.trim());
      }
    }
  }
  return categories;
}

function parsePublishedDate(rawDate: string): Date | null {
  if (!rawDate || !rawDate.trim()) {
    return null;
  }
  const parsed = new Date(rawDate.trim());
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
}

/**
 * Pure RSS 2.0 / Atom 1.0 XML parser with strict `[weekStart, weekEnd]` window
 * enforcement, HTTPS SSRF filtering, canonical URL normalization, and 600-char
 * plain-text excerpt capping.
 */
export function parseBlogFeedXml(
  xmlText: string,
  feed: CuratedBlogFeed,
  window: DigestFetchWindow
): { candidates: RawBlogCandidate[]; rejectedCount: number } {
  const parsed = XML_PARSER.parse(xmlText) as Record<string, unknown>;
  const candidates: RawBlogCandidate[] = [];
  let rejectedCount = 0;

  const rssChannel = (parsed.rss as Record<string, unknown> | undefined)
    ?.channel as Record<string, unknown> | undefined;
  const rdfRoot = parsed['rdf:RDF'] as Record<string, unknown> | undefined;
  const atomFeed = parsed.feed as Record<string, unknown> | undefined;

  const rawItems: Array<{ node: Record<string, unknown>; format: 'rss' | 'atom' }> =
    [];

  if (rssChannel?.item !== undefined) {
    for (const item of asArray(rssChannel.item)) {
      if (item && typeof item === 'object') {
        rawItems.push({ node: item as Record<string, unknown>, format: 'rss' });
      }
    }
  } else if (rdfRoot?.item !== undefined) {
    for (const item of asArray(rdfRoot.item)) {
      if (item && typeof item === 'object') {
        rawItems.push({ node: item as Record<string, unknown>, format: 'rss' });
      }
    }
  } else if (atomFeed?.entry !== undefined) {
    for (const entry of asArray(atomFeed.entry)) {
      if (entry && typeof entry === 'object') {
        rawItems.push({ node: entry as Record<string, unknown>, format: 'atom' });
      }
    }
  }

  for (const { node, format } of rawItems) {
    const title = sanitizeRssExcerpt(extractText(node.title), 220);
    const rawLink =
      format === 'atom'
        ? extractAtomLink(node.link)
        : extractText(node.link) || extractAtomLink(node.link);

    const rawDate =
      format === 'atom'
        ? extractText(node.published) || extractText(node.updated)
        : extractText(node.pubDate) ||
          extractText(node['dc:date']) ||
          extractText(node.published) ||
          extractText(node.updated);

    const publishedAt = parsePublishedDate(rawDate);
    if (!title || !rawLink || !publishedAt) {
      rejectedCount += 1;
      continue;
    }

    // Strict [weekStart, weekEnd] publication window filter
    if (
      publishedAt.getTime() < window.weekStart.getTime() ||
      publishedAt.getTime() > window.weekEnd.getTime()
    ) {
      continue;
    }

    let sourceUrl: string;
    try {
      sourceUrl = normalizeCanonicalUrl(rawLink);
    } catch {
      rejectedCount += 1;
      continue;
    }

    const rawSummary =
      format === 'atom'
        ? extractText(node.summary) || extractText(node.content)
        : extractText(node.description) ||
          extractText(node['itunes:summary']) ||
          extractText(node['content:encoded']);

    const rssExcerpt = sanitizeRssExcerpt(rawSummary, MAX_RSS_EXCERPT_CHARS);

    const rawAuthor =
      format === 'atom'
        ? extractText((node.author as Record<string, unknown> | undefined)?.name) ||
          extractText(node.author)
        : extractText(node['dc:creator']) ||
          extractText(node.author) ||
          extractText(node['itunes:author']);
    const authorName = rawAuthor ? sanitizeRssExcerpt(rawAuthor, 120) : null;

    let sourceDomain = feed.sourceDomain;
    try {
      sourceDomain = new URL(sourceUrl).hostname.replace(/^www\./, '');
    } catch {
      // Keep allowlist domain fallback
    }

    candidates.push({
      feedId: feed.id,
      sourceName: feed.sourceName,
      sourceDomain,
      authorityWeight: feed.authorityWeight,
      defaultTiers: [...feed.defaultTiers],
      sourceUrl,
      canonicalHash: computeCanonicalHash(sourceUrl),
      title,
      rssExcerpt: rssExcerpt || title,
      authorName,
      imageUrl: extractImageUrl(node),
      publishedAt,
      categories: extractCategories(node),
    });
  }

  return { candidates, rejectedCount };
}

export interface RssBlogFeedAdapterOptions {
  feeds?: readonly CuratedBlogFeed[];
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  userAgent?: string;
}

/**
 * Production RSS 2.0 / Atom 1.0 blog feed ingestion adapter.
 * Concurrently fetches enabled curated feeds with SSRF checks and 8s timeouts.
 * Never scrapes full external HTML article bodies.
 */
export class RssBlogFeedAdapter implements BlogFeedFetcher {
  private readonly feeds: readonly CuratedBlogFeed[];
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;
  private readonly userAgent: string;

  constructor(opts: RssBlogFeedAdapterOptions = {}) {
    this.feeds = opts.feeds ?? CURATED_BLOG_FEEDS;
    this.fetchImpl = opts.fetchImpl ?? globalThis.fetch;
    this.timeoutMs = opts.timeoutMs ?? DEFAULT_FEED_TIMEOUT_MS;
    this.userAgent =
      opts.userAgent ?? 'AlongsideDigestBot/1.0 (+https://alongside.app)';
  }

  async fetchCandidates(window: DigestFetchWindow): Promise<BlogFeedFetchResult> {
    const enabledFeeds = this.feeds.filter((feed) => feed.enabled !== false);
    const warnings: string[] = [];
    const candidates: RawBlogCandidate[] = [];
    let rejectedCount = 0;

    const settled = await Promise.allSettled(
      enabledFeeds.map(async (feed) => {
        const xmlText = await fetchSafeText(feed.feedUrl, {
          timeoutMs: this.timeoutMs,
          maxBytes: DEFAULT_MAX_RESPONSE_BYTES,
          fetchImpl: this.fetchImpl,
          headers: {
            Accept:
              'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9',
            'User-Agent': this.userAgent,
          },
        });

        if (
          !xmlText.trimStart().startsWith('<') ||
          (!xmlText.includes('<rss') &&
            !xmlText.includes('<feed') &&
            !xmlText.includes('<rdf:RDF'))
        ) {
          throw new Error('Response body is not valid RSS/Atom XML.');
        }

        return parseBlogFeedXml(xmlText, feed, window);
      })
    );

    settled.forEach((result, index) => {
      const feed = enabledFeeds[index]!;
      if (result.status === 'fulfilled') {
        candidates.push(...result.value.candidates);
        rejectedCount += result.value.rejectedCount;
      } else {
        const reason =
          result.reason instanceof Error
            ? result.reason.message
            : String(result.reason);
        warnings.push(`Blog feed '${feed.sourceName}' (${feed.id}) failed: ${reason}`);
      }
    });

    return { candidates, warnings, rejectedCount };
  }
}

// ----------------------------------------------------
// DETERMINISTIC IN-MEMORY TEST FAKE ADAPTER
// ----------------------------------------------------

export interface FakeBlogFeedFetcherOptions {
  candidates?: RawBlogCandidate[];
  warnings?: string[];
  rejectedCount?: number;
}

function buildDefaultFakeBlogCandidates(anchorEnd: Date): RawBlogCandidate[] {
  const endMs = anchorEnd.getTime();
  const hoursAgo = (h: number) => new Date(endMs - h * 60 * 60 * 1000);
  const daysAgo = (d: number) => new Date(endMs - d * 24 * 60 * 60 * 1000);

  const tierSeeds: Array<{
    tier: CanonicalDigestTier;
    slug: string;
    sourceName: string;
    sourceDomain: string;
    titles: [string, string, string, string];
    excerpts: [string, string, string, string];
  }> = [
    {
      tier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
      slug: 't0',
      sourceName: 'ZERO TO THREE',
      sourceDomain: 'zerotothree.org',
      titles: [
        'Why 18-Month Sleep Transitions Reset Faster With Predictable Floor Play',
        'Co-Regulation Cues That Calm Big Toddler Meltdowns Without Bribes',
        'Serve-and-Return Vocal Routines During Everyday Diaper & Meal Transitions',
        'Building Independent Play Pockets for Two-Year-Olds in Ten Minutes',
      ],
      excerpts: [
        'Pediatric sleep researchers explain how consistent daytime sensory play lowers cortisol ahead of bedtime routines for infants and toddlers.',
        'When toddlers flip their emotional lid, kneeling to eye level and naming the feeling helps immature prefrontal circuits settle.',
        'Back-and-forth babble and warm narration during ordinary caregiving moments build language architecture without flashcards.',
        'Short invitation-to-play baskets with two open-ended objects strengthen sustained toddler focus naturally.',
      ],
    },
    {
      tier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
      slug: 't1',
      sourceName: 'Harvard Center on the Developing Child',
      sourceDomain: 'developingchild.harvard.edu',
      titles: [
        'Preschool Executive Function Grows Through Imaginative Role Play',
        'Handling After-School Restraint Collapse in Kindergartners Calmly',
        'Simple Visual Bedtime Charts That Reduce Four-Year-Old Power Struggles',
        'How Shared Picture Books Build Early Theory of Mind and Empathy',
      ],
      excerpts: [
        'Pretend scenarios require four- to six-year-olds to hold rules in working memory and practice impulse control joyfully.',
        'Holding it together all day at preschool drains emotional glucose; quiet snack decompression prevents evening meltdowns.',
        'Letting the routine chart be the neutral authority removes nightly parent-child friction over brushing teeth and lights out.',
        'Pausing to ask what a storybook character might feel strengthens perspective-taking before elementary school.',
      ],
    },
    {
      tier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
      slug: 't2',
      sourceName: 'Child Mind Institute',
      sourceDomain: 'childmind.org',
      titles: [
        'Helping Eight-Year-Olds Navigate First Friendship Shifts at Recess',
        'Why Short Visual Timers Ease Homework Transitions for Elementary Kids',
        'Co-Playing Minecraft & Roblox Together Before Independent Gaming',
        'Supporting Sensitive Nine-Year-Olds Through Worrying News Clips',
      ],
      excerpts: [
        'Third-grade social hierarchies introduce new comparison stress; curious open-ended questions keep parents in the loop.',
        'Externalizing time visually reduces working-memory overload when transitioning from afternoon play to reading practice.',
        'Sitting beside kids in sandbox games turns screens into shared conversation rather than isolated conflict.',
        'Checking what a child actually heard before offering calm facts prevents secondhand anxiety from spiraling.',
      ],
    },
    {
      tier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
      slug: 't3',
      sourceName: 'Common Sense Media',
      sourceDomain: 'commonsensemedia.org',
      titles: [
        'Middle School Group Chats: Setting Calm Family Norms Before Friction Starts',
        'First-Phone Readiness Checkpoints Pediatricians Look For Beyond Age',
        'Why Tweens Crave Peer Belonging More Than Parental Approval at Age Eleven',
        'Helping Pre-Teens Spot Algorithmic Loops in Short-Form Video Feeds',
      ],
      excerpts: [
        'Group chat notifications accelerate social misunderstandings; co-written pause rules protect sleep and friendships.',
        'Impulse pauses, repair after mistakes, and device-free bedrooms predict healthier smartphone habits better than chronological age.',
        'Adrenarche heightens social sensitivity; warm curiosity keeps tweens talking when peer dynamics get bumpy.',
        'Teaching eleven-year-olds how recommendation feeds optimize watch time builds agency without lecturing.',
      ],
    },
    {
      tier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
      slug: 't4',
      sourceName: 'Greater Good Magazine',
      sourceDomain: 'greatergood.berkeley.edu',
      titles: [
        'Teen Circadian Phase Delay: Protecting Sleep Without Nightly Phone Battles',
        'Side-by-Side Car Conversations That Unlock Quiet Fourteen-Year-Olds',
        'Navigating Gaming Voice Chats and Late-Night Discord Boundaries Collaboratively',
        'Why Adolescents Push Back Hardest Right Before Seeking Connection',
      ],
      excerpts: [
        'Pubertal melatonin shifts delay natural sleep onset; neutral household charging stations keep rest consistent without policing.',
        'Removing direct eye contact during drives lowers amygdala defensiveness and opens honest conversations about school stress.',
        'Co-negotiating clear evening wind-down times preserves friendship time while safeguarding next-morning mood.',
        'Distinguishing healthy autonomy-seeking from disrespect helps parents stay steady anchors during early adolescence.',
      ],
    },
    {
      tier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
      slug: 't5',
      sourceName: 'HealthyChildren.org (AAP)',
      sourceDomain: 'healthychildren.org',
      titles: [
        'Coaching Sixteen-Year-Olds on Healthy AI Study Habits and Academic Integrity',
        'Supporting High Schoolers Through Perfectionism and College-Prep Burnout',
        'Transitioning From Parent Guardrails to Self-Directed Digital Autonomy',
        'Late-Adolescent Driving, Sleep Debt, and Real-World Risk Judgment',
      ],
      excerpts: [
        'Treating AI tools as brainstorming tutors rather than shortcut writers preserves critical thinking for college and work.',
        'Naming effort and restorative sleep over constant output helps older teens recalibrate sustainable ambition.',
        'Gradually handing over schedule ownership while maintaining weekly family check-ins prepares teens for independent living.',
        'Consistent sleep schedules remain the highest-leverage safety factor for teen drivers and emotional regulation.',
      ],
    },
  ];

  const items: RawBlogCandidate[] = [];
  for (const seed of tierSeeds) {
    seed.titles.forEach((title, idx) => {
      const sourceUrl = normalizeCanonicalUrl(
        `https://${seed.sourceDomain}/articles/${seed.slug}-${idx + 1}?utm_source=weekly_rss`
      );
      items.push({
        feedId: `fake-${seed.slug}`,
        sourceName: seed.sourceName,
        sourceDomain: seed.sourceDomain,
        authorityWeight: idx === 0 ? 3 : 2,
        defaultTiers: [seed.tier],
        sourceUrl,
        canonicalHash: computeCanonicalHash(sourceUrl),
        title,
        rssExcerpt: sanitizeRssExcerpt(seed.excerpts[idx]!, MAX_RSS_EXCERPT_CHARS),
        authorName: `${seed.sourceName} Editorial Team`,
        imageUrl: null,
        publishedAt: hoursAgo(12 + idx * 24),
        categories: ['Parenting', 'Child Development'],
      });
    });
  }

  // Explicit out-of-window fixture (10 days before window end -> outside strict 7-day window)
  const olderUrl = normalizeCanonicalUrl(
    'https://childmind.org/articles/older-lookback-candidate'
  );
  items.push({
    feedId: 'fake-lookback',
    sourceName: 'Child Mind Institute',
    sourceDomain: 'childmind.org',
    authorityWeight: 3,
    defaultTiers: [...CANONICAL_DIGEST_TIERS],
    sourceUrl: olderUrl,
    canonicalHash: computeCanonicalHash(olderUrl),
    title: 'Earlier Week Evidence Review on Family Evening Rhythms',
    rssExcerpt:
      'Published ten days prior to edition close to exercise strict window filtering and selective sparse-tier lookback.',
    authorName: 'Child Mind Institute',
    imageUrl: null,
    publishedAt: daysAgo(10),
    categories: ['Routines'],
  });

  return items;
}

export class FakeBlogFeedFetcher implements BlogFeedFetcher {
  private readonly customCandidates?: RawBlogCandidate[];
  private readonly warnings: string[];
  private readonly rejectedCount: number;

  constructor(opts: FakeBlogFeedFetcherOptions = {}) {
    this.customCandidates = opts.candidates;
    this.warnings = opts.warnings ?? [];
    this.rejectedCount = opts.rejectedCount ?? 0;
  }

  async fetchCandidates(window: DigestFetchWindow): Promise<BlogFeedFetchResult> {
    const sourcePool =
      this.customCandidates ?? buildDefaultFakeBlogCandidates(window.weekEnd);

    const filtered: RawBlogCandidate[] = [];
    let rejectedCount = this.rejectedCount;

    for (const candidate of sourcePool) {
      if (
        candidate.publishedAt.getTime() < window.weekStart.getTime() ||
        candidate.publishedAt.getTime() > window.weekEnd.getTime()
      ) {
        continue;
      }

      try {
        const normalizedUrl = normalizeCanonicalUrl(candidate.sourceUrl);
        filtered.push({
          ...candidate,
          sourceUrl: normalizedUrl,
          canonicalHash: computeCanonicalHash(normalizedUrl),
          rssExcerpt: sanitizeRssExcerpt(
            candidate.rssExcerpt,
            MAX_RSS_EXCERPT_CHARS
          ),
        });
      } catch {
        rejectedCount += 1;
      }
    }

    return {
      candidates: filtered,
      warnings: [...this.warnings],
      rejectedCount,
    };
  }
}
