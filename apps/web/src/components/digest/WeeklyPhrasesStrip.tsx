'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  isSlangEligibleTier,
  type DevelopmentalTier,
  type DigestPhraseDTO,
} from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface WeeklyPhrasesStripProps {
  tier: DevelopmentalTier;
  shortAges: string;
  childName: string;
  phrases: DigestPhraseDTO[];
  expandedIndex: number | null;
  onTogglePhrase: (index: number) => void;
  onAskAdvisor: (prompt: string) => void;
}

export function WeeklyPhrasesStrip({
  tier,
  shortAges,
  childName,
  phrases,
  expandedIndex,
  onTogglePhrase,
  onAskAdvisor,
}: WeeklyPhrasesStripProps) {
  // Strictly Ages 7–18 ONLY; completely omitted from DOM for ages 0–6!
  if (!isSlangEligibleTier(tier) || phrases.length === 0) {
    return null;
  }

  const visiblePhrases = phrases.slice(0, 3);
  const activePhrase =
    expandedIndex !== null ? (visiblePhrases[expandedIndex] ?? null) : null;

  return (
    <div
      data-testid="weekly-phrases-strip"
      className="flex flex-col gap-3.5 rounded-[12px] bg-[#F3F1EA] p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <h3 className="text-[14px] font-semibold text-[#131715]">
            3 phrases going around this week
          </h3>
          <span className="text-[12.5px] text-[#59625D]">
            {shortAges} · Tap any phrase for calm phrasing
          </span>
        </div>

        <button
          type="button"
          data-testid="phrases-ask-advisor-btn"
          onClick={() =>
            onAskAdvisor(
              `Help me calmly decode a phrase ${childName} said today and how to respond without making it awkward.`
            )
          }
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[13px] font-medium text-[#143D2B] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px] px-1"
        >
          <span>Heard another word? Ask AI Advisor</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {visiblePhrases.map((phrase, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <button
              key={phrase.id}
              type="button"
              aria-expanded={isExpanded}
              data-testid={`phrase-tile-${idx}`}
              onClick={() => onTogglePhrase(idx)}
              className={cn(
                'flex min-h-[68px] flex-col justify-center gap-0.5 rounded-[9px] border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                isExpanded
                  ? 'border-[#143D2B] bg-[#E6F0EB]'
                  : 'border-[#131715]/10 bg-white hover:border-[#131715]/25'
              )}
            >
              <span className="font-serif text-[18px] font-medium text-[#131715]">
                {phrase.word}
              </span>
              <span className="text-[13px] text-[#3E4642]">{phrase.shortMeaning}</span>
            </button>
          );
        })}
      </div>

      {activePhrase && (
        <div
          data-testid="phrase-expanded-panel"
          className="grid rounded-[9px] border border-[#131715]/10 bg-white p-4 sm:px-5"
        >
          {visiblePhrases.map((phrase, idx) => {
            const isCurrent = idx === expandedIndex;
            return (
              <div
                key={phrase.id}
                aria-hidden={!isCurrent || undefined}
                className={cn(
                  'col-start-1 row-start-1 grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-6',
                  !isCurrent && 'invisible pointer-events-none select-none'
                )}
              >
                <div className="space-y-2">
                  <p className="text-[13.5px] leading-[1.55] text-[#3E4642]">
                    {phrase.fullMeaning}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 text-[12px] text-[#59625D]">
                    <span>Parent-use gauge: {phrase.cringeLabel}</span>
                    <span
                      data-testid={isCurrent ? 'phrase-cringe-gauge' : undefined}
                      className="inline-flex items-center gap-1"
                      aria-label={`Parent-use gauge ${Math.min(3, Math.max(1, phrase.cringeLevel))} of 3`}
                    >
                      {[1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          data-testid={isCurrent ? `phrase-gauge-dot-${dot}` : undefined}
                          className={cn(
                            'h-[7px] w-[7px] rounded-full',
                            dot <= Math.min(3, Math.max(1, phrase.cringeLevel))
                              ? 'bg-[#143D2B]'
                              : 'bg-[#131715]/15'
                          )}
                        />
                      ))}
                    </span>
                  </div>
                </div>

                <div className="rounded-[8px] bg-[#E6F0EB] px-3.5 py-3 text-[13.5px] font-medium leading-[1.5] text-[#10251C]">
                  {phrase.calmScript}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
