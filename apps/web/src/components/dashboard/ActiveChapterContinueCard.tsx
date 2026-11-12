'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  ArrowRight,
  Check,
} from 'lucide-react';
import {
  DevelopmentalTier,
  ChapterPriority,
  AcademyCategory,
  type ChildDTO,
} from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { getAcademyModules, getAcademyModuleBySlug } from '@/lib/api/academy';
import { useChildAge } from '@/hooks/useChildAge';
import { cn } from '@/lib/utils';

export interface ActiveChapterContinueCardProps {
  child: ChildDTO | null;
  className?: string;
}

interface TierPriorityAnchor {
  moduleSlug: string;
  lessonSlug: string;
  courseTitle: string;
  chapterTitle: string;
  category: AcademyCategory;
  categoryLabel: string;
  priority: number;
  readingMinutes: number;
  totalChapters: number;
  completedChapters: number;
  summary: string;
  chapters: { id: number; shortTitle: string; fullTitle: string; completed: boolean; isCurrent: boolean }[];
  audioDuration: string;
}

export const TIER_PRIORITY_ANCHORS: Record<string, TierPriorityAnchor> = {
  [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]: {
    moduleSlug: 'behavior-infant-coregulation',
    lessonSlug: 'infant-sensory-coregulation',
    courseTitle: 'Sensory Overload & Infant Co-Regulation: Taming Big Feelings',
    chapterTitle: 'Chapter 1: The Immature Amygdala & Attachment',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    categoryLabel: 'Behavior & Emotions',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 4,
    totalChapters: 5,
    completedChapters: 1,
    summary:
      'Why reasoning with a 3-year-old during a tantrum never works, and the simple physical bridge that brings their nervous system back to safety.',
    chapters: [
      { id: 1, shortTitle: 'Ch 1: Amygdala Basics', fullTitle: 'Pre-Verbal Tantrum Biology', completed: true, isCurrent: false },
      { id: 2, shortTitle: 'Ch 2: Tantrum Reset', fullTitle: 'The 30-Second Calm Down Breath', completed: false, isCurrent: true },
      { id: 3, shortTitle: 'Ch 3: Screen Off Deal', fullTitle: 'Transition Without Meltdowns', completed: false, isCurrent: false },
      { id: 4, shortTitle: 'Ch 4: Sleep Sanctuary', fullTitle: 'Bedtime Sensory Calming', completed: false, isCurrent: false },
      { id: 5, shortTitle: 'Ch 5: Secure Repair', fullTitle: 'Physical Anchor & Reconnection', completed: false, isCurrent: false },
    ],
    audioDuration: '3:15',
  },
  [DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6]: {
    moduleSlug: 'behavior-preschool-feelings',
    lessonSlug: 'preschool-impulse-control',
    courseTitle: 'Preschool Big Feelings & Theory of Mind',
    chapterTitle: 'Chapter 1: Amygdala Tantrum De-escalation',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    categoryLabel: 'Behavior & Emotions',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 4,
    totalChapters: 5,
    completedChapters: 1,
    summary:
      'De-escalating post-screen dopamine drops and scaffolding emotional vocabulary before meltdowns erupt.',
    chapters: [
      { id: 1, shortTitle: 'Ch 1: Theory of Mind', fullTitle: 'Developing Empathy', completed: true, isCurrent: false },
      { id: 2, shortTitle: 'Ch 2: Screen Transitions', fullTitle: 'Post-Screen Dopamine Drops', completed: false, isCurrent: true },
      { id: 3, shortTitle: 'Ch 3: Sharing Frustration', fullTitle: 'Cooperative Play Skills', completed: false, isCurrent: false },
      { id: 4, shortTitle: 'Ch 4: Bedtime Stalling', fullTitle: 'Predictable Evening Routine', completed: false, isCurrent: false },
      { id: 5, shortTitle: 'Ch 5: Impulse Games', fullTitle: 'Freeze-Dance Inhibitory Control', completed: false, isCurrent: false },
    ],
    audioDuration: '3:30',
  },
  [DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]: {
    moduleSlug: 'behavior-elementary-impulses',
    lessonSlug: 'elementary-dopamine-crashes',
    courseTitle: 'Elementary Impulse Control & Sibling Dynamics',
    chapterTitle: 'Chapter 1: Post-Play Dopamine Crashes & Fair Mediation',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    categoryLabel: 'Behavior & Emotions',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 4,
    totalChapters: 5,
    completedChapters: 1,
    summary:
      'Neutral co-regulation for elementary sibling conflict and executive function scaffolding for homework initiation.',
    chapters: [
      { id: 1, shortTitle: 'Ch 1: Sibling Mediation', fullTitle: 'Fairness and De-escalation', completed: true, isCurrent: false },
      { id: 2, shortTitle: 'Ch 2: Dopamine Drops', fullTitle: 'Ending Video Game Sessions Calmly', completed: false, isCurrent: true },
      { id: 3, shortTitle: 'Ch 3: Homework Friction', fullTitle: 'Initiation and Focus Scaffolding', completed: false, isCurrent: false },
      { id: 4, shortTitle: 'Ch 4: Friendship Drama', fullTitle: 'Peer Conflict and Perspective Taking', completed: false, isCurrent: false },
      { id: 5, shortTitle: 'Ch 5: Bedtime Autonomy', fullTitle: 'Independent Sleep Rhythms', completed: false, isCurrent: false },
    ],
    audioDuration: '3:45',
  },
  [DevelopmentalTier.TIER_3_PRE_TEEN_10_12]: {
    moduleSlug: 'behavior-tween-neurobiology',
    lessonSlug: 'tween-neurobiology-and-adrenarche',
    courseTitle: 'Tween Adrenarche & Neurobiology Shift',
    chapterTitle: 'Chapter 1: The Adrenarche Shift & Peer Validation',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    categoryLabel: 'Behavior & Emotions',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 4,
    totalChapters: 5,
    completedChapters: 2,
    summary:
      'Why middle school emotional storms are biological, not bad behavior, and how to maintain empathetic connection during pubertal changes.',
    chapters: [
      { id: 1, shortTitle: 'Ch 1: The Shift', fullTitle: 'Adrenarche & the Changing Amygdala', completed: true, isCurrent: false },
      { id: 2, shortTitle: 'Ch 2: Peer Validation', fullTitle: 'Why Your Opinion Suddenly Vanished', completed: true, isCurrent: false },
      { id: 3, shortTitle: 'Ch 3: Exclusion (Today)', fullTitle: 'Peer Group Validation & Exclusion Anxiety', completed: false, isCurrent: true },
      { id: 4, shortTitle: 'Ch 4: Screen Pacts', fullTitle: 'Collaborative Tech Agreements', completed: false, isCurrent: false },
      { id: 5, shortTitle: 'Ch 5: Bedtime Trust', fullTitle: 'Protecting Sleep without Hostility', completed: false, isCurrent: false },
    ],
    audioDuration: '3:45',
  },
  [DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]: {
    moduleSlug: 'health-tween-circadian-leaps',
    lessonSlug: 'pubertal-circadian-melatonin',
    courseTitle: 'Pubertal Circadian Delay & Algorithmic Resistance',
    chapterTitle: 'Chapter 2: The 2-Hour Biological Melatonin Delay',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    categoryLabel: 'Pediatric Health & Sleep',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 5,
    totalChapters: 5,
    completedChapters: 1,
    summary:
      'Defend adolescent sleep architecture with the neutral 8:30 PM kitchen bed dock without adversarial fights.',
    chapters: [
      { id: 1, shortTitle: 'Ch 1: Sleep Architecture', fullTitle: 'Adolescent REM Cycles', completed: true, isCurrent: false },
      { id: 2, shortTitle: 'Ch 2: Melatonin Shift', fullTitle: 'The 2-Hour Biological Phase Delay', completed: false, isCurrent: true },
      { id: 3, shortTitle: 'Ch 3: Algorithmic Feeds', fullTitle: 'Resisting Variable Rewards', completed: false, isCurrent: false },
      { id: 4, shortTitle: 'Ch 4: Neutral Dock', fullTitle: 'The Living Room Hardware Lock', completed: false, isCurrent: false },
      { id: 5, shortTitle: 'Ch 5: Weekend Autonomy', fullTitle: 'Negotiating Digital Curfews', completed: false, isCurrent: false },
    ],
    audioDuration: '4:00',
  },
  [DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]: {
    moduleSlug: 'digital-tween-smartphone-pacts',
    lessonSlug: 'teen-digital-footprint-agency',
    courseTitle: 'Young Adult Sovereignty & Digital Footprints',
    chapterTitle: 'Chapter 3: Shifting from Parental Monitoring to Mentorship',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    categoryLabel: 'Modern Digital World',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 5,
    totalChapters: 5,
    completedChapters: 2,
    summary:
      'Collaborative coaching for adolescent autonomy, online reputation, and launch readiness into adulthood.',
    chapters: [
      { id: 1, shortTitle: 'Ch 1: Online Reputation', fullTitle: 'Permanent Digital Footprints', completed: true, isCurrent: false },
      { id: 2, shortTitle: 'Ch 2: Self-Regulation', fullTitle: 'Managing Notification Overload', completed: true, isCurrent: false },
      { id: 3, shortTitle: 'Ch 3: Mentorship Shift', fullTitle: 'From Monitoring to Partnership', completed: false, isCurrent: true },
      { id: 4, shortTitle: 'Ch 4: Young Adult Sovereignty', fullTitle: 'Autonomy and Launch Readiness', completed: false, isCurrent: false },
      { id: 5, shortTitle: 'Ch 5: Lifelong Boundaries', fullTitle: 'Sustained Digital Wellness', completed: false, isCurrent: false },
    ],
    audioDuration: '4:15',
  },
};

