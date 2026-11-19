import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  HeroSection,
  HERO_AGE_MOMENTS,
  ProductStudioSection,
  STUDIO_ADVISOR_SCENARIOS,
  STUDIO_ACADEMY_LESSONS,
  STUDIO_SLANG_ITEMS,
  STUDIO_DINNER_QUESTIONS,
  ScreenPactSection,
  SCREEN_PACT_POINTS,
  ScienceFoundationSection,
  SCIENCE_PRINCIPLES,
  PricingAndFaqSection,
  FAMILY_PASS_OPTIONS,
  FAMILY_PASS_INCLUSIONS,
  HOME_FAQS,
} from '../src/components/home';

describe('Logged-Out Homepage Redesign Architecture', () => {
  describe('1. Hero Section & Interactive Child Age Lens', () => {
    it('defines all 5 lifespan age bands from 0 to 18 with actionable scripts', () => {
      expect(HERO_AGE_MOMENTS).toHaveLength(5);
      expect(HERO_AGE_MOMENTS.map((m) => m.id)).toEqual(['0-3', '4-6', '7-9', '10-12', '13-18']);

      for (const moment of HERO_AGE_MOMENTS) {
        expect(moment.child.length).toBeGreaterThan(3);
        expect(moment.script.length).toBeGreaterThan(20);
        expect(moment.brainNote.length).toBeGreaterThan(20);
        expect(moment.pairedGuide.length).toBeGreaterThan(10);
      }
    });

    it('renders the hero headline, age selector tabs, and default 4–6 live script card', () => {
      const html = renderToStaticMarkup(React.createElement(HeroSection));

      expect(html).toContain('Calm guidance for');
      expect(html).toContain('role="tablist"');
      expect(html).toContain('Chloe, age 5');
      expect(html).toContain('hero-sanctuary.jpg');
      expect(html).toContain('Start 7-day free trial');
    });
  });

  describe('2. Interactive Product Studio (Advisor, Academy, Sunday Digest)', () => {
    it('provides structured scenarios, 3 micro-lessons, 4 slang terms, and dinner starters', () => {
      expect(STUDIO_ADVISOR_SCENARIOS).toHaveLength(3);
      expect(STUDIO_ACADEMY_LESSONS).toHaveLength(3);
      expect(STUDIO_SLANG_ITEMS).toHaveLength(4);
      expect(STUDIO_DINNER_QUESTIONS).toHaveLength(3);
    });

    it('renders the 3 capability tabs and preserves legacy anchor compatibility', () => {
      const html = renderToStaticMarkup(React.createElement(ProductStudioSection));

      expect(html).toContain('Built for the moments you cannot wait out');
      expect(html).toContain('10-second Parent Advisor');
      expect(html).toContain('5-minute Parent Academy');
      expect(html).toContain('Sunday Culture Digest');
      expect(html).toContain('id="pillars"');
      expect(html).toContain('id="stages"');
      expect(html).toContain('id="digest"');
    });
  });

  describe('3. Evening Screen Pact Section (8:30 PM Neutral Dock)', () => {
    it('presents the 3 bilateral pact steps and renders evening dock preview', () => {
      expect(SCREEN_PACT_POINTS).toHaveLength(3);
      const html = renderToStaticMarkup(React.createElement(ScreenPactSection));

      expect(html).toContain('Boundaries without spyware');
      expect(html).toContain('8:30 PM');
      expect(html).toContain('evening-dock.jpg');
      expect(html).toContain('id="devices-hub"');
    });
  });

  describe('4. Science Foundation Section (Zero Fake Testimonials)', () => {
    it('renders 4 verifiable scientific principles and excludes invented doctor quotes', () => {
      expect(SCIENCE_PRINCIPLES).toHaveLength(4);
      const html = renderToStaticMarkup(React.createElement(ScienceFoundationSection));

      expect(html).toContain('Developmental science');
      expect(html).toContain('AAP &amp; CDC milestones');
      expect(html).toContain('Zero-spyware pledge');
      expect(html).toContain('sunday-table.jpg');

      // Ensure fabricated placeholder testimonials are permanently purged
      expect(html).not.toContain('Sarah Jenkins');
      expect(html).not.toContain('Marcus Vance');
      expect(html).not.toContain('Elena Rostova');
    });
  });

  describe('5. Unified Family Pass & FAQ Accordion (SOU-86 Non-Clinical Compliance)', () => {
    it('defines Annual ($79/yr) and Monthly ($9.99/mo) options with zero clinical triage leakage', () => {
      expect(FAMILY_PASS_OPTIONS.annual.price).toBe('$79');
      expect(FAMILY_PASS_OPTIONS.annual.period).toBe('/ year');
      expect(FAMILY_PASS_OPTIONS.annual.ctaHref).toBe('/register?plan=annual');

      expect(FAMILY_PASS_OPTIONS.monthly.price).toBe('$9.99');
      expect(FAMILY_PASS_OPTIONS.monthly.period).toBe('/ month');
      expect(FAMILY_PASS_OPTIONS.monthly.ctaHref).toBe('/register?plan=monthly');

      expect(FAMILY_PASS_INCLUSIONS).toHaveLength(4);
      expect(HOME_FAQS).toHaveLength(5);

      const html = renderToStaticMarkup(React.createElement(PricingAndFaqSection));
      expect(html).toContain('One Family Pass');
      expect(html).toContain('$79');
      expect(html).toContain('Common questions');

      // Enforce SOU-86 non-clinical platform mandate
      expect(html).not.toContain('Barton Schmitt');
      expect(html).not.toContain('Pediatric Fever Triage');
      expect(html).not.toContain('Symptom Triage');
    });
  });
});
