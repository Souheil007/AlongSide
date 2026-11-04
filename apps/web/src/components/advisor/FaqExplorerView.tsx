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
import { searchFaqs, CURATED_FAQS } from '@/lib/api/advisor';
import { FaqCard } from '@/components/advisor/FaqCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const FAQ_CATEGORIES = [
  { id: 'ALL', label: 'All Categories' },
  { id: 'SCREEN_BATTLES', label: 'Screen Battles & Dopamine' },
  { id: 'PEER_PRESSURE', label: 'Peer Pressure & First Phone' },
  { id: 'BEDTIME_SLEEP', label: 'Bedtime & Melatonin' },
  { id: 'SECRET_APPS', label: 'Secret Vaults & Privacy' },
  { id: 'ONLINE_SAFETY', label: 'Bullying & Group Chats' },
  { id: 'SOCIAL_MEDIA', label: 'Social Media & Feeds' },
];

export const TIER_TABS = [
  { id: 'ALL', label: 'All Ages' },
  { id: DevelopmentalTier.TIER_1_AGES_8_9, label: 'Ages 8-9 (Tier 1)' },
  { id: DevelopmentalTier.TIER_2_AGES_10_11, label: 'Ages 10-11 (Tier 2)' },
  { id: DevelopmentalTier.TIER_3_AGES_12_13, label: 'Ages 12-13 (Tier 3)' },
  { id: DevelopmentalTier.TIER_4_AGES_14_PLUS, label: 'Ages 14+ (Tier 4)' },
];

export function FaqExplorerView() {
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
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Layers className="h-3.5 w-3.5 text-teal-600" />
            <span>Developmental Tier (Age Group)</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TIER_TABS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all min-h-[38px] ${
                  selectedTier === tier.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'border border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tier.label}
              </button>
            ))}
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
