import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DigestDashboardClient } from '@/components/digest/DigestDashboardClient';

export const metadata: Metadata = {
  title: 'Culture & Trends',
  description:
    'Calm weekly blogs, curated parent talks, and Sunday dinner conversation prompts calibrated to your child’s developmental stage.',
};

export default function DigestPage() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-[1180px] space-y-6 pt-4 animate-pulse">
            {/* Header Skeleton matching DigestFeedHeader */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="h-8 w-48 rounded-[8px] bg-[#F3F1EA]" />
                <div className="h-7 w-32 rounded-[6px] bg-[#F3F1EA]" />
              </div>
              <div className="h-4 w-72 rounded-[4px] bg-[#F3F1EA]" />
              <div className="h-px w-full bg-[#131715]/10" />
              {/* Tab Bar Skeleton */}
              <div className="flex gap-4 pt-1">
                <div className="h-8 w-24 rounded-full bg-[#EAF3EE]" />
                <div className="h-8 w-20 rounded-full bg-[#F3F1EA]" />
                <div className="h-8 w-20 rounded-full bg-[#F3F1EA]" />
                <div className="h-8 w-20 rounded-full bg-[#F3F1EA]" />
              </div>
            </div>

            {/* Watch Band Skeleton matching WatchThisWeekBand (3 video cards) */}
            <div className="space-y-4 pt-4">
              <div className="h-6 w-36 rounded-[6px] bg-[#F3F1EA]" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="aspect-video rounded-[10px] bg-[#F3F1EA]" />
                <div className="aspect-video rounded-[10px] bg-[#F3F1EA]" />
                <div className="aspect-video rounded-[10px] bg-[#F3F1EA]" />
              </div>
            </div>

            {/* Read Band Skeleton matching ReadThisWeekBand */}
            <div className="space-y-4 border-t border-[#131715]/10 pt-8">
              <div className="h-6 w-32 rounded-[6px] bg-[#F3F1EA]" />
              <div className="h-48 rounded-[12px] bg-[#F3F1EA]" />
            </div>
          </div>
        }
      >
        <DigestDashboardClient />
      </Suspense>
    </div>
  );
}
