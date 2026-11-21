'use client';

import * as React from 'react';
import {
  formatWeekDateRange,
  useCultureDigest,
} from '@/hooks/useCultureDigest';
import { DigestFeedHeader } from '@/components/digest/DigestFeedHeader';
import { WatchThisWeekBand } from '@/components/digest/WatchThisWeekBand';
import { ReadThisWeekBand } from '@/components/digest/ReadThisWeekBand';
import { SundayTableCloserBand } from '@/components/digest/SundayTableCloserBand';
import { BlogsTabView } from '@/components/digest/BlogsTabView';
import { VideosTabView } from '@/components/digest/VideosTabView';
import { SavedShortlistView } from '@/components/digest/SavedShortlistView';
import { BlogReaderDrawer } from '@/components/digest/BlogReaderDrawer';
import { VideoTheaterModal } from '@/components/digest/VideoTheaterModal';
import { cn } from '@/lib/utils';

export interface DigestDashboardClientProps {
  className?: string;
}

export function DigestDashboardClient({ className }: DigestDashboardClientProps) {
  const digest = useCultureDigest();

  const weekRange = digest.edition?.issue
    ? formatWeekDateRange(
        digest.edition.issue.weekStart,
        digest.edition.issue.weekEnd
      )
    : `Issue #${digest.resolvedIssueNumber}`;

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
        weekStart={digest.edition?.issue.weekStart}
        weekEnd={digest.edition?.issue.weekEnd}
        childName={digest.childName}
        childAgeLabel={digest.childAgeLabel}
        tierLabel={digest.tierMeta.tierLabel}
        shortAges={digest.tierMeta.shortAges}
        readArticleCount={digest.edition?.readArticleCount ?? 0}
        totalArticleCount={digest.edition?.totalArticleCount ?? 0}
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

      {/* PANEL 1: THIS WEEK — Calm 3-Band Single-Focus Vertical Rhythm */}
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
                videos={digest.edition.videos}
                childName={digest.childName}
                shortAges={digest.tierMeta.shortAges}
                weekRange={weekRange}
                onOpenVideo={(video) => digest.openVideoTheater(video, 0)}
                onToggleSaveVideo={digest.toggleSaveVideo}
                onViewAllVideos={() => handleSwitchTabAndScrollTop('videos')}
              />

              {/* Band 2: Read This Week (7/5 Magazine Spread — Blogs ONLY) */}
              <ReadThisWeekBand
                articles={digest.edition.articles}
                childName={digest.childName}
                shortAges={digest.tierMeta.shortAges}
                weekRange={weekRange}
                onOpenArticle={digest.openArticleReader}
                onToggleSaveArticle={digest.toggleSaveArticle}
                onViewAllBlogs={() => handleSwitchTabAndScrollTop('blogs')}
              />

              {/* Band 3: Sunday Table Closer + Optional Ages 7–18 Phrase Strip */}
              <SundayTableCloserBand
                issueNumber={digest.resolvedIssueNumber}
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
            </>
          ) : (
            <div className="border-t border-[#131715]/10 py-14 text-center text-[14.5px] text-[#59625D]">
              This weekly edition is currently being prepared. Check back shortly.
            </div>
          )}
        </section>
      )}

      {/* PANEL 2: WEEK-SCOPED BLOGS */}
      {digest.activeTab === 'blogs' && (
        <BlogsTabView
          articles={digest.filteredBlogs}
          unreadCount={digest.blogsUnreadCount}
          issueNumber={digest.resolvedIssueNumber}
          isArchiveEdition={digest.isArchiveEdition}
          childName={digest.childName}
          shortAges={digest.tierMeta.shortAges}
          scope={digest.blogsScope}
          readFilter={digest.blogReadFilter}
          searchQuery={digest.blogSearch}
          isLoading={digest.isLoadingArticles}
          onChangeScope={digest.setBlogsScope}
          onChangeReadFilter={digest.setBlogReadFilter}
          onChangeSearch={digest.setBlogSearch}
          onOpenArticle={digest.openArticleReader}
          onToggleSaveArticle={digest.toggleSaveArticle}
        />
      )}

      {/* PANEL 3: WEEK-SCOPED VIDEOS */}
      {digest.activeTab === 'videos' && (
        <VideosTabView
          videos={digest.filteredVideos}
          issueNumber={digest.resolvedIssueNumber}
          isArchiveEdition={digest.isArchiveEdition}
          childName={digest.childName}
          shortAges={digest.tierMeta.shortAges}
          scope={digest.videosScope}
          durationBucket={digest.videoDuration}
          searchQuery={digest.videoSearch}
          activeTheaterVideoId={digest.activeTheaterVideoId}
          isLoading={digest.isLoadingVideos}
          onChangeScope={digest.setVideosScope}
          onChangeDuration={digest.setVideoDuration}
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
            `${article.title} — Key shift: ${article.keyShift} (${article.sourceUrl})`,
            'Summary copied to text your partner'
          )
        }
        onAskAdvisor={digest.openAdvisorWithPrompt}
      />

      {/* OVERLAY 2: CENTERED VIDEO THEATER MODAL */}
      <VideoTheaterModal
        video={digest.modalVideo?.video ?? null}
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
