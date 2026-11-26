'use client';

import * as React from 'react';
import Link from 'next/link';
import { Check, Loader2, Plus } from 'lucide-react';
import { enterDemoSession } from '@/lib/api/auth';
import { trackEvent } from '@/lib/analytics/posthog';
import { cn } from '@/lib/utils';

export interface FamilyPassBillingOption {
  id: 'annual' | 'monthly';
  label: string;
  price: string;
  period: string;
  note: string;
  ctaHref: string;
}

export const FAMILY_PASS_OPTIONS: Record<'annual' | 'monthly', FamilyPassBillingOption> = {
  annual: {
    id: 'annual',
    label: 'Annual',
    price: '$79',
    period: '/ year',
    note: 'Free during early access · Regularly $79 / year ($6.58 / mo)',
    ctaHref: '/register?plan=annual',
  },
  monthly: {
    id: 'monthly',
    label: 'Monthly',
    price: '$9.99',
    period: '/ month',
    note: 'Free during early access · Regularly $9.99 / month',
    ctaHref: '/register?plan=monthly',
  },
};

export const FAMILY_PASS_INCLUSIONS: string[] = [
  'Unlimited child profiles from ages 0 to 18',
  '24/7 AI Parent Advisor & word-for-word scripts',
  'Full Parent Academy library & weekly Culture & Trends',
  'Phone readiness check & OS parental control blueprints',
];

export interface HomeFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const HOME_FAQS: HomeFaqItem[] = [
  {
    id: 'phone-only',
    question: 'Is Alongside only for kids who already have a phone?',
    answer:
      'No. Parents start as early as infancy for sleep rhythms, first foods, speech milestones, and toddler co-regulation. When devices enter the picture years later, the phone readiness check and OS parental control blueprints are already waiting.',
  },
  {
    id: 'parental-controls',
    question: 'Does Alongside support real parental controls on kids’ phones?',
    answer:
      'Yes, strongly. Kids’ devices need hard technical guardrails against adult content, strangers, and endless scrolling. Instead of selling a fragile third-party blocker, Alongside walks you step by step through built-in Apple Screen Time, Google Family Link, Roblox, YouTube, and Safe DNS, calibrated to your child’s exact age.',
  },
  {
    id: 'multiple-children',
    question: 'Does one subscription cover multiple children?',
    answer:
      'Yes. One Family Pass covers every child in your household. Switch between a toddler, a second-grader, and a teen in one tap - every lesson, script, and device blueprint adapts automatically.',
  },
  {
    id: 'non-clinical',
    question: 'Does Alongside give medical diagnoses?',
    answer:
      'No. Alongside is an educational parenting and developmental science companion. It does not replace medical care or provide clinical triage; medical decisions always stay with your pediatrician.',
  },
  {
    id: 'trial',
    question: 'Is Alongside really free right now?',
    answer:
      'Yes. Every Parent Academy course, Culture & Trends weekly videos and articles, the Parent Advisor, and all Device Safety & Parental Control blueprints are 100% free during early access with no credit card required. We will always give plenty of notice before paid Family Pass plans begin.',
  },
];

