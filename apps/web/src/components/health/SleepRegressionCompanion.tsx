'use client';

import * as React from 'react';
import { Moon, Clock, Bed, Sparkles, CheckCircle2, Compass, SunDim } from 'lucide-react';

interface SleepRegressionStage {
  id: string;
  ageLabel: string;
  title: string;
  neurobiology: string;
  wakeWindowHours: string;
  napStructure: string;
  parentPlaybook: string[];
  soothingScript: string;
}

export function SleepRegressionCompanion() {
  const [selectedStageId, setSelectedStageId] = React.useState<string>('stage-4m');

  const stages: SleepRegressionStage[] = [
    {
      id: 'stage-4m',
      ageLabel: '4 Months',
      title: 'The Permanent Sleep Cycle Shift',
      neurobiology:
        'Infant sleep architecture undergoes permanent neurobiological maturation. Sleep transitions from primitive 2-stage newborn sleep to adult-like 4-stage circadian cycles with 90–120 minute light/deep cycle boundaries. Infants awaken fully between cycles.',
      wakeWindowHours: '1.5 – 2.5 hours',
      napStructure: '3 to 4 naps daily (nap length naturally varies from 30 to 90 min)',
      parentPlaybook: [
        'Practice placing baby down drowsy but awake so they learn to connect sleep cycles independently.',
        'Darken room completely (use blackout shades); melatonin production is light-sensitive.',
        'Introduce consistent, predictable 4-step bedtime routine (bath, diaper/massage, lullaby, swaddle transition to sleep sack).',
      ],
      soothingScript:
        'Your sleep cycles are maturing, little one. You are safe in your crib, and I am right here beside you.',
    },
    {
      id: 'stage-8m',
      ageLabel: '8–10 Months',
      title: 'Object Permanence & Motor Milestones',
      neurobiology:
        'Brain develops object permanence (knowing parents still exist when out of sight), triggering peak evolutionary separation anxiety. Rapid motor surges (pulling to stand, crawling) cause babies to practice movements in the crib at night.',
      wakeWindowHours: '2.5 – 3.5 hours',
      napStructure: 'Consolidating to 2 naps daily (morning nap ~9:30 AM, afternoon nap ~1:30 PM)',
      parentPlaybook: [
        'Play daytime games of Peek-a-boo to reinforce object permanence and safe reunion.',
        'Allow 5–10 minutes of self-settling before rushing into the nursery if baby is whimpering rather than panicked.',
        'Ensure the crib mattress is dropped to the lowest setting for pulling-to-stand safety.',
      ],
      soothingScript:
        'Even when the door is closed, my love stays in the room with you. Rest your body, my hands will hold you again in the morning.',
    },
    {
      id: 'stage-12m',
      ageLabel: '12 Months',
      title: 'Walking Surge & The False Nap Strike',
      neurobiology:
        'First steps and cognitive leaps overload the motor cortex. Many 12-month-olds stage a "nap strike" by refusing the morning nap; parents mistakenly drop to 1 nap prematurely, leading to overtired night waking.',
      wakeWindowHours: '3.0 – 4.0 hours',
      napStructure: 'Protect 2 naps daily! Most children are not biologically ready for 1 nap until 14–18 months.',
      parentPlaybook: [
        'Hold the line on the 2-nap schedule: offer quiet rest time in the crib even if baby does not sleep.',
        'Provide ample outdoor gross-motor playtime during the morning wake window to discharge physical motor energy.',
        'Maintain a consistent 7:00–7:30 PM bedtime to prevent cortisol spikes from overtiredness.',
      ],
      soothingScript:
        'Your legs did so much running and exploring today. Now your muscles get to rest and grow strong tonight.',
    },
    {
      id: 'stage-18m',
      ageLabel: '18 Months',
      title: 'Language Surge & Bedtime Willpower',
      neurobiology:
        'Language explosion and nascent executive prefrontal development trigger toddler independence and bedtime stalling. Peak transition window from 2 naps to 1 consolidated midday nap.',
      wakeWindowHours: '4.5 – 5.5 hours',
      napStructure: '1 single afternoon nap (12:30 PM – 2:30 PM, lasting 1.5–2.5 hours)',
      parentPlaybook: [
        'Transition to 1 midday nap gradually by pushing morning nap later by 15 minutes every 3 days.',
        'Offer limited, calm choices at bedtime to satisfy autonomy ("Do you want the blue pajamas or yellow pajamas?").',
        'Hold loving, predictable boundaries: "We read 2 books, give 2 hugs, and then the lights turn off."',
      ],
      soothingScript:
        'You have so many words and ideas now! We will talk and play again tomorrow. Sleep is your brain’s magic building time.',
    },
    {
      id: 'stage-2y',
      ageLabel: '2–3 Years',
      title: 'Vivid Imagination & Bedtime Fears',
      neurobiology:
        'Imagination and symbolic thinking blossom, leading to the first experiences of darkness fears, shadows, and nightmares. Toddler prefrontal cortex cannot yet fully distinguish fantasy from reality.',
      wakeWindowHours: '5.5 – 6.5 hours',
      napStructure: '1 afternoon nap (1–2 hours); capped by 3:00 PM to protect 8:00 PM bedtime',
      parentPlaybook: [
        'Introduce a warm-toned, low-lumen nightlight (amber or red hue to protect melatonin synthesis; avoid blue light).',
        'Address bedtime fears with empathy rather than dismissive logic ("I understand shadows look spooky. Let’s shine our flashlight and see what it really is").',
        'Use an "OK to Wake" visual clock that turns green when morning begins.',
      ],
      soothingScript:
        'Our home is safe, warm, and protected. Close your eyes and think of the birds we saw in the park today.',
    },
  ];

  const defaultStage = stages[0] as SleepRegressionStage;
  const currentStage = stages.find((s) => s.id === selectedStageId) ?? defaultStage;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/60 shadow-2xs">
            <Moon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Sleep Regression & Nap Transition Companion
            </h2>
            <p className="text-xs text-slate-500">
              Developmental neurobiology, wake windows & soothing co-regulation scripts
            </p>
          </div>
        </div>

        {/* Age Selector Tabs */}
        <div className="flex flex-wrap gap-1.5" role="tablist">
          {stages.map((stage) => (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={selectedStageId === stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedStageId === stage.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {stage.ageLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stage Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Neurobiology & Wake Windows */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>{currentStage.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentStage.neurobiology}
            </p>
          </div>

          {/* Vitals: Wake Windows & Nap Structure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-slate-200 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Clock className="h-4 w-4 text-teal-600" />
                <span>Optimal Wake Window</span>
              </div>
              <div className="text-base font-extrabold text-teal-900">
                {currentStage.wakeWindowHours}
              </div>
              <p className="text-slate-500 text-[11px]">
                Maximum awake time between naps before cortisol spikes
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Bed className="h-4 w-4 text-indigo-600" />
                <span>Nap Transition Structure</span>
              </div>
              <div className="text-sm font-bold text-indigo-950">
                {currentStage.napStructure}
              </div>
              <p className="text-slate-500 text-[11px]">
                Target daily schedule for optimal restorative sleep
              </p>
            </div>
          </div>

          {/* Parent Action Playbook */}
          <div className="rounded-xl border border-slate-200 p-4 space-y-2 text-xs">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Evidence-Based Parent Playbook:</span>
            </div>
            <ul className="space-y-1.5 text-slate-700 pl-1">
              {currentStage.parentPlaybook.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-indigo-700">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Empathic Bedtime Co-Regulation Script */}
        <div className="rounded-xl border border-indigo-200 bg-linear-to-b from-indigo-900 to-slate-900 text-white p-5 flex flex-col justify-between space-y-4 shadow-md">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase tracking-wider">
              <SunDim className="h-4 w-4 text-amber-300" />
              <span>Bedtime Co-Regulation Script</span>
            </div>
            <blockquote className="text-xs sm:text-sm italic text-indigo-100 font-serif leading-relaxed border-l-2 border-indigo-400 pl-3.5">
              "{currentStage.soothingScript}"
            </blockquote>
          </div>

          <div className="rounded-lg bg-white/10 p-3 text-[11px] text-indigo-200 space-y-1 border border-white/10">
            <div className="font-bold text-white flex items-center gap-1">
              <Compass className="h-3.5 w-3.5 text-indigo-300" />
              <span>Neurobiology Truth:</span>
            </div>
            <p>
              Sleep regressions are not setbacks; they are developmental progressions of a rapidly wiring brain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
