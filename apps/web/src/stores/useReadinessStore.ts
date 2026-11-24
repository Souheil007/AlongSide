import { create } from 'zustand';
import {
  type ReadinessDimension,
  type ReadinessAssessmentResult,
  calculateReadinessScore,
} from '@alongside/shared';

export type ReadinessChapterId = 'everyday_rhythms' | 'online_instincts' | 'trust_teamwork';

export interface ReadinessChapterMeta {
  id: ReadinessChapterId;
  title: string;
  subtitle: string;
}

export const READINESS_CHAPTERS: ReadinessChapterMeta[] = [
  {
    id: 'everyday_rhythms',
    title: 'Everyday Rhythms',
    subtitle: 'Transitions, bedtime, and offline sparks',
  },
  {
    id: 'online_instincts',
    title: 'Online Instincts',
    subtitle: 'Strangers, privacy, hype, and group chats',
  },
  {
    id: 'trust_teamwork',
    title: 'Trust & Teamwork',
    subtitle: 'Frustration, honesty, and building rules together',
  },
];

export interface ReadinessQuestionOption {
  id: string;
  label: string;
  headline: string;
  text: string;
  score: number; // 10, 7, 4, 1
}

export interface ReadinessQuestion {
  id: string;
  dimensionKey: ReadinessDimension;
  dimensionName: string;
  shortLabel: string;
  chapter: ReadinessChapterId;
  sceneTag: string;
  questionText: string;
  scenario: string;
  expertInsight: string;
  options: ReadinessQuestionOption[];
}

export interface ReadinessAnswerState {
  questionId: string;
  dimensionKey: string;
  score: number;
  maxScore: number;
  selectedOptionId: string;
}

/**
 * Replaces `{name}` placeholders cleanly with the active child's name.
 */
export function personalizeReadinessCopy(template: string, childName?: string): string {
  const safeName = childName?.trim() || 'your child';
  return template.replace(/\{name\}/g, safeName);
}

