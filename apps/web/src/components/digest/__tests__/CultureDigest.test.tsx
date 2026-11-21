import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  CANONICAL_DIGEST_TIERS,
  DevelopmentalTier,
  isSlangEligibleTier,
  type DigestArticleDTO,
  type DigestVideoDTO,
} from '@alongside/shared';
import {
  getMockDigestArticles,
  getMockDigestIssues,
  getMockDigestVideos,
  getMockSavedShortlist,
  getMockWeeklyEdition,
} from '@/lib/api/mocks/digestMocks';
import {
  applyChildSwitchReset,
  applyIssueSwitchReset,
  buildYouTubeEmbedUrl,
  createInitialDigestFilterState,
  filterBlogsMinimalist,
  filterVideosForShelf,
  formatShortPublishDate,
  formatWeekDateRange,
  getSafeExternalHref,
  parseDigestUrlParams,
  splitJumpChipLabel,
} from '@/hooks/useCultureDigest';
import { DigestFeedHeader } from '../DigestFeedHeader';
import { WatchThisWeekBand } from '../WatchThisWeekBand';
import { ReadThisWeekBand } from '../ReadThisWeekBand';
import { SundayTableCloserBand } from '../SundayTableCloserBand';
import { WeeklyPhrasesStrip } from '../WeeklyPhrasesStrip';
import { BlogsTabView } from '../BlogsTabView';
import { VideosTabView } from '../VideosTabView';
import { SavedShortlistView } from '../SavedShortlistView';
import { BlogReaderDrawer } from '../BlogReaderDrawer';
import { VideoTheaterModal } from '../VideoTheaterModal';

