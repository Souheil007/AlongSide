'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';
import {
  DEFAULT_DIGEST_TIER,
  DevelopmentalTier,
  DigestItemType,
  calculateLifespanTier,
  isSlangEligibleTier,
  resolveDigestTierBucket,
  type CanonicalDigestTier,
  type ChildDTO,
  type DigestArticleDTO,
  type DigestArticlesResponseDTO,
  type DigestDinnerPromptDTO,
  type DigestIssueSummaryDTO,
  type DigestQueryScope,
  type DigestVideoDTO,
  type DigestVideosResponseDTO,
  type SavedDigestShortlistDTO,
  type WeeklyDigestEditionDTO,
} from '@alongside/shared';
import {
  getSavedDigestShortlist,
  getWeeklyDigestEdition,
  listDigestArticles,
  listDigestIssues,
  listDigestVideos,
  upsertDigestInteraction,
} from '@/lib/api/digest';
import { DIGEST_TIER_METADATA } from '@/lib/digestTierMeta';
import { useAuth } from '@/hooks/useAuth';
import {
  formatChildAge,
  selectActiveChild,
  useChildContextStore,
} from '@/stores/useChildContextStore';

export type CultureDigestTab = 'week' | 'blogs' | 'videos' | 'saved';
export type BlogReadFilter = 'all' | 'unread';
export type DigestIssueSelection = number | 'all' | null;

const VALID_TABS = new Set<CultureDigestTab>(['week', 'blogs', 'videos', 'saved']);

const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

// ----------------------------------------------------
// PURE FORMATTERS & STATE TRANSITION HELPERS
// ----------------------------------------------------

/**
 * Resolves a child profile into one of the 6 canonical Culture & Trends developmental buckets.
 * Prefers birthYear + birthMonth via canonical lifespan tiering so legacy TIER_4_AGES_14_PLUS
 * records for 14-year-olds resolve accurately to Early Adolescence (Ages 13–15).
 */
export function resolveActiveDigestTier(
  child: ChildDTO | null | undefined
): CanonicalDigestTier {
  if (!child) return DEFAULT_DIGEST_TIER;

  if (
    typeof child.birthYear === 'number' &&
    Number.isFinite(child.birthYear) &&
    child.birthYear > 0 &&
    typeof child.birthMonth === 'number' &&
    Number.isFinite(child.birthMonth) &&
    child.birthMonth >= 1 &&
    child.birthMonth <= 12
  ) {
    return resolveDigestTierBucket(
      calculateLifespanTier(child.birthYear, child.birthMonth)
    );
  }

  if (child.developmentalTier) {
    const knownTiers = Object.values(DevelopmentalTier) as string[];
    if (knownTiers.includes(child.developmentalTier)) {
      return resolveDigestTierBucket(child.developmentalTier);
    }
  }

  const age = child.age;
  if (typeof age === 'number' && Number.isFinite(age)) {
    if (age <= 3) return DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;
    if (age <= 6) return DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
    if (age <= 9) return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
    if (age <= 12) return DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
    if (age <= 15) return DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
    return DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;
  }

  return DEFAULT_DIGEST_TIER;
}

/**
 * Parses ?tab= and ?issue= (positive integer or 'all') safely from a URL search string.
 */
export function parseDigestUrlParams(search: string): {
  tab?: CultureDigestTab;
  issueSelection?: number | 'all';
} {
  const params = new URLSearchParams(search);
  const rawTab = params.get('tab');
  const rawIssue = params.get('issue');

  const tab =
    rawTab && VALID_TABS.has(rawTab as CultureDigestTab)
      ? (rawTab as CultureDigestTab)
      : undefined;

  let issueSelection: number | 'all' | undefined;
  if (rawIssue?.trim().toLowerCase() === 'all') {
    issueSelection = 'all';
  } else {
    const parsedIssue = rawIssue ? Number(rawIssue) : NaN;
    if (Number.isInteger(parsedIssue) && parsedIssue > 0) {
      issueSelection = parsedIssue;
    }
  }

  return { tab, issueSelection };
}

/**
 * Formats an ISO timestamp into a concise UTC date label (e.g. "Nov 13").
 */
export function formatShortPublishDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return '';
  const month = MONTHS_SHORT[d.getUTCMonth()] ?? '';
  return `${month} ${d.getUTCDate()}`;
}

/**
 * Formats a Sunday-to-Sunday edition window concisely (e.g. "Nov 8–15" or "Oct 25–Nov 1").
 */
export function formatWeekDateRange(weekStart: string, weekEnd: string): string {
  const start = new Date(weekStart);
  const end = new Date(weekEnd);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return formatShortPublishDate(weekEnd || weekStart);
  }
  const sMonth = MONTHS_SHORT[start.getUTCMonth()] ?? '';
  const eMonth = MONTHS_SHORT[end.getUTCMonth()] ?? '';
  const sDay = start.getUTCDate();
  const eDay = end.getUTCDate();

  if (sMonth === eMonth) {
    return `${sMonth} ${sDay}–${eDay}`;
  }
  return `${sMonth} ${sDay}–${eMonth} ${eDay}`;
}

