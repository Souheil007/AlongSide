import { XMLParser } from 'fast-xml-parser';
import {
  CANONICAL_DIGEST_TIERS,
  DevelopmentalTier,
  parseYouTubeDescriptionChapters,
  type CanonicalDigestTier,
  type VideoJumpChip,
} from '@alongside/shared';
import {
  buildYouTubeChannelFeedUrl,
  CURATED_YOUTUBE_CHANNELS,
  TIER_FALLBACK_SEARCH_QUERIES,
  type CuratedYouTubeChannel,
} from '../curatedSources.js';
import type { DigestFetchWindow } from './blogFeedFetcher.js';
import {
  asArray,
  DEFAULT_FEED_TIMEOUT_MS,
  DEFAULT_MAX_RESPONSE_BYTES,
  fetchSafeText,
  SafeFetchHttpError,
} from './safeFetch.js';

export const MIN_VIDEO_DURATION_SECONDS = 90;
const YOUTUBE_VIDEO_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;
const ISO_8601_DURATION_REGEX =
  /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
const DEFAULT_OEMBED_DURATION_SECONDS = 600;
const MAX_OEMBED_CANDIDATES_PER_RUN = 48;
const OEMBED_CONCURRENCY = 8;

export interface RawVideoCandidate {
  youtubeVideoId: string;
  videoUrl: string;
  title: string;
  presenter: string;
  channelName: string;
  channelId: string | null;
  publishedAt: Date;
  durationSeconds: number;
  durationMinutes: number;
  description: string;
  jumpChips: VideoJumpChip[];
  defaultTiers: CanonicalDigestTier[];
  topicHint: string;
  isEmbeddable: boolean;
  privacyStatus: 'public' | 'unlisted' | 'private';
}

export interface YouTubeFeedFetchOptions {
  minPerTier?: number;
  sparseTiers?: readonly CanonicalDigestTier[];
}

export interface YouTubeFeedFetchResult {
  candidates: RawVideoCandidate[];
  warnings: string[];
  rejectedCount: number;
}

export interface YouTubeFeedFetcher {
  fetchFreshVideos(
    window: DigestFetchWindow,
    opts?: YouTubeFeedFetchOptions
  ): Promise<YouTubeFeedFetchResult>;
}

const ATOM_XML_PARSER = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  trimValues: true,
  parseTagValue: false,
  processEntities: true,
});

/**
 * Parses YouTube ISO-8601 duration strings (e.g. `PT14M22S`, `PT1H2M5S`, `PT45S`)
 * into whole seconds. Returns `null` for invalid or zero-duration values (e.g. `P0D`).
 */
export function parseIso8601DurationSeconds(isoDuration: string): number | null {
  if (!isoDuration || typeof isoDuration !== 'string') {
    return null;
  }
  const match = ISO_8601_DURATION_REGEX.exec(isoDuration.trim());
  if (!match) {
    return null;
  }
  const days = match[1] ? Number(match[1]) : 0;
  const hours = match[2] ? Number(match[2]) : 0;
  const minutes = match[3] ? Number(match[3]) : 0;
  const seconds = match[4] ? Number(match[4]) : 0;

  const total = days * 86_400 + hours * 3_600 + minutes * 60 + seconds;
  return total > 0 ? total : null;
}

function extractString(node: unknown): string {
  if (typeof node === 'string') return node.trim();
  if (typeof node === 'number') return String(node);
  if (node && typeof node === 'object') {
    const rec = node as Record<string, unknown>;
    if (typeof rec['#text'] === 'string') return rec['#text'].trim();
  }
  return '';
}

function extractAtomLinkHref(linkNode: unknown): string {
  for (const link of asArray(linkNode)) {
    if (link && typeof link === 'object') {
      const href = (link as Record<string, unknown>)['@_href'];
      if (typeof href === 'string' && href.trim()) {
        return href.trim();
      }
    }
  }
  return '';
}

function looksLikeShort(title: string, linkHref: string, description: string): boolean {
  if (/\/shorts\//i.test(linkHref)) {
    return true;
  }
  if (/(^|\s)#shorts?\b/i.test(title) || /(^|\s)#shorts?\b/i.test(description)) {
    return true;
  }
  return false;
}

interface DiscoveredAtomVideo {
  youtubeVideoId: string;
  videoUrl: string;
  title: string;
  presenter: string;
  channelName: string;
  channelId: string | null;
  publishedAt: Date;
  description: string;
  defaultTiers: CanonicalDigestTier[];
  topicHint: string;
}

/**
 * Pure parser for YouTube public channel Atom feeds (`videos.xml?channel_id=...`).
 * Filters strictly to `[window.weekStart, window.weekEnd]` and rejects obvious Shorts.
 */
