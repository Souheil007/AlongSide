'use client';

import * as React from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight,
  FileCheck2,
  RotateCcw,
} from 'lucide-react';
import {
  type ReadinessAssessmentResult,
  ReadinessPreset,
} from '@alongside/shared';
import {
  CANONICAL_READINESS_QUESTIONS,
  READINESS_CHAPTERS,
} from '@/stores/useReadinessStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export interface ReadinessScoreCardProps {
  childId?: string;
  childName?: string;
  result: ReadinessAssessmentResult;
  onRetake?: () => void;
  dashboardHref?: string;
  className?: string;
}

const SHORT_DIMENSION_LABELS: Record<string, string> = Object.fromEntries(
  CANONICAL_READINESS_QUESTIONS.map((q) => [q.dimensionKey, q.shortLabel])
);

function getPresetSummary(preset: ReadinessPreset | string, childName: string) {
  switch (preset) {
    case ReadinessPreset.ROAD_2_AUTONOMY_CHARTER:
      return {
        statusLabel: 'Ready for a bilateral pact',
        headline: `${childName} is ready for shared ownership`,
        nextTitle: 'Recommended path: Autonomy & Trust Pact',
        nextBody:
          'Strong everyday habits and honest communication are already in place. Sit down together to agree on bedtime docking and mutual privacy promises.',
        ctaLabel: `Build ${childName}'s Family Pact`,
        tone: 'spruce' as const,
      };
    case ReadinessPreset.ROAD_2_SCAFFOLDED_PACT:
      return {
        statusLabel: 'Ready with calm guardrails',
        headline: `${childName} has a solid foundation`,
        nextTitle: 'Recommended path: Guided Family Pact',
        nextBody:
          'Most habits are clicking, with a couple of spots that still need backup. A co-signed pact with an automated bedtime dock takes the friction off your shoulders.',
        ctaLabel: `Build ${childName}'s Family Pact`,
        tone: 'spruce' as const,
      };
    case ReadinessPreset.ROAD_1_BRIDGE_CHARTER:
      return {
        statusLabel: 'Best started with a bridge step',
        headline: `${childName} is building the muscles`,
        nextTitle: 'Recommended path: Bridge Device & Shared Pact',
        nextBody:
          'A smartwatch, shared family tablet, or basic call-and-text device lets them practice boundaries before a full smartphone enters the picture.',
        ctaLabel: `Start a Bridge Pact for ${childName}`,
        tone: 'amber' as const,
      };
    case ReadinessPreset.ROAD_1_PRE_DEVICE_FOUNDATION:
    default:
      return {
        statusLabel: 'Habits first, personal phone later',
        headline: `Practice on shared screens first`,
        nextTitle: 'Recommended path: Pre-Device Family Pact',
        nextBody:
          'Transitions and sleep habits still take real work right now. A simple shared-screen pact lets you practice stopping calmly without the pressure of a personal phone.',
        ctaLabel: `Create a Starter Pact for ${childName}`,
        tone: 'amber' as const,
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
    recommendation,
    recommendedRoadmapPreset,
    strengths,
    growthAreas,
  } = result;

  const presetSummary = getPresetSummary(recommendedRoadmapPreset, childName);
  const isStrong = overallScore >= 75;
  const strokeColor = isStrong ? '#143D2B' : '#B45309';

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const scoreNumRef = React.useRef<HTMLSpanElement>(null);
  const circleRef = React.useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: overallScore,
          duration: 0.9,
          ease: 'power2.out',
          onUpdate: () => {
            if (scoreNumRef.current) {
              scoreNumRef.current.textContent = Math.round(counter.val).toString();
            }
          },
        });

        if (circleRef.current) {
          gsap.fromTo(
            circleRef.current,
            { strokeDashoffset: circumference },
            {
              strokeDashoffset,
              duration: 1,
              ease: 'power2.out',
            }
          );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [overallScore, strokeDashoffset] }
  );

  const pactHref = childId
    ? `/pacts/builder?childId=${childId}&preset=${recommendedRoadmapPreset}`
    : `/pacts/builder?preset=${recommendedRoadmapPreset}`;

  return (
    <div ref={containerRef} className={cn('space-y-8', className)}>
      {/* Primary Editorial Readiness Briefing */}
      <section className="overflow-hidden rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)]">
        {/* Warm Sand Hero Band */}
        <div className="border-b border-[var(--hairline-soft)] bg-[var(--trigger-bg)] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2.5 flex-1">
              <span
                className={cn(
                  'inline-block text-[13px] font-semibold',
                  isStrong ? 'text-[var(--spruce)]' : 'text-[var(--amber)]'
                )}
              >
                {presetSummary.statusLabel}
              </span>

              <h1 className="font-serif-almanac text-[28px] sm:text-[34px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--ink)]">
                {presetSummary.headline}
              </h1>

              <p className="text-[15px] leading-[1.6] text-[var(--body)] max-w-[52ch]">
                {recommendation}
              </p>
            </div>

            {/* Clean Circular Readiness Dial */}
            <div className="relative flex flex-col items-center justify-center shrink-0 self-start sm:self-center">
              <svg
                className="h-32 w-32 -rotate-90 transform"
                viewBox="0 0 132 132"
                aria-hidden="true"
              >
                <circle
                  cx="66"
                  cy="66"
                  r={radius}
                  stroke="#e3dfd4"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  ref={circleRef}
                  cx="66"
                  cy="66"
                  r={radius}
                  stroke={strokeColor}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span
                  ref={scoreNumRef}
                  className={cn(
                    'font-serif-almanac text-[34px] font-semibold leading-none tabular-nums',
                    isStrong ? 'text-[var(--spruce)]' : 'text-[var(--amber)]'
                  )}
                >
                  {overallScore}
                </span>
                <span className="mt-1 text-[11px] font-medium text-[var(--mute)] tabular-nums">
                  out of 100
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Next Step Band */}
        <div
          className={cn(
            'border-b border-[var(--hairline-soft)] px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4',
            presetSummary.tone === 'spruce'
              ? 'bg-[var(--spruce-soft)]'
              : 'bg-[var(--amber-soft)]'
          )}
        >
          <div className="space-y-1 max-w-[54ch]">
            <h2 className="text-[15px] font-semibold text-[var(--ink)]">
              {presetSummary.nextTitle}
            </h2>
            <p className="text-[13.5px] leading-[1.55] text-[var(--body)]">
              {presetSummary.nextBody}
            </p>
          </div>
          <Link href={pactHref} className="shrink-0">
            <Button variant="forest" className="w-full sm:w-auto gap-2 rounded-[8px]">
              <FileCheck2 className="h-4 w-4" aria-hidden="true" />
              <span>{presetSummary.ctaLabel}</span>
            </Button>
          </Link>
        </div>

        {/* Strengths & Practice Areas Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--hairline-soft)]">
          <div className="p-6 sm:p-7 space-y-3">
            <h3 className="text-[14px] font-semibold text-[var(--ink)]">
              Already strong ({strengths.length})
            </h3>
            {strengths.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {strengths.map((dimKey) => (
                  <li
                    key={dimKey}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--spruce-border)] bg-[var(--spruce-soft)] px-3 py-1 text-[13px] font-medium text-[var(--spruce)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--spruce)]" aria-hidden="true" />
                    {SHORT_DIMENSION_LABELS[dimKey] || dimKey}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13.5px] text-[var(--body)] leading-relaxed">
                These habits are still warming up—and that is completely normal before a first device.
              </p>
            )}
          </div>

          <div className="p-6 sm:p-7 space-y-3">
            <h3 className="text-[14px] font-semibold text-[var(--ink)]">
              Worth practicing next ({growthAreas.length})
            </h3>
            {growthAreas.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {growthAreas.map((dimKey) => (
                  <li
                    key={dimKey}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--amber-border)] bg-[var(--amber-soft)] px-3 py-1 text-[13px] font-medium text-[var(--amber)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber)]" aria-hidden="true" />
                    {SHORT_DIMENSION_LABELS[dimKey] || dimKey}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13.5px] text-[var(--body)] leading-relaxed">
                No urgent friction spots stood out across the three chapters.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Calm 3-Chapter Breakdown (Grouped so it never feels like a wall of 10 cards) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-serif-almanac text-[22px] font-semibold text-[var(--ink)]">
            Where {childName} stands, chapter by chapter
          </h2>
          <p className="text-[13.5px] text-[var(--body)]">
            Use the lower bars to decide which promises matter most in your family pact.
          </p>
        </div>

        <div className="space-y-4">
          {READINESS_CHAPTERS.map((chapter) => {
            const chapterQuestions = CANONICAL_READINESS_QUESTIONS.filter(
              (q) => q.chapter === chapter.id && dimensionScores[q.dimensionKey] !== undefined
            );
            if (chapterQuestions.length === 0) return null;

            return (
              <div
                key={chapter.id}
                className="rounded-[16px] border border-[var(--hairline)] bg-[var(--elevated)] p-5 sm:p-6 space-y-4"
              >
                <div className="border-b border-[var(--hairline-soft)] pb-3">
                  <h3 className="text-[15px] font-semibold text-[var(--ink)]">
                    {chapter.title}
                  </h3>
                  <p className="text-[13px] text-[var(--mute)]">{chapter.subtitle}</p>
                </div>

                <div className="divide-y divide-[var(--hairline-soft)]">
                  {chapterQuestions.map((q) => {
                    const score = dimensionScores[q.dimensionKey] ?? 0;
                    const breakdown = dimensionBreakdown?.[q.dimensionKey];
                    const rating =
                      breakdown?.rating ||
                      (score >= 80 ? 'HIGH' : score >= 60 ? 'MODERATE' : 'DEVELOPING');
                    const guidance = breakdown?.guidance;
                    const ratingText =
                      rating === 'HIGH'
                        ? 'Ready'
                        : rating === 'MODERATE'
                          ? 'Steady'
                          : 'Practice';
                    const barColor =
                      rating === 'HIGH'
                        ? 'bg-[var(--spruce)]'
                        : rating === 'MODERATE'
                          ? 'bg-[#6fa088]'
                          : 'bg-[var(--amber)]';

                    return (
                      <div key={q.id} className="py-3.5 first:pt-0 last:pb-0 space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-[14px] font-semibold text-[var(--ink)] truncate">
                              {q.shortLabel}
                            </span>
                            <span
                              className={cn(
                                'text-[12px] font-medium',
                                rating === 'DEVELOPING'
                                  ? 'text-[var(--amber)]'
                                  : 'text-[var(--spruce)]'
                              )}
                            >
                              · {ratingText}
                            </span>
                          </div>
                          <span className="text-[13px] font-semibold text-[var(--ink)] tabular-nums shrink-0">
                            {score}%
                          </span>
                        </div>

                        <div
                          className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--canvas-subtle)]"
                          role="progressbar"
                          aria-valuenow={score}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${q.shortLabel} readiness score`}
                        >
                          <div
                            className={cn('h-full rounded-full transition-all duration-300', barColor)}
                            style={{ width: `${score}%` }}
                          />
                        </div>

                        {guidance && (
                          <p className="text-[13px] leading-relaxed text-[var(--body)]">
                            {guidance}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quiet Footer Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[16px] border border-[var(--hairline)] bg-[var(--elevated)] p-5 sm:p-6">
        <div className="space-y-0.5">
          <h3 className="text-[15px] font-semibold text-[var(--ink)]">
            Turn this snapshot into a real agreement
          </h3>
          <p className="text-[13px] text-[var(--body)]">
            Pick a bedtime dock time and trade promises side by side with {childName}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onRetake && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRetake}
              className="gap-1.5 min-h-[44px]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Retake</span>
            </Button>
          )}
          <Link href={dashboardHref || '/devices'}>
            <Button variant="outline" size="sm" className="min-h-[44px]">
              Back to Devices
            </Button>
          </Link>
          <Link href={pactHref}>
            <Button variant="forest" size="sm" className="gap-1.5 min-h-[44px] rounded-[8px]">
              <span>Create Family Pact</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
