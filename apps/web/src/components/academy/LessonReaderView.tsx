'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Headphones, BookOpen } from 'lucide-react';
import type {
  AcademyLessonDTO,
  AcademyLessonSummaryDTO,
} from '@alongside/shared';
import { markLessonComplete } from '@/lib/api/academy';
import {
  ScrollProgressBar,
  LessonReliefMasthead,
  LessonVideoPlayer,
  LessonThirtySecondGlance,
  LessonDialogueDeck,
  LessonActionChecklist,
  LessonToolBridges,
  LessonFooterNav,
  LessonAdaptiveModuleRenderer,
  AudioMemoPlayer,
} from './reader';
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
        <strong key={i} className="font-bold text-slate-900 dark:text-stone-100">
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
        <em key={i} className="italic text-slate-800 dark:text-stone-200">
          {token.slice(1, -1)}
        </em>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code
          key={i}
          className="rounded bg-slate-100 dark:bg-stone-800 px-1 py-0.5 font-mono text-xs text-teal-800 dark:text-teal-300"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <Link
          key={i}
          href={linkMatch[2]!}
          className="text-teal-700 dark:text-teal-400 underline hover:text-teal-900"
        >
          {linkMatch[1]}
        </Link>
      );
    }
    return token;
  });
}

export interface ParsedLessonParts {
  scenarioText: string;
  neurobiologyText: string;
  clinicalInsight: string;
  groundingText: string;
  hasStructuredParts: boolean;
}

/**
 * Extracts distinct clinical parts from lesson markdown:
 * - Part 1: The Kitchen-Table Scenario
 * - Part 2: The Developmental Neurobiology Behind It
 * - Clinical / Developmental Insight callout
 * - Clinical Implementation & Parental Grounding anchor
 */
