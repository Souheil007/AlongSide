'use client';

import * as React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Square,
  Sparkles,
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
 * Minimalist, dynamic wave audio player for lesson narration.
 * Features:
 * - Ultra-clean rounded-full pill bar
 * - Rhythmically undulating soundwave animation while speaking
 * - Precise sequential text narration via Web Speech API
 * - Minimalist stop/start, skip back (-15s), skip forward (+15s), and speed controls
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

  // Progressive timer fallback for simulated / synthesis playback
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && (!audioUrl || !audioRef.current)) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= effectiveDuration) {
            setIsPlaying(false);
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

  const speakFallback = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const narrationText =
        textToSpeak ||
        `${title}. Evidence-based clinical guidance from AlongSide Pediatric Academy.`;
      const utterance = new SpeechSynthesisUtterance(narrationText);
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
        if (e.charIndex) {
          const ratio = e.charIndex / Math.max(1, narrationText.length);
          setCurrentTime(Math.min(effectiveDuration, Math.round(ratio * effectiveDuration)));
        }
      };
      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current && audioUrl) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
      return;
    }

    // Play native audio tag if valid asset
    if (audioRef.current && audioUrl) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(true);
          speakFallback();
        });
    } else {
      setIsPlaying(true);
      speakFallback();
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
    }
  };

  const cycleSpeed = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current && audioUrl) {
      audioRef.current.currentTime = val;
    }
  };

  return (
    <div
      data-testid="audio-memo-player"
      className={cn(
        'inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2 sm:px-4 sm:py-2.5 rounded-2xl border shadow-xs transition-all duration-300 w-full sm:w-auto',
        isNightstandMode
          ? 'bg-stone-900 border-stone-800 text-stone-200'
          : 'bg-stone-50/90 border-stone-200/90 text-slate-800 hover:border-teal-300/80',
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
            setCurrentTime(0);
          }}
          preload="metadata"
        />
      )}

      {/* Main Controls Row */}
      <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 flex-wrap">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          data-testid="audio-play-toggle"
          aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
          className={cn(
            'group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white shadow-2xs transition-all duration-200 cursor-pointer active:scale-95 shrink-0',
            isNightstandMode
              ? 'bg-amber-600 hover:bg-amber-700'
              : 'bg-teal-700 hover:bg-teal-800'
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
              <span>Listen</span>
            </>
          )}
        </button>

        {/* Animated Dynamic Sound Wave */}
        <div
          onClick={togglePlay}
          title={isPlaying ? 'Pause audio' : 'Play audio'}
          className="flex items-center gap-[3px] h-6 px-1.5 cursor-pointer shrink-0"
          aria-hidden="true"
        >
          {[
            { id: 1, delay: '0s', dur: '0.9s' },
            { id: 2, delay: '0.15s', dur: '1.2s' },
            { id: 3, delay: '0.3s', dur: '0.8s' },
            { id: 4, delay: '0.1s', dur: '1.1s' },
            { id: 5, delay: '0.25s', dur: '1.0s' },
          ].map((bar) => (
            <span
              key={bar.id}
              className={cn(
                'w-[3px] rounded-full transition-all duration-200',
                isNightstandMode ? 'bg-amber-400' : 'bg-teal-600 dark:bg-teal-400'
              )}
              style={{
                height: isPlaying ? '18px' : '4px',
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
          className={cn(
            'p-1.5 rounded-full transition-colors hover:bg-stone-200/70 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
          )}
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
          className={cn(
            'p-1.5 rounded-full transition-colors hover:bg-stone-200/70 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
          )}
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>

        {/* Stop / Reset Button */}
        {isPlaying && (
          <button
            type="button"
            onClick={stopAudio}
            title="Stop narration"
            aria-label="Stop narration"
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
          >
            <Square className="h-3 w-3 fill-current" />
          </button>
        )}

        {/* Minimalist Time Counter */}
        <div className="flex items-center gap-1 font-mono text-xs text-stone-600 dark:text-stone-400 shrink-0">
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
            'text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border transition-colors shrink-0',
            isNightstandMode
              ? 'border-stone-700 text-amber-300 hover:bg-stone-800'
              : 'border-stone-300 bg-white text-slate-700 hover:bg-stone-100'
          )}
        >
          {playbackRate}x
        </button>

        {/* Hands-Free Quiet Pill Badge */}
        <span
          className={cn(
            'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block shrink-0',
            isNightstandMode
              ? 'bg-stone-800 text-amber-300/90'
              : 'bg-teal-100/80 text-teal-900'
          )}
        >
          Hands-Free
        </span>
      </div>

      {/* Mini Scrubber Track */}
      <div className="w-full sm:w-28 sm:ml-auto">
        <input
          type="range"
          min={0}
          max={effectiveDuration}
          step={0.5}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Seek lesson audio narration"
          className="w-full h-1 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-teal-700 dark:accent-amber-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
