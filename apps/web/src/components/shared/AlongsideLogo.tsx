import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface AlongsideLogoProps {
  /** Size preset for emblem mark */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to render the 'AlongSide' editorial wordmark */
  showWordmark?: boolean;
  /** Optional subtitle beneath the wordmark */
  subtitle?: string;
  /** Custom class for wrapper container */
  className?: string;
  /** Custom class for wordmark typography */
  wordmarkClassName?: string;
  /** Prioritize image loading (above the fold) */
  priority?: boolean;
}

const SIZE_MAP = {
  xs: { box: 'h-6 w-6', px: 24, text: 'text-base', sub: 'text-[8px]' },
  sm: { box: 'h-8 w-8', px: 32, text: 'text-lg', sub: 'text-[9px]' },
  md: { box: 'h-9 w-9', px: 36, text: 'text-xl sm:text-2xl', sub: 'text-[9px]' },
  lg: { box: 'h-12 w-12', px: 48, text: 'text-2xl sm:text-3xl', sub: 'text-[10px]' },
  xl: { box: 'h-16 w-16', px: 64, text: 'text-3xl sm:text-4xl', sub: 'text-xs' },
};

export function AlongsideLogo({
  size = 'md',
  showWordmark = true,
  subtitle,
  className,
  wordmarkClassName,
  priority = false,
}: AlongsideLogoProps) {
  const config = SIZE_MAP[size];

  return (
    <div className={cn('flex items-center gap-2.5 shrink-0', className)}>
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-[7px] bg-[#143D2B] shadow-xs border border-[#143D2B]/15 transition-transform group-hover:scale-105',
          config.box
        )}
      >
        <Image
          src="/brand/alongside-emblem-128.png"
          alt="AlongSide Minimalist Sanctuary Emblem"
          width={config.px}
          height={config.px}
          className="h-full w-full object-cover"
          priority={priority}
        />
      </div>
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={cn(
              'font-serif font-bold tracking-tight text-[#111413] leading-tight',
              config.text,
              wordmarkClassName
            )}
          >
            AlongSide
          </span>
          {subtitle && (
            <span
              className={cn(
                'font-mono uppercase tracking-widest text-[#52B788] font-semibold -mt-0.5',
                config.sub
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
