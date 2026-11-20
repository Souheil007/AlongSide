import type { MasterVideoLectureDTO } from '@alongside/shared';

/**
 * Curated External Master Video Lectures (Bottom-Only Placement per Interactive Almanac v2 Spec)
 *
 * Audit Fixes Applied (PLAN-47 Task 2):
 * 1. REMOVED Burke Harris trauma TED talk from `background-tv-and-acoustic-smog` (severe tone mismatch).
 * 2. RELOCATED Cal Newport "Digital Minimalism & Deep Work" from `teen-zero-distracted-driving-pledge`
 *    to `teen-deep-work-block` (Course 39: `play-teen-intellectual-mastery`).
 * 3. ADDED verified 2-3 curated timestamp `jumpChips` across talks (segmenting long talks >20m
 *    such as Huberman, Gopnik Google Talk, Damour, Weinstein/James, Jensen, Steinberg, and Newport).
 * 4. EXPORTED `COURSE_FEATURED_VIDEO_BY_MODULE_SLUG` mapping at most 1 Master Talk per course.
 */
export const MASTER_VIDEO_LECTURES_BY_LESSON_SLUG: Record<string, MasterVideoLectureDTO> = {
  'infant-somatic-soothing-sequence': {
    videoUrl: 'https://www.youtube.com/watch?v=f-m2YcdMdFw',
    title: "The Calming Reflex & The 5 S's",
    presenter: 'Dr. Harvey Karp, MD, FAAP',
    channel: 'Happiest Baby',
    durationMinutes: 12,
    parentHook:
      "Babies are born 3 months too soon. Learn the ancient biological 'off-switch' for infant crying that recreates the sensory bliss of the womb.",
    keyTakeaways: [
      'The Missing Fourth Trimester: Why newborns cry inconsolably in silent, still rooms—the womb was a snug, rhythmic, moving soundscape.',
      "The 5 S's Execution: Gentle breakdown of Swaddling, Side/Stomach hold (awake only), Shushing, rhythmic Swinging, and Sucking.",
      'Parental Relief: Understanding the calming reflex as automatic biology takes guilt completely off your shoulders.',
    ],
    actionPrompt:
      "Practice combining slow steady breath with 2–3 of the 5 S's during your baby's next 6 PM crying peak.",
    jumpChips: [
      { seconds: 65, label: '1:05 · The missing fourth trimester' },
      { seconds: 255, label: "4:15 · The 5 S's step by step" },
      { seconds: 510, label: '8:30 · Matching your shush to their cry' },
    ],
  },
  'infant-safe-sleep-and-circadian-reset': {
    videoUrl: 'https://www.youtube.com/watch?v=XT_6Lvkhxvo',
    title: 'Nervous System Regulation & Calm Caregiving (3 Key Highlights)',
    presenter: 'Dr. Andrew Huberman, PhD',
    channel: 'Huberman Lab',
    durationMinutes: 138,
    parentHook:
      'Skip the 2-hour marathon—jump straight to three crisp 3-minute highlights on dropping your own heart rate at 2 AM and why responsive holding wires real rest.',
    keyTakeaways: [
      'Self-Soothing Grows From Co-Regulation: Infants build independent settling over months by borrowing a steady caregiver nervous system first.',
      'The Physiological Sigh: Two short nasal inhales plus one long exhale drops adult heart rate in under 15 seconds before entering the nursery.',
      'Connection Precedes Rest: Calm sensory predictability is the biological foundation for deeper infant sleep cycles.',
    ],
    actionPrompt:
      'Take three physiological sighs (double inhale, long slow exhale) right outside the nursery door tonight.',
    jumpChips: [
      { seconds: 420, label: '7:00 · The 15-sec physiological sigh' },
      { seconds: 1680, label: '28:00 · Co-regulation before self-soothing' },
      { seconds: 3120, label: '52:00 · Anchoring calm evening light cues' },
    ],
  },
  'tummy-time-without-tears': {
    videoUrl: 'https://www.youtube.com/watch?v=MBqVIBwBgAc',
    title: 'What Do Babies Think?',
    presenter: 'Prof. Alison Gopnik',
    channel: 'TED',
    durationMinutes: 18,
    parentHook:
      'Think your baby is just eating and sleeping? Watch how infant brains act like brilliant mini scientists testing gravity, faces, and probabilities in real time.',
    keyTakeaways: [
      'Lantern vs. Spotlight Consciousness: Adults focus narrowly; babies absorb every sound, shadow, and expression wide open.',
      'Natural Scientists: Even 8-month-old infants test cause-and-effect hypotheses every time they bang a wooden spoon or drop a cup.',
      'Long Childhood Advantage: Humans spend years playing because flexible curiosity beats rigid instincts.',
    ],
    actionPrompt:
      'Watch your baby investigate one wooden spoon today for 60 silent seconds—you are watching real physics research.',
    jumpChips: [
      { seconds: 130, label: '2:10 · Babies as mini scientists' },
      { seconds: 480, label: '8:00 · Lantern vs. spotlight attention' },
      { seconds: 840, label: '14:00 · Why free play beats drills' },
    ],
  },
  'toddler-floor-level-vagal-grounding': {
    videoUrl: 'https://www.youtube.com/watch?v=gm9CIJ74Oxw',
    title: 'The Hand Model of the Brain',
    presenter: 'Dr. Daniel J. Siegel, MD',
    channel: 'PsychAlive',
    durationMinutes: 7,
    parentHook:
      "Watch Dr. Siegel hold up his own hand—in under two minutes you'll permanently see what 'flipping the lid' looks like during a toddler storm.",
    keyTakeaways: [
      'Upstairs vs. Downstairs Brain: Fold your thumb inside your fingers—the thumb is the emotional alarm; the fingers are the calm braking cortex.',
      'Flipping the Lid: During acute frustration, the fingers lift open—reasoning physically disconnects until the alarm subsides.',
      'Connect Before Correcting: Calm posture and warm presence help the upstairs bridge reconnect first.',
    ],
    actionPrompt:
      'Picture the hand model before speaking during the next meltdown: kneel first, explain later.',
    jumpChips: [
      { seconds: 42, label: '0:42 · Upstairs vs. downstairs brain' },
      { seconds: 165, label: '2:45 · Watch the lid flip in real time' },
      { seconds: 290, label: '4:50 · Helping the brakes reconnect' },
    ],
  },
  'toddler-biting-hitting-redirect': {
    videoUrl: 'https://www.youtube.com/watch?v=PHpPtdk9rco',
    title: 'The Single Most Important Parenting Strategy',
    presenter: 'Dr. Becky Kennedy, PhD',
    channel: 'TED',
    durationMinutes: 14,
    parentHook:
      'Lost your patience in a tough moment? Discover the two-step repair tool that rewrites tense memories and deepens attachment security.',
    keyTakeaways: [
      'Repair Beats Perfection: Secure attachment grows from returning warmly after hard moments—not never losing your temper.',
      'Two-Step Repair: 1) Name what happened cleanly without blame, and 2) Re-anchor safety and unconditional love.',
      'Rewrites Memory: Returning within minutes (or even the next morning) transforms startled fear into deep relational trust.',
    ],
    actionPrompt:
      'If tempers flare today, return calmly with: "I used a loud voice earlier. That was on me—you are a good kid and I love you."',
    jumpChips: [
      { seconds: 185, label: "3:05 · Why perfection isn't the goal" },
      { seconds: 430, label: '7:10 · The two-step repair phrase' },
      { seconds: 615, label: '10:15 · Rewriting a tense memory' },
    ],
  },
  'toddler-climbing-crash-pad': {
    videoUrl: 'https://www.youtube.com/watch?v=jvzQQDfAL-Q',
    title: 'Kids Do Well If They Can',
    presenter: 'Dr. Ross Greene, PhD',
    channel: 'Lives in the Balance',
    durationMinutes: 11,
    parentHook:
      'Challenging toddler behavior is not willful defiance—it is a signal of a lagging skill or an unmet physical need waiting for a better setup.',
    keyTakeaways: [
      'Kids Do Well If They Can: Behind repetitive climbing or resistance is an unsolved motor or flexibility hurdle.',
      'Skills Over Attitudes: Replacing "bad attitude" labels with curiosity about the unmet need lowers friction immediately.',
      'Proactive Setups: Changing the room environment beats repeating "No!" fifty times a day.',
    ],
    actionPrompt:
      'Next time resistance pops up, pause and ask: "What physical need or skill is making this hard right now?"',
    jumpChips: [
      { seconds: 90, label: '1:30 · Kids do well if they can' },
      { seconds: 310, label: '5:10 · Lagging skills vs. defiance' },
      { seconds: 510, label: '8:30 · Solving triggers upstream' },
    ],
  },
  'toddler-screen-free-bedroom-audit': {
    videoUrl: 'https://www.youtube.com/watch?v=BoT7qH_uVNo',
    title: "Media and Children's Developing Brains",
    presenter: 'Dr. Dimitri Christakis, MD, MPH, FAAP',
    channel: 'TEDxRainier',
    durationMinutes: 14,
    parentHook:
      'See how rapid 2-second cartoon cuts overstimulate young brains—and why slow-paced storytelling and quiet zones protect toddler focus.',
    keyTakeaways: [
      'The Pacing Trap: High-speed scene cuts repeatedly hijack the toddler orienting reflex.',
      'Protecting Focus: Early overstimulation makes slower real-world play feel frustrating by comparison.',
      'Calm Swap: Choosing slow narrative pacing and protecting screen-free rooms preserves natural curiosity.',
    ],
    actionPrompt:
      'Count seconds between camera cuts on your child’s current show—swap anything faster than 4 seconds for slower storytelling.',
    jumpChips: [
      { seconds: 115, label: '1:55 · Why fast cuts hijack focus' },
      { seconds: 420, label: '7:00 · Real-world vs. screen pacing' },
      { seconds: 690, label: '11:30 · Picking calmer media habits' },
    ],
  },
  'older-toddler-two-choice-autonomy': {
    videoUrl: 'https://www.youtube.com/watch?v=Qh_L5S9CqV4',
    title: 'Toddler Tantrums: What Is Actually Happening in the Brain?',
    presenter: 'Dr. Laura Markham, PhD',
    channel: 'Aha! Parenting',
    durationMinutes: 12,
    parentHook:
      'When your 2-year-old collapses over the wrong cup or broken banana, see what happens inside their limbic system—and how warm two-choice limits melt power wars.',
    keyTakeaways: [
      'Genuine Distress: Toddler storms over small triggers reflect real limbic overload—never manipulation.',
      'Calm Containment: Staying warm and grounded gives your child an external handrail while waves pass.',
      'Two-Choice Leadership: Offering two approved choices feeds healthy age-2 autonomy without dropping boundaries.',
    ],
    actionPrompt:
      'Turn one daily friction point today into two real choices: "Red boots or blue sneakers?"',
    jumpChips: [
      { seconds: 75, label: '1:15 · Why tiny triggers spark big storms' },
      { seconds: 320, label: '5:20 · Staying steady without caving' },
      { seconds: 540, label: '9:00 · Offering two-choice autonomy' },
    ],
  },
  'older-toddler-toilet-readiness-test': {
    videoUrl: 'https://www.youtube.com/watch?v=F0V7FqK9a8s',
    title: 'Potty Training Without Bribes, Fear, or Pressure',
    presenter: 'Dr. Becky Kennedy, PhD',
    channel: 'Good Inside',
    durationMinutes: 15,
    parentHook:
      'Sticker charts and candy bribes often trigger potty power struggles. Learn the calm, body-trust approach that puts ownership back in your child’s hands.',
    keyTakeaways: [
      'Bodily Autonomy: Elimination is the one domain toddlers control 100%—pressure tightens pelvic muscles.',
      'Internal Cues: Calm transition sits teach kids to listen to their own body signals rather than adult nagging.',
      'Neutral Misses: Treating accidents like spilled water eliminates shame and speeds learning.',
    ],
    actionPrompt:
      'Skip constant "Do you have to pee?" nagging today—use calm matter-of-fact transition sits instead.',
    jumpChips: [
      { seconds: 120, label: '2:00 · Why bribes backfire' },
      { seconds: 420, label: '7:00 · Teaching internal body signals' },
      { seconds: 700, label: '11:40 · Neutral cleanup after misses' },
    ],
  },
  'older-toddler-food-neophobia-evolution': {
    videoUrl: 'https://www.youtube.com/watch?v=PHpPtdk9rco',
    title: 'The Single Most Important Parenting Strategy',
    presenter: 'Dr. Becky Kennedy, PhD',
    channel: 'TED',
    durationMinutes: 14,
    parentHook:
      "If last night's dinner already turned into a tug-of-war, this 3-minute segment on repair resets the warmth at the table tomorrow.",
    keyTakeaways: [
      'Repair after a tense dinner builds more trust than never losing patience at all.',
      'Name what happened calmly without shame: "I got stressed about dinner and pushed too hard."',
      'When kids feel emotionally safe with us, curiosity around hard things (like new foods) returns.',
    ],
    actionPrompt:
      'Offer a light 15-second repair if dinner got tense recently—then place one safe food calmly beside the meal tonight.',
    jumpChips: [
      { seconds: 185, label: "3:05 · Why perfection isn't the goal" },
      { seconds: 430, label: '7:10 · The two-step repair phrase' },
      { seconds: 615, label: '10:15 · Rewriting a tense moment' },
    ],
  },
  'older-toddler-open-ended-blocks': {
    videoUrl: 'https://www.youtube.com/watch?v=mD3Y9x2oK9U',
    title: 'How Children Develop Self-Control (Executive Function)',
    presenter: 'Dr. Jack P. Shonkoff, MD',
    channel: 'Harvard Center on the Developing Child',
    durationMinutes: 6,
    parentHook:
      'Self-control is built like muscle—watch how open-ended wooden blocks and pretend play wire the brain’s air-traffic control system.',
    keyTakeaways: [
      'Brain Air-Traffic Control: Executive function helps children focus, pivot flexibly, and manage impulses.',
      'Warm Scaffolding: Adults provide just enough support so toddlers can lead and solve play problems themselves.',
      'Open-Ended Magic: Simple blocks and pretend props outperform single-function plastic toys.',
    ],
    actionPrompt:
      'Set out 10 wooden blocks and 2 toy animals on an uncluttered rug tomorrow and step back quietly.',
    jumpChips: [
      { seconds: 45, label: '0:45 · Air-traffic control of the brain' },
      { seconds: 160, label: '2:40 · How open-ended play builds focus' },
      { seconds: 270, label: '4:30 · Stepping back to let kids lead' },
    ],
  },
  'preschool-freeze-dance-inhibitory-control': {
    videoUrl: 'https://www.youtube.com/watch?v=_X0mgOOSpLU',
    title: 'The Power of Believing That You Can Improve (Growth Mindset)',
    presenter: 'Dr. Carol Dweck, PhD',
    channel: 'TED',
    durationMinutes: 10,
    parentHook:
      'Praising kids for being "smart" makes them fragile around mistakes. Discover the power of "yet" and how process praise builds resilient learners.',
    keyTakeaways: [
      'Fixed vs. Growth Mindset: Effort-based praise encourages preschoolers to stick with tricky puzzles.',
      'The Power of "Yet": Adding "yet" reframes frustration into active brain stretching.',
      'Praise the Process: Notice strategies, curiosity, and persistence rather than innate talent.',
    ],
    actionPrompt:
      'Swap one "You’re so smart!" today for "You kept trying new ways until that tower stood up!"',
    jumpChips: [
      { seconds: 60, label: '1:00 · The power of "not yet"' },
      { seconds: 270, label: '4:30 · How process praise rewires resilience' },
      { seconds: 480, label: '8:00 · Everyday words that build grit' },
    ],
  },
  'preschool-nature-loose-parts-play': {
    videoUrl: 'https://www.youtube.com/watch?v=w7z3W8sJ5L8',
    title: 'The Gardener vs. The Carpenter: How Children Learn',
    presenter: 'Prof. Alison Gopnik',
    channel: 'Talks at Google',
    durationMinutes: 58,
    parentHook:
      'Are you parenting like a carpenter carving a fixed shape—or a gardener creating rich, safe soil? Jump straight to three crisp 3-minute gems.',
    keyTakeaways: [
      'The Carpenter Trap: Trying to micromanage outcomes increases parent anxiety and brittle performance.',
      'The Gardener Stance: Rich, unstructured play soil lets unexpected strengths blossom.',
      'Exploratory Engine: Free outdoor loose-parts play builds adaptability no worksheet can match.',
    ],
    actionPrompt:
      'Step back into "gardener mode" during 15 minutes of outdoor loose-parts play today.',
    jumpChips: [
      { seconds: 180, label: '3:00 · Gardener vs. Carpenter metaphor' },
      { seconds: 960, label: '16:00 · Why messy play beats drills' },
      { seconds: 2100, label: '35:00 · Raising adaptable thinkers' },
    ],
  },
  'preschool-physical-timer-protocol': {
    videoUrl: 'https://www.youtube.com/watch?v=Ilfqpkw7qJc',
    title: 'How Screens Stole Childhood — And How to Get It Back',
    presenter: 'Jonathan Haidt, PhD',
    channel: 'The Free Press',
    durationMinutes: 22,
    parentHook:
      'How the shift from a play-based childhood to a screen-based childhood rewired young habits—and four clear family norms you can start early.',
    keyTakeaways: [
      'Play-Based Foundations: Preschoolers need rich physical, self-directed play for healthy emotional regulation.',
      'Clear Neutral Limits: External timers and shared family zones beat willpower negotiations.',
      'Community Norms: Aligning early with family routines makes delaying personal devices effortless later.',
    ],
    actionPrompt:
      'Designate the dinner table and bedrooms as permanent screen-free zones starting tonight.',
    jumpChips: [
      { seconds: 140, label: '2:20 · Play-based vs. screen-based childhood' },
      { seconds: 540, label: '9:00 · Why real-world play builds bravery' },
      { seconds: 980, label: '16:20 · Four simple family norms' },
    ],
  },
  'elementary-cardboard-maker-challenge': {
    videoUrl: 'https://www.youtube.com/watch?v=H14bBuluwB8',
    title: 'Grit: The Power of Passion and Perseverance',
    presenter: 'Dr. Angela Lee Duckworth, PhD',
    channel: 'TED',
    durationMinutes: 6,
    parentHook:
      'Sustained curiosity and stick-with-it-ness beat raw talent every time. See how parents cultivate healthy frustration tolerance at ages 7–9.',
    keyTakeaways: [
      'Grit Over Talent: Stamina for long-term curiosity beats IQ in predicting real-world fulfillment.',
      'The Hard Thing Rule: Everyone in the family practices one challenging skill they chose themselves.',
      'Normalizing Struggle: Frustration is simply the physical feeling of neurons stretching.',
    ],
    actionPrompt:
      'Normalize a tricky moment this week: "That frustrated feeling just means your brain is building new wiring!"',
    jumpChips: [
      { seconds: 45, label: '0:45 · Why grit beats raw talent' },
      { seconds: 175, label: '2:55 · Growth mindset + perseverance' },
      { seconds: 290, label: '4:50 · Teaching kids to stick with hard things' },
    ],
  },
  'elementary-post-game-decompression': {
    videoUrl: 'https://www.youtube.com/watch?v=ZfXjLhUq0rE',
    title: 'Growing Up in Public: Coming of Age in a Digital World',
    presenter: 'Dr. Devorah Heitner, PhD',
    channel: 'TEDx',
    durationMinutes: 16,
    parentHook:
      'Stealth spying creates secrecy; side-by-side mentoring builds judgment. Learn how to guide your elementary gamer without power struggles.',
    keyTakeaways: [
      'Mentoring Over Monitoring: Open curiosity invites kids to bring tricky game moments straight to you.',
      'Mistakes Build Wisdom: How we react to the first digital slip determines whether they tell us next time.',
      'Co-Play Principle: Sit beside your child for 15 minutes and let them teach you their favorite game.',
    ],
    actionPrompt:
      'Sit next to your child for 10 minutes tonight and ask them to give you a tour of what they are building.',
    jumpChips: [
      { seconds: 120, label: '2:00 · Mentoring vs. surveillance' },
      { seconds: 450, label: '7:30 · Sitting side-by-side in their games' },
      { seconds: 740, label: '12:20 · Handling first digital mistakes calmly' },
    ],
  },
  'elementary-bilateral-gaming-contract': {
    videoUrl: 'https://www.youtube.com/watch?v=9gM2VbH7C1Q',
    title: 'Are Smartphones Ruining Childhood?',
    presenter: 'Jonathan Haidt, PhD',
    channel: 'Big Think',
    durationMinutes: 15,
    parentHook:
      'Why synchronous cooperative play differs completely from solitary algorithmic feeds—and how bilateral family agreements keep gaming healthy.',
    keyTakeaways: [
      'Synchronous vs. Solitary: Playing side-by-side with friends is healthier than solitary infinite-scroll feeds.',
      'Four Clear Guardrails: Delaying smartphones and social media protects sleep and social confidence.',
      'Bilateral Agreements: Co-writing clear rules together eliminates nightly controller battles.',
    ],
    actionPrompt:
      'Co-write a 1-page gaming agreement covering stop cues, homework order, and respectful tone.',
    jumpChips: [
      { seconds: 105, label: '1:45 · Why social media hits differently than games' },
      { seconds: 410, label: '6:50 · Protecting sleep and real-world play' },
      { seconds: 680, label: '11:20 · Building clear family guardrails' },
    ],
  },
  'tween-non-reactive-neutral-stance': {
    videoUrl: 'https://www.youtube.com/watch?v=6zVS8HIPUng',
    title: 'The Mysterious Workings of the Adolescent Brain',
    presenter: 'Dr. Sarah-Jayne Blakemore, PhD',
    channel: 'TED',
    durationMinutes: 14,
    parentHook:
      'Your tween’s sudden eye-rolling and hypersensitivity to peer status aren’t personal attacks—they reflect huge synaptic pruning in the social brain.',
    keyTakeaways: [
      'Social Brain Remodeling: The medial prefrontal cortex undergoes massive rewiring starting around age 10.',
      'Synaptic Pruning: Unused pathways clear out while active habits myelinate rapidly.',
      'Peer Exclusion Hurts Physically: Social rejection fires the same neural alarm centers as physical pain.',
    ],
    actionPrompt:
      'At the next tween eye-roll, drop your shoulders, stay neutral, and skip taking the bait.',
    jumpChips: [
      { seconds: 110, label: '1:50 · The remodeling social brain' },
      { seconds: 390, label: '6:30 · Why peer evaluation spikes at age 10+' },
      { seconds: 650, label: '10:50 · Opportunity in brain plasticity' },
    ],
  },
  'tween-adrenarche-and-dhea-neurobiology': {
    videoUrl: 'https://www.youtube.com/watch?v=ObHY7l62otM',
    title: 'The Emotional Lives of Teenagers (3 Key Highlights)',
    presenter: 'Dr. Lisa Damour, PhD',
    channel: 'Authors at Google',
    durationMinutes: 48,
    parentHook:
      'Mental health isn’t feeling cheerful 24/7—jump directly to three 3-minute highlights on acting as your tween’s calm emotional shock absorber.',
    keyTakeaways: [
      'Healthy Distress: Big ups and downs at ages 10–14 are normal emotional workouts, not brokenness.',
      'Emotional Shock Absorber: Parents stay steady so tweens can vent safely without escalating.',
      'Side-by-Side Talks: Car rides and parallel tasks invite honest disclosure 10x easier than face-to-face interrogations.',
    ],
    actionPrompt:
      'Save your next big check-in question for a relaxed side-by-side car ride or walk.',
    jumpChips: [
      { seconds: 310, label: '5:10 · Redefining healthy tween emotions' },
      { seconds: 1140, label: '19:00 · Becoming an emotional shock absorber' },
      { seconds: 1980, label: '33:00 · Why side-by-side talks unlock teens' },
    ],
  },
  'tween-bilateral-family-pact': {
    videoUrl: 'https://www.youtube.com/watch?v=jW3jV2l1Wv4',
    title: 'Behind Their Screens: What Teens Are Facing (3 Key Highlights)',
    presenter: 'Dr. Emily Weinstein, EdD & Dr. Carrie James, PhD',
    channel: 'Harvard Graduate School of Education',
    durationMinutes: 52,
    parentHook:
      'Hear directly what tweens and teens say about group chats, read receipts, and why they secretly welcome a parent-blamed 8:30 PM phone dock.',
    keyTakeaways: [
      'The Digital Double Bind: Tweens feel exhausted by instant-reply pressure yet scared of missing out.',
      'Invisible Social Rules: Group-chat silences and streaks carry intense unspoken weight.',
      'Protective Blame Shield: Letting tweens say "My parents dock my phone at 8:30" gives them a socially safe exit.',
    ],
    actionPrompt:
      'Offer your tween a face-saving out: "Blame your 8:30 PM dock straight on us whenever you want a break!"',
    jumpChips: [
      { seconds: 360, label: '6:00 · Inside tween group-chat stress' },
      { seconds: 1320, label: '22:00 · The always-reachable double bind' },
      { seconds: 2280, label: '38:00 · Co-designing guardrails kids appreciate' },
    ],
  },
  'adolescent-validate-first-framework': {
    videoUrl: 'https://www.youtube.com/watch?v=on2iP19NlWc',
    title: "The Teenage Brain: A Neuroscientist's Survival Guide (3 Highlights)",
    presenter: 'Dr. Frances E. Jensen, MD, FACP',
    channel: 'Talks at Google',
    durationMinutes: 54,
    parentHook:
      'Jump straight to three crisp segments showing why a 14-year-old’s brain is 80% wired—and how the "Listen, Advise, or Solve?" question defuses blowups.',
    keyTakeaways: [
      'Back-to-Front Wiring: Frontal braking cables keep insulating steadily into the mid-twenties.',
      'Reward vs. Braking Gap: High reward sensitivity paired with developing brakes explains impulsive leaps.',
      'Consultant Shift: Asking before advising keeps your teen coming back to you.',
    ],
    actionPrompt:
      'Next time your teen vents, ask: "Do you want me to just listen, brainstorm, or help fix it?"',
    jumpChips: [
      { seconds: 290, label: '4:50 · Why the teen brain is 80% wired' },
      { seconds: 1260, label: '21:00 · Stress, sleep & memory consolidation' },
      { seconds: 2220, label: '37:00 · Staying their trusted frontal-lobe coach' },
    ],
  },
  'adolescent-collaborative-boundary-agreements': {
    videoUrl: 'https://www.youtube.com/watch?v=V8vLqQ3E_1w',
    title: 'Age of Opportunity: Lessons From Adolescent Science (3 Highlights)',
    presenter: 'Dr. Laurence Steinberg, PhD',
    channel: 'Woodrow Wilson School',
    durationMinutes: 62,
    parentHook:
      'Watch the famous driving-simulator study showing how peer presence doubles teen risk-taking—and how warmth plus firm structure protects teens.',
    keyTakeaways: [
      'The Peer Multiplier: Having two peers nearby activates reward centers and lowers risk perception.',
      'Warmth + Firmness: Authoritative boundaries paired with deep warmth outperform strict policing across every study.',
      'Real Safety Pacts: No-questions-asked ride-home pacts save lives without eroding trust.',
    ],
    actionPrompt:
      'Establish a guaranteed no-questions-asked pickup pact whenever your teen feels unsafe.',
    jumpChips: [
      { seconds: 420, label: '7:00 · The peer-multiplier lab experiment' },
      { seconds: 1500, label: '25:00 · Why peer approval feels so intense' },
      { seconds: 2580, label: '43:00 · High warmth + clear limits' },
    ],
  },
  'adolescent-tech-free-nightstand': {
    videoUrl: 'https://www.youtube.com/watch?v=5MuIMqhT8DM',
    title: 'How Do Teenagers Sleep Differently?',
    presenter: 'Dr. Matthew Walker, PhD',
    channel: 'Big Think',
    durationMinutes: 12,
    parentHook:
      'Your teen isn’t lazy for struggling at 7 AM—puberty shifts melatonin two hours later. See why keeping phones off nightstands protects mood and focus.',
    keyTakeaways: [
      '2-Hour Biological Delay: Pubertal circadian clocks naturally release melatonin roughly two hours later.',
      'Protecting REM Sleep: Late-night scrolling steals the emotional-repair REM cycles clustered near dawn.',
      'Sleep as Mood Armor: Even 45 extra minutes of sleep noticeably steadies teen mood and focus.',
    ],
    actionPrompt:
      'Move overnight phone charging outside bedrooms and swap in a simple analog alarm clock.',
    jumpChips: [
      { seconds: 55, label: '0:55 · The 2-hour circadian phase delay' },
      { seconds: 310, label: '5:10 · Why early mornings cut REM sleep' },
      { seconds: 530, label: '8:50 · Protecting teen bedrooms from glow' },
    ],
  },
  'teen-consultant-shift-protocol': {
    videoUrl: 'https://www.youtube.com/watch?v=CyElHdaqkjo',
    title: 'How to Raise Successful Kids — Without Over-Parenting',
    presenter: 'Julie Lythcott-Haims, JD',
    channel: 'TED',
    durationMinutes: 14,
    parentHook:
      'Micromanaging every deadline creates fragile college freshmen. Learn how stepping from Manager into Trusted Consultant builds true launch readiness.',
    keyTakeaways: [
      'Over-Parenting Cost: Rescuing every bump deprives teens of real-world problem-solving confidence.',
      'Real Chores Matter: Contributing meaningfully to household logistics predicts young-adult thriving.',
      'Warmth Before Checklists: Greet your teen with love first—not a quiz about grades or applications.',
    ],
    actionPrompt:
      'Greet your teen warmly today for five full minutes before mentioning school, deadlines, or chores.',
    jumpChips: [
      { seconds: 120, label: '2:00 · The check-listed childhood trap' },
      { seconds: 420, label: '7:00 · Why real responsibilities build agency' },
      { seconds: 670, label: '11:10 · Unconditional love over grades' },
    ],
  },
  'teen-lifelong-adult-friendship-scaffold': {
    videoUrl: 'https://www.youtube.com/watch?v=FkWfO7tZ1aE',
    title: 'Emerging Adulthood: A New Phase of the Lifespan',
    presenter: 'Dr. Jeffrey Jensen Arnett, PhD',
    channel: 'TEDxAthens',
    durationMinutes: 16,
    parentHook:
      'Ages 18–25 are a distinct developmental runway of identity and growth—see how your role evolves into an enduring adult-to-adult friendship.',
    keyTakeaways: [
      'Five Features of Emerging Adulthood: Exploration, transition, self-focus, feeling in-between, and open possibility.',
      'Longer Launch Runway: Steady mentorship beats impatient comparisons to past generations.',
      'Lifelong Bond: Respectful curiosity builds the adult friendship you will cherish for decades.',
    ],
    actionPrompt:
      'Invite your 16–18-year-old out for an adult-to-adult coffee chat with zero unsolicited advice.',
    jumpChips: [
      { seconds: 110, label: '1:50 · What emerging adulthood actually is' },
      { seconds: 460, label: '7:40 · Why exploring takes time today' },
      { seconds: 760, label: '12:40 · Shifting into adult friendship' },
    ],
  },
  'teen-deep-work-block': {
    videoUrl: 'https://www.youtube.com/watch?v=3E7hkPZ-HTk',
    title: 'Digital Minimalism & Deep Work in the Modern World (3 Highlights)',
    presenter: 'Cal Newport, PhD',
    channel: 'Talks at Google',
    durationMinutes: 44,
    parentHook:
      'Relocated here where it truly shines: jump straight to three crisp segments showing teens how undistracted focus cuts homework time in half.',
    keyTakeaways: [
      'Attention Residue: Glancing at one notification fragments study focus for up to 15 minutes afterward.',
      'Deep Work Blocks: Short 45-minute phone-in-another-room study blocks free up genuine guilt-free evening leisure.',
      'Protecting Solitude: Quiet thinking space helps teens hear their own voice amid constant feeds.',
    ],
    actionPrompt:
      'Invite your teen to test one 40-minute phone-in-another-room study block and compare how fast homework finishes.',
    jumpChips: [
      { seconds: 135, label: '2:15 · Why constant phone switching drains focus' },
      { seconds: 880, label: '14:40 · Building calm deep-work study blocks' },
      { seconds: 1690, label: '28:10 · Reclaiming quiet solitude & energy' },
    ],
  },
};

