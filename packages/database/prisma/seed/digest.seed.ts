import { createHash } from 'node:crypto';
import type { Prisma, PrismaClient } from '@prisma/client';
import {
  DevelopmentalTier,
  DigestContentStatus,
  DigestIssueStatus,
  ExploitSeverity,
  type VideoJumpChip,
} from '@alongside/shared';
import { MASTER_VIDEO_LECTURES_BY_LESSON_SLUG } from './academyVideos.seed.js';

export interface SlangSeedData {
  term: string;
  definition: string;
  exampleSentence: string;
  contextTone: string;
}

export interface ExploitAlertSeedData {
  appName: string;
  exploitDescription: string;
  howKidsBypass: string;
  parentRemedy: string;
  severity: ExploitSeverity;
}

export interface CultureDigestSeedData {
  issueNumber: number;
  publishDate: Date;
  title: string;
  summary: string;
  conversationStarter: string;
  slangTerms: SlangSeedData[];
  exploitAlerts: ExploitAlertSeedData[];
}

export interface DigestArticleSeedData {
  id: string;
  canonicalHash: string;
  sourceUrl: string;
  sourceName: string;
  sourceDomain: string;
  authorName?: string | null;
  imageUrl?: string | null;
  publishedAt: Date;
  isOriginalEditorial: boolean;
  topicLabel: string;
  readMinutes: number;
  title: string;
  summary: string;
  keyShift: string;
  perspectiveNote?: string | null;
  contentMarkdown?: string | null;
  sourcesText?: string | null;
  targetTiers: DevelopmentalTier[];
  isLead: boolean;
  sortOrder: number;
  ingestionStatus: DigestContentStatus;
}

export interface DigestVideoSeedData {
  id: string;
  youtubeVideoId: string;
  videoUrl: string;
  title: string;
  presenter: string;
  channelName: string;
  channelId?: string | null;
  publishedAt: Date;
  durationMinutes: number;
  formatLabel: string;
  takeaway: string;
  jumpChips?: VideoJumpChip[];
  skimBullets: string[];
  targetTiers: DevelopmentalTier[];
  isEmbeddable: boolean;
  sortOrder: number;
  ingestionStatus: DigestContentStatus;
}

export interface DigestDinnerPromptSeedData {
  id: string;
  question: string;
  parentTip: string;
  followUp: string;
  targetTiers: DevelopmentalTier[];
  sortOrder: number;
}

export interface DigestPhraseSeedData {
  id: string;
  word: string;
  shortMeaning: string;
  fullMeaning: string;
  cringeLevel: number;
  cringeLabel: string;
  calmScript: string;
  targetTiers: DevelopmentalTier[];
  sortOrder: number;
}

export interface WeeklyDigestEditionSeedData {
  id: string;
  issueNumber: number;
  publishDate: Date;
  weekStart: Date;
  weekEnd: Date;
  title: string;
  summary: string;
  conversationStarter: string;
  status: DigestIssueStatus;
  curatedAt: Date;
  articles: DigestArticleSeedData[];
  videos: DigestVideoSeedData[];
  dinnerPrompts: DigestDinnerPromptSeedData[];
  phrases: DigestPhraseSeedData[];
}

// ----------------------------------------------------
// LEGACY SEED EXPORTS (PLAN-08 - PRESERVED)
// ----------------------------------------------------

export const SLANG_SEED_TERMS: SlangSeedData[] = [
  {
    term: 'Crashout',
    definition:
      'An explosive, irrational overreaction to a minor frustration or gaming defeat, completely abandoning restraint or strategic caution.',
    exampleSentence:
      'He lost his 50-kill streak in Fortnite and completely crashed out on his live stream.',
    contextTone:
      'Playful exaggeration among gaming peers; flag if accompanied by actual property destruction or persistent real-world rage.',
  },
  {
    term: 'Rizz',
    definition:
      'Charisma or charm, specifically referring to the intuitive ability to impress, attract, or engage someone effortlessly in social conversation.',
    exampleSentence:
      'He has unspoken rizz whenever he tells that story about camp.',
    contextTone:
      'Benign social banter and playful confidence boosting; completely harmless.',
  },
  {
    term: 'Skibidi',
    definition:
      'A catch-all absurdist slang term originating from the viral YouTube animation series, used flexibly as an adjective for cool, weird, or meaningless rhythmic emphasis.',
    exampleSentence: 'That Minecraft parody video is peak skibidi humor.',
    contextTone: 'Absurdist tween nonsense wordplay; completely harmless.',
  },
  {
    term: 'Looksmaxing',
    definition:
      'The practice of attempting to optimize facial structure, jawline definition, skincare, and grooming habits through regimens and exercises.',
    exampleSentence:
      'A lot of guys in eighth grade are obsessing over looksmaxing and jawline chew tools.',
    contextTone:
      'Generally harmless personal grooming interest; monitor for underlying body dysmorphia or restrictive eating behaviors.',
  },
  {
    term: 'Cooked',
    definition:
      'Doomed, exhausted, caught, or ruined with no plausible escape from an impending difficult situation or failure.',
    exampleSentence:
      'If I do not finish this history project before school tomorrow morning, I am completely cooked.',
    contextTone:
      'Humorous dramatic exaggeration of academic or interpersonal stress.',
  },
  {
    term: 'Gyatt',
    definition:
      'An exclamation of surprise, excitement, or emphasis, frequently directed at an individual with prominent physical curves.',
    exampleSentence: 'Did you see that outfit they walked in with? Gyatt!',
    contextTone:
      'Mild suggestive streamer slang popularized on Twitch and YouTube; check context in middle school group chats.',
  },
];

export const EXPLOIT_SEED_ALERTS: ExploitAlertSeedData[] = [
  {
    appName: 'Calculator+ (Secret Calculator Vault)',
    exploitDescription:
      'A fully functional, disguised calculator app that unlocks a hidden, password-encrypted vault for photos, videos, and private web browsing when a secret numeric PIN is entered.',
    howKidsBypass:
      'Kids download the app to hide restricted media or conversations from parental screen checks. The app icon and interface appear as a standard working calculator.',
    parentRemedy:
      'Open Settings > iPhone Storage (or Android App Storage) and look for calculator apps with unusually large storage sizes (e.g. >500 MB) or duplicate calculator applications.',
    severity: ExploitSeverity.HIGH,
  },
  {
    appName: 'Google Translate Web Proxy',
    exploitDescription:
      'Using Google Translate website translation feature as an unblocked reverse web proxy to browse blacklisted URLs within restricted school or home WiFi networks.',
    howKidsBypass:
      'Kids paste the blocked URL into the left translation box, select English to Spanish, and click the generated link in the right translation box. Google loads and renders the website inside its own trusted domain.',
    parentRemedy:
      'Ensure device-level content restrictions (such as Alongside signed Apple profiles or Screen Time web filters) are enforced on the device itself, rather than relying solely on local router keyword blockers.',
    severity: ExploitSeverity.MEDIUM,
  },
  {
    appName: 'Sendit / NGL Anonymous Q&A',
    exploitDescription:
      'Third-party companion apps integrated with Snapchat or Instagram story stickers that allow followers to submit anonymous questions, feedback, or comments.',
    howKidsBypass:
      'Teens post the sticker on their public or private story, inviting peers to submit anonymous messages. Because the sender is hidden, it often becomes an unregulated vector for cyberbullying, gossip, and harassment.',
    parentRemedy:
      'Establish a bilateral agreement clause prohibiting anonymous feedback plugins, explaining that real empathy and community require accountability rather than anonymous comment boxes.',
    severity: ExploitSeverity.HIGH,
  },
];

export const DIGEST_SEED_ISSUE: CultureDigestSeedData = {
  issueNumber: 42,
  publishDate: new Date('2026-11-15T00:00:00.000Z'),
  title: "Decoding 'Crashout' & The Calculator Vault Bypass",
  summary:
    "This week's Sunday briefing decodes trending tween gaming slang ('crashout', 'skibidi', 'rizz'), alerts parents to disguised calculator photo vaults, and provides dinner conversation prompts that invite genuine storytelling.",
  conversationStarter:
    'Ask your tween what the funniest meme they saw this week was and why it made them laugh.',
  slangTerms: SLANG_SEED_TERMS,
  exploitAlerts: EXPLOIT_SEED_ALERTS,
};

// ----------------------------------------------------
// WEEKLY EDITION SEED HELPERS (PLAN-49)
// ----------------------------------------------------

const T0 = DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;
const T1 = DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
const T2 = DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
const T3 = DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
const T4 = DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
const T5 = DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;

const PUBLISHERS = {
  aap: {
    sourceName: 'HealthyChildren.org (AAP)',
    sourceDomain: 'healthychildren.org',
  },
  cmi: {
    sourceName: 'Child Mind Institute',
    sourceDomain: 'childmind.org',
  },
  csm: {
    sourceName: 'Common Sense Media',
    sourceDomain: 'commonsensemedia.org',
  },
  ztt: {
    sourceName: 'ZERO TO THREE',
    sourceDomain: 'zerotothree.org',
  },
  gg: {
    sourceName: 'Greater Good Magazine',
    sourceDomain: 'greatergood.berkeley.edu',
  },
  harvard: {
    sourceName: 'Harvard Center on the Developing Child',
    sourceDomain: 'developingchild.harvard.edu',
  },
} as const;

type PublisherKey = keyof typeof PUBLISHERS;

function hashCanonicalUrl(url: string): string {
  return createHash('sha256').update(url.trim().toLowerCase()).digest('hex');
}

function makeExternalArticle(input: {
  id: string;
  publisher: PublisherKey;
  sourceUrl: string;
  publishedAt: string;
  topicLabel: string;
  readMinutes: number;
  title: string;
  summary: string;
  keyShift: string;
  perspectiveNote?: string;
  authorName?: string;
  targetTiers: DevelopmentalTier[];
  isLead: boolean;
  sortOrder: number;
}): DigestArticleSeedData {
  const pub = PUBLISHERS[input.publisher];
  return {
    id: input.id,
    canonicalHash: hashCanonicalUrl(input.sourceUrl),
    sourceUrl: input.sourceUrl,
    sourceName: pub.sourceName,
    sourceDomain: pub.sourceDomain,
    authorName: input.authorName ?? null,
    imageUrl: null,
    publishedAt: new Date(input.publishedAt),
    isOriginalEditorial: false,
    topicLabel: input.topicLabel,
    readMinutes: input.readMinutes,
    title: input.title,
    summary: input.summary,
    keyShift: input.keyShift,
    perspectiveNote: input.perspectiveNote ?? null,
    contentMarkdown: null,
    sourcesText: `${pub.sourceName} (${pub.sourceDomain})`,
    targetTiers: input.targetTiers,
    isLead: input.isLead,
    sortOrder: input.sortOrder,
    ingestionStatus: DigestContentStatus.APPROVED,
  };
}

function extractYouTubeVideoId(videoUrl: string): string {
  const match = /[?&]v=([a-zA-Z0-9_-]{11})/.exec(videoUrl);
  if (!match?.[1]) {
    throw new Error(`Invalid verified YouTube URL in academyVideos.seed.ts: ${videoUrl}`);
  }
  return match[1];
}

function makeVerifiedVideo(input: {
  id: string;
  lessonSlug: string;
  publishedAt: string;
  formatLabel: string;
  takeaway?: string;
  targetTiers: DevelopmentalTier[];
  sortOrder: number;
}): DigestVideoSeedData {
  const lecture = MASTER_VIDEO_LECTURES_BY_LESSON_SLUG[input.lessonSlug];
  if (!lecture) {
    throw new Error(`Missing verified academy video slug: ${input.lessonSlug}`);
  }
  const youtubeVideoId = extractYouTubeVideoId(lecture.videoUrl);
  return {
    id: input.id,
    youtubeVideoId,
    videoUrl: lecture.videoUrl,
    title: lecture.title,
    presenter: lecture.presenter,
    channelName: lecture.channel,
    channelId: null,
    publishedAt: new Date(input.publishedAt),
    durationMinutes: lecture.durationMinutes,
    formatLabel: input.formatLabel,
    takeaway: input.takeaway ?? lecture.parentHook ?? lecture.title,
    jumpChips: lecture.jumpChips,
    skimBullets: lecture.keyTakeaways ?? [],
    targetTiers: input.targetTiers,
    isEmbeddable: true,
    sortOrder: input.sortOrder,
    ingestionStatus: DigestContentStatus.APPROVED,
  };
}

// ----------------------------------------------------
// ISSUE #42 (Nov 8 – Nov 15, 2026)
// ----------------------------------------------------

