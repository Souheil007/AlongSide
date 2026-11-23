'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HabitGuardrailVisualProps {
  config?: Record<string, unknown>;
  t: (str: string) => string;
}

export function HabitGuardrailVisual({ config, t }: HabitGuardrailVisualProps) {
  const [side, setSide] = React.useState<'willpower' | 'guardrail'>('guardrail');

  const willpowerLabel = (config?.willpowerLabel as string) || 'Willpower & Policing';
  const willpowerTitle =
    (config?.willpowerTitle as string) || 'Fighting the same habit every day';
  const willpowerDesc =
    (config?.willpowerDesc as string) ||
    'Relying on constant verbal reminders exhausts parents and turns every boundary into a personal tug-of-war.';
  const willpowerOutcome =
    (config?.willpowerOutcome as string) || 'High daily friction and parent burnout.';

  const guardrailLabel = (config?.guardrailLabel as string) || 'Neutral Guardrail';
  const guardrailTitle =
    (config?.guardrailTitle as string) || 'Letting the environment hold the limit';
  const guardrailDesc =
    (config?.guardrailDesc as string) ||
    'Clear house spaces and predictable visual rhythms do the heavy lifting quietly - so your voice stays warm.';
  const guardrailOutcome =
    (config?.guardrailOutcome as string) || 'Calmer cooperation with zero lecturing.';

  const shifts = Array.isArray(config?.environmentShifts)
    ? (config!.environmentShifts as string[])
    : [
        'Shape the room or routine so the healthy choice is the easiest choice.',
        'Let a neutral clock, basket, or house zone hold the limit instead of nagging.',
        'Pair every clear “no” with one easy, appealing “yes.”',
      ];

  const isGuardrail = side === 'guardrail';

  return (
    <div data-testid="visual-habit-guardrail" className="space-y-4">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
        role="group"
        aria-label="Compare policing versus neutral guardrail"
      >
        <button
          type="button"
          onClick={() => setSide('willpower')}
          aria-pressed={!isGuardrail}
          data-testid="guardrail-btn-willpower"
          className={cn(
            'min-h-[48px] px-4 py-3 rounded-[10px] border text-left text-sm font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer',
            !isGuardrail
              ? 'bg-[var(--amber-soft)] border-[var(--amber-border)] text-[var(--amber)]'
              : 'bg-[var(--canvas-subtle)] border-[var(--hairline)] text-[var(--body)] hover:border-[var(--amber-border)]'
          )}
        >
          <span>{t(willpowerLabel)}</span>
          <span className="font-mono text-[11px] uppercase opacity-75">
            {!isGuardrail ? 'Active' : 'View'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSide('guardrail')}
          aria-pressed={isGuardrail}
          data-testid="guardrail-btn-guardrail"
          className={cn(
            'min-h-[48px] px-4 py-3 rounded-[10px] border text-left text-sm font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer',
            isGuardrail
              ? 'bg-[var(--spruce-soft)] border-[var(--spruce-border)] text-[var(--spruce)]'
              : 'bg-[var(--canvas-subtle)] border-[var(--hairline)] text-[var(--body)] hover:border-[var(--spruce-border)]'
          )}
        >
          <span>{t(guardrailLabel)}</span>
          <span className="font-mono text-[11px] uppercase opacity-75">
            {isGuardrail ? 'Active' : 'View'}
          </span>
        </button>
      </div>

      <div
        key={side}
        className="rounded-[14px] bg-[var(--canvas-subtle)] p-5 sm:p-6 almanac-rise-in space-y-3"
      >
        <h3 className="font-serif-almanac text-[21px] font-semibold text-[var(--ink)] leading-snug">
          {t(isGuardrail ? guardrailTitle : willpowerTitle)}
        </h3>
        <p className="text-[14.5px] leading-relaxed text-[var(--body)] m-0">
          {t(isGuardrail ? guardrailDesc : willpowerDesc)}
        </p>
        <p
          className={cn(
            'text-[13px] font-semibold m-0',
            isGuardrail ? 'text-[var(--spruce)]' : 'text-[var(--amber)]'
          )}
        >
          Result: {t(isGuardrail ? guardrailOutcome : willpowerOutcome)}
        </p>

        {isGuardrail && shifts.length > 0 && (
          <ul className="pt-3 mt-3 border-t border-[var(--hairline-soft)] space-y-2 list-none p-0 m-0">
            {shifts.map((shift, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[var(--ink)]"
              >
                <span className="mt-1 h-4 w-4 rounded-full bg-[var(--spruce-soft)] text-[var(--spruce)] flex items-center justify-center shrink-0">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                <span>{t(shift)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
