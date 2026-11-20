'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RoutineStep {
  timeOrCue: string;
  label: string;
  title: string;
  desc: string;
  why: string;
}

const DEFAULT_STEPS: RoutineStep[] = [
  {
    timeOrCue: 'Step 1',
    label: 'Preview Calmly',
    title: 'Give one clear concrete cue ahead of time',
    desc: 'Let {name} see what comes next before tension spikes.',
    why: 'Predictability lowers autonomic alarm automatically.',
  },
  {
    timeOrCue: 'Step 2',
    label: 'Join Briefly',
    title: 'Connect at eye level for 30 seconds',
    desc: 'Warm connection right before a boundary invites cooperation.',
    why: 'A connected brain shifts gears smoothly.',
  },
  {
    timeOrCue: 'Step 3',
    label: 'Simple Sequence',
    title: 'Run the exact same 2–3 calm beats',
    desc: 'Let the predictable routine hold the boundary instead of nagging.',
    why: 'Consistent order wires automatic daily habits.',
  },
  {
    timeOrCue: 'Step 4',
    label: 'Warm Finish',
    title: 'Land on a calm, proud next anchor',
    desc: 'Close the transition cleanly and move cheerfully forward.',
    why: 'Positive endings make tomorrow’s transition even easier.',
  },
];

export interface RoutineTimelineVisualProps {
  config?: Record<string, unknown>;
  t: (str: string) => string;
}

export function RoutineTimelineVisual({ config, t }: RoutineTimelineVisualProps) {
  const steps = React.useMemo<RoutineStep[]>(() => {
    const raw = config?.steps;
    if (Array.isArray(raw) && raw.length >= 3) {
      return raw.slice(0, 5) as RoutineStep[];
    }
    return DEFAULT_STEPS;
  }, [config]);

  const [activeIdx, setActiveIdx] = React.useState<number>(0);
  const current = steps[activeIdx] ?? steps[0]!;

  return (
    <div data-testid="visual-routine-timeline" className="space-y-4">
      {/* Connected Step Strip */}
      <div
        className={cn(
          'grid gap-2',
          steps.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
        )}
        role="group"
        aria-label="Routine sequence steps"
      >
        {steps.map((step, idx) => {
          const isActive = idx === activeIdx;
          const isDone = idx < activeIdx;
          return (
            <button
              key={step.label}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-pressed={isActive}
              data-testid={`routine-step-${idx}`}
              className={cn(
                'min-h-[56px] p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1',
                isActive
                  ? 'bg-[var(--spruce)] border-[var(--spruce)] text-[var(--elevated)] shadow-sm -translate-y-0.5'
                  : isDone
                    ? 'bg-[var(--spruce-soft)] border-[var(--spruce-border)] text-[var(--spruce)]'
                    : 'bg-[var(--canvas-subtle)] border-[var(--hairline)] text-[var(--body)] hover:border-[var(--spruce-border)]'
              )}
            >
              <span className="font-mono text-[10.5px] uppercase tracking-wider opacity-80">
                {t(step.timeOrCue)}
              </span>
              <span className="text-[13px] font-semibold leading-snug">
                {t(step.label)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Readout */}
      <div
        key={activeIdx}
        className="rounded-[14px] bg-[var(--canvas-subtle)] p-5 sm:p-6 almanac-rise-in space-y-2.5"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--amber-soft)] text-[var(--amber)]">
            {t(current.timeOrCue)}
          </span>
          <span className="font-mono text-[11px] text-[var(--mute)]">
            Beat {activeIdx + 1} of {steps.length}
          </span>
        </div>
        <h3 className="font-serif-almanac text-[21px] font-semibold text-[var(--ink)] leading-snug">
          {t(current.title)}
        </h3>
        <p className="text-[14.5px] leading-relaxed text-[var(--body)] m-0">
          {t(current.desc)}
        </p>
        <div className="pt-2 border-t border-[var(--hairline-soft)] text-[13.5px] text-[var(--spruce)]">
          <span className="font-mono text-[11px] uppercase tracking-wider mr-1.5 opacity-80">
            Why it works ·
          </span>
          {t(current.why)}
        </div>
      </div>
    </div>
  );
}
