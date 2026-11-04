'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Brain,
  Search,
  Sparkles,
  Heart,
  Shield,
  MessageSquare,
  AlertTriangle,
  Smile,
  BookOpen,
  Filter,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { useChildContextStore, selectActiveChild, formatChildAge } from '@/stores/useChildContextStore';
import {
  CANONICAL_BEHAVIOR_GUIDES,
  getBehaviorGuides,
  type BehaviorGuideUI,
} from '@/lib/api/behavior';
import { HaltDiagnosticModal } from './HaltDiagnosticModal';
import { DeEscalationScriptCard } from './DeEscalationScriptCard';
import { AuthoritativeParentingGuide } from './AuthoritativeParentingGuide';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

const SITUATION_BUTTONS = [
  { id: 'all', label: 'All Behavioral Dilemmas' },
  { id: 'tantrums', label: 'Tantrums & Meltdowns' },
  { id: 'defiance', label: 'Defiance & "No!"' },
  { id: 'aggression', label: 'Hitting & Biting' },
  { id: 'sibling', label: 'Sibling Fighting' },
  { id: 'lying', label: 'Lying & Secrecy' },
  { id: 'bedtime', label: 'Bedtime Stalls' },
];

interface BehaviorDashboardViewProps {
  initialChildId?: string;
}

