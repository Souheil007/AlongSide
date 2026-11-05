'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  CalendarCheck,
  Compass,
} from 'lucide-react';
import {
  DevelopmentalTier,
  ChapterPriority,
  AcademyCategory,
  type ChildDTO,
  type AcademyModuleDTO,
  type AcademyChapterDTO,
} from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getAcademyModules, getAcademyModuleBySlug } from '@/lib/api/academy';
import { getPriorityTheme } from '@/components/academy/ChapterRoadmapView';
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
}

export const TIER_PRIORITY_ANCHORS: Record<string, TierPriorityAnchor> = {
  [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]: {
    moduleSlug: 'behavior-infant-coregulation',
    lessonSlug: 'infant-sensory-coregulation',
    courseTitle: 'Sensory Overload & Infant Co-Regulation',
    chapterTitle: 'Chapter 1: The Immature Amygdala & Attachment',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    categoryLabel: 'Behavior & Emotions',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 4,
    totalChapters: 3,
    completedChapters: 0,
    summary: 'De-escalate sensory crying with calm physical presence and mirror neuron soothing.',
  },
  [DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6]: {
    moduleSlug: 'behavior-preschool-feelings',
    lessonSlug: 'preschool-impulse-control',
    courseTitle: 'Preschool Big Feelings & Theory of Mind',
    chapterTitle: 'Chapter 1: Amygdala Tantrum De-escalation',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    categoryLabel: 'Behavior & Emotions',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 5,
    totalChapters: 3,
    completedChapters: 1,
    summary: 'Navigate high-stimulation transitions, sharing frustration, and bedtime stalling.',
  },
  [DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]: {
    moduleSlug: 'behavior-elementary-impulses',
    lessonSlug: 'elementary-dopamine-crashes',
    courseTitle: 'Elementary Impulse Control & Sibling Dynamics',
    chapterTitle: 'Chapter 1: Post-Play Dopamine Crashes & Mediation',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    categoryLabel: 'Behavior & Emotions',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 4,
    totalChapters: 3,
    completedChapters: 1,
    summary: 'Move from referee to coach when sibling rivalry and gaming screen transitions flare up.',
  },
  [DevelopmentalTier.TIER_3_PRE_TEEN_10_12]: {
    moduleSlug: 'behavior-tween-adrenarche',
    lessonSlug: 'adrenarche-neurobiology',
    courseTitle: 'Tween Adrenarche & Emotional Volatility',
    chapterTitle: 'Chapter 1: The Biological Awakening to Peer Status',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    categoryLabel: 'Behavior & Emotions',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 4,
    totalChapters: 3,
    completedChapters: 1,
    summary: 'Understand the adrenal surge sensitizing your tween to peer acceptance and mood swings.',
  },
  [DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]: {
    moduleSlug: 'health-tween-circadian-leaps',
    lessonSlug: 'pubertal-circadian-melatonin',
    courseTitle: 'Pubertal Circadian Delay & Algorithmic Resistance',
    chapterTitle: 'Chapter 1: The 2-Hour Biological Melatonin Shift',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    categoryLabel: 'Pediatric Health & Sleep',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 5,
    totalChapters: 3,
    completedChapters: 0,
    summary: 'Defend adolescent sleep architecture with the neutral 8:30 PM kitchen bed dock.',
  },
  [DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]: {
    moduleSlug: 'digital-tween-smartphone-pacts',
    lessonSlug: 'teen-digital-footprint-agency',
    courseTitle: 'Young Adult Sovereignty & Digital Footprints',
    chapterTitle: 'Chapter 1: Shift from Monitoring to Mentorship',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    categoryLabel: 'Modern Digital World',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 5,
    totalChapters: 3,
    completedChapters: 2,
    summary: 'Collaborative coaching for adolescent autonomy, online reputation, and launch readiness.',
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

  const courseTitle = activeModule?.title ?? fallbackAnchor.courseTitle;
  const moduleSlug = activeModule?.slug ?? fallbackAnchor.moduleSlug;
  const lessonSlug = fallbackAnchor.lessonSlug;
  const categoryLabel = fallbackAnchor.categoryLabel;
  const chapterTitle = fallbackAnchor.chapterTitle;
  const summary = activeModule?.summary ?? fallbackAnchor.summary;
  const priority = fallbackAnchor.priority;
  const readingMinutes = fallbackAnchor.readingMinutes;
  const totalChapters = fallbackAnchor.totalChapters;
  const completedChapters = fallbackAnchor.completedChapters;
  const progressPercent = Math.round((completedChapters / totalChapters) * 100);

  const theme = getPriorityTheme(priority);
  const PriorityIcon = theme.icon;

  return (
    <Card
      className={cn(
        'border-[#E3E3DC] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-[10px] overflow-hidden transition-all hover:border-[#143D2B]/30',
        className
      )}
    >
      <CardHeader className="p-5 pb-3 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#EAF3EE] text-[#143D2B] font-bold">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="text-xs font-mono font-medium text-[#143D2B] uppercase tracking-wider">
              Parent Intelligence Academy
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <Badge
              variant="outline"
              className={cn('text-[11px] font-mono border px-2.5 py-0.5 rounded-full', theme.badgeStyle)}
            >
              <PriorityIcon className="h-3 w-3 mr-1 shrink-0" />
              {theme.shortBadge}
            </Badge>
            <Badge
              variant="outline"
              className="text-[10px] font-mono border-[#E3E3DC] bg-[#F4F4F0] text-[#494F4C] rounded-full"
            >
              {categoryLabel}
            </Badge>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono font-medium text-[#858C88] uppercase tracking-wider block">
            Continue Active Course
          </span>
          <CardTitle className="font-serif text-lg sm:text-xl font-semibold text-[#111413] leading-snug mt-0.5">
            {courseTitle}
          </CardTitle>
          <CardDescription className="text-xs text-[#494F4C] mt-1 leading-relaxed line-clamp-2">
            {chapterTitle} — {summary}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-4">
        {/* Progress Bar & Est. Reading Time */}
        <div className="space-y-1.5 rounded-[8px] bg-[#F4F4F0] border border-[#E3E3DC] p-3 font-mono">
          <div className="flex items-center justify-between text-xs text-[#494F4C]">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#858C88]" />
              <span>{readingMinutes} min micro-lesson</span>
            </div>
            <span>
              {completedChapters} of {totalChapters} Chapters ({progressPercent}%)
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E3E3DC]">
            <div
              className="h-full bg-[#143D2B] transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(10, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
          <Link
            href={`/academy/${moduleSlug}/${lessonSlug}`}
            className="w-full sm:w-auto flex-1"
          >
            <Button
              className="w-full min-h-[44px] gap-2 bg-[#111413] hover:bg-[#143D2B] text-white text-xs font-medium rounded-[5px] shadow-[0_1px_2px_rgba(17,20,19,0.08)] transition-colors"
            >
              <span>Resume Micro-Lesson ({readingMinutes} min)</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/academy" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full min-h-[44px] text-xs font-medium border-[#E3E3DC] text-[#111413] hover:bg-[#F4F4F0] rounded-[5px]"
            >
              Browse All 5 Categories
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
