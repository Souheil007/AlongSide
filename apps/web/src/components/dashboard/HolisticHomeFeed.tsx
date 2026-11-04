'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Compass,
  HeartPulse,
  Utensils,
  Puzzle,
  Brain,
  Bot,
  Smartphone,
  BookOpen,
  ArrowRight,
  Plus,
  Shield,
  Layers,
} from 'lucide-react';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { useChildren } from '@/hooks/useChildren';
import { ChildOnboardingModal } from '@/components/children/ChildOnboardingModal';
import { ChildHeroCard } from './ChildHeroCard';
import { TodayMilestonesWidget } from './TodayMilestonesWidget';
import { DailyPlayActivityCard } from './DailyPlayActivityCard';
import { DailyNutritionTipCard } from './DailyNutritionTipCard';
import { QuickHealthTriageLauncher } from './QuickHealthTriageLauncher';
import { AskAdvisorPromptBar } from './AskAdvisorPromptBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
      {/* 1. Child Hero Banner & Horizon */}
      <ChildHeroCard
        child={activeChild}
        onOpenOnboarding={() => setOnboardingOpen(true)}
      />

      {/* 2. Pediatric 1-Tap Health Triage Launcher */}
      <QuickHealthTriageLauncher child={activeChild} />

      {/* 3. Core Daily Feed Grid: Milestones, Play, Nutrition, Advisor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Milestones & Daily Play Activity */}
        <div className="lg:col-span-7 space-y-6">
          <TodayMilestonesWidget child={activeChild} />
          <DailyPlayActivityCard child={activeChild} />
        </div>

        {/* Right Column (5 cols): Daily Nutrition & AI Advisor Prompt Bar */}
        <div className="lg:col-span-5 space-y-6">
          <DailyNutritionTipCard child={activeChild} />
          <AskAdvisorPromptBar child={activeChild} />

          {/* Quick Domain Hub Shortcuts */}
          <Card className="border-slate-200/90 bg-white shadow-xs">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-teal-600" />
                  Family OS Domain Hubs
                </CardTitle>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">7 Canonical Hubs</span>
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 divide-y divide-slate-100">
              <Link
                href="/academy"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      Parent Intelligence Academy
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Neurobiology lessons & micro-courses
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-700 transition-colors" />
              </Link>

              <Link
                href={`/devices${activeChild ? `?childId=${activeChild.id}` : ''}`}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                      Modern World & Devices Hub
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Pacts, 8:30 PM curfews & Sunday slang digest
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-violet-700 transition-colors" />
              </Link>

              <Link
                href="/nutrition"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Utensils className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Nutrition & Complementary Feeding
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      BLW guide, allergen schedules & choking guards
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />
              </Link>

              <Link
                href="/brain-games"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                    <Puzzle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      Brain Games & Purposeful Play
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Age-indexed play matrix & puppet sparring
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-700 transition-colors" />
              </Link>
            </CardContent>
          </Card>
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
