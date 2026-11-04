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
        'border-slate-200/80 bg-white hover:border-teal-300 transition-colors shadow-xs',
        className
      )}
    >
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-800">
            <BookOpen className="h-4 w-4 text-teal-700" />
            <span>Parent Intelligence Academy</span>
          </div>
          <Badge variant="outline" className="text-[11px] font-medium border-teal-200 text-teal-800 bg-teal-50/60">
            {child ? `For ${childName}` : fallback.tierLabel}
          </Badge>
        </div>

        <div>
          <CardTitle className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {summary}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{fallback.readingMinutes} min read • 3 lessons</span>
          </div>
          <Link
            href="/academy"
            className="text-teal-700 hover:text-teal-900 font-medium hover:underline text-[11px]"
          >
            All 6 Tiers →
          </Link>
        </div>

        <Link href={`/academy/${slug}`} className="block w-full">
          <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs font-semibold hover:bg-teal-50 hover:text-teal-900 hover:border-teal-300">
            Start Masterclass
            <ArrowRight className="h-3.5 w-3.5 text-teal-700" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
