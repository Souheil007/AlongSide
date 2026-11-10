import {
  HelpCircle,
  ShieldCheck,
  HeartPulse,
  Smartphone,
  Users,
  CheckCircle2,
  Brain,
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
      'No. While AlongSide offers the gold standard for device readiness and bilateral media pacts, it is the complete Lifespan Family OS for children ages 0 to 18. From newborn sleep foundations, safe allergen introduction, and speech milestones to tantrum co-regulation, 100% screen-free brain games, and teen youth culture, AlongSide supports every age and stage.',
    icon: Users,
  },
  {
    question: 'How does AlongSide ground its developmental guidance and courses?',
    answer:
      'AlongSide grounds every course, chapter, and advisory interaction in developmental neurobiology, established pediatric milestones (AAP Bright Futures, CDC), and collaborative parenting psychology. We translate complex science into actionable, word-for-word scripts parents can use in real-life moments.',
    icon: Brain,
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
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E3DC] bg-white px-3.5 py-1 text-xs font-semibold text-[#143D2B]">
          <span className="font-mono text-[11px] uppercase tracking-wider">
            VOL. XXIV // PARENTING FAQ
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111413] tracking-tight">
          Clear Answers for <em className="italic font-normal text-[#143D2B]">Modern Parents</em>
        </h2>
        <p className="text-base sm:text-lg text-[#494F4C] leading-relaxed">
          Everything you need to know about our developmental sources, neurobiology foundations, zero-spyware pledge, and subscription trial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FAQS.map((faq, idx) => {
          const Icon = faq.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-[10px] bg-white border border-[#E3E3DC] shadow-[0_1px_2px_rgba(17,20,19,0.04)] space-y-3 hover:border-[#111413] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-[5px] bg-[#EAF3EE] border border-[#143D2B]/20 text-[#143D2B] shrink-0 mt-0.5">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-serif font-bold text-[#111413] text-base leading-snug">
                  {faq.question}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#494F4C] leading-relaxed pl-8">
                {faq.answer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
