'use client';

import * as React from 'react';
import {
  Sparkles,
  Calendar,
  Compass,
  FileCheck2,
  Shield,
  Brain,
  Flame,
} from 'lucide-react';
import {
  type ChildDTO,
  DevelopmentalTier,
} from '@alongside/shared';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface ChildHeroCardProps {
  child: ChildDTO | null;
  className?: string;
  onOpenOnboarding?: () => void;
  parentName?: string;
  streakDays?: number;
  minsLearnedThisWeek?: number;
}

export interface LeapInfo {
  shortTitle: string;
  leapTitle: string;
  biologicalDescription: string;
}

export const DEVELOPMENTAL_LEAPS: Record<string, LeapInfo> = {
  [DevelopmentalTier.TIER_0A_INFANCY_0_1]: {
    shortTitle: 'Infancy (Ages 0–1 / 0–12m)',
    leapTitle: 'Somatic Regulation & Sleep Architecture Foundations',
    biologicalDescription:
      'Circadian rhythm entrainment, vagal nerve tone regulation, mirror neuron attunement, and secure sensory attachment.',
  },
  [DevelopmentalTier.TIER_0B_TODDLER_1_2]: {
    shortTitle: 'Younger Toddlerhood (Ages 1–2 / 12–24m)',
    leapTitle: 'Locomotion, First Words & Amygdala Co-Regulation',
    biologicalDescription:
      'Rapid synaptic growth during upright locomotion, receptive vocabulary explosion, and external parental nervous system co-regulation.',
  },
  [DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3]: {
    shortTitle: 'Older Toddlerhood (Ages 2–3 / 24–36m)',
    leapTitle: 'Autonomy, Boundary Testing & Language Burst',
    biologicalDescription:
      'Eriksonian autonomy versus doubt, burgeoning expressiveness, behavioral limit-testing, and physiological potty readiness.',
  },
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

  if (typeof tierOrAge === 'string') {
    if (
      tierOrAge === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3 ||
      tierOrAge === 'TIER_0_INFANCY_TODDLER_0_3' ||
      tierOrAge === 'TIER_0'
    ) {
      return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]!;
    }
    if (tierOrAge.includes('TIER_0A') || tierOrAge.endsWith('0_1')) {
      return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_0A_INFANCY_0_1]!;
    }
    if (tierOrAge.includes('TIER_0B') || tierOrAge.endsWith('1_2')) {
      return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_0B_TODDLER_1_2]!;
    }
    if (tierOrAge.includes('TIER_0C') || tierOrAge.endsWith('2_3')) {
      return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3]!;
    }
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

  if (age <= 1) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_0A_INFANCY_0_1]!;
  if (age === 2) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_0B_TODDLER_1_2]!;
  if (age === 3) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3]!;
  if (age <= 6) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6]!;
  if (age <= 9) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]!;
  if (age <= 12) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_3_PRE_TEEN_10_12]!;
  if (age <= 15) return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]!;
  return DEVELOPMENTAL_LEAPS[DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]!;
}

export interface ParentCompassReflection {
  quote: string;
  author: string;
}

export const TODDLER_COMPASS_REFLECTIONS: ParentCompassReflection[] = [
  {
    quote: "You don't have to get every moment right. A calm repair after friction teaches your child more about emotional safety than a parent who never makes a mistake.",
    author: 'Dr. Chen, AlongSide Advisory Team',
  },
  {
    quote: "When a toddler melts down, their upstairs brain is offline. Don't try to reason with a storm — be the calm, physical harbor.",
    author: 'AlongSide Neurobiology Practice',
  },
  {
    quote: 'Co-regulation precedes self-regulation. Your steady, slow exhalations are your child’s primary nervous system manual.',
    author: 'Dr. Aliza Pressman',
  },
  {
    quote: 'Clear, gentle boundaries are not punishment; they are the loving guardrails that make a young child feel safe to explore.',
    author: 'Janet Lansbury',
  },
  {
    quote: 'Big feelings are not defiance. They are an immature nervous system overwhelmed by raw neurochemical sensation.',
    author: 'Dr. Dan Siegel',
  },
  {
    quote: 'A child who feels safely held through tears learns that vulnerability will never lead to emotional abandonment.',
    author: 'AlongSide Child Development',
  },
  {
    quote: 'Patience is not the absence of frustration; it is choosing emotional attunement over immediate urgency.',
    author: 'Dr. Becky Kennedy',
  },
];

