import type { PrismaClient } from '@prisma/client';
import { AcademyCategory, ChapterPriority, DevelopmentalTier } from '@alongside/shared';

export interface AcademyLessonSeedData {
  slug: string;
  title: string;
  contentMarkdown: string;
  readingMinutes: number;
  sortOrder: number;
}

export interface AcademyChapterSeedData {
  slug: string;
  title: string;
  summary: string;
  priority: number; // 1 = Critical, 2 = Routines, 3 = Scaffolding
  sortOrder: number;
  lessons: AcademyLessonSeedData[];
}

export interface AcademyModuleSeedData {
  slug: string;
  category: AcademyCategory;
  title: string;
  summary: string;
  coverImageUrl?: string | null;
  developmentalTier: DevelopmentalTier;
  sortOrder: number;
  chapters: AcademyChapterSeedData[];
  lessons: AcademyLessonSeedData[];
}

function buildModule(
  slug: string,
  category: AcademyCategory,
  title: string,
  summary: string,
  developmentalTier: DevelopmentalTier,
  sortOrder: number,
  coverImageUrl: string | null,
  chaptersData: {
    slug: string;
    title: string;
    summary: string;
    priority: number;
    sortOrder: number;
    lessons: {
      slug: string;
      title: string;
      readingMinutes: number;
      sortOrder: number;
      clinicalInsight: string;
      whatToSay: string;
      body: string;
    }[];
  }[]
): AcademyModuleSeedData {
  const chapters: AcademyChapterSeedData[] = chaptersData.map((c) => ({
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    priority: c.priority,
    sortOrder: c.sortOrder,
    lessons: c.lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      readingMinutes: l.readingMinutes,
      sortOrder: l.sortOrder,
      contentMarkdown: `### ${l.title}

${l.body}

> **Clinical Insight:** ${l.clinicalInsight}

#### Recommended Action Protocol:
1. **Notice the Physical Baseline:** Observe autonomic nervous system indicators (breathing rate, posture, muscle tone).
2. **De-escalate Before Reasoning:** Do not offer logical debate or explanations while emotional arousal is elevated.
3. **Establish Clear, Calm Boundaries:** Pair unwavering physical boundaries with unconditional emotional warmth.

**What to Say:** "${l.whatToSay}"`,
    })),
  }));

  const flatLessons: AcademyLessonSeedData[] = chapters.flatMap((c) => c.lessons);

  return {
    slug,
    category,
    title,
    summary,
    coverImageUrl,
    developmentalTier,
    sortOrder,
    chapters,
    lessons: flatLessons,
  };
}

