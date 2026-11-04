'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Puzzle,
  Sparkles,
  Compass,
  Smile,
  BookOpen,
  ArrowRight,
  RotateCw,
  Layers,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { useChildContextStore, selectActiveChild, formatChildAge } from '@/stores/useChildContextStore';
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
  const activeChild = selectActiveChild({ children, activeChildId });
  const [activeTab, setActiveTab] = React.useState<
    'daily' | 'boredom' | 'puppets' | 'catalog'
  >('daily');
  const [dailyActivity, setDailyActivity] = React.useState<BrainGameActivityDTO>(
    CANONICAL_BRAIN_GAMES[0]!
  );
  const [isLoading, setIsLoading] = React.useState(false);

  // Sync initial child ID if passed via query
  React.useEffect(() => {
    if (initialChildId && activeChild?.id !== initialChildId) {
      setActiveChild(initialChildId);
    }
  }, [initialChildId, activeChild?.id, setActiveChild]);

  // Load daily recommendation based on active child tier
  React.useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getDailyBrainGame(activeChild?.id, activeChild?.developmentalTier)
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
  }, [activeChild?.id, activeChild?.developmentalTier]);

  const handleShuffleDaily = () => {
    const candidates = CANONICAL_BRAIN_GAMES.filter(
      (bg) => bg.id !== dailyActivity.id
    );
    const next =
      candidates[Math.floor(Math.random() * candidates.length)] ||
      CANONICAL_BRAIN_GAMES[0]!;
    setDailyActivity(next);
  };

  const childName = activeChild ? activeChild.name : 'your child';
  const childAgeLabel = activeChild ? formatChildAge(activeChild) : '';

  return (
    <div className="space-y-6 sm:space-y-8">
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
              Domain Hub 4: Purposeful Play
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Brain Games & Purposeful Play
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Age-tailored screen-free play grounded in Harvard Center on the Developing Child ("Serve and Return") research and Montessori principles.
          </p>
        </div>

        <Link href="/behavior">
          <Button
            variant="outline"
            className="min-h-[44px] gap-2 text-xs font-semibold border-teal-200 text-teal-800 hover:bg-teal-50"
          >
            <Heart className="h-4 w-4 text-teal-600" />
            <span>Go to Behavior Hub (HALT)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {/* Active Child Play Banner */}
      <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/30 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white font-bold text-lg shadow-xs">
            {childName.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Play Center for {childName}
              </h2>
              {childAgeLabel && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-200">
                  {childAgeLabel}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600">
              Personalized for {activeChild?.developmentalTier?.replace(/_/g, ' ') || 'their developmental age stage'}
            </p>
          </div>
        </div>

        {/* Switch child pills if multi-child */}
        {children && children.length > 1 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-semibold mr-1">
              Switch Child:
            </span>
            {children.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => setActiveChild(child.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all min-h-[32px] ${
                  child.id === activeChild?.id
                    ? 'bg-amber-600 text-white font-bold shadow-2xs'
                    : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200'
                }`}
              >
                {child.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          {
            id: 'daily' as const,
            label: `Today's Play for ${childName}`,
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
            label: 'All Play Activities',
            icon: <Layers className="h-4 w-4" />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
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

      {/* Tab Content Panels */}
      {activeTab === 'daily' && (
        <div className="space-y-6">
          <DailyBrainGameCard
            activity={dailyActivity}
            childName={childName}
            onShuffle={handleShuffleDaily}
          />

          {/* Quick Shortcuts to other sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('boredom')}
              className="p-4 rounded-xl border border-teal-200/90 bg-teal-50/40 hover:bg-teal-50 text-left space-y-1.5 transition-all shadow-2xs group"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white shadow-2xs">
                  <Compass className="h-4 w-4" />
                </span>
                <ChevronRight className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Boredom Buster Generator
              </h3>
              <p className="text-xs text-slate-600">
                Quick screen-free creative prompts with cardboard, tape, and household objects.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('puppets')}
              className="p-4 rounded-xl border border-amber-200/90 bg-amber-50/40 hover:bg-amber-50 text-left space-y-1.5 transition-all shadow-2xs group"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-white shadow-2xs">
                  <Smile className="h-4 w-4" />
                </span>
                <ChevronRight className="h-4 w-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Puppet Theater Guide
              </h3>
              <p className="text-xs text-slate-600">
                Vocal mirroring, emotional sparring with Barnaby the Dragon, and bedtime calm.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-left space-y-1.5 transition-all shadow-2xs group"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-white shadow-2xs">
                  <Layers className="h-4 w-4" />
                </span>
                <ChevronRight className="h-4 w-4 text-slate-700 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Browse Full Play Catalog
              </h3>
              <p className="text-xs text-slate-600">
                Filter by sensory bins, unit blocks, logic riddles, and strategic chess puzzles.
              </p>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'boredom' && <BoredomBusterGenerator />}

      {activeTab === 'puppets' && <PuppetTheaterGuide />}

      {activeTab === 'catalog' && <PlayActivityCatalog />}
    </div>
  );
}
