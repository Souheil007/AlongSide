'use client';

import * as React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, setupReducedMotionMatch, MOTION_TOKENS } from '../../lib/animations/gsap';
import { cn } from '../../lib/utils';

export interface BlurTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;
  duration?: number;
  stagger?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  onComplete?: () => void;
}

/**
 * BlurText
 * Inspired by React Bits Blur Text, tailored for AlongSide's "Parent Calm" aesthetic.
 * Progressively reveals words or letters from soft optical blur to crisp typographic clarity
 * using smooth GSAP organic easing.
 */
export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className,
  as: Component = 'p',
  delay = 0.1,
  duration = MOTION_TOKENS.duration.standard,
  stagger = MOTION_TOKENS.stagger.tight,
  animateBy = 'words',
  direction = 'bottom',
  onComplete,
  ...props
}) => {
  const containerRef = React.useRef<HTMLElement>(null);

  const elements = React.useMemo(() => {
    if (animateBy === 'letters') {
      return text.split('');
    }
    return text.split(' ');
  }, [text, animateBy]);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const spans = containerRef.current.querySelectorAll('.blur-unit');
      if (spans.length === 0) return;

      const yOffset = direction === 'top' ? -MOTION_TOKENS.offset.subtle : MOTION_TOKENS.offset.subtle;

      setupReducedMotionMatch(
        // Normal Motion: Orchestrated blur-to-focus reveal
        () => {
          gsap.fromTo(
            spans,
            {
              filter: 'blur(10px)',
              opacity: 0,
              y: yOffset,
            },
            {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              duration,
              delay,
              stagger,
              ease: MOTION_TOKENS.ease.calm,
              onComplete,
            }
          );
        },
        // Reduced Motion: Immediate crisp display without blur or translation
        () => {
          gsap.set(spans, {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
          });
          onComplete?.();
        }
      );
    },
    { scope: containerRef, dependencies: [text, animateBy, delay, duration, stagger, direction] }
  );

  return (
    <Component
      ref={containerRef as any}
      aria-label={text}
      className={cn('inline-block leading-tight', className)}
      {...(props as any)}
    >
      {elements.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="blur-unit inline-block will-change-[filter,transform,opacity]"
          aria-hidden="true"
        >
          {item}
          {animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Component>
  );
};
