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
        'border-[#E3E3DC] bg-white/90 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(20,61,43,0.05)] rounded-[2rem] overflow-hidden transition-all hover:border-[#143D2B]/40 p-6 sm:p-8 space-y-4',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-3">
        <div className="space-y-0.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#143D2B] font-bold block">
            24/7 Developmental Sparring
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111413] tracking-tight">
              24/7 AI Child Advisor
            </h2>
          </div>
        </div>
        <span className="font-mono text-xs text-[#858C88]">
          Instant developmental guidance • Dr. Alongside
        </span>
      </div>

      <p className="font-serif text-sm sm:text-base text-stone-700">
        Ask Dr. Alongside anything about {child ? child.name : 'your child'}.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-1">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={
            child
              ? `Ask anything about ${child.name}: e.g. 'She won't get off Roblox' or 'How to discuss sleepovers without friction'...'`
              : "Ask anything: e.g. 'She won't get off Roblox' or 'How to discuss sleepovers without friction'..."
          }
          className="flex-1 bg-white/95 border border-[#E3E3DC] rounded-2xl px-5 py-3 text-xs sm:text-sm text-[#111413] focus:outline-none focus:ring-2 focus:ring-[#143D2B]/20 shadow-2xs placeholder:text-[#858C88]"
        />
        <Button
          type="submit"
          className="min-h-[46px] px-6 py-3 rounded-2xl bg-[#143D2B] text-white text-xs font-semibold hover:bg-[#0E2B1E] transition shadow-md shrink-0 cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Advisor</span>
        </Button>
      </form>

      {/* Acute Moments / Frequent Situations 1-Tap Quick Prompts */}
      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-mono text-[11px] text-[#858C88] uppercase tracking-wider font-bold">
          Frequent Situations: Acute Moments:
        </span>
        {QUICK_ADVISOR_PROMPTS.map((prompt) => (
          <button
            key={prompt.label}
            type="button"
            onClick={() => navigateToAdvisor(prompt.query)}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#FBFBF9] hover:bg-[#EAF3EE] text-[#111413] hover:text-[#143D2B] border border-[#E3E3DC] hover:border-[#143D2B]/30 transition-all cursor-pointer shadow-2xs"
          >
            {prompt.label}
          </button>
        ))}
      </div>
    </Card>
  );
}
