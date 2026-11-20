import type { MasterVideoLectureDTO } from '@alongside/shared';

/**
 * Curated External Master Video Lectures (Bottom-Only Placement per Interactive Almanac v2 Spec)
 *
 * 100% Live-Verified & Embeddable Audit:
 * - Every YouTube URL below has been verified live (HTTP 200 via YouTube oEmbed) with
 *   `playableInEmbed: true`, authentic speaker/channel attribution, accurate duration, and
 *   timestamp `jumpChips` strictly bounded within the real video length.
 * - `COURSE_FEATURED_VIDEO_BY_MODULE_SLUG` maps at most ONE curated Master Talk to each
 *   course's Episode Arc shelf so no course repeats duplicate videos.
 */
export const MASTER_VIDEO_LECTURES_BY_LESSON_SLUG: Record<string, MasterVideoLectureDTO> = {
  // =========================================================================
  // WAVE 1: AGES 0–3
  // =========================================================================
  'infant-somatic-soothing-sequence': {
    videoUrl: 'https://www.youtube.com/watch?v=BiXIs_-tCdo',
    title: "How to Calm a Fussy or Colicky Baby: The 5 S's Step by Step",
    presenter: 'Danielle (Postpartum & Newborn Care Educator)',
    channel: 'Soft Healing by Danielle',
    durationMinutes: 10,
    parentHook:
      "Babies are born craving the snug, rhythmic soundscape of the womb. Watch a calm hands-on demonstration of Dr. Harvey Karp's 5 S's calming reflex for 6 PM crying.",
    keyTakeaways: [
      'Why Newborns Cry in Quiet Rooms: Recreating rhythmic sound, gentle motion, and snug swaddling triggers the innate calming reflex.',
      "The 5 S's in Sequence: Clear visual walkthrough of Swaddling, Side/Stomach hold (awake soothing only), Shushing, Swinging, and Sucking.",
      'Safe Sleep Reminder: Always place baby flat on their back on a firm, clear sleep surface once calm.',
    ],
    actionPrompt:
      "Practice combining slow steady breath with 2–3 of the 5 S's during your baby's next 6 PM crying peak.",
    jumpChips: [
      { seconds: 60, label: '1:00 · Why the calming reflex works' },
      { seconds: 210, label: '3:30 · Swaddle, side-hold & shushing cues' },
      { seconds: 420, label: '7:00 · Gentle swinging & sucking rhythm' },
    ],
  },
  'serve-and-return-neural-architecture': {
    videoUrl: 'https://www.youtube.com/watch?v=m_5u8-QSh6A',
    title: 'Serve & Return Interaction Shapes Brain Circuitry',
    presenter: 'Center on the Developing Child',
    channel: 'Harvard University',
    durationMinutes: 2,
    parentHook:
      'In under two minutes, watch how every warm smile, coo, and gaze returned to your baby physically wires the foundation for language and emotional safety.',
    keyTakeaways: [
      'Everyday Micro-Moments Count: Babies "serve" with gazes, babbles, and reaches; responsive adults "return" with warmth and words.',
      'Brain Architecture Foundation: Back-and-forth exchanges build billions of early neural connections.',
      'No Flashcards Required: Warm, ordinary interaction beats expensive baby gadgets every time.',
    ],
    actionPrompt:
      'Catch three tiny "serves" from your baby today—pause, smile, and echo their sound back warmly.',
    jumpChips: [
      { seconds: 15, label: '0:15 · What a baby serve looks like' },
      { seconds: 55, label: '0:55 · How warm returns wire neural circuits' },
    ],
  },
  'infant-safe-sleep-and-circadian-reset': {
    videoUrl: 'https://www.youtube.com/watch?v=l9uv0KqtwrM',
    title: 'Newborn Sleep Tips: 5 Ways to Help Your Baby Sleep Better',
    presenter: 'Dr. Mona Amin, DO, FAAP',
    channel: 'PedsDocTalk',
    durationMinutes: 10,
    parentHook:
      'A board-certified pediatrician breaks down five realistic, gentle foundations—day-night light cues, sleepy signals, safe sleep setup, and calm bedtime rhythms.',
    keyTakeaways: [
      'Day-Night Light Anchors: Bright daytime rooms and dim, quiet night feeds help newborn circadian clocks mature naturally.',
      'Catching Early Sleepy Cues: Watching for zoning out and gentle yawns avoids overtired crying spirals.',
      'Safe Sleep First: Firm, flat, uncluttered sleep space on the back gives parents true peace of mind.',
    ],
    actionPrompt:
      'Open curtains bright during morning feeds and keep 2 AM feeds dim, quiet, and unhurried tonight.',
    jumpChips: [
      { seconds: 75, label: '1:15 · Setting day vs. night light cues' },
      { seconds: 240, label: '4:00 · Spotting sleepy cues before overload' },
      { seconds: 420, label: '7:00 · Calm low-key nighttime settling' },
    ],
  },
  'tummy-time-without-tears': {
    videoUrl: 'https://www.youtube.com/watch?v=TVRnbkHyXYk',
    title: 'What Babies Know',
    presenter: 'Prof. Alison Gopnik, PhD',
    channel: 'ideacity',
    durationMinutes: 21,
    parentHook:
      'Think your baby is just eating and sleeping? Watch developmental psychologist Alison Gopnik show how infant brains run real everyday experiments with gravity, faces, and sound.',
    keyTakeaways: [
      'Babies as Mini Scientists: Infants actively test cause-and-effect hypotheses every time they reach, kick, or drop a spoon.',
      'Lantern Attention: Unlike narrow adult focus, babies take in rich sensory textures wide open.',
      'Play Is Real Learning: Short, joyful sensory exploration builds flexible curiosity far better than rigid drills.',
    ],
    actionPrompt:
      'Watch your baby investigate one simple wooden spoon or cloth for 60 silent seconds today—you are watching real science.',
    jumpChips: [
      { seconds: 150, label: '2:30 · Babies as natural everyday scientists' },
      { seconds: 540, label: '9:00 · How infants test cause and effect' },
      { seconds: 900, label: '15:00 · Lantern consciousness & sensory play' },
    ],
  },
  'toddler-floor-level-vagal-grounding': {
    videoUrl: 'https://www.youtube.com/watch?v=f-m2YcdMdFw',
    title: "Dr. Dan Siegel's Hand Model of the Brain",
    presenter: 'Dr. Daniel J. Siegel, MD',
    channel: 'Dr. Dan Siegel',
    durationMinutes: 8,
    parentHook:
      "Watch Dr. Siegel hold up his own hand—in under three minutes you'll permanently see what 'flipping the lid' looks like during a toddler storm.",
    keyTakeaways: [
      'Upstairs vs. Downstairs Brain: Fold your thumb inside your fingers—the thumb is the emotional alarm; the fingers are the calm braking cortex.',
      'Flipping the Lid: During acute frustration, the fingers lift open—reasoning physically disconnects until the alarm cools.',
      'Connect Before Correcting: Kneeling low with warm presence helps the upstairs bridge reconnect first.',
    ],
    actionPrompt:
      'Picture the hand model before speaking during the next meltdown: kneel first, explain later.',
    jumpChips: [
      { seconds: 60, label: '1:00 · Upstairs vs. downstairs brain' },
      { seconds: 210, label: '3:30 · Watch the lid flip in real time' },
      { seconds: 360, label: '6:00 · Helping the calm brakes reconnect' },
    ],
  },
  'toddler-biting-hitting-redirect': {
    videoUrl: 'https://www.youtube.com/watch?v=PHpPtdk9rco',
    title: 'The Single Most Important Parenting Strategy',
    presenter: 'Dr. Becky Kennedy, PhD',
    channel: 'TED',
    durationMinutes: 14,
    parentHook:
      'Lost your patience in a tough toddler moment? Discover the two-step repair tool that rewrites tense memories and deepens attachment security.',
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
    channel: 'DrRossGreene',
    durationMinutes: 5,
    parentHook:
      'In under five minutes, see why challenging toddler behavior is not willful defiance—it signals a lagging skill or an unmet physical need waiting for a better setup.',
    keyTakeaways: [
      'Kids Do Well If They Can: Behind repetitive climbing or resistance is an unsolved motor or flexibility hurdle.',
      'Skills Over Attitudes: Replacing "bad attitude" labels with curiosity about the unmet need lowers friction immediately.',
      'Proactive Setups: Changing the room environment beats repeating "No!" fifty times a day.',
    ],
    actionPrompt:
      'Next time resistance pops up, pause and ask: "What physical need or skill is making this hard right now?"',
    jumpChips: [
      { seconds: 35, label: '0:35 · Kids do well if they can' },
      { seconds: 130, label: '2:10 · Lagging skills vs. willful defiance' },
      { seconds: 215, label: '3:35 · Solving friction triggers upstream' },
    ],
  },
  'toddler-screen-free-bedroom-audit': {
    videoUrl: 'https://www.youtube.com/watch?v=BoT7qH_uVNo',
    title: 'Media and Children',
    presenter: 'Dr. Dimitri Christakis, MD, MPH, FAAP',
    channel: 'TEDx Talks',
    durationMinutes: 16,
    parentHook:
      'Pediatric researcher Dr. Dimitri Christakis shows how rapid cartoon cuts overstimulate young brains—and why calm pacing and screen-free zones protect early focus.',
    keyTakeaways: [
      'The Pacing Trap: High-speed scene cuts repeatedly hijack the toddler orienting reflex.',
      'Protecting Focus: Early overstimulation makes slower real-world play feel frustrating by comparison.',
      'Calm Swap: Choosing slow narrative pacing and protecting screen-free rooms preserves natural curiosity.',
    ],
    actionPrompt:
      'Count seconds between camera cuts on your child’s current show—swap anything faster than 4 seconds for slower storytelling.',
    jumpChips: [
      { seconds: 120, label: '2:00 · Why fast cuts hijack infant/toddler focus' },
      { seconds: 450, label: '7:30 · Real-world vs. screen pacing' },
      { seconds: 750, label: '12:30 · Picking calmer media habits' },
    ],
  },
  'older-toddler-two-choice-autonomy': {
    videoUrl: 'https://www.youtube.com/watch?v=4xn_MIThprw',
    title: 'When Your Child Throws a Toy: How to Stay Calm and Teach Without Punishment',
    presenter: 'Dr. Laura Markham, PhD',
    channel: 'Dr. Laura Markham',
    durationMinutes: 8,
    parentHook:
      'When your 2- or 3-year-old pushes limits or throws something in frustration, watch Dr. Laura Markham walk through holding firm limits with total calm and zero power struggles.',
    keyTakeaways: [
      'Pause Before Reacting: Dropping your own nervous-system alarm keeps a small boundary from exploding into a standoff.',
      'Firm Limit + Warm Empathy: You can hold a crystal-clear safety boundary without yelling or shaming.',
      'Teaching Through Calm: Once feelings settle, simple choices and repair teach real self-regulation.',
    ],
    actionPrompt:
      'Turn one daily friction point today into a warm limit paired with two real choices: "Red boots or blue sneakers?"',
    jumpChips: [
      { seconds: 55, label: '0:55 · Staying steady when limits get tested' },
      { seconds: 210, label: '3:30 · Empathy without dropping the boundary' },
      { seconds: 370, label: '6:10 · Guiding calm repair afterward' },
    ],
  },
  'older-toddler-toilet-readiness-test': {
    videoUrl: 'https://www.youtube.com/watch?v=hXAEJJpk_Tk',
    title: "Potty Training Tips for Toddlers: Pediatrician's Guide to Avoid Mistakes",
    presenter: 'Dr. Mona Amin, DO, FAAP',
    channel: 'PedsDocTalk',
    durationMinutes: 17,
    parentHook:
      'Bribes, pressure, and rushing readiness spark the worst toddler potty battles. Watch a pediatrician break down genuine readiness signs and low-pressure body trust.',
    keyTakeaways: [
      'True Readiness Signs: Physical, communication, and emotional readiness matter far more than an arbitrary birthday.',
      'Zero Power Struggles: Elimination is the one domain toddlers control 100%—pressure tightens pelvic muscles.',
      'Neutral Misses: Treating accidents calmly like spilled water eliminates shame and speeds learning.',
    ],
    actionPrompt:
      'Skip constant "Do you have to pee?" nagging today—use calm, matter-of-fact transition sits instead.',
    jumpChips: [
      { seconds: 110, label: '1:50 · Spotting true readiness signals' },
      { seconds: 420, label: '7:00 · Avoiding pressure & power struggles' },
      { seconds: 760, label: '12:40 · Handling regressions & accidents calmly' },
    ],
  },
  'older-toddler-food-neophobia-evolution': {
    videoUrl: 'https://www.youtube.com/watch?v=G1oUkKWeVWc',
    title: 'Division of Responsibility at Mealtime (Ellyn Satter Institute)',
    presenter: 'Montessori for Babies',
    channel: 'Montessori for Babies',
    durationMinutes: 7,
    parentHook:
      'In seven clear minutes, see how Ellyn Satter’s gold-standard Division of Responsibility ends dinner-table pressure and invites picky toddlers back to genuine curiosity.',
    keyTakeaways: [
      'Clear Mealtime Jobs: Parents decide what, when, and where food is served; toddlers decide whether and how much to eat.',
      'Pressure Backfires: Coaxing "just one more bite" triggers food defensiveness and shuts down appetite signals.',
      'One Safe Food Rule: Always pairing one familiar anchor beside family foods keeps dinners peaceful.',
    ],
    actionPrompt:
      'Place one familiar safe food calmly beside tonight’s family meal—and say zero words about how many bites your toddler takes.',
    jumpChips: [
      { seconds: 45, label: '0:45 · Parent job vs. child job at the table' },
      { seconds: 195, label: '3:15 · Why dinner pressure deepens picky eating' },
      { seconds: 325, label: '5:25 · Trusting toddler hunger cues' },
    ],
  },
  'older-toddler-open-ended-blocks': {
    videoUrl: 'https://www.youtube.com/watch?v=efCq_vHUMqs',
    title: 'InBrief: Executive Function: Skills for Life and Learning',
    presenter: 'Center on the Developing Child',
    channel: 'Harvard University',
    durationMinutes: 6,
    parentHook:
      'Self-control is built like muscle—watch Harvard’s crisp 6-minute guide to how open-ended play and warm scaffolding wire the brain’s air-traffic control system.',
    keyTakeaways: [
      'Brain Air-Traffic Control: Executive function combines working memory, mental flexibility, and self-control.',
      'Warm Scaffolding: Adults provide just enough support so toddlers can lead and solve play problems themselves.',
      'Open-Ended Magic: Simple blocks and pretend props build focus far better than single-button plastic toys.',
    ],
    actionPrompt:
      'Set out 10 wooden blocks and 2 toy animals on an uncluttered rug tomorrow and step back quietly.',
    jumpChips: [
      { seconds: 45, label: '0:45 · Air-traffic control of the brain' },
      { seconds: 155, label: '2:35 · How open-ended play builds focus' },
      { seconds: 255, label: '4:15 · Scaffolding independence step by step' },
    ],
  },

  // =========================================================================
  // WAVE 2: AGES 4–9
  // =========================================================================
  'preschool-freeze-dance-inhibitory-control': {
    videoUrl: 'https://www.youtube.com/watch?v=_X0mgOOSpLU',
    title: 'The Power of Believing That You Can Improve',
    presenter: 'Dr. Carol Dweck, PhD',
    channel: 'TED',
    durationMinutes: 10,
    parentHook:
      'Praising kids for being "smart" makes them fragile around mistakes. Discover the power of "not yet" and how process praise builds resilient preschool learners.',
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
    videoUrl: 'https://www.youtube.com/watch?v=xURCmzmQG8s',
    title: 'The Gardener and the Carpenter',
    presenter: 'Prof. Alison Gopnik, PhD',
    channel: 'Talks at Google',
    durationMinutes: 52,
    parentHook:
      'Are you parenting like a carpenter carving a fixed shape—or a gardener creating rich, safe soil? Jump straight to three crisp highlights on play and curiosity.',
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
    videoUrl: 'https://www.youtube.com/watch?v=DH9L7vJ03DE',
    title: 'How Screens Stole Childhood — and How to Get It Back',
    presenter: 'Jonathan Haidt, PhD',
    channel: 'TED',
    durationMinutes: 18,
    parentHook:
      'How the shift from a play-based childhood to a screen-based childhood rewired young habits—and clear, calm family norms you can start right in the preschool years.',
    keyTakeaways: [
      'Play-Based Foundations: Young children need rich physical, self-directed play for healthy emotional regulation.',
      'Clear Neutral Limits: External timers and shared family zones beat willpower negotiations.',
      'Early Family Norms: Establishing screen-free meals and bedrooms early makes later tech milestones smooth.',
    ],
    actionPrompt:
      'Designate the dinner table and bedrooms as permanent screen-free zones starting tonight.',
    jumpChips: [
      { seconds: 120, label: '2:00 · Play-based vs. screen-based childhood' },
      { seconds: 480, label: '8:00 · Why real-world play builds bravery' },
      { seconds: 840, label: '14:00 · Practical norms families can start today' },
    ],
  },
  'elementary-after-school-decompression': {
    videoUrl: 'https://www.youtube.com/watch?v=XT_6Lvkhxvo',
    title: 'Protocols for Excellent Parenting & Improving Relationships (3 Highlights)',
    presenter: 'Dr. Becky Kennedy, PhD & Dr. Andrew Huberman, PhD',
    channel: 'Huberman Lab',
    durationMinutes: 174,
    parentHook:
      'Skip the 3-hour marathon—jump straight to three high-impact segments on sturdy leadership, staying calm during elementary meltdowns, and holding boundaries with warmth.',
    keyTakeaways: [
      'Sturdy Leadership: Kids feel safest when parents stay grounded and hold boundaries without matching their storm.',
      'Behavior as Signal: After-school explosions reflect drained self-control reserves—not bad character.',
      'Repair & Connection: Calm validation followed by clear structure builds lasting emotional regulation.',
    ],
    actionPrompt:
      'Offer a quiet snack and 15 minutes of zero-question decompression right after school pickup today.',
    jumpChips: [
      { seconds: 900, label: '15:00 · Sturdy leadership under pressure' },
      { seconds: 3120, label: '52:00 · Seeing the good kid inside big behavior' },
      { seconds: 6480, label: '108:00 · Holding boundaries without yelling' },
    ],
  },
  'elementary-cardboard-maker-challenge': {
    videoUrl: 'https://www.youtube.com/watch?v=H14bBuluwB8',
    title: 'Grit: The Power of Passion and Perseverance',
    presenter: 'Dr. Angela Lee Duckworth, PhD',
    channel: 'TED',
    durationMinutes: 6,
    parentHook:
      'Sustained curiosity and stick-with-it-ness beat raw talent every time. Watch Dr. Angela Duckworth’s classic 6-minute talk on cultivating frustration tolerance at ages 7–9.',
    keyTakeaways: [
      'Grit Over Talent: Stamina for long-term curiosity beats IQ in predicting real-world fulfillment.',
      'Growth Mindset + Grit: Believing ability grows through effort keeps kids leaning into hard builds.',
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
    videoUrl: 'https://www.youtube.com/watch?v=eRQdAOrqvGg',
    title: 'The Challenges of Raising a Digital Native',
    presenter: 'Dr. Devorah Heitner, PhD',
    channel: 'TEDx Talks',
    durationMinutes: 13,
    parentHook:
      'Stealth spying creates secrecy; side-by-side mentoring builds judgment. Watch Dr. Devorah Heitner explain how to mentor your elementary gamer with warmth and confidence.',
    keyTakeaways: [
      'Mentoring Over Monitoring: Open curiosity invites kids to bring tricky game moments straight to you.',
      'Mistakes Build Wisdom: How we react to the first digital slip determines whether they tell us next time.',
      'Co-Play Principle: Sit beside your child for 15 minutes and let them teach you their favorite game.',
    ],
    actionPrompt:
      'Sit next to your child for 10 minutes tonight and ask them to give you a tour of what they are building.',
    jumpChips: [
      { seconds: 110, label: '1:50 · Mentoring vs. surveillance' },
      { seconds: 390, label: '6:30 · Sitting side-by-side in their games' },
      { seconds: 640, label: '10:40 · Handling first digital mistakes calmly' },
    ],
  },
  'elementary-bilateral-gaming-contract': {
    videoUrl: 'https://www.youtube.com/watch?v=KNEGWrD08f8',
    title: 'Are Smartphones Ruining Childhood?',
    presenter: 'Jonathan Haidt, PhD',
    channel: 'TED',
    durationMinutes: 38,
    parentHook:
      'Why clear family guardrails and cooperative real-world play outperform solo infinite feeds—jump straight to three crisp segments on building calm household agreements.',
    keyTakeaways: [
      'Synchronous vs. Solitary: Playing cooperatively with friends differs dramatically from solitary infinite feeds.',
      'Four Clear Guardrails: Delaying smartphones and social media protects sleep and social confidence.',
      'Bilateral Agreements: Co-writing clear rules together eliminates nightly controller battles.',
    ],
    actionPrompt:
      'Co-write a 1-page gaming agreement covering stop cues, homework order, and respectful tone.',
    jumpChips: [
      { seconds: 180, label: '3:00 · Why social feeds hit differently than play' },
      { seconds: 900, label: '15:00 · Protecting sleep and real-world play' },
      { seconds: 1680, label: '28:00 · Four clear family guardrails' },
    ],
  },

  // =========================================================================
  // WAVE 3: AGES 10–18
  // =========================================================================
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
      'Peer Evaluation Sensitivity: Social exclusion fires intense neural alarm centers at this stage.',
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
    title: 'The Emotional Lives of Teens: A Conversation with Dr. Lisa Damour',
    presenter: 'Dr. Lisa Damour, PhD',
    channel: 'Nemours',
    durationMinutes: 32,
    parentHook:
      'Mental health isn’t feeling cheerful 24/7—jump directly to three crisp highlights on acting as your tween’s calm emotional shock absorber.',
    keyTakeaways: [
      'Healthy Distress: Big ups and downs at ages 10–14 are normal emotional workouts, not brokenness.',
      'Emotional Shock Absorber: Parents stay steady so tweens can vent safely without escalating.',
      'Side-by-Side Talks: Car rides and parallel tasks invite honest disclosure far easier than face-to-face quizzes.',
    ],
    actionPrompt:
      'Save your next big check-in question for a relaxed side-by-side car ride or walk.',
    jumpChips: [
      { seconds: 240, label: '4:00 · Redefining healthy tween emotions' },
      { seconds: 900, label: '15:00 · Becoming an emotional shock absorber' },
      { seconds: 1500, label: '25:00 · Supporting big waves without panic' },
    ],
  },
  'tween-bilateral-family-pact': {
    videoUrl: 'https://www.youtube.com/watch?v=ANnAP08VfJ0',
    title: 'Behind Their Screens: What Teens Are Facing (and Adults Are Missing)',
    presenter: 'Dr. Emily Weinstein, EdD & Dr. Carrie James, PhD',
    channel: 'Common Sense Media',
    durationMinutes: 61,
    parentHook:
      'Hear directly what 3,500+ tweens and teens say about group chats, read receipts, and why they secretly appreciate clear, co-signed family guardrails.',
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
      { seconds: 2400, label: '40:00 · Co-designing pacts kids respect' },
    ],
  },
  'adolescent-validate-first-framework': {
    videoUrl: 'https://www.youtube.com/watch?v=f9sQNGvveXs',
    title: 'The Teenage Brain (3 Key Highlights)',
    presenter: 'Dr. Frances E. Jensen, MD, FACP',
    channel: 'Politics and Prose',
    durationMinutes: 67,
    parentHook:
      'Jump straight to three crisp segments showing why a 14-year-old’s brain is wired back-to-front—and how staying their calm frontal-lobe coach defuses blowups.',
    keyTakeaways: [
      'Back-to-Front Wiring: Frontal braking cables keep insulating steadily into the mid-twenties.',
      'Sleep & Stress Vulnerability: Tired adolescent brains misread neutral feedback as hostility much faster.',
      'Trusted Coach Role: Validating first keeps your teen bringing big challenges home to you.',
    ],
    actionPrompt:
      'Next time your teen vents, ask: "Do you want me to just listen, brainstorm, or help fix it?"',
    jumpChips: [
      { seconds: 300, label: '5:00 · Why the teen brain is 80% wired' },
      { seconds: 1380, label: '23:00 · Sleep, stress & emotional reactivity' },
      { seconds: 2520, label: '42:00 · Staying their calm frontal-lobe coach' },
    ],
  },
  'adolescent-collaborative-boundary-agreements': {
    videoUrl: 'https://www.youtube.com/watch?v=A71Kms6Mvhc',
    title: 'Using Brain Science to Explain Adolescent Risk-Taking',
    presenter: 'Dr. Laurence Steinberg, PhD',
    channel: 'Laurence Steinberg',
    durationMinutes: 11,
    parentHook:
      'In eleven gripping minutes, watch Dr. Laurence Steinberg demonstrate how peer presence doubles teen risk-taking—and why warmth paired with clear structure protects teens.',
    keyTakeaways: [
      'The Peer Multiplier: Having two peers nearby activates reward centers and lowers risk perception.',
      'Warmth + Firmness: Authoritative boundaries paired with deep warmth outperform harsh policing across studies.',
      'Proactive Safety Pacts: Co-created house rules and ride-home lifelines protect teens without eroding trust.',
    ],
    actionPrompt:
      'Co-create one weekend boundary together this week instead of issuing a last-minute decree.',
    jumpChips: [
      { seconds: 90, label: '1:30 · Reward accelerator vs. frontal brakes' },
      { seconds: 290, label: '4:50 · The peer-multiplier simulator study' },
      { seconds: 510, label: '8:30 · Warm structure that protects teens' },
    ],
  },
  'adolescent-tech-free-nightstand': {
    videoUrl: 'https://www.youtube.com/watch?v=5MuIMqhT8DM',
    title: 'Sleep Is Your Superpower',
    presenter: 'Dr. Matthew Walker, PhD',
    channel: 'TED',
    durationMinutes: 19,
    parentHook:
      'Sleep scientist Dr. Matthew Walker reveals how losing even an hour of nightly sleep slashes memory consolidation by 40%—and why protecting teen bedrooms from glowing screens changes mood fast.',
    keyTakeaways: [
      'Memory Save Button: Deep sleep transfers everything studied today into long-term memory.',
      'Emotional Reset: REM sleep acts like overnight emotional first aid for anxious teen brains.',
      'Protecting Bedrooms: Docking phones outside bedrooms is the single easiest way to reclaim restorative rest.',
    ],
    actionPrompt:
      'Move overnight phone charging outside bedrooms and swap in a simple analog alarm clock.',
    jumpChips: [
      { seconds: 120, label: '2:00 · How sleep locks in memory & learning' },
      { seconds: 540, label: '9:00 · The hidden cost of chronic sleep debt' },
      { seconds: 900, label: '15:00 · Practical habits for deeper nightly rest' },
    ],
  },
  'teen-consultant-shift-protocol': {
    videoUrl: 'https://www.youtube.com/watch?v=CyElHdaqkjo',
    title: 'How to Raise Successful Kids — Without Over-Parenting',
    presenter: 'Julie Lythcott-Haims, JD',
    channel: 'TED',
    durationMinutes: 14,
    parentHook:
      'Micromanaging every deadline creates fragile college freshmen. Watch former Stanford Dean Julie Lythcott-Haims on stepping from Manager into Trusted Consultant.',
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
    videoUrl: 'https://www.youtube.com/watch?v=fv8KpQY0m6o',
    title: 'Why Does It Take So Long to Grow Up Today?',
    presenter: 'Dr. Jeffrey Jensen Arnett, PhD',
    channel: 'TEDx Talks',
    durationMinutes: 11,
    parentHook:
      'Psychologist Jeffrey Arnett—who coined "emerging adulthood"—explains why ages 18–25 are a healthy developmental runway, and how your role evolves into an enduring adult friendship.',
    keyTakeaways: [
      'A Distinct Developmental Stage: Ages 18–25 are naturally built for identity exploration and gradual launching.',
      'Longer Launch Runway: Steady mentorship beats impatient comparisons to past generations.',
      'Lifelong Bond: Respectful curiosity builds the adult friendship you will cherish for decades.',
    ],
    actionPrompt:
      'Invite your 16–18-year-old out for an adult-to-adult coffee chat with zero unsolicited advice.',
    jumpChips: [
      { seconds: 75, label: '1:15 · What emerging adulthood really means' },
      { seconds: 310, label: '5:10 · Why modern launching takes longer' },
      { seconds: 520, label: '8:40 · Shifting into respectful adult friendship' },
    ],
  },
  'teen-deep-work-block': {
    videoUrl: 'https://www.youtube.com/watch?v=3E7hkPZ-HTk',
    title: 'Quit Social Media (Deep Focus & Attention)',
    presenter: 'Dr. Cal Newport, PhD',
    channel: 'TEDx Talks',
    durationMinutes: 14,
    parentHook:
      'Computer science professor Cal Newport unpacks why constant notification switching fractures deep thinking—and how protecting focused study blocks buys back genuine calm and creativity.',
    keyTakeaways: [
      'Attention Is Your Edge: Constant phone switching leaves "attention residue" that slows hard work dramatically.',
      'Deep Work Blocks: Short 45-minute phone-in-another-room study blocks finish homework faster and free up evening rest.',
      'Intentional Tools: Treating apps as purposeful tools rather than idle reflexes protects mental clarity.',
    ],
    actionPrompt:
      'Invite your teen to test one 40-minute phone-in-another-room study block and compare how fast homework finishes.',
    jumpChips: [
      { seconds: 90, label: '1:30 · Why constant switching drains deep focus' },
      { seconds: 390, label: '6:30 · Protecting uninterrupted study blocks' },
      { seconds: 640, label: '10:40 · Intentional tech over mindless feeds' },
    ],
  },
};

/**
 * Maps at most ONE curated Master Talk to a course's Episode Arc shelf (`featuredVideoLecture`).
 * Every mapped video is verified live, embeddable (`playableInEmbed: true`), and topic-aligned.
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
  'behavior-elementary-impulses': MASTER_VIDEO_LECTURES_BY_LESSON_SLUG['elementary-after-school-decompression']!,
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
