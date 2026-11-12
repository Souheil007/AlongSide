'use client';

import * as React from 'react';
import {
  Utensils,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Info,
  Apple,
  Flame,
  Volume2,
  VolumeX,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function BabyLedWeaningGuide() {
  const [readinessChecks, setReadinessChecks] = React.useState<Record<string, boolean>>({
    sitting: false,
    headControl: false,
    extrusionReflex: false,
    grasping: false,
  });

  const [expandedSection, setExpandedSection] = React.useState<'prep' | 'gagging' | 'botulism' | 'all'>('all');

  const readinessMarkers = [
    {
      key: 'sitting',
      title: 'Sitting Upright with Minimal Support',
      desc: 'Baby can sit steadily in a high chair without slumping or leaning heavily to one side, ensuring an uncompromised airway.',
    },
    {
      key: 'headControl',
      title: 'Rock-Solid Head & Neck Control',
      desc: 'Can hold head erect and steady without bobbing or wobbling when reaching or chewing.',
    },
    {
      key: 'extrusionReflex',
      title: 'Tongue-Thrust Extrusion Reflex Has Diminished',
      desc: 'Baby no longer automatically thrusts their tongue forward to eject solids placed on their lips or tongue tip.',
    },
    {
      key: 'grasping',
      title: 'Intentional Grasp & Hand-to-Mouth Trajectory',
      desc: 'Can reach for objects, grasp them firmly in palm or fingers, and bring them directly and accurately to mouth.',
    },
  ];

  const toggleCheck = (key: string) => {
    setReadinessChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allReady = Object.values(readinessChecks).every(Boolean);

  const prepGuides = [
    {
      item: 'Round Fruits (Grapes, Cherry Tomatoes)',
      dangerous: 'Served whole or cut into round disks',
      safe: 'Quartered lengthwise into 4 long, slender spears',
      why: 'Round foods form a complete suction plug over the larynx; spears allow air passage if swallowed prematurely.',
    },
    {
      item: 'Hard Root Vegetables (Carrots, Sweet Potatoes)',
      dangerous: 'Raw, hard discs or baby carrots',
      safe: 'Steamed or roasted until fork-tender and squishable between thumb & forefinger',
      why: 'Infant gums cannot grind raw hard roots; soft steamed wedges flatten harmlessly.',
    },
    {
      item: 'Meat & Poultry (Beef, Chicken, Turkey)',
      dangerous: 'Cube chunks or dry chewy pieces',
      safe: 'Slow-cooked and finely shredded, or offered as a large adult-finger bone-in drumstick for gnawing',
      why: 'Shredded fibers are easy to swallow with saliva; large bones cannot be choked on and stimulate oral mapping.',
    },
    {
      item: 'Nut Butters (Peanut, Almond, Cashew)',
      dangerous: 'Thick, sticky spoonfuls or whole nuts',
      safe: 'Thinned with warm water/breastmilk or spread paper-thin onto toast',
      why: 'Thick globs stick to the palate and trigger airway obstruction.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Signs of Readiness Interactive Checklist */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                The 4 Physiological Readiness Markers (AAP & WHO)
              </h3>
              <p className="text-xs text-slate-500">
                Ensure ALL four developmental markers are present before introducing finger foods (~6 months)
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold self-start sm:self-center bg-slate-100 text-slate-700">
            {allReady ? (
              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                ✓ Ready for Solid Finger Foods
              </span>
            ) : (
              <span>{Object.values(readinessChecks).filter(Boolean).length} of 4 Met</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {readinessMarkers.map((marker) => {
            const isChecked = readinessChecks[marker.key];
            return (
              <button
                key={marker.key}
                type="button"
                onClick={() => toggleCheck(marker.key)}
                className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                  isChecked
                    ? 'border-emerald-300 bg-emerald-50/60 shadow-2xs'
                    : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border mt-0.5 transition-colors ${
                    isChecked
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="h-4 w-4" />}
                </div>
                <div className="space-y-0.5">
                  <div className={`text-xs font-bold ${isChecked ? 'text-emerald-950' : 'text-slate-900'}`}>
                    {marker.title}
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    {marker.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gagging vs. Choking Master Comparison */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/50 to-orange-50/30 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-amber-200/60 pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-950">
              Gagging vs. Choking: The Critical Difference
            </h3>
            <p className="text-xs text-amber-900/80">
              Gagging is loud and protective. Choking is silent and dangerous.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gagging Box */}
          <div className="rounded-xl border border-emerald-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                <Volume2 className="h-3.5 w-3.5 text-emerald-600" />
                LOUD & NORMAL
              </span>
              <span className="text-xs font-bold text-emerald-700">Gagging (Reflex)</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Signs:</strong> Red or flushed face, watery eyes, coughing, retching noises, tongue pushing forward.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Mechanism:</strong> Infant gag reflex is triggered far forward on the tongue to prevent food entering airway.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Action:</strong> <em>STAY CALM & DO NOT INTERFERE.</em> Do not slap back or do blind finger sweeps (which push food back).</span>
              </li>
            </ul>
          </div>

          {/* Choking Box */}
          <div className="rounded-xl border border-rose-300 bg-rose-50/50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                <VolumeX className="h-3.5 w-3.5 text-rose-600" />
                SILENT & EMERGENCY
              </span>
              <span className="text-xs font-bold text-rose-700">Choking (Airway Obstruction)</span>
            </div>
            <ul className="text-xs text-slate-800 space-y-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Signs:</strong> SILENCE (cannot cough or cry), terrified wide eyes, skin turning gray/blue, grasping at throat.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Mechanism:</strong> Complete or partial tracheal blockage stopping oxygen delivery.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Action:</strong> <em>CALL 911 IMMEDIATELY.</em> Perform 5 firm back blows followed by 5 chest thrusts (infant) or Heimlich (older child).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Strict Infant Botulism Alert (No Honey under 12 months) */}
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white shadow-xs">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-200/80 px-2 py-0.5 text-xs font-black uppercase tracking-wider text-amber-950">
            Important Safety Rule
          </div>
          <h4 className="text-base font-bold text-amber-950">
            Strictly NO HONEY Under 12 Months (Infant Botulism Risk)
          </h4>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            Honey contains microscopic <em>Clostridium botulinum</em> bacterial spores. In infants under 1 year, immature gut microbiota and stomach acid cannot suppress these spores. They germinate, producing neurotoxins causing flaccid muscle paralysis, respiratory failure, and death.
          </p>
          <div className="text-xs font-semibold text-amber-950 pt-1 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-amber-700" />
            <span>Note: Baking or boiling honey does NOT destroy botulinum bacterial spores.</span>
          </div>
        </div>
      </div>

      {/* Finger Food Safe Prep Matrix */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-200/60">
            <Utensils className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Safe Finger Food Slicing & Preparation Protocol
            </h3>
            <p className="text-xs text-slate-500">
              How to safely modify food textures and shapes for baby-led weaning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prepGuides.map((guide, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 p-4 space-y-2.5 bg-slate-50/40">
              <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Apple className="h-4 w-4 text-teal-600" />
                <span>{guide.item}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-2.5">
                  <div className="font-bold text-rose-900 flex items-center gap-1 mb-1">
                    <XCircle className="h-3.5 w-3.5 text-rose-600" />
                    <span>Dangerous</span>
                  </div>
                  <div className="text-rose-800 text-[11px] leading-tight">{guide.dangerous}</div>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-2.5">
                  <div className="font-bold text-emerald-900 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Safe Prep</span>
                  </div>
                  <div className="text-emerald-800 text-[11px] leading-tight">{guide.safe}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed italic">
                {guide.why}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
