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
  ClinicalAuthorityTestimonials,
  CLINICAL_TESTIMONIALS,
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

  describe('Hero Proposition & Clinical Trust Signals', () => {
    it('contains all 4 canonical trust badges required by PLAN-23', () => {
      expect(HERO_TRUST_SIGNALS).toHaveLength(4);

      const titles = HERO_TRUST_SIGNALS.map((s) => s.title);
      expect(titles).toContain('Barton Schmitt');
      expect(titles).toContain('CDC & AAP');
      expect(titles).toContain('Zero-Spyware');
      expect(titles).toContain('1-Click Cancel');

      const barton = HERO_TRUST_SIGNALS.find((s) => s.title === 'Barton Schmitt');
      expect(barton?.subtitle).toBe('Pediatric Protocols');
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

    it('Stage 1 (Infants & Toddlers 0–3) provides pediatric triage, safe allergens & CDC milestones', () => {
      const stage1 = LIFESPAN_STAGES.find((s) => s.id === 'infants-toddlers');
      expect(stage1).toBeDefined();
      expect(stage1?.title).toContain('Physical Health, Milestones & Safe Feeding');

      const highlightTitles = stage1?.highlights.map((h) => h.title);
      expect(highlightTitles?.some((t) => t.includes('Pediatric Fever Triage') || t.includes('Safe Resort'))).toBe(true);
      expect(stage1?.highlights.some((h) => h.description.includes('Barton Schmitt'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('Allergen'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('CDC Milestones'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('Puppet'))).toBe(true);

      // Realistic preview widget
      expect(stage1?.previewWidget.statusBadge).toContain('Safe at Home');
      expect(stage1?.previewWidget.items.some((it) => it.label.includes('Fever Assessment'))).toBe(true);
      expect(stage1?.previewWidget.items.some((it) => it.label.includes('Allergen Exposure'))).toBe(true);
    });

    it('Stage 2 (Early Childhood 4–6) provides HALT diagnostic, Ellyn Satter feeding & bedtime co-regulation', () => {
      const stage2 = LIFESPAN_STAGES.find((s) => s.id === 'early-childhood');
      expect(stage2).toBeDefined();
      expect(stage2?.title).toContain('Emotional Regulation, Picky Eating & Symbolic Play');

      const highlightTitles = stage2?.highlights.map((h) => h.title);
      expect(highlightTitles?.some((t) => t.includes('HALT Tantrum Diagnostic'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('Division of Responsibility'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('Building Blocks'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('Bedtime Routine'))).toBe(true);

      expect(stage2?.previewWidget.title).toContain('Maya — Age 5');
      expect(stage2?.previewWidget.items.some((it) => it.label.includes('Grocery Store Meltdown'))).toBe(true);
    });

    it('Stage 3 (Middle Childhood 7–9) provides logic puzzles, boredom buster & peer friendship coaching', () => {
      const stage3 = LIFESPAN_STAGES.find((s) => s.id === 'middle-childhood');
      expect(stage3).toBeDefined();
      expect(stage3?.title).toContain('Cognitive Brain Games & Social Foundations');

      const highlightTitles = stage3?.highlights.map((h) => h.title);
      expect(highlightTitles?.some((t) => t.includes('Chess'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('Boredom Buster'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('Friendship'))).toBe(true);

      expect(stage3?.previewWidget.title).toContain('Julian — Age 8');
      expect(stage3?.previewWidget.items.some((it) => it.detail.includes('100% Screen-Free'))).toBe(true);
    });

    it('Stage 4 (Pre-Teens & Teens 10–18) provides readiness diagnostic, bilateral pact & neutral curfews', () => {
      const stage4 = LIFESPAN_STAGES.find((s) => s.id === 'preteens-adolescents');
      expect(stage4).toBeDefined();
      expect(stage4?.title).toContain('Autonomy, Modern Tech & Youth Culture');

      const highlightTitles = stage4?.highlights.map((h) => h.title);
      expect(highlightTitles?.some((t) => t.includes('Readiness Assessment (Score 0–100)'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('Pact-as-Code'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('8:30 PM'))).toBe(true);
      expect(highlightTitles?.some((t) => t.includes('Slang Intelligence'))).toBe(true);

      expect(stage4?.previewWidget.title).toContain('Sofia — Age 12');
      expect(stage4?.previewWidget.statusBadge).toContain('Curfew Enforced');
    });
  });

  describe('The 5 Balanced Pillars Architecture Showcase', () => {
    it('defines exactly the 5 canonical pillars with dedicated routing and clinical anchors', () => {
      expect(FIVE_BALANCED_PILLARS).toHaveLength(5);

      const categories = FIVE_BALANCED_PILLARS.map((p) => p.category);
      expect(categories).toContain('Pillar 1 • Clinical Health');
      expect(categories).toContain('Pillar 2 • Food & Nutrition');
      expect(categories).toContain('Pillar 3 • Milestones & Play');
      expect(categories).toContain('Pillar 4 • Emotional Health');
      expect(categories).toContain('Pillar 5 • Balanced Technology');

      const routes = FIVE_BALANCED_PILLARS.map((p) => p.href);
      expect(routes).toContain('/health');
      expect(routes).toContain('/nutrition');
      expect(routes).toContain('/brain-games');
      expect(routes).toContain('/behavior');
      expect(routes).toContain('/devices');

      for (const pillar of FIVE_BALANCED_PILLARS) {
        expect(pillar.title.length).toBeGreaterThan(5);
        expect(pillar.description.length).toBeGreaterThan(20);
        expect(pillar.highlights.length).toBeGreaterThanOrEqual(3);
        expect(pillar.clinicalAnchor.length).toBeGreaterThan(15);
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

  describe('Clinical Authority Testimonials & Accreditations', () => {
    it('features verified credentials from pediatric medicine, psychology, and speech therapy', () => {
      expect(CLINICAL_TESTIMONIALS).toHaveLength(3);

      const authors = CLINICAL_TESTIMONIALS.map((t) => t.author);
      expect(authors).toContain('Dr. Sarah Jenkins, MD, FAAP');
      expect(authors).toContain('Dr. Marcus Vance, PhD');
      expect(authors).toContain('Elena Rostova, MS, CCC-SLP');

      const roles = CLINICAL_TESTIMONIALS.map((t) => t.role);
      expect(roles.some((r) => r.includes('Pediatric Emergency Medicine'))).toBe(true);
      expect(roles.some((r) => r.includes('Developmental Neurobiologist'))).toBe(true);
      expect(roles.some((r) => r.includes('Milestone Specialist'))).toBe(true);

      for (const t of CLINICAL_TESTIMONIALS) {
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

  describe('Clinical & Operational FAQs', () => {
    it('answers key parent questions regarding 0–18 scope, Barton Schmitt, and zero-spyware pledge', () => {
      expect(FAQS.length).toBeGreaterThanOrEqual(6);

      const questions = FAQS.map((f) => f.question);
      expect(
        questions.some((q) => q.includes('only for parents thinking about buying a phone'))
      ).toBe(true);
      expect(
        questions.some((q) => q.includes('Barton Schmitt pediatric triage protocols'))
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
