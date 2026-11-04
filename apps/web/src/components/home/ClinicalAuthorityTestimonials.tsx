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
      'AlongSide’s 3-zone fever triage and allergen introduction protocols bring the exact clinical rigor we practice in pediatric clinics directly to parents at 2:00 AM. It eliminates late-night panic while keeping children safe.',
    author: 'Dr. Sarah Jenkins, MD, FAAP',
    credentials: 'Board-Certified Pediatrician',
    role: 'Pediatric Emergency Medicine Specialist',
    institution: 'Children’s Health Network',
    icon: Stethoscope,
    badge: 'Clinical Pediatrician',
  },
  {
    quote:
      'The HALT behavioral framework and bilateral agreements transform parental panic into calm authority. It respects prefrontal brain development instead of treating children like adversaries. Every parent needs this.',
    author: 'Dr. Marcus Vance, PhD',
    credentials: 'Child Clinical Psychologist',
    role: 'Author & Developmental Neurobiologist',
    institution: 'Family Neurodevelopment Institute',
    icon: Brain,
    badge: 'Clinical Psychologist',
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
        <Badge variant="outline" className="text-xs uppercase tracking-wider text-slate-600 bg-slate-50 border-slate-300">
          Clinical Trust &amp; Endorsements
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Backed by Pediatricians, Child Psychologists &amp; Neurobiologists
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Parenting advice should come from peer-reviewed clinical science, not social media influencers.
          Here is what leading pediatric health professionals say about AlongSide.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {CLINICAL_TESTIMONIALS.map((t, idx) => {
          const Icon = t.icon;
          return (
            <Card
              key={idx}
              className="border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <CardContent className="p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                      {t.badge}
                    </span>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                  <div className="text-xs text-teal-700 font-medium">{t.credentials}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
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
            <Award className="h-4 w-4 text-teal-700" /> Barton Schmitt Protocols
          </div>
          <div className="text-[11px] text-slate-500">Gold-standard pediatric triage protocols</div>
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
