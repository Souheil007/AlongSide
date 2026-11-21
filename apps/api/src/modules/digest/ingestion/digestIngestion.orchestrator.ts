import {
  CANONICAL_DIGEST_TIERS,
  computeWeeklyEditionWindow,
  DigestContentStatus,
  DigestIssueStatus,
  isSlangEligibleTier,
  resolveDigestTierBucket,
  type CanonicalDigestTier,
  type DigestIssueSummaryDTO,
} from '@alongside/shared';
import type { LoggerLike } from '../../ai-advisor/adapters/llm-orchestrator.js';
import type {
  DigestRepository,
  UpsertWeeklyEditionArticleInput,
  UpsertWeeklyEditionDinnerPromptInput,
  UpsertWeeklyEditionPhraseInput,
  UpsertWeeklyEditionVideoInput,
} from '../digest.repository.js';
import { DigestValidationError } from '../digest.service.js';
import {
  assertSafeExternalUrl,
  MAX_RSS_EXCERPT_CHARS,
  sanitizeRssExcerpt,
  type BlogFeedFetcher,
  type RawBlogCandidate,
} from './adapters/blogFeedFetcher.js';
import {
  MIN_VIDEO_DURATION_SECONDS,
  type RawVideoCandidate,
  type YouTubeFeedFetcher,
} from './adapters/youtubeFeedFetcher.js';
import type {
  CuratedBlogDraft,
  CuratedVideoDraft,
  DigestContentCurator,
} from './adapters/digestCurator.js';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const DEFAULT_MIN_ARTICLES_PER_TIER = 3;
export const DEFAULT_MAX_ARTICLES_PER_TIER = 6;
export const DEFAULT_MIN_VIDEOS_PER_TIER = 3;
export const DEFAULT_MAX_VIDEOS_PER_TIER = 6;
export const DEFAULT_DEDUP_LOOKBACK_ISSUES = 4;
export const DEFAULT_FALLBACK_LOOKBACK_DAYS = 14;
export const MAX_FALLBACK_LOOKBACK_DAYS = 30;

export class DigestSyncConflictError extends Error {
  readonly statusCode = 409;
  readonly code = 'SYNC_IN_PROGRESS';

  constructor(
    message = 'A weekly digest sync is already in progress. Please retry once it completes.'
  ) {
    super(message);
    this.name = 'DigestSyncConflictError';
  }
}

export interface DigestSyncRequestInput {
  weekStart?: Date | string;
  weekEnd?: Date | string;
  issueNumber?: number;
  dryRun?: boolean;
  fallbackLookbackDays?: number;
}

export interface DigestTierSyncMetrics {
  tier: CanonicalDigestTier;
  articlesSelected: number;
  videosSelected: number;
  dinnerPromptsGenerated: number;
  phrasesGenerated: number;
  usedFallbackLookback: boolean;
  articleLookbackDaysUsed: number;
  videoLookbackDaysUsed: number;
}

export interface DigestSyncReportDTO {
  issueNumber: number;
  dryRun: boolean;
  persisted: boolean;
  publishDate: string;
  weekStart: string;
  weekEnd: string;
  title: string;
  summary: string;
  articles: {
    fetched: number;
    rejected: number;
    deduplicated: number;
    selected: number;
    persisted: number;
  };
  videos: {
    fetched: number;
    rejected: number;
    deduplicated: number;
    selected: number;
    persisted: number;
  };
  dinnerPromptsPersisted: number;
  phrasesPersisted: number;
  perTier: DigestTierSyncMetrics[];
  warnings: string[];
  issue?: DigestIssueSummaryDTO;
}

export interface DigestIngestionOrchestratorDeps {
  blogFeedFetcher: BlogFeedFetcher;
  youtubeFeedFetcher: YouTubeFeedFetcher;
  curator: DigestContentCurator;
  repository: DigestRepository;
  logger?: LoggerLike;
  minArticlesPerTier?: number;
  maxArticlesPerTier?: number;
  minVideosPerTier?: number;
  maxVideosPerTier?: number;
  dedupLookbackIssues?: number;
  now?: () => Date;
}

