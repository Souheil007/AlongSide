'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import {
  formatCourseTitle,
  getEpisodeRoleMeta,
  interpolateChildCopy,
  resolveEpisodeRoleFromSortOrder,
  type AcademyLessonSummaryDTO,
  type AcademyModuleDetailDTO,
  type ChildPersonalizationContext,
} from '@alongside/shared';
import { getLocalCompletedLessonIds } from '@/lib/api/academy';
import { AlmanacVideoShelf } from './almanac/AlmanacVideoShelf';
import { cn } from '@/lib/utils';

export interface BiteSizedCourseDetailViewProps {
  module: AcademyModuleDetailDTO;
  activeChild?: ChildPersonalizationContext & {
    id?: string;
    name?: string;
    age?: number;
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
  if (lesson.empatheticScript && lesson.empatheticScript.trim().length > 0) {
    return {
      subtitle:
        lesson.reliefTagline ||
        `Actionable developmental neurobiology and communication scripts for ${lesson.title.toLowerCase()}.`,
      script: lesson.empatheticScript.trim(),
    };
  }

  const titleLower = lesson.title.toLowerCase();
  const slugLower = lesson.slug.toLowerCase();

  if (
    slugLower.includes('dessert') ||
    titleLower.includes('dessert') ||
    titleLower.includes('sweet')
  ) {
    return {
      subtitle:
        'De-weaponizing sweets by neutral dessert pairing alongside nutritious foods.',
      script:
        'You can enjoy your dessert alongside dinner. All foods have a neutral, safe place on our table.',
    };
  }

  if (
    slugLower.includes('picky') ||
    titleLower.includes('picky') ||
    slugLower.includes('exposure') ||
    titleLower.includes('exposure') ||
    titleLower.includes('vegetable')
  ) {
    return {
      subtitle:
        'Rewiring gustatory neuroplasticity through unforced sensory food exposures.',
      script:
        "You don't have to eat the unfamiliar food tonight; it can just sit on your learning plate. We have bread and noodles so your belly feels satisfied.",
    };
  }

  if (
    slugLower.includes('division-of-responsibility') ||
    titleLower.includes('division of responsibility') ||
    titleLower.includes('table')
  ) {
    return {
      subtitle:
        'Installing the Ellyn Satter Division of Responsibility to eliminate mealtime power struggles.',
      script:
        'My job as your parent is to decide what we serve and when. Your job is to decide whether and how much your body needs.',
    };
  }

  if (slugLower.includes('allergen') || titleLower.includes('allergen')) {
    return {
      subtitle:
        'Evidence-based pediatric allergen micro-dosing and nutritional scaffolding.',
      script:
        'We are introducing tiny, safe tastes together so your immune system learns to be calm and strong.',
    };
  }

  if (
    slugLower.includes('growing-pains') ||
    titleLower.includes('growing pains') ||
    titleLower.includes('growth spurt')
  ) {
    return {
      subtitle:
        'Decoding nocturnal musculoskeletal growth spurts and soothing evening limb aches.',
      script:
        "Your legs did so much running and growing today. Let's do a gentle warm massage so your muscles can rest.",
    };
  }

  if (
    slugLower.includes('outdoor') ||
    titleLower.includes('outdoor') ||
    titleLower.includes('vision')
  ) {
    return {
      subtitle:
        'Installing 60 minutes of daily outdoor light exposure for dopamine, mood, and myopia prevention.',
      script:
        'Fresh air and natural sunlight reset our circadian clock. Let’s step outside for a 15-minute neighborhood walk together.',
    };
  }

  if (
    slugLower.includes('bedtime-dock') ||
    titleLower.includes('bedtime dock')
  ) {
    return {
      subtitle:
        "How to make the living-room charging station a neutral household law so bedtime isn't an argument every evening.",
      script:
        'We protect your sleep because we love your growing brain. The dock is for all phones, including mine.',
    };
  }

  if (
    slugLower.includes('convalescence') ||
    titleLower.includes('convalescence') ||
    slugLower.includes('recovery') ||
    titleLower.includes('recovery') ||
    titleLower.includes('viral')
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
    titleLower.includes('sleep') ||
    slugLower.includes('circadian') ||
    titleLower.includes('circadian') ||
    titleLower.includes('nap')
  ) {
    return {
      subtitle:
        'Protecting restorative sleep architecture and circadian biology against modern evening overstimulation.',
      script:
        'We protect your sleep because we love your growing brain. Lights out lets your cells repair and recharge.',
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
    titleLower.includes('meltdown') ||
    titleLower.includes('tantrum') ||
    titleLower.includes('crying')
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
    titleLower.includes('eye-roll') ||
    titleLower.includes('sarcasm')
  ) {
    return {
      subtitle:
        'Transforming sarcastic comebacks and eye-rolls into low-defensiveness connection moments.',
      script:
        "That sounded sharp, but I know school was exhausting today. I'm right here whenever you want a snack.",
    };
  }

  if (
    slugLower.includes('autonomy') ||
    titleLower.includes('autonomy') ||
    titleLower.includes('potty') ||
    titleLower.includes('no!')
  ) {
    return {
      subtitle:
        'Channeling the developing drive for autonomy into healthy cooperative choices.',
      script:
        'You have a strong voice and I respect that. You can decide whether we put on boots first or zip your jacket first.',
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

  if (slugLower.includes('repair') || titleLower.includes('repair')) {
    return {
      subtitle:
        'Repairing parent-child ruptures without shame, preserving mutual trust and respect.',
      script:
        "I reacted out of frustration earlier and raised my voice. I'm sorry. Can we restart this conversation calmly?",
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

  if (
    slugLower.includes('dopamine') ||
    titleLower.includes('dopamine') ||
    titleLower.includes('scroll')
  ) {
    return {
      subtitle:
        'How algorithmic notification loops hijack the developing reward center and create infinite scroll habits.',
      script:
        "The apps are engineered to keep you hooked. You're not weak-willed; we just need external guardrails.",
    };
  }

  if (slugLower.includes('boundar') || titleLower.includes('boundar')) {
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
    slugLower.includes('homework') ||
    titleLower.includes('homework') ||
    titleLower.includes('focus')
  ) {
    return {
      subtitle:
        'Scaffolding working memory and breaking overwhelming tasks into low-friction steps.',
      script:
        "This task feels heavy, but you don't have to carry it alone. Let's just spend 5 calm minutes on the first step together.",
    };
  }

  if (
    slugLower.includes('sports') ||
    titleLower.includes('sports') ||
    titleLower.includes('grit')
  ) {
    return {
      subtitle:
        'Fostering athletic resilience and post-game decompression without critical sideline coaching.',
      script:
        'I loved watching you play today. Hard games are where our resilience muscles grow the fastest.',
    };
  }

  if (
    slugLower.includes('boredom') ||
    titleLower.includes('boredom') ||
    titleLower.includes('play')
  ) {
    return {
      subtitle:
        'Unlocking creative synaptic arborization by allowing healthy, unstructured boredom.',
      script:
        "It's okay to feel bored. Boredom is just your brain clearing space for a brand new idea to arrive.",
    };
  }

  return {
    subtitle:
      lesson.reliefTagline ||
      `Actionable developmental neurobiology and parent dialogue for ${lesson.title.toLowerCase()}.`,
    script:
      "I see how hard this moment is. We don't have to figure it all out at once - let's take one calm breath and work through it together.",
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
 * Interactive Almanac v2: Course Episode Arc View (PLAN-48)
 *
 * Calm, sequential 3-4 episode roadmap matching indexv2.html:
 * - Distinct EpisodeRole eyebrows (The Fast Win, The Brain Decoder, The Rhythm Reset, The Long-Term Bond)
 * - Child-calibrated episode headlines via interpolateChildCopy()
 * - Interactive highlight pills & Saved status
 * - Direct 1-tap navigation into each episode (no accordion clutter)
 * - Bottom-only Optional Course Master Talk Shelf when module.featuredVideoLecture is present
 */
export function BiteSizedCourseDetailView({
  module,
  activeChild,
  className,
}: BiteSizedCourseDetailViewProps) {
  const [localCompletedSet, setLocalCompletedSet] = React.useState<Set<string>>(
    new Set()
  );

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocalCompletedSet(getLocalCompletedLessonIds());
    }
  }, []);

  const t = React.useCallback(
    (template: string) =>
      interpolateChildCopy(template, activeChild, module.developmentalTier),
    [activeChild, module.developmentalTier]
  );

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
  const completedCount = allLessons.filter((l) => l.isCompleted).length;
  const remainingLessonsCount = totalLessons - completedCount;
  const isModuleCompleted =
    module.isCompleted || (totalLessons > 0 && completedCount === totalLessons);

  const nextEpisode =
    allLessons.find((l) => !l.isCompleted) ?? allLessons[0] ?? null;

  const remainingMinutes = allLessons
    .filter((l) => !l.isCompleted)
    .reduce((sum, l) => sum + (l.readingMinutes || 3), 0);

  return (
    <div
      data-testid="bite-sized-stream-view"
      className={cn(
        '-mx-4 -my-6 sm:-mx-6 lg:-mx-8 min-h-screen bg-[var(--canvas)] text-[var(--ink)] font-sans pb-20 xl:border-x xl:border-[var(--hairline-soft)] transition-colors',
        className
      )}
    >
      {/* Sticky Almanac Top Sub-Header */}
      <header className="sticky top-16 z-30 border-b border-[var(--hairline-soft)] bg-[var(--canvas)]">
        <div className="mx-auto flex h-[58px] max-w-[780px] items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            href="/academy"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[13px] font-medium text-[var(--body)] transition-colors hover:text-[var(--ink)] no-underline"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span>Parent Academy</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-[12px]">
            <span className="font-semibold text-[var(--spruce)]">
              {completedCount} of {totalLessons} done
            </span>
            <span className="text-[var(--hairline)]" aria-hidden="true">
              ·
            </span>
            <span className="text-[var(--mute)]">~{remainingMinutes}m left</span>
          </div>
        </div>
      </header>

      {/* Main Course Episode Arc Canvas */}
      <main className="mx-auto max-w-[780px] px-4 sm:px-6 pt-10 sm:pt-12 space-y-9">
        {/* Editorial Course Masthead */}
        <section className="space-y-3">
          <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--spruce)]">
            {totalLessons}-Episode Course Arc
          </span>
          <h1 className="font-serif-almanac text-[30px] sm:text-[38px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--ink)]">
            {formatCourseTitle(module.title)}
          </h1>
          <p className="text-[16px] leading-[1.6] text-[var(--body)] max-w-[60ch]">
            {t(module.summary)}
          </p>
        </section>

        {/* Sequential Episode Arc Cards */}
        <section className="space-y-4" aria-label="Course Curriculum">
          <div className="flex items-center justify-between font-mono text-[11.5px]">
            <span className="font-semibold uppercase tracking-[0.06em] text-[var(--ink)]">
              Course Curriculum
            </span>
            <span className="font-medium text-[var(--spruce)]">
              {remainingLessonsCount > 0
                ? `${remainingLessonsCount} episode${remainingLessonsCount === 1 ? '' : 's'} remaining`
                : 'All episodes saved'}
            </span>
          </div>

          <div className="grid gap-4" data-testid="curriculum-lessons-list">
            {allLessons.map((lesson, idx) => {
              const epNum = idx + 1;
              const role =
                lesson.episodeRole ??
                resolveEpisodeRoleFromSortOrder(lesson.sortOrder || epNum);
              const roleMeta = getEpisodeRoleMeta(role);
              const isCompleted = lesson.isCompleted;
              const isNextUp =
                !isModuleCompleted && nextEpisode?.id === lesson.id;
              const takeaway = resolveLessonTakeaway(lesson, module.title);
              const interpolatedTitle = t(lesson.title);
              const interpolatedHook = t(
                lesson.reliefTagline || takeaway.subtitle
              );

              return (
                <Link
                  key={lesson.id}
                  href={`/academy/${module.slug}/${lesson.slug}`}
                  data-testid={`lesson-card-${lesson.id}`}
                  className={cn(
                    'group grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-5 rounded-[16px] border p-5 sm:p-6 transition-all duration-200 no-underline',
                    isNextUp
                      ? 'border-[var(--spruce-border)] bg-[var(--elevated)] ring-1 ring-[var(--spruce-border)] shadow-sm hover:border-[var(--spruce)] hover:-translate-y-0.5 hover:shadow-md'
                      : isCompleted
                        ? 'border-[var(--hairline)] bg-[var(--canvas-subtle)] opacity-85 hover:opacity-100 hover:border-[var(--spruce-border)]'
                        : 'border-[var(--hairline)] bg-[var(--elevated)] hover:border-[var(--spruce)] hover:-translate-y-0.5 hover:shadow-md'
                  )}
                >
                  <div className="min-w-0">
                    {/* Distinct Episode Role Eyebrow */}
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        data-testid={`episode-role-badge-${epNum}`}
                        className={cn(
                          'font-mono text-[11px] font-semibold uppercase tracking-[0.05em]',
                          roleMeta.accent === 'amber'
                            ? 'text-[var(--amber)]'
                            : 'text-[var(--spruce)]'
                        )}
                      >
                        Episode {epNum} · {roleMeta.label}
                      </span>

                      {isNextUp && (
                        <span className="rounded-full bg-[var(--spruce-soft)] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--spruce)]">
                          Up Next
                        </span>
                      )}

                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--spruce-border)] bg-[var(--spruce-soft)] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--spruce)]">
                          <Check className="h-3 w-3" aria-hidden="true" />
                          <span>Saved</span>
                        </span>
                      )}
                    </div>

                    {/* Newsreader Episode Headline */}
                    <h2
                      className={cn(
                        'font-serif-almanac text-[21px] sm:text-[23px] font-semibold leading-[1.24] mb-2 transition-colors',
                        isCompleted
                          ? 'text-[var(--body)]'
                          : 'text-[var(--ink)] group-hover:text-[var(--spruce)]'
                      )}
                    >
                      {interpolatedTitle}
                    </h2>

                    {/* Concise Parent Hook */}
                    <p className="text-[14.5px] leading-[1.55] text-[var(--body)] mb-3 m-0">
                      {interpolatedHook}
                    </p>

                    {/* Signature Meta & Interactive Highlights */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px] text-[var(--mute)]">
                      <span className="font-mono text-[11.5px] tabular-nums">
                        {lesson.readingMinutes || 3} min read
                      </span>

                      {lesson.interactiveHighlights?.map((tag, tagIdx) => (
                        <React.Fragment key={`${tag}-${tagIdx}`}>
                          <span
                            className="text-[var(--hairline)]"
                            aria-hidden="true"
                          >
                            ·
                          </span>
                          <span className="text-[var(--body)] font-medium">
                            {t(tag)}
                          </span>
                        </React.Fragment>
                      ))}

                      {lesson.videoLecture && (
                        <>
                          <span
                            className="text-[var(--hairline)]"
                            aria-hidden="true"
                          >
                            ·
                          </span>
                          <span className="font-medium text-[var(--amber)]">
                            {lesson.videoLecture.durationMinutes}-min talk below
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Direct Action Pill */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0">
                    <span
                      className={cn(
                        'inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all',
                        isNextUp
                          ? 'bg-[var(--spruce)] text-[var(--elevated)] group-hover:bg-[var(--spruce-hover)]'
                          : isCompleted
                            ? 'border border-[var(--hairline)] bg-[var(--elevated)] text-[var(--body)] group-hover:border-[var(--spruce-border)] group-hover:text-[var(--ink)]'
                            : 'border border-[var(--hairline)] bg-[var(--canvas-subtle)] text-[var(--ink)] group-hover:border-[var(--spruce)] group-hover:bg-[var(--spruce-soft)] group-hover:text-[var(--spruce)]'
                      )}
                    >
                      <span>
                        {isCompleted
                          ? 'Review'
                          : isNextUp
                            ? 'Start Episode'
                            : 'Open'}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom-Only Optional Course Master Talk Shelf */}
        {module.featuredVideoLecture && (
          <AlmanacVideoShelf
            video={module.featuredVideoLecture}
            kickerLabel="Optional · Course Master Talk"
            t={t}
          />
        )}

        {/* Quiet Evidence-Based Reassurance Footer */}
        <footer className="border-t border-[var(--hairline)] pt-5 text-center font-mono text-[12px] text-[var(--mute)]">
          <span>Evidence-based pediatric framework · AlongSide Editorial</span>
        </footer>
      </main>
    </div>
  );
}
