'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import {
  formatCourseTitle,
  type AcademyLessonDTO,
} from '@alongside/shared';
import { getCategoryBadgeInfo } from '../ModuleCard';
import { getPriorityTheme } from '../ChapterRoadmapView';
import { AudioMemoPlayer } from './AudioMemoPlayer';
import { NightstandModeToggle } from './NightstandModeToggle';
import { cn } from '@/lib/utils';

export interface LessonReliefMastheadProps {
  lesson: AcademyLessonDTO;
  moduleSlug: string;
  moduleTitle?: string;
  isCompleted?: boolean;
  isNightstandMode?: boolean;
  onToggleNightstandMode?: () => void;
  className?: string;
}

export function LessonReliefMasthead({
  lesson,
  moduleSlug,
  moduleTitle,
  isCompleted = false,
  isNightstandMode = false,
  onToggleNightstandMode,
  className,
}: LessonReliefMastheadProps) {
  const categoryInfo = lesson.module?.category
    ? getCategoryBadgeInfo(lesson.module.category)
    : null;

  const priorityTheme = lesson.chapter?.priority
    ? getPriorityTheme(lesson.chapter.priority)
    : null;

  const effectiveTagline =
    lesson.reliefTagline ||
    'Why this behavioral reaction is 100% normal developmental biology, not a parenting failure.';

  return (
    <div
      data-testid="lesson-relief-masthead"
      className={cn('space-y-4', className)}
    >
      {/* Top Bar: Breadcrumb + Badges + Nightstand Toggle */}
      <nav
        aria-label="Lesson navigation"
        className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium"
      >
        <Link
          href={`/academy/${moduleSlug}`}
          className={cn(
            'flex items-center gap-1.5 transition-colors font-semibold',
            isNightstandMode
              ? 'text-stone-400 hover:text-amber-300'
              : 'text-slate-600 hover:text-teal-700'
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {formatCourseTitle(moduleTitle || '') || 'Course Roadmap'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {priorityTheme && (
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                priorityTheme.badgeStyle
              )}
            >
              {priorityTheme.shortBadge}
            </span>
          )}

          {categoryInfo && (
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold hidden sm:inline-flex',
                categoryInfo.className
              )}
            >
              {categoryInfo.label}
            </span>
          )}

          {onToggleNightstandMode && (
            <NightstandModeToggle
              isNightstandMode={isNightstandMode}
              onToggle={onToggleNightstandMode}
            />
          )}
        </div>
      </nav>

      {/* Main Masthead Card */}
      <header
        className={cn(
          'rounded-2xl border p-6 sm:p-8 shadow-xs transition-colors space-y-5',
          isNightstandMode
            ? 'bg-stone-900 border-stone-800 text-stone-100'
            : 'bg-white border-slate-200/90 text-slate-900'
        )}
      >
        {/* Meta Row: Chapter, Lesson Order, Timer, Completion */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-slate-500">
          {lesson.chapter && (
            <span
              className={cn(
                'font-semibold',
                isNightstandMode ? 'text-stone-300' : 'text-slate-700'
              )}
            >
              {lesson.chapter.title}
            </span>
          )}
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-teal-600" />
            Lesson {lesson.sortOrder}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {lesson.readingMinutes} min read
          </span>
          {isCompleted && (
            <>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </span>
            </>
          )}
        </div>

        {/* Lesson Title (Serene Editorial Serif) */}
        <h1
          className={cn(
            'text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug font-serif',
            isNightstandMode ? 'text-amber-100' : 'text-slate-900'
          )}
        >
          {lesson.title}
        </h1>

        {/* Guilt-Release Tagline Banner */}
        <div
          data-testid="relief-tagline"
          className={cn(
            'flex items-start gap-2.5 rounded-xl border p-3.5 text-xs sm:text-sm font-medium leading-relaxed transition-colors',
            isNightstandMode
              ? 'bg-amber-950/30 border-amber-900/60 text-amber-200/90'
              : 'bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-emerald-50/50 border-emerald-200/80 text-emerald-900'
          )}
        >
          <span className="mt-0.5 shrink-0 text-base">💡</span>
          <div>
            <span className="font-bold uppercase tracking-wider text-[11px] block mb-0.5 text-emerald-700 dark:text-amber-400">
              Guilt-Release Pediatric Anchor
            </span>
            <p className={cn(isNightstandMode ? 'text-amber-100/90' : 'text-slate-800')}>
              {effectiveTagline}
            </p>
          </div>
        </div>

        {/* Embedded Native Audio Memo Player */}
        <AudioMemoPlayer
          audioUrl={lesson.audioUrl}
          audioDurationSeconds={lesson.audioDurationSeconds}
          title={`Listen: 90s Spoken Memo for Lesson ${lesson.sortOrder}`}
          isNightstandMode={isNightstandMode}
        />
      </header>
    </div>
  );
}
