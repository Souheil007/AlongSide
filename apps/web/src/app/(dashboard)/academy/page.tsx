import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AcademyCatalogClient } from '@/components/academy/AcademyCatalogClient';
import { Badge } from '@/components/ui/Badge';
import { GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Parent Intelligence Academy — AlongSide',
  description:
    'Pediatric neurobiology micro-lessons, conversational scripts, and developmental science to replace daily digital conflict.',
};

export default function AcademyPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* Academy Hero Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-3 py-1 text-xs font-semibold text-teal-800">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Parent Intelligence Academy</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Neurodevelopmental Parenting Curriculum
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Bite-sized, clinically backed lessons covering child neurobiology, sensory co-regulation, purposeful play, and digital transitions across all developmental stages from birth to adulthood (Ages 0–18).
        </p>
      </header>

      {/* Interactive Catalog */}
      <Suspense
        fallback={
          <div className="h-96 rounded-2xl border border-slate-200 bg-white p-8 animate-pulse flex items-center justify-center">
            <p className="text-sm text-slate-400">Loading Academy curriculum...</p>
          </div>
        }
      >
        <AcademyCatalogClient />
      </Suspense>
    </div>
  );
}
