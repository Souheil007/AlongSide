import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  DevelopmentalTier,
  RoadType,
  ExploitSeverity,
  type ChildDTO,
} from '@alongside/shared';
import {
  useChildContextStore,
  selectActiveChild,
  resolveChildSlangTier,
  resolveChildDevicesDefaultTab,
  ACTIVE_CHILD_STORAGE_KEY,
  DEMO_FAMILY_CHILDREN,
  formatChildAge,
  getChildDevelopmentalHorizon,
} from '../src/stores/useChildContextStore';
import { normalizeChildTier } from '../src/components/academy/AcademyCatalogClient';
import { isHighRelevanceForChild, type RichExploitAlert } from '../src/components/digest/ExploitAlertsView';
import { getRecommendedCurfew } from '../src/components/devices/DevicesManagementView';

describe('Plan 34: Universal Cross-Tab Reactive Child Context Synchronization Specification', () => {
  const mateo: ChildDTO = DEMO_FAMILY_CHILDREN.find((c) => c.name === 'Mateo')!;
  const maya: ChildDTO = DEMO_FAMILY_CHILDREN.find((c) => c.name === 'Maya')!;
  const julian: ChildDTO = DEMO_FAMILY_CHILDREN.find((c) => c.name === 'Julian')!;

  beforeEach(() => {
    useChildContextStore.getState().reset();
    vi.restoreAllMocks();
  });

  describe('1. Pure Domain Resolvers', () => {
    describe('resolveChildSlangTier', () => {
      it('resolves age <= 6 to EARLY_CHILDHOOD for screen-free window', () => {
        expect(resolveChildSlangTier(mateo)).toBe('EARLY_CHILDHOOD');
        expect(resolveChildSlangTier({ ...mateo, age: 4 })).toBe('EARLY_CHILDHOOD');
        expect(resolveChildSlangTier({ ...mateo, age: 6 })).toBe('EARLY_CHILDHOOD');
      });

      it('resolves ages 7-9 to ELEMENTARY tier', () => {
        expect(resolveChildSlangTier(maya)).toBe('ELEMENTARY');
        expect(resolveChildSlangTier({ ...maya, age: 7 })).toBe('ELEMENTARY');
        expect(resolveChildSlangTier({ ...maya, age: 9 })).toBe('ELEMENTARY');
      });

      it('resolves ages 10-12 to TWEEN tier', () => {
        const tweenChild = { ...maya, age: 11 };
        expect(resolveChildSlangTier(tweenChild)).toBe('TWEEN');
        expect(resolveChildSlangTier({ ...maya, age: 10 })).toBe('TWEEN');
        expect(resolveChildSlangTier({ ...maya, age: 12 })).toBe('TWEEN');
      });

      it('resolves ages 13+ to TEEN tier', () => {
        expect(resolveChildSlangTier(julian)).toBe('TEEN');
        expect(resolveChildSlangTier({ ...julian, age: 13 })).toBe('TEEN');
        expect(resolveChildSlangTier({ ...julian, age: 17 })).toBe('TEEN');
      });

      it('falls back safely to ALL when child is null or age is missing', () => {
        expect(resolveChildSlangTier(null)).toBe('ALL');
        expect(resolveChildSlangTier(undefined)).toBe('ALL');
        expect(resolveChildSlangTier({ ...mateo, age: undefined as unknown as number })).toBe('ALL');
      });
    });

    describe('resolveChildDevicesDefaultTab', () => {
      it('routes PRE_DEVICE road type to readiness tab', () => {
        expect(resolveChildDevicesDefaultTab(mateo)).toBe('readiness');
        expect(resolveChildDevicesDefaultTab(maya)).toBe('readiness');
      });

      it('routes ACTIVE_DEVICE road type to curfews tab', () => {
        expect(resolveChildDevicesDefaultTab(julian)).toBe('curfews');
      });

      it('falls back safely based on developmental age when roadType is unspecified', () => {
        const childWithoutRoad = { ...mateo, roadType: undefined as unknown as RoadType };
        expect(resolveChildDevicesDefaultTab({ ...childWithoutRoad, age: 8 })).toBe('readiness');
        expect(resolveChildDevicesDefaultTab({ ...childWithoutRoad, age: 14 })).toBe('curfews');
      });

      it('defaults to readiness when child is null', () => {
        expect(resolveChildDevicesDefaultTab(null)).toBe('readiness');
      });
    });

    describe('normalizeChildTier', () => {
      it('normalizes legacy tier enums to 6 canonical lifespan tiers', () => {
        expect(normalizeChildTier(DevelopmentalTier.TIER_1_AGES_8_9)).toBe(
          DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9
        );
        expect(normalizeChildTier(DevelopmentalTier.TIER_2_AGES_10_11)).toBe(
          DevelopmentalTier.TIER_3_PRE_TEEN_10_12
        );
        expect(normalizeChildTier(DevelopmentalTier.TIER_3_AGES_12_13)).toBe(
          DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15
        );
        expect(normalizeChildTier(DevelopmentalTier.TIER_4_AGES_14_PLUS)).toBe(
          DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18
        );
      });

      it('normalizes string tier formats accurately', () => {
        expect(normalizeChildTier('TIER_0_INFANCY_TODDLER_0_3')).toBe(
          DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
        );
        expect(normalizeChildTier('TIER_1_EARLY_CHILDHOOD_4_6')).toBe(
          DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6
        );
      });

      it('derives normalized tier by age when tier is absent', () => {
        expect(normalizeChildTier(null, 2)).toBe(DevelopmentalTier.TIER_0B_TODDLER_1_2);
        expect(normalizeChildTier(null, 5)).toBe(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
        expect(normalizeChildTier(null, 8)).toBe(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
        expect(normalizeChildTier(null, 11)).toBe(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
        expect(normalizeChildTier(null, 14)).toBe(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
        expect(normalizeChildTier(null, 17)).toBe(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
      });
    });

    describe('isHighRelevanceForChild', () => {
      const gamblingAlert: RichExploitAlert = {
        id: 'alert-1',
        category: 'GAMBLING',
        severity: ExploitSeverity.HIGH,
        severityLabel: 'High Alert',
        title: 'Roblox In-Game Wheels',
        affectedPlatforms: ['Roblox', 'Fortnite'],
        calmSummary: 'Summary',
        howMechanicWorks: 'Mechanic',
        parentActionProtocol: ['Step 1'],
        neutralEnforcementTip: 'Tip',
      };

      const raidBotsAlert: RichExploitAlert = {
        id: 'alert-2',
        category: 'RAID_BOTS',
        severity: ExploitSeverity.MEDIUM,
        severityLabel: 'Medium Alert',
        title: 'Discord Server Raids',
        affectedPlatforms: ['Discord', 'Snapchat'],
        calmSummary: 'Summary',
        howMechanicWorks: 'Mechanic',
        parentActionProtocol: ['Step 1'],
        neutralEnforcementTip: 'Tip',
      };

      it('flags gambling and loot box alerts as highly relevant for elementary / tweens (7-12)', () => {
        expect(isHighRelevanceForChild(gamblingAlert, maya)).toBe(true);
        expect(isHighRelevanceForChild(raidBotsAlert, maya)).toBe(false);
      });

      it('flags raid bots and ephemeral messaging alerts as highly relevant for teens (13+)', () => {
        expect(isHighRelevanceForChild(raidBotsAlert, julian)).toBe(true);
        expect(isHighRelevanceForChild(gamblingAlert, julian)).toBe(false);
      });

      it('returns false for infants in screen-free window', () => {
        expect(isHighRelevanceForChild(gamblingAlert, mateo)).toBe(false);
        expect(isHighRelevanceForChild(raidBotsAlert, mateo)).toBe(false);
      });
    });
  });

  describe('2. Hardened setActiveChild & Cross-Island Synchronization', () => {
    it('dispatches alongside:child-change custom window event with selected childId when window is present', () => {
      const dispatchedEvents: Array<{ type: string; detail: unknown }> = [];
      const mockStorage = new Map<string, string>();

      const mockWindow = {
        location: { href: 'http://localhost:3000/dashboard', search: '' },
        history: { replaceState: vi.fn() },
        localStorage: {
          getItem: (k: string) => mockStorage.get(k) ?? null,
          setItem: (k: string, v: string) => mockStorage.set(k, v),
          removeItem: (k: string) => mockStorage.delete(k),
        },
        dispatchEvent: (event: CustomEvent) => {
          dispatchedEvents.push({ type: event.type, detail: event.detail });
          return true;
        },
      };

      vi.stubGlobal('window', mockWindow);
      try {
        useChildContextStore.getState().setChildren(DEMO_FAMILY_CHILDREN);
        useChildContextStore.getState().setActiveChild(mateo.id);

        expect(dispatchedEvents).toHaveLength(1);
        expect(dispatchedEvents[0]!.type).toBe('alongside:child-change');
        expect(dispatchedEvents[0]!.detail).toEqual({ childId: mateo.id });
        expect(mockStorage.get(ACTIVE_CHILD_STORAGE_KEY)).toBe(mateo.id);
        expect(mockWindow.history.replaceState).toHaveBeenCalledTimes(1);
      } finally {
        vi.unstubAllGlobals();
      }
    });

    it('persists selected child ID to store and state', () => {
      useChildContextStore.getState().setChildren(DEMO_FAMILY_CHILDREN);
      useChildContextStore.getState().setActiveChild(julian.id);

      expect(useChildContextStore.getState().activeChildId).toBe(julian.id);
      const active = selectActiveChild(useChildContextStore.getState());
      expect(active?.id).toBe(julian.id);
    });
  });

  describe('3. Multi-Child Cross-Tab Reactive Calibration Workflow', () => {
    it('calibrates entire platform reactively for Mateo (14 mo, Road 1)', () => {
      useChildContextStore.getState().setChildren(DEMO_FAMILY_CHILDREN);
      useChildContextStore.getState().setActiveChild(mateo.id);

      const active = selectActiveChild(useChildContextStore.getState());
      expect(active?.id).toBe(mateo.id);
      expect(active?.name).toBe('Mateo');

      // Human-friendly age derivation
      expect(formatChildAge(mateo)).toBe('14 mo');

      // Developmental horizon & leap
      const horizon = getChildDevelopmentalHorizon(mateo.developmentalTier);
      expect(horizon.stage).toContain('Younger Toddlerhood');
      expect(horizon.tierLabel).toContain('Tier 0B');

      // Academy curriculum calibration
      const catalogTier = normalizeChildTier(mateo.developmentalTier, mateo.age);
      expect(catalogTier).toBe(DevelopmentalTier.TIER_0B_TODDLER_1_2);

      // Culture Digest calibration (screen-free window)
      const slangTier = resolveChildSlangTier(mateo);
      expect(slangTier).toBe('EARLY_CHILDHOOD');

      // Devices Hub default tab
      const devicesTab = resolveChildDevicesDefaultTab(mateo);
      expect(devicesTab).toBe('readiness');
    });

    it('calibrates entire platform reactively for Julian (14 yrs, Road 2)', () => {
      useChildContextStore.getState().setChildren(DEMO_FAMILY_CHILDREN);
      useChildContextStore.getState().setActiveChild(julian.id);

      const active = selectActiveChild(useChildContextStore.getState());
      expect(active?.id).toBe(julian.id);
      expect(active?.name).toBe('Julian');

      // Age derivation
      expect(formatChildAge(julian)).toBe('14 yrs');

      // Developmental horizon
      const horizon = getChildDevelopmentalHorizon(julian.developmentalTier);
      expect(horizon.stage).toContain('Late Adolescence');

      // Academy curriculum calibration
      const catalogTier = normalizeChildTier(julian.developmentalTier, julian.age);
      expect(catalogTier).toBe(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);

      // Culture Digest calibration
      const slangTier = resolveChildSlangTier(julian);
      expect(slangTier).toBe('TEEN');

      // Devices Hub default tab & curfew
      const devicesTab = resolveChildDevicesDefaultTab(julian);
      expect(devicesTab).toBe('curfews');
      const curfew = getRecommendedCurfew(julian.age);
      expect(curfew.time12).toBe('9:30 PM');
    });

    it('re-evaluates stage match accurately between course modules and active child', () => {
      // Course 1: Pre-Teen Adrenarche (Tier 3)
      const courseTierPreTeen = DevelopmentalTier.TIER_3_PRE_TEEN_10_12;

      // When Maya (Tier 2 / Middle Childhood) is active: Differing stage
      const mayaNormalizedTier = normalizeChildTier(maya.developmentalTier, maya.age);
      const isMayaMatch = mayaNormalizedTier === courseTierPreTeen;
      expect(isMayaMatch).toBe(false);

      // When a 11-year-old tween is active: Matching stage
      const tweenChild: ChildDTO = { ...maya, age: 11, developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12 };
      const tweenNormalizedTier = normalizeChildTier(tweenChild.developmentalTier, tweenChild.age);
      const isTweenMatch = tweenNormalizedTier === courseTierPreTeen;
      expect(isTweenMatch).toBe(true);

      // When Mateo (Infant / Tier 0) is active: Differing stage
      const mateoNormalizedTier = normalizeChildTier(mateo.developmentalTier, mateo.age);
      expect(mateoNormalizedTier === courseTierPreTeen).toBe(false);
    });

    it('tailors 24/7 AI Child Advisor consultation header and dynamic placeholder', () => {
      // Julian is active (14 yrs)
      useChildContextStore.getState().setChildren(DEMO_FAMILY_CHILDREN);
      useChildContextStore.getState().setActiveChild(julian.id);

      const active = selectActiveChild(useChildContextStore.getState())!;
      const horizon = getChildDevelopmentalHorizon(active.developmentalTier || active.age);

      const consultationBanner = `Active Consultation: Calibrated for ${active.name} (Age ${active.age} · ${horizon.stage || horizon.tierLabel})`;
      expect(consultationBanner).toContain('Calibrated for Julian');
      expect(consultationBanner).toContain('Age 14');
      expect(consultationBanner).toContain('Late Adolescence');

      const placeholder = `Ask about ${active.name}... (e.g. tantrums, bedtime stalls, phone boundaries)`;
      expect(placeholder).toBe('Ask about Julian... (e.g. tantrums, bedtime stalls, phone boundaries)');
    });

    it('prioritizes and sorts active child profile to top in Devices Hub list', () => {
      useChildContextStore.getState().setChildren(DEMO_FAMILY_CHILDREN);
      useChildContextStore.getState().setActiveChild(julian.id);

      const store = useChildContextStore.getState();
      const active = selectActiveChild(store)!;

      const sorted = [...store.children].sort((a, b) => {
        if (a.id === active.id) return -1;
        if (b.id === active.id) return 1;
        return 0;
      });

      expect(sorted[0]!.id).toBe(julian.id);
      expect(sorted[0]!.name).toBe('Julian');
    });

    it('adapts dinner conversation starters and slang recommendations across developmental horizons', () => {
      // Early childhood (Mateo)
      const mateoSlang = resolveChildSlangTier(mateo);
      expect(mateoSlang).toBe('EARLY_CHILDHOOD');

      // Elementary (Maya)
      const mayaSlang = resolveChildSlangTier(maya);
      expect(mayaSlang).toBe('ELEMENTARY');

      // Teen (Julian)
      const julianSlang = resolveChildSlangTier(julian);
      expect(julianSlang).toBe('TEEN');
    });
  });
});
