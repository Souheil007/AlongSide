'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Calendar,
  Compass,
  FileCheck2,
  ChevronRight,
  Shield,
  Brain,
  Zap,
} from 'lucide-react';
import {
  type ChildDTO,
  RoadType,
  DevelopmentalTier,
} from '@alongside/shared';
import {
  formatChildAge,
  getChildDevelopmentalHorizon,
} from '@/stores/useChildContextStore';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface ChildHeroCardProps {
  child: ChildDTO | null;
  className?: string;
  onOpenOnboarding?: () => void;
}

export interface LeapInfo {
  shortTitle: string;
  leapTitle: string;
  biologicalDescription: string;
}

export const DEVELOPMENTAL_LEAPS: Record<string, LeapInfo> = {
  [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]: {
    shortTitle: 'Infancy & Toddlerhood (Ages 0–3)',
    leapTitle: 'Sensory Co-Regulation & Pre-Verbal Secure Attachment',
    biologicalDescription:
      'Rapid synaptic branching, mirror neuron activation, and pre-verbal amygdala calming through physical attunement.',
  },
  [DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6]: {
    shortTitle: 'Early Childhood (Ages 4–6)',
    leapTitle: 'Theory of Mind, Emotional Autonomy & Impulse Scaffolding',
    biologicalDescription:
      'Developing awareness that others hold different viewpoints, nascent impulse control, and emotional expression through symbolic play.',
  },
  [DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]: {
    shortTitle: 'Middle Childhood (Ages 7–9)',
    leapTitle: 'Prefrontal Inhibitory Control & Cooperative Play Strategy',
    biologicalDescription:
      'Emergence of concrete operational reasoning, peer rule-negotiation, and early resistance to immediate digital dopamine.',
  },
  [DevelopmentalTier.TIER_3_PRE_TEEN_10_12]: {
    shortTitle: 'Pre-Teens & Tweens (Ages 10–12)',
    leapTitle: 'Adrenarche, Social Dopamine Shift & Peer Identity Alignment',
    biologicalDescription:
      'Adrenal hormone surge sensitizing neural reward circuits to peer acceptance, triggering acute sensitivity to status and exclusion.',
  },
  [DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]: {
    shortTitle: 'Early Adolescence (Ages 13–15)',
    leapTitle: 'Biological Circadian Delay & Algorithmic Feed Resistance',
    biologicalDescription:
      'A natural 2-hour biological melatonin phase delay, paired with heightened susceptibility to variable dopamine reward schedules.',
  },
  [DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]: {
    shortTitle: 'Late Adolescence & Launch (Ages 16–18)',
    leapTitle: 'Executive Autonomy, Digital Footprint & Young Adult Sovereignty',
    biologicalDescription:
      'Prefrontal cortex myelination completing long-range risk assessment, self-directed time management, and reputation ownership.',
  },
};

export function getDevelopmentalLeap(tierOrAge?: string | number | null): LeapInfo {
  if (!tierOrAge) {
    return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_3_PRE_TEEN_10_12]!;
  }

  if (typeof tierOrAge === 'string' && DEVELOPMENTAL_LEAPS[tierOrAge]) {
    return DEVELOPMENTAL_LEAPS[tierOrAge]!;
  }

  let age = typeof tierOrAge === 'number' ? tierOrAge : 10;
  if (typeof tierOrAge === 'string') {
    if (tierOrAge.includes('0_3') || tierOrAge.includes('TIER_0')) age = 2;
    else if (tierOrAge.includes('4_6') || tierOrAge.includes('TIER_1_EARLY')) age = 5;
    else if (tierOrAge.includes('7_9') || tierOrAge.includes('TIER_2_MIDDLE') || tierOrAge.includes('TIER_1_AGES_8_9')) age = 8;
    else if (tierOrAge.includes('10_12') || tierOrAge.includes('TIER_3_PRE_TEEN') || tierOrAge.includes('TIER_2_AGES_10_11')) age = 11;
    else if (tierOrAge.includes('13_15') || tierOrAge.includes('TIER_4_EARLY_ADOLESCENCE') || tierOrAge.includes('TIER_3_AGES_12_13')) age = 14;
    else if (tierOrAge.includes('16_18') || tierOrAge.includes('TIER_5_LATE') || tierOrAge.includes('TIER_4_AGES_14_PLUS')) age = 17;
  }

  if (age <= 3) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]!;
  if (age <= 6) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6]!;
  if (age <= 9) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]!;
  if (age <= 12) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_3_PRE_TEEN_10_12]!;
  if (age <= 15) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]!;
  return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]!;
}

