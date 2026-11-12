'use client';

import * as React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AudioMemoPlayerProps {
  audioUrl?: string | null;
  audioDurationSeconds?: number | null;
  title?: string;
  isNightstandMode?: boolean;
  className?: string;
  textToSpeak?: string;
}

export function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Next-level minimalist audio player for lesson narration.
 * Features:
 * - Ultra-clean rounded capsule pill bar
 * - Glowing 8-bar audio-reactive soundwave equalizer with sculpted resting state
 * - Seamless Listen -> Pause -> Resume button lifecycle (no separate stop square)
 * - Resilient pause/resume that continues from current position without restarting
 * - Interactive -15s / +15s skipping across both native audio and Web Speech API
 * - Dynamic word-count duration calculation and speed cycling (1x, 1.25x, 1.5x)
 */
export function AudioMemoPlayer({
  audioUrl,
  audioDurationSeconds,
  title = 'Lesson Narration',
  isNightstandMode = false,
  className,
  textToSpeak,
}: AudioMemoPlayerProps) {
  // Compute duration from text word count at ~135 words per minute if not provided
  const effectiveDuration = React.useMemo(() => {
    if (audioDurationSeconds && audioDurationSeconds > 0) {
      return audioDurationSeconds;
    }
    if (textToSpeak) {
      const words = textToSpeak.split(/\s+/).filter(Boolean).length;
      if (words > 0) {
        return Math.max(30, Math.round((words / 135) * 60));
      }
    }
    return 92;
  }, [audioDurationSeconds, textToSpeak]);

  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [hasStarted, setHasStarted] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [playbackRate, setPlaybackRate] = React.useState<number>(1);
  const [audioFailed, setAudioFailed] = React.useState<boolean>(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Character offset into textToSpeak for precise pause/resume and skipping
  const charOffsetRef = React.useRef<number>(0);
  const currentTimeRef = React.useRef<number>(0);
  currentTimeRef.current = currentTime;

  const isAudioUsable = Boolean(audioUrl && !audioFailed);

  const fullText = React.useMemo(() => {
    return (
      textToSpeak ||
      `${title}. Evidence-based clinical guidance from AlongSide Pediatric Academy.`
    );
  }, [textToSpeak, title]);

  /**
   * Translates a given elapsed time (in seconds) into a clean character offset
   * aligned to the nearest word boundary so speech starts naturally.
   */
  const getCharOffsetFromTime = React.useCallback(
    (time: number): number => {
      if (!fullText || effectiveDuration <= 0) return 0;
      const ratio = Math.min(1, Math.max(0, time / effectiveDuration));
      let target = Math.round(ratio * fullText.length);
      if (target > 0 && target < fullText.length) {
        const spaceIdx = fullText.indexOf(' ', target);
        if (spaceIdx !== -1 && Math.abs(spaceIdx - target) < 25) {
          target = spaceIdx + 1;
        }
      }
      return Math.min(target, fullText.length);
    },
    [fullText, effectiveDuration]
  );

  // Cancel speech on unmount
  React.useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /**
   * Synthesizes speech starting from a specific character offset.
   */
  const speakFromOffset = React.useCallback(
    (offset: number, autoPlay: boolean = true) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();
      if (offset >= fullText.length) {
        setIsPlaying(false);
        setHasStarted(false);
        charOffsetRef.current = 0;
        setCurrentTime(0);
        return;
      }

      const sliceText = fullText.slice(offset);
      const utterance = new SpeechSynthesisUtterance(sliceText);
      utterance.rate = playbackRate;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const naturalVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Samantha') ||
              v.name.includes('Google') ||
              v.name.includes('Karen'))
        ) || voices.find((v) => v.lang.startsWith('en'));
      if (naturalVoice) utterance.voice = naturalVoice;

      utterance.onboundary = (e) => {
        if (e.charIndex != null) {
          const globalChar = offset + e.charIndex;
          charOffsetRef.current = globalChar;
          const ratio = globalChar / Math.max(1, fullText.length);
          const computedTime = Math.min(
            effectiveDuration,
            Math.round(ratio * effectiveDuration)
          );
          setCurrentTime(computedTime);
          currentTimeRef.current = computedTime;
        }
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setHasStarted(false);
        charOffsetRef.current = 0;
        setCurrentTime(0);
      };

      utterance.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          setIsPlaying(false);
        }
      };

      if (autoPlay) {
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        setHasStarted(true);
      }
    },
    [fullText, effectiveDuration, playbackRate]
  );

  // Fallback timer when audio element isn't active or has failed
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && (!isAudioUsable || !audioRef.current)) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= effectiveDuration) {
            setIsPlaying(false);
            setHasStarted(false);
            charOffsetRef.current = 0;
            return 0;
          }
          const next = Math.min(effectiveDuration, prev + 1 * playbackRate);
          currentTimeRef.current = next;
          return next;
        });

        // Chromium keep-alive guard: long utterances can stall without pause/resume ping
        if (
          typeof window !== 'undefined' &&
          'speechSynthesis' in window &&
          window.speechSynthesis.speaking &&
          !window.speechSynthesis.paused
        ) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isAudioUsable, effectiveDuration, playbackRate]);

  const togglePlay = () => {
    if (isPlaying) {
      // Pause action: pause playback without resetting position
      if (isAudioUsable && audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      charOffsetRef.current = getCharOffsetFromTime(currentTimeRef.current);
      setIsPlaying(false);
      return;
    }

    // Play or Resume action
    setHasStarted(true);

    if (isAudioUsable && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setAudioFailed(true);
          const resumeOffset = getCharOffsetFromTime(currentTimeRef.current);
          charOffsetRef.current = resumeOffset;
          speakFromOffset(resumeOffset, true);
        });
      return;
    }

    // Speech synthesis resume from exact elapsed time offset
    const resumeOffset = getCharOffsetFromTime(currentTimeRef.current);
    charOffsetRef.current = resumeOffset;
    speakFromOffset(resumeOffset, true);
  };

  const skipSeconds = (offset: number) => {
    const nextTime = Math.min(
      effectiveDuration,
      Math.max(0, currentTime + offset)
    );
    setCurrentTime(nextTime);
    currentTimeRef.current = nextTime;

    if (isAudioUsable && audioRef.current) {
      audioRef.current.currentTime = nextTime;
      return;
    }

    // Speech synthesis position skip
    const targetChar = getCharOffsetFromTime(nextTime);
    charOffsetRef.current = targetChar;

    if (isPlaying) {
      speakFromOffset(targetChar, true);
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const cycleSpeed = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
    // If speaking via speech synthesis, restart from current offset with new rate
    if (isPlaying && (!isAudioUsable || !audioRef.current)) {
      const resumeOffset = getCharOffsetFromTime(currentTimeRef.current);
      charOffsetRef.current = resumeOffset;
      speakFromOffset(resumeOffset, true);
    }
  };

  // 8-bar sound wave pattern
  const waveBars = [
    { id: 1, restHeight: 6, delay: '0.0s', dur: '0.9s' },
    { id: 2, restHeight: 10, delay: '0.15s', dur: '1.1s' },
    { id: 3, restHeight: 16, delay: '0.3s', dur: '0.85s' },
    { id: 4, restHeight: 20, delay: '0.1s', dur: '1.2s' },
    { id: 5, restHeight: 18, delay: '0.25s', dur: '0.95s' },
    { id: 6, restHeight: 13, delay: '0.4s', dur: '1.05s' },
    { id: 7, restHeight: 8, delay: '0.15s', dur: '0.8s' },
    { id: 8, restHeight: 5, delay: '0.3s', dur: '1.15s' },
  ];

  return (
    <div
      data-testid="audio-memo-player"
      className={cn(
        'inline-flex items-center gap-2 sm:gap-3 px-3.5 py-2 rounded-full border shadow-xs transition-all duration-300 w-auto',
        isNightstandMode
          ? 'bg-stone-900/95 border-stone-800 text-stone-200 shadow-amber-950/20'
          : 'bg-stone-50/95 border-stone-200/90 text-slate-800 hover:border-teal-300/80 shadow-slate-900/5',
        className
      )}
    >
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onError={() => setAudioFailed(true)}
          onTimeUpdate={() => {
            if (audioRef.current && isAudioUsable) {
              const audioCurrentTime = audioRef.current.currentTime;
              setCurrentTime(audioCurrentTime);
              currentTimeRef.current = audioCurrentTime;
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            setHasStarted(false);
            setCurrentTime(0);
          }}
          preload="metadata"
        />
      )}

      {/* Main Controls Row */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Play/Pause/Resume Button */}
        <button
          type="button"
          onClick={togglePlay}
          data-testid="audio-play-toggle"
          aria-label={
            isPlaying
              ? 'Pause narration'
              : hasStarted
                ? 'Resume narration'
                : 'Play narration'
          }
          className={cn(
            'group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-2xs transition-all duration-200 cursor-pointer active:scale-95 shrink-0',
            isNightstandMode
              ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800'
              : 'bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900'
          )}
        >
          {isPlaying ? (
            <>
              <Pause className="h-3.5 w-3.5 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
              <span>{hasStarted ? 'Resume' : 'Listen'}</span>
            </>
          )}
        </button>

        {/* 8-Bar Sound Wave Equalizer */}
        <div
          onClick={togglePlay}
          title={isPlaying ? 'Pause audio' : hasStarted ? 'Resume audio' : 'Play audio'}
          className="flex items-center gap-[3px] h-6 px-1.5 cursor-pointer shrink-0"
          aria-hidden="true"
        >
          {waveBars.map((bar) => (
            <span
              key={bar.id}
              className={cn(
                'w-[3px] rounded-full transition-all duration-200',
                isNightstandMode
                  ? 'bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-300'
                  : 'bg-gradient-to-t from-teal-700 via-teal-500 to-emerald-400',
                isPlaying &&
                  (isNightstandMode
                    ? 'shadow-[0_0_6px_rgba(251,191,36,0.6)]'
                    : 'shadow-[0_0_6px_rgba(20,184,166,0.5)]')
              )}
              style={{
                height: isPlaying ? '20px' : `${bar.restHeight}px`,
                animation: isPlaying
                  ? `soundWave ${bar.dur} ease-in-out infinite ${bar.delay}`
                  : 'none',
              }}
            />
          ))}
        </div>

        {/* Skip Back 15s */}
        <button
          type="button"
          onClick={() => skipSeconds(-15)}
          data-testid="audio-skip-back"
          title="Skip back 15 seconds"
          aria-label="Skip back 15 seconds"
          className="p-1.5 rounded-full transition-colors hover:bg-stone-200/70 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 active:scale-95 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>

        {/* Skip Forward 15s */}
        <button
          type="button"
          onClick={() => skipSeconds(15)}
          data-testid="audio-skip-forward"
          title="Skip forward 15 seconds"
          aria-label="Skip forward 15 seconds"
          className="p-1.5 rounded-full transition-colors hover:bg-stone-200/70 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 active:scale-95 cursor-pointer"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>

        {/* Digital Time Counter */}
        <div className="flex items-center gap-1 font-mono text-xs text-stone-600 dark:text-stone-400 shrink-0 px-1">
          <span className="font-semibold text-slate-900 dark:text-stone-200">
            {formatTime(currentTime)}
          </span>
          <span>/</span>
          <span>{formatTime(effectiveDuration)}</span>
        </div>

        {/* Speed Toggle */}
        <button
          type="button"
          onClick={cycleSpeed}
          data-testid="audio-speed-toggle"
          title="Toggle narration speed"
          aria-label={`Playback speed: ${playbackRate}x`}
          className={cn(
            'text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border transition-colors shrink-0 active:scale-95 cursor-pointer',
            isNightstandMode
              ? 'border-stone-700 text-amber-300 hover:bg-stone-800'
              : 'border-stone-300 bg-white text-slate-700 hover:bg-stone-100'
          )}
        >
          {playbackRate}x
        </button>
      </div>
    </div>
  );
}
