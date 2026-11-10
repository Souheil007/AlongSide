'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLatestDigest } from '@/lib/api/digest';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { DigestFeedHeader } from '@/components/digest/DigestFeedHeader';
import { CulturalReelsView } from '@/components/digest/CulturalReelsView';
import { WeeklyMagazineView } from '@/components/digest/WeeklyMagazineView';
import { GenerationalTimeMirrorView } from '@/components/digest/GenerationalTimeMirrorView';
import { StageTailoredVocabularyView } from '@/components/digest/StageTailoredVocabularyView';
import { DinnerConversationStarters } from '@/components/digest/DinnerConversationStarters';
import { cn } from '@/lib/utils';

export interface DigestDashboardClientProps {
  className?: string;
}

export function DigestDashboardClient({ className }: DigestDashboardClientProps) {
  const activeChild = useChildContextStore(selectActiveChild);

  // Fetch latest digest briefing
  const { data: digestData } = useQuery({
    queryKey: ['latest-digest'],
    queryFn: getLatestDigest,
    staleTime: 10 * 60 * 1000,
  });

  const digest = digestData?.digest;
  const issueNumber = digest?.issueNumber ?? 42;

  return (
    <div className={cn('space-y-12 max-w-7xl mx-auto py-2', className)}>
      {/* 1. Feed Masthead, Edition Navigator & Child Switcher */}
      <DigestFeedHeader
        child={activeChild}
        issueNumber={issueNumber}
      />

      {/* 2. Pillar 1: 45-Second Parent Reels */}
      <CulturalReelsView child={activeChild} />

      {/* 3. Pillar 2: Weekly Magazine & Field Dispatches */}
      <WeeklyMagazineView child={activeChild} />

      {/* 4. Pillar 3: Generational Time Mirror */}
      <GenerationalTimeMirrorView child={activeChild} />

      {/* 5. Pillar 4: Stage-Tailored Micro-Language Decoder */}
      <StageTailoredVocabularyView child={activeChild} />

      {/* 6. Sunday Dinner Conversation Starters */}
      <DinnerConversationStarters child={activeChild} />
    </div>
  );
}
