'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import type { FaqItemDTO } from '@alongside/shared';
import { DevelopmentalTier } from '@alongside/shared';
import { cn } from '@/lib/utils';

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
    case DevelopmentalTier.TIER_0A_INFANCY_0_1:
      return {
        label: 'Ages 0–1 · Infancy',
        badgeClass: 'bg-rose-50/70 text-rose-900 border-rose-200/80',
      };
    case DevelopmentalTier.TIER_0B_TODDLER_1_2:
      return {
        label: 'Ages 1–2 · Younger Toddler',
        badgeClass: 'bg-amber-50/70 text-amber-900 border-amber-200/80',
      };
    case DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3:
      return {
        label: 'Ages 2–3 · Older Toddler',
        badgeClass: 'bg-orange-50/70 text-orange-900 border-orange-200/80',
      };
    case DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3:
      return {
        label: 'Ages 0–3 · Infancy & Toddler',
        badgeClass: 'bg-amber-50/70 text-amber-900 border-amber-200/80',
      };
    case DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6:
      return {
        label: 'Ages 4–6 · Early Childhood',
        badgeClass: 'bg-emerald-50/70 text-emerald-900 border-emerald-200/80',
      };
    case DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9:
      return {
        label: 'Ages 7–9 · Middle Childhood',
        badgeClass: 'bg-teal-50/70 text-teal-900 border-teal-200/80',
      };
    case DevelopmentalTier.TIER_3_PRE_TEEN_10_12:
      return {
        label: 'Ages 10–12 · Pre-Teen',
        badgeClass: 'bg-sky-50/70 text-sky-900 border-sky-200/80',
      };
    case DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15:
      return {
        label: 'Ages 13–15 · Early Teen',
        badgeClass: 'bg-violet-50/70 text-violet-900 border-violet-200/80',
      };
    case DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18:
      return {
        label: 'Ages 16–18 · Young Adult',
        badgeClass: 'bg-indigo-50/70 text-indigo-900 border-indigo-200/80',
      };
    case DevelopmentalTier.TIER_1_AGES_8_9:
      return {
        label: 'Ages 8-9 · Explorer',
        badgeClass: 'bg-emerald-50/70 text-emerald-900 border-emerald-200/80',
      };
    case DevelopmentalTier.TIER_2_AGES_10_11:
      return {
        label: 'Ages 10-11 · Pathfinder',
        badgeClass: 'bg-teal-50/70 text-teal-900 border-teal-200/80',
      };
    case DevelopmentalTier.TIER_3_AGES_12_13:
      return {
        label: 'Ages 12-13 · Navigator',
        badgeClass: 'bg-indigo-50/70 text-indigo-900 border-indigo-200/80',
      };
    case DevelopmentalTier.TIER_4_AGES_14_PLUS:
      return {
        label: 'Ages 14+ · Pioneer',
        badgeClass: 'bg-purple-50/70 text-purple-900 border-purple-200/80',
      };
    default:
      return {
        label: 'All Developmental Tiers',
        badgeClass: 'bg-[#F6F5F0] text-[#454D49] border-[rgba(19,23,21,0.1)]',
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
        badgeClass: 'bg-teal-50/70 text-teal-900 border-teal-200/80',
      };
    case 'nutrition-and-feeding':
    case 'nutrition-feeding':
      return {
        label: 'Nutrition & Picky Eating',
        badgeClass: 'bg-emerald-50/70 text-emerald-900 border-emerald-200/80',
      };
    case 'development-and-milestones':
    case 'milestones':
      return {
        label: 'Developmental Milestones',
        badgeClass: 'bg-sky-50/70 text-sky-900 border-sky-200/80',
      };
    case 'behavior-and-discipline':
    case 'behavior-discipline':
      return {
        label: 'Behavior & Co-Regulation',
        badgeClass: 'bg-amber-50/70 text-amber-900 border-amber-200/80',
      };
    case 'modern-world-and-devices':
    case 'tech-and-devices':
      return {
        label: 'Tech, Screens & Pacts',
        badgeClass: 'bg-violet-50/70 text-violet-900 border-violet-200/80',
      };
    case 'SCREEN_BATTLES':
      return {
        label: 'Screen Battles & Dopamine',
        badgeClass: 'bg-amber-50/70 text-amber-900 border-amber-200/80',
      };
    case 'PEER_PRESSURE':
      return {
        label: 'Peer Pressure & First Phone',
        badgeClass: 'bg-rose-50/70 text-rose-900 border-rose-200/80',
      };
    case 'BEDTIME_SLEEP':
      return {
        label: 'Bedtime & Melatonin',
        badgeClass: 'bg-blue-50/70 text-blue-900 border-blue-200/80',
      };
    case 'SECRET_APPS':
      return {
        label: 'Secret Vaults & Privacy',
        badgeClass: 'bg-violet-50/70 text-violet-900 border-violet-200/80',
      };
    case 'ONLINE_SAFETY':
      return {
        label: 'Bullying & Group Chats',
        badgeClass: 'bg-emerald-50/70 text-emerald-900 border-emerald-200/80',
      };
    case 'SOCIAL_MEDIA':
      return {
        label: 'Social Media & Comparison',
        badgeClass: 'bg-pink-50/70 text-pink-900 border-pink-200/80',
      };
    default:
      return {
        label: categoryId.replace(/[-_]/g, ' '),
        badgeClass: 'bg-[#F6F5F0] text-[#454D49] border-[rgba(19,23,21,0.1)]',
      };
  }
}

