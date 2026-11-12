'use client';

import * as React from 'react';
import {
  MessageSquare,
  XCircle,
  CheckCircle,
  Mic,
} from 'lucide-react';
import type { DialogueCardItem } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface LessonDialogueDeckProps {
  cards?: DialogueCardItem[];
  whatNotToSay?: string;
  deliveryTip?: string;
  isNightstandMode?: boolean;
  className?: string;
}

/**
 * Unified Interactive Dialogue Deck container.
 * Features:
 * - All dialogue comparisons wrapped together inside a single authoritative card
 * - Clean side-by-side contrast between instinctive reactions and empathetic scripts
 * - Minimal, quiet aesthetic without redundant copy/vault buttons
 * - Single consolidated Vocal & Physical Delivery Tip at the bottom of all dialogues (only if a relevant tip exists)
 */
export function LessonDialogueDeck({
  cards,
  whatNotToSay,
  deliveryTip,
  isNightstandMode = false,
  className,
}: LessonDialogueDeckProps) {
  const effectiveCards: DialogueCardItem[] = React.useMemo(() => {
    if (cards && cards.length > 0) return cards;
    return [
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
  }, [cards, whatNotToSay, deliveryTip]);

  // Consolidate delivery tip: show once at the end of all dialogues only if a relevant tip exists
  const effectiveDeliveryTip = React.useMemo(() => {
    if (deliveryTip && deliveryTip.trim().length > 0) {
      return deliveryTip.trim();
    }
    const cardWithTip = effectiveCards.find(
      (c) => c.deliveryTip && c.deliveryTip.trim().length > 0
    );
    return cardWithTip?.deliveryTip?.trim() || null;
  }, [deliveryTip, effectiveCards]);

  return (
    <section
      data-testid="dialogue-deck"
      aria-label="Comparative Dialogue Deck: Say This / Not That"
      className={cn(
        'rounded-2xl border p-5 sm:p-7 space-y-6 shadow-xs my-8 transition-colors',
        isNightstandMode
          ? 'bg-stone-900 border-stone-800 text-stone-200'
          : 'bg-white border-slate-200/90 text-slate-800',
        className
      )}
    >
      {/* Container Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-teal-600 text-white">
            <MessageSquare className="h-3.5 w-3.5" />
          </span>
          <span>Interactive Dialogue Deck · Say This, Not That</span>
        </div>
        <span className="text-[11px] font-mono font-medium text-stone-600 dark:text-stone-300">
          {effectiveCards.length} {effectiveCards.length === 1 ? 'Practice Dialogue' : 'Practice Dialogues'}
        </span>
      </div>

      {/* Unified List of Dialogue Comparisons */}
      <div className="space-y-6">
        {effectiveCards.map((card, idx) => (
          <div
            key={`dialogue-${idx}`}
            className={cn(
              'grid grid-cols-1 md:grid-cols-2 gap-4 pb-4',
              idx < effectiveCards.length - 1 &&
                'border-b border-slate-100 dark:border-stone-800/80'
            )}
          >
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
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/20 dark:border-emerald-800 p-4 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Alongside Empathetic Script</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-emerald-100 leading-relaxed font-serif text-[15px]">
                  &ldquo;{card.empatheticScript}&rdquo;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🎙️ Single Consolidated Delivery Tip at the Bottom of All Dialogues */}
      {effectiveDeliveryTip && (
        <div className="flex items-start gap-2.5 rounded-xl border border-teal-200/80 bg-teal-50/70 dark:bg-stone-800/60 dark:border-stone-700 p-3.5 text-xs leading-relaxed text-slate-700 dark:text-stone-300">
          <Mic className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 dark:text-stone-100 font-semibold block mb-0.5">
              Vocal &amp; Physical Delivery Tip:
            </strong>
            <span>{effectiveDeliveryTip}</span>
          </div>
        </div>
      )}
    </section>
  );
}
