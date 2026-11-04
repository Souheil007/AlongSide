import Link from 'next/link';
import {
  HeartPulse,
  Utensils,
  Puzzle,
  Brain,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
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

export const FIVE_BALANCED_PILLARS: PillarData[] = [
  {
    number: '01',
    title: 'Pediatric Health & Triage ("The Safe Resort")',
    category: 'Pillar 1 • Clinical Health',
    tagline: 'End 2:00 AM panic Googling with clinical fever & illness triage.',
    description:
      'Pediatrician-backed 3-zone symptom protocols clarifying when to monitor at home, call your doctor, or head to the emergency room.',
    icon: HeartPulse,
    badge: 'Barton Schmitt Protocols',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    highlights: [
      'Age-calibrated fever triage (< 3mo emergency, 3-6mo 101°F check, 6mo+ behavior)',
      'Common childhood illness decoders (Croup, RSV, Ear Infections, Hand-Foot-Mouth)',
      'Pediatric sleep regressions & circadian rhythm calibration',
    ],
    clinicalAnchor: 'Based on Barton Schmitt Pediatric Protocols & AAP Clinical Practice',
    href: '/health',
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
    clinicalAnchor: 'Based on Gottman Emotion Coaching & Siegel Interpersonal Neurobiology',
    href: '/behavior',
  },
  {
    number: '05',
    title: 'Modern Culture, Devices & Bilateral Pacts',
    category: 'Pillar 5 • Balanced Technology',
    tagline: 'The "Thinking About a Device?" Action Hub, bilateral pacts & neutral curfews.',
    description:
      'Transform technology from an exhausting domestic battle into an empowering rite of passage. Co-signed on-screen agreements and automated 8:30 PM curfews.',
    icon: Smartphone,
    badge: 'Pact-as-Code & Zero Spyware',
    badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
    highlights: [
      'Objective First-Phone Readiness Assessment (Score 0–100) before unboxing',
      'Bilateral Family Media Pact co-signed by parent and child on screen',
      'Automated 8:30 PM hardware lockdown: The OS enforces bedtime so you can be the loving parent',
      'Sunday Youth Culture Digest decoding tween slang (crashout, skibidi, rizz) & app exploits',
    ],
    clinicalAnchor: 'Based on Declarative Device Management & Zero-Spyware Safe Harbor Architecture',
    href: '/devices',
    colSpan: 'md:col-span-2',
  },
];

export function PillarsShowcase() {
  return (
    <section id="pillars" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <Badge variant="outline" className="text-xs uppercase tracking-wider text-slate-600 bg-slate-50 border-slate-300">
          The 5 Balanced Pillars of AlongSide
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Nurture the Whole Child: Health, Mind, Heart &amp; Environment
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Modern parenting culture oscillates between passive permissiveness and anxious surveillance.
          AlongSide synthesizes clinical pediatric medicine, developmental psychology, and balanced technology into one comprehensive operating system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {FIVE_BALANCED_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card
              key={pillar.number}
              className={`border border-slate-200/90 hover:border-teal-300 transition-all duration-200 hover:shadow-md bg-white ${
                pillar.colSpan ?? ''
              }`}
            >
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                        {pillar.category}
                      </span>
                      <CardTitle className="text-xl sm:text-2xl text-slate-900 font-bold">
                        {pillar.title}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge className={`text-xs ${pillar.badgeClass} hidden sm:inline-flex`}>
                    {pillar.badge}
                  </Badge>
                </div>
                <CardDescription className="text-slate-600 text-sm font-medium">
                  {pillar.tagline}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-1">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Key Clinical Tools &amp; Features:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {pillar.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="text-slate-500 italic">
                    {pillar.clinicalAnchor}
                  </span>
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-800 hover:underline"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
