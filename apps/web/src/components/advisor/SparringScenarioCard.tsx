'use client';

import * as React from 'react';
import { Play, Pause, Volume2, Sparkles, Brain, Baby, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface SparringOption {
  id: string;
  label: string;
  text: string;
  toneType: 'EMPATHETIC_FIRM' | 'DEFENSIVE_PUNITIVE' | 'PASSIVE_CONCESSION';
  toneScore: string;
  firmnessScore: string;
  neurobiologyFeedback: string;
  clinicalVerdict: 'RECOMMENDED' | 'ESCALATING' | 'PERMISSIVE';
  calmnessScore?: number;
  empathyScore?: number;
  deEscalationTips?: string[];
}

export interface SparringScenario {
  id: string;
  key: string;
  title: string;
  category: string;
  developmentalContext: string;
  lifespanStage: string;
  childDialogue: string;
  audioDurationSeconds: number;
  objective: string;
  options: SparringOption[];
}

export interface SparringScenarioCardProps {
  scenario: SparringScenario;
  isPlayingAudio: boolean;
  audioProgress: number;
  onToggleAudio: () => void;
  className?: string;
}

export function SparringScenarioCard({
  scenario,
  isPlayingAudio,
  audioProgress,
  onToggleAudio,
  className,
}: SparringScenarioCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all',
        className
      )}
    >
      {/* Category & Lifespan Stage Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-bold text-teal-800">
            <Baby className="h-3.5 w-3.5 text-teal-600" />
            {scenario.lifespanStage}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {scenario.category}
          </span>
        </div>
        <span className="text-xs font-medium text-slate-400">
          {scenario.developmentalContext}
        </span>
      </div>

      {/* Scenario Title */}
      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 mb-2">
        {scenario.title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
        <span className="font-semibold text-slate-800">Objective:</span> {scenario.objective}
      </p>

      {/* Child Audio Rehearsal Waveform Simulator */}
      <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-4 mb-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-teal-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Child High-Heat Audio Simulation
            </span>
          </div>
          <span className="text-xs font-medium text-teal-700">
            {scenario.audioDurationSeconds}s Clip
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            size="sm"
            onClick={onToggleAudio}
            className="flex items-center gap-1.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 min-h-[40px] px-3.5 shadow-sm"
          >
            {isPlayingAudio ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>{audioProgress > 0 && audioProgress < 100 ? 'Resume' : 'Listen'}</span>
              </>
            )}
          </Button>

          {/* Waveform track */}
          <div className="flex-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-teal-200/60">
              <div
                className="h-full bg-teal-600 transition-all duration-100 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, audioProgress))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Child Dialogue Quote Box */}
      <div className="relative rounded-xl border border-amber-200/80 bg-amber-50/60 p-4">
        <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-amber-800 uppercase tracking-wider">
          <span>Child Dialogue in the Moment:</span>
        </div>
        <p className="text-sm font-medium italic text-slate-900 leading-relaxed">
          {scenario.childDialogue}
        </p>
      </div>
    </div>
  );
}
