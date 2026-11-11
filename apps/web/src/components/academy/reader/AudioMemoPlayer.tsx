'use client';

import * as React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  Headphones,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
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
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function AudioMemoPlayer({
  audioUrl,
  audioDurationSeconds = 92,
  title = '90s Clinician Voice Briefing',
  isNightstandMode = false,
  className,
  textToSpeak,
}: AudioMemoPlayerProps) {
  const effectiveDuration = audioDurationSeconds || 92;
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [playbackRate, setPlaybackRate] = React.useState<number>(1);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // SpeechSynthesis and fallback timer simulation when audio fails or is simulated
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && (!audioUrl || !audioRef.current)) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= effectiveDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1 * playbackRate;
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
        `${title}. Evidence-based clinical guidance from AlongSide Pediatric Academy. Remember: your calm regulated presence is the single most powerful medicine your child will ever receive.`;
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
              v.name.includes('Google'))
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

    // Attempt audio tag play first
    if (audioRef.current && audioUrl) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Audio file failed to play (e.g. offline or unhosted asset), fallback to speech synthesis
          setIsPlaying(true);
          speakFallback();
        });
    } else {
      setIsPlaying(true);
      speakFallback();
    }
  };

  const skipSeconds = (offset: number) => {
    if (audioRef.current && audioUrl) {
      const nextTime = Math.min(
        effectiveDuration,
        Math.max(0, audioRef.current.currentTime + offset)
      );
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    } else {
      setCurrentTime((prev) =>
        Math.min(effectiveDuration, Math.max(0, prev + offset))
      );
    }
  };

  const cycleSpeed = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
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
        'rounded-xl border p-3.5 sm:p-4 transition-colors space-y-3',
        isNightstandMode
          ? 'bg-stone-900/90 border-stone-800 text-stone-200'
          : 'bg-emerald-50/50 border-emerald-200/80 text-slate-800',
        className
      )}
    >
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          preload="metadata"
        />
      )}

      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-medium">
          <span
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full',
              isNightstandMode
                ? 'bg-amber-950 text-amber-300'
                : 'bg-emerald-600 text-white shadow-xs'
            )}
          >
            <Headphones className="h-3.5 w-3.5" />
          </span>
          <span className="font-semibold">{title}</span>
          <span
            className={cn(
              'text-[10px] px-1.5 py-0.5 rounded font-mono',
              isNightstandMode
                ? 'bg-stone-800 text-amber-200/80'
                : 'bg-emerald-100 text-emerald-800'
            )}
          >
            Hands-Free
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
          <Volume2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(effectiveDuration)}</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="space-y-1">
        <input
          type="range"
          min={0}
          max={effectiveDuration}
          step={0.5}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Seek audio memo position"
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none"
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex items-center gap-2">
          {/* Play/Pause Button */}
          <Button
            type="button"
            size="sm"
            onClick={togglePlay}
            data-testid="audio-play-toggle"
            aria-label={isPlaying ? 'Pause voice briefing' : 'Play voice briefing'}
            className={cn(
              'gap-1.5 font-semibold text-xs h-8 px-3 rounded-lg shadow-xs transition-colors',
              isNightstandMode
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            )}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Listen ({formatTime(effectiveDuration)})</span>
              </>
            )}
          </Button>

          {/* Skip Back 15s */}
          <button
            type="button"
            onClick={() => skipSeconds(-15)}
            data-testid="audio-skip-back"
            title="Skip back 15 seconds"
            aria-label="Skip back 15 seconds"
            className={cn(
              'p-1.5 rounded-lg border transition-colors hover:bg-slate-100',
              isNightstandMode
                ? 'border-stone-700 text-stone-300 hover:bg-stone-800'
                : 'border-slate-200 text-slate-600 bg-white'
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
              'p-1.5 rounded-lg border transition-colors hover:bg-slate-100',
              isNightstandMode
                ? 'border-stone-700 text-stone-300 hover:bg-stone-800'
                : 'border-slate-200 text-slate-600 bg-white'
            )}
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Speed Toggle */}
        <button
          type="button"
          onClick={cycleSpeed}
          data-testid="audio-speed-toggle"
          title="Toggle playback speed"
          aria-label={`Playback speed: ${playbackRate}x`}
          className={cn(
            'text-[11px] font-bold font-mono px-2 py-1 rounded border transition-colors',
            isNightstandMode
              ? 'border-stone-700 text-amber-200/90 hover:bg-stone-800'
              : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
          )}
        >
          {playbackRate}x
        </button>
      </div>
    </div>
  );
}
