import * as React from 'react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BehaviorDashboardView } from '@/components/behavior/BehaviorDashboardView';
import { AdvisoryDomainBanner } from '@/components/shared/AdvisoryDomainBanner';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Behavioral Psychology & De-escalation Scripts — AlongSide Family OS',
  description:
    'HALT tantrum diagnostic framework, authoritative Time-Ins, and word-for-word emotional co-regulation scripts. Elevated into the Parent Intelligence Academy.',
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
    <div className="w-full space-y-6">
      <AdvisoryDomainBanner
        category="BEHAVIOR_AND_EMOTIONS"
        categoryLabel="Behavior & Emotional Co-Regulation"
        title="This domain has been elevated into the Parent Intelligence Academy"
        description="Access structured, prioritized behavioral chapters, HALT tantrum de-escalation protocols, and word-for-word co-regulation scripts."
        actionText="Explore Behavior & Emotion Courses →"
        href="/academy?category=BEHAVIOR_AND_EMOTIONS"
      />
      <Suspense fallback={<BehaviorLoadingFallback />}>
        <BehaviorDashboardView initialChildId={resolvedParams?.childId} />
      </Suspense>
    </div>
  );
}
