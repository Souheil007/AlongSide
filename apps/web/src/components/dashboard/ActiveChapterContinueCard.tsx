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
  interpolateChildCopy,
  formatCourseTitle,
  type ChildDTO,
} from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { getAcademyModules, getAcademyModuleBySlug } from '@/lib/api/academy';
import { deriveChildAge, useChildAge } from '@/hooks/useChildAge';
import { cn } from '@/lib/utils';

export interface ActiveChapterContinueCardProps {
  child: ChildDTO | null;
  isChildLoading?: boolean;
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
      { id: 4, shortTitle: 'Ch 4: OS Controls', fullTitle: 'Setting Up Parental Controls by Age', completed: false, isCurrent: false },
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
  isChildLoading = false,
  className,
}: ActiveChapterContinueCardProps) {
  const childAge = useChildAge();
  const effectiveTier = React.useMemo<DevelopmentalTier | undefined>(() => {
    if (child) {
      return (child.developmentalTier ?? deriveChildAge(child).developmentalTier) as DevelopmentalTier;
    }
    return childAge.isAutoCalibrated ? childAge.developmentalTier : undefined;
  }, [child, childAge.isAutoCalibrated, childAge.developmentalTier]);

  const t = React.useCallback(
    (template: string) => interpolateChildCopy(template, child, effectiveTier),
    [child, effectiveTier]
  );

  const fallbackAnchor = resolveTierAnchor(
    effectiveTier ?? child?.developmentalTier ?? child?.age
  );

  // Fetch modules for the resolved child tier (never fire for a dummy tier while child is unresolved)
  const { data: modules, isLoading: isModulesLoading } = useQuery({
    queryKey: ['active-chapter-modules', effectiveTier],
    queryFn: () => getAcademyModules({ tier: effectiveTier }),
    enabled: Boolean(effectiveTier),
    staleTime: 5 * 60 * 1000,
  });

  const activeModule =
    modules && modules.length > 0
      ? (modules.find((m) => !m.isCompleted) ?? modules[0])
      : null;

  // Prefer lessons already returned by getAcademyModules to avoid a second network waterfall
  const moduleListLessons = activeModule?.lessons ?? [];
  const needsModuleDetail =
    Boolean(activeModule?.slug) && moduleListLessons.length === 0;

  // Only query module detail for the REAL resolved module if its lessons were omitted
  const { data: moduleDetail, isLoading: isDetailLoading } = useQuery({
    queryKey: ['academy-module-detail', activeModule?.slug],
    queryFn: () => getAcademyModuleBySlug(activeModule!.slug),
    enabled: needsModuleDetail,
    staleTime: 5 * 60 * 1000,
  });

  // In the browser, hold a calm skeleton while real tier modules/lessons load so we never flash hardcoded fallback chapters
  const isAwaitingLiveRoadmap =
    typeof window !== 'undefined' &&
    (isChildLoading ||
      (Boolean(effectiveTier) &&
        (isModulesLoading || (needsModuleDetail && isDetailLoading))));

  const rawCourseTitle =
    moduleDetail?.title ?? activeModule?.title ?? fallbackAnchor.courseTitle;
  const courseTitle = formatCourseTitle(t(rawCourseTitle));
  const moduleSlug =
    moduleDetail?.slug ?? activeModule?.slug ?? fallbackAnchor.moduleSlug;
  const summary = t(
    moduleDetail?.summary ?? activeModule?.summary ?? fallbackAnchor.summary
  );

  const allLessons =
    moduleDetail?.lessons && moduleDetail.lessons.length > 0
      ? moduleDetail.lessons
      : moduleListLessons;
  const currentIncompleteLesson =
    allLessons.find((l) => !l.isCompleted) || allLessons[0];

  const lessonSlug = currentIncompleteLesson?.slug ?? fallbackAnchor.lessonSlug;
  const lessonTitle = t(
    currentIncompleteLesson?.title ??
    fallbackAnchor.chapterTitle.replace(/^Chapter \d+:\s*/, '')
  );
  const readingMinutes =
    currentIncompleteLesson?.readingMinutes ?? fallbackAnchor.readingMinutes;

  const totalLessons =
    allLessons.length > 0 ? allLessons.length : fallbackAnchor.totalChapters;
  const completedLessons =
    allLessons.length > 0
      ? allLessons.filter((l) => l.isCompleted).length
      : (activeModule?.completedLessonCount ?? fallbackAnchor.completedChapters);
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

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
        const fullTitle = t(les.title);
        return {
          id: idx + 1,
          title: formatLessonNodeTitle(fullTitle, idx),
          fullTitle,
          slug: les.slug,
          readingMinutes: les.readingMinutes ?? fallbackAnchor.readingMinutes,
          completed: les.isCompleted,
          isCurrent,
        };
      });
    }

    return fallbackAnchor.chapters.map((ch) => {
      const fullTitle = t(ch.fullTitle);
      const shortTitle = t(ch.shortTitle.replace(/^Ch \d+:\s*/, ''));
      return {
        id: ch.id,
        title: shortTitle,
        fullTitle,
        slug: fallbackAnchor.lessonSlug,
        readingMinutes: fallbackAnchor.readingMinutes,
        completed: ch.completed,
        isCurrent: ch.isCurrent,
      };
    });
  }, [allLessons, fallbackAnchor, t]);

  const defaultActiveNodeId = React.useMemo(() => {
    const active = roadmapNodes.find((n) => n.isCurrent);
    return active?.id ?? roadmapNodes[0]?.id ?? 1;
  }, [roadmapNodes]);

  const [selectedNodeId, setSelectedNodeId] = React.useState<number | null>(null);

  // Reset node preview whenever child or active course changes
  React.useEffect(() => {
    setSelectedNodeId(null);
  }, [moduleSlug, effectiveTier]);

  const activeNodeIndex = Math.max(
    0,
    roadmapNodes.findIndex((n) => n.isCurrent)
  );
  const railFillPercent =
    roadmapNodes.length > 1
      ? Math.min(100, Math.max(0, (activeNodeIndex / (roadmapNodes.length - 1)) * 100))
      : 100;

  const displayedNode =
    roadmapNodes.find((n) => n.id === (selectedNodeId ?? defaultActiveNodeId)) ??
    roadmapNodes[0];

  const displayedLessonSlug =
    selectedNodeId !== null && displayedNode ? displayedNode.slug : lessonSlug;
  const displayedLessonTitle =
    selectedNodeId !== null && displayedNode ? displayedNode.fullTitle : lessonTitle;
  const displayedReadingMinutes =
    selectedNodeId !== null && displayedNode ? displayedNode.readingMinutes : readingMinutes;
  const displayedBadgeText =
    displayedNode && !displayedNode.isCurrent
      ? displayedNode.completed
        ? 'Completed Lesson'
        : 'Upcoming Lesson Preview'
      : "Today's Active Lesson";
  const displayedCtaLabel =
    displayedNode && !displayedNode.isCurrent
      ? displayedNode.completed
        ? 'Review Lesson'
        : 'Preview Lesson'
      : 'Read Lesson';

  if (isAwaitingLiveRoadmap) {
    return (
      <div
        data-testid="active-chapter-roadmap-skeleton"
        aria-busy="true"
        aria-label="Loading curriculum roadmap"
        className={cn(
          'rounded-[2.25rem] bg-white border border-[#143D2B]/10 shadow-[0_14px_40px_-10px_rgba(20,61,43,0.08)] p-6 sm:p-9 space-y-6',
          className
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#143D2B] text-white font-bold shadow-sm">
              <BookOpen className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#143D2B] uppercase tracking-wider block">
                Parent Intelligence Academy • Active Course
              </span>
              <div className="h-7 w-64 max-w-full rounded-lg bg-[#ECEAE2]" />
            </div>
          </div>
          <div className="h-7 w-44 rounded-full bg-[#EAF3EE]" />
        </div>

        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[#143D2B] uppercase tracking-wider text-[11px]">
              Curriculum Roadmap
            </span>
            <div className="h-3.5 w-28 rounded bg-[#ECEAE2]" />
          </div>
          <div className="relative pt-2 pb-3 overflow-x-auto">
            <div className="min-w-[520px] flex items-center justify-between relative px-6 sm:px-8">
              <div className="absolute left-8 right-8 top-5 h-1 bg-stone-200/80" />
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 z-10">
                  <div className="w-10 h-10 rounded-full bg-[#ECEAE2] border-2 border-white" />
                  <div className="h-3 w-20 rounded bg-[#ECEAE2]" />
                  <div className="h-2.5 w-14 rounded bg-[#F2F0E9]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#FAF7F1] p-6 sm:p-7 rounded-3xl border border-[#143D2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2.5 flex-1">
            <div className="h-5 w-44 rounded-full bg-[#EAF3EE]" />
            <div className="h-6 w-72 max-w-full rounded-lg bg-[#ECEAE2]" />
            <div className="h-4 w-full max-w-xl rounded bg-[#F2F0E9]" />
          </div>
          <div className="h-11 w-36 rounded-full bg-[#ECEAE2] shrink-0" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-[2.25rem] bg-white border border-[#143D2B]/10 shadow-[0_14px_40px_-10px_rgba(20,61,43,0.08)] p-6 sm:p-9 space-y-6 transition-all hover:border-[#143D2B]/25',
        className
      )}
    >
      {/* 1. Top Header: Course Identification & Real-Time Progress Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5">
        <div className="flex items-center gap-3.5 min-w-0">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#143D2B] text-white font-bold shadow-md">
            <BookOpen className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <span className="text-[10.5px] font-mono font-bold text-[#143D2B] uppercase tracking-wider block">
              Parent Intelligence Academy • Active Course
            </span>
            <Link
              href={`/academy/${moduleSlug}`}
              className="font-serif text-xl sm:text-[27px] font-semibold text-[#131715] leading-snug hover:text-[#143D2B] hover:underline transition-colors block truncate"
            >
              {courseTitle}
            </Link>
          </div>
        </div>

        <div className="shrink-0 self-start sm:self-auto font-mono text-xs">
          <span className="inline-flex items-center text-xs font-bold text-[#143D2B] bg-[#EAF3EE] border border-[#143D2B]/15 px-3.5 py-1.5 rounded-full">
            {progressPercent}% Completed ({completedLessons} of {totalLessons} Lessons)
          </span>
        </div>
      </div>

      {/* 2. Fully Dynamic Interactive Visual Curriculum Roadmap */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="font-bold text-[#143D2B] uppercase tracking-wider text-[11px]">
            Curriculum Roadmap
          </span>
          <span className="text-[#6C7570] text-[11px]">
            Next Lesson: {displayedReadingMinutes} min read • Click any chapter node
          </span>
        </div>

        {/* Dynamic Connected Node Track */}
        <div className="relative pt-2 pb-2 overflow-x-auto">
          <div className="min-w-[540px] relative px-6 sm:px-8">
            {/* Background & Active Progress Rail bounded between first & last node centers */}
            <div className="absolute left-12 right-12 top-5 h-1 rounded-full bg-[#E7E3D9]">
              <div
                className="h-full rounded-full bg-[#143D2B] transition-all duration-500"
                style={{ width: `${railFillPercent}%` }}
              />
            </div>

            <div className="flex items-start justify-between relative">
              {roadmapNodes.map((node) => {
                const isSelected = displayedNode?.id === node.id;

                if (node.completed) {
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedNodeId(node.id)}
                      className="flex flex-col items-center gap-2 z-10 group/node cursor-pointer focus:outline-none"
                    >
                      <span
                        className={cn(
                          'w-10 h-10 rounded-full bg-[#143D2B] text-white font-mono text-xs font-bold flex items-center justify-center shadow-md ring-4 transition-transform group-hover/node:scale-105',
                          isSelected ? 'ring-[#C85A2B]/40' : 'ring-[#EAF3EE]'
                        )}
                      >
                        <Check className="w-4 h-4 text-emerald-300" />
                      </span>
                      <span className="font-mono text-[10.5px] text-[#143D2B] font-semibold text-center whitespace-nowrap max-w-[120px] truncate group-hover/node:underline">
                        {node.title}
                      </span>
                      <span className="font-mono text-[9.5px] text-[#143D2B]/70 font-medium">
                        Completed
                      </span>
                    </button>
                  );
                }

                if (node.isCurrent) {
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedNodeId(node.id)}
                      className="flex flex-col items-center gap-2 z-10 group/node cursor-pointer focus:outline-none"
                    >
                      <span className="w-11 h-11 -mt-0.5 rounded-full bg-[#143D2B] text-emerald-300 font-mono text-sm font-black flex items-center justify-center shadow-lg ring-4 ring-emerald-300/75 transition-transform group-hover/node:scale-105">
                        {node.id}
                      </span>
                      <span className="font-mono text-[11px] text-[#143D2B] font-bold text-center whitespace-nowrap max-w-[130px] truncate group-hover/node:underline">
                        {node.title}
                      </span>
                      <span className="font-mono text-[9.5px] text-[#B45309] font-bold bg-[#FEF3C7] px-2.5 py-0.5 rounded-full">
                        Active Now
                      </span>
                    </button>
                  );
                }

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={cn(
                      'flex flex-col items-center gap-2 z-10 transition-opacity cursor-pointer focus:outline-none',
                      isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                    )}
                  >
                    <span
                      className={cn(
                        'w-10 h-10 rounded-full bg-white border-2 text-stone-600 font-mono text-xs font-bold flex items-center justify-center shadow-2xs transition-all',
                        isSelected
                          ? 'border-[#C85A2B] ring-4 ring-[#C85A2B]/20 text-[#143D2B]'
                          : 'border-stone-300'
                      )}
                    >
                      {node.id}
                    </span>
                    <span className="font-mono text-[10.5px] text-[#6C7570] text-center whitespace-nowrap max-w-[120px] truncate">
                      {node.title}
                    </span>
                    <span className="font-mono text-[9.5px] text-[#858C88]">Upcoming</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Today's Active Incomplete Lesson (or Clicked Chapter Preview) & Read Action */}
      <div className="bg-gradient-to-br from-white via-[#FCFBF7] to-[#F7F3EA]/80 p-5 sm:p-7 rounded-3xl border border-[#143D2B]/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[10px] font-bold text-[#143D2B] bg-[#EAF3EE] px-2.5 py-0.5 rounded-full border border-[#143D2B]/15 uppercase tracking-wider">
              {displayedBadgeText}
            </span>
            <span className="font-mono text-xs text-[#6C7570] font-medium">
              {displayedReadingMinutes} min read • Audio &amp; Text
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-[22px] font-semibold text-[#131715] leading-snug">
            {displayedLessonTitle}
          </h3>
          <p className="text-xs sm:text-[13.5px] text-[#424A46] leading-relaxed max-w-2xl line-clamp-2">
            {summary}
          </p>
        </div>

        <div className="shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
          <Link href={`/academy/${moduleSlug}/${displayedLessonSlug}`}>
            <Button className="min-h-[46px] px-6 py-3 rounded-full bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-xs sm:text-[13px] font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer">
              <span>{displayedCtaLabel}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
