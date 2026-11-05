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
  Compass,
  MessageSquare,
  ShieldAlert,
  Flame,
  Moon,
  GraduationCap,
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
  leap: {
    title: string;
    description: string;
  };
  academyChapter: {
    course: string;
    chapter: string;
    priorityBadge: string;
    priorityStyle: string;
    readingMinutes: number;
  };
  cultureReality: {
    tagline: string;
    slangSample: string;
    cringeScore?: string;
  };
  dialogueScript: {
    scenario: string;
    whatToSay: string;
  };
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

/**
 * Canonical 6 Developmental Lifespan Advisory Tiers (AlongSide v2.5.0)
 * Covering all 6 tiers: 0-3, 4-6, 7-9, 10-12, 13-15, 16-18
 */
export const CANONICAL_6_LIFESPAN_STAGES: StageData[] = [
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
    leap: {
      title: 'Sensory Co-Regulation & Pre-Verbal Secure Attachment',
      description: 'Rapid synaptic branching, mirror neuron activation, and pre-verbal amygdala calming through physical presence.',
    },
    academyChapter: {
      course: 'Sensory Overload & Infant Co-Regulation',
      chapter: 'Chapter 1: The Immature Amygdala & Attachment',
      priorityBadge: 'Priority 1 · Critical',
      priorityStyle: 'bg-rose-50 text-rose-800 border-rose-200',
      readingMinutes: 4,
    },
    cultureReality: {
      tagline: 'Face-to-face vocal mirroring, zero-screen defense, and tactile texture play.',
      slangSample: 'Pre-Verbal Sounds • Baby Sign Language',
    },
    dialogueScript: {
      scenario: 'Toddler Hitting & Sensory Overload',
      whatToSay: '“I won’t let you hit. Hitting hurts. You are exhausted and having big feelings. I am right here with you.”',
    },
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
          detail: 'Expressive language on schedule: uses single words and gestures to request items.',
          status: 'achieved',
        },
        {
          label: 'Allergen Exposure: Baked Peanut Butter',
          detail: 'Step 4 of 6 passed with zero erythema or perioral hives. Safe protocol ongoing.',
          status: 'achieved',
        },
      ],
      actionQuote: '“You don’t have to guess in the dark. Supportive home care is all he needs tonight.”',
      footerNote: 'Protocols aligned with Barton Schmitt Pediatric Emergency Standards',
    },
  },
  {
    id: 'early-childhood',
    tabLabel: 'Early Childhood',
    ageLabel: 'Ages 4–6',
    title: 'Emotional Regulation, Picky Eating & Symbolic Play',
    subtitle: 'From grocery store meltdowns and picky eating battles to turn-taking and bedtime co-regulation.',
    icon: Smile,
    accentBg: 'bg-teal-500/10',
    accentBorder: 'border-teal-500/30',
    accentText: 'text-teal-800',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
    leap: {
      title: 'Theory of Mind, Emotional Autonomy & Impulse Scaffolding',
      description: 'Developing awareness that others hold different viewpoints, nascent impulse control, and emotional expression.',
    },
    academyChapter: {
      course: 'Preschool Big Feelings & Theory of Mind',
      chapter: 'Chapter 1: Amygdala Tantrum De-escalation',
      priorityBadge: 'Priority 1 · Critical',
      priorityStyle: 'bg-rose-50 text-rose-800 border-rose-200',
      readingMinutes: 5,
    },
    cultureReality: {
      tagline: 'Pretend play, playground sharing disputes, and tablet transition boundaries.',
      slangSample: '“No fair!” • “I was playing with that!”',
    },
    dialogueScript: {
      scenario: 'Grocery Store Toy Meltdown',
      whatToSay: '“It is so hard to walk past that dinosaur when your brain really wants it. Let’s take a picture so we remember it for your wishlist.”',
    },
    highlights: [
      {
        title: 'HALT Tantrum Diagnostic Protocol',
        description: 'Decode whether big feelings are driven by Hunger (hypoglycemia), Anxiety/Anger, Loneliness, or Tiredness before reacting.',
        icon: Brain,
      },
      {
        title: 'Division of Responsibility at Mealtime',
        description: 'End dinner battles: Parents decide WHAT, WHEN, and WHERE; children decide IF and HOW MUCH to eat.',
        icon: Utensils,
      },
      {
        title: 'Building Blocks & Symbolic Social Play',
        description: 'Collaborative architectural play teaching frustration tolerance and turn-taking without apps.',
        icon: Puzzle,
      },
      {
        title: 'Bedtime Routine Predictability Chart',
        description: 'Visual bedtime anchors releasing evening cortisol and supporting natural sleep initiation.',
        icon: Clock,
      },
    ],
    previewBadge: 'Emotional Co-Regulation & Behavior',
    previewWidget: {
      category: 'Behavior & Nutrition Diagnostic',
      title: 'Maya — Age 5 • Kindergarten',
      statusBadge: 'Co-Regulation Active',
      statusColor: 'bg-teal-100 text-teal-800 border-teal-200',
      items: [
        {
          label: 'Grocery Store Meltdown Resolved',
          detail: 'HALT check: Low blood sugar + tired. Offered apple slices before setting boundaries.',
          status: 'achieved',
        },
        {
          label: 'Division of Responsibility: Dinner',
          detail: 'Explored broccoli without pressure. Shared family conversation starter.',
          status: 'achieved',
        },
        {
          label: 'Bedtime Routine: 3-Story Anchor',
          detail: 'Zero screens after 6:30 PM. Fallen asleep peacefully by 7:45 PM.',
          status: 'achieved',
        },
      ],
      actionQuote: '“You are safe. I hear that you are angry, and I am right here with you.”',
      footerNote: 'Empathetic behavioral science based on Dr. Dan Siegel’s Whole-Brain Child',
    },
  },
  {
    id: 'middle-childhood',
    tabLabel: 'Middle Childhood',
    ageLabel: 'Ages 7–9',
    title: 'Cognitive Brain Games & Social Foundations',
    subtitle: 'From sibling rivalry and post-gaming dopamine crashes to logic puzzles and peer friendship coaching.',
    icon: Sparkles,
    accentBg: 'bg-sky-500/10',
    accentBorder: 'border-sky-500/30',
    accentText: 'text-sky-800',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    leap: {
      title: 'Prefrontal Inhibitory Control & Cooperative Play Strategy',
      description: 'Emergence of concrete operational reasoning, peer rule-negotiation, and early resistance to immediate digital dopamine.',
    },
    academyChapter: {
      course: 'Elementary Impulse Control & Sibling Dynamics',
      chapter: 'Chapter 1: Post-Play Dopamine Crashes & Mediation',
      priorityBadge: 'Priority 1 · Critical',
      priorityStyle: 'bg-rose-50 text-rose-800 border-rose-200',
      readingMinutes: 4,
    },
    cultureReality: {
      tagline: 'Minecraft co-op, board game strategy, and early playground Roblox talk.',
      slangSample: '“No cap” (early usage) • “That’s cheating!”',
    },
    dialogueScript: {
      scenario: 'Sibling Gaming Fairness Dispute',
      whatToSay: '“It feels unfair when the screen turns off right in the middle of your round. The 30-minute timer holds. Come help me choose the dinner music.”',
    },
    highlights: [
      {
        title: 'Chess & Logic Strategy Challenges',
        description: 'Multi-step forward thinking games stimulating prefrontal cortex development and patience.',
        icon: Puzzle,
      },
      {
        title: 'Boredom Buster: Fostering Creative Focus',
        description: 'Why immediately handing over an iPad when a child is bored stunts neurobiological creativity and self-direction.',
        icon: Brain,
      },
      {
        title: 'Friendship & Anti-Exclusion Coaching',
        description: 'Social-emotional frameworks for navigating playground cliques and building genuine empathy.',
        icon: Users,
      },
      {
        title: 'Co-Viewing & Screen Transition Rules',
        description: 'Preventing violent dopamine drops when turning off gaming consoles through predictable warnings.',
        icon: Smartphone,
      },
    ],
    previewBadge: 'Cognitive Growth & Social Logic',
    previewWidget: {
      category: 'Play, Focus & Executive Function',
      title: 'Julian — Age 8 • Elementary',
      statusBadge: 'Focus Zone Mastered',
      statusColor: 'bg-sky-100 text-sky-800 border-sky-200',
      items: [
        {
          label: 'Daily Brain Game: Chess Pawn Battle',
          detail: '100% Screen-Free: Completed 20-minute strategic board puzzle with sibling.',
          status: 'achieved',
        },
        {
          label: 'Boredom Buster Protocol',
          detail: 'Resisted 15 minutes of aimless complaining; built cardboard spaceship independently.',
          status: 'achieved',
        },
        {
          label: 'Bedtime Reading: 25 Minutes',
          detail: 'Independent chapter reading in bed. Zero digital blue light exposure.',
          status: 'achieved',
        },
      ],
      actionQuote: '“Boredom isn’t an emergency to fix—it’s the launchpad for your child’s imagination.”',
      footerNote: 'Cognitive development frameworks based on Piaget and Vygotsky play science',
    },
  },
  {
    id: 'pre-teens',
    tabLabel: 'Pre-Teens & Tweens',
    ageLabel: 'Ages 10–12',
    title: 'Autonomy, Modern Tech & Youth Culture',
    subtitle: 'From middle school group chat FOMO and slang decoders to the neutral 8:30 PM kitchen bed dock.',
    icon: Smartphone,
    accentBg: 'bg-violet-500/10',
    accentBorder: 'border-violet-500/30',
    accentText: 'text-violet-800',
    badgeBg: 'bg-violet-100 text-violet-800 border-violet-300',
    leap: {
      title: 'Adrenarche, Social Dopamine Shift & Peer Identity Alignment',
      description: 'Adrenal surge sensitizing neural reward circuits to peer approval and acute status anxiety.',
    },
    academyChapter: {
      course: 'Tween Adrenarche & Emotional Volatility',
      chapter: 'Chapter 1: The Biological Awakening to Peer Status',
      priorityBadge: 'Priority 1 · Critical',
      priorityStyle: 'bg-rose-50 text-rose-800 border-rose-200',
      readingMinutes: 4,
    },
    cultureReality: {
      tagline: 'Group chat exclusion fear, viral TikTok memes, and rapid slang shifts.',
      slangSample: '“Crashout” (Cringe: 4/5) • “Rizz” • “Skibidi”',
      cringeScore: '4/5',
    },
    dialogueScript: {
      scenario: '“All my friends have phones except me!”',
      whatToSay: '“I hear how lonely it feels when friends talk about a chat you can’t see. We protect your sleep because we love you. Let’s look at the readiness checklist.”',
    },
    highlights: [
      {
        title: 'First-Phone Readiness Assessment (Score 0–100)',
        description: 'Objective criteria evaluating emotional maturity, impulse delay, and digital literacy before smartphone unboxing.',
        icon: Compass,
      },
      {
        title: 'Bilateral Family Pact-as-Code Co-Creation',
        description: 'Collaborative contract co-signed by parent and tween. No spyware, no secret surveillance.',
        icon: FileCheck2,
      },
      {
        title: 'Bedtime Hardware Dock (8:30 PM Lock)',
        description: 'Automated bedtime curfew locking entertainment apps and protecting adolescent sleep architecture.',
        icon: Clock,
      },
      {
        title: 'Sunday Youth Culture & Slang Intelligence',
        description: 'Weekly digest translating tween slang (Rizz, Skibidi, Crashout) and warning of covert app exploits.',
        icon: MessageSquare,
      },
    ],
    previewBadge: 'Tech Readiness & Bilateral Pacts',
    previewWidget: {
      category: 'Pact-as-Code & Culture Pulse',
      title: 'Sofia — Age 12 • Middle School',
      statusBadge: 'Curfew Enforced • Safe Dock',
      statusColor: 'bg-violet-100 text-violet-800 border-violet-200',
      items: [
        {
          label: 'First-Phone Readiness Score: 88/100',
          detail: 'Passed: Impulse delay, cyberbullying awareness & privacy settings knowledge.',
          status: 'achieved',
        },
        {
          label: 'Bilateral Pact: Dual Signatures Verified',
          detail: 'Parent & Sofia co-signed rules: No devices in bedroom overnight.',
          status: 'achieved',
        },
        {
          label: 'Bedtime Hardware Dock: 8:30 PM Lock',
          detail: 'Zero spyware. Automated MDM profile turns off TikTok & Discord for 9 hrs.',
          status: 'achieved',
        },
      ],
      actionQuote: '“You don’t need to spy on your kid. You need a bilateral agreement backed by neutral code.”',
      footerNote: 'Pact-as-Code MDM profiles certified with Apple & Android Enterprise standards',
    },
  },
  {
    id: 'early-adolescence',
    tabLabel: 'Early Adolescence',
    ageLabel: 'Ages 13–15',
    title: 'Biological Circadian Delay & Algorithmic Defense',
    subtitle: 'From late-night social snap streaks and algorithmic addiction to defending sleep architecture with dignity.',
    icon: Moon,
    accentBg: 'bg-indigo-500/10',
    accentBorder: 'border-indigo-500/30',
    accentText: 'text-indigo-800',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    leap: {
      title: 'Biological Circadian Delay & Algorithmic Feed Resistance',
      description: 'A natural 2-hour biological melatonin phase delay, paired with heightened susceptibility to variable dopamine reward schedules.',
    },
    academyChapter: {
      course: 'Pubertal Circadian Delay & Algorithmic Resistance',
      chapter: 'Chapter 1: The 2-Hour Biological Melatonin Shift',
      priorityBadge: 'Priority 1 · Critical',
      priorityStyle: 'bg-rose-50 text-rose-800 border-rose-200',
      readingMinutes: 5,
    },
    cultureReality: {
      tagline: 'Snapchat streaks, TikTok infinite reels, and gaming microtransactions.',
      slangSample: '“Cooked” • “Lootbox Dopamine” • “Mid”',
      cringeScore: '3/5',
    },
    dialogueScript: {
      scenario: 'Bedtime Phone Resistance (8:30 PM Lock)',
      whatToSay: '“I know your social brain wants to stay locked in. But your melatonin window needs 9 hours without blue light. The pact says 8:30 PM in the kitchen dock.”',
    },
    highlights: [
      {
        title: 'The 2-Hour Biological Melatonin Delay',
        description: 'Understanding pubertal circadian rhythm shifts so bedtime enforcement remains neutral science, not punishment.',
        icon: Moon,
      },
      {
        title: 'Algorithmic Infinite Scroll Resistance',
        description: 'Micro-lessons empowering teens to recognize variable-ratio dopamine hooks designed by social platforms.',
        icon: Brain,
      },
      {
        title: 'Digital Privacy & Covert App Decoders',
        description: 'Early warnings on disguised calculator vaults, anonymous messaging apps, and predator mechanics.',
        icon: AlertTriangle,
      },
      {
        title: 'Mentorship Over Surveillance',
        description: 'Fostering honest disclosure when online mistakes occur rather than driving activity underground.',
        icon: Users,
      },
    ],
    previewBadge: 'Circadian Biology & Screen Governance',
    previewWidget: {
      category: 'Adolescent Neurobiology',
      title: 'Liam — Age 14 • High School',
      statusBadge: 'Circadian Protection Active',
      statusColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      items: [
        {
          label: 'Melatonin Window Defense',
          detail: 'Phone docked in kitchen at 8:30 PM. Blue-light exposure prevented before sleep onset.',
          status: 'achieved',
        },
        {
          label: 'Algorithmic Loop Awareness',
          detail: 'Completed micro-lesson on variable reward loops in short-form video apps.',
          status: 'achieved',
        },
        {
          label: 'Bilateral Agreement Check-In',
          detail: 'Monthly pact review completed with zero punitive confiscation.',
          status: 'achieved',
        },
      ],
      actionQuote: '“Sleep isn’t a battle of wills; it is pubertal biology. Protect the bedroom as an offline sanctuary.”',
      footerNote: 'Research based on Stanford Center for Youth Mental Health & AAP Adolescence Studies',
    },
  },
  {
    id: 'late-adolescence',
    tabLabel: 'Late Adolescence',
    ageLabel: 'Ages 16–18',
    title: 'Executive Autonomy, Digital Footprint & Launch',
    subtitle: 'From college admissions digital footprints and young adult agency to transitioning from manager to mentor.',
    icon: GraduationCap,
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
    accentText: 'text-amber-800',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    leap: {
      title: 'Executive Autonomy, Digital Footprint & Young Adult Sovereignty',
      description: 'Prefrontal-limbic myelination completing long-range risk assessment, self-directed time management, and reputation ownership.',
    },
    academyChapter: {
      course: 'Young Adult Sovereignty & Digital Footprints',
      chapter: 'Chapter 1: Shift from Monitoring to Mentorship',
      priorityBadge: 'Priority 1 · Critical',
      priorityStyle: 'bg-rose-50 text-rose-800 border-rose-200',
      readingMinutes: 5,
    },
    cultureReality: {
      tagline: 'College applications, driving curfews, digital footprint permanence, and adult independence.',
      slangSample: '“Unc” • “Main Character” • “Locked In”',
      cringeScore: '2/5',
    },
    dialogueScript: {
      scenario: 'Algorithmic Comparison & Anxiety',
      whatToSay: '“These feeds are engineered to keep you scrolling even when you feel depleted. You are not broken for feeling exhausted. Want to take a walk?”',
    },
    highlights: [
      {
        title: 'Digital Footprint & Reputation Sovereignty',
        description: 'Understanding that online records are permanent and coaching positive digital identity construction.',
        icon: ShieldCheck,
      },
      {
        title: 'Executive Function & Time Self-Regulation',
        description: 'Transitioning the last parental controls into independent self-management before university or career.',
        icon: Compass,
      },
      {
        title: 'Mental Health & Algorithmic Burnout',
        description: 'De-stigmatizing social media anxiety and creating healthy boundaries around digital news feeds.',
        icon: HeartPulse,
      },
      {
        title: 'From Manager to Trusted Life Advisor',
        description: 'How to step back without letting go, ensuring your teen turns to you when facing adult dilemmas.',
        icon: Users,
      },
    ],
    previewBadge: 'Adult Launch & Sovereignty',
    previewWidget: {
      category: 'Independence & Launch Readiness',
      title: 'Emma — Age 17 • Senior Year',
      statusBadge: 'Self-Governed Privileges',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      items: [
        {
          label: 'Independent Digital Curfew',
          detail: 'Self-selected bedtime winddown. Demonstrating full self-regulation without alarms.',
          status: 'achieved',
        },
        {
          label: 'Reputation & Privacy Audit',
          detail: 'Completed personal privacy audit of public social handles and college application profiles.',
          status: 'achieved',
        },
        {
          label: 'Mentorship Transition Completed',
          detail: 'Parent-teen check-ins shifted from rule enforcement to voluntary life counsel.',
          status: 'achieved',
        },
      ],
      actionQuote: '“Our goal isn’t to control their digital world forever—it is to raise adults who can govern themselves.”',
      footerNote: 'Grounded in developmental neuroscience on prefrontal myelination through age 25',
    },
  },
];

