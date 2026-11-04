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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-teal-100/40 via-emerald-50/50 to-amber-50/30 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
        {/* Lifespan Positioning Badge */}
        <Badge
          variant="default"
          className="gap-2 py-1.5 px-4 text-xs font-medium bg-teal-50/90 border-teal-200 text-teal-800 shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-teal-600" />
          <span>Clinical Pediatric Science • Lifespan Child OS (Ages 0–18) • Zero-Spyware Family Calm</span>
        </Badge>

        {/* Holistic Lifespan Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
          The Complete Operating System for Raising Thriving Kids in the{' '}
          <span className="text-teal-700 underline decoration-teal-300 underline-offset-8">
            Modern World
          </span>
          .
        </h1>

        {/* Empathetic Subheadline */}
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
          From 2:00 AM pediatric fever triage, safe allergen introduction, and speech milestones to
          purposeful brain play, tantrum co-regulation, and healthy digital pacts.
        </p>

        {/* Dual Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6 shadow-md bg-teal-700 hover:bg-teal-800 text-white">
              Start 7-Day Risk-Free Trial
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <a href="#stages" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base px-7 py-6 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Explore by Child Age (0–18)
            </Button>
          </a>
        </div>

        {/* Clinical Authority & Trust Signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 w-full max-w-3xl text-left">
          {HERO_TRUST_SIGNALS.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/70 border border-slate-200/80 shadow-xs">
                <Icon className="h-4 w-4 text-teal-700 shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block">{badge.title}</span>
                  <span className="text-slate-500 text-[11px]">{badge.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Micro-Copy */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 pt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <HeartPulse className="h-3.5 w-3.5 text-teal-600" /> 24/7 Clinical Symptom Guidance
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Evidence-Backed Neurobiology
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" /> All Ages Supported Under One Family Pass
          </span>
        </div>
      </div>
    </section>
  );
}
