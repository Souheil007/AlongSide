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

export interface ResetGuideStep {
  num: number;
  title: string;
  description: string;
}

export interface ResetGuide {
  title: string;
  steps: ResetGuideStep[];
}

export const RESET_GUIDES: Record<'infant' | 'toddler' | 'earlyChildhood', ResetGuide> = {
  infant: {
    title: 'Infant Overstimulation Calming Steps:',
    steps: [
      {
        num: 1,
        title: 'Lower ambient input',
        description: 'Dim bright overhead lights, quiet devices, and soften your tone.',
      },
      {
        num: 2,
        title: 'Chest-to-chest somatic anchor',
        description: 'Hold baby firmly upright against your chest so they feel your steady heartbeat.',
      },
      {
        num: 3,
        title: 'Rhythmic shushing & slow sway',
        description: 'Auditory white-noise shushing paired with gentle swaying resets the vagal nerve.',
      },
    ],
  },
  toddler: {
    title: 'Toddler Meltdown Reset Steps:',
    steps: [
      {
        num: 1,
        title: 'Get low to eye level (sit on floor)',
        description: 'Sit on the floor so your body is below theirs, instantly reducing perceived threat.',
      },
      {
        num: 2,
        title: 'Acknowledge feelings: “You wanted to keep watching”',
        description: 'Name the reality: “You wanted to keep watching. It is hard to stop.”',
      },
      {
        num: 3,
        title: 'Offer physical bridge: “Come blow out the candle with me”',
        description: 'Introduce a physical breath bridge: “Come blow out the imaginary candle with me.”',
      },
    ],
  },
  earlyChildhood: {
    title: 'Preschool Regulation & Agency Steps:',
    steps: [
      {
        num: 1,
        title: 'Validate without negotiating',
        description: 'Acknowledge disappointment: “I hear you. It feels frustrating when fun pauses.”',
      },
      {
        num: 2,
        title: 'Firm, loving boundary container',
        description: 'Reassure certainty: “Our media window is closed for today. Tomorrow is a new day.”',
      },
      {
        num: 3,
        title: 'Provide 2 agency choices',
        description: 'Offer real power: “Do you want to press the power button, or choose our bedtime book?”',
      },
    ],
  },
};

export interface SensoryActivity {
  title: string;
  duration: string;
  description: string;
}

export const INFANT_SENSORY_ACTIVITIES: SensoryActivity[] = [
  {
    title: 'High-Contrast Card Tracking',
    duration: '10 min',
    description: 'Black-and-white visual tracking to stimulate optic nerve myelination.',
  },
  {
    title: 'Tummy Time Mirror Reflection Play',
    duration: '10 min',
    description: 'Strengthens cervical neck extensor muscles and self-recognition.',
  },
  {
    title: 'Textured Fabric Sensory Grasp',
    duration: '15 min',
    description: 'Silk, cotton, and knitted ribbons for tactile palmar grasp reflex.',
  },
  {
    title: 'Warm Water Sponge Dabbing',
    duration: '15 min',
    description: 'Gentle temperature contrast on hands and feet for somatosensory grounding.',
  },
  {
    title: 'Rhythmic Bell & Soft Chime Localization',
    duration: '10 min',
    description: 'Moving soft sounds side-to-side to train binaural auditory orientation.',
  },
  {
    title: 'Gentle Foot Massage & Bicycle Legs',
    duration: '10 min',
    description: 'Stimulates vestibular proprioception and eases infant abdominal tension.',
  },
  {
    title: 'Crinkle Paper Grasp & Release',
    duration: '10 min',
    description: 'Auditory cause-and-effect feedback with safe tactile resistance.',
  },
];

export const TODDLER_SENSORY_ACTIVITIES: SensoryActivity[] = [
  {
    title: '15 min outdoor water & leaf play',
    duration: '15 min',
    description: 'Pouring, scooping, and floating natural elements for bilateral hand coordination.',
  },
  {
    title: 'Dry Oatmeal & Spoon Scoop Bin',
    duration: '15 min',
    description: 'Deep proprioceptive hand burying and transferring without overstimulation.',
  },
  {
    title: 'Painter’s Tape Floor Animal Rescue',
    duration: '20 min',
    description: 'Peeling tape off toy animals builds pincer grasp and focused persistence.',
  },
  {
    title: 'Warm & Cool Ice Cube Sensory Melt',
    duration: '15 min',
    description: 'Thermal discovery as colored ice cubes melt in warm water.',
  },
  {
    title: 'Texture Trail: Carpet, Tile & Soft Blankets',
    duration: '15 min',
    description: 'Barefoot navigation across contrasting surfaces for vestibular grounding.',
  },
  {
    title: 'Cardboard Box Tunnel Crawl',
    duration: '20 min',
    description: 'Full-body spatial awareness and proprioceptive joint compression.',
  },
  {
    title: 'Herbal Scent Jar Sniff & Match',
    duration: '10 min',
    description: 'Rosemary, cinnamon, and mint olfactory exploration calming the limbic system.',
  },
];

