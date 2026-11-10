import {
  Stethoscope,
  Brain,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';

export interface Testimonial {
  quote: string;
  author: string;
  credentials: string;
  role: string;
  institution: string;
  icon: typeof Stethoscope;
  badge: string;
}

export const CLINICAL_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'AlongSide’s developmental sleep architecture, circadian rhythm guidance, and milestone benchmarks bring pediatric clarity directly to parents at 2:00 AM. It eliminates late-night panic with calm, evidence-based developmental understanding.',
    author: 'Dr. Sarah Jenkins, MD, FAAP',
    credentials: 'Board-Certified Pediatrician',
    role: 'Pediatric Development Specialist',
    institution: 'Children’s Health Network',
    icon: Stethoscope,
    badge: 'Pediatric Specialist',
  },
  {
    quote:
      'The HALT behavioral framework and bilateral agreements transform parental panic into calm authority. It respects prefrontal brain development instead of treating children like adversaries. Every parent needs this.',
    author: 'Dr. Marcus Vance, PhD',
    credentials: 'Child Clinical Psychologist',
    role: 'Author & Developmental Neurobiologist',
    institution: 'Family Neurodevelopment Institute',
    icon: Brain,
    badge: 'Child Psychologist',
  },
  {
    quote:
      'The milestone guidance and screen-free puppet play stimulate expressive language and mirror neurons at the exact developmental windows when children need them most. It replaces passive screen time with real connection.',
    author: 'Elena Rostova, MS, CCC-SLP',
    credentials: 'Speech-Language Pathologist',
    role: 'Early Intervention & Milestone Specialist',
    institution: 'Pediatric Communication Center',
    icon: MessageSquare,
    badge: 'Speech & Milestones',
  },
];

export function ClinicalAuthorityTestimonials() {
  return (
    <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E3DC] bg-white px-3.5 py-1 text-xs font-semibold text-[#143D2B]">
          <span className="font-mono text-[11px] uppercase tracking-wider">
            VOL. XXIV // DEVELOPMENTAL SCIENCE
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111413] tracking-tight">
          Backed by <em className="italic font-normal text-[#143D2B]">Pediatricians, Psychologists &amp; Neurobiologists</em>
        </h2>
        <p className="text-base sm:text-lg text-[#494F4C] leading-relaxed">
          Parenting advice should come from peer-reviewed developmental science, not social media influencers.
          Here is what leading pediatric and child development professionals say about AlongSide.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {CLINICAL_TESTIMONIALS.map((t, idx) => {
          const Icon = t.icon;
          return (
            <Card
              key={idx}
              className="border border-[#E3E3DC] bg-white shadow-[0_1px_2px_rgba(17,20,19,0.04)] hover:shadow-md hover:border-[#111413] transition-all flex flex-col justify-between rounded-[10px]"
            >
              <CardContent className="p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-[5px] bg-[#EAF3EE] border border-[#143D2B]/20 flex items-center justify-center text-[#143D2B] shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-[#143D2B] bg-[#EAF3EE] border border-[#143D2B]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {t.badge}
                    </span>
                  </div>

                  <p className="font-serif text-base text-[#111413] leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E3E3DC]">
                  <div className="font-bold text-[#111413] text-sm">{t.author}</div>
                  <div className="font-mono text-xs text-[#143D2B] font-semibold">{t.credentials}</div>
                  <div className="text-[11px] text-[#858C88] mt-0.5 font-mono">
                    {t.role} • {t.institution}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Institutional Trust Badges Banner */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-around gap-6 text-center">
        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
            <Award className="h-4 w-4 text-teal-700" /> Developmental Neurobiology
          </div>
          <div className="text-[11px] text-slate-500">Evidence-based cognitive and emotional science</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-700" /> CDC &amp; AAP Milestones
          </div>
          <div className="text-[11px] text-slate-500">0–18 Evidence-backed developmental norms</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-teal-700" /> Zero-Spyware Privacy Pledge
          </div>
          <div className="text-[11px] text-slate-500">Zero chat spying, keystroke logging, or location resale</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-teal-700" /> COPPA Safe Harbor Compliant
          </div>
          <div className="text-[11px] text-slate-500">Highest children&apos;s digital privacy safeguards</div>
        </div>
      </div>
    </section>
  );
}
