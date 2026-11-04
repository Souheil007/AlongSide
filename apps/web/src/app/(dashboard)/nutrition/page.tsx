import * as React from 'react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { NutritionDashboardView } from '@/components/nutrition/NutritionDashboardView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pediatric Nutrition & Feeding Hub — AlongSide',
  description:
    'Pediatric nutrition from infancy to adolescence: Baby-led weaning, safe allergen introduction (LEAP trial), choking hazards registry, and Ellyn Satter Division of Responsibility.',
};

interface NutritionPageProps {
  searchParams?: Promise<{ childId?: string }>;
}

function NutritionLoadingFallback() {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
        <span>Loading Pediatric Nutrition Hub...</span>
      </div>
    </div>
  );
}

export default async function NutritionPage({ searchParams }: NutritionPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;

  return (
    <div className="w-full">
      <Suspense fallback={<NutritionLoadingFallback />}>
        <NutritionDashboardView initialChildId={resolvedParams?.childId} />
      </Suspense>
    </div>
  );
}
