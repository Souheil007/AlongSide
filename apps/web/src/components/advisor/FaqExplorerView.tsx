'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  BookOpen,
  ArrowLeft,
  X,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import type { FaqItemDTO } from '@alongside/shared';
import { DevelopmentalTier } from '@alongside/shared';
import { useChildContextStore, selectActiveChild } from '@/stores/useChildContextStore';
import { searchFaqs, CURATED_FAQS } from '@/lib/api/advisor';
import { FaqCard } from '@/components/advisor/FaqCard';
import { cn } from '@/lib/utils';

export const FAQ_CATEGORIES = [
  { id: 'ALL', label: 'All categories' },
  { id: 'pediatric-health-and-sleep', label: 'Pediatric Health & Sleep' },
  { id: 'nutrition-and-feeding', label: 'Nutrition, Solids & Picky Eating' },
  { id: 'development-and-milestones', label: 'Developmental Milestones' },
  { id: 'behavior-and-discipline', label: 'Behavior & Co-Regulation' },
  { id: 'modern-world-and-devices', label: 'Screens & Curfews' },
  { id: 'SCREEN_BATTLES', label: 'Screen Battles' },
  { id: 'PEER_PRESSURE', label: 'Peer Pressure & First Phone' },
  { id: 'BEDTIME_SLEEP', label: 'Bedtime & Melatonin' },
  { id: 'SECRET_APPS', label: 'Secret Vaults & Privacy' },
  { id: 'ONLINE_SAFETY', label: 'Bullying & Group Chats' },
  { id: 'SOCIAL_MEDIA', label: 'Social Media' },
];

export const TIER_TABS = [
  { id: 'ALL', label: 'All ages (0–18)' },
  { id: DevelopmentalTier.TIER_0A_INFANCY_0_1, label: 'Ages 0–1' },
  { id: DevelopmentalTier.TIER_0B_TODDLER_1_2, label: 'Ages 1–2' },
  { id: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3, label: 'Ages 2–3' },
  { id: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3, label: 'Ages 0–3' },
  { id: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6, label: 'Ages 4–6' },
  { id: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9, label: 'Ages 7–9' },
  { id: DevelopmentalTier.TIER_3_PRE_TEEN_10_12, label: 'Ages 10–12' },
  { id: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15, label: 'Ages 13–15' },
  { id: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18, label: 'Ages 16–18' },
];

function resolveLifespanTier(tier?: string | null): string | null {
  if (!tier) return null;
  if (tier === DevelopmentalTier.TIER_1_AGES_8_9) return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
  if (tier === DevelopmentalTier.TIER_2_AGES_10_11) return DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
  if (tier === DevelopmentalTier.TIER_3_AGES_12_13) return DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
  if (tier === DevelopmentalTier.TIER_4_AGES_14_PLUS) return DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;
  return tier;
}

