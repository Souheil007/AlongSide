'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type AgeBandId = '0-3' | '4-6' | '7-9' | '10-12' | '13-18';

export interface AgeMomentPreview {
  id: AgeBandId;
  label: string;
  child: string;
  tag: string;
  momentTitle: string;
  brainNote: string;
  script: string;
  pairedGuide: string;
  readTime: string;
}

export const HERO_AGE_MOMENTS: AgeMomentPreview[] = [
  {
    id: '0-3',
    label: '0–3',
    child: 'Leo, 22 months',
    tag: 'Co-regulation',
    momentTitle: '“Full-body meltdown when shoes go on”',
    brainNote:
      "What's driving it: pre-verbal frustration plus an immature braking system. Lend your calm first.",
    script:
      "“You really want to stay playing. Putting on shoes feels frustrating. I'm right here — red sneakers or blue boots?”",
    pairedGuide: 'Paired guide: Toddler nervous system resets',
    readTime: '4 min read',
  },
  {
    id: '4-6',
    label: '4–6',
    child: 'Chloe, age 5',
    tag: 'Mealtime calm',
    momentTitle: '“Refusing everything on the plate except bread”',
    brainNote:
      "What's driving it: developmental food neophobia peaks at 4–5. Pressure turns curiosity into resistance.",
    script:
      "“You don't have to eat the broccoli tonight. It can just sit next to your pasta while you decide.”",
    pairedGuide: 'Paired guide: Division of Responsibility at dinner',
    readTime: '5 min read',
  },
  {
    id: '7-9',
    label: '7–9',
    child: 'Sam, age 8',
    tag: 'Screen transition',
    momentTitle: '“Slamming the iPad shut when Roblox time ends”',
    brainNote:
      "What's driving it: variable-reward gaming loops make sudden cutoffs feel physically jarring.",
    script:
      "“I see you're mid-build. Show me your base for 60 seconds, then we'll park the tablet together.”",
    pairedGuide: 'Paired guide: Dopamine loops & smooth landings',
    readTime: '4 min read',
  },
  {
    id: '10-12',
    label: '10–12',
    child: 'Maya, age 11',
    tag: 'Readiness 84/100',
    momentTitle: '“Everyone in 5th grade has an iPhone except me”',
    brainNote:
      "What's driving it: peer belonging feels urgent at 11. Validate the feeling before setting the boundary.",
    script:
      "“It stinks feeling left out of the group chat. Let's look at the readiness checklist together so you know the exact steps to your first phone.”",
    pairedGuide: 'Paired guide: First-phone bilateral pact',
    readTime: '4 min read',
  },
  {
    id: '13-18',
    label: '13–18',
    child: 'Noah, age 15',
    tag: 'Circadian shift',
    momentTitle: '“Still scrolling at 12:30 AM before a school day”',
    brainNote:
      "What's driving it: puberty shifts melatonin release 2 hours later, and infinite feeds hijack wind-down.",
    script:
      "“I know your brain isn't sleepy at 9 anymore. Let's agree on a realistic charging dock time that still protects tomorrow morning.”",
    pairedGuide: 'Paired guide: Teen sleep & algorithmic feeds',
    readTime: '5 min read',
  },
];

