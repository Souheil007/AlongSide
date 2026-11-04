'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Calendar,
  Compass,
  FileCheck2,
  ChevronRight,
  Shield,
  User,
} from 'lucide-react';
import {
  type ChildDTO,
  RoadType,
} from '@alongside/shared';
import {
  formatChildAge,
  getChildDevelopmentalHorizon,
} from '@/stores/useChildContextStore';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface ChildHeroCardProps {
  child: ChildDTO | null;
  className?: string;
  onOpenOnboarding?: () => void;
}

export function ChildHeroCard({
  child,
  className,
  onOpenOnboarding,
}: ChildHeroCardProps) {
  if (!child) {
    return (
      <Card
        className={cn(
          'border-dashed border-2 border-teal-300 bg-teal-50/40 p-6 sm:p-8 text-center shadow-xs',
          className
        )}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-800 mb-3">
          <Shield className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Welcome to Alongside Family Operating System
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
          Add your first child profile to personalize daily developmental milestones, purposeful play, and pediatric health triage.
        </p>
        <div className="mt-4">
          <Button
            onClick={onOpenOnboarding}
            className="min-h-[44px] gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs px-6"
          >
            Add First Child Profile
          </Button>
        </div>
      </Card>
    );
  }

  const isPreDevice = child.roadType === RoadType.PRE_DEVICE;
  const horizon = getChildDevelopmentalHorizon(child.developmentalTier || child.age);
  const formattedAge = formatChildAge(child);

  // Friendly date formatting
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <Card
      className={cn(
        'border-teal-200/90 bg-gradient-to-br from-white via-[#FCFBF8] to-teal-50/30 shadow-sm overflow-hidden',
        className
      )}
    >
      <CardContent className="p-5 sm:p-6 space-y-4">
        {/* Top Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-100 text-teal-800 text-xs font-bold">
              <Calendar className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-bold text-slate-700 tracking-tight">
              {todayFormatted}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={isPreDevice ? 'roadPre' : 'roadActive'}
              className="text-[10px] font-bold uppercase tracking-wider"
            >
              {isPreDevice ? 'Road 1: Pre-Device' : 'Road 2: Active-Device'}
            </Badge>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-bold border',
                horizon.badgeColor
              )}
            >
              {horizon.tierLabel.split(':')[0]?.trim() || 'Tier'}
            </span>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            {/* Child Avatar with Initial */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-xl font-black text-white shadow-sm ring-4 ring-teal-50">
              {child.name.charAt(0).toUpperCase()}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  {child.name}&apos;s Daily Horizon
                </h1>
                <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/80">
                  {formattedAge}
                </span>
                {child.schoolGrade && (
                  <span className="text-xs text-slate-500 font-medium">
                    • {child.schoolGrade}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
                <Sparkles className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                <span>{horizon.horizon}</span>
              </div>

              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {horizon.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Road Action Launcher */}
          <div className="shrink-0 flex items-center gap-2 self-start md:self-center">
            {isPreDevice ? (
              <Link href={`/children/${child.id}/readiness`}>
                <Button
                  size="sm"
                  className="min-h-[44px] gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-2xs"
                >
                  <Compass className="h-4 w-4" />
                  <span>First-Phone Readiness</span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-80" />
                </Button>
              </Link>
            ) : (
              <Link href={`/devices?childId=${child.id}`}>
                <Button
                  size="sm"
                  className="min-h-[44px] gap-1.5 bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold shadow-2xs"
                >
                  <FileCheck2 className="h-4 w-4" />
                  <span>Curfew & Pacts</span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-80" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
