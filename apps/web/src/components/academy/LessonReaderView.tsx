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
import {
  formatCourseTitle,
  type AcademyLessonDTO,
  type AcademyLessonSummaryDTO,
} from '@alongside/shared';
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

/**
 * Renders inline markdown: bold (**...**), italic (*...* or _..._), code (`...`), and links ([...](...)).
 */
export function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (
      ((token.startsWith('*') && token.endsWith('*')) ||
        (token.startsWith('_') && token.endsWith('_'))) &&
      token.length >= 2
    ) {
      return (
        <em key={i} className="italic text-slate-800">
          {token.slice(1, -1)}
        </em>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code key={i} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-teal-800">
          {token.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <Link key={i} href={linkMatch[2]!} className="text-teal-700 underline hover:text-teal-900">
          {linkMatch[1]}
        </Link>
      );
    }
    return token;
  });
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
   * Intelligently parses markdown into structured, semantic UI elements:
   * 1. Developmental / Clinical Insight Callout Card
   * 2. Interactive Action Protocol Checklists
   * 3. Compiled Headers and Lists with Inline Formatting
   * 4. Semantic paragraphs with bold, italics, code, and links
   */
  const renderFormattedContent = (markdown: string) => {
    const blocks = markdown.split(/\n\n+/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Omit Comparative Dialogue entirely per user request
      if (
        trimmed.toLowerCase().includes('comparative dialogue') ||
        trimmed.includes('| What NOT to Say |') ||
        trimmed.toLowerCase().startsWith('## part 3: comparative dialogue')
      ) {
        return null;
      }

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
              {renderInlineMarkdown(cleanText)}
            </p>
          </aside>
        );
      }

      // 2. Interactive Action Checklist Protocols
      if (
        trimmed.startsWith('- [ ]') ||
        trimmed.startsWith('- [x]') ||
        (trimmed.toLowerCase().includes('action protocol') && trimmed.includes('- ['))
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
                      {renderInlineMarkdown(lineClean)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      // 3. Header combined with inline numbered list
      // e.g. "#### Recommended Action Protocol: 1. **Notice...** 2. **De-escalate...**"
      const headerWithListMatch = trimmed.match(/^(#{1,5})\s+([^:\n]+(?::|\n))?\s*(\d+\.\s+.*)$/s);
      if (headerWithListMatch) {
        const hashes = headerWithListMatch[1]!;
        const headingText = (headerWithListMatch[2] || '').replace(/[:\n]+$/, '').trim();
        const listText = headerWithListMatch[3]!;
        const items = listText
          .split(/(?:^|\s+)(?=\d+\.\s+)/)
          .map((item) => item.replace(/^\d+\.\s+/, '').trim())
          .filter(Boolean);

        return (
          <div key={`head-list-${idx}`} className="my-5 space-y-2.5">
            {headingText && (
              hashes.length >= 4 ? (
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-4 tracking-tight">
                  {renderInlineMarkdown(headingText)}
                </h4>
              ) : hashes.length === 3 ? (
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-5 tracking-tight">
                  {renderInlineMarkdown(headingText)}
                </h3>
              ) : (
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-6 tracking-tight">
                  {renderInlineMarkdown(headingText)}
                </h2>
              )
            )}
            <ol className="list-decimal pl-6 space-y-2.5 my-3 text-slate-700 text-sm sm:text-base leading-relaxed">
              {items.map((it, itemIdx) => (
                <li key={`it-${itemIdx}`} className="leading-relaxed">
                  {renderInlineMarkdown(it)}
                </li>
              ))}
            </ol>
          </div>
        );
      }

      // 4. Standard Markdown Headers (#, ##, ###, ####, #####)
      if (trimmed.startsWith('##### ')) {
        return (
          <h5
            key={`h5-${idx}`}
            className="text-sm sm:text-base font-bold text-slate-900 mt-4 mb-2 tracking-tight"
          >
            {renderInlineMarkdown(trimmed.replace(/^#####\s+/, ''))}
          </h5>
        );
      }
      if (trimmed.startsWith('#### ')) {
        return (
          <h4
            key={`h4-${idx}`}
            className="text-base sm:text-lg font-bold text-slate-900 mt-5 mb-2.5 tracking-tight"
          >
            {renderInlineMarkdown(trimmed.replace(/^####\s+/, ''))}
          </h4>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={`h3-${idx}`}
            className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-3 tracking-tight"
          >
            {renderInlineMarkdown(trimmed.replace(/^###\s+/, ''))}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={`h2-${idx}`}
            className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight"
          >
            {renderInlineMarkdown(trimmed.replace(/^##\s+/, ''))}
          </h2>
        );
      }
      if (trimmed.startsWith('# ')) {
        return (
          <h1
            key={`h1-${idx}`}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-6 mb-4 tracking-tight"
          >
            {renderInlineMarkdown(trimmed.replace(/^#\s+/, ''))}
          </h1>
        );
      }

      // 5. Ordered list block (e.g. "1. First\n2. Second" or "1. ... 2. ...")
      if (/^\d+\.\s+/.test(trimmed)) {
        const rawItems = trimmed.includes('\n')
          ? trimmed.split(/\n(?=\d+\.\s+)/)
          : trimmed.split(/(?=\d+\.\s+)/);
        const items = rawItems
          .map((item) => item.replace(/^\d+\.\s+/, '').trim())
          .filter(Boolean);

        return (
          <ol
            key={`ol-${idx}`}
            className="my-4 list-decimal pl-6 space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed"
          >
            {items.map((it, itemIdx) => (
              <li key={`it-${itemIdx}`} className="leading-relaxed">
                {renderInlineMarkdown(it)}
              </li>
            ))}
          </ol>
        );
      }

      // 6. Standard Markdown Unordered List
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed
          .split(/\n[-*]\s+/)
          .map((item) => item.replace(/^[-*]\s+/, '').trim())
          .filter(Boolean);
        return (
          <ul
            key={`list-${idx}`}
            className="my-4 list-disc pl-6 space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed"
          >
            {items.map((it, itemIdx) => (
              <li key={`it-${itemIdx}`}>{renderInlineMarkdown(it)}</li>
            ))}
          </ul>
        );
      }

      // 7. Blockquote (> ...)
      if (trimmed.startsWith('> ')) {
        const quoteText = trimmed.replace(/^>\s*/gm, '').trim();
        return (
          <blockquote
            key={`quote-${idx}`}
            className="my-4 border-l-4 border-teal-500 pl-4 italic text-slate-700 text-sm sm:text-base leading-relaxed bg-teal-50/20 py-2 rounded-r-lg"
          >
            {renderInlineMarkdown(quoteText)}
          </blockquote>
        );
      }

      // 8. Regular Paragraph
      return (
        <p
          key={`p-${idx}`}
          className="my-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal"
        >
          {renderInlineMarkdown(trimmed)}
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
          <span>Back to {formatCourseTitle(moduleTitle || '') || 'Curriculum'}</span>
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
                  <span>Complete Lesson</span>
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
