'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  formatWeekDateRange,
  useCultureDigest,
} from '@/hooks/useCultureDigest';
import { DigestFeedHeader } from '@/components/digest/DigestFeedHeader';
import { WatchThisWeekBand } from '@/components/digest/WatchThisWeekBand';
import { ReadThisWeekBand } from '@/components/digest/ReadThisWeekBand';
import {
  PlayThisWeekBand,
  isPlayThisWeekEligible,
} from '@/components/digest/PlayThisWeekBand';
import { SundayTableCloserBand } from '@/components/digest/SundayTableCloserBand';
import { cn } from '@/lib/utils';

// Lazy-load secondary tabs and overlay modals to keep the default 'week' tab bundle ultra-lean
const BlogsTabView = dynamic(
  () => import('@/components/digest/BlogsTabView').then((mod) => mod.BlogsTabView),
  {
    loading: () => (
      <div className="py-14 text-center text-[#59625D] text-sm animate-pulse">
        Loading blogs...
      </div>
    ),
  }
);

const VideosTabView = dynamic(
  () => import('@/components/digest/VideosTabView').then((mod) => mod.VideosTabView),
  {
    loading: () => (
      <div className="py-14 text-center text-[#59625D] text-sm animate-pulse">
        Loading videos...
      </div>
    ),
  }
);

const SavedShortlistView = dynamic(
  () => import('@/components/digest/SavedShortlistView').then((mod) => mod.SavedShortlistView),
  {
    loading: () => (
      <div className="py-14 text-center text-[#59625D] text-sm animate-pulse">
        Loading saved list...
      </div>
    ),
  }
);

const BlogReaderDrawer = dynamic(
  () => import('@/components/digest/BlogReaderDrawer').then((mod) => mod.BlogReaderDrawer),
  { ssr: false }
);

const VideoTheaterModal = dynamic(
  () => import('@/components/digest/VideoTheaterModal').then((mod) => mod.VideoTheaterModal),
  { ssr: false }
);

export interface DigestDashboardClientProps {
  className?: string;
}

