'use client';

import * as React from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Brain,
  CheckCircle2,
  Send,
  Radio,
  Sliders,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface SparringScenario {
  id: string;
  key: 'A' | 'B' | 'C';
  title: string;
  category: string;
  developmentalContext: string;
  childDialogue: string;
  audioDurationSeconds: number;
  options: {
    id: string;
    label: string;
    text: string;
    toneType: 'EMPATHETIC_FIRM' | 'DEFENSIVE_PUNITIVE' | 'PASSIVE_CONCESSION';
    toneScore: string;
    firmnessScore: string;
    neurobiologyFeedback: string;
    clinicalVerdict: 'RECOMMENDED' | 'ESCALATING' | 'PERMISSIVE';
  }[];
}

export const SPARRING_SCENARIOS: SparringScenario[] = [
  {
    id: 'scenario-a-phone-plea',
    key: 'A',
    title: 'The Phone Plea',
    category: 'First Smartphone & Social Media',
    developmentalContext: 'Ages 10-11 • Adrenarche & Peer Group Belonging',
    childDialogue:
      '"Everyone else has Snapchat and TikTok! You\'re literally ruining my social life! Why do you hate me?!"',
    audioDurationSeconds: 4,
    options: [
      {
        id: 'opt-a-1',
        label: 'Empathetic & Firm (Recommended)',
        text: '"I hear how important staying connected with your friends is, and it hurts when you feel left out of the chatter. But our family policy is that smartphone social media waits until 8th grade because science proves young brains deserve protection from comparison algorithms. Let\'s host Maya and Sarah over this weekend for pizza and movie night instead."',
        toneType: 'EMPATHETIC_FIRM',
        toneScore: 'Regulated & Attuned (98/100)',
        firmnessScore: 'Unshakable Biological Boundary (100/100)',
        neurobiologyFeedback:
          'Validates the acute limbic pain of exclusion without conceding the developmental boundary. Replaces digital comparison with high-oxytocin in-person connection.',
        clinicalVerdict: 'RECOMMENDED',
      },
      {
        id: 'opt-a-2',
        label: 'Defensive & Punitive',
        text: '"Stop being dramatic! You are only 10 years old and you have no idea how dangerous the internet is. If you keep screaming, you won\'t even get a flip phone in high school!"',
        toneType: 'DEFENSIVE_PUNITIVE',
        toneScore: 'Hostile & Dismissive (24/100)',
        firmnessScore: 'Rigid & Fear-based (40/100)',
        neurobiologyFeedback:
          'Triggers severe emotional shame and oppositional defiance. The tween amygdala interprets parental anger as a threat, locking the prefrontal cortex out of rational reflection.',
        clinicalVerdict: 'ESCALATING',
      },
      {
        id: 'opt-a-3',
        label: 'Passive Concession',
        text: '"Fine, whatever, just stop screaming. Download Snapchat but don\'t let your dad see, and promise you won\'t get addicted."',
        toneType: 'PASSIVE_CONCESSION',
        toneScore: 'Exhausted & Avoidant (35/100)',
        firmnessScore: 'Boundary Surrender (10/100)',
        neurobiologyFeedback:
          'Teaches the tween nervous system that explosive emotional intensity successfully breaks parental rules, ensuring worse meltdowns in the future.',
        clinicalVerdict: 'PERMISSIVE',
      },
    ],
  },
  {
    id: 'scenario-b-curfew-explosion',
    key: 'B',
    title: 'The Curfew Explosion',
    category: 'Bedtime Device Shutoff & Gaming',
    developmentalContext: 'Ages 11-13 • Melatonin Suppression & Acute Dopamine Crash',
    childDialogue:
      '"Just 5 more minutes! You never let me finish my game! I\'m in the middle of a raid with my squad! You ruin everything!"',
    audioDurationSeconds: 5,
    options: [
      {
        id: 'opt-b-1',
        label: 'Empathetic & Firm (Recommended)',
        text: '"I know shutting down in the middle of a raid feels infuriating when you\'re dialed in. Take three deep breaths with me. The phone docks in the kitchen now because sleep is non-negotiable for your brain. Tomorrow we can set a 10-minute warning so your squad knows when you\'re logging off."',
        toneType: 'EMPATHETIC_FIRM',
        toneScore: 'Grounded & Calming (96/100)',
        firmnessScore: 'Firm Biological Standard (98/100)',
        neurobiologyFeedback:
          'Acknowledges the sudden dopamine drop and provides co-regulation (breaths) while maintaining physical device removal to preserve the 90-minute sleep latency window.',
        clinicalVerdict: 'RECOMMENDED',
      },
      {
        id: 'opt-b-2',
        label: 'Defensive & Punitive',
        text: '"I don\'t care about your stupid game! Turn it off this second or I am pulling the Wi-Fi plug and smashing your phone!"',
        toneType: 'DEFENSIVE_PUNITIVE',
        toneScore: 'Reactive & Threatening (18/100)',
        firmnessScore: 'Punitive Force (30/100)',
        neurobiologyFeedback:
          'Surges adrenaline and cortisol into the child\'s bloodstream, delaying melatonin release for an additional two hours and ruining sleep quality.',
        clinicalVerdict: 'ESCALATING',
      },
      {
        id: 'opt-b-3',
        label: 'Passive Delay',
        text: '"Okay, five minutes, but I mean it this time! If you\'re still on when I come back, you\'re grounded!"',
        toneType: 'PASSIVE_CONCESSION',
        toneScore: 'Delaying & Inconsistent (42/100)',
        firmnessScore: 'Leaky Boundary (25/100)',
        neurobiologyFeedback:
          'Reinforces intermittent reinforcement schedules (the same mechanic as gambling). The child learns bedtime is always negotiable.',
        clinicalVerdict: 'PERMISSIVE',
      },
    ],
  },
  {
    id: 'scenario-c-trust-accusation',
    key: 'C',
    title: 'The Trust Accusation',
    category: 'Hidden Vault Apps & Digital Autonomy',
    developmentalContext: 'Ages 12-14 • Secrecy, Identity & Digital Privacy Boundaries',
    childDialogue:
      '"Why were you snooping on my phone?! You went through my apps! You don\'t trust me at all! Get out of my room!"',
    audioDurationSeconds: 4,
    options: [
      {
        id: 'opt-c-1',
        label: 'Empathetic & Firm (Recommended)',
        text: '"I understand why having your phone inspected feels like an invasion of your privacy. I wasn\'t snooping to catch you doing something wrong; my job is safety. A secret calculator vault creates high risks for malware and unmonitored spaces. Let\'s look through it together right now with zero punishment, and agree on clear privacy zones."',
        toneType: 'EMPATHETIC_FIRM',
        toneScore: 'Transparent & Curious (95/100)',
        firmnessScore: 'Clear Protective Mandate (95/100)',
        neurobiologyFeedback:
          'Removes fear of retribution through a Zero-Punishment Safe Harbor, dismantling the emotional incentive for deeper underground encryption.',
        clinicalVerdict: 'RECOMMENDED',
      },
      {
        id: 'opt-c-2',
        label: 'Defensive & Accusatory',
        text: '"I pay the cell bill so I have every right to look at everything! If you weren\'t doing something disgusting and illegal, you wouldn\'t be hiding fake calculator apps!"',
        toneType: 'DEFENSIVE_PUNITIVE',
        toneScore: 'Accusatory & Hostile (15/100)',
        firmnessScore: 'Dominance-focused (30/100)',
        neurobiologyFeedback:
          'Permanently destroys parent-child disclosure channels. The teen will migrate to burner phones, secondary Instagram accounts, or VPN proxies.',
        clinicalVerdict: 'ESCALATING',
      },
      {
        id: 'opt-c-3',
        label: 'Apologetic & Backing Down',
        text: '"I\'m sorry, you\'re right, I shouldn\'t have looked. I promise I will never touch your phone again."',
        toneType: 'PASSIVE_CONCESSION',
        toneScore: 'Apologetic Surrender (30/100)',
        firmnessScore: 'Vacated Guardianship (10/100)',
        neurobiologyFeedback:
          'Abandons the essential parental duty of digital mentoring, leaving the tween unguided in high-risk algorithmic environments.',
        clinicalVerdict: 'PERMISSIVE',
      },
    ],
  },
];

