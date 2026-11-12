'use client';

import * as React from 'react';
import Link from 'next/link';
import type {
  AcademyLessonDTO,
  AcademyLessonSummaryDTO,
  ActionProtocolItem,
} from '@alongside/shared';
import {
  getLessonArchetypeHeadings,
  parseActionProtocolItems,
  parseDialogueCards,
  parseThirtySecondGlance,
  resolveLessonArchetype,
} from '@alongside/shared';
import { getCategoryBadgeInfo } from './ModuleCard';
import { markLessonComplete, recordActiveReadingTime } from '@/lib/api/academy';
import {
  ScrollProgressBar,
  LessonReliefMasthead,
  LessonVideoPlayer,
  LessonActionChecklist,
  LessonFooterNav,
  AudioMemoPlayer,
  LessonThirtySecondGlance,
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
  keyInsight: string;
  clinicalInsight?: string;
  groundingText: string;
  actionItems: ActionProtocolItem[];
  hasStructuredParts: boolean;
}

/**
 * Extracts distinct pedagogical parts from lesson markdown:
 * - Part 1: The Kitchen-Table Scenario
 * - Part 2: The Developmental Neurobiology Behind It
 * - Key Takeaway callout
 * - A Note for You as a Parent (Parental Grounding anchor)
 * - Part 4: 3-Step Action Protocol items
 */
