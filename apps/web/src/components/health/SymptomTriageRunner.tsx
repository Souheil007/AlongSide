'use client';

/**
 * @deprecated RETIRED IN SOU-86: AlongSide has permanently transitioned away from being a clinical symptom triage platform.
 * This component is retained solely for backward compatibility and is not mounted in any active application view.
 */

import * as React from 'react';
import { calculateEstimatedWeightLbs } from '@/hooks/useChildAge';
import {
  Thermometer,
  AlertTriangle,
  Stethoscope,
  PhoneCall,
  CheckCircle2,
  FileText,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Info,
  Droplets,
  HeartPulse,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  TriageZone,
  TemperatureMethod,
  type TriageResultDTO,
  type TriageAssessmentRequestDTO,
} from '@alongside/shared';
import { runSymptomTriage } from '@/lib/api/health';
import { useChildContextStore, selectActiveChild } from '@/stores/useChildContextStore';
import { PediatricianVisitSummaryModal } from './PediatricianVisitSummaryModal';

interface SymptomOption {
  id: string;
  label: string;
  category: 'fever' | 'respiratory' | 'ent' | 'gi' | 'skin' | 'behavior';
  isRedFlagTrigger?: boolean;
}

const AVAILABLE_SYMPTOMS: SymptomOption[] = [
  { id: 'fever', label: 'Fever / Elevated Temperature', category: 'fever' },
  { id: 'fever_over_3_days', label: 'Fever lasting > 72 hours (3 days)', category: 'fever' },
  { id: 'ear_pulling', label: 'Ear Pulling / Earache', category: 'ent' },
  { id: 'barking_cough', label: 'Barking "Seal-like" Cough (Croup)', category: 'respiratory' },
  { id: 'breathing_retractions', label: 'Chest Retractions (Skin sucking under ribs)', category: 'respiratory', isRedFlagTrigger: true },
  { id: 'stridor', label: 'Stridor (High-pitch squeak while resting)', category: 'respiratory', isRedFlagTrigger: true },
  { id: 'vomiting', label: 'Vomiting / Unable to hold fluids', category: 'gi' },
  { id: 'mild_dehydration', label: 'Fewer than 3 wet diapers today', category: 'gi' },
  { id: 'rash', label: 'Spreading Body Rash', category: 'skin' },
  { id: 'non_blanching_rash', label: 'Purple / dark red spots (do not turn white)', category: 'skin', isRedFlagTrigger: true },
  { id: 'unresponsive', label: 'Extreme lethargy, limp, or difficult to rouse', category: 'behavior', isRedFlagTrigger: true },
  { id: 'swelling_face_throat', label: 'Swelling of face, tongue, or throat with hives', category: 'behavior', isRedFlagTrigger: true },
  { id: 'teething', label: 'Teething / Drooling / Mild Fussiness', category: 'behavior' },
];

