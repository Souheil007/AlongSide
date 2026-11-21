import { randomUUID } from 'node:crypto';
import {
  prisma as defaultPrisma,
  Prisma,
  type PrismaClient,
  EXPLOIT_SEED_ALERTS,
  SLANG_SEED_TERMS,
  WEEKLY_DIGEST_SEED_EDITIONS,
  type DigestArticleSeedData,
  type DigestDinnerPromptSeedData,
  type DigestPhraseSeedData,
  type DigestVideoSeedData,
} from '@alongside/database';
import {
  DigestContentStatus,
  DigestIssueStatus,
  DigestItemType,
  matchesVideoDurationBucket,
  type CultureDigestDTO,
  type DevelopmentalTier,
  type DigestArticleDTO,
  type DigestArticlesResponseDTO,
  type DigestDinnerPromptDTO,
  type DigestInteractionResultDTO,
  type DigestIssueSummaryDTO,
  type DigestPhraseDTO,
  type DigestQueryScope,
  type DigestVideoDTO,
  type DigestVideoDurationBucket,
  type DigestVideosResponseDTO,
  type ExploitAlertDTO,
  type ExploitSeverity,
  type SavedDigestShortlistDTO,
  type SlangTermDTO,
  type VideoJumpChip,
  type WeeklyDigestEditionDTO,
} from '@alongside/shared';

export interface DigestArticlesQueryParams {
  issueNumber?: number;
  scope: DigestQueryScope;
  tier: DevelopmentalTier;
  unreadOnly?: boolean;
  q?: string;
  userId?: string;
}

export interface DigestVideosQueryParams {
  issueNumber?: number;
  scope: DigestQueryScope;
  tier: DevelopmentalTier;
  durationBucket?: DigestVideoDurationBucket;
  q?: string;
  userId?: string;
}

export interface UpsertDigestInteractionInput {
  itemType: DigestItemType;
  itemId: string;
  childId?: string;
  isRead?: boolean;
  isSaved?: boolean;
}

export interface UpsertWeeklyEditionArticleInput {
  canonicalHash: string;
  sourceUrl: string;
  sourceName: string;
  sourceDomain: string;
  authorName?: string | null;
  imageUrl?: string | null;
  publishedAt: Date;
  isOriginalEditorial?: boolean;
  topicLabel: string;
  readMinutes: number;
  title: string;
  summary: string;
  keyShift: string;
  perspectiveNote?: string | null;
  contentMarkdown?: string | null;
  sourcesText?: string | null;
  targetTiers: DevelopmentalTier[];
  isLead: boolean;
  sortOrder: number;
  ingestionStatus?: DigestContentStatus;
}

export interface UpsertWeeklyEditionVideoInput {
  youtubeVideoId: string;
  videoUrl: string;
  title: string;
  presenter: string;
  channelName: string;
  channelId?: string | null;
  publishedAt: Date;
  durationMinutes: number;
  formatLabel: string;
  takeaway: string;
  jumpChips?: VideoJumpChip[];
  skimBullets: string[];
  targetTiers: DevelopmentalTier[];
  isEmbeddable: boolean;
  sortOrder: number;
  ingestionStatus?: DigestContentStatus;
}

export interface UpsertWeeklyEditionDinnerPromptInput {
  question: string;
  parentTip: string;
  followUp: string;
  targetTiers: DevelopmentalTier[];
  sortOrder: number;
}

export interface UpsertWeeklyEditionPhraseInput {
  word: string;
  shortMeaning: string;
  fullMeaning: string;
  cringeLevel: number;
  cringeLabel: string;
  calmScript: string;
  targetTiers: DevelopmentalTier[];
  sortOrder: number;
}

export interface UpsertWeeklyEditionInput {
  issueNumber: number;
  publishDate: Date;
  weekStart: Date;
  weekEnd: Date;
  title: string;
  summary: string;
  conversationStarter: string;
  status?: DigestIssueStatus;
  curatedAt?: Date;
  articles: UpsertWeeklyEditionArticleInput[];
  videos: UpsertWeeklyEditionVideoInput[];
  dinnerPrompts: UpsertWeeklyEditionDinnerPromptInput[];
  phrases: UpsertWeeklyEditionPhraseInput[];
}

export interface DigestRepository {
  // Legacy PLAN-08 contracts (preserved backward-compatibly)
  findLatestDigest(): Promise<CultureDigestDTO | null>;
  searchSlang(term?: string): Promise<SlangTermDTO[]>;
  findExploits(severity?: ExploitSeverity): Promise<ExploitAlertDTO[]>;

  // Weekly Culture & Trends Hub contracts (PLAN-49)
  listPublishedIssues(tier?: DevelopmentalTier): Promise<DigestIssueSummaryDTO[]>;
  findEditionByIssueNumber(
    issueNumber: number | 'latest',
    tier: DevelopmentalTier,
    userId?: string
  ): Promise<WeeklyDigestEditionDTO | null>;
  findArticles(params: DigestArticlesQueryParams): Promise<DigestArticlesResponseDTO>;
  findVideos(params: DigestVideosQueryParams): Promise<DigestVideosResponseDTO>;
  findSavedShortlist(
    userId: string,
    tier?: DevelopmentalTier
  ): Promise<SavedDigestShortlistDTO>;
  itemExists(itemType: DigestItemType, itemId: string): Promise<boolean>;
  upsertInteraction(
    userId: string,
    input: UpsertDigestInteractionInput
  ): Promise<DigestInteractionResultDTO>;

  // Live Weekly Sourcing & Ingestion Persistence Seam (PLAN-50)
  findRecentCanonicalHashes(
    lookbackIssues?: number,
    excludeIssueNumber?: number
  ): Promise<Set<string>>;
  findRecentYouTubeVideoIds(
    lookbackIssues?: number,
    excludeIssueNumber?: number
  ): Promise<Set<string>>;
  findLatestIssueNumber(): Promise<number | null>;
  findIssueNumberByWindow(weekStart: Date, weekEnd: Date): Promise<number | null>;
  upsertWeeklyEdition(
    payload: UpsertWeeklyEditionInput
  ): Promise<DigestIssueSummaryDTO>;
}

function normalizeJumpChips(raw: unknown): VideoJumpChip[] | undefined {
  if (!Array.isArray(raw)) {
    return undefined;
  }
  const chips: VideoJumpChip[] = [];
  for (const entry of raw) {
    if (
      entry &&
      typeof entry === 'object' &&
      typeof (entry as { seconds?: unknown }).seconds === 'number' &&
      typeof (entry as { label?: unknown }).label === 'string'
    ) {
      chips.push({
        seconds: (entry as { seconds: number }).seconds,
        label: (entry as { label: string }).label,
      });
    }
  }
  return chips.length > 0 ? chips : undefined;
}

function matchesArticleSearch(article: DigestArticleDTO, q?: string): boolean {
  const needle = q?.trim().toLowerCase();
  if (!needle) {
    return true;
  }
  return (
    article.title.toLowerCase().includes(needle) ||
    article.summary.toLowerCase().includes(needle) ||
    article.keyShift.toLowerCase().includes(needle) ||
    article.topicLabel.toLowerCase().includes(needle) ||
    article.sourceName.toLowerCase().includes(needle)
  );
}

function matchesVideoSearch(video: DigestVideoDTO, q?: string): boolean {
  const needle = q?.trim().toLowerCase();
  if (!needle) {
    return true;
  }
  return (
    video.title.toLowerCase().includes(needle) ||
    video.presenter.toLowerCase().includes(needle) ||
    video.channelName.toLowerCase().includes(needle) ||
    video.formatLabel.toLowerCase().includes(needle) ||
    video.takeaway.toLowerCase().includes(needle)
  );
}

interface RawArticleFields {
  id: string;
  digestId: string;
  title: string;
  summary: string;
  keyShift: string;
  perspectiveNote?: string | null;
  topicLabel: string;
  readMinutes: number;
  sourceName: string;
  sourceDomain: string;
  sourceUrl: string;
  authorName?: string | null;
  imageUrl?: string | null;
  publishedAt: Date;
  isOriginalEditorial: boolean;
  contentMarkdown?: string | null;
  sourcesText?: string | null;
  targetTiers: string[];
  isLead: boolean;
  sortOrder: number;
}

interface RawVideoFields {
  id: string;
  digestId: string;
  youtubeVideoId: string;
  videoUrl: string;
  title: string;
  presenter: string;
  channelName: string;
  channelId?: string | null;
  publishedAt: Date;
  durationMinutes: number;
  formatLabel: string;
  takeaway: string;
  jumpChips?: unknown;
  skimBullets: string[];
  targetTiers: string[];
  isEmbeddable: boolean;
  sortOrder: number;
}

