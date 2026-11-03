'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Sparkles, Filter, AlertCircle } from 'lucide-react';
import { DevelopmentalTier, type AcademyModuleDTO } from '@alongside/shared';
import { useChildren } from '@/hooks/useChildren';
import { getModulesByTier } from '@/lib/api/academy';
import { ModuleCard } from '@/components/academy/ModuleCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type TierTabFilter = 'ALL' | DevelopmentalTier;

const TIER_TABS: Array<{ key: TierTabFilter; label: string; shortLabel: string; ageRange: string }> = [
  { key: 'ALL', label: 'All Modules', shortLabel: 'All', ageRange: 'Ages 8–18' },
  {
    key: DevelopmentalTier.TIER_1_AGES_8_9,
    label: 'Tier 1: Explorer',
    shortLabel: 'Explorer',
    ageRange: 'Ages 8–9',
  },
  {
    key: DevelopmentalTier.TIER_2_AGES_10_11,
    label: 'Tier 2: Pathfinder',
    shortLabel: 'Pathfinder',
    ageRange: 'Ages 10–11',
  },
  {
    key: DevelopmentalTier.TIER_3_AGES_12_13,
    label: 'Tier 3: Navigator',
    shortLabel: 'Navigator',
    ageRange: 'Ages 12–13',
  },
  {
    key: DevelopmentalTier.TIER_4_AGES_14_PLUS,
    label: 'Tier 4: Pioneer',
    shortLabel: 'Pioneer',
    ageRange: 'Ages 14+',
  },
];

export function AcademyCatalogClient() {
  const { children, isLoading: isChildrenLoading } = useChildren();
  const [selectedTier, setSelectedTier] = React.useState<TierTabFilter>('ALL');
  const [hasInitializedChildTier, setHasInitializedChildTier] = React.useState(false);

  // Pre-select active child's developmental tier once loaded
  React.useEffect(() => {
    if (!hasInitializedChildTier && children.length > 0) {
      const firstChild = children[0];
      if (firstChild?.developmentalTier) {
        setSelectedTier(firstChild.developmentalTier);
      }
      setHasInitializedChildTier(true);
    }
  }, [children, hasInitializedChildTier]);

  const activeChild = children[0] || null;

  const {
    data,
    isLoading: isModulesLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['academy-modules', selectedTier],
    queryFn: () => getModulesByTier(selectedTier === 'ALL' ? undefined : selectedTier),
    staleTime: 5 * 60 * 1000,
  });

  const modules: AcademyModuleDTO[] = data?.modules ?? [];

  return (
    <div className="space-y-8">
      {/* Active Child Context Callout */}
      {activeChild && (
        <div className="rounded-2xl border border-teal-200/80 bg-teal-50/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white font-bold text-sm shrink-0">
              {activeChild.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Personalized for {activeChild.name} (Age {activeChild.age})
              </p>
              <p className="text-xs text-slate-600">
                Curriculum tailored for {activeChild.developmentalTier.replace(/_/g, ' ')}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Currently viewing:</span>
            <Badge variant="outline" className="border-teal-300 bg-white text-teal-800 text-xs font-semibold">
              {TIER_TABS.find((t) => t.key === selectedTier)?.label || selectedTier}
            </Badge>
          </div>
        </div>
      )}

      {/* Developmental Tier Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Filter by Developmental Stage
        </label>
        <div className="flex flex-wrap gap-2">
          {TIER_TABS.map((tab) => {
            const isSelected = selectedTier === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedTier(tab.key)}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 border',
                  isSelected
                    ? 'border-teal-600 bg-teal-600 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                )}
                aria-pressed={isSelected}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'text-[11px] font-normal px-1.5 py-0.5 rounded-full',
                    isSelected ? 'bg-teal-700 text-teal-100' : 'bg-slate-100 text-slate-500'
                  )}
                >
                  {tab.ageRange}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modules Grid */}
      {isModulesLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((skeletonIdx) => (
            <div
              key={skeletonIdx}
              className="h-72 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse space-y-4"
            >
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="h-6 w-3/4 bg-slate-200 rounded" />
              <div className="h-16 w-full bg-slate-100 rounded" />
              <div className="h-3 w-1/2 bg-slate-200 rounded" />
              <div className="h-10 w-full bg-slate-200 rounded-lg pt-4" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center space-y-3">
          <AlertCircle className="h-8 w-8 text-rose-500 mx-auto" />
          <h3 className="text-base font-bold text-rose-900">
            Failed to Load Academy Modules
          </h3>
          <p className="text-xs sm:text-sm text-rose-700 max-w-md mx-auto">
            {error instanceof Error ? error.message : 'Please check your connection.'}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="border-rose-300 text-rose-900 hover:bg-rose-100"
          >
            Retry Loading
          </Button>
        </div>
      ) : modules.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
          <BookOpen className="h-10 w-10 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              No Modules Found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              There are currently no academy modules for this specific developmental tier.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedTier('ALL')}
          >
            View All Developmental Tiers
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      )}
    </div>
  );
}
