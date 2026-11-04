'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Utensils,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Apple,
  Sparkles,
} from 'lucide-react';
import { type ChildDTO } from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface DailyNutritionTipCardProps {
  child: ChildDTO | null;
  className?: string;
}

interface NutritionInsight {
  stageTitle: string;
  focusTitle: string;
  summary: string;
  actionableStep: string;
  safetyCaution?: string;
  clinicalSource: string;
  badgeLabel: string;
}

function resolveNutritionInsight(child: ChildDTO | null): NutritionInsight {
  const age = child?.age ?? 8;

  if (age <= 2) {
    return {
      stageTitle: 'Infancy & Complementary Solids (0–2 yrs)',
      focusTitle: 'Safe Early Allergen Exposure: Thinned Peanut Butter',
      summary:
        'The LEAP study demonstrated that regular early introduction of common allergens reduces food allergy development by up to 86%.',
      actionableStep:
        'Stir 2 tsp of smooth peanut butter into 2–3 tbsp of warm water, breastmilk, or oatmeal until creamy and thin. Offer during morning wake window so you can observe baby for 2 hours.',
      safetyCaution:
        'Strict Choking Caution: Never offer whole peanuts, chunky nut butter, or thick sticky spoonfuls. Airway blockage risk is high.',
      clinicalSource: 'AAP Pediatric Allergy Guidelines / LEAP Protocol',
      badgeLabel: 'Allergen Exposure',
    };
  }

  if (age <= 6) {
    return {
      stageTitle: 'Early Childhood Nutrition (3–6 yrs)',
      focusTitle: 'Picky Eating & The 10-Exposure Rule',
      summary:
        'Neophobia (fear of new foods) peaks between ages 2 and 5. Children often require 10 to 15 calm, pressure-free exposures to a new vegetable before tasting it voluntarily.',
      actionableStep:
        'Place a pea-sized piece of broccoli or bell pepper on a "learning plate" next to their dinner. Tell them: "You don\'t have to eat it; it can just hang out on your plate so your eyes can meet it."',
      safetyCaution:
        'Avoid bargaining ("3 more bites of carrots for dessert") which elevates dessert value and reinforces vegetable aversion.',
      clinicalSource: 'Ellyn Satter Division of Responsibility / AAP Nutrition',
      badgeLabel: 'Picky Eating De-Escalation',
    };
  }

  if (age <= 12) {
    return {
      stageTitle: 'Middle Childhood & Elementary (7–12 yrs)',
      focusTitle: 'Division of Responsibility at Family Dinner',
      summary:
        'When parents enforce clean-plate rules, children lose their internal intuitive satiety cues, increasing future disordered eating risks.',
      actionableStep:
        'Apply the Golden Division: Parents decide WHAT food is served, WHEN it is served, and WHERE. The child decides IF they eat and HOW MUCH. Keep dinners device-free to tune into fullness signals.',
      clinicalSource: 'Ellyn Satter Institute / AAP Healthy Children',
      badgeLabel: 'Family Meal Architecture',
    };
  }

  return {
    stageTitle: 'Adolescent & Teen Upbringing (13–18 yrs)',
    focusTitle: 'Circadian Nutrition & Evening Magnesium Support',
    summary:
      'Pubertal growth spurts demand iron and calcium, while late-night caffeine or sugar intake severely interferes with delayed adolescent melatonin onset.',
    actionableStep:
      'Establish a firm 2:00 PM caffeine curfew (sodas, iced teas, energy drinks). Provide an evening wind-down snack rich in magnesium (handful of pumpkin seeds, Greek yogurt, or banana) 45 minutes before bedtime.',
    safetyCaution:
      'Avoid high-sugar snacks after 8:00 PM, which cause rapid glucose spikes that fragment Stage 3 deep restorative sleep.',
    clinicalSource: 'Adolescent Medicine & Circadian Sleep Neurobiology',
    badgeLabel: 'Pubertal Sleep & Nutrition',
  };
}

export function DailyNutritionTipCard({ child, className }: DailyNutritionTipCardProps) {
  const insight = React.useMemo(() => resolveNutritionInsight(child), [child]);

  return (
    <Card className={cn('border-slate-200/90 bg-white shadow-xs overflow-hidden', className)}>
      <CardHeader className="pb-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50/40 via-white to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                <Utensils className="h-3.5 w-3.5" />
              </span>
              <CardTitle className="text-base font-bold text-slate-900">
                Daily Nutrition & Feeding Rhythm
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              {insight.stageTitle}
            </CardDescription>
          </div>

          <Badge variant="outline" className="text-[10px] font-bold text-emerald-900 border-emerald-200 bg-emerald-50/60 self-start sm:self-auto">
            {insight.badgeLabel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3.5">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            {insight.focusTitle}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {insight.summary}
          </p>
        </div>

        {/* Actionable Today Box */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
            <span>Today&apos;s Pediatric Recommendation:</span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            {insight.actionableStep}
          </p>
        </div>

        {/* Safety Caution if present */}
        {insight.safetyCaution && (
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px] font-medium">
              {insight.safetyCaution}
            </p>
          </div>
        )}

        {/* Footer with Authority & Link */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium">
            Authority: {insight.clinicalSource}
          </span>

          <Link
            href="/nutrition"
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>Complete Nutrition Hub</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
