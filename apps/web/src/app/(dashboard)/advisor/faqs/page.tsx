import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FaqExplorerView } from '@/components/advisor/FaqExplorerView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Living Modern Parenting FAQ Explorer — AlongSide',
  description:
    'Pediatric and neurobiology-backed answers to 100+ digital dilemmas, screen battles, secret apps, and bedtime conflict.',
};

export default function FaqsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
            <span>Loading Living Modern Parenting FAQ Explorer...</span>
          </div>
        </div>
      }
    >
      <FaqExplorerView />
    </Suspense>
  );
}
