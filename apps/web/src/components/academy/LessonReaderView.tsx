'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  User,
  CheckSquare,
  Square,
  ShieldCheck,
  Award,
} from 'lucide-react';
import type { AcademyLessonDTO, AcademyLessonSummaryDTO } from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { markLessonComplete } from '@/lib/api/academy';
import { getTierBadgeInfo, getCategoryBadgeInfo } from './ModuleCard';
import { getPriorityTheme } from './ChapterRoadmapView';
import { cn } from '@/lib/utils';

export interface LessonReaderViewProps {
  lesson: AcademyLessonDTO;
  moduleSlug: string;
  moduleTitle?: string;
  nextLesson?: AcademyLessonSummaryDTO | null;
  prevLesson?: AcademyLessonSummaryDTO | null;
  onLessonComplete?: () => void;
  className?: string;
}

export function LessonReaderView({
  lesson,
  moduleSlug,
  moduleTitle,
  nextLesson,
  prevLesson,
  onLessonComplete,
  className,
}: LessonReaderViewProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = React.useState<boolean>(lesson.isCompleted);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [copiedScript, setCopiedScript] = React.useState<string | null>(null);
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({});

  // Synchronize completion state on prop update
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
        err instanceof Error
          ? err.message
          : 'Failed to record lesson completion. Please try again.'
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

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /**
   * Intelligently parses markdown into structured, semantic UI callouts:
   * 1. Developmental / Clinical Insight Callout Card
   * 2. What to Say Dialogue Speech Bubble
   * 3. Interactive Action Protocol Checklists
   * 4. Semantic headers and text
   */
  const renderFormattedContent = (markdown: string) => {
    const blocks = markdown.split(/\n\n+/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();

      // 1. Developmental / Clinical Insight Callout Card
      if (
        trimmed.toLowerCase().includes('developmental insight') ||
        trimmed.toLowerCase().includes('clinical insight') ||
        trimmed.startsWith('> **Developmental Insight') ||
        trimmed.startsWith('**Developmental Insight') ||
        trimmed.startsWith('> **Clinical Insight') ||
        trimmed.startsWith('**Clinical Insight')
      ) {
        const cleanText = trimmed
          .replace(/^#+\s*/, '')
          .replace(/^>\s*/, '')
          .replace(/^\*\*(?:Developmental|Clinical) Insight:?\*\*:?\s*/i, '')
          .replace(/^(?:Developmental|Clinical) Insight:?\s*/i, '')
          .trim();

        return (
          <aside
            key={`insight-${idx}`}
            aria-label="Developmental Insight Callout"
            className="my-6 rounded-2xl border border-teal-200/90 bg-gradient-to-br from-teal-50/80 via-[#F7FCFA] to-white p-5 sm:p-6 shadow-xs"
          >
            <div className="flex items-center gap-2.5 text-teal-900 font-bold text-xs uppercase tracking-wider mb-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-700 text-white shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span>Pediatric Neurobiology · Developmental Insight</span>
            </div>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              {cleanText}
            </p>
          </aside>
        );
      }

      // 2. Comparative Dialogue Table (What NOT to Say vs What to Say Instead)
      if (
        trimmed.toLowerCase().includes('what not to say') ||
        trimmed.toLowerCase().includes('what to say') ||
        trimmed.toLowerCase().includes('comparative dialogue') ||
        trimmed.toLowerCase().includes('alongside empathetic response') ||
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        trimmed.startsWith('> "')
      ) {
        let notToSay =
          lesson.whatNotToSay ||
          'Stop overreacting! You are making a huge deal out of nothing.';
        let toSay = trimmed;
        const deliveryTip =
          lesson.deliveryTip ||
          'Lower your voice tone, unhurried cadence, and match eye level before speaking.';

        if (
          trimmed.toLowerCase().includes('what not to say') &&
          trimmed.toLowerCase().includes('what to say')
        ) {
          const parts = trimmed.split(/what to say(?:\s+instead)?:?/i);
          if (parts.length >= 2) {
            notToSay = parts[0]!
              .replace(/^#+\s*/, '')
              .replace(/what not to say:?/i, '')
              .replace(/[*_"`]/g, '')
              .trim();
            toSay = parts[1]!
              .replace(/[*_`]/g, '')
              .trim();
          }
        }

        const cleanDialogue = toSay
          .replace(/^#+\s*/, '')
          .replace(/^>\s*/, '')
          .replace(/^\*\*What to Say:?\*\*:?\s*/i, '')
          .replace(/^What to Say(?:\s+Instead)?:?\s*/i, '')
          .replace(/^Alongside Empathetic Response:?\s*/i, '')
          .replace(/^"/, '')
          .replace(/"$/, '')
          .trim();

        const isCurrentlyCopied = copiedScript === cleanDialogue;

        return (
          <aside
            key={`comparative-dialogue-${idx}`}
            aria-label="Comparative Dialogue Table"
            data-testid="comparative-dialogue-table"
            className="my-6 rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white"
          >
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-teal-700" />
                Comparative Dialogue · What NOT to Say vs What to Say Instead
              </span>
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                Verbatim Script Vault
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {/* Red-tinted: What NOT to Say */}
              <div
                data-testid="what-not-to-say-box"
                className="bg-rose-50/50 p-5 space-y-2.5"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800">
                  <span className="h-2 w-2 rounded-full bg-rose-600 shrink-0" />
                  <span>What NOT to Say (Instinctive Reaction)</span>
                </div>
                <blockquote className="border-l-3 border-rose-400 pl-3 italic text-sm text-rose-950 font-medium leading-relaxed">
                  &ldquo;{notToSay}&rdquo;
                </blockquote>
                <p className="text-[11px] text-rose-800/80 leading-relaxed font-sans">
                  ⚠️ Why this backfires: Escalates limbic defensiveness or triggers internal shame in an already overwhelmed nervous system.
                </p>
              </div>

              {/* Green/Amber-tinted: What to Say Instead */}
              <div
                data-testid="what-to-say-instead-box"
                className="bg-emerald-50/50 p-5 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                    <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>What to Say Instead (Co-Regulation)</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyScript(cleanDialogue)}
                    className="h-7 text-xs text-emerald-800 hover:bg-emerald-100 font-semibold gap-1.5 shrink-0"
                    aria-label="Copy dialogue script to clipboard"
                    data-testid="copy-script-btn"
                  >
                    {isCurrentlyCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-emerald-700" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </Button>
                </div>
                <blockquote className="border-l-3 border-emerald-500 pl-3 italic text-sm text-emerald-950 font-semibold leading-relaxed">
                  &ldquo;{cleanDialogue}&rdquo;
                </blockquote>
                <div
                  data-testid="delivery-tip-badge"
                  className="rounded-lg bg-white border border-emerald-200/80 p-2 text-[11px] text-emerald-900 flex items-start gap-1.5 shadow-2xs"
                >
                  <span className="font-bold shrink-0">💡 Delivery Tip (Vocal Cadence &amp; Posture):</span>
                  <span>{deliveryTip}</span>
                </div>
              </div>
            </div>
          </aside>
        );
      }

      // 3. Interactive Action Checklist Protocols
      if (
        trimmed.startsWith('- [ ]') ||
        trimmed.startsWith('- [x]') ||
        (trimmed.toLowerCase().includes('action protocol') && trimmed.includes('- '))
      ) {
        const lines = trimmed.split('\n');
        return (
          <div
            key={`checklist-${idx}`}
            className="my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              <span>Action Protocol Checklist</span>
            </div>

            <div className="space-y-2 pt-1">
              {lines.map((line, lineIdx) => {
                const lineClean = line.replace(/^-\s*\[[ x]\]\s*/i, '').replace(/^-\s*/, '').trim();
                if (!lineClean || lineClean.toLowerCase().includes('action protocol')) {
                  return null;
                }
                const itemId = `chk-${idx}-${lineIdx}`;
                const isChecked = !!checkedItems[itemId];

                return (
                  <button
                    key={itemId}
                    type="button"
                    onClick={() => toggleCheckItem(itemId)}
                    className={cn(
                      'flex items-start gap-3 w-full p-2.5 rounded-xl text-left transition-colors border',
                      isChecked
                        ? 'bg-teal-50/60 border-teal-200 text-slate-900'
                        : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    <span className="mt-0.5 shrink-0 text-teal-600">
                      {isChecked ? (
                        <CheckSquare className="h-4 w-4 text-teal-600" />
                      ) : (
                        <Square className="h-4 w-4 text-slate-400" />
                      )}
                    </span>
                    <span className={cn('text-xs sm:text-sm leading-relaxed', isChecked && 'line-through text-slate-500')}>
                      {lineClean}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      // 4. Standard Markdown Headers
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={`h3-${idx}`}
            className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-3 tracking-tight"
          >
            {trimmed.replace(/^###\s+/, '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={`h2-${idx}`}
            className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight"
          >
            {trimmed.replace(/^##\s+/, '')}
          </h2>
        );
      }
      if (trimmed.startsWith('# ')) {
        return (
          <h1
            key={`h1-${idx}`}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-6 mb-4 tracking-tight"
          >
            {trimmed.replace(/^#\s+/, '')}
          </h1>
        );
      }

      // 5. Standard Markdown Unordered List
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split(/\n[-*]\s+/).map((item) => item.replace(/^[-*]\s+/, '').trim());
        return (
          <ul
            key={`list-${idx}`}
            className="my-4 list-disc pl-6 space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed"
          >
            {items.map((it, itemIdx) => (
              <li key={`it-${itemIdx}`}>{it}</li>
            ))}
          </ul>
        );
      }

      // 6. Regular Paragraph
      return (
        <p
          key={`p-${idx}`}
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

  const categoryInfo = lesson.module?.category
    ? getCategoryBadgeInfo(lesson.module.category)
    : null;

  const priorityTheme = lesson.chapter?.priority
    ? getPriorityTheme(lesson.chapter.priority)
    : null;

  return (
    <article className={cn('max-w-3xl mx-auto space-y-8 py-4', className)}>
      {/* Top Navigation & Breadcrumbs */}
      <nav
        aria-label="Breadcrumbs"
        className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-500 font-medium"
      >
        <Link
          href={`/academy/${moduleSlug}`}
          className="flex items-center gap-1.5 text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {moduleTitle || 'Curriculum'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {priorityTheme && (
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                priorityTheme.badgeStyle
              )}
            >
              {priorityTheme.shortBadge}
            </span>
          )}

          {categoryInfo && (
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold hidden sm:inline-flex',
                categoryInfo.className
              )}
            >
              {categoryInfo.label}
            </span>
          )}
        </div>
      </nav>

      {/* Reader Header Card */}
      <header className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
          {lesson.chapter && (
            <span className="font-semibold text-slate-700">
              {lesson.chapter.title}
            </span>
          )}
          <span className="text-slate-300">•</span>
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

      {/* Distraction-Free Lesson Body with Semantic Callouts */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs leading-relaxed">
        {renderFormattedContent(lesson.contentMarkdown)}
      </div>

      {/* Action Footer: Complete Chapter & Continue */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isCompleted ? 'Chapter Lesson Completed!' : 'Mark Chapter Lesson Complete'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isCompleted
                ? 'Your progress has been recorded. Continue to the next prioritized lesson.'
                : 'Complete this lesson to advance your parent advisory progress.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link
              href={`/advisor?prompt=${encodeURIComponent(`I want to roleplay practicing the communication script from the lesson "${lesson.title}". Can you play the role of the child so I can practice my empathetic response?`)}`}
              data-testid="practice-with-ai-advisor-btn"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-600/40 bg-teal-50 hover:bg-teal-100 text-teal-900 px-4 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-2xs"
            >
              <Sparkles className="h-4 w-4 text-teal-700" />
              <span>Practice with AI Advisor</span>
            </Link>

            <Button
              type="button"
              size="lg"
              onClick={handleComplete}
              disabled={isCompleted || isSubmitting}
              className={cn(
                'shrink-0 gap-2 font-semibold transition-all shadow-xs',
                isCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-teal-700 text-white hover:bg-teal-800'
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Recording Progress...</span>
                </>
              ) : isCompleted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Lesson Completed</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Complete Lesson & Continue</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {errorMessage && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Navigation Pagination: Next / Previous Lesson */}
      <footer className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {prevLesson ? (
          <Link
            href={`/academy/${moduleSlug}/${prevLesson.slug}`}
            className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-4 text-left shadow-xs hover:border-teal-300 transition-colors group"
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
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-4 text-right shadow-xs hover:border-teal-300 transition-colors group sm:col-start-2"
          >
            <div className="text-right w-full">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Next Prioritized Lesson
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-teal-900 line-clamp-1">
                {nextLesson.title}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
          </Link>
        ) : (
          <Link
            href={`/academy/${moduleSlug}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-4 text-right shadow-xs hover:border-teal-300 transition-colors group sm:col-start-2"
          >
            <div className="text-right w-full">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Chapter Finished
              </span>
              <p className="text-xs sm:text-sm font-bold text-teal-800">
                Return to Course Roadmap
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-teal-600 shrink-0" />
          </Link>
        )}
      </footer>
    </article>
  );
}
