import {
  AcademyCategory,
  DevelopmentalTier,
  ChapterPriority,
  type AcademyCategoryStatsDTO,
  type AcademyModuleDTO,
  type AcademyModuleDetailDTO,
  type AcademyChapterDTO,
  type AcademyLessonDTO,
} from '@alongside/shared';

/**
 * Canonical Academy Category Metadata and Fallback Stats
 */
export const MOCK_ACADEMY_CATEGORIES: AcademyCategoryStatsDTO[] = [
  {
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    title: 'Behavior & Emotional Co-Regulation',
    description: 'Amygdala meltdowns, emotional scaffolding, and calm de-escalation scripts.',
    moduleCount: 6,
    lessonCount: 36,
  },
  {
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    title: 'Pediatric Health & Sleep',
    description: 'Circadian biology, restorative sleep architecture, and soothing routines.',
    moduleCount: 6,
    lessonCount: 36,
  },
  {
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    title: 'Nutrition & Feeding Habits',
    description: 'Division of responsibility, sensory texture aversions, and growth fueling.',
    moduleCount: 6,
    lessonCount: 36,
  },
  {
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    title: 'Development & Purposeful Play',
    description: 'Executive function, flow state hobbies, and screen-free cognitive play.',
    moduleCount: 6,
    lessonCount: 36,
  },
  {
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    title: 'Modern Digital World & Pacts',
    description: 'Screen agreements, dopamine loops, device curfews, and bilateral trust.',
    moduleCount: 6,
    lessonCount: 36,
  },
];

/**
 * Sample Academy Modules across all 5 Categories
 */
