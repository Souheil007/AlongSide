import { describe, expect, it } from 'vitest';
import { DevelopmentalTier } from '@alongside/shared';
import {
  CANONICAL_BEHAVIOR_GUIDES,
  HALT_DIAGNOSTICS_DATA,
  getBehaviorGuides,
  getBehaviorGuideBySlug,
} from '../src/lib/api/behavior';

describe('Behavioral Psychology & Cultural Advisor Hub Specification (PLAN-19)', () => {
  describe('Canonical De-escalation Scripts Vault & Situational Triggers', () => {
    it('covers all developmental stages from toddlerhood (0–3) through older teens (16–18)', () => {
      const tiers = CANONICAL_BEHAVIOR_GUIDES.map((g) => g.targetTier);

      expect(tiers).toContain(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
      expect(tiers).toContain(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
      expect(tiers).toContain(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
      expect(tiers).toContain(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
      expect(tiers).toContain(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
      expect(tiers).toContain(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
    });

    it('covers key common family behavioral dilemmas with distinct categories', () => {
      const categories = new Set(CANONICAL_BEHAVIOR_GUIDES.map((g) => g.category));

      expect(categories.has('tantrums')).toBe(true);
      expect(categories.has('defiance')).toBe(true);
      expect(categories.has('aggression')).toBe(true);
      expect(categories.has('sibling')).toBe(true);
      expect(categories.has('lying')).toBe(true);
      expect(categories.has('bedtime')).toBe(true);
    });

    it('provides both "What NOT to Say" and word-for-word co-regulation scripts for every dilemma', () => {
      for (const guide of CANONICAL_BEHAVIOR_GUIDES) {
        expect(guide.whatNotToSay).toBeDefined();
        expect(guide.whatNotToSay.length).toBeGreaterThan(10);
        expect(guide.coRegulationScript).toBeDefined();
        expect(guide.coRegulationScript.length).toBeGreaterThan(15);
        expect(guide.authoritativeLimit).toBeDefined();
        expect(guide.authoritativeLimit.length).toBeGreaterThan(15);
        expect(guide.physiologicalTrigger).toBeDefined();
        expect(guide.underlyingNeed).toBeDefined();
      }
    });

    it('decodes screen-time cutoff meltdowns as sudden dopamine drops rather than moral defiance', () => {
      const screenGuide = CANONICAL_BEHAVIOR_GUIDES.find(
        (g) => g.slug === 'preschooler-screen-time-transition-meltdown'
      );
      expect(screenGuide).toBeDefined();
      expect(screenGuide?.underlyingNeed).toContain('dopamine');
      expect(screenGuide?.coRegulationScript).toContain('breath');
      expect(screenGuide?.authoritativeLimit).toContain('countdown');
    });

    it('decodes toddler hitting or biting as pre-verbal motor impulse before language inhibition', () => {
      const hittingGuide = CANONICAL_BEHAVIOR_GUIDES.find(
        (g) => g.slug === 'toddler-hitting-or-biting-frustration'
      );
      expect(hittingGuide).toBeDefined();
      expect(hittingGuide?.authoritativeLimit).toContain('I will not let you hit');
      expect(hittingGuide?.coRegulationScript).toContain('Big feelings are safe');
    });
  });

  describe('The HALT Tantrum Diagnostic Framework (H, A, L, T)', () => {
    it('covers all 4 physiological vulnerability pillars with actionable checklists', () => {
      expect(HALT_DIAGNOSTICS_DATA.length).toBe(4);

      const letters = HALT_DIAGNOSTICS_DATA.map((h) => h.letter);
      expect(letters).toEqual(['H', 'A', 'L', 'T']);

      for (const item of HALT_DIAGNOSTICS_DATA) {
        expect(item.name).toBeDefined();
        expect(item.trigger).toBeDefined();
        expect(item.symptoms.length).toBeGreaterThanOrEqual(3);
        expect(item.physiologicalMechanism.length).toBeGreaterThan(20);
        expect(item.immediateAction.length).toBeGreaterThan(15);
        expect(item.script.length).toBeGreaterThan(20);
      }
    });

    it('identifies hypoglycemia as a cortisol/adrenaline driver under Hungry', () => {
      const hungry = HALT_DIAGNOSTICS_DATA.find((h) => h.letter === 'H');
      expect(hungry).toBeDefined();
      expect(hungry?.physiologicalMechanism).toContain('Hypoglycemia');
      expect(hungry?.immediateAction).toContain('protein');
    });

    it('identifies adenosine sleep pressure and sensory overload under Tired', () => {
      const tired = HALT_DIAGNOSTICS_DATA.find((h) => h.letter === 'T');
      expect(tired).toBeDefined();
      expect(tired?.physiologicalMechanism).toContain('adenosine');
      expect(tired?.immediateAction).toContain('Dim lights');
    });
  });

  describe('Behavior API Client & Local Fallback Resilience', () => {
    it('fetches behavior guides filtered by developmental tier', async () => {
      const guides = await getBehaviorGuides(
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );
      expect(guides.length).toBeGreaterThan(0);
      expect(
        guides.every(
          (g) => g.targetTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
        )
      ).toBe(true);
    });

    it('fetches behavior guides filtered by situation category', async () => {
      const tantrumGuides = await getBehaviorGuides(undefined, 'tantrums');
      expect(tantrumGuides.length).toBeGreaterThan(0);
      expect(tantrumGuides.every((g) => g.category === 'tantrums')).toBe(true);
    });

    it('fetches individual behavior guide by situation slug', async () => {
      const guide = await getBehaviorGuideBySlug(
        'preschooler-bedtime-stall-and-refusal'
      );
      expect(guide).toBeDefined();
      expect(guide?.slug).toBe('preschooler-bedtime-stall-and-refusal');
      expect(guide?.targetTier).toBe(
        DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6
      );
    });

    it('returns null for unknown slug', async () => {
      const notFound = await getBehaviorGuideBySlug('non-existent-situation-xyz');
      expect(notFound).toBeNull();
    });
  });
});
