import {
  DevelopmentalTier,
  DigestIssueStatus,
  resolveDigestTierBucket,
  isSlangEligibleTier,
  matchesVideoDurationBucket,
  type CanonicalDigestTier,
  type DigestArticleDTO,
  type DigestArticlesResponseDTO,
  type DigestDinnerPromptDTO,
  type DigestIssueSummaryDTO,
  type DigestPhraseDTO,
  type DigestQueryScope,
  type DigestVideoDTO,
  type DigestVideoDurationBucket,
  type DigestVideosResponseDTO,
  type SavedDigestShortlistDTO,
  type VideoJumpChip,
  type WeeklyDigestEditionDTO,
} from '@alongside/shared';

const T0 = DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;
const T1 = DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
const T2 = DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
const T3 = DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
const T4 = DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
const T5 = DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;

export interface DigestTierDisplayMeta {
  tier: CanonicalDigestTier;
  tierLabel: string;
  shortAges: string;
  defaultChildName: string;
  defaultAgeLabel: string;
  relatedCourseTitle: string;
}

export const DIGEST_TIER_METADATA: Record<CanonicalDigestTier, DigestTierDisplayMeta> = {
  [T0]: {
    tier: T0,
    tierLabel: 'Infancy & Toddler',
    shortAges: 'Ages 0–3',
    defaultChildName: 'your toddler',
    defaultAgeLabel: 'Ages 0–3',
    relatedCourseTitle: 'Toddler Language & Screen-Free Sanctuary',
  },
  [T1]: {
    tier: T1,
    tierLabel: 'Early Childhood',
    shortAges: 'Ages 4–6',
    defaultChildName: 'your preschooler',
    defaultAgeLabel: 'Ages 4–6',
    relatedCourseTitle: 'Preschool Emotional Literacy & Calm Transitions',
  },
  [T2]: {
    tier: T2,
    tierLabel: 'Middle Childhood',
    shortAges: 'Ages 7–9',
    defaultChildName: 'your child',
    defaultAgeLabel: 'Ages 7–9',
    relatedCourseTitle: 'Elementary Gaming, Friendships & Early Tech Agreements',
  },
  [T3]: {
    tier: T3,
    tierLabel: 'Pre-Teen',
    shortAges: 'Ages 10–12',
    defaultChildName: 'your tween',
    defaultAgeLabel: 'Ages 10–12',
    relatedCourseTitle: 'Tween Adrenarche, First Phones & Bilateral Family Pacts',
  },
  [T4]: {
    tier: T4,
    tierLabel: 'Early Adolescence',
    shortAges: 'Ages 13–15',
    defaultChildName: 'your teen',
    defaultAgeLabel: 'Ages 13–15',
    relatedCourseTitle: 'Adolescent Autonomy, Sleep Architecture & Digital Pacts',
  },
  [T5]: {
    tier: T5,
    tierLabel: 'Late Adolescence',
    shortAges: 'Ages 16–18',
    defaultChildName: 'your teen',
    defaultAgeLabel: 'Ages 16–18',
    relatedCourseTitle: 'Launching Well: Consultant Parenting & Digital Self-Regulation',
  },
};

interface MockIssueRecord {
  id: string;
  issueNumber: number;
  publishDate: string;
  weekStart: string;
  weekEnd: string;
  title: string;
  summary: string;
  status: DigestIssueStatus;
  articles: DigestArticleDTO[];
  videos: DigestVideoDTO[];
  dinnerPrompts: DigestDinnerPromptDTO[];
  phrases: DigestPhraseDTO[];
}

function makeArticle(input: {
  id: string;
  digestId: string;
  issueNumber: number;
  sourceName: string;
  sourceDomain: string;
  sourceUrl: string;
  publishedAt: string;
  topicLabel: string;
  readMinutes: number;
  title: string;
  summary: string;
  keyShift: string;
  perspectiveNote?: string | null;
  targetTiers: DevelopmentalTier[];
  isLead: boolean;
  sortOrder: number;
  isOriginalEditorial?: boolean;
  contentMarkdown?: string | null;
}): DigestArticleDTO {
  return {
    id: input.id,
    digestId: input.digestId,
    issueNumber: input.issueNumber,
    title: input.title,
    summary: input.summary,
    keyShift: input.keyShift,
    perspectiveNote: input.perspectiveNote ?? null,
    topicLabel: input.topicLabel,
    readMinutes: input.readMinutes,
    sourceName: input.sourceName,
    sourceDomain: input.sourceDomain,
    sourceUrl: input.sourceUrl,
    authorName: null,
    imageUrl: null,
    publishedAt: input.publishedAt,
    isOriginalEditorial: input.isOriginalEditorial ?? false,
    contentMarkdown: input.contentMarkdown ?? null,
    sourcesText: `${input.sourceName} (${input.sourceDomain})`,
    targetTiers: input.targetTiers,
    isLead: input.isLead,
    sortOrder: input.sortOrder,
    isRead: false,
    isSaved: false,
  };
}

function makeVideo(input: {
  id: string;
  digestId: string;
  issueNumber: number;
  youtubeVideoId: string;
  title: string;
  presenter: string;
  channelName: string;
  publishedAt: string;
  durationMinutes: number;
  formatLabel: string;
  takeaway: string;
  jumpChips?: VideoJumpChip[];
  skimBullets: string[];
  targetTiers: DevelopmentalTier[];
  sortOrder: number;
}): DigestVideoDTO {
  return {
    id: input.id,
    digestId: input.digestId,
    issueNumber: input.issueNumber,
    youtubeVideoId: input.youtubeVideoId,
    videoUrl: `https://www.youtube.com/watch?v=${input.youtubeVideoId}`,
    title: input.title,
    presenter: input.presenter,
    channelName: input.channelName,
    channelId: null,
    publishedAt: input.publishedAt,
    durationMinutes: input.durationMinutes,
    formatLabel: input.formatLabel,
    takeaway: input.takeaway,
    jumpChips: input.jumpChips,
    skimBullets: input.skimBullets,
    targetTiers: input.targetTiers,
    isEmbeddable: true,
    sortOrder: input.sortOrder,
    isSaved: false,
  };
}

function makeDinner(input: {
  id: string;
  digestId: string;
  issueNumber: number;
  question: string;
  parentTip: string;
  followUp: string;
  targetTiers: DevelopmentalTier[];
  sortOrder: number;
}): DigestDinnerPromptDTO {
  return {
    ...input,
    isSaved: false,
  };
}

function makePhrase(input: {
  id: string;
  digestId: string;
  issueNumber: number;
  word: string;
  shortMeaning: string;
  fullMeaning: string;
  cringeLevel: number;
  cringeLabel: string;
  calmScript: string;
  targetTiers: DevelopmentalTier[];
  sortOrder: number;
}): DigestPhraseDTO {
  return input;
}

const ISSUE_42_ID = 'digest-issue-42';
const ISSUE_41_ID = 'digest-issue-41';
const ISSUE_40_ID = 'digest-issue-40';

