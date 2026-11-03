'use client';

import * as React from 'react';
import {
  MessageSquareQuote,
  Moon,
  Flame,
  KeyRound,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuickPromptItem {
  id: string;
  label: string;
  prompt: string;
  category: 'social' | 'bedtime' | 'meltdown' | 'safety' | 'privacy';
  icon: React.ComponentType<{ className?: string }>;
}

export const SITUATIONAL_PROMPTS: QuickPromptItem[] = [
  {
    id: 'snapchat-plea',
    label: '10yo Wants Snapchat',
    prompt: 'My 10yo wants Snapchat because everyone has it',
    category: 'social',
    icon: Sparkles,
  },
  {
    id: 'past-curfew',
    label: 'Caught on Phone Past Curfew',
    prompt: 'Caught my child on phone past curfew',
    category: 'bedtime',
    icon: Moon,
  },
  {
    id: 'door-slam',
    label: 'Slammed Door at Screen Cutoff',
    prompt: 'Child slammed door during screen shutoff',
    category: 'meltdown',
    icon: Flame,
  },
  {
    id: 'calculator-vault',
    label: 'Hidden Calculator Vault App',
    prompt: 'Found hidden calculator vault app on iPad',
    category: 'privacy',
    icon: KeyRound,
  },
  {
    id: 'discord-bullying',
    label: 'Bullying on Discord',
    prompt: 'My 13yo is being bullied on Discord',
    category: 'safety',
    icon: ShieldAlert,
  },
];

interface QuickPromptsProps {
  onSelectPrompt: (promptText: string) => void;
  disabled?: boolean;
  className?: string;
}

export function QuickPrompts({
  onSelectPrompt,
  disabled = false,
  className,
}: QuickPromptsProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <MessageSquareQuote className="h-3.5 w-3.5 text-teal-600" />
        <span>Instant Conflict Starters (Tap to Ask)</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {SITUATIONAL_PROMPTS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPrompt(item.prompt)}
              className={cn(
                'group flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-3.5 py-2 text-left text-xs font-medium text-slate-700 shadow-sm transition-all',
                'hover:border-teal-400 hover:bg-teal-50/50 hover:text-teal-900 hover:shadow',
                'active:scale-[0.98]',
                'focus:outline-none focus:ring-2 focus:ring-teal-500/30',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'min-h-[44px]' // WCAG AA touch target
              )}
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
