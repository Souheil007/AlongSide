'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { getAcademyModuleBySlug, getLesson } from '@/lib/api/academy';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { LessonReaderView } from '@/components/academy/LessonReaderView';
import { Button } from '@/components/ui/Button';

export interface LessonReaderClientProps {
  moduleSlug: string;
  lessonSlug: string;
}

export function LessonReaderClient({
  moduleSlug,
  lessonSlug,
}: LessonReaderClientProps) {
  const queryClient = useQueryClient();

  // Active child calibration context (declared unconditionally per Rules of Hooks)
  const { children, activeChildId } = useChildContextStore();
  const activeChild = selectActiveChild({ children, activeChildId });

  // 1. Fetch module to get metadata and ordered episode list
  const {
    data: module,
    isLoading: isModuleLoading,
    isError: isModuleError,
    error: moduleError,
  } = useQuery({
    queryKey: ['academy-module-detail', moduleSlug],
    queryFn: () => getAcademyModuleBySlug(moduleSlug),
  });

  const currentLessonSummary = module?.lessons?.find(
    (l) => l.slug === lessonSlug
  );

  // 2. Fetch lesson detail once we have the lesson summary ID
  const {
    data: lessonData,
    isLoading: isLessonLoading,
    isError: isLessonError,
    error: lessonError,
    refetch: refetchLesson,
  } = useQuery({
    queryKey: ['academy-lesson', currentLessonSummary?.id],
    queryFn: () => getLesson(currentLessonSummary!.id),
    enabled: !!currentLessonSummary?.id,
  });

  const lesson = lessonData?.lesson;

  const handleLessonComplete = () => {
    queryClient.invalidateQueries({
      queryKey: ['academy-module-detail', moduleSlug],
    });
    queryClient.invalidateQueries({ queryKey: ['academy-modules'] });
    if (currentLessonSummary?.id) {
      queryClient.invalidateQueries({
        queryKey: ['academy-lesson', currentLessonSummary.id],
      });
    }
  };

  if (isModuleLoading || (currentLessonSummary && isLessonLoading)) {
    return (
      <div className="mx-auto max-w-[700px] space-y-6 py-10 px-4 animate-pulse">
        <div className="h-4 w-44 rounded bg-[var(--canvas-subtle)]" />
        <div className="h-12 w-5/6 rounded-lg bg-[var(--canvas-subtle)]" />
        <div className="h-5 w-2/3 rounded bg-[var(--canvas-subtle)]" />
        <div className="h-64 rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)] p-6 space-y-4" />
      </div>
    );
  }

  if (isModuleError || !module) {
    return (
      <div className="mx-auto max-w-md py-16 text-center space-y-4 px-4">
        <AlertCircle className="mx-auto h-10 w-10 text-[var(--amber)]" />
        <h2 className="font-serif-almanac text-2xl font-semibold text-[var(--ink)]">
          Course Not Found
        </h2>
        <p className="text-sm text-[var(--body)]">
          {moduleError instanceof Error
            ? moduleError.message
            : 'The requested course could not be loaded.'}
        </p>
        <Link href="/academy">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Parent Academy
          </Button>
        </Link>
      </div>
    );
  }

  if (!currentLessonSummary) {
    return (
      <div className="mx-auto max-w-md py-16 text-center space-y-4 px-4">
        <AlertCircle className="mx-auto h-10 w-10 text-[var(--amber)]" />
        <h2 className="font-serif-almanac text-2xl font-semibold text-[var(--ink)]">
          Episode Not Found
        </h2>
        <p className="text-sm text-[var(--body)]">
          This episode does not exist in the &ldquo;{module.title}&rdquo; course.
        </p>
        <Link href={`/academy/${moduleSlug}`}>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Course Arc
          </Button>
        </Link>
      </div>
    );
  }

  if (isLessonError || !lesson) {
    return (
      <div className="mx-auto max-w-md py-16 text-center space-y-4 px-4">
        <AlertCircle className="mx-auto h-10 w-10 text-[var(--amber)]" />
        <h2 className="font-serif-almanac text-2xl font-semibold text-[var(--ink)]">
          Could Not Load Episode
        </h2>
        <p className="text-sm text-[var(--body)]">
          {lessonError instanceof Error
            ? lessonError.message
            : 'Could not load the episode content.'}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetchLesson()}
          className="gap-2"
        >
          Try Again
        </Button>
      </div>
    );
  }

  const orderedLessons = [...module.lessons].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
  const currentIdx = orderedLessons.findIndex(
    (l) => l.id === currentLessonSummary.id
  );
  const prevLesson = currentIdx > 0 ? orderedLessons[currentIdx - 1] : null;
  const nextLesson =
    currentIdx >= 0 && currentIdx < orderedLessons.length - 1
      ? orderedLessons[currentIdx + 1]
      : null;

  return (
    <LessonReaderView
      lesson={lesson}
      moduleSlug={moduleSlug}
      moduleTitle={module.title}
      activeChild={activeChild}
      episodeNumber={currentIdx >= 0 ? currentIdx + 1 : lesson.sortOrder}
      totalEpisodes={orderedLessons.length || 4}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      onLessonComplete={handleLessonComplete}
    />
  );
}
