'use client';

import * as React from 'react';
import { Wind, Play, Pause, Heart, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface SomaticBreathWidgetProps {
  isNightstandMode?: boolean;
  className?: string;
}

export function SomaticBreathWidget({
  isNightstandMode = false,
  className,
}: SomaticBreathWidgetProps) {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [phase, setPhase] = React.useState<'INHALE' | 'EXHALE'>('INHALE');
  const [countdown, setCountdown] = React.useState<number>(4);
  const [cyclesCompleted, setCyclesCompleted] = React.useState<number>(0);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (phase === 'INHALE') {
              setPhase('EXHALE');
              return 6; // 6s exhale
            } else {
              setPhase('INHALE');
              setCyclesCompleted((c) => c + 1);
              return 4; // 4s inhale
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, phase]);

  const toggleBreath = () => {
    if (!isActive) {
      setPhase('INHALE');
      setCountdown(4);
    }
    setIsActive((prev) => !prev);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('INHALE');
    setCountdown(4);
    setCyclesCompleted(0);
  };

  return (
    <div
      data-testid="somatic-breath-widget"
      aria-label="Somatic Grounding Breath Widget"
      className={cn(
        'rounded-2xl border p-5 sm:p-6 my-8 shadow-xs transition-colors space-y-5',
        isNightstandMode
          ? 'bg-stone-900 border-stone-800 text-stone-200'
          : 'bg-gradient-to-br from-teal-50/70 via-emerald-50/40 to-white border-teal-200/90 text-slate-800',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
          <Wind className="h-4 w-4 text-teal-600" />
          <span>Vagal Grounding · Physiological Sigh (4s In / 6s Out)</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-stone-400">
          <span>{cyclesCompleted} breaths done</span>
          {cyclesCompleted > 0 && (
            <button
              type="button"
              onClick={resetExercise}
              title="Reset breathing"
              aria-label="Reset breathing"
              className="p-1 hover:text-teal-600"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Animated Visual Circle */}
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative flex items-center justify-center w-36 h-36">
            {/* Outer pulsating ring */}
            <div
              className={cn(
                'absolute inset-0 rounded-full border-2 transition-all duration-1000 ease-in-out',
                phase === 'INHALE' && isActive
                  ? 'scale-110 border-teal-500 bg-teal-100/40 dark:bg-teal-950/40'
                  : 'scale-90 border-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20'
              )}
            />
            {/* Inner Core */}
            <div
              className={cn(
                'flex flex-col items-center justify-center w-24 h-24 rounded-full shadow-sm transition-transform duration-1000',
                isActive
                  ? phase === 'INHALE'
                    ? 'scale-105 bg-teal-600 text-white'
                    : 'scale-95 bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-700 dark:bg-stone-800 dark:text-stone-300'
              )}
            >
              <span className="text-xl font-extrabold font-mono">{countdown}s</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {isActive ? phase : 'READY'}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <Button
              type="button"
              size="sm"
              onClick={toggleBreath}
              data-testid="breath-toggle-btn"
              className={cn(
                'gap-1.5 font-semibold text-xs h-8 px-4 rounded-full shadow-xs transition-colors',
                isActive
                  ? 'bg-slate-700 hover:bg-slate-800 text-white'
                  : 'bg-teal-700 hover:bg-teal-800 text-white'
              )}
            >
              {isActive ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Pause Exercise</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Start 4s/6s Breathing</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Clinical Neurobiology Context */}
        <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-teal-900 dark:text-teal-200">
            <Heart className="h-3.5 w-3.5 text-rose-500" />
            <span>Why Caregiver Vagal Tone Regulates the Child</span>
          </div>
          <p className="text-slate-700 dark:text-stone-300">
            When a child enters a rage or meltdown, mirror neurons instantly spike the caregiver’s heart rate. Attempting to discipline with an elevated pulse transfers panic through neuroception.
          </p>
          <p className="text-slate-700 dark:text-stone-300">
            Extending your exhale to <strong>6 seconds</strong> stimulates the vagus nerve, immediately slowing your heart rate and releasing physical tension so your child can borrow your calm.
          </p>
        </div>
      </div>
    </div>
  );
}
