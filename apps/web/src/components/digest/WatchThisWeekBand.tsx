'use client';

import * as React from 'react';
import { ArrowRight, Bookmark, Play } from 'lucide-react';
import type { DigestVideoDTO } from '@alongside/shared';
import {
  formatShortPublishDate,
  getYouTubeThumbnailUrl,
  splitJumpChipLabel,
} from '@/hooks/useCultureDigest';
import { cn } from '@/lib/utils';

export interface WatchThisWeekBandProps {
  videos: DigestVideoDTO[];
  childName: string;
  shortAges: string;
  weekRange: string;
  isAllWeeks?: boolean;
  onOpenVideo: (video: DigestVideoDTO, startSeconds?: number) => void;
  onToggleSaveVideo: (video: DigestVideoDTO) => void;
  onViewAllVideos: () => void;
}

export function WatchThisWeekBand({
  videos,
  childName,
  shortAges,
  weekRange,
  isAllWeeks = false,
  onOpenVideo,
  onToggleSaveVideo,
  onViewAllVideos,
}: WatchThisWeekBandProps) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="watch-this-week-heading"
      data-testid="watch-this-week-band"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h2
            id="watch-this-week-heading"
            className="font-serif text-[24px] sm:text-[28px] font-normal tracking-[-0.024em] text-[#0E1311]"
          >
            {isAllWeeks ? 'Watch across all weeks' : 'Watch this week'}
          </h2>
          <p className="mt-0.5 text-[13.5px] text-[#59625D]">
            {videos.length} curated {videos.length === 1 ? 'talk' : 'talks'} for{' '}
            {childName} · {shortAges} ({weekRange}) — tap any talk to watch.
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAllVideos}
          data-testid="watch-all-videos-btn"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] font-medium text-[#143D2B] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px] px-1"
        >
          <span>All curated videos</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div
        data-testid="week-videos-grid"
        className={cn(
          'grid grid-cols-1 gap-[24px] sm:grid-cols-2',
          videos.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
        )}
      >
        {videos.map((video, idx) => {
          const publishLabel = formatShortPublishDate(video.publishedAt);
          const firstChip =
            video.jumpChips && video.jumpChips.length > 0 ? video.jumpChips[0] : null;
          const chipParsed = firstChip ? splitJumpChipLabel(firstChip.label) : null;

          return (
            <article
              key={video.id}
              data-testid={`week-video-card-${video.id}`}
              className="group flex min-w-0 flex-col gap-3.5"
            >
              <button
                type="button"
                onClick={() => onOpenVideo(video)}
                aria-label={`Play video: ${video.title}`}
                data-testid={`week-video-play-${video.id}`}
                className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[16px] bg-[#141816] shadow-[0_12px_32px_rgba(19,23,21,0.10)] transition-all duration-300 group-hover:shadow-[0_22px_46px_rgba(19,23,21,0.18)] group-hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getYouTubeThumbnailUrl(video.youtubeVideoId)}
                  alt={video.title}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 scale-[1.18] transition-transform duration-300 group-hover:scale-[1.22] group-hover:opacity-100"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-[#101713]/10 via-[#101713]/25 to-[#101713]/75"
                  aria-hidden="true"
                />
                <span
                  aria-hidden="true"
                  className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#111413] shadow-lg transition-transform duration-200 group-hover:scale-108 group-hover:bg-white"
                >
                  <Play className="h-4 w-4 fill-current ml-0.5 text-[#111413]" />
                </span>
                <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-2 text-[11px] text-[#FAF9F5] tabular-nums">
                  <span className="rounded-full bg-[#111413]/65 backdrop-blur-md px-3 py-1 font-medium whitespace-nowrap shadow-xs">
                    {video.formatLabel}
                  </span>
                  <span className="rounded-full bg-[#111413]/65 backdrop-blur-md px-3 py-1 font-medium whitespace-nowrap shadow-xs">
                    {video.durationMinutes} min
                  </span>
                </div>
              </button>

              <div className="flex min-w-0 flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenVideo(video)}
                    className="min-h-[44px] py-0.5 text-left font-serif text-[19px] sm:text-[20px] font-normal leading-[1.24] tracking-[-0.018em] text-[#0E1311] transition-colors hover:text-[#143D2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
                  >
                    {video.title}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleSaveVideo(video)}
                    aria-pressed={video.isSaved}
                    aria-label={
                      video.isSaved
                        ? `Remove ${video.title} from Saved`
                        : `Save ${video.title}`
                    }
                    title={video.isSaved ? 'Saved' : 'Save video'}
                    data-testid={`week-video-save-${video.id}`}
                    className={cn(
                      'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                      video.isSaved
                        ? 'bg-[#E6F0EB] text-[#143D2B]'
                        : 'text-[#59625D] hover:bg-[#EFECE3] hover:text-[#131715]'
                    )}
                  >
                    <Bookmark
                      className={cn('h-4 w-4', video.isSaved && 'fill-current')}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <p className="text-[12.5px] text-[#59625D] tabular-nums">
                  {video.presenter} · {video.channelName}
                  {publishLabel ? ` · ${publishLabel}` : ''}
                </p>

                <p className="line-clamp-2 text-[13.5px] leading-[1.5] text-[#3E4642]">
                  {video.takeaway}
                </p>

                {firstChip && chipParsed && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenVideo(video, firstChip.seconds)}
                      className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#F3F0E6] hover:bg-[#EAF3EE] hover:text-[#143D2B] px-3 py-1 text-[11.5px] font-medium text-[#424945] transition-colors cursor-pointer"
                      title={`Jump to ${chipParsed.timestamp}: ${chipParsed.text}`}
                    >
                      <span className="font-semibold text-[#143D2B] shrink-0">
                        ▶ {chipParsed.timestamp}
                      </span>
                      <span className="truncate">{chipParsed.text}</span>
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