const ISSUE_42_ARTICLES: DigestArticleSeedData[] = [
  // Tier 0 (0-3)
  makeExternalArticle({
    id: 'art-42-t0-1',
    publisher: 'ztt',
    sourceUrl: 'https://www.zerotothree.org/resource/screen-sense-what-the-research-says-about-the-impact-of-media-on-children-aged-0-3-years-old/',
    publishedAt: '2026-11-13T14:00:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 4,
    title: 'Why slow-paced narration beats rapid-cut toddler videos',
    summary:
      'ZERO TO THREE breaks down how babies and toddlers process screen movement differently from live faces. Short, calm co-viewed video calls build language while fast-cut feeds overstimulate young attention.',
    keyShift: 'Prioritize live voice narration and keep background TV switched off during floor play.',
    perspectiveNote: 'Occasional calm clips when a parent needs ten minutes do not undo warm daily routines.',
    targetTiers: [T0],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-42-t0-2',
    publisher: 'harvard',
    sourceUrl: 'https://developingchild.harvard.edu/science/key-concepts/serve-and-return/',
    publishedAt: '2026-11-11T16:30:00.000Z',
    topicLabel: 'Play & Learning',
    readMinutes: 3,
    title: 'Five simple serve-and-return moments during everyday chores',
    summary:
      'Harvard researchers outline five repeatable steps, notice the serve, return warmly, name the object, take turns, and practice endings, that wire early language and emotional safety.',
    keyShift: 'Narrate what your toddler points to instead of quizzing them with flashcards.',
    targetTiers: [T0],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-42-t0-3',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/Getting-Your-Baby-to-Sleep.aspx',
    publishedAt: '2026-11-09T11:15:00.000Z',
    topicLabel: 'Sleep & Routines',
    readMinutes: 4,
    title: 'Calming evening cues that help babies wind down reliably',
    summary:
      'Pediatricians at HealthyChildren.org highlight how predictable three-step bedtime cues, warm bath, dim light, quiet voice, signal melatonin release without rigid sleep-training pressure.',
    keyShift: 'Anchor bedtime with the same calm sensory sequence rather than chasing the exact clock minute.',
    targetTiers: [T0],
    isLead: false,
    sortOrder: 3,
  }),

  // Tier 1 (4-6)
  makeExternalArticle({
    id: 'art-42-t1-1',
    publisher: 'csm',
    sourceUrl: 'https://www.commonsensemedia.org/articles/screen-time-for-preschoolers',
    publishedAt: '2026-11-13T15:00:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 4,
    title: 'Choosing calmer preschool shows when autoplay pulls them in',
    summary:
      'Common Sense Media reviews how streaming autoplay loops prolong preschool screen requests. Turning off autoplay and pairing one episode with a visible timer ends most post-show tears.',
    keyShift: 'Let an external kitchen timer end screen time so the clock, not your voice, holds the boundary.',
    perspectiveNote: 'Preschoolers grieve transitions because their braking cortex is still under construction.',
    targetTiers: [T1],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-42-t1-2',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/how-to-handle-tantrums-and-meltdowns/',
    publishedAt: '2026-11-11T13:00:00.000Z',
    topicLabel: 'Emotional Regulation',
    readMinutes: 4,
    title: 'Handling preschool after-pickup meltdowns without lectures',
    summary:
      'Child Mind Institute clinicians explain why four- to six-year-olds hold it together all day at preschool and release pent-up tension the minute they see their safe parent.',
    keyShift: 'Offer a quiet snack and ten minutes of low-demand play before asking school questions.',
    targetTiers: [T1],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-42-t1-3',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/why_unstructured_play_matters_for_young_kids',
    publishedAt: '2026-11-10T09:30:00.000Z',
    topicLabel: 'Play & Learning',
    readMinutes: 3,
    title: 'Why pretend play builds self-control faster than worksheets',
    summary:
      'Greater Good Magazine gathers developmental studies showing that open-ended make-believe requires preschoolers to hold rules in mind, negotiate roles, and wait their turn.',
    keyShift: 'Leave twenty unscheduled minutes daily with blocks, cardboard boxes, or dress-up scarves.',
    targetTiers: [T1],
    isLead: false,
    sortOrder: 3,
  }),

  // Tier 2 (7-9)
  makeExternalArticle({
    id: 'art-42-t2-1',
    publisher: 'csm',
    sourceUrl: 'https://www.commonsensemedia.org/articles/parents-ultimate-guide-to-roblox',
    publishedAt: '2026-11-14T10:00:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 5,
    title: 'Understanding Roblox chat filters and cooperative play at ages 7–9',
    summary:
      'Common Sense Media walks parents through Roblox experience maturity labels, private server defaults, and how to turn solo grinding into shared living-room play.',
    keyShift: 'Switch chat permissions to known real-life friends and sit beside them for one round each week.',
    perspectiveNote: 'Curiosity opens far more honest gaming conversations than surprise account audits.',
    targetTiers: [T2],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-42-t2-2',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/family-life/Media/Pages/Where-We-Stand-TV-Viewing-Time.aspx',
    publishedAt: '2026-11-12T12:00:00.000Z',
    topicLabel: 'Family Communication',
    readMinutes: 3,
    title: 'Building a predictable elementary family media plan',
    summary:
      'The American Academy of Pediatrics outlines how clear, written household routines for homework, outdoor play, and screen-free bedrooms lower daily negotiations for elementary kids.',
    keyShift: 'Decide daily screen windows on Sunday evening so weekday afternoons stay friction-free.',
    targetTiers: [T2],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-42-t2-3',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/supporting-emotional-needs-of-kids-with-learning-challenges/',
    publishedAt: '2026-11-09T14:45:00.000Z',
    topicLabel: 'School & Focus',
    readMinutes: 4,
    title: 'When third-grade frustration sounds like "I am terrible at everything"',
    summary:
      'Clinicians unpack why ages seven to nine mark a leap in peer comparison and how validating effort keeps minor homework setbacks from hardening into shame.',
    keyShift: 'Name the specific skill still growing rather than dismissing their frustration with quick reassurance.',
    targetTiers: [T2],
    isLead: false,
    sortOrder: 3,
  }),

  // Tier 3 (10-12)
  makeExternalArticle({
    id: 'art-42-t3-1',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/when-should-you-get-your-kid-a-phone/',
    publishedAt: '2026-11-14T13:30:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 5,
    title: 'How to read readiness cues before the first smartphone conversation',
    summary:
      'Child Mind Institute outlines maturity signals, sleep protection, impulse recovery, and honesty around mistakes, that matter more than whether classmates already carry phones.',
    keyShift: 'Treat device autonomy as a graduated driving permit rather than an all-or-nothing birthday switch.',
    perspectiveNote: 'Delaying open social feeds while offering voice/text independence protects peer connection.',
    targetTiers: [T3],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-42-t3-2',
    publisher: 'csm',
    sourceUrl: 'https://www.commonsensemedia.org/articles/how-to-help-tweens-navigate-group-chats',
    publishedAt: '2026-11-12T17:00:00.000Z',
    topicLabel: 'Social & Peers',
    readMinutes: 4,
    title: 'Helping tweens step out of high-drama group chats without losing face',
    summary:
      'Common Sense Media explores why fifth- and sixth-grade group chats escalate quickly after bedtime and gives tweens practical scripts to mute threads calmly.',
    keyShift: 'Offer yourself as a blame shield: "Tell your chat my parents dock my device at 8:30."',
    targetTiers: [T3],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-42-t3-3',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/how_to_stay_connected_to_your_tween',
    publishedAt: '2026-11-10T11:00:00.000Z',
    topicLabel: 'Family Communication',
    readMinutes: 4,
    title: 'Side-by-side rituals that keep pre-teens talking when privacy grows',
    summary:
      'UC Berkeley researchers highlight why tweens open up far more easily during parallel activities, car rides, shooting hoops, or late-evening dishwashing, than across a formal table.',
    keyShift: 'Save curious open-ended questions for low-eye-contact moments instead of right after school.',
    targetTiers: [T3],
    isLead: false,
    sortOrder: 3,
  }),

  // Tier 4 (13-15)
  makeExternalArticle({
    id: 'art-42-t4-1',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/family-life/Media/Pages/social-media-and-your-childs-mental-health-what-research-says.aspx',
    publishedAt: '2026-11-14T16:00:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 5,
    title: 'What pediatric research actually says about teen social feeds and sleep',
    summary:
      'HealthyChildren.org synthesizes current adolescent media research, emphasizing that late-night scroll displacement of REM sleep drives mood dips far more than daytime messaging.',
    keyShift: 'Focus household pacts on device-free bedrooms overnight before micromanaging every daytime minute.',
    perspectiveNote: 'Co-signed boundaries with clear reasoning earn significantly higher teen buy-in than surprise blocks.',
    targetTiers: [T4],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-42-t4-2',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/tips-communicating-with-teen/',
    publishedAt: '2026-11-11T18:00:00.000Z',
    topicLabel: 'Family Communication',
    readMinutes: 4,
    title: 'Validating first so your ninth grader keeps coming home with hard stories',
    summary:
      'Adolescent psychologists show how jumping straight to advice triggers immediate teen shutdown, while pausing to reflect the emotion keeps the prefrontal bridge open.',
    keyShift: 'Ask "Do you want me to just listen, brainstorm, or help step in?" before offering solutions.',
    targetTiers: [T4],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-42-t4-3',
    publisher: 'csm',
    sourceUrl: 'https://www.commonsensemedia.org/articles/ai-chatbots-what-parents-need-to-know',
    publishedAt: '2026-11-09T15:30:00.000Z',
    topicLabel: 'School & Focus',
    readMinutes: 4,
    title: 'Talking calmly about AI companion bots and homework shortcuts',
    summary:
      'Common Sense Media breaks down how teens use generative AI for study outlines versus emotional venting, and how to set transparent family norms around real human friendship.',
    keyShift: 'Test an AI study prompt together and discuss where automated answers flatten their own voice.',
    targetTiers: [T4],
    isLead: false,
    sortOrder: 3,
  }),

  // Tier 5 (16-18)
  makeExternalArticle({
    id: 'art-42-t5-1',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/preparing-teens-for-independence/',
    publishedAt: '2026-11-14T11:30:00.000Z',
    topicLabel: 'Family Communication',
    readMinutes: 5,
    title: 'Shifting from household manager to trusted consultant before graduation',
    summary:
      'Child Mind Institute outlines how letting older teens manage their own calendar misses, health appointments, and study blocks builds durable adult competence while a safety net still exists.',
    keyShift: 'Step back from daily reminders and invite weekly check-ins where your teen sets the agenda.',
    perspectiveNote: 'Small manageable stumbles at 17 are far safer teachers than sudden shock at 19.',
    targetTiers: [T5],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-42-t5-2',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/how_to_help_teens_manage_stress_and_burnout',
    publishedAt: '2026-11-12T10:15:00.000Z',
    topicLabel: 'Sleep & Routines',
    readMinutes: 4,
    title: 'Spotting quiet academic burnout in high-achieving juniors and seniors',
    summary:
      'Greater Good Magazine highlights the difference between healthy stretch goals and chronic perfectionism, urging families to protect one phone-free recovery window every weekend.',
    keyShift: 'Greet your teen warmly about who they are before asking a single question about grades or applications.',
    targetTiers: [T5],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-42-t5-3',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/teen/safety/Pages/Teen-Driving.aspx',
    publishedAt: '2026-11-10T14:20:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 4,
    title: 'Co-designing distraction-free driving agreements that teens actually honor',
    summary:
      'AAP safety researchers show that pairing automatic Do Not Disturb While Driving modes with parent modeling cuts distracted glances far better than punitive tracking apps.',
    keyShift: 'Model putting your own phone in the glove compartment whenever your teen rides shotgun.',
    targetTiers: [T5],
    isLead: false,
    sortOrder: 3,
  }),
];

