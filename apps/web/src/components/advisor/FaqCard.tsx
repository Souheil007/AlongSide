'use client';

import * as React from 'react';
import {
  ChevronDown,
  ChevronUp,
  Brain,
  MessageSquareQuote,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type { FaqItemDTO } from '@alongside/shared';
import { DevelopmentalTier } from '@alongside/shared';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface FaqCardProps {
  faq: FaqItemDTO;
  defaultExpanded?: boolean;
  onSelectFaq?: (faq: FaqItemDTO) => void;
  className?: string;
}

export function formatTierBadge(tier?: DevelopmentalTier | string | null): {
  label: string;
  badgeClass: string;
} {
  switch (tier) {
    case DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3:
      return {
        label: 'Ages 0–3 • Infancy & Toddler (Tier 0)',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    case DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6:
      return {
        label: 'Ages 4–6 • Early Childhood (Tier 1)',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    case DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9:
      return {
        label: 'Ages 7–9 • Middle Childhood (Tier 2)',
        badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
      };
    case DevelopmentalTier.TIER_3_PRE_TEEN_10_12:
      return {
        label: 'Ages 10–12 • Pre-Teen (Tier 3)',
        badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
      };
    case DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15:
      return {
        label: 'Ages 13–15 • Early Teen (Tier 4)',
        badgeClass: 'bg-violet-50 text-violet-800 border-violet-200',
      };
    case DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18:
      return {
        label: 'Ages 16–18 • Young Adult (Tier 5)',
        badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      };
    case DevelopmentalTier.TIER_1_AGES_8_9:
      return {
        label: 'Ages 8-9 • Explorer (Tier 1)',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    case DevelopmentalTier.TIER_2_AGES_10_11:
      return {
        label: 'Ages 10-11 • Pathfinder (Tier 2)',
        badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
      };
    case DevelopmentalTier.TIER_3_AGES_12_13:
      return {
        label: 'Ages 12-13 • Navigator (Tier 3)',
        badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      };
    case DevelopmentalTier.TIER_4_AGES_14_PLUS:
      return {
        label: 'Ages 14+ • Pioneer (Tier 4)',
        badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
      };
    default:
      return {
        label: 'All Developmental Tiers',
        badgeClass: 'bg-slate-50 text-slate-700 border-slate-200',
      };
  }
}

export function formatCategoryBadge(categoryId: string): {
  label: string;
  badgeClass: string;
} {
  switch (categoryId) {
    case 'pediatric-health-and-sleep':
    case 'health-and-sleep':
      return {
        label: 'Pediatric Health & Sleep',
        badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
      };
    case 'nutrition-and-feeding':
    case 'nutrition-feeding':
      return {
        label: 'Nutrition & Picky Eating',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    case 'development-and-milestones':
    case 'milestones':
      return {
        label: 'Developmental Milestones',
        badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
      };
    case 'behavior-and-discipline':
    case 'behavior-discipline':
      return {
        label: 'Behavior & Co-Regulation',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    case 'modern-world-and-devices':
    case 'tech-and-devices':
      return {
        label: 'Tech, Screens & Pacts',
        badgeClass: 'bg-violet-50 text-violet-800 border-violet-200',
      };
    case 'SCREEN_BATTLES':
      return {
        label: 'Screen Battles & Dopamine',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    case 'PEER_PRESSURE':
      return {
        label: 'Peer Pressure & First Phone',
        badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
      };
    case 'BEDTIME_SLEEP':
      return {
        label: 'Bedtime & Melatonin',
        badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
      };
    case 'SECRET_APPS':
      return {
        label: 'Secret Vaults & Privacy',
        badgeClass: 'bg-violet-50 text-violet-800 border-violet-200',
      };
    case 'ONLINE_SAFETY':
      return {
        label: 'Bullying & Group Chats',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    case 'SOCIAL_MEDIA':
      return {
        label: 'Social Media & Comparison',
        badgeClass: 'bg-pink-50 text-pink-800 border-pink-200',
      };
    default:
      return {
        label: categoryId.replace(/[-_]/g, ' '),
        badgeClass: 'bg-slate-50 text-slate-800 border-slate-200',
      };
  }
}

export function FaqCard({
  faq,
  defaultExpanded = false,
  onSelectFaq,
  className,
}: FaqCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const [copied, setCopied] = React.useState(false);

  const tierInfo = formatTierBadge(faq.targetTier);
  const categoryInfo = formatCategoryBadge(faq.categoryId);

  const handleCopyScript = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!faq.deEscalationScript) return;
    try {
      await navigator.clipboard.writeText(faq.deEscalationScript.replace(/^"|"$/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={cn(
        'group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all',
        'hover:border-teal-300 hover:shadow-md',
        isExpanded && 'ring-1 ring-teal-500/20 border-teal-200',
        className
      )}
    >
      {/* Header / Clickable Toggle */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full text-left focus:outline-none"
        aria-expanded={isExpanded}
      >
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
              categoryInfo.badgeClass
            )}
          >
            {categoryInfo.label}
          </span>
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
              tierInfo.badgeClass
            )}
          >
            {tierInfo.label}
          </span>
          {faq.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
              <Sparkles className="h-3 w-3 text-amber-600" /> Featured
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
            {faq.question}
          </h3>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-150">
          {/* Neurobiology Developmental Explanation */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              <Brain className="h-3.5 w-3.5 text-teal-600" />
              <span>Developmental Neurobiology Insight</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {faq.answerMarkdown}
            </p>
          </div>

          {/* Actionable De-escalation Dialogue Script */}
          {faq.deEscalationScript && (
            <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-900">
                  <MessageSquareQuote className="h-3.5 w-3.5 text-teal-600" />
                  <span>Calming Dialogue Script</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className={cn(
                    'flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                    copied
                      ? 'bg-teal-700 text-white'
                      : 'border border-teal-300 bg-white text-teal-800 hover:bg-teal-100/80 active:scale-95'
                  )}
                  title="Copy dialogue script"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-serif italic text-sm text-slate-800 leading-relaxed bg-white/80 rounded-lg p-3 border border-teal-100">
                {faq.deEscalationScript}
              </p>
            </div>
          )}

          {/* Direct CTA to Ask AI Advisor */}
          <div className="flex items-center justify-between pt-1">
            <Link
              href={`/advisor?prompt=${encodeURIComponent(faq.question)}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
            >
              <span>Explore dynamic response in AI Advisor</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Re-export alias FaqSearchCard matching Plan 11 deliverables checklist
export const FaqSearchCard = FaqCard;
