'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Sparkles,
  Search,
  AlertTriangle,
  MessageCircle,
  Calendar,
  UtensilsCrossed,
  ShieldAlert,
  Flame,
  HelpCircle,
  Filter,
} from 'lucide-react';
import { ExploitSeverity, type SlangTermDTO, type ExploitAlertDTO } from '@alongside/shared';
import { getLatestDigest, searchSlang, getExploitAlerts } from '@/lib/api/digest';
import { SlangCard } from '@/components/digest/SlangCard';
import { ExploitAlertCard } from '@/components/digest/ExploitAlertCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

type SeverityFilter = 'ALL' | ExploitSeverity;

export function DigestDashboardClient() {
  const [slangSearchQuery, setSlangSearchQuery] = React.useState('');
  const [selectedSeverity, setSelectedSeverity] = React.useState<SeverityFilter>('ALL');

  // 1. Fetch latest digest
  const {
    data: digestData,
    isLoading: isDigestLoading,
    isError: isDigestError,
  } = useQuery({
    queryKey: ['latest-digest'],
    queryFn: getLatestDigest,
    staleTime: 10 * 60 * 1000,
  });

  // 2. Fetch or filter slang
  const {
    data: slangData,
    isLoading: isSlangLoading,
  } = useQuery({
    queryKey: ['digest-slang', slangSearchQuery],
    queryFn: () => searchSlang(slangSearchQuery),
    staleTime: 5 * 60 * 1000,
  });

  // 3. Fetch exploit alerts
  const {
    data: exploitData,
    isLoading: isExploitLoading,
  } = useQuery({
    queryKey: ['digest-exploits', selectedSeverity],
    queryFn: () =>
      getExploitAlerts(selectedSeverity === 'ALL' ? undefined : selectedSeverity),
    staleTime: 5 * 60 * 1000,
  });

  const digest = digestData?.digest;

  // Use searched slang if available, or fall back to digest's seeded slang
  const slangTerms: SlangTermDTO[] =
    slangData?.slangTerms && slangData.slangTerms.length > 0
      ? slangData.slangTerms
      : digest?.slangTerms ?? [];

  // Filter slang client-side as well for instant responsiveness
  const filteredSlang = slangSearchQuery.trim()
    ? slangTerms.filter(
        (s) =>
          s.term.toLowerCase().includes(slangSearchQuery.toLowerCase()) ||
          s.definition.toLowerCase().includes(slangSearchQuery.toLowerCase())
      )
    : slangTerms;

  const exploitAlerts: ExploitAlertDTO[] =
    exploitData?.exploitAlerts && exploitData.exploitAlerts.length > 0
      ? exploitData.exploitAlerts
      : digest?.exploitAlerts ?? [];

  const filteredExploits =
    selectedSeverity === 'ALL'
      ? exploitAlerts
      : exploitAlerts.filter((e) => e.severity === selectedSeverity);

  return (
    <div className="space-y-12 max-w-7xl mx-auto py-2">
      {/* 1. Hero: Sunday Dinner Conversation Starter */}
      <section aria-labelledby="dinner-starter-heading">
        <div className="relative overflow-hidden rounded-3xl border border-teal-200/90 bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 p-6 sm:p-10 text-white shadow-lg">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-700/80 border border-teal-500/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-100">
                <UtensilsCrossed className="h-3.5 w-3.5" />
                Sunday Dinner Conversation Starter
              </span>

              {digest?.issueNumber && (
                <span className="text-xs font-medium text-teal-200/90 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Issue #{digest.issueNumber}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <h2
                id="dinner-starter-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white"
              >
                &ldquo;{digest?.conversationStarter ||
                  'If you could design any app that doesn’t exist yet, what problem would it solve?'}&rdquo;
              </h2>

              <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed">
                {digest?.summary ||
                  'Weekly non-confrontational questions designed to spark natural family dialogue without triggering defensive adolescent shutdowns.'}
              </p>
            </div>

            {/* Parent Tip Callout */}
            <div className="rounded-2xl border border-teal-500/30 bg-teal-950/40 p-4 sm:p-5 text-xs sm:text-sm text-teal-100/90 space-y-1">
              <span className="font-bold text-teal-300 uppercase tracking-wider text-[11px] block">
                Parent Calm Rule of Engagement
              </span>
              <p className="leading-relaxed">
                Do not evaluate or correct their answer. Start by answering the question yourself first to model vulnerability and curiosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Slang Decoder Section */}
      <section aria-labelledby="slang-decoder-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tween Slang Decoder</span>
            </div>
            <h2
              id="slang-decoder-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
            >
              Decode Modern Tween Vocabulary
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Tap any flashcard to reveal real-world tween context, emotional tone, and empathetic response scripts.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search slang (e.g. crashout)..."
              value={slangSearchQuery}
              onChange={(e) => setSlangSearchQuery(e.target.value)}
              className="pl-10 text-xs sm:text-sm bg-white"
              aria-label="Search slang terms"
            />
          </div>
        </div>

        {/* Slang Cards Grid */}
        {isSlangLoading && !slangData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="h-44 rounded-2xl bg-white border border-slate-200 p-6 space-y-3" />
            ))}
          </div>
        ) : filteredSlang.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center space-y-3">
            <HelpCircle className="h-8 w-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">
              No Slang Terms Matching &quot;{slangSearchQuery}&quot;
            </h3>
            <p className="text-xs text-slate-500">
              Try searching another tween phrase or clear the filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSlangSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSlang.map((slang) => (
              <SlangCard key={slang.id} slang={slang} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Exploit Early Warning Section */}
      <section aria-labelledby="exploit-alerts-heading" className="space-y-6 pt-4 border-t border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Exploit Early Warning Feed</span>
            </div>
            <h2
              id="exploit-alerts-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
            >
              Covert Apps & Digital Bypasses
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Understand disguised calculator vaults, secret browser proxies, and anonymous Q&A apps before they reach your home.
            </p>
          </div>

          {/* Severity Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as SeverityFilter[]).map((sev) => {
              const isSelected = selectedSeverity === sev;
              return (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSelectedSeverity(sev)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors border',
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  )}
                  aria-pressed={isSelected}
                >
                  {sev === 'ALL' ? 'All Alerts' : sev}
                </button>
              );
            })}
          </div>
        </div>

        {/* Exploit Alerts Grid */}
        {isExploitLoading && !exploitData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2].map((idx) => (
              <div key={idx} className="h-64 rounded-2xl bg-white border border-slate-200 p-6 space-y-4" />
            ))}
          </div>
        ) : filteredExploits.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center space-y-2">
            <ShieldAlert className="h-8 w-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">
              No Exploit Alerts for this Severity Level
            </h3>
            <p className="text-xs text-slate-500">
              No active reports in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExploits.map((exploit) => (
              <ExploitAlertCard key={exploit.id} exploit={exploit} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
