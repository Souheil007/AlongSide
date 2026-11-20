'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ServeReturnStep {
  stepNum: string;
  actor: string;
  label: string;
  quote: string;
  desc: string;
  brainNote: string;
}

const DEFAULT_STEPS: ServeReturnStep[] = [
  {
    stepNum: '01',
    actor: '{Name} serves',
    label: 'The Serve',
    quote: 'A gaze, sound, question, or big feeling reaching out to you',
    desc: 'Notice the small bid underneath the moment before rushing into fixing or lecturing.',
    brainNote: 'Social-connection circuits open waiting for a warm echo.',
  },
  {
    stepNum: '02',
    actor: 'You return warmly',
    label: 'The Return',
    quote: 'Eye-level warmth, echoed words, and a calm steady anchor',
    desc: 'Mirroring what {name} expressed tells {poss} nervous system: “You are seen and safe.”',
    brainNote: 'Reciprocal mirror pathways fire and strengthen relational trust.',
  },
  {
    stepNum: '03',
    actor: 'Pause & hand back',
    label: 'The Open Turn',
    quote: 'Wait 4–5 calm seconds for {possessive} next move or response',
    desc: 'Giving generous unhurried space lets {possessive} own brain practice leading the next beat.',
    brainNote: 'Wires lasting confidence, language, and independent regulation.',
  },
];

export interface ServeReturnVisualProps {
  config?: Record<string, unknown>;
  t: (str: string) => string;
}

export function ServeReturnVisual({ config, t }: ServeReturnVisualProps) {
  const steps = React.useMemo<ServeReturnStep[]>(() => {
    const raw = config?.steps;
    if (Array.isArray(raw) && raw.length >= 3) {
      return raw.slice(0, 3) as ServeReturnStep[];
    }
    return DEFAULT_STEPS;
  }, [config]);

  const [activeIdx, setActiveIdx] = React.useState<number>(0);
  const current = steps[activeIdx] ?? steps[0]!;

  return (
    <div data-testid="visual-serve-return-loop" className="space-y-4">
      {/* Editorial 3-Node Reciprocal Arc Diagram */}
      <div className="rounded-[14px] bg-[var(--canvas-subtle)] p-4 sm:p-5">
        <svg
          viewBox="0 0 380 86"
          fill="none"
          className="w-full max-w-[380px] mx-auto h-auto mb-3 block"
          aria-hidden="true"
        >
          {/* Forward & return gentle arcs */}
          <path
            d="M72 42 C110 14, 150 14, 188 42"
            stroke={activeIdx >= 1 ? 'var(--spruce)' : 'var(--hairline)'}
            strokeWidth="2"
            strokeDasharray={activeIdx >= 1 ? undefined : '4 4'}
            strokeLinecap="round"
          />
          <path
            d="M192 42 C230 14, 270 14, 308 42"
            stroke={activeIdx >= 2 ? 'var(--amber)' : 'var(--hairline)'}
            strokeWidth="2"
            strokeDasharray={activeIdx >= 2 ? undefined : '4 4'}
            strokeLinecap="round"
          />
          <path
            d="M306 52 C245 78, 135 78, 74 52"
            stroke="var(--spruce-border)"
            strokeWidth="1.4"
            strokeDasharray="3 4"
            strokeLinecap="round"
          />

          {[70, 190, 310].map((cx, idx) => {
            const isActive = idx === activeIdx;
            const fill = isActive
              ? idx === 2
                ? 'var(--amber)'
                : 'var(--spruce)'
              : 'var(--elevated)';
            const stroke = idx === 2 ? 'var(--amber)' : 'var(--spruce)';
            return (
              <g
                key={cx}
                onClick={() => setActiveIdx(idx)}
                className="cursor-pointer"
              >
                <circle
                  cx={cx}
                  cy="44"
                  r={isActive ? 20 : 16}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="2"
                />
                <text
                  x={cx}
                  y="48"
                  textAnchor="middle"
                  fill={isActive ? 'var(--elevated)' : stroke}
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fontWeight="700"
                >
                  0{idx + 1}
                </text>
              </g>
            );
          })}
        </svg>

        <div
          className="grid grid-cols-3 gap-2"
          role="group"
          aria-label="Reciprocal connection loop beats"
        >
          {steps.map((step, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={step.stepNum}
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-pressed={isActive}
                data-testid={`loop-beat-${idx}`}
                className={cn(
                  'min-h-[48px] px-2.5 py-2 rounded-[10px] border text-center transition-all cursor-pointer',
                  isActive
                    ? 'bg-[var(--spruce)] border-[var(--spruce)] text-[var(--elevated)] shadow-xs'
                    : 'bg-[var(--elevated)] border-[var(--hairline)] text-[var(--body)] hover:border-[var(--spruce-border)]'
                )}
              >
                <span className="block font-mono text-[10px] opacity-80">
                  {t(step.actor)}
                </span>
                <span className="block text-[12.5px] font-semibold leading-tight mt-0.5">
                  {t(step.label)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Beat Details */}
      <div
        key={activeIdx}
        className="rounded-xl bg-[var(--canvas-subtle)] p-5 almanac-rise-in space-y-2"
      >
        <p className="font-serif-almanac italic text-[19px] leading-snug text-[var(--ink)] m-0">
          {t(current.quote)}
        </p>
        <p className="text-[14.5px] leading-relaxed text-[var(--body)] m-0">
          {t(current.desc)}
        </p>
        <p className="pt-1.5 font-mono text-[11.5px] text-[var(--spruce)] m-0">
          Inside the brain · {t(current.brainNote)}
        </p>
      </div>
    </div>
  );
}
