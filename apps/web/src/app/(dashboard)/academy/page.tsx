import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AcademyCatalogClient } from '@/components/academy/AcademyCatalogClient';
import { Badge } from '@/components/ui/Badge';
import { GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academy',
  description:
    'Pediatric neurobiology micro-lessons, conversational scripts, and developmental science to replace daily digital conflict.',
};

export default function AcademyPage() {
  return (
    <div className="max-w-7xl mx-auto py-2">
      <Suspense
        fallback={
          <div className="space-y-6 animate-pulse">
            <header className="space-y-3 pb-2">
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

            {/* Skeleton Category Pills matching CategoryPills */}
            <div className="flex flex-wrap gap-2 pt-1 pb-2">
              {[84, 100, 116, 92, 108, 96].map((w, idx) => (
                <div
                  key={idx}
                  className="h-9 rounded-full bg-slate-200"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>

            {/* Skeleton Course Card Grid matching CourseCardGrid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((skeletonIdx) => (
                <div
                  key={skeletonIdx}
                  className="h-72 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-28 bg-slate-200 rounded-full" />
                    <div className="h-4 w-16 bg-slate-200 rounded-full" />
                  </div>
                  <div className="h-6 w-3/4 bg-slate-200 rounded" />
                  <div className="h-14 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  <div className="h-9 w-full bg-slate-200 rounded-xl pt-2" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <AcademyCatalogClient />
      </Suspense>
    </div>
  );
}