export function parseLessonContentParts(markdown: string): ParsedLessonParts {
  if (!markdown) {
    return {
      scenarioText: '',
      neurobiologyText: '',
      keyInsight: '',
      clinicalInsight: '',
      groundingText: '',
      actionItems: [],
      hasStructuredParts: false,
    };
  }

  const part1Match = markdown.match(/## Part 1:[^\n]*\n([\s\S]*?)(?=## Part 2:|$)/i);
  const part2Match = markdown.match(/## Part 2:[^\n]*\n([\s\S]*?)(?=## Part 3:|## Part 4:|$)/i);
  const groundingMatch = markdown.match(
    /### (?:A Note for You as a Parent|Clinical Implementation & Parental Grounding|Parental Grounding)[^\n]*\n([\s\S]*?)(?=\*Need tailored|$)/i
  );

  let rawPart2 = part2Match ? part2Match[1]!.trim() : '';
  let clinicalInsight = '';

  const insightMatch = rawPart2.match(
    />\s*\*\*(?:Key Takeaway|Clinical Insight|Developmental Insight):?\*\*:?\s*([\s\S]*?)(?=(?:\n\n|\n##|$))/i
  );
  if (insightMatch) {
    clinicalInsight = insightMatch[1]!.trim();
    rawPart2 = rawPart2
      .replace(/>\s*\*\*(?:Key Takeaway|Clinical Insight|Developmental Insight):?\*\*:?\s*[\s\S]*?(?=(?:\n\n|\n##|$))/i, '')
      .trim();
  }

  const scenarioText = part1Match ? part1Match[1]!.trim() : '';
  const neurobiologyText = rawPart2;
  const groundingText = groundingMatch ? groundingMatch[1]!.trim() : '';
  const actionItems = parseActionProtocolItems(markdown);
  const hasStructuredParts = Boolean(scenarioText || neurobiologyText);

  return {
    scenarioText,
    neurobiologyText,
    keyInsight: clinicalInsight,
    clinicalInsight,
    groundingText,
    actionItems,
    hasStructuredParts,
  };
}

/**
 * Assembles speech text strictly in the sequential order in which it is displayed on screen:
 * 1. Title
 * 2. Part 1 · Kitchen-Table Scenario
 * 3. Part 2 · Developmental Understanding
 * 4. Key Takeaway
 * 5. Part 3 · Empathetic Dialogue Script
 * 6. Part 4 · Note for You as a Parent
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
      chunks.push(`What It Looks Like: ${cleanScenario}`);
    }
  }

  // 3. Neurobiology / Growth
  if (parsedParts.neurobiologyText) {
    const cleanNeuro = parsedParts.neurobiologyText
      .replace(/^#+\s*[^\n]*\n?/gm, '')
      .replace(/>\s*\*\*(?:Key Takeaway|Clinical|Developmental) Insight:?\*\*:?[\s\S]*?(?=(?:\n\n|\n##|$))/gi, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();
    if (cleanNeuro) {
      chunks.push(`Understanding Your Child: ${cleanNeuro}`);
    }
  }

  // 4. Key Takeaway
  if (parsedParts.clinicalInsight) {
    const cleanInsight = parsedParts.clinicalInsight
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .trim();
    chunks.push(`Key Takeaway: ${cleanInsight}`);
  }

  // 5. Empathetic Script
  if (lesson.dialogueCards?.[0]?.empatheticScript) {
    chunks.push(`Empathetic script to use: ${lesson.dialogueCards[0].empatheticScript}`);
  } else if (lesson.thirtySecondGlance?.exactWords) {
    chunks.push(`Words to say: ${lesson.thirtySecondGlance.exactWords}`);
  }

  // 6. Note for You as a Parent
  if (parsedParts.groundingText) {
    const cleanGrounding = parsedParts.groundingText
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();
    chunks.push(`A Note for You as a Parent: ${cleanGrounding}`);
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

  // 1. Resolve Archetype and Pedagogical Headings
  const archetype = React.useMemo(() => {
    return (
      lesson.archetype ||
      resolveLessonArchetype(lesson.slug, lesson.title, lesson.module?.category)
    );
  }, [lesson.archetype, lesson.slug, lesson.title, lesson.module?.category]);

  const headings = React.useMemo(() => {
    return getLessonArchetypeHeadings(archetype);
  }, [archetype]);

  const parsedParts = React.useMemo(
    () => parseLessonContentParts(lesson.contentMarkdown),
    [lesson.contentMarkdown]
  );

  // Dialogue Cards for Part 3
  const dialogueCards = React.useMemo(() => {
    if (lesson.dialogueCards && lesson.dialogueCards.length > 0) {
      return lesson.dialogueCards;
    }
    return parseDialogueCards(lesson.contentMarkdown, lesson.deliveryTip);
  }, [lesson.dialogueCards, lesson.contentMarkdown, lesson.deliveryTip]);

  // 30-Second Glance Data for Header Drawer
  const glanceData = React.useMemo(() => {
    if (lesson.thirtySecondGlance) return lesson.thirtySecondGlance;
    return parseThirtySecondGlance(lesson.contentMarkdown, dialogueCards, lesson.title);
  }, [lesson.thirtySecondGlance, lesson.contentMarkdown, dialogueCards, lesson.title]);

  // Action Protocol Items for Part 4
  const actionItems = React.useMemo(() => {
    if (lesson.actionProtocolItems && lesson.actionProtocolItems.length > 0) {
      return lesson.actionProtocolItems;
    }
    return parsedParts.actionItems;
  }, [lesson.actionProtocolItems, parsedParts.actionItems]);

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

  // Dynamically record active reading time (1 minute intervals when tab is visible)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        recordActiveReadingTime(lesson.id, 1);
      }
    }, 60000);

    return () => {
      window.clearInterval(interval);
    };
  }, [lesson.id]);

  const handleComplete = async () => {
    if (isCompleted || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await markLessonComplete(lesson.id, lesson.readingMinutes || 4);
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

      // Omit raw comparative dialogue headers if handled by Part 3 comparative cards
      if (
        trimmed.toLowerCase().startsWith('## part 3') ||
        trimmed.toLowerCase().startsWith('### comparative dialogue') ||
        trimmed.includes('| What NOT to Say |')
      ) {
        return null;
      }

      // Omit raw checklist markdown if handled by action checklist
      if (
        trimmed.toLowerCase().startsWith('## part 4') ||
        trimmed.toLowerCase().startsWith('### practical action protocol') ||
        trimmed.toLowerCase().startsWith('### action protocol') ||
        (trimmed.startsWith('- [ ]') && trimmed.includes('\n- [ ]'))
      ) {
        return null;
      }

      // 1. Key Takeaway Pullquote Callout
      if (
        trimmed.toLowerCase().includes('developmental insight') ||
        trimmed.toLowerCase().includes('clinical insight') ||
        trimmed.toLowerCase().includes('key takeaway') ||
        trimmed.startsWith('> **Key Takeaway') ||
        trimmed.startsWith('**Key Takeaway') ||
        trimmed.startsWith('> **Developmental Insight') ||
        trimmed.startsWith('**Developmental Insight') ||
        trimmed.startsWith('> **Clinical Insight') ||
        trimmed.startsWith('**Clinical Insight')
      ) {
        const cleanText = trimmed
          .replace(/^#+\s*/, '')
          .replace(/^>\s*/, '')
          .replace(/^\*\*(?:Key Takeaway|Developmental|Clinical) Insight:?\*\*:?\s*/i, '')
          .replace(/^(?:Key Takeaway|Developmental|Clinical) Insight:?\s*/i, '')
          .trim();

        return (
          <aside
            key={`insight-${idx}`}
            data-testid="lesson-clinical-insight"
            aria-label={headings.takeawayLabel}
            className={cn(
              'my-8 rounded-2xl border-l-4 border-l-teal-600 dark:border-l-teal-400 border border-stone-200/80 dark:border-stone-800 p-6 sm:p-7 shadow-2xs transition-colors',
              isNightstandMode
                ? 'bg-stone-850/80 text-stone-200'
                : 'bg-stone-50/80 text-slate-800'
            )}
          >
            <div className="text-xs font-mono uppercase tracking-wider font-bold text-teal-800 dark:text-teal-300 mb-2">
              {headings.takeawayLabel}
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

      {/* 2. Unified Rich Editorial Blog Post Reader (Single Continuous Article Container) */}
      <section
        data-testid="lesson-editorial-section"
        aria-label="Lesson Reading Article and Narration"
        className="space-y-4"
      >
        <article
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
                <span>Research-Backed</span>
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

            {/* Minimalist Wave Audio Player Docked in Blog Header ("Listen to Article") */}
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

            {/* Collapsible Quick 30-Sec Read Drawer Inside Blog Post Header */}
            <div className="pt-1">
              <LessonThirtySecondGlance
                glance={glanceData}
                defaultOpen={false}
                isNightstandMode={isNightstandMode}
                eyebrow={headings.quickReadTitle}
                title="What's Happening &amp; What to Say"
              />
            </div>
          </header>

          {/* Blog Article Body - Seamless, unbroken reading experience across all 4 parts */}
          <div className="px-6 py-8 sm:px-10 sm:py-10 space-y-10">
            {/* Part 1: The Kitchen-Table Scenario */}
            {parsedParts.scenarioText && (
              <section data-testid="lesson-part-1" className="space-y-4">
                <div className="border-b border-stone-100 dark:border-stone-800/60 pb-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mb-1">
                    {headings.part1Eyebrow}
                  </p>
                  <h2
                    className={cn(
                      'font-serif text-xl sm:text-2xl font-bold tracking-tight',
                      isNightstandMode ? 'text-amber-100' : 'text-slate-900'
                    )}
                  >
                    {headings.part1Title}
                  </h2>
                </div>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed sm:leading-loose text-slate-700 dark:text-stone-300 font-normal">
                  {renderFormattedEditorialBody(parsedParts.scenarioText)}
                </div>
              </section>
            )}

            {/* Part 2: Understanding Your Child & Growth Concept */}
            {parsedParts.neurobiologyText && (
              <section
                data-testid="lesson-part-2"
                className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800/60"
              >
                <div className="border-b border-stone-100 dark:border-stone-800/60 pb-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-teal-800 dark:text-teal-300 font-semibold mb-1">
                    {headings.part2Eyebrow}
                  </p>
                  <h2
                    className={cn(
                      'font-serif text-xl sm:text-2xl font-bold tracking-tight',
                      isNightstandMode ? 'text-amber-100' : 'text-slate-900'
                    )}
                  >
                    {headings.part2Title}
                  </h2>
                </div>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed sm:leading-loose text-slate-700 dark:text-stone-300 font-normal">
                  {renderFormattedEditorialBody(parsedParts.neurobiologyText)}
                </div>

                {/* Key Takeaway Pullquote Callout */}
                {parsedParts.clinicalInsight && (
                  <aside
                    data-testid="lesson-clinical-insight"
                    aria-label={headings.takeawayLabel}
                    className={cn(
                      'my-6 rounded-2xl border-l-4 border-l-teal-600 dark:border-l-teal-400 border border-stone-200/80 dark:border-stone-800 p-6 sm:p-7 shadow-2xs transition-colors',
                      isNightstandMode
                        ? 'bg-stone-850/80 text-stone-200'
                        : 'bg-stone-50/80 text-slate-800'
                    )}
                  >
                    <div className="text-xs font-mono uppercase tracking-wider font-bold text-teal-800 dark:text-teal-300 mb-2">
                      {headings.takeawayLabel}
                    </div>
                    <p className="font-serif italic text-base sm:text-lg leading-relaxed text-slate-800 dark:text-stone-200">
                      {renderInlineMarkdown(parsedParts.clinicalInsight)}
                    </p>
                  </aside>
                )}
              </section>
            )}

            {/* Part 3: What to Say in the Moment (Comparative Dialogue Scripts & Pushback Recovery) */}
            <section
              data-testid="lesson-part-3"
              className="space-y-6 pt-4 border-t border-stone-100 dark:border-stone-800/60"
            >
              <div className="border-b border-stone-100 dark:border-stone-800/60 pb-2">
                <p className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mb-1">
                  {headings.part3Eyebrow}
                </p>
                <h2
                  className={cn(
                    'font-serif text-xl sm:text-2xl font-bold tracking-tight',
                    isNightstandMode ? 'text-amber-100' : 'text-slate-900'
                  )}
                >
                  {headings.part3Title}
                </h2>
              </div>

              {/* Side-by-side Comparative Dialogue Cards (No Copy Script button) */}
              {dialogueCards.length > 0 && (
                <div data-testid="comparative-dialogue-section" className="space-y-4">
                  {dialogueCards.map((card, idx) => (
                    <div
                      key={`card-${idx}`}
                      className={cn(
                        'grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl border p-4 sm:p-5 shadow-2xs transition-colors',
                        isNightstandMode
                          ? 'bg-stone-850/50 border-stone-800'
                          : 'bg-stone-50/50 border-stone-200/90'
                      )}
                    >
                      {/* Common Reaction / Reactive Trap (Red) */}
                      <div
                        className={cn(
                          'rounded-xl border p-4 space-y-2 transition-colors',
                          isNightstandMode
                            ? 'bg-rose-950/20 border-rose-900/40 text-rose-200'
                            : 'bg-rose-50/70 border-rose-200/80 text-rose-950'
                        )}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400">
                          <span>🛑 Common Reaction</span>
                        </div>
                        <blockquote className="text-sm sm:text-base font-serif italic text-rose-950 dark:text-rose-200">
                          &ldquo;{card.instinctiveMistake}&rdquo;
                        </blockquote>
                        {card.whyItBackfires && (
                          <p className="text-xs text-rose-900/80 dark:text-rose-300 leading-relaxed pt-1.5 border-t border-rose-200/60 dark:border-rose-900/40">
                            <strong className="font-semibold">Why it backfires:</strong>{' '}
                            {card.whyItBackfires}
                          </p>
                        )}
                      </div>

                      {/* Empathetic Script to Try (Green) */}
                      <div
                        className={cn(
                          'rounded-xl border p-4 space-y-2 transition-colors',
                          isNightstandMode
                            ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200'
                            : 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
                        )}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                          <span>✅ Try Saying This Instead</span>
                        </div>
                        <blockquote className="text-sm sm:text-base font-serif italic font-medium text-emerald-950 dark:text-emerald-200">
                          &ldquo;{card.empatheticScript}&rdquo;
                        </blockquote>
                        {card.deliveryTip && (
                          <p className="text-xs text-emerald-900/80 dark:text-emerald-300 leading-relaxed pt-1.5 border-t border-emerald-200/60 dark:border-emerald-900/40">
                            <strong className="font-semibold">🎙️ Tone &amp; Body Language Tip:</strong>{' '}
                            {card.deliveryTip}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pushback Recovery Guidance */}
              {(lesson.whatNotToSay || (dialogueCards[0]?.deliveryTip && dialogueCards.length > 0)) && (
                <div
                  data-testid="pushback-recovery-box"
                  className={cn(
                    'rounded-xl border p-4 sm:p-5 text-xs sm:text-sm leading-relaxed transition-colors space-y-2',
                    isNightstandMode
                      ? 'bg-stone-850/60 border-stone-700 text-stone-200'
                      : 'bg-amber-50/50 border-amber-200/80 text-slate-800'
                  )}
                >
                  <div className="font-bold uppercase tracking-wider text-[11px] text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                    <span>💭 What If They Push Back?</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-stone-300 leading-relaxed">
                    {lesson.whatNotToSay
                      ? `If your child tests the limit or escalates: Remember that pushback is often a test of emotional safety, not defiance. Keep your tone neutral, repeat your boundary in fewer than six words, and avoid defending or lecturing: "${dialogueCards[0]?.empatheticScript || 'I hear you. It is okay to be upset, and we are sticking to our family plan.'}"`
                      : 'If your child pushes back or demands an immediate argument: Stay physically grounded, keep your vocal pitch low, and pause before answering. Children can only co-regulate to an adult who refuses to join their chaotic rhythm.'}
                  </p>
                </div>
              )}
            </section>

            {/* Fallback if unstructured markdown */}
            {!parsedParts.hasStructuredParts && (
              <div className="space-y-4 text-base sm:text-lg leading-relaxed sm:leading-loose text-slate-700 dark:text-stone-300 font-normal">
                {renderFormattedEditorialBody(lesson.contentMarkdown)}
              </div>
            )}

            {/* Part 4: Putting It Into Practice (3-Step Action Checklist & Parental Grounding) */}
            <section
              data-testid="lesson-part-4"
              className="space-y-6 pt-4 border-t border-stone-100 dark:border-stone-800/60"
            >
              <div className="border-b border-stone-100 dark:border-stone-800/60 pb-2">
                <p className="text-xs font-mono uppercase tracking-wider text-teal-800 dark:text-teal-300 font-semibold mb-1">
                  {headings.part4Eyebrow}
                </p>
                <h2
                  className={cn(
                    'font-serif text-xl sm:text-2xl font-bold tracking-tight',
                    isNightstandMode ? 'text-amber-100' : 'text-slate-900'
                  )}
                >
                  {headings.part4Title}
                </h2>
              </div>

              {/* Interactive 3-Step Action Checklist integrated directly inside article */}
              <LessonActionChecklist
                lessonId={lesson.id}
                items={actionItems}
                category={lesson.module?.category}
                lessonTitle={lesson.title}
                isNightstandMode={isNightstandMode}
                className="my-4"
              />

              {/* A Note for You as a Parent (Unique closing reflection) */}
              {parsedParts.groundingText && (
                <section
                  data-testid="lesson-grounding-anchor"
                  className={cn(
                    'rounded-2xl border p-6 sm:p-7 transition-colors space-y-2 mt-6',
                    isNightstandMode
                      ? 'border-stone-800 bg-stone-850/60 text-stone-200'
                      : 'border-stone-200/90 bg-stone-50/60 text-slate-800'
                  )}
                >
                  <div className="text-xs font-mono uppercase tracking-wider font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {headings.closingLabel}
                  </div>
                  <p className="font-serif italic text-base sm:text-lg leading-relaxed text-slate-700 dark:text-stone-300">
                    {renderInlineMarkdown(parsedParts.groundingText)}
                  </p>
                </section>
              )}
            </section>
          </div>
        </article>
      </section>

      {/* 3. Optional Master Video Lecture Section (Positioned BELOW the Unified Blog Post) */}
      {lesson.videoLecture && (
        <section
          data-testid="lesson-video-section"
          aria-label="Watch &amp; Go Deeper: Master Video Lecture"
          className="space-y-3 pt-2"
        >
          <div className="border-b border-stone-200 dark:border-stone-800 pb-2">
            <h2
              className={cn(
                'font-serif text-xl sm:text-2xl font-bold tracking-tight',
                isNightstandMode ? 'text-amber-100' : 'text-slate-900'
              )}
            >
              Watch &amp; Go Deeper
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              Optional curated video talk and key concepts to deepen your perspective
            </p>
          </div>

          <LessonVideoPlayer
            video={lesson.videoLecture}
            isNightstandMode={isNightstandMode}
          />
        </section>
      )}

      {/* 4. Footer Navigation & Completion */}
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
