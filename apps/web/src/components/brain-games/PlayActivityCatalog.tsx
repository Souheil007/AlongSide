'use client';

import * as React from 'react';
import {
  Search,
  Filter,
  Clock,
  Sparkles,
  CheckCircle2,
  Award,
  ChevronDown,
  ChevronUp,
  Layers,
  Smile,
} from 'lucide-react';
import {
  PlayCategory,
  DevelopmentalTier,
  type BrainGameActivityDTO,
} from '@alongside/shared';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CANONICAL_BRAIN_GAMES } from '@/lib/api/brainGames';
import { useChildContextStore, selectActiveChild } from '@/stores/useChildContextStore';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Play' },
  { id: PlayCategory.PUPPET, label: 'Puppets & Face-to-Face' },
  { id: PlayCategory.SENSORY, label: 'Sensory Bins & Tactile' },
  { id: PlayCategory.CONSTRUCTION, label: 'Blocks & Construction' },
  { id: PlayCategory.LOGIC_PUZZLE, label: 'Logic, Riddles & Chess' },
  { id: PlayCategory.MAKER, label: 'Maker & Engineering' },
  { id: PlayCategory.BOREDOM_BUSTER, label: 'Boredom Busters' },
];

const TIER_FILTERS = [
  { id: 'all', label: 'All Ages' },
  { id: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3, label: '0–3 yrs (Infancy)' },
  { id: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6, label: '4–6 yrs (Preschool)' },
  { id: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9, label: '7–9 yrs (Childhood)' },
  { id: DevelopmentalTier.TIER_3_PRE_TEEN_10_12, label: '10–12 yrs (Pre-Teen)' },
  { id: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15, label: '13–15 yrs (Teens)' },
  { id: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18, label: '16–18 yrs (Late Teens)' },
];

export function PlayActivityCatalog() {
  const { children, activeChildId } = useChildContextStore();
  const activeChild = selectActiveChild({ children, activeChildId });
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTier, setSelectedTier] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [expandedActivityIds, setExpandedActivityIds] = React.useState<Set<string>>(new Set());

  // Auto-set tier filter if activeChild changes and filter was on 'all'
  React.useEffect(() => {
    if (activeChild?.developmentalTier) {
      setSelectedTier(activeChild.developmentalTier);
    }
  }, [activeChild?.id, activeChild?.developmentalTier]);

  const toggleExpand = (id: string) => {
    setExpandedActivityIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredActivities = React.useMemo(() => {
    return CANONICAL_BRAIN_GAMES.filter((activity) => {
      // Category match
      if (selectedCategory !== 'all' && activity.category !== selectedCategory) {
        return false;
      }

      // Tier match
      if (selectedTier !== 'all') {
        const matchesTier =
          activity.targetTier === selectedTier ||
          activity.targetTier.includes(selectedTier);
        if (!matchesTier) return false;
      }

      // Search match
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const inTitle = activity.title.toLowerCase().includes(q);
        const inSummary = activity.summary.toLowerCase().includes(q);
        const inSkills = activity.targetSkills.some((s) => s.toLowerCase().includes(q));
        const inMaterials = activity.materialsNeeded.some((m) => m.toLowerCase().includes(q));
        if (!inTitle && !inSummary && !inSkills && !inMaterials) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedTier, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search & Filters Header */}
      <div className="space-y-4 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by game, materials (cardboard, cups, chess), or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 min-h-[44px] bg-slate-50 border-slate-200 text-xs sm:text-sm"
            />
          </div>

          {activeChild && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedTier(activeChild.developmentalTier)}
              className={`min-h-[44px] gap-2 text-xs font-semibold shrink-0 ${
                selectedTier === activeChild.developmentalTier
                  ? 'border-amber-400 bg-amber-50/70 text-amber-900'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              <Smile className="h-3.5 w-3.5 text-amber-600" />
              <span>Filter for {activeChild.name}</span>
            </Button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Play Modality:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[36px] ${
                  selectedCategory === tab.id
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Age Tier Filter Pills */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Developmental Age Stage:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {TIER_FILTERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  selectedTier === tier.id
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredActivities.length}</strong> purposeful play activities
        </span>
        {(selectedCategory !== 'all' || selectedTier !== 'all' || searchQuery.length > 0) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTier('all');
              setSearchQuery('');
            }}
            className="text-amber-800 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <Card className="border-dashed border-slate-200 p-8 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Filter className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No play activities match your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search query or selecting "All Ages" to browse the full catalog.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTier('all');
              setSearchQuery('');
            }}
            className="text-xs font-semibold"
          >
            View All Activities
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredActivities.map((activity) => {
            const isExpanded = expandedActivityIds.has(activity.id);

            return (
              <Card
                key={activity.id}
                className="border-slate-200/90 bg-white hover:border-amber-300 transition-all shadow-xs overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="p-5 pb-3 border-b border-slate-100 bg-gradient-to-r from-amber-50/20 via-white to-transparent">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-amber-100 text-amber-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        {activity.category.replace('_', ' ')}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        {activity.estimatedMinutes} mins
                      </span>
                    </div>

                    <CardTitle className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                      {activity.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-600 line-clamp-2">
                      {activity.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 pt-3 space-y-3">
                    {/* Expandable Instructions */}
                    <div className="rounded-xl bg-slate-50 p-3 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-[10px] uppercase tracking-wider">
                          Instructions:
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleExpand(activity.id)}
                          className="text-amber-800 hover:text-amber-900 text-[11px] font-semibold flex items-center gap-0.5"
                        >
                          {isExpanded ? (
                            <>
                              <span>Show less</span>
                              <ChevronUp className="h-3 w-3" />
                            </>
                          ) : (
                            <>
                              <span>Read steps</span>
                              <ChevronDown className="h-3 w-3" />
                            </>
                          )}
                        </button>
                      </div>

                      <p
                        className={`leading-relaxed text-[11px] sm:text-xs text-slate-700 ${
                          isExpanded ? '' : 'line-clamp-2'
                        }`}
                      >
                        {activity.instructions}
                      </p>
                    </div>

                    {/* Materials Checklist */}
                    {activity.materialsNeeded && activity.materialsNeeded.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Materials:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {activity.materialsNeeded.map((mat, i) => (
                            <span
                              key={i}
                              className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Target Developmental Skills */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Target Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activity.targetSkills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-800 border border-teal-200/60"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>

                <div className="p-4 pt-0">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    ✓ 100% Screen-Free Play Guarantee
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
