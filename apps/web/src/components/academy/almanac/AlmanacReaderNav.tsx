'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Headphones, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AlmanacReaderNavProps {
  moduleSlug: string;
  moduleTitle?: string;
  activeBeat: number;
  scrollPercent: number;
  listenMode: boolean;
  isNightstandMode: boolean;
  onJumpToBeat: (beatIndex: number) => void;
  onSetReadingMode: (mode: 'read' | 'listen') => void;
  onToggleNightstand: () => void;
}

const BEAT_ARIA_LABELS = [
  'Jump to Beat 1: The Mirror',
  'Jump to Beat 2: Inside Mind',
  'Jump to Beat 3: Practice',
  'Jump to Beat 4: One Move',
  'Jump to Beat 5: Pocket Card',
] as const;

export function AlmanacReaderNav({
  moduleSlug,
  moduleTitle,
  activeBeat,
  scrollPercent,
  listenMode,
  isNightstandMode,
  onJumpToBeat,
  onSetReadingMode,
  onToggleNightstand,
}: AlmanacReaderNavProps) {
  return (
    <header
      data-testid="almanac-reader-nav"
      className="sticky top-16 z-30 border-b border-[var(--hairline-soft)] bg-[var(--canvas)] transition-colors duration-200"
    >
      <div className="mx-auto flex h-[58px] max-w-[820px] items-center justify-between gap-3 px-4 sm:px-6">
        {/* Back to Course */}
        <Link
          href={`/academy/${moduleSlug}`}
          data-testid="almanac-back-to-course"
          className="inline-flex min-h-[44px] min-w-0 items-center gap-2 py-2 pr-2 text-[13px] font-medium text-[var(--body)] transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate max-w-[140px] sm:max-w-[240px]">
            {moduleTitle || 'Course Arc'}
          </span>
        </Link>

        {/* 5 Beat Progress Dots (Tablet & Desktop; mobile gets the 2px hairline) */}
        <nav
          aria-label="Lesson progress beats"
          className="hidden md:flex shrink-0 items-center gap-1.5"
        >
          {BEAT_ARIA_LABELS.map((ariaLabel, idx) => {
            const isActive = idx === activeBeat;
            const isPassed = idx < activeBeat;
            return (
              <button
                key={ariaLabel}
                type="button"
                onClick={() => onJumpToBeat(idx)}
                aria-label={ariaLabel}
                aria-current={isActive ? 'step' : undefined}
                className="flex min-h-[36px] items-center px-0.5 cursor-pointer bg-transparent border-0"
              >
                <span
                  className={cn(
                    'block h-[4px] rounded-full transition-all duration-200',
                    isActive
                      ? 'w-[34px] bg-[var(--spruce)]'
                      : isPassed
                        ? 'w-[22px] bg-[var(--spruce-border)]'
                        : 'w-[22px] bg-[var(--hairline)]'
                  )}
                />
              </button>
            );
          })}
        </nav>

        {/* Read | Listen Companion Switch + Nightstand Toggle */}
        <div className="flex shrink-0 items-center gap-2">
          <div
            role="group"
            aria-label="Read or listen mode"
            className="inline-flex items-center gap-0.5 rounded-full border border-[var(--hairline)] bg-[var(--canvas-subtle)] p-[3px]"
          >
            <button
              type="button"
              onClick={() => onSetReadingMode('read')}
              aria-pressed={!listenMode}
              data-testid="mode-read-btn"
              className={cn(
                'inline-flex min-h-[36px] items-center rounded-full px-3 text-[12px] font-semibold transition-all cursor-pointer',
                !listenMode
                  ? 'bg-[var(--elevated)] text-[var(--ink)] shadow-sm'
                  : 'bg-transparent text-[var(--body)] hover:text-[var(--ink)]'
              )}
            >
              Read
            </button>
            <button
              type="button"
              onClick={() => onSetReadingMode('listen')}
              aria-pressed={listenMode}
              data-testid="mode-listen-btn"
              className={cn(
                'inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold transition-all cursor-pointer',
                listenMode
                  ? 'bg-[var(--elevated)] text-[var(--ink)] shadow-sm'
                  : 'bg-transparent text-[var(--body)] hover:text-[var(--ink)]'
              )}
            >
              <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Listen</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onToggleNightstand}
            aria-pressed={isNightstandMode}
            aria-label="Toggle Nightstand warm dim mode"
            title="Nightstand warm dim mode"
            data-testid="nightstand-toggle"
            className={cn(
              'inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border transition-all cursor-pointer',
              isNightstandMode
                ? 'border-[var(--amber-border)] bg-[var(--amber-soft)] text-[var(--amber)]'
                : 'border-[var(--hairline)] bg-[var(--elevated)] text-[var(--body)] hover:border-[var(--spruce-border)] hover:text-[var(--ink)]'
            )}
          >
            {isNightstandMode ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Live 2px Spruce Scroll Progress Hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] bg-transparent"
        aria-hidden="true"
      >
        <div
          data-testid="almanac-scroll-hairline"
          className="h-full bg-[var(--spruce)] transition-[width] duration-100 ease-linear"
          style={{ width: `${Math.min(100, Math.max(0, scrollPercent))}%` }}
        />
      </div>
    </header>
  );
}
