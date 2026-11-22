'use client';

import * as React from 'react';
import {
  Moon,
  Flame,
  KeyRound,
  ShieldAlert,
  MessageCircle,
  ArrowUpRight,
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
    label: '10yo wants Snapchat',
    prompt: 'My 10yo wants Snapchat because everyone has it',
    category: 'social',
    icon: MessageCircle,
  },
  {
    id: 'past-curfew',
    label: 'Caught on phone past curfew',
    prompt: 'Caught my child on phone past curfew',
    category: 'bedtime',
    icon: Moon,
  },
  {
    id: 'door-slam',
    label: 'Slammed door at screen cutoff',
    prompt: 'Child slammed door during screen shutoff',
    category: 'meltdown',
    icon: Flame,
  },
  {
    id: 'calculator-vault',
    label: 'Hidden calculator vault app',
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
    <div className={cn('space-y-3', className)}>
      <p className="text-[12.5px] font-medium text-[#69726D]">
        Common moments to start with
      </p>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {SITUATIONAL_PROMPTS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPrompt(item.prompt)}
              className={cn(
                'group flex min-h-[56px] items-center gap-3 rounded-[10px] border border-[rgba(19,23,21,0.1)] bg-white px-4 py-3 text-left transition-colors duration-150',
                'hover:border-[#143D2B]/40 hover:bg-[#F6F5F0]',
                'active:scale-[0.99]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              <Icon
                className="h-4 w-4 shrink-0 text-[#69726D] transition-colors group-hover:text-[#143D2B]"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-medium text-[#131715] leading-snug">
                  {item.label}
                </div>
                <div className="mt-0.5 truncate text-[12.5px] text-[#69726D]">
                  {item.prompt}
                </div>
              </div>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-[#8A918D] transition-colors group-hover:text-[#143D2B]"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
