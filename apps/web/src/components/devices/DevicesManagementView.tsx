'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Check,
  Plus,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import { ShieldPlatform } from '@alongside/shared';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { ChildOnboardingModal } from '@/components/children/ChildOnboardingModal';
import { Button } from '@/components/ui/Button';
import { LiveDnsShieldCard } from './LiveDnsShieldCard';
import {
  DEVICE_PLATFORMS,
  getCalibratedControlSteps,
  getExtraAddonPacks,
  getRecommendedCurfew,
  getRecommendedDailyCap,
  type ControlGoalId,
  type ExtraAddonPack,
} from '@/lib/parentalControlsCatalog';
import { cn } from '@/lib/utils';

export { getRecommendedCurfew };

export interface DevicesManagementViewProps {
  initialTab?: string;
  child?: ChildDTO;
  children?: ChildDTO[];
}

type PrimaryOsId = 'apple_ios' | 'android_family_link';

const ALL_OS_GOALS: ControlGoalId[] = [
  'tamper_lock',
  'adult_content',
  'strangers_dms',
  'app_approvals',
  'time_limits',
  'bedtime_downtime',
];

const GOAL_SHORT_TAGS: Record<ControlGoalId, string> = {
  tamper_lock: 'Anti-bypass',
  adult_content: 'Safe web',
  strangers_dms: 'Strangers',
  app_approvals: 'Approvals',
  time_limits: 'Daily cap',
  bedtime_downtime: 'Bedtime',
};

function getChecklistStorageKey(childId: string): string {
  return `alongside_os_controls_v1_${childId}`;
}

function getOsStorageKey(childId: string): string {
  return `alongside_child_os_v1_${childId}`;
}

function getReadinessVerdict(score: number) {
  if (score >= 85) {
    return {
      label: 'Ready with OS controls',
      summary: 'Strong everyday habits. Ready for a starter phone with built-in OS controls on.',
      tone: 'spruce' as const,
    };
  }
  if (score >= 75) {
    return {
      label: 'Almost ready (use strict limits)',
      summary: 'Solid routines overall. Turn on app approvals, contacts lock, and bedtime downtime below.',
      tone: 'spruce' as const,
    };
  }
  if (score >= 50) {
    return {
      label: 'Try a starter watch first',
      summary: 'Habits are still growing. A call-only watch or shared tablet is safer than a smartphone right now.',
      tone: 'amber' as const,
    };
  }
  return {
    label: 'Hold off on a personal phone',
    summary: 'Keep screens shared for now while locking down tablets, YouTube, and consoles below.',
    tone: 'amber' as const,
  };
}

