'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SensoryLadderStep {
  label: string;
  title: string;
  desc: string;
  tag: string;
}

const DEFAULT_STEPS: SensoryLadderStep[] = [
  {
    label: 'Table',
    title: '1. Shares the table peacefully',
    desc: 'Simply seeing the unfamiliar food across the table without tears builds the first visual safety memory.',
    tag: 'Step 1 · Visual safety',
  },
  {
    label: 'Plate',
    title: '2. Rests calmly beside a safe anchor',
    desc: 'One tiny piece sits next to a trusted favorite food—the threat alarm stays turned off.',
    tag: 'Step 2 · Safe neighbor',
  },
  {
    label: 'Touch',
    title: '3. Pokes with a fork or fingertip',
    desc: 'Tapping or moving the food lets curious fingers test firmness and texture before tasting.',
    tag: 'Step 3 · Tactile curiosity',
  },
  {
    label: 'Smell',
    title: '4. Sniffs or brings it near lips',
    desc: 'Smell carries 80% of flavor memory—breathing in the aroma gently lowers caution.',
    tag: 'Step 4 · Flavor preview',
  },
  {
    label: 'Taste',
    title: '5. Curious lick or small bite on their terms',
    desc: 'Once steps 1–4 feel safe, tasting happens naturally—often weeks later when nobody is pushing.',
    tag: 'Step 5 · Self-chosen bite',
  },
];

export interface SensoryLadderVisualProps {
  config?: Record<string, unknown>;
  t: (str: string) => string;
}

