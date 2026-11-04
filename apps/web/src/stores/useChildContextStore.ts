import { create } from 'zustand';
import {
  type ChildDTO,
  RoadType,
  DevelopmentalTier,
} from '@alongside/shared';
import { getChildren } from '@/lib/api/children';

export const ACTIVE_CHILD_STORAGE_KEY = 'alongside_active_child_id';

export interface DevelopmentalHorizonInfo {
  horizon: string;
  subtitle: string;
  stage: string;
  tierLabel: string;
  badgeColor: string;
}

/**
 * Pure helper to read active child ID from URL search parameter or localStorage safely.
 */
export function getStoredActiveChildId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const queryChildId = urlParams.get('childId');
    if (queryChildId && queryChildId.trim().length > 0) {
      return queryChildId.trim();
    }
    return window.localStorage.getItem(ACTIVE_CHILD_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Pure helper to format a child's age in human-friendly shorthand (e.g., "14 mo", "8 yrs").
 */
export function formatChildAge(child: {
  age: number;
  birthYear?: number;
  birthMonth?: number;
}): string {
  if (child.birthYear && child.birthMonth) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-12
    const totalMonths = (currentYear - child.birthYear) * 12 + (currentMonth - child.birthMonth);
    if (totalMonths >= 0 && totalMonths < 24) {
      return `${Math.max(1, totalMonths)} mo`;
    }
  }

  if (child.age === 0) return '< 1 yr';
  if (child.age === 1) return '1 yr';
  return `${child.age} yrs`;
}

/**
 * Pure helper to return the developmental horizon, subtitle, and stage by age or tier.
 */
export function getChildDevelopmentalHorizon(
  tierOrAge: string | number | DevelopmentalTier
): DevelopmentalHorizonInfo {
  let age = typeof tierOrAge === 'number' ? tierOrAge : 8;

  if (typeof tierOrAge === 'string') {
    if (tierOrAge.includes('TIER_0') || tierOrAge.includes('0_3')) age = 2;
    else if (tierOrAge.includes('TIER_1_EARLY') || tierOrAge.includes('4_6')) age = 5;
    else if (tierOrAge.includes('TIER_2_MIDDLE') || tierOrAge.includes('7_9')) age = 8;
    else if (tierOrAge.includes('TIER_1_AGES_8_9')) age = 8;
    else if (tierOrAge.includes('TIER_3_PRE_TEEN') || tierOrAge.includes('10_12')) age = 11;
    else if (tierOrAge.includes('TIER_2_AGES_10_11')) age = 11;
    else if (tierOrAge.includes('TIER_4_EARLY_ADOLESCENCE') || tierOrAge.includes('13_15')) age = 14;
    else if (tierOrAge.includes('TIER_3_AGES_12_13')) age = 13;
    else if (tierOrAge.includes('TIER_5_LATE') || tierOrAge.includes('16_18') || tierOrAge.includes('TIER_4_AGES_14_PLUS')) age = 16;
  }

  if (age <= 3) {
    return {
      horizon: 'Speech, Sensory Play & Walking Window',
      subtitle: 'Sensory-motor discovery, first 50 words, safe baby-led weaning & emotional co-regulation.',
      stage: 'Infancy & Toddlerhood (0–3 yrs)',
      tierLabel: 'Tier 0: Infancy & Toddler',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    };
  }

  if (age <= 6) {
    return {
      horizon: 'Curiosity & Purposeful Play Window',
      subtitle: 'Puppet emotional sparring, social turn-taking, gross motor agility & boundless imagination.',
      stage: 'Early Childhood (4–6 yrs)',
      tierLabel: 'Tier 1: Early Childhood',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    };
  }

  if (age <= 9) {
    return {
      horizon: 'Social Bonds & Elementary Autonomy Window',
      subtitle: 'Peer friendship resilience, schoolwork habits, logic brain games & authoritative boundaries.',
      stage: 'Middle Childhood (7–9 yrs)',
      tierLabel: 'Tier 2: Middle Childhood',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    };
  }

  if (age <= 12) {
    return {
      horizon: 'Tween Identity & First-Phone Readiness Window',
      subtitle: 'First-phone readiness assessment, dopamine awareness & youth culture decoding.',
      stage: 'Pre-Teen Transition (10–12 yrs)',
      tierLabel: 'Tier 3: Pre-Teen',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    };
  }

  if (age <= 15) {
    return {
      horizon: 'Adolescent Independence & Curfew Horizon',
      subtitle: 'Bilateral Pact-as-Code agreements, automated 8:30 PM curfews & peer culture mentorship.',
      stage: 'Early Adolescence (13–15 yrs)',
      tierLabel: 'Tier 4: Early Teen',
      badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
    };
  }

  return {
    horizon: 'Young Adult Transition Horizon',
    subtitle: 'Executive function maturity, digital self-regulation, high school graduation & career launching.',
    stage: 'Late Adolescence (16–18 yrs)',
    tierLabel: 'Tier 5: Young Adult',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  };
}

