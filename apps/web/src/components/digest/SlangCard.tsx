'use client';

import * as React from 'react';
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Quote,
  Sparkles,
} from 'lucide-react';
import type { SlangTermDTO } from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export interface SlangCardProps {
  slang: SlangTermDTO;
  className?: string;
}

export function getSlangToneDetails(tone: string) {
  const normalized = tone.toLowerCase();

  if (
    normalized.includes('toxic') ||
    normalized.includes('red flag') ||
    normalized.includes('danger') ||
    normalized.includes('harmful') ||
    normalized.includes('derogatory') ||
    normalized.includes('severe')
  ) {
    return {
      type: 'TOXIC',
      label: 'Toxic Alert / Red Flag',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: AlertTriangle,
    };
  }

  if (
    normalized.includes('warning') ||
    normalized.includes('caution') ||
    normalized.includes('borderline') ||
    normalized.includes('sensitive')
  ) {
    return {
      type: 'CAUTION',
      label: 'Use Caution',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertCircle,
    };
  }

  return {
    type: 'HARMLESS',
    label: tone.length > 0 ? tone : 'Harmless Slang',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: CheckCircle2,
  };
}

export function SlangCard({ slang, className }: SlangCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const toneDetails = getSlangToneDetails(slang.contextTone);
  const ToneIcon = toneDetails.icon;

  return (
    <Card
      className={cn(
        'group flex flex-col justify-between border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:border-teal-300 hover:shadow-md cursor-pointer select-none',
        toneDetails.type === 'TOXIC' && 'border-rose-200/80 hover:border-rose-300',
        className
      )}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
      aria-expanded={isExpanded}
      aria-label={`Slang term: ${slang.term}. Context: ${slang.contextTone}`}
    >
      <div>
        <CardHeader className="space-y-3 pb-2">
          {/* Tone Badge Header */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide',
                toneDetails.badgeClass
              )}
            >
              <ToneIcon className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span>{toneDetails.label}</span>
            </span>

            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors">
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </span>
          </div>

          {/* Slang Term Headline */}
          <CardTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-teal-900 transition-colors">
            &ldquo;{slang.term}&rdquo;
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 pt-1">
          {/* Definition */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {slang.definition}
          </p>

          {/* Expanded Drawer: Example Sentence & Context */}
          {isExpanded && (
            <div className="space-y-3 pt-3 border-t border-slate-100 animate-in fade-in duration-200">
              {/* Example in Context */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-3 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Quote className="h-3 w-3" />
                  In Tween Context
                </span>
                <blockquote className="text-xs sm:text-sm text-slate-800 italic">
                  &ldquo;{slang.exampleSentence}&rdquo;
                </blockquote>
              </div>

              {/* Empathetic Parent Strategy */}
              <div className="rounded-xl bg-teal-50/60 border border-teal-100 p-3 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Calm Parent Reaction
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {toneDetails.type === 'TOXIC'
                    ? 'Do not punish immediately. Ask: "I heard you use that word—what does it mean when your friends say it?" Open curiosity reduces defensive secrecy.'
                    : 'Acknowledge the humor without trying too hard to adopt the slang yourself. A subtle nod shows you speak their world.'}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </div>

      <div className="px-6 py-2.5 bg-slate-50/50 border-t border-slate-100 rounded-b-xl flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>{isExpanded ? 'Tap to collapse' : 'Tap to reveal context & script'}</span>
        <span className="font-semibold text-teal-700 group-hover:underline">
          {isExpanded ? 'Show less' : 'Learn more'}
        </span>
      </div>
    </Card>
  );
}
