'use client';

import * as React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  Download,
  Copy,
  Check,
  QrCode,
  Moon,
  Clock,
  Wifi,
  ChevronDown,
  ChevronUp,
  Info,
  ExternalLink,
} from 'lucide-react';
import {
  SHIELD_SERVICE_CATALOG,
  ShieldBlockableService,
  ShieldPlatform,
  type DeviceShieldDTO,
} from '@alongside/shared';
import { useDeviceShield } from '@/hooks/useDeviceShield';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface LiveDnsShieldCardProps {
  childId: string;
  childName: string;
  childAge: number;
  initialPlatform?: ShieldPlatform;
  initialShield?: DeviceShieldDTO;
  className?: string;
}

const BEDTIME_START_PRESETS = [
  { label: '8:00 PM', value: '20:00' },
  { label: '8:30 PM', value: '20:30' },
  { label: '9:00 PM', value: '21:00' },
  { label: '9:30 PM', value: '21:30' },
  { label: '10:00 PM', value: '22:00' },
];

const BEDTIME_RESUME_PRESETS = [
  { label: '6:00 AM', value: '06:00' },
  { label: '6:30 AM', value: '06:30' },
  { label: '7:00 AM', value: '07:00' },
  { label: '7:30 AM', value: '07:30' },
  { label: '8:00 AM', value: '08:00' },
];