export const EARLY_CHILDHOOD_SENSORY_ACTIVITIES: SensoryActivity[] = [
  {
    title: 'Hallway Painter’s Tape Laser Maze',
    duration: '20 min',
    description: 'Crawling over and under taped lines for motor planning and balance.',
  },
  {
    title: 'Cardboard Gravity Marble Run',
    duration: '25 min',
    description: 'Assembling tubes with tape to explore kinetic momentum and physics.',
  },
  {
    title: 'Sunlight Shadow Animal Tracing',
    duration: '20 min',
    description: 'Drawing chalk silhouettes around toy shadows outside or near windows.',
  },
  {
    title: 'Living Room Pillow Lava Obstacle Course',
    duration: '25 min',
    description: 'Dynamic balance and motor agility burning excess late-afternoon cortisol.',
  },
  {
    title: 'Playdough Scent & Texture Sculpting',
    duration: '20 min',
    description: 'Deep hand squeezing and rolling for emotional down-regulation.',
  },
  {
    title: 'Secret Sound Shaker Matching Game',
    duration: '15 min',
    description: 'Pairing sealed containers filled with rice, beans, or coins by sound alone.',
  },
  {
    title: 'Floating Paperclip Surface Tension Lab',
    duration: '15 min',
    description: 'Gentle science exploration training fine motor stillness and focus.',
  },
];

export function getEarlyTierResetGuide(isInfant: boolean, isToddler: boolean): ResetGuide {
  if (isInfant) return RESET_GUIDES.infant;
  if (isToddler) return RESET_GUIDES.toddler;
  return RESET_GUIDES.earlyChildhood;
}

export function getDailySensoryActivity(isInfant: boolean, isToddler: boolean, customDate?: Date): SensoryActivity {
  const date = customDate ?? new Date();
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const pool = isInfant ? INFANT_SENSORY_ACTIVITIES : isToddler ? TODDLER_SENSORY_ACTIVITIES : EARLY_CHILDHOOD_SENSORY_ACTIVITIES;
  return pool[dayOfYear % pool.length]!;
}

