import {
  HelpCircle,
  ShieldCheck,
  HeartPulse,
  Smartphone,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface FaqItem {
  question: string;
  answer: string;
  icon: typeof HelpCircle;
}

export const FAQS: FaqItem[] = [
  {
    question: 'Is AlongSide only for parents thinking about buying a phone or screen?',
    answer:
      'No. While AlongSide offers the gold standard for device readiness and bilateral media pacts, it is the complete Lifespan Family OS for children ages 0 to 18. From 2:00 AM pediatric fever triage, safe allergen introduction, and speech milestones to tantrum co-regulation, 100% screen-free brain games, and teen youth culture, AlongSide supports every age and stage.',
    icon: Users,
  },
  {
    question: 'What are the Barton Schmitt pediatric triage protocols?',
    answer:
      'Dr. Barton Schmitt, MD, FAAP, authored the clinical decision protocols utilized by over 95% of pediatric practices and children’s hospitals in the United States. AlongSide’s health companion translates these clinical algorithms into a calm 3-zone guide (Green: Home Care, Yellow: Call Pediatrician, Red: Urgent Emergency) so you never have to panic at 2:00 AM.',
    icon: HeartPulse,
  },
  {
    question: 'Does AlongSide install spyware or read my child’s private text messages?',
    answer:
      'Never. AlongSide is strictly built on our Zero-Spyware Privacy Pledge. We believe covert surveillance breeds evasion, distrust, and hostility. Instead, we use transparent bilateral agreements co-signed by parent and child, paired with neutral cryptographic device profiles that lock screens at 8:30 PM. The phone locks itself; your relationship remains loving and safe.',
    icon: ShieldCheck,
  },
  {
    question: 'How does the "Thinking About Buying a Device?" Action Hub work?',
    answer:
      'When you are considering an iPad, Nintendo Switch, smartwatch, or smartphone for your child, the Action Hub provides: 1) An objective First-Phone Readiness Assessment (Score 0–100) evaluating impulse control and responsibility; 2) The Bilateral Family Pact-as-Code wizard to co-create shared values; and 3) Automated bedtime hardware profiles that end bedtime yelling.',
    icon: Smartphone,
  },
  {
    question: 'Can I use AlongSide for multiple children across different ages?',
    answer:
      'Yes! The AlongSide Annual Hero Pass includes all children in your household under one subscription. You can seamlessly switch between an infant (14 months), an early elementary child (7 years), and a teenager (15 years), with personalized milestones, feeding guides, and advice for each child.',
    icon: Users,
  },
  {
    question: 'How does the 7-day risk-free trial work?',
    answer:
      'You receive full, unrestricted access to all 5 pillars of AlongSide for 7 days. Your card will not be charged until the trial ends. If AlongSide is not the right fit for your family, you can cancel with a single click inside your account settings at any time without talking to a representative.',
    icon: CheckCircle2,
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <Badge variant="outline" className="text-xs uppercase tracking-wider text-slate-600 bg-slate-50 border-slate-300">
          Frequently Asked Questions
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Clear Answers for Modern Parents
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Everything you need to know about our clinical sources, pediatric protocols, zero-spyware pledge, and subscription trial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FAQS.map((faq, idx) => {
          const Icon = faq.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:border-teal-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 shrink-0 mt-0.5">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {faq.question}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                {faq.answer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
