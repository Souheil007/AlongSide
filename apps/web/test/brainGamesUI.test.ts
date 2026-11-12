import { describe, expect, it } from 'vitest';
import {
  PlayCategory,
  DevelopmentalTier,
} from '@alongside/shared';
import {
  CANONICAL_BRAIN_GAMES,
  BOREDOM_BUSTER_PROMPTS,
  WHINING_VALLEY_STAGES,
  getDailyBrainGame,
  getBrainGamesCatalog,
} from '../src/lib/api/brainGames';

describe('Brain Games, Sensory Play & Early Toys Hub Specification (PLAN-19)', () => {
  describe('Canonical Purposeful Play Catalog & Developmental Tiers', () => {
    it('covers all developmental stages from infancy (0–3) through late adolescence (16–18)', () => {
      const tiers = CANONICAL_BRAIN_GAMES.map((bg) => bg.targetTier);

      expect(tiers).toContain(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
      expect(tiers).toContain(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
      expect(tiers).toContain(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
      expect(tiers).toContain(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
      expect(tiers).toContain(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
      expect(tiers).toContain(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
    });

    it('catalogs activities across all 6 purposeful play modalities', () => {
      const categories = new Set(CANONICAL_BRAIN_GAMES.map((bg) => bg.category));

      expect(categories.has(PlayCategory.PUPPET)).toBe(true);
      expect(categories.has(PlayCategory.SENSORY)).toBe(true);
      expect(categories.has(PlayCategory.CONSTRUCTION)).toBe(true);
      expect(categories.has(PlayCategory.LOGIC_PUZZLE)).toBe(true);
      expect(categories.has(PlayCategory.MAKER)).toBe(true);
      expect(categories.has(PlayCategory.BOREDOM_BUSTER)).toBe(true);
    });

    it('guarantees 100% screen-free activities with explicit household materials and target skills', () => {
      for (const game of CANONICAL_BRAIN_GAMES) {
        expect(game.isScreenFree).toBe(true);
        expect(game.materialsNeeded.length).toBeGreaterThan(0);
        expect(game.targetSkills.length).toBeGreaterThan(0);
        expect(game.instructions.length).toBeGreaterThan(20);
        expect(game.estimatedMinutes).toBeGreaterThanOrEqual(10);
      }
    });

    it('includes soft puppet face-to-face vocal mirroring for 0–3 infants', () => {
      const puppetGame = CANONICAL_BRAIN_GAMES.find(
        (bg) => bg.id === 'bg-t0-puppet-mirror'
      );
      expect(puppetGame).toBeDefined();
      expect(puppetGame?.category).toBe(PlayCategory.PUPPET);
      expect(puppetGame?.instructions).toContain('eye level');
      expect(puppetGame?.targetSkills).toContain('Mirror neuron speech activation');
    });

    it('includes sensory bins with tactile temperature and fine motor tweezers grips', () => {
      const sensoryGame = CANONICAL_BRAIN_GAMES.find(
        (bg) => bg.id === 'bg-t0-sensory-water-ice'
      );
      expect(sensoryGame).toBeDefined();
      expect(sensoryGame?.category).toBe(PlayCategory.SENSORY);
      expect(sensoryGame?.materialsNeeded).toContain('Large ice cubes');
    });

    it('includes strategic chess tactics and logic challenges for middle childhood', () => {
      const chessGame = CANONICAL_BRAIN_GAMES.find(
        (bg) => bg.id === 'bg-t2-chess-tactics'
      );
      expect(chessGame).toBeDefined();
      expect(chessGame?.category).toBe(PlayCategory.LOGIC_PUZZLE);
      expect(chessGame?.targetSkills).toContain('Inhibitory impulse control');
    });
  });

  describe('Boredom Buster Protocol & The 15-Minute Whining Valley', () => {
    it('catalogs diverse screen-free challenges using only simple household items', () => {
      expect(BOREDOM_BUSTER_PROMPTS.length).toBeGreaterThanOrEqual(5);

      for (const prompt of BOREDOM_BUSTER_PROMPTS) {
        expect(prompt.id).toBeDefined();
        expect(prompt.title).toBeDefined();
        expect(prompt.challenge).toBeDefined();
        expect(prompt.materials.length).toBeGreaterThan(0);
        expect(prompt.neuroBenefit).toBeDefined();
        expect(prompt.secretTipForParents).toBeDefined();
        expect(prompt.timeEstimateMinutes).toBeGreaterThanOrEqual(15);
      }
    });

    it('defines the 3 neurological phases of the 15-Minute Whining Valley', () => {
      expect(WHINING_VALLEY_STAGES.length).toBe(3);

      const [p1, p2, p3] = WHINING_VALLEY_STAGES;
      expect(p1?.stage).toContain('Phase 1');
      expect(p1?.title).toContain('Dopamine Drop');
      expect(p1?.parentAction).toContain('Validate with warmth');

      expect(p2?.stage).toContain('Phase 2');
      expect(p2?.title).toContain('Default Mode Network');
      expect(p2?.parentAction).toContain('Environmental Staging');

      expect(p3?.stage).toContain('Phase 3');
      expect(p3?.title).toContain('Autonomous Flow');
      expect(p3?.parentAction).toContain('Disappear into the background');
    });
  });

  describe('Brain Games API Client & Local Fallback Resilience', () => {
    it('returns daily game recommendation matching requested child tier', async () => {
      const rec = await getDailyBrainGame(
        'mock-child-id',
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );
      expect(rec).toBeDefined();
      expect([
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
        DevelopmentalTier.TIER_0A_INFANCY_0_1,
        DevelopmentalTier.TIER_0B_TODDLER_1_2,
        DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
      ]).toContain(rec.targetTier);
      expect(rec.isScreenFree).toBe(true);
    });

    it('filters activity catalog by category when offline', async () => {
      const puppets = await getBrainGamesCatalog({
        category: PlayCategory.PUPPET,
      });
      expect(puppets.length).toBeGreaterThan(0);
      expect(puppets.every((p) => p.category === PlayCategory.PUPPET)).toBe(true);
    });

    it('filters activity catalog by developmental tier when offline', async () => {
      const earlyChildhood = await getBrainGamesCatalog({
        tier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
      });
      expect(earlyChildhood.length).toBeGreaterThan(0);
      expect(
        earlyChildhood.every(
          (a) => a.targetTier === DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6
        )
      ).toBe(true);
    });
  });
});
