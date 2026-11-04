'use client';

import * as React from 'react';
import {
  AlertOctagon,
  ShieldAlert,
  PhoneCall,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
  LifeBuoy,
  Scissors,
} from 'lucide-react';
import { CANONICAL_CHOKING_HAZARDS } from '@/lib/api/nutrition';

export function ChokingHazardsWarningCard() {
  const hazards = CANONICAL_CHOKING_HAZARDS;

  return (
    <div className="space-y-6">
      {/* High-Alert Header */}
      <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/70 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md animate-pulse">
            <AlertOctagon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-rose-200 px-2 py-0.5 text-xs font-black uppercase tracking-wider text-rose-950">
                Critical Pediatric Safety
              </span>
              <span className="text-xs font-semibold text-rose-700">AAP Guidelines</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-rose-950">
              The High-Risk Pediatric Choking Hazards Registry
            </h3>
            <p className="text-xs sm:text-sm text-rose-900 leading-relaxed max-w-2xl">
              Children under 4 years lack mature grinding molars and have airways roughly the diameter of a drinking straw (~10 mm). Round, firm, slick, or expandable foods are leading causes of fatal airway obstruction.
            </p>
          </div>
        </div>

        {/* 911 Quick Emergency Call CTA */}
        <a
          href="tel:911"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 text-xs font-bold text-white shadow-md transition-all hover:bg-rose-700 active:scale-95 shrink-0 self-start sm:self-center"
        >
          <PhoneCall className="h-3.5 w-3.5" />
          <span>If Choking, Dial 911</span>
        </a>
      </div>

      {/* Choking Rescue Protocol Quick Reference */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
          <LifeBuoy className="h-4 w-4 text-rose-600" />
          <span>Immediate Emergency Intervention: Infant vs. Toddler/Child</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Infant Under 1 Year */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-4 space-y-2">
            <div className="font-extrabold text-teal-950 flex items-center justify-between">
              <span>Infant Under 1 Year</span>
              <span className="text-[11px] bg-teal-200/80 text-teal-900 px-2 py-0.5 rounded-md font-bold">5 Back Blows + 5 Chest Thrusts</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700 leading-relaxed">
              <li>Place infant face-down along your forearm, supporting head and jaw with your hand.</li>
              <li>Deliver <strong>5 firm back blows</strong> between the shoulder blades with the heel of your hand.</li>
              <li>Turn infant face-up, supporting head. Deliver <strong>5 rapid chest thrusts</strong> over lower half of breastbone using 2 fingers.</li>
              <li>Repeat cycle until object is expelled. Never perform a blind finger sweep.</li>
            </ol>
          </div>

          {/* Child Over 1 Year */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 space-y-2">
            <div className="font-extrabold text-indigo-950 flex items-center justify-between">
              <span>Child Over 1 Year</span>
              <span className="text-[11px] bg-indigo-200/80 text-indigo-900 px-2 py-0.5 rounded-md font-bold">Heimlich Abdominal Thrusts</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700 leading-relaxed">
              <li>Stand or kneel behind the child and wrap arms around their waist.</li>
              <li>Make a fist with one hand; place thumb side slightly above the navel and below rib cage.</li>
              <li>Grasp fist with other hand and press inward and upward with quick, forceful abdominal thrusts.</li>
              <li>Repeat until object dislodges or child breathes freely.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Catalog of Hazards & Safe Modifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hazards.map((hazard, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                    hazard.riskLevel === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {hazard.riskLevel} Risk
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  Avoid until age {hazard.avoidUntilAgeYears}+
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900">
                {hazard.foodItem}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Why dangerous:</strong> {hazard.mechanism}
              </p>
            </div>

            {/* Safe Modification Protocol */}
            <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-3 space-y-1">
              <div className="text-[11px] font-bold text-teal-900 flex items-center gap-1.5">
                <Scissors className="h-3.5 w-3.5 text-teal-700" />
                <span>How to Modify Safely:</span>
              </div>
              <p className="text-[11px] text-teal-950 leading-relaxed">
                {hazard.safeModification}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
