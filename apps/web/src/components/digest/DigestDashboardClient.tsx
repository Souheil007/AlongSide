'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLatestDigest, searchSlang, getExploitAlerts } from '@/lib/api/digest';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { DigestFeedHeader } from '@/components/digest/DigestFeedHeader';
import { DinnerConversationStarters } from '@/components/digest/DinnerConversationStarters';
import { SlangDecoderView } from '@/components/digest/SlangDecoderView';
import { ExploitAlertsView } from '@/components/digest/ExploitAlertsView';
import { cn } from '@/lib/utils';

export interface DigestDashboardClientProps {
  className?: string;
}

export function DigestDashboardClient({ className }: DigestDashboardClientProps) {
  const activeChild = useChildContextStore(selectActiveChild);

  // 1. Fetch latest digest briefing
  const { data: digestData } = useQuery({
    queryKey: ['latest-digest'],
    queryFn: getLatestDigest,
    staleTime: 10 * 60 * 1000,
  });

  // 2. Fetch backend slang if available
  const { data: slangData } = useQuery({
    queryKey: ['digest-slang'],
    queryFn: () => searchSlang(),
    staleTime: 5 * 60 * 1000,
  });

  // 3. Fetch backend exploit alerts if available
  const { data: exploitData } = useQuery({
    queryKey: ['digest-exploits'],
    queryFn: () => getExploitAlerts(),
    staleTime: 5 * 60 * 1000,
  });

  const digest = digestData?.digest;
  const issueNumber = digest?.issueNumber ?? 42;

  const apiSlangTerms =
    slangData?.slangTerms && slangData.slangTerms.length > 0
      ? slangData.slangTerms
      : digest?.slangTerms;

  const apiExploitAlerts =
    exploitData?.exploitAlerts && exploitData.exploitAlerts.length > 0
      ? exploitData.exploitAlerts
      : digest?.exploitAlerts;

  return (
    <div className={cn('space-y-12 max-w-7xl mx-auto py-2', className)}>
      {/* 1. Feed Masthead & Edition Navigator */}
      <DigestFeedHeader
        child={activeChild}
        issueNumber={issueNumber}
      />

      {/* 2. Sunday Dinner Conversation Starter */}
      <DinnerConversationStarters
        child={activeChild}
      />

      {/* 3. Searchable Slang Radar & Decoder */}
      <SlangDecoderView
        apiSlangTerms={apiSlangTerms}
      />

      {/* 4. Exploit & Dark Pattern Early Warnings */}
      <ExploitAlertsView
        apiAlerts={apiExploitAlerts}
      />
    </div>
  );
}
