'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ScrollProgressBarProps {
  className?: string;
}

export function ScrollProgressBar({ className }: ScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = React.useState<number>(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      data-testid="reading-progress-bar"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none',
        className
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
