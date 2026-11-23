'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  type ChildDTO,
  RoadType,
} from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface BilateralPactStatusCardProps {
  child: ChildDTO | null;
  className?: string;
}

function formatDisplayName(rawName?: string | null): string {
  const trimmed = rawName?.trim();
  if (!trimmed) return 'Your child';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function getReadinessTier(score: number) {
  if (score >= 80) {
    return {
      title: 'Ready for a bilateral pact',
      presetLabel: 'Autonomy Pact',
      nextGoal: 'Strong everyday habits are in place. Co-sign a Family Pact and bedtime dock together.',
    };
  }
  if (score >= 60) {
    return {
      title: 'Ready with calm guardrails',
      presetLabel: 'Bridge Pact',
      nextGoal: 'Solid foundation—pair clear transitions with a guided Family Pact.',
    };
  }
  return {
    title: 'Practice habits first',
    presetLabel: 'Starter Pact',
    nextGoal: 'Build steady sleep and screen-off routines on shared devices before a personal phone.',
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
    title: 'Infant Calming Reset',
    steps: [
      {
        num: 1,
        title: 'Lower ambient input',
        description: 'Dim overhead lights, quiet devices, and soften your voice.',
      },
      {
        num: 2,
        title: 'Hold chest-to-chest',
        description: 'Let baby rest upright against your chest to match your heartbeat.',
      },
      {
        num: 3,
        title: 'Slow sway and gentle shush',
        description: 'Rhythmic motion and steady sound settle an overwhelmed nervous system.',
      },
    ],
  },
  toddler: {
    title: 'Toddler Meltdown Reset',
    steps: [
      {
        num: 1,
        title: 'Sit on the floor below eye level',
        description: 'Lower your posture so your presence feels calm and safe.',
      },
      {
        num: 2,
        title: 'Name the feeling',
        description: '“You wanted to keep watching. Stopping is hard.”',
      },
      {
        num: 3,
        title: 'Offer a physical bridge',
        description: '“Come blow out the imaginary candle with me.”',
      },
    ],
  },
  earlyChildhood: {
    title: 'Preschool Transition Reset',
    steps: [
      {
        num: 1,
        title: 'Validate without negotiating',
        description: '“I hear you—pausing fun feels frustrating.”',
      },
      {
        num: 2,
        title: 'Hold one clear boundary',
        description: '“Our screen window is closed for today. Tomorrow is fresh.”',
      },
      {
        num: 3,
        title: 'Offer two real choices',
        description: '“Press the power button, or pick our bedtime book?”',
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

export function getDailySensoryActivity(
  isInfant: boolean,
  isToddler: boolean,
  customDate?: Date
): SensoryActivity {
  const date = customDate ?? new Date();
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
  );
  const pool = isInfant
    ? INFANT_SENSORY_ACTIVITIES
    : isToddler
      ? TODDLER_SENSORY_ACTIVITIES
      : EARLY_CHILDHOOD_SENSORY_ACTIVITIES;
  return pool[dayOfYear % pool.length]!;
}

interface RadarAxis {
  label: string;
  angle: number;
  multiplier: number;
  ghostFrac: number;
  tx: number;
  ty: number;
  anchor: 'start' | 'middle' | 'end';
}

const RADAR_AXES: RadarAxis[] = [
  { label: 'Bedtime', angle: -90, multiplier: 1.08, ghostFrac: 0.68, tx: 205, ty: 24, anchor: 'middle' },
  { label: 'Transitions', angle: -30, multiplier: 1.02, ghostFrac: 0.56, tx: 286, ty: 80, anchor: 'start' },
  { label: 'Safety', angle: 30, multiplier: 0.94, ghostFrac: 0.62, tx: 286, ty: 174, anchor: 'start' },
  { label: 'Peer Pressure', angle: 90, multiplier: 0.86, ghostFrac: 0.52, tx: 205, ty: 228, anchor: 'middle' },
  { label: 'Reset', angle: 150, multiplier: 0.92, ghostFrac: 0.64, tx: 124, ty: 174, anchor: 'end' },
  { label: 'Trust', angle: 210, multiplier: 1.04, ghostFrac: 0.58, tx: 124, ty: 80, anchor: 'end' },
];

const RADAR_CX = 205;
const RADAR_CY = 124;
const RADAR_R = 80;

function polarPoint(angleDeg: number, frac: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [
    Number((RADAR_CX + RADAR_R * frac * Math.cos(rad)).toFixed(1)),
    Number((RADAR_CY + RADAR_R * frac * Math.sin(rad)).toFixed(1)),
  ];
}

function QuietReadinessRadar({
  score,
  childName,
}: {
  score: number | null;
  childName: string;
}) {
  const isAssessed = score !== null;

  const points = RADAR_AXES.map((axis) => {
    const val = isAssessed
      ? Math.min(100, Math.max(0, Math.round(score * axis.multiplier)))
      : Math.round(axis.ghostFrac * 100);
    const visualFrac = isAssessed ? Math.max(0.28, val / 100) : axis.ghostFrac;
    const [x, y] = polarPoint(axis.angle, visualFrac);
    return { ...axis, val, x, y };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg
      viewBox="0 0 410 246"
      role="img"
      aria-label={
        isAssessed
          ? `${childName}'s readiness radar showing an overall score of ${score} out of 100`
          : `${childName}'s readiness radar awaiting baseline assessment`
      }
      className="w-full max-w-[395px] h-auto select-none"
    >
      <circle cx={RADAR_CX} cy={RADAR_CY} r="90" fill="#FAF8F3" />

      {/* Concentric hairline rings */}
      {[0.33, 0.66, 1].map((ring) => (
        <polygon
          key={ring}
          points={RADAR_AXES.map((a) => polarPoint(a.angle, ring).join(',')).join(' ')}
          fill="none"
          stroke="#E4E1D8"
          strokeWidth="1"
        />
      ))}

      {/* Axis spokes */}
      {RADAR_AXES.map((axis) => {
        const [x, y] = polarPoint(axis.angle, 1);
        return (
          <line
            key={axis.label}
            x1={RADAR_CX}
            y1={RADAR_CY}
            x2={x}
            y2={y}
            stroke="#EAE7DF"
            strokeWidth="1"
          />
        );
      })}

      {/* Ghost outline (unassessed) or filled spruce polygon (assessed) */}
      <polygon
        points={polygonPoints}
        fill={isAssessed ? 'rgba(20, 61, 43, 0.16)' : 'rgba(20, 61, 43, 0.06)'}
        stroke="#143D2B"
        strokeOpacity={isAssessed ? 1 : 0.45}
        strokeWidth={isAssessed ? 2 : 1.5}
        strokeDasharray={isAssessed ? undefined : '4 4'}
        className="transition-[fill,stroke-opacity] duration-300"
      />

      {/* Vertex nodes */}
      {points.map((p) => {
        const isGrowth = isAssessed && p.val < 70;
        return (
          <circle
            key={p.label}
            cx={p.x}
            cy={p.y}
            r={isAssessed ? 3.8 : 3.2}
            fill={isAssessed ? (isGrowth ? '#B45309' : '#143D2B') : '#FFFFFF'}
            stroke={isAssessed ? '#FFFFFF' : '#143D2B'}
            strokeOpacity={isAssessed ? 1 : 0.55}
            strokeWidth="1.5"
          />
        );
      })}

      {/* Center score medallion */}
      <circle
        cx={RADAR_CX}
        cy={RADAR_CY}
        r={isAssessed ? 22 : 24}
        fill={isAssessed ? '#FFFFFF' : '#FAF8F3'}
        stroke="#E4E1D8"
        strokeWidth="1"
      />
      {isAssessed ? (
        <text
          x={RADAR_CX}
          y={RADAR_CY + 6}
          textAnchor="middle"
          fill="#143D2B"
          fontSize="18"
          fontWeight="600"
          className="font-serif tabular-nums"
        >
          {score}
        </text>
      ) : (
        <>
          <text
            x={RADAR_CX}
            y={RADAR_CY + 2}
            textAnchor="middle"
            fill="#143D2B"
            fontSize="17"
            fontWeight="600"
            className="font-serif"
          >
            —
          </text>
          <text
            x={RADAR_CX}
            y={RADAR_CY + 14}
            textAnchor="middle"
            fill="#858C88"
            fontSize="8.5"
            className="font-mono"
          >
            / 100
          </text>
        </>
      )}

      {/* Perimeter axis labels */}
      {points.map((p) => {
        const isGrowth = isAssessed && p.val < 70;
        return (
          <text
            key={p.label}
            x={p.tx}
            y={p.ty}
            textAnchor={p.anchor}
            fill={isGrowth ? '#B45309' : '#494F4C'}
            fontSize="11.5"
            fontWeight={isGrowth ? '600' : '500'}
            className="tabular-nums"
          >
            {isAssessed ? `${p.label} · ${p.val}` : p.label}
          </text>
        );
      })}
    </svg>
  );
}

function QuietBedtimeDial() {
  return (
    <svg
      viewBox="0 0 360 220"
      role="img"
      aria-label="Bedtime dock active from 8:30 PM to 7:00 AM"
      className="w-full max-w-[340px] h-auto select-none"
    >
      <circle cx="180" cy="110" r="88" fill="#FAF8F3" />
      <circle cx="180" cy="110" r="72" fill="none" stroke="#E4E1D8" strokeWidth="6" />
      {/* Evening-to-morning sleep arc (approx 44% of 24h cycle) */}
      <circle
        cx="180"
        cy="110"
        r="72"
        fill="none"
        stroke="#143D2B"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="198 255"
        transform="rotate(-115 180 110)"
      />
      <text
        x="180"
        y="105"
        textAnchor="middle"
        fill="#131715"
        fontSize="26"
        fontWeight="500"
        className="font-serif tabular-nums"
      >
        8:30 PM
      </text>
      <text
        x="180"
        y="125"
        textAnchor="middle"
        fill="#6C7570"
        fontSize="11"
        fontWeight="500"
      >
        Locks until 7:00 AM
      </text>
      <text
        x="180"
        y="144"
        textAnchor="middle"
        fill="#143D2B"
        fontSize="10"
        fontWeight="600"
        className="font-mono"
      >
        HARDWARE ENFORCED
      </text>
    </svg>
  );
}

export function BilateralPactStatusCard({
  child,
  className,
}: BilateralPactStatusCardProps) {
  const childAge = child?.age ?? 10;
  const isInfant = childAge <= 1;
  const isToddler =
    (childAge >= 2 && childAge <= 3) ||
    String(child?.developmentalTier || '').includes('TIER_0');
  const isEarlyChildhood =
    (childAge >= 4 && childAge <= 6) ||
    String(child?.developmentalTier || '').includes('TIER_1_EARLY');
  const isEarlyTier = isInfant || isToddler || isEarlyChildhood;
  const isPreDevice = child?.roadType === RoadType.PRE_DEVICE;
  const childName = formatDisplayName(child?.name);
  const childId = child?.id ?? 'default';

  // Concise AAP-aligned daily screen guidance for early tiers (Ages 0–6)
  const earlyCap = isInfant
    ? {
        figure: '0m',
        unit: 'per day',
        standard: 'Screen-Free Zone',
        sleepNote: 'Video calls with family only · Eye contact & natural light',
      }
    : isEarlyChildhood
      ? {
          figure: '60m',
          unit: 'max / day',
          standard: 'Co-Viewed Media',
          sleepNote: 'Screens off 45 min before sleep',
        }
      : {
          figure: '30m',
          unit: 'max / day',
          standard: 'Co-Viewed Media',
          sleepNote: 'Screens off 45 min before sleep',
        };

  const resetGuide = getEarlyTierResetGuide(isInfant, isToddler);
  const sensoryActivity = getDailySensoryActivity(isInfant, isToddler);

  const hasAssessment =
    typeof child?.latestAssessmentScore === 'number' &&
    !Number.isNaN(child.latestAssessmentScore);
  const score = hasAssessment
    ? Math.min(100, Math.max(0, Math.round(child!.latestAssessmentScore!)))
    : null;
  const tier = score !== null ? getReadinessTier(score) : null;

  return (
    <section
      aria-label={
        isEarlyTier
          ? `${childName}'s Daily Media Boundary`
          : isPreDevice
            ? `${childName}'s First-Phone Readiness`
            : `${childName}'s Bedtime Dock`
      }
      className={cn(
        'rounded-[2rem] border border-[#143D2B]/10 bg-white shadow-[0_14px_40px_-10px_rgba(20,61,43,0.08)] p-6 sm:p-9 lg:px-11 transition-colors hover:border-[#143D2B]/20',
        className
      )}
    >
      {isEarlyTier ? (
        /* AGES 0–6: Quiet Early Screen Boundaries & 3-Step Calm Reset */
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-center">
          {/* Left: Sculptural Daily Cap + Screen-Free Play Link */}
          <div className="flex flex-col gap-5">
            <div className="space-y-2">
              <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#143D2B]">
                Early Screen Boundaries
              </span>
              <h2 className="font-serif text-[28px] sm:text-[34px] font-medium leading-[1.12] tracking-[-0.02em] text-[#131715]">
                {childName}&apos;s Daily Media Boundary
              </h2>
            </div>

            {/* Single Calm Daily Cap Readout */}
            <div className="flex items-center gap-5 py-4 border-y border-[#ECE8DF]">
              <div className="shrink-0">
                <span className="font-serif text-[40px] sm:text-[44px] font-medium leading-none tracking-[-0.02em] text-[#143D2B] tabular-nums block">
                  {earlyCap.figure}
                </span>
                <span className="font-mono text-[10.5px] text-[#7A827D] block mt-1">
                  {earlyCap.unit}
                </span>
              </div>
              <div className="h-10 w-px bg-[#E6E2D8] shrink-0" aria-hidden="true" />
              <div className="space-y-0.5 min-w-0">
                <p className="text-[14px] font-semibold text-[#131715]">
                  {earlyCap.standard}
                </p>
                <p className="text-[13px] text-[#5B645F] leading-snug">
                  {earlyCap.sleepNote}
                </p>
              </div>
            </div>

            {/* Today's Screen-Free Play CTA */}
            <div className="space-y-3">
              <p className="text-[13.5px] text-[#494F4C] leading-snug">
                <span className="font-medium text-[#131715]">Today&apos;s play:</span>{' '}
                {sensoryActivity.title}{' '}
                <span className="text-[#7A827D] tabular-nums">({sensoryActivity.duration})</span>
              </p>

              <Link
                href="/digest#play-this-week"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-full bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-[13.5px] font-semibold transition-colors w-fit"
              >
                <span>Explore screen-free play</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right: Warm Parchment 3-Step Meltdown Reset */}
          <div className="rounded-[1.5rem] bg-[#FAF8F3] p-6 sm:p-7 space-y-4">
            <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B45309]">
              {resetGuide.title}
            </span>

            <ol className="divide-y divide-[#E8E4DA]">
              {resetGuide.steps.map((step) => (
                <li
                  key={step.num}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#143D2B] text-white font-mono text-[11px] font-semibold tabular-nums">
                    {step.num}
                  </span>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-[14px] font-semibold text-[#131715] leading-snug">
                      {step.title}
                    </p>
                    <p className="text-[13px] text-[#5B645F] leading-snug">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : isPreDevice ? (
        /* AGES 7+ ROAD 1: Option 3 — Quiet Geometric Readiness Radar */
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-10 items-center">
          {score === null ? (
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#143D2B]">
                Road 1 · Pre-Device
              </span>

              <h2 className="font-serif text-[28px] sm:text-[34px] font-medium leading-[1.12] tracking-[-0.02em] text-[#131715]">
                {childName}&apos;s First-Phone Readiness
              </h2>

              <p className="text-[14.5px] leading-relaxed text-[#494F4C] max-w-[38ch]">
                10 quick scenarios to see where {childName} is ready—and what to practice first.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/children/${childId}/readiness`}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-full bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-[13.5px] font-semibold transition-colors"
                >
                  <span>Start 3-min check</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <span className="text-[12.5px] text-[#7A827D]">
                  Zero surveillance
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#143D2B]">
                First-Phone Readiness · {tier!.presetLabel}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif text-[42px] sm:text-[48px] font-medium leading-none tracking-[-0.02em] text-[#143D2B] tabular-nums">
                  {score}
                </span>
                <span className="text-[14.5px] text-[#6C7570] tabular-nums">
                  / 100 · {tier!.title}
                </span>
              </div>

              <p className="text-[14.5px] leading-relaxed text-[#494F4C] max-w-[40ch]">
                {tier!.nextGoal}
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  href={`/pacts/builder?childId=${childId}`}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-full bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-[13.5px] font-semibold transition-colors"
                >
                  <span>Build {childName}&apos;s Pact</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={`/children/${childId}/readiness`}
                  className="text-[13px] font-semibold text-[#143D2B] hover:underline min-h-[44px] inline-flex items-center"
                >
                  Full diagnostic →
                </Link>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center">
            <QuietReadinessRadar score={score} childName={childName} />
          </div>
        </div>
      ) : (
        /* AGES 7+ ROAD 2: Quiet Bedtime Curfew Dock */
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-10 items-center">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#143D2B]">
              Road 2 · Active Device
            </span>

            <h2 className="font-serif text-[28px] sm:text-[34px] font-medium leading-[1.12] tracking-[-0.02em] text-[#131715]">
              {childName}&apos;s Bedtime Dock
            </h2>

            <p className="text-[14.5px] leading-relaxed text-[#494F4C] max-w-[40ch]">
              Apps pause automatically at 8:30 PM under your co-signed Family Pact.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`/devices?childId=${childId}`}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-full bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-[13.5px] font-semibold transition-colors"
              >
                <span>Review Pact &amp; Schedule</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <span className="text-[12.5px] text-[#7A827D]">
                Dual signed · Zero spyware
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <QuietBedtimeDial />
          </div>
        </div>
      )}
    </section>
  );
}