/**
 * Maps at most ONE curated Master Talk to a course's Episode Arc shelf (`featuredVideoLecture`).
 * Guarantees zero duplicate videos inside a course and aligns 1-to-1 with `academy-curriculum-relevance-audit.md`.
 */
export const COURSE_FEATURED_VIDEO_BY_MODULE_SLUG: Record<string, MasterVideoLectureDTO> = {
  'behavior-infant-coregulation': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['infant-somatic-soothing-sequence']!,
  'health-infant-sleep-foundations': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['infant-safe-sleep-and-circadian-reset']!,
  'play-infant-sensory-language': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['tummy-time-without-tears']!,
  'behavior-toddler-tantrums-co-regulation': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['toddler-floor-level-vagal-grounding']!,
  'play-toddler-locomotion-and-sensory-bins': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['toddler-climbing-crash-pad']!,
  'digital-toddler-screen-tantrums-and-coping': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['toddler-screen-free-bedroom-audit']!,
  'behavior-older-toddler-defiance-boundaries': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['older-toddler-two-choice-autonomy']!,
  'health-older-toddler-toilet-and-bedtime': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['older-toddler-toilet-readiness-test']!,
  'nutrition-older-toddler-independence-and-snacking': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['older-toddler-food-neophobia-evolution']!,
  'play-older-toddler-symbolic-play-and-blocks': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['older-toddler-open-ended-blocks']!,
  'play-preschool-executive-function': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['preschool-freeze-dance-inhibitory-control']!,
  'digital-preschool-media-curation': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['preschool-physical-timer-protocol']!,
  'play-elementary-logic-maker': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['elementary-cardboard-maker-challenge']!,
  'digital-elementary-first-gaming': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['elementary-post-game-decompression']!,
  'behavior-tween-adrenarche': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['tween-non-reactive-neutral-stance']!,
  'health-tween-circadian-leaps': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['tween-adrenarche-and-dhea-neurobiology']!,
  'digital-tween-smartphone-pacts': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['tween-bilateral-family-pact']!,
  'behavior-adolescent-identity': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['adolescent-collaborative-boundary-agreements']!,
  'health-adolescent-sleep-protection': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['adolescent-tech-free-nightstand']!,
  'play-adolescent-critical-thinking': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['adolescent-validate-first-framework']!,
  'behavior-teen-autonomy': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['teen-consultant-shift-protocol']!,
  'health-young-adult-wellness': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['teen-lifelong-adult-friendship-scaffold']!,
  'play-teen-intellectual-mastery': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['teen-deep-work-block']!,
};
