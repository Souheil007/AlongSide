'use client';

import * as React from 'react';
import { ArrowRight, Bookmark, Play } from 'lucide-react';
import type { DigestVideoDTO } from '@alongside/shared';
import {
  formatShortPublishDate,
  getYouTubeThumbnailUrl,
} from '@/hooks/useCultureDigest';
import { cn } from '@/lib/utils';

export interface WatchThisWeekBandProps {
  videos: DigestVideoDTO[];
  childName: string;
  shortAges: string;
  weekRange: string;
  isAllWeeks?: boolean;
  onOpenVideo: (video: DigestVideoDTO) => void;
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
            className="font-serif text-[23px] sm:text-[27px] font-normal tracking-[-0.02em] text-[#131715]"
          >
            {isAllWeeks ? 'Watch across all weeks' : 'Watch this week'}
          </h2>
          <p className="mt-0.5 text-[13.5px] text-[#59625D]">
            {videos.length} curated {videos.length === 1 ? 'talk' : 'talks'} for{' '}
            {childName} · {shortAges} ({weekRange}) - tap any talk to watch.
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
          'grid grid-cols-1 gap-[22px] sm:grid-cols-2',
          videos.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
        )}
      >
        {videos.map((video) => {
          const publishLabel = formatShortPublishDate(video.publishedAt);
          return (
            <article
              key={video.id}
              data-testid={`week-video-card-${video.id}`}
              className="flex min-w-0 flex-col gap-3"
            >
              <button
                type="button"
                onClick={() => onOpenVideo(video)}
                aria-label={`Play video: ${video.title}`}
                data-testid={`week-video-play-${video.id}`}
                className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[10px] bg-[#141816] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getYouTubeThumbnailUrl(video.youtubeVideoId)}
                  alt={video.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 scale-[1.18] transition-transform duration-300 group-hover:scale-[1.22] group-hover:opacity-100"
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
                <div className="absolute inset-x-2.5 bottom-2.5 z-10 flex items-center justify-between gap-2 text-[11.5px] text-[#FAF9F5] tabular-nums">
                  <span className="rounded-[6px] bg-[#101713]/80 px-2.5 py-1 font-medium whitespace-nowrap">
                    {video.formatLabel}
                  </span>
                  <span className="rounded-[6px] bg-[#101713]/80 px-2.5 py-1 font-medium whitespace-nowrap">
                    {video.durationMinutes} min
                  </span>
                </div>
              </button>

              <div className="flex min-w-0 flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenVideo(video)}
                    className="min-h-[44px] py-0.5 text-left font-serif text-[19px] font-normal leading-[1.24] tracking-[-0.015em] text-[#131715] transition-colors hover:text-[#143D2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
