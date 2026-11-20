import { describe, expect, it } from 'vitest';
import {
  AlmanacLessonPayloadSchema,
  DevelopmentalTier,
  Gender,
  interpolateChildCopy,
  type ChildPersonalizationContext,
} from '@alongside/shared';
import {
  ACADEMY_SEED_MODULES,
  MASTER_VIDEO_LECTURES_BY_LESSON_SLUG,
} from '../prisma/seed/academy.seed.js';

const WAVE_1_TIERS = new Set<DevelopmentalTier>([
  DevelopmentalTier.TIER_0A_INFANCY_0_1,
  DevelopmentalTier.TIER_0B_TODDLER_1_2,
  DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
]);

const WAVE_2_TIERS = new Set<DevelopmentalTier>([
  DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
  DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
]);

const WAVE_3_TIERS = new Set<DevelopmentalTier>([
  DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
  DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
]);

const CHILD_FIXTURES: Array<ChildPersonalizationContext | null> = [
  {
    name: 'Maya',
    gender: Gender.FEMALE,
    ageMonths: 30,
    developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
  },
  {
    name: 'Lucas',
    gender: Gender.MALE,
    ageMonths: 96,
    developmentalTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
  },
  {
    name: 'Jordan',
    gender: Gender.FEMALE,
    ageMonths: 192,
    developmentalTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
  },
  null,
];

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
  } else if (value && typeof value === 'object') {
    for (const v of Object.values(value as Record<string, unknown>)) {
      collectStrings(v, out);
    }
  }
  return out;
}

