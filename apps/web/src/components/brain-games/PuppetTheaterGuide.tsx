'use client';

import * as React from 'react';
import {
  Sparkles,
  Heart,
  Volume2,
  Moon,
  Shield,
  Smile,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface PuppetMode {
  id: string;
  title: string;
  ageBracket: string;
  focus: string;
  icon: React.ReactNode;
  scienceRationale: string;
  puppetPersona: string;
  dialogueScript: {
    speaker: string;
    text: string;
    stageDirection?: string;
  }[];
  parentRule: string;
}

const PUPPET_MODES: PuppetMode[] = [
  {
    id: 'vocal-mirroring',
    title: 'Vocal Mirroring & Acoustic Pauses',
    ageBracket: 'Infancy & Toddlerhood (0–3 yrs)',
    focus: 'Serve-and-Return Language Bedrock',
    icon: <Volume2 className="h-4 w-4 text-amber-600" />,
    scienceRationale:
      'Harvard Center on the Developing Child research proves that reciprocal vocal turn-taking activates language circuits in Broca’s area faster than passive audio. Soft puppets lower the affective visual barrier for infants.',
    puppetPersona: 'Barnaby the Bear (Soft voice, wide eyes, 14 inches from baby’s face)',
    dialogueScript: [
      {
        speaker: 'Barnaby the Bear',
        text: '“Ooooh! Hello baby! Baaa... Baaa... Baaa!”',
        stageDirection: 'Wiggle puppet gently from side to side; keep eye contact.',
      },
      {
        speaker: 'Parent (Internal Clock)',
        text: 'Count 5 full seconds in your head in silence.',
        stageDirection: 'Resist filling the silence. Wait for baby to smile, reach out, or coo.',
      },
      {
        speaker: 'Barnaby the Bear',
        text: '“You said ‘Gaaaa’! I heard you! Gaaaa!”',
        stageDirection: 'Match baby’s vocal pitch exactly to validate their vocal effort.',
      },
    ],
    parentRule:
      'The 5-Second Rule: Infant neurological processing is 3x slower than adults. If you talk too quickly, you interrupt their serve-and-return response loop.',
  },
  {
    id: 'emotional-roleplay',
    title: 'Emotional Roleplay & Tantrum Projection',
    ageBracket: 'Early Childhood (3–7 yrs)',
    focus: 'Third-Person Frustration De-escalation',
    icon: <Heart className="h-4 w-4 text-rose-600" />,
    scienceRationale:
      'When a child is directly confronted about a meltdown, shame activates defensive fight/flight. Projecting the big feeling onto a puppet allows Theory of Mind (perspective taking) without personal guilt.',
    puppetPersona: 'Ignis the Little Dragon (Prone to sudden frustration and smoke puffs)',
    dialogueScript: [
      {
        speaker: 'Ignis the Dragon',
        text: '“Grrrrr! My block tower collapsed! I want to throw all the blocks into the river!”',
        stageDirection: 'Puppet stomps dramatically on a pillow and groans.',
      },
      {
        speaker: 'Parent to Child',
        text: '“Oh no, Ignis is having fiery feelings! His tummy feels like exploding! Can you show Ignis how we blow out his dragon smoke so he doesn’t hurt anyone?”',
      },
      {
        speaker: 'Child & Ignis',
        text: 'Child instructs the puppet to take 3 deep belly breaths together. Ignis sighs and calms down.',
        stageDirection: 'The child becomes the regulator and internalizes the coping mechanism.',
      },
    ],
    parentRule:
      'Never use the puppet to mock or scold: The puppet is an empathetic co-learner who also struggles with big emotions.',
  },
  {
    id: 'bedtime-soothing',
    title: 'Parasympathetic Bedtime Down-Regulation',
    ageBracket: 'Toddler & Preschool (2–6 yrs)',
    focus: 'Separation Anxiety & Sleep Transition',
    icon: <Moon className="h-4 w-4 text-indigo-600" />,
    scienceRationale:
      'Sleep onset requires shifting from sympathetic alertness to parasympathetic rest. A gentle whispering puppet acts as a secure transitional object, reducing night cortisol spikes.',
    puppetPersona: 'Luna the Soft Owl (Whispers softly and blinks slowly)',
    dialogueScript: [
      {
        speaker: 'Luna the Owl',
        text: '“Hoo... hoo... It is dark outside, little owl. Let’s whisper goodnight to your running feet.”',
        stageDirection: 'Gently tap child’s toes with the soft puppet.',
      },
      {
        speaker: 'Child & Luna',
        text: '“Goodnight toes, goodnight knees, goodnight busy tummy.”',
        stageDirection: 'Progressive body relaxation moving upward to eyelids.',
      },
      {
        speaker: 'Luna the Owl',
        text: '“I am sleeping right on the bedside table. My eyes are watching over you until the sun wakes up.”',
      },
    ],
    parentRule:
      'Place the puppet near the bed so the child can touch the soft texture if they wake up during night sleep transitions.',
  },
];

export function PuppetTheaterGuide() {
  const [activeModeId, setActiveModeId] = React.useState<string>('vocal-mirroring');
  const activeMode = PUPPET_MODES.find((m) => m.id === activeModeId) || PUPPET_MODES[0]!;

  return (
    <Card className="border-slate-200/90 bg-white shadow-xs overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-50/60 via-slate-50 to-white border-b border-slate-100 p-5 sm:p-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </span>
            <Badge
              variant="outline"
              className="text-[11px] font-bold text-amber-900 bg-amber-100/70 border-amber-300"
            >
              Harvard Serve & Return Framework
            </Badge>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Ages 0–7 • Zero Equipment Required
          </span>
        </div>

        <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
          Puppet Theater: The Emotional Co-Regulation Masterclass
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-slate-600">
          How simple hand puppets bypass defensive resistance, stimulate mirror neurons, and co-regulate intense tantrums before they ignite.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 space-y-6">
        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PUPPET_MODES.map((mode) => {
            const isSelected = mode.id === activeMode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveModeId(mode.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all min-h-[44px] ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/70 shadow-xs ring-1 ring-amber-300'
                    : 'border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 shrink-0 shadow-2xs mt-0.5">
                  {mode.icon}
                </div>
                <div className="space-y-0.5">
                  <h4
                    className={`text-xs font-bold ${
                      isSelected ? 'text-amber-950' : 'text-slate-800'
                    }`}
                  >
                    {mode.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {mode.ageBracket}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Mode Deep Dive */}
        <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-b from-amber-50/30 to-white p-5 sm:p-6 space-y-5">
          {/* Header & Persona */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] font-bold uppercase">
                {activeMode.focus}
              </Badge>
              <span className="text-xs text-slate-500">
                Persona: <strong className="text-slate-800">{activeMode.puppetPersona}</strong>
              </span>
            </div>

            {/* Science Rationale Callout */}
            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3.5 flex items-start gap-3">
              <Award className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] block">
                  Neurological Mechanism:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {activeMode.scienceRationale}
                </p>
              </div>
            </div>
          </div>

          {/* Dialogue Script Simulation */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-amber-600" />
              Word-for-Word Puppet Play Script:
            </span>

            <div className="space-y-2.5 rounded-xl border border-slate-200/80 bg-white p-4">
              {activeMode.dialogueScript.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                      {step.speaker}
                    </span>
                    {step.stageDirection && (
                      <span className="text-[10px] italic text-slate-500">
                        {step.stageDirection}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Rule For Parents */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 flex items-start gap-2.5">
            <Shield className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                The Golden Rule:
              </span>
              <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                {activeMode.parentRule}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
