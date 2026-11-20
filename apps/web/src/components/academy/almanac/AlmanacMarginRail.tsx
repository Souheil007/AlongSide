'use client';

import * as React from 'react';
import { BEAT_CHAPTER_LABELS } from '@/hooks/useAlmanacLessonState';
import { cn } from '@/lib/utils';

export interface AlmanacMarginRailProps {
  activeBeat: number;
  onJumpToBeat: (beatIndex: number) => void;
}

/**
 * Quiet Desktop Left-Margin Chapter Rail (visible on wide desktop >= 1280px).
 * Uses sticky positioning inside the folio container so it never overlaps the app navigation.
 */
export function AlmanacMarginRail({
  activeBeat,
  onJumpToBeat,
}: AlmanacMarginRailProps) {
  return (
    <aside
      aria-label="Lesson chapters"
      data-testid="almanac-margin-rail"
      className="hidden xl:block pointer-events-none absolute inset-y-0 left-5 z-20 w-[154px]"
    >
      <div className="sticky top-[156px] pointer-events-auto flex flex-col gap-1.5 py-2">
        {BEAT_CHAPTER_LABELS.map((label, idx) => {
          const isActive = idx === activeBeat;
          const isPassed = idx < activeBeat;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onJumpToBeat(idx)}
              aria-current={isActive ? 'step' : undefined}
              className={cn(
                'flex min-h-[34px] items-center gap-2.5 bg-transparent border-0 py-1 text-left text-[12px] transition-colors cursor-pointer',
                isActive
                  ? 'font-semibold text-[var(--spruce)]'
                  : 'font-medium text-[var(--mute)] hover:text-[var(--ink)]'
              )}
            >
              <span
                className={cn(
                  'shrink-0 transition-all duration-200',
                  isActive
                    ? 'h-[2px] w-[20px] bg-[var(--spruce)]'
                    : isPassed
                      ? 'h-[1.5px] w-[10px] bg-[var(--spruce-border)]'
                      : 'h-[1.5px] w-[10px] bg-[var(--hairline)]'
                )}
              />
              <span className="font-mono text-[10.5px] opacity-75">
                0{idx + 1}
              </span>
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
