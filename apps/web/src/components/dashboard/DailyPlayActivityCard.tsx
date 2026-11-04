'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Puzzle,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { type ChildDTO, type BrainGameActivityDTO, PlayCategory } from '@alongside/shared';
import { getDailyBrainGame } from '@/lib/api/brainGames';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface DailyPlayActivityCardProps {
  child: ChildDTO | null;
  className?: string;
}

export function DailyPlayActivityCard({ child, className }: DailyPlayActivityCardProps) {
  const [activity, setActivity] = React.useState<BrainGameActivityDTO | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isCompleted, setIsCompleted] = React.useState(false);

  React.useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    async function load() {
      const tier = child?.developmentalTier ? String(child.developmentalTier) : undefined;
      const act = await getDailyBrainGame(child?.id, tier);
      if (!isCancelled) {
        setActivity(act);
        // Check local completion for today
        if (child) {
          try {
            const todayKey = `alongside_play_done_${child.id}_${new Date().toDateString()}`;
            setIsCompleted(localStorage.getItem(todayKey) === 'true');
          } catch {
            // Safe fallback
          }
        }
        setLoading(false);
      }
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [child?.id, child?.developmentalTier]);

  const handleToggleCompleted = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    if (child) {
      try {
        const todayKey = `alongside_play_done_${child.id}_${new Date().toDateString()}`;
        if (nextState) {
          localStorage.setItem(todayKey, 'true');
        } else {
          localStorage.removeItem(todayKey);
        }
      } catch {
        // Safe fallback
      }
    }
  };

  const categoryName = (cat: PlayCategory | string) => {
    switch (cat) {
      case PlayCategory.PUPPET:
        return 'Puppet & Vocal Mirroring';
      case PlayCategory.SENSORY:
        return 'Tactile Sensory Play';
      case PlayCategory.CONSTRUCTION:
        return 'Spatial Construction';
      case PlayCategory.LOGIC_PUZZLE:
        return 'Executive Logic Puzzle';
      case PlayCategory.MAKER:
        return 'Hands-On Maker Challenge';
      case PlayCategory.BOREDOM_BUSTER:
        return 'Boredom Buster & Debate';
      default:
        return String(cat).replace('_', ' ');
    }
  };

  return (
    <Card className={cn('border-slate-200/90 bg-white shadow-xs overflow-hidden', className)}>
      <CardHeader className="pb-3 border-b border-slate-100 bg-gradient-to-r from-amber-50/40 via-white to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                <Puzzle className="h-3.5 w-3.5" />
              </span>
              <CardTitle className="text-base font-bold text-slate-900">
                Daily Purposeful Play: Brain Games
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Age-calibrated screen-free play to build working memory and emotional connection
            </CardDescription>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
              100% Screen-Free
            </span>
            {activity && (
              <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                <Clock className="h-3 w-3" />
                {activity.estimatedMinutes} mins
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {loading || !activity ? (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
            <span className="text-xs text-slate-500">Curating daily brain game...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Activity Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {activity.title}
                  </h3>
                  <Badge variant="outline" className="text-[10px] font-semibold text-amber-900 border-amber-200 bg-amber-50/50">
                    {categoryName(activity.category)}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  {activity.summary}
                </p>
              </div>

              {/* 1-Tap Done Button */}
              <button
                type="button"
                onClick={handleToggleCompleted}
                className={cn(
                  'flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all shrink-0 shadow-2xs',
                  isCompleted
                    ? 'bg-emerald-700 text-white ring-2 ring-emerald-600'
                    : 'border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                )}
                aria-pressed={isCompleted}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                    <span>Completed Today!</span>
                  </>
                ) : (
                  <>
                    <Smile className="h-4 w-4 text-amber-700" />
                    <span>Mark Done Today</span>
                  </>
                )}
              </button>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-3.5 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                How to Play With {child?.name || 'Your Child'}
              </span>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {activity.instructions}
              </p>
            </div>

            {/* Target Skills Tags & Materials */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-medium">Builds:</span>
                {activity.targetSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-800 border border-teal-200/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <Link
                href="/brain-games"
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
              >
                <span>Browse Play Matrix</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
