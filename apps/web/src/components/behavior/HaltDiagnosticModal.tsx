'use client';

import * as React from 'react';
import {
  Brain,
  AlertTriangle,
  Utensils,
  Flame,
  HeartHandshake,
  Moon,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  HALT_DIAGNOSTICS_DATA,
  type HaltItem,
} from '@/lib/api/behavior';

export interface HaltDiagnosticModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function HaltDiagnosticModal({
  open,
  onOpenChange,
  trigger,
}: HaltDiagnosticModalProps) {
  const [selectedLetter, setSelectedLetter] = React.useState<'H' | 'A' | 'L' | 'T'>('H');
  const [checkedSymptoms, setCheckedSymptoms] = React.useState<Record<string, boolean>>({});
  const [copiedScript, setCopiedScript] = React.useState(false);

  const activeItem =
    HALT_DIAGNOSTICS_DATA.find((item) => item.letter === selectedLetter) ||
    HALT_DIAGNOSTICS_DATA[0]!;

  const handleToggleSymptom = (key: string) => {
    setCheckedSymptoms((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCopyScript = (scriptText: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(scriptText);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  const getLetterIcon = (letter: 'H' | 'A' | 'L' | 'T') => {
    switch (letter) {
      case 'H':
        return <Utensils className="h-5 w-5 text-amber-600" />;
      case 'A':
        return <Flame className="h-5 w-5 text-rose-600" />;
      case 'L':
        return <HeartHandshake className="h-5 w-5 text-indigo-600" />;
      case 'T':
        return <Moon className="h-5 w-5 text-teal-600" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 border-slate-200">
        <DialogHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white shadow-xs">
              <Brain className="h-4 w-4" />
            </span>
            <Badge
              variant="outline"
              className="text-[10px] font-bold text-teal-800 bg-teal-50 border-teal-200 uppercase"
            >
              Rapid De-escalation Protocol
            </Badge>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            The HALT Tantrum Diagnostic
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-slate-600">
            Before attempting discipline or lecturing, check the 4 physiological triggers that knock the prefrontal cortex offline.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* 4 HALT Letter Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {HALT_DIAGNOSTICS_DATA.map((item) => {
              const isSelected = item.letter === selectedLetter;
              return (
                <button
                  key={item.letter}
                  type="button"
                  onClick={() => {
                    setSelectedLetter(item.letter);
                    setCopiedScript(false);
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all min-h-[58px] ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/80 shadow-xs ring-1 ring-teal-400'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black text-slate-900">
                      {item.letter}
                    </span>
                    {getLetterIcon(item.letter)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 truncate w-full mt-0.5">
                    {item.letter === 'H'
                      ? 'Hungry'
                      : item.letter === 'A'
                      ? 'Angry / Anxious'
                      : item.letter === 'L'
                      ? 'Lonely'
                      : 'Tired'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Diagnostic Detail */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-100 text-teal-900 font-extrabold text-base">
                  {activeItem.letter}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {activeItem.name}
                </h3>
              </div>
              <Badge className="bg-slate-200 text-slate-800 text-[10px] font-semibold">
                Trigger: {activeItem.trigger}
              </Badge>
            </div>

            {/* Checklist of Signs */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Observed Physical & Emotional Signs (Check all that apply):
              </span>
              <div className="space-y-2">
                {activeItem.symptoms.map((symptom, idx) => {
                  const key = `${activeItem.letter}-${idx}`;
                  const isChecked = !!checkedSymptoms[key];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleSymptom(key)}
                      className="flex items-start gap-2.5 w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-teal-600 border-teal-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </span>
                      <span className="text-xs text-slate-700 leading-snug">
                        {symptom}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Physiological Mechanism */}
            <div className="rounded-xl bg-amber-50/70 border border-amber-200 p-3.5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                Why Rational Lecturing Fails Right Now:
              </span>
              <p className="text-xs text-amber-950 leading-relaxed font-medium">
                {activeItem.physiologicalMechanism}
              </p>
            </div>

            {/* Immediate Action Protocol */}
            <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-3.5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                Step 1: Immediate Somatic Action (Before words):
              </span>
              <p className="text-xs text-emerald-950 font-bold leading-relaxed">
                {activeItem.immediateAction}
              </p>
            </div>

            {/* Co-Regulation Script with Copy */}
            <div className="rounded-xl border border-teal-200 bg-white p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  Step 2: Word-for-Word Calming Script:
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyScript(activeItem.script)}
                  className="h-8 gap-1.5 text-[11px] font-bold text-teal-900 border-teal-200 hover:bg-teal-50"
                >
                  {copiedScript ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-500" />
                      <span>Copy Script</span>
                    </>
                  )}
                </Button>
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-800 italic border-l-2 border-teal-400 pl-3 py-0.5 leading-relaxed">
                “{activeItem.script}”
              </blockquote>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
