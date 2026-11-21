import {
  DEFAULT_DIGEST_TIER,
  DigestItemType,
  type CultureDigestDTO,
  type DevelopmentalTier,
  type DigestArticlesResponseDTO,
  type DigestInteractionResultDTO,
  type DigestIssueSummaryDTO,
  type DigestQueryScope,
  type DigestVideoDurationBucket,
  type DigestVideosResponseDTO,
  type ExploitAlertDTO,
  type ExploitSeverity,
  type SavedDigestShortlistDTO,
  type SlangTermDTO,
  type WeeklyDigestEditionDTO,
} from '@alongside/shared';
import { ApiClientError, apiClient } from './client';
import {
  getMockDigestArticles,
  getMockDigestIssues,
  getMockDigestVideos,
  getMockSavedShortlist,
  getMockWeeklyEdition,
  type GuestInteractionSnapshot,
} from './mocks/digestMocks';

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

interface StoredGuestInteractions {
  readArticles: string[];
  savedArticles: string[];
  savedVideos: string[];
  savedDinners: string[];
}

function emptyStoredInteractions(): StoredGuestInteractions {
  return {
    readArticles: [],
    savedArticles: [],
    savedVideos: [],
    savedDinners: [],
  };
}

export function readGuestDigestInteractions(): GuestInteractionSnapshot {
  if (typeof window === 'undefined') {
    return {
      readArticleIds: new Set(),
      savedArticleIds: new Set(),
      savedVideoIds: new Set(),
      savedDinnerIds: new Set(),
    };
  }
  try {
    const raw = window.localStorage.getItem(DIGEST_GUEST_STORAGE_KEY);
    if (!raw) {
      return {
        readArticleIds: new Set(),
        savedArticleIds: new Set(),
        savedVideoIds: new Set(),
        savedDinnerIds: new Set(),
      };
    }
    const parsed = JSON.parse(raw) as Partial<StoredGuestInteractions>;
    return {
      readArticleIds: new Set(Array.isArray(parsed.readArticles) ? parsed.readArticles : []),
      savedArticleIds: new Set(Array.isArray(parsed.savedArticles) ? parsed.savedArticles : []),
      savedVideoIds: new Set(Array.isArray(parsed.savedVideos) ? parsed.savedVideos : []),
      savedDinnerIds: new Set(Array.isArray(parsed.savedDinners) ? parsed.savedDinners : []),
    };
  } catch {
    return {
      readArticleIds: new Set(),
      savedArticleIds: new Set(),
      savedVideoIds: new Set(),
      savedDinnerIds: new Set(),
    };
  }
}

