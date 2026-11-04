import * as React from 'react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BrainGamesDashboardView } from '@/components/brain-games/BrainGamesDashboardView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Brain Games, Sensory Play & Early Toys — AlongSide Family OS',
  description:
    'Age-indexed purposeful play grounded in Harvard Center on the Developing Child ("Serve and Return") research, puppet emotional sparring, sensory bins, and Boredom Buster generator.',
};

interface BrainGamesPageProps {
  searchParams?: Promise<{ childId?: string }>;
}

function BrainGamesLoadingFallback() {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
        <span>Loading Purposeful Play & Brain Games...</span>
      </div>
    </div>
  );
}

export default async function BrainGamesPage({ searchParams }: BrainGamesPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;

  return (
    <div className="w-full">
      <Suspense fallback={<BrainGamesLoadingFallback />}>
        <BrainGamesDashboardView initialChildId={resolvedParams?.childId} />
      </Suspense>
    </div>
  );
}