interface RawDinnerPromptFields {
  id: string;
  digestId: string;
  question: string;
  parentTip: string;
  followUp: string;
  targetTiers: string[];
  sortOrder: number;
}

function toArticleDto(
  article: RawArticleFields,
  issueNumber: number,
  state?: { isRead: boolean; isSaved: boolean }
): DigestArticleDTO {
  return {
    id: article.id,
    digestId: article.digestId,
    issueNumber,
    title: article.title,
    summary: article.summary,
    keyShift: article.keyShift,
    perspectiveNote: article.perspectiveNote ?? null,
    topicLabel: article.topicLabel,
    readMinutes: article.readMinutes,
    sourceName: article.sourceName,
    sourceDomain: article.sourceDomain,
    sourceUrl: article.sourceUrl,
    authorName: article.authorName ?? null,
    imageUrl: article.imageUrl ?? null,
    publishedAt: article.publishedAt.toISOString(),
    isOriginalEditorial: article.isOriginalEditorial,
    contentMarkdown: article.contentMarkdown ?? null,
    sourcesText: article.sourcesText ?? null,
    targetTiers: article.targetTiers as DevelopmentalTier[],
    isLead: article.isLead,
    sortOrder: article.sortOrder,
    isRead: state?.isRead ?? false,
    isSaved: state?.isSaved ?? false,
  };
}

function toVideoDto(
  video: RawVideoFields,
  issueNumber: number,
  isSaved = false
): DigestVideoDTO {
  return {
    id: video.id,
    digestId: video.digestId,
    issueNumber,
    youtubeVideoId: video.youtubeVideoId,
    videoUrl: video.videoUrl,
    title: video.title,
    presenter: video.presenter,
    channelName: video.channelName,
    channelId: video.channelId ?? null,
    publishedAt: video.publishedAt.toISOString(),
    durationMinutes: video.durationMinutes,
    formatLabel: video.formatLabel,
    takeaway: video.takeaway,
    jumpChips: normalizeJumpChips(video.jumpChips),
    skimBullets: video.skimBullets,
    targetTiers: video.targetTiers as DevelopmentalTier[],
    isEmbeddable: video.isEmbeddable,
    sortOrder: video.sortOrder,
    isSaved,
  };
}

function toDinnerPromptDto(
  prompt: RawDinnerPromptFields,
  issueNumber: number,
  isSaved = false
): DigestDinnerPromptDTO {
  return {
    id: prompt.id,
    digestId: prompt.digestId,
    issueNumber,
    question: prompt.question,
    parentTip: prompt.parentTip,
    followUp: prompt.followUp,
    targetTiers: prompt.targetTiers as DevelopmentalTier[],
    sortOrder: prompt.sortOrder,
    isSaved,
  };
}

// ----------------------------------------------------
// PRODUCTION ADAPTER: PRISMA DIGEST REPOSITORY
// ----------------------------------------------------

export class PrismaDigestRepository implements DigestRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findLatestDigest(): Promise<CultureDigestDTO | null> {
    const digest = await this.prisma.cultureDigest.findFirst({
      orderBy: { issueNumber: 'desc' },
      include: {
        slangTerms: true,
        exploitAlerts: true,
      },
    });

    if (!digest) {
      return null;
    }

