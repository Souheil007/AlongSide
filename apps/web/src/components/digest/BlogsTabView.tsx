'use client';

import * as React from 'react';
import { ArrowRight, Bookmark, Check, Search } from 'lucide-react';
import type { DigestArticleDTO, DigestQueryScope } from '@alongside/shared';
import {
  formatShortPublishDate,
  type BlogReadFilter,
} from '@/hooks/useCultureDigest';
import { cn } from '@/lib/utils';

export interface BlogsTabViewProps {
  articles: DigestArticleDTO[];
  unreadCount: number;
  issueNumber: number | null;
  childName: string;
  shortAges: string;
  scope: DigestQueryScope;
  readFilter: BlogReadFilter;
  searchQuery: string;
  isLoading?: boolean;
  onBrowseAllWeeks: () => void;
  onChangeReadFilter: (filter: BlogReadFilter) => void;
  onChangeSearch: (query: string) => void;
  onOpenArticle: (article: DigestArticleDTO) => void;
  onToggleSaveArticle: (article: DigestArticleDTO) => void;
}

export function BlogsTabView({
  articles,
  unreadCount,
  issueNumber,
  childName,
  shortAges,
  scope,
  readFilter,
  searchQuery,
  isLoading = false,
  onBrowseAllWeeks,
  onChangeReadFilter,
  onChangeSearch,
  onOpenArticle,
  onToggleSaveArticle,
}: BlogsTabViewProps) {
  const trimmedQuery = searchQuery.trim();
  const showFeatured = !trimmedQuery && readFilter === 'all' && articles.length > 0;
  const featured = showFeatured ? articles[0]! : null;
  const streamItems = showFeatured ? articles.slice(1) : articles;

  return (
    <section
      id="digest-panel-blogs"
      role="tabpanel"
      aria-labelledby="digest-tab-blogs"
      data-testid="blogs-tab-view"
      className="py-7 pb-16"
    >
      {/* Minimalist Toolbar: All / Unread + Search (Week scope controlled by header selector) */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter blogs"
        >
          <button
            type="button"
            data-testid="blogs-filter-all"
            aria-pressed={readFilter === 'all'}
            onClick={() => onChangeReadFilter('all')}
            className={cn(
              'inline-flex min-h-[44px] items-center rounded-full border px-4 text-[13px] font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
              readFilter === 'all'
                ? 'border-[#143D2B] bg-[#143D2B] text-white'
                : 'border-[#131715]/20 bg-transparent text-[#3E4642] hover:bg-[#F3F1EA] hover:text-[#131715]'
            )}
          >
            All
          </button>

          <button
            type="button"
            data-testid="blogs-filter-unread"
            aria-pressed={readFilter === 'unread'}
            onClick={() => onChangeReadFilter('unread')}
            className={cn(
              'inline-flex min-h-[44px] items-center rounded-full border px-4 text-[13px] font-medium whitespace-nowrap tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
              readFilter === 'unread'
                ? 'border-[#143D2B] bg-[#143D2B] text-white'
                : 'border-[#131715]/20 bg-transparent text-[#3E4642] hover:bg-[#F3F1EA] hover:text-[#131715]'
            )}
          >
            {unreadCount > 0 ? `Unread (${unreadCount})` : 'Unread'}
          </button>
        </div>

        <div className="relative w-full min-w-0 sm:min-w-[210px] sm:max-w-[310px] sm:flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#59625D]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder="Search blogs for this age tier..."
            aria-label="Search blogs"
            data-testid="blogs-search-input"
            className="min-h-[44px] w-full rounded-[8px] border border-[#131715]/20 bg-white pl-10 pr-3.5 text-[13.5px] text-[#131715] placeholder:text-[#59625D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4 py-6">
          <div className="h-44 rounded-[12px] bg-[#F3F1EA]" />
          <div className="h-24 rounded-[10px] bg-[#F3F1EA]/70" />
          <div className="h-24 rounded-[10px] bg-[#F3F1EA]/70" />
        </div>
      ) : articles.length === 0 ? (
        <div
          data-testid="blogs-empty-state"
          className="flex flex-col items-center gap-3 border-t border-[#131715]/10 px-6 py-12 text-center"
        >
          {readFilter === 'unread' && !trimmedQuery ? (
            <>
              <p className="font-serif text-[22px] font-normal text-[#131715]">
                You&apos;re all caught up
              </p>
              <p className="max-w-[46ch] text-[14.5px] text-[#59625D]">
                Every blog in{' '}
                {scope === 'issue'
                  ? issueNumber !== null
                    ? `Issue #${issueNumber}`
                    : 'this week'
                  : 'this archive'}{' '}
                for {childName} · {shortAges} has been read.
              </p>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onChangeReadFilter('all')}
                  className="inline-flex min-h-[44px] items-center rounded-[8px] border border-[#131715]/20 bg-white px-4 text-[13.5px] font-medium text-[#131715] transition-colors hover:bg-[#F6F4EE]"
                >
                  Show all blogs
                </button>
                {scope === 'issue' && (
                  <button
                    type="button"
                    onClick={onBrowseAllWeeks}
                    className="inline-flex min-h-[44px] items-center rounded-[8px] bg-[#143D2B] px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-[#0E2B1E]"
                  >
                    Browse all weeks
                  </button>
                )}
              </div>
            </>
          ) : !trimmedQuery ? (
            <>
              <p className="font-serif text-[22px] font-normal text-[#131715]">
                {scope === 'issue'
                  ? 'No blogs published for this week yet.'
                  : 'No blogs published for this age tier yet.'}
              </p>
              <p className="max-w-[46ch] text-[14.5px] text-[#59625D]">
                {scope === 'issue'
                  ? `Check back on Sunday, or browse earlier weeks tailored for ${childName} · ${shortAges}.`
                  : `New curated reads for ${childName} · ${shortAges} arrive each Sunday.`}
              </p>
              {scope === 'issue' && (
                <button
                  type="button"
                  data-testid="blogs-empty-browse-all-btn"
                  onClick={onBrowseAllWeeks}
                  className="mt-1 inline-flex min-h-[44px] items-center rounded-[8px] bg-[#143D2B] px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-[#0E2B1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
                >
                  Browse all weeks
                </button>
              )}
            </>
          ) : (
            <>
              <p className="text-[14.5px] text-[#59625D]">
                No blogs matched &ldquo;{trimmedQuery}&rdquo; for {shortAges}.
              </p>
              <button
                type="button"
                onClick={() => onChangeSearch('')}
                className="inline-flex min-h-[44px] items-center rounded-[8px] border border-[#131715]/20 bg-white px-4 text-[13.5px] font-medium text-[#131715] transition-colors hover:bg-[#F6F4EE]"
              >
                Clear search
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Featured Latest Blog Card (when unfiltered) */}
          {featured && (
            <article
              data-testid={`blogs-featured-card-${featured.id}`}
              className="mb-8 grid grid-cols-1 items-end gap-6 rounded-[12px] bg-[#F3F1EA] p-5 sm:p-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-[#59625D] tabular-nums">
                  <span className="font-semibold text-[#143D2B]">
                    Latest · {shortAges}
                  </span>
                  <span className="text-[#131715]/20" aria-hidden="true">
                    /
                  </span>
                  <span>{featured.topicLabel}</span>
                  <span className="text-[#131715]/20" aria-hidden="true">
                    /
                  </span>
                  <span>
                    {featured.sourceName}
                    {formatShortPublishDate(featured.publishedAt)
                      ? ` · ${formatShortPublishDate(featured.publishedAt)}`
                      : ''}
                  </span>
                  {featured.isRead && (
                    <>
                      <span className="text-[#131715]/20" aria-hidden="true">
                        /
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#143D2B]">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Read</span>
                      </span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenArticle(featured)}
                  className="my-2.5 block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
                >
                  <h2 className="font-serif text-[26px] sm:text-[32px] font-normal leading-[1.15] tracking-[-0.02em] text-[#131715] transition-colors hover:text-[#143D2B]">
                    {featured.title}
                  </h2>
                </button>

                <p className="max-w-[58ch] text-[15px] leading-[1.6] text-[#3E4642]">
                  {featured.summary}
                </p>
              </div>

              <div className="flex flex-col gap-3.5 border-t border-[#131715]/15 pt-5 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-[13.5px] leading-[1.55] text-[#131715]">
                  <strong className="font-semibold text-[#143D2B]">Key shift:</strong>{' '}
                  {featured.keyShift}
                </p>

                <div className="flex items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenArticle(featured)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[8px] bg-[#143D2B] px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-[#0E2B1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
                  >
                    <span>
                      {featured.isRead
                        ? 'Read again'
                        : featured.isOriginalEditorial
                          ? 'Read blog'
                          : 'Read preview'}
                    </span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleSaveArticle(featured)}
                    aria-pressed={featured.isSaved}
                    aria-label={
                      featured.isSaved
                        ? `Remove ${featured.title} from Saved`
                        : `Save ${featured.title}`
                    }
                    title={featured.isSaved ? 'Saved' : 'Save blog'}
                    className={cn(
                      'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                      featured.isSaved
                        ? 'bg-[#E6F0EB] text-[#143D2B]'
                        : 'text-[#59625D] hover:bg-white/80 hover:text-[#131715]'
                    )}
                  >
                    <Bookmark
                      className={cn('h-4 w-4', featured.isSaved && 'fill-current')}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </article>
          )}

          {/* Single-Column Dated Editorial Stream */}
          {streamItems.length > 0 && (
            <div
              data-testid="blogs-editorial-stream"
              className="border-t border-[#131715]/18"
            >
              {streamItems.map((article) => {
                const pubDate = formatShortPublishDate(article.publishedAt);
                return (
                  <article
                    key={article.id}
                    data-testid={`blog-stream-row-${article.id}`}
                    className="grid grid-cols-1 items-start gap-2.5 border-b border-[#131715]/10 py-5 md:grid-cols-[185px_minmax(0,1fr)_auto] md:gap-6"
                  >
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 pt-0.5 text-[12.5px] text-[#59625D] tabular-nums md:flex-col md:items-start">
                      <span className="font-medium leading-[1.35] text-[#131715]">
                        {article.sourceName}
                      </span>
                      <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                        {pubDate && (
                          <>
                            <span className="whitespace-nowrap">{pubDate}</span>
                            <span aria-hidden="true">·</span>
                          </>
                        )}
                        <span className="whitespace-nowrap">
                          {article.readMinutes} min read
                        </span>
                        {article.isRead && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-medium text-[#143D2B]">Read</span>
                          </>
                        )}
                      </span>
                      <span>{article.topicLabel}</span>
                    </div>

                    <div className="flex items-start justify-between gap-3 md:contents">
                      <button
                        type="button"
                        onClick={() => onOpenArticle(article)}
                        data-testid={`stream-open-blog-${article.id}`}
                        className="group flex min-w-0 flex-1 flex-col gap-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
                      >
                        <h3 className="font-serif text-[21px] sm:text-[22px] font-normal leading-[1.24] tracking-[-0.015em] text-[#131715] transition-colors group-hover:text-[#143D2B]">
                          {article.title}
                        </h3>
                        <p className="max-w-[62ch] text-[14.5px] leading-[1.58] text-[#3E4642]">
                          {article.summary}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleSaveArticle(article)}
                        aria-pressed={article.isSaved}
                        aria-label={
                          article.isSaved
                            ? `Remove ${article.title} from Saved`
                            : `Save ${article.title}`
                        }
                        title={article.isSaved ? 'Saved' : 'Save blog'}
                        className={cn(
                          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                          article.isSaved
                            ? 'bg-[#E6F0EB] text-[#143D2B]'
                            : 'text-[#59625D] hover:bg-[#EFECE3] hover:text-[#131715]'
                        )}
                      >
                        <Bookmark
                          className={cn('h-4 w-4', article.isSaved && 'fill-current')}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}
