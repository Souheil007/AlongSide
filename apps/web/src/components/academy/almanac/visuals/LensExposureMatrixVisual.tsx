'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LensExposureMatrixVisualProps {
  config?: Record<string, unknown>;
  t: (str: string) => string;
}

export function LensExposureMatrixVisual({
  config,
  t,
}: LensExposureMatrixVisualProps) {
  const adultLabel =
    (config?.adultLabel as string) || 'Adult lens';
  const adultQuote =
    (config?.adultQuote as string) ||
    '“{Pronoun} {is} being stubborn - {pronoun} won’t even take ONE bite!”';
  const adultSub =
    (config?.adultSub as string) ||
    'When we invest care and hit resistance, it naturally feels personal or willful.';
  const childLabel =
    (config?.childLabel as string) || '{Possessive} brain lens';
  const childQuote =
    (config?.childQuote as string) ||
    '“Unfamiliar bitter green = unknown plant! Stick to safe predictable foods.”';
  const childSub =
    (config?.childSub as string) ||
    'An ancient survival safety switch turning on right on schedule - not defiance.';

  const exposureHeading =
    (config?.exposureHeading as string) || 'The 20-Sighting Familiarity Map';
  const exposureSub =
    (config?.exposureSub as string) ||
    'Tap any dot to see trust grow without pressure';
  const totalDots =
    typeof config?.totalDots === 'number' && config.totalDots >= 5 && config.totalDots <= 20
      ? config.totalDots
      : 20;
  const defaultCount =
    typeof config?.defaultCount === 'number'
      ? Math.min(totalDots, Math.max(1, config.defaultCount))
      : Math.min(7, totalDots);
  const unitLabel = (config?.unitLabel as string) || 'sighting';
  const lowMax = typeof config?.lowMax === 'number' ? config.lowMax : Math.floor(totalDots * 0.3);
  const midMax = typeof config?.midMax === 'number' ? config.midMax : Math.floor(totalDots * 0.7);
  const lowMsg =
    (config?.lowMsg as string) ||
    'Early reps: High caution is completely normal. Sharing the room calmly with zero pressure banks real progress.';
  const midMsg =
    (config?.midMsg as string) ||
    'Middle reps: The threat alarm softens - curiosity, poking, and tiny low-stakes experiments emerge.';
  const highMsg =
    (config?.highMsg as string) ||
    'Familiar friend! Spontaneous comfort and confidence arrive naturally right when pressure stays lowest.';

  const [lens, setLens] = React.useState<'adult' | 'child'>('child');
  const [count, setCount] = React.useState<number>(defaultCount);

  const statusText =
    count <= lowMax ? lowMsg : count <= midMax ? midMsg : highMsg;

  return (
    <div data-testid="visual-lens-exposure-matrix">
      {/* Lens Flip Buttons */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4"
        role="group"
        aria-label="Compare parent and child perspectives"
      >
        <button
          type="button"
          onClick={() => setLens('adult')}
          aria-pressed={lens === 'adult'}
          data-testid="lens-btn-adult"
          className={cn(
            'min-h-[48px] px-4 py-3 rounded-[10px] border text-left text-sm font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer',
            lens === 'adult'
              ? 'bg-[var(--amber-soft)] border-[var(--amber-border)] text-[var(--amber)]'
              : 'bg-[var(--canvas-subtle)] border-[var(--hairline)] text-[var(--body)] hover:border-[var(--amber-border)]'
          )}
        >
          <span>{t(adultLabel)}</span>
          <span className="font-mono text-[11px] uppercase opacity-75">
            {lens === 'adult' ? 'Active' : 'View'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setLens('child')}
          aria-pressed={lens === 'child'}
          data-testid="lens-btn-child"
          className={cn(
            'min-h-[48px] px-4 py-3 rounded-[10px] border text-left text-sm font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer',
            lens === 'child'
              ? 'bg-[var(--spruce-soft)] border-[var(--spruce-border)] text-[var(--spruce)]'
              : 'bg-[var(--canvas-subtle)] border-[var(--hairline)] text-[var(--body)] hover:border-[var(--spruce-border)]'
          )}
        >
          <span>{t(childLabel)}</span>
          <span className="font-mono text-[11px] uppercase opacity-75">
            {lens === 'child' ? 'Active' : 'View'}
          </span>
        </button>
      </div>

      {/* Active Lens Panel */}
      <div
        key={lens}
        className="rounded-xl bg-[var(--canvas-subtle)] p-5 sm:p-6 almanac-rise-in"
      >
        <p className="font-serif-almanac text-[20px] sm:text-[21px] leading-snug text-[var(--ink)] mb-2">
          {t(lens === 'adult' ? adultQuote : childQuote)}
        </p>
        <p className="text-[14px] leading-relaxed text-[var(--body)] m-0">
          {t(lens === 'adult' ? adultSub : childSub)}
        </p>
      </div>

      {/* Tactile Exposure Dot Matrix */}
      <div className="mt-5 pt-5 border-t border-[var(--hairline-soft)]">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3.5">
          <div>
            <p className="text-[13.5px] font-semibold text-[var(--ink)]">
              {t(exposureHeading)}
            </p>
            <p className="text-[12px] text-[var(--mute)]">{t(exposureSub)}</p>
          </div>
          <span
            data-testid="exposure-count-readout"
            className="font-mono text-xs font-semibold text-[var(--spruce)] bg-[var(--spruce-soft)] px-2.5 py-1 rounded-full tabular-nums"
          >
            {count} of {totalDots} {unitLabel}
            {count === 1 ? '' : 's'}
          </span>
        </div>

        <div
          className={cn(
            'grid gap-2 mb-3.5',
            totalDots <= 10
              ? 'grid-cols-5 sm:grid-cols-10'
              : totalDots <= 16
                ? 'grid-cols-4 sm:grid-cols-8'
                : 'grid-cols-5 sm:grid-cols-10'
          )}
          role="group"
          aria-label="Familiarity exposure counter"
        >
          {Array.from({ length: totalDots }, (_, i) => {
            const num = i + 1;
            const filled = num <= count;
            const toneClass = !filled
              ? 'bg-[var(--canvas)] border-[var(--hairline)] text-[var(--mute)]'
              : count <= lowMax
                ? 'bg-[var(--amber-soft)] border-[var(--amber-border)] text-[var(--amber)] font-semibold'
                : count <= midMax
                  ? 'bg-[var(--spruce-soft)] border-[var(--spruce-border)] text-[var(--spruce)] font-semibold'
                  : 'bg-[var(--spruce)] border-[var(--spruce)] text-[var(--elevated)] font-semibold';

            return (
              <button
                key={num}
                type="button"
                onClick={() => setCount(num)}
                aria-label={`Set to ${num} ${unitLabel}s`}
                aria-pressed={num === count}
                data-testid={`exp-dot-${num}`}
                className={cn(
                  'aspect-square min-h-[38px] rounded-full border-[1.5px] font-mono text-[11px] flex items-center justify-center transition-all duration-150 cursor-pointer hover:border-[var(--spruce)] hover:scale-105',
                  toneClass
                )}
              >
                {num}
              </button>
            );
          })}
        </div>

        <p className="text-[14.5px] leading-relaxed text-[var(--body)] min-h-[44px] m-0">
          {t(statusText)}
        </p>
      </div>
    </div>
  );
}
