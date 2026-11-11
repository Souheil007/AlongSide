'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import type { AcademyLessonSummaryDTO } from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface LessonFooterNavProps {
  isCompleted: boolean;
  isSubmitting: boolean;
  onComplete: () => void;
  moduleSlug: string;
  nextLesson?: AcademyLessonSummaryDTO | null;
  prevLesson?: AcademyLessonSummaryDTO | null;
  currentLessonOrder?: number;
  totalLessons?: number;
  errorMessage?: string | null;
  isNightstandMode?: boolean;
  className?: string;
}

export function LessonFooterNav({
  isCompleted,
  isSubmitting,
  onComplete,
  moduleSlug,
  nextLesson,
  prevLesson,
  currentLessonOrder = 1,
  totalLessons = 4,
  errorMessage,
  isNightstandMode = false,
  className,
}: LessonFooterNavProps) {
  const progressPercent = Math.min(
    100,
    Math.max(5, (currentLessonOrder / Math.max(1, totalLessons)) * 100)
  );

  return (
    <footer
      data-testid="lesson-footer-nav"
      aria-label="Lesson completion and navigation"
      className={cn('space-y-6 pt-4', className)}
    >
      {/* Chapter Progress Bar */}
      <div
        className={cn(
          'rounded-2xl border p-5 shadow-xs transition-colors space-y-3',
          isNightstandMode
            ? 'bg-stone-900 border-stone-800 text-stone-200'
            : 'bg-white border-slate-200/90 text-slate-800'
        )}
      >
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-stone-400">
            <BookOpen className="h-3.5 w-3.5 text-teal-600" />
            Chapter Journey Progress
          </span>
          <span className="text-teal-700 dark:text-teal-400 font-mono">
            Lesson {currentLessonOrder} of {totalLessons}
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Completion Action Card */}
      <div
        className={cn(
          'rounded-2xl border p-6 shadow-xs transition-colors space-y-4',
          isNightstandMode
            ? 'bg-stone-900 border-stone-800 text-stone-200'
            : 'bg-white border-slate-200/90 text-slate-800'
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2
              className={cn(
                'text-base font-bold',
                isNightstandMode ? 'text-amber-100' : 'text-slate-900'
              )}
            >
              {isCompleted
                ? 'Lesson Completed & Progress Saved'
                : 'Mark This Lesson Complete'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400">
              {isCompleted
                ? 'Your pediatric mastery has been recorded. Advance to the next lesson.'
                : 'Complete this lesson to advance your parent advisory progress.'}
            </p>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={onComplete}
            disabled={isCompleted || isSubmitting}
            data-testid="complete-lesson-btn"
            className={cn(
              'shrink-0 gap-2 font-semibold text-sm transition-all shadow-xs',
              isCompleted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : isNightstandMode
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-teal-700 text-white hover:bg-teal-800'
            )}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Recording Progress...</span>
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Lesson Completed</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Complete Lesson</span>
              </>
            )}
          </Button>
        </div>

        {errorMessage && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Pagination Grid: Prev Lesson / Next Lesson Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevLesson ? (
          <Link
            href={`/academy/${moduleSlug}/${prevLesson.slug}`}
            className={cn(
              'flex items-center gap-3 rounded-xl border p-4 text-left shadow-xs transition-colors group',
              isNightstandMode
                ? 'bg-stone-900 border-stone-800 hover:border-amber-600 text-stone-200'
                : 'bg-white border-slate-200/90 hover:border-teal-300 text-slate-800'
            )}
          >
            <ArrowLeft className="h-5 w-5 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Previous Lesson
              </span>
              <p className="text-xs sm:text-sm font-bold group-hover:text-teal-900 dark:group-hover:text-amber-200 line-clamp-1">
                {prevLesson.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/academy/${moduleSlug}/${nextLesson.slug}`}
            className={cn(
              'flex items-center justify-between gap-3 rounded-xl border p-4 text-right shadow-xs transition-colors group sm:col-start-2',
              isNightstandMode
                ? 'bg-stone-900 border-stone-800 hover:border-amber-600 text-stone-200'
                : 'bg-white border-slate-200/90 hover:border-teal-300 text-slate-800'
            )}
          >
            <div className="text-right w-full">
              <div className="flex items-center justify-end gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-amber-400">
                <Sparkles className="h-3 w-3" />
                <span>Up Next</span>
                <span>• {nextLesson.readingMinutes || 3} min</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-stone-100 group-hover:text-teal-900 dark:group-hover:text-amber-200 line-clamp-1">
                {nextLesson.title}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
          </Link>
        ) : (
          <Link
            href={`/academy/${moduleSlug}`}
            className={cn(
              'flex items-center justify-between gap-3 rounded-xl border p-4 text-right shadow-xs transition-colors group sm:col-start-2',
              isNightstandMode
                ? 'bg-stone-900 border-stone-800 hover:border-amber-600 text-stone-200'
                : 'bg-white border-slate-200/90 hover:border-teal-300 text-slate-800'
            )}
          >
            <div className="text-right w-full">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Chapter Finished
              </span>
              <p className="text-xs sm:text-sm font-bold text-teal-700 dark:text-amber-400">
                Return to Course Roadmap
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-teal-600 shrink-0" />
          </Link>
        )}
      </div>
    </footer>
  );
}
