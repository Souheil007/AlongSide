'use client';

import * as React from 'react';
import Link from 'next/link';
import type {
  AcademyLessonDTO,
  AcademyLessonSummaryDTO,
  ActionProtocolItem,
  ChildPersonalizationContext,
} from '@alongside/shared';
import {
  formatCourseTitle,
  parseActionProtocolItems,
  resolveAlmanacLessonPayload,
} from '@alongside/shared';
import { useAlmanacLessonState } from '@/hooks/useAlmanacLessonState';
import {
  AlmanacBrainBeat,
  AlmanacListenDock,
  AlmanacMarginRail,
  AlmanacMirrorBeat,
  AlmanacMoveBeat,
  AlmanacPocketBeat,
  AlmanacReaderNav,
  AlmanacRehearsalBeat,
  PartnerShareModal,
} from './almanac';
import { cn } from '@/lib/utils';

export interface LessonReaderViewProps {
  lesson: AcademyLessonDTO;
  moduleSlug: string;
  moduleTitle?: string;
  activeChild?: ChildPersonalizationContext | null;
  episodeNumber?: number;
  totalEpisodes?: number;
  nextLesson?: AcademyLessonSummaryDTO | null;
  prevLesson?: AcademyLessonSummaryDTO | null;
  onLessonComplete?: () => void;
  className?: string;
}

/**
 * Legacy helper retained for shared markdown rendering callers.
 */
