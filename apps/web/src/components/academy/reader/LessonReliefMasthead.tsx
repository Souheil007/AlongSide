'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import {
  formatCourseTitle,
  type AcademyLessonDTO,
} from '@alongside/shared';
import { getCategoryBadgeInfo } from '../ModuleCard';
import { getPriorityTheme } from '../ChapterRoadmapView';
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

          {lesson.videoLecture && (
            <span
              data-testid="master-lecture-badge"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-200"
            >
              <span aria-hidden="true">🎬</span>
              <span>Master Lecture</span>
            </span>
          )}

          {isCompleted && (
            <span
              data-testid="lesson-completed-badge"
              className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 text-xs"
            >
              <CheckCircle2 className="h-3 w-3" />
              Completed
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
    </div>
  );
}

