'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  Play,
  Pause,
  ArrowRight,
  Check,
  Copy,
  Headphones,
} from 'lucide-react';
import {
  DevelopmentalTier,
  ChapterPriority,
  AcademyCategory,
  type ChildDTO,
} from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
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
    completedChapters: 2,
    summary:
      'Move from referee to coach when sibling rivalry and gaming screen transitions flare up.',
    chapters: [
      { id: 1, shortTitle: 'Ch 1: Concrete Logic', fullTitle: 'Operational Reasoning', completed: true, isCurrent: false },
      { id: 2, shortTitle: 'Ch 2: Dopamine Crashes', fullTitle: 'Mediation & Screen Reset', completed: false, isCurrent: true },
      { id: 3, shortTitle: 'Ch 3: Sibling Friction', fullTitle: 'Zero-Blame Fair Resolution', completed: false, isCurrent: false },
      { id: 4, shortTitle: 'Ch 4: Device Envy', fullTitle: 'Handling Peer Comparisons', completed: false, isCurrent: false },
      { id: 5, shortTitle: 'Ch 5: Sleep Hygiene', fullTitle: 'Pre-Bedtime Reading Sanctuary', completed: false, isCurrent: false },
    ],
    audioDuration: '3:40',
  },
  [DevelopmentalTier.TIER_3_PRE_TEEN_10_12]: {
    moduleSlug: 'behavior-tween-adrenarche',
    lessonSlug: 'adrenarche-neurobiology',
    courseTitle: 'Tween Adrenarche: Navigating Friendships & Digital Independence',
    chapterTitle: 'Chapter 1: The Biological Awakening to Peer Status',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    categoryLabel: 'Behavior & Emotions',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    readingMinutes: 4,
    totalChapters: 5,
    completedChapters: 2,
    summary:
      'Why peer rejection feels like physical pain to a middle-schooler, and how to validate their hurt without giving in to reckless screen demands.',
    chapters: [
      { id: 1, shortTitle: 'Ch 1: The Shift', fullTitle: 'The Biological Awakening to Peer Status', completed: true, isCurrent: false },
      { id: 2, shortTitle: 'Ch 2: Peer Validation', fullTitle: 'Dopamine & Belonging Ache', completed: true, isCurrent: false },
      { id: 3, shortTitle: 'Ch 3: Exclusion (Today)', fullTitle: 'When Left Out of the Group Chat', completed: false, isCurrent: true },
      { id: 4, shortTitle: 'Ch 4: Screen Pacts', fullTitle: 'Collaborative Pre-Device Treaty', completed: false, isCurrent: false },
      { id: 5, shortTitle: 'Ch 5: Bedtime Trust', fullTitle: 'The 8:30 PM Living Room Dock', completed: false, isCurrent: false },
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

  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);
  const [scriptCopied, setScriptCopied] = React.useState(false);

  const tonightScript = React.useMemo(() => {
    const age = child?.age ?? 10;
    if (age <= 3) {
      return '“Your feelings are so big right now. I’m sitting right here on the carpet with you until your breathing slows down.”';
    }
    if (age <= 6) {
      return '“I see you’re really frustrated. Let’s take two deep breaths together, and then we’ll decide what happens next.”';
    }
    if (age <= 12) {
      return '“I see how hard you’re working on that game. It’s hard to stop. I’m starting our 3-minute timer now so we can head down to dinner together.”';
    }
    return '“I hear you, and I understand why you feel that way. Let’s take 10 minutes to reset, and then talk through this calmly without raising our voices.”';
  }, [child?.age]);

  const handleCopyScript = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(tonightScript);
        setScriptCopied(true);
        setTimeout(() => setScriptCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

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
  const chapterTitle = currentIncompleteLesson?.title
    ? `Chapter: ${currentIncompleteLesson.title}`
    : fallbackAnchor.chapterTitle;
  const readingMinutes = currentIncompleteLesson?.readingMinutes ?? fallbackAnchor.readingMinutes;

  const totalChapters = moduleDetail?.chapters?.length || activeModule?.lessonCount || fallbackAnchor.totalChapters;
  const completedChapters =
    moduleDetail?.chapters && moduleDetail.chapters.length > 0
      ? moduleDetail.chapters.filter((c) => c.lessons && c.lessons.length > 0 && c.lessons.every((l) => l.isCompleted)).length
      : (activeModule?.completedLessonCount ?? fallbackAnchor.completedChapters);
  const progressPercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  const chapters = React.useMemo(() => {
    if (moduleDetail?.chapters && moduleDetail.chapters.length > 0) {
      let foundActive = false;
      return moduleDetail.chapters.map((ch, idx) => {
        const isCompleted = ch.lessons && ch.lessons.length > 0 ? ch.lessons.every((l) => l.isCompleted) : false;
        let isCurrent = false;
        if (!isCompleted && !foundActive) {
          isCurrent = true;
          foundActive = true;
        }
        return {
          id: idx + 1,
          shortTitle: ch.title.length > 20 ? ch.title.slice(0, 18) + '...' : ch.title,
          fullTitle: ch.title,
          completed: isCompleted,
          isCurrent,
        };
      });
    }
    return fallbackAnchor.chapters;
  }, [moduleDetail?.chapters, fallbackAnchor.chapters]);

  const audioDuration = fallbackAnchor.audioDuration;

  const toggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  return (
    <Card
      className={cn(
        'border-[#E3E3DC] bg-white shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-[10px] overflow-hidden transition-all hover:border-[#143D2B]/30',
        className
      )}
    >
      <CardHeader className="p-5 pb-4 space-y-3 border-b border-[#E3E3DC]">
        {/* Top Header Row with Category & Progress Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#143D2B] text-white font-bold shadow-2xs">
              <BookOpen className="h-4 w-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#143D2B] uppercase tracking-wider block">
                Parent Intelligence Academy • Active Course
              </span>
              <Link href={`/academy/${moduleSlug}`} className="hover:underline">
                <CardTitle className="font-serif text-lg sm:text-xl font-bold text-[#111413] leading-snug mt-0.5">
                  {courseTitle}
                </CardTitle>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <Badge
              variant="outline"
              className="text-xs font-mono font-bold text-[#143D2B] bg-[#EAF3EE] border-[#143D2B]/20 px-2.5 py-1 rounded-full"
            >
              {progressPercent}% Completed ({completedChapters} of {totalChapters} Chapters)
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* 1. VISUAL CURRICULUM ROADMAP CHAPTER NODES */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-[#111413] uppercase tracking-wider text-[11px]">
              Curriculum Roadmap
            </span>
            <span className="text-[#858C88] font-mono text-[11px]">
              Next Chapter: {readingMinutes} min audio/read
            </span>
          </div>

          {/* Connected Roadmap Track */}
          <div className="relative pt-2 pb-2 overflow-x-auto">
            <div className="min-w-[560px] flex items-center justify-between relative px-6">
              {/* Background Grey Track Line */}
              <div className="absolute left-8 right-8 top-5 h-1 bg-[#E3E3DC] -z-0" />
              {/* Completed Progress Line */}
              <div
                className="absolute left-8 top-5 h-1 bg-[#143D2B] -z-0 transition-all duration-500"
                style={{ width: `${Math.min(92, progressPercent + 10)}%` }}
              />

              {chapters.map((ch) => {
                if (ch.completed) {
                  return (
                    <div key={ch.id} className="flex flex-col items-center gap-1.5 z-10">
                      <span className="w-8 h-8 rounded-full bg-[#143D2B] text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                        <Check className="w-4 h-4" />
                      </span>
                      <span className="font-mono text-[10px] text-[#143D2B] font-semibold text-center whitespace-nowrap">
                        {ch.shortTitle}
                      </span>
                    </div>
                  );
                }

                if (ch.isCurrent) {
                  return (
                    <div key={ch.id} className="flex flex-col items-center gap-1.5 z-10">
                      <span className="w-9 h-9 rounded-full bg-[#143D2B] text-white font-mono text-xs font-black flex items-center justify-center ring-4 ring-[#EAF3EE] shadow-md animate-pulse">
                        {ch.id}
                      </span>
                      <span className="font-mono text-[11px] text-[#143D2B] font-bold text-center whitespace-nowrap">
                        {ch.shortTitle}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={ch.id} className="flex flex-col items-center gap-1.5 z-10 opacity-60">
                    <span className="w-8 h-8 rounded-full bg-[#FBFBF9] border-2 border-[#E3E3DC] text-[#858C88] font-mono text-xs font-bold flex items-center justify-center">
                      {ch.id}
                    </span>
                    <span className="font-mono text-[10px] text-[#858C88] text-center whitespace-nowrap">
                      {ch.shortTitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. TODAY'S ACTIVE LESSON & TONIGHT'S SCRIPT (2-COLUMN GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left: Active Lesson & Audio Player (7 cols) */}
          <div className="md:col-span-7 p-4 sm:p-5 rounded-xl bg-[#EAF3EE]/80 border border-[#143D2B]/20 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#143D2B] bg-white px-2 py-0.5 rounded border border-[#143D2B]/20 uppercase tracking-wider">
                  Today&apos;s Active Lesson
                </span>
                <span className="font-mono text-xs text-[#858C88] font-medium">
                  {readingMinutes} minutes • Audio or Text
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#111413] leading-snug">
                {chapterTitle}
              </h3>
              <p className="text-xs text-[#494F4C] leading-relaxed">
                {summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Button
                type="button"
                onClick={toggleAudio}
                className="min-h-[44px] gap-2 rounded-lg bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Listen to Audio ({audioDuration})</span>
                  </>
                )}
              </Button>

              <Link href={`/academy/${moduleSlug}/${lessonSlug}`}>
                <Button
                  variant="outline"
                  className="min-h-[44px] gap-1.5 rounded-lg bg-white border-[#E3E3DC] text-xs font-semibold text-[#111413] hover:bg-[#F4F4F0] transition"
                >
                  <span>Read Lesson</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: What to Say Out Loud Tonight (5 cols) */}
          <div className="md:col-span-5 p-4 sm:p-5 rounded-xl bg-[#FBFBF9] border border-[#E3E3DC] flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#143D2B] uppercase tracking-wider">
                  Tonight&apos;s Script
                </span>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-[#143D2B] hover:text-[#0E2B1E] bg-white px-2 py-0.5 rounded border border-[#E3E3DC] shadow-2xs transition cursor-pointer"
                >
                  {scriptCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#143D2B]" />
                      <span>Copy 📋</span>
                    </>
                  )}
                </button>
              </div>

              <blockquote className="font-serif text-sm text-[#111413] italic leading-relaxed">
                {tonightScript}
              </blockquote>
            </div>

            <span className="font-mono text-[10px] text-[#858C88] block border-t border-[#E3E3DC] pt-2">
              Co-Regulation Tip: Keep vocal pitch calm and low. Connect before correcting.
            </span>
          </div>
        </div>

        {/* 3. AUDIO WAVEFORM VISUALIZER (EXPANDABLE DRAWER) */}
        {isPlayingAudio && (
          <div className="p-3 bg-white rounded-[8px] border border-[#E3E3DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-1.5 h-6 px-2 overflow-hidden flex-1">
              <span className="w-1 bg-[#143D2B]/40 rounded-full h-2 animate-pulse" />
              <span className="w-1 bg-[#143D2B]/60 rounded-full h-4 animate-bounce" />
              <span className="w-1 bg-[#143D2B] rounded-full h-6 animate-pulse" />
              <span className="w-1 bg-[#143D2B] rounded-full h-3 animate-bounce" />
              <span className="w-1 bg-[#143D2B]/80 rounded-full h-5 animate-pulse" />
              <span className="w-1 bg-[#143D2B] rounded-full h-6 animate-bounce" />
              <span className="w-1 bg-[#143D2B]/70 rounded-full h-4 animate-pulse" />
              <span className="w-1 bg-[#143D2B]/50 rounded-full h-3 animate-bounce" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#858C88]">
              <Headphones className="w-3.5 h-3.5 text-[#143D2B]" />
              <span>Playing narration by Dr. Chen (Pediatric Advisor)</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
