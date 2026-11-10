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
  Check,
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

  // State for interactive 14-day alarm streak toggle
  const [day10Done, setDay10Done] = React.useState(false);

  const currentScore = day10Done ? 80 : 78;
  const strokeOffset = day10Done ? 50.2 : 55.2;

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
                  <Badge
                    variant="outline"
                    className="text-xs font-mono font-bold text-[#143D2B] bg-[#EAF3EE] border-[#143D2B]/20 px-3 py-1 rounded-full"
                  >
                    Current Score: {currentScore}% (78 / 100)
                  </Badge>
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
                  ? 'Objective developmental readiness before buying or handing over a smartphone.'
                  : 'Zero spyware, bilateral trust, and automated hardware curfew enforcement.'}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-5">
              {isPreDevice ? (
                /* Pre-Device: Full-Width 3-Column Readiness Grid */
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
                            stroke="#143D2B"
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
                            {currentScore}%
                          </span>
                          <span className="font-mono text-[10px] text-[#858C88]">out of 100</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-serif text-sm font-bold text-[#143D2B] block">
                          Approaching Smartphone Readiness
                        </span>
                        <p className="text-[11px] text-[#494F4C] mt-0.5 leading-snug">
                          Demonstrates strong prefrontal habits; working through morning autonomy milestone.
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
                          <span className="font-mono font-bold text-[#143D2B]">90%</span>
                        </div>
                        <div className="w-full bg-[#E3E3DC] rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#143D2B] h-1.5 rounded-full w-[90%]" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-[#111413]">Task Responsibility</span>
                          <span className="font-mono font-bold text-[#143D2B]">85%</span>
                        </div>
                        <div className="w-full bg-[#E3E3DC] rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#143D2B] h-1.5 rounded-full w-[85%]" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-[#111413]">Peer Impulse Control</span>
                          <span className="font-mono font-bold text-[#B45309]">65%</span>
                        </div>
                        <div className="w-full bg-[#E3E3DC] rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#B45309] h-1.5 rounded-full w-[65%]" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-[#111413]">Emotional Reset</span>
                          <span className="font-mono font-bold text-[#B45309]">70%</span>
                        </div>
                        <div className="w-full bg-[#E3E3DC] rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#B45309] h-1.5 rounded-full w-[70%]" />
                        </div>
                      </div>
                    </div>

                    {/* Right: Active Milestone Interactive Tracker (4 cols) */}
                    <div className="md:col-span-4 p-5 rounded-xl bg-[#EAF3EE]/70 border border-[#143D2B]/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold">
                          Active Milestone Gate
                        </span>
                        <span className="font-mono text-[10px] text-[#143D2B] font-bold bg-white px-2 py-0.5 rounded-full border border-[#143D2B]/20">
                          Gate #2
                        </span>
                      </div>

                      <h4 className="font-serif text-sm font-bold text-[#111413]">
                        14 Days Independent Morning Alarm Waking
                      </h4>
                      <p className="text-[11px] text-[#494F4C] leading-snug">
                        Next Goal: 2 weeks alarm waking before introducing personal notifications.
                      </p>

                      {/* Interactive 14-Day Grid */}
                      <div className="pt-1 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#494F4C]">
                          <span>Progress Streak:</span>
                          <span className="font-bold text-[#143D2B]">
                            {day10Done ? 'Day 10 of 14 Completed!' : 'Day 9 of 14 Completed'}
                          </span>
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                            <span
                              key={d}
                              className="w-6 h-6 rounded-md bg-[#143D2B] text-white text-[10px] font-bold flex items-center justify-center shadow-2xs"
                            >
                              ✓
                            </span>
                          ))}
                          <button
                            type="button"
                            onClick={() => setDay10Done((prev) => !prev)}
                            className={cn(
                              'w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center transition cursor-pointer border',
                              day10Done
                                ? 'bg-[#143D2B] text-white border-[#143D2B]'
                                : 'bg-white border-[#143D2B]/40 text-[#143D2B] hover:bg-[#EAF3EE]'
                            )}
                            title="Click to toggle today's alarm success!"
                          >
                            {day10Done ? '✓' : '10'}
                          </button>
                          {[11, 12, 13, 14].map((d) => (
                            <span
                              key={d}
                              className="w-6 h-6 rounded-md bg-[#F4F4F0] border border-[#E3E3DC] text-[#858C88] text-[10px] flex items-center justify-center"
                            >
                              {d}
                            </span>
                          ))}
                        </div>

                        <p className="text-[10px] text-[#858C88] italic">
                          {day10Done
                            ? 'Awesome! Day 10 logged. Score jumped from 78% to 80%!'
                            : 'Tap day 10 above to record today’s alarm success!'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E3E3DC] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-[#494F4C]">
                      Next Goal: 2 weeks alarm waking
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