    return {
      id: digest.id,
      issueNumber: digest.issueNumber,
      publishDate: digest.publishDate.toISOString(),
      title: digest.title,
      summary: digest.summary,
      conversationStarter: digest.conversationStarter,
      slangTerms: digest.slangTerms.map((s) => ({
        id: s.id,
        term: s.term,
        definition: s.definition,
        exampleSentence: s.exampleSentence,
        contextTone: s.contextTone,
      })),
      exploitAlerts: digest.exploitAlerts.map((e) => ({
        id: e.id,
        appName: e.appName,
        exploitDescription: e.exploitDescription,
        howKidsBypass: e.howKidsBypass,
        parentRemedy: e.parentRemedy,
        severity: e.severity as ExploitSeverity,
      })),
    };
  }

  async searchSlang(term?: string): Promise<SlangTermDTO[]> {
    const where = term?.trim()
      ? {
          OR: [
            { term: { contains: term.trim(), mode: 'insensitive' as const } },
            { definition: { contains: term.trim(), mode: 'insensitive' as const } },
          ],
        }
      : {};

    const terms = await this.prisma.slangTerm.findMany({
      where,
      orderBy: { term: 'asc' },
    });

    return terms.map((s) => ({
      id: s.id,
      term: s.term,
      definition: s.definition,
      exampleSentence: s.exampleSentence,
      contextTone: s.contextTone,
    }));
  }

  async findExploits(severity?: ExploitSeverity): Promise<ExploitAlertDTO[]> {
    const where = severity ? { severity } : {};

    const alerts = await this.prisma.exploitAlert.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return alerts.map((e) => ({
      id: e.id,
      appName: e.appName,
      exploitDescription: e.exploitDescription,
      howKidsBypass: e.howKidsBypass,
      parentRemedy: e.parentRemedy,
      severity: e.severity as ExploitSeverity,
    }));
  }

  async listPublishedIssues(
    tier?: DevelopmentalTier
  ): Promise<DigestIssueSummaryDTO[]> {
    const digests = await this.prisma.cultureDigest.findMany({
      where: { status: DigestIssueStatus.PUBLISHED },
      orderBy: { issueNumber: 'desc' },
      include: {
        articles: {
          where: {
            ingestionStatus: DigestContentStatus.APPROVED,
            ...(tier ? { targetTiers: { has: tier } } : {}),
          },
          select: { id: true },
        },
        videos: {
          where: {
            ingestionStatus: DigestContentStatus.APPROVED,
            isEmbeddable: true,
            ...(tier ? { targetTiers: { has: tier } } : {}),
          },
          select: { id: true },
        },
      },
    });

    return digests.map((digest) => ({
      id: digest.id,
      issueNumber: digest.issueNumber,
      publishDate: digest.publishDate.toISOString(),
      weekStart: digest.weekStart.toISOString(),
      weekEnd: digest.weekEnd.toISOString(),
      title: digest.title,
      summary: digest.summary,
      status: digest.status as DigestIssueStatus,
      articleCount: digest.articles.length,
      videoCount: digest.videos.length,
    }));
  }

  async findEditionByIssueNumber(
    issueNumber: number | 'latest',
    tier: DevelopmentalTier,
    userId?: string
  ): Promise<WeeklyDigestEditionDTO | null> {
    const digest = await this.prisma.cultureDigest.findFirst({
      where:
        issueNumber === 'latest'
          ? { status: DigestIssueStatus.PUBLISHED }
          : {
              issueNumber,
              status: {
                in: [DigestIssueStatus.PUBLISHED, DigestIssueStatus.ARCHIVED],
              },
            },
      orderBy: { issueNumber: 'desc' },
      include: {
        articles: {
          where: {
            ingestionStatus: DigestContentStatus.APPROVED,
            targetTiers: { has: tier },
          },
          orderBy: [
            { isLead: 'desc' },
            { sortOrder: 'asc' },
            { publishedAt: 'desc' },
          ],
        },
        videos: {
          where: {
            ingestionStatus: DigestContentStatus.APPROVED,
            isEmbeddable: true,
            targetTiers: { has: tier },
          },
          orderBy: [{ sortOrder: 'asc' }, { publishedAt: 'desc' }],
        },
        dinnerPrompts: {
          where: { targetTiers: { has: tier } },
          orderBy: { sortOrder: 'asc' },
        },
        phrases: {
          where: { targetTiers: { has: tier } },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!digest) {
      return null;
    }

    const interactions = userId
      ? await this.loadInteractionMap(userId, [
          ...digest.articles.map((a) => a.id),
          ...digest.videos.map((v) => v.id),
          ...digest.dinnerPrompts.map((p) => p.id),
        ])
      : new Map<string, { isRead: boolean; isSaved: boolean }>();

    const articles = digest.articles.map((article) =>
      toArticleDto(
        article,
        digest.issueNumber,
        interactions.get(`${DigestItemType.ARTICLE}:${article.id}`)
      )
    );

    const videos = digest.videos.map((video) =>
      toVideoDto(
        video,
        digest.issueNumber,
        interactions.get(`${DigestItemType.VIDEO}:${video.id}`)?.isSaved ?? false
      )
    );

    const dinnerPrompts = digest.dinnerPrompts.map((prompt) =>
      toDinnerPromptDto(
        prompt,
        digest.issueNumber,
        interactions.get(`${DigestItemType.DINNER_PROMPT}:${prompt.id}`)
          ?.isSaved ?? false
      )
    );

    const phrases: DigestPhraseDTO[] = digest.phrases.map((phrase) => ({
      id: phrase.id,
      digestId: phrase.digestId,
      issueNumber: digest.issueNumber,
      word: phrase.word,
      shortMeaning: phrase.shortMeaning,
      fullMeaning: phrase.fullMeaning,
      cringeLevel: phrase.cringeLevel,
      cringeLabel: phrase.cringeLabel,
      calmScript: phrase.calmScript,
      targetTiers: phrase.targetTiers as DevelopmentalTier[],
      sortOrder: phrase.sortOrder,
    }));

    return {
      issue: {
        id: digest.id,
        issueNumber: digest.issueNumber,
        publishDate: digest.publishDate.toISOString(),
        weekStart: digest.weekStart.toISOString(),
        weekEnd: digest.weekEnd.toISOString(),
        title: digest.title,
        summary: digest.summary,
        status: digest.status as DigestIssueStatus,
        articleCount: articles.length,
        videoCount: videos.length,
      },
      resolvedTier: tier,
      videos,
      articles,
      dinnerPrompts,
      phrases,
      readArticleCount: articles.filter((a) => a.isRead).length,
      totalArticleCount: articles.length,
    };
  }

  async findArticles(
    params: DigestArticlesQueryParams
  ): Promise<DigestArticlesResponseDTO> {
    let targetIssueNumber = params.issueNumber;

    if (params.scope === 'issue' && targetIssueNumber === undefined) {
      const latest = await this.prisma.cultureDigest.findFirst({
        where: { status: DigestIssueStatus.PUBLISHED },
        orderBy: { issueNumber: 'desc' },
        select: { issueNumber: true },
      });
      if (!latest) {
        return { articles: [], unreadCount: 0, totalInScope: 0 };
      }
      targetIssueNumber = latest.issueNumber;
    }

    const rows = await this.prisma.digestArticle.findMany({
      where: {
        ingestionStatus: DigestContentStatus.APPROVED,
        targetTiers: { has: params.tier },
        digest:
          params.scope === 'issue'
            ? {
                issueNumber: targetIssueNumber,
                status: {
                  in: [DigestIssueStatus.PUBLISHED, DigestIssueStatus.ARCHIVED],
                },
              }
            : { status: DigestIssueStatus.PUBLISHED },
      },
      include: {
        digest: { select: { issueNumber: true } },
      },
      orderBy: [
        { digest: { issueNumber: 'desc' } },
        { isLead: 'desc' },
        { sortOrder: 'asc' },
        { publishedAt: 'desc' },
      ],
    });

    const interactions = params.userId
      ? await this.loadInteractionMap(
          params.userId,
          rows.map((r) => r.id)
        )
      : new Map<string, { isRead: boolean; isSaved: boolean }>();

    const allScoped = rows.map((article) =>
      toArticleDto(
        article,
        article.digest.issueNumber,
        interactions.get(`${DigestItemType.ARTICLE}:${article.id}`)
      )
    );

    const totalInScope = allScoped.length;
    const unreadCount = allScoped.filter((a) => !a.isRead).length;
    const filtered = allScoped.filter((article) => {
      if (params.unreadOnly && article.isRead) {
        return false;
      }
      return matchesArticleSearch(article, params.q);
    });

    return {
      articles: filtered,
      unreadCount,
      totalInScope,
      ...(params.scope === 'issue' && targetIssueNumber !== undefined
        ? { issueNumber: targetIssueNumber }
        : {}),
    };
  }

  async findVideos(
    params: DigestVideosQueryParams
  ): Promise<DigestVideosResponseDTO> {
    let targetIssueNumber = params.issueNumber;

    if (params.scope === 'issue' && targetIssueNumber === undefined) {
      const latest = await this.prisma.cultureDigest.findFirst({
        where: { status: DigestIssueStatus.PUBLISHED },
        orderBy: { issueNumber: 'desc' },
        select: { issueNumber: true },
      });
      if (!latest) {
        return { videos: [], totalInScope: 0 };
      }
      targetIssueNumber = latest.issueNumber;
    }

    const rows = await this.prisma.digestVideo.findMany({
      where: {
        ingestionStatus: DigestContentStatus.APPROVED,
        isEmbeddable: true,
        targetTiers: { has: params.tier },
        digest:
          params.scope === 'issue'
            ? {
                issueNumber: targetIssueNumber,
                status: {
                  in: [DigestIssueStatus.PUBLISHED, DigestIssueStatus.ARCHIVED],
                },
              }
            : { status: DigestIssueStatus.PUBLISHED },
      },
      include: {
        digest: { select: { issueNumber: true } },
      },
      orderBy: [
        { digest: { issueNumber: 'desc' } },
        { sortOrder: 'asc' },
        { publishedAt: 'desc' },
      ],
    });

    const interactions = params.userId
      ? await this.loadInteractionMap(
          params.userId,
          rows.map((r) => r.id)
        )
      : new Map<string, { isRead: boolean; isSaved: boolean }>();

    const allScoped = rows.map((video) =>
      toVideoDto(
        video,
        video.digest.issueNumber,
        interactions.get(`${DigestItemType.VIDEO}:${video.id}`)?.isSaved ?? false
      )
    );

    const totalInScope = allScoped.length;
    const filtered = allScoped.filter((video) => {
      if (
        !matchesVideoDurationBucket(
          video.durationMinutes,
          params.durationBucket ?? 'all'
        )
      ) {
        return false;
      }
      return matchesVideoSearch(video, params.q);
    });

    return {
      videos: filtered,
      totalInScope,
      ...(params.scope === 'issue' && targetIssueNumber !== undefined
        ? { issueNumber: targetIssueNumber }
        : {}),
    };
  }

  async findSavedShortlist(
    userId: string,
    tier?: DevelopmentalTier
  ): Promise<SavedDigestShortlistDTO> {
    const allSaved = await this.prisma.userDigestInteraction.findMany({
      where: { userId, isSaved: true },
      orderBy: { savedAt: 'desc' },
    });

    const savedOrder = new Map<string, number>();
    const readStatusByArticleId = new Map<string, boolean>();
    const articleIds: string[] = [];
    const videoIds: string[] = [];
    const promptIds: string[] = [];

    allSaved.forEach((entry, idx) => {
      savedOrder.set(`${entry.itemType}:${entry.itemId}`, idx);
      if (entry.itemType === DigestItemType.ARTICLE) {
        articleIds.push(entry.itemId);
        readStatusByArticleId.set(entry.itemId, entry.isRead);
      } else if (entry.itemType === DigestItemType.VIDEO) {
        videoIds.push(entry.itemId);
      } else if (entry.itemType === DigestItemType.DINNER_PROMPT) {
        promptIds.push(entry.itemId);
      }
    });

    const [articleRows, videoRows, promptRows] = await Promise.all([
      articleIds.length > 0
        ? this.prisma.digestArticle.findMany({
            where: {
              id: { in: articleIds },
              ingestionStatus: DigestContentStatus.APPROVED,
              ...(tier ? { targetTiers: { has: tier } } : {}),
            },
            include: { digest: { select: { issueNumber: true } } },
          })
        : Promise.resolve([]),
      videoIds.length > 0
        ? this.prisma.digestVideo.findMany({
            where: {
              id: { in: videoIds },
              ingestionStatus: DigestContentStatus.APPROVED,
              isEmbeddable: true,
              ...(tier ? { targetTiers: { has: tier } } : {}),
            },
            include: { digest: { select: { issueNumber: true } } },
          })
        : Promise.resolve([]),
      promptIds.length > 0
        ? this.prisma.digestDinnerPrompt.findMany({
            where: {
              id: { in: promptIds },
              ...(tier ? { targetTiers: { has: tier } } : {}),
            },
            include: { digest: { select: { issueNumber: true } } },
          })
        : Promise.resolve([]),
    ]);

    const articles = articleRows
      .sort(
        (a, b) =>
          (savedOrder.get(`${DigestItemType.ARTICLE}:${a.id}`) ?? 0) -
          (savedOrder.get(`${DigestItemType.ARTICLE}:${b.id}`) ?? 0)
      )
      .map((article) =>
        toArticleDto(article, article.digest.issueNumber, {
          isRead: readStatusByArticleId.get(article.id) ?? false,
          isSaved: true,
        })
      );

    const videos = videoRows
      .sort(
        (a, b) =>
          (savedOrder.get(`${DigestItemType.VIDEO}:${a.id}`) ?? 0) -
          (savedOrder.get(`${DigestItemType.VIDEO}:${b.id}`) ?? 0)
      )
      .map((video) => toVideoDto(video, video.digest.issueNumber, true));

    const dinnerPrompts = promptRows
      .sort(
        (a, b) =>
          (savedOrder.get(`${DigestItemType.DINNER_PROMPT}:${a.id}`) ?? 0) -
          (savedOrder.get(`${DigestItemType.DINNER_PROMPT}:${b.id}`) ?? 0)
      )
      .map((prompt) =>
        toDinnerPromptDto(prompt, prompt.digest.issueNumber, true)
      );

    return {
      articles,
      videos,
      dinnerPrompts,
      totalCount: articles.length + videos.length + dinnerPrompts.length,
    };
  }

  async itemExists(
    itemType: DigestItemType,
    itemId: string
  ): Promise<boolean> {
    switch (itemType) {
      case DigestItemType.ARTICLE: {
        const found = await this.prisma.digestArticle.findFirst({
          where: { id: itemId, ingestionStatus: DigestContentStatus.APPROVED },
          select: { id: true },
        });
        return found !== null;
      }
      case DigestItemType.VIDEO: {
        const found = await this.prisma.digestVideo.findFirst({
          where: {
            id: itemId,
            ingestionStatus: DigestContentStatus.APPROVED,
            isEmbeddable: true,
          },
          select: { id: true },
        });
        return found !== null;
      }
      case DigestItemType.DINNER_PROMPT: {
        const found = await this.prisma.digestDinnerPrompt.findUnique({
          where: { id: itemId },
          select: { id: true },
        });
        return found !== null;
      }
      default:
        return false;
    }
  }

  async upsertInteraction(
    userId: string,
    input: UpsertDigestInteractionInput
  ): Promise<DigestInteractionResultDTO> {
    const now = new Date();
    const initialIsRead = input.isRead ?? false;
    const initialIsSaved = input.isSaved ?? false;

    const record = await this.prisma.userDigestInteraction.upsert({
      where: {
        userId_itemType_itemId: {
          userId,
          itemType: input.itemType,
          itemId: input.itemId,
        },
      },
      update: {
        ...(input.childId !== undefined ? { childId: input.childId } : {}),
        ...(input.isRead !== undefined
          ? { isRead: input.isRead, readAt: input.isRead ? now : null }
          : {}),
        ...(input.isSaved !== undefined
          ? { isSaved: input.isSaved, savedAt: input.isSaved ? now : null }
          : {}),
      },
      create: {
        userId,
        childId: input.childId ?? null,
        itemType: input.itemType,
        itemId: input.itemId,
        isRead: initialIsRead,
        readAt: initialIsRead ? now : null,
        isSaved: initialIsSaved,
        savedAt: initialIsSaved ? now : null,
      },
    });

    return {
      itemType: record.itemType as DigestItemType,
      itemId: record.itemId,
      isRead: record.isRead,
      isSaved: record.isSaved,
    };
  }

  async findRecentCanonicalHashes(
    lookbackIssues = 4,
    excludeIssueNumber?: number
  ): Promise<Set<string>> {
    const digests = await this.prisma.cultureDigest.findMany({
      where: {
        status: DigestIssueStatus.PUBLISHED,
        ...(excludeIssueNumber !== undefined
          ? { issueNumber: { not: excludeIssueNumber } }
          : {}),
      },
      orderBy: { issueNumber: 'desc' },
      take: Math.max(0, lookbackIssues),
      select: {
        articles: {
          select: { canonicalHash: true },
        },
      },
    });

    const hashes = new Set<string>();
    for (const digest of digests) {
      for (const article of digest.articles) {
        hashes.add(article.canonicalHash);
      }
    }
    return hashes;
  }

  async findRecentYouTubeVideoIds(
    lookbackIssues = 4,
    excludeIssueNumber?: number
  ): Promise<Set<string>> {
    const digests = await this.prisma.cultureDigest.findMany({
      where: {
        status: DigestIssueStatus.PUBLISHED,
        ...(excludeIssueNumber !== undefined
          ? { issueNumber: { not: excludeIssueNumber } }
          : {}),
      },
      orderBy: { issueNumber: 'desc' },
      take: Math.max(0, lookbackIssues),
      select: {
        videos: {
          select: { youtubeVideoId: true },
        },
      },
    });

    const videoIds = new Set<string>();
    for (const digest of digests) {
      for (const video of digest.videos) {
        videoIds.add(video.youtubeVideoId);
      }
    }
    return videoIds;
  }

  async findLatestIssueNumber(): Promise<number | null> {
    const latest = await this.prisma.cultureDigest.findFirst({
      orderBy: { issueNumber: 'desc' },
      select: { issueNumber: true },
    });
    return latest?.issueNumber ?? null;
  }

  async findIssueNumberByWindow(
    weekStart: Date,
    weekEnd: Date
  ): Promise<number | null> {
    const existing = await this.prisma.cultureDigest.findFirst({
      where: {
        weekStart,
        weekEnd,
      },
      orderBy: { issueNumber: 'desc' },
      select: { issueNumber: true },
    });
    return existing?.issueNumber ?? null;
  }

  async upsertWeeklyEdition(
    payload: UpsertWeeklyEditionInput
  ): Promise<DigestIssueSummaryDTO> {
    const status = payload.status ?? DigestIssueStatus.PUBLISHED;
    const curatedAt = payload.curatedAt ?? new Date();

    return this.prisma.$transaction(async (tx) => {
      const digest = await tx.cultureDigest.upsert({
        where: { issueNumber: payload.issueNumber },
        update: {
          publishDate: payload.publishDate,
          weekStart: payload.weekStart,
          weekEnd: payload.weekEnd,
          title: payload.title,
          summary: payload.summary,
          conversationStarter: payload.conversationStarter,
          status,
          curatedAt,
        },
        create: {
          issueNumber: payload.issueNumber,
          publishDate: payload.publishDate,
          weekStart: payload.weekStart,
          weekEnd: payload.weekEnd,
          title: payload.title,
          summary: payload.summary,
          conversationStarter: payload.conversationStarter,
          status,
          curatedAt,
        },
      });

      const incomingArticleHashes = payload.articles.map((a) => a.canonicalHash);
      await tx.digestArticle.deleteMany({
        where: {
          digestId: digest.id,
          ...(incomingArticleHashes.length > 0
            ? { canonicalHash: { notIn: incomingArticleHashes } }
            : {}),
        },
      });

      for (const article of payload.articles) {
        const ingestionStatus =
          article.ingestionStatus ?? DigestContentStatus.APPROVED;
        await tx.digestArticle.upsert({
          where: {
            digestId_canonicalHash: {
              digestId: digest.id,
              canonicalHash: article.canonicalHash,
            },
          },
          update: {
            sourceUrl: article.sourceUrl,
            sourceName: article.sourceName,
            sourceDomain: article.sourceDomain,
            authorName: article.authorName ?? null,
            imageUrl: article.imageUrl ?? null,
            publishedAt: article.publishedAt,
            isOriginalEditorial: article.isOriginalEditorial ?? false,
            topicLabel: article.topicLabel,
            readMinutes: article.readMinutes,
            title: article.title,
            summary: article.summary,
            keyShift: article.keyShift,
            perspectiveNote: article.perspectiveNote ?? null,
            contentMarkdown: article.contentMarkdown ?? null,
            sourcesText: article.sourcesText ?? null,
            targetTiers: article.targetTiers,
            isLead: article.isLead,
            sortOrder: article.sortOrder,
            ingestionStatus,
          },
          create: {
            digestId: digest.id,
            canonicalHash: article.canonicalHash,
            sourceUrl: article.sourceUrl,
            sourceName: article.sourceName,
            sourceDomain: article.sourceDomain,
            authorName: article.authorName ?? null,
            imageUrl: article.imageUrl ?? null,
            publishedAt: article.publishedAt,
            isOriginalEditorial: article.isOriginalEditorial ?? false,
            topicLabel: article.topicLabel,
            readMinutes: article.readMinutes,
            title: article.title,
            summary: article.summary,
            keyShift: article.keyShift,
            perspectiveNote: article.perspectiveNote ?? null,
            contentMarkdown: article.contentMarkdown ?? null,
            sourcesText: article.sourcesText ?? null,
            targetTiers: article.targetTiers,
            isLead: article.isLead,
            sortOrder: article.sortOrder,
            ingestionStatus,
          },
        });
      }

      const incomingVideoIds = payload.videos.map((v) => v.youtubeVideoId);
      await tx.digestVideo.deleteMany({
        where: {
          digestId: digest.id,
          ...(incomingVideoIds.length > 0
            ? { youtubeVideoId: { notIn: incomingVideoIds } }
            : {}),
        },
      });

      for (const video of payload.videos) {
        const ingestionStatus =
          video.ingestionStatus ?? DigestContentStatus.APPROVED;
        const jumpChipsJson =
          video.jumpChips && video.jumpChips.length > 0
            ? (video.jumpChips as unknown as Prisma.InputJsonValue)
            : Prisma.JsonNull;

        await tx.digestVideo.upsert({
          where: {
            digestId_youtubeVideoId: {
              digestId: digest.id,
              youtubeVideoId: video.youtubeVideoId,
            },
          },
          update: {
            videoUrl: video.videoUrl,
            title: video.title,
            presenter: video.presenter,
            channelName: video.channelName,
            channelId: video.channelId ?? null,
            publishedAt: video.publishedAt,
            durationMinutes: video.durationMinutes,
            formatLabel: video.formatLabel,
            takeaway: video.takeaway,
            jumpChips: jumpChipsJson,
            skimBullets: video.skimBullets,
            targetTiers: video.targetTiers,
            isEmbeddable: video.isEmbeddable,
            sortOrder: video.sortOrder,
            ingestionStatus,
          },
          create: {
            digestId: digest.id,
            youtubeVideoId: video.youtubeVideoId,
            videoUrl: video.videoUrl,
            title: video.title,
            presenter: video.presenter,
            channelName: video.channelName,
            channelId: video.channelId ?? null,
            publishedAt: video.publishedAt,
            durationMinutes: video.durationMinutes,
            formatLabel: video.formatLabel,
            takeaway: video.takeaway,
            jumpChips: jumpChipsJson,
            skimBullets: video.skimBullets,
            targetTiers: video.targetTiers,
            isEmbeddable: video.isEmbeddable,
            sortOrder: video.sortOrder,
            ingestionStatus,
          },
        });
      }

      await tx.digestDinnerPrompt.deleteMany({
        where: { digestId: digest.id },
      });
      if (payload.dinnerPrompts.length > 0) {
        await tx.digestDinnerPrompt.createMany({
          data: payload.dinnerPrompts.map((prompt) => ({
            digestId: digest.id,
            question: prompt.question,
            parentTip: prompt.parentTip,
            followUp: prompt.followUp,
            targetTiers: prompt.targetTiers,
            sortOrder: prompt.sortOrder,
          })),
        });
      }

      await tx.digestPhrase.deleteMany({
        where: { digestId: digest.id },
      });
      if (payload.phrases.length > 0) {
        await tx.digestPhrase.createMany({
          data: payload.phrases.map((phrase) => ({
            digestId: digest.id,
            word: phrase.word,
            shortMeaning: phrase.shortMeaning,
            fullMeaning: phrase.fullMeaning,
            cringeLevel: phrase.cringeLevel,
            cringeLabel: phrase.cringeLabel,
            calmScript: phrase.calmScript,
            targetTiers: phrase.targetTiers,
            sortOrder: phrase.sortOrder,
          })),
        });
      }

      const approvedArticleCount = payload.articles.filter(
        (a) =>
          (a.ingestionStatus ?? DigestContentStatus.APPROVED) ===
          DigestContentStatus.APPROVED
      ).length;
      const approvedVideoCount = payload.videos.filter(
        (v) =>
          (v.ingestionStatus ?? DigestContentStatus.APPROVED) ===
            DigestContentStatus.APPROVED && v.isEmbeddable
      ).length;

      return {
        id: digest.id,
        issueNumber: digest.issueNumber,
        publishDate: digest.publishDate.toISOString(),
        weekStart: digest.weekStart.toISOString(),
        weekEnd: digest.weekEnd.toISOString(),
        title: digest.title,
        summary: digest.summary,
        status: digest.status as DigestIssueStatus,
        articleCount: approvedArticleCount,
        videoCount: approvedVideoCount,
      };
    });
  }

  private async loadInteractionMap(
    userId: string,
    itemIds: string[]
  ): Promise<Map<string, { isRead: boolean; isSaved: boolean }>> {
    const map = new Map<string, { isRead: boolean; isSaved: boolean }>();
    if (itemIds.length === 0) {
      return map;
    }

    const records = await this.prisma.userDigestInteraction.findMany({
      where: {
        userId,
        itemId: { in: itemIds },
      },
      select: {
        itemType: true,
        itemId: true,
        isRead: true,
        isSaved: true,
      },
    });

    for (const record of records) {
      map.set(`${record.itemType}:${record.itemId}`, {
        isRead: record.isRead,
        isSaved: record.isSaved,
      });
    }
    return map;
  }
}

// ----------------------------------------------------
// IN-MEMORY TEST FAKE ADAPTER (FULL PARITY)
// ----------------------------------------------------

interface StoredDigestIssue {
  id: string;
  issueNumber: number;
  publishDate: Date;
  weekStart: Date;
  weekEnd: Date;
  title: string;
  summary: string;
  conversationStarter: string;
  status: DigestIssueStatus;
  curatedAt: Date | null;
}

interface StoredArticle extends DigestArticleSeedData {
  digestId: string;
  issueNumber: number;
}

interface StoredVideo extends DigestVideoSeedData {
  digestId: string;
  issueNumber: number;
}

interface StoredDinnerPrompt extends DigestDinnerPromptSeedData {
  digestId: string;
  issueNumber: number;
}

interface StoredPhrase extends DigestPhraseSeedData {
  digestId: string;
  issueNumber: number;
}

interface StoredInteraction {
  userId: string;
  childId: string | null;
  itemType: DigestItemType;
  itemId: string;
  isRead: boolean;
  readAt: Date | null;
  isSaved: boolean;
  savedAt: Date | null;
}

export class InMemoryDigestRepository implements DigestRepository {
  private digests: Map<string, StoredDigestIssue> = new Map();

  private slangTerms: Map<
    string,
    {
      id: string;
      digestId?: string;
      term: string;
      definition: string;
      exampleSentence: string;
      contextTone: string;
    }
  > = new Map();

  private exploitAlerts: Map<
    string,
    {
      id: string;
      digestId?: string;
      appName: string;
      exploitDescription: string;
      howKidsBypass: string;
      parentRemedy: string;
      severity: ExploitSeverity;
      createdAt: Date;
    }
  > = new Map();

  private articles: Map<string, StoredArticle> = new Map();
  private videos: Map<string, StoredVideo> = new Map();
  private dinnerPrompts: Map<string, StoredDinnerPrompt> = new Map();
  private phrases: Map<string, StoredPhrase> = new Map();
  private interactions: Map<string, StoredInteraction> = new Map();

  constructor(autoSeed = true) {
    if (autoSeed) {
      this.seedDefaultData();
    }
  }

  private seedDefaultData(): void {
    for (const edition of WEEKLY_DIGEST_SEED_EDITIONS) {
      this.digests.set(edition.id, {
        id: edition.id,
        issueNumber: edition.issueNumber,
        publishDate: edition.publishDate,
        weekStart: edition.weekStart,
        weekEnd: edition.weekEnd,
        title: edition.title,
        summary: edition.summary,
        conversationStarter: edition.conversationStarter,
        status: edition.status,
        curatedAt: edition.curatedAt,
      });

      for (const article of edition.articles) {
        this.articles.set(article.id, {
          ...article,
          digestId: edition.id,
          issueNumber: edition.issueNumber,
        });
      }

      for (const video of edition.videos) {
        this.videos.set(video.id, {
          ...video,
          digestId: edition.id,
          issueNumber: edition.issueNumber,
        });
      }

      for (const prompt of edition.dinnerPrompts) {
        this.dinnerPrompts.set(prompt.id, {
          ...prompt,
          digestId: edition.id,
          issueNumber: edition.issueNumber,
        });
      }

      for (const phrase of edition.phrases) {
        this.phrases.set(phrase.id, {
          ...phrase,
          digestId: edition.id,
          issueNumber: edition.issueNumber,
        });
      }
    }

    const issue42Id = 'digest-issue-42';

    for (const slang of SLANG_SEED_TERMS) {
      const id = `slang-${slang.term.toLowerCase()}`;
      this.slangTerms.set(id, {
        id,
        digestId: issue42Id,
        term: slang.term,
        definition: slang.definition,
        exampleSentence: slang.exampleSentence,
        contextTone: slang.contextTone,
      });
    }

    for (let i = 0; i < EXPLOIT_SEED_ALERTS.length; i++) {
      const alert = EXPLOIT_SEED_ALERTS[i]!;
      const id = `exploit-${i + 1}`;
      this.exploitAlerts.set(id, {
        id,
        digestId: issue42Id,
        appName: alert.appName,
        exploitDescription: alert.exploitDescription,
        howKidsBypass: alert.howKidsBypass,
        parentRemedy: alert.parentRemedy,
        severity: alert.severity,
        createdAt: new Date(Date.now() - i * 1000),
      });
    }
  }

  /** Test helper to insert custom fixture records (e.g. non-embeddable videos or pending articles). */
  seedTestItems(items: {
    article?: StoredArticle;
    video?: StoredVideo;
    phrase?: StoredPhrase;
  }): void {
    if (items.article) {
      this.articles.set(items.article.id, items.article);
    }
    if (items.video) {
      this.videos.set(items.video.id, items.video);
    }
    if (items.phrase) {
      this.phrases.set(items.phrase.id, items.phrase);
    }
  }

  async findLatestDigest(): Promise<CultureDigestDTO | null> {
    const sortedDigests = Array.from(this.digests.values()).sort(
      (a, b) => b.issueNumber - a.issueNumber
    );

    const latest = sortedDigests[0];
    if (!latest) {
      return null;
    }

    const slang = Array.from(this.slangTerms.values()).filter(
      (s) => s.digestId === latest.id
    );
    const exploits = Array.from(this.exploitAlerts.values()).filter(
      (e) => e.digestId === latest.id
    );

    return {
      id: latest.id,
      issueNumber: latest.issueNumber,
      publishDate: latest.publishDate.toISOString(),
      title: latest.title,
      summary: latest.summary,
      conversationStarter: latest.conversationStarter,
      slangTerms: slang.map((s) => ({
        id: s.id,
        term: s.term,
        definition: s.definition,
        exampleSentence: s.exampleSentence,
        contextTone: s.contextTone,
      })),
      exploitAlerts: exploits.map((e) => ({
        id: e.id,
        appName: e.appName,
        exploitDescription: e.exploitDescription,
        howKidsBypass: e.howKidsBypass,
        parentRemedy: e.parentRemedy,
        severity: e.severity,
      })),
    };
  }

  async searchSlang(term?: string): Promise<SlangTermDTO[]> {
    let results = Array.from(this.slangTerms.values());

    if (term?.trim()) {
      const q = term.trim().toLowerCase();
      results = results.filter(
        (s) =>
          s.term.toLowerCase().includes(q) ||
          s.definition.toLowerCase().includes(q)
      );
    }

    return results
      .sort((a, b) => a.term.localeCompare(b.term))
      .map((s) => ({
        id: s.id,
        term: s.term,
        definition: s.definition,
        exampleSentence: s.exampleSentence,
        contextTone: s.contextTone,
      }));
  }

  async findExploits(severity?: ExploitSeverity): Promise<ExploitAlertDTO[]> {
    let results = Array.from(this.exploitAlerts.values());

    if (severity) {
      results = results.filter((e) => e.severity === severity);
    }

    return results
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((e) => ({
        id: e.id,
        appName: e.appName,
        exploitDescription: e.exploitDescription,
        howKidsBypass: e.howKidsBypass,
        parentRemedy: e.parentRemedy,
        severity: e.severity,
      }));
  }

  async listPublishedIssues(
    tier?: DevelopmentalTier
  ): Promise<DigestIssueSummaryDTO[]> {
    const published = Array.from(this.digests.values())
      .filter((d) => d.status === DigestIssueStatus.PUBLISHED)
      .sort((a, b) => b.issueNumber - a.issueNumber);

    return published.map((digest) => {
      const articleCount = Array.from(this.articles.values()).filter(
        (a) =>
          a.digestId === digest.id &&
          a.ingestionStatus === DigestContentStatus.APPROVED &&
          (!tier || a.targetTiers.includes(tier))
      ).length;

      const videoCount = Array.from(this.videos.values()).filter(
        (v) =>
          v.digestId === digest.id &&
          v.ingestionStatus === DigestContentStatus.APPROVED &&
          v.isEmbeddable &&
          (!tier || v.targetTiers.includes(tier))
      ).length;

      return {
        id: digest.id,
        issueNumber: digest.issueNumber,
        publishDate: digest.publishDate.toISOString(),
        weekStart: digest.weekStart.toISOString(),
        weekEnd: digest.weekEnd.toISOString(),
        title: digest.title,
        summary: digest.summary,
        status: digest.status,
        articleCount,
        videoCount,
      };
    });
  }

  async findEditionByIssueNumber(
    issueNumber: number | 'latest',
    tier: DevelopmentalTier,
    userId?: string
  ): Promise<WeeklyDigestEditionDTO | null> {
    const candidates = Array.from(this.digests.values()).sort(
      (a, b) => b.issueNumber - a.issueNumber
    );

    const digest =
      issueNumber === 'latest'
        ? candidates.find((d) => d.status === DigestIssueStatus.PUBLISHED)
        : candidates.find(
            (d) =>
              d.issueNumber === issueNumber &&
              (d.status === DigestIssueStatus.PUBLISHED ||
                d.status === DigestIssueStatus.ARCHIVED)
          );

    if (!digest) {
      return null;
    }

    const articles = Array.from(this.articles.values())
      .filter(
        (a) =>
          a.digestId === digest.id &&
          a.ingestionStatus === DigestContentStatus.APPROVED &&
          a.targetTiers.includes(tier)
      )
      .sort((a, b) => {
        if (a.isLead !== b.isLead) return a.isLead ? -1 : 1;
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
        return b.publishedAt.getTime() - a.publishedAt.getTime();
      })
      .map((a) =>
        toArticleDto(
          a,
          a.issueNumber,
          this.getInteraction(userId, DigestItemType.ARTICLE, a.id)
        )
      );

    const videos = Array.from(this.videos.values())
      .filter(
        (v) =>
          v.digestId === digest.id &&
          v.ingestionStatus === DigestContentStatus.APPROVED &&
          v.isEmbeddable &&
          v.targetTiers.includes(tier)
      )
      .sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
        return b.publishedAt.getTime() - a.publishedAt.getTime();
      })
      .map((v) =>
        toVideoDto(
          v,
          v.issueNumber,
          this.getInteraction(userId, DigestItemType.VIDEO, v.id)?.isSaved ??
            false
        )
      );

    const dinnerPrompts = Array.from(this.dinnerPrompts.values())
      .filter((p) => p.digestId === digest.id && p.targetTiers.includes(tier))
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((p) =>
        toDinnerPromptDto(
          p,
          p.issueNumber,
          this.getInteraction(userId, DigestItemType.DINNER_PROMPT, p.id)
            ?.isSaved ?? false
        )
      );

    const phrases: DigestPhraseDTO[] = Array.from(this.phrases.values())
      .filter((p) => p.digestId === digest.id && p.targetTiers.includes(tier))
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((p) => ({
        id: p.id,
        digestId: p.digestId,
        issueNumber: p.issueNumber,
        word: p.word,
        shortMeaning: p.shortMeaning,
        fullMeaning: p.fullMeaning,
        cringeLevel: p.cringeLevel,
        cringeLabel: p.cringeLabel,
        calmScript: p.calmScript,
        targetTiers: p.targetTiers,
        sortOrder: p.sortOrder,
      }));

    return {
      issue: {
        id: digest.id,
        issueNumber: digest.issueNumber,
        publishDate: digest.publishDate.toISOString(),
        weekStart: digest.weekStart.toISOString(),
        weekEnd: digest.weekEnd.toISOString(),
        title: digest.title,
        summary: digest.summary,
        status: digest.status,
        articleCount: articles.length,
        videoCount: videos.length,
      },
      resolvedTier: tier,
      videos,
      articles,
      dinnerPrompts,
      phrases,
      readArticleCount: articles.filter((a) => a.isRead).length,
      totalArticleCount: articles.length,
    };
  }

  async findArticles(
    params: DigestArticlesQueryParams
  ): Promise<DigestArticlesResponseDTO> {
    let targetIssueNumber = params.issueNumber;

    if (params.scope === 'issue' && targetIssueNumber === undefined) {
      const latest = Array.from(this.digests.values())
        .filter((d) => d.status === DigestIssueStatus.PUBLISHED)
        .sort((a, b) => b.issueNumber - a.issueNumber)[0];
      if (!latest) {
        return { articles: [], unreadCount: 0, totalInScope: 0 };
      }
      targetIssueNumber = latest.issueNumber;
    }

    const allowedDigestIds = new Set(
      Array.from(this.digests.values())
        .filter((d) =>
          params.scope === 'issue'
            ? d.issueNumber === targetIssueNumber &&
              (d.status === DigestIssueStatus.PUBLISHED ||
                d.status === DigestIssueStatus.ARCHIVED)
            : d.status === DigestIssueStatus.PUBLISHED
        )
        .map((d) => d.id)
    );

    const allScoped = Array.from(this.articles.values())
      .filter(
        (a) =>
          allowedDigestIds.has(a.digestId) &&
          a.ingestionStatus === DigestContentStatus.APPROVED &&
          a.targetTiers.includes(params.tier)
      )
      .sort((a, b) => {
        if (a.issueNumber !== b.issueNumber) return b.issueNumber - a.issueNumber;
        if (a.isLead !== b.isLead) return a.isLead ? -1 : 1;
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
        return b.publishedAt.getTime() - a.publishedAt.getTime();
      })
      .map((a) =>
        toArticleDto(
          a,
          a.issueNumber,
          this.getInteraction(params.userId, DigestItemType.ARTICLE, a.id)
        )
      );

    const totalInScope = allScoped.length;
    const unreadCount = allScoped.filter((a) => !a.isRead).length;
    const filtered = allScoped.filter((article) => {
      if (params.unreadOnly && article.isRead) {
        return false;
      }
      return matchesArticleSearch(article, params.q);
    });

    return {
      articles: filtered,
      unreadCount,
      totalInScope,
      ...(params.scope === 'issue' && targetIssueNumber !== undefined
        ? { issueNumber: targetIssueNumber }
        : {}),
    };
  }

  async findVideos(
    params: DigestVideosQueryParams
  ): Promise<DigestVideosResponseDTO> {
    let targetIssueNumber = params.issueNumber;

    if (params.scope === 'issue' && targetIssueNumber === undefined) {
      const latest = Array.from(this.digests.values())
        .filter((d) => d.status === DigestIssueStatus.PUBLISHED)
        .sort((a, b) => b.issueNumber - a.issueNumber)[0];
      if (!latest) {
        return { videos: [], totalInScope: 0 };
      }
      targetIssueNumber = latest.issueNumber;
    }

    const allowedDigestIds = new Set(
      Array.from(this.digests.values())
        .filter((d) =>
          params.scope === 'issue'
            ? d.issueNumber === targetIssueNumber &&
              (d.status === DigestIssueStatus.PUBLISHED ||
                d.status === DigestIssueStatus.ARCHIVED)
            : d.status === DigestIssueStatus.PUBLISHED
        )
        .map((d) => d.id)
    );

    const allScoped = Array.from(this.videos.values())
      .filter(
        (v) =>
          allowedDigestIds.has(v.digestId) &&
          v.ingestionStatus === DigestContentStatus.APPROVED &&
          v.isEmbeddable &&
          v.targetTiers.includes(params.tier)
      )
      .sort((a, b) => {
        if (a.issueNumber !== b.issueNumber) return b.issueNumber - a.issueNumber;
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
        return b.publishedAt.getTime() - a.publishedAt.getTime();
      })
      .map((v) =>
        toVideoDto(
          v,
          v.issueNumber,
          this.getInteraction(params.userId, DigestItemType.VIDEO, v.id)
            ?.isSaved ?? false
        )
      );

    const totalInScope = allScoped.length;
    const filtered = allScoped.filter((video) => {
      if (
        !matchesVideoDurationBucket(
          video.durationMinutes,
          params.durationBucket ?? 'all'
        )
      ) {
        return false;
      }
      return matchesVideoSearch(video, params.q);
    });

    return {
      videos: filtered,
      totalInScope,
      ...(params.scope === 'issue' && targetIssueNumber !== undefined
        ? { issueNumber: targetIssueNumber }
        : {}),
    };
  }

  async findSavedShortlist(
    userId: string,
    tier?: DevelopmentalTier
  ): Promise<SavedDigestShortlistDTO> {
    const savedRecords = Array.from(this.interactions.values())
      .filter((entry) => entry.userId === userId && entry.isSaved)
      .sort(
        (a, b) =>
          (b.savedAt?.getTime() ?? 0) - (a.savedAt?.getTime() ?? 0)
      );

    const articles: DigestArticleDTO[] = [];
    const videos: DigestVideoDTO[] = [];
    const dinnerPrompts: DigestDinnerPromptDTO[] = [];

    for (const entry of savedRecords) {
      if (entry.itemType === DigestItemType.ARTICLE) {
        const article = this.articles.get(entry.itemId);
        if (
          article &&
          article.ingestionStatus === DigestContentStatus.APPROVED &&
          (!tier || article.targetTiers.includes(tier))
        ) {
          articles.push(
            toArticleDto(article, article.issueNumber, {
              isRead: entry.isRead,
              isSaved: true,
            })
          );
        }
      } else if (entry.itemType === DigestItemType.VIDEO) {
        const video = this.videos.get(entry.itemId);
        if (
          video &&
          video.ingestionStatus === DigestContentStatus.APPROVED &&
          video.isEmbeddable &&
          (!tier || video.targetTiers.includes(tier))
        ) {
          videos.push(toVideoDto(video, video.issueNumber, true));
        }
      } else if (entry.itemType === DigestItemType.DINNER_PROMPT) {
        const prompt = this.dinnerPrompts.get(entry.itemId);
        if (prompt && (!tier || prompt.targetTiers.includes(tier))) {
          dinnerPrompts.push(toDinnerPromptDto(prompt, prompt.issueNumber, true));
        }
      }
    }

    return {
      articles,
      videos,
      dinnerPrompts,
      totalCount: articles.length + videos.length + dinnerPrompts.length,
    };
  }

  async itemExists(
    itemType: DigestItemType,
    itemId: string
  ): Promise<boolean> {
    switch (itemType) {
      case DigestItemType.ARTICLE: {
        const found = this.articles.get(itemId);
        return (
          found !== undefined &&
          found.ingestionStatus === DigestContentStatus.APPROVED
        );
      }
      case DigestItemType.VIDEO: {
        const found = this.videos.get(itemId);
        return (
          found !== undefined &&
          found.ingestionStatus === DigestContentStatus.APPROVED &&
          found.isEmbeddable
        );
      }
      case DigestItemType.DINNER_PROMPT:
        return this.dinnerPrompts.has(itemId);
      default:
        return false;
    }
  }

  async upsertInteraction(
    userId: string,
    input: UpsertDigestInteractionInput
  ): Promise<DigestInteractionResultDTO> {
    const key = this.interactionKey(userId, input.itemType, input.itemId);
    const existing = this.interactions.get(key);
    const now = new Date();

    const nextIsRead = input.isRead ?? existing?.isRead ?? false;
    const nextIsSaved = input.isSaved ?? existing?.isSaved ?? false;

    const record: StoredInteraction = {
      userId,
      childId: input.childId ?? existing?.childId ?? null,
      itemType: input.itemType,
      itemId: input.itemId,
      isRead: nextIsRead,
      readAt:
        input.isRead !== undefined
          ? input.isRead
            ? now
            : null
          : existing?.readAt ?? null,
      isSaved: nextIsSaved,
      savedAt:
        input.isSaved !== undefined
          ? input.isSaved
            ? now
            : null
          : existing?.savedAt ?? null,
    };

    this.interactions.set(key, record);

    return {
      itemType: record.itemType,
      itemId: record.itemId,
      isRead: record.isRead,
      isSaved: record.isSaved,
    };
  }

  async findRecentCanonicalHashes(
    lookbackIssues = 4,
    excludeIssueNumber?: number
  ): Promise<Set<string>> {
    const recentDigests = Array.from(this.digests.values())
      .filter(
        (d) =>
          d.status === DigestIssueStatus.PUBLISHED &&
          (excludeIssueNumber === undefined ||
            d.issueNumber !== excludeIssueNumber)
      )
      .sort((a, b) => b.issueNumber - a.issueNumber)
      .slice(0, Math.max(0, lookbackIssues));

    const recentIds = new Set(recentDigests.map((d) => d.id));
    const hashes = new Set<string>();
    for (const article of this.articles.values()) {
      if (recentIds.has(article.digestId)) {
        hashes.add(article.canonicalHash);
      }
    }
    return hashes;
  }

  async findRecentYouTubeVideoIds(
    lookbackIssues = 4,
    excludeIssueNumber?: number
  ): Promise<Set<string>> {
    const recentDigests = Array.from(this.digests.values())
      .filter(
        (d) =>
          d.status === DigestIssueStatus.PUBLISHED &&
          (excludeIssueNumber === undefined ||
            d.issueNumber !== excludeIssueNumber)
      )
      .sort((a, b) => b.issueNumber - a.issueNumber)
      .slice(0, Math.max(0, lookbackIssues));

    const recentIds = new Set(recentDigests.map((d) => d.id));
    const videoIds = new Set<string>();
    for (const video of this.videos.values()) {
      if (recentIds.has(video.digestId)) {
        videoIds.add(video.youtubeVideoId);
      }
    }
    return videoIds;
  }

  async findLatestIssueNumber(): Promise<number | null> {
    let maxIssue: number | null = null;
    for (const digest of this.digests.values()) {
      if (maxIssue === null || digest.issueNumber > maxIssue) {
        maxIssue = digest.issueNumber;
      }
    }
    return maxIssue;
  }

  async findIssueNumberByWindow(
    weekStart: Date,
    weekEnd: Date
  ): Promise<number | null> {
    const matches = Array.from(this.digests.values())
      .filter(
        (d) =>
          d.weekStart.getTime() === weekStart.getTime() &&
          d.weekEnd.getTime() === weekEnd.getTime()
      )
      .sort((a, b) => b.issueNumber - a.issueNumber);

    return matches[0]?.issueNumber ?? null;
  }

  async upsertWeeklyEdition(
    payload: UpsertWeeklyEditionInput
  ): Promise<DigestIssueSummaryDTO> {
    const existingDigest = Array.from(this.digests.values()).find(
      (d) => d.issueNumber === payload.issueNumber
    );
    const digestId = existingDigest?.id ?? `digest-issue-${payload.issueNumber}`;
    const status = payload.status ?? DigestIssueStatus.PUBLISHED;
    const curatedAt = payload.curatedAt ?? new Date();

    const storedDigest: StoredDigestIssue = {
      id: digestId,
      issueNumber: payload.issueNumber,
      publishDate: payload.publishDate,
      weekStart: payload.weekStart,
      weekEnd: payload.weekEnd,
      title: payload.title,
      summary: payload.summary,
      conversationStarter: payload.conversationStarter,
      status,
      curatedAt,
    };
    this.digests.set(digestId, storedDigest);

    // Preserve existing IDs for matching canonicalHash on idempotent re-runs
    const existingArticleIdByHash = new Map<string, string>();
    for (const [id, article] of this.articles.entries()) {
      if (article.digestId === digestId) {
        existingArticleIdByHash.set(article.canonicalHash, id);
        this.articles.delete(id);
      }
    }

    for (const article of payload.articles) {
      const id =
        existingArticleIdByHash.get(article.canonicalHash) ??
        `art-${payload.issueNumber}-${randomUUID().slice(0, 8)}`;
      this.articles.set(id, {
        id,
        digestId,
        issueNumber: payload.issueNumber,
        canonicalHash: article.canonicalHash,
        sourceUrl: article.sourceUrl,
        sourceName: article.sourceName,
        sourceDomain: article.sourceDomain,
        authorName: article.authorName ?? null,
        imageUrl: article.imageUrl ?? null,
        publishedAt: article.publishedAt,
        isOriginalEditorial: article.isOriginalEditorial ?? false,
        topicLabel: article.topicLabel,
        readMinutes: article.readMinutes,
        title: article.title,
        summary: article.summary,
        keyShift: article.keyShift,
        perspectiveNote: article.perspectiveNote ?? null,
        contentMarkdown: article.contentMarkdown ?? null,
        sourcesText: article.sourcesText ?? null,
        targetTiers: article.targetTiers,
        isLead: article.isLead,
        sortOrder: article.sortOrder,
        ingestionStatus:
          article.ingestionStatus ?? DigestContentStatus.APPROVED,
      });
    }

    // Preserve existing IDs for matching youtubeVideoId on idempotent re-runs
    const existingVideoIdByYtId = new Map<string, string>();
    for (const [id, video] of this.videos.entries()) {
      if (video.digestId === digestId) {
        existingVideoIdByYtId.set(video.youtubeVideoId, id);
        this.videos.delete(id);
      }
    }

    for (const video of payload.videos) {
      const id =
        existingVideoIdByYtId.get(video.youtubeVideoId) ??
        `vid-${payload.issueNumber}-${randomUUID().slice(0, 8)}`;
      this.videos.set(id, {
        id,
        digestId,
        issueNumber: payload.issueNumber,
        youtubeVideoId: video.youtubeVideoId,
        videoUrl: video.videoUrl,
        title: video.title,
        presenter: video.presenter,
        channelName: video.channelName,
        channelId: video.channelId ?? null,
        publishedAt: video.publishedAt,
        durationMinutes: video.durationMinutes,
        formatLabel: video.formatLabel,
        takeaway: video.takeaway,
        jumpChips:
          video.jumpChips && video.jumpChips.length > 0
            ? video.jumpChips
            : undefined,
        skimBullets: video.skimBullets,
        targetTiers: video.targetTiers,
        isEmbeddable: video.isEmbeddable,
        sortOrder: video.sortOrder,
        ingestionStatus: video.ingestionStatus ?? DigestContentStatus.APPROVED,
      });
    }

    for (const [id, prompt] of this.dinnerPrompts.entries()) {
      if (prompt.digestId === digestId) {
        this.dinnerPrompts.delete(id);
      }
    }
    payload.dinnerPrompts.forEach((prompt, idx) => {
      const id = `dp-${payload.issueNumber}-${idx + 1}`;
      this.dinnerPrompts.set(id, {
        id,
        digestId,
        issueNumber: payload.issueNumber,
        question: prompt.question,
        parentTip: prompt.parentTip,
        followUp: prompt.followUp,
        targetTiers: prompt.targetTiers,
        sortOrder: prompt.sortOrder,
      });
    });

    for (const [id, phrase] of this.phrases.entries()) {
      if (phrase.digestId === digestId) {
        this.phrases.delete(id);
      }
    }
    payload.phrases.forEach((phrase, idx) => {
      const id = `ph-${payload.issueNumber}-${idx + 1}`;
      this.phrases.set(id, {
        id,
        digestId,
        issueNumber: payload.issueNumber,
        word: phrase.word,
        shortMeaning: phrase.shortMeaning,
        fullMeaning: phrase.fullMeaning,
        cringeLevel: phrase.cringeLevel,
        cringeLabel: phrase.cringeLabel,
        calmScript: phrase.calmScript,
        targetTiers: phrase.targetTiers,
        sortOrder: phrase.sortOrder,
      });
    });

    const approvedArticleCount = payload.articles.filter(
      (a) =>
        (a.ingestionStatus ?? DigestContentStatus.APPROVED) ===
        DigestContentStatus.APPROVED
    ).length;
    const approvedVideoCount = payload.videos.filter(
      (v) =>
        (v.ingestionStatus ?? DigestContentStatus.APPROVED) ===
          DigestContentStatus.APPROVED && v.isEmbeddable
    ).length;

    return {
      id: storedDigest.id,
      issueNumber: storedDigest.issueNumber,
      publishDate: storedDigest.publishDate.toISOString(),
      weekStart: storedDigest.weekStart.toISOString(),
      weekEnd: storedDigest.weekEnd.toISOString(),
      title: storedDigest.title,
      summary: storedDigest.summary,
      status: storedDigest.status,
      articleCount: approvedArticleCount,
      videoCount: approvedVideoCount,
    };
  }

  private interactionKey(
    userId: string,
    itemType: DigestItemType,
    itemId: string
  ): string {
    return `${userId}:${itemType}:${itemId}`;
  }

  private getInteraction(
    userId: string | undefined,
    itemType: DigestItemType,
    itemId: string
  ): StoredInteraction | undefined {
    if (!userId) return undefined;
    return this.interactions.get(this.interactionKey(userId, itemType, itemId));
  }
}
