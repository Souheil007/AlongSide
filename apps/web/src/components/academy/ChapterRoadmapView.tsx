'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldAlert,
  CalendarCheck,
  Compass,
  PlayCircle,
} from 'lucide-react';
import {
  ChapterPriority,
  type AcademyChapterDTO,
  type AcademyLessonSummaryDTO,
  type AcademyModuleDetailDTO,
} from '@alongside/shared';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface ChapterRoadmapViewProps {
  module: AcademyModuleDetailDTO;
  className?: string;
}

export interface PriorityTheme {
  label: string;
  shortBadge: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  containerBorder: string;
  containerBg: string;
  badgeStyle: string;
  accentText: string;
  accentBar: string;
}

export function getPriorityTheme(priority: number): PriorityTheme {
  switch (priority) {
    case ChapterPriority.PRIORITY_1_CRITICAL:
    case 1:
      return {
        label: 'Priority 1: Urgent & Critical Foundations',
        shortBadge: 'Priority 1 · Critical',
        tagline: 'Start here for acute friction and core neurobiology.',
        icon: ShieldAlert,
        containerBorder: 'border-rose-200/90 hover:border-rose-300',
        containerBg: 'bg-gradient-to-br from-rose-50/40 via-white to-white',
        badgeStyle: 'bg-rose-50 text-rose-800 border-rose-200',
        accentText: 'text-rose-900',
        accentBar: 'bg-rose-500',
      };
    case ChapterPriority.PRIORITY_2_ROUTINES:
    case 2:
      return {
        label: 'Priority 2: Daily Routines & Co-Regulation',
        shortBadge: 'Priority 2 · Daily Routines',
        tagline: 'Daily habits and preventative rituals.',
        icon: CalendarCheck,
        containerBorder: 'border-teal-200/90 hover:border-teal-300',
        containerBg: 'bg-gradient-to-br from-teal-50/40 via-white to-white',
        badgeStyle: 'bg-teal-50 text-teal-800 border-teal-200',
        accentText: 'text-teal-900',
        accentBar: 'bg-teal-600',
      };
    case ChapterPriority.PRIORITY_3_SCAFFOLDING:
    case 3:
    default:
      return {
        label: 'Priority 3: Advanced Scaffolding & Growth',
        shortBadge: 'Priority 3 · Scaffolding',
        tagline: 'Long-term emotional intelligence and transitions.',
        icon: Compass,
        containerBorder: 'border-indigo-200/90 hover:border-indigo-300',
        containerBg: 'bg-gradient-to-br from-indigo-50/40 via-white to-white',
        badgeStyle: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        accentText: 'text-indigo-900',
        accentBar: 'bg-indigo-600',
      };
  }
}

/**
 * Prioritized Chapter Roadmap View
 * Displays chapters strictly ordered by priority (Priority 1 -> Priority 2 -> Priority 3).
 */
