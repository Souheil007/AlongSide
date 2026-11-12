'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Play,
  GraduationCap,
  ChevronDown,
  MessageSquare,
  Sparkles,
  Video,
} from 'lucide-react';
import type { MasterVideoLectureDTO } from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface LessonVideoPlayerProps {
  video?: MasterVideoLectureDTO | null;
  isNightstandMode?: boolean;
  className?: string;
}

/**
 * Extracts standard 11-character YouTube video ID from various URL patterns.
 */
export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i
  );
  return match && match[1] ? match[1] : null;
}

export function LessonVideoPlayer({
  video,
  isNightstandMode = false,
  className,
}: LessonVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isTakeawaysOpen, setIsTakeawaysOpen] = React.useState<boolean>(false);

  if (!video || !video.videoUrl) {
    return null;
  }

  const videoId = extractYouTubeId(video.videoUrl);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <section
      data-testid="lesson-video-player"
      aria-label={`Master Video Lecture: ${video.title}`}
      className={cn('space-y-4 my-6', className)}
    >
      {/* 1. Responsive 16:9 Aspect Ratio Video Container */}
      <div
        className="aspect-video w-full rounded-2xl overflow-hidden border border-[#EBE7DF] bg-stone-900 shadow-sm relative group"
        data-testid="video-container"
      >
        {isPlaying && videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
            className="w-full h-full border-0"
            data-testid="youtube-iframe"
          />
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsPlaying(true);
              }
            }}
            className="w-full h-full relative cursor-pointer flex flex-col justify-between p-4 sm:p-6 select-none"
            data-testid="video-poster"
            aria-label={`Play lecture: ${video.title}`}
          >
            {/* Background Thumbnail Image with Fallback */}
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              />
            )}

            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/20" />

            {/* Top Bar: Master Lecture Tag + Presenter & Channel Badge */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 backdrop-blur-xs px-2.5 py-1 text-xs font-bold text-stone-950 shadow-xs">
                <Video className="h-3.5 w-3.5" />
                <span>Master Lecture</span>
              </span>

              <span
                data-testid="presenter-badge"
                className="inline-flex items-center gap-1.5 rounded-full bg-stone-900/85 backdrop-blur-xs border border-white/10 px-3 py-1 text-xs font-medium text-stone-200"
              >
                <span>{video.presenter}</span>
                <span className="text-stone-400">•</span>
                <span>{video.channel}</span>
                <span className="text-stone-400">•</span>
                <span className="font-semibold">{video.durationMinutes} min</span>
              </span>
            </div>

            {/* Center Play Button */}
            <div className="relative z-10 flex items-center justify-center my-auto">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/95 text-stone-900 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-200">
                <Play className="h-6 w-6 sm:h-7 sm:w-7 fill-current ml-1 text-teal-800" />
              </div>
            </div>

            {/* Bottom Title Bar */}
            <div className="relative z-10 space-y-1">
              <h3 className="text-white font-bold text-base sm:text-lg leading-snug line-clamp-2 drop-shadow-xs">
                {video.title}
              </h3>
              <p className="text-xs text-stone-300 font-medium hidden sm:block">
                Click to watch this talk
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Provocative Parent Hook Callout Strip directly beneath the video */}
      {video.parentHook && (
        <div
          data-testid="video-parent-hook"
          className={cn(
            'rounded-xl border p-4 text-xs sm:text-sm leading-relaxed transition-colors flex items-start gap-3',
            isNightstandMode
              ? 'bg-amber-950/25 border-amber-900/40 text-amber-200'
              : 'bg-amber-50/70 border-amber-200/80 text-amber-950'
          )}
        >
          <span className="text-base select-none shrink-0 mt-0.5" aria-hidden="true">
            💡
          </span>
          <div className="space-y-0.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-amber-700 dark:text-amber-400 block">
              Why This Talk Matters
            </span>
            <p className="font-serif italic text-sm sm:text-base leading-relaxed">
              &ldquo;{video.parentHook}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* 3. Expandable Key Takeaways Drawer */}
      {video.keyTakeaways && video.keyTakeaways.length > 0 && (
        <div
          data-testid="video-takeaways-drawer"
          className={cn(
            'rounded-xl border overflow-hidden shadow-2xs transition-colors',
            isNightstandMode
              ? 'bg-stone-900 border-stone-800 text-stone-200'
              : 'bg-white border-slate-200/90 text-slate-800'
          )}
        >
          <button
            type="button"
            onClick={() => setIsTakeawaysOpen(!isTakeawaysOpen)}
            className="w-full flex items-center justify-between p-3.5 text-xs font-semibold text-left hover:bg-slate-50 dark:hover:bg-stone-800/40 transition-colors cursor-pointer"
            aria-expanded={isTakeawaysOpen}
            data-testid="takeaways-drawer-toggle"
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span>
                Key Takeaways ({video.keyTakeaways.length} Core Ideas)
              </span>
            </span>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-slate-400 transition-transform duration-200',
                isTakeawaysOpen && 'rotate-180 text-teal-600'
              )}
            />
          </button>

          {isTakeawaysOpen && (
            <div
              data-testid="takeaways-drawer-content"
              className="p-4 pt-1 border-t border-slate-100 dark:border-stone-800/80 text-xs sm:text-sm space-y-2.5 animate-in fade-in duration-150"
            >
              {video.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 dark:text-stone-300 leading-relaxed font-normal">
                    {takeaway}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Interactive 1-click Action Prompt button launching /advisor */}
      {video.actionPrompt && (
        <div
          data-testid="video-action-prompt"
          className={cn(
            'rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs transition-colors',
            isNightstandMode
              ? 'bg-stone-800/80 border-stone-700'
              : 'bg-gradient-to-r from-teal-50/70 via-emerald-50/50 to-teal-50/40 border-teal-200/80'
          )}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Parent Practice Exercise</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-stone-200 leading-snug">
              {video.actionPrompt}
            </p>
          </div>
          <Link
            href={`/advisor?prompt=${encodeURIComponent(
              `I just watched the lecture "${video.title}" by ${video.presenter}. How do I put this into action: "${video.actionPrompt}"?`
            )}`}
            className="shrink-0"
          >
            <Button
              size="sm"
              className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs gap-1.5 shadow-xs w-full sm:w-auto"
              data-testid="launch-advisor-button"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Practice with AI Advisor</span>
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
