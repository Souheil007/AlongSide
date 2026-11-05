import * as React from 'react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { HealthDashboardView } from '@/components/health/HealthDashboardView';
import { AdvisoryDomainBanner } from '@/components/shared/AdvisoryDomainBanner';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pediatric Health Sanctuary & Clinical Advisory — AlongSide',
  description:
    'Calibrated 3-zone pediatric symptom triage, Barton Schmitt clinical protocols, and sleep regression timelines. Elevated into the Parent Intelligence Academy.',
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
    <div className="w-full space-y-6">
      <AdvisoryDomainBanner
        category="HEALTH_AND_WELLNESS"
        categoryLabel="Pediatric Health & Sleep Foundations"
        title="This domain has been elevated into the Parent Intelligence Academy"
        description="Access structured, prioritized pediatric chapters, sleep architecture protocols, and actionable clinical scripts."
        actionText="Explore Health & Sleep Courses →"
        href="/academy?category=HEALTH_AND_WELLNESS"
      />
      <Suspense fallback={<HealthLoadingFallback />}>
        <HealthDashboardView initialChildId={resolvedParams?.childId} />
      </Suspense>
    </div>
  );
}
