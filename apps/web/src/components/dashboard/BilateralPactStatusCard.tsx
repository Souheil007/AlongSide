'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Moon,
  ShieldCheck,
  Smartphone,
  Compass,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  type ChildDTO,
  RoadType,
} from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface BilateralPactStatusCardProps {
  child: ChildDTO | null;
  className?: string;
}

export function BilateralPactStatusCard({
  child,
  className,
}: BilateralPactStatusCardProps) {
  const isPreDevice = child?.roadType === RoadType.PRE_DEVICE;
  const childName = child?.name ?? 'Child';
  const childId = child?.id ?? 'default';

  return (
    <Card
      className={cn(
        'border-slate-200/90 bg-white shadow-xs hover:border-slate-300 transition-colors',
        className
      )}
    >
      <CardHeader className="p-5 pb-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-lg font-bold',
                isPreDevice
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-violet-100 text-violet-800'
              )}
            >
              {isPreDevice ? <Compass className="h-4 w-4" /> : <FileCheck2 className="h-4 w-4" />}
            </span>
            <span
              className={cn(
                'text-xs font-bold uppercase tracking-wider',
                isPreDevice ? 'text-emerald-950' : 'text-violet-950'
              )}
            >
              {isPreDevice ? 'First-Phone Readiness' : 'Bilateral Family Pact'}
            </span>
          </div>

          <Badge
            variant={isPreDevice ? 'roadPre' : 'roadActive'}
            className="text-[10px] font-bold uppercase tracking-wider"
          >
            {isPreDevice ? 'Road 1: Pre-Device' : 'Road 2: Active-Device'}
          </Badge>
        </div>

        <div>
          <CardTitle className="text-base font-bold text-slate-900 leading-snug">
            {isPreDevice
              ? `${childName}'s First-Phone Assessment`
              : `${childName}'s Bedtime Curfew & Pact-as-Code`}
          </CardTitle>
          <CardDescription className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            {isPreDevice
              ? 'Objective developmental readiness before buying or handing over a smartphone.'
              : 'Zero spyware, bilateral trust, and automated hardware enforcement.'}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-3.5">
        {isPreDevice ? (
          /* Pre-Device View: Readiness Score (0-100) & Next Milestone */
          <div className="space-y-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950">
                  Current Readiness Score
                </span>
                <span className="text-lg font-black text-emerald-800">
                  78 / 100
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-200/80">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: '78%' }}
                />
              </div>

              <div className="pt-1 flex items-start gap-2 text-xs text-emerald-900">
                <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <span className="font-bold">Next Readiness Milestone:</span> Demonstrate 2 consecutive weeks of independent morning alarm waking without parent reminders.
                </p>
              </div>
            </div>

            <Link href={`/children/${childId}/readiness`} className="block w-full">
              <Button
                variant="outline"
                className="w-full min-h-[44px] gap-2 text-xs font-bold border-emerald-300 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-400"
              >
                <span>View Full Readiness Diagnostic</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        ) : (
          /* Active-Device View: 8:30 PM Bedtime Dock & Pact Protection */
          <div className="space-y-3">
            <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-violet-700" />
                  <span className="text-xs font-bold text-violet-950">
                    Bedtime Dock: 8:30 PM Lock
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] font-bold border-violet-300 bg-white text-violet-800"
                >
                  <Lock className="h-3 w-3 mr-1 text-violet-600" />
                  Hardware Enforced
                </Badge>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Zero Spyware • No Secret Keystroke Logging • Bilateral Agreement</span>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-violet-100 pt-2">
                <span>Dual Signed: Parent + Child</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Active Profile
                </span>
              </div>
            </div>

            <Link href={`/devices?childId=${childId}`} className="block w-full">
              <Button
                variant="outline"
                className="w-full min-h-[44px] gap-2 text-xs font-bold border-violet-300 text-violet-900 hover:bg-violet-50 hover:border-violet-400"
              >
                <span>Review Family Pact & Schedule</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
