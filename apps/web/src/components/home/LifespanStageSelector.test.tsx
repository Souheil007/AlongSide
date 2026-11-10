import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AcademyCategory, DevelopmentalTier } from '@alongside/shared';
import {
  LifespanStageSelector,
  CANONICAL_6_LIFESPAN_STAGES,
  LIFESPAN_STAGES,
} from './LifespanStageSelector';

describe('Plan 35: Streamlined Developmental Horizon Courses & Category Advisory UI Specification', () => {
  describe('1. Canonical 6 Developmental Horizon Data Architecture', () => {
    it('defines exactly 6 lifespan tiers spanning continuous development from birth to adulthood (0–18)', () => {
      expect(CANONICAL_6_LIFESPAN_STAGES).toHaveLength(6);

      const stageIds = CANONICAL_6_LIFESPAN_STAGES.map((s) => s.id);
      expect(stageIds).toEqual([
        'infants-toddlers',
        'early-childhood',
        'middle-childhood',
        'pre-teens',
        'early-adolescence',
        'late-adolescence',
      ]);

      const tiers = CANONICAL_6_LIFESPAN_STAGES.map((s) => s.tier);
      expect(tiers).toEqual([
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
        DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
      ]);

      const ageLabels = CANONICAL_6_LIFESPAN_STAGES.map((s) => s.ageLabel);
      expect(ageLabels).toEqual([
        'Ages 0–3',
        'Ages 4–6',
        'Ages 7–9',
        'Ages 10–12',
        'Ages 13–15',
        'Ages 16–18',
      ]);
    });

    it('each developmental tier contains exactly 5 courses tailored to the 5 canonical Academy categories', () => {
      const expectedCategories = [
        AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        AcademyCategory.HEALTH_AND_WELLNESS,
        AcademyCategory.NUTRITION_AND_FEEDING,
        AcademyCategory.DEVELOPMENT_AND_PLAY,
        AcademyCategory.DIGITAL_AND_DEVICES,
      ];

      for (const stage of CANONICAL_6_LIFESPAN_STAGES) {
        expect(stage.courses).toHaveLength(5);

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

    it('renders all 6 horizon spectrum rail buttons on a single row (grid-cols-6) without horizontal scroll wheel or multi-line wraps', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      expect(html).toContain('role="tablist"');
      expect(html).toContain('grid-cols-6');
      expect(html).not.toContain('overflow-x-auto');

      // Full stage labels
      expect(html).toContain('Infants &amp; Toddlers');
      expect(html).toContain('Early Childhood');
      expect(html).toContain('Middle Childhood');
      expect(html).toContain('Pre-Teens &amp; Tweens');
      expect(html).toContain('Early Adolescence');
      expect(html).toContain('Late Adolescence');

      // Micro mobile labels
      expect(html).toContain('Infants');
      expect(html).toContain('Early');
      expect(html).toContain('Middle');
      expect(html).toContain('Tweens');
      expect(html).toContain('Teens');
      expect(html).toContain('Launch');

      // Age numbers
      expect(html).toContain('0–3');
      expect(html).toContain('4–6');
      expect(html).toContain('7–9');
      expect(html).toContain('10–12');
      expect(html).toContain('13–15');
      expect(html).toContain('16–18');
    });

    it('renders active stage telemetry capsule and exploration curriculum link without redundant banner noise', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      expect(html).toContain('Ages 0–3');
      expect(html).toContain('Infants &amp; Toddlers');
      expect(html).toContain('Explore all Ages 0–3 curriculum');
      expect(html).toContain('/academy?tier=TIER_0_INFANCY_TODDLER_0_3');

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
      expect(html).toContain('Infant Sensory Awakening &amp; Language Bursts');
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

    it('renders reassuring clinical footer bar linking directly to /academy', () => {
      const html = renderToStaticMarkup(React.createElement(LifespanStageSelector));

      expect(html).toContain('Continuous Lifespan Curriculum:');
      expect(html).toContain('Browse All Academy Categories');
      expect(html).toContain('href="/academy"');
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
    it('verifies all 30 courses across 6 tiers have authoritative clinical notes and 3 structured micro-lessons', () => {
      for (const stage of CANONICAL_6_LIFESPAN_STAGES) {
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
      expect(html).toContain('WHOLE-CHILD COMPASS // Ages 0–3 • 5 PILLARS OF DEVELOPMENT');
      expect(html).toContain('PILLAR FOCUS • Behavior &amp; Emotions • Ages 0–3');

      // Clinical Rationale Note Box
      expect(html).toContain('Clinical Rationale:');
      expect(html).toContain('Infant amygdala response &amp; mirror neuron co-regulation.');

      // 3-Lesson Micro-Syllabus Drawer
      expect(html).toContain('Inside This Pillar (3 Lessons)');
      expect(html).toContain('§ 01');
      expect(html).toContain('The Neurobiology of the Infant Amygdala &amp; Attachment Bond');
      expect(html).toContain('§ 02');
      expect(html).toContain('Pre-Verbal Tantrums: De-escalation Without Isolation');
      expect(html).toContain('§ 03');
      expect(html).toContain('The Co-Regulation Protocol: 3 Sensory Resets When Exhausted');

      // Primary CTA
      expect(html).toContain('Start Pillar Course in Academy');
      expect(html).toContain('href="/academy/behavior-infant-coregulation"');
    });
  });
});
