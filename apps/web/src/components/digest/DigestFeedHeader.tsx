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
  onSelectIssue: (issueNumber: number) => void;
  onReturnToLatest: () => void;
  onSelectTab: (tab: CultureDigestTab) => void;
  className?: string;
}

export function DigestFeedHeader({
  issueNumber,
  latestIssueNumber,
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
  const weekRange =
    weekStart && weekEnd
      ? formatWeekDateRange(weekStart, weekEnd)
      : issueNumber !== null
        ? `Issue #${issueNumber}`
        : 'This week';

  const progressText =
    totalArticleCount === 0
      ? 'Curating this week'
      : readArticleCount === 0
        ? `${totalArticleCount} reads this week`
        : readArticleCount >= totalArticleCount
          ? 'All caught up on this issue'
          : `${readArticleCount} of ${totalArticleCount} read`;

  const tabs: Array<{
    id: CultureDigestTab;
    label: string;
    count?: number;
  }> = [
    {
      id: 'week',
      label:
        isArchiveEdition && issueNumber !== null
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

  return (
    <header
      data-testid="digest-feed-header"
      className={cn('pt-2 sm:pt-4', className)}
    >
      {/* Editorial Nameplate + Weekly Issue Selector */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pb-5">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h1 className="font-serif text-[32px] sm:text-[40px] font-normal leading-[1.06] tracking-[-0.025em] text-[#131715]">
            Culture &amp; Trends
          </h1>
          <p
            data-testid="digest-masthead-meta"
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13.5px] text-[#59625D] tabular-nums"
          >
            <span>
              {issueNumber !== null
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

        {/* Page-Wide Weekly Issue Selector (Zero duplicate child switcher here) */}
        <div className="relative inline-flex w-full sm:w-auto items-center">
          <select
            aria-label="Choose weekly issue"
            data-testid="digest-issue-select"
            value={issueNumber !== null ? String(issueNumber) : ''}
            disabled={issues.length === 0 && issueNumber === null}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (Number.isInteger(next) && next > 0) {
                onSelectIssue(next);
              }
            }}
            className="min-h-[44px] w-full sm:w-auto appearance-none rounded-[8px] border border-[#131715]/20 bg-white pl-3.5 pr-9 text-[13.5px] font-medium text-[#131715] tabular-nums transition-colors hover:border-[#131715]/35 hover:bg-[#F6F4EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2 cursor-pointer disabled:cursor-default disabled:opacity-70"
          >
            {issues.length > 0 ? (
              issues.map((item) => (
                <option key={item.id} value={String(item.issueNumber)}>
                  {formatIssueOptionLabel(item)}
                </option>
              ))
            ) : issueNumber !== null ? (
              <option value={String(issueNumber)}>
                Issue #{issueNumber} · {weekRange}
              </option>
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

      {/* Quiet Archive Edition Return Banner */}
      {isArchiveEdition && issueNumber !== null && latestIssueNumber !== null && (
        <div
          data-testid="digest-archive-banner"
          className="mb-3.5 flex flex-wrap items-center justify-between gap-3 rounded-[8px] bg-[#F3F1EA] px-4 py-2.5 text-[13px] text-[#3E4642]"
        >
          <span>
            Reading archive edition: Issue #{issueNumber} ({weekRange}) tailored for{' '}
            {childName} ({shortAges}).
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

      {/* Quiet 4-Tab Editorial Underline Bar */}
      <nav
        role="tablist"
        aria-label="Culture and Trends sections"
        className="flex items-center gap-2 sm:gap-3 border-b border-[#131715]/18 overflow-x-auto [scrollbar-width:none]"
      >
        {tabs.map((tab, index) => {
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
                'relative -mb-px inline-flex min-h-[44px] shrink-0 items-center gap-1.5 border-b-2 px-3 pb-2.5 text-[14px] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-inset rounded-t-[6px]',
                index === 0 && 'pl-0.5',
                isSelected
                  ? 'border-[#143D2B] font-semibold text-[#143D2B]'
                  : 'border-transparent font-medium text-[#59625D] hover:text-[#131715]'
              )}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  data-testid={`digest-tab-count-${tab.id}`}
                  className={cn(
                    'text-[12px] font-medium tabular-nums',
                    isSelected ? 'text-[#143D2B]' : 'text-[#59625D]'
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
