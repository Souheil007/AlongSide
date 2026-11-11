'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface NightstandModeToggleProps {
  isNightstandMode: boolean;
  onToggle: () => void;
  className?: string;
}

export function NightstandModeToggle({
  isNightstandMode,
  onToggle,
  className,
}: NightstandModeToggleProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onToggle}
      data-testid="nightstand-toggle"
      aria-label={
        isNightstandMode
          ? 'Switch to Normal Calm reading mode'
          : 'Switch to Nightstand Dim reading mode'
      }
      aria-pressed={isNightstandMode}
      className={cn(
        'gap-1.5 text-xs font-medium transition-colors h-8 px-2.5 rounded-full border',
        isNightstandMode
          ? 'bg-amber-950/40 text-amber-200 border-amber-800/80 hover:bg-amber-900/60 hover:text-amber-100'
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900',
        className
      )}
    >
      {isNightstandMode ? (
        <>
          <Sun className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden sm:inline">Normal Calm</span>
          <span className="sm:hidden">Day</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-indigo-500" />
          <span className="hidden sm:inline">🌙 Nightstand Dim</span>
          <span className="sm:hidden">🌙 Dim</span>
        </>
      )}
    </Button>
  );
}
