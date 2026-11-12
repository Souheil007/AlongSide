'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
} from 'lucide-react';
import { type ChildDTO } from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface AskAdvisorPromptBarProps {
  child: ChildDTO | null;
  className?: string;
}

interface AdvisorScenario {
  id: 'console' | 'phone' | 'silence';
  label: string;
  title: string;
  badge: string;
  body: string;
}

const ADVISOR_SCENARIOS: Record<string, AdvisorScenario> = {
  console: {
    id: 'console',
    label: 'Console Meltdown',
    title: 'De-escalating Screen Shutdown Meltdowns',
    badge: 'Actionable Guide',
    body: 'Do not negotiate time while emotions are high. When video games stop abruptly, the prefrontal dopamine drop mimics physical distress. Offer connection before correction: validate the intense fun of the game, take a 10-second breath together, and transition into dinner.',
  },
  phone: {
    id: 'phone',
    label: 'Peer Phone Pressure',
    title: 'When They Say “Everyone Else Has a Phone!”',
    badge: 'Actionable Guide',
    body: 'Acknowledge the intense desire to belong without wavering on your family values. Say: "I hear that you feel left out, and that must feel really tough. Our priority is protecting your sleep and focus. Let’s figure out how you can call your friends on the home speaker."',
  },
  silence: {
    id: 'silence',
    label: 'Slammed Bedroom Door',
    title: 'Responding to a Slammed Bedroom Door',
    badge: 'Actionable Guide',
    body: 'A slammed door is an indicator of an overwhelmed nervous system seeking sensory sanctuary. Give them 15 minutes of quiet time. Knock gently, leave a snack outside, and say: "I love you. I am downstairs whenever you are ready."',
  },
};

export function AskAdvisorPromptBar({ child, className }: AskAdvisorPromptBarProps) {
  let router: any = null;
  try {
    router = useRouter();
  } catch {
    router = null;
  }

  const [question, setQuestion] = React.useState('');
  const [activeScenario, setActiveScenario] = React.useState<'console' | 'phone' | 'silence'>('console');

  const scenario = ADVISOR_SCENARIOS[activeScenario]!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = question.trim();
    if (!query) return;

    const childParam = child ? `&childId=${child.id}` : '';
    const targetUrl = `/advisor?prompt=${encodeURIComponent(query)}${childParam}`;
    if (router && typeof router.push === 'function') {
      router.push(targetUrl);
    } else if (typeof window !== 'undefined') {
      window.location.href = targetUrl;
    }
  };

  return (
    <Card
      className={cn(
        'border-[#E3E3DC] bg-white shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-2xl overflow-hidden transition-all hover:border-[#143D2B]/30',
        className
      )}
    >
      <CardHeader className="p-5 sm:p-6 pb-3 space-y-2 border-b border-[#E3E3DC]/70">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold">
              Empathetic Co-Pilot
            </span>
            <CardTitle className="font-serif text-xl sm:text-2xl font-bold text-[#111413] mt-0.5">
              24/7 AI Child Advisor
            </CardTitle>
          </div>
          <span className="font-mono text-xs text-[#858C88]">
            Trained on Developmental Neurobiology • Non-Judgmental
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 space-y-5">
        {/* Quick Ask Input Bar */}
        <div className="space-y-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything: 'He refuses to stop Roblox' or 'How to discuss sleepovers'..."
              className="flex-1 bg-[#FBFBF9] border border-[#E3E3DC] rounded-xl px-4 py-2.5 text-xs text-[#111413] focus:outline-none focus:ring-1 focus:ring-[#143D2B] shadow-2xs"
            />
            <Button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#143D2B] text-white text-xs font-semibold hover:bg-[#0E2B1E] transition shadow-2xs shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              <span>Ask Dr. Alongside</span>
            </Button>
          </form>

          {/* Frequent Situations Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-[10px] text-[#858C88] self-center">
              Frequent Situations:
            </span>
            {(['console', 'phone', 'silence'] as const).map((key) => {
              const scen = ADVISOR_SCENARIOS[key]!;
              const isSelected = activeScenario === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveScenario(key)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer border',
                    isSelected
                      ? 'bg-[#143D2B] text-white border-[#143D2B]'
                      : 'bg-[#FBFBF9] border-[#E3E3DC] text-[#111413] hover:border-[#143D2B]'
                  )}
                >
                  {scen.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Advisory Output Container */}
        <div className="p-5 rounded-xl bg-[#FBFBF9] border border-[#E3E3DC] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-sm text-[#111413]">
              {scenario.title}
            </span>
            <span className="font-mono text-[10px] text-[#143D2B] font-bold bg-[#EAF3EE] px-2 py-0.5 rounded border border-[#143D2B]/20">
              {scenario.badge}
            </span>
          </div>

          <p className="text-xs text-[#494F4C] leading-relaxed">
            {scenario.body}
          </p>

          {/* Ask Advisor Deep-Dive Action */}
          <div className="pt-2 border-t border-[#E3E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-[#111413] font-medium">
                Need tailored advice? Discuss this acute scenario with Dr. Alongside.
              </span>
            </div>

            <Button
              type="button"
              onClick={() => {
                const childParam = child ? `&childId=${child.id}` : '';
                const targetUrl = `/advisor?prompt=${encodeURIComponent(`How should I de-escalate this: ${scenario.title}?`)}${childParam}`;
                if (router && typeof router.push === 'function') {
                  router.push(targetUrl);
                } else if (typeof window !== 'undefined') {
                  window.location.href = targetUrl;
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-xs font-semibold transition shadow-2xs shrink-0 cursor-pointer min-h-[38px]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Advisor About This</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
