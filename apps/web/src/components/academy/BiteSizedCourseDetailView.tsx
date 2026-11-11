'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, CheckCircle2 } from 'lucide-react';
import {
  formatCourseTitle,
  type AcademyLessonSummaryDTO,
  type AcademyModuleDetailDTO,
} from '@alongside/shared';
import { getLocalCompletedLessonIds } from '@/lib/api/academy';
import { cn } from '@/lib/utils';

export interface BiteSizedCourseDetailViewProps {
  module: AcademyModuleDetailDTO;
  activeChild?: {
    id: string;
    name: string;
    age: number;
    developmentalTier?: string | null;
  } | null;
  className?: string;
}

/**
 * Procedural takeaway and empathetic script resolution for any lesson.
 * Provides curated pediatric takeaways for core topics and a dynamic fallback for all others.
 */
export function resolveLessonTakeaway(
  lesson: AcademyLessonSummaryDTO,
  _moduleTitle?: string
): { subtitle: string; script: string } {
  const titleLower = lesson.title.toLowerCase();
  const slugLower = lesson.slug.toLowerCase();

  if (slugLower.includes('bedtime-dock') || titleLower.includes('bedtime dock')) {
    return {
      subtitle:
        "How to make the living-room charging station a neutral household law so bedtime isn't an argument every evening.",
      script:
        'We protect your sleep because we love your growing brain. The dock is for all phones, including mine.',
    };
  }

  if (slugLower.includes('adrenarche') || titleLower.includes('adrenarche')) {
    return {
      subtitle:
        'Understanding the biological awakening to social status and amygdala reactivity in pre-teens.',
      script:
        "I see you're overwhelmed right now. Let's take a 5-minute pause and come back to this together.",
    };
  }

  if (
    slugLower.includes('amygdala') ||
    titleLower.includes('amygdala') ||
    titleLower.includes('meltdown')
  ) {
    return {
      subtitle:
        'De-escalating acute physiological reactivity with a 3-step co-regulation pause.',
      script:
        "Your brain is in fight-or-flight. My job isn't to lecture you, it's to keep you safe until the storm passes.",
    };
  }

  if (
    slugLower.includes('snark') ||
    titleLower.includes('snark') ||
    titleLower.includes('eye-roll')
  ) {
    return {
      subtitle:
        'Transforming sarcastic comebacks and eye-rolls into low-defensiveness connection moments.',
      script:
        "That sounded sharp, but I know school was exhausting today. I'm right here whenever you want a snack.",
    };
  }

  if (
    slugLower.includes('decompression') ||
    titleLower.includes('decompression')
  ) {
    return {
      subtitle:
        'Creating a 20-minute sensory sanctuary before demanding chores or homework.',
      script:
        'First 20 minutes home are zero-demand time. Decompress your senses before we talk about homework.',
    };
  }

  if (
    slugLower.includes('group-chat') ||
    titleLower.includes('group chat') ||
    titleLower.includes('fomo')
  ) {
    return {
      subtitle:
        'Equipping your child to handle silent group chat exclusion and FOMO with quiet dignity.',
      script:
        'Group chats move fast and can feel cruel. You are worthy and loved, regardless of who is typing right now.',
    };
  }

  if (slugLower.includes('repair') || titleLower.includes('repair')) {
    return {
      subtitle:
        'Repairing parent-child ruptures without shame, preserving mutual trust and respect.',
      script:
        "I reacted out of frustration earlier and raised my voice. I'm sorry. Can we restart this conversation calmly?",
    };
  }

  if (
    slugLower.includes('dopamine') ||
    titleLower.includes('dopamine')
  ) {
    return {
      subtitle:
        'How algorithmic notification loops hijack the developing reward center and create infinite scroll habits.',
      script:
        "The apps are engineered to keep you hooked. You're not weak-willed; we just need external guardrails.",
    };
  }

  if (
    slugLower.includes('boundar') ||
    titleLower.includes('boundar')
  ) {
    return {
      subtitle:
        'Setting firm, respectful household boundaries without emotional shame or confrontation.',
      script:
        "Boundaries aren't a punishment for doing something wrong; they are fences around your rest and wellbeing.",
    };
  }

  if (
    slugLower.includes('gaming') ||
    titleLower.includes('gaming') ||
    titleLower.includes('roblox') ||
    titleLower.includes('fortnite')
  ) {
    return {
      subtitle:
        'Roblox & Fortnite transitions with 10-minute warning buffers and clear stopping criteria.',
      script:
        'When this match finishes in 8 minutes, the screen sleeps. Let’s go grab a drink together.',
    };
  }

  if (
    slugLower.includes('exploit') ||
    titleLower.includes('exploit') ||
    titleLower.includes('cyber') ||
    titleLower.includes('phishing')
  ) {
    return {
      subtitle:
        'Arming your tween against in-game phishing, free currency scams, and stranger chats.',
      script:
        'If anyone in-game asks for your password or offers free currency, come show me immediately with zero trouble.',
    };
  }

  if (
    slugLower.includes('pact') ||
    titleLower.includes('pact') ||
    titleLower.includes('agreement')
  ) {
    return {
      subtitle:
        'Co-signing the transparent agreement and setting collaborative digital milestones.',
      script:
        'This agreement is a two-way street. Let’s negotiate rules that protect both your privacy and your safety.',
    };
  }

  if (
    slugLower.includes('convalescence') ||
    titleLower.includes('convalescence') ||
    slugLower.includes('recovery') ||
    titleLower.includes('recovery')
  ) {
    return {
      subtitle:
        'Rebuilding immune vitality and nervous system energy without rushing back into high-demand schedules.',
      script:
        'Healing takes biological time. Rest is not lost time; it is your body actively rebuilding strength.',
    };
  }

  if (
    slugLower.includes('sleep') ||
    titleLower.includes('sleep')
  ) {
    return {
      subtitle:
        'Protecting restorative sleep architecture and circadian biology against modern evening overstimulation.',
      script:
        'We protect your sleep because we love your growing brain. Lights out lets your cells repair and recharge.',
    };
  }

  // Dynamic fallback for any other lesson
  return {
    subtitle: `Actionable developmental guidance and communication scripts for ${lesson.title.toLowerCase()}.`,
    script:
      'We are a team figuring this out together. Your wellbeing always comes before any screen or rule.',
  };
}

