import { describe, expect, it } from 'vitest';
import {
  HeroSection,
  HERO_TRUST_SIGNALS,
  LifespanStageSelector,
  LIFESPAN_STAGES,
  PillarsShowcase,
  FIVE_BALANCED_PILLARS,
  DeviceActionHubSpotlight,
  DEVICE_HUB_STEPS,
  PediatricAuthorityTestimonials,
  PediatricAuthorityTestimonials as ClinicalAuthorityTestimonials,
  PEDIATRIC_TESTIMONIALS,
  PEDIATRIC_TESTIMONIALS as CLINICAL_TESTIMONIALS,
  PricingSection,
  PRICING_PLANS,
  FaqSection,
  FAQS,
} from '../src/components/home';

describe('Holistic Lifespan Family OS Homepage Specification (PLAN-23)', () => {
  describe('Canonical Section Components Export', () => {
    it('exports all 7 modular homepage components and canonical data models', () => {
      expect(typeof HeroSection).toBe('function');
      expect(typeof LifespanStageSelector).toBe('function');
      expect(typeof PillarsShowcase).toBe('function');
      expect(typeof DeviceActionHubSpotlight).toBe('function');
      expect(typeof ClinicalAuthorityTestimonials).toBe('function');
      expect(typeof PricingSection).toBe('function');
      expect(typeof FaqSection).toBe('function');
    });
  });

  describe('Hero Proposition & Developmental Trust Signals', () => {
    it('contains all 4 canonical trust badges required by PLAN-23', () => {
      expect(HERO_TRUST_SIGNALS).toHaveLength(4);

      const titles = HERO_TRUST_SIGNALS.map((s) => s.title);
      expect(titles).toContain('Neurobiology');
      expect(titles).toContain('CDC & AAP');
      expect(titles).toContain('Zero-Spyware');
      expect(titles).toContain('1-Click Cancel');

      const neuro = HERO_TRUST_SIGNALS.find((s) => s.title === 'Neurobiology');
      expect(neuro?.subtitle).toBe('Developmental Science');
    });
  });

  describe('Interactive Lifespan Stage Selector (0–18 Continuum)', () => {
    it('covers all 4 developmental age tiers from birth to adulthood', () => {
      expect(LIFESPAN_STAGES).toHaveLength(4);

      const stageIds = LIFESPAN_STAGES.map((s) => s.id);
      expect(stageIds).toEqual([
        'infants-toddlers',
        'early-childhood',
        'middle-childhood',
        'preteens-adolescents',
      ]);

      const ageLabels = LIFESPAN_STAGES.map((s) => s.ageLabel);
      expect(ageLabels).toContain('Ages 0–3');
      expect(ageLabels).toContain('Ages 4–6');
      expect(ageLabels).toContain('Ages 7–9');
      expect(ageLabels).toContain('Ages 10–18');
    });

    it('Stage 1 (Infants & Toddlers 0–3) provides 5 tailored courses across core categories', () => {
      const stage1 = LIFESPAN_STAGES.find((s) => s.id === 'infants-toddlers');
      expect(stage1).toBeDefined();
      expect(stage1?.title).toContain('Physical Health, Milestones & Safe Feeding');
      expect(stage1?.courses).toHaveLength(5);

      const courseSlugs = stage1?.courses.map((c) => c.slug);
      expect(courseSlugs).toContain('behavior-infant-coregulation');
      expect(courseSlugs).toContain('health-infant-sleep-foundations');
      expect(courseSlugs).toContain('nutrition-infant-first-foods');
      expect(courseSlugs).toContain('play-infant-sensory-language');
      expect(courseSlugs).toContain('digital-infant-zero-screens');

      // Verifies all courses have lesson count and duration
      for (const course of stage1!.courses) {
        expect(course.lessonCount).toBe(3);
        expect(course.durationMinutes).toBeGreaterThanOrEqual(12);
      }
    });

    it('Stage 2 (Early Childhood 4–6) provides 5 tailored courses across core categories', () => {
      const stage2 = LIFESPAN_STAGES.find((s) => s.id === 'early-childhood');
      expect(stage2).toBeDefined();
      expect(stage2?.title).toContain('Emotional Regulation, Picky Eating & Symbolic Play');
      expect(stage2?.courses).toHaveLength(5);

      const courseSlugs = stage2?.courses.map((c) => c.slug);
      expect(courseSlugs).toContain('behavior-preschool-feelings');
      expect(courseSlugs).toContain('health-preschool-immunity');
      expect(courseSlugs).toContain('nutrition-preschool-picky-eating');
      expect(courseSlugs).toContain('play-preschool-executive-function');
      expect(courseSlugs).toContain('digital-preschool-media-curation');
    });

    it('Stage 3 (Middle Childhood 7–9) provides 5 tailored courses across core categories', () => {
      const stage3 = LIFESPAN_STAGES.find((s) => s.id === 'middle-childhood');
      expect(stage3).toBeDefined();
      expect(stage3?.title).toContain('Cognitive Brain Games & Social Foundations');
      expect(stage3?.courses).toHaveLength(5);

      const courseSlugs = stage3?.courses.map((c) => c.slug);
      expect(courseSlugs).toContain('behavior-elementary-impulses');
      expect(courseSlugs).toContain('health-elementary-wellness');
      expect(courseSlugs).toContain('nutrition-elementary-fuel');
      expect(courseSlugs).toContain('play-elementary-logic-maker');
      expect(courseSlugs).toContain('digital-elementary-first-gaming');
    });

    it('Stage 4 (Pre-Teens & Teens 10–18) provides 5 tailored courses across core categories', () => {
      const stage4 = LIFESPAN_STAGES.find((s) => s.id === 'preteens-adolescents');
      expect(stage4).toBeDefined();
      expect(stage4?.title).toContain('Autonomy, Modern Tech & Youth Culture');
      expect(stage4?.courses).toHaveLength(5);

      const courseSlugs = stage4?.courses.map((c) => c.slug);
      expect(courseSlugs).toContain('behavior-tween-adrenarche');
      expect(courseSlugs).toContain('health-tween-circadian-leaps');
      expect(courseSlugs).toContain('nutrition-tween-growth-spurts');
      expect(courseSlugs).toContain('play-tween-flow-hobbies');
      expect(courseSlugs).toContain('digital-tween-smartphone-pacts');
    });
  });

  describe('The 5 Balanced Pillars Architecture Showcase', () => {
    it('defines exactly the 5 canonical pillars with dedicated routing and expert anchors', () => {
      expect(FIVE_BALANCED_PILLARS).toHaveLength(5);

      const categories = FIVE_BALANCED_PILLARS.map((p) => p.category);
      expect(categories).toContain('Pillar 1 • Physical Wellness & Sleep');
      expect(categories).toContain('Pillar 2 • Food & Nutrition');
      expect(categories).toContain('Pillar 3 • Milestones & Play');
      expect(categories).toContain('Pillar 4 • Emotional Health');
      expect(categories).toContain('Pillar 5 • Balanced Technology');

      const routes = FIVE_BALANCED_PILLARS.map((p) => p.href);
      expect(routes).toContain('/academy?category=HEALTH_AND_WELLNESS');
      expect(routes).toContain('/nutrition');
      expect(routes).toContain('/brain-games');
      expect(routes).toContain('/behavior');
      expect(routes).toContain('/devices');

      for (const pillar of FIVE_BALANCED_PILLARS) {
        expect(pillar.title.length).toBeGreaterThan(5);
        expect(pillar.description.length).toBeGreaterThan(20);
        expect(pillar.highlights.length).toBeGreaterThanOrEqual(3);
        expect((pillar.expertAnchor || pillar.clinicalAnchor || '').length).toBeGreaterThan(15);
      }
    });
  });

  describe('The "Thinking About Buying a Device?" Action Hub Spotlight', () => {
    it('structures device introduction across the 3 sequential steps', () => {
      expect(DEVICE_HUB_STEPS).toHaveLength(3);

      const steps = DEVICE_HUB_STEPS.map((s) => s.step);
      expect(steps).toEqual([1, 2, 3]);

      // Step 1: Readiness
      expect(DEVICE_HUB_STEPS[0]?.title).toContain('Readiness Score');
      expect(DEVICE_HUB_STEPS[0]?.previewTitle).toContain('84 / 100');

      // Step 2: Pact
      expect(DEVICE_HUB_STEPS[1]?.title).toContain('Bilateral Family Pact');

      // Step 3: Bedtime curfew lock
      expect(DEVICE_HUB_STEPS[2]?.title).toContain('Automated 8:30 PM Lock');
      expect(DEVICE_HUB_STEPS[2]?.previewTitle).toContain('Active 8:30 PM');
    });
  });

  describe('Pediatric Authority Testimonials & Accreditations', () => {
    it('features verified credentials from pediatric medicine, psychology, and speech therapy', () => {
      expect(PEDIATRIC_TESTIMONIALS).toHaveLength(3);

      const authors = PEDIATRIC_TESTIMONIALS.map((t) => t.author);
      expect(authors).toContain('Dr. Sarah Jenkins, MD, FAAP');
      expect(authors).toContain('Dr. Marcus Vance, PhD');
      expect(authors).toContain('Elena Rostova, MS, CCC-SLP');

      const roles = PEDIATRIC_TESTIMONIALS.map((t) => t.role);
      expect(roles.some((r) => r.includes('Pediatric Development Specialist'))).toBe(true);
      expect(roles.some((r) => r.includes('Developmental Neurobiologist'))).toBe(true);
      expect(roles.some((r) => r.includes('Milestone Specialist'))).toBe(true);

      for (const t of PEDIATRIC_TESTIMONIALS) {
        expect(t.quote.length).toBeGreaterThan(40);
        expect(t.institution.length).toBeGreaterThan(5);
      }
    });
  });

  describe('Pricing & 7-Day Free Trial Transparency', () => {
    it('presents both Annual Hero Pass ($79/yr) and Flex Pass ($9.99/mo)', () => {
      expect(PRICING_PLANS).toHaveLength(2);

      const annual = PRICING_PLANS.find((p) => p.id === 'hero-annual');
      expect(annual).toBeDefined();
      expect(annual?.price).toBe('$79');
      expect(annual?.period).toBe('/ year');
      expect(annual?.isPopular).toBe(true);
      expect(annual?.features.some((f) => f.includes('All Children Included'))).toBe(true);
      expect(annual?.ctaHref).toContain('annual');

      const flex = PRICING_PLANS.find((p) => p.id === 'flex-monthly');
      expect(flex).toBeDefined();
      expect(flex?.price).toBe('$9.99');
      expect(flex?.period).toBe('/ month');
      expect(flex?.ctaHref).toContain('monthly');
    });
  });

  describe('Parenting & Operational FAQs', () => {
    it('answers key parent questions regarding 0–18 scope, Barton Schmitt, and zero-spyware pledge', () => {
      expect(FAQS.length).toBeGreaterThanOrEqual(6);

      const questions = FAQS.map((f) => f.question);
      expect(
        questions.some((q) => q.includes('only for parents thinking about buying a phone'))
      ).toBe(true);
      expect(
        questions.some((q) => q.includes('ground its developmental guidance'))
      ).toBe(true);
      expect(
        questions.some((q) => q.includes('spyware or read my child’s private text messages'))
      ).toBe(true);
      expect(
        questions.some((q) => q.includes('Thinking About Buying a Device?'))
      ).toBe(true);
      expect(
        questions.some((q) => q.includes('multiple children across different ages'))
      ).toBe(true);

      for (const faq of FAQS) {
        expect(faq.answer.length).toBeGreaterThan(40);
      }
    });
  });
});