const ISSUE_42_VIDEOS: DigestVideoSeedData[] = [
  // 0-3 (3 videos: 2m short, 10m short, 16m medium)
  makeVerifiedVideo({
    id: 'vid-42-t0-1',
    lessonSlug: 'serve-and-return-neural-architecture',
    publishedAt: '2026-11-14T09:00:00.000Z',
    formatLabel: '2-Min Quick Watch',
    targetTiers: [T0],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t0-2',
    lessonSlug: 'infant-safe-sleep-and-circadian-reset',
    publishedAt: '2026-11-12T12:00:00.000Z',
    formatLabel: 'Sleep & Calm',
    targetTiers: [T0],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t0-3',
    lessonSlug: 'toddler-screen-free-bedroom-audit',
    publishedAt: '2026-11-10T15:00:00.000Z',
    formatLabel: 'Media Science',
    targetTiers: [T0],
    sortOrder: 3,
  }),

  // 4-6 (3 videos: 10m short, 18m medium, 52m deep)
  makeVerifiedVideo({
    id: 'vid-42-t1-1',
    lessonSlug: 'preschool-freeze-dance-inhibitory-control',
    publishedAt: '2026-11-14T11:00:00.000Z',
    formatLabel: 'Growth Mindset',
    targetTiers: [T1],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t1-2',
    lessonSlug: 'preschool-physical-timer-protocol',
    publishedAt: '2026-11-12T16:00:00.000Z',
    formatLabel: 'Screen Norms',
    targetTiers: [T1],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t1-3',
    lessonSlug: 'preschool-nature-loose-parts-play',
    publishedAt: '2026-11-09T14:00:00.000Z',
    formatLabel: 'Deep Dive Talk',
    targetTiers: [T1],
    sortOrder: 3,
  }),

  // 7-9 & 10-12 (6m short shared, plus distinct medium & deep)
  makeVerifiedVideo({
    id: 'vid-42-t2-1',
    lessonSlug: 'elementary-cardboard-maker-challenge',
    publishedAt: '2026-11-14T10:30:00.000Z',
    formatLabel: '6-Min Spark',
    targetTiers: [T2, T3],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t2-2',
    lessonSlug: 'elementary-post-game-decompression',
    publishedAt: '2026-11-12T13:30:00.000Z',
    formatLabel: 'Digital Mentoring',
    targetTiers: [T2],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t2-3',
    lessonSlug: 'elementary-bilateral-gaming-contract',
    publishedAt: '2026-11-09T17:00:00.000Z',
    formatLabel: 'Deep Dive Talk',
    targetTiers: [T2],
    sortOrder: 3,
  }),

  // 10-12 additional (14m medium, 61m deep)
  makeVerifiedVideo({
    id: 'vid-42-t3-2',
    lessonSlug: 'tween-non-reactive-neutral-stance',
    publishedAt: '2026-11-13T14:00:00.000Z',
    formatLabel: 'Brain Science',
    targetTiers: [T3],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t3-3',
    lessonSlug: 'tween-bilateral-family-pact',
    publishedAt: '2026-11-10T18:00:00.000Z',
    formatLabel: 'Parent Seminar',
    targetTiers: [T3],
    sortOrder: 3,
  }),

  // 13-15 (11m short, 19m medium, 67m deep)
  makeVerifiedVideo({
    id: 'vid-42-t4-1',
    lessonSlug: 'adolescent-collaborative-boundary-agreements',
    publishedAt: '2026-11-14T15:00:00.000Z',
    formatLabel: '11-Min Essential',
    targetTiers: [T4],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t4-2',
    lessonSlug: 'adolescent-tech-free-nightstand',
    publishedAt: '2026-11-11T19:00:00.000Z',
    formatLabel: 'Sleep Science',
    targetTiers: [T4],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t4-3',
    lessonSlug: 'adolescent-validate-first-framework',
    publishedAt: '2026-11-09T13:00:00.000Z',
    formatLabel: 'Deep Dive Talk',
    targetTiers: [T4, T5],
    sortOrder: 3,
  }),

  // 16-18 (11m short, 14m medium, plus shared 67m deep above)
  makeVerifiedVideo({
    id: 'vid-42-t5-1',
    lessonSlug: 'teen-lifelong-adult-friendship-scaffold',
    publishedAt: '2026-11-14T12:00:00.000Z',
    formatLabel: 'Launching Well',
    targetTiers: [T5],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t5-2',
    lessonSlug: 'teen-consultant-shift-protocol',
    publishedAt: '2026-11-12T11:00:00.000Z',
    formatLabel: 'Autonomy Talk',
    targetTiers: [T5],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-42-t5-4',
    lessonSlug: 'teen-deep-work-block',
    publishedAt: '2026-11-10T10:00:00.000Z',
    formatLabel: 'Focus & Tech',
    targetTiers: [T5],
    sortOrder: 4,
  }),
];

const ISSUE_42_DINNER_PROMPTS: DigestDinnerPromptSeedData[] = [
  // T0 (0-3)
  {
    id: 'dp-42-t0-1',
    question: 'What was the silliest animal sound or face that made your toddler giggle the hardest today?',
    parentTip: 'Model one playful animal sound at the table and pause three full seconds for mirroring.',
    followUp: 'Can you show me the quietest little mouse squeak next?',
    targetTiers: [T0],
    sortOrder: 1,
  },
  {
    id: 'dp-42-t0-2',
    question: 'If a tiny puppy sat beside the high chair tonight, which finger food would it sniff first?',
    parentTip: 'Turns mealtime into zero-pressure sensory exploration without nagging about bites.',
    followUp: 'Would the puppy pick soft banana or crunchy toast?',
    targetTiers: [T0],
    sortOrder: 2,
  },
  {
    id: 'dp-42-t0-3',
    question: 'What was one new object our little one pointed at today that caught both of our eyes?',
    parentTip: 'A grounding check-in for co-parents to notice micro-milestones over dinner.',
    followUp: 'What sound did they make when we named it out loud?',
    targetTiers: [T0],
    sortOrder: 3,
  },

  // T1 (4-6)
  {
    id: 'dp-42-t1-1',
    question: 'If your favorite stuffed animal came to school with you today, what part would surprise it most?',
    parentTip: 'Speaking through a playful character lowers pressure compared to "How was school?"',
    followUp: 'Where would it want to sit during story time?',
    targetTiers: [T1],
    sortOrder: 1,
  },
  {
    id: 'dp-42-t1-2',
    question: 'What was one tricky thing your hands or brain practiced today even if it felt wobbly?',
    parentTip: 'Reinforces growth mindset by celebrating persistence rather than perfection.',
    followUp: 'Did it feel easier on the second try or do we want to try again tomorrow?',
    targetTiers: [T1],
    sortOrder: 2,
  },
  {
    id: 'dp-42-t1-3',
    question: 'If we built a blanket fort big enough for dinner, what rule would we paint on the door?',
    parentTip: 'Playful rule-making gives preschoolers positive experience co-designing boundaries.',
    followUp: 'Who gets to pick the secret password?',
    targetTiers: [T1],
    sortOrder: 3,
  },

  // T2 (7-9)
  {
    id: 'dp-42-t2-1',
    question: 'If you could invent one brand-new recess game tomorrow, what would the fairest rule be?',
    parentTip: 'Invites elementary kids to reflect on fairness and social dynamics without feeling interrogated.',
    followUp: 'How would a new kid learn the rules in thirty seconds?',
    targetTiers: [T2],
    sortOrder: 1,
  },
  {
    id: 'dp-42-t2-2',
    question: 'What was the funniest moment in a game or show you saw this week, and what made it clever?',
    parentTip: 'Genuine curiosity about their media world builds trust for tougher tech chats later.',
    followUp: 'Can you show me how that level works after dinner for five minutes?',
    targetTiers: [T2],
    sortOrder: 2,
  },
  {
    id: 'dp-42-t2-3',
    question: 'Who did something unexpectedly kind at school or practice this week?',
    parentTip: 'Trains attention on prosocial peer cues rather than playground drama.',
    followUp: 'What small kind move could we pull off for someone tomorrow?',
    targetTiers: [T2],
    sortOrder: 3,
  },

  // T3 (10-12)
  {
    id: 'dp-42-t3-1',
    question: 'What is one unwritten rule in your grade right now that adults totally misunderstand?',
    parentTip: 'Positions your tween as the cultural guide, listen with warmth and zero eye-rolling.',
    followUp: 'Which part of that rule actually feels fair, and which part feels exhausting?',
    targetTiers: [T3],
    sortOrder: 1,
  },
  {
    id: 'dp-42-t3-2',
    question: 'If you redesigned the school lunch table or group chat to have zero awkwardness, what changes first?',
    parentTip: 'Opens space to talk about belonging and exclusion safely from one step removed.',
    followUp: 'What helps someone feel included quickly when they join a new group?',
    targetTiers: [T3],
    sortOrder: 2,
  },
  {
    id: 'dp-42-t3-3',
    question: 'What was one genuinely funny clip or meme that made your friends laugh this week?',
    parentTip: 'Sharing humor keeps connection light even during a busy pre-teen week.',
    followUp: 'What makes a joke land versus trying too hard?',
    targetTiers: [T3],
    sortOrder: 3,
  },

  // T4 (13-15)
  {
    id: 'dp-42-t4-1',
    question: 'What is one expectation adults put on teens today that feels completely out of date?',
    parentTip: 'Stay genuinely curious and resist defending your generation, listen for what feels heavy.',
    followUp: 'What would a more realistic version of that expectation look like in our house?',
    targetTiers: [T4],
    sortOrder: 1,
  },
  {
    id: 'dp-42-t4-2',
    question: 'When does being reachable on your phone feel helpful, and when does it secretly feel like a chore?',
    parentTip: 'Most teens feel relief admitting instant-reply fatigue when there is zero lecture attached.',
    followUp: 'Would having an automatic evening pause make switching off easier with friends?',
    targetTiers: [T4],
    sortOrder: 2,
  },
  {
    id: 'dp-42-t4-3',
    question: 'What class, hobby, or rabbit hole actually made time fly by this week?',
    parentTip: 'Protects intrinsic curiosity from getting buried under grade-portal stress.',
    followUp: 'What is one tiny detail about it that most people miss?',
    targetTiers: [T4],
    sortOrder: 3,
  },

  // T5 (16-18)
  {
    id: 'dp-42-t5-1',
    question: 'Looking back a year, what is one habit or perspective you are glad you outgrew?',
    parentTip: 'Treats your older teen as a reflective near-adult and models sharing one of your own too.',
    followUp: 'What advice would you give your 14-year-old self about handling stress?',
    targetTiers: [T5],
    sortOrder: 1,
  },
  {
    id: 'dp-42-t5-2',
    question: 'Where did your attention feel sharpest this week, and what stole it fastest?',
    parentTip: 'Frames digital self-regulation as personal agency rather than parental oversight.',
    followUp: 'What small environment tweak would protect your best focus block next week?',
    targetTiers: [T5],
    sortOrder: 2,
  },
  {
    id: 'dp-42-t5-3',
    question: 'If we kept one family tradition even after you move out, which ordinary ritual makes the cut?',
    parentTip: 'Affirms lasting belonging while honoring their upcoming launch into independence.',
    followUp: 'How should we upgrade it together this month?',
    targetTiers: [T5],
    sortOrder: 3,
  },
];

// Strictly ages 7-18 ONLY (ZERO phrases for T0 or T1)
const ISSUE_42_PHRASES: DigestPhraseSeedData[] = [
  // T2 (7-9)
  {
    id: 'ph-42-t2-1',
    word: 'Griefing',
    shortMeaning: 'Wrecking a shared build',
    fullMeaning: 'Deliberately sabotaging another player’s house, bridge, or progress inside Minecraft or Roblox.',
    cringeLevel: 1,
    cringeLabel: 'Normal gaming word',
    calmScript: '"That feels really unfair when you worked hard on it. Want help backing up the world?"',
    targetTiers: [T2],
    sortOrder: 1,
  },
  {
    id: 'ph-42-t2-2',
    word: 'Clutched',
    shortMeaning: 'Last-second save or win',
    fullMeaning: 'Pulling off an unexpected victory or team rescue right when losing looked guaranteed.',
    cringeLevel: 2,
    cringeLabel: 'Fun way to cheer a win',
    calmScript: '"Staying steady when the game got intense took real focus."',
    targetTiers: [T2],
    sortOrder: 2,
  },
  {
    id: 'ph-42-t2-3',
    word: 'No Backsies',
    shortMeaning: 'Recess trades are final',
    fullMeaning: 'Unwritten schoolyard rule that once you agree to a card or toy swap, it cannot be undone.',
    cringeLevel: 1,
    cringeLabel: 'Classic playground phrase',
    calmScript: '"Even with \'no backsies,\' good friends check in when someone felt rushed."',
    targetTiers: [T2],
    sortOrder: 3,
  },

  // T3 (10-12)
  {
    id: 'ph-42-t3-1',
    word: 'Crashout',
    shortMeaning: 'Over-the-top meltdown',
    fullMeaning: 'Losing all cool over a tiny annoyance or game defeat, usually said playfully about dramatic reactions.',
    cringeLevel: 3,
    cringeLabel: 'Understand, skip saying aloud',
    calmScript: '"Sounds like that match got intensely frustrating, want ten minutes to reset?"',
    targetTiers: [T3],
    sortOrder: 1,
  },
  {
    id: 'ph-42-t3-2',
    word: 'Cooked',
    shortMeaning: 'Exhausted or doomed',
    fullMeaning: 'Dramatic shorthand for feeling completely behind, caught, or worn out before a quiz or deadline.',
    cringeLevel: 2,
    cringeLabel: 'Okay with a light smile',
    calmScript: '"You sound stretched thin on that project, want to break step one into ten minutes?"',
    targetTiers: [T3],
    sortOrder: 2,
  },
  {
    id: 'ph-42-t3-3',
    word: 'Aura',
    shortMeaning: 'Unspoken social cool factor',
    fullMeaning: 'Playful imaginary scoreboard of dignity, doing something smooth gains aura, tripping in the hall loses aura.',
    cringeLevel: 3,
    cringeLabel: 'Understand, skip saying aloud',
    calmScript: '"Funny how fast everyone forgets awkward moments even when they feel huge in the hallway."',
    targetTiers: [T3],
    sortOrder: 3,
  },

  // T4 (13-15)
  {
    id: 'ph-42-t4-1',
    word: 'Glazing',
    shortMeaning: 'Over-the-top flattery',
    fullMeaning: 'Teasing someone for praising a celebrity, athlete, or friend way too enthusiastically.',
    cringeLevel: 3,
    cringeLabel: 'Best left to teens',
    calmScript: '"Sounds like they are really enthusiastic about that, what did you think of it?"',
    targetTiers: [T4],
    sortOrder: 1,
  },
  {
    id: 'ph-42-t4-2',
    word: 'Locked In',
    shortMeaning: 'Deeply focused and determined',
    fullMeaning: 'Entering a zone of serious concentration for a big game, exam review, or creative build.',
    cringeLevel: 1,
    cringeLabel: 'Natural for parents too',
    calmScript: '"I can tell you are really locked in on that assignment. I will leave a snack by the door."',
    targetTiers: [T4],
    sortOrder: 2,
  },
  {
    id: 'ph-42-t4-3',
    word: 'Left on Read',
    shortMeaning: 'Seen message, no reply',
    fullMeaning: 'When a read receipt shows a peer opened a message without answering, often stirring tween/teen anxiety.',
    cringeLevel: 1,
    cringeLabel: 'Everyday digital phrase',
    calmScript: '"Silent read receipts feel stingy, even when people are just busy or forgot to hit send."',
    targetTiers: [T4],
    sortOrder: 3,
  },

  // T5 (16-18)
  {
    id: 'ph-42-t5-1',
    word: 'Soft Launch',
    shortMeaning: 'Subtle reveal on social media',
    fullMeaning: 'Hinting at a new relationship, job, or college plan with a low-key cropped photo instead of a big announcement.',
    cringeLevel: 2,
    cringeLabel: 'Fine in casual conversation',
    calmScript: '"It makes sense wanting to keep new things low-pressure while you figure them out."',
    targetTiers: [T5],
    sortOrder: 1,
  },
  {
    id: 'ph-42-t5-2',
    word: 'Delulu',
    shortMeaning: 'Playfully unrealistic optimism',
    fullMeaning: 'Self-deprecating joke about clinging to a wildly optimistic hope, from concert tickets to dream acceptances.',
    cringeLevel: 3,
    cringeLabel: 'Understand, skip saying aloud',
    calmScript: '"Having big hopes is healthy, let us also map a solid backup plan you genuinely like."',
    targetTiers: [T5],
    sortOrder: 2,
  },
  {
    id: 'ph-42-t5-3',
    word: 'Bed Rotting',
    shortMeaning: 'Extended low-energy lounging',
    fullMeaning: 'Spending hours scrolling or resting under the covers to decompress, harmless briefly, worth checking if chronic.',
    cringeLevel: 2,
    cringeLabel: 'Helpful vocabulary to know',
    calmScript: '"Long weeks drain everyone, want a quiet walk or coffee later when you are ready?"',
    targetTiers: [T5],
    sortOrder: 3,
  },
];

