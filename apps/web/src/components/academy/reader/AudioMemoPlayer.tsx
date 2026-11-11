'use client';

import * as React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Square,
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
 * - Real pause/resume behavior without restarting from the beginning
 * - Real -15s / +15s skipping in speech synthesis and audio
 * - Dynamic word-count duration calculation
 * - Stop/reset control and speed toggling (1x, 1.25x, 1.5x)
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
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [playbackRate, setPlaybackRate] = React.useState<number>(1);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Character offset into textToSpeak for precise pause/resume and skipping
  const charOffsetRef = React.useRef<number>(0);
  const isPausedRef = React.useRef<boolean>(false);

  const fullText = React.useMemo(() => {
    return (
      textToSpeak ||
      `${title}. Evidence-based clinical guidance from AlongSide Pediatric Academy.`
    );
  }, [textToSpeak, title]);

  // Fallback timer when audio element isn't active
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && (!audioUrl || !audioRef.current)) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= effectiveDuration) {
            setIsPlaying(false);
            isPausedRef.current = false;
            charOffsetRef.current = 0;
            return 0;
          }
          return Math.min(effectiveDuration, prev + 1 * playbackRate);
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, audioUrl, effectiveDuration, playbackRate]);

  // Cancel speech on unmount
  React.useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakFromOffset = (offset: number, autoPlay: boolean = true) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (offset >= fullText.length) {
      setIsPlaying(false);
      isPausedRef.current = false;
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
        setCurrentTime(Math.min(effectiveDuration, Math.round(ratio * effectiveDuration)));
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      isPausedRef.current = false;
      charOffsetRef.current = 0;
      setCurrentTime(0);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        setIsPlaying(false);
        isPausedRef.current = false;
      }
    };

    if (autoPlay) {
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      isPausedRef.current = false;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      // Pause action
      if (audioRef.current && audioUrl) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
      isPausedRef.current = true;
      return;
    }

    // Play/Resume action
    if (audioRef.current && audioUrl) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          isPausedRef.current = false;
        })
        .catch(() => {
          setIsPlaying(true);
          speakFromOffset(charOffsetRef.current, true);
        });
      return;
    }

    // Speech synthesis resume / start
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPausedRef.current && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        isPausedRef.current = false;

        // Fallback guard: Chromium pause bug check
        setTimeout(() => {
          if (!window.speechSynthesis.speaking) {
            speakFromOffset(charOffsetRef.current, true);
          }
        }, 180);
      } else {
        speakFromOffset(charOffsetRef.current, true);
      }
    } else {
      setIsPlaying(true);
      isPausedRef.current = false;
    }
  };

  const stopAudio = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    charOffsetRef.current = 0;
    isPausedRef.current = false;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const skipSeconds = (offset: number) => {
    const nextTime = Math.min(
      effectiveDuration,
      Math.max(0, currentTime + offset)
    );
    setCurrentTime(nextTime);

    if (audioRef.current && audioUrl) {
      audioRef.current.currentTime = nextTime;
      return;
    }

    // Speech synthesis position skip
    const ratio = effectiveDuration > 0 ? nextTime / effectiveDuration : 0;
    let targetChar = Math.round(ratio * fullText.length);
    // Align with word boundary for natural speech start
    const spaceIdx = fullText.indexOf(' ', targetChar);
    if (spaceIdx !== -1 && Math.abs(spaceIdx - targetChar) < 25) {
      targetChar = spaceIdx + 1;
    }
    charOffsetRef.current = targetChar;

    if (isPlaying) {
      speakFromOffset(targetChar, true);
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      isPausedRef.current = true;
    }
  };

  const cycleSpeed = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
    // If speaking, restart from current offset with new rate
    if (isPlaying && (!audioUrl || !audioRef.current)) {
      speakFromOffset(charOffsetRef.current, true);
    }
  };

  // Next-level 8-bar sound wave pattern
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
          onTimeUpdate={() => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
          }}
          onEnded={() => {
            setIsPlaying(false);
            isPausedRef.current = false;
            setCurrentTime(0);
          }}
          preload="metadata"
        />
      )}

      {/* Main Controls Row */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          data-testid="audio-play-toggle"
          aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
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
              <span>{currentTime > 0 ? 'Resume' : 'Listen'}</span>
            </>
          )}
        </button>

        {/* Next-Level 8-Bar Sound Wave Equalizer */}
        <div
          onClick={togglePlay}
          title={isPlaying ? 'Pause audio' : 'Play audio'}
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
                isPlaying && (isNightstandMode ? 'shadow-[0_0_6px_rgba(251,191,36,0.6)]' : 'shadow-[0_0_6px_rgba(20,184,166,0.5)]')
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
          className="p-1.5 rounded-full transition-colors hover:bg-stone-200/70 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 active:scale-95"
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
          className="p-1.5 rounded-full transition-colors hover:bg-stone-200/70 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 active:scale-95"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>

        {/* Stop / Reset Button */}
        {(isPlaying || currentTime > 0) && (
          <button
            type="button"
            onClick={stopAudio}
            title="Stop narration"
            aria-label="Stop narration"
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors active:scale-95"
          >
            <Square className="h-3 w-3 fill-current" />
          </button>
        )}

        {/* Minimalist Digital Time Counter */}
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
            'text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border transition-colors shrink-0 active:scale-95',
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
