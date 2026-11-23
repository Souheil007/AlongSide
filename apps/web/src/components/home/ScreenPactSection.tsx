'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SCREEN_PACT_POINTS = [
  {
    term: '1. Check readiness',
    detail: '2-minute score: ready for a phone, or wait?',
  },
  {
    term: '2. Pick their device',
    detail: 'iPhone, Android, game & video apps, or Home Wi-Fi.',
  },
  {
    term: '3. Flip the locks',
    detail: 'Exact taps for app approvals, stranger blocks, and bedtime lock.',
  },
];

type PreviewOsId = 'phones' | 'apps';

const OS_PREVIEWS: Record<
  PreviewOsId,
  {
    tabLabel: string;
    status: string;
    checks: string[];
  }
> = {
  phones: {
    tabLabel: 'iPhone & Android',
    status: 'Apple Screen Time & Google Family Link',
    checks: [
      'Approve every app download & lock contacts',
      'Auto-lock for bedtime (8:30 PM) & school hours',
      'Filter unsafe websites & block bypasses',
    ],
  },
  apps: {
    tabLabel: 'Apps & Home Wi-Fi',
    status: 'Games, Video & Home Network',
    checks: [
      'Lock game chat, voice & spending (Roblox & more)',
      'Cap short-form feeds & autoplay (YouTube)',
      'Filter unsafe sites on consoles & TVs (Safe DNS)',
    ],
  },
};

export function ScreenPactSection() {
  const [selectedOs, setSelectedOs] = React.useState<PreviewOsId>('phones');
  const osOrder: PreviewOsId[] = ['phones', 'apps'];

  return (
    <section
      id="device-safety"
      className="relative bg-[#10251C] text-[#FAF9F5] py-20 sm:py-28 lg:py-32 scroll-mt-16"
    >
      {/* Legacy anchor compatibility */}
      <span id="pact" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />
      <span id="devices-hub" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />
      <span id="devices" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] gap-10 lg:gap-20 items-center">
          {/* Left Column: Evening Dock Photo + Clean Single-Line OS Controls Preview */}
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
              className="bg-[#173327] border border-[rgba(250,249,245,0.13)] rounded-[12px] p-4 sm:p-5 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2 text-[13.5px] font-medium text-[#FAF9F5]">
                  <span className="w-2 h-2 rounded-full bg-[#6EE7B7] shrink-0" aria-hidden="true" />
                  <span className="grid">
                    {osOrder.map((osId) => {
                      const isCurrent = osId === selectedOs;
                      return (
                        <span
                          key={osId}
                          aria-hidden={!isCurrent || undefined}
                          className={cn(
                            'col-start-1 row-start-1',
                            !isCurrent && 'invisible pointer-events-none select-none'
                          )}
                        >
                          {OS_PREVIEWS[osId].status}
                        </span>
                      );
                    })}
                  </span>
                </div>

                <div
                  role="tablist"
                  aria-label="Preview parental controls by platform"
                  className="inline-flex bg-black/25 p-[3px] rounded-[8px] gap-1"
                >
                  {osOrder.map((osId) => {
                    const isSelected = osId === selectedOs;
                    return (
                      <button
                        key={osId}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedOs(osId)}
                        className={cn(
                          'min-h-[34px] px-3 rounded-[6px] text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF9F5]',
                          isSelected
                            ? 'bg-[#FAF9F5] text-[#10251C]'
                            : 'text-[#FAF9F5]/75 hover:text-[#FAF9F5]'
                        )}
                      >
                        {OS_PREVIEWS[osId].tabLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid pt-3.5 border-t border-[rgba(250,249,245,0.13)]">
                {osOrder.map((osId) => {
                  const isCurrent = osId === selectedOs;
                  return (
                    <ul
                      key={osId}
                      aria-hidden={!isCurrent || undefined}
                      className={cn(
                        'col-start-1 row-start-1 flex flex-col gap-2.5 text-[14px] leading-[1.4] text-[#FAF9F5]/90',
                        !isCurrent && 'invisible pointer-events-none select-none'
                      )}
                    >
                      {OS_PREVIEWS[osId].checks.map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <Check
                            className="h-4 w-4 text-[#6EE7B7] shrink-0"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Direct, Hooking Editorial Narrative */}
          <div className="flex flex-col gap-7 order-1 lg:order-2">
            <h2 className="font-serif font-normal text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.06] tracking-[-0.024em] text-[#FAF9F5] max-w-[14ch] [text-wrap:balance]">
              Lock down their phone in 5&nbsp;minutes
            </h2>

            <p className="text-[17px] leading-[1.55] text-[#FAF9F5]/80 max-w-[42ch]">
              We walk you through the exact built-in Apple and Google switches, plus a 2-minute
              phone readiness check.
            </p>

            <dl className="border-t border-[rgba(250,249,245,0.13)]">
              {SCREEN_PACT_POINTS.map((point) => (
                <div
                  key={point.term}
                  className="py-4 border-b border-[rgba(250,249,245,0.13)] grid grid-cols-1 sm:grid-cols-[155px_1fr] gap-1 sm:gap-4 items-baseline"
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
              Set up your child&apos;s devices
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
