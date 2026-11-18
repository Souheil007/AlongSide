'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

/**
 * AuroraBackground
 * Inspired by React Bits Soft Aurora, tailored for AlongSide's "Parent Calm" aesthetic.
 * Renders a slow-moving, multi-hue organic aura wash (soft sage, teal, warm amber, and indigo)
 * that establishes an atmospheric sanctuary for parents without visual noise or battery drain.
 */
export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden bg-slate-50 transition-colors dark:bg-slate-950',
        className
      )}
      {...props}
    >
      {/* Aurora Ambient Waves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className={cn(
            'aurora-glow-layer absolute -inset-[10px] opacity-60 blur-[60px] filter will-change-transform dark:opacity-40',
            '[background-image:var(--aurora-gradient)]',
            '[--aurora-gradient:radial-gradient(ellipse_at_100%_0%,rgba(20,184,166,0.22)_0%,rgba(16,185,129,0.16)_25%,rgba(99,102,241,0.12)_50%,rgba(245,158,11,0.1)_75%,transparent_100%)]',
            'animate-aurora'
          )}
        />
        <div
          className={cn(
            'aurora-glow-layer-secondary absolute -inset-[10px] opacity-40 blur-[80px] filter will-change-transform dark:opacity-30',
            '[background-image:var(--aurora-secondary)]',
            '[--aurora-secondary:radial-gradient(ellipse_at_0%_100%,rgba(99,102,241,0.18)_0%,rgba(20,184,166,0.14)_30%,rgba(245,158,11,0.08)_60%,transparent_100%)]',
            'animate-aurora-reverse'
          )}
        />

        {showRadialGradient && (
          <div
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_center,transparent_20%,var(--background,white)_85%)] dark:[background-image:radial-gradient(ellipse_at_center,transparent_20%,var(--background,#020617)_85%)]"
          />
        )}
      </div>

      {/* Foreground Content */}
      {children && <div className="relative z-10 w-full">{children}</div>}
    </div>
  );
};
