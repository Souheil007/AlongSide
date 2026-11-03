'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  AlertCircle,
} from 'lucide-react';
import { getModuleBySlug } from '@/lib/api/academy';
import { getTierBadgeInfo } from '@/components/academy/ModuleCard';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface ModuleDetailClientProps {
  slug: string;
}

export function ModuleDetailClient({ slug }: ModuleDetailClientProps) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['academy-module-detail', slug],
    queryFn: () => getModuleBySlug(slug),
  });

  const module = data?.module;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-6 animate-pulse">
        <div className="h-5 w-32 bg-slate-200 rounded" />
        <div className="h-48 rounded-2xl bg-white border border-slate-200 p-8 space-y-4" />
        <div className="h-64 rounded-2xl bg-white border border-slate-200 p-8 space-y-3" />
      </div>
    );
  }

  if (isError || !module) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Module Not Found</h2>
        <p className="text-sm text-slate-600">
          {error instanceof Error ? error.message : "The requested academy module couldn't be located."}
        </p>
        <Link href="/academy">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Academy Catalog
          </Button>
        </Link>
      </div>
    );
  }

  const tierInfo = getTierBadgeInfo(module.developmentalTier);
  const percentComplete =
    module.lessonCount > 0
      ? Math.round((module.completedLessonCount / module.lessonCount) * 100)
      : 0;

  const totalReadingMinutes = module.lessons.reduce((acc, l) => acc + l.readingMinutes, 0);

  // Find the first uncompleted lesson, or the first lesson if all or none completed
  const nextLesson = module.lessons.find((l) => !l.isCompleted) || module.lessons[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/academy"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Modules</span>
        </Link>
      </nav>

      {/* Module Overview Hero */}
      <header className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
              tierInfo.className
            )}
          >
            {tierInfo.label}
          </span>

          {module.isCompleted && (
            <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-800 text-xs gap-1.5 py-1 px-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Module Completed
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
            {module.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {module.summary}
          </p>
        </div>

        {/* Stats & Progress */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-xs sm:text-sm text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-teal-600" />
              {module.lessonCount} {module.lessonCount === 1 ? 'lesson' : 'lessons'}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-slate-400" />
              ~{totalReadingMinutes} min total read
            </span>
          </div>

          {nextLesson && (
            <Link href={`/academy/${module.slug}/${nextLesson.slug}`}>
              <Button size="default" className="gap-2 font-semibold shadow-sm w-full sm:w-auto">
                <PlayCircle className="h-4 w-4" />
                <span>
                  {module.completedLessonCount === 0
                    ? 'Start Lesson 1'
                    : module.isCompleted
                    ? 'Review Lesson 1'
                    : `Continue: Lesson ${nextLesson.sortOrder}`}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-600">Module Completion</span>
            <span className="font-semibold text-slate-900">{percentComplete}%</span>
          </div>
          <Progress value={percentComplete} className="h-2" />
          <p className="text-[11px] text-slate-500">
            {module.completedLessonCount} of {module.lessonCount} lessons completed
          </p>
        </div>
      </header>

      {/* Lesson Index List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Course Lessons ({module.lessons.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Self-paced micro-learning
          </span>
        </div>

        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
          {module.lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/academy/${module.slug}/${lesson.slug}`}
              className="flex items-center justify-between gap-4 p-4 sm:p-5 hover:bg-slate-50/80 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold shrink-0 mt-0.5',
                    lesson.isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-800'
                  )}
                >
                  {lesson.isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <span>{lesson.sortOrder}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {lesson.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lesson.readingMinutes} min read
                    </span>
                    {lesson.isCompleted && (
                      <span className="text-emerald-700 font-medium">Completed</span>
                    )}
                  </div>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
