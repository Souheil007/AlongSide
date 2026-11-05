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

export interface HolisticHomeFeedProps {
  initialChildId?: string;
}

export function HolisticHomeFeed({ initialChildId }: HolisticHomeFeedProps) {
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
      {/* 1. Child Advisory Horizon & Current Neurodevelopmental Leap Hero Banner */}
      <ChildHeroCard
        child={activeChild}
        onOpenOnboarding={() => setOnboardingOpen(true)}
      />

      {/* 2. Core Advisory Feed Grid: Academy Chapters, Dialogue Scripts, Culture Pulse & Family Pacts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Priority 1-3 Academy Micro-Lesson & Daily Advisory Empathy Dialogue */}
        <div className="lg:col-span-7 space-y-6">
          <ActiveChapterContinueCard child={activeChild} />
          <DailyAdvisoryScriptCard child={activeChild} />
        </div>

        {/* Right Column (5 cols): Sunday Culture Digest, Bilateral Pact / Curfew Dock & 24/7 AI Advisor */}
        <div className="lg:col-span-5 space-y-6">
          <SundayCultureDigestCard child={activeChild} />
          <BilateralPactStatusCard child={activeChild} />
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
