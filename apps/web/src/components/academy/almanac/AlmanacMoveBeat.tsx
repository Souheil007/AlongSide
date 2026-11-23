'use client';

import * as React from 'react';
import { Check, ArrowDown } from 'lucide-react';
import type { AlmanacLessonPayload } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface AlmanacMoveBeatProps {
  payload: AlmanacLessonPayload;
  chosenMoveId: string | null;
  onSelectMove: (moveId: string) => void;
  isNarrating: boolean;
  t: (str: string) => string;
}

export function AlmanacMoveBeat({
  payload,
  chosenMoveId,
  onSelectMove,
  isNarrating,
  t,
}: AlmanacMoveBeatProps) {
  const selectedMove = payload.moves.find((m) => m.id === chosenMoveId) ?? null;

  return (
    <section
      data-almanac-beat="3"
      data-testid="almanac-beat-4"
      aria-label="Beat 4: One Move"
      className="w-full bg-[var(--band-spruce)] px-4 sm:px-6 py-12 sm:py-16 scroll-mt-32 transition-colors duration-200"
    >
      <div
        className={cn(
          'relative mx-auto max-w-[700px]',
          isNarrating &&
            'before:absolute before:-left-4 before:top-1 before:bottom-1 before:w-[3px] before:rounded-full before:bg-[var(--spruce)]'
        )}
      >
        <span className="block text-[13px] font-semibold text-[var(--spruce)] mb-2">
          {t(payload.beat4Kicker)}
        </span>

        <h2 className="font-serif-almanac text-[26px] sm:text-[34px] font-semibold leading-[1.16] tracking-[-0.02em] text-[var(--ink)] mb-3.5">
          {t(payload.beat4Title)}
        </h2>

        <p className="text-[16px] leading-[1.66] text-[var(--body)] max-w-[60ch] mb-7">
          {t(payload.beat4Lead)}
        </p>

        {/* 3 Single-Select Micro-Experiment Cards (Live-populates Beat 5 Pocket Card) */}
        <div
          className="grid gap-3"
          role="radiogroup"
          aria-label={t(payload.beat4Title)}
        >
          {payload.moves.map((move) => {
            const isSelected = move.id === chosenMoveId;
            return (
              <button
                key={move.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-pressed={isSelected}
                onClick={() => onSelectMove(move.id)}
                data-testid={`move-card-${move.id}`}
                className={cn(
                  'grid w-full grid-cols-[24px_1fr] items-start gap-3.5 rounded-[14px] border bg-[var(--elevated)] px-5 py-4 sm:py-[18px] text-left transition-all duration-150 cursor-pointer',
                  isSelected
                    ? 'border-[var(--spruce)] ring-1 ring-[var(--spruce)] shadow-sm'
                    : 'border-[var(--hairline)] hover:border-[var(--spruce-border)] hover:-translate-y-px hover:shadow-sm'
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border-[1.5px] transition-colors',
                    isSelected
                      ? 'border-[var(--spruce)] bg-[var(--spruce)] text-[var(--elevated)]'
                      : 'border-[var(--mute)] bg-transparent text-transparent'
                  )}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.75} />
                </span>

                <div>
                  <span className="block text-[15.5px] font-semibold text-[var(--ink)] mb-1">
                    {t(move.title)}
                  </span>
                  <p className="text-[14px] leading-[1.55] text-[var(--body)] m-0">
                    {t(move.desc)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quiet Live Cue pointing down to Beat 5 Pocket Card (Zero competing save button) */}
        <div
          data-testid="move-live-cue"
          className="mt-4 flex min-h-[24px] items-center gap-2 text-[13.5px] font-medium text-[var(--spruce)]"
          aria-live="polite"
        >
          {selectedMove ? (
            <>
              <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Added to your Pocket Card below - ready to seal when you finish.
              </span>
            </>
          ) : (
            <span className="text-[var(--mute)] font-normal">
              Pick whichever feels lightest tonight - it drops straight onto your Pocket Card below.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
