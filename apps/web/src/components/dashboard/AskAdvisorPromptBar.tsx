'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Bot,
  Sparkles,
  ArrowRight,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { type ChildDTO } from '@alongside/shared';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface AskAdvisorPromptBarProps {
  child: ChildDTO | null;
  className?: string;
}

function getContextualPromptChips(child: ChildDTO | null): string[] {
  const age = child?.age ?? 8;
  const name = child?.name ?? 'my child';

  if (age <= 3) {
    return [
      `How do I handle bedtime protests when putting ${name} down?`,
      `How do I safely introduce eggs and thinned peanut butter this week?`,
      `Is it normal if ${name} isn't pointing with an index finger yet?`,
      `What are gentle co-regulation scripts for 14-month-old tantrums?`,
    ];
  }

  if (age <= 9) {
    return [
      `What's an empathetic response when ${name} asks for a smartphone like peers?`,
      `How do I handle after-school meltdowns and big sensory overload?`,
      `How can we set healthy tablet boundaries without screaming matches?`,
      `What are good screen-free logic games to play with ${name}?`,
    ];
  }

  if (age <= 12) {
    return [
      `How do I evaluate if ${name} is truly ready for a first smartphone?`,
      `How do I talk about algorithm dopamine loops without sounding preachy?`,
      `What does the current slang in ${name}'s group mean?`,
      `How do I set up a pre-unboxing agreement before buying a device?`,
    ];
  }

  return [
    `How can we agree on an 8:30 PM device curfew without an explosion?`,
    `What are signs ${name} might be hiding private or secret accounts?`,
    `How do we negotiate weekend gaming autonomy collaboratively?`,
    `What is the neurobiology behind teen circadian rhythm delay?`,
  ];
}

export function AskAdvisorPromptBar({ child, className }: AskAdvisorPromptBarProps) {
  const router = useRouter();
  const [question, setQuestion] = React.useState('');
  const chips = React.useMemo(() => getContextualPromptChips(child), [child]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = question.trim();
    if (!query) return;

    const childParam = child ? `&childId=${child.id}` : '';
    router.push(`/advisor?prompt=${encodeURIComponent(query)}${childParam}`);
  };

  const handleSelectChip = (chipText: string) => {
    const childParam = child ? `&childId=${child.id}` : '';
    router.push(`/advisor?prompt=${encodeURIComponent(chipText)}${childParam}`);
  };

  return (
    <Card className={cn('border-[#E3E3DC] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-[10px]', className)}>
      <CardContent className="p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#EAF3EE] text-[#143D2B]">
              <Bot className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-serif font-semibold text-[#111413] text-sm">
                24/7 AI Clinical Advisor
              </h3>
              <p className="text-[11px] text-[#494F4C]">
                Calibrated to {child ? `${child.name} (${child.age} yrs)` : 'your child'} • 250+ scenario clinical vault
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono text-[#143D2B] bg-[#EAF3EE] px-2.5 py-0.5 rounded-full border border-[#E3E3DC] self-start sm:self-auto">
            Instant Co-Regulation Scripts
          </span>
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about behavior, sleep, health, or limits..."
              className="w-full min-h-[44px] rounded-[5px] border border-[#E3E3DC] bg-[#FBFBF9] px-4 py-2 text-xs sm:text-sm text-[#111413] placeholder-[#858C88] shadow-2xs focus:border-[#143D2B] focus:outline-none focus:ring-1 focus:ring-[#143D2B]"
            />
          </div>

          <Button
            type="submit"
            className="min-h-[44px] gap-1.5 bg-[#111413] hover:bg-[#143D2B] text-white font-medium text-xs px-4 sm:px-5 shrink-0 rounded-[5px] shadow-[0_1px_2px_rgba(17,20,19,0.08)] transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#EAF3EE]" />
            <span>Ask AI</span>
          </Button>
        </form>

        {/* Suggested Contextual Prompt Chips */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#858C88]">
            Suggested Questions:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSelectChip(chip)}
                className="inline-flex min-h-[34px] items-center gap-1.5 rounded-[5px] border border-[#E3E3DC] bg-[#F4F4F0] px-2.5 py-1 text-[11px] font-mono text-[#494F4C] transition-colors hover:border-[#143D2B] hover:bg-[#FFFFFF] hover:text-[#111413] text-left"
              >
                <HelpCircle className="h-3 w-3 text-[#143D2B] shrink-0" />
                <span className="line-clamp-1">{chip}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
