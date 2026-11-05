import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'destructive'
    | 'success'
    | 'accent'
    | 'roadPre'
    | 'roadActive'
    | 'publication'
    | 'telemetry';
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variantStyles: Record<string, string> = {
    default: 'bg-[#EAF3EE] text-[#143D2B] border-[#143D2B]/20',
    publication:
      'bg-[#EAF3EE] text-[#143D2B] border-[#143D2B]/20 font-mono text-[11px] font-semibold uppercase tracking-wider',
    telemetry:
      'bg-[#F4F4F0] text-[#111413] border-[#E3E3DC] font-mono text-xs font-medium',
    secondary: 'bg-[#F4F4F0] text-[#494F4C] border-[#E3E3DC]',
    outline: 'border border-[#E3E3DC] text-[#111413] bg-white',
    destructive: 'bg-red-50 text-red-700 border-red-200',
    success: 'bg-[#EAF3EE] text-[#143D2B] border-[#143D2B]/30',
    accent: 'bg-amber-50 text-[#B45309] border-amber-200',
    roadPre: 'bg-[#EAF3EE] text-[#143D2B] border-[#143D2B]/30 font-semibold',
    roadActive: 'bg-[#F4F4F0] text-[#111413] border-[#E3E3DC] font-semibold',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
