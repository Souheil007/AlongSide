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
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { usePactStore } from '@/stores/usePactStore';
import { cn } from '@/lib/utils';

export interface CategoryMeta {
  key: ClauseCategory;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  description: string;
  rationale: string;
}

export const CATEGORY_DEFINITIONS: CategoryMeta[] = [
  {
    key: ClauseCategory.SCREEN_TIME,
    label: 'Screen Time & Digital Balance',
    shortLabel: 'Daily balance',
    icon: Smartphone,
    description: 'Reasonable weekday and weekend time budgets for fun screen play.',
    rationale:
      'Replacing open-ended scrolling with predictable limits protects hobbies, sleep, and offline play.',
  },
  {
    key: ClauseCategory.DEVICE_CURFEW,
    label: 'Bedtime Curfew & Charging Dock',
    shortLabel: 'Bedtime dock',
    icon: Clock,
    description: 'Evening app shutdown and docking screens away from sleeping areas.',
    rationale:
      'Tween melatonin secretion naturally occurs later in the evening. Removing blue light protects deep sleep.',
  },
  {
    key: ClauseCategory.PRIVACY_SAFETY,
    label: 'Open-Door Safety & Safe Harbor',
    shortLabel: 'Safe harbor',
    icon: ShieldAlert,
    description: 'Protection from sketchy contacts, phishing, and unpunished mistake reporting.',
    rationale:
      'When children fear instant phone confiscation, they hide mistakes. Safe harbor keeps parents as first helpers.',
  },
  {
    key: ClauseCategory.PURCHASES_CHATS,
    label: 'Purchases & Group Chat Dignity',
    shortLabel: 'Spending & chats',
    icon: CreditCard,
    description: 'Asking before spending and keeping group texts kind and respectful.',
    rationale:
      'In-game purchases use fast impulse loops, and clear chat norms help kids step away from group drama.',
  },
  {
    key: ClauseCategory.CONTENT_BOUNDARIES,
    label: 'Content Boundaries & App Reviews',
    shortLabel: 'Apps & games',
    icon: Eye,
    description: 'Checking new apps, age ratings, and chat settings side by side.',
    rationale:
      'Reviewing new apps together builds real judgment before algorithms pull kids down intense rabbit holes.',
  },
  {
    key: ClauseCategory.PARENT_COMMITMENT,
    label: 'Parent Commitments & Modeling',
    shortLabel: 'Parent promise',
    icon: HeartHandshake,
    description: 'Parent pledges: zero stealth surveillance, screen-free meals, and calm recovery.',
    rationale:
      'Agreements work best when bilateral. When parents model screen habits too, household pushback drops dramatically.',
  },
];

const QUICK_CUSTOM_IDEAS: Array<{
  party: CommitmentParty;
  category: ClauseCategory;
  title: string;
  description: string;
}> = [
  {
    party: CommitmentParty.PARENT,
    category: ClauseCategory.PARENT_COMMITMENT,
    title: 'Ask before posting family photos',
    description:
      'Parents will ask before sharing photos or stories of you on social media, because your privacy matters too.',
  },
  {
    party: CommitmentParty.CHILD,
    category: ClauseCategory.SCREEN_TIME,
    title: 'No screens on the ride to school',
    description:
      'Morning rides to school stay screen-free so we can talk, listen to music together, or wake up calmly.',
  },
  {
    party: CommitmentParty.PARENT,
    category: ClauseCategory.PARENT_COMMITMENT,
    title: 'Weekly 10-minute pact check-in',
    description:
      'Every Sunday we check what is working and what feels unfair, and adjust the pact as you grow.',
  },
];

type PartyFilter = 'ALL' | CommitmentParty;