export function DevicesManagementView({
  initialTab,
  child: propChild,
  children: propChildren,
}: DevicesManagementViewProps) {
  const { children: storeChildren, activeChildId } = useChildContextStore();
  const [onboardingOpen, setOnboardingOpen] = React.useState(false);

  const children =
    propChildren && propChildren.length > 0
      ? propChildren
      : storeChildren && storeChildren.length > 0
        ? storeChildren
        : [];

  const activeChild =
    propChild ||
    selectActiveChild({ children, activeChildId }) ||
    (children.length > 0 ? children[0] : null);

  const activeAge = activeChild?.age ?? 10;
  const isToddler = activeAge <= 3;

  const [selectedOs, setSelectedOs] = React.useState<PrimaryOsId>('apple_ios');
  const [completedStepIds, setCompletedStepIds] = React.useState<Record<string, boolean>>({});
  const [openStepId, setOpenStepId] = React.useState<string | null>(null);
  const [activeAddons, setActiveAddons] = React.useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = React.useState<'step2' | 'step3'>('step2');

  // Load saved checklist & OS choice per child
  React.useEffect(() => {
    setOpenStepId(null);
    setActiveAddons({});

    if (!activeChild?.id || typeof window === 'undefined') {
      setCompletedStepIds({});
      return;
    }

    try {
      const rawChecks = window.localStorage.getItem(getChecklistStorageKey(activeChild.id));
      if (rawChecks) {
        const parsed = JSON.parse(rawChecks) as Record<string, boolean>;
        setCompletedStepIds(parsed && typeof parsed === 'object' ? parsed : {});
      } else {
        setCompletedStepIds({});
      }

      const savedOs = window.localStorage.getItem(getOsStorageKey(activeChild.id));
      if (savedOs === 'apple_ios' || savedOs === 'android_family_link') {
        setSelectedOs(savedOs);
      }
    } catch {
      setCompletedStepIds({});
    }
  }, [activeChild?.id]);

  const handleSelectOs = (os: PrimaryOsId) => {
    setSelectedOs(os);
    setOpenStepId(null);
    if (activeChild?.id && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(getOsStorageKey(activeChild.id), os);
      } catch {
        // Ignore storage write errors
      }
    }
  };

  const toggleStepDone = (stepId: string) => {
    setCompletedStepIds((prev) => {
      const next = { ...prev, [stepId]: !prev[stepId] };
      if (activeChild?.id && typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(
            getChecklistStorageKey(activeChild.id),
            JSON.stringify(next)
          );
        } catch {
          // Ignore storage write errors
        }
      }
      return next;
    });
  };

  const toggleAddon = (addonId: ExtraAddonPack['id']) => {
    setActiveAddons((prev) => ({ ...prev, [addonId]: !prev[addonId] }));
  };

  const osMeta =
    DEVICE_PLATFORMS.find((p) => p.id === selectedOs) ?? DEVICE_PLATFORMS[0]!;
  const osSteps = React.useMemo(
    () => getCalibratedControlSteps(selectedOs, ALL_OS_GOALS, activeAge),
    [selectedOs, activeAge]
  );
  const addonPacks = React.useMemo(() => getExtraAddonPacks(activeAge), [activeAge]);

  const recommendedCurfew = getRecommendedCurfew(activeAge);
  const recommendedDailyCap = getRecommendedDailyCap(activeAge);

  const completedOsCount = osSteps.filter((s) => Boolean(completedStepIds[s.id])).length;

  // Default to expanding the first incomplete step (only 1 row open at a time)
  const effectiveOpenStepId = React.useMemo(() => {
    if (openStepId === '__none__') return null;
    if (openStepId && osSteps.some((s) => s.id === openStepId)) return openStepId;
    const firstUnchecked = osSteps.find((s) => !completedStepIds[s.id]);
    return firstUnchecked?.id ?? osSteps[0]?.id ?? null;
  }, [openStepId, osSteps, completedStepIds]);

  const readinessScore = activeChild?.latestAssessmentScore ?? null;
  const readinessVerdict =
    readinessScore !== null ? getReadinessVerdict(readinessScore) : null;

  if (!activeChild) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--spruce-soft)] text-[var(--spruce)]">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="font-serif-almanac text-2xl sm:text-3xl font-semibold text-[var(--ink)]">
          Add your child to set up device safety
        </h1>
        <p className="text-sm text-[var(--body)] max-w-md mx-auto leading-relaxed">
          We tailor the phone readiness check and Apple Screen Time or Google Family Link
          controls to your child&apos;s exact age.
        </p>
        <div className="pt-2">
          <Button
            variant="forest"
            onClick={() => setOnboardingOpen(true)}
            className="min-h-[46px] gap-2 px-6 rounded-[8px]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Add first child profile</span>
          </Button>
        </div>
        <ChildOnboardingModal
          open={onboardingOpen}
          onOpenChange={setOnboardingOpen}
          onSuccess={(newChild) => {
            setOnboardingOpen(false);
            useChildContextStore.getState().setChildren([newChild]);
            useChildContextStore.getState().setActiveChild(newChild.id);
          }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1140px] space-y-7 text-[var(--ink)]">
      {/* =================================================================== */}
      {/* TODDLER VIEW (AGES 0-3)                                             */}
      {/* =================================================================== */}
      {isToddler ? (
        <div className="space-y-6">
          <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
            <div className="space-y-1">
              <h1 className="font-serif-almanac text-[28px] sm:text-[34px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--ink)]">
                {activeChild.name}&apos;s Screen-Free Sanctuary
              </h1>
              <p className="text-[14.5px] text-[var(--body)]">
                Personal devices are not recommended under age 4. Protect calm adult routines first.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--elevated)] px-3.5 py-1.5 text-[13px] text-[var(--body)] tabular-nums self-start sm:self-center shrink-0">
              <span className="font-semibold text-[var(--spruce)]">{activeChild.name}</span>
              <span className="text-[var(--hairline)]" aria-hidden="true">
                ·
              </span>
              <span>Age {activeAge}</span>
            </div>
          </header>

          <section className="rounded-[18px] border border-[var(--amber-border)] bg-[var(--amber-soft)] p-6 sm:p-7 space-y-2.5">
            <span className="text-[13px] font-semibold text-[var(--amber)]">
              Ages 0-3 guidance
            </span>
            <h2 className="font-serif-almanac text-[24px] font-semibold text-[var(--ink)]">
              No personal devices yet: protect the home environment
            </h2>
            <p className="text-[14.5px] leading-relaxed text-[var(--body)] max-w-[60ch]">
              Under age 4, children learn best from real-world movement and face-to-face talk.
              Instead of device setup for {activeChild.name}, focus on three simple adult habits:
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Zero background TV',
                body: 'Keeping TVs off during play boosts spoken word exchange by up to 40% during peak speech growth.',
              },
              {
                title: 'Video chat counts as connection',
                body: 'Interactive FaceTime or video calls with grandparents are the one AAP-recommended screen exception under age 2.',
              },
              {
                title: '7:30 PM screen-free wind-down',
                body: 'Keep bedrooms completely screen-free after dinner with board books, soft lighting, and predictable bedtime cues.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[14px] border border-[var(--hairline)] bg-[var(--elevated)] p-5 space-y-2"
              >
                <h3 className="font-serif-almanac text-[19px] font-semibold text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-[var(--body)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ================================================================= */
        /* AGES 4-18: V4.1.1 BOTANICAL FROSTED CANOPY & 2-TAB SPLIT          */
        /* ================================================================= */
        <div className="space-y-6">
          {/* =============================================================== */}
          {/* FULL-WIDTH OBSIDIAN CANOPY + EMBEDDED STEP 1 READINESS          */}
          {/* =============================================================== */}
          <section
            aria-label="Device Road Header and Readiness Check"
            className="rounded-[24px] bg-gradient-to-br from-[#0B1F16] via-[#123324] to-[#0E271C] text-[#F5F2EA] p-6 sm:p-8 shadow-xl border border-white/10 space-y-5"
          >
            {/* Top Canopy Bar: Device Tag, Silk Ribbon & 2-Way OS Switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-[#6EC89B]/15 text-[#8EE2B8] border border-[#6EC89B]/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8EE2B8] animate-pulse" />
                    <span>Protected · Network Shield Active</span>
                  </span>
                  <span className="font-mono text-[11.5px] text-white/65">
                    {selectedOs === 'apple_ios'
                      ? `${activeChild.name}'s iPhone / iPad`
                      : `${activeChild.name}'s Android`}{' '}
                    · Zero Surveillance
                  </span>
                </div>
                <h1 className="font-serif-almanac text-[28px] sm:text-[34px] font-semibold text-white tracking-[-0.02em] leading-tight">
                  {activeChild.name}&apos;s Device Roadmap
                </h1>
              </div>

              {/* Silk Ribbon Flow + Dark 2-Way OS Switcher */}
              <div className="flex flex-wrap items-center gap-3 self-start md:self-center">
                {/* Flowing Silk Shield Ribbon */}
                <div
                  className="hidden sm:flex h-[38px] w-[184px] items-center overflow-hidden rounded-full border border-[#6EC89B]/25 bg-white/[0.06] px-1"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 380 38"
                    width="380"
                    height="38"
                    className="animate-ribbon-slide shrink-0"
                  >
                    <line
                      x1="0"
                      y1="19"
                      x2="380"
                      y2="19"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="0.75"
                    />
                    <path
                      d="M0 19 Q 24 5, 48 19 T 96 19 T 144 19 T 192 19 T 240 19 T 288 19 T 336 19 T 384 19"
                      fill="none"
                      stroke="#6EC89B"
                      strokeWidth="2"
                      opacity="0.9"
                    />
                    <path
                      d="M0 19 Q 32 32, 64 19 T 128 19 T 192 19 T 256 19 T 320 19 T 384 19"
                      fill="none"
                      stroke="#8EE2B8"
                      strokeWidth="1.35"
                      opacity="0.75"
                    />
                  </svg>
                </div>

                {/* 2-Way OS Switcher */}
                <div
                  role="group"
                  aria-label="Choose child device OS"
                  className="inline-flex rounded-[11px] bg-white/[0.08] border border-white/15 p-1 gap-1"
                >
                  {(
                    [
                      { id: 'apple_ios', label: 'iPhone / iPad' },
                      { id: 'android_family_link', label: 'Android' },
                    ] as const
                  ).map((opt) => {
                    const active = selectedOs === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => handleSelectOs(opt.id)}
                        className={cn(
                          'inline-flex min-h-[34px] items-center gap-1.5 rounded-[8px] px-3 text-[12px] transition-colors cursor-pointer',
                          active
                            ? 'bg-[#FAF9F5] text-[#0B1F16] font-semibold shadow-xs'
                            : 'text-white/75 hover:text-white font-medium'
                        )}
                      >
                        <Smartphone className="h-3 w-3" aria-hidden="true" />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Embedded Step 1: Phone Readiness Check Card */}
            <div
              id="readiness-step"
              className="rounded-[16px] bg-white/[0.07] border border-white/15 backdrop-blur-md p-4 sm:p-5"
            >
              {readinessScore !== null && readinessVerdict ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Circular Score Ring Gauge */}
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                      <svg viewBox="0 0 64 64" className="h-14 w-14 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          fill="none"
                          stroke="rgba(255,255,255,0.15)"
                          strokeWidth="5"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          fill="none"
                          stroke="#7DE0AE"
                          strokeWidth="5"
                          strokeDasharray="163"
                          strokeDashoffset={163 - (163 * readinessScore) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <span className="font-serif-almanac text-[20px] font-semibold leading-none">
                          {readinessScore}
                        </span>
                        <span className="text-[9px] opacity-75 font-mono">/100</span>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#8EE2B8] block">
                        Step 1 · Phone Readiness Check
                      </span>
                      <h2 className="font-serif-almanac text-[21px] sm:text-[23px] font-semibold text-white leading-snug">
                        {readinessVerdict.label}
                      </h2>
                      <p className="text-[13px] text-white/75 leading-relaxed max-w-[56ch]">
                        {readinessVerdict.summary}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/children/${activeChild.id}/readiness`}
                    className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-[10px] bg-white/10 border border-white/20 hover:bg-white/20 px-4 text-[13px] font-semibold text-white transition-colors shrink-0 self-start sm:self-center"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Retake assessment</span>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#E8A64E]/15 border border-[#E8A64E]/30 text-[#F5C276] font-serif-almanac text-[20px] font-bold">
                      1
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#F5C276] block">
                        Step 1 · Phone Readiness Check
                      </span>
                      <h2 className="font-serif-almanac text-[21px] sm:text-[23px] font-semibold text-white leading-snug">
                        Is {activeChild.name} ready for a phone yet?
                      </h2>
                      <p className="text-[13px] text-white/75 leading-relaxed max-w-[54ch]">
                        Answer 10 everyday questions in 2 minutes across routines, sleep, and online
                        safety to get a clear 0 to 100 score.
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/children/${activeChild.id}/readiness`}
                    className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-[10px] bg-[#FAF9F5] hover:bg-white px-5 text-[13px] font-semibold text-[#0B1F16] transition-colors shrink-0 self-start sm:self-center"
                  >
                    <span>Start readiness check</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* =============================================================== */}
          {/* 2-TAB SWITCHER (ONLY STEP 2 & STEP 3 REMAIN)                    */}
          {/* =============================================================== */}
          <nav
            role="tablist"
            aria-label="Device Configuration Steps"
            className="flex gap-6 border-b border-[rgba(20,61,43,0.12)] overflow-x-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'step2'}
              onClick={() => setActiveTab('step2')}
              className={cn(
                'pb-3 pt-1 text-[14px] font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer',
                activeTab === 'step2'
                  ? 'border-[var(--spruce)] text-[var(--spruce)]'
                  : 'border-transparent text-[var(--mute)] hover:text-[var(--ink)]'
              )}
            >
              Step 2 · Live Network Shield &amp; Install
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'step3'}
              onClick={() => setActiveTab('step3')}
              className={cn(
                'pb-3 pt-1 text-[14px] font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer',
                activeTab === 'step3'
                  ? 'border-[var(--spruce)] text-[var(--spruce)]'
                  : 'border-transparent text-[var(--mute)] hover:text-[var(--ink)]'
              )}
            >
              Step 3 · {selectedOs === 'apple_ios' ? 'Apple Screen Time' : 'Google Family Link'} ({completedOsCount}/{osSteps.length} active)
            </button>
          </nav>

          {/* =============================================================== */}
          {/* TAB 1: STEP 2 · LIVE NETWORK SHIELD, NIGHT BRIDGE & INSTALL     */}
          {/* =============================================================== */}
          <div
            role="tabpanel"
            aria-label="Step 2: Live Network Shield & Install"
            className={activeTab === 'step2' ? 'block' : 'hidden'}
          >
            <LiveDnsShieldCard
              childId={activeChild.id}
              childName={activeChild.name}
              childAge={activeAge}
              initialPlatform={
                selectedOs === 'apple_ios'
                  ? ShieldPlatform.APPLE_IOS
                  : ShieldPlatform.ANDROID
              }
              selectedOs={selectedOs}
              onSelectOs={handleSelectOs}
            />
          </div>

          {/* =============================================================== */}
          {/* TAB 2: STEP 3 · BUILT-IN DEVICE CONTROLS & GO FURTHER ADD-ONS   */}
          {/* =============================================================== */}
          <div
            role="tabpanel"
            aria-label="Step 3: Built-In OS Controls"
            className={cn('space-y-6', activeTab === 'step3' ? 'block' : 'hidden')}
          >
            {/* Step 3: OS Controls Accordion */}
            <section
              aria-label="Step 3: Built-In OS Parental Controls"
              className="rounded-[20px] border border-[var(--hairline)] bg-[var(--elevated)] overflow-hidden shadow-sm"
            >
              <div className="p-5 sm:px-6 sm:py-5 border-b border-[var(--hairline-soft)] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[var(--spruce)]">
                        Step 3 · Device Passcode &amp; Built-In Controls
                      </span>
                      <span className="text-[12px] text-[var(--mute)] tabular-nums">
                        · {completedOsCount}/{osSteps.length} active
                      </span>
                    </div>
                    <h2 className="font-serif-almanac text-[22px] sm:text-[24px] font-semibold text-[var(--ink)]">
                      {selectedOs === 'apple_ios' ? 'Apple Screen Time' : 'Google Family Link'}
                    </h2>
                  </div>

                  {/* 2-Way OS Choice */}
                  <div
                    role="group"
                    aria-label="Choose child device OS"
                    className="inline-flex items-center rounded-[11px] bg-[var(--canvas-subtle)] border border-[var(--hairline)] p-1 gap-1 self-start sm:self-center"
                  >
                    {(
                      [
                        { id: 'apple_ios', label: 'iPhone / iPad' },
                        { id: 'android_family_link', label: 'Android' },
                      ] as const
                    ).map((opt) => {
                      const active = selectedOs === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => handleSelectOs(opt.id)}
                          className={cn(
                            'inline-flex min-h-[38px] items-center gap-1.5 rounded-[8px] px-3.5 text-[13px] transition-colors cursor-pointer',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                            active
                              ? 'bg-[var(--elevated)] text-[var(--spruce)] font-semibold shadow-xs'
                              : 'text-[var(--body)] font-medium hover:text-[var(--ink)]'
                          )}
                        >
                          <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Age Calibration + Mixed-OS Note */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[12.5px] text-[var(--mute)]">
                  <span className="tabular-nums">
                    Calibrated for age {activeAge}: Bedtime {recommendedCurfew.time12} · Cap{' '}
                    {recommendedDailyCap}
                  </span>
                  {osMeta.mixedOsTip && (
                    <span className="text-[12px] text-[var(--mute)]">{osMeta.mixedOsTip}</span>
                  )}
                </div>
              </div>

              {/* 1-At-A-Time Accordion Rows */}
              <div className="divide-y divide-[var(--hairline-soft)]">
                {osSteps.map((step, idx) => {
                  const isDone = Boolean(completedStepIds[step.id]);
                  const isOpen = effectiveOpenStepId === step.id;
                  const shortTag = GOAL_SHORT_TAGS[step.goalId];

                  return (
                    <div
                      key={step.id}
                      className={cn(
                        'transition-colors',
                        isDone && 'bg-[var(--spruce-soft)]/35'
                      )}
                    >
                      <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-2.5">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {/* 44x44 Checkbox */}
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={isDone}
                            aria-label={`Mark "${step.title}" as configured`}
                            onClick={() => toggleStepDone(step.id)}
                            className="flex h-11 w-11 -ml-2 shrink-0 items-center justify-center rounded-[10px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]"
                          >
                            <span
                              className={cn(
                                'flex h-5 w-5 items-center justify-center rounded-[6px] border transition-colors',
                                isDone
                                  ? 'border-[var(--spruce)] bg-[var(--spruce)] text-white'
                                  : 'border-[#c5c3b8] bg-white hover:border-[var(--spruce)]'
                              )}
                            >
                              {isDone && (
                                <Check className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden="true" />
                              )}
                            </span>
                          </button>

                          {/* Expand/Collapse Row Button */}
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() =>
                              setOpenStepId(isOpen ? '__none__' : step.id)
                            }
                            className="flex-1 min-w-0 min-h-[44px] flex items-center justify-between gap-3 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)] rounded-[8px] px-1"
                          >
                            <span
                              className={cn(
                                'text-[14.5px] font-semibold leading-snug',
                                isDone
                                  ? 'line-through text-[var(--mute)]'
                                  : 'text-[var(--ink)]'
                              )}
                            >
                              <span className="text-[var(--mute)] font-medium mr-1.5 tabular-nums">
                                {idx + 1}.
                              </span>
                              {step.title}
                            </span>

                            <span className="inline-flex items-center gap-2 shrink-0">
                              <span className="hidden sm:inline text-[12px] text-[var(--mute)]">
                                {shortTag}
                              </span>
                              {isOpen ? (
                                <ChevronUp
                                  className="h-4 w-4 text-[var(--mute)]"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDown
                                  className="h-4 w-4 text-[var(--mute)]"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Expanded Single-Step Instructions */}
                      {isOpen && (
                        <div className="px-5 sm:pl-[62px] sm:pr-6 pb-5 pt-1 space-y-3">
                          <div
                            aria-label="Device settings path"
                            className="flex flex-wrap items-center gap-1.5 text-[12px]"
                          >
                            {step.menuPath.map((crumb, cIdx) => (
                              <React.Fragment key={`${step.id}-${cIdx}`}>
                                <span className="rounded-[6px] border border-[var(--hairline)] bg-[var(--canvas)] px-2.5 py-1 font-medium text-[var(--ink)]">
                                  {crumb}
                                </span>
                                {cIdx < step.menuPath.length - 1 && (
                                  <span className="text-[var(--mute)]" aria-hidden="true">
                                    →
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          <div className="rounded-[10px] border border-[var(--spruce-border)] bg-[var(--spruce-soft)] px-4 py-3 text-[13.5px] leading-[1.5] text-[var(--ink)]">
                            <strong className="font-semibold text-[var(--spruce)]">
                              For age {activeAge}:{' '}
                            </strong>
                            {step.recommendedSetting}
                          </div>

                          <p className="text-[12.5px] leading-relaxed text-[var(--body)]">
                            {step.whyItMatters}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Optional Apps, Games & Home Wi-Fi Section */}
            <section
              aria-label="Optional apps, games, and home Wi-Fi"
              className="rounded-[20px] border border-[var(--hairline)] bg-[#F3EFE6] p-5 sm:p-6 space-y-4 shadow-sm"
            >
              <div className="space-y-1">
                <span className="block text-[11.5px] font-bold uppercase tracking-[0.08em] text-[var(--spruce)]">
                  Optional · Go Further
                </span>
                <h2 className="font-serif-almanac text-[21px] sm:text-[22px] font-semibold text-[var(--ink)]">
                  Apps, games &amp; home Wi-Fi
                </h2>
                <p className="text-[13.5px] text-[var(--body)]">
                  OS controls do not reach inside apps or consoles. Tap any that {activeChild.name}{' '}
                  uses:
                </p>
              </div>

              {/* Add-on Chips */}
              <div
                role="group"
                aria-label="Select optional apps or home Wi-Fi"
                className="flex flex-wrap gap-2"
              >
                {addonPacks.map((pack) => {
                  const isSelected = Boolean(activeAddons[pack.id]);
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleAddon(pack.id)}
                      className={cn(
                        'inline-flex min-h-[42px] items-center gap-2 rounded-[10px] border px-3.5 py-2 text-[13px] transition-colors cursor-pointer',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]',
                        isSelected
                          ? 'border-[var(--spruce)] bg-[var(--spruce)] text-white font-semibold'
                          : 'border-[var(--hairline)] bg-[var(--elevated)] text-[var(--ink)] font-medium hover:border-[var(--spruce)]'
                      )}
                    >
                      <span>{pack.label}</span>
                      <span
                        className={cn(
                          'text-[11.5px]',
                          isSelected ? 'text-white/80' : 'text-[var(--mute)]'
                        )}
                      >
                        · {pack.shortTag}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Revealed Add-on Cards */}
              {addonPacks.some((pack) => activeAddons[pack.id]) && (
                <div className="space-y-3 pt-1">
                  {addonPacks
                    .filter((pack) => activeAddons[pack.id])
                    .map((pack) => (
                      <div
                        key={pack.id}
                        className="rounded-[14px] border border-[var(--hairline)] bg-[var(--elevated)] overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-[var(--hairline-soft)] flex items-center justify-between gap-2">
                          <span className="text-[13.5px] font-semibold text-[var(--spruce)]">
                            {pack.label} setup
                          </span>
                          <span className="text-[12px] text-[var(--mute)] tabular-nums">
                            {pack.steps.filter((s) => completedStepIds[s.id]).length}/
                            {pack.steps.length} active
                          </span>
                        </div>

                        <div className="divide-y divide-[var(--hairline-soft)]">
                          {pack.steps.map((st) => {
                            const isDone = Boolean(completedStepIds[st.id]);
                            return (
                              <div
                                key={st.id}
                                className={cn(
                                  'px-4 py-3.5 flex items-start gap-2.5',
                                  isDone && 'bg-[var(--spruce-soft)]/35'
                                )}
                              >
                                <button
                                  type="button"
                                  role="checkbox"
                                  aria-checked={isDone}
                                  aria-label={`Mark "${st.title}" as configured`}
                                  onClick={() => toggleStepDone(st.id)}
                                  className="flex h-11 w-11 -ml-2 -mt-2 shrink-0 items-center justify-center rounded-[10px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]"
                                >
                                  <span
                                    className={cn(
                                      'flex h-5 w-5 items-center justify-center rounded-[6px] border transition-colors',
                                      isDone
                                        ? 'border-[var(--spruce)] bg-[var(--spruce)] text-white'
                                        : 'border-[#c5c3b8] bg-white hover:border-[var(--spruce)]'
                                    )}
                                  >
                                    {isDone && (
                                      <Check
                                        className="h-3.5 w-3.5"
                                        strokeWidth={2.75}
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </button>

                                <div className="space-y-2 min-w-0 flex-1">
                                  <h3
                                    className={cn(
                                      'text-[14px] font-semibold leading-snug',
                                      isDone
                                        ? 'line-through text-[var(--mute)]'
                                        : 'text-[var(--ink)]'
                                    )}
                                  >
                                    {st.title}
                                  </h3>

                                  <div className="flex flex-wrap items-center gap-1.5 text-[11.5px]">
                                    {st.menuPath.map((crumb, cIdx) => (
                                      <React.Fragment key={`${st.id}-${cIdx}`}>
                                        <span className="rounded-[6px] border border-[var(--hairline)] bg-[var(--canvas)] px-2 py-0.5 font-medium text-[var(--ink)]">
                                          {crumb}
                                        </span>
                                        {cIdx < st.menuPath.length - 1 && (
                                          <span className="text-[var(--mute)]" aria-hidden="true">
                                            →
                                          </span>
                                        )}
                                      </React.Fragment>
                                    ))}
                                  </div>

                                  <p className="text-[13px] leading-relaxed text-[var(--body)]">
                                    {st.recommendedSetting}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