export function parseYouTubeAtomFeedXml(
  xmlText: string,
  channel: CuratedYouTubeChannel,
  window: DigestFetchWindow
): { discovered: DiscoveredAtomVideo[]; rejectedCount: number } {
  const parsed = ATOM_XML_PARSER.parse(xmlText) as Record<string, unknown>;
  const feed = parsed.feed as Record<string, unknown> | undefined;
  const entries = asArray(feed?.entry);

  const discovered: DiscoveredAtomVideo[] = [];
  let rejectedCount = 0;

  for (const entry of entries) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    const rec = entry as Record<string, unknown>;
    const rawVideoId =
      extractString(rec['yt:videoId']) ||
      extractString(rec.id).replace(/^yt:video:/, '');
    const title = extractString(rec.title);
    const publishedRaw = extractString(rec.published);
    const linkHref = extractAtomLinkHref(rec.link);

    if (!YOUTUBE_VIDEO_ID_REGEX.test(rawVideoId) || !title || !publishedRaw) {
      rejectedCount += 1;
      continue;
    }

    const publishedAt = new Date(publishedRaw);
    if (Number.isNaN(publishedAt.getTime())) {
      rejectedCount += 1;
      continue;
    }

    if (
      publishedAt.getTime() < window.weekStart.getTime() ||
      publishedAt.getTime() > window.weekEnd.getTime()
    ) {
      continue;
    }

    const mediaGroup = rec['media:group'] as Record<string, unknown> | undefined;
    const description = extractString(mediaGroup?.['media:description']);

    if (looksLikeShort(title, linkHref, description)) {
      rejectedCount += 1;
      continue;
    }

    const authorObj = rec.author as Record<string, unknown> | undefined;
    const channelName = extractString(authorObj?.name) || channel.channelName;

    discovered.push({
      youtubeVideoId: rawVideoId,
      videoUrl: `https://www.youtube.com/watch?v=${rawVideoId}`,
      title,
      presenter: channel.defaultPresenter,
      channelName,
      channelId: channel.channelId,
      publishedAt,
      description,
      defaultTiers: [...channel.defaultTiers],
      topicHint: channel.topicHint,
    });
  }

  return { discovered, rejectedCount };
}

function isUsableApiKey(rawKey?: string): boolean {
  if (!rawKey) return false;
  const trimmed = rawKey.trim();
  if (!trimmed || trimmed.length < 10) return false;
  if (/placeholder|your_.*_key|changeme/i.test(trimmed)) return false;
  return true;
}

export interface YouTubeWeeklyFeedAdapterOptions {
  channels?: readonly CuratedYouTubeChannel[];
  apiKey?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  fallbackSearchQueries?: Record<CanonicalDigestTier, readonly string[]>;
  userAgent?: string;
}

/**
 * Production YouTube weekly discovery & verification adapter.
 * - Primary: Zero-quota official channel Atom feeds (`videos.xml?channel_id=...`).
 * - Optional: YouTube Data API v3 `search.list` ONLY when `YOUTUBE_API_KEY` is set
 *   and a developmental tier has fewer than `minPerTier` candidates.
 * - Mandatory verification: Batched `videos.list` (embeddable + public + duration >= 90s)
 *   when `YOUTUBE_API_KEY` is set, OR YouTube oEmbed HTTP 200 verification when omitted.
 * - Zero fabricated timestamps: parses ONLY real chapters via `parseYouTubeDescriptionChapters()`.
 */
export class YouTubeWeeklyFeedAdapter implements YouTubeFeedFetcher {
  private readonly channels: readonly CuratedYouTubeChannel[];
  private readonly apiKey: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;
  private readonly fallbackSearchQueries: Record<
    CanonicalDigestTier,
    readonly string[]
  >;
  private readonly userAgent: string;

  constructor(opts: YouTubeWeeklyFeedAdapterOptions = {}) {
    this.channels = opts.channels ?? CURATED_YOUTUBE_CHANNELS;
    const rawKey = opts.apiKey ?? process.env.YOUTUBE_API_KEY ?? '';
    this.apiKey = isUsableApiKey(rawKey) ? rawKey.trim() : '';
    this.fetchImpl = opts.fetchImpl ?? globalThis.fetch;
    this.timeoutMs = opts.timeoutMs ?? DEFAULT_FEED_TIMEOUT_MS;
    this.fallbackSearchQueries =
      opts.fallbackSearchQueries ?? TIER_FALLBACK_SEARCH_QUERIES;
    this.userAgent =
      opts.userAgent ?? 'AlongsideDigestBot/1.0 (+https://alongside.app)';
  }

