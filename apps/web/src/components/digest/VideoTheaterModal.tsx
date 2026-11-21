'use client';

import * as React from 'react';
import { Bookmark, ChevronDown, X } from 'lucide-react';
import type { DigestVideoDTO } from '@alongside/shared';
import {
  buildYouTubeEmbedUrl,
  formatShortPublishDate,
  splitJumpChipLabel,
} from '@/hooks/useCultureDigest';
import { cn } from '@/lib/utils';

export interface VideoTheaterModalProps {
  video: DigestVideoDTO | null;
  initialStartSeconds?: number;
  shortAges: string;
  onClose: () => void;
  onToggleSave: (video: DigestVideoDTO) => void;
}

export function VideoTheaterModal({
  video,
  initialStartSeconds = 0,
  shortAges,
  onClose,
  onToggleSave,
}: VideoTheaterModalProps) {
  const [startSeconds, setStartSeconds] = React.useState(initialStartSeconds);
  const [embedKey, setEmbedKey] = React.useState(0);
  const [skimOpen, setSkimOpen] = React.useState(false);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setStartSeconds(initialStartSeconds);
    setEmbedKey((prev) => prev + 1);
    setSkimOpen(false);
  }, [video?.id, initialStartSeconds]);

  React.useEffect(() => {
    if (!video) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
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
  }, [video, onClose]);

  if (!video) {
    return null;
  }

  const pubDate = formatShortPublishDate(video.publishedAt);
  const embedSrc = buildYouTubeEmbedUrl(video.youtubeVideoId, startSeconds);

  const handleJump = (seconds: number) => {
    setStartSeconds(Math.max(0, Math.floor(seconds)));
    setEmbedKey((prev) => prev + 1);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-theater-modal-title"
      data-testid="video-theater-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101713]/65 p-4 sm:p-5"
    >
      <div className="max-h-[92vh] w-full max-w-[900px] overflow-y-auto rounded-[14px] border border-[#131715]/10 bg-[#FAF9F5] shadow-2xl">
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#131715]/10 bg-white px-5 py-3.5">
          <span className="truncate text-[13px] font-medium text-[#59625D] tabular-nums">
            {shortAges} · {video.formatLabel} · {video.durationMinutes} min · Issue #
            {video.issueNumber}
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close video player"
            data-testid="video-modal-close-btn"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] text-[#3E4642] transition-colors hover:bg-[#F3F1EA] hover:text-[#131715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col gap-4 p-5 pb-7 sm:p-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-[10px] bg-[#141816]">
            <iframe
              key={`${video.id}-${embedKey}`}
              src={embedSrc}
              title={video.title}
              data-testid="video-modal-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="block h-full w-full border-0"
            />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2
                id="video-theater-modal-title"
                className="font-serif text-[22px] sm:text-[27px] font-normal leading-[1.2] tracking-[-0.02em] text-[#131715]"
              >
                {video.title}
              </h2>
              <p className="mt-1 text-[13px] text-[#59625D] tabular-nums">
                {video.presenter} · {video.channelName}
                {pubDate ? ` · Published ${pubDate}` : ''}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onToggleSave(video)}
              aria-pressed={video.isSaved}
              aria-label={
                video.isSaved ? 'Remove video from Saved' : 'Save video'
              }
              title={video.isSaved ? 'Saved' : 'Save video'}
              data-testid="video-modal-save-btn"
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

          <p className="text-[14.5px] leading-[1.58] text-[#3E4642]">{video.takeaway}</p>

          {/* Render real jumpChips ONLY when present */}
          {video.jumpChips && video.jumpChips.length > 0 && (
            <div data-testid="video-modal-jump-chips">
              <div className="mb-1.5 text-[12px] font-semibold text-[#59625D]">
                Jump straight to a key moment
              </div>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Jump to video highlight"
              >
                {video.jumpChips.map((chip, idx) => {
                  const { timestamp, text } = splitJumpChipLabel(chip.label);
                  return (
                    <button
                      key={`${chip.seconds}-${idx}`}
                      type="button"
                      onClick={() => handleJump(chip.seconds)}
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

          {video.skimBullets.length > 0 && (
            <div>
              <button
                type="button"
                aria-expanded={skimOpen}
                data-testid="video-modal-skim-toggle"
                onClick={() => setSkimOpen((prev) => !prev)}
                className="inline-flex min-h-[44px] items-center gap-1.5 text-[13px] font-semibold text-[#143D2B] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
              >
                <span>
                  {skimOpen ? 'Hide 3-bullet skim' : 'Too busy? Read the 3-bullet skim'}
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
                  data-testid="video-modal-skim-list"
                  className="mt-1.5 flex list-none flex-col gap-2 rounded-[8px] border border-[#131715]/10 bg-white px-4 py-3 text-[13px] leading-[1.52] text-[#3E4642]"
                >
                  {video.skimBullets.map((bullet, idx) => (
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
  );
}
