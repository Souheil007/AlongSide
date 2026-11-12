import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AcademyCategory, DevelopmentalTier } from '@alongside/shared';
import {
  LifespanStageSelector,
  CANONICAL_8_LIFESPAN_STAGES,
  CANONICAL_6_LIFESPAN_STAGES,
  LIFESPAN_STAGES,
} from './LifespanStageSelector';

describe('Plan 36 & 37: 8-Stage Lifespan Horizon & Category Advisory UI Specification', () => {
  describe('1. Canonical 8 Developmental Horizon Data Architecture', () => {
    it('defines exactly 8 lifespan tiers spanning continuous development from birth to adulthood (0–18)', () => {
      expect(CANONICAL_8_LIFESPAN_STAGES).toHaveLength(8);

      const stageIds = CANONICAL_8_LIFESPAN_STAGES.map((s) => s.id);
      expect(stageIds).toEqual([
        'infancy-0-1',
        'toddler-1-2',
        'older-toddler-2-3',
        'early-childhood',
        'middle-childhood',
        'pre-teens',
        'early-adolescence',
        'late-adolescence',
      ]);

      const tiers = CANONICAL_8_LIFESPAN_STAGES.map((s) => s.tier);
      expect(tiers).toEqual([
        DevelopmentalTier.TIER_0A_INFANCY_0_1,
        DevelopmentalTier.TIER_0B_TODDLER_1_2,
        DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
      ]);

      const ageLabels = CANONICAL_8_LIFESPAN_STAGES.map((s) => s.ageLabel);
      expect(ageLabels).toEqual([
        'Ages 0–1',
        'Ages 1–2',
        'Ages 2–3',
        'Ages 4–6',
        'Ages 7–9',
        'Ages 10–12',
        'Ages 13–15',
        'Ages 16–18',
      ]);
    });

    it('each developmental tier contains exactly 5 courses tailored to the 5 canonical Academy categories (40 courses total)', () => {
      const expectedCategories = [
        AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        AcademyCategory.HEALTH_AND_WELLNESS,
        AcademyCategory.NUTRITION_AND_FEEDING,
        AcademyCategory.DEVELOPMENT_AND_PLAY,
        AcademyCategory.DIGITAL_AND_DEVICES,
      ];

      let totalCourses = 0;
      for (const stage of CANONICAL_8_LIFESPAN_STAGES) {
        expect(stage.courses).toHaveLength(5);
        totalCourses += stage.courses.length;

        const stageCategories = stage.courses.map((c) => c.category);
        expect(stageCategories).toEqual(expectedCategories);

        for (const course of stage.courses) {
          expect(course.title.length).toBeGreaterThan(5);
          expect(course.summary.length).toBeGreaterThan(15);
          expect(course.slug.length).toBeGreaterThan(5);
          expect(course.categoryLabel.length).toBeGreaterThan(3);
          expect(course.categoryIcon).toBeDefined();
          expect(course.lessonCount).toBe(3);
          expect(course.durationMinutes).toBeGreaterThanOrEqual(12);
        }
      }
      expect(totalCourses).toBe(40);
    });

    it('preserves backward-compatible CANONICAL_6_LIFESPAN_STAGES export', () => {
      expect(CANONICAL_6_LIFESPAN_STAGES).toBe(CANONICAL_8_LIFESPAN_STAGES);
    });

    it('preserves backward-compatible LIFESPAN_STAGES export with 4 developmental tiers', () => {
      expect(LIFESPAN_STAGES).toHaveLength(4);
      const stageIds = LIFESPAN_STAGES.map((s) => s.id);
      expect(stageIds).toEqual([
        'infants-toddlers',
        'early-childhood',
        'middle-childhood',
        'preteens-adolescents',
      ]);
      expect(LIFESPAN_STAGES[3]?.ageLabel).toBe('Ages 10–18');
      expect(LIFESPAN_STAGES[3]?.courses).toHaveLength(5);
    });
  });

  describe('2. Component Rendering & Presentation Layer (LifespanStageSelector)', () => {
    it('renders section title, publication badge, and editorial subtitle without errors', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      expect(html).toContain('VOL. XXIV // CONTINUOUS LIFESPAN (0–18)');
      expect(html).toContain('Tailored Advisory for Every');
      expect(html).toContain('Developmental Horizon');
      expect(html).toContain('5 core growth categories');
    });

    it('renders all 8 horizon spectrum rail buttons wrapped cleanly (lg:grid-cols-8)', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      expect(html).toContain('role="tablist"');
      expect(html).toContain('lg:grid-cols-8');

      // Stage labels
      expect(html).toContain('Infancy');
      expect(html).toContain('Younger Toddler');
      expect(html).toContain('Older Toddler');
      expect(html).toContain('Early Childhood');
      expect(html).toContain('Middle Childhood');

      // Age numbers
      expect(html).toContain('0–1');
      expect(html).toContain('1–2');
      expect(html).toContain('2–3');
      expect(html).toContain('4–6');
      expect(html).toContain('7–9');
      expect(html).toContain('10–12');
      expect(html).toContain('13–15');
      expect(html).toContain('16–18');
    });

    it('verifies active stage telemetry capsule and exploration link are cleanly rendered', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      expect(html).not.toContain('5 clinical growth pillars calibrated for this stage');
      expect(html).not.toContain('Explore all Ages 0–3 curriculum');

      // Verified absence of redundant clunky banner headers
      expect(html).not.toContain('HORIZON // Ages 0–3');
      expect(html).not.toContain('Biological Circadian Delay &amp; Algorithmic Defense');
      expect(html).not.toContain('Protecting adolescent sleep architecture, sports nutrition, media literacy, and digital reputation.');
    });

    it('renders all 5 category badges and course cards for default tier', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      // Category Badges
      expect(html).toContain('Behavior &amp; Emotions');
      expect(html).toContain('Pediatric Health &amp; Sleep');
      expect(html).toContain('Nutrition &amp; Mealtime');
      expect(html).toContain('Development &amp; Play');
      expect(html).toContain('Digital &amp; Devices');

      // Course Titles
      expect(html).toContain('Sensory Overload &amp; Infant Co-Regulation');
      expect(html).toContain('Infant Health Foundations &amp; Sleep Architecture');
      expect(html).toContain('Infant First Foods &amp; Allergen Introduction');
      expect(html).toContain('Serve-and-Return Attunement &amp; Floor Time');
      expect(html).toContain('Zero Screens Under 2 &amp; Parent Tech Modeling');

      // Course URLs
      expect(html).toContain('/academy/behavior-infant-coregulation');
      expect(html).toContain('/academy/health-infant-sleep-foundations');
      expect(html).toContain('/academy/nutrition-infant-first-foods');
      expect(html).toContain('/academy/play-infant-sensory-language');
      expect(html).toContain('/academy/digital-infant-zero-screens');

      // Lesson telemetry
      expect(html).toContain('3 lessons');
      expect(html).toContain('13 min');
      expect(html).toContain('12 min');
    });

    it('verifies telemetry capsule and continuous lifespan footer lines are purged for clean presentation', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      expect(html).not.toContain('5 clinical growth pillars calibrated for this stage');
      expect(html).not.toContain('Continuous Lifespan Curriculum:');
      expect(html).not.toContain('Clinically peer-reviewed guidance covering every core developmental domain');
    });
  });

  describe('3. Rigorous Purge Verification (Zero Outdated Triage Slop or Barton Schmitt Emergency Text)', () => {
    it('completely purges legacy 2:00 AM pediatric triage cards and emergency fever simulation', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      // Outdated triage / emergency widgets
      expect(html).not.toContain('Barton Schmitt');
      expect(html).not.toContain('101.2°F');
      expect(html).not.toContain('The Safe Resort');
      expect(html).not.toContain('Safe at Home');
      expect(html).not.toContain('Leo — 14 Months Old');
      expect(html).not.toContain('Baked Peanut Butter');
      expect(html).not.toContain('Unlock full interactive cockpit');
    });

    it('completely purges outdated youth culture cringe scores and dense 4-card preview widgets', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      expect(html).not.toContain('Cringe:');
      expect(html).not.toContain('1. Active Leap');
      expect(html).not.toContain('2. Priority Chapter');
      expect(html).not.toContain('3. Youth Culture');
      expect(html).not.toContain('4. What to Say');
      expect(html).not.toContain('Crashout');
      expect(html).not.toContain('Skibidi');
    });
  });

  describe('4. Whole-Child Horizon Compass Arc & Spotlight Architecture (Design C.3)', () => {
    it('verifies all 40 courses across 8 tiers have authoritative clinical notes and 3 structured micro-lessons', () => {
      for (const stage of CANONICAL_8_LIFESPAN_STAGES) {
        for (const course of stage.courses) {
          expect(course.clinicalNote).toBeDefined();
          expect(course.clinicalNote.length).toBeGreaterThan(15);
          expect(course.lessons).toHaveLength(3);

          for (const lesson of course.lessons) {
            expect(lesson.num).toMatch(/^0[123]$/);
            expect(lesson.title.length).toBeGreaterThan(10);
            expect(lesson.dur).toMatch(/\d+ min/);
          }
        }
      }
    });

    it('renders the Whole-Child Compass hub, pillar focus tags, and 3-lesson micro-syllabus drawer', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      // Whole-Child Compass Hub
      expect(html).toContain('WHOLE-CHILD COMPASS // Ages 0–1 • 5 PILLARS OF DEVELOPMENT');
      expect(html).toContain('PILLAR FOCUS • Behavior &amp; Emotions • Ages 0–1');

      // Why This Matters Note Box (De-clinicalized)
      expect(html).toContain('Why This Matters:');
      expect(html).not.toContain('Clinical Rationale:');
      expect(html).toContain('Focus: Infant limbic system, crying curves &amp; vagal tone co-regulation.');

      // 3-Lesson Micro-Syllabus Drawer
      expect(html).toContain('Inside This Pillar (3 Lessons)');
      expect(html).toContain('§ 01');
      expect(html).toContain('Infant Limbic System &amp; The Crying Curve');
      expect(html).toContain('§ 02');
      expect(html).toContain('Vagal Tone &amp; Physical Soothing Cadence');
      expect(html).toContain('§ 03');
      expect(html).toContain('Sensory Resets for Overwhelmed Parents');

      // Primary CTA
      expect(html).toContain('Start Pillar Course in Academy');
      expect(html).toContain('href="/academy/behavior-infant-coregulation"');
    });
  });
});
