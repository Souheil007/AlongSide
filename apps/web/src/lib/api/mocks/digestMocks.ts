import {
  DevelopmentalTier,
  DigestIssueStatus,
  isSlangEligibleTier,
  matchesVideoDurationBucket,
  resolveDigestTierBucket,
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
import type { GuestInteractionSnapshot } from '../digest';

const T0 = DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;
const T1 = DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
const T2 = DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
const T3 = DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
const T4 = DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
const T5 = DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;

const ISSUE_42_ID = 'digest-issue-42';
const ISSUE_41_ID = 'digest-issue-41';

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

function makeArticle(
  issueNumber: number,
  id: string,
  targetTiers: DevelopmentalTier[],
  isLead: boolean,
  sortOrder: number,
  sourceName: string,
  sourceDomain: string,
  sourceUrl: string,
  publishedAt: string,
  topicLabel: string,
  readMinutes: number,
  title: string,
  summary: string,
  keyShift: string,
  perspectiveNote: string | null = null
): DigestArticleDTO {
  return {
    id,
    digestId: issueNumber === 42 ? ISSUE_42_ID : ISSUE_41_ID,
    issueNumber,
    title,
    summary,
    keyShift,
    perspectiveNote,
    topicLabel,
    readMinutes,
    sourceName,
    sourceDomain,
    sourceUrl,
    authorName: null,
    imageUrl: null,
    publishedAt,
    isOriginalEditorial: false,
    contentMarkdown: null,
    sourcesText: `${sourceName} (${sourceDomain})`,
    targetTiers,
    isLead,
    sortOrder,
    isRead: false,
    isSaved: false,
  };
}

function makeVideo(
  issueNumber: number,
  id: string,
  targetTiers: DevelopmentalTier[],
  sortOrder: number,
  youtubeVideoId: string,
  title: string,
  presenter: string,
  channelName: string,
  publishedAt: string,
  durationMinutes: number,
  formatLabel: string,
  takeaway: string,
  jumpChips: VideoJumpChip[],
  skimBullets: string[]
): DigestVideoDTO {
  return {
    id,
    digestId: issueNumber === 42 ? ISSUE_42_ID : ISSUE_41_ID,
    issueNumber,
    youtubeVideoId,
    videoUrl: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
    title,
    presenter,
    channelName,
    publishedAt,
    durationMinutes,
    formatLabel,
    takeaway,
    jumpChips,
    skimBullets,
    targetTiers,
    isEmbeddable: true,
    sortOrder,
    isSaved: false,
  };
}

function makeDinner(
  issueNumber: number,
  id: string,
  targetTiers: DevelopmentalTier[],
  sortOrder: number,
  question: string,
  parentTip: string,
  followUp: string
): DigestDinnerPromptDTO {
  return {
    id,
    digestId: issueNumber === 42 ? ISSUE_42_ID : ISSUE_41_ID,
    issueNumber,
    question,
    parentTip,
    followUp,
    targetTiers,
    sortOrder,
    isSaved: false,
  };
}

function makePhrase(
  issueNumber: number,
  id: string,
  targetTiers: DevelopmentalTier[],
  sortOrder: number,
  word: string,
  shortMeaning: string,
  fullMeaning: string,
  cringeLevel: number,
  cringeLabel: string,
  calmScript: string
): DigestPhraseDTO {
  return {
    id,
    digestId: issueNumber === 42 ? ISSUE_42_ID : ISSUE_41_ID,
    issueNumber,
    word,
    shortMeaning,
    fullMeaning,
    cringeLevel,
    cringeLabel,
    calmScript,
    targetTiers,
    sortOrder,
  };
}

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
      makeArticle(
        42, 'art-42-t0-1', [T0], true, 1,
        'ZERO TO THREE', 'zerotothree.org',
        'https://www.zerotothree.org/resource/screen-sense-what-the-research-says-about-the-impact-of-media-on-children-aged-0-3-years-old/',
        '2026-11-13T14:00:00.000Z', 'Media & Tech', 4,
        'Why slow-paced narration beats rapid-cut toddler videos',
        'ZERO TO THREE breaks down how babies and toddlers process screen movement differently from live faces. Calm co-viewed video calls build language while fast-cut feeds overstimulate young attention.',
        'Prioritize live voice narration and keep background TV switched off during floor play.',
        'Occasional calm clips when a parent needs ten minutes do not undo warm daily routines.'
      ),
      makeArticle(
        42, 'art-42-t0-2', [T0], false, 2,
        'Harvard Center on the Developing Child', 'developingchild.harvard.edu',
        'https://developingchild.harvard.edu/science/key-concepts/serve-and-return/',
        '2026-11-11T16:30:00.000Z', 'Play & Learning', 3,
        'Five simple serve-and-return moments during everyday chores',
        'Harvard researchers outline five repeatable steps—notice the serve, return warmly, name the object, take turns, and practice endings—that wire early language and emotional safety.',
        'Narrate what your toddler points to instead of quizzing them with flashcards.'
      ),
      // T1 (4-6)
      makeArticle(
        42, 'art-42-t1-1', [T1], true, 1,
        'Common Sense Media', 'commonsensemedia.org',
        'https://www.commonsensemedia.org/articles/screen-time-for-preschoolers',
        '2026-11-13T15:00:00.000Z', 'Media & Tech', 4,
        'Choosing calmer preschool shows when autoplay pulls them in',
        'Common Sense Media reviews how streaming autoplay loops prolong preschool screen requests. Turning off autoplay and pairing one episode with a visible timer ends most post-show tears.',
        'Let an external kitchen timer end screen time so the clock—not your voice—holds the boundary.',
        'Preschoolers grieve transitions because their braking cortex is still under construction.'
      ),
      makeArticle(
        42, 'art-42-t1-2', [T1], false, 2,
        'Child Mind Institute', 'childmind.org',
        'https://childmind.org/article/how-to-handle-tantrums-and-meltdowns/',
        '2026-11-11T13:00:00.000Z', 'Emotional Regulation', 4,
        'Handling preschool after-pickup meltdowns without lectures',
        'Child Mind Institute clinicians explain why four- to six-year-olds hold it together all day at preschool and release pent-up tension the minute they see their safe parent.',
        'Offer a quiet snack and ten minutes of low-demand play before asking school questions.'
      ),
      // T2 (7-9)
      makeArticle(
        42, 'art-42-t2-1', [T2], true, 1,
        'Common Sense Media', 'commonsensemedia.org',
        'https://www.commonsensemedia.org/articles/parents-ultimate-guide-to-roblox',
        '2026-11-14T10:00:00.000Z', 'Media & Tech', 5,
        'Understanding Roblox chat filters and cooperative play at ages 7–9',
        'Common Sense Media walks parents through Roblox experience maturity labels, private server defaults, and how to turn solo grinding into shared living-room play.',
        'Switch chat permissions to known real-life friends and sit beside them for one round each week.'
      ),
      makeArticle(
        42, 'art-42-t2-2', [T2], false, 2,
        'HealthyChildren.org (AAP)', 'healthychildren.org',
        'https://www.healthychildren.org/English/family-life/Media/Pages/Where-We-Stand-TV-Viewing-Time.aspx',
        '2026-11-12T12:00:00.000Z', 'Family Communication', 3,
        'Building a predictable elementary family media plan',
        'The AAP outlines how clear, written household routines for homework, outdoor play, and screen-free bedrooms lower daily negotiations for elementary kids.',
        'Decide daily screen windows on Sunday evening so weekday afternoons stay friction-free.'
      ),
      // T3 (10-12)
      makeArticle(
        42, 'art-42-t3-1', [T3], true, 1,
        'Child Mind Institute', 'childmind.org',
        'https://childmind.org/article/when-should-you-get-your-kid-a-phone/',
        '2026-11-14T13:30:00.000Z', 'Media & Tech', 5,
        'How to read readiness cues before the first smartphone conversation',
        'Child Mind Institute outlines maturity signals—sleep protection, impulse recovery, and honesty around mistakes—that matter more than whether classmates already carry phones.',
        'Treat device autonomy as a graduated driving permit rather than an all-or-nothing birthday switch.'
      ),
      makeArticle(
        42, 'art-42-t3-2', [T3], false, 2,
        'Common Sense Media', 'commonsensemedia.org',
        'https://www.commonsensemedia.org/articles/how-to-help-tweens-navigate-group-chats',
        '2026-11-12T17:00:00.000Z', 'Social & Peers', 4,
        'Helping tweens step out of high-drama group chats without losing face',
        'Common Sense Media explores why fifth- and sixth-grade group chats escalate quickly after bedtime and gives tweens practical scripts to mute threads calmly.',
        'Offer yourself as a blame shield: "Tell your chat my parents dock my device at 8:30."'
      ),
      // T4 (13-15) — 3 articles (lead + 2 companions)
      makeArticle(
        42, 'art-42-t4-1', [T4], true, 1,
        'HealthyChildren.org (AAP)', 'healthychildren.org',
        'https://www.healthychildren.org/English/family-life/Media/Pages/social-media-and-your-childs-mental-health-what-research-says.aspx',
        '2026-11-14T16:00:00.000Z', 'Media & Tech', 5,
        'What pediatric research actually says about teen social feeds and sleep',
        'HealthyChildren.org synthesizes current adolescent media research, emphasizing that late-night scroll displacement of REM sleep drives mood dips far more than daytime messaging.',
        'Focus household pacts on device-free bedrooms overnight before micromanaging every daytime minute.',
        'Co-signed boundaries with clear reasoning earn significantly higher teen buy-in than surprise blocks.'
      ),
      makeArticle(
        42, 'art-42-t4-2', [T4], false, 2,
        'Child Mind Institute', 'childmind.org',
        'https://childmind.org/article/tips-communicating-with-teen/',
        '2026-11-11T18:00:00.000Z', 'Family Communication', 4,
        'Validating first so your ninth grader keeps coming home with hard stories',
        'Adolescent psychologists show how jumping straight to advice triggers immediate teen shutdown, while pausing to reflect the emotion keeps the prefrontal bridge open.',
        'Ask "Do you want me to just listen, brainstorm, or help step in?" before offering solutions.'
      ),
      makeArticle(
        42, 'art-42-t4-3', [T4], false, 3,
        'Common Sense Media', 'commonsensemedia.org',
        'https://www.commonsensemedia.org/articles/ai-chatbots-what-parents-need-to-know',
        '2026-11-09T15:30:00.000Z', 'School & Focus', 4,
        'Talking calmly about AI companion bots and homework shortcuts',
        'Common Sense Media breaks down how teens use generative AI for study outlines versus emotional venting, and how to set transparent family norms around real human friendship.',
        'Test an AI study prompt together and discuss where automated answers flatten their own voice.'
      ),
      // T5 (16-18)
      makeArticle(
        42, 'art-42-t5-1', [T5], true, 1,
        'Child Mind Institute', 'childmind.org',
        'https://childmind.org/article/preparing-teens-for-independence/',
        '2026-11-14T11:30:00.000Z', 'Family Communication', 5,
        'Shifting from household manager to trusted consultant before graduation',
        'Child Mind Institute outlines how letting older teens manage their own calendar misses, health appointments, and study blocks builds durable adult competence while a safety net still exists.',
        'Step back from daily reminders and invite weekly check-ins where your teen sets the agenda.'
      ),
      makeArticle(
        42, 'art-42-t5-2', [T5], false, 2,
        'Greater Good Magazine', 'greatergood.berkeley.edu',
        'https://greatergood.berkeley.edu/article/item/how_to_help_teens_manage_stress_and_burnout',
        '2026-11-12T10:15:00.000Z', 'Sleep & Routines', 4,
        'Spotting quiet academic burnout in high-achieving juniors and seniors',
        'Greater Good Magazine highlights the difference between healthy stretch goals and chronic perfectionism, urging families to protect one phone-free recovery window every weekend.',
        'Greet your teen warmly about who they are before asking a single question about grades.'
      ),
    ],
    videos: [
      makeVideo(
        42, 'vid-42-t0-1', [T0], 1, 'm_5u8-QSh6A',
        'Serve & Return Interaction Shapes Brain Circuitry',
        'Center on the Developing Child', 'Harvard University',
        '2026-11-14T09:00:00.000Z', 2, '2-Min Quick Watch',
        'See how every returned point, smile, and babble physically builds early brain architecture.',
        [
          { seconds: 15, label: '0:15 · What a baby serve looks like' },
          { seconds: 55, label: '0:55 · How warm returns wire circuits' },
        ],
        [
          'Toddlers serve with gazes, points, and babbles.',
          'Naming what they point to bridges gesture straight into first words.',
        ]
      ),
      makeVideo(
        42, 'vid-42-t0-2', [T0], 2, 'BoT7qH_uVNo',
        'Media and Children',
        'Dr. Dimitri Christakis, MD, MPH, FAAP', 'TEDx Talks',
        '2026-11-10T15:00:00.000Z', 16, 'Media Science',
        'Why protecting the 0–2 screen-free window—and avoiding rapid-cut cartoons—protects lifelong focus.',
        [
          { seconds: 120, label: '2:00 · Fast cuts & toddler focus' },
          { seconds: 450, label: '7:30 · Real-world pacing' },
        ],
        [
          'High-speed scene cuts overstimulate infant attention networks.',
          'Ordinary kitchen play and face-to-face songs beat baby screen apps.',
        ]
      ),
      makeVideo(
        42, 'vid-42-t1-1', [T1], 1, '_X0mgOOSpLU',
        'The Power of Believing That You Can Improve',
        'Dr. Carol Dweck, PhD', 'TED',
        '2026-11-14T11:00:00.000Z', 10, 'Growth Mindset',
        'How praising effort and using "not yet" builds resilient preschool problem-solvers.',
        [
          { seconds: 60, label: '1:00 · The power of "not yet"' },
          { seconds: 270, label: '4:30 · Process praise & resilience' },
        ],
        [
          'Effort-based praise helps preschoolers stick with tricky builds.',
          'Adding "yet" reframes frustration into active brain growth.',
        ]
      ),
      makeVideo(
        42, 'vid-42-t1-2', [T1], 2, 'DH9L7vJ03DE',
        'How Screens Stole Childhood — and How to Get It Back',
        'Jonathan Haidt, PhD', 'TED',
        '2026-11-12T16:00:00.000Z', 18, 'Screen Norms',
        'Clear, calm play-based family norms you can start right in the preschool years.',
        [
          { seconds: 120, label: '2:00 · Play-based vs. screen-based childhood' },
          { seconds: 480, label: '8:00 · Why real-world play builds bravery' },
        ],
        [
          'Rich self-directed play strengthens early emotional regulation.',
          'External timers and clear zones beat willpower negotiations.',
        ]
      ),
      makeVideo(
        42, 'vid-42-t2-1', [T2, T3], 1, 'H14bBuluwB8',
        'Grit: The Power of Passion and Perseverance',
        'Dr. Angela Lee Duckworth, PhD', 'TED',
        '2026-11-14T10:30:00.000Z', 6, '6-Min Spark',
        'Sustained curiosity and frustration tolerance beat raw talent at ages 7–12.',
        [
          { seconds: 45, label: '0:45 · Why grit beats raw talent' },
          { seconds: 175, label: '2:55 · Growth mindset + perseverance' },
        ],
        [
          'Long-term curiosity beats IQ in predicting fulfillment.',
          'Normalizing struggle keeps kids leaning into tricky projects.',
        ]
      ),
      makeVideo(
        42, 'vid-42-t2-2', [T2], 2, 'eRQdAOrqvGg',
        'The Challenges of Raising a Digital Native',
        'Dr. Devorah Heitner, PhD', 'TEDx Talks',
        '2026-11-12T13:30:00.000Z', 13, 'Digital Mentoring',
        'Why side-by-side mentoring builds far better judgment in elementary gamers than stealth spying.',
        [
          { seconds: 110, label: '1:50 · Mentoring vs. surveillance' },
          { seconds: 390, label: '6:30 · Sitting side-by-side in their games' },
        ],
        [
          'Open curiosity invites kids to bring tricky game moments straight to you.',
          'Ten minutes of co-play teaches more than an hour of lecturing.',
        ]
      ),
      makeVideo(
        42, 'vid-42-t3-2', [T3], 2, '6zVS8HIPUng',
        'The Mysterious Workings of the Adolescent Brain',
        'Dr. Sarah-Jayne Blakemore, PhD', 'TED',
        '2026-11-13T14:00:00.000Z', 14, 'Brain Science',
        'Why sudden tween eye-rolling and peer sensitivity signal social-brain remodeling—not disrespect.',
        [
          { seconds: 110, label: '1:50 · The remodeling social brain' },
          { seconds: 390, label: '6:30 · Peer evaluation spikes at 10+' },
        ],
        [
          'The medial prefrontal cortex undergoes major rewiring starting around age 10.',
          'Staying neutral during eye-rolls preserves your steady leadership.',
        ]
      ),
      // T4 — 3 videos across short (<12), medium (12-25), deep (>25)
      makeVideo(
        42, 'vid-42-t4-1', [T4], 1, 'A71Kms6Mvhc',
        'Using Brain Science to Explain Adolescent Risk-Taking',
        'Dr. Laurence Steinberg, PhD', 'Laurence Steinberg',
        '2026-11-14T15:00:00.000Z', 11, '11-Min Essential',
        'How peer presence shifts teen reward processing—and why warmth paired with clear structure protects adolescents best.',
        [
          { seconds: 90, label: '1:30 · Reward accelerator vs. frontal brakes' },
          { seconds: 290, label: '4:50 · The peer-multiplier study' },
          { seconds: 510, label: '8:30 · Warm structure that protects teens' },
        ],
        [
          'Having peers nearby amplifies reward sensitivity and lowers risk perception.',
          'Warmth plus firm structure outperforms harsh policing across studies.',
          'Co-created house agreements protect teens without eroding trust.',
        ]
      ),
      makeVideo(
        42, 'vid-42-t4-2', [T4], 2, '5MuIMqhT8DM',
        'Sleep Is Your Superpower',
        'Dr. Matthew Walker, PhD', 'TED',
        '2026-11-11T19:00:00.000Z', 19, 'Sleep Science',
        'Why REM sleep acts like overnight emotional first aid—and why charging phones outside bedrooms transforms teen mood.',
        [
          { seconds: 120, label: '2:00 · How sleep locks in memory' },
          { seconds: 540, label: '9:00 · Hidden cost of sleep debt' },
        ],
        [
          'REM sleep cools next-day amygdala reactivity for stressed teens.',
          'Docking phones outside bedrooms is the fastest sleep win.',
        ]
      ),
      makeVideo(
        42, 'vid-42-t4-3', [T4, T5], 3, 'f9sQNGvveXs',
        'The Teenage Brain (3 Key Highlights)',
        'Dr. Frances E. Jensen, MD, FACP', 'Politics and Prose',
        '2026-11-09T13:00:00.000Z', 67, 'Deep Dive Talk',
        'Why the teen brain wires back-to-front—and how acting as their calm frontal-lobe coach keeps communication open.',
        [
          { seconds: 300, label: '5:00 · Why the teen brain is 80% wired' },
          { seconds: 1380, label: '23:00 · Sleep, stress & reactivity' },
        ],
        [
          'Frontal braking pathways continue insulating into the mid-twenties.',
          'Validating first keeps teens bringing hard moments home.',
        ]
      ),
      makeVideo(
        42, 'vid-42-t5-1', [T5], 1, 'CyElHdaqkjo',
        'How to Raise Successful Kids — Without Over-Parenting',
        'Julie Lythcott-Haims, JD', 'TED',
        '2026-11-12T11:00:00.000Z', 14, 'Autonomy Talk',
        'Stepping smoothly from daily household manager into a trusted adult consultant.',
        [
          { seconds: 120, label: '2:00 · The check-listed childhood trap' },
          { seconds: 420, label: '7:00 · Why real responsibilities build agency' },
        ],
        [
          'Real household responsibility predicts young-adult thriving.',
          'Greet your teen with love first—not a quiz about deadlines.',
        ]
      ),
    ],
    dinnerPrompts: [
      makeDinner(
        42, 'dp-42-t0-1', [T0], 1,
        'What was the silliest animal sound or face that made your toddler giggle the hardest today?',
        'Model one playful animal sound at the table and pause three full seconds for mirroring.',
        'Can you show me the quietest little mouse squeak next?'
      ),
      makeDinner(
        42, 'dp-42-t1-1', [T1], 1,
        'If your favorite stuffed animal came to school with you today, what part would surprise it most?',
        'Speaking through a playful character lowers pressure compared to "How was school?"',
        'Where would it want to sit during story time?'
      ),
      makeDinner(
        42, 'dp-42-t2-1', [T2], 1,
        'If you could invent one brand-new recess game tomorrow, what would the fairest rule be?',
        'Invites elementary kids to reflect on fairness and social dynamics without feeling interrogated.',
        'How would a new kid learn the rules in thirty seconds?'
      ),
      makeDinner(
        42, 'dp-42-t3-1', [T3], 1,
        'What is one unwritten rule in your grade right now that adults totally misunderstand?',
        'Positions your tween as the cultural guide—listen with warmth and zero eye-rolling.',
        'Which part of that rule feels fair, and which part feels exhausting?'
      ),
      makeDinner(
        42, 'dp-42-t4-1', [T4], 1,
        'What is one expectation adults put on teens today that feels completely out of date?',
        'Stay genuinely curious and resist defending your generation—listen for what feels heavy.',
        'What would a more realistic version of that expectation look like in our house?'
      ),
      makeDinner(
        42, 'dp-42-t4-2', [T4], 2,
        'When does being reachable on your phone feel helpful, and when does it secretly feel like a chore?',
        'Most teens feel relief admitting instant-reply fatigue when there is zero lecture attached.',
        'Would having an automatic evening pause make switching off easier with friends?'
      ),
      makeDinner(
        42, 'dp-42-t5-1', [T5], 1,
        'Looking back a year, what is one habit or perspective you are glad you outgrew?',
        'Treats your older teen as a reflective near-adult and models sharing one of your own too.',
        'What advice would you give your 14-year-old self about handling stress?'
      ),
    ],
    // Strictly Ages 7-18 ONLY (ZERO phrases for T0 or T1)
    phrases: [
      makePhrase(42, 'ph-42-t2-1', [T2], 1, 'Griefing', 'Wrecking a shared build',
        'Deliberately sabotaging another player’s house or progress inside Minecraft or Roblox.',
        1, 'Normal gaming word', '"That feels unfair when you worked hard on it. Want help backing up the world?"'),
      makePhrase(42, 'ph-42-t2-2', [T2], 2, 'Clutched', 'Last-second save or win',
        'Pulling off an unexpected victory or team rescue right when losing looked guaranteed.',
        2, 'Fun way to cheer a win', '"Staying steady when the game got intense took real focus."'),
      makePhrase(42, 'ph-42-t2-3', [T2], 3, 'No Backsies', 'Recess trades are final',
        'Unwritten schoolyard rule that once you agree to a card or toy swap, it cannot be undone.',
        1, 'Classic playground phrase', '"Even with \'no backsies,\' good friends check in when someone felt rushed."'),
      makePhrase(42, 'ph-42-t3-1', [T3], 1, 'Crashout', 'Over-the-top meltdown',
        'Losing all cool over a tiny annoyance or game defeat—usually said playfully about dramatic reactions.',
        3, 'Understand, skip saying aloud', '"Sounds like that match got intensely frustrating—want ten minutes to reset?"'),
      makePhrase(42, 'ph-42-t3-2', [T3], 2, 'Cooked', 'Exhausted or doomed',
        'Dramatic shorthand for feeling completely behind or worn out before a quiz or deadline.',
        2, 'Okay with a light smile', '"You sound stretched thin on that project—want to break step one into ten minutes?"'),
      makePhrase(42, 'ph-42-t3-3', [T3], 3, 'Aura', 'Unspoken social cool factor',
        'Playful imaginary scoreboard of dignity—doing something smooth gains aura, tripping loses aura.',
        3, 'Understand, skip saying aloud', '"Funny how fast everyone forgets awkward moments even when they feel huge."'),
      makePhrase(42, 'ph-42-t4-1', [T4], 1, 'Glazing', 'Over-the-top flattery',
        'Teasing someone for praising a celebrity, athlete, or friend way too enthusiastically.',
        3, 'Best left to teens', '"Sounds like they are really enthusiastic about that—what did you think of it?"'),
      makePhrase(42, 'ph-42-t4-2', [T4], 2, 'Locked In', 'Deeply focused and determined',
        'Entering a zone of serious concentration for a big game, exam review, or creative build.',
        1, 'Natural for parents too', '"I can tell you are really locked in on that assignment—I will leave a snack by the door."'),
      makePhrase(42, 'ph-42-t4-3', [T4], 3, 'Left on Read', 'Seen message, no reply',
        'When a read receipt shows a peer opened a message without answering—often stirring teen anxiety.',
        1, 'Everyday digital phrase', '"Silent read receipts feel stingy, even when people are just busy."'),
      makePhrase(42, 'ph-42-t5-1', [T5], 1, 'Soft Launch', 'Subtle reveal on social media',
        'Hinting at a new relationship, job, or college plan with a low-key post instead of a big announcement.',
        2, 'Fine in casual conversation', '"It makes sense wanting to keep new things low-pressure while you figure them out."'),
      makePhrase(42, 'ph-42-t5-2', [T5], 2, 'Delulu', 'Playfully unrealistic optimism',
        'Self-deprecating joke about clinging to a wildly optimistic hope, from concert tickets to dream offers.',
        3, 'Understand, skip saying aloud', '"Having big hopes is healthy—let us also map a solid backup plan you like."'),
      makePhrase(42, 'ph-42-t5-3', [T5], 3, 'Bed Rotting', 'Extended low-energy lounging',
        'Spending hours scrolling or resting under the covers to decompress after a draining week.',
        2, 'Helpful vocabulary to know', '"Long weeks drain everyone—want a quiet walk or coffee later?"'),
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
      makeArticle(
        41, 'art-41-t0-1', [T0, T1], true, 1,
        'ZERO TO THREE', 'zerotothree.org',
        'https://www.zerotothree.org/resource/toddlers-and-challenging-behavior-why-they-do-it-and-how-to-respond/',
        '2026-11-06T14:00:00.000Z', 'Emotional Regulation', 4,
        'Why big early-childhood outbursts are communication, not defiance',
        'ZERO TO THREE explains how immature language circuits leave young children leaning on physical impulses when overwhelmed, and how calm co-regulation teaches safer words.',
        'Drop your voice low, keep bodies safe, and hand them the exact two-word phrase they needed.'
      ),
      makeArticle(
        41, 'art-41-t0-2', [T0, T1], false, 2,
        'HealthyChildren.org (AAP)', 'healthychildren.org',
        'https://www.healthychildren.org/English/ages-stages/preschool/Pages/Power-of-Play.aspx',
        '2026-11-04T16:15:00.000Z', 'Play & Learning', 3,
        'Why pediatricians prescribe unstructured outdoor play',
        'AAP pediatricians outline how climbing, balancing, and loose-parts play calibrate sensory systems and deepen nighttime sleep.',
        'Aim for thirty minutes of outdoor free movement before afternoon indoor transitions.'
      ),
      makeArticle(
        41, 'art-41-t2-1', [T2, T3], true, 1,
        'Common Sense Media', 'commonsensemedia.org',
        'https://www.commonsensemedia.org/articles/youtube-shorts-and-tweens',
        '2026-11-06T15:30:00.000Z', 'Media & Tech', 4,
        'Why endless short-form loops leave kids snappy when screens turn off',
        'Common Sense Media unpacks how rapid 30-second video swipes spike dopamine anticipation and make ordinary afternoon transitions feel abruptly irritating.',
        'Favor full-length creator videos watched on a shared TV over solo vertical swipe feeds.'
      ),
      makeArticle(
        41, 'art-41-t2-2', [T2, T3], false, 2,
        'Child Mind Institute', 'childmind.org',
        'https://childmind.org/article/helping-tweens-build-friendship-skills/',
        '2026-11-04T14:20:00.000Z', 'Social & Peers', 4,
        'Navigating shifting elementary and middle-school friendships calmly',
        'Child Mind Institute notes that friendship reshuffling is developmentally normal, even when it feels intense in the moment.',
        'Avoid bad-mouthing former friends—stay steady while helping your child diversify activities.'
      ),
      // T4 & T5 — 3 articles so week-switching tests verify distinct 3-item counts across #42 and #41
      makeArticle(
        41, 'art-41-t4-1', [T4, T5], true, 1,
        'Greater Good Magazine', 'greatergood.berkeley.edu',
        'https://greatergood.berkeley.edu/article/item/why_teens_need_parents_more_than_they_show',
        '2026-11-06T16:45:00.000Z', 'Family Communication', 5,
        'Why teens push away on the surface while watching your reaction closely',
        'Greater Good Magazine summarizes adolescent attachment studies revealing that steady parental warmth remains the strongest protective factor against peer pressure.',
        'Stay available for late-night kitchen chats even if they gave one-word answers at 4 PM.'
      ),
      makeArticle(
        41, 'art-41-t4-2', [T4, T5], false, 2,
        'HealthyChildren.org (AAP)', 'healthychildren.org',
        'https://www.healthychildren.org/English/ages-stages/teen/fitness/Pages/Energy-Drinks-and-Teens.aspx',
        '2026-11-04T10:30:00.000Z', 'Sleep & Routines', 3,
        'High-caffeine energy cans and afternoon anxiety spikes in teens',
        'AAP pediatricians explain how trendy 200mg canned energy drinks marketed via streamers linger past midnight and compound adolescent circadian delay.',
        'Compare caffeine labels side by side calmly and stock chilled sparkling alternatives at home.'
      ),
      makeArticle(
        41, 'art-41-t4-3', [T4, T5], false, 3,
        'Child Mind Institute', 'childmind.org',
        'https://childmind.org/article/how-to-help-teens-manage-social-comparison/',
        '2026-11-03T15:10:00.000Z', 'Social & Peers', 4,
        'Interrupting algorithm-driven body and status comparison calmly',
        'Clinicians share practical media-literacy questions that help teens notice how filtered feeds monetize insecurity without shaming their interests.',
        'Audit feed recommendations together by asking "How does this account make you feel five minutes later?"'
      ),
    ],
    videos: [
      makeVideo(
        41, 'vid-41-t0-1', [T0, T1], 1, 'f-m2YcdMdFw',
        "Dr. Dan Siegel's Hand Model of the Brain",
        'Dr. Daniel J. Siegel, MD', 'Dr. Dan Siegel',
        '2026-11-06T11:00:00.000Z', 8, 'Brain Model',
        'See what "flipping the lid" looks like during big early-childhood emotions and why connection comes first.',
        [
          { seconds: 60, label: '1:00 · Upstairs vs. downstairs brain' },
          { seconds: 210, label: '3:30 · Watch the lid flip' },
        ],
        [
          'Reasoning disconnects until the nervous system feels safe.',
          'Kneeling low with calm warmth helps the upstairs bridge reconnect.',
        ]
      ),
      makeVideo(
        41, 'vid-41-t1-2', [T0, T1, T2], 2, 'efCq_vHUMqs',
        'InBrief: Executive Function: Skills for Life and Learning',
        'Center on the Developing Child', 'Harvard University',
        '2026-11-05T13:00:00.000Z', 6, '6-Min Science',
        'How open-ended play and warm scaffolding wire working memory, flexibility, and self-control.',
        [
          { seconds: 45, label: '0:45 · Air-traffic control of the brain' },
          { seconds: 155, label: '2:35 · How open-ended play builds focus' },
        ],
        [
          'Executive function works like the brain’s air-traffic control system.',
          'Warm scaffolding gives kids just enough support to solve play puzzles.',
        ]
      ),
      makeVideo(
        41, 'vid-41-t2-1', [T2, T3], 1, 'jvzQQDfAL-Q',
        'Kids Do Well If They Can',
        'Dr. Ross Greene, PhD', 'DrRossGreene',
        '2026-11-06T14:00:00.000Z', 5, '5-Min Shift',
        'Why challenging moments signal a lagging skill waiting for collaborative scaffolding rather than defiance.',
        [
          { seconds: 35, label: '0:35 · Kids do well if they can' },
          { seconds: 130, label: '2:10 · Lagging skills vs. defiance' },
        ],
        [
          'Replacing attitude labels with curiosity lowers friction immediately.',
          'Solving triggers upstream prevents repeated daily standoffs.',
        ]
      ),
      makeVideo(
        41, 'vid-41-t4-1', [T3, T4, T5], 1, 'PHpPtdk9rco',
        'The Single Most Important Parenting Strategy',
        'Dr. Becky Kennedy, PhD', 'TED',
        '2026-11-07T09:00:00.000Z', 14, 'Repair Strategy',
        'How two-step repair after tense moments rewrites hard memories and deepens teen trust.',
        [
          { seconds: 185, label: '3:05 · Why perfection is not the goal' },
          { seconds: 430, label: '7:10 · The two-step repair phrase' },
        ],
        [
          'Secure attachment grows from returning warmly after friction.',
          'Name what happened without blame and re-anchor unconditional connection.',
        ]
      ),
      makeVideo(
        41, 'vid-41-t4-2', [T4, T5], 2, 'ObHY7l62otM',
        'The Emotional Lives of Teens: A Conversation with Dr. Lisa Damour',
        'Dr. Lisa Damour, PhD', 'Nemours',
        '2026-11-05T18:00:00.000Z', 32, 'Expert Q&A',
        'Acting as your teen’s steady emotional shock absorber through normal adolescent ups and downs.',
        [
          { seconds: 240, label: '4:00 · Healthy adolescent emotions' },
          { seconds: 900, label: '15:00 · Becoming an emotional shock absorber' },
        ],
        [
          'Mental health means riding normal big waves with coping tools—not constant cheerfulness.',
          'Side-by-side walks invite honest disclosure effortlessly.',
        ]
      ),
    ],
    dinnerPrompts: [
      makeDinner(
        41, 'dp-41-t0-1', [T0, T1], 1,
        'What felt super cozy or funny in your body today—stretching tall like a giraffe or stomping like a bear?',
        'Invites playful somatic awareness for toddlers and preschoolers.',
        'Can we both do our slowest sleepy bear stretch together?'
      ),
      makeDinner(
        41, 'dp-41-t2-1', [T2, T3], 1,
        'What is something a game or video tries to get players hooked on that you noticed this week?',
        'Builds media literacy as a proud skill rather than a lecture.',
        'What trick do game makers use that almost never fools you?'
      ),
      makeDinner(
        41, 'dp-41-t4-1', [T4, T5], 1,
        'When a friend vents about something tough, what makes someone genuinely good to talk to?',
        'Quietly reveals the listening style your teen appreciates most from you.',
        'Do people usually want quick advice or just to feel understood first?'
      ),
    ],
    phrases: [
      makePhrase(41, 'ph-41-t2-1', [T2, T3], 1, 'Pay-to-Win', 'Spending money for game power',
        'Describes games where buying upgrades beats skill or practice.',
        1, 'Great media-literacy word', '"Good catch noticing that game pushes upgrades instead of fair skill."'),
      makePhrase(41, 'ph-41-t2-2', [T2, T3], 2, 'Mid', 'Just okay, underwhelming',
        'Casual shorthand for something that did not live up to the hype.',
        2, 'Playful if used lightly', '"Sounds like that sequel felt pretty ordinary compared to the first one."'),
      makePhrase(41, 'ph-41-t2-3', [T2, T3], 3, 'Tryhard', 'Taking a casual game too seriously',
        'Teasing someone for sweating intensely over a low-stakes game or activity.',
        2, 'Understand first', '"It is frustrating when everyone plays at totally different intensity levels."'),
      makePhrase(41, 'ph-41-t4-1', [T4, T5], 1, 'Touch Grass', 'Step offline and reset',
        'Playful nudge to step away from intense online arguments and reconnect with the real world.',
        2, 'Lighthearted reminder', '"Honestly, both of us probably need ten minutes outside after a long screen day."'),
      makePhrase(41, 'ph-41-t4-2', [T4, T5], 2, 'Main Character', 'Acting like the center of a movie',
        'Playfully framing everyday moments as cinematic—or teasing someone for dramatic flair.',
        2, 'Fun in casual conversation', '"Love that you had a good moment today—tell me the highlight."'),
      makePhrase(41, 'ph-41-t4-3', [T4, T5], 3, 'Doomscrolling', 'Compulsive late-night scrolling',
        'Continuing to swipe through heavy posts long after it stops feeling restful.',
        1, 'Common across ages', '"Leaving phones across the room at night helps both of us avoid doomscrolling."'),
    ],
  },
];

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

  return {
    issue: toIssueSummary(record, bucket),
    resolvedTier: bucket,
    videos,
    articles,
    dinnerPrompts,
    phrases,
    readArticleCount: articles.filter((a) => a.isRead).length,
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
