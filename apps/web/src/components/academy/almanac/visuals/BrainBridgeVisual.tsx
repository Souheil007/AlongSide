'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface BrainReadout {
  name: string;
  value: string;
  tone: 'spruce' | 'amber';
  desc: string;
}

const DEFAULT_CALM: BrainReadout[] = [
  {
    name: 'Upstairs Braking Cortex',
    value: 'Online',
    tone: 'spruce',
    desc: 'Connected smoothly to the emotional center - able to hear choices, practice words, and feel safe.',
  },
  {
    name: 'Downstairs Emotional Core',
    value: 'Steady',
    tone: 'spruce',
    desc: 'Calm baseline leaves plenty of room for curiosity, laughter, and real learning.',
  },
];

const DEFAULT_STORM: BrainReadout[] = [
  {
    name: 'Upstairs Braking Cortex',
    value: 'Offline',
    tone: 'amber',
    desc: 'Logic and fast explanations bounce straight off until the emotional wave peaks and cools.',
  },
  {
    name: 'Downstairs Emotional Core',
    value: 'Full Alarm',
    tone: 'amber',
    desc: 'Flooded with stress signals - needs your calm posture and warm low voice first.',
  },
];

export interface BrainBridgeVisualProps {
  config?: Record<string, unknown>;
  t: (str: string) => string;
}

export function BrainBridgeVisual({ config, t }: BrainBridgeVisualProps) {
  const [mode, setMode] = React.useState<'calm' | 'storm'>('storm');
  const isStorm = mode === 'storm';

  const calmLabel = (config?.calmToggleLabel as string) || 'Calm & Connected';
  const stormLabel = (config?.stormToggleLabel as string) || 'Mid-Storm (Lid Flipped)';
  const calmStatus = (config?.calmStatus as string) || 'UPSTAIRS & DOWNSTAIRS LINKED';
  const stormStatus = (config?.stormStatus as string) || 'LID FLIPPED · CONNECT FIRST';

  const readouts: BrainReadout[] = isStorm
    ? Array.isArray(config?.stormReadouts)
      ? (config!.stormReadouts as BrainReadout[])
      : DEFAULT_STORM
    : Array.isArray(config?.calmReadouts)
      ? (config!.calmReadouts as BrainReadout[])
      : DEFAULT_CALM;

  return (
    <div data-testid="visual-brain-bridge">
      {/* Calm vs. Storm Toggle */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4"
        role="group"
        aria-label="Toggle calm or overloaded brain state"
      >
        <button
          type="button"
          onClick={() => setMode('calm')}
          aria-pressed={!isStorm}
          data-testid="brain-toggle-calm"
          className={cn(
            'min-h-[48px] px-4 py-3 rounded-[10px] border text-left text-sm font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer',
            !isStorm
              ? 'bg-[var(--spruce-soft)] border-[var(--spruce-border)] text-[var(--spruce)]'
              : 'bg-[var(--canvas-subtle)] border-[var(--hairline)] text-[var(--body)] hover:border-[var(--spruce-border)]'
          )}
        >
          <span>{t(calmLabel)}</span>
          <span className="font-mono text-[11px] uppercase opacity-75">
            {!isStorm ? 'Active' : 'View'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMode('storm')}
          aria-pressed={isStorm}
          data-testid="brain-toggle-storm"
          className={cn(
            'min-h-[48px] px-4 py-3 rounded-[10px] border text-left text-sm font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer',
            isStorm
              ? 'bg-[var(--amber-soft)] border-[var(--amber-border)] text-[var(--amber)]'
              : 'bg-[var(--canvas-subtle)] border-[var(--hairline)] text-[var(--body)] hover:border-[var(--amber-border)]'
          )}
        >
          <span>{t(stormLabel)}</span>
          <span className="font-mono text-[11px] uppercase opacity-75">
            {isStorm ? 'Active' : 'View'}
          </span>
        </button>
      </div>

      {/* Illustrated Animated Brain-Bridge Stage */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5 items-center rounded-[14px] bg-[var(--canvas-subtle)] p-5">
        <div className="flex items-center justify-center">
          <svg
            viewBox="0 0 220 190"
            fill="none"
            className="w-full max-w-[215px] h-auto"
            aria-hidden="true"
          >
            <circle
              cx="110"
              cy="102"
              r="76"
              fill={isStorm ? 'var(--amber-soft)' : 'var(--spruce-soft)'}
              opacity="0.65"
            />
            <g
              style={{
                transform: isStorm
                  ? 'translate(0px, -18px) rotate(-14deg)'
                  : 'translate(0px, 0px)',
                transformOrigin: '110px 72px',
                transition: 'transform 360ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <path
                d="M54 90C54 58 78 38 110 38C142 38 166 58 166 90"
                fill="var(--elevated)"
                stroke="var(--spruce)"
                strokeWidth={isStorm ? 1.6 : 2.2}
                strokeDasharray={isStorm ? '4 4' : undefined}
                strokeLinecap="round"
              />
              <text
                x="110"
                y="66"
                textAnchor="middle"
                fill="var(--spruce)"
                fontFamily="var(--font-mono)"
                fontSize="9.5"
                fontWeight="600"
              >
                {isStorm ? 'BRAKES OFFLINE' : 'CALM BRAKES'}
              </text>
            </g>

            {!isStorm ? (
              <path
                d="M88 88V108M110 84V104M132 88V108"
                stroke="var(--spruce)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="2 3"
              />
            ) : (
              <path
                d="M72 90L78 96M148 90L142 96"
                stroke="var(--amber)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}

            {isStorm && (
              <>
                <circle
                  cx="110"
                  cy="126"
                  r="42"
                  stroke="var(--amber)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />
                <circle cx="110" cy="126" r="32" fill="var(--amber)" opacity="0.18" />
              </>
            )}

            <circle
              cx="110"
              cy="126"
              r={isStorm ? 26 : 21}
              fill={isStorm ? 'var(--amber)' : 'var(--elevated)'}
              stroke="var(--amber)"
              strokeWidth="2"
            />
            <text
              x="110"
              y="129"
              textAnchor="middle"
              fill={isStorm ? '#FFFFFF' : 'var(--amber)'}
              fontFamily="var(--font-mono)"
              fontSize="9.5"
              fontWeight="600"
            >
              {isStorm ? 'ALARM' : 'STEADY'}
            </text>

            <text
              x="110"
              y="182"
              textAnchor="middle"
              fill="var(--mute)"
              fontFamily="var(--font-mono)"
              fontSize="9"
              letterSpacing="0.04em"
            >
              {t(isStorm ? stormStatus : calmStatus)}
            </text>
          </svg>
        </div>

        <div className="grid gap-3">
          {readouts.map((item) => (
            <div
              key={item.name}
              className="rounded-xl bg-[var(--elevated)] border border-[var(--hairline)] p-4"
            >
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-[13px] font-semibold text-[var(--ink)]">
                  {t(item.name)}
                </span>
                <span
                  className={cn(
                    'font-mono text-xs font-semibold',
                    item.tone === 'amber'
                      ? 'text-[var(--amber)]'
                      : 'text-[var(--spruce)]'
                  )}
                >
                  {t(item.value)}
                </span>
              </div>
              <p className="text-[13.5px] leading-relaxed text-[var(--body)] m-0">
                {t(item.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