export function ChildHeroCard({
  child,
  className,
  onOpenOnboarding,
}: ChildHeroCardProps) {
  if (!child) {
    return (
      <Card
        className={cn(
          'border-dashed border-2 border-teal-300 bg-teal-50/40 p-6 sm:p-8 text-center shadow-xs',
          className
        )}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-800 mb-3">
          <Shield className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Welcome to the AlongSide Advisory Sanctuary
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
          Add your first child profile to personalize your prioritized developmental academy chapters, word-for-word empathy scripts, and youth culture intelligence.
        </p>
        <div className="mt-4">
          <Button
            onClick={onOpenOnboarding}
            className="min-h-[44px] gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs px-6"
          >
            Add First Child Profile
          </Button>
        </div>
      </Card>
    );
  }

  const isPreDevice = child.roadType === RoadType.PRE_DEVICE;
  const horizon = getChildDevelopmentalHorizon(child.developmentalTier || child.age);
  const formattedAge = formatChildAge(child);
  const leap = getDevelopmentalLeap(child.developmentalTier || child.age);

  // Friendly date formatting
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <Card
      className={cn(
        'rounded-[10px] border border-[#E3E3DC] bg-white shadow-[0_1px_2px_rgba(17,20,19,0.04)] overflow-hidden',
        className
      )}
    >
      <CardContent className="p-5 sm:p-6 space-y-4">
        {/* Top Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E3DC] pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#EAF3EE] text-[#143D2B] text-xs font-bold">
              <Calendar className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-xs font-semibold text-[#494F4C] tracking-tight">
              {todayFormatted}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={isPreDevice ? 'roadPre' : 'roadActive'}
              className="text-[10px] font-mono font-bold uppercase tracking-wider"
            >
              {isPreDevice ? 'Road 1: Pre-Device' : 'Road 2: Active-Device'}
            </Badge>
            <span
              className={cn(
                'rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold border',
                horizon.badgeColor
              )}
            >
              {horizon.stage || horizon.tierLabel}
            </span>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            {/* Child Avatar with Initial */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] bg-[#143D2B] text-xl font-black text-white shadow-sm ring-4 ring-[#EAF3EE]">
              {child.name.charAt(0).toUpperCase()}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#111413]">
                  {child.name}&apos;s Advisory Horizon
                </h1>
                <span className="font-mono text-xs font-semibold text-[#143D2B] bg-[#EAF3EE] px-2 py-0.5 rounded-full border border-[#143D2B]/20">
                  {formattedAge}
                </span>
                {child.schoolGrade && (
                  <span className="font-mono text-xs text-[#858C88] font-medium">
                    • {child.schoolGrade}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#143D2B]">
                <Sparkles className="h-3.5 w-3.5 text-[#143D2B] shrink-0" />
                <span>{horizon.horizon}</span>
              </div>

              <p className="text-xs text-[#494F4C] max-w-2xl leading-relaxed">
                {horizon.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Road Action Launcher */}
          <div className="shrink-0 flex items-center gap-2 self-start md:self-center">
            {isPreDevice ? (
              <Link href={`/children/${child.id}/readiness`}>
                <Button
                  size="sm"
                  variant="forest"
                  className="min-h-[44px] gap-1.5 text-xs font-bold shadow-2xs"
                >
                  <Compass className="h-4 w-4" />
                  <span>First-Phone Readiness</span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-80" />
                </Button>
              </Link>
            ) : (
              <Link href={`/devices?childId=${child.id}`}>
                <Button
                  size="sm"
                  variant="default"
                  className="min-h-[44px] gap-1.5 text-xs font-bold shadow-2xs"
                >
                  <FileCheck2 className="h-4 w-4" />
                  <span>Curfew &amp; Pacts</span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-80" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Current Neurodevelopmental Leap Callout */}
        <div className="rounded-[6px] border border-[#E3E3DC] bg-[#FBFBF9] p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#143D2B] text-white shadow-2xs">
              <Brain className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#143D2B]">
                  Active Leap
                </span>
                <span className="font-mono text-[10px] text-[#143D2B] font-semibold bg-[#EAF3EE] px-2 py-0.2 rounded-full border border-[#143D2B]/20">
                  {leap.shortTitle}
                </span>
              </div>
              <p className="font-serif text-xs font-bold text-[#111413] mt-0.5">
                {leap.leapTitle}
              </p>
              <p className="text-[11px] text-[#494F4C] leading-snug mt-0.5">
                {leap.biologicalDescription}
              </p>
            </div>
          </div>

          <Link href={`/academy`} className="shrink-0 self-end sm:self-center">
            <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#143D2B] hover:text-[#0E2B1E] underline underline-offset-2">
              <span>View Milestone Science</span>
              <ChevronRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
