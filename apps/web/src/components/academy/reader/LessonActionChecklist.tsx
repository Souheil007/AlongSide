'use client';

import * as React from 'react';
import { ShieldCheck, CheckSquare, Square, RefreshCw } from 'lucide-react';
import type { ActionProtocolItem } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface LessonActionChecklistProps {
  lessonId: string;
  items?: ActionProtocolItem[];
  rawMarkdownItems?: string[];
  category?: string;
  lessonTitle?: string;
  title?: string;
  isNightstandMode?: boolean;
  className?: string;
}

export function LessonActionChecklist({
  lessonId,
  items,
  rawMarkdownItems,
  category,
  lessonTitle,
  title = 'Your 3-Step Checklist',
  isNightstandMode = false,
  className,
}: LessonActionChecklistProps) {
  const storageKey = `alongside-checklist-${lessonId}`;

  const effectiveItems: ActionProtocolItem[] = React.useMemo(() => {
    if (items && items.length > 0) return items;
    if (rawMarkdownItems && rawMarkdownItems.length > 0) {
      return rawMarkdownItems.map((text, i) => ({
        id: `chk-${i}`,
        label: text,
      }));
    }

    const catUpper = (category || '').toUpperCase();
    const titleLower = (lessonTitle || '').toLowerCase();

    if (
      catUpper.includes('NUTRITION') ||
      titleLower.includes('food') ||
      titleLower.includes('eat') ||
      titleLower.includes('snack') ||
      titleLower.includes('sweet')
    ) {
      return [
        {
          id: 'step-1',
          label: 'The Safe Anchor Food',
          detail:
            'Always place one familiar, non-threatening safe food on the table to reduce mealtime fight-or-flight arousal.',
        },
        {
          id: 'step-2',
          label: 'Division of Responsibility',
          detail:
            'You decide what and when to serve; allow your child to decide whether and how much to eat with zero commentary.',
        },
        {
          id: 'step-3',
          label: 'Neutral Meal Conclusion',
          detail:
            'Conclude dinner without forced clean-plate rules, dessert leverage, or pressure to try extra bites.',
        },
      ];
    }

    if (
      catUpper.includes('HEALTH') ||
      titleLower.includes('sleep') ||
      titleLower.includes('bedtime') ||
      titleLower.includes('nap')
    ) {
      return [
        {
          id: 'step-1',
          label: 'The 60-Minute Dim Shift',
          detail:
            'Dim overhead lighting and lower room luminescence 60 minutes before bed to stimulate endogenous melatonin.',
        },
        {
          id: 'step-2',
          label: 'The Cool Sleep Sanctuary',
          detail:
            'Set bedroom temperature to 65–68°F and keep ambient sound low for restorative deep sleep cycles.',
        },
        {
          id: 'step-3',
          label: 'The Neutral Return Protocol',
          detail:
            'Guide bedtime stallers back to bed with gentle silence and zero stimulating verbal negotiations.',
        },
      ];
    }

    if (
      catUpper.includes('DIGITAL') ||
      titleLower.includes('screen') ||
      titleLower.includes('phone') ||
      titleLower.includes('gaming') ||
      titleLower.includes('device')
    ) {
      return [
        {
          id: 'step-1',
          label: 'The Central Charging Station',
          detail:
            'Dock all household phones and tablets in a shared living room station 60 minutes before bedtime.',
        },
        {
          id: 'step-2',
          label: 'The Tactile Transition Buffer',
          detail:
            'Set out kinetic sand, drawing markers, or a quick card game before screen time expires to eliminate the transition void.',
        },
        {
          id: 'step-3',
          label: 'Collaborative Pact Check-In',
          detail:
            'Review digital boundaries together as cooperative teammates rather than adversaries.',
        },
      ];
    }

    if (
      catUpper.includes('DEVELOPMENT') ||
      catUpper.includes('PLAY') ||
      titleLower.includes('play') ||
      titleLower.includes('game')
    ) {
      return [
        {
          id: 'step-1',
          label: 'High-Presence Floor Time',
          detail:
            'Spend 10 uninterrupted minutes entering your child’s imaginative play without directing or correcting.',
        },
        {
          id: 'step-2',
          label: 'Open-Ended Material Setup',
          detail:
            'Provide unstructured building materials (blocks, boxes, loose parts) with no predetermined right way.',
        },
        {
          id: 'step-3',
          label: 'Effort & Persistence Praise',
          detail:
            'Praise their curiosity, problem-solving, and resilience rather than final product perfection.',
        },
      ];
    }

    return [
      {
        id: 'step-1',
        label: 'Somatic Co-Regulation Pause',
        detail:
          'Drop your shoulders and take 3 slow diaphragmatic breaths before responding to the storm.',
      },
      {
        id: 'step-2',
        label: 'Validate the Emotional Storm',
        detail:
          'Acknowledge what they are feeling in under 8 words before attempting any logical explanation.',
      },
      {
        id: 'step-3',
        label: 'Reconnect Before Problem-Solving',
        detail:
          'Wait until physiological baseline returns before discussing household boundaries or solutions.',
      },
    ];
  }, [items, rawMarkdownItems, category, lessonTitle]);

  const [checkedState, setCheckedState] = React.useState<Record<string, boolean>>({});

  // Load from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) {
          setCheckedState(JSON.parse(stored));
        }
      } catch {
        // Fallback gracefully
      }
    }
  }, [storageKey]);

  const toggleItem = (id: string) => {
    setCheckedState((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const handleReset = () => {
    setCheckedState({});
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
  };

  const completedCount = effectiveItems.filter((it) => !!checkedState[it.id]).length;

  return (
    <section
      data-testid="action-checklist"
      aria-label={title}
      className={cn(
        'rounded-2xl border p-5 sm:p-6 space-y-4 my-8 shadow-xs transition-colors',
        isNightstandMode
          ? 'bg-stone-900 border-stone-800 text-stone-200'
          : 'bg-slate-50/80 border-slate-200/90 text-slate-800',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
          <ShieldCheck className="h-4 w-4 text-teal-600" />
          <span>{title}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-stone-400">
          <span>
            {completedCount} of {effectiveItems.length} completed
          </span>
          {completedCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              title="Reset checklist"
              aria-label="Reset checklist"
              className="p-1 hover:text-teal-600 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2.5">
        {effectiveItems.map((item, idx) => {
          const isChecked = !!checkedState[item.id];
          return (
            <button
              key={item.id}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={() => toggleItem(item.id)}
              className={cn(
                'flex items-start gap-3 w-full p-3 sm:p-3.5 rounded-xl text-left transition-all border shadow-2xs',
                isChecked
                  ? isNightstandMode
                    ? 'bg-emerald-950/30 border-emerald-900/60 text-stone-400'
                    : 'bg-emerald-50/70 border-emerald-200 text-slate-900'
                  : isNightstandMode
                    ? 'bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-800'
                    : 'bg-white border-slate-200/90 text-slate-800 hover:bg-slate-50'
              )}
            >
              <span className="mt-0.5 shrink-0 text-emerald-600">
                {isChecked ? (
                  <CheckSquare className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Square className="h-4 w-4 text-slate-400 dark:text-stone-500" />
                )}
              </span>
              <div className="space-y-0.5">
                <span
                  className={cn(
                    'text-xs sm:text-sm font-bold block leading-snug',
                    isChecked && 'line-through text-slate-500 dark:text-stone-400'
                  )}
                >
                  {idx + 1}. {item.label}
                </span>
                {item.detail && (
                  <p
                    className={cn(
                      'text-xs leading-relaxed text-slate-600 dark:text-stone-400',
                      isChecked && 'line-through text-slate-400 dark:text-stone-500'
                    )}
                  >
                    {item.detail}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