export function FaqExplorerView() {
  const { children, activeChildId } = useChildContextStore();
  const activeChild = selectActiveChild({ children, activeChildId });
  const activeChildLifespanTier = resolveLifespanTier(activeChild?.developmentalTier);

  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'ALL';
  const initialTier = searchParams.get('tier') || 'ALL';

  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = React.useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
  const [selectedTier, setSelectedTier] = React.useState(initialTier);
  const [faqs, setFaqs] = React.useState<FaqItemDTO[]>(CURATED_FAQS);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (activeChildLifespanTier) {
      setSelectedTier(activeChildLifespanTier);
    }
  }, [activeChild?.id, activeChild?.developmentalTier, activeChildLifespanTier]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  React.useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    searchFaqs({
      q: debouncedQuery,
      categoryId: selectedCategory !== 'ALL' ? selectedCategory : undefined,
      tier: selectedTier !== 'ALL' ? selectedTier : undefined,
    })
      .then((res) => {
        if (isMounted) {
          setFaqs(res.faqs);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFaqs(CURATED_FAQS);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery, selectedCategory, selectedTier]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
  };

  return (
    <div className="mx-auto w-full max-w-[920px] space-y-6 pb-10">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
        <div className="min-w-0 space-y-1.5">
          <Link
            href="/advisor"
            className="inline-flex min-h-[32px] items-center gap-1.5 text-[13px] font-medium text-[#69726D] transition-colors hover:text-[#131715]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Parent Advisor</span>
          </Link>
          <h1 className="font-serif text-[32px] sm:text-[38px] font-normal leading-[1.08] tracking-[-0.025em] text-[#131715]">
            Parenting FAQ Library
          </h1>
          <p className="max-w-[58ch] text-[14.5px] leading-[1.58] text-[#454D49]">
            Evidence-based answers to common developmental and digital moments, each with exact words to say.
          </p>
        </div>

        <Link
          href="/advisor"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] bg-[#143D2B] px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-[#0E2B1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>Open Parent Advisor</span>
        </Link>
      </header>

      {/* Search & Filters Panel */}
      <div className="space-y-4 rounded-[16px] border border-[rgba(19,23,21,0.1)] bg-white p-5">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#69726D]"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, scripts, or apps (e.g. Roblox, curfew, bedtime)..."
            aria-label="Search parenting FAQs"
            className="min-h-[44px] w-full rounded-[10px] border border-[rgba(19,23,21,0.14)] bg-[#FAF9F5] pl-10 pr-10 text-[14px] text-[#131715] placeholder:text-[#7A827E] focus:border-[#143D2B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143D2B]/12"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-[#69726D] hover:bg-[#F2F0E9] hover:text-[#131715]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <p className="text-[12.5px] font-medium text-[#69726D]">Category</p>
          <div className="flex flex-wrap gap-1.5">
            {FAQ_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'min-h-[44px] sm:min-h-[36px] rounded-[8px] px-3 text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                    active
                      ? 'bg-[#143D2B] text-white'
                      : 'border border-[rgba(19,23,21,0.1)] bg-[#FAF9F5] text-[#454D49] hover:bg-[#F2F0E9] hover:text-[#131715]'
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Age Group Filter */}
        <div className="space-y-2 border-t border-[rgba(19,23,21,0.08)] pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[12.5px] font-medium text-[#69726D]">Age group</p>
            {activeChildLifespanTier && (
              <button
                type="button"
                onClick={() => setSelectedTier(activeChildLifespanTier)}
                className={cn(
                  'min-h-[32px] rounded-[6px] px-2.5 text-[12px] font-medium transition-colors',
                  selectedTier === activeChildLifespanTier
                    ? 'bg-[#E8F1EC] text-[#143D2B]'
                    : 'text-[#69726D] hover:bg-[#F2F0E9] hover:text-[#131715]'
                )}
              >
                Match {activeChild?.name || 'selected child'}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TIER_TABS.map((tier) => {
              const active = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  className={cn(
                    'min-h-[44px] sm:min-h-[36px] rounded-[8px] px-3 text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                    active
                      ? 'bg-[#131715] text-white'
                      : 'border border-[rgba(19,23,21,0.1)] bg-[#FAF9F5] text-[#454D49] hover:bg-[#F2F0E9] hover:text-[#131715]'
                  )}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-0.5 text-[13px] text-[#69726D] tabular-nums">
          <span>
            {isLoading ? (
              <span className="inline-flex items-center gap-1.5 text-[#143D2B]">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                Filtering guides...
              </span>
            ) : (
              `${faqs.length} scenario${faqs.length === 1 ? '' : 's'}`
            )}
          </span>

          {(selectedCategory !== 'ALL' || selectedTier !== 'ALL' || debouncedQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedTier('ALL');
                handleClearSearch();
              }}
              className="font-medium text-[#143D2B] hover:underline underline-offset-4"
            >
              Reset filters
            </button>
          )}
        </div>

        {faqs.length === 0 ? (
          <div className="rounded-[16px] border border-[rgba(19,23,21,0.1)] bg-white p-10 text-center space-y-3">
            <BookOpen className="mx-auto h-6 w-6 text-[#69726D]" aria-hidden="true" />
            <h3 className="font-serif text-[22px] font-normal text-[#131715]">
              No matching scenarios found
            </h3>
            <p className="mx-auto max-w-[44ch] text-[14px] text-[#454D49]">
              No exact guide matched &ldquo;{debouncedQuery}&rdquo;. Ask the Parent Advisor directly for guidance tailored to your child.
            </p>
            <div className="pt-2">
              <Link
                href={`/advisor?prompt=${encodeURIComponent(debouncedQuery || 'Parenting advice')}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] bg-[#143D2B] px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-[#0E2B1E]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Ask Parent Advisor</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {faqs.map((faq) => (
              <FaqCard key={faq.id} faq={faq} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
