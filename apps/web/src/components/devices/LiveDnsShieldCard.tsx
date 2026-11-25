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
  selectedOs?: 'apple_ios' | 'android_family_link';
  onSelectOs?: (os: 'apple_ios' | 'android_family_link') => void;
}

const SCHEDULE_START_OPTIONS = [
  { label: '7:00 PM', value: '19:00' },
  { label: '7:30 PM', value: '19:30' },
  { label: '8:00 PM', value: '20:00' },
  { label: '8:30 PM (Recommended)', value: '20:30' },
  { label: '9:00 PM', value: '21:00' },
  { label: '9:30 PM', value: '21:30' },
  { label: '10:00 PM', value: '22:00' },
  { label: '10:30 PM', value: '22:30' },
  { label: '11:00 PM', value: '23:00' },
];

const SCHEDULE_RESUME_OPTIONS = [
  { label: '5:30 AM', value: '05:30' },
  { label: '6:00 AM', value: '06:00' },
  { label: '6:30 AM (Recommended)', value: '06:30' },
  { label: '7:00 AM', value: '07:00' },
  { label: '7:30 AM', value: '07:30' },
  { label: '8:00 AM', value: '08:00' },
  { label: '8:30 AM', value: '08:30' },
  { label: '9:00 AM', value: '09:00' },
];

const APP_VISUAL_META: Record<
  string,
  { mono: string; bg: string; fg: string }
> = {
  tiktok: { mono: 'TT', bg: '#161823', fg: '#FFFFFF' },
  youtube: { mono: 'YT', bg: '#DC2626', fg: '#FFFFFF' },
  roblox: { mono: 'RB', bg: '#1E293B', fg: '#FFFFFF' },
  instagram: { mono: 'IG', bg: '#C026D3', fg: '#FFFFFF' },
  snapchat: { mono: 'SC', bg: '#CA8A04', fg: '#FFFFFF' },
  discord: { mono: 'DC', bg: '#4F46E5', fg: '#FFFFFF' },
  fortnite: { mono: 'FN', bg: '#0369A1', fg: '#FFFFFF' },
  twitch: { mono: 'TW', bg: '#7C3AED', fg: '#FFFFFF' },
};

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

function calculateSleepDuration(startTime: string, endTime: string): string {
  const startParts = (startTime || '20:30').split(':');
  const endParts = (endTime || '06:30').split(':');
  const startH = parseInt(startParts[0] ?? '20', 10);
  const startM = parseInt(startParts[1] ?? '30', 10);
  const endH = parseInt(endParts[0] ?? '6', 10);
  const endM = parseInt(endParts[1] ?? '30', 10);
  if (isNaN(startH) || isNaN(endH)) return '10 hrs quiet sleep';
  const startTotal = startH + (isNaN(startM) ? 0 : startM) / 60;
  const endTotal = endH + (isNaN(endM) ? 0 : endM) / 60;
  const duration = 24 - startTotal + endTotal;
  const displayDuration = duration % 1 === 0 ? duration : duration.toFixed(1);
  return `${displayDuration} hrs quiet sleep`;
}

