import { describe, expect, it } from 'vitest';
import {
  formatCurfew12Hour,
  getDefaultClausesForTierAndRoad,
} from '../src/stores/usePactStore';
import { CURFEW_PRESETS } from '../src/components/pacts/CurfewSlider';
import { CATEGORY_DEFINITIONS } from '../src/components/pacts/ClauseSelector';
import { getOtaEnrollmentUrl, getEnrollmentQrCodeUrl } from '../src/lib/api/devices';
import {
  ClauseCategory,
  CommitmentParty,
  DevelopmentalTier,
  RoadType,
  DevicePlatform,
} from '@alongside/shared';

describe('Curfew & Bilateral Pact Components Specification', () => {
  describe('Curfew Presets & Neurobiology Lock Times', () => {
    it('provides standard presets with 8:30 PM as canonical recommended', () => {
      const canonicalPreset = CURFEW_PRESETS.find((p) => p.time === '20:30');
      expect(canonicalPreset).toBeDefined();
      expect(canonicalPreset?.label).toBe('8:30 PM');
      expect(canonicalPreset?.sub).toContain('Canonical Recommended');
    });

    it('covers elementary through high school developmental ranges', () => {
      const times = CURFEW_PRESETS.map((p) => p.time);
      expect(times).toContain('19:30'); // 7:30 PM
      expect(times).toContain('20:00'); // 8:00 PM
      expect(times).toContain('20:30'); // 8:30 PM
      expect(times).toContain('21:00'); // 9:00 PM
      expect(times).toContain('21:30'); // 9:30 PM
      expect(times).toContain('22:00'); // 10:00 PM
    });

    it('formats boundary times correctly across midnight and noon', () => {
      expect(formatCurfew12Hour('00:00')).toBe('12:00 AM');
      expect(formatCurfew12Hour('12:00')).toBe('12:00 PM');
      expect(formatCurfew12Hour('20:30')).toBe('8:30 PM');
      expect(formatCurfew12Hour('21:45')).toBe('9:45 PM');
    });
  });

  describe('Category Definitions & Clinical Rationales', () => {
    it('contains all 6 canonical categories with empathetic rationales', () => {
      expect(CATEGORY_DEFINITIONS).toHaveLength(6);

      const categoryKeys = CATEGORY_DEFINITIONS.map((c) => c.key);
      expect(categoryKeys).toContain(ClauseCategory.SCREEN_TIME);
      expect(categoryKeys).toContain(ClauseCategory.DEVICE_CURFEW);
      expect(categoryKeys).toContain(ClauseCategory.PRIVACY_SAFETY);
      expect(categoryKeys).toContain(ClauseCategory.PURCHASES_CHATS);
      expect(categoryKeys).toContain(ClauseCategory.CONTENT_BOUNDARIES);
      expect(categoryKeys).toContain(ClauseCategory.PARENT_COMMITMENT);

      for (const def of CATEGORY_DEFINITIONS) {
        expect(def.label.length).toBeGreaterThan(3);
        expect(def.description.length).toBeGreaterThan(15);
        expect(def.rationale.length).toBeGreaterThan(20);
        expect(def.icon).toBeDefined();
      }
    });

    it('explicitly grounds Parent Commitment in modeling and anti-surveillance', () => {
      const parentCat = CATEGORY_DEFINITIONS.find(
        (c) => c.key === ClauseCategory.PARENT_COMMITMENT
      );
      expect(parentCat).toBeDefined();
      expect(parentCat?.rationale).toContain('bilateral');
      expect(parentCat?.description).toContain('Parent pledges');
    });
  });

  describe('Bilateral Balance in Default Clauses', () => {
    it('ensures mutual pledges from both Child and Parent parties', () => {
      const clauses = getDefaultClausesForTierAndRoad(
        DevelopmentalTier.TIER_2_AGES_10_11,
        RoadType.ACTIVE_DEVICE,
        '20:30'
      );

      const childClauses = clauses.filter((c) => c.party === CommitmentParty.CHILD);
      const parentClauses = clauses.filter((c) => c.party === CommitmentParty.PARENT);

      expect(childClauses.length).toBeGreaterThanOrEqual(4);
      expect(parentClauses.length).toBeGreaterThanOrEqual(3);

      // Verify Parent commitments include zero surveillance and screen-free meals
      const parentTitles = parentClauses.map((c) => c.title);
      expect(
        parentTitles.some((t) => t.includes('Zero Stealth Surveillance'))
      ).toBe(true);
      expect(
        parentTitles.some((t) => t.includes('Screen-Free Family Meals'))
      ).toBe(true);
      expect(
        parentTitles.some((t) => t.includes('No-Shame Digital Recovery'))
      ).toBe(true);
    });

    it('tailors clauses for Pre-Device Road', () => {
      const preClauses = getDefaultClausesForTierAndRoad(
        DevelopmentalTier.TIER_1_AGES_8_9,
        RoadType.PRE_DEVICE,
        '20:00'
      );

      const screenBudgetClause = preClauses.find(
        (c) => c.category === ClauseCategory.SCREEN_TIME
      );
      expect(screenBudgetClause?.title).toBe('Shared Family Screen Budget');
      expect(screenBudgetClause?.description).toContain('communal family devices');
    });
  });

  describe('Device OTA Enrollment URL Helper', () => {
    it('generates correct OTA enrollment endpoint URLs', () => {
      const url = getOtaEnrollmentUrl('tok_test_123');
      expect(url).toContain('/api/v1/devices/enroll/tok_test_123');
    });

    it('generates correct QR code image endpoint URLs', () => {
      const url = getEnrollmentQrCodeUrl('tok_test_123');
      expect(url).toContain('/api/v1/devices/qr/tok_test_123');
    });
  });
});
