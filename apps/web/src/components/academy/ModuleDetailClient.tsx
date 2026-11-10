'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { getAcademyModuleBySlug } from '@/lib/api/academy';
import { useChildContextStore, selectActiveChild } from '@/stores/useChildContextStore';
import { BiteSizedCourseDetailView } from '@/components/academy/BiteSizedCourseDetailView';
import { Button } from '@/components/ui/Button';

export interface ModuleDetailClientProps {
  slug: string;
}

export function ModuleDetailClient({ slug }: ModuleDetailClientProps) {
  const { data: module, isLoading, isError, error } = useQuery({
    queryKey: ['academy-module-detail', slug],
    queryFn: () => getAcademyModuleBySlug(slug),
  });

  // Active Child Context for stage match calibration (unconditionally declared at the top per React Rules of Hooks)
  const { children, activeChildId } = useChildContextStore();
  const activeChild = selectActiveChild({ children, activeChildId });

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 py-8 px-4 sm:px-6 animate-pulse">
        <div className="h-5 w-32 bg-slate-200 rounded" />
        <div className="space-y-3">
          <div className="h-4 w-40 bg-slate-200 rounded" />
          <div className="h-8 w-3/4 bg-slate-200 rounded" />
          <div className="h-4 w-full bg-slate-200 rounded" />
        </div>
        <div className="h-64 rounded-2xl bg-white border border-slate-200 p-6 space-y-4" />
        <div className="h-48 rounded-xl bg-white border border-slate-200 p-4 space-y-2" />
      </div>
    );
  }

  if (isError || !module) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-4">
        <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
        <h2 className="text-xl font-serif font-bold text-slate-900">Module Not Found</h2>
        <p className="text-sm text-slate-600">
          {error instanceof Error ? error.message : "The requested academy module couldn't be located."}
        </p>
        <Link href="/academy">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Academy Curriculum
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <BiteSizedCourseDetailView module={module} activeChild={activeChild} />
  );
}