export function resolveTierAnchor(tierOrAge?: string | number | null): TierPriorityAnchor {
  if (!tierOrAge) {
    return TIER_PRIORITY_ANCHORS[DevelopmentalTier.TIER_3_PRE_TEEN_10_12]!;
  }

  if (typeof tierOrAge === 'string' && TIER_PRIORITY_ANCHORS[tierOrAge]) {
    return TIER_PRIORITY_ANCHORS[tierOrAge]!;
  }

  let age = typeof tierOrAge === 'number' ? tierOrAge : 10;
  if (typeof tierOrAge === 'string') {
    if (tierOrAge.includes('0_3') || tierOrAge.includes('TIER_0')) age = 2;
    else if (tierOrAge.includes('4_6') || tierOrAge.includes('TIER_1_EARLY')) age = 5;
    else if (tierOrAge.includes('7_9') || tierOrAge.includes('TIER_2_MIDDLE') || tierOrAge.includes('TIER_1_AGES_8_9')) age = 8;
    else if (tierOrAge.includes('10_12') || tierOrAge.includes('TIER_3_PRE_TEEN') || tierOrAge.includes('TIER_2_AGES_10_11')) age = 11;
    else if (tierOrAge.includes('13_15') || tierOrAge.includes('TIER_4_EARLY_ADOLESCENCE') || tierOrAge.includes('TIER_3_AGES_12_13')) age = 14;
    else if (tierOrAge.includes('16_18') || tierOrAge.includes('TIER_5_LATE') || tierOrAge.includes('TIER_4_AGES_14_PLUS')) age = 17;
  }

  if (age <= 3) return TIER_PRIORITY_ANCHORS[DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]!;
  if (age <= 6) return TIER_PRIORITY_ANCHORS[DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6]!;
  if (age <= 9) return TIER_PRIORITY_ANCHORS[DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]!;
  if (age <= 12) return TIER_PRIORITY_ANCHORS[DevelopmentalTier.TIER_3_PRE_TEEN_10_12]!;
  if (age <= 15) return TIER_PRIORITY_ANCHORS[DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]!;
  return TIER_PRIORITY_ANCHORS[DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]!;
}

