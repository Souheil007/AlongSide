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
      <div className="rounded-3xl border-2 border-teal-200/90 bg-gradient-to-b from-teal-50/70 via-white to-white p-8 sm:p-12 text-center shadow-sm space-y-8">
        <div className="space-y-3 max-w-2xl mx-auto">
          <Badge variant="default" className="py-1 px-3 bg-teal-100 text-teal-800 border-teal-300">
            <Sparkles className="h-3.5 w-3.5 mr-1 text-teal-600" />
            7-Day Risk-Free Trial • All Ages Included
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Start Your Journey Toward Family Calm Today
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Get unlimited access to Pediatric Fever Triage, CDC Milestones, the Nutrition Vault,
            Brain Games, the 24/7 AI Advisor, and the Bilateral Family Pact for 7 full days.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between ${
                plan.isPopular
                  ? 'border-2 border-teal-500 bg-white shadow-md'
                  : 'border border-slate-200 bg-white shadow-xs'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-teal-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      plan.isPopular ? 'text-teal-800' : 'text-slate-500'
                    }`}
                  >
                    {plan.name}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-sm font-medium text-slate-500">{plan.period}</span>
                  </div>
                  <div className="text-xs text-teal-700 font-semibold mt-0.5">
                    {plan.subtext}
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${
                          plan.isPopular ? 'text-emerald-600' : 'text-slate-500'
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
                    variant={plan.isPopular ? 'default' : 'outline'}
                    className={`w-full font-semibold gap-2 ${
                      plan.isPopular
                        ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-sm'
                        : 'border-slate-300 text-slate-800 hover:bg-slate-50'
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500 pt-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-teal-600" /> No charge during your 7-day trial
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-teal-600" /> 1-Click instant cancellation
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-teal-600" /> Stripe 256-bit secure checkout
          </span>
        </div>
      </div>
    </section>
  );
}