export function ClauseSelector() {
  const {
    clauses,
    catalogClauses,
    toggleClause,
    updateClause,
    addCustomClause,
    removeClause,
    childName,
  } = usePactStore();

  const [partyFilter, setPartyFilter] = React.useState<PartyFilter>('ALL');
  const [editingTitle, setEditingTitle] = React.useState<string | null>(null);
  const [editDraftTitle, setEditDraftTitle] = React.useState('');
  const [editDraftDescription, setEditDraftDescription] = React.useState('');

  const [showCustomForm, setShowCustomForm] = React.useState(false);
  const [customTitle, setCustomTitle] = React.useState('');
  const [customDescription, setCustomDescription] = React.useState('');
  const [customCategory, setCustomCategory] = React.useState<ClauseCategory>(
    ClauseCategory.PARENT_COMMITMENT
  );
  const [customParty, setCustomParty] = React.useState<CommitmentParty>(
    CommitmentParty.PARENT
  );

  // Use catalogClauses so toggling a promise OFF keeps it visible and toggleable back ON
  const allDisplayClauses = React.useMemo(() => {
    const base = catalogClauses.length > 0 ? [...catalogClauses] : [...clauses];
    for (const activeClause of clauses) {
      if (!base.some((c) => c.title === activeClause.title)) {
        base.push(activeClause);
      }
    }
    return base;
  }, [catalogClauses, clauses]);

  const activeTitles = React.useMemo(
    () => new Set(clauses.map((c) => c.title)),
    [clauses]
  );

  const activeChildCount = clauses.filter(
    (c) => c.party === CommitmentParty.CHILD
  ).length;
  const activeParentCount = clauses.filter(
    (c) => c.party === CommitmentParty.PARENT
  ).length;

  const childCatalog = allDisplayClauses.filter(
    (c) => c.party === CommitmentParty.CHILD
  );
  const parentCatalog = allDisplayClauses.filter(
    (c) => c.party === CommitmentParty.PARENT
  );

  const startEditing = (clause: AgreementClauseInput) => {
    setEditingTitle(clause.title);
    setEditDraftTitle(clause.title);
    setEditDraftDescription(clause.description);
  };

  const saveEdit = (originalTitle: string) => {
    const trimmedTitle = editDraftTitle.trim();
    const trimmedDesc = editDraftDescription.trim();
    if (!trimmedTitle || !trimmedDesc) return;
    const isDuplicateTitle =
      trimmedTitle !== originalTitle &&
      allDisplayClauses.some((c) => c.title === trimmedTitle);
    if (isDuplicateTitle) return;
    updateClause(originalTitle, {
      title: trimmedTitle,
      description: trimmedDesc,
    });
    setEditingTitle(null);
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
    setShowCustomForm(false);
  };

  const applyQuickIdea = (idea: (typeof QUICK_CUSTOM_IDEAS)[number]) => {
    if (allDisplayClauses.some((c) => c.title === idea.title)) {
      if (!activeTitles.has(idea.title)) {
        toggleClause({
          ...idea,
          isStandard: false,
          isCustom: true,
          sortOrder: allDisplayClauses.length,
        });
      }
      return;
    }
    addCustomClause(idea);
  };

  const renderClauseRow = (clause: AgreementClauseInput) => {
    const isActive = activeTitles.has(clause.title);
    const isParent = clause.party === CommitmentParty.PARENT;
    const isEditing = editingTitle === clause.title;
    const categoryMeta = CATEGORY_DEFINITIONS.find(
      (cat) => cat.key === clause.category
    );

    if (isEditing) {
      return (
        <div
          key={clause.title}
          className="rounded-[14px] border border-[var(--spruce)] bg-[var(--elevated)] p-4 sm:p-5 space-y-3"
        >
          <div className="space-y-1">
            <label className="block text-[12px] font-semibold text-[var(--ink)]">
              Promise title
            </label>
            <Input
              value={editDraftTitle}
              onChange={(e) => setEditDraftTitle(e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[12px] font-semibold text-[var(--ink)]">
              In your family&apos;s words
            </label>
            <textarea
              rows={3}
              value={editDraftDescription}
              onChange={(e) => setEditDraftDescription(e.target.value)}
              className="w-full rounded-[8px] border border-[var(--hairline)] bg-[var(--canvas)] px-3.5 py-2.5 text-[14px] leading-relaxed text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setEditingTitle(null)}
              className="gap-1 min-h-[40px]"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Cancel</span>
            </Button>
            <Button
              type="button"
              variant="forest"
              size="sm"
              onClick={() => saveEdit(clause.title)}
              className="gap-1 min-h-[40px]"
            >
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Save wording</span>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div
        key={clause.title}
        className={cn(
          'rounded-[14px] border p-4 sm:p-5 transition-colors duration-150',
          isActive
            ? isParent
              ? 'border-[var(--amber-border)] bg-[var(--elevated)]'
              : 'border-[var(--spruce-border)] bg-[var(--elevated)]'
            : 'border-[var(--hairline)] bg-[var(--canvas-subtle)]/70 opacity-75'
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'h-2 w-2 rounded-full shrink-0',
                  isActive
                    ? isParent
                      ? 'bg-[var(--amber)]'
                      : 'bg-[var(--spruce)]'
                    : 'bg-[var(--mute)]'
                )}
                aria-hidden="true"
              />
              <span className="text-[12px] font-medium text-[var(--mute)]">
                {categoryMeta?.shortLabel || 'Family promise'}
                {clause.isCustom ? ' · Added by you' : ''}
                {!isActive ? ' · Paused' : ''}
              </span>
            </div>

            <h4 className="text-[15px] font-semibold leading-snug text-[var(--ink)]">
              {clause.title}
            </h4>

            <p className="text-[13.5px] leading-[1.55] text-[var(--body)]">
              {clause.description}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => startEditing(clause)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] text-[var(--mute)] transition-colors hover:bg-[var(--canvas-subtle)] hover:text-[var(--ink)] cursor-pointer"
              aria-label={`Edit wording for ${clause.title}`}
              title="Edit wording"
            >
              <Pencil className="h-4 w-4" aria-hidden="true" />
            </button>

            {clause.isCustom && (
              <button
                type="button"
                onClick={() => removeClause(clause.title)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] text-[var(--mute)] transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
                aria-label={`Remove custom promise ${clause.title}`}
                title="Remove custom promise"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            )}

            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              aria-label={`Include promise: ${clause.title}`}
              onClick={() => toggleClause(clause)}
              className="inline-flex min-h-[44px] items-center justify-center pl-1 cursor-pointer focus-visible:outline-none group"
            >
              <span
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 group-focus-visible:ring-2 group-focus-visible:ring-[var(--spruce)] group-focus-visible:ring-offset-2',
                  isActive
                    ? isParent
                      ? 'bg-[var(--amber)]'
                      : 'bg-[var(--spruce)]'
                    : 'bg-[#c9c6bc]'
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200',
                    isActive ? 'translate-x-5' : 'translate-x-0'
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const showChildSection =
    partyFilter === 'ALL' || partyFilter === CommitmentParty.CHILD;
  const showParentSection =
    partyFilter === 'ALL' || partyFilter === CommitmentParty.PARENT;

  return (
    <div className="space-y-6">
      {/* Bilateral Balance Intro + Filter Bar */}
      <div className="rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)] overflow-hidden">
        <div className="bg-[var(--trigger-bg)] border-b border-[var(--hairline-soft)] px-5 py-5 sm:px-7 sm:py-6 space-y-2">
          <span className="text-[13px] font-semibold text-[var(--spruce)]">
            A real deal goes both ways
          </span>
          <h2 className="font-serif-almanac text-[22px] sm:text-[26px] font-semibold leading-[1.2] text-[var(--ink)]">
            Choose promises together with {childName || 'your child'}
          </h2>
          <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[58ch]">
            Read these out loud side by side. Toggle anything on or off, or tap the pencil
            to rewrite a promise in your own family&apos;s words.
          </p>
        </div>

        {/* Live Two-Sided Counter & View Filter */}
        <div className="px-5 py-4 sm:px-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--elevated)]">
          <div className="flex flex-wrap items-center gap-4 text-[13px] tabular-nums">
            <span className="inline-flex items-center gap-2 font-medium text-[var(--ink)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--spruce)]" aria-hidden="true" />
              {childName || 'Child'}: <strong>{activeChildCount}</strong>
            </span>
            <span className="inline-flex items-center gap-2 font-medium text-[var(--ink)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--amber)]" aria-hidden="true" />
              Parents: <strong>{activeParentCount}</strong>
            </span>
          </div>

          <div
            role="group"
            aria-label="Filter promises by party"
            className="inline-flex rounded-[10px] border border-[var(--hairline)] bg-[var(--canvas-subtle)] p-1 self-start sm:self-auto"
          >
            {(
              [
                { id: 'ALL' as const, label: `Both sides (${clauses.length})` },
                {
                  id: CommitmentParty.CHILD,
                  label: `${childName || 'Child'} (${activeChildCount})`,
                },
                {
                  id: CommitmentParty.PARENT,
                  label: `Parents (${activeParentCount})`,
                },
              ]
            ).map((tab) => {
              const selected = partyFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPartyFilter(tab.id)}
                  aria-pressed={selected}
                  className={cn(
                    'min-h-[36px] rounded-[7px] px-3 py-1.5 text-[12.5px] font-medium transition-colors cursor-pointer tabular-nums',
                    selected
                      ? 'bg-[var(--elevated)] text-[var(--ink)] font-semibold shadow-2xs'
                      : 'text-[var(--body)] hover:text-[var(--ink)]'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Child's Promises Section */}
      {showChildSection && (
        <section className="space-y-3" aria-label={`${childName || 'Child'}'s promises`}>
          <div className="flex items-baseline justify-between gap-2 px-1">
            <div>
              <h3 className="font-serif-almanac text-[20px] font-semibold text-[var(--ink)]">
                What {childName || 'your child'} agrees to
              </h3>
              <p className="text-[13px] text-[var(--mute)]">
                Clear, predictable habits that earn more independence over time.
              </p>
            </div>
            <span className="text-[12.5px] font-semibold text-[var(--spruce)] tabular-nums shrink-0">
              {activeChildCount} active
            </span>
          </div>

          <div className="space-y-2.5">{childCatalog.map(renderClauseRow)}</div>
        </section>
      )}

      {/* Parents' Promises Section */}
      {showParentSection && (
        <section className="space-y-3 pt-1" aria-label="Parents' promises">
          <div className="flex items-baseline justify-between gap-2 px-1">
            <div>
              <h3 className="font-serif-almanac text-[20px] font-semibold text-[var(--ink)]">
                What parents agree to
              </h3>
              <p className="text-[13px] text-[var(--mute)]">
                Kids buy in when grown-ups put skin in the game too.
              </p>
            </div>
            <span className="text-[12.5px] font-semibold text-[var(--amber)] tabular-nums shrink-0">
              {activeParentCount} active
            </span>
          </div>

          <div className="space-y-2.5">{parentCatalog.map(renderClauseRow)}</div>
        </section>
      )}

      {/* Quick Ideas & Custom Promise Composer */}
      <section className="rounded-[16px] border border-[var(--hairline)] bg-[var(--elevated)] p-5 sm:p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-[15px] font-semibold text-[var(--ink)]">
            Make it yours
          </h3>
          <p className="text-[13px] text-[var(--body)]">
            Add a popular family rule with one tap, or write your own promise below.
          </p>
        </div>

        {/* One-Tap Quick Family Ideas */}
        <div className="flex flex-wrap gap-2">
          {QUICK_CUSTOM_IDEAS.map((idea) => {
            const alreadyAdded = activeTitles.has(idea.title);
            return (
              <button
                key={idea.title}
                type="button"
                onClick={() => applyQuickIdea(idea)}
                disabled={alreadyAdded}
                className={cn(
                  'inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors cursor-pointer',
                  alreadyAdded
                    ? 'border-[var(--spruce-border)] bg-[var(--spruce-soft)] text-[var(--spruce)] cursor-default'
                    : 'border-[var(--hairline)] bg-[var(--canvas)] text-[var(--ink)] hover:border-[var(--spruce)]'
                )}
              >
                {alreadyAdded ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Plus className="h-3.5 w-3.5 text-[var(--spruce)]" aria-hidden="true" />
                )}
                <span>{idea.title}</span>
              </button>
            );
          })}
        </div>

        {!showCustomForm ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowCustomForm(true)}
            className="w-full border-dashed border-[var(--hairline)] gap-2 text-[13.5px] rounded-[10px]"
          >
            <Plus className="h-4 w-4 text-[var(--spruce)]" aria-hidden="true" />
            <span>Write a custom promise</span>
          </Button>
        ) : (
          <form
            onSubmit={handleCreateCustom}
            className="rounded-[14px] border border-[var(--spruce-border)] bg-[var(--canvas)] p-4 sm:p-5 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[var(--hairline-soft)] pb-3">
              <h4 className="text-[14px] font-semibold text-[var(--ink)]">
                Add a custom family promise
              </h4>
              <button
                type="button"
                onClick={() => setShowCustomForm(false)}
                className="text-[13px] font-medium text-[var(--mute)] hover:text-[var(--ink)] cursor-pointer min-h-[36px] px-2"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label
                  htmlFor="custom-promise-party"
                  className="block text-[12px] font-semibold text-[var(--ink)] mb-1.5"
                >
                  Whose promise is this?
                </label>
                <select
                  id="custom-promise-party"
                  value={customParty}
                  onChange={(e) =>
                    setCustomParty(e.target.value as CommitmentParty)
                  }
                  className="w-full min-h-[44px] rounded-[8px] border border-[var(--hairline)] bg-[var(--elevated)] px-3 py-2 text-[13.5px] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]"
                >
                  <option value={CommitmentParty.CHILD}>
                    {childName || 'Child'}&apos;s promise
                  </option>
                  <option value={CommitmentParty.PARENT}>
                    Parents&apos; promise
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="custom-promise-category"
                  className="block text-[12px] font-semibold text-[var(--ink)] mb-1.5"
                >
                  Topic
                </label>
                <select
                  id="custom-promise-category"
                  value={customCategory}
                  onChange={(e) =>
                    setCustomCategory(e.target.value as ClauseCategory)
                  }
                  className="w-full min-h-[44px] rounded-[8px] border border-[var(--hairline)] bg-[var(--elevated)] px-3 py-2 text-[13.5px] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]"
                >
                  {CATEGORY_DEFINITIONS.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.shortLabel}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="custom-promise-title"
                className="block text-[12px] font-semibold text-[var(--ink)] mb-1.5"
              >
                Short title
              </label>
              <Input
                id="custom-promise-title"
                placeholder="e.g. Sunday morning pancake breakfast with no phones"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="custom-promise-desc"
                className="block text-[12px] font-semibold text-[var(--ink)] mb-1.5"
              >
                What we both agree to do
              </label>
              <textarea
                id="custom-promise-desc"
                rows={3}
                placeholder="Write it clearly so everyone knows what keeping this promise looks like..."
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                required
                className="w-full rounded-[8px] border border-[var(--hairline)] bg-[var(--elevated)] p-3 text-[13.5px] leading-relaxed text-[var(--ink)] placeholder:text-[var(--mute)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCustomForm(false)}
                className="min-h-[42px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="forest"
                size="sm"
                className="gap-1.5 min-h-[42px] rounded-[8px]"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Add promise</span>
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
