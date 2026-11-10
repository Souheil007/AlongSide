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
      {/* Dynamic Multi-Child Calibration Switcher */}
      {children.length > 1 && (
        <aside
          aria-label="Child Switching Bar"
          className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-2.5 rounded-[10px] border border-[#E3E3DC] shadow-[0_1px_2px_rgba(17,20,19,0.04)]"
        >
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] text-[#858C88] uppercase tracking-wider font-semibold">
              Active Child:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {children.map((c) => {
                const isSelected = c.id === activeChild?.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveChild(c.id)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-semibold transition-all cursor-pointer border',
                      isSelected
                        ? 'bg-[#143D2B] text-white border-[#143D2B] shadow-2xs'
                        : 'bg-[#F4F4F0] text-[#494F4C] border-[#E3E3DC] hover:text-[#111413] hover:bg-[#EAEAEA]'
                    )}
                  >
                    <span
                      className={cn(
                        'w-4 h-4 rounded-full flex items-center justify-center font-mono text-[10px] font-bold',
                        isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#143D2B]'
                      )}
                    >
                      {c.name.charAt(0).toUpperCase()}
                    </span>
                    <span>
                      {c.name} ({c.age}y)
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOnboardingOpen(true)}
            className="text-xs font-mono font-medium text-[#143D2B] hover:underline"
          >
            + Add Child
          </button>
        </aside>
      )}

      {/* 1. Ambient Context Status Anchor & Welcoming Value Banner */}
      <ChildHeroCard
        child={activeChild}
        parentName={parentName}
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
