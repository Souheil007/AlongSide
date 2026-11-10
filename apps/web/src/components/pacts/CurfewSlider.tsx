'use client';

import * as React from 'react';
import { Clock, Moon, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { usePactStore, formatCurfew12Hour } from '@/stores/usePactStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// Convert HH:MM into total minutes from midnight
function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map((v) => parseInt(v, 10));
  return (h ?? 20) * 60 + (m ?? 30);
}

// Convert total minutes into HH:MM
function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(h)}:${pad(m)}`;
}

export const CURFEW_PRESETS = [
  { time: '19:30', label: '7:30 PM', sub: 'Early bedtime / Elementary' },
  { time: '20:00', label: '8:00 PM', sub: 'Tier 1 (Ages 8-9)' },
  { time: '20:30', label: '8:30 PM', sub: 'Canonical Recommended' },
  { time: '21:00', label: '9:00 PM', sub: 'Tier 2-3 (Ages 10-12)' },
  { time: '21:30', label: '9:30 PM', sub: 'Tier 3 (Ages 12-13)' },
  { time: '22:00', label: '10:00 PM', sub: 'Tier 4 (High School)' },
];

export function CurfewSlider() {
  const { curfewTime, setCurfewTime, childName } = usePactStore();

  const currentMinutes = timeToMinutes(curfewTime);
  // Slider range: 19:00 (1140 min) to 23:00 (1380 min) with 15 min steps
  const minSlider = 1140; // 7:00 PM
  const maxSlider = 1380; // 11:00 PM
  const step = 15;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mins = parseInt(e.target.value, 10);
    const newTime = minutesToTime(mins);
    setCurfewTime(newTime);
  };

  const formattedDisplay = formatCurfew12Hour(curfewTime);

  return (
    <div className="rounded-xl border border-violet-100 bg-white p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
            <Moon className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Evening Bedtime Curfew & Charging Dock
              </h3>
              <Badge variant="roadActive" className="text-[10px]">
                Road 2 Neutral Lock
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              The canonical 8:30 PM lock removes nighttime confrontation and protects circadian neurobiology.
            </p>
          </div>
        </div>

        {/* Large Curfew Time Callout */}
        <div className="flex items-center gap-3 self-start sm:self-center bg-violet-50/80 border border-violet-200/80 px-4 py-2 rounded-xl">
          <Clock className="h-5 w-5 text-violet-700" />
          <div className="text-right">
            <div className="text-xl font-extrabold text-violet-950 tracking-tight">
              {formattedDisplay}
            </div>
            <div className="text-[10px] text-violet-700 font-medium">
              OS Lockdown ({curfewTime} 24h)
            </div>
          </div>
        </div>
      </div>

      {/* Neurobiology Developmental Rationale */}
      <div className="rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50/50 via-cream-50 to-indigo-50/30 p-4 text-xs text-slate-700 space-y-2">
        <div className="flex items-center gap-2 font-bold text-violet-900">
          <Sparkles className="h-4 w-4 text-violet-600 shrink-0" />
          <span>Neurobiology Insight: The 2-Hour Adolescent Melatonin Delay</span>
        </div>
        <p className="text-slate-600 leading-relaxed text-[11px]">
          Tween and teen brains experience a natural biological phase delay—melatonin onset happens up to 2 hours later than adults. When screens are active in bedrooms, blue light and high-dopamine social anticipation severely degrade deep slow-wave and REM sleep.
        </p>
        <p className="text-slate-600 leading-relaxed text-[11px]">
          By agreeing on a neutral <strong className="text-violet-900">{formattedDisplay}</strong> kitchen docking routine, the device profile automatically locks recreational apps at curfew—preventing parents from ever having to play the role of the bedtime &ldquo;screen police.&rdquo;
        </p>
      </div>

      {/* Quick Select Preset Buttons */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Quick Bedtime Presets
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CURFEW_PRESETS.map((preset) => {
            const isSelected = curfewTime === preset.time;
            return (
              <button
                key={preset.time}
                type="button"
                onClick={() => setCurfewTime(preset.time)}
                className={cn(
                  'flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all min-h-[58px]',
                  isSelected
                    ? 'border-violet-600 bg-violet-600 text-white shadow-sm ring-2 ring-violet-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                )}
              >
                <span className="text-sm font-bold tracking-tight">
                  {preset.label}
                </span>
                <span
                  className={cn(
                    'text-[10px] mt-0.5 line-clamp-1',
                    isSelected ? 'text-violet-100' : 'text-slate-400'
                  )}
                >
                  {preset.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Range Slider */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-700">
            Fine-Tune Curfew Lock Time (15-min intervals)
          </span>
          <span className="font-mono font-bold text-violet-700">
            {formattedDisplay}
          </span>
        </div>

        <div className="relative pt-1">
          <input
            type="range"
            min={minSlider}
            max={maxSlider}
            step={step}
            value={currentMinutes}
            onChange={handleSliderChange}
            aria-label="Bedtime Curfew Lock Time Slider"
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
            <span>7:00 PM</span>
            <span>8:00 PM</span>
            <span className="font-bold text-violet-700">8:30 PM (Default)</span>
            <span>9:30 PM</span>
            <span>11:00 PM</span>
          </div>
        </div>
      </div>

      {/* Neutral Enforcement Safe-Guarantees */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3.5 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-700">
          <h5 className="font-bold text-emerald-950">
            Parent Safe Harbor & Emergency Guarantee
          </h5>
          <p className="text-[11px] text-emerald-900/90 leading-relaxed">
            When {childName || 'your child'}&apos;s device locks at {formattedDisplay}, games, social feeds, and web browsers pause until 6:30 AM. However, <strong>direct phone calling to parents and emergency 911 services remain 100% accessible at all times</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
