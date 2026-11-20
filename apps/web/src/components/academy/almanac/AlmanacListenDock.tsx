'use client';

import * as React from 'react';
import { Pause, Play } from 'lucide-react';
import { BEAT_CHAPTER_LABELS } from '@/hooks/useAlmanacLessonState';
import { cn } from '@/lib/utils';

export interface AlmanacListenDockProps {
  visible: boolean;
  isPlaying: boolean;
  playbackSpeed: 1 | 1.25 | 1.5;
  audioSeconds: number;
  totalAudioSeconds: number;
  speakingBeat: number | null;
  audioUrl?: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onAudioError: () => void;
  onTogglePlay: () => void;
  onCycleSpeed: () => void;
}

function formatAudioTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function AlmanacListenDock({
  visible,
  isPlaying,
  playbackSpeed,
  audioSeconds,
  totalAudioSeconds,
  speakingBeat,
  audioUrl,
  audioRef,
  onAudioError,
  onTogglePlay,
  onCycleSpeed,
}: AlmanacListenDockProps) {
  if (!visible) return null;

  const beatStatus =
    isPlaying && speakingBeat !== null
      ? `Now reading: 0${speakingBeat + 1} ${BEAT_CHAPTER_LABELS[speakingBeat] ?? ''}`
      : 'Ready — follows each chapter as you relax';

  return (
    <div
      data-testid="almanac-listen-dock"
      aria-live="polite"
      className="mx-auto max-w-[720px] px-4 sm:px-6 pt-5 almanac-rise-in"
    >
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="none"
          onError={onAudioError}
          className="hidden"
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3.5 rounded-[14px] border border-[var(--spruce-border)] bg-[var(--elevated)] px-4 py-3.5 sm:px-5 shadow-sm">
        <div className="flex min-w-0 items-center gap-3.5">
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause narrated lesson' : 'Play narrated lesson'}
            data-testid="almanac-listen-play-btn"
            className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[var(--spruce)] text-[var(--elevated)] transition-transform hover:bg-[var(--spruce-hover)] hover:scale-[1.03] cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4 fill-current ml-0.5" aria-hidden="true" />
            )}
          </button>

          <div className="min-w-0">
            <span className="block text-[13px] font-semibold text-[var(--ink)]">
              Narrated Companion · {formatAudioTime(totalAudioSeconds)} listen
            </span>
            <span className="block truncate text-[12px] text-[var(--mute)]">
              {beatStatus}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* 6-bar subtle waveform */}
          <div className="flex h-[20px] items-center gap-[3px] px-1" aria-hidden="true">
            {[0, 140, 280, 80, 220, 350].map((delayMs, idx) => (
              <span
                key={idx}
                style={
                  isPlaying
                    ? {
                        animation: 'soundWave 0.95s ease-in-out infinite',
                        animationDelay: `${delayMs}ms`,
                      }
                    : undefined
                }
                className={cn(
                  'w-[3px] rounded-full bg-[var(--spruce)] transition-opacity',
                  isPlaying ? 'h-[14px] opacity-100' : 'h-[6px] opacity-40'
                )}
              />
            ))}
          </div>

          <span className="font-mono text-[12px] text-[var(--mute)] tabular-nums">
            {formatAudioTime(audioSeconds)} / {formatAudioTime(totalAudioSeconds)}
          </span>

          <button
            type="button"
            onClick={onCycleSpeed}
            aria-label={`Playback speed ${playbackSpeed}x`}
            data-testid="almanac-listen-speed-btn"
            className="min-h-[36px] rounded-full border border-[var(--hairline)] bg-[var(--canvas-subtle)] px-3 font-mono text-[11px] font-semibold text-[var(--ink)] transition-colors hover:border-[var(--spruce-border)] cursor-pointer"
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>
    </div>
  );
}