export function FaqCard({
  faq,
  defaultExpanded = false,
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
      await navigator.clipboard.writeText(
        faq.deEscalationScript.replace(/^"|"$/g, '')
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Safe fallback
    }
  };

  return (
    <article
      className={cn(
        'rounded-[12px] border border-[rgba(19,23,21,0.1)] bg-white p-5 transition-colors duration-150',
        isExpanded
          ? 'border-[#143D2B]/35'
          : 'hover:border-[rgba(19,23,21,0.22)]',
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px]"
        aria-expanded={isExpanded}
      >
        <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[#69726D]">
          <span className="font-medium text-[#143D2B]">
            {categoryInfo.label}
          </span>
          <span className="text-[#131715]/20" aria-hidden="true">
            /
          </span>
          <span>{tierInfo.label}</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-[20px] sm:text-[21px] font-normal leading-[1.28] tracking-[-0.015em] text-[#131715]">
            {faq.question}
          </h3>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#F6F5F0] text-[#59625D]"
            aria-hidden="true"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4 border-t border-[rgba(19,23,21,0.08)] pt-4 almanac-rise-in">
          <div className="space-y-1.5">
            <p className="text-[12.5px] font-medium text-[#69726D]">
              Why this happens
            </p>
            <p className="text-[14.5px] leading-[1.6] text-[#303633]">
              {faq.answerMarkdown}
            </p>
          </div>

          {faq.deEscalationScript && (
            <div className="rounded-r-[10px] rounded-l-[2px] border border-[rgba(19,23,21,0.08)] border-l-[3px] border-l-[#143D2B] bg-[#FAF9F5] p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[12px] font-semibold text-[#143D2B]">
                  What to say
                </span>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className={cn(
                    'inline-flex min-h-[44px] sm:min-h-[34px] items-center gap-1.5 rounded-[6px] border px-3 sm:px-2.5 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                    copied
                      ? 'border-[#143D2B] bg-[#143D2B] text-white'
                      : 'border-[rgba(19,23,21,0.12)] bg-white text-[#454D49] hover:border-[#143D2B]/40 hover:bg-[#E8F1EC] hover:text-[#143D2B]'
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-serif text-[16px] leading-[1.5] text-[#131715]">
                {faq.deEscalationScript}
              </p>
            </div>
          )}

          <div className="pt-1">
            <Link
              href={`/advisor?prompt=${encodeURIComponent(faq.question)}`}
              className="inline-flex min-h-[36px] items-center gap-1.5 text-[13.5px] font-medium text-[#143D2B] hover:underline underline-offset-4"
            >
              <span>Ask Parent Advisor about this</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}

// Re-export alias FaqSearchCard matching Plan 11 deliverables checklist
export const FaqSearchCard = FaqCard;
