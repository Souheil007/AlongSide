import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SpotlightCard } from '../src/components/ui/SpotlightCard';
import { BlurText } from '../src/components/ui/BlurText';
import { AuroraBackground } from '../src/components/ui/AuroraBackground';
import { CountUp } from '../src/components/ui/CountUp';
import { RotatingText } from '../src/components/ui/RotatingText';

describe('React Bits UI Primitives & Parent Calm Motion System', () => {
  describe('1. SpotlightCard', () => {
    it('renders static markup with children and required structural classes', () => {
      const html = renderToStaticMarkup(
        <SpotlightCard className="custom-test-card" spotlightColor="rgba(20, 184, 166, 0.2)">
          <div data-testid="card-content">Tactile Content</div>
        </SpotlightCard>
      );

      expect(html).toContain('custom-test-card');
      expect(html).toContain('Tactile Content');
      expect(html).toContain('pointer-events-none');
    });

    it('renders with custom spotlight and border colors in styles', () => {
      const html = renderToStaticMarkup(
        <SpotlightCard spotlightColor="rgba(52, 211, 153, 0.15)" size={400}>
          <span>Spotlight Inner</span>
        </SpotlightCard>
      );

      expect(html).toContain('Spotlight Inner');
      expect(html).toContain('radial-gradient');
    });
  });

  describe('2. BlurText', () => {
    it('renders accessible container with aria-label matching input text', () => {
      const text = 'Raise confident grounded kids';
      const html = renderToStaticMarkup(
        <BlurText text={text} className="test-headline" as="h1" />
      );

      expect(html).toContain('aria-label="Raise confident grounded kids"');
      expect(html).toContain('<h1');
      expect(html).toContain('test-headline');
      expect(html).toContain('blur-unit');
    });

    it('splits text into words and sets aria-hidden on split units', () => {
      const html = renderToStaticMarkup(
        <BlurText text="Calm Parent Sanctuary" animateBy="words" />
      );

      expect(html).toContain('Calm');
      expect(html).toContain('Parent');
      expect(html).toContain('Sanctuary');
      expect(html).toContain('aria-hidden="true"');
    });

    it('supports letter splitting when animateBy is letters', () => {
      const html = renderToStaticMarkup(
        <BlurText text="Pact" animateBy="letters" />
      );

      expect(html).toContain('>P<');
      expect(html).toContain('>a<');
      expect(html).toContain('>c<');
      expect(html).toContain('>t<');
    });
  });

  describe('3. AuroraBackground', () => {
    it('renders aurora ambient wash layers and children', () => {
      const html = renderToStaticMarkup(
        <AuroraBackground className="hero-aurora-test">
          <div className="hero-content">Sanctuary Content</div>
        </AuroraBackground>
      );

      expect(html).toContain('hero-aurora-test');
      expect(html).toContain('aurora-glow-layer');
      expect(html).toContain('animate-aurora');
      expect(html).toContain('Sanctuary Content');
    });

    it('renders without radial gradient mask when showRadialGradient is false', () => {
      const html = renderToStaticMarkup(
        <AuroraBackground showRadialGradient={false}>
          <span>No radial overlay</span>
        </AuroraBackground>
      );

      expect(html).toContain('No radial overlay');
      expect(html).toContain('animate-aurora');
    });
  });

  describe('4. CountUp', () => {
    it('renders initial formatted value with prefix, suffix, and decimals', () => {
      const html = renderToStaticMarkup(
        <CountUp to={84} from={0} prefix="Score: " suffix="%" decimals={0} className="score-counter" />
      );

      expect(html).toContain('score-counter');
      expect(html).toContain('Score: 0%');
      expect(html).toContain('font-mono');
    });

    it('formats decimals correctly in initial state', () => {
      const html = renderToStaticMarkup(
        <CountUp to={99.5} from={10.2} decimals={1} prefix="$" />
      );

      expect(html).toContain('$10.2');
    });
  });

  describe('5. RotatingText', () => {
    it('renders initial word from word array with polite live region', () => {
      const phrases = ['Sleep Regressions', 'Toddler Tantrums', 'Screen Time'];
      const html = renderToStaticMarkup(
        <RotatingText words={phrases} className="rotating-test" />
      );

      expect(html).toContain('aria-live="polite"');
      expect(html).toContain('Sleep Regressions');
      expect(html).toContain('rotating-test');
    });

    it('handles single word array without error', () => {
      const html = renderToStaticMarkup(
        <RotatingText words={['Single Word']} />
      );

      expect(html).toContain('Single Word');
    });
  });
});
