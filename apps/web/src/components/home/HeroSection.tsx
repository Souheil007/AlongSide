import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  HeartPulse,
  Brain,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const HERO_TRUST_SIGNALS = [
  {
    title: 'Neurobiology',
    subtitle: 'Developmental Science',
    icon: Brain,
  },
  {
    title: 'CDC & AAP',
    subtitle: 'Milestones 0–18',
    icon: Layers,
  },
  {
    title: 'Zero-Spyware',
    subtitle: 'Privacy Pledge',
    icon: Lock,
  },
  {
    title: '1-Click Cancel',
    subtitle: '7-Day Risk-Free',
    icon: CheckCircle2,
  },
];

export function HeroSection() {
  return (
    <section className="relative pt-12 md:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Editorial Archival Mesh Hero Aura */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-[720px] h-[400px] pointer-events-none -z-10 blur-3xl opacity-80"
        style={{
          background:
            'radial-gradient(circle at 40% 30%, rgba(20, 61, 43, 0.16), transparent 60%), radial-gradient(circle at 65% 35%, rgba(180, 83, 9, 0.12), transparent 55%), radial-gradient(circle at 50% 80%, rgba(17, 20, 19, 0.08), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
        {/* Editorial Publication Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E3DC] bg-white px-3.5 py-1.5 text-xs font-medium text-[#494F4C] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <span className="rounded-[4px] bg-[#EAF3EE] px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#143D2B]">
            WHOLE-CHILD ADVISORY
          </span>
          <span className="font-medium text-[#494F4C]">
            Neurodevelopmental Science • Lifespan Family OS
          </span>
        </div>

        {/* Editorial Sanctuary Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111413] leading-[1.12]">
          The Parent Advisory Sanctuary: <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-[#143D2B] tracking-normal">
            Keep Up With Your Child
          </span>{' '}
          As They Grow.
        </h1>

        {/* Empathetic Editorial Subheadline */}
        <p className="text-lg sm:text-xl text-[#494F4C] leading-relaxed max-w-3xl">
          Replace parenting anxiety, guilt, and exhaustion with evidence-based developmental science,
          prioritized 5-minute micro-courses, weekly youth culture intelligence, and bilateral screen pacts (Ages 0–18).
        </p>

        {/* Dual Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto">
            <Button
              variant="pill"
              size="lg"
              className="w-full sm:w-auto gap-2 text-base px-8 py-6 font-bold shadow-md"
            >
              Start 7-Day Risk-Free Trial
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <a href="#stages" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base px-7 py-6 border-[#E3E3DC] text-[#111413] hover:border-[#111413] font-semibold"
            >
              Explore 6-Stage Curriculum
            </Button>
          </a>
        </div>

        {/* Clinical Authority & Trust Signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 w-full max-w-3xl text-left">
          {HERO_TRUST_SIGNALS.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-[5px] bg-white border border-[#E3E3DC] shadow-[0_1px_2px_rgba(17,20,19,0.04)] transition-colors hover:border-[#111413]"
              >
                <Icon className="h-4 w-4 text-[#143D2B] shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[#111413] block">{badge.title}</span>
                  <span className="text-[#858C88] text-[11px] font-mono">{badge.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Micro-Copy */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 pt-2 text-xs text-[#858C88]">
          <span className="flex items-center gap-1.5 font-medium">
            <Brain className="h-3.5 w-3.5 text-[#143D2B]" /> Prioritized Parent Academy (Neurobiology)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="h-3.5 w-3.5 text-[#143D2B]" /> Weekly Youth Culture Digest & Slang
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#143D2B]" /> All Ages Supported Under One Family Pass
          </span>
        </div>
      </div>
    </section>
  );
}
