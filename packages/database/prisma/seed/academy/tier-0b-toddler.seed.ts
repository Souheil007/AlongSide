import {
  AcademyCategory,
  AlmanacVisualType,
  DevelopmentalTier,
  EditorialIllustrationKey,
  EpisodeRole,
  LessonArchetype,
} from '@alongside/shared';
import { buildBespokeCourse } from './almanacBuilder.js';
import type { AcademyModuleSeedData } from './types.js';

export const TIER_0B_TODDLER_MODULES: AcademyModuleSeedData[] = [
  // ===========================================================================
  // COURSE 6: Big Toddler Feelings, Biting & Calm Anchoring (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'behavior-toddler-tantrums-co-regulation',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    developmentalTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
    title: 'Big Toddler Feelings, Biting & Calm Anchoring',
    reliefSubtitle:
      'Stay steady in the first 10 seconds of a meltdown, catch hunger/tiredness triggers early, and stop hitting or biting without shaming',
    tonightQuickWinTitle: 'Episode 1: What to Do in the First 10 Seconds of a Toddler Meltdown',
    summary:
      'Understand why one-year-olds erupt physically before words arrive, anchor big feelings on the floor, anticipate HALT fatigue dips, and redirect biting and hitting with calm clarity.',
    coverImageUrl: 'https://assets.alongside.care/academy/behavior-toddler.png',
    sortOrder: 2,
    episodes: [
      {
        slug: 'toddler-floor-level-vagal-grounding',
        title: 'What to Do in the First 10 Seconds of a Toddler Meltdown',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.cup,
          illustrationCaption: 'Floor-level anchor · Fewer than 8 slow words',
          headline: 'What to Do in the First 10 Seconds of a Toddler Meltdown',
          deck: 'Why kneeling down and cutting your word count to eight quiet words melts an 18-month-old storm twice as fast as reasoning.',
          sceneTime: '5:20 PM · LIVING ROOM RUG',
          sceneBody:
            'You gently take away the car keys {name} shouldn’t chew on. Instantly {pronoun} collapses onto the floor, kicking both heels and wailing so hard {poss} breath hitches. *Standing over {obj} explaining “keys are dirty” only makes the volume climb.*',
          pollQuestion: 'Do sudden floor collapses catch you off guard this week?',
          pollOptions: [
            {
              id: 'daily',
              label: 'Yes—multiple times a day!',
              response:
                'Welcome to 12–24 months: {possessive} desires just grew ten times faster than {poss} vocabulary. Floor-level calm gives {obj} the safety net {poss} words can’t provide yet.',
            },
            {
              id: 'public',
              label: 'Mostly at the worst possible moments',
              response:
                'Having one automatic 10-second move (kneel, exhale, 6 short words) works identically in your kitchen or grocery aisle.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mind',
          beat2Title: 'Your posture speaks louder than your words',
          beat2Lead:
            'When an adult towers overhead speaking fast, a flooded toddler brain reads “danger.” Toggle below to compare standing logic vs. floor-level co-regulation.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Floor-level calm vs. towering escalation',
          visualStageHint: 'Toggle settled anchor vs. mid-storm alarm',
          visualConfig: {
            calmToggleLabel: 'Kneeling · Slow low voice',
            stormToggleLabel: 'Towering · Fast reasoning',
            calmStatus: 'SAFETY SIGNAL RECEIVED',
            stormStatus: 'THREAT ALARM AMPLIFIED',
            calmReadouts: [
              {
                name: 'Body Posture Cue',
                value: 'Below eye level',
                tone: 'spruce',
                desc: 'Kneeling drops physical dominance so {possessive} nervous system stops bracing against you.',
              },
              {
                name: 'Word Load',
                value: 'Under 8 words',
                tone: 'spruce',
                desc: 'Short, warm phrases match what a young toddler brain can actually process during tears.',
              },
            ],
            stormReadouts: [
              {
                name: 'Vocal Speed & Height',
                value: 'Loud & towering',
                tone: 'amber',
                desc: 'Rapid explanations from standing height stack auditory noise onto an already overloaded alarm.',
              },
              {
                name: 'Reasoning Bandwidth',
                value: 'Temporarily 0%',
                tone: 'amber',
                desc: 'At 12–24 months, {name} has big feelings with almost no internal brakes or sentences yet.',
              },
            ],
          },
          almanacTruth:
            'In the first ten seconds of a toddler meltdown, drop below eye level, exhale slowly, and keep your words under eight syllables—connection opens ears later.',
          scienceDeepDive:
            'During acute toddler distress, sympathetic activation suppresses ventral vagal social engagement. Lowering caregiver eye level reduces looming visual threat cues, while slow prosodic vocalization under 8 words supports autonomic down-regulation through co-regulated neuroception.',
          beat3Kicker: 'Practice the first 10 seconds',
          beat3Title: 'Holding the limit without arguing with a 1-year-old',
          rehearsalTriggerSpeaker: '{Name} arches backward over the taken-away keys',
          rehearsalTriggerQuote: '“*WAAAAH!* KEYS! MINE!”',
          rehearsalPrompt: 'Which split-second reflex tends to slip out first?',
          instincts: [
            {
              id: 'explain',
              label:
                '“Keys have germs and sharp edges, sweetie, you can’t put them in your mouth—stop crying!”',
              whyTitle: 'Why that’s so tempting—and what {name} hears',
              whyText:
                'It’s 100% accurate! Yet sixteen fast words sound like static to a sobbing toddler, and “stop crying” teaches {obj} to cry louder to prove how upset {pronoun} feels.',
            },
            {
              id: 'cave',
              label:
                'Hand the keys right back for five minutes just to make the screaming stop.',
              whyTitle: 'Why that’s so tempting—and what happens tomorrow',
              whyText:
                'Instant quiet is tempting when your ears ring—yet handing back a boundary item teaches {poss} clever brain that floor-screaming unlocks forbidden treasures.',
            },
          ],
          calmScriptPlain:
            '“(Kneel down calmly, open palms) Mad about keys. Keys stay up. I’m right here.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'kneel',
              text: '(Kneel down calmly, open palms) Mad about keys.',
              tag: 'Names Feeling',
              note: 'Three simple words tell {name} you understood {poss} heart—immediately taking wind out of the protest.',
            },
            { text: ' ' },
            {
              id: 'limit',
              text: 'Keys stay up.',
              tag: 'Steady Wall',
              note: 'Holds the safety limit calmly like gravity—no debate, no anger.',
            },
            { text: ' ' },
            {
              id: 'here',
              text: 'I’m right here.',
              tag: 'Safe Harbor',
              note: 'Stays warm beside {obj} while the 90-second wave crests and fades.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Drop to one knee immediately',
            'Keep phrases 3–6 words max',
            'Offer a joyful swap once breathing slows',
          ],
          pushbacks: [
            {
              id: 'pushesaway',
              label: '“{Pronoun} pushes my hug away while crying”',
              setup:
                'Give {obj} two feet of breathing space while staying right beside {obj} on the floor:',
              script:
                '“Space for your body. I’m sitting right here on the rug whenever you want my lap.”',
            },
            {
              id: 'headbang',
              label: '“{Pronoun} flings {poss} head back toward the hard floor”',
              setup:
                'Slide a soft pillow or your open palm gently beneath {poss} head without big alarm:',
              script:
                '“I’ll keep your head safe on this cushion while your mad feeling comes out.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) collapses crying every time I take away an unsafe object—what calm 2-step swaps work best for a young toddler?”',
          beat4Kicker: 'Today’s 10-second shift',
          beat4Title: 'Pick one calm anchor for the next big protest',
          beat4Lead:
            'Practice this tiny physical reflex once today and notice how fast your own pulse drops too.',
          moves: [
            {
              id: 'kneelfirst',
              title: 'Drop to one knee before saying a single word',
              desc: 'Let your lowered posture do half the calming before your voice even enters the room.',
            },
            {
              id: 'sixwords',
              title: 'Use the 6-word maximum during tears',
              desc: '“Mad about keys. Keys stay safe. I’m here.” Save explanations for after the storm.',
            },
            {
              id: 'swapready',
              title: 'Trade unsafe items for one concrete “yes” object',
              desc: 'Once {poss} breathing slows, offer a real wooden spoon or silicone toy ring {pronoun} CAN hold.',
            },
          ],
          closingNote:
            'A toddler collapsing over car keys isn’t testing your authority—{pronoun} is practicing surviving disappointment for the very first time in {poss} life, with your calm knee right beside {obj}.',
          pocketInsight:
            'First 10 seconds of a toddler meltdown: drop to one knee, exhale slowly, hold the boundary in 6 calm words, and save swaps for after breathing slows.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Why does an 18-month-old’s brain physically disconnect from logic the second frustration spikes?”',
            title: 'Why Logic Doesn’t Work Mid-Tantrum (Gas Pedal vs. Brakes)',
            targetSlug: 'toddler-amygdala-without-brakes',
          },
          interactiveHighlights: ['Floor-Anchor Visual', '6-Word Calm Script'],
        },
      },
      {
        slug: 'toddler-amygdala-without-brakes',
        title: 'Why Logic Doesn’t Work Mid-Tantrum (Gas Pedal vs. Brakes)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.cup,
          illustrationCaption: 'Age 1–2 · Big gas pedal, tiny early brakes',
          headline: 'Why Logic Doesn’t Work Mid-Tantrum (Gas Pedal vs. Brakes)',
          deck: 'Why {name} isn’t “ignoring you” when upset—and how seeing the two-part brain architecture permanently melts parental frustration.',
          sceneTime: '4:45 PM · KITCHEN TILE',
          sceneBody:
            'A banana snaps cleanly in half. {Name} stares at the two pieces in pure heartbreak, sobbing uncontrollably. You calmly explain *“It tastes the exact same!”*—and somehow that makes {obj} cry even harder. *Why can’t simple logic land?*',
          pollQuestion: 'Have tiny absurd triggers (broken banana, wrong socks) ever baffled you?',
          pollOptions: [
            {
              id: 'allthetime',
              label: 'Yes—broken bananas are a daily crisis!',
              response:
                'To a one-year-old whose brain thrives on predictability, a broken banana genuinely feels like the rules of the universe cracked! Seeing the brain hardware explains everything.',
            },
            {
              id: 'wondering',
              label: 'Wondering when reasoning actually starts working',
              response:
                'Real impulse-braking pathways don’t kick in meaningfully until ages 3.5 to 4—and keep maturing into the twenties. Right now, YOU are the borrowed brake.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mind',
          beat2Title: 'Supercharged emotional gas pedal, brand-new brakes',
          beat2Lead:
            'At 12–24 months, the emotional alarm downstairs is 100% wired at full power, while the upstairs logic cortex has barely broken ground. Toggle calm vs. storm below.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Upstairs logic bridge vs. downstairs alarm',
          visualStageHint: 'Toggle to see why explanations bounce off mid-storm',
          visualConfig: {
            calmToggleLabel: 'Calm morning snack',
            stormToggleLabel: 'Broken-banana storm',
            calmStatus: 'UPSTAIRS & DOWNSTAIRS LINKED',
            stormStatus: 'LID FLIPPED · CONNECT FIRST',
            calmReadouts: [
              {
                name: 'Upstairs Logic & Words',
                value: 'Online',
                tone: 'spruce',
                desc: 'When rested and fed, {name} can follow simple choices, wave bye-bye, and practice gentle hands.',
              },
              {
                name: 'Downstairs Alarm Core',
                value: 'Steady',
                tone: 'spruce',
                desc: 'Calm baseline lets curiosity and early language flourish.',
              },
            ],
            stormReadouts: [
              {
                name: 'Upstairs Logic & Words',
                value: 'Offline',
                tone: 'amber',
                desc: 'Explaining “it tastes the same!” physically cannot cross the disconnected bridge until tears peak and slow.',
              },
              {
                name: 'Downstairs Alarm Core',
                value: '100% Full Gas',
                tone: 'amber',
                desc: 'Genuinely experiences a snapped banana as overwhelming grief—not manipulation.',
              },
            ],
          },
          almanacTruth:
            'Your toddler isn’t refusing to be reasonable—during a meltdown the reasoning highway is literally unplugged. Warm presence reconnects the bridge; logic waits for calm.',
          scienceDeepDive:
            'In toddlers aged 12–24 months, subcortical limbic structures (amygdala, hypothalamus) are functionally robust while ventromedial prefrontal inhibitory projections remain largely unmyelinated. Acute norepinephrine release temporarily disconnects nascent cortical processing until sympathetic tone subsides.',
          beat3Kicker: 'Meeting the feeling without fixing reality',
          beat3Title: 'What to say over a broken banana',
          rehearsalTriggerSpeaker: '{Name} sobbing at two halves of a banana',
          rehearsalTriggerQuote: '“NO!! FIX IT! PUT IT BACK!!”',
          rehearsalPrompt: 'Which instinct makes both of you feel more stuck?',
          instincts: [
            {
              id: 'debate',
              label:
                '“I can’t glue a banana back together! You’re being silly—just eat it!”',
              whyTitle: 'Why that’s so natural—and what {name} feels',
              whyText:
                'Of course bananas can’t be glued! Calling genuine tiny heartbreak “silly” makes {obj} feel alone inside a big scary wave.',
            },
            {
              id: 'newbanana',
              label:
                'Race to peel three fresh bananas hoping one stays 100% unbroken.',
              whyTitle: 'Why that’s tempting—and why riding out one tiny grief helps',
              whyText:
                'Sometimes grabbing another banana is totally fine! Yet letting {name} safely feel one small disappointment with your warm arm around {obj} builds real emotional muscle.',
            },
          ],
          calmScriptPlain:
            '“Aw, it broke! You really wanted one big whole banana. That feels so sad. I’m holding you while it feels sad.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'mirror',
              text: 'Aw, it broke! You really wanted one big whole banana.',
              tag: 'Joins Reality',
              note: 'Matches {possessive} disappointment with gentle sincerity—zero mocking, zero frantic fixing.',
            },
            { text: ' ' },
            {
              id: 'hold',
              text: 'That feels so sad. I’m holding you while it feels sad.',
              tag: 'Rides the Wave',
              note: 'Most pure toddler grief waves crest and finish in 60–90 seconds when we stop arguing with them.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Validate the tiny disappointment warmly',
            'Don’t rush to fix every broken cracker',
            'Let the 90-second wave pass beside you',
          ],
          pushbacks: [
            {
              id: 'laughs',
              label: '“Honestly I sometimes want to laugh because it’s just a banana!”',
              setup:
                'Totally human! Just tuck the smile gently until afterward so {name} feels taken seriously:',
              script:
                '“Big feelings over little bananas are hilarious in hindsight—giving 30 seconds of warm empathy first dissolves it way faster than laughing.”',
            },
            {
              id: 'afterwave',
              label: '“What do I do once the crying stops?”',
              setup:
                'Once {poss} breath catches with a little sigh, move cheerfully forward—zero post-mortem lecture:',
              script:
                '“Deep breath… all better. Want to dip one half in yogurt or hold both pieces like drumsticks?”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) melts down intensely over tiny daily changes—how can I validate feelings without giving in to unreasonable demands?”',
          beat4Kicker: 'Today’s perspective shift',
          beat4Title: 'Pick one “borrowed brakes” habit to try next',
          beat4Lead:
            'Remembering the brain bridge makes the next broken cracker strangely peaceful.',
          moves: [
            {
              id: 'holdhand',
              title: 'Picture Dr. Siegel’s “flipped lid” before reacting',
              desc: 'When tears explode over something tiny, remind yourself silently: “Lid is flipped—warmth now, words later.”',
            },
            {
              id: 'ninetysec',
              title: 'Ride out one small disappointment without fixing it',
              desc: 'Hold {name} warmly for 90 seconds over a snapped cracker instead of grabbing a fresh one—watch resilience grow.',
            },
            {
              id: 'nolecture',
              title: 'Skip the post-tantrum lecture',
              desc: 'The moment {poss} breathing settles, offer a sip of water and pivot gently back to play.',
            },
          ],
          closingNote:
            'When you stay warm through a broken-banana storm without mocking or panicking, you teach {name} something priceless: big sad feelings are completely survivable, and love never disappears when lids flip.',
          pocketInsight:
            'Logic cannot cross a flipped lid at ages 1–2. Name the tiny disappointment warmly, stay steady for 90 seconds, and skip the lecture afterward.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“Why do 70% of toddler meltdowns cluster right around 11:15 AM and 5:15 PM—and how can you dodge them?”',
            title: 'Catching Meltdowns Early: Hunger, Tiredness & Overload',
            targetSlug: 'toddler-halt-metabolic-audit',
          },
          interactiveHighlights: ['Gas vs. Brakes SVG', '90-Second Wave Ride'],
        },
      },
      {
        slug: 'toddler-halt-metabolic-audit',
        title: 'Catching Meltdowns Early: Hunger, Tiredness & Overload',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Pre-empting the 11 AM & 5 PM fuel dips',
          headline: 'Catching Meltdowns Early: Hunger, Tiredness & Overload',
          deck: 'How checking four biological batteries (Hungry, Angry/Overstimulated, Lonely, Tired) prevents half of daily toddler storms before they start.',
          sceneTime: '5:15 PM · WHILE COOKING DINNER',
          sceneBody:
            'Dinner is twenty minutes away and {name} suddenly melts down clinging to your jeans, throwing wooden blocks, and weeping over nothing. *It looks like sudden defiance—until you realize lunch was four hours ago and blood sugar just hit the floor.*',
          pollQuestion: 'Do your hardest toddler hours cluster at the exact same times every day?',
          pollOptions: [
            {
              id: 'witching',
              label: 'Yes—late afternoon is rough almost daily',
              response:
                'Tiny toddler livers store far less glucose than adults, so blood sugar and sensory stamina plummet right between 4:30 and 5:30 PM.',
            },
            {
              id: 'errands',
              label: 'Mostly when errands stretch past snack or nap time',
              response:
                'Packing one protein-fat bridge snack and watching the 3-hour fuel rhythm turns errand blowups into smooth trips.',
            },
          ],
          beat2Kicker: 'Preventing storms upstream',
          beat2Title: 'The 4-point daily toddler battery check',
          beat2Lead:
            'Behavior is often body chemistry in disguise. Tap each checkpoint on the daily rhythm strip to see where refueling stops meltdowns cold.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The HALT daily toddler rhythm map',
          visualStageHint: 'Tap each checkpoint to spot meltdown preventers',
          visualConfig: {
            steps: [
              {
                timeOrCue: '10:30 AM',
                label: 'Fuel Check (H)',
                title: 'Tiny bellies empty every 2.5–3 hours',
                desc: 'Pair a carb with protein or healthy fat (cheese + fruit, peanut butter toast) BEFORE errands or park departures.',
                why: 'Steady glucose keeps the developing emotional alarm calm.',
              },
              {
                timeOrCue: '12:30 PM',
                label: 'Sleep Battery (T)',
                title: 'Protect the midday nap anchor',
                desc: 'Notice clumsy stumbling, whining, or ear-pulling—those are early physical signs sleep pressure just peaked.',
                why: 'Catching the nap prevents evening cortisol overload.',
              },
              {
                timeOrCue: '4:45 PM',
                label: 'Sensory Reset (A)',
                title: 'Step outside or dim lights for 10 minutes',
                desc: 'Late afternoon brings peak sensory static from daycare or loud rooms—fresh air, bath play, or dim soft music clears the bucket.',
                why: 'Lowers nervous-system load right before dinner prep.',
              },
              {
                timeOrCue: '5:15 PM',
                label: 'Connection Fill (L)',
                title: '5 minutes of undivided floor time + veggie appetizer',
                desc: 'Offer a small cup of cucumber/avocado/bell pepper strips while sitting beside {name} for five phone-free minutes before starting dinner.',
                why: 'Fills both belly and connection cup so you can cook in peace!',
              },
            ],
          },
          almanacTruth:
            'Before correcting sudden toddler crankiness, check the body batteries: a protein snack, a sip of water, five minutes of quiet connection, or dimmer lights solves half of daily tears upstream.',
          scienceDeepDive:
            'Toddlers have high cerebral metabolic rates relative to hepatic glycogen storage, causing blood glucose dips every 2.5–3.5 hours that trigger counter-regulatory adrenaline and cortisol release—manifesting behaviorally as sudden irritability, weeping, and impulsivity.',
          beat3Kicker: 'Reframing 5:15 PM crankiness',
          beat3Title: 'Feeding the body first instead of debating behavior',
          rehearsalTriggerSpeaker: '{Name} tugging your pants whimpering at 5:15 PM',
          rehearsalTriggerQuote: '“UP! HOLD ME! NO WANT PLAY! *WAAAAH!*”',
          rehearsalPrompt: 'Which tired evening reaction usually escalates the whine?',
          instincts: [
            {
              id: 'waitdinner',
              label:
                '“Dinner is in 20 minutes—don’t spoil your appetite! Go play with your toys!”',
              whyTitle: 'Why that’s so reasonable—and why it backfires at age 1',
              whyText:
                'Twenty minutes feels like eternity to a hungry 18-month-old. Serving a small plate of dinner veggies right now actually boosts nutrition AND calms the kitchen!',
            },
            {
              id: 'ignore',
              label:
                'Keep chopping while repeating “Stop whining, you’re fine!” over your shoulder.',
              whyTitle: 'Why that drags out the whining',
              whyText:
                'Five full minutes of eye-level sitting right now usually buys twenty calm minutes of independent play while you finish dinner.',
            },
          ],
          calmScriptPlain:
            '“Your belly and cuddle cup both hit empty right at 5:15! Let’s sit together for five minutes with these crunchy dinner veggies, then I’ll finish stirring.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'spot',
              text: 'Your belly and cuddle cup both hit empty right at 5:15!',
              tag: 'Decodes Body Need',
              note: 'Turns annoying whining into understandable biology—dropping your irritation instantly.',
            },
            { text: ' ' },
            {
              id: 'bridge',
              text: 'Let’s sit together for five minutes with these crunchy dinner veggies, then I’ll finish stirring.',
              tag: 'Fills Both Tanks',
              note: 'Offers real dinner foods early (so appetite isn’t spoiled by crackers) plus a brief warm anchor.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Serve dinner veggies at 5:15 PM',
            '5-minute floor refill beats 30 minutes of leg-tugging',
            'Water + cool outdoor air resets overload fast',
          ],
          pushbacks: [
            {
              id: 'spoil',
              label: '“Won’t a 5:15 PM snack ruin dinner?”',
              setup:
                'Serve parts of dinner itself (avocado slices, steamed peas, shredded chicken)—it IS dinner, just started calmly!',
              script:
                '“If {name} eats {poss} veggies and protein at 5:15 PM while hungry, dinner is already a win!”',
            },
            {
              id: 'solo',
              label: '“I’m cooking solo and truly can’t step away from the stove”',
              setup:
                'Pull a safe learning tower or highchair away from heat with a bowl of water + whisk or dinner veggies:',
              script:
                '“Climb up safe right here beside me—you can wash these big celery sticks while I stir!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) melts down every afternoon between 4:30 and 6:00 PM while I make dinner—can you help me design a calm 3-step afternoon rhythm?”',
          beat4Kicker: 'Tomorrow’s upstream rescue',
          beat4Title: 'Pick one battery-refill habit for tomorrow',
          beat4Lead:
            'Preventing one storm at 5:15 PM saves your whole evening.',
          moves: [
            {
              id: 'veggietray',
              title: 'Serve a tiny “dinner appetizer” bowl at 5:15 PM',
              desc: 'Put out two soft dinner foods (like peas, steamed carrots, or cheese cubes) right when hunger peaks.',
            },
            {
              id: 'fiveconnect',
              title: 'Pause for 5 full phone-free floor minutes before cooking',
              desc: 'Fill {possessive} connection cup upfront so {pronoun} settles happily nearby while you prep.',
            },
            {
              id: 'porchair',
              title: 'Step onto the porch or run a quick splash bath at 4:45 PM',
              desc: 'Fresh outdoor air or warm water instantly washes away late-day sensory crankiness.',
            },
          ],
          closingNote:
            'Half of parenting wisdom isn’t clever discipline—it’s noticing that a tiny human is simply hungry, overstimulated, or missing your lap, and feeding that need five minutes sooner.',
          pocketInsight:
            'Run the HALT check upstream: serve dinner veggies at 5:15 PM, offer 5 undivided floor minutes before cooking, and use fresh air or bath water to clear afternoon static.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery:
              '“Why does a sweet, loving 18-month-old suddenly chomp your shoulder or swat a friend—and what stops it fast?”',
            title: 'Staying Calm and Firm When {Name} Hits or Bites',
            targetSlug: 'toddler-biting-hitting-redirect',
          },
          interactiveHighlights: ['HALT Daily Map', '5:15 PM Veggie Appetizer'],
        },
      },
      {
        slug: 'toddler-biting-hitting-redirect',
        title: 'Staying Calm and Firm When {Name} Hits or Bites',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Boring block · Big calm boundary',
          headline: 'Staying Calm and Firm When {Name} Hits or Bites',
          deck: 'Why huge shocked reactions accidentally make hitting and biting repeat—and the calm, firm “boring block + clear redirect” that ends the phase.',
          sceneTime: '10:30 AM · PLAYDATE RUG',
          sceneBody:
            'Another toddler reaches for {possessive} truck. Before you can blink, {name} leans in and chomps their arm—or swings a fast palm straight at your cheek. *A flush of embarrassment and worry rushes through you: “Is my child aggressive?!”*',
          pollQuestion: 'Have hitting, hair-pulling, or biting popped up in your home?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes—and it feels awful and embarrassing',
              response:
                'Take a steady breath: hitting and biting at ages 1–2 are pre-verbal distress signals, NOT character flaws or future aggression. Calm, boring blocking extinguishes them fast.',
            },
            {
              id: 'smiling',
              label: 'Yes—and {pronoun} laughs or smirks right after!',
              response:
                'That smirk isn’t cruelty—it’s either nervous tension or delight at our giant theatrical “OWWW! NO BITING!” reaction. Keeping your response calm and utterly boring stops the experiment.',
            },
          ],
          beat2Kicker: 'Inside {possessive} pre-verbal brain',
          beat2Title: 'Block calmly, stay boring, teach the replacement',
          beat2Lead:
            'Young toddlers bite or hit for three reasons: big frustration without words, teething/oral sensory urge, or testing huge cause-and-effect reactions. Tap the 3-step boundary loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat Block → Name → Redirect loop',
          visualStageHint: 'Tap each step to practice calm, zero-drama boundaries',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Calm body block',
                label: 'Block Smoothly',
                quote: 'Gently catch the hand or step calmly between bodies',
                desc: 'Keep your face neutral and voice low—zero dramatic gasping, shouting, or grabbing harshly.',
                brainNote: 'Removes the theatrical firework reaction that accidentally reinforces testing.',
              },
              {
                stepNum: '02',
                actor: 'Clear 5-word wall',
                label: 'State the Limit',
                quote: '“I won’t let you bite. Biting hurts.”',
                desc: 'Short, firm, matter-of-fact—never ask “Why did you do that?” or demand forced apologies at age one.',
                brainNote: 'Clear calm limits feel safe and predictable to an impulsive toddler.',
              },
              {
                stepNum: '03',
                actor: 'Give the “yes” job',
                label: 'Teach the Alternative',
                quote: '“Say ‘MY TURN!’ · Chew this cool teether · Push the wall!”',
                desc: 'Immediately hand {name} the exact word, chewy toy, or safe physical release {poss} body was searching for.',
                brainNote: 'Rewires the impulse directly into a safe, repeatable skill.',
              },
            ],
          },
          almanacTruth:
            'Toddler hitting and biting aren’t malice—they are pre-verbal urgency. A calm, boring block plus one clear replacement phrase stops the phase far faster than yelling or dramatic scolding.',
          scienceDeepDive:
            'Between 12 and 30 months, expressive language lags well behind limbic urgency and territorial impulse. High-arousal parental reactions (“NO! BAD!”) inadvertently deliver intense social reinforcement (dopaminergic salience), whereas neutral physical blocking paired with immediate replacement scripting accelerates inhibitory learning.',
          beat3Kicker: 'Practice the calm block',
          beat3Title: 'Staying sturdy when {name} swats your face or bites a friend',
          rehearsalTriggerSpeaker: '{Name} swings a hand straight at your cheek in frustration',
          rehearsalTriggerQuote: '“*SLAP!* NO!!”',
          rehearsalPrompt: 'Which totally human reflex accidentally keeps the cycle going?',
          instincts: [
            {
              id: 'yell',
              label:
                'Shout startled: “OW! NO HITTING! That makes Mommy so sad—look what you did!”',
              whyTitle: 'Why that’s so natural—and what {poss} brain learns',
              whyText:
                'Being smacked genuinely stings! Yet huge emotional theatrics fascinate a 1-year-old’s cause-and-effect brain (“Whoa, one tiny swat makes giant fireworks!”) and can make {obj} try it again to see the show.',
            },
            {
              id: 'biteback',
              label:
                'Tap {poss} hand back or lecture for three minutes demanding “Say you’re sorry!”',
              whyTitle: 'Why that backfires',
              whyText:
                'Hitting back models using hands when upset, and a 1-year-old cannot grasp forced apologies yet—modeling gentle care for the hurt person teaches real empathy instead.',
            },
          ],
          calmScriptPlain:
            '“(Catch wrist gently, completely calm low voice) Ouch. I won’t let you hit. Hands are gentle—you can stomp your feet or push this pillow if you’re mad.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'block',
              text: '(Catch wrist gently, completely calm low voice) Ouch. I won’t let you hit.',
              tag: 'Boring Firm Wall',
              note: 'Zero drama, zero shame—protects your body with total steadiness.',
            },
            { text: ' ' },
            {
              id: 'redirect',
              text: 'Hands are gentle—you can stomp your feet or push this pillow if you’re mad.',
              tag: 'Safe Outlet',
              note: 'Channels physical energy straight into an acceptable movement instead of leaving {obj} stuck.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Stay utterly calm and un-theatrical',
            'Tend to the hurt child first on playdates',
            'Offer chewy teether if teething/biting',
          ],
          pushbacks: [
            {
              id: 'playdate',
              label: '“{Name} bit another child and the other parent is staring”',
              setup:
                'Give big warm attention to the injured child FIRST (making biting boring for {name}), then shadow {name} calmly:',
              script:
                '“(To hurt child) Oh, are you okay? Let’s get a cool cloth. (Calmly to {name}) Teeth are not for people. You wanted space—say ‘BACK UP’.”',
            },
            {
              id: 'keepsdoing',
              label: '“{Pronoun} hits again three seconds later smiling”',
              setup:
                'Calmly set {name} down safely on the rug and step two feet back—zero anger, clear consequence:',
              script:
                '“I won’t let you hit my face. I’m putting you down on the rug to keep my body safe. Ready for gentle hands in a minute.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) has started hitting or biting when excited or frustrated—how do I figure out the exact trigger and coach {obj} calmly?”',
          beat4Kicker: 'Your calm boundary tool',
          beat4Title: 'Pick one steady response to keep ready this week',
          beat4Lead:
            'Deciding your exact six words now prevents getting caught off guard later.',
          moves: [
            {
              id: 'boringblock',
              title: 'Practice the “boring block” phrase out loud once',
              desc: '“I won’t let you hit. Hands stay gentle.” Keep your voice flat, warm, and utterly non-dramatic.',
            },
            {
              id: 'chewswap',
              title: 'Keep a cool silicone teether or crunchy snack clipped nearby',
              desc: 'If biting peaks during teething or excitement, hand {obj} something safe to chomp immediately: “Bite this, not arms.”',
            },
            {
              id: 'teachphrase',
              title: 'Practice one big power-word during calm play (“STOP!” or “SPACE!”)',
              desc: 'Playfully rehearse holding a flat palm up saying “STOP!” so {name} has a word ready before teeth or hands fly.',
            },
          ],
          closingNote:
            'This biting-and-hitting stretch feels mortifying in the moment, yet nearly every toddler passes through it briefly before words catch up. Your calm, sturdy, zero-shame boundary is exactly what helps {name} outgrow it for good.',
          pocketInsight:
            'Block hitting/biting calmly with zero fireworks (“I won’t let you hit”), tend to any hurt friend first, and hand {name} one safe outlet (stomp feet, chew teether, or say “SPACE!”).',
          nextEpisodeHook: null,
          interactiveHighlights: ['Block → Name → Redirect', 'Playdate Recovery Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 7: Toddler Nap Drops & Peaceful Bedtimes (3 Episodes — Clinical Triage Cut)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'health-toddler-sleep-and-nap-transitions',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    developmentalTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
    title: 'Toddler Nap Drops & Peaceful Bedtimes',
    reliefSubtitle:
      'Bridge the bumpy 2-to-1 nap drop smoothly, ease 18-month bedtime separation fears, and install a calm 15-minute wind-down',
    tonightQuickWinTitle: 'Episode 1: Moving From Two Naps to One Without 5 PM Crashes',
    summary:
      'Navigate the classic 13-to-18-month nap transition without overtired meltdowns, understand sudden toddler separation tears at bedtime, and lock in a predictable 15-minute evening routine.',
    coverImageUrl: 'https://assets.alongside.care/academy/health-toddler.png',
    sortOrder: 2,
    episodes: [
      {
        slug: 'toddler-two-to-one-nap-bridge',
        title: 'Moving From Two Naps to One Without 5 PM Crashes',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: '13–18 months · Shifting morning nap slowly',
          headline: 'Moving From Two Naps to One Without 5 PM Crashes',
          deck: 'How nudging naptime forward by 15 minutes every few days—and using an earlier bedtime bridge—keeps this bumpy transition tear-free.',
          sceneTime: '2:45 PM · REFUSING NAP #2 AGAIN',
          sceneBody:
            'For the fifth afternoon straight, {name} stood up in the crib singing happily through nap #2—yet if you skip the morning nap entirely, {pronoun} falls asleep in {poss} pasta bowl at 5:30 PM. *You feel trapped in nap-transition limbo.*',
          pollQuestion: 'Are you seeing bumpy two-nap vs. one-nap days right now?',
          pollOptions: [
            {
              id: 'limbo',
              label: 'Yes—two naps is too much, one isn’t quite enough!',
              response:
                'That exact 4-week limbo is completely normal between 13 and 18 months. Shifting lunch earlier and using a temporary 6:30 PM bedtime bridges it cleanly.',
            },
            {
              id: 'soon',
              label: 'Not yet—getting ready ahead of time',
              response:
                'Wait until {name} refuses the second nap consistently for 10–14 days (not just a 2-day teething blip!) before making the switch.',
            },
          ],
          beat2Kicker: 'The sleep-pressure shift',
          beat2Title: 'Watch how one midday nap resets the whole day',
          beat2Lead:
            'Around 14–18 months, toddler sleep pressure builds more slowly—so morning sleep steals momentum from the afternoon. Tap each timepoint on the 1-nap curve below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'The smooth 1-nap toddler daily curve',
          visualStageHint: 'Tap each timepoint from wake to early bridge bedtime',
          visualConfig: {
            stages: [
              {
                time: '7:00 AM',
                label: 'Morning Wake',
                level: 20,
                title: 'Bright sun & active morning play',
                desc: 'Keep the classic 9:30 AM sleepy slump at bay with an outdoor walk, crunchy snack, or water play.',
                tip: 'Avoid cozy car rides around 10:00 AM so {name} doesn’t accidentally snooze for 12 minutes!',
              },
              {
                time: '11:15 AM',
                label: 'Early Lunch',
                title: 'Serve lunch BEFORE the midday nap',
                desc: 'Moving lunch up to 11:15–11:30 AM lets {name} settle with a comfortably full tummy right as sleepiness rises.',
                tip: 'Full belly = longer 2-hour consolidated midday nap.',
              },
              {
                time: '12:00 PM',
                label: 'One Big Nap',
                title: 'Gradually walk nap from 11:30 → 12:30 PM',
                desc: 'Start the first week at 11:30 AM and nudge 15 minutes later every 3–4 days until landing around 12:15–12:30 PM.',
                tip: 'If {name} wakes after 45 minutes early on, stay quiet and dim—longer naps consolidate in 2–3 weeks.',
              },
              {
                time: '6:30 PM',
                label: 'Bridge Bedtime',
                title: 'Temporary early bedtime saves the evening!',
                desc: 'During the transition month, shifting bedtime 30–45 minutes earlier eliminates 5 PM meltdowns and prevents 5 AM early wakes.',
                tip: 'Once the midday nap hits 2 solid hours, bedtime glides naturally back to 7:00–7:30 PM.',
              },
            ],
          },
          almanacTruth:
            'Don’t jump cold turkey to a 1:00 PM nap—walk naptime forward 15 minutes every few days, serve an early lunch first, and use a temporary early bedtime for three weeks.',
          scienceDeepDive:
            'Between 12 and 18 months, the homeostatic sleep-pressure accumulation curve flattens, allowing wake stretches of 4.5–5.5 hours. Gradual phase shifting of the morning nap toward solar midday aligns homeostatic pressure with the natural circadian post-lunch dip, consolidating REM and slow-wave sleep into a single 90–150 minute block.',
          beat3Kicker: 'Surviving the 10:30 AM yawn',
          beat3Title: 'Helping {name} coast smoothly to early lunch',
          rehearsalTriggerSpeaker: '10:30 AM · {Name} rubbing eyes on the couch',
          rehearsalTriggerQuote: '“*Yawn…* Uh-oh, we still have 45 minutes until early lunch!”',
          rehearsalPrompt: 'Which tempting move accidentally derails the whole afternoon?',
          instincts: [
            {
              id: 'carnap',
              label:
                'Buckle {obj} into the car to run a quick errand at 10:30 AM—and {pronoun} falls asleep for 10 minutes.',
              whyTitle: 'Why that’s a sneaky trap',
              whyText:
                'A 10-minute car micro-nap empties just enough sleep pressure to ruin the 12:00 PM crib nap completely—leaving you with zero afternoon rest.',
            },
            {
              id: 'flipflop',
              label:
                'Give up after two bumpy days and switch back and forth unpredictably every day.',
              whyTitle: 'Why steady pacing helps faster',
              whyText:
                'Occasional 2-nap recovery days are totally fine during week one! Just keep nudging gently toward midday for 2–3 weeks so {possessive} body clock locks in.',
            },
          ],
          calmScriptPlain:
            '“Ooh, morning sleepy wave! Let’s step outside to feel the breeze and crunch an apple slice—then early lunch and our big cozy nap!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'breeze',
              text: 'Ooh, morning sleepy wave! Let’s step outside to feel the breeze and crunch an apple slice',
              tag: 'Gentle Wake Boost',
              note: 'Outdoor light and crunchy chewing naturally lift a 10:30 AM dip without overstimulation.',
            },
            { text: '—' },
            {
              id: 'preview',
              text: 'then early lunch and our big cozy nap!',
              tag: 'Predictable Bridge',
              note: 'Keeps the rhythm calm and cheerful until 11:30–12:00 PM arrives.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Wait for 10–14 days of Nap #2 refusal first',
            'Shift nap 15 min later every 3–4 days',
            'Use 6:30 PM bridge bedtime for 2–3 weeks',
          ],
          pushbacks: [
            {
              id: 'shortmid',
              label: '“{Pronoun} only slept 50 minutes for the one nap!”',
              setup:
                'Totally normal in weeks 1–2—protect the evening with a calm quiet rest at 4:00 PM and a 6:15 PM bedtime:',
              script:
                '“Short nap today—no stress. We’ll do a cozy book cuddle at 4:00 PM and tuck in 30 minutes early tonight.”',
            },
            {
              id: 'daycare',
              label: '“Daycare already switched {obj} to one nap at 12:30 PM”',
              setup:
                'Match daycare’s schedule on weekdays with an early bedtime, and let {name} take a cozy catch-up morning nap on weekends if exhausted:',
              script:
                '“Weekday early bedtimes recover daycare fatigue beautifully while {poss} body adjusts.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is halfway between two naps and one nap—can you sketch a gentle 2-week transition schedule starting from our current 7 AM wake time?”',
          beat4Kicker: 'This week’s sleep bridge',
          beat4Title: 'Pick one transition anchor to try this week',
          beat4Lead:
            'Tiny 15-minute nudges protect everyone’s evenings.',
          moves: [
            {
              id: 'earlylunch',
              title: 'Slide lunch up to 11:15 AM before the midday nap',
              desc: 'A warm, full belly helps {name} bridge smoothly into a longer consolidated afternoon rest.',
            },
            {
              id: 'guard10am',
              title: 'Keep 10:00–11:15 AM car-free and brightly lit outdoors',
              desc: 'Fresh morning air prevents sneaky 10-minute car naps that spoil the midday stretch.',
            },
            {
              id: 'bridgebed',
              title: 'Protect an earlier bridge bedtime (30 min sooner) on short-nap days',
              desc: 'Prevents evening cortisol surges and surprisingly delivers BETTER morning wake times.',
            },
          ],
          closingNote:
            'Once the one-nap rhythm settles in, something wonderful happens: your whole morning opens up for parks, libraries, and unhurried outings—followed by a glorious midday pause for you too.',
          pocketInsight:
            'Walk nap #1 toward 12:00 PM by 15 minutes every few days, serve early lunch first, guard against 10 AM car snoozes, and use an early bridge bedtime for 2–3 weeks.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Why did a toddler who loved bedtime suddenly start clinging to your neck crying at 16 months?”',
            title: 'Why Bedtime Suddenly Feels Scary at 15–18 Months',
            targetSlug: 'toddler-cortisol-separation-sleep-neurobiology',
          },
          interactiveHighlights: ['1-Nap Daily Curve', 'Bridge Bedtime Strategy'],
        },
      },
      {
        slug: 'toddler-cortisol-separation-sleep-neurobiology',
        title: 'Why Bedtime Suddenly Feels Scary at 15–18 Months',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: '15–18 months · Deepening attachment awareness',
          headline: 'Why Bedtime Suddenly Feels Scary at 15–18 Months',
          deck: 'Why sudden crib-railing tears aren’t manipulation—they are a big leap in memory and imagination—and how the “Check-Back Promise” restores peaceful nights.',
          sceneTime: '7:25 PM · THE CRIB RAILING',
          sceneBody:
            'For months bedtime was smooth sailing. Tonight the instant you reach for the doorknob, {name} shoots upright gripping the crib bars with genuine panic: *“MAMA! DADA! DON’T GO!”* *Your heart twists—is {pronoun} stalling, or truly frightened?*',
          pollQuestion: 'Have sudden bedtime clinging or tearful wake-ups shown up lately?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes—the second I touch the doorknob!',
              response:
                'Right around 15–18 months, {possessive} brain just realized two huge things: you keep existing in the next room, AND {pronoun} loves being close to you. Predictable check-backs calm this fast.',
            },
            {
              id: 'nightwake',
              label: 'Mostly calling out in the middle of the night',
              response:
                'Short, calm, predictable reassurance teaches {name} that darkness doesn’t erase your presence.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mind',
          beat2Title: 'Flip the lens on 18-month bedtime clinging',
          beat2Lead:
            'Toddlers don’t have a clock in their head yet—when you step behind a closed door, {name} has no idea if you’re gone for two minutes or forever. Flip the lens and tap the trust-building check-ins below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Stalling lens vs. attachment-leap lens',
          visualStageHint: 'Compare both lenses, then tap calm check-back reps below',
          visualConfig: {
            adultLabel: 'Frustrated bedtime lens',
            adultQuote: '“{Pronoun} knows the rules—{pronoun} is just testing me to stay up!”',
            adultSub:
              'When you are desperate for one hour of adult evening, standing at the crib bars feels like deliberate stalling.',
            childLabel: '18-month attachment lens',
            childQuote: '“I know you’re still out there… how do I know you’ll come back?”',
            childSub:
              'Permanent object awareness plus zero sense of time makes a closed door feel huge—keeping tiny return promises builds rock-solid confidence.',
            exposureHeading: 'The “I Always Come Back” check-back trust meter',
            exposureSub: 'Tap nights 1 to 10 to see separation confidence grow',
            totalDots: 10,
            defaultCount: 4,
            unitLabel: 'night',
            lowMax: 3,
            midMax: 7,
            lowMsg:
              'Nights 1–3: High vigilance at the door. Keeping a calm 2-minute check-back promise proves you never vanish.',
            midMsg:
              'Nights 4–7: Crib tears shorten dramatically as {possessive} hippocampus learns: “They always peek back in just like they said.”',
            highMsg:
              'Nights 8–10: {Name} hugs {poss} lovey and settles peacefully knowing your steady bond lasts all night.',
          },
          almanacTruth:
            'At 15–18 months, bedtime clinging is a developmental leap in attachment—not manipulation. One brief, kept promise (“I’ll peek back in two minutes to check on you”) builds deep nighttime trust.',
          scienceDeepDive:
            'Around 15–18 months, maturation of hippocampal object permanence combined with immature prefrontal temporal estimation creates a normative second peak of separation anxiety. Predictable, calm caregiver return protocols (“check-and-console” / bedtime pass) rapidly attenuate nighttime cortisol reactivity.',
          beat3Kicker: 'Warm, confident departures',
          beat3Title: 'The 2-Minute Check-Back Promise',
          rehearsalTriggerSpeaker: '{Name} clutching the crib railing tearfully',
          rehearsalTriggerQuote: '“NO GO! STAY! MAMA STAY!”',
          rehearsalPrompt: 'Which split-second response accidentally stretches bedtime by an hour?',
          instincts: [
            {
              id: 'sneakout',
              label:
                'Wait until {pronoun} turns away for two seconds and tiptoe silently out the door.',
              whyTitle: 'Why that backfires fast',
              whyText:
                'If {name} looks up and sees you vanished silently, {poss} alarm locks onto maximum vigilance—refusing to close {poss} eyes tomorrow in case you sneak away again.',
            },
            {
              id: 'bargain',
              label:
                'Say “Okay, one more book… okay, five more minutes rocking…” four times in a row.',
              whyTitle: 'Why shifting goalposts adds anxiety',
              whyText:
                'When crying keeps moving the boundary, {name} feels unsure who is steering the ship—predictable, warm consistency feels much safer.',
            },
          ],
          calmScriptPlain:
            '“You want me close tonight, and I love being close to you. I’m stepping out to fold laundry, and I’ll peek my head right back in two minutes to blow you a kiss.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'warm',
              text: 'You want me close tonight, and I love being close to you.',
              tag: 'Honors Connection',
              note: 'Shows {name} that missing you is completely welcome and never “bad.”',
            },
            { text: ' ' },
            {
              id: 'anchor',
              text: 'I’m stepping out to fold laundry,',
              tag: 'Concrete Picture',
              note: 'Gives {poss} young brain a reassuring image of you boringly nearby in the house.',
            },
            { text: ' ' },
            {
              id: 'promise',
              text: 'and I’ll peek my head right back in two minutes to blow you a kiss.',
              tag: 'Kept Promise',
              note: 'Actually popping back in at 2 minutes—even if {pronoun}’s quiet—proves your word is rock solid!',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Always keep the 2-minute peek-back promise',
            'Introduce a breathable comfort lovey (12m+)',
            'Warm voice, confident smile, zero rushing',
          ],
          pushbacks: [
            {
              id: 'criescheck',
              label: '“{Pronoun} cries harder when I leave after the 2-minute check”',
              setup:
                'Keep the check short (10 seconds), warm, and identical—don’t linger or restart the whole routine:',
              script:
                '“Just like I promised—I’m here, you’re safe, I love you. Checking back again in four minutes.”',
            },
            {
              id: 'lovey',
              label: '“How do I help {obj} bond with a bedtime lovey?”',
              setup:
                'For safe toddlers over 12 months, sleep with a small breathable cotton lovey tucked in your shirt for one night so it smells like you:',
              script:
                '“Give Bunny a kiss with me—Bunny keeps our cuddle smell right here in your crib all night.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) suddenly started crying intensely at bedtime separation after months of sleeping great—how do I do the calm check-back method step by step?”',
          beat4Kicker: 'Tonight’s trust builder',
          beat4Title: 'Pick one gentle separation bridge tonight',
          beat4Lead:
            'A kept tiny promise calms bedtime faster than an extra hour of pleading.',
          moves: [
            {
              id: 'checkback',
              title: 'Try the 2-minute “Check-Back Promise” tonight',
              desc: 'Leave calmly, return right at 2 minutes for a 10-second blown kiss, and let {name} feel your reliability.',
            },
            {
              id: 'scentlovey',
              title: 'Pair a small breathable lovey (12m+) with your bedtime cuddle',
              desc: 'Hold the comfort cloth between your chests during the final story so it carries your warm familiar scent.',
            },
            {
              id: 'daypeek',
              title: 'Play 3 minutes of cheerful daytime hide-and-seek before dinner',
              desc: 'Rehearsing “gone and happily back!” in daylight drains nighttime separation fear.',
            },
          ],
          closingNote:
            'When {name} reaches for you through the crib rails, it isn’t a sleep failure—it’s proof of how deeply safe you are in {poss} world. Keep your goodbye warm, keep your 2-minute promise, and watch nighttime trust bloom right back.',
          pocketInsight:
            '15–18 month bedtime clinging is an attachment leap. Never sneak out—offer one calm, kept 2-minute check-back promise and a familiar lovey.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“How do you turn a 60-minute wrestling match into a calm 15-minute bedtime rhythm {name} helps lead?”',
            title: 'A Predictable 15-Minute Bedtime Rhythm That Sticks',
            targetSlug: 'toddler-cot-containment-and-winddown',
          },
          interactiveHighlights: ['Attachment Lens Flip', '2-Min Check-Back Script'],
        },
      },
      {
        slug: 'toddler-cot-containment-and-winddown',
        title: 'A Predictable 15-Minute Bedtime Rhythm That Sticks',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Same 4 beats · Bath · Pajamas · 2 Books · Song',
          headline: 'A Predictable 15-Minute Bedtime Rhythm That Sticks',
          deck: 'Why keeping the crib safe longer—and running the exact same 4 calm beats every evening—lets the routine cue sleep instead of your voice.',
          sceneTime: '7:10 PM · CHASING A NAKED TODDLER',
          sceneBody:
            'Bath ended fine, yet somehow getting pajamas on turned into giggling sprints down the hallway, three water requests, and an overtired burst of tears by 8:00 PM. *Wait—why does bedtime take nearly an hour every night?*',
          pollQuestion: 'Where does your toddler bedtime routine usually stretch out or derail?',
          pollOptions: [
            {
              id: 'pajamas',
              label: 'Pajamas & wrestling on the changing mat',
              response:
                'Right after a warm bath, toddlers get a tiny energy bounce! Giving two playful choices (“Dinosaur PJs or stars?”) channels that bounce straight into cooperation.',
            },
            {
              id: 'toolong',
              label: 'It drags past 45 minutes and everyone gets cranky',
              response:
                'Tightening to four identical, low-light 15-minute beats actually makes toddlers fall asleep FASTER.',
            },
          ],
          beat2Kicker: 'Let the rhythm do the work',
          beat2Title: 'The 15-minute 4-beat bedtime rail',
          beat2Lead:
            'Toddlers can’t read clocks, so they read sequences. Running the exact same four calm beats every evening turns sleepiness into a smooth physical reflex. Tap each step below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 15-minute toddler bedtime sequence',
          visualStageHint: 'Tap each beat to see why order matters',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Min 0–5',
                label: 'Warm Bath & Dim',
                title: 'Warm water + dim lamps in the hallway',
                desc: 'A brief warm bath followed by stepping into a cooler bedroom creates a gentle core-temperature drop.',
                why: 'Body temperature dipping slightly is one of the brain’s strongest biological triggers for melatonin.',
              },
              {
                timeOrCue: 'Min 5–9',
                label: '2-Choice PJs',
                title: 'Pajamas, sleep sack & gentle teeth brush',
                desc: 'Offer two quick choices (“Blue jammies or striped?”) and let {name} push {poss} own arm through the sleeve.',
                why: 'Tiny wins of autonomy stop hallway wrestling matches before they begin.',
              },
              {
                timeOrCue: 'Min 9–13',
                label: '2 Short Books',
                title: 'Pick two board books together in dim light',
                desc: 'Keep the same cozy lamp on and name the boundary upfront: “Two books, then lamp clicks off.”',
                why: 'Letting {name} turn off the light switch {obj}self marks the transition cleanly.',
              },
              {
                timeOrCue: 'Min 13–15',
                label: 'One Song & Crib',
                title: 'One slow lullaby + consistent crib safety',
                desc: 'Keep toddlers in a safe crib (with lowest mattress setting & sleep sack) as long as safe—usually closer to age 2.5–3—before rushing a big bed.',
                why: 'Crib walls give a 1-year-old cozy physical clarity so {pronoun} doesn’t have to self-police staying in bed.',
              },
            ],
          },
          almanacTruth:
            'A short, predictable 15-minute sequence in dim light triggers biological sleepiness far better than an elaborate 60-minute production—and waiting on a big-kid bed keeps nights dramatically calmer.',
          scienceDeepDive:
            'Controlled pediatric sleep trials (Mindell et al., Sleep) demonstrate that installing a brief, consistent 3-to-4-step bedtime routine reduces sleep-onset latency and nighttime awakenings within just three nights by pairing conditioned environmental cues with post-bath peripheral vasodilation.',
          beat3Kicker: 'Holding the 2-book line warmly',
          beat3Title: 'When {name} begs for “MORE BOOK! MORE BOOK!”',
          rehearsalTriggerSpeaker: 'Finishing Book #2 in the rocking chair',
          rehearsalTriggerQuote: '“MORE BOOK! READ AGAIN!!” (Reaches for a third stack)',
          rehearsalPrompt: 'Which tired habit turns a 15-minute routine into 50 minutes?',
          instincts: [
            {
              id: 'onemore',
              label:
                '“Okay, JUST one more fast one—then seriously sleep!” (Repeated three times)',
              whyTitle: 'Why that teaches tomorrow’s stall',
              whyText:
                'Every extra negotiated book teaches {poss} clever brain that protesting louder extends bedtime—pushing {obj} straight past the sleepy window.',
            },
            {
              id: 'rushsharp',
              label:
                'Snap the book shut sharply: “No! I said two! Go straight to bed now!”',
              whyTitle: 'Why sharpness wakes the alarm back up',
              whyText:
                'A spike of adult frustration injects adrenaline right before lights out. Warm finality keeps melatonin high.',
            },
          ],
          calmScriptPlain:
            '“You loved that truck book! We’ll put it right on top of the stack for tomorrow morning. Ready to click the lamp off and sing our night-night song?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'save',
              text: 'You loved that truck book! We’ll put it right on top of the stack for tomorrow morning.',
              tag: 'Warm Closure',
              note: 'Honors {possessive} love for the story and creates a joyful look-forward without negotiating tonight.',
            },
            { text: ' ' },
            {
              id: 'job',
              text: 'Ready to click the lamp off and sing our night-night song?',
              tag: 'Hands Over a Job',
              note: 'Giving {name} the proud job of clicking the light off smoothly advances the sequence.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Same 4 steps in identical order',
            'Let {name} click the lamp off',
            'Keep crib safely until ~2.5–3 yrs unless climbing',
          ],
          pushbacks: [
            {
              id: 'runsaway',
              label: '“{Pronoun} bolts naked out of the bathroom laughing”',
              setup:
                'Close the bedroom door beforehand and wrap {obj} playfully in a “burrito towel” straight from the tub:',
              script:
                '“Here comes the cozy towel burrito! Let’s hop like frogs straight to the pajama mat!”',
            },
            {
              id: 'climbs',
              label: '“What if {pronoun} starts trying to climb the crib rail?”',
              setup:
                'First lower the mattress to the very bottom and keep a wearable sleep sack on (makes leg-lifting much harder); if {pronoun} actually climbs out, transition safely to a floor bed right away:',
              script:
                '“Lowest mattress setting + sleep sack keeps most 1-year-olds happily safe in the crib for another whole year.”',
            },
          ],
          advisorPrompt:
            '“Help me trim our chaotic 50-minute bedtime with {name} ({age}) into a calm 15-minute rhythm that both caregivers can follow identically.”',
          beat4Kicker: 'Tonight’s 15-minute reset',
          beat4Title: 'Pick one bedtime smoother tonight',
          beat4Lead:
            'Within three consistent nights, {possessive} body starts yawning right on cue.',
          moves: [
            {
              id: 'fourbeats',
              title: 'Lock in the exact 4-step order for the next 5 nights',
              desc: 'Bath → 2-choice PJs → 2 books → 1 slow song. Same order, dim light, zero extra side quests.',
            },
            {
              id: 'lampjob',
              title: 'Make {name} the official “Lamp Switcher” after Book #2',
              desc: 'Lift {obj} up to click the light off {obj}self—instant toddler pride instead of a power struggle.',
            },
            {
              id: 'savestack',
              title: 'Create a “Tomorrow Morning Book Spot” on the dresser',
              desc: 'Place any extra requested book there warmly: “Right here waiting for sunrise!”',
            },
          ],
          closingNote:
            'Bedtime doesn’t have to feel like a nightly marathon. Fifteen warm, predictable minutes in dim light give {name} the safety to let go—and hand you back your quiet evening.',
          pocketInsight:
            'Run 4 identical dim-light beats in 15 minutes (Bath → 2-Choice PJs → 2 Books → Lamp Click + Song) and keep the crib safely until closer to age 2.5–3.',
          nextEpisodeHook: null,
          interactiveHighlights: ['15-Min Bedtime Rail', 'Lamp-Switcher Trick'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 8: Toddler Appetite Shifts & Highchair Peace (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'nutrition-toddler-table-manners-picky-eaters',
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    developmentalTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
    title: 'Toddler Appetite Shifts & Highchair Peace',
    reliefSubtitle:
      'End highchair bargaining, understand the normal 1-year appetite dip, stop food throwing calmly, and serve easy iron-and-fat brain fuel',
    tonightQuickWinTitle: 'Episode 1: Who Decides What (and How Much): Ending Highchair Battles',
    summary:
      'Divide feeding roles cleanly so dinner stops feeling like a negotiation, decode why toddlers suddenly eat less after birthday #1, neutralize food throwing without turning it into a comedy show, and pair simple iron-rich toddler foods.',
    coverImageUrl: 'https://assets.alongside.care/academy/nutrition-toddler.png',
    sortOrder: 2,
    episodes: [
      {
        slug: 'toddler-division-of-responsibility',
        title: 'Who Decides What (and How Much): Ending Highchair Battles',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Clear lanes · Parent sets the menu, child listens to belly',
          headline: 'Who Decides What (and How Much): Ending Highchair Battles',
          deck: 'The two-lane rule that instantly lowers your stress at dinner—and raises a child who trusts their own hunger cues for life.',
          sceneTime: '5:50 PM · HIGHCHAIR STANDOFF',
          sceneBody:
            'You load a colorful plate of soft meatballs, steamed broccoli, and sweet potato. {Name} eats two raspberries, ignores the rest, and seals {poss} lips shut. *You feel the urge to sing songs, beg “just two more bites,” or chase {obj} around the living room with a loaded fork.*',
          pollQuestion: 'Do you find yourself coaxing or counting every bite at dinner?',
          pollOptions: [
            {
              id: 'counting',
              label: 'Yes—I track every single bite nervously!',
              response:
                'Every loving parent wants their child nourished! Surprisingly, stepping out of the “bite-counter” job actually makes toddlers eat MORE calmly over the course of a week.',
            },
            {
              id: 'ready',
              label: 'Ready to drop dinner negotiations for good',
              response:
                'Once you draw the clean two-lane boundary (Parent = What/When/Where; Child = Whether/How Much), dinner peace returns fast.',
            },
          ],
          beat2Kicker: 'The golden mealtime rule',
          beat2Title: 'Coaxing bites vs. clear lanes of responsibility',
          beat2Lead:
            'Feeding specialist Ellyn Satter’s gold-standard model splits dinner cleanly down the middle. Toggle below to see how dropping bite-pressure transforms the table.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Coaxing bites vs. Division of Responsibility',
          visualStageHint: 'Toggle both sides to see the mealtime shift',
          visualConfig: {
            willpowerLabel: 'Coaxing & cheering bites',
            willpowerTitle: 'Parent tries to manage intake',
            willpowerDesc:
              'Begging “one more bite for Mommy!” or cheering loudly over broccoli makes eating about pleasing you—triggering toddler autonomy pushback.',
            willpowerOutcome: 'Sealed lips, stressed parents, and slower curiosity.',
            guardrailLabel: 'Two Clear Lanes',
            guardrailTitle: 'Parent sets the table · {Name} listens to {poss} belly',
            guardrailDesc:
              'Your job is WHAT is served, WHEN meals happen, and WHERE you eat. {Possessive} job is WHETHER and HOW MUCH to eat from what’s served.',
            guardrailOutcome: 'Relaxed table, zero short-order cooking, and steady appetite trust.',
            environmentShifts: [
              'Always include 1–2 reliable foods {name} likes alongside the family meal.',
              'Sit down and eat your own warm dinner instead of hovering over {poss} fork.',
              'Keep commentary about bites at zero—chat about the day, dogs outside, or colors instead!',
            ],
          },
          almanacTruth:
            'Your job ends the moment a balanced plate with one familiar food lands on the tray. Letting {name} decide how much goes into {poss} belly protects lifelong appetite regulation.',
          scienceDeepDive:
            'Ellyn Satter’s Division of Responsibility (sDOR) is endorsed by the AAP and Academy of Nutrition and Dietetics. Experimental feeding trials consistently demonstrate that parental pressure to eat suppresses child intake of the pressured food and weakens internal satiety responsiveness.',
          beat3Kicker: 'Practicing calm neutrality',
          beat3Title: 'What to say when {name} says “ALL DONE!” after two bites',
          rehearsalTriggerSpeaker: '{Name} signs “all done” after three bites of dinner',
          rehearsalTriggerQuote: '“ALL DONE! DOWN! DOWN!”',
          rehearsalPrompt: 'Which caring reflex sneaks out fastest?',
          instincts: [
            {
              id: 'bribe',
              label:
                '“Just three more bites of chicken and then you can get down and have puffs!”',
              whyTitle: 'Why that’s so tempting—and what {poss} brain learns',
              whyText:
                'Worrying about a hungry toddler at 2 AM is real! Yet turning chicken into the tollbooth to leave the chair makes dinner feel like a trap.',
            },
            {
              id: 'chase',
              label:
                'Follow {obj} onto the living room rug sneaking spoonfuls while {pronoun} plays.',
              whyTitle: 'Why wandering bites backfire',
              whyText:
                'Grazing on the move blurs hunger signals and increases choking risk—keeping seated meals cozy and offering a simple bedtime snack later works much better.',
            },
          ],
          calmScriptPlain:
            '“Your belly is telling you all done for now—got it! Dinner stays on the table, and we’ll have our cozy cup of milk or yogurt snack before bedtime if you’re hungry later.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'trust',
              text: 'Your belly is telling you all done for now—got it!',
              tag: 'Honors Lane',
              note: 'Shows {name} you trust {poss} fullness gauge—zero panic, zero power struggle.',
            },
            { text: ' ' },
            {
              id: 'next',
              text: 'Dinner stays on the table, and we’ll have our cozy cup of milk or yogurt snack before bedtime if you’re hungry later.',
              tag: 'Predictable Safety Net',
              note: 'Reassures YOUR nervous system that {name} won’t go to bed starving—without short-order cooking.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Sit and enjoy your own dinner',
            'Zero bite counting or clapping',
            'Offer a boring bedtime snack (banana/milk) if needed',
          ],
          pushbacks: [
            {
              id: 'hungry15',
              label: '“Ten minutes later {pronoun} begs for crackers!”',
              setup:
                'Keep the kitchen boundary warm and steady—offer the saved dinner plate calmly or wait for the scheduled bedtime snack:',
              script:
                '“Oh, belly has a little more room! Your dinner plate is right here at the table—or we’ll have banana and milk at 6:45 before bath.”',
            },
            {
              id: 'milkfill',
              label: '“{Pronoun} drinks huge bottles of milk and skips solid meals”',
              setup:
                'After 12 months, capping cow’s milk around 12–16 oz/day in open/straw cups (served WITH or AFTER meals) opens real appetite for solid iron-rich foods:',
              script:
                '“Water between meals, and milk in a small cup right alongside dinner—watch {poss} solid appetite jump within 4 days!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) eats huge breakfasts and almost zero dinner—how do I follow Division of Responsibility without worrying {pronoun} will wake up hungry?”',
          beat4Kicker: 'Tonight’s highchair exhale',
          beat4Title: 'Pick one pressure-dropping move for dinner tonight',
          beat4Lead:
            'When your shoulders drop at the table, {possessive} curiosity climbs right back up.',
          moves: [
            {
              id: 'sitandeat',
              title: 'Eat your own warm plate without commenting on {possessive} bites',
              desc: 'Talk about the weather, dogs, or funny faces—not a single “take one bite” all meal.',
            },
            {
              id: 'waterfirst',
              title: 'Serve water in open/straw cups between meals; save milk for mealtime',
              desc: 'Prevents milk from silently filling tiny toddler stomachs right before lunch and dinner.',
            },
            {
              id: 'bedsnack',
              title: 'Keep one predictable, unexciting pre-bath snack backup',
              desc: 'Plain yogurt, banana, or warm milk before toothbrushing guarantees {name} sleeps full without dinner bargaining.',
            },
          ],
          closingNote:
            'Take a deep breath and hand back the bite-counting job tonight. You set a loving, steady table—and {name} gets to grow up listening peacefully to {poss} own body.',
          pocketInsight:
            'Parent decides WHAT/WHEN/WHERE; {name} decides WHETHER/HOW MUCH. Drop all bite coaxing, sit down to eat yourself, and keep milk modest beside meals.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Why did my baby who ate everything at 10 months suddenly survive on air and three berries at 15 months?”',
            title: 'Why {Name} Suddenly Lives on Air and Three Berries',
            targetSlug: 'toddler-appetite-slowdown-biology',
          },
          interactiveHighlights: ['Two-Lane Guardrail', 'All-Done Script'],
        },
      },
      {
        slug: 'toddler-appetite-slowdown-biology',
        title: 'Why {Name} Suddenly Lives on Air and Three Berries',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.leaf,
          illustrationCaption: 'Year 2 · Growth slows naturally by two-thirds',
          headline: 'Why {Name} Suddenly Lives on Air and Three Berries',
          deck: 'Why the dramatic second-year appetite dip is totally normal growth biology—and why zooming out from one meal to one full week brings instant relief.',
          sceneTime: '6:15 PM · AN UNTOUCHED DINNER PLATE',
          sceneBody:
            'At ten months {name} devoured full bowls of oatmeal, avocado, and salmon. Today {pronoun} ate a big breakfast, half a cheese stick at lunch, and exactly three blueberries for dinner—yet still has enough energy to sprint laps around the coffee table. *How is {pronoun} even running?!*',
          pollQuestion: 'Has your toddler’s appetite seemed weirdly small or erratic lately?',
          pollOptions: [
            {
              id: 'erratic',
              label: 'Yes—huge breakfast, zero dinner!',
              response:
                'That exact pattern (big breakfast, tiny dinner) is textbook healthy toddler biology! Their growth speed literally drops to one-third of infancy right after birthday #1.',
            },
            {
              id: 'worried',
              label: 'Yes—it honestly makes me anxious',
              response:
                'Seeing the growth-velocity math below (tripling birth weight in Year 1 vs. gaining just 4–6 lbs in Year 2) replaces worry with huge relief.',
            },
          ],
          beat2Kicker: 'The brain & growth decoder',
          beat2Title: 'Zoom out from one meal to one whole week',
          beat2Lead:
            'In year one, babies TRIPLE their birth weight—needing huge constant fuel. In year two, growth slows dramatically to ~4–6 pounds all year, so calorie needs per pound drop sharply! Flip the lens and inspect a real 7-day toddler week below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Single-meal panic vs. 7-day toddler reality',
          visualStageHint: 'Flip lenses, then tap meals across a normal week',
          visualConfig: {
            adultLabel: 'One-dinner worry lens',
            adultQuote: '“{Name} only ate three berries tonight—{pronoun} isn’t getting enough nutrition!”',
            adultSub:
              'Judged by a single 6 PM plate (when toddlers are most tired), almost every 1-year-old looks underfed.',
            childLabel: '7-day growth lens',
            childQuote: '“My growth curve slowed right on schedule—look at my whole week!”',
            childSub:
              'Pediatricians evaluate toddler nutrition across a FULL WEEK—big Tuesday breakfast + solid Thursday lunch naturally balance light dinners.',
            exposureHeading: 'A normal toddler’s 14-meal energy rhythm',
            exposureSub: 'Tap meals 1 to 14 to see how weekly totals balance',
            totalDots: 14,
            defaultCount: 9,
            unitLabel: 'meal',
            lowMax: 4,
            midMax: 9,
            lowMsg:
              'Light meals (3 berries, 2 crackers): Totally normal—especially at 6 PM when fatigue peaks. Never panic over one plate.',
            midMsg:
              'Steady meals (oatmeal, eggs, avocado toast): Toddlers front-load ~65% of calories before 2:00 PM!',
            highMsg:
              'Growth-spurt feast days: Out of nowhere {name} eats two full adult portions—balancing the whole week naturally!',
          },
          almanacTruth:
            'After birthday #1, growth velocity drops to a third of infancy. Judge toddler nutrition across a full week—not a single tired Tuesday dinner—and front-load nutrient-rich foods at breakfast and lunch.',
          scienceDeepDive:
            'Infants typically triple birth weight in the first 12 months (~15 lb gain), whereas toddlers aged 12–24 months gain roughly 4–6 lb across the entire year. Classic pediatric feeding studies (Clara Davis; Birch et al.) confirm that healthy toddlers self-regulate total energy intake accurately across 48-to-72-hour windows despite dramatic meal-to-meal variance.',
          beat3Kicker: 'Relaxing around tiny portions',
          beat3Title: 'Serving toddler-sized plates so food looks inviting',
          rehearsalTriggerSpeaker: 'Looking at a giant heaped plate {name} pushes away',
          rehearsalTriggerQuote: '“Why did {pronoun} push the whole plate away before even tasting?”',
          rehearsalPrompt: 'Which invisible visual detail overwhelms tiny toddler appetites?',
          instincts: [
            {
              id: 'heap',
              label:
                'Pile adult-sized scoops onto the plate hoping {pronoun} will eat more.',
              whyTitle: 'Why giant portions actually lower intake',
              whyText:
                'A mountain of food looks intimidating to a toddler with a fist-sized stomach—starting with tiny 1-tablespoon portions triggers way more curious tasting (and proud requests for “MORE!”).',
            },
            {
              id: 'pouches',
              label:
                'Hand out sweet fruit pouches all afternoon so you feel sure {pronoun} ate calories.',
              whyTitle: 'Why constant grazing flattens dinner hunger',
              whyText:
                'Quick pouches rescue busy days occasionally, yet constant sweet sipping keeps blood sugar just high enough to erase real mealtime curiosity.',
            },
          ],
          calmScriptPlain:
            '“Here’s a tiny tasting plate—two spoonfuls of lentils, three soft berries, and a strip of toast. If your belly wants seconds, just point and ask for more!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'tiny',
              text: 'Here’s a tiny tasting plate—two spoonfuls of lentils, three soft berries, and a strip of toast.',
              tag: 'Right-Sized',
              note: 'Rule of thumb: ~1 tablespoon per food per year of age keeps the plate approachable.',
            },
            { text: ' ' },
            {
              id: 'more',
              text: 'If your belly wants seconds, just point and ask for more!',
              tag: 'Builds Agency',
              note: 'Finishing a tiny scoop and proudly asking for “MORE!” creates positive mealtime momentum.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Serve 1–2 tablespoon starting portions',
            'Front-load protein/iron at breakfast & lunch',
            'Check growth trends calmly at well-child visits',
          ],
          pushbacks: [
            {
              id: 'growthcheck',
              label: '“How do I know my child’s small appetite is truly healthy?”',
              setup:
                'Watch energy, playful mood, steady wet diapers, and {possessive} individual curve at regular pediatric checkups:',
              script:
                '“Playful energy + steady diapers + tracking {poss} own growth line at well-child visits confirm {name} is thriving; if you ever notice low energy or weight dips, bring your weekly log right to your pediatrician.”',
            },
            {
              id: 'bigbreakfast',
              label: '“{Name} loves breakfast and ignores dinner—should I change dinner?”',
              setup:
                'Lean right into that natural rhythm! Make breakfast and morning snack your nutrient superstars:',
              script:
                '“Serve eggs, nut butter, iron-rich oats, avocado, or leftovers at breakfast when {poss} appetite is widest—then let dinner be relaxed family connection!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) barely eats at dinner—can you give me 5 quick, nutrient-dense breakfast and lunch ideas to front-load healthy fats and iron?”',
          beat4Kicker: 'This week’s calm nutrition lens',
          beat4Title: 'Pick one easy perspective shift this week',
          beat4Lead:
            'Shrinking portions on the plate shrinks dinner stress immediately.',
          moves: [
            {
              id: 'tablespoon',
              title: 'Serve tiny 1-tablespoon starting portions tonight',
              desc: 'Leave lots of calm empty space on the plate—let {name} feel proud asking for seconds.',
            },
            {
              id: 'powerbreakfast',
              title: 'Make breakfast your nutrient hero meal tomorrow',
              desc: 'Add hemp hearts, nut butter, scrambled egg, or full-fat yogurt when {possessive} hunger peaks.',
            },
            {
              id: 'weekzoom',
              title: 'Zoom out to a 7-day view before worrying',
              desc: 'Before stressing over a light Tuesday dinner, recall one solid meal {name} enjoyed in the past 48 hours.',
            },
          ],
          closingNote:
            'You are not imagining it—your baby’s huge infant appetite really did slow down overnight, right on biological cue. Zoom out to the week, serve approachable little scoops, and let dinner feel joyful again.',
          pocketInsight:
            'Year-2 growth naturally slows by two-thirds. Judge intake over a full week, front-load nutrition at breakfast/lunch, and serve tiny 1-tablespoon starting portions.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“Why does saying ‘DON’T THROW YOUR FOOD!’ make a 15-month-old lock eyes with you and drop another pea?”',
            title: 'Stopping Food Throwing Without Turning Dinner Into a Show',
            targetSlug: 'toddler-food-throwing-deescalation',
          },
          interactiveHighlights: ['7-Day Appetite Matrix', '1-Tbsp Starting Portion'],
        },
      },
      {
        slug: 'toddler-food-throwing-deescalation',
        title: 'Stopping Food Throwing Without Turning Dinner Into a Show',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'No-thank-you bowl · Calm zero-drama reset',
          headline: 'Stopping Food Throwing Without Turning Dinner Into a Show',
          deck: 'Why big gasps turn pea-tossing into dinner theater—and how one tiny “all-done bowl” ends highchair launches cleanly.',
          sceneTime: '6:08 PM · FLYING PASTA',
          sceneBody:
            '{Name} finishes {poss} favorite berries, locks eyes directly with yours, holds one piece of broccoli over the edge of the tray… and drops it straight onto the floor with a bright grin. *Your patience snaps—especially when you just swept the floor.*',
          pollQuestion: 'Is highchair food dropping or throwing testing your nerves this week?',
          pollOptions: [
            {
              id: 'daily',
              label: 'Every single meal—and the dog loves it!',
              response:
                'Haha—if there’s a happy dog under the chair, {name} discovered the world’s funniest arcade game! Moving the pet out and adding a “no-thank-you bowl” breaks the loop fast.',
            },
            {
              id: 'alldone',
              label: 'Mostly right at the end of the meal',
              response:
                'Bingo—for young toddlers, tossing food over the cliff is literally how they say “my belly is full and I want out!”',
            },
          ],
          beat2Kicker: 'Decoding the launch',
          beat2Title: 'Spot the cause, make throwing boring, give a clear “done” spot',
          beat2Lead:
            'Food throwing happens for three clear reasons: full belly, overwhelmed tray, or hilarious big reactions (from parents or pets!). Tap the 3-step calm response loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The zero-drama food-throwing reset',
          visualStageHint: 'Tap each beat to extinguish the throwing game',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: '1st drop · Boring cue',
                label: 'Redirect to Bowl',
                quote: '“Food stays on the tray or goes in this little bowl.”',
                desc: 'Keep your face totally calm and neutral—do NOT rush to pick the piece up off the floor while {name} watches.',
                brainNote: 'Eliminates the joyful “drop it → watch Mom dive” fetch loop.',
              },
              {
                stepNum: '02',
                actor: '2nd drop · Read fullness',
                label: 'Translate the Signal',
                quote: '“Throwing tells me your belly is all done! Let’s wipe hands.”',
                desc: 'Calmly interpret repeated throwing as “finished”—zero anger, zero punishment, just smoothly ending the meal.',
                brainNote: 'Links throwing directly to the boring end of highchair time.',
              },
              {
                stepNum: '03',
                actor: 'Upstream setup',
                label: 'Less on the Tray',
                quote: '2–3 pieces at a time + one small “All-Done” side bowl',
                desc: 'Overloaded trays invite windshield-wipering; giving a fun target bowl satisfies the urge to move unwanted pieces safely.',
                brainNote: 'Replaces tossing off the cliff with an easy, proud motor skill.',
              },
            ],
          },
          almanacTruth:
            'A toddler staring you in the eye while dropping broccoli isn’t being defiant—they are testing gravity, testing your reaction, or signaling “I’m full.” Keep reactions boring and install a “no-thank-you” bowl.',
          scienceDeepDive:
            'At 12–24 months, repetitive dropping explores object permanence and social contingency. High-affect adult reprimands or immediate retrieval inadvertently reinforce the dropping loop via social salience, whereas neutral extinction paired with an explicit replacement container (“all-done bowl”) redirects motor intent cleanly.',
          beat3Kicker: 'Keeping your poker face',
          beat3Title: 'When {name} grins and flings a fistful of peas',
          rehearsalTriggerSpeaker: '{Name} holding a pea over the edge watching your face',
          rehearsalTriggerQuote: '“*Plop!* Haha!”',
          rehearsalPrompt: 'Which natural reflex accidentally turns throwing into a nightly game?',
          instincts: [
            {
              id: 'dive',
              label:
                'Gasp “HEY! STOP THROWING!” and immediately bend down picking up every pea.',
              whyTitle: 'Why that accidentally extends the game',
              whyText:
                'Big eyes + funny voice + parent diving under the tray = the absolute best entertainment in the house! Leaving fallen peas on the floor until AFTER {name} gets down kills the show immediately.',
            },
            {
              id: 'strapin',
              label:
                'Keep {name} strapped in the chair lecturing until {pronoun} stops throwing.',
              whyTitle: 'Why staying stuck escalates tossing',
              whyText:
                'When a toddler is full and restless, staying strapped beside a tray of food guarantees more launching—calmly translating throwing as “all done” ends it peacefully.',
            },
          ],
          calmScriptPlain:
            '“(Totally calm neutral face) Food stays on the tray. You can drop extra pieces right in your little blue bowl—or throwing tells me you’re all done.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'neutral',
              text: '(Totally calm neutral face) Food stays on the tray.',
              tag: 'Zero Fireworks',
              note: 'Boring neutrality instantly strips away the “push Mom’s button” fascination.',
            },
            { text: ' ' },
            {
              id: 'bowl',
              text: 'You can drop extra pieces right in your little blue bowl',
              tag: 'Clear Target',
              note: 'Gives {poss} busy hands a real place to put unwanted food without launching it.',
            },
            { text: '—' },
            {
              id: 'done',
              text: 'or throwing tells me you’re all done.',
              tag: 'Natural End',
              note: 'On the next throw, calmly lift {name} down without anger—consistent cause-and-effect works in days.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Never pick up dropped food while {name} watches',
            'Keep pets out of the dining room during dinner',
            'Serve only 2–3 pieces at a time',
          ],
          pushbacks: [
            {
              id: 'bowlthrown',
              label: '“{Pronoun} picked up the whole suction bowl and threw THAT too!”',
              setup:
                'Skip bowls for a month and place 3 pieces directly on the clean tray—zero bowls to catapult:',
              script:
                '“Bowls rest on the counter for a bit—three pieces right on the tray, and you can hand me any piece you don’t want!”',
            },
            {
              id: 'dog',
              label: '“Our family dog sprints over the second anything drops”',
              setup:
                'Gating the dog into the hallway for 15 minutes during dinner removes 80% of toddler throwing overnight:',
              script:
                '“Puppy takes a cozy nap in the hall during dinner so food stays on the table.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) throws food off the highchair tray at nearly every meal—how do I teach the ‘no-thank-you’ bowl or ‘all done’ sign consistently?”',
          beat4Kicker: 'Tonight’s cleanup saver',
          beat4Title: 'Pick one throwing-stopper for tonight’s meal',
          beat4Lead:
            'Three calm meals of boring neutrality usually cut throwing in half.',
          moves: [
            {
              id: 'donebowl',
              title: 'Set one tiny “No-Thank-You” bowl or hand target beside the plate',
              desc: 'Practice happily dropping one extra pea into it together before frustration starts.',
            },
            {
              id: 'waitclean',
              title: 'Leave dropped pieces on the floor until {name} is out of the chair',
              desc: 'Breaking the “drop → watch parent dive” loop takes the comedy right out of launching.',
            },
            {
              id: 'threepieces',
              title: 'Serve 3 pieces at a time and gate pets out for 15 minutes',
              desc: 'Refill calmly as {name} finishes—way less overwhelm and zero dog-feeding comedy.',
            },
          ],
          closingNote:
            'Wiping mashed sweet potato off the baseboard tests every parent’s zen—yet keeping your face peacefully boring for just a few nights teaches {name} faster than a hundred lectures ever could.',
          pocketInsight:
            'Make food throwing utterly boring: don’t pick up drops while {name} watches, serve 3 pieces at a time, add a “no-thank-you” bowl, and calmly end the meal on repeat throws.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery:
              '“What are the five easiest 2-minute pairings that pack iron and healthy brain fats into tiny toddler bellies?”',
            title: 'Simple Brain-Fuel Pairings for Tiny Toddler Tummies',
            targetSlug: 'toddler-nutritional-gateways-iron-fats',
          },
          interactiveHighlights: ['Zero-Drama Loop', 'No-Thank-You Bowl'],
        },
      },
      {
        slug: 'toddler-nutritional-gateways-iron-fats',
        title: 'Simple Brain-Fuel Pairings for Tiny Toddler Tummies',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Iron + Vitamin C · Healthy fats on favorite foods',
          headline: 'Simple Brain-Fuel Pairings for Tiny Toddler Tummies',
          deck: 'Because toddler bellies are tiny, every bite counts—here is how to effortlessly pair iron, vitamin C, and healthy fats onto foods {name} already loves.',
          sceneTime: '8:15 AM · QUICK BREAKFAST PREP',
          sceneBody:
            'You want {possessive} fast-growing brain to get plenty of iron and omega-3 fats—without spending an hour cooking elaborate toddler muffins nobody eats. *Good news: the highest-leverage brain boosters take ten seconds to stir into toast, oatmeal, or berries.*',
          pollQuestion: 'Which nutrition worry crosses your mind most at ages 1–2?',
          pollOptions: [
            {
              id: 'iron',
              label: 'Getting enough iron & protein without battles',
              response:
                'Smart focus! Iron fuels myelin and attention—and pairing plant iron (beans, oats, nut butter) with one strawberry or orange slice multiplies absorption up to 3x.',
            },
            {
              id: 'fats',
              label: 'Easy, realistic ideas for busy weekdays',
              response:
                'Zero fancy recipes here—just five effortless “booster pairings” you can sprinkle or spread right onto familiar staples.',
            },
          ],
          beat2Kicker: 'Smart effortless pairings',
          beat2Title: 'Five 10-second nutrition upgrades on familiar foods',
          beat2Lead:
            'A toddler’s brain is roughly 60% fat by dry weight and builds myelin rapidly through age two. Tap through the 5 effortless pairing levels below.',
          visualType: AlmanacVisualType.SENSORY_LADDER,
          visualStageTitle: '5 effortless toddler brain-fuel pairings',
          visualStageHint: 'Tap each pairing to see the 10-second kitchen move',
          visualConfig: {
            steps: [
              {
                label: 'Iron + C',
                title: '1. Pair iron with Vitamin C (3x boost!)',
                desc: 'Serve iron-rich oatmeal, mashed black beans, or lentils right beside quartered strawberries, kiwi, or bell pepper.',
                tag: 'Smart Combo · Triples absorption',
              },
              {
                label: 'Sprinkle',
                title: '2. Hemp hearts & chia “sprinkles”',
                desc: 'Dust 1 tsp soft hemp hearts or ground flax onto banana strips, yogurt, or avocado—instant omega-3s and protein with zero prep.',
                tag: '10-Sec Boost · Kids love “sprinkles”',
              },
              {
                label: 'Dips',
                title: '3. Nutrient-rich creamy dips',
                desc: 'Toddlers adore dipping! Offer plain full-fat Greek yogurt, smooth hummus, guacamole, or thinned tahini beside toast strips.',
                tag: 'High Fun · Healthy fats',
              },
              {
                label: 'Soft Fish',
                title: '4. Mild low-mercury flaked salmon or egg',
                desc: 'Flaked baked salmon or soft scrambled eggs deliver ready-to-use DHA and choline straight for memory and myelination.',
                tag: 'Brain Gold · Soft & easy',
              },
              {
                label: 'Calm Milk',
                title: '5. Keep cow’s milk under ~16 oz/day',
                desc: 'Large amounts of calcium-rich cow’s milk can crowd out solid iron foods and slightly block iron uptake—water stays the thirst drink!',
                tag: 'Balance · Protects iron stores',
              },
            ],
          },
          almanacTruth:
            'You don’t need gourmet toddler recipes—just spread healthy fats onto toast, dust hemp hearts onto fruit, pair iron with berries for vitamin C, and keep daily milk modest.',
          scienceDeepDive:
            'During ages 12–24 months, rapid oligodendrocyte myelination requires abundant dietary fatty acids (DHA/ALA), choline, and bioavailable iron. Ascorbic acid (vitamin C) reduces non-heme ferric iron to the absorbable ferrous state in the gut, while excessive cow’s milk intake (>16–20 oz/day) is a leading modifiable risk factor for toddler iron deficiency.',
          beat3Kicker: 'Zero sneaking required',
          beat3Title: 'Boosting familiar favorites openly and joyfully',
          rehearsalTriggerSpeaker: 'Adding hemp hearts or avocado onto toast',
          rehearsalTriggerQuote:
            '“Wait—should I hide pureed spinach inside brownies so {name} doesn’t notice?”',
          rehearsalPrompt: 'Which nutrition shortcut backfires on long-term trust?',
          instincts: [
            {
              id: 'secret',
              label:
                'Secretly hide vegetables inside foods while pretending they aren’t there.',
              whyTitle: 'Why honesty builds stronger eaters',
              whyText:
                'Blending spinach into smoothies is awesome—just name it cheerfully (“Look, green superhero smoothie!”). Secretly hiding foods can break trust if {name} spots a green speck later.',
            },
            {
              id: 'lowfat',
              label:
                'Serve skim milk and low-fat yogurt because that’s what adults in the house buy.',
              whyTitle: 'Why toddlers need real healthy fats',
              whyText:
                'Unless advised otherwise by your pediatrician, ages 1–2 thrive on full-fat plain yogurt, olive oil, avocado, eggs, and nut butters to fuel rapid brain insulation.',
            },
          ],
          calmScriptPlain:
            '“Want to shake the magic hemp-heart sprinkles onto your yogurt and berries yourself? You’re building strong brain fuel!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'shake',
              text: 'Want to shake the magic hemp-heart sprinkles onto your yogurt and berries yourself?',
              tag: 'Fun Autonomy',
              note: 'Letting {name} shake seeds from a tiny spice jar turns a brain booster into a favorite morning ritual.',
            },
            { text: ' ' },
            {
              id: 'positive',
              text: 'You’re building strong brain fuel!',
              tag: 'Honest & Warm',
              note: 'Builds joyful food curiosity openly without ever labeling foods “good” or “bad.”',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Keep a small shaker of hemp hearts on the table',
            'Cook veggies in olive oil or butter for fat + flavor',
            'Always stay transparent about ingredients',
          ],
          pushbacks: [
            {
              id: 'nomeat',
              label: '“{Name} hates chewing meat textures right now”',
              setup:
                'Very common before molars come in! Swap tough meat for tender iron stars:',
              script:
                '“Soft mashed lentils, black bean dip, iron-fortified oats, egg yolks, and slow-cooked shredded meat pack plenty of easy iron with zero tough chewing.”',
            },
            {
              id: 'pickydip',
              label: '“{Pronoun} just licks the dip off the carrot and leaves the carrot”',
              setup:
                'Celebrate silently—licking hummus or yogurt off a veggie gives both healthy fat AND step-4 sensory contact!',
              script:
                '“Dip is doing double duty tonight: getting healthy fat in AND helping {poss} tongue make friends with carrots.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) dislikes chewing meat right now—can you give me 5 easy 5-minute toddler meals packed with iron, vitamin C, and healthy fats?”',
          beat4Kicker: 'This week’s 10-second upgrade',
          beat4Title: 'Pick one effortless nutrition pairing to try tomorrow',
          beat4Lead:
            'Zero extra cooking—just smart, playful add-ons to meals you already serve.',
          moves: [
            {
              id: 'hempshaker',
              title: 'Set a “sprinkle jar” of hemp hearts or ground flax by breakfast',
              desc: 'Let {name} shake a little pinch onto oatmeal, banana, or full-fat yogurt.',
            },
            {
              id: 'ironberry',
              title: 'Pair one iron food + one berry/citrus slice at lunch',
              desc: 'Oatmeal + strawberries, black beans + mandarin segments, or egg + kiwi—easy 3x iron boost.',
            },
            {
              id: 'dipbowl',
              title: 'Add one spoonful of savory dip beside familiar toast or veggies',
              desc: 'Try hummus, mashed avocado, or plain Greek yogurt for playful dipping and healthy brain fats.',
            },
          ],
          closingNote:
            'Nourishing a fast-growing toddler doesn’t take Pinterest bento boxes. A drizzle of olive oil, a shake of hemp hearts, and a few quartered berries beside oats do quiet wonders every single day.',
          pocketInsight:
            'Boost tiny toddler meals effortlessly: pair iron with vitamin-C fruit, add healthy-fat dips/sprinkles (hemp hearts, avocado, olive oil), and cap cow’s milk around 12–16 oz.',
          nextEpisodeHook: null,
          interactiveHighlights: ['5 Brain-Fuel Pairings', 'Iron + Vitamin C Boost'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 9: First Words, Climbing & Busy Hands (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'play-toddler-locomotion-and-sensory-bins',
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    developmentalTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
    title: 'First Words, Climbing & Busy Hands',
    reliefSubtitle:
      'Channel fearless climbing safely, understand “heavy work” energy, set up 10-minute kitchen play, and spark first words naturally',
    tonightQuickWinTitle: 'Episode 1: Channeling Constant Climbing Safely (Without Saying “No” All Day)',
    summary:
      'Turn exhausting furniture policing into safe indoor climbing zones, decode why toddlers crave pushing and spinning, buy calm dinner-prep minutes with water play, and unlock the 50-word language burst without quizzing.',
    coverImageUrl: 'https://assets.alongside.care/academy/play-toddler.png',
    sortOrder: 2,
    episodes: [
      {
        slug: 'toddler-climbing-crash-pad',
        title: 'Channeling Constant Climbing Safely (Without Saying “No” All Day)',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Cushion climb zone · One clear “Yes” beats 50 “No’s”',
          headline: 'Channeling Constant Climbing Safely (Without Saying “No” All Day)',
          deck: 'Why repeating “GET DOWN!” fifty times a day never stops a climbing toddler—and how creating one safe “Yes Zone” saves your voice and their shins.',
          sceneTime: '9:45 AM · DINING TABLE AGAIN',
          sceneBody:
            'You turn around for four seconds to rinse a mug—and {name} is proudly standing on top of the dining chair reaching for the fruit bowl. You lift {obj} down saying “No climbing!”—and ten seconds later {pronoun} is scaling the armrest of the sofa. *You feel like a broken security alarm.*',
          pollQuestion: 'Do you feel like you say “Get down!” twenty times before noon?',
          pollOptions: [
            {
              id: 'nonstop',
              label: 'Yes—my toddler is basically a mountain goat!',
              response:
                'Climbing at ages 1–2 isn’t disobedience—it’s a wired biological urge to build core balance and spatial judgment. Give that urge one safe legal mountain!',
            },
            {
              id: 'starting',
              label: 'Just starting to pull up on everything',
              response:
                'Setting up a simple cushion-climb zone and teaching “feet first” backward dismounting right now prevents dozens of tumbles.',
            },
          ],
          beat2Kicker: 'Design the room, save your voice',
          beat2Title: 'Policing furniture vs. one safe “Yes-Climb” zone',
          beat2Lead:
            'A one-year-old cannot suppress a biological motor drive with willpower alone. Toggle below to see how redirecting the environment beats saying “No!” all afternoon.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Saying “No!” 50 times vs. a Yes-Climb setup',
          visualStageHint: 'Toggle to compare both living-room setups',
          visualConfig: {
            willpowerLabel: 'Constant verbal policing',
            willpowerTitle: '“No climbing! Get off the table! Down!”',
            willpowerDesc:
              'When every elevated surface is forbidden, the unmet physical urge keeps pulling {name} straight back to the dining chairs five seconds later.',
            willpowerOutcome: 'Exhausted parent, frustrated toddler, endless repetition.',
            guardrailLabel: 'Clear Yes-Climb Zone',
            guardrailTitle: 'Anchor furniture + build one legal climbing spot',
            guardrailDesc:
              'Tuck dining chairs snugly (or lay them temporarily on a rug), wall-anchor bookshelves, and pile firm sofa cushions on the floor as {possessive} official climbing mountain.',
            guardrailOutcome: 'Safe fearless practice and way fewer daily “No’s”!',
            environmentShifts: [
              'Secure dressers, TVs, and bookshelves to wall studs so curiosity stays safe.',
              'Build a 2-minute floor cushion ramp or low Pikler-style step where climbing gets an enthusiastic YES.',
              'Practice “belly & feet first” backward sliding off couches so {name} learns safe exits early!',
            ],
          },
          almanacTruth:
            'You can’t lecture a 1-year-old out of climbing—it’s how their motor brain grows. Secure tall furniture, give them one loud “YES” cushion mountain, and teach “belly-and-feet-first” dismounting.',
          scienceDeepDive:
            'Gross-motor climbing engages bilateral cross-lateral coordination, cerebellar balance calibration, and spatial depth mapping. Environmental modification (“yes-spaces”) preserves exploratory competence while minimizing negative caregiver-child verbal friction.',
          beat3Kicker: 'Firm safety + joyful “Yes”',
          beat3Title: 'Redirecting straight off the dining chair without anger',
          rehearsalTriggerSpeaker: '{Name} climbing onto the wobbly kitchen chair again',
          rehearsalTriggerQuote: '“UP! UP!” (Beaming proudly on the seat)',
          rehearsalPrompt: 'Which split-second reaction makes {name} laugh and climb right back up?',
          instincts: [
            {
              id: 'chase',
              label:
                'Scream across the room “NO! GET DOWN!” and run over wide-eyed.',
              whyTitle: 'Why that turns dining chairs into a tag game',
              whyText:
                'Giant startled energy looks like an exciting chase to an 18-month-old—stepping over calmly, lifting smoothly, and redirecting to cushions keeps safety totally clear.',
            },
            {
              id: 'lecture',
              label:
                'Explain calmly from the couch: “You could crack your head if that chair tips over!”',
              whyTitle: 'Why distant warnings don’t register at age 1',
              whyText:
                'Toddlers can’t picture hypothetical future falls yet—warm physical guidance + an immediate legal place to climb does the real teaching.',
            },
          ],
          calmScriptPlain:
            '“(Lift down smoothly) Chairs are for bottoms. Your body wants to climb! Let’s climb our big cushion mountain right here—belly first coming down!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'fact',
              text: '(Lift down smoothly) Chairs are for bottoms.',
              tag: 'Short Neutral Rule',
              note: 'Tells {name} what chairs ARE for—clear, brief, and zero yelling.',
            },
            { text: ' ' },
            {
              id: 'yes',
              text: 'Your body wants to climb! Let’s climb our big cushion mountain right here',
              tag: 'Immediate YES',
              note: 'Honors the real motor need right away instead of leaving {obj} stuck.',
            },
            { text: '—' },
            {
              id: 'feet',
              text: 'belly first coming down!',
              tag: 'Safety Skill',
              note: 'Teaches safe backward dismounting that protects {poss} head on every couch and stair.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Say what things ARE for (“Chairs are for bottoms”)',
            'Practice “turn around, belly & feet first!”',
            'Anchor bookshelves & dressers to walls',
          ],
          pushbacks: [
            {
              id: 'headfirst',
              label: '“{Pronoun} keeps trying to dive headfirst off the sofa”',
              setup:
                'Make “Turn around, feet first!” a joyful physical game five times in a row on low cushions:',
              script:
                '“Turn around on your belly—slide, slide, toes touch the floor! Yay! Let’s practice one more time!”',
            },
            {
              id: 'stairs',
              label: '“{Pronoun} is obsessed with climbing our staircase”',
              setup:
                'Keep hardware-mounted gates closed when unsupervised, AND schedule 5 supervised “stair-practice minutes” daily:',
              script:
                '“Gate stays closed when we’re cooking—right now I’m right behind you while you practice crawling up three safe steps and sliding down belly-first!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) climbs onto every table and couch in the house—what 3 safe indoor ‘yes-climb’ setups can I build with cushions or simple household items?”',
          beat4Kicker: 'Today’s 3-minute living-room tweak',
          beat4Title: 'Pick one “Yes-Zone” move today',
          beat4Lead:
            'Give those restless mountain-goat legs one legal target today.',
          moves: [
            {
              id: 'cushionpile',
              title: 'Pull two firm sofa cushions onto the rug for a 15-minute “mountain”',
              desc: 'Cheerfully redirect every chair climb straight onto the cushion ramp: “Climb right here!”',
            },
            {
              id: 'feetfirst',
              title: 'Practice “belly & feet first” dismounting 5 playful times',
              desc: 'Gently turn {poss} hips around at the edge of the couch until sliding down toes-first becomes automatic.',
            },
            {
              id: 'anchorcheck',
              title: 'Do a 60-second tug test on dressers, lamps, and dining chairs',
              desc: 'Confirm tall furniture is wall-anchored so you can relax while {name} explores.',
            },
          ],
          closingNote:
            'Every safe climb builds balance, body confidence, and real risk awareness. Set up one legal cushion mountain, teach feet-first dismounts, and enjoy watching your fearless little explorer grow steady.',
          pocketInsight:
            'Climbing is healthy motor wiring—not defiance. Build a cushion “Yes Mountain,” state short rules (“Chairs are for bottoms”), and teach belly-and-feet-first sliding down.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Why does pushing a heavy laundry basket across the hallway magically calm a wild, wired toddler?”',
            title: 'Why Toddlers Crave Pushing, Lifting & Spinning (“Heavy Work”)',
            targetSlug: 'toddler-vestibular-proprioception-neurobiology',
          },
          interactiveHighlights: ['Yes-Space Guardrail', 'Belly-First Dismount'],
        },
      },
      {
        slug: 'toddler-vestibular-proprioception-neurobiology',
        title: 'Why Toddlers Crave Pushing, Lifting & Spinning (“Heavy Work”)',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Heavy work · Calm through muscles & joints',
          headline: 'Why Toddlers Crave Pushing, Lifting & Spinning (“Heavy Work”)',
          deck: 'Why crashing into pillows and pushing heavy boxes isn’t “wild behavior”—it’s literally how toddler joints tell their brain to calm down.',
          sceneTime: '4:30 PM · RAINY-DAY ZOOMIES',
          sceneBody:
            'Stuck indoors all afternoon, {name} is sprinting full-tilt into couch cushions, slamming cabinet doors, and trying to drag a full gallon milk jug across the kitchen. *Before you say “calm down!”—watch what happens when you give {obj} a heavy laundry basket to push down the hall.*',
          pollQuestion: 'Does your toddler get intense bursts of crashing, spinning, or pushing energy?',
          pollOptions: [
            {
              id: 'zoomies',
              label: 'Yes—pure full-body indoor zoomies!',
              response:
                'Occupational therapists call this seeking “heavy work” (proprioceptive input)—deep pressure on muscles and joints flips the nervous system straight from wired to calm!',
            },
            {
              id: 'curious',
              label: 'Curious how to use “heavy work” on purpose',
              response:
                'Wait until you try handing a cranky toddler two canned goods to carry or a loaded laundry basket to push—it works like a biological reset button.',
            },
          ],
          beat2Kicker: 'Inside {possessive} sensory brain',
          beat2Title: 'Deep muscle pressure flips the calm switch',
          beat2Lead:
            'Toddlers have two hidden sixth senses: balance (spinning/swinging) and joint pressure (“heavy work”—pushing, pulling, carrying). Toggle below to see how 5 minutes of heavy work settles a wired nervous system.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Wired zoomies vs. “heavy work” muscle reset',
          visualStageHint: 'Toggle to compare bottled energy vs. heavy-work calm',
          visualConfig: {
            calmToggleLabel: 'After 5 min of heavy work',
            stormToggleLabel: 'Rainy-day wired zoomies',
            calmStatus: 'BODY GROUNDED · READY TO FOCUS',
            stormStatus: 'SENSORY HUNGER · SEEKING INPUT',
            calmReadouts: [
              {
                name: 'Joint & Muscle Receptors',
                value: 'Satisfied',
                tone: 'spruce',
                desc: 'Pushing a full basket or carrying a watering can sends deep organizing signals straight to the brainstem.',
              },
              {
                name: 'Focus & Bedtime Calm',
                value: 'Settled',
                tone: 'spruce',
                desc: 'Once the body feels grounded in space, sitting for dinner or stories becomes dramatically easier.',
              },
            ],
            stormReadouts: [
              {
                name: 'Unmet Movement Drive',
                value: 'Overflowing',
                tone: 'amber',
                desc: 'Crashing into couches and slamming doors is {possessive} body hunting for deep joint resistance.',
              },
              {
                name: '“Sit Still!” Bandwidth',
                value: 'Near zero',
                tone: 'amber',
                desc: 'Asking a sensory-hungry 1-year-old to sit quietly makes {obj} bounce twice as hard.',
              },
            ],
          },
          almanacTruth:
            'Deep muscle resistance (“heavy work”—pushing a laundry basket, carrying a small watering can, squishing playdough) calms a wired toddler nervous system faster than telling them to “calm down.”',
          scienceDeepDive:
            'Proprioceptive mechanoreceptors in muscle spindles and Golgi tendon organs project directly to the cerebellum and reticular activating system, modulating autonomic arousal and serotonin release. Pediatric occupational therapy uses heavy work to organize sensory-seeking behavior before calm transitions like meals or sleep.',
          beat3Kicker: 'Turning wild energy into helpful jobs',
          beat3Title: 'Redirecting crashing & slamming into proud toddler missions',
          rehearsalTriggerSpeaker: '{Name} gleefully slamming the kitchen pantry door',
          rehearsalTriggerQuote: '“*BAM!* *BAM!*” (Bouncing on tiptoes)',
          rehearsalPrompt: 'Which reaction misses the physical clue behind the slamming?',
          instincts: [
            {
              id: 'sit',
              label:
                '“Stop bouncing off the walls! Come sit nicely on the couch right now!”',
              whyTitle: 'Why sitting still feels impossible right then',
              whyText:
                'When a toddler’s sensory tank is begging for resistance, forcing stillness builds pressure like shaking a soda bottle.',
            },
            {
              id: 'timeout',
              label:
                'Scold {obj} for being “too wild” and take toys away.',
              whyTitle: 'Why a physical mission works 10x faster',
              whyText:
                'Handing {name} a real physical job (“Help me push this heavy laundry basket to the bedroom!”) satisfies the exact muscle craving AND makes {obj} beam with pride.',
            },
          ],
          calmScriptPlain:
            '“Door stays gentle—those strong arms want a BIG job! Can you push this heavy laundry basket all the way down the hallway to the bedroom?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'limit',
              text: 'Door stays gentle',
              tag: 'Quick Boundary',
              note: 'Clear, brief limit with zero shaming.',
            },
            { text: '—' },
            {
              id: 'job',
              text: 'those strong arms want a BIG job! Can you push this heavy laundry basket all the way down the hallway to the bedroom?',
              tag: 'Heavy-Work Mission',
              note: 'Channels slamming straight into organizing muscle resistance plus proud helper status.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Offer heavy work 20 min before meals or bed',
            'Use real household helper missions',
            'Gentle spinning/swinging wakes up; heavy pushing calms down',
          ],
          pushbacks: [
            {
              id: 'bedtime',
              label: '“Will active play right before bedtime hype {obj} up?”',
              setup:
                'Fast spinning and tickling hype toddlers up—slow heavy pushing, pillow squishes (“make a toddler sandwich!”), and big bear hugs actually CALM them down:',
              script:
                '“Skip wild tickles after dinner; try 2 minutes of slow ‘pillow-burrito squishes’ before pajamas to settle wiggly legs!”',
            },
            {
              id: 'smallspace',
              label: '“We live in a small apartment with neighbors downstairs”',
              setup:
                'Silent heavy work requires zero jumping: pushing a towel-filled laundry basket, carrying a small water pitcher, or squishing homemade dough:',
              script:
                '“Pushing a smooth laundry basket on carpet or wiping the coffee table with a damp rag gives huge muscle feedback with zero stomping!”',
            },
          ],
          advisorPrompt:
            '“Give me 5 quiet, apartment-friendly ‘heavy work’ helper jobs for {name} ({age}) when indoor zoomies hit before dinner.”',
          beat4Kicker: 'Today’s 3-minute sensory reset',
          beat4Title: 'Pick one “heavy work” mission to try today',
          beat4Lead:
            'Watch {possessive} face light up when you invite {obj} into a real strong-kid job.',
          moves: [
            {
              id: 'laundrypush',
              title: 'Make {name} the official Laundry Basket Pusher',
              desc: 'Load a smooth basket with towels and let {obj} shove it across the floor—pure calming muscle magic.',
            },
            {
              id: 'grocerycarry',
              title: 'Hand {obj} one sturdy “heavy” item to carry (two cans or a squash)',
              desc: 'Walking from kitchen bag to pantry carrying a 2-pound item gives instant organizing pride.',
            },
            {
              id: 'burrito',
              title: 'Try 60 seconds of cozy “toddler burrito” deep-pressure squeezes',
              desc: 'Roll {name} gently in a bath towel or give slow firm leg-and-arm squeezes before bedtime books.',
            },
          ],
          closingNote:
            'The next time {name} looks “wild,” remember {poss} body isn’t misbehaving—it’s asking for work. Hand {obj} a laundry basket or watering can and watch a cranky tornado turn into your proudest little helper.',
          pocketInsight:
            'Wired toddler zoomies crave “heavy work.” Give 5 minutes of pushing a laundry basket, carrying sturdy groceries, or firm towel squeezes to flip the calm switch.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“How can two measuring cups and an inch of warm water buy you 15 peaceful minutes to cook dinner?”',
            title: 'Easy 10-Minute Water & Kitchen Play That Buys You Dinner Prep Time',
            targetSlug: 'toddler-sensory-tub-routine',
          },
          interactiveHighlights: ['Heavy-Work Reset Visual', 'Helper Mission Scripts'],
        },
      },
      {
        slug: 'toddler-sensory-tub-routine',
        title: 'Easy 10-Minute Water & Kitchen Play That Buys You Dinner Prep Time',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Shallow warm water + big towel · 15 calm minutes',
          headline: 'Easy 10-Minute Water & Kitchen Play That Buys You Dinner Prep Time',
          deck: 'Skip Pinterest dyed-rice messes—here is the 60-second warm-water kitchen setup that deeply absorbs 1-year-olds while you make dinner right beside them.',
          sceneTime: '5:25 PM · DINNER PREP CRUNCH',
          sceneBody:
            'You have ten minutes to chop vegetables and get pasta boiling, and {name} is pulling frantically at your knees begging to be held. *You don’t want to switch on cartoons, yet you only have two hands!* Enter one large bath towel, a baking pan, and an inch of warm soapy water.',
          pollQuestion: 'Do you dread elaborate “sensory bins” because of the cleanup?',
          pollOptions: [
            {
              id: 'mess',
              label: 'Yes—I do NOT want to vacuum rice for three days!',
              response:
                'Same! Water play on a big beach towel wipes dry in 15 seconds, never goes stale, and holds a 1-year-old’s attention longer than almost any toy.',
            },
            {
              id: 'needideas',
              label: 'Desperately need realistic dinner-prep lifelines',
              response:
                'Wait until you see the 60-second “wash the plastic animals” or “scoop and pour” setup below!',
            },
          ],
          beat2Kicker: 'Low-mess, high-absorption play',
          beat2Title: 'The 60-second dinner-prep setup',
          beat2Lead:
            'Pouring, scooping, and splashing engage bilateral hand-eye coordination AND calm the sensory nervous system at 5:30 PM. Tap the 4-step zero-stress setup below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 60-second kitchen water-play ritual',
          visualStageHint: 'Tap each step from towel to easy wipe-up',
          visualConfig: {
            steps: [
              {
                timeOrCue: '15 sec',
                label: 'Towel Base',
                title: 'Spread one thick beach towel on the kitchen floor (or sink tower)',
                desc: 'Keep it well away from the hot stove—the towel catches 95% of splashes automatically.',
                why: 'Eliminates slippery floors and makes cleanup literally picking up one towel.',
              },
              {
                timeOrCue: '15 sec',
                label: '1 Inch of Water',
                title: 'Shallow baking dish or mixing bowl + warm water',
                desc: 'Never fill deep—just one shallow inch of warm water (with one tiny drop of tear-free baby wash if you want bubbles!) under active supervision.',
                why: 'Always supervise 100% of water play within sight; shallow bowls make pouring joyful and manageable.',
              },
              {
                timeOrCue: '15 sec',
                label: '2 Simple Tools',
                title: 'Add 1 measuring cup + 1 slotted spoon (or 3 toy animals)',
                desc: 'Give a simple mission: “Can you give the plastic dinosaur and elephant a bubble bath?”',
                why: 'Scooping and pouring build early wrist rotation for spoons and cups.',
              },
              {
                timeOrCue: '15 sec',
                label: 'Warm Finish',
                title: '2-minute warning + “Help wipe the floor!”',
                desc: 'Give {name} a second dry cloth to “help” blot spills—turning cleanup into part of the game!',
                why: 'Smooth transition straight to dinner with clean hands already washed.',
              },
            ],
          },
          almanacTruth:
            'Water + two measuring cups on a thick bath towel buys more calm, joyful concentration than almost any store-bought toy—and wipes clean in thirty seconds.',
          scienceDeepDive:
            'Tactile water transfer exercises radial-ulnar wrist pronation/supination, depth judgment, and sustained joint attention. Warm thermal hand immersion also stimulates parasympathetic calming right during the late-afternoon cortisol trough.',
          beat3Kicker: 'Holding one easy water boundary',
          beat3Title: 'When {name} dumps the whole bowl onto the tile',
          rehearsalTriggerSpeaker: '{Name} gleefully tipping the water bowl sideways',
          rehearsalTriggerQuote: '“*SPLASH!* BIG WATER!”',
          rehearsalPrompt: 'Which reaction ruins the calm kitchen vibe?',
          instincts: [
            {
              id: 'panic',
              label:
                'Shout “OH NO, LOOK AT THIS GIANT MESS!” and cancel water play forever.',
              whyTitle: 'Why keeping water shallow fixes this effortlessly',
              whyText:
                'With just half an inch of water on a big bath towel, even a full dump takes 10 seconds to soak up—no disaster at all!',
            },
            {
              id: 'silent',
              label:
                'Keep refilling giant bowls over and over until the kitchen floods.',
              whyTitle: 'Why one clear boundary keeps it fun',
              whyText:
                '“Water stays in the tub—if it dumps, water time is all done and we wipe up together!” teaches real cause-and-effect calmly.',
            },
          ],
          calmScriptPlain:
            '“Whoa, big splash! Water stays inside the pan so our floor stays safe. Want to keep scooping gently, or grab the towel to wipe up together?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'calm',
              text: 'Whoa, big splash! Water stays inside the pan so our floor stays safe.',
              tag: 'Calm Clear Limit',
              note: 'Zero yelling—states the boundary neutrally so {name} learns control without shame.',
            },
            { text: ' ' },
            {
              id: 'choice',
              text: 'Want to keep scooping gently, or grab the towel to wipe up together?',
              tag: 'Hands Ownership',
              note: 'Invites {obj} to regulate {poss} own pour—and makes wiping up feel like a proud game if it spills again.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Always stay within sight during water play',
            'Use only 1 shallow inch of water',
            'Strip to diaper or roll sleeves up first',
          ],
          pushbacks: [
            {
              id: 'dryoption',
              label: '“What if I want a totally dry zero-mess kitchen backup?”',
              setup:
                'Try painter’s tape strips on the fridge or muffin-tin ball sorting—zero water, 100% toddler magnet:',
              script:
                '“Stick 5 strips of blue painter’s tape on the fridge or floor—peeling tape off works tiny pincer fingers for 10 focused minutes!”',
            },
            {
              id: 'wetclothes',
              label: '“I hate changing soaked outfits right before dinner”',
              setup:
                'Pop {name} down to a diaper + long-sleeve bib, or toss a soft dry tee right on after:',
              script:
                '“Diaper-only water play = zero wet laundry and straight into dinner!”',
            },
          ],
          advisorPrompt:
            '“Give me 4 zero-prep kitchen-floor activities (using everyday items like tape, bowls, or colanders) to keep {name} ({age}) happily busy while I cook.”',
          beat4Kicker: 'Tonight’s dinner-prep lifesaver',
          beat4Title: 'Pick one 60-second setup to try tonight',
          beat4Lead:
            'Watch {name} disappear into happy pouring while you actually chop dinner with both hands.',
          moves: [
            {
              id: 'animalwash',
              title: 'Run a 10-minute “Animal Bubble Wash” on a big kitchen towel',
              desc: 'Shallow baking pan + 1 inch warm water + 3 plastic animals + one soft toothbrush to scrub them clean.',
            },
            {
              id: 'tapepull',
              title: 'Try the 30-second “Blue Painter’s Tape” fridge rescue',
              desc: 'Stick 6 folded-edge tape tabs at {poss} eye level on the fridge or floor and watch {poss} fingers concentrate.',
            },
            {
              id: 'towelhelper',
              title: 'Give {name} a mini dry washcloth to “help wipe” at the finish',
              desc: 'Turns cleanup into a proud big-kid game and transitions smoothly to the table.',
            },
          ],
          closingNote:
            'The best toddler play setups never come in fancy boxes—they live right in your kitchen drawer. Ten calm minutes of scooping warm water beside you gives {name} deep joy and gives you room to breathe.',
          pocketInsight:
            'Spread a thick bath towel away from the stove with 1 shallow inch of warm water, 2 measuring cups, and active supervision—15 absorbed minutes, 30-second cleanup.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery:
              '“Why does repeating ‘Say apple! Say apple!’ slow speech down—and which effortless 1-word expansion unlocks the 50-word burst?”',
            title: 'Sparking First Words Naturally (Without Quizzing “Say Apple!”)',
            targetSlug: 'toddler-first-words-language-burst',
          },
          interactiveHighlights: ['60-Sec Water Setup', 'Painter’s Tape Backup'],
        },
      },
      {
        slug: 'toddler-first-words-language-burst',
        title: 'Sparking First Words Naturally (Without Quizzing “Say Apple!”)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'The +1 Rule · “Car!” → “Fast red car!”',
          headline: 'Sparking First Words Naturally (Without Quizzing “Say Apple!”)',
          deck: 'Why speech therapists trade “Say X!” quizzing for the effortless “Echo + Add One Word” habit—and remember that animal sounds and signs count as real words!',
          sceneTime: '10:00 AM · READING A BOARD BOOK',
          sceneBody:
            'You point to a bright red apple and ask eagerly: *“What’s that? Say apple! Ap-ple!”* {Name} stares silently, closes the book, and walks away. Five minutes later, while you simply murmur *“Crunch, crunch—sweet red apple!”* without asking, {pronoun} grins and chimes: *“Apa!”*',
          pollQuestion: 'Do you sometimes worry whether {name} is saying enough words yet?',
          pollOptions: [
            {
              id: 'comparing',
              label: 'Yes—hard not to compare with other toddlers!',
              response:
                'Here’s a huge relief most parents don’t hear: consistent animal sounds (“moo”), word approximations (“ba” for ball), and baby signs (“more”) ALL count as real expressive words at ages 1–2!',
            },
            {
              id: 'burst',
              label: 'Words are popping up—want to nurture them well',
              response:
                'Using the “Echo + Add One” rule turns every snack and stroller walk into effortless vocabulary rocket fuel.',
            },
          ],
          beat2Kicker: 'How toddler vocabulary explodes',
          beat2Title: 'The “Echo + Add One” speech loop',
          beat2Lead:
            'Quizzing (“What color is that? Say truck!”) tests memory under spotlight pressure. Speech-language pathologists use three calm steps that invite words effortlessly. Tap below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The Speech Therapist’s “Echo + 1” loop',
          visualStageHint: 'Tap each beat to see how words multiply naturally',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: '{Name} points or says 1 sound',
                label: 'Wait & Notice',
                quote: '“Duh!” (Pointing excitedly at a passing dog)',
                desc: 'Pause three warm seconds and let {name} initiate—even a point, grunt, or sign is {poss} turn in the conversation.',
                brainNote: 'Spontaneous initiation activates expressive retrieval circuits.',
              },
              {
                stepNum: '02',
                actor: 'You validate clearly',
                label: 'Confirm Without Correcting',
                quote: '“Yes—DOG! Big brown dog!”',
                desc: 'Never say “No, not ‘duh’, say D-O-G!”—simply model the crisp word warmly so {name} feels 100% successful.',
                brainNote: 'Zero-shame modeling keeps {name} eager to keep trying new words.',
              },
              {
                stepNum: '03',
                actor: 'Add ONE new word',
                label: 'The +1 Expansion',
                quote: 'Point → “Dog!” · “Dog!” → “Big dog!” · “Big dog!” → “Big dog runs!”',
                desc: 'Always step just ONE word ahead of where {name} is—adding action words (go, open, push, jump) builds early sentences fast!',
                brainNote: 'Action verbs unlock 2-word combinations around 18–24 months.',
              },
            ],
          },
          almanacTruth:
            'Swap three questions (“What is that? Say apple!”) for three warm comments (“Crunch! Red apple!”). Model clear words, add just one word to what {name} says, and celebrate signs and sounds as real words.',
          scienceDeepDive:
            'Pediatric speech-language pathology evidence (Hanen “It Takes Two to Talk”) demonstrates that responsive semantic recasting (“echo + 1 word expansion”) and comment-heavy interaction outperform directive prompting (“say X”) in driving the 18-to-24-month lexical spurt and early verb-noun combinations.',
          beat3Kicker: 'Everyday talk without pressure',
          beat3Title: 'Turning snack time into effortless word magic',
          rehearsalTriggerSpeaker: '{Name} reaching toward a closed container of crackers',
          rehearsalTriggerQuote: '“*Unh! Unh!*” (Reaching impatiently)',
          rehearsalPrompt: 'Which everyday habit removes the fun chance to practice a word?',
          instincts: [
            {
              id: 'mindread',
              label:
                'Anticipate every single need instantly in silence before {name} even points.',
              whyTitle: 'Why adding a 3-second cheerful pause helps',
              whyText:
                'Mind-reading comes from pure love! Just pausing 3 warm seconds holding the jar up (“Ooh—OPEN? Open please!”) gives {name} a joyful reason to try a sound or sign.',
            },
            {
              id: 'withhold',
              label:
                'Refuse to hand over the cracker until {pronoun} pronounces “cracker” clearly.',
              whyTitle: 'Why holding food hostage triggers tears',
              whyText:
                'Never withhold snacks as a speech test—just pause 3 seconds, model “Open! Cracker!” once brightly, and hand it right over with a smile.',
            },
          ],
          calmScriptPlain:
            '“(Hold jar near your smiling mouth, pause 3 seconds) Open! You want it OPEN! Pop—open goes the lid!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'hold',
              text: '(Hold jar near your smiling mouth, pause 3 seconds)',
              tag: 'Invites a Bid',
              note: 'Holding the object near your mouth draws {poss} eyes cleanly to how your lips form the word.',
            },
            { text: ' ' },
            {
              id: 'verb',
              text: 'Open! You want it OPEN! Pop—open goes the lid!',
              tag: 'Power Verb',
              note: 'High-power words like open, more, go, up, help, and all done unlock real daily communication way faster than memorizing colors or shapes.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Comment 3x more than you quiz',
            'Repeat fun action words (go, open, pop, splash)',
            'Ask your pediatrician early if ever concerned—early support is wonderful!',
          ],
          pushbacks: [
            {
              id: 'whatcounts',
              label: '“Wait—what actually counts toward {possessive} word count?”',
              setup:
                'Any consistent sound, approximation, animal sound, or sign used intentionally for the same thing counts as a true word:',
              script:
                '“‘Ba’ for ball, ‘moo’ for cow, ‘uh-oh’, and signing ‘more’ all count 100% as real toddler words!”',
            },
            {
              id: 'checkspeech',
              label: '“When should I bring up speech questions with our pediatrician?”',
              setup:
                'Trust your gut—mentioning any questions at 15- or 18-month well-child visits opens free or simple early-support evaluations with zero downside:',
              script:
                '“Checking in early with our pediatrician or a speech therapist is a proactive gift, never a label—always bring your questions warmly to your doctor.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) currently uses gestures and a handful of sounds—what 5 playful power-word games (like ‘ready, set… GO!’) can we play this week?”',
          beat4Kicker: 'Today’s joyful speech game',
          beat4Title: 'Pick one zero-pressure word habit today',
          beat4Lead:
            'Less quizzing, more playful sound effects—watch {possessive} face light up.',
          moves: [
            {
              id: 'readyset',
              title: 'Play “Ready, set… [3-second pause]… GO!” on the swing or ball roll',
              desc: 'Pause with raised eyebrows right before “GO!”—watch {name} giggle, squeal, or try the word {obj}self!',
            },
            {
              id: 'plusone',
              title: 'Use the “Echo + 1 Word” reply five times today',
              desc: 'When {name} says “car,” cheer back “FAST car!” or “BLUE car!”—never correcting, always expanding.',
            },
            {
              id: 'dropquiz',
              title: 'Trade “What’s that?” for fun narration during one story tonight',
              desc: 'Skip quizzing pictures; instead add lively verbs and sound effects (“Splash! Jump! Pop!”).',
            },
          ],
          closingNote:
            'Language blooms in warmth, laughter, and unhurried pauses—never under a quiz spotlight. Every silly “pop!”, every patient three-second wait, and every echoed babble is building {possessive} voice.',
          pocketInsight:
            'Drop “Say X!” quizzing—comment warmly, use the “Echo + 1 Word” rule, play “Ready, set… [pause]… GO!”, and celebrate animal sounds and signs as real words.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Echo + 1 Speech Loop', 'Power-Word Play'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 10: Calm Screen Limits & Phone-Snatching Peace (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'digital-toddler-screen-tantrums-and-coping',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    developmentalTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
    title: 'Calm Screen Limits & Phone-Snatching Peace',
    reliefSubtitle:
      'Turn off screens without meltdowns, understand why faces beat tablets for words, keep bedrooms screen-free, and handle phone-grabbing in public',
    tonightQuickWinTitle: 'Episode 1: Turning Off the Screen Without a Meltdown',
    summary:
      'Use a predictable 3-step visual wind-down to turn off shows calmly, understand the toddler video deficit, keep bedrooms and mealtimes screen-free, and redirect phone-snatching cleanly.',
    coverImageUrl: 'https://assets.alongside.care/academy/digital-toddler.png',
    sortOrder: 2,
    episodes: [
      {
        slug: 'toddler-screen-transition-stoplight',
        title: 'Turning Off the Screen Without a Meltdown',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Join · Say bye-bye · Hand {name} the off-button',
          headline: 'Turning Off the Screen Without a Meltdown',
          deck: 'Why grabbing the remote abruptly sparks instant toddler rage—and the 90-second “Join, Wave Bye-Bye, Bridge” sequence that ends screens calmly.',
          sceneTime: '5:10 PM · END OF ONE SHORT VIDEO',
          sceneBody:
            'You let {name} watch ten minutes of a gentle show while you finished a phone call. The second you click the screen black, {pronoun} arches backward howling as if you snatched away {poss} favorite blanket. *Why does turning off a screen hit harder than ending any other toy?*',
          pollQuestion: 'Does turning off a screen trigger outsized tears in your house?',
          pollOptions: [
            {
              id: 'everytime',
              label: 'Yes—almost every single time!',
              response:
                'It isn’t bad behavior: rapid bright screens trigger an abrupt dopamine drop when snapped off cold. A 60-second warm bridge softens that drop dramatically.',
            },
            {
              id: 'avoid',
              label: 'We rarely use screens yet—want good habits upfront',
              response:
                'Installing the “Join → Wave Bye → Bridge” routine from the very first show prevents years of screen tug-of-war.',
            },
          ],
          beat2Kicker: 'Softening the off-switch',
          beat2Title: 'The 3-step gentle screen landing strip',
          beat2Lead:
            'Jumping straight from glowing screen to dark room feels like slamming brakes at 60 mph. Tap the 4-step smooth landing sequence below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 90-second tear-free screen exit',
          visualStageHint: 'Tap each beat from joining in to smooth landing',
          visualConfig: {
            steps: [
              {
                timeOrCue: '2 min left',
                label: 'Sit & Join First',
                title: 'Enter {possessive} world for 30 seconds before ending',
                desc: 'Sit beside {name} and comment warmly: “Ooh, look at the red bus! After this song ends, TV goes night-night.”',
                why: 'Connecting BEFORE setting a limit prevents the jarring feeling of being yanked away.',
              },
              {
                timeOrCue: '30 sec left',
                label: 'Kill Autoplay',
                title: 'Turn Autoplay OFF & end on a natural song/episode finish',
                desc: 'Never cut off mid-song if you can wait 20 seconds—and keep YouTube/Netflix autoplay permanently disabled.',
                why: 'Eliminates the painful cliffhanger of watching the next thumbnail start rolling.',
              },
              {
                timeOrCue: 'Off-Switch',
                label: 'Wave Bye-Bye',
                title: 'Let {name} press the button or wave “Night-night, bus!”',
                desc: 'Handing {obj} the tiny ritual of waving goodbye gives back agency right as the screen goes dark.',
                why: 'Autonomy + predictable ritual softens the dopamine dip.',
              },
              {
                timeOrCue: 'Next Beat',
                label: 'Ready Bridge',
                title: 'Have one concrete hands-on thing already waiting',
                desc: 'Transition straight into a warm snack, bubbles, or a favorite truck already sitting on the rug.',
                why: 'Moves attention forward into real play instead of staring at a blank screen.',
              },
            ],
          },
          almanacTruth:
            'Never yank a screen off cold—sit beside {name} for 30 seconds first, disable autoplay, wave bye-bye to the show, and step straight onto a waiting real-world bridge.',
          scienceDeepDive:
            'Abrupt termination of high-salience audiovisual media triggers an acute drop in striatal reward signaling paired with a jarring attentional shift. Co-attentive connection before transition (“joining”) plus predictable endpoint cues and immediate tactile bridging significantly reduce transition distress.',
          beat3Kicker: 'Holding the off-switch calmly',
          beat3Title: 'When {name} begs “MORE! MORE!” after waving bye',
          rehearsalTriggerSpeaker: '{Name} pointing tearfully at the dark TV screen',
          rehearsalTriggerQuote: '“MORE BUS! TURN ON! *WAAAH!*”',
          rehearsalPrompt: 'Which tired move teaches {name} to cry louder tomorrow?',
          instincts: [
            {
              id: 'onemore',
              label:
                '“Okay, JUST one more two-minute song so you stop crying!”',
              whyTitle: 'Why that’s a super-reinforcer',
              whyText:
                'Turning the screen back on after tears wires an unbreakable lesson: “Crying loudly turns the TV back on!” Holding steady kindly for 60 seconds breaks the loop.',
            },
            {
              id: 'neveragain',
              label:
                'Say angrily: “Since you’re crying, NO shows for the rest of the week!”',
              whyTitle: 'Why future threats don’t land at age 1',
              whyText:
                'A 1-year-old cannot connect Tuesday’s tears to Friday’s ban—calm empathy plus moving gently to the snack table is all {pronoun} needs.',
            },
          ],
          calmScriptPlain:
            '“Aw, it’s hard to say bye-bye to the bus! Bus is sleeping now. Let’s take a deep breath—want to roll the big red truck or crunch your apple slices?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'empathy',
              text: 'Aw, it’s hard to say bye-bye to the bus! Bus is sleeping now.',
              tag: 'Validates + Holds Line',
              note: 'Warm empathy with zero wobbling—never turns the screen back on.',
            },
            { text: ' ' },
            {
              id: 'bridge',
              text: 'Let’s take a deep breath—want to roll the big red truck or crunch your apple slices?',
              tag: 'Two-Choice Bridge',
              note: 'Gently pulls {possessive} brain out of grief and straight into real-world motion.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Disable Autoplay on every app today',
            'Use TV across the room—avoid hand-held tablets',
            'Once screen is off, it stays warmly off',
          ],
          pushbacks: [
            {
              id: 'tablet',
              label: '“Is a TV on the wall really easier to turn off than a tablet or phone?”',
              setup:
                'Huge difference! Taking a tablet out of tiny hands feels like losing a possession; waving bye to a wall TV feels neutral:',
              script:
                '“Whenever we do watch a short show, putting it on the living-room TV avoids the ‘snatched out of my hands’ meltdown.”',
            },
            {
              id: 'cries2min',
              label: '“{Pronoun} still cries for two minutes even when I do the whole routine”',
              setup:
                'Two minutes of supported tears is totally okay—it means the routine is working and {pronoun} is learning to handle disappointment:',
              script:
                '“Your tears are totally welcome while the show rests. I’m holding you right here until your body feels ready to play.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) melts down intensely whenever screens turn off—what 3 calm, slow-paced shows and transition bridges work best if we use occasional screen time?”',
          beat4Kicker: 'Your calm screen habit',
          beat4Title: 'Pick one transition smoother today',
          beat4Lead:
            'One 30-second setting change (turning Autoplay OFF) prevents half of screen tears.',
          moves: [
            {
              id: 'noautoplay',
              title: 'Switch Autoplay OFF in YouTube, Netflix, and Disney+ right now',
              desc: 'Letting the credits finish peacefully to a still screen removes instant cliffhanger tears.',
            },
            {
              id: 'joinwave',
              title: 'Practice the “Join 30s → Wave Bye-Bye” exit next time',
              desc: 'Sit beside {name}, name what’s on screen, wave bye together, and click off calmly.',
            },
            {
              id: 'walltv',
              title: 'Default any occasional show to the shared TV instead of handhelds',
              desc: 'Keeping screens on the wall prevents constant phone/tablet grabbing battles.',
            },
          ],
          closingNote:
            'Screen transitions don’t have to end in guilt or tears. Join {name} briefly, turn off autoplay, wave bye-bye to the show, and step calmly back into the bright real world together.',
          pocketInsight:
            'Kill Autoplay, sit beside {name} for 30 seconds before turning off, wave bye-bye together, and land straight on a waiting snack or toy—never turn it back on for tears.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Why can a toddler watch an educational app 20 times and still learn faster from one 2-minute chat with you?”',
            title: 'Why Toddlers Learn Words From Faces, Not Tablets',
            targetSlug: 'toddler-video-deficit-effect',
          },
          interactiveHighlights: ['90-Sec Exit Strip', 'Autoplay Off Rule'],
        },
      },
      {
        slug: 'toddler-video-deficit-effect',
        title: 'Why Toddlers Learn Words From Faces, Not Tablets',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: '2D flat glass vs. 3D live human warmth',
          headline: 'Why Toddlers Learn Words From Faces, Not Tablets',
          deck: 'Why developmental scientists call it the “Video Deficit”—and how simply talking along beside any screen unlocks real learning when screens are on.',
          sceneTime: '11:20 AM · READING AN APP AD',
          sceneBody:
            'An ad pops up promising a “toddler speech-accelerator tablet app for 15-month-olds!” *A quiet worry tugs at you: “Am I holding {name} back if I don’t buy educational apps?”* Wait until you see what laboratory tests actually found.',
          pollQuestion: 'Have “early learning” apps ever made you wonder if your toddler needs them?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes—the marketing is super convincing!',
              response:
                'Relax completely: every major pediatric study shows toddlers under age two learn dramatically MORE words from real 3D play and live faces than from any app ever built.',
            },
            {
              id: 'coview',
              label: 'We watch a little together—want to make it healthy',
              response:
                'When a screen IS on, simply sitting nearby and naming one real-life tie-in (“Look, a yellow bus just like ours!”) bridges the 2D-to-3D gap immediately!',
            },
          ],
          beat2Kicker: 'Inside {possessive} learning brain',
          beat2Title: 'Why live faces beat flat screens at ages 1–2',
          beat2Lead:
            'Toddlers under two struggle to translate flat 2D symbols into the 3D world unless a real human bridges them. Tap through the 3-beat comparison below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'How live interaction unlocks toddler learning',
          visualStageHint: 'Tap each step to see why your voice is the real teacher',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'The 2D gap',
                label: 'Flat Glass Limit',
                quote: 'A video character says “Ball!”—even when {name} looks away',
                desc: 'Under 24 months, a toddler’s brain expects objects to have real weight, depth, and responsive timing—flat pre-recorded clips miss those cues.',
                brainNote: 'Called the “Video Deficit Effect” across decades of developmental studies.',
              },
              {
                stepNum: '02',
                actor: 'Your live voice',
                label: 'The Human Bridge',
                quote: '“Ooh, look! Red ball bouncing—just like your squishy ball on the rug!”',
                desc: 'When you occasionally co-view and connect what’s on screen to a real toy in the room, learning switches right back on!',
                brainNote: 'Social contingency tells the hippocampus “this matters—save it!”',
              },
              {
                stepNum: '03',
                actor: '3D real play',
                label: 'Best Classroom',
                quote: 'Rolling one real ball back and forth on the carpet',
                desc: 'Feeling the weight, chasing the roll, and sharing a grin wires language, depth perception, and motor skills all at once.',
                brainNote: 'Zero app subscription can outperform 5 minutes of real 3D back-and-forth.',
              },
            ],
          },
          almanacTruth:
            'No 1-year-old has ever fallen behind from skipping “educational” apps. Real 3D objects and your responsive voice teach words faster—and whenever a show IS on, a single warm comment from you bridges the gap.',
          scienceDeepDive:
            'Landmark experiments by Dr. Patricia Kuhl (Mandarin phonetic learning) and Dr. Georgene Troseth (video deficit trials) demonstrated that infants and young toddlers show robust language and imitation learning from live interactive humans, whereas identical content delivered via non-interactive video yields near-baseline retention unless scaffolded by live caregiver co-viewing.',
          beat3Kicker: 'Drop the app-guilt forever',
          beat3Title: 'Making peace with zero educational apps (and smart co-viewing)',
          rehearsalTriggerSpeaker: 'Comparing toddler “learning” tablets with friends',
          rehearsalTriggerQuote:
            '“My friend’s 18-month-old taps animal shapes on an iPad—should we get one so {name} doesn’t fall behind?”',
          rehearsalPrompt: 'Which marketing myth steals parent peace most easily?',
          instincts: [
            {
              id: 'buyapp',
              label:
                'Download five bright “toddler genius” apps so {name} gets a head start on ABCs.',
              whyTitle: 'Why real play gives the true head start',
              whyText:
                'Tapping glowing glass teaches finger swiping—stacking real wooden blocks, turning board-book pages, and chatting at the grocery store build far deeper executive function.',
            },
            {
              id: 'shame',
              label:
                'Feel awful if you occasionally put on 15 minutes of a slow show while sick or exhausted.',
              whyTitle: 'Why occasional calm shows aren’t the enemy',
              whyText:
                'Using a gentle show occasionally so you can survive a sick day is real life! Just know you never need to buy “educational” apps out of fear.',
            },
          ],
          calmScriptPlain:
            '“Oh, look at the puppy jumping in the puddle! Remember when you jumped in that puddle in your yellow boots this morning? Splash, splash!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'connect',
              text: 'Oh, look at the puppy jumping in the puddle!',
              tag: 'Active Co-Viewing',
              note: 'Turns passive staring into shared human attention in five seconds.',
            },
            { text: ' ' },
            {
              id: 'realworld',
              text: 'Remember when you jumped in that puddle in your yellow boots this morning? Splash, splash!',
              tag: 'Bridges to 3D Life',
              note: 'Connects 2D imagery straight to {possessive} real memories—actually unlocking vocabulary retention.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Skip “educational” apps under age 2',
            'Connect occasional shows to real-life toys',
            'Hands-on board books beat glowing touchscreens',
          ],
          pushbacks: [
            {
              id: 'singers',
              label: '“Wait—what about slow human-face speech videos where a real teacher sings?”',
              setup:
                'Slow, real-face human pacing is vastly calmer than frantic cartoons—and singing the exact same song live with {name} afterward doubles the magic:',
              script:
                '“If we watch a slow sing-along, let’s sing ‘Wheels on the Bus’ face-to-face during diaper changes too so it jumps off the screen into real life!”',
            },
            {
              id: 'gift',
              label: '“Someone gifted us a toddler tablet for {poss} first birthday”',
              setup:
                'Tuck it happily in the top closet shelf as a future airplane-travel tool around age 3+:',
              script:
                '“Thank you so much! We’re saving it tucked away for long flights when {name} gets a bit older.”',
            },
          ],
          advisorPrompt:
            '“What are 3 calm, slow-paced video options if we ever need a 15-minute lifeline on a sick day or flight with {name} ({age})?”',
          beat4Kicker: 'Today’s effortless brain builder',
          beat4Title: 'Pick one real-world swap today',
          beat4Lead:
            'Zero apps to install—just real toys and your voice.',
          moves: [
            {
              id: 'bridgeone',
              title: 'Make one real-world bridge comment next time a show is on',
              desc: 'Link one thing on screen (“red truck!”) to a real object or memory in {possessive} day.',
            },
            {
              id: 'bookbasket',
              title: 'Put 4 sturdy board books at floor level right next to the couch',
              desc: 'Make real page-turning the easiest thing {name} can grab when looking for entertainment.',
            },
            {
              id: 'nosub',
              title: 'Give yourself full permission to skip toddler “learning apps”',
              desc: 'Save the subscription fee—your kitchen spoons and park walks are the real Ivy League preschool.',
            },
          ],
          closingNote:
            'Don’t let glossy app ads whisper that your ordinary day isn’t enough. Your smiling face, a dog barking down the street, and a chunky cardboard book give {possessive} brain everything it hungers for.',
          pocketInsight:
            'Toddlers under 2 learn words from 3D objects and responsive faces, not flat apps. Skip “educational” app pressure; when screens are on, add one real-life tie-in comment.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“How does even 15 minutes of evening screen glow shift {possessive} bedtime by nearly an hour?”',
            title: 'Protecting Evening Calm With Screen-Free Zones',
            targetSlug: 'toddler-screen-free-bedroom-audit',
          },
          interactiveHighlights: ['Video Deficit Bridge', 'Real-Life Tie-In Script'],
        },
      },
      {
        slug: 'toddler-screen-free-bedroom-audit',
        title: 'Protecting Evening Calm With Screen-Free Zones',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Bedroom & dinner table · Sacred calm zones',
          headline: 'Protecting Evening Calm With Screen-Free Zones',
          deck: 'Why setting two clear “screen-free rooms” (the bedroom and dinner table) protects toddler sleep and ends evening bargaining automatically.',
          sceneTime: '6:40 PM · PRE-BEDTIME COUCH',
          sceneBody:
            'A bright cartoon plays right before bath time. Suddenly {name} seems weirdly wired—tossing around the crib for 40 minutes after lights out and waking restless at 1 AM. *Why did a calm-looking show steal {poss} sleep?*',
          pollQuestion: 'Do screens ever creep into the hour before bedtime or dinner?',
          pollOptions: [
            {
              id: 'dinner',
              label: 'Sometimes during dinner or right before bath',
              response:
                'Super common! Moving any screen time earlier in the afternoon and keeping the final 60 minutes before bed screen-free boosts toddler melatonin almost immediately.',
            },
            {
              id: 'proactive',
              label: 'Keeping bedrooms & meals screen-free already',
              response:
                'Gold-standard foundation! Establishing those two rooms as neutral house zones now saves massive battles at ages 5, 10, and 14.',
            },
          ],
          beat2Kicker: 'Zones beat daily debates',
          beat2Title: 'Negotiating every evening vs. two sacred screen-free zones',
          beat2Lead:
            'Toddler eyes have crystal-clear lenses that absorb evening blue light at nearly twice the adult rate—suppressing melatonin fast. Toggle below to compare daily arguing vs. clean house zones.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Evening screen debates vs. screen-free zones',
          visualStageHint: 'Toggle to compare both household approaches',
          visualConfig: {
            willpowerLabel: 'Case-by-case debating',
            willpowerTitle: 'Deciding fresh every tired evening',
            willpowerDesc:
              'When screens sometimes appear at dinner or right before bed, toddlers push every single night hoping tonight is a “yes” night.',
            willpowerOutcome: 'Delayed melatonin, wired bedtimes, and nightly whining.',
            guardrailLabel: 'Two Calm House Zones',
            guardrailTitle: 'Table & Bedroom = 100% Screen-Free for ALL',
            guardrailDesc:
              'Screens power down at least 60 minutes before bedtime and never enter bedrooms or the dining table—making the house itself hold the boundary.',
            guardrailOutcome: 'Faster sleep onset, calmer dinners, and zero personal arguments.',
            environmentShifts: [
              'Close screens at least 60 minutes before bedtime—switch to warm lamps, music, or bath play.',
              'Keep bedrooms 100% screen-free (including parent phones docked in the hall or face-down!).',
              'Keep the dinner table screen-free so mealtimes stay focused on hunger cues and family chatter.',
            ],
          },
          almanacTruth:
            'A toddler’s clear eyes absorb evening blue light at double the adult rate. Keeping bedrooms, dinner tables, and the final hour before bed screen-free protects sleep automatically.',
          scienceDeepDive:
            'Pediatric circadian photobiology studies (LeBourgeois et al., Pediatrics) demonstrate that young children’s large pupils and transparent crystalline lenses allow roughly twice the short-wavelength retinal irradiance of adults, producing significantly greater evening melatonin suppression and prolonged sleep-onset latency from pre-bedtime screen exposure.',
          beat3Kicker: 'Holding neutral house rules',
          beat3Title: 'Letting the clock & room hold the boundary',
          rehearsalTriggerSpeaker: '{Name} pointing at the dark TV after dinner',
          rehearsalTriggerQuote: '“WATCH SHOW! ELMO! PLEASE!!”',
          rehearsalPrompt: 'Which tired phrasing turns a simple house zone into a personal argument?',
          instincts: [
            {
              id: 'because',
              label:
                '“No, because Mommy said you watched too much earlier and you won’t sleep!”',
              whyTitle: 'Why making it personal sparks pushback',
              whyText:
                'Making yourself the sole villain invites pleading—letting the warm house rhythm (“The sun is going down, so the TV is already sleeping”) ends debates fast.',
            },
            {
              id: 'phonebed',
              label:
                'Hand {name} your phone inside the crib or bedroom just to calm tears before sleep.',
              whyTitle: 'Why bedroom screens are the hardest habit to undo',
              whyText:
                'Once the bedroom associates with glowing videos, every 2 AM wake-up triggers crying for the phone. Keep bedrooms cozy, dim, and strictly analog.',
            },
          ],
          calmScriptPlain:
            '“Look out the window—it’s evening time, so the TV and phones are sleeping for the night! Want to pick our bath toys or turn on our sleepy music?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'sun',
              text: 'Look out the window—it’s evening time, so the TV and phones are sleeping for the night!',
              tag: 'Neutral House Rhythm',
              note: 'Frames the limit around evening itself—never feels like arbitrary punishment.',
            },
            { text: ' ' },
            {
              id: 'fun',
              text: 'Want to pick our bath toys or turn on our sleepy music?',
              tag: 'Cozy Forward Pull',
              note: 'Moves {name} right into the warm evening wind-down with an appealing choice.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Screens off 60 minutes before bed',
            'TV “goes to sleep” after dinner',
            'Keep parent phones out of the dinner table too',
          ],
          pushbacks: [
            {
              id: 'restaurants',
              label: '“What about family restaurants—does dinner-table screen-free apply there?”',
              setup:
                'Aim for screen-free meals at home every single night; on rare long restaurant waits, pack stickers/crayons first and skip guilt if you need a tiny emergency backup:',
              script:
                '“Home dinner table is always our sacred screen-free zone; a tiny restaurant pouch of washable markers and snacks covers 90% of eating-out waits!”',
            },
            {
              id: 'music',
              label: '“Can we play lullaby music from a speaker in the bedroom?”',
              setup:
                'Audio-only speakers (no glowing video screen) with gentle lullabies or brown noise are 100% wonderful for sleep!',
              script:
                '“Cozy audio-only music or brown noise with zero screen glow supports great rest.”',
            },
          ],
          advisorPrompt:
            '“Help me build a simple 60-minute screen-free evening flow between dinner and bedtime for {name} ({age}) that doesn’t require tons of parent energy.”',
          beat4Kicker: 'Tonight’s sleep sanctuary',
          beat4Title: 'Pick one screen-free zone habit tonight',
          beat4Lead:
            'Install these clean house zones at age 1 and thank yourself for the next decade.',
          moves: [
            {
              id: 'sixtyoff',
              title: 'Make “TV sleeps after dinner” your official house rhythm tonight',
              desc: 'Swap pre-bath video for warm lamps, cozy music, or 5 minutes of floor wrestling/books.',
            },
            {
              id: 'tablebasket',
              title: 'Park adult phones on the kitchen counter during dinner',
              desc: 'Modeling screen-free meals yourself is the single strongest lesson {name} absorbs.',
            },
            {
              id: 'bedroompure',
              title: 'Keep {possessive} bedroom 100% screen-free',
              desc: 'Reserve the bedroom exclusively for books, cuddles, dim amber light, and sleep.',
            },
          ],
          closingNote:
            'When the table and the bedroom stay quietly analog, evenings slow down for everyone—not just {name}. You are installing a peaceful family culture that will protect {poss} rest all the way through high school.',
          pocketInsight:
            'Protect toddler melatonin: power screens off 60 minutes before bedtime, keep bedrooms and dinner tables 100% screen-free, and let the evening rhythm hold the rule.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery:
              '“Why is YOUR phone the #1 most fascinating forbidden object on earth to a 1-year-old—and how do you stop constant grabbing?”',
            title: 'What to Do When {Name} Grabs for Your Phone in Public',
            targetSlug: 'toddler-phone-snatching-response',
          },
          interactiveHighlights: ['Screen-Free Zones Toggle', 'TV-Sleeping Script'],
        },
      },
      {
        slug: 'toddler-phone-snatching-response',
        title: 'What to Do When {Name} Grabs for Your Phone in Public',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Grown-up tool · Not a toddler toy',
          headline: 'What to Do When {Name} Grabs for Your Phone in Public',
          deck: 'Why {name} lunges for your phone the second you pull it out in line—and the calm “adult tool” boundary that ends public phone-grabbing battles.',
          sceneTime: '11:40 AM · GROCERY CHECKOUT LINE',
          sceneBody:
            'You pull out your phone for five seconds to scan your grocery loyalty card. Instantly {name} lunges from the cart seat with both chubby hands: *“PHONE! MINE! PHONE!”* When you slip it back into your pocket, a loud checkout-lane protest erupts. *Why does {pronoun} want THIS rectangle more than every toy in the house?*',
          pollQuestion: 'Does your phone act like a giant magnet for {possessive} hands?',
          pollOptions: [
            {
              id: 'magnet',
              label: 'Yes—{pronoun} spots it from across the room!',
              response:
                'Of course {pronoun} does! Toddlers are wired to mimic whatever WE treasure—and we touch our glowing glass rectangle 80 times a day. Making it a boring “grown-up tool” changes everything.',
            },
            {
              id: 'public',
              label: 'Mostly when waiting at clinics or grocery lines',
              response:
                'Keeping one tiny “checkout-line treasure” (or turning the phone into a quick boring grocery helper) ends public lunges calmly.',
            },
          ],
          beat2Kicker: 'Inside {possessive} imitation brain',
          beat2Title: 'Glowing toy vs. boring grown-up tool',
          beat2Lead:
            'When a toddler sees cartoons or games on a parent’s phone, the phone transforms permanently into a magical toy dispenser. Toggle below to compare how {name} sees your phone.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Toy-dispenser phone vs. boring adult tool',
          visualStageHint: 'Toggle both states to see why grabbing stops',
          visualConfig: {
            calmToggleLabel: 'Boring grown-up tool',
            stormToggleLabel: 'Sometimes-toy dispenser',
            calmStatus: 'LOW FASCINATION · CALM ACCEPTANCE',
            stormStatus: 'HIGH-STAKES MAGNET · CONSTANT GRABBING',
            calmReadouts: [
              {
                name: 'Phone Association',
                value: 'Boring adult tool',
                tone: 'spruce',
                desc: 'Just like car keys or a wallet—never plays games or cartoons, so {name} loses interest quickly.',
              },
              {
                name: 'Waiting-Line Backup',
                value: 'Real hands-on job',
                tone: 'spruce',
                desc: 'Holding a box of crackers, spotting red apples, or playing peek-a-boo keeps {name} engaged calmly.',
              },
            ],
            stormReadouts: [
              {
                name: 'Slot-Machine Effect',
                value: 'Sometimes yields video!',
                tone: 'amber',
                desc: 'If grabbing and crying occasionally unlocks YouTube, {possessive} brain pulls ten times harder every single time you check a text.',
              },
              {
                name: 'Checkout Friction',
                value: 'Instant lunge & tears',
                tone: 'amber',
                desc: 'Every quick errand check becomes a noisy tug-of-war.',
              },
            ],
          },
          almanacTruth:
            'Keeping your phone strictly a boring “grown-up tool” (never a video toy) extinguishes phone-snatching far faster than hiding it—and gives {name} practice handling short real-world waits.',
          scienceDeepDive:
            'Intermittent reinforcement schedules produce the highest behavioral persistence in young children: when smartphone grabbing occasionally unlocks high-salience video rewards, grabbing frequency escalates sharply. Consistent classification of the phone as a non-toy adult tool paired with engaging waiting jobs rapidly extinguishes snatching.',
          beat3Kicker: 'Calm checkout-lane mastery',
          beat3Title: 'Holding the line warmly while people stand behind you',
          rehearsalTriggerSpeaker: '{Name} reaching wildly from the shopping cart',
          rehearsalTriggerQuote: '“PHONE!! WANT PHONE!! *WAAAH!*”',
          rehearsalPrompt: 'Which rushed grocery-line impulse makes the next ten errands harder?',
          instincts: [
            {
              id: 'handit',
              label:
                'Hand {obj} your unlocked phone playing a video so the people behind you stop looking.',
              whyTitle: 'Why that’s so understandable—and what it teaches',
              whyText:
                'Public staring feels intense! Yet trading your phone for silence in line trains {name} to escalate right at checkout every single grocery trip.',
            },
            {
              id: 'yank',
              label:
                'Snap “NO! DON’T TOUCH MY PHONE!” and shove it hastily away looking tense.',
              whyTitle: 'Why calm warmth works better',
              whyText:
                'Tense secrecy makes the phone look even MORE mysterious and precious—matter-of-fact boredom takes the sparkle right off.',
            },
          ],
          calmScriptPlain:
            '“Phones are grown-up tools for lists and paying—mine goes right back in my pocket. Here’s YOUR job: hold this heavy box of pasta and find something yellow!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'tool',
              text: 'Phones are grown-up tools for lists and paying—mine goes right back in my pocket.',
              tag: 'Boring Tool Rule',
              note: 'Clear, unemotional classification—puts the phone in the exact same category as your wallet.',
            },
            { text: ' ' },
            {
              id: 'job',
              text: 'Here’s YOUR job: hold this heavy box of pasta and find something yellow!',
              tag: 'Proud Real Job',
              note: 'Gives {poss} busy hands heavy-work ownership and turns waiting into a playful game.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Keep phones off-limits as video players',
            'Give {name} a real cart-helper item to hold',
            'Stay calm if strangers glance—toddlers are allowed to have feelings!',
          ],
          pushbacks: [
            {
              id: 'photos',
              label: '“What about looking at family photos of {name} or Grandma on my phone?”',
              setup:
                'A 60-second slow look at 3 real family photos together (while YOU hold the phone) is calm and sweet—just set a clear ending:',
              script:
                '“Let’s look at three photos of Grandma’s dog while Mommy holds it: one, two, three—all done, phone goes back to sleep in my pocket!”',
            },
            {
              id: 'doctorwait',
              label: '“What if we’re stuck in a clinic waiting room for 40 minutes?”',
              setup:
                'Keep one tiny “Wait-Kit” zippered pouch in the diaper bag (mini board book, reusable sticker pad, 2 figurines, snack cup):',
              script:
                '“Pull out the special ‘Waiting-Room Pouch’ that ONLY appears outside the house—brand-new novelty beats a phone every time!”',
            },
          ],
          advisorPrompt:
            '“Help me pack a tiny lightweight ‘Waiting-Room Pouch’ for {name} ({age}) so we survive doctor offices, restaurants, and grocery lines without handing over my phone.”',
          beat4Kicker: 'Your next errand upgrade',
          beat4Title: 'Pick one phone-boundary move for your next outing',
          beat4Lead:
            'One tiny helper job in the grocery cart changes the whole trip.',
          moves: [
            {
              id: 'cartjob',
              title: 'Give {name} a proud “Cart Helper” item right at checkout',
              desc: 'Hand {obj} a sturdy box of crackers, a bunch of bananas, or a reusable bag to hold with both hands.',
            },
            {
              id: 'waitpouch',
              title: 'Pack a pocket-sized “Outing-Only” pouch in the diaper bag',
              desc: 'Tuck in one mini board book, chunky washable crayons, or two animal figures that stay exclusively in the bag.',
            },
            {
              id: 'toolphrase',
              title: 'Use the exact phrase “Phones are grown-up tools” consistently',
              desc: 'Keep your phone boring (never videos/games) so grabbing fades naturally within a week.',
            },
          ],
          closingNote:
            'Letting a 1-year-old learn how to look around a grocery store, wave at the cashier, and wait three whole minutes without a glowing screen is a superpower in our modern world—and you’re building it right now.',
          pocketInsight:
            'Keep your phone strictly a boring “grown-up tool” (never a video toy), give {name} a real Cart-Helper item to hold, and pack a tiny Outing-Only pouch for long waits.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Boring Tool Visual', 'Grocery-Line Script'],
        },
      },
    ],
  }),
];
