import * as React from 'react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BehaviorDashboardView } from '@/components/behavior/BehaviorDashboardView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Behavioral Psychology & De-escalation Scripts — AlongSide Family OS',
  description:
    'HALT tantrum diagnostic framework (Hungry, Angry/Anxious, Lonely, Tired), authoritative "Time-Ins", and word-for-word emotional co-regulation scripts.',
};

interface BehaviorPageProps {
  searchParams?: Promise<{ childId?: string }>;
}

function BehaviorLoadingFallback() {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
        <span>Loading Behavioral Psychology & Co-Regulation Hub...</span>
      </div>
    </div>
  );
}

export default async function BehaviorPage({ searchParams }: BehaviorPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;

  return (
    <div className="w-full">
      <Suspense fallback={<BehaviorLoadingFallback />}>
        <BehaviorDashboardView initialChildId={resolvedParams?.childId} />
      </Suspense>
    </div>
  );
}
