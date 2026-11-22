import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AdvisorDashboardView } from '@/components/advisor/AdvisorDashboardView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Parent Advisor',
  description:
    'Real-time developmental guidance for parenting friction, boundary battles, and calm word-for-word conversation scripts.',
};

export default function AdvisorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[480px] items-center justify-center">
          <div className="flex items-center gap-2.5 text-[14px] text-[#69726D]">
            <Loader2 className="h-4 w-4 animate-spin text-[#143D2B]" />
            <span>Loading Parent Advisor...</span>
          </div>
        </div>
      }
    >
      <AdvisorDashboardView />
    </Suspense>
  );
}
