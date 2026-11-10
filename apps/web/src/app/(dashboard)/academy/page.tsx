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
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E3DC] bg-[#EAF3EE] px-3 py-1 font-mono text-xs font-medium text-[#143D2B]">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Parent Intelligence Academy</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#111413]">
          Neurodevelopmental Parenting Curriculum
        </h1>

        <p className="text-[#494F4C] text-sm sm:text-base max-w-3xl leading-relaxed">
          Bite-sized, evidence-grounded lessons covering child neurobiology, sensory co-regulation, purposeful play, and digital transitions across all developmental stages from birth to adulthood (Ages 0–18).
        </p>
      </header>

      {/* Interactive Catalog */}
      <Suspense
        fallback={
          <div className="h-96 rounded-[10px] border border-[#E3E3DC] bg-white p-8 animate-pulse flex items-center justify-center">
            <p className="text-sm font-mono text-[#858C88]">Loading Academy curriculum...</p>
          </div>
        }
      >
        <AcademyCatalogClient />
      </Suspense>
    </div>
  );
}
