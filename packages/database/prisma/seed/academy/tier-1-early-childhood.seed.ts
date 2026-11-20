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

export const TIER_1_EARLY_CHILDHOOD_MODULES: AcademyModuleSeedData[] = [
  // ===========================================================================
  // COURSE 16: Preschool Big Feelings, Sharing & Siblings (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'behavior-preschool-feelings',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    developmentalTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    title: 'Preschool Big Feelings, Sharing & Siblings',
    reliefSubtitle:
      'Put words to big feelings before they explode, unpack why sharing feels hard at four, end 10-excuse bedtime stalls, and coach siblings without playing judge',
    tonightQuickWinTitle: 'Episode 1: Putting Words to Big Feelings Before They Explode',
    summary:
      'Help preschoolers name intense emotions before limbs start flying, understand why perspective-taking is still growing at ages 4–6, replace bedtime stall battles with predictable visual rhythms, and guide sibling conflict with calm neutrality.',
    coverImageUrl: 'https://assets.alongside.care/academy/behavior-preschool.png',
    sortOrder: 4,
    episodes: [
      {
        slug: 'preschool-name-it-to-tame-it',
        title: 'Putting Words to Big Feelings Before They Explode',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.cup,
          illustrationCaption: '5:40 PM · Naming the storm before it spills',
          headline: 'Putting Words to Big Feelings Before They Explode',
          deck: 'Why asking “Why are you acting like this?!” escalates a four-year-old—and the four-word calm reflection that helps the emotional wave crest faster.',
          sceneTime: '5:40 PM · LIVING ROOM RUG',
          sceneBody:
            'The Lego tower tips over by one brick. Instantly {name} hurls a plastic wheel across the rug and screams that you ruined {poss} whole afternoon. *You didn’t even touch the tower—how did a three-inch block turn into a five-alarm fire?*',
          pollQuestion: 'How fast do small frustrations turn into big outbursts lately?',
          pollOptions: [
            {
              id: 'instant',
              label: 'Zero to sixty in two seconds',
              response:
                'Classic preschool wiring: between ages 4 and 6, imagination and ambition outpace frustration tolerance by miles—so a fallen tower genuinely feels catastrophic.',
            },
            {
              id: 'tired',
              label: 'Mostly late afternoon before dinner',
              response:
                'Holding it together all day at preschool burns through a young child’s entire self-control battery by 5 PM.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mind',
          beat2Title: 'Naming a feeling literally cools the brain’s alarm center',
          beat2Lead:
            'When a preschooler is flooded, asking logical questions demands skills that are temporarily offline. Putting simple, accurate words on the emotion acts like a dimmer switch on the alarm. Toggle both states below.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Flooded alarm vs. named & steadied',
          visualStageHint: 'Toggle mid-storm vs. after calm naming',
          visualConfig: {
            calmToggleLabel: 'Feeling Named Calmly',
            stormToggleLabel: 'Flooded by Frustration',
            calmStatus: 'LABELING ENGAGES CALM BRAKES',
            stormStatus: 'ALARM FLOODED · LOGIC OFFLINE',
            calmReadouts: [
              {
                name: 'Left-Brain Language Bridge',
                value: 'Reconnecting',
                tone: 'spruce',
                desc: 'Hearing “You worked so hard and it broke—you’re mad!” links raw panic to concrete language.',
              },
              {
                name: 'Body Tension',
                value: 'Softening',
                tone: 'spruce',
                desc: 'Feeling understood drops defensiveness so {name} can accept a hug or rebuild.',
              },
            ],
            stormReadouts: [
              {
                name: 'Emotional Alarm',
                value: 'Full Siren',
                tone: 'amber',
                desc: 'A broken tower triggers genuine overwhelm—not calculated drama.',
              },
              {
                name: 'Reasoning & Manners',
                value: 'Temporarily Dark',
                tone: 'amber',
                desc: 'Lectures about throwing toys bounce right off until the surge peaks.',
              },
            ],
          },
          almanacTruth:
            'Naming the feeling calmly (“You’re frustrated that it crashed”) doesn’t reward throwing—it lowers the alarm fast enough for {name} to actually hear your boundary.',
          scienceDeepDive:
            'Neuroimaging work on affect labeling (Lieberman et al., UCLA) demonstrates that translating raw emotional states into simple verbal labels increases right ventrolateral prefrontal cortex activation while directly dampening amygdala firing.',
          beat3Kicker: 'Practice before the next tower falls',
          beat3Title: 'Catch the wave without lecturing or excusing throwing',
          rehearsalTriggerSpeaker: '{Name} kicking blocks across the floor',
          rehearsalTriggerQuote: '“It’s STUPID! I hate it! Don’t touch it!”',
          rehearsalPrompt: 'Which honest reaction jumps up first?',
          instincts: [
            {
              id: 'scold',
              label: '“Hey! We do NOT throw blocks! Go sit on the stairs right now!”',
              whyTitle: 'Why that’s so tempting—and what happens next',
              whyText:
                'Protecting the room and setting limits is vital! Yet barked consequences mid-surge add shame on top of overwhelm, turning a 2-minute storm into a 25-minute standoff.',
            },
            {
              id: 'fix',
              label: 'Rush in and quickly snap the blocks back together so {pronoun} stops crying.',
              whyTitle: 'Why that’s so tempting—and why it backfires',
              whyText:
                'Fixing it instantly feels kind, yet preschoolers often get angrier because they wanted mastery—and they miss practicing how to survive frustration.',
            },
          ],
          calmScriptPlain:
            '“Whoa—that tower crashed right when you almost finished. You’re really frustrated. Blocks stay on the rug; I’m right here while your body cools down.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'label',
              text: 'Whoa—that tower crashed right when you almost finished. You’re really frustrated.',
              tag: 'Names the Emotion',
              note: 'Shows {name} you see the real disappointment underneath the yell, dropping defensiveness fast.',
            },
            { text: ' ' },
            {
              id: 'limit',
              text: 'Blocks stay on the rug; I’m right here while your body cools down.',
              tag: 'Warm Firm Limit',
              note: 'Holds the safety rule clearly in five words without shaming or giving a speech.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Drop to one knee below eye level',
            'Name the feeling in under 10 words',
            'Hold safety limit with a flat, warm voice',
          ],
          pushbacks: [
            {
              id: 'notmad',
              label: '“I’M NOT FRUSTRATED! GO AWAY!”',
              setup: 'Don’t debate the label—keep your voice light and give two feet of breathing room:',
              script:
                '“Got it, you want space right now. I’ll sit right here by the couch until you’re ready.”',
            },
            {
              id: 'throwsagain',
              label: '“{Pronoun} grabs another block to throw”',
              setup: 'Calmly block the throw with steady hands and zero anger:',
              script:
                '“I won’t let you throw hard blocks. I’m putting these in the basket until your hands are safe.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) gets explosive when small crafts or puzzles go wrong—how can I coach frustration tolerance without walking on eggshells?”',
          beat4Kicker: 'This week’s calm habit',
          beat4Title: 'Pick one simple way to practice naming feelings',
          beat4Lead: 'Emotional vocabulary grows fastest during calm daylight moments.',
          moves: [
            {
              id: 'narrateown',
              title: 'Narrate one of your own mild frustrations aloud today',
              desc: '“Ugh, I spilled coffee on my shirt—I’m annoyed, so I’m taking one big breath before wiping it up.”',
            },
            {
              id: 'twostep',
              title: 'Try “Name the feeling + Hold the limit” once this week',
              desc: 'Skip “Why did you do that?” and start with “You’re mad that…” followed by one short safety rule.',
            },
            {
              id: 'storybook',
              title: 'Spot character feelings during bedtime storytime',
              desc: 'Pause on one illustration and ask casually: “Look at that bear’s eyebrows—how do you think he feels?”',
            },
          ],
          closingNote:
            'Every time you stay steady and give {name} real words for a storm too big for {poss} chest, you hand {obj} the inner voice {pronoun} will use for life.',
          pocketInsight:
            'Pair a short feeling label (“You’re really frustrated”) with a calm 5-word safety limit—skip lectures until the wave passes.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Why does a sweet, generous 4-year-old suddenly guard every single toy on a playdate?”',
            title: 'Why Sharing Feels Impossible at Age Four',
            targetSlug: 'preschool-theory-of-mind-neurobiology',
          },
          interactiveHighlights: ['Brain Bridge Toggle', 'Annotated Script'],
        },
      },
      {
        slug: 'preschool-theory-of-mind-neurobiology',
        title: 'Why Sharing Feels Impossible at Age Four',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Playdate rug · Seeing another mind for the first time',
          headline: 'Why Sharing Feels Impossible at Age Four',
          deck: 'Why forced “give it to your friend right now!” breeds resentment—and how turn-taking builds true generosity as perspective-taking switches on.',
          sceneTime: '10:30 AM · SATURDAY PLAYDATE',
          sceneBody:
            'Another parent watches while {name} clutches the favorite fire truck to {poss} chest, refusing to hand it over to a visiting friend. *You feel heat creep up your neck—why does {pronoun} look so selfish right in front of company?*',
          pollQuestion: 'Does playdate toy-guarding trigger instant parent embarrassment?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes—I feel judged by other parents',
              response:
                'Almost every parent feels that spotlight! Yet developmentally, genuine perspective-taking is just beginning to wake up between ages 4 and 5.',
            },
            {
              id: 'turn',
              label: 'We do better with timers and turns',
              response:
                'You’ve already discovered the secret: taking turns respects deep focus while still welcoming friends into the play.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mind',
          beat2Title: 'Flip the lens on “selfishness” vs. growing empathy',
          beat2Lead:
            'Seeing the world through someone else’s eyes (“theory of mind”) emerges gradually across ages 4 to 6. Flip the lens below and tap through turn-taking reps to see generosity grow naturally.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Adult courtesy lens vs. 4-year-old mind lens',
          visualStageHint: 'Flip lenses, then tap turn-taking reps below',
          visualConfig: {
            adultLabel: 'Adult politeness lens',
            adultQuote: '“If I don’t force {obj} to hand that truck over, {pronoun} will grow up selfish!”',
            adultSub: 'Adults feel social pressure to keep guests happy immediately, so snatching toys away looks like good manners.',
            childLabel: '{Possessive} 4-year-old lens',
            childQuote: '“I’m in the middle of my rescue story—if I hand it away, it’s gone forever!”',
            childSub: 'Forced sharing interrupts real concentration and actually makes young kids guard toys MORE tightly next time.',
            exposureHeading: 'From guarding to joyful turn-taking',
            exposureSub: 'Tap reps 1–12 to watch trust build',
            totalDots: 12,
            defaultCount: 5,
            unitLabel: 'playdate',
            lowMax: 4,
            midMax: 8,
            lowMsg: 'Playdates 1–4: Tucking away 2 “special” toys before guests arrive lowers panic right away.',
            midMsg: 'Playdates 5–8: Hearing “You can hand it over when you’re done with this turn” proves toys come back safely.',
            highMsg: 'Playdates 9–12: Spontaneous offers—“Want a turn when I finish?”—emerge straight from genuine confidence.',
          },
          almanacTruth:
            'Forced instant sharing teaches kids to hide what they love; trusting long turns teaches them that generosity feels safe.',
          scienceDeepDive:
            'Developmental psychology research on theory of mind (Wellman et al.) shows that children typically pass false-belief perspective tasks between ages 4 and 5. Studies from Cornell and Harvard further indicate that children who choose when to share freely display stronger prosocial generosity later than children coerced into immediate handoffs.',
          beat3Kicker: 'Practice before the next playdate',
          beat3Title: 'Coach turns calmly without shaming your host',
          rehearsalTriggerSpeaker: 'Visiting friend reaching for the fire truck',
          rehearsalTriggerQuote: '“NO! That’s MINE! I had it first!”',
          rehearsalPrompt: 'Which awkward-host instinct shows up first?',
          instincts: [
            {
              id: 'snatch',
              label: 'Pry the truck from {possessive} hands: “Be nice! Share with our guest right now!”',
              whyTitle: 'Why that’s so tempting—and what it teaches',
              whyText:
                'You want to be a gracious host! Yet prying a toy mid-game teaches {name} that friends equal losing control—sparking tears and tighter hoarding.',
            },
            {
              id: 'bribe',
              label: 'Promise a sticker or treat if {pronoun} hands the truck over.',
              whyTitle: 'Why that’s so tempting—and what happens next',
              whyText:
                'Bribes work once, then turn every generous act into a transaction instead of authentic joy in playing together.',
            },
          ],
          calmScriptPlain:
            '“{Name} is still driving that truck to the fire station. When you’re all done with your turn, Maya would love a turn next—want to tell her when you’re ready?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'protect',
              text: '{Name} is still driving that truck to the fire station.',
              tag: 'Protects Focus',
              note: 'Relaxes {possessive} guard instantly because {pronoun} realizes nobody is yanking the toy away.',
            },
            { text: ' ' },
            {
              id: 'agency',
              text: 'When you’re all done with your turn, Maya would love a turn next—want to tell her when you’re ready?',
              tag: 'Hands Back Generosity',
              note: 'Turns sharing into a proud choice {name} initiates—usually within two minutes once panic drops!',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Speak calmly to both children',
            'Put 2 prized toys in a closet before guests arrive',
            'Praise generous handoffs warmly afterward',
          ],
          pushbacks: [
            {
              id: 'guestcries',
              label: '“The visiting child starts crying for the truck”',
              setup: 'Empathize warmly with the guest while offering a great partner prop:',
              script:
                '“Waiting for the fire truck is really hard! While {name} finishes this rescue, want to build the bridge together or drive the helicopter?”',
            },
            {
              id: 'neverdone',
              label: '“{Name} holds the toy for 20 minutes just to block the guest”',
              setup: 'Use a gentle sand timer to keep turns joyful and fair:',
              script:
                '“Let’s flip the 3-minute sand timer—when the sand runs out, it’s your friend’s turn and then straight back to you.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) has a playdate coming up and gets super territorial over favorite toys—how do I prep {obj} calmly ahead of time?”',
          beat4Kicker: 'Before the next playdate',
          beat4Title: 'Pick one easy generosity habit this week',
          beat4Lead: 'Setting the stage ahead of time prevents 80% of toy battles.',
          moves: [
            {
              id: 'specialbox',
              title: 'Create a “Special Toys Closet” before guests arrive',
              desc: 'Let {name} pick 2–3 treasured items to tuck away safely—everything left out is open for turns.',
            },
            {
              id: 'turnlanguage',
              title: 'Swap the word “share” for “taking turns” this week',
              desc: 'Notice how much faster kids hand toys over when they know their turn isn’t abruptly cut short.',
            },
            {
              id: 'spotempathy',
              title: 'Name one kind moment you notice at dinner',
              desc: '“I saw you hand your friend the blue marker when she needed it—her face lit right up!”',
            },
          ],
          closingNote:
            'True generosity never grows out of forced handoffs—it blossoms when {name} feels secure enough to watch someone else smile.',
          pocketInsight:
            'Protect turns instead of prying toys away; tuck 2 prized toys out of sight before playdates and invite {name} to announce when {pronoun} {is} ready to pass it.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“Why does a sleepy 5-year-old suddenly remember twelve urgent questions at 8:02 PM?”',
            title: 'Ending the 10-Excuse Bedtime Stall',
            targetSlug: 'preschool-bedtime-stall-prevention',
          },
          interactiveHighlights: ['12-Playdate Generosity Map', 'Turn-Taking Script'],
        },
      },
      {
        slug: 'preschool-bedtime-stall-prevention',
        title: 'Ending the 10-Excuse Bedtime Stall',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: '8:12 PM · Closing the bedtime negotiation loop',
          headline: 'Ending the 10-Excuse Bedtime Stall',
          deck: 'Why preschoolers suddenly need water, another hug, and a sock check at lights-out—and the 4-step visual bedtime pass that brings back your evenings.',
          sceneTime: '8:12 PM · HALLWAY DOORWAY',
          sceneBody:
            'You already read two books, tucked in four stuffed animals, and kissed {name} goodnight. Three minutes later tiny footsteps patter into the kitchen: “I forgot to tell you about a squirrel! Also I need two sips of water!” *Your shoulders drop—this is curtain call number four.*',
          pollQuestion: 'How many curtain calls usually happen after “goodnight”?',
          pollOptions: [
            {
              id: 'many',
              label: 'Three to six every single night',
              response:
                'You are definitely not alone! At ages 4–6, vivid imagination makes dark rooms feel lonely, so kids invent clever errands just to pull you back for one more hit of connection.',
            },
            {
              id: 'stretching',
              label: 'Endless stalling before even getting in bed',
              response:
                'Giving {name} predictable front-loaded connection AND letting a visual chart be the boss stops the nightly bargaining fast.',
            },
          ],
          beat2Kicker: 'The rhythm reset',
          beat2Title: 'Front-load connection, then let the visual routine hold the line',
          beat2Lead:
            'Bedtime stalls are almost always bids for closeness plus a tiny dash of nighttime worry. When you build the bids INTO the routine upfront, the stalling evaporates. Tap each beat below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-beat zero-stall bedtime ladder',
          visualStageHint: 'Tap each step from wind-down to lights-out',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Step 1 · 7:30 PM',
                label: 'Checklist Boss',
                title: 'Let a picture chart call the steps (not your voice)',
                desc: 'Pajamas, brush teeth, potty, water cup on nightstand—{name} flips each card down with zero nagging.',
                why: 'Kids resist constant parental commands far more than a playful visual checklist they control.',
              },
              {
                timeOrCue: 'Step 2 · 7:45 PM',
                label: '5-Min Worry Dump',
                title: 'Collect every big thought while lights are still warm',
                desc: 'Ask “What was your favorite part today, and is there anything on your mind before sleep?” while sitting close.',
                why: 'Emptying chatty thoughts early eliminates the 8:15 PM “I forgot to tell you!” loop.',
              },
              {
                timeOrCue: 'Step 3 · 7:55 PM',
                label: 'One Bedtime Pass',
                title: 'Hand over 1 physical “Night Pass” card',
                desc: '{Name} gets one calm 60-second pass for water or a hug—once used, it goes on the dresser until morning.',
                why: 'Respects autonomy while drawing a crystal-clear, drama-free boundary.',
              },
              {
                timeOrCue: 'Step 4 · 8:00 PM',
                label: '2-Min Check-In',
                title: 'Promise one calm silent peek in 3 minutes',
                desc: '“I’ll peek in once you’re lying cozy in 3 minutes—no talking, just a quick thumbs-up.”',
                why: 'Keeping your word builds deep nighttime trust so {name} stays peacefully in bed.',
              },
            ],
          },
          almanacTruth:
            'Preschoolers stall at bedtime to stretch connection, not to ruin your evening—giving five unhurried minutes upfront buys back an hour of peace afterward.',
          scienceDeepDive:
            'Pediatric behavioral sleep studies on the “Bedtime Pass” method (Moore et al., Archives of Pediatrics & Adolescent Medicine) showed rapid, tear-free reductions in crying and curtain calls when children received a single predictable pass combined with calm, brief returns.',
          beat3Kicker: 'Practice before lights-out',
          beat3Title: 'Answer curtain call #2 without getting hooked into a debate',
          rehearsalTriggerSpeaker: '{Name} peeking around the living room corner at 8:20 PM',
          rehearsalTriggerQuote: '“My blanket feels bumpy AND I think my toe hurts AND can I have one more story?”',
          rehearsalPrompt: 'Which exhausted 8:20 PM reaction is hardest to resist?',
          instincts: [
            {
              id: 'snap',
              label: '“GET BACK IN BED RIGHT NOW! I am DONE talking tonight!”',
              whyTitle: 'Why that’s so tempting—and what happens next',
              whyText:
                'By 8:20 PM your battery is at 2%! Yet raising your voice spikes {possessive} adrenaline—guaranteeing wide-awake tears for another thirty minutes.',
            },
            {
              id: 'negotiate',
              label: 'Give in to “just one tiny 2-minute story” to hurry sleep along.',
              whyTitle: 'Why that’s so tempting—and why stalls double tomorrow',
              whyText:
                'Occasional variable payoffs wire persistence like a slot machine—teaching {name} that four asks might unlock a bonus story tomorrow.',
            },
          ],
          calmScriptPlain:
            '“(Warm sleepy whisper, walk hand-in-hand back to bed) I love your stories—save that squirrel tale for breakfast! Right now it’s sleep time. I’ll peek in silently in three minutes.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'park',
              text: 'I love your stories—save that squirrel tale for breakfast!',
              tag: 'Parks Without Rejecting',
              note: 'Honors {possessive} thought warmly while signaling conversation is closed until morning.',
            },
            { text: ' ' },
            {
              id: 'anchor',
              text: 'Right now it’s sleep time. I’ll peek in silently in three minutes.',
              tag: 'Predictable Bridge',
              note: 'Reassures nighttime closeness without extending bedtime negotiation by a single minute.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Keep lights dim and voice whisper-quiet',
            'Never debate requests in the hallway',
            'Follow through on the 3-minute silent peek',
          ],
          pushbacks: [
            {
              id: 'scared',
              label: '“I’m scared of shadows in my room!”',
              setup: 'Validate without hunting monsters (which confirms they exist!) and add a warm amber glow:',
              script:
                '“Dark shadows can look weird when we’re sleepy! Let’s turn the warm nightlight on so your eyes see it’s just your cozy bookshelf. You are safe.”',
            },
            {
              id: 'keepcoming',
              label: '“{Pronoun} comes out a third time after using the pass”',
              setup: 'Switch to calm, loving, boring escort—zero fresh conversation:',
              script:
                '“(Gentle hand on back, walking straight to bed) Bedtime now, sweetie. I love you—goodnight.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) keeps getting out of bed five times every night asking for water and hugs—help me set up a simple Bedtime Pass tonight.”',
          beat4Kicker: 'Tonight’s bedtime upgrade',
          beat4Title: 'Pick one stall-breaker to try tonight',
          beat4Lead: 'Introduce it cheerfully at dinner—never mid-standoff at 8:15 PM.',
          moves: [
            {
              id: 'bedpass',
              title: 'Make one colorful index-card “Bedtime Pass” together',
              desc: 'Let {name} draw a moon on it—good for one calm 60-second visit after lights-out.',
            },
            {
              id: 'chat5',
              title: 'Add a 5-minute “Lights-On Chat” before closing the book',
              desc: 'Put your phone in another room and soak up every funny story while lights are still warm.',
            },
            {
              id: 'peek3',
              title: 'Use the “3-Minute Silent Peek” promise tonight',
              desc: 'Leave calmly, return right at 3 minutes with a warm silent wave, and watch {name} relax into sleep.',
            },
          ],
          closingNote:
            'A calm, predictable goodbye at 8:00 PM is one of the greatest gifts you give both {name} and your own tired nervous system.',
          pocketInsight:
            'Front-load 5 minutes of warm chat before lights-out, hand over one physical Bedtime Pass, and use a calm 3-minute silent check-in.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery: '“Why does stepping in as courtroom judge actually make sibling fights louder?”',
            title: 'Coaching Siblings Through Fights Without Playing Judge',
            targetSlug: 'preschool-scaffolding-empathy-repair',
          },
          interactiveHighlights: ['4-Beat Bedtime Ladder', 'Bedtime Pass Script'],
        },
      },
      {
        slug: 'preschool-scaffolding-empathy-repair',
        title: 'Coaching Siblings Through Fights Without Playing Judge',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Hallway referee swap · Sportscaster, never judge',
          headline: 'Coaching Siblings Through Fights Without Playing Judge',
          deck: 'Why asking “Who started it?!” guarantees finger-pointing—and the neutral sportscaster script that turns sibling scraps into real repair skills.',
          sceneTime: '4:35 PM · PLAYROOM FLOOR',
          sceneBody:
            'A shriek erupts from the next room over the single purple marker. Both kids race toward you shouting competing versions of history at top volume. *Every instinct wants to solve the mystery, assign blame, and get back to making pasta.*',
          pollQuestion: 'How often do sibling fights pull you into courtroom duty?',
          pollOptions: [
            {
              id: 'constant',
              label: 'Feels like ten times a day',
              response:
                'Every sibling household knows that soundtrack! Stepping out of the judge’s robe and into the “calm sportscaster” role takes huge pressure off you immediately.',
            },
            {
              id: 'hands',
              label: 'Fine until grabbing or pushing starts',
              response:
                'Stopping unsafe hands calmly FIRST, then describing both viewpoints neutrally, teaches kids how to solve the next scrape themselves.',
            },
          ],
          beat2Kicker: 'Building lifelong connection',
          beat2Title: 'The 3-step sportscaster loop beats “Who started it?”',
          beat2Lead:
            'When you investigate who hit first, kids learn to prosecute each other instead of fixing the problem. Describing what both kids want—then handing the solution back—wires real social negotiation. Tap the 3 beats below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat sibling sportscaster loop',
          visualStageHint: 'Tap each step to coach conflict cleanly',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Stop the storm',
                label: 'Safety First',
                quote: '“Hands down, bodies safe—I won’t let anyone get hurt.”',
                desc: 'Step between grabbing hands gently with zero blame in your voice.',
                brainNote: 'De-escalates physical threat so both kids can start hearing words again.',
              },
              {
                stepNum: '02',
                actor: 'Sportscast neutrally',
                label: 'Mirror Both Sides',
                quote: '“Two kids want one purple marker at the exact same moment!”',
                desc: 'State each child’s wish fairly without picking a villain or a victim.',
                brainNote: 'Being accurately heard cools rivalry and sparks perspective-taking.',
              },
              {
                stepNum: '03',
                actor: 'Hand back repair',
                label: 'Invite a Plan',
                quote: '“What’s a fair way to solve this—timer turns or drawing side by side?”',
                desc: 'Stay close as a quiet consultant while they pick a plan and check on hurt feelings.',
                brainNote: 'Builds real lifelong negotiation and repair muscle.',
              },
            ],
          },
          almanacTruth:
            'When you stop casting one child as the villain and one as the victim, siblings lose their audience for tattling and start practicing real problem-solving.',
          scienceDeepDive:
            'Longitudinal family research by Dr. Laurie Kramer shows that parents who act as neutral emotion coaches—labeling both perspectives and scaffolding collaborative solutions rather than issuing top-down verdicts—foster measurably warmer sibling relationships and stronger peer conflict skills.',
          beat3Kicker: 'Practice before the next scream',
          beat3Title: 'Trade courtroom verdicts for calm sportscasting',
          rehearsalTriggerSpeaker: 'Two kids tugging on one purple marker',
          rehearsalTriggerQuote: '“HE STOLE IT FROM ME!” / “SHE WASN’T EVEN USING IT!”',
          rehearsalPrompt: 'Which judge instinct grabs the microphone first?',
          instincts: [
            {
              id: 'interrogate',
              label: '“WHO HAD IT FIRST?! Tell me the truth right now or nobody gets markers!”',
              whyTitle: 'Why that’s so tempting—and why it backfires',
              whyText:
                'You want instant justice! Yet taking the markers away teaches zero repair skills and leaves both kids resenting each other even more.',
            },
            {
              id: 'olderblame',
              label: '“You’re the older one—just be nice and give it to your little sibling!”',
              whyTitle: 'Why that’s so tempting—and what it quietly fuels',
              whyText:
                'Always expecting the older child to surrender builds deep hidden resentment toward the younger sibling.',
            },
          ],
          calmScriptPlain:
            '“Pause—safe hands. I see a tricky problem: two artists both want the one purple marker right now. Do you two want to flip the 2-minute timer or trade colors?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'sportscast',
              text: 'Pause—safe hands. I see a tricky problem: two artists both want the one purple marker right now.',
              tag: 'Zero-Villain Summary',
              note: 'Frames the marker—not each other—as the shared problem to solve together.',
            },
            { text: ' ' },
            {
              id: 'solve',
              text: 'Do you two want to flip the 2-minute timer or trade colors?',
              tag: 'Hands Back Ownership',
              note: 'Gives two concrete workable ideas so 4-to-6-year-olds can actually succeed.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Skip asking “Who started it?”',
            'Tend to any hurt child first, calmly',
            'Replace forced “Say sorry!” with real repair',
          ],
          pushbacks: [
            {
              id: 'refusesorry',
              label: '“{Name} refuses to say ‘sorry’ after pushing”',
              setup: 'Skip robotic forced apologies and guide one genuine action repair once calm:',
              script:
                '“Look at your brother’s face—he looks startled. When you’re ready, let’s check if he needs a cold cloth or help picking up his blocks.”',
            },
            {
              id: 'keepfighting',
              label: '“They immediately go back to yelling”',
              setup: 'Separate calmly for a 5-minute cool-off without anger:',
              script:
                '“Sounds like bodies need a little space right now. Marker rests on the counter for five minutes while you each pick a separate spot to cool down.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) and {poss} sibling clash constantly over toys—can you help me coach repair without forcing fake apologies?”',
          beat4Kicker: 'This week’s peace experiment',
          beat4Title: 'Pick one small sibling shift to test this week',
          beat4Lead: 'Notice how much lighter you feel when you retire from courtroom duty.',
          moves: [
            {
              id: 'dropwho',
              title: 'Retire the question “Who started it?” for 48 hours',
              desc: 'Start every intervention with “I see two kids who both want…” instead.',
            },
            {
              id: 'checkface',
              title: 'Swap one forced “Say sorry!” for “How can we help fix it?”',
              desc: 'Getting a tissue, rebuilding a knocked block, or offering a high-five builds authentic empathy.',
            },
            {
              id: 'oneonone',
              title: 'Fill each child’s bucket with 10 solo minutes this week',
              desc: 'Kids fight dramatically less when they aren’t competing for scarce parental attention.',
            },
          ],
          closingNote:
            'Sibling squabbles aren’t proof your home is failing—they are the safest practice gym {name} has for learning to love, disagree, and make up.',
          pocketInsight:
            'Step in as a calm sportscaster, never a judge: protect bodies, mirror both wishes neutrally, and invite a real action repair.',
          nextEpisodeHook: null,
          interactiveHighlights: ['3-Beat Sportscaster Loop', 'Authentic Repair Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 17: Preschool Rest, Quiet Time & Sick-Day Comfort (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'health-preschool-immunity',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    developmentalTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    title: 'Preschool Rest, Quiet Time & Sick-Day Comfort',
    reliefSubtitle:
      'Swap dropped naps for a peaceful daily quiet hour, understand normal preschool cold frequency, and keep sick days and preventive habits stress-free',
    tonightQuickWinTitle: 'Episode 1: Dropping the Final Nap: Installing a Daily Quiet Hour',
    summary:
      'Navigate the tricky transition out of daytime naps without 5 PM meltdowns, replace worry over frequent preschool colds with calm understanding, and anchor cozy sick-day comfort plus effortless daily teeth, eye, and sleep habits.',
    coverImageUrl: 'https://assets.alongside.care/academy/health-preschool.png',
    sortOrder: 4,
    episodes: [
      {
        slug: 'preschool-quiet-time-recharge-routine',
        title: 'Dropping the Final Nap: Installing a Daily Quiet Hour',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: '1:30 PM · Protected afternoon brain recharge',
          headline: 'Dropping the Final Nap: Installing a Daily Quiet Hour',
          deck: 'Why quitting naps cold turkey creates 5 PM witching hours—and how a cozy 45-minute Quiet Hour saves both {possessive} mood and your sanity.',
          sceneTime: '4:45 PM · KITCHEN FLOOR',
          sceneBody:
            '{Name} refused to nap at 1:00 PM—and if {pronoun} DOES nap, {pronoun} bounces off the walls until 9:30 PM. Without one, {pronoun} dissolves into sobs over a cracked pretzel at 4:45 PM. *How do you survive the no-nap limbo months?*',
          pollQuestion: 'Where are you in the final nap drop?',
          pollOptions: [
            {
              id: 'limbo',
              label: 'Stuck in nap limbo (wired with it, wrecked without it)',
              response:
                'That exact 6-month limbo hits almost every family around ages 3.5 to 5! A non-negotiable Quiet Hour plus a 30-minute earlier bedtime bridges it smoothly.',
            },
            {
              id: 'dropped',
              label: 'Naps are gone, afternoons feel intense',
              response:
                'Even kids who never fall asleep still need 30–45 minutes of low-stimulation rest to clear midday sensory overload.',
            },
          ],
          beat2Kicker: 'Inside {possessive} energy rhythm',
          beat2Title: 'Watch how sleep pressure climbs when midday naps fade',
          beat2Lead:
            'Dropping the nap doesn’t mean {possessive} brain needs zero rest—it shifts recovery into a quiet afternoon pause and an earlier nighttime anchor. Tap each timepoint below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'The no-nap preschool energy curve',
          visualStageHint: 'Tap each time of day to see the calm reset point',
          visualConfig: {
            stages: [
              {
                time: '7:00 AM',
                label: 'Bright Wake',
                level: 20,
                title: 'Morning sunlight sets the 12-hour clock',
                desc: 'Outdoor light and active play build steady, healthy sleep drive for evening.',
                tip: 'Keep wake times within 30 minutes even on weekends.',
              },
              {
                time: '1:15 PM',
                label: 'Quiet Hour',
                level: 58,
                title: 'Low-stimulation recharge (sleep optional!)',
                desc: 'Dim room, audiobooks, or quiet puzzle bin let an overstimulated brain cool down without forcing sleep.',
                tip: 'Remove all nap pressure: “You don’t have to sleep—just rest your body.”',
              },
              {
                time: '4:45 PM',
                label: 'Snack Bridge',
                level: 78,
                title: 'The classic late-afternoon dip',
                desc: 'Fatigue plus dipping blood sugar trigger tears unless cushioned by a protein snack and low demands.',
                tip: 'Offer cheese + apple slices and calm outdoor play or bath.',
              },
              {
                time: '7:15 PM',
                label: 'Early Bed',
                level: 94,
                title: 'Temporarily move bedtime 30–45 min earlier',
                desc: 'On no-nap days, an earlier 7:15 PM lights-out protects the full 11–12 hours of overnight brain repair.',
                tip: 'Keep bedtime earlier for 4–6 weeks until stamina catches up.',
              },
            ],
          },
          almanacTruth:
            'Taking the word “sleep” off the afternoon door (“You don’t have to sleep—just hang out with your Quiet Bin”) ends power struggles and lets tired bodies rest.',
          scienceDeepDive:
            'Pediatric sleep studies (Kurdziel et al., PNAS) confirm that as preschoolers transition from biphasic to monophasic sleep between ages 3.5 and 5, homeostatic sleep pressure temporarily peaks in late afternoon. Compensatory earlier bedtimes and low-arousal quiet rest prevent cortisol-driven evening hyperactivity.',
          beat3Kicker: 'Practice before 1:15 PM',
          beat3Title: 'Introduce Quiet Hour without a “I’m not a baby!” fight',
          rehearsalTriggerSpeaker: '{Name} planting hands on hips at 1:15 PM',
          rehearsalTriggerQuote: '“I’m NOT tired! Big kids don’t take naps anymore!”',
          rehearsalPrompt: 'Which parent instinct slips out first?',
          instincts: [
            {
              id: 'argue',
              label: '“Yes you ARE tired! You’re going to melt down at dinner if you don’t lie down!”',
              whyTitle: 'Why that’s so tempting—and why it backfires',
              whyText:
                'You can practically see the 5 PM meltdown coming! Yet insisting {pronoun} {is} tired turns rest into a tug-of-war—and nobody can force another human to fall asleep.',
            },
            {
              id: 'giveup',
              label: 'Skip rest altogether and turn on cartoons to get 30 minutes of peace.',
              whyTitle: 'Why that’s so tempting—and what happens at 5 PM',
              whyText:
                'Screens buy quiet in the moment, yet bright visual input keeps the brain humming rather than genuinely resting.',
            },
          ],
          calmScriptPlain:
            '“You’re right—you are a big kid, and you don’t have to sleep at all! Everyone in our house takes Quiet Recharge Time. Want audiobooks or your special Quiet Bin until the clock turns green?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'agree',
              text: 'You’re right—you are a big kid, and you don’t have to sleep at all!',
              tag: 'Honors Big-Kid Pride',
              note: 'Instantly disarms the “baby nap” protest so cooperation stays warm.',
            },
            { text: ' ' },
            {
              id: 'frame',
              text: 'Everyone in our house takes Quiet Recharge Time. Want audiobooks or your special Quiet Bin until the clock turns green?',
              tag: 'Shared House Rhythm',
              note: 'Frames rest as a grown-up superpower paired with two cozy choices.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Start with just 20 minutes and build up to 45',
            'Keep Quiet Bin toys exclusive to rest hour',
            'Use a simple color-change clock so the clock holds the boundary',
          ],
          pushbacks: [
            {
              id: 'out5min',
              label: '“{Name} comes out after five minutes saying ‘I’m done!’”',
              setup: 'Point calmly to the visual clock with zero frustration:',
              script:
                '“Oops, the light is still yellow! Let’s walk back to your cozy fort—ten more minutes until green, then we’ll have snack.”',
            },
            {
              id: 'fallsasleep',
              label: '“{Pronoun} actually falls asleep at 3 PM!”',
              setup: 'Wake gently after 30–40 minutes with a soft hug and bright room so bedtime stays protected:',
              script:
                '“Good morning, sleepyhead! Your body really needed a quick power nap—let’s step onto the porch for some sunshine and a snack.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is dropping {poss} nap and melting down by 5 PM—give me 5 screen-free ideas for a special Quiet Hour bin.”',
          beat4Kicker: 'Tomorrow’s afternoon anchor',
          beat4Title: 'Pick one easy step to launch Quiet Hour',
          beat4Lead: 'Keep the first three days short and cozy so {name} actually looks forward to it.',
          moves: [
            {
              id: 'quietbin',
              title: 'Fill one special “Quiet Hour Only” tote tonight',
              desc: 'Include picture books, magnetic tiles, lacing beads, or an audio story player that only appear at rest time.',
            },
            {
              id: 'start20',
              title: 'Start with a 20-minute visual timer and celebrate the win',
              desc: 'Build stamina by 5 minutes every few days once {name} sees you always return right on time.',
            },
            {
              id: 'earlybed',
              title: 'Shift bedtime 30 minutes earlier on zero-nap days',
              desc: 'Protect overnight repair until afternoon stamina steadies naturally.',
            },
          ],
          closingNote:
            'Teaching {name} how to pause and recharge in the middle of a busy day isn’t just surviving the nap drop—it’s gifting {obj} a lifelong rhythm of rest.',
          pocketInsight:
            'Replace nap battles with a screen-free Quiet Recharge Hour (“No sleep required!”), exclusive Quiet Bin toys, and a 30-minute earlier bedtime on no-nap days.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Wait—is it really normal for a healthy preschooler to catch another sniffle every single month?”',
            title: 'Why 8–10 Daycare Colds a Year Is Normal (And How to Keep Calm)',
            targetSlug: 'preschool-immune-system-education',
          },
          interactiveHighlights: ['No-Nap Energy Curve', 'Quiet Hour Script'],
        },
      },
      {
        slug: 'preschool-immune-system-education',
        title: 'Why 8–10 Daycare Colds a Year Is Normal (And How to Keep Calm)',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Immune library · Building lifelong memory',
          headline: 'Why 8–10 Daycare Colds a Year Is Normal (And How to Keep Calm)',
          deck: 'Why back-to-back preschool sniffles feel endless—and why they usually mean {possessive} adaptive immune library is doing its exact training job.',
          sceneTime: '7:20 AM · TUESDAY MORNING',
          sceneBody:
            'You literally JUST finished washing the last pile of tissues from two weeks ago, and now {name} wakes up with a brand-new runny nose. *A weary dread sinks into your stomach—is something wrong with {poss} immune system, or are we doing something wrong?*',
          pollQuestion: 'Have back-to-back preschool sniffles ever made you wonder “Why ALWAYS us?”',
          pollOptions: [
            {
              id: 'constantly',
              label: 'Yes—it feels like every other week all winter',
              response:
                'Take a deep breath: pediatricians routinely see healthy preschoolers catch 8 to 12 mild viral colds per year—often clustered tightly between October and March.',
            },
            {
              id: 'guilt',
              label: 'I worry I missed some magic vitamin or habit',
              response:
                'You didn’t miss a secret supplement! Young immune systems simply have to meet common viruses for the first time before building lasting memory against them.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing body',
          beat2Title: 'Flip the lens from “weak immunity” to “active immune school”',
          beat2Lead:
            'Adults have met hundreds of harmless cold viruses over decades; preschoolers are meeting them all at once in group classrooms. Flip lenses and tap through the first-year classroom library below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Worry lens vs. immune-school lens',
          visualStageHint: 'Flip lenses, then tap the 10-cold seasonal map',
          visualConfig: {
            adultLabel: 'Exhausted worry lens',
            adultQuote: '“Another runny nose?! {Possessive} immune system must be weak!”',
            adultSub: 'When mild colds stack every three weeks across winter, it naturally feels like one endless illness.',
            childLabel: 'Immune-training lens',
            childQuote: '“I’m cataloging common colds now so elementary school is much smoother!”',
            childSub: 'Each mild recovery adds brand-new antibody memory cards—meaning noticeably fewer colds by ages 6–7.',
            exposureHeading: 'The typical preschool immune-library year',
            exposureSub: 'Tap typical annual classroom colds (1–10)',
            totalDots: 10,
            defaultCount: 6,
            unitLabel: 'cold',
            lowMax: 3,
            midMax: 7,
            lowMsg: 'Colds 1–3 (Fall): Classroom doors open and new viruses circulate fast—normal handwashing habits help trim the peak.',
            midMsg: 'Colds 4–7 (Winter Peak): Still squarely inside normal healthy pediatric ranges—focus on rest, fluids, and calling your pediatrician whenever anything feels unusual.',
            highMsg: 'Colds 8–10 (Spring Lightening): Your child’s memory library is visibly stronger—most families see a big drop in sick days next school year!',
          },
          almanacTruth:
            'Frequent mild colds in ages 4–6 usually mean a brand-new immune system is busy learning—not failing. Real sleep, cozy meals, handwashing, and routine checkups with your pediatrician do the real heavy lifting.',
          scienceDeepDive:
            'Pediatric epidemiology data published by the American Academy of Pediatrics confirm that healthy young children in group settings average 8–10 (up to 12) self-limited upper respiratory viral infections annually as adaptive B- and T-cell memory develops. Persistent worry, breathing effort, or unusual patterns should always be evaluated directly by your child’s pediatrician.',
          beat3Kicker: 'Staying grounded & supported',
          beat3Title: 'Making handwashing automatic instead of a battle',
          rehearsalTriggerSpeaker: '{Name} racing straight from preschool pickup to the pantry',
          rehearsalTriggerQuote: '“I ALREADY washed my hands at school! I want crackers NOW!”',
          rehearsalPrompt: 'Which rushed after-school reaction shows up first?',
          instincts: [
            {
              id: 'lecture',
              label: 'Launch into a stressful speech about invisible germs and getting sick again.',
              whyTitle: 'Why that’s so tempting—and what can happen',
              whyText:
                'Protecting health matters! Yet scary germ lectures can spark unnecessary anxiety in imaginative 4-to-6-year-olds.',
            },
            {
              id: 'skip',
              label: 'Let it slide because everyone is tired and hungry.',
              whyTitle: 'Why that’s so tempting—and the easier alternative',
              whyText:
                'Making the “shoes off → soapy bubbles → snack” sequence playful takes 30 seconds and builds a lifelong habit effortlessly.',
            },
          ],
          calmScriptPlain:
            '“Crackers are waiting right on the counter! First let’s wash the playground adventures off our hands—want to make giant soap mittens or sing the fast alphabet?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'yesfirst',
              text: 'Crackers are waiting right on the counter!',
              tag: 'Leads With Yes',
              note: 'Reassures hungry preschoolers that snack is coming right away, lowering instant pushback.',
            },
            { text: ' ' },
            {
              id: 'playful',
              text: 'First let’s wash the playground adventures off our hands—want to make giant soap mittens or sing the fast alphabet?',
              tag: 'Playful Routine, Zero Fear',
              note: 'Builds rock-solid hygiene through fun rather than germ fear.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Keep a sturdy step-stool by the kitchen sink',
            'Pair handwashing directly with arriving home',
            'Never skip calling your pediatrician when intuition flags something off',
          ],
          pushbacks: [
            {
              id: 'toomany',
              label: '“How do I know when frequent illness deserves a pediatrician chat?”',
              setup: 'Always trust your parental instinct—bring a quick calendar note to your doctor anytime you want reassurance:',
              script:
                '“Mild colds that clear up between waves are common, and whenever a cough lingers, energy stays low, or my gut feels uneasy, a quick visit with our pediatrician gives clear answers.”',
            },
            {
              id: 'nosewipe',
              label: '“{Name} hates having {poss} runny nose wiped”',
              setup: 'Hand over agency with soft lotion tissues and a mirror:',
              script:
                '“Scratchy tissues feel awful! Here’s a super-soft puff—want to do a big bunny-blow yourself in the mirror or have me gently dab?”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) just started preschool and seems to catch every cold—what simple daily routines help keep our whole family steadier?”',
          beat4Kicker: 'This week’s simple rhythm',
          beat4Title: 'Pick one easy everyday resilience habit',
          beat4Lead: 'Boring basics beat expensive miracle gimmicks every single time.',
          moves: [
            {
              id: 'doorwash',
              title: 'Anchor “Home Door → Soapy Bubbles → Snack” all week',
              desc: 'Make coming through the front door automatically lead to a cheerful 20-second sink wash.',
            },
            {
              id: 'sleepguard',
              title: 'Protect 11 hours of overnight sleep during sniffle season',
              desc: 'Deep restorative sleep is the single strongest natural immune support a preschooler has.',
            },
            {
              id: 'pedlist',
              title: 'Jot down any pattern questions for your next well-child visit',
              desc: 'Partnering calmly with your pediatrician keeps worry out of 2 AM web searches.',
            },
          ],
          closingNote:
            'Those tissue boxes feel endless in January, yet quietly and reliably {possessive} body is building the resilience that makes next winter so much brighter.',
          pocketInsight:
            '8–10 mild colds a year is normal preschool immune-library building; lean on playful handwashing, deep sleep, and calm check-ins with your pediatrician.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“How do you keep a sick-day preschooler cozy—and make teeth & doctor visits calm all year?”',
            title: 'Sick-Day Comfort & Easy Daily Habits (Teeth, Eyes, Sleep)',
            targetSlug: 'preschool-daycare-viral-comfort',
          },
          interactiveHighlights: ['10-Cold Seasonal Map', 'Playful Hygiene Script'],
        },
      },
      {
        slug: 'preschool-daycare-viral-comfort',
        title: 'Sick-Day Comfort & Easy Daily Habits (Teeth, Eyes, Sleep)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Cozy sick-day nest · Comfort + calm care habits',
          headline: 'Sick-Day Comfort & Easy Daily Habits (Teeth, Eyes, Sleep)',
          deck: 'Simple non-clinical ways to make sniffle days gentler at home—plus how to keep teeth brushing, annual eye checks, and pediatric visits calm and fear-free.',
          sceneTime: '10:00 AM · LIVING ROOM COUCH FORT',
          sceneBody:
            'School called for pickup and {name} is curled up under a quilt, cranky, rejecting plain water, and dreading the idea of even a regular checkup later this month. *How do you keep comfort high without turning every sick day or doctor visit into tears?*',
          pollQuestion: 'Which part of home health routines feels trickiest right now?',
          pollOptions: [
            {
              id: 'fluids',
              label: 'Keeping {obj} cozy & sipping fluids on sick days',
              response:
                'Appetite naturally dips on sniffle days! Fun straws, warm broth, and ice pops make gentle hydration effortless while your doctor handles any medical questions.',
            },
            {
              id: 'checkups',
              label: 'Teeth brushing or nervousness before checkups',
              response:
                'Playing “pretend checkup” on a teddy bear in daylight turns scary unknowns into proud curiosity.',
            },
          ],
          beat2Kicker: 'Calm home comfort & preventive rhythm',
          beat2Title: 'Four simple anchors for sick days and year-round wellbeing',
          beat2Lead:
            'Your role at home is cozy comfort, gentle habits, and partnering cleanly with your pediatric team for all medical advice or dosing. Tap the 4 routines below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-part home comfort & preventive map',
          visualStageHint: 'Tap each anchor from sick-day nest to annual checkups',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Sick Days',
                label: 'Cozy Fluids',
                title: 'Gentle sips + low-pressure rest nest',
                desc: 'Offer tiny frequent sips through a silly straw, warm soup, or fruit popsicles—never force big meals while under the weather.',
                why: 'Small cozy sips keep comfort steady without power struggles.',
              },
              {
                timeOrCue: 'Medical Care',
                label: 'Call Your Team',
                title: 'Zero guessing—lean on your pediatrician early',
                desc: 'Keep your clinic nurse line saved in Favorites; always follow your doctor’s guidance for symptoms, fevers, or any medication dosing.',
                why: 'Clear guidance from your own doctor replaces late-night worry immediately.',
              },
              {
                timeOrCue: 'Daily Habits',
                label: 'Playful Teeth',
                title: 'Two calm minutes of brushing with a timer song',
                desc: 'Take turns “chasing sugar bugs” with a soft brush and pea-sized fluoride paste after morning and bedtime.',
                why: 'Turning brushing into a silly game locks in lifelong dental health.',
              },
              {
                timeOrCue: 'Yearly Rhythm',
                label: 'Eyes & Visits',
                title: 'Outdoor daylight + playful checkup prep',
                desc: 'Protect 45–60 minutes of outdoor play daily for growing eyes, and preview yearly well-child and dental visits with a picture book.',
                why: 'Familiarity turns checkup rooms from scary into proud milestones.',
              },
            ],
          },
          almanacTruth:
            'Great home care isn’t playing doctor—it’s offering cozy rest, gentle sips, joyful daily brushing, and calling your pediatric team promptly whenever medical clarity is needed.',
          scienceDeepDive:
            'Pediatric preventive care guidelines emphasize two high-leverage non-clinical pillars in ages 4–6: daily outdoor daylight exposure (associated with lower childhood myopia risk in randomized school trials) and playful medical-play preparation, which significantly reduces procedural anxiety during routine pediatric and dental checkups.',
          beat3Kicker: 'Practice before the next sick day or checkup',
          beat3Title: 'Replace “Don’t be scared!” with calm curiosity',
          rehearsalTriggerSpeaker: '{Name} clinging to your leg in the waiting room',
          rehearsalTriggerQuote: '“I don’t want the doctor to look in my ears! Let’s go home!”',
          rehearsalPrompt: 'Which well-meaning response accidentally ramps up worry?',
          instincts: [
            {
              id: 'dismiss',
              label: '“Stop crying—it doesn’t hurt at all! Don’t be a baby!”',
              whyTitle: 'Why that’s so tempting—and why kids cling harder',
              whyText:
                'You know the ear light doesn’t hurt! Yet brushing off fear makes a 5-year-old feel unseen—and ramps up resistance.',
            },
            {
              id: 'sneak',
              label: 'Wait until pulling into the parking lot to mention the appointment.',
              whyTitle: 'Why that’s so tempting—and why surprises backfire',
              whyText:
                'Surprises erode trust—while a calm honest preview the morning of lets {name} bring a comfort buddy and feel prepared.',
            },
          ],
          calmScriptPlain:
            '“New rooms feel wiggly in your tummy, huh? The doctor uses a tiny flashlight to peek at how awesome your ears are growing. Want to sit right on my lap and let her shine the light on Teddy’s ear first?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'honest',
              text: 'New rooms feel wiggly in your tummy, huh? The doctor uses a tiny flashlight to peek at how awesome your ears are growing.',
              tag: 'Honest Demystifying',
              note: 'Replaces scary guesswork with concrete, curious images a preschooler understands.',
            },
            { text: ' ' },
            {
              id: 'control',
              text: 'Want to sit right on my lap and let her shine the light on Teddy’s ear first?',
              tag: 'Safe Choice & Anchor',
              note: 'Sitting on your lap while Teddy goes first turns fear into brave partnership.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Preview appointments calmly that morning',
            'Pack a favorite comfort buddy & silly straw',
            'Always follow your pediatrician for medical/dosing decisions',
          ],
          pushbacks: [
            {
              id: 'nofluid',
              label: '“{Name} refuses plain water when feeling crummy”',
              setup: 'Keep it playful and tiny—sips add up fast:',
              script:
                '“Plain cups feel boring when you’re cozy on the couch! Want three tiny dinosaur sips through the bendy straw or a cold fruit popsicle?”',
            },
            {
              id: 'brushing',
              label: '“{Name} clamps {poss} jaw shut at toothbrushing”',
              setup: 'Hand over partial ownership with a silly visual game:',
              script:
                '“You brush the top crocodiles first for ten seconds, then it’s my turn to polish the bottom sharks!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) gets really nervous before routine pediatric and dental checkups—give me a 3-minute pretend-play game to prep {obj} calmly.”',
          beat4Kicker: 'This week’s calm setup',
          beat4Title: 'Pick one easy comfort or habit anchor',
          beat4Lead: 'Setting up calm basics in daylight makes sick days and visits feel effortless.',
          moves: [
            {
              id: 'sickbin',
              title: 'Keep cozy sick-day basics in one easy spot',
              desc: 'Silly straws, soft tissues, a thermometer, and your pediatrician’s after-hours phone number saved in both parents’ phones.',
            },
            {
              id: 'teddyplay',
              title: 'Play a 3-minute “Teddy Checkup” game before the next visit',
              desc: 'Let {name} be the doctor checking Teddy’s ears, heartbeat, and shiny teeth.',
            },
            {
              id: 'outlight',
              title: 'Protect 45 minutes of outdoor daylight play today',
              desc: 'Fresh air and distance vision support growing eyes, steady moods, and deep nighttime sleep.',
            },
          ],
          closingNote:
            'When {name} grows up associating health care with your warm lap, honest previews, and cozy recovery nests, {pronoun} learns to care for {poss} body with calm confidence.',
          pocketInsight:
            'Focus home sick days on cozy rest, playful sips, and prompt calls to your pediatrician—and make checkups and brushing calm through honest previews and play.',
          nextEpisodeHook: null,
          interactiveHighlights: ['4-Part Comfort Map', 'Checkup Prep Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 18: Preschool Sweets, Texture Sensitivity & Family Meals (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'nutrition-preschool-picky-eating',
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    developmentalTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    title: 'Preschool Sweets, Texture Sensitivity & Family Meals',
    reliefSubtitle:
      'Take the obsession out of dessert, understand heightened preschool taste and texture sensitivity, pass family-style bowls, and keep new foods playful',
    tonightQuickWinTitle: 'Episode 1: Serving Dessert Without Turning Sweets Into an Obsession',
    summary:
      'Replace “three bites of broccoli for a cookie” negotiations with calm neutral dessert habits, decode why mixed textures trigger preschool sensory alarms, switch to family-style passing bowls, and build joyful pressure-free taste adventures.',
    coverImageUrl: 'https://assets.alongside.care/academy/nutrition-preschool.png',
    sortOrder: 4,
    episodes: [
      {
        slug: 'preschool-neutral-dessert-pairing',
        title: 'Serving Dessert Without Turning Sweets Into an Obsession',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Neutral dessert · Taking sugar off the pedestal',
          headline: 'Serving Dessert Without Turning Sweets Into an Obsession',
          deck: 'Why trading “three bites of peas for a cookie” accidentally makes kids love cookies more and peas less—and the calm neutral shift that cools sugar fixation.',
          sceneTime: '6:20 PM · DINNER TABLE',
          sceneBody:
            '{Name} barely glances at the pasta before pointing straight at the kitchen counter: “If I eat two peas can I have a cookie? Can I have TWO?” *Every dinner lately has turned into a dessert courtroom negotiation.*',
          pollQuestion: 'Does dessert bargaining dominate dinner at your house?',
          pollOptions: [
            {
              id: 'daily',
              label: 'Yes—every bite gets traded for a treat',
              response:
                'Almost every parent tries the “eat your veggies to earn dessert” deal because it sounds so logical! Seeing how it accidentally elevates sweets is a huge lightbulb moment.',
            },
            {
              id: 'obsessed',
              label: 'Restricting sweets just makes {obj} fixate harder',
              response:
                'That forbidden-fruit effect is real psychology—putting a small predictable portion right beside dinner takes the electric charge off sugar surprisingly fast.',
            },
          ],
          beat2Kicker: 'Why policing sugar backfires',
          beat2Title: 'Take dessert off the pedestal so real hunger can speak',
          beat2Lead:
            'When vegetables are the “chore” and cookies are the “prize,” a 5-year-old brain concludes vegetables must be awful and cookies must be pure gold. Compare both setups below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Reward-policing vs. neutral dessert guardrail',
          visualStageHint: 'Compare both setups to see sugar fixation cool down',
          visualConfig: {
            willpowerLabel: 'Earn-It Bargaining',
            willpowerTitle: '“Three bites of peas = one cookie”',
            willpowerDesc:
              'Making sweets conditional teaches kids to ignore fullness cues, rush past dinner, and view nutrient-dense food as punishment.',
            willpowerOutcome: 'Higher sugar obsession and nightly table negotiations.',
            guardrailLabel: 'Neutral Pairing',
            guardrailTitle: 'Small sweet served neutrally—no bites required',
            guardrailDesc:
              'On nights you choose to serve dessert, place one small portion right alongside dinner with zero fanfare or performance conditions.',
            guardrailOutcome: 'Novelty fades fast—many kids eat half the cookie, then return calmly to dinner.',
            environmentShifts: [
              'Parents still decide WHICH nights include dessert and the portion size.',
              'Never label foods “good/bad” or “healthy vs. junk”—just “foods that help us run, grow, and enjoy.”',
              'Once the small served portion is finished, keep the boundary matter-of-fact: “That’s all the cookies for tonight; more pasta or berries are on the table.”',
            ],
          },
          almanacTruth:
            'When you stop using dessert as a bribe for vegetables, sweets shrink from forbidden treasure back into ordinary food—and vegetables stop feeling like a punishment.',
          scienceDeepDive:
            'Controlled pediatric feeding studies (Birch et al., Child Development) found that children rewarded with sweets for eating vegetables subsequently rated the target vegetables significantly lower in preference and craved the sweet reward more intensely compared to children offered foods neutrally.',
          beat3Kicker: 'Practice before dinner',
          beat3Title: 'Hold the portion limit calmly without moralizing sugar',
          rehearsalTriggerSpeaker: '{Name} finishing the small cookie in 30 seconds flat',
          rehearsalTriggerQuote: '“I ate my cookie FIRST! Now I want ANOTHER cookie!”',
          rehearsalPrompt: 'Which split-second dinner worry jumps up?',
          instincts: [
            {
              id: 'scold',
              label: '“See?! You didn’t even touch your chicken! No more cookies all week!”',
              whyTitle: 'Why that’s so tempting—and why it intensifies craving',
              whyText:
                'Watching the cookie vanish first feels alarming! Yet taking sweets away in frustration reinforces scarcity—making {name} inhale treats twice as fast next time.',
            },
            {
              id: 'cave',
              label: 'Hand over a second cookie if {pronoun} promises to take four bites of chicken.',
              whyTitle: 'Why that’s so tempting—and what restarts',
              whyText:
                'Re-opening the bite-for-cookie market immediately brings back nightly courtroom haggling.',
            },
          ],
          calmScriptPlain:
            '“Mmm, that cookie hit the spot! One cookie is all we’re serving tonight. There’s warm pasta, meatballs, and berries right here if your belly wants more.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'neutral',
              text: 'Mmm, that cookie hit the spot! One cookie is all we’re serving tonight.',
              tag: 'Calm & Unbothered',
              note: 'Zero guilt, zero pedestal, and zero negotiation on the portion boundary.',
            },
            { text: ' ' },
            {
              id: 'redirect',
              text: 'There’s warm pasta, meatballs, and berries right here if your belly wants more.',
              tag: 'Trusts Appetite',
              note: 'Once the cookie excitement settles, most preschoolers casually turn back to eating dinner.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Serve dessert neutrally 2–3 nights a week, not necessarily every night',
            'Resist watching which food {pronoun} {eats} first',
            'Hold the 1-portion boundary like weather—warm and final',
          ],
          pushbacks: [
            {
              id: 'nonight',
              label: '“What about nights we aren’t serving dessert at all?”',
              setup: 'Keep it breezy and matter-of-fact without mentioning sugar rules:',
              script:
                '“Cookies aren’t on the menu tonight—we’re having tacos and watermelon! We’ll have cookies again on Friday.”',
            },
            {
              id: 'grandma',
              label: '“What if relatives still say ‘Finish your plate for ice cream’?”',
              setup: 'Give a light one-liner beforehand so everyone stays relaxed:',
              script:
                '“We’re trying a fun experiment where dessert isn’t tied to finishing dinner—it’s cut our mealtime battles in half!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) asks for sweets constantly—how do I transition to neutral dessert pairing without chaos the first week?”',
          beat4Kicker: 'This week’s calm table shift',
          beat4Title: 'Pick one easy move to cool sugar battles',
          beat4Lead: 'Expect two nights of novelty—then watch the obsession noticeably soften.',
          moves: [
            {
              id: 'servewith',
              title: 'Try serving one small sweet right alongside dinner twice this week',
              desc: 'Place it on the plate with zero commentary—resist policing the order {name} eats in.',
            },
            {
              id: 'retirebribe',
              title: 'Retire “Eat X to earn dessert” for seven full days',
              desc: 'Notice how much warmer dinner feels when nobody is counting peas.',
            },
            {
              id: 'dropmoral',
              title: 'Drop “junk food” labels in favor of neutral food names',
              desc: 'Call it “a cookie” or “ice cream”—ordinary words keep food calm and uncharged.',
            },
          ],
          closingNote:
            'Children who learn to enjoy a small cookie without guilt or urgency grow into adults who can leave half a brownie on the plate without a second thought.',
          pocketInsight:
            'Stop trading bites for sweets: serve one small portion neutrally alongside dinner on chosen nights and hold the portion boundary warmly.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Why does a 5-year-old love crunchy raw carrots yet gag instantly on cooked mushy ones?”',
            title: 'Why Textures & Mixed Foods Feel Overwhelming at Age Five',
            targetSlug: 'preschool-taste-bud-proliferation',
          },
          interactiveHighlights: ['Neutral Guardrail Flip', 'Zero-Bargaining Script'],
        },
      },
      {
        slug: 'preschool-taste-bud-proliferation',
        title: 'Why Textures & Mixed Foods Feel Overwhelming at Age Five',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.leaf,
          illustrationCaption: 'Super-taster tongue · Why mixed textures feel loud',
          headline: 'Why Textures & Mixed Foods Feel Overwhelming at Age Five',
          deck: 'Why your preschooler happily eats plain chicken, plain rice, and raw peppers—yet refuses the exact same ingredients stirred into one casserole.',
          sceneTime: '6:05 PM · FAMILY DINNER',
          sceneBody:
            'You made a cozy stir-fry with foods {name} normally likes. One glance at the glossy sauce touching the rice and {pronoun} recoils: “The foods are TOUCHING! It’s slimy!” *You sigh—it’s literally the exact same ingredients as Tuesday!*',
          pollQuestion: 'Does your preschooler strongly prefer “deconstructed” or crunchy foods?',
          pollOptions: [
            {
              id: 'separate',
              label: 'Yes—nothing can touch or have mystery sauce',
              response:
                'Totally biological! Young children have denser taste-bud papillae and hyper-alert texture detectors—unpredictable mixed bowls trigger genuine sensory overload.',
            },
            {
              id: 'mushy',
              label: 'Crunchy foods pass, soft/wet foods get rejected',
              response:
                'Crunch is predictable in the mouth; squishy or slippery textures shift unexpectedly, making cautious brains wary.',
            },
          ],
          beat2Kicker: 'Inside {possessive} sensory world',
          beat2Title: 'Deconstructing the family meal builds texture bravery step by step',
          beat2Lead:
            'You never need to cook a separate kid meal—simply serving a few ingredients side-by-side before saucing lets {possessive} mouth learn textures safely. Tap the 5 texture steps below.',
          visualType: AlmanacVisualType.SENSORY_LADDER,
          visualStageTitle: '5 steps from separate crunch to mixed family dishes',
          visualStageHint: 'Tap each rung to see texture confidence grow',
          visualConfig: {
            steps: [
              {
                label: 'Crisp',
                title: '1. Predictable crunchy single foods',
                desc: 'Raw cucumber coins, toasted pita, or crisp roasted broccoli edges feel consistent on every bite.',
                tag: 'Step 1 · Predictable bite',
              },
              {
                label: 'Side-by-Side',
                title: '2. Deconstructed family meal (nothing touching)',
                desc: 'Scoop plain rice, plain chicken, and raw veggie sticks onto one plate BEFORE stirring sauce into the main pan.',
                tag: 'Step 2 · Zero short-order cooking',
              },
              {
                label: 'Dip Cup',
                title: '3. Sauce served on the side as a playful dip',
                desc: 'Putting teriyaki, marinara, or yogurt ranch in a tiny dip bowl lets {name} control the exact wetness.',
                tag: 'Step 3 · Child-controlled moisture',
              },
              {
                label: 'Sprinkle',
                title: '4. Tiny voluntary mix-ins',
                desc: 'Invite {name} to sprinkle three shreds of cheese or a tiny spoon of sauce onto {poss} own noodles.',
                tag: 'Step 4 · Self-chosen blend',
              },
              {
                label: 'Mixed Dish',
                title: '5. Comfortable with combined casseroles & soups',
                desc: 'As oral sensory tolerance matures across ages 5–7, mixed dishes stop feeling mysterious.',
                tag: 'Step 5 · Graduated palate',
              },
            ],
          },
          almanacTruth:
            'Serving the same family dinner deconstructed—plain ingredients set aside with sauce in a dip cup—honors preschool sensory biology with zero extra cooking.',
          scienceDeepDive:
            'Pediatric sensory-feeding research (Mennella et al., Monell Chemical Senses Center) demonstrates that children exhibit higher fungiform papillae density and stronger bitter/textural sensitivity than adults, making unpredictable mixed consistencies genuinely intense rather than merely willful.',
          beat3Kicker: 'Practice at the table',
          beat3Title: 'Respect texture alarms without cooking a second dinner',
          rehearsalTriggerSpeaker: '{Name} staring at a bowl of pasta with red sauce',
          rehearsalTriggerQuote: '“Ew! There’s a green leaf in the red sauce! Make me butter noodles instead!”',
          rehearsalPrompt: 'Which tired dinner reaction is hardest to skip?',
          instincts: [
            {
              id: 'force',
              label: '“That’s just basil! Stop being dramatic and eat it!”',
              whyTitle: 'Why that’s so tempting—and what happens in {poss} mouth',
              whyText:
                'To an adult eye it’s a speck of herb; to a sensitive 5-year-old it feels like an unexpected bug on dinner—pushing harder spikes gagging and refusal.',
            },
            {
              id: 'shortorder',
              label: 'Sigh, stand up, and boil a brand-new pot of plain butter noodles.',
              whyTitle: 'Why that’s so tempting—and why it traps you',
              whyText:
                'Cooking a second meal ends tonight’s tears, yet teaches {name} that protesting loud enough unlocks custom chef service.',
            },
          ],
          calmScriptPlain:
            '“Good eye—that green speck is basil, and you don’t like surprises mixed into sauce! I set aside a scoop of plain noodles and sauce in a dip cup before I mixed ours—want to dip or keep them separate?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'validate',
              text: 'Good eye—that green speck is basil, and you don’t like surprises mixed into sauce!',
              tag: 'Validates Sensory Reality',
              note: 'Replaces “dramatic” shame with calm understanding of why surprises feel big.',
            },
            { text: ' ' },
            {
              id: 'deconstruct',
              text: 'I set aside a scoop of plain noodles and sauce in a dip cup before I mixed ours—want to dip or keep them separate?',
              tag: 'Smart Deconstruction',
              note: 'Same dinner, zero extra pots, and instant calm control for {name}.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Scoop a tiny plain portion BEFORE adding sauces or herbs',
            'Use small ramekins for playful dipping',
            'Describe textures neutrally (“crunchy, warm, soft”) instead of “yummy”',
          ],
          pushbacks: [
            {
              id: 'forgotplain',
              label: '“What if I already mixed everything together tonight?”',
              setup: 'Lean on your one safe side anchor (bread, fruit, yogurt) calmly without cooking a second entree:',
              script:
                '“Tonight’s soup is already mixed, so you don’t have to eat it—we have warm toast and sliced apples right on the table to fill your belly!”',
            },
            {
              id: 'texturestuck',
              label: '“What if {name} gags on almost all textures?”',
              setup: 'Stay warm and note that extreme texture avoidance is always worth mentioning at a regular checkup:',
              script:
                '“If sensory struggles shrink {possessive} accepted list below 15–20 foods, our pediatrician or a playful pediatric feeding therapist can give tailored support.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) hates foods touching or anything saucy—give me 5 easy family dinners I can deconstruct in 30 seconds without extra cooking.”',
          beat4Kicker: 'This week’s kitchen shortcut',
          beat4Title: 'Pick one zero-extra-work texture bridge',
          beat4Lead: 'Save your cooking energy while honoring how {possessive} palate is wired.',
          moves: [
            {
              id: 'scoopbefore',
              title: 'Scoop out {possessive} plain portion BEFORE pouring sauce in the pan',
              desc: 'Works effortlessly for pasta, stir-fry, tacos, grain bowls, and curry.',
            },
            {
              id: 'dipcup',
              title: 'Serve one sauce or dressing in a tiny fun dip cup this week',
              desc: 'Kids dip ten times more willingly than they eat pre-coated food.',
            },
            {
              id: 'roastcrisp',
              title: 'Try roasting one veggie extra crisp instead of steaming it soft',
              desc: 'Crunchy roasted broccoli or carrot fries often win over texture-sensitive preschoolers fast.',
            },
          ],
          closingNote:
            'Honoring {possessive} sensitive palate with simple deconstructed plates isn’t spoiling {obj}—it’s giving {poss} taste buds a calm runway to grow up.',
          pocketInsight:
            'Serve the same family dinner deconstructed (scoop plain ingredients before saucing + offer sauce in a dip cup) to beat texture overload with zero extra cooking.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“How does letting a 5-year-old scoop from shared bowls transform picky dinners?”',
            title: 'Family-Style Bowls: Ending Short-Order Cooking for Good',
            targetSlug: 'preschool-family-style-dining',
          },
          interactiveHighlights: ['5-Step Texture Ladder', 'Deconstruction Script'],
        },
      },
      {
        slug: 'preschool-family-style-dining',
        title: 'Family-Style Bowls: Ending Short-Order Cooking for Good',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Shared table bowls · Passing autonomy around',
          headline: 'Family-Style Bowls: Ending Short-Order Cooking for Good',
          deck: 'Why pre-plated dinners spark instant “I didn’t ask for THAT!” protests—and how putting bowls in the center of the table turns reluctant eaters into proud choosers.',
          sceneTime: '6:00 PM · DINING TABLE',
          sceneBody:
            'You set down a beautifully balanced plate you portioned yourself. Instantly {name} crosses {poss} arms: “That’s TOO MUCH chicken! Take the peas OFF!” *You haven’t even sat down yet and you’re already editing plates.*',
          pollQuestion: 'Do pre-plated portions trigger pushback before anyone takes a bite?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes—one unwanted scoop ruins the whole plate',
              response:
                'Handing {name} the serving spoon from shared table bowls flips the script instantly—suddenly {pronoun} feels like a grown-up building {poss} own plate.',
            },
            {
              id: 'mess',
              label: 'I’m worried self-serving will be messy or only bread',
              response:
                'Using kid-sized tongs and keeping one calm “learning bowl” on the table keeps spills tiny—and watching you scoop veggies builds natural curiosity.',
            },
          ],
          beat2Kicker: 'The table rhythm reset',
          beat2Title: 'Four easy steps to effortless family-style meals',
          beat2Lead:
            'When food lives in shared bowls in the center of the table, you still choose the menu—while {name} builds real agency and portion awareness. Tap each beat below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-step family-style table routine',
          visualStageHint: 'Tap each step to hand back mealtime ownership',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Step 1 · Setup',
                label: 'Center Bowls',
                title: 'Put 3–4 simple components in the middle of the table',
                desc: 'One protein, one carb/safe anchor, one veggie or fruit—served in bowls instead of pre-loaded in the kitchen.',
                why: 'Seeing everything calmly in the center removes surprise-plate panic.',
              },
              {
                timeOrCue: 'Step 2 · Tools',
                label: 'Kid Tongs',
                title: 'Give {name} mini tongs or a small ladle',
                desc: 'Let {name} scoop {poss} own portion—even if it’s just one tiny pea or zero peas tonight.',
                why: 'Motor pride makes serving feel like an exciting big-kid job.',
              },
              {
                timeOrCue: 'Step 3 · Model',
                label: 'Eat Your Own',
                title: 'Enjoy your own colorful plate with zero commentary',
                desc: 'Chat about the day instead of staring at {possessive} fork.',
                why: 'Preschoolers imitate calm adult enjoyment far more than adult persuasion.',
              },
              {
                timeOrCue: 'Step 4 · Seconds',
                label: 'Calm Refills',
                title: 'Refill any bowl neutrally while food lasts',
                desc: 'If the bread runs out, say calmly: “The bread bowl is empty—there’s plenty of chicken and berries left.”',
                why: 'Neutral limits teach real household sharing without food policing.',
              },
            ],
          },
          almanacTruth:
            'A preschooler who scoops two green beans onto {poss} own plate with mini tongs is infinitely more likely to taste one than a child handed a pre-loaded plate.',
          scienceDeepDive:
            'Child nutrition trials (Harnack et al.; Ellyn Satter Institute) show that family-style dining improves children’s self-regulation of energy intake, increases willingness to self-serve novel fruits and vegetables, and measurably reduces mealtime conflict.',
          beat3Kicker: 'Practice at the table',
          beat3Title: 'Handle “I ONLY want garlic bread!” with zero tension',
          rehearsalTriggerSpeaker: '{Name} piling four pieces of garlic bread onto {poss} plate',
          rehearsalTriggerQuote: '“I’m ONLY eating bread tonight! I don’t want ANYTHING else!”',
          rehearsalPrompt: 'Which automatic parent reaction jumps in?',
          instincts: [
            {
              id: 'gatekeep',
              label: '“Put two pieces back! You can’t have more bread until you eat five bites of chili!”',
              whyTitle: 'Why that’s so tempting—and what happens next',
              whyText:
                'Wanting balanced nutrition is caring! Yet gatekeeping bread makes bread feel scarce and exciting—locking both of you into a battle.',
            },
            {
              id: 'hover',
              label: 'Keep offering “Just try ONE spoon of chili for mommy!” every two minutes.',
              whyTitle: 'Why that’s so tempting—and why kids shut down',
              whyText:
                'Repeated gentle nudges still register as spotlight pressure, shutting down genuine appetite curiosity.',
            },
          ],
          calmScriptPlain:
            '“Looks like garlic bread sounds super cozy tonight! Take two pieces to start so everyone gets some first—once we’ve all passed the basket, you’re welcome to more if there’s extra.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'warm',
              text: 'Looks like garlic bread sounds super cozy tonight!',
              tag: 'Zero Bread Shame',
              note: 'Keeps bread neutral and ordinary so {name} doesn’t feel policed.',
            },
            { text: ' ' },
            {
              id: 'family',
              text: 'Take two pieces to start so everyone gets some first—once we’ve all passed the basket, you’re welcome to more if there’s extra.',
              tag: 'Fair Family Norm',
              note: 'Holds considerate family-table etiquette cleanly without tying bread to eating chili.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Pass every bowl to {name}—even ones {pronoun} usually skips',
            'Accept a polite “No thank you” warmly',
            'Keep mealtime talk off food and onto fun stories',
          ],
          pushbacks: [
            {
              id: 'skipsall',
              label: '“{Name} says ‘No thank you’ to every single bowl”',
              setup: 'Stay totally relaxed—missing one meal won’t harm a healthy preschooler:',
              script:
                '“Sounds like your belly isn’t hungry right now! You don’t have to eat—just hang out and tell us about your painting while we finish.”',
            },
            {
              id: 'spills',
              label: '“{Pronoun} spills soup trying to ladle it”',
              setup: 'Hand over a towel matter-of-factly and guide the ladle together next time:',
              script:
                '“Oops, slippery soup! Let’s wipe it together—next scoop I’ll steady the bowl while you steer the ladle.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) only takes bread when we try family-style bowls—how do I stay calm and know {pronoun} {is} getting enough over a whole week?”',
          beat4Kicker: 'Tonight’s easy swap',
          beat4Title: 'Pick one small family-style experiment',
          beat4Lead: 'You don’t need fancy platters—regular pots on trivets work great.',
          moves: [
            {
              id: 'tongs',
              title: 'Put mini tongs in one side dish tonight and let {name} self-serve',
              desc: 'Start with something fun and easy to grip like apple slices, pasta, or roasted broccoli.',
            },
            {
              id: 'passall',
              title: 'Pass EVERY bowl past {name} with zero expectation',
              desc: 'Simply passing the salad bowl to Dad counts as a calm zero-pressure exposure!',
            },
            {
              id: 'funq',
              title: 'Ask one silly dinner question instead of talking about bites',
              desc: '“If our dog could talk for five minutes, what would he complain about?”',
            },
          ],
          closingNote:
            'When dinner shifts from policing plates to passing bowls and sharing laughs, {name} learns that the family table is the warmest place in the house.',
          pocketInsight:
            'Serve dinner in shared center bowls with kid-sized tongs—pass everything neutrally, model enjoying your own meal, and keep conversation warm.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery: '“How can playful food games away from dinner help a cautious 5-year-old try new foods?”',
            title: 'Playful Taste Adventures Without Dinner Pressure',
            targetSlug: 'preschool-gentle-food-adventures',
          },
          interactiveHighlights: ['4-Step Table Routine', 'Family-Style Script'],
        },
      },
      {
        slug: 'preschool-gentle-food-adventures',
        title: 'Playful Taste Adventures Without Dinner Pressure',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.leaf,
          illustrationCaption: 'Food scientist play · Curiosity beats coercion',
          headline: 'Playful Taste Adventures Without Dinner Pressure',
          deck: 'Why cautious preschoolers rarely fall in love with a new food under 6 PM spotlight pressure—and how low-stakes “food scientist” games unlock genuine curiosity.',
          sceneTime: '3:30 PM · SUNNY AFTERNOON SNACK',
          sceneBody:
            'You hand {name} a tiny wedge of snap pea on a fun snack tray with zero dinner expectations. Instead of saying “Eat it,” you ask if {pronoun} thinks it makes a louder crunch than a pretzel. *Eyes widen—suddenly {pronoun} bites the tip just to test the sound.*',
          pollQuestion: 'Does {name} seem braver around new foods when nobody is watching?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes—{pronoun} tries way more at preschool or snack time!',
              response:
                'Because 6 PM is tired time AND spotlight time! Playful afternoon curiosity bypasses defensive caution completely.',
            },
            {
              id: 'stuck',
              label: 'Still super cautious even at snack time',
              response:
                'Every tiny sensory rep—sniffing, snapping, comparing crunch—banks real familiarity even when zero bites happen yet.',
            },
          ],
          beat2Kicker: 'Growing adventurous palates',
          beat2Title: 'Curiosity grows over 10–15 relaxed exposures—not 1 tense night',
          beat2Lead:
            'Flip the lens from “testing if {pronoun} likes it” to “playing food scientist,” then tap through relaxed exposures below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Dinner-test lens vs. food-scientist lens',
          visualStageHint: 'Flip lenses, then tap relaxed exposures 1–12',
          visualConfig: {
            adultLabel: 'Pass/Fail dinner lens',
            adultQuote: '“{Pronoun} spit it out once—I guess {pronoun} hates snap peas forever!”',
            adultSub: 'Treating a single hesitant nibble as a permanent verdict stops us from casually offering the food again.',
            childLabel: 'Food-scientist lens',
            childQuote: '“Let’s hear how loud it crunches—and I’m allowed to spit it in a napkin if it’s too strong!”',
            childSub: 'Knowing a “polite napkin exit” is always allowed removes fear and invites brave little licks and nibbles.',
            exposureHeading: 'The 12-adventure curiosity map',
            exposureSub: 'Tap exposures 1–12 to watch caution melt',
            totalDots: 12,
            defaultCount: 4,
            unitLabel: 'adventure',
            lowMax: 4,
            midMax: 8,
            lowMsg: 'Adventures 1–4: Exploring color, snap sound, and smell at snack time builds total comfort.',
            midMsg: 'Adventures 5–8: Playful “crunch tests” and licking the tip happen spontaneously when spitting into a napkin is allowed.',
            highMsg: 'Adventures 9–12: One ordinary afternoon {name} pops the whole piece in calmly—genuine new favorite unlocked!',
          },
          almanacTruth:
            'Giving {name} explicit permission to spit an unfamiliar taste politely into a napkin removes the trap—and paradoxically makes kids twice as willing to try.',
          scienceDeepDive:
            'Sensory play interventions in preschool populations (Nekitsing et al.; Coulthard & Sealy) demonstrate that non-taste sensory engagement (touching, snapping, smelling, and rating crunch) significantly increases subsequent vegetable intake compared to verbal encouragement alone.',
          beat3Kicker: 'Practice at snack time',
          beat3Title: 'Invite playful exploration with a guaranteed exit ramp',
          rehearsalTriggerSpeaker: '{Name} eyeing a bright yellow bell pepper strip suspiciously',
          rehearsalTriggerQuote: '“What if I bite it and it tastes GROSS in my mouth?!”',
          rehearsalPrompt: 'Which reassuring answer actually backfires?',
          instincts: [
            {
              id: 'promise',
              label: '“I promise it’s delicious! You’re going to LOVE it, just swallow it!”',
              whyTitle: 'Why that’s so tempting—and why kids pull back',
              whyText:
                'If it tastes weird to {poss} super-taster tongue after you promised “delicious,” {pronoun} feels tricked and refuses future experiments.',
            },
            {
              id: 'disappointed',
              label: 'Look visibly deflated when {pronoun} puts it right back down.',
              whyTitle: 'Why that’s so tempting—and what kids read',
              whyText:
                'Preschoolers are radar dishes for parental disappointment—keeping your energy breezy keeps curiosity alive.',
            },
          ],
          calmScriptPlain:
            '“Totally fair question! Yellow peppers are crisp and a tiny bit sweet. If you want to test the crunch, here’s a napkin right beside you—you can always spit it out if your mouth says ‘not today!’”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'honestdesc',
              text: 'Totally fair question! Yellow peppers are crisp and a tiny bit sweet.',
              tag: 'Honest Sensory Facts',
              note: 'Describes real texture and flavor accurately instead of overselling “yummy!”',
            },
            { text: ' ' },
            {
              id: 'exitramp',
              text: 'If you want to test the crunch, here’s a napkin right beside you—you can always spit it out if your mouth says ‘not today!’',
              tag: 'Safe Exit Ramp',
              note: 'Knowing {pronoun} isn’t trapped swallowing a strange flavor unlocks brave first nibbles.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Run taste games at relaxed snack time, not tired 6 PM dinners',
            'Teach the calm “polite napkin spit” early',
            'Never cheer excessively—keep reactions warmly matter-of-fact',
          ],
          pushbacks: [
            {
              id: 'spits',
              label: '“{Name} licks it, makes a face, and puts it in the napkin”',
              setup: 'Celebrate the brave scientist curiosity without pushing for a second bite:',
              script:
                '“Nice experimenting! Your tongue met yellow pepper today—maybe it’ll taste different next month when your taste buds grow.”',
            },
            {
              id: 'noplay',
              label: '“{Pronoun} doesn’t even want to touch it today”',
              setup: 'Move on lightly with zero disappointment:',
              script:
                '“No problem at all! I’ll crunch mine—tell me if you think it sounds louder than a cracker!”',
            },
          ],
          advisorPrompt:
            '“Give me 5 quick playful ‘food scientist’ games for a {ageShort} who is cautious about new fruits and vegetables.”',
          beat4Kicker: 'This week’s tiny adventure',
          beat4Title: 'Pick one playful food-scientist game',
          beat4Lead: 'Zero pressure, two minutes, maximum curiosity.',
          moves: [
            {
              id: 'crunchmeter',
              title: 'Play the “Crunch Meter” at afternoon snack',
              desc: 'Compare the crunch volume of a cracker vs. a cucumber coin or snap pea on a scale of 1 to 10.',
            },
            {
              id: 'napkinrule',
              title: 'Introduce the “Polite Napkin Exit” rule cheerfully',
              desc: 'Show {name} how grown-up food tasters gently tuck a bite into a napkin if their mouth isn’t ready.',
            },
            {
              id: 'grocerypick',
              title: 'Let {name} pick one new colorful produce item at the store',
              desc: 'Holding ownership from the grocery cart makes washing and tasting it at home ten times more exciting.',
            },
          ],
          closingNote:
            'An adventurous eater isn’t built by forcing clean plates—it’s built by raising a child who trusts {poss} own mouth and feels safe being curious.',
          pocketInsight:
            'Move taste experiments to relaxed snack time, describe honest textures (“crisp, juicy”), and offer a polite napkin exit ramp.',
          nextEpisodeHook: null,
          interactiveHighlights: ['12-Adventure Curiosity Map', 'Food Scientist Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 19: Self-Control Games, Outdoor Play & School Readiness (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'play-preschool-executive-function',
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    developmentalTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    title: 'Self-Control Games, Outdoor Play & School Readiness',
    reliefSubtitle:
      'Build real impulse brakes through silly freeze games, see why pretend play beats flashcards for kindergarten, and grow grit and hand strength outdoors',
    tonightQuickWinTitle: 'Episode 1: Freeze Dance & Stop-Go Games That Build Real Self-Control',
    summary:
      'Train preschool inhibitory control through joyful movement games, unpack how imaginative roleplay builds deeper school readiness than worksheets, and combine outdoor loose-parts exploration with natural fine-motor strength.',
    coverImageUrl: 'https://assets.alongside.care/academy/play-preschool.png',
    sortOrder: 4,
    episodes: [
      {
        slug: 'preschool-freeze-dance-inhibitory-control',
        title: 'Freeze Dance & Stop-Go Games That Build Real Self-Control',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Stop-go games · Joyful brain-brake workouts',
          headline: 'Freeze Dance & Stop-Go Games That Build Real Self-Control',
          deck: 'Why lecturing a 5-year-old to “sit still and listen!” rarely works—and how five silly minutes of Freeze Dance literally trains the brain’s stop-signal muscles.',
          sceneTime: '4:00 PM · LIVING ROOM FLOOR',
          sceneBody:
            'You asked {name} to wait two seconds while you buckled {poss} shoes, yet {poss} feet are already bouncing off the couch like springs. *Sometimes you wonder: how will {pronoun} ever sit in kindergarten circle time?*',
          pollQuestion: 'Does {name} have a super fast “go” pedal and a tiny “stop” pedal?',
          pollOptions: [
            {
              id: 'fastgo',
              label: 'Yes—pure turbo energy all day long!',
              response:
                'You’re watching normal preschool motor drive! Self-control isn’t trained by scolding kids to sit still—it’s built like a muscle through playful stop-and-go games.',
            },
            {
              id: 'impulse',
              label: 'Struggles mostly with blurting out or waiting turns',
              response:
                'Waiting and stopping are executive-function workouts—practicing them while giggling makes real-life pauses way easier.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing brain',
          beat2Title: 'Playful “stop” signals build the exact brakes school needs',
          beat2Lead:
            'Every time {name} freezes mid-leap when the music stops, {poss} prefrontal cortex fires an active “override” signal—strengthening real impulse brakes while laughing. Toggle both states below.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Pure momentum vs. practicing the stop brake',
          visualStageHint: 'Toggle full-speed go vs. playful freeze brake',
          visualConfig: {
            calmToggleLabel: 'Freeze-Brake Engaged',
            stormToggleLabel: 'Unchecked Momentum',
            calmStatus: 'INHIBITORY BRAKE MUSCLE GROWING',
            stormStatus: 'HIGH MOTOR DRIVE · LOW BRAKES',
            calmReadouts: [
              {
                name: 'Prefrontal Stop Switch',
                value: 'Flexing & Wiring',
                tone: 'spruce',
                desc: 'Freezing on cue practices holding an impulse back—the exact skill needed for waiting in line and keeping hands safe.',
              },
              {
                name: 'Emotional Fuel',
                value: 'Joyful Dopamine',
                tone: 'spruce',
                desc: 'Laughter makes repetitions stick 10x better than scolding or sitting in timeout.',
              },
            ],
            stormReadouts: [
              {
                name: 'Motor Energy',
                value: 'Full Throttle',
                tone: 'amber',
                desc: 'Preschool bodies are biologically built to move—demanding stillness without practice drains everyone.',
              },
              {
                name: 'Verbal Reminders',
                value: 'Quickly Forgotten',
                tone: 'amber',
                desc: '“Calm down and sit still!” tells a child what NOT to do without training the stop brake.',
              },
            ],
          },
          almanacTruth:
            'Five minutes of giggling through Freeze Dance or Red-Light-Green-Light builds stronger real-world self-control than fifty reminders to “behave and sit still.”',
          scienceDeepDive:
            'Randomized preschool trials (Tominey & McClelland, Early Education & Development) demonstrated that short group stop-go movement games (Freeze Dance, Head-Toes-Knees-Shoulders) significantly boost behavioral self-regulation and early kindergarten readiness.',
          beat3Kicker: 'Practice in 5 minutes',
          beat3Title: 'Turn waiting moments into quick brake-building games',
          rehearsalTriggerSpeaker: '{Name} darting toward the parking lot curb ahead of you',
          rehearsalTriggerQuote: '“Watch how FAST I can run! You can’t catch me!”',
          rehearsalPrompt: 'Which frantic reflex kicks in—and how do we build a reflex that actually stops feet?',
          instincts: [
            {
              id: 'nag',
              label: '“How many times have I told you to WALK?! You NEVER listen!”',
              whyTitle: 'Why that’s so tempting—and what happens next',
              whyText:
                'Parking lot fear spikes parent adrenaline instantly! Yet shaming “you never listen” doesn’t build a fast physical stopping reflex.',
            },
            {
              id: 'lecture',
              label: 'Deliver a long roadside lecture about cars while {name} squirms.',
              whyTitle: 'Why that’s so tempting—and what works faster',
              whyText:
                'Practicing a joyful physical “FREEZE!” game in the yard wires an instant automatic foot-brake you can actually use in public.',
            },
          ],
          calmScriptPlain:
            '“(Warm clear game voice) FREEZE statue! Whoa, look at those awesome brakes—your feet stopped right on the sidewalk crack! Now slow-motion astronaut walk to the car door together.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'cue',
              text: 'FREEZE statue! Whoa, look at those awesome brakes—your feet stopped right on the sidewalk crack!',
              tag: 'Activates Practiced Brake',
              note: 'Taps straight into a joyful muscle-memory game so {name} stops with pride instead of defiance.',
            },
            { text: ' ' },
            {
              id: 'channel',
              text: 'Now slow-motion astronaut walk to the car door together.',
              tag: 'Channels Movement Safely',
              note: 'Gives wiggly legs a concrete silly job instead of just saying “don’t run.”',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Exaggerate your own funny wobbles when freezing',
            'Praise effort and strategy (“You watched so closely!”)',
            'Level up later by swapping rules (“Red = dance, Green = freeze!”)',
          ],
          pushbacks: [
            {
              id: 'doesntstop',
              label: '“{Name} giggles and keeps running past ‘Freeze’”',
              setup: 'Catch {obj} gently with a smile and hold hands cleanly:',
              script:
                '“Oops, turbo rockets won that round! In parking lots hands always hold mine—we’ll practice Freeze Brakes again on the grass.”',
            },
            {
              id: 'frustrated',
              label: '“{Pronoun} gets upset when {pronoun} wobbles during the game”',
              setup: 'Model growth mindset cheerfully—wobbling IS how brains grow:',
              script:
                '“Whoa, I wobbled too! Every time you catch a wobble, your brain’s brake muscles get a tiny bit stronger—you just haven’t mastered it YET!”',
            },
          ],
          advisorPrompt:
            '“Give me 5 quick zero-prep stop-and-go games to build impulse control and waiting skills with a {ageShort}.”',
          beat4Kicker: 'Today’s 5-minute brain workout',
          beat4Title: 'Pick one stop-go game to play this week',
          beat4Lead: 'Zero props, huge giggles, real prefrontal wiring.',
          moves: [
            {
              id: 'freezedance',
              title: 'Play one 3-minute song of Freeze Dance before dinner',
              desc: 'Pause the music randomly and freeze in goofy animal statues together.',
            },
            {
              id: 'opposite',
              title: 'Try “Silly Opposites” (Touch head when I say toes!)',
              desc: 'Fantastic 2-minute challenge for ages 5–6 that fires working memory and self-control together.',
            },
            {
              id: 'yetword',
              title: 'Add the word “yet” once when something feels tricky',
              desc: '“You haven’t nailed tying that knot YET—watch how close your fingers just got!”',
            },
          ],
          closingNote:
            'Self-control doesn’t grow from sitting stiffly in silence—it grows inside joyful movement, silly statues, and celebrating every wobble along the way.',
          pocketInsight:
            'Play 5-minute stop-go games (Freeze Dance, Red-Light-Green-Light, Silly Opposites) to wire real impulse brakes joyfully.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Wait—why do kindergarten teachers prefer kids who played pretend over kids drilled on flashcards?”',
            title: 'Why Pretend Play Beats Worksheets for Kindergarten Readiness',
            targetSlug: 'preschool-executive-function-circuitry',
          },
          interactiveHighlights: ['Brake-Toggle Brain Stage', 'Playful Freeze Cue'],
        },
      },
      {
        slug: 'preschool-executive-function-circuitry',
        title: 'Why Pretend Play Beats Worksheets for Kindergarten Readiness',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Pretend café · Executive function in disguise',
          headline: 'Why Pretend Play Beats Worksheets for Kindergarten Readiness',
          deck: 'Why running a make-believe bakery or vet clinic wires deeper focus, planning, and reading readiness than tracing letter sheets ever could.',
          sceneTime: '11:15 AM · LIVING ROOM CAFÉ',
          sceneBody:
            'You bought a shiny preschool workbook to make sure {name} stays “on track.” Ten minutes in, both of you are tense—yet when you step away, {name} spends forty rapt minutes setting up a pretend pizza shop, taking orders, and counting couch-cushion “dollars.” *Wait—is that real learning?*',
          pollQuestion: 'Do you ever feel quiet pressure to do more academic drills before kindergarten?',
          pollOptions: [
            {
              id: 'pressure',
              label: 'Yes—everyone talks about early reading & math apps',
              response:
                'Modern kindergarten pressure is real! Yet neuroscience consistently shows self-regulation, curiosity, and rich pretend play predict third-grade reading and math far better than early flashcards.',
            },
            {
              id: 'pretend',
              label: 'My kid LOVES pretend play—I’m glad it counts!',
              response:
                'Not only does it count—pretend play is literally the heavyweight gym of early executive function!',
            },
          ],
          beat2Kicker: 'Inside imaginative play',
          beat2Title: 'How stepping into {possessive} story stretches real brain power',
          beat2Lead:
            'Holding a pretend role (“I’m the chef, not myself!”), juggling rules, and negotiating a storyline lights up working memory, planning, and social empathy all at once. Tap the 3 play-coaching beats below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: '3 ways to supercharge pretend play (without taking over)',
          visualStageHint: 'Tap each beat to see executive skills wire up',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: '{Name} directs',
                label: 'Let {Name} Be Boss',
                quote: '“Welcome to my pizza shop! Sit right there—you’re the customer!”',
                desc: 'Accept the sidekick role (hungry customer, patient, or assistant) while {name} runs the whole plan.',
                brainNote: 'Activates planning, sequencing, and joyful leadership.',
              },
              {
                stepNum: '02',
                actor: 'You nudge gently',
                label: 'Add One Twist',
                quote: '“Oh no, Chef! Do you have a written menu or a sign so I know how much pizza costs?”',
                desc: 'Weave natural literacy and counting into the game organically—zero worksheet tears.',
                brainNote: 'Links letters and numbers directly to real-world meaning.',
              },
              {
                stepNum: '03',
                actor: 'Step back',
                label: 'Guard Flow',
                quote: 'Watch {obj} scribble a menu and negotiate new rules independently',
                desc: 'Once the story catches fire, quietly step out and let {name} carry the momentum solo.',
                brainNote: 'Builds 20–40 minute sustained concentration naturally.',
              },
            ],
          },
          almanacTruth:
            'Pretend play isn’t a break from kindergarten readiness—it IS kindergarten readiness: sustaining a 30-minute roleplay exercises focus, planning, vocabulary, and self-control simultaneously.',
          scienceDeepDive:
            'Developmental research by Dr. Adele Diamond and Elena Bodrova (Tools of the Mind) confirms that mature sociodramatic play builds working memory, cognitive flexibility, and inhibitory control—stronger predictors of elementary school success than early rote memorization.',
          beat3Kicker: 'Practice during play',
          beat3Title: 'Join pretend play for 10 minutes without hijacking the plot',
          rehearsalTriggerSpeaker: '{Name} handing you a cardboard box “pizza”',
          rehearsalTriggerQuote: '“Here’s your rainbow dragon pizza! That costs fifty-hundred dollars!”',
          rehearsalPrompt: 'Which well-meaning “teacher reflex” accidentally deflates the magic?',
          instincts: [
            {
              id: 'quiz',
              label: '“Wait—what letter does Pizza start with? And fifty-hundred isn’t a real number!”',
              whyTitle: 'Why that’s so tempting—and why kids walk away',
              whyText:
                'Sneaking a quiz into playtime feels productive, yet turning a joyful game into a pop test shuts down imagination fast.',
            },
            {
              id: 'direct',
              label: 'Take over designing the shop so it looks neater and more realistic.',
              whyTitle: 'Why that’s so tempting—and what {name} loses',
              whyText:
                'When adults become the director, the child’s planning brain powers down.',
            },
          ],
          calmScriptPlain:
            '“(Gasps delightedly) Rainbow dragon pizza?! Best café in town! Let me count out five pretend coins—Chef, could you scribble ‘PIZZA’ on a paper sign so more customers find us?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'playin',
              text: 'Rainbow dragon pizza?! Best café in town!',
              tag: 'Enters Their World',
              note: 'Full-hearted delight signals that {possessive} imagination matters deeply.',
            },
            { text: ' ' },
            {
              id: 'embed',
              text: 'Let me count out five pretend coins—Chef, could you scribble ‘PIZZA’ on a paper sign so more customers find us?',
              tag: 'Playful Literacy Spark',
              note: 'Invites authentic counting and writing inside the story—zero flashcard resistance.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Play the subordinate character (customer, patient, passenger)',
            'Keep scrap paper, tape, and crayons near play zones',
            '10 minutes of engaged play often buys 30 minutes of solo flow',
          ],
          pushbacks: [
            {
              id: 'hatepretend',
              label: '“Honestly, playing pretend bores me to tears!”',
              setup: 'Totally normal for grown-up brains! Pick a tiny 8-minute timer or be the sleepy customer:',
              script:
                '“I’d love to be your sleepy café guest for ten minutes while I sip my real tea—then you keep running the kitchen while I fold laundry nearby!”',
            },
            {
              id: 'bossy',
              label: '“{Name} gets super bossy telling me every exact line to say”',
              setup: 'Smile—scripting you is {poss} brain practicing storytelling! Gently model flexible collaboration:',
              script:
                '“Whoa, you’ve got a big movie in your head! Let’s do your line first, then my character gets one surprise twist too.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) resists letter worksheets—how can I weave early reading and counting playfully into pretend games {pronoun} already loves?”',
          beat4Kicker: 'This week’s play spark',
          beat4Title: 'Pick one simple prop boost for pretend play',
          beat4Lead: 'Household scraps beat pricey plastic playsets every time.',
          moves: [
            {
              id: 'propbox',
              title: 'Toss 5 real-life props into a “Play Box” (notepad, tape, empty spice jar, scarf, old wallet)',
              desc: 'Watch a bakery, post office, or vet clinic erupt with zero battery-powered noise.',
            },
            {
              id: 'sidekick',
              title: 'Play sidekick for 10 unhurried minutes this weekend',
              desc: 'Leave your phone in another room and let {name} direct the whole plot.',
            },
            {
              id: 'retireflash',
              title: 'Trade one worksheet session for reading aloud + pretend signs',
              desc: 'Rich conversation and cozy storybooks build far deeper lifelong literacy.',
            },
          ],
          closingNote:
            'When you see a living room full of pillow forts and scribbled pizza menus, you aren’t looking at wasted time—you are watching a brilliant young mind wire itself for life.',
          pocketInsight:
            'Play the sidekick for 10 minutes while {name} directs pretend play, sneaking natural counting and signs into the story instead of drilling worksheets.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“How do mud pies, sticks, and broken crayons prepare little hands for writing?”',
            title: 'Outdoor Loose-Parts Play & Fine-Motor Prep (Sticks, Clay, Scissors)',
            targetSlug: 'preschool-nature-loose-parts-play',
          },
          interactiveHighlights: ['3-Beat Pretend Loop', 'Playful Sidekick Script'],
        },
      },
      {
        slug: 'preschool-nature-loose-parts-play',
        title: 'Outdoor Loose-Parts Play & Fine-Motor Prep (Sticks, Clay, Scissors)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.leaf,
          illustrationCaption: 'Sticks, clay & tiny crayons · Natural hand strength',
          headline: 'Outdoor Loose-Parts Play & Fine-Motor Prep (Sticks, Clay, Scissors)',
          deck: 'Why hauling sticks, squishing clay, and coloring with short broken crayons build stronger writing hands and bolder confidence than pencil-grip drills.',
          sceneTime: '3:45 PM · BACKYARD TRAIL',
          sceneBody:
            'Five minutes into a park walk, {name} ignores the shiny slide completely to build an elaborate leaf-and-stick bridge across a puddle. Back home, {pronoun} hates tracing letters because {poss} little hand gets tired fast. *Wait—are those two things connected?*',
          pollQuestion: 'Does {name} love digging, building, or squishing—yet tire fast with pencils?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes—big outdoor energy, quick pencil fatigue',
              response:
                'Huge insight: preschool hand bones are still mostly cartilage! Climbing, kneading dough, and building with sticks build the exact shoulder and finger muscles writing needs later.',
            },
            {
              id: 'mess',
              label: 'I want more outdoor messy play without wrecking clothes',
              response:
                'One pair of beat-up “adventure shoes” and a cheap mud suit free you to say “Yes!” without worrying about laundry.',
            },
          ],
          beat2Kicker: 'The gardener approach to growth',
          beat2Title: 'Four simple outdoor & tactile setups that build grit and hand strength',
          beat2Lead:
            'Open-ended “loose parts” (sticks, pinecones, water, clay, cardboard) invite hours of creative engineering while naturally strengthening finger arches for kindergarten writing. Tap each setup below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: '4 effortless ways to build spatial grit & writing hands',
          visualStageHint: 'Tap each setup from backyard sticks to tiny crayons',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Outdoors',
                label: 'Loose Parts',
                title: 'Sticks, pebbles, water & zero instructions',
                desc: 'Hauling branches, balancing rocks, and digging channels strengthen shoulder stability—the anchor for steady handwriting.',
                why: 'Whole-arm strength develops BEFORE fine fingertip precision.',
              },
              {
                timeOrCue: 'Kitchen Table',
                label: 'Clay & Tongs',
                title: 'Squishing playdough, peeling clementines & tweezers',
                desc: 'Hiding beads inside firm playdough or rolling dough snakes builds thumb-index pinch strength effortlessly.',
                why: 'Playful pinching wires hand arches without a single writing tear.',
              },
              {
                timeOrCue: 'Art Trick',
                label: 'Broken Crayons',
                title: 'Snap regular crayons in half (1-inch nubs)',
                desc: 'Tiny crayons physically prevent a full-fist grab, gently guiding little fingers into a natural tripod grip automatically.',
                why: 'Environment shapes grip cleanly—zero nagging “Hold your pencil right!”',
              },
              {
                timeOrCue: 'Confidence',
                label: 'Snip Strips',
                title: 'Child-safe blunt scissors + thick cardstock strips',
                desc: 'Snipping stiff paper strips into “confetti” or cutting playdough snakes builds two-hand coordination fast.',
                why: 'Stiff cardstock doesn’t flop, giving instant early scissor success.',
              },
            ],
          },
          almanacTruth:
            'Little hands learn to write by climbing trees, squishing clay, snipping paper, and drawing with short broken crayons—long before neat alphabet lines.',
          scienceDeepDive:
            'Pediatric occupational therapy frameworks emphasize proximal-to-distal motor development: core and shoulder girdle stability built through climbing and carrying heavy outdoor loose parts precedes refined intrinsic hand arch strength needed for comfortable pencil control around ages 5–6.',
          beat3Kicker: 'Practice in the backyard & at the craft table',
          beat3Title: 'Step into “gardener mode” instead of micromanaging play',
          rehearsalTriggerSpeaker: '{Name} gripping a crayon in a tight fist and scribbling hard',
          rehearsalTriggerQuote: '“My letter ‘A’ looks UGLY! I can’t do it!”',
          rehearsalPrompt: 'Which well-meaning correction makes drawing feel stressful?',
          instincts: [
            {
              id: 'grabhand',
              label: 'Grab {possessive} hand and reposition every finger: “No, hold it like THIS!”',
              whyTitle: 'Why that’s so tempting—and why kids drop the crayon',
              whyText:
                'Wanting tidy habits is natural! Yet repeated grip corrections turn joyful art into a test—while snapping the crayon in half solves it silently.',
            },
            {
              id: 'clean',
              label: 'Stop muddy stick-play early so {poss} sleeves stay spotless.',
              whyTitle: 'Why that’s so tempting—and the easy fix',
              whyText:
                'Designating one “play outfit” removes your stress completely so {name} can invent freely.',
            },
          ],
          calmScriptPlain:
            '“Tricky angles make hands tired fast! Let’s try these short superhero crayon nubs—they’re magic for fingers—and draw a giant road on the big cardboard box instead.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'empathize',
              text: 'Tricky angles make hands tired fast!',
              tag: 'Normalizes Fatigue',
              note: 'Reassures {name} that hand muscles simply need playful warming up, not perfection.',
            },
            { text: ' ' },
            {
              id: 'swap',
              text: 'Let’s try these short superhero crayon nubs—they’re magic for fingers—and draw a giant road on the big cardboard box instead.',
              tag: 'Effortless Tool Shift',
              note: 'Short crayons + vertical or big-surface drawing naturally align wrist and fingers with zero scolding.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Tape paper vertically to a wall or easel to strengthen wrists',
            'Keep one “messy adventure” jacket & boots by the door',
            'Notice effort and creative ideas, never neatness',
          ],
          pushbacks: [
            {
              id: 'sticksafe',
              label: '“What about safety when {name} plays with big sticks?”',
              setup: 'Set one simple, clear outdoor rule that keeps adventure safe:',
              script:
                '“Sticks stay low below your waist and away from friends’ faces—show me how you can drag that big log to your fort!”',
            },
            {
              id: 'hatecraft',
              label: '“{Name} hates coloring or scissors altogether”',
              setup: 'Skip paper crafts for a month and lean on playful daily muscle builders:',
              script:
                '“Squirt bottles in the yard, peeling stickers, kneading pizza dough, and monkey bars build the exact same hand strength with zero table battles!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) avoids drawing and gets frustrated with scissors—give me 5 sneaky playful ways to strengthen {poss} hands without table drills.”',
          beat4Kicker: 'This week’s gardener experiment',
          beat4Title: 'Pick one easy outdoor or fine-motor setup',
          beat4Lead: 'Rich soil beats micromanaging—set out the tools and enjoy watching.',
          moves: [
            {
              id: 'snapcrayons',
              title: 'Snap 6 old crayons into 1-inch “superhero nubs” today',
              desc: 'Leave them out with blank paper and watch {poss} natural tripod grip click into place.',
            },
            {
              id: 'loosepark',
              title: 'Do one 20-minute “no-agenda” outdoor loose-parts walk',
              desc: 'Bring an empty bucket for pinecones, acorns, or smooth stones and step back as gardener.',
            },
            {
              id: 'doughsnip',
              title: 'Hand over blunt safety scissors + rolled playdough snakes',
              desc: 'Snipping soft dough snakes is wildly fun and builds instant scissor confidence.',
            },
          ],
          closingNote:
            'Muddy boots, taped-up stick forts, and tiny broken crayons are the quiet workshops where resilient thinkers and confident kindergarten hands are made.',
          pocketInsight:
            'Build school-ready hands through outdoor loose parts, clay pinching, and 1-inch broken crayons—gardener curiosity beats worksheet drills.',
          nextEpisodeHook: null,
          interactiveHighlights: ['4-Step Fine-Motor Map', 'Broken-Crayon Trick'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 20: Ending "One More Episode" & Screen-Free Zones (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'digital-preschool-media-curation',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    developmentalTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    title: 'Ending “One More Episode” & Screen-Free Zones',
    reliefSubtitle:
      'End episode bargaining with a neutral timer pact, decode sticky kids’ app hooks, protect screen-free meals and bedrooms, and bridge calmly back to real play',
    tonightQuickWinTitle: 'Episode 1: The Timer Pact That Ends “Just One More Episode!”',
    summary:
      'Let neutral timers and episode endpoints replace nightly screen bargaining, see how auto-play and kids’ apps hook young attention, establish clear screen-free family zones, and master the 5-minute bridge from screens back to playful connection.',
    coverImageUrl: 'https://assets.alongside.care/academy/digital-preschool.png',
    sortOrder: 4,
    episodes: [
      {
        slug: 'preschool-physical-timer-protocol',
        title: 'The Timer Pact That Ends “Just One More Episode!”',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Neutral kitchen timer · The clock holds the limit',
          headline: 'The Timer Pact That Ends “Just One More Episode!”',
          deck: 'Why announcing “Screen time is over!” out of the blue sparks instant meltdowns—and the neutral timer + episode agreement that makes you the teammate, not the villain.',
          sceneTime: '5:30 PM · LIVING ROOM COUCH',
          sceneBody:
            'You click pause to call {name} for dinner. Instantly {pronoun} flings back onto the cushions wailing: “You ALWAYS turn it off right at the good part! JUST ONE MORE!” *Every single afternoon screen session ends in a twenty-minute negotiation.*',
          pollQuestion: 'Is turning the screen OFF the single hardest transition of the day?',
          pollOptions: [
            {
              id: 'hardest',
              label: 'Yes—almost every single time',
              response:
                'You’re watching a classic dopamine drop plus zero warning! Turning off autoplay and letting {name} press the stop button at an agreed natural ending changes the entire mood.',
            },
            {
              id: 'negotiate',
              label: 'It turns into endless “five more minutes” bargaining',
              response:
                'Once the timer (not your voice) holds the agreed stopping point, arguing with Mom or Dad loses all its fuel.',
            },
          ],
          beat2Kicker: 'Why policing screens drains everyone',
          beat2Title: 'Let a neutral timer + natural ending hold the boundary',
          beat2Lead:
            'Mid-scene abrupt pauses feel shocking to an absorbed 5-year-old brain. Agreeing on the exact stopping point BEFORE pressing play lets a neutral boundary do the heavy lifting. Compare both setups below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Sudden parent cutoff vs. neutral timer pact',
          visualStageHint: 'Compare surprise shutoffs with a pre-agreed pact',
          visualConfig: {
            willpowerLabel: 'Surprise Cutoff',
            willpowerTitle: 'Walking in and clicking pause mid-story',
            willpowerDesc:
              'Abrupt cutoffs plus auto-play countdowns hijack attention and make YOU look like the mean villain taking joy away.',
            willpowerOutcome: 'Explosive crying, begging, and daily dread over screen time.',
            guardrailLabel: 'Neutral Timer Pact',
            guardrailTitle: 'Autoplay OFF + agreed episode + child hits power',
            guardrailDesc:
              'Decide “One episode” BEFORE pressing play, disable autoplay permanently, and hand {name} the remote to press off when credits roll.',
            guardrailOutcome: 'Predictable endings, proud autonomy, and zero bargaining.',
            environmentShifts: [
              'Turn OFF autoplay across YouTube Kids, Netflix, and Disney+ tonight—no automatic next-episode hooks.',
              'Agree on an exact finish BEFORE starting (“When this episode ends, we press off and set the table”).',
              'Let {name} physically press the power button—ownership shrinks resistance dramatically.',
            ],
          },
          almanacTruth:
            'Agreeing on the exact stopping point BEFORE pressing play—and turning autoplay permanently off—turns you from the screen police into a calm teammate.',
          scienceDeepDive:
            'Research from the University of Michigan C.S. Mott Children’s Hospital (Hiniker et al.) showed that preschool screen-transition tantrums drop sharply when transitions align with natural content endpoints (credits rolling) paired with predictable routines rather than sudden arbitrary parental interruptions.',
          beat3Kicker: 'Practice before pressing play',
          beat3Title: 'Hold the pre-agreed stop without arguing or caving',
          rehearsalTriggerSpeaker: 'Credits rolling as {name} reaches for the remote',
          rehearsalTriggerQuote: '“PLEASE just ONE more tiny episode! That one was SO short!”',
          rehearsalPrompt: 'Which exhausted 5:30 PM instinct slips out fastest?',
          instincts: [
            {
              id: 'cave',
              label: '“Fine, ONE more—but NO complaining when it ends!”',
              whyTitle: 'Why that’s so tempting—and why tomorrow gets louder',
              whyText:
                'Buying 10 quiet minutes to finish dinner feels tempting! Yet giving in teaches {name} that loud begging moves the boundary.',
            },
            {
              id: 'threat',
              label: '“Since you’re whining, ZERO TV for the whole rest of the week!”',
              whyTitle: 'Why that’s so tempting—and why big threats backfire',
              whyText:
                'Big reactive bans escalate tears immediately and are almost impossible to hold calmly for seven days.',
            },
          ],
          calmScriptPlain:
            '“It’s so hard to stop right when a show is awesome! We agreed on one episode, and the credits are rolling. Do you want to press the big red button, or should we push it together on three?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'empathy',
              text: 'It’s so hard to stop right when a show is awesome!',
              tag: 'Empathizes First',
              note: 'Shows you genuinely get how fun the show was—even adults hate pausing a cliffhanger!',
            },
            { text: ' ' },
            {
              id: 'pact',
              text: 'We agreed on one episode, and the credits are rolling. Do you want to press the big red button, or should we push it together on three?',
              tag: 'Neutral Pact + Choice',
              note: 'Points to the shared agreement and hands {name} the proud final click.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Stand nearby 2 minutes before credits roll',
            'Never negotiate once the timer chimes',
            'Move straight into a warm snack or brief connection',
          ],
          pushbacks: [
            {
              id: 'meltdown',
              label: '“{Name} drops to the floor crying after clicking off”',
              setup: 'Stay calm and empathetic—crying doesn’t mean the rule was wrong:',
              script:
                '“I know, stopping feels super crummy in your belly. You can feel mad for a minute right here—our shows are resting until tomorrow.”',
            },
            {
              id: 'grabsremote',
              label: '“{Pronoun} hits play on the next video anyway”',
              setup: 'Calmly turn it off once without anger and place the remote up high:',
              script:
                '“Oops, hard to stop your fingers when the button is right there! I’ll help by tucking the remote in its basket until tomorrow.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) melts down every time screen time ends—help me build a calm 2-minute closing ritual that sticks.”',
          beat4Kicker: 'Before the very next episode',
          beat4Title: 'Pick one guardrail to install today',
          beat4Lead: 'Change the setup once and save yourself a hundred arguments.',
          moves: [
            {
              id: 'noautoplay',
              title: 'Disable Autoplay on every kids’ streaming profile tonight',
              desc: 'A quiet still credits screen kills 70% of “one more!” urgency automatically.',
            },
            {
              id: 'preagree',
              title: 'Make a 5-second “Before Play Pact” next time',
              desc: '“One episode of Bluey, then you press the off button and help stir pasta—deal?”',
            },
            {
              id: 'childclicks',
              title: 'Let {name} be the official “Power-Off Captain”',
              desc: 'Pressing the button {poss}self turns an ending into proud competence.',
            },
          ],
          closingNote:
            'When the stopping rule is clear, predictable, and backed by your warm presence, {name} learns that fun things can end cleanly—and good things are waiting right after.',
          pocketInsight:
            'Turn off autoplay permanently, agree on the exact episode before pressing play, and let {name} press the power button when credits roll.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Why can {name} walk away easily from some shows yet turn into a zombie on others?”',
            title: 'How Kids’ Apps Are Engineered to Keep Little Eyes Hooked',
            targetSlug: 'preschool-dopamine-loops-and-gaming',
          },
          interactiveHighlights: ['Neutral Pact Flip', 'Power-Off Captain Script'],
        },
      },
      {
        slug: 'preschool-dopamine-loops-and-gaming',
        title: 'How Kids’ Apps Are Engineered to Keep Little Eyes Hooked',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Calm vs. sticky media · Spotting design hooks',
          headline: 'How Kids’ Apps Are Engineered to Keep Little Eyes Hooked',
          deck: 'Why two 20-minute screen sessions can leave {name} in totally opposite moods—and the 4-second check that spots hyper-sticky apps immediately.',
          sceneTime: '10:40 AM · SATURDAY MORNING',
          sceneBody:
            'After twenty minutes of a calm storybook show, {name} hops off the couch happily to build a fort. After twenty minutes of a colorful free kids’ game with pop-up stars and mystery eggs, {pronoun} looks glassy-eyed, whiny, and snaps at everything for an hour. *Why are those two screens night and day?*',
          pollQuestion: 'Have you noticed certain shows or games leave {name} noticeably crankier afterward?',
          pollOptions: [
            {
              id: 'huge',
              label: 'Yes—a huge mood difference depending on what {pronoun} watched',
              response:
                'You spotted it straight away! Not all screen minutes are equal: mystery prizes, rapid cuts, and loud coin chimes flood preschool dopamine circuits far differently than gentle storytelling.',
            },
            {
              id: 'curious',
              label: 'I’d love an easy checklist to tell calm from sticky',
              response:
                'Once you see the four sneaky hooks designers use, auditing an app takes under 30 seconds.',
            },
          ],
          beat2Kicker: 'Inside sticky app design',
          beat2Title: 'Flip the lens from “bad behavior” to “engineered reward hooks”',
          beat2Lead:
            'When a 5-year-old gets cranky after a free tablet game, it isn’t a character flaw—it’s a tiny nervous system coming off rapid slot-machine confetti bursts. Flip lenses and audit the signals below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Behavior lens vs. persuasive-design lens',
          visualStageHint: 'Flip lenses, then tap the 10-point media calm check',
          visualConfig: {
            adultLabel: 'Frustrated parent lens',
            adultQuote: '“Why does {name} act so grumpy and bratty every time {pronoun} uses the tablet?!”',
            adultSub: 'It’s easy to blame attitude when post-app crankiness flares up right after turning it off.',
            childLabel: 'Neuroscience design lens',
            childQuote: '“Pop-up coins, countdown timers, and rapid flashes just revved my brain past 100!”',
            childSub: 'Variable surprise boxes and bright streak badges trigger intense dopamine spikes followed by an irritable crash.',
            exposureHeading: 'The 10-second calm-media meter',
            exposureSub: 'Tap scores 1–10 (higher = calmer post-screen mood)',
            totalDots: 10,
            defaultCount: 8,
            unitLabel: 'calm score',
            lowMax: 3,
            midMax: 6,
            lowMsg: 'Score 1–3 (Hyper-Sticky): Autoplay shorts, mystery surprise eggs, flashing pop-up ads, and relentless reward dings—expect intense mood crashes.',
            midMsg: 'Score 4–6 (Mixed): Entertaining cartoons with fast pacing—watchable occasionally in short doses with clear stopping pacts.',
            highMsg: 'Score 7–10 (Almanac Calm): Slow 4+ second camera pacing, ad-free creative apps (drawing, music, building), or gentle human-paced stories—kids walk away relaxed!',
          },
          almanacTruth:
            'Post-screen crankiness is usually a design problem, not a kid problem—pruning hyper-stimulating autoplay apps cures half of preschool screen battles overnight.',
          scienceDeepDive:
            'Pediatric media audits (Radesky et al., Journal of Developmental & Behavioral Pediatrics) found that the vast majority of top-downloaded “free” preschool apps contain manipulative persuasive-design patterns—loot-box surprise rewards, countdown pressure, and distracting ad prompts—that spike arousal and disrupt self-regulation.',
          beat3Kicker: 'Practice a calm app swap',
          beat3Title: 'Retire a hyper-sticky app without triggering a power war',
          rehearsalTriggerSpeaker: '{Name} hunting for the loud surprise-egg game on the tablet',
          rehearsalTriggerQuote: '“Where did my egg-popping game go?! Put it BACK!”',
          rehearsalPrompt: 'Which reaction invites a 30-minute meltdown?',
          instincts: [
            {
              id: 'blame',
              label: '“You can’t handle that game! You turn into a monster every time you play it!”',
              whyTitle: 'Why that’s so tempting—and what {name} hears',
              whyText:
                'Calling {obj} a “monster” makes {name} feel bad inside instead of putting the blame squarely on the app’s loud design.',
            },
            {
              id: 'reinstall',
              label: 'Re-download it quietly so Saturday morning stays peaceful.',
              whyTitle: 'Why that’s so tempting—and why pruning wins',
              whyText:
                'One calm weekend swap to slower, ad-free options pays you back every single week afterward.',
            },
          ],
          calmScriptPlain:
            '“I took that egg game off our tablet because it’s designed to keep kids’ brains buzzing way too fast—just like too much frosting makes tummies ache. You still have your drawing studio and train builder—which one looks fun?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'blameapp',
              text: 'I took that egg game off our tablet because it’s designed to keep kids’ brains buzzing way too fast—just like too much frosting makes tummies ache.',
              tag: 'Blames the App, Never the Child',
              note: 'Builds early media literacy while keeping {possessive} self-esteem 100% intact.',
            },
            { text: ' ' },
            {
              id: 'offer',
              text: 'You still have your drawing studio and train builder—which one looks fun?',
              tag: 'Pivots to Calm Choices',
              note: 'Redirects straight toward creative, low-crash options.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Blame app design, never {possessive} willpower',
            'Delete free ad-supported apps with pop-up coins',
            'Prefer ad-free creative tools (PBS Kids, Khan Academy Kids, drawing)',
          ],
          pushbacks: [
            {
              id: 'friends',
              label: '“All my friends watch those crazy unboxing videos!”',
              setup: 'Validate warmly and hold your calm family standard:',
              script:
                '“Every family picks different shows for their home—in our house we pick ones that leave our brains feeling good afterward.”',
            },
            {
              id: 'boredcalm',
              label: '“Calm shows feel ‘boring’ at first after fast videos!”',
              setup: 'Totally expected for 4–5 days while dopamine resets:',
              script:
                '“After super-loud cartoons, gentle stories feel quiet for a few days—stick with them for one week and watch {possessive} delight come right back.”',
            },
          ],
          advisorPrompt:
            '“Give me a quick list of 5 genuinely calm, low-crash shows or ad-free creative apps for a {ageShort}.”',
          beat4Kicker: 'This week’s 5-minute tablet audit',
          beat4Title: 'Pick one tiny curation upgrade today',
          beat4Lead: 'Curating the menu once eliminates countless cranky afternoons.',
          moves: [
            {
              id: 'prunetwo',
              title: 'Quietly delete the 2 loudest ad-filled or autoplay apps tonight',
              desc: 'Notice how much calmer post-screen moods feel within 72 hours.',
            },
            {
              id: 'foursec',
              title: 'Run the “4-Second Scene Cut Test” on one favorite show',
              desc: 'If the camera jumps every 1–2 seconds with constant screeching, swap in slower storytelling.',
            },
            {
              id: 'sharedtv',
              title: 'Move shows from tiny personal tablets onto the shared living-room TV',
              desc: 'Bigger shared screens invite natural co-viewing and make turning off far easier.',
            },
          ],
          closingNote:
            'When you teach a five-year-old to notice “how my brain feels after this show,” you plant the very first seed of lifelong digital wisdom.',
          pocketInsight:
            'Post-screen crankiness is engineered app design—blame the app, delete loud ad/autoplay hooks, and curate slow-paced or creative options.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“How do you keep tablets off dinner tables and out of bedrooms without feeling like the strict parent?”',
            title: 'Screen-Free Meals & Bedrooms (Without Feeling Like the Bad Guy)',
            targetSlug: 'preschool-screen-free-meals-and-bedtimes',
          },
          interactiveHighlights: ['10-Point Calm-Media Meter', 'Blame-the-App Script'],
        },
      },
      {
        slug: 'preschool-screen-free-meals-and-bedtimes',
        title: 'Screen-Free Meals & Bedrooms (Without Feeling Like the Bad Guy)',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Kitchen basket · One rule for every human',
          headline: 'Screen-Free Meals & Bedrooms (Without Feeling Like the Bad Guy)',
          deck: 'Why two simple household zones—the dinner table and the bedroom—protect preschool sleep, appetite, and conversation effortlessly when grown-ups join in too.',
          sceneTime: '6:10 PM · DINNER TABLE',
          sceneBody:
            'Restaurants, busy Tuesdays, tired evenings—somewhere along the line the tablet started sneaking next to the pasta plate, and your own phone sits face-up beside your fork. *You want warm family dinners back without starting a huge protest.*',
          pollQuestion: 'Which screen-free zone feels hardest to protect right now?',
          pollOptions: [
            {
              id: 'meals',
              label: 'Meals (especially restaurants or tired weeknights)',
              response:
                'Completely understandable! Swapping the dinner tablet for a tiny “Restaurant Busy Pouch” (mini cars, washable markers, stickers) keeps meals calm AND preserves real appetite cues.',
            },
            {
              id: 'bedtime',
              label: 'The final hour before bed',
              response:
                'Protecting the last 60 minutes before sleep lets natural melatonin rise cleanly—and putting every device in a kitchen “sleep basket” makes it a joyful house ritual.',
            },
          ],
          beat2Kicker: 'Installing effortless house zones',
          beat2Title: 'Four simple anchors that make screen-free zones automatic',
          beat2Lead:
            'Rules feel heavy when they only apply to little kids; house zones feel warm and proud when Mom and Dad tuck their phones into the same basket. Tap each zone below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-anchor screen-free home setup',
          visualStageHint: 'Tap each zone to keep boundaries effortless',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Zone 1 · Kitchen',
                label: 'Sleep Basket',
                title: 'One cozy basket where ALL screens nap',
                desc: 'Place a small woven basket on the kitchen counter with chargers inside—tablets AND adult phones rest there during dinner and overnight.',
                why: 'Kids follow what we model 10x faster than what we lecture.',
              },
              {
                timeOrCue: 'Zone 2 · Table',
                label: 'Screen-Free Meals',
                title: 'Keep food and screens completely separate',
                desc: 'Eating while entranced by video mutes natural fullness cues and replaces table conversation with silence.',
                why: 'Protects lifelong hunger awareness and family connection.',
              },
              {
                timeOrCue: 'Zone 3 · Bedroom',
                label: 'Sleep Sanctuary',
                title: 'Bedrooms stay strictly for rest, books & audio stories',
                desc: 'Swap bedroom tablets for a warm lamp, picture books, or screen-free audio player 60 minutes before bed.',
                why: 'Blue light and exciting plotlines delay preschool melatonin noticeably.',
              },
              {
                timeOrCue: 'Zone 4 · Outings',
                label: 'Busy Pouch',
                title: 'Pack a 3-item “Restaurant Adventure Bag”',
                desc: 'Keep mini figurines, masking tape, and triangle crayons tucked in the car for waiting at cafés.',
                why: 'Gives restless hands joyful engagement without reaching for a phone.',
              },
            ],
          },
          almanacTruth:
            'Protecting just two sacred zones—screen-free meals and screen-free bedrooms—gives preschoolers better sleep, healthier eating cues, and a lifetime blueprint for healthy tech habits.',
          scienceDeepDive:
            'American Academy of Pediatrics Family Media Plan guidelines highlight screen-free meal tables and device-free bedrooms (with 60-minute pre-sleep buffers) as the highest-impact household norms for protecting pediatric sleep duration, BMI regulation, and language-rich parent-child conversation.',
          beat3Kicker: 'Practice introducing the reset',
          beat3Title: 'Roll out the family basket like a proud house upgrade',
          rehearsalTriggerSpeaker: '{Name} clutching the tablet walking toward the dinner table',
          rehearsalTriggerQuote: '“Why can’t I watch while I eat?! I eat BETTER when I watch!”',
          rehearsalPrompt: 'Which defensive reply starts a dinner standoff?',
          instincts: [
            {
              id: 'strict',
              label: '“Because I said so! Put it down or you’re losing dessert!”',
              whyTitle: 'Why that’s so tempting—and what it turns dinner into',
              whyText:
                'Power-based demands make kids fight for control—whereas letting {name} tuck BOTH your phone and the tablet into bed together feels playful and fair.',
            },
            {
              id: 'hypocrite',
              label: 'Take {possessive} tablet away while still glancing at your own phone notifications.',
              whyTitle: 'Why that’s so tempting—and what kids notice immediately',
              whyText:
                'Five-year-olds are eagle-eyed fairness detectors—putting your own phone in the basket FIRST makes the rule instantly respected.',
            },
          ],
          calmScriptPlain:
            '“New fun house rule for ALL of us—even Mom and Dad! Our screens get hungry for a nap while we eat. Want to be the one who tucks my phone AND your tablet into the kitchen basket?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'allofus',
              text: 'New fun house rule for ALL of us—even Mom and Dad!',
              tag: 'Shared Fairness',
              note: 'Eliminates “strict parent vs. little kid” tension in one warm sentence.',
            },
            { text: ' ' },
            {
              id: 'job',
              text: 'Our screens get hungry for a nap while we eat. Want to be the one who tucks my phone AND your tablet into the kitchen basket?',
              tag: 'Playful Responsibility',
              note: 'Putting {name} in charge of tucking devices away flips resistance into proud ownership.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Drop your own phone into the basket visibly first',
            'Keep dinner warm with one silly table game (“Two Truths & a Silly Fib”)',
            'Stay patient for 3 evenings while the old habit fades',
          ],
          pushbacks: [
            {
              id: 'restaurant',
              label: '“What about loud nights waiting 30 minutes at a restaurant?”',
              setup: 'Pull out the surprise Busy Pouch or play tabletop games first—zero guilt if an occasional long flight needs flexibility:',
              script:
                '“Let’s open the special restaurant pouch while our food cooks—want to draw a monster on the paper placemat or play I-Spy?”',
            },
            {
              id: 'travel',
              label: '“Does a road trip or sick day break the whole rule?”',
              setup: 'Name exceptions clearly so everyday norms stay rock-solid:',
              script:
                '“Today is a special travel-day exception! Tomorrow back home, tablets return straight to their kitchen basket.”',
            },
          ],
          advisorPrompt:
            '“Help me put together a tiny 5-item ‘Restaurant Busy Pouch’ that keeps a {ageShort} happy at cafés without a phone.”',
          beat4Kicker: 'Tonight’s 2-minute setup',
          beat4Title: 'Pick one sacred screen-free zone to start tonight',
          beat4Lead: 'One small basket on the counter quietly anchors the next decade of family tech habits.',
          moves: [
            {
              id: 'basket',
              title: 'Set out one “Device Sleep Basket” in the kitchen before dinner',
              desc: 'Let {name} tuck your phone in beside the tablet—celebrate being a screen-free dinner team.',
            },
            {
              id: 'busypouch',
              title: 'Stash a mini “Restaurant Busy Pouch” in your bag or car',
              desc: 'A small notepad, washable markers, tape roll, and 2 mini figures work wonders.',
            },
            {
              id: 'bedhour',
              title: 'Start a 60-minute screen-free bedtime buffer three nights this week',
              desc: 'Notice how much faster {name} settles when bright screens sleep early.',
            },
          ],
          closingNote:
            'Putting your own phone into the basket beside {possessive} tablet sends the clearest message a child can ever receive: “Right now, nothing in the world is more important than sitting here with you.”',
          pocketInsight:
            'Anchor two sacred house zones—screen-free meals and bedrooms—using one kitchen Device Sleep Basket that holds adult phones too.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery: '“What is the simple 5-minute bridge that helps {name} leap joyfully from a screen straight back into real play?”',
            title: 'The 5-Minute Bridge: Moving From Screens Back to Real Play',
            targetSlug: 'preschool-bridge-activity-routine',
          },
          interactiveHighlights: ['4-Zone Home Map', 'Device Basket Ritual'],
        },
      },
      {
        slug: 'preschool-bridge-activity-routine',
        title: 'The 5-Minute Bridge: Moving From Screens Back to Real Play',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Post-screen bridge · Landing softly in real play',
          headline: 'The 5-Minute Bridge: Moving From Screens Back to Real Play',
          deck: 'Why saying “Go play with your toys!” right after shutting off a screen falls flat—and the 5-minute warm bridge that reignites real-world imagination.',
          sceneTime: '4:40 PM · RIGHT AFTER TV ENDS',
          sceneBody:
            'The TV is off—victory! Except for the next fifteen minutes {name} flops dramatically across the rug groaning “I’m SO BORED! There’s NOTHING to do!” right beside two full shelves of toys. *Why does real life suddenly feel dull right after a show?*',
          pollQuestion: 'Does the “I’m bored!” slump hit right after screens turn off?',
          pollOptions: [
            {
              id: 'always',
              label: 'Every time—takes 20 minutes to get playing again',
              response:
                'Totally biological! Dropping from bright, effortless stimulation straight into an empty room feels like stepping out of a sunny beach into a dark hallway—eyes and brains need a brief bridge.',
            },
            {
              id: 'whiny',
              label: 'Gets clingy and follows me whining right after',
              response:
                'A 3-minute playful bridge using the show’s own theme—or a simple sensory spark—gets {possessive} imagination flying solo fast!',
            },
          ],
          beat2Kicker: 'Re-igniting real-world flow',
          beat2Title: 'Bridge from the story ON screen straight into hands-on play',
          beat2Lead:
            'Joining for just two warm minutes—connecting what {name} just watched to a real-world prop or movement—gently hands the steering wheel back to {poss} own imagination. Tap the 3 bridge beats below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-step post-screen landing bridge',
          visualStageHint: 'Tap each step to turn post-TV slumps into real play',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Connect first',
                label: 'Ask One Warm Question',
                quote: '“Whoa—how did that puppy build such a giant blanket fort?!”',
                desc: 'Sit beside {name} for the final 60 seconds and enter the story world warmly.',
                brainNote: 'Bridges passive screen absorption back into social human connection.',
              },
              {
                stepNum: '02',
                actor: 'Spark hands',
                label: 'Offer One Physical Bridge',
                quote: '“Bet we can drape this sheet over two chairs—want to be the puppy or the builder?”',
                desc: 'Hand over one concrete sensory trigger: bubbles, a snack, chalk, playdough, or a blanket fort.',
                brainNote: 'Hands-on movement resets dopamine cleanly without whining.',
              },
              {
                stepNum: '03',
                actor: 'Fade out',
                label: 'Step Back Into Flow',
                quote: 'Stay 3 minutes until {poss} story catches fire, then step away warmly',
                desc: 'Once {name} starts inventing rules, say “Awesome fort—I’ll be at the counter chopping carrots!”',
                brainNote: 'Rebuilds independent creative momentum effortlessly.',
              },
            ],
          },
          almanacTruth:
            'Right after a screen turns off, {name} doesn’t need a lecture about all the toys in the room—{pronoun} needs a 3-minute warm landing strip back into real-world play.',
          scienceDeepDive:
            'Pediatric attention-restoration studies highlight that passive screen consumption suppresses endogenous imaginative initiation temporarily. Brief caregiver-scaffolded transitional bridges—especially tactile or story-linked prompts—accelerate return to self-directed play and reduce post-media irritability.',
          beat3Kicker: 'Practice right at credits',
          beat3Title: 'Pivot smoothly out of “I’m bored!” without turning on another show',
          rehearsalTriggerSpeaker: '{Name} flopping face-down on the rug after TV ends',
          rehearsalTriggerQuote: '“Ugh, I’m BOOOORED! Play with me right now or turn it back on!”',
          rehearsalPrompt: 'Which rushed response keeps the slump dragging on?',
          instincts: [
            {
              id: 'listtoys',
              label: '“Look at all these toys you have! Go play in your room, you’re not bored!”',
              whyTitle: 'Why that’s so tempting—and why kids slump harder',
              whyText:
                'Pointing at a cluttered shelf overwhelms a post-screen brain—making it even harder to pick a starting spark.',
            },
            {
              id: 'entertain',
              label: 'Drop dinner prep completely for 40 minutes to act as full-time cruise director.',
              whyTitle: 'Why that’s so tempting—and the 3-minute shortcut',
              whyText:
                'You only need 3 focused minutes to light the match—then step back cleanly while {name} carries the flame.',
            },
          ],
          calmScriptPlain:
            '“Oof, landing back in the living room feels slow for a minute! I’ve got three minutes before I start dinner—should we launch a giant pillow-fort rescue like in the show, or grab the chalk outside?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'nameit',
              text: 'Oof, landing back in the living room feels slow for a minute!',
              tag: 'Normalizes the Slump',
              note: 'Takes away whining fuel by calmly acknowledging the shift in pace.',
            },
            { text: ' ' },
            {
              id: 'bridge',
              text: 'I’ve got three minutes before I start dinner—should we launch a giant pillow-fort rescue like in the show, or grab the chalk outside?',
              tag: '3-Min Story Bridge',
              note: 'Connects the show’s theme straight into hands-on action while setting a clear 3-minute parent boundary.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Set out the bridge activity BEFORE turning off the screen',
            'Use water, movement, or story-linked props',
            'Protect your boundary cheerfully when your 3 minutes end',
          ],
          pushbacks: [
            {
              id: 'staylonger',
              label: '“No! Don’t go make dinner—stay and play forever!”',
              setup: 'Validate warmly and invite {obj} right alongside you if {pronoun} wants closeness:',
              script:
                '“Playing with you is my favorite! My hands need to cook pasta now—you can keep building the fort OR bring two dinosaurs onto the kitchen rug beside me.”',
            },
            {
              id: 'refuseboth',
              label: '“I don’t want forts OR chalk!”',
              setup: 'Trust healthy boredom calmly—it usually sparks a brand-new idea within 4 minutes:',
              script:
                '“Totally okay to feel bored for a few minutes! Your clever brain always cooks up something awesome when we give it quiet space.”',
            },
          ],
          advisorPrompt:
            '“Give me 6 super fast zero-mess post-screen ‘bridge activities’ that get a {ageShort} back into independent play.”',
          beat4Kicker: 'Next screen session',
          beat4Title: 'Pick one easy landing bridge to have ready',
          beat4Lead: 'Having the bridge waiting BEFORE credits roll is pure magic.',
          moves: [
            {
              id: 'storyspark',
              title: 'Watch the last 60 seconds together and ask one story question',
              desc: '“What do you think happens NEXT after the credits?” often sparks instant pretend play.',
            },
            {
              id: 'sensorybridge',
              title: 'Set out one tactile tray (playdough, snack, or bubbles) before pausing',
              desc: 'Busy hands shift gears smoothly out of screen mode.',
            },
            {
              id: 'freshair',
              title: 'Step outside for 5 minutes of fresh air right after screens',
              desc: 'Natural sunlight and big movement clear post-screen grumpiness in minutes.',
            },
          ],
          closingNote:
            'Screens don’t have to end in tears or boredom—with a warm three-minute landing bridge, {name} discovers that real-world play is even better than watching.',
          pocketInsight:
            'Prepare one tactile or story-linked 3-minute bridge before credits roll so {name} lands softly from screens back into real play.',
          nextEpisodeHook: null,
          interactiveHighlights: ['3-Beat Landing Bridge', 'Anti-Boredom Script'],
        },
      },
    ],
  }),
];