/**
 * Format lesson titles into clean, concise human labels for roadmap nodes.
 * Extracts the punchy topic without clunky prefixes or generic chapter numbers.
 */
function formatLessonNodeTitle(rawTitle: string, index: number): string {
  if (!rawTitle) return `Lesson ${index + 1}`;

  // If title has a colon (e.g. "The 4-Step Somatic Soothing Sequence: Calming the Crying Storm")
  const parts = rawTitle.split(':');
  let main = parts[0]?.trim() ?? rawTitle;

  // Clean leading words
  main = main.replace(/^The\s+/i, '');
  main = main.replace(/^\d+-Step\s+/i, '');

  if (main.length > 22) {
    const sub = parts[1]?.trim();
    if (sub && sub.length <= 22) {
      return sub;
    }
    return main.slice(0, 20) + '…';
  }
  return main;
}

export function ActiveChapterContinueCard({
  child,
  className,
}: ActiveChapterContinueCardProps) {
  const childAge = useChildAge();
  const effectiveTier = (child?.developmentalTier ?? childAge.developmentalTier) as DevelopmentalTier;
  const fallbackAnchor = resolveTierAnchor(child?.developmentalTier ?? child?.age);

  // Fetch modules for this tier
  const { data: modules } = useQuery({
    queryKey: ['active-chapter-modules', effectiveTier],
    queryFn: () => getAcademyModules({ tier: effectiveTier }),
    staleTime: 5 * 60 * 1000,
  });

  const activeModule = (modules && modules.length > 0)
    ? (modules.find((m) => !m.isCompleted) ?? modules[0])
    : null;

  const activeModuleSlug = activeModule?.slug || fallbackAnchor.moduleSlug;

  // Query rich module hierarchy with real chapters and lesson completion flags
  const { data: moduleDetail } = useQuery({
    queryKey: ['academy-module-detail', activeModuleSlug],
    queryFn: () => getAcademyModuleBySlug(activeModuleSlug),
    enabled: Boolean(activeModuleSlug),
    staleTime: 5 * 60 * 1000,
  });

  const courseTitle = moduleDetail?.title ?? activeModule?.title ?? fallbackAnchor.courseTitle;
  const moduleSlug = moduleDetail?.slug ?? activeModule?.slug ?? fallbackAnchor.moduleSlug;
  const summary = moduleDetail?.summary ?? activeModule?.summary ?? fallbackAnchor.summary;

  const allLessons = moduleDetail?.lessons && moduleDetail.lessons.length > 0 ? moduleDetail.lessons : [];
  const currentIncompleteLesson = allLessons.find((l) => !l.isCompleted) || allLessons[0];

  const lessonSlug = currentIncompleteLesson?.slug ?? fallbackAnchor.lessonSlug;
  const lessonTitle = currentIncompleteLesson?.title ?? fallbackAnchor.chapterTitle.replace(/^Chapter \d+:\s*/, '');
  const readingMinutes = currentIncompleteLesson?.readingMinutes ?? fallbackAnchor.readingMinutes;

  const totalLessons = allLessons.length > 0 ? allLessons.length : fallbackAnchor.totalChapters;
  const completedLessons = allLessons.length > 0
    ? allLessons.filter((l) => l.isCompleted).length
    : (activeModule?.completedLessonCount ?? fallbackAnchor.completedChapters);
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Derive dynamic roadmap nodes directly from lessons
  const roadmapNodes = React.useMemo(() => {
    if (allLessons.length > 0) {
      let foundActive = false;
      return allLessons.map((les, idx) => {
        let isCurrent = false;
        if (!les.isCompleted && !foundActive) {
          isCurrent = true;
          foundActive = true;
        }
        return {
          id: idx + 1,
          title: formatLessonNodeTitle(les.title, idx),
          slug: les.slug,
          completed: les.isCompleted,
          isCurrent,
        };
      });
    }

    return fallbackAnchor.chapters.map((ch) => ({
      id: ch.id,
      title: ch.shortTitle.replace(/^Ch \d+:\s*/, ''),
      slug: fallbackAnchor.lessonSlug,
      completed: ch.completed,
      isCurrent: ch.isCurrent,
    }));
  }, [allLessons, fallbackAnchor]);

  return (
    <div
      className={cn(
        'rounded-[2.5rem] bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_10px_40px_-10px_rgba(20,61,43,0.05)] p-6 sm:p-10 space-y-7 transition-all hover:border-[#143D2B]/30',
        className
      )}
    >
      {/* 1. Top Header: Course Identification & Real-Time Progress Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5">
        <div className="flex items-center gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#143D2B] text-white font-bold shadow-sm">
            <BookOpen className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold text-[#143D2B] uppercase tracking-wider block">
              Parent Intelligence Academy • Active Course
            </span>
            <Link
              href={`/academy/${moduleSlug}`}
              className="font-serif text-lg sm:text-2xl font-bold text-[#111815] leading-snug hover:text-[#143D2B] hover:underline transition-colors block truncate"
            >
              {courseTitle}
            </Link>
          </div>
        </div>

        <div className="shrink-0 self-start sm:self-auto font-mono text-xs">
          <span className="inline-flex items-center text-xs font-bold text-[#143D2B] bg-[#EAF3EE] border border-emerald-900/10 px-3.5 py-1.5 rounded-full shadow-2xs">
            {progressPercent}% Completed ({completedLessons} of {totalLessons} Lessons)
          </span>
        </div>
      </div>

      {/* 2. Fully Dynamic Visual Curriculum Roadmap */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-[#143D2B] uppercase tracking-wider text-[11px]">
            Curriculum Roadmap
          </span>
          <span className="text-[#858C88] text-[11px]">
            Next Lesson: {readingMinutes} min read
          </span>
        </div>

        {/* Dynamic Connected Node Track */}
        <div className="relative pt-2 pb-3 overflow-x-auto">
          <div className="min-w-[520px] flex items-center justify-between relative px-6 sm:px-8">
            {/* Background Grey Track Line */}
            <div className="absolute left-8 right-8 top-5 h-1 bg-stone-200/80 -z-0" />
            {/* Real Progress Fill Line */}
            <div
              className="absolute left-8 top-5 h-1 bg-[#143D2B] -z-0 transition-all duration-500"
              style={{ width: `${Math.min(92, Math.max(0, (completedLessons / Math.max(1, totalLessons)) * 92))}%` }}
            />

            {roadmapNodes.map((node) => {
              if (node.completed) {
                return (
                  <Link
                    key={node.id}
                    href={`/academy/${moduleSlug}/${node.slug}`}
                    className="flex flex-col items-center gap-2 z-10 group/node cursor-pointer"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#143D2B] text-white font-mono text-xs font-bold flex items-center justify-center shadow-md ring-4 ring-[#EAF3EE] transition-transform group-hover/node:scale-110">
                      <Check className="w-4 h-4 text-emerald-300" />
                    </span>
                    <span className="font-mono text-[10px] text-[#143D2B] font-semibold text-center whitespace-nowrap max-w-[120px] truncate group-hover/node:underline">
                      {node.title}
                    </span>
                    <span className="font-mono text-[9px] text-[#143D2B]/70 font-medium">Completed</span>
                  </Link>
                );
              }

              if (node.isCurrent) {
                return (
                  <Link
                    key={node.id}
                    href={`/academy/${moduleSlug}/${node.slug}`}
                    className="flex flex-col items-center gap-2 z-10 group/node cursor-pointer"
                  >
                    <span className="w-11 h-11 -mt-0.5 rounded-full bg-[#143D2B] text-white font-mono text-sm font-black flex items-center justify-center shadow-xl ring-4 ring-emerald-300/80 animate-pulse transition-transform group-hover/node:scale-105">
                      <span className="text-emerald-300">{node.id}</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#143D2B] font-bold text-center whitespace-nowrap max-w-[130px] truncate group-hover/node:underline">
                      {node.title}
                    </span>
                    <span className="font-mono text-[9px] text-[#B45309] font-bold bg-[#FEF3C7] px-2 py-0.5 rounded-full shadow-2xs">Active Now</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={node.id}
                  href={`/academy/${moduleSlug}/${node.slug}`}
                  className="flex flex-col items-center gap-2 z-10 opacity-60 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <span className="w-10 h-10 rounded-full bg-white border-2 border-stone-300 text-stone-600 font-mono text-xs font-bold flex items-center justify-center shadow-2xs">
                    {node.id}
                  </span>
                  <span className="font-mono text-[10px] text-[#858C88] text-center whitespace-nowrap max-w-[120px] truncate">
                    {node.title}
                  </span>
                  <span className="font-mono text-[9px] text-[#858C88]">Upcoming</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Today's Active Incomplete Lesson & Read Action */}
      <div className="bg-gradient-to-br from-white/95 to-white/70 p-6 sm:p-7 rounded-3xl border border-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[#143D2B] bg-[#EAF3EE] px-2.5 py-0.5 rounded-full border border-emerald-900/10 uppercase tracking-wider">
              Today&apos;s Active Lesson
            </span>
            <span className="font-mono text-xs text-[#858C88] font-medium">
              {readingMinutes} min read • Audio &amp; Text
            </span>
          </div>
          <h3 className="font-serif text-base sm:text-xl font-bold text-[#111815] leading-snug">
            {lessonTitle}
          </h3>
          <p className="text-xs text-[#494F4C] leading-relaxed max-w-2xl line-clamp-2">
            {summary}
          </p>
        </div>

        <div className="shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
          <Link href={`/academy/${moduleSlug}/${lessonSlug}`}>
            <Button
              className="min-h-[44px] px-6 py-3 rounded-full bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-xs font-mono font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:shadow"
            >
              <span>Read Lesson</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
