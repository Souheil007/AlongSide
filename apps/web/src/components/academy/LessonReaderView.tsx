'use client';

import * as React from 'react';
import Link from 'next/link';
import type {
  AcademyLessonDTO,
  AcademyLessonSummaryDTO,
} from '@alongside/shared';
import { getCategoryBadgeInfo } from './ModuleCard';
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

/**
 * Assembles speech text strictly in the sequential order in which it is displayed on screen:
 * 1. Title
 * 2. Part 1 · Kitchen-Table Scenario
 * 3. Part 2 · Developmental Neurobiology
 * 4. Clinical & Neurobiological Insight
 * 5. Empathetic Dialogue Script
 * 6. Parental Grounding Anchor
 */
export function buildSequentialLessonSpokenText(
  lesson: AcademyLessonDTO,
  parsedParts: ParsedLessonParts
): string {
  const chunks: string[] = [];

  // 1. Title
  chunks.push(`Lesson ${lesson.sortOrder}: ${lesson.title}.`);

  // 2. Scenario
  if (parsedParts.scenarioText) {
    const cleanScenario = parsedParts.scenarioText
      .replace(/^#+\s*[^\n]*\n?/gm, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();
    if (cleanScenario) {
      chunks.push(`The Kitchen-Table Scenario: ${cleanScenario}`);
    }
  }

  // 3. Neurobiology
  if (parsedParts.neurobiologyText) {
    const cleanNeuro = parsedParts.neurobiologyText
      .replace(/^#+\s*[^\n]*\n?/gm, '')
      .replace(/>\s*\*\*(?:Clinical|Developmental) Insight:?\*\*:?[\s\S]*?(?=(?:\n\n|\n##|$))/gi, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();
    if (cleanNeuro) {
      chunks.push(`Developmental Neurobiology: ${cleanNeuro}`);
    }
  }

  // 4. Clinical Insight
  if (parsedParts.clinicalInsight) {
    const cleanInsight = parsedParts.clinicalInsight
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .trim();
    chunks.push(`Clinical Insight: ${cleanInsight}`);
  }

  // 5. Empathetic Script
  if (lesson.dialogueCards?.[0]?.empatheticScript) {
    chunks.push(`Empathetic script to use: ${lesson.dialogueCards[0].empatheticScript}`);
  } else if (lesson.thirtySecondGlance?.exactWords) {
    chunks.push(`Words to say: ${lesson.thirtySecondGlance.exactWords}`);
  }

  // 6. Parental Grounding Anchor
  if (parsedParts.groundingText) {
    const cleanGrounding = parsedParts.groundingText
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();
    chunks.push(`Parental Grounding: ${cleanGrounding}`);
  } else if (!parsedParts.hasStructuredParts && lesson.contentMarkdown) {
    // Fallback for non-structured markdown
    const cleanFallback = lesson.contentMarkdown
      .replace(/^#+\s*[^\n]*\n?/gm, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();
    chunks.push(cleanFallback);
  }

  return chunks.join(' ');
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

  // Generates sequential audio text strictly matching the displayed blog article
  const audioNarrationText = React.useMemo(() => {
    return buildSequentialLessonSpokenText(lesson, parsedParts);
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
   * Intelligently parses editorial markdown into clean, high-credibility blog formatting:
   * - Clean editorial headings
   * - Restrained pull-quotes and callouts
   * - Comfortable, readable paragraphs without decorative clutter
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

      // 1. Clinical / Developmental Insight Pullquote Callout
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
            data-testid="lesson-clinical-insight"
            aria-label="Developmental Insight Callout"
            className={cn(
              'my-8 rounded-2xl border-l-4 border-l-teal-600 dark:border-l-teal-400 border border-stone-200/80 dark:border-stone-800 p-6 sm:p-7 shadow-2xs transition-colors',
              isNightstandMode
                ? 'bg-stone-850/80 text-stone-200'
                : 'bg-stone-50/80 text-slate-800'
            )}
          >
            <div className="text-xs font-mono uppercase tracking-wider font-bold text-teal-800 dark:text-teal-300 mb-2">
              Clinical Neurobiology Takeaway
            </div>
            <p className="font-serif italic text-base sm:text-lg leading-relaxed text-slate-800 dark:text-stone-200">
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
              'text-sm sm:text-base font-bold mt-6 mb-2 tracking-tight',
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
              'text-base sm:text-lg font-bold mt-7 mb-2.5 tracking-tight',
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
              'font-serif text-lg sm:text-xl font-bold mt-8 mb-3 tracking-tight',
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
              'font-serif text-xl sm:text-2xl font-bold mt-10 mb-4 tracking-tight pt-6 border-t border-stone-100 dark:border-stone-800/80 first:border-0 first:pt-0 first:mt-0',
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
              'font-serif text-2xl sm:text-3xl font-bold mt-6 mb-4 tracking-tight',
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
              'my-4 list-decimal pl-6 space-y-2 text-base sm:text-lg leading-relaxed',
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
              'my-4 list-disc pl-6 space-y-2 text-base sm:text-lg leading-relaxed',
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
              'my-6 border-l-4 border-stone-300 dark:border-stone-700 pl-5 italic font-serif text-base sm:text-lg leading-relaxed py-2',
              isNightstandMode ? 'text-stone-300' : 'text-slate-700'
            )}
          >
            {renderInlineMarkdown(quoteText)}
          </blockquote>
        );
      }

      // 6. Regular Editorial Paragraph
      return (
        <p
          key={`p-${idx}`}
          className={cn(
            'my-4 text-base sm:text-lg leading-relaxed sm:leading-loose font-normal',
            isNightstandMode ? 'text-stone-300' : 'text-slate-700'
          )}
        >
          {renderInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  const categoryInfo = lesson.module?.category
    ? getCategoryBadgeInfo(lesson.module.category)
    : null;

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

      {/* 1. Relief Masthead */}
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

      {/* 3. Dedicated Blog-Style Lesson Reading Article (Single Unified Box) */}
      <section
        data-testid="lesson-editorial-section"
        aria-label="Lesson Reading Article and Narration"
        className="space-y-4"
      >
        <div
          data-testid="lesson-article-container"
          className={cn(
            'rounded-2xl sm:rounded-3xl border shadow-sm transition-colors overflow-hidden',
            isNightstandMode
              ? 'bg-stone-900 border-stone-800 text-stone-200'
              : 'bg-white border-stone-200/90 text-slate-900'
          )}
        >
          {/* Blog Article Header */}
          <header className="px-6 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-8 border-b border-stone-100 dark:border-stone-800/80 space-y-4">
            {/* Editorial Eyebrow & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono uppercase font-bold text-teal-800 dark:text-teal-300 tracking-wider">
                  {categoryInfo ? categoryInfo.label : 'Curriculum'}
                </span>
                <span className="text-stone-300 dark:text-stone-700">•</span>
                <span className="text-stone-500 dark:text-stone-400 font-medium">
                  Lesson {lesson.sortOrder}
                </span>
              </div>
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 font-mono text-xs">
                <span>~{lesson.readingMinutes || 4} min read</span>
                <span>•</span>
                <span>Evidence-Based</span>
              </div>
            </div>

            {/* Editorial Blog Headline */}
            <h1
              className={cn(
                'text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight leading-tight',
                isNightstandMode ? 'text-amber-100' : 'text-slate-900'
              )}
            >
              {lesson.title}
            </h1>

            {/* Minimalist Wave Audio Player Docked in Blog Header */}
            <div data-testid="lesson-narration-player" className="pt-2">
              <AudioMemoPlayer
                audioUrl={lesson.audioUrl}
                audioDurationSeconds={
                  lesson.audioDurationSeconds ||
                  (lesson.readingMinutes ? lesson.readingMinutes * 60 : null)
                }
                title={`Lesson ${lesson.sortOrder}: ${lesson.title}`}
                isNightstandMode={isNightstandMode}
                textToSpeak={audioNarrationText}
              />
            </div>
          </header>

          {/* Blog Article Body - Seamless, unbroken reading experience */}
          <div className="px-6 py-8 sm:px-10 sm:py-10 space-y-8">
            {/* 3.1 Part 1: The Kitchen-Table Scenario */}
            {parsedParts.scenarioText && (
              <section className="space-y-4">
                <div className="border-b border-stone-100 dark:border-stone-800/60 pb-2">
                  <h2
                    className={cn(
                      'font-serif text-xl sm:text-2xl font-bold tracking-tight',
                      isNightstandMode ? 'text-amber-100' : 'text-slate-900'
                    )}
                  >
                    The Kitchen-Table Scenario
                  </h2>
                  <p className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mt-1">
                    Real Family Friction
                  </p>
                </div>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed sm:leading-loose text-slate-700 dark:text-stone-300 font-normal">
                  {renderFormattedEditorialBody(parsedParts.scenarioText)}
                </div>
              </section>
            )}

            {/* 3.2 Part 2: Developmental Neurobiology Behind It */}
            {parsedParts.neurobiologyText && (
              <section className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800/60">
                <div className="border-b border-stone-100 dark:border-stone-800/60 pb-2">
                  <h2
                    className={cn(
                      'font-serif text-xl sm:text-2xl font-bold tracking-tight',
                      isNightstandMode ? 'text-amber-100' : 'text-slate-900'
                    )}
                  >
                    Developmental Neurobiology
                  </h2>
                  <p className="text-xs font-mono uppercase tracking-wider text-teal-800 dark:text-teal-300 font-semibold mt-1">
                    Inside Your Child&apos;s Brain
                  </p>
                </div>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed sm:leading-loose text-slate-700 dark:text-stone-300 font-normal">
                  {renderFormattedEditorialBody(parsedParts.neurobiologyText)}
                </div>
              </section>
            )}

            {/* 3.3 Clinical / Developmental Insight Callout (Pullquote Style) */}
            {parsedParts.clinicalInsight && (
              <aside
                data-testid="lesson-clinical-insight"
                aria-label="Clinical and Developmental Insight"
                className={cn(
                  'my-6 rounded-2xl border-l-4 border-l-teal-600 dark:border-l-teal-400 border border-stone-200/80 dark:border-stone-800 p-6 sm:p-7 shadow-2xs transition-colors',
                  isNightstandMode
                    ? 'bg-stone-850/80 text-stone-200'
                    : 'bg-stone-50/80 text-slate-800'
                )}
              >
                <div className="text-xs font-mono uppercase tracking-wider font-bold text-teal-800 dark:text-teal-300 mb-2">
                  Clinical Neurobiology Takeaway
                </div>
                <p className="font-serif italic text-base sm:text-lg leading-relaxed text-slate-800 dark:text-stone-200">
                  {renderInlineMarkdown(parsedParts.clinicalInsight)}
                </p>
              </aside>
            )}

            {/* Fallback if unstructured markdown */}
            {!parsedParts.hasStructuredParts && (
              <div className="space-y-4 text-base sm:text-lg leading-relaxed sm:leading-loose text-slate-700 dark:text-stone-300 font-normal">
                {renderFormattedEditorialBody(lesson.contentMarkdown)}
              </div>
            )}

            {/* 3.4 Clinical Implementation & Parental Grounding Anchor */}
            {parsedParts.groundingText && (
              <section
                data-testid="lesson-grounding-anchor"
                className={cn(
                  'rounded-2xl border p-6 sm:p-7 transition-colors space-y-2',
                  isNightstandMode
                    ? 'border-stone-800 bg-stone-850/60 text-stone-200'
                    : 'border-stone-200/90 bg-stone-50/60 text-slate-800'
                )}
              >
                <div className="text-xs font-mono uppercase tracking-wider font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Parental Grounding · Tonight&apos;s Anchor
                </div>
                <p className="font-serif italic text-base sm:text-lg leading-relaxed text-slate-700 dark:text-stone-300">
                  {renderInlineMarkdown(parsedParts.groundingText)}
                </p>
              </section>
            )}
          </div>
        </div>
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
