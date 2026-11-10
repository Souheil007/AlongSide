'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { useChildren } from '@/hooks/useChildren';
import { useAuth } from '@/hooks/useAuth';
import { getAcademyModules } from '@/lib/api/academy';
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

  const totalCompletedLessons = React.useMemo(() => {
    if (!allModules || allModules.length === 0) return 0;
    return allModules.reduce((acc, m) => acc + (m.completedLessonCount || 0), 0);
  }, [allModules]);

  const dynamicStreakDays = totalCompletedLessons > 0 ? Math.min(7, Math.max(1, totalCompletedLessons)) : 4;
  const dynamicMinsLearned = totalCompletedLessons > 0 ? totalCompletedLessons * 4 : 18;

  const resolvedParentName =
    parentName || (user?.fullName ? user.fullName.trim().split(/\s+/)[0] : 'Parent');

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
      {/* 1. Ambient Context Status Anchor & Welcoming Value Banner */}
      <ChildHeroCard
        child={activeChild}
        parentName={resolvedParentName}
        streakDays={dynamicStreakDays}
        minsLearnedThisWeek={dynamicMinsLearned}
        onOpenOnboarding={() => setOnboardingOpen(true)}
      />

      {/* 2. SECTION 1: Active Academy Track (Hero Centerpiece with Visual Roadmap & Tonight's Script) */}
      <ActiveChapterContinueCard child={activeChild} />

      {/* 3. SECTION 2: Sunday Youth Culture Digest (Living Schoolyard Feed with Cringe Meter & Table Starter) */}
      <SundayCultureDigestCard child={activeChild} />

      {/* 4. SECTION 3: First-Phone Assessment & Readiness Radar (Stage-Adaptive 3-Column Grid) */}
      <BilateralPactStatusCard child={activeChild} />

      {/* 5. SECTION 4: 24/7 AI Child Advisor (Empathetic Co-Pilot & Voice Sparring Simulator) */}
      <AskAdvisorPromptBar child={activeChild} />

      {/* Child Onboarding Modal */}
      <ChildOnboardingModal
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
        onSuccess={handleAddChildSuccess}
      />
    </div>
  );
}