interface VoiceSparringModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VoiceSparringModal({
  open,
  onOpenChange,
}: VoiceSparringModalProps) {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = React.useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = React.useState(false);
  const [audioProgress, setAudioProgress] = React.useState(0);
  const [selectedOptionId, setSelectedOptionId] = React.useState<string | null>(null);
  const [customResponse, setCustomResponse] = React.useState('');
  const [isSubmittingCustom, setIsSubmittingCustom] = React.useState(false);
  const [customEvaluation, setCustomEvaluation] = React.useState<{
    toneScore: string;
    firmnessScore: string;
    neurobiologyFeedback: string;
    verdict: 'RECOMMENDED' | 'ESCALATING' | 'PERMISSIVE';
  } | null>(null);

  const scenario = SPARRING_SCENARIOS[selectedScenarioIndex] ?? SPARRING_SCENARIOS[0]!;

  // Reset scenario state on switch
  const handleSelectScenario = (index: number) => {
    setSelectedScenarioIndex(index);
    setIsPlayingAudio(false);
    setHasPlayedAudio(false);
    setAudioProgress(0);
    setSelectedOptionId(null);
    setCustomResponse('');
    setCustomEvaluation(null);
  };

  // Simulate audio playback with waveform progress
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      const intervalMs = 100;
      const totalSteps = (scenario.audioDurationSeconds * 1000) / intervalMs;
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            setHasPlayedAudio(true);
            return 100;
          }
          return prev + 100 / totalSteps;
        });
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, scenario.audioDurationSeconds]);

  const handlePlayToggle = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setAudioProgress(0);
      setIsPlayingAudio(true);
    }
  };

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    setCustomEvaluation(null);
  };

  const handleEvaluateCustom = () => {
    if (!customResponse.trim()) return;
    setIsSubmittingCustom(true);
    setSelectedOptionId(null);

    // Evaluate tone heuristically based on empathetic vs punitive words
    setTimeout(() => {
      const lower = customResponse.toLowerCase();
      const hasEmpathy =
        lower.includes('hear') ||
        lower.includes('understand') ||
        lower.includes('know') ||
        lower.includes('breath') ||
        lower.includes('together') ||
        lower.includes('love');
      const hasBoundary =
        lower.includes('rule') ||
        lower.includes('boundary') ||
        lower.includes('sleep') ||
        lower.includes('dock') ||
        lower.includes('policy') ||
        lower.includes('tomorrow');
      const hasAnger =
        lower.includes('stupid') ||
        lower.includes('smash') ||
        lower.includes('hate') ||
        lower.includes('shut up') ||
        lower.includes('grounded forever');

      if (hasAnger) {
        setCustomEvaluation({
          toneScore: 'Reactive & Punitive (22/100)',
          firmnessScore: 'Threat-Driven (35/100)',
          neurobiologyFeedback:
            'Anger shuts down the child’s prefrontal learning centers and floods their amygdala with cortisol, causing deeper resistance.',
          verdict: 'ESCALATING',
        });
      } else if (hasEmpathy && hasBoundary) {
        setCustomEvaluation({
          toneScore: 'Empathetic & Calm (94/100)',
          firmnessScore: 'Firm & Protective (92/100)',
          neurobiologyFeedback:
            'Excellent practice! You combined emotional validation with an uncompromising developmental standard.',
          verdict: 'RECOMMENDED',
        });
      } else {
        setCustomEvaluation({
          toneScore: 'Neutral / Moderately Attuned (70/100)',
          firmnessScore: 'Acceptable Boundary (72/100)',
          neurobiologyFeedback:
            'A decent start. Try to explicitly name the emotional longing (e.g. "I know how much this matters") before stating the rule.',
          verdict: 'RECOMMENDED',
        });
      }
      setIsSubmittingCustom(false);
    }, 400);
  };

  const currentOption = scenario.options.find((o) => o.id === selectedOptionId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader className="mb-4 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
              <Radio className="h-3 w-3 text-teal-600 animate-pulse" />
              Interactive Voice Sparring Simulator
            </span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900">
            High-Heat Conflict Rehearsal Lab
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Practice handling intense tween arguments before they happen in your living room.
            Receive instant clinical feedback on tone, firmness, and neurological co-regulation.
          </DialogDescription>
        </DialogHeader>

        {/* Scenario Selection Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {SPARRING_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleSelectScenario(idx)}
              className={cn(
                'flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all min-h-[44px]',
                selectedScenarioIndex === idx
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'border border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[11px]">
                {sc.key}
              </span>
              <span>{sc.title}</span>
            </button>
          ))}
        </div>

        {/* Step 1: Audio Playback / Child Dialogue Simulation */}
        <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-md mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                Simulated Child Objection
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {scenario.developmentalContext}
              </span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              0:0{Math.floor((audioProgress / 100) * scenario.audioDurationSeconds)} / 0:0{scenario.audioDurationSeconds}s
            </div>
          </div>

          {/* Child quote text */}
          <div className="mb-5 rounded-xl bg-slate-800/80 p-4 border border-slate-700 font-serif italic text-base text-rose-100 leading-relaxed">
            {scenario.childDialogue}
          </div>

          {/* Audio Waveform Visualizer & Play Controls */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePlayToggle}
              className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow transition-all',
                isPlayingAudio
                  ? 'bg-rose-500 hover:bg-rose-600 scale-105'
                  : 'bg-teal-600 hover:bg-teal-500'
              )}
              title={isPlayingAudio ? 'Pause simulation' : 'Play child objection audio'}
            >
              {isPlayingAudio ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </button>

            {/* Waveform dynamic animation bars */}
            <div className="flex flex-1 items-center justify-between gap-1.5 h-10 px-2 rounded-xl bg-slate-950/60 border border-slate-800">
              {[40, 75, 90, 60, 100, 45, 80, 95, 70, 85, 55, 90, 65, 40, 80].map(
                (height, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-1.5 rounded-full transition-all duration-150',
                      isPlayingAudio
                        ? 'bg-teal-400 animate-pulse'
                        : audioProgress > (i / 15) * 100
                        ? 'bg-teal-600'
                        : 'bg-slate-700'
                    )}
                    style={{
                      height: isPlayingAudio
                        ? `${Math.max(20, (height * (Math.sin(i + Date.now() / 200) + 1.2)) / 2)}%`
                        : `${height}%`,
                    }}
                  />
                )
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setAudioProgress(0);
                setIsPlayingAudio(true);
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Replay from start"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Step 2: Choose or Type Parent Response */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-teal-600" />
              <span>Step 2: Practice Your Response</span>
            </h4>
            <span className="text-xs text-slate-500">
              Select a response pattern or draft your own
            </span>
          </div>

          <div className="space-y-2.5">
            {scenario.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={cn(
                  'w-full text-left rounded-xl p-4 border transition-all text-sm',
                  selectedOptionId === opt.id
                    ? 'border-teal-500 bg-teal-50/70 shadow-sm ring-1 ring-teal-500/20'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={cn(
                      'text-xs font-bold uppercase tracking-wider',
                      opt.toneType === 'EMPATHETIC_FIRM'
                        ? 'text-teal-800'
                        : opt.toneType === 'DEFENSIVE_PUNITIVE'
                        ? 'text-rose-700'
                        : 'text-amber-800'
                    )}
                  >
                    {opt.label}
                  </span>
                  {selectedOptionId === opt.id && (
                    <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                  )}
                </div>
                <p className="text-slate-800 italic font-serif leading-relaxed">
                  {opt.text}
                </p>
              </button>
            ))}
          </div>

          {/* Custom Response Option */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Or type what you would naturally say in this moment:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customResponse}
                onChange={(e) => setCustomResponse(e.target.value)}
                placeholder="e.g. I hear how angry you are, but the phone stays in the kitchen..."
                className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 min-h-[44px]"
              />
              <Button
                variant="default"
                onClick={handleEvaluateCustom}
                disabled={!customResponse.trim() || isSubmittingCustom}
                className="gap-1.5 min-h-[44px]"
              >
                <Send className="h-3.5 w-3.5" />
                Evaluate
              </Button>
            </div>
          </div>
        </div>

        {/* Step 3: Real-Time Coaching Feedback */}
        {(currentOption || customEvaluation) && (
          <div className="rounded-2xl border border-teal-200/80 bg-teal-50/50 p-5 shadow-sm space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-900">
              <Brain className="h-4 w-4 text-teal-600" />
              <span>Real-Time Clinical Coaching Feedback</span>
            </div>

            {currentOption && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-white p-3 border border-teal-100">
                  <span className="font-semibold text-slate-500 block mb-0.5">
                    Tone & Nervous System Attunement:
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {currentOption.toneScore}
                  </span>
                </div>
                <div className="rounded-xl bg-white p-3 border border-teal-100">
                  <span className="font-semibold text-slate-500 block mb-0.5">
                    Boundary Firmness:
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {currentOption.firmnessScore}
                  </span>
                </div>
                <div className="sm:col-span-2 rounded-xl bg-white p-3.5 border border-teal-100 text-slate-700 leading-relaxed text-sm">
                  <span className="font-semibold text-teal-900 block mb-1">
                    Pediatric Neurobiology Rationale:
                  </span>
                  {currentOption.neurobiologyFeedback}
                </div>
              </div>
            )}

            {customEvaluation && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-white p-3 border border-teal-100">
                  <span className="font-semibold text-slate-500 block mb-0.5">
                    Evaluated Tone:
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {customEvaluation.toneScore}
                  </span>
                </div>
                <div className="rounded-xl bg-white p-3 border border-teal-100">
                  <span className="font-semibold text-slate-500 block mb-0.5">
                    Evaluated Firmness:
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {customEvaluation.firmnessScore}
                  </span>
                </div>
                <div className="sm:col-span-2 rounded-xl bg-white p-3.5 border border-teal-100 text-slate-700 leading-relaxed text-sm">
                  <span className="font-semibold text-teal-900 block mb-1">
                    Neurobiology Coaching:
                  </span>
                  {customEvaluation.neurobiologyFeedback}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="min-h-[44px]"
          >
            Close Simulator
          </Button>
          <Button
            variant="default"
            onClick={() => {
              const nextIndex = (selectedScenarioIndex + 1) % SPARRING_SCENARIOS.length;
              handleSelectScenario(nextIndex);
            }}
            className="min-h-[44px]"
          >
            Next Scenario
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
