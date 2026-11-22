'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { type ChildDTO } from '@alongside/shared';
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
  let router: ReturnType<typeof useRouter> | null = null;
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
    <section
      aria-label="24/7 AI Child Advisor"
      className={cn(
        'rounded-[16px] border border-[rgba(19,23,21,0.1)] bg-white p-6 sm:p-8',
        className
      )}
    >
      <div className="mx-auto max-w-[720px] space-y-5">
        <div className="space-y-1.5">
          <p className="text-[12.5px] font-medium text-[#143D2B]">
            24/7 AI Child Advisor
          </p>
          <h2 className="font-serif text-[26px] sm:text-[32px] font-normal leading-[1.16] tracking-[-0.02em] text-[#131715]">
            Ask Dr. Alongside anything about {child ? child.name : 'your child'}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 rounded-[12px] border border-[rgba(19,23,21,0.14)] bg-[#FAF9F5] p-1.5 transition-colors focus-within:border-[#143D2B] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#143D2B]/12 sm:flex-row sm:items-center sm:pl-4"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              child
                ? `Ask anything about ${child.name}: e.g. 'She won't get off Roblox' or 'How to handle bedtime stalls'`
                : "Ask anything: e.g. 'She won't get off Roblox' or 'How to handle bedtime stalls'"
            }
            aria-label={child ? `Ask anything about ${child.name}` : 'Ask AI Child Advisor'}
            className="min-h-[44px] w-full bg-transparent px-2.5 text-[14px] text-[#131715] placeholder:text-[#7A827E] focus:outline-none sm:px-0"
          />
          <button
            type="submit"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#143D2B] px-5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#0E2B1E] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
          >
            <span>Ask Advisor</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <span className="text-[12.5px] font-medium text-[#69726D]">
            Frequent Situations:
          </span>
          {QUICK_ADVISOR_PROMPTS.map((prompt) => (
            <button
              key={prompt.label}
              type="button"
              onClick={() => navigateToAdvisor(prompt.query)}
              className="inline-flex min-h-[38px] items-center rounded-[8px] border border-[rgba(19,23,21,0.1)] bg-[#FAF9F5] px-3 text-[13px] font-medium text-[#303633] transition-colors hover:border-[#143D2B]/40 hover:bg-[#E8F1EC] hover:text-[#143D2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
            >
              {prompt.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
