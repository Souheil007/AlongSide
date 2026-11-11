'use client';

import * as React from 'react';
import { Utensils, Apple, Check, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FeedingResponsibilityWidgetProps {
  isNightstandMode?: boolean;
  className?: string;
}

export function FeedingResponsibilityWidget({
  isNightstandMode = false,
  className,
}: FeedingResponsibilityWidgetProps) {
  const [activeStep, setActiveStep] = React.useState<number>(1);

  const ladderSteps = [
    { step: 1, title: 'See & Tolerate', desc: 'Child allows food on table or plate without distress.' },
    { step: 2, title: 'Touch & Explore', desc: 'Child touches food with fingers or utensil.' },
    { step: 3, title: 'Smell & Kiss', desc: 'Child brings food to nose or lips to inspect aroma.' },
    { step: 4, title: 'Lick & Taste', desc: 'Child touches food with tongue or takes a micro-bite.' },
    { step: 5, title: 'Chew & Swallow', desc: 'Child chews and swallows or calmly spits into a napkin.' },
  ];

  return (
    <div
      data-testid="feeding-responsibility-widget"
      aria-label="Division of Responsibility in Feeding"
      className={cn(
        'rounded-2xl border p-5 sm:p-6 my-8 shadow-xs transition-colors space-y-5',
        isNightstandMode
          ? 'bg-stone-900 border-stone-800 text-stone-200'
          : 'bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-white border-amber-200/90 text-slate-800',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
          <Utensils className="h-4 w-4 text-amber-600" />
          <span>Division of Responsibility · Ellyn Satter Clinical Model</span>
        </div>
        <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
          Zero-Pressure Mealtime
        </span>
      </div>

      {/* 2x2 Responsibility Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Parent's Role */}
        <div
          className={cn(
            'p-4 rounded-xl border space-y-2',
            isNightstandMode
              ? 'bg-stone-800/80 border-stone-700'
              : 'bg-white border-amber-200/80'
          )}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            <ShieldCheck className="h-4 w-4 text-amber-600" />
            <span>The Parent Decides (The Boundary)</span>
          </div>
          <ul className="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-stone-300">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <strong>WHAT</strong> is served (nutritious meals with 1 safe food)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <strong>WHEN</strong> food is served (regular meal &amp; snack rhythm)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <strong>WHERE</strong> food is eaten (seated together at the table)
            </li>
          </ul>
        </div>

        {/* Child's Role */}
        <div
          className={cn(
            'p-4 rounded-xl border space-y-2',
            isNightstandMode
              ? 'bg-stone-800/80 border-stone-700'
              : 'bg-white border-teal-200/80'
          )}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
            <Apple className="h-4 w-4 text-teal-600" />
            <span>The Child Decides (Autonomy)</span>
          </div>
          <ul className="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-stone-300">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              <strong>IF</strong> they will eat from the options provided
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              <strong>HOW MUCH</strong> their body needs to feel satisfied
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              <strong>ZERO</strong> short-order cooking or coercive bribes
            </li>
          </ul>
        </div>
      </div>

      {/* 5-Step Exposure Ladder */}
      <div className="space-y-2.5 pt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-stone-400 block">
          The 5-Step Texture Exposure Progression
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {ladderSteps.map((item) => (
            <button
              key={item.step}
              type="button"
              onClick={() => setActiveStep(item.step)}
              className={cn(
                'p-2.5 rounded-xl border text-left transition-all',
                activeStep === item.step
                  ? isNightstandMode
                    ? 'bg-amber-950/60 border-amber-500 text-amber-100'
                    : 'bg-amber-600 text-white border-amber-700'
                  : isNightstandMode
                    ? 'bg-stone-800 border-stone-700 text-stone-300'
                    : 'bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50'
              )}
            >
              <div className="text-[10px] font-bold uppercase">Step {item.step}</div>
              <div className="text-xs font-semibold leading-tight mt-0.5">{item.title}</div>
            </button>
          ))}
        </div>

        {ladderSteps[activeStep - 1] && (
          <div
            className={cn(
              'p-3 rounded-lg border text-xs leading-relaxed',
              isNightstandMode
                ? 'bg-stone-800/80 border-stone-700 text-stone-300'
                : 'bg-amber-50/70 border-amber-200 text-slate-800'
            )}
          >
            <strong>Step {activeStep}: {ladderSteps[activeStep - 1]!.title} — </strong>
            <span>{ladderSteps[activeStep - 1]!.desc}</span>
          </div>
        )}
      </div>
    </div>
  );
}
