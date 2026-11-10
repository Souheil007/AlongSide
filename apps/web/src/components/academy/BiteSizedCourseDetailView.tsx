'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, X } from 'lucide-react';
import type {
  AcademyLessonSummaryDTO,
  AcademyModuleDetailDTO,
} from '@alongside/shared';
import { getTierStageName } from '@/components/academy/ActiveChildCalibrationBanner';
import { normalizeChildTier } from '@/components/academy/AcademyCatalogClient';
import { getTierBadgeInfo } from '@/components/academy/ModuleCard';
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
  moduleTitle?: string
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

  // Dynamic fallback for any other lesson
  return {
    subtitle: `Actionable developmental guidance and communication scripts for ${lesson.title.toLowerCase()}.`,
    script:
      'We are a team figuring this out together. Your wellbeing always comes before any screen or rule.',
  };
}

/**
 * Direction A2: Bite-Sized Micro-Stream Course Detail View
 * Codified from prototype-a2-bite-sized-stream.html (Taste 2: Editorial Pediatric Almanac)
 *
 * Replaces academic taxonomy with Tonight vs. Weekend chunking:
 * - Masthead with Newsreader serif typography & quiet child calibration tag
 * - Part 1 · Quick Wins for Tonight:
 *   - Compact checklist of completed lessons
 *   - Elevated "Tonight's Objective" hero focus card with clinician script
 *   - 1-click launch CTA & interactive 90-second spoken audio briefing player
 * - Part 2 · Habits for this Weekend:
 *   - Clean, fluid lesson rows with micro-durations
 * - Evidence-based pediatric reassurance footer
 */
