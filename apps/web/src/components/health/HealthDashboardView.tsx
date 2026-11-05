'use client';

import * as React from 'react';
import {
  HeartPulse,
  ShieldCheck,
  Moon,
  Stethoscope,
} from 'lucide-react';
import { useChildContextStore } from '@/stores/useChildContextStore';
import { useChildAge } from '@/hooks/useChildAge';
import { EmergencyRedFlagBanner } from './EmergencyRedFlagBanner';
import { SymptomTriageRunner } from './SymptomTriageRunner';
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

  // Active tab state
  const [activeTab, setActiveTab] = React.useState<'triage' | 'sleep'>('triage');

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Hero Header & Child Status Card */}
      <section
        aria-label="Health Sanctuary Overview"
        className="relative overflow-hidden rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-900 via-teal-950 to-slate-950 text-white p-6 sm:p-8 shadow-md"
      >
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-200 backdrop-blur-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
              <span>The Safe Resort • Barton Schmitt Clinical Protocols</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Pediatric Health & Symptom Companion
            </h1>
            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
              Medically conservative guidance for anxious moments. Calibrated 3-zone triage, sleep neurobiology, and clinical pediatric advisory.
            </p>
          </div>

          {/* Active Child Summary Pill */}
          <div className="shrink-0 rounded-2xl border border-teal-400/20 bg-white/10 p-4 backdrop-blur-md min-w-[240px]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-teal-200 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Active Patient</span>
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
              <span>Circadian &amp; Triage Calibrated</span>
              <button
                type="button"
                onClick={() => setActiveTab('triage')}
                className="font-bold text-teal-300 hover:text-white underline underline-offset-2 transition-colors"
              >
                Start Triage →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Red-Flag Banner (Always Present for Instant Clinical Safety) */}
      <EmergencyRedFlagBanner />

      {/* Navigation Tabs for Health Modules */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-px" aria-label="Health Navigation">
          <button
            type="button"
            onClick={() => setActiveTab('triage')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'triage'
                ? 'border-teal-600 text-teal-900'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            <Stethoscope className="h-4 w-4" />
            <span>3-Zone Symptom Triage</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sleep')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'sleep'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            <Moon className="h-4 w-4" />
            <span>Sleep Regression & Nap Transitions</span>
          </button>
        </nav>
      </div>

      {/* Active Tab View */}
      <div className="transition-opacity duration-200">
        {activeTab === 'triage' && (
          <section aria-label="Interactive Symptom Triage Runner">
            <SymptomTriageRunner />
          </section>
        )}

        {activeTab === 'sleep' && (
          <section aria-label="Sleep Regression Companion">
            <SleepRegressionCompanion />
          </section>
        )}
      </div>

      {/* Clinical Disclaimer Safe Harbor Footer */}
      <footer className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 text-xs text-slate-600 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <ShieldCheck className="h-4 w-4 text-teal-700" />
          <span>Clinical Authority & Legal Safe Harbor</span>
        </div>
        <p className="leading-relaxed">
          AlongSide’s Health Companion is designed for educational triage and communication preparation. Algorithmic rules are based on the Barton Schmitt Pediatric Telephone Protocols and American Academy of Pediatrics (AAP) Clinical Practice Guidelines. AlongSide is not a substitute for professional medical diagnosis, emergency medical services, or physician consultations. In acute emergencies, dial 911 immediately.
        </p>
      </footer>
    </div>
  );
}
