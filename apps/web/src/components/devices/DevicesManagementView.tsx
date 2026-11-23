'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Check,
  Plus,
  Compass,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Info,
  Clock,
} from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { ChildOnboardingModal } from '@/components/children/ChildOnboardingModal';
import { Button } from '@/components/ui/Button';
import {
  CONTROL_GOALS,
  DEVICE_PLATFORMS,
  AGE_GUARDRAIL_LADDER,
  getDefaultGoalsForAge,
  getCalibratedControlSteps,
  getRecommendedCurfew,
  getRecommendedDailyCap,
  type ControlGoalId,
  type DevicePlatformId,
} from '@/lib/parentalControlsCatalog';
import { cn } from '@/lib/utils';

export { getRecommendedCurfew };

export interface DevicesManagementViewProps {
  initialTab?: string;
  child?: ChildDTO;
  children?: ChildDTO[];
}

type HubSection = 'controls' | 'readiness';

function getChecklistStorageKey(childId: string): string {
  return `alongside_os_controls_v1_${childId}`;
}

function getReadinessVerdict(score: number) {
  if (score >= 85) {
    return {
      label: 'Ready with OS guardrails',
      summary:
        'Strong everyday habits and safety instincts. Ready for a starter phone with built-in OS controls turned on.',
      tone: 'spruce' as const,
    };
  }
  if (score >= 75) {
    return {
      label: 'Almost ready (use strict limits)',
      summary:
        'Solid baseline with a few spots still developing. Start with tight daily app limits, Ask to Buy, and bedtime downtime.',
      tone: 'spruce' as const,
    };
  }
  if (score >= 50) {
    return {
      label: 'Try a bridge device first',
      summary:
        'Impulse control or online safety habits are still warming up. A GPS smartwatch or call-only starter device is safer than a smartphone right now.',
      tone: 'amber' as const,
    };
  }
  return {
    label: 'Hold off on a personal phone',
    summary:
      'Keep screens shared and supervised for now while locking down tablets, YouTube, and gaming consoles with built-in OS controls.',
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

  const [activeSection, setActiveSection] = React.useState<HubSection>(
    initialTab === 'readiness' ? 'readiness' : 'controls'
  );
  const [selectedPlatform, setSelectedPlatform] =
    React.useState<DevicePlatformId>('apple_ios');
  const [selectedGoals, setSelectedGoals] = React.useState<ControlGoalId[]>(() =>
    getDefaultGoalsForAge(activeAge)
  );
  const [completedStepIds, setCompletedStepIds] = React.useState<Record<string, boolean>>({});
  const [showCalmTip, setShowCalmTip] = React.useState(false);

  // Recalibrate recommended goals and load saved checklist when active child changes
  React.useEffect(() => {
    setSelectedGoals(getDefaultGoalsForAge(activeAge));
    setShowCalmTip(false);

    if (!activeChild?.id || typeof window === 'undefined') {
      setCompletedStepIds({});
      return;
    }

    try {
      const raw = window.localStorage.getItem(getChecklistStorageKey(activeChild.id));
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, boolean>;
        setCompletedStepIds(parsed && typeof parsed === 'object' ? parsed : {});
      } else {
        setCompletedStepIds({});
      }
    } catch {
      setCompletedStepIds({});
    }
  }, [activeChild?.id, activeAge]);

  const toggleGoal = (goalId: ControlGoalId) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goalId)) {
        if (prev.length === 1) return prev; // Keep at least one control selected
        return prev.filter((id) => id !== goalId);
      }
      return [...prev, goalId];
    });
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
          // Ignore storage quota errors
        }
      }
      return next;
    });
  };

  const recommendedCurfew = React.useMemo(
    () => getRecommendedCurfew(activeAge),
    [activeAge]
  );
  const recommendedDailyCap = React.useMemo(
    () => getRecommendedDailyCap(activeAge),
    [activeAge]
  );

  const activePlatformMeta =
    DEVICE_PLATFORMS.find((p) => p.id === selectedPlatform) ?? DEVICE_PLATFORMS[0]!;

  const blueprintSteps = React.useMemo(
    () => getCalibratedControlSteps(selectedPlatform, selectedGoals, activeAge),
    [selectedPlatform, selectedGoals, activeAge]
  );

  const completedInBlueprint = blueprintSteps.filter(
    (s) => Boolean(completedStepIds[s.id])
  ).length;

  const hasAssessment =
    activeChild?.latestAssessmentScore !== null &&
    activeChild?.latestAssessmentScore !== undefined;
  const score =
    hasAssessment && typeof activeChild?.latestAssessmentScore === 'number'
      ? activeChild.latestAssessmentScore
      : null;

  if (!activeChild || children.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--spruce-soft)] text-[var(--spruce)]">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="font-serif-almanac text-2xl sm:text-3xl font-semibold text-[var(--ink)]">
          Add your child to configure device safety
        </h1>
        <p className="text-sm text-[var(--body)] max-w-md mx-auto leading-relaxed">
          We tailor phone readiness checks and Apple, Android, Roblox, and YouTube parental
          control checklists to your child&apos;s exact age.
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
    <div className="mx-auto max-w-5xl space-y-7 text-[var(--ink)]">
      {/* Editorial Hub Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--hairline)] pb-6">
        <div className="space-y-1.5">
          <span className="text-[13px] font-semibold text-[var(--spruce)]">
            {isToddler
              ? `Early screen environment · Age ${activeAge}`
              : `Device safety & parental controls · Age ${activeAge}`}
          </span>
          <h1 className="font-serif-almanac text-[28px] sm:text-[36px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--ink)]">
            {isToddler
              ? `${activeChild.name}'s Screen-Free Sanctuary`
              : `${activeChild.name}'s Device Safety Hub`}
          </h1>
          <p className="text-[15px] text-[var(--body)] max-w-[58ch] leading-relaxed">
            {isToddler
              ? 'Personal devices are not recommended under age 4. Focus on calm adult routines and lock down any shared family tablet.'
              : 'Two separate tools: lock down the devices your child already uses with built-in OS controls, or check if they are ready for a first phone.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--elevated)] px-3.5 py-1.5 text-[13px] text-[var(--body)] self-start sm:self-center tabular-nums">
          <span className="font-semibold text-[var(--spruce)]">{activeChild.name}</span>
          <span className="text-[var(--hairline)]" aria-hidden="true">
            ·
          </span>
          <span>Age {activeAge}</span>
        </div>
      </header>

      {/* =================================================================== */}
      {/* TODDLER VIEW (AGES 0–3)                                             */}
      {/* =================================================================== */}
      {isToddler ? (
        <div className="space-y-6">
          <section className="rounded-[18px] border border-[var(--amber-border)] bg-[var(--amber-soft)] p-6 sm:p-7 space-y-2.5">
            <span className="text-[13px] font-semibold text-[var(--amber)]">
              Ages 0–3 guidance
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
        /* AGES 4–18: TWO DISTINCT, INDEPENDENT TOOLS                        */
        /* ================================================================= */
        <div className="space-y-7">
          {/* Two Clear Tool Cards (Independent Switcher) */}
          <div
            role="tablist"
            aria-label="Device safety tools"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* TOOL 1: PARENTAL CONTROLS SETUP */}
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === 'controls'}
              onClick={() => setActiveSection('controls')}
              className={cn(
                'text-left rounded-[16px] border p-5 sm:p-6 transition-colors cursor-pointer space-y-2',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)] focus-visible:ring-offset-2',
                activeSection === 'controls'
                  ? 'border-[var(--spruce)] bg-[var(--elevated)]'
                  : 'border-[var(--hairline)] bg-[var(--canvas)] hover:border-[var(--spruce-border)]'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--spruce)]">
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  <span>Parental Controls Setup</span>
                </span>
                <span className="text-[12px] font-medium text-[var(--mute)] tabular-nums">
                  {completedInBlueprint}/{blueprintSteps.length} on {activePlatformMeta.name}
                </span>
              </div>
              <h2 className="font-serif-almanac text-[21px] font-semibold text-[var(--ink)]">
                Lock down {activeChild.name}&apos;s devices &amp; apps
              </h2>
              <p className="text-[13.5px] text-[var(--body)] leading-relaxed">
                Pick their OS and what you want to block to get exact tap-by-tap Apple, Android,
                Roblox, YouTube, and Safe DNS settings.
              </p>
            </button>

            {/* TOOL 2: FIRST-PHONE READINESS CHECK */}
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === 'readiness'}
              onClick={() => setActiveSection('readiness')}
              className={cn(
                'text-left rounded-[16px] border p-5 sm:p-6 transition-colors cursor-pointer space-y-2',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)] focus-visible:ring-offset-2',
                activeSection === 'readiness'
                  ? 'border-[var(--spruce)] bg-[var(--elevated)]'
                  : 'border-[var(--hairline)] bg-[var(--canvas)] hover:border-[var(--spruce-border)]'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--amber)]">
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  <span>Phone Readiness Check</span>
                </span>
                <span className="text-[12px] font-semibold text-[var(--ink)] tabular-nums">
                  {score !== null ? `${score}/100` : '2-min check'}
                </span>
              </div>
              <h2 className="font-serif-almanac text-[21px] font-semibold text-[var(--ink)]">
                Is {activeChild.name} ready for a phone?
              </h2>
              <p className="text-[13.5px] text-[var(--body)] leading-relaxed">
                Separate 10-question check-in to decide if they&apos;re ready for a personal phone,
                a starter watch, or shared screens only.
              </p>
            </button>
          </div>

          {/* =============================================================== */}
          {/* PANEL A: PARENTAL CONTROLS SETUP BUILDER (BY DEVICE/OS & GOAL)  */}
          {/* =============================================================== */}
          {activeSection === 'controls' && (
            <div className="space-y-6">
              {/* Step A & B Configuration Panel */}
              <section className="overflow-hidden rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)]">
                {/* 1. Choose Device / OS */}
                <div className="border-b border-[var(--hairline-soft)] bg-[var(--trigger-bg)] p-5 sm:p-7 space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-serif-almanac text-[21px] font-semibold text-[var(--ink)]">
                      1. Pick the device or app to lock down
                    </h3>
                    <span className="text-[12.5px] text-[var(--mute)]">
                      Uses free built-in OS controls, no extra paid blocker apps required
                    </span>
                  </div>

                  <div
                    role="group"
                    aria-label="Choose device or platform"
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5"
                  >
                    {DEVICE_PLATFORMS.map((platform) => {
                      const isSelected = platform.id === selectedPlatform;
                      const stepsForPlatform = getCalibratedControlSteps(
                        platform.id,
                        selectedGoals,
                        activeAge
                      );
                      const doneCount = stepsForPlatform.filter((s) =>
                        Boolean(completedStepIds[s.id])
                      ).length;

                      return (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => setSelectedPlatform(platform.id)}
                          aria-pressed={isSelected}
                          className={cn(
                            'rounded-[12px] border px-3.5 py-3 text-left transition-colors min-h-[76px] flex flex-col justify-between cursor-pointer',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)] focus-visible:ring-offset-2',
                            isSelected
                              ? 'border-[var(--spruce)] bg-[var(--spruce)] text-white'
                              : 'border-[var(--hairline)] bg-[var(--elevated)] text-[var(--ink)] hover:border-[var(--spruce-border)]'
                          )}
                        >
                          <span className="text-[14px] font-semibold leading-snug">
                            {platform.name}
                          </span>
                          <span
                            className={cn(
                              'text-[11.5px] mt-1 tabular-nums',
                              isSelected ? 'text-white/80' : 'text-[var(--mute)]'
                            )}
                          >
                            {doneCount}/{stepsForPlatform.length} set · ~{platform.setupMinutes}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Choose What You Want to Control */}
                <div className="p-5 sm:p-7 space-y-3.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-serif-almanac text-[21px] font-semibold text-[var(--ink)]">
                      2. Choose what you want to control
                    </h3>
                    <span className="text-[12.5px] text-[var(--mute)]">
                      Pre-selected for age {activeAge} · Tap to customize
                    </span>
                  </div>

                  <div
                    role="group"
                    aria-label="Choose protections to configure"
                    className="flex flex-wrap gap-2"
                  >
                    {CONTROL_GOALS.map((goal) => {
                      const active = selectedGoals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => toggleGoal(goal.id)}
                          aria-pressed={active}
                          className={cn(
                            'inline-flex min-h-[42px] items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors cursor-pointer',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)] focus-visible:ring-offset-2',
                            active
                              ? 'border-[var(--spruce)] bg-[var(--spruce-soft)] text-[var(--spruce)] font-semibold'
                              : 'border-[var(--hairline)] bg-[var(--canvas)] text-[var(--body)] hover:border-[var(--spruce-border)]'
                          )}
                        >
                          <span
                            className={cn(
                              'flex h-4 w-4 items-center justify-center rounded-full border text-[10px]',
                              active
                                ? 'border-[var(--spruce)] bg-[var(--spruce)] text-white'
                                : 'border-[var(--hairline)] bg-white'
                            )}
                            aria-hidden="true"
                          >
                            {active && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                          </span>
                          <span>{goal.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* 3. Generated Step-by-Step OS Setup Blueprint */}
              <section className="overflow-hidden rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)]">
                <div className="border-b border-[var(--hairline-soft)] px-5 py-5 sm:px-7 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[12.5px] font-semibold text-[var(--spruce)]">
                      {activePlatformMeta.osLabel}
                    </span>
                    <h3 className="font-serif-almanac text-[24px] font-semibold text-[var(--ink)]">
                      {activePlatformMeta.name} blueprint for {activeChild.name} (Age {activeAge})
                    </h3>
                    <p className="text-[13.5px] text-[var(--body)]">
                      {activePlatformMeta.tagline}
                    </p>
                    {activePlatformMeta.mixedOsTip && (
                      <p className="text-[12.5px] text-[var(--mute)] leading-snug pt-0.5">
                        {activePlatformMeta.mixedOsTip}
                      </p>
                    )}
                  </div>

                  {/* Age Quick Defaults Pill */}
                  <div className="shrink-0 rounded-[12px] border border-[var(--hairline)] bg-[var(--canvas)] px-4 py-3 text-[12.5px] space-y-1 self-start sm:self-center">
                    <div className="flex items-center gap-1.5 font-semibold text-[var(--ink)] tabular-nums">
                      <Clock className="h-3.5 w-3.5 text-[var(--spruce)]" aria-hidden="true" />
                      <span>Bedtime: {recommendedCurfew.time12}</span>
                    </div>
                    <div className="text-[var(--body)]">Daily cap: {recommendedDailyCap}</div>
                  </div>
                </div>

                {/* Progress Strip */}
                <div className="border-b border-[var(--hairline-soft)] bg-[var(--canvas-subtle)] px-5 py-3 sm:px-7 flex items-center justify-between gap-4">
                  <span className="text-[13px] font-medium text-[var(--ink)] tabular-nums">
                    {completedInBlueprint} of {blueprintSteps.length} selected protections turned on
                  </span>
                  <div
                    className="h-2 w-36 sm:w-48 overflow-hidden rounded-full bg-[var(--hairline)]"
                    role="progressbar"
                    aria-valuenow={
                      blueprintSteps.length > 0
                        ? Math.round((completedInBlueprint / blueprintSteps.length) * 100)
                        : 0
                    }
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Parental controls setup progress"
                  >
                    <div
                      className="h-full rounded-full bg-[var(--spruce)] transition-all duration-300"
                      style={{
                        width: `${
                          blueprintSteps.length > 0
                            ? Math.round((completedInBlueprint / blueprintSteps.length) * 100)
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Blueprint Steps List */}
                <div className="divide-y divide-[var(--hairline-soft)]">
                  {blueprintSteps.length === 0 ? (
                    <div className="p-8 text-center text-sm text-[var(--body)]">
                      No dedicated steps for those exact checkboxes on {activePlatformMeta.name}.
                      Select additional protections above or pair with iPhone / Android OS controls.
                    </div>
                  ) : (
                    blueprintSteps.map((step, idx) => {
                      const isDone = Boolean(completedStepIds[step.id]);
                      return (
                        <div
                          key={step.id}
                          className={cn(
                            'p-5 sm:px-7 sm:py-6 transition-colors',
                            isDone && 'bg-[var(--spruce-soft)]/35'
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={isDone}
                              aria-label={`Mark "${step.title}" as configured`}
                              onClick={() => toggleStepDone(step.id)}
                              className="mt-0.5 flex h-11 w-11 -ml-2 shrink-0 items-center justify-center rounded-[10px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]"
                            >
                              <span
                                className={cn(
                                  'flex h-6 w-6 items-center justify-center rounded-[6px] border transition-colors',
                                  isDone
                                    ? 'border-[var(--spruce)] bg-[var(--spruce)] text-white'
                                    : 'border-[#c5c3b8] bg-white hover:border-[var(--spruce)]'
                                )}
                              >
                                {isDone && (
                                  <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                                )}
                              </span>
                            </button>

                            <div className="flex-1 min-w-0 space-y-2.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[12px] font-semibold text-[var(--amber)]">
                                  {step.protectsAgainst}
                                </span>
                                <span className="text-[12px] text-[var(--mute)] tabular-nums">
                                  · Step {idx + 1}
                                </span>
                                {isDone && (
                                  <span className="text-[12px] font-semibold text-[var(--spruce)]">
                                    · Configured
                                  </span>
                                )}
                              </div>

                              <h4
                                className={cn(
                                  'text-[16px] font-semibold leading-snug text-[var(--ink)]',
                                  isDone && 'line-through text-[var(--mute)]'
                                )}
                              >
                                {step.title}
                              </h4>

                              {/* Tap-by-Tap Menu Path Breadcrumb */}
                              <div
                                aria-label="Device settings path"
                                className="flex flex-wrap items-center gap-1.5 text-[12.5px]"
                              >
                                {step.menuPath.map((segment, segIdx) => (
                                  <React.Fragment key={segment}>
                                    <span className="rounded-[6px] border border-[var(--hairline)] bg-[var(--canvas)] px-2.5 py-1 font-medium text-[var(--ink)]">
                                      {segment}
                                    </span>
                                    {segIdx < step.menuPath.length - 1 && (
                                      <span className="text-[var(--mute)]" aria-hidden="true">
                                        →
                                      </span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>

                              {/* Age-Calibrated Recommended Setting */}
                              <div className="rounded-[10px] border border-[var(--spruce-border)] bg-[var(--spruce-soft)] px-4 py-3 text-[13.5px] leading-[1.55] text-[var(--ink)]">
                                <strong className="font-semibold text-[var(--spruce)]">
                                  For age {activeAge}:{' '}
                                </strong>
                                {step.recommendedSetting}
                              </div>

                              <p className="text-[13px] leading-relaxed text-[var(--body)]">
                                {step.whyItMatters}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Quiet On-Demand Parent Framing Note */}
                <div className="border-t border-[var(--hairline-soft)] px-5 py-4 sm:px-7 bg-[var(--canvas)]">
                  <button
                    type="button"
                    onClick={() => setShowCalmTip((prev) => !prev)}
                    aria-expanded={showCalmTip}
                    className="inline-flex min-h-[40px] items-center gap-1.5 text-[13px] font-medium text-[var(--mute)] hover:text-[var(--spruce)] cursor-pointer"
                  >
                    <Info className="h-4 w-4" aria-hidden="true" />
                    <span>How to explain these controls calmly to {activeChild.name}</span>
                    {showCalmTip ? (
                      <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </button>
                  {showCalmTip && (
                    <p className="mt-2 rounded-[10px] bg-[var(--canvas-subtle)] px-4 py-3 text-[13.5px] leading-relaxed text-[var(--body)] almanac-rise-in">
                      {activePlatformMeta.calmNote}
                    </p>
                  )}
                </div>
              </section>

              {/* Compact Age Progression Reference */}
              <section className="rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)] p-5 sm:p-7 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif-almanac text-[21px] font-semibold text-[var(--ink)]">
                    How parental controls evolve from ages 4 to 18
                  </h3>
                  <p className="text-[13.5px] text-[var(--body)]">
                    Keep hard safety filters active while gradually opening independence as habits mature.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {AGE_GUARDRAIL_LADDER.map((stage) => {
                    const isCurrentStage =
                      (stage.ageRange === 'Ages 4–9' && activeAge <= 9) ||
                      (stage.ageRange === 'Ages 10–12' && activeAge >= 10 && activeAge <= 12) ||
                      (stage.ageRange === 'Ages 13–15' && activeAge >= 13 && activeAge <= 15) ||
                      (stage.ageRange === 'Ages 16–18' && activeAge >= 16);

                    return (
                      <div
                        key={stage.ageRange}
                        className={cn(
                          'rounded-[12px] border p-4 space-y-2 text-[13px]',
                          isCurrentStage
                            ? 'border-[var(--spruce)] bg-[var(--spruce-soft)]/50'
                            : 'border-[var(--hairline)] bg-[var(--canvas)]'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-[var(--spruce)] tabular-nums">
                            {stage.ageRange}
                          </span>
                          {isCurrentStage && (
                            <span className="text-[11px] font-semibold text-[var(--spruce)]">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-[var(--ink)]">{stage.label}</div>
                        <p className="text-[12.5px] leading-relaxed text-[var(--body)]">
                          <strong className="text-[var(--ink)]">Keep locked:</strong>{' '}
                          {stage.keepLocked}
                        </p>
                        <p className="text-[12.5px] leading-relaxed text-[var(--body)]">
                          <strong className="text-[var(--ink)]">Open next:</strong>{' '}
                          {stage.graduallyOpen}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* =============================================================== */}
          {/* PANEL B: STANDALONE PHONE READINESS CHECK                       */}
          {/* =============================================================== */}
          {activeSection === 'readiness' && (
            <section className="overflow-hidden rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)]">
              <div className="border-b border-[var(--hairline-soft)] bg-[var(--trigger-bg)] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-[54ch]">
                  <span className="text-[13px] font-semibold text-[var(--amber)]">
                    Standalone decision tool · ~2 minutes
                  </span>
                  <h2 className="font-serif-almanac text-[26px] sm:text-[32px] font-semibold leading-[1.15] text-[var(--ink)]">
                    Is {activeChild.name} ready for a phone yet?
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[var(--body)]">
                    Answer 10 real-life questions across everyday routines, online red flags,
                    and emotional reset to get an objective 0–100 readiness verdict.
                  </p>
                </div>

                {score !== null && (
                  <div className="shrink-0 rounded-[14px] border border-[var(--hairline)] bg-[var(--elevated)] px-6 py-4 text-center">
                    <div className="font-serif-almanac text-[38px] font-semibold leading-none text-[var(--spruce)] tabular-nums">
                      {score}
                    </div>
                    <div className="mt-1 text-[12px] text-[var(--mute)] tabular-nums">
                      out of 100
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {score !== null ? (
                  (() => {
                    const verdict = getReadinessVerdict(score);
                    return (
                      <div
                        className={cn(
                          'rounded-[14px] border p-5 space-y-2',
                          verdict.tone === 'spruce'
                            ? 'border-[var(--spruce-border)] bg-[var(--spruce-soft)]'
                            : 'border-[var(--amber-border)] bg-[var(--amber-soft)]'
                        )}
                      >
                        <div className="text-[15px] font-semibold text-[var(--ink)]">
                          Current verdict: {verdict.label}
                        </div>
                        <p className="text-[14px] leading-relaxed text-[var(--body)]">
                          {verdict.summary}
                        </p>
                      </div>
                    );
                  })()
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        title: 'Everyday rhythms',
                        body: 'Stopping screens for dinner, bedtime sleep habits, and offline interests.',
                      },
                      {
                        title: 'Online instincts',
                        body: 'Spotting game scams, protecting private details, and handling group-chat pressure.',
                      },
                      {
                        title: 'Emotional reset',
                        body: 'Handling gaming losses and coming to you first when something goes wrong.',
                      },
                    ].map((pillar) => (
                      <div
                        key={pillar.title}
                        className="rounded-[12px] border border-[var(--hairline)] bg-[var(--canvas)] p-4 space-y-1"
                      >
                        <h3 className="text-[14px] font-semibold text-[var(--ink)]">
                          {pillar.title}
                        </h3>
                        <p className="text-[13px] leading-relaxed text-[var(--body)]">
                          {pillar.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--hairline-soft)] pt-5">
                  <div className="flex items-center gap-2 text-[13px] text-[var(--mute)]">
                    <Smartphone className="h-4 w-4 text-[var(--spruce)]" aria-hidden="true" />
                    <span>Already have a device? Switch back to Parental Controls Setup anytime.</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveSection('controls')}
                      className="min-h-[44px] rounded-[8px]"
                    >
                      Configure parental controls
                    </Button>
                    <Link href={`/children/${activeChild.id}/readiness`}>
                      <Button variant="forest" className="gap-2 min-h-[44px] rounded-[8px] px-5">
                        <span>
                          {hasAssessment ? 'Retake readiness check' : 'Start readiness check'}
                        </span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
