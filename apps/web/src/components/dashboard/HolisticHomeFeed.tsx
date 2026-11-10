'use client';

import * as React from 'react';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { useChildren } from '@/hooks/useChildren';
import { ChildOnboardingModal } from '@/components/children/ChildOnboardingModal';
import { ChildHeroCard } from './ChildHeroCard';
import { ActiveChapterContinueCard } from './ActiveChapterContinueCard';
import { DailyAdvisoryScriptCard } from './DailyAdvisoryScriptCard';
import { SundayCultureDigestCard } from './SundayCultureDigestCard';
import { BilateralPactStatusCard } from './BilateralPactStatusCard';
import { AskAdvisorPromptBar } from './AskAdvisorPromptBar';
import type { ChildDTO } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface HolisticHomeFeedProps {
  initialChildId?: string;
  parentName?: string;
}

export function HolisticHomeFeed({ initialChildId, parentName = 'Sarah' }: HolisticHomeFeedProps) {
  const [onboardingOpen, setOnboardingOpen] = React.useState(false);
  const { children, activeChildId, setActiveChild, setChildren, fetchChildren } =
    useChildContextStore();

  const { children: queryChildren, isLoading: queryLoading } = useChildren();

  // Sync children from react-query into context store
  React.useEffect(() => {
    if (queryChildren && queryChildren.length > 0) {
      setChildren(queryChildren);
    } else if (!queryLoading && children.length === 0) {
      fetchChildren();
    }
  }, [queryChildren, queryLoading]);

  // Sync initialChildId from searchParams if present
  React.useEffect(() => {
    if (initialChildId && initialChildId !== activeChildId) {
      setActiveChild(initialChildId);
    }
  }, [initialChildId]);

  const activeChild = selectActiveChild({ children, activeChildId });

  const handleAddChildSuccess = (newChild: ChildDTO) => {
    setOnboardingOpen(false);
    setChildren([...children, newChild]);
    setActiveChild(newChild.id);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Welcoming Value Banner & Child Horizon Leap Card */}
      <ChildHeroCard
        child={activeChild}
        parentName={parentName}
        onOpenOnboarding={() => setOnboardingOpen(true)}
      />

      {/* 2. #1 HERO CENTERPIECE: Active Academy Course Journey Roadmap */}
      <ActiveChapterContinueCard child={activeChild} />

      {/* 3. STAGE-ADAPTIVE TWO-COLUMN GRID: Daily Empathy Script (Left 7) + Stage Telemetry (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Today's Word-for-Word Empathy Script & Practice Sparring */}
        <div className="lg:col-span-7 space-y-6">
          <DailyAdvisoryScriptCard child={activeChild} />
        </div>

        {/* Right Column (5 cols): Stage-Adaptive Telemetry, Culture Digest & 24/7 AI Advisor */}
        <div className="lg:col-span-5 space-y-6">
          <BilateralPactStatusCard child={activeChild} />
          <SundayCultureDigestCard child={activeChild} />
          <AskAdvisorPromptBar child={activeChild} />
        </div>
      </div>

      {/* Child Onboarding Modal */}
      <ChildOnboardingModal
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
        onSuccess={handleAddChildSuccess}
      />
    </div>
  );
}
