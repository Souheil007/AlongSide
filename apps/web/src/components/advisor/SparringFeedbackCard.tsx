'use client';

import * as React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Brain,
  Sparkles,
  Heart,
  Volume2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SparringFeedbackCardProps {
  verdict: 'RECOMMENDED' | 'ESCALATING' | 'PERMISSIVE';
  toneScore: string | number;
  calmnessScore?: number;
  empathyScore?: number;
  firmnessScore: string | number;
  neurobiologyFeedback: string;
  deEscalationTips?: string[];
  recommendedScript?: string;
  className?: string;
}

export function SparringFeedbackCard({
  verdict,
  toneScore,
  calmnessScore = 85,
  empathyScore = 90,
  firmnessScore,
  neurobiologyFeedback,
  deEscalationTips = [],
  recommendedScript,
  className,
}: SparringFeedbackCardProps) {
  const isRecommended = verdict === 'RECOMMENDED';
  const isEscalating = verdict === 'ESCALATING';

  return (
    <div
      className={cn(
        'rounded-2xl border p-5 sm:p-6 shadow-sm transition-all',
        isRecommended
          ? 'border-emerald-200 bg-emerald-50/40 text-slate-900'
          : isEscalating
          ? 'border-rose-200 bg-rose-50/40 text-slate-900'
          : 'border-amber-200 bg-amber-50/40 text-slate-900',
        className
      )}
    >
      {/* Verdict Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          {isRecommended ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Attuned & Regulated (Clinical Gold Standard)
            </span>
          ) : isEscalating ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
              <AlertTriangle className="h-4 w-4" />
              Reactive & Threat-Driven (Escalates Amygdala)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
              <AlertTriangle className="h-4 w-4" />
              Boundary Surrender (Intermittent Reinforcement)
            </span>
          )}
        </div>
      </div>

      {/* 4 Clinical Performance Meters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
            <Heart className="h-3.5 w-3.5 text-teal-600" />
            <span>Calmness</span>
          </div>
          <div className="text-lg font-bold text-slate-900">{calmnessScore}/100</div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full',
                calmnessScore >= 80
                  ? 'bg-emerald-500'
                  : calmnessScore >= 50
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              )}
              style={{ width: `${Math.min(100, Math.max(0, calmnessScore))}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>Empathy</span>
          </div>
          <div className="text-lg font-bold text-slate-900">{empathyScore}/100</div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full',
                empathyScore >= 80
                  ? 'bg-emerald-500'
                  : empathyScore >= 50
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              )}
              style={{ width: `${Math.min(100, Math.max(0, empathyScore))}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
            <span>Firmness</span>
          </div>
          <div className="text-sm font-bold text-slate-900 truncate">
            {typeof firmnessScore === 'number' ? `${firmnessScore}/100` : firmnessScore}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
            <Volume2 className="h-3.5 w-3.5 text-teal-600" />
            <span>Tone Rating</span>
          </div>
          <div className="text-sm font-bold text-slate-900 truncate">
            {typeof toneScore === 'number' ? `${toneScore}/100` : toneScore}
          </div>
        </div>
      </div>

      {/* Neurobiology Rationale */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-4 mb-4">
        <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Brain className="h-4 w-4 text-teal-600" />
          <span>Neurobiology Feedback:</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          {neurobiologyFeedback}
        </p>
      </div>

      {/* De-escalation Tips */}
      {deEscalationTips.length > 0 && (
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 mb-4">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Instant De-escalation Strategy:
          </div>
          <ul className="space-y-1.5">
            {deEscalationTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Script */}
      {recommendedScript && (
        <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 uppercase tracking-wider mb-1">
            <ArrowRight className="h-3.5 w-3.5 text-teal-700" />
            <span>Recommended Next Dialogue Adjustment:</span>
          </div>
          <p className="text-sm font-medium italic text-teal-950 leading-relaxed">
            {recommendedScript}
          </p>
        </div>
      )}
    </div>
  );
}