function formatDisplayTime(hhmm: string): string {
  if (!hhmm) return '';
  const [hStr, mStr] = hhmm.split(':');
  const h = parseInt(hStr || '', 10);
  const m = mStr || '00';
  if (isNaN(h)) return hhmm;
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH}:${m} ${period}`;
}

export function LiveDnsShieldCard({
  childId,
  childName,
  childAge,
  initialPlatform = ShieldPlatform.APPLE_IOS,
  initialShield,
  className,
}: LiveDnsShieldCardProps) {
  const {
    shield,
    isLoading,
    isSaving,
    copiedHostname,
    downloadSuccess,
    setPlatform,
    toggleCoreSetting,
    toggleBlockedService,
    toggleBedtimeService,
    setBedtimeSchedule,
    downloadProfile,
    copyAndroidHostname,
    setCustomProfileId,
  } = useDeviceShield({
    childId,
    childName,
    childAge,
    initialPlatform,
    initialData: initialShield,
  });

  const [showQrModal, setShowQrModal] = React.useState(false);
  const [showRouterHelp, setShowRouterHelp] = React.useState(false);

  const activePlatform = shield?.platform ?? initialPlatform;
  const isApple = activePlatform === ShieldPlatform.APPLE_IOS;

  const isLiveActive = Boolean(shield?.health?.isActive);
  const totalQueries = shield?.health?.totalQueries24h ?? 0;
  const blockedQueries = shield?.health?.blockedQueries24h ?? 0;

  return (
    <section
      aria-label="Live Network Shield Configuration"
      className={cn(
        'rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)] overflow-hidden transition-all',
        className
      )}
    >
      {/* =================================================================== */}
      {/* 1. CARD HEADER & PLATFORM SWITCHER                                  */}
      {/* =================================================================== */}
      <div className="p-5 sm:px-6 sm:py-5 border-b border-[var(--hairline-soft)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[var(--spruce)]">
                Step 2 · Live Network Shield
              </span>

              {/* Status Pill */}
              {isLiveActive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--spruce-soft)] px-2.5 py-0.5 text-[11.5px] font-semibold text-[var(--spruce)] tabular-nums">
                  <span className="h-2 w-2 rounded-full bg-[var(--spruce)] animate-pulse" />
                  Protected · Active ({blockedQueries} blocked today)
                </span>
              ) : shield?.isProvisioned ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--canvas-subtle)] border border-[var(--hairline)] px-2.5 py-0.5 text-[11.5px] font-medium text-[var(--body)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber)]" />
                  Profile ready to install
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--amber-soft)] px-2.5 py-0.5 text-[11.5px] font-medium text-[var(--amber)]">
                  Draft policy
                </span>
              )}
            </div>

            <h2 className="font-serif-almanac text-[22px] sm:text-[24px] font-semibold text-[var(--ink)]">
              Enforced Network Protection
            </h2>
            <p className="text-[13.5px] text-[var(--body)] leading-relaxed max-w-[58ch]">
              Unlike checklists, this shield blocks inappropriate sites and pauses apps
              directly at the network layer on Wi-Fi and 5G cellular. Zero apps needed on{' '}
              {childName}&apos;s device.
            </p>
          </div>

          {/* 2-Way OS Switcher */}
          <div
            role="group"
            aria-label="Choose child's device OS for DNS shield"
            className="inline-flex items-center rounded-[11px] bg-[var(--canvas-subtle)] border border-[var(--hairline)] p-1 gap-1 self-start sm:self-center shrink-0"
          >
            <button
              type="button"
              aria-pressed={isApple}
              onClick={() => setPlatform(ShieldPlatform.APPLE_IOS)}
              className={cn(
                'inline-flex min-h-[38px] items-center gap-1.5 rounded-[8px] px-3.5 text-[13px] transition-colors cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                isApple
                  ? 'bg-[var(--elevated)] text-[var(--spruce)] font-semibold shadow-xs'
                  : 'text-[var(--body)] font-medium hover:text-[var(--ink)]'
              )}
            >
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>iPhone / iPad</span>
            </button>

            <button
              type="button"
              aria-pressed={!isApple}
              onClick={() => setPlatform(ShieldPlatform.ANDROID)}
              className={cn(
                'inline-flex min-h-[38px] items-center gap-1.5 rounded-[8px] px-3.5 text-[13px] transition-colors cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                !isApple
                  ? 'bg-[var(--elevated)] text-[var(--spruce)] font-semibold shadow-xs'
                  : 'text-[var(--body)] font-medium hover:text-[var(--ink)]'
              )}
            >
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Android</span>
            </button>
          </div>
        </div>

        {isSaving && (
          <div className="flex items-center gap-2 text-[12px] text-[var(--spruce)] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--spruce)] animate-ping" />
            <span>Syncing policy with live network shield...</span>
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* 2. CORE LIVE PROTECTION SWITCHES (4 ROWS)                           */}
      {/* =================================================================== */}
      <div className="divide-y divide-[var(--hairline-soft)] border-b border-[var(--hairline-soft)]">
        {/* Toggle 1: Adult & Explicit Content */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4">
          <div className="space-y-0.5">
            <label
              htmlFor="toggle-adult"
              className="text-[14.5px] font-semibold text-[var(--ink)] block cursor-pointer"
            >
              Adult &amp; Explicit Content Filter
            </label>
            <p className="text-[13px] text-[var(--body)] leading-snug">
              Blocks pornographic websites, dating networks, and gambling domains
              automatically.
            </p>
          </div>
          <button
            id="toggle-adult"
            type="button"
            role="switch"
            aria-checked={shield?.blockAdultContent ?? true}
            onClick={() => toggleCoreSetting('blockAdultContent')}
            className={cn(
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out min-h-[24px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
              (shield?.blockAdultContent ?? true)
                ? 'bg-[var(--spruce)]'
                : 'bg-[#d8d5cd]'
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                (shield?.blockAdultContent ?? true)
                  ? 'translate-x-5'
                  : 'translate-x-0'
              )}
            />
          </button>
        </div>

        {/* Toggle 2: SafeSearch & YouTube Restricted */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4">
          <div className="space-y-0.5">
            <label
              htmlFor="toggle-safesearch"
              className="text-[14.5px] font-semibold text-[var(--ink)] block cursor-pointer"
            >
              Strict SafeSearch &amp; YouTube Restricted Mode
            </label>
            <p className="text-[13px] text-[var(--body)] leading-snug">
              Enforces Google, Bing, DuckDuckGo SafeSearch and locks YouTube comments and
              mature clips.
            </p>
          </div>
          <button
            id="toggle-safesearch"
            type="button"
            role="switch"
            aria-checked={shield?.safeSearch ?? true}
            onClick={() => toggleCoreSetting('safeSearch')}
            className={cn(
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out min-h-[24px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
              (shield?.safeSearch ?? true)
                ? 'bg-[var(--spruce)]'
                : 'bg-[#d8d5cd]'
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                (shield?.safeSearch ?? true)
                  ? 'translate-x-5'
                  : 'translate-x-0'
              )}
            />
          </button>
        </div>

        {/* Toggle 3: Block VPN & Proxy Bypasses */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4">
          <div className="space-y-0.5">
            <label
              htmlFor="toggle-bypass"
              className="text-[14.5px] font-semibold text-[var(--ink)] block cursor-pointer"
            >
              Block VPN &amp; Proxy Bypasses
            </label>
            <p className="text-[13px] text-[var(--body)] leading-snug">
              Blocks commercial VPN services, Tor nodes, and public proxies so family
              rules cannot be bypassed.
            </p>
          </div>
          <button
            id="toggle-bypass"
            type="button"
            role="switch"
            aria-checked={shield?.blockBypass ?? true}
            onClick={() => toggleCoreSetting('blockBypass')}
            className={cn(
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out min-h-[24px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
              (shield?.blockBypass ?? true)
                ? 'bg-[var(--spruce)]'
                : 'bg-[#d8d5cd]'
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                (shield?.blockBypass ?? true)
                  ? 'translate-x-5'
                  : 'translate-x-0'
              )}
            />
          </button>
        </div>

        {/* Toggle 4: Bedtime Internet Pause */}
        <div className="px-5 sm:px-6 py-4 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <label
                htmlFor="toggle-bedtime"
                className="text-[14.5px] font-semibold text-[var(--ink)] flex items-center gap-2 cursor-pointer"
              >
                <Moon className="h-4 w-4 text-[var(--spruce)]" aria-hidden="true" />
                <span>Bedtime Internet Pause</span>
              </label>
              <p className="text-[13px] text-[var(--body)] leading-snug">
                Pauses entertainment and social apps overnight so {childName} falls
                asleep without blue light dopamine loops.
              </p>
            </div>
            <button
              id="toggle-bedtime"
              type="button"
              role="switch"
              aria-checked={shield?.bedtimeEnabled ?? true}
              onClick={() =>
                setBedtimeSchedule(!(shield?.bedtimeEnabled ?? true))
              }
              className={cn(
                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out min-h-[24px]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                (shield?.bedtimeEnabled ?? true)
                  ? 'bg-[var(--spruce)]'
                  : 'bg-[#d8d5cd]'
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                (shield?.bedtimeEnabled ?? true)
                  ? 'translate-x-5'
                  : 'translate-x-0'
              )}
            />
          </button>
        </div>

        {/* Bedtime Enforcement Mode & Hours */}
        {(shield?.bedtimeEnabled ?? true) && (() => {
          const is247Bedtime =
            shield?.bedtimeStart === shield?.bedtimeEnd &&
            shield?.bedtimeStart === '00:00';
          const currentStart = shield?.bedtimeStart ?? '20:30';
          const currentEnd = shield?.bedtimeEnd ?? '06:30';

          return (
            <div className="pt-2 border-t border-[var(--hairline-soft)] space-y-3">
              {/* Mode Selector */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12px] font-medium text-[var(--mute)]">
                  Enforcement Mode:
                </span>
                <div
                  role="radiogroup"
                  aria-label="Bedtime pause schedule mode"
                  className="inline-flex rounded-[8px] bg-[var(--canvas-subtle)] border border-[var(--hairline)] p-0.5 gap-1"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={!is247Bedtime}
                    onClick={() => {
                      const fallbackStart = currentStart === '00:00' ? '20:30' : currentStart;
                      const fallbackEnd = currentEnd === '00:00' ? '06:30' : currentEnd;
                      setBedtimeSchedule(true, fallbackStart, fallbackEnd);
                    }}
                    className={cn(
                      'px-2.5 py-1 text-[11.5px] font-semibold rounded-[6px] transition-all cursor-pointer flex items-center gap-1.5',
                      !is247Bedtime
                        ? 'bg-[var(--elevated)] text-[var(--spruce)] shadow-xs'
                        : 'text-[var(--mute)] hover:text-[var(--ink)]'
                    )}
                  >
                    <Moon className="h-3 w-3" />
                    <span>Scheduled Window</span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={is247Bedtime}
                    onClick={() => {
                      setBedtimeSchedule(true, '00:00', '00:00');
                    }}
                    className={cn(
                      'px-2.5 py-1 text-[11.5px] font-semibold rounded-[6px] transition-all cursor-pointer flex items-center gap-1.5',
                      is247Bedtime
                        ? 'bg-[var(--elevated)] text-[var(--spruce)] shadow-xs'
                        : 'text-[var(--mute)] hover:text-[var(--ink)]'
                    )}
                  >
                    <ShieldAlert className="h-3 w-3" />
                    <span>Block Completely (24/7)</span>
                  </button>
                </div>
              </div>

              {/* If 24/7 block is active */}
              {is247Bedtime ? (
                <div className="rounded-[10px] bg-[var(--spruce-soft)]/60 border border-[var(--spruce)]/20 p-3 text-[12px] text-[var(--spruce)] flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--spruce)]" />
                  <span>
                    <strong>24/7 Block Enforced:</strong> Entertainment and social apps are blocked around the clock with zero daytime recreation window.
                  </span>
                </div>
              ) : (
                /* Scheduled Window Controls */
                <div className="space-y-3 pt-1">
                  {/* Start Time Presets */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-medium text-[var(--mute)]">Pause starts at (Evening):</span>
                      <span className="font-semibold text-[var(--spruce)]">{formatDisplayTime(currentStart)}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {BEDTIME_START_PRESETS.map((preset) => {
                        const isSelected = currentStart === preset.value;
                        return (
                          <button
                            key={preset.value}
                            type="button"
                            onClick={() =>
                              setBedtimeSchedule(
                                true,
                                preset.value,
                                currentEnd === '00:00' ? '06:30' : currentEnd
                              )
                            }
                            className={cn(
                              'min-h-[32px] px-2.5 rounded-[7px] border text-[11.5px] font-semibold transition-colors cursor-pointer',
                              isSelected
                                ? 'border-[var(--spruce)] bg-[var(--spruce-soft)] text-[var(--spruce)]'
                                : 'border-[var(--hairline)] bg-[var(--elevated)] text-[var(--body)] hover:border-[var(--spruce)]'
                            )}
                          >
                            {preset.label}
                          </button>
                        );
                      })}
                      <input
                        type="time"
                        aria-label="Custom pause start time"
                        value={currentStart}
                        onChange={(e) => {
                          if (e.target.value) {
                            setBedtimeSchedule(
                              true,
                              e.target.value,
                              currentEnd === '00:00' ? '06:30' : currentEnd
                            );
                          }
                        }}
                        className="min-h-[32px] px-2 rounded-[7px] border border-[var(--hairline)] bg-[var(--elevated)] text-[11.5px] text-[var(--body)] focus:border-[var(--spruce)] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Resume Time Presets */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-medium text-[var(--mute)]">Internet resumes at (Morning):</span>
                      <span className="font-semibold text-[var(--spruce)]">{formatDisplayTime(currentEnd)}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {BEDTIME_RESUME_PRESETS.map((preset) => {
                        const isSelected = currentEnd === preset.value;
                        return (
                          <button
                            key={preset.value}
                            type="button"
                            onClick={() =>
                              setBedtimeSchedule(
                                true,
                                currentStart === '00:00' ? '20:30' : currentStart,
                                preset.value
                              )
                            }
                            className={cn(
                              'min-h-[32px] px-2.5 rounded-[7px] border text-[11.5px] font-semibold transition-colors cursor-pointer',
                              isSelected
                                ? 'border-[var(--spruce)] bg-[var(--spruce-soft)] text-[var(--spruce)]'
                                : 'border-[var(--hairline)] bg-[var(--elevated)] text-[var(--body)] hover:border-[var(--spruce)]'
                            )}
                          >
                            {preset.label}
                          </button>
                        );
                      })}
                      <input
                        type="time"
                        aria-label="Custom resume time"
                        value={currentEnd}
                        onChange={(e) => {
                          if (e.target.value) {
                            setBedtimeSchedule(
                              true,
                              currentStart === '00:00' ? '20:30' : currentStart,
                              e.target.value
                            );
                          }
                        }}
                        className="min-h-[32px] px-2 rounded-[7px] border border-[var(--hairline)] bg-[var(--elevated)] text-[11.5px] text-[var(--body)] focus:border-[var(--spruce)] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Summary badge */}
                  <div className="text-[11.5px] text-[var(--mute)] bg-[var(--canvas-subtle)] px-2.5 py-1.5 rounded-[7px] border border-[var(--hairline-soft)] inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[var(--spruce)]" />
                    <span>
                      Overnight quiet hours: {formatDisplayTime(currentStart)} to {formatDisplayTime(currentEnd)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>

      {/* =================================================================== */}
      {/* 3. QUICK APP & GAME BLOCKING                                        */}
      {/* =================================================================== */}
      <div className="p-5 sm:p-6 space-y-4 border-b border-[var(--hairline-soft)] bg-[var(--canvas-subtle)]/40">
        <div>
          <h3 className="font-serif-almanac text-[18px] font-semibold text-[var(--ink)]">
            Specific Apps &amp; Games Filtering
          </h3>
          <p className="text-[13px] text-[var(--body)]">
            Tap any app to block it completely (24/7) or pause it only during bedtime.
          </p>
        </div>

        {/* 24/7 Blocked Apps Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[12px] font-medium text-[var(--mute)]">
            <span>Block Completely (24/7):</span>
            <span>{shield?.blockedServices?.length ?? 0} blocked</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {SHIELD_SERVICE_CATALOG.map((svc) => {
              const isBlocked = Boolean(
                shield?.blockedServices?.includes(svc.id)
              );
              return (
                <button
                  key={`blocked-${svc.id}`}
                  type="button"
                  aria-pressed={isBlocked}
                  onClick={() => toggleBlockedService(svc.id)}
                  className={cn(
                    'inline-flex min-h-[40px] items-center gap-1.5 rounded-[9px] border px-3 text-[13px] font-semibold transition-all cursor-pointer',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                    isBlocked
                      ? 'border-[var(--spruce)] bg-[var(--spruce)] text-white shadow-xs'
                      : 'border-[var(--hairline)] bg-[var(--elevated)] text-[var(--body)] hover:border-[var(--spruce)] hover:text-[var(--ink)]'
                  )}
                >
                  {isBlocked ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden="true" />
                  ) : null}
                  <span>{svc.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overnight Bedtime Paused Apps Grid */}
        {(shield?.bedtimeEnabled ?? true) && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[12px] font-medium text-[var(--mute)]">
              <span>Pause at Bedtime Only:</span>
              <span>{shield?.bedtimeServices?.length ?? 0} paused at night</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {SHIELD_SERVICE_CATALOG.map((svc) => {
                const isBlocked247 = Boolean(
                  shield?.blockedServices?.includes(svc.id)
                );
                const isBedtime = Boolean(
                  shield?.bedtimeServices?.includes(svc.id)
                );
                if (isBlocked247) return null; // already blocked 24/7

                return (
                  <button
                    key={`bedtime-${svc.id}`}
                    type="button"
                    aria-pressed={isBedtime}
                    onClick={() => toggleBedtimeService(svc.id)}
                    className={cn(
                      'inline-flex min-h-[40px] items-center gap-1.5 rounded-[9px] border px-3 text-[13px] font-semibold transition-all cursor-pointer',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                      isBedtime
                        ? 'border-[var(--amber-border)] bg-[var(--amber-soft)] text-[var(--amber)] shadow-xs'
                        : 'border-[var(--hairline)] bg-[var(--elevated)] text-[var(--body)] hover:border-[var(--amber)] hover:text-[var(--ink)]'
                    )}
                  >
                    {isBedtime ? (
                      <Moon className="h-3.5 w-3.5 text-[var(--amber)]" aria-hidden="true" />
                    ) : null}
                    <span>{svc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* 4. INSTALL ON CHILD'S DEVICE PANEL (OS-ADAPTIVE)                    */}
      {/* =================================================================== */}
      <div className="p-5 sm:p-6 space-y-4 bg-[var(--elevated)]">
        <div>
          <h3 className="font-serif-almanac text-[19px] font-semibold text-[var(--ink)]">
            {isApple
              ? `Install Profile on ${childName}'s iPhone or iPad`
              : `Configure Private DNS on ${childName}'s Android`}
          </h3>
          <p className="text-[13px] text-[var(--body)]">
            Follow the 2 simple steps below. It takes under 30 seconds and requires no
            app download.
          </p>
        </div>

        {isApple ? (
          /* iOS Profile Download & QR Steps */
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => downloadProfile(childName)}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] bg-[var(--spruce)] hover:bg-[var(--spruce-hover)] px-5 text-[14px] font-semibold text-white transition-colors cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.75} aria-hidden="true" />
                    <span>Profile Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span>Download Protection Profile</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowQrModal(!showQrModal)}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] border border-[var(--hairline)] bg-[var(--elevated)] hover:border-[var(--spruce)] px-4 text-[13.5px] font-semibold text-[var(--ink)] transition-colors cursor-pointer"
              >
                <QrCode className="h-4 w-4 text-[var(--spruce)]" aria-hidden="true" />
                <span>{showQrModal ? 'Hide QR Code' : 'Scan with iPhone Camera'}</span>
              </button>
            </div>

            {/* QR Code Expandable Box */}
            {showQrModal && (
              <div className="rounded-[14px] border border-[var(--hairline)] bg-[var(--canvas-subtle)] p-5 text-center space-y-3 max-w-sm">
                <p className="text-[13px] font-medium text-[var(--body)]">
                  Scan this code with the Camera app on {childName}&apos;s iPhone:
                </p>
                <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-[12px] bg-white p-3 border border-[var(--hairline)] shadow-xs">
                  <QRCodeSVG
                    value={
                      shield?.appleProfileDownloadUrl ||
                      `https://alongside.care/shield/${childId}`
                    }
                    size={168}
                    level="M"
                    includeMargin={false}
                    aria-label={`Enrollment QR Code for ${childName}`}
                  />
                </div>
                <p className="text-[11.5px] text-[var(--mute)]">
                  Points to: {shield?.dohUrl || 'https://dns.nextdns.io/...'}
                </p>
              </div>
            )}

            {/* 3 Step Instruction Guide */}
            <ol className="rounded-[12px] border border-[var(--hairline-soft)] bg-[var(--canvas-subtle)] p-4 text-[13px] text-[var(--body)] space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[var(--spruce)] shrink-0">1.</span>
                <span>
                  Tap <strong>Download Protection Profile</strong> above (or scan the QR
                  code with the iPhone camera).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[var(--spruce)] shrink-0">2.</span>
                <span>
                  On the iPhone, open <strong>Settings → Profile Downloaded</strong> (near
                  the top).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[var(--spruce)] shrink-0">3.</span>
                <span>
                  Tap <strong>Install</strong> and enter your parent passcode. Shield is
                  now active globally on Wi-Fi and 5G cellular.
                </span>
              </li>
            </ol>
          </div>
        ) : (
          /* Android Private DNS Copy Box & Steps */
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[12px] font-medium text-[var(--body)]">
                {childName}&apos;s Dedicated Private DNS Hostname:
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-lg">
                <input
                  type="text"
                  readOnly
                  value={shield?.dotHostname || 'Connecting live shield...'}
                  className="flex-1 min-h-[44px] rounded-[10px] border border-[var(--hairline)] bg-[var(--canvas-subtle)] px-3.5 font-mono text-[13.5px] text-[var(--ink)] select-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]"
                />
                <button
                  type="button"
                  onClick={copyAndroidHostname}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-[var(--spruce)] hover:bg-[var(--spruce-hover)] px-4 text-[13.5px] font-semibold text-white transition-colors cursor-pointer shrink-0"
                >
                  {copiedHostname ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2.75} aria-hidden="true" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy Hostname</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3 Step Instruction Guide */}
            <ol className="rounded-[12px] border border-[var(--hairline-soft)] bg-[var(--canvas-subtle)] p-4 text-[13px] text-[var(--body)] space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[var(--spruce)] shrink-0">1.</span>
                <span>
                  On {childName}&apos;s phone, open{' '}
                  <strong>Settings → Network &amp; internet → Private DNS</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[var(--spruce)] shrink-0">2.</span>
                <span>
                  Select <strong>Private DNS provider hostname</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[var(--spruce)] shrink-0">3.</span>
                <span>
                  Paste the copied hostname above and tap <strong>Save</strong>. Shield is
                  now active across all apps, games, Wi-Fi, and mobile data.
                </span>
              </li>
            </ol>
          </div>
        )}

        {/* Collapsible Home Wi-Fi & Consoles Card */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowRouterHelp(!showRouterHelp)}
            className="flex items-center gap-2 text-[13px] font-semibold text-[var(--spruce)] hover:underline cursor-pointer"
          >
            <Wifi className="h-4 w-4" aria-hidden="true" />
            <span>
              Also protect Nintendo Switch, PS5, Xbox &amp; Smart TVs on Home Wi-Fi
            </span>
            {showRouterHelp ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>

          {showRouterHelp && (
            <div className="mt-3 rounded-[12px] border border-[var(--hairline)] bg-[var(--canvas-subtle)] p-4 text-[13px] text-[var(--body)] space-y-2">
              <p>
                To enforce these same filters on gaming consoles or tablets at home, set
                your Wi-Fi router&apos;s DNS servers to:
              </p>
              <div className="flex flex-wrap gap-3 font-mono font-bold text-[var(--ink)] text-[13.5px]">
                <span className="rounded-[6px] border border-[var(--hairline)] bg-white px-2.5 py-1">
                  45.90.28.0
                </span>
                <span className="rounded-[6px] border border-[var(--hairline)] bg-white px-2.5 py-1">
                  45.90.30.0
                </span>
              </div>
              <p className="text-[12px] text-[var(--mute)]">
                Every device connected to your home Wi-Fi will automatically share{' '}
                {childName}&apos;s protective bedtime and adult content filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 5. PRIVACY GUARANTEE FOOTER                                         */}
      {/* =================================================================== */}
      <div className="px-5 sm:px-6 py-3.5 bg-[var(--canvas-subtle)] border-t border-[var(--hairline-soft)] flex items-center gap-2.5 text-[12px] text-[var(--mute)]">
        <Info className="h-4 w-4 text-[var(--spruce)] shrink-0" aria-hidden="true" />
        <p>
          Alongside never tracks, logs, or stores browsing history or personal messages.
          Status only verifies that family network protection is online.
        </p>
      </div>
    </section>
  );
}
