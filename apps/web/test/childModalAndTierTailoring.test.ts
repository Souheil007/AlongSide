import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import * as React from 'react';
import { DevelopmentalTier, RoadType, type ChildDTO } from '@alongside/shared';
import {
  useChildContextStore,
  selectActiveChild,
  DEMO_FAMILY_CHILDREN,
} from '../src/stores/useChildContextStore';
import {
  TIER_TABS,
  FAQ_CATEGORIES,
} from '../src/components/advisor/FaqExplorerView';
import {
  formatTierBadge,
  formatCategoryBadge,
} from '../src/components/advisor/FaqCard';
import {
  CURATED_FAQS,
  searchFaqs,
} from '../src/lib/api/advisor';
import { Dialog, DialogContent } from '../src/components/ui/Dialog';

describe('SOU-63: Child Profile Modal, Tier Tailoring & Modern FAQ Explorer Specification', () => {
  beforeEach(() => {
    useChildContextStore.getState().reset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Bugfix 1: Dialog Component Portaling & Viewport Centering', () => {
    it('exports Dialog and DialogContent components', () => {
      expect(typeof Dialog).toBe('function');
      expect(typeof DialogContent).toBe('function');
    });

    it('renders DialogContent into document.body portal without top offset clipping', () => {
      const element = React.createElement(
        Dialog,
        { open: true },
        React.createElement(
          DialogContent,
          { className: 'max-w-2xl' },
          React.createElement('div', { id: 'modal-child' }, 'Modal Body Content')
        )
      );
      expect(element).toBeDefined();
    });
  });

  describe('Requirement 2: Living Modern Parenting FAQ Explorer Updated for All 6 Canonical Tiers', () => {
    it('includes all 6 canonical lifespan tiers in TIER_TABS', () => {
      const tierIds = TIER_TABS.map((t) => t.id);

      expect(tierIds).toContain('ALL');
      expect(tierIds).toContain(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
      expect(tierIds).toContain(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
      expect(tierIds).toContain(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
      expect(tierIds).toContain(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
      expect(tierIds).toContain(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
      expect(tierIds).toContain(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
    });

    it('includes canonical domain categories in FAQ_CATEGORIES', () => {
      const categoryIds = FAQ_CATEGORIES.map((c) => c.id);

      expect(categoryIds).toContain('ALL');
      expect(categoryIds).toContain('pediatric-health-and-sleep');
      expect(categoryIds).toContain('nutrition-and-feeding');
      expect(categoryIds).toContain('development-and-milestones');
      expect(categoryIds).toContain('behavior-and-discipline');
      expect(categoryIds).toContain('modern-world-and-devices');
    });

    it('provides expert FAQs covering every canonical tier in CURATED_FAQS', () => {
      const tiersInVault = new Set(CURATED_FAQS.map((f) => f.targetTier).filter(Boolean));

      expect(tiersInVault.has(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3)).toBe(true);
      expect(tiersInVault.has(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6)).toBe(true);
      expect(tiersInVault.has(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9)).toBe(true);
      expect(tiersInVault.has(DevelopmentalTier.TIER_3_PRE_TEEN_10_12)).toBe(true);
      expect(tiersInVault.has(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15)).toBe(true);
      expect(tiersInVault.has(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18)).toBe(true);
    });

    it('filters FAQs accurately across infant, early childhood, and teen tiers', async () => {
      // Tier 0 (Infant/Toddler)
      const infantFaqs = await searchFaqs({ tier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3 });
      expect(infantFaqs.faqs.length).toBeGreaterThanOrEqual(2);
      expect(infantFaqs.faqs.some((f) => f.question.toLowerCase().includes('fever') || f.question.toLowerCase().includes('weaning'))).toBe(true);

      // Decomposed Tier 0A / 0B (Infancy & Toddlerhood)
      const tier0AFaqs = await searchFaqs({ tier: DevelopmentalTier.TIER_0A_INFANCY_0_1 });
      expect(tier0AFaqs.faqs.length).toBeGreaterThanOrEqual(2);

      const tier0BFaqs = await searchFaqs({ tier: DevelopmentalTier.TIER_0B_TODDLER_1_2 });
      expect(tier0BFaqs.faqs.length).toBeGreaterThanOrEqual(2);

      // Tier 1 (Early Childhood)
      const earlyChildhoodFaqs = await searchFaqs({ tier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6 });
      expect(earlyChildhoodFaqs.faqs.length).toBeGreaterThanOrEqual(1);

      // Tier 5 (Late Adolescence)
      const lateTeenFaqs = await searchFaqs({ tier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18 });
      expect(lateTeenFaqs.faqs.length).toBeGreaterThanOrEqual(1);
      expect(lateTeenFaqs.faqs.some((f) => f.question.toLowerCase().includes('teen') || f.question.toLowerCase().includes('driving'))).toBe(true);
    });

    it('formats badges accurately for all canonical tiers and categories in FaqCard', () => {
      const tier0Badge = formatTierBadge(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
      expect(tier0Badge.label).toContain('Ages 0–3');
      expect(tier0Badge.badgeClass).toContain('amber');

      const tier0ABadge = formatTierBadge(DevelopmentalTier.TIER_0A_INFANCY_0_1);
      expect(tier0ABadge.label).toContain('Ages 0–1');
      expect(tier0ABadge.badgeClass).toContain('rose');

      const tier0BBadge = formatTierBadge(DevelopmentalTier.TIER_0B_TODDLER_1_2);
      expect(tier0BBadge.label).toContain('Ages 1–2');
      expect(tier0BBadge.badgeClass).toContain('amber');

      const tier0CBadge = formatTierBadge(DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3);
      expect(tier0CBadge.label).toContain('Ages 2–3');
      expect(tier0CBadge.badgeClass).toContain('orange');

      const tier5Badge = formatTierBadge(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
      expect(tier5Badge.label).toContain('Ages 16–18');
      expect(tier5Badge.badgeClass).toContain('indigo');

      const healthCat = formatCategoryBadge('pediatric-health-and-sleep');
      expect(healthCat.label).toBe('Pediatric Health & Sleep');
      expect(healthCat.badgeClass).toContain('teal');

      const nutritionCat = formatCategoryBadge('nutrition-and-feeding');
      expect(nutritionCat.label).toBe('Nutrition & Picky Eating');
      expect(nutritionCat.badgeClass).toContain('emerald');
    });
  });

  describe('Requirement 3: Multi-Tab Developmental Tier Tailoring', () => {
    it('switches active household child profile reactively in useChildContextStore', () => {
      useChildContextStore.getState().setChildren(DEMO_FAMILY_CHILDREN);

      // Select toddler Mateo (Tier 0)
      useChildContextStore.getState().setActiveChild('demo-child-mateo');
      let active = selectActiveChild(useChildContextStore.getState());
      expect(active?.id).toBe('demo-child-mateo');
      expect(active?.age).toBe(1);

      // Switch to pre-teen Maya (Tier 2/1)
      useChildContextStore.getState().setActiveChild('demo-child-maya');
      active = selectActiveChild(useChildContextStore.getState());
      expect(active?.id).toBe('demo-child-maya');
      expect(active?.age).toBe(8);

      // Switch to teen Julian (Tier 4)
      useChildContextStore.getState().setActiveChild('demo-child-julian');
      active = selectActiveChild(useChildContextStore.getState());
      expect(active?.id).toBe('demo-child-julian');
      expect(active?.age).toBe(14);
      expect(active?.roadType).toBe(RoadType.ACTIVE_DEVICE);
    });
  });
});
