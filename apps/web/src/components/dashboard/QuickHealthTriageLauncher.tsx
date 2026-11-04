'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  HeartPulse,
  Thermometer,
  Activity,
  AlertTriangle,
  Moon,
  Shield,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { type ChildDTO } from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface QuickHealthTriageLauncherProps {
  child: ChildDTO | null;
  className?: string;
}

interface QuickSymptomOption {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  border: string;
  queryParam: string;
  description: string;
}

const QUICK_SYMPTOMS: QuickSymptomOption[] = [
  {
    label: 'Fever & Temperature',
    icon: Thermometer,
    color: 'text-amber-700',
    bg: 'bg-amber-50/80 hover:bg-amber-100/80',
    border: 'border-amber-200',
    queryParam: 'symptom=fever',
    description: 'Weight-based dosing & safe fever duration protocols',
  },
  {
    label: 'Cough & Breathing',
    icon: Activity,
    color: 'text-sky-700',
    bg: 'bg-sky-50/80 hover:bg-sky-100/80',
    border: 'border-sky-200',
    queryParam: 'symptom=breathing_retractions',
    description: 'Chest retractions, stridor & work-of-breathing triage',
  },
  {
    label: 'Rash & Skin Changes',
    icon: AlertTriangle,
    color: 'text-rose-700',
    bg: 'bg-rose-50/80 hover:bg-rose-100/80',
    border: 'border-rose-200',
    queryParam: 'symptom=rash',
    description: 'Non-blanching glass test & fever rash red flags',
  },
  {
    label: 'Sleep & Night Waking',
    icon: Moon,
    color: 'text-indigo-700',
    bg: 'bg-indigo-50/80 hover:bg-indigo-100/80',
    border: 'border-indigo-200',
    queryParam: 'tab=sleep',
    description: 'Circadian delay, nap transitions & night awakenings',
  },
];

export function QuickHealthTriageLauncher({
  child,
  className,
}: QuickHealthTriageLauncherProps) {
  const childParam = child ? `&childId=${child.id}` : '';

  return (
    <Card className={cn('border-teal-200/90 bg-white shadow-xs overflow-hidden', className)}>
      <CardHeader className="pb-3 border-b border-slate-100 bg-gradient-to-r from-teal-50/50 via-white to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-600 text-white text-xs font-bold">
                <HeartPulse className="h-3.5 w-3.5" />
              </span>
              <CardTitle className="text-base font-bold text-slate-900">
                Health Companion: 1-Tap Pediatric Triage
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Barton Schmitt clinical protocols • Safe decision-making at 2:00 AM
            </CardDescription>
          </div>

          <Badge variant="outline" className="text-[10px] font-bold text-teal-800 border-teal-200 bg-teal-50 self-start sm:self-auto">
            Safe Resort Protocol
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* 4 Quick Launchers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_SYMPTOMS.map((item) => {
            const Icon = item.icon;
            const href = `/health?${item.queryParam}${childParam}`;

            return (
              <Link
                key={item.label}
                href={href}
                className={cn(
                  'group flex flex-col justify-between p-3.5 rounded-2xl border transition-all min-h-[92px]',
                  item.bg,
                  item.border
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Icon className={cn('h-5 w-5', item.color)} />
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {item.label}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* 3-Zone Explanation Banner */}
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-teal-700 shrink-0" />
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">
                3-Zone Pediatric Safety Framework:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Green (Home Care)
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-amber-800">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Yellow (Call Clinic)
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-rose-800">
                  <span className="h-2 w-2 rounded-full bg-rose-500" /> Red (Emergency ER)
                </span>
              </div>
            </div>
          </div>

          <Link href={`/health${childParam ? `?${childParam.slice(1)}` : ''}`}>
            <Button size="sm" variant="outline" className="min-h-[40px] text-xs font-semibold gap-1 shrink-0">
              <span>Open Triage Companion</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