// ----------------------------------------------------
// ISSUE #41 (Nov 1 – Nov 8, 2026)
// ----------------------------------------------------

const ISSUE_41_ARTICLES: DigestArticleSeedData[] = [
  // T0
  makeExternalArticle({
    id: 'art-41-t0-1',
    publisher: 'ztt',
    sourceUrl: 'https://www.zerotothree.org/resource/toddlers-and-challenging-behavior-why-they-do-it-and-how-to-respond/',
    publishedAt: '2026-11-06T14:00:00.000Z',
    topicLabel: 'Emotional Regulation',
    readMinutes: 4,
    title: 'Why toddler biting and hitting are communication, not defiance',
    summary:
      'ZERO TO THREE explains how immature language circuits leave eighteen- to thirty-month-olds leaning on physical impulses when overwhelmed, and how calm blocking teaches safer words.',
    keyShift: 'Block the hand gently, drop your voice low, and hand them the exact two-word phrase they needed.',
    targetTiers: [T0],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-41-t0-2',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/toddler/nutrition/Pages/Selecting-Snacks-for-Toddlers.aspx',
    publishedAt: '2026-11-04T11:30:00.000Z',
    topicLabel: 'Sleep & Routines',
    readMinutes: 3,
    title: 'Predictable snack rhythms that end toddler grazing battles',
    summary:
      'HealthyChildren.org explains why spacing structured mini-meals every two to three hours lets toddlers arrive genuinely hungry to the family table without power struggles.',
    keyShift: 'Serve snacks seated at the table rather than walking around with open pouches.',
    targetTiers: [T0],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-41-t0-3',
    publisher: 'harvard',
    sourceUrl: 'https://developingchild.harvard.edu/resources/inbrief-executive-function/',
    publishedAt: '2026-11-02T15:00:00.000Z',
    topicLabel: 'Play & Learning',
    readMinutes: 4,
    title: 'Building tiny waiting muscles through peek-a-boo and simple songs',
    summary:
      'Harvard’s Developing Child center shows how rhythmic turn-taking games build early working memory and impulse regulation well before preschool.',
    keyShift: 'Pause two extra beats before the surprise line of a song so your toddler practices anticipation.',
    targetTiers: [T0],
    isLead: false,
    sortOrder: 3,
  }),

  // T1
  makeExternalArticle({
    id: 'art-41-t1-1',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/helping-preschoolers-manage-big-emotions/',
    publishedAt: '2026-11-06T12:00:00.000Z',
    topicLabel: 'Emotional Regulation',
    readMinutes: 4,
    title: 'Helping four- and five-year-olds name big feelings before bedtime',
    summary:
      'Child Mind Institute therapists share playful visual cues that help preschoolers spot frustration early before tears escalate into bedtime stalling.',
    keyShift: 'Practice feeling words during calm afternoon play, never for the first time mid-tantrum.',
    targetTiers: [T1],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-41-t1-2',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/preschool/Pages/Power-of-Play.aspx',
    publishedAt: '2026-11-04T16:15:00.000Z',
    topicLabel: 'Play & Learning',
    readMinutes: 3,
    title: 'Why doctors literally prescribe unstructured outdoor play',
    summary:
      'AAP pediatricians outline how climbing, balancing, and muddy loose-parts play calibrate preschool vestibular systems and deepen nighttime sleep.',
    keyShift: 'Aim for thirty minutes of outdoor free movement before afternoon indoor transitions.',
    targetTiers: [T1],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-41-t1-3',
    publisher: 'csm',
    sourceUrl: 'https://www.commonsensemedia.org/articles/how-to-choose-quality-kids-apps',
    publishedAt: '2026-11-03T10:00:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 4,
    title: 'Spotting dark-pattern reward popups inside preschool tablet apps',
    summary:
      'Common Sense Media breaks down how coin chests and countdown badges pressure young kids, and how to pick ad-free, open-ended creative apps instead.',
    keyShift: 'Prefer offline drawing or storytelling apps with zero pop-up stores or daily streak timers.',
    targetTiers: [T1],
    isLead: false,
    sortOrder: 3,
  }),

  // T2
  makeExternalArticle({
    id: 'art-41-t2-1',
    publisher: 'csm',
    sourceUrl: 'https://www.commonsensemedia.org/articles/in-app-purchases-and-loot-boxes-explained',
    publishedAt: '2026-11-07T09:30:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 4,
    title: 'Explaining virtual currency and mystery prize wheels to 8-year-olds',
    summary:
      'Common Sense Media demystifies how mystery eggs and spinning reward wheels borrow casino cues to nudge Robux requests, giving parents clear language to teach media literacy.',
    keyShift: 'Turn virtual coin prices into real-world allowances together so kids see the true tradeoff.',
    targetTiers: [T2],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-41-t2-2',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/how_to_help_kids_handle_losing',
    publishedAt: '2026-11-05T13:45:00.000Z',
    topicLabel: 'Social & Peers',
    readMinutes: 3,
    title: 'Coaching sore losers through board games and weekend sports',
    summary:
      'Greater Good Magazine explains why elementary children feel intense physical sting after losing and how calm co-regulation builds resilient sportsmanship.',
    keyShift: 'Skip lecturing on the sideline, validate the sting first and debrief playfully over dinner.',
    targetTiers: [T2],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-41-t2-3',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/healthy-living/sleep/Pages/Healthy-Sleep-Habits-How-Many-Hours-Does-Your-Child-Need.aspx',
    publishedAt: '2026-11-02T17:00:00.000Z',
    topicLabel: 'Sleep & Routines',
    readMinutes: 3,
    title: 'Protecting 10 hours of sleep during busy elementary sports seasons',
    summary:
      'Pediatric sleep specialists show how even forty-five minutes of nightly sleep debt mimics attention struggles in second and third grade classrooms.',
    keyShift: 'Power down stimulating games at least one full hour before lights out.',
    targetTiers: [T2],
    isLead: false,
    sortOrder: 3,
  }),

  // T3
  makeExternalArticle({
    id: 'art-41-t3-1',
    publisher: 'csm',
    sourceUrl: 'https://www.commonsensemedia.org/articles/youtube-shorts-and-tweens',
    publishedAt: '2026-11-06T15:30:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 4,
    title: 'Why endless short-form loops leave tweens snappy when screens turn off',
    summary:
      'Common Sense Media unpacks how rapid 30-second video swipes spike dopamine anticipation and make ordinary afternoon transitions feel abruptly irritating for ten- to twelve-year-olds.',
    keyShift: 'Favor full-length creator videos watched on a shared TV over solo vertical swipe feeds.',
    targetTiers: [T3],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-41-t3-2',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/helping-tweens-build-friendship-skills/',
    publishedAt: '2026-11-04T14:20:00.000Z',
    topicLabel: 'Social & Peers',
    readMinutes: 4,
    title: 'Navigating shifting middle-school friend groups with steady calm',
    summary:
      'Child Mind Institute notes that friendship reshuffling in fifth and sixth grade is developmentally normal, even when it feels devastating to your tween.',
    keyShift: 'Avoid bad-mouthing former friends, stay steady while helping your tween diversify activities.',
    targetTiers: [T3],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-41-t3-3',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/gradeschool/puberty/Pages/Physical-Development-of-School-Age-Children.aspx',
    publishedAt: '2026-11-02T12:00:00.000Z',
    topicLabel: 'Emotional Regulation',
    readMinutes: 4,
    title: 'Early adrenarche: why mood waves start years before visible puberty',
    summary:
      'HealthyChildren.org explains how quiet adrenal hormone shifts around age ten amplify emotional sensitivity and privacy needs long before high school.',
    keyShift: 'Knock before entering their room and treat eye-rolls as nervous-system friction, not disrespect.',
    targetTiers: [T3],
    isLead: false,
    sortOrder: 3,
  }),

  // T4
  makeExternalArticle({
    id: 'art-41-t4-1',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/why_teens_need_parents_more_than_they_show',
    publishedAt: '2026-11-06T16:45:00.000Z',
    topicLabel: 'Family Communication',
    readMinutes: 5,
    title: 'Why teens push away on the surface while watching your reaction closely',
    summary:
      'Greater Good Magazine summarizes adolescent attachment studies revealing that steady parental warmth remains the strongest protective factor against peer pressure at ages 13–15.',
    keyShift: 'Stay available for late-night kitchen chats even if they gave one-word answers at 4 PM.',
    targetTiers: [T4],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-41-t4-2',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/teen/fitness/Pages/Energy-Drinks-and-Teens.aspx',
    publishedAt: '2026-11-04T10:30:00.000Z',
    topicLabel: 'Sleep & Routines',
    readMinutes: 3,
    title: 'High-caffeine energy cans and afternoon anxiety spikes in teens',
    summary:
      'AAP pediatricians explain how trendy 200mg canned energy drinks marketed via streamers linger past midnight and compound adolescent circadian delay.',
    keyShift: 'Compare caffeine labels side by side calmly and stock chilled sparkling alternatives at home.',
    targetTiers: [T4],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-41-t4-3',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/how-to-help-teens-manage-social-comparison/',
    publishedAt: '2026-11-03T15:10:00.000Z',
    topicLabel: 'Social & Peers',
    readMinutes: 4,
    title: 'Interrupting algorithm-driven body and status comparison calmly',
    summary:
      'Clinicians share practical media-literacy questions that help young teens notice how filtered feeds monetize insecurity without shaming their interest in style or fitness.',
    keyShift: 'Audit feed recommendations together by asking "How does this account make you feel five minutes later?"',
    targetTiers: [T4],
    isLead: false,
    sortOrder: 3,
  }),

  // T5
  makeExternalArticle({
    id: 'art-41-t5-1',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/supporting-teens-through-college-and-career-decisions/',
    publishedAt: '2026-11-07T11:00:00.000Z',
    topicLabel: 'School & Focus',
    readMinutes: 5,
    title: 'Lowering the temperature around senior-year admissions and next steps',
    summary:
      'Child Mind Institute encourages families to designate one weekly logistics meeting so college or career talk stops colonizing every dinner and car ride.',
    keyShift: 'Contain applications talk to one agreed 30-minute Sunday slot so the rest of the week stays relational.',
    targetTiers: [T5],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-41-t5-2',
    publisher: 'csm',
    sourceUrl: 'https://www.commonsensemedia.org/articles/digital-footprint-guide-for-teens',
    publishedAt: '2026-11-05T12:30:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 4,
    title: 'Practical digital reputation hygiene for jobs, athletics, and scholarships',
    summary:
      'Common Sense Media offers a calm ten-minute privacy checklist older teens can run themselves to archive old public posts and tighten account permissions.',
    keyShift: 'Invite them to search their own name once a year as an empowering adult-readiness habit.',
    targetTiers: [T5],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-41-t5-3',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/helping_older_teens_build_real_world_community',
    publishedAt: '2026-11-02T14:00:00.000Z',
    topicLabel: 'Social & Peers',
    readMinutes: 4,
    title: 'Why part-time work and mentoring build genuine teen purpose',
    summary:
      'UC Berkeley researchers highlight how contributing to real-world workplaces or coaching younger kids lowers late-adolescent loneliness more reliably than passive social apps.',
    keyShift: 'Celebrate responsibility outside academics as equally valuable evidence of maturity.',
    targetTiers: [T5],
    isLead: false,
    sortOrder: 3,
  }),
];

