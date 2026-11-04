'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Baby,
  Smile,
  Sparkles,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  Utensils,
  Puzzle,
  Brain,
  ShieldCheck,
  Clock,
  ArrowRight,
  FileCheck2,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface StageData {
  id: string;
  tabLabel: string;
  ageLabel: string;
  title: string;
  subtitle: string;
  icon: typeof Baby;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  badgeBg: string;
  highlights: {
    title: string;
    description: string;
    icon: typeof HeartPulse;
  }[];
  previewBadge: string;
  previewWidget: {
    category: string;
    title: string;
    statusBadge: string;
    statusColor: string;
    items: { label: string; detail: string; status?: 'achieved' | 'pending' | 'warning' }[];
    actionQuote?: string;
    footerNote: string;
  };
}

export const LIFESPAN_STAGES: StageData[] = [
  {
    id: 'infants-toddlers',
    tabLabel: 'Infants & Toddlers',
    ageLabel: 'Ages 0–3',
    title: 'Physical Health, Milestones & Safe Feeding',
    subtitle: 'From late-night fever decisions and safe allergen introduction to first words and puppet play.',
    icon: Baby,
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    accentText: 'text-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    highlights: [
      {
        title: '3-Zone Pediatric Fever Triage ("The Safe Resort")',
        description: 'Barton Schmitt protocol clarifying when to monitor at home, call your pediatrician, or seek urgent care at 2:00 AM.',
        icon: HeartPulse,
      },
      {
        title: 'Baby-Led Weaning & Allergen Introduction',
        description: 'Safe early exposure timeline for peanuts, dairy, and eggs between 4–11 months to dramatically lower lifetime allergy risk.',
        icon: Utensils,
      },
      {
        title: 'When He Moves, When He Talks (CDC Milestones)',
        description: 'Pediatrician-backed gross motor, speech bursts, and receptive language checklists from 2 months to 36 months.',
        icon: CheckCircle2,
      },
      {
        title: 'Animal Puppet Vocal Mirroring & Tactile Play',
        description: 'Face-to-face games stimulating optic nerve development and mirror neurons without digital screens.',
        icon: Puzzle,
      },
    ],
    previewBadge: 'Pediatric Health & Milestone Monitor',
    previewWidget: {
      category: '2:00 AM Pediatric Triage & Growth',
      title: 'Leo — 14 Months Old • Toddlerhood',
      statusBadge: 'Triage Ready • Safe at Home',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      items: [
        {
          label: 'Fever Assessment (101.2°F)',
          detail: 'Green Zone: Active & hydrated between spikes. Home supportive care with lightweight clothing & fluids.',
          status: 'achieved',
        },
        {
          label: 'Milestone: 50-Word Language Burst',
          detail: 'Target Age 14–18mo: Receptive language progressing normally. Imitates animal sounds & points to objects.',
          status: 'achieved',
        },
        {
          label: 'Allergen Exposure Vault',
          detail: 'Peanut butter & baked egg successfully tolerated (3 exposures each). Tree nuts next on schedule.',
          status: 'achieved',
        },
      ],
      actionQuote: '“You don’t have to guess or panic at 2:00 AM. AlongSide provides the exact protocol your pediatrician uses.”',
      footerNote: 'Source: Barton Schmitt Pediatric Protocols & CDC 2026 Milestone Guidelines',
    },
  },
  {
    id: 'early-childhood',
    tabLabel: 'Early Childhood',
    ageLabel: 'Ages 4–6',
    title: 'Emotional Regulation, Picky Eating & Symbolic Play',
    subtitle: 'Decoding tantrum triggers, establishing healthy meal routines, and fostering creative imagination.',
    icon: Smile,
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
    accentText: 'text-amber-800',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    highlights: [
      {
        title: 'The HALT Tantrum Diagnostic Framework',
        description: 'Identify the physiological root of meltdowns: Hungry (hypoglycemia), Anxious/Angry, Lonely, or Tired (adenosine sleep pressure).',
        icon: Brain,
      },
      {
        title: 'Division of Responsibility in Feeding',
        description: 'Ellyn Satter method: Parents decide WHAT, WHEN, and WHERE food is offered; the child decides IF and HOW MUCH they eat.',
        icon: Utensils,
      },
      {
        title: 'Sensory Building Blocks & Dramatic Roleplay',
        description: 'Open-ended LEGO, magnetic tiles, and dress-up play developing Theory of Mind and spatial geometry.',
        icon: Puzzle,
      },
      {
        title: 'Bedtime Routine Co-Regulation',
        description: 'Word-for-word scripts ending bedtime stalls, tears, and shouting matches through authoritative warmth.',
        icon: Clock,
      },
    ],
    previewBadge: 'Behavioral Psychology & Mealtime Vault',
    previewWidget: {
      category: 'The HALT Tantrum Diagnostic',
      title: 'Maya — Age 5 • Early Childhood',
      statusBadge: 'Co-Regulation Protocol Active',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      items: [
        {
          label: 'Diagnostic: Grocery Store Meltdown',
          detail: 'Root Cause: Low blood sugar (3.5h since snack) + auditory sensory overload in checkout line.',
          status: 'warning',
        },
        {
          label: 'Word-for-Word Empathy Script',
          detail: '“You really wanted that candy. It is so hard to hear no when you want it right now. I will hold you until your body feels calm.”',
          status: 'achieved',
        },
        {
          label: 'Dinner Picky Eating Strategy',
          detail: 'Division of Responsibility: Safe food (sliced apples) paired with family chicken stir-fry. Zero bribing.',
          status: 'achieved',
        },
      ],
      actionQuote: '“A dysregulated adult cannot regulate a dysregulated child. AlongSide gives you the words to stay grounded.”',
      footerNote: 'Source: Ellyn Satter Division of Responsibility & Gottman Emotion Coaching',
    },
  },
  {
    id: 'middle-childhood',
    tabLabel: 'Middle Childhood',
    ageLabel: 'Ages 7–9',
    title: 'Cognitive Brain Games & Social Foundations',
    subtitle: 'Strengthening working memory, navigating elementary friendships, and building healthy screen foundations.',
    icon: Sparkles,
    accentBg: 'bg-indigo-500/10',
    accentBorder: 'border-indigo-500/30',
    accentText: 'text-indigo-800',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    highlights: [
      {
        title: 'Logic Puzzles, Tangrams & Chess Fundamentals',
        description: 'Targeted screen-free cognitive challenges that expand working memory and executive prefrontal planning.',
        icon: Puzzle,
      },
      {
        title: 'The "Boredom Buster" Protocol',
        description: 'Why rescuing kids from boredom hurts focus: simple raw materials that transition into deep, immersive imaginative play.',
        icon: Sparkles,
      },
      {
        title: 'Elementary Peer Friendship Reciprocity',
        description: 'Coaching kids through social inclusion, classroom teasing, and developing moral courage without helicoptering.',
        icon: Users,
      },
      {
        title: 'Foundational Screen Habit Architecture',
        description: 'Establishing family room device zones and transparent 30-minute limits before personal devices enter the picture.',
        icon: ShieldCheck,
      },
    ],
    previewBadge: 'Cognitive Play & Peer Dynamics',
    previewWidget: {
      category: 'Screen-Free Brain Games & Social Skills',
      title: 'Julian — Age 8 • Elementary',
      statusBadge: 'Executive Function Challenge',
      statusColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      items: [
        {
          label: 'Today’s Brain Game: The Two-Room Spatial Riddle',
          detail: '100% Screen-Free • Materials: 6 wooden blocks & index cards. Stimulates prefrontal working memory.',
          status: 'achieved',
        },
        {
          label: 'Social Skill Coaching',
          detail: 'Navigating peer rejection: Concrete script for when a friend says “You can’t play with us today”.',
          status: 'achieved',
        },
        {
          label: 'Family Screen Ecology',
          detail: 'Nintendo Switch restricted to living room docking station with 45-minute shared timer.',
          status: 'achieved',
        },
      ],
      actionQuote: '“Boredom is not a problem to be solved with an iPad; it is the neurological catalyst for imagination.”',
      footerNote: 'Source: Piaget Concrete Operational Framework & AAP Healthy Screen Habits',
    },
  },
  {
    id: 'preteens-adolescents',
    tabLabel: 'Pre-Teens & Teens',
    ageLabel: 'Ages 10–18',
    title: 'Autonomy, Modern Tech & Youth Culture',
    subtitle: 'From the First-Phone Readiness Assessment to bilateral pacts, neutral curfews, and weekly slang decoders.',
    icon: Smartphone,
    accentBg: 'bg-teal-500/10',
    accentBorder: 'border-teal-500/30',
    accentText: 'text-teal-800',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
    highlights: [
      {
        title: 'First-Phone Readiness Assessment (Score 0–100)',
        description: 'Objective, neurodevelopmental evaluation of impulse control, executive function, and digital safety habits.',
        icon: ShieldCheck,
      },
      {
        title: 'The Bilateral Family Media Pact ("Pact-as-Code")',
        description: 'Co-created mutual commitments co-signed on screen by parent and child. Kids respect boundaries they helped author.',
        icon: FileCheck2,
      },
      {
        title: 'Automated 8:30 PM Bedtime Neutral Curfew',
        description: 'Cryptographic Apple & Android profiles lock non-exempt apps at bedtime. The software is the boundary—no screaming.',
        icon: Clock,
      },
      {
        title: 'Sunday Youth Culture & Slang Intelligence',
        description: 'Weekly intelligence decoding emerging tween terms (crashout, skibidi, rizz) and covert app exploit warnings.',
        icon: Smartphone,
      },
    ],
    previewBadge: 'Bilateral Pact & Device Governance',
    previewWidget: {
      category: 'The "Thinking About a Device?" Solution Hub',
      title: 'Sofia — Age 12 • Tween Transition',
      statusBadge: 'Pact-as-Code Signed • Curfew Enforced',
      statusColor: 'bg-teal-100 text-teal-800 border-teal-200',
      items: [
        {
          label: 'Readiness Score: 84 / 100 (Ready for Family Phone)',
          detail: 'Strong impulse control & privacy awareness; morning homework habit established.',
          status: 'achieved',
        },
        {
          label: 'Bilateral Family Pact (Co-Signed on Screen)',
          detail: 'Mutual agreement: Parent commits to no snooping; child commits to charging phone in kitchen at night.',
          status: 'achieved',
        },
        {
          label: 'Neutral Bedtime Lockdown (8:30 PM)',
          detail: 'Cryptographic profile locks social & gaming apps. Emergency calls with parents remain 100% open.',
          status: 'achieved',
        },
      ],
      actionQuote: '“The device locks itself at 8:30 PM. I don’t have to yell or argue. I get to be her dad, not a police officer.”',
      footerNote: 'Source: Alongside Bilateral Pact Engine & Apple Declarative Device Management',
    },
  },
];