export const ACADEMY_SEED_MODULES: AcademyModuleSeedData[] = [
  // =========================================================================
  // CATEGORY 1: BEHAVIOR_AND_EMOTIONS (Behavior & Emotional Co-Regulation)
  // =========================================================================
  buildModule(
    'behavior-infant-coregulation',
    AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    'Sensory Overload & Infant Co-Regulation',
    'Master how the 0-3 infant and toddler brain builds secure attachment, why pre-verbal emotional meltdowns occur, and how to anchor calm.',
    DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    1,
    'https://assets.alongside.care/academy/behavior-infant.png',
    [
      {
        slug: 'immature-amygdala-toddler-meltdowns',
        title: 'The Immature Amygdala: Why Toddlers Melt Down & How to Anchor Calm',
        summary: 'Understanding the pre-verbal emotional storm without prefrontal brakes.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'sensory-overload-and-the-immature-amygdala',
            title: 'Sensory Overload & The Immature Amygdala: Why Toddlers Melt Down',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Before age 3, an emotional meltdown is a physiological state of autonomic dysregulation, not calculated manipulation. Co-regulation scaffolds the child’s developing neural pathways for lifelong resilience.',
            whatToSay: 'Your body feels big and stormy right now. I will hold you safely until the storm passes. You are completely safe with me.',
            body: 'When an 18-month-old or 2-year-old throws an explosive tantrum on the kitchen floor, parents often wonder if they are failing at discipline or if their toddler is being intentionally defiant. Developmental neurobiology reveals a physiological reality: the toddler amygdala operates without prefrontal brakes.',
          },
        ],
      },
      {
        slug: 'halt-diagnostic-emotional-cues',
        title: 'The HALT Diagnostic: Decoding Hungry, Angry, Lonely, Tired Cues',
        summary: 'Daily routine screening for early metabolic and sensory triggers.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'halt-diagnostic-toddler-cues',
            title: 'Decoding Toddler Meltdowns with the HALT Framework',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'A dysregulated toddler is nearly always suffering from blood glucose depletion, vestibular fatigue, or sleep pressure. Addressing the biological trigger resolves dysregulation faster than verbal correction.',
            whatToSay: 'Let us pause our toys for a moment and have a drink of cool water and some apple slices together.',
            body: 'Toddlers lack the interoceptive vocabulary to announce "my blood sugar dropped 20 minutes ago" or "the fluorescent lights are overwhelming my vestibular system." Instead, their nervous system sounds the alarm.',
          },
        ],
      },
      {
        slug: 'pre-verbal-attachment-rituals',
        title: 'Establishing Pre-Verbal Connection & Secure Attachment Rituals',
        summary: 'Long-term scaffolding for nervous system resilience and secure base dynamics.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'emotional-coregulation-rituals',
            title: 'The Calm Anchor: How Parents Wire Nervous System Resilience',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'A dysregulated adult cannot regulate a dysregulated child. Your nervous system is the room’s thermostat, not the thermometer. When you lower your voice and relax your shoulders, your child’s vagal nerve detects physical safety.',
            whatToSay: 'I am right here with you. Take a slow breath with me. Breathe in the flower, blow out the candle.',
            body: 'Through mirror neurons and autonomic auditory tone, infant and toddler nervous systems constantly scan their primary caregivers to determine if the environment is safe or dangerous.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'behavior-preschool-feelings',
    AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    'Preschool Big Feelings & Theory of Mind',
    'Understanding emotional egocentrism, bedtime friction, and early boundary setting without shame.',
    DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    2,
    'https://assets.alongside.care/academy/behavior-preschool.png',
    [
      {
        slug: 'theory-of-mind-cooperation',
        title: 'Theory of Mind: Why 4-Year-Olds Struggle to Share and Cooperate',
        summary: 'Cognitive egocentrism and the developmental timetable of empathy.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'theory-of-mind-and-preschool-empathy',
            title: 'Theory of Mind & Preschool Empathy',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Preschoolers do not withhold sharing out of malice; before age 5, their brains cannot reliably model that another person possesses thoughts distinct from their own.',
            whatToSay: 'Sam wants a turn with the fire truck when you are done. Let us set a gentle timer for two minutes, and then pass it over.',
            body: 'Between ages 4 and 6, children undergo a monumental cognitive transformation: developing Theory of Mind. Until this circuit matures, children genuinely believe that everyone feels what they feel.',
          },
        ],
      },
      {
        slug: 'ending-bedtime-battles',
        title: 'Ending Bedtime Battles: Sleep Pressure, Blue Light & Anchors',
        summary: 'Daily bedtime routine mastery and co-regulation transitional objects.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'bedtime-resistance-and-sleep-pressure',
            title: 'Bedtime Resistance & Calming Anchors',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Bedtime represents the longest separation of a child’s day. Resistance is usually separation anxiety masquerading as stubbornness. Connection before bedtime eliminates bedtime battles.',
            whatToSay: 'I know you wish we could keep playing, and it is time for rest. Let us snuggle with your teddy bear while we read two stories.',
            body: 'Preschool bedtime stalling—demands for extra water, one more story, or bathroom trips—is rarely about biological insomnia. It is about emotional attachment and fear of darkness or separation.',
          },
        ],
      },
      {
        slug: 'early-boundary-limits-without-shaming',
        title: 'Early Boundary Setting: Consistent Limits Without Shaming',
        summary: 'Scaffolding firm parental boundaries with unconditional emotional warmth.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'first-boundaries-without-shame',
            title: 'Setting Firm Limits Without Humiliation or Shame',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Shame triggers avoidance and fight-or-flight defensiveness. Clear physical boundaries paired with emotional validation teach internal moral accountability.',
            whatToSay: 'It is okay to feel angry, but I will not let you hit. Hitting hurts. You can stomp your feet on the rug or squeeze this pillow.',
            body: 'When limits are enforced with punitive anger, children learn to fear getting caught rather than understanding the human impact of their actions.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'behavior-elementary-impulses',
    AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    'Elementary Impulse Control & Sibling Dynamics',
    'Navigating dopamine transition resistance, stopping anger, and mediating sibling rivalry.',
    DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    3,
    'https://assets.alongside.care/academy/behavior-elementary.png',
    [
      {
        slug: 'dopamine-loops-stopping-resistance',
        title: 'Dopamine Loops & Stopping Resistance: De-escalating Post-Play Rage',
        summary: 'Managing the acute neurochemical crash when rewarding video games or play stop.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'dopamine-loops-and-curiosity',
            title: 'Managing the Dopamine Crash After High-Reward Activities',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Stopping a high-dopamine activity causes a sharp neurochemical deficit below baseline. The resulting rage is a withdrawal reaction. A 5-minute transitional bridge prevents emotional explosions.',
            whatToSay: 'Your brain had a lot of fun playing, and stepping away feels really hard right now. Let us sit side-by-side for 2 minutes while you tell me what you built.',
            body: 'When elementary school kids scream or slam doors upon turning off consoles or stepping away from soccer matches, parents interpret this as bad character. In reality, their dopamine has cratered below resting baseline.',
          },
        ],
      },
      {
        slug: 'sibling-rivalry-mediation',
        title: 'Sibling Rivalry: Moving From Judge/Jury to Mediation',
        summary: 'Daily dispute resolution frameworks that cultivate long-term sibling alliance.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'sibling-rivalry-mediation-framework',
            title: 'The Parent Mediator: Moving Away From Judge and Jury',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'When parents decide who started it and assign blame, sibling hostility intensifies. Stepping into a neutral mediator role forces children to practice perspective-taking.',
            whatToSay: 'I see two brothers who both want the same Lego set. I am putting the box on the counter until you two agree on a plan that works for both of you.',
            body: 'Sibling conflict is the premier training ground for conflict resolution, negotiation, and fairness. Treating it as a disciplinary emergency robs children of interpersonal practice.',
          },
        ],
      },
      {
        slug: 'frustration-tolerance-schoolwork',
        title: 'Building Frustration Tolerance & Growth Mindset in Schoolwork',
        summary: 'Scaffolding perseverance during academic challenges without tears.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'building-frustration-tolerance',
            title: 'Praising the Process: Growth Mindset Under Academic Strain',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Praising innate intelligence causes kids to avoid hard tasks out of fear of looking dumb. Praising effort, strategy, and resilience builds high frustration tolerance.',
            whatToSay: 'This math problem is really tough! That frustration you feel is your brain stretching and making new connections. Let us tackle it together step-by-step.',
            body: 'Ages 7 to 9 mark the emergence of self-evaluation compared to peers. If children view mistakes as evidence of failure rather than biological learning, homework becomes an emotional battlefield.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'behavior-tween-adrenarche',
    AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    'Tween Adrenarche & Emotional Volatility',
    'Decoding adrenarche, peer obsession, eye-rolls, and group chat social friction.',
    DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    4,
    'https://assets.alongside.care/academy/behavior-tween.png',
    [
      {
        slug: 'adrenarche-peer-status-moods',
        title: 'Adrenarche: The Biological Awakening to Peer Status & Mood Swings',
        summary: 'Understanding the adrenal hormonal shift that precedes visible puberty by two years.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'adrenarche-and-identity',
            title: 'Adrenarche: The Biological Awakening to Social Standing',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Around age 9-10, the adrenal glands awaken, flooding the tween brain with DHEA. Peer rejection triggers physical pain circuits in the dorsal anterior cingulate cortex.',
            whatToSay: 'I can see how much that hurt when your friends did not reply. It makes total sense why you feel overwhelmed right now.',
            body: 'Long before pubertal growth spurts occur, adrenarche re-wires the tween brain to prioritize peer status and social inclusion above adult approval. The Alongside Empathetic Response anchors connection during these emotional swings.',
          },
        ],
      },
      {
        slug: 'deescalating-eyerolls-snark',
        title: 'De-escalating Eye-Rolls & Snark: The 3-Step Empathetic Reset',
        summary: 'Daily communication habits that de-escalate defensive tween sarcasm.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'calm-tech-conversations',
            title: 'The 3-Step Empathetic Reset for Sarcasm and Defiance',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Snark and eye-rolls are defensive armor against perceived vulnerability. Matching sarcasm with adult anger escalates conflict; calm curiosity neutralizes it.',
            whatToSay: 'You seem really frustrated with me right now. I care about what you have to say, but I want to hear it when we can talk respectfully.',
            body: 'When tweens roll their eyes, parents feel personally insulted. Remembering that snark is clumsy autonomy testing allows parents to stay centered and in control.',
          },
        ],
      },
      {
        slug: 'group-chat-friction-fomo',
        title: 'Group Chat Friction, FOMO & The Agony of Social Exclusion',
        summary: 'Scaffolding tween resilience amidst modern digital peer dynamics.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'group-chats-fomo',
            title: 'Navigating Group Chats, FOMO and Silent Exclusion',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Modern tweens experience the digital group chat as the physical school hallway. Leaving them unguided creates chronic cortisol spikes and toxic comparison.',
            whatToSay: 'It hurts deeply to be left out of a chat. Remember that what people post in group chats is curated performance, not real connection.',
            body: 'Group chats move at 100 messages a minute. For a 10-year-old, missing a thread feels like total social death.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'behavior-adolescent-identity',
    AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    'Adolescent Identity, Defiance & Boundaries',
    'Transforming power struggles into collaborative problem-solving and non-punitive repair.',
    DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    5,
    'https://assets.alongside.care/academy/behavior-adolescent.png',
    [
      {
        slug: 'defusing-high-intensity-arguments',
        title: 'Defusing High-Intensity Arguments: The Pause Before Reaction Protocol',
        summary: 'Immediate crisis de-escalation for heated parent-teen confrontations.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'pause-before-reaction-protocol',
            title: 'Defusing High-Intensity Arguments: The Pause Protocol',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'When both parent and teenager are screaming, both brains are locked in fight-or-flight amygdala hijacking. An intentional 20-minute cooling break is a biological necessity for reason to return.',
            whatToSay: 'I love you too much to argue like this. We are both heated. Let us take 20 minutes to cool off, and we will talk at the kitchen table.',
            body: 'Teenagers have mature reward and emotional centers, but their prefrontal impulse control is still years away from completion. Engaging in shouting matches guarantees mutual regret.',
          },
        ],
      },
      {
        slug: 'shifting-from-manager-to-mentor',
        title: 'Shifting From Manager to Mentor: Collaborative Problem Solving',
        summary: 'Daily habits that replace micromanagement with guided accountability.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'from-manager-to-mentor',
            title: 'Collaborative Problem Solving with Adolescents',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Autonomy cannot be taught through commands; it must be practiced through collaborative agreements where teens own the solution to their challenges.',
            whatToSay: 'We have a problem with homework getting delayed until midnight. What do you think would help you get it done before dinner?',
            body: 'If parents continue to manage a 14-year-old like an 8-year-old, the teenager will either rebel openly or become passive and helpless.',
          },
        ],
      },
      {
        slug: 'non-punitive-repair-blueprint',
        title: 'When Agreements Break: The Non-Punitive Repair Blueprint',
        summary: 'Scaffolding restoration and trust recovery after broken family boundaries.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'repair-after-breach',
            title: 'Restorative Justice: Repairing Trust After Broken Agreements',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Grounding a teen for a month teaches sneakiness, not remorse. Restorative accountability requires repairing the specific relationship or trust broken.',
            whatToSay: 'You broke the agreement about coming home on time. I am not going to yell or take away your phone for weeks. But we need a plan to rebuild trust.',
            body: 'When boundaries break, parents often swing between explosive punishment and weary surrender. Restorative blueprints provide a structured, calm middle path.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'behavior-teen-autonomy',
    AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    'Late Teen Autonomy & Emotional Sovereignty',
    'Navigating driving, curfews, mutual respect, and preparing for the adult launch.',
    DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    6,
    'https://assets.alongside.care/academy/behavior-late-teen.png',
    [
      {
        slug: 'high-stakes-respect-and-curfews',
        title: 'High-Stakes Respect: Navigating Driving, Curfews & Independence',
        summary: 'Managing safety limits while honoring budding adult independence.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'driving-and-curfew-agreements',
            title: 'Safety Without Surveillance: Driving & Curfew Agreements',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'High-stakes safety boundaries (such as zero texting while driving) must be non-negotiable covenants, rooted in mutual respect rather than authoritarian threats.',
            whatToSay: 'Driving is the biggest responsibility you have ever had. If you ever feel unsafe or make a mistake, call me. I will pick you up with zero questions asked.',
            body: 'Older teenagers are months away from legal adulthood. The role of the parent must shift from law enforcement to trusted advisory sanctuary.',
          },
        ],
      },
      {
        slug: 'graduated-privileges-reliability',
        title: 'Graduated Privileges: Earning Freedom Through Reliability',
        summary: 'Daily routines of demonstrating consistency to expand personal freedom.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'graduated-privileges-protocol',
            title: 'The Reliability Currency: How Privileges Expand',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Freedom is not awarded by age; it is earned by demonstrated reliability. When teens see this direct connection, they internalize executive self-discipline.',
            whatToSay: 'Freedom expands as reliability is proven. When you text when you change locations, you show you are ready for a later curfew.',
            body: 'Tying privileges to transparent benchmarks eliminates arbitrary arguments about fairness between parents and older teens.',
          },
        ],
      },
      {
        slug: 'adult-launch-emotional-sovereignty',
        title: 'Preparing for the Adult Launch: Emotional Self-Sovereignty',
        summary: 'Long-term scaffolding for life beyond the family home.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'preparing-for-adult-launch',
            title: 'The Final Handoff: Emotional Self-Sovereignty',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'The ultimate measure of successful parenting is not how well a teenager obeys your rules, but how thoughtfully they govern themselves when no one is watching.',
            whatToSay: 'You are stepping into adulthood. You will make mistakes, and that is normal. Remember that our home is always your safe landing place.',
            body: 'As graduation approaches, parents must gradually relinquish control over laundry, waking up, and schedule management so the teen avoids launching into college unprepared.',
          },
        ],
      },
    ]
  ),

  // =========================================================================
  // CATEGORY 2: HEALTH_AND_WELLNESS (Pediatric Health, Sleep & Rhythms)
  // =========================================================================
  buildModule(
    'health-infant-sleep-foundations',
    AcademyCategory.HEALTH_AND_WELLNESS,
    'Infant Health Foundations & Sleep Architecture',
    'Understanding fever physiology, hydration, wake windows, and pediatric triage.',
    DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    7,
    'https://assets.alongside.care/academy/health-infant.png',
    [
      {
        slug: 'demystifying-infant-fevers',
        title: 'Demystifying Fevers: Immune Biology, Hydration & Red-Flag Triage',
        summary: 'Why fevers are a physiological defense and how to identify true clinical red flags.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'infant-fever-neurobiology',
            title: 'Fever Phobia vs Biological Defense: Knowing When to Act',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Fever is an adaptive immune defense that slows viral replication. Treat the child’s comfort and hydration, not the number on the thermometer. Any fever in infants under 90 days requires immediate medical care.',
            whatToSay: 'The fever is your body fighting off the germ. Let us drink cool water, take off heavy layers, and rest quietly together.',
            body: 'Pediatric fever phobia causes unnecessary middle-of-the-night panic. Understanding the biology of body temperature regulation allows parents to remain calm anchors during infant illnesses.',
          },
        ],
      },
      {
        slug: 'sleep-architecture-circadian-anchors',
        title: 'Sleep Architecture: Circadian Anchors, Wake Windows & Nap Drops',
        summary: 'Daily sleep schedules, wake window thresholds, and healthy nap transitions.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'infant-wake-windows-and-sleep',
            title: 'Wake Windows & Circadian Rhythms: Preventing the Overtired Spike',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Infants have strict wake window tolerances. Keeping an infant awake past their window causes an adrenaline and cortisol spike that makes falling asleep twice as difficult.',
            whatToSay: 'I see heavy eyelids and eye rubbing. It is time to wind down our body in the quiet, dim room.',
            body: 'Understanding sleep pressure (adenosine accumulation) versus circadian drive helps parents build predictable, serene nap schedules without endless crying.',
          },
        ],
      },
      {
        slug: 'when-to-call-pediatrician',
        title: 'When to Call the Pediatrician vs. Comforting at Home',
        summary: 'Pediatric advisory triage protocols for cough, rashes, and vomiting.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'pediatric-clinical-triage-guide',
            title: 'The Triage Matrix: ER vs Pediatrician vs Home Care',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Look at the child, not just the symptom. Normal breathing, moist lips, and alert engagement during fever drops signify stable home convalescence.',
            whatToSay: 'Let us check your breathing and drink some fluids. You are doing great, and I am watching you closely.',
            body: 'A structured triage mental model saves parents from traumatic emergency room visits while ensuring genuine red flags (stridor, lethargy, petechiae) receive instant care.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'health-preschool-immunity',
    AcademyCategory.HEALTH_AND_WELLNESS,
    'Preschool Immunity & Restorative Rest',
    'Recovering from daycare germs, managing night terrors, and daily outdoor movement.',
    DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    8,
    'https://assets.alongside.care/academy/health-preschool.png',
    [
      {
        slug: 'daycare-germs-immune-recovery',
        title: 'Daycare & School Germs: The Developing Immune System & Recovery',
        summary: 'Why frequent viral infections are normal in early childhood immunity.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'preschool-immune-system-maturation',
            title: 'The 8-12 Viral Colds a Year: How Immunity Trains',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Preschoolers experience an average of 8 to 12 viral upper respiratory infections annually. Each benign virus trains naive T-cells and expands humoral immunity for life.',
            whatToSay: 'Your immune army is working hard today. Warm broth and cuddles will help your body recharge.',
            body: 'First-time parents often despair when their preschooler catches consecutive colds every 3 weeks. Recognizing this as the expected immune training phase relieves parental guilt.',
          },
        ],
      },
      {
        slug: 'night-terrors-separation-anxiety',
        title: 'Night Terrors, Nightmares & Separation Anxiety at Night',
        summary: 'Understanding non-REM parasomnias versus bad dreams.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'night-terrors-vs-nightmares',
            title: 'Night Terrors vs Nightmares: The Parasomnia Guide',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Night terrors occur in deep non-REM stage 3 sleep. The child is not awake and has no memory of the episode. Do not shake or wake them; ensure physical safety until it passes.',
            whatToSay: 'You are safe. I am right here with you. Everything is okay.',
            body: 'Seeing a 4-year-old scream with wide eyes while asleep terrifies parents. Learning to differentiate non-REM sleep terrors from REM nightmares provides immediate calm.',
          },
        ],
      },
      {
        slug: 'outdoor-sunlight-immune-buffering',
        title: 'Outdoor Movement, Sunlight Exposure & Natural Immune Buffering',
        summary: 'Circadian entrainment, microbial diversity, and physical resilience.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'outdoor-movement-and-microbiome',
            title: 'Dirt, Sun & Movement: Natural Pediatric Buffers',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Morning outdoor sunlight entrains the suprachiasmatic nucleus, ensuring melatonin surges 12 hours later. Contact with natural soil diversifies the pediatric microbiome.',
            whatToSay: 'Let us put our boots on and explore the park puddles before lunch!',
            body: 'Children who spend at least 90 minutes outdoors daily demonstrate lower myopia rates, deeper nighttime sleep, and superior emotional self-regulation.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'health-elementary-wellness',
    AcademyCategory.HEALTH_AND_WELLNESS,
    'Middle Childhood Physical Health & Sleep',
    'Protecting 9-11 hour sleep windows, pediatric sports injury prevention, and convalescence.',
    DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    9,
    'https://assets.alongside.care/academy/health-elementary.png',
    [
      {
        slug: 'protecting-the-sleep-window',
        title: 'Protecting the 9–11 Hour Sleep Window from Evening Overstimulation',
        summary: 'Why elementary brain myelination requires uncompromised nighttime sleep.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'elementary-sleep-architecture',
            title: 'Protecting the 9-11 Hour Window: The Cognitive Foundation',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Elementary school children require 9 to 11 hours of uninterrupted sleep. Loss of even 45 minutes of sleep degrades executive attention and increases emotional volatility by 300%.',
            whatToSay: 'Your brain needs sleep tonight so you have energy for science and soccer tomorrow. Lights out at 8:30 PM.',
            body: 'As school activities, sports practices, and evening media expand, bedtimes easily slide later. Defending the sleep boundary is the single highest-leverage health choice.',
          },
        ],
      },
      {
        slug: 'pediatric-sports-hydration-growth-plates',
        title: 'Pediatric Sports Hydration, Growth Plate Safety & Overuse Prevention',
        summary: 'Guarding growing bones, tendons, and heat tolerance in active kids.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'sports-hydration-and-growth-plates',
            title: 'Active Kid Physiology: Hydration and Growth Plate Care',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Children produce more heat per kilogram during exercise and sweat less efficiently than adults. Pre-hydration before sports practice is vital to prevent heat exhaustion.',
            whatToSay: 'Drink your water bottle before we get into the car for practice, not just when you are thirsty on the field.',
            body: 'Open growth plates at the ends of long bones are vulnerable to overuse shear injuries (such as Sever’s disease or Osgood-Schlatter). Rest days are essential for tissue remodeling.',
          },
        ],
      },
      {
        slug: 'illness-convalescence-energy',
        title: 'Illness Convalescence: Rebuilding Energy Without Early Burnout',
        summary: 'Post-viral recovery protocols to avoid chronic relapse and fatigue.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'post-viral-convalescence',
            title: 'The Art of Convalescence: Complete Recovery Over Rushed Returns',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Rushing a child back to competitive sports or heavy school testing immediately after a fever causes prolonged post-viral fatigue and immune relapse.',
            whatToSay: 'You are fever-free today, but your body is still repairing. We will take today slow with reading and drawing.',
            body: 'Modern family scheduling often rushes recuperation. Honoring a 24-48 hour post-fever convalescence buffer strengthens long-term vitality.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'health-tween-circadian-leaps',
    AcademyCategory.HEALTH_AND_WELLNESS,
    'Pubertal Physical Leaps & Circadian Delays',
    'Melatonin phase delay, pubertal hygiene, and evening screen hardware boundaries.',
    DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    10,
    'https://assets.alongside.care/academy/health-tween.png',
    [
      {
        slug: 'melatonin-shift-tween-sleep',
        title: 'The 1.5-Hour Melatonin Shift: Why Tweens Can’t Sleep at 9:00 PM',
        summary: 'Biological circadian phase delay and how to adapt family evening routines.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'circadian-delay-and-melatonin',
            title: 'The Biological Clock Shift: Why Tweens Lie Awake',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Puberty triggers a biological shift in melatonin secretion that delays the sleep onset signal by 1.5 to 2 hours. Tweens are not being stubborn; their brains are biologically wide awake at 9:00 PM.',
            whatToSay: 'I know your body does not feel tired yet because your biological clock is shifting. But resting quietly in bed without screens allows your brain to recharge.',
            body: 'Understanding this universal neurobiological phase delay prevents parents from viewing late-evening wakefulness as moral defiance or insubordination.',
          },
        ],
      },
      {
        slug: 'body-changes-hygiene-conversations',
        title: 'Body Changes, Hygiene & Hormonal Shifts: Calm Conversations',
        summary: 'Comfortable, non-awkward dialogue regarding changing bodies and hygiene.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'pubertal-hygiene-conversations',
            title: 'De-stigmatizing Body Changes: Calm Advisory Dialogue',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Apocrine sweat glands and hormonal shifts can create self-consciousness. Normalizing daily hygiene routines matter-of-factly prevents shame and social anxiety.',
            whatToSay: 'Your body is growing fast right now, which means your sweat glands are working harder! Let us pick out a deodorant you like the smell of.',
            body: 'Having frequent, brief, positive check-ins about growing bodies builds lifelong body confidence and trust between parents and pre-teens.',
          },
        ],
      },
      {
        slug: 'screen-glow-blue-light-hardware-docks',
        title: 'Screen Glow & Blue Light: The Science of Nighttime Hardware Docks',
        summary: 'Why blue spectrum emissions suppress melatonin and why devices must charge outside bedrooms.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'bedroom-sanctuary-rule',
            title: 'The Bedroom Sanctuary Rule: Why Hardware Charges Outside',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Short-wavelength blue light directly stimulates melanopsin retinal ganglion cells, suppressing melatonin production for up to 90 minutes. Removing screens from bedrooms restores restorative REM cycles.',
            whatToSay: 'Our rule is that all phones and tablets charge on the kitchen counter at 8:30 PM. Your bedroom is a sleep sanctuary, not an office.',
            body: 'Neutral hardware boundaries eliminate nighttime notifications, late-night texting anxiety, and chronic sleep deprivation.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'health-adolescent-sleep-protection',
    AcademyCategory.HEALTH_AND_WELLNESS,
    'Adolescent Sleep Protection & Athletic Health',
    'The 2-hour biological circadian delay, athletic rest days, and avoiding burnout.',
    DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    11,
    'https://assets.alongside.care/academy/health-adolescent.png',
    [
      {
        slug: 'adolescent-circadian-delay-830-dock',
        title: 'The Biological 2-Hour Circadian Delay & The Neutral 8:30 Bedtime Dock',
        summary: 'Managing high school academic demands against severe biological sleep deprivation.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'adolescent-sleep-crisis',
            title: 'The Teen Sleep Crisis: Brain Development and the 8:30 Dock',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Chronic sleep debt in adolescents is directly correlated with clinical depression, anxiety, and motor vehicle accidents. Defending sleep is more important than another hour of late-night homework.',
            whatToSay: 'I care more about your mental health and brain than whether you finish that optional study guide at 1:00 AM. Sleep is your superpower.',
            body: 'High school schedules run counter to adolescent biology. When parents establish non-negotiable device curfews, teens gain an extra 7-10 hours of restorative sleep weekly.',
          },
        ],
      },
      {
        slug: 'athletics-rest-days-sleep-deprivation',
        title: 'Adolescent Athletics: Rest Days, Sleep Deprivation & Injury Risks',
        summary: 'Balancing varsity sports schedules with growth and recovery.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'varsity-athletics-recovery',
            title: 'Athletic Overuse & Recovery: When to Mandate Rest',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Adolescent athletes who sleep fewer than 8 hours per night suffer 1.7 times more physical injuries than well-rested peers. Rest days are when muscle and bone actually rebuild.',
            whatToSay: 'Resting today is not quitting; it is part of your training so you perform at your best this weekend without tearing a ligament.',
            body: 'Hyper-specialization in youth sports has led to unprecedented rates of ACL tears and stress fractures. Parents must advocate for biological rest periods.',
          },
        ],
      },
      {
        slug: 'chronic-fatigue-academic-burnout',
        title: 'Chronic Fatigue Syndrome & Academic Burnout: Warning Signs',
        summary: 'Recognizing neuro-endocrine exhaustion before full burnout hits.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'recognizing-academic-burnout',
            title: 'Academic Burnout & Fatigue: Early Intervention Signs',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Persistent brain fog, frequent headaches, gastrointestinal upset, and apathy are signs of sympathetic nervous system overload. Early lifestyle reset prevents severe depressive crashes.',
            whatToSay: 'I see how exhausted you are carrying all this pressure. Let us look at your commitments and decide what we can drop or scale back.',
            body: 'Teens often push through exhaustion to meet perceived expectations. Parental permission to slow down can be life-saving.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'health-young-adult-wellness',
    AcademyCategory.HEALTH_AND_WELLNESS,
    'Young Adult Physical Autonomy & Wellness',
    'Healthcare independence, breaking all-nighter habits, and preventative wellness.',
    DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    12,
    'https://assets.alongside.care/academy/health-young-adult.png',
    [
      {
        slug: 'healthcare-independence-refills',
        title: 'Healthcare Independence: Managing Appointments, Insurance & Refills',
        summary: 'Practical medical life skills before leaving for college or work.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'healthcare-autonomy-skills',
            title: 'The Medical Handoff: Booking Doctors, Refills & Knowing Symptoms',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Over 70% of 18-year-olds do not know how to book a medical appointment, read an insurance card, or fill a prescription. Practicing these skills at 16-17 prevents medical neglect.',
            whatToSay: 'Here is your insurance card. Why do not you call the dentist office and schedule your next cleaning while I sit next to you?',
            body: 'Empowering older teens to speak directly with pediatricians and manage their own allergy medications fosters lifelong health agency.',
          },
        ],
      },
      {
        slug: 'sleep-hygiene-academic-pressure',
        title: 'Sleep Hygiene Under Academic Pressure: Breaking All-Nighter Habits',
        summary: 'De-bunking the productivity myth of late-night cramming.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'breaking-all-nighter-habits',
            title: 'Memory Consolidation: Why All-Nighters Guarantee Poor Grades',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Memory consolidation into long-term hippocampal storage occurs exclusively during slow-wave and REM sleep. Pulling an all-nighter reduces memory recall by up to 40%.',
            whatToSay: 'Your brain will remember more on test day if you sleep 7 hours than if you stay up until 4:00 AM cramming. Go to bed with confidence.',
            body: 'Teaching teens the neurobiology of sleep transforms rest from an obstacle into a competitive cognitive advantage.',
          },
        ],
      },
      {
        slug: 'lifelong-fitness-preventative-health',
        title: 'Lifelong Physical Fitness, Mental Balance & Preventative Health',
        summary: 'Transitioning from organized school athletics to sustainable adult exercise.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'lifelong-sustainable-movement',
            title: 'From Competitive Sports to Lifelong Joyful Movement',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Finding physical activities enjoyed for intrinsic well-being (hiking, lifting, swimming, yoga) predicts adult cardiovascular resilience far better than high school sports glory.',
            whatToSay: 'Movement is about clearing your mind and feeling strong in your body, not just winning a trophy.',
            body: 'Helping teenagers detach exercise from body shame or intense competition sets them up for decades of physical health.',
          },
        ],
      },
    ]
  ),

  // =========================================================================
  // CATEGORY 3: NUTRITION_AND_FEEDING (Feeding Habits & Nutrition)
  // =========================================================================
  buildModule(
    'nutrition-infant-first-foods',
    AcademyCategory.NUTRITION_AND_FEEDING,
    'Infant First Foods & Allergen Introduction',
    'Safe allergen exposure window, BLW vs purees, and toddler food strikes.',
    DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    13,
    'https://assets.alongside.care/academy/nutrition-infant.png',
    [
      {
        slug: 'early-allergen-exposure-window',
        title: 'Safe Early Allergen Exposure: Window of Opportunity & Safety Signs',
        summary: 'The landmark LEAP study findings and introducing peanuts, eggs, and dairy safely.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'early-allergen-introduction-science',
            title: 'The Critical 4-11 Month Window: Preventing Food Allergies',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Introducing common allergens (diluted peanut butter, cooked egg) between 4 and 11 months trains intestinal regulatory T-cells and reduces severe allergy risk by up to 80%.',
            whatToSay: 'Let us try a tiny taste of thinned peanut butter today while you are happy and awake. We will monitor your skin and smile together.',
            body: 'Historic guidelines mistakenly advised delaying allergens. Modern clinical consensus proves early, consistent oral exposure builds robust immune tolerance.',
          },
        ],
      },
      {
        slug: 'blw-vs-purees-gagging-science',
        title: 'Baby-Led Weaning vs Purées: Choking Prevention & Gagging Science',
        summary: 'Understanding the normal hyper-sensitive infant gag reflex versus true choking.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'gagging-vs-choking-science',
            title: 'Loud and Red vs Silent and Blue: The Gag Reflex Explained',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Gagging is a protective forward-tongue reflex located mid-tongue in infants. Choking is silent airway obstruction. Staying calm during gagging prevents fear-based food refusal.',
            whatToSay: 'You are coughing and working that food forward. You are doing great! Keep coughing it out.',
            body: 'Watching a baby gag can panic parents. Understanding the physiological difference between noisy gagging and silent choking gives parents confidence at mealtime.',
          },
        ],
      },
      {
        slug: 'division-of-responsibility-food-strikes',
        title: 'Toddler Food Strikes: Ellyn Satter’s Division of Responsibility',
        summary: 'Ending mealtime battles through clear parental and toddler boundaries.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'division-of-responsibility-feeding',
            title: 'The Golden Feeding Rule: Parents Provide, Children Decide',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Parents decide WHAT, WHEN, and WHERE to eat; the child decides WHETHER and HOW MUCH to eat. Coercing a toddler to eat creates feeding aversions and disrupts internal satiety cues.',
            whatToSay: 'You do not have to eat the broccoli, but this is what we are having for dinner. You may eat as much rice and chicken as your tummy needs.',
            body: 'Toddlers frequently eat heavily one day and barely anything the next due to fluctuating growth spurts. Respecting their appetite builds lifelong intuitive eating.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'nutrition-preschool-picky-eating',
    AcademyCategory.NUTRITION_AND_FEEDING,
    'Preschool Picky Eating & Family Meal Harmony',
    'Ending dinner table battles, texture exposure, and demystifying sweet obsessions.',
    DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    14,
    'https://assets.alongside.care/academy/nutrition-preschool.png',
    [
      {
        slug: 'ending-dinner-table-battles',
        title: 'Ending the Dinner Table Battle: Removing Coercion & Pressure',
        summary: 'Eliminating the "two more bites" rule and making family dinner peaceful.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'dinner-table-coercion-removal',
            title: 'Why "Just Two More Bites" Backfires on Preschoolers',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Pressuring a preschooler to take bites before dessert creates an adversarial dynamic and elevates sweets into a forbidden prize. Neutral presentation neutralizes power struggles.',
            whatToSay: 'You do not have to eat anything you do not want to. We are sitting together to talk about our day.',
            body: 'Dinner should be a time of emotional connection, not a negotiation session. Removing pressure paradoxically encourages children to sample new foods willingly.',
          },
        ],
      },
      {
        slug: 'sensory-texture-aversion-exposure',
        title: 'Sensory Texture Aversion: Gentle Exposure Therapy Without Shame',
        summary: 'Understanding tactile food neophobia and systematic 15-exposure steps.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'gentle-texture-exposure',
            title: 'The 15-Exposure Rule: Touching, Smelling, and Tasting Without Panic',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'It takes 10 to 15 neutral exposures for a child’s brain to classify a new texture as safe. Smelling or placing a food on their plate counts as a successful exposure step.',
            whatToSay: 'You do not need to taste it yet. Can you tell me if it smells crunchy or sweet?',
            body: 'Food neophobia is an evolutionary survival mechanism that peaks between ages 2 and 5 to prevent mobile children from ingesting toxic plants.',
          },
        ],
      },
      {
        slug: 'demystifying-sugar-treats',
        title: 'De-mystifying Sugar & Treats: Neutralizing Sweet Obsessions',
        summary: 'Preventing bingeing and secret eating by normalizing sweets alongside balanced meals.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'neutralizing-sweet-obsessions',
            title: 'Putting Treats on the Plate: Eliminating the Forbidden Fruit Effect',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Strictly forbidding treats leads to intense obsession and secret bingeing when outside the home. Serving a small cookie alongside dinner neutralizes its mystical power.',
            whatToSay: 'We have chicken, carrots, rice, and one small cookie for everyone tonight. You can eat them in whatever order you like.',
            body: 'When sweet foods lose their forbidden status, children stop obsessing and learn to stop eating when comfortably satisfied.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'nutrition-elementary-fuel',
    AcademyCategory.NUTRITION_AND_FEEDING,
    'Elementary Fuel & Sustained Focus',
    'Brain fuel lunchboxes, 3:30 PM hangry meltdowns, and kitchen agency.',
    DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    15,
    'https://assets.alongside.care/academy/nutrition-elementary.png',
    [
      {
        slug: 'lunchbox-blueprint-protein-carbs',
        title: 'School Lunchbox Blueprint: Protein & Complex Carbs for Attention',
        summary: 'Preventing the 1:30 PM classroom cognitive crash with sustained energy.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'school-lunchbox-nutrition-blueprint',
            title: 'Blood Sugar Stability: Fueling Afternoon Classroom Attention',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'High-glycemic lunches (white bread, fruit gummies, juice boxes) cause rapid insulin surges followed by hypoglycemia at 1:30 PM, mimicking ADHD symptoms in class.',
            whatToSay: 'Let us pick out one protein (turkey or cheese) and one colorful fruit to pack in your bento box for great playground energy!',
            body: 'Balancing fiber, protein, and healthy fats in school lunches stabilizes focus and mood during the most academically demanding hours of the school day.',
          },
        ],
      },
      {
        slug: 'the-330pm-hangry-meltdown',
        title: 'The 3:30 PM Hangry Meltdown: High-Fiber, Protein Snacking Rituals',
        summary: 'De-escalating the immediate after-school emotional collapse.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'after-school-hangry-reset',
            title: 'The 3:30 PM Reset: Feed First, Talk Later',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Children burn immense cognitive glucose holding their behavior together at school. The after-school collapse is metabolic. Offer a wholesome snack before asking about homework or grades.',
            whatToSay: 'Here is some sliced apple with peanut butter and a big glass of water. Eat up, and we will talk whenever you are ready.',
            body: 'Bombarding an elementary student with questions as soon as they get in the car triggers irritation. Meeting biological hunger first restores emotional regulation.',
          },
        ],
      },
      {
        slug: 'kitchen-agency-meal-prep',
        title: 'Kitchen Agency: Involving 7–9 Year Olds in Simple Meal Preparation',
        summary: 'Building culinary competence, safe knife skills, and pride in wholesome cooking.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'elementary-kitchen-competence',
            title: 'From Consumer to Chef: Kitchen Agency for 7-9 Year Olds',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Children who participate in washing, chopping, and cooking food are 4 times more likely to eat unfamiliar vegetables and develop confident self-efficacy.',
            whatToSay: 'You are on vegetable duty tonight! Can you wash the bell peppers and help me stir the pasta sauce?',
            body: 'Giving children real kitchen responsibilities (with child-safe knives) transforms food from something imposed upon them into a creative craft.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'nutrition-tween-growth-spurts',
    AcademyCategory.NUTRITION_AND_FEEDING,
    'Pre-Teen Growth Spurts & Food Relationship',
    'Fueling bone leaps, non-judgmental body image conversations, and peer snacking.',
    DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    16,
    'https://assets.alongside.care/academy/nutrition-tween.png',
    [
      {
        slug: 'fuelling-pre-pubertal-growth-spurts',
        title: 'Fuelling the Pre-Pubertal Growth Spurt: Calorie Demands & Micronutrients',
        summary: 'Meeting calcium, iron, and energy surges during rapid skeletal lengthening.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'pre-pubertal-caloric-demands',
            title: 'The Tween Growth Surge: Why Their Appetite Quadruples',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'During peak pubertal growth, tweens accumulate up to 40% of their adult skeletal bone mass. Calcium, vitamin D, and sufficient healthy calories are non-negotiable building blocks.',
            whatToSay: 'Your bones are growing faster right now than at any time since you were a baby! If you are still hungry after dinner, have a bowl of yogurt or nuts.',
            body: 'Parents are often shocked when a 11-year-old eats two adult portions. Reassuring them that this matches their biological growth trajectory prevents anxiety.',
          },
        ],
      },
      {
        slug: 'body-image-neutral-food-talk',
        title: 'Promoting Positive Body Image: Neutral, Non-Judgmental Food Talk',
        summary: 'Eliminating weight shaming, diet culture, and "good vs bad" food moralizing.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'neutral-food-language',
            title: 'Neutral Food Talk: Removing Guilt and Morality from Eating',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Commenting on a tween’s changing weight or labeling foods as "guilty" or "fattening" strongly correlates with adolescent eating disorders. Praise strength, energy, and nourishment.',
            whatToSay: 'All foods give us different things. Some give us sustained energy for soccer, and some give us joy to share with friends. All foods fit.',
            body: 'Parental self-talk matters immensely: if a parent constantly criticizes their own body in the mirror, their tween absorbs that scrutiny instantly.',
          },
        ],
      },
      {
        slug: 'social-snacking-peer-pressure',
        title: 'Social Snacking: Navigating Fast Food and Peer Pressure Gracefully',
        summary: 'Navigating boba shops, mall food courts, and peer eating habits with freedom.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'peer-food-culture-navigation',
            title: 'Boba, Fast Food & Friends: Guiding Social Eating Without Bans',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Social eating is a premier peer bonding ritual for tweens. Banning fast food outright leads to social alienation and rebellious over-consumption when unsupervised.',
            whatToSay: 'Have fun getting ice cream with your friends! Enjoy it, and we will have a nourishing dinner together later.',
            body: 'Teaching balance and self-attunement allows tweens to participate in peer outings without guilt or digestive distress.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'nutrition-adolescent-sports-fuel',
    AcademyCategory.NUTRITION_AND_FEEDING,
    'Adolescent Metabolic Demands & Sports Nutrition',
    'Pubertal caloric requirements, pre/post workout hydration, and spotting disordered eating.',
    DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    17,
    'https://assets.alongside.care/academy/nutrition-adolescent.png',
    [
      {
        slug: 'pubertal-caloric-demands-growth',
        title: 'High-Calorie Demands of Rapid Bone & Muscle Growth in Puberty',
        summary: 'Understanding the 3,000+ calorie energy demands of active teenage bodies.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'teen-metabolic-demands',
            title: 'Fuelling the Adolescent Engine: The 3,000 Calorie Reality',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'An adolescent athlete can easily burn 3,500 to 4,000 calories daily. Under-fueling leads to relative energy deficiency in sport (RED-S), menstrual dysfunction, and hormonal disruption.',
            whatToSay: 'You are working so hard on the track and in the classroom. Let us make sure you have substantial meals packed to keep your tank full.',
            body: 'Teenagers need dense, quality nutrition to support pubertal transformation, brain myelination, and sports recovery without falling into deficit.',
          },
        ],
      },
      {
        slug: 'workout-fueling-hydration-electrolytes',
        title: 'Pre-Game and Post-Workout Fueling: Hydration & Electrolytes',
        summary: 'Science-backed fueling windows to optimize athletic performance and recovery.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'sports-fueling-windows',
            title: 'The 30-Minute Recovery Window: Protein & Glycogen Replenishment',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Consuming 20g of protein paired with complex carbohydrates within 45 minutes post-workout accelerates glycogen resynthesis and halts exercise-induced muscle protein breakdown.',
            whatToSay: 'Pack a chocolate milk or protein smoothie in your sports bag to drink right after practice finishes.',
            body: 'Simple habit architecture—like keeping recovery snacks in athletic bags—prevents teens from crashing or craving sugary energy drinks after workouts.',
          },
        ],
      },
      {
        slug: 'warning-signs-disordered-eating',
        title: 'Spotting Warning Signs: Recognizing Disordered Eating & Restriction Early',
        summary: 'Identifying early behavioral red flags and initiating compassionate clinical support.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'disordered-eating-early-signs',
            title: 'Orthorexia, Food Avoidance & Body Checking: The Early Warning System',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Disordered eating often disguises itself as "eating clean" or cutting out entire macronutrient groups. Early intervention within the first 6 months yields dramatically superior recovery rates.',
            whatToSay: 'I noticed you have been avoiding family meals and feeling anxious around food. I love you, and I am here to help you feel safe and supported.',
            body: 'Recognizing obsessive calorie counting, extreme exercise compensation, or skipping meals allows parents to consult adolescent pediatric specialists before severe pathology takes root.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'nutrition-teen-food-sovereignty',
    AcademyCategory.NUTRITION_AND_FEEDING,
    'Teen Food Sovereignty & Lifelong Habits',
    '5 scratch meals before leaving home, the energy drink epidemic, and intuitive eating.',
    DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    18,
    'https://assets.alongside.care/academy/nutrition-teen-sovereignty.png',
    [
      {
        slug: 'cooking-five-scratch-meals',
        title: 'Cooking 5 Wholesome Meals From Scratch Before Leaving Home',
        summary: 'The essential culinary curriculum every teenager needs before independent living.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'five-essential-scratch-meals',
            title: 'The Independent Kitchen: 5 Budget-Friendly Meals for Adult Life',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Knowing how to prepare 5 simple, nutrient-dense meals from raw ingredients protects young adults against metabolic syndrome, high sodium intake, and financial drain in college.',
            whatToSay: 'Tonight is your night to cook the stir-fry! Show me your seasoning strategy.',
            body: 'Mastering a basic chicken roast, hearty vegetable stir-fry, grain bowl, egg scramble, and lentil soup gives older teens true food independence.',
          },
        ],
      },
      {
        slug: 'energy-drink-caffeine-epidemic',
        title: 'The Caffeine & Energy Drink Epidemic: Biological Cardiovascular Realities',
        summary: 'Addressing 300mg caffeine cans, taurine combinations, and cardiac safety.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'energy-drinks-and-cardiac-load',
            title: '300mg in a Can: Why Energy Drinks Strain Young Hearts',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Megadoses of caffeine combined with guarana and taurine trigger tachycardia, arrhythmias, and severe sleep disruption in teens. Limit daily caffeine to under 100mg.',
            whatToSay: 'Those energy drinks contain as much caffeine as four cups of coffee. If you need a boost, let us look at your sleep or grab a matcha tea.',
            body: 'Modern energy drink marketing targets gaming and studying teens aggressively. Teaching them how caffeine blocks adenosine receptors helps them manage alertness naturally.',
          },
        ],
      },
      {
        slug: 'intuitive-eating-metabolic-health',
        title: 'Intuitive Eating: Sustaining Metabolic Health Into Adulthood',
        summary: 'Trusting internal hunger and satiety signals for lifelong metabolic vitality.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'intuitive-eating-framework',
            title: 'The Intuitive Eating Covenant: Honoring Satiety Without Guilt',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Chronic restrictive dieting slows resting metabolic rate and promotes cyclical weight cycling. Intuitive eating fosters lasting cardiometabolic and psychological well-being.',
            whatToSay: 'Listen to what your body is asking for. Nourish it well, enjoy what you eat, and stop when you feel satisfied.',
            body: 'Graduating high school with a peaceful, intuitive relationship with food is one of the greatest gifts a parent can confer.',
          },
        ],
      },
    ]
  ),

  // =========================================================================
  // CATEGORY 4: DEVELOPMENT_AND_PLAY (Cognitive Leaps & Purposeful Play)
  // =========================================================================
  buildModule(
    'play-infant-sensory-language',
    AcademyCategory.DEVELOPMENT_AND_PLAY,
    'Infant Sensory Awakening & Language Bursts',
    'Video deficit effect, serve-and-return communication, and tactile fine motor play.',
    DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    19,
    'https://assets.alongside.care/academy/play-infant.png',
    [
      {
        slug: 'video-deficit-why-screens-cant-teach',
        title: 'The 3D Video Deficit: Why Screens Cannot Teach First Words',
        summary: 'The cognitive science of tactile 3D spatial mapping versus flat 2D glass.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'video-deficit-effect-infants',
            title: 'The Video Deficit: Why 2D Screens Cannot Build 3D Language',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Infants lack the symbolic cognitive capacity to transfer 2D screen actions into 3D real-world problem solving. Live human interaction wires language circuits 10 times faster than educational videos.',
            whatToSay: 'Look at the ball roll! The red ball bounces over to you! Can you roll it back to me?',
            body: 'Despite marketing claims of baby educational media, developmental neurology proves that vocabulary acquisition requires contingent, physical, human eye contact and vocal responsiveness.',
          },
        ],
      },
      {
        slug: 'serve-and-return-neural-synapses',
        title: 'Serve-and-Return Conversation: Wiring Infant Neural Synapses',
        summary: 'The Harvard Center on the Developing Child serve-and-return interaction protocol.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'serve-and-return-practice',
            title: 'Serve-and-Return: 5 Steps to Building Infant Brain Architecture',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Every time a caregiver responds with eye contact and vocal melody to an infant’s babble, thousands of neural synapses fire and wire in the auditory cortex.',
            whatToSay: 'Oh, you see that bird outside? Ah-ba-ba! Yes, the bird is singing in the tree!',
            body: 'Serve-and-return play requires zero expensive toys: just undivided presence, mutual gazing, and mirroring infant vocalizations with warm parentese.',
          },
        ],
      },
      {
        slug: 'sensory-bins-puppet-play',
        title: 'Sensory Bins, Puppet Play & Fine-Motor Hand-Eye Coordination',
        summary: 'Engaging tactile fine-motor exploration, water play, and puppet dialogue.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'sensory-bins-and-puppets',
            title: 'Puppets & Sensory Bins: Scaffolding Fine Motor Dexterity',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Manipulating varied textures (uncooked rice, water, dry pasta) builds somatosensory cortex maps and fine-motor pincer grasp strength for later handwriting.',
            whatToSay: 'Look at Mr. Bear! Mr. Bear wants to scoop the water with you. Splish splash!',
            body: 'Puppets allow infants and toddlers to explore social emotional roles safely, fostering emotional projection and early cooperative play.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'play-preschool-executive-function',
    AcademyCategory.DEVELOPMENT_AND_PLAY,
    'Imaginative Play & Executive Function',
    'Sustained attention vs fast media, block building, and the boredom threshold.',
    DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    20,
    'https://assets.alongside.care/academy/play-preschool.png',
    [
      {
        slug: 'purposeful-play-vs-fast-animation',
        title: 'Purposeful Play vs. Fast-Paced Animation: Building Sustained Attention',
        summary: 'How rapid scene cuts overstimulate young brains and how imaginative play heals attention.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'fast-media-vs-deep-play',
            title: 'Scene Transitions & Dopamine: Protecting Attention Spans',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Fast-paced animations with scene cuts every 3 seconds deplete dopamine and impair executive inhibition immediately after viewing. Slow-tempo play cultivates sustained focus.',
            whatToSay: 'Let us build a giant fort with chairs and blankets and pretend we are explorers in a deep forest.',
            body: 'When children engage in self-directed imaginative play, they actively generate narratives and regulate their own attention rather than passively receiving algorithmic stimulation.',
          },
        ],
      },
      {
        slug: 'block-building-prefrontal-cortex',
        title: 'Block Building & Symbolic Roleplay: Scaffolding Prefrontal Cortex',
        summary: 'Spatial reasoning, gravity experiments, and symbolic socio-dramatic play.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'blocks-and-symbolic-roleplay',
            title: 'Wooden Blocks & Pretend Play: The Executive Function Engine',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Unit blocks teach intuitive physics, balance, and spatial visualization. Symbolic pretend play requires holding complex rules in working memory, the foundation of executive function.',
            whatToSay: 'How high do you think we can balance this green block before the tower falls? Let us test your hypothesis!',
            body: 'Simple open-ended materials (wooden blocks, silk cloths, cardboard boxes) yield far richer cognitive development than battery-operated plastic toys with preset sounds.',
          },
        ],
      },
      {
        slug: 'the-boredom-threshold-creativity',
        title: 'The Boredom Threshold: Fostering Independent Creative Play',
        summary: 'Why boredom is the essential spark of childhood creative initiative.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'conquering-the-boredom-threshold',
            title: 'Boredom is Not an Emergency: Sparking Self-Directed Play',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'When parents instantly rescue children from boredom with entertainment, the child never develops internal initiative. Crossing the 10-minute boredom barrier unlocks profound creativity.',
            whatToSay: 'It is wonderful to feel bored! That means your brain is getting ready to invent something brand new. I wonder what you will create.',
            body: 'Resisting the urge to hand over a tablet when a child whines "I am bored" teaches them to survey their physical environment and invent novel games.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'play-elementary-logic-maker',
    AcademyCategory.DEVELOPMENT_AND_PLAY,
    'Logic, Spatial Strategy & Creative Maker Play',
    'Spatial reasoning, cardboard maker engineering, and cooperative board games.',
    DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    21,
    'https://assets.alongside.care/academy/play-elementary.png',
    [
      {
        slug: 'spatial-reasoning-strategy-games',
        title: 'Spatial Reasoning & Strategy Games: Chess, Puzzles & Cognitive Maps',
        summary: 'Cultivating prospective thinking and visualizing future moves.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'strategy-games-and-executive-thinking',
            title: 'Thinking Three Moves Ahead: Chess & Spatial Strategy',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Strategy games like chess, checkers, and logic puzzles strengthen the dorsolateral prefrontal cortex, directly enhancing mental manipulation and impulse reflection.',
            whatToSay: 'Before you move your knight, look across the whole board. What is my piece threatening? Take your time.',
            body: 'Elementary students love strategic mastery. Encouraging them to pause and evaluate the consequence of an action before committing transfers directly to social behavior.',
          },
        ],
      },
      {
        slug: 'cardboard-engineering-maker-projects',
        title: 'Hands-On Maker Projects: Cardboard Engineering vs Passive Media',
        summary: 'Tangible creation: masking tape, scissors, motors, and design thinking.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'cardboard-maker-engineering',
            title: 'Cardboard & Tape: Fostering Maker Agency Over Consumerism',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Physical tinkering with cardboard and simple tools bridges abstract geometry with tangible physics, instilling a profound sense of "I can make anything."',
            whatToSay: 'That cardboard box can be a spaceship, a castle, or a pinball machine. What do you need to prototype your idea?',
            body: 'Shifting children from passive digital consumers to active physical makers builds deep self-confidence and frustration tolerance when designs collapse.',
          },
        ],
      },
      {
        slug: 'cooperative-board-games-sportsmanship',
        title: 'Cooperative Board Games: Teaching Sportsmanship & Delayed Reward',
        summary: 'Losing with grace, celebrating team triumphs, and cooperative play.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'cooperative-board-games-sportsmanship',
            title: 'Winning and Losing with Grace: The Board Game Arena',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Cooperative games (where players unite against the game mechanics) teach collaborative strategic dialogue and emotional co-regulation without toxic rivalries.',
            whatToSay: 'We did not win this round, but our teamwork was fantastic. What strategy should we adjust next time we play?',
            body: 'Learning to lose without flipping the board is an essential milestone in emotional regulation that requires regular family game night practice.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'play-tween-flow-hobbies',
    AcademyCategory.DEVELOPMENT_AND_PLAY,
    'Pre-Teen Focus, Flow State & Deep Hobbies',
    'Protecting uninterrupted creative hobbies, metacognitive study, and creative tech.',
    DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    22,
    'https://assets.alongside.care/academy/play-tween.png',
    [
      {
        slug: 'cultivating-flow-state-hobbies',
        title: 'Cultivating The Flow State: Protecting Uninterrupted Creative Hobbies',
        summary: 'How 2-hour uninterrupted immersion in drawing, music, or building anchors tween identity.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'flow-state-in-tweens',
            title: 'Deep Flow vs Shallow Scrolling: Protecting the Creative Oasis',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Experiencing psychological flow (Csikszentmihalyi) provides high-level intrinsic dopamine without algorithmic addiction. A protected creative hobby is the strongest buffer against tween anxiety.',
            whatToSay: 'I see how immersed you are in playing guitar. I will protect your practice time from interruptions.',
            body: 'When tweens have deep hobbies (skateboarding, drawing, digital animation, woodworking), their self-worth is rooted in competence rather than peer validation.',
          },
        ],
      },
      {
        slug: 'metacognitive-study-rituals',
        title: 'Metacognitive Study Rituals: How the Tween Brain Encodes Knowledge',
        summary: 'Active recall, spaced repetition, and teaching back concepts.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'active-recall-and-study-skills',
            title: 'Active Recall vs Re-Reading: Science-Backed Study Mastery',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Re-reading notes gives an illusion of competence. Active recall (flashcards, practice testing, teaching back) forces the brain to retrieve information, doubling retention.',
            whatToSay: 'Do not just re-read the chapter. Close the book and teach me the 3 main causes of the water cycle as if I am five.',
            body: 'Transitioning from elementary to middle school requires explicit study skills. Teaching tweens how memory consolidation works eliminates homework dread.',
          },
        ],
      },
      {
        slug: 'digital-creation-vs-consumption',
        title: 'Digital Creation vs Consumption: Coding, Digital Art & Music Scaffolding',
        summary: 'Steering screen time toward blender, garageband, python, and video editing.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'digital-creators-not-consumers',
            title: 'Code, Compose, Animate: Turning Screens Into Creative Easels',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Screen time spent writing Python code or editing digital video activates problem-solving and motor-spatial brain centers, unlike passive social feed consumption.',
            whatToSay: 'Instead of just watching Roblox streamers, let us download Roblox Studio so you can code your own obstacle course!',
            body: 'Parents do not have to ban all screens: elevating screens into creative production tools transforms the digital relationship.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'play-adolescent-critical-thinking',
    AcademyCategory.DEVELOPMENT_AND_PLAY,
    'Critical Thinking & Media Literacy',
    'Deconstructing AI and algorithmic feeds, deep work mastery, and team ventures.',
    DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    23,
    'https://assets.alongside.care/academy/play-adolescent.png',
    [
      {
        slug: 'deconstructing-algorithmic-echo-chambers',
        title: 'Deconstructing Algorithmic Echo Chambers & AI-Generated Media',
        summary: 'Critical media literacy in the age of generative AI and algorithmic curation.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'deconstructing-echo-chambers',
            title: 'The Algorithmic Mirror: How Feeds Manufacture Beliefs',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Social recommendation engines optimize for outrage and emotional arousal, not truth. Teaching teens to audit the business model behind their feeds develops critical intellectual autonomy.',
            whatToSay: 'Who paid to put this video on your feed, and what emotional reaction are they trying to trigger in you?',
            body: 'Adolescents pride themselves on not being duped. Showing them how recommendation engines manipulate their dopamine turns them into discerning analysts.',
          },
        ],
      },
      {
        slug: 'deep-work-partial-attention',
        title: 'Deep Work Mastery: Overcoming Continuous Partial Attention',
        summary: 'Single-tasking, notification detox, and sustained cognitive focus.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'deep-work-for-teens',
            title: 'Continuous Partial Attention: The Cost of Tab Switching',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Multitasking with open phone notifications increases cognitive task-switch latency by 40% and degrades deep comprehension into superficial skimming.',
            whatToSay: 'Put your phone in "Do Not Disturb" mode in another room for 45 minutes of pure focus, then take a full 10-minute break.',
            body: 'The ability to concentrate deeply on a single complex problem without checking a screen is becoming the rarest and most valuable skill in modern society.',
          },
        ],
      },
      {
        slug: 'collaborative-projects-clubs-ventures',
        title: 'Collaborative Projects: Organizing Teams, Clubs & Real-World Ventures',
        summary: 'Scaffolding entrepreneurial initiative, club leadership, and community service.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'adolescent-team-ventures',
            title: 'Real-World Impact: Launching Clubs, Businesses & Campaigns',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Teens crave authentic social impact and real-world stakes. Guiding them to build clubs or community projects satisfies their desire for significance constructively.',
            whatToSay: 'You have a great idea for a robotics club at your school. What are the first three steps to get teacher sponsorship?',
            body: 'Moving beyond passive school assignments into self-organized collaborative ventures prepares teens for collegiate and professional leadership.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'play-teen-intellectual-mastery',
    AcademyCategory.DEVELOPMENT_AND_PLAY,
    'Intellectual Mastery & Real-World Strategy',
    'Long-range executive prioritization, Socratic debate, and personal financial architecture.',
    DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    24,
    'https://assets.alongside.care/academy/play-late-teen.png',
    [
      {
        slug: 'long-range-executive-prioritization',
        title: 'Long-Range Executive Prioritization: Managing Academics & Passions',
        summary: 'Eisenhower matrix, calendar management, and saying no to preserve deep goals.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'executive-prioritization-matrix',
            title: 'The Art of Essentialism: Prioritizing High-Stakes Goals',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'High school seniors face decision fatigue and severe over-commitment. Teaching them to distinguish between urgent noise and truly important goals preserves mental clarity.',
            whatToSay: 'You cannot do twelve things exceptionally well. Pick your top three priorities for this semester, and let the rest go.',
            body: 'Transitioning to college or career demands ruthless prioritization and the emotional courage to decline distracting opportunities.',
          },
        ],
      },
      {
        slug: 'socratic-debate-disagreement',
        title: 'Socratic Debate & Intellectual Disagreement Without Contempt',
        summary: 'Steel-manning counter-arguments, intellectual humility, and civil discourse.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'steelmanning-counter-arguments',
            title: 'The Socratic Method: Steelmanning Views You Disagree With',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'The highest marker of cognitive maturity is the ability to articulate an opposing perspective so accurately that your opponent agrees with your summary.',
            whatToSay: 'Before you criticize their opinion, explain their strongest argument back to me in your own words.',
            body: 'Teaching older teenagers civil debate without contempt immunizes them against polarization and equips them for leadership.',
          },
        ],
      },
      {
        slug: 'financial-architecture-compounding',
        title: 'Financial Architecture: Budgeting, Compounding & Strategic Thinking',
        summary: 'Compound interest, bank accounts, index funds, and avoiding debt traps.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'financial-compounding-foundations',
            title: 'Money as Leverage: Compound Interest and Financial Sovereignty',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Financial literacy acquired before age 18 shapes lifelong wealth generation. Understanding compound interest and budgeting transforms money from anxiety into leverage.',
            whatToSay: 'Every dollar you invest in an index fund at age 18 can grow by 30-fold by the time you retire. Time is your greatest asset.',
            body: 'Reviewing real bank statements, debit card mechanics, and Roth IRA compounding demystifies personal finance before leaving the nest.',
          },
        ],
      },
    ]
  ),

  // =========================================================================
  // CATEGORY 5: DIGITAL_AND_DEVICES (Screens & Device Sovereignty)
  // =========================================================================
  buildModule(
    'digital-infant-zero-screens',
    AcademyCategory.DIGITAL_AND_DEVICES,
    'Zero Screens Under 2 & Parent Tech Modeling',
    'Zero-screen rules, parental phubbing ("technoference"), and device-free sanctuaries.',
    DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    25,
    'https://assets.alongside.care/academy/digital-infant.png',
    [
      {
        slug: 'protecting-infant-retinas-zero-screens',
        title: 'Protecting Infant Retinal & Brain Development: The Zero-Screen Rule',
        summary: 'Why international pediatric guidelines mandate zero screens under age two.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'zero-screens-and-language-acquisition',
            title: 'Zero Screens Before Age 2: The Neuroscience of 3D Language Acquisition',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Infant phonetic discrimination depends on joint attention, physical lip movements, and 3D eye gaze. Fast-paced 2D video media suppresses verbal turn-taking and delays expressive vocabulary milestones.',
            whatToSay: 'Look at the big fluffy puppy! The puppy says woof woof! Do you see the puppy wagging its tail?',
            body: 'Pediatric bodies worldwide recommend zero screen media before 18 to 24 months. Infant eyes and brains require tactile physical interaction to map neural reality.',
          },
        ],
      },
      {
        slug: 'parental-phubbing-technoference',
        title: 'Parental Phubbing & "Technoference": Protecting Eye Contact',
        summary: 'How smartphone distraction interrupts crucial infant emotional bonding.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'parental-technoference-in-infancy',
            title: 'Technoference: Why Looking at Your Phone Disrupts Attachment',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'When a parent repeatedly breaks eye contact with an infant to check notifications, the infant’s autonomic heart rate variability drops, mimicking the Still Face Experiment distress.',
            whatToSay: 'I am putting my phone in the drawer so I can watch you play with full attention.',
            body: 'Babies constantly monitor caregiver faces for safety signals. Keeping feedings and diaper changes phone-free protects secure attachment.',
          },
        ],
      },
      {
        slug: 'device-free-sanctuaries-dining',
        title: 'Establishing Device-Free Sanctuaries in the Nursery and Dining Area',
        summary: 'Setting physical environmental rules for technology before devices enter the home.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'nursery-and-dining-sanctuaries',
            title: 'Sacred Spaces: Keeping Nurseries and High Chairs Screen-Free',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Establishing physical device-free zones in early infancy builds an enduring family culture that requires zero retroactive policing later in childhood.',
            whatToSay: 'Our dining table is for eating and laughing together. No screens belong here.',
            body: 'Using phones as distraction devices during toddler feeding numbs natural satiety signals. Establishing sanctuary zones safeguards healthy family habits.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'digital-preschool-media-curation',
    AcademyCategory.DIGITAL_AND_DEVICES,
    'Preschool Media Curation & Stopping Transitions',
    'Slow-tempo curation, co-viewing rituals, and visual timer transitions.',
    DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    26,
    'https://assets.alongside.care/academy/digital-preschool.png',
    [
      {
        slug: 'slow-tempo-vs-hyper-stimulating',
        title: 'Slow-Tempo vs Hyper-Stimulating Media: Preventing Tantrum Crashes',
        summary: 'Selecting low-stimulation, high-narrative programs to prevent behavioral crashes.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'scaffolded-offline-play-vs-fast-media',
            title: 'Slow-Tempo Curation: Choosing Low-Stimulation Shows',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'High-stimulation shows (loud sound effects, neon flashes, rapid scene cuts) trigger acute sensory overload. Slow-tempo media (Mr. Rogers, Daniel Tiger) maintains calm nervous systems.',
            whatToSay: 'We are going to watch one episode of Daniel Tiger together, and then we will turn off the TV and build with blocks.',
            body: 'Curating media by pace and tone eliminates 90% of the post-screen meltdowns that plague preschool households.',
          },
        ],
      },
      {
        slug: 'co-viewing-emotional-discussions',
        title: 'Co-Viewing Protocols: Discussing Emotions and Lessons in Shows',
        summary: 'Active mediation: sitting beside preschoolers and narrating social themes.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'co-viewing-conversations',
            title: 'Active Co-Viewing: Transforming Screen Time into Conversation',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'When parents watch alongside children and ask questions about characters’ feelings, children transfer social-emotional lessons to real-world peer interactions.',
            whatToSay: 'Look at Daniel Tiger’s face. How do you think he is feeling right now? What would help him feel better?',
            body: 'Co-viewing bridges the gap between passive viewing and active cognitive processing, making screen time relational rather than isolating.',
          },
        ],
      },
      {
        slug: 'visual-timer-peaceful-transitions',
        title: 'The Visual Timer & Transition Ritual: Turning Off Screens Peacefully',
        summary: 'Visual aids and physical countdowns that eliminate screen shutdown tantrums.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'visual-timer-transitions',
            title: 'The Visual Countdown: Ending Screen Time Without Shouting',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Preschoolers have no concept of "5 minutes left." A red visual timer externalizes time, removing the parent as the arbitrary bad guy when the show ends.',
            whatToSay: 'When the red disappears on the clock, the show says goodbye and we go wash our hands for lunch.',
            body: 'Externalizing time with visual hourglasses or countdown apps gives preschoolers the predictability their immature prefrontal cortex needs.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'digital-elementary-first-gaming',
    AcademyCategory.DIGITAL_AND_DEVICES,
    'First Gaming, Dopamine Loops & Readiness',
    'Roblox/Minecraft dopamine engines, smartphone readiness indicators, and open room rules.',
    DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    27,
    'https://assets.alongside.care/academy/digital-elementary.png',
    [
      {
        slug: 'dopamine-engine-roblox-minecraft',
        title: 'The Dopamine Engine of Roblox & Minecraft: Why Stopping Hurts',
        summary: 'Understanding variable reward schedules and in-game peer social pressure.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'early-impulse-centers-and-shared-media',
            title: 'Dopamine Loops in Gaming: Why Stepping Away Hurts',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Roblox and Minecraft employ variable-ratio dopamine reward loops identical to slot machines. Stepping away causes an acute neurochemical drop; give a 10-minute warning so they can save.',
            whatToSay: 'You are in the middle of a build. You have 10 minutes to reach a safe checkpoint and save your world.',
            body: 'Elementary kids are not trying to be disrespectful when called for dinner; their brains are locked in an intense dopamine loop that makes interrupting the game physically distressing.',
          },
        ],
      },
      {
        slug: 'first-phone-readiness-assessment',
        title: 'The First Phone Readiness Assessment: Assessing Impulse Control',
        summary: '10 objective behavioral criteria before purchasing a personal smartphone.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'first-phone-readiness-evaluation',
            title: 'Are They Ready? The 10-Point Smartphone Readiness Audit',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Readiness for a smartphone is not determined by chronological age, but by demonstrated impulse control, ability to wake up without a phone, and honesty about digital mistakes.',
            whatToSay: 'A smartphone is not a toy; it is an open portal to the entire world. Let us look at the readiness checklist together.',
            body: 'Using our standardized Readiness Assessment (Score 0-100) grounds the decision in objective milestones rather than peer pressure.',
          },
        ],
      },
      {
        slug: 'open-living-room-screen-rule',
        title: 'The Open Living Room Rule: Transparent, Shared Screen Spaces',
        summary: 'Why elementary media belongs in public family spaces, never closed bedrooms.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'shared-screens-scaffolding',
            title: 'The Public Square Rule: Keeping Gaming in Shared Family Spaces',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Keeping gaming consoles and computers in shared living areas provides natural protective accountability without invasive spyware or secret policing.',
            whatToSay: 'In our home, gaming happens in the living room so we can all see the cool stuff you are playing.',
            body: 'Open living room spaces normalize transparent digital behavior and protect children from predatory chat interactions in private rooms.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'digital-tween-smartphone-pacts',
    AcademyCategory.DIGITAL_AND_DEVICES,
    'Tween Smartphone Transition & Family Pacts',
    'Group chat anxiety, drafting bilateral agreements, and the neutral 8:30 PM bed dock.',
    DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    28,
    'https://assets.alongside.care/academy/digital-tween.png',
    [
      {
        slug: 'group-chats-silent-exclusion',
        title: 'Group Chats, Silent Exclusion & The Agony of Unread Messages',
        summary: 'Guiding pre-teens through read receipts, ghosting, and digital peer dynamics.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'tween-neurobiology-and-adrenarche',
            title: 'The Read Receipt Panic: Navigating Tween Chat Dynamics',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Unanswered group chat messages trigger social threat responses in the tween brain. Teaching them to step away from notifications preserves mental health.',
            whatToSay: 'Just because someone read your message and did not reply immediately does not mean they hate you. Put the phone down and let us take the dog for a walk.',
            body: 'Group chats are the biggest source of tween drama. Teaching them that messages do not require an instant 30-second response restores peace.',
          },
        ],
      },
      {
        slug: 'drafting-bilateral-family-pact',
        title: 'Drafting the Bilateral Family Pact: Collaborative Rules & Signatures',
        summary: 'Co-creating family tech agreements with digital canvas signatures.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'drafting-bilateral-pacts',
            title: 'The Bilateral Pact: Creating Rules Together, Not Imposing Them',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Contracts signed collaboratively with child input have a 300% higher adherence rate than rules unilaterally imposed by parents. Mutual commitments foster mutual respect.',
            whatToSay: 'This pact is not just rules for you; it includes commitments from me too, like putting my phone away during dinner.',
            body: 'Our Bilateral Family Pact wizard empowers tweens to take ownership of screen boundaries and establish mutual expectations.',
          },
        ],
      },
      {
        slug: 'refrigerator-dock-protecting-sleep',
        title: 'The Neutral 8:30 PM Refrigerator Basket Dock: Protecting Circadian Sleep',
        summary: 'Hardware-enforced bedtime docking that eliminates nighttime screen temptation.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'refrigerator-dock-ritual',
            title: 'The Refrigerator Basket: Neutral Hardware Night Docks',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Relying on tween willpower to ignore 11:00 PM Snapchat pings is unrealistic. A physical charging station outside bedrooms removes the biological temptation entirely.',
            whatToSay: 'It is 8:30 PM! Time for all phones—yours and mine—to go into the kitchen basket to sleep.',
            body: 'When parents also dock their own phones in the communal basket, bedtime docking feels like a shared family ritual rather than a punitive restriction.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'digital-adolescent-algorithmic-feeds',
    AcademyCategory.DIGITAL_AND_DEVICES,
    'Adolescent Algorithmic Feeds & Digital Reputation',
    'Algorithmic rabbit holes, screenshot permanence, and building trust after breach.',
    DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    29,
    'https://assets.alongside.care/academy/digital-adolescent.png',
    [
      {
        slug: 'algorithmic-rabbit-holes-fatigue',
        title: 'Algorithmic Rabbit Holes: How Feeds Exploit Fatigued Brains',
        summary: 'Understanding infinite scroll dopamine architectures and late-night feed traps.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'algorithmic-rabbit-holes',
            title: 'Infinite Scroll: How Algorithms Exploit Fatigued Adolescent Brains',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Late at night, when prefrontal inhibition is fatigued, recommendation algorithms serve increasingly extreme or anxiety-inducing content to maximize engagement.',
            whatToSay: 'Notice how the app keeps refreshing new videos right when you are tired? That is designed to trap you. Let us close it down together.',
            body: 'Helping teenagers recognize when an algorithm is feeding off their fatigue enables them to step back before spiraling into doomscrolling.',
          },
        ],
      },
      {
        slug: 'digital-permanence-impulse-reflection',
        title: 'Digital Permanence, Screenshots & Impulse Reflection Before Sending',
        summary: 'Teaching the "Front Page Rule" before hitting send on controversial media.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'digital-reputation-and-permanence',
            title: 'The 10-Second Pause: Digital Permanence and Screenshot Culture',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'Anything transmitted digitally can be screenshotted and weaponized. The 10-second reflection pause prevents impulsive, reputational catastrophes.',
            whatToSay: 'Before you send that meme or photo, ask yourself: would you be comfortable if this was posted on the school auditorium screen?',
            body: 'Disappearing messaging apps create a false illusion of privacy. Teaching teens that screenshots bypass all disappearing timers protects their future.',
          },
        ],
      },
      {
        slug: 'moving-from-spyware-to-trust',
        title: 'Moving From Spyware to Trust: Non-Punitive Repair After Breach',
        summary: 'Transitioning away from invasive surveillance apps toward collaborative trust.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'from-surveillance-to-covenant',
            title: 'Moving Beyond Spyware: Building Trust Over Surveillance',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Secret keystroke loggers and spyware destroy parent-teen trust and teach teens how to build burner accounts. Transparent boundaries and open dialogue foster real safety.',
            whatToSay: 'I do not want to spy on your private chats. I want to build enough trust that you will come to me if something sketchy happens.',
            body: 'When teens know their parents will not overreact or immediately seize their device, they are far more likely to seek help when facing online harassment.',
          },
        ],
      },
    ]
  ),

  buildModule(
    'digital-teen-digital-independence',
    AcademyCategory.DIGITAL_AND_DEVICES,
    'Teen Digital Independence & Young Adult Covenant',
    'Full digital sovereignty, cyber defense against scams, and respectful bilateral privacy.',
    DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    30,
    'https://assets.alongside.care/academy/digital-late-teen.png',
    [
      {
        slug: 'full-digital-sovereignty-limits',
        title: 'Transitioning to Full Digital Sovereignty: Self-Regulated Screen Limits',
        summary: 'Handing over the keys to screen management before leaving for college.',
        priority: ChapterPriority.PRIORITY_1_CRITICAL,
        sortOrder: 1,
        lessons: [
          {
            slug: 'digital-sovereignty-transition',
            title: 'Self-Regulated Limits: The Handoff to Digital Sovereignty',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'If a teenager reaches 18 with parental controls locking their device, they will binge on unchecked screen time when they arrive at college. The handoff must happen at 17.',
            whatToSay: 'You are in charge of setting your own screen time limits now. How are you planning to protect your sleep during finals week?',
            body: 'Gradually disabling parental screen time restrictions while encouraging self-monitoring allows older teens to develop genuine digital impulse control.',
          },
        ],
      },
      {
        slug: 'cyber-safety-scams-sextortion-prevention',
        title: 'Cyber Safety: Phishing, Sextortion Scams & Identity Protection',
        summary: 'Protecting older teens from organized sextortion rings and financial phishing.',
        priority: ChapterPriority.PRIORITY_2_ROUTINES,
        sortOrder: 2,
        lessons: [
          {
            slug: 'cyber-safety-and-scam-defense',
            title: 'Sextortion Scams & Financial Fraud: The High-Stakes Defense',
            readingMinutes: 5,
            sortOrder: 1,
            clinicalInsight: 'Organized overseas cyber-rings specifically target older teens on Instagram and Discord with fast sextortion scripts. Unconditional parental support prevents tragic outcomes.',
            whatToSay: 'If anyone ever threatens you with a photo or demands money online, come to me immediately. You will never be in trouble with me. We will handle it together.',
            body: 'Cyber extortion is an urgent crisis affecting high school students. Breaking the silence and providing an absolute safe harbor saves lives.',
          },
        ],
      },
      {
        slug: 'young-adult-covenant-privacy',
        title: 'The Bilateral Young Adult Covenant: Respecting Privacy & Independence',
        summary: 'The final covenant transition honoring mature privacy while maintaining family connection.',
        priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
        sortOrder: 3,
        lessons: [
          {
            slug: 'young-adult-covenant',
            title: 'The Young Adult Covenant: Respecting Privacy While Staying Anchored',
            readingMinutes: 4,
            sortOrder: 1,
            clinicalInsight: 'A relationship founded on mutual respect, periodic check-ins, and unconditional love endures through adulthood far better than any surveillance tool.',
            whatToSay: 'You have grown into an incredible, thoughtful adult. I respect your privacy, and I will always be here when you need advice.',
            body: 'Sealing the digital journey with a Bilateral Young Adult Covenant celebrates the successful transition from dependent child to sovereign young adult.',
          },
        ],
      },
    ]
  ),
];

