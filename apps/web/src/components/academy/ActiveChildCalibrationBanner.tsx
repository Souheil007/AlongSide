'use client';

import * as React from 'react';
import { User, ChevronDown, Sparkles, Check, Baby, Compass } from 'lucide-react';
import { DevelopmentalTier } from '@alongside/shared';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface ActiveChildCalibrationBannerProps {
  childName?: string | null;
  childAge?: number | null;
  childTier?: DevelopmentalTier | null;
  selectedTier: 'ALL' | DevelopmentalTier;
  onSelectTier: (tier: 'ALL' | DevelopmentalTier) => void;
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
  selectedTier,
  onSelectTier,
  className,
}: ActiveChildCalibrationBannerProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeStageLabel = getTierStageName(childTier);
  const selectedTierOption = TIER_OPTIONS.find((t) => t.key === selectedTier) || TIER_OPTIONS[0];

  return (
    <div
      className={cn(
        'relative rounded-2xl border border-teal-200/90 bg-gradient-to-r from-teal-50/70 via-emerald-50/40 to-white p-4 sm:p-5 shadow-xs',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Child Context Display */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white font-bold text-sm shrink-0 shadow-xs">
            {childName ? childName.charAt(0).toUpperCase() : <Baby className="h-5 w-5" />}
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-teal-600" />
                Active Child Calibration
              </span>
            </div>

            <p className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {childName ? (
                <>
                  Calibrated for {childName}{' '}
                  <span className="text-sm font-semibold text-slate-600">
                    ({childAge !== undefined && childAge !== null ? `Age ${childAge} · ` : ''}
                    {activeStageLabel})
                  </span>
                </>
              ) : (
                'Lifespan Parenting Curriculum'
              )}
            </p>

            <p className="text-xs text-slate-600">
              Courses, prioritized chapters, and clinical scripts dynamically calibrated to this developmental window.
            </p>
          </div>
        </div>

        {/* Tier Switcher Dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden md:inline">Viewing Stage:</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              className="gap-2 border-teal-300/80 bg-white text-teal-900 hover:bg-teal-50/80 font-semibold text-xs h-9"
            >
              <Compass className="h-3.5 w-3.5 text-teal-600" />
              <span>{selectedTierOption?.stageName || 'Filter by Stage'}</span>
              <ChevronDown className={cn('h-3.5 w-3.5 text-teal-600 transition-transform', isDropdownOpen && 'rotate-180')} />
            </Button>
          </div>

          {isDropdownOpen && (
            <div
              role="listbox"
              className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-30 space-y-1 animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Explore Developmental Phases</p>
                <p className="text-[11px] text-slate-500">
                  Switch to view upcoming or earlier childhood chapters.
                </p>
              </div>

              <div className="max-h-72 overflow-y-auto py-1 space-y-0.5">
                {TIER_OPTIONS.map((opt) => {
                  const isCurrent = selectedTier === opt.key;
                  return (
                    <button
                      key={opt.key}
                      role="option"
                      aria-selected={isCurrent}
                      type="button"
                      onClick={() => {
                        onSelectTier(opt.key);
                        setIsDropdownOpen(false);
                      }}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors',
                        isCurrent
                          ? 'bg-teal-50 text-teal-900 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{opt.label}</p>
                        <p className="text-[11px] text-slate-500">{opt.ageSpan}</p>
                      </div>
                      {isCurrent && <Check className="h-4 w-4 text-teal-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
