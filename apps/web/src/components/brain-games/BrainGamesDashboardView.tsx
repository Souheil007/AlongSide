'use client';

import * as React from 'react';
import {
  Puzzle,
  Sparkles,
  Compass,
  Smile,
  Layers,
} from 'lucide-react';
import { useChildContextStore } from '@/stores/useChildContextStore';
import { useChildAge } from '@/hooks/useChildAge';
import {
  getDailyBrainGame,
  CANONICAL_BRAIN_GAMES,
} from '@/lib/api/brainGames';
import type { BrainGameActivityDTO } from '@alongside/shared';
import { DailyBrainGameCard } from './DailyBrainGameCard';
import { PuppetTheaterGuide } from './PuppetTheaterGuide';
import { BoredomBusterGenerator } from './BoredomBusterGenerator';
import { PlayActivityCatalog } from './PlayActivityCatalog';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface BrainGamesDashboardViewProps {
  initialChildId?: string;
}

export function BrainGamesDashboardView({ initialChildId }: BrainGamesDashboardViewProps) {
  const { children, activeChildId, setActiveChild } = useChildContextStore();
  const childAge = useChildAge();
  const [activeTab, setActiveTab] = React.useState<
    'daily' | 'boredom' | 'puppets' | 'catalog'
  >('daily');
  const [dailyActivity, setDailyActivity] = React.useState<BrainGameActivityDTO>(
    CANONICAL_BRAIN_GAMES[0]!
  );
  const [isLoading, setIsLoading] = React.useState(false);

  // Sync initial child ID if passed via query
  React.useEffect(() => {
    if (initialChildId && activeChildId !== initialChildId) {
      setActiveChild(initialChildId);
    }
  }, [initialChildId, activeChildId, setActiveChild]);

  // Load daily recommendation based on active child tier
  React.useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getDailyBrainGame(childAge.childId ?? undefined, childAge.developmentalTier)
      .then((activity) => {
        if (isMounted && activity) {
          setDailyActivity(activity);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [childAge.childId, childAge.developmentalTier]);

  const handleShuffleDaily = () => {
    const candidates = CANONICAL_BRAIN_GAMES.filter(
      (bg) => bg.id !== dailyActivity.id
    );
    const next =
      candidates[Math.floor(Math.random() * candidates.length)] ||
      CANONICAL_BRAIN_GAMES[0]!;
    setDailyActivity(next);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-600 text-white shadow-xs">
              <Puzzle className="h-3.5 w-3.5" />
            </span>
            <Badge
              variant="outline"
              className="text-[10px] text-amber-800 bg-amber-50 border-amber-200 font-bold"
            >
              Purposeful Play & Cognitive Development
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Brain Games & Purposeful Play
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Age-tailored screen-free play grounded in Harvard Center on the Developing Child ("Serve and Return") research and Montessori principles.
          </p>
        </div>
      </div>

      {/* Active Child Play Banner */}
      <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/30 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white font-bold text-lg shadow-xs">
            {childAge.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Play Center
              </h2>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-200">
                {childAge.ageDisplay}
              </span>
              {childAge.isAutoCalibrated && (
                <Badge
                  variant="outline"
                  className="text-[10px] bg-white text-amber-800 border-amber-300 font-bold"
                >
                  Auto-Calibrated
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-600">
              Purposeful screen-free activities for this developmental stage
            </p>
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          {
            id: 'daily' as const,
            label: "Today's Play",
            icon: <Sparkles className="h-4 w-4" />,
          },
          {
            id: 'boredom' as const,
            label: 'Boredom Buster Generator',
            icon: <Compass className="h-4 w-4" />,
          },
          {
            id: 'puppets' as const,
            label: 'Puppet Theater Guide',
            icon: <Smile className="h-4 w-4" />,
          },
          {
            id: 'catalog' as const,
            label: 'Purposeful Play Catalog',
            icon: <Layers className="h-4 w-4" />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Tab View */}
      <div className="transition-opacity duration-200">
        {activeTab === 'daily' && (
          <DailyBrainGameCard
            activity={dailyActivity}
            childName={childAge.name}
            onShuffle={handleShuffleDaily}
          />
        )}

        {activeTab === 'boredom' && (
          <BoredomBusterGenerator />
        )}

        {activeTab === 'puppets' && <PuppetTheaterGuide />}

        {activeTab === 'catalog' && <PlayActivityCatalog />}
      </div>
    </div>
  );
}