export async function seedAcademy(prisma: PrismaClient): Promise<void> {
  console.log('--- Seeding Parent Intelligence Academy (Prioritized Chapters & Categories) ---');

  for (const moduleData of ACADEMY_SEED_MODULES) {
    const { chapters, lessons, ...moduleFields } = moduleData;

    const moduleRecord = await prisma.academyModule.upsert({
      where: { slug: moduleFields.slug },
      update: {
        category: moduleFields.category,
        title: moduleFields.title,
        summary: moduleFields.summary,
        coverImageUrl: moduleFields.coverImageUrl,
        developmentalTier: moduleFields.developmentalTier,
        sortOrder: moduleFields.sortOrder,
      },
      create: {
        slug: moduleFields.slug,
        category: moduleFields.category,
        title: moduleFields.title,
        summary: moduleFields.summary,
        coverImageUrl: moduleFields.coverImageUrl,
        developmentalTier: moduleFields.developmentalTier,
        sortOrder: moduleFields.sortOrder,
      },
    });

    for (const chapter of chapters) {
      const chapterRecord = await prisma.academyChapter.upsert({
        where: {
          moduleId_slug: {
            moduleId: moduleRecord.id,
            slug: chapter.slug,
          },
        },
        update: {
          title: chapter.title,
          summary: chapter.summary,
          priority: chapter.priority,
          sortOrder: chapter.sortOrder,
        },
        create: {
          moduleId: moduleRecord.id,
          slug: chapter.slug,
          title: chapter.title,
          summary: chapter.summary,
          priority: chapter.priority,
          sortOrder: chapter.sortOrder,
        },
      });

      for (const lesson of chapter.lessons) {
        await prisma.academyLesson.upsert({
          where: {
            moduleId_slug: {
              moduleId: moduleRecord.id,
              slug: lesson.slug,
            },
          },
          update: {
            chapterId: chapterRecord.id,
            title: lesson.title,
            contentMarkdown: lesson.contentMarkdown,
            readingMinutes: lesson.readingMinutes,
            sortOrder: lesson.sortOrder,
          },
          create: {
            moduleId: moduleRecord.id,
            chapterId: chapterRecord.id,
            slug: lesson.slug,
            title: lesson.title,
            contentMarkdown: lesson.contentMarkdown,
            readingMinutes: lesson.readingMinutes,
            sortOrder: lesson.sortOrder,
          },
        });
      }
    }
  }

  console.log(
    `[Seed] Successfully seeded ${ACADEMY_SEED_MODULES.length} Academy modules across all 5 categories & 6 lifespan tiers.`
  );
}
