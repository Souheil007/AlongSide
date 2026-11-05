'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Brain,
  Stethoscope,
  Utensils,
  Sparkles,
  Smartphone,
  Layers,
} from 'lucide-react';
import { AcademyCategory, type AcademyCategoryStatsDTO } from '@alongside/shared';
import { cn } from '@/lib/utils';

export type CategoryFilter = 'ALL' | AcademyCategory;

export interface CategoryItem {
  key: CategoryFilter;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  activeColor: string;
}

export const ACADEMY_CATEGORIES: CategoryItem[] = [
  {
    key: 'ALL',
    label: 'All Categories',
    shortLabel: 'All',
    icon: Layers,
    accentColor: 'text-slate-600',
    activeColor: 'bg-slate-900 text-white border-slate-900',
  },
  {
    key: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    label: 'Behavior & Emotions',
    shortLabel: 'Behavior',
    icon: Brain,
    accentColor: 'text-rose-600',
    activeColor: 'bg-rose-700 text-white border-rose-700 shadow-sm',
  },
  {
    key: AcademyCategory.HEALTH_AND_WELLNESS,
    label: 'Pediatric Health & Sleep',
    shortLabel: 'Health & Sleep',
    icon: Stethoscope,
    accentColor: 'text-teal-600',
    activeColor: 'bg-teal-700 text-white border-teal-700 shadow-sm',
  },
  {
    key: AcademyCategory.NUTRITION_AND_FEEDING,
    label: 'Nutrition & Feeding',
    shortLabel: 'Nutrition',
    icon: Utensils,
    accentColor: 'text-amber-600',
    activeColor: 'bg-amber-700 text-white border-amber-700 shadow-sm',
  },
  {
    key: AcademyCategory.DEVELOPMENT_AND_PLAY,
    label: 'Development & Play',
    shortLabel: 'Play & Growth',
    icon: Sparkles,
    accentColor: 'text-indigo-600',
    activeColor: 'bg-indigo-700 text-white border-indigo-700 shadow-sm',
  },
  {
    key: AcademyCategory.DIGITAL_AND_DEVICES,
    label: 'Modern Digital World',
    shortLabel: 'Digital & Devices',
    icon: Smartphone,
    accentColor: 'text-cyan-600',
    activeColor: 'bg-cyan-800 text-white border-cyan-800 shadow-sm',
  },
];

export interface CategoryPillsProps {
  selectedCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  categoryStats?: AcademyCategoryStatsDTO[];
  className?: string;
}

export function CategoryPills({
  selectedCategory,
  onSelectCategory,
  categoryStats = [],
  className,
}: CategoryPillsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = (category: CategoryFilter) => {
    onSelectCategory(category);

    // Sync query parameter ?category=... with browser URL
    const nextParams = new URLSearchParams(searchParams?.toString() || '');
    if (category === 'ALL') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', category);
    }

    const qs = nextParams.toString();
    const targetUrl = qs ? `${pathname}?${qs}` : pathname;
    router.replace(targetUrl, { scroll: false });
  };

  const getStatsCount = (categoryKey: CategoryFilter) => {
    if (categoryKey === 'ALL') {
      return categoryStats.reduce((acc, cat) => acc + cat.moduleCount, 0);
    }
    const stat = categoryStats.find((s) => s.category === categoryKey);
    return stat ? stat.moduleCount : null;
  };

  return (
    <nav
      aria-label="Academy Categories"
      className={cn('space-y-2', className)}
    >
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Curriculum Category
        </label>
        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
          5 Core Lifespan Pillars
        </span>
      </div>

      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar sm:flex-wrap"
      >
        {ACADEMY_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          const Icon = cat.icon;
          const count = getStatsCount(cat.key);

          return (
            <button
              key={cat.key}
              role="tab"
              type="button"
              aria-selected={isSelected}
              onClick={() => handleSelect(cat.key)}
              className={cn(
                'group flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-150 border shrink-0',
                isSelected
                  ? cat.activeColor
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4 shrink-0 transition-colors',
                  isSelected ? 'text-white' : cat.accentColor
                )}
              />
              <span>{cat.label}</span>
              {count !== null && count >= 0 && (
                <span
                  className={cn(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors',
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