// Issue #41 uses 100% distinct YouTube video IDs from Issue #42!
const ISSUE_41_VIDEOS: DigestVideoSeedData[] = [
  makeVerifiedVideo({
    id: 'vid-41-t0-1',
    lessonSlug: 'toddler-floor-level-vagal-grounding',
    publishedAt: '2026-11-06T11:00:00.000Z',
    formatLabel: 'Brain Model',
    targetTiers: [T0, T1],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-41-t0-2',
    lessonSlug: 'infant-somatic-soothing-sequence',
    publishedAt: '2026-11-04T15:00:00.000Z',
    formatLabel: 'Soothing Guide',
    targetTiers: [T0],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-41-t0-3',
    lessonSlug: 'older-toddler-food-neophobia-evolution',
    publishedAt: '2026-11-02T10:00:00.000Z',
    formatLabel: 'Mealtime Peace',
    targetTiers: [T0, T1],
    sortOrder: 3,
  }),
  makeVerifiedVideo({
    id: 'vid-41-t1-2',
    lessonSlug: 'older-toddler-open-ended-blocks',
    publishedAt: '2026-11-05T13:00:00.000Z',
    formatLabel: '6-Min Science',
    targetTiers: [T1, T2],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-41-t2-1',
    lessonSlug: 'toddler-climbing-crash-pad',
    publishedAt: '2026-11-06T14:00:00.000Z',
    formatLabel: '5-Min Shift',
    targetTiers: [T2, T3],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-41-t2-3',
    lessonSlug: 'elementary-after-school-decompression',
    publishedAt: '2026-11-03T16:00:00.000Z',
    formatLabel: 'Deep Dive Talk',
    targetTiers: [T2, T3],
    sortOrder: 3,
  }),
  makeVerifiedVideo({
    id: 'vid-41-t3-2',
    lessonSlug: 'tween-adrenarche-and-dhea-neurobiology',
    publishedAt: '2026-11-05T18:00:00.000Z',
    formatLabel: 'Expert Q&A',
    targetTiers: [T3, T4, T5],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-41-t4-1',
    lessonSlug: 'toddler-biting-hitting-redirect',
    publishedAt: '2026-11-07T09:00:00.000Z',
    formatLabel: 'Repair Strategy',
    targetTiers: [T4, T5],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-41-t4-3',
    lessonSlug: 'older-toddler-two-choice-autonomy',
    publishedAt: '2026-11-02T17:00:00.000Z',
    formatLabel: 'Calm Limits',
    targetTiers: [T4, T5],
    sortOrder: 3,
  }),
];

const ISSUE_41_DINNER_PROMPTS: DigestDinnerPromptSeedData[] = [
  {
    id: 'dp-41-t0-1',
    question: 'Which texture on the plate tonight feels squishy, and which one makes a loud crunch?',
    parentTip: 'Describing sensory properties invites curious tasting without pressure.',
    followUp: 'Can we tap the crunchy piece gently on our plate like a drum?',
    targetTiers: [T0],
    sortOrder: 1,
  },
  {
    id: 'dp-41-t0-2',
    question: 'Who did we wave hello to on our walk or errands today?',
    parentTip: 'Replaying tiny familiar scenes strengthens toddler narrative memory.',
    followUp: 'Did the dog or the mail truck make a bigger noise?',
    targetTiers: [T0],
    sortOrder: 2,
  },
  {
    id: 'dp-41-t0-3',
    question: 'What song should we sing slowly while we put on pajamas tonight?',
    parentTip: 'Giving a simple two-song choice eases bedtime resistance cleanly.',
    followUp: 'Should we sing it in a whisper voice or a sleepy bear voice?',
    targetTiers: [T0],
    sortOrder: 3,
  },
  {
    id: 'dp-41-t1-1',
    question: 'If your feelings today were weather, sunny, breezy, or thunderclouds, what was the forecast?',
    parentTip: 'Weather metaphors make big preschool emotions concrete and non-shaming.',
    followUp: 'What helped the clouds pass when it got stormy?',
    targetTiers: [T1],
    sortOrder: 1,
  },
  {
    id: 'dp-41-t1-2',
    question: 'What would you build first if we had a giant pile of cardboard boxes in the living room?',
    parentTip: 'Sparks executive-function planning while keeping dinner light and playful.',
    followUp: 'Who gets to ride inside it first?',
    targetTiers: [T1],
    sortOrder: 2,
  },
  {
    id: 'dp-41-t1-3',
    question: 'What is one helpful job you felt proud doing with your own two hands today?',
    parentTip: 'Highlights competence and belonging inside the household team.',
    followUp: 'Which grown-up job do you want to try helping with tomorrow?',
    targetTiers: [T1],
    sortOrder: 3,
  },
  {
    id: 'dp-41-t2-1',
    question: 'If you designed a fair video game shop, what would be free for everyone and what would kids earn by playing?',
    parentTip: 'Sparks natural critical thinking about virtual currency and game design.',
    followUp: 'Why do you think some games make rare items take so long to unlock?',
    targetTiers: [T2],
    sortOrder: 1,
  },
  {
    id: 'dp-41-t2-2',
    question: 'What was one moment today where you felt proud of keeping your cool?',
    parentTip: 'Reinforces emotional regulation wins that often go unnoticed.',
    followUp: 'What helped your body settle down in that moment?',
    targetTiers: [T2],
    sortOrder: 2,
  },
  {
    id: 'dp-41-t2-3',
    question: 'If our family tried a brand-new board game or outdoor hobby this weekend, what gets your vote?',
    parentTip: 'Co-creating offline fun lowers the pull of default weekend screens.',
    followUp: 'What snacks should we declare official tournament fuel?',
    targetTiers: [T2],
    sortOrder: 3,
  },
  {
    id: 'dp-41-t3-1',
    question: 'Which video or channel actually taught you something cool this week instead of just eating time?',
    parentTip: 'Distinguishes nourishing curiosity from mindless autoplay without shaming screens.',
    followUp: 'What made that creator worth subscribing to?',
    targetTiers: [T3],
    sortOrder: 1,
  },
  {
    id: 'dp-41-t3-2',
    question: 'What makes a friend feel genuinely trustworthy in middle school?',
    parentTip: 'Encourages tweens to articulate values before social drama tests them.',
    followUp: 'How do you spot when someone is just performing for the group?',
    targetTiers: [T3],
    sortOrder: 2,
  },
  {
    id: 'dp-41-t3-3',
    question: 'What is one thing our household gets right, and one tiny routine you would tweak?',
    parentTip: 'Inviting constructive feedback builds bilateral pact muscles early.',
    followUp: 'How could we test your tweak for one week?',
    targetTiers: [T3],
    sortOrder: 3,
  },
  {
    id: 'dp-41-t4-1',
    question: 'What trend or brand is everyone hyped about at school right now that feels totally overblown to you?',
    parentTip: 'Teens love sharing sharp cultural commentary when parents listen as equals.',
    followUp: 'How long do you give that trend before everyone moves on?',
    targetTiers: [T4],
    sortOrder: 1,
  },
  {
    id: 'dp-41-t4-2',
    question: 'What actually recharges your battery after a loud school week?',
    parentTip: 'Helps adolescents distinguish real rest from numbing late-night scrolling.',
    followUp: 'How can we protect more of that recharge time this Sunday?',
    targetTiers: [T4],
    sortOrder: 2,
  },
  {
    id: 'dp-41-t4-3',
    question: 'If you could shadow any interesting adult job for one day, which one would you pick?',
    parentTip: 'Explores identity and curiosity without college-pressure undertones.',
    followUp: 'What part of that job looks fun versus tedious?',
    targetTiers: [T4],
    sortOrder: 3,
  },
  {
    id: 'dp-41-t5-1',
    question: 'What is one adult skill nobody teaches in high school that you want to master before leaving home?',
    parentTip: 'Invites collaborative skill-building, from budgeting to cooking, on their terms.',
    followUp: 'Want to tackle a starter version of it together next weekend?',
    targetTiers: [T5],
    sortOrder: 1,
  },
  {
    id: 'dp-41-t5-2',
    question: 'Who outside our family has been a solid mentor or grounding voice for you lately?',
    parentTip: 'Celebrates the broader web of healthy adults supporting their launch.',
    followUp: 'What do you appreciate most about how they treat you?',
    targetTiers: [T5],
    sortOrder: 2,
  },
  {
    id: 'dp-41-t5-3',
    question: 'What is one boundary you want to hold better for your own peace of mind this month?',
    parentTip: 'Models healthy self-advocacy rather than people-pleasing burnout.',
    followUp: 'How can we back you up without hovering?',
    targetTiers: [T5],
    sortOrder: 3,
  },
];

const ISSUE_41_PHRASES: DigestPhraseSeedData[] = [
  // T2
  {
    id: 'ph-41-t2-1',
    word: 'Nerfed / Buffed',
    shortMeaning: 'Weakened or boosted in an update',
    fullMeaning: 'When game designers tune a character or tool down (nerfed) or up (buffed) to keep matches fair.',
    cringeLevel: 2,
    cringeLabel: 'Playful for game talk',
    calmScript: '"Sounds like they wanted matches to stay fair. Do you agree with the change?"',
    targetTiers: [T2],
    sortOrder: 1,
  },
  {
    id: 'ph-41-t2-2',
    word: 'Duping',
    shortMeaning: 'Glitching to copy rare items',
    fullMeaning: 'Exploiting a game bug to duplicate rare items rather than earning them through normal play.',
    cringeLevel: 1,
    cringeLabel: 'Normal gaming term',
    calmScript: '"Do shortcuts feel as satisfying as actually earning the item yourself?"',
    targetTiers: [T2],
    sortOrder: 2,
  },
  {
    id: 'ph-41-t2-3',
    word: 'Spawn Camping',
    shortMeaning: 'Waiting unfairly at respawn',
    fullMeaning: 'Hovering right where defeated players reappear so they cannot move, widely seen as poor sportsmanship.',
    cringeLevel: 1,
    cringeLabel: 'Normal gaming term',
    calmScript: '"Good sportsmanship means giving everyone a fair step back into the game."',
    targetTiers: [T2],
    sortOrder: 3,
  },
  // T3
  {
    id: 'ph-41-t3-1',
    word: 'Brainrot',
    shortMeaning: 'Absurd repetitive meme humor',
    fullMeaning: 'Self-aware joke tweens use for goofy, fast-looping internet videos that feel silly and hypnotic.',
    cringeLevel: 2,
    cringeLabel: 'Funny to understand',
    calmScript: '"Even your brain knows when a feed gets too noisy, want to switch to something real?"',
    targetTiers: [T3],
    sortOrder: 1,
  },
  {
    id: 'ph-41-t3-2',
    word: 'Mid',
    shortMeaning: 'Average or underwhelming',
    fullMeaning: 'Casual shorthand for anything mediocre, from cafeteria pizza to a hyped movie sequel.',
    cringeLevel: 2,
    cringeLabel: 'Okay in light banter',
    calmScript: '"What would have upgraded it from mid to genuinely great?"',
    targetTiers: [T3],
    sortOrder: 2,
  },
  {
    id: 'ph-41-t3-3',
    word: 'No Cap',
    shortMeaning: 'Seriously / no lie',
    fullMeaning: 'Emphasis meaning "I am being completely honest" at the end of a claim or compliment.',
    cringeLevel: 3,
    cringeLabel: 'Understand, skip saying aloud',
    calmScript: '"I hear you, you are being completely serious about that."',
    targetTiers: [T3],
    sortOrder: 3,
  },
  // T4
  {
    id: 'ph-41-t4-1',
    word: 'Gatekeeping',
    shortMeaning: 'Hiding a cool spot or source',
    fullMeaning: 'Playfully refusing to share where you bought a jacket or discovered an indie band so it stays niche.',
    cringeLevel: 1,
    cringeLabel: 'Widely used across ages',
    calmScript: '"Haha, fair enough, keep your secret playlist safe if you want!"',
    targetTiers: [T4],
    sortOrder: 1,
  },
  {
    id: 'ph-41-t4-2',
    word: 'NPC Energy',
    shortMeaning: 'On autopilot or awkward',
    fullMeaning: 'Comparing someone acting stiffly or repetitively to a non-playable background video game character.',
    cringeLevel: 3,
    cringeLabel: 'Understand, skip saying aloud',
    calmScript: '"Wait, is that playful teasing or did someone actually feel left out?"',
    targetTiers: [T4],
    sortOrder: 2,
  },
  {
    id: 'ph-41-t4-3',
    word: 'Touch Grass',
    shortMeaning: 'Step offline and reset',
    fullMeaning: 'Humorous nudge telling someone who is way too heated about online drama to step outside into real life.',
    cringeLevel: 2,
    cringeLabel: 'Playful shared reset cue',
    calmScript: '"Honestly, we could both use ten minutes outside right now."',
    targetTiers: [T4],
    sortOrder: 3,
  },
  // T5
  {
    id: 'ph-41-t5-1',
    word: 'Hard Launch',
    shortMeaning: 'Public official reveal',
    fullMeaning: 'Posting an unmistakable public announcement of a relationship, project, or milestone.',
    cringeLevel: 2,
    cringeLabel: 'Fine in casual talk',
    calmScript: '"You never owe the whole internet a public update before you feel ready."',
    targetTiers: [T5],
    sortOrder: 1,
  },
  {
    id: 'ph-41-t5-2',
    word: 'Chronically Online',
    shortMeaning: 'Lost in internet discourse',
    fullMeaning: 'Spending so much time in niche feeds that tiny online arguments start feeling like real-world emergencies.',
    cringeLevel: 1,
    cringeLabel: 'Useful shared shorthand',
    calmScript: '"It is wild how quickly internet arguments shrink when you step back into real life."',
    targetTiers: [T5],
    sortOrder: 2,
  },
  {
    id: 'ph-41-t5-3',
    word: 'Green Flag',
    shortMeaning: 'Healthy, respectful sign',
    fullMeaning: 'A positive behavior signaling emotional maturity, reliability, or kindness in a friend or partner.',
    cringeLevel: 1,
    cringeLabel: 'Natural for parents too',
    calmScript: '"Noticing green flags early is a huge life skill, what stood out about how they handled it?"',
    targetTiers: [T5],
    sortOrder: 3,
  },
];

