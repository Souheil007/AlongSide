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
  // =========================================================================
  // TIER 0: INFANCY & TODDLER (AGES 0–3)
  // =========================================================================
  {
    slug: 'infant-sensory-milestones-and-coregulation',
    title: 'Infant & Toddler Neurodevelopment: Sensory Co-Regulation, First Words & Zero-Screen Foundations',
    summary:
      'Master how the 0-3 infant and toddler brain builds secure attachment, why pre-verbal emotional meltdowns occur, and how to protect 3D language acquisition.',
    coverImageUrl: 'https://assets.alongside.care/academy/tier0-cover.png',
    developmentalTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    sortOrder: 1,
    lessons: [
      {
        slug: 'sensory-overload-and-the-immature-amygdala',
        title: 'Sensory Overload & The Immature Amygdala: Why Toddlers Melt Down',
        readingMinutes: 4,
        sortOrder: 1,
        contentMarkdown: `### The Immature Amygdala & The Pre-Verbal Tantrum

When an 18-month-old or 2-year-old throws an explosive tantrum on the kitchen floor, parents often wonder if they are failing at discipline or if their toddler is being intentionally defiant.

Developmental neurobiology reveals a physiological reality: **The toddler amygdala operates without prefrontal brakes**.

Between birth and age 3, the amygdala (which triggers primal threat detection, panic, and fight-or-flight) is fully functional. In contrast, the prefrontal cortex—the region responsible for impulse inhibition, emotional modulation, and verbal reasoning—has barely begun its 25-year myelination journey.

> **Clinical Insight:** Before age 3, an emotional meltdown is a physiological state of autonomic dysregulation, not calculated manipulation. Co-regulation is not spoiling; it literally scaffolds the child's developing neural pathways for lifelong resilience.

\`\`\`
Sensory Overload / Hunger ──> Amygdala Alarm ──> Adrenaline & Cortisol Surge ──> Pre-Verbal Meltdown
\`\`\`

#### The HALT Vulnerability Protocol:
When a meltdown hits, check **HALT**:
1. **Hungry:** Has blood sugar dipped? Offer a quick protein or complex carb snack.
2. **Anxious/Overstimulated:** Too much fluorescent light, noise, or crowds? Move to a quiet, dim environment.
3. **Lonely:** Does the child need physical contact and reassurance?
4. **Tired:** Is the child fighting sleep due to an overtired cortisol spike?

**What to Say:** "Your body feels big and stormy right now. I will hold you safely until the storm passes. You are completely safe with me."`,
      },
      {
        slug: 'zero-screens-and-language-acquisition',
        title: 'Zero Screens Before Age 2: The Neuroscience of 3D Language Acquisition',
        readingMinutes: 4,
        sortOrder: 2,
        contentMarkdown: `### The Video Deficit Effect & 3D Spatial Language Mapping

Pediatric bodies worldwide (including the American Academy of Pediatrics and World Health Organization) recommend **zero screen media before 18 to 24 months** (excluding interactive video chatting with family).

Why is screen time before age 2 fundamentally different from screen time later in childhood?

The answer lies in what developmental psychologists call the **"Video Deficit Effect"**:
- Infants and toddlers cannot reliably transfer 2D representations on a flat glass surface to the real 3D physical world.
- A toddler who watches an interactive shape sorting cartoon does not translate that into tactile spatial understanding in the physical playroom.
- Watching fast-moving animated media displaces the single most critical nutrient of infant brain development: **live, human serve-and-return communication**.

> **Clinical Insight:** Infant phonetic discrimination depends on joint attention, physical lip movements, and 3D eye gaze. Fast-paced 2D video media suppresses verbal turn-taking and delays expressive vocabulary milestones.

#### The Serve-and-Return Play Architecture:
1. **Notice the Gaze:** Watch where baby looks (a dog, a ball, a leaf).
2. **Label with Melodic Prosody (Parentese):** Use higher pitch and elongated vowels.
3. **Pause for 5 Seconds:** Allow infant vocalization or body gesture before responding.

**What to Say:** "Look at the big fluffy puppy! The puppy says woof woof! Do you see the puppy wagging its tail?"`,
      },
      {
        slug: 'emotional-coregulation-rituals',
        title: 'The Calm Anchor: How Parents Wire Nervous System Resilience',
        readingMinutes: 5,
        sortOrder: 3,
        contentMarkdown: `### Polyvagal Theory & The Parental Thermostat

Have you ever noticed that when you are exhausted and irritable, your toddler's behavior instantly unravels?

This is not a coincidence: it is **neuroception** in action. Through mirror neurons and autonomic auditory tone, infant and toddler nervous systems constantly scan their primary caregivers to determine if the environment is safe or dangerous.

> **Clinical Insight:** A dysregulated adult cannot regulate a dysregulated child. Your nervous system is the room's thermostat, not the thermometer. When you lower your voice and relax your shoulders, your child's vagal nerve detects physical safety.

#### 3 Daily Co-Regulation Rituals:
1. **The 3-Deep-Breath Synchrony:** When feeling frustrated, place your hand on your chest and take three exaggerated deep breaths. Toddlers naturally mimic breathing rhythms.
2. **Low-Pitch Melodic Soothing:** Lower your vocal pitch. High, tense voices signal immediate predator danger to infant auditory processing.
3. **The Sensory Pressure Hug:** Firm, warm, continuous proprioceptive embrace down the toddler's back stimulates deep pressure receptors, shutting off adrenaline release.

**What to Say:** "Let us take three big deep breaths together: smell the warm soup, blow on the birthday candle. I am right here with you."`,
      },
    ],
  },

  // =========================================================================
  // TIER 1: EARLY CHILDHOOD (AGES 4–6)
  // =========================================================================
  {
    slug: 'early-childhood-executive-function-and-play',
    title: 'Early Childhood Executive Function: Theory of Mind, Play Scaffolding & Emotion Regulation',
    summary:
      'Navigate preschool social leaps, egocentrism vs empathy sparks, bedtime battles, and the science of purposeful offline imaginative play.',
    coverImageUrl: 'https://assets.alongside.care/academy/tier1-cover.png',
    developmentalTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    sortOrder: 2,
    lessons: [
      {
        slug: 'theory-of-mind-and-preschool-empathy',
        title: 'Theory of Mind: Why 4-Year-Olds Struggle to Share and Cooperate',
        readingMinutes: 4,
        sortOrder: 1,
        contentMarkdown: `### The Preschool Cognitive Leap: From Egocentrism to Empathy

At ages 4 and 5, children undergo a monumental cognitive breakthrough: **Theory of Mind**—the realization that other people have independent thoughts, feelings, desires, and knowledge different from their own.

Before this transition, Piagetian egocentrism reigns: if a 4-year-old likes chocolate, they assume everyone in the room likes chocolate. If they want the yellow dump truck right now, they assume the other child has no valid claim to it.

> **Clinical Insight:** Preschoolers do not refuse to share out of malice; until theory of mind solidifies around age 4.5, they genuinely cannot comprehend that another child experiences different desires. Demanding forced sharing before cognitive readiness triggers shame rather than true generosity.

#### The Turn-Taking Alternative:
- Replace forced sharing (*"Give that to Leo right now!"*) with **turn mastery**: *"You are playing with the truck right now. When your body is finished, let Leo know it is his turn."*
- Foster empathetic reflection by highlighting facial cues: *"Look at Maya's eyebrows and mouth. How do you think she feels right now?"*

**What to Say:** "Maya looks sad because her turn with the train ended. What could we do to help her feel included?"`,
      },
      {
        slug: 'scaffolded-offline-play-vs-fast-media',
        title: 'Purposeful Play vs. Fast-Paced Animation: Building Sustained Attention Spans',
        readingMinutes: 5,
        sortOrder: 2,
        contentMarkdown: `### Attention Span Engineering: Blocks & Puppets vs. Micro-Second Cuts

The modern preschool media environment is dominated by hyper-stimulating animated shows featuring scene cuts every 2 to 3 seconds, flashing primary colors, and constant sonic crescendos.

Pediatric neuro-imaging demonstrates the cost:
- Rapid video cuts artificially sustain exogenous attention (reflexive orientation to flashes), weakening endogenous attention (the self-directed ability to concentrate on a task).
- When high-tempo animation ends, real-world tasks (drawing, building LEGOs, eating lunch) feel excruciatingly slow and unrewarding.

> **Clinical Insight:** Pacing matters: rapid scene shifts below 4 seconds overstimulate the dopamine reward pathway, while open-ended block play strengthens dorsal attention networks and cognitive stamina.

#### Purposeful Play Prescription:
1. **Unstructured Unit Blocks:** Wooden blocks require spatial motor balance and physics experimentation without flashing lights.
2. **Roleplay Puppetry:** Hand puppets allow preschoolers to process social anxieties (starting kindergarten, doctor visits, sharing conflicts) at their own emotional pace.

**What to Say:** "Let us build a bridge strong enough for the dinosaurs to cross before dinner time."`,
      },
      {
        slug: 'bedtime-resistance-and-sleep-pressure',
        title: 'Ending Bedtime Battles: Sleep Pressure, Blue Light & Predictable Anchors',
        readingMinutes: 4,
        sortOrder: 3,
        contentMarkdown: `### The Chronobiology of Preschool Bedtime Protests

"I need another glass of water!" "There is a monster under the bed!" "One more story!"

Preschool bedtime resistance is rarely about sleepiness—it is about **separation anxiety colliding with an adrenaline rebound**.

When children become overtired, adenosine (the body's natural sleep pressure chemical) is overwhelmed by a counter-regulatory surge of cortisol and epinephrine, producing the dreaded "second wind" hyperactivity.

> **Clinical Insight:** Bedtime protests are frequently driven by separation anxiety and cortisol spikes. Predictable, sensory-soothing bedtime routines reduce sleep latency by 40% and build emotional security.

#### The 4-Step Visual Bedtime Anchor:
1. **Dim the Lighting 60 Minutes Prior:** Warm 2700K incandescent or red-spectrum lighting triggers pineal melatonin release.
2. **Warm Bath Proprioception:** The drop in core body temperature after a warm bath naturally mimics the circadian temperature dip required for sleep.
3. **The Two-Book Anchor:** Agree on exactly two books before reading begins.
4. **The Connection Token:** Leave a physical item (a small smooth stone or parent's soft bracelet) with the child: *"Hold this; whenever you touch it, my love is right with you."*

**What to Say:** "Our reading lamp is turning off, but my love stays wrapped around you all night long."`,
      },
    ],
  },

  // =========================================================================
  // TIER 2: MIDDLE CHILDHOOD (AGES 7–9)
  // =========================================================================
  {
    slug: 'early-impulse-centers-and-shared-media',
    title: 'Early Impulse Centers: The Developing Prefrontal Cortex & Shared Media',
    summary:
      'Understand how the 7-9 year old brain processes immediate digital reward before inhibitory control is fully wired.',
    coverImageUrl: 'https://assets.alongside.care/academy/tier2-cover.png',
    developmentalTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    sortOrder: 3,
    lessons: [
      {
        slug: 'dopamine-loops-and-curiosity',
        title: 'The Dopamine Loop: Why Stopping Gameplay Causes Meltdowns',
        readingMinutes: 4,
        sortOrder: 1,
        contentMarkdown: `### The Neurobiology of the "Five More Minutes" Screaming Match

When your 8-year-old throws a tantrum because Minecraft or Roblox was shut down, your intuitive reaction as a parent might be to perceive defiance, disrespect, or screen addiction.

However, developmental neurobiology reveals a different story: **The dopamine crash**.

At ages 7 to 9, the ventral striatum (the brain's reward prediction center) is already highly responsive to rapid sensory reward loops. Meanwhile, the prefrontal cortex—which governs impulse control, cognitive flexibility, and emotional modulation—will not reach functional maturity until the mid-twenties.

> **Clinical Insight:** At ages 7-9, the ventral striatum rewards immediate stimulation while prefrontal inhibitory pathways remain nascent. Co-viewing and structured transition bridges prevent acute dopamine drop crashes.

\`\`\`
Digital Stimulus (High Reward) ──> Sudden Screen Shutoff ──> Acute Dopamine Deficit ──> Amygdala Fight/Flight Reaction
\`\`\`

#### Clinical Action Steps:
1. **Never yank the device mid-loop:** Announce transitions before the round starts, not during an active match.
2. **The 3-Minute Sensory Landing Bridge:** Sit beside your child for the final 3 minutes. Ask: *"What are you building here?"* This shifts neurological activity from reactive striatal arousal to reflective conversational circuits before shutdown.
3. **Physical Handoff Ritual:** Have the child press the physical power button and place the device into the docking cradle themselves. Physical agency reduces feelings of arbitrary parental confiscation.

**What to Say:** "I see you are in the middle of a big build. Two minutes left to place your last blocks before our family dinner."`,
      },
      {
        slug: 'shared-screens-scaffolding',
        title: 'Co-Viewing & The Scaffolded Experience: Side-by-Side Guidance',
        readingMinutes: 4,
        sortOrder: 2,
        contentMarkdown: `### From Surveillance to Side-by-Side Co-Regulation

Passive screen isolation creates blind spots. But hover monitoring breeds resentment. The most effective bridge for 7-9 year olds is **scaffolded co-viewing**.

Vygotsky's *Zone of Proximal Development* teaches that executive habits are borrowed before they are owned. When a parent sits beside a child during media consumption:
- You observe emotional reactivity in real time.
- You provide an external prefrontal cortex to process fast-paced or ambiguous video content.

> **Clinical Insight:** Vygotsky's Zone of Proximal Development applies directly to media: executive habits are borrowed before they are owned through curious, collaborative side-by-side co-viewing.

#### Practical Co-Viewing Blueprint:
- **Curiosity Over Interrogation:** Replace *"What garbage are you watching?"* with *"Walk me through how this creator solved that level."*
- **Decode Advertising & Micro-transactions:** Point out promotional banners, loot boxes, and countdown timers. Ask: *"Why do you think the game developers made that button bright red and pulsing?"*

**What to Say:** "Walk me through how this creator solved that level. Why do you think that button was flashing red?"`,
      },
      {
        slug: 'first-boundaries-without-shame',
        title: 'Setting Digital Boundaries Without Triggering Shame',
        readingMinutes: 4,
        sortOrder: 3,
        contentMarkdown: `### Framing Boundaries Around Body Needs, Not Character Deficits

When tech limits are delivered as punishment (*"You've been on that screen all morning, you're lazy!"*), children internalize shame and learn stealth habits.

By anchoring boundaries in **objective biological needs**, you remove moral judgment:

> **Clinical Insight:** Framing tech limits around biological body needs eliminates character shame and prevents stealth evasion habits from taking root in middle childhood.

#### The Neutral Biological Script:
> *"Your brain needs three things every day to grow strong: daylight, physical movement, and deep uninterrupted sleep. When tablet time cuts into sleep or outdoor play, we adjust the timer to protect your body."*

#### Core Practice:
- Involve your child in setting the kitchen timer.
- Establish device-free physical zones: dining table, bathroom, and car rides under 20 minutes.

**What to Say:** "Your body needs daylight, movement, and sleep to grow. Let us set the timer together to protect your rest."`,
      },
    ],
  },

  // =========================================================================
  // TIER 3: PRE-TEEN (AGES 10–12)
  // =========================================================================
  {
    slug: 'tween-neurobiology-and-adrenarche',
    title: 'The Tween Brain: Adrenarche, Social Dopamine & The Peer Shift',
    summary:
      'Understand why peer approval suddenly eclipses family connection at ages 10-12 and how to protect sleep while honoring social connection.',
    coverImageUrl: 'https://assets.alongside.care/academy/tier3-cover.png',
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    sortOrder: 4,
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

> **Clinical Insight:** Adrenarche activates adrenal androgens, making social exclusion register in the anterior cingulate cortex—the same region that registers physical pain. Empathy must precede limit setting.

#### The Alongside Empathetic Response:
Acknowledge the biological reality before stating the boundary:

**What to Say:** "I hear how important it is to feel included in what your friends are doing. You are not weird or wrong for wanting to be in the loop. Let us find ways to keep you connected while keeping you safe."`,
      },
      {
        slug: 'group-chats-fomo',
        title: 'Group Chats, Disappearing Messages & Silent Exclusion',
        readingMinutes: 5,
        sortOrder: 2,
        contentMarkdown: `### The Unregulated Class Group Chat

The single highest source of anxiety for 10-12 year olds is not public social media, but **private group messaging threads** (Messages, WhatsApp, Discord, or game chat).

#### Common Pain Points:
1. **The 500-Notification Tsunami:** Leaving the phone for sports practice and returning to 400 unread messages triggers intense FOMO (Fear Of Missing Out).
2. **Subtle Exclusion:** Groups created without one friend, or naming chats with inside jokes.
3. **Ephemeral Illusions:** Kids mistakenly assume photos or insults sent in vanishing chats cannot be saved or forwarded.

> **Clinical Insight:** Unregulated group chat threads create hyper-vigilant notification checks and acute exclusion anxiety during the middle school transition. Clear family guardrails restore psychological calm.

#### Protective Protocol:
- **The "Billboard Rule":** If you wouldn't display a message on a billboard outside the school front entrance, don't send it in a group chat.
- **The Emergency Exit Hatch:** Teach your tween how to mute group chats without leaving, and agree on a safe codeword (*"Soccer"* or *"Dentist"*) they can text you to give them an honorable excuse to disconnect.

**What to Say:** "If you wouldn't display a message on a billboard outside school, don't send it in a group chat. You can always use our safe word if a chat gets out of hand."`,
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
   - Point to the signed agreement on the refrigerator: *"We both signed our 8:30 PM curfew rule. The dock is waiting."*

> **Clinical Insight:** When heart rates exceed 100 bpm during tech arguments, logical reasoning shuts down. A 10-minute pause allows cortical reset and preserves parent-child trust.

**What to Say:** "I see you were in the middle of talking with Maya. Let us both take 10 minutes to reset, then check our signed agreement together."`,
      },
    ],
  },

  // =========================================================================
  // TIER 4: EARLY ADOLESCENCE (AGES 13–15)
  // =========================================================================
  {
    slug: 'pubertal-circadian-delay-and-sleep',
    title: 'Pubertal Circadian Delay, Algorithmic Feeds & The Neutral Bedtime Dock',
    summary:
      'Explore the biological 2-hour sleep phase shift in puberty and why physical device separation prevents chronic sleep deprivation.',
    coverImageUrl: 'https://assets.alongside.care/academy/tier4-cover.png',
    developmentalTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    sortOrder: 5,
    lessons: [
      {
        slug: 'the-biological-clock-shift',
        title: 'The 2-Hour Melatonin Shift: Why They Can\'t Sleep at 9:00 PM',
        readingMinutes: 5,
        sortOrder: 1,
        contentMarkdown: `### The Chronobiology of the Teen Sleep Shift

During pubertal transition (ages 13-15), the suprachiasmatic nucleus delays the evening release of melatonin by approximately **two full hours**.

A 14-year-old asked to fall asleep at 9:30 PM is biologically equivalent to an adult being forced to sleep at 7:30 PM.

#### The Device Compounding Effect:
When a teen lies in bed wide awake, reaching for a glowing smartphone is almost irresistible. The blue-wavelength light directly suppresses what little melatonin has accumulated, while social media notifications trigger norepinephrine spikes, delaying sleep onset until 1:00 AM or later.

> **Clinical Insight:** The pubertal brain experiences a natural 2-hour delay in melatonin release. Blue light and notifications compound this into severe sleep deficits that mimic depressive symptoms.

**What to Say:** "I know your body doesn't feel sleepy yet. Let us keep the phone downstairs and put on an audiobook or reading lamp in your room."`,
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
3. **An Old-Fashioned Alarm Clock:** Buy a simple $10 digital or analog alarm clock for the bedside table so *"I need my phone for the alarm"* is completely eliminated as an excuse.

> **Clinical Insight:** Universal family docking removes the burden of willpower. When everyone docks their phone in the kitchen, no one feels targeted, protecting essential adolescent REM cycles.

**What to Say:** "The dock is ready for all our phones tonight so our minds can unwind and get deep rest."`,
      },
      {
        slug: 'algorithmic-rabbit-holes',
        title: 'Algorithmic Feeds: How Infinite Scrolls Exploit Fatigued Brains',
        readingMinutes: 5,
        sortOrder: 3,
        contentMarkdown: `### Infinite Scrolls & Variable Ratio Schedules

Short-form algorithmic video feeds (TikTok, Reels, Shorts) utilize B.F. Skinner's **variable ratio reinforcement schedule**—the exact psychological mechanism underpinning casino slot machines.

When the adolescent brain is fatigued late in the evening:
- Frontal lobe inhibition drops significantly.
- The next swipe promise (*"maybe this next video is hilarious"*) triggers steady anticipatory dopamine.
- Autoplay algorithms remove all natural stopping cues (chapters, endings, credits).

> **Clinical Insight:** Short-form video feeds use variable ratio schedules identical to slot machines, hijacking fatigued frontal lobes after dark and destroying nocturnal recovery.

#### Family Strategic Defense:
- Disable infinite algorithmic scroll feeds after 7:00 PM.
- Encourage intentional long-form content (movies, full podcasts, audiobooks) over fragmented micro-clips.

**What to Say:** "Let us switch from infinite scrolling to a full episode or podcast that has a clear ending."`,
      },
    ],
  },

  // =========================================================================
  // TIER 5: LATE ADOLESCENCE (AGES 16–18)
  // =========================================================================
  {
    slug: 'teen-autonomy-and-graduated-privileges',
    title: 'The Autonomy Transition: Graduated Privileges, Digital Footprints & Agency',
    summary:
      'Shift from managerial monitoring to collaborative mentorship as adolescent agency, metacognition, and adult independence develop.',
    coverImageUrl: 'https://assets.alongside.care/academy/tier5-cover.png',
    developmentalTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    sortOrder: 6,
    lessons: [
      {
        slug: 'from-surveillance-to-covenant',
        title: 'Moving From Surveillance to Bilateral Agreements: Why Spyware Fails',
        readingMinutes: 5,
        sortOrder: 1,
        contentMarkdown: `### Why Spyware Fails With 16-18 Year Old Adolescents

At 16 and older, punitive surveillance apps (keystroke loggers, secret location sniffers, silent message mirroring) are consistently counterproductive:
1. Tech-savvy teens easily bypass them using secondary accounts, burner browsers, or alternate devices.
2. Secret surveillance destroys trust, ensuring that if a teen encounters genuine online danger (extortion, predatory contact, grooming), **they will conceal it from you for fear of punishment**.

> **Clinical Insight:** Punitive spyware destroys adolescent trust and drives high-risk behavior underground into burner accounts and evasion tools. Transparent covenants build genuine metacognitive self-regulation.

#### The Shift to Collaborative Governance:
Replace covert tracking with transparent, bilateral pacts. Explicitly define what is monitored, what remains private, and what triggers an intervention.

**What to Say:** "You are preparing for adulthood. We govern our home through transparent agreements, not hidden tracking."`,
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

> **Clinical Insight:** Metacognitive perspective-taking exercises are far more effective than catastrophic lectures when guiding teen online conduct and reputational foresight.

#### The Golden Rule of Digital Reputation:
Assume every digital keystroke is broadcastable. If you wouldn't say it to someone's face with their parents standing next to them, don't text it.

**What to Say:** "If someone you deeply respect read this conversation five years from now, would you stand by it?"`,
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
4. **Restoration of Agency:** Outline the exact milestone for restoring the privilege. When teens know the path back, motivation replaces resentment.

> **Clinical Insight:** A clear, predictable roadmap back to trust and autonomy replaces adolescent resentment with accountability and mature problem-solving.

**What to Say:** "The agreement was violated, but our relationship is solid. Here is the 7-day path back to restoring your privileges."`,
      },
    ],
  },
];

export async function seedAcademy(prisma: PrismaClient): Promise<void> {
  console.log('[Seed] Seeding Parent Intelligence Academy modules and lessons across all 6 tiers...');

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
    `[Seed] Successfully seeded ${ACADEMY_SEED_MODULES.length} Academy modules across all 6 lifespan tiers (Ages 0–18).`
  );
}
