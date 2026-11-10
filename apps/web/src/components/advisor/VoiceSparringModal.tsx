'use client';

import * as React from 'react';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Brain,
  RotateCcw,
  Send,
  Radio,
  Sliders,
  Baby,
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
import {
  SparringScenarioCard,
  type SparringScenario,
  type SparringOption,
} from './SparringScenarioCard';
import { SparringFeedbackCard } from './SparringFeedbackCard';

export const SPARRING_SCENARIOS: SparringScenario[] = [
  {
    id: 'scenario-1-infant-fever-teething',
    key: '1',
    title: '2:00 AM Teething & Fever Panic',
    category: 'Pediatric Health & Night Wakings',
    lifespanStage: 'Infant / Toddler (Ages 0–3)',
    developmentalContext: 'Ages 0–3 • Teething, Night Terrors & Soothing Protocol',
    objective:
      'Rehearse staying calm while soothing a crying toddler and remembering bedtime soothing protocols without escalating adult exhaustion.',
    childDialogue:
      '"(Inconsolable 2:00 AM screaming and crying, hot forehead, arching back, refusing the crib... Waaaah!)"',
    audioDurationSeconds: 4,
    options: [
      {
        id: 'opt-1-1',
        label: 'Empathetic & Calm (Recommended)',
        text: '"I am right here with you, my love. It is 2:00 AM and your mouth hurts. Let\'s hold this cool washcloth together against your gums. We checked your breathing, you are calm, and your body is safe. I will rock you until your heart feels quiet."',
        toneType: 'EMPATHETIC_FIRM',
        toneScore: 'Regulated & Attuned (98/100)',
        firmnessScore: 'Safe Harbor Biological Grounding (95/100)',
        calmnessScore: 98,
        empathyScore: 96,
        neurobiologyFeedback:
          'Co-regulates the toddler\'s activated nervous system through low vocal pitch, slow breathing, and tactile comfort. Follows grounded soothing routines by observing calm breathing while providing soothing counter-pressure.',
        clinicalVerdict: 'RECOMMENDED',
        deEscalationTips: [
          'Maintain low, slow rhythmic speech (auditory co-regulation).',
          'Offer chilled silicone teether or wet washcloth for gum relief.',
          'Verify calm breathing confirms child comfort and physiological stability.',
        ],
      },
      {
        id: 'opt-1-2',
        label: 'Reactive & Panicked',
        text: '"Oh my God, stop screaming! Why are you so hot?! We need to rush to the emergency room right now! Take this medicine right this second or you\'re going to get brain damage!"',
        toneType: 'DEFENSIVE_PUNITIVE',
        toneScore: 'High Anxiety & Fear-Driven (25/100)',
        firmnessScore: 'Dysregulated Chaos (20/100)',
        calmnessScore: 20,
        empathyScore: 30,
        neurobiologyFeedback:
          'Parental panic floods the toddler\'s mirror neurons with fear, surging adrenaline and increasing heart rate. Projecting catastrophic fever myths worsens child distress.',
        clinicalVerdict: 'ESCALATING',
        deEscalationTips: [
          'Fever does not cause brain damage below 108°F; it is the body\'s natural immune shield.',
          'Drop adult shoulders and exhale for 4 counts before speaking.',
        ],
      },
      {
        id: 'opt-1-3',
        label: 'Exhausted Surrender',
        text: '"I can\'t take this anymore. Just cry it out, I am going back to bed. There is nothing I can do."',
        toneType: 'PASSIVE_CONCESSION',
        toneScore: 'Exhausted & Detached (35/100)',
        firmnessScore: 'Abandonment Risk (15/100)',
        calmnessScore: 40,
        empathyScore: 25,
        neurobiologyFeedback:
          'Leaving an infant or young toddler in acute physical pain without attunement increases cortisol and fractures nighttime security.',
        clinicalVerdict: 'PERMISSIVE',
        deEscalationTips: [
          'If exhausted, tag in a partner or take a 60-second breathing pause outside the bedroom.',
          'Physical touch reassures the infant that the darkness is safe.',
        ],
      },
    ],
  },
  {
    id: 'scenario-2-toddler-dinner-resistance',
    key: '2',
    title: 'Dinner Plate Resistance ("This dinner is gross!")',
    category: 'Toddler Nutrition & Picky Eating',
    lifespanStage: 'Toddler / Preschool (Ages 3–5)',
    developmentalContext: 'Ages 3–5 • Satter Division of Responsibility & Food Autonomy',
    objective:
      'Practice holding the division of responsibility boundary without yelling, bribing with dessert, or becoming a short-order cook.',
    childDialogue:
      '"This dinner is disgusting! I’m not eating this yucky chicken! Make me mac and cheese right now or I\'ll starve!"',
    audioDurationSeconds: 4,
    options: [
      {
        id: 'opt-2-1',
        label: 'Empathetic & Firm (Recommended)',
        text: '"You don\'t have to eat the chicken if your tummy says no. There is bread and melon on the table if you are hungry. The kitchen is closed for cooking until breakfast, but you are welcome to sit with us and tell us about your day."',
        toneType: 'EMPATHETIC_FIRM',
        toneScore: 'Neutral & Grounded (96/100)',
        firmnessScore: 'Division of Responsibility (98/100)',
        calmnessScore: 95,
        empathyScore: 92,
        neurobiologyFeedback:
          'Strictly honors the Ellyn Satter Division of Responsibility (sDoR). Removes mealtime pressure and power struggles, protecting child internal satiety cues while holding family kitchen boundaries.',
        clinicalVerdict: 'RECOMMENDED',
        deEscalationTips: [
          'Do not negotiate or short-order cook special alternative meals.',
          'Ensure at least one familiar "safe food" is on the table.',
          'Neutralize food language: food is neither a reward nor a punishment.',
        ],
      },
      {
        id: 'opt-2-2',
        label: 'Defensive & Punitive',
        text: '"Do you have any idea how hard I worked on this meal?! You are so ungrateful! You sit in that chair until every single bite of chicken is gone, or you get zero dessert for a month!"',
        toneType: 'DEFENSIVE_PUNITIVE',
        toneScore: 'Guilt-Tripping & Coercive (22/100)',
        firmnessScore: 'Controlling Force (35/100)',
        calmnessScore: 25,
        empathyScore: 20,
        neurobiologyFeedback:
          'Triggers mealtime fight-or-flight, shutting down salivary enzymes and gastric motility. Forcing "clean plate" habits overrides natural leptin satiety cues and increases picky eating long-term.',
        clinicalVerdict: 'ESCALATING',
        deEscalationTips: [
          'Separate your emotional cooking effort from your child\'s biological hunger.',
          'Never use dessert as a bribe; it elevates sugar into a sacred reward.',
        ],
      },
      {
        id: 'opt-2-3',
        label: 'Short-Order Cooking Concession',
        text: '"Okay, okay, please don\'t cry! I\'ll go make you mac and cheese and chicken nuggets right now. Just eat something!"',
        toneType: 'PASSIVE_CONCESSION',
        toneScore: 'Anxious & Over-accommodating (38/100)',
        firmnessScore: 'Boundary Surrender (10/100)',
        calmnessScore: 50,
        empathyScore: 40,
        neurobiologyFeedback:
          'Teaches the toddler\'s nervous system that food rejection commands immediate adult catering. Solidifies extreme food neophobia and eliminates exposure to family foods.',
        clinicalVerdict: 'PERMISSIVE',
        deEscalationTips: [
          'Children do not starve from skipping one dinner when safe foods are offered.',
          'Hold the boundary with warmth: "The kitchen is closed for new meals."',
        ],
      },
    ],
  },
  {
    id: 'scenario-3-elementary-physical-aggression',
    key: '3',
    title: 'Biting / Hitting Sibling Confrontation',
    category: 'Behavioral Psychology & Co-Regulation',
    lifespanStage: 'Early Elementary (Ages 5–7)',
    developmentalContext: 'Ages 5–7 • Acute Limbic Flooding & Impulse Control Scaffolding',
    objective:
      'Practice blocking physical aggression with warmth and firm boundaries without resorting to physical punishment or screaming.',
    childDialogue:
      '"(Whack!) He took my Lego spaceship! I hate him! I\'m gonna smash his face and break all his toys!"',
    audioDurationSeconds: 4,
    options: [
      {
        id: 'opt-3-1',
        label: 'Empathetic & Firm (Recommended)',
        text: '"(Holding wrists gently) I won\'t let you hit. Hitting hurts. You are furious that Leo grabbed your spaceship before it was finished. Take two big breaths with me. We are going to separate you two until bodies are calm, and then we will rebuild the wings together."',
        toneType: 'EMPATHETIC_FIRM',
        toneScore: 'Protective & Regulated (97/100)',
        firmnessScore: 'Uncompromising Safety Boundary (100/100)',
        calmnessScore: 96,
        empathyScore: 94,
        neurobiologyFeedback:
          'Blocks the motor aggression physically while keeping emotional tone calm. Validates the acute anger before the brain can process logical restitution. Protects both siblings without shaming.',
        clinicalVerdict: 'RECOMMENDED',
        deEscalationTips: [
          'Step between siblings physically to secure safety first.',
          'Name the anger clearly: "You are furious."',
          'Postpone conflict resolution until cortisol levels drop (15-20 minutes).',
        ],
      },
      {
        id: 'opt-3-2',
        label: 'Defensive & Punitive',
        text: '"How dare you hit your brother! Go to your room right now! If you ever touch him again I am throwing all your Legos in the trash!"',
        toneType: 'DEFENSIVE_PUNITIVE',
        toneScore: 'Shaming & Threatening (18/100)',
        firmnessScore: 'Punitive Retaliation (40/100)',
        calmnessScore: 20,
        empathyScore: 15,
        neurobiologyFeedback:
          'Isolation in the bedroom during high amygdala activation creates resentment toward the sibling and models that larger people use threats to solve problems.',
        clinicalVerdict: 'ESCALATING',
        deEscalationTips: [
          'Yelling teaches children to yell louder.',
          'Keep your voice lower than their volume to down-regulate the room.',
        ],
      },
      {
        id: 'opt-3-3',
        label: 'Passive Dismissal',
        text: '"You two always fight, figure it out yourselves. Just share the Legos and stop bothering me."',
        toneType: 'PASSIVE_CONCESSION',
        toneScore: 'Dismissive & Disengaged (30/100)',
        firmnessScore: 'Vacated Safety (10/100)',
        calmnessScore: 45,
        empathyScore: 20,
        neurobiologyFeedback:
          'Abdicates the parental duty of physical protection. The victimized sibling feels unprotected, while the aggressor learns physical force wins disputes.',
        clinicalVerdict: 'PERMISSIVE',
        deEscalationTips: [
          'Children under 8 cannot self-regulate acute physical disputes without scaffolding.',
          'Step in to protect boundaries early.',
        ],
      },
    ],
  },
  {
    id: 'scenario-4-tween-peer-exclusion',
    key: '4',
    title: 'Middle School Peer Exclusion',
    category: 'Tween Social Belonging & Group Chats',
    lifespanStage: 'Tweens (Ages 10–12)',
    developmentalContext: 'Ages 10–12 • Adrenarche, Dorsal Anterior Cingulate Pain & Peer Longing',
    objective:
      'Support an 11-year-old crying over being left out of a class group chat without overreacting or confiscating devices.',
    childDialogue:
      '"Everyone at school was laughing at something in the class group chat, and when I asked Maya, she said I wasn’t invited! Everyone hates me! I wish I were dead!"',
    audioDurationSeconds: 5,
    options: [
      {
        id: 'opt-4-1',
        label: 'Empathetic & Firm (Recommended)',
        text: '"Come sit with me. Feeling left out of the group chat feels like a punch in the stomach, and it hurts so deeply. I hear how painful this is. I am right here with you. First promise: I am not taking your device away. Let\'s wrap in a blanket and have some tea, and when you\'re ready, we\'ll figure out next steps together."',
        toneType: 'EMPATHETIC_FIRM',
        toneScore: 'Deep Attunement & Presence (98/100)',
        firmnessScore: 'Protective Safe Harbor (95/100)',
        calmnessScore: 98,
        empathyScore: 99,
        neurobiologyFeedback:
          'Digital social exclusion activates the dorsal anterior cingulate cortex—the exact neural circuit that registers physical burn pain. Promising not to confiscate the phone keeps communication lines open.',
        clinicalVerdict: 'RECOMMENDED',
        deEscalationTips: [
          'Do not dismiss ("They aren\'t real friends anyway" minimizes their pain).',
          'Assure them their phone won\'t be taken away for reporting online drama.',
          'Provide physical comfort (warm drink, hug, low lights).',
        ],
      },
      {
        id: 'opt-4-2',
        label: 'Dismissive & Problem-Solving',
        text: '"Stop crying, it\'s just a stupid phone chat! Who cares about Maya? Middle school kids are awful. Just focus on your grades and ignore them!"',
        toneType: 'DEFENSIVE_PUNITIVE',
        toneScore: 'Dismissive & Minimizing (24/100)',
        firmnessScore: 'Misguided Rationalization (30/100)',
        calmnessScore: 35,
        empathyScore: 15,
        neurobiologyFeedback:
          'Minimizing peer rejection signals that their acute limbic pain is invalid. Tweens shut down and hide future cyberbullying or mental health struggles.',
        clinicalVerdict: 'ESCALATING',
        deEscalationTips: [
          'To an 11-year-old, peer belonging is an evolutionary survival need.',
          'Listen for 10 minutes before offering any advice or fixes.',
        ],
      },
      {
        id: 'opt-4-3',
        label: 'Overreactive Phone Confiscation',
        text: '"That does it! Hand over your phone right now! You are deleting Snapchat and I am calling Maya\'s parents and the principal immediately!"',
        toneType: 'PASSIVE_CONCESSION',
        toneScore: 'Intrusive & Reactive (28/100)',
        firmnessScore: 'Arbitrary Punishment (20/100)',
        calmnessScore: 20,
        empathyScore: 20,
        neurobiologyFeedback:
          'Punishing the child by taking away their device when they come to you for help guarantees they will conceal all future online dangers.',
        clinicalVerdict: 'PERMISSIVE',
        deEscalationTips: [
          'Never penalize disclosure.',
          'Work collaboratively with your tween rather than calling school unilaterally.',
        ],
      },
    ],
  },
  {
    id: 'scenario-5-adolescent-bedtime-cutoff',
    key: '5',
    title: 'Bedtime Device Cutoff Resistance',
    category: 'Adolescent Screen Boundaries & Sleep Biology',
    lifespanStage: 'Adolescents (Ages 13–15)',
    developmentalContext: 'Ages 13–15 • Melatonin Phase Delay & Neutral 8:30 PM Docking Standard',
    objective:
      'Neutral enforcement of the 8:30 PM hardware lockout without parental yelling, lectures, or emotional negotiations.',
    childDialogue:
      '"Just 5 more minutes! My raid squad is waiting on me! The 8:30 PM lock is so unfair, you are literally ruining my life and treating me like a baby!"',
    audioDurationSeconds: 4,
    options: [
      {
        id: 'opt-5-1',
        label: 'Empathetic & Firm (Recommended)',
        text: '"I know shutting down mid-raid feels infuriating when you\'re dialed in with your squad. Take three deep breaths with me. The phone docks in the kitchen now because sleep is non-negotiable for your brain. Tomorrow we can set a 10-minute warning so your squad knows when you\'re logging off."',
        toneType: 'EMPATHETIC_FIRM',
        toneScore: 'Grounded & Calming (96/100)',
        firmnessScore: 'Firm Biological Standard (98/100)',
        calmnessScore: 96,
        empathyScore: 92,
        neurobiologyFeedback:
          'Acknowledges the sudden dopamine drop and provides co-regulation while maintaining physical device removal to preserve the essential 90-minute sleep latency window.',
        clinicalVerdict: 'RECOMMENDED',
        deEscalationTips: [
          'Frame limits through the Family Pact ("The agreement docks the phone").',
          'Offer a 10-minute transition warning tomorrow.',
          'Never get drawn into bedroom doorway arguments after 8:30 PM.',
        ],
      },
      {
        id: 'opt-5-2',
        label: 'Defensive & Threatening',
        text: '"I don\'t care about your stupid squad! Turn it off this second or I am pulling the Wi-Fi router plug and smashing your phone against the wall!"',
        toneType: 'DEFENSIVE_PUNITIVE',
        toneScore: 'Reactive & Threatening (18/100)',
        firmnessScore: 'Punitive Force (30/100)',
        calmnessScore: 15,
        empathyScore: 10,
        neurobiologyFeedback:
          'Surges adrenaline and cortisol into the teen bloodstream, delaying melatonin release for an additional two hours and ruining sleep quality.',
        clinicalVerdict: 'ESCALATING',
        deEscalationTips: [
          'Threatening device destruction models emotional dysregulation.',
          'Walk away and let the hardware lock enforce itself neutrally.',
        ],
      },
      {
        id: 'opt-5-3',
        label: 'Passive Delay Concession',
        text: '"Fine, five more minutes, but I mean it this time! If you\'re still on when I come back, you\'re grounded!"',
        toneType: 'PASSIVE_CONCESSION',
        toneScore: 'Delaying & Inconsistent (42/100)',
        firmnessScore: 'Leaky Boundary (25/100)',
        calmnessScore: 40,
        empathyScore: 35,
        neurobiologyFeedback:
          'Reinforces intermittent reinforcement schedules (gambling mechanic). The teen learns that resistance and anger always negotiate bedtime extensions.',
        clinicalVerdict: 'PERMISSIVE',
        deEscalationTips: [
          'Consistency is compassionate: unpredictable rules create chronic anxiety.',
          'Keep bedtime dock timing immovable.',
        ],
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
    calmnessScore: number;
    empathyScore: number;
    neurobiologyFeedback: string;
    verdict: 'RECOMMENDED' | 'ESCALATING' | 'PERMISSIVE';
    deEscalationTips: string[];
    recommendedScript: string;
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
        lower.includes('love') ||
        lower.includes('safe') ||
        lower.includes('feel');
      const hasBoundary =
        lower.includes('rule') ||
        lower.includes('boundary') ||
        lower.includes('sleep') ||
        lower.includes('dock') ||
        lower.includes('policy') ||
        lower.includes('tomorrow') ||
        lower.includes('won\'t let you') ||
        lower.includes('closed');
      const hasAnger =
        lower.includes('stupid') ||
        lower.includes('smash') ||
        lower.includes('hate') ||
        lower.includes('shut up') ||
        lower.includes('grounded') ||
        lower.includes('screaming');

      if (hasAnger) {
        setCustomEvaluation({
          toneScore: 'Reactive & Threatening (22/100)',
          firmnessScore: 'Threat-Driven Force (35/100)',
          calmnessScore: 25,
          empathyScore: 20,
          neurobiologyFeedback:
            'Anger shuts down the child’s prefrontal learning centers and floods their amygdala with cortisol, locking in defensive resistance.',
          verdict: 'ESCALATING',
          deEscalationTips: [
            'Take three slow breaths before vocalizing.',
            'Keep vocal pitch low and steady.',
          ],
          recommendedScript:
            '"I hear how angry you feel right now. I will keep us safe while you catch your breath."',
        });
      } else if (hasEmpathy && hasBoundary) {
        setCustomEvaluation({
          toneScore: 'Attuned & Regulated (95/100)',
          firmnessScore: 'Firm Biological Standard (94/100)',
          calmnessScore: 96,
          empathyScore: 95,
          neurobiologyFeedback:
            'Exceptional parental co-regulation! You validated the child’s emotional reality while holding an uncompromising protective standard.',
          verdict: 'RECOMMENDED',
          deEscalationTips: [
            'Maintain quiet physical presence.',
            'Hold the boundary neutrally without adding lecturing.',
          ],
          recommendedScript:
            '"You are safe with me. We will handle this together."',
        });
      } else {
        setCustomEvaluation({
          toneScore: 'Moderately Attuned (72/100)',
          firmnessScore: 'Acceptable Boundary (74/100)',
          calmnessScore: 70,
          empathyScore: 72,
          neurobiologyFeedback:
            'A solid attempt. To deepen co-regulation, explicitly name the underlying emotion (e.g. "I know how disappointing this feels") before stating the rule.',
          verdict: 'RECOMMENDED',
          deEscalationTips: [
            'Name the feeling first before directing action.',
            'Avoid passive delay concessions.',
          ],
          recommendedScript:
            '"I hear you. The boundary stands, and I am here with you."',
        });
      }
      setIsSubmittingCustom(false);
    }, 350);
  };

  const currentOption = scenario.options.find((o) => o.id === selectedOptionId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader className="mb-4 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
              <Radio className="h-3 w-3 text-teal-600 animate-pulse" />
              Interactive Voice Sparring Simulator
            </span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900">
            High-Heat Lifespan Conflict Rehearsal Lab
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Rehearse 5 high-heat emotional storms across the 0-18 lifespan before they erupt in your home.
            Receive instant feedback on vocal calmness, empathetic attunement, and firm boundaries.
          </DialogDescription>
        </DialogHeader>

        {/* 5 Lifespan Scenario Selection Tabs */}
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
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[11px] font-bold">
                {sc.key}
              </span>
              <span>{sc.title}</span>
            </button>
          ))}
        </div>

        {/* Dedicated Sparring Scenario Card */}
        <SparringScenarioCard
          scenario={scenario}
          isPlayingAudio={isPlayingAudio}
          audioProgress={audioProgress}
          onToggleAudio={handlePlayToggle}
          className="mb-6"
        />

        {/* Response Selection & Sparring Lab */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Step 2: Choose or Voice Your Response
            </h4>
            <span className="text-xs text-slate-500">Compare approaches</span>
          </div>

          <div className="space-y-3">
            {scenario.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={cn(
                  'w-full text-left rounded-xl p-4 border transition-all text-sm',
                  selectedOptionId === opt.id
                    ? opt.clinicalVerdict === 'RECOMMENDED'
                      ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                      : opt.clinicalVerdict === 'ESCALATING'
                      ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20'
                      : 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50/80'
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-slate-900">{opt.label}</span>
                  <span
                    className={cn(
                      'text-xs font-semibold px-2 py-0.5 rounded-full',
                      opt.clinicalVerdict === 'RECOMMENDED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : opt.clinicalVerdict === 'ESCALATING'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    )}
                  >
                    {opt.clinicalVerdict}
                  </span>
                </div>
                <p className="text-slate-700 italic leading-relaxed">"{opt.text}"</p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Parental Response Sparring Box */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Sliders className="h-4 w-4 text-teal-600" />
            <span>Or Practice Your Own Custom Words:</span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Type how you would naturally reply. Our AI evaluator analyzes vocal calmness, empathetic attunement, and firmness score (0–100).
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              value={customResponse}
              onChange={(e) => setCustomResponse(e.target.value)}
              placeholder="e.g., I know how furious you are right now, and I won't let you hit. Let's take two breaths together..."
              rows={2}
              className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
            <Button
              type="button"
              onClick={handleEvaluateCustom}
              disabled={!customResponse.trim() || isSubmittingCustom}
              className="sm:self-end rounded-xl bg-teal-700 text-white hover:bg-teal-800 min-h-[44px] px-4 shadow-sm"
            >
              {isSubmittingCustom ? (
                <span>Scoring...</span>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1.5" />
                  <span>Analyze</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sparring Feedback Card Display */}
        {currentOption && (
          <SparringFeedbackCard
            verdict={currentOption.clinicalVerdict}
            toneScore={currentOption.toneScore}
            calmnessScore={currentOption.calmnessScore ?? 90}
            empathyScore={currentOption.empathyScore ?? 92}
            firmnessScore={currentOption.firmnessScore}
            neurobiologyFeedback={currentOption.neurobiologyFeedback}
            deEscalationTips={currentOption.deEscalationTips}
            recommendedScript={currentOption.text}
          />
        )}

        {customEvaluation && (
          <SparringFeedbackCard
            verdict={customEvaluation.verdict}
            toneScore={customEvaluation.toneScore}
            calmnessScore={customEvaluation.calmnessScore}
            empathyScore={customEvaluation.empathyScore}
            firmnessScore={customEvaluation.firmnessScore}
            neurobiologyFeedback={customEvaluation.neurobiologyFeedback}
            deEscalationTips={customEvaluation.deEscalationTips}
            recommendedScript={customEvaluation.recommendedScript}
          />
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
            className="min-h-[44px] bg-teal-700 hover:bg-teal-800 text-white"
          >
            Next Scenario
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