export function SensoryLadderVisual({ config, t }: SensoryLadderVisualProps) {
  const steps = React.useMemo<SensoryLadderStep[]>(() => {
    const raw = config?.steps;
    if (Array.isArray(raw) && raw.length >= 3) {
      return raw.slice(0, 5) as SensoryLadderStep[];
    }
    return DEFAULT_STEPS;
  }, [config]);

  const [stepIdx, setStepIdx] = React.useState<number>(Math.min(2, steps.length - 1));
  const current = steps[stepIdx] ?? steps[0]!;

  const bowlSprigOpacity = stepIdx === 0 ? 1 : 0.35;
  const plateSprigVisible = stepIdx >= 1;
  const touchCue = stepIdx === 2;
  const smellCue = stepIdx === 3;
  const tasteRing = stepIdx >= 4;

  const rungHeights = [
    'sm:min-h-[64px]',
    'sm:min-h-[70px]',
    'sm:min-h-[76px]',
    'sm:min-h-[82px]',
    'sm:min-h-[88px]',
  ];

  return (
    <div data-testid="visual-sensory-ladder">
      {/* Live evolving editorial overhead plate scene */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 items-center rounded-[14px] bg-[var(--canvas-subtle)] p-5 mb-4">
        <div className="flex items-center justify-center">
          <svg
            viewBox="0 0 210 164"
            fill="none"
            className="w-full max-w-[192px] h-auto"
            aria-hidden="true"
          >
            {/* Shared table bowl */}
            <circle
              cx="166"
              cy="36"
              r="24"
              fill="var(--elevated)"
              stroke="var(--hairline)"
              strokeWidth="1.5"
            />
            <g opacity={bowlSprigOpacity}>
              <path
                d="M156 40C162 34 170 31 178 30"
                stroke="var(--spruce)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <ellipse
                cx="166"
                cy="32"
                rx="4.5"
                ry="2.5"
                transform="rotate(-24 166 32)"
                fill="var(--spruce-soft)"
                stroke="var(--spruce)"
                strokeWidth="1.2"
              />
              <ellipse
                cx="174"
                cy="36"
                rx="4.5"
                ry="2.5"
                transform="rotate(14 174 36)"
                fill="var(--spruce-soft)"
                stroke="var(--spruce)"
                strokeWidth="1.2"
              />
            </g>
            {stepIdx === 0 && (
              <path
                d="M138 48C128 54 122 60 116 68"
                stroke="var(--amber)"
                strokeWidth="1.4"
                strokeDasharray="3 4"
                strokeLinecap="round"
              />
            )}

            {/* Child dinner plate */}
            <circle
              cx="88"
              cy="102"
              r="52"
              fill="var(--elevated)"
              stroke={tasteRing ? 'var(--spruce)' : 'var(--ink)'}
              strokeWidth={tasteRing ? 2.4 : 1.5}
            />
            {tasteRing && (
              <circle
                cx="88"
                cy="102"
                r="58"
                stroke="var(--spruce)"
                strokeWidth="1.3"
                strokeDasharray="4 4"
                opacity="0.65"
              />
            )}
            <circle
              cx="88"
              cy="102"
              r="40"
              stroke="var(--hairline)"
              strokeWidth="1.1"
              strokeDasharray="3 3"
            />

            {/* Safe warm bread anchor */}
            <path
              d="M56 96C56 86 64 80 74 80C84 80 91 86 91 96V113C91 117 88 120 84 120H63C59 120 56 117 56 113V96Z"
              fill="var(--amber-soft)"
              stroke="var(--amber)"
              strokeWidth="1.5"
            />

            {/* Unfamiliar green sprig on plate from Step 2+ */}
            {plateSprigVisible && (
              <g>
                <path
                  d="M100 112C106 105 113 102 121 101"
                  stroke="var(--spruce)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="109"
                  cy="102"
                  rx="5"
                  ry="2.8"
                  transform="rotate(-26 109 102)"
                  fill="var(--spruce-soft)"
                  stroke="var(--spruce)"
                  strokeWidth="1.3"
                />
                <ellipse
                  cx="117"
                  cy="106"
                  rx="5"
                  ry="2.8"
                  transform="rotate(14 117 106)"
                  fill="var(--spruce-soft)"
                  stroke="var(--spruce)"
                  strokeWidth="1.3"
                />
              </g>
            )}

            {/* Step 3: Fork touch */}
            {touchCue && (
              <g>
                <path
                  d="M150 132L124 110"
                  stroke="var(--amber)"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M120 106L127 113M124 103L130 109"
                  stroke="var(--amber)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M112 88V82M123 91L127 87"
                  stroke="var(--spruce)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Step 4: Aroma curls */}
            {smellCue && (
              <g>
                <path
                  d="M106 90C103 83 109 78 106 71"
                  stroke="var(--amber)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M116 88C113 81 119 76 116 69"
                  stroke="var(--spruce)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M126 91C123 85 129 80 126 74"
                  stroke="var(--amber)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Step 5: Trust badge */}
            {tasteRing && (
              <g>
                <circle cx="132" cy="64" r="12" fill="var(--spruce)" />
                <path
                  d="M127 64L130.5 67.5L137.5 60.5"
                  stroke="var(--elevated)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif-almanac text-[21px] font-semibold text-[var(--ink)] leading-snug">
            {t(current.title)}
          </h3>
          <p className="text-[14.5px] leading-relaxed text-[var(--body)]">
            {t(current.desc)}
          </p>
          <div className="pt-1">
            <span className="inline-block font-mono text-[11px] font-semibold text-[var(--spruce)] bg-[var(--spruce-soft)] px-2.5 py-1 rounded-full">
              {t(current.tag)}
            </span>
          </div>
        </div>
      </div>

      {/* Stepped ascending ladder rungs */}
      <div
        className="grid grid-cols-5 gap-1.5 sm:gap-2 items-end"
        role="group"
        aria-label="Sensory ladder steps"
      >
        {steps.map((step, idx) => {
          const isActive = idx === stepIdx;
          const isReached = idx < stepIdx;
          return (
            <button
              key={step.label}
              type="button"
              onClick={() => setStepIdx(idx)}
              aria-pressed={isActive}
              data-testid={`ladder-rung-${idx}`}
              className={cn(
                'rounded-xl border px-1.5 py-2.5 sm:px-2 sm:py-3 min-h-[60px] flex flex-col items-center justify-center gap-1 text-center transition-all duration-200 cursor-pointer',
                rungHeights[idx] ?? 'sm:min-h-[72px]',
                isActive
                  ? 'bg-[var(--spruce)] border-[var(--spruce)] text-[var(--elevated)] -translate-y-0.5 shadow-md'
                  : isReached
                    ? 'bg-[var(--spruce-soft)] border-[var(--spruce-border)] text-[var(--spruce)]'
                    : 'bg-[var(--canvas-subtle)] border-[var(--hairline)] text-[var(--body)] hover:border-[var(--spruce-border)] hover:text-[var(--ink)]'
              )}
            >
              <span className="font-mono text-[10px] opacity-80">0{idx + 1}</span>
              <span className="text-[11px] sm:text-[13px] font-semibold leading-tight">
                {t(step.label)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