export const TWEEN_TEEN_COMPASS_REFLECTIONS: ParentCompassReflection[] = [
  {
    quote: "You don't have to get every moment right. A calm repair after friction teaches your child more about emotional safety than a parent who never makes a mistake.",
    author: 'Dr. Chen, AlongSide Advisory Team',
  },
  {
    quote: 'An eye-roll is often an involuntary developmental reflex of budding autonomy, not a withdrawal of love.',
    author: 'Dr. Lisa Damour',
  },
  {
    quote: 'Connection before correction. When an adolescent feels understood first, their defensive prefrontal wall drops.',
    author: 'AlongSide Family Institute',
  },
  {
    quote: 'A smartphone is an open door to peer comparison. Bilateral trust protects their self-worth far more than secret surveillance.',
    author: 'Jonathan Haidt, The Anxious Generation',
  },
  {
    quote: 'Curiosity de-escalates conflict. Ask “Help me understand how you saw that” instead of “Why did you do that?”',
    author: 'Dr. Ross Greene',
  },
  {
    quote: 'Adolescent brains undergo massive synaptic pruning. Steady, unconditional warmth during mood swings anchors their identity.',
    author: 'Dr. Frances Jensen',
  },
  {
    quote: 'Independence is built on the certainty of a safe return. Be the unshakeable home base your child can always come back to.',
    author: 'AlongSide Family Advisory',
  },
];

export function getDailyParentCompassReflection(isEarlyTier: boolean, customDate?: Date): ParentCompassReflection {
  const date = customDate ?? new Date();
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const pool = isEarlyTier ? TODDLER_COMPASS_REFLECTIONS : TWEEN_TEEN_COMPASS_REFLECTIONS;
  return pool[dayOfYear % pool.length]!;
}

export function ChildHeroCard({
  child,
  className,
  onOpenOnboarding,
  parentName = 'Parent',
  streakDays = 0,
  minsLearnedThisWeek = 0,
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

  const isToddler = (child.age !== undefined && child.age !== null && child.age <= 3) ||
    String(child.developmentalTier || '').includes('TIER_0');
  const compassReflection = getDailyParentCompassReflection(isToddler);

  // Friendly date formatting
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className={cn('space-y-4', className)}>
      {/* Welcoming Value Banner & Habit Streak */}
      <section
        aria-label="Welcome & Purpose"
        className="bg-white rounded-2xl border border-[#E3E3DC] p-5 sm:p-6 shadow-[0_1px_2px_rgba(17,20,19,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="space-y-2">
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

          {/* Daily Parent Compass Micro-Reflection */}
          <div className="pt-2 border-t border-[#E3E3DC]/70 flex items-start sm:items-center gap-2 text-xs text-[#494F4C]">
            <Compass className="w-3.5 h-3.5 text-[#143D2B] shrink-0 mt-0.5 sm:mt-0" />
            <p className="font-serif italic text-xs text-[#111413] leading-relaxed">
              <span className="font-mono not-italic text-[10px] uppercase font-bold text-[#143D2B] tracking-wider mr-1.5">
                Daily Compass:
              </span>
              &ldquo;{compassReflection.quote}&rdquo;
              <span className="font-mono not-italic text-[10px] text-[#858C88] ml-2 inline-block">
                — {compassReflection.author}
              </span>
            </p>
          </div>
        </div>

        {/* Weekly Habit Streak Badge */}
        <div className="shrink-0 flex items-center gap-3 bg-[#FBFBF9] px-4 py-3 rounded-xl border border-[#E3E3DC] self-start md:self-auto">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors',
              streakDays > 0 ? 'bg-[#FEF3C7] text-[#B45309]' : 'bg-stone-100 text-stone-400'
            )}
          >
            <Flame className={cn('w-5 h-5', streakDays > 0 ? 'text-[#B45309]' : 'text-stone-400')} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-base font-bold text-[#111413]">{streakDays}-Day Streak</span>
              <span
                className={cn(
                  'font-mono text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors',
                  streakDays > 0 ? 'bg-[#EAF3EE] text-[#143D2B]' : 'bg-stone-100 text-stone-500'
                )}
              >
                {streakDays > 0 ? 'Active' : 'Start Today'}
              </span>
            </div>
            <p className="font-mono text-[11px] text-[#858C88]">{minsLearnedThisWeek} mins learned this week</p>
          </div>
        </div>
      </section>
    </div>
  );
}
