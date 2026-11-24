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

export const TIER_5_LATE_ADOLESCENCE_MODULES: AcademyModuleSeedData[] = [
  // ===========================================================================
  // COURSE 36: Shifting From Manager to Trusted Consultant (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'behavior-teen-autonomy',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    developmentalTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    title: 'Shifting From Manager to Trusted Consultant',
    reliefSubtitle:
      'Give advice your 17-year-old actually welcomes, transfer real daily ownership of sleep and money, and build the lifelong adult-to-adult friendship before launch',
    tonightQuickWinTitle: 'Episode 1: The Consultant Shift: Giving Advice Your 17-Year-Old Actually Wants',
    summary:
      'Transition smoothly from operations manager to trusted senior consultant while your teen’s frontal cortex finishes maturing into their twenties, hand over practical launch skills before graduation, and nurture an enduring adult-to-adult bond.',
    coverImageUrl: 'https://assets.alongside.care/academy/behavior-teen.png',
    sortOrder: 8,
    episodes: [
      {
        slug: 'teen-consultant-shift-protocol',
        title: 'The Consultant Shift: Giving Advice Your 17-Year-Old Actually Wants',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Permission-first advising · Manager out, senior consultant in',
          headline: 'The Consultant Shift: Giving Advice Your 17-Year-Old Actually Wants',
          deck: 'Why hovering over deadlines and college forms triggers fierce 17-year-old pushback, and how asking permission first makes {name} actually seek your wisdom.',
          sceneTime: '8:15 PM · DESK COVERED IN APPLICATIONS',
          sceneBody:
            'Two weeks remain before a major college, apprenticeship, or job deadline, and {poss} desk still holds half-finished drafts. You step in and rattle off three urgent reminders, “Have you emailed your counselor? Made a spreadsheet? Proofread page two?”, and {name} snaps, “STOP MICROMANAGING MY ENTIRE LIFE!” *You walk out terrified {pronoun} will stumble right before launching, yet hovering only drives {obj} deeper into avoidance.*',
          pollQuestion: 'What happens fastest when you try to steer a 16-to-18-year-old’s big deadlines?',
          pollOptions: [
            {
              id: 'pushback',
              label: 'Instant defensiveness, even when my advice would genuinely save {obj} stress!',
              response:
                'At 17, unsolicited management feels like “You don’t trust me to be an adult.” Switching to permission-first consulting keeps your wisdom welcome!',
            },
            {
              id: 'paralysis',
              label: '{Pronoun} shuts down and expects me to keep reminding {obj} anyway',
              response:
                'Over-managing accidentally breeds waiting-for-rescue anxiety, stepping back with warm confidence activates real self-ownership.',
            },
          ],
          beat2Kicker: 'The consultant shift loop',
          beat2Title: 'Adulthood starts legally at 18, while frontal wiring finishes closer to 25',
          beat2Lead:
            'Your teen’s brain is an apprentice executive, capable of huge brilliance yet still insulating long-range planning circuits through the mid-twenties. Stepping from micromanager to invited consultant offers steady scaffolding without crushing autonomy. Explore the 3-beat loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat senior consultant handover',
          visualStageHint: 'Tap each step to keep advice welcome and agency strong',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Greet the human first',
                label: 'Warmth Before Checklists',
                quote: '“Hey! So glad you’re home, how was your afternoon?” (zero deadline quiz)',
                desc: 'Spend the first five minutes enjoying {name} as a person before mentioning grades, forms, or chores.',
                brainNote: 'Reassures {name} your love is completely separate from {poss} output.',
              },
              {
                stepNum: '02',
                actor: 'Ask before advising',
                label: 'Permission Gate',
                quote: '“Want my consultant brain on that timeline, or do you have a plan rolling?”',
                desc: 'Treat {name} as the CEO of {poss} own schedule; if {pronoun} declines advice, smile and step back cleanly.',
                brainNote: 'Removes reactance so {pronoun} actively asks when genuinely stuck.',
              },
              {
                stepNum: '03',
                actor: 'Let small bumps teach',
                label: 'Safe Natural Outcomes',
                quote: 'Allow low-stakes misses (late fees, messy rough drafts) while your safety net is still close',
                desc: 'Learning from a bumpy deadline at 17 under your warm roof beats hitting the wall alone at 20.',
                brainNote: 'Real experience insulates executive planning pathways far faster than reminders.',
              },
            ],
          },
          almanacTruth:
            'An 18-year-old doesn’t need an operations manager breathing down their neck, or abrupt abandonment; they need a warm senior consultant who waits to be invited in.',
          scienceDeepDive:
            'Longitudinal neuroimaging (Jay Giedd; Laurence Steinberg) confirms that dorsolateral prefrontal myelination for long-horizon planning continues until roughly age 25, while higher-education research highlighted by Julie Lythcott-Haims links parental micromanagement to elevated college anxiety and reduced self-efficacy.',
          beat3Kicker: 'Practice by the bedroom doorway',
          beat3Title: 'Transfer ownership cleanly without cold withdrawal',
          rehearsalTriggerSpeaker: '{Name} snapping when you ask about an upcoming application or work deadline',
          rehearsalTriggerQuote: '“I KNOW when it’s due! Stop hovering over me like I’m twelve!”',
          rehearsalPrompt: 'Which reaction traps you in either helicoptering or cold detachment?',
          instincts: [
            {
              id: 'panic-hover',
              label: '“If I don’t remind you every night, you’re going to ruin your whole future!”',
              whyTitle: 'Why that’s so tempting, and why it paralyzes teens',
              whyText:
                'Catastrophizing confirms a late teen’s quiet fear that they aren’t actually capable of making it on their own.',
            },
            {
              id: 'cold-wash',
              label: '“Fine! You’re practically 18, sink or swim, don’t ask me for help later!”',
              whyTitle: 'Why that’s so tempting, and why it severs closeness',
              whyText:
                'Angry abandonment right before launching leaves teens scared to call home when real adult dilemmas arise.',
            },
          ],
          calmScriptPlain:
            '“Fair call. I slipped back into manager mode because I’m excited for what’s ahead for you. This timeline is 100% yours, and I genuinely believe you’ve got it. I’m officially switching to consultant mode: zero daily nagging, and if you ever want a proofreader or brainstorming coffee, just book me.”',
          calmScriptSegments: [
            {
              id: 'own-hover',
              text: '“Fair call. I slipped back into manager mode because I’m excited for what’s ahead for you. ',
              tag: 'Disarm with honesty',
              note: 'Owning the slip immediately drops adolescent defensiveness.',
            },
            {
              id: 'vote-trust',
              text: 'This timeline is 100% yours, and I genuinely believe you’ve got it. ',
              tag: 'Hand back the wheel',
              note: 'Signals deep faith in {poss} real competence.',
            },
            {
              id: 'consultant-offer',
              text: 'I’m officially switching to consultant mode: zero daily nagging, and if you ever want a proofreader or brainstorming coffee, just book me.”',
              tag: 'Warm open retainer',
              note: 'Keeps your wisdom right on standby without suffocating autonomy.',
            },
          ],
          deliveryCues: [
            'Once you promise zero nagging, really mean it, bite your tongue when deadlines loom!',
            'Schedule one optional 20-minute Sunday coffee check-in if logistics truly require parent signatures',
            'Laugh warmly about silly executive mistakes you made at age 18 to dissolve shame',
          ],
          pushbacks: [
            {
              id: 'big-consequence',
              label: 'What if {pronoun} is about to miss a truly huge financial-aid or tuition deadline?',
              setup: 'Offer ONE clean, non-emotional factual heads-up, then let {obj} steer.',
              script: '“Quick consultant ping: our parent tax form needs to go in by Friday if you want aid unlocked, just drop it on my desk by Thursday night if you need my signature.”',
            },
            {
              id: 'asks-too-late',
              label: 'What if {pronoun} asks for essay edits at 11 PM the night before it’s due?',
              setup: 'Hold kind adult boundaries on your own sleep too!',
              script: '“I’d love to help. I’m wiped tonight, so I can read it fresh for 20 minutes at 7 AM, or next time send it two days ahead!”',
            },
          ],
          advisorPrompt:
            'My {age} teen pushes back hard whenever I remind {obj} about college, work, or school deadlines. How do I shift from manager to trusted consultant?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Make one clean Consultant Shift move this week',
          beat4Lead: 'Step back one inch so {name} steps forward two.',
          moves: [
            {
              id: 'five-min-warmth',
              title: 'The 5-minute zero-checklist greeting',
              desc: 'Every time {name} walks through the door this week, offer five full minutes of pure warmth before mentioning logistics.',
            },
            {
              id: 'ask-permission',
              title: 'Use the 6-word permission gate',
              desc: 'Before offering advice on anything non-safety related, ask: “Want my take, or just venting?”',
            },
            {
              id: 'sunday-office-hours',
              title: 'Swap daily reminders for weekly “office hours”',
              desc: 'Batch all forms, car stuff, and college logistics into one relaxed 20-minute Sunday coffee chat.',
            },
          ],
          closingNote:
            'Stepping out of the driver’s seat while your 17-year-old takes the wheel takes fierce parental love, and watching {obj} turn to ask your thoughts voluntarily is worth every quiet breath.',
          pocketInsight: 'Greet the human before the checklist, ask permission before advising, and let small safe bumps build real agency.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 2',
            mystery: 'Six months before moving out or starting work, which 4 everyday life routines actually predict thriving young adults?',
            title: 'Launching Real Life Skills: Sleep, Money & Daily Ownership',
            targetSlug: 'teen-life-skills-autonomy-schedules',
          },
          interactiveHighlights: ['3-beat senior consultant loop', 'Permission-first handover script'],
        },
      },
      {
        slug: 'teen-life-skills-autonomy-schedules',
        title: 'Launching Real Life Skills: Sleep, Money & Daily Ownership',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Launch apprenticeship · Four daily domains handed over calmly',
          headline: 'Launching Real Life Skills: Sleep, Money & Daily Ownership',
          deck: 'Why cramming ten years of laundry, budgeting, and alarm clocks into the week before dorm drop-off fails, and the 4-domain launch handover teens take real pride in.',
          sceneTime: '7:10 AM · HALLWAY OUTSIDE THE BEDROOM',
          sceneBody:
            'It hits you suddenly over coffee: {name} is months away from college, trade school, or independent living, yet you are STILL waking {obj} up every morning, washing {poss} jerseys, tracking {poss} spending, and making sure {poss} car has gas. *Panic whispers “How will {pronoun} survive in six months?!”, yet panicky lectures don’t build habits; real practice under your roof does.*',
          pollQuestion: 'Which everyday adult habit are you still quietly carrying for your teen?',
          pollOptions: [
            {
              id: 'waking',
              label: 'Morning wake-up calls, laundry, or daily reminders',
              response:
                'Almost every loving parent keeps doing these out of sheer speed, handing them over cleanly while mistakes are cheap is the greatest graduation gift!',
            },
            {
              id: 'money',
              label: 'Budgeting real money and planning ahead for weekly expenses',
              response:
                'Running out of discretionary cash on day 21 of a month teaches budgeting in one afternoon, far better than twenty spreadsheets!',
            },
          ],
          beat2Kicker: 'The 4-step launch apprenticeship',
          beat2Title: 'Independence is a muscle built by doing, never by hearing lectures',
          beat2Lead:
            'Practical life skills wire through hands-on repetition and real feedback while the safety net is still close. Walk through the 4-step launch handover sequence below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-domain launch readiness handover',
          visualStageHint: 'Tap each launch domain to transfer smoothly before graduation',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Domain 1',
                label: 'Own Alarm',
                title: 'Zero parental wake-up calls, 100% self-waking',
                desc: 'Hand {obj} a loud alarm clock across the room; if {pronoun} sleeps through first period once, let {obj} handle the tardy slip.',
                why: 'Missing one high school class beats missing three college midterms.',
              },
              {
                timeOrCue: 'Domain 2',
                label: 'Own Laundry',
                title: 'Full cycle: wash, dry, fold & basic stain/iron rescue',
                desc: 'Walk through temperatures once together, then step away so running out of clean socks becomes a calm natural teacher.',
                why: 'Domestic self-sufficiency builds quiet everyday dignity.',
              },
              {
                timeOrCue: 'Domain 3',
                label: 'Own Budget',
                title: 'Fixed monthly debit/cash budget with zero mid-month bailouts',
                desc: 'Transfer a set amount covering gas, hangouts, and extras; automate savings first and track balance weekly.',
                why: 'Feeling day-22 budget pinch under your roof prevents credit-card spirals later.',
              },
              {
                timeOrCue: 'Domain 4',
                label: 'Own Logistics',
                title: 'Car maintenance, forms, calendar alerts & household meals',
                desc: 'Practice pumping gas, checking tire pressure, reading a lease/bank app, and cooking weekly family dinner.',
                why: 'Procedural memory replaces adulting terror with calm “I know how to figure this out.”',
              },
            ],
          },
          almanacTruth:
            'Doing laundry or waking your 17-year-old up feels faster tonight, yet letting them stumble safely over an unwashed jersey or empty wallet this year builds unshakable adult confidence.',
          scienceDeepDive:
            'Transition-to-adulthood research shows that procedural self-care competence, specifically self-waking, financial self-management, and domestic maintenance practiced prior to leaving home, strongly predicts lower first-year college/career distress and stronger independent adjustment.',
          beat3Kicker: 'Practice at the kitchen table',
          beat3Title: 'Frame the handover as an exciting graduation, never punishment',
          rehearsalTriggerSpeaker: '{Name} realizing you are stepping out of morning wake-ups and laundry',
          rehearsalTriggerQuote: '“Wait, you’re seriously not going to wake me up anymore?! What if I’m late to school?!”',
          rehearsalPrompt: 'Which tone turns launch prep into shame instead of empowerment?',
          instincts: [
            {
              id: 'doom-prophecy',
              label: '“You’re going to completely flunk out of college if you can’t even wake yourself up!”',
              whyTitle: 'Why that’s so tempting, and why it triggers panic',
              whyText:
                'Pairing graduation with prophecies of doom wires deep anticipatory anxiety around growing up.',
            },
            {
              id: 'rescuer-cave',
              label: '“Okay fine, I’ll keep doing mornings and laundry until August so you don’t get stressed.”',
              whyTitle: 'Why that’s so tempting, and what it costs',
              whyText:
                'Protecting short-term convenience steals the final safe runway for practicing adult rhythms.',
            },
          ],
          calmScriptPlain:
            '“You’re totally going to crush this, and if you sleep through once this week, that’s literally the best possible place to test your alarm system! Over the next few months we’re handing you the CEO keys to your own mornings, laundry, and spending budget so moving out feels totally second nature.”',
          calmScriptSegments: [
            {
              id: 'safe-lab',
              text: '“You’re totally going to crush this, and if you sleep through once this week, that’s literally the best possible place to test your alarm system! ',
              tag: 'Normalize safe practice misses',
              note: 'Reframes home as a low-stakes flight simulator rather than a pass/fail exam.',
            },
            {
              id: 'ceo-frame',
              text: 'Over the next few months we’re handing you the CEO keys to your own mornings, laundry, and spending budget ',
              tag: 'Proud milestone framing',
              note: 'Elevates everyday chores into genuine grown-up sovereignty.',
            },
            {
              id: 'confident-end',
              text: 'so moving out feels totally second nature.”',
              tag: 'Future-ready pride',
              note: 'Links daily ownership directly to the independence {name} craves.',
            },
          ],
          deliveryCues: [
            'Use the 4-stage apprenticeship: I do / We do / You do while I watch / You own it',
            'Never rescue a forgotten laundry load or overspent fun budget with irritation, stay warm and neutral',
            'Celebrate every small solo win (“Checked your own tire pressure, official adult badge!”)',
          ],
          pushbacks: [
            {
              id: 'oversleeps',
              label: 'What if {pronoun} genuinely oversleeps and misses the bus on day 2?',
              setup: 'Stay calm and empathetic, let {obj} navigate the ride/tardy solution cleanly.',
              script: '“Oof, rough morning! How do you want to adjust your alarm placement tonight so tomorrow lands smoother?”',
            },
            {
              id: 'broke-day20',
              label: 'What if {pronoun} blows {poss} entire monthly hangout budget in week 2?',
              setup: 'Feed {obj} at home happily, and hold the line on zero extra entertainment bailouts.',
              script: '“Dinner’s always hot at home! Next month’s budget hits on the 1st, want to brainstorm a free hangout idea with friends this weekend?”',
            },
          ],
          advisorPrompt:
            'My {age} teen will be launching into adulthood soon and still relies on me for waking up, laundry, and budgeting. How do I hand over these life skills calmly?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Hand over one full adult domain this week',
          beat4Lead: 'Pick ONE domain to transfer completely, no nagging, no silent take-backs.',
          moves: [
            {
              id: 'retire-human-alarm',
              title: 'Retire from being the human alarm clock',
              desc: 'Hand {name} a reliable alarm clock, wish {obj} goodnight warmly, and let {obj} run mornings independently.',
            },
            {
              id: 'one-walkthrough',
              title: 'Run a 10-minute “We Do” walkthrough',
              desc: 'Pick laundry, basic checking-app review, or car fluids, do it once side-by-side, then hand over the reins.',
            },
            {
              id: 'launch-checklist',
              title: 'Co-build a lighthearted “Adulting Scorecard”',
              desc: 'List 8 real skills (taxes basics, cooking 5 meals, changing a wiper blade, booking appointments) to check off together before graduation.',
            },
          ],
          closingNote:
            'Every small routine you bravely step back from this year becomes solid ground beneath {poss} feet the first morning {pronoun} wakes up in a place of {poss} own.',
          pocketInsight: 'Transfer mornings, laundry, budgets, and logistics one by one now, while safe stumbles still happen under your warm roof.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 3',
            mystery: 'When your teen no longer needs a daily supervisor, how do you build the warm adult friendship you’ll cherish for the next 40 years?',
            title: 'Building the Lifelong Adult-to-Adult Bond Before They Leave Home',
            targetSlug: 'teen-lifelong-adult-friendship-scaffold',
          },
          interactiveHighlights: ['4-domain launch handover timeline', 'CEO-keys transition script'],
        },
      },
      {
        slug: 'teen-lifelong-adult-friendship-scaffold',
        title: 'Building the Lifelong Adult-to-Adult Bond Before They Leave Home',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Emerging adulthood · From hierarchy to lifelong friendship',
          headline: 'Building the Lifelong Adult-to-Adult Bond Before They Leave Home',
          deck: 'Why the final years at home often feel bittersweet and prickly, and how shifting from parental evaluation into genuine curiosity builds a bond that brings {name} happily home for decades.',
          sceneTime: '10:30 AM · SATURDAY COFFEE SHOP',
          sceneBody:
            'Sitting across from {name} at a café, it suddenly hits you how adult {poss} voice, humor, and perspective have become, and how soon {poss} chair at the family table might be empty most weeks. *A quiet ache makes you want to cling tighter or pass down every last piece of life advice, yet what actually pulls a young adult close is feeling deeply respected as an equal human.*',
          pollQuestion: 'What feels hardest as your relationship evolves toward adult-to-adult?',
          pollOptions: [
            {
              id: 'letting-go',
              label: 'Balancing my own bittersweet grief of letting go without guilting {obj}',
              response:
                'Feeling both fierce pride and a lump in your throat is universal, letting {obj} see your steady joy for {poss} future sets {obj} free to fly back warmly!',
            },
            {
              id: 'curiosity',
              label: 'Stopping myself from correcting choices I would have made differently',
              response:
                'Replacing “Here’s how you should do it” with “Tell me what drew you to that!” transforms every conversation overnight.',
            },
          ],
          beat2Kicker: 'Holding tight vs. inviting lifelong closeness',
          beat2Title: 'Emerging adults return gladly to homes where they feel respected, never audited',
          beat2Lead:
            'Psychologist Jeffrey Arnett identified ages 18–25 as “emerging adulthood”, a distinct runway of exploration and becoming. Compare clinging control against the warm Adult-Friendship Guardrail below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Clinging hierarchy vs. adult-to-adult friendship',
          visualStageHint: 'Compare guilt & auditing vs. warm mutual curiosity',
          visualConfig: {
            willpowerLabel: 'Auditing & Guilt Hooks',
            willpowerTitle: 'Treating every check-in like a performance review',
            willpowerDesc:
              'Opening calls with “Why didn’t you call sooner? Are your grades up?” makes young adults dread picking up the phone.',
            willpowerOutcome: 'Polite distant visits and guarded surface updates.',
            guardrailLabel: 'Adult-Friendship Guardrail',
            guardrailTitle: 'Genuine curiosity, mutual humor & zero guilt trips',
            guardrailDesc:
              'Treating {name} with the same warm courtesy you extend to a cherished adult friend, listening deeply and honoring different paths.',
            guardrailOutcome: 'Voluntary Sunday calls, honest stories, and lifelong closeness.',
            environmentShifts: [
              'Retire guilt hooks (“You never spend time with us anymore!”) in favor of warm open invitations.',
              'Ask genuinely curious questions about {poss} music, ideas, politics, and dreams, without correcting.',
              'Share your own real human stories (joys, hobbies, growth) so {name} gets to know YOU as a whole adult too.',
            ],
          },
          almanacTruth:
            'The measure of your parenting isn’t whether your 18-year-old obeys you, it’s whether your 24-year-old genuinely WANTS to grab coffee and tell you about their week.',
          scienceDeepDive:
            'Dr. Jeffrey Jensen Arnett’s lifespan research on emerging adulthood shows that parent-child relationships measurably improve in warmth and honesty when parents pivot from behavioral control to respectful autonomy support and reciprocal adult communication.',
          beat3Kicker: 'Practice over Saturday coffee',
          beat3Title: 'Trade nostalgia guilt for joyful adult curiosity',
          rehearsalTriggerSpeaker: '{Name} sharing a surprising new interest or career pivot that wasn’t in your original plan',
          rehearsalTriggerQuote: '“Honestly, I’m thinking about taking a totally different path than we talked about last year… please don’t freak out.”',
          rehearsalPrompt: 'Which reaction quietly closes the emerging-adult bridge?',
          instincts: [
            {
              id: 'alarm-lecture',
              label: '“What?! After all the work we put into plan A? That sounds way too risky, you haven’t thought this through!”',
              whyTitle: 'Why that’s so tempting, and why teens stop sharing drafts',
              whyText:
                'Reacting with instant alarm teaches {name} to hide big life thoughts until decisions are already locked in.',
            },
            {
              id: 'guilt-pull',
              label: '“Well, it sounds like you’ll be moving even further away from home. I guess I’ll barely see you.”',
              whyTitle: 'Why that’s so tempting, and why it weighs {obj} down',
              whyText:
                'Making your teen responsible for soothing parental loneliness turns launching into a heavy guilt burden.',
            },
          ],
          calmScriptPlain:
            '“Zero freaking out, thank you for trusting me with the real unedited version! I love seeing how thoughtfully you’re figuring out what fits YOU. Tell me what sparked this idea. I’d genuinely love to hear how you’re picturing it.”',
          calmScriptSegments: [
            {
              id: 'safe-landing',
              text: '“Zero freaking out, thank you for trusting me with the real unedited version! ',
              tag: 'Reward candid trust',
              note: 'Reinforces that bringing half-baked ideas to you is always safe.',
            },
            {
              id: 'honor-person',
              text: 'I love seeing how thoughtfully you’re figuring out what fits YOU. ',
              tag: 'Affirm separate identity',
              note: 'Honors {name} as the true author of {poss} own adulthood.',
            },
            {
              id: 'curious-invite',
              text: 'Tell me what sparked this idea. I’d genuinely love to hear how you’re picturing it.”',
              tag: 'Peer-level curiosity',
              note: 'Opens rich adult-to-adult dialogue where your wisdom actually gets invited later.',
            },
          ],
          deliveryCues: [
            'Listen to {poss} passions the way you’d listen to a fascinating friend at dinner',
            'Keep one recurring low-pressure ritual (coffee walk, Sunday text check-in, cooking a favorite dish)',
            'Invest deeply in YOUR own next chapter too, thriving parents make joyful safe harbors!',
          ],
          pushbacks: [
            {
              id: 'pulling-away',
              label: 'What if {name} seems prickly and keeps picking tiny fights right before leaving for college?',
              setup: 'Recognize “soiling the nest”, teens subconsciously create brief friction so saying goodbye hurts less!',
              script: '“Hey, big transitions feel messy for both of us, even when things get prickly, I love who you’re becoming and our door is always wide open.”',
            },
            {
              id: 'when-boundary',
              label: 'Does being an adult friend mean zero house rules while {pronoun} still lives at home?',
              setup: 'Adult roommates still keep respectful shared-home agreements cleanly!',
              script: '“We’re shifting into adult-roommate respect: let us know when you’ll be home for dinner, keep shared spaces tidy, and honor quiet hours.”',
            },
          ],
          advisorPrompt:
            'My {age} teen is getting ready to launch and I want to shift our relationship from strict parenting into a respectful, lasting adult-to-adult bond. Where should I start?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Plant one adult-friendship ritual this week',
          beat4Lead: 'Treat {name} to the quiet joy of being enjoyed as an emerging adult.',
          moves: [
            {
              id: 'coffee-date',
              title: 'Take a zero-agenda coffee or taco walk',
              desc: 'Leave logistics, grades, and chores completely at home, just laugh, swap stories, and ask what {pronoun} {is} excited about.',
            },
            {
              id: 'ask-their-advice',
              title: 'Ask {obj} for real advice on something in YOUR life',
              desc: 'Invite {poss} input on a playlist, tech purchase, recipe, or gift, signaling true adult-to-adult respect.',
            },
            {
              id: 'letter-of-pride',
              title: 'Name three character strengths you admire',
              desc: 'Tell {name} specifically three things you genuinely respect about who {pronoun} {is} becoming as a human being.',
            },
          ],
          closingNote:
            'You did the long, faithful work of raising roots; now stepping beside {name} with open hands and genuine delight invites {obj} to choose your company for the rest of your lives.',
          pocketInsight: 'Retire auditing and guilt hooks, bring genuine curiosity, mutual humor, and room for {name} to author {poss} own story.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Auditing vs. adult-friendship guardrail', 'Zero-freakout curiosity script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 37: Young Adult Health Habits & Honest Safety Talks (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'health-young-adult-wellness',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    developmentalTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    title: 'Young Adult Health Habits & Honest Safety Talks',
    reliefSubtitle:
      'Hand over doctor appointments and prescriptions cleanly, have honest non-preachy alcohol and vaping talks, beat college all-nighters, and create a No-Questions-Asked Ride Home Pact',
    tonightQuickWinTitle: 'Episode 1: Handing Over Appointments, Prescriptions & Everyday Health Ownership',
    summary:
      'Prepare your 16–18-year-old to manage medical appointments, insurance cards, and prescriptions independently, hold candid non-preachy conversations about alcohol and vaping, protect sleep before college or work, and anchor a lifesaving No-Questions-Asked Ride Home Pact.',
    coverImageUrl: 'https://assets.alongside.care/academy/health-young-adult.png',
    sortOrder: 8,
    episodes: [
      {
        slug: 'teen-medical-sovereignty-handover',
        title: 'Handing Over Appointments, Prescriptions & Everyday Health Ownership',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Health handover · Navigating doctors, insurance & self-advocacy',
          headline: 'Handing Over Appointments, Prescriptions & Everyday Health Ownership',
          deck: 'Why thousands of smart 19-year-olds avoid clinics because they’ve never booked an appointment alone, and the 4-step healthcare handover to finish before 18.',
          sceneTime: '2:10 PM · PEDIATRICIAN EXAM ROOM',
          sceneBody:
            'The doctor asks {name} a question about {poss} allergies and sleep, and automatically {pronoun} turns silently to look at you to answer, just like when {pronoun} was seven. *Next year {name} will legally own {poss} own medical privacy, so practicing solo check-ins and prescription pickups right now is pure gold.*',
          pollQuestion: 'Could your teen book a clinic visit and pick up a prescription alone today?',
          pollOptions: [
            {
              id: 'not-yet',
              label: 'Not yet. I still make every appointment and hold the insurance card!',
              response:
                'Super normal, and surprisingly easy to hand over across the next 2–3 checkups so {name} feels completely confident!',
            },
            {
              id: 'phone-shy',
              label: '{Pronoun} feels super awkward calling receptionists or talking to doctors alone',
              response:
                'Phone anxiety is real for this generation, doing one guided call beside you breaks the ice permanently.',
            },
          ],
          beat2Kicker: 'The 4-step healthcare handover',
          beat2Title: 'Practice medical independence while you’re still in the waiting room',
          beat2Lead:
            'Medical independence isn’t just knowing a clinic phone number, it’s knowing your health history, carrying your insurance photo, and speaking comfortably one-on-one with clinicians. Step through the 4 beats below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-step young adult healthcare handover',
          visualStageHint: 'Tap each milestone to build confident health ownership',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Step 1',
                label: 'Health Snapshot',
                title: 'Save allergies, meds & insurance card on {poss} phone',
                desc: 'Create one clean phone note + photo of both sides of the insurance card and family pharmacy number.',
                why: 'Eliminates freeze at the clinic check-in desk.',
              },
              {
                timeOrCue: 'Step 2',
                label: 'Make the Call',
                title: '{Name} calls to book dental or routine wellness visits',
                desc: 'Jot three bullet points on sticky note first (name, DOB, reason, preferred days) while you sit calmly nearby.',
                why: 'One smooth real call kills young-adult phone anxiety fast.',
              },
              {
                timeOrCue: 'Step 3',
                label: 'Solo Exam Time',
                title: 'Step into the waiting room for part (or all) of the visit',
                desc: 'Encourage {name} to bring 2 written questions and speak directly with the clinician confidentially.',
                why: 'Private clinician trust increases honest health disclosures dramatically.',
              },
              {
                timeOrCue: 'Step 4',
                label: 'Pharmacy & Follow-Up',
                title: '{Name} refills prescriptions & asks pharmacist basic questions',
                desc: 'Walk through picking up a prescription, reading basic labels, and knowing when to call a clinic or urgent care.',
                why: 'Prepares {obj} for real dorm, travel, or first-apartment health bumps.',
              },
            ],
          },
          almanacTruth:
            'Handing your 17-year-old their insurance card and letting them speak solo with their doctor isn’t stepping away from caring, it’s training them to advocate for their own body for life.',
          scienceDeepDive:
            'American Academy of Pediatrics and Got Transition healthcare-transition standards recommend gradual adolescent health self-management beginning at ages 14–17, including confidential one-on-one clinician time, personal health summaries, and direct prescription navigation prior to age-18 privacy transitions.',
          beat3Kicker: 'Practice before the next routine visit',
          beat3Title: 'Coach clinic confidence without taking over the microphone',
          rehearsalTriggerSpeaker: '{Name} handing you the phone nervously before calling the dentist or doctor',
          rehearsalTriggerQuote: '“Ugh, making phone calls is so awkward, can’t you just call and book it for me?”',
          rehearsalPrompt: 'Which reaction delays real adult health confidence?',
          instincts: [
            {
              id: 'do-it-fast',
              label: '“Hand it here, I’ll just do it in two minutes, it’s way faster.”',
              whyTitle: 'Why that’s so tempting, and what it postpones',
              whyText:
                'Saving two minutes today leaves your 19-year-old putting off needed care later out of simple unfamiliarity.',
            },
            {
              id: 'mock-shy',
              label: '“Seriously? You’re seventeen and scared of a receptionist? Grow up!”',
              whyTitle: 'Why that’s so tempting, and why it deepens avoidance',
              whyText:
                'Shaming phone jitters spikes self-consciousness instead of making the call feel simple and doable.',
            },
          ],
          calmScriptPlain:
            '“Calling offices feels weirdly awkward for almost everyone the first few times! Let’s scribble your birthday and two open afternoons right here. I’ll sit quietly beside you while you dial, and once you hang up you’ll be amazed how fast it is.”',
          calmScriptSegments: [
            {
              id: 'normalize-awkward',
              text: '“Calling offices feels weirdly awkward for almost everyone the first few times! ',
              tag: 'Take out the shame',
              note: 'Normalizes phone jitters so {name} feels supported, not judged.',
            },
            {
              id: 'prep-bullets',
              text: 'Let’s scribble your birthday and two open afternoons right here, ',
              tag: 'Low-friction cheat sheet',
              note: 'Having exact facts visible eliminates mid-call blanks.',
            },
            {
              id: 'silent-backup',
              text: 'I’ll sit quietly beside you while you dial, and once you hang up you’ll be amazed how fast it is.”',
              tag: 'Calm scaffolding',
              note: 'Offers comforting presence while {name} earns the solo win.',
            },
          ],
          deliveryCues: [
            'During appointments, politely say “I’ll step out to the lobby so you two can chat privately, text me if you need me!”',
            'Keep basic over-the-counter comfort items familiar and always follow clinician/pharmacist guidance',
            'Never share private medical expectations guiltily, normalize confidential adult healthcare proudly',
          ],
          pushbacks: [
            {
              id: 'emergency-info',
              label: 'What about legal privacy forms once {pronoun} turns 18?',
              setup: 'Talk openly and calmly about optional emergency-contact/HIPAA release choices without pressure.',
              script: '“At 18 your medical records become 100% legally private, we can also chat calmly before college about listing me as an emergency contact if you ever want backup in a pinch.”',
            },
            {
              id: 'forgets-meds',
              label: 'What if {pronoun} takes a daily prescription and keeps forgetting refills?',
              setup: 'Pair auto-refill pharmacy texts with a daily phone reminder owned by {name}.',
              script: '“Let’s put the pharmacy refill app straight on YOUR phone with a 7-day buffer alert so you never get caught short.”',
            },
          ],
          advisorPrompt:
            'My {age} teen is approaching 18 and I want to hand over booking appointments, insurance info, and healthcare navigation smoothly. What steps should we cover?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Complete one healthcare handover step this week',
          beat4Lead: 'Turn “Mom/Dad handles all doctor stuff” into proud solo readiness.',
          moves: [
            {
              id: 'health-card-phone',
              title: 'Create the “Health Essentials” phone note',
              desc: 'Save photos of the insurance card (front/back), primary doctor, dentist, pharmacy, allergies, and current meds together.',
            },
            {
              id: 'solo-booking',
              title: 'Let {name} book the very next routine visit',
              desc: 'Hand over the sticky-note script and let {obj} schedule the next dental cleaning, eye check, or physical.',
            },
            {
              id: 'lobby-stepout',
              title: 'Step into the lobby for solo clinician time',
              desc: 'Normalize confidential doctor-patient dialogue starting at the very next appointment.',
            },
          ],
          closingNote:
            'Equipping your teen to walk calmly into a clinic, speak up clearly, and manage their own care is practical love that protects them long after they leave home.',
          pocketInsight: 'Save insurance & health basics on {poss} phone, coach the first appointment call, and step out for solo doctor time.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 2',
            mystery: 'Why do scare-tactic lectures about vaping and alcohol bounce right off 17-year-olds, and what honest conversation actually protects them?',
            title: 'Honest, Non-Preachy Conversations About Alcohol & Vaping',
            targetSlug: 'teen-substance-safety-and-harm-reduction',
          },
          interactiveHighlights: ['4-step healthcare handover timeline', 'Phone-call coaching script'],
        },
      },
      {
        slug: 'teen-substance-safety-and-harm-reduction',
        title: 'Honest, Non-Preachy Conversations About Alcohol & Vaping',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Real talk over scare tactics · Brain facts + zero-preach honesty',
          headline: 'Honest, Non-Preachy Conversations About Alcohol & Vaping',
          deck: 'Why exaggerated scare speeches lose instant credibility with 16–18-year-olds, and how calm, science-grounded realism keeps {name} safe and honest with you.',
          sceneTime: '6:15 PM · DRIVING PAST A HIGH SCHOOL PARTY SPOT',
          sceneBody:
            'Your teen casually mentions that half the locker room vapes in the bathroom and older kids brought drinks to Friday’s bonfire. *Your stomach drops, and part of you wants to launch into a terrifying warning speech, yet you know one preachy monologue will make {name} smile politely and never tell you the truth about a weekend party again.*',
          pollQuestion: 'What worries you most about talking openly about alcohol, nicotine, or cannabis?',
          pollOptions: [
            {
              id: 'sound-permissive',
              label: 'Wondering how to stay honest and non-preachy WITHOUT sounding like I approve',
              response:
                'You can hold crystal-clear health values AND keep total emotional safety, teens respect calm clarity ten times more than fear speeches!',
            },
            {
              id: 'shut-out',
              label: 'Fear that lecturing will drive {obj} to hide risky situations instead of calling me',
              response:
                'Spot on! Protecting your status as the #1 safe person {name} calls in a tough spot is the strongest real-world shield you have.',
            },
          ],
          beat2Kicker: 'The honest safety dialogue loop',
          beat2Title: 'Treat your teen like a smart adult weighing real brain facts',
          beat2Lead:
            'Late teens spot exaggerated fear tactics in two seconds and tune out completely. Straightforward facts, like how rapidly nicotine wires addiction into still-developing reward pathways, and how clear values pair with safety plans, earn genuine respect. Explore the 3-beat loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat zero-preach safety conversation',
          visualStageHint: 'Tap each beat to hold clear boundaries while keeping trust wide open',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Ask curious first',
                label: 'Hear {Possessive} World',
                quote: '“What are you actually seeing at school or parties lately? How do kids handle the pressure?”',
                desc: 'Start with calm curiosity rather than assumptions so {name} doesn’t feel on trial.',
                brainNote: 'Curiosity keeps prefrontal judgment open instead of defensive hiding.',
              },
              {
                stepNum: '02',
                actor: 'Share plain facts + values',
                label: 'Clear Science, Zero Hype',
                quote: '“Here’s why waiting matters to your brain, and where our family stands, no melodrama.”',
                desc: 'Explain cleanly that nicotine pods deliver high-dose spikes that hook young dopamine circuits fast, and that alcohol/THC hit developing brains far harder than adult brains.',
                brainNote: 'Respectful truth-telling builds credible internal judgment.',
              },
              {
                stepNum: '03',
                actor: 'Co-design exit plans',
                label: 'Real-World Safety Tools',
                quote: 'Rehearse casual declines + guarantee a zero-judgment rescue ride anytime',
                desc: 'Pair clear expectations (“don’t drive impaired, don’t ride with impaired drivers”) with practical exit scripts.',
                brainNote: 'Concrete plans protect teens when Friday-night peer pressure peaks.',
              },
            ],
          },
          almanacTruth:
            'Teens don’t tune out parents because parents have clear standards, they tune out when fear turns a respectful conversation into a courtroom lecture.',
          scienceDeepDive:
            'Adolescent substance-prevention research from NIDA and the AAP demonstrates that authoritative parent communication, combining clear non-use expectations, accurate neurodevelopmental facts (higher adolescent addiction vulnerability while prefrontal-striatal circuits mature), and open non-punitive safety planning, significantly reduces risky use compared with fear-based lecturing.',
          beat3Kicker: 'Practice during a casual drive',
          beat3Title: 'Hold clear health values while keeping the lifeline wide open',
          rehearsalTriggerSpeaker: '{Name} casually testing your reaction to party drinking or vaping',
          rehearsalTriggerQuote: '“Honestly everyone vapes or tries drinks before college, it’s not like it’s a big deal.”',
          rehearsalPrompt: 'Which reaction instantly closes down future honesty?',
          instincts: [
            {
              id: 'interrogate',
              label: '“Wait, ARE YOU VAPING?! Empty your backpack right now! You’re grounded till graduation!”',
              whyTitle: 'Why that’s so tempting, and why kids go dark',
              whyText:
                'Instant room searches over a casual comment ensure {name} never brings up party realities around you again.',
            },
            {
              id: 'shrug-cool',
              label: '“Haha yeah, I did crazy stuff in high school too, just don’t get caught!”',
              whyTitle: 'Why that’s so tempting, and what it drops',
              whyText:
                'Teens actually want steady adult clarity, glamorizing old risks removes a protective anchor they quietly lean on.',
            },
          ],
          calmScriptPlain:
            '“It really does feel like it’s everywhere in high school. I’m not going to give you a cheesy scare speech, here’s the straight reality: nicotine vapes are engineered to hook developing brains way faster than older adults, and mixing alcohol with driving or bad situations goes sideways fast. My hope is you hold off and keep a clear head, and if you or a friend EVER end up in over your head, call me first, zero yelling.”',
          calmScriptSegments: [
            {
              id: 'drop-scare',
              text: '“It really does feel like it’s everywhere in high school. I’m not going to give you a cheesy scare speech, ',
              tag: 'Drop melodrama',
              note: 'Signals adult-to-adult honesty so {name} actually listens.',
            },
            {
              id: 'real-science',
              text: 'here’s the straight reality: nicotine vapes are engineered to hook developing brains way faster than older adults, and mixing alcohol with driving or bad situations goes sideways fast. ',
              tag: 'Plain, credible facts',
              note: 'Focuses on manipulation by nicotine marketers and real-world safety, angles teens genuinely respect.',
            },
            {
              id: 'values-plus-lifeline',
              text: 'My hope is you hold off and keep a clear head, and if you or a friend EVER end up in over your head, call me first, zero yelling.”',
              tag: 'Clear value + ironclad lifeline',
              note: 'Holds your standard warmly while ensuring safety always outranks fear of punishment.',
            },
          ],
          deliveryCues: [
            'Highlight how Big Vape targets teen attention, teens HATE being manipulated by corporations!',
            'Keep talks short, ongoing, and conversational (5 minutes in the car beats one awkward 60-minute summit)',
            'If you suspect active dependence or frequent use, partner calmly with your pediatrician or an adolescent counselor rather than fighting alone',
          ],
          pushbacks: [
            {
              id: 'parent-past',
              label: 'What if {pronoun} asks straight out: “Did YOU drink or smoke in high school?”',
              setup: 'Stay honest without glorifying, focus on what science knows today.',
              script: '“Honest answer: I made a couple choices back then I’m glad turned out okay, AND today’s concentrated vapes and THC products are completely different, plus we know way more about brain wiring now.”',
            },
            {
              id: 'already-tried',
              label: 'What if {name} admits {pronoun} already tried a friend’s vape once?',
              setup: 'Thank {obj} for telling the truth FIRST, then talk calmly about how to step off before hooks set in.',
              script: '“Thank you for being straight with me, that takes real guts. How did it feel, and what’s your plan next time someone passes one at a party?”',
            },
          ],
          advisorPrompt:
            'I want to talk honestly with my {age} teen about vaping, alcohol, and party safety without lecturing or losing {poss} trust. What approach works best?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Open one low-pressure, honest safety talk this week',
          beat4Lead: 'Trade silence or scare speeches for five calm minutes of real talk.',
          moves: [
            {
              id: 'curious-opener',
              title: 'Start with one open car-ride question',
              desc: 'Ask calmly: “What’s the real vibe with vaping or parties at school right now?” and listen without interrupting.',
            },
            {
              id: 'casual-decline',
              title: 'Brainstorm two effortless turn-down lines',
              desc: 'Practice zero-awkwardness lines teens actually use (“Nah I’m driving tonight” / “Sports coach tests/lungs hate it” / “I’m good, grabbed a soda”).',
            },
            {
              id: 'friend-safety',
              title: 'Review “how to help a friend” basics',
              desc: 'Talk calmly about never leaving a dizzy or sick friend alone, always calling a trusted adult or emergency services immediately without hesitation.',
            },
          ],
          closingNote:
            'Your calm honesty, respecting your teen’s intelligence while standing rock-steady on safety, is the voice that quietly echoes in {poss} mind when the Friday night music gets loud.',
          pocketInsight: 'Skip scare tactics: listen curiously, share straight brain facts (especially anti-manipulation around vaping), and keep the lifeline wide open.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 3',
            mystery: 'Before dorm life or early job shifts hit, how does your teen beat the brutal all-nighter cycle and protect real energy?',
            title: 'Beating All-Nighters & Protecting Sleep Before College or Work',
            targetSlug: 'teen-circadian-recalibration-university',
          },
          interactiveHighlights: ['3-beat zero-preach dialogue loop', 'Honest safety & lifeline script'],
        },
      },
      {
        slug: 'teen-circadian-recalibration-university',
        title: 'Beating All-Nighters & Protecting Sleep Before College or Work',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Own your clock · Sleep as performance edge, not curfew',
          headline: 'Beating All-Nighters & Protecting Sleep Before College or Work',
          deck: 'Why lecturing an 17-year-old about bedtime fails, and how reframing sleep as their secret memory, athletic, and mood edge helps {name} own {poss} own clock.',
          sceneTime: '1:45 AM · GLOWING LAPTOP UNDER THE DOOR',
          sceneBody:
            'You notice light spilling under {poss} door at nearly two in the morning, again. {Name} is cramming AP history flashcards with an iced coffee beside {obj}, swearing “I’ll just sleep all day Saturday!” *You can’t enforce a 10 PM curfew in a college dorm or first apartment, so right now is the moment to hand {obj} the real science of owning {poss} own sleep.*',
          pollQuestion: 'What wrecks your older teen’s sleep rhythm most right now?',
          pollOptions: [
            {
              id: 'cramming',
              label: 'Late-night studying, part-time work shifts, and weekend 2 PM wake-ups',
              response:
                'Big Friday-to-Monday wake swings give teens permanent weekly jet lag, anchoring wake time + morning light resets energy fast.',
            },
            {
              id: 'revenge-scroll',
              label: 'Midnight “revenge scrolling” after exhausting packed days',
              response:
                'When days feel overscheduled, midnight becomes the only time that feels theirs, protecting a real 30-minute evening unwind fixes it gently.',
            },
          ],
          beat2Kicker: 'The young-adult energy curve',
          beat2Title: 'All-nighters literally erase the memory you stayed up to study',
          beat2Lead:
            'Sleep isn’t lazy downtime, it is when the hippocampus hits “Save” on everything studied today and clears emotional stress. Tap each point on the young-adult circadian curve below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'The young-adult sleep & memory performance curve',
          visualStageHint: 'Tap each anchor point to reclaim real daytime energy',
          visualConfig: {
            stages: [
              {
                time: 'Wake +15m',
                label: 'Sunlight Anchor',
                level: 24,
                title: 'Consistent wake time beats perfectionist bedtimes',
                desc: 'Getting outdoor light within 20 minutes of waking anchors the entire 24-hour clock, even on weekends (within ~90 min).',
                tip: 'Coffee tastes better on the porch or near a sunny window!',
              },
              {
                time: '2:00 PM',
                label: 'Caffeine Cutoff',
                level: 50,
                title: 'Afternoon iced coffee & energy drinks linger past midnight',
                desc: 'Caffeine’s half-life runs 5–7 hours, a 4 PM latte leaves half its punch blocking deep sleep at 11 PM.',
                tip: 'Keep caffeine strictly before 2 PM; switch to cold water or a brisk walk for late-day focus.',
              },
              {
                time: '10:30 PM',
                label: 'Memory Save',
                level: 80,
                title: 'Sleeping 7.5–9 hours outperforms cramming every single time',
                desc: 'Studying until midnight and sleeping 8 hours produces ~40% stronger test recall than an all-nighter.',
                tip: 'Review toughest notes for 15 minutes right before sleep, your brain consolidates them overnight.',
              },
              {
                time: '5:00 AM',
                label: 'Dawn REM Boost',
                level: 95,
                title: 'The final 2 hours of sleep carry peak mood & creative insight',
                desc: 'Cutting sleep from 8 hours to 6 doesn’t cut 25% of REM, it cuts nearly 60% of emotional reset!',
                tip: 'Protect the final stretch of morning rest, it’s built-in anxiety protection.',
              },
            ],
          },
          almanacTruth:
            'An all-nighter doesn’t buy your teen extra study hours, it deletes nearly 40% of the brain’s ability to save facts AND doubles next-day anxiety.',
          scienceDeepDive:
            'Sleep neuroscience led by Dr. Matthew Walker demonstrates that hippocampal-to-neocortical memory transfer happens during slow-wave and REM sleep; even a single night of severe sleep loss degrades new learning capacity by up to 40% and spikes amygdala emotional reactivity by ~60%.',
          beat3Kicker: 'Practice over morning coffee',
          beat3Title: 'Pivot from bedtime enforcement to sharing real performance science',
          rehearsalTriggerSpeaker: '{Name} yawning over breakfast after a 2 AM study/scroll night',
          rehearsalTriggerQuote: '“Ugh, I’m dead tired. I just couldn’t get started until midnight and now I feel awful.”',
          rehearsalPrompt: 'Which morning comment wastes the teachable moment?',
          instincts: [
            {
              id: 'told-you',
              label: '“I TOLD you to go to bed at 10:30! You never listen and then complain all morning!”',
              whyTitle: 'Why that’s so tempting, and why {pronoun} shuts down',
              whyText:
                '“I told you so” makes a 17-year-old defend staying up late just to prove independence.',
            },
            {
              id: 'phone-grab',
              label: '“That’s it. I’m shutting off the Wi-Fi at 9:30 PM like when you were twelve!”',
              whyTitle: 'Why that’s so tempting, and why it fails at launch',
              whyText:
                'At 17–18, sudden Wi-Fi lockouts breed resentment instead of internal sleep stewardship for dorm life.',
            },
          ],
          calmScriptPlain:
            '“Oof, running on five hours feels brutal. I hate that foggy headache too. Want to hear one wild study hack I learned? Your brain actually saves way more exam material during 8 hours of sleep than during a 2 AM cram, plus keeping caffeine before 2 PM makes falling asleep ten times easier. Want to experiment with a shutdown alarm together this week?”',
          calmScriptSegments: [
            {
              id: 'empathize-fog',
              text: '“Oof, running on five hours feels brutal. I hate that foggy headache too. ',
              tag: 'Zero I-told-you-so',
              note: 'Meets morning exhaustion with warmth instead of smugness.',
            },
            {
              id: 'edge-science',
              text: 'Want to hear one wild study hack I learned? Your brain actually saves way more exam material during 8 hours of sleep than during a 2 AM cram, plus keeping caffeine before 2 PM makes falling asleep ten times easier. ',
              tag: 'Frame as performance edge',
              note: 'Teens care deeply about grades, sports, skin, mood, and energy, sleep fuels all five!',
            },
            {
              id: 'self-experiment',
              text: 'Want to experiment with a shutdown alarm together this week?”',
              tag: 'Invite self-designed habit',
              note: 'Lets {name} build {poss} own portable sleep routine before moving out.',
            },
          ],
          deliveryCues: [
            'Link sleep to goals {name} genuinely cares about (reaction time, athletic recovery, calmer mood, faster studying)',
            'Normalize setting a personal “bedtime reminder” on {poss} own phone, like a pro athlete',
            'If chronic insomnia or severe daytime exhaustion persists, encourage a calm visit with a physician',
          ],
          pushbacks: [
            {
              id: 'dorm-roommate',
              label: 'What if {pronoun} worries dorm roommates or late shifts will wreck sleep anyway?',
              setup: 'Pack a simple $25 “dorm sleep kit” (breathable eye mask, soft earplugs, warm lamp)!',
              script: '“Pro move for dorms or apartments: a great eye mask, fan/white noise, and a gentle sunrise alarm protect your sleep anywhere!”',
            },
            {
              id: 'cant-fall-asleep',
              label: 'What if {pronoun} gets in bed early and just stares at the ceiling?',
              setup: 'Share the 20-minute rule: step out briefly with dim warm light and a paper book instead of grabbing a glowing phone.',
              script: '“If sleep doesn’t hit in 20 minutes, skip scrolling, sit in warm lamp light with a chill book until eyelids droop so your bed stays wired for sleep.”',
            },
          ],
          advisorPrompt:
            'My {age} teen keeps pulling late-night study and scrolling sessions before heading off to college/work. How do I help {obj} take ownership of healthy sleep without nagging?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Invite one self-owned sleep upgrade this week',
          beat4Lead: 'Hand {name} a sleep habit that travels straight into adulthood.',
          moves: [
            {
              id: 'caffeine-2pm',
              title: 'Try the 5-day “2 PM Caffeine Cutoff” test',
              desc: 'Challenge each other to skip afternoon coffee/energy drinks for 5 days and compare how fast sleep arrives.',
            },
            {
              id: 'weekend-anchor',
              title: 'Protect a 90-minute weekend wake buffer',
              desc: 'Let {name} sleep in a little on weekends, just not 4 hours past weekday wake-up, so Monday stops feeling like jet lag.',
            },
            {
              id: 'dorm-sleep-kit',
              title: 'Build a portable personal sleep kit',
              desc: 'Pick out a comfortable eye mask, dim warm reading light, or sunrise clock {name} can take straight to a dorm or apartment.',
            },
          ],
          closingNote:
            'Helping your 17-year-old discover how unstoppable they feel after a real week of sleep gives them a lifelong compass long after your curfew ends.',
          pocketInsight: 'Retire bedtime nagging: share memory/mood sleep science, test a 2 PM caffeine cutoff, and anchor morning light.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 4',
            mystery: 'What single 2-minute safety pact has saved countless teens from getting into dangerous cars on Friday nights?',
            title: 'Creating an Emergency “No-Questions-Asked Ride Home” Pact',
            targetSlug: 'teen-no-questions-ride-home-pact',
          },
          interactiveHighlights: ['4-anchor young-adult sleep curve', 'Zero-lecturing performance script'],
        },
      },
      {
        slug: 'teen-no-questions-ride-home-pact',
        title: 'Creating an Emergency “No-Questions-Asked Ride Home” Pact',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Lifesaving lifeline · Safety always outranks being in trouble',
          headline: 'Creating an Emergency “No-Questions-Asked Ride Home” Pact',
          deck: 'Why fear of getting grounded makes scared teens climb into unsafe cars, and how an ironclad “No-Questions-Asked Ride Home” Pact saves lives without eroding accountability.',
          sceneTime: '11:45 PM · FRIDAY NIGHT PHONE BUZZ',
          sceneBody:
            'Picture {name} at 11:45 PM at a party across town: the friend who drove them just drank way too much, the vibe turned sketchy, and {name}’s heart is racing. *In that exact split second, one question decides whether {pronoun} climbs into a dangerous car or dials your number: “If I call Mom/Dad right now, will I get yelled at and punished, or brought home safe?”*',
          pollQuestion: 'Does your teen know, with 100% certainty, you will pick {obj} up at 2 AM with zero anger?',
          pollOptions: [
            {
              id: 'implied',
              label: 'I hope {pronoun} knows it, though we’ve never stated it explicitly as a pact',
              response:
                'Saying it clearly out loud, and pairing it with a discreet 1-character text code, turns a vague assumption into an unbreakable safety lifeline!',
            },
            {
              id: 'yes-clear',
              label: 'Yes, and I love knowing how to hold the no-lecture promise cleanly when it’s used',
              response:
                'Keeping your calm the very first time that lifeline rings proves your word is gold forever!',
            },
          ],
          beat2Kicker: 'Punishment fear vs. lifesaving lifeline',
          beat2Title: 'When safety is on the line, calling home must ALWAYS feel 100% safe',
          beat2Lead:
            'Even thoughtful 17-year-olds sometimes misjudge plans or get stranded by a peer’s bad decision. Compare fear-based curfews against the No-Questions-Asked Ride Home Guardrail below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Fear of trouble vs. No-Questions-Asked Ride Home Pact',
          visualStageHint: 'Compare punitive panic vs. ironclad safety lifeline',
          visualConfig: {
            willpowerLabel: 'Fear of Punishment',
            willpowerTitle: '“If you’re ever at a party with drinking, you’re grounded!”',
            willpowerDesc:
              'When calling a parent means immediate shouting, grounding, or taking the car, panicking teens try to “handle it themselves”, often with devastating consequences.',
            willpowerOutcome: 'Teens hiding danger or riding with impaired drivers.',
            guardrailLabel: 'Ride-Home Lifeline Pact',
            guardrailTitle: 'Zero yelling, zero grounding, zero midnight lectures, ever',
            guardrailDesc:
              'One agreed code emoji or call summons you (or a pre-authorized rideshare) immediately with warm relief, a bottle of water, and a calm blanket.',
            guardrailOutcome: 'Teens calling home early before small messes become tragedies.',
            environmentShifts: [
              'Pick a 1-character rescue text code (e.g., “X” or a single pizza emoji) so {name} doesn’t even have to explain in front of peers.',
              'Extend the pact to {poss} friends too, plus a backup trusted adult if you’re ever out of town.',
              'Keep your phone on “Emergency Bypass” for {name}’s contact overnight so calls ALWAYS ring through.',
            ],
          },
          almanacTruth:
            'The single night your teen tests your No-Questions-Asked Ride Home Pact is the night your calm silence in the front seat cements trust for life.',
          scienceDeepDive:
            'Adolescent injury-prevention studies and SADD/AAP family-safety guidance consistently emphasize that guaranteed non-punitive parent pickup agreements dramatically reduce adolescent riding with impaired drivers and increase early help-seeking during high-risk peer situations.',
          beat3Kicker: 'Practice on a calm Sunday evening',
          beat3Title: 'Make the lifeline explicit, unforgettable, and unbreakable',
          rehearsalTriggerSpeaker: '{Name} testing whether you really mean “no questions asked”',
          rehearsalTriggerQuote: '“Wait, seriously? Even if I wasn’t supposed to be at that party, you wouldn’t ground me if I called for a ride?”',
          rehearsalPrompt: 'Which caveat accidentally ruins the lifeline?',
          instincts: [
            {
              id: 'fine-print',
              label: '“Well, I’ll pick you up safely, and THEN tomorrow morning we’re definitely grounding you for lying!”',
              whyTitle: 'Why that’s so tempting, and why it destroys the pact',
              whyText:
                'Adding “delayed punishment tomorrow” means {name} STILL weighs getting grounded against climbing into an unsafe car.',
            },
            {
              id: 'interrogate-car',
              label: '“Sure, just as long as you tell me who was drinking and whose parents weren’t home!”',
              whyTitle: 'Why that’s so tempting, and why teens hesitate to call',
              whyText:
                'Turning the rescue ride into a midnight snitching interrogation breaks the exact safety promise.',
            },
          ],
          calmScriptPlain:
            '“Zero fine print, seriously. Even if it’s 2 AM, even if you weren’t supposed to be there, even if your friend needs a ride too: text me our code X and I’m coming with zero yelling, zero midnight quiz, and zero punishment. Your life and safety are infinitely bigger than any curfew rule, and if you want to talk about it days later, that’s up to you.”',
          calmScriptSegments: [
            {
              id: 'no-fine-print',
              text: '“Zero fine print, seriously. Even if it’s 2 AM, even if you weren’t supposed to be there, even if your friend needs a ride too: ',
              tag: 'Eliminate hesitation',
              note: 'Covers the exact worst-case fears that stop teens from dialing.',
            },
            {
              id: 'code-action',
              text: 'text me our code X and I’m coming with zero yelling, zero midnight quiz, and zero punishment. ',
              tag: 'Ironclad promise',
              note: 'Guarantees emotional and practical safety on contact.',
            },
            {
              id: 'love-priority',
              text: 'Your life and safety are infinitely bigger than any curfew rule, and if you want to talk about it days later, that’s up to you.”',
              tag: 'Unconditional priority',
              note: 'Engraves forever that bringing {obj} home whole beats everything.',
            },
          ],
          deliveryCues: [
            'Set {name}’s contact to Emergency Bypass on your phone right now while sitting together',
            'If {name} EVER uses the code, greet {obj} with “I’m so glad you called. Climb in, grab some water” and keep your promise 100%',
            'Include a pre-authorized family rideshare card as Backup #2 if you’re away or unable to drive',
          ],
          pushbacks: [
            {
              id: 'abuse-pact',
              label: 'What if I worry {pronoun} will abuse the pact to break curfew every weekend?',
              setup: 'In reality teens almost NEVER abuse a true safety lifeline, and smart judgment calls deserve praise!',
              script: '“Making the mature call to leave an unsafe scene IS responsible adulthood. I’d pick you up ten times over before risking one bad ride.”',
            },
            {
              id: 'blame-call',
              label: 'Can the code also trigger a fake “angry parent” phone call to rescue {obj} smoothly?',
              setup: 'YES, that lets {name} leave awkward parties without losing face!',
              script: '“If you text X, I’ll call in 30 seconds and say ‘Hey, I need you home right now, I’m pulling up outside’, zero social awkwardness!”',
            },
          ],
          advisorPrompt:
            'I want to set up an ironclad “No-Questions-Asked Ride Home” safety pact with my {age} teen before weekend driving and parties ramp up. What details make it bulletproof?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Lock in your Ride-Home Lifeline Pact tonight',
          beat4Lead: 'Takes three minutes tonight, could save a life this year.',
          moves: [
            {
              id: 'choose-code',
              title: 'Pick your 1-character rescue text code',
              desc: 'Agree right now on one effortless text (“X” or an emoji) that means “Call me with a fake excuse and come grab me, no questions asked.”',
            },
            {
              id: 'emergency-bypass',
              title: 'Enable Emergency Bypass on your phone',
              desc: 'Open {name}’s contact card on your phone and enable Emergency Bypass so {poss} call rings loudly even on Do Not Disturb.',
            },
            {
              id: 'backup-driver',
              title: 'Add a backup rideshare / trusted aunt/uncle',
              desc: 'Set up a backup safe driver or family rideshare account so {name} is never stranded even when you’re traveling.',
            },
          ],
          closingNote:
            'Few gifts in all of parenting carry more quiet power than your 17-year-old knowing in their bones: no matter the hour or the mistake, one text brings you straight to the curb with open arms.',
          pocketInsight: 'Set a 1-character rescue code, enable Emergency Bypass, and keep your zero-yelling, zero-punishment ride-home promise 100%.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Lifeline vs. punishment guardrail', 'Zero-fine-print ride-home script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 38: Feeding Yourself Independently & Food-Mood Basics (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'nutrition-teen-food-sovereignty',
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    developmentalTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    title: 'Feeding Yourself Independently & Food-Mood Basics',
    reliefSubtitle:
      'Master the 20-minute first-apartment grocery run, understand how skipped meals and everyday food shape teen mood, and lock in 30-minute Sunday prep with lifelong body trust',
    tonightQuickWinTitle: 'Episode 1: The 20-Minute First-Apartment Grocery Run',
    summary:
      'Turn grocery shopping from intimidating guesswork into a repeatable 20-minute budget system, decode how everyday meals and skipped lunches directly shape late-teen mood and focus, and combine effortless 30-minute Sunday batch prep with lifelong intuitive hunger trust.',
    coverImageUrl: 'https://assets.alongside.care/academy/nutrition-teen.png',
    sortOrder: 8,
    episodes: [
      {
        slug: 'teen-budget-grocery-survival',
        title: 'The 20-Minute First-Apartment Grocery Run',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: '20-minute grocery map · Real food on a starter budget',
          headline: 'The 20-Minute First-Apartment Grocery Run',
          deck: 'Why new college students blow $80 on random snacks and still feel like there’s “nothing to eat”, and the dead-simple 4-zone shopping loop that feeds a young adult cleanly all week.',
          sceneTime: '4:30 PM · SUPERMARKET ENTRANCE',
          sceneBody:
            'You hand {name} $45 and ask {obj} to shop for three days of breakfasts, lunches, and dinners. Ten minutes later {pronoun} wanders back looking overwhelmed with overpriced smoothie bottles, a box of protein bars, and a bag of chips, and zero actual meals. *Grocery shopping isn’t instinctive; one fun 20-minute walkthrough unlocks it for life.*',
          pollQuestion: 'Has your teen ever planned and shopped a real multi-day grocery cart on a budget?',
          pollOptions: [
            {
              id: 'never',
              label: 'Not yet, supermarket aisles feel like a maze to {obj}!',
              response:
                'Super normal! Teaching the simple “5-4-3-2-1 Formula” makes a 20-minute grocery trip effortless on any starter budget.',
            },
            {
              id: 'takeout',
              label: '{Pronoun} defaults straight to pricey delivery apps whenever hungry',
              response:
                'Comparing one $22 delivery order against 4 hearty home meals usually sparks immediate lightbulb eyes in a 17-year-old!',
            },
          ],
          beat2Kicker: 'The 20-minute starter grocery loop',
          beat2Title: 'Shop four simple zones instead of wandering 18 noisy aisles',
          beat2Lead:
            'Young adults thrive with a repeatable template rather than complicated 20-ingredient gourmet recipes. Walk through the 4-zone starter grocery run below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 20-minute first-apartment grocery loop',
          visualStageHint: 'Tap each zone to build a fast, affordable weekly cart',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Zone 1',
                label: '3 Easy Proteins',
                title: 'Eggs, rotisserie/tofu/beans, Greek yogurt or ground meat',
                desc: 'Pick three versatile staples that cook in under 10 minutes and keep hunger steady for hours.',
                why: 'Anchoring protein stops $15 panic-takeout at 8 PM.',
              },
              {
                timeOrCue: 'Zone 2',
                label: '4 Produce Picks',
                title: '2 fresh fruits + 2 zero-fuss veggies (bagged greens, frozen broccoli)',
                desc: 'Frozen veggies are flash-frozen at peak nutrition, never rot in the crisper, and cost half as much!',
                why: 'Cuts food waste to near zero in a small fridge.',
              },
              {
                timeOrCue: 'Zone 3',
                label: '2 Smart Bases',
                title: 'Oats, rice, tortillas, pasta, or whole-grain bread',
                desc: 'Combine any Base + Protein + Veggie + Sauce for 12 instant zero-recipe meals.',
                why: 'Modular staples beat single-use ingredients every time.',
              },
              {
                timeOrCue: 'Zone 4',
                label: 'Unit-Price Check',
                title: 'Check the tiny “price per ounce” tag + grab 1 fun treat',
                desc: 'Comparing store-brand unit prices saves ~25% automatically, leaving room for one joy food guilt-free.',
                why: 'Smart unit-price scanning pays off for the next 60 years.',
              },
            ],
          },
          almanacTruth:
            'A 17-year-old who learns the modular Base + Protein + Veggie + Sauce grocery formula never goes broke on delivery apps or starves on instant noodles.',
          scienceDeepDive:
            'Emerging-adult food-literacy studies demonstrate that hands-on grocery navigation, unit-price comparison, and modular meal assembly learned prior to leaving home substantially improve diet quality and reduce food insecurity during college and early independent living.',
          beat3Kicker: 'Practice in the produce aisle',
          beat3Title: 'Make grocery budgeting a fun game, not an economics lecture',
          rehearsalTriggerSpeaker: '{Name} tossing $7 convenience snacks into the cart without checking prices',
          rehearsalTriggerQuote: '“Wait, groceries are SO expensive, how does anyone afford real food on a student budget?!”',
          rehearsalPrompt: 'Which store reply turns a great real-world moment boring?',
          instincts: [
            {
              id: 'lecture-costs',
              label: '“NOW you see how hard I work to feed you! Put those back and grab the cheapest bag!”',
              whyTitle: 'Why that’s so tempting, and why {pronoun} zones out',
              whyText:
                'Guilt speeches about household bills steal the spark of discovering smart money tricks.',
            },
            {
              id: 'take-cart',
              label: '“Don’t worry about prices yet, just push the cart while I grab everything.”',
              whyTitle: 'Why that’s so tempting, and what it misses',
              whyText:
                'Shielding {obj} from unit prices misses the easiest live classroom you’ll ever get.',
            },
          ],
          calmScriptPlain:
            '“Wild sticker shock, right? Here’s the best supermarket cheat code: ignore the big price and look at the tiny price-per-ounce corner right here, store-brand oats and frozen veggies cost one-third as much for the exact same food! Want $50 to run the cart solo for our next three family dinners?”',
          calmScriptSegments: [
            {
              id: 'cheat-code',
              text: '“Wild sticker shock, right? Here’s the best supermarket cheat code: ignore the big price and look at the tiny price-per-ounce corner right here, ',
              tag: 'Teach insider savvy',
              note: 'Unit-price scanning feels like unlocking a cool adult superpower.',
            },
            {
              id: 'frozen-win',
              text: 'store-brand oats and frozen veggies cost one-third as much for the exact same food! ',
              tag: 'Practical hack',
              note: 'Zero-waste tips resonate immediately with busy teens.',
            },
            {
              id: 'solo-challenge',
              text: 'Want $50 to run the cart solo for our next three family dinners?”',
              tag: 'Real hands-on mission',
              note: 'Running a real cart once teaches more than ten lectures.',
            },
          ],
          deliveryCues: [
            'Teach the “Never shop starving” rule with a laugh!',
            'Introduce 3 magical flavor changers (soy/ginger, salsa/lime, pesto/garlic) that make plain rice & eggs taste incredible',
            'Keep food talk totally practical, joyful, and free of diet guilt',
          ],
          pushbacks: [
            {
              id: 'dorm-no-stove',
              label: 'What if {name} will only have a mini-fridge and microwave in a dorm?',
              setup: 'Adapt the exact 4 zones to no-cook staples: Greek yogurt, rotisserie chicken, microwave brown rice, bagged salad, hummus wraps, and fruit!',
              script: '“Even with just a mini-fridge and kettle, oatmeal cups, hummus wraps, yogurt bowls, and bagged salads beat vending machines every time.”',
            },
            {
              id: 'hates-shopping',
              label: 'What if {pronoun} hates wandering crowded stores?',
              setup: 'Show {obj} how to save one 15-item “Standard Weekly List” in a grocery pickup app!',
              script: '“Save your 15 go-to basics as a reusable template list, five minutes to reorder, zero aisle wandering.”',
            },
          ],
          advisorPrompt:
            'I want to teach my {age} teen how to shop for affordable, real groceries in 20 minutes before moving out. Can you help us build a starter shopping challenge?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Run one real-world grocery challenge this week',
          beat4Lead: 'Hand over the cart and a clear budget once while you’re still side-by-side.',
          moves: [
            {
              id: 'solo-50-run',
              title: 'The $45 three-dinner grocery challenge',
              desc: 'Hand {name} a set budget and the 4-zone map to pick staples for three simple family meals this week.',
            },
            {
              id: 'unit-price-hunt',
              title: 'Play a 2-minute “unit-price spotter” check',
              desc: 'Compare single-serve pouches vs. family tubs and fresh vs. frozen veggies together on one aisle.',
            },
            {
              id: 'save-staple-list',
              title: 'Save a 15-item “Apartment Starter List” on {poss} phone',
              desc: 'Include 3 proteins, 4 produce items, 2 bases, 2 sauces, and 2 snacks {name} genuinely loves.',
            },
          ],
          closingNote:
            'Watching your teen stride calmly through a supermarket knowing how to nourish themselves on a real budget is one of the quietest, proudest launch milestones of all.',
          pocketInsight: 'Shop 4 simple zones (3 proteins, 4 produce, 2 bases, unit-price check) and hand {name} one solo budget cart this week.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 2',
            mystery: 'Why do skipped breakfasts and afternoon sugar crashes feel almost identical to sudden anxiety at age 17?',
            title: 'How Everyday Food & Skipped Meals Shape Teen Mood & Energy',
            targetSlug: 'teen-gut-microbiome-mental-health',
          },
          interactiveHighlights: ['4-zone 20-minute grocery loop', 'Unit-price cheat-code script'],
        },
      },
      {
        slug: 'teen-gut-microbiome-mental-health',
        title: 'How Everyday Food & Skipped Meals Shape Teen Mood & Energy',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Food-mood rhythm · Steady fuel steadies teen nerves',
          headline: 'How Everyday Food & Skipped Meals Shape Teen Mood & Energy',
          deck: 'Why skipping breakfast, surviving on iced coffee, and crashing at 4 PM feels eerily like sudden anxiety or brain fog, and how steady everyday fuel stabilizes mood.',
          sceneTime: '4:15 PM · KITCHEN ISLAND',
          sceneBody:
            '{Name} gets home from a long day snapping at everyone, dizzy, foggy, and convinced {pronoun} {is} bombing physics. You ask gently what {pronoun} ate today and hear: “Uh… half an iced coffee at 7:30 and some fries at 11?” *Before rushing to analyze stress, noticing an empty tank explains half of late-teen afternoon dread.*',
          pollQuestion: 'Does your teen frequently skip real breakfast or lunch and hit a late-afternoon mood wall?',
          pollOptions: [
            {
              id: 'skips-meals',
              label: 'All the time, mornings are rushed and school lunch gets skipped or barely eaten!',
              response:
                'Running a high-output 17-year-old brain on coffee and fumes triggers physical adrenaline surges that feel just like panic and irritability.',
            },
            {
              id: 'gut-curious',
              label: '{Pronoun} doesn’t realize how directly steady eating supports focus and calm',
              response:
                'Connecting everyday food to steady focus, calmer nerves, and glowing energy, zero diet talk, makes teens genuinely curious!',
            },
          ],
          beat2Kicker: 'The daily food-mood energy curve',
          beat2Title: 'Steady fuel + happy gut signals quiet afternoon stress spikes',
          beat2Lead:
            'Your gut and brain converse nonstop along the vagus nerve, and blood-glucose rollercoasters mimic anxiety with racing hearts and shaky irritability. Tap each window on the daily mood-fuel curve below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'Everyday meals & teen mood steadiness',
          visualStageHint: 'Tap each time window to see how fuel shapes mood',
          visualConfig: {
            stages: [
              {
                time: '7:30 AM',
                label: 'Fuel Before Coffee',
                level: 32,
                title: 'Coffee on an empty stomach spikes jittery cortisol',
                desc: 'Even a 90-second protein + carb anchor (peanut butter toast, yogurt cup, or egg wrap) before caffeine keeps hands steady.',
                tip: 'Grab-and-go counts completely, never let “perfect breakfast” beat a 60-second bite.',
              },
              {
                time: '12:30 PM',
                label: 'Midday Anchor',
                level: 60,
                title: 'Skipping lunch guarantees a 3:30 PM mood cliff',
                desc: 'Fiber-rich carbs, protein, and colorful plants feed gut microbes that support calm serotonin signaling.',
                tip: 'Pack portable backup snacks (trail mix, apple, jerky/roasted chickpeas) in every backpack.',
              },
              {
                time: '4:00 PM',
                label: 'Stress Check',
                level: 78,
                title: 'Ask “Am I actually falling apart, or just unfed?”',
                desc: 'Low blood sugar triggers adrenal rescue hormones that disguise themselves as sudden overwhelm or sadness.',
                tip: 'Eat a real snack and drink a tall glass of water BEFORE solving big problems or texting back.',
              },
              {
                time: '7:00 PM',
                label: 'Real Variety',
                level: 90,
                title: 'Fermented & colorful plants nourish long-term mood resilience',
                desc: 'Yogurt, berries, beans, nuts, oats, and greens feed diverse gut bacteria, zero rigid rules or perfection needed.',
                tip: 'Add one color or probiotic food you enjoy, addition beats restriction every single time.',
              },
            ],
          },
          almanacTruth:
            'Before deciding your whole week is falling apart at 4 PM, drink a glass of water and eat real protein plus carbs, half of late-teen afternoon dread is an empty fuel tank.',
          scienceDeepDive:
            'Nutritional psychiatry research (including Felice Jacka’s SMILES trial and adolescent gut-brain axis literature) shows that regular balanced meals rich in whole grains, plants, fermented foods, and steady protein correlate with steadier mood and lower perceived stress, as an everyday lifestyle complement alongside professional care whenever persistent mental health symptoms arise.',
          beat3Kicker: 'Practice at the 4 PM slump',
          beat3Title: 'Offer curious body-fuel awareness without food policing',
          rehearsalTriggerSpeaker: '{Name} spiraling over schoolwork at 4:30 PM after skipping lunch',
          rehearsalTriggerQuote: '“I can’t focus on anything, my heart feels jittery and I’m just totally failing at everything today!”',
          rehearsalPrompt: 'Which reaction feels preachy instead of grounding?',
          instincts: [
            {
              id: 'scold-eating',
              label: '“Well maybe if you stopped drinking garbage iced coffee and ate real vegetables you wouldn’t feel awful!”',
              whyTitle: 'Why that’s so tempting, and why {pronoun} bristles',
              whyText:
                'Scolding an overwhelmed, shaky teen adds shame on top of low blood sugar.',
            },
            {
              id: 'over-analyze',
              label: '“Let’s sit down right now and diagnose every class you’re stressed about!”',
              whyTitle: 'Why that’s so tempting, and why it backfires on empty',
              whyText:
                'Trying to problem-solve complex life stress while blood sugar is bottomed out magnifies every worry.',
            },
          ],
          calmScriptPlain:
            '“Oof, that shaky jittery brain fog is the worst. Real quick before we even look at homework, when did you last get real food besides coffee? Grab this turkey wrap and cold water for ten minutes first; let’s see how much calmer your brain feels once your tank isn’t running on fumes.”',
          calmScriptSegments: [
            {
              id: 'warm-ground',
              text: '“Oof, that shaky jittery brain fog is the worst. ',
              tag: 'Validate physical discomfort',
              note: 'Meets the jittery moment calmly without lecturing.',
            },
            {
              id: 'fuel-check',
              text: 'Real quick before we even look at homework, when did you last get real food besides coffee? ',
              tag: 'Curious biology check',
              note: 'Teaches {name} the lifelong self-check: check physical basics first!',
            },
            {
              id: 'reset-first',
              text: 'Grab this turkey wrap and cold water for ten minutes first; let’s see how much calmer your brain feels once your tank isn’t running on fumes.”',
              tag: 'Immediate practical rescue',
              note: 'Lets {name} FEEL the mood shift firsthand after real nourishment.',
            },
          ],
          deliveryCues: [
            'Focus on ADDING nourishing basics (water, protein, plants, yogurt) rather than demonizing fun foods',
            'Keep emergency grab-and-go breakfast options ready for rushed 7 AM exits',
            'Always remember: food supports everyday mood, and if low mood or anxiety lingers for weeks, connect warmly with a doctor or licensed counselor',
          ],
          pushbacks: [
            {
              id: 'no-appetite-am',
              label: 'What if {pronoun} genuinely feels nauseous eating early at 6:45 AM?',
              setup: 'Totally common with late-shifted teen clocks! Pack a portable 9:30 AM mini-breakfast instead.',
              script: '“No forcing food at 6:45, just toss a smoothie, banana + nut butter, or yogurt drink in your bag for right after first period!”',
            },
            {
              id: 'obsessive-clean',
              label: 'What if {name} starts getting overly rigid or anxious about “clean eating”?',
              setup: 'Gently widen the lens back to joyful flexibility and check in with a healthcare provider if rigidity grows.',
              script: '“Nourishment is about feeling energized and flexible, pizza with friends is great for mental health too, never guilt!”',
            },
          ],
          advisorPrompt:
            'My {age} teen skips meals, runs on caffeine, and hits brutal afternoon mood crashes. How do I help {obj} connect everyday food to mood and focus without lecturing?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Install one effortless food-mood anchor this week',
          beat4Lead: 'Keep real fuel ridiculously easy to grab before stress spikes.',
          moves: [
            {
              id: 'before-coffee',
              title: 'Try the “Something Before Coffee” habit',
              desc: 'Pair morning caffeine with one 60-second bite (toast, boiled egg, banana + peanut butter, or yogurt) to stop jitters.',
            },
            {
              id: 'backpack-stash',
              title: 'Stock a permanent backpack emergency pouch',
              desc: 'Keep trail mix, protein-rich bars, or roasted nuts inside {poss} bag so skipped lunches never trigger 4 PM meltdowns.',
            },
            {
              id: 'halt-check',
              title: 'Share the “Fuel Before Feelings” check-in',
              desc: 'Before spiraling over a hard day, pause for water + real snack first, then reassess with a steady brain.',
            },
          ],
          closingNote:
            'Teaching your young adult to notice “Wait, I’m not failing, I just haven’t eaten since 10 AM” is a deceptively simple self-care compass they will thank you for decades from now.',
          pocketInsight: 'Pair caffeine with real food, stash backpack fuel for rushed days, and check an empty tank before spiraling over stress.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 3',
            mystery: 'How can a busy 18-year-old prep five real meals in 30 minutes on Sunday, and keep trusting their body’s hunger for life?',
            title: '30-Minute Sunday Prep & Trusting Hunger Signals for Life',
            targetSlug: 'teen-independent-meal-prepping',
          },
          interactiveHighlights: ['4-window food-mood curve', 'Empty-tank calm reset script'],
        },
      },
      {
        slug: 'teen-independent-meal-prepping',
        title: '30-Minute Sunday Prep & Trusting Hunger Signals for Life',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: '30-minute Sunday prep · Easy nourishment + lifelong hunger trust',
          headline: '30-Minute Sunday Prep & Trusting Hunger Signals for Life',
          deck: 'Why rigid diet rules and elaborate 3-hour meal-prep videos crash by Wednesday, and how 30-minute component prep + trusting natural hunger fuels adult life effortlessly.',
          sceneTime: '5:00 PM · SUNDAY KITCHEN MUSIC ON',
          sceneBody:
            'On TikTok, meal prepping looks like 21 identical plastic boxes of plain chicken and broccoli, no wonder {name} groans “I’d rather eat cereal forever!” *Yet spending just 30 relaxed minutes cooking three mix-and-match building blocks (while listening to music) makes weeknight eating fast, delicious, and completely free of diet obsession.*',
          pollQuestion: 'What stops busy teens from cooking simple real meals during the week?',
          pollOptions: [
            {
              id: 'tired-8pm',
              label: 'Coming home exhausted at 7 PM and not wanting to cook from zero',
              response:
                '100%! Having 1 cooked grain, 1 cooked protein, and 1 chopped/roasted veggie tray ready turns dinner into a 4-minute assembly!',
            },
            {
              id: 'all-nothing',
              label: 'Feeling trapped between strict fitness-influencer diets vs. pure junk food',
              response:
                'Teaching joyful “component prep + intuitive hunger trust” frees young adults from that toxic pendulum permanently.',
            },
          ],
          beat2Kicker: 'Rigid diet prep vs. flexible component prep',
          beat2Title: 'Prep versatile building blocks, and let real hunger guide portions',
          beat2Lead:
            'Strict calorie-counting boxes kill joy and trigger rebound binges, while zero prep leads to frantic takeout. Flexible 30-minute component prep gives young adults tasty freedom AND steady trust in their own hunger signals. Compare both below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Rigid diet boxes vs. 30-minute component prep + body trust',
          visualStageHint: 'Compare perfectionist dieting vs. flexible adult nourishment',
          visualConfig: {
            willpowerLabel: 'Rigid Diet-Prep Culture',
            willpowerTitle: 'Weighing every gram into 15 identical bland containers',
            willpowerDesc:
              'Treats eating like a joyless math punishment, disconnects teens from genuine hunger cues, and collapses the moment life gets busy.',
            willpowerOutcome: 'Food guilt, takeout rebounds, and kitchen dread.',
            guardrailLabel: '30-Min Component Guardrail',
            guardrailTitle: '3 mix-and-match components + trusting natural appetite',
            guardrailDesc:
              'Roast one tray of veggies, cook one grain, prep one protein, then assemble tacos, grain bowls, wraps, or stir-fries in 4 minutes based on what sounds good today.',
            guardrailOutcome: 'Effortless weeknight meals and calm lifelong body trust.',
            environmentShifts: [
              'Prep components (rice, roasted veggies, shredded chicken/beans), NOT identical repetitive boxes.',
              'Keep 3 favorite sauces ready (teriyaki, salsa verde, tahini/ranch) to switch flavors instantly.',
              'Eat when hungry, savor favorite foods without guilt, and stop comfortably satisfied, retiring diet apps for good.',
            ],
          },
          almanacTruth:
            'You don’t need three hours on Sunday or a macro-tracking app to eat well as an adult, thirty minutes of tasty building blocks plus trusting your hunger carries you anywhere.',
          scienceDeepDive:
            'Intuitive-eating and young-adult culinary research (Evelyn Tribole; Project EAT follow-ups) finds that flexible meal-component preparation paired with internal hunger-satiety attunement predicts stronger psychological well-being, lower disordered-eating risk, and sustained home cooking into the twenties.',
          beat3Kicker: 'Practice in the Sunday kitchen',
          beat3Title: 'Make Sunday prep feel like a 30-minute music session, never a chore',
          rehearsalTriggerSpeaker: '{Name} sighing about learning to cook and prep before moving out',
          rehearsalTriggerQuote: '“I don’t have time to cook every night in college. I’m just going to live off ramen and campus pizza.”',
          rehearsalPrompt: 'Which reply pushes teens away from easy home cooking?',
          instincts: [
            {
              id: 'scare-health',
              label: '“If you eat campus pizza and ramen you’ll feel terrible and ruin your health!”',
              whyTitle: 'Why that’s so tempting, and why it triggers eye-rolls',
              whyText:
                'Shaming college staples makes home cooking sound like an uptight lecture instead of a delicious upgrade.',
            },
            {
              id: 'complex-recipe',
              label: '“Here, let me teach you my 14-step lasagna and homemade stock recipe!”',
              whyTitle: 'Why that’s so tempting, and why it feels overwhelming',
              whyText:
                'Complex heirloom dishes are lovely for holidays, but busy 18-year-olds need 4-minute weeknight wins first.',
            },
          ],
          calmScriptPlain:
            '“Honestly, ramen and late-night pizza with friends are totally part of young adulthood, zero shame! Even better: if you know how to drop an egg and frozen spinach into ramen, or spend 30 minutes Sunday making rice, roasted veggies, and one protein, you’ve got 4-minute burrito bowls and stir-fries whenever you want real energy. Put on your playlist, let’s time how fast we can knock out three building blocks right now!”',
          calmScriptSegments: [
            {
              id: 'normalize-fun',
              text: '“Honestly, ramen and late-night pizza with friends are totally part of young adulthood, zero shame! ',
              tag: 'Zero food moralizing',
              note: 'Dissolves all-or-nothing guilt right away.',
            },
            {
              id: 'upgrade-hack',
              text: 'Even better: if you know how to drop an egg and frozen spinach into ramen, or spend 30 minutes Sunday making rice, roasted veggies, and one protein, you’ve got 4-minute burrito bowls and stir-fries whenever you want real energy. ',
              tag: 'Real-world fast hacks',
              note: 'Meets teens exactly where their schedule and budget actually live.',
            },
            {
              id: 'timed-fun',
              text: 'Put on your playlist, let’s time how fast we can knock out three building blocks right now!”',
              tag: 'Joyful 30-minute sprint',
              note: 'Proves empirically that home prep takes half an hour, not an entire afternoon.',
            },
          ],
          deliveryCues: [
            'Teach the “Upgraded Ramen” hack (egg + frozen veggies + drizzle of sesame oil), teens LOVE it!',
            'Assemble a tiny 10-card favorite recipe deck (paper or Notes app) of {poss} own go-to quick meals',
            'Reinforce trusting hunger and fullness over rigid external food rules',
          ],
          pushbacks: [
            {
              id: 'food-safety',
              label: 'What basic fridge-safety rule keeps young adults safe with leftovers?',
              setup: 'Keep it dead simple: “3–4 days in the fridge, or freeze half on Sunday!”',
              script: '“Easy lifetime rule: cool cooked food within two hours, enjoy leftovers within 3–4 days, and when in doubt toss it out.”',
            },
            {
              id: 'forgot-prep',
              label: 'What if a crazy exam week leaves zero minutes on Sunday?',
              setup: 'Celebrate flexible “no-cook backup nights” with zero guilt!',
              script: '“Busy week backup: rotisserie chicken + bagged salad + tortillas, or eggs on toast. Feeding yourself kindly always beats perfection.”',
            },
          ],
          advisorPrompt:
            'Help me coach my {age} teen through a fun 30-minute Sunday component meal-prep session that feels effortless and keeps a healthy, intuitive relationship with food.',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Run one 30-minute Sunday music-on prep together',
          beat4Lead: 'Prove how fast, tasty, and un-fussy feeding yourself really is.',
          moves: [
            {
              id: 'thirty-min-sprint',
              title: 'Set a 30-minute timer for 3 building blocks',
              desc: 'Blast {poss} playlist while cooking 1 grain, 1 sheet-pan veggie, and 1 protein together, then pack them cleanly.',
            },
            {
              id: 'five-go-to-cards',
              title: 'Build {poss} “5 Fast Adult Meals” phone note',
              desc: 'Save 5 ten-minute staples (Upgraded Ramen, Sheet-Pan Fajitas, Pesto Pasta + Beans, Egg Fried Rice, Greek Yogurt Parfaits).',
            },
            {
              id: 'trust-appetite-toast',
              title: 'Name lifelong food peace out loud',
              desc: 'Remind {name}: “Listen to your hunger, enjoy celebrations guilt-free, and feed your body like someone you really care about.”',
            },
          ],
          closingNote:
            'Sending your young adult into the world knowing how to feed themselves warmly in 30 minutes, and trusting their body without diet noise, is nourishment for the mind and heart alike.',
          pocketInsight: 'Spend 30 music-filled minutes prepping 3 versatile food blocks, ditch diet guilt, and trust natural hunger cues for life.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Rigid diet vs. component-prep guardrail', '30-minute kitchen sprint script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 39: Focused Studying, Burnout & Mapping Next Steps (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'play-teen-intellectual-mastery',
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    developmentalTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    title: 'Focused Studying, Burnout & Mapping Next Steps',
    reliefSubtitle:
      'Cut homework time in half by stopping phone switching, build calm burnout-proof focus blocks, and replace rigid college-pressure panic with a flexible life compass',
    tonightQuickWinTitle: 'Episode 1: Why Constant Phone Switching Doubles Homework Stress',
    summary:
      'Show your teen how notification switching silently doubles study hours through attention residue, build sustainable 45-minute deep-focus study blocks paired with genuine guilt-free downtime, and help teens navigate college, career, and creative direction with a steady compass rather than burnout pressure.',
    coverImageUrl: 'https://assets.alongside.care/academy/play-teen.png',
    sortOrder: 8,
    episodes: [
      {
        slug: 'teen-cognitive-load-and-distraction',
        title: 'Why Constant Phone Switching Doubles Homework Stress',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Attention residue · One quick glance costs 15 minutes of focus',
          headline: 'Why Constant Phone Switching Doubles Homework Stress',
          deck: 'Why a 45-minute essay stretches into a miserable 3-hour grind until midnight, and the brain-science trick that gives {name} hours of evening freedom back.',
          sceneTime: '9:35 PM · DESK WITH 14 TABS & PHONE BUZZING',
          sceneBody:
            '{Name} has been sitting at {poss} desk since 7:00 PM looking utterly drained, muttering “School gives way too much homework. I literally have zero free time!” Every four minutes, a snap chimes, {pronoun} peeks for six seconds, then stares blankly back at the paragraph trying to remember what {pronoun} was writing. *It’s not laziness, it’s the invisible tax of attention residue.*',
          pollQuestion: 'Does homework stretch mysteriously late while notifications buzz nearby?',
          pollOptions: [
            {
              id: 'stretches',
              label: 'Yes, a 40-minute assignment somehow takes three exhausting hours!',
              response:
                'Every 5-second glance leaves “attention residue” glued to the brain for up to 15 minutes, parking the phone in another room literally gives {name} {poss} evenings back!',
            },
            {
              id: 'swears-multitask',
              label: '{Pronoun} insists {pronoun} {is} great at multitasking!',
              response:
                'Even brilliant brains don’t multitask, they rapidly switch tasks at a huge speed penalty. A fun 1-night timed trial proves it better than any speech!',
            },
          ],
          beat2Kicker: 'Inside task-switching fatigue',
          beat2Title: 'Even a silent phone on the desk drains working memory',
          beat2Lead:
            'Human working memory holds only 3–4 items at once. Checking one text mid-essay forces the prefrontal cortex to flush and reload the whole mental workspace, leaving teens exhausted with half the work done. Toggle both study states below.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Fragmented switching vs. single-channel study focus',
          visualStageHint: 'Toggle phone-on-desk switching vs. phone-in-another-room focus',
          visualConfig: {
            calmToggleLabel: 'Phone in Another Room',
            stormToggleLabel: 'Phone Face-Up on Desk',
            calmStatus: 'FULL BANDWIDTH · FINISHED BY 8:15 PM',
            stormStatus: 'ATTENTION RESIDUE · STUCK PAST 10 PM',
            calmReadouts: [
              {
                name: 'Working Memory RAM',
                value: '100% Free',
                tone: 'spruce',
                desc: 'Ideas connect effortlessly; an essay that dragged for 2.5 hours finishes cleanly in 45 minutes.',
              },
              {
                name: 'Guilt-Free Free Time',
                value: 'Reclaimed',
                tone: 'spruce',
                desc: 'Finishing early unlocks real guilt-free gaming, hanging out, and full sleep.',
              },
            ],
            stormReadouts: [
              {
                name: 'Switch-Cost Tax',
                value: '2×–3× Slower',
                tone: 'amber',
                desc: 'Each 6-second notification check leaves sticky social thoughts dragging down reading comprehension.',
              },
              {
                name: 'Cognitive Fatigue',
                value: 'Burned Out',
                tone: 'amber',
                desc: 'Constant reloading leaves {name} feeling fried and stressed even when output is small.',
              },
            ],
          },
          almanacTruth:
            'Putting your phone in another room for 45 minutes isn’t about working harder, it’s the smartest shortcut on earth to finish twice as fast and claim real guilt-free free time.',
          scienceDeepDive:
            'Cognitive psychology research by Sophie Leroy (“attention residue”) and Adrian Ward’s “Brain Drain” experiments demonstrates that the mere visible presence of a smartphone on a desk measurably reduces working memory capacity and fluid problem-solving, even when powered off or flipped face down.',
          beat3Kicker: 'Practice during a late homework slog',
          beat3Title: 'Pitch focus as a free-time hack, never an anti-phone lecture',
          rehearsalTriggerSpeaker: '{Name} groaning at 9:30 PM that homework takes forever',
          rehearsalTriggerQuote: '“This assignment is impossible. I’ve been sitting here for two hours and I’m barely halfway done!”',
          rehearsalPrompt: 'Which comment kills curiosity and triggers defensiveness?',
          instincts: [
            {
              id: 'blame-phone',
              label: '“Maybe if you weren’t on your phone every three minutes you’d already be done! Hand it over!”',
              whyTitle: 'Why that’s so tempting, and why {pronoun} fights back',
              whyText:
                'Confiscating a 17-year-old’s phone in frustration turns a helpful time-saving insight into a power battle.',
            },
            {
              id: 'do-nothing',
              label: '“Oh sweetie, just stay up as late as you need, want another energy drink?”',
              whyTitle: 'Why that’s so tempting, and why burnout snowballs',
              whyText:
                'Fueling fragmented late-night grinds deepens exhaustion without fixing the hidden leak.',
            },
          ],
          calmScriptPlain:
            '“Sitting at a desk for three hours straight sounds miserable, no wonder you’re fried. Want a wild college-level hack that buys back an hour of your night? Psych studies found even a silent phone on your desk eats working memory, want to test parking BOTH our phones in the kitchen for one 40-minute sprint tomorrow and see if you finish twice as fast?”',
          calmScriptSegments: [
            {
              id: 'empathize-slog',
              text: '“Sitting at a desk for three hours straight sounds miserable, no wonder you’re fried. ',
              tag: 'Lead with empathy',
              note: 'Joins {name} against the stressful grind rather than lecturing.',
            },
            {
              id: 'sell-freedom',
              text: 'Want a wild college-level hack that buys back an hour of your night? Psych studies found even a silent phone on your desk eats working memory, ',
              tag: 'Frame around {poss} gain',
              note: 'Sells the exact payoff teens love: MORE genuine free time and less stress.',
            },
            {
              id: 'peer-test',
              text: 'want to test parking BOTH our phones in the kitchen for one 40-minute sprint tomorrow and see if you finish twice as fast?”',
              tag: 'Side-by-side experiment',
              note: 'Invites {name} to verify the result empirically as an equal.',
            },
          ],
          deliveryCues: [
            'Never confiscate, let {name} voluntarily choose the 40-minute sprint experiment',
            'Close extra browser tabs too (full-screen mode works wonders on laptops)',
            'Celebrate the extra free time {pronoun} wins afterward, no sneaking extra chores into {poss} reclaimed hour!',
          ],
          pushbacks: [
            {
              id: 'need-texts-hw',
              label: 'What if {pronoun} says “I need my phone to text classmates about the assignment!”?',
              setup: 'Batch quick classmate questions into the 10-minute break AFTER the sprint!',
              script: '“Jot any quick question on a sticky note during the 40-minute sprint, then knock out all texts in a 5-minute check right after!”',
            },
            {
              id: 'silence-awkward',
              label: 'What if pure silence feels uncomfortable while studying?',
              setup: 'Suggest lyric-free instrumental, rain sounds, or a cozy café vibe on a separate device.',
              script: '“Totally, lyric-free lo-fi beats or brown noise help tons because lyrics compete with the brain’s reading center!”',
            },
          ],
          advisorPrompt:
            'My {age} teen’s homework drags late into the night because of constant phone and tab switching. How do I introduce the “attention residue” hack so {pronoun} buys in voluntarily?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Run one 40-minute “Other Room” study experiment',
          beat4Lead: 'Let {name} feel firsthand how liberating single-channel speed is.',
          moves: [
            {
              id: 'other-room-test',
              title: 'Test the “Phone in Another Room” 40-minute sprint',
              desc: 'Park both your phones in another room for 40 minutes, track output, and enjoy the reclaimed free time right after.',
            },
            {
              id: 'tab-bankruptcy',
              title: 'Try full-screen single-tab mode',
              desc: 'Close 15 background tabs before starting an essay or problem set so visual clutter drops instantly.',
            },
            {
              id: 'capture-pad',
              title: 'Keep a “Distraction Scratchpad” beside the laptop',
              desc: 'Whenever a random urge pops up (“Text Maya!” / “Check shoes!”), scribble it on paper for the break instead of unlocking a screen.',
            },
          ],
          closingNote:
            'When a 17-year-old discovers they can finish a brutal study night in half the time, and spend the rest of the evening truly relaxed, focus stops feeling like a rule and starts feeling like freedom.',
          pocketInsight: 'Phone in another room + single-tab screen = half the homework time and real guilt-free rest afterward.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 2',
            mystery: 'How do top college students protect deep focus AND real evening rest without burning out before May?',
            title: 'Building Calm, Focused Study Blocks Without Burnout',
            targetSlug: 'teen-deep-work-block',
          },
          interactiveHighlights: ['Phone-on-desk vs. other-room toggle', 'Free-time study hack script'],
        },
      },
      {
        slug: 'teen-deep-work-block',
        title: 'Building Calm, Focused Study Blocks Without Burnout',
        readingMinutes: 3,
        audioDurationSeconds: 170,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Deep focus blocks · High output paired with guilt-free rest',
          headline: 'Building Calm, Focused Study Blocks Without Burnout',
          deck: 'Why endless marathon “pseudo-studying” breeds high-achieving teen burnout, and how rhythmic 45-minute Focus Blocks paired with clean shutdown rituals protect joy and energy.',
          sceneTime: '6:30 PM · WEEKDAY STUDY DESK',
          sceneBody:
            'Between honors classes, part-time shifts, and applications, {name} feels guilty every single time {pronoun} isn’t staring at a textbook, yet ironically gets less done because {poss} brain never truly switches ON or OFF. *Switching to crisp, finite Focus Blocks plus a hard evening shutdown restores both sharp grades and genuine laughter.*',
          pollQuestion: 'Does your teen struggle more with starting hard assignments, or knowing when to stop and truly rest?',
          pollOptions: [
            {
              id: 'procrastinate',
              label: 'Procrastinating huge vague projects until panic kicks in at 10 PM',
              response:
                'Naming one tiny concrete 45-minute goal (“Draft intro + 3 bullet points”) breaks perfectionist paralysis fast!',
            },
            {
              id: 'burnout',
              label: 'Never truly resting, always carrying background guilt about schoolwork',
              response:
                'Installing an explicit “Shutdown Ritual” gives stressed high-achievers permission to exhale cleanly every night.',
            },
          ],
          beat2Kicker: 'The burnout-proof study rhythm',
          beat2Title: 'Short intense sprints + genuine off-duty rest beat 5-hour slogs',
          beat2Lead:
            'Deep work isn’t grinding like a robot for six hours, it’s protecting 1–2 crisp 45-minute focused sprints followed by clean restorative breaks and an honest evening finish line. Step through the 4-beat rhythm below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-beat burnout-proof Deep Focus rhythm',
          visualStageHint: 'Tap each beat to pair sharp studying with real rest',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Min 0–2',
                label: 'Name One Target',
                title: 'Define ONE concrete finish line (not “study biology”)',
                desc: 'Write “Complete 8 practice problems” or “Outline Section 2” so the brain sees a clear runway.',
                why: 'Vague giant tasks trigger avoidance; crisp targets spark action.',
              },
              {
                timeOrCue: 'Min 2–45',
                label: 'Deep Focus Block',
                title: '40–45 minutes completely uninterrupted, phone out of room',
                desc: 'Work calmly on just that one target; active recall (quizzing yourself) beats passive re-reading 3-to-1.',
                why: 'Matches natural ultradian attention peaks without frying energy.',
              },
              {
                timeOrCue: 'Min 45–55',
                label: 'Real Screen-Free Break',
                title: '10 minutes moving, stretching, grabbing water, or petting the dog',
                desc: 'Avoid doom-scrolling during study breaks, scrolling fatigues attention instead of resetting it.',
                why: 'Physical breaks let the brain consolidate what you just learned.',
              },
              {
                timeOrCue: 'Shutdown',
                label: 'Clean Finish Line',
                title: 'Close the laptop, pack the bag, and declare work DONE for the night',
                desc: 'Once the planned blocks finish, enjoy friends, hobbies, or shows with 0% lingering guilt.',
                why: 'True off-duty rest is the #1 vaccine against teen burnout.',
              },
            ],
          },
          almanacTruth:
            'Two focused 45-minute blocks with a clean evening shutdown accomplish more, and leave a teen ten times happier, than five blurry hours of half-studying and half-scrolling.',
          scienceDeepDive:
            'Focus and cognitive-performance research synthesized by Dr. Cal Newport and educational memory studies shows that bounded deep-work sprints using active recall, separated by non-screen physical breaks and clear daily shutdown rituals, outperform extended low-intensity study hours while lowering student stress.',
          beat3Kicker: 'Practice before a stressful exam week',
          beat3Title: 'Coach smart rhythm instead of piling on achievement pressure',
          rehearsalTriggerSpeaker: '{Name} overwhelmed staring at a huge list of exams and essays',
          rehearsalTriggerQuote: '“I have three tests and a paper this week. I’m going to have to study five hours straight every night!”',
          rehearsalPrompt: 'Which parent response accidentally fuels burnout?',
          instincts: [
            {
              id: 'push-harder',
              label: '“Good, junior/senior year counts for everything! Cancel soccer and lock yourself in your room!”',
              whyTitle: 'Why that’s so tempting, and why performance actually drops',
              whyText:
                'Cutting movement and rest spikes cortisol, shrinks memory recall, and breeds chronic exhaustion.',
            },
            {
              id: 'brush-off',
              label: '“Oh you always get good grades, stop stressing, you’ll be fine!”',
              whyTitle: 'Why that’s so tempting, and why it leaves {obj} stuck',
              whyText:
                'Brushing off overload skips giving {name} a concrete chunking system to make the mountain climbable.',
            },
          ],
          calmScriptPlain:
            '“Three exams plus a paper IS a genuinely heavy week, no wonder your shoulders are up by your ears. You don’t need five straight grim hours; what if you map out just two crisp 45-minute focus blocks tonight with real walking breaks, keep your workout or fun time intact, and hit a clean shutdown by 9:30 so your brain locks everything in overnight?”',
          calmScriptSegments: [
            {
              id: 'respect-load',
              text: '“Three exams plus a paper IS a genuinely heavy week, no wonder your shoulders are up by your ears. ',
              tag: 'Validate real workload',
              note: 'Honors the genuine intensity of late high school without panic.',
            },
            {
              id: 'smart-chunk',
              text: 'You don’t need five straight grim hours; what if you map out just two crisp 45-minute focus blocks tonight with real walking breaks, ',
              tag: 'Sustainable sprint plan',
              note: 'Turns an impossible cliff into two bite-sized, doable blocks.',
            },
            {
              id: 'protect-joy',
              text: 'keep your workout or fun time intact, and hit a clean shutdown by 9:30 so your brain locks everything in overnight?”',
              tag: 'Guard rest & movement',
              note: 'Teaches high-output teens that rest is part of peak performance, not laziness.',
            },
          ],
          deliveryCues: [
            'Encourage testing yourself aloud or teaching YOU a concept for 3 minutes, fastest memory builder ever!',
            'Protect movement, laughter, and sleep especially fiercely during exam weeks',
            'Never tie your warmth or family celebration to a single test score',
          ],
          pushbacks: [
            {
              id: 'cant-start',
              label: 'What if perfectionism makes {name} stare at a blank Google Doc for an hour?',
              setup: 'Invite a delightfully messy “10-minute terrible rough draft” to break the ice!',
              script: '“Permission to write the world’s ugliest 10-minute draft first, you can’t edit a blank page, and ugly drafts unlock brilliance!”',
            },
            {
              id: 'late-night-panic',
              label: 'What if {pronoun} feels guilty stopping at 9:30 when more could always be reviewed?',
              setup: 'Remind {obj} that a rested brain beats tired over-studying on exam morning.',
              script: '“Diminishing returns hit hard after 9:30, closing the book now is actually the smartest move for tomorrow’s score.”',
            },
          ],
          advisorPrompt:
            'My {age} teen is stressed by heavy schoolwork and drifting toward burnout. How can we introduce calm 45-minute focus blocks and healthy evening shutdown habits?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Try one burnout-proof focus upgrade this week',
          beat4Lead: 'Pair high focus with genuinely guilt-free evening off-time.',
          moves: [
            {
              id: 'two-blocks',
              title: 'Run two 45-minute blocks + 10-minute movement breaks',
              desc: 'Pick one concrete micro-goal per block, take a screen-free stretch break between them, and feel the energy difference.',
            },
            {
              id: 'teach-back',
              title: 'Offer a 3-minute “Teach Me” dinner challenge',
              desc: 'Ask {name} to explain one tricky history or science concept to you in plain English, active recall sticks 3x better!',
            },
            {
              id: 'clean-shutdown',
              title: 'Create a 60-second “Shutdown Ritual”',
              desc: 'Write tomorrow’s #1 starter task on a sticky note, close the laptop lid, and officially declare study mode OFF.',
            },
          ],
          closingNote:
            'Teaching a driven teen how to work with calm focus AND put the work down guilt-free is a lifelong shield against adult hustle burnout.',
          pocketInsight: 'Define one crisp target, run 45-minute deep blocks with movement breaks, and close the laptop cleanly for real rest.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 3',
            mystery: 'When college admissions, career noise, and “what’s your 10-year plan?” weigh down a 17-year-old, how do you replace panic with a calm compass?',
            title: 'Compass Over Rigid Plan: Helping Teens Navigate College & Career Pressure',
            targetSlug: 'teen-life-strategy-and-goal-mapping',
          },
          interactiveHighlights: ['4-beat burnout-proof focus rhythm', 'Exam-week calm chunking script'],
        },
      },
      {
        slug: 'teen-life-strategy-and-goal-mapping',
        title: 'Compass Over Rigid Plan: Helping Teens Navigate College & Career Pressure',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Compass over map · Curious exploration + creative solitude',
          headline: 'Compass Over Rigid Plan: Helping Teens Navigate College & Career Pressure',
          deck: 'Why asking a 17-year-old to lock down a permanent life blueprint triggers crushing anxiety, and how trading a rigid map for a values compass (plus quiet creative space) unlocks bold next steps.',
          sceneTime: '7:45 PM · PORCH SWING AFTER DINNER',
          sceneBody:
            'Relatives, counselors, and social feeds keep firing the exact same stressful question at {name}: “So what’s your major? Where are you applying? What career are you picking?” Tonight {pronoun} rubs {poss} forehead and whispers, “Everyone else seems to have their whole life figured out, what if I pick wrong and ruin everything?” *Your teen doesn’t need a 20-year spreadsheet; {pronoun} needs permission to carry a compass and take one honest next step.*',
          pollQuestion: 'How heavy does college, trade, or future-career pressure feel on your teen right now?',
          pollOptions: [
            {
              id: 'crushing',
              label: 'Heavy, {pronoun} feels like one decision at 17 decides {poss} entire life!',
              response:
                'Hearing from YOU that almost no thriving adult followed a straight line from age 17 instantly lifts tons of weight off {poss} chest.',
            },
            {
              id: 'foggy',
              label: '{Pronoun} honestly doesn’t know what {pronoun} {wants} yet and shuts down when asked',
              response:
                'Not knowing at 17 isn’t falling behind, protecting quiet creative space and tiny real-world experiments is how real direction surfaces!',
            },
          ],
          beat2Kicker: 'The compass-building conversation loop',
          beat2Title: 'Real clarity grows from small live experiments and quiet thinking space',
          beat2Lead:
            'You can’t think your way into a calling inside a pressure cooker. Protecting pockets of quiet offline solitude (free from comparison feeds) and focusing on curiosity + next-step experiments replaces paralysis with momentum. Step through the 3-beat loop below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat compass over rigid-plan dialogue',
          visualStageHint: 'Tap each beat to turn future dread into curious momentum',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Burst the straight-line myth',
                label: 'Normalize Pivots',
                quote: '“Almost nobody’s best life path looks like a straight highway from age 17.”',
                desc: 'Share real stories of adults (including yourself!) who pivoted majors, careers, or cities and thrived.',
                brainNote: 'Drops catastrophic “one wrong move ruins everything” paralysis.',
              },
              {
                stepNum: '02',
                actor: 'Zoom in on clues + solitude',
                label: 'Curiosity Compass',
                quote: '“Forget job titles for a minute, what problems, people, or hands-on projects give you energy?”',
                desc: 'Protect quiet creative time (journaling, walking, sketching, music) away from peers’ LinkedIn/TikTok highlight reels so {name} can hear {poss} own voice.',
                brainNote: 'Default-mode quiet reflection integrates identity and intrinsic values.',
              },
              {
                stepNum: '03',
                actor: 'Pick ONE testable next step',
                label: 'Prototype & Shadow',
                quote: '“Let’s just pick the next good chapter, shadow one person, test one class, or try one summer job.”',
                desc: 'Frame college, trades, gap years, or entry jobs as Version 1.0 prototypes, never permanent tattoos.',
                brainNote: 'Actionable small experiments restore hopeful agency immediately.',
              },
            ],
          },
          almanacTruth:
            'A 17-year-old doesn’t need a locked-in 10-year career plan, they need a steady values compass, quiet space to hear their own voice, and confidence that great lives are built through pivots.',
          scienceDeepDive:
            'Career-design research (Bill Burnett & Dave Evans, Stanford Life Design Lab) and developmental identity studies show that young adults who approach post-high-school paths as iterative curiosity prototypes, supported by low-pressure parental sounding boards and reflective solitude, report lower anxiety and higher long-term fulfillment.',
          beat3Kicker: 'Practice on the porch',
          beat3Title: 'Lower the prestige temperature and widen the horizon',
          rehearsalTriggerSpeaker: '{Name} anxious after seeing classmates post selective college acceptances or big plans',
          rehearsalTriggerQuote: '“Everyone already knows their dream school and major. I have no idea what I’m doing and I feel totally behind!”',
          rehearsalPrompt: 'Which well-meaning response accidentally turns the pressure dial up?',
          instincts: [
            {
              id: 'prestige-push',
              label: '“Well, you DO need to narrow down a top-20 school and lucrative major soon, time’s ticking!”',
              whyTitle: 'Why that’s so tempting, and why teens freeze',
              whyText:
                'Tieing worth to prestige rankings spikes perfectionist panic while muting genuine intrinsic curiosity.',
            },
            {
              id: 'vague-fluff',
              label: '“Just follow your passion and everything will magically work out!”',
              whyTitle: 'Why that’s so tempting, and why it feels frustrating',
              whyText:
                'Telling an undecided teen to “find your passion” feels overwhelming when passions are usually BUILT through small experiments.',
            },
          ],
          calmScriptPlain:
            '“Pause and breathe, half of those classmates who look 100% certain today are going to change majors twice before they turn twenty-two, and that’s completely normal! You are not choosing a permanent life sentence at seventeen; you’re just picking an interesting next chapter. Forget prestige for ten minutes: what kinds of problems or hands-on work actually make time fly for you?”',
          calmScriptSegments: [
            {
              id: 'reality-check',
              text: '“Pause and breathe, half of those classmates who look 100% certain today are going to change majors twice before they turn twenty-two, and that’s completely normal! ',
              tag: 'Deflate illusion of certainty',
              note: 'Instantly eases comparison panic with honest adult reality.',
            },
            {
              id: 'next-chapter',
              text: 'You are not choosing a permanent life sentence at seventeen; you’re just picking an interesting next chapter. ',
              tag: 'Reframe stakes realistically',
              note: 'Lowers catastrophic anxiety so creative thinking switches back on.',
            },
            {
              id: 'energy-question',
              text: 'Forget prestige for ten minutes: what kinds of problems or hands-on work actually make time fly for you?”',
              tag: 'Compass question',
              note: 'Guides attention back to real energy clues instead of external status.',
            },
          ],
          deliveryCues: [
            'Celebrate diverse, honorable paths openly: universities, community colleges, skilled trades, gap years, and apprenticeships',
            'Encourage one quiet offline creative outlet (music, drawing, woodworking, writing) purely for joy, never for a resume!',
            'Check your OWN bumper-sticker pride quietly so your love stays 100% unattached to school logos',
          ],
          pushbacks: [
            {
              id: 'zero-spark',
              label: 'What if {pronoun} shrugs “Nothing makes time fly. I honestly don’t know”?',
              setup: 'Totally fine! Start with small real-world interviews or part-time experiences to collect real data.',
              script: '“Super honest answer! Let’s pick two interesting adults we know, a designer, electrician, nurse, or founder, and invite them for a 15-minute coffee to ask what their Tuesday actually looks like.”',
            },
            {
              id: 'rejection-sting',
              label: 'What if a dream acceptance letter comes back “No”?',
              setup: 'Grieve the sting warmly together first, then remind {obj} how many doors remain wide open.',
              script: '“That genuinely hurts and you worked so hard. Take tonight to be mad and eat ice cream, where you go never measures who you are, and your story is going to be remarkable.”',
            },
          ],
          advisorPrompt:
            'My {age} teen is overwhelmed by college and career pressure and scared of picking the wrong path. How can I help {obj} build a calm, flexible compass?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Trade pressure for one curious compass exercise',
          beat4Lead: 'Give {name} room to breathe, reflect, and test one real clue.',
          moves: [
            {
              id: 'winding-story',
              title: 'Share two “winding road” adult stories',
              desc: 'Tell {name} about your own (or a friend’s) unexpected detours that turned into meaningful work and joy.',
            },
            {
              id: 'two-coffees',
              title: 'Offer to connect 2 low-pressure curiosity chats',
              desc: 'Ask {name} two fields {pronoun} finds mildly intriguing and help set up casual 15-minute chats with real humans doing that work.',
            },
            {
              id: 'unmonetized-joy',
              title: 'Protect one pure-joy offline creative hour weekly',
              desc: 'Encourage music, art, baking, trails, or building that never goes on a college application, pure fuel for the soul.',
            },
          ],
          closingNote:
            'When your teen hears in your voice that your pride belongs to their character, never a prestige logo or straight-line plan, they step into adulthood brave enough to build a life that is truly theirs.',
          pocketInsight: 'Burst the straight-line myth, protect quiet offline thinking space, and treat age 18 as Version 1.0, not a permanent tattoo.',
          nextEpisodeHook: null,
          interactiveHighlights: ['3-beat compass vs. rigid-plan loop', 'Comparison-deflating porch script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 40: Safe Driving, Intentional Feeds & Adult Digital Habits (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'digital-teen-digital-independence',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    developmentalTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    title: 'Safe Driving, Intentional Feeds & Adult Digital Habits',
    reliefSubtitle:
      'Lock in a lifesaving Zero-Texting Driving Pledge with auto-silence, coach self-directed feed auditing, and step cleanly from parental controls into lifelong young-adult trust',
    tonightQuickWinTitle: 'Episode 1: The Zero-Texting Driving Pledge (And Setting Auto-Silence Together)',
    summary:
      'Protect new teen drivers with automated Driving Focus tech and a mutual zero-texting pledge, equip young adults to audit and curate their own attention and feeds deliberately, and transition smoothly out of parental device controls into an enduring Young Adult Digital Covenant.',
    coverImageUrl: 'https://assets.alongside.care/academy/digital-teen.png',
    sortOrder: 8,
    episodes: [
      {
        slug: 'teen-zero-distracted-driving-pledge',
        title: 'The Zero-Texting Driving Pledge (And Setting Auto-Silence Together)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Zero-texting car · Automate safety, never rely on willpower',
          headline: 'The Zero-Texting Driving Pledge (And Setting Auto-Silence Together)',
          deck: 'Why reading ONE text at 55 mph equals driving blindfolded across a football field, and how automating Driving Focus + parking phones out of reach saves lives without lectures.',
          sceneTime: '4:10 PM · DRIVER’S SEAT WITH NEW KEYS',
          sceneBody:
            'Handing {name} the car keys for {poss} first solo drives brings equal parts bursting pride and white-knuckle terror. Every driver, adult and teen alike, thinks “I’ll just glance for one second at the red light!”, yet one glance plus one buzzing passenger chat is the single biggest preventable risk on teen roads. *Willpower fails at 55 mph; smart car habits and auto-silence don’t.*',
          pollQuestion: 'Honest parent check: do YOU ever glance at texts while driving with your teen in the car?',
          pollOptions: [
            {
              id: 'guilty-redlight',
              label: 'Honestly yes, at red lights or quick map taps!',
              response:
                'Owning that openly and signing the exact same Driving Focus pledge right beside {name} is the single strongest road-safety lesson you can give!',
            },
            {
              id: 'strict-car',
              label: 'Phone stays away while driving, and I want {name} locked into that habit too!',
              response:
                'Amazing foundation! Pairing your modeling with automatic Driving Focus + glovebox docking makes safe driving completely automatic.',
            },
          ],
          beat2Kicker: 'Willpower vs. automated safe-driving guardrails',
          beat2Title: 'You can’t peek at a ping that never lights up inside your reach',
          beat2Lead:
            'At 55 mph, taking your eyes off the road for 4.6 seconds to read a 4-word text covers the entire length of a football field completely blind. Compare willpower against the Automated Safe-Driving Guardrail below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: '“I’ll be careful” willpower vs. automated driving guardrail',
          visualStageHint: 'Compare relying on willpower vs. auto-silencing & docking',
          visualConfig: {
            willpowerLabel: '“I’ll Just Be Careful”',
            willpowerTitle: 'Phone buzzing in the cupholder within arm’s reach',
            willpowerDesc:
              'A lit screen flashing a friend’s name hijacks human attention reflexes automatically, even for cautious, well-meaning drivers.',
            willpowerOutcome: 'Split-second glances that risk catastrophic crashes.',
            guardrailLabel: 'Automated Car Guardrail',
            guardrailTitle: 'Auto Driving Focus + Out-of-Reach Dock + Mutual Pledge',
            guardrailDesc:
              'Bluetooth triggers automatic Do Not Disturb While Driving with an auto-reply (“Driving right now, text you when parked!”), playlist & GPS set BEFORE shifting out of Park, and phones tucked in the glovebox or backseat.',
            guardrailOutcome: 'Hands on wheel, eyes on road, zero urge to peek.',
            environmentShifts: [
              'Turn on Automatic Driving Focus / Android Driving Mode on BOTH your phone and {poss} phone today.',
              'Rule of Park: GPS destination and music playlist get queued strictly BEFORE shifting into Drive.',
              'Passenger Co-Pilot Rule: Remind {name} to speak up cleanly if a friend driver starts texting (“Hand me your phone. I’ll type it for you!”).',
            ],
          },
          almanacTruth:
            'Safe driving never relies on hoping your teen ignores a glowing screen in the cupholder, it relies on automating silence and tucking the phone out of reach before shifting out of Park.',
          scienceDeepDive:
            'National Highway Traffic Safety Administration (NHTSA) and AAA Foundation teen-driver naturalistic studies confirm that visual-manual phone distraction increases teen crash risk dramatically, while automated driving-focus blocking combined with strong parental modeling substantially lowers in-vehicle phone glances.',
          beat3Kicker: 'Practice before the first solo drive',
          beat3Title: 'Sign the Zero-Texting Pledge side-by-side, starting with your own phone',
          rehearsalTriggerSpeaker: '{Name} impatiently eager to grab the keys and head out',
          rehearsalTriggerQuote: '“Mom/Dad, I’m not dumb. I won’t text while driving! Why do we need to set up Driving Focus?”',
          rehearsalPrompt: 'Which tone triggers eye-rolls instead of genuine buy-in?',
          instincts: [
            {
              id: 'fear-horror',
              label: '“Because teenagers are reckless and crash all the time, do what I say or no car!”',
              whyTitle: 'Why that’s so tempting, and why it misses the mark',
              whyText:
                'Framing distraction as “teen recklessness” ignores that adults struggle with the exact same phone pull, and breeds pushback.',
            },
            {
              id: 'trust-only',
              label: '“You’re right, I trust you, just be super careful out there!”',
              whyTitle: 'Why that’s so tempting, and why it skips easy protection',
              whyText:
                'Skipping 30 seconds of Driving Focus setup leaves a buzzing screen fighting human reflexes unnecessarily.',
            },
          ],
          calmScriptPlain:
            '“Zero doubt you’re smart, honestly it’s human brain wiring, not intelligence! Even experienced adults get tugged by a buzzing cupholder. Let’s take 30 seconds right now to turn on Auto Driving Focus on BOTH our phones with an auto-reply, queue playlists in Park, and tuck phones out of reach, and if you ever catch ME touching my phone at a red light, call me out immediately.”',
          calmScriptSegments: [
            {
              id: 'human-wiring',
              text: '“Zero doubt you’re smart, honestly it’s human brain wiring, not intelligence! Even experienced adults get tugged by a buzzing cupholder. ',
              tag: 'Respectful non-condescending frame',
              note: 'Honors {poss} intelligence while naming the universal pull of pings.',
            },
            {
              id: 'thirty-sec-setup',
              text: 'Let’s take 30 seconds right now to turn on Auto Driving Focus on BOTH our phones with an auto-reply, queue playlists in Park, and tuck phones out of reach, ',
              tag: 'Mutual automated habit',
              note: 'Makes safety completely automatic for BOTH drivers.',
            },
            {
              id: 'call-me-out',
              text: 'and if you ever catch ME touching my phone at a red light, call me out immediately.”',
              tag: 'Parent accountability',
              note: 'Nothing earns teen safety buy-in faster than holding yourself to the exact same bar.',
            },
          ],
          deliveryCues: [
            'Never text or call {name} expecting an instant reply when you know {pronoun} {is} driving!',
            'Practice the friendly “Let me text for you” line {name} can use as a passenger with friends',
            'Keep passenger limits gradual during the first 6 months of solo driving, peers multiply distraction too',
          ],
          pushbacks: [
            {
              id: 'need-gps',
              label: 'What if {name} needs turn-by-turn GPS audio to navigate?',
              setup: 'Mount the phone securely on the dash with voice directions ON and Driving Focus silencing all texts/notifications!',
              script: '“Type the address in Park, turn voice guidance up, and let Driving Focus mute every single popup until you park.”',
            },
            {
              id: 'parent-texts-drive',
              label: 'What if I forget and text “Pick up milk!” while {name} is driving home?',
              setup: 'Celebrate the auto-reply instead of getting annoyed!',
              script: '“I love seeing your ‘Driving right now’ auto-reply pop up, proves the shield is working!”',
            },
          ],
          advisorPrompt:
            'My {age} teen is driving solo soon and I want to establish a rock-solid Zero-Texting Driving Pledge and automated phone setup together. What steps should we cover?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Set up your family Driving Shield in 60 seconds tonight',
          beat4Lead: 'Remove temptation from the front seat before the next drive.',
          moves: [
            {
              id: 'enable-driving-focus',
              title: 'Turn on Auto Driving Focus on BOTH phones',
              desc: 'Activate automatic driving detection + “Driving right now, will reply when parked!” auto-text side-by-side tonight.',
            },
            {
              id: 'park-rule',
              title: 'Adopt the “Playlist & Map in Park” ritual',
              desc: 'Model setting navigation and music before touching the gearshift on every single ride together.',
            },
            {
              id: 'passenger-script',
              title: 'Practice the smooth passenger-copilot line',
              desc: 'Equip {name} to say calmly in a friend’s car: “Yo, hand me your phone. I’ll text them back while you drive!”',
            },
          ],
          closingNote:
            'Turning on Driving Focus on your own phone right beside your new driver speaks louder than a hundred warnings: every trip home matters infinitely more than any text.',
          pocketInsight: 'Automate Driving Focus on both phones, queue music/GPS strictly in Park, and tuck phones out of arm’s reach.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 2',
            mystery: 'Before moving out into total digital freedom, how does a young adult audit their own feeds so apps serve THEM instead of draining them?',
            title: 'Auditing Your Own Attention: Muting, Unfollowing & Taking Back Peace',
            targetSlug: 'teen-self-directed-app-curation',
          },
          interactiveHighlights: ['Willpower vs. automated car guardrail', 'Mutual Driving Focus setup script'],
        },
      },
      {
        slug: 'teen-self-directed-app-curation',
        title: 'Auditing Your Own Attention: Muting, Unfollowing & Taking Back Peace',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Own your attention · From passive scroller to intentional curator',
          headline: 'Auditing Your Own Attention: Muting, Unfollowing & Taking Back Peace',
          deck: 'Why 17-year-olds roll their eyes at “screens are bad!”, yet jump right in when you hand them sharp tools to spot attention manipulation and curate calmer, brighter feeds.',
          sceneTime: '8:40 PM · COUCH SCROLLING',
          sceneBody:
            'After 40 minutes of scrolling Reels or TikTok, {name} locks {poss} screen with a quiet sigh: “Why do I always feel weirdly anxious and behind in life after watching videos?” *That exact moment of self-awareness is gold: {name} is ready to stop being the product and start editing {poss} own digital environment like an adult.*',
          pollQuestion: 'Does your teen ever notice feeling drained or edgy after long scrolling stretches?',
          pollOptions: [
            {
              id: 'yes-drained',
              label: 'Yes, {pronoun} even admits it feels empty afterward, yet still gets sucked back in!',
              response:
                'Feeling pulled back despite knowing better isn’t weakness, it’s world-class variable-reward design. Self-curating notifications and feeds hands power right back to {name}!',
            },
            {
              id: 'protective',
              label: '{Pronoun} guards screen privacy closely, so I want respectful ways to spark reflection',
              response:
                'Sharing YOUR OWN phone cleanup openly (“I muted 8 noisy apps today and feel way calmer”) sparks way more teen action than preaching!',
            },
          ],
          beat2Kicker: 'Inside the attention economy',
          beat2Title: 'Move from passive consumer to deliberate attention architect',
          beat2Lead:
            'Recommendation feeds optimize for outrage, envy, and midnight scroll length, never for a 17-year-old’s peace of mind. Flip both lenses below and explore how tiny monthly feed audits rebuild clarity.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Feed design: passive scroll lens vs. attention-architect lens',
          visualStageHint: 'Flip lenses and tap monthly digital-curation upgrades',
          visualConfig: {
            adultLabel: 'Default Autopilot Scroll',
            adultQuote: '“Why did I just lose 90 minutes watching strangers argue and make me feel inadequate?”',
            adultSub: 'Leaving every notification ON and following envy-inducing accounts hands your mood to an algorithm.',
            childLabel: 'Attention-Architect Lens',
            childQuote: '“Wait, my attention is my most valuable asset. If an account drains my mood, mute or unfollow in two seconds!”',
            childSub: 'Treating your home screen like a curated studio keeps inspiration, laughs, and real friends, and evicts noise.',
            exposureHeading: 'Self-Directed Attention Upgrades',
            exposureSub: 'Tap small curation tweaks to see digital peace climb',
            totalDots: 10,
            defaultCount: 4,
            unitLabel: 'curation move',
            lowMax: 3,
            midMax: 7,
            lowMsg: 'First tweaks (1–3): Turning off non-human red badge notifications cuts reflex phone checks in half.',
            midMsg: 'Growing mastery (4–7): Unfollowing comparison triggers + moving infinite apps off Screen 1 makes scrolling intentional.',
            highMsg: 'Digital sovereignty (8–10)! {Name} uses tech cleanly for creativity, learning, and friends, never letting feeds hijack mood.',
          },
          almanacTruth:
            'A young adult who realizes their attention is literally being harvested stops fighting parents over screen limits, and starts guarding their own focus fiercely.',
          scienceDeepDive:
            'Digital well-being intervention studies among late adolescents and university students show that autonomous self-directed friction (turning off non-human push notifications, removing infinite-feed icons from the home screen, and unfollowing social-comparison accounts) lowers stress far more durably than imposed restrictions.',
          beat3Kicker: 'Practice on the couch',
          beat3Title: 'Spark adult-level digital savvy by sharing your own cleanup first',
          rehearsalTriggerSpeaker: '{Name} sighing after a draining scroll session',
          rehearsalTriggerQuote: '“Ugh, my feed is literally just stressful news, drama, and people bragging. I feel terrible.”',
          rehearsalPrompt: 'Which parent response makes {name} shut down instead of taking ownership?',
          instincts: [
            {
              id: 'delete-all',
              label: '“See?! I told you social media is poison, delete all those apps right now!”',
              whyTitle: 'Why that’s so tempting, and why {pronoun} resists',
              whyText:
                'All-or-nothing commands make teens cling to their apps to defend their independence.',
            },
            {
              id: 'audit-for-them',
              label: '“Give me your phone, let’s go through who you follow together right now!”',
              whyTitle: 'Why that’s so tempting, and why it crosses age-17 privacy',
              whyText:
                'Taking a 17-year-old’s phone to edit their follows feels invasive when you want them curating independently.',
            },
          ],
          calmScriptPlain:
            '“Same, last week my feed was stressing me out nonstop until I realized algorithms push whatever gets our heart rate up, not what makes us happy! I did a 5-minute ‘Mute & Clear’, killed every non-human notification, hid two infinite apps off my home screen, and unfollowed anyone who left me feeling worse. Want to try a 5-minute feed detox on our own phones side-by-side right now?”',
          calmScriptSegments: [
            {
              id: 'shared-human',
              text: '“Same, last week my feed was stressing me out nonstop until I realized algorithms push whatever gets our heart rate up, not what makes us happy! ',
              tag: 'Normalize shared struggle',
              note: 'Positions BOTH of you as smart humans outsmarting attention engines.',
            },
            {
              id: 'concrete-tools',
              text: 'I did a 5-minute ‘Mute & Clear’, killed every non-human notification, hid two infinite apps off my home screen, and unfollowed anyone who left me feeling worse. ',
              tag: 'Actionable micro-tactics',
              note: 'Offers realistic surgical upgrades instead of dramatic total deletion.',
            },
            {
              id: 'private-sidebyside',
              text: 'Want to try a 5-minute feed detox on our own phones side-by-side right now?”',
              tag: 'Respectful parallel cleanup',
              note: 'Preserves full age-17 privacy while making curation immediately fun and doable.',
            },
          ],
          deliveryCues: [
            'Keep your eyes strictly on YOUR OWN phone during a side-by-side 5-minute cleanup',
            'Teach the “Aftertaste Test”: notice how your chest feels 2 minutes AFTER closing an app',
            'Encourage filling feeds with crafts, humor, nature, cooking, or real friends instead of outrage bait',
          ],
          pushbacks: [
            {
              id: 'social-fomo',
              label: 'What if {pronoun} can’t unfollow a classmate without social awkwardness?',
              setup: 'Remind {obj} of the quiet superpower built into every app: the MUTE button!',
              script: '“Muting is genius, zero social drama, they never know, and your feed gets instantly peaceful.”',
            },
            {
              id: 'grayscale',
              label: 'What’s one sneaky trick for stopping late-night infinite scrolling?',
              setup: 'Moving infinite apps into a folder on Page 3 (or scheduling Grayscale at 10 PM) breaks thumb autopilot effortlessly!',
              script: '“Just adding two extra taps, moving scroll apps off Page 1, lets your conscious brain catch up before autopilot takes over.”',
            },
          ],
          advisorPrompt:
            'My {age} teen feels drained by social media algorithms yet stays hooked on scrolling. How can I coach self-directed feed auditing and notification hygiene respectfully?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Run a 5-minute side-by-side “Attention Cleanup”',
          beat4Lead: 'Each on your own phone, zero peeking, instant mental breathing room.',
          moves: [
            {
              id: 'human-only-pings',
              title: 'Switch to “Humans-Only Notifications”',
              desc: 'Silence every shopping, news, streak, and algorithm ping, keep notifications strictly for real human texts and calls.',
            },
            {
              id: 'mute-five',
              title: 'Run the 5-account “Aftertaste” mute',
              desc: 'Quietly mute or unfollow five accounts that leave you feeling tense, envious, or cynical, add two that spark genuine joy.',
            },
            {
              id: 'clean-page-one',
              title: 'Make Home Screen Page 1 purely useful tools',
              desc: 'Keep calendar, maps, camera, notes, and music on Page 1; tuck infinite feeds inside a Page 2 folder so you open them intentionally.',
            },
          ],
          closingNote:
            'Handing your young adult the awareness to curate their own attention turns a glowing distraction box back into a tool that actually serves their dreams.',
          pocketInsight: 'Silence non-human pings, move infinite feeds off Page 1, and mute any account that fails the 2-minute Aftertaste Test.',
          nextEpisodeHook: {
            kicker: 'Next in this course · Episode 3',
            mystery: 'Before graduation day, how do you intentionally step OUT of parental controls and hand over full digital sovereignty with mutual trust?',
            title: 'The Young Adult Digital Covenant: Stepping Out of Controls Into Trust',
            targetSlug: 'teen-young-adult-digital-covenant',
          },
          interactiveHighlights: ['Autopilot vs. attention-architect lens', '5-minute side-by-side cleanup script'],
        },
      },
      {
        slug: 'teen-young-adult-digital-covenant',
        title: 'The Young Adult Digital Covenant: Stepping Out of Controls Into Trust',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Graduated handover · Removing training wheels before launch',
          headline: 'The Young Adult Digital Covenant: Stepping Out of Controls Into Trust',
          deck: 'Why keeping strict parental locks right up until dorm move-in day backfires, and how stepping intentionally out of controls at 17–18 launches truly self-regulated digital adults.',
          sceneTime: '6:45 PM · DINNER TABLE CONVERSATION',
          sceneBody:
            'For years, bedtime downtime schedules and family pacts protected {name} while {poss} brain was growing, and they worked! Yet now {name} is 17 or 18, about to manage {poss} own apartment, tuition, and nights out. *If the very first week {pronoun} experiences zero parental controls is alone in a dorm room, the sudden rebound can hit hard, removing the training wheels WITH you still nearby is the final masterstroke.*',
          pollQuestion: 'How ready do you feel to intentionally step out of device locks before {name} launches?',
          pollOptions: [
            {
              id: 'nervous',
              label: 'A little nervous, what if late-night scrolling shoots right back up?',
              response:
                'Testing full digital freedom while {name} still lives under your roof lets {obj} catch a 2 AM stumble early and build {poss} OWN guardrails!',
            },
            {
              id: 'ready',
              label: 'Ready. I want a proud, intentional milestone instead of awkward fading out!',
              response:
                'Making the handover explicit honors {poss} maturity and replaces technical controls with lifelong mutual respect.',
            },
          ],
          beat2Kicker: 'The 3-beat digital graduation loop',
          beat2Title: 'Remove training wheels before launch so {name} practices steering solo',
          beat2Lead:
            'Every great parental guardrail has a sunset date built in from day one. Stepping cleanly from enforced controls into a mutual Young Adult Digital Covenant honors maturity while keeping shared family values alive. Walk through the 3 beats below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat handover from controls to adult trust',
          visualStageHint: 'Tap each beat to graduate smoothly into digital sovereignty',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Celebrate the milestone',
                label: 'Remove Controls Together',
                quote: '“You’ve earned full ownership of your device, let’s take off the parental locks together today.”',
                desc: 'Turn off Screen Time locks, downtime restrictions, and app approvals openly, ideally 6–12 months before moving out.',
                brainNote: 'Replaces external enforcement with proud internal stewardship.',
              },
              {
                stepNum: '02',
                actor: '{Name} sets own guardrails',
                label: 'Self-Chosen Habits',
                quote: '“Which self-limits (bedtime focus, driving mode, app timers) do YOU want to keep for yourself?”',
                desc: 'Let {name} install {poss} own personal limits, just like healthy adults do to protect sleep and deep work.',
                brainNote: 'Internalized habits survive dorms, jobs, and adulthood effortlessly.',
              },
              {
                stepNum: '03',
                actor: 'Shared family culture',
                label: 'Mutual Adult Covenant',
                quote: 'Phones away at shared meals, respectful location sharing by consent, and open honest check-ins',
                desc: 'Keep only mutual adult-to-adult norms (like phones down at family dinners and optional mutual safety sharing by consent).',
                brainNote: 'Anchors warm presence every time {name} comes home for the next 40 years.',
              },
            ],
          },
          almanacTruth:
            'The ultimate proof that your family’s digital guardrails worked isn’t keeping locks on at age 18, it’s taking them off proudly and watching your young adult guard their own focus and peace.',
          scienceDeepDive:
            'Self-regulation and digital-maturity research emphasizes graduated autonomy transfer: adolescents who practice unmonitored device self-management during late high school, supported by warm parent coaching rather than abrupt move-in deregulation, show significantly healthier sleep and technology balance in their first year of independence.',
          beat3Kicker: 'Practice at the handover conversation',
          beat3Title: 'Make stepping out of controls a moment of genuine pride',
          rehearsalTriggerSpeaker: '{Name} asking when parental limits or tracking finally come off',
          rehearsalTriggerQuote: '“I’m almost eighteen, are you seriously going to keep tracking my screen time when I’m an adult?!”',
          rehearsalPrompt: 'Which reaction creates unnecessary friction at the finish line?',
          instincts: [
            {
              id: 'cling-bill',
              label: '“As long as you’re on my phone plan, I’m keeping every single lock and tracker turned on!”',
              whyTitle: 'Why that’s so tempting, and why it erodes adult respect',
              whyText:
                'Using the cell bill as leverage turns normal graduation into an adversarial power struggle.',
            },
            {
              id: 'silent-drop',
              label: '“Ugh, fine, do whatever you want, I give up trying to manage your phone!”',
              whyTitle: 'Why that’s so tempting, and what it misses',
              whyText:
                'Throwing up your hands in exasperation misses a deeply affirming rite of passage into adulthood.',
            },
          ],
          calmScriptPlain:
            '“No way, our whole plan from day one was handing the wheel cleanly over to you! Let’s unlock parental controls together right now. You’re officially the owner of your own sleep, focus, and feeds, my only two adult-to-adult requests are keeping phones put away when we share family dinners, and staying honest about mutual safety check-ins when traveling.”',
          calmScriptSegments: [
            {
              id: 'honor-graduation',
              text: '“No way, our whole plan from day one was handing the wheel cleanly over to you! Let’s unlock parental controls together right now. ',
              tag: 'Proud rite of passage',
              note: 'Marks digital independence with trust instead of reluctant surrender.',
            },
            {
              id: 'full-stewardship',
              text: 'You’re officially the owner of your own sleep, focus, and feeds, ',
              tag: 'Clear ownership transfer',
              note: 'Invites {name} to step up into genuine adult self-leadership.',
            },
            {
              id: 'mutual-norms',
              text: 'my only two adult-to-adult requests are keeping phones put away when we share family dinners, and staying honest about mutual safety check-ins when traveling.”',
              tag: 'Lifelong respectful culture',
              note: 'Separates parental control from timeless mutual family courtesy.',
            },
          ],
          deliveryCues: [
            'If your family uses mutual location sharing for safety, confirm explicit adult consent both ways, never stealth tracking',
            'If {name} hits a rough late-night scrolling week right after unlock, skip “I told you so”, stay curious and supportive',
            'Model putting your own phone away warmly whenever {name} sits down to chat with you',
          ],
          pushbacks: [
            {
              id: 'location-sharing',
              label: 'What about family location sharing (Find My / Life360) after 18?',
              setup: 'Make it 100% transparent, mutual, and strictly for logistics/safety, never surveillance!',
              script: '“Totally your call at 18, if we keep Find My on mutually for road trips and safety, I promise I’ll never use it to stalk your Friday nights!”',
            },
            {
              id: 'stumbles-after',
              label: 'What if {poss} screen time spikes for two weeks right after locks come off?',
              setup: 'Totally normal novelty rebound! Give it 2–3 weeks to level out, then check in gently like a consultant.',
              script: '“Novelty spikes are totally normal, how are your sleep and energy feeling this week, and do you want any focus tools?”',
            },
          ],
          advisorPrompt:
            'My {age} teen is nearly 18 and ready to transition off parental device controls. How do we hold a respectful Young Adult Digital Covenant handover?',
          beat4Kicker: 'Tonight’s experiment',
          beat4Title: 'Plan your proud Digital Independence Handover',
          beat4Lead: 'Turn removing training wheels into a lasting memory of mutual trust.',
          moves: [
            {
              id: 'set-unlock-date',
              title: 'Pick your intentional “Controls-Off” date',
              desc: 'Plan to retire parental locks 6–12 months before launch so {name} practices full digital steering under your warm roof.',
            },
            {
              id: 'mutual-covenant',
              title: 'Agree on 2 lifelong adult family tech norms',
              desc: 'Examples: phones tucked away at shared family dinners + honest consensual safety check-ins during long road trips.',
            },
            {
              id: 'toast-journey',
              title: 'Celebrate how far {name} has come',
              desc: 'Share a quiet toast over dinner or coffee honoring the judgment, kindness, and independence {name} built across childhood.',
            },
          ],
          closingNote:
            'From the very first bedtime screen boundary years ago to today’s proud handover of full digital freedom, you stayed right alongside {name}, and now {pronoun} walks forward ready to guard {poss} own time, heart, and life.',
          pocketInsight: 'Remove parental controls intentionally 6–12 months before launch, honor consensual safety, and keep phones down at shared family meals.',
          nextEpisodeHook: null,
          interactiveHighlights: ['3-beat digital graduation loop', 'Controls-off handover script'],
        },
      },
    ],
  }),
];