export function LiveDnsShieldCard({
  childId,
  childName,
  childAge,
  initialPlatform = ShieldPlatform.APPLE_IOS,
  initialShield,
  className,
  selectedOs,
  onSelectOs,
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
    toggleAppService,
    setBedtimeSchedule,
    setEnforcementMode,
    downloadProfile,
    copyAndroidHostname,
  } = useDeviceShield({
    childId,
    childName,
    childAge,
    initialPlatform,
    initialData: initialShield,
  });

  const [showRouterHelp, setShowRouterHelp] = React.useState(false);

  // Sync external selectedOs if provided
  const activePlatform = selectedOs
    ? selectedOs === 'apple_ios'
      ? ShieldPlatform.APPLE_IOS
      : ShieldPlatform.ANDROID
    : shield?.platform ?? initialPlatform;
  const isApple = activePlatform === ShieldPlatform.APPLE_IOS;

  React.useEffect(() => {
    if (selectedOs && onSelectOs) {
      const currentPlatform = selectedOs === 'apple_ios' ? ShieldPlatform.APPLE_IOS : ShieldPlatform.ANDROID;
      if (shield?.platform && shield.platform !== currentPlatform) {
        setPlatform(currentPlatform);
      }
    }
  }, [selectedOs, onSelectOs, setPlatform, shield?.platform]);

  const isLiveActive = Boolean(shield?.health?.isActive);
  const blockedQueries = shield?.health?.blockedQueries24h ?? 0;

  const is247Mode = Boolean(
    shield?.bedtimeEnabled &&
    shield?.bedtimeStart === shield?.bedtimeEnd &&
    shield?.bedtimeStart === '00:00'
  );
  const currentStart = shield?.bedtimeStart ?? '20:30';
  const currentEnd = shield?.bedtimeEnd ?? '06:30';

  const scheduleStartOptions = React.useMemo(() => {
    if (SCHEDULE_START_OPTIONS.some((o) => o.value === currentStart)) {
      return SCHEDULE_START_OPTIONS;
    }
    return [
      ...SCHEDULE_START_OPTIONS,
      { label: formatDisplayTime(currentStart), value: currentStart },
    ].sort((a, b) => a.value.localeCompare(b.value));
  }, [currentStart]);

  const scheduleResumeOptions = React.useMemo(() => {
    if (SCHEDULE_RESUME_OPTIONS.some((o) => o.value === currentEnd)) {
      return SCHEDULE_RESUME_OPTIONS;
    }
    return [
      ...SCHEDULE_RESUME_OPTIONS,
      { label: formatDisplayTime(currentEnd), value: currentEnd },
    ].sort((a, b) => a.value.localeCompare(b.value));
  }, [currentEnd]);

  const restrictedCount =
    (shield?.blockedServices?.length ?? 0) + (shield?.bedtimeServices?.length ?? 0);

  const sleepDurationLabel = React.useMemo(
    () => calculateSleepDuration(currentStart, currentEnd),
    [currentStart, currentEnd]
  );

  const displayClock = React.useMemo(() => {
    if (is247Mode) return '2:15';
    return formatDisplayTime(currentStart).replace(' PM', '').replace(' AM', '');
  }, [is247Mode, currentStart]);

  return (
    <section
      aria-label="Step 2: Live Network Shield & Install"
      className={cn('space-y-6', className)}
    >
      {/* 2-Column Split: Controls on Left, Sticky Live Phone Mirror on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_316px] gap-6 items-start">
        {/* =============================================================== */}
        {/* LEFT COLUMN: CONTROLS, SAND INSTALL FINALE & GUARDRAILS          */}
        {/* =============================================================== */}
        <div className="space-y-5">
          {/* 1. ENFORCEMENT SCHEDULE CARD (NIGHT BRIDGE + APPS) */}
          <div className="rounded-[20px] border border-[rgba(20,61,43,0.14)] bg-white/85 backdrop-blur-md p-5 sm:p-6 shadow-sm space-y-4">
            {/* Header + Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--spruce)] block">
                  Step 2 · Live Network Shield
                </span>
                <h2 className="font-serif-almanac text-[22px] sm:text-[23px] font-semibold text-[var(--ink)]">
                  Enforced Network Protection
                </h2>
                <p className="text-[12.5px] text-[var(--body)] leading-relaxed">
                  {is247Mode
                    ? 'Selected apps stay blocked around the clock across Wi-Fi and 5G cellular.'
                    : `Selected apps pause overnight from ${formatDisplayTime(currentStart)} to ${formatDisplayTime(currentEnd)}.`}
                </p>
              </div>

              {/* Enforcement Mode Segmented Switch */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-[12px] font-semibold text-[var(--ink)]">
                  Enforcement Mode:
                </span>
                <div
                  role="radiogroup"
                  aria-label="Enforcement Mode"
                  className="inline-flex rounded-[10px] bg-[var(--canvas-subtle)] border border-[var(--hairline)] p-1 gap-1 shrink-0"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={!is247Mode}
                    onClick={() => setEnforcementMode('scheduled')}
                    className={cn(
                      'inline-flex min-h-[36px] items-center gap-1.5 rounded-[7px] px-3.5 text-[12.5px] font-semibold transition-all cursor-pointer',
                      !is247Mode
                        ? 'bg-[var(--spruce)] text-white shadow-xs'
                        : 'text-[var(--body)] hover:text-[var(--ink)]'
                    )}
                  >
                    <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Scheduled Window</span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={is247Mode}
                    onClick={() => setEnforcementMode('247')}
                    className={cn(
                      'inline-flex min-h-[36px] items-center gap-1.5 rounded-[7px] px-3.5 text-[12.5px] font-semibold transition-all cursor-pointer',
                      is247Mode
                        ? 'bg-[var(--spruce)] text-white shadow-xs'
                        : 'text-[var(--body)] hover:text-[var(--ink)]'
                    )}
                  >
                    <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Block Completely (24/7)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Unbroken Night Bridge (Visible when Scheduled Window is Active) */}
            {!is247Mode ? (
              <div className="rounded-[16px] bg-gradient-to-br from-[#102B1F] via-[#163E2C] to-[#1D3427] p-4 sm:p-5 text-[#F5F2EA] border border-[#6EC89B]/30 shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3.5 items-center">
                  {/* Evening Pause Time */}
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#8EE2B8]">
                      ☾ PAUSE FROM
                      <span className="sr-only">Pause starts at (Evening):</span>
                    </span>
                    <select
                      aria-label="Pause starts at (Evening):"
                      value={currentStart}
                      onChange={(e) =>
                        setBedtimeSchedule(
                          true,
                          e.target.value,
                          currentEnd === '00:00' ? '06:30' : currentEnd
                        )
                      }
                      className="w-full min-h-[38px] rounded-[10px] border border-white/20 bg-white/10 px-3 font-mono text-[13.5px] font-semibold text-white focus:border-[#8EE2B8] focus:outline-none cursor-pointer"
                    >
                      {scheduleStartOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="bg-[#FAF9F5] text-[#111413]"
                        >
                          {opt.label}
                          {opt.value === '20:30' ? ` · Age ${childAge}` : ''}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Sleep Indicator Center Bridge */}
                  <div className="flex flex-col items-center gap-1 px-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-[2px] rounded-full bg-gradient-to-r from-[#8EE2B8] to-white/20" />
                      <span className="font-mono text-[11px] font-semibold rounded-full px-2.5 py-0.5 bg-[#6EC89B]/15 border border-[#6EC89B]/30 text-[#8EE2B8] whitespace-nowrap">
                        {sleepDurationLabel}
                      </span>
                      <span className="w-6 h-[2px] rounded-full bg-gradient-to-r from-white/20 to-[#E8A64E]" />
                    </div>
                    <span className="text-[10px] text-white/60 text-center">
                      Apps lock overnight · Calls stay open
                    </span>
                  </div>

                  {/* Morning Resume Time */}
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#F5C276]">
                      ☀ RESUME AT
                      <span className="sr-only">Internet resumes at (Morning):</span>
                    </span>
                    <select
                      aria-label="Internet resumes at (Morning):"
                      value={currentEnd}
                      onChange={(e) =>
                        setBedtimeSchedule(
                          true,
                          currentStart === '00:00' ? '20:30' : currentStart,
                          e.target.value
                        )
                      }
                      className="w-full min-h-[38px] rounded-[10px] border border-white/20 bg-white/10 px-3 font-mono text-[13.5px] font-semibold text-white focus:border-[#8EE2B8] focus:outline-none cursor-pointer"
                    >
                      {scheduleResumeOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="bg-[#FAF9F5] text-[#111413]"
                        >
                          {opt.label}
                          {opt.value === '06:30' ? ` · Age ${childAge}` : ''}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            ) : (
              /* Block 24/7 Dark Amber Banner */
              <div className="rounded-[14px] bg-gradient-to-br from-[#241F14] to-[#302614] p-4 text-[#F5E6C8] border border-[#E8A64E]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#F5C276] block">
                    ALL-DAY ENFORCEMENT ACTIVE
                  </span>
                  <p className="text-[13.5px] font-semibold text-white">
                    {restrictedCount} selected apps are blocked 24 hours a day
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setEnforcementMode('scheduled')}
                  className="min-h-[34px] px-3 text-[12px] bg-white/10 border-white/20 text-white hover:bg-white/20 self-start sm:self-auto rounded-[8px]"
                >
                  Switch to Custom Window
                </Button>
              </div>
            )}

            {/* Apps & Games under this rule */}
            <div className="border-t border-[rgba(20,61,43,0.09)] pt-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <strong className="text-[13.5px] font-semibold text-[var(--ink)]">
                  Specific Apps &amp; Games Filtering
                </strong>
                <span className="font-mono text-[11.5px] font-semibold text-[var(--spruce)]">
                  {restrictedCount} active
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {SHIELD_SERVICE_CATALOG.map((svc) => {
                  const isRestricted =
                    Boolean(shield?.blockedServices?.includes(svc.id)) ||
                    Boolean(shield?.bedtimeServices?.includes(svc.id));
                  const visualMeta = APP_VISUAL_META[svc.id] || {
                    mono: svc.label.slice(0, 2).toUpperCase(),
                    bg: '#143D2B',
                    fg: '#FFFFFF',
                  };

                  return (
                    <button
                      key={`app-${svc.id}`}
                      type="button"
                      aria-pressed={isRestricted}
                      onClick={() => toggleAppService(svc.id)}
                      className={cn(
                        'inline-flex min-h-[38px] items-center gap-2 rounded-[10px] border px-3 text-[12.5px] font-semibold transition-all cursor-pointer',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                        isRestricted
                          ? is247Mode
                            ? 'border-[var(--spruce)] bg-[var(--spruce)] text-white shadow-xs'
                            : 'border-[var(--spruce)] bg-[var(--spruce-soft)] text-[var(--spruce)] shadow-xs'
                          : 'border-[var(--hairline)] bg-white text-[var(--body)] hover:border-[var(--spruce)] hover:text-[var(--ink)]'
                      )}
                    >
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-[5px] text-[9.5px] font-bold"
                        style={{
                          backgroundColor: isRestricted
                            ? is247Mode
                              ? 'rgba(255,255,255,0.2)'
                              : 'rgba(20,61,43,0.15)'
                            : visualMeta.bg,
                          color: isRestricted
                            ? is247Mode
                              ? '#FFFFFF'
                              : 'var(--spruce)'
                            : visualMeta.fg,
                        }}
                      >
                        {visualMeta.mono}
                      </span>
                      <span>{svc.label}</span>
                      <span className="text-[10px] opacity-75">
                        {isRestricted ? (is247Mode ? '24/7' : 'Quiet') : 'Open'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {isSaving && (
              <div className="flex items-center gap-2 text-[12px] text-[var(--spruce)] font-medium pt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--spruce)] animate-ping" />
                <span>Syncing policy with live network shield...</span>
              </div>
            )}
          </div>

          {/* 2. 30-SECOND DEVICE INSTALL FINALE CARD (WARM SAND FINISH) */}
          <div className="rounded-[20px] border border-[#d8d2c4] bg-[#F4EFE4] p-5 sm:p-6 shadow-sm space-y-4">
            {isApple ? (
              /* iOS 30s Install Flow */
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-[12px] bg-white p-2 border border-[#d8d2c4] shadow-xs">
                  <QRCodeSVG
                    value={
                      shield?.appleProfileDownloadUrl ||
                      `https://alongside.care/shield/${childId}`
                    }
                    size={72}
                    level="M"
                    includeMargin={false}
                    aria-label={`Enrollment QR Code for ${childName}`}
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif-almanac text-[20px] font-semibold text-[var(--ink)]">
                      Install Profile on {childName}&apos;s iPhone or iPad
                    </h3>
                    <div
                      role="group"
                      aria-label="Choose device platform"
                      className="inline-flex rounded-[8px] bg-white border border-[#d8d2c4] p-0.5 gap-1 text-[11.5px]"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setPlatform(ShieldPlatform.APPLE_IOS);
                          onSelectOs?.('apple_ios');
                        }}
                        className={cn(
                          'px-2.5 py-0.5 rounded-[6px] font-semibold transition-colors cursor-pointer',
                          isApple ? 'bg-[var(--spruce)] text-white' : 'text-[var(--body)] hover:text-[var(--ink)]'
                        )}
                      >
                        iPhone / iPad
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPlatform(ShieldPlatform.ANDROID);
                          onSelectOs?.('android_family_link');
                        }}
                        className={cn(
                          'px-2.5 py-0.5 rounded-[6px] font-semibold transition-colors cursor-pointer',
                          !isApple ? 'bg-[var(--spruce)] text-white' : 'text-[var(--body)] hover:text-[var(--ink)]'
                        )}
                      >
                        Android
                      </button>
                    </div>
                  </div>

                  {/* 3 Step Guide Pills */}
                  <div className="flex flex-wrap gap-1.5 text-[11.5px] text-[var(--body)]">
                    <span className="inline-flex items-center gap-1 rounded-[8px] bg-white/70 border border-[#d8d2c4] px-2.5 py-1">
                      <strong className="text-[var(--spruce)]">1.</strong> Scan QR or download
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-[8px] bg-white/70 border border-[#d8d2c4] px-2.5 py-1">
                      <strong className="text-[var(--spruce)]">2.</strong> Settings → Profile Downloaded
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-[8px] bg-white/70 border border-[#d8d2c4] px-2.5 py-1">
                      <strong className="text-[var(--spruce)]">3.</strong> Tap Install
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => downloadProfile(childName)}
                      className="inline-flex min-h-[38px] items-center gap-2 rounded-[10px] bg-[var(--spruce)] hover:bg-[var(--spruce-hover)] px-4 text-[12.5px] font-semibold text-white transition-colors cursor-pointer"
                    >
                      {downloadSuccess ? (
                        <>
                          <Check className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden="true" />
                          <span>Profile Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Download Protection Profile (.mobileconfig)</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowRouterHelp(!showRouterHelp)}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-[10px] bg-white/90 border border-[var(--hairline)] hover:border-[var(--spruce)] px-3 text-[12px] font-semibold text-[var(--ink)] transition-colors cursor-pointer"
                    >
                      <QrCode className="h-3.5 w-3.5 text-[var(--spruce)]" aria-hidden="true" />
                      <span>Scan with iPhone Camera</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowRouterHelp(!showRouterHelp)}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-[10px] bg-white/90 border border-[var(--hairline)] hover:border-[var(--spruce)] px-3 text-[12px] font-semibold text-[var(--ink)] transition-colors cursor-pointer"
                    >
                      <Wifi className="h-3.5 w-3.5 text-[var(--spruce)]" aria-hidden="true" />
                      <span>Also protect Nintendo Switch, PS5, Xbox &amp; Smart TVs on Home Wi-Fi</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Android 30s Install Flow */
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif-almanac text-[20px] font-semibold text-[var(--ink)]">
                    Configure Private DNS on {childName}&apos;s Android
                  </h3>
                  <div
                    role="group"
                    aria-label="Choose device platform"
                    className="inline-flex rounded-[8px] bg-white border border-[#d8d2c4] p-0.5 gap-1 text-[11.5px]"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setPlatform(ShieldPlatform.APPLE_IOS);
                        onSelectOs?.('apple_ios');
                      }}
                      className={cn(
                        'px-2.5 py-0.5 rounded-[6px] font-semibold transition-colors cursor-pointer',
                        isApple ? 'bg-[var(--spruce)] text-white' : 'text-[var(--body)] hover:text-[var(--ink)]'
                      )}
                    >
                      iPhone / iPad
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPlatform(ShieldPlatform.ANDROID);
                        onSelectOs?.('android_family_link');
                      }}
                      className={cn(
                        'px-2.5 py-0.5 rounded-[6px] font-semibold transition-colors cursor-pointer',
                        !isApple ? 'bg-[var(--spruce)] text-white' : 'text-[var(--body)] hover:text-[var(--ink)]'
                      )}
                    >
                      Android
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[11.5px] text-[var(--body)]">
                  <span className="inline-flex items-center gap-1 rounded-[8px] bg-white/70 border border-[#d8d2c4] px-2.5 py-1">
                    <strong className="text-[var(--spruce)]">1.</strong> Settings → Network &amp; internet → Private DNS
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-[8px] bg-white/70 border border-[#d8d2c4] px-2.5 py-1">
                    <strong className="text-[var(--spruce)]">2.</strong> Select Private DNS provider hostname &amp; Save
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[12px] font-semibold text-[var(--ink)] block">
                    Dedicated Private DNS Hostname:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex-1 min-w-[200px] rounded-[9px] bg-white border border-[#d8d2c4] px-3 py-2 font-mono text-[12.5px] text-[var(--ink)] select-all">
                      {shield?.dotHostname || 'Connecting live shield...'}
                    </div>
                    <button
                      type="button"
                      onClick={copyAndroidHostname}
                      className="inline-flex min-h-[38px] items-center gap-2 rounded-[10px] bg-[var(--spruce)] hover:bg-[var(--spruce-hover)] px-4 text-[12.5px] font-semibold text-white transition-colors cursor-pointer"
                    >
                      {copiedHostname ? (
                        <>
                          <Check className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden="true" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy Hostname</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRouterHelp(!showRouterHelp)}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-[10px] bg-white/90 border border-[var(--hairline)] hover:border-[var(--spruce)] px-3 text-[12px] font-semibold text-[var(--ink)] transition-colors cursor-pointer"
                    >
                      <Wifi className="h-3.5 w-3.5 text-[var(--spruce)]" aria-hidden="true" />
                      <span>Also protect Nintendo Switch, PS5, Xbox &amp; Smart TVs on Home Wi-Fi</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Collapsible Home Wi-Fi & Consoles Drawer */}
            {showRouterHelp && (
              <div className="mt-3 rounded-[12px] border border-[#d8d2c4] bg-white/90 p-4 text-[12.5px] text-[var(--body)] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[var(--ink)]">
                  <Wifi className="h-4 w-4 text-[var(--spruce)]" aria-hidden="true" />
                  <span>Home Wi-Fi &amp; Consoles Setup</span>
                </div>
                <p>
                  To protect Nintendo Switch, PlayStation 5, Xbox, and Smart TVs automatically without installing apps, enter these DNS servers into your home Wi-Fi router settings:
                </p>
                <div className="flex flex-wrap gap-2.5 font-mono font-bold text-[var(--ink)] text-[13px] pt-1">
                  <span className="rounded-[6px] border border-[var(--hairline)] bg-[var(--canvas-subtle)] px-2.5 py-1">
                    45.90.28.0
                  </span>
                  <span className="rounded-[6px] border border-[var(--hairline)] bg-[var(--canvas-subtle)] px-2.5 py-1">
                    45.90.30.0
                  </span>
                </div>
                <p className="text-[11.5px] text-[var(--mute)]">
                  Every device connected to home Wi-Fi automatically inherits {childName}&apos;s protective adult filters and quiet hours.
                </p>
              </div>
            )}
          </div>

          {/* 3. ALWAYS-ON NETWORK GUARDRAILS */}
          <div className="rounded-[20px] border border-[rgba(20,61,43,0.14)] bg-white/85 backdrop-blur-md p-5 sm:p-6 shadow-sm space-y-1">
            <h3 className="font-serif-almanac text-[19px] font-semibold text-[var(--ink)] pb-1">
              Always-On Network Guardrails
            </h3>

            {/* Toggle 1: Adult & Explicit Content */}
            <div className="flex items-center justify-between gap-4 py-3 border-b border-[var(--hairline-soft)]">
              <div className="space-y-0.5">
                <label
                  htmlFor="toggle-adult"
                  className="text-[13.5px] font-semibold text-[var(--ink)] block cursor-pointer"
                >
                  Adult &amp; Explicit Content Filter
                </label>
                <p className="text-[12px] text-[var(--body)] leading-snug">
                  Blocks adult sites, dating apps, and gambling domains across Wi-Fi and 5G cellular.
                </p>
              </div>
              <button
                id="toggle-adult"
                type="button"
                role="switch"
                aria-checked={shield?.blockAdultContent ?? true}
                onClick={() => toggleCoreSetting('blockAdultContent')}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                  (shield?.blockAdultContent ?? true) ? 'bg-[var(--spruce)]' : 'bg-[#d8d5cd]'
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                    (shield?.blockAdultContent ?? true) ? 'translate-x-5' : 'translate-x-0'
                  )}
                />
              </button>
            </div>

            {/* Toggle 2: SafeSearch & YouTube Restricted */}
            <div className="flex items-center justify-between gap-4 py-3 border-b border-[var(--hairline-soft)]">
              <div className="space-y-0.5">
                <label
                  htmlFor="toggle-safesearch"
                  className="text-[13.5px] font-semibold text-[var(--ink)] block cursor-pointer"
                >
                  Strict SafeSearch &amp; YouTube Restricted Mode
                </label>
                <p className="text-[12px] text-[var(--body)] leading-snug">
                  Enforces clean Google, Bing, DuckDuckGo search results and hides mature YouTube videos.
                </p>
              </div>
              <button
                id="toggle-safesearch"
                type="button"
                role="switch"
                aria-checked={shield?.safeSearch ?? true}
                onClick={() => toggleCoreSetting('safeSearch')}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                  (shield?.safeSearch ?? true) ? 'bg-[var(--spruce)]' : 'bg-[#d8d5cd]'
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                    (shield?.safeSearch ?? true) ? 'translate-x-5' : 'translate-x-0'
                  )}
                />
              </button>
            </div>

            {/* Toggle 3: Block VPN & Proxy Bypasses */}
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="space-y-0.5">
                <label
                  htmlFor="toggle-bypass"
                  className="text-[13.5px] font-semibold text-[var(--ink)] block cursor-pointer"
                >
                  Block VPN &amp; Proxy Bypasses
                </label>
                <p className="text-[12px] text-[var(--body)] leading-snug">
                  Prevents commercial VPNs, proxies, and Tor nodes from bypassing your family rules.
                </p>
              </div>
              <button
                id="toggle-bypass"
                type="button"
                role="switch"
                aria-checked={shield?.blockBypass ?? true}
                onClick={() => toggleCoreSetting('blockBypass')}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                  (shield?.blockBypass ?? true) ? 'bg-[var(--spruce)]' : 'bg-[#d8d5cd]'
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                    (shield?.blockBypass ?? true) ? 'translate-x-5' : 'translate-x-0'
                  )}
                />
              </button>
            </div>
          </div>

          {/* 4. ZERO SURVEILLANCE PRIVACY GUARANTEE */}
          <div className="rounded-[14px] bg-[var(--canvas-subtle)] border border-[var(--hairline)] p-4 flex items-center gap-3 text-[12px] text-[var(--mute)]">
            <Info className="h-4 w-4 text-[var(--spruce)] shrink-0" aria-hidden="true" />
            <p>
              Alongside never tracks, logs, or stores browsing history or personal messages. Status only verifies that family network protection is online.
            </p>
          </div>
        </div>

        {/* =============================================================== */}
        {/* RIGHT COLUMN: STICKY LIVE PHONE MIRROR                           */}
        {/* =============================================================== */}
        <aside
          aria-label="Live Child Phone Preview"
          className="sticky top-20 flex flex-col items-center gap-2.5 self-start"
        >
          <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[var(--spruce)]">
            LIVE PREVIEW · {isApple ? `${childName.toUpperCase()}'S IPHONE` : `${childName.toUpperCase()}'S ANDROID`}
          </div>

          {/* Phone Frame */}
          <div className="w-[284px] mx-auto rounded-[40px] p-2.5 bg-gradient-to-br from-[#2D3431] to-[#101412] shadow-2xl ring-1 ring-white/15">
            <div
              className={cn(
                'rounded-[30px] overflow-hidden min-h-[492px] p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300',
                is247Mode
                  ? 'bg-gradient-to-b from-[#161816] via-[#1D221E] to-[#121513] text-[#F4F1E8]'
                  : 'bg-gradient-to-b from-[#0B1E16] via-[#10291E] to-[#141F1A] text-[#F4F1E8]'
              )}
            >
              {/* Phone Notch & Status Header */}
              <div>
                <div className="w-[76px] h-[19px] rounded-full bg-[#090C0B] mx-auto mb-3" />
                <div className="flex items-center justify-between text-[10.5px] font-semibold opacity-75 px-1">
                  <span className="font-mono">{displayClock}</span>
                  <span>{isApple ? 'iOS' : 'Android'} · 5G Shield</span>
                </div>

                {/* State Headline */}
                <div className="text-center mt-3.5 space-y-0.5">
                  <div className="font-serif-almanac text-[24px] font-medium leading-tight">
                    {is247Mode ? '24/7 Shield' : 'Quiet Hours'}
                  </div>
                  <div className="text-[11px] opacity-75">
                    {is247Mode
                      ? `${restrictedCount} apps blocked around the clock`
                      : `Paused ${formatDisplayTime(currentStart)} to ${formatDisplayTime(currentEnd)}`}
                  </div>
                </div>

                {/* Interactive Phone Apps Grid */}
                <div className="grid grid-cols-4 gap-2.5 mt-3.5">
                  {SHIELD_SERVICE_CATALOG.slice(0, 8).map((svc) => {
                    const isRestricted =
                      Boolean(shield?.blockedServices?.includes(svc.id)) ||
                      Boolean(shield?.bedtimeServices?.includes(svc.id));
                    const visualMeta = APP_VISUAL_META[svc.id] || {
                      mono: svc.label.slice(0, 2).toUpperCase(),
                      bg: '#143D2B',
                      fg: '#FFFFFF',
                    };

                    return (
                      <button
                        key={`mirror-${svc.id}`}
                        type="button"
                        onClick={() => toggleAppService(svc.id)}
                        title={`Tap to toggle ${svc.label}`}
                        className="flex flex-col items-center gap-1 cursor-pointer transition-transform active:scale-95"
                      >
                        <div
                          className={cn(
                            'relative flex h-11 w-11 items-center justify-center rounded-[12px] text-[11.5px] font-bold shadow-md transition-all duration-200',
                            isRestricted && 'grayscale opacity-40 scale-95'
                          )}
                          style={{
                            backgroundColor: visualMeta.bg,
                            color: visualMeta.fg,
                          }}
                        >
                          <span>{visualMeta.mono}</span>
                          {isRestricted && (
                            <span
                              className={cn(
                                'absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold border-2 border-[#10291E]',
                                is247Mode
                                  ? 'bg-[#E8A64E] text-[#111111]'
                                  : 'bg-[#6EC89B] text-[#0B1F16]'
                              )}
                            >
                              {is247Mode ? '✕' : '☾'}
                            </span>
                          )}
                        </div>
                        <span className="text-[9.5px] font-medium truncate max-w-[54px] opacity-85">
                          {svc.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Reassurance & Guardrails summary */}
              <div className="space-y-2 pt-3">
                <div className="rounded-[12px] bg-white/10 border border-white/15 p-2 text-[10.5px] leading-tight text-white/90">
                  <strong>Always open:</strong> Mom &amp; Dad Calls, Emergency SOS, Maps, and School Notes.
                </div>
                <div className="font-mono text-[9.5px] opacity-75 flex justify-center gap-2">
                  <span>{(shield?.blockAdultContent ?? true) ? '✓ Adult' : '○ Adult'}</span>
                  <span>{(shield?.safeSearch ?? true) ? '✓ SafeSearch' : '○ SafeSearch'}</span>
                  <span>{(shield?.blockBypass ?? true) ? '✓ Anti-VPN' : '○ Anti-VPN'}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[var(--mute)] text-center max-w-[240px]">
            Tap any app icon on {childName}&apos;s screen to toggle it live.
          </p>
        </aside>
      </div>
    </section>
  );
}
