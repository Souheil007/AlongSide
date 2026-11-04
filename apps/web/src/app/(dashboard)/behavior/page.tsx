import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Brain,
  Sparkles,
  Heart,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Behavior & Emotional Co-Regulation — AlongSide Family OS',
  description:
    'Tantrum decoding (HALT diagnostic: Hungry, Angry, Lonely, Tired) and word-for-word emotional co-regulation scripts.',
};

const HALT_DIAGNOSTICS = [
  {
    letter: 'H',
    name: 'Hungry (Blood Sugar Drop)',
    description: 'Hypoglycemia causes sudden cortisol and adrenaline spikes, triggering irrational meltdowns.',
    script: '"Your body might need a quick fuel recharge. Let\'s have a handful of berries or cheese before we talk about this."',
  },
  {
    letter: 'A',
    name: 'Angry (Frustration / Autonomy Block)',
    description: 'The prefrontal cortex is offline. Rational lecturing will escalate defiance.',
    script: '"It feels so unfair right now. I hear you. You really wanted to keep playing. I am staying right here with you."',
  },
  {
    letter: 'L',
    name: 'Lonely (Attachment Disconnection)',
    description: 'After-school sensory overload or sibling rivalry creates acute attachment distress.',
    script: '"My hands are open. Do you want a squeeze hug or do you just want me to sit nearby until your engine cools down?"',
  },
  {
    letter: 'T',
    name: 'Tired (Sensory Overstimulation)',
    description: 'Adenosine sleep pressure impairs self-regulation. Transitions become impossible.',
    script: '"Your brain and body worked so hard today. We don\'t have to solve this right now. Let\'s dim the lights and rest."',
  },
];

export default function BehaviorPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-600 text-white shadow-xs">
              <Brain className="h-3.5 w-3.5" />
            </span>
            <Badge variant="outline" className="text-[10px] text-teal-800 bg-teal-50 border-teal-200 font-bold">
              Domain Hub 5: Emotional Co-Regulation
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Behavior & Emotional Co-Regulation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            HALT tantrum diagnostic framework and clinical scripts replacing yelling with empathetic calm.
          </p>
        </div>

        <Link href="/advisor">
          <Button className="min-h-[44px] gap-2 text-xs bg-teal-700 hover:bg-teal-800 font-semibold shadow-2xs">
            <MessageSquare className="h-4 w-4" />
            <span>Ask AI Advisor for Script</span>
          </Button>
        </Link>
      </div>

      {/* HALT Diagnostic Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            The HALT Tantrum Diagnostic Framework
          </h2>
          <span className="text-xs text-slate-500">Ask before reacting</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HALT_DIAGNOSTICS.map((item) => (
            <Card key={item.letter} className="border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-900 font-black text-lg shrink-0">
                  {item.letter}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                  <p className="text-[11px] text-slate-500">{item.description}</p>
                </div>
              </div>

              <div className="rounded-xl border border-teal-200/80 bg-teal-50/50 p-3 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
                  Word-for-Word Co-Regulation Script:
                </span>
                <p className="text-xs text-slate-800 italic leading-relaxed">
                  {item.script}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