export function DigestDashboardClient({ className }: DigestDashboardClientProps) {
  const digest = useCultureDigest();

  const weekRange = digest.isAllWeeks
    ? 'all weeks'
    : digest.edition?.issue
      ? formatWeekDateRange(
          digest.edition.issue.weekStart,
          digest.edition.issue.weekEnd
        )
      : digest.resolvedIssueNumber !== null
        ? `Issue #${digest.resolvedIssueNumber}`
        : 'This week';

  const showPlayThisWeek = isPlayThisWeekEligible(
    digest.activeChild?.age,
    digest.resolvedTier
  );

  // Smoothly scroll to #play-this-week when arriving from Home / Devices / /brain-games
  React.useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !showPlayThisWeek ||
      digest.activeTab !== 'week' ||
      !digest.edition
    ) {
      return;
    }
    if (window.location.hash === '#play-this-week') {
      const target = document.getElementById('play-this-week');
      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [showPlayThisWeek, digest.activeTab, digest.edition]);

  const handleSwitchTabAndScrollTop = (tab: 'week' | 'blogs' | 'videos' | 'saved') => {
    digest.setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      data-testid="culture-digest-hub"
      className={cn(
        'mx-auto w-full max-w-[1180px] text-[#131715]',
        className
      )}
    >
      {/* Editorial Nameplate, Page-Wide Weekly Issue Picker & 4-Tab Bar */}
      <DigestFeedHeader
        issueNumber={digest.resolvedIssueNumber}
        latestIssueNumber={digest.latestIssueNumber}
        isAllWeeks={digest.isAllWeeks}
        weekStart={digest.edition?.issue.weekStart}
        weekEnd={digest.edition?.issue.weekEnd}
        childName={digest.childName}
        childAgeLabel={digest.childAgeLabel}
        tierLabel={digest.tierMeta.tierLabel}
        shortAges={digest.tierMeta.shortAges}
        readArticleCount={digest.headerReadArticleCount}
        totalArticleCount={digest.headerTotalArticleCount}
        issues={digest.issues}
        isArchiveEdition={digest.isArchiveEdition}
        activeTab={digest.activeTab}
        weekArticleCount={digest.weekArticleCount}
        weekVideoCount={digest.weekVideoCount}
        savedTotalCount={digest.savedTotalCount}
        onSelectIssue={digest.selectIssue}
        onReturnToLatest={digest.returnToLatestIssue}
        onSelectTab={digest.setActiveTab}
      />

      {/* PANEL 1: THIS WEEK - Calm 3-Band Single-Focus Vertical Rhythm */}
      {digest.activeTab === 'week' && (
        <section
          id="digest-panel-week"
          role="tabpanel"
          aria-labelledby="digest-tab-week"
          data-testid="week-tab-panel"
          className="flex flex-col gap-10 py-8 pb-16 sm:gap-12"
        >
          {digest.isLoadingEdition ? (
            <div className="space-y-8" aria-label="Loading weekly briefing">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="aspect-video rounded-[10px] bg-[#F3F1EA]" />
                <div className="aspect-video rounded-[10px] bg-[#F3F1EA]" />
                <div className="aspect-video rounded-[10px] bg-[#F3F1EA]" />
              </div>
              <div className="h-64 rounded-[12px] bg-[#F3F1EA]" />
            </div>
          ) : digest.edition ? (
            <>
              {/* Band 1: Watch This Week */}
              <WatchThisWeekBand
                videos={digest.weekDisplayVideos}
                childName={digest.childName}
                shortAges={digest.tierMeta.shortAges}
                weekRange={weekRange}
                isAllWeeks={digest.isAllWeeks}
                onOpenVideo={(video) => digest.openVideoTheater(video, 0)}
                onToggleSaveVideo={digest.toggleSaveVideo}
                onViewAllVideos={() => handleSwitchTabAndScrollTop('videos')}
              />

              {/* Band 2: Read This Week (7/5 Magazine Spread - Blogs ONLY) */}
              <div className="content-auto">
                <ReadThisWeekBand
                  articles={digest.weekDisplayArticles}
                  childName={digest.childName}
                  shortAges={digest.tierMeta.shortAges}
                  weekRange={weekRange}
                  isAllWeeks={digest.isAllWeeks}
                  onOpenArticle={digest.openArticleReader}
                  onToggleSaveArticle={digest.toggleSaveArticle}
                  onViewAllBlogs={() => handleSwitchTabAndScrollTop('blogs')}
                />
              </div>

              {/* Band 3 (Ages 0–8 ONLY): Play This Week Screen-Free Studio */}
              {showPlayThisWeek && (
                <div className="content-auto">
                  <PlayThisWeekBand
                    childId={digest.activeChild?.id}
                    childName={digest.childName}
                    childAge={digest.activeChild?.age}
                    tier={digest.resolvedTier}
                  />
                </div>
              )}

              {/* Band 4: Sunday Table Closer + Optional Ages 7–18 Phrase Strip */}
              <div className="content-auto">
                <SundayTableCloserBand
                  issueNumber={digest.edition.issue.issueNumber}
                  tier={digest.resolvedTier}
                  shortAges={digest.tierMeta.shortAges}
                  childName={digest.childName}
                  dinnerPrompts={digest.edition.dinnerPrompts}
                  dinnerPromptIndex={digest.dinnerPromptIndex}
                  dinnerNotesOpen={digest.dinnerNotesOpen}
                  phrases={digest.edition.phrases}
                  expandedPhraseIndex={digest.expandedPhraseIndex}
                  onNextPrompt={digest.nextDinnerPrompt}
                  onToggleNotes={digest.toggleDinnerNotes}
                  onCopyQuestion={(q) =>
                    digest.copyTextWithToast(q, 'Dinner question copied')
                  }
                  onShareWithPartner={(q) =>
                    digest.copyTextWithToast(
                      `Tonight's dinner question for ${digest.childName} (from Alongside): "${q}"`,
                      'Ready-to-text note copied for your partner'
                    )
                  }
                  onToggleSaveDinner={digest.toggleSaveDinnerPrompt}
                  onTogglePhrase={digest.togglePhraseIndex}
                  onAskAdvisor={digest.openAdvisorWithPrompt}
                />
              </div>
            </>
          ) : (
            <div className="border-t border-[#131715]/10 py-14 text-center text-[14.5px] text-[#59625D]">
              This weekly edition is currently being prepared. Check back shortly.
            </div>
          )}
        </section>
      )}

      {/* PANEL 2: BLOGS */}
      {digest.activeTab === 'blogs' && (
        <BlogsTabView
          articles={digest.filteredBlogs}
          unreadCount={digest.blogsUnreadCount}
          issueNumber={digest.resolvedIssueNumber}
          childName={digest.childName}
          shortAges={digest.tierMeta.shortAges}
          scope={digest.weekScope}
          readFilter={digest.blogReadFilter}
          searchQuery={digest.blogSearch}
          isLoading={digest.isLoadingArticles}
          onBrowseAllWeeks={digest.selectAllWeeks}
          onChangeReadFilter={digest.setBlogReadFilter}
          onChangeSearch={digest.setBlogSearch}
          onOpenArticle={digest.openArticleReader}
          onToggleSaveArticle={digest.toggleSaveArticle}
        />
      )}

      {/* PANEL 3: VIDEOS */}
      {digest.activeTab === 'videos' && (
        <VideosTabView
          videos={digest.filteredVideos}
          issueNumber={digest.resolvedIssueNumber}
          childName={digest.childName}
          shortAges={digest.tierMeta.shortAges}
          scope={digest.weekScope}
          searchQuery={digest.videoSearch}
          activeTheaterVideoId={digest.activeTheaterVideoId}
          isLoading={digest.isLoadingVideos}
          onBrowseAllWeeks={digest.selectAllWeeks}
          onChangeSearch={digest.setVideoSearch}
          onSelectTheaterVideo={digest.setActiveTheaterVideoId}
          onToggleSaveVideo={digest.toggleSaveVideo}
        />
      )}

      {/* PANEL 4: SAVED SHORTLIST */}
      {digest.activeTab === 'saved' && (
        <SavedShortlistView
          shortlist={digest.savedShortlist}
          childName={digest.childName}
          shortAges={digest.tierMeta.shortAges}
          onBrowseThisWeek={() => handleSwitchTabAndScrollTop('week')}
          onOpenArticle={digest.openArticleReader}
          onRemoveArticle={digest.toggleSaveArticle}
          onOpenVideo={(video) => digest.openVideoTheater(video, 0)}
          onRemoveVideo={digest.toggleSaveVideo}
          onCopyDinnerQuestion={(q) =>
            digest.copyTextWithToast(q, 'Copied to clipboard')
          }
          onRemoveDinner={digest.toggleSaveDinnerPrompt}
        />
      )}

      {/* OVERLAY 1: SLIDE-OVER BLOG READER DRAWER */}
      <BlogReaderDrawer
        article={digest.openArticle}
        childName={digest.childName}
        childAgeLabel={digest.childAgeLabel}
        shortAges={digest.tierMeta.shortAges}
        relatedCourseTitle={digest.tierMeta.relatedCourseTitle}
        onClose={digest.closeArticleReader}
        onToggleSave={digest.toggleSaveArticle}
        onShareArticle={(article) =>
          digest.copyTextWithToast(
            `${article.title} - Key shift: ${article.keyShift} (${article.sourceUrl})`,
            'Summary copied to text your partner'
          )
        }
        onAskAdvisor={digest.openAdvisorWithPrompt}
      />

      {/* OVERLAY 2: CENTERED VIDEO THEATER MODAL */}
      <VideoTheaterModal
        video={digest.activeModalVideo}
        initialStartSeconds={digest.modalVideo?.startSeconds ?? 0}
        shortAges={digest.tierMeta.shortAges}
        onClose={digest.closeVideoTheater}
        onToggleSave={digest.toggleSaveVideo}
      />

      {/* QUIET EPHEMERAL TOAST */}
      {digest.toastMessage && (
        <div
          role="status"
          aria-live="polite"
          data-testid="digest-toast"
          className="fixed bottom-24 md:bottom-6 left-1/2 z-50 max-w-[calc(100vw-32px)] -translate-x-1/2 rounded-[10px] bg-[#10251C] px-4 py-2.5 text-center text-[13.5px] font-medium text-[#FAF9F5] shadow-xl"
        >
          {digest.toastMessage}
        </div>
      )}
    </div>
  );
}