export function BiteSizedCourseDetailView({
  module,
  activeChild,
  className,
}: BiteSizedCourseDetailViewProps) {
  const [isAudioOpen, setIsAudioOpen] = React.useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = React.useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = React.useState<number>(14);
  const [playbackRate, setPlaybackRate] = React.useState<number>(1.0);
  const totalAudioSeconds = 105; // 1:45

  // Interactive audio timer
  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isAudioPlaying) {
      timer = setInterval(() => {
        setPlaybackSeconds((prev) => {
          if (prev >= totalAudioSeconds) {
            setIsAudioPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAudioPlaying, playbackRate]);

  const togglePlaybackRate = () => {
    setPlaybackRate((prev) => (prev === 1.0 ? 1.5 : prev === 1.5 ? 2.0 : 1.0));
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder.toString().padStart(2, '0')}`;
  };

  const allLessons: AcademyLessonSummaryDTO[] = React.useMemo(() => {
    if (module.lessons && module.lessons.length > 0) {
      return [...module.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
    }
    if (module.chapters && module.chapters.length > 0) {
      return module.chapters
        .flatMap((c) => c.lessons || [])
        .sort((a, b) => a.sortOrder - b.sortOrder);
    }
    return [];
  }, [module.lessons, module.chapters]);

  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => l.isCompleted);
  const completedCount = completedLessons.length;
  const isModuleCompleted =
    module.isCompleted || (totalLessons > 0 && completedCount === totalLessons);

  // The hero lesson is the first uncompleted lesson, or the first lesson if none or all completed
  const heroLesson =
    allLessons.find((l) => !l.isCompleted) || allLessons[0];

  // Calculate remaining reading minutes
  const remainingMinutes = allLessons
    .filter((l) => !l.isCompleted)
    .reduce((sum, l) => sum + (l.readingMinutes || 3), 0);

  // Chunking into Part 1 (Tonight) vs Part 2 (Weekend):
  // If <= 6 lessons, Part 1 is the first 3 lessons (or up to the hero lesson if deeper).
  // If > 6 lessons, Part 1 is the first half or up to the hero lesson.
  const part1Threshold = Math.max(3, heroLesson ? heroLesson.sortOrder : 3);
  const part1Lessons = allLessons.filter((l) => l.sortOrder <= part1Threshold);
  const part2Lessons = allLessons.filter((l) => l.sortOrder > part1Threshold);

  const completedInPart1 = part1Lessons.filter(
    (l) => l.isCompleted && (!heroLesson || l.id !== heroLesson.id)
  );
  const remainingInPart1 = part1Lessons.filter((l) => !l.isCompleted).length;

  const part2ReadingMinutes = part2Lessons.reduce(
    (acc, l) => acc + (l.readingMinutes || 3),
    0
  );

  // Child calibration check
  const activeChildTier = activeChild
    ? normalizeChildTier(activeChild.developmentalTier, activeChild.age)
    : null;
  const moduleNormalizedTier = normalizeChildTier(module.developmentalTier);
  const isTierMatch = Boolean(activeChild && activeChildTier === moduleNormalizedTier);
  const tierInfo = getTierBadgeInfo(module.developmentalTier);

  // Resolve takeaway for the hero lesson
  const heroTakeaway = heroLesson
    ? resolveLessonTakeaway(heroLesson, module.title)
    : {
        subtitle: module.summary,
        script:
          'We protect your sleep because we love your growing brain. The dock is for all phones, including mine.',
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
          <div
            data-testid="active-child-stage-match"
            className="flex items-center gap-2 text-xs font-mono text-mute"
          >
            <span className="text-spruce font-semibold uppercase tracking-wider">
              {tierInfo.label}
            </span>
            <span className="text-hairline">/</span>
            {isTierMatch && activeChild ? (
              <span data-testid="stage-match-calibrated" className="text-body font-medium">
                Calibrated for {activeChild.name}
              </span>
            ) : activeChild ? (
              <span data-testid="stage-match-mismatch" className="text-amber-800">
                Active child: {activeChild.name} ({getTierStageName(activeChild.developmentalTier)})
              </span>
            ) : (
              <span>Evidence-based pediatric framework</span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink tracking-tight leading-snug">
            {module.title}
          </h1>

          <p className="text-body text-sm leading-relaxed">
            {module.summary}
          </p>

          {/* 3 Core Walkaways / Takeaways */}
          <div
            data-testid="core-takeaways-card"
            className="rounded-xl border border-hairline/80 bg-white p-4 space-y-2.5 shadow-2xs"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-spruce uppercase tracking-wider">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-spruce/10 text-spruce text-[11px]">
                ★
              </span>
              <span>3 Core Course Takeaways</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-body font-sans">
              <div className="rounded-lg bg-linen-subtle/70 p-2.5 border border-hairline/40 space-y-1">
                <span className="font-mono text-[10px] font-bold text-spruce uppercase tracking-wider block">
                  1. Biological Root
                </span>
                <p className="leading-snug text-ink/90">
                  Understand the neurobiological cause behind your child&apos;s behavior.
                </p>
              </div>
              <div className="rounded-lg bg-linen-subtle/70 p-2.5 border border-hairline/40 space-y-1">
                <span className="font-mono text-[10px] font-bold text-spruce uppercase tracking-wider block">
                  2. Verbatim Scripts
                </span>
                <p className="leading-snug text-ink/90">
                  Tested dialogue scripts with tone and posture delivery tips.
                </p>
              </div>
              <div className="rounded-lg bg-linen-subtle/70 p-2.5 border border-hairline/40 space-y-1">
                <span className="font-mono text-[10px] font-bold text-spruce uppercase tracking-wider block">
                  3. Action Protocol
                </span>
                <p className="leading-snug text-ink/90">
                  Step-by-step household routines and printable guidelines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: TONIGHT'S WINS (The Immediate Focus) */}
        <section className="space-y-3" aria-label="Part 1 · Quick Wins for Tonight">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-spruce shrink-0" />
              Part 1 · Quick Wins for Tonight
            </span>
            <span className="text-spruce font-medium">
              {remainingInPart1 > 0
                ? `${remainingInPart1} lesson${remainingInPart1 === 1 ? '' : 's'} remaining`
                : 'All complete'}
            </span>
          </div>

          {/* Quick Checklist of Completed Lessons in Part 1 */}
          {completedInPart1.length > 0 && (
            <div
              data-testid="completed-checklist"
              className="rounded-xl border border-hairline/80 bg-white divide-y divide-hairline/50 overflow-hidden shadow-2xs"
            >
              {completedInPart1.map((lesson) => (
                <div
                  key={lesson.id}
                  className="px-4 py-2.5 flex items-center justify-between text-xs font-mono text-mute hover:bg-linen-subtle/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="text-spruce font-bold shrink-0">✓</span>
                    <span className="line-through decoration-hairline text-mute truncate">
                      {lesson.sortOrder}. {lesson.title}
                    </span>
                  </div>
                  <Link
                    href={`/academy/${module.slug}/${lesson.slug}`}
                    className="text-[11px] text-spruce hover:underline shrink-0"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* THE TONIGHT HERO FOCUS CARD */}
          {heroLesson && (
            <div
              data-testid="hero-focus-card"
              className="rounded-2xl border-2 border-spruce/30 bg-spruce-soft/40 p-5 sm:p-6 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 rounded-full bg-spruce text-white text-[10px] font-semibold tracking-wide uppercase">
                  {isModuleCompleted ? 'Course Completed · Review' : "Tonight's Objective"}
                </span>
                <span className="text-spruce font-medium">
                  {heroLesson.readingMinutes || 3} min read
                </span>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-ink leading-tight">
                  {heroLesson.sortOrder}. {heroLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-body leading-relaxed mt-1.5">
                  {heroTakeaway.subtitle}
                </p>
              </div>

              {/* Empathetic / Clinician Script Box */}
              <div className="bg-white/90 rounded-xl p-3 border border-spruce/20 text-xs shadow-2xs">
                <span className="text-[10px] font-mono font-semibold uppercase text-spruce tracking-wider block mb-1">
                  Empathetic Script to Use
                </span>
                <p className="font-serif italic text-ink text-sm">
                  &ldquo;{heroTakeaway.script}&rdquo;
                </p>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={`/academy/${module.slug}/${heroLesson.slug}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-spruce hover:bg-spruce-hover text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <span>
                    {heroLesson.isCompleted ? 'Review' : 'Start'} Lesson {heroLesson.sortOrder} (
                    {heroLesson.readingMinutes || 3} min)
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

                <button
                  type="button"
                  data-testid="audio-briefing-toggle"
                  onClick={() => setIsAudioOpen(!isAudioOpen)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-linen-subtle border border-hairline text-xs font-mono text-body transition-colors shadow-2xs"
                >
                  <svg
                    className="w-3.5 h-3.5 text-spruce"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  <span>{isAudioOpen ? 'Hide Audio' : 'Audio (1:45)'}</span>
                </button>
              </div>

              {/* Spoken Audio Briefing Panel */}
              {isAudioOpen && (
                <div
                  data-testid="spoken-audio-briefing-panel"
                  className="rounded-xl border border-spruce/20 bg-white p-4 space-y-3 shadow-xs animate-in fade-in duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-spruce text-white">
                        <Play className="h-3 w-3 fill-white" />
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-ink">
                          Pediatrician Spoken Executive Briefing
                        </h4>
                        <p className="text-[10px] font-mono text-mute">
                          Dr. Aris Thorne, MD · 90-Second Micro-Briefing
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAudioOpen(false)}
                      className="text-mute hover:text-ink text-xs p-1"
                      aria-label="Close audio player"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Interactive Audio Scrubber & Controls */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                      className="h-8 w-8 rounded-full bg-spruce hover:bg-spruce-hover text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                      aria-label={isAudioPlaying ? 'Pause audio' : 'Play audio'}
                    >
                      {isAudioPlaying ? (
                        <Pause className="h-3.5 w-3.5" />
                      ) : (
                        <Play className="h-3.5 w-3.5 fill-white" />
                      )}
                    </button>
                    <div className="flex-1 space-y-1">
                      <div
                        data-testid="audio-scrubber"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={totalAudioSeconds}
                        aria-valuenow={playbackSeconds}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickPos = (e.clientX - rect.left) / rect.width;
                          setPlaybackSeconds(Math.round(clickPos * totalAudioSeconds));
                        }}
                        className="h-2 w-full bg-linen-subtle rounded-full overflow-hidden cursor-pointer"
                      >
                        <div
                          className="h-full bg-spruce transition-all duration-150 rounded-full"
                          style={{ width: `${Math.min(100, (playbackSeconds / totalAudioSeconds) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-mute">
                        <span>{formatSeconds(playbackSeconds)}</span>
                        <span>{formatSeconds(totalAudioSeconds)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={togglePlaybackRate}
                      className="flex items-center gap-1 text-[10px] font-mono bg-linen-subtle hover:bg-hairline px-2 py-1 rounded text-body cursor-pointer transition-colors"
                      title="Toggle playback speed"
                    >
                      <span>{playbackRate.toFixed(1)}x</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* SECTION 2: HABITS FOR THIS WEEKEND (Progressive & Fluid) */}
        {part2Lessons.length > 0 && (
          <section
            className="space-y-3 pt-4 border-t border-hairline"
            aria-label="Part 2 · Habits for this Weekend"
          >
            <div className="flex items-center justify-between text-xs font-mono text-mute">
              <span className="font-bold text-ink uppercase tracking-wider">
                Part 2 · Habits for this Weekend
              </span>
              <span>
                {part2Lessons.length} {part2Lessons.length === 1 ? 'lesson' : 'lessons'} · ~
                {part2ReadingMinutes}m
              </span>
            </div>

            <div className="space-y-2">
              {part2Lessons.map((lesson) => {
                const takeaway = resolveLessonTakeaway(lesson, module.title);
                return (
                  <Link
                    key={lesson.id}
                    href={`/academy/${module.slug}/${lesson.slug}`}
                    className="rounded-xl border border-hairline bg-white p-3.5 flex items-center justify-between gap-3 group hover:border-spruce/40 transition-colors shadow-2xs"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span
                        className={cn(
                          'h-6 w-6 rounded-full text-xs font-mono flex items-center justify-center shrink-0 transition-colors',
                          lesson.isCompleted
                            ? 'bg-spruce text-white font-bold'
                            : 'bg-linen-subtle text-mute group-hover:bg-spruce-soft group-hover:text-spruce'
                        )}
                      >
                        {lesson.isCompleted ? '✓' : lesson.sortOrder}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-medium text-ink group-hover:text-spruce transition-colors truncate">
                          {lesson.title}
                        </h3>
                        <p className="text-[11px] text-mute line-clamp-1">
                          {takeaway.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-mute shrink-0 group-hover:text-spruce transition-colors">
                      {lesson.readingMinutes || 3}m →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Calming Footer Reassurance */}
        <footer className="pt-4 border-t border-hairline text-center text-xs font-mono text-mute">
          <span>Evidence-based pediatric framework · Dr. Aris Thorne, MD</span>
        </footer>
      </main>
    </div>
  );
}