export function BehaviorDashboardView({ initialChildId }: BehaviorDashboardViewProps) {
  const { children, activeChildId, setActiveChild } = useChildContextStore();
  const activeChild = selectActiveChild({ children, activeChildId });
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTier, setSelectedTier] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [isHaltModalOpen, setIsHaltModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'scripts' | 'halt' | 'guide'>('scripts');

  // Sync initial child ID if passed via query
  React.useEffect(() => {
    if (initialChildId && activeChild?.id !== initialChildId) {
      setActiveChild(initialChildId);
    }
  }, [initialChildId, activeChild?.id, setActiveChild]);

  // If child selected, default tier filter
  React.useEffect(() => {
    if (activeChild?.developmentalTier) {
      setSelectedTier(activeChild.developmentalTier);
    }
  }, [activeChild?.id, activeChild?.developmentalTier]);

  const filteredGuides = React.useMemo(() => {
    return CANONICAL_BEHAVIOR_GUIDES.filter((guide) => {
      // Category match
      if (selectedCategory !== 'all' && guide.category !== selectedCategory) {
        return false;
      }

      // Tier match
      if (selectedTier !== 'all') {
        const matchesTier =
          guide.targetTier === selectedTier ||
          guide.targetTier.includes(selectedTier);
        if (!matchesTier) return false;
      }

      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const inSituation = guide.triggerSituation.toLowerCase().includes(q);
        const inNeed = guide.underlyingNeed.toLowerCase().includes(q);
        const inScript = guide.coRegulationScript.toLowerCase().includes(q);
        const inLimit = guide.authoritativeLimit.toLowerCase().includes(q);
        if (!inSituation && !inNeed && !inScript && !inLimit) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedTier, searchQuery]);

  const childName = activeChild ? activeChild.name : 'your child';
  const childAgeLabel = activeChild ? formatChildAge(activeChild) : '';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-600 text-white shadow-xs">
              <Brain className="h-3.5 w-3.5" />
            </span>
            <Badge
              variant="outline"
              className="text-[10px] text-teal-800 bg-teal-50 border-teal-200 font-bold"
            >
              Domain Hub 5: Emotional Co-Regulation
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Behavioral Psychology & De-escalation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Translating tantrums into underlying needs (HALT diagnostic), word-for-word calming co-regulation scripts, and authoritative "Time-Ins".
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            type="button"
            onClick={() => setIsHaltModalOpen(true)}
            className="min-h-[44px] gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs text-xs"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Emergency HALT Diagnostic</span>
          </Button>

          <Link href="/advisor">
            <Button
              variant="outline"
              className="min-h-[44px] gap-2 text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <MessageSquare className="h-4 w-4 text-teal-600" />
              <span>Ask AI Advisor</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Active Child Context Banner */}
      <div className="rounded-2xl border border-teal-200/90 bg-gradient-to-r from-teal-50/70 via-white to-emerald-50/30 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white font-bold text-lg shadow-xs">
            {childName.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Co-Regulation Guidance for {childName}
              </h2>
              {childAgeLabel && (
                <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-bold text-teal-900 border border-teal-200">
                  {childAgeLabel}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600">
              Calibrated for {activeChild?.developmentalTier?.replace(/_/g, ' ') || 'their developmental age stage'}
            </p>
          </div>
        </div>

        {/* Multi-child switch */}
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
                    ? 'bg-teal-700 text-white font-bold shadow-2xs'
                    : 'bg-white hover:bg-teal-50 text-slate-700 border border-slate-200'
                }`}
              >
                {child.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hub Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          {
            id: 'scripts' as const,
            label: 'De-escalation Scripts Vault',
            icon: <BookOpen className="h-4 w-4" />,
          },
          {
            id: 'halt' as const,
            label: 'HALT Diagnostic Framework',
            icon: <AlertTriangle className="h-4 w-4" />,
          },
          {
            id: 'guide' as const,
            label: 'Authoritative "Time-Ins" & Breathing',
            icon: <Shield className="h-4 w-4" />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
              activeTab === tab.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: SCRIPTS VAULT */}
      {activeTab === 'scripts' && (
        <div className="space-y-6">
          {/* Search & Situation Buttons */}
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search dilemma (e.g. 'grocery tantrum', 'hitting', 'bedtime refusal', 'screen time')..."
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
                      ? 'border-teal-400 bg-teal-50 text-teal-900'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <Smile className="h-3.5 w-3.5 text-teal-600" />
                  <span>Filter for {activeChild.name}</span>
                </Button>
              )}
            </div>

            {/* Quick Situation Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Quick Behavioral Situation:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SITUATION_BUTTONS.map((sit) => (
                  <button
                    key={sit.id}
                    type="button"
                    onClick={() => setSelectedCategory(sit.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[36px] ${
                      selectedCategory === sit.id
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {sit.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier Filters */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Age Stage:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Ages' },
                  { id: 'TIER_0_INFANCY_TODDLER_0_3', label: '0–3 yrs (Toddler)' },
                  { id: 'TIER_1_EARLY_CHILDHOOD_4_6', label: '4–6 yrs (Preschool)' },
                  { id: 'TIER_2_MIDDLE_CHILDHOOD_7_9', label: '7–9 yrs (Childhood)' },
                  { id: 'TIER_3_PRE_TEEN_10_12', label: '10–12 yrs (Pre-Teen)' },
                  { id: 'TIER_4_EARLY_ADOLESCENCE_13_15', label: '13–15 yrs (Teens)' },
                  { id: 'TIER_5_LATE_ADOLESCENCE_16_18', label: '16–18 yrs (Older Teen)' },
                ].map((tier) => (
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

          {/* Results Count & Reset */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong>{filteredGuides.length}</strong> de-escalation scripts
            </span>
            {(selectedCategory !== 'all' || selectedTier !== 'all' || searchQuery.length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTier('all');
                  setSearchQuery('');
                }}
                className="text-teal-700 hover:underline font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Script Cards Grid */}
          {filteredGuides.length === 0 ? (
            <Card className="border-dashed border-slate-200 p-8 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Filter className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No behavior scripts match your filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for general terms like "screaming", "crying", "tablet", or click "All Ages".
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
                View All Scripts
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredGuides.map((guide) => (
                <DeEscalationScriptCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HALT DIAGNOSTIC */}
      {activeTab === 'halt' && (
        <div className="space-y-6">
          <Card className="border-teal-200 bg-gradient-to-r from-teal-50/50 via-white to-emerald-50/30 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Interactive Clinical Protocol
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Interactive HALT Diagnostic Tool
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                  Check symptoms across Hungry, Angry/Anxious, Lonely, or Tired to decode acute emotional storms and obtain immediate regulation steps.
                </p>
              </div>

              <Button
                type="button"
                onClick={() => setIsHaltModalOpen(true)}
                className="min-h-[44px] gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs shrink-0"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Launch Interactive Modal</span>
              </Button>
            </div>
          </Card>

          {/* Embedded HALT Walkthrough */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                letter: 'H',
                title: 'Hungry (Blood Sugar Crash)',
                mechanism: 'Hypoglycemia triggers adrenaline surge. Executive control collapses.',
                firstAid: 'Offer protein / complex carbs (cheese, fruit, milk) with zero commentary.',
              },
              {
                letter: 'A',
                title: 'Angry / Anxious (Amygdala Hijack)',
                mechanism: 'Fight-or-flight triggered by perceived autonomy loss or transition.',
                firstAid: 'Eye-level contact, open hands, decrease words by 80%.',
              },
              {
                letter: 'L',
                title: 'Lonely (Attachment Disconnection)',
                mechanism: 'After-school sensory overload or parental device distraction triggers panic.',
                firstAid: '5 minutes of focused physical snuggle, back rub, or rough-and-tumble play.',
              },
              {
                letter: 'T',
                title: 'Tired (Sensory Overstimulation)',
                mechanism: 'Adenosine sleep pressure impairs self-regulation; tiny triggers cause meltdowns.',
                firstAid: 'Dim lights, kill screens and audio, transition directly to sleep.',
              },
            ].map((item) => (
              <Card key={item.letter} className="p-5 border-slate-200 space-y-3 bg-white shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-900 font-black text-lg shrink-0">
                    {item.letter}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500">{item.mechanism}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-teal-200/80 bg-teal-50/50 p-3 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
                    Immediate First Aid:
                  </span>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                    {item.firstAid}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUTHORITATIVE "TIME-INS" & BREATHING */}
      {activeTab === 'guide' && <AuthoritativeParentingGuide />}

      {/* Standalone HALT Diagnostic Modal */}
      <HaltDiagnosticModal
        open={isHaltModalOpen}
        onOpenChange={setIsHaltModalOpen}
      />
    </div>
  );
}
