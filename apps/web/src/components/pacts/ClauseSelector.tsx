'use client';

import * as React from 'react';
import {
  ClauseCategory,
  CommitmentParty,
  type AgreementClauseInput,
} from '@alongside/shared';
import {
  Clock,
  ShieldAlert,
  Smartphone,
  CreditCard,
  Eye,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { usePactStore } from '@/stores/usePactStore';
import { cn } from '@/lib/utils';

export interface CategoryMeta {
  key: ClauseCategory;
  label: string;
  icon: React.ElementType;
  description: string;
  rationale: string;
}

export const CATEGORY_DEFINITIONS: CategoryMeta[] = [
  {
    key: ClauseCategory.SCREEN_TIME,
    label: 'Screen Time & Digital Balance',
    icon: Smartphone,
    description: 'Reasonable weekday and weekend time budgets for recreational screen play.',
    rationale:
      'Replacing open-ended screen bingeing with explicit, predictable boundaries protects hobbies and analog focus.',
  },
  {
    key: ClauseCategory.DEVICE_CURFEW,
    label: 'Bedtime Curfew & Charging Dock',
    icon: Clock,
    description: 'Evening app shutdown and docking screens away from sleeping areas.',
    rationale:
      'Tween melatonin secretion naturally occurs 2 hours later than adults. Removing blue light protects deep REM sleep.',
  },
  {
    key: ClauseCategory.PRIVACY_SAFETY,
    label: 'Open-Door Safety & Safe Harbor',
    icon: ShieldAlert,
    description: 'Protection from predatory contacts, phishing, and unpunished mistake reporting.',
    rationale:
      'When children fear immediate phone confiscation, they hide online trauma. Safe harbor keeps parents as first responders.',
  },
  {
    key: ClauseCategory.PURCHASES_CHATS,
    label: 'Purchases & Group Chat Dignity',
    icon: CreditCard,
    description: 'No hidden microtransactions and maintaining empathy inside fast-moving group texts.',
    rationale:
      'In-game microtransactions weaponize variable reward loops. Group chat agreements prevent bystander exclusion.',
  },
  {
    key: ClauseCategory.CONTENT_BOUNDARIES,
    label: 'Content Boundaries & App Reviews',
    icon: Eye,
    description: 'Collaborative verification of app age ratings, algorithm feeds, and chat settings.',
    rationale:
      'Reviewing new apps together builds critical discernment before algorithms can push extreme rabbit holes.',
  },
  {
    key: ClauseCategory.PARENT_COMMITMENT,
    label: 'Parent Commitments & Modeling',
    icon: HeartHandshake,
    description: 'Parent pledges: zero stealth surveillance, dinner screen bans, and no-shame recovery.',
    rationale:
      'Agreements only succeed when bilateral. When parents model device discipline, tween resistance drops by 68%.',
  },
];

export function ClauseSelector() {
  const { clauses, toggleClause, addCustomClause, removeClause, childName } =
    usePactStore();

  const [expandedCategories, setExpandedCategories] = React.useState<
    Record<string, boolean>
  >({
    [ClauseCategory.SCREEN_TIME]: true,
    [ClauseCategory.DEVICE_CURFEW]: true,
    [ClauseCategory.PRIVACY_SAFETY]: true,
    [ClauseCategory.PARENT_COMMITMENT]: true,
  });

  const [showCustomModal, setShowCustomModal] = React.useState(false);
  const [customTitle, setCustomTitle] = React.useState('');
  const [customDescription, setCustomDescription] = React.useState('');
  const [customCategory, setCustomCategory] = React.useState<ClauseCategory>(
    ClauseCategory.PARENT_COMMITMENT
  );
  const [customParty, setCustomParty] = React.useState<CommitmentParty>(
    CommitmentParty.PARENT
  );

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

  const isClauseActive = (clauseTitle: string) => {
    return clauses.some((c) => c.title === clauseTitle);
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customDescription.trim()) return;

    addCustomClause({
      category: customCategory,
      party: customParty,
      title: customTitle.trim(),
      description: customDescription.trim(),
    });

    setCustomTitle('');
    setCustomDescription('');
    setShowCustomModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Empathetic Introduction Card */}
      <div className="rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50/70 via-cream-50 to-emerald-50/50 p-5">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white shadow-sm">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Co-Negotiated Agreement Clauses
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Family pacts are not unilateral rulebooks handed down from above.
              Review these clauses together with{' '}
              <span className="font-semibold text-slate-800">
                {childName || 'your child'}
              </span>
              . Toggle clauses on or off, edit parameters, and add your own custom
              family commitments.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Accordion */}
      <div className="space-y-4">
        {CATEGORY_DEFINITIONS.map((meta) => {
          const Icon = meta.icon;
          const isExpanded = !!expandedCategories[meta.key];
          const categoryClauses = clauses.filter(
            (c) => c.category === meta.key
          );
          const activeCount = categoryClauses.length;

          return (
            <div
              key={meta.key}
              className="rounded-xl border border-slate-200/90 bg-white shadow-sm overflow-hidden transition-all"
            >
              {/* Category Header */}
              <button
                type="button"
                onClick={() => toggleCategory(meta.key)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50/80 transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
                      meta.key === ClauseCategory.PARENT_COMMITMENT
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-teal-100 text-teal-800'
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {meta.label}
                      </h4>
                      <Badge
                        variant={activeCount > 0 ? 'default' : 'secondary'}
                        className="text-[10px] py-0 px-2"
                      >
                        {activeCount} {activeCount === 1 ? 'clause' : 'clauses'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                      {meta.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  )}
                </div>
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-4 sm:p-5 space-y-3 bg-slate-50/30">
                  {/* Pediatric Rationale Insight */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-100">
                    <HelpCircle className="h-4 w-4 shrink-0 text-teal-600" />
                    <span>
                      <strong className="text-slate-700">Why this matters:</strong>{' '}
                      {meta.rationale}
                    </span>
                  </div>

                  {/* Clause Items */}
                  <div className="space-y-3 pt-1">
                    {categoryClauses.length === 0 ? (
                      <div className="text-center py-4 text-xs text-slate-500 italic">
                        No active clauses in this category. You can add a custom clause below.
                      </div>
                    ) : (
                      categoryClauses.map((clause) => {
                        const active = isClauseActive(clause.title);
                        const isParent = clause.party === CommitmentParty.PARENT;

                        return (
                          <div
                            key={clause.title}
                            className={cn(
                              'relative rounded-xl border p-4 transition-all',
                              active
                                ? isParent
                                  ? 'border-amber-200 bg-amber-50/30 shadow-xs'
                                  : 'border-teal-200 bg-teal-50/30 shadow-xs'
                                : 'border-slate-200 bg-white opacity-60'
                            )}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1.5 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge
                                    variant={isParent ? 'accent' : 'default'}
                                    className="text-[10px]"
                                  >
                                    {isParent
                                      ? 'Parent Commitment'
                                      : `${childName || 'Child'} Commitment`}
                                  </Badge>

                                  {clause.isCustom && (
                                    <Badge variant="outline" className="text-[10px]">
                                      Custom Family Clause
                                    </Badge>
                                  )}

                                  <h5 className="text-sm font-bold text-slate-900">
                                    {clause.title}
                                  </h5>
                                </div>

                                <p className="text-xs text-slate-600 leading-relaxed">
                                  {clause.description}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {clause.isCustom && (
                                  <button
                                    type="button"
                                    onClick={() => removeClause(clause.title)}
                                    className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                                    title="Delete custom clause"
                                    aria-label={`Delete custom clause ${clause.title}`}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                )}

                                {/* Accessible Toggle Button */}
                                <button
                                  type="button"
                                  role="switch"
                                  aria-checked={active}
                                  onClick={() => toggleClause(clause)}
                                  className={cn(
                                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2',
                                    active
                                      ? isParent
                                        ? 'bg-amber-600'
                                        : 'bg-teal-600'
                                      : 'bg-slate-300'
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                      active ? 'translate-x-5' : 'translate-x-0'
                                    )}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Clause Section */}
      <div className="pt-2">
        {!showCustomModal ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowCustomModal(true)}
            className="w-full border-dashed border-slate-300 py-3 text-xs gap-2 text-slate-700 hover:border-teal-500 hover:text-teal-700"
          >
            <Plus className="h-4 w-4" />
            Add Custom Family Clause or Parent Commitment
          </Button>
        ) : (
          <form
            onSubmit={handleCreateCustom}
            className="rounded-xl border border-teal-200 bg-white p-5 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-900">
                Draft a Custom Family Clause
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomModal(false)}
                className="text-xs text-slate-500 h-7"
              >
                Cancel
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Responsible Party
                </label>
                <select
                  value={customParty}
                  onChange={(e) =>
                    setCustomParty(e.target.value as CommitmentParty)
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 min-h-[44px]"
                >
                  <option value={CommitmentParty.CHILD}>
                    {childName || 'Child'} Commitment
                  </option>
                  <option value={CommitmentParty.PARENT}>
                    Parent Commitment
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Agreement Category
                </label>
                <select
                  value={customCategory}
                  onChange={(e) =>
                    setCustomCategory(e.target.value as ClauseCategory)
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 min-h-[44px]"
                >
                  {CATEGORY_DEFINITIONS.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clause Title
              </label>
              <Input
                placeholder="e.g. Sunday Morning Screen-Free Hike"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description & Mutual Promise
              </label>
              <textarea
                rows={3}
                placeholder="Describe the agreed expectation and how parents and child support each other..."
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCustomModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Add to Agreement
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
