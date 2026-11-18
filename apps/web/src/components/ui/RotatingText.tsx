'use client';

import * as React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, setupReducedMotionMatch, MOTION_TOKENS } from '../../lib/animations/gsap';
import { cn } from '../../lib/utils';

export interface RotatingTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  words: string[];
  interval?: number;
  transitionDuration?: number;
  className?: string;
}

/**
 * RotatingText
 * Inspired by React Bits Rotating Text, tailored for AlongSide's "Parent Calm" headlines.
 * Seamlessly transitions through an array of phrases using gentle vertical slide and opacity.
 */
export const RotatingText: React.FC<RotatingTextProps> = ({
  words,
  interval = 3200,
  transitionDuration = 0.55,
  className,
  ...props
}) => {
  const [index, setIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (words.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  useGSAP(
    () => {
      if (!textRef.current) return;

      setupReducedMotionMatch(
        () => {
          gsap.fromTo(
            textRef.current,
            {
              opacity: 0,
              y: 12,
              filter: 'blur(4px)',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: transitionDuration,
              ease: MOTION_TOKENS.ease.calm,
            }
          );
        },
        () => {
          gsap.set(textRef.current, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          });
        }
      );
    },
    { scope: containerRef, dependencies: [index, transitionDuration] }
  );

  return (
    <span
      ref={containerRef}
      className={cn('inline-flex overflow-hidden py-0.5 align-top', className)}
      aria-live="polite"
      {...props}
    >
      <span ref={textRef} className="inline-block will-change-[transform,opacity,filter]">
        {words[index] || ''}
      </span>
    </span>
  );
};
