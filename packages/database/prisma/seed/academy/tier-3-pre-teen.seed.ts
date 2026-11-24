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

export const TIER_3_PRE_TEEN_MODULES: AcademyModuleSeedData[] = [
  // ===========================================================================
  // COURSE 26: Eye-Rolls, Mood Swings & Staying Close to Your Tween (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'behavior-tween-adrenarche',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    title: 'Eye-Rolls, Mood Swings & Staying Close to Your Tween',
    reliefSubtitle:
      'Stay steady when sarcasm and eye-rolls start, decode early mood swings at age 10, unlock side-by-side car talks, and repair warmth after slammed doors',
    tonightQuickWinTitle: 'Episode 1: Staying Steady When Sarcasm & Eye-Rolls Start',
    summary:
      'Keep your authority warm and unrattled when tween attitude flares, understand the early hormone shift happening years before visible puberty, use low-pressure side-by-side conversations to invite openness, and build calm repair agreements after slammed doors.',
    coverImageUrl: 'https://assets.alongside.care/academy/behavior-tween.png',
    sortOrder: 6,
    episodes: [
      {
        slug: 'tween-non-reactive-neutral-stance',
        title: 'Staying Steady When Sarcasm & Eye-Rolls Start',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Neutral stance · Hold the task without taking the bait',
          headline: 'Staying Steady When Sarcasm & Eye-Rolls Start',
          deck: 'Why matching a tween eye-roll turns a 2-minute chore into an hour-long standoff, and how dropping your shoulders keeps both your boundary and your bond intact.',
          sceneTime: '5:35 PM · HALLWAY OUTSIDE THE KITCHEN',
          sceneBody:
            'You ask {name} to unload the dishwasher before dinner. {Pronoun} stops dead, sighs loudly enough to rattle the windows, {rolls} {poss} eyes to the ceiling, and mutters, “Ugh, why do I literally have to do EVERYTHING in this house?” *Heat flashes straight up your neck, yet you know from last week that lecturing about “attitude” turns a 3-minute chore into a slammed bedroom door.*',
          pollQuestion: 'What happens fastest in your house when a sharp eye-roll lands?',
          pollOptions: [
            {
              id: 'bait',
              label: 'I take the bait and we end up arguing about tone instead of the chore',
              response:
                'That is the exact trap tween brains stumble into! Separating tone from task lets you hold the chore calmly now and discuss respect when the room cools.',
            },
            {
              id: 'freeze',
              label: 'I feel hurt and wonder where my sweet younger kid went',
              response:
                'Your sweet kid is still right inside there, they are just wearing loud defensive armor while navigating a brand-new wave of social self-consciousness.',
            },
          ],
          beat2Kicker: 'Inside the 10-to-12-year-old brain',
          beat2Title: 'Sarcasm is noisy armor, not a verdict on your parenting',
          beat2Lead:
            'Starting around age 9–11, early adrenal hormones sensitize the tween social-threat radar. Ordinary parental reminders suddenly feel like public criticism, triggering eye-rolls as an instant shield. Toggle both parent stances below.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Taking the bait vs. neutral anchor stance',
          visualStageHint: 'Toggle reactive pushback vs. steady neutral authority',
          visualConfig: {
            calmToggleLabel: 'Neutral Anchor Stance',
            stormToggleLabel: 'Match the Heat',
            calmStatus: 'BAIT IGNORED · TASK STILL STANDS',
            stormStatus: 'POWER WAR IGNITED · CHORE FORGOTTEN',
            calmReadouts: [
              {
                name: 'Tween Social Alarm',
                value: 'De-Escalating',
                tone: 'spruce',
                desc: 'With no angry audience to push against, dramatic sighing runs out of fuel within 20 seconds.',
              },
              {
                name: 'Parental Authority',
                value: 'Unshaken',
                tone: 'spruce',
                desc: 'Calmly repeating the expectation shows quiet confidence, far stronger than raising your voice.',
              },
            ],
            stormReadouts: [
              {
                name: 'Tween Social Alarm',
                value: 'Flooded',
                tone: 'amber',
                desc: '“Don’t you dare take that tone with me!” confirms {poss} panicked reflex that you are attacking {obj}.',
              },
              {
                name: 'Original Request',
                value: 'Derailed',
                tone: 'amber',
                desc: 'The dishwasher sits full while everyone retreats angry behind closed doors.',
              },
            ],
          },
          almanacTruth:
            'Staying calm during a tween eye-roll is not letting disrespect slide, it is refusing to hand over the steering wheel while keeping the boundary rock solid.',
          scienceDeepDive:
            'Neuroimaging work led by Dr. Sarah-Jayne Blakemore shows that early pubertal remodeling heightens medial prefrontal sensitivity to perceived social evaluation and loss of status, making routine directives feel unexpectedly humiliating; non-reactive adult composure dampens threat feedback loops rapidly.',
          beat3Kicker: 'Practice in the hallway',
          beat3Title: 'Drop your shoulders, keep your face soft, and anchor the task',
          rehearsalTriggerSpeaker: '{Name} groaning dramatically over a 3-minute chore',
          rehearsalTriggerQuote: '“Seriously?! You ALWAYS ask me right when I sit down! Nobody else does anything!”',
          rehearsalPrompt: 'Which natural reflex accidentally pours fuel on the eye-roll?',
          instincts: [
            {
              id: 'respect',
              label: '“Excuse me?! Lose the eye-roll and watch who you’re talking to!”',
              whyTitle: 'Why that’s so tempting, and why it escalates',
              whyText:
                'Demanding instant facial compliance while a tween is flooded turns a small household job into a high-stakes pride battle.',
            },
            {
              id: 'martyr',
              label: '“Fine, forget it! I’ll just do everything myself like I always do!”',
              whyTitle: 'Why that’s so tempting, and why it backfires',
              whyText:
                'Storming off teaches {name} that big enough attitude makes chores disappear, while leaving you simmering with resentment.',
            },
          ],
          calmScriptPlain:
            '“Sounds like you’re tired of chores right now. Still needs to be unloaded before dinner, we’ll check in on tone once you’re cooled down.”',
          calmScriptSegments: [
            {
              id: 'ack',
              text: '“Sounds like you’re tired of chores right now. ',
              tag: 'De-fuse without taking bait',
              note: 'Acknowledges annoyance briefly without debating who works harder in the house.',
            },
            {
              id: 'task',
              text: 'Still needs to be unloaded before dinner, ',
              tag: 'Quiet solid boundary',
              note: 'Keeps the household expectation intact with zero volume increase.',
            },
            {
              id: 'defer',
              text: 'we’ll check in on tone once you’re cooled down.”',
              tag: 'Park respect talk for calm',
              note: 'Signals that disrespect is noticed without staging a hallway courtroom.',
            },
          ],
          deliveryCues: [
            'Unclench your jaw and let your arms hang relaxed',
            'Keep your voice low, brief, and completely unhurried',
            'Walk away calmly instead of hovering to watch {obj} comply',
          ],
          pushbacks: [
            {
              id: 'mumble',
              label: 'What if {pronoun} unloads the dishes while muttering angrily under {poss} breath?',
              setup: 'Let the grumbling float past, compliance with grumbling still counts as progress!',
              script: 'Say nothing during the muttering; thank {obj} casually when finished, then mention respect gently later.',
            },
            {
              id: 'refuse',
              label: 'What if {pronoun} flatly refuses and walks straight to {poss} room?',
              setup: 'Hold the natural sequence calmly instead of chasing {obj} down the hall.',
              script: '“No rush, screens and hangout time start right after the kitchen job is finished.”',
            },
          ],
          advisorPrompt:
            'My {age} tween rolls {poss} eyes and uses sharp sarcasm whenever I ask for simple chores. How can I hold respectful boundaries without daily blowups?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Pick one steady move for the next eye-roll',
          beat4Lead: 'Choose the single cue that helps your nervous system stay calm before you speak.',
          moves: [
            {
              id: 'shoulders-drop',
              title: 'The 5-second shoulder drop',
              desc: 'Before replying to sarcasm tonight, exhale slowly, soften your brow, and pause five quiet seconds.',
            },
            {
              id: 'separate-tone',
              title: 'Separate tone from task',
              desc: 'Restate the single expectation in under 12 words and save the respect chat for one hour later.',
            },
            {
              id: 'walk-away',
              title: 'Deliver the boundary and step away',
              desc: 'Leave the room calmly so {name} can save face and finish the job without an audience.',
            },
          ],
          closingNote:
            'When an 11-year-old tries out sharp attitude on you, it stings, yet your quiet steadiness proves that big waves cannot tip the boat you built together.',
          pocketInsight: 'Drop your shoulders, skip the tone debate mid-heat, and anchor the task in one calm sentence.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 2',
            mystery: 'Why can {name} go from laughing on the couch to sobbing behind a locked door in 15 seconds flat?',
            title: 'Why Mood Swings Spike at Age 10 (Before Visible Puberty)',
            targetSlug: 'tween-adrenarche-and-dhea-neurobiology',
          },
          interactiveHighlights: ['Neutral vs. reactive brain toggle', 'Annotated tone-vs-task script'],
        },
      },
      {
        slug: 'tween-adrenarche-and-dhea-neurobiology',
        title: 'Why Mood Swings Spike at Age 10 (Before Visible Puberty)',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Hidden hormonal shift · Emotional shock absorber',
          headline: 'Why Mood Swings Spike at Age 10 (Before Visible Puberty)',
          deck: 'Why your tween can go from joyful to volcanic in 15 seconds, and how seeing early biological shifts turns bewildering storms into moments of steady connection.',
          sceneTime: '7:40 PM · LIVING ROOM COUCH',
          sceneBody:
            'Twenty minutes ago {name} was giggling next to you sharing popcorn. Then you casually mention tomorrow’s math quiz. Suddenly tears spill, {poss} jaw tightens, and {pronoun} bursts out, “YOU NEVER LET ME RELAX! EVERYTHING IS TOO HARD!” before bolting upstairs. *You stare at the popcorn bowl wondering how the weather flipped 180 degrees in ten seconds.*',
          pollQuestion: 'Have sudden, out-of-nowhere tween mood drops caught your family off guard lately?',
          pollOptions: [
            {
              id: 'whiplash',
              label: 'Yes, emotional whiplash from happy to furious in seconds!',
              response:
                'You are witnessing adrenarche in real time: early hormone surges hit the emotional brain years before outward puberty begins.',
            },
            {
              id: 'worried',
              label: 'It makes me worry something huge is wrong beneath the surface',
              response:
                'Staying curious is wise, and knowing that abrupt evening mood dips are biologically common at 10–12 keeps you calm enough to be {poss} safe harbor.',
            },
          ],
          beat2Kicker: 'Two views of a sudden storm',
          beat2Title: 'Early pubertal chemistry turns whispers into sirens',
          beat2Lead:
            'Long before visible puberty, rising adrenal hormones (DHEA) prime emotional circuits while braking pathways are still under renovation. Flip both lenses below and explore how steady parent reactions build emotional balance over time.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Sudden mood whiplash: adult lens vs. tween brain lens',
          visualStageHint: 'Flip lenses and tap steady shock-absorber reps',
          visualConfig: {
            adultLabel: 'Parent instinct lens',
            adultQuote: '“Wait, one tiny reminder about math made {obj} explode?! That reaction is way over the top!”',
            adultSub: 'To an adult nervous system, a small schedule note looks completely harmless.',
            childLabel: '{Possessive} adrenarche lens',
            childQuote: '“My chest just got tight out of nowhere. I feel overwhelmed and I don’t even know why!”',
            childSub: 'Sudden hormone-driven surges create genuine emotional vertigo that surprises {name} as much as you.',
            exposureHeading: 'Steady Shock-Absorber Reps',
            exposureSub: 'Tap reps to watch {name} learn how to ride big waves faster',
            totalDots: 12,
            defaultCount: 5,
            unitLabel: 'calm storm',
            lowMax: 4,
            midMax: 8,
            lowMsg: 'Early waves feel startling for both of you, your calm presence without shaming keeps doors open.',
            midMsg: 'Middle waves: {Name} starts recognizing “I’m overloaded right now” and asking for 10 minutes alone.',
            highMsg: 'Resilient recovery! {Name} trusts that huge feelings pass safely and comes back out to reconnect.',
          },
          almanacTruth:
            'Mental health at age 10–12 does not mean staying cheerful all day, it means having big, bumpy waves and trusting a steady adult shock absorber beside you.',
          scienceDeepDive:
            'Developmental endocrinology and clinical psychology research summarized by Dr. Lisa Damour explains that adrenarche (rising adrenal androgens beginning around ages 8–10) amplifies limbic emotional intensity two to three years ahead of visible physical puberty, making sudden crying or irritability biologically expected rather than manipulative.',
          beat3Kicker: 'Practice outside the bedroom door',
          beat3Title: 'Offer warmth without forcing an instant post-mortem',
          rehearsalTriggerSpeaker: '{Name} tearing up and bolting upstairs over a small reminder',
          rehearsalTriggerQuote: '“Just leave me alone! Everything stresses me out and you don’t get it!”',
          rehearsalPrompt: 'Which response accidentally deepens tween shame during a sudden hormone dip?',
          instincts: [
            {
              id: 'overreact',
              label: '“Stop crying, you’re acting like a five-year-old over one tiny quiz!”',
              whyTitle: 'Why that’s so tempting, and why it wounds deeply',
              whyText:
                'Mocking emotional vertigo confirms a tween’s scariest secret thought: “Something is broken inside me.”',
            },
            {
              id: 'interrogate',
              label: '“Open this door right now and tell me what is ACTUALLY going on!”',
              whyTitle: 'Why that’s so tempting, and why it locks the wall tighter',
              whyText:
                'Cornering an overwhelmed tween forces defensive anger when {pronoun} genuinely cannot articulate why {poss} feelings surged.',
            },
          ],
          calmScriptPlain:
            '“Looks like everything just hit like a wave at once. Take ten quiet minutes in your room, no trouble at all. I’m downstairs whenever you want tea or company.”',
          calmScriptSegments: [
            {
              id: 'name-wave',
              text: '“Looks like everything just hit like a wave at once. ',
              tag: 'Normalize without diagnosing',
              note: 'Names emotional overload as temporary weather, never a character flaw.',
            },
            {
              id: 'space',
              text: 'Take ten quiet minutes in your room, no trouble at all. ',
              tag: 'Dignified decompression',
              note: 'Grants private cooling space while removing fear of punishment.',
            },
            {
              id: 'beacon',
              text: 'I’m downstairs whenever you want tea or company.”',
              tag: 'Warm open lighthouse',
              note: 'Leaves the bridge lit so {name} can walk back out on {poss} own dignity.',
            },
          ],
          deliveryCues: [
            'Speak calmly through the door or slide a 1-line warm note underneath',
            'Notice hunger, sleep debt, or heavy social days hiding behind evening dips',
            'Welcome {obj} back warmly without rehashing the outburst',
          ],
          pushbacks: [
            {
              id: 'quiet-hours',
              label: 'What if {pronoun} stays shut inside {poss} room all evening?',
              setup: 'Bring a warm low-pressure offering without demanding conversation.',
              script: 'Knock softly: “Dropped some apple slices by your door. Zero need to talk, just love you.”',
            },
            {
              id: 'always-sad',
              label: 'When should I check in with a pediatrician or counselor?',
              setup: 'Short, passing storms that rebound quickly are normal; weeks of persistent withdrawal deserve professional care.',
              script: '“If heavy feelings hang around for two full weeks or disrupt sleep and friendships, let’s loop in your pediatrician together for extra support.”',
            },
          ],
          advisorPrompt:
            'My {age} tween has sudden emotional crashes out of nowhere right before bed or after school. How do I support {obj} as a calm shock absorber?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Choose one shock-absorber move for this week',
          beat4Lead: 'Pick the gentle support cue that fits how your tween resets best.',
          moves: [
            {
              id: 'note-bridge',
              title: 'The one-line sticky-note bridge',
              desc: 'When a door shuts hard, slip a simple note underneath: “Big wave tonight. No rush. I’m in your corner.”',
            },
            {
              id: 'weather-check',
              title: 'Spot the hidden fuel triggers',
              desc: 'Quietly track whether sudden blowups cluster right after hungry stretches, late nights, or heavy school days.',
            },
            {
              id: 'movement-vent',
              title: 'Offer a physical pressure release',
              desc: 'Invite a quick walk around the block, shooting hoops, or music with headphones to shake off adrenaline.',
            },
          ],
          closingNote:
            'Being your tween’s emotional shock absorber does not mean fixing every passing wave, it means letting {obj} feel the bump while knowing you never wobble.',
          pocketInsight: 'Sudden age-10 mood storms are early biological weather, stay steady, grant space, and keep the porch light on.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 3',
            mystery: 'Why do face-to-face kitchen questions get one-word grunts, while a 10-minute car ride unlocks everything?',
            title: 'The Car-Ride Secret: Why Side-by-Side Talks Unlock Tweens',
            targetSlug: 'tween-side-by-side-communication',
          },
          interactiveHighlights: ['Parent vs. tween adrenarche lens', 'Shock-absorber rep map'],
        },
      },
      {
        slug: 'tween-side-by-side-communication',
        title: 'The Car-Ride Secret: Why Side-by-Side Talks Unlock Tweens',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Eyes forward · Low-pressure side-by-side openness',
          headline: 'The Car-Ride Secret: Why Side-by-Side Talks Unlock Tweens',
          deck: 'Why sitting across the table asking “How was school?” gets “Fine”, and how shoulders-parallel moments unlock honest tween stories effortlessly.',
          sceneTime: '8:15 PM · DRIVING HOME FROM PRACTICE',
          sceneBody:
            'At dinner you sat directly across from {name}, made earnest eye contact, and asked about friend drama, getting a hoodie pulled low and one flat syllable: “Fine.” *Yet tonight, staring out the front windshield in the dark car with quiet music playing, {pronoun} suddenly clears {poss} throat and says, “Hey… can I ask you something weird about lunch today?”*',
          pollQuestion: 'Where does your tween actually open up most honestly?',
          pollOptions: [
            {
              id: 'car-bed',
              label: 'In the car or right when I turn out the bedroom lights!',
              response:
                'Every seasoned tween parent recognizes that magic window, removing intense eye contact immediately lowers self-consciousness!',
            },
            {
              id: 'closed',
              label: 'Right now almost everywhere gets one-word answers',
              response:
                'Trading face-to-face interviews for relaxed side-by-side rituals (errands, walking the dog, baking) quietly reopens the channel.',
            },
          ],
          beat2Kicker: 'The side-by-side conversation loop',
          beat2Title: 'Eyes on the road make vulnerability feel safe',
          beat2Lead:
            'Direct adult eye contact feels like an interrogation spotlight to a self-conscious tween. Walking, driving, or cooking side-by-side removes scrutiny so honest thoughts flow naturally. Step through the 3-beat loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 80/20 side-by-side disclosure loop',
          visualStageHint: 'Tap each step to keep the conversation flowing',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Parallel setup',
                label: 'Eyes Forward',
                quote: 'Hands busy or windshield ahead, zero interrogation gaze',
                desc: 'Sit shoulder-to-shoulder driving, tossing a ball, chopping veggies, or folding socks together.',
                brainNote: 'Removing frontal gaze quiets social-scrutiny centers immediately.',
              },
              {
                stepNum: '02',
                actor: '{Name} drops a crumb',
                label: 'The Quiet Bid',
                quote: '“Lunch was kind of annoying today…”',
                desc: 'Resist jumping straight into rapid-fire questions or fixing, just echo warmly with “Huh, tell me more.”',
                brainNote: 'Low-stakes curiosity signals it is safe to share the deeper layer.',
              },
              {
                stepNum: '03',
                actor: 'You listen 80%',
                label: 'Unhurried Pause',
                quote: 'Wait 4 calm seconds after {pronoun} finishes a sentence',
                desc: 'In that quiet beat, tweens almost always add the real truth they were testing whether you could handle.',
                brainNote: 'Uninterrupted listening builds lifelong trust that you can handle big topics.',
              },
            ],
          },
          almanacTruth:
            'Tweens share four times more about their real inner world when both of you are looking in the same direction than when you sit face-to-face across a table.',
          scienceDeepDive:
            'Social-neuroscience studies of adolescent gaze perception demonstrate that sustained direct eye contact from authority figures increases amygdala vigilance during self-disclosure; parallel shared-attention contexts reduce social threat and support reflective prefrontal speech.',
          beat3Kicker: 'Practice in the front seat',
          beat3Title: 'Catch a tiny breadcrumb without turning it into an interrogation',
          rehearsalTriggerSpeaker: '{Name} gazing out the passenger window after practice',
          rehearsalTriggerQuote: '“Everyone in fifth period was being super fake today. Whatever.”',
          rehearsalPrompt: 'Which well-meaning reply shuts down the car-ride window fastest?',
          instincts: [
            {
              id: 'rapid-fire',
              label: '“Who was being fake? Was it Jordan? What did they say? Should I text their mom?”',
              whyTitle: 'Why that’s so tempting, and why {name} clams up',
              whyText:
                'Rapid-fire questions plus parental rescue threats make tweens terrified of losing social control.',
            },
            {
              id: 'minimizing',
              label: '“Oh honey, middle school drama is silly, just ignore them and focus on class!”',
              whyTitle: 'Why that’s so tempting, and why it breaks trust',
              whyText:
                'Shrinking social pain tells {name} you don’t take {poss} world seriously, so {pronoun} stops sharing it.',
            },
          ],
          calmScriptPlain:
            '“Oof, fake friend energy is exhausting to sit through all period. Did something shift at lunch, or was it building all week?”',
          calmScriptSegments: [
            {
              id: 'empathize',
              text: '“Oof, fake friend energy is exhausting to sit through all period. ',
              tag: 'Validate the real weight',
              note: 'Takes tween social friction seriously without magnifying panic.',
            },
            {
              id: 'one-open',
              text: 'Did something shift at lunch, or was it building all week?”',
              tag: 'One gentle curious nudge',
              note: 'Offers an easy open doorway while leaving {name} totally in charge of how much to share.',
            },
          ],
          deliveryCues: [
            'Keep eyes casually on the road, don’t whip your head around',
            'Aim for 80% listening and 20% speaking',
            'Ask “Want my advice or just a safe vent?” before offering solutions',
          ],
          pushbacks: [
            {
              id: 'just-vent',
              label: 'What if {pronoun} shrugs and says “Nothing, I don’t want to talk about it”?',
              setup: 'Honor the pause cheerfully, pressure kills future bids.',
              script: '“Totally fine, glad you’re riding shotgun with me. Want to pick the next song?”',
            },
            {
              id: 'late-night',
              label: 'What if {pronoun} only opens up at 9:45 PM when I’m exhausted?',
              setup: 'Give 5–10 precious minutes if you can, or book a guaranteed next-day ride.',
              script: '“I love hearing this, let’s take five quiet minutes right now, and finish over cocoa tomorrow after school.”',
            },
          ],
          advisorPrompt:
            'My {age} tween gives one-word answers whenever I ask about school or friends. How can I build relaxed side-by-side moments where {pronoun} opens up?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Create one side-by-side opening this week',
          beat4Lead: 'Pick one relaxed parallel moment where zero direct eye contact is required.',
          moves: [
            {
              id: 'errand-copilot',
              title: 'Invite a 15-minute errand copilot',
              desc: 'Ask {name} to ride along for groceries or smoothies, hand {obj} the music playlist, and ask zero quiz questions.',
            },
            {
              id: 'four-second-pause',
              title: 'Practice the 4-second listening pause',
              desc: 'After {name} finishes a thought tonight, count four silent seconds before speaking, watch the real story follow.',
            },
            {
              id: 'hands-busy',
              title: 'Side-by-side kitchen or walk chat',
              desc: 'Prep snacks, walk the dog, or shoot baskets together for 10 minutes with phones left indoors.',
            },
          ],
          closingNote:
            'Some of the bravest conversations of the tween years happen in the glow of a dashboard, keep showing up beside {obj}, and {pronoun} will keep trusting you with the truth.',
          pocketInsight: 'Ditch face-to-face interviews: put shoulders parallel, keep eyes forward, and listen 80% of the time.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 4',
            mystery: 'What happens AFTER a door gets slammed, and how do you repair without pretending it was fine?',
            title: 'Repairing Warmth After Slammed Doors',
            targetSlug: 'tween-respectful-repair-contracts',
          },
          interactiveHighlights: ['3-step side-by-side disclosure loop', 'Car-ride listening script'],
        },
      },
      {
        slug: 'tween-respectful-repair-contracts',
        title: 'Repairing Warmth After Slammed Doors',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Rupture to repair · Clear standards plus warmth',
          headline: 'Repairing Warmth After Slammed Doors',
          deck: 'Why silent treatment and multi-day grounding erode tween closeness, and how a simple 3-part repair ritual teaches real accountability with dignity intact.',
          sceneTime: '8:50 PM · ONE HOUR AFTER A BLOWUP',
          sceneBody:
            'Earlier tonight a disagreement over homework ended with {name} shouting “You never trust me!” and slamming {poss} door hard enough to rattle the frame, and maybe you snapped back louder than you meant to, too. *Now the house is awkwardly quiet, and you wonder: do I ground {obj} for the weekend, or pretend nothing happened?*',
          pollQuestion: 'What happens most often in your house after a heated conflict?',
          pollOptions: [
            {
              id: 'awkward',
              label: 'We both act awkward until it awkwardly fades away',
              response:
                'Skipping repair leaves tiny splinters under the rug, a calm 2-minute circle-back turns rupture into the strongest trust glue you have!',
            },
            {
              id: 'punish',
              label: 'I hand out a big consequence, then later feel bad about how tense we are',
              response:
                'Moving from heavy punishment to honest repair holds the exact same standard of respect while teaching real adult conflict skills.',
            },
          ],
          beat2Kicker: 'Punishment vs. respectful repair',
          beat2Title: 'Accountability grows best in warmth, never cold silence',
          beat2Lead:
            'Tweens do not learn respectful conflict from days of icy silence or taking away Saturday soccer. They learn it by watching you own your piece first and walking through a clean repair guardrail together. Compare both paths below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Cold standoff vs. family repair guardrail',
          visualStageHint: 'Compare punitive shutdown vs. warm accountability',
          visualConfig: {
            willpowerLabel: 'Standoff & Grounding',
            willpowerTitle: 'Escalating punishments that breed secrecy',
            willpowerDesc:
              'Cold shoulders or losing unrelated weekend privileges make tweens obsess over unfairness instead of reflecting on their own choices.',
            willpowerOutcome: 'Lingering resentment and kids hiding future mistakes.',
            guardrailLabel: 'Clean Repair Guardrail',
            guardrailTitle: 'Own your part, name the boundary, reset cleanly',
            guardrailDesc:
              'Both people wait until hearts cool, own their side without blame, agree on a better signal next time, and move forward warmly.',
            guardrailOutcome: 'Deep trust and genuine tween ownership of tone.',
            environmentShifts: [
              'Establish a family “pause word” anyone can call before doors slam.',
              'Agree that repair always happens within 24 hours, never multi-day cold shoulders.',
              'Model owning your own sharp tone first so {name} sees strength, not shame, in apologizing.',
            ],
          },
          almanacTruth:
            'A parent who returns calmly after a tense evening teaches two priceless lessons at once: anger does not break our love, and we always clean up our side of the street.',
          scienceDeepDive:
            'Attachment repair research synthesized by Dr. Dan Siegel and Dr. Becky Kennedy shows that predictable rupture-and-repair cycles build stronger adolescent emotional security and self-accountability than conflict-free perfection or punitive withdrawal.',
          beat3Kicker: 'Practice the quiet knock',
          beat3Title: 'Open the door to honest two-way repair',
          rehearsalTriggerSpeaker: 'You knocking softly an hour after an argument and door slam',
          rehearsalTriggerQuote: '“Yeah… what? Are you here to yell at me again?”',
          rehearsalPrompt: 'Which opening immediately puts walls right back up?',
          instincts: [
            {
              id: 'apology-demand',
              label: '“I’m waiting for an apology for slamming that door, and you lost screens all weekend!”',
              whyTitle: 'Why that’s so tempting, and why it produces fake apologies',
              whyText:
                'Demanding a forced apology on the spot teaches compliance theater, not heartfelt responsibility.',
            },
            {
              id: 'rug-sweep',
              label: '“Hey, want ice cream? Let’s just forget earlier ever happened!”',
              whyTitle: 'Why that’s so tempting, and what it misses',
              whyText:
                'Sweeping slammed doors under the rug skips the golden chance to practice respectful repair together.',
            },
          ],
          calmScriptPlain:
            '“No yelling, just wanted to reset. I snapped louder than I wanted earlier, and that’s on me. Slammed doors still aren’t okay in our house; next time you feel cornered, can we use a 10-minute pause instead?”',
          calmScriptSegments: [
            {
              id: 'own-first',
              text: '“No yelling, just wanted to reset. I snapped louder than I wanted earlier, and that’s on me. ',
              tag: 'Lead with clean ownership',
              note: 'Modeling non-defensive ownership melts tween shame instantly.',
            },
            {
              id: 'firm-norm',
              text: 'Slammed doors still aren’t okay in our house; ',
              tag: 'Keep house standard clear',
              note: 'Warm repair never drops the family expectation of mutual respect.',
            },
            {
              id: 'next-plan',
              text: 'next time you feel cornered, can we use a 10-minute pause instead?”',
              tag: 'Co-design the redo',
              note: 'Shifts energy from past guilt toward a concrete skill for next time.',
            },
          ],
          deliveryCues: [
            'Wait at least 30–60 minutes until both nervous systems have cooled',
            'Own your tone without adding “...but you made me!”',
            'End with a warm touch on the shoulder or light humor once clear',
          ],
          pushbacks: [
            {
              id: 'no-sorry',
              label: 'What if {pronoun} still grunts “Whatever” and doesn’t apologize back right away?',
              setup: 'Plant the seed without forcing instant words, tweens often circle back an hour later.',
              script: '“No pressure to say anything right now. I just wanted us clear before sleep. Love you.”',
            },
            {
              id: 'broke-thing',
              label: 'What if slamming the door actually knocked a picture off the wall?',
              setup: 'Keep repair logical and practical rather than shaming.',
              script: '“Let’s sweep up the frame together tomorrow and hang it back up, we always fix what gets bumped when tempers run hot.”',
            },
          ],
          advisorPrompt:
            'My {age} tween and I just had a loud argument with a slammed door. How do I lead a calm repair conversation tonight that still keeps respect boundaries clear?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Install one family repair habit',
          beat4Lead: 'Pick a simple ritual that keeps conflict honest and brief.',
          moves: [
            {
              id: 'pause-signal',
              title: 'Pick a mutual “pause” code word',
              desc: 'Agree during a happy dinner that either of you can say “Pause, 10 minutes” before voices climb or doors slam.',
            },
            {
              id: 'same-day-reset',
              title: 'The 24-hour repair promise',
              desc: 'Commit to circling back warmly within a day after any tense clash, owning your tone cleanly first.',
            },
            {
              id: 'redo-practice',
              title: 'Offer a lighthearted “redo”',
              desc: 'When mild snark slips out, smile gently and say “Want a free 5-second redo on that sentence?”',
            },
          ],
          closingNote:
            'Every time you walk back into {poss} room with steady love after a hard night, you write the exact blueprint {name} will carry into every future friendship and relationship.',
          pocketInsight: 'Wait for calm, own your tone first, keep house respect clear, and agree on a pause signal for next time.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Standoff vs. repair guardrail', 'Clean 3-part repair script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 27: Tween Sleep Shifts, Hygiene Dignity & Sports Recovery (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'health-tween-circadian-leaps',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    title: 'Tween Sleep Shifts, Hygiene Dignity & Sports Recovery',
    reliefSubtitle:
      'Decode why 9 PM sleep suddenly stops working, install a pubertal 2-hour wind-down, protect growing joints in youth sports, and handle hygiene talks with dignity',
    tonightQuickWinTitle: 'Episode 1: Why {Name} Suddenly Can’t Fall Asleep at 9 PM Anymore',
    summary:
      'Understand the biological circadian clock shift starting around age 10–12, replace bedtime battles with a realistic 2-hour dim-light wind-down, protect growing bones and hydration during youth sports, and talk about deodorant and skincare without embarrassing your tween.',
    coverImageUrl: 'https://assets.alongside.care/academy/health-tween.png',
    sortOrder: 6,
    episodes: [
      {
        slug: 'tween-pubertal-circadian-shift',
        title: 'Why {Name} Suddenly Can’t Fall Asleep at 9 PM Anymore',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Biological clock shift · Working with melatonin, not against it',
          headline: 'Why {Name} Suddenly Can’t Fall Asleep at 9 PM Anymore',
          deck: 'Why your tween stares wide-eyed at the ceiling at 9:30 PM even when tired, and how morning sunlight plus dimmer evenings pull sleep smoothly back on track.',
          sceneTime: '9:55 PM · BEDROOM DOORWAY',
          sceneBody:
            'Two years ago {name} drifted off effortlessly at 8:30 PM. Tonight it’s almost ten, you peek in, and {pronoun} {is} wide awake reading under the covers, yet tomorrow morning at 6:45 AM {pronoun} will groan like a bear waking from hibernation. *It’s tempting to assume {pronoun} {is} stalling on purpose, until you see what puberty just did to {poss} internal clock.*',
          pollQuestion: 'Has bedtime suddenly started drifting later at your house?',
          pollOptions: [
            {
              id: 'wide-awake',
              label: 'Yes, {pronoun} swears {pronoun} {is} not even sleepy until 10 PM!',
              response:
                'That’s not stalling, early pubertal hormones push evening melatonin release roughly 60–90 minutes later almost overnight!',
            },
            {
              id: 'morning-drag',
              label: 'Mornings feel impossible because school starts so early',
              response:
                'Early school bells collide directly with shifting tween clocks, anchoring morning light and evening dimness helps reclaim precious rest.',
            },
          ],
          beat2Kicker: 'Inside the shifting tween clock',
          beat2Title: 'Puberty nudges the sleep switch 1–2 hours later',
          beat2Lead:
            'Around ages 10–12, the brain’s master clock starts releasing melatonin later at night while tweens still need 9 to 11 hours of sleep for memory and growth. Tap each point on the daily circadian curve below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'The shifting tween melatonin curve',
          visualStageHint: 'Tap each time window to anchor better sleep cues',
          visualConfig: {
            stages: [
              {
                time: '7:00 AM',
                label: 'Bright Wake Cue',
                level: 20,
                title: 'Morning daylight resets tonight’s melatonin timer',
                desc: 'Opening curtains or walking outside within 30 minutes of waking pulls tonight’s sleepiness earlier.',
                tip: 'Breakfast near a sunny window beats 10 extra minutes under dark covers.',
              },
              {
                time: '3:30 PM',
                label: 'Caffeine Cutoff',
                level: 45,
                title: 'Hidden sodas, iced teas, and chocolate block deep sleep',
                desc: 'Caffeine stays active in a tween’s brain for 8+ hours, delaying already-late melatonin.',
                tip: 'Switch to water, herbal tea, or caffeine-free drinks after lunch.',
              },
              {
                time: '8:30 PM',
                label: 'Dim Light Shift',
                level: 74,
                title: 'Bright overhead LEDs fool the clock into daytime',
                desc: 'Switching to warm bedside lamps and docking bright screens lets natural melatonin rise on schedule.',
                tip: 'Use warm low lamps and paper books or audio stories in the last hour.',
              },
              {
                time: '9:30 PM',
                label: 'Restorative Sleep',
                level: 92,
                title: 'Deep growth & emotional memory cycles lock in',
                desc: 'Tweens aged 10–12 still thrive on 9–11 hours, protecting consistent wake times steadies mood all week.',
                tip: 'Keep weekend wake times within ~60 minutes of weekdays so Monday isn’t jet-lagged.',
              },
            ],
          },
          almanacTruth:
            'Your tween isn’t defying bedtime to drive you crazy, their internal clock literally shifted time zones, and bright evening light pushes it even further behind.',
          scienceDeepDive:
            'Circadian biology research pioneered by Dr. Mary Carskadon shows that pubertal phase delay begins in late elementary/early middle school, shifting dim-light melatonin onset later by 1–2 hours; morning natural light exposure and evening blue-light reduction reliably pull sleep onset earlier.',
          beat3Kicker: 'Practice at lights-out',
          beat3Title: 'Shift from sleep policing to calm body-clock teamwork',
          rehearsalTriggerSpeaker: '{Name} tossing wide awake in bed at 9:40 PM',
          rehearsalTriggerQuote: '“I’m trying to sleep! My brain literally won’t turn off, can I just watch one video?”',
          rehearsalPrompt: 'Which bedtime reply accidentally makes insomnia worse?',
          instincts: [
            {
              id: 'order-sleep',
              label: '“Just close your eyes and go to sleep RIGHT NOW or tomorrow will be miserable!”',
              whyTitle: 'Why that’s so tempting, and why it backfires',
              whyText:
                'Performance pressure around falling asleep releases stress hormones that make drifting off physically harder.',
            },
            {
              id: 'screen-cave',
              label: '“Fine, take the tablet for 20 minutes until you feel tired.”',
              whyTitle: 'Why that’s so tempting, and why it delays sleep more',
              whyText:
                'Close-range bright light signals midday to the retina, suppressing melatonin right when you need it rising.',
            },
          ],
          calmScriptPlain:
            '“No wonder your brain feels wide awake, tween clocks actually shift later at your age. Screens stay docked so melatonin can catch up, but you’re totally welcome to read with your warm lamp or listen to an audiobook until your eyelids get heavy.”',
          calmScriptSegments: [
            {
              id: 'normalize-clock',
              text: '“No wonder your brain feels wide awake, tween clocks actually shift later at your age. ',
              tag: 'Remove sleep guilt',
              note: 'Explains the real biology so {name} stops fighting frustration in the dark.',
            },
            {
              id: 'hold-dock',
              text: 'Screens stay docked so melatonin can catch up, ',
              tag: 'Biology-backed boundary',
              note: 'Frames the screen boundary around how eyes and hormones work, not control.',
            },
            {
              id: 'rest-option',
              text: 'but you’re totally welcome to read with your warm lamp or listen to an audiobook until your eyelids get heavy.”',
              tag: 'Zero-pressure bridge to sleep',
              note: 'Takes pressure off forcing sleep so natural drowsiness glides in quickly.',
            },
          ],
          deliveryCues: [
            'Keep voice calm and matter-of-fact, never anxious about the clock',
            'Swap bright ceiling bulbs for a warm amber bedside bulb',
            'Focus on “quiet resting time” rather than commanding instant sleep',
          ],
          pushbacks: [
            {
              id: 'weekend-noon',
              label: 'What if {pronoun} wants to sleep until noon every Saturday and Sunday?',
              setup: 'Big weekend catch-up swings create “social jet lag” every Sunday night.',
              script: '“Let’s aim for one extra hour of sleep-in on weekends plus bright breakfast light, that way Sunday night doesn’t feel brutal!”',
            },
            {
              id: 'worry-mind',
              label: 'What if racing worries about school keep {obj} awake?',
              setup: 'Keep a bedside notebook to empty worries onto paper before lights-out.',
              script: '“Let’s park tomorrow’s thoughts on your notepad so your brain doesn’t have to guard them all night.”',
            },
          ],
          advisorPrompt:
            'My {age} tween can’t fall asleep until late and struggles hard to wake for school. How can we gently adjust {poss} sleep clock without nightly battles?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Pick one circadian anchor to start tomorrow',
          beat4Lead: 'One small light cue beats ten bedtime reminders.',
          moves: [
            {
              id: 'morning-sun',
              title: '10 minutes of bright morning light',
              desc: 'Open bedroom curtains wide right at wake-up and eat breakfast near daylight to set tonight’s sleep timer.',
            },
            {
              id: 'warm-lamp',
              title: 'Install a warm low bedside lamp',
              desc: 'Switch off bright overhead lights one hour before target sleep so natural melatonin rises smoothly.',
            },
            {
              id: 'rest-vs-sleep',
              title: 'Offer paper books or audio for wide-awake nights',
              desc: 'Replace “go to sleep right now!” with calm quiet-body reading in warm dim light.',
            },
          ],
          closingNote:
            'Understanding that your tween’s clock genuinely shifted lets you step out of bedtime policing and become the calm ally protecting {poss} growing brain.',
          pocketInsight: 'Morning sunlight + dim evening lamps pull shifting tween clocks earlier far better than bedtime lectures.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 2',
            mystery: 'What exact 2-hour evening sequence helps a wired tween slide smoothly toward sleep?',
            title: 'The 2-Hour Evening Wind-Down That Works With Puberty',
            targetSlug: 'tween-two-hour-melatonin-winddown',
          },
          interactiveHighlights: ['4-stage tween circadian curve', 'Zero-pressure lights-out script'],
        },
      },
      {
        slug: 'tween-two-hour-melatonin-winddown',
        title: 'The 2-Hour Evening Wind-Down That Works With Puberty',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: '2-hour landing strip · From homework rush to calm rest',
          headline: 'The 2-Hour Evening Wind-Down That Works With Puberty',
          deck: 'Why slamming from bright homework screens straight into a dark bed fails every time, and the 4-beat evening landing strip tweens actually cooperate with.',
          sceneTime: '8:45 PM · DESK TO BEDROOM RUSH',
          sceneBody:
            'At 8:40 PM {name} is still finishing a glowing laptop assignment, scarfing a late snack, and texting a friend about soccer cleats. At 9:00 PM sharp you say “Lights out NOW!” and wonder why {pronoun} bounces off the walls for another hour. *A tween brain needs a gentle runway, not an emergency brake.*',
          pollQuestion: 'Which evening bottleneck wrecks bedtime most often in your home?',
          pollOptions: [
            {
              id: 'late-hw',
              label: 'Late-night homework or activities pushing everything back',
              response:
                'Moving backpack prep and warm showers slightly earlier gives the nervous system a reliable downshift cue.',
            },
            {
              id: 'second-wind',
              label: 'A mysterious 8:30 PM burst of energy and silliness',
              response:
                'That second wind hits right when screens and bright lights keep cortisol humming, a predictable landing sequence softens it fast.',
            },
          ],
          beat2Kicker: 'The 2-hour sleep landing strip',
          beat2Title: 'Cool body temperature + dim lights cue automatic drowsiness',
          beat2Lead:
            'Falling asleep requires both rising melatonin and a slight drop in core body temperature. Walk through the 4 calm evening beats that nudge tween physiology gently toward rest.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 2-hour tween evening landing strip',
          visualStageHint: 'Tap each evening beat to see how it cues sleep',
          visualConfig: {
            steps: [
              {
                timeOrCue: '-2 hrs',
                label: 'Wrap Tasks',
                title: 'Pack backpacks & finish heavy homework',
                desc: 'Clearing school logistics early stops “I forgot my permission slip!” adrenaline spikes at lights-out.',
                why: 'Closing open mental loops lets the prefrontal cortex stand down.',
              },
              {
                timeOrCue: '-90 min',
                label: 'Dock & Dim',
                title: 'Devices dock outside bedrooms; lamps go warm',
                desc: 'Whole-house lights dim slightly so {name} feels a family rhythm rather than a solo punishment.',
                why: 'Dim warm light unlocks natural melatonin production on schedule.',
              },
              {
                timeOrCue: '-45 min',
                label: 'Warm Shower',
                title: 'Warm shower or bath + cool bedroom air',
                desc: 'Stepping out of warm water into a cooler room drops core body temperature rapidly.',
                why: 'A 1–2°F core temp drop is one of nature’s strongest sleep triggers.',
              },
              {
                timeOrCue: '-20 min',
                label: 'Low-Gear Drift',
                title: 'Paper book, comic, sketchpad, or audio story',
                desc: 'Enjoyable, screen-free wind-down makes heading to bed feel like a treat instead of exile.',
                why: 'Cozy anticipation ends nightly bedtime stalling.',
              },
            ],
          },
          almanacTruth:
            'When heading to bed means 20 cozy minutes with a comic book or warm audio story instead of staring into silence, tweens walk to their rooms without a fight.',
          scienceDeepDive:
            'Sleep thermoregulation studies show that passive body heating via a warm shower 45–60 minutes before bed accelerates peripheral vasodilation and subsequent core temperature cooling, shortening sleep onset latency significantly in youth and adults alike.',
          beat3Kicker: 'Practice at 8:00 PM',
          beat3Title: 'Make bedtime feel like an inviting unwind, not a curfew shutdown',
          rehearsalTriggerSpeaker: '{Name} protesting when you announce it’s time to wrap up screens',
          rehearsalTriggerQuote: '“Ugh, 8:30 is for BABIES! All my friends stay on their phones until eleven!”',
          rehearsalPrompt: 'Which response turns the wind-down routine into a nightly fight?',
          instincts: [
            {
              id: 'friends-rant',
              label: '“I don’t care what your friends’ parents let them do, in this house I make the rules!”',
              whyTitle: 'Why that’s so tempting, and why it sparks rebellion',
              whyText:
                'Pure top-down authority makes a 11-year-old fixate on winning freedom instead of noticing how rested {pronoun} {feels}.',
            },
            {
              id: 'negotiate-nightly',
              label: '“Okay, just 15 more minutes tonight if you promise not to complain tomorrow!”',
              whyTitle: 'Why that’s so tempting, and why it guarantees nightly nagging',
              whyText:
                'Shifting the boundary whenever {pronoun} protests trains {obj} to push harder every single evening.',
            },
          ],
          calmScriptPlain:
            '“Totally get why it feels early, your job isn’t to be asleep at 8:30, it’s just when our house shifts into wind-down mode. Phones dock in the kitchen, and your room is yours for reading, drawing, or music until lights-out.”',
          calmScriptSegments: [
            {
              id: 'reframe',
              text: '“Totally get why it feels early, your job isn’t to be asleep at 8:30, it’s just when our house shifts into wind-down mode. ',
              tag: 'Preserve tween dignity',
              note: 'Separates “wind-down hour” from “baby bedtime” so autonomy feels respected.',
            },
            {
              id: 'house-norm',
              text: 'Phones dock in the kitchen, ',
              tag: 'Neutral family law',
              note: 'Applies cleanly across the household rather than targeting {name} alone.',
            },
            {
              id: 'choice-zone',
              text: 'and your room is yours for reading, drawing, or music until lights-out.”',
              tag: 'Owned cozy zone',
              note: 'Gives tweens genuine freedom over how they relax offline.',
            },
          ],
          deliveryCues: [
            'Dock your own phone at the exact same station when possible',
            'Let {name} pick {poss} wind-down book, lamp, or playlist',
            'Keep the bedroom cool (~66–68°F / 19–20°C) for deeper sleep',
          ],
          pushbacks: [
            {
              id: 'late-sports',
              label: 'What about nights when soccer or music ends at 8:30 PM?',
              setup: 'Run a condensed 30-minute mini landing strip rather than skipping wind-down completely.',
              script: '“Late practice night! Quick protein snack, warm shower, and 15 minutes of reading, screens stay docked so you recover fast.”',
            },
            {
              id: 'hw-laptop',
              label: 'What if homework requires a Chromebook at 8:15 PM?',
              setup: 'Turn on Night Shift warm screen tint and sit in a shared well-lit spot until submitted.',
              script: '“Let’s switch Night Shift on and finish that doc at the kitchen table, then dock it right away so your eyes cool down.”',
            },
          ],
          advisorPrompt:
            'Our evenings feel chaotic between activities, homework, and bedtime for my {age} tween. Can you help me design a simple 2-hour wind-down landing strip?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Upgrade one part of tonight’s landing strip',
          beat4Lead: 'Pick the single shift that removes the biggest 8:30 PM friction point.',
          moves: [
            {
              id: 'warm-shower-slot',
              title: 'Move the warm shower to 45 minutes before bed',
              desc: 'Use natural post-shower cooling to trigger sleepy eyelids effortlessly.',
            },
            {
              id: 'family-dim',
              title: 'Dim the whole downstairs at 8:15 PM',
              desc: 'Turn off bright kitchen overheads and flip on lamps so the whole house signals wind-down together.',
            },
            {
              id: 'bedside-stash',
              title: 'Stock a tempting offline bedside basket',
              desc: 'Let {name} choose graphic novels, sketchbooks, or audiobooks that make heading to bed genuinely enjoyable.',
            },
          ],
          closingNote:
            'You are not taking evening freedom away from your tween, you are gifting {obj} a calm sanctuary at the end of noisy school days.',
          pocketInsight: 'Swap abrupt lights-out orders for a 4-beat landing strip: finish tasks, dim lights, warm shower, cozy offline read.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 3',
            mystery: 'Why do active 11-year-olds suddenly get sore heels and knees during growth spurts, and how do you keep sports joyful and safe?',
            title: 'Protecting Growing Bones & Hydration in Youth Sports',
            targetSlug: 'tween-sports-injury-and-hydration',
          },
          interactiveHighlights: ['4-beat evening landing strip', 'Dignity-preserving wind-down script'],
        },
      },
      {
        slug: 'tween-sports-injury-and-hydration',
        title: 'Protecting Growing Bones & Hydration in Youth Sports',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Growing bones & rest days · Playing strong for the long run',
          headline: 'Protecting Growing Bones & Hydration in Youth Sports',
          deck: 'Why sudden growth spurts make active tweens surprisingly prone to tight tendons and fatigue, and simple rest, variety, and hydration guardrails that protect joy.',
          sceneTime: '6:20 PM · WALKING OFF THE SOCCER FIELD',
          sceneBody:
            '{Name} just shot up two inches since spring and now plays on two overlapping teams. Walking back to the car {pronoun} limps slightly and rubs {poss} heel, whispering, “Don’t tell Coach. I don’t want to lose my starting spot!” *You want {obj} to love sports and build grit, yet pushing through real growth-spurt pain worries you.*',
          pollQuestion: 'Does your tween’s sports schedule leave room for real rest days?',
          pollOptions: [
            {
              id: 'packed',
              label: 'Barely, between club practices and tournaments, schedules feel intense!',
              response:
                'Youth sports culture speeds up right around age 10, and pediatric sports specialists agree that rest days are where growing bodies actually get stronger.',
            },
            {
              id: 'hydrated',
              label: '{Pronoun} forgets to drink water until practice is already over',
              response:
                'Thirst lags behind hydration in active tweens, pairing water sips with pre-game routines protects focus and muscles fast.',
            },
          ],
          beat2Kicker: 'Guardrails for growing athletes',
          beat2Title: 'Bones stretch faster than tendons during age 10–12 spurts',
          beat2Lead:
            'During rapid pre-teen growth spurts, long bones lengthen first while tendons and growth plates play catch-up, leaving heels, knees, and shoulders temporarily tighter. Compare single-sport grinding against healthy growing-athlete guardrails below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Year-round grinding vs. growing-athlete guardrails',
          visualStageHint: 'Compare overuse culture vs. smart recovery habits',
          visualConfig: {
            willpowerLabel: 'Push-Through Grind',
            willpowerTitle: 'Playing one sport year-round without breaks',
            willpowerDesc:
              'Ignoring nagging heel or knee soreness and skipping rest days multiplies repetitive stress on open growth plates and drains love of the game.',
            willpowerOutcome: 'Preventable sidelined weeks and early sports burnout.',
            guardrailLabel: 'Smart Recovery Guardrail',
            guardrailTitle: 'Rest days, cross-movement & honest body check-ins',
            guardrailDesc:
              'Building 1–2 true rest days weekly, hydrating before thirst, and listening early to lingering soreness keeps athletes healthy all season.',
            guardrailOutcome: 'Stronger bodies, steadier mood, and lasting athletic joy.',
            environmentShifts: [
              'Protect at least 1–2 full rest days per week (and 2–3 off-season months per sport).',
              'Pack a chilled reusable water bottle + quick carb/protein snack for every practice bag.',
              'Treat persistent limping, swelling, or night pain as a clear cue to check in with your pediatrician.',
            ],
          },
          almanacTruth:
            'Real athletic toughness at age 11 isn’t hiding pain to stay in a scrimmage, it’s knowing how to fuel, hydrate, rest, and speak up early so you can play for years.',
          scienceDeepDive:
            'American Academy of Pediatrics youth sports guidance emphasizes that early single-sport specialization and exceeding weekly organized practice hours beyond a child’s age in years raise overuse stress on active growth plates (apophyses); scheduled rest days, multi-sport variety, and prompt pediatric evaluation of lingering pain safeguard long-term participation.',
          beat3Kicker: 'Practice in the car after practice',
          beat3Title: 'Make speaking up about soreness feel smart, never weak',
          rehearsalTriggerSpeaker: '{Name} hiding a slight limp while climbing into the back seat',
          rehearsalTriggerQuote: '“My heel kind of throbs when I sprint, but please don’t bench me, everyone else plays through it!”',
          rehearsalPrompt: 'Which reaction accidentally teaches kids to hide pain from adults?',
          instincts: [
            {
              id: 'toughen',
              label: '“Just stretch it out and ice it, tough athletes push through a little soreness!”',
              whyTitle: 'Why that’s so tempting, and why it risks longer layoffs',
              whyText:
                'Glamorizing pushing through sharp joint or heel pain turns a minor growth-plate irritation into months on the sidelines.',
            },
            {
              id: 'panic-pull',
              label: '“That’s it, you’re quitting travel team tomorrow before you ruin your legs!”',
              whyTitle: 'Why that’s so tempting, and why kids go silent',
              whyText:
                'Threatening to yank away a sport they love guarantees {name} will hide soreness next time.',
            },
          ],
          calmScriptPlain:
            '“Thanks for telling me honestly, pros protect their bodies early so they stay in the game longer. Let’s rest it tonight, check in with our pediatrician if it still bugs you tomorrow, and make sure you’re hydrated and sleeping well.”',
          calmScriptSegments: [
            {
              id: 'praise-honesty',
              text: '“Thanks for telling me honestly, pros protect their bodies early so they stay in the game longer. ',
              tag: 'Reframe rest as pro wisdom',
              note: 'Links listening to your body with elite athletes rather than weakness.',
            },
            {
              id: 'next-step',
              text: 'Let’s rest it tonight, check in with our pediatrician if it still bugs you tomorrow, ',
              tag: 'Non-clinical safety boundary',
              note: 'Defers persistent pain evaluation cleanly to a licensed clinician without panic.',
            },
            {
              id: 'fuel-anchor',
              text: 'and make sure you’re hydrated and sleeping well.”',
              tag: 'Everyday recovery basics',
              note: 'Highlights sleep and hydration as daily performance superpowers.',
            },
          ],
          deliveryCues: [
            'Praise effort, teamwork, and fun in the car ride home, skip re-coaching errors',
            'Keep water easy to reach before, during, and right after warm practices',
            'Never play doctor on lingering joint pain, always loop in your pediatrician',
          ],
          pushbacks: [
            {
              id: 'sports-drinks',
              label: 'Does {name} actually need neon sports drinks for a 60-minute practice?',
              setup: 'Plain water covers almost every normal 60-minute youth practice.',
              script: '“Plain cold water plus real fruit after practice fuels 60-minute games best, we save electrolyte drinks for hot multi-game tournament days.”',
            },
            {
              id: 'coach-pressure',
              label: 'What if the coach pressures kids to skip rest days?',
              setup: 'Parents set the family health boundary calmly and unapologetically.',
              script: '“We’re protecting one full recovery day a week during this growth spurt so {name} brings {poss} best energy all season.”',
            },
          ],
          advisorPrompt:
            'My {age} tween plays multiple sports and has been tired and sore lately during a growth spurt. How do I balance healthy athletic fun with rest days and hydration?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Install one growing-athlete habit this week',
          beat4Lead: 'Pick one simple habit that keeps sports healthy and joyful.',
          moves: [
            {
              id: 'rest-calendar',
              title: 'Circle 1–2 true rest days on the weekly calendar',
              desc: 'Protect at least one unscheduled day with zero organized drills so muscles and minds recharge.',
            },
            {
              id: 'hydration-ritual',
              title: 'The pre-practice water bottle ritual',
              desc: 'Have {name} fill {poss} own insulated bottle two hours before practice so hydration starts early.',
            },
            {
              id: 'car-question',
              title: 'Replace post-game critiques with one joyful question',
              desc: 'Ask “What was the most fun moment out there today?” before mentioning anything technical.',
            },
          ],
          closingNote:
            'Protecting your tween’s growing joints, sleep, and sheer joy in movement today is what keeps sports a lifelong gift instead of a burnt-out memory.',
          pocketInsight: 'Growing bones need rest days, pre-game water, and prompt pediatric checks for lingering pain, never “pushing through.”',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 4',
            mystery: 'How do you tell a sensitive 11-year-old it’s time for daily deodorant and face washing without making them crumble in shame?',
            title: 'Talking About Deodorant & Skin Care Without Shame',
            targetSlug: 'tween-hygiene-independence-routines',
          },
          interactiveHighlights: ['Growing-athlete guardrail card', 'Pro-mindset recovery script'],
        },
      },
      {
        slug: 'tween-hygiene-independence-routines',
        title: 'Talking About Deodorant & Skin Care Without Shame',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Dignity first · Grown-up body care without embarrassment',
          headline: 'Talking About Deodorant & Skin Care Without Shame',
          deck: 'Why teasing about “stinky armpits” makes tweens shut down, and how turning daily hygiene into a proud grown-up upgrade builds effortless self-care.',
          sceneTime: '4:45 PM · RIDING HOME FROM SCHOOL',
          sceneBody:
            'Lately {name} climbs into the car with unmistakable new body odor, slightly oily bangs, and zero interest in showering unless reminded five times. *You desperately want to spare {obj} from classmates noticing, yet the last time you brought it up, {pronoun} turned bright red and snapped “Stop talking about my body!”*',
          pollQuestion: 'What makes hygiene reminders trickiest with your tween right now?',
          pollOptions: [
            {
              id: 'embarrassed',
              label: 'Even gentle hints make {obj} instantly defensive or embarrassed',
              response:
                'Tweens are acutely sensitive to feeling scrutinized, framing body changes as a cool sign of growing up preserves dignity completely!',
            },
            {
              id: 'forgets',
              label: '{Pronoun} simply forgets showers and deodorant unless I nag every morning',
              response:
                'Letting {obj} pick {poss} own shower kit and linking deodorant to brushing teeth turns nagging into an automatic habit.',
            },
          ],
          beat2Kicker: 'The dignity-first care loop',
          beat2Title: 'Treat hygiene as a milestone upgrade, never a flaw',
          beat2Lead:
            'Between ages 9 and 12, newly active sweat and oil glands change skin and scent rapidly, often before tweens themselves can smell it. Use this 3-step respectful handover loop.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The zero-shame hygiene handover loop',
          visualStageHint: 'Tap each step to build proud self-care ownership',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Private & matter-of-fact',
                label: 'Normalize Biology',
                quote: '“Your body is leveling up, new sweat glands turn on right around this age!”',
                desc: 'Bring it up privately, casually, and completely free of jokes, wrinkled noses, or sibling audiences.',
                brainNote: 'Removes social shame so {name} can actually hear helpful info.',
              },
              {
                stepNum: '02',
                actor: '{Name} chooses gear',
                label: 'Ownership Shopping',
                quote: 'Pick {poss} own gentle cleanser, deodorant scent, and clean towel hook',
                desc: 'Letting a tween choose a preferred mild scent or cool toiletry pouch transforms a chore into pride.',
                brainNote: 'Personal choice taps intrinsic autonomy rather than parental nagging.',
              },
              {
                stepNum: '03',
                actor: 'Visual habit anchor',
                label: 'Autopilot Routine',
                quote: 'Deodorant sits right beside the toothbrush; shower links to sports/bedtime',
                desc: 'Keep routines ultra-simple (gentle cleanser, water, deodorant, clean shirt) with zero harsh scrubbing.',
                brainNote: 'Environment cues replace daily parent reminders effortlessly.',
              },
            ],
          },
          almanacTruth:
            'Nobody can smell their own gradual hormonal scent change, handing your tween private honesty plus choice over their own kit protects both their confidence and their friendships.',
          scienceDeepDive:
            'Pediatric dermatology and adolescent development guidance notes that apocrine sweat glands and sebaceous glands activate during adrenarche (ages 9–12); gentle daily cleansing, breathable fabrics, and shame-free parent communication build durable self-care habits without triggering body anxiety.',
          beat3Kicker: 'Practice in private',
          beat3Title: 'Deliver honest care with zero teasing or audience',
          rehearsalTriggerSpeaker: '{Name} groaning as you bring up showering and deodorant',
          rehearsalTriggerQuote: '“Ugh, I DON’T smell! Why are you always inspecting me?!”',
          rehearsalPrompt: 'Which remark accidentally triggers intense tween shame?',
          instincts: [
            {
              id: 'tease',
              label: '“Whoa, peel the paint off the walls! You smell like a locker room, go scrub!”',
              whyTitle: 'Why that’s so tempting, and why it stings for years',
              whyText:
                'Even playful teasing about body smell lands like deep humiliation on a newly self-conscious 11-year-old.',
            },
            {
              id: 'public',
              label: '“Did you put on deodorant today?” (asked right in front of siblings or friends)',
              whyTitle: 'Why that’s so tempting, and why it shuts {obj} down',
              whyText:
                'Public hygiene checks feel devastating to tween social dignity and spark immediate defiance.',
            },
          ],
          calmScriptPlain:
            '“Totally normal not to notice it yourself, our noses tune out our own scent. Your body is just entering its next big growth stage, which means daily deodorant and a quick warm wash become everyday basics. Want to pick out your own scent and gentle face wash at the store this weekend?”',
          calmScriptSegments: [
            {
              id: 'nose-blind',
              text: '“Totally normal not to notice it yourself, our noses tune out our own scent. ',
              tag: 'Instant face-saver',
              note: 'Explains olfactory adaptation so {name} doesn’t feel embarrassed or oblivious.',
            },
            {
              id: 'milestone',
              text: 'Your body is just entering its next big growth stage, which means daily deodorant and a quick warm wash become everyday basics. ',
              tag: 'Neutral biology frame',
              note: 'Frames hygiene as a normal milestone upgrade everyone goes through.',
            },
            {
              id: 'agency',
              text: 'Want to pick out your own scent and gentle face wash at the store this weekend?”',
              tag: 'Hand over proud agency',
              note: 'Invites excitement and ownership over their personal routine.',
            },
          ],
          deliveryCues: [
            'Always speak one-on-one, never in front of siblings or peers',
            'Keep skincare simple: gentle fragrance-free cleanser + light moisturizer (skip harsh viral trends)',
            'Agree on a discreet 1-word private code cue if {pronoun} forgets before school',
          ],
          pushbacks: [
            {
              id: 'skincare-trends',
              label: 'What if {pronoun} wants expensive anti-aging serums seen on social videos?',
              setup: 'Protect young skin gently while honoring {poss} desire to feel grown-up.',
              script: '“Those harsh acids are actually made for older skin and can irritate yours, let’s pick a fun gentle cleanser, moisturizer, and sunscreen that make your skin feel awesome!”',
            },
            {
              id: 'still-skips',
              label: 'What if {pronoun} still skips showers after buying cool gear?',
              setup: 'Tie shower timing neutrally to a daily anchor rather than debating.',
              script: '“Quick warm shower happens right after practice before dinner, your clean towel and speaker are ready in there.”',
            },
          ],
          advisorPrompt:
            'My {age} tween is hitting early body odor and oily skin but gets defensive whenever I mention showering or deodorant. How do I handle this with warmth and zero shame?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Pick one dignity-first hygiene upgrade',
          beat4Lead: 'Choose one respectful step that moves ownership smoothly to your tween.',
          moves: [
            {
              id: 'kit-shopping',
              title: 'Go on a 10-minute “upgrade kit” trip',
              desc: 'Let {name} choose {poss} own deodorant, gentle face wash, and shower music speaker or pouch.',
            },
            {
              id: 'toothbrush-pair',
              title: 'Pair deodorant right beside the toothbrush',
              desc: 'Place deodorant next to toothpaste so morning swipe becomes automatic with zero verbal nagging.',
            },
            {
              id: 'private-cue',
              title: 'Agree on a friendly private code word',
              desc: 'Pick a lighthearted secret cue (“Fresh check!”) you can use quietly by the front door without embarrassment.',
            },
          ],
          closingNote:
            'Handling changing-body talks with quiet respect today tells your tween that {poss} body is never something to hide or feel ashamed of, and that you are always a safe person to ask.',
          pocketInsight: 'Keep hygiene talks private, frame body shifts as a proud milestone, and let {name} pick {poss} own simple kit.',
          nextEpisodeHook: null,
          interactiveHighlights: ['3-step zero-shame handover loop', 'Dignity-preserving body-care script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 28: Ravenous Growth Spurts, Body Neutrality & First Meals (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'nutrition-tween-growth-spurts',
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    title: 'Ravenous Growth Spurts, Body Neutrality & First Meals',
    reliefSubtitle:
      'Channel 9 PM pantry raids into filling real food, normalize huge growth-spurt hunger, protect self-esteem with body-neutral talk, and teach three proud starter meals',
    tonightQuickWinTitle: 'Episode 1: Why {Name} Is Suddenly Raiding the Pantry at 9 PM',
    summary:
      'Solve late-night snack raids with a structured protein-rich open snack zone, decode the hormonal appetite surge of pre-teen growth spurts, protect lifelong body confidence with body-neutral family table talk, and coach your 10–12-year-old to cook three real family meals with pride.',
    coverImageUrl: 'https://assets.alongside.care/academy/nutrition-tween.png',
    sortOrder: 6,
    episodes: [
      {
        slug: 'tween-open-snack-pantry',
        title: 'Why {Name} Is Suddenly Raiding the Pantry at 9 PM',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Smart snack station · Fueling ravenous growth without policing',
          headline: 'Why {Name} Is Suddenly Raiding the Pantry at 9 PM',
          deck: 'Why hiding crackers or scolding late-night hunger sparks sneaky eating, and how one pre-stocked “Fuel Bin” satisfies huge tween appetites calmly.',
          sceneTime: '8:55 PM · KITCHEN PANTRY LIGHT',
          sceneBody:
            '{Name} ate a full plate of pasta at 6:30 PM, yet here {pronoun} {is} two hours later, head inside the fridge rummaging for chips, cereal, and cookies like {pronoun} hasn’t eaten all week. *Your grocery bill is skyrocketing and you blurt “Didn’t you JUST eat dinner?!”, only to notice hidden wrappers in {poss} room two days later.*',
          pollQuestion: 'Are evening pantry raids turning into a tug-of-war at your house?',
          pollOptions: [
            {
              id: 'hollow-leg',
              label: 'Yes, {pronoun} {is} genuinely starving again an hour after dinner!',
              response:
                'During pre-teen growth spurts, muscle and bone construction burns huge overnight energy, real protein + fiber snacks satisfy far better than grazing chips.',
            },
            {
              id: 'sneaky',
              label: 'I worry about mindless evening grazing turning into secret snacking',
              response:
                'Replacing pantry policing with an open, visible “Fuel Zone” keeps trust completely transparent and removes the urge to sneak.',
            },
          ],
          beat2Kicker: 'The smart evening fueling rhythm',
          beat2Title: 'Stock the front shelf so real fuel beats empty crunch',
          beat2Lead:
            'Restricting hungry tweens triggers secret eating, while leaving only ultra-processed puffs leaves them hungry again 20 minutes later. Step through the 4-beat smart fueling routine below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The tween ravenous-appetite fueling rhythm',
          visualStageHint: 'Tap each kitchen beat to stop late-night battles',
          visualConfig: {
            steps: [
              {
                timeOrCue: '3:30 PM',
                label: 'Mini-Meal After School',
                title: 'Serve a real post-school mini-meal (not just pretzels)',
                desc: 'Quesadilla, hummus + pita, yogurt + granola, or peanut butter toast prevents starving evening rebound.',
                why: 'Steady afternoon calories prevent 9 PM blood-sugar crashes.',
              },
              {
                timeOrCue: '6:30 PM',
                label: 'Hearty Dinner Base',
                title: 'Include satisfying protein, slow carbs & healthy fat',
                desc: 'Growing 11-year-olds often need adult-sized portions during active weeks.',
                why: 'Complete dinners keep hunger calmer through homework.',
              },
              {
                timeOrCue: '8:15 PM',
                label: 'Open Fuel Bin',
                title: 'Designated eye-level fridge & pantry Fuel Zone',
                desc: 'Cheese sticks, Greek yogurt, apples + nut butter, boiled eggs, turkey roll-ups, and trail mix, always welcome, zero permission needed.',
                why: 'Removes shame and secrecy while delivering lasting fullness.',
              },
              {
                timeOrCue: '8:45 PM',
                label: 'Kitchen Rests',
                title: 'Clean, predictable kitchen close before wind-down',
                desc: 'Once everyone gets their planned evening fuel, dishes rinse and the kitchen rests until breakfast.',
                why: 'Protects deep sleep without feeling stingy or controlling.',
              },
            ],
          },
          almanacTruth:
            'When hungry tweens know there is always a filling, no-guilt evening fuel shelf ready before 8:45 PM, pantry battles and sneaky wrappers disappear together.',
          scienceDeepDive:
            'Pediatric feeding frameworks (including Ellyn Satter’s Division of Responsibility adapted for pre-adolescents) show that parental restriction of food quantity correlates with increased secretive eating and dysregulated hunger cues, whereas predictable meal/snack structure with nutrient-dense choices supports healthy self-regulation.',
          beat3Kicker: 'Practice at the fridge door',
          beat3Title: 'Meet huge evening hunger with trust and real fuel',
          rehearsalTriggerSpeaker: '{Name} opening the pantry door at 8:30 PM looking for chips',
          rehearsalTriggerQuote: '“I’m literally starving, can I have a bag of chips and some cookies?”',
          rehearsalPrompt: 'Which reply accidentally sparks shame or sneaking?',
          instincts: [
            {
              id: 'shame-amount',
              label: '“You just ate two plates at dinner! You can’t possibly still be hungry, close the pantry!”',
              whyTitle: 'Why that’s so tempting, and why it backfires',
              whyText:
                'Questioning whether a growing tween is “really” hungry teaches {obj} to distrust internal fullness signals, or eat in secret.',
            },
            {
              id: 'free-for-all',
              label: '“Whatever, grab what you want, just stop asking me.”',
              whyTitle: 'Why that’s so tempting, and why {pronoun} wakes sluggish',
              whyText:
                'Pure late-night sugar puffs spike energy right before sleep without satisfying real growth-spurt protein needs.',
            },
          ],
          calmScriptPlain:
            '“Growing bodies burn wild fuel right now! Grab anything you want from the Fuel Bin, toast with peanut butter, yogurt, or leftover pasta, so you actually stay full all night, and let’s keep snacks at the table before the kitchen closes at 8:45.”',
          calmScriptSegments: [
            {
              id: 'validate-hunger',
              text: '“Growing bodies burn wild fuel right now! ',
              tag: 'Validate big appetite',
              note: 'Normalizes intense pre-teen hunger with zero judgment.',
            },
            {
              id: 'direct-fuel',
              text: 'Grab anything you want from the Fuel Bin, toast with peanut butter, yogurt, or leftover pasta, so you actually stay full all night, ',
              tag: 'Guide toward lasting fuel',
              note: 'Pairs autonomy with protein/carb foods that genuinely satisfy.',
            },
            {
              id: 'kitchen-rhythm',
              text: 'and let’s keep snacks at the table before the kitchen closes at 8:45.”',
              tag: 'Calm house rhythm',
              note: 'Sets a predictable, non-punitive boundary protecting sleep and cleanliness.',
            },
          ],
          deliveryCues: [
            'Never comment negatively on portion sizes or second helpings',
            'Put nourishing ready-to-grab snacks right at front eye level',
            'Keep fun treats served casually at planned times instead of locked away',
          ],
          pushbacks: [
            {
              id: 'only-wants-chips',
              label: 'What if {pronoun} says “I don’t want yogurt. I just want chips”?',
              setup: 'Pair a small serving alongside real fuel instead of turning chips into forbidden gold.',
              script: '“Totally, grab a handful of chips alongside a cheese stick or apple so your stomach actually feels steady.”',
            },
            {
              id: 'bored-eating',
              label: 'What if I think {pronoun} {is} just bored while doing homework?',
              setup: 'Invite mindful kitchen-table eating rather than debating whether hunger is real.',
              script: '“Snacks happen at the kitchen island without screens, take five minutes to enjoy it and check in with your belly!”',
            },
          ],
          advisorPrompt:
            'My {age} tween is constantly hungry late at night and raiding the pantry. How do I set up a healthy open snack routine without restricting or fighting?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Set up one simple fueling upgrade tomorrow',
          beat4Lead: 'Make the nourishing choice the easiest grab in the house.',
          moves: [
            {
              id: 'fuel-bin',
              title: 'Create one front-shelf “Fuel Bin”',
              desc: 'Ask {name} to pick 4 filling grab-and-go staples (cheese, fruit, nuts, hummus, tortillas) to stock at eye level.',
            },
            {
              id: 'mini-meal-330',
              title: 'Upgrade the 3:30 PM after-school snack',
              desc: 'Serve a protein + carb mini-meal right after school so intense hunger doesn’t pile up at 9 PM.',
            },
            {
              id: 'table-only',
              title: 'Make eating a calm table-only rhythm',
              desc: 'Keep evening snacks at the kitchen table instead of bedrooms, zero shaming, clearer fullness cues.',
            },
          ],
          closingNote:
            'Trusting your tween’s appetite while thoughtfully stocking the kitchen builds a calm, confident relationship with food that lasts a lifetime.',
          pocketInsight: 'Swap pantry policing for a stocked eye-level Fuel Bin and a hearty after-school mini-meal.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 2',
            mystery: 'What exact biological hormones trigger sudden hollow-leg hunger right before a 3-inch height jump?',
            title: 'The Growth-Spurt Appetite Surge (Normalizing Big Hunger)',
            targetSlug: 'tween-leptin-ghrelin-pubertal-surges',
          },
          interactiveHighlights: ['4-beat smart fueling routine', 'Zero-shame pantry script'],
        },
      },
      {
        slug: 'tween-leptin-ghrelin-pubertal-surges',
        title: 'The Growth-Spurt Appetite Surge (Normalizing Big Hunger)',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Growth-spurt biology · Energy before vertical height',
          headline: 'The Growth-Spurt Appetite Surge (Normalizing Big Hunger)',
          deck: 'Why many 10–12-year-olds eat huge portions and soften slightly right BEFORE shooting up in height, and why trusting that natural wave protects lifelong health.',
          sceneTime: '6:50 PM · DINNER TABLE',
          sceneBody:
            'Over the past month {name} has started asking for thirds at dinner, and you notice {poss} body looks a little softer around the middle than last summer. *An anxious cultural voice whispers in your head (“Should I cut back {poss} portions?”), even though biology is quietly gathering energy for {poss} biggest height leap since toddlerhood.*',
          pollQuestion: 'Have sudden appetite spikes or pre-puberty body shifts ever made you quietly second-guess portions?',
          pollOptions: [
            {
              id: 'second-guess',
              label: 'Honestly yes, it’s hard to tune out adult diet messages!',
              response:
                'Most parents carry decades of adult diet culture noise, learning the exact biology of pre-pubertal growth spurts lifts that worry right off your shoulders.',
            },
            {
              id: 'reassured',
              label: 'Knowing bodies often store energy right before growing tall makes total sense!',
              response:
                'Yes! Pre-teen bodies build a brief energy reserve first, then stretch upward, trusting steady nourishment lets nature work smoothly.',
            },
          ],
          beat2Kicker: 'Inside the growth-spurt wave',
          beat2Title: 'Appetite surges first, vertical growth stretches second',
          beat2Lead:
            'Pre-pubertal hormones trigger alternating waves of intense hunger (ghrelin spikes) and deep sleep growth-hormone release. Tap each phase of the growth wave below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'The pre-teen growth-spurt energy wave',
          visualStageHint: 'Tap each phase to see how bodies fuel vertical leaps',
          visualConfig: {
            stages: [
              {
                time: 'Phase 1',
                label: 'Appetite Surge',
                level: 78,
                title: 'Hunger signals turn up weeks before height changes',
                desc: 'Rising growth hormones ask the brain for extra protein, iron, calcium, and steady energy.',
                tip: 'Serve hearty meals calmly with zero remarks about second helpings.',
              },
              {
                time: 'Phase 2',
                label: 'Energy Reserve',
                level: 88,
                title: 'Bodies naturally build a brief cushion before stretching',
                desc: 'Normal pre-pubertal weight gain provides the hormonal green light for bone lengthening and puberty.',
                tip: 'Never put a growing tween on calorie restriction, consult your pediatrician if you ever have questions.',
              },
              {
                time: 'Phase 3',
                label: 'Vertical Leap',
                level: 95,
                title: 'Pants suddenly feel two inches too short overnight!',
                desc: 'Deep nighttime sleep releases pulses of human growth hormone that lengthen bones rapidly.',
                tip: 'Pair plenty of sleep with calcium, iron, and protein-rich family meals.',
              },
              {
                time: 'Phase 4',
                label: 'Steady Plateau',
                level: 48,
                title: 'Appetite naturally levels back out for a few months',
                desc: 'Once the spurt completes, hunger settles smoothly until the next developmental wave arrives.',
                tip: 'Trust {poss} changing appetite, big weeks and lighter weeks are both normal.',
              },
            ],
          },
          almanacTruth:
            'Growing bodies gather fuel BEFORE they stretch upward, shaming or shrinking a tween’s plate during a pre-puberty surge interrupts nature’s exact blueprint.',
          scienceDeepDive:
            'Pediatric endocrinology and adolescent nutrition research documents that adequate leptin signaling and pre-pubertal adipose energy reserves are biologically required precursors for normal pubertal timing and peak bone mineral accrual between ages 10 and 15.',
          beat3Kicker: 'Practice at the dinner table',
          beat3Title: 'Normalize big appetites and changing bodies out loud',
          rehearsalTriggerSpeaker: '{Name} reaching for a second bowl of chili and hesitating',
          rehearsalTriggerQuote: '“Wait, am I eating too much? Someone at school said I shouldn’t eat seconds.”',
          rehearsalPrompt: 'Which reaction accidentally plants food guilt?',
          instincts: [
            {
              id: 'caution-seconds',
              label: '“Well, maybe wait 20 minutes and drink some water first to see if you really need it.”',
              whyTitle: 'Why that’s so tempting, and why it erodes body trust',
              whyText:
                'Teaching a growing 11-year-old to override genuine hunger with water tricks mirrors adult diet rules and triggers anxiety.',
            },
            {
              id: 'good-bad',
              label: '“Seconds of veggies are great, just skip the bread so you stay healthy!”',
              whyTitle: 'Why that’s so tempting, and why carbs become obsessions',
              whyText:
                'Labeling starches or carbs “bad” makes tweens fixate on them while starving active brains and growing muscles.',
            },
          ],
          calmScriptPlain:
            '“Your stomach is the boss of your appetite, not kids at school! At your age your bones and brain are running a huge construction project, so seconds are totally normal. Help yourself and check in with how your belly feels.”',
          calmScriptSegments: [
            {
              id: 'internal-boss',
              text: '“Your stomach is the boss of your appetite, not kids at school! ',
              tag: 'Anchor internal body trust',
              note: 'Inoculates {name} against peer diet chatter immediately.',
            },
            {
              id: 'construction',
              text: 'At your age your bones and brain are running a huge construction project, so seconds are totally normal. ',
              tag: 'Science-grounded reassurance',
              note: 'Explains big hunger proudly as growth fuel.',
            },
            {
              id: 'check-in',
              text: 'Help yourself and check in with how your belly feels.”',
              tag: 'Gentle satiety awareness',
              note: 'Keeps self-regulation rooted in comfort rather than external rules.',
            },
          ],
          deliveryCues: [
            'Keep mealtime tone relaxed, abundant, and curious',
            'Include iron, calcium, protein, and colorful plants across the week, not perfection at one meal',
            'Bring any genuine growth-chart questions privately to your pediatrician, never to the dinner table',
          ],
          pushbacks: [
            {
              id: 'relatives',
              label: 'What if a grandparent comments “Whoa, look how much {pronoun} {eats}!” at holiday dinner?',
              setup: 'Step in warmly and lightly right away so {name} knows you’ve got {poss} back.',
              script: '“Yep, {name} is in a massive growth spurt, we love seeing a healthy appetite at this table! Pass the potatoes?”',
            },
            {
              id: 'sudden-light',
              label: 'What if next month {pronoun} barely finishes half a plate?',
              setup: 'Appetite naturally ebbs between spurts, keep trusting {poss} internal gauge.',
              script: '“Totally fine to stop when you’re satisfied, we’ll wrap the rest for tomorrow’s lunch.”',
            },
          ],
          advisorPrompt:
            'My {age} tween is eating massive portions during a pre-puberty growth spurt and friends are starting to make comments about eating. How do I normalize healthy hunger?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Pick one growth-friendly table habit',
          beat4Lead: 'Choose one small action that strengthens your tween’s trust in their body.',
          moves: [
            {
              id: 'serve-family-style',
              title: 'Place serving bowls right on the table',
              desc: 'Let {name} dish up first and second helpings independently without asking permission.',
            },
            {
              id: 'retire-good-bad',
              title: 'Retire “good food / bad food” labels',
              desc: 'Talk about foods by what they do (energy, muscle repair, crunch, enjoyment) instead of moral guilt.',
            },
            {
              id: 'protect-from-commentary',
              title: 'Quietly brief extended family if needed',
              desc: 'Send a warm text before gatherings: “We’re keeping body and portion comments off the table this year, thanks for helping!”',
            },
          ],
          closingNote:
            'Every time you greet a big tween appetite with warmth instead of worry, you shield {obj} from decades of diet noise and teach lifelong trust in {poss} own body.',
          pocketInsight: 'Pre-puberty bodies gather fuel before shooting taller, welcome seconds calmly and keep portion comments off the table.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 3',
            mystery: 'What exact everyday phrases quietly protect a tween’s self-esteem when mirror-checking and peer comparisons start?',
            title: 'Body-Neutral Table Talk: Protecting Self-Esteem Early',
            targetSlug: 'tween-body-neutral-family-talk',
          },
          interactiveHighlights: ['4-phase growth-spurt wave', 'Appetite-reassurance script'],
        },
      },
      {
        slug: 'tween-body-neutral-family-talk',
        title: 'Body-Neutral Table Talk: Protecting Self-Esteem Early',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Body neutrality · Valuing what bodies do, not how they look',
          headline: 'Body-Neutral Table Talk: Protecting Self-Esteem Early',
          deck: 'Why even calling yourself “bad for eating cake” echoes loud in a 11-year-old’s mind, and how shifting to body-neutral talk builds steel-plated confidence.',
          sceneTime: '7:10 PM · BATHROOM MIRROR & DINNER TABLE',
          sceneBody:
            'Lately {name} spends longer tugging at {poss} shirt in the mirror and asks, “Do my legs look huge in these shorts?” *Your heart aches and you rush to reassure {obj} (“No! You’re gorgeous!”), yet five minutes later at dessert, you catch yourself sighing “Ugh, I’m being so bad eating this brownie.”*',
          pollQuestion: 'Which body-image moment pops up most around your tween lately?',
          pollOptions: [
            {
              id: 'mirror',
              label: '{Pronoun} {is} suddenly comparing {poss} body or clothes to classmates',
              response:
                'Puberty hits every friend on a wildly different timeline, shifting the focus from appearance to capability steadies tween self-worth fast.',
            },
            {
              id: 'parent-talk',
              label: 'I catch myself accidentally criticizing my OWN body in front of {obj}',
              response:
                'Noticing that habit is huge! One of the greatest gifts you can give a tween is speaking respectfully about your own body out loud.',
            },
          ],
          beat2Kicker: 'The body-neutral loop',
          beat2Title: 'Neutral appreciation beats appearance pressure every time',
          beat2Lead:
            'Even positive appearance focus (“You’re so thin/pretty!”) keeps a tween’s worth tied to how their body looks. Body-neutral talk honors what bodies DO and feel like instead. Explore the 3-step loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-step body-neutral confidence loop',
          visualStageHint: 'Tap each step to anchor lasting self-respect',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: '{Name} voices insecurity',
                label: 'The Mirror Bid',
                quote: '“I hate how my arms/stomach look in this photo…”',
                desc: 'Pause before rushing to argue (“No you don’t!”), listen first to the feeling underneath.',
                brainNote: 'Instant denial accidentally leaves kids feeling unheard and anxious.',
              },
              {
                stepNum: '02',
                actor: 'You zoom out warmly',
                label: 'Body-Neutral Anchor',
                quote: '“Growing bodies change fast and feel weird, and your body is your instrument, not an ornament.”',
                desc: 'Shift attention toward strength, energy, comfort, humor, and how clothes fit the body, not shrinking the body to fit clothes.',
                brainNote: 'Decouples self-worth from fluctuating pubertal shapes.',
              },
              {
                stepNum: '03',
                actor: 'Daily parent modeling',
                label: 'Self-Kindness Echo',
                quote: 'Zero self-criticism about your own weight, mirror, or dessert at home',
                desc: 'Kids absorb how you talk about YOUR body ten times louder than any pep talk aimed at theirs.',
                brainNote: 'Models stable adult body respect as the household normal.',
              },
            ],
          },
          almanacTruth:
            'Clothes are supposed to fit your tween’s growing body, their body is never supposed to shrink to fit last summer’s clothes.',
          scienceDeepDive:
            'Longitudinal adolescent self-esteem studies (including research by Dr. Dianne Neumark-Sztainer’s Project EAT) consistently find that parental weight talk, even directed at the parent’s own body, strongly predicts youth body dissatisfaction, whereas appearance-neutral family dialogue builds robust resilience.',
          beat3Kicker: 'Practice by the closet',
          beat3Title: 'Respond to mirror self-criticism with steadiness and comfort',
          rehearsalTriggerSpeaker: '{Name} pulling off last year’s jeans feeling frustrated',
          rehearsalTriggerQuote: '“Ugh, these don’t fit anymore. I look terrible and everyone at school is skinnier than me!”',
          rehearsalPrompt: 'Which response accidentally keeps appearance on the pedestal?',
          instincts: [
            {
              id: 'fix-body',
              label: '“Don’t worry, we can walk more together and cut back on snacks so they fit again!”',
              whyTitle: 'Why that’s so tempting, and why it harms confidence deeply',
              whyText:
                'Treating normal growth-spurt sizing up as a problem to fix wires lifelong body shame.',
            },
            {
              id: 'dismiss-feelings',
              label: '“Oh stop being dramatic, you’re way prettier than everyone else!”',
              whyTitle: 'Why that’s so tempting, and why it stays fragile',
              whyText:
                'Comparing {obj} favorably against other kids keeps worth locked inside an appearance contest.',
            },
          ],
          calmScriptPlain:
            '“Ugh, tight jeans feel awful on ANYBODY, and of course last year’s pants are small, you’re growing fast right now! Clothes are meant to fit YOU comfortably. Let’s box these up and grab a pair that feels great to move in.”',
          calmScriptSegments: [
            {
              id: 'empathy-comfort',
              text: '“Ugh, tight jeans feel awful on ANYBODY, and of course last year’s pants are small, you’re growing fast right now! ',
              tag: 'Validate + normalize growth',
              note: 'Moves blame instantly off {poss} body and onto outgrown fabric.',
            },
            {
              id: 'clothes-rule',
              text: 'Clothes are meant to fit YOU comfortably. ',
              tag: 'Memorable family motto',
              note: 'Gives {name} a lifelong truth to remember whenever sizes change.',
            },
            {
              id: 'practical-reset',
              text: 'Let’s box these up and grab a pair that feels great to move in.”',
              tag: 'Immediate dignified relief',
              note: 'Solves physical discomfort right away without making weight the topic.',
            },
          ],
          deliveryCues: [
            'Donate outgrown clothes promptly without sighs or size commentary',
            'Compliment character, kindness, humor, effort, and stamina 10x more than looks',
            'If intense distress around food or body persists, gently invite support from your pediatrician or a family counselor',
          ],
          pushbacks: [
            {
              id: 'caught-myself',
              label: 'What if I slip and criticize my own body in front of {name}?',
              setup: 'Catch it out loud with light warmth, it’s a great teaching moment!',
              script: '“Whoops, listen to me complaining about my arms! Honestly these arms carried groceries and hugged you today, so I’m cutting myself some slack.”',
            },
            {
              id: 'filters',
              label: 'What if {pronoun} compares {obj} to edited bodies online?',
              setup: 'Name editing tools matter-of-factly so {pronoun} sees behind the curtain.',
              script: '“Half of those clips use lighting angles and stretch filters, real human bodies come in wildly different shapes and timelines.”',
            },
          ],
          advisorPrompt:
            'My {age} tween has started making harsh comments about {poss} changing body and clothes. How can I build body-neutral confidence at home?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Pick one body-neutral shift for this week',
          beat4Lead: 'One quiet change in household language reshapes how {name} hears their inner voice.',
          moves: [
            {
              id: 'parent-self-ban',
              title: 'Zero parent self-criticism week',
              desc: 'Pause any out-loud comments about your own weight, calories, or “being bad” around dessert.',
            },
            {
              id: 'function-praise',
              title: 'Compliment what bodies DO',
              desc: 'Notice energy, laughter, curiosity, strong legs on a hike, or creative hands rather than appearance.',
            },
            {
              id: 'closet-refresh',
              title: 'Clear out tight outgrown clothes early',
              desc: 'Rotate out cramped clothes proactively so {name} dresses in comfortable gear every morning.',
            },
          ],
          closingNote:
            'In a noisy culture obsessed with mirrors, your steady home can be the one room on earth where {name} knows {poss} worth has nothing to do with a clothing tag.',
          pocketInsight: 'Clothes exist to fit growing bodies, drop parent self-criticism and praise strength, warmth, and joy instead.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 4',
            mystery: 'What happens to a tween’s pride and adventurous eating when they become the head chef of dinner once a week?',
            title: 'Three Real Meals Every 12-Year-Old Can Cook With Pride',
            targetSlug: 'tween-beginner-cooking-skills',
          },
          interactiveHighlights: ['3-step body-neutral loop', 'Closet comfort-first script'],
        },
      },
      {
        slug: 'tween-beginner-cooking-skills',
        title: 'Three Real Meals Every 12-Year-Old Can Cook With Pride',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Kitchen agency · From sous-chef to proud head chef',
          headline: 'Three Real Meals Every 12-Year-Old Can Cook With Pride',
          deck: 'Why teaching a tween three go-to real meals builds jaw-dropping competence, eases your weeknight load, and unlocks curiosity around fresh ingredients.',
          sceneTime: '5:30 PM · SUNDAY KITCHEN COUNTER',
          sceneBody:
            'Every night you cook dinner while {name} scrolls or asks “What’s for dinner, ugh, again?” *Yet the minute you hand a 11-year-old real knife skills, a sizzling skillet, and ownership of Tuesday taco bowls, complaining vanishes, and {pronoun} beams carrying {poss} own dish to the table.*',
          pollQuestion: 'How much real cooking does your tween handle right now?',
          pollOptions: [
            {
              id: 'microwave',
              label: 'Mostly pouring cereal or heating microwave snacks',
              response:
                'Perfect starting point! Most tweens are eager for real grown-up tools the second we step out of hovering mode.',
            },
            {
              id: 'mess',
              label: 'I’d love {obj} to cook, I just dread the slow pace and extra mess!',
              response:
                'Starting on one relaxed weekend meal with a 3-step ladder keeps messes small and turns {name} into a genuinely helpful weeknight chef within a month.',
            },
          ],
          beat2Kicker: 'The 5-rung kitchen confidence ladder',
          beat2Title: 'Real skills climb smoothly from cold prep to proud head chef',
          beat2Lead:
            'Handing over kitchen ownership works best in five bite-sized rungs, building knife safety, heat confidence, and three signature meals (Scrambled Egg & Veggie Wraps, Sheet-Pan Nachos/Tacos, and One-Pot Pasta). Tap each rung below.',
          visualType: AlmanacVisualType.SENSORY_LADDER,
          visualStageTitle: 'The 5-rung tween cooking mastery ladder',
          visualStageHint: 'Tap each rung from helper to proud head chef',
          visualConfig: {
            steps: [
              {
                label: 'Plan',
                title: '1. Picks 1 signature meal + checks ingredients',
                desc: 'Choosing between Egg Wraps, Sheet-Pan Tacos, or One-Pot Pasta sparks instant buy-in.',
                tag: 'Step 1 · Menu ownership',
              },
              {
                label: 'Chop',
                title: '2. Masters claw-grip knife safety on soft foods',
                desc: 'Curled fingertips and steady cutting board build calm real-tool confidence fast.',
                tag: 'Step 2 · Safe prep',
              },
              {
                label: 'Season',
                title: '3. Smells spices, tastes sauce, and adjusts flavor',
                desc: 'Active tasting while cooking makes even cautious eaters way more adventurous.',
                tag: 'Step 3 · Flavor curiosity',
              },
              {
                label: 'Cook',
                title: '4. Runs the skillet, oven tray, or boiling pot with you nearby',
                desc: 'Pot handles turned inward, oven mitts on, you act as calm assistant, not hovering boss.',
                tag: 'Step 4 · Heat mastery',
              },
              {
                label: 'Serve',
                title: '5. Plates dinner proudly & resets the counter together',
                desc: 'Serving family a real hot meal wires deep competence that carries straight into young adulthood.',
                tag: 'Step 5 · Head chef pride',
              },
            ],
          },
          almanacTruth:
            'A 12-year-old who can cook three real meals from scratch gains more than kitchen help, they gain quiet proof that they can take care of themselves in the real world.',
          scienceDeepDive:
            'Youth nutrition and culinary-competence studies show that pre-adolescents who regularly participate in meal preparation consume significantly more vegetables and whole foods, report higher self-efficacy, and sustain healthier independent eating habits into young adulthood.',
          beat3Kicker: 'Practice beside the stove',
          beat3Title: 'Coach as calm sous-chef without grabbing the spatula',
          rehearsalTriggerSpeaker: '{Name} chopping peppers slowly and nervously checking your face',
          rehearsalTriggerQuote: '“Wait, are these pieces too big? Am I messing up the whole dinner?”',
          rehearsalPrompt: 'Which kitchen habit kills tween cooking confidence fastest?',
          instincts: [
            {
              id: 'grab-knife',
              label: '“Here, move over a sec, let me chop these faster before the pan burns!”',
              whyTitle: 'Why that’s so tempting, and why {pronoun} walks away',
              whyText:
                'Taking the tool out of {poss} hands broadcasts “You’re too slow to be trusted with real jobs.”',
            },
            {
              id: 'micromanage',
              label: '“Not like that! Turn the heat down! Watch the edge! You spilled cheese!”',
              whyTitle: 'Why that’s so tempting, and why it turns cooking stressful',
              whyText:
                'Constant sharp warnings spike anxiety, save crisp direction strictly for true safety (knives, hot pans).',
            },
          ],
          calmScriptPlain:
            '“Rustic chunky peppers taste awesome, they’re going to roast great! Remember your curled claw fingers, and shout whenever you want your sous-chef to hand you the olive oil or timer.”',
          calmScriptSegments: [
            {
              id: 'celebrate',
              text: '“Rustic chunky peppers taste awesome, they’re going to roast great! ',
              tag: 'Celebrate imperfect progress',
              note: 'Removes perfection pressure so cooking stays joyful.',
            },
            {
              id: 'one-cue',
              text: 'Remember your curled claw fingers, ',
              tag: 'One calm safety anchor',
              note: 'Keeps safety guidance brief, steady, and respectful.',
            },
            {
              id: 'flip-role',
              text: 'and shout whenever you want your sous-chef to hand you the olive oil or timer.”',
              tag: 'Hand {obj} the captain hat',
              note: 'Casting yourself as the sous-chef makes tweens glow with pride.',
            },
          ],
          deliveryCues: [
            'Practice the first run on a relaxed weekend evening, not a rushed Tuesday',
            'Keep hands behind your back unless safety truly requires stepping in',
            'Have everyone at the table thank the chef specifically for one tasty detail',
          ],
          pushbacks: [
            {
              id: 'burns-food',
              label: 'What if the eggs stick or the garlic gets too crispy?',
              setup: 'Laugh lightly together, every great cook learns heat by scorching one pan!',
              script: '“Official chef milestone unlocked! Every real cook chars a batch once, let’s scrape the pan and try medium-low heat.”',
            },
            {
              id: 'hates-cleanup',
              label: 'What if {pronoun} loves cooking but bolts before washing up?',
              setup: 'Build “clean as you go” right into head-chef culture.',
              script: '“Deal: while your pasta simmers, we both clear cutting boards together so dinner finishes with an almost-clean sink.”',
            },
          ],
          advisorPrompt:
            'I want my {age} tween to learn 3 simple, real meals independently without kitchen stress. Can you give me a fun starter plan for our first chef night?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Launch one tween chef night this week',
          beat4Lead: 'Pick the easiest starter step to hand over real kitchen pride.',
          moves: [
            {
              id: 'pick-first-meal',
              title: 'Let {name} pick Meal #1 from 3 winners',
              desc: 'Offer: 1) Loaded Egg & Cheese Wraps, 2) Sheet-Pan Chicken/Bean Tacos, or 3) One-Pot Garlic Pasta + Broccoli.',
            },
            {
              id: 'claw-grip',
              title: 'Do a 3-minute claw-grip practice',
              desc: 'Practice curling fingertips safely while slicing cucumbers, avocado, or mushrooms together.',
            },
            {
              id: 'sous-chef-pledge',
              title: 'Wear the quiet sous-chef hat',
              desc: 'During {poss} turn at the stove, only speak for safety or when the head chef asks for help.',
            },
          ],
          closingNote:
            'Watching your tween set a steaming skillet they cooked themselves in the center of the table is pure magic, you are feeding both tonight’s dinner and their future independence.',
          pocketInsight: 'Hand over three signature meals using the 5-rung ladder, stay in the sous-chef role, and celebrate rustic imperfection.',
          nextEpisodeHook: null,
          interactiveHighlights: ['5-rung tween cooking ladder', 'Sous-chef coaching script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 29: Real-World Passions, Quitting & Deep Focus (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'play-tween-flow-hobbies',
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    title: 'Real-World Passions, Quitting & Deep Focus',
    reliefSubtitle:
      'Help your tween spark a real-world hobby without pushing, coach through the dip right before mastery, navigate teams and peers, and protect real focus',
    tonightQuickWinTitle: 'Episode 1: Helping {Name} Find a Real-World Hobby (Without Pushing)',
    summary:
      'Spark genuine offline interests without nagging or overscheduling, decode why tweens abruptly want to quit right before skills click, coach healthy team dynamics and peer boundaries, and protect joyful deep focus in a distraction-heavy world.',
    coverImageUrl: 'https://assets.alongside.care/academy/play-tween.png',
    sortOrder: 6,
    episodes: [
      {
        slug: 'tween-hobby-discovery-setup',
        title: 'Helping {Name} Find a Real-World Hobby (Without Pushing)',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Real-world spark · Low-pressure curiosity beats forced signups',
          headline: 'Helping {Name} Find a Real-World Hobby (Without Pushing)',
          deck: 'Why lecturing “Get off your screen and find a hobby!” stalls out, and how low-stakes 4-week “sampler trials” help tweens discover passions that actually stick.',
          sceneTime: '2:15 PM · SATURDAY LIVING ROOM',
          sceneBody:
            'It’s a sunny Saturday afternoon and {name} flops upside down on the couch groaning, “There’s literally NOTHING to do besides YouTube!” You rattle off five ideas, guitar, sketching, basketball, coding, and {pronoun} shoots every single one down with “Boring!” *You want {obj} lit up by something real, without becoming a pushy activities director.*',
          pollQuestion: 'What gets in the way of offline hobbies most right now?',
          pollOptions: [
            {
              id: 'screens-easier',
              label: 'Screens offer instant dopamine so real hobbies feel too slow to start',
              response:
                'Spot on! Lowering the startup friction with visible gear and short sampler trials makes real-world play effortless to enter.',
            },
            {
              id: 'afraid-bad',
              label: '{Pronoun} quits or avoids trying new things if {pronoun} isn’t instantly great',
              response:
                'Age 10–12 brings huge social self-consciousness, low-stakes private experimenting takes the spotlight off looking silly.',
            },
          ],
          beat2Kicker: 'Pushing vs. inviting real spark',
          beat2Title: 'Curiosity blooms when startup friction is tiny and stakes are low',
          beat2Lead:
            'Tweens resist hobbies that feel like another parent-assigned resume item. Designing a visible, low-pressure “Sampler Guardrail” lets genuine intrinsic curiosity catch fire. Compare both setups below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Forced enrichment vs. low-stakes hobby sampler',
          visualStageHint: 'Compare parent pushing vs. inviting real curiosity',
          visualConfig: {
            willpowerLabel: 'Parent-Pushed Signups',
            willpowerTitle: 'Signing up for expensive year-long commitments',
            willpowerDesc:
              'Lecturing about wasted afternoons or picking hobbies YOU wish you’d tried makes {name} feel managed instead of curious.',
            willpowerOutcome: 'Dusty gear, weekly car fights, and resistance to trying new things.',
            guardrailLabel: '4-Week Sampler Guardrail',
            guardrailTitle: 'Low-stakes experiments + visible starter gear',
            guardrailDesc:
              'Borrow or buy modest starter supplies, leave them out in the open, and treat the first month as a zero-shame taste test.',
            guardrailOutcome: 'Self-chosen passions {name} reaches for without reminders.',
            environmentShifts: [
              'Keep one hands-on project visibly set out (sketchbook, Rubik’s cube, skateboard, ukulele, baking tray), never buried in closets.',
              'Start with 4-week “sampler passes” instead of year-long contracts.',
              'Follow {poss} weird niche sparks (origami, stop-motion, bike repair, birding) over prestigious trophies.',
            ],
          },
          almanacTruth:
            'You cannot nag a tween into passion, you simply lower the barrier to interesting tools, protect pockets of offline boredom, and cheer whichever quirky spark catches.',
          scienceDeepDive:
            'Self-Determination Theory research by Edward Deci and Richard Ryan demonstrates that intrinsic youth motivation hinges on autonomy, competence, and relatedness; when adolescents choose low-stakes exploratory hobbies themselves, persistence and well-being climb dramatically.',
          beat3Kicker: 'Practice on a slow weekend',
          beat3Title: 'Offer a curious sampler instead of a lecture on boredom',
          rehearsalTriggerSpeaker: '{Name} slumped across the couch scrolling or complaining of boredom',
          rehearsalTriggerQuote: '“I’m bored! Nobody’s around and I don’t even have any good hobbies.”',
          rehearsalPrompt: 'Which parent response kills curiosity on contact?',
          instincts: [
            {
              id: 'screen-lecture',
              label: '“You’re only bored because screens fried your attention span! Go read a book!”',
              whyTitle: 'Why that’s so tempting, and why it shuts {obj} down',
              whyText:
                'Turning boredom into a moral scolding puts tweens instantly on defense instead of exploratory mode.',
            },
            {
              id: 'parent-dream',
              label: '“I told you, you should join travel tennis like your cousin, it looks great on applications!”',
              whyTitle: 'Why that’s so tempting, and why autonomy evaporates',
              whyText:
                'Framing play around comparison or future resumes sucks every drop of joy out of a 11-year-old’s curiosity.',
            },
          ],
          calmScriptPlain:
            '“Honestly, picking a whole giant hobby sounds heavy. What if we pick one weird 4-week experiment just for fun, like stop-motion clay videos, indoor bouldering, baking bread, or learning three guitar chords? If you hate it after four weeks, zero guilt, we try something else.”',
          calmScriptSegments: [
            {
              id: 'shrink-stakes',
              text: '“Honestly, picking a whole giant hobby sounds heavy. ',
              tag: 'Drop perfection pressure',
              note: 'Removes fear of being trapped in a permanent commitment.',
            },
            {
              id: 'sampler-menu',
              text: 'What if we pick one weird 4-week experiment just for fun, like stop-motion clay videos, indoor bouldering, baking bread, or learning three guitar chords? ',
              tag: 'Concrete playful menu',
              note: 'Tactile, slightly unexpected options spark way more curiosity than “go find a hobby.”',
            },
            {
              id: 'exit-clause',
              text: 'If you hate it after four weeks, zero guilt, we try something else.”',
              tag: 'Safe exit ramp',
              note: 'Knowing you can pivot cleanly makes saying yes feel brave and exciting.',
            },
          ],
          deliveryCues: [
            'Let offline hobbies be messy, niche, or unpolished, avoid turning them into competitions',
            'Model having your own visible offline hobby too (reading, gardening, fixing things)',
            'Notice what {name} already watches tutorials about, that’s a huge clue to offline interests!',
          ],
          pushbacks: [
            {
              id: 'gaming-hobby',
              label: 'What if {pronoun} says “Gaming IS my hobby!”?',
              setup: 'Respect gaming as one piece while balancing hands-on physical and creative worlds.',
              script: '“Gaming is definitely a fun piece, and our brains feel awesome when we have at least one hands-on offline thing too. Want to try building game props, sketching characters, or a sport?”',
            },
            {
              id: 'expensive',
              label: 'What if {pronoun} picks an expensive hobby and loses interest?',
              setup: 'Start borrowed, secondhand, or library-sourced for the first 30 days.',
              script: '“Love that idea! Let’s borrow or grab starter gear secondhand for month one, if you’re still hooked after 4 weeks, we upgrade together.”',
            },
          ],
          advisorPrompt:
            'My {age} tween struggles to get into offline hobbies and defaults straight to screens when bored. Can you help us brainstorm fun low-stakes 4-week hobby samplers?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Plant one low-friction hobby seed this weekend',
          beat4Lead: 'Pick one simple way to spark offline curiosity without nagging.',
          moves: [
            {
              id: 'clue-audit',
              title: 'Mine {poss} current curiosity clues',
              desc: 'Notice what videos, books, or random facts {name} already talks about, translate one into a hands-on weekend project.',
            },
            {
              id: 'visible-station',
              title: 'Leave starter gear in plain sight',
              desc: 'Set a sketchbook, origami pack, guitar stand, or bike pump right in the living space instead of a closet.',
            },
            {
              id: 'sampler-deal',
              title: 'Pitch a zero-guilt 4-week sampler',
              desc: 'Offer one fun new trial class, club, or DIY kit with an explicit “re-evaluate cleanly after 4 weeks” agreement.',
            },
          ],
          closingNote:
            'A tween’s first real passion rarely arrives on command, keep leaving intriguing tools in their path and honoring their quirks, and one afternoon you’ll hear total, joyful silence.',
          pocketInsight: 'Ditch big commitments: offer 4-week zero-guilt hobby samplers and leave hands-on gear visibly within reach.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 2',
            mystery: 'Why do tweens suddenly announce “I want to quit!” right at the exact week their skill is about to click?',
            title: 'Why Tweens Want to Quit Right Before They Get Good',
            targetSlug: 'tween-deliberate-practice-routine',
          },
          interactiveHighlights: ['Forced signup vs. sampler guardrail', '4-week experiment pitch script'],
        },
      },
      {
        slug: 'tween-deliberate-practice-routine',
        title: 'Why Tweens Want to Quit Right Before They Get Good',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'The competence dip · Coaching grit without forcing misery',
          headline: 'Why Tweens Want to Quit Right Before They Get Good',
          deck: 'Why age 10–12 is the peak “I suck at this, I quit!” window, and how naming the messy middle builds real resilience without dragging kids through misery.',
          sceneTime: '4:50 PM · PRACTICE ROOM / DRIVEWAY',
          sceneBody:
            'Two months ago {name} begged to learn guitar (or join swim team). Tonight {pronoun} hits the exact tricky jump where beginner magic wears off, tosses the pick onto the floor, and announces, “I’m terrible at this, everyone else is way better. I’m quitting!” *You feel torn between honoring {poss} voice and teaching {obj} not to bail the second things feel bumpy.*',
          pollQuestion: 'Does your tween hit a wall and want to quit right when skills get tricky?',
          pollOptions: [
            {
              id: 'instant-quit',
              label: 'Yes, the second {pronoun} isn’t effortlessly good, {pronoun} wants out!',
              response:
                'Welcome to the “Taste-Skill Gap”! Tween brains get smart enough to hear mistakes right before their muscles catch up, which feels awful until you name it!',
            },
            {
              id: 'when-allow',
              label: 'I never know when to push through vs. when quitting is genuinely healthy',
              response:
                'One clean rule solves that dilemma forever: never quit on a bad day, always finish the agreed season or 2-week checkpoint calmly.',
            },
          ],
          beat2Kicker: 'Inside the “messy middle” dip',
          beat2Title: 'Frustration means myelin is actively wrapping new circuits',
          beat2Lead:
            'Around ages 10–12, critical self-awareness leaps ahead of physical skill, so tweens suddenly notice every squeaky note or missed pass. Flip both lenses below and explore how short reps cross the messy dip.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'The quitting dip: adult lens vs. tween brain lens',
          visualStageHint: 'Flip lenses and tap steady 10-minute practice reps',
          visualConfig: {
            adultLabel: 'Parent instinct lens',
            adultQuote: '“We literally just bought the gear, why won’t {pronoun} stick with anything for more than two months?!”',
            adultSub: 'Watching enthusiasm vanish overnight looks like laziness or flakiness from the outside.',
            childLabel: '{Possessive} self-aware lens',
            childQuote: '“I can hear how sloppy I sound compared to good players, maybe I just don’t have talent!”',
            childSub: 'Acute peer comparison tricks tweens into confusing normal awkward learning with permanent failure.',
            exposureHeading: 'Crossing the Messy Middle (10-Min Reps)',
            exposureSub: 'Tap practice reps to watch awkward clumsy effort click into flow',
            totalDots: 12,
            defaultCount: 4,
            unitLabel: 'short rep',
            lowMax: 4,
            midMax: 8,
            lowMsg: 'The Awkward Dip (Reps 1–4): Everything feels clunky, this exact friction signals brain pathways upgrading!',
            midMsg: 'First Breakthroughs (Reps 5–8): One small phrase or move suddenly clicks smoothly and sparks pride.',
            highMsg: 'Self-Fueling Skill (Reps 9–12): Competence feels good on its own, {name} starts practicing without nagging!',
          },
          almanacTruth:
            'The awkward, clunky frustration your tween wants to run from is not proof they lack talent, it is the literal physical sensation of new brain wiring insulating.',
          scienceDeepDive:
            'Motor-learning and deliberate-practice research (K. Anders Ericsson; Dr. Carol Dweck) shows that short, focused skill reps at the edge of current ability trigger activity-dependent myelination, speeding neural signals, while reframing mistakes as growth cues prevents fixed-mindset dropout.',
          beat3Kicker: 'Practice during a “I quit!” meltdown',
          beat3Title: 'Normalize the awkward dip and hold the “not on a bad day” rule',
          rehearsalTriggerSpeaker: '{Name} throwing down {poss} gear in frustration after a rough practice',
          rehearsalTriggerQuote: '“I’m the worst one on the team. I hate this and I’m NEVER going back!”',
          rehearsalPrompt: 'Which response accidentally locks in either shame or helplessness?',
          instincts: [
            {
              id: 'guilt-money',
              label: '“Do you know how much money I paid for those lessons?! You are NOT quitting!”',
              whyTitle: 'Why that’s so tempting, and why joy dies permanently',
              whyText:
                'Guilt-tripping over fees turns skill building into a prison sentence instead of teaching resilient strategy.',
            },
            {
              id: 'instant-rescue',
              label: '“Oh sweetie, don’t be upset. I’ll email the coach tonight and pull you out!”',
              whyTitle: 'Why that’s so tempting, and what it steals',
              whyText:
                'Rescuing {obj} on the exact night of a bad session deprives {obj} of discovering that rough days pass.',
            },
          ],
          calmScriptPlain:
            '“Oof, hitting that awkward wall feels maddening, every single person hits a dip right when their brain starts noticing mistakes faster than their hands move. Our family rule is simple: we never quit on a rough day. Let’s finish out this month with short 10-minute tries, and if you still want to switch on a calm Saturday, I’ll support you 100%.”',
          calmScriptSegments: [
            {
              id: 'name-dip',
              text: '“Oof, hitting that awkward wall feels maddening, every single person hits a dip right when their brain starts noticing mistakes faster than their hands move. ',
              tag: 'Decode the Taste-Skill Gap',
              note: 'Replaces “I have no talent” with empowering brain science.',
            },
            {
              id: 'rule',
              text: 'Our family rule is simple: we never quit on a rough day. ',
              tag: 'Neutral grit guardrail',
              note: 'Prevents impulsive emotional bailing without locking {name} in forever.',
            },
            {
              id: 'fair-review',
              text: 'Let’s finish out this month with short 10-minute tries, and if you still want to switch on a calm Saturday, I’ll support you 100%.”',
              tag: 'Respectful exit date',
              note: 'Honors emerging autonomy while giving real breakthroughs time to arrive.',
            },
          ],
          deliveryCues: [
            'Shrink daily practice to tiny 10-minute focused sprints instead of grueling 45-minute marathons',
            'Praise specific strategy (“Breaking that tricky bar into 4 slow notes worked!”) over innate talent',
            'Share one honest story of something YOU felt awful at before it clicked',
          ],
          pushbacks: [
            {
              id: 'still-wants-quit',
              label: 'What if the calm checkpoint arrives and {pronoun} genuinely still hates it?',
              setup: 'Honor the promise cleanly, walking away thoughtfully after finishing a season builds huge integrity!',
              script: '“You kept your word and finished the season strong, that takes real grit! Now let’s decide what you’d love to explore next.”',
            },
            {
              id: 'wont-practice',
              label: 'What if {pronoun} refuses to practice at home between sessions?',
              setup: 'Shrink the practice hurdle to laughably tiny daily starts.',
              script: '“Skip the big session, just pick it up for 5 minutes right before dinner to keep your fingers warm.”',
            },
          ],
          advisorPrompt:
            'My {age} tween wants to quit an activity the second it gets challenging. How do I teach resilience through the messy dip without forcing misery?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Pick one grit-building move for this week',
          beat4Lead: 'Make the messy middle normal, tiny, and survivable.',
          moves: [
            {
              id: 'bad-day-rule',
              title: 'Adopt the “Never Quit on a Bad Day” rule',
              desc: 'Share it calmly during a good moment so {name} knows rough practices never trigger panic.',
            },
            {
              id: 'ten-min-timer',
              title: 'Shrink home practice to 10 focused minutes',
              desc: 'Pick ONE tricky 30-second section to repeat slowly instead of grinding from start to finish.',
            },
            {
              id: 'celebrate-mistake',
              title: 'High-five one messy mistake at dinner',
              desc: 'Ask everyone at the table: “What’s one awkward mistake that stretched your brain today?”',
            },
          ],
          closingNote:
            'Coaching your tween calmly across one awkward dip teaches a secret most adults are still learning: feeling clumsy at the beginning is the doorway to everything worth doing.',
          pocketInsight: 'Name the Taste-Skill Gap, shrink practice to 10-minute bursts, and never quit on a bad day.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 3',
            mystery: 'How do you help a tween stand tall through tricky team cliques, tough coaches, and friend drama without jumping in to fix it?',
            title: 'Navigating Team Dynamics, Coaches & Peer Pressure',
            targetSlug: 'tween-collaborative-group-projects',
          },
          interactiveHighlights: ['Taste-skill lens & rep map', 'Never-quit-on-a-bad-day script'],
        },
      },
      {
        slug: 'tween-collaborative-group-projects',
        title: 'Navigating Team Dynamics, Coaches & Peer Pressure',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Social coaching · Rehearsing brave voices behind the scenes',
          headline: 'Navigating Team Dynamics, Coaches & Peer Pressure',
          deck: 'Why emailing the coach or texting the other parent backfires at age 11, and how coaching your tween to advocate for themselves builds rock-solid social courage.',
          sceneTime: '5:10 PM · AFTER GROUP PROJECT / TEAM PRACTICE',
          sceneBody:
            '{Name} slumps into the car furious: “Liam took over our entire science poster and laughed at my idea, and Coach barely let me play! Can you please email Mr. Diaz tonight?” *Your protective lion instinct roars to grab your phone and fire off a crisp email, yet part of you wonders if rescuing {obj} right now will leave {obj} feeling smaller tomorrow.*',
          pollQuestion: 'When friend or team friction hits, what’s hardest for you as a parent?',
          pollOptions: [
            {
              id: 'step-in',
              label: 'Holding myself back from fixing unfairness for {obj} right away',
              response:
                'Every loving parent feels that urge! Stepping back into the role of “rehearsal coach” lets {name} borrow your courage without losing {poss} own voice.',
            },
            {
              id: 'peer-pressure',
              label: 'Helping {obj} say no smoothly when peers tease or push boundaries',
              response:
                'Practicing casual 5-word pushback lines at home ahead of time works wonders when peer adrenaline hits.',
            },
          ],
          beat2Kicker: 'The behind-the-scenes coaching loop',
          beat2Title: 'Rehearse at home, let {name} lead on the field',
          beat2Lead:
            'Ages 10–12 are the golden dress-rehearsal years for self-advocacy, stakes are still low enough for practice, yet social belonging feels huge. Step through the 3-beat social coaching loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-step self-advocacy coaching loop',
          visualStageHint: 'Tap each step to hand social courage to your tween',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Listen & sort',
                label: 'Safety vs. Skill',
                quote: '“Is this safety/bullying where adults step in, or a tough peer/coach moment we can coach?”',
                desc: 'Adults ALWAYS step in immediately for bullying, cruelty, or physical safety; everyday bossy teammates and playing-time questions are prime skill practice.',
                brainNote: 'Clear sorting protects safety without robbing independence.',
              },
              {
                stepNum: '02',
                actor: 'Role-play together',
                label: 'Rehearse 2 Lines',
                quote: '“Let’s practice one short, respectful sentence you could say to Coach or Liam tomorrow.”',
                desc: 'Say it out loud once or twice in the car, even playfully, so the words sit ready on {poss} tongue.',
                brainNote: 'Rehearsing lowers amygdala freeze during real social friction.',
              },
              {
                stepNum: '03',
                actor: '{Name} tries it',
                label: 'Debrief With Pride',
                quote: '“You spoke up even though your heart was pounding, how did that feel?”',
                desc: 'Celebrate the bravery of speaking up regardless of whether the other person instantly agreed.',
                brainNote: 'Wires lasting confidence in handling tough groups and peers.',
              },
            ],
          },
          almanacTruth:
            'Every everyday problem you let your 11-year-old practice solving with your backstage coaching, instead of fixing by email, deposits real courage into their teen years.',
          scienceDeepDive:
            'Developmental social-competence research highlights that middle-school transition years represent a critical window for assertive communication and peer-pressure resistance; adult-coached behavioral rehearsal measurably outperforms parent-led intervention in building autonomous social problem-solving.',
          beat3Kicker: 'Practice in the front seat',
          beat3Title: 'Shift from fixer to warm backstage speechwriter',
          rehearsalTriggerSpeaker: '{Name} begging you to email the teacher or coach about a bossy partner',
          rehearsalTriggerQuote: '“Please just email Mr. Diaz and ask him to move me. I can’t say anything or everyone will think I’m weird!”',
          rehearsalPrompt: 'Which reaction misses the sweet spot between rescuing and abandoning?',
          instincts: [
            {
              id: 'send-email',
              label: '“Hand me my phone. I’m emailing Mr. Diaz right now to straighten this out!”',
              whyTitle: 'Why that’s so tempting, and why it backfires socially',
              whyText:
                'Stepping in over ordinary partner friction unintentionally signals to {name} (and peers) that {pronoun} can’t handle social bumps.',
            },
            {
              id: 'sink-swim',
              label: '“Welcome to the real world! You’re old enough to deal with it yourself.”',
              whyTitle: 'Why that’s so tempting, and why it feels lonely',
              whyText:
                'Dropping {obj} in the deep end without a coached phrase leaves {obj} overwhelmed and reluctant to come to you next time.',
            },
          ],
          calmScriptPlain:
            '“It’s super frustrating when one person steamrolls a group project. I’m always ready to step in if someone is cruel or unsafe, for bossy teamwork, I know you can handle this way better than an email from Mom/Dad. Want to cook up a quick chill sentence together you could say tomorrow?”',
          calmScriptSegments: [
            {
              id: 'safety-guarantee',
              text: '“It’s super frustrating when one person steamrolls a group project. I’m always ready to step in if someone is cruel or unsafe, ',
              tag: 'Reassure safety net',
              note: 'Makes crystal clear that bullying or harm ALWAYS brings immediate adult backup.',
            },
            {
              id: 'vote-confidence',
              text: 'for bossy teamwork, I know you can handle this way better than an email from Mom/Dad. ',
              tag: 'Vote of real belief',
              note: 'Projects calm pride in {poss} growing maturity.',
            },
            {
              id: 'co-script',
              text: 'Want to cook up a quick chill sentence together you could say tomorrow?”',
              tag: 'Backstage rehearsal offer',
              note: 'Equips {obj} with exact, non-awkward words (“Hey, let’s split this. I’ll build the graphs while you do the title!”).',
            },
          ],
          deliveryCues: [
            'Keep coached scripts super short and natural, sound like a tween, not a lawyer',
            'Practice one casual exit line for peer dares (“Nah, I’m good, let’s grab food”)',
            'Follow up warmly the next afternoon to cheer any tiny brave attempt',
          ],
          pushbacks: [
            {
              id: 'bullying',
              label: 'How do I tell ordinary peer friction apart from actual bullying?',
              setup: 'Look for repeated targeted cruelty, power imbalance, exclusion campaigns, or threats.',
              script: '“One bossy afternoon is friction we coach; repeated targeting, mocking, or ganging up is bullying, and I partner directly with school adults right away.”',
            },
            {
              id: 'blame-parent',
              label: 'Can {name} blame me to escape sketchy peer pressure?',
              setup: 'YES, giving a tween an instant “blame my strict parent” card is pure gold!',
              script: '“Any time a group pushes you toward something weird, text me an X and blame your annoying parent. I’ll happily play the bad guy!”',
            },
          ],
          advisorPrompt:
            'My {age} tween is dealing with bossy teammates and peer pressure and wants me to step in. How can I coach {obj} to advocate for {obj} confidently?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Pick one backstage social-coaching move',
          beat4Lead: 'Give {name} one concrete verbal tool to carry into tomorrow.',
          moves: [
            {
              id: 'coach-line',
              title: 'Co-write one 10-word self-advocacy line',
              desc: 'Help {name} rehearse one calm question for a teacher, coach, or partner (“Hey Coach, what’s one skill I can work on to earn more minutes?”).',
            },
            {
              id: 'exit-code',
              title: 'Set up the “Blame Me” text code',
              desc: 'Agree on one single emoji or letter {name} can send anytime {pronoun} {wants} an instant rescue call out of peer pressure.',
            },
            {
              id: 'spotlight-character',
              title: 'Notice real-friend green flags out loud',
              desc: 'Casually point out friends who listen, share laughs, and treat {name} kindly, helping sharpen {poss} social compass.',
            },
          ],
          closingNote:
            'Stepping backstage while your tween finds {poss} own steady voice takes quiet parental bravery, and the proud grin on {poss} face after speaking up is unforgettable.',
          pocketInsight: 'Step in immediately for safety or bullying; for everyday team friction, stay backstage and rehearse one 10-word line together.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 4',
            mystery: 'In a world of 15-second clips and constant pings, how do you protect your tween’s priceless ability to get lost in deep focus?',
            title: 'Protecting Real Focus in a Distracted World',
            targetSlug: 'tween-flow-state-and-dopamine',
          },
          interactiveHighlights: ['3-step self-advocacy loop', 'Backstage coaching script'],
        },
      },
      {
        slug: 'tween-flow-state-and-dopamine',
        title: 'Protecting Real Focus in a Distracted World',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Deep focus · Protecting joyful absorption from constant pings',
          headline: 'Protecting Real Focus in a Distracted World',
          deck: 'Why 15-second feeds leave tweens weirdly restless and drained, and how protecting one uninterrupted 30-minute focus pocket rewires deep satisfaction.',
          sceneTime: '4:20 PM · LIVING ROOM FLOOR',
          sceneBody:
            'You watch {name} jump from a YouTube Short to a text chime, flip to homework for 90 seconds, check a notification, and groan, “Why am I so exhausted? I didn’t even finish anything!” *Constant tiny pings slice attention into confetti, robbing kids of the calm magic of losing track of time in something real.*',
          pollQuestion: 'How often does your tween get genuinely lost in one uninterrupted activity?',
          pollOptions: [
            {
              id: 'rare',
              label: 'Way less than a couple years ago, pings break focus every few minutes',
              response:
                'That’s not a character flaw in {name}, notifications are engineered to interrupt focus. Protecting one quiet offline pocket brings deep absorption right back!',
            },
            {
              id: 'art-sports',
              label: 'Only during sports, art, or building when devices are completely away',
              response:
                'Notice how peaceful and happy {pronoun} {looks} right after those moments! That calm glow is genuine deep flow at work.',
            },
          ],
          beat2Kicker: 'The deep-focus rhythm',
          beat2Title: 'Deep satisfaction takes 12 quiet minutes to switch on',
          beat2Lead:
            'Fast feeds deliver tiny hollow dopamine spikes that leave tweens irritable afterward. Real deep absorption (“flow”) takes ~12 uninterrupted minutes to enter, and leaves brains energized and proud. Walk through the 4-beat Focus Pocket below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'Building one 30-minute deep-focus pocket',
          visualStageHint: 'Tap each beat to see real absorption switch on',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Min 0',
                label: 'Park the Pings',
                title: 'Phones & alerts rest in another room',
                desc: 'Even a silent phone lying face-down on the desk siphons background mental bandwidth.',
                why: 'Out of sight frees working memory to settle fully.',
              },
              {
                timeOrCue: 'Min 1–10',
                label: 'Push Past Static',
                title: 'Expect mild restlessness in the first 10 minutes',
                desc: 'Remind {name} that feeling slightly fidgety at minute 4 is totally normal, don’t bail yet.',
                why: 'Attention circuits need a brief warm-up runway to lock in.',
              },
              {
                timeOrCue: 'Min 12–30',
                label: 'The Flow Zone',
                title: 'Time disappears into drawing, building, reading, or music',
                desc: 'Challenge matches skill just right, producing deep calm and authentic pride.',
                why: 'Sustained focus strengthens prefrontal attention muscles permanently.',
              },
              {
                timeOrCue: 'After',
                label: 'Notice the Glow',
                title: 'Contrast how calm {pronoun} {feels} vs. post-scroll fizz',
                desc: 'Helping tweens notice their own nervous system turns focus protection into their idea.',
                why: 'Self-awareness beats lifelong parental policing.',
              },
            ],
          },
          almanacTruth:
            'Cheap scroll-dopamine feels thrilling for ten seconds and hollow afterward; deep focus feels slightly bumpy for ten minutes and deeply satisfying for hours.',
          scienceDeepDive:
            'Optimal-experience research founded by Mihaly Csikszentmihalyi and modern cognitive-load studies demonstrate that uninterrupted absorption in a moderately challenging task elevates mood and strengthens sustained executive attention, whereas rapid notification switching creates measurable attention residue.',
          beat3Kicker: 'Practice during homework or Sunday afternoon',
          beat3Title: 'Frame quiet focus as a superpower, not screen punishment',
          rehearsalTriggerSpeaker: '{Name} complaining when you suggest parking phones during a project',
          rehearsalTriggerQuote: '“I focus BETTER with my phone next to me. I just check it for two seconds!”',
          rehearsalPrompt: 'Which reply sparks an eye-roll instead of genuine curiosity?',
          instincts: [
            {
              id: 'lecture-brain',
              label: '“No you don’t! Studies prove kids can’t multitask, give me the phone right now!”',
              whyTitle: 'Why that’s so tempting, and why {pronoun} tunes out',
              whyText:
                'Confiscating the device with an “I know better” lecture makes {name} fight for control rather than test what truly helps.',
            },
            {
              id: 'shrug',
              label: '“Fine, keep it, don’t cry to me when math takes until 9:30 PM!”',
              whyTitle: 'Why that’s so tempting, and why evenings drag out',
              whyText:
                'Watching homework stretch twice as long exhausts everyone and erodes sleep.',
            },
          ],
          calmScriptPlain:
            '“Let’s run a real two-day experiment like scientists: today do 25 minutes of homework with your phone docked in the kitchen. I’ll park mine right beside it, and time how fast you finish. If it actually buys you 30 extra minutes of free time, you keep the win!”',
          calmScriptSegments: [
            {
              id: 'experiment',
              text: '“Let’s run a real two-day experiment like scientists: ',
              tag: 'Spark curious buy-in',
              note: 'Turns focus into an experiment {name} judges, not an adult decree.',
            },
            {
              id: 'solidarity',
              text: 'today do 25 minutes of homework with your phone docked in the kitchen. I’ll park mine right beside it, ',
              tag: 'Lead by example',
              note: 'Parking your own phone proves this is human brain wiring, not a kid punishment.',
            },
            {
              id: 'payoff',
              text: 'and time how fast you finish. If it actually buys you 30 extra minutes of free time, you keep the win!”',
              tag: 'Highlight {poss} payoff',
              note: 'Connects focus directly to something tweens treasure: more real free time.',
            },
          ],
          deliveryCues: [
            'Protect uninterrupted focus, avoid interrupting {name} mid-flow for minor chores!',
            'Notice aloud when YOU feel calmer after an hour away from notifications',
            'Keep one weekly “quiet hour” where everyone enjoys books, puzzles, art, or music together',
          ],
          pushbacks: [
            {
              id: 'music-study',
              label: 'What if {pronoun} {wants} music while working or drawing?',
              setup: 'Instrumental or lo-fi music from a speaker works great, no glowing feed needed.',
              script: '“Instrumental playlist on the speaker is awesome, let’s queue it up and park the screen out of reach so notifications don’t hijack you.”',
            },
            {
              id: 'interrupt-chore',
              label: 'What if dinner is ready right while {pronoun} {is} deep in a Lego or art flow?',
              setup: 'Give a respectful 5-minute landing warning, protect flow like gold!',
              script: '“Love seeing you locked in! Dinner hits the table in 7 minutes, find a great stopping spot and leave your project right where it is.”',
            },
          ],
          advisorPrompt:
            'My {age} tween jumps constantly between notifications and tasks and feels drained. How can we protect real uninterrupted focus time at home?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Protect one 30-minute deep-focus pocket this week',
          beat4Lead: 'Give {poss} attention muscle one clean, ping-free workout.',
          moves: [
            {
              id: 'park-together',
              title: 'Run the 25-minute side-by-side focus test',
              desc: 'Dock BOTH your phones in another room for 25 minutes during homework or reading and compare how fast time flies.',
            },
            {
              id: 'guard-flow',
              title: 'Protect flow when you spot it',
              desc: 'Next time {name} is absorbed in drawing, coding, reading, or tinkering, hold non-urgent reminders until {pronoun} surfaces.',
            },
            {
              id: 'sunday-quiet-hour',
              title: 'Start a cozy 30-minute Sunday Quiet Hour',
              desc: 'Snacks out, screens docked, everyone picks one absorbing offline project in the same room.',
            },
          ],
          closingNote:
            'Protecting your tween’s capacity for quiet, unhurried absorption may be one of the rarest superpowers you ever help {obj} build.',
          pocketInsight: 'Park phones in another room for 25 minutes, cross the first 10 restless minutes, and let real flow build pride.',
          nextEpisodeHook: null,
          interactiveHighlights: ['4-beat deep-focus timeline', 'Two-day scientist test script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 30: First-Phone Readiness, Group Chats & Bilateral Pacts (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'digital-tween-smartphone-pacts',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    title: 'First-Phone Readiness, Group Chats & Bilateral Pacts',
    reliefSubtitle:
      'Assess true first-smartphone readiness, decode group-chat FOMO, lock in an 8:30 PM central charging dock as neutral house law, and co-sign your Bilateral Family Pact',
    tonightQuickWinTitle: 'Episode 1: Is {Name} Actually Ready for a First Smartphone?',
    summary:
      'Step off the peer-pressure treadmill with clear readiness benchmarks and bridge-device options, understand why tween group chats and read receipts trigger intense FOMO, install a neutral 8:30 PM central charging station, and co-sign an Alongside Bilateral Family Phone Pact that protects trust.',
    coverImageUrl: 'https://assets.alongside.care/academy/digital-tween.png',
    sortOrder: 6,
    episodes: [
      {
        slug: 'tween-wait-until-8th-roadmap',
        title: 'Is {Name} Actually Ready for a First Smartphone?',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Graduated roadmap · Communication tools before full internet pocket',
          headline: 'Is {Name} Actually Ready for a First Smartphone?',
          deck: 'Why “everyone in 5th grade has one!” is rarely true, and how separating safe communication from pocket-sized internet gives you a calm, phased roadmap.',
          sceneTime: '3:50 PM · CARPOOL LINE',
          sceneBody:
            '{Name} buckles {poss} seatbelt and immediately sighs, “Literally EVERY single person in my class has an iPhone now except me! What if practice gets canceled and I’m stranded? I’m the only baby left!” *You feel the squeeze between real after-school pickup logistics and handing a 10- or 11-year-old unrestricted 24/7 algorithms.*',
          pollQuestion: 'Where are you right now on the first-phone decision?',
          pollOptions: [
            {
              id: 'holding',
              label: 'Trying to hold off on a full smartphone while solving pickup safety',
              response:
                'Smart move! Calling/texting watches and locked starter phones solve 100% of safety communication without opening social feeds.',
            },
            {
              id: 'already-have',
              label: '{Pronoun} already {has} a phone and I want healthier guardrails',
              response:
                'It is NEVER too late to reset! Adding graduated phases and clear neutral dock rules works cleanly even if a device is already in hand.',
            },
          ],
          beat2Kicker: 'All-at-once vs. graduated readiness',
          beat2Title: 'You wouldn’t hand over highway car keys on day one, phones work the same way',
          beat2Lead:
            'Smartphones bundle two wildly different things: a practical safety tool (calling mom after soccer) and a 24/7 attention engine (infinite feeds and group chats). Compare both rollout paths below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Full smartphone leap vs. graduated bridge roadmap',
          visualStageHint: 'Compare sudden full access vs. phased readiness steps',
          visualConfig: {
            willpowerLabel: 'All-At-Once Smartphone',
            willpowerTitle: 'Handing over full apps, browser & group chats at age 10',
            willpowerDesc:
              'Expecting a 5th- or 6th-grader to out-willpower billionaire recommendation engines leads to nightly battles, sleep loss, and secrecy.',
            willpowerOutcome: 'Constant parental policing and overwhelmed tweens.',
            guardrailLabel: 'Graduated Bridge Roadmap',
            guardrailTitle: 'Safety calls first → family phone → earned personal stages',
            guardrailDesc:
              'Start with a smartwatch or talk/text starter phone for pickups, build offline habits first, and unlock social platforms much later.',
            guardrailOutcome: 'Safe communication now + confident digital maturity later.',
            environmentShifts: [
              'Phase 1 (Safety): GPS smartwatch or talk/text-only bridge device with approved family contacts.',
              'Phase 2 (Training Wheels): Starter phone with zero social apps, central 8:30 PM dock, and co-signed pact.',
              'Ally With 2–3 Families: Even two classmates waiting together cuts social FOMO dramatically.',
            ],
          },
          almanacTruth:
            'Needing to reach your child after soccer practice is a communication problem, never a reason to hand a 10-year-old a full social-media supercomputer.',
          scienceDeepDive:
            'Research synthesized by the American Academy of Pediatrics and Wait Until 8th highlights that delaying personal smartphones and social media through early adolescence protects sleep duration, face-to-face peer skills, and emotional well-being, especially when families align with just 2–3 neighborhood peers.',
          beat3Kicker: 'Practice in the carpool lane',
          beat3Title: 'Validate social pressure while holding a warm, transparent roadmap',
          rehearsalTriggerSpeaker: '{Name} insisting everyone else already has an unrestricted smartphone',
          rehearsalTriggerQuote: '“Everyone else has Snapchat and a real phone, why are you treating me like a toddler?!”',
          rehearsalPrompt: 'Which reaction intensifies the phone tug-of-war?',
          instincts: [
            {
              id: 'never-vague',
              label: '“Because I said so! Stop asking, maybe when you turn sixteen!”',
              whyTitle: 'Why that’s so tempting, and why kids fixate harder',
              whyText:
                'A vague indefinite “no” feels hopeless and arbitrary, making the forbidden phone feel ten times shinier.',
            },
            {
              id: 'cave-guilt',
              label: '“Ugh, fine, maybe for your birthday if you promise to be responsible!”',
              whyTitle: 'Why that’s so tempting, and why willpower fails',
              whyText:
                'Handing over a full phone on an informal promise leaves zero structural guardrails once group chats explode.',
            },
          ],
          calmScriptPlain:
            '“It genuinely stinks feeling like the odd one out when friends pull out phones at pickup. I hear you. This isn’t about treating you like a baby; it’s about pacing big tech the same way we pace driving. Right now a call/text bridge device covers practice safety, and let’s look at our readiness roadmap together so you know exactly how you earn each next step.”',
          calmScriptSegments: [
            {
              id: 'empathize-fomo',
              text: '“It genuinely stinks feeling like the odd one out when friends pull out phones at pickup. I hear you. ',
              tag: 'Validate real social sting',
              note: 'Proves you understand tween social pressure without caving to it.',
            },
            {
              id: 'driving-analogy',
              text: 'This isn’t about treating you like a baby; it’s about pacing big tech the same way we pace driving. ',
              tag: 'Respectful developmental frame',
              note: 'Replaces “I don’t trust you” with common-sense graduated training.',
            },
            {
              id: 'roadmap-clarity',
              text: 'Right now a call/text bridge device covers practice safety, and let’s look at our readiness roadmap together so you know exactly how you earn each next step.”',
              tag: 'Clear transparent horizon',
              note: 'Gives {name} visible milestones (homework, respect, sleep, responsibility) to work toward.',
            },
          ],
          deliveryCues: [
            'Check reality gently, usually only 3–4 vocal classmates have full phones, not “everyone”',
            'Text 2–3 other parents from {poss} class to see who else wants to delay together',
            'Use Alongside’s First-Phone Readiness Quiz together to make readiness objective, not personal',
          ],
          pushbacks: [
            {
              id: 'excluded-chat',
              label: 'What if friends organize weekend plans on a text thread?',
              setup: 'Invite friends directly through parent texts or a family landline/shared tablet check-in!',
              script: '“Let’s host pizza or park hangs at our house, and you can always borrow the family kitchen phone for 15 minutes to plan Saturday with friends.”',
            },
            {
              id: 'already-gave',
              label: 'What if I already gave {obj} a smartphone and realize it was too soon?',
              setup: 'Own it calmly as a parent course-correction, never as punishment.',
              script: '“Honestly I handed you a sports car before giving you driver’s ed, that was on me. We’re keeping your phone, just stepping back to training-wheels settings together.”',
            },
          ],
          advisorPrompt:
            'My {age} tween is pushing hard for a first smartphone because classmates have them. How do I evaluate readiness and offer a fair graduated roadmap?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Take one steady step on your family phone roadmap',
          beat4Lead: 'Move out of reactive guilt and into calm intentional pacing.',
          moves: [
            {
              id: 'parent-allies',
              title: 'Text 2 parent friends tonight',
              desc: 'Ask casually: “Where are you landing on smartphones this year?” Finding even two allies changes everything.',
            },
            {
              id: 'readiness-check',
              title: 'Review 4 concrete readiness markers together',
              desc: 'Discuss everyday habits: waking on time, keeping rooms/belongings tracked, handling “no” calmly, and honoring offline limits.',
            },
            {
              id: 'bridge-option',
              title: 'Separate safety calling from pocket internet',
              desc: 'Explore a talk/text watch, dumbphone, or locked starter device if after-school logistics are the real need.',
            },
          ],
          closingNote:
            'Holding a steady, loving line on early smartphones takes backbone, and two years from now, seeing your tween sleep deeply and laugh face-to-face will confirm every bit of it.',
          pocketInsight: 'Solve pickup safety with a bridge device; pace full smartphones like driver’s ed with a clear readiness roadmap.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 2',
            mystery: 'What actually happens inside a tween group chat at 8 PM, and why does being “left on read” hurt so deeply?',
            title: 'Group Chats, Left-on-Read & Tween FOMO',
            targetSlug: 'tween-social-comparison-and-fomo',
          },
          interactiveHighlights: ['Graduated roadmap guardrail', 'Carpool peer-pressure script'],
        },
      },
      {
        slug: 'tween-social-comparison-and-fomo',
        title: 'Group Chats, Left-on-Read & Tween FOMO',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Digital double bind · Decoding group-chat stress calmly',
          headline: 'Group Chats, Left-on-Read & Tween FOMO',
          deck: 'Why 11-year-old group chats escalate from funny memes to tears in 90 seconds, and how coaching digital social literacy keeps {name} grounded.',
          sceneTime: '7:55 PM · KITCHEN COUNTER',
          sceneBody:
            'Your tween’s messaging app (on a tablet, watch, or phone) chimes 37 times in four minutes. Suddenly {poss} face drops: “Everyone’s making plans in the chat and nobody answered my message, they literally left me on read!” *To an adult it looks like silly text chatter, yet to an 11-year-old nervous system, digital silence feels like being kicked out of the lunch table.*',
          pollQuestion: 'Has group-chat drama or fear of missing out already popped up for your tween?',
          pollOptions: [
            {
              id: 'yes-drama',
              label: 'Yes, misread texts and huge group threads spiral so fast!',
              response:
                'Without vocal tone or facial expressions, tween brains fill every silent text gap with worst-case fear. Teaching “pause before replying” changes everything.',
            },
            {
              id: 'prepping',
              label: 'Not yet. I want {obj} prepared before {pronoun} joins group chats!',
              response:
                'Pre-coaching group-chat literacy BEFORE the first storm is pure gold, like teaching swim strokes in calm water first.',
            },
          ],
          beat2Kicker: 'Inside the digital double bind',
          beat2Title: 'Missing tone + instant read receipts amplify tween social pain',
          beat2Lead:
            'Pre-teen social brains rely heavily on smiles and vocal warmth to confirm belonging. Text-only group threads strip those cues out completely while adding public read-receipts. Flip both lenses below and tap steady digital-literacy coaching reps.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Group-chat silence: adult lens vs. tween brain lens',
          visualStageHint: 'Flip lenses and tap healthy digital-judgment reps',
          visualConfig: {
            adultLabel: 'Parent instinct lens',
            adultQuote: '“It’s just a group text, maybe they’re eating dinner! Put it down and stop overreacting!”',
            adultSub: 'Adults know friends get busy and ignore texts routinely with zero hidden meaning.',
            childLabel: '{Possessive} social-brain lens',
            childQuote: '“Three people read my joke and nobody reacted, everyone secretly thinks I’m annoying!”',
            childSub: 'Without facial cues, a newly sensitized social brain interprets delayed texts as active rejection.',
            exposureHeading: 'Digital Social-Literacy Reps',
            exposureSub: 'Tap coaching moments to build steady tween perspective',
            totalDots: 12,
            defaultCount: 5,
            unitLabel: 'chat check-in',
            lowMax: 4,
            midMax: 8,
            lowMsg: 'Early chats feel intense, sitting beside {name} to decode tone prevents impulsive angry replies.',
            midMsg: 'Growing savvy: {Name} starts muting noisy 20-person chats and picking 1-on-1 calls instead.',
            highMsg: 'Grounded digital poise! {Name} reads silences charitably and steps away when threads turn sour.',
          },
          almanacTruth:
            'Texting strips away 90% of human warmth, so a tween’s tender social brain treats a three-minute silence or plain period like a slammed door.',
          scienceDeepDive:
            'Research from Harvard’s Center for Digital Thriving (Drs. Emily Weinstein and Carrie James) reveals that tweens and teens experience a pervasive “digital double bind”: feeling exhausted by constant availability and group-chat tension while fearing social exclusion if they log off, and secretly welcoming clear parent-backed boundaries.',
          beat3Kicker: 'Practice beside the screen',
          beat3Title: 'Coach calm perspective without grabbing the device in panic',
          rehearsalTriggerSpeaker: '{Name} upset and furiously typing back into a heated group thread',
          rehearsalTriggerQuote: '“Sam kicked me out of the chat as a ‘joke’. I’m texting back that he’s fake right now!”',
          rehearsalPrompt: 'Which reaction misses the coaching moment?',
          instincts: [
            {
              id: 'snatch-ban',
              label: '“That’s it! Hand it over, you’re banned from messaging everyone for a month!”',
              whyTitle: 'Why that’s so tempting, and why kids hide future drama',
              whyText:
                'Punishing {name} for bringing hurt feelings to you guarantees {pronoun} will suffer silently through the next digital storm alone.',
            },
            {
              id: 'type-for-them',
              label: '“Give me that, let me type a polite message for you!”',
              whyTitle: 'Why that’s so tempting, and why it embarrasses tweens',
              whyText:
                'Other tweens spot parent-written texts immediately, escalating social embarrassment.',
            },
          ],
          calmScriptPlain:
            '“Oof, getting booted from a chat stings even when kids call it a joke, no wonder your thumb wants to fire back. Let’s set the device down for ten minutes before typing anything that gets screenshotted forever. Tomorrow, how about talking to Sam one-on-one or muting the giant thread?”',
          calmScriptSegments: [
            {
              id: 'feel-sting',
              text: '“Oof, getting booted from a chat stings even when kids call it a joke, no wonder your thumb wants to fire back. ',
              tag: 'Validate without mocking',
              note: 'Proves you take digital hurt seriously so {name} keeps coming to you.',
            },
            {
              id: 'ten-min-pause',
              text: 'Let’s set the device down for ten minutes before typing anything that gets screenshotted forever. ',
              tag: 'Teach screenshot permanence',
              note: 'Installs the golden “never text hot” brake without snatching the device in anger.',
            },
            {
              id: 'upgrade-channel',
              text: 'Tomorrow, how about talking to Sam one-on-one or muting the giant thread?”',
              tag: 'Move off noisy stage',
              note: 'Coaches real-world conflict resolution over audience-driven group-chat wars.',
            },
          ],
          deliveryCues: [
            'Turn off “Read Receipts” together, it drops social anxiety immediately!',
            'Teach the “Billboard Rule”: never type in a group chat what you wouldn’t want read aloud in homeroom',
            'Keep group chats small (3–5 close friends) rather than chaotic 25-kid threads',
          ],
          pushbacks: [
            {
              id: 'miss-out',
              label: 'What if {pronoun} worries muting a giant chat means missing everything?',
              setup: 'Remind {obj} that real friends reach out directly, and muting just turns off chime chaos.',
              script: '“Muting doesn’t delete the chat, it just puts YOU in charge of checking once after homework instead of getting buzzed 80 times!”',
            },
            {
              id: 'mean-chat',
              label: 'What if someone is piling on meanly or sharing embarrassing photos?',
              setup: 'Shift straight into adult safety mode: screenshot evidence, leave the thread, and step in calmly.',
              script: '“You did the exact right thing showing me. Nobody deserves pile-ons, let’s save screenshots, exit that chat together, and handle this safely.”',
            },
          ],
          advisorPrompt:
            'My {age} tween is getting stressed by group-chat drama and feeling left on read. How do I teach healthy texting habits and emotional resilience?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Install one group-chat sanity habit together',
          beat4Lead: 'Small settings changes cut tween texting stress in half.',
          moves: [
            {
              id: 'mute-read-receipts',
              title: 'Switch off Read Receipts & mute noisy threads',
              desc: 'Walk through settings together as a team, showing {name} how to control pings instead of letting pings control {obj}.',
            },
            {
              id: 'ten-min-draft',
              title: 'Adopt the “10-Minute Cool Draft” rule',
              desc: 'Agree that angry replies always wait 10 minutes (or go in a Notes draft) before hitting send.',
            },
            {
              id: 'voice-upgrade',
              title: 'Practice the “Tone Check” upgrade',
              desc: 'When a text feels weird or cold, coach {name} to send a quick voice memo or talk in person at school.',
            },
          ],
          closingNote:
            'When your tween learns they can bring awkward group-chat sting straight to your kitchen counter without getting yelled at or shut down, you become their lifelong trusted sounding board.',
          pocketInsight: 'Turn off Read Receipts, mute giant group threads, and never send a heated reply before a 10-minute pause.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 3',
            mystery: 'What single 8:30 PM house ritual protects tween sleep AND secretly gives your kid a socially cool excuse to log off?',
            title: 'The 8:30 PM Central Charging Dock (Neutral House Law)',
            targetSlug: 'tween-central-charging-station-routine',
          },
          interactiveHighlights: ['Group-chat lens & coaching map', '10-minute cool-draft script'],
        },
      },
      {
        slug: 'tween-central-charging-station-routine',
        title: 'The 8:30 PM Central Charging Dock (Neutral House Law)',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: '8:30 PM kitchen dock · Neutral law + social relief shield',
          headline: 'The 8:30 PM Central Charging Dock (Neutral House Law)',
          deck: 'Why bedrooms and phones never mix at age 10–12, and why most tweens secretly breathe a sigh of relief when parents become the “blame shield” at 8:30 PM.',
          sceneTime: '8:30 PM · KITCHEN CHARGING BASKET',
          sceneBody:
            'Every night at 8:30 PM, {poss} friends’ chat starts buzzing wildly, and if the phone sits on {poss} nightstand, even the most conscientious 11-year-old cannot resist peeking “just for one second” at 10:15 PM. *Yet when you install a single central family charging dock in the kitchen, bedtime battles vanish AND {name} gets a face-saving exit from late-night peer pressure.*',
          pollQuestion: 'Where do family devices sleep overnight right now?',
          pollOptions: [
            {
              id: 'bedrooms',
              label: 'Phones or tablets sneak into bedrooms (including mine sometimes!)',
              response:
                'Moving ALL devices, ideally including parent phones!, to one central basket turns a nagging battle into clean, fair house architecture.',
            },
            {
              id: 'kitchen',
              label: 'Already outside bedrooms, though 8:30 PM handoff still brings groans',
              response:
                'Adding a 5-minute warning chime plus a standalone alarm clock and “blame me!” script smooths the handoff fast.',
            },
          ],
          beat2Kicker: 'The 8:30 PM neutral docking sequence',
          beat2Title: 'Let the clock and the basket enforce bedtime, not your voice',
          beat2Lead:
            'Harvard research shows tweens secretly LOVE blaming a strict house dock so they can leave noisy chats without looking uncool. Walk through the 4-beat neutral docking routine below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 8:30 PM neutral charging-dock sequence',
          visualStageHint: 'Tap each beat to make nightly docking effortless',
          visualConfig: {
            steps: [
              {
                timeOrCue: '8:20 PM',
                label: '10-Min Wrap Chime',
                title: 'Gentle automated chime signals “wrap up chats”',
                desc: 'Gives {name} time to send a cool sign-off (“Parents dock my phone at 8:30, catch ya tomorrow!”).',
                why: 'Eliminates abrupt mid-sentence cutoffs that trigger rage.',
              },
              {
                timeOrCue: '8:30 PM',
                label: 'All Devices Dock',
                title: 'Phones, tablets & smartwatches plug into the kitchen basket',
                desc: 'Parents dock right alongside kids whenever possible, making it family culture, not kid jail.',
                why: 'Shared family norms dissolve “that’s unfair!” resentment.',
              },
              {
                timeOrCue: '8:35 PM',
                label: 'Analog Bedroom',
                title: 'Simple $12 alarm clock + paper book or audio player in room',
                desc: 'Removes the #1 excuse (“I need my phone for my morning alarm!”) permanently.',
                why: 'Protects deep sleep and eliminates midnight checking temptation.',
              },
              {
                timeOrCue: '7:00 AM',
                label: 'Morning Check-In',
                title: 'Devices stay docked until breakfast & backpacks are ready',
                desc: 'Starts mornings with human faces and sunlight instead of overnight notification stress.',
                why: 'Keeps school-morning launches calm and on schedule.',
              },
            ],
          },
          almanacTruth:
            'A $12 bedside alarm clock and a central kitchen charging basket do more for tween mental health and sleep than any speech ever written.',
          scienceDeepDive:
            'Pediatric sleep and digital-media cohort studies consistently demonstrate that merely having a smartphone present inside a child’s bedroom, even silenced, cuts nightly sleep duration by 20–45 minutes and increases morning fatigue; external charging docks plus scheduled downtime eliminate willpower drain.',
          beat3Kicker: 'Practice at 8:25 PM',
          beat3Title: 'Hand {name} the “blame my parents” shield cheerfully',
          rehearsalTriggerSpeaker: '{Name} stalling at 8:30 PM as group notifications buzz',
          rehearsalTriggerQuote: '“Wait, five more minutes! Everyone’s still texting and they’ll think I’m ghosting them!”',
          rehearsalPrompt: 'Which reaction creates nightly handoff friction?',
          instincts: [
            {
              id: 'yank',
              label: '“8:30 means 8:30! Give me that phone right now. I don’t care who’s texting!”',
              whyTitle: 'Why that’s so tempting, and why it triggers panic',
              whyText:
                'Ripping a phone away mid-message spikes social panic and turns docking into a hostile arrest.',
            },
            {
              id: 'extend-daily',
              label: '“Okay, just until 8:45, actually 9:00, just stop arguing!”',
              whyTitle: 'Why that’s so tempting, and why the boundary collapses',
              whyText:
                'Sliding deadlines prove that loud protests successfully push bedtime back every night.',
            },
          ],
          calmScriptPlain:
            '“Go ahead and send your sign-off right now, blame us 100%! Type ‘My parents lock phones in the kitchen at 8:30, see you at school!’ Then plug it right beside mine and grab your book.”',
          calmScriptSegments: [
            {
              id: 'sign-off',
              text: '“Go ahead and send your sign-off right now, blame us 100%! ',
              tag: 'Activate the Blame Shield',
              note: 'Gives {name} socially safe cover so stepping off chat never feels awkward.',
            },
            {
              id: 'exact-exit',
              text: 'Type ‘My parents lock phones in the kitchen at 8:30, see you at school!’ ',
              tag: 'Clean peer exit line',
              note: 'Normalizes healthy boundaries among friends, too!',
            },
            {
              id: 'dock-together',
              text: 'Then plug it right beside mine and grab your book.”',
              tag: 'Shared house law',
              note: 'Modeling docking your own device ends fairness debates immediately.',
            },
          ],
          deliveryCues: [
            'Use automated device downtime (Alongside Pact-as-Code) at 8:30 PM so software holds the clock neutrally',
            'Buy a fun retro or glowing bedside alarm clock {name} picks out',
            'Zero sneaking checks, if a phone sneaks upstairs, reset the dock neutrally without lecturing',
          ],
          pushbacks: [
            {
              id: 'music-sleep',
              label: 'What if {pronoun} {sleeps} to white noise or calm playlists?',
              setup: 'Use a cheap offline sound machine, radio, or smart speaker with zero screen!',
              script: '“Let’s set up a dedicated bedside speaker or sound machine, all the cozy audio, zero midnight screen glow.”',
            },
            {
              id: 'parent-work',
              label: 'What if I legitimately need my phone overnight for work or elderly relatives?',
              setup: 'Charge yours across the hall or on a silent emergency-only bypass while keeping kids’ rooms screen-free.',
              script: '“Mine stays in the hallway on emergency-call-only for Grandma, still zero scrolling in bed for any of us!”',
            },
          ],
          advisorPrompt:
            'I want to install an 8:30 PM central charging dock for my {age} tween without nightly battles. How do I roll it out smoothly?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Set up your central charging station tonight',
          beat4Lead: 'Let physical furniture hold the bedtime phone boundary for you.',
          moves: [
            {
              id: 'buy-alarm',
              title: 'Pick out a cool standalone alarm clock together',
              desc: 'Let {name} choose {poss} own bedside alarm clock so “I need my phone to wake up” retires forever.',
            },
            {
              id: 'dock-basket',
              title: 'Create a tidy multi-cord kitchen charging dock',
              desc: 'Plug everyone’s chargers neatly into one shared kitchen/hallway power strip before 8:30 PM.',
            },
            {
              id: 'offer-shield',
              title: 'Explicitly offer the “Blame Us” sign-off',
              desc: 'Tell {name} tonight: “Anytime you’re tired of a group chat, blame our 8:30 dock, we’ll gladly take the heat!”',
            },
          ],
          closingNote:
            'An empty nightstand at 8:30 PM is one of the quietest, kindest acts of love in modern parenting, protecting deep sleep and giving your tween permission to exhale.',
          pocketInsight: 'Plug all devices into a central kitchen dock at 8:30 PM, swap in a $12 alarm clock, and offer your tween the Blame Shield.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 4',
            mystery: 'How do you put ALL your family screen agreements onto one calm, co-signed page that BOTH parents and kids respect?',
            title: 'Co-Signing a Bilateral Family Phone Pact Together',
            targetSlug: 'tween-bilateral-family-pact',
          },
          interactiveHighlights: ['4-beat 8:30 PM docking timeline', 'Blame-shield exit script'],
        },
      },
      {
        slug: 'tween-bilateral-family-pact',
        title: 'Co-Signing a Bilateral Family Phone Pact Together',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Bilateral Family Pact · Both parent and tween sign commitments',
          headline: 'Co-Signing a Bilateral Family Phone Pact Together',
          deck: 'Why one-sided “kid rules” spark sneaky workarounds, and how a two-way Bilateral Family Pact (with parent promises too!) turns screens into a shared trust team.',
          sceneTime: '4:00 PM · SUNDAY KITCHEN TABLE',
          sceneBody:
            'You’ve printed out a strict list of 18 phone rules for {name} to sign. {Pronoun} glances at the page and points right at your pocket: “Wait, YOU check work emails at dinner and scroll while I’m talking! Why do ONLY I have rules?” *Ouch, {pronoun} actually has a brilliant point, and turning that honesty into a two-way pact changes the entire tone of your home.*',
          pollQuestion: 'What changes when parents put their OWN screen promises on the family pact too?',
          pollOptions: [
            {
              id: 'respect',
              label: 'Instant respect, {name} sees fairness instead of hypocrisy!',
              response:
                'Yes! Tweens have laser-sharp radar for hypocrisy; seeing your signature beside {poss} turns resistance into genuine partnership.',
            },
            {
              id: 'neutral',
              label: 'We finally have clear neutral rules everyone agreed to ahead of time',
              response:
                'Exactly, when a rule gets stretched, you point calmly to the co-signed pact instead of improvising heated punishments.',
            },
          ],
          beat2Kicker: 'The bilateral pact loop',
          beat2Title: 'Co-authored rules get respected; imposed rules get hacked',
          beat2Lead:
            'A Bilateral Family Pact includes three promises from your tween, three promises from YOU, and one transparent safety agreement, so device tools act as neutral guardrails, never stealth spyware. Step through the 3-beat loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'Co-building your Bilateral Family Phone Pact',
          visualStageHint: 'Tap each step to turn rules into shared family pride',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Parent goes first',
                label: 'Parent Commitments',
                quote: '“I promise: phones off at dinner, eyes up when you talk, and no secret spying.”',
                desc: 'Leading with YOUR three honest commitments disarms defensiveness immediately.',
                brainNote: 'Fairness activates cooperative trust instead of adolescent rebellion.',
              },
              {
                stepNum: '02',
                actor: '{Name} co-writes terms',
                label: 'Tween Commitments',
                quote: '“8:30 PM dock, homework before play, kind texts, and telling you if anything weird pops up.”',
                desc: 'Let {name} help shape weekend bonus windows and neutral reset steps when slips happen.',
                brainNote: 'Ownership makes tweens far more likely to internalize habits.',
              },
              {
                stepNum: '03',
                actor: 'Sign & review quarterly',
                label: 'Living Agreement',
                quote: 'Both signatures on the fridge + calm 90-day upgrade check-ins',
                desc: 'Pair the signed pact with transparent Alongside device schedules and celebrate earned trust upgrades every quarter.',
                brainNote: 'Frames maturity as earning freedom, never permanent lockdown.',
              },
            ],
          },
          almanacTruth:
            'The fastest way to make a 11-year-old honor a family phone pact is putting your own signature right beneath “No phones at the dinner table” too.',
          scienceDeepDive:
            'Adolescent procedural-justice and media-mediation studies show that collaborative, transparent family technology agreements paired with parental modeling yield significantly higher voluntary adherence and candid problem disclosure than secretive surveillance apps.',
          beat3Kicker: 'Practice at the Sunday table',
          beat3Title: 'Invite your tween as co-architect of the family pact',
          rehearsalTriggerSpeaker: '{Name} eyeing a family phone agreement skeptically',
          rehearsalTriggerQuote: '“Is this just a trap where you spy on all my texts and take my phone whenever you’re mad?”',
          rehearsalPrompt: 'Which answer builds secrecy instead of open partnership?',
          instincts: [
            {
              id: 'i-pay',
              label: '“I pay the phone bill, so I own it and can read anything I want anytime!”',
              whyTitle: 'Why that’s so tempting, and why kids go underground',
              whyText:
                'Power-based ownership speeches push tweens to create burner accounts and hide genuine trouble.',
            },
            {
              id: 'zero-oversight',
              label: '“No no, total privacy. I’ll never look at anything or use any downtime settings!”',
              whyTitle: 'Why that’s so tempting, and why it leaves tweens exposed',
              whyText:
                'Eleven-year-olds still need transparent training-wheels oversight, just open and respectful, never sneaky.',
            },
          ],
          calmScriptPlain:
            '“Zero sneaky spying, ever. This pact goes BOTH ways: I’m signing off on no work emails at dinner and docking my phone too. We’ll use our neutral 8:30 bedtime schedule together, do quick open check-ins side-by-side while you’re learning, and review every three months so you unlock more independence as you show steady habits.”',
          calmScriptSegments: [
            {
              id: 'no-spying',
              text: '“Zero sneaky spying, ever. This pact goes BOTH ways: I’m signing off on no work emails at dinner and docking my phone too. ',
              tag: 'Radical mutual fairness',
              note: 'Instantly dissolves suspicion by holding yourself to visible standards.',
            },
            {
              id: 'transparent-guardrails',
              text: 'We’ll use our neutral 8:30 bedtime schedule together, do quick open check-ins side-by-side while you’re learning, ',
              tag: 'Mentoring over surveillance',
              note: 'Keeps safety guardrails transparent and collaborative.',
            },
            {
              id: 'earned-growth',
              text: 'and review every three months so you unlock more independence as you show steady habits.”',
              tag: 'Clear path to autonomy',
              note: 'Motivates genuine trustworthiness because growth actually earns freedom.',
            },
          ],
          deliveryCues: [
            'Print or display the signed pact visibly, or build and sign it inside Alongside’s Bilateral Family Pact Wizard!',
            'Include a “Safe Harbor Clause”: telling you about weird/scary online stuff NEVER gets the phone confiscated',
            'Keep the tone celebratory, like signing a team charter over hot chocolate',
          ],
          pushbacks: [
            {
              id: 'parent-breaks',
              label: 'What if {name} catches ME scrolling at dinner after signing?',
              setup: 'Smile, own it instantly, and put your phone in the basket, pure gold!',
              script: '“Busted! Good catch, thank you for holding our family pact. Into the dock it goes!”',
            },
            {
              id: 'tween-breaks',
              label: 'What happens the first time {name} breaks a pact clause?',
              setup: 'Skip explosive speeches, point calmly to the pre-agreed reset step.',
              script: '“Looks like the pact got stretched tonight, no yelling. We’ll run our agreed 24-hour reset and try fresh tomorrow.”',
            },
          ],
          advisorPrompt:
            'We’re ready to create a Bilateral Family Phone Pact with our {age} tween. What fair parent and child clauses should we include so both sides respect it?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Launch your Bilateral Family Pact this weekend',
          beat4Lead: 'Turn screen friction into a proud two-way team charter.',
          moves: [
            {
              id: 'write-parent-3',
              title: 'Draft YOUR 3 parent promises first',
              desc: 'Pick three honest habits (e.g., phone off at meals, eyes up during stories, zero stealth checks) before inviting {name} to the table.',
            },
            {
              id: 'safe-harbor',
              title: 'Add the “Safe Harbor” disclosure clause',
              desc: 'Promise in writing that if {name} ever sees something unsettling or makes a digital mistake and comes to you honestly, you help fix it, never confiscate in anger.',
            },
            {
              id: 'open-pact-wizard',
              title: 'Co-sign inside Alongside’s Family Pact Wizard',
              desc: 'Sit side-by-side for 15 minutes, pick your exact clauses together, sign digitally, and set a 90-day review date.',
            },
          ],
          closingNote:
            'Signing your name right beneath your tween’s on a Bilateral Family Pact sends a message louder than any filter: we are on the same team, protecting our attention and our relationship together.',
          pocketInsight: 'Put your own 3 parent screen promises on the pact first, include a Safe Harbor clause, and review earned autonomy every 90 days.',
          nextEpisodeHook: null,
          interactiveHighlights: ['3-step bilateral pact loop', 'Mutual-fairness signing script'],
        },
      },
    ],
  }),
];