export const MOCK_ACADEMY_MODULES: AcademyModuleDTO[] = [
  {
    id: 'mod-behavior-tween',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    slug: 'behavior-tween-adrenarche',
    title: 'Tween Adrenarche & Emotional Volatility',
    summary: 'The biological awakening to peer status, adrenal shifts, and the 3-step empathetic reset for snark and eye-rolls.',
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    coverImageUrl: null,
    sortOrder: 1,
    lessonCount: 6,
    completedLessonCount: 2,
    isCompleted: false,
  },
  {
    id: 'mod-health-tween',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    slug: 'health-tween-circadian-leaps',
    title: 'Pubertal Physical Leaps & Circadian Delays',
    summary: 'The 1.5-hour melatonin shift, sleep window defense, and managing pubertal body changes with calm authority.',
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    coverImageUrl: null,
    sortOrder: 2,
    lessonCount: 6,
    completedLessonCount: 0,
    isCompleted: false,
  },
  {
    id: 'mod-nutrition-tween',
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    slug: 'nutrition-tween-growth-spurts',
    title: 'Pre-Teen Growth Spurts & Food Relationship',
    summary: 'Fueling pre-pubertal bone density, positive body image conversations, and navigating social snacking.',
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    coverImageUrl: null,
    sortOrder: 3,
    lessonCount: 6,
    completedLessonCount: 0,
    isCompleted: false,
  },
  {
    id: 'mod-play-tween',
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    slug: 'play-tween-flow-hobbies',
    title: 'Pre-Teen Focus, Flow State & Deep Hobbies',
    summary: 'Protecting uninterrupted offline flow states, metacognitive study rituals, and digital creation over consumption.',
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    coverImageUrl: null,
    sortOrder: 4,
    lessonCount: 6,
    completedLessonCount: 0,
    isCompleted: false,
  },
  {
    id: 'mod-digital-tween',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    slug: 'digital-tween-smartphone-pacts',
    title: 'Tween Smartphone Transition & Family Pacts',
    summary: 'Silent group chat exclusion, bilateral agreement co-creation, and the neutral 8:30 PM bed dock.',
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    coverImageUrl: null,
    sortOrder: 5,
    lessonCount: 6,
    completedLessonCount: 3,
    isCompleted: false,
  },
  // Explorer (Ages 7-9)
  {
    id: 'mod-behavior-elementary',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    slug: 'behavior-elementary-impulses',
    title: 'Elementary Impulse Control & Sibling Dynamics',
    summary: 'De-escalating post-play dopamine crashes and moving from judge to mediator in sibling conflicts.',
    developmentalTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    coverImageUrl: null,
    sortOrder: 1,
    lessonCount: 6,
    completedLessonCount: 0,
    isCompleted: false,
  },
  // Early Childhood (Ages 4-6)
  {
    id: 'mod-behavior-preschool',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    slug: 'behavior-preschool-feelings',
    title: 'Preschool Big Feelings & Theory of Mind',
    summary: 'Why 4-year-olds struggle to share, peaceful bedtime anchors, and limit setting without shame.',
    developmentalTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    coverImageUrl: null,
    sortOrder: 1,
    lessonCount: 6,
    completedLessonCount: 0,
    isCompleted: false,
  },
  // Infancy & Early Childhood (Decomposed Tiers 0A, 0B, 0C & Legacy Tier 0)
  {
    id: 'mod-behavior-infant',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    slug: 'behavior-infant-coregulation',
    title: 'Sensory Overload & Infant Co-Regulation',
    summary: 'Decoding the immature amygdala, the HALT diagnostic, and pre-verbal secure attachment rituals.',
    reliefSubtitle: 'Somatic soothing, fourth-trimester attunement, and ending pre-verbal crying spirals.',
    tonightQuickWinTitle: 'The 5-Minute Somatic Chest Attunement Hold',
    developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    coverImageUrl: null,
    sortOrder: 1,
    lessonCount: 4,
    completedLessonCount: 0,
    isCompleted: false,
  },
  {
    id: 'mod-health-infant',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    slug: 'health-infant-sleep-foundations',
    title: 'Infant Sleep Architecture & Circadian Rhythm',
    summary: 'Biological wake windows (45-90 min), surviving the 4-month regression, and safe infant sleep habits.',
    reliefSubtitle: 'Restoring parental rest without rigid extinction sleep training.',
    tonightQuickWinTitle: "Tonight's 45-Minute Wake Window Reset Protocol",
    developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    coverImageUrl: null,
    sortOrder: 2,
    lessonCount: 4,
    completedLessonCount: 0,
    isCompleted: false,
  },
  {
    id: 'mod-nutrition-infant',
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    slug: 'nutrition-infant-milk-and-allergens',
    title: 'Infant Feeding & Allergen Introduction Window',
    summary: 'Exclusive milk pacing, responsive feeding cues, and the 4-6 month early allergen exposure protocol.',
    reliefSubtitle: 'Evidence-based allergen defense without choking anxiety.',
    tonightQuickWinTitle: 'The Single-Antigen Micro-Taste Protocol',
    developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    coverImageUrl: null,
    sortOrder: 3,
    lessonCount: 4,
    completedLessonCount: 0,
    isCompleted: false,
  },
  {
    id: 'mod-behavior-toddler-0b',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    slug: 'behavior-toddler-amygdala-overflow',
    title: 'Younger Toddler Tantrums & Limbic Overflow',
    summary: 'Why toddlers hit and bite under frustration, the adult as external nervous system, and physical containment.',
    reliefSubtitle: 'Co-regulating intense physical tantrums without yelling or isolation.',
    tonightQuickWinTitle: 'The Neutral Calm-Basket Physical Containment Hold',
    developmentalTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
    coverImageUrl: null,
    sortOrder: 1,
    lessonCount: 4,
    completedLessonCount: 0,
    isCompleted: false,
  },
  {
    id: 'mod-play-toddler-0b',
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    slug: 'play-toddler-locomotor-exploration',
    title: 'Younger Toddler Locomotion & Spatial Play',
    summary: 'Fine and gross motor coordination, warm water tactile play, and safe exploratory home boundaries.',
    reliefSubtitle: 'Channeling boundless physical momentum into focused sensory play.',
    tonightQuickWinTitle: 'Living Room Obstacle Course & Heavy Work Routine',
    developmentalTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
    coverImageUrl: null,
    sortOrder: 2,
    lessonCount: 4,
    completedLessonCount: 0,
    isCompleted: false,
  },
  {
    id: 'mod-behavior-older-toddler-0c',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    slug: 'behavior-older-toddler-autonomy',
    title: 'Older Toddler Autonomy & Willful Boundary Testing',
    summary: "Erikson's autonomy versus shame, loving firm boundaries without anger, and grocery store tantrums.",
    reliefSubtitle: 'Honoring willful independence while upholding immovable safety laws.',
    tonightQuickWinTitle: 'The Binary Choice Boundary Offering',
    developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    coverImageUrl: null,
    sortOrder: 1,
    lessonCount: 4,
    completedLessonCount: 0,
    isCompleted: false,
  },
];

/**
 * Sample Prioritized Chapters for Tween Behavior Module
 */
