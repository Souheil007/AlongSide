'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { getModuleBySlug, getLesson } from '@/lib/api/academy';
import { LessonReader } from '@/components/academy/LessonReader';
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

  // 1. Fetch module to get metadata and list of lessons
  const {
    data: moduleData,
    isLoading: isModuleLoading,
    isError: isModuleError,
    error: moduleError,
  } = useQuery({
    queryKey: ['academy-module-detail', moduleSlug],
    queryFn: () => getModuleBySlug(moduleSlug),
  });

  const module = moduleData?.module;
  const currentLessonSummary = module?.lessons.find(
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
    // Invalidate module and lesson queries so completion reflects immediately
    queryClient.invalidateQueries({ queryKey: ['academy-module-detail', moduleSlug] });
    queryClient.invalidateQueries({ queryKey: ['academy-modules'] });
    if (currentLessonSummary?.id) {
      queryClient.invalidateQueries({
        queryKey: ['academy-lesson', currentLessonSummary.id],
      });
    }
  };

  if (isModuleLoading || (currentLessonSummary && isLessonLoading)) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 py-6 animate-pulse">
        <div className="h-5 w-32 bg-slate-200 rounded" />
        <div className="h-28 rounded-2xl bg-white border border-slate-200 p-6 space-y-3" />
        <div className="h-96 rounded-2xl bg-white border border-slate-200 p-8 space-y-4" />
      </div>
    );
  }

  if (isModuleError || !module) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Module Not Found</h2>
        <p className="text-sm text-slate-600">
          {moduleError instanceof Error
            ? moduleError.message
            : "The requested module could not be loaded."}
        </p>
        <Link href="/academy">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Academy
          </Button>
        </Link>
      </div>
    );
  }

  if (!currentLessonSummary) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Lesson Not Found</h2>
        <p className="text-sm text-slate-600">
          This lesson does not exist in the &quot;{module.title}&quot; curriculum.
        </p>
        <Link href={`/academy/${moduleSlug}`}>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Module
          </Button>
        </Link>
      </div>
    );
  }

  if (isLessonError || !lesson) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Failed to Load Lesson</h2>
        <p className="text-sm text-slate-600">
          {lessonError instanceof Error
            ? lessonError.message
            : "Could not load the lesson content."}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetchLesson()}
          className="gap-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  // Calculate prev and next lessons in module sequence
  const currentIdx = module.lessons.findIndex((l) => l.id === currentLessonSummary.id);
  const prevLesson = currentIdx > 0 ? module.lessons[currentIdx - 1] : null;
  const nextLesson =
    currentIdx >= 0 && currentIdx < module.lessons.length - 1
      ? module.lessons[currentIdx + 1]
      : null;

  return (
    <LessonReader
      lesson={lesson}
      moduleSlug={moduleSlug}
      moduleTitle={module.title}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      onLessonComplete={handleLessonComplete}
    />
  );
}
