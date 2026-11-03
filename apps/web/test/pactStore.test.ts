import { describe, expect, it, beforeEach } from 'vitest';
import {
  usePactStore,
  formatCurfew12Hour,
  getDefaultClausesForTierAndRoad,
} from '../src/stores/usePactStore';
import {
  ClauseCategory,
  CommitmentParty,
  DevelopmentalTier,
  RoadType,
} from '@alongside/shared';

describe('usePactStore', () => {
  beforeEach(() => {
    usePactStore.getState().reset();
  });

  describe('Curfew Time Formatting Utility', () => {
    it('correctly converts 24h curfew string into 12h format', () => {
      expect(formatCurfew12Hour('20:30')).toBe('8:30 PM');
      expect(formatCurfew12Hour('20:00')).toBe('8:00 PM');
      expect(formatCurfew12Hour('21:15')).toBe('9:15 PM');
      expect(formatCurfew12Hour('19:45')).toBe('7:45 PM');
      expect(formatCurfew12Hour('08:00')).toBe('8:00 AM');
      expect(formatCurfew12Hour('12:00')).toBe('12:00 PM');
    });
  });

  describe('Default Presets Generation', () => {
    it('returns canonical preset clauses including both child and parent commitments', () => {
      const clauses = getDefaultClausesForTierAndRoad(
        DevelopmentalTier.TIER_2_AGES_10_11,
        RoadType.ACTIVE_DEVICE,
        '20:30'
      );
      expect(clauses.length).toBeGreaterThanOrEqual(7);

      const categories = clauses.map((c) => c.category);
      expect(categories).toContain(ClauseCategory.SCREEN_TIME);
      expect(categories).toContain(ClauseCategory.DEVICE_CURFEW);
      expect(categories).toContain(ClauseCategory.PRIVACY_SAFETY);
      expect(categories).toContain(ClauseCategory.PARENT_COMMITMENT);

      const parties = clauses.map((c) => c.party);
      expect(parties).toContain(CommitmentParty.CHILD);
      expect(parties).toContain(CommitmentParty.PARENT);
    });

    it('adapts curfew clause title based on the provided curfewTime', () => {
      const clauses = getDefaultClausesForTierAndRoad(
        DevelopmentalTier.TIER_3_AGES_12_13,
        RoadType.ACTIVE_DEVICE,
        '21:00'
      );
      const curfewClause = clauses.find(
        (c) => c.category === ClauseCategory.DEVICE_CURFEW
      );
      expect(curfewClause?.title).toContain('9:00 PM');
    });
  });

  describe('Store Actions & Lifecycle', () => {
    it('initializes wizard state correctly', () => {
      const store = usePactStore.getState();
      store.initializeWizard(
        'child-123',
        'Leo',
        DevelopmentalTier.TIER_3_AGES_12_13,
        RoadType.ACTIVE_DEVICE
      );

      const state = usePactStore.getState();
      expect(state.childId).toBe('child-123');
      expect(state.childName).toBe('Leo');
      expect(state.agreementTitle).toBe("Leo's Family Tech Agreement");
      expect(state.curfewTime).toBe('20:30');
      expect(state.activeStep).toBe(1);
      expect(state.clauses.length).toBeGreaterThan(0);
    });

    it('navigates between steps correctly', () => {
      const store = usePactStore.getState();
      expect(store.activeStep).toBe(1);

      store.nextStep();
      expect(usePactStore.getState().activeStep).toBe(2);

      store.nextStep();
      expect(usePactStore.getState().activeStep).toBe(3);

      store.prevStep();
      expect(usePactStore.getState().activeStep).toBe(2);

      store.setStep(4);
      expect(usePactStore.getState().activeStep).toBe(4);

      // Boundaries check
      store.nextStep();
      expect(usePactStore.getState().activeStep).toBe(4);
    });

    it('updates curfew time and synchronizes curfew clause in state', () => {
      const store = usePactStore.getState();
      store.initializeWizard('child-1', 'Maya');

      store.setCurfewTime('21:30');
      const state = usePactStore.getState();
      expect(state.curfewTime).toBe('21:30');

      const curfewClause = state.clauses.find(
        (c) => c.category === ClauseCategory.DEVICE_CURFEW
      );
      expect(curfewClause?.title).toContain('9:30 PM');
      expect(curfewClause?.description).toContain('9:30 PM');
    });

    it('toggles clauses on and off', () => {
      const store = usePactStore.getState();
      store.initializeWizard('child-1', 'Maya');

      const initialCount = store.clauses.length;
      const targetClause = store.clauses[0]!;

      // Toggle off
      store.toggleClause(targetClause);
      expect(usePactStore.getState().clauses.length).toBe(initialCount - 1);

      // Toggle back on
      store.toggleClause(targetClause);
      expect(usePactStore.getState().clauses.length).toBe(initialCount);
    });

    it('adds and removes custom clauses', () => {
      const store = usePactStore.getState();
      store.initializeWizard('child-1', 'Maya');

      store.addCustomClause({
        category: ClauseCategory.PARENT_COMMITMENT,
        party: CommitmentParty.PARENT,
        title: 'Friday Family Board Game Night',
        description: 'All family screens docked during Friday game nights.',
      });

      const state = usePactStore.getState();
      const custom = state.clauses.find(
        (c) => c.title === 'Friday Family Board Game Night'
      );
      expect(custom).toBeDefined();
      expect(custom?.isCustom).toBe(true);
      expect(custom?.isStandard).toBe(false);

      store.removeClause('Friday Family Board Game Night');
      expect(
        usePactStore
          .getState()
          .clauses.some((c) => c.title === 'Friday Family Board Game Night')
      ).toBe(false);
    });

    it('stores parent and child base64 signature strings', () => {
      const store = usePactStore.getState();
      const parentSig = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
      const childSig = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgCC...';

      store.setParentSignature(parentSig);
      store.setChildSignature(childSig);

      const state = usePactStore.getState();
      expect(state.parentSignature).toBe(parentSig);
      expect(state.childSignature).toBe(childSig);
    });
  });
});
