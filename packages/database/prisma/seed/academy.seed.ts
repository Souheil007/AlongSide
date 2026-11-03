import type { PrismaClient } from '@prisma/client';
import { DevelopmentalTier } from '@alongside/shared';

export interface AcademyLessonSeedData {
  slug: string;
  title: string;
  contentMarkdown: string;
  readingMinutes: number;
  sortOrder: number;
}

export interface AcademyModuleSeedData {
  slug: string;
  title: string;
  summary: string;
  coverImageUrl?: string | null;
  developmentalTier: DevelopmentalTier;
  sortOrder: number;
  lessons: AcademyLessonSeedData[];
}

export const ACADEMY_SEED_MODULES: AcademyModuleSeedData[] = [
  {
    slug: 'early-impulse-centers-and-shared-media',
    title: 'Early Impulse Centers: The Developing Prefrontal Cortex & Shared Media',
    summary:
      'Understand how the 8-9 year old brain processes immediate digital reward before inhibitory control is fully wired.',
    coverImageUrl: 'https://assets.alongside.care/academy/tier1-cover.png',
    developmentalTier: DevelopmentalTier.TIER_1_AGES_8_9,
    sortOrder: 1,
    lessons: [
      {
        slug: 'dopamine-loops-and-curiosity',
        title: 'The Dopamine Loop: Why Stopping Gameplay Causes Meltdowns',
        readingMinutes: 4,
        sortOrder: 1,
        contentMarkdown: `### The Neurobiology of the "Five More Minutes" Screaming Match

When your 8-year-old throws a tantrum because Minecraft or Roblox was shut down, your intuitive reaction as a parent might be to perceive defiance, disrespect, or screen addiction.

However, developmental neurobiology reveals a different story: **The dopamine crash**.

At ages 8 and 9, the ventral striatum (the brain's reward prediction center) is already highly responsive to rapid sensory reward loops. Meanwhile, the prefrontal cortex—which governs impulse control, cognitive flexibility, and emotional modulation—will not reach functional maturity until the mid-twenties.

\`\`\`
Digital Stimulus (High Reward) ──> Sudden Screen Shutoff ──> Acute Dopamine Deficit ──> Amygdala Fight/Flight Reaction
\`\`\`

#### Clinical Action Steps:
1. **Never yank the device mid-loop:** Announce transitions before the round starts, not during an active match.
2. **The 3-Minute Sensory Landing Bridge:** Sit beside your child for the final 3 minutes. Ask: *"What are you building here?"* This shifts neurological activity from reactive striatal arousal to reflective conversational circuits before shutdown.
3. **Physical Handoff Ritual:** Have the child press the physical power button and place the device into the docking cradle themselves. Physical agency reduces feelings of arbitrary parental confiscation.`,
      },
      {
        slug: 'shared-screens-scaffolding',
        title: 'Co-Viewing & The Scaffolded Experience',
        readingMinutes: 4,
        sortOrder: 2,
        contentMarkdown: `### From Surveillance to Side-by-Side Co-Regulation

Passive screen isolation creates blind spots. But hover monitoring breeds resentment. The most effective bridge for 8-9 year olds is **scaffolded co-viewing**.

Vygotsky's *Zone of Proximal Development* teaches that executive habits are borrowed before they are owned. When a parent sits beside a child during media consumption:
- You observe emotional reactivity in real time.
- You provide an external prefrontal cortex to process fast-paced or ambiguous video content.

#### Practical Co-Viewing Blueprint:
- **Curiosity Over Interrogation:** Replace *"What garbage are you watching?"* with *"Walk me through how this creator solved that level."*
- **Decode Advertising & Micro-transactions:** Point out promotional banners, loot boxes, and countdown timers. Ask: *"Why do you think the game developers made that button bright red and pulsing?"*`,
      },
      {
        slug: 'first-boundaries-without-shame',
        title: 'Setting Digital Boundaries Without Triggering Shame',
        readingMinutes: 4,
        sortOrder: 3,
        contentMarkdown: `### Framing Boundaries Around Body Needs, Not Character Deficits

When tech limits are delivered as punishment (*"You've been on that screen all morning, you're lazy!"*), children internalize shame and learn stealth habits.

By anchoring boundaries in **objective biological needs**, you remove moral judgment:

#### The Neutral Biological Script:
> *"Your brain needs three things every day to grow strong: daylight, physical movement, and deep uninterrupted sleep. When tablet time cuts into sleep or outdoor play, we adjust the timer to protect your body."*

#### Core Practice:
- Involve your child in setting the kitchen timer.
- Establish device-free physical zones: dining table, bathroom, and car rides under 20 minutes.`,
      },
    ],
  },
  {
    slug: 'tween-neurobiology-and-adrenarche',
    title: 'The Tween Brain: Adrenarche, Social Dopamine & The Peer Shift',
    summary:
      'Understand why peer approval suddenly eclipses family connection at ages 10-11 and how to protect sleep while honoring social connection.',
    coverImageUrl: 'https://assets.alongside.care/academy/tier2-cover.png',
    developmentalTier: DevelopmentalTier.TIER_2_AGES_10_11,
    sortOrder: 2,
    lessons: [
      {
        slug: 'adrenarche-and-identity',
        title: 'Adrenarche: The Biological Awakening to Social Standing',
        readingMinutes: 5,
        sortOrder: 1,
        contentMarkdown: `### The Hidden Puberty Before Puberty

Around ages 9 to 11, long before outward signs of puberty appear, the adrenal glands begin secreting DHEA and related androgens in a process called **adrenarche**.

Adrenarche re-wires the tween brain's social motivation circuitry:
- Sensitivity to peer evaluation jumps exponentially.
- Social exclusion registers in the anterior cingulate cortex—the exact neural region that processes physical pain.
- When your tween urgently demands a smartphone *"because everyone else has one,"* they are responding to genuine evolutionary panic regarding tribe inclusion.

#### The Alongside Empathetic Response:
Acknowledge the biological reality before stating the boundary:
> *"I hear how important it is to feel included in what your friends are doing. You are not weird or wrong for wanting to be in the loop. Let's find ways to keep you connected while keeping you safe."*`,
      },
      {
        slug: 'group-chats-fomo',
        title: 'Group Chats, Disappearing Messages & Silent Exclusion',
        readingMinutes: 5,
        sortOrder: 2,
        contentMarkdown: `### The Unregulated Class Group Chat

The single highest source of anxiety for 10-11 year olds is not public social media, but **private group messaging threads** (Messages, WhatsApp, Discord, or game chat).

#### Common Pain Points:
1. **The 500-Notification Tsunami:** Leaving the phone for sports practice and returning to 400 unread messages triggers intense FOMO (Fear Of Missing Out).
2. **Subtle Exclusion:** Groups created without one friend, or naming chats with inside jokes.
3. **Ephemeral Illusions:** Kids mistakenly assume photos or insults sent in vanishing chats cannot be saved or forwarded.

#### Protective Protocol:
- **The "Billboard Rule":** If you wouldn't display a message on a billboard outside the school front entrance, don't send it in a group chat.
- **The Emergency Exit Hatch:** Teach your tween how to mute group chats without leaving, and agree on a safe codeword (*"Soccer"* or *"Dentist"*) they can text you to give them an honorable excuse to disconnect.`,
      },
      {
        slug: 'calm-tech-conversations',
        title: 'De-escalating Screen Friction: The 3-Step Empathetic Reset',
        readingMinutes: 4,
        sortOrder: 3,
        contentMarkdown: `### The 3-Step Empathetic Reset

When friction erupts over device usage, high emotional arousal temporarily shuts down both parent and child logic centers.

Follow the **3-Step Empathetic Reset**:

1. **Validate Before You Regulate:**
   - Say: *"I can see you were right in the middle of talking with Maya, and closing the app right now feels intensely frustrating."*
2. **Take the 10-Minute Biological Pause:**
   - When heart rates exceed 100 bpm, cognitive compromise occurs. Step away: *"Let's both take 10 minutes to reset, and then we will look at our family pact together."*
3. **Anchor to the Bilateral Agreement:**
   - Point to the signed agreement on the refrigerator: *"We both signed our 8:30 PM curfew rule. The dock is waiting."*`,
      },
    ],
  },
  {
    slug: 'pubertal-circadian-delay-and-sleep',
    title: 'Pubertal Circadian Delay & The Neutral Bedtime Dock',
    summary:
      'Explore the biological 2-hour sleep phase shift in puberty and why physical device separation prevents chronic sleep deprivation.',
    coverImageUrl: 'https://assets.alongside.care/academy/tier3-cover.png',
    developmentalTier: DevelopmentalTier.TIER_3_AGES_12_13,
    sortOrder: 3,
    lessons: [
      {
        slug: 'the-biological-clock-shift',
        title: 'The 2-Hour Melatonin Shift: Why They Can\'t Sleep at 9:00 PM',
        readingMinutes: 5,
        sortOrder: 1,
        contentMarkdown: `### The Chronobiology of the Teen Sleep Shift

During pubertal transition (ages 12-13), the suprachiasmatic nucleus delays the evening release of melatonin by approximately **two full hours**.

A 13-year-old asked to fall asleep at 9:30 PM is biologically equivalent to an adult being forced to sleep at 7:30 PM.

#### The Device Compounding Effect:
When a teen lies in bed wide awake, reaching for a glowing smartphone is almost irresistible. The blue-wavelength light directly suppresses what little melatonin has accumulated, while social media notifications trigger norepinephrine spikes, delaying sleep onset until 1:00 AM or later.

#### Key Takeaway:
Their inability to sleep is biological, but keeping a phone in the bedroom turns a normal circadian delay into catastrophic sleep deprivation.`,
      },
      {
        slug: 'bedroom-sanctuary-rule',
        title: 'The Refrigerator Basket: Making the 8:30 PM Curfew Neutral',
        readingMinutes: 4,
        sortOrder: 2,
        contentMarkdown: `### The Neutral Enforcement Basket

The greatest point of evening household conflict is device confiscation in the bedroom.

#### Why the Refrigerator Basket Works:
1. **Universal Family Dock:** All devices—including parents' work phones and iPads—dock in the central kitchen basket at the agreed curfew time (e.g. 8:30 PM).
2. **Zero In-Bedroom Temptation:** If the device is not physically inside the bedroom, the executive burden of resisting late-night buzzing is eliminated.
3. **An Old-Fashioned Alarm Clock:** Buy a simple $10 digital or analog alarm clock for the bedside table so *"I need my phone for the alarm"* is completely eliminated as an excuse.`,
      },
      {
        slug: 'algorithmic-rabbit-holes',
        title: 'Algorithmic Feeds: How Late-Night Scroll Hooks the Tired Brain',
        readingMinutes: 5,
        sortOrder: 3,
        contentMarkdown: `### Infinite Scrolls & Variable Ratio Schedules

Short-form algorithmic video feeds (TikTok, Reels, Shorts) utilize B.F. Skinner's **variable ratio reinforcement schedule**—the exact psychological mechanism underpinning casino slot machines.

When the adolescent brain is fatigued late in the evening:
- Frontal lobe inhibition drops significantly.
- The next swipe promise (*"maybe this next video is hilarious"*) triggers steady anticipatory dopamine.
- Autoplay algorithms remove all natural stopping cues (chapters, endings, credits).

#### Family Strategic Defense:
- Disable infinite algorithmic scroll feeds after 7:00 PM.
- Encourage intentional long-form content (movies, full podcasts, audiobooks) over fragmented micro-clips.`,
      },
    ],
  },
  {
    slug: 'teen-autonomy-and-graduated-privileges',
    title: 'The Autonomy Transition: Graduated Privileges & Digital Agency',
    summary:
      'Shift from managerial monitoring to collaborative mentorship as adolescent agency and metacognition develop.',
    coverImageUrl: 'https://assets.alongside.care/academy/tier4-cover.png',
    developmentalTier: DevelopmentalTier.TIER_4_AGES_14_PLUS,
    sortOrder: 4,
    lessons: [
      {
        slug: 'from-surveillance-to-covenant',
        title: 'Moving From Surveillance to Bilateral Agreements',
        readingMinutes: 5,
        sortOrder: 1,
        contentMarkdown: `### Why Spyware Fails With 14+ Adolescents

At 14 and older, punitive surveillance apps (keystroke loggers, secret location sniffers, silent message mirroring) are consistently counterproductive:
1. Tech-savvy teens easily bypass them using secondary accounts, burner browsers, or alternate devices.
2. Secret surveillance destroys trust, ensuring that if a teen encounters genuine online danger (extortion, predatory contact, grooming), **they will conceal it from you for fear of punishment**.

#### The Shift to Collaborative Governance:
Replace covert tracking with transparent, bilateral pacts. Explicitly define what is monitored, what remains private, and what triggers an intervention.`,
      },
      {
        slug: 'digital-reputation-and-permanence',
        title: 'Permanence, Screenshots & Impulse Reflection',
        readingMinutes: 5,
        sortOrder: 2,
        contentMarkdown: `### Digital Footprints Without Catastrophic Scares

Lecturing high schoolers about their permanent record often sounds like white noise. Instead, engage their critical thinking:

#### The Perspective Shift Exercise:
- Ask: *"If a college coach, future employer, or someone you respect read the last 10 messages you sent in your group chat, how would you feel?"*
- Discuss how ephemeral messages (Snapchat, disappearing photos) are routinely screenshotted using secondary phone cameras, defeating software notification alerts.

#### The Golden Rule of Digital Reputation:
Assume every digital keystroke is broadcastable. If you wouldn't say it to someone's face with their parents standing next to them, don't text it.`,
      },
      {
        slug: 'repair-after-breach',
        title: 'When Agreements Break: The Non-Punitive Repair Blueprint',
        readingMinutes: 4,
        sortOrder: 3,
        contentMarkdown: `### The 4-Stage Repair Blueprint

Agreements *will* be broken. A curfew will be blown, or an unapproved app will be downloaded. What matters is the repair protocol:

1. **Acknowledge Without Catastrophizing:** *"The agreement was violated, and we need to talk about it without yelling."*
2. **Examine the Root Motivation:** Was it social pressure? Curiosity? Boredom? Anxiety?
3. **Calibrated Temporary Reset:** Step back one privilege tier for 7 days (e.g. earlier curfew or restricted app downloads).
4. **Restoration of Agency:** Outline the exact milestone for restoring the privilege. When teens know the path back, motivation replaces resentment.`,
      },
    ],
  },
];

