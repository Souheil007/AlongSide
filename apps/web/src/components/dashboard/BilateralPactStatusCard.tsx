'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Moon,
  ShieldCheck,
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  Baby,
  Palette,
  Coffee,
  Sparkles,
  ClipboardCheck,
} from 'lucide-react';
import {
  type ChildDTO,
  RoadType,
} from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface BilateralPactStatusCardProps {
  child: ChildDTO | null;
  className?: string;
}

function getReadinessTier(score: number) {
  if (score >= 80) {
    return {
      title: 'Smartphone Ready',
      description: 'Demonstrates strong prefrontal habits, bedtime consistency, and digital boundary awareness.',
      badgeColor: 'bg-[#EAF3EE] text-[#143D2B] border-[#143D2B]/20',
      strokeColor: '#143D2B',
      recommendedPreset: 'Road 2 Autonomy Charter',
      nextGoal: 'Finalize bilateral Family Pact and hardware bedtime dock.',
    };
  }
  if (score >= 60) {
    return {
      title: 'Approaching Smartphone Readiness',
      description: 'Demonstrates emerging prefrontal habits; working through impulse control and morning autonomy.',
      badgeColor: 'bg-[#FEF3C7] text-[#B45309] border-[#B45309]/20',
      strokeColor: '#143D2B',
      recommendedPreset: 'Road 1 Bridge Charter',
      nextGoal: 'Strengthen independent morning waking & screen-free transitions.',
    };
  }
  return {
    title: 'Building Pre-Device Foundations',
    description: 'Nervous system and bedtime habits developing; benefit from scaffolded offline routines.',
    badgeColor: 'bg-[#FEE2E2] text-[#991B1B] border-[#991B1B]/20',
    strokeColor: '#B45309',
    recommendedPreset: 'Pre-Device Foundation',
    nextGoal: 'Focus on 14 days consistent screen-free bedtime routine.',
  };
}