/**
 * Formats an option label for the Weekly Issue Selector dropdown.
 */
export function formatIssueOptionLabel(issue: DigestIssueSummaryDTO): string {
  const range = formatWeekDateRange(issue.weekStart, issue.weekEnd);
  return `Issue #${issue.issueNumber} · ${range}`;
}

/**
 * Builds the privacy-enhanced YouTube nocookie embed URL.
 */
export function buildYouTubeEmbedUrl(
  youtubeVideoId: string,
  startSeconds = 0
): string {
  const safeStart = Math.max(0, Math.floor(Number(startSeconds) || 0));
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    youtubeVideoId
  )}?autoplay=1&start=${safeStart}&rel=0`;
}

/**
 * Returns the reliable hqdefault.jpg YouTube thumbnail URL (paired with scale-[1.18] 16:9 crop).
 */
export function getYouTubeThumbnailUrl(youtubeVideoId: string): string {
  return `https://img.youtube.com/vi/${encodeURIComponent(youtubeVideoId)}/hqdefault.jpg`;
}

/**
 * Splits a YouTube chapter chip label ("1:30 · Core insight") into timestamp and description.
 */
export function splitJumpChipLabel(label: string): {
  timestamp: string;
  text: string;
} {
  const parts = label.split(' · ');
  if (parts.length >= 2) {
    return {
      timestamp: parts[0] ?? '',
      text: parts.slice(1).join(' · '),
    };
  }
  return { timestamp: '', text: label };
}

/**
 * Validates that an external publisher URL uses http/https before rendering as href.
 */
export function getSafeExternalHref(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
  } catch {
    // Fall through to safe fallback
  }
  return '#';
}

/**
 * Pure minimalist filter for the Blogs tab (All / Unread + Search).
 */
export function filterBlogsMinimalist(
  articles: DigestArticleDTO[],
  options: {
    readFilter: BlogReadFilter;
    searchQuery: string;
  }
): {
  items: DigestArticleDTO[];
  unreadCount: number;
} {
  const unreadCount = articles.filter((a) => !a.isRead).length;
  const q = options.searchQuery.trim().toLowerCase();

  const items = articles.filter((article) => {
    if (options.readFilter === 'unread' && article.isRead) {
      return false;
    }
    if (!q) return true;
    return (
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.topicLabel.toLowerCase().includes(q) ||
      article.sourceName.toLowerCase().includes(q)
    );
  });

  return { items, unreadCount };
}

/**
 * Pure search filter for the Videos tab.
 */
export function filterVideosForShelf(
  videos: DigestVideoDTO[],
  options: {
    searchQuery: string;
  }
): DigestVideoDTO[] {
  const q = options.searchQuery.trim().toLowerCase();
  if (!q) return videos;

  return videos.filter(
    (video) =>
      video.title.toLowerCase().includes(q) ||
      video.presenter.toLowerCase().includes(q) ||
      video.channelName.toLowerCase().includes(q) ||
      video.takeaway.toLowerCase().includes(q)
  );
}

/**
 * Pure state machine helper for page-wide week selection ('all' or a specific issue)
 * and clean resets when switching week or child.
 */
export interface DigestScopeFilterState {
  selectedIssue: DigestIssueSelection;
  blogReadFilter: BlogReadFilter;
  blogSearch: string;
  videoSearch: string;
  activeTheaterVideoId: string | null;
  dinnerPromptIndex: number;
  dinnerNotesOpen: boolean;
  expandedPhraseIndex: number | null;
}

export function createInitialDigestFilterState(
  initialIssue: DigestIssueSelection = null
): DigestScopeFilterState {
  return {
    selectedIssue: initialIssue,
    blogReadFilter: 'all',
    blogSearch: '',
    videoSearch: '',
    activeTheaterVideoId: null,
    dinnerPromptIndex: 0,
    dinnerNotesOpen: false,
    expandedPhraseIndex: null,
  };
}

export function applyIssueSwitchReset(
  prev: DigestScopeFilterState,
  nextIssue: number | 'all'
): DigestScopeFilterState {
  return {
    ...prev,
    selectedIssue: nextIssue,
    activeTheaterVideoId: null,
    dinnerPromptIndex: 0,
    dinnerNotesOpen: false,
    expandedPhraseIndex: null,
  };
}

export function applyChildSwitchReset(
  prev: DigestScopeFilterState
): DigestScopeFilterState {
  return {
    ...createInitialDigestFilterState(prev.selectedIssue),
  };
}

// ----------------------------------------------------
// MAIN DEEP HOOK
// ----------------------------------------------------

interface InteractionMutationInput {
  itemType: DigestItemType;
  itemId: string;
  isRead?: boolean;
  isSaved?: boolean;
  articleSnapshot?: DigestArticleDTO;
  videoSnapshot?: DigestVideoDTO;
  dinnerSnapshot?: DigestDinnerPromptDTO;
  silentToast?: boolean;
}

