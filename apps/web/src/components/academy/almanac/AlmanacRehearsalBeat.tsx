'use client';

import * as React from 'react';
import { ArrowRight, Bookmark, ChevronRight, MessageCircle } from 'lucide-react';
import type { AlmanacLessonPayload } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface AlmanacRehearsalBeatProps {
  payload: AlmanacLessonPayload;
  selectedInstinctId: string | null;
  skippedInstinct: boolean;
  activeAnnotationId: string | null;
  selectedPushbackId: string | null;
  savedPushbackIds: string[];
  onSelectInstinct: (instinctId: string) => void;
  onSkipInstinct: () => void;
  onToggleAnnotation: (annotationId: string) => void;
  onSelectPushback: (pushbackId: string) => void;
  onToggleSavePushback: (pushbackId: string) => void;
  onOpenAdvisor: () => void;
  childShortName?: string | null;
  isNarrating: boolean;
  t: (str: string) => string;
}

export function AlmanacRehearsalBeat({
  payload,
  selectedInstinctId,
  skippedInstinct,
  activeAnnotationId,
  selectedPushbackId,
  savedPushbackIds,
  onSelectInstinct,
  onSkipInstinct,
  onToggleAnnotation,
  onSelectPushback,
  onToggleSavePushback,
  onOpenAdvisor,
  childShortName,
  isNarrating,
  t,
}: AlmanacRehearsalBeatProps) {
  const activeInstinct = payload.instincts.find((i) => i.id === selectedInstinctId);
  const showReframe = Boolean(activeInstinct || skippedInstinct);

  const annotatedSegments = payload.calmScriptSegments.filter((seg) =>
    Boolean(seg.id && seg.note)
  );
  const activeAnnotation =
    annotatedSegments.find((seg) => seg.id === activeAnnotationId) ?? null;

  const activePushback =
    payload.pushbacks.find((pb) => pb.id === selectedPushbackId) ?? null;

  return (
    <section
      data-almanac-beat="2"
      data-testid="almanac-beat-3"
      aria-label="Beat 3: Practice"
      className="w-full bg-[var(--canvas)] px-4 sm:px-6 py-12 sm:py-16 scroll-mt-32 transition-colors duration-200"
    >
      <div
        className={cn(
          'relative mx-auto max-w-[700px]',
          isNarrating &&
            'before:absolute before:-left-4 before:top-1 before:bottom-1 before:w-[3px] before:rounded-full before:bg-[var(--spruce)]'
        )}
      >
        <span className="block text-[13px] font-semibold text-[var(--spruce)] mb-2">
          {t(payload.beat3Kicker)}
        </span>

        <h2 className="font-serif-almanac text-[26px] sm:text-[34px] font-semibold leading-[1.16] tracking-[-0.02em] text-[var(--ink)] mb-6">
          {t(payload.beat3Title)}
        </h2>

        {/* Rehearsal Stage Card */}
        <div className="overflow-hidden rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)] shadow-sm">
          {/* Warm Trigger Quote Header */}
          <div className="border-b border-[var(--hairline-soft)] bg-[var(--trigger-bg)] px-5 py-5 sm:px-7 sm:py-6">
            <span className="block text-[12px] font-semibold text-[var(--amber)] mb-1.5">
              {t(payload.rehearsalTriggerSpeaker)}
            </span>
            <p className="font-serif-almanac text-[21px] sm:text-[24px] font-medium leading-[1.34] text-[var(--ink)] m-0">
              {t(payload.rehearsalTriggerQuote)}
            </p>
          </div>

          {/* Interactive Rehearsal Body */}
          <div className="px-5 py-5 sm:px-7 sm:py-6">
            <p className="text-[14px] font-semibold text-[var(--ink)] mb-3.5">
              {t(payload.rehearsalPrompt)}
            </p>

            {/* 2 Zero-Shame Instinct Choices */}
            <div
              className="grid gap-2.5"
              role="group"
              aria-label="Honest parent instincts"
            >
              {payload.instincts.map((instinct) => {
                const isPressed = instinct.id === selectedInstinctId;
                return (
                  <button
                    key={instinct.id}
                    type="button"
                    onClick={() => onSelectInstinct(instinct.id)}
                    aria-pressed={isPressed}
                    data-testid={`instinct-btn-${instinct.id}`}
                    className={cn(
                      'flex min-h-[52px] w-full items-center justify-between gap-3.5 rounded-[12px] border px-4 py-3.5 text-left text-[15px] leading-[1.45] text-[var(--ink)] transition-all cursor-pointer',
                      isPressed
                        ? 'border-[var(--amber-border)] bg-[var(--amber-soft)]'
                        : 'border-[var(--hairline)] bg-[var(--canvas)] hover:border-[var(--spruce-border)] hover:bg-[var(--canvas-subtle)]'
                    )}
                  >
                    <span>{t(instinct.label)}</span>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-[var(--mute)]"
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            {/* Quiet Skip Hatch */}
            {!showReframe && (
              <button
                type="button"
                onClick={onSkipInstinct}
                data-testid="skip-instinct-btn"
                className="mt-2.5 inline-flex min-h-[44px] items-center gap-1.5 bg-transparent border-0 px-0.5 py-2 text-[13px] font-medium text-[var(--mute)] transition-colors hover:text-[var(--spruce)] cursor-pointer"
              >
                <span>Neither sounds like me — jump straight to the calm reframe</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}

            {/* Revealed Calm Reframe + Annotated Script + Pushback Recovery */}
            {showReframe && (
              <div
                data-testid="reframe-reveal-panel"
                className="mt-5 pt-5 border-t border-[var(--hairline-soft)] almanac-rise-in"
              >
                {/* Empathetic Why-That's-Tempting Box (only when an instinct was picked) */}
                {activeInstinct && (
                  <div className="mb-4 rounded-[12px] bg-[var(--canvas-subtle)] px-4 py-4 text-[14px] leading-[1.62] text-[var(--body)]">
                    <strong className="block text-[13px] font-semibold text-[var(--ink)] mb-1">
                      {t(activeInstinct.whyTitle)}
                    </strong>
                    <span>{t(activeInstinct.whyText)}</span>
                  </div>
                )}

                {/* Annotated Calm Script Card (Zero 6s tone preview button — audio lives in Read | Listen) */}
                <div className="rounded-[14px] border border-[var(--spruce-border)] bg-[var(--spruce-soft)] px-5 py-5 sm:px-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[12px] font-semibold text-[var(--spruce)]">
                      Try this instead
                    </span>
                    {annotatedSegments.length > 0 && (
                      <span className="text-[12px] text-[var(--mute)]">
                        Tap underlined phrases to see why
                      </span>
                    )}
                  </div>

                  <p
                    data-testid="annotated-calm-script"
                    className="font-serif-almanac text-[20px] sm:text-[22.5px] leading-[1.55] text-[var(--ink)] mb-3.5"
                  >
                    {payload.calmScriptSegments.map((seg, idx) => {
                      if (seg.id && seg.note) {
                        const isPressed = seg.id === activeAnnotationId;
                        return (
                          <button
                            key={seg.id}
                            type="button"
                            onClick={() => onToggleAnnotation(seg.id!)}
                            aria-pressed={isPressed}
                            data-testid={`script-annot-${seg.id}`}
                            className={cn(
                              'inline font-serif-almanac text-left rounded-[4px] border-0 px-1 py-0.5 transition-all cursor-pointer',
                              isPressed
                                ? 'bg-[var(--spruce)] text-[var(--elevated)] border-b-transparent'
                                : 'bg-[var(--elevated)] text-[var(--ink)] border-b-[1.5px] border-dashed border-[var(--spruce)] hover:bg-[var(--canvas)]'
                            )}
                          >
                            {t(seg.text)}
                          </button>
                        );
                      }
                      return (
                        <React.Fragment key={idx}>
                          {t(seg.text)}
                        </React.Fragment>
                      );
                    })}
                  </p>

                  {/* 1-Line Coaching Badge for Tapped Script Phrase */}
                  {activeAnnotation && (
                    <div
                      key={activeAnnotation.id}
                      data-testid="script-annotation-callout"
                      className="mb-4 flex items-start gap-2.5 rounded-[10px] border border-[var(--spruce-border)] bg-[var(--elevated)] px-3.5 py-3 text-[13.5px] leading-[1.55] text-[var(--body)] almanac-rise-in"
                    >
                      {activeAnnotation.tag && (
                        <span className="mt-0.5 shrink-0 rounded-[6px] bg-[var(--spruce-soft)] px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase text-[var(--spruce)]">
                          {t(activeAnnotation.tag)}
                        </span>
                      )}
                      <span>{t(activeAnnotation.note ?? '')}</span>
                    </div>
                  )}

                  {/* Subtle Delivery Cues */}
                  {payload.deliveryCues.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {payload.deliveryCues.map((cue, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-[var(--spruce-border)] bg-[var(--elevated)] px-3 py-1 text-[12px] font-medium text-[var(--spruce)]"
                        >
                          {t(cue)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pushback Chips + Save Phrase to Pocket Card */}
                {payload.pushbacks.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-[var(--hairline-soft)]">
                    <p className="text-[13px] font-semibold text-[var(--ink)] mb-3">
                      What if {t('{pronoun}')} {t('{pushes}')} back?
                    </p>

                    <div
                      className="flex flex-wrap gap-2 mb-3.5"
                      role="group"
                      aria-label="Common pushback scenarios"
                    >
                      {payload.pushbacks.map((pb) => {
                        const isSelected = pb.id === selectedPushbackId;
                        const isSaved = savedPushbackIds.includes(pb.id);
                        return (
                          <button
                            key={pb.id}
                            type="button"
                            onClick={() => onSelectPushback(pb.id)}
                            aria-pressed={isSelected}
                            data-testid={`pushback-chip-${pb.id}`}
                            className={cn(
                              'min-h-[44px] rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all cursor-pointer',
                              isSelected
                                ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--canvas)]'
                                : 'border-[var(--hairline)] bg-[var(--canvas-subtle)] text-[var(--body)] hover:border-[var(--spruce-border)] hover:text-[var(--ink)]'
                            )}
                          >
                            <span>{t(pb.label)}</span>
                            {isSaved && (
                              <span className="ml-1.5 font-mono text-[10.5px] opacity-80">
                                · Saved
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {activePushback && (
                      <div
                        key={activePushback.id}
                        data-testid="pushback-answer-box"
                        className="rounded-[12px] bg-[var(--canvas-subtle)] px-4 py-4 text-[14.5px] leading-[1.6] text-[var(--ink)] almanac-rise-in"
                      >
                        <p className="m-0 text-[var(--body)]">
                          {t(activePushback.setup)}
                        </p>
                        <em className="mt-2 block font-serif-almanac italic text-[17.5px] text-[var(--spruce)]">
                          {t(activePushback.script)}
                        </em>

                        <div className="mt-3 flex justify-end">
                          <button
                            type="button"
                            onClick={() => onToggleSavePushback(activePushback.id)}
                            aria-pressed={savedPushbackIds.includes(activePushback.id)}
                            data-testid="save-pushback-btn"
                            className={cn(
                              'inline-flex min-h-[38px] items-center gap-1.5 rounded-full border px-3 text-[12px] transition-all cursor-pointer',
                              savedPushbackIds.includes(activePushback.id)
                                ? 'border-[var(--spruce-border)] bg-[var(--spruce-soft)] font-semibold text-[var(--spruce)]'
                                : 'border-[var(--hairline)] bg-[var(--elevated)] font-medium text-[var(--mute)] hover:border-[var(--spruce-border)] hover:text-[var(--ink)]'
                            )}
                          >
                            <Bookmark
                              className={cn(
                                'h-3.5 w-3.5',
                                savedPushbackIds.includes(activePushback.id) &&
                                  'fill-current'
                              )}
                              aria-hidden="true"
                            />
                            <span>
                              {savedPushbackIds.includes(activePushback.id)
                                ? 'Saved to Pocket Card'
                                : 'Add phrase to Pocket Card'}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quiet Contextual AI Advisor Bridge (Zero urgency drawer at top — right where questions arise) */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[12px] bg-[var(--canvas-subtle)] px-4 py-3.5">
          <span className="text-[13.5px] text-[var(--body)]">
            Need help adapting this for tonight’s exact situation?
          </span>
          <button
            type="button"
            onClick={onOpenAdvisor}
            data-testid="almanac-advisor-bridge-btn"
            className="inline-flex min-h-[44px] items-center gap-1.5 bg-transparent border-0 px-1 py-1.5 text-[13.5px] font-semibold text-[var(--spruce)] hover:underline whitespace-nowrap cursor-pointer"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>
              Ask AI Advisor{childShortName ? ` about ${childShortName}` : ''}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
