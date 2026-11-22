import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FaqExplorerView } from '@/components/advisor/FaqExplorerView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ Library',
  description:
    'Evidence-based answers to common developmental and digital parenting dilemmas, with word-for-word scripts.',
};

export default function FaqsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[480px] items-center justify-center">
          <div className="flex items-center gap-2.5 text-[14px] text-[#69726D]">
            <Loader2 className="h-4 w-4 animate-spin text-[#143D2B]" />
            <span>Loading FAQ Library...</span>
          </div>
        </div>
      }
    >
      <FaqExplorerView />
    </Suspense>
  );
}
