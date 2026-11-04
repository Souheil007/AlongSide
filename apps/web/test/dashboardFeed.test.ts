import { describe, expect, it } from 'vitest';
import {
  getMilestones,
  trackChildMilestone,
  calculateChildMilestonesProgress,
  CANONICAL_MILESTONES,
} from '../src/lib/api/milestones';
import {
  getDailyBrainGame,
  getBrainGamesCatalog,
  CANONICAL_BRAIN_GAMES,
} from '../src/lib/api/brainGames';
import { DOMAIN_HUBS } from '../src/components/shared/DashboardNav';
import {
  DevelopmentalTier,
  MilestoneStatus,
  MilestoneCategory,
  PlayCategory,
} from '@alongside/shared';

describe('Holistic Family Dashboard & Unified Navigation UI Specification (PLAN-17)', () => {
  describe('7-Hub Unified Domain Navigation Shell', () => {
    it('defines exactly the 7 canonical domain hubs in the application navigation', () => {
      expect(DOMAIN_HUBS).toHaveLength(7);
      const routes = DOMAIN_HUBS.map((h) => h.href);
      expect(routes).toEqual([
        '/dashboard',
        '/health',
        '/nutrition',
        '/brain-games',
        '/behavior',
        '/advisor',
        '/devices',
      ]);
    });

    it('contains valid human-friendly labels and icons for all 7 hubs', () => {
      for (const hub of DOMAIN_HUBS) {
        expect(hub.label.length).toBeGreaterThan(3);
        expect(hub.shortLabel.length).toBeGreaterThan(2);
        expect(hub.description.length).toBeGreaterThan(10);
        expect(hub.icon).toBeDefined();
      }
    });

    it('features designated badges for key clinical anchors (Safe Resort, HALT, Clinical RAG, Pact-as-Code)', () => {
      const healthHub = DOMAIN_HUBS.find((h) => h.href === '/health');
      expect(healthHub?.badge).toBe('Safe Resort');

      const behaviorHub = DOMAIN_HUBS.find((h) => h.href === '/behavior');
      expect(behaviorHub?.badge).toBe('HALT');

      const advisorHub = DOMAIN_HUBS.find((h) => h.href === '/advisor');
      expect(advisorHub?.badge).toBe('Clinical RAG');

      const devicesHub = DOMAIN_HUBS.find((h) => h.href === '/devices');
      expect(devicesHub?.badge).toBe('Pact-as-Code');
    });
  });

  describe('Developmental Milestones Engine & Feed Client', () => {
    it('provides rich canonical milestones across infant, child, and adolescent tiers', () => {
      expect(CANONICAL_MILESTONES.length).toBeGreaterThanOrEqual(10);

      // Verify category coverage
      const categories = CANONICAL_MILESTONES.map((m) => m.category);
      expect(categories).toContain(MilestoneCategory.GROSS_MOTOR);
      expect(categories).toContain(MilestoneCategory.FINE_MOTOR);
      expect(categories).toContain(MilestoneCategory.SPEECH_LANGUAGE);
      expect(categories).toContain(MilestoneCategory.COGNITIVE);
      expect(categories).toContain(MilestoneCategory.SOCIAL_EMOTIONAL);
    });

    it('filters milestones by child age in months correctly', async () => {
      // 14-month-old infant Mateo
      const infantMilestones = await getMilestones({ ageMonths: 14 });
      expect(infantMilestones.length).toBeGreaterThan(0);
      expect(infantMilestones.some((m) => m.title.includes('Walking') || m.title.includes('Words'))).toBe(true);

      // 8-year-old child Maya (~96 months)
      const elementaryMilestones = await getMilestones({ ageMonths: 96 });
      expect(elementaryMilestones.length).toBeGreaterThan(0);
      expect(elementaryMilestones.some((m) => m.title.includes('Bicycle') || m.title.includes('Logic'))).toBe(true);
    });

    it('evaluates milestone progress percentages accurately via shared algorithm', () => {
      const sampleMilestones = [
        { ...CANONICAL_MILESTONES[0]!, status: MilestoneStatus.ACHIEVED },
        { ...CANONICAL_MILESTONES[1]!, status: MilestoneStatus.ACHIEVED },
        { ...CANONICAL_MILESTONES[2]!, status: MilestoneStatus.NOT_STARTED },
        { ...CANONICAL_MILESTONES[3]!, status: MilestoneStatus.NOT_STARTED },
      ];

      const evaluation = calculateChildMilestonesProgress(sampleMilestones, 14);
      expect(evaluation.totalMilestones).toBe(4);
      expect(evaluation.achievedCount).toBe(2);
      expect(evaluation.completionPercentage).toBe(50);
    });

    it('tracks child milestone status asynchronously with optimistic local fallback', async () => {
      const tracked = await trackChildMilestone('child-test-123', {
        milestoneId: 'ms-t0-gross-walk',
        status: MilestoneStatus.ACHIEVED,
      });

      expect(tracked).toBeDefined();
      expect(tracked.milestoneId).toBe('ms-t0-gross-walk');
      expect(tracked.status).toBe(MilestoneStatus.ACHIEVED);
      expect(tracked.achievedAt).toBeDefined();
    });
  });

  describe('Purposeful Brain Games & Play Activity Recommender', () => {
    it('verifies all canonical brain games are 100% screen-free', () => {
      for (const game of CANONICAL_BRAIN_GAMES) {
        expect(game.isScreenFree).toBe(true);
        expect(game.materialsNeeded.length).toBeGreaterThan(0);
        expect(game.targetSkills.length).toBeGreaterThan(0);
        expect(game.estimatedMinutes).toBeGreaterThan(5);
      }
    });

    it('returns tailored activities matching developmental tiers', async () => {
      const infantGame = await getDailyBrainGame(
        'child-mateo',
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );
      expect(infantGame.category).toBe(PlayCategory.PUPPET);
      expect(infantGame.title).toContain('Animal Puppet');

      const teenGame = await getDailyBrainGame(
        'child-julian',
        DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15
      );
      expect(teenGame.title).toContain('Dilemma Sparring');
    });

    it('allows catalog queries filtered by play category', async () => {
      const puppetGames = await getBrainGamesCatalog({ category: PlayCategory.PUPPET });
      expect(puppetGames.length).toBeGreaterThan(0);
      expect(puppetGames.every((g) => g.category === PlayCategory.PUPPET)).toBe(true);
    });
  });
});