  async fetchFreshVideos(
    window: DigestFetchWindow,
    opts: YouTubeFeedFetchOptions = {}
  ): Promise<YouTubeFeedFetchResult> {
    const enabledChannels = this.channels.filter((c) => c.enabled !== false);
    const minPerTier = opts.minPerTier ?? 3;
    const warnings: string[] = [];
    let rejectedCount = 0;

    // Step A: Concurrent zero-quota curated channel Atom discovery
    const discoveredById = new Map<string, DiscoveredAtomVideo>();

    const settled = await Promise.allSettled(
      enabledChannels.map(async (channel) => {
        const xmlText = await fetchSafeText(
          buildYouTubeChannelFeedUrl(channel.channelId),
          {
            timeoutMs: this.timeoutMs,
            maxBytes: DEFAULT_MAX_RESPONSE_BYTES,
            fetchImpl: this.fetchImpl,
            headers: {
              Accept: 'application/atom+xml, application/xml, text/xml;q=0.9',
              'User-Agent': this.userAgent,
            },
          }
        );

        return parseYouTubeAtomFeedXml(xmlText, channel, window);
      })
    );

    settled.forEach((result, idx) => {
      const channel = enabledChannels[idx]!;
      if (result.status === 'fulfilled') {
        rejectedCount += result.value.rejectedCount;
        for (const item of result.value.discovered) {
          this.mergeDiscovered(discoveredById, item);
        }
      } else {
        const reason =
          result.reason instanceof Error
            ? result.reason.message
            : String(result.reason);
        warnings.push(
          `YouTube Atom feed '${channel.channelName}' (${channel.channelId}) failed: ${reason}`
        );
      }
    });

    // Step B: Optional supplemental discovery via YouTube Data API v3 search.list
    if (this.apiKey) {
      const targetTiers = opts.sparseTiers ?? CANONICAL_DIGEST_TIERS;
      const sparseTiers = targetTiers.filter((tier) => {
        let count = 0;
        for (const item of discoveredById.values()) {
          if (item.defaultTiers.includes(tier)) {
            count += 1;
          }
        }
        return count < minPerTier;
      });

      if (sparseTiers.length > 0) {
        const searchResults = await Promise.allSettled(
          sparseTiers.map(async (tier) => {
            const query = this.fallbackSearchQueries[tier]?.[0];
            if (!query) return [];
            return this.searchTierVideos(tier, query, window);
          })
        );

        searchResults.forEach((res, idx) => {
          const tier = sparseTiers[idx]!;
          if (res.status === 'fulfilled') {
            for (const item of res.value) {
              this.mergeDiscovered(discoveredById, item);
            }
          } else {
            const reason =
              res.reason instanceof Error
                ? res.reason.message
                : String(res.reason);
            warnings.push(
              `YouTube search fallback for tier '${tier}' failed: ${reason}`
            );
          }
        });
      }
    }

    const discoveredList = Array.from(discoveredById.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );

    if (discoveredList.length === 0) {
      return { candidates: [], warnings, rejectedCount };
    }

    // Step C: Mandatory Verification & Metadata Enrichment
    if (this.apiKey) {
      const verified = await this.verifyWithDataApi(discoveredList, warnings);
      return {
        candidates: verified.candidates,
        warnings,
        rejectedCount: rejectedCount + verified.rejectedCount,
      };
    }

    const verifiedOembed = await this.verifyWithOembed(
      this.selectStratifiedPool(discoveredList, MAX_OEMBED_CANDIDATES_PER_RUN),
      warnings
    );
    return {
      candidates: verifiedOembed.candidates,
      warnings,
      rejectedCount: rejectedCount + verifiedOembed.rejectedCount,
    };
  }

  private mergeDiscovered(
    map: Map<string, DiscoveredAtomVideo>,
    item: DiscoveredAtomVideo
  ): void {
    const existing = map.get(item.youtubeVideoId);
    if (!existing) {
      map.set(item.youtubeVideoId, item);
      return;
    }
    const mergedTiers = new Set<CanonicalDigestTier>([
      ...existing.defaultTiers,
      ...item.defaultTiers,
    ]);
    existing.defaultTiers = Array.from(mergedTiers);
  }

  private selectStratifiedPool(
    discovered: DiscoveredAtomVideo[],
    maxTotal: number
  ): DiscoveredAtomVideo[] {
    if (discovered.length <= maxTotal) {
      return discovered;
    }
    const selected = new Map<string, DiscoveredAtomVideo>();
    const perTierQuota = Math.max(4, Math.floor(maxTotal / CANONICAL_DIGEST_TIERS.length));

    for (const tier of CANONICAL_DIGEST_TIERS) {
      let added = 0;
      for (const item of discovered) {
        if (added >= perTierQuota) break;
        if (item.defaultTiers.includes(tier) && !selected.has(item.youtubeVideoId)) {
          selected.set(item.youtubeVideoId, item);
          added += 1;
        }
      }
    }

    for (const item of discovered) {
      if (selected.size >= maxTotal) break;
      if (!selected.has(item.youtubeVideoId)) {
        selected.set(item.youtubeVideoId, item);
      }
    }

    return Array.from(selected.values());
  }

