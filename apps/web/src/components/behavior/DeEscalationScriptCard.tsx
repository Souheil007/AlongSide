'use client';

import * as React from 'react';
import {
  Brain,
  XCircle,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { BehaviorGuideUI } from '@/lib/api/behavior';

export interface DeEscalationScriptCardProps {
  guide: BehaviorGuideUI;
  onCopyScript?: (script: string) => void;
}

export function DeEscalationScriptCard({
  guide,
  onCopyScript,
}: DeEscalationScriptCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(guide.coRegulationScript);
      setCopied(true);
      onCopyScript?.(guide.coRegulationScript);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <Card className="border-slate-200/90 bg-white hover:border-teal-300 transition-all shadow-xs overflow-hidden flex flex-col justify-between">
      <div>
        <CardHeader className="p-5 pb-3 border-b border-slate-100 bg-gradient-to-r from-teal-50/20 via-white to-transparent">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span className="rounded-md bg-teal-100 text-teal-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              {guide.categoryLabel}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {guide.targetTier.replace(/_/g, ' ')}
            </span>
          </div>

          <CardTitle className="text-base sm:text-lg font-bold text-slate-900 mt-1">
            {guide.triggerSituation}
          </CardTitle>
          <CardDescription className="text-xs text-slate-600 mt-1">
            <strong className="text-slate-800">Underlying Need:</strong> {guide.underlyingNeed}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          {/* Physiological Mechanism Callout */}
          {guide.physiologicalTrigger && (
            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-0.5 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Neurological Engine:
              </span>
              <p className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
                {guide.physiologicalTrigger}
              </p>
            </div>
          )}

          {/* Side-by-side What NOT to say vs What TO say */}
          <div className="space-y-3">
            {/* What NOT to Say */}
            <div className="rounded-xl border border-rose-200/90 bg-rose-50/50 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-800 text-[11px] font-bold uppercase tracking-wider">
                <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>What NOT to Say (Escalates Fight/Flight):</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-950 italic line-through decoration-rose-400 pl-5 leading-relaxed">
                “{guide.whatNotToSay}”
              </p>
            </div>

            {/* What TO Say */}
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/50 p-3.5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-900 text-[11px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>What TO Say (Word-for-Word Co-Regulation):</span>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-emerald-950 font-semibold italic pl-5 leading-relaxed">
                “{guide.coRegulationScript}”
              </blockquote>
            </div>

            {/* Authoritative Limit */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-800 text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-teal-700 shrink-0" />
                <span>The Authoritative Limit ("Hold with Kind Eyes"):</span>
              </div>
              <p className="text-xs text-slate-700 pl-5 leading-relaxed font-medium">
                {guide.authoritativeLimit}
              </p>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-medium">
          Connect before you correct
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="min-h-[38px] gap-1.5 text-xs font-bold text-teal-900 border-teal-200 hover:bg-teal-50"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-500" />
              <span>Copy Script</span>
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