export const CANONICAL_READINESS_QUESTIONS: ReadinessQuestion[] = [
  {
    id: 'q-executive-function',
    dimensionKey: 'executive_function',
    dimensionName: 'Executive Function & Impulse Control',
    shortLabel: 'Stopping screens',
    chapter: 'everyday_rhythms',
    sceneTag: 'Dinner is on the table',
    questionText:
      'You call {name} for dinner right in the middle of a game or video. What usually happens?',
    scenario: 'Shifting gears from a high-energy screen back to everyday family life.',
    expertInsight:
      "Stopping a fun screen takes real brain brakes. A child's self-control center is still under construction, so how they handle this pause shows how much backup they still need.",
    options: [
      {
        id: 'ef-10',
        label: 'A',
        headline: 'Wraps up on their own',
        text: 'Pauses within a minute or two, or finishes the level and hands it over without a fight.',
        score: 10,
      },
      {
        id: 'ef-7',
        label: 'B',
        headline: 'Needs one calm nudge',
        text: 'Asks for "two more minutes," then puts it away once you give one steady reminder.',
        score: 7,
      },
      {
        id: 'ef-4',
        label: 'C',
        headline: 'Turns into a negotiation',
        text: 'Stalls, bargains, or waits until you walk over and take the device yourself.',
        score: 4,
      },
      {
        id: 'ef-1',
        label: 'D',
        headline: 'Big pushback almost every time',
        text: 'Shutting it off regularly sparks tears, yelling, or sneaking the screen back later.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-bedtime-habits',
    dimensionKey: 'bedtime_habits',
    dimensionName: 'Bedtime Habits & Circadian Sleep Rhythm',
    shortLabel: 'Nighttime sleep',
    chapter: 'everyday_rhythms',
    sceneTag: 'Lights out on a school night',
    questionText: 'When bedtime rolls around, where do screens usually end up?',
    scenario: 'Keeping bedrooms calm and protecting deep, restorative sleep.',
    expertInsight:
      "A growing kid's natural sleep signal shifts later with age. Even a silent phone on the nightstand keeps the brain half-awake waiting for the next ping.",
    options: [
      {
        id: 'bh-10',
        label: 'A',
        headline: 'Parks it outside the bedroom',
        text: 'Happily plugs screens into a shared family spot well before bed and winds down offline.',
        score: 10,
      },
      {
        id: 'bh-7',
        label: 'B',
        headline: 'Docks it after a reminder',
        text: 'Brings it out at bedtime when asked and sleeps screen-free through the night.',
        score: 7,
      },
      {
        id: 'bh-4',
        label: 'C',
        headline: 'Bargains to keep it nearby',
        text: 'Asks to keep it in the bedroom "just for music or an alarm" and ends up checking it late.',
        score: 4,
      },
      {
        id: 'bh-1',
        label: 'D',
        headline: 'Late-night sneaking happens',
        text: 'Has stayed up past midnight under the covers, leaving mornings groggy and rough.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-screen-time-balance',
    dimensionKey: 'screen_time_balance',
    dimensionName: 'Screen Time Balance & Offline Passions',
    shortLabel: 'Offline sparks',
    chapter: 'everyday_rhythms',
    sceneTag: 'A wide-open Saturday afternoon',
    questionText:
      'With no plans on the calendar and screens off the table, what does {name} reach for?',
    scenario: 'Holding onto offline curiosity, hobbies, and real-world play.',
    expertInsight:
      'Fast-paced apps make ordinary offline moments feel slower by comparison. Having a couple of real-world passions acts as a natural anchor against endless scrolling.',
    options: [
      {
        id: 'st-10',
        label: 'A',
        headline: 'Jumps into real-world interests',
        text: 'Gets absorbed in sports, drawing, reading, building, or hanging out with friends.',
        score: 10,
      },
      {
        id: 'st-7',
        label: 'B',
        headline: 'Enjoys offline fun once started',
        text: 'Prefers screens first, but happily gets into a game, sport, or hobby once invited.',
        score: 7,
      },
      {
        id: 'st-4',
        label: 'C',
        headline: 'Quickly hits "I am bored"',
        text: 'Paces around or asks for a screen every ten minutes when nothing is planned.',
        score: 4,
      },
      {
        id: 'st-1',
        label: 'D',
        headline: 'Everything else feels flat',
        text: 'Refuses offline ideas and their whole mood drops whenever screens are not an option.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-online-safety',
    dimensionKey: 'online_safety',
    dimensionName: 'Online Safety & Hazard Detection',
    shortLabel: 'Stranger red flags',
    chapter: 'online_instincts',
    sceneTag: 'A friendly stranger in a game',
    questionText:
      "Someone {name} doesn't know offers free in-game coins or asks to move to a private chat. What's their instinct?",
    scenario: 'Spotting friendly manipulation, giveaways, and sketchy links.',
    expertInsight:
      'Friendly strangers rarely look scary to kids. Spotting too-good-to-be-true offers is a skill they build through calm practice, not one-time warnings.',
    options: [
      {
        id: 'os-10',
        label: 'A',
        headline: 'Blocks it and tells you',
        text: 'Spots the trap right away, refuses the link or chat, and gives you a heads-up.',
        score: 10,
      },
      {
        id: 'os-7',
        label: 'B',
        headline: 'Ignores it on their own',
        text: 'Deletes the message or leaves the game, though they might forget to mention it to you.',
        score: 7,
      },
      {
        id: 'os-4',
        label: 'C',
        headline: 'Replies out of politeness',
        text: 'Chats back out of curiosity or not wanting to seem rude before noticing anything odd.',
        score: 4,
      },
      {
        id: 'os-1',
        label: 'D',
        headline: 'Likely to trust and click',
        text: 'Gets excited by giveaways, clicks unfamiliar links, or accepts private chats easily.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-privacy-awareness',
    dimensionKey: 'privacy_awareness',
    dimensionName: 'Privacy Awareness & Digital Footprint',
    shortLabel: 'Keeping info private',
    chapter: 'online_instincts',
    sceneTag: 'Setting up a profile or posting',
    questionText:
      'How careful is {name} with passwords, their real location, and personal details?',
    scenario: 'Protecting everyday privacy before a single screenshot travels far.',
    expertInsight:
      'Understanding that online posts last forever is abstract for young minds. Simple, automatic privacy habits protect them while their judgment catches up.',
    options: [
      {
        id: 'pa-10',
        label: 'A',
        headline: 'Protects details automatically',
        text: 'Keeps passwords private, turns off location sharing, and never shares school or home clues.',
        score: 10,
      },
      {
        id: 'pa-7',
        label: 'B',
        headline: 'Knows the basics with reminders',
        text: 'Follows privacy rules mostly, with an occasional check-in about location tags or bios.',
        score: 7,
      },
      {
        id: 'pa-4',
        label: 'C',
        headline: 'Shares without thinking twice',
        text: 'Trades passwords with close friends as a trust gesture or leaves location settings open.',
        score: 4,
      },
      {
        id: 'pa-1',
        label: 'D',
        headline: 'Posts personal clues openly',
        text: 'Has shared a school name, neighborhood detail, or account login where others could see.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-critical-thinking',
    dimensionKey: 'critical_thinking',
    dimensionName: 'Critical Thinking & Algorithmic Skepticism',
    shortLabel: 'Spotting hype & fakes',
    chapter: 'online_instincts',
    sceneTag: 'A viral trend hits their feed',
    questionText:
      'An influencer hypes a miracle product, prank, or wild challenge. How does {name} react?',
    scenario: 'Telling real advice apart from sponsored hype, filters, and AI.',
    expertInsight:
      'Feeds are designed to feel like advice from a cool older friend. Asking "who gets paid here?" or "could this be staged?" is modern street smarts.',
    options: [
      {
        id: 'ct-10',
        label: 'A',
        headline: 'Questions the angle',
        text: 'Spots ads, filters, and staged clips easily, and talks about why creators chase clicks.',
        score: 10,
      },
      {
        id: 'ct-7',
        label: 'B',
        headline: 'Checks in when unsure',
        text: 'Catches obvious clickbait and asks you when a claim or trend seems a little too wild.',
        score: 7,
      },
      {
        id: 'ct-4',
        label: 'C',
        headline: 'Often buys into the hype',
        text: 'Takes viral pranks, giveaways, or creator advice at face value unless you point it out.',
        score: 4,
      },
      {
        id: 'ct-1',
        label: 'D',
        headline: 'Wants to copy what goes viral',
        text: 'Believes most things online and feels drawn to copy risky stunts or trends right away.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-peer-pressure-resilience',
    dimensionKey: 'peer_pressure_resilience',
    dimensionName: 'Peer Pressure & Group Chat Resilience',
    shortLabel: 'Group chat pressure',
    chapter: 'online_instincts',
    sceneTag: 'A group chat turns mean',
    questionText:
      'Friends start piling on someone in a group chat, or daring each other to do something sketchy. What does {name} do?',
    scenario: 'Holding steady when digital herd pressure and FOMO kick in.',
    expertInsight:
      'For tweens and teens, social exclusion registers in the brain like real pain. Knowing how strongly group chats pull on them shows how much quiet coaching helps.',
    options: [
      {
        id: 'pr-10',
        label: 'A',
        headline: 'Steps back or speaks up',
        text: 'Mutes the drama, refuses to pile on, or quietly checks on the kid being left out.',
        score: 10,
      },
      {
        id: 'pr-7',
        label: 'B',
        headline: 'Stays out of it quietly',
        text: 'Mutes the thread or tells you about it, even if they still feel a tug of FOMO.',
        score: 7,
      },
      {
        id: 'pr-4',
        label: 'C',
        headline: 'Gets pulled into the stress',
        text: 'Checks every buzz anxiously, worried that stepping away will make them the next target.',
        score: 4,
      },
      {
        id: 'pr-1',
        label: 'D',
        headline: 'Goes along to fit in',
        text: 'Joins the teasing or takes risky dares just to stay on the group’s good side.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-emotional-regulation',
    dimensionKey: 'emotional_regulation',
    dimensionName: 'Emotional Regulation & Gaming Frustration',
    shortLabel: 'Handling frustration',
    chapter: 'trust_teamwork',
    sceneTag: 'A tough loss or sudden timer lock',
    questionText:
      'They lose right before winning a match, or a screen timer locks them out mid-turn. How do they bounce back?',
    scenario: 'Coming back down after fast-paced games flood the nervous system.',
    expertInsight:
      'Fast games surge adrenaline faster than young brains can cool it off. Some kids simply need a few minutes, and a calm adult nearby, for their body to settle.',
    options: [
      {
        id: 'er-10',
        label: 'A',
        headline: 'Shrugs it off fast',
        text: 'Takes a breath, laughs off the loss, and moves on to the next thing without lingering heat.',
        score: 10,
      },
      {
        id: 'er-7',
        label: 'B',
        headline: 'Vents briefly, then resets',
        text: 'Groans or gets annoyed for a couple minutes, then cools down on their own.',
        score: 7,
      },
      {
        id: 'er-4',
        label: 'C',
        headline: 'Stays heated for a while',
        text: 'Slams the controller, yells at the screen, or stays snappy for the next hour.',
        score: 4,
      },
      {
        id: 'er-1',
        label: 'D',
        headline: 'Full meltdown or blowout',
        text: 'Triggers an intense blowup aimed at siblings or you, making recovery hard for everyone.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-family-communication',
    dimensionKey: 'family_communication',
    dimensionName: 'Family Communication & Restorative Trust',
    shortLabel: 'Coming to you first',
    chapter: 'trust_teamwork',
    sceneTag: 'An "uh-oh" moment online',
    questionText:
      'If {name} accidentally clicks something scary or messes up online, what happens next?',
    scenario: 'Reaching out for help without expecting instant punishment.',
    expertInsight:
      'Kids hide mistakes when they expect instant confiscation. A calm, curious first response is the single strongest safety feature any device can have.',
    options: [
      {
        id: 'fc-10',
        label: 'A',
        headline: 'Brings it straight to you',
        text: "Shows you right away, trusting you'll stay calm and help figure out what to do.",
        score: 10,
      },
      {
        id: 'fc-7',
        label: 'B',
        headline: 'Tells you after a pause',
        text: 'Hesitates for a minute, then opens up once they see you are not going to blow up.',
        score: 7,
      },
      {
        id: 'fc-4',
        label: 'C',
        headline: 'Only shares if you ask',
        text: 'Keeps quiet unless you notice something is off or bring it up yourself.',
        score: 4,
      },
      {
        id: 'fc-1',
        label: 'D',
        headline: 'Hides it and clears history',
        text: 'Deletes tabs or covers their tracks out of fear of losing their device.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-co-regulation-readiness',
    dimensionKey: 'co_regulation_readiness',
    dimensionName: 'Co-Regulation & Bilateral Collaboration',
    shortLabel: 'Building rules together',
    chapter: 'trust_teamwork',
    sceneTag: 'Talking through house rules',
    questionText:
      'When you sit down to set household rules together, how does {name} show up?',
    scenario: 'Turning screen rules from a policing battle into a real partnership.',
    expertInsight:
      'Kids follow house rules more reliably when expectations are clear and consistent, paired with built-in OS time limits that hold the line automatically.',
    options: [
      {
        id: 'cr-10',
        label: 'A',
        headline: 'Meets you halfway',
        text: 'Brings fair ideas to the table and generally honors agreements you make together.',
        score: 10,
      },
      {
        id: 'cr-7',
        label: 'B',
        headline: 'Cooperates with gentle check-ins',
        text: 'Agrees to reasonable limits and follows them with an occasional reminder.',
        score: 7,
      },
      {
        id: 'cr-4',
        label: 'C',
        headline: 'Looks for loopholes',
        text: 'Treats house rules like a challenge to bend or work around whenever possible.',
        score: 4,
      },
      {
        id: 'cr-1',
        label: 'D',
        headline: 'Pushes back on all limits',
        text: 'Resists agreements flat-out and insists they should not have boundaries at all.',
        score: 1,
      },
    ],
  },
];

export interface ReadinessState {
  childId: string | null;
  childName: string;
  currentQuestionIndex: number;
  answers: Record<string, ReadinessAnswerState>;
  result: ReadinessAssessmentResult | null;
  isSubmitting: boolean;

  // Actions
  setChild: (childId: string, childName: string) => void;
  setAnswer: (
    dimensionKey: string,
    answer: {
      questionId: string;
      dimensionKey: string;
      score: number;
      maxScore: number;
      selectedOptionId: string;
    }
  ) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  setResult: (result: ReadinessAssessmentResult | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  computeLocalResult: () => ReadinessAssessmentResult;
  reset: () => void;
}

const initialState = {
  childId: null,
  childName: '',
  currentQuestionIndex: 0,
  answers: {},
  result: null,
  isSubmitting: false,
};

export const useReadinessStore = create<ReadinessState>((set, get) => ({
  ...initialState,

  setChild: (childId, childName) => {
    set((state) => {
      if (state.childId && state.childId !== childId) {
        return {
          childId,
          childName,
          currentQuestionIndex: 0,
          answers: {},
          result: null,
          isSubmitting: false,
        };
      }
      return { childId, childName };
    });
  },

  setAnswer: (dimensionKey, answer) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [dimensionKey]: answer,
      },
    }));
  },

  nextQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex < CANONICAL_READINESS_QUESTIONS.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  prevQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  jumpToQuestion: (index) => {
    if (index >= 0 && index < CANONICAL_READINESS_QUESTIONS.length) {
      set({ currentQuestionIndex: index });
    }
  },

  setResult: (result) => {
    set({ result });
  },

  setIsSubmitting: (isSubmitting) => {
    set({ isSubmitting });
  },

  computeLocalResult: () => {
    const { answers } = get();
    const answersList = Object.values(answers);
    const result = calculateReadinessScore(answersList);
    set({ result });
    return result;
  },

  reset: () => {
    set({
      currentQuestionIndex: 0,
      answers: {},
      result: null,
      isSubmitting: false,
    });
  },
}));
