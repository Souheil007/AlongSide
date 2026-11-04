'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Award,
} from 'lucide-react';
import {
  type ChildDTO,
  MilestoneCategory,
  MilestoneStatus,
  type MilestoneDTO,
} from '@alongside/shared';
import {
  getMilestones,
  trackChildMilestone,
  calculateChildMilestonesProgress,
} from '@/lib/api/milestones';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';

export interface TodayMilestonesWidgetProps {
  child: ChildDTO | null;
  className?: string;
}

export function TodayMilestonesWidget({ child, className }: TodayMilestonesWidgetProps) {
  const [milestones, setMilestones] = React.useState<MilestoneDTO[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [expandedSignsId, setExpandedSignsId] = React.useState<string | null>(null);

  // Calculate age in months accurately
  const childAgeMonths = React.useMemo(() => {
    if (!child) return 14;
    if (child.birthYear && child.birthMonth) {
      const now = new Date();
      return (now.getFullYear() - child.birthYear) * 12 + (now.getMonth() + 1 - child.birthMonth);
    }
    return child.age * 12;
  }, [child]);

  // Load milestones for current child
  React.useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    async function load() {
      const tier = child?.developmentalTier ? String(child.developmentalTier) : undefined;
      const data = await getMilestones({
        tier,
        ageMonths: childAgeMonths,
      });

      if (!isCancelled) {
        // Read any locally toggled statuses from localStorage
        if (child) {
          try {
            const storageKey = `alongside_milestones_${child.id}`;
            const stored = localStorage.getItem(storageKey);
            if (stored) {
              const parsed: Record<string, MilestoneStatus> = JSON.parse(stored);
              const merged = data.map((m) => ({
                ...m,
                status: parsed[m.id] ?? m.status ?? MilestoneStatus.NOT_STARTED,
              }));
              setMilestones(merged);
              setLoading(false);
              return;
            }
          } catch {
            // Safe fallback
          }
        }
        setMilestones(data);
        setLoading(false);
      }
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [child?.id, child?.developmentalTier, childAgeMonths]);

  // Handle 1-tap milestone achievement toggle
  const handleToggleMilestone = async (milestoneId: string) => {
    const current = milestones.find((m) => m.id === milestoneId);
    if (!current) return;

    const nextStatus =
      current.status === MilestoneStatus.ACHIEVED
        ? MilestoneStatus.IN_PROGRESS
        : MilestoneStatus.ACHIEVED;

    const updated = milestones.map((m) =>
      m.id === milestoneId ? { ...m, status: nextStatus } : m
    );
    setMilestones(updated);

    // Save locally
    if (child) {
      try {
        const storageKey = `alongside_milestones_${child.id}`;
        const map: Record<string, MilestoneStatus> = {};
        for (const m of updated) {
          if (m.status) map[m.id] = m.status;
        }
        localStorage.setItem(storageKey, JSON.stringify(map));
      } catch {
        // Ignore storage write issues
      }

      // Fire async backend track
      trackChildMilestone(child.id, {
        milestoneId,
        status: nextStatus,
      }).catch(() => {});
    }
  };

  const progress = React.useMemo(() => {
    return calculateChildMilestonesProgress(milestones, childAgeMonths);
  }, [milestones, childAgeMonths]);

  const categoryLabel = (cat: string) => {
    switch (cat) {
      case MilestoneCategory.GROSS_MOTOR:
        return 'Gross Motor';
      case MilestoneCategory.FINE_MOTOR:
        return 'Fine Motor';
      case MilestoneCategory.SPEECH_LANGUAGE:
        return 'Speech & Language';
      case MilestoneCategory.COGNITIVE:
        return 'Cognitive';
      case MilestoneCategory.SOCIAL_EMOTIONAL:
        return 'Social-Emotional';
      default:
        return cat.replace('_', ' ');
    }
  };

  return (
    <Card className={cn('border-slate-200/90 bg-white shadow-xs', className)}>
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
                <Award className="h-3.5 w-3.5" />
              </span>
              <CardTitle className="text-base font-bold text-slate-900">
                Today&apos;s Milestones & Developmental Benchmarks
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              {child ? `${child.name}'s active developmental targets` : 'Developmental milestones'} • Tap to mark achieved
            </CardDescription>
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-teal-900 bg-teal-50 px-2.5 py-1 rounded-xl border border-teal-200">
              {progress.achievedCount} of {progress.totalMilestones} Mastered ({progress.completionPercentage}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-2">
          <Progress value={progress.completionPercentage} className="h-2 bg-slate-100" />
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
            <span className="text-xs text-slate-500">Loading developmental milestones...</span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {milestones.slice(0, 4).map((milestone) => {
              const isAchieved = milestone.status === MilestoneStatus.ACHIEVED;
              const isSignsOpen = expandedSignsId === milestone.id;

              return (
                <div
                  key={milestone.id}
                  className={cn(
                    'rounded-xl border p-3.5 transition-all text-xs',
                    isAchieved
                      ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-800'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Interactive Checkbox Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleMilestone(milestone.id)}
                      className="flex items-start gap-3 text-left flex-1 min-h-[44px] group focus:outline-none"
                      aria-label={`Mark milestone ${milestone.title} as ${isAchieved ? 'not achieved' : 'achieved'}`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isAchieved ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 transition-transform group-hover:scale-110" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-400 transition-transform group-hover:scale-110 group-hover:text-teal-600" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              'font-bold text-sm tracking-tight',
                              isAchieved ? 'text-emerald-950 line-through opacity-85' : 'text-slate-900'
                            )}
                          >
                            {milestone.title}
                          </span>
                          <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-200 shadow-2xs">
                            {categoryLabel(milestone.category)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </button>

                    {/* Signs to Watch Accordion Button */}
                    {milestone.signsToWatch && (
                      <button
                        type="button"
                        onClick={() => setExpandedSignsId(isSignsOpen ? null : milestone.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white transition-colors"
                        title="Clinical signs to watch"
                        aria-expanded={isSignsOpen}
                      >
                        {isSignsOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <Info className="h-4 w-4 text-teal-600" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Expandable Signs to Watch / Clinical Callout */}
                  {isSignsOpen && milestone.signsToWatch && (
                    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-[11px] text-amber-900 space-y-1 animate-in fade-in-0 duration-150">
                      <div className="flex items-center gap-1.5 font-bold text-amber-950">
                        <Info className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                        <span>Clinical Watch & Guidance ({milestone.clinicalAuthority})</span>
                      </div>
                      <p className="leading-relaxed text-amber-900">{milestone.signsToWatch}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
