'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  DEFAULT_DIGEST_TIER,
  DevelopmentalTier,
  DigestItemType,
  isSlangEligibleTier,
  matchesVideoDurationBucket,
  resolveDigestTierBucket,
  type CanonicalDigestTier,
  type ChildDTO,
  type DigestArticleDTO,
  type DigestArticlesResponseDTO,
  type DigestDinnerPromptDTO,
  type DigestIssueSummaryDTO,
  type DigestQueryScope,
  type DigestVideoDTO,
  type DigestVideoDurationBucket,
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
import { DIGEST_TIER_METADATA } from '@/lib/api/mocks/digestMocks';
import {
  formatChildAge,
  selectActiveChild,
  useChildContextStore,
} from '@/stores/useChildContextStore';

export type CultureDigestTab = 'week' | 'blogs' | 'videos' | 'saved';
export type BlogReadFilter = 'all' | 'unread';

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
 */
export function resolveActiveDigestTier(
  child: ChildDTO | null | undefined
): CanonicalDigestTier {
  if (!child) return DEFAULT_DIGEST_TIER;

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
 * Parses ?tab= and ?issue= safely from a URL search string.
 */
export function parseDigestUrlParams(search: string): {
  tab?: CultureDigestTab;
  issueNumber?: number;
} {
  const params = new URLSearchParams(search);
  const rawTab = params.get('tab');
  const rawIssue = params.get('issue');

  const tab =
    rawTab && VALID_TABS.has(rawTab as CultureDigestTab)
      ? (rawTab as CultureDigestTab)
      : undefined;

  const parsedIssue = rawIssue ? Number(rawIssue) : NaN;
  const issueNumber =
    Number.isInteger(parsedIssue) && parsedIssue > 0 ? parsedIssue : undefined;

  return { tab, issueNumber };
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
 * Pure filter for the Videos tab (Duration bucket + Search).
 */
export function filterVideosForShelf(
  videos: DigestVideoDTO[],
  options: {
    durationBucket: DigestVideoDurationBucket;
    searchQuery: string;
  }
): DigestVideoDTO[] {
  const q = options.searchQuery.trim().toLowerCase();

  return videos.filter((video) => {
    if (!matchesVideoDurationBucket(video.durationMinutes, options.durationBucket)) {
      return false;
    }
    if (!q) return true;
    return (
      video.title.toLowerCase().includes(q) ||
      video.presenter.toLowerCase().includes(q) ||
      video.channelName.toLowerCase().includes(q) ||
      video.takeaway.toLowerCase().includes(q)
    );
  });
}

/**
 * Pure state machine helper for week-scoped transitions when switching issue or child.
 */
export interface DigestScopeFilterState {
  selectedIssueNumber: number | null;
  blogsScope: DigestQueryScope;
  videosScope: DigestQueryScope;
  blogReadFilter: BlogReadFilter;
  blogSearch: string;
  videoDuration: DigestVideoDurationBucket;
  videoSearch: string;
  activeTheaterVideoId: string | null;
  dinnerPromptIndex: number;
  dinnerNotesOpen: boolean;
  expandedPhraseIndex: number | null;
}

export function createInitialDigestFilterState(
  initialIssueNumber: number | null = null
): DigestScopeFilterState {
  return {
    selectedIssueNumber: initialIssueNumber,
    blogsScope: 'issue',
    videosScope: 'issue',
    blogReadFilter: 'all',
    blogSearch: '',
    videoDuration: 'all',
    videoSearch: '',
    activeTheaterVideoId: null,
    dinnerPromptIndex: 0,
    dinnerNotesOpen: false,
    expandedPhraseIndex: null,
  };
}

export function applyIssueSwitchReset(
  prev: DigestScopeFilterState,
  nextIssueNumber: number
): DigestScopeFilterState {
  return {
    ...prev,
    selectedIssueNumber: nextIssueNumber,
    blogsScope: 'issue',
    videosScope: 'issue',
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
    ...createInitialDigestFilterState(prev.selectedIssueNumber),
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

export function useCultureDigest() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const activeChild = useChildContextStore(selectActiveChild);

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
    createInitialDigestFilterState(initialUrlState.issueNumber ?? null)
  );

  // Overlays
  const [openArticleId, setOpenArticleId] = React.useState<string | null>(null);
  const [modalVideo, setModalVideo] = React.useState<{
    video: DigestVideoDTO;
    startSeconds: number;
  } | null>(null);

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
      setModalVideo(null);
    }
  }, [activeChild?.id, resolvedTier]);

  // URL sync helper (?issue=&tab=) without full Next.js navigation reload
  const syncUrlParams = React.useCallback(
    (nextTab: CultureDigestTab, nextIssue: number | null) => {
      if (typeof window === 'undefined') return;
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', nextTab);
        if (nextIssue !== null) {
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

  // 1. Query: Published weekly issues list
  const issuesQuery = useQuery({
    queryKey: ['digest-issues', resolvedTier],
    queryFn: () => listDigestIssues(resolvedTier),
    staleTime: 5 * 60 * 1000,
  });

  // 2. Query: Active weekly edition (Tab 1 + header counts)
  const editionQuery = useQuery({
    queryKey: [
      'digest-edition',
      filters.selectedIssueNumber ?? 'latest',
      resolvedTier,
      activeChild?.id ?? null,
    ],
    queryFn: () =>
      getWeeklyDigestEdition(filters.selectedIssueNumber ?? 'latest', {
        tier: resolvedTier,
        childId: activeChild?.id,
      }),
    staleTime: 2 * 60 * 1000,
  });

  const issues = issuesQuery.data ?? [];
  const edition = editionQuery.data ?? null;
  const latestIssueNumber =
    issues.length > 0
      ? Math.max(...issues.map((i) => i.issueNumber))
      : (edition?.issue.issueNumber ?? filters.selectedIssueNumber ?? 42);
  const resolvedIssueNumber =
    edition?.issue.issueNumber ?? filters.selectedIssueNumber ?? latestIssueNumber;
  const isArchiveEdition =
    issues.length > 0 && resolvedIssueNumber !== latestIssueNumber;

  // 3. Query: Week-scoped or All-weeks Blogs (Tab 2)
  const articlesQuery = useQuery({
    queryKey: [
      'digest-articles',
      resolvedIssueNumber,
      filters.blogsScope,
      resolvedTier,
      activeChild?.id ?? null,
    ],
    queryFn: () =>
      listDigestArticles({
        issueNumber: filters.blogsScope === 'issue' ? resolvedIssueNumber : undefined,
        scope: filters.blogsScope,
        tier: resolvedTier,
        childId: activeChild?.id,
      }),
    enabled: activeTab === 'blogs',
    staleTime: 2 * 60 * 1000,
  });

  // 4. Query: Week-scoped or All-weeks Videos (Tab 3)
  const videosQuery = useQuery({
    queryKey: [
      'digest-videos',
      resolvedIssueNumber,
      filters.videosScope,
      resolvedTier,
      activeChild?.id ?? null,
    ],
    queryFn: () =>
      listDigestVideos({
        issueNumber: filters.videosScope === 'issue' ? resolvedIssueNumber : undefined,
        scope: filters.videosScope,
        tier: resolvedTier,
        childId: activeChild?.id,
      }),
    enabled: activeTab === 'videos',
    staleTime: 2 * 60 * 1000,
  });

  // 5. Query: Saved shortlist (Tab 4 + tab badge count)
  const savedQuery = useQuery({
    queryKey: ['digest-saved', resolvedTier, activeChild?.id ?? null],
    queryFn: () =>
      getSavedDigestShortlist({
        tier: resolvedTier,
        childId: activeChild?.id,
      }),
    staleTime: 60 * 1000,
  });

  const savedShortlist: SavedDigestShortlistDTO = savedQuery.data ?? {
    articles: [],
    videos: [],
    dinnerPrompts: [],
    totalCount: 0,
  };

  // Resolve current scoped lists cleanly (instant hydration from edition when scoped to 'issue')
  const scopedArticles: DigestArticleDTO[] = React.useMemo(() => {
    if (filters.blogsScope === 'issue') {
      if (articlesQuery.data?.articles) return articlesQuery.data.articles;
      return edition?.articles ?? [];
    }
    return articlesQuery.data?.articles ?? edition?.articles ?? [];
  }, [filters.blogsScope, articlesQuery.data, edition?.articles]);

  const scopedVideos: DigestVideoDTO[] = React.useMemo(() => {
    if (filters.videosScope === 'issue') {
      if (videosQuery.data?.videos) return videosQuery.data.videos;
      return edition?.videos ?? [];
    }
    return videosQuery.data?.videos ?? edition?.videos ?? [];
  }, [filters.videosScope, videosQuery.data, edition?.videos]);

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
        durationBucket: filters.videoDuration,
        searchQuery: filters.videoSearch,
      }),
    [scopedVideos, filters.videoDuration, filters.videoSearch]
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
      }),
    onMutate: async (input) => {
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

      // Patch all cached editions
      queryClient.setQueriesData<WeeklyDigestEditionDTO>(
        { queryKey: ['digest-edition'] },
        (old) => {
          if (!old) return old;
          if (input.itemType === DigestItemType.ARTICLE) {
            const articles = old.articles.map((a) =>
              a.id === input.itemId
                ? {
                    ...a,
                    isRead: input.isRead !== undefined ? input.isRead : a.isRead,
                    isSaved: input.isSaved !== undefined ? input.isSaved : a.isSaved,
                  }
                : a
            );
            return {
              ...old,
              articles,
              readArticleCount: articles.filter((a) => a.isRead).length,
            };
          }
          if (input.itemType === DigestItemType.VIDEO) {
            return {
              ...old,
              videos: old.videos.map((v) =>
                v.id === input.itemId && input.isSaved !== undefined
                  ? { ...v, isSaved: input.isSaved }
                  : v
              ),
            };
          }
          if (input.itemType === DigestItemType.DINNER_PROMPT) {
            return {
              ...old,
              dinnerPrompts: old.dinnerPrompts.map((d) =>
                d.id === input.itemId && input.isSaved !== undefined
                  ? { ...d, isSaved: input.isSaved }
                  : d
              ),
            };
          }
          return old;
        }
      );

      // Patch cached articles lists
      if (input.itemType === DigestItemType.ARTICLE) {
        queryClient.setQueriesData<DigestArticlesResponseDTO>(
          { queryKey: ['digest-articles'] },
          (old) => {
            if (!old) return old;
            const articles = old.articles.map((a) =>
              a.id === input.itemId
                ? {
                    ...a,
                    isRead: input.isRead !== undefined ? input.isRead : a.isRead,
                    isSaved: input.isSaved !== undefined ? input.isSaved : a.isSaved,
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
      if (input.itemType === DigestItemType.VIDEO && input.isSaved !== undefined) {
        queryClient.setQueriesData<DigestVideosResponseDTO>(
          { queryKey: ['digest-videos'] },
          (old) => {
            if (!old) return old;
            return {
              ...old,
              videos: old.videos.map((v) =>
                v.id === input.itemId ? { ...v, isSaved: input.isSaved! } : v
              ),
            };
          }
        );
      }

      // Patch cached saved shortlist
      if (input.isSaved !== undefined) {
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

            if (input.itemType === DigestItemType.ARTICLE) {
              if (input.isSaved) {
                if (
                  input.articleSnapshot &&
                  !articles.some((a) => a.id === input.itemId)
                ) {
                  articles = [
                    { ...input.articleSnapshot, isSaved: true },
                    ...articles,
                  ];
                }
              } else {
                articles = articles.filter((a) => a.id !== input.itemId);
              }
            } else if (input.itemType === DigestItemType.VIDEO) {
              if (input.isSaved) {
                if (
                  input.videoSnapshot &&
                  !videos.some((v) => v.id === input.itemId)
                ) {
                  videos = [{ ...input.videoSnapshot, isSaved: true }, ...videos];
                }
              } else {
                videos = videos.filter((v) => v.id !== input.itemId);
              }
            } else if (input.itemType === DigestItemType.DINNER_PROMPT) {
              if (input.isSaved) {
                if (
                  input.dinnerSnapshot &&
                  !dinnerPrompts.some((d) => d.id === input.itemId)
                ) {
                  dinnerPrompts = [
                    { ...input.dinnerSnapshot, isSaved: true },
                    ...dinnerPrompts,
                  ];
                }
              } else {
                dinnerPrompts = dinnerPrompts.filter((d) => d.id !== input.itemId);
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

      // Update active modal video saved flag if open
      if (input.itemType === DigestItemType.VIDEO && input.isSaved !== undefined) {
        setModalVideo((prev) =>
          prev && prev.video.id === input.itemId
            ? { ...prev, video: { ...prev.video, isSaved: input.isSaved! } }
            : prev
        );
      }

      return { prevEditions, prevArticles, prevVideos, prevSaved };
    },
    onError: (_err, _input, context) => {
      if (!context) return;
      context.prevEditions.forEach(([key, data]) => queryClient.setQueryData(key, data));
      context.prevArticles.forEach(([key, data]) => queryClient.setQueryData(key, data));
      context.prevVideos.forEach(([key, data]) => queryClient.setQueryData(key, data));
      context.prevSaved.forEach(([key, data]) => queryClient.setQueryData(key, data));
      showToast('Could not save that change. Please try again.');
    },
    onSuccess: (_data, input) => {
      if (input.silentToast) return;
      if (input.isSaved === true) {
        showToast(
          input.itemType === DigestItemType.DINNER_PROMPT
            ? 'Saved for Sunday dinner'
            : 'Saved to your shortlist'
        );
      } else if (input.isSaved === false) {
        showToast('Removed from Saved');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['digest-edition'] });
      queryClient.invalidateQueries({ queryKey: ['digest-articles'] });
      queryClient.invalidateQueries({ queryKey: ['digest-videos'] });
      queryClient.invalidateQueries({ queryKey: ['digest-saved'] });
    },
  });

  // Lookup currently open article from latest caches so bookmark/read updates live inside drawer
  const openArticle: DigestArticleDTO | null = React.useMemo(() => {
    if (!openArticleId) return null;
    return (
      scopedArticles.find((a) => a.id === openArticleId) ??
      edition?.articles.find((a) => a.id === openArticleId) ??
      savedShortlist.articles.find((a) => a.id === openArticleId) ??
      null
    );
  }, [openArticleId, scopedArticles, edition?.articles, savedShortlist.articles]);

  // Actions
  const setActiveTab = React.useCallback(
    (tab: CultureDigestTab) => {
      setActiveTabState(tab);
      syncUrlParams(tab, filters.selectedIssueNumber);
    },
    [filters.selectedIssueNumber, syncUrlParams]
  );

  const selectIssue = React.useCallback(
    (issueNumber: number) => {
      setFilters((prev) => applyIssueSwitchReset(prev, issueNumber));
      syncUrlParams(activeTab, issueNumber);
    },
    [activeTab, syncUrlParams]
  );

  const returnToLatestIssue = React.useCallback(() => {
    setFilters((prev) => applyIssueSwitchReset(prev, latestIssueNumber));
    syncUrlParams(activeTab, latestIssueNumber);
  }, [activeTab, latestIssueNumber, syncUrlParams]);

  const setBlogsScope = React.useCallback((scope: DigestQueryScope) => {
    setFilters((prev) => ({ ...prev, blogsScope: scope }));
  }, []);

  const setBlogReadFilter = React.useCallback((readFilter: BlogReadFilter) => {
    setFilters((prev) => ({ ...prev, blogReadFilter: readFilter }));
  }, []);

  const setBlogSearch = React.useCallback((blogSearch: string) => {
    setFilters((prev) => ({ ...prev, blogSearch }));
  }, []);

  const setVideosScope = React.useCallback((scope: DigestQueryScope) => {
    setFilters((prev) => ({
      ...prev,
      videosScope: scope,
      activeTheaterVideoId: null,
    }));
  }, []);

  const setVideoDuration = React.useCallback(
    (videoDuration: DigestVideoDurationBucket) => {
      setFilters((prev) => ({ ...prev, videoDuration }));
    },
    []
  );

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
      markArticleRead(article);
    },
    [markArticleRead]
  );

  const closeArticleReader = React.useCallback(() => {
    setOpenArticleId(null);
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

  // Child display labels
  const childName = activeChild?.name ?? tierMeta.defaultChildName;
  const childAgeLabel = activeChild ? formatChildAge(activeChild) : tierMeta.defaultAgeLabel;

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
    isArchiveEdition,
    isLoadingEdition: editionQuery.isLoading && !edition,
    isLoadingArticles: articlesQuery.isLoading && scopedArticles.length === 0,
    isLoadingVideos: videosQuery.isLoading && scopedVideos.length === 0,

    // Tabs & counts (week-scoped counts on Blogs & Videos tabs)
    activeTab,
    setActiveTab,
    weekArticleCount: edition?.articles.length ?? 0,
    weekVideoCount: edition?.videos.length ?? 0,
    savedTotalCount: savedShortlist.totalCount,

    // Issue selection
    selectIssue,
    returnToLatestIssue,

    // Tab 2: Blogs (week-scoped by default + minimalist All / Unread)
    blogsScope: filters.blogsScope,
    setBlogsScope,
    blogReadFilter: filters.blogReadFilter,
    setBlogReadFilter,
    blogSearch: filters.blogSearch,
    setBlogSearch,
    filteredBlogs: filteredBlogs.items,
    blogsUnreadCount: filteredBlogs.unreadCount,
    totalBlogsInScope: scopedArticles.length,

    // Tab 3: Videos (week-scoped by default + duration filter)
    videosScope: filters.videosScope,
    setVideosScope,
    videoDuration: filters.videoDuration,
    setVideoDuration,
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