describe('Academy Curriculum Zero-Bluff & Content Integrity Guard (PLAN-47 Full Catalog)', () => {
  const allLessons = ACADEMY_SEED_MODULES.flatMap((mod) =>
    mod.lessons.map((lesson) => ({ mod, lesson }))
  );

  it('contains all 40 courses and exactly 143 zero-bluff episodes across Waves 1, 2, and 3 with unique slugs', () => {
    expect(ACADEMY_SEED_MODULES).toHaveLength(40);
    expect(allLessons).toHaveLength(143);

    const wave1Modules = ACADEMY_SEED_MODULES.filter((m) => WAVE_1_TIERS.has(m.developmentalTier));
    const wave2Modules = ACADEMY_SEED_MODULES.filter((m) => WAVE_2_TIERS.has(m.developmentalTier));
    const wave3Modules = ACADEMY_SEED_MODULES.filter((m) => WAVE_3_TIERS.has(m.developmentalTier));

    expect(wave1Modules).toHaveLength(15);
    expect(wave1Modules.flatMap((m) => m.lessons)).toHaveLength(55);

    expect(wave2Modules).toHaveLength(10);
    expect(wave2Modules.flatMap((m) => m.lessons)).toHaveLength(35);

    expect(wave3Modules).toHaveLength(15);
    expect(wave3Modules.flatMap((m) => m.lessons)).toHaveLength(53);

    const moduleSlugs = new Set<string>();
    const lessonSlugs = new Set<string>();

    for (const mod of ACADEMY_SEED_MODULES) {
      expect(moduleSlugs.has(mod.slug), `Duplicate module slug: ${mod.slug}`).toBe(false);
      moduleSlugs.add(mod.slug);
      expect(mod.lessons.length).toBeGreaterThanOrEqual(3);
      expect(mod.lessons.length).toBeLessThanOrEqual(4);

      const courseLessonSlugs = new Set(mod.lessons.map((l) => l.slug));
      for (const lesson of mod.lessons) {
        expect(lessonSlugs.has(lesson.slug), `Duplicate lesson slug: ${lesson.slug}`).toBe(false);
        lessonSlugs.add(lesson.slug);

        const hookTarget = lesson.almanacPayload?.nextEpisodeHook?.targetSlug;
        if (hookTarget) {
          expect(
            courseLessonSlugs.has(hookTarget),
            `Broken nextEpisodeHook.targetSlug "${hookTarget}" on ${lesson.slug}`
          ).toBe(true);
        }
      }
    }
  });

  it('enforces video hygiene: zero duplicate video URLs within a course, verified relocations, and jumpChips on every Master Talk', () => {
    // 1. Removed mismatched Burke Harris trauma talk from background TV
    expect(MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['background-tv-and-acoustic-smog']).toBeUndefined();
    // 2. Relocated Cal Newport Deep Work to play-teen-intellectual-mastery (teen-deep-work-block)
    expect(MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['teen-zero-distracted-driving-pledge']).toBeUndefined();
    expect(MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['teen-deep-work-block']?.presenter).toContain('Cal Newport');

    // 3. Every Master Talk slug maps to a real surviving episode, includes 2+ jumpChips, and stays within duration
    const survivingSlugs = new Set(allLessons.map(({ lesson }) => lesson.slug));
    for (const [slug, video] of Object.entries(MASTER_VIDEO_LECTURES_BY_LESSON_SLUG)) {
      expect(survivingSlugs.has(slug), `Master video mapped to missing episode slug: ${slug}`).toBe(true);
      expect(video.jumpChips?.length ?? 0, `Missing jumpChips on ${slug}`).toBeGreaterThanOrEqual(2);
      for (const chip of video.jumpChips ?? []) {
        expect(
          chip.seconds,
          `Jump chip ${chip.seconds}s exceeds duration ${video.durationMinutes}m on ${slug}`
        ).toBeLessThan(video.durationMinutes * 60);
      }
    }

    // 4. Zero duplicate videoUrls inside any single course
    for (const mod of ACADEMY_SEED_MODULES) {
      const urls = mod.lessons
        .map((l) => l.videoLecture?.videoUrl)
        .filter((u): u is string => Boolean(u));
      expect(new Set(urls).size, `Duplicate videoUrl in course ${mod.slug}`).toBe(urls.length);
    }
  });

  it('enforces ZERO boilerplate closings, ZERO broken interpolations, and 100% unique closing notes across all 143 episodes', () => {
    const closingNotes = new Set<string>();
    for (const { lesson } of allLessons) {
      expect(lesson.contentMarkdown).not.toContain('moments around  can test');
      expect(lesson.contentMarkdown).not.toContain('can test even the most patient caregiver');
      expect(lesson.contentMarkdown).not.toContain('quiet wonders of parenting');
      expect(lesson.almanacPayload, `Missing almanacPayload on ${lesson.slug}`).toBeTruthy();

      const closing = lesson.almanacPayload!.closingNote.trim();
      expect(closingNotes.has(closing), `Duplicate closingNote on ${lesson.slug}`).toBe(false);
      closingNotes.add(closing);
    }
  });

  it('enforces SOU-86 Non-Clinical Mandate across all 40 courses and 143 episodes', () => {
    const forbiddenPattern = /\b(triage|anorexia|symptom checker|disordered eating screening)\b/i;
    for (const { lesson } of allLessons) {
      expect(lesson.slug, `SOU-86 violation in slug: ${lesson.slug}`).not.toMatch(forbiddenPattern);
      expect(lesson.title, `SOU-86 violation in title: ${lesson.slug}`).not.toMatch(forbiddenPattern);
      expect(
        lesson.almanacPayload?.headline ?? '',
        `SOU-86 violation in headline: ${lesson.slug}`
      ).not.toMatch(forbiddenPattern);
    }
  });

  it('validates 100% of all 143 episodes against AlmanacLessonPayloadSchema with zero token leakage across child fixtures', () => {
    for (const { mod, lesson } of allLessons) {
      const parsed = AlmanacLessonPayloadSchema.safeParse(lesson.almanacPayload);
      expect(
        parsed.success,
        `Schema validation failed for ${lesson.slug}: ${
          parsed.success ? '' : JSON.stringify(parsed.error.issues)
        }`
      ).toBe(true);

      const payload = lesson.almanacPayload!;
      expect(
        payload.beat2Lead.trim().toLowerCase(),
        `beat2Lead and scienceDeepDive are identical on ${lesson.slug}`
      ).not.toBe(payload.scienceDeepDive.trim().toLowerCase());

      const annotatedSegments = payload.calmScriptSegments.filter(
        (s) => Boolean(s.id && s.tag && s.note)
      );
      expect(
        annotatedSegments.length,
        `Expected >=2 annotated segments on ${lesson.slug}`
      ).toBeGreaterThanOrEqual(2);
      expect(payload.pushbacks.length, `Expected >=2 pushbacks on ${lesson.slug}`).toBeGreaterThanOrEqual(2);
      expect(payload.moves, `Expected 3 moves on ${lesson.slug}`).toHaveLength(3);

      // Verify interpolation across MALE, FEMALE, and null child profiles leaves zero {token} artifacts
      const allStrings = [lesson.title, ...collectStrings(payload)];
      for (const child of CHILD_FIXTURES) {
        for (const raw of allStrings) {
          const rendered = interpolateChildCopy(raw, child, mod.developmentalTier);
          expect(
            rendered,
            `Unresolved token in ${lesson.slug} (${child?.name ?? 'null'}): ${rendered}`
          ).not.toMatch(/\{[a-zA-Z]+\}/);
          expect(
            rendered,
            `Double-space gap in ${lesson.slug}: ${rendered}`
          ).not.toMatch(/ {2,}/);
        }
      }
    }
  });
});
