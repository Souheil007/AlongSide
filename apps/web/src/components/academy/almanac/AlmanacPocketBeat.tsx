'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bookmark, Check, Share2 } from 'lucide-react';
import type {
  AcademyLessonSummaryDTO,
  AlmanacLessonPayload,
  MasterVideoLectureDTO,
} from '@alongside/shared';
import { AlmanacVideoShelf } from './AlmanacVideoShelf';
import { cn } from '@/lib/utils';

export interface AlmanacPocketBeatProps {
  payload: AlmanacLessonPayload;
  moduleSlug: string;
  chosenMoveId: string | null;
  bookmarkedTruth: boolean;
  savedPushbackIds: string[];
  isCompleted: boolean;
  isSaving: boolean;
  saveError: string | null;
  onSealAndSave: () => void;
  onOpenShareModal: () => void;
  videoLecture?: MasterVideoLectureDTO | null;
  nextLesson?: AcademyLessonSummaryDTO | null;
  prevLesson?: AcademyLessonSummaryDTO | null;
  childPossessive?: string | null;
  isNarrating: boolean;
  t: (str: string) => string;
}

export function AlmanacPocketBeat({
  payload,
  moduleSlug,
  chosenMoveId,
  bookmarkedTruth,
  savedPushbackIds,
  isCompleted,
  isSaving,
  saveError,
  onSealAndSave,
  onOpenShareModal,
  videoLecture,
  nextLesson,
  prevLesson,
  childPossessive,
  isNarrating,
  t,
}: AlmanacPocketBeatProps) {
  const chosenMove =
    payload.moves.find((m) => m.id === chosenMoveId) ?? null;

  const savedPushbacks = payload.pushbacks.filter((pb) =>
    savedPushbackIds.includes(pb.id)
  );

  const playbookOwner = childPossessive ? `${childPossessive} Playbook` : 'Your Playbook';

  return (
    <section
      data-almanac-beat="4"
      data-testid="almanac-beat-5"
      aria-label="Beat 5: Pocket Card"
      className="w-full bg-[var(--canvas)] px-4 sm:px-6 pt-12 pb-20 sm:pt-16 sm:pb-28 scroll-mt-32 transition-colors duration-200"
    >
      <div
        className={cn(
          'relative mx-auto max-w-[700px]',
          isNarrating &&
            'before:absolute before:-left-4 before:top-1 before:bottom-1 before:w-[3px] before:rounded-full before:bg-[var(--spruce)]'
        )}
      >
        {/* Warm Closing Note for the Parent */}
        <p className="font-serif-almanac text-[20px] sm:text-[22px] leading-[1.54] text-[var(--ink)] max-w-[56ch] mb-8">
          {t(payload.closingNote)}
        </p>

        {/* Unified Live-Building Almanac Pocket Card */}
        <div
          data-testid="almanac-pocket-card"
          className={cn(
            'relative overflow-hidden rounded-[18px] border bg-[var(--elevated)] p-6 sm:p-7 mb-9 transition-all duration-200',
            isCompleted
              ? 'border-[var(--spruce)] shadow-md'
              : 'border-[var(--hairline)] shadow-sm'
          )}
        >
          {/* Card Header + Almanac Seal Stamp */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hairline-soft)] pb-3.5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--spruce)]">
              Your Pocket Card
            </span>

            <span
              data-testid="almanac-pocket-seal"
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold transition-all',
                isCompleted
                  ? 'border border-[var(--spruce-border)] bg-[var(--spruce-soft)] text-[var(--spruce)]'
                  : 'border border-dashed border-[var(--hairline)] text-[var(--mute)]'
              )}
            >
              {isCompleted && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              <span>{isCompleted ? 'SAVED · ALMANAC' : 'LIVE DRAFT'}</span>
            </span>
          </div>

          {/* Card Body */}
          <div className="grid gap-4 mb-6">
            <div>
              <span className="block text-[12px] font-semibold text-[var(--mute)] mb-1">
                Remember tonight
              </span>
              <p className="text-[15px] leading-[1.56] text-[var(--ink)] m-0">
                {t(payload.pocketInsight)}
              </p>
            </div>

            <div>
              <span className="block text-[12px] font-semibold text-[var(--mute)] mb-1">
                Your calm phrase
              </span>
              <p className="font-serif-almanac italic text-[18px] sm:text-[18.5px] leading-[1.5] text-[var(--spruce)] m-0">
                {t(payload.calmScriptPlain)}
              </p>
            </div>

            <div data-testid="pocket-card-chosen-move">
              <span className="block text-[12px] font-semibold text-[var(--mute)] mb-1">
                Tonight’s chosen move
              </span>
              {chosenMove ? (
                <p className="text-[15px] font-medium leading-[1.55] text-[var(--ink)] m-0">
                  {t(chosenMove.title)}
                </p>
              ) : (
                <p className="text-[14px] italic text-[var(--mute)] m-0">
                  Tap one of the three gentle moves above — or seal now to default to our lightest first step.
                </p>
              )}
            </div>

            {/* Bookmarked Key Idea (Beat 2 -> Beat 5 bridge) */}
            {bookmarkedTruth && (
              <div
                data-testid="pocket-bookmarked-truth"
                className="rounded-[12px] border border-[var(--amber-border)] bg-[var(--amber-soft)] px-4 py-3 almanac-rise-in"
              >
                <span className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[var(--amber)] mb-1">
                  <Bookmark className="h-3 w-3 fill-current" aria-hidden="true" />
                  <span>Saved Key Idea</span>
                </span>
                <p className="font-serif-almanac italic text-[15.5px] leading-snug text-[var(--ink)] m-0">
                  {t(payload.almanacTruth)}
                </p>
              </div>
            )}

            {/* Saved Pushback Phrases (Beat 3 -> Beat 5 bridge) */}
            {savedPushbacks.length > 0 && (
              <div
                data-testid="pocket-saved-pushbacks"
                className="rounded-[12px] border border-[var(--spruce-border)] bg-[var(--spruce-soft)] px-4 py-3 space-y-2 almanac-rise-in"
              >
                <span className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[var(--spruce)]">
                  <Bookmark className="h-3 w-3 fill-current" aria-hidden="true" />
                  <span>
                    Saved Backup Phrase{savedPushbacks.length > 1 ? 's' : ''}
                  </span>
                </span>
                {savedPushbacks.map((pb) => (
                  <p
                    key={pb.id}
                    className="font-serif-almanac italic text-[15.5px] leading-snug text-[var(--ink)] m-0"
                  >
                    {t(pb.script)}
                  </p>
                ))}
              </div>
            )}
          </div>

          {saveError && (
            <p
              role="alert"
              className="mb-4 rounded-[10px] border border-[var(--amber-border)] bg-[var(--amber-soft)] px-3.5 py-2.5 text-[13px] text-[var(--amber)]"
            >
              {saveError}
            </p>
          )}

          {/* Unified Action Row: Single Primary Seal CTA + Secondary 20s Partner Share */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--hairline-soft)] pt-4">
            <button
              type="button"
              onClick={onSealAndSave}
              disabled={isSaving}
              data-testid="seal-pocket-card-btn"
              className={cn(
                'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border px-6 py-3 text-[14px] font-semibold transition-all duration-150 cursor-pointer disabled:opacity-60',
                isCompleted
                  ? 'border-[var(--spruce)] bg-[var(--spruce)] text-[var(--elevated)]'
                  : 'border-[var(--ink)] bg-[var(--ink)] text-[var(--canvas)] hover:-translate-y-px hover:shadow-md'
              )}
            >
              {isCompleted ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>Saved to {playbookOwner}</span>
                </>
              ) : isSaving ? (
                <span>Sealing Pocket Card…</span>
              ) : (
                <span>Seal &amp; Save to {playbookOwner}</span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenShareModal}
              data-testid="share-partner-btn"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--elevated)] px-4 py-2.5 text-[14px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--spruce-border)] cursor-pointer"
            >
              <Share2 className="h-4 w-4 text-[var(--spruce)]" aria-hidden="true" />
              <span>Share with Partner (20s)</span>
            </button>
          </div>
        </div>

        {/* Bottom-Only Master Talk Shelf (Strictly BELOW Pocket Card) */}
        {videoLecture && (
          <AlmanacVideoShelf
            video={videoLecture}
            t={t}
            className="mb-9"
          />
        )}

        {/* Up Next Curiosity Cliffhanger Card (or Course Arc return on final episode) */}
        {nextLesson ? (
          <Link
            href={`/academy/${moduleSlug}/${nextLesson.slug}`}
            data-testid="almanac-next-episode-card"
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[16px] border border-[var(--hairline)] bg-[var(--canvas-subtle)] px-6 py-6 sm:px-7 transition-all duration-200 hover:border-[var(--spruce)] hover:bg-[var(--elevated)] hover:-translate-y-0.5 hover:shadow-md no-underline"
          >
            <div className="min-w-0">
              <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--spruce)] mb-2">
                {payload.nextEpisodeHook?.kicker
                  ? t(payload.nextEpisodeHook.kicker)
                  : `Up Next · Episode ${nextLesson.sortOrder} · ${nextLesson.readingMinutes || 3} min`}
              </span>
              {payload.nextEpisodeHook?.mystery && (
                <p className="font-serif-almanac italic text-[19px] sm:text-[20px] leading-[1.38] text-[var(--ink)] mb-2">
                  {t(payload.nextEpisodeHook.mystery)}
                </p>
              )}
              <p className="text-[14px] font-semibold text-[var(--body)] m-0">
                {t(payload.nextEpisodeHook?.title || nextLesson.title)}
              </p>
            </div>

            <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--elevated)] text-[var(--spruce)] transition-all duration-200 group-hover:translate-x-1 group-hover:border-[var(--spruce)] group-hover:bg-[var(--spruce)] group-hover:text-[var(--elevated)]">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ) : (
          <Link
            href={`/academy/${moduleSlug}`}
            data-testid="almanac-course-complete-card"
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[16px] border border-[var(--hairline)] bg-[var(--canvas-subtle)] px-6 py-6 sm:px-7 transition-all duration-200 hover:border-[var(--spruce)] hover:bg-[var(--elevated)] hover:-translate-y-0.5 hover:shadow-md no-underline"
          >
            <div className="min-w-0">
              <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--spruce)] mb-2">
                Final Episode Reached
              </span>
              <p className="font-serif-almanac italic text-[19px] sm:text-[20px] leading-[1.38] text-[var(--ink)] mb-1.5">
                Every Pocket Card you sealed stays waiting inside this course whenever you need a calm refresher.
              </p>
              <p className="text-[14px] font-semibold text-[var(--body)] m-0">
                Return to Course Episode Arc
              </p>
            </div>

            <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--elevated)] text-[var(--spruce)] transition-all duration-200 group-hover:translate-x-1 group-hover:border-[var(--spruce)] group-hover:bg-[var(--spruce)] group-hover:text-[var(--elevated)]">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        )}

        {/* Quiet Previous Episode Link */}
        {prevLesson && (
          <div className="mt-6 flex justify-start">
            <Link
              href={`/academy/${moduleSlug}/${prevLesson.slug}`}
              className="inline-flex min-h-[44px] items-center gap-2 text-[13px] font-medium text-[var(--mute)] transition-colors hover:text-[var(--ink)] no-underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                Previous: Episode {prevLesson.sortOrder} · {t(prevLesson.title)}
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
