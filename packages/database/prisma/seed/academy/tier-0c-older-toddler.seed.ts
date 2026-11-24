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

export const TIER_0C_OLDER_TODDLER_MODULES: AcademyModuleSeedData[] = [
  // ===========================================================================
  // COURSE 11: Navigating "NO!", Transitions & Warm Limits (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'behavior-older-toddler-defiance-boundaries',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    title: 'Navigating “NO!”, Transitions & Warm Limits',
    reliefSubtitle:
      'Melt instant power struggles with two choices, decode the age-2 “NO!” surge, leave the playground peacefully, and repair warmly after tough moments',
    tonightQuickWinTitle: 'Episode 1: The Two-Choice Shift That Melts Instant Power Struggles',
    summary:
      'Channel your older toddler’s booming desire for independence into cooperative two-choice offers, decode why the wrong color cup triggers 5:45 PM storms, install playful transition ladders, and master warm boundaries plus repair.',
    coverImageUrl: 'https://assets.alongside.care/academy/behavior-older-toddler.png',
    sortOrder: 3,
    episodes: [
      {
        slug: 'older-toddler-two-choice-autonomy',
        title: 'The Two-Choice Shift That Melts Instant Power Struggles',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.cup,
          illustrationCaption: 'Two real choices · Both win for you',
          headline: 'The Two-Choice Shift That Melts Instant Power Struggles',
          deck: 'How turning a top-down command (“Put your shoes on now!”) into two happy options you can live with drops resistance in seconds.',
          sceneTime: '8:15 AM · BY THE FRONT DOOR',
          sceneBody:
            'You are already five minutes late. You tell {name}: “Put your jacket on right now.” {Name} plants both feet, folds {poss} arms, and delivers an ironclad *“NO! NOT WEARING IT!”* *Suddenly getting out the door turns into a 15-minute standoff.*',
          pollQuestion: 'Do simple daily requests (shoes, coats, car seat) spark instant “NO!” battles?',
          pollOptions: [
            {
              id: 'every',
              label: 'Yes, almost every single transition!',
              response:
                'At ages 2–3, saying “NO!” is literally {possessive} brain discovering “Wait, I am my own separate person!” Offering two choices feeds that need while keeping your boundary 100% intact.',
            },
            {
              id: 'sometimes',
              label: 'Mostly when we’re rushing out the door',
              response:
                'Rushing makes commands sharper, which flips toddler autonomy alarms instantly. One playful two-choice swap melts tension fast.',
            },
          ],
          beat2Kicker: 'Smart autonomy design',
          beat2Title: 'Commands vs. two parent-approved choices',
          beat2Lead:
            'Notice the secret: you still hold the non-negotiable boundary (shoes ARE going on), while {name} gets to steer HOW it happens. Toggle below to compare.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Direct orders vs. Two-Choice Autonomy',
          visualStageHint: 'Toggle to see how instant pushback dissolves',
          visualConfig: {
            willpowerLabel: 'Top-down commands',
            willpowerTitle: '“Put your shoes on right this second!”',
            willpowerDesc:
              'Leaves {name} zero room to feel capable, so {poss} only available way to feel powerful is digging in and shouting “NO!”',
            willpowerOutcome: '15-minute wrestling match and frazzled mornings.',
            guardrailLabel: 'Two-Choice Offer',
            guardrailTitle: '“Red boots or sneakers? / You climb in or fly like an airplane?”',
            guardrailDesc:
              'Both choices accomplish YOUR exact goal, while giving {name} the thrilling feeling of steering {poss} own body.',
            guardrailOutcome: 'Instant pride, faster cooperation, zero bribing.',
            environmentShifts: [
              'Keep it strictly TWO options, five choices overwhelms a 2-year-old brain!',
              'Only offer choices you genuinely accept (never ask “Do you want to leave?” if leaving is mandatory).',
              'If {name} refuses both, calmly step in with warmth: “Looks like it’s hard to pick. I’ll help with the red boots today!”',
            ],
          },
          almanacTruth:
            'Every toddler needs dozens of tiny legal ways to feel powerful each day, offer two choices YOU approve so you hold the boundary while {name} feels like the captain.',
          scienceDeepDive:
            'Developmental autonomy research shows that constrained choice-making engages emerging dorsolateral prefrontal agency in 24-to-36-month-olds, reducing oppositional reactance while maintaining clear authoritative structure.',
          beat3Kicker: 'Practice the instant pivot',
          beat3Title: 'Turning a “NO!” coat standoff around in five seconds',
          rehearsalTriggerSpeaker: '{Name} backing away from the front door',
          rehearsalTriggerQuote: '“NO COAT! I DON’T WANT COAT!!”',
          rehearsalPrompt: 'Which split-second reflex keeps the standoff locked?',
          instincts: [
            {
              id: 'fakequestion',
              label:
                'Ask “Okay? Are you ready to put your coat on now, okay?”',
              whyTitle: 'Why yes/no questions trap you',
              whyText:
                'Never end a mandatory rule with “okay?”, a bright 2-year-old will truthfully answer “NO!” and feel tricked when you insist anyway.',
            },
            {
              id: 'threaten',
              label:
                '“If you don’t put your coat on right now I’m leaving without you!”',
              whyTitle: 'Why abandonment threats spike panic',
              whyText:
                'Empty threats trigger attachment fear rather than cooperation, calm, playful two-choice leadership works way faster.',
            },
          ],
          calmScriptPlain:
            '“It’s chilly outside so coats come with us. Do you want to put your coat on like a superhero flip, or hold it in your arms until we reach the car?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'fact',
              text: 'It’s chilly outside so coats come with us.',
              tag: 'Steady Boundary',
              note: 'States the non-negotiable fact neutrally, no “okay?” at the end.',
            },
            { text: ' ' },
            {
              id: 'two',
              text: 'Do you want to put your coat on like a superhero flip, or hold it in your arms until we reach the car?',
              tag: 'Two Real Wins',
              note: 'Both choices get the coat out the door cleanly while letting {name} stay captain of {poss} body.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Never offer a choice you won’t honor',
            'Drop “okay?” from mandatory boundaries',
            'Step in warmly if {pronoun} can’t decide',
          ],
          pushbacks: [
            {
              id: 'neither',
              label: '“{Pronoun} yells ‘NEITHER!’ to both choices”',
              setup:
                'Stay completely calm, don’t invent a third and fourth choice; decide warmly for {obj}:',
              script:
                '“Looks like picking feels tricky right now. I’ll pick for you this time: sneakers on first, and next time you can choose!”',
            },
            {
              id: 'carseat',
              label: '“{Pronoun} planks stiff as a board at the car seat”',
              setup:
                'Channel playfulness + two choices: “Climb in like a frog or tickle-monster lift?”',
              script:
                '“Car seat buckles keep your body safe every single ride. Want to climb up yourself like a frog, or zoom in like a rocket ship?”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) says NO to getting dressed and buckled into the car seat every morning, give me 5 playful two-choice phrasing ideas we can try tomorrow.”',
          beat4Kicker: 'Tomorrow morning’s game changer',
          beat4Title: 'Pick one daily standoff to convert into two choices',
          beat4Lead:
            'Try it just once tomorrow morning and watch {possessive} face shift from defiance to pride.',
          moves: [
            {
              id: 'morningchoice',
              title: 'Convert shoes or getting dressed into a crisp 2-choice offer',
              desc: '“Blue shirt or green shirt?” / “Left foot first or right foot first?”, both win for you.',
            },
            {
              id: 'dropokay',
              title: 'Catch yourself before adding “okay?” to a non-negotiable rule',
              desc: 'Replace “Time to go, okay?” with “Time to go! Hop like a bunny or hold my hand?”',
            },
            {
              id: 'neitherplan',
              title: 'Use the calm fallback if {name} refuses both choices',
              desc: '“I’ll help decide this time so we stay on track, you can pick the song in the car!”',
            },
          ],
          closingNote:
            'Giving a two-year-old small, safe ways to steer isn’t “giving in”, it is smart, generous leadership that protects your authority on the big rules while letting {name} practice growing up.',
          pocketInsight:
            'Hold the big boundary steadily, skip “okay?”, and hand {name} two choices you genuinely approve (“Red boots or sneakers? / Hop or hold hands?”).',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“How can handing over a blue cup instead of a yellow one ignite a 20-minute 5:45 PM storm?”',
            title: 'Why Everything Is “NO!” at Age Two (And Why It’s Healthy)',
            targetSlug: 'older-toddler-erikson-autonomy-vs-shame',
          },
          interactiveHighlights: ['Two-Choice Guardrail', 'Neither-Option Fallback'],
        },
      },
      {
        slug: 'older-toddler-erikson-autonomy-vs-shame',
        title: 'Why Everything Is “NO!” at Age Two (And Why It’s Healthy)',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.cup,
          illustrationCaption: '5:45 PM · The final drop in a full day',
          headline: 'Why the Wrong Color Cup Triggers a 5:45 PM Storm',
          deck: 'When logic disappears mid-meltdown over “NO!” and tiny details, it isn’t defiance, it’s a supercharged gas pedal running on bicycle brakes.',
          sceneTime: '5:45 PM · KITCHEN FLOOR',
          sceneBody:
            'You pour water into the blue cup because the yellow one is in the dishwasher. One second later, {name} arches backward, tears flood {poss} cheeks, and the room erupts. *“It’s literally just a cup!”*',
          pollQuestion: 'Have you ever felt stunned by how tiny the trigger was?',
          pollOptions: [
            {
              id: 'constantly',
              label: 'Yes, it feels like walking on eggshells',
              response:
                'It’s never really about the cup. By 5:45 PM, {possessive} emotional backpack is already 99% full from holding it together all day, the blue cup is just the final drop.',
            },
            {
              id: 'evening',
              label: 'Mostly right before dinner',
              response:
                'That late-afternoon window is peak blood-sugar dip plus sensory overload. Seeing the brain mechanics makes that hour so much less personal.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mind',
          beat2Title: 'Supercharged gas pedal, bicycle brakes',
          beat2Lead:
            'Toggle between a calm morning and a 5:45 PM meltdown to see why explaining “the yellow cup is dirty” cannot physically land until the lid closes again.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Calm morning vs. 5:45 PM lid-flipped storm',
          visualStageHint: 'Toggle both states to see what is online',
          visualConfig: {
            calmToggleLabel: 'Calm morning',
            stormToggleLabel: '5:45 PM wrong-cup storm',
            calmStatus: 'UPSTAIRS & DOWNSTAIRS LINKED',
            stormStatus: 'LID FLIPPED · CONNECT FIRST',
            calmReadouts: [
              {
                name: 'Upstairs Braking Cortex',
                value: 'Online',
                tone: 'spruce',
                desc: 'Can hear gentle logic, handle small surprises, and practice saying “I want yellow.”',
              },
              {
                name: 'Downstairs Emotional Core',
                value: 'Steady',
                tone: 'spruce',
                desc: 'Feels safe, fed, and connected, healthy autonomy feels playful.',
              },
            ],
            stormReadouts: [
              {
                name: 'Upstairs Braking Cortex',
                value: 'Offline',
                tone: 'amber',
                desc: 'Explaining “the yellow cup is dirty in the dishwasher” physically bounces off until the alarm drops.',
              },
              {
                name: 'Downstairs Emotional Core',
                value: 'Full Alarm',
                tone: 'amber',
                desc: 'Full emotional backpack + age-2 autonomy drive makes the wrong cup feel genuinely crushing.',
              },
            ],
          },
          almanacTruth:
            'A toddler cannot “calm down” on command because their braking hardware is still under construction. In a storm, they borrow your steady nervous system first, and hear logic later.',
          scienceDeepDive:
            'Developmental theorist Erik Erikson identified ages 2–3 as the pivotal “Autonomy vs. Shame” stage, where asserting “NO!” builds healthy selfhood. Neurobiologically, during acute sympathetic arousal, norepinephrine floods the amygdala while the immature ventromedial prefrontal cortex goes offline; calm proximity and fewer than 10 low-pitched words recruit the ventral vagal brake.',
          beat3Kicker: 'Practice the shift',
          beat3Title: 'What to say when logic won’t land',
          rehearsalTriggerSpeaker: '{Name} sobbing on the kitchen floor',
          rehearsalTriggerQuote: '“NO! NOT BLUE! I WANTED THE YELLOW CUP!!”',
          rehearsalPrompt: 'Which instinct hits first when you’re tired and cooking dinner?',
          instincts: [
            {
              id: 'logic',
              label:
                '“The yellow cup is dirty in the dishwasher! It’s the exact same water, stop crying!”',
              whyTitle: 'Why that’s so tempting, and what {poss} brain hears',
              whyText:
                'You’re using crystal-clear adult logic. The catch is that {possessive} language-processing center is temporarily offline, so fast reasoning just sounds like loud noise on top of an alarm.',
            },
            {
              id: 'fix',
              label:
                '“Okay, okay, stop screaming. I’ll wash the yellow cup right this second!”',
              whyTitle: 'Why that’s so tempting, and what {poss} brain hears',
              whyText:
                'Totally understandable when you just want quiet. Occasionally washing it is fine, but rushing to fix every distress teaches {obj} that big feelings are emergencies too scary to ride out.',
            },
          ],
          calmScriptPlain:
            '“You really wanted the yellow cup. That feels so frustrating. I’m right here with you.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'name',
              text: 'You really wanted the yellow cup.',
              tag: 'Mirrors Reality',
              note: 'Shows {obj} {pronoun} was heard without debating the dishwasher, immediately taking wind out of the escalation.',
            },
            { text: ' That feels so frustrating. ' },
            {
              id: 'anchor',
              text: 'I’m right here with you.',
              tag: 'Borrowed Brakes',
              note: 'Short, warm, low-voice presence signals physical safety so the upstairs braking bridge can come back online.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Drop below eye level',
            'Under 15 slow words',
            'Pause & breathe out',
          ],
          pushbacks: [
            {
              id: 'hits',
              label: '“{Pronoun} swings a hand at the cup”',
              setup: 'Hold the physical boundary calmly and protect bodies first:',
              script:
                '“I won’t let you throw the cup. You can be mad, and I’m setting it on the counter while we breathe.”',
            },
            {
              id: 'stillcrying',
              label: '“{Pronoun} keeps crying for 5 minutes”',
              setup:
                'Your job isn’t to turn off tears like a light switch, it’s to be the sturdy dock while the wave passes:',
              script:
                '“(Soft hum, steady hand nearby): I’m right here. Take your time, the wave will pass.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) has a big meltdown almost every evening around 5:30 PM right when we get home, how can we build a 15-minute decompression routine?”',
          beat4Kicker: 'Tomorrow’s small experiment',
          beat4Title: 'Pick one steady anchor to try next time',
          beat4Lead:
            'You only need to remember one thing when the storm hits, it slots right into your Pocket Card below.',
          moves: [
            {
              id: 'kneel',
              title: 'Drop your shoulders and kneel before speaking',
              desc: 'Lowering your physical posture signals safety to {possessive} nervous system before a single word comes out.',
            },
            {
              id: 'eightwords',
              title: 'Use the “under 10 words” rule',
              desc: 'Pause the explanation about the dishwasher until {poss} breathing slows back down.',
            },
            {
              id: 'snack',
              title: 'Pre-empt 5:30 PM with a quiet snack + dim light',
              desc: 'Lowering sensory load and refilling blood sugar catches half of evening storms before they start.',
            },
          ],
          closingNote:
            'When you stay calm beside a screaming toddler, you aren’t “letting them win.” You are lending them the brakes their brain is still building, one stormy evening at a time.',
          pocketInsight:
            'Big feelings offline the logic brain. Kneel, soften your voice, speak under 10 words, and explain only after the wave passes.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“Why does saying ‘Time to go!’ at the playground spark a surfboard carry, and what 3-step countdown works instead?”',
            title: 'Leaving the Playground Without Carrying a Screaming Toddler',
            targetSlug: 'older-toddler-visual-transition-ladders',
          },
          interactiveHighlights: ['Animated Brain-Bridge', 'Annotated Calm Script'],
        },
      },
      {
        slug: 'older-toddler-visual-transition-ladders',
        title: 'Leaving the Playground Without Carrying a Screaming Toddler',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Concrete endings · “Two more slides, then wave bye”',
          headline: 'Leaving the Playground Without Carrying a Screaming Toddler',
          deck: 'Why “five more minutes!” means nothing to a 2-year-old, and how concrete event countdowns plus a playful exit ritual save your back.',
          sceneTime: '4:50 PM · NEIGHBORHOOD PARK',
          sceneBody:
            'You called out “Five more minutes!” from the bench twice. When you finally walk over saying “Okay, time to go!”, {name} goes limp as a sack of flour under the slide. *Now you’re negotiating with a sobbing koala in front of six other parents.*',
          pollQuestion: 'Is leaving fun places (park, bath, playdates) your toughest daily transition?',
          pollOptions: [
            {
              id: 'park',
              label: 'Yes, I’ve done the “surfboard carry” way too often!',
              response:
                'Every toddler parent has earned the surfboard-carry badge! Replacing abstract clock minutes with concrete “last actions” transforms park exits overnight.',
            },
            {
              id: 'bath',
              label: 'Park AND bath AND leaving Grandma’s house',
              response:
                'The exact same 4-beat transition ladder works everywhere, because it translates adult time into toddler-visible steps.',
            },
          ],
          beat2Kicker: 'Why abstract time fails at age 2',
          beat2Title: 'The 4-step smooth playground exit',
          beat2Lead:
            'To a 2-year-old, “5 minutes” and “500 minutes” sound identical, so leaving always feels like a sudden ambush. Tap the 4 concrete steps below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The tear-free transition ladder',
          visualStageHint: 'Tap each beat from concrete count to joyful car walk',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Step 1 · Count',
                label: 'Concrete Event',
                title: 'Replace “5 minutes” with “2 more slides”',
                desc: 'Walk up close, make warm eye contact, and name a visible finish line: “Two more turns down the green slide, or ten big pushes on the swing, which do you pick?”',
                why: 'Concrete actions can be seen and counted, giving {name} real warning.',
              },
              {
                timeOrCue: 'Step 2 · Echo',
                label: 'Count Together',
                title: 'Cheer each turn out loud (“That’s ONE… last one, TWO!”)',
                desc: 'Join the final turn joyfully right beside {obj} instead of calling from across the mulch.',
                why: 'Connection right before a boundary lowers transition shock dramatically.',
              },
              {
                timeOrCue: 'Step 3 · Closure',
                label: 'Say Bye-Bye',
                title: 'Wave goodbye to the swings & slide',
                desc: '“Bye-bye slide! See you next time!” Giving closure honors how much fun {name} had.',
                why: 'Ritual goodbyes help a 2-year-old mentally close one chapter.',
              },
              {
                timeOrCue: 'Step 4 · Bridge',
                label: 'Playful Exit',
                title: 'Race to the car like bunnies (or hold a snack)',
                desc: 'Give the walk itself a fun job: “Want to hop like frogs to the gate, or carry my car keys to unlock the beep-beep?”',
                why: 'Pulls focus forward toward the next cool thing instead of mourning the park.',
              },
            ],
          },
          almanacTruth:
            'Two-year-olds can’t feel clock minutes. Swap “five more minutes” for a concrete event (“two more slides, then wave bye-bye to the swings”) and pair the walk out with a playful job.',
          scienceDeepDive:
            'Temporal estimation relies on prefrontal working-memory circuits that do not emerge reliably until ages 5–7. Anchoring transitions to visible, countable events paired with brief positive rituals dramatically reduces transition-induced limbic distress.',
          beat3Kicker: 'Holding the exit warmly',
          beat3Title: 'When {name} begs for “ONE MORE SLIDE!” after turn #2',
          rehearsalTriggerSpeaker: '{Name} climbing back up the ladder after slide #2',
          rehearsalTriggerQuote: '“ONE MORE! JUST ONE MORE SLIDE!!”',
          rehearsalPrompt: 'Which split-second choice accidentally breaks the countdown next time?',
          instincts: [
            {
              id: 'allowone',
              label:
                'Sigh “Okay, ONE last one, for real this time!”',
              whyTitle: 'Why bending the count makes tomorrow harder',
              whyText:
                'When “two slides” secretly becomes four after pleading, {name} learns that arguing works, making the boundary fuzzy and anxious next time.',
            },
            {
              id: 'scold',
              label:
                '“If you don’t listen we’re NEVER coming back to this park!”',
              whyTitle: 'Why huge threats don’t calm the moment',
              whyText:
                'Warm, sturdy follow-through (“That was two! I’m helping your body to the gate, want to walk or ride on my hip?”) keeps trust rock-solid.',
            },
          ],
          calmScriptPlain:
            '“That was slide number two, it’s SO hard leaving the park when we’re having fun! Let’s wave bye-bye to the slide. Want to stomp like dinosaurs to the car or ride on my hip?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'hold',
              text: 'That was slide number two, it’s SO hard leaving the park when we’re having fun!',
              tag: 'Honest + Warm',
              note: 'Keeps your word steady while proving you understand why leaving stings.',
            },
            { text: ' ' },
            {
              id: 'bye',
              text: 'Let’s wave bye-bye to the slide.',
              tag: 'Closure Ritual',
              note: 'A tiny goodbye cue gives {poss} brain a clean emotional bookmark.',
            },
            { text: ' ' },
            {
              id: 'exit',
              text: 'Want to stomp like dinosaurs to the car or ride on my hip?',
              tag: 'Playful Exit',
              note: 'If {pronoun} still protests, calmly scoop {obj} onto your hip with zero anger, warm leadership wins.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Walk over close for eye-level countdowns',
            'Use countable turns, never abstract minutes',
            'Follow through warmly on the exact last turn',
          ],
          pushbacks: [
            {
              id: 'limp',
              label: '“{Pronoun} still goes limp crying and refuses to walk”',
              setup:
                'Calmly lift {obj} gently onto your hip with warm neutrality, zero shame, zero scolding:',
              script:
                '“Leaving feels really hard today. I’ll carry your body safely to the car while you let those mad feelings out.”',
            },
            {
              id: 'timer',
              label: '“What about a visual sand timer or phone chime at home?”',
              setup:
                'A physical 2-minute sand timer or fun animal chime works wonderfully at home, because the timer plays the “bad guy,” not you!',
              script:
                '“When the purple sand finishes falling, or when the duck quacks, we wave bye to blocks and wash hands for dinner!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) melts down every time we leave the park or get out of the bathtub, give me 4 concrete transition games tailored to {poss} personality.”',
          beat4Kicker: 'Your next smooth exit',
          beat4Title: 'Pick one transition tool to test tomorrow',
          beat4Lead:
            'Save your back and keep park trips ending on a warm note.',
          moves: [
            {
              id: 'twoslides',
              title: 'Trade “5 more minutes” for “2 more slides or 10 pushes”',
              desc: 'Walk up close, look in {poss} eyes, let {obj} pick the final countable action, and count out loud together.',
            },
            {
              id: 'wavebye',
              title: 'Start the “Wave Bye-Bye” ritual at the park and bath',
              desc: '“Bye-bye water! Bye-bye swings!”, watch how quickly a 2-year-old adopts this soothing closure cue.',
            },
            {
              id: 'walkgame',
              title: 'Keep one fun walk-to-the-car game in your pocket',
              desc: 'Stomp like dinosaurs, hunt for a blue car, or let {name} press the key-fob unlock button.',
            },
          ],
          closingNote:
            'Leaving something joyful is legitimately hard at age two! Give {name} a visible finish line, wave goodbye together, and carry {obj} warmly if tears still come, you’re teaching graceful endings for life.',
          pocketInsight:
            'Swap “5 minutes” for a concrete count (“2 more slides”), wave bye-bye to the park, and bridge the exit with a playful walk game or warm hip-carry.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery:
              '“You snapped and yelled after a long day, did you just ruin everything, or can a 20-second repair actually make your bond STRONGER?”',
            title: 'Holding Firm Limits Without Shame (And Repairing When You Lose Cool)',
            targetSlug: 'older-toddler-repair-after-rupture',
          },
          interactiveHighlights: ['4-Step Exit Ladder', 'Wave-Bye Closure'],
        },
      },
      {
        slug: 'older-toddler-repair-after-rupture',
        title: 'Holding Firm Limits Without Shame (And Repairing When You Lose Cool)',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Rupture → Warm Repair · Stronger every time',
          headline: 'Holding Firm Limits Without Shame (And Repairing When You Lose Cool)',
          deck: 'Why perfection isn’t what wires secure attachment, returning calmly after you snap teaches {name} how love, accountability, and emotional safety actually work.',
          sceneTime: '7:45 PM · AFTER LOSING YOUR TEMPER',
          sceneBody:
            'Dinner spilled, shoes flew, you were running on zero sleep, and a louder, sharper yell came out of your mouth than you ever meant. {Name} froze with wide, startled eyes. *Now a heavy wave of guilt sits in your chest: “Did I just damage our bond?”*',
          pollQuestion: 'Does parent guilt hit hard after a moment when you lose your cool?',
          pollOptions: [
            {
              id: 'heavy',
              label: 'Yes, I replay it in my head all night',
              response:
                'Hear this deep breath of science: attachment researchers found that securely attached parents are attuned only ~30–50% of the time, what builds lifelong resilience is REPAIR after the misses!',
            },
            {
              id: 'how',
              label: 'I want to know how to repair without losing authority',
              response:
                'Beautiful question, a true repair owns YOUR loud voice cleanly while still holding the loving house boundary steady.',
            },
          ],
          beat2Kicker: 'The science of rupture & repair',
          beat2Title: 'The 3-step repair that rewrites a tense memory',
          beat2Lead:
            'When a parent yells and pretends nothing happened, a toddler’s egocentric brain quietly concludes “I must be bad.” Returning for a 20-second repair rewrites the story cleanly. Tap below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 20-second Attachment Repair loop',
          visualStageHint: 'Tap each beat to see how repair strengthens trust',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Reset your breath',
                label: 'Cool Down First',
                quote: 'Take 2 slow minutes to lower your own pulse first',
                desc: 'Repair works best once your chest loosens, even 10 minutes later or at bedtime cuddle counts 100%!',
                brainNote: 'Prevents a rushed, tense “sorry” that accidentally blames the child.',
              },
              {
                stepNum: '02',
                actor: 'Name & own YOUR part',
                label: 'Zero-Blame Ownership',
                quote: '“I yelled when the milk spilled. My job is to stay calm, that wasn’t your fault.”',
                desc: 'Never add “…because you didn’t listen!” Owning your reaction cleanly models real courage and accountability.',
                brainNote: 'Rewires the hippocampal memory from fear (“I’m bad”) into safety.',
              },
              {
                stepNum: '03',
                actor: 'Re-anchor & look ahead',
                label: 'Keep Limit + Plan',
                quote: '“Cups still stay on the table, next time I feel frustrated, I’ll take a big breath. Love you!”',
                desc: 'Repairing NEVER drops the boundary, it proves love and steady rules always travel together.',
                brainNote: 'Teaches {name} how to apologize and try again after {poss} own mistakes!',
              },
            ],
          },
          almanacTruth:
            'You never have to be a spotless parent to raise a deeply secure child. One honest 20-second repair after losing your temper teaches more emotional intelligence than never making a mistake.',
          scienceDeepDive:
            'Attachment micro-interaction studies (Tronick & Beeghly; Siegel) show that caregiver-child dyads experience frequent mismatches (“ruptures”). Consistent repair, naming the event without shaming the child and re-establishing safety, predicts secure attachment, emotional self-regulation, and adult relational resilience far more strongly than flawless attunement.',
          beat3Kicker: 'Practice the exact words',
          beat3Title: 'Repairing cleanly without blaming {name} or collapsing the rule',
          rehearsalTriggerSpeaker: 'Ten quiet minutes after yelling over spilled juice',
          rehearsalTriggerQuote: '({Name} looking quiet and wary beside {poss} blocks)',
          rehearsalPrompt: 'Which tempting “almost-apology” accidentally misses the mark?',
          instincts: [
            {
              id: 'but',
              label:
                '“I’m sorry I yelled, BUT if you had just listened to me the first time I wouldn’t have had to!”',
              whyTitle: 'Why the word “BUT” erases a repair',
              whyText:
                'Adding “but you made me yell” hands a 2-year-old responsibility for an adult’s nervous system. Clean ownership models true grown-up strength.',
            },
            {
              id: 'ignore',
              label:
                'Sweep it under the rug and offer extra cookies hoping {pronoun} forgets.',
              whyTitle: 'Why naming it out loud brings real relief',
              whyText:
                'Even when toddlers go back to playing, their nervous system still holds the startled tension. Twenty warm seconds of naming what happened dissolves it completely.',
            },
          ],
          calmScriptPlain:
            '“Hey sweetie, earlier I got really overwhelmed and used a scary loud voice when the juice spilled. I’m sorry, it’s my job to stay calm even when messes happen. You’re a good kid, and I love you.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'name',
              text: 'Hey sweetie, earlier I got really overwhelmed and used a scary loud voice when the juice spilled.',
              tag: 'Names What Happened',
              note: 'Helps {name} make sense of the scary moment instead of storing silent confusion.',
            },
            { text: ' ' },
            {
              id: 'own',
              text: 'I’m sorry, it’s my job to stay calm even when messes happen.',
              tag: 'Pure Ownership',
              note: 'Zero “but you…” blame, teaches {name} what real accountability looks like from the person {pronoun} loves most.',
            },
            { text: ' ' },
            {
              id: 'safe',
              text: 'You’re a good kid, and I love you.',
              tag: 'Restores Safety',
              note: 'Re-anchors unconditional love right before returning cheerfully to play or bedtime.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Drop to eye level, warm soft tone',
            'Never add “but you made me…”',
            'It is NEVER too late, even the next morning works!',
          ],
          pushbacks: [
            {
              id: 'limit',
              label: '“Wait, what if {name} actually DID break an important safety rule?”',
              setup:
                'Hold the boundary firmly AND own your yell cleanly in the very same breath:',
              script:
                '“I’m sorry I yelled loudly, that wasn’t kind. Running into the street is still never safe, so hands always hold mine near cars. Next time I’ll scoop you safely with a firm, calm voice.”',
            },
            {
              id: 'toolate',
              label: '“What if {pronoun} already fell asleep before I calmed down?”',
              setup:
                'Repair works beautifully the next morning over breakfast, naming it gently closes the loop:',
              script:
                '“Remember last night when bedtime got bumpy and my voice got too loud? I’m sorry about that. I’m working on taking big breaths when I’m tired. Fresh calm morning today!”',
            },
          ],
          advisorPrompt:
            '“I lost my patience and yelled at {name} ({age}) today and feel awful, help me write a warm 2-sentence repair for tonight’s bedtime cuddle.”',
          beat4Kicker: 'Your grace & resilience anchor',
          beat4Title: 'Pick one repair habit to keep in your pocket',
          beat4Lead:
            'Every parent snaps sometimes, how you come back is what shapes {possessive} heart.',
          moves: [
            {
              id: 'repairphrase',
              title: 'Memorize the 2-part repair frame (“I yelled · My job to stay calm”)',
              desc: 'Keep it short, zero “buts,” and finish with a warm hug or high-five.',
            },
            {
              id: 'pauseoutloud',
              title: 'Model a live “parent pause” out loud once this week',
              desc: 'Say before snapping: “My body feels frustrated. I’m taking two giant dragon breaths right now!” Watch {name} copy you!',
            },
            {
              id: 'dropguilt',
              title: 'Release shame right after repairing',
              desc: 'Once you’ve repaired warmly, let go of replaying it at midnight, you just gave {name} a masterclass in human love.',
            },
          ],
          closingNote:
            'Be as gentle with yourself tonight as you are learning to be with {name}. Love isn’t measured by never losing your cool, it lives in the warmth with which you always come back.',
          pocketInsight:
            'Repair builds deeper attachment than perfection. Own your loud voice cleanly with zero “but you…”, hold safety rules steady, and re-anchor warm love.',
          nextEpisodeHook: null,
          interactiveHighlights: ['20-Sec Repair Loop', 'Zero-Blame Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 12: Potty Learning, Night Waking & Daily Hygiene (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'health-older-toddler-toilet-and-bedtime',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    title: 'Potty Learning, Night Waking & Daily Hygiene',
    reliefSubtitle:
      'Approach potty learning without bribes or power struggles, decode night terrors vs. nightmares, transition to a big bed calmly, and make toothbrushing playful',
    tonightQuickWinTitle: 'Episode 1: Potty Learning Without Bribes, Sticker Charts, or Power Struggles',
    summary:
      'Build child-led bodily autonomy during potty learning, tell deep-sleep night terrors from REM nightmares at 1 AM, navigate the big-kid bed transition cleanly, and turn toothbrushing into a laughing game.',
    coverImageUrl: 'https://assets.alongside.care/academy/health-older-toddler.png',
    sortOrder: 3,
    episodes: [
      {
        slug: 'older-toddler-toilet-readiness-test',
        title: 'Potty Learning Without Bribes, Sticker Charts, or Power Struggles',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Body trust · Zero bribes, zero pressure',
          headline: 'Potty Learning Without Bribes, Sticker Charts, or Power Struggles',
          deck: 'Why candy bribes and cheering ironically trigger potty withholding, and how calm body-awareness turns bathroom learning into {possessive} own proud skill.',
          sceneTime: '10:15 AM · BATHROOM DOORWAY',
          sceneBody:
            'You offer two stickers and a mini marshmallow if {name} just sits on the little potty. {Pronoun} clamps both legs tight, runs behind the sofa, and refuses to go near the bathroom for an hour. *Wait, why did a fun reward make {obj} resist MORE?*',
          pollQuestion: 'Where are you in the potty-learning journey with {name}?',
          pollOptions: [
            {
              id: 'starting',
              label: 'Watching for readiness signs, haven’t started yet',
              response:
                'Perfect timing! Waiting until {name} notices wet/full feelings AND shows calm curiosity prevents months of power struggles.',
            },
            {
              id: 'stuck',
              label: 'We started, and it’s turning into a battle of wills',
              response:
                'You can never force another human’s bladder or bowel muscles, handing ownership back to {poss} body dissolves resistance fast.',
            },
          ],
          beat2Kicker: 'Why pressure backfires in the bathroom',
          beat2Title: 'Bribes & pressure vs. calm body-signal learning',
          beat2Lead:
            'Elimination is the one territory a 2-year-old controls 100%. The instant it becomes a high-stakes adult performance, pelvic muscles literally tighten! Toggle below to compare.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Bribes & pressure vs. calm potty autonomy',
          visualStageHint: 'Toggle both approaches to see the difference',
          visualConfig: {
            willpowerLabel: 'Bribes, timers & cheering',
            willpowerTitle: '“Go pee right now and you get candy!”',
            willpowerDesc:
              'Constant asking (“Do you have to go?! Try now!”) and anxious rewards trigger pelvic tension, refusal, and stubborn withholding.',
            willpowerOutcome: 'Bathroom dread, accidents right after standing up, power wars.',
            guardrailLabel: 'Calm Body-Signal Coach',
            guardrailTitle: 'Predictable routine pauses + neutral curiosity',
            guardrailDesc:
              'Build natural bathroom stops at transitions (waking, before outings, before bath), keep a relaxed potty available, and treat every miss as calm, neutral data.',
            guardrailOutcome: 'Relaxed pelvic floor, genuine body listening, proud independence.',
            environmentShifts: [
              'Check 3 readiness cues first: stays dry 2+ hours, notices when going, can pull simple elastic pants up/down.',
              'Swap constant “Do you need to pee?” questions for calm matter-of-fact routine invites (“Before shoes, potty time!”).',
              'Treat wet pants like spilled water, zero sighs, zero disappointment: “Oops, pee came out! Let’s grab dry shorts together.”',
            ],
          },
          almanacTruth:
            'You can’t bribe or rush pelvic muscles, potty learning clicks fastest when you trade “Do you have to go?” nagging for calm transition pauses and completely neutral accident cleanup.',
          scienceDeepDive:
            'Pediatric urology and gastroenterology guidance confirms that coercive or high-pressure toilet training increases functional stool withholding and pelvic-floor dyssynergia. Interoceptive body-cue coaching paired with low-stress transition sits supports natural neural maturation of bladder-sphincter control.',
          beat3Kicker: 'Calm bathroom language',
          beat3Title: 'Staying totally neutral when pee hits the rug',
          rehearsalTriggerSpeaker: '{Name} looks down startled at a puddle on the floor',
          rehearsalTriggerQuote: '“Uh-oh… wet…” (Watching your face closely)',
          rehearsalPrompt: 'Which honest tired reaction quietly builds bathroom fear?',
          instincts: [
            {
              id: 'sigh',
              label:
                'Sigh heavily: “Oh come on! I JUST asked you five minutes ago and you said no!”',
              whyTitle: 'Why frustration slows learning',
              whyText:
                'Wet puddles are exhausting! Yet feeling shame makes a 2-year-old hide behind curtains next time instead of coming to tell you.',
            },
            {
              id: 'nag',
              label:
                'Start asking “Do you have to go potty?” every ten minutes all afternoon.',
              whyTitle: 'Why constant quizzing creates automatic “NO!”',
              whyText:
                'Frequent questions make {name} tune out {poss} own bladder and focus on defending against your prompts, quiet routine pauses work way better.',
            },
          ],
          calmScriptPlain:
            '“Oops, your shorts got wet, pee came out! Your body is still learning that wiggly signal. Let’s grab a towel together and put on dry pants.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'neutral',
              text: 'Oops, your shorts got wet, pee came out!',
              tag: 'Matter-of-Fact',
              note: 'Exact same calm tone as spilled milk, keeps shame completely out of the room.',
            },
            { text: ' ' },
            {
              id: 'body',
              text: 'Your body is still learning that wiggly signal.',
              tag: 'Teaches Interoception',
              note: 'Connects the accident to learning internal body cues, not “being bad” or failing.',
            },
            { text: ' ' },
            {
              id: 'team',
              text: 'Let’s grab a towel together and put on dry pants.',
              tag: 'Capable Helper',
              note: 'Invites {name} into calm teamwork so accidents feel totally fixable.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Drop constant “Do you need to go?” questions',
            'Prompt only at natural transitions',
            'Nighttime dryness is hormonal, comes much later!',
          ],
          pushbacks: [
            {
              id: 'poop',
              label: '“{Pronoun} pees on the potty fine, but asks for a diaper to poop”',
              setup:
                'Very common and completely normal! Never refuse a diaper if it causes painful withholding, ease slowly from diaper in bathroom → sitting on potty in diaper:',
              script:
                '“You can definitely use a pull-up in the bathroom while your body feels safe, let’s keep poop soft and comfy with zero pressure.”',
            },
            {
              id: 'nights',
              label: '“Should we drop nighttime pull-ups at the same time?”',
              setup:
                'Overnight dryness depends on a brain hormone (vasopressin) that matures anywhere between ages 3 and 7, zero rush!',
              script:
                '“Daytime potty learning and nighttime dryness are two totally separate milestones; cozy overnight diapers let everyone sleep soundly.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is showing signs of potty curiosity (or resistance), how can we build a calm, zero-bribe 1-week introduction plan?”',
          beat4Kicker: 'Your calm bathroom foundation',
          beat4Title: 'Pick one low-pressure habit this week',
          beat4Lead:
            'Less pressure in the bathroom almost always produces faster, prouder success.',
          moves: [
            {
              id: 'dropnag',
              title: 'Trade “Do you have to go?” for natural transition sits',
              desc: 'Use calm statements (“Time to sit on the potty before we go to the park, want the frog book or truck book?”).',
            },
            {
              id: 'easyclothes',
              title: 'Switch to simple elastic-waist shorts or pants',
              desc: 'Ditching snaps, overalls, and tight buttons lets {name} succeed independently without last-second frustration.',
            },
            {
              id: 'neutraloops',
              title: 'Practice the neutral spilled-water response on the next miss',
              desc: '“Oops, pee came out! Grab a towel with me, you’re learning your body’s signals.”',
            },
          ],
          closingNote:
            'No child goes to kindergarten needing sticker charts to use the bathroom. Trust {possessive} growing body awareness, keep accidents as neutral as spilled water, and enjoy watching {poss} quiet pride bloom.',
          pocketInsight:
            'Skip bribes and constant nagging. Prompt calmly only at natural transitions, dress in easy elastic pants, treat accidents like spilled water, and let nighttime dryness wait.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Why does trying to hug or wake a screaming toddler during a 1 AM night terror actually make it LAST LONGER?”',
            title: 'Nightmares vs. Night Terrors: Knowing Which One You’re Seeing at 1 AM',
            targetSlug: 'older-toddler-night-terrors-vs-nightmares',
          },
          interactiveHighlights: ['Zero-Bribe Guardrail', 'Neutral Accident Script'],
        },
      },
      {
        slug: 'older-toddler-night-terrors-vs-nightmares',
        title: 'Nightmares vs. Night Terrors: Knowing Which One You’re Seeing at 1 AM',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: '10:30 PM Deep Sleep vs. 4:00 AM Dreaming',
          headline: 'Nightmares vs. Night Terrors: Knowing Which One You’re Seeing at 1 AM',
          deck: 'Why one needs warm cuddles and talking, while the other needs quiet hands-off safety until deep sleep glides right back over.',
          sceneTime: '10:45 PM · SUDDEN CRYING ON THE MONITOR',
          sceneBody:
            'Just two hours after bedtime, {name} sits bolt upright with eyes wide open, thrashing and crying inconsolably, yet seems to stare right *through* you and pushes your hug away. *Your pulse races: what terrifying dream is happening?!* Actually, {pronoun} isn’t dreaming at all.',
          pollQuestion: 'Have scary late-night crying episodes ever left you unsure what to do?',
          pollOptions: [
            {
              id: 'seenit',
              label: 'Yes, {pronoun} stared right through me and pushed me away!',
              response:
                'That eerie “awake-but-unreachable” look in the first three hours of the night is a classic deep-sleep Night Terror, scary to watch, harmless to {name}, and completely forgotten by morning!',
            },
            {
              id: 'dreams',
              label: 'Mostly bad dreams closer to early morning',
              response:
                'Early-morning bad dreams happen in REM sleep, when {name} wakes fully, remembers the dream, and melts straight into your comforting arms.',
            },
          ],
          beat2Kicker: 'Inside {possessive} sleeping brain',
          beat2Title: 'Spot the exact clock time & sleep stage',
          beat2Lead:
            'Night terrors and nightmares happen in completely opposite halves of the night, and need completely opposite responses! Tap the four points along the night curve below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'Night Terrors (First Half) vs. Nightmares (Second Half)',
          visualStageHint: 'Tap each hour of the night to compare what’s happening',
          visualConfig: {
            stages: [
              {
                time: '8:00 PM',
                label: 'Deep Dive',
                level: 92,
                title: 'Heavy slow-wave delta sleep',
                desc: 'The first 3 hours of the night carry the deepest physical sleep of all, especially if {name} skipped a nap or went to bed overtired.',
                tip: 'Consistent, non-overtired bedtimes are the #1 preventer of night terrors!',
              },
              {
                time: '10:30 PM',
                label: 'Night Terror Window',
                level: 82,
                title: 'Partial arousal out of deep sleep (NOT awake!)',
                desc: 'Eyes open, thrashing, crying, doesn’t recognize you, pushes hugs away, then flops smoothly back asleep in 5–15 min with ZERO memory tomorrow.',
                tip: 'Do NOT wake or shake {obj}, sit quietly nearby keeping {obj} safe from bumping rails.',
              },
              {
                time: '3:30 AM',
                label: 'REM Dreaming',
                level: 45,
                title: 'Vivid imagination & early nightmares',
                desc: 'In the second half of the night, REM dreaming dominates. Toddlers wake up fully scared, recognize you instantly, and reach for comfort.',
                tip: 'Offer warm hugs, calm voice, and gentle reassurance right away.',
              },
              {
                time: '7:00 AM',
                label: 'Morning After',
                level: 15,
                title: 'Zero memory of terrors vs. chatting about dreams',
                desc: 'Never bring up a night terror at breakfast (it only confuses {obj}); for a remembered nightmare, casually normalize “silly brain stories.”',
                tip: 'If terrors repeat at the same minute nightly, try shifting bedtime 20 min earlier.',
              },
            ],
          },
          almanacTruth:
            'Night terrors happen in the first 3 hours of deep sleep, don’t try to wake {name}, just keep {obj} physically safe and quiet. Nightmares happen toward dawn, welcome {obj} straight into warm comfort.',
          scienceDeepDive:
            'Confusional arousals and sleep terrors are benign NREM Stage-3 delta-sleep parasomnias peaking between ages 2 and 6, often precipitated by sleep deprivation or schedule shifts. Attempting to forcefully awaken a child during delta arousal prolongs disorientation, whereas REM-stage nightmares involve full awakening and respond rapidly to caregiver soothing.',
          beat3Kicker: 'Calm 11 PM clarity',
          beat3Title: 'Two completely different nighttime responses',
          rehearsalTriggerSpeaker: '10:45 PM · {Name} thrashing with eyes open not recognizing you',
          rehearsalTriggerQuote: '“NO! GO AWAY! *Sobbing wildly, staring right past you*”',
          rehearsalPrompt: 'Which caring parent instinct accidentally extends a night terror?',
          instincts: [
            {
              id: 'wakeup',
              label:
                'Flip on the lamp, hold {poss} shoulders, and say loudly “Wake up! Look at Mommy! You’re having a bad dream!”',
              whyTitle: 'Why trying to wake {obj} backfires',
              whyText:
                'Because {possessive} brain is stuck halfway inside deep delta sleep, shaking or turning on bright lights intensifies panic and stretches the episode twice as long.',
            },
            {
              id: 'monster',
              label:
                'During a 4 AM nightmare, spray “monster spray” in the closet to scare monsters out.',
              whyTitle: 'Why checking for monsters accidentally confirms they’re real',
              whyText:
                'Spraying closets feels clever, yet it subtly tells a literal 2-year-old brain “Wait, monsters ARE real enough to need spray!” Warm, honest safety works better.',
            },
          ],
          calmScriptPlain:
            '“(Night terror: stay dim, hands off unless bumping rails, low steady voice) You’re safe, I’m right here… settle right back down. (4 AM nightmare: warm hug) That felt like a scary dream story, you’re awake now in your cozy bed, and I’m right here.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'terror',
              text: '(Night terror: stay dim, hands off unless bumping rails, low steady voice) You’re safe, I’m right here… settle right back down.',
              tag: '10:30 PM Terror',
              note: 'Wait calmly 5–10 minutes without restraining or waking; watch {obj} suddenly sigh and drop right back into deep sleep.',
            },
            { text: ' ' },
            {
              id: 'nightmare',
              text: '(4 AM nightmare: warm hug) That felt like a scary dream story, you’re awake now in your cozy bed, and I’m right here.',
              tag: '4 AM Nightmare',
              note: 'Validates the scary feeling honestly without validating imaginary monsters.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'First 3 hrs + glazed stare = Night Terror (don’t wake)',
            'Early morning + wants hug = Nightmare (comfort warmly)',
            'Earlier bedtime prevents most night terrors',
          ],
          pushbacks: [
            {
              id: 'scaredme',
              label: '“It terrified ME watching {obj} cry like that, is {pronoun} okay?”',
              setup:
                'Night terrors are always ten times scarier for the watching parent than for the child, mention frequent episodes casually at your next well-child checkup:',
              script:
                '“{Name} sleeps right through them with zero memory, protecting an earlier bedtime and avoiding overtired days cuts them dramatically; always loop your pediatrician in if they become very frequent.”',
            },
            {
              id: 'nightlight',
              label: '“Should we add a bright nightlight for 4 AM scary dreams?”',
              setup:
                'Use a very dim warm red/amber glow (bright white/blue nightlights cast harsh scary shadows AND lower melatonin!):',
              script:
                '“A soft amber nightlight gives gentle reassurance without casting giant dark wall shadows.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) woke crying intensely around 11 PM (or 4 AM), help me tell whether it was a night terror or nightmare and adjust our evening sleep schedule.”',
          beat4Kicker: 'Tonight’s nighttime clarity',
          beat4Title: 'Pick one calm sleep safeguard this week',
          beat4Lead:
            'Just knowing the difference between 10:30 PM and 4:00 AM takes away 90% of the fear.',
          moves: [
            {
              id: 'earlierbed',
              title: 'Protect a non-overtired bedtime (15–20 min earlier on busy days)',
              desc: 'Overtiredness is the #1 trigger of deep-sleep night terrors, earlier rest shrinks them fast.',
            },
            {
              id: 'amberlight',
              title: 'Use a soft warm amber nightlight, skip bright white bulbs',
              desc: 'Keeps shadows gentle and melatonin flowing cleanly through REM cycles.',
            },
            {
              id: 'sharepartner',
              title: 'Share this Pocket Card with your partner or babysitter',
              desc: 'So neither of you panics or flips on overhead lights if a 10:30 PM terror ever pops up.',
            },
          ],
          closingNote:
            'Watching your child cry in the dark grips any parent’s heart. Knowing when to sit calmly hands-off and when to scoop them straight into your arms gives both of you peaceful nights back.',
          pocketInsight:
            'First 3 hrs + stares past you = Night Terror (dim room, stay safe, don’t wake). Late night + reaches for you = Nightmare (warm hug, honest comfort). Early bedtime prevents both.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“How do you switch to a big-kid bed without turning 8:00 PM into a 12-round hallway parade?”',
            title: 'Moving to a Big-Kid Bed Without 12 Curtain Calls',
            targetSlug: 'older-toddler-big-bed-transition',
          },
          interactiveHighlights: ['Night-Stage Curve', '10:30 PM vs. 4 AM Guide'],
        },
      },
      {
        slug: 'older-toddler-big-bed-transition',
        title: 'Moving to a Big-Kid Bed Without 12 Curtain Calls',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Silent walk-back · Calm, boring, loving',
          headline: 'Moving to a Big-Kid Bed Without 12 Curtain Calls',
          deck: 'First, don’t rush out of the crib, and once the open bed arrives, use the calm “Silent Return” and a visual bedtime clock to end hallway parades.',
          sceneTime: '8:20 PM · FOURTH HALLWAY APPEARANCE',
          sceneBody:
            'You tucked {name} happily into the shiny new toddler bed twenty minutes ago. Now soft footsteps patter down the hall for the fourth time: *“I need water! My sock feels funny! Look at my truck!”* *Suddenly your open bedroom feels like a revolving door.*',
          pollQuestion: 'Are you preparing for a big-kid bed or already living the hallway parade?',
          pollOptions: [
            {
              id: 'parade',
              label: 'Living the 8 PM hallway parade right now!',
              response:
                'Without crib rails, a 2-year-old’s impulse brain simply wanders out whenever a thought pops up! Combining a calm room boundary with the boring “Silent Walk-Back” fixes it in ~5 nights.',
            },
            {
              id: 'thinking',
              label: 'Thinking about moving out of the crib soon',
              response:
                'Best tip before you lift a wrench: if {name} isn’t climbing out of the crib yet, waiting closer to age 3 makes this transition ten times smoother!',
            },
          ],
          beat2Kicker: 'Why open beds feel huge to a 2-year-old',
          beat2Title: 'The 4-step peaceful big-bed transition',
          beat2Lead:
            'When crib walls disappear, the entire bedroom becomes the new crib. Tap each step of the calm big-bed plan below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-step Big-Bed Peace Plan',
          visualStageHint: 'Tap each step from childproofing to morning sun clock',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Step 1 · Timing',
                label: 'Wait If You Can',
                title: 'Only transition for climbing safety (or closer to age 3)',
                desc: 'Don’t rush out of a safe crib for a new baby sibling, borrowing a bassinet for the newborn saves months of toddler bedtime wandering!',
                why: 'Impulse control jumps dramatically between 24 and 36 months.',
              },
              {
                timeOrCue: 'Step 2 · Room',
                label: 'Bedroom = Crib',
                title: 'Childproof the whole room & add a door gate/knob cover',
                desc: 'Anchor dressers, cover outlets, clear cords, and place a safe baby gate at the doorway if wandering into hallways is a safety risk.',
                why: 'A 100% safe room lets you stay calm instead of fearing 2 AM wandering.',
              },
              {
                timeOrCue: 'Step 3 · Cue',
                label: 'Okay-to-Wake Light',
                title: 'Use a simple color-change sunrise clock',
                desc: 'Teach joyfully in daylight: “Red light means bodies stay cozy in bed; yellow sun means morning time!”',
                why: 'A visible glowing rule makes the clock hold the morning line, not your arguments.',
              },
              {
                timeOrCue: 'Step 4 · Return',
                label: 'Silent Walk-Back',
                title: 'Zero conversation on pop-outs, warm, boring tuck-back',
                desc: 'First pop-out: “Bedtime, love you.” Every pop-out after: zero talking, gentle hand back to pillow, tuck blanket, walk calmly out.',
                why: 'Removing bedtime debate and funny reactions ends curtain calls within 4–5 nights.',
              },
            ],
          },
          almanacTruth:
            'Every word you speak during an 8:15 PM hallway pop-out rewards getting out of bed. Make the room 100% safe, install a color sunrise clock, and practice the calm, boring Silent Walk-Back.',
          scienceDeepDive:
            'Behavioral sleep medicine protocols (Supernanny / Mindell bedtime-fading and silent-return methods) rely on eliminating inadvertent intermittent social reinforcement during curtain calls while providing concrete visual time cues (okay-to-wake lighting) tailored to pre-clock-reading toddlers.',
          beat3Kicker: 'Mastering the boring tuck-back',
          beat3Title: 'Staying warm without opening a nighttime talk show',
          rehearsalTriggerSpeaker: '{Name} appearing at the living-room door at 8:15 PM',
          rehearsalTriggerQuote: '“Mommy, I forgot to tell you about the squirrel! And I need water!”',
          rehearsalPrompt: 'Which friendly reflex guarantees ten more trips tonight?',
          instincts: [
            {
              id: 'chat',
              label:
                'Engage in a 5-minute chat about the squirrel, walk to the kitchen for water, and lecture “Now STAY in bed!”',
              whyTitle: 'Why chatting turns popping out into gold',
              whyText:
                'Getting out of bed just unlocked a cozy kitchen field trip AND five minutes of undivided parent attention, so {pronoun} will pop out twice as fast tomorrow!',
            },
            {
              id: 'angry',
              label:
                'Snap “GO BACK TO BED RIGHT NOW OR NO PARK TOMORROW!”',
              whyTitle: 'Why anger triggers tears and wakefulness',
              whyText:
                'Sharp frustration spikes adrenaline, making sleep physically harder. A calm, silent, loving walk-back feels boring AND totally safe.',
            },
          ],
          calmScriptPlain:
            '“(First time only, calm low whisper) Bedtime, sweetie. I love you, back to your cozy bed. (Every pop-out after: silent warm hand, gently guide back to mattress, pull blanket up, step right out.)”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'first',
              text: '(First time only, calm low whisper) Bedtime, sweetie. I love you, back to your cozy bed.',
              tag: 'One Warm Line',
              note: 'Warm, brief, completely non-negotiable, never answers the squirrel question.',
            },
            { text: ' ' },
            {
              id: 'silent',
              text: '(Every pop-out after: silent warm hand, gently guide back to mattress, pull blanket up, step right out.)',
              tag: 'Silent Walk-Back',
              note: 'Boring consistency works like magic: night 1 may take 8 walk-backs, night 2 takes 4, by night 5 {pronoun} stays tucked in!',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Fill water cup & squirrel chats BEFORE lights out',
            'Zero talking after walk-back #1',
            'Stay patient for 4 consistent nights',
          ],
          pushbacks: [
            {
              id: 'bedpass',
              label: '“What if {name} genuinely forgets a hug or water?”',
              setup:
                'Keep a spill-proof straw cup right beside the bed and pre-load a “last check” before lights out:',
              script:
                '“Water cup is on the nightstand, big kiss is in your cheek, and we’ll chat about squirrels first thing when the yellow sun light glows!”',
            },
            {
              id: 'tenreturns',
              label: '“Night 1 already hit 12 walk-backs, am I failing?”',
              setup:
                'Not at all! Night 1 is simply {poss} brain testing whether the new invisible crib wall is truly sturdy:',
              script:
                '“Every calm, boring return teaches {name} the wall is steady. Stay boring for 4 nights and watch the number plunge.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) just moved to a toddler bed and pops out 8 times every evening, walk me through surviving the first 5 nights calmly.”',
          beat4Kicker: 'Tonight’s big-bed anchor',
          beat4Title: 'Pick one steady boundary before bedtime tonight',
          beat4Lead:
            'Setting up the room and water cup upfront prevents 80% of excuses.',
          moves: [
            {
              id: 'prechecklist',
              title: 'Pre-load water, extra kiss, and potty BEFORE lights out',
              desc: 'Leave a spill-proof cup on the nightstand so zero real logistics require leaving the bedroom.',
            },
            {
              id: 'silentreturn',
              title: 'Commit to the “Silent Walk-Back” for the next 4 evenings',
              desc: 'One warm phrase on trip #1, pure loving silence on trips #2+, zero debates, zero anger.',
            },
            {
              id: 'sunclock',
              title: 'Introduce a simple color-change “Okay-to-Wake” nightlight',
              desc: 'Celebrate wildly the first morning {name} waits for the yellow sun light!',
            },
          ],
          closingNote:
            'Moving to an open bed is a huge leap in freedom, and every young explorer tests the edges of freedom first. Your boring, loving walk-backs become the calm invisible crib rails {name} trusts.',
          pocketInsight:
            'Don’t rush out of the crib; once in a big bed, childproof the whole room, use a color wake-clock, pre-load water, and run the zero-talk Silent Walk-Back for 4 nights.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery:
              '“How do you turn a clenched-jaw toothbrushing wrestling match into two minutes of giggling?”',
            title: 'Making Toothbrushing Playful Instead of a Wrestling Match',
            targetSlug: 'older-toddler-somatic-hygiene-routines',
          },
          interactiveHighlights: ['4-Step Big-Bed Plan', 'Silent Walk-Back'],
        },
      },
      {
        slug: 'older-toddler-somatic-hygiene-routines',
        title: 'Making Toothbrushing Playful Instead of a Wrestling Match',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Silly animal hunt · Play unlocks clenched jaws',
          headline: 'Making Toothbrushing Playful Instead of a Wrestling Match',
          deck: 'Why holding a screaming toddler’s mouth open backfires, and three joyful 60-second games (plus a sensory brush swap) that make {name} open wide willingly.',
          sceneTime: '7:20 PM · BATHROOM SINK',
          sceneBody:
            'The toothbrush comes out and {name} immediately clamps {poss} lips like a vault, twisting sideways off the stool. *You know brushing teeth is non-negotiable for health, yet turning bedtime into a nightly headlock leaves both of you rattled.*',
          pollQuestion: 'Does toothbrushing feel like the hardest two minutes of the night?',
          pollOptions: [
            {
              id: 'wrestle',
              label: 'Yes, pure nightly wrestling match!',
              response:
                'A stranger poking plastic sticks inside your mouth when you’re tired feels invasive to a 2-year-old! Switching to a playful “animal hunt” plus two-brush teamwork flips it fast.',
            },
            {
              id: 'sometimes',
              label: 'Hit or miss depending on the mood',
              response:
                'Checking toothpaste flavor (mint burns toddler tongues!) and adding one silly game keeps mouths wide open.',
            },
          ],
          beat2Kicker: 'Play unlocks cooperation',
          beat2Title: 'The 3-beat playful brushing loop',
          beat2Lead:
            'Because toothbrushing is a true health non-negotiable, the magic lies in making {name} feel playful, safe, and partly in charge. Tap the 3 steps below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The Giggle-Brushing cooperation loop',
          visualStageHint: 'Tap each step to turn resistance into laughter',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Sensory check + choice',
                label: 'Zero Sting + Two Brushes',
                quote: '“Want the blue brush or green brush? You brush my teeth while I start yours!”',
                desc: 'Use an ultra-soft small brush and mild berry/unflavored fluoride-appropriate rice-grain smear (mint feels spicy to toddlers!).',
                brainNote: 'Removing sensory sting removes 50% of jaw-clamping right away.',
              },
              {
                stepNum: '02',
                actor: 'Silly imagination',
                label: 'The Mouth Safari',
                quote: '“WAIT A SECOND! Is there a tiny purple giraffe hiding behind your back molar?! Ahhh!”',
                desc: 'Hunt excitedly for goofy imaginary creatures (“Whoa, I spotted a strawberry elephant on that tooth, scrub, scrub, gotcha!”).',
                brainNote: 'Playfulness shifts the brain straight out of defense into giggles (wide-open mouth!).',
              },
              {
                stepNum: '03',
                actor: 'Team finish',
                label: 'Your Turn + Parent Polish',
                quote: '“Parent polish first while we catch the elephant, then YOUR big-kid turn to finish!”',
                desc: 'Doing the thorough grown-up polish FIRST while {name} is laughing guarantees clean teeth, then {pronoun} gets proud solo practice.',
                brainNote: 'Combines real dental care with authentic age-2 independence.',
              },
            ],
          },
          almanacTruth:
            'A laughing mouth is an open mouth. Swap spicy mint toothpaste for mild flavor, keep two brushes handy, and hunt goofy imaginary animals on {possessive} molars instead of lecturing about cavities.',
          scienceDeepDive:
            'Pediatric dental compliance research confirms that playful distraction (“tell-show-do” and imaginative framing), sensory-friendly bristle/flavor selection, and shared autonomy outperform threat-based warnings (“your teeth will rot”) in young children who lack abstract future-consequence reasoning.',
          beat3Kicker: 'Practice the goofy pivot',
          beat3Title: 'When {name} snaps {poss} jaw shut and yells “NO BRUSH!”',
          rehearsalTriggerSpeaker: '{Name} clamping lips tight on the bathroom stool',
          rehearsalTriggerQuote: '“NO! I DO IT MYSELF! NO MAMA BRUSH!”',
          rehearsalPrompt: 'Which tired evening reflex locks the jaw even tighter?',
          instincts: [
            {
              id: 'scare',
              label:
                '“Open right now or sugar bugs will eat holes in your teeth and the dentist will pull them!”',
              whyTitle: 'Why fear backfires on bedtime hygiene',
              whyText:
                'Dental scare stories spark bedtime anxiety and dentist phobia without making a tired 2-year-old cooperate any faster.',
            },
            {
              id: 'skip',
              label:
                'Give up completely and let {obj} chew silently on the brush for 3 seconds.',
              whyTitle: 'Why a playful team split protects both teeth and peace',
              whyText:
                'Because brushing truly protects health, we hold the rule warmly, using silliness and a mirror instead of skipping or pinning {obj} down angrily.',
            },
          ],
          calmScriptPlain:
            '“You want to do it yourself, you ARE a big kid! Let’s make a deal: I’ll do a super-fast 20-second tickle-brush to catch the silly blue dinosaur on your back teeth, then YOU get the brush all to yourself!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'honor',
              text: 'You want to do it yourself, you ARE a big kid!',
              tag: 'Honors Pride',
              note: 'Takes the sting out of the autonomy clash right away.',
            },
            { text: ' ' },
            {
              id: 'game',
              text: 'Let’s make a deal: I’ll do a super-fast 20-second tickle-brush to catch the silly blue dinosaur on your back teeth,',
              tag: 'Playful Hook',
              note: 'Absurd humor (“blue dinosaur?!”) gets {name} grinning, instantly opening the mouth!',
            },
            { text: ' ' },
            {
              id: 'turn',
              text: 'then YOU get the brush all to yourself!',
              tag: 'Guaranteed Turn',
              note: 'Hands ownership right back so toothbrushing ends in triumph.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Check toothpaste: skip strong mint!',
            'Try brushing right in the bathtub or on the bedroom rug',
            'Let {name} brush YOUR teeth at the exact same time',
          ],
          pushbacks: [
            {
              id: 'stillclamps',
              label: '“Even games didn’t work tonight, {pronoun} is super overtired”',
              setup:
                'Move brushing earlier (right after dinner BEFORE bedtime fatigue hits!), game-changer:',
              script:
                '“Moving toothbrushing to right after dinner, while {name} still has playful energy, solves 80% of 7:30 PM brushing battles!”',
            },
            {
              id: 'lyingdown',
              label: '“I can’t reach {poss} back molars while {pronoun}’s standing on a stool”',
              setup:
                'Play “Dentist Pillow”: have {name} lie playfully with {poss} head resting in your lap looking up at your silly upside-down face:',
              script:
                '“Whoa, everything looks upside down from my lap! Roar like a giant lion so I can see those shiny back teeth!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) fights toothbrushing (or hair washing) every single night, give me 5 playful, non-screen games that invite cooperation.”',
          beat4Kicker: 'Tonight’s 2-minute giggle upgrade',
          beat4Title: 'Pick one playful brushing twist tonight',
          beat4Lead:
            'Try one tiny twist tonight and trade the bathroom standoff for laughter.',
          moves: [
            {
              id: 'animalhunt',
              title: 'Run the “Mouth Safari” hunt tonight',
              desc: 'Gasp playfully: “Wait, I see a tiny dancing banana hiding on your back tooth! Hold still so I can tickle it off!”',
            },
            {
              id: 'afterdinner',
              title: 'Try brushing 30 minutes earlier (right after dinner or in the tub)',
              desc: 'Catching {name} before peak bedtime fatigue cuts resistance in half.',
            },
            {
              id: 'flavorswap',
              title: 'Check toothpaste flavor + hand {name} a second brush to brush YOUR teeth',
              desc: 'Swap spicy mint for mild fruit/unflavored paste and turn brushing into mutual silliness.',
            },
          ],
          closingNote:
            'Hygiene doesn’t have to end the evening in tears. One silly imaginary elephant hiding behind a molar turns a nightly power struggle into two minutes of shared giggles right before books.',
          pocketInsight:
            'A laughing mouth opens wide. Ditch spicy mint paste, move brushing earlier before fatigue hits, play “Mouth Safari,” and split Parent Polish + Big-Kid Turn.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Giggle-Brushing Loop', 'Mouth Safari Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 13: Toddler Mealtimes Without Battles (4 Episodes: Gold-Standard Prototype Match!)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'nutrition-older-toddler-independence-and-snacking',
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    title: 'Toddler Mealtimes Without Battles',
    reliefSubtitle:
      'End dinner standoffs with one safe food anchor, decode the evolutionary “beige phase,” protect dinner appetite, and spark joyful kitchen tasting',
    tonightQuickWinTitle: 'Episode 1: Why {Name} Suddenly Only {Eats} Beige Food',
    summary:
      'Replace dinner-table pressure and short-order cooking with calm sensory ladders, understand the ancient bitter-alarm behind age-2 picky eating, close grazing loops between snacks, and invite playful sous-chef curiosity.',
    coverImageUrl: 'https://assets.alongside.care/academy/nutrition-older-toddler.png',
    sortOrder: 3,
    episodes: [
      {
        slug: 'older-toddler-one-safe-food-rule',
        title: 'Why {Name} Suddenly Only {Eats} Beige Food',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Evening place setting · One calm anchor',
          headline: 'Why {Name} Suddenly Only {Eats} Beige Food',
          deck: 'And the quiet one-plate shift that stops dinner standoffs, without becoming a short-order cook.',
          sceneTime: '6:05 PM · THE DINNER TABLE',
          sceneBody:
            'You spent thirty minutes making salmon, asparagus, and rice. The second the plate lands, {name} {pushes} it away: *“Yucky! I want crackers!”* Your chest tightens, you just wanted one peaceful meal.',
          pollQuestion: 'Does this sound like your week?',
          pollOptions: [
            {
              id: 'daily',
              label: 'Almost every dinner',
              response:
                'Take a slow breath, you did not break {possessive} appetite. Around {age}, mealtime refusal spikes almost overnight for nearly every family. Here’s why one safe anchor changes the whole table.',
            },
            {
              id: 'sometimes',
              label: 'A few nights a week',
              response:
                'That inconsistency is actually the biggest clue: {name} isn’t being stubborn, {poss} nervous system is just checking whether the plate feels safe tonight.',
            },
            {
              id: 'ahead',
              label: 'Just preparing ahead',
              response:
                'Smart timing. Knowing this rhythm before the first plate gets pushed away saves months of table tension.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mind',
          beat2Title: 'Eating is step five, not step one',
          beat2Lead:
            'When a plate has zero familiar foods, a toddler’s threat center fires before they even pick up a fork. Putting one trusted “safe food” beside the new food lowers the alarm so curiosity can return.',
          visualType: AlmanacVisualType.SENSORY_LADDER,
          visualStageTitle: 'The 5-step sensory comfort ladder',
          visualStageHint: 'Tap each step to watch the plate evolve',
          visualConfig: {
            steps: [
              {
                label: 'Table',
                title: '1. Shares the table peacefully',
                desc: 'Just seeing asparagus in a shared bowl across the table without crying is already a win, the visual brain starts filing it under “normal family food.”',
                tag: 'Step 1 · Visual safety',
              },
              {
                label: 'Plate',
                title: '2. Rests calmly beside a safe anchor',
                desc: 'One tiny green piece sits next to warm bread without triggering tears. Having a familiar food right beside it keeps the threat alarm turned off.',
                tag: 'Step 2 · Safe neighbor',
              },
              {
                label: 'Touch',
                title: '3. Pokes with a fork or fingertip',
                desc: 'Tapping, poking, or moving the food to a “learning corner” lets {possessive} fingers map texture and firmness before {poss} mouth ever risks it.',
                tag: 'Step 3 · Tactile curiosity',
              },
              {
                label: 'Smell',
                title: '4. Sniffs or brings it near lips',
                desc: 'Smell drives roughly 80% of flavor memory. Simply breathing in the aroma across calm dinners lowers caution naturally.',
                tag: 'Step 4 · Flavor preview',
              },
              {
                label: 'Taste',
                title: '5. Curious lick or small bite, on {poss} terms',
                desc: 'Once steps 1–4 feel completely safe, tasting happens spontaneously, often weeks later on an ordinary Tuesday when nobody is pressuring!',
                tag: 'Step 5 · Self-chosen bite',
              },
            ],
          },
          almanacTruth:
            'A single familiar food on the plate lowers dinner-table refusal dramatically, not because you gave in, but because a calm nervous system can finally stay curious.',
          scienceDeepDive:
            'Between 20 and 36 months, unfamiliar textures and bitter flavors activate the amygdala’s threat-detection loop. When a trusted carbohydrate anchor (plain rice, warm bread, sliced fruit) sits on the same plate, sensory predictability keeps cortisol low so the prefrontal and gustatory cortices can gradually map the new food as safe.',
          beat3Kicker: 'Practice before 6:00 PM',
          beat3Title: 'What happens in the first ten seconds',
          rehearsalTriggerSpeaker: '{Name} pushes the plate back',
          rehearsalTriggerQuote: '“YUCKY! I don’t like salmon! Make me nuggets!”',
          rehearsalPrompt:
            'Which response feels closest to your honest instinct? Tap to see how {name} hears it:',
          instincts: [
            {
              id: 'bite',
              label:
                '“Take just one polite bite of salmon, then you can have your bread.”',
              whyTitle: 'Why that’s so tempting, and what {poss} brain hears',
              whyText:
                'It feels completely reasonable to an adult. But to a cautious {ageShort}, turning salmon into a gatekeeper makes bread look like forbidden treasure and confirms that salmon must be something unpleasant you have to suffer through.',
            },
            {
              id: 'nuggets',
              label:
                '“Fine, I’ll go heat up a separate plate of nuggets so you eat something.”',
              whyTitle: 'Why that’s so tempting, and what {poss} brain hears',
              whyText:
                'Every loving parent worries about a hungry child going to bed. Yet short-order cooking accidentally teaches {obj} that rejecting the family meal is the fastest way to summon familiar comfort food, so the plate push gets louder tomorrow.',
            },
          ],
          calmScriptPlain:
            '“You don’t have to eat the salmon tonight. There’s warm bread and rice right here on your plate, you can eat whatever your belly feels ready for.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'drop',
              text: 'You don’t have to eat the salmon tonight.',
              tag: 'Drops Alarm',
              note: 'Immediately dissolves the power struggle, when pressure vanishes, {poss} nervous system stops fighting the plate.',
            },
            { text: ' ' },
            {
              id: 'anchor',
              text: 'There’s warm bread and rice right here on your plate',
              tag: 'Safe Anchor',
              note: 'Points calmly to familiar food already on the shared meal, holding the family boundary with zero short-order cooking.',
            },
            { text: ', ' },
            {
              id: 'belly',
              text: 'you can eat whatever your belly feels ready for.',
              tag: 'Body Trust',
              note: 'Hands eating autonomy back to {poss} body (Ellyn Satter’s Division of Responsibility), building lifelong hunger awareness.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Safe food on the same plate',
            'Zero commentary on bites',
            'Warm, matter-of-fact tone',
          ],
          pushbacks: [
            {
              id: 'louder',
              label: '“{Pronoun} {cries} louder for nuggets”',
              setup: 'Hold the boundary like weather, calm, steady, no lecture:',
              script:
                '“I hear you really wanted nuggets tonight. Dinner is salmon, rice, and bread. You can eat the bread or sit with us until you’re done.”',
            },
            {
              id: 'throws',
              label: '“{Pronoun} {throws} the asparagus”',
              setup:
                'Keep your voice low and matter-of-fact, no big reaction that turns throwing into a show:',
              script:
                '“Food stays on the plate or in the ‘no-thank-you’ bowl. Let’s put the green piece in this little bowl so your plate feels comfy.”',
            },
            {
              id: 'partner',
              label: '“My partner says ‘just try one bite’”',
              setup:
                'Save the debrief for after bedtime, and gently steady the moment at the table:',
              script:
                '“We’re letting {name} listen to {poss} belly tonight, no pressure on the salmon, just enjoying dinner together.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) pushed away dinner even with bread on {poss} plate and is asking for snacks 20 minutes later, what should I say right now?”',
          beat4Kicker: 'Tonight’s small experiment',
          beat4Title: 'Pick just one move for your next meal',
          beat4Lead:
            'Your pick automatically fills in your Pocket Card below, so you walk away with one clear, low-stress plan.',
          moves: [
            {
              id: 'anchor',
              title: 'Place one safe anchor right on the main plate',
              desc: 'Include one food {name} reliably eats (warm bread, plain pasta, banana) alongside dinner, no separate meal required.',
            },
            {
              id: 'nobites',
              title: 'Retire the “one polite bite” rule tonight',
              desc: 'Serve the plate, sit down to enjoy your own food, and skip all commentary on what gets eaten.',
            },
            {
              id: 'scoop',
              title: 'Put one dish in the center to scoop together',
              desc: 'Letting {obj} scoop even a single spoonful of rice gives back the autonomy {pronoun} {is} craving.',
            },
          ],
          closingNote:
            'Tonight, measure dinner by the warmth at the table, not the empty space on the plate. A child who feels safe beside unfamiliar food eventually gets curious enough to taste it.',
          pocketInsight:
            'One familiar “safe food” on the main plate calms the threat alarm so curiosity can return, no short-order cooking needed.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3.5 min',
            mystery:
              '“Wait, why did {name} happily eat broccoli at 10 months and suddenly fear it at age 2?”',
            title: 'The Ancient Survival Instinct Behind the “Beige Phase”',
            targetSlug: 'older-toddler-food-neophobia-evolution',
          },
          interactiveHighlights: ['Animated Sensory Ladder', 'Annotated Calm Script'],
        },
      },
      {
        slug: 'older-toddler-food-neophobia-evolution',
        title: 'The Ancient Survival Instinct Behind the “Beige Phase”',
        readingMinutes: 4,
        audioDurationSeconds: 195,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.leaf,
          illustrationCaption: 'Botanical radar · Built around age two',
          headline: 'The Ancient Survival Instinct Behind the “Beige Phase”',
          deck: 'Why {possessive} sudden suspicion of anything green isn’t a regression, it’s a 200,000-year-old safety radar switching on.',
          sceneTime: '8:45 PM · LOOKING BACK AT BABY PHOTOS',
          sceneBody:
            'You scroll past a photo from ten months ago: {name} beaming with spinach puree across both cheeks. Tonight {pronoun} looked at one tiny green pea like it was a spider. *“Did I do something wrong?”*',
          pollQuestion:
            'Have you wondered how your once-adventurous eater changed overnight?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes, it happened like a light switch',
              response:
                'That “light switch” timing is actually the proof. It switches on almost to the month when toddlers start walking independently, and nature built it on purpose.',
            },
            {
              id: 'always',
              label: 'They’ve always been cautious',
              response:
                'Some children have naturally sharper bitter-taste sensors. The exact same low-pressure exposure curve works for them, just with a touch more patience.',
            },
          ],
          beat2Kicker: 'The brain decoder',
          beat2Title: 'Flip the lens on “picky eating”',
          beat2Lead:
            'Before {name} could walk, caregivers controlled everything that reached {poss} mouth. The moment toddlers became mobile in ancestral environments, eating random bitter green leaves was lethal. Nature installed a temporary bitter-alarm right around age two.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Adult frustration lens vs. toddler brain lens',
          visualStageHint: 'Flip both lenses, then tap sightings 1 to 20 below',
          visualConfig: {
            adultLabel: 'Adult lens',
            adultQuote:
              '“{Pronoun} {is} being stubborn, {pronoun} won’t even take ONE bite of green beans!”',
            adultSub:
              'When we cook with love and it gets rejected, it naturally feels personal or willful.',
            childLabel: '{Possessive} brain lens',
            childQuote:
              '“Green and bitter = unknown wild plant! Better stick to safe beige calories.”',
            childSub:
              'An ancient evolutionary safety switch protecting mobile toddlers from wild toxins, not defiance.',
            exposureHeading: 'The 20-Sighting Familiarity Map',
            exposureSub: 'Tap any dot (1–20) to see how trust grows without forced bites',
            totalDots: 20,
            defaultCount: 7,
            unitLabel: 'sighting',
            lowMax: 6,
            midMax: 14,
            lowMsg:
              'Sightings 1–6: High caution. Just sharing the table calmly without pressure is huge hidden progress.',
            midMsg:
              'Sightings 7–14: Alarm softens! {Name} may poke it with a fork, smell it, or tolerate it touching the plate.',
            highMsg:
              'Sightings 15–20: Familiar friend! Spontaneous curious licks and bites emerge right when pressure is lowest.',
          },
          almanacTruth:
            'Beige foods mean “predictable calories, zero poison” to an ancient toddler brain. It takes 15 to 20 calm sightings, not bites, before a green food graduates to “familiar friend.”',
          scienceDeepDive:
            'Developmental psychologists call this Food Neophobia. Cruciferous vegetables contain bitter glucosinolates that trigger heightened TAS2R bitter receptors in early childhood. Repeated neutral visual and olfactory exposure gradually recruits hippocampal familiarity circuits, extinguishing the innate alarm.',
          beat3Kicker: 'When old myths show up',
          beat3Title: 'What to say when vegetables spark resistance',
          rehearsalTriggerSpeaker: 'At the table, eyeing a green bean',
          rehearsalTriggerQuote: '“Ew! Take the green stuff OFF my plate!”',
          rehearsalPrompt: 'Which instinct feels most natural in that split second?',
          instincts: [
            {
              id: 'usedto',
              label:
                '“You used to love green beans as a baby! Why are you being so picky now?”',
              whyTitle: 'Why that’s so tempting, and what {poss} brain hears',
              whyText:
                'It’s genuinely baffling to remember how they used to eat! But framing a biological phase as a personal flaw adds shame on top of genuine sensory sensitivity.',
            },
            {
              id: 'dessert',
              label:
                '“No strawberries or dessert until you eat two green beans.”',
              whyTitle: 'Why that’s so tempting, and what {poss} brain hears',
              whyText:
                'Bargaining makes vegetables feel like a chore you endure to earn the “good” food, which research shows actually decreases long-term liking for the vegetable.',
            },
          ],
          calmScriptPlain:
            '“Your tongue is extra sensitive to green flavors right now, lots of {ageShort}s feel that way. It can just rest in your ‘learning corner’ while you eat.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'tongue',
              text: 'Your tongue is extra sensitive to green flavors right now',
              tag: 'Validates Biology',
              note: 'Tells {name} you believe {poss} sensory experience instead of calling {obj} dramatic or picky.',
            },
            { text: ', lots of {ageShort}s feel that way. ' },
            {
              id: 'corner',
              text: 'It can just rest in your ‘learning corner’ while you eat.',
              tag: 'Keeps Sighting',
              note: 'Preserves the calm visual exposure (building toward 20 sightings!) without forcing a bite.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Normalize the feeling',
            'Keep one tiny piece visible',
            'Zero bargaining',
          ],
          pushbacks: [
            {
              id: 'touching',
              label: '“The green bean touched {poss} pasta!”',
              setup: 'Treat sensory overlap seriously without making a fuss:',
              script:
                '“Let’s move the green bean onto this little side plate right next to yours so your pasta stays just how you like it.”',
            },
            {
              id: 'spits',
              label: '“{Pronoun} licked it and spat it out”',
              setup:
                'Quietly celebrate, spitting out is actually step 4.5 of trusting a new food:',
              script:
                '“You checked it out with your tongue and decided not today. Put it right on your napkin, good listening to your mouth.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) refuses every vegetable and my family is worried about nutrition, what easy high-iron safe pairings can we rotate this week?”',
          beat4Kicker: 'This week’s calm rhythm',
          beat4Title: 'Pick one tiny exposure habit',
          beat4Lead:
            'Remember: a food simply sharing the table peacefully still counts toward the 20 exposures.',
          moves: [
            {
              id: 'singlepea',
              title: 'Serve a “micro-portion” of one rejected food',
              desc: 'Put just two peas or one tiny broccoli floret on the plate, small enough not to look intimidating.',
            },
            {
              id: 'paint',
              title: 'Invite playful, non-eating contact',
              desc: 'Ask: “Want to use that carrot stick like a paintbrush in the hummus?” Zero pressure to taste.',
            },
            {
              id: 'model',
              title: 'Enjoy it yourself with quiet curiosity',
              desc: 'Describe texture neutrally (“Ooh, this asparagus is crunchy tonight”) instead of pitching it to {name}.',
            },
          ],
          closingNote:
            'You didn’t miss a window, and {name} won’t live on toast forever. Every peaceful dinner where a green food simply shares the table is quietly rewiring {poss} map of safe foods.',
          pocketInsight:
            'Beige-food preference at age 2–3 is an evolutionary bitter-alarm. Aim for 15–20 zero-pressure sightings, not forced bites.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“Why does closing the snack cabinet between meals mysteriously turn a ‘picky’ toddler into an eager dinner eater?”',
            title: 'Closing the Kitchen Between Snacks to Bring Back Dinner Appetite',
            targetSlug: 'older-toddler-scheduled-snack-windows',
          },
          interactiveHighlights: ['20-Sighting Dot Matrix', 'Adult vs. Brain Lens'],
        },
      },
      {
        slug: 'older-toddler-scheduled-snack-windows',
        title: 'Closing the Kitchen Between Snacks to Bring Back Dinner Appetite',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Every 2.5–3 hours · Predictable meals & snacks',
          headline: 'Closing the Kitchen Between Snacks to Bring Back Dinner Appetite',
          deck: 'Why all-day cracker grazing keeps {possessive} belly permanently 30% full, and how a gentle “kitchen is resting” rhythm brings real hunger back to dinner.',
          sceneTime: '4:45 PM · PANTRY DOOR REQUEST #7',
          sceneBody:
            '{Name} nibbled crackers in the stroller at 3:15, sipped a milk cup at 4:00, and now tugs the pantry handle at 4:45 asking for pretzels. Then at 6:00 PM {pronoun} takes two bites of dinner and announces *“Not hungry!”* *Wait, is grazing quietly stealing dinner appetite?*',
          pollQuestion: 'Does your toddler ask for snacks constantly all afternoon?',
          pollOptions: [
            {
              id: 'constant',
              label: 'Yes, feels like I’m running a 24-hour snack bar!',
              response:
                'Exhausting for you AND confusing for {possessive} belly! Switching to 3 meals + 2 sit-down snacks (every ~2.5–3 hours) lets genuine appetite return in just 48 hours.',
            },
            {
              id: 'bored',
              label: 'Often asks for snacks right when bored or tired',
              response:
                'Bingo, crunchy snacks feel soothing when bored! Predictable snack windows let {name} learn what real tummy hunger actually feels like.',
            },
          ],
          beat2Kicker: 'Restoring genuine hunger cues',
          beat2Title: 'The 5-anchor daily eating rhythm',
          beat2Lead:
            'Hunger is the single greatest sauce for trying new foods! Between scheduled sit-down windows, only water is served so {possessive} stomach gets to empty cleanly. Tap below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 2.5–3 hour toddler meal-and-snack cadence',
          visualStageHint: 'Tap each anchor across the day',
          visualConfig: {
            steps: [
              {
                timeOrCue: '7:30 AM',
                label: 'Breakfast',
                title: 'Full hearty morning anchor',
                desc: 'Protein + fat + fruit/grain while morning hunger is wide open.',
                why: 'Sets stable blood sugar for morning play.',
              },
              {
                timeOrCue: '10:00 AM',
                label: 'Morning Snack',
                title: 'Mini-meal seated (not walking around)',
                desc: 'Think mini lunch, apple + nut butter or cheese + berries, then kitchen rests until lunch.',
                why: 'Seated snacks prevent mindless stroller grazing.',
              },
              {
                timeOrCue: '12:15 PM',
                label: 'Lunch',
                title: 'Balanced midday plate before nap',
                desc: 'Pair one favorite safe food with simple family leftovers.',
                why: 'Full belly powers a deeper afternoon nap.',
              },
              {
                timeOrCue: '3:30 PM',
                label: 'Afternoon Snack',
                title: 'Last snack at least 2 hours before dinner!',
                desc: 'Serve a satisfying snack right after nap, then offer strictly WATER from 4:00 PM until dinner lands.',
                why: 'A clean 2-hour hunger runway makes 6:00 PM dinner taste 3x better!',
              },
            ],
          },
          almanacTruth:
            'All-day grazing keeps a toddler permanently half-full, just comfortable enough to reject anything unfamiliar at dinner. Five predictable sit-down eating windows with water between them bring genuine curiosity back.',
          scienceDeepDive:
            'Pediatric feeding studies show that structured meal-and-snack intervals (2.5–3 hours with water-only inter-meal periods) restore physiological ghrelin cycling before main meals, significantly increasing willingness to sample novel foods compared to ad-libitum snacking.',
          beat3Kicker: 'Holding “kitchen is resting” warmly',
          beat3Title: 'What to say at 5:00 PM when {name} begs for crackers',
          rehearsalTriggerSpeaker: '{Name} pulling at the pantry door at 5:00 PM',
          rehearsalTriggerQuote: '“HUNGRY! WANT CRACKERS RIGHT NOW!!”',
          rehearsalPrompt: 'Which tired evening move accidentally spoils 6:00 PM dinner?',
          instincts: [
            {
              id: 'handcrackers',
              label:
                'Toss {obj} a cup of cheddar crackers to buy 20 quiet minutes while you cook.',
              whyTitle: 'Why quick carb snacks erase dinner curiosity',
              whyText:
                'A cup of crackers hits a toddler’s tiny belly like half a loaf of bread, guaranteeing {pronoun} ignores salmon and veggies an hour later!',
            },
            {
              id: 'sayno',
              label:
                'Snap “No! You just ate an hour ago, stop whining!”',
              whyTitle: 'Why warm predictability lands much smoother',
              whyText:
                'Naming WHEN the next meal arrives (“Kitchen is resting while dinner cooks, want to sip cold water or help wash the dinner cucumber?”) feels calm and reassuring.',
            },
          ],
          calmScriptPlain:
            '“Oh, your belly is starting to wake up for dinner! The snack pantry is resting right now, we eat dinner right when this timer dings. Want a cold sip of water or two cucumber slices from the cutting board?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'welcome',
              text: 'Oh, your belly is starting to wake up for dinner!',
              tag: 'Celebrates Hunger',
              note: 'Frames mild pre-dinner hunger as a great healthy signal, not an emergency.',
            },
            { text: ' ' },
            {
              id: 'resting',
              text: 'The snack pantry is resting right now, we eat dinner right when this timer dings.',
              tag: 'Neutral Boundary',
              note: '“Kitchen is closed/resting” holds the rule cleanly without feeling harsh.',
            },
            { text: ' ' },
            {
              id: 'veggie',
              text: 'Want a cold sip of water or two cucumber slices from the cutting board?',
              tag: 'Smart Bridge',
              note: 'If {pronoun} is genuinely starving early, offering a raw/soft dinner veggie tests true hunger AND boosts veggie exposure!',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Water only between eating windows',
            'Keep afternoon snack 2 hours before dinner',
            'Treat snacks as mini-meals, not exclusively packaged crackers',
          ],
          pushbacks: [
            {
              id: 'trulystarving',
              label: '“What if {name} had a huge park afternoon and is truly melting down hungry at 5 PM?”',
              setup:
                'Slide dinner 20 minutes earlier, or serve the vegetable part of dinner right now as a “table appetizer”:',
              script:
                '“Hungry bodies don’t have to suffer, serve dinner veggies early or move dinner up to 5:30 PM instead of opening cracker bags!”',
            },
            {
              id: 'milkbetween',
              label: '“Does milk count as water between snacks?”',
              setup:
                'Milk is liquid food! Serving milk WITH meals/snacks and strictly plain water in between keeps real hunger sharp:',
              script:
                '“Water is for thirst anytime; milk joins us right at the table for meals and snacks.”',
            },
          ],
          advisorPrompt:
            '“Help me map a realistic 3-meal + 2-snack rhythm for {name} ({age}) around our 12:30 PM nap and 6:00 PM dinner, plus 5 ‘mini-meal’ snack ideas.”',
          beat4Kicker: 'Tomorrow’s appetite reset',
          beat4Title: 'Pick one snack-rhythm tweak tomorrow',
          beat4Lead:
            'Give this simple rhythm just 3 days and watch how eagerly {name} climbs into {poss} dinner chair.',
          moves: [
            {
              id: 'twohrgap',
              title: 'Create a 2-hour water-only runway before dinner tomorrow',
              desc: 'Serve a real afternoon snack by 3:45 PM, then offer only cold water until dinner lands.',
            },
            {
              id: 'sitdownsnack',
              title: 'Make afternoon snack a 5-minute sit-down pause',
              desc: 'Serving snacks seated at a small table stops mindless couch/stroller grazing.',
            },
            {
              id: 'preveggie',
              title: 'Use dinner veggies as the only “early bridge” at 5:15 PM',
              desc: 'When {name} asks for snacks while you cook, offer crunchy bell pepper or cucumber straight from tonight’s meal.',
            },
          ],
          closingNote:
            'You are not depriving {name} by closing the kitchen for two quiet hours, you are handing {obj} the gift of sitting down genuinely hungry and discovering how good real food tastes.',
          pocketInsight:
            'Stop all-day grazing: run 3 meals + 2 seated mini-meal snacks every 2.5–3 hours, strictly water in between, and protect a 2-hour runway before dinner.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery:
              '“Why will a cautious 2-year-old who refuses spinach on a dinner plate happily nibble a leaf straight off the cutting board?”',
            title: 'Tiny Sous-Chef: Low-Pressure Kitchen Play That Sparks Tasting',
            targetSlug: 'older-toddler-kitchen-sensory-exploration',
          },
          interactiveHighlights: ['5-Anchor Eating Rhythm', 'Kitchen-Resting Script'],
        },
      },
      {
        slug: 'older-toddler-kitchen-sensory-exploration',
        title: 'Tiny Sous-Chef: Low-Pressure Kitchen Play That Sparks Tasting',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Zero-pressure kitchen helper · Pride unlocks curiosity',
          headline: 'Tiny Sous-Chef: Low-Pressure Kitchen Play That Sparks Tasting',
          deck: 'How five minutes of rinsing berries, tearing lettuce, or stirring sauce away from dinner-table expectations sparks spontaneous tasting.',
          sceneTime: '5:35 PM · BESIDE THE CUTTING BOARD',
          sceneBody:
            'Standing safely beside you at the counter, {name} tears crisp romaine leaves into a salad bowl and shakes olive oil in a jar. Nobody asks {obj} to eat a single leaf, yet five seconds later, {pronoun} pops a crunchy green piece straight into {poss} mouth to test {poss} own creation. *Wait, what just happened?!*',
          pollQuestion: 'Have you ever noticed {name} tastes food more freely OUTSIDE of formal sit-down dinner?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes, {pronoun} sneaks bites off the counter all the time!',
              response:
                'Outside the dinner chair, zero eyes are watching {poss} fork, so pressure drops to 0% and {poss} natural curiosity takes the wheel!',
            },
            {
              id: 'messy',
              label: 'I’d love to cook together, just nervous about the mess',
              response:
                'Skip messy flour baking on weeknights, three zero-mess 2-minute tasks (washing berries, tearing herbs, pressing the blender button) deliver 100% of the magic!',
            },
          ],
          beat2Kicker: 'Why kitchen play beats dinner speeches',
          beat2Title: 'Five zero-pressure kitchen jobs for ages 2–3',
          beat2Lead:
            'Every touch, sniff, and rinse during meal prep climbs steps 1–4 of the Sensory Comfort Ladder BEFORE dinner even starts! Tap the 5 easy sous-chef tasks below.',
          visualType: AlmanacVisualType.SENSORY_LADDER,
          visualStageTitle: '5 zero-mess toddler sous-chef jobs',
          visualStageHint: 'Tap each job to see how it lowers food fear',
          visualConfig: {
            steps: [
              {
                label: 'Wash',
                title: '1. Colander veggie & berry bath',
                desc: 'Let {name} swish snap peas, blueberries, or cherry tomatoes in a cool bowl of water, wet hands build playful familiarity fast.',
                tag: 'Zero Mess · Sensory comfort',
              },
              {
                label: 'Tear',
                title: '2. Tearing soft lettuce, spinach, or basil leaves',
                desc: 'Tearing leaves with tiny fingers releases fresh plant aromas straight to {poss} nose with zero pressure to eat.',
                tag: 'Aroma Exposure · Fine motor',
              },
              {
                label: 'Chop',
                title: '3. Soft chopping with a kid-safe nylon knife',
                desc: 'Slicing ripe banana, steamed sweet potato, or mushrooms with a blunt serrated toddler knife creates huge proud ownership.',
                tag: 'Big Pride · “I made this!”',
              },
              {
                label: 'Shake',
                title: '4. Shaking spices or salad-dressing jars',
                desc: 'Sprinkling garlic powder or shaking a sealed olive-oil jar connects {name} to real family flavors.',
                tag: 'Flavor Map · Fun sound',
              },
              {
                label: 'Serve',
                title: '5. Carrying one unbreakable bowl to the table',
                desc: 'Announcing proudly “{Name} helped wash the peas tonight!” transforms unfamiliar vegetables into {possessive} own project.',
                tag: 'Ownership · Curiosity jumps!',
              },
            ],
          },
          almanacTruth:
            'When toddlers wash, tear, or stir a food away from dinner expectations, they climb steps 1 to 4 of food trust effortlessly, and pride in “I helped make it!” sparks spontaneous bites.',
          scienceDeepDive:
            'Randomized kitchen-involvement trials (van der Horst et al., Appetite) demonstrate that children who participate in simple meal preparation eat significantly more vegetables from the prepared dish than children served identical plates passively, driven by tactile familiarization and psychological ownership.',
          beat3Kicker: 'Keeping kitchen time calm (not pressured)',
          beat3Title: 'The golden sous-chef rule: NEVER ask {obj} to taste while helping',
          rehearsalTriggerSpeaker: '{Name} sniffing a fresh sprig of broccoli {pronoun} just washed',
          rehearsalTriggerQuote: '“Look Mommy, little green trees!”',
          rehearsalPrompt: 'Which eager parent remark accidentally snaps the spell?',
          instincts: [
            {
              id: 'trytaste',
              label:
                '“Yay! Go ahead and take a big bite of the tree right now, you’ll love it!”',
              whyTitle: 'Why eager cheering triggers instant retreat',
              whyText:
                'The second {name} feels a spotlight (“Oh, this was a trick to make me eat!”), {poss} caution radar snaps right back up.',
            },
            {
              id: 'takeover',
              label:
                'Take the spoon back after ten seconds because {pronoun} is stirring too slowly.',
              whyTitle: 'Why picking ONE dedicated 2-minute job prevents impatience',
              whyText:
                'You don’t need {obj} helping with the whole recipe! Giving one neat 2-minute job (like washing berries) keeps you calm and unhurried.',
            },
          ],
          calmScriptPlain:
            '“Whoa, they DO look like tiny green forest trees! Thanks for giving them a cold bath, want to toss them right into the big steaming basket?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'join',
              text: 'Whoa, they DO look like tiny green forest trees!',
              tag: 'Follows Wonder',
              note: 'Keeps the kitchen purely playful and sensory, zero hidden agenda.',
            },
            { text: ' ' },
            {
              id: 'thanks',
              text: 'Thanks for giving them a cold bath, want to toss them right into the big steaming basket?',
              tag: 'Pure Sous-Chef Role',
              note: 'Zero pressure to bite leaves the door wide open for {name} to nibble curiously on {poss} own.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Zero “take a bite!” prompts during prep',
            'Pick ONE 2-minute job on busy nights',
            'Keep hot pans & sharp knives far back on counters',
          ],
          pushbacks: [
            {
              id: 'notaste',
              label: '“{Pronoun} helped tear spinach and STILL didn’t eat it at dinner”',
              setup:
                'Huge hidden victory! Tearing and smelling spinach just banked 3 massive sensory exposures toward the 20-sighting mark:',
              script:
                '“Every sniff, rinse, and tear rewires {poss} food radar even when zero bites happen tonight, trust the quiet compound interest!”',
            },
            {
              id: 'nohelper',
              label: '“I don’t have a kitchen learning tower yet”',
              setup:
                'Sit {name} right at the low dining table or on a clean kitchen towel on the floor with a bowl of berries and a colander!',
              script:
                '“A low kid table or dining chair safely away from the stove works identically, zero fancy gear needed.”',
            },
          ],
          advisorPrompt:
            '“Give me 5 super quick, safe, low-mess kitchen tasks {name} ({age}) can help with during weekday dinners, with zero pressure to eat.”',
          beat4Kicker: 'This week’s joyful kitchen invite',
          beat4Title: 'Pick one 2-minute sous-chef job this week',
          beat4Lead:
            'Pick a relaxed evening (even Saturday breakfast!) and invite your tiny chef in.',
          moves: [
            {
              id: 'rinse',
              title: 'Let {name} rinse one fruit or veggie in a cool bowl of water',
              desc: 'Hand over a colander of berries or snap peas, zero asking for a bite, pure playful pride.',
            },
            {
              id: 'tearleaves',
              title: 'Invite {obj} to tear lettuce, spinach, or fresh herbs into a bowl',
              desc: 'Notice {poss} nose taking in fresh green smells without a single dinner-table tear.',
            },
            {
              id: 'creditchef',
              title: 'Celebrate “Chef {Name}” at the table without mentioning eating',
              desc: '“Chef {Name} washed these crisp cucumbers for our family tonight, thank you, Chef!”',
            },
          ],
          closingNote:
            'Raising an adventurous eater is a slow, joyful garden, not a race. Every afternoon {name} giggles beside you tearing herbs or rinsing berries plants seeds of food curiosity that bloom for decades.',
          pocketInsight:
            'Give {name} one 2-minute sous-chef job (rinsing, tearing, shaking spices) with ZERO requests to taste, sensory contact plus pride sparks spontaneous curiosity.',
          nextEpisodeHook: null,
          interactiveHighlights: ['5 Sous-Chef Jobs', 'Zero-Spotlight Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 14: Independent Play, Books & First Friendships (3 Episodes: 1 Cut/Folded)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'play-older-toddler-symbolic-play-and-blocks',
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    title: 'Independent Play, Books & First Friendships',
    reliefSubtitle:
      'Spark 20 minutes of independent block play, turn bedtime books into empathy gold, and navigate age-2 playdates without forced sharing',
    tonightQuickWinTitle: 'Episode 1: Sparking 20 Minutes of Independent Play With Simple Blocks',
    summary:
      'Set up open-ended invitations that unlock deep toddler pretend play and 20-minute solo stretches, practice interactive dialogic reading at bedtime, and guide early toy-grabbing playdates calmly.',
    coverImageUrl: 'https://assets.alongside.care/academy/play-older-toddler.png',
    sortOrder: 3,
    episodes: [
      {
        slug: 'older-toddler-open-ended-blocks',
        title: 'Sparking 20 Minutes of Independent Play With Simple Blocks',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Wooden block = phone, truck, or rocket ship',
          headline: 'Sparking 20 Minutes of Independent Play With Simple Blocks',
          deck: 'Why open-ended toys (wooden blocks, cardboard boxes, scarves) unlock imagination at age 2, and the 3-minute “Spark & Step Back” routine that buys you quiet time.',
          sceneTime: '9:30 AM · “PLAY WITH ME!”',
          sceneBody:
            'You sit down for five minutes hoping to drink a hot cup of coffee while {name} plays. The second your bottom touches the chair, {pronoun} drops a plastic toy in your lap pulling your sleeve: *“Play with me! Do it for me!”* *Wait, can a 2-year-old actually learn to play happily alone for 15–20 minutes?*',
          pollQuestion: 'Does {name} ask you to entertain {obj} nonstop throughout the day?',
          pollOptions: [
            {
              id: 'nonstop',
              label: 'Yes, I feel like a full-time cruise director!',
              response:
                'Good news: you were NEVER meant to be a nonstop cruise director! Independent play is a skill built in gentle 5-minute stretches using open-ended materials and the “Spark & Fade” rhythm.',
            },
            {
              id: 'starting',
              label: 'Sometimes {pronoun} gets absorbed, want more of that!',
              response:
                'Around age two, symbolic imagination (“this cardboard box is a rocket ship!”) clicks on, open-ended blocks and figures fuel it effortlessly.',
            },
          ],
          beat2Kicker: 'Inside {possessive} imaginative brain',
          beat2Title: 'The 4-step “Spark & Step Back” play rhythm',
          beat2Lead:
            'Right around 24–36 months, symbolic thinking blooms: a wooden block can become a telephone, a sandwich, or a bridge! Tap the 4-step routine that launches 15–20 minutes of absorbed solo play.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'Launching 20 minutes of independent play',
          visualStageHint: 'Tap each step from invitation to warm fade-out',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Step 1 · Edit',
                label: 'Simple Invitation',
                title: 'Leave out 1–2 open-ended sets (blocks + 3 animals)',
                desc: 'Clear cluttered piles and set up one tiny mystery on the rug: two wooden blocks forming a bridge with a toy elephant standing on top.',
                why: 'Open-ended items (blocks, cardboard boxes, scarves, magnetic tiles) spark symbolic imagination far longer than single-button toys.',
              },
              {
                timeOrCue: 'Step 2 · Spark',
                label: '3-Min Full Presence',
                title: 'Fill {possessive} connection cup completely for 3 minutes',
                desc: 'Sit phone-free on the rug following {poss} lead without directing (“Ooh, you made a garage for the elephant!”).',
                why: 'When toddlers feel fully seen upfront, they stop tugging your sleeve for attention.',
              },
              {
                timeOrCue: 'Step 3 · Fade',
                label: 'Calm Step Back',
                title: 'Announce calmly while staying visible nearby',
                desc: '“I’m going to sit right here on the couch and sip my warm tea while I watch what you build next!”',
                why: 'Staying quietly nearby makes solo play feel safe rather than lonely.',
              },
              {
                timeOrCue: 'Step 4 · Protect',
                label: 'Don’t Interrupt Flow!',
                title: 'Hold your praise while {name} is deeply focused',
                desc: 'Resist calling out “Good job! What color is that block?!”, interjecting breaks deep concentration right as executive function is wiring!',
                why: 'Uninterrupted absorption builds the exact attention muscle needed for school years later.',
              },
            ],
          },
          almanacTruth:
            'A cardboard box and ten wooden blocks build far stronger imagination and focus than flashing toys. Give 3 phone-free minutes to spark play, step back calmly nearby, and never interrupt deep concentration.',
          scienceDeepDive:
            'Around 24 months, prefrontal-temporal symbolic representation emerges, enabling object substitution (using a block as a phone or box as a car), a core precursor of abstract language and executive self-regulation. Protecting uninterrupted self-directed play (“flow”) directly strengthens sustained attentional control.',
          beat3Kicker: 'Stepping out of the cruise-director role',
          beat3Title: 'When {name} protests the second you stand up',
          rehearsalTriggerSpeaker: '{Name} tugging your sleeve as you step toward your coffee',
          rehearsalTriggerQuote: '“NO! STAY ON THE RUG! YOU BUILD THE TOWER FOR ME!”',
          rehearsalPrompt: 'Which caring habit accidentally keeps {name} dependent on you to play?',
          instincts: [
            {
              id: 'buildit',
              label:
                'Sit back down and build an impressive castle yourself while {name} watches.',
              whyTitle: 'Why stepping back builds real confidence',
              whyText:
                'When adults do the heavy building, toddlers stay spectators, staying warmly nearby while handing back the steering wheel wakes up {poss} own creativity!',
            },
            {
              id: 'slipaway',
              label:
                'Distract {obj} and sneak silently into another room.',
              whyTitle: 'Why honest visibility grows solo play faster',
              whyText:
                'Staying calmly visible at first (“I’m right here folding socks, show me when your bridge is ready!”) proves independent play doesn’t mean disconnection.',
            },
          ],
          calmScriptPlain:
            '“You love building with me! I’m going to sit right here with my warm tea while your busy hands decide what goes on top. I can’t wait to peek at what you invent!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'warm',
              text: 'You love building with me!',
              tag: 'Warm Validation',
              note: 'Honors {poss} desire for closeness so stepping back never feels like rejection.',
            },
            { text: ' ' },
            {
              id: 'stay',
              text: 'I’m going to sit right here with my warm tea',
              tag: 'Calm Anchor Nearby',
              note: 'Normalizes parents having brief restful moments too, a healthy lifelong boundary.',
            },
            { text: ' ' },
            {
              id: 'handback',
              text: 'while your busy hands decide what goes on top. I can’t wait to peek at what you invent!',
              tag: 'Hands Back Agency',
              note: 'Signals deep confidence in {possessive} own ideas, watch {obj} slowly reach for the next block!',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Pair 2 contrasting open-ended sets (blocks + animals)',
            'Stay silent during focused concentration',
            'Start with 5-minute stretches and grow gradually',
          ],
          pushbacks: [
            {
              id: 'knocks',
              label: '“{Pronoun} just knocks the blocks down and laughs instead of building!”',
              setup:
                'Knocking down towers IS authentic cause-and-effect and frustration-resilience play at age 2:',
              script:
                '“Crash! Timber! Knocking down and rebuilding three blocks high is peak age-2 engineering, let {obj} lead!”',
            },
            {
              id: 'fivesec',
              label: '“{Pronoun} lasts maybe 2 minutes alone right now”',
              setup:
                'Two minutes is a real starting rep! Celebrate silently and build toward 5, then 10, then 20 over two weeks:',
              script:
                '“Independent play is a muscle, 2 minutes today becomes 15 minutes next month when we leave simple open-ended setups out.”',
            },
          ],
          advisorPrompt:
            '“Give me 5 zero-cost ‘play invitations’ (using wooden blocks, cardboard boxes, cups, or toy animals) to spark 15 minutes of independent play for {name} ({age}).”',
          beat4Kicker: 'Tomorrow morning’s coffee lifeline',
          beat4Title: 'Pick one independent-play spark to try tomorrow',
          beat4Lead:
            'One tiny setup tonight means a hot cup of morning coffee tomorrow.',
          moves: [
            {
              id: 'bridgeinvite',
              title: 'Set out one 10-second “Play Invitation” before breakfast',
              desc: 'Leave 8 blocks + 2 toy animals or a cardboard shipping box + crayons sitting clearly on an uncluttered rug.',
            },
            {
              id: 'sparkfade',
              title: 'Practice “3 Minutes In → Calm Step Back” once tomorrow',
              desc: 'Play warmly for 3 minutes, then sit nearby with your coffee while staying quietly available.',
            },
            {
              id: 'holdpraise',
              title: 'Notice deep focus and stay blissfully silent',
              desc: 'When {name} is whispering to a block or lining up animals, resist breaking the spell with questions.',
            },
          ],
          closingNote:
            'Stepping back to sip a warm cup of coffee while {name} turns a shipping box into a boat isn’t lazy parenting, it is giving {possessive} imagination the oxygen it needs to soar.',
          pocketInsight:
            'Leave 1–2 uncluttered open-ended setups (blocks + animals or a cardboard box), spark warmly for 3 minutes, step back calmly nearby, and protect quiet focus.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Why does pausing on ONE illustration to ask a curious question build 3x more vocabulary than reading the whole book fast?”',
            title: 'Turning Bedtime Stories Into Vocabulary & Empathy Gold',
            targetSlug: 'older-toddler-daily-story-immersion',
          },
          interactiveHighlights: ['Spark & Fade Rhythm', 'Open-Ended Play Guide'],
        },
      },
      {
        slug: 'older-toddler-daily-story-immersion',
        title: 'Turning Bedtime Stories Into Vocabulary & Empathy Gold',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Dialogic reading · Chatting INSIDE the pictures',
          headline: 'Turning Bedtime Stories Into Vocabulary & Empathy Gold',
          deck: 'Why skipping half the printed words to wonder aloud about the pictures (“Whoa, look at that bear’s worried eyebrows!”) supercharges language and emotional intelligence.',
          sceneTime: '7:15 PM · STORYTIME LAMP',
          sceneBody:
            'You are reading the exact same bedtime truck book for the fortieth night straight, and {name} keeps pointing at one tiny mouse in the corner before you finish the page. *Good news: stopping the text to follow that tiny mouse is literally the highest-impact reading habit in early childhood research!*',
          pollQuestion: 'Does {name} ask for the exact same book ten nights in a row (or skip pages fast)?',
          pollOptions: [
            {
              id: 'repeat',
              label: 'Yes, I have memorized every single syllable!',
              response:
                'Repetition is pure brain gold at age 2! Knowing what comes next frees up working memory so {name} can absorb deeper new words and notice tiny emotional details.',
            },
            {
              id: 'wiggly',
              label: '{Pronoun} flips pages too fast to finish sentences!',
              response:
                'Total win, you don’t even have to read the printed text! Just chatting warmly about whatever picture catches {poss} eyes builds just as much vocabulary.',
            },
          ],
          beat2Kicker: 'Inside {possessive} story brain',
          beat2Title: 'The 3-step “Dialogic Reading” conversation loop',
          beat2Lead:
            'Reading TO a toddler is great; chatting WITH a toddler inside the pictures multiplies vocabulary and empathy dramatically. Tap the 3 effortless moves below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat Interactive Storytime loop',
          visualStageHint: 'Tap each beat to turn any board book into rich dialogue',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Pause & follow {poss} finger',
                label: 'Follow the Point',
                quote: '“Ooh, you spotted that tiny mouse hiding under the wheel!”',
                desc: 'Drop the race to reach the back cover, pause right on whichever silly detail {name} points at.',
                brainNote: 'Joint visual focus primes memory circuits immediately.',
              },
              {
                stepNum: '02',
                actor: 'Wonder about feelings',
                label: 'Name the Heart',
                quote: '“Look at the bear’s face, how do you think he feels when his ice cream dropped?”',
                desc: 'Linking character facial expressions to feeling words (disappointed, surprised, proud, nervous) wires early empathy safely.',
                brainNote: 'Exercises emerging Theory of Mind, understanding others’ inner worlds.',
              },
              {
                stepNum: '03',
                actor: 'Connect to {poss} life',
                label: 'Bridge to Today',
                quote: '“Remember when your banana broke this morning? Just like Little Bear!”',
                desc: 'Linking a storybook moment to {possessive} real day turns a 2-minute book into personal emotional processing.',
                brainNote: 'Integrates narrative memory with real-world emotional regulation.',
              },
            ],
          },
          almanacTruth:
            'You never have to finish every printed word on the page. Pausing to wonder aloud about a character’s feelings and connecting the story to {possessive} own day builds twice the vocabulary and empathy.',
          scienceDeepDive:
            'Dialogic reading meta-analyses (Whitehurst et al.; Mol et al.) demonstrate that interactive picture-book conversations, open-ended prompts, emotion labeling, and personal narrative bridges, produce substantially larger gains in expressive vocabulary and socio-emotional comprehension than passive verbatim reading.',
          beat3Kicker: 'Relaxing into joyful reading',
          beat3Title: 'When {name} flips backward, bounces, or begs for the same book again',
          rehearsalTriggerSpeaker: '{Name} flipping straight back to page 3 for the sixth time',
          rehearsalTriggerQuote: '“AGAIN! READ THE MUD PAGE AGAIN!”',
          rehearsalPrompt: 'Which subtle adult habit turns cozy storytime stiff?',
          instincts: [
            {
              id: 'drill',
              label:
                'Turn every page into an academic flashcard test: “What color is the truck? Count the ducks! Find letter B!”',
              whyTitle: 'Why cozy wondering beats pop-quizzes',
              whyText:
                'Quizzing turns beloved stories into tests. Wondering aloud (“Whoa, that truck got SO muddy. I wonder how it’ll get clean?”) invites real creative thinking and joy.',
            },
            {
              id: 'forcefinish',
              label:
                'Hold the pages flat insisting “No, sit still until Mommy finishes every word from start to finish!”',
              whyTitle: 'Why following {poss} pace builds lifelong readers',
              whyText:
                'Letting a wiggly 2-year-old bounce on the rug while listening or skip to {poss} favorite mud page teaches {obj} that books feel like pure joy!',
            },
          ],
          calmScriptPlain:
            '“You love the squishy mud page! Look at the puppy’s silly wet ears. I wonder if he feels cold or giggly? Remember splashing in puddles after the rain?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'joy',
              text: 'You love the squishy mud page! Look at the puppy’s silly wet ears',
              tag: 'Rich Descriptive Words',
              note: 'Slipping in juicy words like “squishy,” “soggy,” or “enormous” organically stretches vocabulary.',
            },
            { text: ', ' },
            {
              id: 'empathy',
              text: 'I wonder if he feels cold or giggly?',
              tag: 'Empathy Wonder',
              note: 'Open wondering with zero right/wrong pressure sparks rich imagination.',
            },
            { text: ' ' },
            {
              id: 'bridge',
              text: 'Remember splashing in puddles after the rain?',
              tag: 'Life Bridge',
              note: 'Connects books straight to {possessive} own cherished memories.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Pause before rhyming words so {name} fills them in',
            'Name character emotions (“surprised,” “frustrated,” “proud”)',
            'Wiggly bodies can still listen happily on the rug!',
          ],
          pushbacks: [
            {
              id: 'walksaway',
              label: '“{Name} wanders around playing with blocks while I read”',
              setup:
                'Keep reading warmly for two more minutes! Toddlers’ ears absorb rich story language even while their hands stay busy:',
              script:
                '“Moving bodies still have wide-open listening ears, keep your warm voice flowing for a page or two without forcing stillness.”',
            },
            {
              id: 'samestory',
              label: '“I’m honestly losing my mind reading ‘Goodnight Truck’ 300 times”',
              setup:
                'Keep the beloved favorite AND freshen it for yourself by hunting one new background detail together each night:',
              script:
                '“Tonight let’s read our favorite truck book, and see if we can spot every single bird hiding in the sky!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) loves [favorite topic], recommend 5 engaging picture books that spark emotional vocabulary and giggles for ages 2–3.”',
          beat4Kicker: 'Tonight’s storytime upgrade',
          beat4Title: 'Pick one playful reading twist tonight',
          beat4Lead:
            'Two extra pauses tonight turn any 3-minute book into pure connection.',
          moves: [
            {
              id: 'rhymewait',
              title: 'Pause right before one familiar rhyming word tonight',
              desc: 'Drop your voice and raise your eyebrows, let {name} triumphantly shout out the missing word!',
            },
            {
              id: 'facecheck',
              title: 'Point to ONE character’s face and name their feeling',
              desc: '“Ooh, look at Bear’s eyebrows, he looks frustrated!” Builds empathy vocabulary naturally.',
            },
            {
              id: 'lifelink',
              title: 'Connect one story page to something {name} did today',
              desc: '“Look, she’s putting on yellow boots, just like you wore to the park!”',
            },
          ],
          closingNote:
            'Even if {name} insists on the same battered truck book fifty nights straight, your cozy voice beside {poss} shoulder is doing quiet magic, turning ink and paper into warmth, language, and empathy.',
          pocketInsight:
            'Skip the pop-quiz! Follow {possessive} pointing finger, pause before favorite rhymes, name one character emotion, and link the page to {possessive} real day.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“Why does forcing a 2-year-old to ‘share nicely!’ actually create MORE toy grabbing, and what works at playdates instead?”',
            title: 'Playdates at Age Two: Navigating Toy Grabbing & First Friends',
            targetSlug: 'older-toddler-parallel-to-cooperative-play',
          },
          interactiveHighlights: ['Dialogic Story Loop', 'Empathy Wondering'],
        },
      },
      {
        slug: 'older-toddler-parallel-to-cooperative-play',
        title: 'Playdates at Age Two: Navigating Toy Grabbing & First Friends',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Age 2 playdates · Side-by-side & protected turns',
          headline: 'Playdates at Age Two: Navigating Toy Grabbing & First Friends',
          deck: 'Why 2-year-olds aren’t being “selfish” when they guard a truck, and how protecting turns instead of forcing sharing builds genuine generosity faster.',
          sceneTime: '10:20 AM · LIVING ROOM PLAYDATE',
          sceneBody:
            'A friend reaches for the dump truck {name} is actively rolling. {Name} hugs it to {poss} chest shouting *“MINE!!”* Both parents tense up awkwardly, feeling the pressure to say *“Share with your friend right now!”* *Wait, what if protecting turns actually raises a MORE generous child?*',
          pollQuestion: 'Do toddler playdates make you tense over toy grabbing and “MINE!”?',
          pollOptions: [
            {
              id: 'awkward',
              label: 'Yes, I never know when to step in vs. stay back!',
              response:
                'Every toddler parent feels that playdate spotlight! Knowing two simple facts, parallel play is normal at age 2, and “turn-taking” beats forced sharing, makes playdates breezy.',
            },
            {
              id: 'selfish',
              label: 'I worry {name} seems selfish compared to other kids',
              response:
                'Zero selfishness! At age two, toddlers literally don’t have the brain hardware to share on command yet, and forcing them to hand over active toys makes them cling tighter.',
            },
          ],
          beat2Kicker: 'Inside {possessive} developing social brain',
          beat2Title: 'Flip the lens on “MINE!” and forced sharing',
          beat2Lead:
            'Imagine someone grabbing your phone mid-text saying “Share nicely!” That’s how forced sharing feels at age 2. Flip the lens and explore the 4 stages of social play below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: '“Selfish” lens vs. age-2 social brain lens',
          visualStageHint: 'Flip both lenses, then tap age milestones 1 to 12 below',
          visualConfig: {
            adultLabel: 'Social-etiquette lens',
            adultQuote: '“Oh no, {name} yelled MINE! People will think {pronoun}’s selfish!”',
            adultSub:
              'Adult politeness makes us want instant cheerful sharing, even when a child is right in the middle of using a toy.',
            childLabel: 'Age-2 social brain lens',
            childQuote: '“If I hand my truck over right now, will I EVER get it back?!”',
            childSub:
              'At age 2, toddlers thrive in Parallel Play (playing happily side-by-side) and learn true generosity ONLY after trusting their turn is safe!',
            exposureHeading: 'How genuine sharing develops (Months 18 → 48)',
            exposureSub: 'Tap 1 to 12 to trace the social timeline',
            totalDots: 12,
            defaultCount: 5,
            unitLabel: 'stage',
            lowMax: 4,
            midMax: 8,
            lowMsg:
              'Ages 1.5–2: Solitary & onlooker play, watching peers closely while holding tightly to favorite objects.',
            midMsg:
              'Ages 2–3: Parallel Play! Playing side-by-side with similar toys (2 shovels, 2 trucks) builds joyful friendship with minimal friction.',
            highMsg:
              'Ages 3.5–4+: Associative & Cooperative Play, true voluntary sharing and turn-taking emerge naturally once turns have been respected!',
          },
          almanacTruth:
            'Forced sharing teaches scarcity (“grab fast before someone makes me give it up!”). Protecting a child’s turn until they finish builds the safety that sparks true, voluntary generosity.',
          scienceDeepDive:
            'Developmental play research (Parten’s stages; Ross & Conant peer-conflict studies) confirms that 24-to-36-month-olds predominantly engage in parallel play and lack mature theory-of-mind reciprocity. Caregiver sportscasting paired with protected turns (“You can have it when {name} is finished”) increases voluntary prosocial sharing far more effectively than forced relinquishment.',
          beat3Kicker: 'Smooth playdate sportscasting',
          beat3Title: 'Coaching both toddlers calmly without taking sides',
          rehearsalTriggerSpeaker: 'A playdate friend reaches for {possessive} truck',
          rehearsalTriggerQuote: '“MINE!! NO!!” (Both tiny hands gripping one dump truck)',
          rehearsalPrompt: 'Which polite adult reflex accidentally teaches hoarding?',
          instincts: [
            {
              id: 'pry',
              label:
                'Pry the truck gently out of {possessive} hands: “Be a good host and share with your guest right now!”',
              whyTitle: 'Why forced sharing backfires',
              whyText:
                'When hosting means losing every toy you touch, {name} dreads playdates and starts snatching twice as fiercely to protect {poss} things.',
            },
            {
              id: 'lecture',
              label:
                'Scold “That’s not nice! Friends share!” while both toddlers start crying.',
              whyTitle: 'Why calm “sportscasting” dissolves tension in 10 seconds',
              whyText:
                'Warmly narrating both kids’ wishes (“{Name} is still using the yellow truck; Leo really wants a turn next!”) teaches real social language with zero shame.',
            },
          ],
          calmScriptPlain:
            '“{Name} is still having a turn with the dump truck right now. Leo, you really want a turn too! When {name} is all done, {pronoun} will pass it straight to you, want this blue tractor while you wait?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'protect',
              text: '{Name} is still having a turn with the dump truck right now.',
              tag: 'Protects Turn',
              note: 'Relaxes {possessive} grip instantly, feeling safe often makes {name} finish and offer the truck voluntarily 60 seconds later!',
            },
            { text: ' ' },
            {
              id: 'empathy',
              text: 'Leo, you really want a turn too!',
              tag: 'Sees the Friend',
              note: 'Models empathy aloud for BOTH kids without making either child the villain.',
            },
            { text: ' ' },
            {
              id: 'wait',
              text: 'When {name} is all done, {pronoun} will pass it straight to you, want this blue tractor while you wait?',
              tag: 'Teaches Turn-Taking',
              note: 'Replaces “share now!” with real-world waiting and voluntary passing.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Tuck 1–2 super-precious loveys away before guests arrive',
            'Put out multiples (2 shovels, big bin of blocks, bubbles)',
            'Sportscast calmly instead of judging',
          ],
          pushbacks: [
            {
              id: 'grabbed',
              label: '“{Name} was the one who snatched a toy straight out of a friend’s hand”',
              setup:
                'Stay calm and neutral, hand the toy back gently and give {name} the exact words to ask:',
              script:
                '“Oops, Maya was still using that shovel! Let’s hand it right back and say, ‘Can I have a turn when you’re done?’”',
            },
            {
              id: 'otherparent',
              label: '“The other parent looks awkward when I don’t force sharing”',
              setup:
                'Smile warmly and share the script aloud, almost every parent breathes a huge sigh of relief hearing it:',
              script:
                '“We’re practicing ‘waiting for a turn’, they usually pass it over way faster on their own when nobody grabs it away!”',
            },
          ],
          advisorPrompt:
            '“We’re hosting a playdate for {name} ({age}) this weekend, what 4 low-conflict parallel play setups (like water tables or chalk) keep everyone happy?”',
          beat4Kicker: 'Your next breezy playdate',
          beat4Title: 'Pick one playdate peace-maker this week',
          beat4Lead:
            'A two-minute setup before friends knock eliminates 90% of toy tears.',
          moves: [
            {
              id: 'specialbin',
              title: 'Let {name} tuck 2 “special non-sharing toys” in the closet before guests arrive',
              desc: 'Honoring {poss} favorite lovey or truck upfront makes {obj} way more relaxed about everything else on the rug.',
            },
            {
              id: 'parallel',
              title: 'Set out “many-piece” parallel play materials',
              desc: 'Chalk, bubbles, playdough, big blocks, or two buckets of water let toddlers play side-by-side without fighting over one object.',
            },
            {
              id: 'turnphrase',
              title: 'Swap “Share nicely!” for “You can have it when {name} is finished!”',
              desc: 'Watch in amazement when {name} voluntarily hands the truck over 90 seconds later!',
            },
          ],
          closingNote:
            'Watching two toddlers hold onto two separate buckets side-by-side isn’t a failed playdate, it is how early friendship actually looks. Protect their turns, sportscast warmly, and watch true generosity bloom right on schedule.',
          pocketInsight:
            'Skip forced sharing at age 2. Tuck 2 precious toys away before playdates, set out parallel-play multiples, and protect turns until finished (“You’re next when {name} is done”).',
          nextEpisodeHook: null,
          interactiveHighlights: ['Social Play Timeline', 'Playdate Sportscast Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 15: Calm Shows, Audio Stories & Screen Peace (3 Episodes: 1 Cut/Folded)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'digital-older-toddler-audiobooks-and-co-viewing',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    title: 'Calm Shows, Audio Stories & Screen Peace',
    reliefSubtitle:
      'Pick slow-paced shows that don’t leave toddlers wired, replace afternoon cartoons with audio stories, and make occasional co-viewing joyful',
    tonightQuickWinTitle: 'Episode 1: Why Some Shows Leave {Name} Wired (And How to Pick Calm Ones)',
    summary:
      'Spot the rapid scene-cut trap in modern kids’ cartoons using a 2-minute pacing audit, build screen-free quiet time with toddler audiobooks, and turn occasional shared viewing into rich conversation.',
    coverImageUrl: 'https://assets.alongside.care/academy/digital-older-toddler.png',
    sortOrder: 3,
    episodes: [
      {
        slug: 'older-toddler-slow-paced-media-audit',
        title: 'Why Some Shows Leave {Name} Wired (And How to Pick Calm Ones)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: '2-minute cut test · Calm pacing keeps calm moods',
          headline: 'Why Some Shows Leave {Name} Wired (And How to Pick Calm Ones)',
          deck: 'Not all 15-minute shows hit {possessive} brain the same, run the 60-second “Scene-Cut Count” to trade frantic zombie-trance cartoons for calm stories.',
          sceneTime: '4:30 PM · RIGHT AFTER A CARTOON',
          sceneBody:
            '{Name} watched 15 minutes of a neon high-speed cartoon while you answered emails. The moment it finishes, {pronoun} seems strangely cranky, impulsive, and wired, yet yesterday after 15 minutes of a gentle slow-paced show, {pronoun} wandered right off to play with blocks calmly. *Why the night-and-day difference?*',
          pollQuestion: 'Have you noticed certain kids’ shows turn {name} noticeably crankier afterward?',
          pollOptions: [
            {
              id: 'yes',
              label: 'YES, certain YouTube shows flip a cranky switch!',
              response:
                'You’re not imagining it! Pediatric experiments proved just 9 minutes of hyper-fast scene cuts temporarily drains toddler self-control, while calm, slow shows leave moods totally steady.',
            },
            {
              id: 'curious',
              label: 'Want an easy rule to pick better shows',
              response:
                'The 60-second “4-Second Scene-Cut Test” below lets you vet any show in one glance, no endless parent blog lists needed!',
            },
          ],
          beat2Kicker: 'Inside {possessive} orienting reflex',
          beat2Title: 'Fast-cut hyper-cartoons vs. calm storytelling',
          beat2Lead:
            'Every time a camera angle flashes or a sound effect pops, {possessive} ancient survival reflex jerks attention automatically, exhausting {poss} tiny impulse-control battery! Flip the lens and test pacing below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Hyper-fast cuts vs. calm real-world pacing',
          visualStageHint: 'Flip both lenses, then tap scene-cut speed (1–10 sec)',
          visualConfig: {
            adultLabel: 'Fast-cut cartoon (2–3 sec cuts)',
            adultQuote: '“Neon colors, frantic camera zooms, giggling sound effects every 2 seconds!”',
            adultSub:
              'Engineered to hold toddler eyeballs through involuntary orienting reflexes, leaving executive brakes drained the second it turns off.',
            childLabel: 'Calm slow show (6–10+ sec shots)',
            childQuote: '“Soft muted colors, natural human voices, gentle pauses so my brain keeps up!”',
            childSub:
              'Feels like a calm moving picture book, gives {name} room to notice emotions, follow a plot, and walk away regulated.',
            exposureHeading: 'The 60-Second Pacing Test (seconds per camera cut)',
            exposureSub: 'Count “1-Mississippi…” between camera cuts; tap 1 to 10 below',
            totalDots: 10,
            defaultCount: 6,
            unitLabel: 'sec/cut',
            lowMax: 3,
            midMax: 5,
            lowMsg:
              '1–3 seconds per cut: Hyper-stimulating! Rapid cuts hijack attention reflexes and predict post-show crankiness, quietly swap these out.',
            midMsg:
              '4–5 seconds per cut: Moderate pace, fine occasionally, especially if sound levels are gentle and plots stay grounded.',
            highMsg:
              '6–10+ seconds per cut: Gold-standard slow media! Soft palette, real-world dialogue, calm transitions (like classic slow picture-book shows).',
          },
          almanacTruth:
            'Just nine minutes of hyper-fast cartoons can temporarily drain a toddler’s self-control battery. Count seconds between scene cuts: if shots hold 5+ seconds with soft colors and calm voices, post-show transitions stay peaceful.',
          scienceDeepDive:
            'In a landmark University of Virginia randomized trial (Lillard & Peterson, Pediatrics), 4-year-olds who watched just 9 minutes of fast-paced fantastical animation scored significantly lower on immediate executive-function and impulse-control tasks than children who watched slow-paced realistic media or drew quietly, driven by continuous orienting-reflex fatigue.',
          beat3Kicker: 'Upgrading the playlist cleanly',
          beat3Title: 'Retiring an overstimulating favorite show without drama',
          rehearsalTriggerSpeaker: '{Name} begging for the hyper-fast YouTube show',
          rehearsalTriggerQuote: '“WANT SURPRISE-EGG VIDEO!! PUT IT ON!!”',
          rehearsalPrompt: 'Which reaction makes retiring a frantic show ten times harder?',
          instincts: [
            {
              id: 'debate',
              label:
                'Argue back: “That show turns your brain to mush and makes you act terrible!”',
              whyTitle: 'Why insulting {poss} favorite show sparks defense',
              whyText:
                'Quietly uninstalling the hyper-fast app or making a crisp curated watchlist works infinitely better than debating YouTube algorithms with a 2-year-old.',
            },
            {
              id: 'openyt',
              label:
                'Hand over the open YouTube homepage full of bright thumbnails to browse.',
              whyTitle: 'Why thumbnail scrolling creates instant overwhelm',
              whyText:
                'Open feeds are built to pull tiny fingers endlessly, always pre-pick 2–3 calm, slow shows on a curated profile (or PBS Kids / downloaded episodes).',
            },
          ],
          calmScriptPlain:
            '“That fast show isn’t on our TV anymore, it feels too bumpy for cozy bodies! Today our calm choices are Trash Truck or Puffin Rock, which one sounds fun?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'gone',
              text: 'That fast show isn’t on our TV anymore, it feels too bumpy for cozy bodies!',
              tag: 'Clean Finality',
              note: 'Warm, calm, matter-of-fact, zero shaming of {name} for liking bright videos.',
            },
            { text: ' ' },
            {
              id: 'two',
              text: 'Today our calm choices are Trash Truck or Puffin Rock, which one sounds fun?',
              tag: 'Curated 2-Choice',
              note: 'Channels autonomy straight into two parent-approved slow-paced gems.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Count camera cuts for 30 seconds before approving a show',
            'Skip open YouTube thumbnail browsing completely',
            'Keep volume gentle and colors calm',
          ],
          pushbacks: [
            {
              id: 'examples',
              label: '“What does a truly calm, slow-paced show look like?”',
              setup:
                'Look for muted watercolor palettes, gentle acoustics, everyday themes (friendship, feelings, nature), and shots lasting 5–10 seconds:',
              script:
                '“Think slow picture-book pacing, gentle nature stories, calm truck adventures, or quiet everyday family shows with zero flashing confetti.”',
            },
            {
              id: 'criesfast',
              label: '“{Pronoun} cried for 5 minutes missing the old fast show”',
              setup:
                'Totally expected for 2 days while the hyper-stimulus fades, within a week {pronoun} will forget it ever existed:',
              script:
                '“It’s okay to miss that bright show. We’re picking calm cozy stories for our house now, want to cuddle while we start this gentle one?”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) gets wired and cranky after fast cartoons, recommend 6 genuinely calm, slow-paced shows (low stimulation, gentle voices) for ages 2–3.”',
          beat4Kicker: 'Your 2-minute media refresh',
          beat4Title: 'Pick one calm-curation upgrade today',
          beat4Lead:
            'Curating 3 gentle shows once saves months of post-TV meltdowns.',
          moves: [
            {
              id: 'cuttest',
              title: 'Run the 30-second Scene-Cut Test on {possessive} current favorite show',
              desc: 'Count seconds between camera jumps, swap out anything flashing faster than every 3 seconds.',
            },
            {
              id: 'blockyt',
              title: 'Remove open YouTube browsing from {possessive} viewing routine',
              desc: 'Create a tiny curated shortlist of 3 slow-paced shows so {name} chooses safely between calm winners.',
            },
            {
              id: 'shortcap',
              title: 'Keep viewing to one single 15–20 minute episode (never endless loops)',
              desc: 'One complete story with a clear beginning and end makes turning off peaceful.',
            },
          ],
          closingNote:
            'You don’t need a guilt-ridden zero-screen fortress to protect {possessive} nervous system. Swapping frantic 2-second cuts for calm, slow picture-book stories transforms how {name} feels the moment the screen goes dark.',
          pocketInsight:
            'Run the 4-second Scene-Cut Test: retire hyper-fast shows and open YouTube browsing, and curate 2–3 calm, slow-paced shows with muted colors and gentle voices.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“How can a screen-free audio story box give you 30 calm afternoon minutes while lighting up {possessive} imagination?”',
            title: 'Audio Stories: Screen-Free Quiet Time That Actually Works',
            targetSlug: 'older-toddler-audio-stories-routine',
          },
          interactiveHighlights: ['Scene-Cut Pacing Test', 'Curated Swap Script'],
        },
      },
      {
        slug: 'older-toddler-audio-stories-routine',
        title: 'Audio Stories: Screen-Free Quiet Time That Actually Works',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Audio stories · Pictures built inside {poss} own mind',
          headline: 'Audio Stories: Screen-Free Quiet Time That Actually Works',
          deck: 'Why screen-free audio stories (via a simple Bluetooth speaker, Yoto, or Toniebox) fire up imagination, and buy you 30 calm minutes during car rides and dinner prep.',
          sceneTime: '5:00 PM · THE DAILY ENERGY WALL',
          sceneBody:
            'You are exhausted, dinner needs chopping, and turning on TV feels like the only way to keep {name} settled for twenty minutes. Instead, you press play on a warm 12-minute audio story beside a basket of trucks, and watch {obj} play quietly while picturing every character inside {poss} own head.',
          pollQuestion: 'Have you tried screen-free audio stories or kids’ podcasts with {name} yet?',
          pollOptions: [
            {
              id: 'notyet',
              label: 'Not yet, will a 2-year-old really listen without pictures?',
              response:
                'Yes, when paired with busy hands (drawing, blocks, snack, or car seat)! Start with short 3-to-5-minute musical stories or books {name} already knows by heart.',
            },
            {
              id: 'love',
              label: 'Yes, we already have a speaker or story player!',
              response:
                'Audio listening is a secret superpower for ages 2–8: pairing audio with quiet rest or dinner prep builds vivid mental imagery with zero screen meltdowns.',
            },
          ],
          beat2Kicker: 'Why audio fires up the visual brain',
          beat2Title: 'Installing the 4-step Audio Quiet-Time habit',
          beat2Lead:
            'Functional MRI scans show listening to stories activates the brain’s visual-imagination network FAR harder than watching cartoons, because {name} has to paint the pictures {obj}self! Tap the 4 easy steps below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'Launching screen-free Audio Story time',
          visualStageHint: 'Tap each step to make audio stories click at age 2',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Step 1 · Familiar',
                label: 'Start With Known Stories',
                title: 'Begin with songs or stories {name} already knows',
                desc: 'Pair an audio recording of a beloved board book right beside the physical book, or start with 4-minute rhythmic musical stories.',
                why: 'Familiar stories hook a 2-year-old’s ears effortlessly on day one.',
              },
              {
                timeOrCue: 'Step 2 · Hands',
                label: 'Pair With Busy Hands',
                title: 'Audio + quiet hands = instant magic',
                desc: 'Toddlers rarely sit motionless staring at a speaker! Pair stories with stickers, wooden blocks, playdough, bath time, or a cozy car seat.',
                why: 'Keeps wiggly bodies grounded while ears soak in rich vocabulary.',
              },
              {
                timeOrCue: 'Step 3 · Control',
                label: 'Tactile Autonomy',
                title: 'Simple screen-free speaker (or dedicated kid player)',
                desc: 'Whether a basic Bluetooth speaker out of reach or a kid-controlled audio box (Yoto/Toniebox/CD player), zero glowing glass keeps attention calm.',
                why: 'Zero autoplay thumbnails and zero blue light, safe even right before sleep!',
              },
              {
                timeOrCue: 'Step 4 · Anchor',
                label: 'Daily Habit Slot',
                title: 'Attach audio to ONE reliable daily moment',
                desc: 'Use audio stories every afternoon during car rides, 4:30 PM quiet rest, or 5:15 PM dinner prep.',
                why: 'Predictable cues turn audio into a beloved cozy ritual, no TV begging!',
              },
            ],
          },
          almanacTruth:
            'Audio stories make {possessive} brain paint its own pictures, building rich vocabulary, imagination, and calm 20-minute quiet windows with zero screen-off meltdowns.',
          scienceDeepDive:
            'Pediatric fMRI studies (Hutton et al., Cincinnati Children’s Hospital) comparing audio-only narration, illustrated books, and animated video found that audio narration recruited stronger language-to-visual-imagery functional connectivity than passive cartoons, while avoiding blue-light melatonin suppression and rapid-cut attention fatigue.',
          beat3Kicker: 'Making the switch smoothly',
          beat3Title: 'When {name} asks to WATCH a show instead of listening',
          rehearsalTriggerSpeaker: '{Name} pointing at the dark TV during dinner prep',
          rehearsalTriggerQuote: '“NO MUSIC! I WANT WATCH TV!!”',
          rehearsalPrompt: 'Which reaction drops the audio experiment too fast?',
          instincts: [
            {
              id: 'quit',
              label:
                '“Ugh, {pronoun} hates audiobooks, guess I’ll just turn the cartoon back on.”',
              whyTitle: 'Why pairing audio with a fun visual prop changes everything',
              whyText:
                'Audio feels unfamiliar for the first three minutes! Handing {obj} the matching picture book or 3 toy animals to act out the story makes {obj} lean right in.',
            },
            {
              id: 'toolong',
              label:
                'Put on a slow 30-minute chapter book meant for 6-year-olds.',
              whyTitle: 'Why short, lively 4-minute stories win at age 2',
              whyText:
                'Start with lively voices, gentle sound effects, and 3-to-5-minute tracks, attention stretches naturally to 20 minutes over a few weeks.',
            },
          ],
          calmScriptPlain:
            '“TV is resting while dinner cooks, but our cozy Story Speaker is awake! Want the silly frog song story or the firetruck adventure while you sticker this page?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'tvrest',
              text: 'TV is resting while dinner cooks, but our cozy Story Speaker is awake!',
              tag: 'Warm Swap',
              note: 'Frames audio as a cozy, exciting privilege rather than a boring consolation prize.',
            },
            { text: ' ' },
            {
              id: 'choose',
              text: 'Want the silly frog song story or the firetruck adventure while you sticker this page?',
              tag: 'Choice + Busy Hands',
              note: 'Two fun options plus immediate tactile activity hook curiosity right away.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Pair audio with blocks, stickers, or snack',
            'Start with 3–5 minute musical stories',
            'Car rides are the easiest place to start!',
          ],
          pushbacks: [
            {
              id: 'expensive',
              label: '“Do I have to buy an expensive kid audio player?”',
              setup:
                'Not at all! Any $15 Bluetooth speaker paired with free library audio apps (Libby/Hoopla) or kids’ story podcasts works identically:',
              script:
                '“Stream a free toddler story podcast from your phone onto a counter speaker (phone tucked out of sight), zero cost, same calm magic!”',
            },
            {
              id: 'bedaudio',
              label: '“Can {name} listen to a calm story while falling asleep?”',
              setup:
                'Gentle, sleepy audio stories or lullaby tracks with zero glowing screen are awesome for winding down busy 2-year-old minds:',
              script:
                '“Set a 15-minute sleep timer on calm bedtime audio, keeps imaginations cozy and eyes happily heavy.”',
            },
          ],
          advisorPrompt:
            '“Recommend 5 engaging, gentle audio story podcasts or recordings specifically paced for a {ageShort} (3–8 minutes each) we can play during car rides or dinner prep.”',
          beat4Kicker: 'Today’s screen-free magic',
          beat4Title: 'Pick one audio-story moment to test this week',
          beat4Lead:
            'Try it on your very next car ride or 5 PM kitchen crunch.',
          moves: [
            {
              id: 'carstory',
              title: 'Play one 5-minute toddler story on your next car ride',
              desc: 'Captive cozy car seats are the easiest place for toddlers to fall in love with audio storytelling.',
            },
            {
              id: 'bookaudio',
              title: 'Pair a short audio story with crayons, blocks, or a matching board book',
              desc: 'Give {poss} hands something light to do while {poss} imagination wakes up.',
            },
            {
              id: 'recordvoice',
              title: 'Record a 2-minute voice memo of YOU (or Grandma!) reading a favorite book',
              desc: 'Toddlers adore hearing familiar loved voices tell a story while you cook dinner!',
            },
          ],
          closingNote:
            'The first afternoon you glance over from the stove and see {name} quietly moving wooden animals along to a cozy audio story, you will wonder how you ever lived without this screen-free gem.',
          pocketInsight:
            'Trade afternoon cartoons for screen-free audio stories: start with short 3–5 min musical stories, pair with busy hands (stickers/blocks/car seat), and try recording Grandma’s voice!',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“When you DO sit down to watch 15 minutes of a calm show together, how can three tiny questions double {possessive} emotional learning?”',
            title: 'Turning Occasional Screen Time Into Shared Connection',
            targetSlug: 'older-toddler-co-viewing-dialogue',
          },
          interactiveHighlights: ['4-Step Audio Setup', 'DIY Voice-Memo Story'],
        },
      },
      {
        slug: 'older-toddler-co-viewing-dialogue',
        title: 'Turning Occasional Screen Time Into Shared Connection',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Side-by-side co-viewing · Turning passive into shared',
          headline: 'Turning Occasional Screen Time Into Shared Connection',
          deck: 'How turning occasional cozy screen time into a shared “cuddle-and-wonder” moment builds empathy, teaches real-life coping, and makes turning off effortless.',
          sceneTime: '4:15 PM · RAINY SUNDAY COUCH',
          sceneBody:
            'Rain taps the living-room window while you curl under a blanket watching one gentle 12-minute episode about a puppy nervous for a haircut. You pause softly to whisper *“Ooh, his belly feels butterflies, what helps him feel brave?”* {Name} lights up answering, and when the episode ends, {pronoun} happily hops down to play “barbershop” with {poss} teddy bear.',
          pollQuestion: 'Do you ever watch a short favorite show side-by-side with {name}?',
          pollOptions: [
            {
              id: 'sometimes',
              label: 'Yes, cozy couch time on rainy afternoons!',
              response:
                'Research calls this Active Co-Viewing, and it transforms screens from isolating background noise into genuine social-emotional learning and warm family memory.',
            },
            {
              id: 'solo',
              label: 'Usually screens are my break to get chores done',
              response:
                'And that is 100% okay too! Even just hopping in for the final 2 minutes to ask ONE warm question (“What was your favorite part?”) bridges the screen smoothly back to real life.',
            },
          ],
          beat2Kicker: 'Making shared media count',
          beat2Title: 'The 3-beat Co-Viewing Connection loop',
          beat2Lead:
            'When you occasionally share a calm show together, or simply join for the final two minutes, three light prompts turn a cartoon into real emotional wisdom. Tap below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat Active Co-Viewing loop',
          visualStageHint: 'Tap each beat to turn viewing into playful real-world skill',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Name a character feeling',
                label: 'Spot the Emotion',
                quote: '“Whoa, look at Tiger’s stomping feet, he looks really frustrated!”',
                desc: 'Watching characters navigate frustration, waiting, or potty learning gives {name} safe rehearsal for {poss} own big feelings.',
                brainNote: 'Builds emotional vocabulary with zero personal defensiveness.',
              },
              {
                stepNum: '02',
                actor: 'Link to real life',
                label: 'Carry Off-Screen',
                quote: '“Remember that ‘take a deep breath’ song from the show? Let’s try it with our bears!”',
                desc: 'Quoting a calm show’s coping jingle later during a real-world meltdown works like magic at age 2!',
                brainNote: 'Transfers 2D modeling into real-life prefrontal self-regulation.',
              },
              {
                stepNum: '03',
                actor: 'Play it out afterward',
                label: 'Act It Out in 3D',
                quote: '“TV goes night-night, want to pretend we’re the trash truck collecting wooden blocks?”',
                desc: 'Turning the story straight into 5 minutes of pretend play eliminates the post-screen slump completely.',
                brainNote: 'Converts passive viewing into active symbolic imagination.',
              },
            ],
          },
          almanacTruth:
            'You don’t have to co-view every minute, joining for just two warm minutes to notice a character’s feelings and carry the story into real-world pretend play multiplies the good and smooths the off-switch.',
          scienceDeepDive:
            'Multiple AAP-cited developmental studies show that active parental mediation (“co-viewing” with light emotional commentary and off-screen transfer prompts) significantly increases prosocial behavior, emotional labeling, and transfer of problem-solving strategies in children aged 2–4.',
          beat3Kicker: 'Light touch, zero lecture',
          beat3Title: 'Making the final 2 minutes of a show feel joyful',
          rehearsalTriggerSpeaker: 'Credits starting to roll on a gentle 12-minute episode',
          rehearsalTriggerQuote: '“Ooh, the puppy got his haircut and smiled!”',
          rehearsalPrompt: 'Which approach misses the easiest bridge back to real play?',
          instincts: [
            {
              id: 'yankoff',
              label:
                'Click off silently from the kitchen doorway calling “Time’s up, go play!”',
              whyTitle: 'Why a 60-second warm bridge works so much better',
              whyText:
                'Stepping over for 30 seconds to share excitement about the ending (“He was SO brave! Want to give Bear a pretend haircut now?”) pulls {name} happily right off the couch.',
            },
            {
              id: 'overtalk',
              label:
                'Pause every 20 seconds delivering a heavy moral lecture about every scene.',
              whyTitle: 'Why 1–2 light comments per episode is the sweet spot',
              whyText:
                'Keep it light and warm, just one genuine wondering comment and one playful off-screen bridge keep couch time cozy.',
            },
          ],
          calmScriptPlain:
            '“Aw, look how proud puppy looks now! Remember how he blew out a big breath when he felt nervous? TV is sleeping now, want to give Teddy a pretend haircut on the rug?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'notice',
              text: 'Aw, look how proud puppy looks now! Remember how he blew out a big breath when he felt nervous?',
              tag: 'Locks In Coping Skill',
              note: 'Plants a memorable coping tool you can borrow together before {possessive} next real haircut or doctor visit!',
            },
            { text: ' ' },
            {
              id: 'play',
              text: 'TV is sleeping now, want to give Teddy a pretend haircut on the rug?',
              tag: '3D Pretend Bridge',
              note: 'Turns the end of the episode into the launchpad for joyful real-world play.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Even joining the last 2 minutes counts!',
            'Borrow helpful show jingles during real-life tough moments',
            'Bridge straight from screen story into 3D pretend play',
          ],
          pushbacks: [
            {
              id: 'chorereal',
              label: '“What if I genuinely put a show on so I can take a shower solo?”',
              setup:
                'Zero guilt! Take your hot shower peacefully, then spend 30 warm seconds asking about the show while towel-drying your hair:',
              script:
                '“Tell me what happened while I showered! Who was silly in that episode?”',
            },
            {
              id: 'sameep',
              label: '“{Pronoun} wants to watch the exact same episode every time”',
              setup:
                'Just like favorite picture books, repeating one calm familiar episode is actually LESS stimulating and boosts comprehension more than constant novel clips!',
              script:
                '“Predictable repeated calm episodes feel safe and help {name} anticipate and absorb every social lesson.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) has a big milestone coming up (like a haircut, doctor visit, or new sibling), how can we pair a calm story/episode with pretend play to prepare?”',
          beat4Kicker: 'Your shared family media culture',
          beat4Title: 'Pick one simple co-viewing bridge this week',
          beat4Lead:
            'You are already setting the tone for open, connected digital conversations for years to come.',
          moves: [
            {
              id: 'lasttwomin',
              title: 'Join the final 2 minutes of {possessive} next show with one warm question',
              desc: 'Ask “What was your favorite funny part?” before waving bye to the screen together.',
            },
            {
              id: 'borrowjingle',
              title: 'Borrow one calm coping phrase from a favorite story in real life',
              desc: 'Sing the show’s “mad feelings / deep breath” or “try a new food” rhyme next time a bump pops up!',
            },
            {
              id: 'actout',
              title: 'Bridge straight from episode credits into 3 minutes of pretend play',
              desc: 'Grab a stuffed animal or toy truck to act out what just happened on screen.',
            },
          ],
          closingNote:
            'From the very first slow show you cuddle through together, you are showing {name} that screens aren’t solitary walls, they are small stories we enjoy together, talk about warmly, and happily turn off to live real life.',
          pocketInsight:
            'Join even the last 2 minutes of occasional calm shows: name one character emotion, borrow helpful coping jingles in real life, and launch straight into 3D pretend play.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Active Co-Viewing Loop', '3D Pretend Bridge'],
        },
      },
    ],
  }),
];
