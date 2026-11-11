'use client';

import * as React from 'react';
import { Gamepad2, CheckSquare, Square, MessageCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PurposefulPlayBlueprintWidgetProps {
  isNightstandMode?: boolean;
  className?: string;
}

export function PurposefulPlayBlueprintWidget({
  isNightstandMode = false,
  className,
}: PurposefulPlayBlueprintWidgetProps) {
  const [checkedItems, setCheckedItems] = React.useState<Record<number, boolean>>({});

  const materials = [
    'Empty cardboard box or shoe box',
    '2 wooden kitchen spoons or spatulas',
    '3 different textured household items (sponge, soft cloth, dry pasta)',
  ];

  const languagePrompts = [
    '“Look how this surface feels bumpy compared to this smooth one! What does your hand think?”',
    '“What do you predict will happen if we slide the spoon down the ramp?”',
    '“Let’s test your theory together!”',
  ];

  const toggleMaterial = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div
      data-testid="purposeful-play-widget"
      aria-label="Purposeful Play Blueprint & Materials"
      className={cn(
        'rounded-2xl border p-5 sm:p-6 my-8 shadow-xs transition-colors space-y-5',
        isNightstandMode
          ? 'bg-stone-900 border-stone-800 text-stone-200'
          : 'bg-gradient-to-br from-teal-50/50 via-sky-50/30 to-white border-teal-200/90 text-slate-800',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
          <Gamepad2 className="h-4 w-4 text-teal-600" />
          <span>Purposeful Play · 5-Minute Low-Prep Developmental Lab</span>
        </div>
        <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
          Household Materials Only
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Materials Checklist */}
        <div
          className={cn(
            'p-4 rounded-xl border space-y-2.5',
            isNightstandMode
              ? 'bg-stone-800/80 border-stone-700'
              : 'bg-white border-teal-100'
          )}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-300 block">
            Household Items Needed:
          </span>
          <div className="space-y-2">
            {materials.map((mat, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleMaterial(i)}
                className="flex items-start gap-2.5 w-full text-left text-xs leading-snug"
              >
                <span className="text-teal-600 mt-0.5 shrink-0">
                  {checkedItems[i] ? (
                    <CheckSquare className="h-3.5 w-3.5" />
                  ) : (
                    <Square className="h-3.5 w-3.5 text-slate-400" />
                  )}
                </span>
                <span
                  className={cn(
                    checkedItems[i]
                      ? 'line-through text-slate-400 dark:text-stone-500'
                      : 'text-slate-700 dark:text-stone-200'
                  )}
                >
                  {mat}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Language Spark Prompts */}
        <div
          className={cn(
            'p-4 rounded-xl border space-y-2.5',
            isNightstandMode
              ? 'bg-stone-800/80 border-stone-700'
              : 'bg-white border-sky-100'
          )}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
            <MessageCircle className="h-3.5 w-3.5 text-sky-600" />
            <span>Language Expansion Prompts</span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-700 dark:text-stone-300 italic">
            {languagePrompts.map((p, i) => (
              <p key={i}>• {p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
