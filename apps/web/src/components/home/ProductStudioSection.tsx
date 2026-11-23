'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type StudioTabId = 'advisor' | 'academy' | 'digest';

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
    chipLabel: 'TV meltdown (age 3)',
    childMeta: 'Calibrated to Leo, age 3',
    userPrompt:
      "Leo threw his plate when I turned off the TV before dinner. I'm about to lose my cool.",
    whyHeading: 'Why this happens · Dopamine transition drop',
    explanation:
      'At 3, stopping a fast screen causes an abrupt drop in stimulation while his braking system is still immature. Lower your voice first.',
    scriptQuote:
      "“You're mad the show stopped. I won't let you throw plates. Let's pick it up together, then you can choose the red cup or the blue cup.”",
  },
  {
    id: 'eating',
    chipLabel: 'Picky dinner (age 5)',
    childMeta: 'Calibrated to Chloe, age 5',
    userPrompt:
      'Chloe says dinner is disgusting and refuses to sit at the table unless I make nuggets.',
    whyHeading: 'Why this happens · Autonomy & sensory caution',
    explanation:
      'Making a separate meal turns dinner into a power struggle. Keep one familiar food on the table and drop the pressure to taste.',
    scriptQuote:
      "“You don't have to eat the chicken. There is bread and apple slices on the table tonight, and kitchen closes after dinner.”",
  },
  {
    id: 'gaming',
    chipLabel: 'Roblox cutoff (age 9)',
    childMeta: 'Calibrated to Sam, age 9',
    userPrompt: 'Sam yelled at me when I said Roblox was over for the evening.',
    whyHeading: 'Why this happens · Unfinished social loop',
    explanation:
      'Multiplayer games lack natural chapter endings, so abrupt cutoffs feel like losing status with friends mid-round.',
    scriptQuote:
      "“I hear you're right in the middle of a match. Tell your friends this is your last round, and bring me the controller in five minutes.”",
  },
];

export const STUDIO_ACADEMY_LESSONS = [
  { title: 'Why abrupt cutoffs trigger limbic overflow', duration: '4 min' },
  { title: 'Visual timers and the 2-minute bridge ritual', duration: '4 min' },
  { title: 'Exact words when the screen goes dark', duration: '4 min' },
];

export const STUDIO_SLANG_ITEMS: SlangItem[] = [
  {
    id: 'crashout',
    word: 'Crashout',
    cringeLevel: 4,
    definition:
      'An explosive overreaction to minor friction, a game loss, or being told no. Usually means someone lost emotional control.',
  },
  {
    id: 'cooked',
    word: 'Cooked',
    cringeLevel: 2,
    definition:
      'Doomed, exhausted, or in deep trouble - often signals real academic or social stress masked as humor.',
  },
  {
    id: 'rizz',
    word: 'Rizz',
    cringeLevel: 3,
    definition:
      'Short for charisma. Effortless charm or social confidence among peers; harmless tween currency.',
  },
  {
    id: 'fanum',
    word: 'Fanum tax',
    cringeLevel: 4,
    definition:
      "Playfully claiming a bite of a friend's or sibling's snack, named after streamer Fanum.",
  },
];

export const STUDIO_DINNER_QUESTIONS: string[] = [
  '“What was the funniest phrase at school this week, and why did everyone lose it?”',
  '“Which game are your friends obsessed with right now - is it actually fun or just hard to put down?”',
  '“What is one house rule you think is outdated, and what would you trade it for?”',
];

const STUDIO_TABS: Array<{ id: StudioTabId; title: string; description: string }> = [
  {
    id: 'advisor',
    title: '10-second Parent Advisor',
    description:
      "Describe what just happened and get exact, calm words tailored to your child's age and temperament.",
  },
  {
    id: 'academy',
    title: '5-minute Parent Academy',
    description:
      'Audio and text guides across sleep, feeding, play, behavior, and devices - ordered by what hurts today.',
  },
  {
    id: 'digest',
    title: 'Sunday Culture Digest',
    description:
      'Decode trending slang, spot disguised apps early, and bring one easy question to Sunday dinner.',
  },
];

