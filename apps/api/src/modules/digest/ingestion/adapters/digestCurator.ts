import { z } from 'zod';
import {
  CANONICAL_DIGEST_TIERS,
  DevelopmentalTier,
  isSlangEligibleTier,
  resolveDigestTierBucket,
  type CanonicalDigestTier,
  type VideoJumpChip,
} from '@alongside/shared';
import type {
  LoggerLike,
  MultiProviderLlmOrchestrator,
} from '../../../ai-advisor/adapters/llm-orchestrator.js';
import type { RawBlogCandidate } from './blogFeedFetcher.js';
import type { RawVideoCandidate } from './youtubeFeedFetcher.js';

export const ALLOWED_DIGEST_TOPIC_LABELS = [
  'Media & Tech',
  'Sleep & Routines',
  'Social & Peers',
  'Play & Learning',
  'School & Focus',
  'Family Communication',
] as const;

export type DigestTopicLabel = (typeof ALLOWED_DIGEST_TOPIC_LABELS)[number];

export interface CuratedBlogDraft {
  canonicalHash: string;
  sourceUrl: string;
  sourceName: string;
  sourceDomain: string;
  authorName: string | null;
  imageUrl: string | null;
  publishedAt: Date;
  topicLabel: DigestTopicLabel;
  readMinutes: number;
  title: string;
  summary: string;
  keyShift: string;
  perspectiveNote: string | null;
  sourcesText: string;
  targetTiers: CanonicalDigestTier[];
  authorityWeight: 1 | 2 | 3;
  approved: boolean;
  rejectionReason?: string;
}

export interface CuratedVideoDraft {
  youtubeVideoId: string;
  videoUrl: string;
  title: string;
  presenter: string;
  channelName: string;
  channelId: string | null;
  publishedAt: Date;
  durationMinutes: number;
  formatLabel: string;
  takeaway: string;
  jumpChips: VideoJumpChip[];
  skimBullets: string[];
  targetTiers: CanonicalDigestTier[];
  isEmbeddable: boolean;
  approved: boolean;
  rejectionReason?: string;
}

export interface DinnerPromptDraft {
  question: string;
  parentTip: string;
  followUp: string;
  targetTiers: CanonicalDigestTier[];
  sortOrder: number;
}

export interface PhraseDraft {
  word: string;
  shortMeaning: string;
  fullMeaning: string;
  cringeLevel: number;
  cringeLabel: string;
  calmScript: string;
  targetTiers: CanonicalDigestTier[];
  sortOrder: number;
}

export interface SynthesizeWeeklyExtrasParams {
  weekStart: Date;
  weekEnd: Date;
  tier: CanonicalDigestTier;
  articles: CuratedBlogDraft[];
  videos: CuratedVideoDraft[];
}

export interface DigestContentCurator {
  curateArticles(candidates: RawBlogCandidate[]): Promise<CuratedBlogDraft[]>;
  curateVideos(candidates: RawVideoCandidate[]): Promise<CuratedVideoDraft[]>;
  synthesizeWeeklyExtras(
    params: SynthesizeWeeklyExtrasParams
  ): Promise<{ dinnerPrompts: DinnerPromptDraft[]; phrases: PhraseDraft[] }>;
}

