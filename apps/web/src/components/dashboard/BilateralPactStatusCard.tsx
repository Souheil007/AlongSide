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
        'border-[#E3E3DC] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-[10px] hover:border-[#143D2B]/30 transition-colors',
        className
      )}
    >
      <CardHeader className="p-5 pb-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#EAF3EE] text-[#143D2B] font-bold"
            >
              {isPreDevice ? <Compass className="h-4 w-4" /> : <FileCheck2 className="h-4 w-4" />}
            </span>
            <span
              className="text-xs font-mono font-medium text-[#143D2B] uppercase tracking-wider"
            >
              {isPreDevice ? 'First-Phone Readiness' : 'Bilateral Family Pact'}
            </span>
          </div>

          <Badge
            variant={isPreDevice ? 'roadPre' : 'roadActive'}
            className="text-[10px] font-mono uppercase tracking-wider rounded-full"
          >
            {isPreDevice ? 'Road 1: Pre-Device' : 'Road 2: Active-Device'}
          </Badge>
        </div>

        <div>
          <CardTitle className="font-serif text-base sm:text-lg font-semibold text-[#111413] leading-snug">
            {isPreDevice
              ? `${childName}'s First-Phone Assessment`
              : `${childName}'s Bedtime Curfew & Pact-as-Code`}
          </CardTitle>
          <CardDescription className="text-xs text-[#494F4C] mt-0.5 leading-relaxed">
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
            <div className="rounded-[8px] border border-[#E3E3DC] bg-[#F4F4F0] p-3.5 space-y-2">
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs text-[#494F4C]">
                  Current Readiness Score
                </span>
                <span className="font-serif text-xl font-bold text-[#143D2B]">
                  78 / 100
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#E3E3DC]">
                <div
                  className="h-full bg-[#143D2B] rounded-full transition-all duration-500"
                  style={{ width: '78%' }}
                />
              </div>

              <div className="pt-1 flex items-start gap-2 text-xs text-[#494F4C]">
                <Sparkles className="h-4 w-4 text-[#143D2B] shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <span className="font-semibold text-[#111413]">Next Readiness Milestone:</span> Demonstrate 2 consecutive weeks of independent morning alarm waking without parent reminders.
                </p>
              </div>
            </div>

            <Link href={`/children/${childId}/readiness`} className="block w-full">
              <Button
                variant="outline"
                className="w-full min-h-[44px] gap-2 text-xs font-medium border-[#E3E3DC] text-[#111413] hover:bg-[#F4F4F0] rounded-[5px]"
              >
                <span>View Full Readiness Diagnostic</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#143D2B]" />
              </Button>
            </Link>
          </div>
        ) : (
          /* Active-Device View: 8:30 PM Bedtime Dock & Pact Protection */
          <div className="space-y-3">
            <div className="rounded-[8px] border border-[#E3E3DC] bg-[#F4F4F0] p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-[#143D2B]" />
                  <span className="font-serif font-semibold text-sm text-[#111413]">
                    Bedtime Dock: 8:30 PM Lock
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono border-[#E3E3DC] bg-white text-[#143D2B] rounded-full"
                >
                  <Lock className="h-3 w-3 mr-1 text-[#143D2B]" />
                  Hardware Enforced
                </Badge>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#858C88] font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-[#143D2B] shrink-0" />
                <span>Zero Spyware • No Secret Keystroke Logging • Bilateral Agreement</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#858C88] border-t border-[#E3E3DC] pt-2">
                <span>Dual Signed: Parent + Child</span>
                <span className="text-[#143D2B] font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Active Profile
                </span>
              </div>
            </div>

            <Link href={`/devices?childId=${childId}`} className="block w-full">
              <Button
                variant="outline"
                className="w-full min-h-[44px] gap-2 text-xs font-medium border-[#E3E3DC] text-[#111413] hover:bg-[#F4F4F0] rounded-[5px]"
              >
                <span>Review Family Pact & Schedule</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#143D2B]" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
