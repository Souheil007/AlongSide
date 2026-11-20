'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CircadianStage {
  time: string;
  label: string;
  level: number; // 0-100 vertical curve position
  title: string;
  desc: string;
  tip: string;
}

const DEFAULT_STAGES: CircadianStage[] = [
  {
    time: 'Morning',
    label: 'Bright Anchor',
    level: 22,
    title: 'Natural daylight sets the body clock',
    desc: 'Morning sunlight starts the biological countdown for restful evening sleep.',
    tip: 'Step near a bright window or porch for 10 minutes right after waking.',
  },
  {
    time: 'Midday',
    label: 'Rest Window',
    level: 65,
    title: 'Homeostatic sleep pressure builds',
    desc: 'Catching early sleepy signals clears adenosine gently before stress hormones step in.',
    tip: 'Watch for subtle early cues instead of waiting for late tears.',
  },
  {
    time: 'Evening',
    label: 'Dim Wind-Down',
    level: 82,
    title: 'Melatonin climbs in warm dimness',
    desc: 'Warm low lamps and predictable calm cues signal the brain that safe sleep is near.',
    tip: 'Power screens off and dim overhead lights 45–60 minutes before bed.',
  },
  {
    time: 'Night',
    label: 'Deep Repair',
    level: 92,
    title: 'Restorative cycles lock in growth',
    desc: 'Consistent sleep spaces help {name} glide smoothly across light and deep cycles.',
    tip: 'Keep nighttime check-ins dim, calm, and unhurried.',
  },
];

export interface CircadianCurveVisualProps {
  config?: Record<string, unknown>;
  t: (str: string) => string;
}

export function CircadianCurveVisual({ config, t }: CircadianCurveVisualProps) {
  const stages = React.useMemo<CircadianStage[]>(() => {
    const raw = config?.stages;
    if (Array.isArray(raw) && raw.length >= 3) {
      return raw.slice(0, 5) as CircadianStage[];
    }
    return DEFAULT_STAGES;
  }, [config]);

  const [activeIdx, setActiveIdx] = React.useState<number>(1);
  const current = stages[activeIdx] ?? stages[0]!;

  // Compute SVG wave coordinates cleanly
  const points = stages.map((st, idx) => {
    const x =
      stages.length === 1
        ? 200
        : 45 + (idx / (stages.length - 1)) * 310;
    const clamped = Math.min(95, Math.max(12, st.level));
    const y = 115 - (clamped / 100) * 85;
    return { x, y, st };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[idx - 1]!;
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1]!.x} 122 L ${points[0]!.x} 122 Z`;

  return (
    <div data-testid="visual-circadian-curve" className="space-y-4">
      {/* Interactive SVG Wave */}
      <div className="rounded-[14px] bg-[var(--canvas-subtle)] p-4 sm:p-5">
        <svg
          viewBox="0 0 400 138"
          fill="none"
          className="w-full h-auto block"
          aria-hidden="true"
        >
          <path d={areaD} fill="var(--spruce-soft)" opacity="0.65" />
          <path
            d={pathD}
            stroke="var(--spruce)"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          {points.map((pt, idx) => {
            const isActive = idx === activeIdx;
            const isPeak = pt.st.level >= 90;
            return (
              <g
                key={pt.st.label}
                onClick={() => setActiveIdx(idx)}
                className="cursor-pointer"
              >
                {isActive && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="13"
                    fill={isPeak ? 'var(--amber-soft)' : 'var(--spruce-soft)'}
                    stroke={isPeak ? 'var(--amber)' : 'var(--spruce)'}
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                )}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? 7 : 5}
                  fill={
                    isActive
                      ? isPeak
                        ? 'var(--amber)'
                        : 'var(--spruce)'
                      : 'var(--elevated)'
                  }
                  stroke={isPeak ? 'var(--amber)' : 'var(--spruce)'}
                  strokeWidth="2"
                />
                <text
                  x={pt.x}
                  y="134"
                  textAnchor="middle"
                  fill={isActive ? 'var(--ink)' : 'var(--mute)'}
                  fontFamily="var(--font-mono)"
                  fontSize="9.5"
                  fontWeight={isActive ? '700' : '500'}
                >
                  {pt.st.time}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Accessible Stage Buttons */}
        <div
          className={cn(
            'grid gap-2 mt-3',
            stages.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
          )}
          role="group"
          aria-label="Biological curve timepoints"
        >
          {stages.map((st, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={st.label}
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-pressed={isActive}
                data-testid={`curve-stage-${idx}`}
                className={cn(
                  'min-h-[44px] px-3 py-2 rounded-[10px] border text-left transition-all cursor-pointer',
                  isActive
                    ? 'bg-[var(--spruce)] border-[var(--spruce)] text-[var(--elevated)] shadow-xs'
                    : 'bg-[var(--elevated)] border-[var(--hairline)] text-[var(--body)] hover:border-[var(--spruce-border)]'
                )}
              >
                <span className="block font-mono text-[10px] opacity-80">
                  {st.time}
                </span>
                <span className="block text-[12.5px] font-semibold leading-tight">
                  {t(st.label)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Explanation Card */}
      <div
        key={activeIdx}
        className="rounded-xl bg-[var(--canvas-subtle)] p-5 almanac-rise-in space-y-2"
      >
        <h3 className="font-serif-almanac text-[20px] font-semibold text-[var(--ink)] leading-snug">
          {t(current.title)}
        </h3>
        <p className="text-[14.5px] leading-relaxed text-[var(--body)] m-0">
          {t(current.desc)}
        </p>
        <p className="pt-1 text-[13px] font-medium text-[var(--spruce)] m-0">
          <span className="font-mono text-[11px] uppercase tracking-wider mr-1.5 text-[var(--amber)]">
            Try this ·
          </span>
          {t(current.tip)}
        </p>
      </div>
    </div>
  );
}
