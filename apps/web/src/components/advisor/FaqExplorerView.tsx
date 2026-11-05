'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  BookOpen,
  Filter,
  Layers,
  Sparkles,
  ArrowLeft,
  X,
  Loader2,
} from 'lucide-react';
import type { FaqItemDTO } from '@alongside/shared';
import { DevelopmentalTier } from '@alongside/shared';
import { useChildContextStore, selectActiveChild } from '@/stores/useChildContextStore';
import { searchFaqs, CURATED_FAQS } from '@/lib/api/advisor';
import { FaqCard } from '@/components/advisor/FaqCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export const FAQ_CATEGORIES = [
  { id: 'ALL', label: 'All Categories' },
  { id: 'pediatric-health-and-sleep', label: 'Pediatric Health & Sleep' },
  { id: 'nutrition-and-feeding', label: 'Nutrition, Solids & Picky Eating' },
  { id: 'development-and-milestones', label: 'Developmental Milestones & Growth' },
  { id: 'behavior-and-discipline', label: 'Behavioral Psychology & Co-Regulation' },
  { id: 'modern-world-and-devices', label: 'Modern World, Screens & Curfews' },
  { id: 'SCREEN_BATTLES', label: 'Screen Battles & Dopamine' },
  { id: 'PEER_PRESSURE', label: 'Peer Pressure & First Phone' },
  { id: 'BEDTIME_SLEEP', label: 'Bedtime & Melatonin' },
  { id: 'SECRET_APPS', label: 'Secret Vaults & Privacy' },
  { id: 'ONLINE_SAFETY', label: 'Bullying & Group Chats' },
  { id: 'SOCIAL_MEDIA', label: 'Social Media & Feeds' },
];

export const TIER_TABS = [
  { id: 'ALL', label: 'All Ages (0–18)' },
  { id: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3, label: 'Ages 0–3 (Tier 0: Infancy & Toddler)' },
  { id: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6, label: 'Ages 4–6 (Tier 1: Early Childhood)' },
  { id: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9, label: 'Ages 7–9 (Tier 2: Middle Childhood)' },
  { id: DevelopmentalTier.TIER_3_PRE_TEEN_10_12, label: 'Ages 10–12 (Tier 3: Pre-Teen)' },
  { id: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15, label: 'Ages 13–15 (Tier 4: Early Teen)' },
  { id: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18, label: 'Ages 16–18 (Tier 5: Young Adult)' },
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

  // Automatically update selectedTier to activeChildLifespanTier whenever activeChild changes
  React.useEffect(() => {
    if (activeChildLifespanTier) {
      setSelectedTier(activeChildLifespanTier);
    }
  }, [activeChild?.id, activeChild?.developmentalTier, activeChildLifespanTier]);

  // Debounce search input by 250ms
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch or filter FAQs when query, category, or tier change
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
    <div className="space-y-6">
      {/* Navigation & Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/advisor"
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to AI Advisor Chat</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-3 py-0.5 text-xs font-semibold text-teal-800">
              <BookOpen className="h-3.5 w-3.5 text-teal-600" />
              Clinical Knowledge Base
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Living Modern Parenting FAQ Explorer
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl leading-relaxed">
            Search pediatric and psychologist-reviewed answers to 100+ digital dilemmas.
            Every card includes the underlying neuroscience and a word-for-word conversation script.
          </p>
        </div>

        {/* Quick Advisor CTA */}
        <div className="flex items-center gap-2.5">
          <Link href="/advisor">
            <Button variant="default" className="gap-2 min-h-[44px]">
              <Sparkles className="h-4 w-4" />
              <span>Open 24/7 AI Advisor</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar & Filters Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, de-escalation scripts, or topics (e.g., 'Roblox', 'curfew', 'Snapchat', 'calculator vault')..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Filter className="h-3.5 w-3.5 text-teal-600" />
            <span>Category Filter</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all min-h-[38px] ${
                  selectedCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'border border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Developmental Tier Tabs */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Layers className="h-3.5 w-3.5 text-teal-600" />
              <span>Developmental Tier (Age Group)</span>
            </div>
            {activeChildLifespanTier && (
              <button
                type="button"
                onClick={() => setSelectedTier(activeChildLifespanTier)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                  selectedTier === activeChildLifespanTier
                    ? 'border-teal-500 bg-teal-50 text-teal-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-300'
                }`}
              >
                ★ Filter by Selected Stage
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TIER_TABS.map((tier) => {
              const isActiveChildTier = tier.id === activeChildLifespanTier;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all min-h-[38px] cursor-pointer ${
                    selectedTier === tier.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'border border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{tier.label}</span>
                  {isActiveChildTier && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                        selectedTier === tier.id
                          ? 'bg-white/20 text-white'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      Selected Stage
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
          <span>
            {isLoading ? (
              <span className="flex items-center gap-1 text-teal-700">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Filtering clinical knowledge base...
              </span>
            ) : (
              `Showing ${faqs.length} parenting scenario${faqs.length === 1 ? '' : 's'}`
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
              className="text-teal-700 hover:text-teal-900 underline font-medium"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {faqs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-3">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No matching scenarios found
            </h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find an exact match for &quot;{debouncedQuery}&quot;. You can ask our 24/7 AI Advisor directly for custom real-time advice.
            </p>
            <div className="mt-5">
              <Link href={`/advisor?prompt=${encodeURIComponent(debouncedQuery || 'Parenting advice')}`}>
                <Button variant="default" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Ask AI Advisor about this</span>
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {faqs.map((faq) => (
              <FaqCard key={faq.id} faq={faq} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
