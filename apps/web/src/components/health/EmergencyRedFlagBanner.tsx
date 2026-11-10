'use client';

/**
 * @deprecated RETIRED IN SOU-86: AlongSide has permanently transitioned away from being a clinical symptom triage platform.
 * This component is not mounted in active application views.
 */

import * as React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, ChevronDown, ChevronUp, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmergencyRedFlagBannerProps {
  forceExpanded?: boolean;
  onEmergencyTriggered?: () => void;
}

export function EmergencyRedFlagBanner({
  forceExpanded = false,
  onEmergencyTriggered,
}: EmergencyRedFlagBannerProps) {
  const [isExpanded, setIsExpanded] = React.useState(forceExpanded);

  const emergencyFlags = [
    {
      title: 'Neonatal Infant Fever (<90 Days)',
      desc: 'Any infant under 3 months with a rectal temperature of 100.4°F (38.0°C) or higher requires immediate emergency evaluation.',
    },
    {
      title: 'Respiratory Distress & Retractions',
      desc: 'Skin sucking deep beneath ribs, between ribs, or at the throat; audible grunting or head-bobbing with each breath.',
    },
    {
      title: 'Cyanosis (Discoloration)',
      desc: 'Blue, purple, or gray coloring of the lips, tongue, or gums indicates severe oxygen deprivation.',
    },
    {
      title: 'Severe Lethargy or Seizure',
      desc: 'Child is limp, difficult to awaken, cannot track your eyes, crying weakly, or having rhythmic body jerking.',
    },
    {
      title: 'Non-Blanching Rash (Glass Test)',
      desc: 'Purple or dark red pinhead spots (petechiae) that do NOT turn white when a clear drinking glass is pressed firmly against them.',
    },
    {
      title: 'Anaphylaxis / Allergic Reaction',
      desc: 'Sudden swelling of lips, tongue, or throat; hives accompanied by vomiting, wheezing, or difficulty swallowing.',
    },
  ];

  return (
    <aside
      aria-label="Clinical Safe Harbor Emergency Guardrails"
      className="relative overflow-hidden rounded-2xl border-2 border-rose-300 bg-rose-50/90 p-4 sm:p-5 shadow-sm transition-all"
    >
      {/* Top Banner Alert Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md animate-pulse">
            <ShieldAlert className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-rose-200/80 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-rose-900">
                Clinical Safe Harbor
              </span>
              <span className="text-xs text-rose-700 font-medium">Barton Schmitt Protocols</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-rose-950 mt-0.5">
              Immediate Red-Flag Emergency Guardrails
            </h2>
            <p className="text-xs sm:text-sm text-rose-800 leading-relaxed max-w-2xl">
              If your child exhibits any life-threatening symptoms below, halt screening immediately and contact Emergency Medical Services.
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 sm:self-center">
          <a
            href="tel:911"
            onClick={onEmergencyTriggered}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 text-sm font-bold text-white shadow-md transition-all hover:bg-rose-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 active:scale-95"
            aria-label="Call 911 Emergency Services Immediately"
          >
            <PhoneCall className="h-4 w-4 animate-bounce" />
            <span>Call 911 Now</span>
          </a>

          <a
            href="tel:18002221222"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-rose-300 bg-white px-3.5 text-xs font-semibold text-rose-900 shadow-sm transition-colors hover:bg-rose-100/70"
            aria-label="Call Poison Control 1-800-222-1222"
          >
            <LifeBuoy className="h-3.5 w-3.5 text-rose-700" />
            <span className="hidden xs:inline">Poison Control:</span> 1-800-222-1222
          </a>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-rose-900 hover:bg-rose-200/60 h-10 px-2.5"
            aria-expanded={isExpanded}
            aria-controls="emergency-flags-list"
          >
            <span>{isExpanded ? 'Hide Red Flags' : 'View 6 Red Flags'}</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </Button>
        </div>
      </div>

      {/* Expandable 6 Clinical Red Flags Grid */}
      {isExpanded && (
        <div
          id="emergency-flags-list"
          className="mt-4 pt-4 border-t border-rose-200/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in-50 duration-200"
        >
          {emergencyFlags.map((flag, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-rose-200 bg-white/90 p-3.5 shadow-xs transition hover:border-rose-300"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                <h3 className="text-xs font-bold text-rose-950 uppercase tracking-wide">
                  {flag.title}
                </h3>
              </div>
              <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                {flag.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
