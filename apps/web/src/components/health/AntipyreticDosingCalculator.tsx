'use client';

import * as React from 'react';
import { Pill, AlertTriangle, ShieldCheck, Scale, Info, CheckCircle2 } from 'lucide-react';
import { AntipyreticMedication, calculateAntipyreticDose } from '@alongside/shared';

interface AntipyreticDosingCalculatorProps {
  initialWeightLbs?: number;
  initialAgeMonths?: number;
}

export function AntipyreticDosingCalculator({
  initialWeightLbs = 24,
  initialAgeMonths = 14,
}: AntipyreticDosingCalculatorProps) {
  const [weightUnit, setWeightUnit] = React.useState<'lbs' | 'kg'>('lbs');
  const [weightInput, setWeightInput] = React.useState<number>(initialWeightLbs);
  const [ageMonths, setAgeMonths] = React.useState<number>(initialAgeMonths);
  const [selectedMed, setSelectedMed] = React.useState<AntipyreticMedication>(
    AntipyreticMedication.ACETAMINOPHEN
  );

  // Convert weight to Lbs for standard pure calculation
  const weightInLbs = weightUnit === 'kg' ? weightInput * 2.20462 : weightInput;
  const dosing = calculateAntipyreticDose(weightInLbs, ageMonths, selectedMed);

  const isUnder6Months = ageMonths < 6;

  // Auto-switch to Acetaminophen if user sets age < 6mo while Ibuprofen is selected
  React.useEffect(() => {
    if (isUnder6Months && selectedMed === AntipyreticMedication.IBUPROFEN) {
      setSelectedMed(AntipyreticMedication.ACETAMINOPHEN);
    }
  }, [isUnder6Months, selectedMed]);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-200/60 shadow-2xs">
            <Pill className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Pediatric Antipyretic Dosing Calculator
            </h2>
            <p className="text-xs text-slate-500">
              Weight-based clinical dosing calibrated to AAP & Barton Schmitt protocols
            </p>
          </div>
        </div>

        {/* Medication Selector Tabs */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 self-start sm:self-center" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={selectedMed === AntipyreticMedication.ACETAMINOPHEN}
            onClick={() => setSelectedMed(AntipyreticMedication.ACETAMINOPHEN)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              selectedMed === AntipyreticMedication.ACETAMINOPHEN
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Acetaminophen (Tylenol)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedMed === AntipyreticMedication.IBUPROFEN}
            disabled={isUnder6Months}
            onClick={() => {
              if (!isUnder6Months) setSelectedMed(AntipyreticMedication.IBUPROFEN);
            }}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              isUnder6Months
                ? 'cursor-not-allowed opacity-40 text-slate-400'
                : selectedMed === AntipyreticMedication.IBUPROFEN
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title={isUnder6Months ? 'Ibuprofen is contraindicated under 6 months' : 'Ibuprofen'}
          >
            Ibuprofen (Motrin/Advil) {isUnder6Months && '(6m+ Only)'}
          </button>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Child Weight Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="weight-input" className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5 text-teal-600" />
              Child Weight
            </label>
            <div className="inline-flex rounded-md bg-slate-100 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  if (weightUnit !== 'lbs') {
                    setWeightUnit('lbs');
                    setWeightInput(Math.round(weightInput * 2.20462));
                  }
                }}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  weightUnit === 'lbs' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                }`}
              >
                lbs
              </button>
              <button
                type="button"
                onClick={() => {
                  if (weightUnit !== 'kg') {
                    setWeightUnit('kg');
                    setWeightInput(Number((weightInput * 0.453592).toFixed(1)));
                  }
                }}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  weightUnit === 'kg' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                }`}
              >
                kg
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              id="weight-input"
              type="number"
              min={6}
              max={160}
              step={weightUnit === 'lbs' ? 1 : 0.5}
              value={weightInput}
              onChange={(e) => setWeightInput(Math.max(4, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-2xs transition focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
            <span className="absolute right-3.5 top-2.5 text-xs font-semibold text-slate-500">
              {weightUnit}
            </span>
          </div>
        </div>

        {/* Child Age Input */}
        <div className="space-y-1.5">
          <label htmlFor="age-months-input" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Child Age (Months)
          </label>
          <div className="relative">
            <input
              id="age-months-input"
              type="number"
              min={1}
              max={216}
              value={ageMonths}
              onChange={(e) => setAgeMonths(Math.max(1, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-2xs transition focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
            <span className="absolute right-3.5 top-2.5 text-xs font-semibold text-slate-500">
              months ({ageMonths < 24 ? `${ageMonths}m` : `${Math.floor(ageMonths / 12)}y`})
            </span>
          </div>
        </div>
      </div>

      {/* Contraindication Warning if Ibuprofen attempted under 6 months */}
      {isUnder6Months && selectedMed === AntipyreticMedication.IBUPROFEN && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 space-y-1 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-rose-950">
            <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>Strict Contraindication: Ibuprofen Under 6 Months</span>
          </div>
          <p className="leading-relaxed">
            Ibuprofen is strictly contraindicated in infants younger than 6 months of age due to immature renal clearance and high risk of acute kidney injury. Please select Acetaminophen instead.
          </p>
        </div>
      )}

      {/* Dosing Calculation Results Card */}
      {!dosing.isContraindicated && (
        <div className="rounded-2xl border border-teal-200 bg-linear-to-br from-teal-50/60 to-emerald-50/40 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                Single Calibrated Dose
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-teal-950">
                  {dosing.recommendedDoseMl} mL
                </span>
                <span className="text-sm font-bold text-teal-700">
                  ({dosing.recommendedDoseMg} mg)
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Standard Liquid Concentration:
              </span>
              <span className="text-xs font-bold text-slate-800">
                {dosing.liquidConcentration}
              </span>
            </div>
          </div>

          {/* Visual Syringe Indicator */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Oral Dosing Syringe Volume</span>
              <span className="text-teal-700 font-bold">{dosing.recommendedDoseMl} mL / 10 mL Syringe</span>
            </div>
            <div className="relative h-6 w-full rounded-full bg-slate-200/90 overflow-hidden border border-slate-300">
              <div
                className="h-full rounded-full bg-linear-to-r from-teal-500 to-emerald-500 transition-all duration-300 relative flex items-center justify-end pr-2"
                style={{ width: `${Math.min(100, Math.max(8, (dosing.recommendedDoseMl / 10) * 100))}%` }}
              >
                <span className="text-[10px] font-extrabold text-white">
                  {dosing.recommendedDoseMl} mL
                </span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-600 px-1">
              <span>0 mL</span>
              <span>2.5 mL</span>
              <span>5.0 mL (1 tsp)</span>
              <span>7.5 mL</span>
              <span>10.0 mL</span>
            </div>
          </div>

          {/* Timing & Frequency Safeguards */}
          <div className="rounded-xl border border-teal-100 bg-white/90 p-3.5 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="h-4 w-4 text-teal-600" />
              <span>Administration Guidelines</span>
            </div>
            <ul className="space-y-1 text-slate-700">
              <li>• <strong>Frequency:</strong> {dosing.frequencyDescription}</li>
              <li>• <strong>Max in 24 Hours:</strong> Up to {dosing.maxDosesPer24h} doses (maximum {dosing.maxDailyMg} mg/day)</li>
              <li>• <strong>Measuring Tool:</strong> Always use the oral dosing syringe provided with the bottle; never use kitchen spoons.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Pediatric Contraindication Shield: Universal Aspirin Warning */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 flex items-start gap-3 text-xs text-amber-900">
        <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-amber-950">Universal Pediatric Warning: Never Administer Aspirin</span>
          <p className="leading-relaxed text-amber-800">
            Never give Aspirin or products containing bismuth subsalicylate (e.g., Pepto-Bismol) to children or teens. In the presence of viral infections, aspirin is associated with Reye’s syndrome, a rare but life-threatening disorder causing acute brain swelling and liver failure.
          </p>
        </div>
      </div>
    </div>
  );
}