/**
 * Format seconds as M:SS
 */
export function formatSeconds(sec: number): string {
  const mins = Math.floor(sec / 60);
  const remainder = Math.floor(sec % 60);
  return `${mins}:${remainder.toString().padStart(2, '0')}`;
}

/**
 * Direction A2: Bite-Sized Micro-Stream Course Detail View
 *
 * Streamlined single-course layout:
 * - Newsreader serif typography & quiet child calibration tag
 * - Unified, sequential curriculum stream (no artificial "Parts" dividing the course)
 * - In-place expanded focus card: clicking ANY lesson expands its details right in its place
 * - Empathetic Script Box & Start Lesson CTA
 * - Accurate dynamic spoken audio briefing with real duration calculation
 * - Evidence-based pediatric reassurance footer
 */
export function BiteSizedCourseDetailView({
  module,
  activeChild: _activeChild,
  className,
}: BiteSizedCourseDetailViewProps) {
  // Local storage completion sync on mount
  const [localCompletedSet, setLocalCompletedSet] = React.useState<Set<string>>(new Set());
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const ids = getLocalCompletedLessonIds();
      setLocalCompletedSet(ids);
    }
  }, []);

  const allLessons: AcademyLessonSummaryDTO[] = React.useMemo(() => {
    let list: AcademyLessonSummaryDTO[] = [];
    if (module.lessons && module.lessons.length > 0) {
      list = [...module.lessons];
    } else if (module.chapters && module.chapters.length > 0) {
      list = module.chapters.flatMap((c) => c.lessons || []);
    }
    return list
      .map((l) => ({
        ...l,
        isCompleted: l.isCompleted || localCompletedSet.has(l.id),
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [module.lessons, module.chapters, localCompletedSet]);

  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => l.isCompleted);
  const completedCount = completedLessons.length;
  const remainingLessonsCount = allLessons.filter((l) => !l.isCompleted).length;
  const isModuleCompleted =
    module.isCompleted || (totalLessons > 0 && completedCount === totalLessons);

  // The hero lesson is the first uncompleted lesson, or the first lesson if none or all completed
  const heroLesson = allLessons.find((l) => !l.isCompleted) || allLessons[0];

  // In-place accordion expansion state: default to hero lesson
  const [expandedLessonId, setExpandedLessonId] = React.useState<string | null>(
    heroLesson ? heroLesson.id : null
  );

  // Keep expanded lesson in sync if initial load or lesson completion updates
  React.useEffect(() => {
    if (!expandedLessonId && heroLesson) {
      setExpandedLessonId(heroLesson.id);
    }
  }, [heroLesson, expandedLessonId]);

  // Calculate remaining reading minutes across uncompleted lessons
  const remainingMinutes = allLessons
    .filter((l) => !l.isCompleted)
    .reduce((sum, l) => sum + (l.readingMinutes || 4), 0);

  // Handler to toggle in-place accordion expansion
  const handleToggleLesson = (lessonId: string) => {
    setExpandedLessonId((prev) => (prev === lessonId ? null : lessonId));
  };

  return (
    <div
      data-testid="bite-sized-stream-view"
      className={cn('min-h-screen bg-linen text-ink font-sans pb-16', className)}
    >
      {/* Sub-Header Bar (Breadcrumb & Telemetry) */}
      <header className="border-b border-hairline/70 bg-linen/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/academy"
            className="text-xs font-mono text-mute hover:text-spruce transition-colors flex items-center gap-1.5 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Parent Academy</span>
          </Link>

          {/* Compact Progress Counter */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-spruce font-semibold">
              {completedCount} of {totalLessons} done
            </span>
            <span className="text-hairline">•</span>
            <span className="text-mute">~{remainingMinutes}m left</span>
          </div>
        </div>
      </header>

      {/* Main Reading Canvas */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Masthead */}
        <section className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink tracking-tight leading-snug">
            {formatCourseTitle(module.title)}
          </h1>

          <p className="text-body text-sm leading-relaxed">
            {module.summary}
          </p>
        </section>

        {/* UNIFIED COURSE CURRICULUM STREAM (Single sequential list - no artificial Parts) */}
        <section className="space-y-4" aria-label="Course Curriculum">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-spruce shrink-0" />
              Course Curriculum
            </span>
            <span className="text-spruce font-medium">
              {remainingLessonsCount > 0
                ? `${remainingLessonsCount} lesson${remainingLessonsCount === 1 ? '' : 's'} remaining`
                : 'All complete'}
            </span>
          </div>

          {/* Lessons List: Clicking any lesson row expands its focus card in place */}
          <div className="space-y-3" data-testid="curriculum-lessons-list">
            {allLessons.map((lesson) => {
              const isExpanded = expandedLessonId === lesson.id;
              const isCompleted = lesson.isCompleted;
              const takeaway = resolveLessonTakeaway(lesson, module.title);

              return (
                <div
                  key={lesson.id}
                  data-testid={`lesson-card-${lesson.id}`}
                  className={cn(
                    'rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs',
                    isExpanded
                      ? isCompleted
                        ? 'border-stone-300 dark:border-stone-700 bg-stone-50/90 dark:bg-stone-900/80 ring-1 ring-stone-300/40 shadow-xs'
                        : 'border-spruce/40 bg-spruce-soft/30 ring-1 ring-spruce/30 shadow-xs'
                      : isCompleted
                        ? 'border-stone-200/70 dark:border-stone-800/60 bg-stone-50/70 dark:bg-stone-900/30 opacity-60 hover:opacity-90'
                        : 'border-hairline bg-white hover:border-spruce/30'
                  )}
                >
                  {/* Clickable Lesson Row Header: Click whole box to toggle focus card in place */}
                  <div
                    onClick={() => handleToggleLesson(lesson.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggleLesson(lesson.id);
                      }
                    }}
                    className={cn(
                      'p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors',
                      isExpanded
                        ? isCompleted
                          ? 'bg-stone-100/70 dark:bg-stone-800/50'
                          : 'bg-spruce-soft/40'
                        : isCompleted
                          ? 'hover:bg-stone-100/50 dark:hover:bg-stone-800/40'
                          : 'hover:bg-linen-subtle/40'
                    )}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span
                        className={cn(
                          'h-6 w-6 rounded-full text-xs font-mono flex items-center justify-center shrink-0 transition-colors',
                          isCompleted
                            ? 'bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400 font-bold border border-stone-300/60 dark:border-stone-700'
                            : isExpanded
                              ? 'bg-spruce text-white font-semibold'
                              : 'bg-linen-subtle text-mute'
                        )}
                      >
                        {isCompleted ? '✓' : lesson.sortOrder}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={cn(
                              'text-xs sm:text-sm font-semibold transition-colors truncate',
                              isCompleted
                                ? 'text-stone-500 dark:text-stone-400 line-through decoration-stone-300 dark:decoration-stone-600 font-medium'
                                : isExpanded
                                  ? 'text-spruce font-bold'
                                  : 'text-ink'
                            )}
                          >
                            {lesson.sortOrder}. {lesson.title}
                          </h3>
                          {isCompleted && (
                            <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800/80 px-1.5 py-0.5 rounded-full border border-stone-200/60 dark:border-stone-700/60">
                              Completed
                            </span>
                          )}
                        </div>
                        {!isExpanded && (
                          <p
                            className={cn(
                              'text-[11px] line-clamp-1 mt-0.5',
                              isCompleted ? 'text-stone-400 dark:text-stone-500' : 'text-mute'
                            )}
                          >
                            {takeaway.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span
                        className={cn(
                          'text-xs font-mono',
                          isCompleted ? 'text-stone-400 dark:text-stone-500' : 'text-mute'
                        )}
                      >
                        {lesson.readingMinutes || 4}m
                      </span>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          isExpanded
                            ? isCompleted
                              ? 'rotate-180 text-stone-500'
                              : 'rotate-180 text-spruce'
                            : isCompleted
                              ? 'text-stone-400'
                              : 'text-mute'
                        )}
                      />
                    </div>
                  </div>

                  {/* IN-PLACE EXPANDED FOCUS BOX (Opens directly in its place under the clicked lesson) */}
                  {isExpanded && (
                    <div
                      data-testid="hero-focus-card"
                      className={cn(
                        'border-t p-5 sm:p-6 space-y-4 animate-in fade-in duration-200',
                        isCompleted
                          ? 'border-stone-200/80 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/60'
                          : 'border-spruce/20 bg-white/70'
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase',
                            isCompleted
                              ? 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-300 border border-stone-300/60'
                              : 'bg-spruce text-white'
                          )}
                        >
                          {isCompleted
                            ? 'Course Completed · Review'
                            : lesson.id === heroLesson?.id && !isModuleCompleted
                              ? "Tonight's Objective"
                              : `Lesson ${lesson.sortOrder} Objective`}
                        </span>
                        <span
                          className={cn(
                            'font-medium',
                            isCompleted ? 'text-stone-500 dark:text-stone-400' : 'text-spruce'
                          )}
                        >
                          {lesson.readingMinutes || 4} min read
                        </span>
                      </div>

                      <div>
                        <h2
                          className={cn(
                            'text-lg sm:text-xl font-serif font-bold leading-tight',
                            isCompleted ? 'text-stone-700 dark:text-stone-200' : 'text-ink'
                          )}
                        >
                          {lesson.sortOrder}. {lesson.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-body leading-relaxed mt-1.5">
                          {takeaway.subtitle}
                        </p>
                      </div>

                      {/* Empathetic / Clinician Script Box */}
                      <div
                        className={cn(
                          'rounded-xl p-3.5 border text-xs shadow-2xs',
                          isCompleted
                            ? 'bg-white/80 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700'
                            : 'bg-white border-spruce/20'
                        )}
                      >
                        <span
                          className={cn(
                            'text-[10px] font-mono font-semibold uppercase tracking-wider block mb-1',
                            isCompleted ? 'text-stone-500 dark:text-stone-400' : 'text-spruce'
                          )}
                        >
                          Empathetic Script to Use
                        </span>
                        <p className="font-serif italic text-ink text-sm">
                          &ldquo;{takeaway.script}&rdquo;
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <Link
                          href={`/academy/${module.slug}/${lesson.slug}`}
                          className={cn(
                            'flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all shadow-xs',
                            isCompleted
                              ? 'bg-stone-700 hover:bg-stone-800 text-white'
                              : 'bg-spruce hover:bg-spruce-hover text-white'
                          )}
                        >
                          <span>
                            {isCompleted ? 'Review' : 'Start'} Lesson {lesson.sortOrder} (
                            {lesson.readingMinutes || 4} min)
                          </span>
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Calming Footer Reassurance */}
        <footer className="pt-4 border-t border-hairline text-center text-xs font-mono text-mute">
          <span>Evidence-based pediatric framework · Dr. Aris Thorne, MD</span>
        </footer>
      </main>
    </div>
  );
}
