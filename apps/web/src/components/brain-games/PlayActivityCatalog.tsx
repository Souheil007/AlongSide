'use client';

import * as React from 'react';
import {
  Search,
  Smile,
  ChevronDown,
  Layers,
  Sparkles,
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
import { useChildAge } from '@/hooks/useChildAge';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Modalities' },
  { id: PlayCategory.PUPPET, label: 'Puppets & Face-to-Face' },
  { id: PlayCategory.SENSORY, label: 'Sensory & Tactile' },
  { id: PlayCategory.CONSTRUCTION, label: 'Blocks & Building' },
  { id: PlayCategory.LOGIC_PUZZLE, label: 'Logic & Riddles' },
  { id: PlayCategory.MAKER, label: 'Maker & Engineering' },
  { id: PlayCategory.BOREDOM_BUSTER, label: 'Boredom Busters' },
];

const TIER_FILTERS = [
  { id: 'all', label: 'All Ages' },
  { id: DevelopmentalTier.TIER_0A_INFANCY_0_1, label: '0–1 yrs (Infancy)' },
  { id: DevelopmentalTier.TIER_0B_TODDLER_1_2, label: '1–2 yrs (Younger Toddler)' },
  { id: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3, label: '2–3 yrs (Older Toddler)' },
  { id: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3, label: '0–3 yrs (Infancy & Toddler)' },
  { id: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6, label: '4–6 yrs (Preschool)' },
  { id: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9, label: '7–9 yrs (Childhood)' },
  { id: DevelopmentalTier.TIER_3_PRE_TEEN_10_12, label: '10–12 yrs (Pre-Teen)' },
  { id: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15, label: '13–15 yrs (Teens)' },
  { id: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18, label: '16–18 yrs (Late Teens)' },
];

export function PlayActivityCatalog() {
  const childAge = useChildAge();

  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTier, setSelectedTier] = React.useState<string>(childAge.developmentalTier);
  const [isViewingAllAges, setIsViewingAllAges] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [expandedActivityIds, setExpandedActivityIds] = React.useState<Set<string>>(new Set());

  // Automatically update tier when active child tier changes (unless parent explicitly chose 'View All Ages')
  React.useEffect(() => {
    if (!isViewingAllAges) {
      setSelectedTier(childAge.developmentalTier);
    }
  }, [childAge.developmentalTier, isViewingAllAges]);

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
      {/* Sleek Active Age Calibration Banner & Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/40 p-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-700">
            <Smile className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-950">
                {isViewingAllAges
                  ? 'Browsing All Ages (0–18)'
                  : `Purposeful Play • ${childAge.ageDisplay}`}
              </span>
              <Badge
                variant="outline"
                className="text-[10px] bg-white text-amber-800 border-amber-300 font-bold"
              >
                {isViewingAllAges ? 'Unfiltered' : 'Auto-Filtered'}
              </Badge>
            </div>
            <p className="text-[11px] text-amber-800/80 mt-0.5">
              {isViewingAllAges
                ? 'Showing activities across the entire developmental spectrum.'
                : `Filtered to ${childAge.developmentalTier.replace(/_/g, ' ')}`}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            if (isViewingAllAges) {
              setIsViewingAllAges(false);
              setSelectedTier(childAge.developmentalTier);
            } else {
              setIsViewingAllAges(true);
              setSelectedTier('all');
            }
          }}
          className="text-xs font-semibold h-9 border-amber-300 text-amber-900 hover:bg-amber-100/70 shrink-0 cursor-pointer"
        >
          {isViewingAllAges ? 'Filter by Stage' : 'View All Ages'}
        </Button>
      </div>

      {/* Expanded Tier Buttons when "View All Ages" is toggled */}
      {isViewingAllAges && (
        <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Select Specific Age Stage:
            </span>
            <button
              type="button"
              onClick={() => {
                setIsViewingAllAges(false);
                setSelectedTier(childAge.developmentalTier);
              }}
              className="text-xs text-amber-700 hover:text-amber-900 font-bold cursor-pointer"
            >
              Reset to {childAge.name} ({childAge.ageDisplay})
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {TIER_FILTERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedTier === tier.id
                    ? 'bg-amber-600 text-white shadow-2xs font-bold'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search & Modalities Toolbar */}
      <div className="space-y-4 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search activities by materials (cardboard, cups, chess), keyword, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 min-h-[44px] bg-slate-50 border-slate-200 text-xs sm:text-sm"
          />
        </div>

        {/* Category Modality Pills */}
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
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[36px] cursor-pointer ${
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
      </div>

      {/* Activities Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Found {filteredActivities.length} purposeful play activities</span>
          <span>Screen-Free Guarantee</span>
        </div>

        {filteredActivities.length === 0 ? (
          <Card className="p-8 text-center border-dashed border-slate-300">
            <p className="text-xs text-slate-500 mb-2">
              No activities found matching your criteria.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setIsViewingAllAges(true);
                setSelectedTier('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredActivities.map((act) => {
              const isExpanded = expandedActivityIds.has(act.id);
              return (
                <Card
                  key={act.id}
                  className="border-slate-200/90 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between"
                >
                  <CardHeader className="pb-3 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="text-[10px] text-amber-800 bg-amber-50 border-amber-200">
                        {act.category.replace(/_/g, ' ')}
                      </Badge>
                      <span className="text-[11px] font-semibold text-slate-500">
                        ~{act.estimatedMinutes} mins
                      </span>
                    </div>
                    <CardTitle className="text-base font-bold text-slate-900 leading-snug">
                      {act.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-600 leading-relaxed">
                      {act.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-0">
                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {act.targetSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Expandable instructions */}
                    {isExpanded && (
                      <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700 animate-in fade-in">
                        <div>
                          <span className="font-bold text-slate-900 block mb-1">
                            Materials Needed:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {act.materialsNeeded.map((mat, idx) => (
                              <span
                                key={idx}
                                className="rounded bg-amber-50 text-amber-900 px-2 py-0.5 text-[11px] border border-amber-200/60"
                              >
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="font-bold text-slate-900 block mb-1">
                            Step-by-Step Instructions:
                          </span>
                          <p className="whitespace-pre-line leading-relaxed text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                            {act.instructions}
                          </p>
                        </div>
                      </div>
                    )}

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(act.id)}
                      className="w-full text-xs font-semibold text-amber-700 hover:text-amber-800 hover:bg-amber-50 cursor-pointer"
                    >
                      {isExpanded ? 'Hide Step-by-Step Instructions' : 'View Step-by-Step Instructions →'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
