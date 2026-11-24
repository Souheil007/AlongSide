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

export const TIER_0A_INFANCY_MODULES: AcademyModuleSeedData[] = [
  // ===========================================================================
  // COURSE 1: Calming Infant Crying & Reading Early Cues (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'behavior-infant-coregulation',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    title: 'Calming Infant Crying & Reading Early Cues',
    reliefSubtitle:
      'Soothe evening crying storms, catch sleepy cues early, and turn tiny daily moments into brain-building connection',
    tonightQuickWinTitle: 'Episode 1: When {Name} Won’t Stop Crying at 6 PM',
    summary:
      'Understand why newborn and infant nervous systems overload by evening, practice steady body-first soothing, read early wake-window signals, and master serve-and-return connection.',
    coverImageUrl: 'https://assets.alongside.care/academy/behavior-infant.png',
    sortOrder: 1,
    episodes: [
      {
        slug: 'infant-somatic-soothing-sequence',
        title: 'When {Name} Won’t Stop Crying at 6 PM',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: '6:15 PM · Borrowing your steady heartbeat',
          headline: 'When {Name} Won’t Stop Crying at 6 PM',
          deck: 'And the quiet body-first sequence that calms an overloaded infant nervous system, without bouncing frantically around the kitchen.',
          sceneTime: '6:15 PM · THE WITCHING HOUR',
          sceneBody:
            'Diaper is clean. Belly is full. You have burped, rocked, and changed onesies, yet {name} arches back with clenched tiny fists and wails louder. *Your own heart starts racing and a tight voice whispers: “Why can’t I soothe my own baby?”*',
          pollQuestion: 'Does late-day crying hit hardest in your house?',
          pollOptions: [
            {
              id: 'daily',
              label: 'Almost every evening',
              response:
                'You did not miss a secret manual. Late-afternoon crying peaks for almost every baby under four months because their brain has spent all day soaking up light, voices, and gravity with zero filter yet.',
            },
            {
              id: 'sometimes',
              label: 'A few nights a week',
              response:
                'Those unpredictable spikes are classic sensory overload, and having one calm sequence ready keeps you grounded when they roll in.',
            },
            {
              id: 'ahead',
              label: 'Just preparing ahead',
              response:
                'Knowing what evening crying actually means before your first rough 6 PM saves hours of panic and self-blame.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mind',
          beat2Title: 'An infant borrows your calm before learning their own',
          beat2Lead:
            'In the first months of life, the calming brakes in the upper brain have not wired up yet. Toggle below to see why frantic rocking keeps the alarm ringing, while slow, steady breath drops it.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Infant alarm vs. borrowed calm',
          visualStageHint: 'Toggle settled vs. evening overload',
          visualConfig: {
            calmToggleLabel: 'Steady chest-to-chest breath',
            stormToggleLabel: '6 PM sensory overload',
            calmStatus: 'VAGAL ANCHOR ENGAGED',
            stormStatus: 'SENSORY OVERLOAD · BORROW CALM',
            calmReadouts: [
              {
                name: 'Parent Breath Rhythm',
                value: '6 breaths / min',
                tone: 'spruce',
                desc: 'Slow exhales against your sternum give {name} an external metronome {poss} nervous system can copy.',
              },
              {
                name: 'Sensory Input Load',
                value: 'Dim & hushed',
                tone: 'spruce',
                desc: 'Lowering overhead lights and switching to steady brown noise turns off extra alarms immediately.',
              },
            ],
            stormReadouts: [
              {
                name: 'Infant Alarm Center',
                value: 'Full volume',
                tone: 'amber',
                desc: 'Hours of sights, faces, and noises stack up with no adult sensory filter to mute them.',
              },
              {
                name: 'Internal Self-Soothing',
                value: 'Still wiring',
                tone: 'amber',
                desc: 'Under 6 months, {name} physically cannot calm {poss} own heart rate alone, {pronoun} borrows yours first.',
              },
            ],
          },
          almanacTruth:
            'A crying baby is not rejecting your comfort, their nervous system is offloading a full day of sensory noise and looking for your slow heartbeat to match.',
          scienceDeepDive:
            'During early infancy, the prefrontal cortex and anterior cingulate have minimal myelination, leaving autonomic regulation governed by the brainstem and amygdala. Firm ventral chest contact paired with slow parental exhalations (around 6 breaths per minute) stimulates the infant vagus nerve via thermal, vestibular, and acoustic neuroception.',
          beat3Kicker: 'Practice before 6:00 PM',
          beat3Title: 'What changes the room in thirty seconds',
          rehearsalTriggerSpeaker: '{Name} wailing, face flushed red',
          rehearsalTriggerQuote:
            '“Nothing is working, every time I switch positions {pronoun} screams even harder!”',
          rehearsalPrompt:
            'Which split-second reaction feels closest to your honest instinct?',
          instincts: [
            {
              id: 'rapid',
              label:
                'Switch holds every 10 seconds, jiggle faster, and talk rapidly: “Shh shh shh, you’re okay, stop crying!”',
              whyTitle: 'Why that’s so tempting, and what {poss} body feels',
              whyText:
                'Urgency makes every loving parent move faster. Yet rapid position changes and tense, clipped shushing add brand-new sensory jolts to an already flooded nervous system.',
            },
            {
              id: 'blame',
              label:
                'Panic internally: “Something must be wrong with my milk or my hold. I’m failing {obj}.”',
              whyTitle: 'Why that’s so tempting, and what {poss} body feels',
              whyText:
                'Self-doubt tightens your shoulders and quickens your pulse. Infants detect chest tension and rapid breathing within seconds, reading your stress as confirmation that the room feels unsafe.',
            },
          ],
          calmScriptPlain:
            '“Your little body feels so loud right now. My arms are steady, my breath is slow, and I’ve got you.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'loud',
              text: 'Your little body feels so loud right now.',
              tag: 'Names Overload',
              note: 'Reminds your own brain this is sensory static, not rejection or failure, dropping your shoulders immediately.',
            },
            { text: ' ' },
            {
              id: 'arms',
              text: 'My arms are steady, my breath is slow,',
              tag: 'Slows Your Pulse',
              note: 'Speaking slowly forces a longer exhale, dropping your heart rate so {possessive} chest matches yours.',
            },
            { text: ' ' },
            {
              id: 'gotyou',
              text: 'and I’ve got you.',
              tag: 'Warm Resonance',
              note: 'Low-pitched vowel hums travel through your ribcage directly into {poss} inner ear like the womb.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Dim lights & kill TV noise',
            'Drop shoulders 2 inches',
            'Hold one steady rhythm for 3 full minutes',
          ],
          pushbacks: [
            {
              id: 'stillwailing',
              label: '“{Pronoun} {is} still crying after 5 minutes”',
              setup:
                'Switch environments smoothly once, step into a dim bathroom with warm running water or onto the porch for cool evening air:',
              script:
                '“(Low steady hum on the exhale) Mmmm… cool air, steady arms. Take all the time you need. I am right here.”',
            },
            {
              id: 'overwhelmed',
              label: '“My own nerves are completely fried”',
              setup:
                'Protecting your calm protects {name}. Placing a safe baby down for two minutes is responsible parenting:',
              script:
                '“You are safe on your back in your crib for two minutes while I drink cold water and breathe. I’m coming right back steady.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) has been crying inconsolably every evening around 6 PM even after feeding and burping, can you walk me through a calm 10-minute reset?”',
          beat4Kicker: 'Tonight’s small experiment',
          beat4Title: 'Pick one steady anchor for the next crying peak',
          beat4Lead:
            'Your choice drops straight into your Pocket Card below so you don’t have to think at 6:15 PM.',
          moves: [
            {
              id: 'darkreset',
              title: 'Run the 30-second sensory dim-down first',
              desc: 'Cut overhead lights, silence screens, and turn on steady low brown noise before trying another hold.',
            },
            {
              id: 'sixbreaths',
              title: 'Commit to 6 slow chest breaths before switching holds',
              desc: 'Sit down with feet flat, hold {name} high on your sternum, and breathe out longer than you breathe in.',
            },
            {
              id: 'tapout',
              title: 'Agree on a guilt-free 15-minute partner tap-out',
              desc: 'Set a neutral code word now so either caregiver can hand off before frustration spikes.',
            },
          ],
          closingNote:
            'A quiet baby isn’t the only proof you are doing a good job, a steady, warm pair of arms while a small nervous system unwinds is the whole medicine.',
          pocketInsight:
            'When evening crying spikes, stop switching holds. Dim the room, drop your shoulders, and give {name} three minutes of slow chest breathing to borrow.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Wait, why does crying mysteriously peak around week six even when nothing is wrong?”',
            title: 'Why Week-6 Evening Crying Isn’t Your Fault',
            targetSlug: 'purple-crying-neurobiology',
          },
          interactiveHighlights: ['Brain-Bridge Visual', 'Annotated Script'],
        },
      },
      {
        slug: 'purple-crying-neurobiology',
        title: 'Why Week-6 Evening Crying Isn’t Your Fault',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Weeks 2–14 · The predictable newborn curve',
          headline: 'Why Week-6 Evening Crying Isn’t Your Fault',
          deck: 'Why crying peaks around six weeks in healthy babies worldwide, and how to protect your confidence when relatives start guessing.',
          sceneTime: '8:10 PM · LIVING ROOM RUG',
          sceneBody:
            'You are swaying with {name} for the third evening straight when a relative texts: *“Are you sure you’re feeding enough? Maybe you’re holding {obj} too much.”* The comment stings straight through your exhaustion.',
          pollQuestion: 'Have outside comments made normal baby crying feel personal?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes, everyone has a theory',
              response:
                'Every generation forgets how loud weeks 4 to 8 really are. Seeing the universal biological curve takes the guilt right off your back.',
            },
            {
              id: 'mostlyme',
              label: 'Mostly my own inner critic',
              response:
                'When you love a tiny human this fiercely, it feels natural to blame yourself. Understanding this predictable phase lets you breathe again.',
            },
          ],
          beat2Kicker: 'The brain decoder',
          beat2Title: 'Flip the lens on the newborn crying curve',
          beat2Lead:
            'Across every culture and feeding method, infant crying rises around week 2, peaks near week 6 to 8, and naturally softens by months 3 to 4. Toggle the lens and tap through the weeks below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Worry lens vs. newborn brain lens',
          visualStageHint: 'Flip lenses, then tap week milestones below',
          visualConfig: {
            adultLabel: 'Exhausted worry lens',
            adultQuote: '“Something I’m doing must be wrong, otherwise {name} would stop.”',
            adultSub:
              'When crying resists soothing, our tired brain scrambles to blame our milk, our hold, or our patience.',
            childLabel: 'Newborn growth lens',
            childQuote: '“My sensory brain is upgrading overnight and releasing steam.”',
            childSub:
              'Pediatricians call this the Period of PURPLE Crying: Peak, Unexpected, Resists soothing, Pain-like face, Long-lasting, Evening.',
            exposureHeading: 'The 16-week settling curve',
            exposureSub: 'Tap any week from 1 to 16',
            totalDots: 16,
            defaultCount: 6,
            unitLabel: 'week',
            lowMax: 4,
            midMax: 10,
            lowMsg:
              'Weeks 1–4: Womb sleepiness wears off and sensory wiring ramps up, evening fussiness starts climbing.',
            midMsg:
              'Weeks 5–10: The natural biological peak. Resistant crying here is normal brain growth, not spoiled habits or poor care.',
            highMsg:
              'Weeks 11–16: Circadian melatonin and visual filtering come online, evening storms reliably begin fading.',
          },
          almanacTruth:
            'You cannot spoil a newborn by holding them through tears. Responsive comfort during peak crying weeks wires long-term stress resilience, not dependency.',
          scienceDeepDive:
            'Epidemiological crying studies documented by Dr. Ronald Barr show a universal n-shaped crying curve peaking near 6 weeks across cultures regardless of carrying style or feeding method. Rapid synaptogenesis in sensory cortices outpaces thalamic filtering until pineal melatonin secretion matures around 12–16 weeks.',
          beat3Kicker: 'Protecting your peace',
          beat3Title: 'What to say to your inner critic (and helpful relatives)',
          rehearsalTriggerSpeaker: 'A well-meaning relative on speakerphone',
          rehearsalTriggerQuote:
            '“You’re going to spoil {obj} holding {obj} every time {pronoun} fusses!”',
          rehearsalPrompt:
            'Which automatic reaction drains your energy fastest?',
          instincts: [
            {
              id: 'defend',
              label:
                'Spend 20 minutes anxiously defending your feeding log and sleep schedule.',
              whyTitle: 'Why that’s so tempting, and what happens next',
              whyText:
                'When you are sleep-deprived, arguing for approval spikes your cortisol, right when you need calm energy for {name}.',
            },
            {
              id: 'doubt',
              label:
                'Put {name} down crying alone to prove you aren’t “creating bad habits.”',
              whyTitle: 'Why that’s so tempting, and what happens next',
              whyText:
                'Young infants have zero cognitive capacity to manipulate. Leaving a flooded newborn unsupported only raises distress for both of you.',
            },
          ],
          calmScriptPlain:
            '“Pediatric science shows weeks 6 to 8 are just a loud brain-growth peak. You can’t spoil a newborn, right now holding {obj} is our exact job.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'peak',
              text: 'Pediatric science shows weeks 6 to 8 are just a loud brain-growth peak.',
              tag: 'Reframes Biology',
              note: 'Moves the conversation away from your parenting and onto predictable infant development.',
            },
            { text: ' ' },
            {
              id: 'spoil',
              text: 'You can’t spoil a newborn, right now holding {obj} is our exact job.',
              tag: 'Warm Boundary',
              note: 'Calm, confident, and brief, leaves no opening for guilt-tripping.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Short, warm boundary with relatives',
            'Skin-to-skin resets both pulses',
            'Step away 2 minutes if nerves spike',
          ],
          pushbacks: [
            {
              id: 'unsoothable',
              label: '“Nothing stops the tears tonight”',
              setup: 'Shift your goal from “turn off sound” to “offer steady presence”:',
              script:
                '“My job tonight isn’t to magically mute every tear, it’s to be the warm harbor while {poss} brain rides this wave.”',
            },
            {
              id: 'worryhealth',
              label: '“How do I know if something actually hurts?”',
              setup:
                'Trust your parental gut, if crying sounds unusual, feeding drops, or you feel uneasy, reach out promptly:',
              script:
                '“Normal evening peaks settle into normal feeds and calm periods between waves; whenever something feels off, a quick call to our pediatrician gives real peace of mind.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is right in the peak evening crying weeks and I’m exhausted, what low-effort ways can my partner and I survive 5 PM to 9 PM?”',
          beat4Kicker: 'This week’s calm shield',
          beat4Title: 'Pick one safeguard for peak crying evenings',
          beat4Lead:
            'Planning this while the house is quiet makes 7:30 PM dramatically lighter.',
          moves: [
            {
              id: 'skin2skin',
              title: 'Try 15 minutes of bare-chest skin-to-skin before dusk',
              desc: 'Undress {name} to a diaper against your chest under a light blanket, shared warmth steadies heart rate and breathing.',
            },
            {
              id: 'headphones',
              title: 'Keep soft acoustic headphones within arm’s reach',
              desc: 'Lowering the decibel edge while holding {name} lovingly keeps your nervous system steady so {pronoun} feels safe.',
            },
            {
              id: 'scriptrel',
              title: 'Use one calm sentence to close unsolicited advice',
              desc: '“Thanks for caring, our pediatrician walked us through this peak phase, so we’re keeping evenings quiet.”',
            },
          ],
          closingNote:
            'This loud chapter has a built-in expiration date. Every evening you stay warm and steady beside {name}, you are building the quiet confidence {pronoun} will carry long after week twelve.',
          pocketInsight:
            'Week 6–8 crying peaks are a universal newborn brain milestone, not parental failure. Comfort cannot spoil a baby.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“Why does a bright-eyed, wide-awake baby suddenly erupt into screaming ten minutes later?”',
            title: 'Catching Sleepy Cues Before the Overtired Spiral',
            targetSlug: 'infant-wake-windows-and-sleep-pressure',
          },
          interactiveHighlights: ['16-Week Curve', 'Relative Boundary Script'],
        },
      },
      {
        slug: 'infant-wake-windows-and-sleep-pressure',
        title: 'Catching Sleepy Cues Before the Overtired Spiral',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Early sleepy cues · Catching the calm tide',
          headline: 'Catching Sleepy Cues Before the Overtired Spiral',
          deck: 'Why wide, glassy eyes are often a hidden exhaustion signal, and how starting wind-down 10 minutes earlier cuts nap battles in half.',
          sceneTime: '2:10 PM · LIVING ROOM PLAYMAT',
          sceneBody:
            'Twenty minutes ago {name} was cooing at a rattle, so you decided to squeeze in one more errand. Suddenly {poss} gaze turns glassy, {poss} back arches like a bow, and getting {obj} to sleep takes an hour of tears. *Wait, didn’t {pronoun} look wide awake five minutes ago?*',
          pollQuestion: 'Do naps often tip straight from “happy” into “overtired”?',
          pollOptions: [
            {
              id: 'sudden',
              label: 'Yes, it flips in five minutes flat',
              response:
                'That sudden flip is real biology: once an infant passes their wake window, adrenaline kicks in to keep them going, disguising tiredness as “second wind” alertness.',
            },
            {
              id: 'latecues',
              label: 'I usually wait for yawns or eye rubs',
              response:
                'Most parents do! Surprisingly, yawning and crying are late cues, learning the three quieter early cues changes the whole day.',
            },
          ],
          beat2Kicker: 'The rhythm reset',
          beat2Title: 'Spot the calm sleep window before adrenaline hits',
          beat2Lead:
            'An infant brain burns energy fast, building sleep pressure in under two hours. Tap each point on the curve below to see the exact difference between the sweet spot and the overtired spike.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'Infant wake-window & sleep-pressure curve',
          visualStageHint: 'Tap each stage across a single wake window',
          visualConfig: {
            stages: [
              {
                time: '0–35 min',
                label: 'Fresh Wake',
                level: 25,
                title: 'Bright curiosity & easy feeding',
                desc: 'Sleep pressure is low after a nap, this is prime time for feeds, tummy time, and playful eye contact.',
                tip: 'Expose {name} to natural daylight near a window right after waking.',
              },
              {
                time: '45–75 min',
                label: 'Early Cues',
                level: 68,
                title: 'The golden green-light window',
                desc: 'Look for the quiet trio: looking away from your face, slower kicking, and faint pinkness above the eyebrows.',
                tip: 'Start your 4-minute quiet wind-down right here, before a single tear falls.',
              },
              {
                time: '85–105 min',
                label: 'Late Cues',
                level: 88,
                title: 'Yawning, eye-rubbing & fussing',
                desc: 'Sleep pressure is peaking. Transition immediately to a dim room, skip extra errands or new toys.',
                tip: 'Keep stimulation minimal; zip the sleep sack and sway slowly.',
              },
              {
                time: '110+ min',
                label: 'Cortisol Spike',
                level: 98,
                title: 'The overtired “wired” second wind',
                desc: 'Glassy staring and frantic kicking mean stress hormones stepped in to fight fatigue, making sleep feel hard.',
                tip: 'No guilt, use dark-room chest breathing first to let adrenaline settle.',
              },
            ],
          },
          almanacTruth:
            'In infancy, wide glassy eyes often mean “too tired” rather than “not tired yet.” Starting wind-down ten minutes earlier prevents the adrenaline second wind.',
          scienceDeepDive:
            'Homeostatic sleep pressure is driven by rapid adenosine accumulation in the infant basal forebrain. When wakefulness overshoots developmental tolerance (roughly 45–60 min at 0–2m, 60–90 min at 3–4m, 2–2.5 hrs at 6–8m), the HPA axis releases cortisol and epinephrine, directly opposing sleep onset and fragmenting night cycles.',
          beat3Kicker: 'Reframing sleep myths',
          beat3Title: 'What helps when everyone thinks {name} “isn’t tired yet”',
          rehearsalTriggerSpeaker: 'Afternoon visit with family',
          rehearsalTriggerQuote:
            '“Keep {obj} up a little longer, skipping this nap will help {obj} sleep all night!”',
          rehearsalPrompt:
            'Which tempting thought pulls you off your rhythm?',
          instincts: [
            {
              id: 'push',
              label: '“Maybe they’re right, let’s stretch {obj} another 45 minutes so bedtime is easier.”',
              whyTitle: 'Why that’s so tempting, and what actually happens',
              whyText:
                'It sounds totally logical for adults, but baby sleep works in reverse: an overtired infant enters bedtime flooded with cortisol and wakes every 45 minutes.',
            },
            {
              id: 'stay',
              label: 'Keep stimulating {obj} with bright toys to stop early fussing.',
              whyTitle: 'Why that’s so tempting, and what actually happens',
              whyText:
                'Novel toys temporarily distract {name} with a tiny burst of adrenaline, masking the gentle sleepy window until a full meltdown lands.',
            },
          ],
          calmScriptPlain:
            '“{Possessive} eyes are zoning out and {poss} eyebrows just turned pink, that’s {poss} early sleepy cue. We’re slipping into a quiet nap before the overtired wave hits.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'cues',
              text: '{Possessive} eyes are zoning out and {poss} eyebrows just turned pink',
              tag: 'Reads Subtle Cues',
              note: 'Names concrete body signals instead of waiting for tears, and quietly teaches co-parents what to look for too.',
            },
            { text: ', that’s {poss} early sleepy cue. ' },
            {
              id: 'slip',
              text: 'We’re slipping into a quiet nap before the overtired wave hits.',
              tag: 'Protects Rhythm',
              note: 'Treats rest as calm, predictable care rather than waiting for a crisis.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Watch gaze aversion & pink brows',
            '4-minute identical wind-down',
            'Day sleep protects night sleep',
          ],
          pushbacks: [
            {
              id: 'shortnap',
              label: '“{Pronoun} woke up after just 30 minutes”',
              setup:
                'Short single-cycle naps are completely normal under 6 months, just reset the next wake window gently:',
              script:
                '“One 30-minute catnap still cleared some sleep pressure. We’ll keep this wake stretch a touch shorter and catch the next early cue.”',
            },
            {
              id: 'onthego',
              label: '“We’re out running errands when cues hit”',
              setup:
                'A dim carrier or shaded stroller nap beats pushing through to home overtired:',
              script:
                '“Let’s pop {name} into the carrier facing my chest with a soft rhythm walk so {pronoun} can drift off right on time.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) keeps fighting afternoon naps and waking frequently at night, what wake windows should we watch for at this exact age?”',
          beat4Kicker: 'Tomorrow’s rhythm experiment',
          beat4Title: 'Pick one early-cue habit to try tomorrow',
          beat4Lead:
            'One small shift in timing turns 45 minutes of bouncing into a peaceful 5-minute settle.',
          moves: [
            {
              id: 'trio',
              title: 'Spot the 3 quiet sleepy cues before yawning',
              desc: 'Look for gazing off into space, slower arm/leg kicks, and faint pinkness along the eyebrow ridge.',
            },
            {
              id: 'fourmin',
              title: 'Install one identical 4-minute nap wind-down',
              desc: 'Curtains closed, steady white noise, sleep sack zipped, and one slow hummed verse, same order every time.',
            },
            {
              id: 'tenmin',
              title: 'Start heading to the crib 10 minutes earlier once tomorrow',
              desc: 'Notice how much softer {possessive} body settles when you beat the cortisol surge.',
            },
          ],
          closingNote:
            'You don’t need a rigid military clock, just an eye for the gentle turn of the tide. Catching even one early sleepy window tomorrow gives both you and {name} a noticeably calmer afternoon.',
          pocketInsight:
            'Day sleep protects night sleep. Catch early cues (gaze-away, slower kicking, pink brows) 10 minutes before yawning starts.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery:
              '“What happens inside {possessive} brain during a five-second pause on the changing table?”',
            title: 'How Tiny Everyday Back-and-Forth Builds {Possessive} Brain',
            targetSlug: 'serve-and-return-neural-architecture',
          },
          interactiveHighlights: ['Wake-Window Curve', '3 Early Sleepy Cues'],
        },
      },
      {
        slug: 'serve-and-return-neural-architecture',
        title: 'How Tiny Everyday Back-and-Forth Builds {Possessive} Brain',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Diaper table · A tiny game of vocal tennis',
          headline: 'How Tiny Everyday Back-and-Forth Builds {Possessive} Brain',
          deck: 'Why five seconds of warm waiting after a baby’s coo builds more neural architecture than any flashcard or “smart” toy.',
          sceneTime: '9:20 AM · THE CHANGING TABLE',
          sceneBody:
            'Halfway through a diaper change, {name} locks onto your eyes, kicks both heels, and lets out a bright *“gaaaa!”* You smile back, echo *“Gaaaa! Good morning!”*, and pause. Four quiet seconds later, {poss} whole face lights up and {pronoun} answers you back.',
          pollQuestion: 'Do you ever wonder if you’re doing “enough” to stimulate {possessive} brain?',
          pollOptions: [
            {
              id: 'worry',
              label: 'Yes, I see so many baby-activity lists online',
              response:
                'Take a huge sigh of relief: Harvard brain researchers found that your responsive face during ordinary diaper changes and feeds is the highest-powered brain builder on earth.',
            },
            {
              id: 'loveit',
              label: 'We already love chatting back and forth',
              response:
                'You are already doing the gold-standard work! Adding one intentional 5-second pause lets {possessive} brain complete even more conversational loops.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mind',
          beat2Title: 'Serve, pause five seconds, return',
          beat2Lead:
            'Think of early brain wiring like a slow game of tennis. Step through the 3 beats below to see why the silent 5-second pause is where the magic happens.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat Serve-and-Return brain loop',
          visualStageHint: 'Tap each beat to watch neural pathways fire',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: '{Name} serves',
                label: 'The Serve',
                quote: '“Gaaaa!” · A gaze, kick, reach, or wide-eyed coo',
                desc: '{Name} sends out a tiny social bid checking: “Are you here with me? Does my voice move the world?”',
                brainNote: 'Auditory and social-orientation circuits light up awaiting feedback.',
              },
              {
                stepNum: '02',
                actor: 'You echo warmly',
                label: 'The Return',
                quote: '“Gaaaa! You noticed the sunshine on the wall!”',
                desc: 'Within 10–14 inches of {poss} face, your crinkled eyes and echoed sound tell {poss} brain: “I see you and you matter.”',
                brainNote: 'Mirror-neuron and language-mapping pathways fire together and strengthen.',
              },
              {
                stepNum: '03',
                actor: 'The golden silence',
                label: 'The 5-Second Pause',
                quote: '(Warm smile… silently count 1… 2… 3… 4… 5)',
                desc: 'Infant motor planning is slow. Waiting five full quiet seconds gives {name} room to organize {poss} next sound back to you.',
                brainNote: 'Builds turn-taking, early vocabulary, and secure emotional agency.',
              },
            ],
          },
          almanacTruth:
            'The greatest early-learning toy ever invented is a warm, responsive human face waiting five quiet seconds for a baby’s turn.',
          scienceDeepDive:
            'Harvard’s Center on the Developing Child identifies reciprocal serve-and-return interactions as the primary driver of experience-dependent synaptogenesis in the superior temporal sulcus and prefrontal social circuits. Waiting 4–5 seconds matches infant motor-planning latency and strongly predicts expressive vocabulary at 24 months.',
          beat3Kicker: 'Everyday moments that count',
          beat3Title: 'Making ordinary care routines feel effortless and rich',
          rehearsalTriggerSpeaker: 'Scrolling past elaborate sensory-play reels',
          rehearsalTriggerQuote:
            '“Should I be drilling contrast flashcards and baby sign charts every afternoon?”',
          rehearsalPrompt: 'Which pressure creeps in most during quiet days at home?',
          instincts: [
            {
              id: 'overstim',
              label:
                'Talk nonstop and wave three rattling toys in front of {name} so {pronoun} never gets bored.',
              whyTitle: 'Why that’s so tempting, and what {poss} brain experiences',
              whyText:
                'Constant narration comes from deep love, yet leaving zero silent gaps gives {name} no space to serve {poss} own sounds, and can quietly trigger sensory fatigue.',
            },
            {
              id: 'silent',
              label:
                'Assume {pronoun} can’t understand words yet, so breeze through changes quietly while checking messages.',
              whyTitle: 'Why that’s so tempting, and what {poss} brain experiences',
              whyText:
                'Of course you have real messages to answer! Just reclaiming two tiny daily moments, like morning diaper changes, turns routine chores into peak brain nourishment.',
            },
          ],
          calmScriptPlain:
            '“Oh, I heard that big ‘ba-ba’! (Warm smile… wait 5 seconds) Yes, tell me more about that ceiling fan!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'echo',
              text: 'Oh, I heard that big ‘ba-ba’!',
              tag: 'Mirrors Sound',
              note: 'Repeating {possessive} exact sound teaches cause-and-effect: “My voice makes things happen.”',
            },
            { text: ' ' },
            {
              id: 'wait',
              text: '(Warm smile… wait 5 seconds)',
              tag: 'Motor Space',
              note: 'Five seconds feels long to an adult, but it’s the exact runway a baby needs to move lips and tongue for a reply.',
            },
            { text: ' ' },
            {
              id: 'narrate',
              text: 'Yes, tell me more about that ceiling fan!',
              tag: 'Follows Gaze',
              note: 'Labeling whatever {name} is already staring at wires language twice as fast as redirecting attention.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Face 10–14 inches away',
            'Wait 5 quiet seconds after speaking',
            'Follow whatever {pronoun} looks at',
          ],
          pushbacks: [
            {
              id: 'looksaway',
              label: '“{Name} turns {poss} head away from me”',
              setup:
                'Looking away isn’t rejection, it’s how babies say “my brain needs a 10-second breather”:',
              script:
                '“(Soft pause, stay still and quiet) You’re taking a little break. I’m right here whenever you look back.”',
            },
            {
              id: 'tired',
              label: '“I’m too exhausted to feel bubbly today”',
              setup:
                'Low-energy, gentle presence works just as powerfully as high-energy singing:',
              script:
                '“Quiet eye contact, one slow smile, and naming the window tree still fills {possessive} whole cup.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is making lots of new coos and kicks, what simple 2-minute back-and-forth games fit this exact month?”',
          beat4Kicker: 'Today’s effortless bond builder',
          beat4Title: 'Pick one tiny routine to make phone-free today',
          beat4Lead:
            'No extra schedule slots needed, just attach serve-and-return to something you already do six times a day.',
          moves: [
            {
              id: 'diaperchat',
              title: 'Make one diaper change a 2-minute “vocal tennis” chat',
              desc: 'Leave your phone face-down across the room, echo one coo, and count slowly to five with a warm smile.',
            },
            {
              id: 'followgaze',
              title: 'Name whatever {name} stares at first',
              desc: 'Whether it’s a shadow, a spoon, or a dog outside, narrate {poss} curiosity instead of switching toys.',
            },
            {
              id: 'respectbreak',
              title: 'Honor gaze-aways as mini brain rests',
              desc: 'When {name} looks off to the side, pause silently until {pronoun} glances back ready for round two.',
            },
          ],
          closingNote:
            'You never need an expensive toy subscription to give {name} an extraordinary start. Two unhurried minutes of meeting {poss} eyes and waiting for {poss} reply is the deepest architecture of human love and language.',
          pocketInsight:
            'Echo {possessive} sound, smile warmly 12 inches away, and wait five full seconds for {poss} turn, that pause builds language and trust.',
          nextEpisodeHook: null,
          interactiveHighlights: ['3-Beat Connection Loop', '5-Second Wait Rule'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 2: Infant Sleep Rhythms & Restful Nights (3 Episodes: 1 Cut, 1 Reframed Non-Clinical)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'health-infant-sleep-foundations',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    title: 'Infant Sleep Rhythms & Restful Nights',
    reliefSubtitle:
      'Set up a calm safe sleep space, decode the 4-month sleep shift, and prepare gentle sick-night comfort habits',
    tonightQuickWinTitle: 'Episode 1: Setting Up a Calm, Safe Nighttime Sleep Space',
    summary:
      'Build predictable day-night light cues and a clear safe crib environment, understand the permanent 4-month sleep-cycle upgrade, and keep practical non-clinical sick-night comfort plans ready.',
    coverImageUrl: 'https://assets.alongside.care/academy/health-infant.png',
    sortOrder: 1,
    episodes: [
      {
        slug: 'infant-safe-sleep-and-circadian-reset',
        title: 'Setting Up a Calm, Safe Nighttime Sleep Space',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Daylight at 8 AM · Warm dimness at 7 PM',
          headline: 'Setting Up a Calm, Safe Nighttime Sleep Space',
          deck: 'How morning light, a clear safe crib, and a gentle 4-minute settling cue teach {possessive} body clock the difference between day and night.',
          sceneTime: '2:40 AM · WIDE-AWAKE PARTY',
          sceneBody:
            'It is nearly three in the morning and {name} is kicking happily, blinking up at the ceiling as if it were noon, while all afternoon {pronoun} slept peacefully through vacuum cleaners. *Your body aches for a three-hour stretch of dark, quiet sleep.*',
          pollQuestion: 'How do nights feel right now with {name}?',
          pollOptions: [
            {
              id: 'mixedup',
              label: 'Days and nights feel flipped',
              response:
                'Newborns arrive without an internal day-night clock, their brain relies on outdoor morning light and quiet, dim night feeds to set it.',
            },
            {
              id: 'settling',
              label: 'Hard to settle back down after feeds',
              response:
                'Keeping night feeds boring, dim, and predictable (with a gentle 4-minute settling cue) tells {possessive} brain that 2 AM is still sleep time.',
            },
            {
              id: 'settingup',
              label: 'Just setting up our nursery rhythm',
              response:
                'Getting light cues and safe sleep basics dialed in early pays off every single night this year.',
            },
          ],
          beat2Kicker: 'Setting the body clock',
          beat2Title: 'Four simple anchors across 24 hours',
          beat2Lead:
            'An infant’s circadian clock calibrates through contrast, bright, lively mornings and calm, clear, dim nights. Tap each step of the 24-hour rhythm below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 24-hour infant day-night reset',
          visualStageHint: 'Tap each anchor from morning to 2 AM',
          visualConfig: {
            steps: [
              {
                timeOrCue: '8:00 AM',
                label: 'Morning Light',
                title: '10 minutes of indirect outdoor daylight',
                desc: 'Step onto the porch or sit by a bright sunny window right after waking, even on cloudy days.',
                why: 'Natural morning spectrum light starts the 12-hour countdown for evening melatonin.',
              },
              {
                timeOrCue: 'Daytime',
                label: 'Normal Hum',
                title: 'Keep daytime feeds bright and conversational',
                desc: 'Open curtains and let normal household sounds continue so daytime feels distinct from night.',
                why: 'Clear environmental contrast teaches the brain when active alertness belongs.',
              },
              {
                timeOrCue: 'Bedtime',
                label: 'Clear Safe Crib',
                title: 'Back to sleep on a firm, flat, empty surface',
                desc: 'Use a fitted sheet and wearable sleep sack, no loose blankets, pillows, crib bumpers, or plush toys.',
                why: 'Aligns with AAP safe-sleep guidance so you can rest with genuine peace of mind.',
              },
              {
                timeOrCue: '2:00 AM',
                label: 'Boring Night Feed',
                title: 'Warm amber nightlight + calm 4-minute settle',
                desc: 'Skip overhead lights and playful chatter; feed, burp, lay down on back, and offer a steady chest hand if fussy.',
                why: 'A warm red/amber glow protects emerging melatonin and cues {name} right back into rest.',
              },
            ],
          },
          almanacTruth:
            'Ten minutes of morning daylight and a dim, unhurried night routine set an infant’s circadian clock faster than any gadget.',
          scienceDeepDive:
            'Infants are born with immature suprachiasmatic nuclei and minimal endogenous melatonin until roughly 8–12 weeks. Morning blue-spectrum daylight entrains retinal ganglion cells to anchor circadian timing, while warm amber nighttime lighting (<10 lux) avoids suppressing nocturnal melatonin. AAP safe-sleep architecture (Alone, Back, Crib, firm flat surface) remains the gold standard for every sleep stretch.',
          beat3Kicker: 'Holding calm confidence at 2 AM',
          beat3Title: 'When exhaustion tempts shortcuts',
          rehearsalTriggerSpeaker: '2:30 AM, eyes barely open',
          rehearsalTriggerQuote:
            '“{Pronoun} only seems to sleep on my chest on the couch, maybe I’ll just doze here for twenty minutes…”',
          rehearsalPrompt:
            'Which late-night urge feels painfully real when you are running on fumes?',
          instincts: [
            {
              id: 'couch',
              label:
                'Lean back on the sofa or armchair holding {name} just to close your eyes for a few minutes.',
              whyTitle: 'Why that’s so tempting, and why we protect against it',
              whyText:
                'Every bone in an exhausted parent’s body wants to sink into the sofa. Because couches and armchairs have deep crevices, it is the single riskiest place to drift off, better to place {name} flat on {poss} back in the bedside bassinet first.',
            },
            {
              id: 'brightphone',
              label:
                'Turn on a bright lamp and scroll your phone bright-lit beside {name} to stay awake.',
              whyTitle: 'Why that’s so tempting, and what {poss} brain reads',
              whyText:
                'Staying awake during feeds is real work! Just dim your screen to minimum warm night-shift mode and use a tiny amber bulb so neither your brain nor {possessive} thinks sunrise arrived.',
            },
          ],
          calmScriptPlain:
            '“(Soft low voice in amber light) It’s still quiet nighttime. Belly is full, back is safe and flat, and I’m resting right next to you.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'quiet',
              text: '(Soft low voice in amber light) It’s still quiet nighttime.',
              tag: 'Night Cue',
              note: 'Keeping your voice hushed and consistent signals night vs. day without overstimulating {name}.',
            },
            { text: ' ' },
            {
              id: 'flat',
              text: 'Belly is full, back is safe and flat, and I’m resting right next to you.',
              tag: 'Safe Anchor',
              note: 'A gentle resting hand on {poss} chest for 60–90 seconds helps {name} bridge into the crib safely.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Back to sleep · Clear firm crib',
            'Amber nightlight only after dark',
            'Gentle resting hand for 60s settle',
          ],
          pushbacks: [
            {
              id: 'startles',
              label: '“{Pronoun} wakes the second {poss} back touches the mattress”',
              setup:
                'Lower bottom first, then shoulders, then head, and keep one warm hand steady on {poss} chest for 45 seconds:',
              script:
                '“(Keep palm warm and still on chest, slow rhythmic shhh) Bottom down, head down… warm hand stays right here until your breath deepens.”',
            },
            {
              id: 'awake2am',
              label: '“{Pronoun} wants to babble and smile at 3 AM”',
              setup:
                'Skip eye-contact games cleanly without coldness, stay boring, warm, and dim:',
              script:
                '“I love your smile, and right now everybody is resting. Quiet cuddle, dim room, back to sleep.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) wakes up every time we transfer {obj} into the bassinet at night, what gentle transfer steps can we try tonight?”',
          beat4Kicker: 'Tonight’s safe-sleep upgrade',
          beat4Title: 'Pick one easy sleep-space reset tonight',
          beat4Lead:
            'Small physical tweaks make 2 AM effortless when your brain is half asleep.',
          moves: [
            {
              id: 'amberbulb',
              title: 'Swap the nursery lamp to a dim amber nightlight',
              desc: 'Keep overhead fixtures off after bedtime so night feeds never trigger a false sunrise.',
            },
            {
              id: 'morningwindow',
              title: 'Take a 10-minute morning daylight stroll tomorrow',
              desc: 'Give {possessive} eyes natural morning light within an hour of waking to anchor bedtime.',
            },
            {
              id: 'cribsweep',
              title: 'Do a 10-second clear-crib sweep + 45s chest-hand settle',
              desc: 'Verify firm flat mattress + wearable sleep sack, and hold a warm calm hand on {poss} chest after lowering.',
            },
          ],
          closingNote:
            'You don’t need a magic sleep gadget to help {name} rest, morning sun, a clear safe crib, and your calm, predictable night presence do the real quiet work.',
          pocketInsight:
            'Anchor baby’s body clock with 10 minutes of morning daylight, a clear back-to-sleep crib, dim amber night feeds, and a 45-second calm hand settle.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Why did my great sleeper suddenly start waking every 45 minutes around month four?”',
            title: 'Why {Name} Started Waking Every Hour Around Month Four',
            targetSlug: 'four-month-sleep-regression-explained',
          },
          interactiveHighlights: ['24-Hour Light Reset', 'Crib Transfer Cue'],
        },
      },
      {
        slug: 'four-month-sleep-regression-explained',
        title: 'Why {Name} Started Waking Every Hour Around Month Four',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Month 4 · The sleep-cycle upgrade',
          headline: 'Why {Name} Started Waking Every Hour Around Month Four',
          deck: 'It isn’t a “regression” and you didn’t break {poss} sleep, {possessive} brain just upgraded to adult-style sleep cycles.',
          sceneTime: '11:45 PM · THIRD WAKE-UP ALREADY',
          sceneBody:
            'Last month {name} gave you glorious five-hour stretches. This week {pronoun} pops awake every 45 to 60 minutes like clockwork. *You stare at the baby monitor wondering what bad habit you accidentally created.*',
          pollQuestion: 'Have sudden frequent night wakings caught you off guard?',
          pollOptions: [
            {
              id: 'rightnow',
              label: 'We are living this exact week',
              response:
                'Take a deep breath: nothing went backward. Around 3.5 to 5 months, {possessive} brain permanently upgrades from two newborn sleep states to four lighter-and-deeper adult cycles.',
            },
            {
              id: 'preparing',
              label: 'Preparing before month four arrives',
              response:
                'Understanding this upgrade in advance turns a scary mystery into a predictable developmental milestone.',
            },
          ],
          beat2Kicker: 'Inside {possessive} sleeping brain',
          beat2Title: 'From deep newborn sleep to 45-minute waves',
          beat2Lead:
            'Before month four, babies sink straight into heavy sleep. Around month four, sleep reorganizes into rolling 45-to-60-minute waves with a brief “surface check” at the end of every wave. Tap each stage below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'Inside one 50-minute infant sleep cycle',
          visualStageHint: 'Tap each phase of the sleep wave',
          visualConfig: {
            stages: [
              {
                time: 'Min 0–10',
                label: 'Light Drift',
                level: 30,
                title: 'Easy to startle awake',
                desc: 'Breathing slows and eyelids flutter, this is why rushing a crib transfer at minute 4 often wakes {name}.',
                tip: 'Stay steady and unhurried during the first 10 minutes.',
              },
              {
                time: 'Min 10–35',
                label: 'Deep Rest',
                level: 85,
                title: 'Restorative slow-wave sleep',
                desc: 'Limbs go heavy and growth hormones peak. Breathing is slow, even, and relaxed.',
                tip: 'This is the deepest repair phase of the cycle.',
              },
              {
                time: 'Min 35–45',
                label: 'REM Dreaming',
                level: 60,
                title: 'Active brain wiring & little twitches',
                desc: 'Eyes dart under lids and tiny grunts or smiles happen, {name} is still asleep, just sorting new memories!',
                tip: 'Pause 60 seconds before scooping {obj} up, active sleep looks awake.',
              },
              {
                time: 'Min 45–50',
                label: 'Surface Check',
                level: 20,
                title: 'The brief safety scan between cycles',
                desc: '{Name} briefly surfaces to check: “Is everything the same and safe?” If the room feels unfamiliar, {pronoun} calls out.',
                tip: 'Consistent sleep cues (dark room, steady sound) help {obj} roll straight into cycle two.',
              },
            ],
          },
          almanacTruth:
            'The “4-month sleep regression” is actually a permanent brain maturation, giving {name} 60 quiet seconds at active-sleep stirs prevents accidentally waking a baby who is still bridging cycles.',
          scienceDeepDive:
            'Between 14 and 20 weeks, EEG sleep architecture transitions from quiet/active neonatal sleep into mature NREM Stages 1–3 plus REM, featuring sleep spindles and brief micro-arousals every 45–60 minutes. Because active sleep includes vocalizations and eye movement, pausing briefly (“le pause”) distinguishes true distress from transitional stirring.',
          beat3Kicker: 'Middle-of-the-night choices',
          beat3Title: 'What helps at the 45-minute stir',
          rehearsalTriggerSpeaker: '1:15 AM · Soft grunts on the monitor',
          rehearsalTriggerQuote:
            '“Uh-oh, {pronoun}’s stirring again after only 45 minutes, should I run in right this second?”',
          rehearsalPrompt: 'Which nighttime reflex kicks in first?',
          instincts: [
            {
              id: 'instant',
              label:
                'Scoop {name} up on the very first grunt or wiggle before {pronoun} can fully wake.',
              whyTitle: 'Why that’s so tempting, and what often happens',
              whyText:
                'Every caring parent wants to catch crying early. Yet during active REM transitions, picking up a twitching baby at second 5 can accidentally pull {obj} fully out of light sleep.',
            },
            {
              id: 'panicfix',
              label:
                'Change three things in one night (new swaddle, new feeding times, new sleep trainer plan).',
              whyTitle: 'Why that’s so tempting, and what often happens',
              whyText:
                'Exhaustion makes us search for an instant fix, but keeping bedtime cues boringly consistent lets {possessive} newly upgraded brain map safety fastest.',
            },
          ],
          calmScriptPlain:
            '“(Pause 60 quiet seconds by the crib; if cries rise, rest a warm hand on {poss} chest) Shhh… I’m right here. You’re safe in your bed, roll right into your next rest.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'pause',
              text: '(Pause 60 quiet seconds by the crib; if cries rise, rest a warm hand on {poss} chest)',
              tag: '60-Sec Check',
              note: 'Lets active-sleep grunts settle naturally, while staying 100% responsive the second real crying starts.',
            },
            { text: ' ' },
            {
              id: 'steady',
              text: 'Shhh… I’m right here. You’re safe in your bed, roll right into your next rest.',
              tag: 'Same Safe Cue',
              note: 'Matching the exact sound and dimness from bedtime helps {name} connect cycles with less alarm.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Wait 60 seconds at light grunts',
            'Keep bedtime & 1 AM sound identical',
            'Comfort first with hand, then hold if needed',
          ],
          pushbacks: [
            {
              id: 'realcry',
              label: '“It’s a real escalating cry, not just a grunt”',
              setup:
                'Respond warmly right away, the 60-second pause is only for sleepy stirring, never for ignoring distress:',
              script:
                '“I hear you, sweet one. I’m picking you up, let’s resettle gently together in the dim room.”',
            },
            {
              id: 'rolling',
              label: '“{Pronoun} just started rolling over in the crib”',
              setup:
                'Transition out of tight swaddles into an arms-free sleep sack right away for safety:',
              script:
                '“Arms free in the sleep sack now so your strong body can move safely, give it 3–4 nights to feel familiar.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) suddenly started waking every 45 to 60 minutes overnight, what gentle, responsive steps can help us ride out the 4-month sleep shift?”',
          beat4Kicker: 'Tonight’s small experiment',
          beat4Title: 'Pick one steady sleep-cycle habit tonight',
          beat4Lead:
            'Consistency beats intensity every time during a developmental leap.',
          moves: [
            {
              id: 'sixtysec',
              title: 'Try a calm 60-second listen before lifting at light stirs',
              desc: 'Watch whether {name} settles back through active sleep on {poss} own, and respond warmly right away if real crying builds.',
            },
            {
              id: 'continuous',
              title: 'Leave steady background sound running all night',
              desc: 'If white/brown noise turns off after 30 minutes, the sudden silence startles {name} during the 45-minute surface check.',
            },
            {
              id: 'armsfree',
              title: 'Check sleep-sack readiness (arms free once rolling begins)',
              desc: 'Verify {name} has full arm freedom if {pronoun} shows any signs of rolling onto {poss} side.',
            },
          ],
          closingNote:
            'Frequent wakings at month four feel heavy on your body, yet they are proof {possessive} brain is maturing right on schedule. Keep nights steady, dim, and gentle, longer stretches return as {pronoun} practices linking these new waves.',
          pocketInsight:
            'Month-4 wakings reflect mature 45-minute sleep waves. Keep white noise steady all night and pause 60 seconds during noisy active sleep before picking up.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“How do you set up a calm sick-night plan BEFORE the first sniffly 2 AM arrives?”',
            title:
              'Preparing for Sick Nights: Comfort Routines & Partnering With Your Pediatrician',
            targetSlug: 'infant-sick-night-comfort-prep',
          },
          interactiveHighlights: ['45-Min Sleep Wave', '60-Sec Active-Sleep Check'],
        },
      },
      {
        slug: 'infant-sick-night-comfort-prep',
        title:
          'Preparing for Sick Nights: Comfort Routines & Partnering With Your Pediatrician',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Prepared calm · Comfort basket & doctor number ready',
          headline:
            'Preparing for Sick Nights: Comfort Routines & Partnering With Your Pediatrician',
          deck: 'How setting up a simple home comfort kit and saving your pediatrician’s after-hours line ahead of time replaces 2 AM panic with calm readiness.',
          sceneTime: '1:50 AM · FIRST STUFFY NIGHT',
          sceneBody:
            '{Name} wakes congested, flushed, and extra clingy on a Sunday night. Half-asleep, you rummage through three drawers looking for the saline drops and try to remember the clinic’s after-hours phone number. *Everything feels twice as scary in the dark when you’re scrambling.*',
          pollQuestion: 'Do you already have a simple sick-night plan tucked in one spot?',
          pollOptions: [
            {
              id: 'notyet',
              label: 'Not yet. I’d be scrambling at 2 AM',
              response:
                'Five calm minutes in daylight tomorrow sets you up for the entire first year, so when a sniffly night arrives, you just open one basket and breathe.',
            },
            {
              id: 'partial',
              label: 'Parts of it, scattered around the house',
              response:
                'Gathering comfort basics and saving your clinic’s nurse-line contact in both parents’ phones turns chaos into calm rhythm.',
            },
          ],
          beat2Kicker: 'Calm home preparation',
          beat2Title: 'Four calm pillars for a stuffy or fussy infant night',
          beat2Lead:
            'Alongside never replaces your doctor, our job is helping you feel organized, comforted, and crystal clear on when to call your pediatric care team. Tap each pillar below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The prepared sick-night comfort rhythm',
          visualStageHint: 'Tap each step to build your home comfort plan',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Daytime Prep',
                label: 'Clinic Contacts',
                title: 'Save your pediatrician & nurse line in Favorites',
                desc: 'Store your clinic’s after-hours number and nearest pediatric urgent care in both caregivers’ phones before you ever need them.',
                why: 'Important awareness: for infants under 3 months, always call your pediatrician promptly for any fever or concerning change.',
              },
              {
                timeOrCue: 'Comfort Kit',
                label: 'Gentle Air & Moisture',
                title: 'Cool-mist humidifier, saline & soft wipes',
                desc: 'Keep a clean cool-mist humidifier, gentle infant saline mist, bulb/nasal aspirator, and lightweight breathable cotton sleepers in one basket.',
                why: 'Simple moisture and light layers keep breathing passages and skin comfortable without over-bundling.',
              },
              {
                timeOrCue: 'Hydration & Feeds',
                label: 'Small Frequent Feeds',
                title: 'Prioritize breastmilk or formula & extra cuddles',
                desc: 'Offer smaller, more frequent milk feeds and note wet diapers simply in your phone notes so you have clear facts if you call the nurse line.',
                why: 'Steady fluids and skin-to-skin comfort are the gentlest home support while {name} rests.',
              },
              {
                timeOrCue: 'When Unsure',
                label: 'Partner With Doctor',
                title: 'Always call your pediatrician with medical questions',
                desc: 'Never guess about medications or dosages from the internet, your pediatric office welcomes late-night calls and gives guidance tailored to {possessive} exact age and weight.',
                why: 'Calling early brings real medical clarity and lets you exhale.',
              },
            ],
          },
          almanacTruth:
            'Preparedness removes half the fear of a baby’s first cold: keep comfort basics in one basket, prioritize gentle cuddles and feeds, and always partner directly with your pediatrician for any medical concerns or dosing.',
          scienceDeepDive:
            'Non-clinical parental readiness studies show that pre-assembling non-pharmacologic comfort items (cool-mist humidification, gentle saline clearing, light breathable cotton sleepwear) and pre-saving pediatric clinic contact numbers dramatically reduces nighttime caregiver anxiety and supports timely communication with licensed medical providers, especially during the first 3 months of life when any fever warrants prompt physician evaluation.',
          beat3Kicker: 'Calm over panic',
          beat3Title: 'Keeping your footing during a fussy, sniffly night',
          rehearsalTriggerSpeaker: '2:00 AM · Searching symptoms online in the dark',
          rehearsalTriggerQuote:
            '“Let me scroll five forums to see what random parents say I should do right now…”',
          rehearsalPrompt:
            'Which middle-of-the-night impulse adds the most stress?',
          instincts: [
            {
              id: 'doomscroll',
              label:
                'Spend 40 minutes reading alarming internet forums instead of calling the clinic nurse line.',
              whyTitle: 'Why that’s so tempting, and what actually helps',
              whyText:
                'Searching feels like taking control, yet internet threads spike fear without knowing {possessive} exact age or history. A 3-minute call to your pediatrician’s after-hours line gives trustworthy answers.',
            },
            {
              id: 'overbundle',
              label:
                'Pile on thick fleece blankets and heavy layers because {name} feels chilly or restless.',
              whyTitle: 'Why that’s so tempting, and what actually helps',
              whyText:
                'Cozy instincts come from love, but babies regulate temperature best in one light breathable cotton sleeper on a clear flat crib surface.',
            },
          ],
          calmScriptPlain:
            '“We’re going to pause the internet search, check our notes on feeds and wet diapers, keep {name} comfy and cool, and call our pediatrician’s nurse line for tailored medical advice.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'pause',
              text: 'We’re going to pause the internet search,',
              tag: 'Stops Panic Loop',
              note: 'Replaces 2 AM anxiety spirals with calm, concrete observation.',
            },
            { text: ' ' },
            {
              id: 'notes',
              text: 'check our notes on feeds and wet diapers, keep {name} comfy and cool,',
              tag: 'Helpful Context',
              note: 'Having simple notes on feeds, comfort, and wet diapers makes your call with the nurse line fast and clear.',
            },
            { text: ' ' },
            {
              id: 'call',
              text: 'and call our pediatrician’s nurse line for tailored medical advice.',
              tag: 'Trusted Care',
              note: 'Medical questions, age-specific fever guidance, and any medication decisions always belong with your licensed clinician.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Call pediatrician promptly for infants <3 months',
            'Skip late-night forum scrolling',
            'Light breathable layer & extra cuddles',
          ],
          pushbacks: [
            {
              id: 'bothering',
              label: '“I feel awkward calling the after-hours nurse line”',
              setup:
                'Pediatric nurse lines exist specifically for new parents at 2 AM, you are never bothering them:',
              script:
                '“Hi, my baby {name} is {age}, seems uncomfortable tonight, and I’d love your guidance on home comfort and whether {pronoun} should be seen.”',
            },
            {
              id: 'sleepreg',
              label: '“All our nice sleep routines went out the window”',
              setup:
                'Sick nights are strictly comfort nights, routines bounce right back once {name} feels well again:',
              script:
                '“Tonight is for holding, soothing, and steady fluids. We’ll ease gently back into our normal rhythm once {pronoun} feels bright again.”',
            },
          ],
          advisorPrompt:
            '“Can you help me put together a practical non-clinical checklist of home comfort items and questions to ask our pediatrician at {possessive} next well-child visit?”',
          beat4Kicker: '5-minute daylight setup',
          beat4Title: 'Pick one calm prep step to finish today',
          beat4Lead:
            'Doing this once in daylight is a gift to your future 2 AM self.',
          moves: [
            {
              id: 'savecontacts',
              title: 'Save your pediatrician & after-hours line as Favorites',
              desc: 'Add the clinic number to both caregivers’ phones and post it inside a kitchen cabinet for babysitters.',
            },
            {
              id: 'comfortbasket',
              title: 'Pack one grab-and-go nursery comfort basket',
              desc: 'Group gentle saline mist, soft tissues, a digital thermometer, and a spare breathable cotton sleeper in one bin.',
            },
            {
              id: 'wellvisitq',
              title: 'Ask your pediatrician for their exact “when to call” sheet',
              desc: 'At your next checkup, request your doctor’s written guidance for {possessive} exact age so you never have to guess.',
            },
          ],
          closingNote:
            'The calmest parents aren’t doctors, they are simply prepared partners who keep comfort close and call their pediatric team without hesitation whenever they need medical clarity.',
          pocketInsight:
            'Save your pediatrician’s after-hours number in daylight, keep non-clinical comfort basics in one basket, and always call your doctor for medical or dosing guidance.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Sick-Night Prep Plan', 'Pediatrician Call Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 3: Starting Solids & Safe First Tastes (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'nutrition-infant-first-foods',
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    title: 'Starting Solids & Safe First Tastes',
    reliefSubtitle:
      'Introduce peanut and egg calmly, tell normal gagging from choking prep, choose purees or finger foods, and keep first-year meals safe',
    tonightQuickWinTitle: 'Episode 1: Introducing Peanut & Egg Safely Without Panic',
    summary:
      'Walk step-by-step through calm early allergen introduction, understand why infant gagging is a protective learning reflex, mix purees and finger foods without dogma, and master first-year kitchen safety.',
    coverImageUrl: 'https://assets.alongside.care/academy/nutrition-infant.png',
    sortOrder: 1,
    episodes: [
      {
        slug: 'early-allergen-introduction-science',
        title: 'Introducing Peanut & Egg Safely Without Panic',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Morning highchair · Tiny thinned taste',
          headline: 'Introducing Peanut & Egg Safely Without Panic',
          deck: 'Why modern pediatric guidance welcomes thinned peanut butter and well-cooked egg early, and the calm morning routine that makes first tastes simple.',
          sceneTime: '9:30 AM · THE HIGHCHAIR',
          sceneBody:
            'You are holding a tiny silicone spoon dipped in thinned peanut butter while {name} bounces happily in the highchair. *Your hand pauses mid-air: “Wait, didn’t we used to wait until age three? What if something happens?”*',
          pollQuestion: 'How do you feel about introducing common allergens like peanut or egg?',
          pollOptions: [
            {
              id: 'nervous',
              label: 'Honestly pretty nervous',
              response:
                'Almost every parent holds their breath on spoon number one! Doing it calmly on a quiet morning, after checking in with your pediatrician if {name} has severe eczema, turns fear into a simple routine.',
            },
            {
              id: 'ready',
              label: 'Ready, just want a clear step-by-step',
              response:
                'You’re going to love how straightforward this is: one thinned taste in the morning, two calm hours of regular play, and gentle repetition each week.',
            },
          ],
          beat2Kicker: 'Why timing shifted',
          beat2Title: 'Introducing the gut calmly during the early tolerance window',
          beat2Lead:
            'Landmark pediatric trials showed that introducing safe, baby-ready textures of peanut and well-cooked egg around 6 months (once ready for solids) helps the immune system recognize them as friendly food. Tap the 4-step routine below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The calm morning first-taste routine',
          visualStageHint: 'Tap each step from prep to weekly rhythm',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Step 1 · Prep',
                label: 'Check Readiness',
                title: 'Sitting with support & cleared by your pediatrician',
                desc: 'Confirm {name} sits well with head steady (~6 months). If {pronoun} has severe eczema or an egg allergy, ask your pediatrician first.',
                why: 'Starting with your doctor’s green light removes guesswork before spoon one.',
              },
              {
                timeOrCue: 'Step 2 · Texture',
                label: 'Thin It Smoothly',
                title: 'Never thick globs, always thinned or soft-cooked',
                desc: 'Whisk 1/4 tsp smooth peanut butter into warm oatmeal, breastmilk, or puree until runny; serve egg well-cooked (omelet strip or mashed hard-boiled).',
                why: 'Thick nut butter is a sticking hazard for infants; thinning makes it easy and safe to swallow.',
              },
              {
                timeOrCue: 'Step 3 · Timing',
                label: 'Morning Window',
                title: 'Offer early in the day while awake for 2 hours',
                desc: 'Serve one new common allergen at breakfast or lunch, not right before bedtime, so you can watch {name} play normally.',
                why: 'Daytime offers calm visibility and easy access to your pediatric clinic if you ever have a question.',
              },
              {
                timeOrCue: 'Step 4 · Rhythm',
                label: 'Keep It Regular',
                title: 'Repeat 2–3 times a week once tolerated',
                desc: 'A one-time taste isn’t enough, gentle, routine inclusion in oatmeal or yogurt helps maintain comfortable tolerance.',
                why: 'Steady regular exposure is what keeps the immune system familiar with the food.',
              },
            ],
          },
          almanacTruth:
            'For most babies ready for solids around 6 months, introducing safely thinned peanut and well-cooked egg on a calm morning, then repeating them weekly, supports healthy immune tolerance.',
          scienceDeepDive:
            'The landmark LEAP (Learning Early About Peanut Allergy) trial demonstrated that regular early oral introduction of peanut protein in infancy dramatically reduced peanut allergy development compared to avoidance. Because oral gut-associated lymphoid tissue promotes immune tolerance whereas inflamed skin exposure can sensitize, infants with severe eczema should consult their pediatrician for individualized timing.',
          beat3Kicker: 'Steady energy at the highchair',
          beat3Title: 'Staying calm instead of hovering in fear',
          rehearsalTriggerSpeaker: 'First morning taste of thinned peanut oatmeal',
          rehearsalTriggerQuote:
            '“Oh no, {pronoun} has a little red spot by {poss} mouth, is that tomato sauce irritation or something else?”',
          rehearsalPrompt: 'Which anxious instinct jumps up first?',
          instincts: [
            {
              id: 'hover',
              label:
                'Freeze with a worried face staring inches from {name} and yank the spoon away.',
              whyTitle: 'Why that’s so tempting, and what {name} notices',
              whyText:
                'Of course you are vigilant! Yet babies read our facial alarm instantly, staying calm and gently wiping drool lets you observe clearly without scaring {obj} away from eating.',
            },
            {
              id: 'waitforever',
              label:
                'Put peanut and egg off until after the first birthday “just to be safe.”',
              whyTitle: 'Why that’s so tempting, and why guidance changed',
              whyText:
                'Waiting used to be the standard advice a generation ago, but modern pediatric evidence shows delaying actually misses the gentlest immune-learning window.',
            },
          ],
          calmScriptPlain:
            '“(Warm relaxed smile) Here’s a tiny taste of warm peanut oatmeal, we’re trying it nice and early this morning while we have a calm day ahead.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'smile',
              text: '(Warm relaxed smile) Here’s a tiny taste of warm peanut oatmeal',
              tag: 'Calm Atmosphere',
              note: 'Your relaxed face signals to {name} that new flavors are safe adventures.',
            },
            { text: ', ' },
            {
              id: 'morning',
              text: 'we’re trying it nice and early this morning while we have a calm day ahead.',
              tag: 'Smart Timing',
              note: 'Morning trials give you two full awake hours of relaxed observation with zero bedtime guesswork.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Always thin nut butters until runny',
            'Serve at breakfast, never right before bed',
            'Ask pediatrician first if severe eczema',
          ],
          pushbacks: [
            {
              id: 'faces',
              label: '“{Name} made a dramatic sour face and spit it out”',
              setup:
                'A wild face on taste #1 means “whoa, brand-new flavor!”, not hatred:',
              script:
                '“(Chuckle warmly) Whoa, new nutty flavor! Your tongue is just meeting it for the first time.”',
            },
            {
              id: 'reactionq',
              label: '“What if I’m unsure about a skin rash or hives?”',
              setup:
                'Stop offering that food for today and reach out to your pediatrician (or emergency care immediately for any breathing or lip/tongue swelling):',
              script:
                '“If anything beyond mild contact redness shows up, like spreading hives or vomiting, we pause the food and contact our medical team right away.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is ready to try peanut and egg this week, can you give me 3 super simple ways to thin smooth peanut butter or prep soft egg safely?”',
          beat4Kicker: 'This week’s calm milestone',
          beat4Title: 'Pick one easy first-taste step this week',
          beat4Lead:
            'Keep it tiny, smooth, and scheduled for a relaxed morning.',
          moves: [
            {
              id: 'checkped',
              title: 'Confirm readiness at your 6-month checkup (or message portal)',
              desc: 'Especially if {name} has eczema or family food allergies, get your doctor’s tailored green light first.',
            },
            {
              id: 'thinpeanut',
              title: 'Whisk 1/4 tsp smooth peanut butter into warm morning puree',
              desc: 'Stir with warm water, breastmilk, or oatmeal until completely smooth and runny, never serve off a sticky spoon.',
            },
            {
              id: 'weeklynote',
              title: 'Put a 2x/week reminder on your fridge once tolerated',
              desc: 'Keep peanut, egg, yogurt, and sesame rotating casually in regular breakfasts so tolerance stays strong.',
            },
          ],
          closingNote:
            'One tiny thinned spoonful on a sunny morning is all it takes to move past the fear. Take a calm breath, enjoy {possessive} funny first-taste faces, and let steady weekly repetition do the rest.',
          pocketInsight:
            'Once ready for solids (~6m), introduce thinned smooth peanut butter and well-cooked egg on a calm morning, then keep them in regular rotation 2–3x/week.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Why do babies cough and gag loudly on soft mashed banana, and when should you sit on your hands vs. act?”',
            title: 'Why Gagging Is a Normal Learning Reflex (And Safe Food Prep Basics)',
            targetSlug: 'gagging-reflex-and-safe-first-bites',
          },
          interactiveHighlights: ['4-Step Morning Routine', 'Allergen Prep Safety'],
        },
      },
      {
        slug: 'gagging-reflex-and-safe-first-bites',
        title: 'Why Gagging Is a Normal Learning Reflex (And Safe Food Prep Basics)',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Oral mapping · How babies learn where food goes',
          headline: 'Why Gagging Is a Normal Learning Reflex (And Safe Food Prep Basics)',
          deck: 'Why a loud, watery-eyed gag is actually {possessive} built-in safety bumper working, plus the simple squish test that keeps first bites safe.',
          sceneTime: '12:15 PM · LUNCHTIME HIGHCHAIR',
          sceneBody:
            '{Name} gums a soft spear of steamed avocado. Suddenly {poss} eyes water, {poss} tongue thrusts forward, and a loud *“blegh!”* cough pushes the mush right back out onto the tray. *Your stomach drops, until {pronoun} blinks, smiles, and immediately reaches for another piece.*',
          pollQuestion: 'Does the fear of gagging make starting finger foods feel intense?',
          pollOptions: [
            {
              id: 'very',
              label: 'Yes, every cough makes my heart leap',
              response:
                'Every single parent feels that jolt! Learning why infant gagging happens so far forward on the tongue, and knowing safe food shapes, brings huge relief.',
            },
            {
              id: 'curious',
              label: 'I want to be 100% clear on safe prep',
              response:
                'Smart mindset. Pairing calm food prep (the squish test) with an accredited infant CPR class gives you rock-solid confidence at every meal.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mouth',
          beat2Title: 'How babies map safe chewing step by step',
          beat2Lead:
            'In a 6-month-old, the gag trigger sits right near the middle of the tongue, way closer to the front than in adults, acting like a built-in safety bumper. Tap each stage of oral skill growth below.',
          visualType: AlmanacVisualType.SENSORY_LADDER,
          visualStageTitle: '5 stages of safe infant mouth-mapping',
          visualStageHint: 'Tap each step to watch chewing skills mature',
          visualConfig: {
            steps: [
              {
                label: 'Upright',
                title: '1. Seated upright at 90 degrees',
                desc: 'Hips, knees, and feet supported steadily in the highchair, never reclined, walking, or in a car seat while eating.',
                tag: 'Foundation · Gravity helps',
              },
              {
                label: 'Squish Test',
                title: '2. Soft enough to squish between two fingers',
                desc: 'Steamed broccoli, ripe avocado, soft banana, or tender omelet should mash effortlessly between your thumb and forefinger.',
                tag: 'Safe Texture · Zero hard snap',
              },
              {
                label: 'Front Gag',
                title: '3. Loud protective gagging reflex',
                desc: 'Loud coughing, red cheeks, and tongue pushing food forward mean airways are open and the built-in safety bumper is working.',
                tag: 'Normal Reflex · Stay calm & watch',
              },
              {
                label: 'Side Chew',
                title: '4. Moving food to the side gums',
                desc: 'Between 7–9 months, gagging naturally moves farther back as {name} learns to shift bites sideways and mash them cleanly.',
                tag: 'Skill Building · Less gagging',
              },
              {
                label: 'Pincer',
                title: '5. Tiny pea-sized soft pieces (~9m+)',
                desc: 'Once pincer grasp arrives, transition from big hand-held spears to tiny soft quartered pieces (never whole round coins).',
                tag: 'Graduation · Safe bite sizes',
              },
            ],
          },
          almanacTruth:
            'Loud gagging with coughing and forward tongue thrust is a protective learning reflex, while true choking is silent. Keep food soft enough to squish between two fingers, keep baby seated upright, and take a local infant CPR course for total peace of mind.',
          scienceDeepDive:
            'In early infancy, the glossopharyngeal gag trigger resides on the anterior-to-mid tongue, far ahead of the airway, pushing oversized boluses forward before they reach the pharynx. Between 6 and 9 months, oral motor experience gradually shifts the reflex posteriorly as lateral tongue transfer and rhythmic munching mature. Round, firm, slippery foods (whole grapes, raw apple chunks, hot dog coins, whole nuts) remain primary choking hazards and must always be modified or avoided.',
          beat3Kicker: 'Calm presence at the tray',
          beat3Title: 'What to do during a loud normal gag',
          rehearsalTriggerSpeaker: '{Name} coughs loudly with watery eyes on mashed pear',
          rehearsalTriggerQuote:
            '“*Cough, cough, blegh!* (Tongue pushes soft pear straight onto the bib)”',
          rehearsalPrompt:
            'Which split-second reflex can accidentally make a normal gag scarier?',
          instincts: [
            {
              id: 'sweep',
              label:
                'Gasp loudly and reach your finger straight into {possessive} mouth to sweep the food out.',
              whyTitle: 'Why that’s so tempting, and why experts warn against blind finger sweeps',
              whyText:
                'Your protective instinct fires in a millisecond! Yet a loud gasp can make {name} inhale sharply, and blind finger sweeps risk pushing soft food deeper back toward the throat.',
            },
            {
              id: 'pat',
              label:
                'Slap {possessive} back while {pronoun} is loudly coughing and pushing food forward.',
              whyTitle: 'Why that’s so tempting, and what helps instead',
              whyText:
                'If {name} is making loud coughing sounds, air is moving and {poss} reflex is clearing it. Calm eyes and quiet coaching let {obj} finish spitting it out safely.',
            },
          ],
          calmScriptPlain:
            '“(Relaxed face, hands ready by your lap, stick out your own tongue) You’re working it forward, cough it out, spit it out right onto your tray. Good job.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'calmface',
              text: '(Relaxed face, hands ready by your lap, stick out your own tongue)',
              tag: 'Prevents Sharp Gasp',
              note: 'Babies mirror your mouth, sticking your tongue out gently cues {obj} to push food forward.',
            },
            { text: ' ' },
            {
              id: 'coach',
              text: 'You’re working it forward, cough it out, spit it out right onto your tray.',
              tag: 'Calm Coaching',
              note: 'Keeps the room steady while {poss} built-in reflex clears the bite; if a baby is ever silent or cannot breathe, follow certified infant choking/CPR protocol and call emergency services immediately.',
            },
            { text: ' Good job.”' },
          ],
          deliveryCues: [
            'Loud & coughing = normal gag reflex',
            'Never do blind finger sweeps',
            'Take an accredited infant CPR class',
          ],
          pushbacks: [
            {
              id: 'silent',
              label: '“How do I know the difference from true choking?”',
              setup:
                'Memorize the golden sound rule and take a 2-hour certified Red Cross / AHA infant CPR class:',
              script:
                '“Loud coughing and red face = gagging (air is moving). Silence, inability to cough or cry, or pale/bluish lips = choking emergency, act immediately with certified infant CPR training and call emergency services.”',
            },
            {
              id: 'tooscary',
              label: '“I’m still not comfortable with finger foods yet”',
              setup:
                'You never have to force finger foods before you feel ready, lumpier mashed textures build oral skills smoothly too:',
              script:
                '“We can start with thicker mashed foods and pre-loaded spoons while both {name} and I build confidence together.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is starting solids, how should I safely cut and soften berries, avocado, egg, and steamed veggies for this exact month?”',
          beat4Kicker: 'Mealtime safety foundation',
          beat4Title: 'Pick one high-confidence safety step this week',
          beat4Lead:
            'Preparation replaces fear with quiet competence at every meal.',
          moves: [
            {
              id: 'squish',
              title: 'Run the 2-finger squish test on every cooked food',
              desc: 'If it doesn’t smash effortlessly between thumb and index finger, steam it 3 minutes longer or mash it.',
            },
            {
              id: 'cprclass',
              title: 'Bookmark a certified infant CPR & choking refresher',
              desc: 'Watching a 30-minute Red Cross or AHA infant safety video with your partner gives lifelong calm confidence.',
            },
            {
              id: 'footrest',
              title: 'Check highchair posture (upright 90° with foot support)',
              desc: 'Stable feet and upright trunk give {name} the core strength needed to cough and clear bites effectively.',
            },
          ],
          closingNote:
            'Every calm meal where {name} practices chewing soft, safe foods builds stronger mouth muscles, and within a few short weeks, that loud front-of-tongue gag reflex naturally fades into smooth, happy chewing.',
          pocketInsight:
            'Loud coughing is normal gagging (stay calm, never finger-sweep). Pass the 2-finger squish test, seat upright at 90°, and complete an accredited infant CPR refresher.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“Do you really have to pick sides between purées and baby-led weaning?”',
            title: 'Purées, Finger Foods, or Both? Picking What Fits Your Family',
            targetSlug: 'baby-led-weaning-vs-purees',
          },
          interactiveHighlights: ['5-Stage Mouth-Mapping Ladder', '2-Finger Squish Test'],
        },
      },
      {
        slug: 'baby-led-weaning-vs-purees',
        title: 'Purées, Finger Foods, or Both? Picking What Fits Your Family',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Combo feeding · Zero dogma at the tray',
          headline: 'Purées, Finger Foods, or Both? Picking What Fits Your Family',
          deck: 'Why social media’s “purées vs. baby-led weaning” war is totally unnecessary, and how responsive combo feeding gives {name} the best of both worlds.',
          sceneTime: '5:30 PM · PREPPING DINNER',
          sceneBody:
            'One parenting account insists spoon-feeding ruins independence forever; another insists finger foods are terrifying. Meanwhile {name} happily grabs a loaded spoon of lentil puree with one hand and gnaws a soft roasted sweet-potato spear with the other. *Wait, are you allowed to just do both?*',
          pollQuestion: 'Which feeding style feels most comfortable for your family?',
          pollOptions: [
            {
              id: 'combo',
              label: 'A relaxed mix of both!',
              response:
                'Pediatric feeding therapists cheer for combo feeding! You get easy iron-rich spoonables alongside tactile self-feeding practice with zero rigid rules.',
            },
            {
              id: 'purees',
              label: 'Starting with purées first',
              response:
                'Purées are wonderful, especially when you let {name} lead the pace and gradually move into thicker mashed textures by 8–9 months.',
            },
            {
              id: 'blw',
              label: 'Mostly soft finger foods',
              response:
                'Great choice, just remember to include iron-rich soft foods (flaked fish, mashed beans, tender egg) daily since babies need iron after 6 months.',
            },
          ],
          beat2Kicker: 'The feeding progression',
          beat2Title: 'It’s not purées vs. fingers, it’s responsive pacing + textures',
          beat2Lead:
            'Research shows what matters most is letting {name} signal hunger and fullness and steadily graduating textures before 9–10 months. Tap the 5 texture steps below.',
          visualType: AlmanacVisualType.SENSORY_LADDER,
          visualStageTitle: 'The 6-to-12-month texture bridge',
          visualStageHint: 'Tap each stage to see textures evolve naturally',
          visualConfig: {
            steps: [
              {
                label: 'Smooth',
                title: '1. Pre-loaded spoons & smooth tastes (~6m)',
                desc: 'Dip a soft spoon into iron-rich oatmeal, yogurt, or mashed lentils and hand it to {name} to guide to {poss} own mouth.',
                tag: 'Responsive · Baby leads the spoon',
              },
              {
                label: 'Fork-Mash',
                title: '2. Thick fork-mashed textures (~7m)',
                desc: 'Instead of blending silky-smooth, mash ripe avocado, banana, or cooked black beans with a fork so tiny bumps train the tongue.',
                tag: 'Texture Bridge · Builds chewing',
              },
              {
                label: 'Soft Spears',
                title: '3. Two-finger-wide soft spears (~6–8m)',
                desc: 'Large soft strips (steamed broccoli floret, ripe pear strip, omelet strip) fit easily into a baby’s full-palm grasp.',
                tag: 'Palm Grasp · Self-directed',
              },
              {
                label: 'Bite Bits',
                title: '4. Pea-sized soft bits (~9m+)',
                desc: 'As the thumb-and-index pincer grasp arrives, swap big spears for tiny soft pieces of shredded chicken, quartered berries, or soft pasta.',
                tag: 'Pincer Grasp · Fine motor',
              },
              {
                label: 'Family Plate',
                title: '5. Modified family meals (~10–12m)',
                desc: 'Set aside a low-salt soft portion of whatever the family eats, making life simpler and exposing {name} to real flavors.',
                tag: 'Shared Table · Less prep work',
              },
            ],
          },
          almanacTruth:
            'Responsive combo feeding beats feeding dogma every time: offer pre-loaded spoons for iron-rich purees alongside soft finger foods, and gradually thicken textures before 9 months.',
          scienceDeepDive:
            'Longitudinal feeding studies comparing baby-led weaning and traditional spoon feeding show equivalent long-term outcomes when caregivers practice responsive feeding (honoring head-turns and fullness cues) and progress past smooth purees to lumpy/mashed textures by 9 months, which supports oral-motor skill development and lowers later texture sensitivity.',
          beat3Kicker: 'Responsive spoon skills',
          beat3Title: 'Following {possessive} mouth instead of scraping the bowl',
          rehearsalTriggerSpeaker: '{Name} turns {poss} head away with three spoonfuls left',
          rehearsalTriggerQuote:
            '“Just two more bites, open wide for the airplane so we finish this jar!”',
          rehearsalPrompt:
            'Which loving habit slips out almost automatically?',
          instincts: [
            {
              id: 'airplane',
              label:
                'Wait until {pronoun} opens {poss} mouth to laugh and sneak the last spoonful inside.',
              whyTitle: 'Why that’s so tempting, and what {name} learns',
              whyText:
                'You worked hard to make nutritious food! Yet sneaking bites past a turned head overrides {possessive} natural fullness gauge, and often makes babies clamp their mouths tighter next week.',
            },
            {
              id: 'wipe',
              label:
                'Scrape {possessive} chin with the spoon after every single bite to keep {obj} tidy.',
              whyTitle: 'Why that’s so tempting, and what {name} feels',
              whyText:
                'Constant face-wiping interrupts sensory exploration and can feel mildly irritating around sensitive cheeks, one warm washcloth wipe at the very end keeps meals joyful.',
            },
          ],
          calmScriptPlain:
            '“You turned your head and closed your lips, your belly is telling me all done! Let’s wipe hands with our warm washcloth.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'read',
              text: 'You turned your head and closed your lips',
              tag: 'Honors Fullness',
              note: 'Shows {name} that {poss} quiet body signals work, so {pronoun} doesn’t need to throw the bowl to be heard.',
            },
            { text: ', ' },
            {
              id: 'done',
              text: 'your belly is telling me all done! Let’s wipe hands with our warm washcloth.',
              tag: 'Warm Finish',
              note: 'Ends the meal cleanly on a happy note while preserving trust in internal hunger cues.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Hand over a pre-loaded spoon',
            'Wipe face once at the very end',
            'Stop on the first clear head-turn',
          ],
          pushbacks: [
            {
              id: 'mess',
              label: '“The floor looks like a mashed-potato explosion”',
              setup:
                'Serve just 2–3 tiny pieces or a thin smear at a time, and toss a washable splat mat underneath:',
              script:
                '“Two small pieces on the tray at a time keeps {name} focused on tasting instead of windshield-wipering the whole meal.”',
            },
            {
              id: 'barelyate',
              label: '“{Pronoun} barely swallowed two teaspoons”',
              setup:
                'Under age one, breastmilk or formula remains the main nutrition engine while solids build skills and iron stores:',
              script:
                '“Touching, squishing, and spitting out counts as real practice today, milk still covers the heavy lifting while {poss} mouth learns.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is eating smooth purees well, what 5 easy fork-mashed or soft finger foods can we add this week for iron and texture practice?”',
          beat4Kicker: 'Tomorrow’s stress-free meal',
          beat4Title: 'Pick one small feeding-ease habit tomorrow',
          beat4Lead:
            'Less pressure at the highchair means faster curiosity, and less cleanup.',
          moves: [
            {
              id: 'preload',
              title: 'Use the two-spoon handoff method',
              desc: 'Pre-load one spoon for {name} to hold while you load the second, builds independence with half the mess.',
            },
            {
              id: 'forkmash',
              title: 'Fork-mash one food instead of blending silky smooth',
              desc: 'Leave soft tiny lumps in ripe banana, avocado, or beans so {poss} tongue practices side-to-side chewing.',
            },
            {
              id: 'endwipe',
              title: 'Save face-wiping until the meal is completely over',
              desc: 'Let {name} explore freely during dinner, then bring one warm wet washcloth at the finish line.',
            },
          ],
          closingNote:
            'There is no gold medal for following one strict internet feeding camp. A relaxed parent sharing iron-rich spoons and soft family bites raises a far happier eater than any rulebook ever could.',
          pocketInsight:
            'Mix pre-loaded spoons and soft finger foods freely, progress to fork-mashed textures by 8–9 months, and honor head-turns as “all done.”',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery:
              '“Why does honey have to wait until birthday #1, and which other everyday foods stay on pause?”',
            title: 'First-Year Kitchen Safety: What Waits Until Age One',
            targetSlug: 'foods-to-avoid-in-infancy',
          },
          interactiveHighlights: ['6–12m Texture Bridge', 'Two-Spoon Handoff'],
        },
      },
      {
        slug: 'foods-to-avoid-in-infancy',
        title: 'First-Year Kitchen Safety: What Waits Until Age One',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Before age one · Four crisp kitchen guardrails',
          headline: 'First-Year Kitchen Safety: What Waits Until Age One',
          deck: 'Four simple, non-negotiable rules (honey, cow’s milk as a drink, added salt/sugar, and whole round foods) that keep every caregiver on the same page.',
          sceneTime: '1:10 PM · SUNDAY AT GRANDMA’S HOUSE',
          sceneBody:
            'A loving grandparent dips a spoon into honey-glazed carrots or pours a little cup of whole milk for {name} at nine months: *“Just a tiny taste won’t hurt!”* Having four crystal-clear rules, and a warm one-liner, makes protecting {name} effortless and drama-free.',
          pollQuestion: 'Is keeping babysitters and relatives aligned on baby food rules tricky?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes, old habits are hard to redirect politely',
              response:
                'Posting a warm 4-bullet fridge card makes the rule neutral house policy instead of an awkward debate at Sunday lunch.',
            },
            {
              id: 'checklist',
              label: 'Just want the clear, science-backed list',
              response:
                'Only four categories truly wait until age one, once you know them, you can relax and share almost every real family spice and flavor!',
            },
          ],
          beat2Kicker: 'Clear guardrails, zero guesswork',
          beat2Title: 'Policing every bite vs. four neutral house guardrails',
          beat2Lead:
            'When everyone knows the exact four things waiting until birthday #1, you don’t have to hover nervously over every snack. Toggle below to compare.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Nervous hovering vs. 4 crisp first-year guardrails',
          visualStageHint: 'Toggle to compare both approaches',
          visualConfig: {
            willpowerLabel: 'Hovering & debating',
            willpowerTitle: 'Trying to police relatives in the moment',
            willpowerDesc:
              'Waiting until a spoon is halfway to {possessive} mouth creates tense corrections and hurt feelings around the table.',
            willpowerOutcome: 'Leaves parents stressed and family members defensive.',
            guardrailLabel: '4 Neutral House Rules',
            guardrailTitle: 'Simple clear list shared up front',
            guardrailDesc:
              'Four universal pediatric safety lines wait until 12 months, while warm spices (cinnamon, garlic, herbs) are warmly welcomed now!',
            guardrailOutcome: 'Everyone relaxes, {name} stays safe, and family flavors shine.',
            environmentShifts: [
              'Zero honey (raw OR cooked/baked) before 12 months: infant botulism spore safety.',
              'Hold cow’s milk as a main beverage until 12 months (plain yogurt & small bits of cheese in food are fine!).',
              'Skip added sugar and heavy salt: tiny kidneys and developing palates thrive on natural food flavors.',
              'Modify round/hard shapes: always quarter grapes/berries lengthwise, shred raw carrots/apples, avoid whole nuts & popcorn.',
            ],
          },
          almanacTruth:
            'Four simple foods wait until age one, honey (even baked), cow’s milk as a main drink, added salt/sugar, and unmodified round choking hazards, while herbs, gentle spices, and real family meals are warmly welcomed.',
          scienceDeepDive:
            'Honey can harbor heat-resistant Clostridium botulinum spores that immature infant gut flora (<12 months) cannot suppress. Whole cow’s milk as a primary drink before 12 months carries excessive renal solute load and low bioavailable iron. Meanwhile, culinary herbs and mild spices (cinnamon, ginger, garlic, basil) expand sensory acceptance safely with zero sodium.',
          beat3Kicker: 'Warm boundaries with family',
          beat3Title: 'Redirecting loving relatives without awkwardness',
          rehearsalTriggerSpeaker: 'Grandparent offering honey graham crackers at 10 months',
          rehearsalTriggerQuote:
            '“Oh come on, we gave you honey on your pacifier and you turned out fine!”',
          rehearsalPrompt: 'Which impulse makes Sunday lunch tenser than it needs to be?',
          instincts: [
            {
              id: 'lecture',
              label:
                'Deliver a tense medical lecture about bacterial spores across the dinner table.',
              whyTitle: 'Why that’s so tempting, and what usually happens',
              whyText:
                'You’re 100% right on the facts, yet lecturing triggers defensiveness in grandparents who hear “you raised your kids wrong.”',
            },
            {
              id: 'givein',
              label:
                'Stay quiet to avoid awkwardness and let {name} nibble the honey cracker anyway.',
              whyTitle: 'Why that’s so tempting, and why this line stays firm',
              whyText:
                'Keeping peace matters, except on true safety lines like honey under 12 months. A warm, appreciative redirect protects both {name} and the relationship.',
            },
          ],
          calmScriptPlain:
            '“I love how excited you are to share treats with {name}! Our pediatrician has a strict no-honey-until-one rule, could you hand {obj} these soft quartered strawberries instead?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'warmth',
              text: 'I love how excited you are to share treats with {name}!',
              tag: 'Honors Love',
              note: 'Acknowledges the grandparent’s affection first so their guard stays completely down.',
            },
            { text: ' ' },
            {
              id: 'ped',
              text: 'Our pediatrician has a strict no-honey-until-one rule',
              tag: 'Neutral Authority',
              note: 'Lets the pediatric rule carry the “no” so it never feels like a personal criticism.',
            },
            { text: ', ' },
            {
              id: 'swap',
              text: 'could you hand {obj} these soft quartered strawberries instead?',
              tag: 'Gives a Yes',
              note: 'Hands the relative a joyful, safe way to spoil {name} right away.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Warm tone + blame the pediatric rule',
            'Hand them an immediate safe swap',
            'Keep safe snacks packed when visiting',
          ],
          pushbacks: [
            {
              id: 'bakedhoney',
              label: '“Wait, what about baked honey bread or honey cereal?”',
              setup:
                'Botulism spores survive regular oven heat, so keep baked honey out until birthday #1 too:',
              script:
                '“Even baked honey waits until {poss} first birthday, after that, it’s totally fair game!”',
            },
            {
              id: 'yogurt',
              label: '“Wait, is plain yogurt okay if cow’s milk waits?”',
              setup:
                'Yes! Cultured dairy like plain whole-milk yogurt and low-sodium ricotta are easy on infant bellies:',
              script:
                '“Plain whole-milk yogurt and a sprinkle of cheese are great starting around 6 months, we just save cups of liquid cow’s milk for age one.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is eating at our family table now, how can I quickly adapt tonight’s dinner (before adding salt or honey) so {pronoun} eats with us safely?”',
          beat4Kicker: 'Your first-year kitchen anchor',
          beat4Title: 'Pick one easy safety habit to set up today',
          beat4Lead:
            'Once these four guardrails live in the open, you can enjoy every messy family meal.',
          moves: [
            {
              id: 'scoopbefore',
              title: 'Scoop out {possessive} portion before salting dinner',
              desc: 'Season the pot with garlic, herbs, and mild spices, dish out {possessive} bowl, then salt the adult plates.',
            },
            {
              id: 'quartertool',
              title: 'Quarter every grape, blueberry, and cherry tomato lengthwise',
              desc: 'Keep a paring knife or grape cutter right by the fruit bowl so safe cutting takes three seconds.',
            },
            {
              id: 'sharecard',
              title: 'Share this Pocket Card with caregivers or grandparents',
              desc: 'One calm 20-second share aligns everyone before the next family visit.',
            },
          ],
          closingNote:
            'Protecting {name} in year one doesn’t require plain, flavorless baby food. Hold these four clean safety lines, share warm herbs and real family textures freely, and watch {possessive} curiosity bloom.',
          pocketInsight:
            'Before 12 months: zero honey (even baked), no liquid cow’s milk as a drink, skip added salt/sugar, and quarter/soften all round hard foods.',
          nextEpisodeHook: null,
          interactiveHighlights: ['4 First-Year Guardrails', 'Grandparent Redirect Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 4: First Sounds, Tummy Time & Sensory Play (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'play-infant-sensory-language',
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    title: 'First Sounds, Tummy Time & Sensory Play',
    reliefSubtitle:
      'Make tummy time tear-free, spark first coos and babbles, use everyday household items for sensory play, and build joyful peek-a-boo connection',
    tonightQuickWinTitle: 'Episode 1: Tummy Time {Name} Actually Enjoys (2 Minutes at a Time)',
    summary:
      'Turn fussy floor sessions into happy two-minute tummy-time bursts, nurture early speech through vocal echoing, explore rich sensory textures using zero fancy toys, and build joint attention through peek-a-boo.',
    coverImageUrl: 'https://assets.alongside.care/academy/play-infant.png',
    sortOrder: 1,
    episodes: [
      {
        slug: 'tummy-time-without-tears',
        title: 'Tummy Time {Name} Actually Enjoys (2 Minutes at a Time)',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Chest-to-chest & 2-minute floor bursts',
          headline: 'Tummy Time {Name} Actually Enjoys (2 Minutes at a Time)',
          deck: 'Why chest-to-chest counts 100%, and how sprinkling two-minute bursts after diaper changes builds strong neck and rolling muscles with zero tears.',
          sceneTime: '10:15 AM · NURSERY RUG',
          sceneBody:
            'You lay {name} gently on the playmat for tummy time. Within twenty seconds {poss} face smushes into the blanket and angry protests erupt. *You scoop {obj} up guilty, worrying you’re already behind on milestones.*',
          pollQuestion: 'How does tummy time usually go at your house?',
          pollOptions: [
            {
              id: 'protests',
              label: 'Instant protests after 30 seconds!',
              response:
                'Completely normal, a baby’s head is nearly a quarter of their body weight! Lifting it feels like doing a plank after breakfast. Tiny two-minute bursts add up fast.',
            },
            {
              id: 'forget',
              label: 'I keep forgetting to fit it in',
              response:
                'Attaching just 2 minutes right after two diaper changes each day removes the mental load completely.',
            },
          ],
          beat2Kicker: 'How motor strength actually grows',
          beat2Title: 'Micro-bursts beat marathon sessions every time',
          beat2Lead:
            'Pediatric physical therapists care about joyful total minutes across the day, not enduring 15 straight minutes of crying. Tap the 4 tear-free progressions below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The tear-free tummy-time ladder',
          visualStageHint: 'Tap each position from newborn chest to floor play',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Level 1',
                label: 'Chest-to-Chest',
                title: 'Reclined on your chest counts 100%',
                desc: 'Lean back on pillows with {name} tummy-down on your chest, {pronoun} naturally lifts {poss} head just to see your smiling face.',
                why: 'Gravity is gentler at an incline, and your face is the best motivator in the room.',
              },
              {
                timeOrCue: 'Level 2',
                label: 'Rolled Towel',
                title: 'Tiny towel roll tucked under armpits',
                desc: 'Place a rolled burp cloth under {poss} chest with elbows tucked forward so pushing up feels doable instead of stuck.',
                why: 'A 1-inch lift reduces head-weight leverage so {name} can look around happily.',
              },
              {
                timeOrCue: 'Level 3',
                label: 'Eye-Level Floor',
                title: 'Lie flat face-to-face on the rug',
                desc: 'Get your chin right down on the floor 12 inches away, or prop an unbreakable mirror or black-and-white card at eye level.',
                why: 'Floor-level eyes turn hard work into a cozy social game.',
              },
              {
                timeOrCue: 'Level 4',
                label: 'Roll-Out Exit',
                title: 'Always roll gently to the side when fussing starts',
                desc: 'End on a warm note by rolling {name} smoothly onto {poss} side, then back, before lifting up.',
                why: 'Rolling out teaches {poss} brain the exact motor map for independent rolling!',
              },
            ],
          },
          almanacTruth:
            'Five happy two-minute bursts of tummy time, including reclined chest-to-chest, build stronger neck, shoulder, and rolling pathways than one miserable ten-minute battle.',
          scienceDeepDive:
            'Prone positioning strengthens cervical extensors, scapular stabilizers, and core musculature while providing varied vestibular and proprioceptive input. Pediatric physical therapy guidelines emphasize frequent short bouts (2–3 minutes accumulated throughout wake windows) and ending via gentle side-rolling to reinforce segmental rolling motor plans.',
          beat3Kicker: 'Joyful floor coaching',
          beat3Title: 'Ending on a win instead of pushing through tears',
          rehearsalTriggerSpeaker: '{Name} grunts and drops {poss} forehead onto the mat',
          rehearsalTriggerQuote:
            '“*Unh! Unh!* (Arms flail sideways, frustration building)”',
          rehearsalPrompt: 'Which instinct makes tummy time feel like a chore?',
          instincts: [
            {
              id: 'pushlonger',
              label:
                'Keep {obj} down for five more minutes crying “because the checklist says 15 minutes.”',
              whyTitle: 'Why that’s so tempting, and what {name} associates',
              whyText:
                'We all want to hit healthy targets! Yet forcing crying on the rug makes {name} protest the moment {pronoun} even sees the mat tomorrow.',
            },
            {
              id: 'giveup',
              label:
                'Skip tummy time for a week because {pronoun} clearly hates it.',
              whyTitle: 'Why that’s so tempting, and the easier middle path',
              whyText:
                'Switching to chest-to-chest or the “football hold” carry across your forearm gives {obj} all the exact neck-strength practice with zero floor tears.',
            },
          ],
          calmScriptPlain:
            '“(Chin on the floor smiling) Look how hard those strong shoulders worked! Ready? Roll to your side… and up we come!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'praise',
              text: '(Chin on the floor smiling) Look how hard those strong shoulders worked!',
              tag: 'Joyful Mirror',
              note: 'Getting down at eye level keeps tummy time social instead of lonely.',
            },
            { text: ' ' },
            {
              id: 'roll',
              text: 'Ready? Roll to your side… and up we come!',
              tag: 'Teaches Rolling',
              note: 'Rolling gently out before tears escalate builds positive associations and primes independent rolling.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Short 2-minute bursts after changes',
            'Tuck elbows gently under shoulders',
            'Always roll to side before lifting',
          ],
          pushbacks: [
            {
              id: 'spitup',
              label: '“{Pronoun} spits up right after feeds”',
              setup:
                'Shift tummy time to the start of a wake window or use an inclined chest hold 20 minutes post-feed:',
              script:
                '“Let’s do inclined chest tummy time first, then save flat floor play for right before the next feed when bellies are settled.”',
            },
            {
              id: 'armsout',
              label: '“{Poss} arms fly straight back like an airplane”',
              setup:
                'Gently guide elbows forward under shoulders over a rolled washcloth:',
              script:
                '“Let’s tuck your elbows right under your chest on this little rolled towel, now you can press right up!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) gets frustrated quickly during floor tummy time, what 3 playful variations work best at this exact month?”',
          beat4Kicker: 'Today’s 2-minute win',
          beat4Title: 'Pick one tear-free burst to try today',
          beat4Lead:
            'Two happy minutes right now builds momentum for the entire week.',
          moves: [
            {
              id: 'diaperroll',
              title: 'Add 90 seconds of tummy time right after two diaper changes',
              desc: 'Roll {name} gently onto {poss} tummy on a safe floor mat right after fastening the diaper, zero extra planning.',
            },
            {
              id: 'towelprop',
              title: 'Tuck a rolled burp cloth under {poss} chest',
              desc: 'Give {poss} elbows a small boost and lie down face-to-face for 60 cheerful seconds.',
            },
            {
              id: 'chesttime',
              title: 'Count 5 minutes of reclined chest-to-chest play today',
              desc: 'Lean back on the sofa and let {name} lift {poss} head to study your smile, 100% genuine tummy time.',
            },
          ],
          closingNote:
            'Strong bodies aren’t built through tears on a blanket, they grow through dozens of tiny, proud two-minute moments with your face cheering just inches away.',
          pocketInsight:
            'Short 2-minute bursts (including reclined chest-to-chest and a tiny towel roll under elbows) build happy strength. Always roll gently to the side to finish.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Why does singing slowly in warm ‘parentese’ unlock first consonants months earlier?”',
            title: 'Turning Coos & Babbles Into {Possessive} First Conversations',
            targetSlug: 'vocal-echo-and-first-sounds',
          },
          interactiveHighlights: ['4-Level Tummy Ladder', 'Side-Roll Exit Technique'],
        },
      },
      {
        slug: 'vocal-echo-and-first-sounds',
        title: 'Turning Coos & Babbles Into {Possessive} First Conversations',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Warm parentese · Mapping every syllable',
          headline: 'Turning Coos & Babbles Into {Possessive} First Conversations',
          deck: 'Why exaggerated sing-song “parentese” isn’t silly baby talk, it’s acoustic high-definition audio engineered for {possessive} speech brain.',
          sceneTime: '4:05 PM · STROLLER WALK',
          sceneBody:
            '{Name} points a chubby finger toward a barking dog and crows *“Baaa!”* You feel slightly self-conscious on the sidewalk, yet the second you slow down and sing back *“Yes! A big brown DOG, woof woof!”*, {poss} mouth opens wide trying to copy the exact shape of your lips.',
          pollQuestion: 'Do you naturally talk in sing-song “parentese” or regular adult voice?',
          pollOptions: [
            {
              id: 'singsong',
              label: 'Full sing-song voice already!',
              response:
                'Keep going proudly! Brain-imaging studies show that warm, stretched vowels make syllable boundaries crystal clear to infant ears.',
            },
            {
              id: 'adult',
              label: 'Mostly regular adult voice (parentese feels goofy)',
              response:
                'Totally fair, and here’s the secret: parentese uses real adult words (“That is a big dog!”), just slightly slower, warmer, and more melodic, never made-up nonsense words.',
            },
          ],
          beat2Kicker: 'Inside {possessive} language brain',
          beat2Title: 'Watch how infant ears map lips to words',
          beat2Lead:
            'To a baby, rapid adult conversation sounds like one unbroken stream of sound. Slow, warm, melodic speech stretches vowels so {possessive} brain can slice words apart. Tap the 3-step loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The Vocal Echo conversation loop',
          visualStageHint: 'Tap each step to see speech circuits link up',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: '{Name} vocalizes',
                label: 'Catch Any Sound',
                quote: '“Mmmm…” · “Ba-ba!” · “Daaa!”',
                desc: 'Every babble is {name} testing lips, tongue, and breath like a tiny musician tuning an instrument.',
                brainNote: 'Motor speech circuits practice pairing breath with lip closure.',
              },
              {
                stepNum: '02',
                actor: 'You echo + expand',
                label: 'Echo & Stretch',
                quote: '“Ba-ba! Yes, your blue BALL!”',
                desc: 'First mirror {poss} exact syllable so {pronoun} feels heard, then connect it gently to a real, stretched word while facing {obj}.',
                brainNote: 'Links {poss} mouth movement directly to real-world meaning.',
              },
              {
                stepNum: '03',
                actor: 'Pause & watch lips',
                label: 'Slow Turn-Taking',
                quote: '(Hold warm eye contact, wait 4–5 seconds)',
                desc: 'Notice {poss} eyes dropping to watch your mouth, babies literally lip-read between 6 and 12 months to learn consonants!',
                brainNote: 'Bridges auditory cortex and Broca’s speech-production center.',
              },
            ],
          },
          almanacTruth:
            'Warm, melodic “parentese” using real words, paired with clear lip visibility and a 4-second pause, dramatically accelerates babbling and early first words.',
          scienceDeepDive:
            'Research by Dr. Patricia Kuhl (University of Washington I-LABS) reveals that infant-directed speech (“parentese”: higher pitch, slower tempo, hyper-articulated vowels, real vocabulary) activates both auditory and motor speech regions (Broca’s area) as infants visually track caregiver lip shapes between 6 and 12 months to master native consonants.',
          beat3Kicker: 'Natural everyday speech',
          beat3Title: 'Making ordinary narration feel effortless',
          rehearsalTriggerSpeaker: 'Afternoon snack or folding laundry together',
          rehearsalTriggerQuote:
            '“Say ‘mama’! Come on, say ‘ba-na-na’! Say it!”',
          rehearsalPrompt: 'Which well-meaning habit actually makes babies go quiet?',
          instincts: [
            {
              id: 'quiz',
              label:
                'Repeat “Say ball! Say ball! Say it!” over and over to get {name} to perform.',
              whyTitle: 'Why that’s so tempting, and why babies freeze up',
              whyText:
                'Hearing that first word is thrilling! Yet direct “say X” quizzing adds subtle performance pressure, modeling the word warmly in play sparks spontaneous copying twice as fast.',
            },
            {
              id: 'rush',
              label:
                'Talk fast from across the kitchen while {name} can’t see your face.',
              whyTitle: 'Why that’s so tempting, and what’s missing',
              whyText:
                'Kitchen multitasking is real life! Just adding two 60-second face-to-face chats a day gives {name} the crucial lip-reading view {pronoun} needs.',
            },
          ],
          calmScriptPlain:
            '“Ooh, a yellow ba-na-na! Soft… sweet… banana. (Pause 5 seconds) Mmm, you said ‘ba!’ Yes, banana!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'stretch',
              text: 'Ooh, a yellow ba-na-na! Soft… sweet… banana.',
              tag: 'Stretched Vowels',
              note: 'Uses real vocabulary at half speed so each syllable stands out clearly.',
            },
            { text: ' ' },
            {
              id: 'pause',
              text: '(Pause 5 seconds)',
              tag: 'Invites Attempt',
              note: 'Replaces “Say banana!” pressure with an inviting open turn.',
            },
            { text: ' ' },
            {
              id: 'celebrate',
              text: 'Mmm, you said ‘ba!’ Yes, banana!',
              tag: 'Validates Effort',
              note: 'Celebrates partial syllables warmly, building fearless confidence to try more sounds.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Real words in a warm melodic voice',
            'Let {name} see your lips move',
            'Model instead of quizzing “Say X!”',
          ],
          pushbacks: [
            {
              id: 'bilingual',
              label: '“We speak two languages at home, will that confuse {obj}?”',
              setup:
                'Bilingual infancy is a pure cognitive superpower, never a delay:',
              script:
                '“Infant brains map two languages effortlessly at the same time, speak whichever language feels warmest and most natural in your heart.”',
            },
            {
              id: 'quietbaby',
              label: '“{Name} mostly squeals and blows raspberries instead of consonants”',
              setup:
                'Raspberries and squeals are vital lip-and-breath workouts, copy them right back!',
              script:
                '“(Blow a playful raspberry right back!) Pfffft! Look at those busy lips practicing!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is starting to babble and blow raspberries, what fun 2-minute sound games encourage early consonants like b, m, and d?”',
          beat4Kicker: 'Today’s speech spark',
          beat4Title: 'Pick one effortless conversation game today',
          beat4Lead:
            'Two minutes of playful echoing beats an hour of background audio.',
          moves: [
            {
              id: 'narrate',
              title: 'Sportscast one daily routine in slow, melodic real words',
              desc: 'While getting dressed or making breakfast, stretch three simple nouns (“socks… warm water… red cup”).',
            },
            {
              id: 'copyback',
              title: 'Play “Copy the Baby” for 2 minutes face-to-face',
              desc: 'Echo {possessive} exact raspberries, hums, or babbles and wait five quiet seconds to see {obj} grin and repeat.',
            },
            {
              id: 'dropquiz',
              title: 'Trade “Say ___!” for warm modeling',
              desc: 'Simply hold an object near your smiling mouth, name it clearly once, and let curiosity invite the echo.',
            },
          ],
          closingNote:
            'Every goofy raspberry you echo back and every slow song you sing over a snack bowl is laying down the joyful rhythm of human conversation, long before the very first dictionary word arrives.',
          pocketInsight:
            'Use slow, warm “parentese” with real words while {name} can see your lips, echo {poss} sounds back, and pause five seconds instead of quizzing.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“Why does {name} ignore a $50 flashing toy to stare at a wooden spoon for ten straight minutes?”',
            title: 'Everyday Household Play (No Expensive Toys Required)',
            targetSlug: 'somatosensory-tactile-exploration',
          },
          interactiveHighlights: ['Vocal Echo Loop', 'Parentese Science'],
        },
      },
      {
        slug: 'somatosensory-tactile-exploration',
        title: 'Everyday Household Play (No Expensive Toys Required)',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Wooden spoon & silk scarf · Pure sensory physics',
          headline: 'Everyday Household Play (No Expensive Toys Required)',
          deck: 'Why simple, quiet objects (a wooden spoon, a measuring cup, a soft cloth) wire deeper focus and motor skill than battery-powered flashing toys.',
          sceneTime: '11:00 AM · KITCHEN FLOOR',
          sceneBody:
            'Surrounded by three musical light-up toys, {name} crawls straight past them to bang a wooden spoon against an upside-down stainless mixing bowl, mouthing the smooth handle and listening closely to the ring. *Wait, is a kitchen drawer actually better than a toy aisle?*',
          pollQuestion: 'Does {name} love ordinary household items more than store-bought toys?',
          pollOptions: [
            {
              id: 'always',
              label: 'Every single time, boxes and spoons win!',
              response:
                'Your baby is a natural scientist! Real wood, cool metal, and crinkled paper teach authentic weight, temperature, and cause-and-effect.',
            },
            {
              id: 'overwhelmed',
              label: 'We have way too many noisy toys already',
              response:
                'Packing half of them into a closet and leaving out 3 simple, quiet textures actually doubles how long {name} stays happily absorbed.',
            },
          ],
          beat2Kicker: 'How infant senses map the world',
          beat2Title: 'The 90/10 rule: when the toy does less, {name} does more',
          beat2Lead:
            'Battery toys entertain babies passively; simple safe objects invite active experiments, mouthing, banging, dropping, and transferring hands. Tap the 5 sensory explorations below.',
          visualType: AlmanacVisualType.SENSORY_LADDER,
          visualStageTitle: '5 ways babies run real physics experiments',
          visualStageHint: 'Tap each step to see what {possessive} brain learns',
          visualConfig: {
            steps: [
              {
                label: 'Grasp',
                title: '1. Feeling weight & temperature',
                desc: 'Cool stainless steel vs. warm wooden spoon vs. airy silk scarf teaches the hand-brain map real material density.',
                tag: 'Tactile Map · Real physics',
              },
              {
                label: 'Mouth',
                title: '2. Safe mouthing = 3D scanning',
                desc: 'Infant lips and tongues have more nerve endings than fingertips, mouthing safe large items is how {name} measures shape and firmness.',
                tag: 'Sensory Lab · Normal & healthy',
              },
              {
                label: 'Transfer',
                title: '3. Passing hand-to-hand (~6–7m)',
                desc: 'Moving a light wooden ring from left palm to right palm fires pathways linking both brain hemispheres.',
                tag: 'Cross-Brain · Coordination',
              },
              {
                label: 'Bang',
                title: '4. Cause-and-effect acoustics',
                desc: 'Banging a spoon on a carpet (soft thud) vs. a metal bowl (bright ring) teaches true physical cause-and-effect.',
                tag: 'Active Agency · “I made that!”',
              },
              {
                label: 'Drop',
                title: '5. Gravity & object permanence (~8–11m)',
                desc: 'Dropping a measuring cup off the highchair six times isn’t mischief, {pronoun} is verifying gravity works every single time!',
                tag: 'Physics Check · Object permanence',
              },
            ],
          },
          almanacTruth:
            'The simpler and quieter the object, the harder {possessive} brain works. Rotating 3–4 safe everyday textures builds longer focus than an overflowing bin of flashing plastic.',
          scienceDeepDive:
            'Comparative infant play studies (including NAU’s electronic-vs-traditional toy trials) show that battery-operated lights and sounds reduce both caregiver-infant language turns and sustained exploratory focus, whereas passive multi-sensory materials (wood, fabric, stainless steel) increase manual manipulation, bimodal transfer, and joint vocalization.',
          beat3Kicker: 'Creating calm play pockets',
          beat3Title: 'Setting up 10 peaceful minutes while you sip warm coffee',
          rehearsalTriggerSpeaker: 'Toy clutter piled across the living room rug',
          rehearsalTriggerQuote:
            '“{Pronoun} touches a toy for ten seconds and starts whining, do I need to buy more engaging toys?”',
          rehearsalPrompt: 'Which parent trap secretly shortens infant focus?',
          instincts: [
            {
              id: 'pile',
              label:
                'Dump the entire toy basket out around {name} so {pronoun} has twenty choices.',
              whyTitle: 'Why that’s so tempting, and what happens to infant focus',
              whyText:
                'Twenty bright toys competing at once flood a baby’s wide-open “lantern” attention, leaving out just three calm objects doubles sustained play time.',
            },
            {
              id: 'demonstrate',
              label:
                'Constantly interrupt to show {obj} “how to play with it the right way.”',
              whyTitle: 'Why that’s so tempting, and what happens instead',
              whyText:
                'Stepping back for 60 quiet seconds while {name} turns a measuring cup upside down builds the earliest roots of independent concentration.',
            },
          ],
          calmScriptPlain:
            '“(Place 3 simple items on the mat and sit nearby quietly) Ooh, you discovered the cool metal scoop, bang, bang, listen to that ring!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'three',
              text: '(Place 3 simple items on the mat and sit nearby quietly)',
              tag: 'Calm Visual Field',
              note: 'Fewer objects invite deeper investigation instead of frantic switching.',
            },
            { text: ' ' },
            {
              id: 'observe',
              text: 'Ooh, you discovered the cool metal scoop, bang, bang, listen to that ring!',
              tag: 'Narrates Discovery',
              note: 'Follows {possessive} lead once {pronoun} looks up to share the win with you.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Check size: larger than a toilet-paper tube',
            'Leave just 3–4 items out at once',
            'Watch quietly before jumping in',
          ],
          pushbacks: [
            {
              id: 'chokingcheck',
              label: '“How do I know a household item is safe to mouth?”',
              setup:
                'Use the quick cardboard-tube rule and inspect for loose parts, sharp edges, or peeling paint:',
              script:
                '“Anything small enough to slip through a toilet-paper roll stays out of reach; sturdy wooden spoons, silicone whisks, and clean washcloths are fair game under supervision.”',
            },
            {
              id: 'dropping',
              label: '“{Pronoun} drops the spoon off the highchair ten times in a row”',
              setup:
                'Save gravity research for floor play, tie one clean silicone toy tether or end the drop game neutrally:',
              script:
                '“Oops, down it goes! Two drops on the tray, then the spoon rests on the counter, we’ll practice dropping balls on the floor after lunch!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) gets bored quickly on the playmat, what 5 safe household items make the best DIY treasure basket for this exact month?”',
          beat4Kicker: 'Today’s 2-minute setup',
          beat4Title: 'Pick one simple play upgrade today',
          beat4Lead:
            'Zero shopping required, everything you need is already in your kitchen.',
          moves: [
            {
              id: 'treasurebasket',
              title: 'Build a 4-item kitchen treasure basket',
              desc: 'Drop in one wooden spoon, one stainless measuring cup, one silicone whisk, and one clean textured washcloth.',
            },
            {
              id: 'toyrotate',
              title: 'Tuck away half the noisy toys for two weeks',
              desc: 'Leave 3–4 quiet, simple items out at eye level and watch {possessive} focus visibly lengthen.',
            },
            {
              id: 'watch60',
              title: 'Sit quietly for 60 seconds without directing play',
              desc: 'Let {name} inspect, mouth, and bang one object at {poss} own pace while you sip something warm.',
            },
          ],
          closingNote:
            'Your baby doesn’t need a curated playroom, {pronoun} has a wonder-filled laboratory right on your kitchen rug. Step back, enjoy a sip of warm coffee, and watch a tiny scientist discover gravity and sound.',
          pocketInsight:
            'When toys do less, babies learn more. Rotate 3–4 safe household textures (wood, stainless steel, silicone, cloth) and sit back while {name} leads.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery:
              '“Why does a ten-second game of peek-a-boo make babies howl with laughter, and actually ease separation tears later?”',
            title: 'Peek-a-Boo & Shared Giggles: How Social Connection Starts',
            targetSlug: 'puppet-sparring-and-joint-attention',
          },
          interactiveHighlights: ['5-Step Sensory Lab', 'Kitchen Treasure Basket'],
        },
      },
      {
        slug: 'puppet-sparring-and-joint-attention',
        title: 'Peek-a-Boo & Shared Giggles: How Social Connection Starts',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Peek-a-boo · “Gone… and always back!”',
          headline: 'Peek-a-Boo & Shared Giggles: How Social Connection Starts',
          deck: 'How tiny games of hiding, pointing, and sock-puppet giggles teach object permanence, ease separation worry, and build shared social joy.',
          sceneTime: '4:40 PM · COUCH CUSHIONS',
          sceneBody:
            'You tuck a clean kitchen towel over your face for two playful seconds, then pull it down: *“Peek-a-boo!”* {Name} explodes into belly laughter, then grabs the cloth {obj}self so you’ll do it nine more times in a row. *It looks like pure silliness, yet {possessive} brain is practicing one of childhood’s biggest milestones.*',
          pollQuestion: 'Has {name} started laughing at peek-a-boo or looking where you point?',
          pollOptions: [
            {
              id: 'lovesit',
              label: 'Yes, pure belly giggles!',
              response:
                'Every time you vanish behind a cloth and reappear smiling, {possessive} brain rehearses a deeply reassuring truth: “When my person disappears, they ALWAYS come back.”',
            },
            {
              id: 'early',
              label: 'Not quite yet, still early months',
              response:
                'Start with a slow 1-second hand-over-eyes peek or gentle sock puppet! Watching {poss} eyes widen in anticipation is pure magic as object permanence clicks in around 6–9 months.',
            },
          ],
          beat2Kicker: 'Inside {possessive} social brain',
          beat2Title: 'Shared giggles wire trust and empathy',
          beat2Lead:
            'Between 6 and 12 months, two huge milestones bloom together: object permanence (you still exist when out of sight) and joint attention (checking your eyes to share excitement). Tap the 3-beat game loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'How peek-a-boo wires emotional security',
          visualStageHint: 'Tap each beat of the social game',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Playful suspense',
                label: 'The Brief Hide',
                quote: '“Where did Mama/Dada go…?” (2 calm seconds)',
                desc: 'A tiny, safe dose of suspense lets {name} feel a flicker of wonder without fear.',
                brainNote: 'Hippocampus holds a mental picture of your face even while hidden.',
              },
              {
                stepNum: '02',
                actor: 'Joyful return',
                label: 'The Predictable Return',
                quote: '“Peek-a-boo! I’m right here!”',
                desc: 'The reunion triggers a delighted laugh, rehearsing goodbye-and-return in the safest possible lab.',
                brainNote: 'Directly buffers 8–10 month separation anxiety when you leave a room.',
              },
              {
                stepNum: '03',
                actor: 'Shared gaze',
                label: 'Joint Attention',
                quote: '{Name} looks at the toy → looks at your eyes → smiles!',
                desc: 'Checking back to share a laugh with you is the exact social spark that launches pointing, words, and empathy.',
                brainNote: 'Wires social-cognition networks that support lifelong friendship skills.',
              },
            ],
          },
          almanacTruth:
            'Peek-a-boo isn’t just a giggle game, it is safe, playful rehearsal for separation, teaching {name} in {poss} bones that when loved ones step away, they always come back.',
          scienceDeepDive:
            'Between 7 and 12 months, infants develop both object permanence and triadic joint attention (coordinating gaze between an object and a caregiver’s face). Playful disappearance-and-return games and animated puppet play safely exercise attachment expectations, directly moderating normative 8–12 month separation distress.',
          beat3Kicker: 'When separation tears begin',
          beat3Title: 'Using the “peek-a-boo rule” when leaving the room',
          rehearsalTriggerSpeaker: 'Stepping into the hallway for 30 seconds at 9 months',
          rehearsalTriggerQuote:
            '“The second I walk around the corner {pronoun} bursts into tears, should I sneak out while {pronoun}’s distracted?”',
          rehearsalPrompt: 'Which well-meaning goodbye trick accidentally backfires?',
          instincts: [
            {
              id: 'sneak',
              label:
                'Wait until {name} looks at a toy and quietly slip out the door without saying goodbye.',
              whyTitle: 'Why that’s so tempting, and what {poss} brain learns',
              whyText:
                'Avoiding tears feels merciful in the moment! Yet turning around to find you mysteriously vanished makes {name} cling tighter tomorrow, afraid you could disappear anytime.',
            },
            {
              id: 'linger',
              label:
                'Come back four times looking stressed and saying “Oh poor baby, don’t cry!”',
              whyTitle: 'Why that’s so tempting, and what {poss} brain reads',
              whyText:
                'Anxious hovering accidentally signals that staying with the other caregiver isn’t safe. A short, warm, predictable goodbye builds real confidence.',
            },
          ],
          calmScriptPlain:
            '“I’m going to the kitchen for a glass of water, bye-bye! Listen to my voice… and peek-a-boo, I’m right back!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'announce',
              text: 'I’m going to the kitchen for a glass of water, bye-bye!',
              tag: 'Honest Goodbye',
              note: 'Never sneaking out builds rock-solid predictability so {name} doesn’t have to stay on high alert.',
            },
            { text: ' ' },
            {
              id: 'voice',
              text: 'Listen to my voice… and peek-a-boo, I’m right back!',
              tag: 'Voice Bridge',
              note: 'Calling warmly from the next room lets {name} hear you still exist even out of sight, just like live peek-a-boo.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Always say a brief warm goodbye',
            'Keep talking lightly from the next room',
            'Smile brightly on every return',
          ],
          pushbacks: [
            {
              id: 'criesdropoff',
              label: '“{Pronoun} still cries when I hand {obj} to daycare or family”',
              setup:
                'Tears at goodbye are healthy attachment, keep your handoff warm, confident, and brief:',
              script:
                '“Big kiss, I love you, you’re safe with [Caregiver], and I always come back after afternoon nap.”',
            },
            {
              id: 'puppet',
              label: '“What’s the easiest 2-minute game to build shared giggles?”',
              setup:
                'Slip a clean striped sock over your hand, instant low-tech magic:',
              script:
                '“Let the sock puppet hide behind your knee, peek out slowly, and playfully nibble {poss} toes, watch {poss} eyes bounce from sock to your face!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) just hit a big separation-anxiety phase and cries whenever I leave the room, what gentle games help ease this stretch?”',
          beat4Kicker: 'Today’s 2-minute giggle ritual',
          beat4Title: 'Pick one playful connection game today',
          beat4Lead:
            'Two minutes of shared laughter fills both of your tanks.',
          moves: [
            {
              id: 'peekgame',
              title: 'Play 3 rounds of slow cloth peek-a-boo today',
              desc: 'Pause 2 playful seconds behind a clean muslin cloth, then pull it off with a bright grin, let {name} try pulling it next.',
            },
            {
              id: 'roomvoice',
              title: 'Practice the “hallway voice bridge” once today',
              desc: 'Say a cheerful bye-bye before stepping into the next room, keep humming or chatting softly, and return with a warm “I’m back!”',
            },
            {
              id: 'pointshare',
              title: 'Point at one interesting window sight and share a grin',
              desc: 'Point at a bird or passing bus, say “Look!”, and smile warmly when {name} looks back to check your eyes.',
            },
          ],
          closingNote:
            'Those belly laughs over a kitchen towel aren’t filler between milestones, they ARE the milestone. Every joyful return quietly teaches {name} that your love is steady, even around corners.',
          pocketInsight:
            'Play peek-a-boo and never sneak out, brief warm goodbyes plus a reassuring voice from the next room wire lasting separation trust.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Peek-a-Boo Security Loop', 'No-Sneak Goodbye Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 5: Protecting Infant Focus in a Phone-Filled World (3 Episodes: 1 Cut/Folded)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'digital-infant-zero-screens',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    title: 'Protecting Infant Focus in a Phone-Filled World',
    reliefSubtitle:
      'Spot how phone buzzes interrupt baby eye contact, cut background TV noise for early words, and navigate “baby videos” & grandparent video calls',
    tonightQuickWinTitle: 'Episode 1: What {Name} Notices When Our Phone Buzzes Nearby',
    summary:
      'Build guilt-free phone-free pockets during key infant feeds and play, understand how silent rooms accelerate word learning, and separate live family video calls from passive “educational” baby videos.',
    coverImageUrl: 'https://assets.alongside.care/academy/digital-infant.png',
    sortOrder: 1,
    episodes: [
      {
        slug: 'parental-technoference-and-still-face',
        title: 'What {Name} Notices When Our Phone Buzzes Nearby',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Phone face-down · Presence without guilt',
          headline: 'What {Name} Notices When Our Phone Buzzes Nearby',
          deck: 'Zero parent guilt here, just why setting your phone out of reach during two tiny daily pockets makes {name} calmer and more connected.',
          sceneTime: '10:40 AM · NURSING OR BOTTLE CHAIR',
          sceneBody:
            'You are feeding {name} and glance down to answer one quick text. Your expression naturally goes flat while reading. {Name} pauses drinking, kicks both feet to win your eyes back, and fusses softly. *You aren’t a bad parent, our phones are literally engineered to steal our gaze.*',
          pollQuestion: 'Does your phone sneak into feeds and floor play more than you wish?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes, nursing/feeding hours get lonely!',
              response:
                'Of course they do! Listening to an audiobook or podcast in one earbud keeps your mind company while letting your eyes stay warm and available for {name}.',
            },
            {
              id: 'notifications',
              label: 'It’s mostly random pings pulling my eyes away',
              response:
                'Silencing non-human notifications and carving out two tiny “phone-parked” anchors a day beats trying to rely on willpower.',
            },
          ],
          beat2Kicker: 'Inside {possessive} social radar',
          beat2Title: 'Why a frozen face feels confusing, and how fast repair works',
          beat2Lead:
            'When we read a screen, our face goes briefly motionless (researchers call it a “mini still-face”). Tap the 3-beat loop below to see how one warm smile instantly reconnects the wire.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'Notification break → instant warm repair',
          visualStageHint: 'Tap each step to see how connection snaps right back',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'The ping hits',
                label: 'Frozen Gaze',
                quote: 'Your eyes lock onto a message; facial expression goes blank',
                desc: 'Because babies read safety directly from moving eyes and eyebrows, an unexpected blank face makes {name} work hard to re-engage you.',
                brainNote: 'Brief confusion triggers bidding (kicking, fussing, waving).',
              },
              {
                stepNum: '02',
                actor: 'Set phone down',
                label: 'Warm Return',
                quote: '“Ooh, I’m back! Look at your big eyes!”',
                desc: 'Simply turning your eyes back with crinkled warmth repairs the connection within two seconds flat.',
                brainNote: 'Stress drops immediately; social trust strengthens through repair.',
              },
              {
                stepNum: '03',
                actor: 'Smarter setup',
                label: 'Earbud Swap',
                quote: 'Keep company in one ear · Keep eyes free for {name}',
                desc: 'Podcasts and audiobooks during long feeds keep adult boredom away without ever freezing your face.',
                brainNote: 'Protects parent sanity AND infant eye-contact windows.',
              },
            ],
          },
          almanacTruth:
            'You never need to be phone-free 24/7, just parking your phone out of reach during two predictable pockets (like morning feeds and diaper chats) gives {name} rich, uninterrupted eye contact.',
          scienceDeepDive:
            'Infancy adaptations of Edward Tronick’s Still-Face Paradigm demonstrate that parental smartphone absorption briefly replicates the blank-face effect, prompting infant fussing and bid-escalation. Importantly, immediate warm re-engagement completely restores infant regulation, making structured phone-free pockets far healthier than parental guilt.',
          beat3Kicker: 'Real life, zero perfectionism',
          beat3Title: 'Handling unavoidable texts while holding {name}',
          rehearsalTriggerSpeaker: 'An urgent message buzzes mid-play',
          rehearsalTriggerQuote:
            '“I genuinely have to reply to work or my partner right now, what do I do?”',
          rehearsalPrompt:
            'Which habit quietly increases fussiness when you must check a message?',
          instincts: [
            {
              id: 'silentfreeze',
              label:
                'Go totally silent mid-smile and stare blankly at your screen right over {possessive} head.',
              whyTitle: 'Why that happens, and the 2-second upgrade',
              whyText:
                'Going abruptly silent mid-interaction catches {name} off guard. Narrating calmly while you type keeps your warm voice present in the room.',
            },
            {
              id: 'guiltspiral',
              label:
                'Beat yourself up all afternoon for checking your phone during a 40-minute feed.',
              whyTitle: 'Why that’s exhausting, and unnecessary',
              whyText:
                'Parenting an infant is intense, repetitive work. Swap scrolling for an audio book in one earbud or a quick narrated check-in, and drop the guilt.',
            },
          ],
          calmScriptPlain:
            '“One second, sweetie. I’m texting Dada about groceries, then my phone goes right back on the shelf. (Put phone down, big smile) All done! I’m right back with you!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'narrate',
              text: 'One second, sweetie. I’m texting Dada about groceries,',
              tag: 'Keeps Voice Warm',
              note: 'Your warm tone stays alive in the room even while your eyes look briefly away.',
            },
            { text: ' then my phone goes right back on the shelf. ' },
            {
              id: 'reunion',
              text: '(Put phone down, big smile) All done! I’m right back with you!',
              tag: 'Clear Reconnect',
              note: 'Marks the end of the break clearly so {name} feels instantly re-anchored.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Use one earbud + audiobooks during long feeds',
            'Narrate quick texts out loud',
            'Park phone across the room for 10 min play',
          ],
          pushbacks: [
            {
              id: 'photos',
              label: '“I pull my phone out mostly to snap cute photos”',
              setup:
                'Take two quick shots, then immediately flip the phone face-down so you stay inside the memory:',
              script:
                '“Snap, snap, got it! Now phone down so you get my real smiling face instead of a camera lens.”',
            },
            {
              id: 'bored',
              label: '“Long night feeds are impossible without something to keep me awake”',
              setup:
                'At 2 AM when {name} has eyes closed feeding, a dim screen or calm podcast is 100% fine:',
              script:
                '“Eyes-closed night feeds are parent-survival time; we save our face-to-face phone-free pockets for bright daytime play!”',
            },
          ],
          advisorPrompt:
            '“I feel glued to my phone during long stretches home alone with {name} ({age}), what realistic habits help me feel less isolated without scrolling in front of {obj}?”',
          beat4Kicker: 'Today’s guilt-free boundary',
          beat4Title: 'Pick one tiny phone-parked pocket today',
          beat4Lead:
            'Environment beats willpower, put the phone two arm-lengths away once today.',
          moves: [
            {
              id: 'earbud',
              title: 'Queue one podcast or audiobook with a single earbud',
              desc: 'Keep your adult brain entertained during feeds while your eyes stay free to catch {possessive} smiles.',
            },
            {
              id: 'anchorpocket',
              title: 'Choose one sacred 10-minute “phone-on-the-shelf” routine',
              desc: 'Pick morning diaper change or floor play, leave your phone charging across the room just for those 10 minutes.',
            },
            {
              id: 'silencenotif',
              title: 'Mute non-human app alerts for the week',
              desc: 'Keep calls and family texts on, turn off shopping/social pings that hijack your gaze mid-giggle.',
            },
          ],
          closingNote:
            'You are a whole human being who deserves adult connection too. Two tiny, joyful phone-parked pockets a day give {name} all the rich, warm eyes {pronoun} needs, with zero perfectionism required.',
          pocketInsight:
            'Skip the guilt, just swap scrolling for an earbud audiobook during long feeds, and claim two tiny phone-parked pockets of warm eye contact daily.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery:
              '“Even if {name} isn’t watching the living-room TV, why does leaving it on quietly drop early words?”',
            title: 'Why Quiet Background Moments Boost Early Words',
            targetSlug: 'background-tv-and-acoustic-smog',
          },
          interactiveHighlights: ['Reconnect Loop', 'Earbud Swap Strategy'],
        },
      },
      {
        slug: 'background-tv-and-acoustic-smog',
        title: 'Why Quiet Background Moments Boost Early Words',
        readingMinutes: 3,
        audioDurationSeconds: 155,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Clear quiet air · Music & voices shine',
          headline: 'Why Quiet Background Moments Boost Early Words',
          deck: 'Why leaving the news or TV murmuring for company quietly cuts adult speech in half, and the simple music swap that keeps the house warm.',
          sceneTime: '3:15 PM · LIVING ROOM RUG',
          sceneBody:
            'The afternoon news plays softly in the corner while {name} stacks rings on the rug. {Pronoun} isn’t even looking at the screen, so it seems totally harmless, until you notice {poss} gaze flickering up every 20 seconds and realizing how little you’ve chatted together all hour.',
          pollQuestion: 'Does background TV usually run for company in your living room?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes, a quiet house feels strangely lonely',
              response:
                'Every stay-at-home caregiver feels that! Swapping background TV for soft instrumental music or an acoustic playlist keeps the room cozy without scrambling infant speech perception.',
            },
            {
              id: 'sometimes',
              label: 'Mostly when cooking or when family visits',
              response:
                'Just clicking the TV off during floor play and meals protects the exact windows when {possessive} ears are soaking up consonants.',
            },
          ],
          beat2Kicker: 'Inside {possessive} auditory brain',
          beat2Title: 'Background chatter vs. clear acoustic space',
          beat2Lead:
            'Adult brains filter out background voices effortlessly (the “cocktail party effect”). Infant ears cannot separate overlapping voices yet, making background TV sound like acoustic fog. Toggle below to compare.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Background TV fog vs. clear speech space',
          visualStageHint: 'Toggle to compare how {name} hears the room',
          visualConfig: {
            willpowerLabel: 'TV murmuring on',
            willpowerTitle: 'Overlapping adult voices & constant cuts',
            willpowerDesc:
              'Studies show parents subconsciously speak roughly 50% fewer words per hour when a TV runs nearby, and rapid jingles interrupt {possessive} play focus every 20–30 seconds.',
            willpowerOutcome: 'Shorter play bursts and muddier word boundaries.',
            guardrailLabel: 'Quiet or Soft Music',
            guardrailTitle: 'Clean acoustic canvas for real voices',
            guardrailDesc:
              'Turning off the screen during play, or playing gentle acoustic music without rapid dialogue, makes every real human syllable pop clearly.',
            guardrailOutcome: 'Longer independent play and hundreds more daily words heard.',
            environmentShifts: [
              'Hit power off the second a show ends so the screen doesn’t default to wallpaper.',
              'Swap background news for gentle instrumental, acoustic, or folk music when you want warmth.',
              'Save adult shows for nap time or after bedtime so you actually get to enjoy them guilt-free!',
            ],
          },
          almanacTruth:
            'Infant ears can’t yet filter background voices from yours. Turning off wallpaper TV during play lets {name} hear consonants clearly, and naturally brings back warm back-and-forth chatter.',
          scienceDeepDive:
            'Controlled observational studies (Christakis et al., Archives of Pediatrics; Pempek et al.) found that audible background television significantly reduces both parent word-count per hour and infant sustained toy-play episodes, because developing auditory cortices lack mature figure-ground speech separation.',
          beat3Kicker: 'Keeping cozy warmth in the room',
          beat3Title: 'What to do when family loves the TV on all afternoon',
          rehearsalTriggerSpeaker: 'Afternoon in the living room',
          rehearsalTriggerQuote:
            '“{Pronoun} isn’t even watching the game, why turn it off?”',
          rehearsalPrompt:
            'Which automatic choice keeps background noise running for hours?',
          instincts: [
            {
              id: 'leaveon',
              label:
                'Shrug and leave it humming all afternoon because turning it off feels strict.',
              whyTitle: 'Why that’s understandable, and the easy upgrade',
              whyText:
                'Nobody wants to play TV police! Simply keeping the living room quiet during {possessive} morning play and switching to music keeps the vibe welcoming for everyone.',
            },
            {
              id: 'silenceall',
              label:
                'Enforce eerie library silence in the house all day until you feel isolated.',
              whyTitle: 'Why that backfires, and what feels way better',
              whyText:
                'Human singing, laughter, soft music, and clinking dishes are wonderful real sounds, only rapid overlapping TV chatter competes with speech mapping.',
            },
          ],
          calmScriptPlain:
            '“Let’s click the TV off while {name} is playing on the rug, little ears hear voices way better without competing chatter, and we can throw on some nice music instead!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'clickoff',
              text: 'Let’s click the TV off while {name} is playing on the rug',
              tag: 'Specific Window',
              note: 'Frames it around active baby play, not a permanent ban on watching the game later.',
            },
            { text: ', ' },
            {
              id: 'ears',
              text: 'little ears hear voices way better without competing chatter,',
              tag: 'Simple Science',
              note: 'Shares the fascinating ear-science neutrally with zero judgment.',
            },
            { text: ' and we can throw on some nice music instead!”' },
          ],
          deliveryCues: [
            'Default TV to OFF between shows',
            'Use soft music when house feels too quiet',
            'Keep real human chatter flowing',
          ],
          pushbacks: [
            {
              id: 'cookdinner',
              label: '“I need background company while cooking dinner”',
              setup:
                'Pop in one earbud for your favorite podcast or play upbeat kitchen music you can hum along to:',
              script:
                '“One earbud for my show, or singing along to kitchen music, keeps me happy while keeping the room crystal clear for {name}.”',
            },
            {
              id: 'alreadyon',
              label: '“We left the TV on plenty already, did I hurt {poss} speech?”',
              setup:
                'Zero harm done! Infant brains are wildly elastic, just clicking it off starting today pays dividends immediately:',
              script:
                '“Today is a fresh acoustic canvas. Every quiet afternoon from here forward builds right up!”',
            },
          ],
          advisorPrompt:
            '“What are some calm, adult-enjoyable instrumental or acoustic playlist styles that keep our house cozy without interfering with {possessive} early language?”',
          beat4Kicker: 'Today’s acoustic refresh',
          beat4Title: 'Pick one simple sound shift today',
          beat4Lead:
            'Notice how noticeably longer {name} focuses on a single toy when the room clears out.',
          moves: [
            {
              id: 'musicbutton',
              title: 'Swap afternoon background TV for one cozy playlist',
              desc: 'Pick soft acoustic guitar, jazz, or classical music you genuinely enjoy listening to.',
            },
            {
              id: 'poweroff',
              title: 'Default the living-room TV to OFF when no one is actively watching',
              desc: 'Treat TV like a book, open it intentionally after bedtime, close it when finished.',
            },
            {
              id: 'kitchenchat',
              title: 'Narrate five minutes of dinner prep with the room quiet',
              desc: 'Let {name} hear the crisp real sounds of chopping carrots, pouring water, and your voice.',
            },
          ],
          closingNote:
            'Clearing away background screen hum is one of the highest-impact, zero-effort upgrades in year one. Your everyday voice, laughing, humming, and naming the world, sounds like pure music to {possessive} growing ears.',
          pocketInsight:
            'Infant ears can’t separate competing TV voices yet. Default wallpaper TV to OFF during play and swap in soft music you enjoy.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery:
              '“Do ‘baby learning videos’ actually teach words, and do live FaceTime calls with grandparents count as screen time?”',
            title:
              'Do “Baby Learning Videos” Actually Work? (And What About Video Calls With Grandparents?)',
            targetSlug: 'sensory-hyperstimulation-and-dopamine',
          },
          interactiveHighlights: ['Acoustic Space Toggle', 'Cozy Music Swap'],
        },
      },
      {
        slug: 'sensory-hyperstimulation-and-dopamine',
        title:
          'Do “Baby Learning Videos” Actually Work? (And What About Video Calls With Grandparents?)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Passive hypnotic clips vs. live grandparent smiles',
          headline:
            'Do “Baby Learning Videos” Actually Work? (And What About Video Calls With Grandparents?)',
          deck: 'Why fast-cut baby videos trigger a trance instead of learning, while live FaceTime smiles with distant family are warmly welcomed.',
          sceneTime: '4:50 PM · PREPPING DINNER',
          sceneBody:
            'You’ve seen those brightly colored bouncing-fruit videos promising “sensory brain stimulation for babies!” {Name} stares at them completely frozen, unblinking, then bursts into tears the instant you pause it. *Wait: is {pronoun} learning, or just locked in a sensory freeze?*',
          pollQuestion: 'Have “educational” baby videos ever tempted you when you needed 10 free minutes?',
          pollOptions: [
            {
              id: 'tempted',
              label: 'Yes, sometimes I just need to chop onions!',
              response:
                'Every parent needs 10 safe hands-free minutes to cook or shower! Understanding why fast-cut videos backfire, and having 3 real alternatives, makes dinner prep calmer.',
            },
            {
              id: 'videocalls',
              label: 'Mostly wondering about FaceTime with family',
              response:
                'Great news right up front: live, responsive video chats with grandparents are the ONE official AAP exception under 18 months, because real faces react back!',
            },
          ],
          beat2Kicker: 'The brain decoder',
          beat2Title: 'Hypnotic stillness isn’t learning, and live video calls are totally different',
          beat2Lead:
            'Bright flashing scenes hijack the primitive orienting reflex (“Wait, what moved?!”) without teaching words. Meanwhile, Grandma waving back on video chat IS true serve-and-return! Flip the lens below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'What it looks like vs. what {possessive} brain experiences',
          visualStageHint: 'Flip both lenses, then tap the 10-second cut comparison',
          visualConfig: {
            adultLabel: 'What it looks like',
            adultQuote: '“Wow, {name} is completely hypnotized and quiet, {pronoun} must be learning!”',
            adultSub:
              'Unblinking stillness looks like deep concentration, and cheerful labels promise “sensory development.”',
            childLabel: 'Inside {possessive} brain',
            childQuote: '“Flashing colors are firing my reflex, and nothing answers when I coo!”',
            childSub:
              'Passive screens cannot respond to {possessive} smile or timing. By contrast, live video calls with grandparents pause, smile back, and echo {name}, building real family bonds!',
            exposureHeading: 'Scene-cut overload scale (seconds per jump)',
            exposureSub: 'Tap 1 to 10 to compare real life vs. hyper-fast clips',
            totalDots: 10,
            defaultCount: 3,
            unitLabel: 'pace level',
            lowMax: 3,
            midMax: 7,
            lowMsg:
              '1–3 sec cuts (bouncing fruit / viral baby reels): Rapid orienting-reflex spikes leave babies wired and tearful when paused.',
            midMsg:
              '4–7 sec pacing: Still faster than real-world infant exploration; babies under 18m learn dramatically better from 3D objects and live voices.',
            highMsg:
              'Real life & live FaceTime with Grandma: Responsive human pace, waits for {possessive} smile, answers {poss} coo, builds real memory!',
          },
          almanacTruth:
            'Before 18 months, passive “educational” videos trigger an unblinking trance rather than learning, while live, interactive video calls with distant grandparents are warmly welcomed because a real person responds back.',
          scienceDeepDive:
            'Both AAP media policy and laboratory transfer studies show a robust “video deficit” under 18 months: infants struggle to transfer 2D symbols to 3D reality, and rapid visual cuts reflexively trigger sympathetic orienting without semantic encoding. Live video chatting with responsive loved ones (co-narrated by a parent) uniquely preserves contingent serve-and-return feedback.',
          beat3Kicker: 'Real-life alternatives & family boundaries',
          beat3Title: 'What to do when you need 10 hands-free minutes (or relatives hand over a phone)',
          rehearsalTriggerSpeaker: 'At a restaurant or family gathering',
          rehearsalTriggerQuote:
            '“Here, let me put cartoons on my phone so {name} sits still while we eat!”',
          rehearsalPrompt: 'Which split-second reaction feels hardest to handle?',
          instincts: [
            {
              id: 'handover',
              label:
                'Hand over the phone immediately at the first squirm so nobody feels uncomfortable.',
              whyTitle: 'Why that’s so tempting, and what happens 10 minutes later',
              whyText:
                'Restaurant squirms feel loud! Yet using bright videos to quiet every wiggle teaches {name} to escalate faster next time, and often triggers tears the second you take the phone away.',
            },
            {
              id: 'guilt',
              label:
                'Panic if you ever put on 5 minutes of video during a sick day or solo nail-trim.',
              whyTitle: 'Why perfectionism never helps',
              whyText:
                'Emergency 5-minute nail trims happen in real parenting! It’s the daily habit, not one survival moment, that shapes {possessive} nervous system.',
            },
          ],
          calmScriptPlain:
            '“We’re skipping passive videos for {name} this year so {poss} focus stays calm, but {pronoun} loves waving at Grandma on FaceTime, or exploring this silicone whisk right here!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'skip',
              text: 'We’re skipping passive videos for {name} this year so {poss} focus stays calm',
              tag: 'Clear Positive Why',
              note: 'Focuses on protecting calm focus rather than sounding judgmental.',
            },
            { text: ', ' },
            {
              id: 'facetime',
              text: 'but {pronoun} loves waving at Grandma on FaceTime, or exploring this silicone whisk right here!',
              tag: 'Joyful Yes',
              note: 'Clearly invites live family video calls and hands over an immediate tactile backup.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Live FaceTime with family = warm YES',
            'Keep 2 novel tactile toys in diaper bag',
            'Zero guilt for rare survival moments',
          ],
          pushbacks: [
            {
              id: 'grandmacall',
              label: '“How do I make a FaceTime call with grandparents actually engaging?”',
              setup:
                'Keep calls short (5–8 minutes), narrate along beside {name}, and invite grandparents to play peek-a-boo:',
              script:
                '“Look, Grandpa is hiding behind his hands, peek-a-boo! Wave your hand at Grandpa!”',
            },
            {
              id: 'cook10min',
              label: '“What gives me 10 safe hands-free minutes to cook dinner?”',
              setup:
                'Park {name} in the highchair beside you with a tiny bowl of water + whisk, or wear {obj} on your back/hip while narrating:',
              script:
                '“Highchair ‘cooking helper’ with a damp washcloth and silicone spoon buys 10 joyful screen-free minutes right next to you.”',
            },
          ],
          advisorPrompt:
            '“Give me 5 zero-prep, screen-free ways to keep {name} ({age}) happily occupied for 10 minutes while I cook dinner or take a shower.”',
          beat4Kicker: 'Your family media rhythm',
          beat4Title: 'Pick one simple screen-free backup today',
          beat4Lead:
            'Having a fun tactile fallback ready makes saying no to baby videos effortless.',
          moves: [
            {
              id: 'bagtoy',
              title: 'Stash two “restaurant-only” tactile toys in the diaper bag',
              desc: 'A crinkle cloth, suction spinner, or silicone straw cup that only appears out of the house feels brand-new every time.',
            },
            {
              id: 'facetimepeek',
              title: 'Schedule one 5-minute interactive FaceTime peek-a-boo with family',
              desc: 'Sit beside {name}, narrate what Grandma is doing, and let real responsive smiles shine.',
            },
            {
              id: 'highchairhelper',
              title: 'Try the “highchair kitchen helper” setup tonight',
              desc: 'Pull the highchair safely away from the stove with a wooden spoon and measuring cup while you narrate dinner prep.',
            },
          ],
          closingNote:
            'You are giving {name} an increasingly rare gift in year one: an unhurried real world of textures, voices, and live smiling faces, including Grandma waving through the screen.',
          pocketInsight:
            'Skip passive “baby learning” videos under 18m, keep 2 novel tactile toys handy for busy moments, and warmly enjoy live interactive FaceTime with family.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Pacing Comparison', 'Live Video Call Guide'],
        },
      },
    ],
  }),
];
