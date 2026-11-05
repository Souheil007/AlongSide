'use client';

import * as React from 'react';
import { Sparkles, Calendar, UserCheck } from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import {
  useChildContextStore,
  selectActiveChild,
  getChildDevelopmentalHorizon,
} from '@/stores/useChildContextStore';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface DigestFeedHeaderProps {
  child?: ChildDTO | null;
  issueNumber?: number;
  className?: string;
}

export function DigestFeedHeader({
  child: propChild,
  issueNumber = 42,
  className,
}: DigestFeedHeaderProps) {
  const storeActiveChild = useChildContextStore(selectActiveChild);
  const activeChild = propChild !== undefined ? propChild : storeActiveChild;

  // Calibration badge text
  let calibrationText = 'Tailored for Leo (Age 10 · Pre-Teen)';
  if (activeChild) {
    const horizon = getChildDevelopmentalHorizon(
      activeChild.developmentalTier || activeChild.age
    );
    // Extract short stage label (e.g., "Pre-Teen", "Early Childhood", "Middle Childhood", "Teen")
    let stageLabel = 'Pre-Teen';
    if (activeChild.age <= 3) stageLabel = 'Infant/Toddler';
    else if (activeChild.age <= 6) stageLabel = 'Early Childhood';
    else if (activeChild.age <= 9) stageLabel = 'Elementary';
    else if (activeChild.age <= 12) stageLabel = 'Pre-Teen';
    else stageLabel = 'Teen';

    calibrationText = `Tailored for ${activeChild.name} (Age ${activeChild.age} · ${stageLabel})`;
  }

  return (
    <header className={cn('space-y-4 max-w-7xl mx-auto', className)}>
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Edition Pill */}
        <span
          data-testid="edition-pill"
          className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50/90 px-3 py-1 text-xs font-semibold text-purple-900 shadow-2xs"
        >
          <Calendar className="h-3.5 w-3.5 text-purple-700" aria-hidden="true" />
          <span>Volume {issueNumber} · Released Sunday 8:00 AM</span>
        </span>

        {/* Active Child Calibration Badge */}
        <span
          data-testid="child-calibration-badge"
          className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50/90 px-3 py-1 text-xs font-semibold text-teal-900 shadow-2xs"
        >
          <UserCheck className="h-3.5 w-3.5 text-teal-700" aria-hidden="true" />
          <span>{calibrationText}</span>
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Sunday Youth Culture Digest — The Living Feed to Keep Up With Your Child
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Stay fluently ahead of adolescent slang, algorithmic viral trends, and covert device exploits without becoming the family police officer.
        </p>
      </div>
    </header>
  );
}
