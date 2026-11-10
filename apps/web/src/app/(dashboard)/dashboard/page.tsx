import { Suspense } from 'react';
import type { Metadata } from 'next';
import { HolisticHomeFeed } from '@/components/dashboard/HolisticHomeFeed';

export const metadata: Metadata = {
  title: 'Home • AlongSide Family Operating System',
  description:
    'Daily developmental milestones, purposeful brain play, restorative sleep architecture, and personalized nutrition for your family.',
};

interface PageProps {
  searchParams?: Promise<{ childId?: string }>;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-44 rounded-2xl bg-slate-200/60" />

      {/* Health Launcher Skeleton */}
      <div className="h-32 rounded-2xl bg-slate-200/50" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="h-80 rounded-2xl bg-slate-200/50" />
          <div className="h-64 rounded-2xl bg-slate-200/50" />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="h-64 rounded-2xl bg-slate-200/50" />
          <div className="h-56 rounded-2xl bg-slate-200/50" />
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <Suspense fallback={<DashboardSkeleton />}>
        <HolisticHomeFeed initialChildId={resolvedSearchParams?.childId} />
      </Suspense>
    </div>
  );
}
