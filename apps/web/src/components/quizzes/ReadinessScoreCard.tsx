'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  type ReadinessAssessmentResult,
  ReadinessPreset,
} from '@alongside/shared';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import {
  CheckCircle2,
  AlertTriangle,
  Compass,
  FileCheck2,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

import { cn } from '@/lib/utils';

export interface ReadinessScoreCardProps {
  childId?: string;
  childName?: string;
  result: ReadinessAssessmentResult;
  onRetake?: () => void;
  dashboardHref?: string;
  className?: string;
}

const DIMENSION_DISPLAY_NAMES: Record<string, string> = {
  executive_function: 'Executive Function & Impulse Control',
  online_safety: 'Online Safety & Hazard Detection',
  bedtime_habits: 'Bedtime Habits & Circadian Sleep',
  peer_pressure_resilience: 'Peer Pressure & Group Chat Resilience',
  emotional_regulation: 'Emotional Regulation & Gaming Losses',
  family_communication: 'Family Communication & Restorative Trust',
  screen_time_balance: 'Screen Time Balance & Offline Passions',
  critical_thinking: 'Critical Thinking & Algorithmic Skepticism',
  privacy_awareness: 'Privacy Awareness & Digital Footprint',
  co_regulation_readiness: 'Co-Regulation & Bilateral Collaboration',
};

function getPresetInfo(preset: ReadinessPreset | string) {
  switch (preset) {
    case ReadinessPreset.ROAD_2_AUTONOMY_CHARTER:
      return {
        title: 'Road 2: Autonomy & Mutual Trust Charter',
        subtitle: 'Optimal maturity achieved. Recommend bilateral negotiation granting digital autonomy with weekly syncs.',
        badgeVariant: 'roadActive' as const,
        accentColor: 'border-violet-300 bg-violet-50/70 text-violet-900',
      };
    case ReadinessPreset.ROAD_2_SCAFFOLDED_PACT:
      return {
        title: 'Road 2: Scaffolded Co-Regulation Pact',
        subtitle: 'Solid foundation with specific guardrails needed around bedtime curfews and social media time.',
        badgeVariant: 'roadActive' as const,
        accentColor: 'border-violet-300 bg-violet-50/70 text-violet-900',
      };
    case ReadinessPreset.ROAD_1_BRIDGE_CHARTER:
      return {
        title: 'Road 1: Bridge Device Step-Ladder Charter',
        subtitle: 'Digital impulse control is developing. A phased bridge device (GPS watch or feature phone) is recommended first.',
        badgeVariant: 'roadPre' as const,
        accentColor: 'border-emerald-300 bg-emerald-50/70 text-emerald-900',
      };
    case ReadinessPreset.ROAD_1_PRE_DEVICE_FOUNDATION:
    default:
      return {
        title: 'Road 1: Pre-Device Habit Foundation',
        subtitle: 'Prefrontal inhibitory pathways require parent modeling before unboxing personal devices.',
        badgeVariant: 'roadPre' as const,
        accentColor: 'border-emerald-300 bg-emerald-50/70 text-emerald-900',
      };
  }
}

export function ReadinessScoreCard({
  childId,
  childName = 'Your child',
  result,
  onRetake,
  dashboardHref,
  className,
}: ReadinessScoreCardProps) {
  const {
    overallScore,
    dimensionScores,
    dimensionBreakdown,
    isReadyForPersonalPhone,
    recommendation,
    recommendedRoadmapPreset,
    strengths,
    growthAreas,
  } = result;

  const presetInfo = getPresetInfo(recommendedRoadmapPreset);

  // Score color determinations
  const scoreColor =
    overallScore >= 75
      ? 'text-emerald-700'
      : overallScore >= 50
        ? 'text-amber-700'
        : 'text-terracotta-600';

  const strokeColor =
    overallScore >= 75 ? '#059669' : overallScore >= 50 ? '#D97706' : '#C85A32';

  // SVG Circular progress math
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className={cn('space-y-8 max-w-4xl mx-auto', className)}>
      {/* Hero Summary Card */}
      <Card className="border-slate-200/90 shadow-sm overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-teal-50 via-slate-50 to-emerald-50 p-6 sm:p-8 border-b border-slate-200/80">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 justify-between">
            {/* Left: Headline & Verdict */}
            <div className="space-y-3 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Badge
                  variant={isReadyForPersonalPhone ? 'success' : 'accent'}
                  className="px-3 py-1 text-xs font-semibold gap-1.5"
                >
                  {isReadyForPersonalPhone ? (
                    <ShieldCheck className="h-3.5 w-3.5" />
                  ) : (
                    <Compass className="h-3.5 w-3.5" />
                  )}
                  {isReadyForPersonalPhone
                    ? 'Ready for Bilateral Smartphone Onboarding'
                    : 'Developing Readiness — Pre-Device Protocol Recommended'}
                </Badge>
                <span className="text-xs text-slate-500 font-medium">
                  First-Phone Readiness Assessment
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {childName}&apos;s Digital Maturity Score
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {recommendation}
              </p>
            </div>

            {/* Right: Circular Score Gauge */}
            <div className="relative flex flex-col items-center justify-center shrink-0">
              <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 140 140">
                {/* Background Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-slate-100"
                  fill="transparent"
                />
                {/* Progress Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke={strokeColor}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  fill="transparent"
                />
              </svg>
              {/* Centered Score Number */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${scoreColor}`}>
                  {overallScore}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Out of 100
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Roadmap Preset Banner */}
        <div className={`p-5 sm:p-6 border-b ${presetInfo.accentColor}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant={presetInfo.badgeVariant} className="text-xs uppercase tracking-wide">
                  Recommended Action Roadmap
                </Badge>
                <h3 className="text-base font-bold text-slate-900">{presetInfo.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {presetInfo.subtitle}
              </p>
            </div>
            <Link
              href={
                childId
                  ? `/agreements/new?childId=${childId}&preset=${recommendedRoadmapPreset}`
                  : '/agreements/new'
              }
              className="shrink-0 w-full sm:w-auto"
            >
              <Button size="sm" className="w-full sm:w-auto gap-1.5 font-semibold shadow-sm">
                <FileCheck2 className="h-4 w-4" />
                Generate This Pact
              </Button>
            </Link>
          </div>
        </div>

        {/* Strengths & Growth Areas Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 bg-white">
          {/* Key Strengths */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Demonstrated Strengths ({strengths.length})
            </h4>
            {strengths.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {strengths.map((dimKey) => (
                  <Badge
                    key={dimKey}
                    variant="success"
                    className="text-xs py-1 px-2.5 font-medium bg-emerald-50 text-emerald-800 border-emerald-200"
                  >
                    {DIMENSION_DISPLAY_NAMES[dimKey] || dimKey}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Digital safety instincts are still developing across primary dimensions.
              </p>
            )}
          </div>

          {/* Focus & Growth Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              Scaffolding Focus Areas ({growthAreas.length})
            </h4>
            {growthAreas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {growthAreas.map((dimKey) => (
                  <Badge
                    key={dimKey}
                    variant="accent"
                    className="text-xs py-1 px-2.5 font-medium bg-amber-50 text-amber-800 border-amber-200"
                  >
                    {DIMENSION_DISPLAY_NAMES[dimKey] || dimKey}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                No acute developmental deficits detected across the 10 evaluated dimensions.
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* 10-Dimension Breakdown Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              10-Dimension Developmental Breakdown
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Granular evaluation of executive function, peer resilience, and bedtime neurobiology.
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-medium">
            10 Dimensions
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {Object.entries(dimensionScores).map(([key, score]) => {
            const breakdown = dimensionBreakdown?.[key];
            const rating = breakdown?.rating || (score >= 80 ? 'HIGH' : score >= 60 ? 'MODERATE' : 'DEVELOPING');
            const guidance = breakdown?.guidance;
            const displayName = DIMENSION_DISPLAY_NAMES[key] || key;

            const ratingVariant =
              rating === 'HIGH' ? 'success' : rating === 'MODERATE' ? 'accent' : 'destructive';

            const barColor =
              rating === 'HIGH'
                ? 'bg-emerald-600'
                : rating === 'MODERATE'
                  ? 'bg-amber-500'
                  : 'bg-terracotta-500';

            return (
              <div
                key={key}
                className="rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs transition-colors hover:border-slate-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-slate-900">{displayName}</span>
                    <Badge variant={ratingVariant} className="text-[10px] px-2 py-0.5 uppercase tracking-wide">
                      {rating}
                    </Badge>
                  </div>
                  <span className="text-xs font-bold text-slate-800 self-end sm:self-auto">
                    {score}%
                  </span>
                </div>

                <Progress value={score} max={100} indicatorClassName={barColor} className="h-2 mb-2" />

                {guidance && (
                  <p className="text-xs text-slate-500 leading-relaxed mt-1.5">{guidance}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer Bar */}
      <Card className="border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">Next Step: Bilateral Collaboration</h4>
            <p className="text-xs text-slate-500">
              Turn these assessment insights into a binding, co-signed family pact.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
            {onRetake && (
              <Button variant="ghost" size="sm" onClick={onRetake} className="gap-1.5 text-xs">
                <RotateCcw className="h-3.5 w-3.5" />
                Retake Assessment
              </Button>
            )}
            <Link
              href={dashboardHref || (childId ? `/dashboard?childId=${childId}` : '/dashboard')}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Return to Dashboard
              </Button>
            </Link>
            <Link
              href={
                childId
                  ? `/agreements/new?childId=${childId}&preset=${recommendedRoadmapPreset}`
                  : '/agreements/new'
              }
              className="w-full sm:w-auto"
            >
              <Button size="sm" className="w-full sm:w-auto gap-1.5 font-semibold bg-teal-600 hover:bg-teal-700">
                Create Family Pact
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