const ALARMIST_OR_ADVERTORIAL_PATTERNS: readonly RegExp[] = [
  /\b(?:sponsored|advertorial|paid\s+partnership|partner\s+content|promo\s+code|giveaway|affiliate\s+deals?)\b/i,
  /\b(?:you\s+won['’]t\s+believe|shocking\s+truth|terrifying\s+new|destroying\s+(?:your\s+)?(?:kids|children|teens)|ruining\s+a\s+generation)\b/i,
  /\b(?:doctors\s+don['’]t\s+want\s+you\s+to\s+know|panic\s+now|crisis\s+alert\s+for\s+every\s+parent|buy\s+now\s+\d+%\s+off)\b/i,
];

function detectEditorialRejectionReason(title: string, excerpt: string): string | null {
  const combined = `${title} ${excerpt}`;
  for (const pattern of ALARMIST_OR_ADVERTORIAL_PATTERNS) {
    if (pattern.test(combined)) {
      return 'Rejected by Parent Calm editorial filter (sensationalist, alarmist, or advertorial signal).';
    }
  }
  return null;
}

function inferTopicLabel(text: string, fallback?: string): DigestTopicLabel {
  const normalizedFallback = ALLOWED_DIGEST_TOPIC_LABELS.find(
    (label) => label.toLowerCase() === fallback?.trim().toLowerCase()
  );

  const lower = text.toLowerCase();
  if (
    /\b(?:screen|phone|smartphone|social\s+media|tiktok|youtube|roblox|minecraft|video\s+game|gaming|discord|ai\b|algorithm|device|app\b|online|digital|group\s+chat)\b/.test(
      lower
    )
  ) {
    return 'Media & Tech';
  }
  if (
    /\b(?:sleep|bedtime|circadian|melatonin|nap|morning\s+routine|mealtime|feeding|nutrition|diet|picky\s+eat|routine)\b/.test(
      lower
    )
  ) {
    return 'Sleep & Routines';
  }
  if (
    /\b(?:friend|peer|bully|social|recess|clique|belonging|exclusion|comparison|drama|sibling)\b/.test(
      lower
    )
  ) {
    return 'Social & Peers';
  }
  if (
    /\b(?:school|homework|adhd|focus|executive\s+function|study|reading|math|teacher|classroom|perfectionism|burnout|grade|college)\b/.test(
      lower
    )
  ) {
    return 'School & Focus';
  }
  if (
    /\b(?:play|sensory|toddler|infant|baby|serve[- ]and[- ]return|curiosity|imaginative|pretend|motor|toy|creative|preschool)\b/.test(
      lower
    )
  ) {
    return 'Play & Learning';
  }

  return normalizedFallback ?? 'Family Communication';
}

function inferCanonicalTiers(
  text: string,
  defaultTiers: readonly CanonicalDigestTier[]
): CanonicalDigestTier[] {
  const lower = text.toLowerCase();
  const matched: CanonicalDigestTier[] = [];

  if (/\b(?:infant|newborn|baby|babies|toddler|12[- ]24\s*m|18[- ]month|two[- ]year|ages?\s*0)\b/.test(lower)) {
    matched.push(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
  }
  if (/\b(?:preschool|kindergarten|four[- ]year|five[- ]year|ages?\s*4|early\s+childhood)\b/.test(lower)) {
    matched.push(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
  }
  if (/\b(?:elementary|third\s+grade|second\s+grade|seven[- ]year|eight[- ]year|nine[- ]year|ages?\s*7|recess)\b/.test(lower)) {
    matched.push(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
  }
  if (/\b(?:tween|pre[- ]?teen|middle\s+school|first\s+phone|eleven[- ]year|ten[- ]year|ages?\s*10|fifth\s+grade|sixth\s+grade)\b/.test(lower)) {
    matched.push(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
  }
  if (/\b(?:early\s+adolescen|eighth\s+grade|fourteen[- ]year|thirteen[- ]year|fifteen[- ]year|ages?\s*13|puberty|circadian|teen(?:s|ager)?)\b/.test(lower)) {
    matched.push(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
  }
  if (/\b(?:high\s+school|sixteen[- ]year|seventeen[- ]year|eighteen[- ]year|college|senior\s+year|driving|late\s+adolescen|ages?\s*16)\b/.test(lower)) {
    matched.push(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
  }

  // Prefer intersection with source defaultTiers when available to keep mapping grounded
  const defaultSet = new Set<CanonicalDigestTier>(
    defaultTiers.map((t) => resolveDigestTierBucket(t))
  );
  const grounded = matched.filter((t) => defaultSet.has(t));
  if (grounded.length > 0) {
    return Array.from(new Set(grounded)).slice(0, 2);
  }
  if (matched.length > 0) {
    return Array.from(new Set(matched)).slice(0, 2);
  }
  if (defaultSet.size > 0) {
    return Array.from(defaultSet).slice(0, 2);
  }
  return [DevelopmentalTier.TIER_3_PRE_TEEN_10_12];
}

function clampSentence(text: string, maxChars: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxChars) return clean;
  const cut = clean.slice(0, maxChars - 1);
  const spaceIdx = cut.lastIndexOf(' ');
  return `${(spaceIdx > maxChars * 0.6 ? cut.slice(0, spaceIdx) : cut).trimEnd()}…`;
}

function estimateReadMinutes(title: string, excerpt: string): number {
  const words = `${title} ${excerpt}`.trim().split(/\s+/).length;
  return Math.max(2, Math.min(7, Math.ceil(words / 25) + 1));
}

function inferVideoFormatLabel(durationMinutes: number, title: string): string {
  const lower = title.toLowerCase();
  if (/\b(?:interview|conversation|podcast|q&a)\b/.test(lower)) {
    return 'Expert Q&A';
  }
  if (durationMinutes < 12) {
    return 'Quick Briefing';
  }
  if (durationMinutes <= 25) {
    return 'Parent Talk';
  }
  return 'Deep-Dive Lecture';
}

function buildCalmBlogSummary(candidate: RawBlogCandidate, topicLabel: DigestTopicLabel): string {
  const cleanSnippet = clampSentence(candidate.rssExcerpt, 220);
  if (cleanSnippet && cleanSnippet.toLowerCase() !== candidate.title.toLowerCase()) {
    const ending = /[.!?…]$/.test(cleanSnippet) ? cleanSnippet : `${cleanSnippet}.`;
    return `${ending} Published by ${candidate.sourceName} with practical ${topicLabel.toLowerCase()} guidance for calmer home routines.`;
  }
  return `${candidate.sourceName} shares evidence-based ${topicLabel.toLowerCase()} guidance on "${clampSentence(candidate.title, 110)}". Read the original publisher briefing for grounded, practical steps you can adapt at home.`;
}

function buildCalmKeyShift(topicLabel: DigestTopicLabel): string {
  switch (topicLabel) {
    case 'Media & Tech':
      return 'Replace reactive policing with predictable, co-created household norms and curious check-ins.';
    case 'Sleep & Routines':
      return 'Let steady environmental cues and shared schedules carry the boundary instead of nightly negotiation.';
    case 'Social & Peers':
      return 'Lead with warm listening and open questions before jumping in to fix peer friction.';
    case 'Play & Learning':
      return 'Protect short, unhurried pockets of self-directed play that naturally build brain flexibility.';
    case 'School & Focus':
      return 'Support the underlying executive-function skill with visual structure rather than repeating verbal reminders.';
    case 'Family Communication':
    default:
      return 'Connect calmly before correcting so your child’s nervous system stays open to collaboration.';
  }
}

function buildCalmVideoSkimBullets(
  candidate: RawVideoCandidate,
  topicLabel: DigestTopicLabel
): string[] {
  if (candidate.jumpChips.length >= 3) {
    return candidate.jumpChips.slice(0, 3).map((chip) => {
      const textOnly = chip.label.replace(/^\d{1,2}:\d{2}(?::\d{2})?\s*·\s*/, '');
      return clampSentence(textOnly, 110);
    });
  }

  return [
    `What’s shifting: ${clampSentence(candidate.title, 95)} explained by ${candidate.presenter}.`,
    `Why it matters: Translates ${topicLabel.toLowerCase()} research into concrete nervous-system-friendly steps.`,
    `Try tonight: Pick one low-pressure script from the talk and test it during a calm transition.`,
  ];
}

const DINNER_PROMPTS_BY_TIER: Record<
  CanonicalDigestTier,
  readonly [
    { question: string; parentTip: string; followUp: string },
    { question: string; parentTip: string; followUp: string },
    { question: string; parentTip: string; followUp: string },
  ]
> = {
  [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]: [
    {
      question: 'What made you smile or giggle the biggest today?',
      parentTip: 'Keep questions brief and pair words with warm facial expressions or pointing.',
      followUp: 'Should we show Daddy/Mommy that silly face right now?',
    },
    {
      question: 'Which sound or texture felt most interesting when we played today?',
      parentTip: 'Name sensory words like soft, bumpy, loud, or quiet to expand early vocabulary.',
      followUp: 'Do you want to tap the spoon softly or loudly like a drum?',
    },
    {
      question: 'Was there a moment today when your body felt frustrated or needed a big hug?',
      parentTip: 'Normalize big feelings calmly during peaceful mealtimes so naming emotions feels safe.',
      followUp: 'What helps our bodies feel cozy again, deep breaths or a squeeze?',
    },
  ],
  [DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6]: [
    {
      question: 'If you could invent a brand-new game for tomorrow, what would the main rule be?',
      parentTip: 'Playful rule-making builds working memory and invites joyful storytelling at the table.',
      followUp: 'Who would get to go first in your game?',
    },
    {
      question: 'What was one tricky moment today where you kept trying anyway?',
      parentTip: 'Celebrate effort and patience rather than perfection to grow frustration tolerance.',
      followUp: 'What helped your brain stick with it?',
    },
    {
      question: 'Who was kind to someone else today, or who did you notice helping a friend?',
      parentTip: 'Spotting kindness strengthens emerging theory of mind without lecturing.',
      followUp: 'How do you think their face looked when that happened?',
    },
  ],
  [DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]: [
    {
      question: 'What was the funniest or most surprising thing someone did at recess or online this week?',
      parentTip: 'Starting with humor lowers guard and opens a window into their social world.',
      followUp: 'Did everyone think it was funny, or did anyone feel left out?',
    },
    {
      question: 'What’s something in a game, show, or book this week that you had to figure out on your own?',
      parentTip: 'Let them be the expert. Teaching you reinforces competence and pride.',
      followUp: 'Can you show me how that part works for five minutes after dinner?',
    },
    {
      question: 'If our house could tweak one small evening routine to make bedtime smoother, what would you vote for?',
      parentTip: 'Offering real voice on small routines builds buy-in for non-negotiable sleep boundaries.',
      followUp: 'Want to test your idea for three nights and check how it feels?',
    },
  ],
  [DevelopmentalTier.TIER_3_PRE_TEEN_10_12]: [
    {
      question: 'What’s a trend, video, or joke everyone at school is repeating right now that adults totally miss?',
      parentTip: 'Stay curious and amused. Avoid cringing or rushing to evaluate the trend.',
      followUp: 'Is it mostly lighthearted banter, or does it ever get awkward in group chats?',
    },
    {
      question: 'When a group chat or game gets tense, what’s the easiest way to step back without making it weird?',
      parentTip: 'Brainstorming exit ramps during calm dinners prepares pre-teens before real peer friction hits.',
      followUp: 'Would blaming a house charging rule ever be a helpful excuse you want to use?',
    },
    {
      question: 'What’s one thing you wish adults understood better about being your age right now?',
      parentTip: 'Listen all the way through without defending or correcting, just reflect what you heard.',
      followUp: 'Thanks for telling me. What’s one way I can keep that in mind this week?',
    },
  ],
  [DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]: [
    {
      question: 'What’s something showing up in your feed lately that feels genuinely cool versus exhausting to keep up with?',
      parentTip: 'Inviting teens to critique algorithms respects their intelligence and builds media literacy.',
      followUp: 'Which accounts actually leave you feeling energized instead of drained?',
    },
    {
      question: 'If you had one extra screen-free hour on a school night, how would you realistically want to spend it?',
      parentTip: 'Focus on what makes rest feel restorative rather than lecturing about sleep hours.',
      followUp: 'What usually gets in the way of winding down on weeknights?',
    },
    {
      question: 'When something stressful happens with friends or classes, do you usually want ideas, a distraction, or just someone to listen?',
      parentTip: 'Asking how they want support prevents accidental advice-giving that shuts teens down.',
      followUp: 'Good to know. Feel free to call me out gently if I jump into fix-it mode.',
    },
  ],
  [DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]: [
    {
      question: 'Where are tools like AI actually helping you learn faster right now, and where do they feel like a trap?',
      parentTip: 'Approach emerging tech as fellow learners. Older teens open up when treated as collaborators.',
      followUp: 'How are your teachers or friends drawing the line on what feels fair?',
    },
    {
      question: 'Looking at your week ahead, what’s one pressure you can shrink or hand off so you don’t burn out?',
      parentTip: 'Modeling sustainable pacing counters high-school perfectionism without micromanaging.',
      followUp: 'What’s one recovery anchor you’re protecting this weekend?',
    },
    {
      question: 'Which habit or boundary do you want to keep when you’re managing your own schedule independently?',
      parentTip: 'Framing routines around future autonomy shifts power struggles into self-leadership.',
      followUp: 'How can I step back a bit more while still staying a helpful sounding board?',
    },
  ],
};

const WEEKLY_PHRASES_BY_TIER: Partial<
  Record<
    CanonicalDigestTier,
    readonly [
      Omit<PhraseDraft, 'targetTiers' | 'sortOrder'>,
      Omit<PhraseDraft, 'targetTiers' | 'sortOrder'>,
      Omit<PhraseDraft, 'targetTiers' | 'sortOrder'>,
    ]
  >
> = {
  [DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]: [
    {
      word: 'No cap',
      shortMeaning: 'For real / honestly',
      fullMeaning: 'Used to emphasize that something is true or genuinely impressive, not an exaggeration.',
      cringeLevel: 1,
      cringeLabel: 'Smile & nod',
      calmScript: 'No need to say it back. Just appreciate they’re telling you something they really mean.',
    },
    {
      word: 'GG',
      shortMeaning: 'Good game / nice try',
      fullMeaning: 'Shorthand from multiplayer games used to wrap up a round politely, or playfully after any small challenge.',
      cringeLevel: 1,
      cringeLabel: 'Harmless',
      calmScript: 'Notice whether it’s used with good sportsmanship after wins and losses alike.',
    },
    {
      word: 'Bruhhh',
      shortMeaning: 'Wait, seriously? / playful disbelief',
      fullMeaning: 'An elongated reaction to something silly, surprising, or mildly annoying, usually lighthearted.',
      cringeLevel: 1,
      cringeLabel: 'Everyday banter',
      calmScript: 'Treat it as punctuation rather than disrespect unless tone turns hostile.',
    },
  ],
  [DevelopmentalTier.TIER_3_PRE_TEEN_10_12]: [
    {
      word: 'Locked in',
      shortMeaning: 'Deeply focused / ready to perform',
      fullMeaning: 'Describes entering full concentration before a game match, sports tryout, or test.',
      cringeLevel: 1,
      cringeLabel: 'Actually positive',
      calmScript: 'Ask what helps them feel locked in calmly before homework or practice.',
    },
    {
      word: 'Mid',
      shortMeaning: 'Average / underwhelming',
      fullMeaning: 'Casual critique meaning something wasn’t terrible, just overhyped or unimpressive.',
      cringeLevel: 2,
      cringeLabel: 'Do not try using',
      calmScript: 'Stay amused. When aimed at movies or snacks it’s harmless; check in only if aimed at classmates.',
    },
    {
      word: 'Lowkey',
      shortMeaning: 'Quietly / kind of',
      fullMeaning: 'Softens an opinion or admission so it feels less vulnerable to share with peers.',
      cringeLevel: 2,
      cringeLabel: 'Understand, don’t mimic',
      calmScript: 'Listen past the hedge. Often “I’m lowkey nervous” is a real invitation to connect.',
    },
  ],
  [DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]: [
    {
      word: 'Cooked',
      shortMeaning: 'Overwhelmed / out of options',
      fullMeaning: 'Dramatic shorthand for feeling behind on a test, exhausted, or caught in an awkward spot.',
      cringeLevel: 2,
      cringeLabel: 'Listen for stress cue',
      calmScript: 'Match the lightness first, then check whether they actually need help breaking a task down.',
    },
    {
      word: 'Aura',
      shortMeaning: 'Social coolness or embarrassment score',
      fullMeaning: 'Playful imaginary points gained or lost after confident or clumsy moments at school.',
      cringeLevel: 2,
      cringeLabel: 'Best left to teens',
      calmScript: 'Keep it light. If social embarrassment lingers, remind them everyone forgets awkward moments fast.',
    },
    {
      word: 'Glazing',
      shortMeaning: 'Over-praising / trying too hard to impress',
      fullMeaning: 'Teasing someone for excessive flattery toward a celebrity, teacher, or friend.',
      cringeLevel: 3,
      cringeLabel: 'Never say at dinner',
      calmScript: 'Notice if fear of being teased keeps your teen from expressing sincere enthusiasm.',
    },
  ],
  [DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]: [
    {
      word: 'Delulu',
      shortMeaning: 'Playfully unrealistic optimism',
      fullMeaning: 'Self-deprecating joke about hoping for an unlikely outcome, often used to ease pressure.',
      cringeLevel: 2,
      cringeLabel: 'Decode silently',
      calmScript: 'Usually healthy humor. Listen underneath for whether they’re protecting themselves from disappointment.',
    },
    {
      word: 'Side quest',
      shortMeaning: 'Fun detour from main obligations',
      fullMeaning: 'Borrowed from video games to describe spontaneous hangouts, errands, or creative tangents.',
      cringeLevel: 1,
      cringeLabel: 'Warm & harmless',
      calmScript: 'Welcome healthy offline side quests as real stress recovery during intense school weeks.',
    },
    {
      word: 'Touch grass',
      shortMeaning: 'Log off and reconnect with real life',
      fullMeaning: 'Used jokingly (or sincerely) when online debates or screen loops get detached from reality.',
      cringeLevel: 2,
      cringeLabel: 'Save for self-deprecating jokes',
      calmScript: 'Notice teens often recognize screen fatigue themselves. Invite outdoor resets collaboratively.',
    },
  ],
};

// ----------------------------------------------------
// DETERMINISTIC IN-MEMORY FAKE / HEURISTIC CURATOR
// ----------------------------------------------------

export class DeterministicDigestCuratorFake implements DigestContentCurator {
  async curateArticles(
    candidates: RawBlogCandidate[]
  ): Promise<CuratedBlogDraft[]> {
    return candidates.map((candidate) => {
      const rejectionReason = detectEditorialRejectionReason(
        candidate.title,
        candidate.rssExcerpt
      );
      const text = `${candidate.title} ${candidate.rssExcerpt} ${candidate.categories.join(' ')}`;
      const topicLabel = inferTopicLabel(text);
      const targetTiers = inferCanonicalTiers(text, candidate.defaultTiers);

      return {
        canonicalHash: candidate.canonicalHash,
        sourceUrl: candidate.sourceUrl,
        sourceName: candidate.sourceName,
        sourceDomain: candidate.sourceDomain,
        authorName: candidate.authorName,
        imageUrl: candidate.imageUrl,
        publishedAt: candidate.publishedAt,
        topicLabel,
        readMinutes: estimateReadMinutes(candidate.title, candidate.rssExcerpt),
        title: candidate.title,
        summary: buildCalmBlogSummary(candidate, topicLabel),
        keyShift: buildCalmKeyShift(topicLabel),
        perspectiveNote: null,
        sourcesText: `${candidate.sourceName} (${candidate.sourceDomain})`,
        targetTiers,
        authorityWeight: candidate.authorityWeight,
        approved: rejectionReason === null,
        ...(rejectionReason ? { rejectionReason } : {}),
      };
    });
  }

  async curateVideos(
    candidates: RawVideoCandidate[]
  ): Promise<CuratedVideoDraft[]> {
    return candidates.map((candidate) => {
      const rejectionReason = detectEditorialRejectionReason(
        candidate.title,
        candidate.description.slice(0, 400)
      );
      const text = `${candidate.title} ${candidate.description.slice(0, 400)} ${candidate.topicHint}`;
      const topicLabel = inferTopicLabel(text, candidate.topicHint);
      const targetTiers = inferCanonicalTiers(text, candidate.defaultTiers);

      return {
        youtubeVideoId: candidate.youtubeVideoId,
        videoUrl: candidate.videoUrl,
        title: candidate.title,
        presenter: candidate.presenter,
        channelName: candidate.channelName,
        channelId: candidate.channelId,
        publishedAt: candidate.publishedAt,
        durationMinutes: candidate.durationMinutes,
        formatLabel: inferVideoFormatLabel(
          candidate.durationMinutes,
          candidate.title
        ),
        takeaway: buildCalmKeyShift(topicLabel),
        jumpChips: candidate.jumpChips,
        skimBullets: buildCalmVideoSkimBullets(candidate, topicLabel),
        targetTiers,
        isEmbeddable: candidate.isEmbeddable,
        approved: candidate.isEmbeddable && rejectionReason === null,
        ...(rejectionReason ? { rejectionReason } : {}),
      };
    });
  }

  async synthesizeWeeklyExtras(
    params: SynthesizeWeeklyExtrasParams
  ): Promise<{ dinnerPrompts: DinnerPromptDraft[]; phrases: PhraseDraft[] }> {
    const resolvedTier = resolveDigestTierBucket(params.tier);
    const promptTemplates = DINNER_PROMPTS_BY_TIER[resolvedTier];

    const dinnerPrompts: DinnerPromptDraft[] = promptTemplates.map(
      (template, idx) => ({
        question: template.question,
        parentTip: template.parentTip,
        followUp: template.followUp,
        targetTiers: [resolvedTier],
        sortOrder: idx + 1,
      })
    );

    if (!isSlangEligibleTier(resolvedTier)) {
      return { dinnerPrompts, phrases: [] };
    }

    const phraseTemplates = WEEKLY_PHRASES_BY_TIER[resolvedTier] ?? [];
    const phrases: PhraseDraft[] = phraseTemplates.map((template, idx) => ({
      ...template,
      targetTiers: [resolvedTier],
      sortOrder: idx + 1,
    }));

    return { dinnerPrompts, phrases };
  }
}

// ----------------------------------------------------
// PRODUCTION ADAPTER: LLM DIGEST CURATOR WITH ZOD & FALLBACK
// ----------------------------------------------------

const CanonicalTierSchema = z.enum(CANONICAL_DIGEST_TIERS);
const TopicLabelSchema = z.enum(ALLOWED_DIGEST_TOPIC_LABELS);

const LlmArticleDecisionSchema = z.object({
  canonicalHash: z.string().min(1),
  approved: z.boolean(),
  rejectionReason: z.string().max(240).optional(),
  topicLabel: TopicLabelSchema.optional(),
  targetTiers: z.array(CanonicalTierSchema).min(1).optional(),
  summary: z.string().min(20).max(520).optional(),
  keyShift: z.string().min(10).max(260).optional(),
  perspectiveNote: z.string().max(240).nullable().optional(),
});

const LlmArticleBatchResponseSchema = z.object({
  items: z.array(LlmArticleDecisionSchema),
});

const LlmVideoDecisionSchema = z.object({
  youtubeVideoId: z.string().min(1),
  approved: z.boolean(),
  rejectionReason: z.string().max(240).optional(),
  formatLabel: z.string().min(2).max(40).optional(),
  targetTiers: z.array(CanonicalTierSchema).min(1).optional(),
  takeaway: z.string().min(12).max(280).optional(),
  skimBullets: z.array(z.string().min(6).max(160)).min(2).max(4).optional(),
});

const LlmVideoBatchResponseSchema = z.object({
  items: z.array(LlmVideoDecisionSchema),
});

const LlmWeeklyExtrasResponseSchema = z.object({
  dinnerPrompts: z
    .array(
      z.object({
        question: z.string().min(8).max(240),
        parentTip: z.string().min(8).max(260),
        followUp: z.string().min(8).max(240),
      })
    )
    .min(1)
    .max(5),
  phrases: z
    .array(
      z.object({
        word: z.string().min(1).max(60),
        shortMeaning: z.string().min(3).max(120),
        fullMeaning: z.string().min(10).max(280),
        cringeLevel: z.number().int().min(1).max(3),
        cringeLabel: z.string().min(2).max(60),
        calmScript: z.string().min(10).max(260),
      })
    )
    .max(5)
    .default([]),
});

function extractJsonObject(rawText: string): unknown {
  const trimmed = rawText.trim();
  const fenced = /```(?:json)?\s*([\s\S]*?)```/i.exec(trimmed);
  const candidate = fenced?.[1]?.trim() ?? trimmed;
  const firstBrace = candidate.indexOf('{');
  const lastBrace = candidate.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error('LLM output did not contain a JSON object.');
  }
  return JSON.parse(candidate.slice(firstBrace, lastBrace + 1));
}

export function hasConfiguredLlmApiKey(): boolean {
  const keys = [
    process.env.OPENAI_API_KEY,
    process.env.GEMINI_API_KEY,
    process.env.MISTRAL_API_KEY,
    process.env.MISTRAL_KEY,
  ];
  return keys.some((raw) => {
    if (!raw) return false;
    const cleaned = raw.trim().replace(/^["']|["']$/g, '');
    return (
      cleaned.length >= 12 &&
      !/placeholder|your_.*_key|changeme|sk-test/i.test(cleaned)
    );
  });
}

export const DEFAULT_LLM_CURATION_TIMEOUT_MS = 25_000;

export interface LlmDigestCuratorAdapterOptions {
  llmOrchestrator?: MultiProviderLlmOrchestrator;
  fallbackCurator?: DigestContentCurator;
  batchSize?: number;
  timeoutMs?: number;
  logger?: LoggerLike;
}

const PARENT_CALM_SYSTEM_PROMPT = `You are Alongside's Parent Calm Senior Editorial Curator.
Tone pillars: Empathy, Developmental Neurobiology, Bilateral Collaboration, Neutral Enforcement.
Rules:
1. REJECT (approved: false) any sensationalist, alarmist, fear-mongering, clickbait, sponsored, or off-topic item.
2. Map each approved item to 1-2 canonical developmental tiers from:
   TIER_0_INFANCY_TODDLER_0_3, TIER_1_EARLY_CHILDHOOD_4_6, TIER_2_MIDDLE_CHILDHOOD_7_9,
   TIER_3_PRE_TEEN_10_12, TIER_4_EARLY_ADOLESCENCE_13_15, TIER_5_LATE_ADOLESCENCE_16_18.
3. Choose topicLabel strictly from:
   "Media & Tech", "Sleep & Routines", "Social & Peers", "Play & Learning", "School & Focus", "Family Communication".
4. Write original, calm, concise parent takeaways (never copy publisher paragraphs verbatim).
5. Return ONLY valid JSON matching the requested schema, with no markdown commentary outside the JSON.`;

/**
 * Production LLM-powered editorial curator wrapping `MultiProviderLlmOrchestrator`
 * with strict Zod validation and automatic deterministic fallback if providers
 * are unavailable or unconfigured.
 */
export class LlmDigestCuratorAdapter implements DigestContentCurator {
  private readonly llmOrchestrator?: MultiProviderLlmOrchestrator;
  private readonly fallbackCurator: DigestContentCurator;
  private readonly batchSize: number;
  private readonly timeoutMs: number;
  private readonly logger: LoggerLike;

  constructor(opts: LlmDigestCuratorAdapterOptions = {}) {
    this.llmOrchestrator = opts.llmOrchestrator;
    this.fallbackCurator =
      opts.fallbackCurator ?? new DeterministicDigestCuratorFake();
    this.batchSize = opts.batchSize ?? 12;
    this.timeoutMs = opts.timeoutMs ?? DEFAULT_LLM_CURATION_TIMEOUT_MS;
    this.logger = opts.logger ?? console;
  }

  async curateArticles(
    candidates: RawBlogCandidate[]
  ): Promise<CuratedBlogDraft[]> {
    if (candidates.length === 0) return [];
    const baseline = await this.fallbackCurator.curateArticles(candidates);
    if (!this.llmOrchestrator) {
      return baseline;
    }

    const baselineByHash = new Map(baseline.map((b) => [b.canonicalHash, b]));
    const curated: CuratedBlogDraft[] = [];

    for (let i = 0; i < candidates.length; i += this.batchSize) {
      const batch = candidates.slice(i, i + this.batchSize);
      try {
        const promptPayload = batch.map((c) => ({
          canonicalHash: c.canonicalHash,
          sourceName: c.sourceName,
          title: c.title,
          rssExcerpt: c.rssExcerpt.slice(0, 400),
          defaultTiers: c.defaultTiers,
        }));

        const rawJson = await this.completeJson(
          `Curate these weekly parenting blog candidates. Return JSON: {"items":[{"canonicalHash":"...","approved":true,"topicLabel":"...","targetTiers":["..."],"summary":"2 calm original sentences","keyShift":"1 calm takeaway sentence","perspectiveNote":null}]}.\n\nCandidates:\n${JSON.stringify(promptPayload)}`
        );
        const parsed = LlmArticleBatchResponseSchema.parse(rawJson);
        const decisionByHash = new Map(
          parsed.items.map((item) => [item.canonicalHash, item])
        );

        for (const candidate of batch) {
          const fallback = baselineByHash.get(candidate.canonicalHash)!;
          const decision = decisionByHash.get(candidate.canonicalHash);
          if (!decision) {
            curated.push(fallback);
            continue;
          }

          // Defense-in-depth: keep heuristic rejection if candidate is blatantly alarmist/advertorial
          const approved = fallback.approved && decision.approved;
          curated.push({
            ...fallback,
            approved,
            rejectionReason:
              !approved
                ? decision.rejectionReason ?? fallback.rejectionReason
                : undefined,
            topicLabel: decision.topicLabel ?? fallback.topicLabel,
            targetTiers: decision.targetTiers
              ? Array.from(new Set(decision.targetTiers)).slice(0, 2)
              : fallback.targetTiers,
            summary: decision.summary ?? fallback.summary,
            keyShift: decision.keyShift ?? fallback.keyShift,
            perspectiveNote:
              decision.perspectiveNote !== undefined
                ? decision.perspectiveNote
                : fallback.perspectiveNote,
          });
        }
      } catch (err) {
        this.logger.warn(
          {
            event: 'digest_curator_article_fallback',
            reason: err instanceof Error ? err.message : String(err),
          },
          'LLM article curation failed; using deterministic Parent Calm fallback.'
        );
        for (const candidate of batch) {
          curated.push(baselineByHash.get(candidate.canonicalHash)!);
        }
      }
    }

    return curated;
  }

  async curateVideos(
    candidates: RawVideoCandidate[]
  ): Promise<CuratedVideoDraft[]> {
    if (candidates.length === 0) return [];
    const baseline = await this.fallbackCurator.curateVideos(candidates);
    if (!this.llmOrchestrator) {
      return baseline;
    }

    const baselineById = new Map(baseline.map((v) => [v.youtubeVideoId, v]));
    const curated: CuratedVideoDraft[] = [];

    for (let i = 0; i < candidates.length; i += this.batchSize) {
      const batch = candidates.slice(i, i + this.batchSize);
      try {
        const promptPayload = batch.map((c) => ({
          youtubeVideoId: c.youtubeVideoId,
          title: c.title,
          presenter: c.presenter,
          channelName: c.channelName,
          durationMinutes: c.durationMinutes,
          descriptionPreview: c.description.slice(0, 400),
          defaultTiers: c.defaultTiers,
        }));

        const rawJson = await this.completeJson(
          `Curate these weekly parenting YouTube video candidates. Do NOT fabricate timestamps. Return JSON: {"items":[{"youtubeVideoId":"...","approved":true,"formatLabel":"Parent Talk","targetTiers":["..."],"takeaway":"1 calm takeaway sentence","skimBullets":["bullet 1","bullet 2","bullet 3"]}]}.\n\nCandidates:\n${JSON.stringify(promptPayload)}`
        );
        const parsed = LlmVideoBatchResponseSchema.parse(rawJson);
        const decisionById = new Map(
          parsed.items.map((item) => [item.youtubeVideoId, item])
        );

        for (const candidate of batch) {
          const fallback = baselineById.get(candidate.youtubeVideoId)!;
          const decision = decisionById.get(candidate.youtubeVideoId);
          if (!decision) {
            curated.push(fallback);
            continue;
          }

          const approved =
            candidate.isEmbeddable && fallback.approved && decision.approved;
          curated.push({
            ...fallback,
            approved,
            rejectionReason:
              !approved
                ? decision.rejectionReason ?? fallback.rejectionReason
                : undefined,
            formatLabel: decision.formatLabel ?? fallback.formatLabel,
            targetTiers: decision.targetTiers
              ? Array.from(new Set(decision.targetTiers)).slice(0, 2)
              : fallback.targetTiers,
            takeaway: decision.takeaway ?? fallback.takeaway,
            skimBullets: decision.skimBullets
              ? decision.skimBullets.slice(0, 3)
              : fallback.skimBullets,
            // Preserve ONLY real parsed chapters: never allow LLM to overwrite jumpChips
            jumpChips: candidate.jumpChips,
          });
        }
      } catch (err) {
        this.logger.warn(
          {
            event: 'digest_curator_video_fallback',
            reason: err instanceof Error ? err.message : String(err),
          },
          'LLM video curation failed; using deterministic Parent Calm fallback.'
        );
        for (const candidate of batch) {
          curated.push(baselineById.get(candidate.youtubeVideoId)!);
        }
      }
    }

    return curated;
  }

  async synthesizeWeeklyExtras(
    params: SynthesizeWeeklyExtrasParams
  ): Promise<{ dinnerPrompts: DinnerPromptDraft[]; phrases: PhraseDraft[] }> {
    const resolvedTier = resolveDigestTierBucket(params.tier);
    const slangAllowed = isSlangEligibleTier(resolvedTier);
    const fallback = await this.fallbackCurator.synthesizeWeeklyExtras({
      ...params,
      tier: resolvedTier,
    });

    if (!this.llmOrchestrator) {
      return fallback;
    }

    try {
      const titles = [
        ...params.articles.slice(0, 4).map((a) => a.title),
        ...params.videos.slice(0, 4).map((v) => v.title),
      ];
      const phraseRule = slangAllowed
        ? 'Generate exactly 3 age-calibrated youth culture phrases (cringeLevel 1-3) for this tier.'
        : 'CRITICAL: This developmental tier is ages 0-6. You MUST return "phrases": [] (empty array).';

      const rawJson = await this.completeJson(
        `Synthesize weekly Sunday family table extras for developmental tier ${resolvedTier} (${params.weekStart.toISOString().slice(0, 10)} to ${params.weekEnd.toISOString().slice(0, 10)}).
This week's themes: ${JSON.stringify(titles)}.
Generate 3 calm, age-calibrated dinnerPrompts. ${phraseRule}
Return JSON: {"dinnerPrompts":[{"question":"...","parentTip":"...","followUp":"..."}],"phrases":[{"word":"...","shortMeaning":"...","fullMeaning":"...","cringeLevel":2,"cringeLabel":"...","calmScript":"..."}]}.`
      );

      const parsed = LlmWeeklyExtrasResponseSchema.parse(rawJson);

      const dinnerPrompts: DinnerPromptDraft[] = parsed.dinnerPrompts
        .slice(0, 3)
        .map((p, idx) => ({
          question: p.question,
          parentTip: p.parentTip,
          followUp: p.followUp,
          targetTiers: [resolvedTier],
          sortOrder: idx + 1,
        }));

      // Hard developmental invariant: strictly ZERO phrases for ages 0–6 even if LLM returns them
      const phrases: PhraseDraft[] = slangAllowed
        ? (parsed.phrases.length > 0 ? parsed.phrases : fallback.phrases)
            .slice(0, 3)
            .map((p, idx) => ({
              word: p.word,
              shortMeaning: p.shortMeaning,
              fullMeaning: p.fullMeaning,
              cringeLevel: p.cringeLevel,
              cringeLabel: p.cringeLabel,
              calmScript: p.calmScript,
              targetTiers: [resolvedTier],
              sortOrder: idx + 1,
            }))
        : [];

      return {
        dinnerPrompts:
          dinnerPrompts.length >= 3 ? dinnerPrompts : fallback.dinnerPrompts,
        phrases,
      };
    } catch (err) {
      this.logger.warn(
        {
          event: 'digest_curator_extras_fallback',
          tier: resolvedTier,
          reason: err instanceof Error ? err.message : String(err),
        },
        'LLM weekly extras synthesis failed; using deterministic Parent Calm fallback.'
      );
      return fallback;
    }
  }

  private async completeJson(userPrompt: string): Promise<unknown> {
    if (!this.llmOrchestrator) {
      throw new Error('No LLM orchestrator configured.');
    }

    const iterator = this.llmOrchestrator
      .stream({
        messages: [
          { role: 'system', content: PARENT_CALM_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
        maxTokens: 2048,
      })
      [Symbol.asyncIterator]();

    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeoutPromise = new Promise<never>((_resolve, reject) => {
      timer = setTimeout(() => {
        reject(
          new Error(
            `LLM curation request timed out after ${this.timeoutMs}ms.`
          )
        );
      }, this.timeoutMs);
      timer.unref?.();
    });

    const readAll = (async (): Promise<string> => {
      let output = '';
      while (true) {
        const { done, value } = await iterator.next();
        if (done) break;
        output += value;
      }
      return output;
    })();

    try {
      const output = await Promise.race([readAll, timeoutPromise]);
      return extractJsonObject(output);
    } catch (err) {
      void iterator.return?.().catch(() => {});
      void readAll.catch(() => {});
      throw err;
    } finally {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    }
  }
}
