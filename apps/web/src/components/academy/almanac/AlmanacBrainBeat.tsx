'use client';

import * as React from 'react';
import { Bookmark, ChevronDown } from 'lucide-react';
import { AlmanacVisualType, type AlmanacLessonPayload } from '@alongside/shared';
import {
  BrainBridgeVisual,
  CircadianCurveVisual,
  HabitGuardrailVisual,
  LensExposureMatrixVisual,
  RoutineTimelineVisual,
  SensoryLadderVisual,
  ServeReturnVisual,
} from './visuals';
import { cn } from '@/lib/utils';

export interface AlmanacBrainBeatProps {
  payload: AlmanacLessonPayload;
  bookmarkedTruth: boolean;
  onToggleBookmarkTruth: () => void;
  isNarrating: boolean;
  t: (str: string) => string;
}

export function AlmanacBrainBeat({
  payload,
  bookmarkedTruth,
  onToggleBookmarkTruth,
  isNarrating,
  t,
}: AlmanacBrainBeatProps) {
  const [scienceOpen, setScienceOpen] = React.useState(false);

  const renderedLead = t(payload.beat2Lead).trim();
  const renderedScience = t(payload.scienceDeepDive).trim();
  const hasDistinctScience =
    renderedScience.length > 0 &&
    renderedScience.toLowerCase() !== renderedLead.toLowerCase();

  const renderVisual = () => {
    const props = { config: payload.visualConfig, t };
    switch (payload.visualType) {
      case AlmanacVisualType.SENSORY_LADDER:
        return <SensoryLadderVisual {...props} />;
      case AlmanacVisualType.LENS_EXPOSURE_MATRIX:
        return <LensExposureMatrixVisual {...props} />;
      case AlmanacVisualType.CIRCADIAN_CURVE:
        return <CircadianCurveVisual {...props} />;
      case AlmanacVisualType.ROUTINE_TIMELINE:
        return <RoutineTimelineVisual {...props} />;
      case AlmanacVisualType.SERVE_RETURN_LOOP:
        return <ServeReturnVisual {...props} />;
      case AlmanacVisualType.HABIT_GUARDRAIL:
        return <HabitGuardrailVisual {...props} />;
      case AlmanacVisualType.BRAIN_BRIDGE:
      default:
        return <BrainBridgeVisual {...props} />;
    }
  };

  return (
    <section
      data-almanac-beat="1"
      data-testid="almanac-beat-2"
      aria-label="Beat 2: Inside Mind"
      className="w-full bg-[var(--band-sand)] px-4 sm:px-6 py-12 sm:py-16 scroll-mt-32 transition-colors duration-200"
    >
      <div
        className={cn(
          'relative mx-auto max-w-[700px]',
          isNarrating &&
            'before:absolute before:-left-4 before:top-1 before:bottom-1 before:w-[3px] before:rounded-full before:bg-[var(--spruce)]'
        )}
      >
        <span className="block text-[13px] font-semibold text-[var(--spruce)] mb-2">
          {t(payload.beat2Kicker)}
        </span>

        <h2 className="font-serif-almanac text-[26px] sm:text-[34px] font-semibold leading-[1.16] tracking-[-0.02em] text-[var(--ink)] mb-3.5">
          {t(payload.beat2Title)}
        </h2>

        <p className="text-[16px] leading-[1.66] text-[var(--body)] max-w-[60ch] mb-7">
          {t(payload.beat2Lead)}
        </p>

        {/* Interactive Visual Concept Stage */}
        <div className="rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)] p-5 sm:p-7 mb-7 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <span className="text-[14px] font-semibold text-[var(--ink)]">
              {t(payload.visualStageTitle)}
            </span>
            <span className="text-[12.5px] text-[var(--mute)]">
              {t(payload.visualStageHint)}
            </span>
          </div>

          {renderVisual()}
        </div>

        {/* Bookmarkable Amber-Ruled Key Idea Pull-Quote */}
        <aside
          aria-label="Key idea to keep"
          data-testid="almanac-truth-quote"
          className="border-l-[3px] border-l-[var(--amber)] py-1.5 pl-5 my-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-[12px] font-semibold text-[var(--amber)]">
              Key idea to keep
            </span>

            <button
              type="button"
              onClick={onToggleBookmarkTruth}
              aria-pressed={bookmarkedTruth}
              data-testid="bookmark-truth-btn"
              className={cn(
                'inline-flex min-h-[36px] items-center gap-1.5 rounded-full border px-3 text-[12px] transition-all cursor-pointer',
                bookmarkedTruth
                  ? 'border-[var(--spruce-border)] bg-[var(--spruce-soft)] font-semibold text-[var(--spruce)]'
                  : 'border-[var(--hairline)] bg-transparent font-medium text-[var(--mute)] hover:border-[var(--spruce-border)] hover:text-[var(--ink)]'
              )}
            >
              <Bookmark
                className={cn('h-3.5 w-3.5', bookmarkedTruth && 'fill-current')}
                aria-hidden="true"
              />
              <span>{bookmarkedTruth ? 'Saved to Pocket Card' : 'Save idea'}</span>
            </button>
          </div>

          <p className="font-serif-almanac italic text-[20px] sm:text-[22px] leading-[1.46] text-[var(--ink)] m-0">
            {t(payload.almanacTruth)}
          </p>
        </aside>

        {/* Optional Collapsible Research / Neuroscience Disclosure */}
        {hasDistinctScience && (
          <div>
            <button
              type="button"
              onClick={() => setScienceOpen((prev) => !prev)}
              aria-expanded={scienceOpen}
              data-testid="science-deep-dive-toggle"
              className="inline-flex min-h-[44px] items-center gap-2 bg-transparent border-0 py-2 text-[14px] font-semibold text-[var(--spruce)] cursor-pointer"
            >
              <span>Curious about the neuroscience behind this?</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  scienceOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </button>

            {scienceOpen && (
              <div
                data-testid="science-deep-dive-panel"
                className="mt-2 rounded-[12px] border border-[var(--hairline)] bg-[var(--elevated)] px-5 py-4 text-[14px] leading-[1.65] text-[var(--body)] almanac-rise-in"
              >
                {renderedScience}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
