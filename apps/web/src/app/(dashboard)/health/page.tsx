import * as React from 'react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { HealthDashboardView } from '@/components/health/HealthDashboardView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pediatric Health Companion & Triage — AlongSide',
  description:
    'Calibrated 3-zone pediatric symptom triage, Barton Schmitt clinical protocols, antipyretic dosing calculator, and sleep regression timelines.',
};

interface HealthPageProps {
  searchParams?: Promise<{ childId?: string }>;
}

function HealthLoadingFallback() {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
        <span>Loading Pediatric Health Sanctuary...</span>
      </div>
    </div>
  );
}

export default async function HealthPage({ searchParams }: HealthPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;

  return (
    <div className="w-full">
      <Suspense fallback={<HealthLoadingFallback />}>
        <HealthDashboardView initialChildId={resolvedParams?.childId} />
      </Suspense>
    </div>
  );
}
