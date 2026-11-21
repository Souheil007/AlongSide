'use client';

import * as React from 'react';
import { Bookmark, Play } from 'lucide-react';
import type {
  DigestArticleDTO,
  DigestDinnerPromptDTO,
  DigestVideoDTO,
  SavedDigestShortlistDTO,
} from '@alongside/shared';
import {
  formatShortPublishDate,
  getYouTubeThumbnailUrl,
} from '@/hooks/useCultureDigest';

export interface SavedShortlistViewProps {
  shortlist: SavedDigestShortlistDTO;
  childName: string;
  shortAges: string;
  onBrowseThisWeek: () => void;
  onOpenArticle: (article: DigestArticleDTO) => void;
  onRemoveArticle: (article: DigestArticleDTO) => void;
  onOpenVideo: (video: DigestVideoDTO) => void;
  onRemoveVideo: (video: DigestVideoDTO) => void;
  onCopyDinnerQuestion: (question: string) => void;
  onRemoveDinner: (prompt: DigestDinnerPromptDTO) => void;
}

export function SavedShortlistView({
  shortlist,
  childName,
  shortAges,
  onBrowseThisWeek,
  onOpenArticle,
  onRemoveArticle,
  onOpenVideo,
  onRemoveVideo,
  onCopyDinnerQuestion,
  onRemoveDinner,
}: SavedShortlistViewProps) {
  return (
    <section
      id="digest-panel-saved"
      role="tabpanel"
      aria-labelledby="digest-tab-saved"
      data-testid="saved-shortlist-view"
      className="py-7 pb-16"
    >
      <div className="mb-6">
        <h2 className="font-serif text-[24px] sm:text-[28px] font-normal tracking-[-0.02em] text-[#131715]">
          Saved for {childName} · {shortAges}
        </h2>
        <p className="mt-0.5 text-[13.5px] text-[#59625D]">
          Your bookmarked blogs, videos, and dinner questions for this child.
        </p>
      </div>

      {shortlist.totalCount === 0 ? (
        <div
          data-testid="saved-empty-state"
          className="flex flex-col items-center gap-3 border-t border-[#131715]/10 px-6 py-12 text-center"
        >
          <p className="font-serif text-[21px] font-normal text-[#131715]">
            Nothing saved yet for {childName}
          </p>
          <p className="max-w-[44ch] text-[14.5px] text-[#59625D]">
            Tap the bookmark icon on any blog, video, or dinner question to build your calm
            Sunday shortlist.
          </p>
          <button
            type="button"
            onClick={onBrowseThisWeek}
            className="mt-2 inline-flex min-h-[44px] items-center rounded-[8px] bg-[#143D2B] px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-[#0E2B1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
          >
            Browse This Week
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {/* Saved Blogs */}
          {shortlist.articles.length > 0 && (
            <section aria-labelledby="saved-blogs-heading" data-testid="saved-blogs-section">
              <h3
                id="saved-blogs-heading"
                className="mb-3 font-serif text-[21px] font-normal text-[#131715] tabular-nums"
              >
                Saved blogs ({shortlist.articles.length})
              </h3>
              <div className="border-t border-[#131715]/18">
                {shortlist.articles.map((article) => {
                  const pubDate = formatShortPublishDate(article.publishedAt);
                  return (
                    <article
                      key={article.id}
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
                        </span>
                        <span>
                          Issue #{article.issueNumber} · {article.topicLabel}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-3 md:contents">
                        <button
                          type="button"
                          onClick={() => onOpenArticle(article)}
                          className="group flex min-w-0 flex-1 flex-col gap-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
                        >
                          <h4 className="font-serif text-[21px] font-normal leading-[1.24] text-[#131715] transition-colors group-hover:text-[#143D2B]">
                            {article.title}
                          </h4>
                          <p className="max-w-[62ch] text-[14.5px] leading-[1.58] text-[#3E4642]">
                            {article.summary}
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => onRemoveArticle(article)}
                          aria-pressed={true}
                          aria-label={`Remove ${article.title} from Saved`}
                          title="Remove from Saved"
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#E6F0EB] text-[#143D2B] transition-colors hover:bg-[#D5E6DD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                        >
                          <Bookmark className="h-4 w-4 fill-current" aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Saved Videos */}
          {shortlist.videos.length > 0 && (
            <section aria-labelledby="saved-videos-heading" data-testid="saved-videos-section">
              <h3
                id="saved-videos-heading"
                className="mb-4 font-serif text-[21px] font-normal text-[#131715] tabular-nums"
              >
                Saved videos ({shortlist.videos.length})
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shortlist.videos.map((video) => (
                  <article key={video.id} className="flex min-w-0 flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => onOpenVideo(video)}
                      aria-label={`Watch ${video.title}`}
                      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[9px] bg-[#141816] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getYouTubeThumbnailUrl(video.youtubeVideoId)}
                        alt={video.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-90 scale-[1.18] transition-transform duration-300 group-hover:scale-[1.22]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-[#101713]/10 to-[#101713]/70"
                        aria-hidden="true"
                      />
                      <span
                        aria-hidden="true"
                        className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF9F5] text-[#143D2B] shadow-md transition-transform duration-200 group-hover:scale-105"
                      >
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      </span>
                      <div className="absolute inset-x-2 bottom-2 z-10 flex items-center justify-between gap-2 text-[11px] text-[#FAF9F5] tabular-nums">
                        <span className="rounded-[6px] bg-[#101713]/80 px-2 py-0.5 font-medium whitespace-nowrap">
                          {video.formatLabel}
                        </span>
                        <span className="rounded-[6px] bg-[#101713]/80 px-2 py-0.5 font-medium whitespace-nowrap">
                          {video.durationMinutes} min
                        </span>
                      </div>
                    </button>

                    <div className="flex items-start justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenVideo(video)}
                        className="min-h-[44px] py-0.5 text-left font-serif text-[18px] font-normal leading-[1.25] text-[#131715] transition-colors hover:text-[#143D2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
                      >
                        {video.title}
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveVideo(video)}
                        aria-pressed={true}
                        aria-label={`Remove ${video.title} from Saved`}
                        title="Remove from Saved"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#E6F0EB] text-[#143D2B] transition-colors hover:bg-[#D5E6DD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                      >
                        <Bookmark className="h-4 w-4 fill-current" aria-hidden="true" />
                      </button>
                    </div>

                    <p className="text-[12.5px] text-[#59625D] tabular-nums">
                      {video.presenter} · Issue #{video.issueNumber}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Saved Dinner Questions */}
          {shortlist.dinnerPrompts.length > 0 && (
            <section aria-labelledby="saved-dinners-heading" data-testid="saved-dinners-section">
              <h3
                id="saved-dinners-heading"
                className="mb-3 font-serif text-[21px] font-normal text-[#131715] tabular-nums"
              >
                Saved dinner questions ({shortlist.dinnerPrompts.length})
              </h3>
              <div className="border-t border-[#131715]/18">
                {shortlist.dinnerPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="flex flex-wrap items-center justify-between gap-4 border-b border-[#131715]/10 py-4"
                  >
                    <div className="min-w-0">
                      <div className="mb-1 text-[12.5px] text-[#59625D] tabular-nums">
                        Issue #{prompt.issueNumber}
                      </div>
                      <p className="max-w-[62ch] font-serif text-[19px] leading-[1.35] text-[#131715]">
                        &ldquo;{prompt.question}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onCopyDinnerQuestion(prompt.question)}
                        className="inline-flex min-h-[44px] items-center rounded-[8px] border border-[#131715]/20 bg-white px-4 text-[13.5px] font-medium text-[#131715] transition-colors hover:bg-[#F6F4EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                      >
                        Copy
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveDinner(prompt)}
                        aria-pressed={true}
                        aria-label="Remove dinner question from Saved"
                        title="Remove from Saved"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#E6F0EB] text-[#143D2B] transition-colors hover:bg-[#D5E6DD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                      >
                        <Bookmark className="h-4 w-4 fill-current" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </section>
  );
}