export const MOCK_DIGEST_EDITIONS: MockIssueRecord[] = [
  {
    id: ISSUE_42_ID,
    issueNumber: 42,
    publishDate: '2026-11-15T00:00:00.000Z',
    weekStart: '2026-11-08T00:00:00.000Z',
    weekEnd: '2026-11-15T00:00:00.000Z',
    title: 'Calm Tech Rhythms, Sleep & Real Conversation',
    summary:
      'Weekly age-calibrated blogs, embeddable talks, and Sunday table prompts grounded in developmental neuroscience.',
    status: DigestIssueStatus.PUBLISHED,
    articles: [
      // T0 (0-3)
      makeArticle({
        id: 'art-42-t0-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'ZERO TO THREE',
        sourceDomain: 'zerotothree.org',
        sourceUrl:
          'https://www.zerotothree.org/resource/screen-sense-what-the-research-says-about-the-impact-of-media-on-children-aged-0-3-years-old/',
        publishedAt: '2026-11-13T14:00:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 4,
        title: 'Why slow-paced narration beats rapid-cut toddler videos',
        summary:
          'ZERO TO THREE breaks down how babies and toddlers process screen movement differently from live faces. Short, calm co-viewed video calls build language while fast-cut feeds overstimulate young attention.',
        keyShift:
          'Prioritize live voice narration and keep background TV switched off during floor play.',
        perspectiveNote:
          'Occasional calm clips when a parent needs ten minutes do not undo warm daily routines.',
        targetTiers: [T0],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-42-t0-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Harvard Center on the Developing Child',
        sourceDomain: 'developingchild.harvard.edu',
        sourceUrl: 'https://developingchild.harvard.edu/science/key-concepts/serve-and-return/',
        publishedAt: '2026-11-11T16:30:00.000Z',
        topicLabel: 'Play & Learning',
        readMinutes: 3,
        title: 'Five simple serve-and-return moments during everyday chores',
        summary:
          'Harvard researchers outline five repeatable steps—notice the serve, return warmly, name the object, take turns, and practice endings—that wire early language and emotional safety.',
        keyShift:
          'Narrate what your toddler points to instead of quizzing them with flashcards.',
        targetTiers: [T0],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-42-t0-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/Getting-Your-Baby-to-Sleep.aspx',
        publishedAt: '2026-11-09T11:15:00.000Z',
        topicLabel: 'Sleep & Routines',
        readMinutes: 4,
        title: 'Calming evening cues that help babies wind down reliably',
        summary:
          'Pediatricians at HealthyChildren.org highlight how predictable three-step bedtime cues—warm bath, dim light, quiet voice—signal melatonin release without rigid sleep-training pressure.',
        keyShift:
          'Anchor bedtime with the same calm sensory sequence rather than chasing the exact clock minute.',
        targetTiers: [T0],
        isLead: false,
        sortOrder: 3,
      }),

      // T1 (4-6)
      makeArticle({
        id: 'art-42-t1-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Common Sense Media',
        sourceDomain: 'commonsensemedia.org',
        sourceUrl: 'https://www.commonsensemedia.org/articles/screen-time-for-preschoolers',
        publishedAt: '2026-11-13T15:00:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 4,
        title: 'Choosing calmer preschool shows when autoplay pulls them in',
        summary:
          'Common Sense Media reviews how streaming autoplay loops prolong preschool screen requests. Turning off autoplay and pairing one episode with a visible timer ends most post-show tears.',
        keyShift:
          'Let an external kitchen timer end screen time so the clock—not your voice—holds the boundary.',
        perspectiveNote:
          'Preschoolers grieve transitions because their braking cortex is still under construction.',
        targetTiers: [T1],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-42-t1-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl: 'https://childmind.org/article/how-to-handle-tantrums-and-meltdowns/',
        publishedAt: '2026-11-11T13:00:00.000Z',
        topicLabel: 'Emotional Regulation',
        readMinutes: 4,
        title: 'Handling preschool after-pickup meltdowns without lectures',
        summary:
          'Child Mind Institute clinicians explain why four- to six-year-olds hold it together all day at preschool and release pent-up tension the minute they see their safe parent.',
        keyShift:
          'Offer a quiet snack and ten minutes of low-demand play before asking school questions.',
        targetTiers: [T1],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-42-t1-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Greater Good Magazine',
        sourceDomain: 'greatergood.berkeley.edu',
        sourceUrl:
          'https://greatergood.berkeley.edu/article/item/why_unstructured_play_matters_for_young_kids',
        publishedAt: '2026-11-10T09:30:00.000Z',
        topicLabel: 'Play & Learning',
        readMinutes: 3,
        title: 'Why pretend play builds self-control faster than worksheets',
        summary:
          'Greater Good Magazine gathers developmental studies showing that open-ended make-believe requires preschoolers to hold rules in mind, negotiate roles, and wait their turn.',
        keyShift:
          'Leave twenty unscheduled minutes daily with blocks, cardboard boxes, or dress-up scarves.',
        targetTiers: [T1],
        isLead: false,
        sortOrder: 3,
      }),

      // T2 (7-9)
      makeArticle({
        id: 'art-42-t2-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Common Sense Media',
        sourceDomain: 'commonsensemedia.org',
        sourceUrl: 'https://www.commonsensemedia.org/articles/parents-ultimate-guide-to-roblox',
        publishedAt: '2026-11-14T10:00:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 5,
        title: 'Understanding Roblox chat filters and cooperative play at ages 7–9',
        summary:
          'Common Sense Media walks parents through Roblox experience maturity labels, private server defaults, and how to turn solo grinding into shared living-room play.',
        keyShift:
          'Switch chat permissions to known real-life friends and sit beside them for one round each week.',
        perspectiveNote:
          'Curiosity opens far more honest gaming conversations than surprise account audits.',
        targetTiers: [T2],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-42-t2-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/family-life/Media/Pages/Where-We-Stand-TV-Viewing-Time.aspx',
        publishedAt: '2026-11-12T12:00:00.000Z',
        topicLabel: 'Family Communication',
        readMinutes: 3,
        title: 'Building a predictable elementary family media plan',
        summary:
          'The American Academy of Pediatrics outlines how clear, written household routines for homework, outdoor play, and screen-free bedrooms lower daily negotiations for elementary kids.',
        keyShift:
          'Decide daily screen windows on Sunday evening so weekday afternoons stay friction-free.',
        targetTiers: [T2],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-42-t2-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl:
          'https://childmind.org/article/supporting-emotional-needs-of-kids-with-learning-challenges/',
        publishedAt: '2026-11-09T14:45:00.000Z',
        topicLabel: 'School & Focus',
        readMinutes: 4,
        title: 'When third-grade frustration sounds like "I am terrible at everything"',
        summary:
          'Clinicians unpack why ages seven to nine mark a leap in peer comparison and how validating effort keeps minor homework setbacks from hardening into shame.',
        keyShift:
          'Name the specific skill still growing rather than dismissing their frustration with quick reassurance.',
        targetTiers: [T2],
        isLead: false,
        sortOrder: 3,
      }),

      // T3 (10-12)
      makeArticle({
        id: 'art-42-t3-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl: 'https://childmind.org/article/when-should-you-get-your-kid-a-phone/',
        publishedAt: '2026-11-14T13:30:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 5,
        title: 'How to read readiness cues before the first smartphone conversation',
        summary:
          'Child Mind Institute outlines maturity signals—sleep protection, impulse recovery, and honesty around mistakes—that matter more than whether classmates already carry phones.',
        keyShift:
          'Treat device autonomy as a graduated driving permit rather than an all-or-nothing birthday switch.',
        perspectiveNote:
          'Delaying open social feeds while offering voice/text independence protects peer connection.',
        targetTiers: [T3],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-42-t3-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Common Sense Media',
        sourceDomain: 'commonsensemedia.org',
        sourceUrl:
          'https://www.commonsensemedia.org/articles/how-to-help-tweens-navigate-group-chats',
        publishedAt: '2026-11-12T17:00:00.000Z',
        topicLabel: 'Social & Peers',
        readMinutes: 4,
        title: 'Helping tweens step out of high-drama group chats without losing face',
        summary:
          'Common Sense Media explores why fifth- and sixth-grade group chats escalate quickly after bedtime and gives tweens practical scripts to mute threads calmly.',
        keyShift:
          'Offer yourself as a blame shield: "Tell your chat my parents dock my device at 8:30."',
        targetTiers: [T3],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-42-t3-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Greater Good Magazine',
        sourceDomain: 'greatergood.berkeley.edu',
        sourceUrl:
          'https://greatergood.berkeley.edu/article/item/how_to_stay_connected_to_your_tween',
        publishedAt: '2026-11-10T11:00:00.000Z',
        topicLabel: 'Family Communication',
        readMinutes: 4,
        title: 'Side-by-side rituals that keep pre-teens talking when privacy grows',
        summary:
          'UC Berkeley researchers highlight why tweens open up far more easily during parallel activities—car rides, shooting hoops, or late-evening dishwashing—than across a formal table.',
        keyShift:
          'Save curious open-ended questions for low-eye-contact moments instead of right after school.',
        targetTiers: [T3],
        isLead: false,
        sortOrder: 3,
      }),

      // T4 (13-15)
      makeArticle({
        id: 'art-42-t4-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/family-life/Media/Pages/social-media-and-your-childs-mental-health-what-research-says.aspx',
        publishedAt: '2026-11-14T16:00:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 5,
        title: 'What pediatric research actually says about teen social feeds and sleep',
        summary:
          'HealthyChildren.org synthesizes current adolescent media research, emphasizing that late-night scroll displacement of REM sleep drives mood dips far more than daytime messaging.',
        keyShift:
          'Focus household pacts on device-free bedrooms overnight before micromanaging every daytime minute.',
        perspectiveNote:
          'Co-signed boundaries with clear reasoning earn significantly higher teen buy-in than surprise blocks.',
        targetTiers: [T4],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-42-t4-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl: 'https://childmind.org/article/tips-communicating-with-teen/',
        publishedAt: '2026-11-11T18:00:00.000Z',
        topicLabel: 'Family Communication',
        readMinutes: 4,
        title: 'Validating first so your ninth grader keeps coming home with hard stories',
        summary:
          'Adolescent psychologists show how jumping straight to advice triggers immediate teen shutdown, while pausing to reflect the emotion keeps the prefrontal bridge open.',
        keyShift:
          'Ask "Do you want me to just listen, brainstorm, or help step in?" before offering solutions.',
        targetTiers: [T4],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-42-t4-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Common Sense Media',
        sourceDomain: 'commonsensemedia.org',
        sourceUrl:
          'https://www.commonsensemedia.org/articles/ai-chatbots-what-parents-need-to-know',
        publishedAt: '2026-11-09T15:30:00.000Z',
        topicLabel: 'School & Focus',
        readMinutes: 4,
        title: 'Talking calmly about AI companion bots and homework shortcuts',
        summary:
          'Common Sense Media breaks down how teens use generative AI for study outlines versus emotional venting, and how to set transparent family norms around real human friendship.',
        keyShift:
          'Test an AI study prompt together and discuss where automated answers flatten their own voice.',
        targetTiers: [T4],
        isLead: false,
        sortOrder: 3,
      }),

      // T5 (16-18)
      makeArticle({
        id: 'art-42-t5-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl: 'https://childmind.org/article/preparing-teens-for-independence/',
        publishedAt: '2026-11-14T11:30:00.000Z',
        topicLabel: 'Family Communication',
        readMinutes: 5,
        title: 'Shifting from household manager to trusted consultant before graduation',
        summary:
          'Child Mind Institute outlines how letting older teens manage their own calendar misses, health appointments, and study blocks builds durable adult competence while a safety net still exists.',
        keyShift:
          'Step back from daily reminders and invite weekly check-ins where your teen sets the agenda.',
        perspectiveNote:
          'Small manageable stumbles at 17 are far safer teachers than sudden shock at 19.',
        targetTiers: [T5],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-42-t5-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'Greater Good Magazine',
        sourceDomain: 'greatergood.berkeley.edu',
        sourceUrl:
          'https://greatergood.berkeley.edu/article/item/how_to_help_teens_manage_stress_and_burnout',
        publishedAt: '2026-11-12T10:15:00.000Z',
        topicLabel: 'Sleep & Routines',
        readMinutes: 4,
        title: 'Spotting quiet academic burnout in high-achieving juniors and seniors',
        summary:
          'Greater Good Magazine highlights the difference between healthy stretch goals and chronic perfectionism, urging families to protect one phone-free recovery window every weekend.',
        keyShift:
          'Greet your teen warmly about who they are before asking a single question about grades or applications.',
        targetTiers: [T5],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-42-t5-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/ages-stages/teen/safety/Pages/Teen-Driving.aspx',
        publishedAt: '2026-11-10T14:20:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 4,
        title: 'Co-designing distraction-free driving agreements that teens actually honor',
        summary:
          'AAP safety researchers show that pairing automatic Do Not Disturb While Driving modes with parent modeling cuts distracted glances far better than punitive tracking apps.',
        keyShift:
          'Model putting your own phone in the glove compartment whenever your teen rides shotgun.',
        targetTiers: [T5],
        isLead: false,
        sortOrder: 3,
      }),
    ],
    videos: [
      // T0
      makeVideo({
        id: 'vid-42-t0-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'm_5u8-QSh6A',
        title: 'Serve & Return Interaction Shapes Brain Circuitry',
        presenter: 'Center on the Developing Child',
        channelName: 'Harvard University',
        publishedAt: '2026-11-14T09:00:00.000Z',
        durationMinutes: 2,
        formatLabel: '2-Min Quick Watch',
        takeaway:
          'In under two minutes, see how every returned point, smile, and babble physically builds early brain architecture.',
        jumpChips: [
          { seconds: 15, label: '0:15 · What a baby serve looks like' },
          { seconds: 55, label: '0:55 · How warm returns wire circuits' },
        ],
        skimBullets: [
          'Toddlers serve with gazes, points, and babbles.',
          'Naming what they point to bridges gesture straight into first words.',
          'Warm everyday moments outperform expensive baby gadgets.',
        ],
        targetTiers: [T0],
        sortOrder: 1,
      }),
      makeVideo({
        id: 'vid-42-t0-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'l9uv0KqtwrM',
        title: 'Newborn Sleep Tips: 5 Ways to Help Your Baby Sleep Better',
        presenter: 'Dr. Mona Amin, DO, FAAP',
        channelName: 'PedsDocTalk',
        publishedAt: '2026-11-12T12:00:00.000Z',
        durationMinutes: 10,
        formatLabel: 'Sleep & Calm',
        takeaway:
          'Realistic day-night light anchors, early sleepy signals, and calm bedtime rhythms without rigid schedules.',
        jumpChips: [
          { seconds: 75, label: '1:15 · Day vs. night light cues' },
          { seconds: 240, label: '4:00 · Spotting sleepy cues early' },
          { seconds: 420, label: '7:00 · Calm nighttime settling' },
        ],
        skimBullets: [
          'Bright morning rooms and dim night routines anchor early circadian clocks.',
          'Catching subtle yawns prevents overtired evening spirals.',
          'Safe, uncluttered sleep setups give parents genuine peace of mind.',
        ],
        targetTiers: [T0],
        sortOrder: 2,
      }),
      makeVideo({
        id: 'vid-42-t0-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'BoT7qH_uVNo',
        title: 'Media and Children',
        presenter: 'Dr. Dimitri Christakis, MD, MPH, FAAP',
        channelName: 'TEDx Talks',
        publishedAt: '2026-11-10T15:00:00.000Z',
        durationMinutes: 16,
        formatLabel: 'Media Science',
        takeaway:
          'Why protecting the 0–2 screen-free window—and avoiding rapid-cut cartoons—protects lifelong focus.',
        jumpChips: [
          { seconds: 120, label: '2:00 · Fast cuts & toddler focus' },
          { seconds: 450, label: '7:30 · Real-world pacing' },
          { seconds: 750, label: '12:30 · Calmer media habits' },
        ],
        skimBullets: [
          'High-speed scene cuts overstimulate infant attention networks.',
          'Ordinary kitchen play and face-to-face songs beat baby screen apps.',
          'Screen-free meals and bedrooms start effortlessly now.',
        ],
        targetTiers: [T0],
        sortOrder: 3,
      }),

      // T1
      makeVideo({
        id: 'vid-42-t1-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: '_X0mgOOSpLU',
        title: 'The Power of Believing That You Can Improve',
        presenter: 'Dr. Carol Dweck, PhD',
        channelName: 'TED',
        publishedAt: '2026-11-14T11:00:00.000Z',
        durationMinutes: 10,
        formatLabel: 'Growth Mindset',
        takeaway:
          'How praising effort and using "not yet" builds resilient preschool problem-solvers.',
        jumpChips: [
          { seconds: 60, label: '1:00 · The power of "not yet"' },
          { seconds: 270, label: '4:30 · Process praise & resilience' },
          { seconds: 480, label: '8:00 · Everyday words that build grit' },
        ],
        skimBullets: [
          'Effort-based praise helps preschoolers stick with tricky builds.',
          'Adding "yet" reframes frustration into active brain growth.',
          'Notice persistence and strategies rather than innate talent.',
        ],
        targetTiers: [T1],
        sortOrder: 1,
      }),
      makeVideo({
        id: 'vid-42-t1-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'DH9L7vJ03DE',
        title: 'How Screens Stole Childhood — and How to Get It Back',
        presenter: 'Jonathan Haidt, PhD',
        channelName: 'TED',
        publishedAt: '2026-11-12T16:00:00.000Z',
        durationMinutes: 18,
        formatLabel: 'Screen Norms',
        takeaway:
          'Clear, calm play-based family norms you can start right in the preschool years.',
        jumpChips: [
          { seconds: 120, label: '2:00 · Play-based vs. screen-based childhood' },
          { seconds: 480, label: '8:00 · Why real-world play builds bravery' },
          { seconds: 840, label: '14:00 · Practical norms for home' },
        ],
        skimBullets: [
          'Rich self-directed play strengthens early emotional regulation.',
          'External timers and clear zones beat willpower negotiations.',
          'Screen-free meals and bedrooms simplify later tech milestones.',
        ],
        targetTiers: [T1],
        sortOrder: 2,
      }),
      makeVideo({
        id: 'vid-42-t1-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'xURCmzmQG8s',
        title: 'The Gardener and the Carpenter',
        presenter: 'Prof. Alison Gopnik, PhD',
        channelName: 'Talks at Google',
        publishedAt: '2026-11-09T14:00:00.000Z',
        durationMinutes: 52,
        formatLabel: 'Deep Dive Talk',
        takeaway:
          'Parenting like a gardener creating rich play soil instead of a carpenter carving one rigid shape.',
        jumpChips: [
          { seconds: 180, label: '3:00 · Gardener vs. Carpenter metaphor' },
          { seconds: 960, label: '16:00 · Why messy play beats drills' },
          { seconds: 2100, label: '35:00 · Raising adaptable thinkers' },
        ],
        skimBullets: [
          'Micromanaging outcomes spikes parent anxiety and brittle performance.',
          'Rich unstructured play lets unexpected strengths emerge.',
          'Outdoor loose-parts play builds adaptability worksheets cannot.',
        ],
        targetTiers: [T1],
        sortOrder: 3,
      }),

      // T2 & T3 shared + distinct
      makeVideo({
        id: 'vid-42-t2-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'H14bBuluwB8',
        title: 'Grit: The Power of Passion and Perseverance',
        presenter: 'Dr. Angela Lee Duckworth, PhD',
        channelName: 'TED',
        publishedAt: '2026-11-14T10:30:00.000Z',
        durationMinutes: 6,
        formatLabel: '6-Min Spark',
        takeaway:
          'Sustained curiosity and frustration tolerance beat raw talent at ages 7–12.',
        jumpChips: [
          { seconds: 45, label: '0:45 · Why grit beats raw talent' },
          { seconds: 175, label: '2:55 · Growth mindset + perseverance' },
          { seconds: 290, label: '4:50 · Sticking with hard builds' },
        ],
        skimBullets: [
          'Long-term curiosity beats IQ in predicting fulfillment.',
          'Normalizing struggle keeps kids leaning into tricky projects.',
          'Frustration is simply the physical sensation of new neural wiring.',
        ],
        targetTiers: [T2, T3],
        sortOrder: 1,
      }),
      makeVideo({
        id: 'vid-42-t2-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'eRQdAOrqvGg',
        title: 'The Challenges of Raising a Digital Native',
        presenter: 'Dr. Devorah Heitner, PhD',
        channelName: 'TEDx Talks',
        publishedAt: '2026-11-12T13:30:00.000Z',
        durationMinutes: 13,
        formatLabel: 'Digital Mentoring',
        takeaway:
          'Why side-by-side mentoring builds far better judgment in elementary gamers than stealth spying.',
        jumpChips: [
          { seconds: 110, label: '1:50 · Mentoring vs. surveillance' },
          { seconds: 390, label: '6:30 · Sitting side-by-side in their games' },
          { seconds: 640, label: '10:40 · Handling first digital slips calmly' },
        ],
        skimBullets: [
          'Open curiosity invites kids to bring tricky game moments straight to you.',
          'Your calm reaction to the first mistake determines future honesty.',
          'Ten minutes of co-play teaches more than an hour of lecturing.',
        ],
        targetTiers: [T2],
        sortOrder: 2,
      }),
      makeVideo({
        id: 'vid-42-t2-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'KNEGWrD08f8',
        title: 'Are Smartphones Ruining Childhood?',
        presenter: 'Jonathan Haidt, PhD',
        channelName: 'TED',
        publishedAt: '2026-11-09T17:00:00.000Z',
        durationMinutes: 38,
        formatLabel: 'Deep Dive Talk',
        takeaway:
          'Why cooperative real-world play and four clear household guardrails protect elementary confidence.',
        jumpChips: [
          { seconds: 180, label: '3:00 · Social feeds vs. real play' },
          { seconds: 900, label: '15:00 · Protecting sleep and play' },
          { seconds: 1680, label: '28:00 · Four clear family guardrails' },
        ],
        skimBullets: [
          'Cooperative play with friends differs sharply from solitary infinite feeds.',
          'Delaying open smartphones protects sleep and real-world courage.',
          'Co-written gaming agreements end nightly controller standoffs.',
        ],
        targetTiers: [T2],
        sortOrder: 3,
      }),

      // T3 additional
      makeVideo({
        id: 'vid-42-t3-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: '6zVS8HIPUng',
        title: 'The Mysterious Workings of the Adolescent Brain',
        presenter: 'Dr. Sarah-Jayne Blakemore, PhD',
        channelName: 'TED',
        publishedAt: '2026-11-13T14:00:00.000Z',
        durationMinutes: 14,
        formatLabel: 'Brain Science',
        takeaway:
          'Why sudden tween eye-rolling and peer sensitivity signal massive social-brain remodeling—not personal disrespect.',
        jumpChips: [
          { seconds: 110, label: '1:50 · The remodeling social brain' },
          { seconds: 390, label: '6:30 · Peer evaluation spikes at 10+' },
          { seconds: 650, label: '10:50 · Opportunity in plasticity' },
        ],
        skimBullets: [
          'The medial prefrontal cortex undergoes major rewiring starting around age 10.',
          'Social exclusion fires intense alarm circuits during middle school.',
          'Staying neutral during eye-rolls preserves your steady leadership.',
        ],
        targetTiers: [T3],
        sortOrder: 2,
      }),
      makeVideo({
        id: 'vid-42-t3-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'ANnAP08VfJ0',
        title: 'Behind Their Screens: What Teens Are Facing (and Adults Are Missing)',
        presenter: 'Dr. Emily Weinstein, EdD & Dr. Carrie James, PhD',
        channelName: 'Common Sense Media',
        publishedAt: '2026-11-10T18:00:00.000Z',
        durationMinutes: 61,
        formatLabel: 'Parent Seminar',
        takeaway:
          'What 3,500+ tweens and teens say about group chats, read receipts, and why they appreciate co-signed evening docks.',
        jumpChips: [
          { seconds: 360, label: '6:00 · Inside group-chat pressure' },
          { seconds: 1320, label: '22:00 · The always-reachable double bind' },
          { seconds: 2400, label: '40:00 · Co-designing pacts kids respect' },
        ],
        skimBullets: [
          'Tweens feel exhausted by instant-reply expectations yet worried about missing out.',
          'Group-chat silences and streaks carry unspoken social weight.',
          'An agreed 8:30 PM dock gives kids a face-saving exit from late threads.',
        ],
        targetTiers: [T3],
        sortOrder: 3,
      }),

      // T4
      makeVideo({
        id: 'vid-42-t4-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'A71Kms6Mvhc',
        title: 'Using Brain Science to Explain Adolescent Risk-Taking',
        presenter: 'Dr. Laurence Steinberg, PhD',
        channelName: 'Laurence Steinberg',
        publishedAt: '2026-11-14T15:00:00.000Z',
        durationMinutes: 11,
        formatLabel: '11-Min Essential',
        takeaway:
          'How peer presence shifts teen reward processing—and why warmth paired with clear structure protects adolescents best.',
        jumpChips: [
          { seconds: 90, label: '1:30 · Reward accelerator vs. frontal brakes' },
          { seconds: 290, label: '4:50 · The peer-multiplier study' },
          { seconds: 510, label: '8:30 · Warm structure that protects teens' },
        ],
        skimBullets: [
          'Having peers nearby amplifies reward sensitivity and lowers risk perception.',
          'Warmth plus firm structure outperforms harsh policing across studies.',
          'Co-created house agreements and ride-home lifelines protect teens without eroding trust.',
        ],
        targetTiers: [T4],
        sortOrder: 1,
      }),
      makeVideo({
        id: 'vid-42-t4-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: '5MuIMqhT8DM',
        title: 'Sleep Is Your Superpower',
        presenter: 'Dr. Matthew Walker, PhD',
        channelName: 'TED',
        publishedAt: '2026-11-11T19:00:00.000Z',
        durationMinutes: 19,
        formatLabel: 'Sleep Science',
        takeaway:
          'Why REM sleep acts like overnight emotional first aid—and why charging phones outside bedrooms transforms teen mood.',
        jumpChips: [
          { seconds: 120, label: '2:00 · How sleep locks in memory' },
          { seconds: 540, label: '9:00 · Hidden cost of sleep debt' },
          { seconds: 900, label: '15:00 · Practical habits for deeper rest' },
        ],
        skimBullets: [
          'Deep sleep transfers daily learning into durable long-term memory.',
          'REM sleep cools next-day amygdala reactivity for stressed teens.',
          'Docking phones outside bedrooms is the fastest sleep win.',
        ],
        targetTiers: [T4],
        sortOrder: 2,
      }),
      makeVideo({
        id: 'vid-42-t4-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'f9sQNGvveXs',
        title: 'The Teenage Brain (3 Key Highlights)',
        presenter: 'Dr. Frances E. Jensen, MD, FACP',
        channelName: 'Politics and Prose',
        publishedAt: '2026-11-09T13:00:00.000Z',
        durationMinutes: 67,
        formatLabel: 'Deep Dive Talk',
        takeaway:
          'Why the teen brain wires back-to-front—and how acting as their calm frontal-lobe coach keeps communication open.',
        jumpChips: [
          { seconds: 300, label: '5:00 · Why the teen brain is 80% wired' },
          { seconds: 1380, label: '23:00 · Sleep, stress & reactivity' },
          { seconds: 2520, label: '42:00 · Staying their calm coach' },
        ],
        skimBullets: [
          'Frontal braking pathways continue insulating into the mid-twenties.',
          'Sleep-deprived teen brains read neutral feedback as criticism far faster.',
          'Validating first keeps teens bringing hard moments home.',
        ],
        targetTiers: [T4, T5],
        sortOrder: 3,
      }),

      // T5
      makeVideo({
        id: 'vid-42-t5-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'fv8KpQY0m6o',
        title: 'Why Does It Take So Long to Grow Up Today?',
        presenter: 'Dr. Jeffrey Jensen Arnett, PhD',
        channelName: 'TEDx Talks',
        publishedAt: '2026-11-14T12:00:00.000Z',
        durationMinutes: 11,
        formatLabel: 'Launching Well',
        takeaway:
          'Why ages 18–25 form a healthy developmental runway—and how your relationship evolves into a lifelong adult friendship.',
        jumpChips: [
          { seconds: 75, label: '1:15 · What emerging adulthood means' },
          { seconds: 310, label: '5:10 · Why launching takes longer today' },
          { seconds: 520, label: '8:40 · Shifting into adult friendship' },
        ],
        skimBullets: [
          'Emerging adulthood is naturally built for identity exploration.',
          'Steady mentorship beats impatient generational comparisons.',
          'Respectful curiosity builds the adult bond you will keep for decades.',
        ],
        targetTiers: [T5],
        sortOrder: 1,
      }),
      makeVideo({
        id: 'vid-42-t5-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        youtubeVideoId: 'CyElHdaqkjo',
        title: 'How to Raise Successful Kids — Without Over-Parenting',
        presenter: 'Julie Lythcott-Haims, JD',
        channelName: 'TED',
        publishedAt: '2026-11-12T11:00:00.000Z',
        durationMinutes: 14,
        formatLabel: 'Autonomy Talk',
        takeaway:
          'Former Stanford Dean Julie Lythcott-Haims on stepping smoothly from daily manager into trusted consultant.',
        jumpChips: [
          { seconds: 120, label: '2:00 · The check-listed childhood trap' },
          { seconds: 420, label: '7:00 · Why real responsibilities build agency' },
          { seconds: 670, label: '11:10 · Warmth before checklists' },
        ],
        skimBullets: [
          'Rescuing every bump deprives older teens of problem-solving confidence.',
          'Real household responsibility predicts young-adult thriving.',
          'Greet your teen with love first—not a quiz about deadlines.',
        ],
        targetTiers: [T5],
        sortOrder: 2,
      }),
    ],
    dinnerPrompts: [
      // T0
      makeDinner({
        id: 'dp-42-t0-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'What was the silliest animal sound or face that made your toddler giggle the hardest today?',
        parentTip:
          'Model one playful animal sound at the table and pause three full seconds for mirroring.',
        followUp: 'Can you show me the quietest little mouse squeak next?',
        targetTiers: [T0],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-42-t0-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'If a tiny puppy sat beside the high chair tonight, which finger food would it sniff first?',
        parentTip:
          'Turns mealtime into zero-pressure sensory exploration without nagging about bites.',
        followUp: 'Would the puppy pick soft banana or crunchy toast?',
        targetTiers: [T0],
        sortOrder: 2,
      }),
      makeDinner({
        id: 'dp-42-t0-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'What was one new object our little one pointed at today that caught both of our eyes?',
        parentTip:
          'A grounding check-in for co-parents to notice micro-milestones over dinner.',
        followUp: 'What sound did they make when we named it out loud?',
        targetTiers: [T0],
        sortOrder: 3,
      }),
      // T1
      makeDinner({
        id: 'dp-42-t1-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'If your favorite stuffed animal came to school with you today, what part would surprise it most?',
        parentTip:
          'Speaking through a playful character lowers pressure compared to "How was school?"',
        followUp: 'Where would it want to sit during story time?',
        targetTiers: [T1],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-42-t1-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'What was one tricky thing your hands or brain practiced today even if it felt wobbly?',
        parentTip:
          'Reinforces growth mindset by celebrating persistence rather than perfection.',
        followUp: 'Did it feel easier on the second try or do we want to try again tomorrow?',
        targetTiers: [T1],
        sortOrder: 2,
      }),
      makeDinner({
        id: 'dp-42-t1-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'If we built a blanket fort big enough for dinner, what rule would we paint on the door?',
        parentTip:
          'Playful rule-making gives preschoolers positive experience co-designing boundaries.',
        followUp: 'Who gets to pick the secret password?',
        targetTiers: [T1],
        sortOrder: 3,
      }),
      // T2
      makeDinner({
        id: 'dp-42-t2-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'If you could invent one brand-new recess game tomorrow, what would the fairest rule be?',
        parentTip:
          'Invites elementary kids to reflect on fairness and social dynamics without feeling interrogated.',
        followUp: 'How would a new kid learn the rules in thirty seconds?',
        targetTiers: [T2],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-42-t2-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'What was the funniest moment in a game or show you saw this week—and what made it clever?',
        parentTip:
          'Genuine curiosity about their media world builds trust for tougher tech chats later.',
        followUp: 'Can you show me how that level works after dinner for five minutes?',
        targetTiers: [T2],
        sortOrder: 2,
      }),
      makeDinner({
        id: 'dp-42-t2-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question: 'Who did something unexpectedly kind at school or practice this week?',
        parentTip: 'Trains attention on prosocial peer cues rather than playground drama.',
        followUp: 'What small kind move could we pull off for someone tomorrow?',
        targetTiers: [T2],
        sortOrder: 3,
      }),
      // T3
      makeDinner({
        id: 'dp-42-t3-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'What is one unwritten rule in your grade right now that adults totally misunderstand?',
        parentTip:
          'Positions your tween as the cultural guide—listen with warmth and zero eye-rolling.',
        followUp: 'Which part of that rule actually feels fair, and which part feels exhausting?',
        targetTiers: [T3],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-42-t3-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'If you redesigned the school lunch table or group chat to have zero awkwardness, what changes first?',
        parentTip:
          'Opens space to talk about belonging and exclusion safely from one step removed.',
        followUp: 'What helps someone feel included quickly when they join a new group?',
        targetTiers: [T3],
        sortOrder: 2,
      }),
      makeDinner({
        id: 'dp-42-t3-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'What was one genuinely funny clip or meme that made your friends laugh this week?',
        parentTip: 'Sharing humor keeps connection light even during a busy pre-teen week.',
        followUp: 'What makes a joke land versus trying too hard?',
        targetTiers: [T3],
        sortOrder: 3,
      }),
      // T4
      makeDinner({
        id: 'dp-42-t4-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'What is one expectation adults put on teens today that feels completely out of date?',
        parentTip:
          'Stay genuinely curious and resist defending your generation—listen for what feels heavy.',
        followUp: 'What would a more realistic version of that expectation look like in our house?',
        targetTiers: [T4],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-42-t4-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'When does being reachable on your phone feel helpful, and when does it secretly feel like a chore?',
        parentTip:
          'Most teens feel relief admitting instant-reply fatigue when there is zero lecture attached.',
        followUp:
          'Would having an automatic evening pause make switching off easier with friends?',
        targetTiers: [T4],
        sortOrder: 2,
      }),
      makeDinner({
        id: 'dp-42-t4-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question: 'What class, hobby, or rabbit hole actually made time fly by this week?',
        parentTip: 'Protects intrinsic curiosity from getting buried under grade-portal stress.',
        followUp: 'What is one tiny detail about it that most people miss?',
        targetTiers: [T4],
        sortOrder: 3,
      }),
      // T5
      makeDinner({
        id: 'dp-42-t5-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'Looking back a year, what is one habit or perspective you are glad you outgrew?',
        parentTip:
          'Treats your older teen as a reflective near-adult and models sharing one of your own too.',
        followUp: 'What advice would you give your 14-year-old self about handling stress?',
        targetTiers: [T5],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-42-t5-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'Where did your attention feel sharpest this week—and what stole it fastest?',
        parentTip:
          'Frames digital self-regulation as personal agency rather than parental oversight.',
        followUp:
          'What small environment tweak would protect your best focus block next week?',
        targetTiers: [T5],
        sortOrder: 2,
      }),
      makeDinner({
        id: 'dp-42-t5-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        question:
          'If we kept one family tradition even after you move out, which ordinary ritual makes the cut?',
        parentTip:
          'Affirms lasting belonging while honoring their upcoming launch into independence.',
        followUp: 'How should we upgrade it together this month?',
        targetTiers: [T5],
        sortOrder: 3,
      }),
    ],
    // Strictly Ages 7-18 ONLY (ZERO phrases for T0 or T1)
    phrases: [
      makePhrase({
        id: 'ph-42-t2-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Griefing',
        shortMeaning: 'Wrecking a shared build',
        fullMeaning:
          'Deliberately sabotaging another player’s house, bridge, or progress inside Minecraft or Roblox.',
        cringeLevel: 1,
        cringeLabel: 'Normal gaming word',
        calmScript:
          '"That feels really unfair when you worked hard on it. Want help backing up the world?"',
        targetTiers: [T2],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-42-t2-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Clutched',
        shortMeaning: 'Last-second save or win',
        fullMeaning:
          'Pulling off an unexpected victory or team rescue right when losing looked guaranteed.',
        cringeLevel: 2,
        cringeLabel: 'Fun way to cheer a win',
        calmScript: '"Staying steady when the game got intense took real focus."',
        targetTiers: [T2],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-42-t2-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'No Backsies',
        shortMeaning: 'Recess trades are final',
        fullMeaning:
          'Unwritten schoolyard rule that once you agree to a card or toy swap, it cannot be undone.',
        cringeLevel: 1,
        cringeLabel: 'Classic playground phrase',
        calmScript:
          '"Even with \'no backsies,\' good friends check in when someone felt rushed."',
        targetTiers: [T2],
        sortOrder: 3,
      }),
      makePhrase({
        id: 'ph-42-t3-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Crashout',
        shortMeaning: 'Over-the-top meltdown',
        fullMeaning:
          'Losing all cool over a tiny annoyance or game defeat—usually said playfully about dramatic reactions.',
        cringeLevel: 3,
        cringeLabel: 'Understand, skip saying aloud',
        calmScript:
          '"Sounds like that match got intensely frustrating—want ten minutes to reset?"',
        targetTiers: [T3],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-42-t3-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Cooked',
        shortMeaning: 'Exhausted or doomed',
        fullMeaning:
          'Dramatic shorthand for feeling completely behind, caught, or worn out before a quiz or deadline.',
        cringeLevel: 2,
        cringeLabel: 'Okay with a light smile',
        calmScript:
          '"You sound stretched thin on that project—want to break step one into ten minutes?"',
        targetTiers: [T3],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-42-t3-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Aura',
        shortMeaning: 'Unspoken social cool factor',
        fullMeaning:
          'Playful imaginary scoreboard of dignity—doing something smooth gains aura, tripping in the hall loses aura.',
        cringeLevel: 3,
        cringeLabel: 'Understand, skip saying aloud',
        calmScript:
          '"Funny how fast everyone forgets awkward moments even when they feel huge in the hallway."',
        targetTiers: [T3],
        sortOrder: 3,
      }),
      makePhrase({
        id: 'ph-42-t4-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Glazing',
        shortMeaning: 'Over-the-top flattery',
        fullMeaning:
          'Teasing someone for praising a celebrity, athlete, or friend way too enthusiastically.',
        cringeLevel: 3,
        cringeLabel: 'Best left to teens',
        calmScript:
          '"Sounds like they are really enthusiastic about that—what did you think of it?"',
        targetTiers: [T4],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-42-t4-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Locked In',
        shortMeaning: 'Deeply focused and determined',
        fullMeaning:
          'Entering a zone of serious concentration for a big game, exam review, or creative build.',
        cringeLevel: 1,
        cringeLabel: 'Natural for parents too',
        calmScript:
          '"I can tell you are really locked in on that assignment—I will leave a snack by the door."',
        targetTiers: [T4],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-42-t4-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Left on Read',
        shortMeaning: 'Seen message, no reply',
        fullMeaning:
          'When a read receipt shows a peer opened a message without answering—often stirring teen anxiety.',
        cringeLevel: 1,
        cringeLabel: 'Everyday digital phrase',
        calmScript:
          '"Silent read receipts feel stingy, even when people are just busy or forgot to hit send."',
        targetTiers: [T4],
        sortOrder: 3,
      }),
      makePhrase({
        id: 'ph-42-t5-1',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Soft Launch',
        shortMeaning: 'Subtle reveal on social media',
        fullMeaning:
          'Hinting at a new relationship, job, or college plan with a low-key cropped photo instead of a big announcement.',
        cringeLevel: 2,
        cringeLabel: 'Fine in casual conversation',
        calmScript:
          '"It makes sense wanting to keep new things low-pressure while you figure them out."',
        targetTiers: [T5],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-42-t5-2',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Delulu',
        shortMeaning: 'Playfully unrealistic optimism',
        fullMeaning:
          'Self-deprecating joke about clinging to a wildly optimistic hope, from concert tickets to dream acceptances.',
        cringeLevel: 3,
        cringeLabel: 'Understand, skip saying aloud',
        calmScript:
          '"Having big hopes is healthy—let us also map a solid backup plan you genuinely like."',
        targetTiers: [T5],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-42-t5-3',
        digestId: ISSUE_42_ID,
        issueNumber: 42,
        word: 'Bed Rotting',
        shortMeaning: 'Extended low-energy lounging',
        fullMeaning:
          'Spending hours scrolling or resting under the covers to decompress—harmless briefly, worth checking if chronic.',
        cringeLevel: 2,
        cringeLabel: 'Helpful vocabulary to know',
        calmScript:
          '"Long weeks drain everyone—want a quiet walk or coffee later when you are ready?"',
        targetTiers: [T5],
        sortOrder: 3,
      }),
    ],
  },
  {
    id: ISSUE_41_ID,
    issueNumber: 41,
    publishDate: '2026-11-08T00:00:00.000Z',
    weekStart: '2026-11-01T00:00:00.000Z',
    weekEnd: '2026-11-08T00:00:00.000Z',
    title: 'Big Feelings, Short-Form Loops & Steady Leadership',
    summary:
      'Archive edition exploring emotional regulation, virtual reward wheels, and protecting calm family routines.',
    status: DigestIssueStatus.PUBLISHED,
    articles: [
      // T0
      makeArticle({
        id: 'art-41-t0-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'ZERO TO THREE',
        sourceDomain: 'zerotothree.org',
        sourceUrl:
          'https://www.zerotothree.org/resource/toddlers-and-challenging-behavior-why-they-do-it-and-how-to-respond/',
        publishedAt: '2026-11-06T14:00:00.000Z',
        topicLabel: 'Emotional Regulation',
        readMinutes: 4,
        title: 'Why toddler biting and hitting are communication, not defiance',
        summary:
          'ZERO TO THREE explains how immature language circuits leave eighteen- to thirty-month-olds leaning on physical impulses when overwhelmed, and how calm blocking teaches safer words.',
        keyShift:
          'Block the hand gently, drop your voice low, and hand them the exact two-word phrase they needed.',
        targetTiers: [T0],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-41-t0-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/ages-stages/toddler/nutrition/Pages/Selecting-Snacks-for-Toddlers.aspx',
        publishedAt: '2026-11-04T11:30:00.000Z',
        topicLabel: 'Sleep & Routines',
        readMinutes: 3,
        title: 'Predictable snack rhythms that end toddler grazing battles',
        summary:
          'HealthyChildren.org explains why spacing structured mini-meals every two to three hours lets toddlers arrive genuinely hungry to the family table.',
        keyShift: 'Serve snacks seated at the table rather than walking around with open pouches.',
        targetTiers: [T0],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-41-t0-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Harvard Center on the Developing Child',
        sourceDomain: 'developingchild.harvard.edu',
        sourceUrl: 'https://developingchild.harvard.edu/resources/inbrief-executive-function/',
        publishedAt: '2026-11-02T15:00:00.000Z',
        topicLabel: 'Play & Learning',
        readMinutes: 4,
        title: 'Building tiny waiting muscles through peek-a-boo and simple songs',
        summary:
          'Harvard’s Developing Child center shows how rhythmic turn-taking games build early working memory and impulse regulation well before preschool.',
        keyShift:
          'Pause two extra beats before the surprise line of a song so your toddler practices anticipation.',
        targetTiers: [T0],
        isLead: false,
        sortOrder: 3,
      }),

      // T1
      makeArticle({
        id: 'art-41-t1-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl: 'https://childmind.org/article/helping-preschoolers-manage-big-emotions/',
        publishedAt: '2026-11-06T12:00:00.000Z',
        topicLabel: 'Emotional Regulation',
        readMinutes: 4,
        title: 'Helping four- and five-year-olds name big feelings before bedtime',
        summary:
          'Child Mind Institute therapists share playful visual cues that help preschoolers spot frustration early before tears escalate into bedtime stalling.',
        keyShift:
          'Practice feeling words during calm afternoon play—never for the first time mid-tantrum.',
        targetTiers: [T1],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-41-t1-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/ages-stages/preschool/Pages/Power-of-Play.aspx',
        publishedAt: '2026-11-04T16:15:00.000Z',
        topicLabel: 'Play & Learning',
        readMinutes: 3,
        title: 'Why doctors literally prescribe unstructured outdoor play',
        summary:
          'AAP pediatricians outline how climbing, balancing, and muddy loose-parts play calibrate preschool vestibular systems and deepen nighttime sleep.',
        keyShift:
          'Aim for thirty minutes of outdoor free movement before afternoon indoor transitions.',
        targetTiers: [T1],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-41-t1-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Common Sense Media',
        sourceDomain: 'commonsensemedia.org',
        sourceUrl: 'https://www.commonsensemedia.org/articles/how-to-choose-quality-kids-apps',
        publishedAt: '2026-11-03T10:00:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 4,
        title: 'Spotting dark-pattern reward popups inside preschool tablet apps',
        summary:
          'Common Sense Media breaks down how coin chests and countdown badges pressure young kids, and how to pick ad-free creative apps instead.',
        keyShift:
          'Prefer offline drawing or storytelling apps with zero pop-up stores or daily streak timers.',
        targetTiers: [T1],
        isLead: false,
        sortOrder: 3,
      }),

      // T2
      makeArticle({
        id: 'art-41-t2-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Common Sense Media',
        sourceDomain: 'commonsensemedia.org',
        sourceUrl:
          'https://www.commonsensemedia.org/articles/in-app-purchases-and-loot-boxes-explained',
        publishedAt: '2026-11-07T09:30:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 4,
        title: 'Explaining virtual currency and mystery prize wheels to 8-year-olds',
        summary:
          'Common Sense Media demystifies how mystery eggs and spinning reward wheels borrow casino cues to nudge Robux requests.',
        keyShift:
          'Turn virtual coin prices into real-world allowances together so kids see the true tradeoff.',
        targetTiers: [T2],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-41-t2-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Greater Good Magazine',
        sourceDomain: 'greatergood.berkeley.edu',
        sourceUrl:
          'https://greatergood.berkeley.edu/article/item/how_to_help_kids_handle_losing',
        publishedAt: '2026-11-05T13:45:00.000Z',
        topicLabel: 'Social & Peers',
        readMinutes: 3,
        title: 'Coaching sore losers through board games and weekend sports',
        summary:
          'Greater Good Magazine explains why elementary children feel intense physical sting after losing and how calm co-regulation builds sportsmanship.',
        keyShift:
          'Skip lecturing on the sideline—validate the sting first and debrief playfully over dinner.',
        targetTiers: [T2],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-41-t2-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/healthy-living/sleep/Pages/Healthy-Sleep-Habits-How-Many-Hours-Does-Your-Child-Need.aspx',
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
      makeArticle({
        id: 'art-41-t3-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Common Sense Media',
        sourceDomain: 'commonsensemedia.org',
        sourceUrl: 'https://www.commonsensemedia.org/articles/youtube-shorts-and-tweens',
        publishedAt: '2026-11-06T15:30:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 4,
        title: 'Why endless short-form loops leave tweens snappy when screens turn off',
        summary:
          'Common Sense Media unpacks how rapid 30-second video swipes spike dopamine anticipation and make ordinary afternoon transitions feel abruptly irritating.',
        keyShift:
          'Favor full-length creator videos watched on a shared TV over solo vertical swipe feeds.',
        targetTiers: [T3],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-41-t3-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl: 'https://childmind.org/article/helping-tweens-build-friendship-skills/',
        publishedAt: '2026-11-04T14:20:00.000Z',
        topicLabel: 'Social & Peers',
        readMinutes: 4,
        title: 'Navigating shifting middle-school friend groups with steady calm',
        summary:
          'Child Mind Institute notes that friendship reshuffling in fifth and sixth grade is developmentally normal, even when it feels devastating to your tween.',
        keyShift:
          'Avoid bad-mouthing former friends—stay steady while helping your tween diversify activities.',
        targetTiers: [T3],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-41-t3-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/ages-stages/gradeschool/puberty/Pages/Physical-Development-of-School-Age-Children.aspx',
        publishedAt: '2026-11-02T12:00:00.000Z',
        topicLabel: 'Emotional Regulation',
        readMinutes: 4,
        title: 'Early adrenarche: why mood waves start years before visible puberty',
        summary:
          'HealthyChildren.org explains how quiet adrenal hormone shifts around age ten amplify emotional sensitivity and privacy needs long before high school.',
        keyShift:
          'Knock before entering their room and treat eye-rolls as nervous-system friction, not disrespect.',
        targetTiers: [T3],
        isLead: false,
        sortOrder: 3,
      }),

      // T4
      makeArticle({
        id: 'art-41-t4-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Greater Good Magazine',
        sourceDomain: 'greatergood.berkeley.edu',
        sourceUrl:
          'https://greatergood.berkeley.edu/article/item/why_teens_need_parents_more_than_they_show',
        publishedAt: '2026-11-06T16:45:00.000Z',
        topicLabel: 'Family Communication',
        readMinutes: 5,
        title: 'Why teens push away on the surface while watching your reaction closely',
        summary:
          'Greater Good Magazine summarizes adolescent attachment studies revealing that steady parental warmth remains the strongest protective factor against peer pressure.',
        keyShift:
          'Stay available for late-night kitchen chats even if they gave one-word answers at 4 PM.',
        targetTiers: [T4],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-41-t4-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/ages-stages/teen/fitness/Pages/Energy-Drinks-and-Teens.aspx',
        publishedAt: '2026-11-04T10:30:00.000Z',
        topicLabel: 'Sleep & Routines',
        readMinutes: 3,
        title: 'High-caffeine energy cans and afternoon anxiety spikes in teens',
        summary:
          'AAP pediatricians explain how trendy 200mg canned energy drinks marketed via streamers linger past midnight and compound adolescent circadian delay.',
        keyShift:
          'Compare caffeine labels side by side calmly and stock chilled sparkling alternatives at home.',
        targetTiers: [T4],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-41-t4-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl: 'https://childmind.org/article/how-to-help-teens-manage-social-comparison/',
        publishedAt: '2026-11-03T15:10:00.000Z',
        topicLabel: 'Social & Peers',
        readMinutes: 4,
        title: 'Interrupting algorithm-driven body and status comparison calmly',
        summary:
          'Clinicians share practical media-literacy questions that help young teens notice how filtered feeds monetize insecurity without shaming their interests.',
        keyShift:
          'Audit feed recommendations together by asking "How does this account make you feel five minutes later?"',
        targetTiers: [T4],
        isLead: false,
        sortOrder: 3,
      }),

      // T5
      makeArticle({
        id: 'art-41-t5-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl:
          'https://childmind.org/article/supporting-teens-through-college-and-career-decisions/',
        publishedAt: '2026-11-07T11:00:00.000Z',
        topicLabel: 'School & Focus',
        readMinutes: 5,
        title: 'Lowering the temperature around senior-year admissions and next steps',
        summary:
          'Child Mind Institute encourages families to designate one weekly logistics meeting so college or career talk stops colonizing every dinner and car ride.',
        keyShift:
          'Contain applications talk to one agreed 30-minute Sunday slot so the rest of the week stays relational.',
        targetTiers: [T5],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-41-t5-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Common Sense Media',
        sourceDomain: 'commonsensemedia.org',
        sourceUrl:
          'https://www.commonsensemedia.org/articles/digital-footprint-guide-for-teens',
        publishedAt: '2026-11-05T12:30:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 4,
        title: 'Practical digital reputation hygiene for jobs, athletics, and scholarships',
        summary:
          'Common Sense Media offers a calm ten-minute privacy checklist older teens can run themselves to archive old public posts and tighten account permissions.',
        keyShift:
          'Invite them to search their own name once a year as an empowering adult-readiness habit.',
        targetTiers: [T5],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-41-t5-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        sourceName: 'Greater Good Magazine',
        sourceDomain: 'greatergood.berkeley.edu',
        sourceUrl:
          'https://greatergood.berkeley.edu/article/item/helping_older_teens_build_real_world_community',
        publishedAt: '2026-11-02T14:00:00.000Z',
        topicLabel: 'Social & Peers',
        readMinutes: 4,
        title: 'Why part-time work and mentoring build genuine teen purpose',
        summary:
          'UC Berkeley researchers highlight how contributing to real-world workplaces or coaching younger kids lowers late-adolescent loneliness more reliably than passive social apps.',
        keyShift:
          'Celebrate responsibility outside academics as equally valuable evidence of maturity.',
        targetTiers: [T5],
        isLead: false,
        sortOrder: 3,
      }),
    ],
    videos: [
      makeVideo({
        id: 'vid-41-t0-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        youtubeVideoId: 'f-m2YcdMdFw',
        title: "Dr. Dan Siegel's Hand Model of the Brain",
        presenter: 'Dr. Daniel J. Siegel, MD',
        channelName: 'Dr. Dan Siegel',
        publishedAt: '2026-11-06T11:00:00.000Z',
        durationMinutes: 8,
        formatLabel: 'Brain Model',
        takeaway:
          'See what "flipping the lid" looks like during big early-childhood emotions and why connection comes first.',
        jumpChips: [
          { seconds: 60, label: '1:00 · Upstairs vs. downstairs brain' },
          { seconds: 210, label: '3:30 · Watch the lid flip' },
          { seconds: 360, label: '6:00 · Helping calm brakes reconnect' },
        ],
        skimBullets: [
          'The folded thumb represents the emotional alarm; fingers are the calm braking cortex.',
          'Reasoning disconnects until the nervous system feels safe.',
          'Kneeling low with calm warmth helps the upstairs bridge reconnect.',
        ],
        targetTiers: [T0, T1],
        sortOrder: 1,
      }),
      makeVideo({
        id: 'vid-41-t0-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        youtubeVideoId: 'BiXIs_-tCdo',
        title: "How to Calm a Fussy or Colicky Baby: The 5 S's Step by Step",
        presenter: 'Danielle (Newborn Care Educator)',
        channelName: 'Soft Healing by Danielle',
        publishedAt: '2026-11-04T15:00:00.000Z',
        durationMinutes: 10,
        formatLabel: 'Soothing Guide',
        takeaway:
          'Hands-on walkthrough of rhythmic soothing cues for fussy late-afternoon infant hours.',
        jumpChips: [
          { seconds: 60, label: '1:00 · Why the calming reflex works' },
          { seconds: 210, label: '3:30 · Swaddle & shushing cues' },
        ],
        skimBullets: [
          'Rhythmic sound and gentle motion activate the innate calming reflex.',
          'Always return baby flat on their back on a firm sleep surface once settled.',
        ],
        targetTiers: [T0],
        sortOrder: 2,
      }),
      makeVideo({
        id: 'vid-41-t1-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        youtubeVideoId: 'efCq_vHUMqs',
        title: 'InBrief: Executive Function: Skills for Life and Learning',
        presenter: 'Center on the Developing Child',
        channelName: 'Harvard University',
        publishedAt: '2026-11-05T13:00:00.000Z',
        durationMinutes: 6,
        formatLabel: '6-Min Science',
        takeaway:
          'How open-ended play and warm scaffolding wire working memory, flexibility, and self-control.',
        jumpChips: [
          { seconds: 45, label: '0:45 · Air-traffic control of the brain' },
          { seconds: 155, label: '2:35 · How open-ended play builds focus' },
        ],
        skimBullets: [
          'Executive function works like the brain’s air-traffic control system.',
          'Warm scaffolding gives kids just enough support to solve play puzzles.',
        ],
        targetTiers: [T1, T2],
        sortOrder: 2,
      }),
      makeVideo({
        id: 'vid-41-t2-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        youtubeVideoId: 'jvzQQDfAL-Q',
        title: 'Kids Do Well If They Can',
        presenter: 'Dr. Ross Greene, PhD',
        channelName: 'DrRossGreene',
        publishedAt: '2026-11-06T14:00:00.000Z',
        durationMinutes: 5,
        formatLabel: '5-Min Shift',
        takeaway:
          'Why challenging moments signal a lagging skill waiting for collaborative scaffolding rather than willful defiance.',
        jumpChips: [
          { seconds: 35, label: '0:35 · Kids do well if they can' },
          { seconds: 130, label: '2:10 · Lagging skills vs. defiance' },
        ],
        skimBullets: [
          'Replacing attitude labels with curiosity lowers friction immediately.',
          'Solving triggers upstream prevents repeated daily standoffs.',
        ],
        targetTiers: [T2, T3],
        sortOrder: 1,
      }),
      makeVideo({
        id: 'vid-41-t2-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        youtubeVideoId: 'XT_6Lvkhxvo',
        title: 'Protocols for Excellent Parenting & Improving Relationships',
        presenter: 'Dr. Becky Kennedy, PhD & Dr. Andrew Huberman, PhD',
        channelName: 'Huberman Lab',
        publishedAt: '2026-11-03T16:00:00.000Z',
        durationMinutes: 174,
        formatLabel: 'Deep Dive Talk',
        takeaway:
          'Sturdy leadership, after-school decompression, and holding warm boundaries without matching a child’s storm.',
        jumpChips: [
          { seconds: 900, label: '15:00 · Sturdy leadership under pressure' },
          { seconds: 3120, label: '52:00 · Seeing the good kid inside' },
        ],
        skimBullets: [
          'Kids feel safest when parents stay grounded during big feelings.',
          'After-school explosions reflect drained self-control reserves.',
        ],
        targetTiers: [T2, T3],
        sortOrder: 3,
      }),
      makeVideo({
        id: 'vid-41-t3-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        youtubeVideoId: 'ObHY7l62otM',
        title: 'The Emotional Lives of Teens: A Conversation with Dr. Lisa Damour',
        presenter: 'Dr. Lisa Damour, PhD',
        channelName: 'Nemours',
        publishedAt: '2026-11-05T18:00:00.000Z',
        durationMinutes: 32,
        formatLabel: 'Expert Q&A',
        takeaway:
          'Acting as your tween or teen’s steady emotional shock absorber through normal adolescent ups and downs.',
        jumpChips: [
          { seconds: 240, label: '4:00 · Healthy adolescent emotions' },
          { seconds: 900, label: '15:00 · Becoming an emotional shock absorber' },
        ],
        skimBullets: [
          'Mental health means riding normal big waves with coping tools—not constant cheerfulness.',
          'Side-by-side walks and car rides invite honest disclosure effortlessly.',
        ],
        targetTiers: [T3, T4, T5],
        sortOrder: 2,
      }),
      makeVideo({
        id: 'vid-41-t4-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        youtubeVideoId: 'PHpPtdk9rco',
        title: 'The Single Most Important Parenting Strategy',
        presenter: 'Dr. Becky Kennedy, PhD',
        channelName: 'TED',
        publishedAt: '2026-11-07T09:00:00.000Z',
        durationMinutes: 14,
        formatLabel: 'Repair Strategy',
        takeaway:
          'How two-step repair after tense moments rewrites hard memories and deepens teen trust.',
        jumpChips: [
          { seconds: 185, label: '3:05 · Why perfection is not the goal' },
          { seconds: 430, label: '7:10 · The two-step repair phrase' },
        ],
        skimBullets: [
          'Secure attachment grows from returning warmly after friction.',
          'Name what happened without blame and re-anchor unconditional connection.',
        ],
        targetTiers: [T4, T5],
        sortOrder: 1,
      }),
    ],
    dinnerPrompts: [
      makeDinner({
        id: 'dp-41-t0-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        question:
          'Which texture on the plate tonight feels squishy, and which one makes a loud crunch?',
        parentTip: 'Describing sensory properties invites curious tasting without pressure.',
        followUp: 'Can we tap the crunchy piece gently on our plate like a drum?',
        targetTiers: [T0],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-41-t1-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        question:
          'If your feelings today were weather—sunny, breezy, or thunderclouds—what was the forecast?',
        parentTip: 'Weather metaphors make big preschool emotions concrete and non-shaming.',
        followUp: 'What helped the clouds pass when it got stormy?',
        targetTiers: [T1],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-41-t2-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        question:
          'If you designed a fair video game shop, what would be free for everyone and what would kids earn by playing?',
        parentTip: 'Sparks natural critical thinking about virtual currency and game design.',
        followUp: 'Why do you think some games make rare items take so long to unlock?',
        targetTiers: [T2],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-41-t3-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        question:
          'Which video or channel actually taught you something cool this week instead of just eating time?',
        parentTip:
          'Distinguishes nourishing curiosity from mindless autoplay without shaming screens.',
        followUp: 'What made that creator worth subscribing to?',
        targetTiers: [T3],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-41-t4-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        question:
          'What trend or brand is everyone hyped about at school right now that feels totally overblown to you?',
        parentTip: 'Teens love sharing sharp cultural commentary when parents listen as equals.',
        followUp: 'How long do you give that trend before everyone moves on?',
        targetTiers: [T4],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-41-t5-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        question:
          'What is one adult skill nobody teaches in high school that you want to master before leaving home?',
        parentTip:
          'Invites collaborative skill-building—from budgeting to cooking—on their terms.',
        followUp: 'Want to tackle a starter version of it together next weekend?',
        targetTiers: [T5],
        sortOrder: 1,
      }),
    ],
    phrases: [
      makePhrase({
        id: 'ph-41-t2-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'Nerfed / Buffed',
        shortMeaning: 'Weakened or boosted in an update',
        fullMeaning:
          'When game designers tune a character or tool down (nerfed) or up (buffed) to keep matches fair.',
        cringeLevel: 2,
        cringeLabel: 'Playful for game talk',
        calmScript:
          '"Sounds like they wanted matches to stay fair. Do you agree with the change?"',
        targetTiers: [T2],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-41-t2-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'Duping',
        shortMeaning: 'Glitching to copy rare items',
        fullMeaning:
          'Exploiting a game bug to duplicate rare items rather than earning them through normal play.',
        cringeLevel: 1,
        cringeLabel: 'Normal gaming term',
        calmScript:
          '"Do shortcuts feel as satisfying as actually earning the item yourself?"',
        targetTiers: [T2],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-41-t2-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'Spawn Camping',
        shortMeaning: 'Waiting unfairly at respawn',
        fullMeaning:
          'Hovering right where defeated players reappear so they cannot move—widely seen as poor sportsmanship.',
        cringeLevel: 1,
        cringeLabel: 'Normal gaming term',
        calmScript:
          '"Good sportsmanship means giving everyone a fair step back into the game."',
        targetTiers: [T2],
        sortOrder: 3,
      }),
      makePhrase({
        id: 'ph-41-t3-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'Brainrot',
        shortMeaning: 'Absurd repetitive meme humor',
        fullMeaning:
          'Self-aware joke tweens use for goofy, fast-looping internet videos that feel silly and hypnotic.',
        cringeLevel: 2,
        cringeLabel: 'Funny to understand',
        calmScript:
          '"Even your brain knows when a feed gets too noisy—want to switch to something real?"',
        targetTiers: [T3],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-41-t3-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'Mid',
        shortMeaning: 'Average or underwhelming',
        fullMeaning:
          'Casual shorthand for anything mediocre—from cafeteria pizza to a hyped movie sequel.',
        cringeLevel: 2,
        cringeLabel: 'Okay in light banter',
        calmScript: '"What would have upgraded it from mid to genuinely great?"',
        targetTiers: [T3],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-41-t3-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'No Cap',
        shortMeaning: 'Seriously / no lie',
        fullMeaning: 'Emphasis meaning "I am being completely honest" at the end of a claim.',
        cringeLevel: 3,
        cringeLabel: 'Understand, skip saying aloud',
        calmScript: '"I hear you—you are being completely serious about that."',
        targetTiers: [T3],
        sortOrder: 3,
      }),
      makePhrase({
        id: 'ph-41-t4-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'Gatekeeping',
        shortMeaning: 'Hiding a cool spot or source',
        fullMeaning:
          'Playfully refusing to share where you bought a jacket or discovered an indie band so it stays niche.',
        cringeLevel: 1,
        cringeLabel: 'Widely used across ages',
        calmScript: '"Fair enough—keep your secret playlist safe if you want."',
        targetTiers: [T4],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-41-t4-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'NPC Energy',
        shortMeaning: 'On autopilot or awkward',
        fullMeaning:
          'Comparing someone acting stiffly or repetitively to a non-playable background video game character.',
        cringeLevel: 3,
        cringeLabel: 'Understand, skip saying aloud',
        calmScript:
          '"Wait—is that playful teasing or did someone actually feel left out?"',
        targetTiers: [T4],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-41-t4-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'Touch Grass',
        shortMeaning: 'Step offline and reset',
        fullMeaning:
          'Humorous nudge telling someone heated about online drama to step outside into real life.',
        cringeLevel: 2,
        cringeLabel: 'Playful shared reset cue',
        calmScript: '"Honestly, we could both use ten minutes outside right now."',
        targetTiers: [T4],
        sortOrder: 3,
      }),
      makePhrase({
        id: 'ph-41-t5-1',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'Hard Launch',
        shortMeaning: 'Public official reveal',
        fullMeaning:
          'Posting an unmistakable public announcement of a relationship, project, or milestone.',
        cringeLevel: 2,
        cringeLabel: 'Fine in casual talk',
        calmScript:
          '"You never owe the whole internet a public update before you feel ready."',
        targetTiers: [T5],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-41-t5-2',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'Chronically Online',
        shortMeaning: 'Lost in internet discourse',
        fullMeaning:
          'Spending so much time in niche feeds that tiny online arguments start feeling like real-world emergencies.',
        cringeLevel: 1,
        cringeLabel: 'Useful shared shorthand',
        calmScript:
          '"It is wild how quickly internet arguments shrink when you step back into real life."',
        targetTiers: [T5],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-41-t5-3',
        digestId: ISSUE_41_ID,
        issueNumber: 41,
        word: 'Green Flag',
        shortMeaning: 'Healthy, respectful sign',
        fullMeaning:
          'A positive behavior signaling emotional maturity, reliability, or kindness in a friend or partner.',
        cringeLevel: 1,
        cringeLabel: 'Natural for parents too',
        calmScript:
          '"Noticing green flags early is a huge life skill—what stood out about how they handled it?"',
        targetTiers: [T5],
        sortOrder: 3,
      }),
    ],
  },
  {
    id: ISSUE_40_ID,
    issueNumber: 40,
    publishDate: '2026-11-01T00:00:00.000Z',
    weekStart: '2026-10-25T00:00:00.000Z',
    weekEnd: '2026-11-01T00:00:00.000Z',
    title: 'Everyday Independence, Notification Hygiene & Play',
    summary:
      'Archive edition on gentle readiness cues, digital kindness, and calm household money and focus habits.',
    status: DigestIssueStatus.PUBLISHED,
    articles: [
      makeArticle({
        id: 'art-40-t0-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/ages-stages/toddler/toilet-training/Pages/The-Right-Age-to-Toilet-Train.aspx',
        publishedAt: '2026-10-30T14:00:00.000Z',
        topicLabel: 'Sleep & Routines',
        readMinutes: 4,
        title: 'Reading genuine potty readiness cues without rushing the calendar',
        summary:
          'HealthyChildren.org outlines physical and emotional readiness signals between 18 and 36 months, explaining why skipping pressure prevents withholding.',
        keyShift:
          'Wait for dry stretches plus genuine curiosity rather than picking a holiday deadline.',
        targetTiers: [T0],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-40-t0-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'ZERO TO THREE',
        sourceDomain: 'zerotothree.org',
        sourceUrl:
          'https://www.zerotothree.org/resource/how-to-support-your-childs-communication-skills/',
        publishedAt: '2026-10-28T11:00:00.000Z',
        topicLabel: 'Play & Learning',
        readMinutes: 3,
        title: 'Everyday book sharing that sparks toddler vocabulary bursts',
        summary:
          'ZERO TO THREE recommends lingering on pictures your child points to rather than rushing to finish every page of a board book.',
        keyShift: 'Follow their finger on the page and pause five seconds so they can lead.',
        targetTiers: [T0],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-40-t1-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'Greater Good Magazine',
        sourceDomain: 'greatergood.berkeley.edu',
        sourceUrl:
          'https://greatergood.berkeley.edu/article/item/how_to_teach_preschoolers_empathy',
        publishedAt: '2026-10-30T10:30:00.000Z',
        topicLabel: 'Social & Peers',
        readMinutes: 4,
        title: 'Growing real preschool empathy beyond forced "say sorry" scripts',
        summary:
          'Greater Good Magazine shows why inviting a five-year-old to notice a friend’s face and offer a repair builds genuine empathy faster than coerced apologies.',
        keyShift: 'Ask "How can we help check on your friend?" once both kids catch their breath.',
        targetTiers: [T1],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-40-t1-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/ages-stages/preschool/nutrition-fitness/Pages/Picky-Eaters.aspx',
        publishedAt: '2026-10-28T13:15:00.000Z',
        topicLabel: 'Sleep & Routines',
        readMinutes: 3,
        title: 'Lowering dinner-table pressure during picky preschool phases',
        summary:
          'AAP pediatricians reassure parents that cautious eating at ages four to six is normal, and keeping one familiar food on every plate prevents mealtime standoffs.',
        keyShift: 'Keep food descriptions neutral—never tie dessert to cleaning a plate.',
        targetTiers: [T1],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-40-t2-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl: 'https://childmind.org/article/how-to-help-kids-with-homework-frustration/',
        publishedAt: '2026-10-30T16:00:00.000Z',
        topicLabel: 'School & Focus',
        readMinutes: 4,
        title: 'Turning kitchen-table homework battles into short focused sprints',
        summary:
          'Child Mind Institute recommends breaking third-grade assignments into ten-minute movement-backed blocks so depleted after-school brains stay regulated.',
        keyShift:
          'Sit nearby doing your own quiet reading rather than hovering over every pencil stroke.',
        targetTiers: [T2],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-40-t2-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'Greater Good Magazine',
        sourceDomain: 'greatergood.berkeley.edu',
        sourceUrl: 'https://greatergood.berkeley.edu/article/item/why_boredom_is_good_for_kids',
        publishedAt: '2026-10-28T15:00:00.000Z',
        topicLabel: 'Play & Learning',
        readMinutes: 3,
        title: 'Letting seven- to nine-year-olds cross the five-minute boredom bridge',
        summary:
          'Developmental psychologists observe that when parents resist immediately entertaining boredom, kids unlock deeper imaginative projects.',
        keyShift: 'Respond to "I am bored" with warm confidence: "I cannot wait to see what you invent."',
        targetTiers: [T2],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-40-t3-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/family-life/Media/Pages/Digital-Citizenship.aspx',
        publishedAt: '2026-10-30T13:00:00.000Z',
        topicLabel: 'Media & Tech',
        readMinutes: 4,
        title: 'Coaching digital kindness before your tween joins their first group chat',
        summary:
          'HealthyChildren.org encourages rehearsing real scenarios—screenshots, pile-ons, and misread sarcasm—so tweens enter messaging spaces with practical integrity.',
        keyShift:
          'Practice reading ambiguous texts out loud in two different tones to show how meaning twists.',
        targetTiers: [T3],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-40-t3-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl: 'https://childmind.org/article/executive-functioning-in-middle-school/',
        publishedAt: '2026-10-28T14:40:00.000Z',
        topicLabel: 'School & Focus',
        readMinutes: 4,
        title: 'Scaffolding locker, backpack, and planner habits in fifth and sixth grade',
        summary:
          'Clinicians note that sudden middle-school independence outpaces executive-function wiring, making light Sunday backpack resets a huge weekly stress reliever.',
        keyShift:
          'Do a five-minute Sunday checklist side-by-side instead of Thursday night emergency rescues.',
        targetTiers: [T3],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-40-t4-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'Common Sense Media',
        sourceDomain: 'commonsensemedia.org',
        sourceUrl:
          'https://www.commonsensemedia.org/articles/helping-teens-manage-notifications',
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
      makeArticle({
        id: 'art-40-t4-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'HealthyChildren.org (AAP)',
        sourceDomain: 'healthychildren.org',
        sourceUrl:
          'https://www.healthychildren.org/English/ages-stages/teen/Pages/Stages-of-Adolescence.aspx',
        publishedAt: '2026-10-28T11:45:00.000Z',
        topicLabel: 'Family Communication',
        readMinutes: 4,
        title: 'Why your 14-year-old argues about small things to practice autonomy',
        summary:
          'HealthyChildren.org reframes harmless adolescent pushback as safe sparring inside a secure home base rather than personal hostility.',
        keyShift: 'Save your firm "no" for health, sleep, and safety—let minor style preferences go.',
        targetTiers: [T4],
        isLead: false,
        sortOrder: 2,
      }),
      makeArticle({
        id: 'art-40-t5-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'Greater Good Magazine',
        sourceDomain: 'greatergood.berkeley.edu',
        sourceUrl:
          'https://greatergood.berkeley.edu/article/item/how_to_talk_to_older_teens_about_money',
        publishedAt: '2026-10-30T12:00:00.000Z',
        topicLabel: 'Family Communication',
        readMinutes: 4,
        title: 'Transparent household money conversations that prepare 17-year-olds well',
        summary:
          'Greater Good Magazine outlines how involving older teens in real grocery budgets, subscription audits, and savings goals builds financial confidence without fear.',
        keyShift:
          'Walk through one real monthly household bill together calmly to demystify adult budgets.',
        targetTiers: [T5],
        isLead: true,
        sortOrder: 1,
      }),
      makeArticle({
        id: 'art-40-t5-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        sourceName: 'Child Mind Institute',
        sourceDomain: 'childmind.org',
        sourceUrl: 'https://childmind.org/article/healthy-relationships-for-teens/',
        publishedAt: '2026-10-26T14:15:00.000Z',
        topicLabel: 'Social & Peers',
        readMinutes: 4,
        title: 'Talking openly about digital boundaries in teen dating and friendships',
        summary:
          'Child Mind Institute highlights why discussing location-sharing norms and password privacy calmly helps older teens recognize healthy respect.',
        keyShift:
          'Affirm that real trust never demands live location tracking or instant reply proof.',
        targetTiers: [T5],
        isLead: false,
        sortOrder: 2,
      }),
    ],
    videos: [
      makeVideo({
        id: 'vid-40-t0-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        youtubeVideoId: 'hXAEJJpk_Tk',
        title: "Potty Training Tips for Toddlers: Pediatrician's Guide",
        presenter: 'Dr. Mona Amin, DO, FAAP',
        channelName: 'PedsDocTalk',
        publishedAt: '2026-10-30T10:00:00.000Z',
        durationMinutes: 17,
        formatLabel: 'Pediatrician Guide',
        takeaway: 'Genuine readiness signs and low-pressure body trust without power struggles.',
        jumpChips: [
          { seconds: 110, label: '1:50 · Spotting readiness signals' },
          { seconds: 420, label: '7:00 · Avoiding power struggles' },
        ],
        skimBullets: [
          'Readiness signs matter far more than an arbitrary birthday.',
          'Neutral responses to accidents eliminate shame and speed learning.',
        ],
        targetTiers: [T0],
        sortOrder: 1,
      }),
      makeVideo({
        id: 'vid-40-t0-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        youtubeVideoId: 'TVRnbkHyXYk',
        title: 'What Babies Know',
        presenter: 'Prof. Alison Gopnik, PhD',
        channelName: 'ideacity',
        publishedAt: '2026-10-28T14:00:00.000Z',
        durationMinutes: 21,
        formatLabel: 'Brain Science',
        takeaway: 'How young brains run everyday physics and social experiments through play.',
        jumpChips: [
          { seconds: 150, label: '2:30 · Natural everyday scientists' },
          { seconds: 540, label: '9:00 · Testing cause and effect' },
        ],
        skimBullets: [
          'Babies actively test hypotheses through cups, spoons, and faces.',
          'Joyful open exploration builds flexible curiosity.',
        ],
        targetTiers: [T0, T1],
        sortOrder: 2,
      }),
      makeVideo({
        id: 'vid-40-t2-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        youtubeVideoId: 'G1oUkKWeVWc',
        title: 'Division of Responsibility at Mealtime',
        presenter: 'Montessori for Babies',
        channelName: 'Montessori for Babies',
        publishedAt: '2026-10-29T11:00:00.000Z',
        durationMinutes: 7,
        formatLabel: 'Mealtime Peace',
        takeaway: 'Clear parent-child mealtime roles that end picky-eating standoffs calmly.',
        skimBullets: [
          'Parents decide what and when; children decide whether and how much.',
          'One familiar safe anchor food lowers dinner-table tension.',
        ],
        targetTiers: [T1, T2],
        sortOrder: 1,
      }),
      makeVideo({
        id: 'vid-40-t3-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        youtubeVideoId: '4xn_MIThprw',
        title: 'How to Stay Calm and Teach Without Punishment',
        presenter: 'Dr. Laura Markham, PhD',
        channelName: 'Dr. Laura Markham',
        publishedAt: '2026-10-27T15:00:00.000Z',
        durationMinutes: 8,
        formatLabel: 'Calm Limits',
        takeaway: 'Holding firm limits with warmth and steady presence when pushback rises.',
        skimBullets: [
          'Pausing before reacting keeps boundaries clear without yelling.',
          'Empathy pairs naturally with firm household limits.',
        ],
        targetTiers: [T2, T3],
        sortOrder: 2,
      }),
      makeVideo({
        id: 'vid-40-t4-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        youtubeVideoId: '3E7hkPZ-HTk',
        title: 'Quit Social Media (Deep Focus & Attention)',
        presenter: 'Dr. Cal Newport, PhD',
        channelName: 'TEDx Talks',
        publishedAt: '2026-10-27T13:00:00.000Z',
        durationMinutes: 14,
        formatLabel: 'Deep Focus',
        takeaway:
          'Why notification switching drains deep study focus—and how 45-minute phone-free blocks reclaim teen calm.',
        jumpChips: [
          { seconds: 90, label: '1:30 · Attention residue & focus' },
          { seconds: 390, label: '6:30 · Uninterrupted study blocks' },
        ],
        skimBullets: [
          'Frequent phone checks leave attention residue that slows homework.',
          'Phone-in-another-room blocks finish assignments faster and free up rest.',
        ],
        targetTiers: [T3, T4, T5],
        sortOrder: 1,
      }),
    ],
    dinnerPrompts: [
      makeDinner({
        id: 'dp-40-t0-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        question: 'Which picture book page made your little one point and smile widest today?',
        parentTip: 'Let them linger on one animal without hurrying to finish the book.',
        followUp: 'What sound does that character make when it goes to sleep?',
        targetTiers: [T0],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-40-t1-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        question: 'What was one friendly thing you noticed someone else do at school or the park today?',
        parentTip: 'Trains social awareness gently without lecturing about sharing.',
        followUp: 'How did the other kid’s face look when that happened?',
        targetTiers: [T1],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-40-t2-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        question: 'What is something tricky you figured out by yourself this week?',
        parentTip: 'Highlights growing elementary agency and patience.',
        followUp: 'Did you almost quit before the breakthrough clicked?',
        targetTiers: [T2],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-40-t3-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        question:
          'Have you ever seen a text message get totally misread because nobody could hear the person’s voice?',
        parentTip: 'Opens natural digital-literacy reflection without accusing anyone.',
        followUp: 'When is it worth a quick voice note instead of ten texts?',
        targetTiers: [T3],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-40-t4-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        question:
          'Which app notification annoys you most when you are actually trying to finish something?',
        parentTip: 'Frames silencing notifications as reclaiming their own time.',
        followUp: 'Which two alerts are actually worth keeping on?',
        targetTiers: [T4],
        sortOrder: 1,
      }),
      makeDinner({
        id: 'dp-40-t5-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        question:
          'What is one household expense that surprised you once you saw what things actually cost?',
        parentTip: 'Normalizes transparent, calm adult money conversations.',
        followUp: 'What is one small money habit you want to build with your own earnings?',
        targetTiers: [T5],
        sortOrder: 1,
      }),
    ],
    phrases: [
      makePhrase({
        id: 'ph-40-t2-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'AFK',
        shortMeaning: 'Away from keyboard',
        fullMeaning: 'Quick multiplayer shorthand letting teammates know you stepped away.',
        cringeLevel: 1,
        cringeLabel: 'Helpful household cue',
        calmScript: '"Give your team a quick AFK in chat—dinner is on the table in two minutes."',
        targetTiers: [T2],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-40-t2-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'OP',
        shortMeaning: 'Overpowered / extra strong',
        fullMeaning: 'Describes a game tool, card, or character that feels almost unfairly powerful.',
        cringeLevel: 2,
        cringeLabel: 'Playful gaming shorthand',
        calmScript: '"Sounds like that move is seriously OP—how do players counter it?"',
        targetTiers: [T2],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-40-t2-3',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'GG',
        shortMeaning: 'Good game',
        fullMeaning: 'Respectful sign-off typed or spoken after a match ends, win or lose.',
        cringeLevel: 1,
        cringeLabel: 'Great sportsmanship cue',
        calmScript: '"Calling GG even after a tough loss takes real maturity."',
        targetTiers: [T2],
        sortOrder: 3,
      }),
      makePhrase({
        id: 'ph-40-t3-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'Sus',
        shortMeaning: 'Suspicious or sketchy',
        fullMeaning: 'Short for suspicious—used playfully when a story or offer seems questionable.',
        cringeLevel: 2,
        cringeLabel: 'Mildly dated, harmless',
        calmScript: '"Trust that gut check—if a free-currency offer feels sus, it usually is."',
        targetTiers: [T3],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-40-t3-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'Rage Quit',
        shortMeaning: 'Shutting a game down angry',
        fullMeaning: 'Abruptly disconnecting mid-match when frustration spikes.',
        cringeLevel: 1,
        cringeLabel: 'Everyday gaming phrase',
        calmScript: '"Stepping away before frustration explodes is smart—let us grab water."',
        targetTiers: [T3],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-40-t3-3',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'Main Character',
        shortMeaning: 'Acting like the star of the room',
        fullMeaning: 'Joking about dramatic confidence or playfully teasing self-centered moments.',
        cringeLevel: 2,
        cringeLabel: 'Lighthearted cultural phrase',
        calmScript: '"Fun energy—just make sure everyone else at the table gets a turn too."',
        targetTiers: [T3],
        sortOrder: 3,
      }),
      makePhrase({
        id: 'ph-40-t4-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'Ghosting',
        shortMeaning: 'Vanishing without a reply',
        fullMeaning: 'Suddenly cutting off texts or chats rather than having an honest conversation.',
        cringeLevel: 1,
        cringeLabel: 'Common across ages',
        calmScript: '"Being ghosted stings—a short kind message is always braver than disappearing."',
        targetTiers: [T4],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-40-t4-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'Lowkey / Highkey',
        shortMeaning: 'Quietly vs. unmistakably',
        fullMeaning: 'Softens or amplifies a feeling—e.g. "lowkey stressed" means quietly feeling pressure.',
        cringeLevel: 2,
        cringeLabel: 'Understand first',
        calmScript: '"Thanks for telling me you are quietly stressed—want to lighten tonight’s load?"',
        targetTiers: [T4],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-40-t4-3',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'Algorithm Trap',
        shortMeaning: 'Feed pushing one intense rabbit hole',
        fullMeaning: 'When pausing on one edgy video floods the rest of the feed with matching clips.',
        cringeLevel: 1,
        cringeLabel: 'Helpful media-literacy phrase',
        calmScript: '"Notice how one curious click reshaped the feed—hitting Not Interested resets it."',
        targetTiers: [T4],
        sortOrder: 3,
      }),
      makePhrase({
        id: 'ph-40-t5-1',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'Quiet Quitting',
        shortMeaning: 'Doing only the clear baseline',
        fullMeaning: 'Setting limits against unpaid overwork or perfectionist burnout.',
        cringeLevel: 1,
        cringeLabel: 'Mainstream workplace term',
        calmScript: '"Learning where healthy boundaries sit now will protect you in college and work."',
        targetTiers: [T5],
        sortOrder: 1,
      }),
      makePhrase({
        id: 'ph-40-t5-2',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'Doomscrolling',
        shortMeaning: 'Compulsive late-night scrolling',
        fullMeaning: 'Continuing to swipe through heavy posts long after it stops feeling restful.',
        cringeLevel: 1,
        cringeLabel: 'Common across ages',
        calmScript: '"Leaving phones across the room at night helps both of us avoid doomscrolling."',
        targetTiers: [T5],
        sortOrder: 2,
      }),
      makePhrase({
        id: 'ph-40-t5-3',
        digestId: ISSUE_40_ID,
        issueNumber: 40,
        word: 'Ick',
        shortMeaning: 'Sudden turn-off over a small quirk',
        fullMeaning: 'Playful shorthand for a minor habit that suddenly cools enthusiasm.',
        cringeLevel: 2,
        cringeLabel: 'Playful conversation term',
        calmScript: '"Small quirks loom big early on—real compatibility shows up in how conflict goes."',
        targetTiers: [T5],
        sortOrder: 3,
      }),
    ],
  },
];

export interface GuestInteractionSnapshot {
  readArticleIds: Set<string>;
  savedArticleIds: Set<string>;
  savedVideoIds: Set<string>;
  savedDinnerIds: Set<string>;
}

const EMPTY_GUEST_STATE: GuestInteractionSnapshot = {
  readArticleIds: new Set(),
  savedArticleIds: new Set(),
  savedVideoIds: new Set(),
  savedDinnerIds: new Set(),
};

function hydrateArticle(
  article: DigestArticleDTO,
  guest: GuestInteractionSnapshot
): DigestArticleDTO {
  return {
    ...article,
    isRead: guest.readArticleIds.has(article.id),
    isSaved: guest.savedArticleIds.has(article.id),
  };
}

function hydrateVideo(
  video: DigestVideoDTO,
  guest: GuestInteractionSnapshot
): DigestVideoDTO {
  return {
    ...video,
    isSaved: guest.savedVideoIds.has(video.id),
  };
}

function hydrateDinner(
  prompt: DigestDinnerPromptDTO,
  guest: GuestInteractionSnapshot
): DigestDinnerPromptDTO {
  return {
    ...prompt,
    isSaved: guest.savedDinnerIds.has(prompt.id),
  };
}

function toIssueSummary(
  record: MockIssueRecord,
  tier?: DevelopmentalTier
): DigestIssueSummaryDTO {
  const bucket = tier ? resolveDigestTierBucket(tier) : null;
  const articles = bucket
    ? record.articles.filter((a) => a.targetTiers.includes(bucket))
    : record.articles;
  const videos = bucket
    ? record.videos.filter((v) => v.targetTiers.includes(bucket))
    : record.videos;

  return {
    id: record.id,
    issueNumber: record.issueNumber,
    publishDate: record.publishDate,
    weekStart: record.weekStart,
    weekEnd: record.weekEnd,
    title: record.title,
    summary: record.summary,
    status: record.status,
    articleCount: articles.length,
    videoCount: videos.length,
  };
}

export function getMockDigestIssues(
  tier?: DevelopmentalTier
): DigestIssueSummaryDTO[] {
  return MOCK_DIGEST_EDITIONS.map((edition) => toIssueSummary(edition, tier));
}

export function getMockWeeklyEdition(
  issueNumber: number | 'latest',
  tier: DevelopmentalTier,
  guest: GuestInteractionSnapshot = EMPTY_GUEST_STATE
): WeeklyDigestEditionDTO {
  const bucket = resolveDigestTierBucket(tier);
  const record =
    issueNumber === 'latest'
      ? MOCK_DIGEST_EDITIONS[0]!
      : (MOCK_DIGEST_EDITIONS.find((e) => e.issueNumber === issueNumber) ??
        MOCK_DIGEST_EDITIONS[0]!);

  const articles = record.articles
    .filter((a) => a.targetTiers.includes(bucket))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((a) => hydrateArticle(a, guest));

  const videos = record.videos
    .filter((v) => v.targetTiers.includes(bucket))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((v) => hydrateVideo(v, guest));

  const dinnerPrompts = record.dinnerPrompts
    .filter((d) => d.targetTiers.includes(bucket))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((d) => hydrateDinner(d, guest));

  const phrases = isSlangEligibleTier(bucket)
    ? record.phrases
        .filter((p) => p.targetTiers.includes(bucket))
        .sort((a, b) => a.sortOrder - b.sortOrder)
    : [];

  const readArticleCount = articles.filter((a) => a.isRead).length;

  return {
    issue: toIssueSummary(record, bucket),
    resolvedTier: bucket,
    videos,
    articles,
    dinnerPrompts,
    phrases,
    readArticleCount,
    totalArticleCount: articles.length,
  };
}

export function getMockDigestArticles(
  params: {
    issueNumber?: number;
    scope?: DigestQueryScope;
    tier: DevelopmentalTier;
    unreadOnly?: boolean;
    q?: string;
  },
  guest: GuestInteractionSnapshot = EMPTY_GUEST_STATE
): DigestArticlesResponseDTO {
  const bucket = resolveDigestTierBucket(params.tier);
  const scope = params.scope ?? 'issue';
  const targetIssueNumber = params.issueNumber ?? MOCK_DIGEST_EDITIONS[0]!.issueNumber;

  const editions =
    scope === 'all'
      ? MOCK_DIGEST_EDITIONS
      : MOCK_DIGEST_EDITIONS.filter((e) => e.issueNumber === targetIssueNumber);

  const inScope = editions.flatMap((e) =>
    e.articles
      .filter((a) => a.targetTiers.includes(bucket))
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((a) => hydrateArticle(a, guest))
  );

  const unreadCount = inScope.filter((a) => !a.isRead).length;
  const query = (params.q ?? '').trim().toLowerCase();

  const filtered = inScope.filter((a) => {
    if (params.unreadOnly && a.isRead) return false;
    if (!query) return true;
    return (
      a.title.toLowerCase().includes(query) ||
      a.summary.toLowerCase().includes(query) ||
      a.topicLabel.toLowerCase().includes(query) ||
      a.sourceName.toLowerCase().includes(query)
    );
  });

  return {
    articles: filtered,
    unreadCount,
    totalInScope: inScope.length,
    issueNumber: scope === 'issue' ? targetIssueNumber : undefined,
  };
}

export function getMockDigestVideos(
  params: {
    issueNumber?: number;
    scope?: DigestQueryScope;
    tier: DevelopmentalTier;
    durationBucket?: DigestVideoDurationBucket;
    q?: string;
  },
  guest: GuestInteractionSnapshot = EMPTY_GUEST_STATE
): DigestVideosResponseDTO {
  const bucket = resolveDigestTierBucket(params.tier);
  const scope = params.scope ?? 'issue';
  const targetIssueNumber = params.issueNumber ?? MOCK_DIGEST_EDITIONS[0]!.issueNumber;

  const editions =
    scope === 'all'
      ? MOCK_DIGEST_EDITIONS
      : MOCK_DIGEST_EDITIONS.filter((e) => e.issueNumber === targetIssueNumber);

  const inScope = editions.flatMap((e) =>
    e.videos
      .filter((v) => v.targetTiers.includes(bucket))
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((v) => hydrateVideo(v, guest))
  );

  const durationBucket = params.durationBucket ?? 'all';
  const query = (params.q ?? '').trim().toLowerCase();

  const filtered = inScope.filter((v) => {
    if (!matchesVideoDurationBucket(v.durationMinutes, durationBucket)) return false;
    if (!query) return true;
    return (
      v.title.toLowerCase().includes(query) ||
      v.presenter.toLowerCase().includes(query) ||
      v.channelName.toLowerCase().includes(query) ||
      v.takeaway.toLowerCase().includes(query)
    );
  });

  return {
    videos: filtered,
    totalInScope: inScope.length,
    issueNumber: scope === 'issue' ? targetIssueNumber : undefined,
  };
}

export function getMockSavedShortlist(
  tier: DevelopmentalTier,
  guest: GuestInteractionSnapshot = EMPTY_GUEST_STATE
): SavedDigestShortlistDTO {
  const bucket = resolveDigestTierBucket(tier);

  const articles = MOCK_DIGEST_EDITIONS.flatMap((e) =>
    e.articles
      .filter((a) => a.targetTiers.includes(bucket) && guest.savedArticleIds.has(a.id))
      .map((a) => hydrateArticle(a, guest))
  );

  const videos = MOCK_DIGEST_EDITIONS.flatMap((e) =>
    e.videos
      .filter((v) => v.targetTiers.includes(bucket) && guest.savedVideoIds.has(v.id))
      .map((v) => hydrateVideo(v, guest))
  );

  const dinnerPrompts = MOCK_DIGEST_EDITIONS.flatMap((e) =>
    e.dinnerPrompts
      .filter((d) => d.targetTiers.includes(bucket) && guest.savedDinnerIds.has(d.id))
      .map((d) => hydrateDinner(d, guest))
  );

  return {
    articles,
    videos,
    dinnerPrompts,
    totalCount: articles.length + videos.length + dinnerPrompts.length,
  };
}
