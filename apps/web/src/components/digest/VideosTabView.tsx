'use client';

import * as React from 'react';
import { Bookmark, ChevronDown, Play, Search } from 'lucide-react';
import type {
  DigestQueryScope,
  DigestVideoDTO,
} from '@alongside/shared';
import {
  buildYouTubeEmbedUrl,
  formatShortPublishDate,
  getYouTubeThumbnailUrl,
  splitJumpChipLabel,
} from '@/hooks/useCultureDigest';
import { cn } from '@/lib/utils';

export interface VideosTabViewProps {
  videos: DigestVideoDTO[];
  issueNumber: number | null;
  childName: string;
  shortAges: string;
  scope: DigestQueryScope;
  searchQuery: string;
  activeTheaterVideoId: string | null;
  isLoading?: boolean;
  onBrowseAllWeeks: () => void;
  onChangeSearch: (query: string) => void;
  onSelectTheaterVideo: (videoId: string) => void;
  onToggleSaveVideo: (video: DigestVideoDTO) => void;
}

export function VideosTabView({
  videos,
  issueNumber,
  childName,
  shortAges,
  scope,
  searchQuery,
  activeTheaterVideoId,
  isLoading = false,
  onBrowseAllWeeks,
  onChangeSearch,
  onSelectTheaterVideo,
  onToggleSaveVideo,
}: VideosTabViewProps) {
  const activeVideo = React.useMemo(() => {
    if (videos.length === 0) return null;
    if (activeTheaterVideoId) {
      const found = videos.find((v) => v.id === activeTheaterVideoId);
      if (found) return found;
    }
    return videos[0]!;
  }, [videos, activeTheaterVideoId]);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [startSeconds, setStartSeconds] = React.useState(0);
  const [embedInstanceKey, setEmbedInstanceKey] = React.useState(0);
  const [skimOpen, setSkimOpen] = React.useState(false);
  const theaterRef = React.useRef<HTMLDivElement>(null);

  // Reset inline player cleanly whenever the active theater video switches
  React.useEffect(() => {
    setIsPlaying(false);
    setStartSeconds(0);
    setSkimOpen(false);
  }, [activeVideo?.id]);

  const handlePlayAt = (seconds: number) => {
    setStartSeconds(Math.max(0, Math.floor(seconds)));
    setIsPlaying(true);
    setEmbedInstanceKey((prev) => prev + 1);
  };

  const handleSelectShelfVideo = (videoId: string) => {
    onSelectTheaterVideo(videoId);
    if (typeof window !== 'undefined') {
      theaterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const trimmedQuery = searchQuery.trim();

  return (
    <section
      id="digest-panel-videos"
      role="tabpanel"
      aria-labelledby="digest-tab-videos"
      data-testid="videos-tab-view"
      className="py-7 pb-16"
    >
      {/* Minimalist Toolbar: Search only (Week scope controlled by header selector) */}
      <div className="mb-6 flex items-center">
        <div className="relative w-full min-w-0 sm:max-w-[360px]">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#59625D]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder="Search videos or speakers..."
            aria-label="Search videos"
            data-testid="videos-search-input"
            className="min-h-[44px] w-full rounded-[8px] border border-[#131715]/20 bg-white pl-10 pr-3.5 text-[13.5px] text-[#131715] placeholder:text-[#59625D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6 py-4">
          <div className="h-80 rounded-[12px] bg-[#F3F1EA]" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="h-48 rounded-[10px] bg-[#F3F1EA]/70" />
            <div className="h-48 rounded-[10px] bg-[#F3F1EA]/70" />
            <div className="h-48 rounded-[10px] bg-[#F3F1EA]/70" />
          </div>
        </div>
      ) : !activeVideo ? (
        <div
          data-testid="videos-empty-state"
          className="flex flex-col items-center gap-3 border-t border-[#131715]/10 px-6 py-12 text-center"
        >
          <p className="text-[14.5px] text-[#59625D]">
            {trimmedQuery
              ? `No videos matched “${trimmedQuery}” for ${shortAges}.`
              : scope === 'issue'
                ? `No videos published for this week yet for ${childName} · ${shortAges}.`
                : `No videos published for ${shortAges} yet.`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {trimmedQuery && (
              <button
                type="button"
                onClick={() => onChangeSearch('')}
                className="inline-flex min-h-[44px] items-center rounded-[8px] border border-[#131715]/20 bg-white px-4 text-[13.5px] font-medium text-[#131715] hover:bg-[#F6F4EE]"
              >
                Clear search
              </button>
            )}
            {scope === 'issue' && (
              <button
                type="button"
                data-testid="videos-empty-browse-all-btn"
                onClick={onBrowseAllWeeks}
                className="inline-flex min-h-[44px] items-center rounded-[8px] bg-[#143D2B] px-4 text-[13.5px] font-medium text-white hover:bg-[#0E2B1E]"
              >
                Browse all weeks
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Wide 7/5 Live Theater Player */}
          <div
            ref={theaterRef}
            data-testid="videos-theater-stage"
            className="mb-9 scroll-mt-24 rounded-[12px] bg-[#F3F1EA] p-5 sm:p-7"
          >
            <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12">
              {/* 7 cols: 16:9 Lazy Poster / YouTube Nocookie Embed */}
              <div className="lg:col-span-7">
                <div className="relative aspect-video w-full overflow-hidden rounded-[10px] bg-[#141816]">
                  {isPlaying ? (
                    <iframe
                      key={`${activeVideo.id}-${embedInstanceKey}`}
                      src={buildYouTubeEmbedUrl(activeVideo.youtubeVideoId, startSeconds)}
                      title={activeVideo.title}
                      data-testid="videos-theater-iframe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="block h-full w-full border-0"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePlayAt(0)}
                      data-testid="videos-theater-play-btn"
                      aria-label={`Play video: ${activeVideo.title}`}
                      className="group relative flex h-full w-full items-center justify-center overflow-hidden p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getYouTubeThumbnailUrl(activeVideo.youtubeVideoId)}
                        alt={activeVideo.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-90 scale-[1.18] transition-transform duration-300 group-hover:scale-[1.22] group-hover:opacity-100"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-[#101713]/10 to-[#101713]/70"
                        aria-hidden="true"
                      />
                      <span
                        aria-hidden="true"
                        className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF9F5] text-[#143D2B] shadow-lg transition-transform duration-200 group-hover:scale-105"
                      >
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </span>
                      <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-2 text-[12px] text-[#FAF9F5] tabular-nums">
                        <span className="rounded-[6px] bg-[#101713]/80 px-2.5 py-1 font-medium whitespace-nowrap">
                          {activeVideo.formatLabel}
                        </span>
                        <span className="rounded-[6px] bg-[#101713]/80 px-2.5 py-1 font-medium whitespace-nowrap">
                          {activeVideo.durationMinutes} min
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* 5 cols: Editorial Notes, Real Jump Chips, Expandable 3-Bullet Skim */}
              <div className="flex min-w-0 flex-col gap-3.5 lg:col-span-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12.5px] text-[#59625D] tabular-nums">
                    <span className="font-semibold text-[#143D2B]">{shortAges}</span>
                    <span className="text-[#131715]/20" aria-hidden="true">
                      /
                    </span>
                    <span>Issue #{activeVideo.issueNumber}</span>
                    <span className="text-[#131715]/20" aria-hidden="true">
                      /
                    </span>
                    <span>{activeVideo.durationMinutes} min</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleSaveVideo(activeVideo)}
                    aria-pressed={activeVideo.isSaved}
                    aria-label={
                      activeVideo.isSaved
                        ? `Remove ${activeVideo.title} from Saved`
                        : `Save ${activeVideo.title}`
                    }
                    title={activeVideo.isSaved ? 'Saved' : 'Save video'}
                    className={cn(
                      'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                      activeVideo.isSaved
                        ? 'bg-[#E6F0EB] text-[#143D2B]'
                        : 'text-[#59625D] hover:bg-white/80 hover:text-[#131715]'
                    )}
                  >
                    <Bookmark
                      className={cn('h-4 w-4', activeVideo.isSaved && 'fill-current')}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div>
                  <h2 className="font-serif text-[22px] sm:text-[26px] font-normal leading-[1.2] tracking-[-0.02em] text-[#131715]">
                    {activeVideo.title}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#59625D] tabular-nums">
                    {activeVideo.presenter} · {activeVideo.channelName}
                    {formatShortPublishDate(activeVideo.publishedAt)
                      ? ` · Published ${formatShortPublishDate(activeVideo.publishedAt)}`
                      : ''}
                  </p>
                </div>

                <p className="text-[14.5px] leading-[1.58] text-[#3E4642]">
                  {activeVideo.takeaway}
                </p>

                {/* Render jumpChips ONLY when real timestamp chips exist */}
                {activeVideo.jumpChips && activeVideo.jumpChips.length > 0 && (
                  <div data-testid="theater-jump-chips">
                    <div className="mb-1.5 text-[12px] font-semibold text-[#59625D]">
                      Jump straight to a key moment
                    </div>
                    <div
                      className="flex flex-wrap gap-2"
                      role="group"
                      aria-label="Jump to video highlight"
                    >
                      {activeVideo.jumpChips.map((chip, idx) => {
                        const { timestamp, text } = splitJumpChipLabel(chip.label);
                        return (
                          <button
                            key={`${chip.seconds}-${idx}`}
                            type="button"
                            onClick={() => handlePlayAt(chip.seconds)}
                            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#131715]/18 bg-white px-3 py-1 text-[12.5px] text-[#131715] transition-colors hover:border-[#143D2B]/40 hover:bg-[#E6F0EB] hover:text-[#143D2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                          >
                            {timestamp && (
                              <span className="font-semibold text-[#143D2B] tabular-nums">
                                {timestamp}
                              </span>
                            )}
                            <span>{text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeVideo.skimBullets.length > 0 && (
                  <div>
                    <button
                      type="button"
                      aria-expanded={skimOpen}
                      data-testid="theater-skim-toggle"
                      onClick={() => setSkimOpen((prev) => !prev)}
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-[13px] font-semibold text-[#143D2B] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
                    >
                      <span>
                        {skimOpen
                          ? 'Hide 3-bullet skim'
                          : 'Too busy? Read the 3-bullet skim'}
                      </span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          skimOpen && 'rotate-180'
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {skimOpen && (
                      <ul
                        data-testid="theater-skim-list"
                        className="mt-1.5 flex list-none flex-col gap-2 rounded-[8px] bg-white px-4 py-3 text-[13px] leading-[1.52] text-[#3E4642]"
                      >
                        {activeVideo.skimBullets.map((bullet, idx) => (
                          <li
                            key={idx}
                            className="relative pl-3.5 before:absolute before:left-0 before:top-[8px] before:h-[4px] before:w-[4px] before:rounded-full before:bg-[#143D2B]"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3-Column Selectable Video Shelf */}
          <div className="mb-4">
            <h3 className="font-serif text-[22px] font-normal tracking-[-0.015em] text-[#131715]">
              {scope === 'issue'
                ? issueNumber !== null
                  ? `Issue #${issueNumber} talks for ${childName} · ${shortAges}`
                  : `This week's talks for ${childName} · ${shortAges}`
                : `All curated talks for ${childName} · ${shortAges}`}
            </h3>
            <p className="mt-0.5 text-[13.5px] text-[#59625D]">
              Select any talk below to load it into the player above.
            </p>
          </div>

          <div
            data-testid="videos-shelf-grid"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {videos.map((video) => {
              const isCurrent = video.id === activeVideo.id;
              const pubDate = formatShortPublishDate(video.publishedAt);
              return (
                <article
                  key={video.id}
                  data-testid={`video-shelf-item-${video.id}`}
                  className="flex min-w-0 flex-col gap-2.5"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectShelfVideo(video.id)}
                    aria-label={`Load in player: ${video.title}`}
                    className={cn(
                      'group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[9px] bg-[#141816] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                      isCurrent && 'ring-2 ring-[#143D2B] ring-offset-2 ring-offset-[#FAF9F5]'
                    )}
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
                        {isCurrent ? 'In player' : video.formatLabel}
                      </span>
                      <span className="rounded-[6px] bg-[#101713]/80 px-2 py-0.5 font-medium whitespace-nowrap">
                        {video.durationMinutes} min
                      </span>
                    </div>
                  </button>

                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectShelfVideo(video.id)}
                      className="min-h-[44px] py-0.5 text-left font-serif text-[18px] font-normal leading-[1.25] text-[#131715] transition-colors hover:text-[#143D2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
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
                    {video.presenter} · Issue #{video.issueNumber}
                    {pubDate ? ` · ${pubDate}` : ''}
                  </p>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