export function HeroSection() {
  const [selectedAge, setSelectedAge] = React.useState<AgeBandId>('4-6');
  const [copied, setCopied] = React.useState(false);
  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const activeMoment =
    HERO_AGE_MOMENTS.find((m) => m.id === selectedAge) ?? HERO_AGE_MOMENTS[1]!;

  const handleSelectAge = (id: AgeBandId) => {
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    setSelectedAge(id);
    setCopied(false);
  };

  const handleAgeKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = HERO_AGE_MOMENTS[(idx + 1) % HERO_AGE_MOMENTS.length]!;
      handleSelectAge(next.id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev =
        HERO_AGE_MOMENTS[(idx - 1 + HERO_AGE_MOMENTS.length) % HERO_AGE_MOMENTS.length]!;
      handleSelectAge(prev.id);
    }
  };

  const handleCopyScript = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(activeMoment.script);
      }
    } catch {
      // Clipboard may be unavailable in restricted contexts
    }
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    setCopied(true);
    copyTimerRef.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      id="top"
      className="bg-[#FAF9F5] pt-11 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] gap-10 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline + Interactive Age Lens */}
          <div className="flex flex-col gap-6">
            <h1 className="font-serif font-normal text-[40px] sm:text-[54px] lg:text-[64px] leading-[1.04] tracking-[-0.028em] text-[#131715] max-w-[15.5ch] [text-wrap:balance]">
              Calm guidance for every&nbsp;age,&nbsp;0–18
            </h1>

            <p className="text-base sm:text-[18px] leading-[1.55] text-[#454D49] max-w-[42ch]">
              Exact words for hard moments, 5-minute developmental guides, and family screen pacts
              built on trust — never spyware.
            </p>

            {/* Interactive Age Selector */}
            <div className="flex flex-col gap-2.5 pt-1">
              <span id="hero-age-label" className="text-[13px] font-medium text-[#69726D]">
                Pick your child&apos;s age to preview tonight&apos;s guidance
              </span>
              <div
                role="tablist"
                aria-labelledby="hero-age-label"
                className="inline-flex flex-wrap gap-1.5 p-1 bg-[#F2F0E9] rounded-[10px] w-fit max-w-full"
              >
                {HERO_AGE_MOMENTS.map((item, idx) => {
                  const isSelected = item.id === selectedAge;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => handleSelectAge(item.id)}
                      onKeyDown={(e) => handleAgeKeyDown(e, idx)}
                      className={cn(
                        'min-h-[40px] px-3.5 rounded-[7px] text-[13.5px] font-medium tabular-nums transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                        isSelected
                          ? 'bg-white text-[#143D2B] shadow-[0_1px_2px_rgba(19,23,21,0.08)]'
                          : 'text-[#454D49] hover:text-[#131715]'
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary CTA + Quiet Secondary Link */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <Link
                href="/register"
                className="inline-flex items-center justify-center min-h-[46px] px-5 rounded-[8px] bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-[14px] font-medium transition-colors duration-150 active:scale-[0.98] w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
              >
                Start 7-day free trial
              </Link>
              <a
                href="#studio"
                className="inline-flex items-center min-h-[44px] px-1 text-[14px] font-medium text-[#131715] border-b border-[rgba(19,23,21,0.18)] hover:border-[#143D2B] hover:text-[#143D2B] transition-colors duration-150"
              >
                See what&apos;s inside
              </a>
            </div>

            {/* Single Quiet Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#69726D]">
              <span>All children</span>
              <span className="text-[#143D2B]/35 select-none" aria-hidden="true">
                ·
              </span>
              <span>Zero spyware</span>
              <span className="text-[#143D2B]/35 select-none" aria-hidden="true">
                ·
              </span>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Right Column: Editorial Photography + Tactile Live Product Card */}
          <div className="relative pb-3">
            <div className="rounded-[14px] overflow-hidden bg-[#F2F0E9] aspect-[4/3] relative">
              <Image
                src="/images/home/hero-sanctuary.jpg"
                alt="Parent and child sitting side by side at a sunlit oak table sketching together"
                width={1200}
                height={896}
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="w-full h-full object-cover object-[center_22%]"
              />
            </div>

            {/* Live Calibrated Script Card */}
            <div
              data-ui
              aria-live="polite"
              className="relative -mt-8 sm:-mt-10 sm:mx-5 bg-white border border-[rgba(19,23,21,0.09)] rounded-[14px] p-4 sm:p-5 shadow-[0_16px_40px_rgba(19,23,21,0.09)]"
            >
              <div className="flex items-center justify-between gap-3 pb-3 mb-3.5 border-b border-[rgba(19,23,21,0.09)]">
                <div className="flex items-center gap-2.5 text-[13px] font-semibold text-[#131715]">
                  <span
                    className="w-[7px] h-[7px] rounded-full bg-[#143D2B] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{activeMoment.child}</span>
                </div>
                <span className="text-[12px] font-medium text-[#143D2B] tabular-nums">
                  {activeMoment.tag}
                </span>
              </div>

              <div className="text-[15px] font-semibold text-[#131715] mb-1.5">
                {activeMoment.momentTitle}
              </div>
              <p className="text-[13.5px] leading-[1.5] text-[#454D49] mb-3.5">
                {activeMoment.brainNote}
              </p>

              <div className="bg-[#E8F1EC] rounded-[8px] px-3.5 py-3 flex items-start justify-between gap-3">
                <p className="font-serif text-[16px] leading-[1.45] text-[#131715]">
                  {activeMoment.script}
                </p>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="shrink-0 min-h-[32px] px-2.5 rounded-[6px] bg-white border border-[rgba(19,23,21,0.09)] text-[12px] font-medium text-[#454D49] hover:border-[#143D2B] hover:text-[#143D2B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-[12.5px] text-[#69726D] tabular-nums">
                <span>{activeMoment.pairedGuide}</span>
                <span className="shrink-0">{activeMoment.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
