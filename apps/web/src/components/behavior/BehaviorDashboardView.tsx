'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Brain,
  Search,
  Heart,
  Shield,
  MessageSquare,
  AlertTriangle,
  Smile,
  BookOpen,
  Filter,
  ChevronDown,
} from 'lucide-react';
import { useChildContextStore } from '@/stores/useChildContextStore';
import { useChildAge } from '@/hooks/useChildAge';
import {
  CANONICAL_BEHAVIOR_GUIDES,
  type BehaviorGuideUI,
} from '@/lib/api/behavior';
import { HaltDiagnosticModal } from './HaltDiagnosticModal';
import { DeEscalationScriptCard } from './DeEscalationScriptCard';
import { AuthoritativeParentingGuide } from './AuthoritativeParentingGuide';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

const ALL_SITUATIONS = [
  { id: 'all', label: 'All Dilemmas' },
  { id: 'tantrums', label: 'Tantrums & Meltdowns' },
  { id: 'defiance', label: 'Defiance & "No!"' },
  { id: 'aggression', label: 'Hitting & Biting' },
  { id: 'sibling', label: 'Sibling Fighting & Peer Drama' },
  { id: 'lying', label: 'Lying & Secrecy' },
  { id: 'bedtime', label: 'Bedtime Stalls' },
];

const TIER_OPTIONS = [
  { id: 'all', label: 'All Ages' },
  { id: 'TIER_0_INFANCY_TODDLER_0_3', label: '0–3 yrs (Toddler)' },
  { id: 'TIER_1_EARLY_CHILDHOOD_4_6', label: '4–6 yrs (Preschool)' },
  { id: 'TIER_2_MIDDLE_CHILDHOOD_7_9', label: '7–9 yrs (Childhood)' },
  { id: 'TIER_3_PRE_TEEN_10_12', label: '10–12 yrs (Pre-Teen)' },
  { id: 'TIER_4_EARLY_ADOLESCENCE_13_15', label: '13–15 yrs (Teens)' },
  { id: 'TIER_5_LATE_ADOLESCENCE_16_18', label: '16–18 yrs (Older Teen)' },
];

interface BehaviorDashboardViewProps {
  initialChildId?: string;
}

