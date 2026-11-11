'use client';

import * as React from 'react';
import Link from 'next/link';
import { Smartphone, Shield, ArrowRight, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface PactClauseBridgeWidgetProps {
  curfewTime?: string;
  clauseTitle?: string;
  isNightstandMode?: boolean;
  className?: string;
}

export function PactClauseBridgeWidget({
  curfewTime = '08:30 PM',
  clauseTitle = 'Curfew Phone Parking: Bedtime Lockout at 8:30 PM',
  isNightstandMode = false,
  className,
}: PactClauseBridgeWidgetProps) {
  const [isAdded, setIsAdded] = React.useState<boolean>(false);

  const handleAddClause = () => {
    setIsAdded(true);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = JSON.parse(
          window.localStorage.getItem('alongside-pact-clauses') || '[]'
        );
        stored.push({
          title: clauseTitle,
          curfew: curfewTime,
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
            <span className="flex h-5 w-5 items-center justify-center rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
              <Clock className="h-3 w-3" />
            </span>
            <strong className="text-xs sm:text-sm font-bold text-slate-900 dark:text-stone-100">
              {clauseTitle}
            </strong>
          </div>
          <p className="text-xs text-slate-600 dark:text-stone-400">
            Automatically shuts down addictive social apps via signed Apple/Android device profiles so parents avoid nightly screaming matches.
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
              'gap-1.5 font-semibold text-xs h-8 px-3 rounded-lg shadow-xs transition-colors',
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
              className="h-8 text-xs gap-1 border-indigo-200 text-indigo-700 dark:border-stone-700 dark:text-indigo-300"
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
