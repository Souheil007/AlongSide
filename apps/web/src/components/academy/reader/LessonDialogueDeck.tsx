'use client';

import * as React from 'react';
import {
  MessageSquare,
  XCircle,
  CheckCircle,
  Copy,
  Check,
  Bookmark,
  Mic,
} from 'lucide-react';
import type { DialogueCardItem } from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface LessonDialogueDeckProps {
  cards?: DialogueCardItem[];
  whatNotToSay?: string;
  deliveryTip?: string;
  isNightstandMode?: boolean;
  className?: string;
}

export function LessonDialogueDeck({
  cards,
  whatNotToSay,
  deliveryTip,
  isNightstandMode = false,
  className,
}: LessonDialogueDeckProps) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const [savedIndex, setSavedIndex] = React.useState<number | null>(null);

  const effectiveCards: DialogueCardItem[] =
    cards && cards.length > 0
      ? cards
      : [
          {
            instinctiveMistake:
              whatNotToSay ||
              'Stop crying right now! You are making a huge deal out of nothing!',
            whyItBackfires:
              'Shames the child’s somatic experience and signals that emotional storms make parents anxious or unsafe.',
            empatheticScript:
              'Your body feels so big and stormy right now. It is really hard when things do not go the way you wanted. I am right here with you. You are completely safe.',
            deliveryTip:
              deliveryTip ||
              'Drop voice volume and pitch 2 octaves. Sit 3 feet away at eye level. Relax your shoulders.',
          },
        ];

  const handleCopy = (text: string, index: number) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    }
  };

  const handleSaveToVault = (index: number) => {
    setSavedIndex(index);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const existing = JSON.parse(
          window.localStorage.getItem('alongside-script-vault') || '[]'
        );
        existing.push({
          script: effectiveCards[index]?.empatheticScript,
          savedAt: new Date().toISOString(),
        });
        window.localStorage.setItem(
          'alongside-script-vault',
          JSON.stringify(existing)
        );
      } catch {
        // silent fallback
      }
    }
    setTimeout(() => setSavedIndex(null), 2500);
  };

  return (
    <section
      data-testid="dialogue-deck"
      aria-label="Comparative Dialogue Deck: Say This / Not That"
      className={cn('space-y-4 my-8', className)}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-teal-600 text-white">
          <MessageSquare className="h-3.5 w-3.5" />
        </span>
        <span>Interactive Dialogue Deck · Say This, Not That</span>
      </div>

      <div className="space-y-6">
        {effectiveCards.map((card, idx) => (
          <div
            key={`dialogue-${idx}`}
            className={cn(
              'rounded-2xl border p-5 sm:p-6 space-y-5 transition-colors shadow-xs',
              isNightstandMode
                ? 'bg-stone-900 border-stone-800 text-stone-200'
                : 'bg-white border-slate-200/90 text-slate-800'
            )}
          >
            {/* Grid comparing instinctive mistake vs empathetic script */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 🛑 Left Column: What We Instinctively Say */}
              <div className="rounded-xl border border-rose-200/80 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900/60 p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400">
                  <XCircle className="h-4 w-4 text-rose-600" />
                  <span>What We Instinctively Say (Why It Fails)</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-rose-900 dark:text-rose-200 line-through decoration-rose-400">
                  &ldquo;{card.instinctiveMistake}&rdquo;
                </p>
                <p className="text-xs text-rose-700 dark:text-rose-300/80 leading-relaxed pt-1 border-t border-rose-200/60 dark:border-rose-900/40">
                  <strong>Why it escalates:</strong> {card.whyItBackfires}
                </p>
              </div>

              {/* ✅ Right Column: Alongside Empathetic Script */}
              <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/20 dark:border-emerald-800 p-4 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Alongside Empathetic Script</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-emerald-100 leading-relaxed font-serif text-[15px]">
                    &ldquo;{card.empatheticScript}&rdquo;
                  </p>
                </div>

                {/* 1-Click Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-200/60 dark:border-emerald-900/40">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(card.empatheticScript, idx)}
                    data-testid="copy-script-btn"
                    className="h-8 gap-1.5 text-xs font-semibold bg-white dark:bg-stone-800 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSaveToVault(idx)}
                    className="h-8 gap-1 text-xs text-slate-600 dark:text-stone-300 hover:text-emerald-700"
                  >
                    {savedIndex === idx ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Saved to Vault!</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-3.5 w-3.5" />
                        <span>Save to Vault</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* 🎙️ Delivery Coaching Tip */}
            {card.deliveryTip && (
              <div className="flex items-start gap-2.5 rounded-lg border border-slate-200/70 bg-slate-50/80 dark:bg-stone-800/60 dark:border-stone-700 p-3 text-xs leading-relaxed text-slate-700 dark:text-stone-300">
                <Mic className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-stone-100 font-semibold block mb-0.5">
                    Vocal &amp; Physical Delivery Tip:
                  </strong>
                  <span>{card.deliveryTip}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