export function SymptomTriageRunner() {
  const { children, activeChildId } = useChildContextStore();
  const activeChild = selectActiveChild({ children, activeChildId });

  // Wizard state: Step 1 (Symptoms & Vitals), Step 2 (Red-Flag Screen), Step 3 (Results)
  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3>(1);

  // Form Inputs
  const [selectedChildId, setSelectedChildId] = React.useState<string>(activeChild?.id || 'manual');
  const [childAgeMonths, setChildAgeMonths] = React.useState<number>(
    activeChild ? Math.max(1, activeChild.age * 12) : 14
  );
  const [weightLbs, setWeightLbs] = React.useState<number>(24);
  const [temperatureF, setTemperatureF] = React.useState<number>(101.5);
  const [tempMethod, setTempMethod] = React.useState<TemperatureMethod>(TemperatureMethod.RECTAL);
  const [hasFeverCheck, setHasFeverCheck] = React.useState<boolean>(true);
  const [selectedSymptoms, setSelectedSymptoms] = React.useState<string[]>(['fever', 'ear_pulling']);
  const [durationHours, setDurationHours] = React.useState<number>(18);
  const [behaviorNotes, setBehaviorNotes] = React.useState<string>(
    'Fussy during feedings, alert, drinking fluids, 4 wet diapers today'
  );

  // Red-Flag Screening Answers
  const [isStrugglingToBreathe, setIsStrugglingToBreathe] = React.useState<boolean>(false);
  const [isUnusuallyLimp, setIsUnusuallyLimp] = React.useState<boolean>(false);
  const [hasPurpleSpots, setHasPurpleSpots] = React.useState<boolean>(false);

  // Triage Result & Loading
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [triageResult, setTriageResult] = React.useState<TriageResultDTO | null>(null);

  // Modal State
  const [summaryModalOpen, setSummaryModalOpen] = React.useState<boolean>(false);

  // Update defaults when active child changes
  React.useEffect(() => {
    if (activeChild) {
      setSelectedChildId(activeChild.id);
      const computedMonths = activeChild.birthYear && activeChild.birthMonth
        ? Math.max(1, (new Date().getFullYear() - activeChild.birthYear) * 12 + (new Date().getMonth() + 1 - activeChild.birthMonth))
        : Math.max(1, activeChild.age * 12);
      setChildAgeMonths(computedMonths);
      setWeightLbs(calculateEstimatedWeightLbs(computedMonths, Math.floor(computedMonths / 12)));
    }
  }, [activeChild]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleRunTriage = async () => {
    setIsLoading(true);

    const mergedSymptoms = [...selectedSymptoms];
    if (isStrugglingToBreathe && !mergedSymptoms.includes('breathing_retractions')) {
      mergedSymptoms.push('breathing_retractions');
    }
    if (isUnusuallyLimp && !mergedSymptoms.includes('unresponsive')) {
      mergedSymptoms.push('unresponsive');
    }
    if (hasPurpleSpots && !mergedSymptoms.includes('non_blanching_rash')) {
      mergedSymptoms.push('non_blanching_rash');
    }

    const payload: TriageAssessmentRequestDTO = {
      childId: selectedChildId !== 'manual' ? selectedChildId : undefined,
      childAgeMonths,
      temperatureF: hasFeverCheck ? temperatureF : undefined,
      temperatureMethod: hasFeverCheck ? tempMethod : undefined,
      symptoms: mergedSymptoms,
      durationHours,
      behaviorNotes,
    };

    try {
      const result = await runSymptomTriage(payload);
      setTriageResult(result);
      setCurrentStep(3);
    } catch {
      // Handled inside runSymptomTriage fallback
    } finally {
      setIsLoading(false);
    }
  };

  const resetRunner = () => {
    setCurrentStep(1);
    setTriageResult(null);
    setIsStrugglingToBreathe(false);
    setIsUnusuallyLimp(false);
    hasPurpleSpots && setHasPurpleSpots(false);
  };

  const childNameDisplay = activeChild?.name || 'Your Child';

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
      {/* Wizard Progress Stepper */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Step {currentStep} of 3
          </span>
          <h2 className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
            {currentStep === 1 && 'Symptom Entry & Vital Signs'}
            {currentStep === 2 && 'Clinical Red-Flag Screening'}
            {currentStep === 3 && 'Calibrated Triage Recommendation'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2.5 rounded-full transition-all ${
                currentStep === step
                  ? 'w-8 bg-teal-600'
                  : currentStep > step
                  ? 'w-4 bg-teal-200'
                  : 'w-4 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Symptoms & Vitals Entry */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Child Profile Bar */}
          <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                {childNameDisplay.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-slate-900">{childNameDisplay}</span>
                <span className="text-slate-500 ml-1.5">
                  ({childAgeMonths < 24 ? `${childAgeMonths} months` : `${Math.floor(childAgeMonths / 12)} years`})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <label htmlFor="triage-weight-input" className="text-slate-600 font-medium">Weight:</label>
              <div className="flex items-center gap-1.5 bg-white border border-teal-200 rounded-lg px-2 py-1 shadow-2xs">
                <input
                  id="triage-weight-input"
                  type="number"
                  min="4"
                  max="300"
                  step="1"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Math.max(4, Number(e.target.value) || 0))}
                  aria-label="Child Weight in pounds"
                  className="w-14 text-xs font-bold text-slate-800 bg-transparent focus:outline-none"
                />
                <span className="text-[11px] text-slate-500 font-medium">lbs</span>
                <span className="text-[10px] text-slate-400">
                  (~{(weightLbs * 0.453592).toFixed(1)} kg)
                </span>
              </div>
            </div>
          </div>

          {/* Temperature & Measurement Method */}
          <div className="rounded-xl border border-slate-200 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Thermometer className="h-4 w-4 text-rose-500" />
                Temperature Check
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFeverCheck}
                  onChange={(e) => setHasFeverCheck(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>Include Temperature</span>
              </label>
            </div>

            {hasFeverCheck && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="temp-f-input" className="text-xs font-medium text-slate-500 block mb-1">
                    Temperature (°F)
                  </label>
                  <div className="relative">
                    <input
                      id="temp-f-input"
                      type="number"
                      step={0.1}
                      min={96}
                      max={108}
                      value={temperatureF}
                      onChange={(e) => setTemperatureF(Number(e.target.value) || 98.6)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-400">°F</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">
                    Measurement Route
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { method: TemperatureMethod.RECTAL, label: 'Rectal (Gold Std)' },
                      { method: TemperatureMethod.ORAL, label: 'Oral (Mouth)' },
                      { method: TemperatureMethod.AXILLARY, label: 'Axillary (Armpit)' },
                      { method: TemperatureMethod.TYMPANIC, label: 'Tympanic (Ear)' },
                    ].map((item) => (
                      <button
                        key={item.method}
                        type="button"
                        onClick={() => setTempMethod(item.method)}
                        className={`rounded-lg py-1.5 px-2 text-xs font-semibold border transition ${
                          tempMethod === item.method
                            ? 'border-teal-600 bg-teal-50 text-teal-800'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Symptom Selector Pills */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Stethoscope className="h-4 w-4 text-teal-600" />
              Active Symptoms (Select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {AVAILABLE_SYMPTOMS.map((symp) => {
                const isSelected = selectedSymptoms.includes(symp.id);
                return (
                  <button
                    key={symp.id}
                    type="button"
                    onClick={() => toggleSymptom(symp.id)}
                    className={`rounded-xl p-3 text-left border text-xs font-semibold transition flex items-center justify-between ${
                      isSelected
                        ? symp.isRedFlagTrigger
                          ? 'border-rose-400 bg-rose-50 text-rose-950 shadow-2xs'
                          : 'border-teal-500 bg-teal-50 text-teal-950 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <span>{symp.label}</span>
                    <div
                      className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 ml-2 ${
                        isSelected
                          ? symp.isRedFlagTrigger
                            ? 'bg-rose-600 border-rose-600 text-white'
                            : 'bg-teal-600 border-teal-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="h-3 w-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Symptom Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="duration-hours" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Symptom Duration (Hours)
              </label>
              <div className="relative">
                <input
                  id="duration-hours"
                  type="number"
                  min={1}
                  max={240}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-semibold">
                  hours (~{(durationHours / 24).toFixed(1)} days)
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="behavior-notes" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Hydration & Behavior Notes
              </label>
              <input
                id="behavior-notes"
                type="text"
                value={behaviorNotes}
                onChange={(e) => setBehaviorNotes(e.target.value)}
                placeholder="e.g. Fussy during feeds, 4 wet diapers today"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 focus:border-teal-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Step 1 CTA */}
          <div className="flex justify-end pt-2">
            <Button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="gap-1.5 shadow-sm px-6"
            >
              <span>Continue to Red-Flag Screen</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Emergency Red-Flag Screening Questions */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 text-xs text-rose-950 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[11px] text-rose-800 block">
              Clinical Safe Harbor Screening
            </span>
            <p className="leading-relaxed">
              Please answer these critical emergency questions to rule out acute life-threatening respiratory, neurological, or infectious complications.
            </p>
          </div>

          <div className="space-y-4">
            {/* Question 1: Breathing */}
            <div className="rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  1. Is the child struggling to breathe or showing chest retractions?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Skin sucking deep beneath ribs, grunting with each breath, or nostril flaring.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setIsStrugglingToBreathe(false)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold border transition ${
                    !isStrugglingToBreathe
                      ? 'border-teal-600 bg-teal-50 text-teal-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  No, Breathing OK
                </button>
                <button
                  type="button"
                  onClick={() => setIsStrugglingToBreathe(true)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold border transition ${
                    isStrugglingToBreathe
                      ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                      : 'border-rose-200 text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  Yes, Struggling
                </button>
              </div>
            </div>

            {/* Question 2: Lethargy */}
            <div className="rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  2. Is the child unusually limp, floppy, or difficult to awaken?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cannot make eye contact, weak or absent cry, or completely unresponsive.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setIsUnusuallyLimp(false)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold border transition ${
                    !isUnusuallyLimp
                      ? 'border-teal-600 bg-teal-50 text-teal-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  No, Alert / Playful
                </button>
                <button
                  type="button"
                  onClick={() => setIsUnusuallyLimp(true)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold border transition ${
                    isUnusuallyLimp
                      ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                      : 'border-rose-200 text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  Yes, Limp / Lethargic
                </button>
              </div>
            </div>

            {/* Question 3: Non-blanching rash */}
            <div className="rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  3. Are there purple or dark red pinhead spots that fail the glass test?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Press a clear drinking glass firmly on spots; do they stay purple (non-blanching)?
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setHasPurpleSpots(false)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold border transition ${
                    !hasPurpleSpots
                      ? 'border-teal-600 bg-teal-50 text-teal-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  No / Blanches White
                </button>
                <button
                  type="button"
                  onClick={() => setHasPurpleSpots(true)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold border transition ${
                    hasPurpleSpots
                      ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                      : 'border-rose-200 text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  Yes, Purple Spots
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 CTAs */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <Button
              type="button"
              onClick={handleRunTriage}
              disabled={isLoading}
              className="gap-1.5 shadow-sm px-6 bg-teal-700 hover:bg-teal-800"
            >
              <span>{isLoading ? 'Calibrating Triage...' : 'Calculate Clinical Directive'}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Calibrated Results Card */}
      {currentStep === 3 && triageResult && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          {/* RED ZONE: Emergency Card */}
          {triageResult.zone === TriageZone.RED && (
            <div className="rounded-2xl border-2 border-rose-400 bg-rose-50/95 p-6 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-200 pb-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md animate-pulse">
                    <AlertTriangle className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="inline-flex rounded-md bg-rose-200 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-rose-950">
                      RED ZONE: EMERGENCY DIRECTIVE
                    </span>
                    <h3 className="text-xl font-black text-rose-950 mt-1">
                      {triageResult.conditionSuspected}
                    </h3>
                  </div>
                </div>

                <a
                  href="tel:911"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 text-base font-extrabold text-white shadow-lg transition hover:bg-rose-700 hover:shadow-xl active:scale-95"
                >
                  <PhoneCall className="h-5 w-5" />
                  <span>Call 911 Immediately</span>
                </a>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                  Clinical Rationale:
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {triageResult.clinicalRationale}
                </p>
              </div>

              <div className="rounded-xl border border-rose-200 bg-white p-4 space-y-2 text-xs sm:text-sm">
                <span className="font-bold text-rose-950 uppercase tracking-wide text-xs block">
                  Mandatory Immediate Steps:
                </span>
                <ul className="space-y-1.5 text-slate-700">
                  {triageResult.immediateActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-rose-600">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* YELLOW ZONE: Pediatrician Visit Card */}
          {triageResult.zone === TriageZone.YELLOW && (
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md">
                    <Stethoscope className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="inline-flex rounded-md bg-amber-200 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-950">
                      YELLOW ZONE: PEDIATRICIAN VISIT (24H)
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                      {triageResult.conditionSuspected}
                    </h3>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setSummaryModalOpen(true)}
                  className="gap-2 bg-amber-700 hover:bg-amber-800 text-white shadow-sm"
                >
                  <FileText className="h-4 w-4" />
                  <span>Export Doctor Visit Summary</span>
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Clinical Rationale:
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {triageResult.clinicalRationale}
                </p>
              </div>

              {/* Immediate Actions & Home Care */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="rounded-xl border border-amber-200 bg-white p-4 space-y-2">
                  <span className="font-bold text-amber-950 uppercase tracking-wide text-xs block">
                    Next 24 Hours Actions:
                  </span>
                  <ul className="space-y-1.5 text-slate-700">
                    {triageResult.immediateActions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-amber-600">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-200 bg-white p-4 space-y-2">
                  <span className="font-bold text-slate-900 uppercase tracking-wide text-xs block">
                    Supportive Comfort & Hydration:
                  </span>
                  <ul className="space-y-1.5 text-slate-700">
                    {triageResult.homeCareMeasures.map((measure, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-teal-600">•</span>
                        <span>{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* GREEN ZONE: Supportive Home Care Card */}
          {triageResult.zone === TriageZone.GREEN && (
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200 pb-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="inline-flex rounded-md bg-emerald-200 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                      GREEN ZONE: SUPPORTIVE HOME CARE
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                      {triageResult.conditionSuspected}
                    </h3>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSummaryModalOpen(true)}
                  className="gap-1.5 text-xs font-semibold"
                >
                  <FileText className="h-4 w-4" />
                  <span>Save Record</span>
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Clinical Rationale:
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {triageResult.clinicalRationale}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="rounded-xl border border-emerald-200 bg-white p-4 space-y-2">
                  <span className="font-bold text-emerald-950 uppercase tracking-wide text-xs block">
                    Recommended Home Supportive Care:
                  </span>
                  <ul className="space-y-1.5 text-slate-700">
                    {triageResult.homeCareMeasures.map((measure, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-emerald-600">•</span>
                        <span>{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-white p-4 space-y-2">
                  <span className="font-bold text-slate-900 uppercase tracking-wide text-xs block">
                    When to Escalate (Red Flags):
                  </span>
                  <ul className="space-y-1.5 text-slate-700">
                    {triageResult.redFlagWarnings.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-rose-500">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Actions & Restart */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-[11px] text-slate-600">
              Clinical Authority: {triageResult.clinicalAuthority}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetRunner}
              className="gap-1.5 text-xs font-semibold"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Start New Symptom Check</span>
            </Button>
          </div>
        </div>
      )}

      {/* Pediatrician Visit Summary Modal */}
      <PediatricianVisitSummaryModal
        isOpen={summaryModalOpen}
        onClose={() => setSummaryModalOpen(false)}
        childName={childNameDisplay}
        childAgeString={childAgeMonths < 24 ? `${childAgeMonths} mo` : `${Math.floor(childAgeMonths / 12)} yrs`}
        weightLbs={weightLbs}
        temperatureF={hasFeverCheck ? temperatureF : 98.6}
        temperatureMethod={tempMethod}
        durationHours={durationHours}
        symptoms={selectedSymptoms.map(
          (s) => AVAILABLE_SYMPTOMS.find((item) => item.id === s)?.label || s
        )}
        behaviorNotes={behaviorNotes}
        triageResult={triageResult}
      />
    </div>
  );
}
