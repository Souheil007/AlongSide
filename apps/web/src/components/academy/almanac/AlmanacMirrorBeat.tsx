'use client';

import * as React from 'react';
import { ArrowDown } from 'lucide-react';
import type { AlmanacLessonPayload } from '@alongside/shared';
import { getEpisodeRoleMeta } from '@alongside/shared';
import { EditorialSpotArt } from './EditorialSpotArt';
import { cn } from '@/lib/utils';

export interface AlmanacMirrorBeatProps {
  payload: AlmanacLessonPayload;
  episodeNumber: number;
  totalEpisodes: number;
  readingMinutes: number;
  childBadge?: string | null;
  videoDurationMinutes?: number | null;
  selectedPollId: string | null;
  onSelectPoll: (pollId: string) => void;
  onJumpToVideo?: () => void;
  isNarrating: boolean;
  t: (str: string) => string;
}

/**
 * Safely renders lightweight *italic phrase* markers inside Beat 1 narrative body
 * without ever using dangerouslySetInnerHTML.
 */
function renderSceneBodyWithEmphasis(text: string): React.ReactNode {
  const tokens = text.split(/(\*[^*]+\*)/g);
  return tokens.map((token, idx) => {
    if (token.startsWith('*') && token.endsWith('*') && token.length > 2) {
      return (
        <em key={idx} className="italic text-[var(--spruce)]">
          {token.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={idx}>{token}</React.Fragment>;
  });
}

export function AlmanacMirrorBeat({
  payload,
  episodeNumber,
  totalEpisodes,
  readingMinutes,
  childBadge,
  videoDurationMinutes,
  selectedPollId,
  onSelectPoll,
  onJumpToVideo,
  isNarrating,
  t,
}: AlmanacMirrorBeatProps) {
  const roleMeta = getEpisodeRoleMeta(payload.episodeRole);
  const activePoll = payload.pollOptions.find((opt) => opt.id === selectedPollId);

  return (
    <section
      data-almanac-beat="0"
      data-testid="almanac-beat-1"
      aria-label="Beat 1: The Mirror"
      className="w-full bg-[var(--canvas)] px-4 sm:px-6 pt-8 pb-14 sm:pt-11 sm:pb-16 scroll-mt-32 transition-colors duration-200"
    >
      <div
        className={cn(
          'relative mx-auto max-w-[700px]',
          isNarrating &&
            'before:absolute before:-left-4 before:top-1 before:bottom-1 before:w-[3px] before:rounded-full before:bg-[var(--spruce)]'
        )}
      >
        {/* Quiet Editorial Metadata Line */}
        <div className="mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-[var(--mute)]">
          <span className="font-semibold text-[var(--spruce)]">
            Episode {episodeNumber} of {totalEpisodes} · {roleMeta.label}
          </span>
          {childBadge && (
            <>
              <span className="text-[var(--hairline)]" aria-hidden="true">
                ·
              </span>
              <span className="font-medium text-[var(--body)]">
                For {childBadge}
              </span>
            </>
          )}
          <span className="text-[var(--hairline)]" aria-hidden="true">
            ·
          </span>
          <span className="font-mono text-[12px] tabular-nums text-[var(--mute)]">
            {readingMinutes || 3} min read
          </span>
          {videoDurationMinutes && videoDurationMinutes > 0 && onJumpToVideo && (
            <>
              <span className="text-[var(--hairline)]" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                onClick={onJumpToVideo}
                data-testid="meta-jump-video-btn"
                className="inline-flex min-h-[32px] items-center gap-1 bg-transparent border-0 p-0 text-[12.5px] font-medium text-[var(--amber)] hover:underline cursor-pointer"
              >
                <span>{videoDurationMinutes}-min talk below</span>
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Display Headline & Deck */}
        <h1 className="font-serif-almanac text-[32px] sm:text-[42px] md:text-[46px] font-semibold leading-[1.08] tracking-[-0.025em] text-[var(--ink)] mb-4">
          {t(payload.headline)}
        </h1>

        <p className="text-[17px] sm:text-[18px] leading-[1.56] text-[var(--body)] max-w-[56ch] mb-9">
          {t(payload.deck)}
        </p>

        {/* Unboxed 2-Column Editorial Mirror + Spot Illustration */}
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-6 md:gap-9 items-center pt-2 pb-8 mb-6 border-b border-[var(--hairline-soft)]">
          <div className="order-2 md:order-1">
            <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--amber)] mb-3">
              {t(payload.sceneTime)}
            </span>
            <p className="font-serif-almanac text-[20px] sm:text-[22px] leading-[1.52] text-[var(--ink)] m-0">
              {renderSceneBodyWithEmphasis(t(payload.sceneBody))}
            </p>
          </div>

          <div className="order-1 md:order-2">
            <EditorialSpotArt
              illustration={payload.illustration}
              caption={t(payload.illustrationCaption)}
            />
          </div>
        </div>

        {/* 1-Tap Empathy Check-In Poll */}
        <div className="pt-1">
          <p className="text-[15px] font-semibold text-[var(--ink)] mb-3.5">
            {t(payload.pollQuestion)}
          </p>

          <div
            className="flex flex-wrap gap-2.5"
            role="group"
            aria-label={t(payload.pollQuestion)}
          >
            {payload.pollOptions.map((option) => {
              const isSelected = option.id === selectedPollId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelectPoll(option.id)}
                  aria-pressed={isSelected}
                  data-testid={`poll-option-${option.id}`}
                  className={cn(
                    'min-h-[44px] rounded-full border px-[18px] py-2.5 text-[14px] font-medium transition-all duration-150 cursor-pointer',
                    isSelected
                      ? 'border-[var(--spruce)] bg-[var(--spruce)] text-[var(--elevated)] shadow-xs'
                      : 'border-[var(--hairline)] bg-[var(--elevated)] text-[var(--ink)] hover:border-[var(--spruce)] hover:-translate-y-px'
                  )}
                >
                  {t(option.label)}
                </button>
              );
            })}
          </div>

          {activePoll && (
            <div
              key={activePoll.id}
              data-testid="poll-response-box"
              className="mt-4 rounded-[12px] bg-[var(--spruce-soft)] px-5 py-4 text-[15px] leading-[1.62] text-[var(--ink)] almanac-rise-in"
            >
              {t(activePoll.response)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