  private async searchTierVideos(
    tier: CanonicalDigestTier,
    query: string,
    window: DigestFetchWindow
  ): Promise<DiscoveredAtomVideo[]> {
    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      videoEmbeddable: 'true',
      safeSearch: 'strict',
      relevanceLanguage: 'en',
      publishedAfter: window.weekStart.toISOString(),
      publishedBefore: window.weekEnd.toISOString(),
      order: 'relevance',
      maxResults: '8',
      q: query,
      key: this.apiKey,
    });
    const bodyText = await fetchSafeText(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
      {
        timeoutMs: this.timeoutMs,
        maxBytes: DEFAULT_MAX_RESPONSE_BYTES,
        fetchImpl: this.fetchImpl,
        headers: { Accept: 'application/json', 'User-Agent': this.userAgent },
      }
    );

    const payload = JSON.parse(bodyText) as {
      items?: Array<{
        id?: { videoId?: string };
        snippet?: {
          title?: string;
          description?: string;
          channelTitle?: string;
          channelId?: string;
          publishedAt?: string;
        };
      }>;
    };

    const results: DiscoveredAtomVideo[] = [];
    for (const item of payload.items ?? []) {
      const videoId = item.id?.videoId;
      const snippet = item.snippet;
      if (!videoId || !YOUTUBE_VIDEO_ID_REGEX.test(videoId) || !snippet?.title) {
        continue;
      }
      const publishedAt = snippet.publishedAt
        ? new Date(snippet.publishedAt)
        : null;
      if (
        !publishedAt ||
        Number.isNaN(publishedAt.getTime()) ||
        publishedAt.getTime() < window.weekStart.getTime() ||
        publishedAt.getTime() > window.weekEnd.getTime()
      ) {
        continue;
      }

      results.push({
        youtubeVideoId: videoId,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        title: snippet.title.trim(),
        presenter: snippet.channelTitle?.trim() || 'Pediatric Educator',
        channelName: snippet.channelTitle?.trim() || 'YouTube Educator',
        channelId: snippet.channelId ?? null,
        publishedAt,
        description: snippet.description ?? '',
        defaultTiers: [tier],
        topicHint: 'Family Communication',
      });
    }

    return results;
  }

  private async verifyWithDataApi(
    discovered: DiscoveredAtomVideo[],
    warnings: string[]
  ): Promise<{ candidates: RawVideoCandidate[]; rejectedCount: number }> {
    const byId = new Map(discovered.map((d) => [d.youtubeVideoId, d]));
    const ids = Array.from(byId.keys());
    const candidates: RawVideoCandidate[] = [];
    let rejectedCount = 0;

    for (let i = 0; i < ids.length; i += 50) {
      const chunk = ids.slice(i, i + 50);
      const params = new URLSearchParams({
        part: 'contentDetails,status,snippet',
        id: chunk.join(','),
        key: this.apiKey,
      });
      try {
        const bodyText = await fetchSafeText(
          `https://www.googleapis.com/youtube/v3/videos?${params.toString()}`,
          {
            timeoutMs: this.timeoutMs,
            maxBytes: DEFAULT_MAX_RESPONSE_BYTES,
            fetchImpl: this.fetchImpl,
            headers: { Accept: 'application/json', 'User-Agent': this.userAgent },
          }
        );

        const payload = JSON.parse(bodyText) as {
          items?: Array<{
            id?: string;
            contentDetails?: { duration?: string };
            status?: { embeddable?: boolean; privacyStatus?: string };
            snippet?: {
              title?: string;
              description?: string;
              channelTitle?: string;
              channelId?: string;
              publishedAt?: string;
            };
          }>;
        };

        const returnedIds = new Set<string>();
        for (const item of payload.items ?? []) {
          if (!item.id) continue;
          returnedIds.add(item.id);
          const base = byId.get(item.id);
          if (!base) continue;

          const isEmbeddable = item.status?.embeddable === true;
          const privacyStatus = item.status?.privacyStatus;
          if (!isEmbeddable || privacyStatus !== 'public') {
            rejectedCount += 1;
            continue;
          }

          const durationSeconds = parseIso8601DurationSeconds(
            item.contentDetails?.duration ?? ''
          );
          if (
            durationSeconds === null ||
            durationSeconds < MIN_VIDEO_DURATION_SECONDS
          ) {
            rejectedCount += 1;
            continue;
          }

          const description = item.snippet?.description ?? base.description;
          const title = item.snippet?.title?.trim() || base.title;
          const channelName =
            item.snippet?.channelTitle?.trim() || base.channelName;
          const publishedAt = item.snippet?.publishedAt
            ? new Date(item.snippet.publishedAt)
            : base.publishedAt;
          const safePublishedAt = Number.isNaN(publishedAt.getTime())
            ? base.publishedAt
            : publishedAt;

          const jumpChips = parseYouTubeDescriptionChapters(
            description,
            durationSeconds
          );

          candidates.push({
            youtubeVideoId: base.youtubeVideoId,
            videoUrl: base.videoUrl,
            title,
            presenter: base.presenter,
            channelName,
            channelId: item.snippet?.channelId ?? base.channelId,
            publishedAt: safePublishedAt,
            durationSeconds,
            durationMinutes: Math.max(2, Math.round(durationSeconds / 60)),
            description,
            jumpChips,
            defaultTiers: base.defaultTiers,
            topicHint: base.topicHint,
            isEmbeddable: true,
            privacyStatus: 'public',
          });
        }

        // Videos missing from videos.list response (deleted/private)
        for (const id of chunk) {
          if (!returnedIds.has(id)) {
            rejectedCount += 1;
          }
        }
      } catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        warnings.push(`YouTube videos.list verification batch failed: ${reason}`);
      }
    }

    return { candidates, rejectedCount };
  }

  private async verifyWithOembed(
    discovered: DiscoveredAtomVideo[],
    warnings: string[]
  ): Promise<{ candidates: RawVideoCandidate[]; rejectedCount: number }> {
    const candidates: RawVideoCandidate[] = [];
    let rejectedCount = 0;

    for (let i = 0; i < discovered.length; i += OEMBED_CONCURRENCY) {
      const batch = discovered.slice(i, i + OEMBED_CONCURRENCY);
      const settled = await Promise.allSettled(
        batch.map(async (item) => {
          let bodyText: string;
          try {
            bodyText = await fetchSafeText(
              `https://www.youtube.com/oembed?url=${encodeURIComponent(item.videoUrl)}&format=json`,
              {
                timeoutMs: this.timeoutMs,
                maxBytes: DEFAULT_MAX_RESPONSE_BYTES,
                fetchImpl: this.fetchImpl,
                headers: {
                  Accept: 'application/json',
                  'User-Agent': this.userAgent,
                },
              }
            );
          } catch (err) {
            if (err instanceof SafeFetchHttpError) {
              return { ok: false as const, item };
            }
            throw err;
          }

          const data = JSON.parse(bodyText) as {
            title?: string;
            author_name?: string;
            html?: string;
            width?: number;
            height?: number;
          };

          if (!data.html || !data.html.includes('iframe')) {
            return { ok: false as const, item };
          }

          // Reject vertical Shorts detected via oEmbed portrait aspect ratio
          if (
            typeof data.height === 'number' &&
            typeof data.width === 'number' &&
            data.height > data.width
          ) {
            return { ok: false as const, item };
          }

          const jumpChips = parseYouTubeDescriptionChapters(item.description);
          const inferredSeconds =
            jumpChips.length > 0
              ? Math.max(
                  DEFAULT_OEMBED_DURATION_SECONDS,
                  jumpChips[jumpChips.length - 1]!.seconds + 90
                )
              : DEFAULT_OEMBED_DURATION_SECONDS;

          const candidate: RawVideoCandidate = {
            youtubeVideoId: item.youtubeVideoId,
            videoUrl: item.videoUrl,
            title: data.title?.trim() || item.title,
            presenter: item.presenter,
            channelName: data.author_name?.trim() || item.channelName,
            channelId: item.channelId,
            publishedAt: item.publishedAt,
            durationSeconds: inferredSeconds,
            durationMinutes: Math.max(2, Math.round(inferredSeconds / 60)),
            description: item.description,
            jumpChips,
            defaultTiers: item.defaultTiers,
            topicHint: item.topicHint,
            isEmbeddable: true,
            privacyStatus: 'public',
          };

          return { ok: true as const, candidate };
        })
      );

      settled.forEach((result, idx) => {
        const item = batch[idx]!;
        if (result.status === 'fulfilled') {
          if (result.value.ok) {
            candidates.push(result.value.candidate);
          } else {
            rejectedCount += 1;
          }
        } else {
          rejectedCount += 1;
          const reason =
            result.reason instanceof Error
              ? result.reason.message
              : String(result.reason);
          warnings.push(
            `YouTube oEmbed check for '${item.youtubeVideoId}' failed: ${reason}`
          );
        }
      });
    }

    return { candidates, rejectedCount };
  }
}

