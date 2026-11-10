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
  Flame,
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
  parentName?: string;
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
  parentName = 'Sarah',
}: ChildHeroCardProps) {
  if (!child) {
    return (
      <Card
        className={cn(
          'border-dashed border-2 border-[#143D2B]/30 bg-[#EAF3EE]/40 p-6 sm:p-8 text-center shadow-xs rounded-[10px]',
          className
        )}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF3EE] text-[#143D2B] mb-3">
          <Shield className="h-6 w-6" />
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#111413]">
          Welcome to Your Family Learning Sanctuary
        </h2>
        <p className="text-xs sm:text-sm text-[#494F4C] max-w-md mx-auto mt-1 leading-relaxed">
          Add your first child profile to personalize your daily conversation scripts, prioritized developmental academy chapters, and evidence-based habit rhythms.
        </p>
        <div className="mt-4">
          <Button
            onClick={onOpenOnboarding}
            className="min-h-[44px] gap-2 bg-[#143D2B] hover:bg-[#0E2B1E] text-white font-semibold text-xs px-6 rounded-[5px]"
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
  const isToddler = (child.age !== undefined && child.age !== null && child.age <= 3) ||
    String(child.developmentalTier || '').includes('TIER_0');

  // Friendly date formatting
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className={cn('space-y-4', className)}>
      {/* 1. Single-Line Ambient Status Anchor (Fluid Stream Context) */}
      <section
        aria-label="Child Context Anchor"
        className="bg-[#EAF3EE] border border-[#143D2B]/15 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 text-xs transition-colors"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-serif text-sm font-bold text-[#111413]">
            {child.name} • {formattedAge}
          </span>
          <span className="text-[#143D2B]/40">•</span>
          <span className="font-mono text-[11px] text-[#143D2B] font-semibold uppercase tracking-wider">
            {isPreDevice ? 'Road 1: Pre-Device' : 'Road 2: Active-Device'}
          </span>
          <span className="text-[#143D2B]/40">•</span>
          <span className="text-[#494F4C] text-[11px]">
            {horizon.stage || horizon.tierLabel}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#494F4C]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">
            {isToddler
              ? 'Active Goal: Screen-Free Bedtime Story Routine (3/3 Nights)'
              : 'Active Goal: 14-Day Independent Morning Alarm (Day 9 of 14)'}
          </span>
        </div>
      </section>

      {/* 2. Welcoming Value Banner & 4-Day Habit Streak */}
      <section
        aria-label="Welcome & Purpose"
        className="bg-white rounded-2xl border border-[#E3E3DC] p-5 sm:p-6 shadow-[0_1px_2px_rgba(17,20,19,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-xs text-[#143D2B] font-semibold uppercase tracking-wider">
              Your Family&apos;s Calm Daily Headquarters
            </span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#111413] tracking-tight">
            Welcome home, {parentName}. Here is today&apos;s guidance for {child.name}.
          </h1>
          <p className="text-xs sm:text-sm text-[#494F4C] max-w-2xl leading-relaxed">
            {isToddler
              ? 'Toddlerhood is about emotional co-regulation and clear, gentle boundaries. You are your child’s calm anchor.'
              : 'You’re building healthy habits and emotional trust, one small conversation at a time. No perfection required—just 4 minutes of intentional learning today.'}
          </p>
        </div>

        {/* Weekly Habit Streak Badge */}
        <div className="shrink-0 flex items-center gap-3 bg-[#FBFBF9] px-4 py-3 rounded-xl border border-[#E3E3DC] self-start md:self-auto">
          <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#B45309] flex items-center justify-center text-lg font-bold">
            <Flame className="w-5 h-5 text-[#B45309]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-base font-bold text-[#111413]">4-Day Streak</span>
              <span className="font-mono text-[10px] text-[#143D2B] font-bold bg-[#EAF3EE] px-1.5 py-0.5 rounded">Active</span>
            </div>
            <p className="font-mono text-[11px] text-[#858C88]">18 mins learned this week</p>
          </div>
        </div>
      </section>

      {/* 3. Quiet Ambient Horizon & Active Leap (Cardless Fluid Strip) */}
      <section
        aria-label="Advisory Horizon"
        className="px-2 py-1 flex flex-wrap items-center justify-between gap-3 text-xs text-[#494F4C]"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-[#143D2B] uppercase tracking-wider">
            {child.name}&apos;s Advisory Horizon:
          </span>
          <span className="font-serif text-xs font-semibold text-[#111413]">
            {isToddler ? 'Co-Regulation Routines' : horizon.horizon}
          </span>
          <span className="text-[#858C88]">•</span>
          <span className="text-[#494F4C] text-[11px]">
            Active Leap: {leap.leapTitle}
          </span>
        </div>

        <Link
          href="/academy"
          className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#143D2B] hover:underline"
        >
          <span>Why this leap matters</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </section>
    </div>
  );
}
