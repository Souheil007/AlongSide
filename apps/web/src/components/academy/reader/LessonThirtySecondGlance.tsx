'use client';

import * as React from 'react';
import {
  Zap,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Compass,
  MessageSquare,
} from 'lucide-react';
import type { ThirtySecondGlance } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface LessonThirtySecondGlanceProps {
  glance?: ThirtySecondGlance | null;
  defaultOpen?: boolean;
  isNightstandMode?: boolean;
  className?: string;
  eyebrow?: string;
  title?: string;
}

export function LessonThirtySecondGlance({
  glance,
  defaultOpen = true,
  isNightstandMode = false,
  className,
  eyebrow,
  title,
}: LessonThirtySecondGlanceProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultOpen);

  const effectiveGlance: ThirtySecondGlance = glance || {
    coreProblem:
      'A normal wave of big feelings as their brain builds self-regulation. Logic in the heat of the moment inflames friction.',
    immediateShift:
      'Drop your eye level below your child. Take a calm breath. Speak under 8 soft words to offer a steady anchor.',
    exactWords:
      '"I can see this feels so big right now. You are safe. I am right here with you."',
  };

  return (
    <section
      data-testid="thirty-second-glance"
      aria-label="Quick 30-Second Read"
      className={cn(
        'rounded-2xl border transition-colors overflow-hidden shadow-xs',
        isNightstandMode
          ? 'bg-amber-950/20 border-amber-900/60 text-stone-200'
          : 'bg-amber-50/50 border-amber-200/90 text-slate-800',
        className
      )}
    >
      {/* Header Bar with Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        data-testid="thirty-second-glance-toggle"
        aria-expanded={isOpen}
        className={cn(
          'w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors',
          isNightstandMode
            ? 'hover:bg-amber-900/20'
            : 'hover:bg-amber-100/50'
        )}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-lg shadow-xs font-bold',
              isNightstandMode
                ? 'bg-amber-500 text-stone-950'
                : 'bg-amber-500 text-white'
            )}
          >
            <Zap className="h-4 w-4 fill-current" />
          </span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
              {eyebrow || '⚡ Quick 30-Second Read'}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-amber-100">
              {title || 'The Short Version at a Glance'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
          <span>{isOpen ? 'Hide' : 'Expand'}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {/* Expandable Body */}
      {isOpen && (
        <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 space-y-3.5 border-t border-amber-200/50 dark:border-amber-900/40">
          {/* 1. Core Problem -> What's Going On */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
              <AlertTriangle className="h-3 w-3" />
            </span>
            <div>
              <strong className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 block">
                What&apos;s Going On
              </strong>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-stone-300">
                {effectiveGlance.coreProblem}
              </p>
            </div>
          </div>

          {/* 2. Immediate Shift -> Your Best First Move */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300">
              <Compass className="h-3 w-3" />
            </span>
            <div>
              <strong className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-300 block">
                Your Best First Move
              </strong>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-stone-300">
                {effectiveGlance.immediateShift}
              </p>
            </div>
          </div>

          {/* 3. Exact Words -> What to Say */}
          <div className="flex items-start gap-3 rounded-xl border border-emerald-300/80 bg-white dark:bg-stone-900 p-3 sm:p-3.5">
            <span className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <MessageSquare className="h-3 w-3" />
            </span>
            <div>
              <strong className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block mb-0.5">
                What to Say
              </strong>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-emerald-100 italic">
                {effectiveGlance.exactWords}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