// ----------------------------------------------------
// ISSUE #40 (Oct 25 – Nov 1, 2026)
// ----------------------------------------------------

const ISSUE_40_ARTICLES: DigestArticleSeedData[] = [
  // T0
  makeExternalArticle({
    id: 'art-40-t0-1',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/toddler/toilet-training/Pages/The-Right-Age-to-Toilet-Train.aspx',
    publishedAt: '2026-10-30T14:00:00.000Z',
    topicLabel: 'Sleep & Routines',
    readMinutes: 4,
    title: 'Reading genuine potty readiness cues without rushing the calendar',
    summary:
      'HealthyChildren.org outlines physical and emotional readiness signals between 18 and 36 months, explaining why skipping pressure prevents months of withholding struggles.',
    keyShift: 'Wait for dry stretches plus genuine curiosity rather than picking a holiday deadline.',
    targetTiers: [T0],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-40-t0-2',
    publisher: 'ztt',
    sourceUrl: 'https://www.zerotothree.org/resource/how-to-support-your-childs-communication-skills/',
    publishedAt: '2026-10-28T11:00:00.000Z',
    topicLabel: 'Play & Learning',
    readMinutes: 3,
    title: 'Everyday book sharing that sparks toddler vocabulary bursts',
    summary:
      'ZERO TO THREE recommends lingering on pictures your child points to rather than rushing to finish every page of a board book.',
    keyShift: 'Follow their finger on the page and pause five seconds so they can lead the story.',
    targetTiers: [T0],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-40-t0-3',
    publisher: 'harvard',
    sourceUrl: 'https://developingchild.harvard.edu/resources/play-in-early-childhood/',
    publishedAt: '2026-10-26T15:30:00.000Z',
    topicLabel: 'Play & Learning',
    readMinutes: 3,
    title: 'Why simple household objects outperform noisy electronic toys',
    summary:
      'Research from Harvard shows that wooden spoons, nesting bowls, and scarves invite open-ended experimentation far longer than single-button plastic toys.',
    keyShift: 'Rotate five simple floor toys weekly so cluttered rooms stay calm and inviting.',
    targetTiers: [T0],
    isLead: false,
    sortOrder: 3,
  }),

  // T1
  makeExternalArticle({
    id: 'art-40-t1-1',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/how_to_teach_preschoolers_empathy',
    publishedAt: '2026-10-30T10:30:00.000Z',
    topicLabel: 'Social & Peers',
    readMinutes: 4,
    title: 'Growing real preschool empathy beyond forced "say sorry" scripts',
    summary:
      'Greater Good Magazine shows why inviting a five-year-old to notice a friend’s face and offer a repair builds genuine empathy faster than coerced apologies.',
    keyShift: 'Ask "How can we help check on your friend?" once both kids have caught their breath.',
    targetTiers: [T1],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-40-t1-2',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/preschool/nutrition-fitness/Pages/Picky-Eaters.aspx',
    publishedAt: '2026-10-28T13:15:00.000Z',
    topicLabel: 'Sleep & Routines',
    readMinutes: 3,
    title: 'Lowering dinner-table pressure during picky preschool phases',
    summary:
      'AAP pediatricians reassure parents that cautious eating at ages four to six is normal, and keeping one familiar food on every plate prevents mealtime standoffs.',
    keyShift: 'Keep food descriptions neutral, never tie dessert to cleaning a plate.',
    targetTiers: [T1],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-40-t1-3',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/managing-separation-anxiety-in-preschoolers/',
    publishedAt: '2026-10-26T09:45:00.000Z',
    topicLabel: 'Emotional Regulation',
    readMinutes: 4,
    title: 'Short, warm drop-off rituals that ease preschool morning clinginess',
    summary:
      'Child Mind Institute outlines how a predictable three-beat goodbye, hug, special wave, confident exit, reassures young nervous systems far better than lingering.',
    keyShift: 'Never sneak away silently; keep goodbyes brief, warm, and rock-steady.',
    targetTiers: [T1],
    isLead: false,
    sortOrder: 3,
  }),

  // T2
  makeExternalArticle({
    id: 'art-40-t2-1',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/how-to-help-kids-with-homework-frustration/',
    publishedAt: '2026-10-30T16:00:00.000Z',
    topicLabel: 'School & Focus',
    readMinutes: 4,
    title: 'Turning kitchen-table homework battles into short focused sprints',
    summary:
      'Child Mind Institute recommends breaking third-grade assignments into ten-minute movement-backed blocks so depleted after-school brains stay regulated.',
    keyShift: 'Sit nearby doing your own quiet reading rather than hovering over every pencil stroke.',
    targetTiers: [T2],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-40-t2-2',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/why_boredom_is_good_for_kids',
    publishedAt: '2026-10-28T15:00:00.000Z',
    topicLabel: 'Play & Learning',
    readMinutes: 3,
    title: 'Letting seven- to nine-year-olds cross the five-minute boredom bridge',
    summary:
      'Developmental psychologists observe that when parents resist immediately entertaining boredom, kids unlock deeper imaginative projects and cardboard engineering.',
    keyShift: 'Respond to "I am bored" with warm confidence: "I cannot wait to see what you invent."',
    targetTiers: [T2],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-40-t2-3',
    publisher: 'csm',
    sourceUrl: 'https://www.commonsensemedia.org/articles/minecraft-guide-for-parents',
    publishedAt: '2026-10-26T12:20:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 4,
    title: 'Making Minecraft a creative sandbox instead of a bedtime argument',
    summary:
      'Common Sense Media highlights how agreeing on clear save-and-stop cues, like finishing the current daylight cycle, eliminates sudden shutdown meltdowns.',
    keyShift: 'Give a five-minute landing warning tied to a natural in-game pause point.',
    targetTiers: [T2],
    isLead: false,
    sortOrder: 3,
  }),

  // T3
  makeExternalArticle({
    id: 'art-40-t3-1',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/family-life/Media/Pages/Digital-Citizenship.aspx',
    publishedAt: '2026-10-30T13:00:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 4,
    title: 'Coaching digital kindness before your tween joins their first group chat',
    summary:
      'HealthyChildren.org encourages rehearsing real scenarios, screenshots, pile-ons, and misread sarcasm, so tweens enter messaging spaces with practical integrity.',
    keyShift: 'Practice reading ambiguous texts out loud in two different tones to show how easily meaning twists.',
    targetTiers: [T3],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-40-t3-2',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/executive-functioning-in-middle-school/',
    publishedAt: '2026-10-28T14:40:00.000Z',
    topicLabel: 'School & Focus',
    readMinutes: 4,
    title: 'Scaffolding locker, backpack, and planner habits in fifth and sixth grade',
    summary:
      'Clinicians note that sudden middle-school independence outpaces executive-function wiring, making light Sunday backpack resets a huge weekly stress reliever.',
    keyShift: 'Do a five-minute Sunday checklist side-by-side instead of Thursday night emergency rescues.',
    targetTiers: [T3],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-40-t3-3',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/building_self_compassion_in_tweens',
    publishedAt: '2026-10-26T16:10:00.000Z',
    topicLabel: 'Emotional Regulation',
    readMinutes: 3,
    title: 'Modeling self-compassion when pre-teens become harsh self-critics',
    summary:
      'Greater Good Magazine shows that tweens mirror how parents talk about their own mistakes far more than motivational pep talks.',
    keyShift: 'Narrate one small mistake you made today calmly out loud so imperfection feels safe at home.',
    targetTiers: [T3],
    isLead: false,
    sortOrder: 3,
  }),

  // T4
  makeExternalArticle({
    id: 'art-40-t4-1',
    publisher: 'csm',
    sourceUrl: 'https://www.commonsensemedia.org/articles/helping-teens-manage-notifications',
    publishedAt: '2026-10-30T15:15:00.000Z',
    topicLabel: 'Media & Tech',
    readMinutes: 4,
    title: 'Taming 200 daily phone pings so teens reclaim deep focus',
    summary:
      'Common Sense Media data shows average teens receive hundreds of alerts daily; switching non-human app alerts off cuts distraction dramatically without taking the phone away.',
    keyShift: 'Co-audit notification settings once: keep real humans on, silence algorithmic badges.',
    targetTiers: [T4],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-40-t4-2',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/teen/Pages/Stages-of-Adolescence.aspx',
    publishedAt: '2026-10-28T11:45:00.000Z',
    topicLabel: 'Family Communication',
    readMinutes: 4,
    title: 'Why your 14-year-old argues about small things to practice autonomy',
    summary:
      'HealthyChildren.org reframes harmless adolescent pushback as safe sparring inside a secure home base rather than personal hostility.',
    keyShift: 'Save your firm "no" for health, sleep, and safety, let style and minor preferences go.',
    targetTiers: [T4],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-40-t4-3',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/why_sleep_matters_for_teen_mental_health',
    publishedAt: '2026-10-26T17:30:00.000Z',
    topicLabel: 'Sleep & Routines',
    readMinutes: 4,
    title: 'Working with biological teen circadian shift instead of fighting it',
    summary:
      'Sleep researchers explain why teen melatonin naturally shifts nearly two hours later, making morning sunlight and dim bedroom cues essential allies.',
    keyShift: 'Keep weekend wake-ups within ninety minutes of school days to prevent Monday jet lag.',
    targetTiers: [T4],
    isLead: false,
    sortOrder: 3,
  }),

  // T5
  makeExternalArticle({
    id: 'art-40-t5-1',
    publisher: 'gg',
    sourceUrl: 'https://greatergood.berkeley.edu/article/item/how_to_talk_to_older_teens_about_money',
    publishedAt: '2026-10-30T12:00:00.000Z',
    topicLabel: 'Family Communication',
    readMinutes: 4,
    title: 'Transparent household money conversations that prepare 17-year-olds well',
    summary:
      'Greater Good Magazine outlines how involving older teens in real grocery budgets, subscription audits, and savings goals builds financial confidence without fear.',
    keyShift: 'Walk through one real monthly household bill together calmly to demystify adult budgets.',
    targetTiers: [T5],
    isLead: true,
    sortOrder: 1,
  }),
  makeExternalArticle({
    id: 'art-40-t5-2',
    publisher: 'aap',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/young-adult/Pages/Transitioning-to-Adult-Health-Care.aspx',
    publishedAt: '2026-10-28T10:20:00.000Z',
    topicLabel: 'Sleep & Routines',
    readMinutes: 4,
    title: 'Coaching older teens to book and lead their own doctor visits',
    summary:
      'AAP recommends practicing solo check-ins during late high school so young adults know their health history, pharmacy refills, and insurance basics before moving away.',
    keyShift: 'Have your teen call to schedule their next dental or sports physical while you sit nearby.',
    targetTiers: [T5],
    isLead: false,
    sortOrder: 2,
  }),
  makeExternalArticle({
    id: 'art-40-t5-3',
    publisher: 'cmi',
    sourceUrl: 'https://childmind.org/article/healthy-relationships-for-teens/',
    publishedAt: '2026-10-26T14:15:00.000Z',
    topicLabel: 'Social & Peers',
    readMinutes: 4,
    title: 'Talking openly about digital boundaries in teen dating and friendships',
    summary:
      'Child Mind Institute highlights why discussing location-sharing norms and password privacy calmly helps older teens recognize healthy respect versus controlling habits.',
    keyShift: 'Affirm that real trust never demands live location tracking or instant reply proof.',
    targetTiers: [T5],
    isLead: false,
    sortOrder: 3,
  }),
];

