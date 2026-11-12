'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  ArrowRight,
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

  const allLessons = moduleDetail?.lessons && moduleDetail.lessons.length > 0 ? moduleDetail.lessons : [];
  const currentIncompleteLesson = allLessons.find((l) => !l.isCompleted) || allLessons[0];

  const lessonSlug = currentIncompleteLesson?.slug ?? fallbackAnchor.lessonSlug;
  const lessonTitle = currentIncompleteLesson?.title ?? fallbackAnchor.chapterTitle.replace(/^Chapter \d+:\s*/, '');
  const readingMinutes = currentIncompleteLesson?.readingMinutes ?? fallbackAnchor.readingMinutes;

  const totalChapters = moduleDetail?.chapters?.length || activeModule?.lessonCount || fallbackAnchor.totalChapters;
  const completedChapters =
    moduleDetail?.chapters && moduleDetail.chapters.length > 0
      ? moduleDetail.chapters.filter((c) => c.lessons && c.lessons.length > 0 && c.lessons.every((l) => l.isCompleted)).length
      : (activeModule?.completedLessonCount ?? fallbackAnchor.completedChapters);
  const progressPercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-[#E3E3DC] bg-[#FBFBF9] p-4 sm:p-5 transition-all duration-200 hover:border-[#143D2B]/40 hover:shadow-sm hover:bg-[#FDFDFB]',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Icon Pill + Lesson Context */}
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3EE] text-[#143D2B] border border-[#143D2B]/15 transition-transform duration-200 group-hover:scale-105">
            <BookOpen className="h-5 w-5" />
          </div>

          <div className="min-w-0 space-y-1">
            {/* Overline & Progress */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="font-bold text-[#143D2B] uppercase tracking-wider">
                Continue Lesson
              </span>
              <span className="text-[#858C88]">•</span>
              <span className="text-[#494F4C] truncate font-medium max-w-[200px] sm:max-w-none">
                {courseTitle}
              </span>
              <span className="text-[#858C88] hidden sm:inline">•</span>
              <span className="text-[#858C88] hidden sm:inline">
                {progressPercent}% Complete
              </span>
            </div>

            {/* Main Lesson Title */}
            <Link
              href={`/academy/${moduleSlug}/${lessonSlug}`}
              className="block font-serif text-base sm:text-lg font-bold text-[#111413] tracking-tight group-hover:text-[#143D2B] transition-colors leading-snug truncate"
            >
              {lessonTitle}
            </Link>

            {/* Reading Minutes & Format */}
            <p className="font-mono text-[11px] text-[#858C88] flex items-center gap-2">
              <span>{readingMinutes} min read</span>
              <span>•</span>
              <span>Audio &amp; Text</span>
            </p>
          </div>
        </div>

        {/* Right: Tactile Action Button */}
        <div className="shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
          <Link href={`/academy/${moduleSlug}/${lessonSlug}`}>
            <Button
              size="sm"
              className="min-h-[42px] px-5 rounded-xl bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-xs font-mono font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer group-hover:shadow"
            >
              <span>Read Lesson</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
