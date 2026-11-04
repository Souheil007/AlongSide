import * as React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { DevelopmentalTier, type AcademyModuleDTO } from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface ModuleCardProps {
  module: AcademyModuleDTO;
  className?: string;
}

export function getTierBadgeInfo(tier: DevelopmentalTier) {
  switch (tier) {
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

export function ModuleCard({ module, className }: ModuleCardProps) {
  const percentComplete =
    module.lessonCount > 0
      ? Math.round((module.completedLessonCount / module.lessonCount) * 100)
      : 0;

  const estimatedMinutes = module.lessonCount * 5;
  const tierInfo = getTierBadgeInfo(module.developmentalTier);

  return (
    <Card
      className={cn(
        'group flex flex-col justify-between border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:border-teal-300 hover:shadow-md',
        module.isCompleted && 'border-emerald-200 bg-emerald-50/10',
        className
      )}
    >
      <div>
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide',
                tierInfo.className
              )}
            >
              {tierInfo.shortLabel}
            </span>

            {module.isCompleted && (
              <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                Completed
              </Badge>
            )}
          </div>

          <CardTitle className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-900 transition-colors leading-snug">
            {module.title}
          </CardTitle>

          <CardDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {module.summary}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-1">
          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
              {module.lessonCount} {module.lessonCount === 1 ? 'lesson' : 'lessons'}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              ~{estimatedMinutes} min read
            </span>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Progress</span>
              <span className="font-semibold text-slate-900">{percentComplete}%</span>
            </div>
            <Progress value={percentComplete} className="h-2" />
            <p className="text-[11px] text-slate-500">
              {module.completedLessonCount} of {module.lessonCount} lessons completed
            </p>
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
                ? 'Review Lessons'
                : module.completedLessonCount > 0
                ? 'Continue Module'
                : 'Start Module'}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