const ISSUE_40_VIDEOS: DigestVideoSeedData[] = [
  makeVerifiedVideo({
    id: 'vid-40-t0-1',
    lessonSlug: 'older-toddler-toilet-readiness-test',
    publishedAt: '2026-10-30T10:00:00.000Z',
    formatLabel: 'Pediatrician Guide',
    targetTiers: [T0],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-40-t0-2',
    lessonSlug: 'tummy-time-without-tears',
    publishedAt: '2026-10-28T14:00:00.000Z',
    formatLabel: 'Brain Science',
    targetTiers: [T0, T1],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-40-t1-1',
    lessonSlug: 'older-toddler-open-ended-blocks',
    publishedAt: '2026-10-29T11:00:00.000Z',
    formatLabel: '6-Min Science',
    targetTiers: [T1],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-40-t2-1',
    lessonSlug: 'elementary-post-game-decompression',
    publishedAt: '2026-10-30T12:00:00.000Z',
    formatLabel: 'Digital Mentoring',
    targetTiers: [T2, T3],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-40-t2-2',
    lessonSlug: 'toddler-climbing-crash-pad',
    publishedAt: '2026-10-27T15:00:00.000Z',
    formatLabel: '5-Min Mindset',
    targetTiers: [T2, T3],
    sortOrder: 2,
  }),
  makeVerifiedVideo({
    id: 'vid-40-t4-1',
    lessonSlug: 'adolescent-tech-free-nightstand',
    publishedAt: '2026-10-29T16:00:00.000Z',
    formatLabel: 'Sleep Science',
    targetTiers: [T4, T5],
    sortOrder: 1,
  }),
  makeVerifiedVideo({
    id: 'vid-40-t4-2',
    lessonSlug: 'teen-deep-work-block',
    publishedAt: '2026-10-27T13:00:00.000Z',
    formatLabel: 'Deep Focus',
    targetTiers: [T4, T5],
    sortOrder: 2,
  }),
];

const ISSUE_40_DINNER_PROMPTS: DigestDinnerPromptSeedData[] = [
  {
    id: 'dp-40-t0-1',
    question: 'Which picture book page made your little one point and smile widest today?',
    parentTip: 'Let them flip the pages backward or linger on one animal without hurrying.',
    followUp: 'What sound does that character make when it goes to sleep?',
    targetTiers: [T0],
    sortOrder: 1,
  },
  {
    id: 'dp-40-t0-2',
    question: 'What tiny new word or sound popped out unexpectedly this week?',
    parentTip: 'Echo their early approximations warmly so they feel heard and encouraged.',
    followUp: 'What were they trying to tell us right then?',
    targetTiers: [T0],
    sortOrder: 2,
  },
  {
    id: 'dp-40-t0-3',
    question: 'Which kitchen utensil turned into the best accidental toy today?',
    parentTip: 'Reminds tired parents that simple, warm everyday moments are plenty.',
    followUp: 'Should we keep one wooden spoon in the low play drawer?',
    targetTiers: [T0],
    sortOrder: 3,
  },
  {
    id: 'dp-40-t1-1',
    question: 'What was one friendly thing you noticed someone else do at school or the park today?',
    parentTip: 'Trains social awareness gently without lecturing about sharing.',
    followUp: 'How did the other kid’s face look when that happened?',
    targetTiers: [T1],
    sortOrder: 1,
  },
  {
    id: 'dp-40-t1-2',
    question: 'If we invented a silly new pancake shape for Sunday morning, what would it be?',
    parentTip: 'Keeps family table conversations joyful and imaginative.',
    followUp: 'What fruit makes the best eyes or wheels?',
    targetTiers: [T1],
    sortOrder: 2,
  },
  {
    id: 'dp-40-t1-3',
    question: 'What helped your body feel brave during morning drop-off today?',
    parentTip: 'Reinforces the child’s own coping tools and sense of mastery.',
    followUp: 'Should we do our secret handshake twice tomorrow?',
    targetTiers: [T1],
    sortOrder: 3,
  },
  {
    id: 'dp-40-t2-1',
    question: 'What is something tricky you figured out by yourself this week?',
    parentTip: 'Highlights growing elementary agency and patience.',
    followUp: 'Did you almost quit before the breakthrough clicked?',
    targetTiers: [T2],
    sortOrder: 1,
  },
  {
    id: 'dp-40-t2-2',
    question: 'If you had ten minutes of total boredom with only paper and tape, what would you invent?',
    parentTip: 'Makes unstructured creativity sound like an adventure rather than a chore.',
    followUp: 'Want to test-build it for five minutes after dinner?',
    targetTiers: [T2],
    sortOrder: 2,
  },
  {
    id: 'dp-40-t2-3',
    question: 'What is one question you wished you could ask a scientist or game maker?',
    parentTip: 'Nurtures curiosity without turning dinner into a quiz.',
    followUp: 'Should we look up the real answer together tomorrow?',
    targetTiers: [T2],
    sortOrder: 3,
  },
  {
    id: 'dp-40-t3-1',
    question: 'Have you ever seen a text message get totally misread because nobody could hear the person’s voice?',
    parentTip: 'Opens natural digital-literacy reflection without accusing anyone.',
    followUp: 'When is it worth a quick 20-second voice note instead of ten texts?',
    targetTiers: [T3],
    sortOrder: 1,
  },
  {
    id: 'dp-40-t3-2',
    question: 'What part of school feels hardest to keep organized right now?',
    parentTip: 'Offers collaborative scaffolding rather than criticism over forgotten folders.',
    followUp: 'Would one five-minute Sunday reset help Monday morning feel calmer?',
    targetTiers: [T3],
    sortOrder: 2,
  },
  {
    id: 'dp-40-t3-3',
    question: 'What was the most surprisingly fun part of your week?',
    parentTip: 'Wide-open prompts let tweens pick the exact topic they feel comfortable sharing.',
    followUp: 'Who were you hanging out with when that happened?',
    targetTiers: [T3],
    sortOrder: 3,
  },
  {
    id: 'dp-40-t4-1',
    question: 'Which app notification annoys you most when you are actually trying to finish something?',
    parentTip: 'Frames silencing notifications as reclaiming their own time rather than a restriction.',
    followUp: 'Which two alerts are actually worth keeping on?',
    targetTiers: [T4],
    sortOrder: 1,
  },
  {
    id: 'dp-40-t4-2',
    question: 'What song, podcast, or show have you had on repeat lately?',
    parentTip: 'Ask to listen to one track in the car with genuine curiosity and zero critique.',
    followUp: 'What lyric or scene caught your ear first?',
    targetTiers: [T4],
    sortOrder: 2,
  },
  {
    id: 'dp-40-t4-3',
    question: 'If you could drop one pointless stress from your weekly schedule, what goes first?',
    parentTip: 'Helps teens spot overload early and practice prioritizing rest.',
    followUp: 'Is there a realistic way we can dial that pressure down?',
    targetTiers: [T4],
    sortOrder: 3,
  },
  {
    id: 'dp-40-t5-1',
    question: 'What is one household expense that surprised you once you saw what things actually cost?',
    parentTip: 'Normalizes transparent, calm adult money conversations.',
    followUp: 'What is one small money habit you want to build with your own earnings?',
    targetTiers: [T5],
    sortOrder: 1,
  },
  {
    id: 'dp-40-t5-2',
    question: 'What does healthy independence in a close friendship or relationship look like to you?',
    parentTip: 'Respects their developing values and invites thoughtful boundary reflection.',
    followUp: 'How do you notice when a boundary needs resetting early?',
    targetTiers: [T5],
    sortOrder: 2,
  },
  {
    id: 'dp-40-t5-3',
    question: 'What is one thing you are genuinely looking forward to in the next few months?',
    parentTip: 'Anchors late-adolescent talks in hope rather than deadlines.',
    followUp: 'How can we help make room for it?',
    targetTiers: [T5],
    sortOrder: 3,
  },
];

const ISSUE_40_PHRASES: DigestPhraseSeedData[] = [
  // T2
  {
    id: 'ph-40-t2-1',
    word: 'AFK',
    shortMeaning: 'Away from keyboard',
    fullMeaning: 'Quick multiplayer shorthand letting teammates know a player stepped away for dinner or a break.',
    cringeLevel: 1,
    cringeLabel: 'Helpful household cue',
    calmScript: '"Give your team a quick AFK in chat, dinner is on the table in two minutes."',
    targetTiers: [T2],
    sortOrder: 1,
  },
  {
    id: 'ph-40-t2-2',
    word: 'OP',
    shortMeaning: 'Overpowered / extra strong',
    fullMeaning: 'Describes a game tool, card, or character that feels almost unfairly powerful compared to others.',
    cringeLevel: 2,
    cringeLabel: 'Playful gaming shorthand',
    calmScript: '"Sounds like that move is seriously OP, how do players counter it?"',
    targetTiers: [T2],
    sortOrder: 2,
  },
  {
    id: 'ph-40-t2-3',
    word: 'GG',
    shortMeaning: 'Good game',
    fullMeaning: 'Respectful sign-off typed or spoken after a match ends, win or lose.',
    cringeLevel: 1,
    cringeLabel: 'Great sportsmanship cue',
    calmScript: '"Calling GG even after a tough loss takes real maturity."',
    targetTiers: [T2],
    sortOrder: 3,
  },
  // T3
  {
    id: 'ph-40-t3-1',
    word: 'Sus',
    shortMeaning: 'Suspicious or sketchy',
    fullMeaning: 'Short for suspicious, used playfully when a story, offer, or game teammate seems questionable.',
    cringeLevel: 2,
    cringeLabel: 'Mildly dated, harmless',
    calmScript: '"Trust that gut check, if a free-currency offer feels sus, it usually is."',
    targetTiers: [T3],
    sortOrder: 1,
  },
  {
    id: 'ph-40-t3-2',
    word: 'Rage Quit',
    shortMeaning: 'Shutting a game down angry',
    fullMeaning: 'Abruptly disconnecting mid-match when frustration spikes.',
    cringeLevel: 1,
    cringeLabel: 'Everyday gaming phrase',
    calmScript: '"Stepping away before frustration explodes is smart, let us grab water together."',
    targetTiers: [T3],
    sortOrder: 2,
  },
  {
    id: 'ph-40-t3-3',
    word: 'Main Character',
    shortMeaning: 'Acting like the star of the room',
    fullMeaning: 'Joking about someone embracing dramatic confidence, or playfully teasing self-centered moments.',
    cringeLevel: 2,
    cringeLabel: 'Lighthearted cultural phrase',
    calmScript: '"Fun energy, just make sure everyone else at the table gets a turn too."',
    targetTiers: [T3],
    sortOrder: 3,
  },
  // T4
  {
    id: 'ph-40-t4-1',
    word: 'Ghosting',
    shortMeaning: 'Vanishing without a reply',
    fullMeaning: 'Suddenly cutting off all texts or chats with someone rather than having an awkward honest conversation.',
    cringeLevel: 1,
    cringeLabel: 'Common across ages',
    calmScript: '"Being ghosted stings, a short kind message is always braver than disappearing."',
    targetTiers: [T4],
    sortOrder: 1,
  },
  {
    id: 'ph-40-t4-2',
    word: 'Lowkey / Highkey',
    shortMeaning: 'Quietly vs. unmistakably',
    fullMeaning: 'Softens or amplifies a feeling, "lowkey stressed" means quietly feeling pressure without making a scene.',
    cringeLevel: 2,
    cringeLabel: 'Understand first',
    calmScript: '"Thanks for telling me you are quietly feeling stressed, want to lighten tonight’s load?"',
    targetTiers: [T4],
    sortOrder: 2,
  },
  {
    id: 'ph-40-t4-3',
    word: 'Algorithm Trap',
    shortMeaning: 'Feed pushing one intense rabbit hole',
    fullMeaning: 'When pausing on one edgy or anxious video floods the rest of the feed with matching clips.',
    cringeLevel: 1,
    cringeLabel: 'Helpful media-literacy phrase',
    calmScript: '"Notice how one curious click reshaped the whole feed, hitting \'Not Interested\' resets it fast."',
    targetTiers: [T4],
    sortOrder: 3,
  },
  // T5
  {
    id: 'ph-40-t5-1',
    word: 'Quiet Quitting',
    shortMeaning: 'Doing only the clear baseline',
    fullMeaning: 'Setting firm limits against unpaid overwork or perfectionist burnout by sticking strictly to defined expectations.',
    cringeLevel: 1,
    cringeLabel: 'Mainstream workplace term',
    calmScript: '"Learning where healthy boundaries sit now will protect you in college and work."',
    targetTiers: [T5],
    sortOrder: 1,
  },
  {
    id: 'ph-40-t5-2',
    word: 'Doomscrolling',
    shortMeaning: 'Compulsive late-night news/feed scrolling',
    fullMeaning: 'Continuing to swipe through tense or heavy posts long after it stops feeling enjoyable or restful.',
    cringeLevel: 1,
    cringeLabel: 'Common across ages',
    calmScript: '"I catch myself doomscrolling too, leaving phones across the room at night helps both of us."',
    targetTiers: [T5],
    sortOrder: 2,
  },
  {
    id: 'ph-40-t5-3',
    word: 'Ick',
    shortMeaning: 'Sudden turn-off over a small quirk',
    fullMeaning: 'Playful shorthand for a minor habit that suddenly cools romantic or social enthusiasm.',
    cringeLevel: 2,
    cringeLabel: 'Playful conversation term',
    calmScript: '"Funny how small quirks loom huge early on, real compatibility shows up in how people handle conflict."',
    targetTiers: [T5],
    sortOrder: 3,
  },
];

