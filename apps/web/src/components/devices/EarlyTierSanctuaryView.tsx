'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Copy,
  Printer,
} from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import { getDailySensoryActivity } from '@/components/dashboard/BilateralPactStatusCard';
import { cn } from '@/lib/utils';

export type EarlyStageKey = 'infant' | 'toddler' | 'earlyChildhood';

export interface EarlyHabitItem {
  id: string;
  title: string;
  detail: string;
}

export interface EarlyTransitionScript {
  id: string;
  tabLabel: string;
  quote: string;
  why: string;
}

export interface EarlyStageProfile {
  stageKey: EarlyStageKey;
  stageLabel: string;
  ageRangeLabel: string;
  capFigure: string;
  capUnit: string;
  standardTitle: string;
  subtitle: (name: string, age: number) => string;
  noPactNote: (age: number) => string;
  defaultBedtimeMinutes: number;
  bedtimeOptions: number[];
  cutoffLeadMinutes: number;
  bridgeLeadMinutes: number;
  bridgeNote: string;
  habits: EarlyHabitItem[];
  scripts: (name: string) => EarlyTransitionScript[];
}

export interface EveningWindDownSchedule {
  cutoffTime: string;
  bridgeTime: string;
  bedtime: string;
}

function formatDisplayName(rawName?: string | null): string {
  const trimmed = rawName?.trim();
  if (!trimmed) return 'Your child';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/**
 * Formats minutes since midnight into concise 12-hour time (e.g. 1170 -> "7:30 PM").
 */
export function formatMinutes12Hour(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours24 = Math.floor(normalized / 60);
  const mins = normalized % 60;
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${mins.toString().padStart(2, '0')} ${period}`;
}

/**
 * Computes the 3-phase evening screen-off schedule from a target bedtime.
 */
export function computeEveningWindDown(
  bedtimeMinutes: number,
  cutoffLeadMinutes = 45,
  bridgeLeadMinutes = 25
): EveningWindDownSchedule {
  return {
    cutoffTime: formatMinutes12Hour(bedtimeMinutes - cutoffLeadMinutes),
    bridgeTime: formatMinutes12Hour(bedtimeMinutes - bridgeLeadMinutes),
    bedtime: formatMinutes12Hour(bedtimeMinutes),
  };
}

/**
 * Resolves the calibrated early-tier stage profile for ages 0–6.
 */
export function resolveEarlyStageProfile(
  age: number,
  developmentalTier?: string | null
): EarlyStageProfile {
  const tierStr = String(developmentalTier || '');
  const isInfant = age <= 1 || tierStr.includes('TIER_0A');
  const isEarlyChildhood =
    !isInfant &&
    ((age >= 4 && age <= 6) || tierStr.includes('TIER_1_EARLY'));

  if (isInfant) {
    return {
      stageKey: 'infant',
      stageLabel: 'Infancy',
      ageRangeLabel: 'Ages 0–1',
      capFigure: '0m',
      capUnit: 'screen-free',
      standardTitle: 'Family video calls only',
      subtitle: (name) =>
        `Before screens enter ${name}'s world, quiet rooms and face-to-face warmth wire speech and sleep.`,
      noPactNote: () =>
        'Infants learn from your voice and eyes. Your calm room setup does all the work.',
      defaultBedtimeMinutes: 19 * 60, // 7:00 PM
      bedtimeOptions: [18 * 60 + 30, 19 * 60, 19 * 60 + 30, 20 * 60],
      cutoffLeadMinutes: 45,
      bridgeLeadMinutes: 25,
      bridgeNote: 'Dim warm lamp, quiet feeding, slow sway',
      habits: [
        {
          id: 'zero-bg-tv',
          title: 'Zero background TV',
          detail: 'Quiet rooms boost parent-to-baby words by roughly 40% during early speech windows.',
        },
        {
          id: 'live-video-only',
          title: 'Live family video calls only',
          detail: 'FaceTime with grandparents is the one responsive screen interaction recommended under age 2.',
        },
        {
          id: 'phone-face-down',
          title: 'Phones face-down during feeds and play',
          detail: 'Uninterrupted eye contact anchors infant calm and serve-and-return bonding.',
        },
        {
          id: 'amber-nursery',
          title: 'Dim warm nursery after dinner',
          detail: 'Soft evening light protects emerging circadian melatonin rhythms.',
        },
      ],
      scripts: (name) => [
        {
          id: 'overstimulated',
          tabLabel: 'Overstimulated',
          quote: `“You’re safe, ${name}. Let’s dim the room and take slow breaths together right here on my chest.”`,
          why: 'Steady heartbeat and lower light settle an overwhelmed infant nervous system faster than stimulation.',
        },
        {
          id: 'parent-phone',
          tabLabel: 'Parent pause',
          quote: '“Let me set my phone on the counter first. I’m all yours for the next ten minutes.”',
          why: 'Parking your phone out of sight removes constant micro-interruptions during floor play.',
        },
        {
          id: 'bedtime',
          tabLabel: 'Bedtime cue',
          quote: `“Lights are going low, ${name}. Time for our soft song and cozy sleep.”`,
          why: 'Repeating the exact same calm cue each night teaches the body sleep is coming.',
        },
      ],
    };
  }

  if (isEarlyChildhood) {
    return {
      stageKey: 'earlyChildhood',
      stageLabel: 'Early Childhood',
      ageRangeLabel: 'Ages 4–6',
      capFigure: '60m',
      capUnit: 'max / day',
      standardTitle: 'Shared living-room screens, co-viewed',
      subtitle: (name) =>
        `Predictable windows, shared family screens, and calm handoffs, long before ${name} needs a personal phone.`,
      noPactNote: (a) =>
        `At age ${a}, kids thrive on simple house routines and parent-managed settings rather than personal phones.`,
      defaultBedtimeMinutes: 20 * 60, // 8:00 PM
      bedtimeOptions: [19 * 60 + 30, 20 * 60, 20 * 60 + 30, 21 * 60],
      cutoffLeadMinutes: 45,
      bridgeLeadMinutes: 25,
      bridgeNote: 'Board book, drawing, or audio story',
      habits: [
        {
          id: 'living-room-only',
          title: 'Shared living-room screens only',
          detail: 'Keep tablets and TVs out of bedrooms so sleep spaces stay calm and screen-free.',
        },
        {
          id: 'set-stop-before-play',
          title: 'Agree on the stop point before pressing play',
          detail: '“Two episodes, then we turn it off” prevents mid-show negotiations.',
        },
        {
          id: 'turn-off-autoplay',
          title: 'Autoplay off, slow shows on',
          detail: 'End-of-episode pauses give young brains a clean natural exit.',
        },
        {
          id: 'cutoff-before-bed',
          title: 'Screens off 45 minutes before bed',
          detail: 'Protects evening melatonin so falling asleep feels peaceful instead of wired.',
        },
      ],
      scripts: (name) => [
        {
          id: 'warning',
          tabLabel: '5 min warning',
          quote: `“Five minutes left, ${name}. When this episode ends, do you want to tap the power button or pick our snack?”`,
          why: 'A clear heads-up plus two real choices satisfies growing independence without a power struggle.',
        },
        {
          id: 'bargaining',
          tabLabel: 'Bargaining',
          quote: `“I hear how much you want one more round, ${name}. Our screen window is closed for today. Tomorrow is fresh.”`,
          why: 'Warm validation with zero negotiation teaches that calm boundaries stay steady.',
        },
        {
          id: 'crash',
          tabLabel: 'Post-screen dip',
          quote: '“Stopping fun games feels heavy in your body. Come build something or race me to the kitchen.”',
          why: 'Physical movement helps burn off the sudden dopamine drop when a fast screen switches off.',
        },
      ],
    };
  }

  // Toddlerhood (Ages 2–3)
  return {
    stageKey: 'toddler',
    stageLabel: 'Toddlerhood',
    ageRangeLabel: 'Ages 2–3',
    capFigure: '30m',
    capUnit: 'max / day',
    standardTitle: 'Co-viewed, slow-paced media',
    subtitle: (name, a) =>
      `At age ${a}, steady home routines (not personal devices) protect ${name}'s speech, play, and sleep.`,
    noPactNote: (a) =>
      `At age ${a}, healthy habits come from your calm home setup and simple TV or tablet limits.`,
    defaultBedtimeMinutes: 19 * 60 + 30, // 7:30 PM
    bedtimeOptions: [19 * 60, 19 * 60 + 30, 20 * 60, 20 * 60 + 30],
    cutoffLeadMinutes: 45,
    bridgeLeadMinutes: 25,
    bridgeNote: 'Board book, warm lamp, or audio lullaby',
    habits: [
      {
        id: 'zero-bg-tv',
        title: 'Zero background TV',
        detail: 'Turning off idle TV lifts parent-child conversation by roughly 40% during peak speech growth.',
      },
      {
        id: 'co-view-no-autoplay',
        title: 'Co-view slow shows with autoplay off',
        detail: 'Watch beside your toddler and narrate what happens so screens become shared language, not solo zoning.',
      },
      {
        id: 'phone-free-meals',
        title: 'Screen-free meals and stroller walks',
        detail: 'Everyday waiting moments build patience, curiosity, and real-world observation.',
      },
      {
        id: 'cutoff-before-bed',
        title: 'Screens off 45 minutes before bed',
        detail: 'Swap bright light for board books and warm amber light before sleep.',
      },
    ],
    scripts: (name) => [
      {
        id: 'two-min',
        tabLabel: '2 min left',
        quote: `“${name}, two minutes left on the timer. When this song ends, want to press the power button or hand me the remote?”`,
        why: 'A gentle countdown plus a tiny job lets toddlers feel capable instead of ambushed.',
      },
      {
        id: 'times-up',
        tabLabel: 'Time’s up',
        quote: `“Timer is done, ${name}. Let’s wave bye-bye to the show. It’ll be waiting tomorrow. Come help me pick a snack.”`,
        why: 'A playful goodbye ritual paired with immediate movement bridges out of screen focus.',
      },
      {
        id: 'meltdown',
        tabLabel: 'Meltdown',
        quote: '“You wanted to keep watching. Stopping is really hard. I’m right here on the floor, come blow out the candle with me.”',
        why: 'Sitting below eye level and offering a breath bridge calms a flooded toddler nervous system.',
      },
    ],
  };
}

