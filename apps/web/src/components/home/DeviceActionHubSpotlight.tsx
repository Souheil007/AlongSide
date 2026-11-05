import Link from 'next/link';
import {
  Smartphone,
  ShieldCheck,
  FileCheck2,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface HubStep {
  step: number;
  label: string;
  title: string;
  description: string;
  previewTitle: string;
  previewDetail: string;
}

export const DEVICE_HUB_STEPS: HubStep[] = [
  {
    step: 1,
    label: 'Step 1 • Diagnostic',
    title: 'Readiness Score (0–100)',
    description:
      'Evaluate impulse control, sleep consistency, and emotional resilience before unboxing a phone, tablet, or gaming console.',
    previewTitle: 'Sofia’s Readiness: 84 / 100',
    previewDetail: 'Recommendation: Ready for family phone with supervised charging.',
  },
  {
    step: 2,
    label: 'Step 2 • Collaboration',
    title: 'Bilateral Family Pact',
    description:
      'Co-negotiated agreement signed digitally on the screen. Children respect boundaries they had a voice in constructing.',
    previewTitle: 'Mutual Commitments Co-Signed',
    previewDetail: 'Parent snooping pledge + child bedtime kitchen charging + vector PDF.',
  },
  {
    step: 3,
    label: 'Step 3 • Neutral Muscle',
    title: 'Automated 8:30 PM Lock',
    description:
      'Cryptographic Apple & Android profiles enforce bedtime limits. The operating system is the boundary—not you.',
    previewTitle: 'Curfew Status: Active 8:30 PM',
    previewDetail: 'Locks non-exempt apps at bedtime automatically. Emergency parent calls stay open.',
  },
];

export function DeviceActionHubSpotlight() {
  return (
    <section id="devices-hub" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20 relative">
      <span id="devices" className="scroll-mt-20 absolute -top-20" aria-hidden="true" />
      <span id="roads" className="scroll-mt-20 absolute -top-20" aria-hidden="true" />
      <span id="quiz" className="scroll-mt-20 absolute -top-20" aria-hidden="true" />
      <div className="rounded-3xl border-2 border-teal-200/90 bg-gradient-to-b from-teal-50/40 via-white to-slate-50/40 p-6 sm:p-10 lg:p-12 shadow-sm space-y-12">
        {/* Header & Framing */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-teal-100 text-teal-800 border-teal-300 py-1 px-3">
            <Sparkles className="h-3.5 w-3.5 mr-1 text-teal-600" />
            The &ldquo;Thinking About Buying a Device?&rdquo; Action Hub
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Turn Device Introduction into an Empowering Rite of Passage
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Technology is an integrated reality of modern childhood. Rather than resorting to secret spyware or nightly bedtime shouting matches, AlongSide establishes mutual agreements, objective readiness, and neutral hardware enforcement.
          </p>
        </div>

        {/* The 3-Step Transition Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEVICE_HUB_STEPS.map((s) => (
            <div key={s.step} className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  {s.label}
                </span>
                <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                  {s.step}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-xs font-semibold text-slate-800">
                  {s.previewTitle}
                </div>
                <div className="text-[11px] text-slate-500">
                  {s.previewDetail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contrast Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-teal-100">
          {/* The Legacy Trap */}
          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-base">
              <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
              <span>The Legacy Surveillance Trap</span>
            </div>
            <ul className="space-y-2 text-xs text-rose-800">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold mt-0.5">•</span>
                <span>Parents spy on private texts, breeding hostility and evasive burner apps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold mt-0.5">•</span>
                <span>Nightly screaming matches over confiscating the phone at bedtime</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold mt-0.5">•</span>
                <span>Child learns zero intrinsic self-regulation, only how to bypass controls</span>
              </li>
            </ul>
          </div>

          {/* The AlongSide Way */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>The AlongSide Parent Calm Way</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-800">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>Zero spyware pledge: Respects dignity while establishing clear boundaries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>The phone locks itself at 8:30 PM: Parent remains a loving comfort, not a cop</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>Bilateral co-ownership builds lifelong digital self-control and honesty</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-teal-800 text-white">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">
              Ready to assess your child&apos;s phone readiness?
            </h3>
            <p className="text-xs text-teal-100 max-w-xl">
              Take our 5-minute neurodevelopmental diagnostic and generate your first Bilateral Family Pact.
            </p>
          </div>
          <Link href="/register" className="w-full sm:w-auto shrink-0">
            <Button size="lg" className="w-full sm:w-auto bg-white text-teal-900 hover:bg-teal-50 font-semibold gap-2 shadow-sm">
              Start Free Assessment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
