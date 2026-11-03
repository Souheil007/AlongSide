'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import type { AcademyLessonDTO, AcademyLessonSummaryDTO } from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { markLessonComplete } from '@/lib/api/academy';
import { getTierBadgeInfo } from './ModuleCard';
import { cn } from '@/lib/utils';

export interface LessonReaderProps {
  lesson: AcademyLessonDTO;
  moduleSlug: string;
  moduleTitle?: string;
  nextLesson?: AcademyLessonSummaryDTO | null;
  prevLesson?: AcademyLessonSummaryDTO | null;
  onLessonComplete?: () => void;
}

export function LessonReader({
  lesson,
  moduleSlug,
  moduleTitle,
  nextLesson,
  prevLesson,
  onLessonComplete,
}: LessonReaderProps) {
  const [isCompleted, setIsCompleted] = React.useState<boolean>(lesson.isCompleted);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [copiedScript, setCopiedScript] = React.useState<string | null>(null);

  // Sync initial state if lesson prop changes
  React.useEffect(() => {
    setIsCompleted(lesson.isCompleted);
  }, [lesson.id, lesson.isCompleted]);

  const handleComplete = async () => {
    if (isCompleted || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await markLessonComplete(lesson.id);
      setIsCompleted(true);
      onLessonComplete?.();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to mark lesson complete. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyScript = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedScript(text);
      setTimeout(() => setCopiedScript(null), 2500);
    }
  };

  // Parse markdown into sections (Clinical Insights, What to Say, Standard text)
  const renderFormattedContent = (markdown: string) => {
    // Split by double newlines or headers
    const blocks = markdown.split(/\n\n+/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();

      // Clinical Insight Callout Card
      if (
        trimmed.toLowerCase().includes('clinical insight') ||
        trimmed.startsWith('> **Clinical Insight') ||
        trimmed.startsWith('**Clinical Insight')
      ) {
        const cleanText = trimmed
          .replace(/^#+\s*/, '')
          .replace(/^>\s*/, '')
          .replace(/^\*\*Clinical Insight:?\*\*:?\s*/i, '')
          .replace(/^Clinical Insight:?\s*/i, '');

        return (
          <aside
            key={`block-${idx}`}
            className="my-6 rounded-2xl border border-teal-200/90 bg-gradient-to-br from-teal-50/70 via-[#F7FCFA] to-white p-5 sm:p-6 shadow-sm"
            aria-label="Clinical Insight"
          >
            <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider mb-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span>Clinical Insight • Pediatric Neurobiology</span>
            </div>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              {cleanText}
            </p>
          </aside>
        );
      }

      // "What to Say" Callout Card (Empathetic Parent Dialogue)
      if (
        trimmed.toLowerCase().includes('what to say') ||
        trimmed.toLowerCase().includes('alongside empathetic response') ||
        trimmed.startsWith('> "') ||
        trimmed.startsWith('"') && trimmed.endsWith('"')
      ) {
        const cleanDialogue = trimmed
          .replace(/^#+\s*/, '')
          .replace(/^>\s*/, '')
          .replace(/^\*\*What to Say:?\*\*:?\s*/i, '')
          .replace(/^What to Say:?\s*/i, '')
          .replace(/^Alongside Empathetic Response:?\s*/i, '');

        const isCurrentlyCopied = copiedScript === cleanDialogue;

        return (
          <aside
            key={`block-${idx}`}
            className="my-6 rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/60 via-[#FCFAF5] to-white p-5 sm:p-6 shadow-sm"
            aria-label="What to Say Dialogue Script"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-600 text-white">
                  <MessageCircle className="h-3.5 w-3.5" />
                </span>
                <span>What to Say • Actionable Parent Dialogue</span>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleCopyScript(cleanDialogue)}
                className="h-8 gap-1.5 text-xs text-amber-900 hover:bg-amber-100/60 hover:text-amber-950 font-medium"
                aria-label="Copy dialogue script to clipboard"
              >
                {isCurrentlyCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Script</span>
                  </>
                )}
              </Button>
            </div>

            <blockquote className="border-l-4 border-amber-400 pl-4 py-1 text-slate-800 text-sm sm:text-base italic leading-relaxed">
              {cleanDialogue}
            </blockquote>
          </aside>
        );
      }

      // Markdown Headers
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={`block-${idx}`}
            className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-3 tracking-tight"
          >
            {trimmed.replace(/^###\s+/, '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={`block-${idx}`}
            className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-4 tracking-tight"
          >
            {trimmed.replace(/^##\s+/, '')}
          </h2>
        );
      }
      if (trimmed.startsWith('# ')) {
        return (
          <h1
            key={`block-${idx}`}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-6 mb-4 tracking-tight"
          >
            {trimmed.replace(/^#\s+/, '')}
          </h1>
        );
      }

      // Markdown List
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split(/\n[-*]\s+/).map((item) => item.replace(/^[-*]\s+/, ''));
        return (
          <ul
            key={`block-${idx}`}
            className="my-4 list-disc pl-6 space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed"
          >
            {items.map((it, itemIdx) => (
              <li key={`item-${itemIdx}`}>{it}</li>
            ))}
          </ul>
        );
      }

      // Regular Paragraph
      return (
        <p
          key={`block-${idx}`}
          className="my-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal"
        >
          {trimmed}
        </p>
      );
    });
  };

  const tierInfo = lesson.module?.developmentalTier
    ? getTierBadgeInfo(lesson.module.developmentalTier)
    : null;

  return (
    <article className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Top Navigation & Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-medium">
        <Link
          href={`/academy/${moduleSlug}`}
          className="flex items-center gap-1.5 text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {moduleTitle || 'Module'}</span>
        </Link>

        {tierInfo && (
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
              tierInfo.className
            )}
          >
            {tierInfo.shortLabel}
          </span>
        )}
      </nav>

      {/* Reader Header Card */}
      <header className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-teal-600" />
            Lesson {lesson.sortOrder}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {lesson.readingMinutes} min read
          </span>
          {isCompleted && (
            <>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
          {lesson.title}
        </h1>
      </header>

      {/* Distraction-Free Lesson Body */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm leading-relaxed">
        {renderFormattedContent(lesson.contentMarkdown)}
      </div>

      {/* Action Footer: Mark Complete & Error Messages */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isCompleted ? 'Lesson Completed!' : 'Ready for the Next Step?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isCompleted
                ? 'Your learning progress has been saved to your parent profile.'
                : 'Mark this lesson complete to track your mastery of this developmental milestone.'}
            </p>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={handleComplete}
            disabled={isCompleted || isSubmitting}
            className={cn(
              'shrink-0 gap-2 font-semibold transition-all shadow-sm',
              isCompleted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            )}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Marking Complete...</span>
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Lesson Completed</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Mark Lesson Complete</span>
              </>
            )}
          </Button>
        </div>

        {errorMessage && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Next / Previous Lesson Pagination */}
      <footer className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {prevLesson ? (
          <Link
            href={`/academy/${moduleSlug}/${prevLesson.slug}`}
            className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-4 text-left shadow-sm hover:border-teal-300 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Previous Lesson
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-teal-900 line-clamp-1">
                {prevLesson.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/academy/${moduleSlug}/${nextLesson.slug}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-4 text-right shadow-sm hover:border-teal-300 transition-colors group sm:col-start-2"
          >
            <div className="text-right w-full">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Next Lesson
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-teal-900 line-clamp-1">
                {nextLesson.title}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
          </Link>
        ) : (
          <Link
            href="/academy"
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-4 text-right shadow-sm hover:border-teal-300 transition-colors group sm:col-start-2"
          >
            <div className="text-right w-full">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Module Finished
              </span>
              <p className="text-xs sm:text-sm font-bold text-teal-800">
                Explore More Academy Modules
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-teal-600 shrink-0" />
          </Link>
        )}
      </footer>
    </article>
  );
}
