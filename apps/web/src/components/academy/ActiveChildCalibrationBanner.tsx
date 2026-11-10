'use client';

import * as React from 'react';
import { Baby } from 'lucide-react';
import { DevelopmentalTier } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface ActiveChildCalibrationBannerProps {
  childName?: string | null;
  childAge?: number | null;
  childTier?: DevelopmentalTier | null;
  selectedTier?: 'ALL' | DevelopmentalTier;
  onSelectTier?: (tier: 'ALL' | DevelopmentalTier) => void;
  className?: string;
}

const TIER_OPTIONS: Array<{
  key: 'ALL' | DevelopmentalTier;
  label: string;
  stageName: string;
  ageSpan: string;
}> = [
  {
    key: 'ALL',
    label: 'All Developmental Stages',
    stageName: 'Complete Lifespan',
    ageSpan: 'Ages 0–18',
  },
  {
    key: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    label: 'Tier 0A: Infancy',
    stageName: 'Infancy & Somatic Regulation',
    ageSpan: 'Ages 0–1',
  },
  {
    key: DevelopmentalTier.TIER_0B_TODDLER_1_2,
    label: 'Tier 0B: Toddler',
    stageName: 'Younger Toddlerhood & Locomotion',
    ageSpan: 'Ages 1–2',
  },
  {
    key: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    label: 'Tier 0C: Older Toddler',
    stageName: 'Older Toddlerhood & Autonomy',
    ageSpan: 'Ages 2–3',
  },
  {
    key: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    label: 'Tier 0: Infancy & Toddler',
    stageName: 'Infancy & Toddlerhood',
    ageSpan: 'Ages 0–3',
  },
  {
    key: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    label: 'Tier 1: Early Childhood',
    stageName: 'Preschool & Play',
    ageSpan: 'Ages 4–6',
  },
  {
    key: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    label: 'Tier 2: Explorer',
    stageName: 'Middle Childhood',
    ageSpan: 'Ages 7–9',
  },
  {
    key: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    label: 'Tier 3: Pathfinder',
    stageName: 'Pre-Teen & Adrenarche',
    ageSpan: 'Ages 10–12',
  },
  {
    key: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    label: 'Tier 4: Navigator',
    stageName: 'Early Adolescence',
    ageSpan: 'Ages 13–15',
  },
  {
    key: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    label: 'Tier 5: Pioneer',
    stageName: 'Late Adolescence',
    ageSpan: 'Ages 16–18',
  },
];

export function getTierStageName(tier: DevelopmentalTier | string | null | undefined): string {
  switch (tier) {
    case DevelopmentalTier.TIER_0A_INFANCY_0_1:
      return 'Infancy (Ages 0–1)';
    case DevelopmentalTier.TIER_0B_TODDLER_1_2:
      return 'Younger Toddlerhood (Ages 1–2)';
    case DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3:
      return 'Older Toddlerhood (Ages 2–3)';
    case DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3:
      return 'Infancy & Toddler';
    case DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6:
      return 'Early Childhood';
    case DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9:
    case DevelopmentalTier.TIER_1_AGES_8_9:
      return 'Explorer (Ages 7–9)';
    case DevelopmentalTier.TIER_3_PRE_TEEN_10_12:
    case DevelopmentalTier.TIER_2_AGES_10_11:
      return 'Pathfinder (Ages 10–12)';
    case DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15:
    case DevelopmentalTier.TIER_3_AGES_12_13:
      return 'Navigator (Ages 13–15)';
    case DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18:
    case DevelopmentalTier.TIER_4_AGES_14_PLUS:
      return 'Pioneer (Ages 16–18)';
    default:
      return 'Lifespan (Ages 0–18)';
  }
}

export function ActiveChildCalibrationBanner({
  childName,
  childAge,
  childTier,
  className,
}: ActiveChildCalibrationBannerProps) {
  const activeStageLabel = getTierStageName(childTier);

  return (
    <div
      className={cn(
        'relative rounded-xl border border-[#E3E3DC] bg-[#FBFBF9] p-3.5 sm:p-4 shadow-xs',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#143D2B] text-white font-bold text-xs shrink-0 shadow-xs">
          {childName ? childName.charAt(0).toUpperCase() : <Baby className="h-4 w-4" />}
        </div>

        <div className="space-y-0.5">
          <p className="text-sm sm:text-base font-bold text-[#111413] tracking-tight">
            {childName ? (
              <>
                Courses for {childName}{' '}
                <span className="text-xs font-semibold text-[#494F4C]">
                  ({childAge !== undefined && childAge !== null ? `Age ${childAge} · ` : ''}
                  {activeStageLabel})
                </span>
              </>
            ) : (
              'Parenting Curriculum'
            )}
          </p>
          <p className="text-xs text-[#858C88]">
            Curriculum is automatically calibrated to this developmental stage.
          </p>
        </div>
      </div>
    </div>
  );
}
