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
    label: '🎮 Console Meltdown',
    query: 'How do I de-escalate a video game console shutdown meltdown?',
  },
  {
    label: '📱 Peer Phone Pressure',
    query: 'How do I handle peer phone pressure when everyone in class has one?',
  },
  {
    label: '🚪 Slammed Bedroom Door',
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
        'rounded-[2.5rem] bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_10px_40px_-10px_rgba(20,61,43,0.05)] overflow-hidden transition-all hover:border-[#143D2B]/30 p-8 sm:p-12 space-y-6 relative',
        className
      )}
    >
      {/* Ambient Glow Behind AI Input */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-5 text-center relative z-10">
        {/* Top Centered Category Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white text-xs font-mono text-[#143D2B] font-semibold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>24/7 Developmental Sparring • 24/7 AI Child Advisor</span>
        </div>

        {/* The Text in the Middle: Ask Dr. Alongside anything about Maya. */}
        <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#111815] tracking-tight">
          Ask Dr. Alongside anything about {child ? child.name : 'your child'}.
        </h2>

        {/* The Dialogue Omnibar */}
        <div className="pt-2">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-white/95 rounded-full p-2 pl-6 border border-emerald-900/15 shadow-md focus-within:border-[#143D2B] focus-within:ring-2 focus-within:ring-[#143D2B]/10 transition"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={
                child
                  ? `Ask anything about ${child.name}: e.g. 'She won't get off Roblox' or 'How to discuss sleepovers without friction'...'`
                  : "Ask anything: e.g. 'She won't get off Roblox' or 'How to discuss sleepovers without friction'..."
              }
              className="w-full bg-transparent text-xs sm:text-sm text-[#111815] placeholder:text-stone-400 focus:outline-none"
            />
            <Button
              type="submit"
              className="shrink-0 bg-[#143D2B] hover:bg-[#0E2B1E] text-white font-medium text-xs px-6 py-3.5 rounded-full transition shadow-sm cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Advisor</span>
            </Button>
          </form>
        </div>

        {/* Acute Moments / Frequent Situations 1-Tap Quick Prompts (Centered) */}
        <div className="flex items-center justify-center gap-2 pt-1 flex-wrap text-xs text-stone-600 font-mono">
          <span className="text-[11px] uppercase font-bold text-stone-400">
            Frequent Situations: Acute Moments:
          </span>
          {QUICK_ADVISOR_PROMPTS.map((prompt) => (
            <button
              key={prompt.label}
              type="button"
              onClick={() => navigateToAdvisor(prompt.query)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/80 hover:bg-[#EAF3EE] text-[#111413] hover:text-[#143D2B] border border-stone-200/80 hover:border-[#143D2B]/30 transition-all cursor-pointer shadow-2xs"
            >
              {prompt.label}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
