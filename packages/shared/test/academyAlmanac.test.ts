import { describe, expect, it } from 'vitest';
import {
  AcademyCategory,
  AlmanacVisualType,
  DevelopmentalTier,
  EditorialIllustrationKey,
  EpisodeRole,
  Gender,
} from '../src/constants/index.js';
import {
  getEpisodeRoleMeta,
  interpolateChildCopy,
  resolveAlmanacLessonPayload,
} from '../src/algorithms/academy.js';
import { AlmanacLessonPayloadSchema } from '../src/schemas/academy.js';
import type { AcademyLessonDTO, AlmanacLessonPayload } from '../src/types/index.js';

describe('Interactive Almanac v2 Engines & Contracts (PLAN-46)', () => {
  describe('interpolateChildCopy', () => {
    const sampleTemplate =
      'Why {Name} Suddenly Only {Eats} Beige Food: {name} {pushes} {poss} plate away at {age} ({ageShort}). {Pronoun} {cries} louder when {pronoun} {is} tired, and {possessive} brain needs calm around {obj}.';

    it('interpolates cleanly for a FEMALE child with zero token leakage', () => {
      const output = interpolateChildCopy(sampleTemplate, {
        name: 'Maya',
        gender: Gender.FEMALE,
        ageMonths: 30,
        developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
      });

      expect(output).toBe(
        'Why Maya Suddenly Only Eats Beige Food: Maya pushes her plate away at 2 yrs 6 mos (2.5-year-old). She cries louder when she is tired, and Maya’s brain needs calm around her.'
      );
      expect(output).not.toMatch(/\{[a-zA-Z]+\}/);
    });

    it('interpolates cleanly for a MALE child with singular possessive handling for names ending in s', () => {
      const output = interpolateChildCopy(sampleTemplate, {
        name: 'Lucas',
        gender: Gender.MALE,
        ageMonths: 37,
        developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
      });

      expect(output).toContain('Why Lucas Suddenly Only Eats Beige Food');
      expect(output).toContain('Lucas pushes his plate away at 3 yrs (3-year-old)');
      expect(output).toContain('He cries louder when he is tired');
      expect(output).toContain('Lucas’ brain needs calm around him.');
      expect(output).not.toMatch(/\{[a-zA-Z]+\}/);
    });

    it('falls back gracefully with grammatical singular/plural verbs when no child is selected', () => {
      const output = interpolateChildCopy(
        sampleTemplate,
        null,
        DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3
      );

      expect(output).toContain('Why Your toddler Suddenly Only Eats Beige Food');
      expect(output).toContain('your toddler pushes their plate away at Ages 2–3 (toddler)');
      expect(output).toContain('They cry louder when they are tired');
      expect(output).toContain('your toddler’s brain needs calm around them.');
      expect(output).not.toMatch(/\{[a-zA-Z]+\}/);
    });

    it('formats infants under 12 months cleanly', () => {
      const output = interpolateChildCopy('For {Name} ({age}, {ageShort})', {
        name: 'Nora',
        gender: Gender.FEMALE,
        ageMonths: 7,
        developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
      });
      expect(output).toBe('For Nora (7 mos, 7-month-old)');
    });
  });

  describe('resolveAlmanacLessonPayload', () => {
    const legacyLesson: AcademyLessonDTO = {
      id: 'les-legacy-1',
      moduleId: 'mod-1',
      slug: 'legacy-bedtime-routine',
      title: 'Setting Up Calm Evening Sleep Rhythms',
      contentMarkdown: `# Setting Up Calm Evening Sleep Rhythms

## Part 1: What It Looks Like at Home
Every night at 8:00 PM you ask for lights out and suddenly a debate begins about water, shadows, and one more book.

## Part 2: What's Going On Inside Their Growing Mind
Evening cortisol rises when transitions feel sudden. A dim, predictable wind-down lets melatonin climb naturally.

> **Key Takeaway:** Predictable sensory dimming signals safety faster than repeated reminders.

## Part 3: Comparative Dialogue Scripts
| What NOT to Say (The Instinctive Trap) | Why It Backfires (Neurobiology) | What to Say INSTEAD (Co-Regulation Script) |
| :--- | :--- | :--- |
| "Get in bed right now!" | Sharp tone raises alertness hormones right before sleep | "Lights are dim and our reading lamp is on. Pick two books and climb in." |
| "Fine, stay up 30 more minutes." | Shifting boundaries creates bedtime bargaining tomorrow | "I hear you want more time. One song with lights off, and I will sit beside you." |

### Delivery Tip:
> Drop your voice to a calm whisper before entering the bedroom.

## Part 4: 3 Simple Steps to Try at Home
1. Dim Lamps Early: Switch off overhead LEDs 45 minutes before lights out.
2. Visual Bedtime Strip: Put three pictures on the wall so the chart gives the cues.
3. Sit Quietly for 2 Minutes: Offer calm presence without opening new conversations.
`,
      readingMinutes: 3,
      sortOrder: 1,
      isCompleted: false,
      module: {
        id: 'mod-1',
        slug: 'health-infant-sleep-foundations',
        title: 'Infant Sleep Rhythms',
        developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        category: AcademyCategory.HEALTH_AND_WELLNESS,
      },
    };

    it('synthesizes a valid AlmanacLessonPayload from legacy markdown lessons', () => {
      const payload = resolveAlmanacLessonPayload(legacyLesson);
      const parsed = AlmanacLessonPayloadSchema.safeParse(payload);

      expect(parsed.success).toBe(true);
      expect(payload.episodeRole).toBe(EpisodeRole.FAST_WIN);
      expect(payload.visualType).toBe(AlmanacVisualType.CIRCADIAN_CURVE);
      expect(payload.illustration).toBe(EditorialIllustrationKey.moon_bed);
      expect(payload.almanacTruth).toContain('Predictable sensory dimming');
      expect(payload.beat2Lead.trim().toLowerCase()).not.toBe(
        payload.scienceDeepDive.trim().toLowerCase()
      );
      expect(payload.instincts.length).toBeGreaterThanOrEqual(2);
      expect(payload.calmScriptSegments.some((s) => Boolean(s.tag))).toBe(true);
      expect(payload.moves).toHaveLength(3);
      expect(payload.moves[0]?.title).toBe('Dim Lamps Early');
    });

    it('returns authored almanacPayload verbatim when present on the lesson', () => {
      const authored: AlmanacLessonPayload = {
        ...resolveAlmanacLessonPayload(legacyLesson),
        headline: 'Why {Name} Suddenly Only {Eats} Beige Food',
        visualType: AlmanacVisualType.SENSORY_LADDER,
        illustration: EditorialIllustrationKey.plate,
      };
      const result = resolveAlmanacLessonPayload({
        ...legacyLesson,
        almanacPayload: authored,
      });

      expect(result).toBe(authored);
      expect(result.headline).toBe('Why {Name} Suddenly Only {Eats} Beige Food');
      expect(result.visualType).toBe(AlmanacVisualType.SENSORY_LADDER);
    });
  });

  describe('getEpisodeRoleMeta', () => {
    it('maps all 4 roles cleanly', () => {
      expect(getEpisodeRoleMeta(EpisodeRole.FAST_WIN).label).toBe('The Fast Win');
      expect(getEpisodeRoleMeta(EpisodeRole.BRAIN_DECODER).label).toBe('The Brain Decoder');
      expect(getEpisodeRoleMeta(EpisodeRole.RHYTHM_RESET).label).toBe('The Rhythm Reset');
      expect(getEpisodeRoleMeta(EpisodeRole.LONG_TERM_BOND).label).toBe('The Long-Term Bond');
    });
  });
});
