'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Sparkles, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  DevelopmentalTier,
  type ChildDTO,
  type AcademyModuleDTO,
} from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getModulesByTier } from '@/lib/api/academy';
import { useChildAge } from '@/hooks/useChildAge';
import { cn } from '@/lib/utils';

export interface AcademyBriefingCardProps {
  child: ChildDTO | null;
  className?: string;
}

interface StaticMasterclassFallback {
  slug: string;
  title: string;
  summary: string;
  readingMinutes: number;
  tierLabel: string;
}

function resolveStaticFallback(tier: DevelopmentalTier): StaticMasterclassFallback {
  switch (tier) {
    case DevelopmentalTier.TIER_0A_INFANCY_0_1:
      return {
        slug: 'behavior-infant-coregulation',
        title: 'Infant Crying & Somatic Co-Regulation: Fourth Trimester Equilibrium',
        summary:
          'Master autonomic nervous system co-regulation, infant sensory thresholds, and pre-verbal soothing techniques during the fourth trimester.',
        readingMinutes: 12,
        tierLabel: 'Ages 0–1',
      };
    case DevelopmentalTier.TIER_0B_TODDLER_1_2:
      return {
        slug: 'behavior-toddler-tantrums-co-regulation',
        title: 'Younger Toddler Meltdowns & Bipedal Autonomy',
        summary:
          'Navigate sensory motor exploration, early separation-individuation, and pre-verbal frustration without coercive discipline.',
        readingMinutes: 12,
        tierLabel: 'Ages 1–2',
      };
    case DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3:
      return {
        slug: 'behavior-older-toddler-defiance-boundaries',
        title: 'Older Toddler Tantrums: Language Bursts & Boundary Testing',
        summary:
          'De-escalate frontal-limbic storm meltdowns, hold empathetic physical boundaries, and foster emotional literacy as vocabulary explodes.',
        readingMinutes: 13,
        tierLabel: 'Ages 2–3',
      };
    case DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3:
      return {
        slug: 'infant-sensory-milestones-and-coregulation',
        title: 'Infant & Toddler Neurodevelopment: Sensory Co-Regulation & Zero-Screen Foundations',
        summary:
          'Master how the 0-3 infant and toddler brain builds secure attachment, why pre-verbal emotional meltdowns occur, and how to protect 3D language acquisition.',
        readingMinutes: 12,
        tierLabel: 'Ages 0–3',
      };
    case DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6:
      return {
        slug: 'early-childhood-dopamine-and-frustration',
        title: 'Early Childhood Executive Function: Theory of Mind & Emotion Regulation',
        summary:
          'Understand how the 4-6 preschool brain develops impulse control, scaffolds cooperative play, and navigates high-stimulation tablet transitions.',
        readingMinutes: 12,
        tierLabel: 'Ages 4–6',
      };
    case DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9:
    case DevelopmentalTier.TIER_1_AGES_8_9:
      return {
        slug: 'early-impulse-centers-and-shared-media',
        title: 'Early Impulse Centers: Developing Prefrontal Cortex & Shared Media',
        summary:
          'Understand how the 7-9 year old brain processes immediate digital reward before inhibitory control is fully wired, and how to co-view media.',
        readingMinutes: 13,
        tierLabel: 'Ages 7–9',
      };
    case DevelopmentalTier.TIER_3_PRE_TEEN_10_12:
    case DevelopmentalTier.TIER_2_AGES_10_11:
      return {
        slug: 'tween-neurobiology-and-adrenarche',
        title: 'The Tween Brain: Adrenarche, Social Dopamine & The Peer Shift',
        summary:
          'Understand why peer approval suddenly eclipses family connection at ages 10-12 and how to protect sleep while honoring social connection.',
        readingMinutes: 12,
        tierLabel: 'Ages 10–12',
      };
    case DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15:
    case DevelopmentalTier.TIER_3_AGES_12_13:
      return {
        slug: 'pubertal-circadian-delay-and-sleep',
        title: 'Pubertal Circadian Delay, Algorithmic Feeds & The Bedtime Dock',
        summary:
          'Explore the biological 2-hour sleep phase shift in puberty and why physical device separation prevents chronic sleep deprivation.',
        readingMinutes: 14,
        tierLabel: 'Ages 13–15',
      };
    case DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18:
    case DevelopmentalTier.TIER_4_AGES_14_PLUS:
    default:
      return {
        slug: 'teen-autonomy-and-graduated-privileges',
        title: 'The Autonomy Transition: Graduated Privileges, Digital Footprints & Agency',
        summary:
          'Shift from managerial monitoring to collaborative mentorship as adolescent agency, digital reputation, and adult independence develop.',
        readingMinutes: 14,
        tierLabel: 'Ages 16–18',
      };
  }
}

export function AcademyBriefingCard({ child, className }: AcademyBriefingCardProps) {
  const childAge = useChildAge();
  const effectiveTier = (child?.developmentalTier ?? childAge.developmentalTier) as DevelopmentalTier;

  // Fetch recommended module for this tier from API
  const { data, isLoading } = useQuery({
    queryKey: ['academy-modules', effectiveTier],
    queryFn: () => getModulesByTier(effectiveTier),
    staleTime: 5 * 60 * 1000,
  });

  const fallback = resolveStaticFallback(effectiveTier);
  const liveModule: AcademyModuleDTO | undefined = data?.modules?.[0];

  const title = liveModule?.title ?? fallback.title;
  const summary = liveModule?.summary ?? fallback.summary;
  const slug = liveModule?.slug ?? fallback.slug;
  const childName = child?.name ?? 'your child';

  return (
    <Card
      className={cn(
        'border-[#E3E3DC] bg-[#FFFFFF] hover:border-[#143D2B]/30 transition-all shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-[10px]',
        className
      )}
    >
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#143D2B] uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5 text-[#143D2B]" />
            <span>Parent Intelligence Academy</span>
          </div>
          <Badge variant="outline" className="text-[11px] font-mono border-[#E3E3DC] text-[#143D2B] bg-[#EAF3EE]">
            {fallback.tierLabel}
          </Badge>
        </div>

        <div>
          <CardTitle className="font-serif text-base sm:text-lg font-semibold text-[#111413] leading-snug line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-[#494F4C] mt-1 line-clamp-2 leading-relaxed">
            {summary}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between text-xs text-[#858C88] pt-2 border-t border-[#E3E3DC] font-mono">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#858C88]" />
            <span>{fallback.readingMinutes} min read • 3 lessons</span>
          </div>
          <Link
            href="/academy"
            className="text-[#143D2B] hover:text-[#111413] font-mono font-medium hover:underline text-[11px]"
          >
            All 6 Tiers →
          </Link>
        </div>

        <Link href={`/academy/${slug}`} className="block w-full">
          <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs font-medium border-[#E3E3DC] text-[#111413] hover:bg-[#F4F4F0] rounded-[5px]">
            <span>Start Masterclass</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#143D2B]" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
