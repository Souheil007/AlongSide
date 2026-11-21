import {
  DEFAULT_DIGEST_TIER,
  DigestItemType,
  resolveDigestTierBucket,
  type CultureDigestDTO,
  type DevelopmentalTier,
  type DigestArticleDTO,
  type DigestArticlesResponseDTO,
  type DigestDinnerPromptDTO,
  type DigestInteractionResultDTO,
  type DigestIssueSummaryDTO,
  type DigestQueryScope,
  type DigestVideoDTO,
  type DigestVideoDurationBucket,
  type DigestVideosResponseDTO,
  type ExploitAlertDTO,
  type ExploitSeverity,
  type SavedDigestShortlistDTO,
  type SlangTermDTO,
  type WeeklyDigestEditionDTO,
} from '@alongside/shared';
import { ApiClientError, apiClient } from './client';

// ----------------------------------------------------
// LEGACY PLAN-08 EXPORTS (PRESERVED)
// ----------------------------------------------------

export interface LatestDigestResponse {
  digest: CultureDigestDTO;
}

export interface SlangSearchResponse {
  slangTerms: SlangTermDTO[];
}

export interface ExploitAlertsResponse {
  exploitAlerts: ExploitAlertDTO[];
}

/**
 * Fetch the latest Sunday Youth Culture Digest issue.
 */
export async function getLatestDigest(): Promise<LatestDigestResponse> {
  return await apiClient<LatestDigestResponse>('/api/v1/digest/latest', {
    method: 'GET',
  });
}

/**
 * Search or list tween slang terms.
 */
export async function searchSlang(
  q?: string,
  term?: string
): Promise<SlangSearchResponse> {
  const queryParam = q || term;
  const params: Record<string, string | undefined> = {};
  if (queryParam) {
    params.q = queryParam;
    params.term = queryParam;
  }
  return await apiClient<SlangSearchResponse>('/api/v1/digest/slang', {
    method: 'GET',
    params,
  });
}

/**
 * Fetch digital exploit early warnings, optionally filtered by severity.
 */
export async function getExploitAlerts(
  severity?: ExploitSeverity
): Promise<ExploitAlertsResponse> {
  const params: Record<string, string | undefined> = {};
  if (severity) {
    params.severity = severity;
  }
  return await apiClient<ExploitAlertsResponse>('/api/v1/digest/exploits', {
    method: 'GET',
    params,
  });
}

// ----------------------------------------------------
// GUEST LOCAL STORAGE FALLBACK HELPERS (PLAN-51)
// ----------------------------------------------------

export const DIGEST_GUEST_STORAGE_KEY = 'alongside_digest_guest_interactions_v1';

const MAX_GUEST_SAVED_ITEMS = 100;
const MAX_GUEST_READ_ARTICLES = 500;
const MAX_SNAPSHOT_MARKDOWN_CHARS = 8000;

export interface GuestInteractionSnapshot {
  readArticleIds: Set<string>;
  savedArticleIds: Set<string>;
  savedVideoIds: Set<string>;
  savedDinnerIds: Set<string>;
  savedArticleSnapshots?: Map<string, DigestArticleDTO>;
  savedVideoSnapshots?: Map<string, DigestVideoDTO>;
  savedDinnerSnapshots?: Map<string, DigestDinnerPromptDTO>;
}

interface StoredGuestInteractions {
  readArticles: string[];
  savedArticles: string[];
  savedVideos: string[];
  savedDinners: string[];
  articleSnapshots?: Record<string, DigestArticleDTO>;
  videoSnapshots?: Record<string, DigestVideoDTO>;
  dinnerSnapshots?: Record<string, DigestDinnerPromptDTO>;
}

function emptyGuestSnapshot(): GuestInteractionSnapshot {
  return {
    readArticleIds: new Set(),
    savedArticleIds: new Set(),
    savedVideoIds: new Set(),
    savedDinnerIds: new Set(),
    savedArticleSnapshots: new Map(),
    savedVideoSnapshots: new Map(),
    savedDinnerSnapshots: new Map(),
  };
}

function toLightweightArticleSnapshot(
  article: DigestArticleDTO,
  isReadOverride?: boolean
): DigestArticleDTO {
  const contentMarkdown =
    article.contentMarkdown && article.contentMarkdown.length > MAX_SNAPSHOT_MARKDOWN_CHARS
      ? article.contentMarkdown.slice(0, MAX_SNAPSHOT_MARKDOWN_CHARS)
      : article.contentMarkdown;

  return {
    ...article,
    contentMarkdown,
    isRead: isReadOverride !== undefined ? isReadOverride : article.isRead,
    isSaved: true,
  };
}