function parseDateInput(value: Date | string, fieldName: string): Date {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new DigestValidationError(`${fieldName} must be a valid date.`);
    }
    return value;
  }
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const parsed = new Date(`${trimmed}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime())) {
      throw new DigestValidationError(`${fieldName} must be a valid YYYY-MM-DD date.`);
    }
    return parsed;
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    throw new DigestValidationError(`${fieldName} must be a valid ISO-8601 date.`);
  }
  return parsed;
}

function formatEditionDateRange(weekStart: Date, weekEnd: Date): string {
  const fmt = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
  return `${fmt.format(weekStart)}–${fmt.format(weekEnd)}`;
}

/**
 * Deep orchestrator coordinating concurrent weekly blog RSS + YouTube Atom
 * discovery, cross-issue deduplication, selective sparse-tier lookback,
 * Parent Calm editorial curation, and transactional edition persistence.
 */
export class DigestIngestionOrchestrator {
  private readonly blogFeedFetcher: BlogFeedFetcher;
  private readonly youtubeFeedFetcher: YouTubeFeedFetcher;
  private readonly curator: DigestContentCurator;
  private readonly repository: DigestRepository;
  private readonly logger: LoggerLike;
  private readonly minArticlesPerTier: number;
  private readonly maxArticlesPerTier: number;
  private readonly minVideosPerTier: number;
  private readonly maxVideosPerTier: number;
  private readonly dedupLookbackIssues: number;
  private readonly now: () => Date;
  private activeSync = false;

  constructor(deps: DigestIngestionOrchestratorDeps) {
    this.blogFeedFetcher = deps.blogFeedFetcher;
    this.youtubeFeedFetcher = deps.youtubeFeedFetcher;
    this.curator = deps.curator;
    this.repository = deps.repository;
    this.logger = deps.logger ?? console;
    this.minArticlesPerTier =
      deps.minArticlesPerTier ?? DEFAULT_MIN_ARTICLES_PER_TIER;
    this.maxArticlesPerTier =
      deps.maxArticlesPerTier ?? DEFAULT_MAX_ARTICLES_PER_TIER;
    this.minVideosPerTier = deps.minVideosPerTier ?? DEFAULT_MIN_VIDEOS_PER_TIER;
    this.maxVideosPerTier = deps.maxVideosPerTier ?? DEFAULT_MAX_VIDEOS_PER_TIER;
    this.dedupLookbackIssues =
      deps.dedupLookbackIssues ?? DEFAULT_DEDUP_LOOKBACK_ISSUES;
    this.now = deps.now ?? (() => new Date());
  }

  async syncWeeklyEdition(
    input: DigestSyncRequestInput = {}
  ): Promise<DigestSyncReportDTO> {
    if (this.activeSync) {
      throw new DigestSyncConflictError();
    }
    this.activeSync = true;
    try {
      return await this.executeSyncWeeklyEdition(input);
    } finally {
      this.activeSync = false;
    }
  }

  private async executeSyncWeeklyEdition(
    input: DigestSyncRequestInput
  ): Promise<DigestSyncReportDTO> {
    const dryRun = Boolean(input.dryRun);
    const fallbackLookbackDays =
      input.fallbackLookbackDays ?? DEFAULT_FALLBACK_LOOKBACK_DAYS;

    if (
      !Number.isInteger(fallbackLookbackDays) ||
      fallbackLookbackDays < 0 ||
      fallbackLookbackDays > MAX_FALLBACK_LOOKBACK_DAYS
    ) {
      throw new DigestValidationError(
        `fallbackLookbackDays must be an integer between 0 and ${MAX_FALLBACK_LOOKBACK_DAYS}.`
      );
    }

    if (
      input.issueNumber !== undefined &&
      (!Number.isInteger(input.issueNumber) || input.issueNumber <= 0)
    ) {
      throw new DigestValidationError(
        'issueNumber must be a positive integer when provided.'
      );
    }

    // 1. Resolve canonical 7-day window
    const { weekStart, weekEnd, publishDate } = this.resolveWindow(
      input.weekStart,
      input.weekEnd
    );
    const primaryWindowDays = Math.max(
      1,
      Math.round((weekEnd.getTime() - weekStart.getTime()) / MS_PER_DAY)
    );

    // 2. Resolve target issue number (idempotent for identical [weekStart, weekEnd])
    const issueNumber = await this.resolveIssueNumber(
      input.issueNumber,
      weekStart,
      weekEnd
    );

    // 3. Load cross-issue deduplication sets from recent published editions
    const [recentHashes, recentVideoIds] = await Promise.all([
      this.repository.findRecentCanonicalHashes(
        this.dedupLookbackIssues,
        issueNumber
      ),
      this.repository.findRecentYouTubeVideoIds(
        this.dedupLookbackIssues,
        issueNumber
      ),
    ]);

    const warnings: string[] = [];
    const seenHashes = new Set<string>();
    const seenVideoIds = new Set<string>();

    let articlesFetched = 0;
    let articlesRejected = 0;
    let articlesDeduplicated = 0;
    let videosFetched = 0;
    let videosRejected = 0;
    let videosDeduplicated = 0;

    // 4. Single concurrent fetch across [fetchStart, weekEnd], then partition in memory
    //    into strict [weekStart, weekEnd] vs fallback [expandedStart, weekStart) pools
    const expandedStart = new Date(
      weekEnd.getTime() - fallbackLookbackDays * MS_PER_DAY
    );
    const hasFallbackWindow =
      fallbackLookbackDays > 0 && expandedStart.getTime() < weekStart.getTime();
    const fetchWindow = {
      weekStart: hasFallbackWindow ? expandedStart : weekStart,
      weekEnd,
    };

    const [blogFetchSettled, videoFetchSettled] = await Promise.allSettled([
      this.blogFeedFetcher.fetchCandidates(fetchWindow),
      this.youtubeFeedFetcher.fetchFreshVideos(fetchWindow, {
        minPerTier: this.minVideosPerTier,
      }),
    ]);

    const primaryBlogCandidates: RawBlogCandidate[] = [];
    const fallbackBlogCandidates: RawBlogCandidate[] = [];
    if (blogFetchSettled.status === 'fulfilled') {
      warnings.push(...blogFetchSettled.value.warnings);
      articlesRejected += blogFetchSettled.value.rejectedCount;
      for (const candidate of blogFetchSettled.value.candidates) {
        const ts = candidate.publishedAt.getTime();
        if (ts >= weekStart.getTime() && ts <= weekEnd.getTime()) {
          primaryBlogCandidates.push(candidate);
        } else if (
          hasFallbackWindow &&
          ts >= expandedStart.getTime() &&
          ts < weekStart.getTime()
        ) {
          fallbackBlogCandidates.push(candidate);
        }
      }
      articlesFetched += primaryBlogCandidates.length;
    } else {
      const reason =
        blogFetchSettled.reason instanceof Error
          ? blogFetchSettled.reason.message
          : String(blogFetchSettled.reason);
      warnings.push(`Primary blog fetch failed: ${reason}`);
    }

    const primaryVideoCandidates: RawVideoCandidate[] = [];
    const fallbackVideoCandidates: RawVideoCandidate[] = [];
    if (videoFetchSettled.status === 'fulfilled') {
      warnings.push(...videoFetchSettled.value.warnings);
      videosRejected += videoFetchSettled.value.rejectedCount;
      for (const candidate of videoFetchSettled.value.candidates) {
        const ts = candidate.publishedAt.getTime();
        if (ts >= weekStart.getTime() && ts <= weekEnd.getTime()) {
          primaryVideoCandidates.push(candidate);
        } else if (
          hasFallbackWindow &&
          ts >= expandedStart.getTime() &&
          ts < weekStart.getTime()
        ) {
          fallbackVideoCandidates.push(candidate);
        }
      }
      videosFetched += primaryVideoCandidates.length;
    } else {
      const reason =
        videoFetchSettled.reason instanceof Error
          ? videoFetchSettled.reason.message
          : String(videoFetchSettled.reason);
      warnings.push(`Primary video fetch failed: ${reason}`);
    }

    // 5. Filter + deduplicate primary candidates (defense-in-depth)
    const primaryBlogsClean = this.filterAndDedupBlogs(
      primaryBlogCandidates,
      weekStart,
      weekEnd,
      seenHashes,
      recentHashes,
      {
        onReject: () => {
          articlesRejected += 1;
        },
        onDedup: () => {
          articlesDeduplicated += 1;
        },
      }
    );

    const primaryVideosClean = this.filterAndDedupVideos(
      primaryVideoCandidates,
      weekStart,
      weekEnd,
      seenVideoIds,
      recentVideoIds,
      {
        onReject: () => {
          videosRejected += 1;
        },
        onDedup: () => {
          videosDeduplicated += 1;
        },
      }
    );

    // 6. Editorial curation of primary candidates
    const [primaryCuratedBlogs, primaryCuratedVideos] = await Promise.all([
      this.curator.curateArticles(primaryBlogsClean),
      this.curator.curateVideos(primaryVideosClean),
    ]);

    const approvedBlogs: Array<CuratedBlogDraft & { isFallback: boolean }> = [];
    for (const draft of primaryCuratedBlogs) {
      if (draft.approved) {
        approvedBlogs.push({ ...draft, isFallback: false });
      } else {
        articlesRejected += 1;
      }
    }

    const approvedVideos: Array<CuratedVideoDraft & { isFallback: boolean }> = [];
    for (const draft of primaryCuratedVideos) {
      if (draft.approved && draft.isEmbeddable) {
        approvedVideos.push({ ...draft, isFallback: false });
      } else {
        videosRejected += 1;
      }
    }

    // 7. Selective sparse-tier lookback fallback (ONLY for under-filled tiers,
    //    reusing the already-fetched fallback pool without a second HTTP fetch)
    const sparseArticleTiers = this.findSparseTiers(
      approvedBlogs,
      this.minArticlesPerTier
    );
    const sparseVideoTiers = this.findSparseTiers(
      approvedVideos,
      this.minVideosPerTier
    );

    const articleFallbackUsedTiers = new Set<CanonicalDigestTier>();
    const videoFallbackUsedTiers = new Set<CanonicalDigestTier>();

    if (
      hasFallbackWindow &&
      (sparseArticleTiers.length > 0 || sparseVideoTiers.length > 0)
    ) {
      if (sparseArticleTiers.length > 0 && fallbackBlogCandidates.length > 0) {
        const freshFallbackCandidates = fallbackBlogCandidates.filter(
          (c) => !seenHashes.has(c.canonicalHash)
        );
        articlesFetched += freshFallbackCandidates.length;

        const cleanFallbackBlogs = this.filterAndDedupBlogs(
          freshFallbackCandidates,
          expandedStart,
          weekEnd,
          seenHashes,
          recentHashes,
          {
            onReject: () => {
              articlesRejected += 1;
            },
            onDedup: () => {
              articlesDeduplicated += 1;
            },
          }
        );

        const curatedFallbackBlogs =
          await this.curator.curateArticles(cleanFallbackBlogs);
        const sparseSet = new Set<CanonicalDigestTier>(sparseArticleTiers);

        for (const draft of curatedFallbackBlogs) {
          if (!draft.approved) {
            articlesRejected += 1;
            continue;
          }
          // Restrict fallback items strictly to sparse tiers while preserving exact publishedAt
          const narrowedTiers = draft.targetTiers
            .map((t) => resolveDigestTierBucket(t))
            .filter((t) => sparseSet.has(t));
          if (narrowedTiers.length === 0) {
            continue;
          }
          const uniqueNarrowed = Array.from(new Set(narrowedTiers));
          for (const tier of uniqueNarrowed) {
            articleFallbackUsedTiers.add(tier);
          }
          approvedBlogs.push({
            ...draft,
            targetTiers: uniqueNarrowed,
            isFallback: true,
          });
        }
      }

      if (sparseVideoTiers.length > 0 && fallbackVideoCandidates.length > 0) {
        const freshFallbackVideos = fallbackVideoCandidates.filter(
          (c) => !seenVideoIds.has(c.youtubeVideoId)
        );
        videosFetched += freshFallbackVideos.length;

        const cleanFallbackVideos = this.filterAndDedupVideos(
          freshFallbackVideos,
          expandedStart,
          weekEnd,
          seenVideoIds,
          recentVideoIds,
          {
            onReject: () => {
              videosRejected += 1;
            },
            onDedup: () => {
              videosDeduplicated += 1;
            },
          }
        );

        const curatedFallbackVideos =
          await this.curator.curateVideos(cleanFallbackVideos);
        const sparseSet = new Set<CanonicalDigestTier>(sparseVideoTiers);

        for (const draft of curatedFallbackVideos) {
          if (!draft.approved || !draft.isEmbeddable) {
            videosRejected += 1;
            continue;
          }
          const narrowedTiers = draft.targetTiers
            .map((t) => resolveDigestTierBucket(t))
            .filter((t) => sparseSet.has(t));
          if (narrowedTiers.length === 0) {
            continue;
          }
          const uniqueNarrowed = Array.from(new Set(narrowedTiers));
          for (const tier of uniqueNarrowed) {
            videoFallbackUsedTiers.add(tier);
          }
          approvedVideos.push({
            ...draft,
            targetTiers: uniqueNarrowed,
            isFallback: true,
          });
        }
      }
    }

    // 8. Per-tier ranking, top-6 selection, lead marking, and weekly extras synthesis
    const selectedArticleMap = new Map<
      string,
      {
        draft: CuratedBlogDraft & { isFallback: boolean };
        tiers: Set<CanonicalDigestTier>;
        isLead: boolean;
        bestRank: number;
      }
    >();

    const selectedVideoMap = new Map<
      string,
      {
        draft: CuratedVideoDraft & { isFallback: boolean };
        tiers: Set<CanonicalDigestTier>;
        bestRank: number;
      }
    >();

    const allDinnerPrompts: UpsertWeeklyEditionDinnerPromptInput[] = [];
    const allPhrases: UpsertWeeklyEditionPhraseInput[] = [];
    const perTier: DigestTierSyncMetrics[] = [];

    for (const tier of CANONICAL_DIGEST_TIERS) {
      const tierBlogs = approvedBlogs
        .filter((a) =>
          a.targetTiers.some((t) => resolveDigestTierBucket(t) === tier)
        )
        .sort((a, b) => {
          // Strict in-window articles always rank before lookback fallback items
          if (a.isFallback !== b.isFallback) return a.isFallback ? 1 : -1;
          if (a.authorityWeight !== b.authorityWeight) {
            return b.authorityWeight - a.authorityWeight;
          }
          if (a.publishedAt.getTime() !== b.publishedAt.getTime()) {
            return b.publishedAt.getTime() - a.publishedAt.getTime();
          }
          return a.canonicalHash.localeCompare(b.canonicalHash);
        })
        .slice(0, this.maxArticlesPerTier);

      tierBlogs.forEach((article, idx) => {
        const isLead = idx === 0;
        const existing = selectedArticleMap.get(article.canonicalHash);
        if (existing) {
          existing.tiers.add(tier);
          if (isLead) existing.isLead = true;
          if (idx < existing.bestRank) existing.bestRank = idx;
        } else {
          selectedArticleMap.set(article.canonicalHash, {
            draft: article,
            tiers: new Set([tier]),
            isLead,
            bestRank: idx,
          });
        }
      });

      const tierVideos = approvedVideos
        .filter((v) =>
          v.targetTiers.some((t) => resolveDigestTierBucket(t) === tier)
        )
        .sort((a, b) => {
          if (a.isFallback !== b.isFallback) return a.isFallback ? 1 : -1;
          if (a.publishedAt.getTime() !== b.publishedAt.getTime()) {
            return b.publishedAt.getTime() - a.publishedAt.getTime();
          }
          const aHasChips = a.jumpChips.length > 0 ? 1 : 0;
          const bHasChips = b.jumpChips.length > 0 ? 1 : 0;
          if (aHasChips !== bHasChips) return bHasChips - aHasChips;
          return a.youtubeVideoId.localeCompare(b.youtubeVideoId);
        })
        .slice(0, this.maxVideosPerTier);

      tierVideos.forEach((video, idx) => {
        const existing = selectedVideoMap.get(video.youtubeVideoId);
        if (existing) {
          existing.tiers.add(tier);
          if (idx < existing.bestRank) existing.bestRank = idx;
        } else {
          selectedVideoMap.set(video.youtubeVideoId, {
            draft: video,
            tiers: new Set([tier]),
            bestRank: idx,
          });
        }
      });

      const extras = await this.curator.synthesizeWeeklyExtras({
        weekStart,
        weekEnd,
        tier,
        articles: tierBlogs,
        videos: tierVideos,
      });

      const tierPrompts = extras.dinnerPrompts.slice(0, 3);
      for (const prompt of tierPrompts) {
        allDinnerPrompts.push({
          question: prompt.question,
          parentTip: prompt.parentTip,
          followUp: prompt.followUp,
          targetTiers: [tier],
          sortOrder: prompt.sortOrder,
        });
      }

      // Hard developmental invariant: zero phrases for ages 0–6
      const tierPhrases = isSlangEligibleTier(tier)
        ? extras.phrases.slice(0, 3)
        : [];
      for (const phrase of tierPhrases) {
        allPhrases.push({
          word: phrase.word,
          shortMeaning: phrase.shortMeaning,
          fullMeaning: phrase.fullMeaning,
          cringeLevel: phrase.cringeLevel,
          cringeLabel: phrase.cringeLabel,
          calmScript: phrase.calmScript,
          targetTiers: [tier],
          sortOrder: phrase.sortOrder,
        });
      }

      const usedArticleFallback =
        articleFallbackUsedTiers.has(tier) &&
        tierBlogs.some((a) => a.isFallback);
      const usedVideoFallback =
        videoFallbackUsedTiers.has(tier) &&
        tierVideos.some((v) => v.isFallback);

      perTier.push({
        tier,
        articlesSelected: tierBlogs.length,
        videosSelected: tierVideos.length,
        dinnerPromptsGenerated: tierPrompts.length,
        phrasesGenerated: tierPhrases.length,
        usedFallbackLookback: usedArticleFallback || usedVideoFallback,
        articleLookbackDaysUsed: usedArticleFallback
          ? fallbackLookbackDays
          : primaryWindowDays,
        videoLookbackDaysUsed: usedVideoFallback
          ? fallbackLookbackDays
          : primaryWindowDays,
      });
    }

    // 9. Build final transactional payload
    const editionArticles: UpsertWeeklyEditionArticleInput[] = Array.from(
      selectedArticleMap.values()
    )
      .sort((a, b) => {
        if (a.isLead !== b.isLead) return a.isLead ? -1 : 1;
        if (a.bestRank !== b.bestRank) return a.bestRank - b.bestRank;
        return b.draft.publishedAt.getTime() - a.draft.publishedAt.getTime();
      })
      .map((entry, idx) => ({
        canonicalHash: entry.draft.canonicalHash,
        sourceUrl: entry.draft.sourceUrl,
        sourceName: entry.draft.sourceName,
        sourceDomain: entry.draft.sourceDomain,
        authorName: entry.draft.authorName,
        imageUrl: entry.draft.imageUrl,
        publishedAt: entry.draft.publishedAt,
        isOriginalEditorial: false,
        topicLabel: entry.draft.topicLabel,
        readMinutes: entry.draft.readMinutes,
        title: entry.draft.title,
        summary: entry.draft.summary,
        keyShift: entry.draft.keyShift,
        perspectiveNote: entry.draft.perspectiveNote,
        contentMarkdown: null,
        sourcesText: entry.draft.sourcesText,
        targetTiers: Array.from(entry.tiers),
        isLead: entry.isLead,
        sortOrder: idx + 1,
        ingestionStatus: DigestContentStatus.APPROVED,
      }));

    const editionVideos: UpsertWeeklyEditionVideoInput[] = Array.from(
      selectedVideoMap.values()
    )
      .sort((a, b) => {
        if (a.bestRank !== b.bestRank) return a.bestRank - b.bestRank;
        return b.draft.publishedAt.getTime() - a.draft.publishedAt.getTime();
      })
      .map((entry, idx) => ({
        youtubeVideoId: entry.draft.youtubeVideoId,
        videoUrl: entry.draft.videoUrl,
        title: entry.draft.title,
        presenter: entry.draft.presenter,
        channelName: entry.draft.channelName,
        channelId: entry.draft.channelId,
        publishedAt: entry.draft.publishedAt,
        durationMinutes: entry.draft.durationMinutes,
        formatLabel: entry.draft.formatLabel,
        takeaway: entry.draft.takeaway,
        jumpChips:
          entry.draft.jumpChips.length > 0 ? entry.draft.jumpChips : undefined,
        skimBullets: entry.draft.skimBullets,
        targetTiers: Array.from(entry.tiers),
        isEmbeddable: true,
        sortOrder: idx + 1,
        ingestionStatus: DigestContentStatus.APPROVED,
      }));

    const rangeLabel = formatEditionDateRange(weekStart, weekEnd);
    const title = `Week of ${rangeLabel}: Family Culture & Child Development Briefing`;
    const summary = `Curated weekly roundup of ${editionArticles.length} evidence-backed parenting briefings and ${editionVideos.length} verified expert talks published ${rangeLabel}, organized by developmental stage.`;
    const conversationStarter =
      allDinnerPrompts[0]?.question ??
      'What was one moment this week that felt surprisingly good—and one moment that felt a little tricky?';

    const totalFeedFailure =
      editionArticles.length === 0 && editionVideos.length === 0;
    if (totalFeedFailure) {
      warnings.push(
        'Sync aborted: all upstream blog and video feeds returned zero valid items; existing published editions preserved.'
      );
    }

    const shouldPersist = !dryRun && !totalFeedFailure;

    let persistedIssue: DigestIssueSummaryDTO | undefined;
    if (shouldPersist) {
      persistedIssue = await this.repository.upsertWeeklyEdition({
        issueNumber,
        publishDate,
        weekStart,
        weekEnd,
        title,
        summary,
        conversationStarter,
        status: DigestIssueStatus.PUBLISHED,
        curatedAt: this.now(),
        articles: editionArticles,
        videos: editionVideos,
        dinnerPrompts: allDinnerPrompts,
        phrases: allPhrases,
      });
    }

    if (warnings.length > 0) {
      this.logger.warn(
        {
          event: 'digest_sync_warnings',
          issueNumber,
          dryRun,
          warningCount: warnings.length,
        },
        `Digest sync for issue #${issueNumber} completed with ${warnings.length} source warning(s).`
      );
    }

    return {
      issueNumber,
      dryRun,
      persisted: shouldPersist,
      publishDate: publishDate.toISOString(),
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
      title,
      summary,
      articles: {
        fetched: articlesFetched,
        rejected: articlesRejected,
        deduplicated: articlesDeduplicated,
        selected: editionArticles.length,
        persisted: shouldPersist ? editionArticles.length : 0,
      },
      videos: {
        fetched: videosFetched,
        rejected: videosRejected,
        deduplicated: videosDeduplicated,
        selected: editionVideos.length,
        persisted: shouldPersist ? editionVideos.length : 0,
      },
      dinnerPromptsPersisted: shouldPersist ? allDinnerPrompts.length : 0,
      phrasesPersisted: shouldPersist ? allPhrases.length : 0,
      perTier,
      warnings,
      ...(persistedIssue ? { issue: persistedIssue } : {}),
    };
  }

  private resolveWindow(
    rawStart?: Date | string,
    rawEnd?: Date | string
  ): { weekStart: Date; weekEnd: Date; publishDate: Date } {
    if (rawStart === undefined && rawEnd === undefined) {
      return computeWeeklyEditionWindow(this.now());
    }

    let weekStart: Date;
    let weekEnd: Date;

    if (rawStart !== undefined && rawEnd !== undefined) {
      weekStart = parseDateInput(rawStart, 'weekStart');
      weekEnd = parseDateInput(rawEnd, 'weekEnd');
    } else if (rawStart !== undefined) {
      weekStart = parseDateInput(rawStart, 'weekStart');
      weekEnd = new Date(weekStart.getTime() + 7 * MS_PER_DAY);
    } else {
      weekEnd = parseDateInput(rawEnd!, 'weekEnd');
      weekStart = new Date(weekEnd.getTime() - 7 * MS_PER_DAY);
    }

    if (weekStart.getTime() >= weekEnd.getTime()) {
      throw new DigestValidationError(
        'weekStart must be strictly earlier than weekEnd.'
      );
    }

    return {
      weekStart,
      weekEnd,
      publishDate: new Date(weekEnd.getTime()),
    };
  }

  private async resolveIssueNumber(
    explicitIssueNumber: number | undefined,
    weekStart: Date,
    weekEnd: Date
  ): Promise<number> {
    if (explicitIssueNumber !== undefined) {
      return explicitIssueNumber;
    }

    const existingForWindow = await this.repository.findIssueNumberByWindow(
      weekStart,
      weekEnd
    );
    if (existingForWindow !== null) {
      return existingForWindow;
    }

    const latest = await this.repository.findLatestIssueNumber();
    return (latest ?? 0) + 1;
  }

  private filterAndDedupBlogs(
    candidates: RawBlogCandidate[],
    windowStart: Date,
    windowEnd: Date,
    seenHashes: Set<string>,
    recentHashes: Set<string>,
    hooks: { onReject: () => void; onDedup: () => void }
  ): RawBlogCandidate[] {
    const clean: RawBlogCandidate[] = [];
    for (const candidate of candidates) {
      if (
        candidate.publishedAt.getTime() < windowStart.getTime() ||
        candidate.publishedAt.getTime() > windowEnd.getTime()
      ) {
        continue;
      }

      try {
        assertSafeExternalUrl(candidate.sourceUrl);
      } catch {
        hooks.onReject();
        continue;
      }

      if (
        seenHashes.has(candidate.canonicalHash) ||
        recentHashes.has(candidate.canonicalHash)
      ) {
        hooks.onDedup();
        continue;
      }

      seenHashes.add(candidate.canonicalHash);
      clean.push({
        ...candidate,
        rssExcerpt: sanitizeRssExcerpt(
          candidate.rssExcerpt,
          MAX_RSS_EXCERPT_CHARS
        ),
      });
    }
    return clean;
  }

  private filterAndDedupVideos(
    candidates: RawVideoCandidate[],
    windowStart: Date,
    windowEnd: Date,
    seenVideoIds: Set<string>,
    recentVideoIds: Set<string>,
    hooks: { onReject: () => void; onDedup: () => void }
  ): RawVideoCandidate[] {
    const clean: RawVideoCandidate[] = [];
    for (const candidate of candidates) {
      if (
        candidate.publishedAt.getTime() < windowStart.getTime() ||
        candidate.publishedAt.getTime() > windowEnd.getTime()
      ) {
        continue;
      }

      if (
        !candidate.isEmbeddable ||
        candidate.privacyStatus !== 'public' ||
        candidate.durationSeconds < MIN_VIDEO_DURATION_SECONDS
      ) {
        hooks.onReject();
        continue;
      }

      if (
        seenVideoIds.has(candidate.youtubeVideoId) ||
        recentVideoIds.has(candidate.youtubeVideoId)
      ) {
        hooks.onDedup();
        continue;
      }

      seenVideoIds.add(candidate.youtubeVideoId);
      clean.push(candidate);
    }
    return clean;
  }

  private findSparseTiers(
    items: Array<{ targetTiers: CanonicalDigestTier[] }>,
    minPerTier: number
  ): CanonicalDigestTier[] {
    return CANONICAL_DIGEST_TIERS.filter((tier) => {
      let count = 0;
      for (const item of items) {
        if (item.targetTiers.some((t) => resolveDigestTierBucket(t) === tier)) {
          count += 1;
        }
      }
      return count < minPerTier;
    });
  }
}
