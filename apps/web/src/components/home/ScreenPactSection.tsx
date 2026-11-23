'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const SCREEN_PACT_POINTS = [
  {
    term: 'Readiness score',
    detail: 'A 5-minute 0–100 diagnostic before you buy a phone, tablet, or console.',
  },
  {
    term: 'Mutual family pact',
    detail: 'Co-signed on screen and printable for the fridge - both sides commit.',
  },
  {
    term: 'Neutral 8:30 PM lock',
    detail: 'Signed Apple and Android profiles enforce bedtime with zero chat spying.',
  },
];

export function ScreenPactSection() {
  const [dockMode, setDockMode] = React.useState<'day' | 'night'>('night');
  const isNight = dockMode === 'night';

  return (
    <section
      id="pact"
      className="relative bg-[#10251C] text-[#FAF9F5] py-20 sm:py-28 lg:py-32 scroll-mt-16"
    >
      {/* Legacy anchor compatibility */}
      <span id="devices-hub" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />
      <span id="devices" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] gap-10 lg:gap-20 items-center">
          {/* Left Column: Evening Dock Photo + Interactive Curfew Preview */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            <div className="rounded-[14px] overflow-hidden bg-[#173327] aspect-[4/3]">
              <Image
                src="/images/home/evening-dock.jpg"
                alt="Smartphone resting face-down on a walnut wooden charging tray in calm warm evening light"
                width={1200}
                height={896}
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              data-ui
              className="bg-[#173327] border border-[rgba(250,249,245,0.13)] rounded-[12px] p-4 sm:p-5 flex flex-col gap-3.5"
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2.5 text-[14px] font-medium text-[#FAF9F5] tabular-nums">
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full shrink-0 transition-colors duration-200',
                      isNight ? 'bg-[#F59E0B]' : 'bg-[#6EE7B7]'
                    )}
                    aria-hidden="true"
                  />
                  <span className="grid">
                    <span
                      aria-hidden={!isNight || undefined}
                      className={cn(
                        'col-start-1 row-start-1',
                        !isNight && 'invisible pointer-events-none select-none'
                      )}
                    >
                      8:30 PM · Bedtime dock active
                    </span>
                    <span
                      aria-hidden={isNight || undefined}
                      className={cn(
                        'col-start-1 row-start-1',
                        isNight && 'invisible pointer-events-none select-none'
                      )}
                    >
                      4:00 PM · Agreed apps open
                    </span>
                  </span>
                </div>

                <div
                  role="group"
                  aria-label="Preview curfew state"
                  className="inline-flex bg-black/25 p-[3px] rounded-[8px] gap-1"
                >
                  <button
                    type="button"
                    aria-pressed={!isNight}
                    onClick={() => setDockMode('day')}
                    className={cn(
                      'min-h-[34px] px-3 rounded-[6px] text-[12.5px] font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF9F5]',
                      !isNight
                        ? 'bg-[#FAF9F5] text-[#10251C]'
                        : 'text-[#FAF9F5]/75 hover:text-[#FAF9F5]'
                    )}
                  >
                    4:00 PM
                  </button>
                  <button
                    type="button"
                    aria-pressed={isNight}
                    onClick={() => setDockMode('night')}
                    className={cn(
                      'min-h-[34px] px-3 rounded-[6px] text-[12.5px] font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF9F5]',
                      isNight
                        ? 'bg-[#FAF9F5] text-[#10251C]'
                        : 'text-[#FAF9F5]/75 hover:text-[#FAF9F5]'
                    )}
                  >
                    8:30 PM
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[rgba(250,249,245,0.13)] text-[13px] leading-[1.45] text-[#FAF9F5]/80">
                <div>
                  <strong className="block font-medium text-[#FAF9F5] mb-0.5">
                    Parent&apos;s promise
                  </strong>
                  <span>I will never secretly read your texts or install spyware.</span>
                </div>
                <div>
                  <strong className="block font-medium text-[#FAF9F5] mb-0.5">
                    Child&apos;s promise
                  </strong>
                  <span className="grid">
                    <span
                      aria-hidden={!isNight || undefined}
                      className={cn(
                        'col-start-1 row-start-1',
                        !isNight && 'invisible pointer-events-none select-none'
                      )}
                    >
                      Apps pause automatically at 8:30 PM. Calls to parents stay open.
                    </span>
                    <span
                      aria-hidden={isNight || undefined}
                      className={cn(
                        'col-start-1 row-start-1',
                        isNight && 'invisible pointer-events-none select-none'
                      )}
                    >
                      Homework finished first, then 45 minutes of approved games and messages.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="flex flex-col gap-7 order-1 lg:order-2">
            <h2 className="font-serif font-normal text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.08] tracking-[-0.024em] text-[#FAF9F5] max-w-[15ch] [text-wrap:balance]">
              Boundaries without spyware
            </h2>

            <p className="text-[17px] leading-[1.55] text-[#FAF9F5]/80 max-w-[44ch]">
              Co-sign a bilateral family pact, then let the phone lock itself at 8:30 PM. The
              operating system holds the boundary so you stay their safe person.
            </p>

            <dl className="border-t border-[rgba(250,249,245,0.13)]">
              {SCREEN_PACT_POINTS.map((point) => (
                <div
                  key={point.term}
                  className="py-4 border-b border-[rgba(250,249,245,0.13)] grid grid-cols-1 sm:grid-cols-[175px_1fr] gap-1 sm:gap-4 items-baseline"
                >
                  <dt className="text-[15px] font-medium text-[#FAF9F5]">{point.term}</dt>
                  <dd className="text-[14.5px] leading-[1.5] text-[#FAF9F5]/75">{point.detail}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/register"
              className="inline-flex items-center justify-center min-h-[46px] px-5 rounded-[8px] bg-[#FAF9F5] hover:bg-white text-[#10251C] text-[14px] font-semibold w-fit transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF9F5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10251C]"
            >
              Take the readiness assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
