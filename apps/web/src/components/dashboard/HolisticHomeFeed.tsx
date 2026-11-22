'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { useChildren } from '@/hooks/useChildren';
import { useAuth } from '@/hooks/useAuth';
import { getAcademyModules, calculateHabitStreakAndMinutes } from '@/lib/api/academy';
import { ChildOnboardingModal } from '@/components/children/ChildOnboardingModal';
import { ChildHeroCard } from './ChildHeroCard';
import { ActiveChapterContinueCard } from './ActiveChapterContinueCard';
import { SundayCultureDigestCard } from './SundayCultureDigestCard';
import { BilateralPactStatusCard } from './BilateralPactStatusCard';
import { AskAdvisorPromptBar } from './AskAdvisorPromptBar';
import { DailyAdvisoryScriptCard } from './DailyAdvisoryScriptCard';
import type { ChildDTO } from '@alongside/shared';

export { DailyAdvisoryScriptCard };

export interface HolisticHomeFeedProps {
  initialChildId?: string;
  parentName?: string;
}

export function HolisticHomeFeed({ initialChildId, parentName }: HolisticHomeFeedProps) {
  const [onboardingOpen, setOnboardingOpen] = React.useState(false);
  const { user } = useAuth();
  const { children, activeChildId, setActiveChild, setChildren, fetchChildren } =
    useChildContextStore();

  const { children: queryChildren, isLoading: queryLoading } = useChildren();

  // Query user's academy modules to reflect dynamic course progress, streak, and minutes
  const { data: allModules } = useQuery({
    queryKey: ['academy-modules', 'user-stats'],
    queryFn: () => getAcademyModules(),
    staleTime: 5 * 60 * 1000,
  });

  const [activityVersion, setActivityVersion] = React.useState(0);

  React.useEffect(() => {
    const handleActivityChange = () => {
      setActivityVersion((v) => v + 1);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('alongside-learning-activity-updated', handleActivityChange);
      window.addEventListener('storage', handleActivityChange);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('alongside-learning-activity-updated', handleActivityChange);
        window.removeEventListener('storage', handleActivityChange);
      }
    };
  }, []);

  const { streakDays, minsLearnedThisWeek } = React.useMemo(() => {
    return calculateHabitStreakAndMinutes(allModules);
  }, [allModules, activityVersion]);

  const resolvedParentName =
    parentName || (user?.fullName ? user.fullName.trim().split(/\s+/)[0] : 'Parent');

  // Sync children from react-query into context store
  React.useEffect(() => {
    if (!queryLoading && queryChildren !== undefined) {
      setChildren(queryChildren);
    }
  }, [queryChildren, queryLoading, setChildren]);

  // Sync initialChildId from searchParams if present
  React.useEffect(() => {
    if (initialChildId && initialChildId !== activeChildId) {
      setActiveChild(initialChildId);
    }
  }, [initialChildId]);

  const resolvedChildren = children.length > 0 ? children : queryChildren;
  const resolvedActiveChildId = initialChildId || activeChildId;
  const activeChild = selectActiveChild({
    children: resolvedChildren,
    activeChildId: resolvedActiveChildId,
  });

  const handleAddChildSuccess = (newChild: ChildDTO) => {
    setOnboardingOpen(false);
    setChildren([...resolvedChildren, newChild]);
    setActiveChild(newChild.id);
  };

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* 1. H2v2 Top Hero: Panoramic Photo Banner + Frosted Dr. Alongside Spotlight */}
      <ChildHeroCard
        child={activeChild}
        parentName={resolvedParentName}
        streakDays={streakDays}
        minsLearnedThisWeek={minsLearnedThisWeek}
        onOpenOnboarding={() => setOnboardingOpen(true)}
        variant="photo-cockpit"
        advisorSlot={<AskAdvisorPromptBar child={activeChild} variant="hero" />}
      />

      {/* 2. Flagship Centerpiece: Full-Width 5-Node Interactive Curriculum Roadmap */}
      <ActiveChapterContinueCard
        child={activeChild}
        isChildLoading={queryLoading && resolvedChildren.length === 0}
      />

      {/* 3. Daily Ritual Trio (Deep-Spruce Script, Polaroid Sunday Table, Slang/Play Decoder) + Widescreen Weekly Talk */}
      <SundayCultureDigestCard
        child={activeChild}
        variant="h2v2"
        scriptSlot={<DailyAdvisoryScriptCard child={activeChild} variant="spruce" />}
      />

      {/* 4. Stage-Adaptive Readiness Radar / Bedtime Curfew Dock / Early Screen Boundaries */}
      <BilateralPactStatusCard child={activeChild} />

      {/* Child Onboarding Modal */}
      <ChildOnboardingModal
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
        onSuccess={handleAddChildSuccess}
      />
    </div>
  );
}