/**
 * Applies a read/saved interaction patch atomically across all digest React Query caches
 * (editions, scoped/all-weeks articles, scoped/all-weeks videos, and saved shortlist).
 */
export function patchDigestInteractionCaches(
  queryClient: QueryClient,
  patch: {
    itemType: DigestItemType;
    itemId: string;
    isRead?: boolean;
    isSaved?: boolean;
    articleSnapshot?: DigestArticleDTO;
    videoSnapshot?: DigestVideoDTO;
    dinnerSnapshot?: DigestDinnerPromptDTO;
  }
): void {
  // Patch all cached editions
  queryClient.setQueriesData<WeeklyDigestEditionDTO>(
    { queryKey: ['digest-edition'] },
    (old) => {
      if (!old) return old;
      if (patch.itemType === DigestItemType.ARTICLE) {
        const articles = old.articles.map((a) =>
          a.id === patch.itemId
            ? {
                ...a,
                isRead: patch.isRead !== undefined ? patch.isRead : a.isRead,
                isSaved: patch.isSaved !== undefined ? patch.isSaved : a.isSaved,
              }
            : a
        );
        return {
          ...old,
          articles,
          readArticleCount: articles.filter((a) => a.isRead).length,
        };
      }
      if (patch.itemType === DigestItemType.VIDEO) {
        return {
          ...old,
          videos: old.videos.map((v) =>
            v.id === patch.itemId && patch.isSaved !== undefined
              ? { ...v, isSaved: patch.isSaved }
              : v
          ),
        };
      }
      if (patch.itemType === DigestItemType.DINNER_PROMPT) {
        return {
          ...old,
          dinnerPrompts: old.dinnerPrompts.map((d) =>
            d.id === patch.itemId && patch.isSaved !== undefined
              ? { ...d, isSaved: patch.isSaved }
              : d
          ),
        };
      }
      return old;
    }
  );

  // Patch cached articles lists
  if (patch.itemType === DigestItemType.ARTICLE) {
    queryClient.setQueriesData<DigestArticlesResponseDTO>(
      { queryKey: ['digest-articles'] },
      (old) => {
        if (!old) return old;
        const articles = old.articles.map((a) =>
          a.id === patch.itemId
            ? {
                ...a,
                isRead: patch.isRead !== undefined ? patch.isRead : a.isRead,
                isSaved: patch.isSaved !== undefined ? patch.isSaved : a.isSaved,
              }
            : a
        );
        return {
          ...old,
          articles,
          unreadCount: articles.filter((a) => !a.isRead).length,
        };
      }
    );
  }

  // Patch cached videos lists
  if (patch.itemType === DigestItemType.VIDEO && patch.isSaved !== undefined) {
    queryClient.setQueriesData<DigestVideosResponseDTO>(
      { queryKey: ['digest-videos'] },
      (old) => {
        if (!old) return old;
        return {
          ...old,
          videos: old.videos.map((v) =>
            v.id === patch.itemId ? { ...v, isSaved: patch.isSaved! } : v
          ),
        };
      }
    );
  }

  // Patch cached saved shortlist
  if (patch.isSaved !== undefined) {
    queryClient.setQueriesData<SavedDigestShortlistDTO>(
      { queryKey: ['digest-saved'] },
      (old) => {
        const base: SavedDigestShortlistDTO = old ?? {
          articles: [],
          videos: [],
          dinnerPrompts: [],
          totalCount: 0,
        };
        let articles = base.articles;
        let videos = base.videos;
        let dinnerPrompts = base.dinnerPrompts;

        if (patch.itemType === DigestItemType.ARTICLE) {
          if (patch.isSaved) {
            if (
              patch.articleSnapshot &&
              !articles.some((a) => a.id === patch.itemId)
            ) {
              articles = [
                {
                  ...patch.articleSnapshot,
                  isRead:
                    patch.isRead !== undefined
                      ? patch.isRead
                      : patch.articleSnapshot.isRead,
                  isSaved: true,
                },
                ...articles,
              ];
            }
          } else {
            articles = articles.filter((a) => a.id !== patch.itemId);
          }
        } else if (patch.itemType === DigestItemType.VIDEO) {
          if (patch.isSaved) {
            if (
              patch.videoSnapshot &&
              !videos.some((v) => v.id === patch.itemId)
            ) {
              videos = [{ ...patch.videoSnapshot, isSaved: true }, ...videos];
            }
          } else {
            videos = videos.filter((v) => v.id !== patch.itemId);
          }
        } else if (patch.itemType === DigestItemType.DINNER_PROMPT) {
          if (patch.isSaved) {
            if (
              patch.dinnerSnapshot &&
              !dinnerPrompts.some((d) => d.id === patch.itemId)
            ) {
              dinnerPrompts = [
                { ...patch.dinnerSnapshot, isSaved: true },
                ...dinnerPrompts,
              ];
            }
          } else {
            dinnerPrompts = dinnerPrompts.filter((d) => d.id !== patch.itemId);
          }
        }

        return {
          articles,
          videos,
          dinnerPrompts,
          totalCount: articles.length + videos.length + dinnerPrompts.length,
        };
      }
    );
  }
}

