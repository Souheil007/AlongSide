'use client';

import * as React from 'react';
import { Bookmark, ChevronDown } from 'lucide-react';
import {
  isSlangEligibleTier,
  type DevelopmentalTier,
  type DigestDinnerPromptDTO,
  type DigestPhraseDTO,
} from '@alongside/shared';
import { WeeklyPhrasesStrip } from './WeeklyPhrasesStrip';
import { cn } from '@/lib/utils';

export interface SundayTableCloserBandProps {
  issueNumber: number | null;
  tier: DevelopmentalTier;
  shortAges: string;
  childName: string;
  dinnerPrompts: DigestDinnerPromptDTO[];
  dinnerPromptIndex: number;
  dinnerNotesOpen: boolean;
  phrases: DigestPhraseDTO[];
  expandedPhraseIndex: number | null;
  onNextPrompt: () => void;
  onToggleNotes: () => void;
  onCopyQuestion: (question: string) => void;
  onShareWithPartner: (question: string) => void;
  onToggleSaveDinner: (prompt: DigestDinnerPromptDTO) => void;
  onTogglePhrase: (index: number) => void;
  onAskAdvisor: (prompt: string) => void;
}

export function SundayTableCloserBand({
  issueNumber,
  tier,
  shortAges,
  childName,
  dinnerPrompts,
  dinnerPromptIndex,
  dinnerNotesOpen,
  phrases,
  expandedPhraseIndex,
  onNextPrompt,
  onToggleNotes,
  onCopyQuestion,
  onShareWithPartner,
  onToggleSaveDinner,
  onTogglePhrase,
  onAskAdvisor,
}: SundayTableCloserBandProps) {
  const showPhrases = isSlangEligibleTier(tier) && phrases.length > 0;
  const activePrompt =
    dinnerPrompts.length > 0
      ? dinnerPrompts[dinnerPromptIndex % dinnerPrompts.length]!
      : null;

  if (!activePrompt && !showPhrases) {
    return null;
  }

  return (
    <section
      aria-label="Sunday dinner closer"
      data-testid="sunday-table-closer-band"
      className="flex flex-col gap-5 border-t border-[#131715]/10 pt-9 sm:pt-10"
    >
      {activePrompt && (
        <div
          data-testid="dinner-closer-card"
          className="flex flex-col gap-4 rounded-[14px] bg-[#10251C] p-6 sm:p-9 text-[#FAF9F5]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#FAF9F5]/75 tabular-nums">
            <span>
              Tonight&apos;s dinner question
              {issueNumber !== null ? ` · Issue #${issueNumber}` : ''}
            </span>
            <span>
              {(dinnerPromptIndex % dinnerPrompts.length) + 1} of {dinnerPrompts.length}
            </span>
          </div>

          <div className="grid max-w-[38ch]">
            {dinnerPrompts.map((prompt, idx) => {
              const isCurrent = idx === dinnerPromptIndex % dinnerPrompts.length;
              return (
                <p
                  key={prompt.id}
                  data-testid={isCurrent ? 'dinner-closer-question' : undefined}
                  aria-hidden={!isCurrent || undefined}
                  className={cn(
                    'col-start-1 row-start-1 font-serif text-[23px] sm:text-[30px] font-normal leading-[1.28] tracking-[-0.015em] text-[#FAF9F5]',
                    !isCurrent && 'invisible pointer-events-none select-none'
                  )}
                >
                  &ldquo;{prompt.question}&rdquo;
                </p>
              );
            })}
          </div>

          <div>
            <button
              type="button"
              aria-expanded={dinnerNotesOpen}
              data-testid="dinner-note-toggle"
              onClick={onToggleNotes}
              className="inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] font-medium text-[#FAF9F5]/85 transition-colors hover:text-[#FAF9F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF9F5] rounded-[6px]"
            >
              <span>Parent note &amp; follow-up</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  dinnerNotesOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </button>

            {dinnerNotesOpen && (
              <div
                data-testid="dinner-notes-panel"
                className="mt-2 grid max-w-[68ch] rounded-[9px] border border-[#FAF9F5]/15 bg-[#173327] px-4 py-3.5 text-[13.5px] leading-[1.55] text-[#FAF9F5]/90"
              >
                {dinnerPrompts.map((prompt, idx) => {
                  const isCurrent = idx === dinnerPromptIndex % dinnerPrompts.length;
                  return (
                    <div
                      key={prompt.id}
                      aria-hidden={!isCurrent || undefined}
                      className={cn(
                        'col-start-1 row-start-1 flex flex-col gap-2',
                        !isCurrent && 'invisible pointer-events-none select-none'
                      )}
                    >
                      <div>
                        <span className="font-medium text-[#FAF9F5]/70">Parent note: </span>
                        <span>{prompt.parentTip}</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#FAF9F5]/70">Follow-up: </span>
                        <span>&ldquo;{prompt.followUp}&rdquo;</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#FAF9F5]/15 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                data-testid="dinner-copy-btn"
                onClick={() => onCopyQuestion(activePrompt.question)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] bg-[#FAF9F5] px-4 text-[13.5px] font-semibold text-[#10251C] transition-colors hover:bg-[#ECEAE2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF9F5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10251C]"
              >
                Copy question
              </button>

              {dinnerPrompts.length > 1 && (
                <button
                  type="button"
                  data-testid="dinner-next-btn"
                  onClick={onNextPrompt}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] border border-[#FAF9F5]/20 px-3.5 text-[13.5px] font-medium text-[#FAF9F5]/95 transition-colors hover:bg-[#173327] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF9F5]"
                >
                  Next prompt
                </button>
              )}

              <button
                type="button"
                data-testid="dinner-share-btn"
                onClick={() => onShareWithPartner(activePrompt.question)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] border border-[#FAF9F5]/20 px-3.5 text-[13.5px] font-medium text-[#FAF9F5]/95 transition-colors hover:bg-[#173327] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF9F5]"
              >
                Text partner
              </button>
            </div>

            <button
              type="button"
              data-testid="dinner-save-btn"
              onClick={() => onToggleSaveDinner(activePrompt)}
              aria-pressed={activePrompt.isSaved}
              aria-label={
                activePrompt.isSaved
                  ? 'Remove dinner question from Saved'
                  : 'Save dinner question'
              }
              title={activePrompt.isSaved ? 'Saved for Sunday' : 'Save for Sunday'}
              className={cn(
                'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF9F5]',
                activePrompt.isSaved
                  ? 'border-[#E6F0EB]/50 bg-[#E6F0EB]/20 text-[#FAF9F5]'
                  : 'border-[#FAF9F5]/20 text-[#FAF9F5]/80 hover:bg-[#173327] hover:text-[#FAF9F5]'
              )}
            >
              <Bookmark
                className={cn('h-4 w-4', activePrompt.isSaved && 'fill-current')}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      )}

      {/* Strictly Ages 7–18 ONLY - omitted from DOM for ages 0–6 */}
      {showPhrases && (
        <WeeklyPhrasesStrip
          tier={tier}
          shortAges={shortAges}
          childName={childName}
          phrases={phrases}
          expandedIndex={expandedPhraseIndex}
          onTogglePhrase={onTogglePhrase}
          onAskAdvisor={onAskAdvisor}
        />
      )}
    </section>
  );
}
