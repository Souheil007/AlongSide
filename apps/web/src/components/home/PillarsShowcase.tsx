import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  Flame,
  FileCheck2,
  Brain,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Compass,
  HeartPulse,
  Utensils,
  Puzzle,
  Smartphone,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface PillarData {
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  icon: typeof HeartPulse;
  badge: string;
  badgeClass: string;
  highlights: string[];
  clinicalAnchor: string;
  href: string;
  colSpan?: string;
}

export interface CoreAdvisoryPillar {
  number: string;
  title: string;
  categoryTag: string;
  badge: string;
  badgeClass: string;
  description: string;
  highlights: string[];
  href: string;
  ctaText: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const THREE_CORE_PILLARS: CoreAdvisoryPillar[] = [
  {
    number: '01',
    title: 'Parent Intelligence Academy',
    categoryTag: 'The Advisory Core • 5 Categories',
    badge: 'Prioritized Chapters (P1 to P3)',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
    description:
      'Structured 5-minute micro-courses across 5 core categories. Chapters ordered strictly by necessity (Priority 1: Immediate Friction to Priority 3: Long-Term Scaffolding).',
    highlights: [
      '5 Canonical Categories: Behavior, Pediatric Health & Sleep, Nutrition, Play, Digital World',
      'Neurobiology callouts, developmental insights, and interactive checklists',
      'Actionable word-for-word dialogue speech bubbles with 1-click copy',
    ],
    href: '/academy',
    ctaText: 'Explore Academy Curriculum',
    icon: BookOpen,
  },
  {
    number: '02',
    title: 'Sunday Youth Culture Digest',
    categoryTag: 'The Weekly Living Feed • Every Sunday',
    badge: 'Slang Radar & Cringe Meter (1–5)',
    badgeClass: 'bg-purple-50 text-purple-900 border-purple-200',
    description:
      'Keep effortlessly fluent with your child without policing. Decodes trending tween slang, exposes covert app exploits, and sparks organic family dinner conversations.',
    highlights: [
      'Searchable Slang Decoder with pronunciation, definitions, and visual 1-5 Cringe Meter',
      'Sunday Dinner Table Conversation Starters tailored to age tiers',
      'Exploit Early Warnings: Dark patterns, disguised vault apps, and predator mechanics',
    ],
    href: '/digest',
    ctaText: 'Explore Sunday Digest & Slang',
    icon: Flame,
  },
  {
    number: '03',
    title: 'Bilateral Family Pacts & Devices',
    categoryTag: 'Tech Sovereignty • Pact-as-Code',
    badge: 'Zero Spyware • 8:30 PM Dock',
    badgeClass: 'bg-violet-50 text-violet-900 border-violet-200',
    description:
      'Replace adversarial device policing with collaborative agreements. Certified MDM profiles enforce bedtime curfews neutrally while safeguarding child privacy.',
    highlights: [
      'First-Phone Readiness Assessment (Score 0–100) before smartphone purchase',
      'Bilateral pact builder with digital co-signatures and printable vector contracts',
      'Automated 8:30 PM Bedtime Hardware Lock without text-spying or keyloggers',
    ],
    href: '/devices',
    ctaText: 'Explore Family Pacts & Curfews',
    icon: FileCheck2,
  },
];

export const FIVE_BALANCED_PILLARS: PillarData[] = [
  {
    number: '01',
    title: 'Child Wellness & Restorative Sleep ("The Sleep Sanctuary")',
    category: 'Pillar 1 • Physical Wellness & Sleep',
    tagline: 'End bedtime chaos and sleep anxiety with evidence-based developmental routines.',
    description:
      'Pediatrician-backed sleep architecture and circadian biology clarifying nap consolidation, bedtime anxiety, and restorative family rhythms.',
    icon: HeartPulse,
    badge: 'Pediatric Sleep Science',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    highlights: [
      'Age-calibrated sleep architecture (4-month cycle shift, 8-10mo separation anxiety)',
      'Bedtime calm rituals & sensory co-regulation strategies',
      'Circadian rhythm calibration & natural melatonin optimization',
    ],
    clinicalAnchor: 'American Academy of Pediatrics (AAP) & Pediatric Sleep Foundations',
    href: '/academy?category=HEALTH_AND_WELLNESS',
  },
  {
    number: '02',
    title: 'Pediatric Nutrition & Feeding Vault',
    category: 'Pillar 2 • Food & Nutrition',
    tagline: 'Safe early allergen exposure, choking safety, and zero-battle meals.',
    description:
      'From Baby-Led Weaning and early allergen timelines to Ellyn Satter’s Division of Responsibility for conquering toddler picky eating.',
    icon: Utensils,
    badge: 'Ellyn Satter Method',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    highlights: [
      'Safe early allergen introduction timetable (Peanuts, Eggs, Dairy, Tree Nuts)',
      'Strict choking hazard spears vs dangerous round cuts',
      'The Division of Responsibility: Parents decide WHAT/WHEN, child decides IF/HOW MUCH',
    ],
    clinicalAnchor: 'Based on LEAP Allergy Study & Division of Responsibility in Feeding',
    href: '/nutrition',
  },
  {
    number: '03',
    title: 'Developmental Milestones & Purposeful Play',
    category: 'Pillar 3 • Milestones & Play',
    tagline: '100% screen-free brain games, motor milestones, and boredom busters.',
    description:
      'Clear checklists on what your child should be able to do at each month and year, paired with daily play activities that build executive function.',
    icon: Puzzle,
    badge: 'CDC Milestones & Piaget',
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
    highlights: [
      'CDC & AAP gross motor, fine motor, and expressive speech checklists (0–18)',
      'Face-to-face animal puppet vocal mirroring & high-contrast sensory toys',
      'The Boredom Buster: Why rescuing kids from boredom stunts creative focus',
    ],
    clinicalAnchor: 'Based on CDC 2026 Milestone Guidelines & Montessori/Piaget Play Science',
    href: '/brain-games',
  },
  {
    number: '04',
    title: 'Behavioral Psychology & Co-Regulation',
    category: 'Pillar 4 • Emotional Health',
    tagline: 'Translate tantrums into unmet needs with word-for-word empathy scripts.',
    description:
      'Children do not act out from malice; behavior is communication. Replace punitive time-outs with authoritative warmth and physiological calm.',
    icon: Brain,
    badge: 'HALT Diagnostic Framework',
    badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    highlights: [
      'The HALT Diagnostic: Hungry (hypoglycemia), Anxious/Angry, Lonely, Tired (adenosine)',
      'Toddler hitting & biting decoded: Pre-verbal motor impulse before language inhibition',
      'Word-for-word co-regulation scripts that hold firm limits while validating big feelings',
    ],
    clinicalAnchor: 'Based on Dan Siegel’s Whole-Brain Child & Ross Greene Collaborative Proactive Solutions',
    href: '/behavior',
  },
  {
    number: '05',
    title: 'Balanced Technology & Pact-as-Code',
    category: 'Pillar 5 • Balanced Technology',
    tagline: 'Zero-spyware smartphone readiness, digital signatures, and bedtime curfews.',
    description:
      'Move beyond fear-mongering and invasive spyware. Assess device readiness (0–100), co-create bilateral agreements, and enforce healthy boundaries.',
    icon: Smartphone,
    badge: 'Apple & Android MDM Certified',
    badgeClass: 'bg-violet-50 text-violet-800 border-violet-200',
    highlights: [
      'First-Phone Readiness Assessment: Objective 0–100 score across 4 developmental maturity dimensions',
      'The Bilateral Family Media Agreement: Dual-signed contract holding parents and children mutually accountable',
      'The Neutral 8:30 PM Bed Dock: MDM device profiles enforcing bedroom curfews without manual policing',
    ],
    clinicalAnchor: 'Compliant with COPPA Safe Harbor, Apple DDM, and Jonathan Haidt Anxious Generation Principles',
    href: '/devices',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
];

export function PillarsShowcase() {
  return (
    <section id="pillars" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20 relative">
      <span id="features" className="scroll-mt-20 absolute -top-20" aria-hidden="true" />
      <span id="academy" className="scroll-mt-20 absolute -top-20" aria-hidden="true" />
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E3DC] bg-white px-3.5 py-1 text-xs font-semibold text-[#143D2B]">
          <span className="font-mono text-[11px] uppercase tracking-wider">
            VOL. XXIV // THREE PILLARS
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#111413]">
          The 3 Pillars of <em className="italic font-normal text-[#143D2B]">Parent Calm</em> &amp; Child Understanding
        </h2>
        <p className="text-base text-[#494F4C] leading-relaxed">
          AlongSide brings together stage-by-stage parent courses, weekly youth culture guides, and family screen agreements in one calm place.
        </p>
      </div>

      {/* 3 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {THREE_CORE_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card
              key={pillar.number}
              className="border-[#E3E3DC] bg-white hover:border-[#111413] transition-all shadow-[0_1px_2px_rgba(17,20,19,0.04)] hover:shadow-[0_4px_12px_rgba(17,20,19,0.06)] flex flex-col justify-between rounded-[10px]"
            >
              <CardHeader className="p-6 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl font-black text-[#858C88] font-mono">
                    {pillar.number}
                  </span>
                  <Badge
                    variant="outline"
                    className={`font-mono text-[10px] font-bold border ${pillar.badgeClass}`}
                  >
                    {pillar.badge}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-[#143D2B] text-white font-bold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#858C88] block">
                      {pillar.categoryTag}
                    </span>
                    <CardTitle className="font-serif text-xl font-bold text-[#111413] leading-snug">
                      {pillar.title}
                    </CardTitle>
                  </div>
                </div>

                <CardDescription className="text-xs text-[#494F4C] leading-relaxed pt-1">
                  {pillar.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-4">
                <ul className="space-y-2">
                  {pillar.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-[#494F4C] flex items-start gap-2 leading-relaxed"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#143D2B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Link href={pillar.href} className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full min-h-[44px] gap-2 text-xs font-bold border-[#E3E3DC] text-[#111413] hover:border-[#111413] hover:bg-[#F4F4F0]"
                    >
                      <span>{pillar.ctaText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Global Companion: 24/7 AI Child Advisor Spotlight Card */}
      <div className="rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-500 text-slate-950 font-bold shadow-sm">
            <Brain className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Omnipresent Companion
              </span>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 font-semibold px-2 py-0.5 rounded-full border border-teal-400/30">
                Parenting Q&A Library
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              24/7 AI Child Advisor: Safe Harbor Guidance
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Grounded in 260+ real-life parenting questions and child development research. Generate word-for-word scripts, resolve acute bedtime and screen friction, and get instant answers anytime.
            </p>
          </div>
        </div>

        <Link href="/advisor" className="shrink-0 w-full md:w-auto">
          <Button
            size="lg"
            className="w-full md:w-auto gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold min-h-[44px] shadow-sm"
          >
            <span>Consult AI Advisor</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