export function BehaviorDashboardView({ initialChildId }: BehaviorDashboardViewProps) {
  const { children, activeChildId, setActiveChild } = useChildContextStore();
  const childAge = useChildAge();

  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTier, setSelectedTier] = React.useState<string>(childAge.developmentalTier);
  const [isViewingAllAges, setIsViewingAllAges] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [isHaltModalOpen, setIsHaltModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'scripts' | 'halt' | 'guide'>('scripts');

  // Sync initial child ID if passed via query
  React.useEffect(() => {
    if (initialChildId && activeChildId !== initialChildId) {
      setActiveChild(initialChildId);
    }
  }, [initialChildId, activeChildId, setActiveChild]);

  // Sync tier filter when child changes unless in explicit "View All Ages" mode
  React.useEffect(() => {
    if (!isViewingAllAges) {
      setSelectedTier(childAge.developmentalTier);
    }
  }, [childAge.developmentalTier, isViewingAllAges]);

  // Surface top 3-4 dilemmas calibrated for child's age
  const prioritizedDilemmas = React.useMemo(() => {
    if (childAge.ageYears <= 6) {
      // Toddler / Preschool
      return [
        { id: 'tantrums', label: 'Tantrums & Meltdowns' },
        { id: 'defiance', label: 'Defiance & "No!"' },
        { id: 'aggression', label: 'Hitting & Biting' },
      ];
    }
    if (childAge.ageYears <= 9) {
      // Elementary
      return [
        { id: 'sibling', label: 'Sibling Fighting' },
        { id: 'lying', label: 'Lying & Secrecy' },
        { id: 'bedtime', label: 'Bedtime Stalls' },
      ];
    }
    // Pre-Teen / Teen
    return [
      { id: 'defiance', label: 'Digital Defiance & Autonomy' },
      { id: 'sibling', label: 'Peer & Group Chat Drama' },
      { id: 'lying', label: 'Secrecy & Privacy Boundaries' },
    ];
  }, [childAge.ageYears]);

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

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
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
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Translating tantrums into underlying needs (HALT diagnostic), word-for-word calming co-regulation scripts, and authoritative "Time-Ins".
          </p>
        </div>

        {/* 1-Tap Emergency HALT Diagnostic Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            type="button"
            onClick={() => setIsHaltModalOpen(true)}
            className="min-h-[44px] gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs text-xs cursor-pointer"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>1-Tap HALT Diagnostic</span>
          </Button>

          <Link href="/advisor">
            <Button
              variant="outline"
              className="min-h-[44px] gap-2 text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
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
            {childAge.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Co-Regulation Guidance
              </h2>
              <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-bold text-teal-900 border border-teal-200">
                {childAge.ageDisplay}
              </span>
              {childAge.isAutoCalibrated && (
                <Badge
                  variant="outline"
                  className="text-[10px] bg-white text-teal-800 border-teal-300 font-bold"
                >
                  Auto-Calibrated
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-600">
              Calibrated co-regulation tools for this developmental stage
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
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all min-h-[32px] cursor-pointer ${
                  child.id === activeChildId
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
            label: 'Authoritative "Time-Ins" & Limits',
            icon: <Shield className="h-4 w-4" />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] cursor-pointer ${
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

          {/* Expanded Tier Options when "View All Ages" is selected */}
          {isViewingAllAges && (
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Select Age Stage:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsViewingAllAges(false);
                    setSelectedTier(childAge.developmentalTier);
                  }}
                  className="text-xs text-teal-700 hover:text-teal-900 font-bold cursor-pointer"
                >
                  Reset to {childAge.name} ({childAge.ageDisplay})
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {TIER_OPTIONS.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedTier === tier.id
                        ? 'bg-teal-700 text-white shadow-2xs font-bold'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search & Age-Prioritized Dilemmas Toolbar */}
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search dilemma (e.g. 'grocery tantrum', 'hitting', 'bedtime refusal', 'screen time')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 min-h-[44px] bg-slate-50 border-slate-200 text-xs sm:text-sm"
              />
            </div>

            {/* Age-Prioritized Dilemma Pills & Browse All Dropdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    {isViewingAllAges ? 'All Age Dilemmas:' : 'Calibrated Dilemmas:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (isViewingAllAges) {
                        setIsViewingAllAges(false);
                        setSelectedTier(childAge.developmentalTier);
                      } else {
                        setIsViewingAllAges(true);
                        setSelectedTier('all');
                      }
                    }}
                    className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 hover:underline cursor-pointer"
                  >
                    {isViewingAllAges ? 'Filter to ' + childAge.name : 'View All Ages'}
                  </button>
                </div>
                {selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-teal-700 hover:underline font-semibold cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[36px] cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  All Dilemmas
                </button>

                {/* Surface top 3-4 age-prioritized dilemmas */}
                {prioritizedDilemmas.map((sit) => (
                  <button
                    key={sit.id}
                    type="button"
                    onClick={() => setSelectedCategory(sit.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[36px] cursor-pointer ${
                      selectedCategory === sit.id
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-teal-50/80 hover:bg-teal-100/80 text-teal-900 border border-teal-200/60'
                    }`}
                  >
                    {sit.label}
                  </button>
                ))}

                {/* Clean dropdown selector for all dilemmas */}
                <div className="relative inline-block ml-auto sm:ml-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Browse all dilemmas"
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-teal-600 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Browse all dilemmas (7)...</option>
                    {ALL_SITUATIONS.filter((s) => s.id !== 'all').map((sit) => (
                      <option key={sit.id} value={sit.id}>
                        {sit.label}
                      </option>
                    ))}
                  </select>
                </div>
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
                  setIsViewingAllAges(true);
                  setSearchQuery('');
                }}
                className="text-teal-700 hover:underline font-semibold cursor-pointer"
              >
                Reset All Filters
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
                size="sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTier('all');
                  setIsViewingAllAges(true);
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGuides.map((guide) => (
                <DeEscalationScriptCard
                  key={guide.id}
                  guide={guide}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HALT DIAGNOSTIC */}
      {activeTab === 'halt' && (
        <div className="space-y-6">
          <Card className="border-teal-200/90 bg-gradient-to-br from-teal-50/60 to-emerald-50/40 p-6 sm:p-8 space-y-4">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-300 bg-white/80 px-3 py-1 text-xs font-bold text-teal-800">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                <span>The Core Pediatric Co-Regulation Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                The HALT Diagnostic Framework
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Before reacting to defiance, rudeness, or explosive tears, run the HALT vulnerability check. 92% of acute behavioral breakdowns are neurobiological vulnerabilities, not deliberate defiance.
              </p>
            </div>

            <Button
              onClick={() => setIsHaltModalOpen(true)}
              className="gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold shadow-xs cursor-pointer"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Launch 60-Second HALT Assessment</span>
            </Button>
          </Card>
        </div>
      )}

      {/* TAB 3: AUTHORITATIVE LIMITS */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          <AuthoritativeParentingGuide />
        </div>
      )}

      {/* HALT Diagnostic Modal */}
      <HaltDiagnosticModal
        open={isHaltModalOpen}
        onOpenChange={setIsHaltModalOpen}
      />
    </div>
  );
}