export function useCultureDigest() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const activeChild = useChildContextStore(selectActiveChild);

  // Guest localStorage overlays strictly run only when confirmed unauthenticated
  const isGuestSession: boolean | undefined = isAuthLoading ? undefined : !isAuthenticated;
  const isGuestOverlayActive = isGuestSession === true;

  const resolvedTier = React.useMemo(
    () => resolveActiveDigestTier(activeChild),
    [activeChild]
  );
  const tierMeta = DIGEST_TIER_METADATA[resolvedTier];
  const slangEligible = React.useMemo(
    () => isSlangEligibleTier(resolvedTier),
    [resolvedTier]
  );

  const initialUrlState = React.useMemo(
    () => parseDigestUrlParams(searchParams?.toString() ?? ''),
    // Only capture initial URL params on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [activeTab, setActiveTabState] = React.useState<CultureDigestTab>(
    initialUrlState.tab ?? 'week'
  );
  const [filters, setFilters] = React.useState<DigestScopeFilterState>(() =>
    createInitialDigestFilterState(initialUrlState.issueSelection ?? null)
  );

  // Overlays
  const [openArticleId, setOpenArticleId] = React.useState<string | null>(null);
  const [drawerArticle, setDrawerArticle] = React.useState<DigestArticleDTO | null>(null);
  const [modalVideo, setModalVideo] = React.useState<{
    video: DigestVideoDTO;
    startSeconds: number;
  } | null>(null);

  const drawerArticleRef = React.useRef<DigestArticleDTO | null>(drawerArticle);
  drawerArticleRef.current = drawerArticle;
  const modalVideoRef = React.useRef<{
    video: DigestVideoDTO;
    startSeconds: number;
  } | null>(modalVideo);
  modalVideoRef.current = modalVideo;
  const pendingInteractionsRef = React.useRef(0);

  // Calm ephemeral toast
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const toastTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = React.useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  }, []);

  React.useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Reset child-scoped filters cleanly whenever the global active child/tier changes
  const prevChildKeyRef = React.useRef<string>(`${activeChild?.id ?? 'none'}:${resolvedTier}`);
  React.useEffect(() => {
    const nextKey = `${activeChild?.id ?? 'none'}:${resolvedTier}`;
    if (prevChildKeyRef.current !== nextKey) {
      prevChildKeyRef.current = nextKey;
      setFilters((prev) => applyChildSwitchReset(prev));
      setOpenArticleId(null);
      setDrawerArticle(null);
      setModalVideo(null);
    }
  }, [activeChild?.id, resolvedTier]);

  // URL sync helper (?issue=&tab=) without full Next.js navigation reload
  const syncUrlParams = React.useCallback(
    (nextTab: CultureDigestTab, nextIssue: DigestIssueSelection) => {
      if (typeof window === 'undefined') return;
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', nextTab);
        if (nextIssue === 'all') {
          url.searchParams.set('issue', 'all');
        } else if (typeof nextIssue === 'number') {
          url.searchParams.set('issue', String(nextIssue));
        } else {
          url.searchParams.delete('issue');
        }
        window.history.replaceState({}, '', url.toString());
      } catch {
        // Safe SSR / test fallback
      }
    },
    []
  );

  const isAllWeeks = filters.selectedIssue === 'all';
  const weekScope: DigestQueryScope = isAllWeeks ? 'all' : 'issue';
  const editionIssueParam: number | 'latest' =
    typeof filters.selectedIssue === 'number' ? filters.selectedIssue : 'latest';

  // 1. Query: Published weekly issues list
  const issuesQuery = useQuery({
    queryKey: ['digest-issues', resolvedTier],
    queryFn: () => listDigestIssues(resolvedTier),
    staleTime: 5 * 60 * 1000,
  });

  // 2. Query: Active weekly edition (Tab 1 + header counts + Sunday dinner closer)
  const editionQuery = useQuery({
    queryKey: [
      'digest-edition',
      editionIssueParam,
      resolvedTier,
      activeChild?.id ?? null,
      isGuestOverlayActive,
    ],
    queryFn: () =>
      getWeeklyDigestEdition(editionIssueParam, {
        tier: resolvedTier,
        childId: activeChild?.id,
        isGuest: isGuestSession,
      }),
    staleTime: 2 * 60 * 1000,
  });

  const issues = issuesQuery.data ?? [];
  const edition = editionQuery.data ?? null;
  const latestIssueNumber: number | null =
    issues.length > 0
      ? Math.max(...issues.map((i) => i.issueNumber))
      : (edition?.issue.issueNumber ?? null);
  const resolvedIssueNumber: number | null = isAllWeeks
    ? null
    : (edition?.issue.issueNumber ??
        (typeof filters.selectedIssue === 'number' ? filters.selectedIssue : null) ??
        latestIssueNumber);
  const isArchiveEdition =
    !isAllWeeks &&
    issues.length > 0 &&
    resolvedIssueNumber !== null &&
    latestIssueNumber !== null &&
    resolvedIssueNumber !== latestIssueNumber;

  // 3. Query: Selected week or All-weeks Blogs (Tab 2, or Tab 1 when All weeks is active)
  const articlesQuery = useQuery({
    queryKey: [
      'digest-articles',
      isAllWeeks ? 'all' : (resolvedIssueNumber ?? 'latest'),
      weekScope,
      resolvedTier,
      activeChild?.id ?? null,
      isGuestOverlayActive,
    ],
    queryFn: () =>
      listDigestArticles({
        issueNumber: isAllWeeks ? undefined : (resolvedIssueNumber ?? undefined),
        scope: weekScope,
        tier: resolvedTier,
        childId: activeChild?.id,
        isGuest: isGuestSession,
      }),
    enabled: activeTab === 'blogs' || (activeTab === 'week' && isAllWeeks),
    staleTime: 2 * 60 * 1000,
  });

  // 4. Query: Selected week or All-weeks Videos (Tab 3, or Tab 1 when All weeks is active)
  const videosQuery = useQuery({
    queryKey: [
      'digest-videos',
      isAllWeeks ? 'all' : (resolvedIssueNumber ?? 'latest'),
      weekScope,
      resolvedTier,
      activeChild?.id ?? null,
      isGuestOverlayActive,
    ],
    queryFn: () =>
      listDigestVideos({
        issueNumber: isAllWeeks ? undefined : (resolvedIssueNumber ?? undefined),
        scope: weekScope,
        tier: resolvedTier,
        childId: activeChild?.id,
        isGuest: isGuestSession,
      }),
    enabled: activeTab === 'videos' || (activeTab === 'week' && isAllWeeks),
    staleTime: 2 * 60 * 1000,
  });

  // 5. Query: Saved shortlist (Tab 4 + tab badge count)
  const savedQuery = useQuery({
    queryKey: [
      'digest-saved',
      resolvedTier,
      activeChild?.id ?? null,
      isGuestOverlayActive,
    ],
    queryFn: () =>
      getSavedDigestShortlist({
        tier: resolvedTier,
        childId: activeChild?.id,
        isGuest: isGuestSession,
      }),
    enabled: !isAuthLoading,
    staleTime: 60 * 1000,
  });

  const savedShortlist: SavedDigestShortlistDTO = savedQuery.data ?? {
    articles: [],
    videos: [],
    dinnerPrompts: [],
    totalCount: 0,
  };

  // Resolve current scoped lists cleanly (instant hydration from edition when scoped to a single week)
  const scopedArticles: DigestArticleDTO[] = React.useMemo(() => {
    if (isAllWeeks) {
      return articlesQuery.data?.articles ?? [];
    }
    return articlesQuery.data?.articles ?? edition?.articles ?? [];
  }, [isAllWeeks, articlesQuery.data, edition?.articles]);

  const scopedVideos: DigestVideoDTO[] = React.useMemo(() => {
    if (isAllWeeks) {
      return videosQuery.data?.videos ?? [];
    }
    return videosQuery.data?.videos ?? edition?.videos ?? [];
  }, [isAllWeeks, videosQuery.data, edition?.videos]);

  const weekDisplayArticles: DigestArticleDTO[] = React.useMemo(() => {
    if (isAllWeeks) {
      return articlesQuery.data?.articles ?? edition?.articles ?? [];
    }
    return edition?.articles ?? [];
  }, [isAllWeeks, articlesQuery.data, edition?.articles]);

  const weekDisplayVideos: DigestVideoDTO[] = React.useMemo(() => {
    if (isAllWeeks) {
      return videosQuery.data?.videos ?? edition?.videos ?? [];
    }
    return edition?.videos ?? [];
  }, [isAllWeeks, videosQuery.data, edition?.videos]);

  const filteredBlogs = React.useMemo(
    () =>
      filterBlogsMinimalist(scopedArticles, {
        readFilter: filters.blogReadFilter,
        searchQuery: filters.blogSearch,
      }),
    [scopedArticles, filters.blogReadFilter, filters.blogSearch]
  );

  const filteredVideos = React.useMemo(
    () =>
      filterVideosForShelf(scopedVideos, {
        searchQuery: filters.videoSearch,
      }),
    [scopedVideos, filters.videoSearch]
  );

  // Optimistic Read / Save Interaction Mutation
  const interactionMutation = useMutation({
    mutationFn: (input: InteractionMutationInput) =>
      upsertDigestInteraction({
        itemType: input.itemType,
        itemId: input.itemId,
        childId: activeChild?.id,
        isRead: input.isRead,
        isSaved: input.isSaved,
        isGuest: isGuestSession,
        articleSnapshot: input.articleSnapshot,
        videoSnapshot: input.videoSnapshot,
        dinnerSnapshot: input.dinnerSnapshot,
      }),
    onMutate: async (input) => {
      pendingInteractionsRef.current += 1;

      // Cancel outgoing refetches so optimistic state is not overwritten
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['digest-edition'] }),
        queryClient.cancelQueries({ queryKey: ['digest-articles'] }),
        queryClient.cancelQueries({ queryKey: ['digest-videos'] }),
        queryClient.cancelQueries({ queryKey: ['digest-saved'] }),
      ]);

      const prevEditions = queryClient.getQueriesData<WeeklyDigestEditionDTO>({
        queryKey: ['digest-edition'],
      });
      const prevArticles = queryClient.getQueriesData<DigestArticlesResponseDTO>({
        queryKey: ['digest-articles'],
      });
      const prevVideos = queryClient.getQueriesData<DigestVideosResponseDTO>({
        queryKey: ['digest-videos'],
      });
      const prevSaved = queryClient.getQueriesData<SavedDigestShortlistDTO>({
        queryKey: ['digest-saved'],
      });
      const prevModalVideo = modalVideoRef.current;
      const prevDrawerArticle = drawerArticleRef.current;

      patchDigestInteractionCaches(queryClient, input);

      // Update active modal video saved flag if open
      if (input.itemType === DigestItemType.VIDEO && input.isSaved !== undefined) {
        setModalVideo((prev) =>
          prev && prev.video.id === input.itemId
            ? { ...prev, video: { ...prev.video, isSaved: input.isSaved! } }
            : prev
        );
      }

      // Update active reader drawer snapshot if open
      if (input.itemType === DigestItemType.ARTICLE) {
        setDrawerArticle((prev) =>
          prev && prev.id === input.itemId
            ? {
                ...prev,
                isRead: input.isRead !== undefined ? input.isRead : prev.isRead,
                isSaved: input.isSaved !== undefined ? input.isSaved : prev.isSaved,
              }
            : prev
        );
      }

      return {
        prevEditions,
        prevArticles,
        prevVideos,
        prevSaved,
        prevModalVideo,
        prevDrawerArticle,
      };
    },
    onError: (_err, _input, context) => {
      if (context && pendingInteractionsRef.current <= 1) {
        context.prevEditions.forEach(([key, data]) => queryClient.setQueryData(key, data));
        context.prevArticles.forEach(([key, data]) => queryClient.setQueryData(key, data));
        context.prevVideos.forEach(([key, data]) => queryClient.setQueryData(key, data));
        context.prevSaved.forEach(([key, data]) => queryClient.setQueryData(key, data));
        if (context.prevModalVideo) {
          const snapshot = context.prevModalVideo;
          setModalVideo((curr) =>
            curr && curr.video.id === snapshot.video.id ? snapshot : curr
          );
        }
        if (context.prevDrawerArticle) {
          const snapshot = context.prevDrawerArticle;
          setDrawerArticle((curr) =>
            curr && curr.id === snapshot.id ? snapshot : curr
          );
        }
      }
      showToast('Could not save that change. Please try again.');
    },
    onSuccess: (serverResult, input) => {
      // Reconcile caches with the authoritative server response when no newer write is in flight
      if (pendingInteractionsRef.current <= 1) {
        patchDigestInteractionCaches(queryClient, {
          itemType: serverResult.itemType,
          itemId: serverResult.itemId,
          isRead:
            serverResult.itemType === DigestItemType.ARTICLE
              ? serverResult.isRead
              : undefined,
          isSaved: serverResult.isSaved,
          articleSnapshot: input.articleSnapshot,
          videoSnapshot: input.videoSnapshot,
          dinnerSnapshot: input.dinnerSnapshot,
        });

        if (serverResult.itemType === DigestItemType.VIDEO) {
          setModalVideo((prev) =>
            prev && prev.video.id === serverResult.itemId
              ? { ...prev, video: { ...prev.video, isSaved: serverResult.isSaved } }
              : prev
          );
        }
        if (serverResult.itemType === DigestItemType.ARTICLE) {
          setDrawerArticle((prev) =>
            prev && prev.id === serverResult.itemId
              ? { ...prev, isRead: serverResult.isRead, isSaved: serverResult.isSaved }
              : prev
          );
        }
      }

      if (input.silentToast) return;
      if (serverResult.isSaved && input.isSaved === true) {
        showToast(
          input.itemType === DigestItemType.DINNER_PROMPT
            ? 'Saved for Sunday dinner'
            : 'Saved to your shortlist'
        );
      } else if (!serverResult.isSaved && input.isSaved === false) {
        showToast('Removed from Saved');
      }
    },
    onSettled: () => {
      pendingInteractionsRef.current = Math.max(0, pendingInteractionsRef.current - 1);
      // Only refetch once all overlapping interactions settle so earlier refetches never clobber in-flight writes
      if (pendingInteractionsRef.current === 0) {
        queryClient.invalidateQueries({ queryKey: ['digest-edition'] });
        queryClient.invalidateQueries({ queryKey: ['digest-articles'] });
        queryClient.invalidateQueries({ queryKey: ['digest-videos'] });
        queryClient.invalidateQueries({ queryKey: ['digest-saved'] });
      }
    },
  });

  // Lookup currently open article & modal video from latest caches so bookmark/read updates stay live
  const openArticle: DigestArticleDTO | null = React.useMemo(() => {
    if (!openArticleId) return null;
    return (
      scopedArticles.find((a) => a.id === openArticleId) ??
      edition?.articles.find((a) => a.id === openArticleId) ??
      savedShortlist.articles.find((a) => a.id === openArticleId) ??
      (drawerArticle?.id === openArticleId ? drawerArticle : null)
    );
  }, [
    openArticleId,
    scopedArticles,
    edition?.articles,
    savedShortlist.articles,
    drawerArticle,
  ]);

  const activeModalVideo: DigestVideoDTO | null = React.useMemo(() => {
    if (!modalVideo) return null;
    const id = modalVideo.video.id;
    return (
      scopedVideos.find((v) => v.id === id) ??
      edition?.videos.find((v) => v.id === id) ??
      savedShortlist.videos.find((v) => v.id === id) ??
      modalVideo.video
    );
  }, [modalVideo, scopedVideos, edition?.videos, savedShortlist.videos]);

  // Actions
  const setActiveTab = React.useCallback(
    (tab: CultureDigestTab) => {
      setActiveTabState(tab);
      syncUrlParams(tab, filters.selectedIssue);
    },
    [filters.selectedIssue, syncUrlParams]
  );

  const selectIssue = React.useCallback(
    (selection: number | 'all') => {
      setFilters((prev) => applyIssueSwitchReset(prev, selection));
      syncUrlParams(activeTab, selection);
    },
    [activeTab, syncUrlParams]
  );

  const selectAllWeeks = React.useCallback(() => {
    selectIssue('all');
  }, [selectIssue]);

  const returnToLatestIssue = React.useCallback(() => {
    if (latestIssueNumber === null) return;
    setFilters((prev) => applyIssueSwitchReset(prev, latestIssueNumber));
    syncUrlParams(activeTab, latestIssueNumber);
  }, [activeTab, latestIssueNumber, syncUrlParams]);

  const setBlogReadFilter = React.useCallback((readFilter: BlogReadFilter) => {
    setFilters((prev) => ({ ...prev, blogReadFilter: readFilter }));
  }, []);

  const setBlogSearch = React.useCallback((blogSearch: string) => {
    setFilters((prev) => ({ ...prev, blogSearch }));
  }, []);

  const setVideoSearch = React.useCallback((videoSearch: string) => {
    setFilters((prev) => ({ ...prev, videoSearch }));
  }, []);

  const setActiveTheaterVideoId = React.useCallback((videoId: string | null) => {
    setFilters((prev) => ({ ...prev, activeTheaterVideoId: videoId }));
  }, []);

  const nextDinnerPrompt = React.useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      dinnerPromptIndex: prev.dinnerPromptIndex + 1,
      dinnerNotesOpen: false,
    }));
  }, []);

  const toggleDinnerNotes = React.useCallback(() => {
    setFilters((prev) => ({ ...prev, dinnerNotesOpen: !prev.dinnerNotesOpen }));
  }, []);

  const togglePhraseIndex = React.useCallback((idx: number) => {
    setFilters((prev) => ({
      ...prev,
      expandedPhraseIndex: prev.expandedPhraseIndex === idx ? null : idx,
    }));
  }, []);

  const markArticleRead = React.useCallback(
    (article: DigestArticleDTO) => {
      if (article.isRead) return;
      interactionMutation.mutate({
        itemType: DigestItemType.ARTICLE,
        itemId: article.id,
        isRead: true,
        articleSnapshot: article,
        silentToast: true,
      });
    },
    [interactionMutation]
  );

  const toggleSaveArticle = React.useCallback(
    (article: DigestArticleDTO) => {
      interactionMutation.mutate({
        itemType: DigestItemType.ARTICLE,
        itemId: article.id,
        isSaved: !article.isSaved,
        articleSnapshot: article,
      });
    },
    [interactionMutation]
  );

  const toggleSaveVideo = React.useCallback(
    (video: DigestVideoDTO) => {
      interactionMutation.mutate({
        itemType: DigestItemType.VIDEO,
        itemId: video.id,
        isSaved: !video.isSaved,
        videoSnapshot: video,
      });
    },
    [interactionMutation]
  );

  const toggleSaveDinnerPrompt = React.useCallback(
    (prompt: DigestDinnerPromptDTO) => {
      interactionMutation.mutate({
        itemType: DigestItemType.DINNER_PROMPT,
        itemId: prompt.id,
        isSaved: !prompt.isSaved,
        dinnerSnapshot: prompt,
      });
    },
    [interactionMutation]
  );

  const openArticleReader = React.useCallback(
    (article: DigestArticleDTO) => {
      setOpenArticleId(article.id);
      setDrawerArticle(article);
      markArticleRead(article);
    },
    [markArticleRead]
  );

  const closeArticleReader = React.useCallback(() => {
    setOpenArticleId(null);
    setDrawerArticle(null);
  }, []);

  const openVideoTheater = React.useCallback(
    (video: DigestVideoDTO, startSeconds = 0) => {
      setModalVideo({ video, startSeconds });
    },
    []
  );

  const closeVideoTheater = React.useCallback(() => {
    setModalVideo(null);
  }, []);

  const copyTextWithToast = React.useCallback(
    async (text: string, confirmationMessage: string) => {
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        }
      } catch {
        // Fallback still gives confirmation cleanly
      }
      showToast(confirmationMessage);
    },
    [showToast]
  );

  const openAdvisorWithPrompt = React.useCallback((prompt: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('alongside:open-advisor', {
          detail: { prompt },
        })
      );
    }
  }, []);

  // Child display labels & scope-aware tab counts
  const childName = activeChild?.name ?? tierMeta.defaultChildName;
  const childAgeLabel = activeChild ? formatChildAge(activeChild) : tierMeta.defaultAgeLabel;

  const weekArticleCount = isAllWeeks
    ? (articlesQuery.data?.totalInScope ??
        (issues.length > 0
          ? issues.reduce((sum, item) => sum + item.articleCount, 0)
          : (edition?.articles.length ?? 0)))
    : (edition?.articles.length ?? 0);

  const weekVideoCount = isAllWeeks
    ? (videosQuery.data?.totalInScope ??
        (issues.length > 0
          ? issues.reduce((sum, item) => sum + item.videoCount, 0)
          : (edition?.videos.length ?? 0)))
    : (edition?.videos.length ?? 0);

  const headerTotalArticleCount = isAllWeeks
    ? (articlesQuery.data?.articles.length ?? weekArticleCount)
    : (edition?.totalArticleCount ?? 0);

  const headerReadArticleCount = isAllWeeks
    ? (articlesQuery.data?.articles.filter((a) => a.isRead).length ?? 0)
    : (edition?.readArticleCount ?? 0);

  return {
    // Active context
    activeChild,
    childName,
    childAgeLabel,
    resolvedTier,
    tierMeta,
    slangEligible,

    // Issues & edition
    issues,
    edition,
    latestIssueNumber,
    resolvedIssueNumber,
    isAllWeeks,
    weekScope,
    isArchiveEdition,
    isLoadingEdition: editionQuery.isLoading && !edition,
    isLoadingArticles: articlesQuery.isLoading && scopedArticles.length === 0,
    isLoadingVideos: videosQuery.isLoading && scopedVideos.length === 0,
    headerReadArticleCount,
    headerTotalArticleCount,
    weekDisplayArticles,
    weekDisplayVideos,

    // Tabs & counts (calibrated to active week or all weeks)
    activeTab,
    setActiveTab,
    weekArticleCount,
    weekVideoCount,
    savedTotalCount: savedShortlist.totalCount,

    // Issue selection
    selectIssue,
    selectAllWeeks,
    returnToLatestIssue,

    // Tab 2: Blogs (All / Unread + search; week controlled by header selector)
    blogReadFilter: filters.blogReadFilter,
    setBlogReadFilter,
    blogSearch: filters.blogSearch,
    setBlogSearch,
    filteredBlogs: filteredBlogs.items,
    blogsUnreadCount: filteredBlogs.unreadCount,
    totalBlogsInScope: scopedArticles.length,

    // Tab 3: Videos (search; week controlled by header selector)
    videoSearch: filters.videoSearch,
    setVideoSearch,
    filteredVideos,
    activeTheaterVideoId: filters.activeTheaterVideoId,
    setActiveTheaterVideoId,

    // Tab 1 Band 3: Dinner + Optional 7-18 Phrases
    dinnerPromptIndex: filters.dinnerPromptIndex,
    dinnerNotesOpen: filters.dinnerNotesOpen,
    expandedPhraseIndex: filters.expandedPhraseIndex,
    nextDinnerPrompt,
    toggleDinnerNotes,
    togglePhraseIndex,

    // Tab 4: Saved shortlist
    savedShortlist,

    // Interactions & Overlays
    openArticle,
    openArticleReader,
    closeArticleReader,
    modalVideo,
    activeModalVideo,
    openVideoTheater,
    closeVideoTheater,
    markArticleRead,
    toggleSaveArticle,
    toggleSaveVideo,
    toggleSaveDinnerPrompt,

    // Utilities
    toastMessage,
    showToast,
    copyTextWithToast,
    openAdvisorWithPrompt,
  };
}
