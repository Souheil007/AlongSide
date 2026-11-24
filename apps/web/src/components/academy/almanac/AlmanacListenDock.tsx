'use client';

import * as React from 'react';
import {
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
} from 'lucide-react';
import { BEAT_CHAPTER_LABELS } from '@/hooks/useAlmanacLessonState';
import type { NarrationBeatRange, VoicePersona } from '@/lib/audio/narratorEngine';
import { cn } from '@/lib/utils';
import { AlmanacVoiceRibbon } from './AlmanacVoiceRibbon';

export interface AlmanacListenDockProps {
  visible: boolean;
  isPlaying: boolean;
  hasStartedAudio?: boolean;
  playbackSpeed: 1 | 1.25 | 1.5;
  audioSeconds: number;
  totalAudioSeconds: number;
  speakingBeat: number | null;
  beatRanges?: NarrationBeatRange[];
  audioUrl?: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onAudioError: () => void;
  onTogglePlay: () => void;
  onSkipSeconds?: (deltaSeconds: number) => void;
  onSeekToSeconds?: (targetSeconds: number) => void;
  onCycleSpeed: () => void;
  voicePersona?: VoicePersona;
  onSetVoicePersona?: (persona: VoicePersona) => void;
  onCycleVoicePersona?: () => void;
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
  hasStartedAudio = false,
  playbackSpeed,
  audioSeconds,
  totalAudioSeconds,
  speakingBeat,
  beatRanges = [],
  onTogglePlay,
  onSkipSeconds,
  onSeekToSeconds,
  onCycleSpeed,
  voicePersona = 'clear',
  onSetVoicePersona,
  onCycleVoicePersona,
}: AlmanacListenDockProps) {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const [isPinned, setIsPinned] = React.useState(false);

  React.useEffect(() => {
    if (!visible) {
      setIsPinned(false);
      return;
    }
    const sentinel = sentinelRef.current;
    if (
      !sentinel ||
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setIsPinned(!entry.isIntersecting && entry.boundingClientRect.top < 123);
      },
      { rootMargin: '-123px 0px 0px 0px', threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visible]);

  if (!visible) return null;

  const safeTotal = Math.max(1, totalAudioSeconds);
  const clampedSeconds = Math.min(safeTotal, Math.max(0, audioSeconds));
  const progressPercent = Math.min(100, Math.max(0, (clampedSeconds / safeTotal) * 100));
  const isPausedMidway = !isPlaying && hasStartedAudio && clampedSeconds > 0;
  const activeBeatIndex = speakingBeat ?? 0;
  const activeBeatLabel = BEAT_CHAPTER_LABELS[activeBeatIndex] ?? 'The Mirror';

  const statusText = isPlaying
    ? `Now reading: 0${activeBeatIndex + 1} ${activeBeatLabel}`
    : isPausedMidway
      ? `Paused on 0${activeBeatIndex + 1} ${activeBeatLabel} · Press play to resume`
      : `Ready to listen · ${formatAudioTime(totalAudioSeconds)} audio briefing`;

  const playButtonAriaLabel = isPlaying
    ? 'Pause narrated lesson'
    : isPausedMidway
      ? 'Resume narrated lesson'
      : 'Play narrated lesson';

  const handleTrackPointerSeek = (clientX: number) => {
    if (!onSeekToSeconds || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    onSeekToSeconds(ratio * safeTotal);
  };

  const handleSliderKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onSeekToSeconds && !onSkipSeconds) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (onSkipSeconds) onSkipSeconds(-10);
      else onSeekToSeconds?.(Math.max(0, clampedSeconds - 10));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (onSkipSeconds) onSkipSeconds(10);
      else onSeekToSeconds?.(Math.min(safeTotal, clampedSeconds + 10));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onSeekToSeconds?.(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      onSeekToSeconds?.(safeTotal);
    }
  };

  const handleVoiceSelect = (target: VoicePersona) => {
    if (onSetVoicePersona) {
      if (target !== voicePersona) {
        onSetVoicePersona(target);
      }
      return;
    }
    if (onCycleVoicePersona && target !== voicePersona) {
      onCycleVoicePersona();
    }
  };

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none h-px w-full"
      />
      <div
        data-testid="almanac-listen-dock"
        data-pinned={isPinned ? 'true' : 'false'}
        aria-live="polite"
        className="mx-auto max-w-[740px] px-4 sm:px-6 pt-5 md:sticky md:top-[122px] md:z-20 almanac-rise-in"
      >
        <div
          data-playing={isPlaying ? 'true' : 'false'}
          className={cn(
            'relative overflow-hidden rounded-[20px] border bg-[var(--elevated)] px-4 py-4 sm:px-6 sm:py-5 transition-all duration-300',
            isPlaying
              ? 'border-[var(--spruce)] shadow-[0_14px_34px_-12px_rgba(20,61,43,0.18)]'
              : 'border-[var(--spruce-border)] shadow-[0_8px_24px_-10px_rgba(17,20,19,0.09)]',
            isPinned && 'almanac-dock-glass'
          )}
        >
        {/* Subtle living top resonance band when active */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-[3px] transition-opacity duration-300',
            isPlaying
              ? 'bg-[var(--spruce)] opacity-100'
              : isPausedMidway
                ? 'bg-[var(--amber)] opacity-75'
                : 'bg-[var(--spruce-border)] opacity-45'
          )}
        />

        {/* Row 1: Transport Controls + Editorial Status + Sculpted Living Waveform */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left: -10s / Living Play-Pause-Resume Orb / +10s + Title */}
          <div className="flex min-w-0 flex-1 items-center gap-3.5 sm:gap-4">
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => onSkipSeconds?.(-10)}
                aria-label="Rewind 10 seconds"
                title="Rewind 10 seconds"
                data-testid="almanac-listen-back-10-btn"
                className="group relative inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--canvas-subtle)] text-[var(--ink)] transition-all hover:border-[var(--spruce-border)] hover:bg-[var(--spruce-soft)] hover:text-[var(--spruce)] active:scale-95 cursor-pointer"
              >
                <RotateCcw className="h-[17px] w-[17px]" aria-hidden="true" />
                <span className="absolute -bottom-0.5 right-0.5 rounded-full bg-[var(--elevated)] px-1 font-mono text-[9px] font-bold leading-tight text-[var(--spruce)]">
                  10
                </span>
              </button>

              <div className="relative flex items-center justify-center">
                {isPlaying && (
                  <span
                    aria-hidden="true"
                    className="almanac-breath-halo pointer-events-none absolute inset-0 rounded-full bg-[var(--spruce)]"
                  />
                )}
                <button
                  type="button"
                  onClick={onTogglePlay}
                  aria-label={playButtonAriaLabel}
                  title={playButtonAriaLabel}
                  data-testid="almanac-listen-play-btn"
                  className={cn(
                    'relative z-10 inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full text-[var(--elevated)] transition-all duration-200 active:scale-95 cursor-pointer',
                    isPlaying
                      ? 'bg-[var(--spruce)] shadow-[0_6px_18px_-4px_rgba(20,61,43,0.45)] hover:bg-[var(--spruce-hover)]'
                      : 'bg-[var(--spruce)] shadow-sm hover:bg-[var(--spruce-hover)] hover:scale-[1.04]'
                  )}
                >
                  {isPlaying ? (
                    <Pause className="h-[18px] w-[18px] fill-current" aria-hidden="true" />
                  ) : (
                    <Play className="h-[18px] w-[18px] fill-current ml-0.5" aria-hidden="true" />
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => onSkipSeconds?.(10)}
                aria-label="Forward 10 seconds"
                title="Forward 10 seconds"
                data-testid="almanac-listen-forward-10-btn"
                className="group relative inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--canvas-subtle)] text-[var(--ink)] transition-all hover:border-[var(--spruce-border)] hover:bg-[var(--spruce-soft)] hover:text-[var(--spruce)] active:scale-95 cursor-pointer"
              >
                <RotateCw className="h-[17px] w-[17px]" aria-hidden="true" />
                <span className="absolute -bottom-0.5 right-0.5 rounded-full bg-[var(--elevated)] px-1 font-mono text-[9px] font-bold leading-tight text-[var(--spruce)]">
                  10
                </span>
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif-almanac text-[16px] font-semibold leading-tight text-[var(--ink)]">
                  Audio Companion
                </span>
                <span
                  data-testid="almanac-listen-state-pill"
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                    isPlaying
                      ? 'bg-[var(--spruce-soft)] text-[var(--spruce)]'
                      : isPausedMidway
                        ? 'bg-[var(--amber-soft)] text-[var(--amber)]'
                        : 'bg-[var(--canvas-subtle)] text-[var(--mute)]'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-[6px] w-[6px] rounded-full',
                      isPlaying
                        ? 'bg-[var(--spruce)] almanac-live-dot'
                        : isPausedMidway
                          ? 'bg-[var(--amber)]'
                          : 'bg-[var(--mute)]'
                    )}
                  />
                  <span>
                    {isPlaying ? 'Playing' : isPausedMidway ? 'Paused' : 'Ready'}
                  </span>
                </span>
              </div>
              <p className="mt-0.5 truncate text-[12.5px] text-[var(--body)] m-0">
                {statusText}
              </p>
            </div>
          </div>

          {/* Right: Flowing Multi-Harmonic Voice Ribbon */}
          <AlmanacVoiceRibbon
            isPlaying={isPlaying}
            isPausedMidway={isPausedMidway}
            voicePersona={voicePersona}
            playbackSpeed={playbackSpeed}
            ariaLabel={playButtonAriaLabel}
            onTogglePlay={onTogglePlay}
          />
        </div>

        {/* Row 2: Interactive Chapter-Marked Scrubber Rail */}
        <div className="mt-4">
          <div
            ref={trackRef}
            role="slider"
            tabIndex={0}
            aria-label="Audio playback timeline"
            aria-valuemin={0}
            aria-valuemax={Math.round(safeTotal)}
            aria-valuenow={Math.round(clampedSeconds)}
            aria-valuetext={`${formatAudioTime(clampedSeconds)} of ${formatAudioTime(totalAudioSeconds)}`}
            data-testid="almanac-listen-scrubber"
            onClick={(e) => handleTrackPointerSeek(e.clientX)}
            onKeyDown={handleSliderKeyDown}
            className="group relative flex h-[22px] w-full items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)] rounded-full"
          >
            {/* Track background */}
            <div className="relative h-[6px] w-full overflow-visible rounded-full bg-[var(--band-sand)]">
              {/* Active fill */}
              <div
                className="h-full rounded-full bg-[var(--spruce)] transition-[width] duration-150 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />

              {/* Subtle Chapter Beat Markers */}
              {beatRanges.slice(1).map((beat) => {
                const pct = Math.min(
                  98,
                  Math.max(2, (beat.startSeconds / safeTotal) * 100)
                );
                const passed = clampedSeconds >= beat.startSeconds;
                return (
                  <span
                    key={beat.beatIndex}
                    aria-hidden="true"
                    title={`0${beat.beatIndex + 1} ${BEAT_CHAPTER_LABELS[beat.beatIndex] ?? ''}`}
                    style={{ left: `${pct}%` }}
                    className={cn(
                      'pointer-events-none absolute top-1/2 h-[6px] w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors',
                      passed ? 'bg-[var(--elevated)]/80' : 'bg-[var(--mute)]/45'
                    )}
                  />
                );
              })}

              {/* Playhead Thumb */}
              <span
                aria-hidden="true"
                style={{ left: `${progressPercent}%` }}
                className={cn(
                  'pointer-events-none absolute top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--elevated)] bg-[var(--spruce)] shadow-sm transition-transform duration-150',
                  isPlaying || isPausedMidway
                    ? 'scale-100 group-hover:scale-125'
                    : 'scale-90 group-hover:scale-115'
                )}
              />
            </div>
          </div>

          {/* Row 3: Real Timestamps + Voice Persona Switch (Clear Default | Warm) + Speed */}
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2.5">
            <span
              data-testid="almanac-listen-time"
              className="font-mono text-[12px] font-medium text-[var(--mute)] tabular-nums"
            >
              <span className="font-semibold text-[var(--ink)]">
                {formatAudioTime(clampedSeconds)}
              </span>{' '}
              / {formatAudioTime(totalAudioSeconds)}
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {/* Voice Persona Segmented Pill: Clear (Male default) | Warm (Female) */}
              {(onSetVoicePersona || onCycleVoicePersona) && (
                <div
                  role="group"
                  aria-label="Narrator voice"
                  data-testid="almanac-listen-voice-btn"
                  className="inline-flex items-center gap-0.5 rounded-full border border-[var(--hairline)] bg-[var(--canvas-subtle)] p-[2px]"
                >
                  <Volume2
                    className="ml-2 mr-1 h-3 w-3 text-[var(--spruce)] shrink-0"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => handleVoiceSelect('clear')}
                    aria-pressed={voicePersona === 'clear'}
                    data-testid="almanac-voice-clear-btn"
                    className={cn(
                      'min-h-[30px] rounded-full px-2.5 text-[11.5px] font-semibold transition-all cursor-pointer',
                      voicePersona === 'clear'
                        ? 'bg-[var(--spruce)] text-[var(--elevated)] shadow-2xs'
                        : 'text-[var(--body)] hover:text-[var(--ink)]'
                    )}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVoiceSelect('warm')}
                    aria-pressed={voicePersona === 'warm'}
                    data-testid="almanac-voice-warm-btn"
                    className={cn(
                      'min-h-[30px] rounded-full px-2.5 text-[11.5px] font-semibold transition-all cursor-pointer',
                      voicePersona === 'warm'
                        ? 'bg-[var(--spruce)] text-[var(--elevated)] shadow-2xs'
                        : 'text-[var(--body)] hover:text-[var(--ink)]'
                    )}
                  >
                    Warm
                  </button>
                </div>
              )}

              {/* Playback Speed Toggle */}
              <button
                type="button"
                onClick={onCycleSpeed}
                aria-label={`Playback speed ${playbackSpeed}x`}
                data-testid="almanac-listen-speed-btn"
                className="min-h-[34px] rounded-full border border-[var(--hairline)] bg-[var(--canvas-subtle)] px-3 font-mono text-[11.5px] font-semibold text-[var(--ink)] tabular-nums transition-colors hover:border-[var(--spruce-border)] hover:bg-[var(--spruce-soft)] hover:text-[var(--spruce)] cursor-pointer"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