export function ChapterRoadmapView({ module, className }: ChapterRoadmapViewProps) {
  // Sort chapters strictly by priority ascending (1 before 2, 2 before 3) then by sortOrder
  const sortedChapters = React.useMemo(() => {
    if (module.chapters && module.chapters.length > 0) {
      return [...module.chapters].sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.sortOrder - b.sortOrder;
      });
    }

    // Synthesize fallback chapters from lessons if module has flat lessons without chapters
    if (module.lessons && module.lessons.length > 0) {
      const lessonsPerChapter = Math.ceil(module.lessons.length / 3);
      const synthChapters: AcademyChapterDTO[] = [
        {
          id: `${module.id}-ch1`,
          moduleId: module.id,
          slug: 'foundational-neurobiology',
          title: 'Chapter 1: Foundational Neurobiology & Acute Friction',
          summary: 'Core neurobiological mechanisms and immediate de-escalation protocols.',
          priority: 1,
          sortOrder: 1,
          lessonCount: module.lessons.slice(0, lessonsPerChapter).length,
          completedLessonCount: module.lessons
            .slice(0, lessonsPerChapter)
            .filter((l) => l.isCompleted).length,
          isCompleted: module.lessons
            .slice(0, lessonsPerChapter)
            .every((l) => l.isCompleted),
          lessons: module.lessons.slice(0, lessonsPerChapter),
        },
        {
          id: `${module.id}-ch2`,
          moduleId: module.id,
          slug: 'daily-routines-and-habits',
          title: 'Chapter 2: Daily Routines & Calming Anchors',
          summary: 'Everyday co-regulation habits and preventative communication.',
          priority: 2,
          sortOrder: 2,
          lessonCount: module.lessons.slice(lessonsPerChapter, lessonsPerChapter * 2).length,
          completedLessonCount: module.lessons
            .slice(lessonsPerChapter, lessonsPerChapter * 2)
            .filter((l) => l.isCompleted).length,
          isCompleted: module.lessons
            .slice(lessonsPerChapter, lessonsPerChapter * 2)
            .every((l) => l.isCompleted),
          lessons: module.lessons.slice(lessonsPerChapter, lessonsPerChapter * 2),
        },
        {
          id: `${module.id}-ch3`,
          moduleId: module.id,
          slug: 'scaffolding-and-transitions',
          title: 'Chapter 3: Advanced Scaffolding & Future Transitions',
          summary: 'Long-term resilience and navigating developmental milestones.',
          priority: 3,
          sortOrder: 3,
          lessonCount: module.lessons.slice(lessonsPerChapter * 2).length,
          completedLessonCount: module.lessons
            .slice(lessonsPerChapter * 2)
            .filter((l) => l.isCompleted).length,
          isCompleted: module.lessons
            .slice(lessonsPerChapter * 2)
            .every((l) => l.isCompleted),
          lessons: module.lessons.slice(lessonsPerChapter * 2),
        },
      ].filter((ch) => ch.lessons.length > 0);

      return synthChapters;
    }

    return [];
  }, [module.chapters, module.lessons, module.id]);

  return (
    <section className={cn('space-y-6', className)} aria-label="Prioritized Chapter Roadmap">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Curriculum Roadmap: Chapters by Priority
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Structured advisory chapters sequenced by developmental urgency. Complete Priority 1 first for acute situations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 shrink-0">
          <Sparkles className="h-4 w-4 text-teal-600" />
          <span>{sortedChapters.length} Prioritized Chapters</span>
        </div>
      </div>

      <div className="space-y-6">
        {sortedChapters.map((chapter, index) => {
          const theme = getPriorityTheme(chapter.priority);
          const PriorityIcon = theme.icon;
          const chapterCompleted = chapter.isCompleted || (
            chapter.lessonCount > 0 && chapter.completedLessonCount >= chapter.lessonCount
          );

          // Find first uncompleted lesson in this chapter
          const nextLessonInChapter =
            chapter.lessons.find((l) => !l.isCompleted) || chapter.lessons[0];

          return (
            <article
              key={chapter.id}
              data-testid={`chapter-priority-${chapter.priority}`}
              className={cn(
                'rounded-2xl border bg-white p-5 sm:p-7 shadow-xs transition-all duration-200 space-y-5',
                theme.containerBorder,
                theme.containerBg,
                chapterCompleted && 'border-emerald-200 bg-emerald-50/20'
              )}
            >
              {/* Chapter Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold tracking-wide',
                        theme.badgeStyle
                      )}
                    >
                      <PriorityIcon className="h-3.5 w-3.5" />
                      <span>{theme.shortBadge}</span>
                    </span>

                    {chapterCompleted ? (
                      <Badge
                        variant="outline"
                        className="border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] gap-1"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        <span>Chapter Completed</span>
                      </Badge>
                    ) : chapter.completedLessonCount > 0 ? (
                      <Badge
                        variant="outline"
                        className="border-teal-300 bg-teal-50 text-teal-800 text-[11px]"
                      >
                        {chapter.completedLessonCount} / {chapter.lessonCount} Completed
                      </Badge>
                    ) : null}
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {chapter.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-slate-600 italic">
                    &ldquo;{theme.tagline}&rdquo;
                  </p>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                    {chapter.summary}
                  </p>
                </div>

                {nextLessonInChapter && (
                  <Link
                    href={`/academy/${module.slug}/${nextLessonInChapter.slug}`}
                    className="shrink-0 pt-1"
                  >
                    <Button
                      size="sm"
                      variant={chapterCompleted ? 'outline' : 'default'}
                      className={cn(
                        'w-full sm:w-auto text-xs font-semibold gap-2 shadow-xs',
                        !chapterCompleted && chapter.priority === 1
                          ? 'bg-rose-700 hover:bg-rose-800 text-white'
                          : !chapterCompleted && chapter.priority === 2
                          ? 'bg-teal-700 hover:bg-teal-800 text-white'
                          : !chapterCompleted
                          ? 'bg-indigo-700 hover:bg-indigo-800 text-white'
                          : ''
                      )}
                    >
                      <PlayCircle className="h-3.5 w-3.5" />
                      <span>
                        {chapterCompleted
                          ? 'Review Chapter'
                          : chapter.completedLessonCount > 0
                          ? 'Continue Chapter'
                          : 'Start Chapter'}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                )}
              </div>

              {/* Lessons List in Chapter */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Micro-Lessons in this Chapter ({chapter.lessons.length})</span>
                  <span>Self-Paced</span>
                </div>

                <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
                  {chapter.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/academy/${module.slug}/${lesson.slug}`}
                      className="flex items-center justify-between gap-3 p-3 sm:p-4 hover:bg-slate-50/90 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold shrink-0',
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

                        <div>
                          <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-900 transition-colors line-clamp-1">
                            {lesson.title}
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span>{lesson.readingMinutes} min read</span>
                            {lesson.isCompleted && (
                              <span className="text-emerald-700 font-semibold">• Completed</span>
                            )}
                          </p>
                        </div>
                      </div>

                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-1 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
