import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Safe registration in browser environments
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/**
 * Centralized GSAP motion tokens conforming to the AlongSide "Parent Calm" philosophy.
 * Characterized by gentle, organic easing, slow reassuring reveals (0.65s - 0.85s),
 * and subtle Y-offsets (12px - 28px) with zero aggressive bouncy spring curves.
 */
export const MOTION_TOKENS = {
  ease: {
    gentle: 'power2.out',
    calm: 'power3.out',
    reassure: 'sine.out',
  },
  duration: {
    fast: 0.35,
    standard: 0.65,
    hero: 0.85,
    aura: 1.4,
  },
  offset: {
    subtle: 12,
    standard: 20,
    section: 28,
  },
  stagger: {
    tight: 0.06,
    standard: 0.1,
    cards: 0.12,
  },
} as const;

/**
 * Standardized helper for accessible animations honoring `prefers-reduced-motion`.
 * Creates a gsap.matchMedia() instance that executes `onNormalMotion` when motion is permitted,
 * or `onReducedMotion` (e.g. instant visibility or fade-only transitions) when reduced motion is preferred.
 * Safely guards against SSR or headless test environments without window.matchMedia.
 */
export function setupReducedMotionMatch(
  onNormalMotion: () => void,
  onReducedMotion?: () => void
): gsap.MatchMedia {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    onNormalMotion();
    return {
      add: () => {},
      revert: () => {},
      kill: () => {},
    } as unknown as gsap.MatchMedia;
  }

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    onNormalMotion();
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    if (onReducedMotion) {
      onReducedMotion();
    }
  });

  return mm;
}

export { gsap, ScrollTrigger, useGSAP };