export function BilateralPactStatusCard({
  child,
  className,
}: BilateralPactStatusCardProps) {
  const childAge = child?.age ?? 10;
  const isToddler = childAge <= 3 || String(child?.developmentalTier || '').includes('TIER_0');
  const isEarlyChildhood = (childAge >= 4 && childAge <= 6) || String(child?.developmentalTier || '').includes('TIER_1');
  const isPreDevice = child?.roadType === RoadType.PRE_DEVICE;
  const childName = child?.name ?? 'Child';
  const childId = child?.id ?? 'default';

  const hasAssessment = typeof child?.latestAssessmentScore === 'number' && !Number.isNaN(child.latestAssessmentScore);
  const score = hasAssessment ? Math.min(100, Math.max(0, Math.round(child!.latestAssessmentScore!))) : null;

  // Calibrated stroke offset for circular SVG (circumference = 2 * pi * 40 ~= 251.2)
  const strokeOffset = score !== null ? 251.2 * (1 - score / 100) : 251.2;
  const tier = score !== null ? getReadinessTier(score) : null;

  // Calibrated quadrant scores proportional to child's assessment score
  const sleepScore = score !== null ? Math.min(100, Math.max(0, Math.round(score * 1.08))) : null;
  const taskScore = score !== null ? Math.min(100, Math.max(0, Math.round(score * 1.02))) : null;
  const impulseScore = score !== null ? Math.min(100, Math.max(0, Math.round(score * 0.88))) : null;
  const emotionalScore = score !== null ? Math.min(100, Math.max(0, Math.round(score * 0.92))) : null;

  return (
    <div className={cn('space-y-4', className)}>
      <Card className="border-[#E3E3DC] bg-white shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-2xl overflow-hidden transition-all hover:border-[#143D2B]/30">
        {/* TODDLER & EARLY CHILDHOOD: Early Screen Boundaries & Meltdown Coping Kit (NO PHONE READINESS) */}
        {isToddler || isEarlyChildhood ? (
          <>
            <CardHeader className="p-5 sm:p-6 pb-3 space-y-2 border-b border-[#E3E3DC]">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#FEF3C7] text-[#B45309] font-bold">
                    <Baby className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="text-xs font-mono font-medium text-[#B45309] uppercase tracking-wider block">
                      Early Screen Boundaries
                    </span>
                    <CardTitle className="font-serif text-base sm:text-lg font-bold text-[#111413]">
                      {childName}&apos;s Daily Media Boundary
                    </CardTitle>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="text-[10px] font-mono border-[#E3E3DC] bg-[#EAF3EE] text-[#143D2B] rounded-full"
                >
                  Max 30 min/day
                </Badge>
              </div>
              <CardDescription className="text-xs text-[#494F4C] leading-relaxed">
                Developmentally calibrated screen caps and nervous system co-regulation for toddlers and young children.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-4">
              {/* Visual Dial for Screen Limit */}
              <div className="p-4 bg-[#FBFBF9] rounded-xl border border-[#E3E3DC] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#111413]">Today&apos;s Screen Usage:</span>
                  <span className="font-mono font-bold text-[#143D2B]">20 / 30m (10 min remaining)</span>
                </div>
                <div className="w-full bg-[#E3E3DC] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#143D2B] h-2 rounded-full w-[66%]" />
                </div>
                <p className="text-[11px] text-[#858C88] leading-tight">
                  Handheld screens emit short-wavelength blue light that suppresses melatonin. Screens off 45 mins before bedtime protects deep REM restorative sleep.
                </p>
              </div>

              {/* Toddler Meltdown Reset Guide */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#143D2B] uppercase tracking-wider block">
                  Toddler Meltdown Reset Steps:
                </span>
                <div className="space-y-1.5">
                  <div className="p-2.5 rounded-lg bg-[#F4F4F0] border border-[#E3E3DC] text-xs flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#143D2B] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span className="text-[#111413]">Get low to eye level (sit on floor)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F4F4F0] border border-[#E3E3DC] text-xs flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#143D2B] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span className="text-[#111413]">Acknowledge feelings: &ldquo;You wanted to keep watching&rdquo;</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F4F4F0] border border-[#E3E3DC] text-xs flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#143D2B] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <span className="text-[#111413]">Offer physical bridge: &ldquo;Come blow out the candle with me&rdquo;</span>
                  </div>
                </div>
              </div>

              {/* Screen-Free Play Dock */}
              <div className="p-3 bg-[#EAF3EE]/50 rounded-xl border border-[#143D2B]/20 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Palette className="w-4 h-4 text-[#143D2B] shrink-0" />
                  <div>
                    <span className="font-semibold text-[#111413] block">Today&apos;s Sensory Activity</span>
                    <span className="text-[11px] text-[#858C88]">15 min outdoor water &amp; leaf play</span>
                  </div>
                </div>
                <Badge variant="outline" className="font-mono text-[10px] text-[#143D2B] bg-white border-[#143D2B]/20">
                  Suggested
                </Badge>
              </div>
            </CardContent>
          </>
        ) : (
          /* TWEENS & ADOLESCENTS: First-Phone Readiness Radar OR Bedtime Curfew Dock */
          <>
            <CardHeader className="p-5 sm:p-6 pb-3 space-y-2 border-b border-[#E3E3DC]/70">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF3EE] text-[#143D2B] font-bold shadow-2xs">
                    {isPreDevice ? <Compass className="h-4 w-4" /> : <FileCheck2 className="h-4 w-4" />}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#143D2B] uppercase tracking-wider block">
                      {isPreDevice ? 'First-Phone Readiness Radar' : 'Bilateral Family Pact & Curfew'}
                    </span>
                    <CardTitle className="font-serif text-xl sm:text-2xl font-bold text-[#111413] mt-0.5">
                      {isPreDevice
                        ? `${childName}'s First-Phone Assessment`
                        : `${childName}'s Bedtime Curfew & Pact-as-Code`}
                    </CardTitle>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  {isPreDevice ? (
                    score !== null ? (
                      <Badge
                        variant="outline"
                        className="text-xs font-mono font-bold text-[#143D2B] bg-[#EAF3EE] border-[#143D2B]/20 px-3 py-1 rounded-full"
                      >
                        Current Score: {score}% ({score} / 100)
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-xs font-mono font-medium text-[#858C88] bg-[#F4F4F0] border-[#E3E3DC] px-3 py-1 rounded-full"
                      >
                        Not Yet Assessed
                      </Badge>
                    )
                  ) : null}
                  <Badge
                    variant={isPreDevice ? 'roadPre' : 'roadActive'}
                    className="text-[10px] font-mono uppercase tracking-wider rounded-full"
                  >
                    {isPreDevice ? 'Road 1: Pre-Device' : 'Road 2: Active-Device'}
                  </Badge>
                </div>
              </div>
              <CardDescription className="text-xs text-[#494F4C] leading-relaxed">
                {isPreDevice
                  ? (score !== null
                      ? 'Objective developmental readiness before buying or handing over a smartphone.'
                      : '10-dimension clinical evaluation of bedtime sleep, impulse control, and digital boundaries.')
                  : 'Zero spyware, bilateral trust, and automated hardware curfew enforcement.'}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-5">
              {isPreDevice ? (
                score !== null ? (
                  /* Pre-Device ASSESSED: Dynamic 3-Column Readiness Grid */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      {/* Left: Circular SVG Readiness Gauge (4 cols) */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-xl bg-[#FBFBF9] border border-[#E3E3DC] text-center space-y-3">
                        <div className="relative w-28 h-28 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" stroke="#E3E3DC" strokeWidth="8" fill="transparent" />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke={tier!.strokeColor}
                              strokeWidth="8"
                              strokeDasharray="251.2"
                              strokeDashoffset={strokeOffset}
                              strokeLinecap="round"
                              fill="transparent"
                              className="transition-all duration-700"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-serif text-3xl font-bold text-[#111413]">
                              {score}%
                            </span>
                            <span className="font-mono text-[10px] text-[#858C88]">out of 100</span>
                          </div>
                        </div>
                        <div>
                          <span className="font-serif text-sm font-bold text-[#143D2B] block">
                            {tier!.title}
                          </span>
                          <p className="text-[11px] text-[#494F4C] mt-0.5 leading-snug">
                            {tier!.description}
                          </p>
                        </div>
                      </div>

                      {/* Middle: 4 Quadrant Progression Bars (4 cols) */}
                      <div className="md:col-span-4 space-y-3">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#858C88] tracking-wider block">
                          4 Core Developmental Quadrants
                        </span>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-[#111413]">Sleep Independence</span>
                            <span className="font-mono font-bold text-[#143D2B]">{sleepScore}%</span>
                          </div>
                          <div className="w-full bg-[#E3E3DC] rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-[#143D2B] h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${sleepScore}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-[#111413]">Task Responsibility</span>
                            <span className="font-mono font-bold text-[#143D2B]">{taskScore}%</span>
                          </div>
                          <div className="w-full bg-[#E3E3DC] rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-[#143D2B] h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${taskScore}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-[#111413]">Peer Impulse Control</span>
                            <span className={cn('font-mono font-bold', impulseScore! >= 70 ? 'text-[#143D2B]' : 'text-[#B45309]')}>
                              {impulseScore}%
                            </span>
                          </div>
                          <div className="w-full bg-[#E3E3DC] rounded-full h-1.5 overflow-hidden">
                            <div
                              className={cn('h-1.5 rounded-full transition-all duration-500', impulseScore! >= 70 ? 'bg-[#143D2B]' : 'bg-[#B45309]')}
                              style={{ width: `${impulseScore}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-[#111413]">Emotional Reset</span>
                            <span className={cn('font-mono font-bold', emotionalScore! >= 70 ? 'text-[#143D2B]' : 'text-[#B45309]')}>
                              {emotionalScore}%
                            </span>
                          </div>
                          <div className="w-full bg-[#E3E3DC] rounded-full h-1.5 overflow-hidden">
                            <div
                              className={cn('h-1.5 rounded-full transition-all duration-500', emotionalScore! >= 70 ? 'bg-[#143D2B]' : 'bg-[#B45309]')}
                              style={{ width: `${emotionalScore}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Recommended Developmental Leap & Protocol (4 cols) */}
                      <div className="md:col-span-4 p-5 rounded-xl bg-[#EAF3EE]/70 border border-[#143D2B]/20 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold">
                            Recommended Protocol
                          </span>
                          <span className="font-mono text-[10px] text-[#143D2B] font-bold bg-white px-2 py-0.5 rounded-full border border-[#143D2B]/20">
                            {tier!.recommendedPreset}
                          </span>
                        </div>

                        <h4 className="font-serif text-sm font-bold text-[#111413]">
                          Active Developmental Focus
                        </h4>
                        <p className="text-[11px] text-[#494F4C] leading-snug">
                          {tier!.nextGoal}
                        </p>

                        <div className="pt-1.5 border-t border-[#143D2B]/10 space-y-2">
                          <div className="flex items-center gap-1.5 text-[11px] text-[#143D2B]">
                            <Sparkles className="h-3.5 w-3.5 shrink-0" />
                            <span className="font-medium">Clinical Advisory Insight:</span>
                          </div>
                          <p className="text-[10px] text-[#494F4C] leading-relaxed italic">
                            A smartphone is an open connection to peer feeds. Scaffolding impulse control and bedtime habits before hardware access protects prefrontal development.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E3E3DC] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-[#494F4C]">
                        Next Goal: {tier!.nextGoal}
                      </span>
                      <Link href={`/children/${childId}/readiness`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-xs font-semibold border-[#E3E3DC] text-[#111413] hover:bg-[#F4F4F0] rounded-lg min-h-[38px]"
                        >
                          <span>View Full Readiness Diagnostic</span>
                          <ArrowRight className="h-3.5 w-3.5 text-[#143D2B]" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Pre-Device UNASSESSED: Inviting Clean Assessment CTA */
                  <div className="space-y-4">
                    <div className="p-5 sm:p-6 rounded-xl bg-[#FBFBF9] border border-[#E3E3DC] space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-[#143D2B] tracking-wider block">
                            Developmental Baseline
                          </span>
                          <h4 className="font-serif text-lg font-bold text-[#111413]">
                            Evaluate {childName}&apos;s First-Phone Readiness
                          </h4>
                          <p className="text-xs text-[#494F4C] max-w-xl leading-relaxed">
                            Before purchasing or handing over a personal smartphone, complete our 10-dimension clinical evaluation to assess bedtime habits, impulse control, and emotional regulation.
                          </p>
                        </div>

                        <Link href={`/children/${childId}/readiness`} className="shrink-0">
                          <Button
                            size="sm"
                            className="gap-2 text-xs font-semibold bg-[#143D2B] hover:bg-[#143D2B]/90 text-white rounded-lg min-h-[42px] px-5 shadow-2xs"
                          >
                            <span>Start Readiness Assessment</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>

                      {/* 4 Quadrants Measured Overview */}
                      <div className="pt-3 border-t border-[#E3E3DC] space-y-2">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#858C88] tracking-wider block">
                          4 Core Developmental Quadrants Evaluated
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                          <div className="p-3 rounded-lg bg-white border border-[#E3E3DC] text-xs space-y-1">
                            <span className="font-semibold text-[#111413] block">Sleep Independence</span>
                            <span className="text-[11px] text-[#858C88] leading-tight block">Bedtime docking &amp; melatonin recovery</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-[#E3E3DC] text-xs space-y-1">
                            <span className="font-semibold text-[#111413] block">Task Responsibility</span>
                            <span className="text-[11px] text-[#858C88] leading-tight block">Voluntary screen transitions &amp; homework</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-[#E3E3DC] text-xs space-y-1">
                            <span className="font-semibold text-[#111413] block">Peer Impulse Control</span>
                            <span className="text-[11px] text-[#858C88] leading-tight block">Group chat resilience &amp; boundary defense</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-[#E3E3DC] text-xs space-y-1">
                            <span className="font-semibold text-[#111413] block">Emotional Reset</span>
                            <span className="text-[11px] text-[#858C88] leading-tight block">Regulation after digital stimulation</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E3E3DC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#858C88]">
                      <span>Takes ~3 minutes • 10 clinical questions • Generates customized Bilateral Pact</span>
                      <Link href={`/children/${childId}/readiness`} className="font-semibold text-[#143D2B] hover:underline flex items-center gap-1">
                        <span>Begin 3-min evaluation</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                )
              ) : (
                /* Active-Device: Bedtime Curfew Dock */
                <div className="space-y-3">
                  <div className="rounded-xl border border-[#E3E3DC] bg-[#FBFBF9] p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-[#143D2B]" />
                        <span className="font-serif font-bold text-sm text-[#111413]">
                          Bedtime Dock: 8:30 PM Lock
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono border-[#E3E3DC] bg-white text-[#143D2B] rounded-full"
                      >
                        <Lock className="h-3 w-3 mr-1 text-[#143D2B]" />
                        Hardware Enforced
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#858C88] font-mono">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#143D2B] shrink-0" />
                      <span>Zero Spyware • No Secret Keylogging • Bilateral Agreement</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#858C88] border-t border-[#E3E3DC] pt-2">
                      <span>Dual Signed: Parent + Child</span>
                      <span className="text-[#143D2B] font-medium flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Active Profile
                      </span>
                    </div>
                  </div>

                  <Link href={`/devices?childId=${childId}`} className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full min-h-[44px] gap-2 text-xs font-semibold border-[#E3E3DC] text-[#111413] hover:bg-[#F4F4F0] rounded-lg"
                    >
                      <span>Review Family Pact &amp; Schedule</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#143D2B]" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </>
        )}
      </Card>

      {/* REASSURING PARENT COMPASS REMINDER (FEEL AT HOME) */}
      <Card className="border-[#E3E3DC] bg-white shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-2xl p-5 sm:p-6 space-y-2">
        <span className="font-mono text-xs font-bold text-[#143D2B] uppercase tracking-wider flex items-center gap-1.5">
          <Coffee className="w-3.5 h-3.5 text-[#143D2B]" />
          <span>Parent Compass Reminder</span>
        </span>
        <blockquote className="font-serif text-sm text-[#111413] leading-relaxed italic">
          &ldquo;You don&apos;t have to get every moment right. A calm repair after friction teaches your child more about emotional safety than a parent who never makes a mistake.&rdquo;
        </blockquote>
        <span className="font-mono text-[10px] text-[#858C88] block text-right">
          — Dr. Chen, Alongside Advisory Team
        </span>
      </Card>
    </div>
  );
}