/**
 * Backward-compatible 4-stage array mapping to PLAN-23 expectations.
 */
export const LIFESPAN_STAGES: StageData[] = [
  CANONICAL_6_LIFESPAN_STAGES[0]!,
  CANONICAL_6_LIFESPAN_STAGES[1]!,
  CANONICAL_6_LIFESPAN_STAGES[2]!,
  {
    ...CANONICAL_6_LIFESPAN_STAGES[3]!,
    id: 'preteens-adolescents',
    tabLabel: 'Pre-Teens & Adolescents',
    ageLabel: 'Ages 10–18',
    title: 'Autonomy, Modern Tech & Youth Culture',
  },
];

export function LifespanStageSelector() {
  const [activeStageId, setActiveStageId] = useState<string>('infants-toddlers');

  const activeStage =
    CANONICAL_6_LIFESPAN_STAGES.find((s) => s.id === activeStageId) ?? CANONICAL_6_LIFESPAN_STAGES[0]!;

  return (
    <section id="stages" className="pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E3DC] bg-white px-3 py-1 text-xs font-semibold text-[#143D2B]">
          <span className="font-mono text-[11px] uppercase tracking-wider">
            VOL. XXIV // CONTINUOUS LIFESPAN (0–18)
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#111413]">
          Tailored Advisory for Every <em className="italic font-normal text-[#143D2B]">Developmental Horizon</em>
        </h2>
        <p className="text-base text-[#494F4C] leading-relaxed">
          Your child’s brain and social world change drastically every few years. Select an age band below to preview AlongSide&apos;s active leap indicators, prioritized academy chapters, and word-for-word scripts.
        </p>
      </div>

      {/* Responsive Horizontal Age Stage Tabs (6 Stages) */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 mb-8 no-scrollbar bg-[#F4F4F0] border border-[#E3E3DC] p-1.5 rounded-[6px]">
        {CANONICAL_6_LIFESPAN_STAGES.map((stage) => {
          const isActive = stage.id === activeStageId;
          const StageIcon = stage.icon;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-[5px] text-xs font-bold shrink-0 transition-all cursor-pointer min-h-[44px] ${
                isActive
                  ? 'bg-white text-[#111413] shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-[#E3E3DC]'
                  : 'bg-transparent text-[#494F4C] hover:text-[#111413] hover:bg-white/60'
              }`}
            >
              <StageIcon className={`h-4 w-4 ${isActive ? 'text-[#143D2B]' : 'text-[#858C88]'}`} />
              <span>{stage.tabLabel}</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-[#EAF3EE] text-[#143D2B] font-semibold' : 'bg-[#E3E3DC]/60 text-[#494F4C]'
                }`}
              >
                {stage.ageLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Hero & 4 Concrete Preview Cards Grid */}
      <div className="space-y-6">
        {/* Stage Header Banner */}
        <div className="rounded-[10px] border border-[#E3E3DC] bg-white text-[#111413] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_1px_2px_rgba(17,20,19,0.04)]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#143D2B] bg-[#EAF3EE] px-2.5 py-0.5 rounded-full border border-[#143D2B]/20">
                HORIZON // {activeStage.ageLabel}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#111413]">
              {activeStage.title}
            </h3>
            <p className="text-sm text-[#494F4C] leading-relaxed">
              {activeStage.subtitle}
            </p>
          </div>

          <Link href="/register" className="shrink-0">
            <Button
              variant="forest"
              size="lg"
              className="gap-2 font-bold min-h-[44px] shadow-sm"
            >
              <span>Explore {activeStage.tabLabel} Curriculum</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* 4 Concrete Advisory Preview Cards Grid (Plan 33 Task 8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Neurodevelopmental Leap */}
          <div className="rounded-[10px] border border-[#E3E3DC] bg-white p-5 space-y-3 shadow-[0_1px_2px_rgba(17,20,19,0.04)]">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[#EAF3EE] text-[#143D2B] font-bold">
                <Brain className="h-4 w-4" />
              </div>
              <span className="font-mono text-xs font-bold text-[#143D2B] uppercase tracking-wider">
                1. Active Leap
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#111413] leading-snug">
              {activeStage.leap.title}
            </h4>
            <p className="text-xs text-[#494F4C] leading-relaxed">
              {activeStage.leap.description}
            </p>
          </div>

          {/* Card 2: Prioritized Academy Chapter */}
          <div className="rounded-[10px] border border-[#E3E3DC] bg-white p-5 space-y-3 shadow-[0_1px_2px_rgba(17,20,19,0.04)]">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[#FEF3C7] text-[#B45309] font-bold">
                  <Compass className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs font-bold text-[#B45309] uppercase tracking-wider">
                  2. Priority Chapter
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border bg-amber-50 text-[#B45309] border-amber-200">
                {activeStage.academyChapter.priorityBadge}
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#858C88] font-bold uppercase block">
                {activeStage.academyChapter.course}
              </span>
              <h4 className="text-sm font-bold text-[#111413] leading-snug mt-0.5">
                {activeStage.academyChapter.chapter}
              </h4>
            </div>
            <p className="text-xs text-[#494F4C] flex items-center gap-1.5 font-medium">
              <Clock className="h-3.5 w-3.5 text-[#858C88]" />
              <span>{activeStage.academyChapter.readingMinutes} min micro-lesson with clinical dialogue</span>
            </p>
          </div>

          {/* Card 3: Youth Culture & Slang */}
          <div className="rounded-[10px] border border-[#E3E3DC] bg-white p-5 space-y-3 shadow-[0_1px_2px_rgba(17,20,19,0.04)]">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[#F4F4F0] text-[#111413] font-bold">
                  <Flame className="h-4 w-4 text-[#B45309]" />
                </div>
                <span className="font-mono text-xs font-bold text-[#111413] uppercase tracking-wider">
                  3. Youth Culture
                </span>
              </div>
              {activeStage.cultureReality.cringeScore && (
                <span className="font-mono text-[10px] font-bold text-[#494F4C] bg-[#F4F4F0] border border-[#E3E3DC] px-2 py-0.5 rounded">
                  Cringe: {activeStage.cultureReality.cringeScore}
                </span>
              )}
            </div>
            <p className="text-xs text-[#494F4C] leading-relaxed">
              {activeStage.cultureReality.tagline}
            </p>
            <div className="rounded-[5px] bg-[#F4F4F0] border border-[#E3E3DC] p-2 text-xs font-mono font-bold text-[#111413]">
              {activeStage.cultureReality.slangSample}
            </div>
          </div>

          {/* Card 4: Actionable Dialogue ("What to Say") */}
          <div className="rounded-[10px] border border-[#E3E3DC] bg-[#FBFBF9] p-5 space-y-3 shadow-[0_1px_2px_rgba(17,20,19,0.04)]">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[#EAF3EE] text-[#143D2B] font-bold">
                <MessageSquare className="h-4 w-4" />
              </div>
              <span className="font-mono text-xs font-bold text-[#143D2B] uppercase tracking-wider">
                4. What to Say
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#143D2B] font-bold uppercase block">
                Scenario: {activeStage.dialogueScript.scenario}
              </span>
              <p className="text-xs font-medium text-[#111413] italic font-serif leading-relaxed mt-1">
                {activeStage.dialogueScript.whatToSay}
              </p>
            </div>
            <div className="text-[11px] text-[#143D2B] font-semibold font-mono">
              ✅ Empathetic boundary with zero shame
            </div>
          </div>
        </div>

        {/* Realistic Interactive Simulation Card */}
        <div className="rounded-[10px] border border-[#E3E3DC] bg-white p-6 sm:p-7 shadow-[0_1px_2px_rgba(17,20,19,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E3DC] pb-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-[#111413] text-white font-mono font-bold text-sm">
                OS
              </span>
              <div>
                <span className="font-mono text-[11px] font-bold text-[#858C88] uppercase tracking-wider block">
                  {activeStage.previewWidget.category}
                </span>
                <span className="text-base font-bold text-[#111413]">
                  {activeStage.previewWidget.title}
                </span>
              </div>
            </div>

            <Badge
              variant="outline"
              className="text-xs font-semibold px-3 py-1 font-mono bg-[#EAF3EE] text-[#143D2B] border-[#143D2B]/20"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              {activeStage.previewWidget.statusBadge}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {activeStage.previewWidget.items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {activeStage.previewWidget.actionQuote && (
            <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-3 text-xs text-teal-950 font-medium italic mb-3">
              {activeStage.previewWidget.actionQuote}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>{activeStage.previewWidget.footerNote}</span>
            <Link
              href="/register"
              className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span>Unlock full interactive cockpit</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