export function LifespanStageSelector() {
  const [activeStageId, setActiveStageId] = useState<string>('infants-toddlers');

  const currentStage =
    LIFESPAN_STAGES.find((s) => s.id === activeStageId) ?? LIFESPAN_STAGES[0]!;

  return (
    <section id="stages" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <Badge variant="outline" className="text-xs uppercase tracking-wider text-slate-600 bg-slate-50 border-slate-300">
          Tailored Child Upbringing • Ages 0 to 18
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore AlongSide at Your Child&apos;s Exact Stage
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Children don&apos;t arrive with an instruction manual, and their needs change dramatically over time.
          Select your child&apos;s age bracket to preview the exact clinical guidance, feeding rules, play activities, and boundaries.
        </p>
      </div>

      {/* Stage Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl max-w-4xl mx-auto mb-10 border border-slate-200 shadow-inner">
        {LIFESPAN_STAGES.map((stage) => {
          const isActive = stage.id === activeStageId;
          const Icon = stage.icon;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className={`h-4 w-4 ${isActive ? stage.accentText : 'text-slate-500'}`} />
              <span>{stage.tabLabel}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isActive ? stage.badgeBg : 'bg-slate-200 text-slate-600'}`}>
                {stage.ageLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail & Realistic Preview Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stage Proposition & 4 Pillars (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge className={currentStage.badgeBg}>
                  {currentStage.ageLabel} • Developmental Focus
                </Badge>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {currentStage.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {currentStage.subtitle}
              </p>
            </div>

            {/* 4 Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {currentStage.highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2"
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                      <div className="p-1.5 rounded-md bg-white border border-slate-200 text-teal-700 shadow-xs">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="leading-snug">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Included in AlongSide 7-Day Free Trial • No charge today
              </div>
              <Link href="/register">
                <Button size="sm" className="gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium">
                  Try {currentStage.tabLabel} Tools
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Realistic Platform UI Widget Card (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border-2 border-slate-200/90 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-md space-y-5">
            {/* Widget Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-800">
                  {currentStage.previewWidget.category}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  {currentStage.previewWidget.title}
                </h4>
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${currentStage.previewWidget.statusColor}`}>
                {currentStage.previewWidget.statusBadge}
              </span>
            </div>

            {/* Widget Items */}
            <div className="space-y-3.5">
              {currentStage.previewWidget.items.map((it, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      {it.status === 'warning' ? (
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      )}
                      {it.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-5">
                    {it.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            {currentStage.previewWidget.actionQuote && (
              <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 italic leading-relaxed">
                {currentStage.previewWidget.actionQuote}
              </div>
            )}

            {/* Footer Source Note */}
            <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
              <span>{currentStage.previewWidget.footerNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
