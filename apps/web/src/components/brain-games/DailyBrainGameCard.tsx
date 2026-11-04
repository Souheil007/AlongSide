'use client';

import * as React from 'react';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  Smile,
  RotateCw,
  Award,
  Layers,
  Heart,
  HelpCircle,
} from 'lucide-react';
import type { BrainGameActivityDTO } from '@alongside/shared';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface DailyBrainGameCardProps {
  activity: BrainGameActivityDTO;
  childName?: string;
  onShuffle?: () => void;
  onMarkPlayed?: (activityId: string) => void;
}

export function DailyBrainGameCard({
  activity,
  childName = 'your child',
  onShuffle,
  onMarkPlayed,
}: DailyBrainGameCardProps) {
  const [hasPlayed, setHasPlayed] = React.useState(false);
  const [showCelebration, setShowCelebration] = React.useState(false);

  // Check localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(`alongside_played_game_${activity.id}`);
      if (stored === 'true') {
        setHasPlayed(true);
      } else {
        setHasPlayed(false);
      }
    } catch {
      // safe fallback
    }
    setShowCelebration(false);
  }, [activity.id]);

  const handleTogglePlayed = () => {
    const nextState = !hasPlayed;
    setHasPlayed(nextState);
    if (nextState) {
      setShowCelebration(true);
      onMarkPlayed?.(activity.id);
      try {
        localStorage.setItem(`alongside_played_game_${activity.id}`, 'true');
      } catch {
        // safe fallback
      }
    } else {
      setShowCelebration(false);
      try {
        localStorage.removeItem(`alongside_played_game_${activity.id}`);
      } catch {
        // safe fallback
      }
    }
  };

  return (
    <Card className="border-amber-200/90 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 shadow-sm hover:shadow-md transition-all overflow-hidden relative">
      {/* Decorative calm accent ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400" />

      <CardHeader className="p-5 sm:p-6 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </span>
            <Badge
              variant="outline"
              className="text-[11px] font-bold text-amber-900 bg-amber-100/80 border-amber-300"
            >
              Today’s Purposeful Play
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              {activity.estimatedMinutes} mins
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-md">
              100% Screen-Free
            </span>
          </div>
        </div>

        <CardTitle className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {activity.title}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-slate-600 mt-1">
          {activity.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 pt-2 space-y-4">
        {/* Celebration Banner */}
        {showCelebration && (
          <div
            data-testid="celebration-banner"
            className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-950 flex items-start gap-3 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shrink-0 shadow-xs">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-emerald-900">
                Play Session Completed! 🎉
              </h4>
              <p className="text-[11px] sm:text-xs text-emerald-800 leading-relaxed">
                You just activated reciprocal mirror neurons and gave your child healthy, screen-free sensory grounding!
              </p>
            </div>
          </div>
        )}

        {/* Step-by-Step Instructions */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-2 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Layers className="h-3.5 w-3.5 text-amber-600" />
            <span>How to Play Together:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {activity.instructions}
          </p>
        </div>

        {/* Required Materials */}
        {activity.materialsNeeded && activity.materialsNeeded.length > 0 && (
          <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-3.5 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Household Materials Needed:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {activity.materialsNeeded.map((mat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Target Neurodevelopmental Skills */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Target Developmental Skills (Harvard Center on the Developing Child):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activity.targetSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-900 border border-teal-200/80 shadow-2xs flex items-center gap-1"
              >
                <Award className="h-3 w-3 text-teal-700 shrink-0" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <Button
            type="button"
            onClick={handleTogglePlayed}
            className={`min-h-[44px] w-full sm:w-auto px-5 font-bold transition-all shadow-sm ${
              hasPlayed
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            {hasPlayed ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <span>We Played This Today! 🎉</span>
              </>
            ) : (
              <>
                <Smile className="h-4 w-4 mr-2" />
                <span>Mark as "We Played This!"</span>
              </>
            )}
          </Button>

          {onShuffle && (
            <Button
              type="button"
              variant="outline"
              onClick={onShuffle}
              className="min-h-[44px] w-full sm:w-auto gap-2 text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50"
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span>Shuffle Another Activity</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