export function ProductStudioSection() {
  const [activeTab, setActiveTab] = React.useState<StudioTabId>('advisor');
  const [scenarioId, setScenarioId] = React.useState<string>('tv');
  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const [slangId, setSlangId] = React.useState<string>('crashout');
  const [dinnerIndex, setDinnerIndex] = React.useState(0);

  const activeScenario =
    STUDIO_ADVISOR_SCENARIOS.find((s) => s.id === scenarioId) ?? STUDIO_ADVISOR_SCENARIOS[0]!;
  const activeSlang =
    STUDIO_SLANG_ITEMS.find((s) => s.id === slangId) ?? STUDIO_SLANG_ITEMS[0]!;
  const activeDinnerQuestion =
    STUDIO_DINNER_QUESTIONS[dinnerIndex % STUDIO_DINNER_QUESTIONS.length]!;

  const windowTitle =
    activeTab === 'advisor'
      ? 'Parent Advisor'
      : activeTab === 'academy'
        ? 'Parent Academy'
        : 'Sunday Culture Digest';

  const windowMeta =
    activeTab === 'advisor'
      ? activeScenario.childMeta
      : activeTab === 'academy'
        ? 'Early Childhood · Digital life'
        : 'Issue · This Sunday';

  return (
    <section
      id="studio"
      className="relative bg-[#F2F0E9] py-16 sm:py-24 lg:py-32 scroll-mt-16"
    >
      {/* Legacy anchor compatibility */}
      <span id="pillars" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />
      <span id="stages" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />
      <span id="digest" className="scroll-mt-20 absolute -top-16" aria-hidden="true" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-6 lg:gap-8 items-end mb-10 lg:mb-14">
          <h2 className="font-serif font-normal text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.08] tracking-[-0.024em] text-[#131715] max-w-[17ch] [text-wrap:balance]">
            Built for the moments you cannot wait out
          </h2>
          <p className="text-base leading-[1.55] text-[#454D49]">
            Skip the 45-minute video lectures and 2 AM forum spirals. Open one calm place
            calibrated to your child&apos;s stage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-7 lg:gap-14 items-start">
          {/* Left Column: 3 Capability Mode Switchers */}
          <div>
            <div role="tablist" aria-label="Alongside capabilities" className="flex flex-col gap-2">
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
                      'text-left px-5 py-5 rounded-[12px] transition-colors duration-150 flex flex-col gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                      isSelected
                        ? 'bg-white shadow-[0_2px_10px_rgba(19,23,21,0.05)]'
                        : 'bg-transparent hover:bg-white/55'
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

            <p className="text-[13px] text-[#69726D] pt-4 px-5">
              Everything adapts automatically to each child&apos;s age profile.
            </p>
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
              {/* Tab Panel 1: Parent Advisor */}
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

                        <div className="bg-[#F6F5F0] border border-[rgba(19,23,21,0.09)] rounded-[12px] p-4 sm:p-5 flex flex-col gap-3">
                          <div className="text-[12.5px] font-semibold text-[#143D2B]">
                            {scenario.whyHeading}
                          </div>
                          <p className="text-[14.5px] leading-[1.5] text-[#454D49]">
                            {scenario.explanation}
                          </p>
                          <div className="bg-white border-l-[3px] border-[#143D2B] px-3.5 py-3 rounded-r-[8px] font-serif text-[16.5px] leading-[1.45] text-[#131715]">
                            {scenario.scriptQuote}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Try another scenario">
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

              {/* Tab Panel 2: Parent Academy */}
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
                    <h3 className="font-serif text-[24px] font-normal leading-[1.2] text-[#131715]">
                      Stopping screen transitions without tears
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
                        <span className="truncate">Audio summary · Listen while folding laundry</span>
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

                <p className="text-[13px] text-[#69726D]">
                  40 focused courses across 8 age stages - Behavior, Sleep, Nutrition, Play, and
                  Digital life.
                </p>
              </div>

              {/* Tab Panel 3: Sunday Culture Digest */}
              <div
                id="studio-panel-digest"
                role={activeTab === 'digest' ? 'tabpanel' : undefined}
                aria-hidden={activeTab !== 'digest' || undefined}
                className={cn(
                  'col-start-1 row-start-1 flex flex-col justify-between gap-5',
                  activeTab !== 'digest' && 'invisible pointer-events-none select-none'
                )}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Sample slang terms">
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
                            'min-h-[36px] px-3 rounded-[8px] border text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
                            pressed
                              ? 'border-[#143D2B] text-[#143D2B] bg-[#E8F1EC] font-medium'
                              : 'border-[rgba(19,23,21,0.09)] bg-white text-[#454D49] hover:border-[#143D2B] hover:text-[#143D2B]'
                          )}
                        >
                          {item.word}
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid">
                    {STUDIO_SLANG_ITEMS.map((item) => {
                      const isCurrent = item.id === activeSlang.id;
                      return (
                        <div
                          key={item.id}
                          aria-hidden={!isCurrent || undefined}
                          className={cn(
                            'col-start-1 row-start-1',
                            !isCurrent && 'invisible pointer-events-none select-none'
                          )}
                        >
                          <div className="flex items-baseline justify-between gap-3 flex-wrap">
                            <h3 className="font-serif text-[28px] font-normal text-[#131715]">
                              {item.word}
                            </h3>
                            <div className="inline-flex items-center gap-2 text-[13px] text-[#69726D] tabular-nums">
                              <span>Parent cringe</span>
                              <span
                                className="inline-flex gap-1"
                                aria-label={`${item.cringeLevel} out of 5`}
                              >
                                {[1, 2, 3, 4, 5].map((dot) => (
                                  <span
                                    key={dot}
                                    className={cn(
                                      'w-2 h-2 rounded-full',
                                      dot <= item.cringeLevel
                                        ? 'bg-[#B45309]'
                                        : 'bg-[rgba(19,23,21,0.16)]'
                                    )}
                                  />
                                ))}
                              </span>
                            </div>
                          </div>
                          <p className="text-[14.5px] leading-[1.55] text-[#454D49] mt-2">
                            {item.definition}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#F6F5F0] rounded-[10px] p-4 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2 text-[12.5px] text-[#69726D]">
                    <span>Sunday dinner question</span>
                    <button
                      type="button"
                      tabIndex={activeTab === 'digest' ? 0 : -1}
                      onClick={() => setDinnerIndex((prev) => prev + 1)}
                      className="min-h-[32px] px-2.5 rounded-[6px] bg-white border border-[rgba(19,23,21,0.09)] text-[12px] font-medium text-[#454D49] hover:border-[#143D2B] hover:text-[#143D2B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                    >
                      Next question
                    </button>
                  </div>
                  <div className="grid">
                    {STUDIO_DINNER_QUESTIONS.map((q, qIdx) => {
                      const isCurrent = q === activeDinnerQuestion;
                      return (
                        <p
                          key={qIdx}
                          aria-hidden={!isCurrent || undefined}
                          className={cn(
                            'col-start-1 row-start-1 font-serif text-[17px] leading-[1.45] text-[#131715]',
                            !isCurrent && 'invisible pointer-events-none select-none'
                          )}
                        >
                          {q}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
