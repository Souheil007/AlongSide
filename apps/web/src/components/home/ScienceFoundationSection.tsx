import * as React from 'react';
import Image from 'next/image';

export const SCIENCE_PRINCIPLES = [
  {
    title: 'AAP & CDC milestones',
    body: 'Calibrated across 8 continuous stages from newborn sleep to high school launch.',
  },
  {
    title: 'Neurobiology first',
    body: 'Explains the developing brain behind defiance, dopamine crashes, and teen sleep shifts.',
  },
  {
    title: 'Zero-spyware pledge',
    body: 'No keystroke logging, no private chat scraping, and COPPA Safe Harbor aligned.',
  },
  {
    title: 'Educational clarity',
    body: 'Practical everyday guidance designed alongside — never replacing — your pediatrician.',
  },
];

export function ScienceFoundationSection() {
  return (
    <section id="science" className="bg-[#FAF9F5] py-20 sm:py-28 lg:py-32 scroll-mt-16">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="font-serif font-normal text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.08] tracking-[-0.024em] text-[#131715] max-w-[17ch] [text-wrap:balance]">
              Developmental science, not&nbsp;social&nbsp;feeds
            </h2>
            <p className="text-base leading-[1.55] text-[#454D49] max-w-[44ch]">
              Built for parents who want evidence-based warmth and firm boundaries — without
              fear-mongering reels or surveillance tech.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 pt-3">
              {SCIENCE_PRINCIPLES.map((item) => (
                <div
                  key={item.title}
                  className="pt-4 border-t border-[rgba(19,23,21,0.16)] flex flex-col gap-1.5"
                >
                  <h3 className="text-[15.5px] font-semibold text-[#131715]">{item.title}</h3>
                  <p className="text-[14px] leading-[1.55] text-[#454D49]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-first lg:order-last">
            <div className="rounded-[14px] overflow-hidden bg-[#F2F0E9] aspect-[4/3]">
              <Image
                src="/images/home/sunday-table.jpg"
                alt="Family hands passing dinner bowls across a warm sunlit oak table with no phones in sight"
                width={1200}
                height={896}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-[13px] text-[#69726D]">
              Designed to protect real-world connection at the dinner table and bedtime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
