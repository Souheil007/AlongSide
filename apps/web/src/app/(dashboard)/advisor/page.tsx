import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AdvisorDashboardView } from '@/components/advisor/AdvisorDashboardView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: '24/7 AI Child Advisor — AlongSide',
  description:
    'Real-time pediatric neurobiology advisor for tween tech conflict, boundary battles, and instant de-escalation conversation scripts.',
};

export default function AdvisorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
            <span>Loading 24/7 AI Child Advisor...</span>
          </div>
        </div>
      }
    >
      <AdvisorDashboardView />
    </Suspense>
  );
}
