'use client';

import * as React from 'react';
import { Clock, Moon, ShieldCheck, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { usePactStore, formatCurfew12Hour } from '@/stores/usePactStore';
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
  { time: '20:00', label: '8:00 PM', sub: 'Ages 8–9' },
  { time: '20:30', label: '8:30 PM', sub: 'Canonical Recommended' },
  { time: '21:00', label: '9:00 PM', sub: 'Ages 10–12' },
  { time: '21:30', label: '9:30 PM', sub: 'Ages 12–13' },
  { time: '22:00', label: '10:00 PM', sub: 'High School' },
];

export function CurfewSlider() {
  const { curfewTime, setCurfewTime, childName } = usePactStore();
  const [showScience, setShowScience] = React.useState(false);

  const currentMinutes = timeToMinutes(curfewTime);
  const minSlider = 1140; // 7:00 PM
  const maxSlider = 1380; // 11:00 PM
  const step = 15;

  const windDownTime = formatCurfew12Hour(minutesToTime(currentMinutes - 30));
  const formattedDisplay = formatCurfew12Hour(curfewTime);
  const sliderPct = Math.round(
    ((currentMinutes - minSlider) / (maxSlider - minSlider)) * 100
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mins = parseInt(e.target.value, 10);
    setCurfewTime(minutesToTime(mins));
  };

  return (
    <section className="overflow-hidden rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)]">
      {/* Warm Sand Header with Live Bedtime Time Readout */}
      <div className="border-b border-[var(--hairline-soft)] bg-[var(--trigger-bg)] px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--amber)]">
              <Moon className="h-4 w-4" aria-hidden="true" />
              <span>Nightly bedtime dock</span>
            </span>
            <h2 className="font-serif-almanac text-[22px] sm:text-[26px] font-semibold leading-[1.2] text-[var(--ink)]">
              When do screens go to sleep?
            </h2>
            <p className="text-[13.5px] text-[var(--body)] leading-relaxed max-w-[46ch]">
              The device handles bedtime automatically, so nobody has to argue at the door.
            </p>
          </div>

          <div className="shrink-0 self-start sm:self-center rounded-[14px] border border-[var(--spruce-border)] bg-[var(--elevated)] px-5 py-3 text-left sm:text-right">
            <div className="font-serif-almanac text-[30px] font-semibold leading-none tracking-tight text-[var(--spruce)] tabular-nums">
              {formattedDisplay}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-[var(--mute)] sm:justify-end">
              <Clock className="h-3.5 w-3.5 text-[var(--spruce)]" aria-hidden="true" />
              <span>Kitchen dock · Unlocks 6:30 AM</span>
            </div>
          </div>
        </div>

        {/* Calm Evening Rhythm Timeline */}
        <div className="mt-5 grid grid-cols-3 gap-2 rounded-[12px] border border-[var(--hairline)] bg-[var(--elevated)] p-3 text-[12px]">
          <div className="space-y-0.5">
            <span className="block font-semibold text-[var(--body)] tabular-nums">
              {windDownTime}
            </span>
            <span className="block text-[var(--mute)]">30-min heads-up</span>
          </div>
          <div className="space-y-0.5 border-x border-[var(--hairline-soft)] px-2.5 text-center">
            <span className="block font-semibold text-[var(--spruce)] tabular-nums">
              {formattedDisplay}
            </span>
            <span className="block text-[var(--spruce)] font-medium">Dock &amp; pause apps</span>
          </div>
          <div className="space-y-0.5 text-right">
            <span className="block font-semibold text-[var(--body)] tabular-nums">
              6:30 AM
            </span>
            <span className="block text-[var(--mute)]">Morning unlock</span>
          </div>
        </div>
      </div>

      {/* Controls Body */}
      <div className="px-5 py-6 sm:px-7 sm:py-6 space-y-6">
        {/* Quick Bedtime Presets */}
        <div className="space-y-2.5">
          <span className="block text-[13px] font-semibold text-[var(--ink)]">
            Pick a bedtime that fits your school nights
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {CURFEW_PRESETS.map((preset) => {
              const isSelected = curfewTime === preset.time;
              return (
                <button
                  key={preset.time}
                  type="button"
                  onClick={() => setCurfewTime(preset.time)}
                  aria-pressed={isSelected}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-[10px] border px-2.5 py-2.5 text-center transition-colors duration-150 min-h-[60px] cursor-pointer',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)] focus-visible:ring-offset-2',
                    isSelected
                      ? 'border-[var(--spruce)] bg-[var(--spruce)] text-white'
                      : 'border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] hover:border-[var(--spruce-border)] hover:bg-[var(--canvas-subtle)]'
                  )}
                >
                  <span className="text-[14px] font-semibold tabular-nums">
                    {preset.label}
                  </span>
                  <span
                    className={cn(
                      'mt-0.5 text-[11px] leading-tight line-clamp-1',
                      isSelected ? 'text-white/80' : 'text-[var(--mute)]'
                    )}
                  >
                    {preset.time === '20:30' ? 'Recommended' : preset.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fine-Tune 15-Minute Slider */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[13px]">
            <label htmlFor="curfew-time-slider" className="font-medium text-[var(--body)]">
              Fine-tune in 15-minute steps
            </label>
            <span className="font-semibold text-[var(--spruce)] tabular-nums">
              {formattedDisplay}
            </span>
          </div>

          <div className="relative pt-1">
            <input
              id="curfew-time-slider"
              type="range"
              min={minSlider}
              max={maxSlider}
              step={step}
              value={currentMinutes}
              onChange={handleSliderChange}
              aria-label="Bedtime curfew dock time"
              className="w-full h-2 rounded-full bg-[var(--canvas-subtle)] accent-[#143D2B] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)] focus-visible:ring-offset-2"
              style={{
                background: `linear-gradient(to right, #143D2B 0%, #143D2B ${sliderPct}%, #E3E3DC ${sliderPct}%, #E3E3DC 100%)`,
              }}
            />
            <div className="mt-2 flex justify-between text-[11px] text-[var(--mute)] tabular-nums">
              <span>7:00 PM</span>
              <span>8:30 PM</span>
              <span>10:00 PM</span>
              <span>11:00 PM</span>
            </div>
          </div>
        </div>

        {/* Safe Harbor Call Reassurance */}
        <div className="flex items-start gap-3 rounded-[12px] border border-[var(--spruce-border)] bg-[var(--spruce-soft)] px-4 py-3.5">
          <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-[var(--spruce)] mt-0.5" aria-hidden="true" />
          <p className="text-[13px] leading-[1.55] text-[var(--ink)]">
            <strong className="font-semibold">Safety never locks.</strong> At {formattedDisplay},
            games, social feeds, and browsers pause on {childName || 'your child'}&apos;s device, while
            calls to parents and 911 stay open all night.
          </p>
        </div>

        {/* Optional Collapsible Sleep Science Note */}
        <div>
          <button
            type="button"
            onClick={() => setShowScience((prev) => !prev)}
            aria-expanded={showScience}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-[13px] font-medium text-[var(--mute)] transition-colors hover:text-[var(--spruce)] cursor-pointer"
          >
            <Info className="h-4 w-4" aria-hidden="true" />
            <span>Why docking outside the bedroom helps</span>
            {showScience ? (
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>

          {showScience && (
            <p className="mt-2 rounded-[12px] bg-[var(--canvas-subtle)] px-4 py-3.5 text-[13px] leading-[1.6] text-[var(--body)] almanac-rise-in">
              As kids approach puberty, melatonin naturally releases up to two hours later. Keeping
              screens charging in a shared family spot removes blue light and late-night group-chat
              buzzes, and lets the clock enforce bedtime instead of you.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