// ----------------------------------------------------
// DETERMINISTIC IN-MEMORY TEST FAKE ADAPTER
// ----------------------------------------------------

export interface FakeYouTubeFeedFetcherOptions {
  candidates?: RawVideoCandidate[];
  warnings?: string[];
  rejectedCount?: number;
}

function buildDefaultFakeVideoCandidates(anchorEnd: Date): RawVideoCandidate[] {
  const endMs = anchorEnd.getTime();
  const hoursAgo = (h: number) => new Date(endMs - h * 60 * 60 * 1000);
  const daysAgo = (d: number) => new Date(endMs - d * 24 * 60 * 60 * 1000);

  const tierSeeds: Array<{
    tier: CanonicalDigestTier;
    prefix: string;
    channelName: string;
    presenter: string;
    topicHint: string;
    videos: Array<{
      id: string;
      title: string;
      durationSeconds: number;
      description: string;
    }>;
  }> = [
    {
      tier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
      prefix: 't0',
      channelName: 'PedsDocTalk',
      presenter: 'Dr. Mona Amin, DO, FAAP',
      topicHint: 'Sleep & Routines',
      videos: [
        {
          id: 'vidT0Fresh01',
          title: 'Toddler Bedtime Stalling: Calm Pediatric Scripts That Work',
          durationSeconds: 615,
          description:
            'Chapters:\n0:00 Why toddlers stall at bedtime\n3:15 Two-choice calm transition\n7:40 Consistent lights-out anchor',
        },
        {
          id: 'vidT0Fresh02',
          title: 'Serve-and-Return Play Ideas for 12 to 24 Month Brain Growth',
          durationSeconds: 840,
          description:
            '0:00 Everyday serve and return cues\n4:20 Simple kitchen sensory games\n9:50 Language burst milestones',
        },
        {
          id: 'vidT0Fresh03',
          title: 'Gentle Toddler Mealtime Boundaries Without Food Battles',
          durationSeconds: 1120,
          description:
            'Division of responsibility explained for calm toddler tables without pressure.',
        },
        {
          id: 'vidT0Fresh04',
          title: 'Understanding 18-Month Separation Anxiety at Drop-Off',
          durationSeconds: 510,
          description:
            '0:00 Why clinginess spikes at 18 months\n2:45 Quick confident goodbye ritual',
        },
      ],
    },
    {
      tier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
      prefix: 't1',
      channelName: 'Good Inside',
      presenter: 'Dr. Becky Kennedy, PhD',
      topicHint: 'Family Communication',
      videos: [
        {
          id: 'vidT1Fresh01',
          title: 'Helping Five-Year-Olds Repair After Sibling Conflict',
          durationSeconds: 590,
          description:
            '0:00 Moving past forced apologies\n3:10 Coaching real sibling repair\n6:45 Calming both kids first',
        },
        {
          id: 'vidT1Fresh02',
          title: 'Why Preschoolers Melt Down Right After Pickup',
          durationSeconds: 930,
          description:
            '0:00 Restraint collapse explained\n5:00 Low-demand car snack routine\n11:15 Reconnecting before questions',
        },
        {
          id: 'vidT1Fresh03',
          title: 'Screen Transitions for Ages 4–6 Without Power Struggles',
          durationSeconds: 720,
          description: 'Practical bridge techniques for turning off cartoons peacefully.',
        },
        {
          id: 'vidT1Fresh04',
          title: 'Building Frustration Tolerance Through Open-Ended Play',
          durationSeconds: 1620,
          description:
            '0:00 Why struggle builds confidence\n8:30 Scaffolding without rescuing\n19:00 Play prompts for rainy days',
        },
      ],
    },
    {
      tier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
      prefix: 't2',
      channelName: 'Child Mind Institute',
      presenter: 'Child Mind Institute Clinicians',
      topicHint: 'School & Focus',
      videos: [
        {
          id: 'vidT2Fresh01',
          title: 'Helping Eight-Year-Olds Handle Perfectionism & Homework Tears',
          durationSeconds: 640,
          description:
            '0:00 Recognizing perfectionism early\n3:30 Breaking tasks into micro-wins\n8:00 Praising steady effort',
        },
        {
          id: 'vidT2Fresh02',
          title: 'Navigating Gaming Timers & Roblox Social Play for Ages 7–9',
          durationSeconds: 960,
          description:
            '0:00 Co-playing before setting rules\n6:15 Natural stopping points in games\n12:20 Family agreement check-ins',
        },
        {
          id: 'vidT2Fresh03',
          title: 'Elementary Friendship Bumps: Coaching Without Stepping In',
          durationSeconds: 1580,
          description: 'How parents can listen and role-play social problem solving.',
        },
        {
          id: 'vidT2Fresh04',
          title: 'Morning Focus Routines for Distractible Third Graders',
          durationSeconds: 480,
          description:
            '0:00 Why verbal reminders backfire\n2:30 Visual checklist setup',
        },
      ],
    },
    {
      tier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
      prefix: 't3',
      channelName: 'Common Sense Media',
      presenter: 'Common Sense Media Editors',
      topicHint: 'Media & Tech',
      videos: [
        {
          id: 'vidT3Fresh01',
          title: 'First Phone Readiness: Five Habits That Matter More Than Age',
          durationSeconds: 660,
          description:
            '0:00 Readiness vs peer pressure\n3:45 Bedroom charging norm\n8:10 Co-signing a bilateral family pact',
        },
        {
          id: 'vidT3Fresh02',
          title: 'Decoding Middle School Group Chat Etiquette With Your Tween',
          durationSeconds: 1020,
          description:
            '0:00 Why text tone misfires\n5:30 Pausing before replying\n11:40 Knowing when to mute a thread',
        },
        {
          id: 'vidT3Fresh03',
          title: 'How Short-Form Video Algorithms Hook Pre-Teen Attention',
          durationSeconds: 1680,
          description: 'Helping ten- to twelve-year-olds spot autoplay loops with curiosity.',
        },
        {
          id: 'vidT3Fresh04',
          title: 'Keeping Communication Open When Tweens Pull Toward Peers',
          durationSeconds: 540,
          description:
            '0:00 Normal adrenarche shifts\n3:05 Curiosity questions over lectures',
        },
      ],
    },
    {
      tier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
      prefix: 't4',
      channelName: 'HealthyGamerGG',
      presenter: 'Dr. Alok Kanojia, MD',
      topicHint: 'Media & Tech',
      videos: [
        {
          id: 'vidT4Fresh01',
          title: 'Why Teens Stay Up Late Scrolling & How to Reset Circadian Rhythm',
          durationSeconds: 690,
          description:
            '0:00 Adolescent melatonin shift\n4:05 Neutral 8:30 PM device dock\n8:50 Replacing late-night wind-down loops',
        },
        {
          id: 'vidT4Fresh02',
          title: 'Talking to a Closed-Off 14-Year-Old Without Triggering Shutdown',
          durationSeconds: 1140,
          description:
            '0:00 Why interrogation closes doors\n6:20 Side-by-side car conversations\n14:00 Reflective listening scripts',
        },
        {
          id: 'vidT4Fresh03',
          title: 'Gaming Friendships vs Escapism: What Parents Should Notice',
          durationSeconds: 1860,
          description: 'Distinguishing healthy social gaming from stress avoidance.',
        },
        {
          id: 'vidT4Fresh04',
          title: 'Supporting Early Teens Through Social Comparison Online',
          durationSeconds: 600,
          description:
            '0:00 Curated feeds vs real life\n4:15 Auditing follow lists together',
        },
      ],
    },
    {
      tier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
      prefix: 't5',
      channelName: 'Therapy in a Nutshell',
      presenter: 'Emma McAdam, LMFT',
      topicHint: 'School & Focus',
      videos: [
        {
          id: 'vidT5Fresh01',
          title: 'Executive Function & Burnout Prevention for High Schoolers',
          durationSeconds: 630,
          description:
            '0:00 Recognizing chronic stress\n3:40 Sustainable weekly study blocks\n7:55 Protecting restorative downtime',
        },
        {
          id: 'vidT5Fresh02',
          title: 'Coaching 16- to 18-Year-Olds Toward Self-Regulated Phone Habits',
          durationSeconds: 1080,
          description:
            '0:00 Shifting from controls to coaching\n6:00 Self-tracking screen friction\n13:10 Preparing for college autonomy',
        },
        {
          id: 'vidT5Fresh03',
          title: 'AI Homework Helpers: Teaching Critical Thinking & Integrity',
          durationSeconds: 1740,
          description: 'Practical guardrails for using AI tutors without outsourcing learning.',
        },
        {
          id: 'vidT5Fresh04',
          title: 'How Parents Stay Connected During Senior-Year Independence',
          durationSeconds: 570,
          description:
            '0:00 Respecting emerging adulthood\n3:25 Low-pressure Sunday check-ins',
        },
      ],
    },
  ];

  const pool: RawVideoCandidate[] = [];
  for (const seed of tierSeeds) {
    seed.videos.forEach((v, idx) => {
      pool.push({
        youtubeVideoId: v.id,
        videoUrl: `https://www.youtube.com/watch?v=${v.id}`,
        title: v.title,
        presenter: seed.presenter,
        channelName: seed.channelName,
        channelId: `UCfake${seed.prefix}00000000000000`,
        publishedAt: hoursAgo(10 + idx * 22),
        durationSeconds: v.durationSeconds,
        durationMinutes: Math.max(2, Math.round(v.durationSeconds / 60)),
        description: v.description,
        jumpChips: parseYouTubeDescriptionChapters(
          v.description,
          v.durationSeconds
        ),
        defaultTiers: [seed.tier],
        topicHint: seed.topicHint,
        isEmbeddable: true,
        privacyStatus: 'public',
      });
    });
  }

  // Explicit test fixtures that MUST be rejected during fetch:
  // 1. Non-embeddable video
  pool.push({
    youtubeVideoId: 'vidNoEmbed1',
    videoUrl: 'https://www.youtube.com/watch?v=vidNoEmbed1',
    title: 'Blocked Non-Embeddable Talk',
    presenter: 'Test Presenter',
    channelName: 'Blocked Channel',
    channelId: null,
    publishedAt: hoursAgo(6),
    durationSeconds: 600,
    durationMinutes: 10,
    description: 'Embed disabled by owner.',
    jumpChips: [],
    defaultTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
    topicHint: 'Media & Tech',
    isEmbeddable: false,
    privacyStatus: 'public',
  });

  // 2. Short < 90s teaser
  pool.push({
    youtubeVideoId: 'vidShort045',
    videoUrl: 'https://www.youtube.com/watch?v=vidShort045',
    title: 'Quick 45-Second Parenting Tip #shorts',
    presenter: 'Test Presenter',
    channelName: 'Short Channel',
    channelId: null,
    publishedAt: hoursAgo(8),
    durationSeconds: 45,
    durationMinutes: 1,
    description: 'Too short to be a substantive talk.',
    jumpChips: [],
    defaultTiers: [DevelopmentalTier.TIER_3_PRE_TEEN_10_12],
    topicHint: 'Media & Tech',
    isEmbeddable: true,
    privacyStatus: 'public',
  });

  // 3. Out-of-window video (10 days old)
  pool.push({
    youtubeVideoId: 'vidOldLook1',
    videoUrl: 'https://www.youtube.com/watch?v=vidOldLook1',
    title: 'Earlier Week Deep-Dive on Family Sleep Rhythms',
    presenter: 'Dr. Mona Amin, DO, FAAP',
    channelName: 'PedsDocTalk',
    channelId: 'UCx2hGbeaOvy8P5m357V3gBw',
    publishedAt: daysAgo(10),
    durationSeconds: 780,
    durationMinutes: 13,
    description: '0:00 Circadian basics\n6:15 Bedtime anchor',
    jumpChips: [
      { seconds: 0, label: '0:00 · Circadian basics' },
      { seconds: 375, label: '6:15 · Bedtime anchor' },
    ],
    defaultTiers: [...CANONICAL_DIGEST_TIERS],
    topicHint: 'Sleep & Routines',
    isEmbeddable: true,
    privacyStatus: 'public',
  });

  return pool;
}

