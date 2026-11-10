'use client';

/**
 * @deprecated RETIRED IN SOU-86: AlongSide has permanently transitioned away from being a clinical symptom triage platform.
 * This component is not mounted in active application views.
 */

import * as React from 'react';
import { X, Copy, Check, Printer, FileText, AlertCircle, Calendar, Stethoscope, Droplets, Pill } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { TriageResultDTO } from '@alongside/shared';

interface PediatricianVisitSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName?: string;
  childAgeString?: string;
  weightLbs?: number;
  temperatureF?: number;
  temperatureMethod?: string;
  durationHours?: number;
  symptoms?: string[];
  behaviorNotes?: string;
  medicationGiven?: string;
  triageResult?: TriageResultDTO | null;
}

export function PediatricianVisitSummaryModal({
  isOpen,
  onClose,
  childName = 'Child',
  childAgeString = '14 mo',
  weightLbs = 24,
  temperatureF = 101.5,
  temperatureMethod = 'Rectal',
  durationHours = 18,
  symptoms = ['Fever', 'Ear Pulling'],
  behaviorNotes = 'Fussy during feedings, drinking fluids, 4 wet diapers today',
  medicationGiven = 'Acetaminophen 160mg given 3 hours ago',
  triageResult,
}: PediatricianVisitSummaryModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const summaryText = `--- PEDIATRICIAN VISIT SUMMARY (ALONGSIDE CLINICAL SAFE HARBOR) ---
Child Name: ${childName}
Age: ${childAgeString} | Weight: ${weightLbs} lbs (~${(weightLbs * 0.453592).toFixed(1)} kg)
Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

CLINICAL TRIAGE ASSESSMENT:
Zone: ${triageResult?.zone || 'YELLOW'} (${triageResult?.conditionSuspected || 'Symptom Triage Evaluation'})
Clinical Rationale: ${triageResult?.clinicalRationale || 'Evaluated via Barton Schmitt Clinical Pediatric Protocols'}

VITAL SIGNS & SYMPTOMS:
• Highest Temperature: ${temperatureF}°F (${temperatureMethod})
• Duration of Illness: ${durationHours} hours (~${(durationHours / 24).toFixed(1)} days)
• Reported Symptoms: ${symptoms.join(', ')}
• Behavior & Hydration Notes: ${behaviorNotes || 'Alert, drinking liquids'}
• Medications Administered: ${medicationGiven || 'None recorded'}

RECOMMENDED CLINICAL ACTIONS:
${triageResult?.immediateActions?.map((a) => `• ${a}`).join('\n') || '• Pediatric otoscopic and clinical exam recommended within 24 hours'}

Clinical Authority: American Academy of Pediatrics / Barton Schmitt Protocols`;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(summaryText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white shadow-xs">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 id="summary-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
                Pediatrician Visit Summary
              </h2>
              <p className="text-xs text-slate-600">
                Print or copy this clinical report for your doctor or nurse triage line
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Printable Content */}
        <div className="overflow-y-auto p-6 space-y-5 print:p-0">
          {/* Patient Card Banner */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div>
              <span className="font-bold text-slate-900 text-base">{childName}</span>
              <span className="ml-2 text-slate-600 font-medium">({childAgeString})</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <span><strong>Weight:</strong> {weightLbs} lbs ({(weightLbs * 0.453592).toFixed(1)} kg)</span>
              <span><strong>Recorded:</strong> {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Clinical Triage Status */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-teal-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Clinical Assessment
                </span>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  triageResult?.zone === 'RED'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : triageResult?.zone === 'YELLOW'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                {triageResult?.zone || 'YELLOW'} ZONE
              </span>
            </div>

            <div className="text-sm font-semibold text-slate-900">
              {triageResult?.conditionSuspected || 'Suspected Pediatric Symptom Pattern'}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {triageResult?.clinicalRationale ||
                'Symptoms warrant in-person clinical otoscopic and physical examination within 24 hours.'}
            </p>
          </div>

          {/* Vitals & Observations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="rounded-xl border border-slate-200 p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span>Vitals & Onset</span>
              </div>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Max Temp:</strong> {temperatureF}°F ({temperatureMethod})</li>
                <li>• <strong>Duration:</strong> {durationHours} hours (~{(durationHours / 24).toFixed(1)} days)</li>
                <li>• <strong>Symptoms:</strong> {symptoms.join(', ')}</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Droplets className="h-4 w-4 text-sky-600" />
                <span>Hydration & Comfort</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {behaviorNotes || 'Alert and responsive; consuming oral fluids.'}
              </p>
              <div className="pt-1 flex items-center gap-1 text-xs text-slate-600">
                <Pill className="h-3.5 w-3.5 text-teal-600" />
                <span>{medicationGiven}</span>
              </div>
            </div>
          </div>

          {/* Doctor Checklist Advice */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 text-xs uppercase tracking-wide">
              Pediatrician Evaluation Guidance:
            </div>
            <ul className="list-disc pl-4 space-y-1">
              <li>Inspect tympanic membranes for erythema, bulging, or effusion (AOM).</li>
              <li>Auscultate lung fields for focal crackles, wheezing, or stridor.</li>
              <li>Confirm weight-based antipyretic dosing accuracy.</li>
            </ul>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500">
            Source: Barton Schmitt Pediatric Protocols / AAP
          </span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5 text-xs font-semibold"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-teal-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 text-xs font-semibold"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={onClose}
              className="text-xs font-semibold"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
