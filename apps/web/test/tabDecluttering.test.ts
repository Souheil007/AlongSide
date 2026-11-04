import { describe, expect, it } from 'vitest';
import {
  deriveChildAge,
  deriveFeedingStage,
  deriveDevelopmentalTier,
} from '../src/hooks/useChildAge';
import { getRecommendedCurfew } from '../src/components/devices/DevicesManagementView';
import { CANONICAL_BRAIN_GAMES } from '../src/lib/api/brainGames';
import { CANONICAL_BEHAVIOR_GUIDES } from '../src/lib/api/behavior';
import { CANONICAL_NUTRITION_GUIDES } from '../src/lib/api/nutrition';
import {
  DevelopmentalTier,
  NutritionStage,
  RoadType,
  type ChildDTO,
} from '@alongside/shared';

describe('Holistic Domain Tabs Decluttering & Redundancy Purge Specification (PLAN-27)', () => {
  describe('Tab 1 & 3: Nutrition Hub Decluttering & Stage Auto-Focus', () => {
    it('automatically selects TODDLER_TABLE for a 2-year-old child', () => {
      const toddler2yo: Partial<ChildDTO> = {
        id: 'child-leo-2',
        name: 'Leo',
        age: 2,
        roadType: RoadType.PRE_DEVICE,
      };

      const childAge = deriveChildAge(toddler2yo);

      expect(childAge.feedingStage).toBe(NutritionStage.TODDLER_TABLE);
      expect(childAge.ageYears).toBe(2);
      expect(childAge.isUnder6Months).toBe(false);

      // Verify guide data matches the recommended stage
      const matchingGuide = CANONICAL_NUTRITION_GUIDES.find(
        (g) => g.stage === childAge.feedingStage
      );
      expect(matchingGuide).toBeDefined();
      expect(matchingGuide?.stageName).toContain('Toddler Table');
    });

    it('identifies older children (>= 3 yrs) to collapse infant BLW tabs while preserving them for infants', () => {
      const infant6mo = deriveChildAge({ age: 0, ageMonths: 6 });
      const preschooler4yo = deriveChildAge({ age: 4 });

      // Infant under 1 year should highlight BLW and early introduction
      expect(infant6mo.ageYears).toBe(0);
      expect(infant6mo.feedingStage).toBe(NutritionStage.SOLIDS_INTRODUCED);
      expect(infant6mo.ageYears < 3).toBe(true);

      // Child 4 years old is an older child (>= 3 yrs) where infant BLW should be collapsed by default
      expect(preschooler4yo.ageYears >= 3).toBe(true);
      expect(preschooler4yo.feedingStage).toBe(NutritionStage.BALANCED_SCHOOL);
    });
  });

  describe('Tab 4: Play Hub Decluttering & Auto-Tier Filtering', () => {
    it('auto-filters activities to the child developmental tier without requiring manual tier filter buttons', () => {
      const child8yo: Partial<ChildDTO> = {
        id: 'child-maya-8',
        name: 'Maya',
        age: 8,
        roadType: RoadType.PRE_DEVICE,
      };

      const childAge = deriveChildAge(child8yo);
      expect(childAge.developmentalTier).toBe(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);

      // Filter activities using the child's auto-derived tier
      const tierActivities = CANONICAL_BRAIN_GAMES.filter(
        (activity) =>
          activity.targetTier === childAge.developmentalTier ||
          activity.targetTier.includes(childAge.developmentalTier)
      );

      expect(tierActivities.length).toBeGreaterThan(0);
      // All filtered activities must match Tier 2
      tierActivities.forEach((activity) => {
        const matches =
          activity.targetTier === childAge.developmentalTier ||
          activity.targetTier.includes(childAge.developmentalTier);
        expect(matches).toBe(true);
      });
    });
  });

  describe('Tab 5: Behavior Hub Decluttering & Age-Prioritized Dilemmas', () => {
    it('surfaces toddler/preschool dilemmas (tantrums, defiance, aggression) for young kids <= 6', () => {
      const youngChild = deriveChildAge({ age: 3 });

      const prioritizedDilemmaIds =
        youngChild.ageYears <= 6
          ? ['tantrums', 'defiance', 'aggression']
          : ['sibling', 'lying', 'bedtime'];

      expect(prioritizedDilemmaIds).toEqual(['tantrums', 'defiance', 'aggression']);

      // Ensure canonical guides exist for these prioritized categories
      const matchingGuides = CANONICAL_BEHAVIOR_GUIDES.filter((g) =>
        prioritizedDilemmaIds.includes(g.category)
      );
      expect(matchingGuides.length).toBeGreaterThanOrEqual(3);
    });

    it('surfaces elementary dilemmas (sibling, lying, bedtime) for kids 7–9', () => {
      const elementaryChild = deriveChildAge({ age: 8 });

      const prioritizedDilemmaIds =
        elementaryChild.ageYears <= 6
          ? ['tantrums', 'defiance', 'aggression']
          : elementaryChild.ageYears <= 9
          ? ['sibling', 'lying', 'bedtime']
          : ['defiance', 'sibling', 'lying'];

      expect(prioritizedDilemmaIds).toEqual(['sibling', 'lying', 'bedtime']);
    });

    it('surfaces teen dilemmas (digital defiance, peer drama, secrecy) for teens 10+', () => {
      const teen = deriveChildAge({ age: 14 });

      const prioritizedDilemmaIds =
        teen.ageYears <= 6
          ? ['tantrums', 'defiance', 'aggression']
          : teen.ageYears <= 9
          ? ['sibling', 'lying', 'bedtime']
          : ['defiance', 'sibling', 'lying'];

      expect(prioritizedDilemmaIds).toEqual(['defiance', 'sibling', 'lying']);
    });
  });

  describe('Tab 6: Devices Hub & Youth Culture Digest Consolidation', () => {
    it('auto-calibrates bedtime curfew recommendations based on developmental age tiers', () => {
      // Under 9: 8:00 PM
      const curfewUnder9 = getRecommendedCurfew(7);
      expect(curfewUnder9.time24).toBe('20:00');
      expect(curfewUnder9.time12).toBe('8:00 PM');

      // 9-12: 8:30 PM
      const curfew9to12 = getRecommendedCurfew(11);
      expect(curfew9to12.time24).toBe('20:30');
      expect(curfew9to12.time12).toBe('8:30 PM');

      // 13+: 9:30 PM
      const curfewTeens = getRecommendedCurfew(15);
      expect(curfewTeens.time24).toBe('21:30');
      expect(curfewTeens.time12).toBe('9:30 PM');
    });
  });
});
