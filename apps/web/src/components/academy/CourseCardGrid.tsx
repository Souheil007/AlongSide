'use client';

import * as React from 'react';
import { BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import type { AcademyModuleDTO } from '@alongside/shared';
import { ModuleCard } from '@/components/academy/ModuleCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface CourseCardGridProps {
  modules: AcademyModuleDTO[];
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  onRetry?: () => void;
  onResetFilters?: () => void;
  className?: string;
}

export function CourseCardGrid({
  modules,
  isLoading = false,
  isError = false,
  error,
  onRetry,
  onResetFilters,
  className,
}: CourseCardGridProps) {
  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
        {[1, 2, 3, 4, 5, 6].map((skeletonIdx) => (
          <div
            key={skeletonIdx}
            className="h-72 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs animate-pulse space-y-4"
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
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center space-y-3">
        <AlertCircle className="h-8 w-8 text-rose-500 mx-auto" />
        <h3 className="text-base font-bold text-rose-900">
          Failed to Load Academy Courses
        </h3>
        <p className="text-xs sm:text-sm text-rose-700 max-w-md mx-auto">
          {error instanceof Error ? error.message : 'Please check your connection and try again.'}
        </p>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="border-rose-300 text-rose-900 hover:bg-rose-100 gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry Loading</span>
          </Button>
        )}
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
        <BookOpen className="h-10 w-10 text-slate-300 mx-auto" />
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">
            No Academy Courses Found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            No courses match the selected category and developmental tier filters.
          </p>
        </div>
        {onResetFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Reset Filters & View All
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {modules.map((mod) => (
        <ModuleCard key={mod.id} module={mod} />
      ))}
    </div>
  );
}
