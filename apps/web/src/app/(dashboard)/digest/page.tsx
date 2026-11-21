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
          <div className="mx-auto w-full max-w-[1180px] space-y-6 pt-4">
            <div className="h-10 w-64 rounded-[8px] bg-[#F3F1EA]" />
            <div className="h-px w-full bg-[#131715]/10" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="aspect-video rounded-[10px] bg-[#F3F1EA]" />
              <div className="aspect-video rounded-[10px] bg-[#F3F1EA]" />
              <div className="aspect-video rounded-[10px] bg-[#F3F1EA]" />
            </div>
          </div>
        }
      >
        <DigestDashboardClient />
      </Suspense>
    </div>
  );
}
