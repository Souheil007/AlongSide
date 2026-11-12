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
    <div className="max-w-7xl mx-auto py-2">
      <Suspense
        fallback={
          <div className="space-y-8 animate-pulse">
            <header className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E3DC] bg-[#EAF3EE] px-3 py-1 font-mono text-xs font-medium text-[#143D2B]">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Parenting Academy</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#111413]">
                Parenting Curriculum
              </h1>
              <p className="text-[#494F4C] text-sm sm:text-base max-w-3xl leading-relaxed">
                Loading calibrated parenting curriculum...
              </p>
            </header>
            <div className="h-96 rounded-[10px] border border-[#E3E3DC] bg-white p-8 flex items-center justify-center">
              <p className="text-sm font-mono text-[#858C88]">Loading Academy curriculum...</p>
            </div>
          </div>
        }
      >
        <AcademyCatalogClient />
      </Suspense>
    </div>
  );
}
