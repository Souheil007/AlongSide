'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  FileCheck2,
  Compass,
  Printer,
  Layers,
  ChevronDown,
  ChevronUp,
  Check,
  Phone,
  Flame,
} from 'lucide-react';
import {
  RoadType,
  DevicePlatform,
  type ChildDTO,
} from '@alongside/shared';
import {
  useChildContextStore,
  selectActiveChild,
  DEMO_FAMILY_CHILDREN,
} from '@/stores/useChildContextStore';
import { formatCurfew12Hour } from '@/stores/usePactStore';
import { EnrollmentModal } from './EnrollmentModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface DevicesManagementViewProps {
  initialTab?: string;
  child?: ChildDTO;
  children?: ChildDTO[];
}

/**
 * Auto-calibrates curfew recommendations based on child age:
 * - Kids under 9: 8:00 PM (20:00)
 * - Kids 9–12: 8:30 PM (20:30)
 * - Teens 13+: 9:30 PM (21:30)
 */
export function getRecommendedCurfew(age: number): {
  time24: string;
  time12: string;
  rationale: string;
} {
  if (age < 9) {
    return {
      time24: '20:00',
      time12: '8:00 PM',
      rationale: 'Elementary sleep protection (8:00 PM lock, 9-11 hours required)',
    };
  }
  if (age <= 12) {
    return {
      time24: '20:30',
      time12: '8:30 PM',
      rationale: 'Pre-teen melatonin release & un-docked bedroom protection (8:30 PM lock)',
    };
  }
  return {
    time24: '21:30',
    time12: '9:30 PM',
    rationale: 'Adolescent circadian rhythm & autonomous wind-down (9:30 PM lock)',
  };
}