export function writeGuestDigestInteraction(input: {
  itemType: DigestItemType;
  itemId: string;
  isRead?: boolean;
  isSaved?: boolean;
}): DigestInteractionResultDTO {
  const snapshot = readGuestDigestInteractions();

  if (input.itemType === DigestItemType.ARTICLE) {
    if (input.isRead === true) snapshot.readArticleIds.add(input.itemId);
    if (input.isRead === false) snapshot.readArticleIds.delete(input.itemId);
    if (input.isSaved === true) snapshot.savedArticleIds.add(input.itemId);
    if (input.isSaved === false) snapshot.savedArticleIds.delete(input.itemId);
  } else if (input.itemType === DigestItemType.VIDEO) {
    if (input.isSaved === true) snapshot.savedVideoIds.add(input.itemId);
    if (input.isSaved === false) snapshot.savedVideoIds.delete(input.itemId);
  } else if (input.itemType === DigestItemType.DINNER_PROMPT) {
    if (input.isSaved === true) snapshot.savedDinnerIds.add(input.itemId);
    if (input.isSaved === false) snapshot.savedDinnerIds.delete(input.itemId);
  }

  if (typeof window !== 'undefined') {
    try {
      const payload: StoredGuestInteractions = {
        ...emptyStoredInteractions(),
        readArticles: Array.from(snapshot.readArticleIds),
        savedArticles: Array.from(snapshot.savedArticleIds),
        savedVideos: Array.from(snapshot.savedVideoIds),
        savedDinners: Array.from(snapshot.savedDinnerIds),
      };
      window.localStorage.setItem(DIGEST_GUEST_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Safe fallback when storage is unavailable
    }
  }

  const isSaved =
    input.itemType === DigestItemType.ARTICLE
      ? snapshot.savedArticleIds.has(input.itemId)
      : input.itemType === DigestItemType.VIDEO
        ? snapshot.savedVideoIds.has(input.itemId)
        : snapshot.savedDinnerIds.has(input.itemId);

  const isRead =
    input.itemType === DigestItemType.ARTICLE
      ? snapshot.readArticleIds.has(input.itemId)
      : false;

  return {
    itemType: input.itemType,
    itemId: input.itemId,
    isRead,
    isSaved,
  };
}

let isGuestDigestSession = false;

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
  params?: { tier?: DevelopmentalTier; childId?: string }
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
    return isGuestDigestSession
      ? overlayGuestOnEdition(res.edition, readGuestDigestInteractions())
      : res.edition;
  } catch (error) {
    if (shouldFallbackToMocks(error)) {
      isGuestDigestSession = true;
      return getMockWeeklyEdition(
        issueNumber,
        params?.tier ?? DEFAULT_DIGEST_TIER,
        readGuestDigestInteractions()
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
    if (!isGuestDigestSession) return res;
    const guest = readGuestDigestInteractions();
    const articles = res.articles.map((a) => ({
      ...a,
      isRead: a.isRead || guest.readArticleIds.has(a.id),
      isSaved: a.isSaved || guest.savedArticleIds.has(a.id),
    }));
    return {
      ...res,
      articles,
      unreadCount: articles.filter((a) => !a.isRead).length,
    };
  } catch (error) {
    if (shouldFallbackToMocks(error)) {
      isGuestDigestSession = true;
      return getMockDigestArticles(
        {
          issueNumber: params.issueNumber,
          scope: params.scope ?? 'issue',
          tier: params.tier ?? DEFAULT_DIGEST_TIER,
          unreadOnly: params.unreadOnly,
          q: params.q,
        },
        readGuestDigestInteractions()
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
    if (!isGuestDigestSession) return res;
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
      isGuestDigestSession = true;
      return getMockDigestVideos(
        {
          issueNumber: params.issueNumber,
          scope: params.scope ?? 'issue',
          tier: params.tier ?? DEFAULT_DIGEST_TIER,
          durationBucket: params.durationBucket ?? 'all',
          q: params.q,
        },
        readGuestDigestInteractions()
      );
    }
    throw error;
  }
}

/**
 * Fetch user-persisted saved shortlist (blogs, videos, dinner questions),
 * falling back gracefully to local guest shortlist when unauthenticated or offline.
 */
export async function getSavedDigestShortlist(params?: {
  tier?: DevelopmentalTier;
  childId?: string;
}): Promise<SavedDigestShortlistDTO> {
  try {
    const res = await apiClient<SavedDigestShortlistDTO>('/api/v1/digest/saved', {
      method: 'GET',
      params: {
        tier: params?.tier,
        childId: params?.childId,
      },
    });
    isGuestDigestSession = false;
    return res;
  } catch (error) {
    if (
      (error instanceof ApiClientError && error.status === 401) ||
      shouldFallbackToMocks(error)
    ) {
      isGuestDigestSession = true;
      return getMockSavedShortlist(
        params?.tier ?? DEFAULT_DIGEST_TIER,
        readGuestDigestInteractions()
      );
    }
    throw error;
  }
}

/**
 * Upsert a read or saved interaction on an article, video, or dinner prompt.
 * Falls back cleanly to guest localStorage persistence when unauthenticated (401) or offline.
 */
export async function upsertDigestInteraction(payload: {
  itemType: DigestItemType;
  itemId: string;
  childId?: string;
  isRead?: boolean;
  isSaved?: boolean;
}): Promise<DigestInteractionResultDTO> {
  try {
    const res = await apiClient<DigestInteractionResponse>('/api/v1/digest/interactions', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    isGuestDigestSession = false;
    return res.interaction;
  } catch (error) {
    if (
      (error instanceof ApiClientError && error.status === 401) ||
      shouldFallbackToMocks(error)
    ) {
      isGuestDigestSession = true;
      return writeGuestDigestInteraction(payload);
    }
    throw error;
  }
}