export function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  const tokens = text.split(
    /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  );
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-[var(--ink)]">
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
        <em key={i} className="italic text-[var(--spruce)]">
          {token.slice(1, -1)}
        </em>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code
          key={i}
          className="rounded bg-[var(--canvas-subtle)] px-1 py-0.5 font-mono text-xs text-[var(--spruce)]"
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
          className="text-[var(--spruce)] underline hover:text-[var(--spruce-hover)]"
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
 * Legacy markdown parser retained for backward compatibility with existing tests/callers.
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

  const part1Match = markdown.match(
    /## Part 1:[^\n]*\n([\s\S]*?)(?=## Part 2:|$)/i
  );
  const part2Match = markdown.match(
    /## Part 2:[^\n]*\n([\s\S]*?)(?=## Part 3:|## Part 4:|$)/i
  );
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
      .replace(
        />\s*\*\*(?:Key Takeaway|Clinical Insight|Developmental Insight):?\*\*:?\s*[\s\S]*?(?=(?:\n\n|\n##|$))/i,
        ''
      )
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
 * Legacy speech assembler retained for backward compatibility.
 */
export function buildSequentialLessonSpokenText(
  lesson: AcademyLessonDTO,
  parsedParts: ParsedLessonParts
): string {
  const chunks: string[] = [`Lesson ${lesson.sortOrder}: ${lesson.title}.`];
  if (parsedParts.scenarioText) chunks.push(parsedParts.scenarioText);
  if (parsedParts.neurobiologyText) chunks.push(parsedParts.neurobiologyText);
  if (parsedParts.clinicalInsight) chunks.push(parsedParts.clinicalInsight);
  if (lesson.dialogueCards?.[0]?.empatheticScript) {
    chunks.push(lesson.dialogueCards[0].empatheticScript);
  }
  if (parsedParts.groundingText) chunks.push(parsedParts.groundingText);
  return chunks.join(' ');
}

function formatChildBadgeText(
  child?: ChildPersonalizationContext | null,
  t?: (s: string) => string
): string | null {
  const name = child?.name?.trim();
  if (!name) return null;
  const ageStr = t ? t('{age}') : '';
  return ageStr && ageStr !== 'this stage' ? `${name} (${ageStr})` : name;
}

/**
 * Interactive Almanac v2 Lesson Reader (PLAN-48).
 * Renders the 5-Beat full-bleed tonal experience:
 *   Beat 1 (Canvas): The Mirror + Unboxed Editorial Art + 1-Tap Check-In
 *   Beat 2 (Warm Sand): Inside Mind + Interactive Visual Stage + Bookmarkable Truth
 *   Beat 3 (Canvas): Practice + Zero-Shame Instincts + Annotated Calm Script + Pushback Chips + AI Advisor Bridge
 *   Beat 4 (Whisper Spruce): One Tiny Move (Live-populates Beat 5 Pocket Card)
 *   Beat 5 (Canvas): Live-Building Pocket Card + Almanac Seal + 20s Co-Parent Share + Bottom-Only Master Talk + Curiosity Cliffhanger
 */
export function LessonReaderView({
  lesson,
  moduleSlug,
  moduleTitle,
  activeChild,
  episodeNumber,
  totalEpisodes,
  nextLesson,
  prevLesson,
  onLessonComplete,
  className,
}: LessonReaderViewProps) {
  const payload = React.useMemo(
    () => resolveAlmanacLessonPayload(lesson),
    [lesson]
  );

  const state = useAlmanacLessonState({
    lesson,
    payload,
    child: activeChild,
    onLessonComplete,
  });

  const { t } = state;

  const formattedCourseTitle = moduleTitle
    ? formatCourseTitle(moduleTitle)
    : lesson.module?.title
      ? formatCourseTitle(lesson.module.title)
      : 'Course Arc';

  const childBadge = formatChildBadgeText(activeChild, t);
  const childShortName = activeChild?.name?.trim() || null;
  const childPossessive = childShortName ? t('{Possessive}') : null;

  const resolvedEpisodeNumber = episodeNumber ?? lesson.sortOrder ?? 1;
  const resolvedTotalEpisodes = totalEpisodes ?? 4;

  const chosenMove =
    payload.moves.find((m) => m.id === state.chosenMoveId) ?? null;
  const firstSavedPushback =
    payload.pushbacks.find((pb) => state.savedPushbackIds.includes(pb.id)) ??
    null;

  return (
    <article
      data-testid="lesson-reader-view"
      data-almanac-theme={state.isNightstandMode ? 'nightstand' : 'almanac'}
      className={cn(
        '-mx-4 -my-6 sm:-mx-6 lg:-mx-8 overflow-x-clip min-h-screen bg-[var(--canvas)] text-[var(--ink)] xl:border-x xl:border-[var(--hairline-soft)] transition-colors duration-200',
        state.isNightstandMode && 'almanac-nightstand',
        className
      )}
    >
      {/* Sticky Almanac Reader Bar + 2px Live Spruce Scroll Progress Hairline */}
      <AlmanacReaderNav
        moduleSlug={moduleSlug}
        moduleTitle={formattedCourseTitle}
        activeBeat={state.activeBeat}
        scrollPercent={state.scrollPercent}
        listenMode={state.listenMode}
        isNightstandMode={state.isNightstandMode}
        onJumpToBeat={state.scrollToBeat}
        onSetReadingMode={state.setReadingMode}
        onToggleNightstand={state.toggleNightstandMode}
      />

      {/* Full-Bleed Tonal Reading Folio + Quiet Desktop Left-Margin Chapter Rail */}
      <div className="relative">
        <AlmanacMarginRail
          activeBeat={state.activeBeat}
          onJumpToBeat={state.scrollToBeat}
        />

        {/* Docked Companion Audio Narrator (Only visible in Listen mode) */}
        <AlmanacListenDock
          visible={state.listenMode}
          isPlaying={state.isPlaying}
          playbackSpeed={state.playbackSpeed}
          audioSeconds={state.audioSeconds}
          totalAudioSeconds={state.totalAudioSeconds}
          speakingBeat={state.speakingBeat}
          audioUrl={lesson.audioUrl}
          audioRef={state.audioRef}
          onAudioError={state.onAudioError}
          onTogglePlay={state.togglePlayAudio}
          onCycleSpeed={state.cyclePlaybackSpeed}
        />

        {/* Beat 1 (Canvas): The Mirror */}
        <AlmanacMirrorBeat
          payload={payload}
          episodeNumber={resolvedEpisodeNumber}
          totalEpisodes={resolvedTotalEpisodes}
          readingMinutes={lesson.readingMinutes || 3}
          childBadge={childBadge}
          videoDurationMinutes={lesson.videoLecture?.durationMinutes ?? null}
          selectedPollId={state.selectedPollId}
          onSelectPoll={state.setSelectedPollId}
          onJumpToVideo={
            lesson.videoLecture ? state.scrollToVideoShelf : undefined
          }
          isNarrating={state.isPlaying && state.speakingBeat === 0}
          t={t}
        />

        {/* Beat 2 (Warm Sand): Inside Mind + Interactive Visual Stage */}
        <AlmanacBrainBeat
          payload={payload}
          bookmarkedTruth={state.bookmarkedTruth}
          onToggleBookmarkTruth={state.toggleBookmarkTruth}
          isNarrating={state.isPlaying && state.speakingBeat === 1}
          t={t}
        />

        {/* Beat 3 (Canvas): Practice + Annotated Calm Script + Pushbacks */}
        <AlmanacRehearsalBeat
          payload={payload}
          selectedInstinctId={state.selectedInstinctId}
          skippedInstinct={state.skippedInstinct}
          activeAnnotationId={state.activeAnnotationId}
          selectedPushbackId={state.selectedPushbackId}
          savedPushbackIds={state.savedPushbackIds}
          onSelectInstinct={(id) => {
            state.setSelectedInstinctId(id);
            state.setSkippedInstinct(false);
          }}
          onSkipInstinct={() => state.setSkippedInstinct(true)}
          onToggleAnnotation={state.toggleAnnotation}
          onSelectPushback={state.setSelectedPushbackId}
          onToggleSavePushback={state.toggleSavePushback}
          onOpenAdvisor={state.openAdvisorWithLessonContext}
          childShortName={childShortName}
          isNarrating={state.isPlaying && state.speakingBeat === 2}
          t={t}
        />

        {/* Beat 4 (Whisper Spruce): Tonight's One Small Move */}
        <AlmanacMoveBeat
          payload={payload}
          chosenMoveId={state.chosenMoveId}
          onSelectMove={state.selectTonightMove}
          isNarrating={state.isPlaying && state.speakingBeat === 3}
          t={t}
        />

        {/* Beat 5 (Canvas): Live Pocket Card + Almanac Seal + Bottom-Only Master Talk + Up Next */}
        <AlmanacPocketBeat
          payload={payload}
          moduleSlug={moduleSlug}
          chosenMoveId={state.chosenMoveId}
          bookmarkedTruth={state.bookmarkedTruth}
          savedPushbackIds={state.savedPushbackIds}
          isCompleted={state.isCompleted}
          isSaving={state.isSaving}
          saveError={state.saveError}
          onSealAndSave={state.sealAndSavePocketCard}
          onOpenShareModal={() => state.setIsShareModalOpen(true)}
          videoLecture={lesson.videoLecture}
          nextLesson={nextLesson}
          prevLesson={prevLesson}
          childPossessive={childPossessive}
          isNarrating={state.isPlaying && state.speakingBeat === 4}
          t={t}
        />
      </div>

      {/* 20-Second Co-Parent Share Modal */}
      <PartnerShareModal
        isOpen={state.isShareModalOpen}
        onClose={() => state.setIsShareModalOpen(false)}
        headline={t(payload.headline)}
        calmScript={t(payload.calmScriptPlain)}
        chosenMoveTitle={chosenMove ? t(chosenMove.title) : null}
        savedPushbackScript={
          firstSavedPushback ? t(firstSavedPushback.script) : null
        }
        childLabel={childBadge}
      />
    </article>
  );
}
