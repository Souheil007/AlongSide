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
    | 'roadActive';
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variantStyles: Record<string, string> = {
    default: 'bg-teal-50 text-teal-800 border-teal-200/80',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'border border-slate-300 text-slate-800 bg-transparent',
    destructive: 'bg-red-50 text-red-700 border-red-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    accent: 'bg-amber-50 text-amber-800 border-amber-200',
    roadPre: 'bg-emerald-100/70 text-emerald-900 border-emerald-300 font-semibold',
    roadActive: 'bg-violet-100/70 text-violet-900 border-violet-300 font-semibold',
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
