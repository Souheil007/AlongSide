'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { type ChildDTO } from '@alongside/shared';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface AskAdvisorPromptBarProps {
  child: ChildDTO | null;
  className?: string;
}

interface QuickPrompt {
  label: string;
  query: string;
}

export const QUICK_ADVISOR_PROMPTS: QuickPrompt[] = [
  {
    label: 'Console Meltdown',
    query: 'How do I de-escalate a video game console shutdown meltdown?',
  },
  {
    label: 'Peer Phone Pressure',
    query: 'How do I handle peer phone pressure when everyone in class has one?',
  },
  {
    label: 'Slammed Bedroom Door',
    query: 'How should I respond when my child slams their bedroom door in frustration?',
  },
];

export function AskAdvisorPromptBar({ child, className }: AskAdvisorPromptBarProps) {
  let router: any = null;
  try {
    router = useRouter();
  } catch {
    router = null;
  }

  const [question, setQuestion] = React.useState('');

  const navigateToAdvisor = (queryText: string) => {
    const childParam = child ? `&childId=${child.id}` : '';
    const targetUrl = `/advisor?prompt=${encodeURIComponent(queryText)}${childParam}`;
    if (router && typeof router.push === 'function') {
      router.push(targetUrl);
    } else if (typeof window !== 'undefined') {
      window.location.href = targetUrl;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = question.trim();
    if (!query) return;
    navigateToAdvisor(query);
  };

  return (
    <Card
      className={cn(
        'border-[#E3E3DC] bg-white shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-2xl overflow-hidden transition-all hover:border-[#143D2B]/30 p-5 sm:p-6',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#111413] tracking-tight">
            24/7 AI Child Advisor
          </h2>
        </div>
        <span className="font-mono text-[11px] text-[#858C88]">
          Instant developmental guidance • Dr. Alongside
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={
            child
              ? `Ask anything about ${child.name}: 'Refuses to stop gaming', 'Bedtime resistance'...'`
              : "Ask anything: 'He refuses to stop Roblox' or 'How to discuss sleepovers'..."
          }
          className="flex-1 bg-[#FBFBF9] border border-[#E3E3DC] rounded-xl px-4 py-2.5 text-xs text-[#111413] focus:outline-none focus:ring-1 focus:ring-[#143D2B] shadow-2xs placeholder:text-[#858C88]"
        />
        <Button
          type="submit"
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#143D2B] text-white text-xs font-semibold hover:bg-[#0E2B1E] transition shadow-2xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask Dr. Alongside</span>
        </Button>
      </form>

      {/* Frequent Situations 1-Tap Quick Prompts */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-mono text-[10px] text-[#858C88] uppercase tracking-wider">
          Frequent Situations:
        </span>
        {QUICK_ADVISOR_PROMPTS.map((prompt) => (
          <button
            key={prompt.label}
            type="button"
            onClick={() => navigateToAdvisor(prompt.query)}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#FBFBF9] hover:bg-[#EAF3EE] text-[#494F4C] hover:text-[#143D2B] border border-[#E3E3DC] hover:border-[#143D2B]/30 transition-colors cursor-pointer"
          >
            {prompt.label}
          </button>
        ))}
      </div>
    </Card>
  );
}
