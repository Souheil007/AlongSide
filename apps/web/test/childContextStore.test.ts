import { describe, expect, it, beforeEach } from 'vitest';
import {
  useChildContextStore,
  formatChildAge,
  getChildDevelopmentalHorizon,
  selectActiveChild,
  selectActiveTier,
  DEMO_FAMILY_CHILDREN,
  ACTIVE_CHILD_STORAGE_KEY,
} from '../src/stores/useChildContextStore';
import { RoadType, DevelopmentalTier, type ChildDTO } from '@alongside/shared';

describe('useChildContextStore Specification (PLAN-17)', () => {
  beforeEach(() => {
    useChildContextStore.getState().reset();
  });

  describe('formatChildAge Helper', () => {
    it('formats infant age in months when birthYear and birthMonth are provided (<24 mo)', () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1; // 1-indexed

      // Create a child born ~14 months ago
      let birthYear = currentYear - 1;
      let birthMonth = currentMonth - 2;
      if (birthMonth <= 0) {
        birthMonth += 12;
        birthYear -= 1;
      }

      const formatted = formatChildAge({
        age: 1,
        birthYear,
        birthMonth,
      });

      expect(formatted).toMatch(/14 mo/);
    });

    it('formats 0 years as < 1 yr when no birth month is available', () => {
      expect(formatChildAge({ age: 0 })).toBe('< 1 yr');
    });

    it('formats 1 year as 1 yr when older than 24 mo or no birth month', () => {
      expect(formatChildAge({ age: 1 })).toBe('1 yr');
    });

    it('formats multi-year ages correctly with yrs suffix', () => {
      expect(formatChildAge({ age: 8 })).toBe('8 yrs');
      expect(formatChildAge({ age: 14 })).toBe('14 yrs');
    });
  });

  describe('getChildDevelopmentalHorizon Helper', () => {
    it('resolves Tier 0 (0–3 yrs) speech and walking horizon for legacy tier', () => {
      const horizon = getChildDevelopmentalHorizon(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
      expect(horizon.horizon).toContain('Speech, Sensory Play & Walking Window');
      expect(horizon.stage).toContain('Infancy & Toddlerhood');
      expect(horizon.tierLabel).toContain('Tier 0');
    });

    it('resolves Tier 0A (0–1 yrs) somatic regulation horizon', () => {
      const horizon = getChildDevelopmentalHorizon(1);
      expect(horizon.horizon).toContain('Somatic Regulation & Sleep Architecture Window');
      expect(horizon.stage).toContain('Infancy');
      expect(horizon.tierLabel).toContain('Tier 0A');
    });

    it('resolves Tier 0B (1–2 yrs) locomotion horizon', () => {
      const horizon = getChildDevelopmentalHorizon(2);
      expect(horizon.horizon).toContain('Locomotion & Language Burst Window');
      expect(horizon.stage).toContain('Younger Toddlerhood');
      expect(horizon.tierLabel).toContain('Tier 0B');
    });

    it('resolves Tier 0C (2–3 yrs) autonomy horizon', () => {
      const horizon = getChildDevelopmentalHorizon(3);
      expect(horizon.horizon).toContain('Autonomy, Boundary Testing & Potty Learning Window');
      expect(horizon.stage).toContain('Older Toddlerhood');
      expect(horizon.tierLabel).toContain('Tier 0C');
    });

    it('resolves Tier 1 (4–6 yrs) curiosity and play horizon', () => {
      const horizon = getChildDevelopmentalHorizon(5);
      expect(horizon.horizon).toContain('Curiosity & Purposeful Play Window');
      expect(horizon.stage).toContain('Early Childhood');
    });

    it('resolves Tier 2 (7–9 yrs) social bonds and logic horizon', () => {
      const horizon = getChildDevelopmentalHorizon(8);
      expect(horizon.horizon).toContain('Social Bonds & Elementary Autonomy Window');
      expect(horizon.stage).toContain('Middle Childhood');
    });

    it('resolves Tier 3 (10–12 yrs) first-phone readiness horizon', () => {
      const horizon = getChildDevelopmentalHorizon(11);
      expect(horizon.horizon).toContain('Tween Identity & First-Phone Readiness Window');
      expect(horizon.stage).toContain('Pre-Teen');
    });

    it('resolves Tier 4 (13–15 yrs) adolescent curfew horizon', () => {
      const horizon = getChildDevelopmentalHorizon(14);
      expect(horizon.horizon).toContain('Adolescent Independence & Curfew Horizon');
      expect(horizon.stage).toContain('Early Adolescence');
    });

    it('resolves Tier 5 (16–18 yrs) young adult transition horizon', () => {
      const horizon = getChildDevelopmentalHorizon(17);
      expect(horizon.horizon).toContain('Young Adult Transition Horizon');
      expect(horizon.stage).toContain('Late Adolescence');
    });

    it('resolves string tier names correctly', () => {
      const horizon = getChildDevelopmentalHorizon('TIER_0_INFANCY_TODDLER_0_3');
      expect(horizon.tierLabel).toContain('Tier 0');

      const horizon4 = getChildDevelopmentalHorizon('TIER_4_AGES_14_PLUS');
      expect(horizon4.tierLabel).toContain('Tier 5');
    });
  });

  describe('Pure Selectors: selectActiveChild and selectActiveTier', () => {
    const mockChildren: ChildDTO[] = [
      {
        id: 'child-mateo',
        userId: 'parent-1',
        name: 'Mateo',
        birthYear: 2025,
        birthMonth: 1,
        age: 1,
        roadType: RoadType.PRE_DEVICE,
        developmentalTier: 'TIER_0_INFANCY_TODDLER_0_3' as unknown as DevelopmentalTier,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'child-maya',
        userId: 'parent-1',
        name: 'Maya',
        birthYear: 2018,
        birthMonth: 5,
        age: 8,
        roadType: RoadType.PRE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_1_AGES_8_9,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'child-julian',
        userId: 'parent-1',
        name: 'Julian',
        birthYear: 2012,
        birthMonth: 2,
        age: 14,
        roadType: RoadType.ACTIVE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_4_AGES_14_PLUS,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    it('returns null if children array is empty', () => {
      expect(selectActiveChild({ children: [], activeChildId: null })).toBeNull();
      expect(selectActiveTier({ children: [], activeChildId: null })).toBeNull();
    });

    it('returns first child if activeChildId is not specified', () => {
      const active = selectActiveChild({ children: mockChildren, activeChildId: null });
      expect(active?.id).toBe('child-mateo');
      expect(selectActiveTier({ children: mockChildren, activeChildId: null })).toBe(
        'TIER_0_INFANCY_TODDLER_0_3'
      );
    });

    it('returns matched child when activeChildId is valid', () => {
      const active = selectActiveChild({ children: mockChildren, activeChildId: 'child-maya' });
      expect(active?.name).toBe('Maya');
      expect(selectActiveTier({ children: mockChildren, activeChildId: 'child-maya' })).toBe(
        DevelopmentalTier.TIER_1_AGES_8_9
      );
    });

    it('falls back to first child if activeChildId is not in array', () => {
      const active = selectActiveChild({
        children: mockChildren,
        activeChildId: 'non-existent-id',
      });
      expect(active?.id).toBe('child-mateo');
    });
  });

  describe('useChildContextStore Actions & State', () => {
    it('sets active child and updates state', () => {
      const store = useChildContextStore.getState();
      store.setChildren(DEMO_FAMILY_CHILDREN);

      store.setActiveChild('demo-child-maya');
      expect(useChildContextStore.getState().activeChildId).toBe('demo-child-maya');

      store.setActiveChild('demo-child-julian');
      expect(useChildContextStore.getState().activeChildId).toBe('demo-child-julian');
    });

    it('automatically handles activeChildId adjustment when children list changes', () => {
      const store = useChildContextStore.getState();
      store.setChildren(DEMO_FAMILY_CHILDREN);
      store.setActiveChild('demo-child-julian');

      // Now set children with only Mateo and Maya (Julian removed)
      const subset = DEMO_FAMILY_CHILDREN.slice(0, 2);
      store.setChildren(subset);

      // Should automatically select first available child
      expect(useChildContextStore.getState().activeChildId).toBe('demo-child-mateo');
    });

    it('resets state properly on store.reset()', () => {
      const store = useChildContextStore.getState();
      store.setChildren(DEMO_FAMILY_CHILDREN);
      store.setActiveChild('demo-child-maya');

      store.reset();
      const state = useChildContextStore.getState();
      expect(state.children).toHaveLength(0);
      expect(state.activeChildId).toBeNull();
    });

    it('fetchChildren populates store with fallback demo children when API is unavailable', async () => {
      const store = useChildContextStore.getState();
      await store.fetchChildren();

      const state = useChildContextStore.getState();
      expect(state.children.length).toBeGreaterThan(0);
      expect(state.activeChildId).toBeDefined();
    });
  });
});
