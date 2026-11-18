'use client';

import * as React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, setupReducedMotionMatch, MOTION_TOKENS } from '../../lib/animations/gsap';
import { cn } from '../../lib/utils';

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
  onComplete?: () => void;
}

/**
 * CountUp
 * Inspired by React Bits Count Up, tailored for AlongSide's "Parent Calm" metrics.
 * Smoothly animates numbers (readiness scores, milestone checks, habit streaks)
 * with accessible reduced-motion support.
 */
export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1.4,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = '',
  className,
  onComplete,
  ...props
}) => {
  const [displayValue, setDisplayValue] = React.useState<string>(() => {
    return `${prefix}${from.toFixed(decimals)}${suffix}`;
  });
  const containerRef = React.useRef<HTMLSpanElement>(null);

  const formatNumber = React.useCallback(
    (num: number): string => {
      const fixed = num.toFixed(decimals);
      if (!separator) return `${prefix}${fixed}${suffix}`;

      const parts = fixed.split('.');
      const intPart = parts[0] ?? '0';
      const decPart = parts[1];
      const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return `${prefix}${decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt}${suffix}`;
    },
    [decimals, prefix, suffix, separator]
  );

  useGSAP(
    () => {
      const targetObj = { val: from };

      setupReducedMotionMatch(
        // Normal Motion: Smooth numerical tween
        () => {
          gsap.to(targetObj, {
            val: to,
            duration,
            delay,
            ease: MOTION_TOKENS.ease.calm,
            onUpdate: () => {
              setDisplayValue(formatNumber(targetObj.val));
            },
            onComplete: () => {
              setDisplayValue(formatNumber(to));
              onComplete?.();
            },
          });
        },
        // Reduced Motion: Jump directly to target
        () => {
          setDisplayValue(formatNumber(to));
          onComplete?.();
        }
      );
    },
    { scope: containerRef, dependencies: [to, from, duration, delay, decimals, prefix, suffix, separator] }
  );

  return (
    <span
      ref={containerRef}
      className={cn('inline-block font-mono tabular-nums will-change-contents', className)}
      {...props}
    >
      {displayValue}
    </span>
  );
};
