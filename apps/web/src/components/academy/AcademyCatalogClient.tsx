'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  DevelopmentalTier,
  AcademyCategory,
  type AcademyCategoryStatsDTO,
  type AcademyModuleDTO,
} from '@alongside/shared';
import { useChildren } from '@/hooks/useChildren';
import { useChildContextStore, selectActiveChild } from '@/stores/useChildContextStore';
import { getAcademyCategories, getAcademyModules } from '@/lib/api/academy';
import { CategoryPills, type CategoryFilter } from '@/components/academy/CategoryPills';
import { ActiveChildCalibrationBanner } from '@/components/academy/ActiveChildCalibrationBanner';
import { CourseCardGrid } from '@/components/academy/CourseCardGrid';

export function normalizeChildTier(
  tier?: DevelopmentalTier | string | null,
  age?: number
): DevelopmentalTier {
  if (tier) {
    const s = String(tier);
    // Explicit checks for legacy aliases first to avoid substring collisions
    if (s === DevelopmentalTier.TIER_1_AGES_8_9) return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
    if (s === DevelopmentalTier.TIER_2_AGES_10_11) return DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
    if (s === DevelopmentalTier.TIER_3_AGES_12_13) return DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
    if (s === DevelopmentalTier.TIER_4_AGES_14_PLUS) return DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;

    if (s.includes('TIER_0A') || s.endsWith('0_1')) return DevelopmentalTier.TIER_0A_INFANCY_0_1;
    if (s.includes('TIER_0B') || s.endsWith('1_2')) return DevelopmentalTier.TIER_0B_TODDLER_1_2;
    if (s.includes('TIER_0C') || s.endsWith('2_3')) return DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3;
    if (s.includes('TIER_0_') || s.endsWith('0_3')) return DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;
    if (s.includes('TIER_1_EARLY') || s.endsWith('4_6')) return DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
    if (s.includes('TIER_2_MIDDLE') || s.endsWith('7_9')) return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
    if (s.includes('TIER_3_PRE_TEEN') || s.endsWith('10_12')) return DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
    if (s.includes('TIER_4_EARLY_ADOLESCENCE') || s.endsWith('13_15')) return DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
    if (s.includes('TIER_5_LATE') || s.endsWith('16_18')) return DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;
  }
  if (age !== undefined && age !== null) {
    if (age <= 1) return DevelopmentalTier.TIER_0A_INFANCY_0_1;
    if (age === 2) return DevelopmentalTier.TIER_0B_TODDLER_1_2;
    if (age === 3) return DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3;
    if (age <= 6) return DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
    if (age <= 9) return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
    if (age <= 12) return DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
    if (age <= 15) return DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
    return DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;
  }
  return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
}

export function AcademyCatalogClient() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams?.get('category') as AcademyCategory | null;

  // Active child context from store and queries
  const { children: storeChildren, activeChildId } = useChildContextStore();
  const { children: queryChildren } = useChildren();
  const children = storeChildren.length > 0 ? storeChildren : queryChildren;
  const activeChild = selectActiveChild({ children, activeChildId });

  // Category filter state (default to URL param or ALL)
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryFilter>(
    urlCategory && Object.values(AcademyCategory).includes(urlCategory)
      ? urlCategory
      : 'ALL'
  );

  // Sync state if URL search params change
  React.useEffect(() => {
    if (urlCategory && Object.values(AcademyCategory).includes(urlCategory)) {
      setSelectedCategory(urlCategory);
    } else if (!urlCategory) {
      setSelectedCategory('ALL');
    }
  }, [urlCategory]);

  // Viewed stage is ALWAYS relative to the selected child
  const selectedTier = React.useMemo<'ALL' | DevelopmentalTier>(() => {
    if (activeChild) {
      return normalizeChildTier(activeChild.developmentalTier, activeChild.age);
    }
    return 'ALL';
  }, [activeChild?.id, activeChild?.developmentalTier, activeChild?.age]);

  // Query category stats (filtered by selected child tier)
  const { data: categoryStats = [] } = useQuery<AcademyCategoryStatsDTO[]>({
    queryKey: ['academy-categories', selectedTier],
    queryFn: () =>
      getAcademyCategories({
        tier: selectedTier === 'ALL' ? undefined : selectedTier,
      }),
    staleTime: 5 * 60 * 1000,
  });

  // Query modules filtered by category and child tier
  const {
    data: modules = [],
    isLoading: isModulesLoading,
    isError,
    error,
    refetch,
  } = useQuery<AcademyModuleDTO[]>({
    queryKey: ['academy-modules', selectedCategory, selectedTier],
    queryFn: () =>
      getAcademyModules({
        category: selectedCategory === 'ALL' ? undefined : selectedCategory,
        tier: selectedTier === 'ALL' ? undefined : selectedTier,
      }),
    staleTime: 5 * 60 * 1000,
  });

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
  };

  return (
    <div className="space-y-6">
      {/* Active Child Context Calibration Banner */}
      <ActiveChildCalibrationBanner
        childName={activeChild?.name}
        childAge={activeChild?.age}
        childTier={activeChild?.developmentalTier}
      />

      {/* 5-Category Horizontal Selector Pills */}
      <CategoryPills
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryStats={categoryStats}
      />

      {/* Responsive Course Card Grid */}
      <CourseCardGrid
        modules={modules}
        isLoading={isModulesLoading}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