export interface EarlyTierSanctuaryViewProps {
  child: ChildDTO;
  className?: string;
}

export function EarlyTierSanctuaryView({
  child,
  className,
}: EarlyTierSanctuaryViewProps) {
  const childAge = child.age ?? 2;
  const childName = formatDisplayName(child.name);
  const profile = React.useMemo(
    () => resolveEarlyStageProfile(childAge, child.developmentalTier),
    [childAge, child.developmentalTier]
  );

  const isInfant = profile.stageKey === 'infant';
  const isToddler = profile.stageKey === 'toddler';
  const sensoryActivity = React.useMemo(
    () => getDailySensoryActivity(isInfant, isToddler),
    [isInfant, isToddler]
  );

  const scripts = React.useMemo(
    () => profile.scripts(childName),
    [profile, childName]
  );

  const [bedtimeMinutes, setBedtimeMinutes] = React.useState<number>(
    profile.defaultBedtimeMinutes
  );
  const [checkedHabits, setCheckedHabits] = React.useState<Record<string, boolean>>({});
  const [activeScriptIdx, setActiveScriptIdx] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const habitsStorageKey = `alongside_early_habits_${child.id}`;
  const bedtimeStorageKey = `alongside_early_bedtime_${child.id}`;

  // Hydrate child-specific bedtime & household habits from localStorage
  React.useEffect(() => {
    setActiveScriptIdx(0);
    setBedtimeMinutes(profile.defaultBedtimeMinutes);
    setCheckedHabits({});

    if (typeof window === 'undefined') return;
    try {
      const savedBedtime = window.localStorage.getItem(bedtimeStorageKey);
      if (savedBedtime) {
        const parsed = Number(savedBedtime);
        if (profile.bedtimeOptions.includes(parsed)) {
          setBedtimeMinutes(parsed);
        }
      }
      const savedHabits = window.localStorage.getItem(habitsStorageKey);
      if (savedHabits) {
        const parsed = JSON.parse(savedHabits);
        if (parsed && typeof parsed === 'object') {
          setCheckedHabits(parsed as Record<string, boolean>);
        }
      }
    } catch {
      // Ignore storage access restrictions
    }
  }, [
    child.id,
    bedtimeStorageKey,
    habitsStorageKey,
    profile.defaultBedtimeMinutes,
    profile.bedtimeOptions,
  ]);

  const handleSelectBedtime = (mins: number) => {
    setBedtimeMinutes(mins);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(bedtimeStorageKey, String(mins));
      } catch {
        // Ignore storage errors
      }
    }
  };

  const handleToggleHabit = (habitId: string) => {
    setCheckedHabits((prev) => {
      const next = { ...prev, [habitId]: !prev[habitId] };
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(habitsStorageKey, JSON.stringify(next));
        } catch {
          // Ignore storage errors
        }
      }
      return next;
    });
  };

  const activeScript = scripts[activeScriptIdx % scripts.length] ?? scripts[0]!;

  const handleCopyScript = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(activeScript.quote);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Ignore clipboard restrictions
    }
  };

  const schedule = computeEveningWindDown(
    bedtimeMinutes,
    profile.cutoffLeadMinutes,
    profile.bridgeLeadMinutes
  );

  const activeHabitCount = profile.habits.filter((h) => checkedHabits[h.id]).length;

  return (
    <div
      className={cn(
        'space-y-6 sm:space-y-7 max-w-6xl mx-auto px-2 sm:px-4 text-[#131715]',
        className
      )}
    >
      {/* 1. Calm Editorial Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
        <div className="space-y-2">
          <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#143D2B]">
            Early Screen Rhythm · {profile.stageLabel} ({profile.ageRangeLabel})
          </span>
          <h1 className="font-serif text-[30px] sm:text-[38px] font-medium leading-[1.1] tracking-[-0.02em] text-[#131715]">
            {childName}&apos;s Home Screen Rhythm
          </h1>
          <p className="text-[14.5px] text-[#494F4C] max-w-[54ch] leading-relaxed">
            {profile.subtitle(childName, childAge)}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-end no-print">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#143D2B]/15 bg-white text-xs font-mono text-[#494F4C] tabular-nums">
            <span className="font-semibold text-[#143D2B]">{childName}</span>
            <span className="text-[#858C88]">·</span>
            <span>Age {childAge}</span>
          </span>
          <button
            type="button"
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 rounded-full border border-[#143D2B]/15 bg-white hover:border-[#143D2B]/40 text-xs font-semibold text-[#131715] transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-[#143D2B]" aria-hidden="true" />
            <span>Print guide</span>
          </button>
        </div>
      </header>

      {/* 2. Flagship Card: Sculptural Daily Cap + Interactive Evening Wind-Down */}
      <section
        aria-label="Daily screen standard and evening wind-down"
        className="rounded-[2rem] border border-[#143D2B]/10 bg-white shadow-[0_14px_40px_-10px_rgba(20,61,43,0.08)] p-6 sm:p-9"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-11 items-center">
          {/* Left: Age-Calibrated Daily Standard */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-serif text-[52px] sm:text-[60px] font-medium leading-none tracking-[-0.03em] text-[#143D2B] tabular-nums">
                {profile.capFigure}
              </span>
              <div className="space-y-0.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-[#7A827D] block">
                  {profile.capUnit}
                </span>
                <span className="text-[14.5px] font-semibold text-[#131715] block leading-snug">
                  {profile.standardTitle}
                </span>
              </div>
            </div>

            <dl className="border-t border-[#ECE8DF] divide-y divide-[#ECE8DF] text-[13.5px]">
              <div className="py-3 grid grid-cols-[120px_1fr] gap-3 items-baseline">
                <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#7A827D]">
                  Screens off
                </dt>
                <dd className="text-[#131715] font-medium tabular-nums">
                  {schedule.cutoffTime} ({profile.cutoffLeadMinutes} min before bed)
                </dd>
              </div>
              <div className="py-3 grid grid-cols-[120px_1fr] gap-3 items-baseline">
                <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#7A827D]">
                  Why routines first
                </dt>
                <dd className="text-[#494F4C] leading-snug">
                  {profile.noPactNote(childAge)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: Interactive Bedtime Wind-Down Calculator */}
          <div className="rounded-[1.5rem] bg-[#FAF8F3] p-6 sm:p-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B45309]">
                  Evening Wind-Down
                </span>
                <p className="text-[13px] text-[#5B645F] mt-0.5">
                  Target bedtime for {childName}
                </p>
              </div>

              <div
                role="group"
                aria-label="Select bedtime"
                className="inline-flex flex-wrap items-center gap-1 rounded-full bg-white border border-[#E6E2D8] p-1 no-print"
              >
                {profile.bedtimeOptions.map((mins) => {
                  const isSelected = mins === bedtimeMinutes;
                  const shortLabel = formatMinutes12Hour(mins).replace(' PM', '');
                  return (
                    <button
                      key={mins}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleSelectBedtime(mins)}
                      className={cn(
                        'min-h-[34px] px-3 rounded-full text-xs font-mono font-semibold tabular-nums transition-colors cursor-pointer',
                        isSelected
                          ? 'bg-[#143D2B] text-white'
                          : 'text-[#494F4C] hover:text-[#143D2B]'
                      )}
                    >
                      {shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3-Step Evening Rhythm Timeline */}
            <ol className="divide-y divide-[#E8E4DA]">
              <li className="py-3.5 first:pt-0 last:pb-0 flex items-baseline justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-[14px] font-semibold text-[#131715]">
                    Screens off
                  </p>
                  <p className="text-[12.5px] text-[#5B645F]">
                    TV dark, autoplay stopped, shared devices docked
                  </p>
                </div>
                <span className="font-serif text-[20px] font-medium text-[#B45309] tabular-nums shrink-0">
                  {schedule.cutoffTime}
                </span>
              </li>

              <li className="py-3.5 first:pt-0 last:pb-0 flex items-baseline justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-[14px] font-semibold text-[#131715]">
                    Calm analog bridge
                  </p>
                  <p className="text-[12.5px] text-[#5B645F]">
                    {profile.bridgeNote}
                  </p>
                </div>
                <span className="font-serif text-[20px] font-medium text-[#143D2B] tabular-nums shrink-0">
                  {schedule.bridgeTime}
                </span>
              </li>

              <li className="py-3.5 first:pt-0 last:pb-0 flex items-baseline justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-[14px] font-semibold text-[#131715]">
                    Sleep sanctuary
                  </p>
                  <p className="text-[12.5px] text-[#5B645F]">
                    Dark, cool room with zero bedroom screens
                  </p>
                </div>
                <span className="font-serif text-[20px] font-medium text-[#131715] tabular-nums shrink-0">
                  {schedule.bedtime}
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 3. Asymmetric Action Split: Adult Home Habits (7 cols) + Deep-Spruce Transition Scripts (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Interactive 4-Habit Home Checklist */}
        <section
          aria-label="Adult household habits"
          className="lg:col-span-7 rounded-[1.75rem] border border-[#143D2B]/10 bg-white shadow-[0_10px_28px_rgba(19,23,21,0.045)] p-6 sm:p-8 flex flex-col justify-between gap-5"
        >
          <div className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#143D2B]">
                  Adult Home Habits
                </span>
                <h2 className="font-serif text-[24px] font-medium text-[#131715] mt-1">
                  Four quiet shifts that make rules effortless
                </h2>
              </div>
              <span className="font-mono text-xs text-[#6C7570] tabular-nums shrink-0">
                {activeHabitCount} of {profile.habits.length} active
              </span>
            </div>

            <ul className="divide-y divide-[#ECE8DF]">
              {profile.habits.map((habit) => {
                const isChecked = Boolean(checkedHabits[habit.id]);
                return (
                  <li key={habit.id} className="py-3.5 first:pt-1 last:pb-0">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      onClick={() => handleToggleHabit(habit.id)}
                      className="w-full text-left flex items-start gap-3.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-lg"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors',
                          isChecked
                            ? 'bg-[#143D2B] border-[#143D2B] text-white'
                            : 'bg-white border-[#CFCBC0] group-hover:border-[#143D2B]'
                        )}
                      >
                        {isChecked ? <Check className="h-3.5 w-3.5" /> : null}
                      </span>
                      <div className="space-y-0.5 min-w-0">
                        <span
                          className={cn(
                            'block text-[14.5px] font-semibold leading-snug transition-colors',
                            isChecked ? 'text-[#143D2B]' : 'text-[#131715]'
                          )}
                        >
                          {habit.title}
                        </span>
                        <span className="block text-[13px] text-[#5B645F] leading-snug">
                          {habit.detail}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Right: Deep-Spruce Interactive Screen-Off Script Helper */}
        <aside
          aria-label="Calm transition scripts"
          className="lg:col-span-5 rounded-[1.75rem] bg-gradient-to-br from-[#164430] to-[#0E2B1E] text-[#FAF7F1] p-6 sm:p-7 border border-white/10 shadow-[0_20px_44px_rgba(14,43,30,0.2)] flex flex-col justify-between gap-5"
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#F0BC46]">
                {isInfant ? 'Calm Caregiver Cues' : 'When Screens Turn Off'}
              </span>

              <div
                role="tablist"
                aria-label="Choose a moment"
                className="inline-flex flex-wrap items-center gap-1 rounded-full bg-white/10 p-1"
              >
                {scripts.map((s, idx) => {
                  const isActive = idx === activeScriptIdx % scripts.length;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveScriptIdx(idx)}
                      className={cn(
                        'min-h-[34px] px-3 rounded-full text-xs font-semibold transition-colors cursor-pointer',
                        isActive
                          ? 'bg-[#FAF7F1] text-[#10251C]'
                          : 'text-[#FAF7F1]/80 hover:text-white'
                      )}
                    >
                      {s.tabLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Zero-shift CSS grid overlay for script panels */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border-l-[3px] border-[#F0BC46] grid">
              {scripts.map((s, idx) => {
                const isCurrent = idx === activeScriptIdx % scripts.length;
                return (
                  <div
                    key={s.id}
                    aria-hidden={!isCurrent || undefined}
                    className={cn(
                      'col-start-1 row-start-1 space-y-2.5',
                      !isCurrent && 'invisible pointer-events-none select-none'
                    )}
                  >
                    <blockquote className="font-serif text-[19px] leading-[1.38] text-white">
                      {s.quote}
                    </blockquote>
                    <p className="text-[12.5px] text-[#FAF7F1]/78 leading-relaxed">
                      {s.why}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1 no-print">
            <span className="text-[12px] text-[#FAF7F1]/65">
              Tap a moment above to switch
            </span>
            <button
              type="button"
              onClick={handleCopyScript}
              className="inline-flex items-center gap-1.5 min-h-[38px] px-4 rounded-full border border-white/25 hover:border-white/50 hover:bg-white/10 text-xs font-semibold text-[#FAF7F1] transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#76C69A]" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy words</span>
                </>
              )}
            </button>
          </div>
        </aside>
      </div>

      {/* 4. Quiet Horizon Footer & Screen-Free Play Bridge */}
      <footer className="rounded-[1.5rem] border border-[#143D2B]/10 bg-white px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5 max-w-[54ch]">
          <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#7A827D]">
            Looking ahead
          </span>
          <p className="text-[13.5px] text-[#494F4C] leading-snug">
            Around age 7, this page unlocks the Phone Readiness Check and OS Parental Controls Setup automatically.
          </p>
        </div>

        <Link
          href="/digest#play-this-week"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-[13px] font-semibold transition-colors shrink-0 w-fit no-print"
        >
          <span>Today&apos;s play: {sensoryActivity.title}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </footer>
    </div>
  );
}
