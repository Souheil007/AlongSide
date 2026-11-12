'use client';

import * as React from 'react';
import {
  Moon,
  Sparkles,
  Bed,
} from 'lucide-react';
import { useChildContextStore } from '@/stores/useChildContextStore';
import { useChildAge } from '@/hooks/useChildAge';
import { SleepRegressionCompanion } from './SleepRegressionCompanion';

interface HealthDashboardViewProps {
  initialChildId?: string;
}

export function HealthDashboardView({ initialChildId }: HealthDashboardViewProps) {
  const { activeChildId, setActiveChild } = useChildContextStore();
  const childAge = useChildAge();

  // Sync initialChildId if provided and differs
  React.useEffect(() => {
    if (initialChildId && initialChildId !== activeChildId) {
      setActiveChild(initialChildId);
    }
  }, [initialChildId, activeChildId, setActiveChild]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Hero Header & Child Status Card */}
      <section
        aria-label="Restorative Sleep & Wellness Overview"
        className="relative overflow-hidden rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-900 via-teal-950 to-slate-950 text-white p-6 sm:p-8 shadow-md"
      >
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-200 backdrop-blur-xs">
              <Moon className="h-3.5 w-3.5 text-teal-300" />
              <span>Pediatric Sleep Foundations • Circadian Biology</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Restorative Sleep &amp; Circadian Rhythms
            </h1>
            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
              Developmental sleep architecture, wake window calibration, and soothing routines to nurture restful family nights.
            </p>
          </div>

          {/* Active Child Summary Pill */}
          <div className="shrink-0 rounded-2xl border border-teal-400/20 bg-white/10 p-4 backdrop-blur-md min-w-[240px]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30">
                <Bed className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-teal-200 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Active Child</span>
                  {childAge.isAutoCalibrated && (
                    <span className="rounded-full bg-teal-500/30 px-1.5 py-0.2 text-[9px] font-bold text-teal-200 border border-teal-400/40">
                      Auto-Calibrated
                    </span>
                  )}
                </div>
                <div className="text-base font-bold text-white">
                  {childAge.name} ({childAge.ageDisplay})
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-teal-500/20 pt-2.5 text-xs text-teal-200/80">
              <span>Circadian Stage Calibrated</span>
              <span className="font-semibold text-teal-300">
                Ages 0–18 Guidance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Header */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-800">
          <Moon className="h-4 w-4 text-indigo-600" />
          <span>Sleep Regression & Nap Transitions</span>
        </h2>
      </div>

      {/* Sleep Regression Companion */}
      <section aria-label="Sleep Regression Companion">
        <SleepRegressionCompanion />
      </section>

      {/* Educational Advisory Disclaimer Footer */}
      <footer className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 text-xs text-slate-600 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <Sparkles className="h-4 w-4 text-teal-700" />
          <span>Developmental Guidance &amp; Restorative Routines</span>
        </div>
        <p className="leading-relaxed">
          AlongSide’s sleep architecture guidance is educational and grounded in developmental sleep science and pediatric circadian research. AlongSide does not provide medical diagnosis or treatment. For medical concerns, always consult your licensed pediatrician.
        </p>
      </footer>
    </div>
  );
}