export async function seedAcademy(prisma: PrismaClient): Promise<void> {
  console.log('[Seed] Seeding Parent Intelligence Academy modules and lessons...');

  for (const moduleData of ACADEMY_SEED_MODULES) {
    const { lessons, ...moduleFields } = moduleData;

    const moduleRecord = await prisma.academyModule.upsert({
      where: { slug: moduleFields.slug },
      update: {
        title: moduleFields.title,
        summary: moduleFields.summary,
        coverImageUrl: moduleFields.coverImageUrl,
        developmentalTier: moduleFields.developmentalTier,
        sortOrder: moduleFields.sortOrder,
      },
      create: {
        slug: moduleFields.slug,
        title: moduleFields.title,
        summary: moduleFields.summary,
        coverImageUrl: moduleFields.coverImageUrl,
        developmentalTier: moduleFields.developmentalTier,
        sortOrder: moduleFields.sortOrder,
      },
    });

    for (const lesson of lessons) {
      await prisma.academyLesson.upsert({
        where: {
          moduleId_slug: {
            moduleId: moduleRecord.id,
            slug: lesson.slug,
          },
        },
        update: {
          title: lesson.title,
          contentMarkdown: lesson.contentMarkdown,
          readingMinutes: lesson.readingMinutes,
          sortOrder: lesson.sortOrder,
        },
        create: {
          moduleId: moduleRecord.id,
          slug: lesson.slug,
          title: lesson.title,
          contentMarkdown: lesson.contentMarkdown,
          readingMinutes: lesson.readingMinutes,
          sortOrder: lesson.sortOrder,
        },
      });
    }
  }

  console.log(
    `[Seed] Successfully seeded ${ACADEMY_SEED_MODULES.length} Academy modules across all 4 tiers.`
  );
}
