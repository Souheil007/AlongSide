'use client';

import * as React from 'react';
import Link from 'next/link';
import { Smartphone, Shield, ArrowRight, Check, Clock } from 'lucide-react';
import { DevelopmentalTier } from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface PactClauseBridgeWidgetProps {
  tier?: DevelopmentalTier | string | null;
  curfewTime?: string;
  clauseTitle?: string;
  isNightstandMode?: boolean;
  className?: string;
}

export function PactClauseBridgeWidget({
  tier,
  curfewTime = '08:30 PM',
  clauseTitle,
  isNightstandMode = false,
  className,
}: PactClauseBridgeWidgetProps) {
  const [isAdded, setIsAdded] = React.useState<boolean>(false);

  const { effectiveTitle, effectiveCurfew, effectiveDescription } = React.useMemo(() => {
    if (clauseTitle) {
      return {
        effectiveTitle: clauseTitle,
        effectiveCurfew: curfewTime,
        effectiveDescription:
          'Automatically shuts down addictive social apps via signed Apple/Android device profiles so parents avoid nightly screaming matches.',
      };
    }

    if (
      tier === DevelopmentalTier.TIER_0A_INFANCY_0_1 ||
      tier === DevelopmentalTier.TIER_0B_TODDLER_1_2 ||
      tier === DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3
    ) {
      return {
        effectiveTitle: 'Screen-Free Sanctuary: Zero screens in nursery and feeding zones',
        effectiveCurfew: 'All Day',
        effectiveDescription:
          'Guarantees zero background television and device-free feeding zones to preserve parental gaze attunement and optic neural development.',
      };
    }

    if (
      tier === DevelopmentalTier.TIER_3_PRE_TEEN_10_12 ||
      tier === DevelopmentalTier.TIER_2_AGES_10_11 ||
      tier === DevelopmentalTier.TIER_3_AGES_12_13
    ) {
      return {
        effectiveTitle: 'First Smartphone Treaty: 8:30 PM Kitchen Charging Dock',
        effectiveCurfew: '08:30 PM',
        effectiveDescription:
          'Bilateral device pact mandating that the phone is docked on the family kitchen charging station at 8:30 PM sharp, preventing midnight sleep sabotage.',
      };
    }

    if (
      tier === DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15 ||
      tier === DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18
    ) {
      return {
        effectiveTitle: 'Digital Amnesty Clause: Zero confiscation when seeking safety support',
        effectiveCurfew: '10:00 PM',
        effectiveDescription:
          'Ironclad mutual commitment: When an adolescent faces an algorithmic exploit, cyberbullying, or predatory contact, asking for parent help never results in phone confiscation.',
      };
    }

    // Default baseline
    return {
      effectiveTitle: 'Curfew Phone Parking: Bedtime Lockout at 8:30 PM',
      effectiveCurfew: '08:30 PM',
      effectiveDescription:
        'Automatically shuts down addictive social apps via signed Apple/Android device profiles so parents avoid nightly screaming matches.',
    };
  }, [clauseTitle, curfewTime, tier]);

  const handleAddClause = () => {
    setIsAdded(true);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = JSON.parse(
          window.localStorage.getItem('alongside-pact-clauses') || '[]'
        );
        stored.push({
          title: effectiveTitle,
          curfew: effectiveCurfew,
          enforcement: 'NEUTRAL_MDM_PROFILE',
          addedAt: new Date().toISOString(),
        });
        window.localStorage.setItem('alongside-pact-clauses', JSON.stringify(stored));
      } catch {
        // ignore
      }
    }
  };

  return (
    <div
      data-testid="pact-clause-bridge-widget"
      aria-label="Pact-as-Code Device Curfew Clause"
      className={cn(
        'rounded-2xl border p-5 sm:p-6 my-8 shadow-xs transition-colors space-y-4',
        isNightstandMode
          ? 'bg-stone-900 border-stone-800 text-stone-200'
          : 'bg-gradient-to-br from-indigo-50/60 via-purple-50/30 to-white border-indigo-200/90 text-slate-800',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
          <Smartphone className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span>Pact-as-Code · Bilateral Device Agreement Bridge</span>
        </div>
        <span className="text-xs text-indigo-700 dark:text-indigo-400 font-medium">
          Neutral MDM Enforcement
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-indigo-200/80 dark:border-stone-700 bg-white dark:bg-stone-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 shrink-0">
              <Clock className="h-3 w-3" />
            </span>
            <strong className="text-xs sm:text-sm font-bold text-slate-900 dark:text-stone-100">
              {effectiveTitle}
            </strong>
          </div>
          <p className="text-xs text-slate-600 dark:text-stone-400">
            {effectiveDescription}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            onClick={handleAddClause}
            data-testid="add-clause-pact-btn"
            disabled={isAdded}
            className={cn(
              'gap-1.5 font-semibold text-xs h-8 px-3 rounded-lg shadow-xs transition-colors cursor-pointer',
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            )}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Clause Added!</span>
              </>
            ) : (
              <>
                <Shield className="h-3.5 w-3.5" />
                <span>Add to Family Pact</span>
              </>
            )}
          </Button>

          <Link href="/agreements">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1 border-indigo-200 text-indigo-700 dark:border-stone-700 dark:text-indigo-300 cursor-pointer"
            >
              <span>View Pact</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