/**
 * Pure Selector: Returns the currently active child, or first child in list, or null.
 */
export function selectActiveChild(state: {
  children: ChildDTO[];
  activeChildId: string | null;
}): ChildDTO | null {
  if (!state.children || state.children.length === 0) return null;
  if (!state.activeChildId) return state.children[0] ?? null;
  const match = state.children.find((c) => c.id === state.activeChildId);
  return match ?? state.children[0] ?? null;
}

/**
 * Pure Selector: Returns the active child's developmental tier or null.
 */
export function selectActiveTier(state: {
  children: ChildDTO[];
  activeChildId: string | null;
}): string | null {
  const active = selectActiveChild(state);
  return active ? active.developmentalTier : null;
}

/**
 * Fallback demo children providing immediate interactive utility across 0-18 spectrum
 */
export const DEMO_FAMILY_CHILDREN: ChildDTO[] = [
  {
    id: 'demo-child-mateo',
    userId: 'demo-parent',
    name: 'Mateo',
    birthYear: new Date().getFullYear() - 1,
    birthMonth: (new Date().getMonth() + 11) % 12 || 12, // ~14 months old
    age: 1,
    roadType: RoadType.PRE_DEVICE,
    developmentalTier: 'TIER_0_INFANCY_TODDLER_0_3' as unknown as DevelopmentalTier,
    schoolGrade: 'Infant Daycare',
    latestAssessmentScore: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-child-maya',
    userId: 'demo-parent',
    name: 'Maya',
    birthYear: new Date().getFullYear() - 8,
    birthMonth: 5,
    age: 8,
    roadType: RoadType.PRE_DEVICE,
    developmentalTier: DevelopmentalTier.TIER_1_AGES_8_9,
    schoolGrade: '3rd Grade',
    latestAssessmentScore: 74,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-child-julian',
    userId: 'demo-parent',
    name: 'Julian',
    birthYear: new Date().getFullYear() - 14,
    birthMonth: 2,
    age: 14,
    roadType: RoadType.ACTIVE_DEVICE,
    developmentalTier: DevelopmentalTier.TIER_4_AGES_14_PLUS,
    schoolGrade: '9th Grade (Freshman)',
    deviceProfileStatus: 'ACTIVE' as const,
    latestAssessmentScore: 92,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export interface ChildContextState {
  children: ChildDTO[];
  activeChildId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setActiveChild: (childId: string) => void;
  setChildren: (children: ChildDTO[]) => void;
  fetchChildren: () => Promise<void>;
  reset: () => void;
}

export const useChildContextStore = create<ChildContextState>((set, get) => ({
  children: [],
  activeChildId: getStoredActiveChildId(),
  isLoading: false,
  error: null,

  setActiveChild: (childId: string) => {
    set({ activeChildId: childId });
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(ACTIVE_CHILD_STORAGE_KEY, childId);
        // Sync URL parameter if on browser
        const url = new URL(window.location.href);
        if (url.searchParams.get('childId') !== childId) {
          url.searchParams.set('childId', childId);
          window.history.replaceState({}, '', url.toString());
        }
      } catch {
        // Safe SSR / storage fallback
      }
    }
  },

  setChildren: (children: ChildDTO[]) => {
    const currentActiveId = get().activeChildId;
    let newActiveId = currentActiveId;

    if (children.length > 0) {
      const stillExists = children.some((c) => c.id === currentActiveId);
      if (!stillExists) {
        newActiveId = children[0]?.id ?? null;
      }
    } else {
      newActiveId = null;
    }

    set({ children, activeChildId: newActiveId });
    if (newActiveId && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(ACTIVE_CHILD_STORAGE_KEY, newActiveId);
      } catch {
        // Safe fallback
      }
    }
  },

  fetchChildren: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await getChildren();
      const fetchedChildren = res?.children || [];
      get().setChildren(fetchedChildren.length > 0 ? fetchedChildren : DEMO_FAMILY_CHILDREN);
      set({ isLoading: false });
    } catch (err: unknown) {
      // Fallback gracefully to demo children if API is unseeded or network is offline
      const currentChildren = get().children;
      if (currentChildren.length === 0) {
        get().setChildren(DEMO_FAMILY_CHILDREN);
      }
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch children',
      });
    }
  },

  reset: () => {
    set({
      children: [],
      activeChildId: null,
      isLoading: false,
      error: null,
    });
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(ACTIVE_CHILD_STORAGE_KEY);
      } catch {
        // Safe fallback
      }
    }
  },
}));