export function parseLessonContentParts(markdown: string): ParsedLessonParts {
  if (!markdown) {
    return {
      scenarioText: '',
      neurobiologyText: '',
      clinicalInsight: '',
      groundingText: '',
      hasStructuredParts: false,
    };
  }

  const part1Match = markdown.match(/## Part 1:[^\n]*\n([\s\S]*?)(?=## Part 2:|$)/i);
  const part2Match = markdown.match(/## Part 2:[^\n]*\n([\s\S]*?)(?=## Part 3:|## Part 4:|$)/i);
  const groundingMatch = markdown.match(
    /### (?:Clinical Implementation & Parental Grounding|Parental Grounding)[^\n]*\n([\s\S]*?)(?=\*Need tailored|$)/i
  );

  let rawPart2 = part2Match ? part2Match[1]!.trim() : '';
  let clinicalInsight = '';

  const insightMatch = rawPart2.match(
    />\s*\*\*(?:Clinical|Developmental) Insight:?\*\*:?\s*([\s\S]*?)(?=(?:\n\n|\n##|$))/i
  );
  if (insightMatch) {
    clinicalInsight = insightMatch[1]!.trim();
    rawPart2 = rawPart2
      .replace(/>\s*\*\*(?:Clinical|Developmental) Insight:?\*\*:?\s*[\s\S]*?(?=(?:\n\n|\n##|$))/i, '')
      .trim();
  }

  const scenarioText = part1Match ? part1Match[1]!.trim() : '';
  const neurobiologyText = rawPart2;
  const groundingText = groundingMatch ? groundingMatch[1]!.trim() : '';
  const hasStructuredParts = Boolean(scenarioText || neurobiologyText);

  return {
    scenarioText,
    neurobiologyText,
    clinicalInsight,
    groundingText,
    hasStructuredParts,
  };
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
  const [isCompleted, setIsCompleted] = React.useState<boolean>(lesson.isCompleted);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isNightstandMode, setIsNightstandMode] = React.useState<boolean>(false);

  const parsedParts = React.useMemo(
    () => parseLessonContentParts(lesson.contentMarkdown),
    [lesson.contentMarkdown]
  );

  const audioNarrationText = React.useMemo(() => {
    const parts = [
      `Pediatric clinical lesson ${lesson.sortOrder}: ${lesson.title}.`,
    ];
    if (lesson.thirtySecondGlance?.coreProblem) {
      parts.push(`The core scenario: ${lesson.thirtySecondGlance.coreProblem}`);
    } else if (parsedParts.scenarioText) {
      const sentences = parsedParts.scenarioText.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ');
      parts.push(`Scenario: ${sentences}`);
    }

    if (parsedParts.clinicalInsight) {
      parts.push(`Clinical insight: ${parsedParts.clinicalInsight}`);
    }

    if (lesson.thirtySecondGlance?.exactWords) {
      parts.push(`Script to say: ${lesson.thirtySecondGlance.exactWords}`);
    } else if (lesson.dialogueCards?.[0]?.empatheticScript) {
      parts.push(`Empathetic script to remember: ${lesson.dialogueCards[0].empatheticScript}`);
    } else if (lesson.deliveryTip) {
      parts.push(`Guidance: ${lesson.deliveryTip}`);
    }

    if (lesson.thirtySecondGlance?.immediateShift) {
      parts.push(`Tonight's shift: ${lesson.thirtySecondGlance.immediateShift}`);
    }

    return parts.join(' ');
  }, [lesson, parsedParts]);

  // Synchronize completion state on prop update
  React.useEffect(() => {
    setIsCompleted(lesson.isCompleted);
  }, [lesson.id, lesson.isCompleted]);

  // Load nightstand preference from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = window.localStorage.getItem('alongside-nightstand-mode');
        if (stored === 'true') {
          setIsNightstandMode(true);
        }
      } catch {
        // silent fallback
      }
    }
  }, []);

  const toggleNightstandMode = () => {
    setIsNightstandMode((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem('alongside-nightstand-mode', String(next));
        } catch {
          // silent fallback
        }
      }
      return next;
    });
  };

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

  /**
   * Intelligently parses editorial markdown into structured, semantic UI elements:
   * 1. Developmental / Clinical Insight Callout Card
   * 2. Compiled Headers and Lists with Inline Formatting
   * 3. Blockquotes and semantic paragraphs
   */
  const renderFormattedEditorialBody = (markdown: string) => {
    if (!markdown) return null;
    const blocks = markdown.split(/\n\n+/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Omit raw comparative dialogue headers if already rendered in dialogue deck
      if (
        trimmed.toLowerCase().startsWith('## part 3: comparative dialogue') ||
        trimmed.toLowerCase().startsWith('### comparative dialogue') ||
        trimmed.includes('| What NOT to Say |')
      ) {
        return null;
      }

      // Omit raw checklist markdown if handled by action checklist
      if (
        trimmed.toLowerCase().startsWith('### practical action protocol') ||
        trimmed.toLowerCase().startsWith('### action protocol') ||
        (trimmed.startsWith('- [ ]') && trimmed.includes('\n- [ ]'))
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
            className={cn(
              'my-6 rounded-2xl border p-5 sm:p-6 shadow-xs transition-colors',
              isNightstandMode
                ? 'border-teal-900/80 bg-teal-950/20 text-stone-200'
                : 'border-teal-200/90 bg-gradient-to-br from-teal-50/80 via-[#F7FCFA] to-white text-slate-800'
            )}
          >
            <div className="flex items-center gap-2.5 text-teal-800 dark:text-teal-300 font-bold text-xs uppercase tracking-wider mb-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-700 text-white shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span>Pediatric Neurobiology · Developmental Insight</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed font-medium">
              {renderInlineMarkdown(cleanText)}
            </p>
          </aside>
        );
      }

      // 2. Standard Markdown Headers (#, ##, ###, ####, #####)
      if (trimmed.startsWith('##### ')) {
        return (
          <h5
            key={`h5-${idx}`}
            className={cn(
              'text-sm sm:text-base font-bold mt-4 mb-2 tracking-tight',
              isNightstandMode ? 'text-amber-100' : 'text-slate-900'
            )}
          >
            {renderInlineMarkdown(trimmed.replace(/^#####\s+/, ''))}
          </h5>
        );
      }
      if (trimmed.startsWith('#### ')) {
        return (
          <h4
            key={`h4-${idx}`}
            className={cn(
              'text-base sm:text-lg font-bold mt-5 mb-2.5 tracking-tight',
              isNightstandMode ? 'text-amber-100' : 'text-slate-900'
            )}
          >
            {renderInlineMarkdown(trimmed.replace(/^####\s+/, ''))}
          </h4>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={`h3-${idx}`}
            className={cn(
              'text-lg sm:text-xl font-bold mt-6 mb-3 tracking-tight',
              isNightstandMode ? 'text-amber-100' : 'text-slate-900'
            )}
          >
            {renderInlineMarkdown(trimmed.replace(/^###\s+/, ''))}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={`h2-${idx}`}
            className={cn(
              'text-xl sm:text-2xl font-extrabold mt-8 mb-4 tracking-tight',
              isNightstandMode ? 'text-amber-100' : 'text-slate-900'
            )}
          >
            {renderInlineMarkdown(trimmed.replace(/^##\s+/, ''))}
          </h2>
        );
      }
      if (trimmed.startsWith('# ')) {
        return (
          <h1
            key={`h1-${idx}`}
            className={cn(
              'text-2xl sm:text-3xl font-extrabold mt-6 mb-4 tracking-tight',
              isNightstandMode ? 'text-amber-100' : 'text-slate-900'
            )}
          >
            {renderInlineMarkdown(trimmed.replace(/^#\s+/, ''))}
          </h1>
        );
      }

      // 3. Ordered list block
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
            className={cn(
              'my-4 list-decimal pl-6 space-y-2 text-sm sm:text-base leading-relaxed',
              isNightstandMode ? 'text-stone-300' : 'text-slate-700'
            )}
          >
            {items.map((it, itemIdx) => (
              <li key={`it-${itemIdx}`} className="leading-relaxed">
                {renderInlineMarkdown(it)}
              </li>
            ))}
          </ol>
        );
      }

      // 4. Unordered list block
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed
          .split(/\n[-*]\s+/)
          .map((item) => item.replace(/^[-*]\s+/, '').trim())
          .filter(Boolean);
        return (
          <ul
            key={`list-${idx}`}
            className={cn(
              'my-4 list-disc pl-6 space-y-2 text-sm sm:text-base leading-relaxed',
              isNightstandMode ? 'text-stone-300' : 'text-slate-700'
            )}
          >
            {items.map((it, itemIdx) => (
              <li key={`it-${itemIdx}`}>{renderInlineMarkdown(it)}</li>
            ))}
          </ul>
        );
      }

      // 5. Blockquote
      if (trimmed.startsWith('> ')) {
        const quoteText = trimmed.replace(/^>\s*/gm, '').trim();
        return (
          <blockquote
            key={`quote-${idx}`}
            className={cn(
              'my-4 border-l-4 border-teal-500 pl-4 italic text-sm sm:text-base leading-relaxed py-2 rounded-r-lg',
              isNightstandMode
                ? 'bg-teal-950/20 text-stone-300'
                : 'bg-teal-50/20 text-slate-700'
            )}
          >
            {renderInlineMarkdown(quoteText)}
          </blockquote>
        );
      }

      // 6. Regular Paragraph
      return (
        <p
          key={`p-${idx}`}
          className={cn(
            'my-4 text-sm sm:text-base leading-relaxed font-normal',
            isNightstandMode ? 'text-stone-300' : 'text-slate-700'
          )}
        >
          {renderInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  return (
    <article
      data-testid="lesson-reader-view"
      className={cn(
        'max-w-3xl mx-auto space-y-8 py-4 transition-colors',
        isNightstandMode ? 'text-stone-200' : 'text-slate-900',
        className
      )}
    >
      {/* 0. Fixed Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* 1. Relief Masthead & 90s Audio Memo Bar */}
      <LessonReliefMasthead
        lesson={lesson}
        moduleSlug={moduleSlug}
        moduleTitle={moduleTitle}
        isCompleted={isCompleted}
        isNightstandMode={isNightstandMode}
        onToggleNightstandMode={toggleNightstandMode}
      />

      {/* 1.5 Master Video Lecture Player (When present) */}
      {lesson.videoLecture && (
        <LessonVideoPlayer
          video={lesson.videoLecture}
          isNightstandMode={isNightstandMode}
        />
      )}

      {/* 2. 30-Second Crisis Summary Drawer */}
      <LessonThirtySecondGlance
        glance={lesson.thirtySecondGlance}
        isNightstandMode={isNightstandMode}
      />

      {/* 3. Dedicated Reading & Listening Experience */}
      <section
        data-testid="lesson-editorial-section"
        className="space-y-6"
        aria-label="Lesson Reading and Spoken Audio"
      >
        {/* 3.1 Integrated Audio Narration Bar: Read or Listen */}
        <div
          data-testid="lesson-narration-player"
          className={cn(
            'rounded-2xl border p-4 sm:p-5 shadow-xs transition-colors space-y-3',
            isNightstandMode
              ? 'border-teal-900/80 bg-teal-950/20 text-stone-200'
              : 'border-teal-200/90 bg-gradient-to-r from-teal-50/70 via-emerald-50/40 to-teal-50/60 text-slate-800'
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full shrink-0 shadow-xs',
                  isNightstandMode
                    ? 'bg-amber-950 text-amber-300'
                    : 'bg-teal-700 text-white'
                )}
              >
                <Headphones className="h-4 w-4" />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className={cn(
                      'text-xs sm:text-sm font-bold tracking-tight',
                      isNightstandMode ? 'text-amber-100' : 'text-slate-900'
                    )}
                  >
                    Read or Listen to Lesson {lesson.sortOrder}
                  </h3>
                  <span
                    className={cn(
                      'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full',
                      isNightstandMode
                        ? 'bg-stone-800 text-amber-300'
                        : 'bg-teal-100 text-teal-800'
                    )}
                  >
                    Hands-Free Narration
                  </span>
                </div>
                <p
                  className={cn(
                    'text-[11px] leading-tight mt-0.5',
                    isNightstandMode ? 'text-stone-400' : 'text-slate-500'
                  )}
                >
                  Listen hands-free while holding your child (~{lesson.readingMinutes || 4} min) or read the structured breakdown below.
                </p>
              </div>
            </div>
          </div>

          <AudioMemoPlayer
            audioUrl={lesson.audioUrl}
            audioDurationSeconds={
              lesson.audioDurationSeconds ||
              (lesson.readingMinutes ? lesson.readingMinutes * 60 : 180)
            }
            title={`Lesson ${lesson.sortOrder}: ${lesson.title}`}
            isNightstandMode={isNightstandMode}
            textToSpeak={audioNarrationText}
          />
        </div>

        {/* 3.2 Part 1: The Kitchen-Table Scenario */}
        {parsedParts.scenarioText && (
          <div
            data-testid="lesson-part-1-card"
            className={cn(
              'rounded-2xl border p-6 sm:p-8 shadow-xs leading-relaxed transition-colors space-y-4',
              isNightstandMode
                ? 'bg-stone-900 border-stone-800 text-stone-200'
                : 'bg-gradient-to-br from-[#FCFBF9] via-white to-amber-50/20 border-amber-200/70 text-slate-800'
            )}
          >
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 shadow-2xs">
                <BookOpen className="h-3.5 w-3.5" />
              </span>
              <span>Part 1 · The Kitchen-Table Scenario</span>
              <span className="text-slate-300 dark:text-stone-700 hidden sm:inline">•</span>
              <span className="font-mono text-[11px] font-normal text-amber-700 dark:text-amber-300/80 hidden sm:inline">
                Real Family Friction
              </span>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              {renderFormattedEditorialBody(parsedParts.scenarioText)}
            </div>
          </div>
        )}

        {/* 3.3 Part 2: Developmental Neurobiology */}
        {parsedParts.neurobiologyText && (
          <div
            data-testid="lesson-part-2-card"
            className={cn(
              'rounded-2xl border p-6 sm:p-8 shadow-xs leading-relaxed transition-colors space-y-4',
              isNightstandMode
                ? 'bg-stone-900 border-stone-800 text-stone-200'
                : 'bg-gradient-to-br from-[#F7FCFA] via-white to-teal-50/20 border-teal-200/80 text-slate-800'
            )}
          >
            <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-bold text-xs uppercase tracking-wider">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-700 text-white shadow-2xs">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span>Part 2 · Developmental Neurobiology</span>
              <span className="text-slate-300 dark:text-stone-700 hidden sm:inline">•</span>
              <span className="font-mono text-[11px] font-normal text-teal-700 dark:text-teal-400 hidden sm:inline">
                Inside Your Child's Brain
              </span>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              {renderFormattedEditorialBody(parsedParts.neurobiologyText)}
            </div>
          </div>
        )}

        {/* 3.4 Clinical / Developmental Insight Callout */}
        {parsedParts.clinicalInsight && (
          <aside
            data-testid="lesson-clinical-insight"
            aria-label="Developmental Insight Callout"
            className={cn(
              'rounded-2xl border p-5 sm:p-6 shadow-xs transition-colors',
              isNightstandMode
                ? 'border-teal-900/80 bg-teal-950/20 text-stone-200'
                : 'border-teal-200/90 bg-gradient-to-br from-teal-50/80 via-[#F7FCFA] to-white text-slate-800'
            )}
          >
            <div className="flex items-center gap-2.5 text-teal-800 dark:text-teal-300 font-bold text-xs uppercase tracking-wider mb-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-700 text-white shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span>Pediatric Neurobiology · Clinical Takeaway</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed font-medium">
              {renderInlineMarkdown(parsedParts.clinicalInsight)}
            </p>
          </aside>
        )}

        {/* Fallback if no parts detected */}
        {!parsedParts.hasStructuredParts && (
          <div
            className={cn(
              'rounded-2xl border p-6 sm:p-10 shadow-xs leading-relaxed transition-colors',
              isNightstandMode
                ? 'bg-stone-900 border-stone-800 text-stone-200'
                : 'bg-white border-slate-200/90 text-slate-800'
            )}
          >
            {renderFormattedEditorialBody(lesson.contentMarkdown)}
          </div>
        )}

        {/* 3.5 Clinical Implementation & Parental Grounding */}
        {parsedParts.groundingText && (
          <div
            data-testid="lesson-grounding-anchor"
            className={cn(
              'rounded-2xl border p-5 sm:p-6 shadow-xs transition-colors space-y-2',
              isNightstandMode
                ? 'border-emerald-900/70 bg-emerald-950/20 text-stone-200'
                : 'border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 text-slate-800'
            )}
          >
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span>Parental Grounding · Tonight's Anchor</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed italic font-serif">
              {renderInlineMarkdown(parsedParts.groundingText)}
            </p>
          </div>
        )}
      </section>

      {/* 4. Category-Specific Adaptive Widget */}
      <LessonAdaptiveModuleRenderer
        adaptiveModuleType={lesson.adaptiveModuleType}
        category={lesson.module?.category}
        tier={lesson.module?.developmentalTier}
        isNightstandMode={isNightstandMode}
      />

      {/* 5. Interactive Dialogue Deck (Say This / Not That) */}
      <LessonDialogueDeck
        cards={lesson.dialogueCards}
        whatNotToSay={lesson.whatNotToSay}
        deliveryTip={lesson.deliveryTip}
        isNightstandMode={isNightstandMode}
      />

      {/* 6. Tonight's 3-Step Action Checklist */}
      <LessonActionChecklist
        lessonId={lesson.id}
        items={lesson.actionProtocolItems}
        isNightstandMode={isNightstandMode}
      />

      {/* 7. Active Tool Bridges (AI Advisor / Family Pact / Script Vault) */}
      <LessonToolBridges
        scenarioPrompt={lesson.title}
        isNightstandMode={isNightstandMode}
      />

      {/* 8. Footer Navigation & Completion */}
      <LessonFooterNav
        isCompleted={isCompleted}
        isSubmitting={isSubmitting}
        onComplete={handleComplete}
        moduleSlug={moduleSlug}
        nextLesson={nextLesson}
        prevLesson={prevLesson}
        currentLessonOrder={lesson.sortOrder}
        errorMessage={errorMessage}
        isNightstandMode={isNightstandMode}
      />
    </article>
  );
}
