'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Bookmark, ExternalLink, X } from 'lucide-react';
import type { DigestArticleDTO } from '@alongside/shared';
import {
  formatShortPublishDate,
  getSafeExternalHref,
} from '@/hooks/useCultureDigest';
import { cn } from '@/lib/utils';

export interface BlogReaderDrawerProps {
  article: DigestArticleDTO | null;
  childName: string;
  childAgeLabel: string;
  shortAges: string;
  relatedCourseTitle: string;
  onClose: () => void;
  onToggleSave: (article: DigestArticleDTO) => void;
  onShareArticle: (article: DigestArticleDTO) => void;
  onAskAdvisor: (prompt: string) => void;
}

function parseEditorialParagraphs(article: DigestArticleDTO): string[] {
  if (article.contentMarkdown && article.contentMarkdown.trim().length > 0) {
    return article.contentMarkdown
      .split(/\n{2,}/)
      .map((p) => p.replace(/^#+\s*/, '').trim())
      .filter((p) => p.length > 0);
  }
  return [article.summary];
}

export function BlogReaderDrawer({
  article,
  childName,
  childAgeLabel,
  shortAges,
  relatedCourseTitle,
  onClose,
  onToggleSave,
  onShareArticle,
  onAskAdvisor,
}: BlogReaderDrawerProps) {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;
  const activeId = article?.id ?? null;

  React.useEffect(() => {
    if (!activeId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeId]);

  if (!article) {
    return null;
  }

  const pubDate = formatShortPublishDate(article.publishedAt);
  const paragraphs = article.isOriginalEditorial ? parseEditorialParagraphs(article) : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-reader-drawer-title"
      data-testid="blog-reader-drawer"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex justify-end bg-[#131715]/40"
    >
      <div className="flex h-full w-full max-w-[620px] flex-col overflow-hidden border-l border-[#131715]/10 bg-[#FAF9F5] shadow-2xl">
        {/* Sticky Drawer Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#131715]/10 bg-white px-5 py-3.5 sm:px-6">
          <span className="truncate text-[13px] font-medium text-[#59625D] tabular-nums">
            {shortAges} · {article.topicLabel} · {article.readMinutes} min read · Issue #
            {article.issueNumber}
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close reader"
            data-testid="blog-reader-close-btn"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] text-[#3E4642] transition-colors hover:bg-[#F3F1EA] hover:text-[#131715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Editorial Body */}
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-6 pb-12 sm:px-8 sm:py-7">
          <h2
            id="blog-reader-drawer-title"
            className="font-serif text-[26px] sm:text-[33px] font-normal leading-[1.15] tracking-[-0.02em] text-[#131715]"
          >
            {article.title}
          </h2>

          <div
            data-testid="blog-reader-attribution"
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#59625D] tabular-nums"
          >
            <span className="font-medium text-[#131715]">
              {article.isOriginalEditorial ? 'Alongside Editorial' : article.sourceName}
            </span>
            {pubDate && (
              <>
                <span aria-hidden="true">·</span>
                <span>Published {pubDate}</span>
              </>
            )}
            {article.authorName && (
              <>
                <span aria-hidden="true">·</span>
                <span>By {article.authorName}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>
              Tailored for {childName} ({childAgeLabel})
            </span>
          </div>

          {article.isOriginalEditorial ? (
            /* Alongside Original Editorial: full structured paragraphs */
            <div data-testid="blog-reader-original-prose" className="space-y-4">
              {paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="max-w-[58ch] text-[16px] leading-[1.74] text-[#3E4642]"
                >
                  {para}
                </p>
              ))}
            </div>
          ) : (
            /* Fetched External Blog: Alongside calm summary + prominent canonical external link */
            <div data-testid="blog-reader-external-preview" className="space-y-4">
              <p className="max-w-[58ch] text-[16px] leading-[1.72] text-[#3E4642]">
                {article.summary}
              </p>

              <div className="flex flex-col gap-1.5 pt-1">
                <a
                  href={getSafeExternalHref(article.sourceUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="blog-reader-external-link"
                  className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded-[8px] bg-[#143D2B] px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#0E2B1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
                >
                  <span>Read full article on {article.sourceName}</span>
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
                <span className="text-[12px] text-[#59625D]">
                  Opens {article.sourceDomain} in a new tab
                </span>
              </div>
            </div>
          )}

          {/* Key Shift Callout */}
          <div className="rounded-r-[8px] border-l-[2.5px] border-[#143D2B] bg-[#F6F4EE] px-4 py-3 text-[14px] leading-[1.55] text-[#131715]">
            <strong className="font-semibold text-[#143D2B]">Key shift:</strong>{' '}
            {article.keyShift}
          </div>

          {/* Optional Perspective / Context Note */}
          {article.perspectiveNote && (
            <div className="rounded-[8px] bg-[#F3F1EA] px-4 py-3.5 text-[13.5px] leading-[1.55] text-[#3E4642]">
              <strong className="font-semibold text-[#131715]">Perspective:</strong>{' '}
              {article.perspectiveNote}
            </div>
          )}

          {/* Citations / Source Attribution Box */}
          {article.sourcesText && (
            <div className="rounded-[8px] border border-[#131715]/10 bg-white px-4 py-3.5 text-[13px] leading-[1.55] text-[#59625D]">
              <strong className="mb-1 block font-semibold text-[#131715]">
                {article.isOriginalEditorial
                  ? 'Research & editorial sources'
                  : 'Original publisher'}
              </strong>
              <span>{article.sourcesText}</span>
            </div>
          )}

          {/* Action Bar: Ask AI Advisor, Text to Partner, Quiet Bookmark */}
          <div className="flex flex-wrap items-center gap-2.5 border-t border-[#131715]/10 pt-4">
            <button
              type="button"
              data-testid="blog-reader-advisor-btn"
              onClick={() => {
                onAskAdvisor(
                  `Help me apply "${article.title}" calmly with ${childName} (${childAgeLabel}).`
                );
                onClose();
              }}
              className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] border border-[#131715]/20 bg-white px-4 text-[13.5px] font-medium text-[#131715] transition-colors hover:bg-[#F6F4EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
            >
              Ask AI Advisor
            </button>

            <button
              type="button"
              data-testid="blog-reader-share-btn"
              onClick={() => onShareArticle(article)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] border border-[#131715]/20 bg-white px-4 text-[13.5px] font-medium text-[#131715] transition-colors hover:bg-[#F6F4EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
            >
              Text to partner
            </button>

            <button
              type="button"
              data-testid="blog-reader-save-btn"
              onClick={() => onToggleSave(article)}
              aria-pressed={article.isSaved}
              aria-label={article.isSaved ? 'Remove from Saved' : 'Save blog'}
              title={article.isSaved ? 'Saved' : 'Save'}
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

          {/* Evergreen Academy Bridge */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-[#131715]/10 pt-3.5 text-[13px] text-[#59625D]">
            <span>Go deeper in evergreen curriculum</span>
            <Link
              href="/academy"
              onClick={onClose}
              className="inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] font-medium text-[#143D2B] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
            >
              <span>{relatedCourseTitle}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