export class FakeYouTubeFeedFetcher implements YouTubeFeedFetcher {
  private readonly customCandidates?: RawVideoCandidate[];
  private readonly warnings: string[];
  private readonly baseRejectedCount: number;

  constructor(opts: FakeYouTubeFeedFetcherOptions = {}) {
    this.customCandidates = opts.candidates;
    this.warnings = opts.warnings ?? [];
    this.baseRejectedCount = opts.rejectedCount ?? 0;
  }

  async fetchFreshVideos(
    window: DigestFetchWindow,
    _opts: YouTubeFeedFetchOptions = {}
  ): Promise<YouTubeFeedFetchResult> {
    const pool =
      this.customCandidates ?? buildDefaultFakeVideoCandidates(window.weekEnd);
    const candidates: RawVideoCandidate[] = [];
    let rejectedCount = this.baseRejectedCount;

    for (const item of pool) {
      if (
        item.publishedAt.getTime() < window.weekStart.getTime() ||
        item.publishedAt.getTime() > window.weekEnd.getTime()
      ) {
        continue;
      }

      if (
        !item.isEmbeddable ||
        item.privacyStatus !== 'public' ||
        item.durationSeconds < MIN_VIDEO_DURATION_SECONDS
      ) {
        rejectedCount += 1;
        continue;
      }

      const jumpChips =
        item.jumpChips.length > 0
          ? item.jumpChips
          : parseYouTubeDescriptionChapters(
              item.description,
              item.durationSeconds
            );

      candidates.push({
        ...item,
        durationMinutes:
          item.durationMinutes || Math.max(2, Math.round(item.durationSeconds / 60)),
        jumpChips,
      });
    }

    return {
      candidates,
      warnings: [...this.warnings],
      rejectedCount,
    };
  }
}
