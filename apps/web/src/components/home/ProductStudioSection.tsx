'use client';

import * as React from 'react';
import { BookOpen, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StudioTabId = 'academy' | 'digest' | 'advisor';

export interface AdvisorScenario {
  id: string;
  chipLabel: string;
  childMeta: string;
  userPrompt: string;
  whyHeading: string;
  explanation: string;
  scriptQuote: string;
}

export interface SlangItem {
  id: string;
  word: string;
  cringeLevel: number;
  definition: string;
}

export const STUDIO_ADVISOR_SCENARIOS: AdvisorScenario[] = [
  {
    id: 'tv',
    chipLabel: 'Screen cutoff (age 3)',
    childMeta: 'Leo · Age 3',
    userPrompt:
      'Leo throws things every night when we turn off the TV before dinner. How do we stop this?',
    whyHeading: 'Why it happens · Sudden stimulation drop',
    explanation:
      'Fast shows drop dopamine sharply when cut off abruptly. Pair a clear warning with a calm limit.',
    scriptQuote:
      "“You're mad the show stopped. I won't let you throw plates. Let's pick it up, then you pick the red or blue cup.”",
  },
  {
    id: 'eating',
    chipLabel: 'Picky eating (age 5)',
    childMeta: 'Chloe · Age 5',
    userPrompt:
      'Chloe refuses dinner and begs for nuggets every night. Should I make a backup meal?',
    whyHeading: 'Why it happens · Sensory caution & control',
    explanation:
      'Separate meals lock in power struggles. Serve one safe food alongside dinner and drop the pressure.',
    scriptQuote:
      "“You don't have to eat the chicken. Bread and apples are on the table, and the kitchen closes after dinner.”",
  },
  {
    id: 'gaming',
    chipLabel: 'Roblox cutoff (age 9)',
    childMeta: 'Sam · Age 9',
    userPrompt:
      'Sam explodes whenever Roblox ends for the evening. How do we make stopping calmer?',
    whyHeading: 'Why it happens · Unfinished multiplayer loop',
    explanation:
      'Online games lack natural stopping points. Pair an OS daily timer with a 5-minute landing cue.',
    scriptQuote:
      "“Tell your friends this is your last round, and dock the controller in five minutes.”",
  },
];

export const STUDIO_ACADEMY_LESSONS = [
  { title: 'Why repeating yourself louder makes kids tune you out', duration: '4 min' },
  { title: 'The 10-word reset that stops pushback before it escalates', duration: '4 min' },
  { title: 'Holding a firm boundary without losing connection', duration: '4 min' },
];

export const STUDIO_WEEKLY_DROPS = [
  {
    type: 'video' as const,
    kind: 'Video · 8 min',
    source: 'Child Mind Institute',
    title: 'Why kids say “I’m bored” after 5 minutes (and what helps)',
  },
  {
    type: 'article' as const,
    kind: 'Article · 4 min',
    source: 'HealthyChildren.org',
    title: 'What pediatric sleep studies say about school-night bedtimes',
  },
];

export const STUDIO_SLANG_ITEMS: SlangItem[] = [
  {
    id: 'crashout',
    word: 'Crashout',
    cringeLevel: 4,
    definition: 'Losing emotional control over a small frustration or game loss.',
  },
  {
    id: 'cooked',
    word: 'Cooked',
    cringeLevel: 2,
    definition: 'Doomed or overwhelmed. Often masks real school or social stress.',
  },
  {
    id: 'rizz',
    word: 'Rizz',
    cringeLevel: 3,
    definition: 'Short for charisma; harmless tween currency for social confidence.',
  },
  {
    id: 'fanum',
    word: 'Fanum tax',
    cringeLevel: 4,
    definition: "Playfully claiming a bite of a friend's or sibling's snack.",
  },
];

export const STUDIO_DINNER_QUESTIONS: string[] = [
  '“What was the funniest phrase at school this week, and why did everyone lose it?”',
  '“Which game are your friends obsessed with right now - is it actually fun or just hard to put down?”',
  '“What is one house rule you think is outdated, and what would you trade it for?”',
];

const STUDIO_TABS: Array<{ id: StudioTabId; title: string; description: string }> = [
  {
    id: 'academy',
    title: 'Parent Academy',
    description: 'Short text & audio courses for sleep, behavior, feeding, play, and screens.',
  },
  {
    id: 'digest',
    title: 'Culture & Trends',
    description: 'Weekly videos, articles, and kid trends tailored to their age.',
  },
  {
    id: 'advisor',
    title: 'Parent Advisor',
    description: 'Ask any parenting question anytime and get calm, age-tuned answers.',
  },
];

export function ProductStudioSection() {
  const [activeTab, setActiveTab] = React.useState<StudioTabId>('academy');
  const [scenarioId, setScenarioId] = React.useState<string>('tv');
  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const [slangId, setSlangId] = React.useState<string>('crashout');

  const activeScenario =
    STUDIO_ADVISOR_SCENARIOS.find((s) => s.id === scenarioId) ?? STUDIO_ADVISOR_SCENARIOS[0]!;
  const activeSlang =
    STUDIO_SLANG_ITEMS.find((s) => s.id === slangId) ?? STUDIO_SLANG_ITEMS[0]!;

  const windowTitle =
    activeTab === 'academy'
      ? 'Parent Academy'
      : activeTab === 'digest'
        ? 'Culture & Trends'
        : 'Parent Advisor';

  const windowMeta =
    activeTab === 'academy'
      ? 'Most popular · Behavior & Emotions'
      : activeTab === 'digest'
        ? 'New every Sunday · Curated by age'
        : activeScenario.childMeta;

  return (
    <section
      id="studio"
      className="relative bg-[#F2F0E9] py-16 sm:py-24 lg:py-28 scroll-mt-16"
    >
      {/* Legacy anchor compatibility */}
      <span id="pillars" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />
      <span id="stages" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />
      <span id="digest" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-5 lg:gap-8 items-end mb-9 lg:mb-12">
          <h2 className="font-serif font-normal text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.08] tracking-[-0.024em] text-[#131715] max-w-[16ch] [text-wrap:balance]">
            What&apos;s inside Alongside
          </h2>
          <p className="text-base leading-[1.55] text-[#454D49]">
            Courses, weekly videos &amp; articles, and an advisor, personalized for ages 0–18.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-8 lg:gap-14 items-start">
          {/* Left Column: 3 Generously Spaced Capability Switchers */}
          <div role="tablist" aria-label="Alongside capabilities" className="flex flex-col gap-3.5">
            {STUDIO_TABS.map((tab) => {
              const isSelected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`studio-panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'text-left px-5 py-5 rounded-[14px] border transition-colors duration-150 flex flex-col gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                    isSelected
                      ? 'bg-white border-[rgba(20,61,43,0.16)] shadow-[0_4px_14px_rgba(19,23,21,0.06)]'
                      : 'bg-transparent border-transparent hover:bg-white/60 hover:border-[rgba(19,23,21,0.08)]'
                  )}
                >
                  <span
                    className={cn(
                      'text-[17px] font-semibold',
                      isSelected ? 'text-[#143D2B]' : 'text-[#131715]'
                    )}
                  >
                    {tab.title}
                  </span>
                  <span className="text-[14.5px] leading-[1.5] text-[#454D49]">
                    {tab.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Product Window - CSS Grid stack locks height across tabs & inner toggles (0px shift) */}
          <div
            data-ui
            className="bg-white border border-[rgba(19,23,21,0.09)] rounded-[16px] overflow-hidden flex flex-col"
          >
            <div className="px-5 py-3.5 border-b border-[rgba(19,23,21,0.09)] bg-[#F6F5F0] flex items-center justify-between gap-3 text-[13px] text-[#69726D]">
              <strong className="font-semibold text-[#131715] whitespace-nowrap">{windowTitle}</strong>
              <span className="truncate text-right">{windowMeta}</span>
            </div>

            <div className="p-5 sm:p-7 grid flex-1">
              {/* Tab Panel 1: Parent Academy (Default: Universal High-Hook Course) */}
              <div
                id="studio-panel-academy"
                role={activeTab === 'academy' ? 'tabpanel' : undefined}
                aria-hidden={activeTab !== 'academy' || undefined}
                className={cn(
                  'col-start-1 row-start-1 flex flex-col justify-between gap-5',
                  activeTab !== 'academy' && 'invisible pointer-events-none select-none'
                )}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <h3 className="font-serif text-[23px] sm:text-[25px] font-normal leading-[1.2] text-[#131715]">
                      Getting them to listen without yelling
                    </h3>
                    <span className="text-[13px] text-[#69726D] tabular-nums">
                      12 min · 3 lessons
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 px-4 py-3 rounded-[10px] bg-[#F6F5F0] border border-[rgba(19,23,21,0.09)]">
                    <button
                      type="button"
                      tabIndex={activeTab === 'academy' ? 0 : -1}
                      onClick={() => setAudioPlaying((prev) => !prev)}
                      aria-pressed={audioPlaying}
                      aria-label={audioPlaying ? 'Pause audio summary' : 'Play audio summary'}
                      className="w-9 h-9 rounded-full bg-[#143D2B] hover:bg-[#0E2B1E] text-white inline-flex items-center justify-center shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
                    >
                      {audioPlaying ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <polygon points="6,4 20,12 6,20" />
                        </svg>
                      )}
                    </button>

                    <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                      <div className="flex items-center justify-between gap-2 text-[12.5px] text-[#454D49]">
                        <span className="truncate">Audio summary · Listen hands-free</span>
                        <span className="tabular-nums shrink-0">
                          {audioPlaying ? '2:34 / 4:00' : '1:32 / 4:00'}
                        </span>
                      </div>
                      <div className="h-1 bg-[rgba(19,23,21,0.14)] rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full bg-[#143D2B] rounded-full transition-all duration-300',
                            audioPlaying ? 'w-[64%]' : 'w-[38%]'
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <ul className="divide-y divide-[rgba(19,23,21,0.09)]">
                    {STUDIO_ACADEMY_LESSONS.map((lesson) => (
                      <li
                        key={lesson.title}
                        className="flex items-baseline justify-between gap-4 py-3 text-[14.5px] text-[#131715]"
                      >
                        <span>{lesson.title}</span>
                        <span className="text-[13px] text-[#69726D] tabular-nums shrink-0">
                          {lesson.duration}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12.5px] text-[#69726D]">
                  <span className="font-medium text-[#131715]">Topics inside:</span>
                  <span>Behavior</span>
                  <span aria-hidden="true">·</span>
                  <span>Sleep</span>
                  <span aria-hidden="true">·</span>
                  <span>Picky Eating</span>
                  <span aria-hidden="true">·</span>
                  <span>Play</span>
                  <span aria-hidden="true">·</span>
                  <span>Digital Life</span>
                </div>
              </div>

              {/* Tab Panel 2: Culture & Trends (Editorial Weekly Issue: Video, Article & Trend Watch) */}
              <div
                id="studio-panel-digest"
                role={activeTab === 'digest' ? 'tabpanel' : undefined}
                aria-hidden={activeTab !== 'digest' || undefined}
                className={cn(
                  'col-start-1 row-start-1 flex flex-col justify-between gap-5',
                  activeTab !== 'digest' && 'invisible pointer-events-none select-none'
                )}
              >
                {/* Top 2 Visual Cards: Featured Video + Featured Article */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STUDIO_WEEKLY_DROPS.map((drop) => (
                    <div
                      key={drop.title}
                      className="rounded-[12px] border border-[rgba(19,23,21,0.09)] bg-[#FAF9F5] p-4 flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 text-[12px] font-semibold">
                        <span
                          className={cn(
                            'inline-flex h-6 w-6 items-center justify-center rounded-full shrink-0',
                            drop.type === 'video'
                              ? 'bg-[#143D2B] text-white'
                              : 'bg-[#FEF3C7] text-[#B45309]'
                          )}
                          aria-hidden="true"
                        >
                          {drop.type === 'video' ? (
                            <Play className="h-3 w-3 fill-current ml-0.5" />
                          ) : (
                            <BookOpen className="h-3 w-3" />
                          )}
                        </span>
                        <span className={drop.type === 'video' ? 'text-[#143D2B]' : 'text-[#B45309]'}>
                          {drop.kind}
                        </span>
                      </div>

                      <p className="font-serif text-[18px] leading-[1.3] text-[#131715]">
                        {drop.title}
                      </p>

                      <span className="text-[12px] text-[#69726D]">{drop.source}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Card: Interactive Kid-Culture & Slang Watch */}
                <div className="rounded-[12px] bg-[#F6F5F0] border border-[rgba(19,23,21,0.09)] p-4 sm:p-5 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-[#143D2B]">
                      What kids are saying this week
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Sample slang terms">
                      {STUDIO_SLANG_ITEMS.map((item) => {
                        const pressed = item.id === slangId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            tabIndex={activeTab === 'digest' ? 0 : -1}
                            aria-pressed={pressed}
                            onClick={() => setSlangId(item.id)}
                            className={cn(
                              'min-h-[30px] px-2.5 rounded-[7px] border text-[12.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                              pressed
                                ? 'border-[#143D2B] text-[#143D2B] bg-white font-semibold'
                                : 'border-transparent bg-transparent text-[#454D49] hover:bg-white/75'
                            )}
                          >
                            {item.word}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid">
                    {STUDIO_SLANG_ITEMS.map((item) => {
                      const isCurrent = item.id === activeSlang.id;
                      return (
                        <div
                          key={item.id}
                          aria-hidden={!isCurrent || undefined}
                          className={cn(
                            'col-start-1 row-start-1 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2.5',
                            !isCurrent && 'invisible pointer-events-none select-none'
                          )}
                        >
                          <span className="font-serif text-[21px] text-[#131715] shrink-0">
                            {item.word}
                          </span>
                          <span className="text-[14px] leading-[1.45] text-[#454D49]">
                            {item.definition}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Tab Panel 3: Parent Advisor */}
              <div
                id="studio-panel-advisor"
                role={activeTab === 'advisor' ? 'tabpanel' : undefined}
                aria-hidden={activeTab !== 'advisor' || undefined}
                className={cn(
                  'col-start-1 row-start-1 flex flex-col justify-between gap-5',
                  activeTab !== 'advisor' && 'invisible pointer-events-none select-none'
                )}
              >
                <div className="grid">
                  {STUDIO_ADVISOR_SCENARIOS.map((scenario) => {
                    const isCurrent = scenario.id === activeScenario.id;
                    return (
                      <div
                        key={scenario.id}
                        aria-hidden={!isCurrent || undefined}
                        className={cn(
                          'col-start-1 row-start-1 flex flex-col gap-3.5',
                          !isCurrent && 'invisible pointer-events-none select-none'
                        )}
                      >
                        <div className="self-end bg-[#143D2B] text-white px-4 py-3 rounded-[12px] rounded-br-[2px] text-[14.5px] leading-[1.45] max-w-[85%]">
                          {scenario.userPrompt}
                        </div>

                        <div className="bg-[#F6F5F0] border border-[rgba(19,23,21,0.09)] rounded-[12px] p-4 sm:p-5 flex flex-col gap-2.5">
                          <div className="text-[12.5px] font-semibold text-[#143D2B]">
                            {scenario.whyHeading}
                          </div>
                          <p className="text-[14px] leading-[1.5] text-[#454D49]">
                            {scenario.explanation}
                          </p>
                          <div className="bg-white border-l-[3px] border-[#143D2B] px-3.5 py-2.5 rounded-r-[8px] font-serif text-[16px] leading-[1.45] text-[#131715]">
                            {scenario.scriptQuote}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Try another question">
                  {STUDIO_ADVISOR_SCENARIOS.map((scenario) => {
                    const pressed = scenario.id === scenarioId;
                    return (
                      <button
                        key={scenario.id}
                        type="button"
                        tabIndex={activeTab === 'advisor' ? 0 : -1}
                        aria-pressed={pressed}
                        onClick={() => setScenarioId(scenario.id)}
                        className={cn(
                          'min-h-[36px] px-3 rounded-[8px] border text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                          pressed
                            ? 'border-[#143D2B] text-[#143D2B] bg-[#E8F1EC] font-medium'
                            : 'border-[rgba(19,23,21,0.09)] bg-white text-[#454D49] hover:border-[#143D2B] hover:text-[#143D2B]'
                        )}
                      >
                        {scenario.chipLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