function toLightweightVideoSnapshot(video: DigestVideoDTO): DigestVideoDTO {
  return {
    ...video,
    isSaved: true,
  };
}

function toLightweightDinnerSnapshot(
  prompt: DigestDinnerPromptDTO
): DigestDinnerPromptDTO {
  return {
    ...prompt,
    isSaved: true,
  };
}

function trimRecentSet(ids: Set<string>, maxSize: number): string[] {
  const arr = Array.from(ids);
  return arr.length > maxSize ? arr.slice(arr.length - maxSize) : arr;
}

function trimSavedBucketsToCap(
  savedArticles: string[],
  savedVideos: string[],
  savedDinners: string[],
  maxTotal: number
): {
  savedArticles: string[];
  savedVideos: string[];
  savedDinners: string[];
} {
  const nextArticles = savedArticles.slice(-maxTotal);
  const nextVideos = savedVideos.slice(-maxTotal);
  const nextDinners = savedDinners.slice(-maxTotal);

  while (nextArticles.length + nextVideos.length + nextDinners.length > maxTotal) {
    if (
      nextArticles.length >= nextVideos.length &&
      nextArticles.length >= nextDinners.length &&
      nextArticles.length > 0
    ) {
      nextArticles.shift();
    } else if (nextVideos.length >= nextDinners.length && nextVideos.length > 0) {
      nextVideos.shift();
    } else if (nextDinners.length > 0) {
      nextDinners.shift();
    } else {
      break;
    }
  }

  return {
    savedArticles: nextArticles,
    savedVideos: nextVideos,
    savedDinners: nextDinners,
  };
}

function pickSnapshotsForIds<T>(
  ids: string[],
  source?: Map<string, T>
): Record<string, T> {
  const result: Record<string, T> = {};
  if (!source) return result;
  for (const id of ids) {
    const item = source.get(id);
    if (item) {
      result[id] = item;
    }
  }
  return result;
}

export function readGuestDigestInteractions(): GuestInteractionSnapshot {
  if (typeof window === 'undefined') {
    return emptyGuestSnapshot();
  }
  try {
    const raw = window.localStorage.getItem(DIGEST_GUEST_STORAGE_KEY);
    if (!raw) {
      return emptyGuestSnapshot();
    }
    const parsed = JSON.parse(raw) as Partial<StoredGuestInteractions>;

    const readArticleIds = new Set(
      Array.isArray(parsed.readArticles)
        ? parsed.readArticles.filter((v): v is string => typeof v === 'string')
        : []
    );
    const savedArticleIds = new Set(
      Array.isArray(parsed.savedArticles)
        ? parsed.savedArticles.filter((v): v is string => typeof v === 'string')
        : []
    );
    const savedVideoIds = new Set(
      Array.isArray(parsed.savedVideos)
        ? parsed.savedVideos.filter((v): v is string => typeof v === 'string')
        : []
    );
    const savedDinnerIds = new Set(
      Array.isArray(parsed.savedDinners)
        ? parsed.savedDinners.filter((v): v is string => typeof v === 'string')
        : []
    );

    const savedArticleSnapshots = new Map<string, DigestArticleDTO>();
    if (parsed.articleSnapshots && typeof parsed.articleSnapshots === 'object') {
      for (const [id, item] of Object.entries(parsed.articleSnapshots)) {
        if (savedArticleIds.has(id) && item && typeof item === 'object' && item.id === id) {
          savedArticleSnapshots.set(id, item);
        }
      }
    }

    const savedVideoSnapshots = new Map<string, DigestVideoDTO>();
    if (parsed.videoSnapshots && typeof parsed.videoSnapshots === 'object') {
      for (const [id, item] of Object.entries(parsed.videoSnapshots)) {
        if (savedVideoIds.has(id) && item && typeof item === 'object' && item.id === id) {
          savedVideoSnapshots.set(id, item);
        }
      }
    }

    const savedDinnerSnapshots = new Map<string, DigestDinnerPromptDTO>();
    if (parsed.dinnerSnapshots && typeof parsed.dinnerSnapshots === 'object') {
      for (const [id, item] of Object.entries(parsed.dinnerSnapshots)) {
        if (savedDinnerIds.has(id) && item && typeof item === 'object' && item.id === id) {
          savedDinnerSnapshots.set(id, item);
        }
      }
    }

    return {
      readArticleIds,
      savedArticleIds,
      savedVideoIds,
      savedDinnerIds,
      savedArticleSnapshots,
      savedVideoSnapshots,
      savedDinnerSnapshots,
    };
  } catch {
    return emptyGuestSnapshot();
  }
}