export const MOCK_TWEEN_BEHAVIOR_CHAPTERS: AcademyChapterDTO[] = [
  {
    id: 'ch-tween-p1',
    moduleId: 'mod-behavior-tween',
    slug: 'adrenarche-and-mood-friction',
    title: 'Chapter 1: The Adrenarche Biological Shift',
    summary: 'Start here for acute friction and core neurobiology. Understanding the hormonal surge driving sudden mood swings and hypersensitivity.',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
    sortOrder: 1,
    lessonCount: 2,
    completedLessonCount: 2,
    isCompleted: true,
    lessons: [
      {
        id: 'les-tween-adrenarche-bio',
        moduleId: 'mod-behavior-tween',
        chapterId: 'ch-tween-p1',
        slug: 'adrenarche-neurobiology',
        title: 'Adrenarche: The Biological Awakening to Peer Status',
        readingMinutes: 4,
        sortOrder: 1,
        isCompleted: true,
      },
      {
        id: 'les-tween-meltdown-reset',
        moduleId: 'mod-behavior-tween',
        chapterId: 'ch-tween-p1',
        slug: 'de-escalating-amygdala-spikes',
        title: 'De-escalating Amygdala Spikes: The 3-Step Pause',
        readingMinutes: 5,
        sortOrder: 2,
        isCompleted: true,
      },
    ],
  },
  {
    id: 'ch-tween-p2',
    moduleId: 'mod-behavior-tween',
    slug: 'daily-co-regulation-and-snark',
    title: 'Chapter 2: Daily Routines & Snark Reset',
    summary: 'Daily habits and preventative rituals. Transforming eye-rolls, sarcastic comebacks, and dinner table friction into calm connection.',
    priority: ChapterPriority.PRIORITY_2_ROUTINES,
    sortOrder: 2,
    lessonCount: 2,
    completedLessonCount: 0,
    isCompleted: false,
    lessons: [
      {
        id: 'les-tween-snark-protocol',
        moduleId: 'mod-behavior-tween',
        chapterId: 'ch-tween-p2',
        slug: 'neutralizing-eye-rolls-and-snark',
        title: 'Neutralizing Eye-Rolls: The Non-Defensive Dialogue',
        readingMinutes: 4,
        sortOrder: 3,
        isCompleted: false,
      },
      {
        id: 'les-tween-evening-decompression',
        moduleId: 'mod-behavior-tween',
        chapterId: 'ch-tween-p2',
        slug: 'post-school-decompression-ritual',
        title: 'The Post-School Decompression Sanctuary',
        readingMinutes: 3,
        sortOrder: 4,
        isCompleted: false,
      },
    ],
  },
  {
    id: 'ch-tween-p3',
    moduleId: 'mod-behavior-tween',
    slug: 'peer-fomo-and-social-resilience',
    title: 'Chapter 3: Social Scaffolding & Group Chat Friction',
    summary: 'Long-term emotional intelligence and transitions. Equipping pre-teens to handle silent group chat exclusion and FOMO with quiet dignity.',
    priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
    sortOrder: 3,
    lessonCount: 2,
    completedLessonCount: 0,
    isCompleted: false,
    lessons: [
      {
        id: 'les-tween-group-chat-exclusion',
        moduleId: 'mod-behavior-tween',
        chapterId: 'ch-tween-p3',
        slug: 'silent-group-chat-exclusion',
        title: 'Group Chat Friction & The Agony of Unread Messages',
        readingMinutes: 5,
        sortOrder: 5,
        isCompleted: false,
      },
      {
        id: 'les-tween-repair-protocol',
        moduleId: 'mod-behavior-tween',
        chapterId: 'ch-tween-p3',
        slug: 'non-punitive-repair-blueprint',
        title: 'The Non-Punitive Relational Repair Blueprint',
        readingMinutes: 4,
        sortOrder: 6,
        isCompleted: false,
      },
    ],
  },
];

/**
 * Detailed Sample Module with Chapters
 */
export const MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR: AcademyModuleDetailDTO = {
  ...MOCK_ACADEMY_MODULES[0]!,
  chapters: MOCK_TWEEN_BEHAVIOR_CHAPTERS,
  lessons: MOCK_TWEEN_BEHAVIOR_CHAPTERS.flatMap((c) => c.lessons),
};

/**
 * Detailed Sample Lesson with Developmental Insight and "What to Say"
 */
export const MOCK_LESSON_DETAIL_ADRENARCHE: AcademyLessonDTO = {
  id: 'les-tween-adrenarche-bio',
  moduleId: 'mod-behavior-tween',
  chapterId: 'ch-tween-p1',
  slug: 'adrenarche-neurobiology',
  title: 'Adrenarche: The Biological Awakening to Peer Status',
  readingMinutes: 4,
  sortOrder: 1,
  isCompleted: true,
  contentMarkdown: `Around ages 9 to 11, long before visible pubertal changes occur, the adrenal glands awaken in a biological event known as **adrenarche**. This chemical surge releases DHEA and adrenal androgens, fundamentally rewiring how your child interprets their social standing.

> **Developmental Insight:** During adrenarche, the amygdala and striatum develop heightened sensitivity to social evaluation. A minor remark like "Please finish your homework" can be perceived by the tween brain not as parental guidance, but as a public threat to their emerging autonomy and status.

### Why Logic Fails During an Adrenarche Meltdown

When a pre-teen feels criticized or misunderstood, their prefrontal cortex temporarily goes offline. Trying to reason, debate facts, or scold them for an exaggerated reaction only escalates the autonomic fight-or-flight response.

**What to Say:** "I can see this feels completely overwhelming right now. You don't have to explain it or fix it this second. I'm right here with you, and we'll figure it out together when you're ready."

### Practical Action Protocol
- [ ] Take a 10-second physiological sigh (two short inhales through the nose, one long exhale through the mouth) before responding to snark.
- [ ] Match physical posture: Drop your eye level below theirs to signal non-threat.
- [ ] Postpone the boundary conversation until the emotional storm passes (usually 20–30 minutes).`,
  module: {
    id: 'mod-behavior-tween',
    slug: 'behavior-tween-adrenarche',
    title: 'Tween Adrenarche & Emotional Volatility',
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
  },
  chapter: {
    id: 'ch-tween-p1',
    slug: 'adrenarche-and-mood-friction',
    title: 'Chapter 1: The Adrenarche Biological Shift',
    priority: ChapterPriority.PRIORITY_1_CRITICAL,
  },
};
