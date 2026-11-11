import { describe, expect, it } from 'vitest';
import { AcademyCategory } from '../src/constants/index.js';
import {
  parseDialogueCards,
  parseThirtySecondGlance,
  resolveAdaptiveModuleType,
  resolveReliefTagline,
} from '../src/algorithms/academy.js';

describe('Academy Algorithms & Pure Resolvers (PLAN-38)', () => {
  describe('resolveAdaptiveModuleType', () => {
    it('maps all 5 canonical Academy categories to their designated adaptive widgets', () => {
      expect(resolveAdaptiveModuleType(AcademyCategory.BEHAVIOR_AND_EMOTIONS)).toBe('SOMATIC_RESET');
      expect(resolveAdaptiveModuleType(AcademyCategory.HEALTH_AND_WELLNESS)).toBe('CIRCADIAN_TIMELINE');
      expect(resolveAdaptiveModuleType(AcademyCategory.NUTRITION_AND_FEEDING)).toBe('FEEDING_LADDER');
      expect(resolveAdaptiveModuleType(AcademyCategory.DEVELOPMENT_AND_PLAY)).toBe('PLAY_BLUEPRINT');
      expect(resolveAdaptiveModuleType(AcademyCategory.DIGITAL_AND_DEVICES)).toBe('PACT_CLAUSE');
    });

    it('returns SOMATIC_RESET for undefined or unknown categories', () => {
      expect(resolveAdaptiveModuleType(undefined)).toBe('SOMATIC_RESET');
      expect(resolveAdaptiveModuleType('UNKNOWN_CATEGORY' as any)).toBe('SOMATIC_RESET');
    });
  });

  describe('resolveReliefTagline', () => {
    it('derives authentic guilt-release tagline for behavior and emotions', () => {
      const tagline = resolveReliefTagline('Toddler Meltdowns in Grocery Aisles', AcademyCategory.BEHAVIOR_AND_EMOTIONS);
      expect(tagline).toContain('100% normal autonomic surge');
      expect(tagline).toContain('not a discipline failure');
    });

    it('provides specialized messaging for infant sleep and health', () => {
      const sleepTagline = resolveReliefTagline('Infant Safe Sleep & Wake Windows', AcademyCategory.HEALTH_AND_WELLNESS);
      expect(sleepTagline).toContain('Pediatric biological rhythm shift');
      expect(sleepTagline).toContain('not stubborn bedtime defiance');
    });

    it('provides specialized messaging for nutrition and feeding', () => {
      const nutritionTagline = resolveReliefTagline('Toddler Food Jags', AcademyCategory.NUTRITION_AND_FEEDING);
      expect(nutritionTagline).toContain('Natural neophobic palate protection');
      expect(nutritionTagline).toContain('not intentional mealtime rejection');
    });
  });

  describe('parseDialogueCards', () => {
    it('extracts structured dialogue cards from markdown comparative tables', () => {
      const markdown = `
### Delivery Tip:
> Lower your vocal pitch by a half-octave and soften your volume.

## Part 3: Comparative Dialogue Scripts

| What NOT to Say (The Instinctive Trap) | Why It Backfires (Neurobiology) | What to Say INSTEAD (Co-Regulation Script) |
| :--- | :--- | :--- |
| "Go to sleep right now!" | Cortisol spike keeps amygdala alerted | "Your body is tired, let us read one quiet book." |
| "Stop throwing things!" | Child lacks inhibitory prefrontal braking | "I see you are angry. Balls are for throwing, blocks stay on the floor." |

## Part 4: Step-by-Step Implementation Protocol
      `;

      const cards = parseDialogueCards(markdown);
      expect(cards.length).toBe(2);
      expect(cards[0]?.instinctiveMistake).toBe('Go to sleep right now!');
      expect(cards[0]?.empatheticScript).toBe('Your body is tired, let us read one quiet book.');
      expect(cards[0]?.whyItBackfires).toBe('Cortisol spike keeps amygdala alerted');
      expect(cards[0]?.deliveryTip).toBe('Lower your vocal pitch by a half-octave and soften your volume.');
    });

    it('falls back to default dialogue card when markdown lacks table', () => {
      const cards = parseDialogueCards('No table present here', 'Soft soothing voice');
      expect(cards.length).toBe(1);
      expect(cards[0]?.instinctiveMistake).toBe('Reacting with irritation or invalidation');
      expect(cards[0]?.deliveryTip).toBe('Soft soothing voice');
    });
  });

  describe('parseThirtySecondGlance', () => {
    it('synthesizes a 30-second crisis glance protocol', () => {
      const markdown = `
> **Clinical Insight:** Inability to inhibit impulse before age 4 due to ongoing myelination.

## Part 4: Tonight's Emergency Protocol
1. Drop below child eye level, breathe slowly, and state the neutral boundary.
      `;

      const cards = [
        {
          instinctiveMistake: 'Stop biting!',
          whyItBackfires: 'Activates shame spiral',
          empatheticScript: 'Teeth are not for biting people.',
          deliveryTip: 'Keep posture low and neutral',
        },
      ];

      const glance = parseThirtySecondGlance(
        markdown,
        cards,
        'Toddler Biting Protocol'
      );

      expect(glance.coreProblem).toBe('Inability to inhibit impulse before age 4 due to ongoing myelination.');
      expect(glance.immediateShift).toBe('Drop below child eye level, breathe slowly, and state the neutral boundary.');
      expect(glance.exactWords).toBe('Teeth are not for biting people.');
    });
  });
});
