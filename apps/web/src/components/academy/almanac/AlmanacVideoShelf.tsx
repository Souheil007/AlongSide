'use client';

import * as React from 'react';
import { ChevronDown, Play } from 'lucide-react';
import type { MasterVideoLectureDTO } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface AlmanacVideoShelfProps {
  video: MasterVideoLectureDTO;
  kickerLabel?: string;
  t?: (str: string) => string;
  className?: string;
}

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace(/^\//, '').split('/')[0] || null;
    }
    const vParam = parsed.searchParams.get('v');
    if (vParam) return vParam;
    const embedMatch = parsed.pathname.match(/\/embed\/([^/?#]+)/);
    if (embedMatch?.[1]) return embedMatch[1];
  } catch {
    const regexMatch = url.match(
      /(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (regexMatch?.[1]) return regexMatch[1];
  }
  return null;
}

function formatJumpTimestamp(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function stripLeadingTimestamp(label: string): string {
  return label.replace(/^\s*\d{1,2}:\d{2}\s*[·•–—-]\s*/, '').trim();
}

/**
 * Bottom-Only Master Talk Shelf (Interactive Almanac v2).
 * Lazy-loaded YouTube nocookie embed with clickable timestamp jumpChips
 * and a collapsible 3-core-ideas text skim for parents who prefer reading.
 */
export function AlmanacVideoShelf({
  video,
  kickerLabel = 'Optional · Go Deeper on This Concept',
  t = (s) => s,
  className,
}: AlmanacVideoShelfProps) {
  const videoId = React.useMemo(
    () => extractYouTubeVideoId(video.videoUrl),
    [video.videoUrl]
  );
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [startSeconds, setStartSeconds] = React.useState(0);
  const [embedInstanceKey, setEmbedInstanceKey] = React.useState(0);
  const [skimOpen, setSkimOpen] = React.useState(false);

  const handlePlayAt = (seconds: number) => {
    setStartSeconds(Math.max(0, Math.floor(seconds)));
    setIsPlaying(true);
    setEmbedInstanceKey((prev) => prev + 1);
  };

  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&start=${startSeconds}&rel=0`
    : video.videoUrl;

  const posterUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <section
      id="almanac-master-talk-shelf"
      data-testid="almanac-video-shelf"
      aria-label={`Optional master talk: ${video.title}`}
      className={cn(
        'scroll-mt-36 overflow-hidden rounded-[16px] border border-[var(--hairline)] bg-[var(--elevated)] shadow-sm',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2.5 border-b border-[var(--hairline-soft)] px-5 py-4 sm:px-6 sm:pt-5 sm:pb-4">
        <div className="min-w-0">
          <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--amber)] mb-1">
            {kickerLabel}
          </span>
          <h3 className="font-serif-almanac text-[20px] sm:text-[21px] font-semibold leading-[1.25] text-[var(--ink)] m-0">
            {t(video.title)}
          </h3>
        </div>
        <span className="text-[12.5px] text-[var(--mute)] whitespace-nowrap">
          {video.presenter} · {video.channel}
        </span>
      </div>

      {/* 16:9 Lazy Poster -> YouTube Nocookie Embed */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#141412]">
        {isPlaying ? (
          <iframe
            key={embedInstanceKey}
            src={embedUrl}
            title={video.title}
            data-testid="almanac-video-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0 block"
          />
        ) : (
          <button
            type="button"
            onClick={() => handlePlayAt(0)}
            data-testid="almanac-video-poster-btn"
            aria-label={`Play master talk: ${video.title}`}
            className="group relative flex h-full w-full items-center justify-center border-0 bg-[#191815] p-0 text-left cursor-pointer"
          >
            {posterUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posterUrl}
                alt={`Preview frame for ${video.title}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-85 transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-95"
              />
            )}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#111413]/15 to-[#111413]/75"
              aria-hidden="true"
            />
            <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#FBFBF9] text-[#143D2B] shadow-lg transition-transform duration-200 group-hover:scale-105">
              <Play className="h-6 w-6 fill-current ml-0.5" aria-hidden="true" />
            </span>

            <div className="absolute inset-x-5 bottom-4 z-10 flex items-end justify-between gap-3 text-[#FBFBF9]">
              <span className="text-[13px] font-medium opacity-90">
                Watch when you have a quiet cup of tea — or tap a moment below
              </span>
              <span className="shrink-0 rounded-[6px] bg-[#111413]/80 px-2.5 py-1 font-mono text-[11px] tabular-nums text-[#FBFBF9]">
                {video.durationMinutes} min
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Body: Why it matters + Timestamp Jump Chips + Collapsible 3 Core Ideas */}
      <div className="grid gap-4 px-5 py-4 sm:px-6 sm:py-5">
        {video.parentHook && (
          <p className="font-serif-almanac italic text-[16.5px] leading-[1.5] text-[var(--ink)] m-0">
            {t(video.parentHook)}
          </p>
        )}

        {video.jumpChips && video.jumpChips.length > 0 && (
          <div>
            <span className="block text-[12px] font-semibold text-[var(--mute)] mb-2">
              Jump straight to a key moment
            </span>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Video timestamp jump chips"
            >
              {video.jumpChips.map((chip, idx) => (
                <button
                  key={`${chip.seconds}-${idx}`}
                  type="button"
                  onClick={() => handlePlayAt(chip.seconds)}
                  data-testid={`video-jump-chip-${idx}`}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--canvas-subtle)] px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--ink)] transition-all hover:border-[var(--spruce)] hover:bg-[var(--spruce-soft)] hover:text-[var(--spruce)] cursor-pointer"
                >
                  <span className="font-mono text-[11px] font-semibold text-[var(--spruce)] tabular-nums">
                    {formatJumpTimestamp(chip.seconds)}
                  </span>
                  <span>{t(stripLeadingTimestamp(chip.label))}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {video.keyTakeaways && video.keyTakeaways.length > 0 && (
          <div className="pt-1 border-t border-[var(--hairline-soft)]">
            <button
              type="button"
              onClick={() => setSkimOpen((prev) => !prev)}
              aria-expanded={skimOpen}
              data-testid="video-skim-toggle"
              className="inline-flex min-h-[44px] items-center gap-2 bg-transparent border-0 py-1.5 text-[13.5px] font-semibold text-[var(--spruce)] cursor-pointer"
            >
              <span>Read the 3 core ideas instead</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  skimOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </button>

            {skimOpen && (
              <div
                data-testid="video-skim-panel"
                className="mt-2 space-y-3 almanac-rise-in"
              >
                <ul className="m-0 list-none space-y-2.5 p-0">
                  {video.keyTakeaways.map((idea, idx) => (
                    <li
                      key={idx}
                      className="relative pl-4 text-[14px] leading-[1.55] text-[var(--body)] before:absolute before:left-0 before:top-[9px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-[var(--spruce)]"
                    >
                      {t(idea)}
                    </li>
                  ))}
                </ul>

                {video.actionPrompt && (
                  <p className="rounded-[10px] bg-[var(--canvas-subtle)] px-3.5 py-2.5 text-[13px] text-[var(--ink)] m-0">
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[var(--spruce)] mr-1.5">
                      Try tonight ·
                    </span>
                    {t(video.actionPrompt)}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
