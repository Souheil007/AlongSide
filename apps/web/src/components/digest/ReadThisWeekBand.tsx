'use client';

import * as React from 'react';
import { ArrowRight, Bookmark, Check } from 'lucide-react';
import type { DigestArticleDTO } from '@alongside/shared';
import { formatShortPublishDate } from '@/hooks/useCultureDigest';
import { cn } from '@/lib/utils';

export interface ReadThisWeekBandProps {
  articles: DigestArticleDTO[];
  childName: string;
  shortAges: string;
  weekRange: string;
  isAllWeeks?: boolean;
  onOpenArticle: (article: DigestArticleDTO) => void;
  onToggleSaveArticle: (article: DigestArticleDTO) => void;
  onViewAllBlogs: () => void;
}

export function ReadThisWeekBand({
  articles,
  childName,
  shortAges,
  weekRange,
  isAllWeeks = false,
  onOpenArticle,
  onToggleSaveArticle,
  onViewAllBlogs,
}: ReadThisWeekBandProps) {
  if (articles.length === 0) {
    return null;
  }

  const lead = articles.find((a) => a.isLead) ?? articles[0]!;
  const companions = articles.filter((a) => a.id !== lead.id).slice(0, 2);
  const leadDate = formatShortPublishDate(lead.publishedAt);

  return (
    <section
      aria-labelledby="read-this-week-heading"
      data-testid="read-this-week-band"
      className="border-t border-[#131715]/10 pt-9 sm:pt-10"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h2
            id="read-this-week-heading"
            className="font-serif text-[23px] sm:text-[27px] font-normal tracking-[-0.02em] text-[#131715]"
          >
            {isAllWeeks ? 'Read across all weeks' : 'Read this week'}
          </h2>
          <p className="mt-0.5 text-[13.5px] text-[#59625D]">
            {articles.length} tailored {articles.length === 1 ? 'blog' : 'blogs'} for{' '}
            {childName} · {shortAges} ({weekRange}).
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAllBlogs}
          data-testid="read-all-blogs-btn"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] font-medium text-[#143D2B] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px] px-1"
        >
          <span>All blogs</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Homogeneous 7/5 Magazine Spread - Blogs ONLY */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        {/* Left (7 cols): Lead Weekly Blog */}
        <article
          data-testid={`lead-blog-card-${lead.id}`}
          className="flex flex-col justify-between gap-5 rounded-[12px] border border-[#131715]/10 bg-white p-5 sm:p-7 lg:col-span-7"
        >
          <div className="flex flex-col gap-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-[#59625D] tabular-nums pt-1">
                <span className="font-semibold text-[#143D2B]">
                  This week&apos;s lead · {shortAges}
                </span>
                <span className="text-[#131715]/20" aria-hidden="true">
                  /
                </span>
                <span>{lead.topicLabel}</span>
                <span className="text-[#131715]/20" aria-hidden="true">
                  /
                </span>
                <span>
                  {lead.sourceName}
                  {leadDate ? ` · ${leadDate}` : ''}
                </span>
                <span className="text-[#131715]/20" aria-hidden="true">
                  /
                </span>
                <span>{lead.readMinutes} min read</span>
                {lead.isRead && (
                  <>
                    <span className="text-[#131715]/20" aria-hidden="true">
                      /
                    </span>
                    <span
                      data-testid={`blog-read-badge-${lead.id}`}
                      className="inline-flex items-center gap-1 font-medium text-[#143D2B]"
                    >
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Read</span>
                    </span>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => onToggleSaveArticle(lead)}
                aria-pressed={lead.isSaved}
                aria-label={
                  lead.isSaved
                    ? `Remove ${lead.title} from Saved`
                    : `Save ${lead.title}`
                }
                title={lead.isSaved ? 'Saved' : 'Save blog'}
                data-testid={`blog-save-${lead.id}`}
                className={cn(
                  'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                  lead.isSaved
                    ? 'bg-[#E6F0EB] text-[#143D2B]'
                    : 'text-[#59625D] hover:bg-[#EFECE3] hover:text-[#131715]'
                )}
              >
                <Bookmark
                  className={cn('h-4 w-4', lead.isSaved && 'fill-current')}
                  aria-hidden="true"
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() => onOpenArticle(lead)}
              className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
            >
              <h3 className="font-serif text-[26px] sm:text-[33px] font-normal leading-[1.14] tracking-[-0.025em] text-[#131715] transition-colors hover:text-[#143D2B]">
                {lead.title}
              </h3>
            </button>

            <p className="max-w-[58ch] text-[15.5px] leading-[1.62] text-[#3E4642]">
              {lead.summary}
            </p>

            <div className="rounded-r-[8px] border-l-[2.5px] border-[#143D2B] bg-[#F6F4EE] px-4 py-3 text-[14px] leading-[1.55] text-[#131715]">
              <strong className="font-semibold text-[#143D2B]">Key shift:</strong>{' '}
              {lead.keyShift}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#131715]/10 pt-3.5">
            <span className="text-[12.5px] text-[#59625D]">
              {lead.isOriginalEditorial
                ? 'Alongside Editorial · Sources cited inside'
                : `${lead.sourceName}${leadDate ? ` · Published ${leadDate}` : ''}`}
            </span>

            <button
              type="button"
              onClick={() => onOpenArticle(lead)}
              data-testid={`open-blog-btn-${lead.id}`}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[8px] bg-[#143D2B] px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-[#0E2B1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
            >
              <span>
                {lead.isRead
                  ? 'Read again'
                  : lead.isOriginalEditorial
                    ? 'Read full blog'
                    : 'Read preview'}
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </article>

        {/* Right (5 cols): 2 Companion Blogs stacked to equal height */}
        {companions.length > 0 && (
          <div className="flex min-w-0 flex-col gap-[18px] lg:col-span-5">
            {companions.map((article) => {
              const pubDate = formatShortPublishDate(article.publishedAt);
              return (
                <article
                  key={article.id}
                  data-testid={`companion-blog-card-${article.id}`}
                  className="flex flex-1 flex-col justify-between gap-3 rounded-[12px] bg-[#F3F1EA] p-5 sm:p-6 transition-colors hover:bg-[#EFECE3]"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12.5px] text-[#59625D] tabular-nums pt-1">
                        <span>{article.topicLabel}</span>
                        <span className="text-[#131715]/20" aria-hidden="true">
                          /
                        </span>
                        <span>{article.readMinutes} min read</span>
                        {article.isRead && (
                          <>
                            <span className="text-[#131715]/20" aria-hidden="true">
                              /
                            </span>
                            <span
                              data-testid={`blog-read-badge-${article.id}`}
                              className="inline-flex items-center gap-1 font-medium text-[#143D2B]"
                            >
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Read</span>
                            </span>
                          </>
                        )}
                      </div>

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
                        data-testid={`blog-save-${article.id}`}
                        className={cn(
                          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                          article.isSaved
                            ? 'bg-[#E6F0EB] text-[#143D2B]'
                            : 'text-[#59625D] hover:bg-white/70 hover:text-[#131715]'
                        )}
                      >
                        <Bookmark
                          className={cn('h-4 w-4', article.isSaved && 'fill-current')}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenArticle(article)}
                      className="text-left font-serif text-[20px] font-normal leading-[1.24] tracking-[-0.015em] text-[#131715] transition-colors hover:text-[#143D2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
                    >
                      {article.title}
                    </button>

                    <p className="text-[13.5px] leading-[1.55] text-[#3E4642]">
                      {article.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[#131715]/10 pt-2.5">
                    <span className="text-[12.5px] text-[#59625D] truncate tabular-nums">
                      {article.sourceName}
                      {pubDate ? ` · ${pubDate}` : ''}
                    </span>

                    <button
                      type="button"
                      onClick={() => onOpenArticle(article)}
                      data-testid={`open-blog-btn-${article.id}`}
                      className="inline-flex min-h-[44px] shrink-0 items-center gap-1 text-[13.5px] font-medium text-[#143D2B] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px] px-1"
                    >
                      <span>{article.isRead ? 'Read again' : 'Read'}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