export function BilateralPactStatusCard({
  child,
  className,
}: BilateralPactStatusCardProps) {
  const childAge = child?.age ?? 10;
  const isInfant = childAge <= 1;
  const isToddler = (childAge >= 2 && childAge <= 3) || String(child?.developmentalTier || '').includes('TIER_0');
  const isEarlyChildhood = (childAge >= 4 && childAge <= 6) || String(child?.developmentalTier || '').includes('TIER_1');
  const isEarlyTier = isInfant || isToddler || isEarlyChildhood;
  const isPreDevice = child?.roadType === RoadType.PRE_DEVICE;
  const childName = child?.name ?? 'Child';
  const childId = child?.id ?? 'default';

  // Age-calibrated pediatric media guidance (AAP standards)
  let mediaLimitBadge = 'Max 30 min/day';
  let mediaLimitLabel = 'Pediatric Guideline: Max 30 min/day';
  let mediaInsight = 'Handheld screens emit short-wavelength blue light that suppresses melatonin. Screens off 45 mins before bedtime protects deep REM restorative sleep.';

  if (isInfant) {
    mediaLimitBadge = 'Screen-Free Zone';
    mediaLimitLabel = 'AAP Guideline: Screen-Free (0 min/day)';
    mediaInsight = 'Infant visual cortex and circadian clocks develop best through direct eye contact, responsive vocal play, and natural lighting. Video calls with family are the only recommended screen exposure.';
  } else if (isEarlyChildhood) {
    mediaLimitBadge = 'Max 60 min/day';
    mediaLimitLabel = 'Pediatric Guideline: Max 60 min/day';
    mediaInsight = 'Predictable media routines prevent transition struggles and protect evening cortisol drop before sleep. Always co-view high-quality interactive content and turn screens off 45 mins before bedtime.';
  }

  const resetGuide = getEarlyTierResetGuide(isInfant, isToddler);
  const sensoryActivity = getDailySensoryActivity(isInfant, isToddler);

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
      <Card className="border border-white/90 bg-white/75 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(20,61,43,0.05)] rounded-[2.5rem] overflow-hidden transition-all hover:border-[#143D2B]/30">
        {/* TODDLER & EARLY CHILDHOOD: Early Screen Boundaries & Meltdown Coping Kit (NO PHONE READINESS) */}
        {isEarlyTier ? (
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
                  {mediaLimitBadge}
                </Badge>
              </div>
              <CardDescription className="text-xs text-[#494F4C] leading-relaxed">
                Developmentally calibrated screen caps and nervous system co-regulation for young children.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-4">
              {/* Clean Pediatric Standard (No Fake Usage Telemetry) */}
              <div className="p-4 bg-[#FBFBF9] rounded-xl border border-[#E3E3DC] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#111413]">{mediaLimitLabel}</span>
                  <span className="font-mono text-[11px] text-[#143D2B] font-bold">Co-Viewing Standard</span>
                </div>
                <p className="text-[11px] text-[#494F4C] leading-relaxed">
                  {mediaInsight}
                </p>
              </div>

              {/* Stage-Calibrated Reset Guide */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#143D2B] uppercase tracking-wider block">
                  {resetGuide.title}
                </span>
                <div className="space-y-1.5">
                  {resetGuide.steps.map((s) => (
                    <div
                      key={s.num}
                      className="p-2.5 rounded-lg bg-[#F4F4F0] border border-[#E3E3DC] text-xs flex items-center gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#143D2B] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {s.num}
                      </span>
                      <span className="text-[#111413]">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Screen-Free Play Dock linked to Brain Games */}
              <Link href={`/brain-games?childId=${childId}`} className="block group">
                <div className="p-3 bg-[#EAF3EE]/50 hover:bg-[#EAF3EE] transition rounded-xl border border-[#143D2B]/20 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Palette className="w-4 h-4 text-[#143D2B] shrink-0" />
                    <div>
                      <span className="font-semibold text-[#111413] group-hover:text-[#143D2B] transition block">
                        Today&apos;s Sensory Activity ({sensoryActivity.duration})
                      </span>
                      <span className="text-[11px] text-[#494F4C]">
                        {sensoryActivity.title} • {sensoryActivity.description}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px] text-[#143D2B] bg-white border-[#143D2B]/20 shrink-0">
                    Explore →
                  </Badge>
                </div>
              </Link>
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
                        ? (score !== null
                            ? `${childName}'s First-Phone Assessment`
                            : `Evaluate ${childName}'s First-Phone Readiness`)
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
                      : '10-dimension developmental evaluation of bedtime sleep, impulse control, and digital boundaries.')
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
                            <span className="font-medium">Advisory Insight:</span>
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
                  /* Pre-Device UNASSESSED: Dynamic Live Radar Awaiting Calibration */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center p-5 rounded-xl bg-[#FBFBF9] border border-[#E3E3DC]">
                      {/* Left: Animated Radial Radar Gauge (Awaiting Baseline) */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-[#E3E3DC] text-center space-y-3 shadow-2xs">
                        <div className="relative w-28 h-28 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" stroke="#E3E3DC" strokeWidth="6" fill="transparent" />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="#10B981"
                              strokeWidth="6"
                              strokeDasharray="14 10"
                              fill="transparent"
                              className="animate-[spin_16s_linear_infinite]"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Compass className="w-6 h-6 text-[#143D2B] animate-pulse" />
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#858C88] font-bold mt-1">
                              Radar Ready
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF3EE] text-[#143D2B] text-[10px] font-mono font-bold border border-[#143D2B]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Awaiting Baseline
                          </span>
                        </div>
                      </div>

                      {/* Right: Low-Text, High-Action Diagnostic Panel */}
                      <div className="md:col-span-8 flex flex-col justify-between space-y-3.5">
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-[#143D2B] tracking-wider block">
                            Developmental Baseline
                          </span>
                          <h4 className="font-serif text-base sm:text-lg font-bold text-[#111413]">
                            Evaluate {childName}&apos;s First-Phone Readiness
                          </h4>
                          <p className="text-xs text-[#494F4C] leading-relaxed">
                            10 real-world scenarios evaluating bedtime sleep, impulse control, and digital boundaries before getting a personal phone.
                          </p>
                        </div>

                        {/* 4 Quadrants as Clean Visual Chips */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E3E3DC] text-xs font-medium text-[#111413] shadow-2xs">
                            <span>🌙</span>
                            <span>Sleep Independence</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E3E3DC] text-xs font-medium text-[#111413] shadow-2xs">
                            <span>📚</span>
                            <span>Task Responsibility</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E3E3DC] text-xs font-medium text-[#111413] shadow-2xs">
                            <span>👥</span>
                            <span>Peer Impulse Control</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E3E3DC] text-xs font-medium text-[#111413] shadow-2xs">
                            <span>🧘</span>
                            <span>Emotional Reset</span>
                          </span>
                        </div>

                        {/* Primary Action Button */}
                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <Link href={`/children/${childId}/readiness`} className="shrink-0">
                            <Button
                              className="gap-2 text-xs font-semibold bg-[#143D2B] hover:bg-[#0E2B1E] text-white rounded-xl min-h-[44px] px-6 shadow-2xs cursor-pointer"
                            >
                              <span>Start Readiness Assessment</span>
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                          <span className="font-mono text-[11px] text-[#858C88]">
                            Takes ~3 mins • 10 questions
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Guarantee */}
                    <div className="pt-2 border-t border-[#E3E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#858C88] font-mono">
                      <span>Takes ~3 minutes • 10 developmental questions • Generates customized Bilateral Pact</span>
                      <span className="text-[#143D2B] font-medium">Zero surveillance • Bilateral collaboration</span>
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
    </div>
  );
}