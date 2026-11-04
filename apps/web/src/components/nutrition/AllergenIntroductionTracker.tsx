'use client';

import * as React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  Calendar,
  RefreshCw,
  Flame,
  Check,
} from 'lucide-react';
import { CANONICAL_ALLERGEN_SCHEDULE } from '@/lib/api/nutrition';
import type { AllergenScheduleItemDTO } from '@alongside/shared';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';

type AllergenStatus = 'NOT_STARTED' | 'INTRODUCED_TOLERATED' | 'REACTION_OBSERVED';

const STORAGE_KEY = 'alongside_allergen_tracker_status_v1';

export function AllergenIntroductionTracker() {
  const [allergens, setAllergens] = React.useState<AllergenScheduleItemDTO[]>(CANONICAL_ALLERGEN_SCHEDULE);
  const [selectedAllergenId, setSelectedAllergenId] = React.useState<string>(CANONICAL_ALLERGEN_SCHEDULE[0]?.id || 'allergen-peanut');

  // Load status from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, AllergenStatus>;
        setAllergens((prev) =>
          prev.map((item) => ({
            ...item,
            status: parsed[item.id] || item.status,
          }))
        );
      }
    } catch {
      // Fallback
    }
  }, []);

  const updateStatus = (id: string, status: AllergenStatus) => {
    setAllergens((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, status } : item));
      try {
        const stateToSave = updated.reduce<Record<string, AllergenStatus>>((acc, item) => {
          if (item.status) {
            acc[item.id] = item.status;
          }
          return acc;
        }, {});
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const selectedItem = allergens.find((a) => a.id === selectedAllergenId) || allergens[0]!;

  const toleratedCount = allergens.filter((a) => a.status === 'INTRODUCED_TOLERATED').length;
  const completionPercentage = Math.round((toleratedCount / allergens.length) * 100);

  return (
    <div className="space-y-6">
      {/* Overview Progress Banner */}
      <div className="rounded-2xl border border-teal-200/90 bg-teal-50/50 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-teal-950">
                Top 8 Early Allergen Introduction Tracker
              </h3>
              <p className="text-xs text-teal-800">
                Early, proactive introduction between 4–11 months prevents 70–80% of childhood food allergies (LEAP & EAT Trials)
              </p>
            </div>
          </div>
          <div className="text-right self-start sm:self-center">
            <div className="text-xl font-extrabold text-teal-900">{toleratedCount} of {allergens.length}</div>
            <div className="text-xs text-teal-700 font-semibold">Tolerated & Maintained</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-teal-900">
            <span>Immunological Tolerance Progress</span>
            <span>{completionPercentage}% complete</span>
          </div>
          <Progress value={completionPercentage} className="h-2.5 bg-teal-200/70" indicatorClassName="bg-teal-600" />
        </div>

        {/* Clinical Safe Intro Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-teal-950">
          <div className="rounded-xl border border-teal-200 bg-white/80 p-2.5 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-teal-800">
              <Clock className="h-3.5 w-3.5" />
              <span>Morning Timing</span>
            </div>
            <p className="text-[11px] text-slate-600">Introduce on weekday mornings so clinics are open if delayed reactions occur.</p>
          </div>
          <div className="rounded-xl border border-teal-200 bg-white/80 p-2.5 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-teal-800">
              <Sparkles className="h-3.5 w-3.5" />
              <span>One-at-a-Time</span>
            </div>
            <p className="text-[11px] text-slate-600">Wait 3–5 days between each new allergen to isolate specific triggers.</p>
          </div>
          <div className="rounded-xl border border-teal-200 bg-white/80 p-2.5 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-teal-800">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Maintenance (2-3x/wk)</span>
            </div>
            <p className="text-[11px] text-slate-600">Tolerance requires sustained exposure; do not stop once tolerated.</p>
          </div>
        </div>
      </div>

      {/* Allergen Selection Matrix & Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Allergen List Pills */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            The 8 Major Food Allergens:
          </div>
          <div className="space-y-2">
            {allergens.map((item) => {
              const isSelected = item.id === selectedItem.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedAllergenId(item.id)}
                  className={`w-full flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/80 shadow-xs ring-1 ring-teal-600/30'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-700">
                      #{item.priority}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.allergen}</div>
                      <div className="text-[11px] text-slate-500">From ~{item.recommendedStartMonth} months</div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {item.status === 'INTRODUCED_TOLERATED' && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        <Check className="h-3 w-3" /> Tolerated
                      </span>
                    )}
                    {item.status === 'REACTION_OBSERVED' && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800">
                        <AlertTriangle className="h-3 w-3" /> Reaction
                      </span>
                    )}
                    {item.status === 'NOT_STARTED' && (
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                        Not Started
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Preparation & Evidence Protocol */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-5">
            {/* Allergen Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Priority #{selectedItem.priority} Allergen Protocol
                </span>
                <h4 className="text-lg font-bold text-slate-950 mt-0.5">
                  {selectedItem.allergen}
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  Scientific Basis: {selectedItem.evidenceTrial}
                </div>
              </div>

              {/* Status Selector Buttons */}
              <div className="flex flex-wrap gap-1.5 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => updateStatus(selectedItem.id, 'NOT_STARTED')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    selectedItem.status === 'NOT_STARTED'
                      ? 'bg-slate-800 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Not Started
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(selectedItem.id, 'INTRODUCED_TOLERATED')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    selectedItem.status === 'INTRODUCED_TOLERATED'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  ✓ Tolerated
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(selectedItem.id, 'REACTION_OBSERVED')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    selectedItem.status === 'REACTION_OBSERVED'
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                  }`}
                >
                  Reaction Observed
                </button>
              </div>
            </div>

            {/* Preparation Details */}
            <div className="space-y-3.5 text-xs">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-teal-600" />
                  <span>Recommended Safe Format</span>
                </div>
                <div className="text-slate-700 leading-relaxed font-medium">
                  {selectedItem.recommendedFormat}
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900">Step-by-Step Preparation:</div>
                <p className="text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-xl p-3">
                  {selectedItem.preparationInstructions}
                </p>
              </div>

              {/* Safety Warning */}
              <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-3 text-amber-950 flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold">Safety Precaution:</span>
                  <p className="leading-relaxed">{selectedItem.safetyWarning}</p>
                </div>
              </div>

              {/* Frequency Maintenance Note */}
              <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-3 text-teal-950 flex items-start gap-2.5">
                <RefreshCw className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold">Maintenance Schedule:</span>
                  <p className="leading-relaxed">{selectedItem.frequencyMaintenance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
