'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, X } from 'lucide-react';
import {
  formatCourseTitle,
  type AcademyLessonSummaryDTO,
  type AcademyModuleDetailDTO,
} from '@alongside/shared';
import { getLocalCompletedLessonIds } from '@/lib/api/academy';
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
  const [selectedLessonId, setSelectedLessonId] = React.useState<string | null>(null);
  const heroFocusCardRef = React.useRef<HTMLDivElement | null>(null);

  const [isAudioOpen, setIsAudioOpen] = React.useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = React.useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = React.useState<number>(0);
  const [playbackRate, setPlaybackRate] = React.useState<number>(1.0);
  const totalAudioSeconds = 105; // 1:45

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
  const isModuleCompleted =
    module.isCompleted || (totalLessons > 0 && completedCount === totalLessons);

  // The hero lesson is the first uncompleted lesson, or the first lesson if none or all completed
  const heroLesson = allLessons.find((l) => !l.isCompleted) || allLessons[0];

  // The currently focused/opened lesson in the hero card box
  const activeFocusLesson =
    (selectedLessonId ? allLessons.find((l) => l.id === selectedLessonId) : null) ||
    heroLesson ||
    allLessons[0];

  // Calculate remaining reading minutes across uncompleted lessons
  const remainingMinutes = allLessons
    .filter((l) => !l.isCompleted)
    .reduce((sum, l) => sum + (l.readingMinutes || 3), 0);

  // Chunking into Part 1 (Tonight) vs Part 2 (Weekend)
  const part1Threshold = Math.max(3, heroLesson ? heroLesson.sortOrder : 3);
  const part1Lessons = allLessons.filter((l) => l.sortOrder <= part1Threshold);
  const part2Lessons = allLessons.filter((l) => l.sortOrder > part1Threshold);

  // In Part 1, completed lessons can be clicked to reopen that lesson in the focus card
  const completedInPart1 = part1Lessons.filter(
    (l) => l.isCompleted && (!activeFocusLesson || l.id !== activeFocusLesson.id)
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

  // Resolve takeaway for the active focused lesson
  const activeTakeaway = activeFocusLesson
    ? resolveLessonTakeaway(activeFocusLesson, module.title)
    : {
        subtitle: module.summary,
        script:
          'We protect your sleep because we love your growing brain. The dock is for all phones, including mine.',
      };

  // Handler to select and open any lesson in the hero focus card
  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsAudioPlaying(false);
    setPlaybackSeconds(0);
    heroFocusCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // Real SpeechSynthesis Audio Engine
  const audioText = React.useMemo(() => {
    if (!activeFocusLesson) return '';
    return `Pediatrician executive briefing for lesson ${activeFocusLesson.sortOrder}: ${activeFocusLesson.title}. ${activeTakeaway.subtitle}. Script to remember: ${activeTakeaway.script}`;
  }, [activeFocusLesson, activeTakeaway]);

  const toggleAudioPlay = () => {
    if (typeof window === 'undefined') return;

    if (!('speechSynthesis' in window)) {
      // Fallback timer simulation
      setIsAudioPlaying((prev) => !prev);
      return;
    }

    if (isAudioPlaying) {
      window.speechSynthesis.pause();
      setIsAudioPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsAudioPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(audioText);
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

        utterance.onend = () => {
          setIsAudioPlaying(false);
          setPlaybackSeconds(0);
        };
        utterance.onerror = () => {
          setIsAudioPlaying(false);
        };
        utterance.onboundary = (e) => {
          if (e.charIndex) {
            const ratio = e.charIndex / Math.max(1, audioText.length);
            setPlaybackSeconds(Math.min(totalAudioSeconds, Math.round(ratio * totalAudioSeconds)));
          }
        };

        window.speechSynthesis.speak(utterance);
        setIsAudioPlaying(true);
      }
    }
  };

  // Stop speech on unmount
  React.useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Timer simulation fallback if speech synthesis is not emitting boundaries
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
    const nextRate = playbackRate === 1.0 ? 1.5 : playbackRate === 1.5 ? 2.0 : 1.0;
    setPlaybackRate(nextRate);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isAudioPlaying) {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(false);
      setPlaybackSeconds(0);
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder.toString().padStart(2, '0')}`;
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

          {/* Quick Checklist of Completed Lessons in Part 1 - Clickable to open in hero focus card */}
          {completedInPart1.length > 0 && (
            <div
              data-testid="completed-checklist"
              className="rounded-xl border border-hairline/80 bg-white divide-y divide-hairline/50 overflow-hidden shadow-2xs"
            >
              {completedInPart1.map((lesson) => {
                const isSelected = activeFocusLesson?.id === lesson.id;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.id)}
                    role="button"
                    tabIndex={0}
                    className={cn(
                      'px-4 py-2.5 flex items-center justify-between text-xs font-mono transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-spruce-soft/50 font-semibold text-spruce'
                        : 'text-mute hover:bg-linen-subtle/50'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="text-spruce font-bold shrink-0">✓</span>
                      <span className="line-through decoration-hairline text-mute truncate">
                        {lesson.sortOrder}. {lesson.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-spruce hover:underline shrink-0 font-sans">
                      {isSelected ? 'Open in box ↑' : 'Review'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* THE TONIGHT HERO FOCUS CARD (Dynamic for any opened/selected lesson) */}
          {activeFocusLesson && (
            <div
              ref={heroFocusCardRef}
              data-testid="hero-focus-card"
              className="rounded-2xl border-2 border-spruce/30 bg-spruce-soft/40 p-5 sm:p-6 space-y-4 shadow-xs transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 rounded-full bg-spruce text-white text-[10px] font-semibold tracking-wide uppercase">
                  {activeFocusLesson.isCompleted
                    ? 'Course Completed · Review'
                    : activeFocusLesson.id === heroLesson?.id && !isModuleCompleted
                      ? "Tonight's Objective"
                      : `Lesson ${activeFocusLesson.sortOrder} Objective`}
                </span>
                <span className="text-spruce font-medium">
                  {activeFocusLesson.readingMinutes || 3} min read
                </span>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-ink leading-tight">
                  {activeFocusLesson.sortOrder}. {activeFocusLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-body leading-relaxed mt-1.5">
                  {activeTakeaway.subtitle}
                </p>
              </div>

              {/* Empathetic / Clinician Script Box */}
              <div className="bg-white/90 rounded-xl p-3 border border-spruce/20 text-xs shadow-2xs">
                <span className="text-[10px] font-mono font-semibold uppercase text-spruce tracking-wider block mb-1">
                  Empathetic Script to Use
                </span>
                <p className="font-serif italic text-ink text-sm">
                  &ldquo;{activeTakeaway.script}&rdquo;
                </p>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={`/academy/${module.slug}/${activeFocusLesson.slug}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-spruce hover:bg-spruce-hover text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <span>
                    {activeFocusLesson.isCompleted ? 'Review' : 'Start'} Lesson {activeFocusLesson.sortOrder} (
                    {activeFocusLesson.readingMinutes || 3} min)
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
                  onClick={() => {
                    const next = !isAudioOpen;
                    setIsAudioOpen(next);
                    if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                      setIsAudioPlaying(false);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-linen-subtle border border-hairline text-xs font-mono text-body transition-colors shadow-2xs cursor-pointer"
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
                      onClick={() => {
                        setIsAudioOpen(false);
                        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          setIsAudioPlaying(false);
                        }
                      }}
                      className="text-mute hover:text-ink text-xs p-1 cursor-pointer"
                      aria-label="Close audio player"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Interactive Audio Scrubber & Controls */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={toggleAudioPlay}
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

        {/* SECTION 2: HABITS FOR THIS WEEKEND (Progressive & Fluid) - Clicking opens that lesson in focus box */}
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
                const isSelected = activeFocusLesson?.id === lesson.id;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.id)}
                    role="button"
                    tabIndex={0}
                    className={cn(
                      'rounded-xl border p-3.5 flex items-center justify-between gap-3 group transition-colors shadow-2xs cursor-pointer',
                      isSelected
                        ? 'border-spruce bg-spruce-soft/30 ring-1 ring-spruce/40'
                        : 'border-hairline bg-white hover:border-spruce/40'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span
                        className={cn(
                          'h-6 w-6 rounded-full text-xs font-mono flex items-center justify-center shrink-0 transition-colors',
                          lesson.isCompleted
                            ? 'bg-spruce text-white font-bold'
                            : isSelected
                              ? 'bg-spruce text-white font-semibold'
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
                      {lesson.readingMinutes || 3}m {isSelected ? '• Open in box ↑' : '→'}
                    </span>
                  </div>
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
