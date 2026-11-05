import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  subtext: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  isPopular?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'hero-annual',
    name: 'Annual Hero Pass',
    price: '$79',
    period: '/ year',
    badge: 'Most Popular',
    subtext: 'Just $6.58 / month • Billed annually',
    isPopular: true,
    features: [
      'All Children Included: One subscription for the whole family',
      '24/7 Barton Schmitt Pediatric Triage: Fever & symptom advice',
      '100% Screen-Free Brain Games: Daily developmental play',
      'Unlimited Bilateral Family Pacts: Vector PDF exports',
      'Sunday Youth Culture Digest: Weekly slang decoders',
    ],
    ctaLabel: 'Start 7-Day Free Trial',
    ctaHref: '/register?plan=annual',
  },
  {
    id: 'flex-monthly',
    name: 'Flex Pass',
    price: '$9.99',
    period: '/ month',
    subtext: 'Month-to-month flexibility',
    features: [
      'All 5 balanced pillars included',
      '24/7 AI Child Advisor & FAQ Vault',
      'Device Readiness Diagnostic & Pacts',
      'Cancel anytime with 1-click in account settings',
    ],
    ctaLabel: 'Start 7-Day Free Trial',
    ctaHref: '/register?plan=monthly',
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full scroll-mt-20">
      <div className="rounded-[10px] border border-[#E3E3DC] bg-white p-8 sm:p-12 text-center shadow-[0_1px_2px_rgba(17,20,19,0.04)] space-y-8">
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E3DC] bg-[#FBFBF9] px-3.5 py-1 text-xs font-semibold text-[#143D2B]">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              VOL. XXIV // FAMILY PASS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111413] tracking-tight">
            Start Your Journey Toward <em className="italic font-normal text-[#143D2B]">Family Calm</em> Today
          </h2>
          <p className="text-[#494F4C] text-base sm:text-lg leading-relaxed">
            Get unlimited access to Pediatric Fever Triage, CDC Milestones, the Nutrition Vault,
            Brain Games, the 24/7 AI Advisor, and the Bilateral Family Pact for 7 full days.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-[10px] p-6 relative overflow-hidden flex flex-col justify-between ${
                plan.isPopular
                  ? 'border-2 border-[#111413] bg-white shadow-md'
                  : 'border border-[#E3E3DC] bg-white shadow-xs'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-[#111413] text-white font-mono text-[10px] font-bold px-3 py-1 rounded-bl-[8px] uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wider ${
                      plan.isPopular ? 'text-[#143D2B]' : 'text-[#858C88]'
                    }`}
                  >
                    {plan.name}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-serif text-4xl sm:text-5xl font-black text-[#111413]">{plan.price}</span>
                    <span className="text-sm font-medium text-[#858C88] font-mono">{plan.period}</span>
                  </div>
                  <div className="text-xs text-[#143D2B] font-semibold mt-0.5 font-mono">
                    {plan.subtext}
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-[#494F4C] pt-2 border-t border-[#E3E3DC]">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${
                          plan.isPopular ? 'text-[#143D2B]' : 'text-[#858C88]'
                        }`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link href={plan.ctaHref}>
                  <Button
                    size="lg"
                    variant={plan.isPopular ? 'pill' : 'outline'}
                    className={`w-full font-bold gap-2 ${
                      plan.isPopular
                        ? 'shadow-sm'
                        : 'border-[#E3E3DC] text-[#111413] hover:border-[#111413] hover:bg-[#F4F4F0]'
                    }`}
                  >
                    {plan.ctaLabel}
                    {plan.isPopular && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#858C88] pt-2 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#143D2B]" /> No charge during your 7-day trial
          </span>
          <span className="hidden sm:inline text-[#E3E3DC]">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#143D2B]" /> 1-Click instant cancellation
          </span>
          <span className="hidden sm:inline text-[#E3E3DC]">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#143D2B]" /> Stripe 256-bit secure checkout
          </span>
        </div>
      </div>
    </section>
  );
}