export function DevicesManagementView({
  initialTab,
  child: propChild,
  children: propChildren,
}: DevicesManagementViewProps) {
  const { children: storeChildren, activeChildId, setActiveChild } = useChildContextStore();

  // Active child resolution with safe fallback and DI support
  const children = propChildren && propChildren.length > 0
    ? propChildren
    : storeChildren && storeChildren.length > 0
    ? storeChildren
    : DEMO_FAMILY_CHILDREN;

  const activeChild = propChild || selectActiveChild({ children, activeChildId }) || children[0];
  const activeAge = activeChild?.age ?? 10;
  const isToddler = activeAge <= 3;

  // Curfew configuration based on child profile
  const recommendedCurfew = React.useMemo(
    () => getRecommendedCurfew(activeAge),
    [activeAge]
  );
  const curfewDisplay = recommendedCurfew.time12;

  // Modals state
  const [enrollmentModalOpen, setEnrollmentModalOpen] = React.useState(false);
  const [printModalOpen, setPrintModalOpen] = React.useState(false);
  const [ladderOpen, setLadderOpen] = React.useState(false);
  const [callAlert, setCallAlert] = React.useState<string | null>(null);

  const handleSimulateCall = (contact: 'Mom' | 'Dad') => {
    setCallAlert(`Calling ${contact}... Emergency contact 24/7 unlocked under AlongSide Family Pact.`);
    setTimeout(() => {
      setCallAlert(null);
    }, 4000);
  };

  // Mutual Pledges tailored by child stage
  const childPledges = React.useMemo(() => {
    if (activeAge <= 6) {
      return [
        `Dock family tablet at the central living station by ${curfewDisplay}; zero bedroom screens.`,
        'Stop screen co-viewing calmly when family transition timer rings after 30-45 minutes.',
        'Share screen play with parents, practicing turn-taking and emotional sparring.',
      ];
    }
    if (activeAge <= 12) {
      return [
        `Dock phone at hallway station by ${curfewDisplay} nightly; zero bedroom screens during sleep hours.`,
        'Homework & household tasks completed before recreational YouTube or gaming sessions.',
        'Zero secret disguise apps (e.g. calculator vaults) or hidden secondary social accounts.',
      ];
    }
    return [
      `Dock personal smartphone at hallway station by ${curfewDisplay} for restorative circadian sleep.`,
      'Practice autonomous executive focus blocks (Pomodoro) during high school study sessions.',
      'Maintain transparent communication with parents regarding uncomfortable group chat dynamics.',
    ];
  }, [activeAge, curfewDisplay]);

  const parentPledges = React.useMemo(() => {
    if (activeAge <= 6) {
      return [
        'Active co-viewing: watch and explore high-quality interactive media alongside child.',
        'Put away personal work devices during shared meals, outdoor play, and bedtime routines.',
        'Maintain calm, empathetic boundaries when child protests screen transitions.',
      ];
    }
    return [
      'Zero stealth spyware: Parents will never read private text messages or secretly spy on conversations.',
      'Device-free dinner table: Adults dock work laptops and phones away during shared family meals.',
      'Safe Harbor Guarantee: No punitive device confiscation when seeking help about uncomfortable online encounters.',
    ];
  }, [activeAge]);

  const hasAssessment =
    activeChild?.latestAssessmentScore !== null &&
    activeChild?.latestAssessmentScore !== undefined;

  const score = activeChild?.latestAssessmentScore ?? 84;

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-2 sm:px-4 text-[#111413]">
      {/* Top Header & Child Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3E3DC] pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'font-mono text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold border',
                isToddler
                  ? 'bg-[#FEF3C7] text-[#B45309] border-[#B45309]/20'
                  : 'bg-[#EAF3EE] text-[#143D2B] border-[#143D2B]/15'
              )}
            >
              {isToddler
                ? 'Tier 0: Toddler Habit'
                : `Tier ${activeAge >= 13 ? '4' : activeAge >= 10 ? '3' : '2'} Milestone Progression`}
            </span>
            <span className="text-xs font-mono text-[#858C88] hidden sm:inline">
              Pact-as-Code Guided Journey
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#111413] tracking-tight">
            {isToddler
              ? `${activeChild?.name || 'Child'}'s Screen-Free Sanctuary (Age ${activeAge})`
              : `${activeChild?.name || 'Child'}'s Digital Independence Roadmap`}
          </h1>
          <p className="text-xs sm:text-sm text-[#494F4C] max-w-2xl leading-relaxed">
            {isToddler
              ? 'Pacts are not developmentally applicable for toddlers. AlongSide guides your household with pediatric environmental routines.'
              : 'Step-by-step guidance tailored to child neurodevelopment. Move seamlessly from diagnostic readiness to signed bilateral commitments and neutral automated bedtime locking.'}
          </p>
        </div>

        {/* Profile Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <label htmlFor="child-profile-select" className="text-xs font-mono text-[#858C88] hidden md:inline">
            Active Child:
          </label>
          <select
            id="child-profile-select"
            value={activeChild?.id || ''}
            onChange={(e) => setActiveChild(e.target.value)}
            className="text-xs font-mono bg-[#F4F4F0] border border-[#E3E3DC] rounded-[6px] px-3 py-2 font-medium text-[#111413] focus:outline-none focus:ring-1 focus:ring-[#143D2B] cursor-pointer shadow-2xs"
          >
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name} (Age {child.age} &bull; Tier{' '}
                {child.age <= 3 ? '0' : child.age <= 9 ? '2' : child.age <= 12 ? '3' : '4'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TODDLER VIEW: SENSORY HABIT & ADULT ROUTINES (TIER 0: AGES 0–3)          */}
      {/* ========================================================================= */}
      {isToddler ? (
        <div className="space-y-6">
          <div className="bg-[#FEF3C7]/40 border border-[#B45309]/30 rounded-[12px] p-6 sm:p-7 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#B45309] font-bold">
                Developmental Clarification
              </span>
              <span className="font-mono text-[10px] bg-[#B45309]/20 text-[#111413] px-2 py-0.5 rounded font-semibold">
                Tier 0: Age 0–3
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111413]">
              Why Toddlers Don&apos;t Sign Digital Pacts
            </h2>
            <p className="text-xs sm:text-sm text-[#494F4C] leading-relaxed max-w-2xl">
              At age {activeAge}, prefrontal executive function and bilateral negotiation do not yet exist in child psychology. Giving a toddler a screen pact causes parental confusion. AlongSide instead guides you with <strong>Adult Environmental Routines</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-[#E3E3DC] rounded-[10px] p-5 space-y-2.5 shadow-2xs">
              <span className="font-mono text-xs text-[#143D2B] font-bold block">
                Step 1: Environmental Calm
              </span>
              <h3 className="font-serif text-base font-bold text-[#111413]">
                Zero Background TV
              </h3>
              <p className="text-xs text-[#494F4C] leading-relaxed">
                Reduces sensory fragmentation and increases parental conversational word count by 40% during crucial speech development windows.
              </p>
            </div>

            <div className="bg-white border border-[#E3E3DC] rounded-[10px] p-5 space-y-2.5 shadow-2xs">
              <span className="font-mono text-xs text-[#143D2B] font-bold block">
                Step 2: Co-Viewing Only
              </span>
              <h3 className="font-serif text-base font-bold text-[#111413]">
                Interactive Video Chat
              </h3>
              <p className="text-xs text-[#494F4C] leading-relaxed">
                Grandparent FaceTime is the only recommended screen interaction under AAP pediatric guidelines for infants and toddlers under 2.
              </p>
            </div>

            <div className="bg-white border border-[#E3E3DC] rounded-[10px] p-5 space-y-2.5 shadow-2xs">
              <span className="font-mono text-xs text-[#143D2B] font-bold block">
                Step 3: Bedtime Sanctuary
              </span>
              <h3 className="font-serif text-base font-bold text-[#111413]">
                7:30 PM Sleep Routine
              </h3>
              <p className="text-xs text-[#494F4C] leading-relaxed">
                Zero blue light after dinner. Replaced with physical board books, soothing audio lullabies, and dim amber ambient nursery lighting.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* SEQUENTIAL JOURNEY LADDER & PHONE CANVAS (TIERS 1–5: AGES 4–18)           */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* STEP 1: READINESS DIAGNOSTIC ACCORDION CARD */}
          <section className="bg-white border border-[#E3E3DC] rounded-[12px] p-5 shadow-2xs transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0',
                    hasAssessment
                      ? 'bg-[#143D2B] text-white'
                      : 'bg-[#F4F4F0] border border-[#E3E3DC] text-[#494F4C]'
                  )}
                >
                  {hasAssessment ? '✓' : '1'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#858C88] font-bold">
                      Step 1 of 3
                    </span>
                    <span
                      className={cn(
                        'font-mono text-[10px] px-2 py-0.5 rounded-full font-bold',
                        hasAssessment
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      )}
                    >
                      {hasAssessment ? 'Completed' : 'Assessment Pending'}
                    </span>
                  </div>
                  <h2 className="font-serif text-base sm:text-lg font-bold text-[#111413]">
                    First-Phone Neuro-Readiness Diagnostic
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-[#143D2B] block">
                    Score: {score}/100
                  </span>
                  <span className="text-[10px] font-mono text-[#858C88] block">
                    {score >= 75 ? 'Passed for Bridge Device' : 'Scaffolding Recommended'}
                  </span>
                </div>
                {activeChild && (
                  <Link href={`/children/${activeChild.id}/readiness`}>
                    <Button
                      variant="outline"
                      className="text-xs font-mono h-8 px-3 border-[#E3E3DC] hover:border-[#143D2B] hover:text-[#143D2B]"
                    >
                      <span>{hasAssessment ? 'View Audit' : 'Start Diagnostic'}</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </section>

          {/* STEP 2 & 3: MERGED INTERACTIVE WORKSHOP & LIVE PHONE CANVAS */}
          <section className="bg-white border border-[#E3E3DC] rounded-[14px] p-6 sm:p-8 shadow-sm space-y-6">
            {/* Step 2/3 Heading & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3E3DC] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#143D2B] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  2
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold">
                    Step 2 &amp; 3 &bull; Operational Execution
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111413] mt-0.5">
                    Bilateral Treaty &amp; Nightly Phone Enforcement
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => setPrintModalOpen(true)}
                  variant="outline"
                  className="px-3 py-1.5 rounded-[6px] bg-[#F4F4F0] border-[#E3E3DC] hover:border-[#143D2B] text-xs font-mono font-medium text-[#111413] flex items-center gap-1.5 transition-colors h-9"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Treaty (PDF)</span>
                </Button>
                <Link href="/pacts/builder">
                  <Button className="h-9 px-3 bg-[#111413] hover:bg-[#143D2B] text-white text-xs font-mono font-bold rounded-[6px]">
                    <FileCheck2 className="h-3.5 w-3.5 mr-1.5" />
                    <span>Launch Pact Wizard</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* CANVAS GRID: TREATY LEDGER + PHONE VIEWER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
              {/* LEFT: THE BILATERAL FAMILY TREATY LEDGER (7 COLS) */}
              <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#E6DEC9] rounded-[12px] p-6 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#E6DEC9] pb-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#B45309] font-bold">
                      Certified Bilateral Agreement
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#111413]">
                      The Bilateral Family Treaty
                    </h3>
                    <p className="text-[11px] text-[#494F4C]">
                      Co-authored by {activeChild?.name || 'Child'} and Parents &bull; Active &amp; Binding
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#143D2B] text-white flex items-center justify-center font-serif text-sm font-bold shadow-2xs">
                    ✓
                  </div>
                </div>

                {/* Child's Mutual Pledges */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#111413] font-bold flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#143D2B] text-white flex items-center justify-center text-[9px]">
                        {(activeChild?.name || 'C').charAt(0)}
                      </span>
                      {activeChild?.name || 'Child'}&apos;s Mutual Pledges (Child)
                    </span>
                    <span className="text-[10px] font-mono text-[#143D2B] font-semibold">
                      3 of 3 Active
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-[#494F4C]">
                    {childPledges.map((pledge, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-[6px] bg-white/90 border border-[#E6DEC9] flex items-start gap-2.5 shadow-2xs"
                      >
                        <Check className="h-4 w-4 text-[#143D2B] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pledge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parents' Mutual Pledges */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#111413] font-bold flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#B45309] text-white flex items-center justify-center text-[9px]">
                        P
                      </span>
                      Parents&apos; Mutual Pledges (Adults)
                    </span>
                    <span className="text-[10px] font-mono text-[#B45309] font-semibold">
                      3 of 3 Active
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-[#494F4C]">
                    {parentPledges.map((pledge, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-[6px] bg-white/90 border border-[#E6DEC9] flex items-start gap-2.5 shadow-2xs"
                      >
                        <Check className="h-4 w-4 text-[#B45309] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pledge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Digital Signatures Footer */}
                <div className="pt-3 border-t border-[#E6DEC9] grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-white/70 p-2.5 rounded border border-[#E6DEC9]">
                    <span className="text-[9px] text-[#858C88] block">Child Signature</span>
                    <span className="font-serif italic font-bold text-[#111413] text-sm block">
                      ✍ {activeChild?.name || 'Child'} Davies
                    </span>
                    <span className="text-[9px] text-[#143D2B] font-semibold block">
                      Verified Digital Seal
                    </span>
                  </div>
                  <div className="bg-white/70 p-2.5 rounded border border-[#E6DEC9]">
                    <span className="text-[9px] text-[#858C88] block">Parent Signatures</span>
                    <span className="font-serif italic font-bold text-[#111413] text-sm block">
                      ✍ Sarah &amp; Michael
                    </span>
                    <span className="text-[9px] text-[#143D2B] font-semibold block">
                      Verified Digital Seal
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: PHONE PREVIEW & DEVICE ACTIONS (5 COLS) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-[#F4F4F0] border border-[#E3E3DC] rounded-[12px] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#111413]">
                      Lock Screen Preview
                    </span>
                    <span className="font-mono text-[10px] text-[#143D2B] bg-[#EAF3EE] px-2 py-0.5 rounded font-bold border border-[#143D2B]/15">
                      Live Simulation
                    </span>
                  </div>

                  {/* Toast Alert for Emergency Call Simulation */}
                  {callAlert && (
                    <div className="p-2.5 bg-emerald-900 text-white text-xs font-mono rounded-[8px] animate-fade-in shadow-md text-center">
                      {callAlert}
                    </div>
                  )}

                  {/* REALISTIC PHONE MOCKUP */}
                  <div className="flex justify-center">
                    <div className="w-[260px] sm:w-[280px] h-[490px] bg-[#0c100e] rounded-[38px] p-3 shadow-2xl relative flex flex-col justify-between text-white overflow-hidden select-none border-4 border-[#242b27]">
                      {/* Dynamic Island / Notch */}
                      <div className="w-20 h-3.5 bg-black rounded-full mx-auto z-20"></div>

                      <div className="flex-1 flex flex-col items-center justify-between pt-5 pb-3 px-2 text-center z-10">
                        {/* Time & Date Display */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">
                            Tonight &bull; Wednesday
                          </span>
                          <div className="font-serif text-4xl font-light text-white tracking-tight">
                            {curfewDisplay}
                          </div>
                        </div>

                        {/* Lock Screen Notification Card */}
                        <div className="w-full bg-white/10 backdrop-blur-md rounded-[14px] p-3 border border-white/20 text-left space-y-1.5 shadow-md">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs">🌙</span>
                              <strong className="text-[11px] font-semibold text-white">
                                Bedtime Peace Active
                              </strong>
                            </div>
                            <span className="text-[8px] font-mono text-slate-300">
                              AlongSide
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-200 leading-snug">
                            Recreational apps are paused until 7:00 AM under your AlongSide Family Pact.
                          </p>
                        </div>

                        {/* Always Unlocked Emergency Contacts */}
                        <div className="w-full space-y-1.5">
                          <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                            Always Unlocked:
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleSimulateCall('Mom')}
                              className="py-1.5 px-2 rounded-[8px] bg-emerald-600/80 hover:bg-emerald-600 text-white text-[10px] font-medium flex items-center justify-center gap-1 transition-colors active:scale-95"
                            >
                              <Phone className="h-3 w-3" />
                              <span>Call Mom</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSimulateCall('Dad')}
                              className="py-1.5 px-2 rounded-[8px] bg-emerald-600/80 hover:bg-emerald-600 text-white text-[10px] font-medium flex items-center justify-center gap-1 transition-colors active:scale-95"
                            >
                              <Phone className="h-3 w-3" />
                              <span>Call Dad</span>
                            </button>
                          </div>
                          <div className="text-[9px] font-mono text-slate-400">
                            Emergency 911 &amp; Contacts Always Open
                          </div>
                        </div>
                      </div>

                      {/* Home Indicator */}
                      <div className="w-24 h-1 bg-white/40 rounded-full mx-auto mb-1"></div>
                    </div>
                  </div>

                  {/* SCAN QR CODE TRIGGER BUTTON */}
                  <Button
                    type="button"
                    onClick={() => setEnrollmentModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-[6px] bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-xs font-mono font-bold transition-all shadow-2xs flex items-center justify-center gap-2 h-10"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Scan Device Enrollment QR</span>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* PROGRESSIVE DISCLOSURE: BRIDGE DEVICE AUTONOMY LADDER */}
          <div className="border border-[#E3E3DC] rounded-[10px] bg-white overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setLadderOpen((prev) => !prev)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F4F4F0]/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="h-4 w-4 text-[#143D2B]" />
                <span className="font-serif text-sm font-semibold text-[#111413]">
                  The Bridge Device Autonomy Ladder (4 Stages)
                </span>
                <span className="text-[11px] font-mono text-[#858C88] hidden sm:inline">
                  Gradual digital scaffolding before full smartphone
                </span>
              </div>
              {ladderOpen ? (
                <ChevronUp className="h-4 w-4 text-[#858C88]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#858C88]" />
              )}
            </button>

            {ladderOpen && (
              <div className="p-5 border-t border-[#E3E3DC] bg-[#FAF7F2]/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-[8px] border border-[#E3E3DC] space-y-1.5">
                  <span className="font-mono text-[10px] text-[#143D2B] font-bold block">
                    Stage 1: Ages 7–9
                  </span>
                  <h4 className="font-serif font-bold text-[#111413]">
                    Smartwatch GPS (Gizmo / Apple Watch)
                  </h4>
                  <p className="text-[#494F4C] text-[11px] leading-relaxed">
                    Voice calls to whitelisted family only, GPS tracking, zero internet browser or social media.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-[8px] border border-[#E3E3DC] space-y-1.5">
                  <span className="font-mono text-[10px] text-[#143D2B] font-bold block">
                    Stage 2: Ages 10–11
                  </span>
                  <h4 className="font-serif font-bold text-[#111413]">
                    Curated Phone (Pinwheel / Gabb)
                  </h4>
                  <p className="text-[#494F4C] text-[11px] leading-relaxed">
                    Texting, maps, family photos, but zero addictive app store, games, or open algorithmic web.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-[8px] border border-[#E3E3DC] space-y-1.5">
                  <span className="font-mono text-[10px] text-[#143D2B] font-bold block">
                    Stage 3: Ages 11–13
                  </span>
                  <h4 className="font-serif font-bold text-[#111413]">
                    Smartphone with Bedtime Pact
                  </h4>
                  <p className="text-[#494F4C] text-[11px] leading-relaxed">
                    Personal smartphone with AlongSide signed bilateral treaty and automated {curfewDisplay} sleep lockout.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-[8px] border border-[#E3E3DC] space-y-1.5">
                  <span className="font-mono text-[10px] text-[#143D2B] font-bold block">
                    Stage 4: Ages 14+
                  </span>
                  <h4 className="font-serif font-bold text-[#111413]">
                    Autonomous Circadian Transition
                  </h4>
                  <p className="text-[#494F4C] text-[11px] leading-relaxed">
                    Independent charging station outside the bedroom, internal executive function self-regulation.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* DISCOVERABILITY LINK TO YOUTH CULTURE DIGEST */}
          <div className="p-4 rounded-[10px] bg-[#F4F4F0] border border-[#E3E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Flame className="h-4 w-4 text-[#B45309] shrink-0" />
              <span className="text-[#494F4C]">
                Need help deciphering youth slang or gaming exploit risks?
              </span>
            </div>
            <Link
              href="/digest"
              className="font-mono font-medium text-[#143D2B] hover:underline flex items-center gap-1 self-start sm:self-auto shrink-0"
            >
              <span>Explore Sunday Youth Culture Digest</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      {/* ENROLLMENT MODAL */}
      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        enrollmentToken={activeChild?.id || 'demo-token'}
        childName={activeChild?.name || 'Child'}
        curfewTime={recommendedCurfew.time24}
        platform={DevicePlatform.APPLE_IOS}
      />

      {/* PRINT TREATY CONFIRMATION DIALOG */}
      <Dialog open={printModalOpen} onOpenChange={setPrintModalOpen}>
        <DialogContent className="max-w-md bg-white border border-[#E3E3DC] rounded-[14px] p-6 space-y-4">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg font-bold text-[#111413]">
              Print Bilateral Agreement
            </DialogTitle>
            <DialogDescription className="text-xs text-[#494F4C] leading-relaxed">
              Exporting the signed Bilateral Family Treaty between {activeChild?.name || 'Child'} Davies and Parents for physical refrigerator display.
            </DialogDescription>
          </DialogHeader>

          <div className="p-3 bg-[#FAF7F2] border border-[#E6DEC9] rounded-[8px] text-xs space-y-1.5 font-mono text-[#494F4C]">
            <div className="flex justify-between">
              <span>Signatures:</span>
              <span className="text-[#143D2B] font-bold">2 of 2 Verified</span>
            </div>
            <div className="flex justify-between">
              <span>Bedtime Curfew:</span>
              <span className="font-bold">{curfewDisplay}</span>
            </div>
            <div className="flex justify-between">
              <span>Format:</span>
              <span>Vector PDF / Refrigerator Ready</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPrintModalOpen(false)}
              className="text-xs font-mono h-9"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                setPrintModalOpen(false);
                if (typeof window !== 'undefined') {
                  window.print();
                }
              }}
              className="bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-xs font-mono font-bold h-9"
            >
              Print (PDF)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