describe('PLAN-51: Culture & Trends Calm Weekly Editorial Hub', () => {
  const teenTier = DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
  const toddlerTier = DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;
  const preschoolTier = DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
  const elemTier = DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;

  describe('1. Week-Scoped Blogs & Videos Switching (Issue #42 vs #41 + All Weeks)', () => {
    it('defaults Blogs and Videos to selected week scope and resets cleanly on issue switch', () => {
      const initial = createInitialDigestFilterState(42);
      expect(initial.blogsScope).toBe('issue');
      expect(initial.videosScope).toBe('issue');

      // Widen both to all weeks, then switch to Issue #41 -> must snap back to week-scoped
      const widened = {
        ...initial,
        blogsScope: 'all' as const,
        videosScope: 'all' as const,
        dinnerPromptIndex: 2,
        expandedPhraseIndex: 1,
      };
      const afterSwitch = applyIssueSwitchReset(widened, 41);
      expect(afterSwitch.selectedIssueNumber).toBe(41);
      expect(afterSwitch.blogsScope).toBe('issue');
      expect(afterSwitch.videosScope).toBe('issue');
      expect(afterSwitch.dinnerPromptIndex).toBe(0);
      expect(afterSwitch.expandedPhraseIndex).toBeNull();

      // Switching child resets filters cleanly too
      const afterChild = applyChildSwitchReset({
        ...afterSwitch,
        blogReadFilter: 'unread',
        blogSearch: 'sleep',
        videoDuration: 'short',
      });
      expect(afterChild.blogReadFilter).toBe('all');
      expect(afterChild.blogSearch).toBe('');
      expect(afterChild.videoDuration).toBe('all');
      expect(afterChild.blogsScope).toBe('issue');
      expect(afterChild.videosScope).toBe('issue');
    });

    it('returns strictly Issue #42 or Issue #41 blogs/videos when scoped to issue, and widens on All weeks', () => {
      const blogs42 = getMockDigestArticles({
        issueNumber: 42,
        scope: 'issue',
        tier: teenTier,
      });
      const blogs41 = getMockDigestArticles({
        issueNumber: 41,
        scope: 'issue',
        tier: teenTier,
      });
      const blogsAll = getMockDigestArticles({
        scope: 'all',
        tier: teenTier,
      });

      expect(blogs42.articles.length).toBe(3);
      expect(blogs42.articles.every((a) => a.issueNumber === 42)).toBe(true);
      expect(blogs41.articles.length).toBe(3);
      expect(blogs41.articles.every((a) => a.issueNumber === 41)).toBe(true);
      expect(blogs42.articles[0]!.id).not.toBe(blogs41.articles[0]!.id);
      expect(blogsAll.articles.length).toBeGreaterThan(blogs42.articles.length);

      const videos42 = getMockDigestVideos({
        issueNumber: 42,
        scope: 'issue',
        tier: teenTier,
      });
      const videos41 = getMockDigestVideos({
        issueNumber: 41,
        scope: 'issue',
        tier: teenTier,
      });
      const videosAll = getMockDigestVideos({
        scope: 'all',
        tier: teenTier,
      });

      expect(videos42.videos.every((v) => v.issueNumber === 42)).toBe(true);
      expect(videos41.videos.every((v) => v.issueNumber === 41)).toBe(true);
      expect(videosAll.videos.length).toBeGreaterThan(videos42.videos.length);
    });

    it('renders DigestFeedHeader with week-scoped counts, archive return banner, and zero duplicate child picker', () => {
      const issues = getMockDigestIssues(teenTier);
      const edition41 = getMockWeeklyEdition(41, teenTier);

      const html = renderToStaticMarkup(
        <DigestFeedHeader
          issueNumber={41}
          latestIssueNumber={42}
          weekStart={edition41.issue.weekStart}
          weekEnd={edition41.issue.weekEnd}
          childName="Maya"
          childAgeLabel="14 yrs"
          tierLabel="Early Adolescence"
          shortAges="Ages 13–15"
          readArticleCount={1}
          totalArticleCount={3}
          issues={issues}
          isArchiveEdition={true}
          activeTab="week"
          weekArticleCount={edition41.articles.length}
          weekVideoCount={edition41.videos.length}
          savedTotalCount={2}
          onSelectIssue={vi.fn()}
          onReturnToLatest={vi.fn()}
          onSelectTab={vi.fn()}
        />
      );

      expect(html).toContain('Culture &amp; Trends');
      expect(html).toContain('Issue No. 41');
      expect(html).toContain('1 of 3 read');
      expect(html).toContain('data-testid="digest-archive-banner"');
      expect(html).toContain('Return to this week (#42)');
      expect(html).toContain('data-testid="digest-tab-blogs"');
      expect(html).toContain('data-testid="digest-tab-videos"');
      expect(html).toContain('data-testid="digest-tab-saved"');
      // Zero legacy noisy tabs or duplicate child selector
      expect(html).not.toContain('App &amp; Media Watch');
      expect(html).not.toContain('Language Decoder');
      expect(html).not.toContain('Active child profile');
    });

    it('parses URL search params safely for ?issue= and ?tab=', () => {
      expect(parseDigestUrlParams('?issue=41&tab=blogs')).toEqual({
        issueNumber: 41,
        tab: 'blogs',
      });
      expect(parseDigestUrlParams('?issue=invalid&tab=bogus')).toEqual({
        issueNumber: undefined,
        tab: undefined,
      });
    });
  });

  describe('2. Minimalist All / Unread Blog Filtering (Zero Feature Essays / Myth Checks Pills)', () => {
    it('decrements unread count when an article is read and hides read articles under Unread', () => {
      const edition = getMockWeeklyEdition(42, teenTier);
      const initial = filterBlogsMinimalist(edition.articles, {
        readFilter: 'all',
        searchQuery: '',
      });
      expect(initial.unreadCount).toBe(3);
      expect(initial.items).toHaveLength(3);

      // Mark lead article read
      const withOneRead = edition.articles.map((a, idx) =>
        idx === 0 ? { ...a, isRead: true } : a
      );
      const afterRead = filterBlogsMinimalist(withOneRead, {
        readFilter: 'unread',
        searchQuery: '',
      });
      expect(afterRead.unreadCount).toBe(2);
      expect(afterRead.items).toHaveLength(2);
      expect(afterRead.items.some((a) => a.id === edition.articles[0]!.id)).toBe(false);

      // Render BlogsTabView and confirm minimalist filters with zero banned chips
      const html = renderToStaticMarkup(
        <BlogsTabView
          articles={afterRead.items}
          unreadCount={afterRead.unreadCount}
          issueNumber={42}
          isArchiveEdition={false}
          childName="Maya"
          shortAges="Ages 13–15"
          scope="issue"
          readFilter="unread"
          searchQuery=""
          onChangeScope={vi.fn()}
          onChangeReadFilter={vi.fn()}
          onChangeSearch={vi.fn()}
          onOpenArticle={vi.fn()}
          onToggleSaveArticle={vi.fn()}
        />
      );

      expect(html).toContain('Unread (2)');
      expect(html).toContain('This week (#42)');
      expect(html).toContain('All weeks');
      expect(html).not.toContain('Feature essays');
      expect(html).not.toContain('Myth checks');
    });

    it('renders calm "You\'re all caught up" empty state when Unread has 0 remaining posts', () => {
      const html = renderToStaticMarkup(
        <BlogsTabView
          articles={[]}
          unreadCount={0}
          issueNumber={42}
          isArchiveEdition={false}
          childName="Maya"
          shortAges="Ages 13–15"
          scope="issue"
          readFilter="unread"
          searchQuery=""
          onChangeScope={vi.fn()}
          onChangeReadFilter={vi.fn()}
          onChangeSearch={vi.fn()}
          onOpenArticle={vi.fn()}
          onToggleSaveArticle={vi.fn()}
        />
      );

      expect(html).toContain('data-testid="blogs-empty-state"');
      expect(html).toContain('You&#x27;re all caught up');
      expect(html).toContain('Show all blogs');
    });
  });

  describe('3. Strict Age-Gated Weekly Phrases Strip (Omitted 0–6, Rendered & Expanded 7–18)', () => {
    it('completely omits WeeklyPhrasesStrip from DOM for ages 0–3 and 4–6', () => {
      for (const youngTier of [toddlerTier, preschoolTier]) {
        const edition = getMockWeeklyEdition(42, youngTier);
        expect(isSlangEligibleTier(youngTier)).toBe(false);
        expect(edition.phrases).toEqual([]);

        const closerHtml = renderToStaticMarkup(
          <SundayTableCloserBand
            issueNumber={42}
            tier={youngTier}
            shortAges={youngTier === toddlerTier ? 'Ages 0–3' : 'Ages 4–6'}
            childName="Leo"
            dinnerPrompts={edition.dinnerPrompts}
            dinnerPromptIndex={0}
            dinnerNotesOpen={false}
            phrases={[
              // Even if phrases were mistakenly passed, component guard MUST omit from DOM!
              {
                id: 'guard-test',
                digestId: 'digest-issue-42',
                issueNumber: 42,
                word: 'ShouldNeverRender',
                shortMeaning: 'Hidden',
                fullMeaning: 'Hidden',
                cringeLevel: 1,
                cringeLabel: 'Hidden',
                calmScript: 'Hidden',
                targetTiers: [youngTier],
                sortOrder: 1,
              },
            ]}
            expandedPhraseIndex={0}
            onNextPrompt={vi.fn()}
            onToggleNotes={vi.fn()}
            onCopyQuestion={vi.fn()}
            onShareWithPartner={vi.fn()}
            onToggleSaveDinner={vi.fn()}
            onTogglePhrase={vi.fn()}
            onAskAdvisor={vi.fn()}
          />
        );

        expect(closerHtml).toContain('data-testid="dinner-closer-card"');
        expect(closerHtml).toContain('bg-[#10251C]');
        expect(closerHtml).not.toContain('data-testid="weekly-phrases-strip"');
        expect(closerHtml).not.toContain('ShouldNeverRender');
      }
    });

    it('renders 3 clickable phrase tiles and expands calm script for ages 7–18', () => {
      const eligibleTiers = CANONICAL_DIGEST_TIERS.filter((t) => isSlangEligibleTier(t));
      expect(eligibleTiers).toHaveLength(4);

      const edition = getMockWeeklyEdition(42, elemTier);
      expect(edition.phrases).toHaveLength(3);

      const html = renderToStaticMarkup(
        <WeeklyPhrasesStrip
          tier={elemTier}
          shortAges="Ages 7–9"
          childName="Chloe"
          phrases={edition.phrases}
          expandedIndex={0}
          onTogglePhrase={vi.fn()}
          onAskAdvisor={vi.fn()}
        />
      );

      expect(html).toContain('data-testid="weekly-phrases-strip"');
      expect(html).toContain('3 phrases going around this week');
      expect(html).toContain('Griefing');
      expect(html).toContain('Clutched');
      expect(html).toContain('No Backsies');
      expect(html).toContain('data-testid="phrase-expanded-panel"');
      expect(html).toContain('Parent-use gauge:');
      expect(html).toContain('Heard another word? Ask AI Advisor');
    });
  });

  describe('4. VideoTheaterModal, WatchThisWeekBand & VideosTabView (youtube-nocookie.com + Real Jump Chips)', () => {
    it('renders WatchThisWeekBand with clean hqdefault scale-[1.18] crop and truthful publish date', () => {
      const edition = getMockWeeklyEdition(42, teenTier);
      const html = renderToStaticMarkup(
        <WatchThisWeekBand
          videos={edition.videos}
          childName="Maya"
          shortAges="Ages 13–15"
          weekRange={formatWeekDateRange(
            edition.issue.weekStart,
            edition.issue.weekEnd
          )}
          onOpenVideo={vi.fn()}
          onToggleSaveVideo={vi.fn()}
          onViewAllVideos={vi.fn()}
        />
      );

      expect(html).toContain('Watch this week');
      expect(html).toContain('img.youtube.com/vi/A71Kms6Mvhc/hqdefault.jpg');
      expect(html).toContain('scale-[1.18]');
      expect(html).toContain(formatShortPublishDate(edition.videos[0]!.publishedAt));
    });

    it('mounts youtube-nocookie.com iframe in VideoTheaterModal when open and tears it down cleanly when closed', () => {
      const edition = getMockWeeklyEdition(42, teenTier);
      const video = edition.videos[0]!;

      const openHtml = renderToStaticMarkup(
        <VideoTheaterModal
          video={video}
          initialStartSeconds={90}
          shortAges="Ages 13–15"
          onClose={vi.fn()}
          onToggleSave={vi.fn()}
        />
      );

      expect(openHtml).toContain('data-testid="video-theater-modal"');
      expect(openHtml).toContain('data-testid="video-modal-iframe"');
      expect(openHtml).toContain(
        'https://www.youtube-nocookie.com/embed/A71Kms6Mvhc?autoplay=1&amp;start=90&amp;rel=0'
      );
      expect(openHtml).toContain('data-testid="video-modal-jump-chips"');

      // When video has no real jumpChips, omit jump chips section completely (never fabricate!)
      const videoWithoutChapters: DigestVideoDTO = {
        ...video,
        jumpChips: [],
      };
      const noChipsHtml = renderToStaticMarkup(
        <VideoTheaterModal
          video={videoWithoutChapters}
          shortAges="Ages 13–15"
          onClose={vi.fn()}
          onToggleSave={vi.fn()}
        />
      );
      expect(noChipsHtml).not.toContain('data-testid="video-modal-jump-chips"');

      // When closed (video=null, e.g. after Escape), modal unmounts completely and destroys iframe
      const closedHtml = renderToStaticMarkup(
        <VideoTheaterModal
          video={null}
          shortAges="Ages 13–15"
          onClose={vi.fn()}
          onToggleSave={vi.fn()}
        />
      );
      expect(closedHtml).toBe('');
      expect(buildYouTubeEmbedUrl('A71Kms6Mvhc', 0)).toBe(
        'https://www.youtube-nocookie.com/embed/A71Kms6Mvhc?autoplay=1&start=0&rel=0'
      );
    });

    it('filters VideosTabView by duration buckets cleanly', () => {
      const videos = getMockDigestVideos({
        issueNumber: 42,
        scope: 'issue',
        tier: teenTier,
      }).videos;

      const shortOnly = filterVideosForShelf(videos, {
        durationBucket: 'short',
        searchQuery: '',
      });
      const mediumOnly = filterVideosForShelf(videos, {
        durationBucket: 'medium',
        searchQuery: '',
      });
      const deepOnly = filterVideosForShelf(videos, {
        durationBucket: 'deep',
        searchQuery: '',
      });

      expect(shortOnly.every((v) => v.durationMinutes < 12)).toBe(true);
      expect(mediumOnly.every((v) => v.durationMinutes >= 12 && v.durationMinutes <= 25)).toBe(true);
      expect(deepOnly.every((v) => v.durationMinutes > 25)).toBe(true);

      const html = renderToStaticMarkup(
        <VideosTabView
          videos={videos}
          issueNumber={42}
          isArchiveEdition={false}
          childName="Maya"
          shortAges="Ages 13–15"
          scope="issue"
          durationBucket="all"
          searchQuery=""
          activeTheaterVideoId={null}
          onChangeScope={vi.fn()}
          onChangeDuration={vi.fn()}
          onChangeSearch={vi.fn()}
          onSelectTheaterVideo={vi.fn()}
          onToggleSaveVideo={vi.fn()}
        />
      );

      expect(html).toContain('data-testid="videos-theater-stage"');
      expect(html).toContain('data-testid="videos-shelf-grid"');
      expect(html).toContain('Under 12 min');
      expect(html).toContain('12–25 min');
      expect(html).toContain('Deep dives');
    });
  });

  describe('5. External Blog Attribution, Original Editorial Drawer, 7/5 Spread & Saved Shortlist', () => {
    it('renders canonical external publisher link with target="_blank" and rel="noopener noreferrer"', () => {
      const edition = getMockWeeklyEdition(42, teenTier);
      const externalArticle = edition.articles[0]!;
      expect(externalArticle.isOriginalEditorial).toBe(false);

      const html = renderToStaticMarkup(
        <BlogReaderDrawer
          article={externalArticle}
          childName="Maya"
          childAgeLabel="14 yrs"
          shortAges="Ages 13–15"
          relatedCourseTitle="Adolescent Autonomy, Sleep Architecture & Digital Pacts"
          onClose={vi.fn()}
          onToggleSave={vi.fn()}
          onShareArticle={vi.fn()}
          onAskAdvisor={vi.fn()}
        />
      );

      expect(html).toContain('data-testid="blog-reader-drawer"');
      expect(html).toContain('data-testid="blog-reader-external-link"');
      expect(html).toContain(`Read full article on ${externalArticle.sourceName}`);
      expect(html).toContain(`href="${externalArticle.sourceUrl}"`);
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
      expect(html).toContain('Ask AI Advisor');
      expect(html).toContain('Text to partner');

      // Security check: blocks javascript: URLs and splits chapter labels cleanly
      expect(getSafeExternalHref('javascript:alert(1)')).toBe('#');
      expect(getSafeExternalHref('https://childmind.org/article/test')).toBe(
        'https://childmind.org/article/test'
      );
      expect(splitJumpChipLabel('2:00 · Fast cuts & toddler focus')).toEqual({
        timestamp: '2:00',
        text: 'Fast cuts & toddler focus',
      });
    });

    it('renders full structured paragraphs for Alongside original editorials', () => {
      const originalArticle: DigestArticleDTO = {
        ...getMockWeeklyEdition(42, teenTier).articles[0]!,
        id: 'orig-1',
        isOriginalEditorial: true,
        contentMarkdown:
          'First calm editorial paragraph grounded in neurobiology.\n\nSecond practical paragraph for Sunday evening.',
      };

      const html = renderToStaticMarkup(
        <BlogReaderDrawer
          article={originalArticle}
          childName="Maya"
          childAgeLabel="14 yrs"
          shortAges="Ages 13–15"
          relatedCourseTitle="Adolescent Autonomy"
          onClose={vi.fn()}
          onToggleSave={vi.fn()}
          onShareArticle={vi.fn()}
          onAskAdvisor={vi.fn()}
        />
      );

      expect(html).toContain('data-testid="blog-reader-original-prose"');
      expect(html).toContain('First calm editorial paragraph grounded in neurobiology.');
      expect(html).toContain('Second practical paragraph for Sunday evening.');
      expect(html).not.toContain('data-testid="blog-reader-external-link"');
    });

    it('renders homogeneous 7/5 ReadThisWeekBand spread and grouped SavedShortlistView', () => {
      const edition = getMockWeeklyEdition(42, teenTier);
      const readHtml = renderToStaticMarkup(
        <ReadThisWeekBand
          articles={edition.articles}
          childName="Maya"
          shortAges="Ages 13–15"
          weekRange="Nov 8–15"
          onOpenArticle={vi.fn()}
          onToggleSaveArticle={vi.fn()}
          onViewAllBlogs={vi.fn()}
        />
      );
      expect(readHtml).toContain('Read this week');
      expect(readHtml).toContain('lg:col-span-7');
      expect(readHtml).toContain('lg:col-span-5');

      const populatedShortlist = getMockSavedShortlist(teenTier, {
        readArticleIds: new Set(),
        savedArticleIds: new Set([edition.articles[0]!.id]),
        savedVideoIds: new Set([edition.videos[0]!.id]),
        savedDinnerIds: new Set([edition.dinnerPrompts[0]!.id]),
      });

      const savedHtml = renderToStaticMarkup(
        <SavedShortlistView
          shortlist={populatedShortlist}
          childName="Maya"
          shortAges="Ages 13–15"
          onBrowseThisWeek={vi.fn()}
          onOpenArticle={vi.fn()}
          onRemoveArticle={vi.fn()}
          onOpenVideo={vi.fn()}
          onRemoveVideo={vi.fn()}
          onCopyDinnerQuestion={vi.fn()}
          onRemoveDinner={vi.fn()}
        />
      );
      expect(savedHtml).toContain('Saved blogs (1)');
      expect(savedHtml).toContain('Saved videos (1)');
      expect(savedHtml).toContain('Saved dinner questions (1)');
    });

    it('keeps apps/web/src/app/(dashboard)/digest/page.tsx strictly as a React Server Component', () => {
      const pagePath = path.resolve(
        __dirname,
        '../../../app/(dashboard)/digest/page.tsx'
      );
      const source = fs.readFileSync(pagePath, 'utf8');
      expect(source).not.toContain("'use client'");
      expect(source).not.toContain('"use client"');
      expect(source).toContain('Suspense');
      expect(source).toContain('DigestDashboardClient');
      expect(source).toContain("title: 'Culture & Trends'");
    });
  });
});