export const WEEKLY_DIGEST_SEED_EDITIONS: WeeklyDigestEditionSeedData[] = [
  {
    id: 'digest-issue-42',
    issueNumber: DIGEST_SEED_ISSUE.issueNumber,
    publishDate: DIGEST_SEED_ISSUE.publishDate,
    weekStart: new Date('2026-11-08T00:00:00.000Z'),
    weekEnd: new Date('2026-11-15T00:00:00.000Z'),
    title: DIGEST_SEED_ISSUE.title,
    summary: DIGEST_SEED_ISSUE.summary,
    conversationStarter: DIGEST_SEED_ISSUE.conversationStarter,
    status: DigestIssueStatus.PUBLISHED,
    curatedAt: new Date('2026-11-15T05:00:00.000Z'),
    articles: ISSUE_42_ARTICLES,
    videos: ISSUE_42_VIDEOS,
    dinnerPrompts: ISSUE_42_DINNER_PROMPTS,
    phrases: ISSUE_42_PHRASES,
  },
  {
    id: 'digest-issue-41',
    issueNumber: 41,
    publishDate: new Date('2026-11-08T00:00:00.000Z'),
    weekStart: new Date('2026-11-01T00:00:00.000Z'),
    weekEnd: new Date('2026-11-08T00:00:00.000Z'),
    title: 'Short-Form Loops, Mealtime Rhythms & Steady Emotional Coaching',
    summary:
      'Issue #41 pairs calm external reporting on virtual currencies, short-form feeds, and toddler transitions with verified talks and age-calibrated dinner prompts.',
    conversationStarter:
      'What actually recharges your battery after a loud school or work week?',
    status: DigestIssueStatus.PUBLISHED,
    curatedAt: new Date('2026-11-08T05:00:00.000Z'),
    articles: ISSUE_41_ARTICLES,
    videos: ISSUE_41_VIDEOS,
    dinnerPrompts: ISSUE_41_DINNER_PROMPTS,
    phrases: ISSUE_41_PHRASES,
  },
  {
    id: 'digest-issue-40',
    issueNumber: 40,
    publishDate: new Date('2026-11-01T00:00:00.000Z'),
    weekStart: new Date('2026-10-25T00:00:00.000Z'),
    weekEnd: new Date('2026-11-01T00:00:00.000Z'),
    title: 'Notification Calm, Boredom Bridges & Real-World Independence',
    summary:
      'Issue #40 gathers evidence-backed guidance on reclaiming attention from phone alerts, welcoming productive boredom, and scaffolding everyday autonomy from ages 0 to 18.',
    conversationStarter:
      'What is one small routine in our home you would upgrade this month?',
    status: DigestIssueStatus.PUBLISHED,
    curatedAt: new Date('2026-11-01T05:00:00.000Z'),
    articles: ISSUE_40_ARTICLES,
    videos: ISSUE_40_VIDEOS,
    dinnerPrompts: ISSUE_40_DINNER_PROMPTS,
    phrases: ISSUE_40_PHRASES,
  },
];

export async function seedDigest(prisma: PrismaClient): Promise<void> {
  console.log(
    '[Seed] Seeding Multi-Issue Weekly Culture & Trends Editions, Slang Dictionary, and Exploit Alerts...'
  );

  let issue42DigestId: string | null = null;
  let totalArticles = 0;
  let totalVideos = 0;
  let totalPrompts = 0;
  let totalPhrases = 0;

  for (const edition of WEEKLY_DIGEST_SEED_EDITIONS) {
    const digestRecord = await prisma.cultureDigest.upsert({
      where: { issueNumber: edition.issueNumber },
      update: {
        title: edition.title,
        summary: edition.summary,
        conversationStarter: edition.conversationStarter,
        publishDate: edition.publishDate,
        weekStart: edition.weekStart,
        weekEnd: edition.weekEnd,
        status: edition.status,
        curatedAt: edition.curatedAt,
      },
      create: {
        issueNumber: edition.issueNumber,
        title: edition.title,
        summary: edition.summary,
        conversationStarter: edition.conversationStarter,
        publishDate: edition.publishDate,
        weekStart: edition.weekStart,
        weekEnd: edition.weekEnd,
        status: edition.status,
        curatedAt: edition.curatedAt,
      },
    });

    if (edition.issueNumber === DIGEST_SEED_ISSUE.issueNumber) {
      issue42DigestId = digestRecord.id;
    }

    for (const article of edition.articles) {
      await prisma.digestArticle.upsert({
        where: {
          digestId_canonicalHash: {
            digestId: digestRecord.id,
            canonicalHash: article.canonicalHash,
          },
        },
        update: {
          sourceUrl: article.sourceUrl,
          sourceName: article.sourceName,
          sourceDomain: article.sourceDomain,
          authorName: article.authorName ?? null,
          imageUrl: article.imageUrl ?? null,
          publishedAt: article.publishedAt,
          isOriginalEditorial: article.isOriginalEditorial,
          topicLabel: article.topicLabel,
          readMinutes: article.readMinutes,
          title: article.title,
          summary: article.summary,
          keyShift: article.keyShift,
          perspectiveNote: article.perspectiveNote ?? null,
          contentMarkdown: article.contentMarkdown ?? null,
          sourcesText: article.sourcesText ?? null,
          targetTiers: article.targetTiers,
          isLead: article.isLead,
          sortOrder: article.sortOrder,
          ingestionStatus: article.ingestionStatus,
        },
        create: {
          id: article.id,
          digestId: digestRecord.id,
          canonicalHash: article.canonicalHash,
          sourceUrl: article.sourceUrl,
          sourceName: article.sourceName,
          sourceDomain: article.sourceDomain,
          authorName: article.authorName ?? null,
          imageUrl: article.imageUrl ?? null,
          publishedAt: article.publishedAt,
          isOriginalEditorial: article.isOriginalEditorial,
          topicLabel: article.topicLabel,
          readMinutes: article.readMinutes,
          title: article.title,
          summary: article.summary,
          keyShift: article.keyShift,
          perspectiveNote: article.perspectiveNote ?? null,
          contentMarkdown: article.contentMarkdown ?? null,
          sourcesText: article.sourcesText ?? null,
          targetTiers: article.targetTiers,
          isLead: article.isLead,
          sortOrder: article.sortOrder,
          ingestionStatus: article.ingestionStatus,
        },
      });
      totalArticles += 1;
    }

    for (const video of edition.videos) {
      const jumpChipsJson = video.jumpChips
        ? (video.jumpChips as unknown as Prisma.InputJsonValue)
        : undefined;
      await prisma.digestVideo.upsert({
        where: {
          digestId_youtubeVideoId: {
            digestId: digestRecord.id,
            youtubeVideoId: video.youtubeVideoId,
          },
        },
        update: {
          videoUrl: video.videoUrl,
          title: video.title,
          presenter: video.presenter,
          channelName: video.channelName,
          channelId: video.channelId ?? null,
          publishedAt: video.publishedAt,
          durationMinutes: video.durationMinutes,
          formatLabel: video.formatLabel,
          takeaway: video.takeaway,
          jumpChips: jumpChipsJson,
          skimBullets: video.skimBullets,
          targetTiers: video.targetTiers,
          isEmbeddable: video.isEmbeddable,
          sortOrder: video.sortOrder,
          ingestionStatus: video.ingestionStatus,
        },
        create: {
          id: video.id,
          digestId: digestRecord.id,
          youtubeVideoId: video.youtubeVideoId,
          videoUrl: video.videoUrl,
          title: video.title,
          presenter: video.presenter,
          channelName: video.channelName,
          channelId: video.channelId ?? null,
          publishedAt: video.publishedAt,
          durationMinutes: video.durationMinutes,
          formatLabel: video.formatLabel,
          takeaway: video.takeaway,
          jumpChips: jumpChipsJson,
          skimBullets: video.skimBullets,
          targetTiers: video.targetTiers,
          isEmbeddable: video.isEmbeddable,
          sortOrder: video.sortOrder,
          ingestionStatus: video.ingestionStatus,
        },
      });
      totalVideos += 1;
    }

    for (const prompt of edition.dinnerPrompts) {
      await prisma.digestDinnerPrompt.upsert({
        where: { id: prompt.id },
        update: {
          digestId: digestRecord.id,
          question: prompt.question,
          parentTip: prompt.parentTip,
          followUp: prompt.followUp,
          targetTiers: prompt.targetTiers,
          sortOrder: prompt.sortOrder,
        },
        create: {
          id: prompt.id,
          digestId: digestRecord.id,
          question: prompt.question,
          parentTip: prompt.parentTip,
          followUp: prompt.followUp,
          targetTiers: prompt.targetTiers,
          sortOrder: prompt.sortOrder,
        },
      });
      totalPrompts += 1;
    }

    for (const phrase of edition.phrases) {
      await prisma.digestPhrase.upsert({
        where: { id: phrase.id },
        update: {
          digestId: digestRecord.id,
          word: phrase.word,
          shortMeaning: phrase.shortMeaning,
          fullMeaning: phrase.fullMeaning,
          cringeLevel: phrase.cringeLevel,
          cringeLabel: phrase.cringeLabel,
          calmScript: phrase.calmScript,
          targetTiers: phrase.targetTiers,
          sortOrder: phrase.sortOrder,
        },
        create: {
          id: phrase.id,
          digestId: digestRecord.id,
          word: phrase.word,
          shortMeaning: phrase.shortMeaning,
          fullMeaning: phrase.fullMeaning,
          cringeLevel: phrase.cringeLevel,
          cringeLabel: phrase.cringeLabel,
          calmScript: phrase.calmScript,
          targetTiers: phrase.targetTiers,
          sortOrder: phrase.sortOrder,
        },
      });
      totalPhrases += 1;
    }
  }

  // Legacy Slang Terms & Exploit Alerts attached to Issue #42 (backward compatibility)
  for (const slang of SLANG_SEED_TERMS) {
    await prisma.slangTerm.upsert({
      where: { term: slang.term },
      update: {
        definition: slang.definition,
        exampleSentence: slang.exampleSentence,
        contextTone: slang.contextTone,
        digestId: issue42DigestId,
      },
      create: {
        term: slang.term,
        definition: slang.definition,
        exampleSentence: slang.exampleSentence,
        contextTone: slang.contextTone,
        digestId: issue42DigestId,
      },
    });
  }

  for (const exploit of EXPLOIT_SEED_ALERTS) {
    const existing = await prisma.exploitAlert.findFirst({
      where: { appName: exploit.appName },
    });

    if (existing) {
      await prisma.exploitAlert.update({
        where: { id: existing.id },
        data: {
          exploitDescription: exploit.exploitDescription,
          howKidsBypass: exploit.howKidsBypass,
          parentRemedy: exploit.parentRemedy,
          severity: exploit.severity,
          digestId: issue42DigestId,
        },
      });
    } else {
      await prisma.exploitAlert.create({
        data: {
          appName: exploit.appName,
          exploitDescription: exploit.exploitDescription,
          howKidsBypass: exploit.howKidsBypass,
          parentRemedy: exploit.parentRemedy,
          severity: exploit.severity,
          digestId: issue42DigestId,
        },
      });
    }
  }

  console.log(
    `[Seed] Successfully seeded ${WEEKLY_DIGEST_SEED_EDITIONS.length} weekly editions (${totalArticles} articles, ${totalVideos} videos, ${totalPrompts} dinner prompts, ${totalPhrases} phrases) plus ${SLANG_SEED_TERMS.length} legacy slang terms and ${EXPLOIT_SEED_ALERTS.length} exploit alerts.`
  );
}
