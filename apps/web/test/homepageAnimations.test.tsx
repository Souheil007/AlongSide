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
import HomePage from '../src/app/page';

describe('GSAP Parent Calm Motion Tokens & Homepage SSR Verification', () => {
  describe('1. Centralized GSAP Motion Tokens & Registration', () => {
    it('defines canonical Parent Calm motion tokens with gentle easing and durations', () => {
      expect(MOTION_TOKENS.ease.gentle).toBe('power2.out');
      expect(MOTION_TOKENS.ease.calm).toBe('power3.out');
      expect(MOTION_TOKENS.ease.reassure).toBe('sine.out');

      expect(MOTION_TOKENS.duration.fast).toBe(0.35);
      expect(MOTION_TOKENS.duration.standard).toBe(0.65);
      expect(MOTION_TOKENS.duration.hero).toBe(0.85);
      expect(MOTION_TOKENS.duration.aura).toBe(1.4);

      expect(MOTION_TOKENS.offset.subtle).toBe(12);
      expect(MOTION_TOKENS.offset.standard).toBe(20);
      expect(MOTION_TOKENS.offset.section).toBe(28);

      expect(MOTION_TOKENS.stagger.tight).toBe(0.06);
      expect(MOTION_TOKENS.stagger.standard).toBe(0.1);
      expect(MOTION_TOKENS.stagger.cards).toBe(0.12);
    });

    it('exports gsap, ScrollTrigger, and useGSAP safely', () => {
      expect(typeof gsap).toBe('object');
      expect(typeof ScrollTrigger).toBe('function');
      expect(typeof useGSAP).toBe('function');
    });

    it('setupReducedMotionMatch executes normal callback cleanly in headless test env', () => {
      const normalFn = vi.fn();
      const reducedFn = vi.fn();

      const mm = setupReducedMotionMatch(normalFn, reducedFn);
      expect(mm).toBeDefined();
      expect(normalFn).toHaveBeenCalledTimes(1);
      expect(typeof mm.revert).toBe('function');

      mm.revert();
    });
  });

  describe('2. Full Logged-Out Homepage SSR Composition', () => {
    it('renders all 5 editorial chapters cleanly without legacy AI-slop artifacts', () => {
      const html = renderToStaticMarkup(React.createElement(HomePage));

      expect(html).toContain('id="top"');
      expect(html).toContain('id="studio"');
      expect(html).toContain('id="pact"');
      expect(html).toContain('id="science"');
      expect(html).toContain('id="pricing"');
      expect(html).toContain('id="faq"');

      // Legacy boilerplate purged
      expect(html).not.toContain('VOL. XXIV');
      expect(html).not.toContain('hero-ambient-aura');
      expect(html).not.toContain('Barton Schmitt');
    });
  });
});
