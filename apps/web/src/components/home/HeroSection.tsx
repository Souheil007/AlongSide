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
    title: 'Barton Schmitt',
    subtitle: 'Pediatric Protocols',
    icon: Stethoscope,
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
      {/* Background Decorative Soft Blurs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-teal-100/40 via-amber-50/40 to-purple-50/30 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
        {/* Advisory Sanctuary Positioning Badge */}
        <Badge
          variant="default"
          className="gap-2 py-1.5 px-4 text-xs font-semibold bg-teal-50/90 border-teal-200 text-teal-800 shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-teal-600" />
          <span>Clinical Pediatric Science • Prioritized Parent Academy • Weekly Youth Culture Digest • Zero-Spyware Pacts</span>
        </Badge>

        {/* Advisory Sanctuary Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
          The Parent Advisory Sanctuary:{' '}
          <span className="text-teal-700 underline decoration-teal-300 underline-offset-8">
            Keep Up With Your Child
          </span>{' '}
          As They Grow.
        </h1>

        {/* Empathetic Subheadline */}
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
          Replace parenting anxiety, guilt, and 2:00 AM panic Googling with clinical developmental science,
          prioritized 5-minute micro-courses, weekly youth culture intelligence, and bilateral screen pacts (Ages 0–18).
        </p>

        {/* Dual Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6 shadow-md bg-teal-700 hover:bg-teal-800 text-white font-bold">
              Start 7-Day Risk-Free Trial
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <a href="#stages" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base px-7 py-6 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
            >
              Explore Advisory Curriculum (0–18)
            </Button>
          </a>
        </div>

        {/* Clinical Authority & Trust Signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 w-full max-w-3xl text-left">
          {HERO_TRUST_SIGNALS.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/80 border border-slate-200/80 shadow-xs">
                <Icon className="h-4 w-4 text-teal-700 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">{badge.title}</span>
                  <span className="text-slate-500 text-[11px]">{badge.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Micro-Copy */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 pt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <Brain className="h-3.5 w-3.5 text-teal-600" /> Evidence-Backed Developmental Neurobiology
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Compass className="h-3.5 w-3.5 text-emerald-600" /> Prioritized Chapters by Acute Necessity
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" /> All Ages Supported Under One Family Pass
          </span>
        </div>
      </div>
    </section>
  );
}
