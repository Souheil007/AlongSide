import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient } from '@tanstack/react-query';
import {
  CANONICAL_DIGEST_TIERS,
  DevelopmentalTier,
  DigestItemType,
  Gender,
  RoadType,
  isSlangEligibleTier,
  type ChildDTO,
  type DigestArticleDTO,
  type DigestArticlesResponseDTO,
  type DigestVideoDTO,
  type DigestVideosResponseDTO,
  type SavedDigestShortlistDTO,
  type WeeklyDigestEditionDTO,
} from '@alongside/shared';
import {
  getSavedDigestShortlist,
  writeGuestDigestInteraction,
} from '@/lib/api/digest';
import { DIGEST_TIER_METADATA } from '@/lib/digestTierMeta';
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
  patchDigestInteractionCaches,
  resolveActiveDigestTier,
  splitJumpChipLabel,
} from '@/hooks/useCultureDigest';
import { DigestFeedHeader } from '../DigestFeedHeader';
import { WatchThisWeekBand } from '../WatchThisWeekBand';
import { ReadThisWeekBand } from '../ReadThisWeekBand';
import {
  PlayThisWeekBand,
  PLAY_STAGE_BUNDLES,
  isPlayThisWeekEligible,
  resolvePlayStageKey,
} from '../PlayThisWeekBand';
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

  describe('1. Page-Wide Weekly Issue Selector (Issue #42 vs #41 + All Weeks)', () => {
    it('supports selecting a specific week or All weeks and resets child-scoped filters cleanly', () => {
      const initial = createInitialDigestFilterState(42);
      expect(initial.selectedIssue).toBe(42);

      // Switch to All weeks via header selector, then back to Issue #41
      const allWeeksState = applyIssueSwitchReset(
        {
          ...initial,
          dinnerPromptIndex: 2,
          expandedPhraseIndex: 1,
        },
        'all'
      );
      expect(allWeeksState.selectedIssue).toBe('all');
      expect(allWeeksState.dinnerPromptIndex).toBe(0);
      expect(allWeeksState.expandedPhraseIndex).toBeNull();

      const afterSwitch = applyIssueSwitchReset(allWeeksState, 41);
      expect(afterSwitch.selectedIssue).toBe(41);
      expect(afterSwitch.activeTheaterVideoId).toBeNull();

      // Switching child resets search/read filters cleanly while keeping week selection
      const afterChild = applyChildSwitchReset({
        ...afterSwitch,
        blogReadFilter: 'unread',
        blogSearch: 'sleep',
        videoSearch: 'focus',
      });
      expect(afterChild.selectedIssue).toBe(41);
      expect(afterChild.blogReadFilter).toBe('all');
      expect(afterChild.blogSearch).toBe('');
      expect(afterChild.videoSearch).toBe('');
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

    it('renders DigestFeedHeader with All weeks selector option, archive banner, and zero duplicate child picker', () => {
      const issues = getMockDigestIssues(teenTier);
      const edition41 = getMockWeeklyEdition(41, teenTier);

      const html = renderToStaticMarkup(
        <DigestFeedHeader
          issueNumber={41}
          latestIssueNumber={42}
          isAllWeeks={false}
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
      expect(html).toContain('<option value="all">All weeks</option>');
      expect(html).toContain('data-testid="digest-archive-banner"');
      expect(html).toContain('Return to this week (#42)');
      expect(html).toContain('data-testid="digest-tab-blogs"');
      expect(html).toContain('data-testid="digest-tab-videos"');
      expect(html).toContain('data-testid="digest-tab-saved"');
      // Zero legacy noisy tabs or duplicate child selector
      expect(html).not.toContain('App &amp; Media Watch');
      expect(html).not.toContain('Language Decoder');
      expect(html).not.toContain('Active child profile');

      // When All weeks is selected in the dropdown, masthead & banner reflect All weeks cleanly
      const allWeeksHtml = renderToStaticMarkup(
        <DigestFeedHeader
          issueNumber={null}
          latestIssueNumber={42}
          isAllWeeks={true}
          childName="Maya"
          childAgeLabel="14 yrs"
          tierLabel="Early Adolescence"
          shortAges="Ages 13–15"
          readArticleCount={0}
          totalArticleCount={6}
          issues={issues}
          isArchiveEdition={false}
          activeTab="blogs"
          weekArticleCount={6}
          weekVideoCount={6}
          savedTotalCount={2}
          onSelectIssue={vi.fn()}
          onReturnToLatest={vi.fn()}
          onSelectTab={vi.fn()}
        />
      );

      expect(allWeeksHtml).toContain('All weeks · 2 editions');
      expect(allWeeksHtml).toContain('6 reads across all weeks');
      expect(allWeeksHtml).toContain('Browsing all published weeks tailored for Maya');
      expect(allWeeksHtml).toContain('<option value="all" selected="">All weeks</option>');
    });

    it('parses URL search params safely for ?issue= (number or all) and ?tab=', () => {
      expect(parseDigestUrlParams('?issue=41&tab=blogs')).toEqual({
        issueSelection: 41,
        tab: 'blogs',
      });
      expect(parseDigestUrlParams('?issue=all&tab=videos')).toEqual({
        issueSelection: 'all',
        tab: 'videos',
      });
      expect(parseDigestUrlParams('?issue=invalid&tab=bogus')).toEqual({
        issueSelection: undefined,
        tab: undefined,
      });
    });
  });

  describe('2. Minimalist All / Unread Blog Filtering (Zero Week Scope / Feature Essays / Myth Checks Pills)', () => {
    it('decrements unread count when an article is read, hides read articles under Unread, and omits duplicate week scope buttons', () => {
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

      // Render BlogsTabView and confirm minimalist filters with zero duplicate week scope chips
      const html = renderToStaticMarkup(
        <BlogsTabView
          articles={afterRead.items}
          unreadCount={afterRead.unreadCount}
          issueNumber={42}
          childName="Maya"
          shortAges="Ages 13–15"
          scope="issue"
          readFilter="unread"
          searchQuery=""
          onBrowseAllWeeks={vi.fn()}
          onChangeReadFilter={vi.fn()}
          onChangeSearch={vi.fn()}
          onOpenArticle={vi.fn()}
          onToggleSaveArticle={vi.fn()}
        />
      );

      expect(html).toContain('Unread (2)');
      expect(html).not.toContain('data-testid="blogs-scope-issue"');
      expect(html).not.toContain('data-testid="blogs-scope-all"');
      expect(html).not.toContain('This week (#42)');
      expect(html).not.toContain('All weeks');
      expect(html).not.toContain('Feature essays');
      expect(html).not.toContain('Myth checks');
    });

    it('renders calm "You\'re all caught up" empty state when Unread has 0 remaining posts', () => {
      const html = renderToStaticMarkup(
        <BlogsTabView
          articles={[]}
          unreadCount={0}
          issueNumber={42}
          childName="Maya"
          shortAges="Ages 13–15"
          scope="issue"
          readFilter="unread"
          searchQuery=""
          onBrowseAllWeeks={vi.fn()}
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

    it('renders "No blogs published for this week yet." with "Browse all weeks" on blank-search empty state', () => {
      const html = renderToStaticMarkup(
        <BlogsTabView
          articles={[]}
          unreadCount={0}
          issueNumber={42}
          childName="Maya"
          shortAges="Ages 13–15"
          scope="issue"
          readFilter="all"
          searchQuery=""
          onBrowseAllWeeks={vi.fn()}
          onChangeReadFilter={vi.fn()}
          onChangeSearch={vi.fn()}
          onOpenArticle={vi.fn()}
          onToggleSaveArticle={vi.fn()}
        />
      );

      expect(html).toContain('data-testid="blogs-empty-state"');
      expect(html).toContain('No blogs published for this week yet.');
      expect(html).toContain('Browse all weeks');
      expect(html).not.toContain('No blogs matched');
    });

    it('renders left-margin sourceName on its own line and publish date with whitespace-nowrap', () => {
      const edition = getMockWeeklyEdition(42, teenTier);
      const html = renderToStaticMarkup(
        <BlogsTabView
          articles={edition.articles}
          unreadCount={edition.articles.length}
          issueNumber={42}
          childName="Maya"
          shortAges="Ages 13–15"
          scope="issue"
          readFilter="all"
          searchQuery=""
          onBrowseAllWeeks={vi.fn()}
          onChangeReadFilter={vi.fn()}
          onChangeSearch={vi.fn()}
          onOpenArticle={vi.fn()}
          onToggleSaveArticle={vi.fn()}
        />
      );

      // Stream rows put sourceName on its own font-medium line and keep short date non-wrapping
      const companion = edition.articles[1]!;
      const companionDate = formatShortPublishDate(companion.publishedAt);
      expect(html).toContain(`>${companion.sourceName}</span>`);
      expect(html).toContain(`<span class="whitespace-nowrap">${companionDate}</span>`);
      expect(html).toContain(`<span class="whitespace-nowrap">${companion.readMinutes} min read</span>`);
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
      // 1-3 Parent-use gauge scale (3 dots, "of 3", never 5)
      expect(html).toContain('of 3');
      expect(html).not.toContain('of 5');
      expect(html).toContain('data-testid="phrase-gauge-dot-1"');
      expect(html).toContain('data-testid="phrase-gauge-dot-2"');
      expect(html).toContain('data-testid="phrase-gauge-dot-3"');
      expect(html).not.toContain('data-testid="phrase-gauge-dot-4"');
      expect(html).not.toContain('data-testid="phrase-gauge-dot-5"');
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

    it('filters VideosTabView by search and omits duration and week-scope pill filters', () => {
      const videos = getMockDigestVideos({
        issueNumber: 42,
        scope: 'issue',
        tier: teenTier,
      }).videos;

      const presenterNeedle = videos[0]!.presenter;
      const searched = filterVideosForShelf(videos, {
        searchQuery: presenterNeedle,
      });
      expect(searched.length).toBeGreaterThanOrEqual(1);
      expect(searched.some((v) => v.id === videos[0]!.id)).toBe(true);

      const html = renderToStaticMarkup(
        <VideosTabView
          videos={videos}
          issueNumber={42}
          childName="Maya"
          shortAges="Ages 13–15"
          scope="issue"
          searchQuery=""
          activeTheaterVideoId={null}
          onBrowseAllWeeks={vi.fn()}
          onChangeSearch={vi.fn()}
          onSelectTheaterVideo={vi.fn()}
          onToggleSaveVideo={vi.fn()}
        />
      );

      expect(html).toContain('data-testid="videos-theater-stage"');
      expect(html).toContain('data-testid="videos-shelf-grid"');
      expect(html).toContain('data-testid="videos-search-input"');
      // Duration filter and week-scope toggle pills removed cleanly
      expect(html).not.toContain('All videos');
      expect(html).not.toContain('Under 12 min');
      expect(html).not.toContain('12–25 min');
      expect(html).not.toContain('Deep dives');
      expect(html).not.toContain('data-testid="videos-duration-all"');
      expect(html).not.toContain('data-testid="videos-scope-issue"');
      expect(html).not.toContain('data-testid="videos-scope-all"');
      expect(html).not.toContain('This week (#42)');
      expect(html).not.toContain('All weeks');
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

  describe('6. Hardening Regressions (Age Tier, Live-UUID Guest Snapshots, No #42 Loading Flash)', () => {
    it('resolves a 14-year-old with legacy TIER_4_AGES_14_PLUS to TIER_4_EARLY_ADOLESCENCE_13_15 (Ages 13–15)', () => {
      const legacyFourteenYearOld: ChildDTO = {
        id: 'child-14-legacy',
        userId: 'parent-1',
        name: 'Julian',
        gender: Gender.MALE,
        birthYear: new Date().getFullYear() - 14,
        birthMonth: 1,
        age: 14,
        roadType: RoadType.ACTIVE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_4_AGES_14_PLUS,
        schoolGrade: '9th Grade',
        latestAssessmentScore: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const resolved = resolveActiveDigestTier(legacyFourteenYearOld);
      expect(resolved).toBe(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
      expect(DIGEST_TIER_METADATA[resolved].shortAges).toBe('Ages 13–15');
    });

    it('persists a live-UUID article (uuid-live-issue-45) in guest localStorage snapshots across reload in Saved', async () => {
      const storage = new Map<string, string>();
      vi.stubGlobal('window', {
        localStorage: {
          getItem: (key: string) => storage.get(key) ?? null,
          setItem: (key: string, value: string) => {
            storage.set(key, value);
          },
          removeItem: (key: string) => {
            storage.delete(key);
          },
        },
      });

      try {
        const liveArticle: DigestArticleDTO = {
          ...getMockWeeklyEdition(42, teenTier).articles[0]!,
          id: 'uuid-live-issue-45',
          digestId: 'digest-issue-45',
          issueNumber: 45,
          title: 'Live-synced Issue 45 study on teen circadian shifts',
          targetTiers: [teenTier],
          isRead: false,
          isSaved: false,
        };

        writeGuestDigestInteraction({
          itemType: DigestItemType.ARTICLE,
          itemId: liveArticle.id,
          isSaved: true,
          articleSnapshot: liveArticle,
        });

        const persisted = await getSavedDigestShortlist({
          tier: teenTier,
          isGuest: true,
        });

        expect(persisted.totalCount).toBe(1);
        expect(persisted.articles[0]?.id).toBe('uuid-live-issue-45');
        expect(persisted.articles[0]?.issueNumber).toBe(45);

        const savedHtml = renderToStaticMarkup(
          <SavedShortlistView
            shortlist={persisted}
            childName="Julian"
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
        expect(savedHtml).toContain('Live-synced Issue 45 study on teen circadian shifts');
        expect(savedHtml).toContain('Issue #45');
      } finally {
        vi.unstubAllGlobals();
      }
    });

    it('renders DigestFeedHeader cleanly with null issueNumber during initial load without flashing #42 or #null', () => {
      const html = renderToStaticMarkup(
        <DigestFeedHeader
          issueNumber={null}
          latestIssueNumber={null}
          childName="Julian"
          childAgeLabel="14 yrs"
          tierLabel="Early Adolescence"
          shortAges="Ages 13–15"
          readArticleCount={0}
          totalArticleCount={0}
          issues={[]}
          isArchiveEdition={false}
          activeTab="week"
          weekArticleCount={0}
          weekVideoCount={0}
          savedTotalCount={0}
          onSelectIssue={vi.fn()}
          onReturnToLatest={vi.fn()}
          onSelectTab={vi.fn()}
        />
      );

      expect(html).toContain('Latest weekly edition');
      expect(html).toContain('Loading issues…');
      expect(html).not.toContain('#42');
      expect(html).not.toContain('No. 42');
      expect(html).not.toContain('null');
    });

    it('updates saved/unsaved state atomically on a single click across edition, list, and shortlist caches', () => {
      const edition = getMockWeeklyEdition(42, teenTier);
      const article = edition.articles[0]!;
      const video = edition.videos[0]!;
      const queryClient = new QueryClient();

      queryClient.setQueryData<WeeklyDigestEditionDTO>(['digest-edition', 'latest'], edition);
      queryClient.setQueryData<DigestArticlesResponseDTO>(['digest-articles', 42, 'issue'], {
        articles: edition.articles,
        unreadCount: edition.articles.length,
        totalInScope: edition.articles.length,
        issueNumber: 42,
      });
      queryClient.setQueryData<DigestVideosResponseDTO>(['digest-videos', 42, 'issue'], {
        videos: edition.videos,
        totalInScope: edition.videos.length,
        issueNumber: 42,
      });
      queryClient.setQueryData<SavedDigestShortlistDTO>(['digest-saved', teenTier], {
        articles: [],
        videos: [],
        dinnerPrompts: [],
        totalCount: 0,
      });

      // Single save click for blog
      patchDigestInteractionCaches(queryClient, {
        itemType: DigestItemType.ARTICLE,
        itemId: article.id,
        isSaved: true,
        articleSnapshot: article,
      });
      expect(
        queryClient
          .getQueryData<WeeklyDigestEditionDTO>(['digest-edition', 'latest'])
          ?.articles.find((a) => a.id === article.id)?.isSaved
      ).toBe(true);
      expect(
        queryClient
          .getQueryData<DigestArticlesResponseDTO>(['digest-articles', 42, 'issue'])
          ?.articles.find((a) => a.id === article.id)?.isSaved
      ).toBe(true);
      expect(
        queryClient.getQueryData<SavedDigestShortlistDTO>(['digest-saved', teenTier])?.totalCount
      ).toBe(1);

      // Single save click for video
      patchDigestInteractionCaches(queryClient, {
        itemType: DigestItemType.VIDEO,
        itemId: video.id,
        isSaved: true,
        videoSnapshot: video,
      });
      expect(
        queryClient
          .getQueryData<DigestVideosResponseDTO>(['digest-videos', 42, 'issue'])
          ?.videos.find((v) => v.id === video.id)?.isSaved
      ).toBe(true);
      expect(
        queryClient.getQueryData<SavedDigestShortlistDTO>(['digest-saved', teenTier])?.totalCount
      ).toBe(2);

      // Single unsave click for blog and video
      patchDigestInteractionCaches(queryClient, {
        itemType: DigestItemType.ARTICLE,
        itemId: article.id,
        isSaved: false,
      });
      patchDigestInteractionCaches(queryClient, {
        itemType: DigestItemType.VIDEO,
        itemId: video.id,
        isSaved: false,
      });
      expect(
        queryClient
          .getQueryData<DigestArticlesResponseDTO>(['digest-articles', 42, 'issue'])
          ?.articles.find((a) => a.id === article.id)?.isSaved
      ).toBe(false);
      expect(
        queryClient
          .getQueryData<DigestVideosResponseDTO>(['digest-videos', 42, 'issue'])
          ?.videos.find((v) => v.id === video.id)?.isSaved
      ).toBe(false);
      expect(
        queryClient.getQueryData<SavedDigestShortlistDTO>(['digest-saved', teenTier])?.totalCount
      ).toBe(0);
    });
  });

  describe('7. Play This Week Screen-Free Band (Strictly Ages 0–8 Inside Culture & Trends)', () => {
    it('enables Play This Week strictly for Ages 0–8 and omits it for Ages 9–18', () => {
      expect(isPlayThisWeekEligible(1, toddlerTier)).toBe(true);
      expect(isPlayThisWeekEligible(3, toddlerTier)).toBe(true);
      expect(isPlayThisWeekEligible(5, preschoolTier)).toBe(true);
      expect(isPlayThisWeekEligible(8, elemTier)).toBe(true);

      expect(isPlayThisWeekEligible(9, elemTier)).toBe(false);
      expect(isPlayThisWeekEligible(11, DevelopmentalTier.TIER_3_PRE_TEEN_10_12)).toBe(false);
      expect(isPlayThisWeekEligible(14, teenTier)).toBe(false);
      expect(isPlayThisWeekEligible(undefined, toddlerTier)).toBe(true);
      expect(isPlayThisWeekEligible(undefined, preschoolTier)).toBe(true);
      expect(isPlayThisWeekEligible(undefined, teenTier)).toBe(false);
    });

    it('resolves calibrated play stages across Infancy (0–1), Toddler (2–3), Preschool (4–6), and Early Elementary (7–8)', () => {
      expect(resolvePlayStageKey(1, toddlerTier)).toBe('infant');
      expect(resolvePlayStageKey(3, toddlerTier)).toBe('toddler');
      expect(resolvePlayStageKey(5, preschoolTier)).toBe('preschool');
      expect(resolvePlayStageKey(8, elemTier)).toBe('earlyElementary');

      // Every stage provides ideas covering all 3 mood/mess filters
      for (const bundle of Object.values(PLAY_STAGE_BUNDLES)) {
        expect(bundle.ideas.length).toBeGreaterThanOrEqual(4);
        expect(bundle.ideas.some((i) => i.tags.includes('calm'))).toBe(true);
        expect(bundle.ideas.some((i) => i.tags.includes('energy'))).toBe(true);
        expect(bundle.ideas.some((i) => i.tags.includes('nomess'))).toBe(true);
      }
    });

    it('renders PlayThisWeekBand for toddler Oliver (Age 3) with filters, steps, materials, and swap cards', () => {
      const html = renderToStaticMarkup(
        <PlayThisWeekBand
          childId="child-oliver"
          childName="oliver"
          childAge={3}
          tier={toddlerTier}
        />
      );

      expect(html).toContain('id="play-this-week"');
      expect(html).toContain('Play this week');
      expect(html).toContain('Oliver');
      expect(html).toContain('Toddlerhood (Ages 2–3)');
      expect(html).toContain('Calm before bed');
      expect(html).toContain('Burn energy');
      expect(html).toContain('No mess');
      expect(html).toContain('Texture Trail: Carpet, Tile &amp; Soft Blankets');
      expect(html).toContain('What you need (already at home)');
      expect(html).toContain('Why it helps Oliver');
      expect(html).toContain('Shuffle another idea');
      expect(html).toContain('Mark played today');
    });

    it('omits PlayThisWeekBand completely from DOM for a 10-year-old or 14-year-old', () => {
      const htmlTween = renderToStaticMarkup(
        <PlayThisWeekBand
          childId="child-maya"
          childName="Maya"
          childAge={10}
          tier={DevelopmentalTier.TIER_3_PRE_TEEN_10_12}
        />
      );
      const htmlTeen = renderToStaticMarkup(
        <PlayThisWeekBand
          childId="child-sam"
          childName="Sam"
          childAge={14}
          tier={teenTier}
        />
      );

      expect(htmlTween).toBe('');
      expect(htmlTeen).toBe('');
    });

    it('mounts PlayThisWeekBand right after ReadThisWeekBand inside DigestDashboardClient', () => {
      const clientPath = path.resolve(__dirname, '../DigestDashboardClient.tsx');
      const content = fs.readFileSync(clientPath, 'utf-8');
      const readIdx = content.indexOf('<ReadThisWeekBand');
      const playIdx = content.indexOf('<PlayThisWeekBand');
      const closerIdx = content.indexOf('<SundayTableCloserBand');

      expect(readIdx).toBeGreaterThan(-1);
      expect(playIdx).toBeGreaterThan(readIdx);
      expect(closerIdx).toBeGreaterThan(playIdx);
    });
  });
});