export function PricingAndFaqSection() {
  const [billing, setBilling] = React.useState<'annual' | 'monthly'>('annual');
  const [openFaqId, setOpenFaqId] = React.useState<string | null>(HOME_FAQS[0]!.id);
  const [isEnteringDemo, setIsEnteringDemo] = React.useState(false);
  const [demoError, setDemoError] = React.useState<string | null>(null);

  const plan = FAMILY_PASS_OPTIONS[billing];

  const handleEnterDemo = async () => {
    setDemoError(null);
    setIsEnteringDemo(true);
    try {
      await enterDemoSession();
      trackEvent('demo_started', { source: 'pricing' });
      window.location.replace('/dashboard');
    } catch {
      setIsEnteringDemo(false);
      setDemoError('Could not open the live demo right now. Please try again.');
    }
  };

  return (
    <section id="pricing" className="bg-[#F2F0E9] py-20 sm:py-28 lg:py-32 scroll-mt-16">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-20 items-start">
          {/* Left Column: One Unified Family Pass */}
          <div className="bg-white border border-[rgba(19,23,21,0.09)] rounded-[16px] p-6 sm:p-9 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-serif font-normal text-[28px] sm:text-[34px] leading-[1.1] tracking-[-0.02em] text-[#131715]">
                One Family Pass
              </h2>

              <div
                role="group"
                aria-label="Billing period"
                className="inline-flex bg-[#F2F0E9] p-1 rounded-[8px] gap-1"
              >
                {(['annual', 'monthly'] as const).map((period) => {
                  const pressed = billing === period;
                  return (
                    <button
                      key={period}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => setBilling(period)}
                      className={cn(
                        'min-h-[34px] px-3 rounded-[6px] text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                        pressed
                          ? 'bg-white text-[#143D2B] shadow-[0_1px_2px_rgba(19,23,21,0.08)]'
                          : 'text-[#454D49] hover:text-[#131715]'
                      )}
                    >
                      {FAMILY_PASS_OPTIONS[period].label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 tabular-nums">
                <span className="font-serif font-normal text-[46px] sm:text-[56px] leading-none tracking-[-0.03em] text-[#143D2B]">
                  Free
                </span>
                <span className="inline-flex items-baseline gap-1 text-[#69726D]">
                  <del
                    className="font-serif text-[26px] sm:text-[30px] leading-none tracking-[-0.02em] decoration-[#69726D]/75 decoration-[1.5px]"
                    aria-label={`Regular price ${plan.price} ${plan.period}`}
                  >
                    {plan.price}
                  </del>
                  <span className="text-[15px]">{plan.period}</span>
                </span>
              </div>
              <div className="grid mt-2 text-[14px] font-medium text-[#143D2B] tabular-nums">
                {(['annual', 'monthly'] as const).map((period) => {
                  const isCurrent = billing === period;
                  return (
                    <p
                      key={period}
                      aria-hidden={!isCurrent || undefined}
                      className={cn(
                        'col-start-1 row-start-1',
                        !isCurrent && 'invisible pointer-events-none select-none'
                      )}
                    >
                      {FAMILY_PASS_OPTIONS[period].note}
                    </p>
                  );
                })}
              </div>
            </div>

            <ul className="flex flex-col gap-3 pt-5 border-t border-[rgba(19,23,21,0.09)]">
              {FAMILY_PASS_INCLUSIONS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[14.5px] text-[#454D49]"
                >
                  <Check className="w-4 h-4 text-[#143D2B] shrink-0" strokeWidth={2} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 pt-1">
              <Link
                href={plan.ctaHref}
                className="inline-flex items-center justify-center w-full min-h-[48px] px-5 rounded-[8px] bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-[15px] font-medium transition-colors active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
              >
                Get free early access
              </Link>
              <button
                type="button"
                onClick={handleEnterDemo}
                disabled={isEnteringDemo}
                className="inline-flex items-center justify-center gap-2 w-full min-h-[46px] px-5 rounded-[8px] border border-[rgba(19,23,21,0.16)] bg-white hover:bg-[#F2F0E9] text-[#131715] text-[14.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2 disabled:opacity-60"
              >
                {isEnteringDemo && <Loader2 className="h-4 w-4 animate-spin text-[#143D2B]" />}
                <span>{isEnteringDemo ? 'Opening demo...' : 'Explore live demo (no signup)'}</span>
              </button>
              {demoError && (
                <p role="alert" className="text-xs text-red-700 text-center">
                  {demoError}
                </p>
              )}
              <p className="text-[13px] text-[#69726D] text-center">
                $0 during early access · No credit card required
              </p>
            </div>
          </div>

          {/* Right Column: Compact Accordion FAQ */}
          <div id="faq" className="flex flex-col gap-6 pt-1 scroll-mt-20">
            <h2 className="font-serif font-normal text-[28px] sm:text-[34px] leading-[1.1] tracking-[-0.02em] text-[#131715]">
              Common questions
            </h2>

            <div className="border-t border-[rgba(19,23,21,0.16)]">
              {HOME_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="border-b border-[rgba(19,23,21,0.16)]">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full min-h-[60px] py-4 flex items-center justify-between gap-5 text-left text-[16px] font-medium text-[#131715] hover:text-[#143D2B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                    >
                      <span>{faq.question}</span>
                      <Plus
                        className={cn(
                          'w-[18px] h-[18px] shrink-0 transition-transform duration-200',
                          isOpen ? 'rotate-45 text-[#143D2B]' : 'text-[#69726D]'
                        )}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="pb-5 text-[15px] leading-[1.6] text-[#454D49] max-w-[56ch]"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