export function writeGuestDigestInteraction(input: {
  itemType: DigestItemType;
  itemId: string;
  isRead?: boolean;
  isSaved?: boolean;
  articleSnapshot?: DigestArticleDTO;
  videoSnapshot?: DigestVideoDTO;
  dinnerSnapshot?: DigestDinnerPromptDTO;
}): DigestInteractionResultDTO {
  const snapshot = readGuestDigestInteractions();
  const articleSnapshots = snapshot.savedArticleSnapshots ?? new Map<string, DigestArticleDTO>();
  const videoSnapshots = snapshot.savedVideoSnapshots ?? new Map<string, DigestVideoDTO>();
  const dinnerSnapshots = snapshot.savedDinnerSnapshots ?? new Map<string, DigestDinnerPromptDTO>();

  if (input.itemType === DigestItemType.ARTICLE) {
    if (input.isRead === true) {
      snapshot.readArticleIds.delete(input.itemId);
      snapshot.readArticleIds.add(input.itemId);
      const existing = articleSnapshots.get(input.itemId);
      if (existing) {
        articleSnapshots.set(input.itemId, { ...existing, isRead: true });
      }
    }
    if (input.isRead === false) {
      snapshot.readArticleIds.delete(input.itemId);
      const existing = articleSnapshots.get(input.itemId);
      if (existing) {
        articleSnapshots.set(input.itemId, { ...existing, isRead: false });
      }
    }
    if (input.isSaved === true) {
      snapshot.savedArticleIds.delete(input.itemId);
      snapshot.savedArticleIds.add(input.itemId);
      if (input.articleSnapshot) {
        articleSnapshots.set(
          input.itemId,
          toLightweightArticleSnapshot(
            input.articleSnapshot,
            input.isRead !== undefined
              ? input.isRead
              : snapshot.readArticleIds.has(input.itemId) || input.articleSnapshot.isRead
          )
        );
      }
    }
    if (input.isSaved === false) {
      snapshot.savedArticleIds.delete(input.itemId);
      articleSnapshots.delete(input.itemId);
    }
  } else if (input.itemType === DigestItemType.VIDEO) {
    if (input.isSaved === true) {
      snapshot.savedVideoIds.delete(input.itemId);
      snapshot.savedVideoIds.add(input.itemId);
      if (input.videoSnapshot) {
        videoSnapshots.set(input.itemId, toLightweightVideoSnapshot(input.videoSnapshot));
      }
    }
    if (input.isSaved === false) {
      snapshot.savedVideoIds.delete(input.itemId);
      videoSnapshots.delete(input.itemId);
    }
  } else if (input.itemType === DigestItemType.DINNER_PROMPT) {
    if (input.isSaved === true) {
      snapshot.savedDinnerIds.delete(input.itemId);
      snapshot.savedDinnerIds.add(input.itemId);
      if (input.dinnerSnapshot) {
        dinnerSnapshots.set(input.itemId, toLightweightDinnerSnapshot(input.dinnerSnapshot));
      }
    }
    if (input.isSaved === false) {
      snapshot.savedDinnerIds.delete(input.itemId);
      dinnerSnapshots.delete(input.itemId);
    }
  }

  const trimmedReadArticles = trimRecentSet(snapshot.readArticleIds, MAX_GUEST_READ_ARTICLES);
  const { savedArticles, savedVideos, savedDinners } = trimSavedBucketsToCap(
    Array.from(snapshot.savedArticleIds),
    Array.from(snapshot.savedVideoIds),
    Array.from(snapshot.savedDinnerIds),
    MAX_GUEST_SAVED_ITEMS
  );

  if (typeof window !== 'undefined') {
    try {
      const payload: StoredGuestInteractions = {
        readArticles: trimmedReadArticles,
        savedArticles,
        savedVideos,
        savedDinners,
        articleSnapshots: pickSnapshotsForIds(savedArticles, articleSnapshots),
        videoSnapshots: pickSnapshotsForIds(savedVideos, videoSnapshots),
        dinnerSnapshots: pickSnapshotsForIds(savedDinners, dinnerSnapshots),
      };
      window.localStorage.setItem(DIGEST_GUEST_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Safe fallback when storage is unavailable
    }
  }

  const isSaved =
    input.itemType === DigestItemType.ARTICLE
      ? savedArticles.includes(input.itemId)
      : input.itemType === DigestItemType.VIDEO
        ? savedVideos.includes(input.itemId)
        : savedDinners.includes(input.itemId);

  const isRead =
    input.itemType === DigestItemType.ARTICLE
      ? trimmedReadArticles.includes(input.itemId)
      : false;

  return {
    itemType: input.itemType,
    itemId: input.itemId,
    isRead,
    isSaved,
  };
}

function matchesGuestTierBucket(
  targetTiers: DevelopmentalTier[] | undefined,
  tier?: DevelopmentalTier
): boolean {
  if (!tier || !targetTiers || targetTiers.length === 0) return true;
  const bucket = resolveDigestTierBucket(tier);
  return targetTiers.some((t) => resolveDigestTierBucket(t) === bucket);
}

async function buildGuestSavedShortlist(
  tier: DevelopmentalTier | undefined,
  guest: GuestInteractionSnapshot
): Promise<SavedDigestShortlistDTO> {
  const articles: DigestArticleDTO[] = [];
  const videos: DigestVideoDTO[] = [];
  const dinnerPrompts: DigestDinnerPromptDTO[] = [];

  const missingArticleIds = new Set<string>();
  const missingVideoIds = new Set<string>();
  const missingDinnerIds = new Set<string>();

  for (const id of Array.from(guest.savedArticleIds).reverse()) {
    const snap = guest.savedArticleSnapshots?.get(id);
    if (snap) {
      if (matchesGuestTierBucket(snap.targetTiers, tier)) {
        articles.push({
          ...snap,
          isRead: snap.isRead || guest.readArticleIds.has(snap.id),
          isSaved: true,
        });
      }
    } else {
      missingArticleIds.add(id);
    }
  }

  for (const id of Array.from(guest.savedVideoIds).reverse()) {
    const snap = guest.savedVideoSnapshots?.get(id);
    if (snap) {
      if (matchesGuestTierBucket(snap.targetTiers, tier)) {
        videos.push({ ...snap, isSaved: true });
      }
    } else {
      missingVideoIds.add(id);
    }
  }

  for (const id of Array.from(guest.savedDinnerIds).reverse()) {
    const snap = guest.savedDinnerSnapshots?.get(id);
    if (snap) {
      if (matchesGuestTierBucket(snap.targetTiers, tier)) {
        dinnerPrompts.push({ ...snap, isSaved: true });
      }
    } else {
      missingDinnerIds.add(id);
    }
  }

  // Only lazy-load fallback mocks if legacy ID-only guest entries exist without stored snapshots
  if (
    missingArticleIds.size > 0 ||
    missingVideoIds.size > 0 ||
    missingDinnerIds.size > 0
  ) {
    const { getMockSavedShortlist } = await import('./mocks/digestMocks');
    const mockShortlist = getMockSavedShortlist(tier ?? DEFAULT_DIGEST_TIER, {
      readArticleIds: guest.readArticleIds,
      savedArticleIds: missingArticleIds,
      savedVideoIds: missingVideoIds,
      savedDinnerIds: missingDinnerIds,
    });

    const seenArticleIds = new Set(articles.map((a) => a.id));
    for (const article of mockShortlist.articles) {
      if (!seenArticleIds.has(article.id)) {
        articles.push(article);
      }
    }

    const seenVideoIds = new Set(videos.map((v) => v.id));
    for (const video of mockShortlist.videos) {
      if (!seenVideoIds.has(video.id)) {
        videos.push(video);
      }
    }

    const seenDinnerIds = new Set(dinnerPrompts.map((d) => d.id));
    for (const prompt of mockShortlist.dinnerPrompts) {
      if (!seenDinnerIds.has(prompt.id)) {
        dinnerPrompts.push(prompt);
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

function overlayGuestOnEdition(
  edition: WeeklyDigestEditionDTO,
  guest: GuestInteractionSnapshot
): WeeklyDigestEditionDTO {
  const articles = edition.articles.map((a) => ({
    ...a,
    isRead: a.isRead || guest.readArticleIds.has(a.id),
    isSaved: a.isSaved || guest.savedArticleIds.has(a.id),
  }));
  return {
    ...edition,
    articles,
    videos: edition.videos.map((v) => ({
      ...v,
      isSaved: v.isSaved || guest.savedVideoIds.has(v.id),
    })),
    dinnerPrompts: edition.dinnerPrompts.map((d) => ({
      ...d,
      isSaved: d.isSaved || guest.savedDinnerIds.has(d.id),
    })),
    readArticleCount: articles.filter((a) => a.isRead).length,
  };
}

function shouldFallbackToMocks(error: unknown): boolean {
  if (error instanceof ApiClientError) {
    return error.status === 0 || error.status >= 500 || error.status === 404;
  }
  return true;
}

// ----------------------------------------------------
// WEEKLY CULTURE & TRENDS HUB CLIENT (PLAN-49 / PLAN-51)
// ----------------------------------------------------

export interface DigestIssuesResponse {
  issues: DigestIssueSummaryDTO[];
}

export interface DigestEditionResponse {
  edition: WeeklyDigestEditionDTO;
}

export interface DigestInteractionResponse {
  interaction: DigestInteractionResultDTO;
}

/**
 * List published weekly Culture & Trends issues for the issue selector dropdown.
 */
export async function listDigestIssues(
  tier?: DevelopmentalTier
): Promise<DigestIssueSummaryDTO[]> {
  try {
    const res = await apiClient<DigestIssuesResponse>('/api/v1/digest/issues', {
      method: 'GET',
      params: tier ? { tier } : undefined,
    });
    return res.issues ?? [];
  } catch (error) {
    if (shouldFallbackToMocks(error)) {
      const { getMockDigestIssues } = await import('./mocks/digestMocks');
      return getMockDigestIssues(tier);
    }
    throw error;
  }
}

/**
 * Fetch a specific weekly edition (or 'latest') calibrated to a child or canonical tier.
 */
export async function getWeeklyDigestEdition(
  issueNumber: number | 'latest',
  params?: { tier?: DevelopmentalTier; childId?: string; isGuest?: boolean }
): Promise<WeeklyDigestEditionDTO> {
  try {
    const res = await apiClient<DigestEditionResponse>(
      `/api/v1/digest/issues/${encodeURIComponent(String(issueNumber))}`,
      {
        method: 'GET',
        params: {
          tier: params?.tier,
          childId: params?.childId,
        },
      }
    );
    return params?.isGuest === true
      ? overlayGuestOnEdition(res.edition, readGuestDigestInteractions())
      : res.edition;
  } catch (error) {
    if (shouldFallbackToMocks(error)) {
      const { getMockWeeklyEdition } = await import('./mocks/digestMocks');
      return getMockWeeklyEdition(
        issueNumber,
        params?.tier ?? DEFAULT_DIGEST_TIER,
        params?.isGuest === false ? undefined : readGuestDigestInteractions()
      );
    }
    throw error;
  }
}

/**
 * Fetch week-scoped (default) or all-weeks blogs for the active developmental tier.
 */
export async function listDigestArticles(params: {
  issueNumber?: number;
  scope?: DigestQueryScope;
  tier?: DevelopmentalTier;
  childId?: string;
  unreadOnly?: boolean;
  q?: string;
  isGuest?: boolean;
}): Promise<DigestArticlesResponseDTO> {
  try {
    const res = await apiClient<DigestArticlesResponseDTO>('/api/v1/digest/articles', {
      method: 'GET',
      params: {
        issueNumber: params.issueNumber,
        scope: params.scope ?? 'issue',
        tier: params.tier,
        childId: params.childId,
        unreadOnly: params.unreadOnly,
        q: params.q && params.q.trim().length > 0 ? params.q.trim() : undefined,
      },
    });
    if (params.isGuest !== true) return res;
    const guest = readGuestDigestInteractions();
    const hydrated = res.articles.map((a) => ({
      ...a,
      isRead: a.isRead || guest.readArticleIds.has(a.id),
      isSaved: a.isSaved || guest.savedArticleIds.has(a.id),
    }));
    const articles = params.unreadOnly ? hydrated.filter((a) => !a.isRead) : hydrated;
    return {
      ...res,
      articles,
      unreadCount: hydrated.filter((a) => !a.isRead).length,
    };
  } catch (error) {
    if (shouldFallbackToMocks(error)) {
      const { getMockDigestArticles } = await import('./mocks/digestMocks');
      return getMockDigestArticles(
        {
          issueNumber: params.issueNumber,
          scope: params.scope ?? 'issue',
          tier: params.tier ?? DEFAULT_DIGEST_TIER,
          unreadOnly: params.unreadOnly,
          q: params.q,
        },
        params.isGuest === false ? undefined : readGuestDigestInteractions()
      );
    }
    throw error;
  }
}

/**
 * Fetch week-scoped (default) or all-weeks curated videos for the active developmental tier.
 */
export async function listDigestVideos(params: {
  issueNumber?: number;
  scope?: DigestQueryScope;
  tier?: DevelopmentalTier;
  childId?: string;
  durationBucket?: DigestVideoDurationBucket;
  q?: string;
  isGuest?: boolean;
}): Promise<DigestVideosResponseDTO> {
  try {
    const res = await apiClient<DigestVideosResponseDTO>('/api/v1/digest/videos', {
      method: 'GET',
      params: {
        issueNumber: params.issueNumber,
        scope: params.scope ?? 'issue',
        tier: params.tier,
        childId: params.childId,
        durationBucket: params.durationBucket ?? 'all',
        q: params.q && params.q.trim().length > 0 ? params.q.trim() : undefined,
      },
    });
    if (params.isGuest !== true) return res;
    const guest = readGuestDigestInteractions();
    return {
      ...res,
      videos: res.videos.map((v) => ({
        ...v,
        isSaved: v.isSaved || guest.savedVideoIds.has(v.id),
      })),
    };
  } catch (error) {
    if (shouldFallbackToMocks(error)) {
      const { getMockDigestVideos } = await import('./mocks/digestMocks');
      return getMockDigestVideos(
        {
          issueNumber: params.issueNumber,
          scope: params.scope ?? 'issue',
          tier: params.tier ?? DEFAULT_DIGEST_TIER,
          durationBucket: params.durationBucket ?? 'all',
          q: params.q,
        },
        params.isGuest === false ? undefined : readGuestDigestInteractions()
      );
    }
    throw error;
  }
}

/**
 * Fetch user-persisted saved shortlist (blogs, videos, dinner questions),
 * reading local guest snapshots directly when unauthenticated (guest) or offline.
 */
export async function getSavedDigestShortlist(params?: {
  tier?: DevelopmentalTier;
  childId?: string;
  isGuest?: boolean;
}): Promise<SavedDigestShortlistDTO> {
  if (params?.isGuest === true) {
    return await buildGuestSavedShortlist(params.tier, readGuestDigestInteractions());
  }

  try {
    return await apiClient<SavedDigestShortlistDTO>('/api/v1/digest/saved', {
      method: 'GET',
      params: {
        tier: params?.tier,
        childId: params?.childId,
      },
    });
  } catch (error) {
    if (
      (error instanceof ApiClientError && error.status === 401) ||
      (params?.isGuest !== false && shouldFallbackToMocks(error))
    ) {
      return await buildGuestSavedShortlist(params?.tier, readGuestDigestInteractions());
    }
    throw error;
  }
}

/**
 * Upsert a read or saved interaction on an article, video, or dinner prompt.
 * Persists lightweight guest item snapshots to localStorage when unauthenticated or offline.
 */
export async function upsertDigestInteraction(payload: {
  itemType: DigestItemType;
  itemId: string;
  childId?: string;
  isRead?: boolean;
  isSaved?: boolean;
  isGuest?: boolean;
  articleSnapshot?: DigestArticleDTO;
  videoSnapshot?: DigestVideoDTO;
  dinnerSnapshot?: DigestDinnerPromptDTO;
}): Promise<DigestInteractionResultDTO> {
  if (payload.isGuest === true) {
    return writeGuestDigestInteraction(payload);
  }

  try {
    const res = await apiClient<DigestInteractionResponse>('/api/v1/digest/interactions', {
      method: 'PUT',
      body: JSON.stringify({
        itemType: payload.itemType,
        itemId: payload.itemId,
        childId: payload.childId,
        isRead: payload.isRead,
        isSaved: payload.isSaved,
      }),
    });
    return res.interaction;
  } catch (error) {
    if (
      (error instanceof ApiClientError && error.status === 401) ||
      (payload.isGuest !== false && shouldFallbackToMocks(error))
    ) {
      return writeGuestDigestInteraction(payload);
    }
    throw error;
  }
}
