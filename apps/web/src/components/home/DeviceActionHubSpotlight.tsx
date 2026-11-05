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
      <div className="rounded-[10px] border border-[#E3E3DC] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_1px_2px_rgba(17,20,19,0.04)] space-y-12">
        {/* Header & Framing */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E3DC] bg-[#FBFBF9] px-3.5 py-1 text-xs font-semibold text-[#143D2B]">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              VOL. XXIV // DEVICE RITE OF PASSAGE
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111413] tracking-tight">
            Turn Device Introduction into an <em className="italic font-normal text-[#143D2B]">Empowering Rite of Passage</em>
          </h2>
          <p className="text-base sm:text-lg text-[#494F4C] leading-relaxed">
            Technology is an integrated reality of modern childhood. Rather than resorting to secret spyware or nightly bedtime shouting matches, AlongSide establishes mutual agreements, objective readiness, and neutral hardware enforcement.
          </p>
        </div>

        {/* The 3-Step Transition Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEVICE_HUB_STEPS.map((s) => (
            <div key={s.step} className="rounded-[10px] border border-[#E3E3DC] bg-[#FBFBF9] p-6 shadow-xs space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#143D2B]">
                  {s.label}
                </span>
                <div className="h-8 w-8 rounded-full bg-[#EAF3EE] text-[#143D2B] font-mono font-bold text-xs flex items-center justify-center border border-[#143D2B]/20">
                  {s.step}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-[#111413]">
                  {s.title}
                </h3>
                <p className="text-xs text-[#494F4C] leading-relaxed">
                  {s.description}
                </p>
              </div>
              <div className="p-3.5 rounded-[5px] bg-white border border-[#E3E3DC] space-y-1">
                <div className="text-xs font-semibold text-[#111413]">
                  {s.previewTitle}
                </div>
                <div className="text-[11px] text-[#858C88] font-mono">
                  {s.previewDetail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contrast Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E3E3DC]">
          {/* The Legacy Trap */}
          <div className="p-6 rounded-[10px] bg-white border border-rose-200/80 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-base font-serif">
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
          <div className="p-6 rounded-[10px] bg-[#EAF3EE] border border-[#143D2B]/20 space-y-3">
            <div className="flex items-center gap-2 text-[#143D2B] font-bold text-base font-serif">
              <CheckCircle2 className="h-5 w-5 text-[#143D2B] shrink-0" />
              <span>The AlongSide Parent Calm Way</span>
            </div>
            <ul className="space-y-2 text-xs text-[#143D2B]">
              <li className="flex items-start gap-2">
                <span className="text-[#143D2B] font-bold mt-0.5">•</span>
                <span>Zero spyware pledge: Respects dignity while establishing clear boundaries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#143D2B] font-bold mt-0.5">•</span>
                <span>The phone locks itself at 8:30 PM: Parent remains a loving comfort, not a cop</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#143D2B] font-bold mt-0.5">•</span>
                <span>Bilateral co-ownership builds lifelong digital self-control and honesty</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-[10px] bg-[#143D2B] text-white">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl font-bold">
              Ready to assess your child&apos;s phone readiness?
            </h3>
            <p className="text-xs text-emerald-100 max-w-xl">
              Take our 5-minute neurodevelopmental diagnostic and generate your first Bilateral Family Pact.
            </p>
          </div>
          <Link href="/register" className="w-full sm:w-auto shrink-0">
            <Button
              size="lg"
              variant="pill"
              className="w-full sm:w-auto bg-white text-[#111413] hover:bg-[#F4F4F0] font-semibold gap-2 shadow-sm border-white"
            >
              Start Free Assessment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
