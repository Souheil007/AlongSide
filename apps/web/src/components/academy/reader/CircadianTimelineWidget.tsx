'use client';

import * as React from 'react';
import { Moon, Sun, AlertCircle, Clock, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CircadianTimelineWidgetProps {
  isNightstandMode?: boolean;
  className?: string;
}

interface TimelineSlot {
  time: string;
  phase: string;
  description: string;
  isOptimalBedtime?: boolean;
}

export function CircadianTimelineWidget({
  isNightstandMode = false,
  className,
}: CircadianTimelineWidgetProps) {
  const [selectedSlot, setSelectedSlot] = React.useState<number>(2);

  const slots: TimelineSlot[] = [
    {
      time: '07:00 AM',
      phase: 'Cortisol Awakening Surge',
      description:
        'Natural light exposure suppresses remaining melatonin and sets the 14-hour biological timer for evening sleepiness.',
    },
    {
      time: '02:30 PM',
      phase: 'Post-Lunch Dip & Reset',
      description:
        'Core body temperature experiences a natural midday dip. Keep activities calm; avoid caffeine or high sugar for older kids.',
    },
    {
      time: '07:15 PM',
      phase: 'Melatonin Window Opens',
      description:
        'Pineal gland begins releasing melatonin. Blue light exposure here pushes the sleep window back by 90 minutes.',
      isOptimalBedtime: true,
    },
    {
      time: '08:30 PM',
      phase: 'Optimal Deep NREM Target',
      description:
        'Optimal sleep onset. Prefrontal growth hormone release peaks during the first 3 hours of deep NREM sleep.',
      isOptimalBedtime: true,
    },
  ];

  return (
    <div
      data-testid="circadian-timeline-widget"
      aria-label="Circadian Sleep & Melatonin Timeline"
      className={cn(
        'rounded-2xl border p-5 sm:p-6 my-8 shadow-xs transition-colors space-y-5',
        isNightstandMode
          ? 'bg-stone-900 border-stone-800 text-stone-200'
          : 'bg-gradient-to-br from-indigo-50/50 via-slate-50 to-white border-indigo-200/80 text-slate-800',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
          <Moon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span>Restorative Sleep · 24-Hour Circadian Window</span>
        </div>
        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
          Pediatric Chronobiology
        </span>
      </div>

      {/* 24-Hour Visual Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {slots.map((slot, idx) => {
          const isSelected = selectedSlot === idx;
          return (
            <button
              key={slot.time}
              type="button"
              onClick={() => setSelectedSlot(idx)}
              className={cn(
                'p-3 rounded-xl border text-left transition-all',
                isSelected
                  ? isNightstandMode
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-100 shadow-sm'
                    : 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                  : isNightstandMode
                    ? 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-750'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:bg-indigo-50/50'
              )}
            >
              <div className="flex items-center justify-between text-xs font-bold font-mono">
                <span>{slot.time}</span>
                {slot.isOptimalBedtime && (
                  <Moon className="h-3 w-3 fill-current opacity-80" />
                )}
              </div>
              <p
                className={cn(
                  'text-xs font-semibold mt-1 leading-snug line-clamp-1',
                  isSelected
                    ? isNightstandMode
                      ? 'text-indigo-200'
                      : 'text-indigo-100'
                    : 'text-slate-900 dark:text-stone-200'
                )}
              >
                {slot.phase}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Slot Description Card */}
      {selectedSlot !== null && slots[selectedSlot] && (
        <div
          className={cn(
            'p-4 rounded-xl border text-xs sm:text-sm leading-relaxed transition-colors',
            isNightstandMode
              ? 'bg-stone-800/80 border-stone-700 text-stone-300'
              : 'bg-white border-indigo-100 text-slate-700'
          )}
        >
          <strong className="text-indigo-900 dark:text-indigo-300 block mb-1">
            {slots[selectedSlot]!.phase} ({slots[selectedSlot]!.time})
          </strong>
          <p>{slots[selectedSlot]!.description}</p>
        </div>
      )}

      {/* Pediatric Red Flags Box */}
      <div className="rounded-xl border border-rose-200/90 bg-rose-50/60 dark:bg-rose-950/20 dark:border-rose-900/60 p-4 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400">
          <ShieldAlert className="h-4 w-4 text-rose-600" />
          <span>Pediatric Red Flags: When to Consult a Clinician</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-rose-900 dark:text-rose-200">
          Chronic nighttime mouth-breathing, snoring with audible pauses (apnea), or sudden bedwetting regression after age 6 warrant immediate pediatric airway evaluation rather than sleep training.
        </p>
      </div>
    </div>
  );
}
