import { create } from 'zustand';
import {
  type ReadinessDimension,
  type ReadinessAssessmentResult,
  calculateReadinessScore,
} from '@alongside/shared';

export interface ReadinessQuestionOption {
  id: string;
  label: string;
  text: string;
  score: number; // 10, 7, 4, 1
}

export interface ReadinessQuestion {
  id: string;
  dimensionKey: ReadinessDimension;
  dimensionName: string;
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

export const CANONICAL_READINESS_QUESTIONS: ReadinessQuestion[] = [
  {
    id: 'q-executive-function',
    dimensionKey: 'executive_function',
    dimensionName: 'Executive Function & Impulse Control',
    questionText: 'When it is time to shut off a screen or transition to dinner or homework:',
    scenario: 'Stopping high-stimulation digital play and shifting focus to non-digital routines.',
    expertInsight:
      'The self-control centers of a child&apos;s brain are still actively developing. Stopping fun digital play causes a sudden shift that calls for calm, steady guidance.',
    options: [
      {
        id: 'ef-10',
        label: 'A',
        text: 'Transitions willingly within 1-2 minutes or tracks their own countdown timer without conflict.',
        score: 10,
      },
      {
        id: 'ef-7',
        label: 'B',
        text: 'Transitions after 1-2 calm reminders, occasionally asking to finish a round but complies.',
        score: 7,
      },
      {
        id: 'ef-4',
        label: 'C',
        text: 'Frequently negotiates, delays repeatedly, or needs physical parental device retrieval.',
        score: 4,
      },
      {
        id: 'ef-1',
        label: 'D',
        text: 'Consistently triggers explosive arguments, hidings of devices, or intense emotional distress.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-online-safety',
    dimensionKey: 'online_safety',
    dimensionName: 'Online Safety & Hazard Detection',
    questionText: 'If an unknown gamer or direct message offers free game currency or requests personal chat:',
    scenario: 'Encountering unsolicited strangers, phishing links, or social manipulation online.',
    expertInsight:
      'Growing tweens naturally crave connection and often mistake online friendliness for genuine friendship before learning to spot red flags.',
    options: [
      {
        id: 'os-10',
        label: 'A',
        text: 'Instantly rejects or blocks the user, refuses suspicious links, and informs a parent.',
        score: 10,
      },
      {
        id: 'os-7',
        label: 'B',
        text: 'Ignores the stranger and deletes the message, but does not always remember to tell a parent.',
        score: 7,
      },
      {
        id: 'os-4',
        label: 'C',
        text: 'Engages out of polite curiosity or FOMO before realizing potential risk.',
        score: 4,
      },
      {
        id: 'os-1',
        label: 'D',
        text: 'Prone to clicking unknown links, trusting giveaway promises, or joining private chats.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-bedtime-habits',
    dimensionKey: 'bedtime_habits',
    dimensionName: 'Bedtime Habits & Circadian Sleep Rhythm',
    questionText: 'Regarding device presence in the bedroom during sleeping hours:',
    scenario: 'Protecting uncompromised neurobiological sleep from nighttime screen stimulation.',
    expertInsight:
      'A teen&apos;s natural sleep rhythm shifts later by about two hours. Screen light and notifications right before bed interfere with restorative deep sleep.',
    options: [
      {
        id: 'bh-10',
        label: 'A',
        text: 'Naturally docks screens in a communal family charging station 60+ minutes prior to lights-out.',
        score: 10,
      },
      {
        id: 'bh-7',
        label: 'B',
        text: 'Docks screens at the agreed bedtime with a standard reminder, sleeping screen-free.',
        score: 7,
      },
      {
        id: 'bh-4',
        label: 'C',
        text: 'Asks to keep the device in the bedroom "just for music or alarm clock" and checks it late.',
        score: 4,
      },
      {
        id: 'bh-1',
        label: 'D',
        text: 'Has secretly used devices past midnight, resulting in severe morning fatigue and sleep disruption.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-peer-pressure-resilience',
    dimensionKey: 'peer_pressure_resilience',
    dimensionName: 'Peer Pressure & Group Chat Resilience',
    questionText: 'When a group chat erupts with mean roasting, spamming, or dare challenges:',
    scenario: 'Holding personal boundaries against digital herd mentality and group exclusion fear.',
    expertInsight:
      'Tweens naturally feel peer approval deeply. Being left out of group chats triggers real emotional hurt, which makes digital boundaries crucial.',
    options: [
      {
        id: 'pr-10',
        label: 'A',
        text: 'Confidently steps away, mutes noisy threads, or advocates kindly for excluded peers.',
        score: 10,
      },
      {
        id: 'pr-7',
        label: 'B',
        text: 'Silently mutes the chat or mentions it to parents, although feeling subtle FOMO.',
        score: 7,
      },
      {
        id: 'pr-4',
        label: 'C',
        text: 'Checks notifications anxiously every few minutes, afraid of being left out or mocked.',
        score: 4,
      },
      {
        id: 'pr-1',
        label: 'D',
        text: 'Joins in mocking others or follows risky group dares to protect their social standing.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-emotional-regulation',
    dimensionKey: 'emotional_regulation',
    dimensionName: 'Emotional Regulation & Gaming Frustration',
    questionText: 'When experiencing a high-stakes loss in a video game or sudden device lockout:',
    scenario: 'Navigating frustration, digital loss, and sudden stimulation removal.',
    expertInsight:
      'Emotional reactivity develops faster than calm self-regulation. Fast-paced games create excitement surges that take time to cool down.',
    options: [
      {
        id: 'er-10',
        label: 'A',
        text: 'Maintains composure, takes calming breaths, or laughs off gaming setbacks with good sportsmanship.',
        score: 10,
      },
      {
        id: 'er-7',
        label: 'B',
        text: 'Shows brief annoyance or venting, but recalibrates calmly within 5 minutes.',
        score: 7,
      },
      {
        id: 'er-4',
        label: 'C',
        text: 'Slams controllers, yells at screens, or remains irritable and withdrawn for an hour.',
        score: 4,
      },
      {
        id: 'er-1',
        label: 'D',
        text: 'Exhibits extreme fury, physical tantrums, or prolonged hostility toward siblings or parents.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-family-communication',
    dimensionKey: 'family_communication',
    dimensionName: 'Family Communication & Restorative Trust',
    questionText: 'If your child accidentally sees disturbing adult content or makes a digital mistake:',
    scenario: 'Approaching parents for help without fear of immediate punishment or device confiscation.',
    expertInsight:
      'Taking devices away in anger drives mistakes underground. Calm, curious listening keeps your child coming to you whenever something goes wrong.',
    options: [
      {
        id: 'fc-10',
        label: 'A',
        text: 'Immediately confides in parents, knowing they will be met with empathy and guidance.',
        score: 10,
      },
      {
        id: 'fc-7',
        label: 'B',
        text: 'Shares uncomfortable encounters after brief hesitation, seeking reassurance.',
        score: 7,
      },
      {
        id: 'fc-4',
        label: 'C',
        text: 'Only discloses problems if directly asked or if parents discover the incident first.',
        score: 4,
      },
      {
        id: 'fc-1',
        label: 'D',
        text: 'Actively covers up mistakes and deletes histories out of terror of losing digital privileges.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-screen-time-balance',
    dimensionKey: 'screen_time_balance',
    dimensionName: 'Screen Time Balance & Offline Passions',
    questionText: 'How naturally does your child engage in non-digital activities and physical hobbies?',
    scenario: 'Balancing screens with reading, sports, outdoor play, arts, and real-world connection.',
    expertInsight:
      'Fast-paced apps make everyday offline activities feel slower by comparison. Protecting regular offline time keeps their real-world passions alive.',
    options: [
      {
        id: 'st-10',
        label: 'A',
        text: 'Thriving offline hobbies (sports, music, books, crafts) pursued enthusiastically each day.',
        score: 10,
      },
      {
        id: 'st-7',
        label: 'B',
        text: 'Happily participates in offline passions when invited or scheduled, though prefers screens.',
        score: 7,
      },
      {
        id: 'st-4',
        label: 'C',
        text: 'Lacks enthusiasm for non-digital hobbies, complaining of constant boredom without tech.',
        score: 4,
      },
      {
        id: 'st-1',
        label: 'D',
        text: 'Refuses almost all offline recreation; mood collapses whenever screens are unavailable.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-critical-thinking',
    dimensionKey: 'critical_thinking',
    dimensionName: 'Critical Thinking & Algorithmic Skepticism',
    questionText: 'When viewing viral influencer videos, sponsored giveaways, or clickbait challenges:',
    scenario: 'Evaluating digital authenticity, commercial motives, and AI-generated content.',
    expertInsight:
      'Young minds tend to take what they see online at face value. Spotting sponsored tricks and filters is a skill parents can teach through friendly curiosity.',
    options: [
      {
        id: 'ct-10',
        label: 'A',
        text: 'Understands algorithmic incentives, questions sponsored content, and spots AI filters.',
        score: 10,
      },
      {
        id: 'ct-7',
        label: 'B',
        text: 'Recognizes obvious marketing gimmicks and asks parents when claims appear suspicious.',
        score: 7,
      },
      {
        id: 'ct-4',
        label: 'C',
        text: 'Prone to believing viral pranks, sensational claims, or misleading online challenges.',
        score: 4,
      },
      {
        id: 'ct-1',
        label: 'D',
        text: 'Accepts viral internet culture unquestioningly and attempts dangerous online stunts.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-privacy-awareness',
    dimensionKey: 'privacy_awareness',
    dimensionName: 'Privacy Awareness & Digital Footprint',
    questionText: 'Regarding safeguarding sensitive credentials, real locations, and family details:',
    scenario: 'Understanding data permanence, passwords, location sharing, and digital boundaries.',
    expertInsight:
      'Understanding that online posts last forever is an abstract idea for tweens. Simple, clear family guidelines protect their privacy while they learn.',
    options: [
      {
        id: 'pa-10',
        label: 'A',
        text: 'Rigid guardian of passwords, disables public geo-tracking, and protects private identifiers.',
        score: 10,
      },
      {
        id: 'pa-7',
        label: 'B',
        text: 'Understands privacy rules with occasional reminders to avoid broadcasting real-time location.',
        score: 7,
      },
      {
        id: 'pa-4',
        label: 'C',
        text: 'Shares passwords with friends as proof of trust or leaves location turned on unknowingly.',
        score: 4,
      },
      {
        id: 'pa-1',
        label: 'D',
        text: 'Has posted school uniforms, home addresses, or credentials publicly on social networks.',
        score: 1,
      },
    ],
  },
  {
    id: 'q-co-regulation-readiness',
    dimensionKey: 'co_regulation_readiness',
    dimensionName: 'Co-Regulation & Bilateral Collaboration',
    questionText: 'How does your child participate in creating household boundaries and family agreements?',
    scenario: 'Co-creating rules, respecting mutual commitments, and honoring digital boundaries.',
    expertInsight:
      'Wanting independence is a healthy part of growing up. Making agreements together gives them a real voice while keeping loving guardrails in place.',
    options: [
      {
        id: 'cr-10',
        label: 'A',
        text: 'Willingly collaborates on guidelines, offers realistic ideas, and honors shared pacts.',
        score: 10,
      },
      {
        id: 'cr-7',
        label: 'B',
        text: 'Cooperates constructively with household rules with occasional negotiation or reminders.',
        score: 7,
      },
      {
        id: 'cr-4',
        label: 'C',
        text: 'Views rules as arbitrary control, constantly searching for technical loopholes.',
        score: 4,
      },
      {
        id: 'cr-1',
        label: 'D',
        text: 'Vehemently rejects agreements, claiming full digital autonomy and defying all limits.',
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
    set({ childId, childName });
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

