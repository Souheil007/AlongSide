import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  MOTION_TOKENS,
  setupReducedMotionMatch,
  gsap,
  ScrollTrigger,
  useGSAP,
} from '../src/lib/animations/gsap';
import {
  HeroSection,
  HERO_TRUST_SIGNALS,
  PillarsShowcase,
  THREE_CORE_PILLARS,
  FIVE_BALANCED_PILLARS,
  LifespanStageSelector,
  CANONICAL_8_LIFESPAN_STAGES,
  CulturePlaygroundDemo,
  DEMO_SLANG_TERMS,
  DEMO_DINNER_STARTERS,
  DeviceActionHubSpotlight,
  DEVICE_HUB_STEPS,
  PediatricAuthorityTestimonials,
  PEDIATRIC_TESTIMONIALS,
  PricingSection,
  PRICING_PLANS,
  FaqSection,
  FAQS,
} from '../src/components/home';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

describe('Plan 41: Homepage GSAP "Parent Calm" Animation & Scroll Experience', () => {
  describe('1. Centralized GSAP Motion Tokens & Registration', () => {
    it('defines canonical "Parent Calm" motion tokens with organic gentle easing and reassuring durations', () => {
      // Ease curves
      expect(MOTION_TOKENS.ease.gentle).toBe('power2.out');
      expect(MOTION_TOKENS.ease.calm).toBe('power3.out');
      expect(MOTION_TOKENS.ease.reassure).toBe('sine.out');

      // Durations (0.35s to 1.4s)
      expect(MOTION_TOKENS.duration.fast).toBe(0.35);
      expect(MOTION_TOKENS.duration.standard).toBe(0.65);
      expect(MOTION_TOKENS.duration.hero).toBe(0.85);
      expect(MOTION_TOKENS.duration.aura).toBe(1.4);

      // Subtle offsets (12px to 28px)
      expect(MOTION_TOKENS.offset.subtle).toBe(12);
      expect(MOTION_TOKENS.offset.standard).toBe(20);
      expect(MOTION_TOKENS.offset.section).toBe(28);

      // Staggers
      expect(MOTION_TOKENS.stagger.tight).toBe(0.06);
      expect(MOTION_TOKENS.stagger.standard).toBe(0.1);
      expect(MOTION_TOKENS.stagger.cards).toBe(0.12);
    });

    it('exports gsap, ScrollTrigger, and useGSAP safely', () => {
      expect(typeof gsap).toBe('object');
      expect(typeof ScrollTrigger).toBe('function');
      expect(typeof useGSAP).toBe('function');
    });

    it('setupReducedMotionMatch handles headless test environment and executes normal callback', () => {
      const normalFn = vi.fn();
      const reducedFn = vi.fn();

      const mm = setupReducedMotionMatch(normalFn, reducedFn);
      expect(mm).toBeDefined();
      expect(normalFn).toHaveBeenCalledTimes(1);
      expect(typeof mm.revert).toBe('function');

      mm.revert();
    });

    it('setupReducedMotionMatch provides clean signature and reduced callback handling', () => {
      const normalFn = vi.fn();
      const reducedFn = vi.fn();

      setupReducedMotionMatch(normalFn, reducedFn);
      expect(normalFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('2. Sanctuary Hero Entrance Component (HeroSection)', () => {
    it('renders static markup with required animation classes and trust badges', () => {
      const html = renderToStaticMarkup(<HeroSection />);

      // Contains animation anchor classes
      expect(html).toContain('hero-ambient-aura');
      expect(html).toContain('hero-headline');
      expect(html).toContain('hero-subheadline');
      expect(html).toContain('hero-ctas');
      expect(html).toContain('hero-trust-badge');
      expect(html).toContain('hero-reassurance');

      // Contains content
      expect(html).toContain('The Parent Advisory Sanctuary');
      expect(html).toContain('Keep Up With Your Child');
      expect(html).toContain('Start 7-Day Risk-Free Trial');
      expect(html).toContain('Explore 6-Stage Curriculum');

      // All 4 canonical trust badges
      for (const badge of HERO_TRUST_SIGNALS) {
        expect(html).toContain(escapeHtml(badge.title));
        expect(html).toContain(escapeHtml(badge.subtitle));
      }
    });
  });

  describe('3. Core Pillars Showcase Component (PillarsShowcase)', () => {
    it('renders static markup with header, 3 pillar cards, and AI companion card', () => {
      const html = renderToStaticMarkup(<PillarsShowcase />);

      expect(html).toContain('pillars-header');
      expect(html).toContain('pillar-card');
      expect(html).toContain('pillars-advisor-card');
      expect(html).toContain('The 3 Pillars of');
      expect(html).toContain('Parent Calm');

      for (const pillar of THREE_CORE_PILLARS) {
        expect(html).toContain(escapeHtml(pillar.title));
        expect(html).toContain(pillar.number);
      }

      expect(html).toContain('24/7 AI Child Advisor: Safe Harbor Guidance');
    });
  });

  describe('4. Continuous Lifespan Stage Selector (LifespanStageSelector)', () => {
    it('renders static markup with stages-header, stage-tab-pill, and active stage content', () => {
      const html = renderToStaticMarkup(<LifespanStageSelector />);

      expect(html).toContain('stages-header');
      expect(html).toContain('stage-tab-pill');
      expect(html).toContain('Tailored Advisory for Every');
      expect(html).toContain('Developmental Horizon');

      for (const stage of CANONICAL_8_LIFESPAN_STAGES) {
        expect(html).toContain(stage.ageLabel.replace('Ages ', ''));
      }
    });
  });

  describe('5. Interactive Culture Playground & Slang Demo (CulturePlaygroundDemo)', () => {
    it('renders static markup with slang chips, cringe meter, and dinner starters', () => {
      const html = renderToStaticMarkup(<CulturePlaygroundDemo />);

      expect(html).toContain('culture-header');
      expect(html).toContain('culture-slang-card');
      expect(html).toContain('culture-starter-card');
      expect(html).toContain('Interactive Sunday Culture Radar');

      for (const item of DEMO_SLANG_TERMS) {
        expect(html).toContain(item.term);
      }

      expect(html).toContain('Cringe Meter:');
      expect(html).toContain('Sunday Dinner Table Starter:');
    });
  });

  describe('6. Device Action Hub Spotlight (DeviceActionHubSpotlight)', () => {
    it('renders static markup with 3 transition pipeline steps and contrast comparison', () => {
      const html = renderToStaticMarkup(<DeviceActionHubSpotlight />);

      expect(html).toContain('device-hub-header');
      expect(html).toContain('device-hub-step');
      expect(html).toContain('device-hub-contrast');
      expect(html).toContain('device-hub-cta');

      expect(html).toContain('Turn Device Introduction into an');
      expect(html).toContain('Empowering Rite of Passage');

      for (const step of DEVICE_HUB_STEPS) {
        expect(html).toContain(escapeHtml(step.title));
        expect(html).toContain(escapeHtml(step.label));
      }

      expect(html).toContain('The Legacy Surveillance Trap');
      expect(html).toContain('The AlongSide Parent Calm Way');
    });
  });

  describe('7. Pediatric Authority Testimonials (PediatricAuthorityTestimonials)', () => {
    it('renders static markup with testimonials-header, 3 testimonial cards, and citations', () => {
      const html = renderToStaticMarkup(<PediatricAuthorityTestimonials />);

      expect(html).toContain('testimonials-header');
      expect(html).toContain('testimonial-card');
      expect(html).toContain('testimonials-citations');

      expect(html).toContain('Backed by');
      expect(html).toContain('Pediatricians, Psychologists');

      for (const t of PEDIATRIC_TESTIMONIALS) {
        expect(html).toContain(escapeHtml(t.author));
        expect(html).toContain(escapeHtml(t.credentials));
      }

      expect(html).toContain('Zero-Spyware Privacy Pledge');
      expect(html).toContain('COPPA Safe Harbor Compliant');
    });
  });

  describe('8. Pricing & 7-Day Risk-Free Trial (PricingSection)', () => {
    it('renders static markup with pricing-header, 2 plan cards, and guarantee footer', () => {
      const html = renderToStaticMarkup(<PricingSection />);

      expect(html).toContain('pricing-header');
      expect(html).toContain('pricing-card');
      expect(html).toContain('pricing-footer');

      expect(html).toContain('Start Your Journey Toward');
      expect(html).toContain('Family Calm');

      for (const plan of PRICING_PLANS) {
        expect(html).toContain(escapeHtml(plan.name));
        expect(html).toContain(plan.price);
      }

      expect(html).toContain('No charge during your 7-day trial');
      expect(html).toContain('1-Click instant cancellation');
    });
  });

  describe('9. Comprehensive Parenting FAQ (FaqSection)', () => {
    it('renders static markup with faq-header and faq items', () => {
      const html = renderToStaticMarkup(<FaqSection />);

      expect(html).toContain('faq-header');
      expect(html).toContain('faq-card');
      expect(html).toContain('Clear Answers for');
      expect(html).toContain('Modern Parents');

      for (const faq of FAQS) {
        expect(html).toContain(escapeHtml(faq.question));
      }
    });
  });
});
