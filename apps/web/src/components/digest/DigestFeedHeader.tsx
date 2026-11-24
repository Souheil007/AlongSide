'use client';

import * as React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { DigestIssueSummaryDTO } from '@alongside/shared';
import {
  formatIssueOptionLabel,
  formatWeekDateRange,
  type CultureDigestTab,
} from '@/hooks/useCultureDigest';
import { cn } from '@/lib/utils';

export interface DigestFeedHeaderProps {
  issueNumber: number | null;
  latestIssueNumber: number | null;
  isAllWeeks?: boolean;
  weekStart?: string;
  weekEnd?: string;
  childName: string;
  childAgeLabel: string;
  tierLabel: string;
  shortAges: string;
  readArticleCount: number;
  totalArticleCount: number;
  issues: DigestIssueSummaryDTO[];
  isArchiveEdition: boolean;
  activeTab: CultureDigestTab;
  weekArticleCount: number;
  weekVideoCount: number;
  savedTotalCount: number;
  onSelectIssue: (selection: number | 'all') => void;
  onReturnToLatest: () => void;
  onSelectTab: (tab: CultureDigestTab) => void;
  className?: string;
}

export function DigestFeedHeader({
  issueNumber,
  latestIssueNumber,
  isAllWeeks = false,
  weekStart,
  weekEnd,
  childName,
  childAgeLabel,
  tierLabel,
  shortAges,
  readArticleCount,
  totalArticleCount,
  issues,
  isArchiveEdition,
  activeTab,
  weekArticleCount,
  weekVideoCount,
  savedTotalCount,
  onSelectIssue,
  onReturnToLatest,
  onSelectTab,
  className,
}: DigestFeedHeaderProps) {
  const weekRange = isAllWeeks
    ? 'All weeks'
    : weekStart && weekEnd
      ? formatWeekDateRange(weekStart, weekEnd)
      : issueNumber !== null
        ? `Issue #${issueNumber}`
        : 'This week';

  const progressText =
    totalArticleCount === 0
      ? isAllWeeks
        ? 'Curating archive'
        : 'Curating this week'
      : readArticleCount === 0
        ? isAllWeeks
          ? `${totalArticleCount} reads across all weeks`
          : `${totalArticleCount} reads this week`
        : readArticleCount >= totalArticleCount
          ? isAllWeeks
            ? 'All caught up across all weeks'
            : 'All caught up on this issue'
          : `${readArticleCount} of ${totalArticleCount} read`;

  const tabs: Array<{
    id: CultureDigestTab;
    label: string;
    count?: number;
  }> = [
    {
      id: 'week',
      label: isAllWeeks
        ? 'All Weeks'
        : isArchiveEdition && issueNumber !== null
          ? `Issue #${issueNumber}`
          : 'This Week',
    },
    {
      id: 'blogs',
      label: 'Blogs',
      count: weekArticleCount,
    },
    {
      id: 'videos',
      label: 'Videos',
      count: weekVideoCount,
    },
    {
      id: 'saved',
      label: 'Saved',
      count: savedTotalCount,
    },
  ];

  const selectValue = isAllWeeks
    ? 'all'
    : issueNumber !== null
      ? String(issueNumber)
      : '';

  return (
    <header
      data-testid="digest-feed-header"
      className={cn('pt-2 sm:pt-4', className)}
    >
      {/* Editorial Nameplate + Weekly Issue Selector */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pb-5">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h1 className="font-serif text-[34px] sm:text-[44px] lg:text-[48px] font-normal leading-[1.04] tracking-[-0.032em] text-[#0E1311]">
            Culture &amp; Trends
          </h1>
          <p
            data-testid="digest-masthead-meta"
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13.5px] text-[#59625D] tabular-nums"
          >
            <span>
              {isAllWeeks
                ? issues.length > 0
                  ? `All weeks · ${issues.length} ${issues.length === 1 ? 'edition' : 'editions'}`
                  : 'All weeks'
                : issueNumber !== null
                  ? `Issue No. ${issueNumber} · ${weekRange}`
                  : 'Latest weekly edition'}
            </span>
            <span className="text-[#131715]/20" aria-hidden="true">
              /
            </span>
            <span>
              For {childName}, {childAgeLabel} · {tierLabel} ({shortAges})
            </span>
            <span className="text-[#131715]/20" aria-hidden="true">
              /
            </span>
            <span
              data-testid="digest-progress-note"
              className="font-medium text-[#143D2B]"
            >
              {progressText}
            </span>
          </p>
        </div>

        {/* Page-Wide Weekly Issue Selector (Includes All weeks; zero duplicate child switcher) */}
        <div className="relative inline-flex w-full sm:w-auto items-center">
          <select
            aria-label="Choose weekly issue"
            data-testid="digest-issue-select"
            value={selectValue}
            disabled={!isAllWeeks && issues.length === 0 && issueNumber === null}
            onChange={(e) => {
              if (e.target.value === 'all') {
                onSelectIssue('all');
                return;
              }
              const next = Number(e.target.value);
              if (Number.isInteger(next) && next > 0) {
                onSelectIssue(next);
              }
            }}
            className="min-h-[44px] w-full sm:w-auto appearance-none rounded-[10px] border border-[#131715]/14 bg-white pl-3.5 pr-9 text-[13.5px] font-medium text-[#131715] tabular-nums shadow-[0_2px_10px_rgba(19,23,21,0.04)] transition-all hover:border-[#131715]/30 hover:shadow-[0_4px_14px_rgba(19,23,21,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2 cursor-pointer disabled:cursor-default disabled:opacity-70"
          >
            {issues.length > 0 ? (
              <>
                <option value="all">All weeks</option>
                {issues.map((item) => (
                  <option key={item.id} value={String(item.issueNumber)}>
                    {formatIssueOptionLabel(item)}
                  </option>
                ))}
              </>
            ) : issueNumber !== null || isAllWeeks ? (
              <>
                <option value="all">All weeks</option>
                {issueNumber !== null && (
                  <option value={String(issueNumber)}>
                    Issue #{issueNumber} · {weekRange}
                  </option>
                )}
              </>
            ) : (
              <option value="">Loading issues…</option>
            )}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 h-4 w-4 text-[#59625D]"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Quiet Archive / All-Weeks Return Banner */}
      {(isAllWeeks || (isArchiveEdition && issueNumber !== null)) &&
        latestIssueNumber !== null && (
          <div
            data-testid="digest-archive-banner"
            className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[10px] bg-[#EFECE3] border border-[#131715]/6 px-4 py-2.5 text-[13px] text-[#3E4642]"
          >
            <span>
              {isAllWeeks
                ? `Browsing all published weeks tailored for ${childName} (${shortAges}).`
                : `Reading archive edition: Issue #${issueNumber} (${weekRange}) tailored for ${childName} (${shortAges}).`}
            </span>
            <button
              type="button"
              data-testid="digest-return-latest-btn"
              onClick={onReturnToLatest}
              className="inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] font-medium text-[#143D2B] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-[6px] px-1"
            >
              <span>Return to this week (#{latestIssueNumber})</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        )}

      {/* Direction D: Pill-Segmented Sanctuary Tab Bar */}
      <nav
        role="tablist"
        aria-label="Culture and Trends sections"
        className="inline-flex items-center bg-[#ECE9E0] p-1 rounded-[12px] gap-1 overflow-x-auto max-w-full [scrollbar-width:none]"
      >
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`digest-tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`digest-panel-${tab.id}`}
              data-testid={`digest-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={cn(
                'relative inline-flex min-h-[38px] shrink-0 items-center gap-1.5 px-4 text-[13.5px] whitespace-nowrap rounded-[9px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                isSelected
                  ? 'bg-white font-semibold text-[#111413] shadow-[0_2px_8px_rgba(19,23,21,0.08)]'
                  : 'font-medium text-[#555D58] hover:text-[#111413] hover:bg-white/50'
              )}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  data-testid={`digest-tab-count-${tab.id}`}
                  className={cn(
                    'text-[11.5px] font-semibold tabular-nums rounded-full px-2 py-0.5 transition-colors',
                    isSelected
                      ? 'bg-[#EAF3EE] text-[#143D2B]'
                      : 'bg-[#DFDAD0] text-[#555D58]'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
