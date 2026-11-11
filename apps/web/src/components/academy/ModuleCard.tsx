import * as React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, CheckCircle2, ArrowRight, Layers, ChevronDown, Sparkles, Video } from 'lucide-react';
import { DevelopmentalTier, AcademyCategory, formatCourseTitle, type AcademyModuleDTO, type AcademyLessonSummaryDTO } from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface ModuleCardProps {
  module: AcademyModuleDTO & {
    lessons?: AcademyLessonSummaryDTO[];
    hasMasterLecture?: boolean;
  };
  showFormatPills?: boolean;
  className?: string;
}

export function getTierBadgeInfo(tier: DevelopmentalTier) {
  switch (tier) {
    case DevelopmentalTier.TIER_0A_INFANCY_0_1:
      return {
        label: 'Ages 0–1 (Tier 0A: Infancy)',
        shortLabel: 'Ages 0–1',
        className: 'bg-rose-50 text-rose-800 border-rose-200',
      };
    case DevelopmentalTier.TIER_0B_TODDLER_1_2:
      return {
        label: 'Ages 1–2 (Tier 0B: Younger Toddler)',
        shortLabel: 'Ages 1–2',
        className: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    case DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3:
      return {
        label: 'Ages 2–3 (Tier 0C: Older Toddler)',
        shortLabel: 'Ages 2–3',
        className: 'bg-orange-50 text-orange-800 border-orange-200',
      };
    case DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3:
      return {
        label: 'Ages 0–3 (Tier 0: Infancy & Toddler)',
        shortLabel: 'Ages 0–3',
        className: 'bg-rose-50 text-rose-800 border-rose-200',
      };
    case DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6:
      return {
        label: 'Ages 4–6 (Tier 1: Early Childhood)',
        shortLabel: 'Ages 4–6',
        className: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    case DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9:
      return {
        label: 'Ages 7–9 (Tier 2: Explorer)',
        shortLabel: 'Ages 7–9',
        className: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    case DevelopmentalTier.TIER_1_AGES_8_9:
      return {
        label: 'Ages 8–9 (Tier 1: Explorer)',
        shortLabel: 'Ages 8–9',
        className: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    case DevelopmentalTier.TIER_3_PRE_TEEN_10_12:
      return {
        label: 'Ages 10–12 (Tier 3: Pathfinder)',
        shortLabel: 'Ages 10–12',
        className: 'bg-teal-50 text-teal-800 border-teal-200',
      };
    case DevelopmentalTier.TIER_2_AGES_10_11:
      return {
        label: 'Ages 10–11 (Tier 2: Pathfinder)',
        shortLabel: 'Ages 10–11',
        className: 'bg-teal-50 text-teal-800 border-teal-200',
      };
    case DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15:
      return {
        label: 'Ages 13–15 (Tier 4: Navigator)',
        shortLabel: 'Ages 13–15',
        className: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      };
    case DevelopmentalTier.TIER_3_AGES_12_13:
      return {
        label: 'Ages 12–13 (Tier 3: Navigator)',
        shortLabel: 'Ages 12–13',
        className: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      };
    case DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18:
      return {
        label: 'Ages 16–18 (Tier 5: Pioneer)',
        shortLabel: 'Ages 16–18',
        className: 'bg-purple-50 text-purple-800 border-purple-200',
      };
    case DevelopmentalTier.TIER_4_AGES_14_PLUS:
      return {
        label: 'Ages 14+ (Tier 4: Pioneer)',
        shortLabel: 'Ages 14+',
        className: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    default:
      return {
        label: tier,
        shortLabel: tier,
        className: 'bg-slate-50 text-slate-800 border-slate-200',
      };
  }
}

export function getCategoryBadgeInfo(category?: AcademyCategory | string) {
  switch (category) {
    case AcademyCategory.BEHAVIOR_AND_EMOTIONS:
      return {
        label: 'Behavior & Emotions',
        className: 'bg-rose-50 text-rose-800 border-rose-200',
      };
    case AcademyCategory.HEALTH_AND_WELLNESS:
      return {
        label: 'Pediatric Health & Sleep',
        className: 'bg-teal-50 text-teal-800 border-teal-200',
      };
    case AcademyCategory.NUTRITION_AND_FEEDING:
      return {
        label: 'Nutrition & Feeding',
        className: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    case AcademyCategory.DEVELOPMENT_AND_PLAY:
      return {
        label: 'Development & Play',
        className: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      };
    case AcademyCategory.DIGITAL_AND_DEVICES:
      return {
        label: 'Modern Digital World',
        className: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      };
    default:
      return {
        label: 'Parent Intelligence',
        className: 'bg-slate-50 text-slate-800 border-slate-200',
      };
  }
}

export function ModuleCard({ module, showFormatPills = false, className }: ModuleCardProps) {
  const [isSyllabusOpen, setIsSyllabusOpen] = React.useState(false);

  const percentComplete =
    module.lessonCount > 0
      ? Math.round((module.completedLessonCount / module.lessonCount) * 100)
      : 0;

  const estimatedMinutes = module.lessonCount * 4;
  const tierInfo = getTierBadgeInfo(module.developmentalTier);
  const categoryInfo = getCategoryBadgeInfo(module.category);

  // Real prioritized chapters count from backend DTO or lessons set
  const actualChapterCount =
    module.chapterCount ??
    (module.lessons && module.lessons.length > 0
      ? new Set(module.lessons.map((l) => l.chapterId).filter(Boolean)).size || 3
      : 3);

  const displayTitle = formatCourseTitle(module.title);
  const actualLessons = module.lessons && module.lessons.length > 0 ? module.lessons : [];
  const syllabusLessonCount = actualLessons.length > 0 ? actualLessons.length : module.lessonCount;

  const hasMasterLecture = Boolean(
    module.hasMasterLecture ||
      (module.lessons &&
        module.lessons.some(
          (l) => Boolean(l.videoLecture || (l as any).hasVideoLecture)
        ))
  );

  return (
    <Card
      className={cn(
        'group flex flex-col justify-between border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:border-teal-300 hover:shadow-md',
        module.isCompleted && 'border-emerald-200 bg-emerald-50/10',
        className
      )}
    >
      <div>
        <CardHeader className="space-y-3 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide',
                  categoryInfo.className
                )}
              >
                {categoryInfo.label}
              </span>
              <span
                className={cn(
                  'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium',
                  tierInfo.className
                )}
              >
                {tierInfo.shortLabel}
              </span>
              {hasMasterLecture && (
                <span
                  data-testid="master-lecture-pill"
                  className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-900"
                >
                  <span aria-hidden="true">🎬</span>
                  <span>Master Lecture</span>
                </span>
              )}
            </div>

            {module.isCompleted && (
              <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                Completed
              </Badge>
            )}
          </div>

          <CardTitle className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-900 transition-colors leading-snug">
            {displayTitle}
          </CardTitle>

          {module.reliefSubtitle && (
            <p className="font-serif italic text-sm text-teal-800 leading-snug">
              {module.reliefSubtitle}
            </p>
          )}

          <CardDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {module.summary}
          </CardDescription>

          {/* Tonight's Quick Win callout strip */}
          {module.tonightQuickWinTitle && (
            <div className="rounded-lg bg-emerald-50/80 border border-emerald-200/90 p-2.5 text-xs text-emerald-950 flex items-start gap-2 shadow-2xs">
              <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-800 shrink-0 mt-0.5 bg-emerald-100 px-1.5 py-0.5 rounded">
                Tonight&apos;s Win
              </span>
              <span className="font-medium line-clamp-1">{module.tonightQuickWinTitle}</span>
            </div>
          )}

          {/* Format pills strip */}
          {showFormatPills && (
            <div
              data-testid="format-pills-strip"
              className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-600 pt-0.5"
            >
              {hasMasterLecture && (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 border border-amber-200 font-semibold text-amber-900">
                  <span aria-hidden="true">🎬</span>
                  <span>Master Lecture</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 border border-slate-200/60 font-medium">
                <span aria-hidden="true">🎧</span>
                <span>Audio Memo</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 border border-slate-200/60 font-medium">
                <span aria-hidden="true">💬</span>
                <span>Script Vault</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 border border-slate-200/60 font-medium">
                <span aria-hidden="true">🤖</span>
                <span>AI Sparring</span>
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4 pt-1">
          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
              <Layers className="h-3 w-3 text-slate-500" />
              {actualChapterCount} {actualChapterCount === 1 ? 'Prioritized Chapter' : 'Prioritized Chapters'}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
              {module.lessonCount} {module.lessonCount === 1 ? 'lesson' : 'lessons'}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              ~{estimatedMinutes} min
            </span>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Course Progress</span>
              <span className="font-semibold text-slate-900">{percentComplete}%</span>
            </div>
            <Progress value={percentComplete} className="h-2" />
            <p className="text-[11px] text-slate-500">
              {module.completedLessonCount} of {module.lessonCount} lessons completed
            </p>
          </div>

          {/* Expandable Curriculum Syllabus Drawer */}
          <div className="border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsSyllabusOpen(!isSyllabusOpen);
              }}
              className="flex items-center justify-between w-full text-xs font-mono font-semibold text-slate-600 hover:text-teal-800 transition-colors cursor-pointer py-1"
              aria-expanded={isSyllabusOpen}
              data-testid="syllabus-drawer-toggle"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-slate-500" />
                Curriculum Syllabus ({syllabusLessonCount} {syllabusLessonCount === 1 ? 'lesson' : 'lessons'})
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-slate-400 transition-transform duration-200',
                  isSyllabusOpen && 'rotate-180 text-teal-700'
                )}
              />
            </button>

            {isSyllabusOpen && (
              <div
                data-testid="syllabus-drawer-content"
                className="mt-2 space-y-1.5 rounded-lg bg-slate-50 border border-slate-100 p-2.5 text-xs animate-in fade-in duration-150"
              >
                {actualLessons.length > 0 ? (
                  actualLessons.map((lesson: AcademyLessonSummaryDTO) => {
                    const hasLessonVideo = Boolean(
                      lesson.videoLecture || (lesson as any).hasVideoLecture
                    );
                    return (
                      <Link
                        key={lesson.id}
                        href={`/academy/${module.slug}/${lesson.slug}`}
                        className="flex items-baseline justify-between gap-2 py-1.5 px-2 rounded hover:bg-white hover:shadow-2xs transition-all border-b border-slate-200/50 last:border-0 text-slate-700 group cursor-pointer"
                      >
                        <div className="flex items-baseline gap-1.5 min-w-0">
                          <span
                            className={cn(
                              'font-mono text-[11px] font-bold shrink-0',
                              lesson.isCompleted ? 'text-emerald-700' : 'text-teal-700'
                            )}
                          >
                            {lesson.isCompleted ? '✓' : `§ ${lesson.sortOrder}`}
                          </span>
                          <span className="truncate font-medium group-hover:text-teal-900">
                            {lesson.title}
                          </span>
                          {hasLessonVideo && (
                            <span
                              data-testid={`syllabus-video-badge-${lesson.id}`}
                              title="Includes Master Video Lecture"
                              className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-200/80 shrink-0"
                            >
                              <Video className="h-2.5 w-2.5" />
                              <span>Master Lecture</span>
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[10px] text-slate-400 shrink-0 group-hover:text-teal-700">
                          {lesson.readingMinutes} min →
                        </span>
                      </Link>
                    );
                  })
                ) : (
                  <div className="py-2 text-center text-slate-500 font-sans">
                    {module.lessonCount} lessons available in this course roadmap.
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="pt-3 border-t border-slate-100">
        <Link href={`/academy/${module.slug}`} className="w-full">
          <Button
            variant={module.isCompleted ? 'outline' : 'default'}
            className="w-full justify-between group-hover:border-teal-500 text-xs sm:text-sm font-semibold"
          >
            <span>
              {module.isCompleted
                ? 'Review Chapters'
                : module.completedLessonCount > 0
                ? 'Continue Roadmap'
                : 'Explore Chapters'}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
