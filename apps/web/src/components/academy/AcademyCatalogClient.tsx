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

function normalizeChildTier(tier: DevelopmentalTier): DevelopmentalTier {
  switch (tier) {
    case DevelopmentalTier.TIER_1_AGES_8_9:
      return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
    case DevelopmentalTier.TIER_2_AGES_10_11:
      return DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
    case DevelopmentalTier.TIER_3_AGES_12_13:
      return DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
    case DevelopmentalTier.TIER_4_AGES_14_PLUS:
      return DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;
    default:
      return tier;
  }
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

  // Developmental tier filter state (default to active child tier or ALL)
  const [selectedTier, setSelectedTier] = React.useState<'ALL' | DevelopmentalTier>('ALL');

  React.useEffect(() => {
    if (activeChild?.developmentalTier) {
      setSelectedTier(normalizeChildTier(activeChild.developmentalTier));
    }
  }, [activeChild?.id, activeChild?.developmentalTier]);

  // Query category stats
  const { data: categoryStats = [] } = useQuery<AcademyCategoryStatsDTO[]>({
    queryKey: ['academy-categories'],
    queryFn: getAcademyCategories,
    staleTime: 10 * 60 * 1000,
  });

  // Query modules filtered by category and tier
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
    setSelectedTier('ALL');
  };

  return (
    <div className="space-y-8">
      {/* Active Child Context Calibration Banner */}
      <ActiveChildCalibrationBanner
        childName={activeChild?.name}
        childAge={activeChild?.age}
        childTier={activeChild?.developmentalTier}
        selectedTier={selectedTier}
        onSelectTier={setSelectedTier}
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
