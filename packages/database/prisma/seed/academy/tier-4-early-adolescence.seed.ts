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

export const TIER_4_EARLY_ADOLESCENCE_MODULES: AcademyModuleSeedData[] = [
  // ===========================================================================
  // COURSE 31: Defusing Teen Pushback, Risk & Mutual Trust (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'behavior-adolescent-identity',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    developmentalTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    title: 'Defusing Teen Pushback, Risk & Mutual Trust',
    reliefSubtitle:
      'Defuse 60-second teen blowups by validating first, decode why smart 14-year-olds take peer risks, co-create rules they respect, and rebuild trust cleanly',
    tonightQuickWinTitle: 'Episode 1: Validate First, Problem-Solve Second: Defusing 60-Second Blowups',
    summary:
      'Lower teen defensiveness immediately by reflecting before lecturing, understand the peer-multiplier effect on early adolescent risk perception, replace unilateral decrees with co-created agreements, and repair broken trust without holding grudges.',
    coverImageUrl: 'https://assets.alongside.care/academy/behavior-adolescent.png',
    sortOrder: 7,
    episodes: [
      {
        slug: 'adolescent-validate-first-framework',
        title: 'Validate First, Problem-Solve Second: Defusing 60-Second Blowups',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: '60-second cool-down · Validate before solving',
          headline: 'Validate First, Problem-Solve Second: Defusing 60-Second Blowups',
          deck: 'Why jumping straight into advice or logic makes a 14-year-old explode—and how 15 seconds of genuine validation brings their brilliant problem-solving brain back online.',
          sceneTime: '5:45 PM · KITCHEN ISLAND',
          sceneBody:
            '{Name} storms in throwing {poss} backpack onto a chair: “Mr. Harris is the WORST teacher alive—he gave me a C on a lab I spent three hours on! High school is pointless!” *Instantly your brain sees the fix (“Did you check the rubric?”)—yet the second you ask, {pronoun} shouts “YOU ALWAYS TAKE THE TEACHER’S SIDE!”*',
          pollQuestion: 'Does offering logical help trigger instant defensiveness with your teen?',
          pollOptions: [
            {
              id: 'instant',
              label: 'Yes—my helpful advice sounds like criticism to {obj}!',
              response:
                'Every teen parent learns this hard truth: a flooded 14-year-old hears premature problem-solving as “You did this wrong!”—pausing to validate for 15 seconds opens {poss} ears wide.',
            },
            {
              id: 'quiet',
              label: '{Pronoun} clams up and says “Never mind, forget I said anything”',
              response:
                'Asking “Do you want me to just listen right now, or brainstorm a next step?” prevents shutdowns almost every single time!',
            },
          ],
          beat2Kicker: 'Inside the 14-year-old brain',
          beat2Title: 'Validation isn’t agreement—it’s unlocking the front door',
          beat2Lead:
            'In early adolescence, the emotional gas pedal runs at 100% power while frontal brakes are still 80% wired. Validating how hard a moment feels drops defensiveness fast enough for real logic to enter. Toggle both states below.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Premature advice vs. validate-first bridge',
          visualStageHint: 'Toggle instant fixing vs. 15-second validation',
          visualConfig: {
            calmToggleLabel: 'Validate First (15 sec)',
            stormToggleLabel: 'Jump Straight to Fixing',
            calmStatus: 'DEFENSES DROPPED · READY TO THINK',
            stormStatus: 'FEELS JUDGED · SHUTTING YOU OUT',
            calmReadouts: [
              {
                name: 'Emotional Pressure Valve',
                value: 'Releasing',
                tone: 'spruce',
                desc: 'Hearing “Three hours of work for a C—no wonder you’re furious!” drains heat in seconds.',
              },
              {
                name: 'Problem-Solving Cortex',
                value: 'Re-Engaged',
                tone: 'spruce',
                desc: 'Once heard, {name} actually ASKS for your take on emailing the teacher or reviewing the rubric.',
              },
            ],
            stormReadouts: [
              {
                name: 'Adolescent Threat Radar',
                value: 'Spiked',
                tone: 'amber',
                desc: '“Did you read the rubric?” lands straight as “You’re careless and I’m siding against you.”',
              },
              {
                name: 'Parent-Teen Bridge',
                value: 'Slammed Shut',
                tone: 'amber',
                desc: 'Teens stop bringing academic or social struggles home if every vent turns into a critique.',
              },
            ],
          },
          almanacTruth:
            'Validation never means agreeing with unfairness or excusing mistakes—it simply says “Your frustration makes total human sense” BEFORE opening the toolbox.',
          scienceDeepDive:
            'Neurodevelopmental findings synthesized by Dr. Frances Jensen and Dr. Dan Siegel show that high limbic reactivity paired with ongoing prefrontal pruning causes early adolescents to misread neutral corrective questions as hostility during acute frustration; brief emotional mirroring restores cognitive openness rapidly.',
          beat3Kicker: 'Practice in the kitchen',
          beat3Title: 'Catch the fixing reflex and ask the golden 3-way question',
          rehearsalTriggerSpeaker: '{Name} venting angrily about a tough grade or friend clash',
          rehearsalTriggerQuote: '“Nobody listens to me—that grade was totally unfair and I’m DONE trying in that class!”',
          rehearsalPrompt: 'Which well-meaning response blows up the conversation?',
          instincts: [
            {
              id: 'rubric',
              label: '“Well, did you double-check the instructions before turning it in?”',
              whyTitle: 'Why that’s so tempting—and why it detonates',
              whyText:
                'It’s a totally reasonable question—just twenty minutes too early! Asking it mid-vent sounds like courtroom cross-examination.',
            },
            {
              id: 'silver',
              label: '“Hey, one C isn’t the end of the world—look on the bright side!”',
              whyTitle: 'Why that’s so tempting—and why teens groan',
              whyText:
                'Silver-lining phrases skip right over the sting—making teens double down on how awful everything is.',
            },
          ],
          calmScriptPlain:
            '“Oof—pouring three solid hours into a lab and getting a C back stings like crazy! No wonder you’re frustrated. Do you want me to just listen while you vent, brainstorm an email to Mr. Harris, or just grab snacks and table it till later?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'mirror',
              text: 'Oof—pouring three solid hours into a lab and getting a C back stings like crazy! No wonder you’re frustrated.',
              tag: 'Pure 10-Second Validation',
              note: 'Honors the effort and real sting without trashing the teacher OR lecturing {name}.',
            },
            { text: ' ' },
            {
              id: 'menu3',
              text: 'Do you want me to just listen while you vent, brainstorm an email to Mr. Harris, or just grab snacks and table it till later?',
              tag: 'Listen / Brainstorm / Space',
              note: 'Gives {name} complete dignity over the next beat—nine times out of ten {pronoun} asks for help within ten minutes!',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Bite back “Did you…?” and “You should…” for the first 60 seconds',
            'Keep voice warm, low, and un-panicked',
            'Wait for consent before offering any suggestion',
          ],
          pushbacks: [
            {
              id: 'actuallyfault',
              label: '“What if {name} genuinely forgot half the assignment?”',
              setup: 'Validate the sting FIRST anyway—honesty surfaces naturally once shame drops:',
              script:
                '“Feeling wrecked over a grade is rough either way. Once you’ve had a snack, want to peek at his comments together so we know how to crush the next lab?”',
            },
            {
              id: 'justspace',
              label: '“{Name} says ‘I just want to be alone in my room!’”',
              setup: 'Respect the cool-down warmly with zero guilt-tripping:',
              script:
                '“Totally get it—take all the space you need. I’m on your team and hanging out in the kitchen whenever you want company or food.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) shuts down every time I try to help with school or friend stress—coach me on validating first without enabling excuses.”',
          beat4Kicker: 'Tonight’s 15-second pause',
          beat4Title: 'Pick one validation move to practice this week',
          beat4Lead: 'Fifteen quiet seconds upfront saves forty minutes of arguing.',
          moves: [
            {
              id: 'count15',
              title: 'Wait 15 full seconds of pure listening before offering ANY advice this week',
              desc: 'Reflect one honest emotion (“That sounds exhausting” / “Man, that stings”) first.',
            },
            {
              id: 'ask3',
              title: 'Use the 3-Option Check: “Listen, brainstorm, or space?”',
              desc: 'Watch instant defensiveness melt into genuine teen respect.',
            },
            {
              id: 'consent',
              title: 'Ask permission before giving a tip: “Want one quick idea, or not right now?”',
              desc: 'Respecting consent makes your wisdom 10x more likely to actually land.',
            },
          ],
          closingNote:
            'Every time you pause your fixing reflex and let {name} feel deeply understood first, you prove that your kitchen table is still {poss} safest place to think aloud.',
          pocketInsight:
            'Validate for 15 seconds before offering logic (“No wonder that stings!”) and ask “Do you want me to listen, brainstorm, or give you space?”',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Why can a super-smart, cautious 14-year-old make wildly impulsive choices the instant two friends are watching?”',
            title: 'Why Smart 14-Year-Olds Still Take Impulsive Risks Around Friends',
            targetSlug: 'adolescent-synaptic-pruning-limbic-surge',
          },
          interactiveHighlights: ['Validate-First Bridge', '3-Option Check Script'],
        },
      },
      {
        slug: 'adolescent-synaptic-pruning-limbic-surge',
        title: 'Why Smart 14-Year-Olds Still Take Impulsive Risks Around Friends',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'The Peer Multiplier · Solo caution vs. group daring',
          headline: 'Why Smart 14-Year-Olds Still Take Impulsive Risks Around Friends',
          deck: 'What Dr. Laurence Steinberg’s famous lab experiments proved about the teen “Peer Multiplier”—and how pre-scripted exit codes keep bright teens safe without lecturing.',
          sceneTime: '8:30 PM · FRIDAY PICKUP',
          sceneBody:
            'Alone at the kitchen table, {name} is thoughtful, ethical, and aces every safety quiz. Yet Friday night with three friends watching, {pronoun} jumped off a high fence or joined a reckless prank {pronoun} would NEVER try solo. *You stare in disbelief: “You KNOW better than that—what happened to your brain?!”*',
          pollQuestion: 'Have you seen {name} act noticeably bolder or goofier the second peers enter the room?',
          pollOptions: [
            {
              id: 'peerflip',
              label: 'Yes—totally different decision-maker in a group!',
              response:
                'You’re seeing the single most famous finding in teen brain science: the mere presence of two peers literally doubles reward-center firing in 13-to-16-year-olds—while barely budging adults!',
            },
            {
              id: 'ahead',
              label: 'Want to prepare {obj} before high-school party pressure hits',
              response:
                'Pre-planning a cool secret exit text (“X” = call me with a fake urgent pickup!) equips {name} to bow out cleanly while saving face with friends.',
            },
          ],
          beat2Kicker: 'Inside the adolescent risk engine',
          beat2Title: 'Flip the lens from “bad judgment” to the “Peer Multiplier”',
          beat2Lead:
            'In lab tests, teens playing solo assess risks just as accurately as adults—yet add two friends watching behind the chair and dopamine reward spikes wipe out cautious math! Flip lenses and tap the 10-step risk curve below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Solo-logic lens vs. peer-multiplier lens',
          visualStageHint: 'Flip lenses, then tap social-pressure levels 1–10 below',
          visualConfig: {
            adultLabel: 'Cold-logic adult lens',
            adultQuote: '“You’re a straight-A student—how could you possibly think climbing that roof was smart?!”',
            adultSub: 'Adults forget that “cold” quiet-room judgment operates differently from “hot” peer-watched emotion in a 14-year-old brain.',
            childLabel: 'Peer-multiplier brain lens',
            childQuote: '“When friends are watching, social reward lights up like fireworks—pre-planned exits save me in the heat of the moment!”',
            childSub: 'Understanding the Peer Multiplier lets teens laugh at their own biology and rely on concrete exit plans instead of willpower.',
            exposureHeading: 'From solo calm to high-heat peer pressure',
            exposureSub: 'Tap intensity levels 1–10 to see what keeps teens safe',
            totalDots: 10,
            defaultCount: 6,
            unitLabel: 'heat level',
            lowMax: 3,
            midMax: 7,
            lowMsg: 'Heat 1–3 (Solo or 1 close buddy): Prefrontal judgment runs crisp and reliable—great time to discuss real-world “what-if” plans.',
            midMsg: 'Heat 4–7 (Group hangout + dares): Dopamine spikes fast; pre-rehearsed shrug lines (“Nah, I’m good”) and blaming parents hold strong.',
            highMsg: 'Heat 8–10 (Late party or escalating risk): Relying on willpower fails—a 1-letter secret rescue text (“X”) pulls {name} out cleanly with zero shame!',
          },
          almanacTruth:
            'Smart teens don’t take foolish risks because they forgot the danger—they take them because peer eyes amplify reward circuits in the heat of the moment. Pre-scripted exit plans beat lectures every time.',
          scienceDeepDive:
            'Dr. Laurence Steinberg and Jason Chein’s fMRI driving-simulator studies (Developmental Science) demonstrated that adolescents took over twice as many risks when observed by two same-age peers—driven by selective ventral striatum activation—whereas adult risk-taking remained unchanged by peer observation.',
          beat3Kicker: 'Practice installing the secret exit',
          beat3Title: 'Set up the “X-Text Rescue Code” without sounding paranoid',
          rehearsalTriggerSpeaker: 'Casual car chat heading into a Friday hangout',
          rehearsalTriggerQuote: '“Mom, stop worrying—I’m not going to do anything dumb! Why don’t you trust me?”',
          rehearsalPrompt: 'Which parent response makes {name} feel policed instead of protected?',
          instincts: [
            {
              id: 'interrogate',
              label: '“I trust YOU, I just don’t trust your friends! Give me every single parent’s number!”',
              whyTitle: 'Why that’s so tempting—and why teens defend their friends fiercely',
              whyText:
                'Attacking {possessive} friends immediately triggers loyalty backlash—forcing {name} to side with peers against you.',
            },
            {
              id: 'skipplan',
              label: 'Drop the subject completely so you don’t seem overprotective.',
              whyTitle: 'Why that’s so tempting—and why a 30-second code is pure gold',
              whyText:
                'Giving a face-saving exit code respects {poss} independence while keeping a real safety net in {poss} pocket.',
            },
          ],
          calmScriptPlain:
            '“I totally trust your head—this is actually a cool face-saving cheat code! Anytime a hangout gets weird, loud, or crosses your line, text me just the letter ‘X’. I’ll call in 60 seconds acting like the strict parent who needs you home right now—zero awkwardness with friends and zero trouble with me.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'cheatcode',
              text: 'I totally trust your head—this is actually a cool face-saving cheat code!',
              tag: 'Respectful Ally Frame',
              note: 'Zero paranoia, zero friend-bashing—teens LOVE having a clever escape tool!',
            },
            { text: ' ' },
            {
              id: 'xcode',
              text: 'Anytime a hangout gets weird, loud, or crosses your line, text me just the letter ‘X’. I’ll call in 60 seconds acting like the strict parent who needs you home right now—zero awkwardness with friends and zero trouble with me.',
              tag: 'The X-Text Escape Hatch',
              note: 'Lets {name} exit risky peer pressure with 100% social dignity intact.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Never mock or attack {possessive} friends—ask curious neutral questions instead',
            'Channel healthy risk appetite into real-world thrills (climbing, skiing, stage, travel)',
            'Honor the X-Text rescue with ZERO lecturing in the car!',
          ],
          pushbacks: [
            {
              id: 'alreadyblew',
              label: '“{Name} already made a risky peer mistake tonight!”',
              setup: 'Lead with relief that {pronoun} {is} physically safe, then unpack the heat-of-the-moment trigger calmly tomorrow:',
              script:
                '“First—I’m just glad you’re safe. We’ll talk consequences calmly tomorrow morning when everyone’s rested; right now grab water and head to bed.”',
            },
            {
              id: 'healthythrill',
              label: '“How do I feed {possessive} craving for excitement safely?”',
              setup: 'Adolescent risk-taking is actually meant for brave positive leaps—feed it intentionally:',
              script:
                '“Trying out for theater, rock climbing, biking steep trails, or launching a mini neighborhood business gives that exact healthy adrenaline rush safely!”',
            },
          ],
          advisorPrompt:
            '“Help me introduce the ‘X-Text Rescue Code’ and talk calmly about peer pressure with my {ageShort} without lecturing.”',
          beat4Kicker: 'Before Friday night',
          beat4Title: 'Pick one proactive safety net to put in place',
          beat4Lead: 'Prepared teens make braver choices under pressure.',
          moves: [
            {
              id: 'xcode',
              title: 'Agree on your 1-letter secret rescue text (“X”) tonight',
              desc: 'Practice once how you’ll call acting like the “annoying strict parent” needing an immediate ride home.',
            },
            {
              id: 'knowcrew',
              title: 'Be the warm “Snack House” where {possessive} friends love hanging out',
              desc: 'Stocking pizza rolls and keeping a chill basement lets you naturally know {poss} circle without hovering.',
            },
            {
              id: 'thrill',
              title: 'Back one healthy real-world thrill or stretch challenge this season',
              desc: 'Channel natural teen boldness toward growth instead of reckless dares.',
            },
          ],
          closingNote:
            'The same fearless adolescent wiring that makes parents nervous on Friday nights is the exact spark that fuels courage, leadership, and bold leaps—your calm safety net lets {name} fly safely.',
          pocketInsight:
            'Peer presence doubles teen risk-reward impulses—install a zero-trouble “X-Text” rescue code, host the friendly snack house, and channel boldness into healthy thrills.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“Why do teens break strict unilateral rules—yet fiercely uphold house agreements they helped write?”',
            title: 'Co-Created House Rules Teens Actually Respect',
            targetSlug: 'adolescent-collaborative-boundary-agreements',
          },
          interactiveHighlights: ['Peer-Multiplier Curve', 'X-Text Rescue Script'],
        },
      },
      {
        slug: 'adolescent-collaborative-boundary-agreements',
        title: 'Co-Created House Rules Teens Actually Respect',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Warmth + structure · Authoritative teen boundaries',
          headline: 'Co-Created House Rules Teens Actually Respect',
          deck: 'Why “My roof, my rules!” breeds sneaky workarounds at fourteen—and how co-negotiating curfews, weekends, and chores earns genuine buy-in.',
          sceneTime: '11:30 AM · SATURDAY COFFEE TABLE',
          sceneBody:
            'You tell {name} Friday curfew is 9:00 PM flat. Instantly {pronoun} bristles: “That’s ridiculous—none of my friends even start hanging out until 7! You NEVER listen to my side!” *You refuse to drop real safety limits—yet how do you hold firm standards without constant trench warfare?*',
          pollQuestion: 'Do curfews, chores, or weekend rules trigger endless bargaining lately?',
          pollOptions: [
            {
              id: 'war',
              label: 'Yes—every limit feels like a power struggle!',
              response:
                'Developmental science calls the winning sweet spot “High Warmth + High Structure”: explain the real safety WHY, keep core non-negotiables firm, and let {name} co-design the flexible details!',
            },
            {
              id: 'sneak',
              label: 'Worry strict rules just push {obj} into hiding things',
              response:
                'Inviting {possessive} real input BEFORE locking a curfew cuts sneaking dramatically—because teens protect deals they helped shape.',
            },
          ],
          beat2Kicker: 'High warmth + clear structure',
          beat2Title: 'Compare unilateral decrees against co-created house agreements',
          beat2Lead:
            'Co-creating boundaries does NOT mean being permissive—it means distinguishing rock-solid safety “Non-Negotiables” from collaborative “Negotiables.” Compare both below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: '“My roof, my rules” vs. collaborative boundaries',
          visualStageHint: 'Compare top-down decrees with respectful co-negotiation',
          visualConfig: {
            willpowerLabel: 'Unilateral Decrees',
            willpowerTitle: '“Because I said so—end of discussion!”',
            willpowerDesc:
              'Top-down edicts without listening trigger teenage reactance—shifting energy straight into testing loopholes or concealing plans.',
            willpowerOutcome: 'Sneaking, slammed doors, and fractured honesty.',
            guardrailLabel: 'Co-Created Boundaries',
            guardrailTitle: 'Clear Safety Anchor + Collaborative Flexible Details',
            guardrailDesc:
              'State the non-negotiable safety value clearly (“I need to know where you are and get you safe sleep”), then ask {name} to propose a workable plan.',
            guardrailOutcome: 'Stronger follow-through, adult negotiation skills, and deep mutual trust.',
            environmentShifts: [
              'Separate Non-Negotiables (safety, sobriety, honesty, school-night sleep) from Negotiables (weekend curfew details, chore timing, bedroom decor).',
              'Let {name} pitch the FIRST proposal (“What curfew feels fair and lets you stay rested for Saturday’s game?”)—often teens suggest stricter limits than you expect!',
              'Tie expanded privileges cleanly to proven follow-through (“Three on-time pickups earns 30 extra minutes next month”).',
            ],
          },
          almanacTruth:
            'Co-creating rules isn’t giving up parental authority—it’s upgrading from prison guard to trusted negotiator so {name} actually honors the limit when you aren’t watching.',
          scienceDeepDive:
            'Decades of adolescent research (Steinberg, Age of Opportunity; Baumrind) demonstrate that authoritative parenting—combining high emotional warmth, transparent rationale, and democratic input within firm safety boundaries—produces the lowest rates of risk-taking and highest adolescent integrity.',
          beat3Kicker: 'Practice a weekend curfew negotiation',
          beat3Title: 'Hold the safety anchor while giving {name} real voice',
          rehearsalTriggerSpeaker: '{Name} pushing hard for an 11:00 PM Friday curfew at age 14',
          rehearsalTriggerQuote: '“Everyone’s staying at Sam’s till 11! Setting curfew at 9:30 makes me look like a little kid!”',
          rehearsalPrompt: 'Which reaction kills collaborative problem-solving immediately?',
          instincts: [
            {
              id: 'shut',
              label: '“I don’t care what Sam’s parents allow! 9:30, final answer—go to your room!”',
              whyTitle: 'Why that’s so tempting—and why kids stop negotiating honestly',
              whyText:
                'Drawing a sharp line stops the whining for ten seconds—yet teaches {name} that calm persuasion never works with you.',
            },
            {
              id: 'cave',
              label: 'Cave straight to 11:00 PM despite feeling genuinely uneasy about safety or sleep.',
              whyTitle: 'Why that’s so tempting—and why kids actually feel steadier with clear walls',
              whyText:
                'Teens thrive when parents hold calm, thoughtful boundaries—not when boundaries collapse under volume.',
            },
          ],
          calmScriptPlain:
            '“I hear that 9:30 feels early when the movie doesn’t even end till 9:45—let’s look at it together! My two non-negotiables are knowing a parent is home and getting you home safely before I’m half-asleep. How about 10:15 if I text Sam’s mom to confirm—and if you’re right on time three Fridays straight, we revisit for 10:30?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'heard',
              text: 'I hear that 9:30 feels early when the movie doesn’t even end till 9:45—let’s look at it together!',
              tag: 'Respects Real Context',
              note: 'Proves you actually heard {possessive} practical point instead of issuing a blind no.',
            },
            { text: ' ' },
            {
              id: 'anchor',
              text: 'My two non-negotiables are knowing a parent is home and getting you home safely before I’m half-asleep. How about 10:15 if I text Sam’s mom to confirm—and if you’re right on time three Fridays straight, we revisit for 10:30?',
              tag: 'Safety Anchor + Earned Ladder',
              note: 'Keeps real safety intact while showing clearly how reliability earns more freedom.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Ask “Pitch me a plan that meets both of our needs!”',
            'Always explain the real “Why” behind non-negotiables calmly',
            'Put agreed weekend rules in a quick shared family note so nobody misremembers',
          ],
          pushbacks: [
            {
              id: 'chores',
              label: '“{Name} hates being nagged about chores every weekend”',
              setup: 'Hand over timing autonomy while keeping the deadline crystal-clear:',
              script:
                '“Zero nagging from me—laundry and trash just need to be done anytime before Sunday at 4 PM so you choose the exact window that fits your weekend.”',
            },
            {
              id: 'stillno',
              label: '“What when the answer genuinely HAS to stay a hard No?”',
              setup: 'Hold a clear, compassionate No with zero guilt or debating:',
              script:
                '“I know this answer feels super frustrating—an unsupervised party with older teens crosses my safety line, so tonight’s a firm No. Happy to host your crew here with pizza instead.”',
            },
          ],
          advisorPrompt:
            '“Help me divide our household boundaries into clear ‘Safety Non-Negotiables’ vs. ‘Co-Negotiable Privileges’ for my {ageShort}.”',
          beat4Kicker: 'This week’s boundary upgrade',
          beat4Title: 'Pick one friction rule to co-negotiate calmly',
          beat4Lead: 'Respectful voice today builds respectful follow-through all year.',
          moves: [
            {
              id: 'pitch1',
              title: 'Let {name} pitch the FIRST draft on one negotiable rule (chore timing or weekend curfew)',
              desc: 'Listen completely before responding—then blend in your safety non-negotiables.',
            },
            {
              id: 'why3',
              title: 'Write down your family’s top 3 “Safety Non-Negotiables” clearly',
              desc: 'When core safety rules are few and crystal-clear, teens take them seriously.',
            },
            {
              id: 'earnladder',
              title: 'Tie one upcoming privilege cleanly to 3 weeks of steady follow-through',
              desc: 'Shows directly that keeping agreements expands real freedom.',
            },
          ],
          closingNote:
            'Every time you invite {name} to the table as a thoughtful junior partner instead of issuing edicts from above, you rehearse the exact fairness and self-governance {pronoun} will need as an adult.',
          pocketInsight:
            'Hold safety non-negotiables firmly while inviting {name} to pitch flexible details (chore windows, earned curfew upgrades) so rules feel co-owned.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery: '“When a teen breaks a big agreement or lies to your face, how do you rebuild real trust without endless grudges?”',
            title: 'Rebuilding Trust After a Broken Rule (Without Grudges)',
            targetSlug: 'adolescent-trust-rebuilding-ladder',
          },
          interactiveHighlights: ['Authoritative Boundary Flip', 'Curfew Negotiation Script'],
        },
      },
      {
        slug: 'adolescent-trust-rebuilding-ladder',
        title: 'Rebuilding Trust After a Broken Rule (Without Grudges)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Trust Ladder · Clear visible rungs back to freedom',
          headline: 'Rebuilding Trust After a Broken Rule (Without Grudges)',
          deck: 'Why saying “I can NEVER trust you again!” pushes a 14-year-old into giving up on honesty—and how a concrete 3-rung Trust Ladder gives {obj} a proud path back.',
          sceneTime: '10:30 PM · FRONT PORCH',
          sceneBody:
            'You just learned {name} told you {pronoun} was studying at Maya’s house—when {pronoun} actually walked across town to an older kid’s hangout. *Your heart sinks with both relief that {pronoun} {is} safe AND real hurt over the lie. How do you hold real accountability without breaking your bond?*',
          pollQuestion: 'When a teen lies or breaks a major rule, what feels hardest to balance?',
          pollOptions: [
            {
              id: 'pathback',
              label: 'Knowing how long consequences should last—and how to restore trust',
              response:
                'Indefinite punishment (“You’re grounded until further notice!”) breeds hopelessness—while a concrete 2-week Trust Ladder gives {name} crystal-clear actions to EARN trust back!',
            },
            {
              id: 'hurt',
              label: 'My own hurt feelings making me lecture or hold a grudge',
              response:
                'Sleeping on it overnight before setting the repair plan keeps your voice steady, firm, and loving.',
            },
          ],
          beat2Kicker: 'Restoring integrity cleanly',
          beat2Title: 'The 3-step Trust Rebuilding Loop turns a big slip into maturity',
          beat2Lead:
            'Trust isn’t an on/off light switch—it’s a bridge repaired one concrete promise at a time. Tap the 3 restorative rungs below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-rung Trust Rebuilding Loop',
          visualStageHint: 'Tap each rung from calm pause to restored privileges',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Pause overnight',
                label: 'Sleep Before Sentencing',
                quote: '“I’m glad you’re home safe—I’m too hurt to talk well tonight, so we’ll reset at breakfast.”',
                desc: 'Prevents nuclear 10:30 PM punishments you’ll later regret while signaling seriousness cleanly.',
                brainNote: 'Cool nervous systems allow genuine remorse instead of defensive anger.',
              },
              {
                stepNum: '02',
                actor: 'Name impact',
                label: 'Separate Choice From Worth',
                quote: '“I love you 100%, AND hiding where you were broke our safety trust.”',
                desc: 'Ask calmly: “What made telling the truth feel too hard last night?” (often reveals fear of explosion).',
                brainNote: 'Separating mistake from character keeps shame from turning into cynicism.',
              },
              {
                stepNum: '03',
                actor: 'Climb rungs',
                label: 'Concrete 2-Week Ladder',
                quote: 'Rung 1: Check-ins on time → Rung 2: Hosted hangouts → Rung 3: Full weekend trust restored!',
                desc: 'Give 2–3 clear, measurable steps over 10–14 days—and celebrate every kept word cleanly with zero lingering grudge.',
                brainNote: 'Proves trust is earned through steady actions, putting dignity back in {poss} hands.',
              },
            ],
          },
          almanacTruth:
            'Never say “I can’t trust you anymore”—say “Trust got bruised last night, and here are the exact three steps to rebuild it strong over the next two weeks.”',
          scienceDeepDive:
            'Adolescent integrity and restorative justice studies indicate that time-bounded, transparent trust-restoration plans paired with unconditional parental warmth foster significantly lower recidivism and higher subsequent honesty than open-ended punitive grounding or character shaming.',
          beat3Kicker: 'Practice the next-morning reset',
          beat3Title: 'Hold firm truth-telling accountability without crushing {poss} spirit',
          rehearsalTriggerSpeaker: '{Name} looking guilty at the breakfast table the next morning',
          rehearsalTriggerQuote: '“I’m sorry I lied, okay?! Are you going to ground me for the whole summer now?!”',
          rehearsalPrompt: 'Which hurt response closes the door to future honesty?',
          instincts: [
            {
              id: 'forever',
              label: '“You lied straight to my face! You’re grounded until I feel like I can trust you again!”',
              whyTitle: 'Why that’s so tempting—and why kids give up trying',
              whyText:
                'When a teen sees zero clear exit path, “I’m already labeled a liar anyway” kicks in—fueling deeper secrecy.',
            },
            {
              id: 'sweep',
              label: '“Just promise you’ll never do it again!” with zero follow-through step.',
              whyTitle: 'Why that’s so tempting—and why real rungs help',
              whyText:
                'Clear, respectful, short-term check-in rungs let {name} genuinely FEEL the pride of winning trust back.',
            },
          ],
          calmScriptPlain:
            '“No summer-long grounding—and I love you just as fiercely today as yesterday. Hiding where you were genuinely shook our safety trust, so let’s rebuild it cleanly together: for the next two weeks we pause solo outings and do quick arrival check-in texts—nail those cleanly, and full Friday freedom comes straight back!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'love',
              text: 'No summer-long grounding—and I love you just as fiercely today as yesterday.',
              tag: 'Unconditional Anchor',
              note: 'Reassures {name} that your love is rock-solid while keeping accountability crystal-clear.',
            },
            { text: ' ' },
            {
              id: 'ladder',
              text: 'Hiding where you were genuinely shook our safety trust, so let’s rebuild it cleanly together: for the next two weeks we pause solo outings and do quick arrival check-in texts—nail those cleanly, and full Friday freedom comes straight back!',
              tag: 'Visible 2-Week Trust Ladder',
              note: 'Hands {name} clear agency to earn back full freedom through real, observable integrity.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Always sleep on big rule breaks before naming consequences',
            'Keep consequences short (1–2 weeks max) and tied directly to the broken trust',
            'Once earned back, drop the old mistake completely—zero bringing it up months later',
          ],
          pushbacks: [
            {
              id: 'whyhid',
              label: '“{Name} says ‘I lied because I knew you’d say No and freak out!’”',
              setup: 'Listen closely without excusing the lie—there’s useful relationship feedback right there:',
              script:
                '“Thanks for being honest about that! I’ll work on staying calmer when you pitch big asks, AND even when my answer is No, honesty stays our non-negotiable deal.”',
            },
            {
              id: 'slipsagain',
              label: '“What if {pronoun} breaks a rung halfway up the Trust Ladder?”',
              setup: 'Stay calm and steady—simply restart the 7-day rung with zero yelling:',
              script:
                '“Oops, missed the check-in text yesterday—no lecture, we just reset this 7-day rung starting today so you can nail it clean.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) broke a big trust rule—help me write a calm, firm, 2-week ‘Trust Rebuilding Ladder’ with 3 clear rungs.”',
          beat4Kicker: 'Next time trust gets bruised',
          beat4Title: 'Pick one steady trust habit to keep on deck',
          beat4Lead: 'Teens grow into deeply trustworthy adults when they see how repair really works.',
          moves: [
            {
              id: 'sleeprule',
              title: 'Adopt the “Never Sentence After 9 PM” personal parent rule',
              desc: 'Say calmly: “Glad you’re safe—we’ll sort this out calmly at breakfast.”',
            },
            {
              id: 'twoweekcap',
              title: 'Replace open-ended groundings with a crisp 3-rung 14-day Trust Ladder',
              desc: 'Short, measurable actions rebuild integrity far faster than indefinite bans.',
            },
            {
              id: 'cleanslate',
              title: 'Mark the restored date with a warm reset (“Trust rebuilt—fresh slate!”)',
              desc: 'Releasing grudges cleanly makes honesty feel deeply rewarding.',
            },
          ],
          closingNote:
            'How you respond on the morning after {name} messes up teaches {obj} more about grace, integrity, and real-world repair than a thousand peaceful Tuesdays ever could.',
          pocketInsight:
            'Pause overnight after a broken rule, separate love from accountability, and build a visible 2-week Trust Ladder with 3 concrete rungs back to full freedom.',
          nextEpisodeHook: null,
          interactiveHighlights: ['3-Rung Trust Ladder', 'Next-Morning Repair Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 32: Teen Sleep Debt, Nightstand Boundaries & Stress Recovery (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'health-adolescent-sleep-protection',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    developmentalTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    title: 'Teen Sleep Debt, Nightstand Boundaries & Stress Recovery',
    reliefSubtitle:
      'Keep phones off teen nightstands without a nightly war, see how sleep starvation mimics anxiety and depression, and build quick daily stress and sports-rest resets',
    tonightQuickWinTitle: 'Episode 1: Keeping Phones Out of Teen Bedrooms Without a War',
    summary:
      'Negotiate a dignified phone-free bedroom boundary that protects 8.5–9 hours of teen rest, decode the neurological overlap between chronic sleep debt and mood swings, and equip busy teens with quick non-clinical breath, movement, and rest-day recovery habits.',
    coverImageUrl: 'https://assets.alongside.care/academy/health-adolescent.png',
    sortOrder: 7,
    episodes: [
      {
        slug: 'adolescent-tech-free-nightstand',
        title: 'Keeping Phones Out of Teen Bedrooms Without a War',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Bedroom sanctuary · Real alarm clock, docked phone',
          headline: 'Keeping Phones Out of Teen Bedrooms Without a War',
          deck: 'Why 1 AM nightstand scrolling steals the exact dawn REM sleep teens need for emotional armor—and how to co-design a hallway dock without power struggles.',
          sceneTime: '11:45 PM · HALLWAY LIGHT UNDER DOOR',
          sceneBody:
            'You walk past {possessive} door before bed and spot the unmistakable cool blue glow bouncing off the ceiling. Tomorrow’s alarm rings at 6:30 AM, yet {name} insists {pronoun} “needs the phone for an alarm and studying.” *How do you reclaim bedroom sleep without raiding {poss} room like a warden?*',
          pollQuestion: 'Does late-night phone use quietly eat into {possessive} school-night sleep?',
          pollOptions: [
            {
              id: 'midnight',
              label: 'Yes—scrolling past 11 PM wrecks the entire next day',
              response:
                'Dr. Matthew Walker calls late-night phones the #1 thief of teen REM sleep! Moving charging outside bedrooms—paired with a cool sunrise alarm clock—adds up to 5 extra hours of sleep every week.',
            },
            {
              id: 'pushback',
              label: '{Name} fights hard anytime I suggest docking the phone',
              response:
                'Framing the bedroom dock around athletic recovery, clear skin, and better mood (and docking YOUR phone too!) gets 10x more teen buy-in than “Because I said so.”',
            },
          ],
          beat2Kicker: 'Protecting the sleep sanctuary',
          beat2Title: 'Compare willpower nightstands against the Hallway Dock Guardrail',
          beat2Lead:
            'Expecting a tired 14-year-old with an unlocked screen inches from {poss} pillow to resist 11 PM notifications is asking for superhuman willpower few adults possess. Compare both setups below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Nightstand willpower vs. hallway charging dock',
          visualStageHint: 'Compare bedroom phones with a dignified hallway sanctuary',
          visualConfig: {
            willpowerLabel: 'Nightstand Willpower',
            willpowerTitle: 'Phone charging beside pillow “just as an alarm”',
            willpowerDesc:
              'Every midnight vibration and “just one quick check” shatters REM emotional-repair cycles and pushes sleep past midnight.',
            willpowerOutcome: 'Exhausted 6:30 AM wake-ups, brain fog, and hair-trigger moods.',
            guardrailLabel: 'Shared Hallway Dock',
            guardrailTitle: 'Cool sunrise alarm clock + hallway dock at agreed hour',
            guardrailDesc:
              'Upgrade {poss} nightstand with a sleek sunrise alarm clock and Bluetooth audio speaker while ALL family phones sleep in the hallway/kitchen dock.',
            guardrailOutcome: '45–60 extra minutes of restorative REM sleep every school night.',
            environmentShifts: [
              'Swap the phone alarm for a genuinely cool sunrise-glow alarm clock {name} picks {obj}self.',
              'Agree on a realistic teen dock hour (e.g., 9:30–10:00 PM on school nights) so {pronoun} finishes homework & chats cleanly.',
              'Parents dock in the shared spot too (or keep a plain alarm clock)—solidarity kills hypocrisy complaints!',
            ],
          },
          almanacTruth:
            'Protecting a screen-free teen bedroom isn’t about distrust—it’s protecting the last two hours of dawn REM sleep that act as overnight emotional therapy for a 14-year-old brain.',
          scienceDeepDive:
            'Sleep neuroscience (Walker, Why We Sleep; Hale & Guan) shows that early-morning REM sleep—disproportionately amputated by late-night screen delay and early high-school start times—plays a critical role in recalibrating amygdala reactivity and consolidating emotional memory.',
          beat3Kicker: 'Practice a calm reset chat',
          beat3Title: 'Move phones out of bedrooms on a Sunday afternoon—not at midnight',
          rehearsalTriggerSpeaker: '{Name} protesting a proposed 9:45 PM hallway dock',
          rehearsalTriggerQuote: '“I’m FOURTEEN! All my friends sleep with their phones—you’re treating me like a middle-schooler!”',
          rehearsalPrompt: 'Which defensive response locks in a bedroom raid war?',
          instincts: [
            {
              id: 'raid',
              label: 'March in at 11 PM and yank the charger out of the wall.',
              whyTitle: 'Why that’s so tempting—and why teens hide burner cables',
              whyText:
                'Midnight raids spark explosive anger and push kids into secretly stashing old devices under mattresses.',
            },
            {
              id: 'honor',
              label: '“Fine, keep it—just PROMISE not to look after 10!”',
              whyTitle: 'Why that’s so tempting—and why algorithms win at 11 PM',
              whyText:
                'Even brilliant adults check bedside phones at midnight—designing the room beats testing willpower.',
            },
          ],
          calmScriptPlain:
            '“Honestly, I don’t even trust MY own adult willpower with a phone next to my pillow! Let’s run a 2-week family experiment: I’ll buy you whatever cool sunrise alarm clock you pick, we BOTH dock phones in the hallway at 9:45 on school nights, and after two weeks you tell me honestly if your mornings and soccer energy feel way better.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'equal',
              text: 'Honestly, I don’t even trust MY own adult willpower with a phone next to my pillow!',
              tag: 'Zero-Condescension Humility',
              note: 'Instantly removes the “treating me like a baby” sting.',
            },
            { text: ' ' },
            {
              id: 'trial',
              text: 'Let’s run a 2-week family experiment: I’ll buy you whatever cool sunrise alarm clock you pick, we BOTH dock phones in the hallway at 9:45 on school nights, and after two weeks you tell me honestly if your mornings and soccer energy feel way better.',
              tag: '2-Week Shared Experiment',
              note: 'Teens say yes to collaborative 2-week experiments—and once they FEEL rested, they often keep the dock willingly!',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Never negotiate sleep rules when angry at 11 PM—talk Sunday afternoon',
            'Let {name} pick out a sleek sunrise clock or aesthetic lamp upgrade',
            'Keep weekends slightly looser while guarding school nights cleanly',
          ],
          pushbacks: [
            {
              id: 'homework10',
              label: '“High-school homework genuinely keeps me on Google Docs until 10:15 PM!”',
              setup: 'Separate study laptops (kept at a desk with Night Shift warm light) from bedroom phones:',
              script:
                '“Totally fair for big project nights—phones still dock at 9:45 so group chats don’t double your homework time, and laptops stay on the desk, never on the pillow.”',
            },
            {
              id: 'friendcrisis',
              label: '“What if a friend texts me upset late at night?!”',
              setup: 'Relieve that heavy teen caregiver burden with love and clarity:',
              script:
                '“Being a loyal friend is awesome—AND you are never responsible for running a 2 AM crisis hotline at fourteen. If a friend ever needs real help overnight, they have parents or 988, and you’re a 10x better friend tomorrow when you’ve actually slept.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) fights taking the phone out of {poss} bedroom—help me pitch a dignified 2-week ‘Sleep Experiment’ together.”',
          beat4Kicker: 'This Sunday’s upgrade',
          beat4Title: 'Pick one nightstand swap to launch this week',
          beat4Lead: 'Upgrade the room instead of policing the teen.',
          moves: [
            {
              id: 'sunriseclock',
              title: 'Let {name} pick a cool sunrise alarm clock online tonight',
              desc: 'Makes switching off the phone alarm feel like a room upgrade, not a downgrade.',
            },
            {
              id: 'exp14',
              title: 'Pitch a “14-Day Family Hallway-Dock Experiment” (adults included!)',
              desc: 'Track morning grogginess and afternoon energy 1–10 together—let {poss} own body prove the win.',
            },
            {
              id: 'curfewsync',
              title: 'Align your neutral bedtime curfew schedule cleanly with the agreed dock hour',
              desc: 'When apps sleep quietly on schedule, temptation drops to zero.',
            },
          ],
          closingNote:
            'Giving a fourteen-year-old back five hours of restful sleep a week changes everything—clearer thinking, steadier friendships, and a lighter mood walking out the door each morning.',
          pocketInsight:
            'Upgrade {possessive} nightstand with a cool sunrise alarm clock, dock ALL family phones in a shared hallway spot on school nights, and pitch it as a 2-week energy experiment.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Why does running on 6.5 hours of sleep mimic anxiety, irritability, and brain fog in 14-year-olds?”',
            title: 'How Chronic Sleep Debt Mimics Anxiety & Mood Swings',
            targetSlug: 'adolescent-sleep-debt-neurobiology',
          },
          interactiveHighlights: ['Hallway Dock Flip', '2-Week Experiment Script'],
        },
      },
      {
        slug: 'adolescent-sleep-debt-neurobiology',
        title: 'How Chronic Sleep Debt Mimics Anxiety & Mood Swings',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Sleep debt vs. mood · Overnight emotional reset',
          headline: 'How Chronic Sleep Debt Mimics Anxiety & Mood Swings',
          deck: 'Why a sleep-starved teen’s emotional alarm fires 60% hotter—and why checking the sleep log is always Step 1 before assuming something is deeply wrong.',
          sceneTime: '4:30 PM · THURSDAY AFTERNOON',
          sceneBody:
            'All week {name} has been tearful, snapped over tiny things, and sworn {pronoun} “can’t handle high school anymore.” Before panicking, you do quick math: 6.5 hours Monday, 6 hours Tuesday, 6.5 hours Wednesday—nearly **eight hours of missing sleep** by Thursday afternoon! *Wait—can missing sleep really look THAT much like anxiety?*',
          pollQuestion: 'Have you noticed {possessive} mood, patience, and outlook plummet after 2–3 short nights?',
          pollOptions: [
            {
              id: 'dramatic',
              label: 'Dramatically—night and day difference after a full sleep!',
              response:
                'Neuroimaging confirms it! Without 8.5–9.5 hours, the calm prefrontal-to-amygdala brake wire goes dim—turning ordinary teen stressors into overwhelming crises.',
            },
            {
              id: 'overloaded',
              label: 'Honors homework + late sports leave barely 7 hours on the clock',
              response:
                'Helping {name} audit ONE overscheduled evening or late-night homework spiral protects mental health far more than an extra trophy ever could.',
            },
          ],
          beat2Kicker: 'Inside the sleep-deprived teen brain',
          beat2Title: 'Watch how biological phase delay collides with 6:30 AM bells',
          beat2Lead:
            'Puberty pushes teen melatonin naturally toward 11 PM, while school bells still demand 6:30 AM wakes—creating a built-in weekday sleep deficit unless we protect evenings fiercely. Tap each anchor below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'The 24-hour teen sleep & mood protection curve',
          visualStageHint: 'Tap each anchor to protect emotional stability',
          visualConfig: {
            stages: [
              {
                time: '6:45 AM',
                label: 'Light + Protein',
                level: 24,
                title: 'Daylight right on waking pulls tonight’s clock earlier',
                desc: 'Bright morning light (even overcast sky!) shifts melatonin release earlier so 10 PM sleep actually feels possible.',
                tip: 'Skip hitting snooze 5 times—fragmented 9-minute snoozes worsen grogginess.',
              },
              {
                time: '2:00 PM',
                label: 'Caffeine Cutoff',
                level: 52,
                title: 'Zero iced coffee, energy drinks, or matcha after 2 PM',
                desc: 'Half the caffeine from a 4 PM iced latte is STILL blocking deep sleep receptors at 10 PM.',
                tip: 'If dragging at 3:30 PM, a 20-minute power nap beats an energy drink every time.',
              },
              {
                time: '10:00 PM',
                label: 'REM Armor',
                level: 88,
                title: '8.5–9.5 hours restores emotional shock absorbers',
                desc: 'Full overnight cycles calm amygdala reactivity by up to 60% and lock in everything studied that day.',
                tip: 'Protect study sleep: sleeping an extra hour beats midnight cramming on every test!',
              },
              {
                time: 'Weekend',
                label: 'Smart Recovery',
                level: 74,
                title: 'Recover calmly without flipping into 2 AM vampire hours',
                desc: 'An extra 90 minutes on Saturday morning + a short early-afternoon nap heals weekday debt cleanly.',
                tip: 'Avoid staying up till 3 AM Friday—it resets Monday into brutal jetlag.',
              },
            ],
          },
          almanacTruth:
            'Sleep isn’t a luxury teens earn AFTER homework and sports—8.5 to 9.5 hours of sleep is the biological foundation that keeps teen moods steady and memory sharp.',
          scienceDeepDive:
            'Walker & Yoo (Current Biology) found that sleep deprivation causes a ~60% surge in amygdala emotional reactivity paired with severely weakened medial prefrontal top-down coupling. Large epidemiological studies of adolescents consistently link <7 hours nightly with markedly elevated anxiety, low mood, and academic errors. Persistent mood distress should always be evaluated with a trusted pediatrician or mental health professional.',
          beat3Kicker: 'Practice on a late homework night',
          beat3Title: 'Protect sleep over midnight cramming with zero guilt',
          rehearsalTriggerSpeaker: '{Name} panicked over a history paper at 10:45 PM',
          rehearsalTriggerQuote: '“I CAN’T go to bed—if I don’t stay up till 1 AM memorizing these notes I’ll fail!”',
          rehearsalPrompt: 'Which stressed parent instinct fuels midnight exhaustion?',
          instincts: [
            {
              id: 'push',
              label: '“Well you procrastinated all afternoon, so drink some tea and finish it tonight!”',
              whyTitle: 'Why that’s so tempting—and why memory actually drops',
              whyText:
                'Natural consequences make sense in daylight, yet midnight sleep loss literally blocks the hippocampus from saving what {pronoun} {is} studying!',
            },
            {
              id: 'doit',
              label: 'Sit down and type half the paper yourself so {pronoun} can sleep.',
              whyTitle: 'Why that’s so tempting—and the stronger coaching move',
              whyText:
                'Protecting sleep tonight AND helping {obj} plan a 45-minute early-evening block tomorrow teaches real executive balance.',
            },
          ],
          calmScriptPlain:
            '“Pause—neuroscience literally proves your brain saves MORE facts sleeping right now than staring at notes half-asleep till 1 AM! Close the laptop, set your alarm 20 minutes earlier for a fresh morning skim, and tomorrow we’ll trim one overloaded thing off your week together.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'science',
              text: 'Pause—neuroscience literally proves your brain saves MORE facts sleeping right now than staring at notes half-asleep till 1 AM!',
              tag: 'Science Beats Cramming',
              note: 'Teens respect real performance science—knowing sleep boosts grades lowers panic fast.',
            },
            { text: ' ' },
            {
              id: 'plan',
              text: 'Close the laptop, set your alarm 20 minutes earlier for a fresh morning skim, and tomorrow we’ll trim one overloaded thing off your week together.',
              tag: 'Protects Health + Fixes Root Cause',
              note: 'Ends midnight misery cleanly while addressing over-scheduling in daylight.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Check the last 3 nights’ sleep hours FIRST whenever teen emotions spiral',
            'Never hesitate to reach out to your pediatrician or counselor if low mood persists even when rested',
            'Audit overscheduled activities ruthlessly—margin protects mental health',
          ],
          pushbacks: [
            {
              id: 'powernap',
              label: '“Is an after-school nap okay or does it ruin bedtime?”',
              setup: 'A crisp 20-minute nap before 4 PM refreshes beautifully; 2-hour 5 PM naps wreck midnight sleep:',
              script:
                '“Set a 25-minute alarm before 4 PM—just enough to clear fog without stealing tonight’s sleep drive!”',
            },
            {
              id: 'stillanxious',
              label: '“What if {name} sleeps 9 full hours and STILL feels constantly overwhelmed or sad?”',
              setup: 'Sleep is a great baseline check—and persistent worry or sadness always deserves warm professional support:',
              script:
                '“Thank you for telling me how heavy things still feel even when you’re rested—let’s schedule a relaxed check-in with our doctor or a great teen counselor who can add extra tools to your corner.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) is running on 6.5 hours of sleep due to homework and evening sports—help us find realistic ways to reclaim an extra hour nightly.”',
          beat4Kicker: 'This week’s mood armor',
          beat4Title: 'Pick one simple sleep-debt breaker',
          beat4Lead: 'Protect sleep fiercely—it’s the quiet superpower underneath every other goal.',
          moves: [
            {
              id: 'audit3',
              title: 'Do a quick zero-judgment “3-Night Sleep Check” whenever moods run razor-thin',
              desc: 'Ask gently: “Wait—how many hours did we actually sleep this week before we panic about life?”',
            },
            {
              id: 'caff2',
              title: 'Set a chill family “2 PM Caffeine Cutoff”',
              desc: 'Swap late iced coffees or sodas for sparkling water or fruit smoothies.',
            },
            {
              id: 'schedulecut',
              title: 'Trim ONE non-essential weekly commitment if evenings routinely cross 9:30 PM',
              desc: 'A rested, joyful teen beats an exhausted, overscheduled resume every time.',
            },
          ],
          closingNote:
            'In a culture that brags about running on five hours of sleep, teaching {name} to protect {poss} rest is one of the fiercest acts of love and sanity you can model.',
          pocketInsight:
            'Check the 3-night sleep log first when teen moods spike: anchor morning light, cut caffeine by 2 PM, trade midnight cramming for sleep, and involve professionals whenever distress lingers.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“What quick 60-second body resets help an overloaded 14-year-old drop test or sports pressure fast?”',
            title: 'Everyday Stress Recovery: Breath, Movement & Sports Rest Days',
            targetSlug: 'adolescent-stress-and-somatic-resilience',
          },
          interactiveHighlights: ['24-Hour Mood-Sleep Curve', 'Anti-Cramming Script'],
        },
      },
      {
        slug: 'adolescent-stress-and-somatic-resilience',
        title: 'Everyday Stress Recovery: Breath, Movement & Sports Rest Days',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Autonomic reset · Fast body tools for real stress',
          headline: 'Everyday Stress Recovery: Breath, Movement & Sports Rest Days',
          deck: 'Why telling a stressed 14-year-old “Just relax!” never works—and four science-backed body resets (physiological sigh, cold splash, movement, and real rest days) they’ll actually use.',
          sceneTime: '8:15 PM · NIGHT BEFORE BIG EXAM OR TRYOUT',
          sceneBody:
            '{Name} is pacing the hallway, shoulders up by {poss} ears, heart pounding before tomorrow’s big geometry test or varsity tryout—on top of a sore hamstring {pronoun} has been trying to ignore all week. *Saying “Calm down!” just earns a glare—what body-first resets actually work fast?*',
          pollQuestion: 'Does {name} carry school, social, or sports pressure tightly in {poss} body?',
          pollOptions: [
            {
              id: 'tight',
              label: 'Yes—tight shoulders, racing thoughts, and trouble unwinding',
              response:
                'You can’t think your way out of an adrenaline spike with pep talks—you reset the BODY first using breath, cold water, movement, and protected recovery days.',
            },
            {
              id: 'sports',
              label: 'Pushes way too hard in sports without resting soreness',
              response:
                'Teaching {name} that elite pro athletes treat rest days and medical check-ins as mandatory training builds lifelong body wisdom!',
            },
          ],
          beat2Kicker: 'Body-first stress resilience',
          beat2Title: 'Four fast nervous-system resets teens actually respect',
          beat2Lead:
            'Because the vagus nerve runs straight from lungs, face, and muscles up to the brain, shifting physiology calms panic in under 60 seconds—zero cheesy mindfulness speeches required. Tap all 4 below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: '4 science-backed teen body resets & recovery rules',
          visualStageHint: 'Tap each tool from 15-sec breath to pro rest days',
          visualConfig: {
            steps: [
              {
                timeOrCue: '15 Seconds',
                label: 'Double-Inhale Sigh',
                title: 'Two quick nasal inhales + one long slow mouth exhale',
                desc: 'The “physiological sigh” pops collapsed lung sacs open and slows heart rate mechanically in 2–3 cycles—stealthy enough to do right at a test desk!',
                why: 'Directly triggers the vagus nerve brake without closing eyes or looking awkward.',
              },
              {
                timeOrCue: '30 Seconds',
                label: 'Cold Splash',
                title: 'Cool water on cheeks & wrists flips the dive reflex',
                desc: 'Splashing cold sink water on the face or holding an ice cube activates an instant mammalian calming reflex during intense spirals.',
                why: 'Drops racing pulse immediately when words feel impossible.',
              },
              {
                timeOrCue: '10 Minutes',
                label: 'Shake Off Stress',
                title: 'Brisk walk, shooting hoops, or music stretch',
                desc: 'Physical motion literally burns off leftover stress adrenaline so it doesn’t sit trapped in tight jaws and shoulders.',
                why: 'Completes the biological stress cycle cleanly.',
              },
              {
                timeOrCue: 'Weekly Rule',
                label: 'Pro Rest Days',
                title: 'Mandatory recovery days & medical clearance for head/joint bumps',
                desc: 'Honor 1–2 full sports rest days weekly—and for ANY head knock, dizziness, or lingering pain, sit out immediately and let a licensed medical professional clear return to play.',
                why: 'Real pros protect long-term brains and bodies—never “play through” head bumps.',
              },
            ],
          },
          almanacTruth:
            'You can’t lecture an adrenaline spike away—two physiological sighs, a cold water splash, a brisk 10-minute walk, and genuine rest days turn stress back into steady focus.',
          scienceDeepDive:
            'Stanford neurobiology trials (Balban et al., Cell Reports Medicine) confirmed that cyclic physiological sighing produces faster autonomic down-regulation and mood improvement than passive mindfulness. In youth sports, medical consensus universally mandates immediate removal from play and licensed healthcare evaluation following any suspected head impact.',
          beat3Kicker: 'Practice before a high-pressure moment',
          beat3Title: 'Offer a cool stealth body hack without sounding cheesy',
          rehearsalTriggerSpeaker: '{Name} panicking the night before tryouts or finals',
          rehearsalTriggerQuote: '“My heart won’t stop pounding—I’m gonna totally blank out tomorrow!”',
          rehearsalPrompt: 'Which classic parent line makes anxious teens roll their eyes?',
          instincts: [
            {
              id: 'justcalm',
              label: '“Just calm down and stop worrying! You’ll do fine!”',
              whyTitle: 'Why that’s so tempting—and why it never lowers pulse',
              whyText:
                'If {name} could simply flip a “stop worrying” switch, {pronoun} already would have! Handing over a concrete 15-second body hack feels immediately useful.',
            },
            {
              id: 'ignorebump',
              label: 'Brush off a hard sports knock or nagging joint ache so {pronoun} doesn’t miss tryouts.',
              whyTitle: 'Why that’s so tempting—and why safety always comes first',
              whyText:
                'No game or tryout is ever worth risking a growing brain or tendon—always pull out and call your doctor or certified trainer for any head impact or sharp injury.',
            },
          ],
          calmScriptPlain:
            '“Man, pre-game adrenaline feels intense in your chest! Want a stealth 15-second Navy-SEAL-style reset you can even do right at your desk? Try two quick breaths in through your nose, then one super slow exhale—let’s do three right now and grab a cold glass of water.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'stealth',
              text: 'Want a stealth 15-second Navy-SEAL-style reset you can even do right at your desk?',
              tag: 'Cool & Practical Frame',
              note: 'Zero cheesy clichés—teens love performance biology they can actually use invisibly at school.',
            },
            { text: ' ' },
            {
              id: 'doit',
              text: 'Try two quick breaths in through your nose, then one super slow exhale—let’s do three right now and grab a cold glass of water.',
              tag: 'Immediate Body Shift',
              note: 'Doing 3 cycles side-by-side drops both heart rates visibly in under thirty seconds.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Practice the physiological sigh together when calm so it’s automatic under stress',
            'Never negotiate on head bumps: “When in doubt, sit out and see a doctor”',
            'Normalize that even Olympic athletes schedule weekly recovery days',
          ],
          pushbacks: [
            {
              id: 'silly',
              label: '“Ugh, breathing exercises sound so cringe!”',
              setup: 'Offer movement or cold water instead—zero forcing one style:',
              script:
                '“Fair enough! Skip breathing—grab your sneakers and let’s walk around the block with music for 8 minutes or splash cold water on your wrists. Same biology, zero cringe.”',
            },
            {
              id: 'headknock',
              label: '“{Name} took a bump at sports practice and says ‘I’m totally fine, let me back in!’”',
              setup: 'Hold the rock-solid safety line warmly and let medical professionals decide:',
              script:
                '“Glad you feel okay—our ironclad family rule for any head bump is sit out today and have our doctor or athletic trainer check you cleanly before going back in. Your brain is #1.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) gets intense test and tryout nerves—give me 4 stealth, non-cringe 60-second stress resets {pronoun} can actually use at school.”',
          beat4Kicker: 'This week’s resilience kit',
          beat4Title: 'Pick one body-reset habit to share casually',
          beat4Lead: 'Teens who know how to steady their own nervous system walk taller everywhere.',
          moves: [
            {
              id: 'sigh3',
              title: 'Teach the 15-second “Double-Inhale Physiological Sigh” casually over dinner',
              desc: 'Try 3 cycles together and feel your shoulders drop simultaneously.',
            },
            {
              id: 'restschedule',
              title: 'Block 1 protected “Zero-Training Rest Day” on the weekly sports calendar',
              desc: 'Treat recovery as seriously as practice.',
            },
            {
              id: 'walkreset',
              title: 'Invite {name} on a 10-minute stress-shakeout walk after heavy study nights',
              desc: 'Movement + fresh air clear mental fog faster than scrolling ever will.',
            },
          ],
          closingNote:
            'Equipping {name} with fast, practical ways to cool {poss} own nervous system—and respect {poss} body’s need for rest—is genuine resilience that lasts decades.',
          pocketInsight:
            'Reset teen stress body-first (3 double-inhale sighs, cold water splash, 10-min walk), protect weekly sports rest days, and always seek licensed medical clearance for head bumps or lingering pain.',
          nextEpisodeHook: null,
          interactiveHighlights: ['4 Body-Reset Tools', 'Stealth Breath Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 33: Teen Energy, Body Confidence & Ditching Energy Drinks (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'nutrition-adolescent-sports-fuel',
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    developmentalTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    title: 'Teen Energy, Body Confidence & Ditching Energy Drinks',
    reliefSubtitle:
      'Replace neon energy drinks with steady hydration, fuel active teen growth spurts with real iron and protein snacks, and protect healthy body confidence',
    tonightQuickWinTitle: 'Episode 1: Ditching Energy Drinks & Afternoon Caffeine Crashes',
    summary:
      'Pull back the curtain on high-caffeine teen energy cans without preaching, build practical protein-carb-iron fueling habits for rapid adolescent growth and athletics, and nurture body confidence while knowing supportive next steps if eating habits ever worry you.',
    coverImageUrl: 'https://assets.alongside.care/academy/nutrition-adolescent.png',
    sortOrder: 7,
    episodes: [
      {
        slug: 'adolescent-hydration-and-electrolyte-balance',
        title: 'Ditching Energy Drinks & Afternoon Caffeine Crashes',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.cup,
          illustrationCaption: 'Real energy vs. borrowed crash · Reading the can',
          headline: 'Ditching Energy Drinks & Afternoon Caffeine Crashes',
          deck: 'Why influencer-branded energy cans pack 200mg+ of caffeine—causing jitters, anxiety spikes, and 1 AM insomnia—and the cool hydration swaps teens actually grab.',
          sceneTime: '3:50 PM · AFTER-SCHOOL CONVENIENCE STOP',
          sceneBody:
            'Half the kids walking out of middle and high school carry flashy neon influencer energy cans packing as much caffeine as two to three cups of espresso. {Name} drops one on the checkout counter: “Come on, everyone drinks these before practice!” *How do you draw a clear line without sounding clueless or preachy?*',
          pollQuestion: 'Have trendy energy drinks or heavy iced coffees started showing up in {possessive} friend group?',
          pollOptions: [
            {
              id: 'everywhere',
              label: 'Everywhere—influencer cans are the new status symbol!',
              response:
                'Smart catch! Pediatricians advise ZERO high-caffeine energy drinks for teens because a single 200mg can spikes heart rate, mimics panic attacks, and ruins overnight sleep—reading the label together as a performance-savvy ally works wonders.',
            },
            {
              id: 'coffee',
              label: 'Mostly sweet afternoon iced coffees and sodas',
              response:
                'Showing {name} the exact caffeine “half-life clock” (how a 3 PM drink is STILL awake at midnight!) turns hydration into smart self-care.',
            },
          ],
          beat2Kicker: 'Inside the energy-drink borrow-and-crash loop',
          beat2Title: 'Watch how a 3 PM energy can hijacks tonight’s sleep AND tomorrow’s mood',
          beat2Lead:
            'Caffeine doesn’t create new energy—it masks tiredness for 3 hours, raises cortisol jitters, and lingers in the bloodstream past midnight. Tap the 4 curve points below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'The 200mg energy-can rollercoaster',
          visualStageHint: 'Tap each hour to see why “energy” cans steal tomorrow’s energy',
          visualConfig: {
            stages: [
              {
                time: '3:30 PM',
                label: 'Flashy Spike',
                level: 85,
                title: '200mg caffeine floods a growing heart & nervous system',
                desc: 'Can trigger racing heartbeat, shaky hands, stomach cramps, and sudden irritability—not clean focus.',
                tip: 'Always check the tiny mg number on the back (AAP advises <100mg max daily for teens, zero energy drinks).',
              },
              {
                time: '6:30 PM',
                label: 'Hard Crash',
                level: 28,
                title: 'Artificial buzz drops into brain fog & mood dip',
                desc: 'Leaves {name} drained right during evening homework and family dinner.',
                tip: 'Swap in cold sparkling water + citrus, coconut water, or cold chocolate milk after practice.',
              },
              {
                time: '11:30 PM',
                label: 'Half Still Active',
                level: 72,
                title: 'Caffeine half-life is 6–8 hours—still blocking deep sleep!',
                desc: 'Even if {pronoun} falls asleep, leftover caffeine steals deep restorative growth cycles.',
                tip: 'Keep any mild morning tea/coffee strictly before 1–2 PM.',
              },
              {
                time: '7:00 AM',
                label: 'Tired Cycle',
                level: 22,
                title: 'Wakes exhausted—craving ANOTHER can at 3 PM!',
                desc: 'Breaking the cycle for just 5 days brings natural, steady energy roaring back.',
                tip: 'Stock the fridge with cool zero-caffeine drinks {name} actually loves.',
              },
            ],
          },
          almanacTruth:
            'Energy drinks don’t give teens real energy—they borrow tomorrow’s sleep at a terrible interest rate, leaving racing hearts, anxiety jitters, and exhausted mornings.',
          scienceDeepDive:
            'The American Academy of Pediatrics Committee on Nutrition states unequivocally that stimulant-containing energy drinks have no place in the diets of children and adolescents due to cardiovascular, sleep, and anxiety risks, recommending a strict ceiling of ≤100 mg/day of total caffeine from ordinary sources for adolescents.',
          beat3Kicker: 'Practice at the store',
          beat3Title: 'Draw a firm “No Energy Drinks” line like a savvy performance coach',
          rehearsalTriggerSpeaker: '{Name} holding a shiny 200mg influencer energy can at checkout',
          rehearsalTriggerQuote: '“It’s literally just hydration with vitamins! Everyone on my team drinks them!”',
          rehearsalPrompt: 'Which rushed reply turns a neon can into rebellious forbidden fruit?',
          instincts: [
            {
              id: 'lecture',
              label: '“Put that poison down! Those things cause heart attacks—you’re forbidden from going to the store!”',
              whyTitle: 'Why that’s so tempting—and why teens sneak cans in backpacks',
              whyText:
                'Scary worst-case yelling makes teens roll their eyes and buy one quietly with friends tomorrow—reading the real back label together works 10x better!',
            },
            {
              id: 'buy',
              label: 'Shrug and pay for it because it looks like a harmless sports drink.',
              whyTitle: 'Why that’s so tempting—and why reading the back matters',
              whyText:
                'Brands intentionally make 200mg energy cans look nearly identical to caffeine-free hydration bottles—always flip the can over!',
            },
          ],
          calmScriptPlain:
            '“Wild how they make those look just like sports water! Flip it over—whoa, 200mg of caffeine, that’s basically three shots of espresso in one can! Energy cans are a hard no in our house because they wreck your sleep and make hearts race—grab the caffeine-free electrolyte bottle or a fruit smoothie instead, my treat!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'flip',
              text: 'Wild how they make those look just like sports water! Flip it over—whoa, 200mg of caffeine, that’s basically three shots of espresso in one can!',
              tag: 'Label Detective Ally',
              note: 'Exposes slick marketing honestly—teens hate being played by deceptive packaging!',
            },
            { text: ' ' },
            {
              id: 'swap',
              text: 'Energy cans are a hard no in our house because they wreck your sleep and make hearts race—grab the caffeine-free electrolyte bottle or a fruit smoothie instead, my treat!',
              tag: 'Firm Line + Cool Upgrade',
              note: 'Holds the health boundary cleanly while offering an appealing, zero-crash swap right away.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Teach the “Flip the Can” trick to distinguish hydration bottles from 200mg energy cans',
            'Keep the fridge stocked with appealing cold zero-caffeine drinks (sparkling lime, iced herbal fruit tea, smoothies)',
            'Model healthy afternoon hydration yourself',
          ],
          pushbacks: [
            {
              id: 'coffee',
              label: '“What about a mild morning iced latte or matcha at age 14–15?”',
              setup: 'Draw a smart, realistic distinction between extreme energy cans vs. mild occasional morning drinks:',
              script:
                '“Zero high-dose energy cans ever—and if you want a small mild morning iced coffee occasionally before noon (under 80mg), just pair it with real breakfast and water.”',
            },
            {
              id: 'tired',
              label: '“I ONLY drink them because I’m exhausted after 6th period!”',
              setup: 'Celebrate that honest clue—afternoon exhaustion points straight to lunch protein, water, or sleep:',
              script:
                '“Super helpful clue! Let’s pack a bigger afternoon snack and check your water intake this week so your real energy stays high at 3 PM without fake caffeine loans.”',
            },
          ],
          advisorPrompt:
            '“Give me 5 cool, teen-approved homemade electrolyte or recovery drinks with zero caffeine for after sports practice.”',
          beat4Kicker: 'This week’s fridge upgrade',
          beat4Title: 'Pick one easy move to replace energy cans',
          beat4Lead: 'Stock better options at home and watch the neon-can pull fade fast.',
          moves: [
            {
              id: 'flipcan',
              title: 'Do a 30-second “Flip the Can” check together next grocery run',
              desc: 'Spot the difference between caffeine-free hydration vs. 200mg stimulant cans.',
            },
            {
              id: 'coolfridge',
              title: 'Stock 2 genuinely cool zero-caffeine drinks {name} picked for the fridge',
              desc: 'Flavored sparkling waters, cold-brewed fruit tea, or chocolate milk after workouts.',
            },
            {
              id: 'waterjug',
              title: 'Upgrade {possessive} insulated water bottle (stickers encouraged!)',
              desc: 'Teens drink twice as much water when they carry a bottle they genuinely like.',
            },
          ],
          closingNote:
            'When {name} sees through flashy neon marketing and feels how steady real hydration and sleep feel, {pronoun} owns {poss} own energy for life.',
          pocketInsight:
            'Hold a clear zero-energy-drinks line using the “Flip the Can” espresso comparison, cut caffeine after 2 PM, and stock cool zero-caffeine fridge alternatives.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Why do fast-growing 13–15-year-olds need massive iron, calcium, and post-practice recovery fuel?”',
            title: 'Fueling Active Teens & Growth Spurts (Iron, Protein & Real Snacks)',
            targetSlug: 'adolescent-post-workout-recovery',
          },
          interactiveHighlights: ['Caffeine Crash Curve', 'Flip-the-Can Script'],
        },
      },
      {
        slug: 'adolescent-post-workout-recovery',
        title: 'Fueling Active Teens & Growth Spurts (Iron, Protein & Real Snacks)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Growth & athletic fuel · Building lifelong bone & iron reserves',
          headline: 'Fueling Active Teens & Growth Spurts (Iron, Protein & Real Snacks)',
          deck: 'Why ages 13–15 build nearly half of adult bone mass—and how simple 30-minute post-practice protein/carb combos plus iron-rich meals prevent teen burnout and fatigue.',
          sceneTime: '6:15 PM · POST-PRACTICE CAR RIDE',
          sceneBody:
            '{Name} skipped half of lunch, ran hard for 90 minutes at track or soccer, and now collapses on the couch looking pale, irritable, and exhausted for the rest of the evening. *How do you keep a fast-growing, active teen fueled without becoming a full-time nutritionist?*',
          pollQuestion: 'Does {name} often skip meals or under-fuel on busy school and sports days?',
          pollOptions: [
            {
              id: 'skips',
              label: 'Yes—skips breakfast or eats way too little before practice!',
              response:
                'Super common in high-speed teen schedules! Under-fueling an active 14-year-old drains mood, focus, and bone strength fast—keeping 2 fast recovery staples in the gym bag changes everything.',
            },
            {
              id: 'iron',
              label: 'Want simple ways to boost protein, iron, and calcium naturally',
              response:
                'Everyday family foods (eggs, beans, lean meats, Greek yogurt, oats, leafy greens + citrus) beat pricey teen protein powders every single time!',
            },
          ],
          beat2Kicker: 'Peak growth & performance fuel',
          beat2Title: 'Four simple fueling anchors for ages 13–15',
          beat2Lead:
            'Between ages 12 and 17, teens lock in up to 40–50% of their lifelong peak bone density and rapidly expand blood volume—making real food fuel essential for both male and female athletes. Tap all 4 anchors below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-part teen growth & sports fueling plan',
          visualStageHint: 'Tap each anchor from pre-practice snack to iron & bone support',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Pre-Practice',
                label: 'Quick Carbs',
                title: 'Easy 45-min pre-sport energy (banana, granola bar, pretzels)',
                desc: 'Tops off muscle glycogen after a long school day so practice feels strong instead of dizzy.',
                why: 'Running on an empty 11:30 AM lunch spikes fatigue and sloppy sprains.',
              },
              {
                timeOrCue: '30-Min Post',
                label: 'Carb + Protein',
                title: 'The 30-minute recovery combo (chocolate milk, PB sandwich, yogurt)',
                desc: 'Pairing ~20g real protein with quality carbs within 30–45 minutes rebuilds muscles and restores energy fast.',
                why: 'Real food delivers the exact recovery ratio—no unregulated gym-bro powders needed!',
              },
              {
                timeOrCue: 'Daily Iron',
                label: 'Iron + Vit C',
                title: 'Combat teen fatigue—especially for active & menstruating teens',
                desc: 'Pair iron-rich foods (beef, poultry, lentils, fortified oats, spinach) with Vitamin C (berries, bell peppers, oranges) to boost absorption.',
                why: 'Low iron is one of the top silent causes of teen sluggishness (ask your doctor before any supplements!).',
              },
              {
                timeOrCue: 'Peak Bone',
                label: 'Calcium + D',
                title: 'Dairy, fortified plant milk, yogurt & sunshine build lifetime bones',
                desc: 'Adolescence is the once-in-a-lifetime bank-deposit window for lifelong bone strength.',
                why: 'Strong bones today prevent stress fractures now and fragility decades later.',
              },
            ],
          },
          almanacTruth:
            'Real everyday food—chocolate milk, turkey wraps, bean burritos, eggs, and fruit—outperforms unregulated teen gym supplements every single time while building lifelong bone density.',
          scienceDeepDive:
            'American Academy of Pediatrics sports-nutrition guidance notes that up to 40–50% of adult skeletal bone mass accrues during adolescence and highlights iron insufficiency (especially among female and endurance athletes) as a primary reversible contributor to fatigue. Pediatricians strongly advise against unregulated teen protein/creatine supplements in favor of whole-food recovery.',
          beat3Kicker: 'Practice a smart fueling chat',
          beat3Title: 'Answer “Can I buy this viral TikTok pre-workout powder?” cleanly',
          rehearsalTriggerSpeaker: '{Name} showing a giant tub of trendy gym supplement on {poss} phone',
          rehearsalTriggerQuote: '“All the older guys at the gym take this pre-workout and protein tub—can we order it?!”',
          rehearsalPrompt: 'Which reaction misses a golden coaching moment?',
          instincts: [
            {
              id: 'mock',
              label: '“That’s ridiculous—you’re fourteen, you don’t need muscle powders!”',
              whyTitle: 'Why that’s so tempting—and why teens tune out',
              whyText:
                'Dismissing {possessive} athletic ambition shuts down dialogue—while sharing real pro-level sports nutrition science wins instant respect!',
            },
            {
              id: 'order',
              label: 'Order a random online pre-workout tub without checking ingredients.',
              whyTitle: 'Why that’s so tempting—and why pediatricians warn strongly against it',
              whyText:
                'Many online pre-workouts pack 300mg+ caffeine and untested stimulants unregulated for growing hearts.',
            },
          ],
          calmScriptPlain:
            '“Love how seriously you’re training! Actually, sports dietitians warn teens away from pre-workout tubs because they’re unregulated and packed with giant caffeine doses—real pros use chocolate milk, Greek yogurt smoothies, or turkey wraps right after training. Want to stock your own ‘Athlete Recovery Bin’ at the store this weekend?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'respect',
              text: 'Love how seriously you’re training! Actually, sports dietitians warn teens away from pre-workout tubs because they’re unregulated and packed with giant caffeine doses',
              tag: 'Honors Drive + Real Facts',
              note: 'Treats {name} like an intelligent athlete instead of lecturing.',
            },
            { text: '—' },
            {
              id: 'bin',
              text: 'real pros use chocolate milk, Greek yogurt smoothies, or turkey wraps right after training. Want to stock your own ‘Athlete Recovery Bin’ at the store this weekend?',
              tag: 'Real-Food Upgrade',
              note: 'Channels athletic drive straight into delicious, safe, effective real food.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Keep 2 shelf-stable recovery snacks permanently tucked in the sports bag',
            'Always consult your pediatrician before starting iron or any supplement',
            'Never shame big teen appetites on training days',
          ],
          pushbacks: [
            {
              id: 'tired',
              label: '“{Name} eats well yet feels constantly wiped out and breathless at practice”',
              setup: 'Schedule a simple routine check with your pediatrician—they can check iron/ferritin and overall energy cleanly:',
              script:
                '“Persistent fatigue during sports is super worth a quick routine checkup with our pediatrician so we make sure your iron and energy tanks are topped up.”',
            },
            {
              id: 'nobreakfast',
              label: '“{Pronoun} still rushes out the door with zero breakfast”',
              setup: 'Make it 10-second grab-and-go—even half a smoothie or peanut-butter banana wrap in the car works:',
              script:
                '“No sit-down plate required—grab a blended smoothie cup or PB-banana roll-up for the bus ride so your muscles aren’t running on fumes till noon.”',
            },
          ],
          advisorPrompt:
            '“Build a quick 1-week real-food sports recovery snack list (with iron & calcium!) for my active {ageShort}.”',
          beat4Kicker: 'This week’s athlete fuel',
          beat4Title: 'Pick one easy recovery upgrade to stock',
          beat4Lead: 'Right food at the right window unlocks stronger focus, mood, and stamina.',
          moves: [
            {
              id: 'bagfuel',
              title: 'Stash 3 grab-and-go pre/post-practice snacks right inside the sports bag',
              desc: 'Trail mix, nut-butter packs, pretzels, or shelf-stable milk boxes beat skipping fuel.',
            },
            {
              id: 'ironpair',
              title: 'Serve two delicious iron + Vitamin C dinners this week',
              desc: 'Beef or black-bean tacos with bell peppers and salsa, or spinach pasta with marinara and meatballs.',
            },
            {
              id: 'nosupps',
              title: 'Hold a clear “Real Food First, Doctor Before Supplements” family norm',
              desc: 'Keeps unsafe viral pre-workouts out while fueling athletic pride cleanly.',
            },
          ],
          closingNote:
            'Fueling a fast-growing fourteen-year-old with abundant real food teaches {obj} that {poss} body is an awesome engine worth feeding generously—not shrinking or stressing over.',
          pocketInsight:
            'Skip unregulated teen gym powders: fuel active growth with 30-minute post-sport carb+protein snacks, iron + Vitamin C meals, and calcium-rich daily foods.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“How do you protect healthy teen body confidence against filtered feeds—and open a caring chat if habits ever worry you?”',
            title: 'Protecting Healthy Body Image & Spotting When to Reach Out for Help',
            targetSlug: 'adolescent-body-confidence-and-support',
          },
          interactiveHighlights: ['4-Part Growth Fuel Plan', 'Supplement-Talk Script'],
        },
      },
      {
        slug: 'adolescent-body-confidence-and-support',
        title: 'Protecting Healthy Body Image & Spotting When to Reach Out for Help',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Warm open door · Protecting teen body confidence',
          headline: 'Protecting Healthy Body Image & Spotting When to Reach Out for Help',
          deck: 'Why social media filters warp how BOTH teen girls and boys see the mirror—and how to keep an open, caring home while knowing when to invite professional pediatric support early.',
          sceneTime: '6:25 PM · DINING TABLE',
          sceneBody:
            'Lately {name} has been lingering longer in front of mirrors, making sharp remarks about {poss} shape after scrolling social apps, or suddenly cutting out entire food groups {pronoun} used to love. *Your protective heart tightens—how do you open a warm, non-shaming conversation without making {obj} pull away?*',
          pollQuestion: 'Has social media comparison or sudden rigid food rules started creeping in?',
          pollOptions: [
            {
              id: 'mirror',
              label: 'Yes—more mirror criticism and comparing to influencers',
              response:
                'Both girls and boys face relentless edited “ideal” bodies online today. Pulling back the curtain on filters + praising who {name} IS builds huge resilience.',
            },
            {
              id: 'worried',
              label: 'Noticing sudden meal skipping or rigid food stress',
              response:
                'Trust your caring gut! Opening a warm, zero-accusation conversation (“I care about how stressed food seems lately”) and checking in early with your pediatrician or specialist is one of the strongest acts of love.',
            },
          ],
          beat2Kicker: 'Protective warmth & early support',
          beat2Title: 'The 3-step caring check-in loop for teen body confidence',
          beat2Lead:
            'Our job as parents isn’t to diagnose—it’s to cultivate a fiercely body-safe home, stay warmly attentive to shifts in joy or eating ease, and connect promptly with trained professionals whenever worry lingers. Tap the 3 beats below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-step supportive body-confidence conversation',
          visualStageHint: 'Tap each step to keep communication safe and open',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Lead with care',
                label: 'Notice Gently in Private',
                quote: '“Hey, I love you—I’ve noticed meals feel stressful lately, and I care about how you’re feeling.”',
                desc: 'Speak 1-on-1 outside mealtime with gentle “I noticed” curiosity—never accusing, policing plates, or confronting at dinner.',
                brainNote: 'Warmth without accusation lowers defensive hiding immediately.',
              },
              {
                stepNum: '02',
                actor: 'Expose filters',
                label: 'Unmask Online Illusions',
                quote: '“Lighting, lenses, steroids, and skin filters sell products by making real humans feel inadequate.”',
                desc: 'Talk openly about how beauty and fitness feeds profit from teen insecurity—for every gender.',
                brainNote: 'Media literacy measurably buffers adolescents against mirror shame.',
              },
              {
                stepNum: '03',
                actor: 'Bring in pros early',
                label: 'Partner With Pediatric Team',
                quote: 'If meal skipping, obsessive rules, or body distress persist, call your pediatrician early',
                desc: 'Never wait for things to look extreme—your family doctor and teen specialists offer compassionate, proven early support.',
                brainNote: 'Early supportive care leads to the strongest, fastest recovery.',
              },
            ],
          },
          almanacTruth:
            'You never have to play clinician—staying fiercely loving, talking honestly about filtered feeds, and reaching out early to your pediatrician whenever food or body stress grows are pure parental strength.',
          scienceDeepDive:
            'Adolescent health organizations (AAP; Academy for Eating Disorders) emphasize that non-judgmental parental check-ins, active social-media literacy, family meals free of weight commentary, and early consultation with a primary-care pediatrician whenever restrictive or distressed eating behaviors appear are key protective factors.',
          beat3Kicker: 'Practice a tender 1-on-1 check-in',
          beat3Title: 'Open a safe conversation when food or mirrors feel tense',
          rehearsalTriggerSpeaker: '{Name} pushing away dinner after weeks of harsh mirror comments',
          rehearsalTriggerQuote: '“I’m NOT hungry—stop staring at my plate! I’m just trying to ‘eat clean’ like everyone online!”',
          rehearsalPrompt: 'Which anxious reaction makes a teen dig deeper into rigid rules?',
          instincts: [
            {
              id: 'tablefight',
              label: 'Argue over every bite at the dinner table: “You HAVE to eat that pasta right now!”',
              whyTitle: 'Why that’s so tempting—and why dinner wars backfire',
              whyText:
                'Panic comes straight from fierce love! Yet spotlight table battles raise anxiety—whereas a calm private check-in afterward plus consulting your doctor moves forward safely.',
            },
            {
              id: 'ignore',
              label: 'Brush off weeks of skipped meals and intense mirror distress as “just a normal teen phase.”',
              whyTitle: 'Why that’s so tempting—and why gentle early check-ins matter',
              whyText:
                'Checking in warmly AND looping in your pediatrician early when patterns worry you brings clarity and relief.',
            },
          ],
          calmScriptPlain:
            '“(Later privately on a calm walk) Hey, I didn’t want to put you on the spot at dinner—I love you way too much to ignore when you seem stressed. I’ve noticed food and mirrors have felt heavy lately. Zero judgment—I’m in your corner, and I’d love to hear what’s been weighing on you.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'private',
              text: 'Hey, I didn’t want to put you on the spot at dinner—I love you way too much to ignore when you seem stressed.',
              tag: 'Private & Zero-Spotlight',
              note: 'Moves the conversation off the dinner plate into a safe, loving 1-on-1 space.',
            },
            { text: ' ' },
            {
              id: 'curious',
              text: 'I’ve noticed food and mirrors have felt heavy lately. Zero judgment—I’m in your corner, and I’d love to hear what’s been weighing on you.',
              tag: 'Warm Open Door',
              note: 'Invites honesty without lecturing—and sets up a supportive pediatrician check-in if worries continue.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Keep conversations 1-on-1, warm, and outside mealtimes',
            'Watch out for rigid “clean eating” or extreme physique accounts targeting boys AND girls',
            'Contact your pediatrician early whenever sustained meal skipping, withdrawal, or distress worries you',
          ],
          pushbacks: [
            {
              id: 'imfine',
              label: '“{Name} insists ‘I’m totally fine, stop overreacting!’ yet keeps skipping meals”',
              setup: 'Stay warmly steady—you don’t need permission to check in calmly with your pediatrician for guidance:',
              script:
                '“I hear you feel fine—part of my job loving you is checking in when energy or meals drop, so I’m going to chat with our doctor to make sure we’re supporting your health the best way possible.”',
            },
            {
              id: 'feedclean',
              label: '“How do we audit fitness or beauty feeds together without sounding preachy?”',
              setup: 'Use one simple gut-check question teens genuinely appreciate:',
              script:
                '“After scrolling an account for 5 minutes, ask yourself: ‘Do I feel inspired and strong—or smaller and stressed?’ Unfollow anything that shrinks your peace!”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) has been comparing {poss} body harshly to online influencers lately—give me calm, non-preachy ways to build resilience and support {obj}.”',
          beat4Kicker: 'This week’s protective habit',
          beat4Title: 'Pick one caring body-confidence anchor',
          beat4Lead: 'Warm connection and un-filtered honesty guard teen self-worth deeply.',
          moves: [
            {
              id: 'gutcheck',
              title: 'Share the “5-Minute Feed Gut-Check” casually in the car',
              desc: '“If an account makes you feel worse about your real body, mute it—protect your peace!”',
            },
            {
              id: 'eatfamily',
              title: 'Guard 3 relaxed, screen-free family meals this week with zero diet talk',
              desc: 'Consistent warm family dinners are one of the strongest documented shields for teen wellbeing.',
            },
            {
              id: 'pedally',
              title: 'Remember your pediatrician is a zero-judgment ally anytime gut worries linger',
              desc: 'Early private advice from a trained clinician brings calm, accurate next steps.',
            },
          ],
          closingNote:
            'In a loud world constantly trying to sell teens insecurities, your home can be the quiet sanctuary where {name} knows {pronoun} {is} already whole, worthy, and fiercely loved.',
          pocketInsight:
            'Protect teen body confidence with zero-diet family meals, unmasking online filters, private zero-judgment check-ins, and early pediatrician support whenever food stress lingers.',
          nextEpisodeHook: null,
          interactiveHighlights: ['3-Step Confidence Check-In', 'Private Walk Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 34: Healthy Debate, Passion Projects & Mentors (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'play-adolescent-critical-thinking',
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    developmentalTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    title: 'Healthy Debate, Passion Projects & Mentors',
    reliefSubtitle:
      'Turn teen arguing into respectful dinner debates, back self-directed passion projects without taking over, and unlock the power of one trusted outside mentor',
    tonightQuickWinTitle: 'Episode 1: Turning Teen Arguments Into Respectful Dinner Debates',
    summary:
      'Channel newly awakened adolescent critical thinking from exhausting defiance into lively respectful debate, support real-world passion projects without micromanaging, and connect your teen with encouraging non-parent mentors.',
    coverImageUrl: 'https://assets.alongside.care/academy/play-adolescent.png',
    sortOrder: 7,
    episodes: [
      {
        slug: 'adolescent-devils-advocate-debate',
        title: 'Turning Teen Arguments Into Respectful Dinner Debates',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Dinner-table debate · Sharpening minds with warmth',
          headline: 'Turning Teen Arguments Into Respectful Dinner Debates',
          deck: 'Why 14-year-olds suddenly question EVERYTHING you say—and how welcoming respectful “Devil’s Advocate” table debates channels that sharp mind into connection instead of defiance.',
          sceneTime: '6:40 PM · DINNER TABLE',
          sceneBody:
            'You make a casual comment about a news story or movie, and instantly {name} jumps in poking holes in every single point you made. *Wait—is {pronoun} picking a fight just to annoy you, or is {poss} brand-new abstract reasoning engine revving up for a test drive?*',
          pollQuestion: 'Has {name} recently started debating everything from school rules to politics?',
          pollOptions: [
            {
              id: 'debates',
              label: 'Yes—feels like living with a tiny trial lawyer!',
              response:
                'Celebration moment! Between ages 13 and 15, abstract logic and “thinking about thinking” (metacognition) flip on—teens practice sharpening their mind on the safest sparring partner on Earth: YOU!',
            },
            {
              id: 'heated',
              label: 'Love the curiosity, just gets too loud or disrespectful fast',
              response:
                'Setting 2 fun “Pro Debate Rules” (attack ideas, never people + try arguing the opposite side!) turns heated clashes into hilarious, memorable dinners.',
            },
          ],
          beat2Kicker: 'Inside adolescent critical thinking',
          beat2Title: 'The 3-step respectful debate loop turns friction into sharp thinking',
          beat2Lead:
            'When teens discover they can spot hypocrisy and build arguments, crushing their questions creates rebellion—while welcoming playful, respectful debate wires lifelong discernment against propaganda and peer spin! Tap the 3 beats below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat dinner debate loop',
          visualStageHint: 'Tap each beat to turn teen pushback into intellectual joy',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Spark curiosity',
                label: 'Pitch a Fun Dilemma',
                quote: '“Should schools ban phones completely—or teach kids to manage them? Convince me!”',
                desc: 'Pick lively low-stakes or real-world topics (AI art, sports rules, fairness, movies) where there’s zero personal grudge.',
                brainNote: 'Activates formal abstract logic and perspective-taking joyfully.',
              },
              {
                stepNum: '02',
                actor: 'Ask “What if?”',
                label: 'Steel-Man Both Sides',
                quote: '“Strong point! Now switch chairs mentally—what’s the smartest argument for the OTHER side?”',
                desc: 'Inviting {name} to argue the strongest case for the opposing view builds intellectual flexibility fast.',
                brainNote: 'Strengthens metacognition—spotting blind spots and bias effortlessly.',
              },
              {
                stepNum: '03',
                actor: 'Admire growth',
                label: 'Change Your Mind Once',
                quote: '“Whoa, I hadn’t thought of that angle—you actually shifted my view a bit!”',
                desc: 'Letting a 14-year-old see a grown-up update an opinion calmly models rare wisdom and earns huge teen respect.',
                brainNote: 'Teaches that changing your mind with better evidence is strength, not weakness.',
              },
            ],
          },
          almanacTruth:
            'A 14-year-old who argues with you at dinner isn’t broken—{pronoun} {is} testing out an adult-sized critical mind in the safest courtroom {pronoun} knows.',
          scienceDeepDive:
            'Developmental cognitive science (Piaget’s formal operations; Kuhn’s adolescent argumentation studies) shows that early adolescence marks a surge in metacognitive reasoning and epistemic evaluation; structured family discourse predicts stronger civic reasoning and resistance to online misinformation.',
          beat3Kicker: 'Practice at the dinner table',
          beat3Title: 'Pivot a spicy teen challenge into an awesome conversation',
          rehearsalTriggerSpeaker: '{Name} challenging your view sharply across the table',
          rehearsalTriggerQuote: '“Honestly your generation’s take on that makes ZERO sense—you don’t even get how it works now!”',
          rehearsalPrompt: 'Which defensive snap shuts down a brilliant budding thinker?',
          instincts: [
            {
              id: 'rank',
              label: '“Don’t talk back to me—when you’re paying bills you can have an opinion!”',
              whyTitle: 'Why that’s so tempting—and what gets lost',
              whyText:
                'Pulling rank ends the debate in 3 seconds—yet teaches {name} to take {poss} big ideas straight to anonymous internet forums instead of your table.',
            },
            {
              id: 'lecture',
              label: 'Deliver a 10-minute monologue proving why you’re 100% right.',
              whyTitle: 'Why that’s so tempting—and why teens glaze over',
              whyText:
                'Winning every dinner debate loses the conversation—curious questions make {name} think 10x harder!',
            },
          ],
          calmScriptPlain:
            '“(Grins calmly) Spicy take—keep the tone friendly, and I’m genuinely curious! Walk me through your strongest piece of evidence, and then let’s see if you can argue my side for 30 seconds too!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'tone',
              text: 'Spicy take—keep the tone friendly, and I’m genuinely curious!',
              tag: 'Light Tone Boundary + Warmth',
              note: 'Checks rudeness lightly in four words while welcoming {possessive} bold idea enthusiastically.',
            },
            { text: ' ' },
            {
              id: 'steelman',
              text: 'Walk me through your strongest piece of evidence, and then let’s see if you can argue my side for 30 seconds too!',
              tag: 'Builds Sharp Thinking',
              note: 'Turns heat into evidence-based reasoning and playful perspective switching.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Enforce one golden rule: “Challenge ideas hard, treat people kindly”',
            'Ask “How could we verify that claim?” when wild viral “facts” come up',
            'Admit openly when {name} brings a genuinely sharp point!',
          ],
          pushbacks: [
            {
              id: 'viralmyth',
              label: '“{Name} repeats a wild, clearly false claim from a 15-second TikTok!”',
              setup: 'Skip mocking {obj}—turn into joyful fact-detectives together:',
              script:
                '“Whoa, that WOULD be crazy if true! Let’s do a 60-second source check together after dinner—who actually ran that study, and is the creator selling anything?”',
            },
            {
              id: 'housearg',
              label: '“What if {pronoun} tries to debate a real safety boundary?”',
              setup: 'Draw a warm humorous line between “Dinner Debate Topics” and “Safety Rules”:',
              script:
                '“Love your lawyer skills! Happy to debate AI and sports all night—car-seat safety and curfews aren’t on tonight’s debate docket though!”',
            },
          ],
          advisorPrompt:
            '“Give me 10 fun, thought-provoking ‘Devil’s Advocate’ dinner debate prompts a {ageShort} will love arguing.”',
          beat4Kicker: 'This week’s table spark',
          beat4Title: 'Pick one fun critical-thinking game to try',
          beat4Lead: 'Lively dinner tables raise teens who think clearly instead of following every crowd.',
          moves: [
            {
              id: 'debateprompt',
              title: 'Toss one fun “Switch-Sides Debate” question onto the dinner table this week',
              desc: '“Are zoos helpful or outdated?” or “Should homework be banned?”—argue BOTH sides!',
            },
            {
              id: 'checksource',
              title: 'Practice a lighthearted “Who’s Selling What?” source check on one viral clip',
              desc: 'Builds razor-sharp skepticism against online misinformation without preaching.',
            },
            {
              id: 'concede',
              title: 'Say “Great point—you shifted my view on that!” once this month',
              desc: 'Watch {possessive} eyes light up realizing {poss} mind genuinely matters to you.',
            },
          ],
          closingNote:
            'Every spirited, respectful debate around your kitchen table sharpens the exact independent mind that will help {name} question bad advice and stand firm in {poss} own values.',
          pocketInsight:
            'Welcome teen questioning as growing metacognition: set the “challenge ideas, stay kind” rule, play Switch-Sides dinner debates, and model updating your view on good evidence.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“How do you cheer on a teen’s self-directed project—coding, film, art, or business—without accidentally taking it over?”',
            title: 'Backing Self-Directed Passion Projects Without Taking Over',
            targetSlug: 'adolescent-creative-passion-projects',
          },
          interactiveHighlights: ['3-Beat Dinner Debate', 'Switch-Sides Script'],
        },
      },
      {
        slug: 'adolescent-creative-passion-projects',
        title: 'Backing Self-Directed Passion Projects Without Taking Over',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Angel investor · Back the spark, never hijack the wheel',
          headline: 'Backing Self-Directed Passion Projects Without Taking Over',
          deck: 'Why turning a teen’s quirky spark (beat-making, thrifting, coding, baking, video editing) into a “college-resume plan” kills the joy overnight—and how to act as their chill Angel Investor instead.',
          sceneTime: '4:30 PM · BEDROOM DESK',
          sceneBody:
            '{Name} excitedly shows you a rough logo for a tiny sneaker-cleaning hustle, a 3-minute short film, or a backyard woodworking bench. Instantly your adult brain leaps three steps ahead: “Ooh! You should build a website, make a business plan, and put it on college applications!” *Watch closely—{poss} excitement drops fifty percent in five seconds.*',
          pollQuestion: 'Have you ever accidentally “over-helped” a cool project until {name} lost interest?',
          pollOptions: [
            {
              id: 'overhelp',
              label: 'Guilty—my enthusiasm accidentally took over {poss} spark!',
              response:
                'Every proud parent has been there! Switching from “Project Manager” to “Quiet Angel Investor” (funding tiny supplies and asking curious questions ONLY) keeps {poss} creative fire roaring!',
            },
            {
              id: 'spark',
              label: 'Looking for ways to help {obj} start a real project offline',
              response:
                'Offering a tiny $25 “Micro-Grant” for any real creation {pronoun} pitches sparks unbelievable 14-year-old initiative!',
            },
          ],
          beat2Kicker: 'Guarding teen creative ownership',
          beat2Title: 'Compare parent project-managing vs. the Angel Investor stance',
          beat2Lead:
            'Real agency blooms when a teen owns BOTH the thrilling vision AND the messy glitches. Compare both parent roles below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Resume manager vs. chill Angel Investor',
          visualStageHint: 'Compare micromanaging projects with backing teen agency',
          visualConfig: {
            willpowerLabel: 'Parent Project Manager',
            willpowerTitle: 'Optimizing, grading & turning hobbies into college resumes',
            willpowerDesc:
              'Jumping in with spreadsheets, polished tweaks, and “This will look great for college!” steals the soul right out of self-directed passion.',
            willpowerOutcome: 'Abandoned projects and “Why bother, you’ll just redo it.”',
            guardrailLabel: 'Quiet Angel Investor',
            guardrailTitle: 'Small seed budget + workspace + curious cheering from the wings',
            guardrailDesc:
              'Back the spark with a small budget (e.g., $25 supplies), protect unstructured weekend hours, ask “What do you need from me?”, and keep your hands off the mouse!',
            guardrailOutcome: 'Wild real-world problem-solving, grit, and genuine pride.',
            environmentShifts: [
              'NEVER mention college admissions while {name} is excited about a creative project—let pure curiosity breathe!',
              'Offer a fun “$25 Kitchen-Table Micro-Grant” when {pronoun} pitches a real project (podcast mic, fabric, wood, ingredients).',
              'Celebrate shipping messy Version 1—even if it’s quirky or abandoned cleanly after 6 weeks, the building skills stay forever.',
            ],
          },
          almanacTruth:
            'The fastest way to extinguish a 14-year-old’s passion project is turning it into a parent-managed resume bullet—act like a chill Angel Investor and keep your hands off the wheel.',
          scienceDeepDive:
            'Self-Determination Theory research (Ryan & Deci; Pink) demonstrates that extrinsic performance pressure (such as parental takeover or resume framing) undermines intrinsic creative persistence—the “overjustification effect”—whereas autonomy-supportive resource backing sustains self-directed mastery.',
          beat3Kicker: 'Practice when {name} pitches a quirky idea',
          beat3Title: 'Respond like a cool backer instead of a critical boss',
          rehearsalTriggerSpeaker: '{Name} showing a rough early song beat, recipe, or design',
          rehearsalTriggerQuote: '“Check out this weird animation I’ve been messing with—I kinda want to make a whole 2-minute short!”',
          rehearsalPrompt: 'Which enthusiastic parent reaction quietly drains {possessive} wind?',
          instincts: [
            {
              id: 'optimize',
              label: '“Awesome! Let’s sign you up for a 10-week film camp and enter the state youth contest!”',
              whyTitle: 'Why that’s so tempting—and why kids back away',
              whyText:
                'Instant scaling and contests turn playful freedom into a high-stakes grade before {pronoun} even finishes frame ten.',
            },
            {
              id: 'practical',
              label: '“Cute—just make sure it doesn’t distract you from honors algebra!”',
              whyTitle: 'Why that’s so tempting—and what {name} hears',
              whyText:
                'Calling creative passion a “distraction” signals that only test scores matter to you.',
            },
          ],
          calmScriptPlain:
            '“WHOA—that style is genuinely awesome! Look how smooth that transition came out. Zero interference from me—if you ever need twenty bucks for a sketchbook or tripod, or want a test audience for Draft 1, just pitch me!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'specific',
              text: 'WHOA—that style is genuinely awesome! Look how smooth that transition came out.',
              tag: 'Specific Genuine Delight',
              note: 'Notices one real craft detail with zero resume talk or unsolicited fixes.',
            },
            { text: ' ' },
            {
              id: 'investor',
              text: 'Zero interference from me—if you ever need twenty bucks for a sketchbook or tripod, or want a test audience for Draft 1, just pitch me!',
              tag: 'Chill Angel Investor',
              note: 'Backs {possessive} autonomy cleanly while keeping your support warmly available on demand.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Ask “How did you figure out how to do that part?”—let {obj} teach YOU',
            'Keep at least one weekend morning completely unscheduled for tinkering',
            'Let {name} hit snags and Google solutions solo before offering help',
          ],
          pushbacks: [
            {
              id: 'abandons',
              label: '“{Name} goes all-in for three weeks, then drops the project for a new one!”',
              setup: 'Celebrate creative exploration without sunk-cost lectures:',
              script:
                '“Three weeks of teaching yourself audio editing isn’t wasted—those exact skills stack up secretly for whatever cool thing you build next!”',
            },
            {
              id: 'noscreen',
              label: '“What if {possessive} passion project is digital (coding, music production, video editing)?”',
              setup: 'Celebrate CREATING on a screen—creating is completely different from passive scrolling!',
              script:
                '“Making beats, editing short films, or writing Python code exercises deep creative focus—we always treat active ‘Maker Time’ totally differently from passive scrolling.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) wants to try a self-directed project around {poss} hobbies—how can I back it like a supportive Angel Investor without taking over?”',
          beat4Kicker: 'This month’s creative backing',
          beat4Title: 'Pick one Angel Investor move to try',
          beat4Lead: 'Back the spark, protect the margin, and enjoy watching what {name} invents.',
          moves: [
            {
              id: 'microgrant',
              title: 'Offer a fun “$25 Kitchen-Table Micro-Grant” for any self-pitched creation',
              desc: 'Art supplies, baking ingredients, microcontroller kit, bike tools—{name} owns the budget.',
            },
            {
              id: 'bancollege',
              title: 'Ban the phrase “Good for college apps!” around {possessive} hobbies all year',
              desc: 'Guard pure intrinsic joy—paradoxically, real passion shines brightest anyway!',
            },
            {
              id: 'maketime',
              title: 'Distinguish “Active Creating” from “Passive Scrolling” in your house tech pact',
              desc: 'Rewards coding, drawing, and music-making cleanly.',
            },
          ],
          closingNote:
            'When you resist managing {possessive} quirky weekend project and simply watch with genuine wonder, {name} discovers the quiet thrill of bringing something brand-new into the world.',
          pocketInsight:
            'Switch from Resume Manager to chill Angel Investor: offer small seed supplies, ban “college app” framing, honor digital creating differently from scrolling, and keep your hands off the wheel.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“Why will a 14-year-old ignore YOUR brilliant advice—then soak up the exact same advice from one cool non-parent adult?”',
            title: 'Why One Trusted Non-Parent Adult Mentor Changes Everything',
            targetSlug: 'adolescent-mentorship-and-apprenticeship',
          },
          interactiveHighlights: ['Angel Investor Flip', 'Micro-Grant Script'],
        },
      },
      {
        slug: 'adolescent-mentorship-and-apprenticeship',
        title: 'Why One Trusted Non-Parent Adult Mentor Changes Everything',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Trusted village · The power of one outside mentor',
          headline: 'Why One Trusted Non-Parent Adult Mentor Changes Everything',
          deck: 'Why teenagers are biologically wired to widen their circle beyond parents—and how intentionally welcoming one warm aunt, coach, teacher, or craft mentor gives {name} an unshakable safety net.',
          sceneTime: '5:30 PM · AFTER ROBOTICS OR ART CLASS',
          sceneBody:
            'For six months you’ve gently suggested {name} organize {poss} notes or stick with guitar—earning instant shrugs. Tonight {name} bursts in grinning: “Guess what Coach Maya / Uncle Dev told me?! I’m totally doing it!” *It’s literally the EXACT sentence you said last Tuesday! Why did it land like gold coming from them?*',
          pollQuestion: 'Have you watched {name} light up taking advice from another trusted adult?',
          pollOptions: [
            {
              id: 'laugh',
              label: 'Haha YES—exact same advice, totally different reception!',
              response:
                'Zero offense taken—that is 100% healthy adolescent wiring! Building a small “Board of Trusted Adults” around {name} multiplies your family’s wisdom effortlessly.',
            },
            {
              id: 'build',
              label: 'Would love to connect {obj} with a great mentor or role model',
              response:
                'It doesn’t take a formal program—a warm family friend, music teacher, neighbor woodworker, or awesome coach who genuinely sees {obj} changes adolescent trajectories!',
            },
          ],
          beat2Kicker: 'Building your teen’s village',
          beat2Title: 'Flip the lens from “{Pronoun} stopped listening to me” to “{Pronoun} needs a village”',
          beat2Lead:
            'For 99% of human history, teenagers grew up apprenticing alongside aunts, elders, and community craftspeople—not isolated solely with two parents. Flip lenses and map {possessive} trusted circle below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Solo-parent lens vs. trusted-village lens',
          visualStageHint: 'Flip lenses, then tap the 5-adult “Web of Support” check',
          visualConfig: {
            adultLabel: 'Hurt solo-parent lens',
            adultQuote: '“Why does {name} ignore me all week, then treat Uncle Dev’s exact same tip like gospel?!”',
            adultSub: 'It can quietly sting when your teen seeks outside voices—yet it means {pronoun} {is} growing up right on schedule.',
            childLabel: 'Village-mentor lens',
            childQuote: '“Hearing steady wisdom from an adult who isn’t grading my chores lets me absorb it cleanly!”',
            childSub: 'Research shows having even ONE caring non-parent adult mentor dramatically boosts teen resilience and sense of belonging.',
            exposureHeading: 'The “5-Adult Safety Web” check (Search Institute)',
            exposureSub: 'Tap anchors 1–5 to map supportive adults around {name}',
            totalDots: 5,
            defaultCount: 3,
            unitLabel: 'anchor adult',
            lowMax: 1,
            midMax: 3,
            lowMsg: '1 Anchor (Parents only): Huge love, yet teens need at least 2–3 outside voices who can back up your values naturally.',
            midMsg: '2–3 Anchors (Parents + Aunt/Coach/Teacher): Great momentum! Look for one craft, club, or community mentor aligned to {possessive} passions.',
            highMsg: '4–5 Anchors (Full Resilience Web!): Research calls 5 caring adults the gold-standard protective shield for thriving adolescence!',
          },
          almanacTruth:
            'Don’t feel threatened when {name} hangs on a cool coach’s or uncle’s every word—secretly high-five them! Every trusted outside mentor strengthens your family’s safety net.',
          scienceDeepDive:
            'Longitudinal developmental research (Search Institute Developmental Assets; Werner’s Kauai resilience study) identifies the presence of at least one—and ideally 3 to 5—consistent, caring non-parent adult mentors as one of the single strongest predictors of adolescent emotional resilience, academic persistence, and safe decision-making.',
          beat3Kicker: 'Practice cultivating a mentor',
          beat3Title: 'Invite a trusted adult into {possessive} corner warmly and safely',
          rehearsalTriggerSpeaker: '{Name} excitedly repeating advice from a coach or family friend',
          rehearsalTriggerQuote: '“Coach Maya told me I should start stretching and keeping a training log—I’m starting tonight!”',
          rehearsalPrompt: 'Which petty human reflex spoils the moment?',
          instincts: [
            {
              id: 'credit',
              label: '“Uh, HELLO?! I’ve been telling you that for six months and you ignored me!”',
              whyTitle: 'Why that’s so tempting—and why it deflates the win',
              whyText:
                'Wanting credit is SO human! Yet keeping score makes {name} stop sharing mentor breakthroughs—celebrating Coach Maya keeps the momentum flying!',
            },
            {
              id: 'vetting',
              label: 'Skip noticing how coaches or adult mentors actually treat kids.',
              whyTitle: 'Why that’s so tempting—and why parent vetting stays vital',
              whyText:
                'Always keep clear transparent boundaries (open spaces, group communication, parental awareness) with every non-parent adult in your teen’s life.',
            },
          ],
          calmScriptPlain:
            '“(Big genuine grin) Coach Maya knows her stuff—that’s a seriously smart habit! Let’s grab a cool notebook for your log tomorrow, and I love seeing how much you click with her.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'egooff',
              text: 'Coach Maya knows her stuff—that’s a seriously smart habit!',
              tag: 'Drops Parent Ego',
              note: 'Cheers the win cleanly without demanding “I told you so” credit.',
            },
            { text: ' ' },
            {
              id: 'reinforce',
              text: 'Let’s grab a cool notebook for your log tomorrow, and I love seeing how much you click with her.',
              tag: 'Strengthens the Village',
              note: 'Backs up a vetted positive adult mentor so {name} keeps leaning into healthy role models.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Always keep transparent safety boundaries around non-parent mentors (public spaces, parent-copied communication)',
            'Tell trusted aunts, uncles, or close friends openly: “We’d love you in {possessive} teen board of advisors!”',
            'Never take it personally when outside advice lands faster than yours',
          ],
          pushbacks: [
            {
              id: 'noclose',
              label: '“We don’t live near extended family—where do we find mentors?”',
              setup: 'Look right inside {possessive} favorite worlds: clubs, music studios, library teen labs, or neighborhood crafts:',
              script:
                '“A thoughtful robotics advisor, theater director, martial-arts instructor, or trusted family friend on FaceTime once a month makes an extraordinary teen mentor!”',
            },
            {
              id: 'badmentor',
              label: '“What if a coach or adult uses harsh, shaming tactics?”',
              setup: 'Trust your protective radar—an unhealthy adult isn’t a mentor, and switching teams protects {poss} spirit:',
              script:
                '“Real mentors combine high standards with steady respect—if an adult humiliates kids or crosses transparency boundaries, we step away promptly with zero apology.”',
            },
          ],
          advisorPrompt:
            '“Help me brainstorm 4 realistic ways to build a safe ‘5-Adult Web of Support’ around my {ageShort} in our community.”',
          beat4Kicker: 'This month’s village move',
          beat4Title: 'Pick one intentional step to build {possessive} support web',
          beat4Lead: 'Teens aren’t meant to grow up in an echo chamber of two tired parents—invite the village!',
          moves: [
            {
              id: 'map5',
              title: 'Jot down 3–4 caring non-parent adults already in {possessive} life',
              desc: 'An aunt, family friend, favorite teacher, or coach—intentionally nurture those connections.',
            },
            {
              id: 'invitecoffee',
              title: 'Ask one trusted adult relative or close friend to take {name} for ice cream or teach a cool skill',
              desc: 'One casual 1-on-1 check-in builds a priceless confidant for tricky high-school years.',
            },
            {
              id: 'zeroego',
              title: 'Celebrate the next time {name} takes good advice from an outside mentor—zero “I told you so!”',
              desc: 'Smile quietly knowing your village is doing its exact job.',
            },
          ],
          closingNote:
            'Building a warm circle of vetted, steady adults around {name} doesn’t shrink your importance—it multiplies your love across every room {pronoun} walks into.',
          pocketInsight:
            'Build a transparent 5-Adult Web of Support (coaches, aunts, teachers, community mentors) and cheer warmly without ego whenever their good advice lands with {name}.',
          nextEpisodeHook: null,
          interactiveHighlights: ['5-Adult Web Map', 'Zero-Ego Mentor Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 35: Algorithms, Social Comparison & Digital Footprint (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'digital-adolescent-algorithmic-feeds',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    developmentalTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    title: 'Algorithms, Social Comparison & Digital Footprint',
    reliefSubtitle:
      'Reset toxic algorithmic feeds together without spying, unpack why likes hit teen self-worth hard, hold honest digital-footprint talks, and enjoy one unplugged family ritual',
    tonightQuickWinTitle: 'Episode 1: Resetting Toxic Social Feeds Together (Without Spying)',
    summary:
      'Empower teens to retrain and prune algorithmic recommendation engines consciously, decode why social validation circuits amplify likes and silent snaps, build authentic digital-reputation awareness, and anchor one genuinely fun unplugged family tradition.',
    coverImageUrl: 'https://assets.alongside.care/academy/digital-adolescent.png',
    sortOrder: 7,
    episodes: [
      {
        slug: 'adolescent-algorithm-detox-protocol',
        title: 'Resetting Toxic Social Feeds Together (Without Spying)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Algorithm chef · Retraining the feed intentionally',
          headline: 'Resetting Toxic Social Feeds Together (Without Spying)',
          deck: 'Why recommendation feeds slide rapidly toward outrage, insecurity, and dark rabbit holes—and the 10-minute “Algorithm Detox” teens love running themselves.',
          sceneTime: '8:00 PM · LIVING ROOM COUCH',
          sceneBody:
            'You notice {name} closing {poss} social app looking tense and drained—because lingering 15 seconds on one sad clip or harsh fitness post tricked the recommendation engine into flooding {poss} entire “For You” page with insecurity. *How do you help {obj} take back control of the feed without grabbing {poss} phone to snoop?*',
          pollQuestion: 'Have you seen {possessive} mood dip noticeably after scrolling algorithmic feeds?',
          pollOptions: [
            {
              id: 'mooddrop',
              label: 'Yes—comes off scrolling noticeably tenser or sadder',
              response:
                'Pure algorithmic mechanics! Recommendation engines optimize for watch-time—NOT happiness—so anxiety and rage get boosted fast unless teens learn how to actively retrain their feed.',
            },
            {
              id: 'autonomy',
              label: 'Want {obj} to spot toxic feeds {obj}self without me policing',
              response:
                'Teens hate feeling manipulated by tech companies! Teaching {name} how to “hack back” and reset {poss} own algorithm flips control straight into {poss} hands.',
            },
          ],
          beat2Kicker: 'Hacking back the feed',
          beat2Title: 'Compare passive scrolling against the 10-Minute Algorithm Reset',
          beat2Lead:
            'A recommendation engine is just a dumb puppy fetching whatever you stare at longest—even things that make you feel awful. Compare passive scrolling with active feed-training below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Passive scroll trap vs. active feed-training guardrail',
          visualStageHint: 'Compare letting the algorithm drive vs. taking the wheel',
          visualConfig: {
            willpowerLabel: 'Algorithm Driving',
            willpowerTitle: 'Letting autoplay & hate-watching train the feed',
            willpowerDesc:
              'Pausing on drama, insecurity, or rage-bait tells the engine “Send 100 more!”—spiraling teen mood downward inside one week.',
            willpowerOutcome: 'Comparison gloom, doomscrolling, and feeling strangely drained.',
            guardrailLabel: '10-Min Feed Retrain',
            guardrailTitle: 'Reset feed + tap “Not Interested” + search real joys',
            guardrailDesc:
              'Use built-in “Refresh For You Feed,” ruthlessly tap “Not Interested” on junk, mute draining accounts, and intentionally search 5 real hobbies (skate, cooking, comedy, art).',
            guardrailOutcome: 'A cleaner, lighter feed—and a savvy teen who runs the app instead of vice versa.',
            environmentShifts: [
              'Rule of Zero Hate-Watching: Even commenting angrily on a dumb post tells the algorithm “Show me MORE!”—scroll straight past or hit “Not Interested.”',
              'Use the built-in “Reset Suggested Content” button (TikTok / Instagram / YouTube) once a month like taking out the trash.',
              'Switch from endless “For You” algorithmic tabs to “Following Only” so {name} sees actual chosen creators and friends.',
            ],
          },
          almanacTruth:
            'Teens hate being played by billion-dollar algorithms—teach {name} how to use “Reset Feed” and “Not Interested” like a pro so {pronoun} trains the app instead of letting it train {obj}.',
          scienceDeepDive:
            'Empirical platform audits and adolescent media-literacy trials show that short-form engagement algorithms amplify high-arousal negative and appearance-comparison content rapidly when users linger even briefly, while explicit algorithmic-literacy coaching boosts teen agency and lowers distress.',
          beat3Kicker: 'Practice a cool zero-snooping chat',
          beat3Title: 'Teach the Algorithm Reset on YOUR own phone first!',
          rehearsalTriggerSpeaker: '{Name} irritated after scrolling drama or comparison clips',
          rehearsalTriggerQuote: '“Ugh, my feed is literally ALL annoying drama and fake gym influencers lately!”',
          rehearsalPrompt: 'Which parent reaction instantly makes {name} hide {poss} screen?',
          instincts: [
            {
              id: 'grab',
              label: '“Give me your phone right now so I can go through who you’re following!”',
              whyTitle: 'Why that’s so tempting—and why doors slam',
              whyText:
                'Sudden screen-grabbing triggers privacy panic—whereas showing {obj} how YOU just reset your own messy algorithm invites side-by-side collaboration!',
            },
            {
              id: 'deleteall',
              label: '“Just delete the entire app—social media is garbage anyway!”',
              whyTitle: 'Why that’s so tempting—and what gets missed',
              whyText:
                'Even when apps are delayed or limited, teaching real algorithmic literacy is an essential lifelong skill for high school and adulthood.',
            },
          ],
          calmScriptPlain:
            '“Ugh, mine did the EXACT same thing last week—I lingered ten seconds on one stressful video and suddenly my whole feed turned into doom! Wanna see a cool 2-minute hack to nuke your algorithm back to scratch without deleting your account—just tapping ‘Refresh Feed’ and feeding it five hobbies you actually love?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'relate',
              text: 'Ugh, mine did the EXACT same thing last week—I lingered ten seconds on one stressful video and suddenly my whole feed turned into doom!',
              tag: 'Relatable Equal',
              note: 'Zero lecturing—sharing your own messy feed puts both of you on the exact same team against sneaky algorithms.',
            },
            { text: ' ' },
            {
              id: 'hack',
              text: 'Wanna see a cool 2-minute hack to nuke your algorithm back to scratch without deleting your account—just tapping ‘Refresh Feed’ and feeding it five hobbies you actually love?',
              tag: 'Empowering Zero-Spy Hack',
              note: 'Hands full control to {name}—no snooping required!',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Demonstrate the feed reset on YOUR phone first—never demand to grab {poss}',
            'Teach why “hate-watching” or angry commenting feeds the monster',
            'Celebrate unfollowing draining accounts like spring cleaning',
          ],
          pushbacks: [
            {
              id: 'alreadyclean',
              label: '“My feed is totally fine—I don’t get affected by algorithms!”',
              setup: 'Smile warmly—nobody thinks ads work on them either! Pitch a fun 60-second test:',
              script:
                '“Totally fair—let’s test a wild experiment: count how many posts in the next 10 swipes make you feel genuinely energized vs. subtly stressed or envious!”',
            },
            {
              id: 'rabbit',
              label: '“What if dark or distressing content keeps popping up despite resetting?”',
              setup: 'Validate that some platforms aggressively push heavy loops—and support stepping off the app together:',
              script:
                '“If an app keeps shoving dark stuff in your face even after resetting, that’s a design flaw—let’s take a 2-week break from that app completely and see how much lighter your head feels.”',
            },
          ],
          advisorPrompt:
            '“Walk me through simple steps my {ageShort} can use to reset recommendation algorithms on YouTube, Instagram, and TikTok cleanly.”',
          beat4Kicker: 'This week’s 5-minute reset',
          beat4Title: 'Pick one algorithm-literacy move to run together',
          beat4Lead: 'Teach teens to drive the machine—not get driven by it.',
          moves: [
            {
              id: 'ownreset',
              title: 'Run a 3-minute “Feed Spring Clean” on YOUR own phone beside {name}',
              desc: 'Narrate lightly: “Unfollowing this stressful account, tapping Not Interested on drama—feels way better!”',
            },
            {
              id: 'nofeed',
              title: 'Turn off auto-playing endless recommendation tabs or switch to “Following Only”',
              desc: 'Cutting infinite scroll removes 80% of accidental rabbit holes.',
            },
            {
              id: 'hatewatch',
              title: 'Share the “Zero Hate-Watching” rule over dinner',
              desc: 'Leaving an angry comment pays the creator in engagement—scrolling right past starves rage-bait!',
            },
          ],
          closingNote:
            'When {name} learns to spot rage-bait in half a second and ruthlessly curate {poss} own feed, {pronoun} gains digital sovereignty that lasts a lifetime.',
          pocketInsight:
            'Model resetting your own feed first, teach the “Zero Hate-Watching” rule, and use built-in “Reset Feed / Not Interested” tools so {name} trains algorithms consciously.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Why do tiny red heart counts and silent Snap streaks hit a 14-year-old’s self-worth like a physical punch?”',
            title: 'Why “Likes” & Silent Snaps Hit Teen Self-Worth So Hard',
            targetSlug: 'adolescent-social-validation-circuits',
          },
          interactiveHighlights: ['Algorithm-Detox Flip', 'Zero-Spy Reset Script'],
        },
      },
      {
        slug: 'adolescent-social-validation-circuits',
        title: 'Why “Likes” & Silent Snaps Hit Teen Self-Worth So Hard',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Metric-proof self-worth · Separating value from likes',
          headline: 'Why “Likes” & Silent Snaps Hit Teen Self-Worth So Hard',
          deck: 'What fMRI teen brain scans reveal about “likes,” streaks, and social scoreboards—and how hiding public counts helps {name} breathe easier.',
          sceneTime: '7:20 PM · LIVING ROOM',
          sceneBody:
            '{Name} posted a fun photo ten minutes ago and has already unlocked {poss} phone six times checking the heart count. When only four people tap like, {pronoun} quietly deletes the post looking deflated. *Why does a tiny digital scoreboard carry such massive emotional power at age fourteen?*',
          pollQuestion: 'Do likes, views, streaks, or follower counts noticeably sway {possessive} confidence?',
          pollOptions: [
            {
              id: 'score',
              label: 'Yes—quietly deletes posts or stresses over streaks',
              response:
                'UCLA brain scans literally watched teen reward centers light up like slot machines when peers tapped “Like”—meaning that pull is wired-in social biology, NOT vanity!',
            },
            {
              id: 'protect',
              label: 'Want to fortify {poss} inner confidence before metrics bite harder',
              response:
                'Hiding public like counts in settings + celebrating un-posted real-life moments keeps identity anchored inside {obj}, not on a screen.',
            },
          ],
          beat2Kicker: 'Inside the social reward circuit',
          beat2Title: 'Compare scoreboard living against real-world self-worth',
          beat2Lead:
            'Between ages 13 and 16, the brain’s social-reward hub (nucleus accumbens) hits peak lifetime sensitivity to peer approval—making public “like” scoreboards uniquely intense. Toggle both states below.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Scoreboard chase vs. grounded real-world worth',
          visualStageHint: 'Toggle public-metric stress vs. grounded confidence',
          visualConfig: {
            calmToggleLabel: 'Grounded Real-World Worth',
            stormToggleLabel: 'Public Like-Scoreboard Loop',
            calmStatus: 'METRICS HIDDEN · REAL CONNECTION',
            stormStatus: 'REWARD CENTER HIJACKED BY NUMBERS',
            calmReadouts: [
              {
                name: 'Real 1-on-1 Friends',
                value: 'Warm & Steady',
                tone: 'spruce',
                desc: 'Laughing in person or texting two close friends directly fills genuine belonging with zero scoreboard.',
              },
              {
                name: 'Inner Identity',
                value: 'Self-Anchored',
                tone: 'spruce',
                desc: 'Hiding like counts lets {name} share photos for fun memories—not a popularity vote.',
              },
            ],
            stormReadouts: [
              {
                name: 'Social Reward Hub',
                value: 'Refreshing Every 60s',
                tone: 'amber',
                desc: 'Variable likes trigger intermittent dopamine bursts—followed by instant sting when numbers dip.',
              },
              {
                name: 'Authentic Joy',
                value: 'Turned Into Performance',
                tone: 'amber',
                desc: 'Everyday hangouts get hijacked by “Will this look cool enough to post?”',
              },
            ],
          },
          almanacTruth:
            'A teen checking likes isn’t shallow—{possessive} brain is biologically built to care deeply about tribe approval, and apps deliberately gamified that tender need into a public scoreboard.',
          scienceDeepDive:
            'UCLA neuroimaging research (Sherman et al., Psychological Science) demonstrated heightened nucleus accumbens activation in adolescents viewing photos with high “like” counts—and found teens were significantly more likely to conform to peer-endorsed posts, highlighting why hiding public metrics reduces evaluative distress.',
          beat3Kicker: 'Practice when a post feels flat',
          beat3Title: 'Validate the metric sting cleanly without mocking social media',
          rehearsalTriggerSpeaker: '{Name} quietly deleting a photo looking bummed',
          rehearsalTriggerQuote: '“Nobody even liked my post—that picture looked stupid anyway.”',
          rehearsalPrompt: 'Which dismissive adult comment falls completely flat?',
          instincts: [
            {
              id: 'silly',
              label: '“Oh stop caring about silly likes! Back in my day we didn’t care about that!”',
              whyTitle: 'Why that’s so tempting—and why teens shut down',
              whyText:
                'Back in our day we didn’t carry a live 24/7 popularity scoreboard in our pocket! Dismissing it makes {name} feel foolish instead of understood.',
            },
            {
              id: 'boost',
              label: 'Rush to share the post everywhere trying to collect extra likes for {obj}.',
              whyTitle: 'Why that’s so tempting—and why it validates the scoreboard',
              whyText:
                'Chasing numbers together accidentally confirms that the number measures {possessive} worth!',
            },
          ],
          calmScriptPlain:
            '“Man, it’s wild how much a tiny quiet heart count can sting—even grown-ups feel that weird drop when a post gets buried by the algorithm! Half your friends probably didn’t even see it in their feed. Want to toggle ‘Hide Like Counts’ on together so you can post stuff you genuinely like without a scoreboard staring back?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'human',
              text: 'Man, it’s wild how much a tiny quiet heart count can sting—even grown-ups feel that weird drop when a post gets buried by the algorithm!',
              tag: 'Normalizes Zero-Shame Reality',
              note: 'Explains both human biology AND algorithmic reach so {name} stops taking low counts personally.',
            },
            { text: ' ' },
            {
              id: 'hide',
              text: 'Want to toggle ‘Hide Like Counts’ on together so you can post stuff you genuinely like without a scoreboard staring back?',
              tag: 'Practical Relief Switch',
              note: 'Offers a concrete 10-second setting change that immediately cools performance anxiety.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Never mock streaks or likes—explain the slot-machine psychology calmly',
            'Keep family experiences present (“Let’s enjoy this concert without filming every second!”)',
            'Celebrate offline friendships and real laughs loudly',
          ],
          pushbacks: [
            {
              id: 'streaks',
              label: '“I CAN’T lose my 180-day Snap streak or my friend will think I’m mad!”',
              setup: 'Help {name} send one breezy text breaking streak slavery cleanly:',
              script:
                '“Send a casual heads-up: ‘Hey, I’m stepping back from keeping streaks because it’s stressing me out—still love texting you for real!’ True friends feel secretly relieved too.”',
            },
            {
              id: 'private',
              label: '“Is a tiny private account for 10 real friends healthier?”',
              setup: 'YES—smaller, private, real-friend spaces dramatically cut public performance stress:',
              script:
                '“Sharing goofy memories inside a private circle of 8 real friends—or a family photo album—keeps joy high and scoreboard anxiety near zero.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) gets visibly stressed over likes and Snap streaks—how can I help {obj} build metric-proof confidence?”',
          beat4Kicker: 'This week’s calm switch',
          beat4Title: 'Pick one easy move to unplug the scoreboard',
          beat4Lead: 'Self-worth should never fluctuate based on an afternoon algorithm.',
          moves: [
            {
              id: 'hidelikes',
              title: 'Toggle “Hide Like & View Counts” ON in settings together',
              desc: 'Instant mental quiet while still keeping photos and creative sharing fun.',
            },
            {
              id: 'nofilm',
              title: 'Enjoy one awesome family moment completely un-posted this weekend',
              desc: 'Keep a favorite meal, sunset, or hike purely for the people actually there.',
            },
            {
              id: 'unplugstreak',
              title: 'Talk casually about how “streaks” are app retention tricks, not friendship meters',
              desc: 'Real friends stay close through kindness, not daily ceiling selfies.',
            },
          ],
          closingNote:
            'Remind {name} often through your steady eyes and unhurried presence: no number on a glass screen will ever come close to measuring who {pronoun} truly {is}.',
          pocketInsight:
            'Validate how hard public scoreboards hit teen reward circuits, turn on “Hide Like Counts,” unmask streaks as app retention hooks, and celebrate un-posted real-life joy.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“How do you talk about digital footprints and privacy so a 14-year-old actually listens—instead of tuning out fear speeches?”',
            title: 'Digital Footprint Talks Teens Actually Take Seriously',
            targetSlug: 'adolescent-digital-footprint-and-privacy',
          },
          interactiveHighlights: ['Validation Brain Bridge', 'Hide-Likes Script'],
        },
      },
      {
        slug: 'adolescent-digital-footprint-and-privacy',
        title: 'Digital Footprint Talks Teens Actually Take Seriously',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'Future self · Protecting privacy with dignity',
          headline: 'Digital Footprint Talks Teens Actually Take Seriously',
          deck: 'Why scary “You’ll never get into college!” speeches make teens tune out—and how the 5-Second Screenshot Test + private settings build real digital wisdom.',
          sceneTime: '4:40 PM · CAR RIDE',
          sceneBody:
            'Everyone tells 14-year-olds that “disappearing” snaps and private group chats vanish forever—yet screenshots live on forever and get forwarded in two taps when friendships shift. *How do you build real privacy instincts without scaring {name} silly?*',
          pollQuestion: 'Does {name} treat “disappearing” messages or private stories as truly private?',
          pollOptions: [
            {
              id: 'vanish',
              label: 'Yes—assumes private chats stay strictly between friends',
              response:
                'Totally understandable! Teaching the dead-simple “Screenshot Test” (“Assume anything sent can be screenshot and shown to Grandma or Coach”) protects {obj} instantly with zero scare tactics.',
            },
            {
              id: 'privacy',
              label: 'Want a crisp 5-minute privacy & security audit we can do together',
              response:
                'Checking location-sharing, private accounts, and respectful consent (never forwarding private photos of others!) builds fierce real-world ethics.',
            },
          ],
          beat2Kicker: 'Practical digital dignity',
          beat2Title: 'The 3-step digital footprint talk teens actually respect',
          beat2Lead:
            'Skip distant college-admissions lectures and focus on protecting {possessive} dignity TODAY—plus never becoming the person who screenshots someone else’s vulnerable moment. Tap the 3 beats below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat digital dignity & privacy loop',
          visualStageHint: 'Tap each beat to build real-world judgment',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'The 5-sec test',
                label: 'The Screenshot Rule',
                quote: '“Nothing digital truly disappears—before tapping send, picture it on a school hallway poster.”',
                desc: 'Works for texts, voice notes, group jokes, and “vanishing” snaps equally.',
                brainNote: 'Simple vivid mental check fires right before impulsive taps.',
              },
              {
                stepNum: '02',
                actor: 'Lock down location',
                label: 'Privacy Hygiene',
                quote: 'Private accounts, location tags OFF on posts, zero live Snap-Map broadcasting to acquaintances',
                desc: 'Keep exact school logos, home addresses, and real-time hangouts strictly off public feeds.',
                brainNote: 'Smart operational privacy feels mature and empowering—not babyish.',
              },
              {
                stepNum: '03',
                actor: 'Respect others',
                label: 'Golden Rule of Consent',
                quote: '“Never record, post, or forward an embarrassing or private photo of someone else—ever.”',
                desc: 'Protects BOTH {possessive} character AND {possessive} legal/social safety.',
                brainNote: 'Anchors online behavior in empathy and loyalty.',
              },
            ],
          },
          almanacTruth:
            '“Disappearing” messages are a myth—the 5-Second Screenshot Test and locking live location off protect {possessive} dignity today AND tomorrow.',
          scienceDeepDive:
            'Digital citizenship research (Common Sense Media; Weinstein & James) confirms that concrete, immediate-consequence heuristics (“the screenshot rule” and relational ethics) outperform distant threat warnings (“future employers”) in shaping real-time adolescent posting decisions.',
          beat3Kicker: 'Practice a grown-up privacy check',
          beat3Title: 'Bring up private photos and screenshots without awkward lecturing',
          rehearsalTriggerSpeaker: 'Casual drive home after hearing about a classmate’s leaked screenshot',
          rehearsalTriggerQuote: '“I would NEVER post something dumb publicly—I only send funny stuff to my close friends on private!”',
          rehearsalPrompt: 'Which preachy reply makes a teen tune out immediately?',
          instincts: [
            {
              id: 'doom',
              label: '“One mistake will ruin your entire life and no college or job will ever touch you!”',
              whyTitle: 'Why that’s so tempting—and why catastrophizing backfires',
              whyText:
                'Extreme doom threats feel unreal to a 14-year-old—and worse, if someone EVER coerces or leaks a photo of {obj}, fear stops {obj} from coming to you for help!',
            },
            {
              id: 'ignore',
              label: 'Avoid mentioning sexting, coercion, or leaked screenshots because it feels awkward.',
              whyTitle: 'Why that’s so tempting—and why one calm sentence saves lives',
              whyText:
                'Saying calmly “If anyone ever pressures you for a photo OR leaks something, come straight to me and we will handle it together with zero shame” is priceless armor.',
            },
          ],
          calmScriptPlain:
            '“Totally get that you trust your close crew—the tricky part is friends have fallouts, phones get passed around, and ‘disappearing’ snaps get photographed with a second phone in two seconds. Quick rule of thumb: never put anything in pixels you wouldn’t want projected in assembly—AND if anyone ever pressures or screenshots you, bring it straight to me with zero shame and we’ll shut it down together.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'realworld',
              text: 'the tricky part is friends have fallouts, phones get passed around, and ‘disappearing’ snaps get photographed with a second phone in two seconds.',
              tag: 'Real-World Mechanics',
              note: 'Explains practically HOW private messages leak without attacking {possessive} friends.',
            },
            { text: ' ' },
            {
              id: 'rescue',
              text: 'AND if anyone ever pressures or screenshots you, bring it straight to me with zero shame and we’ll shut it down together.',
              tag: 'Zero-Shame Rescue Guarantee',
              note: 'Protects against sextortion and silent panic by guaranteeing you will fight FOR {obj}, never shame {obj}.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Check live location maps (Snap Map / photo geotags) together calmly',
            'Ask {possessive} permission before YOU post photos of {obj} online too!',
            'Keep the rescue promise 100% calm and clear',
          ],
          pushbacks: [
            {
              id: 'parentpost',
              label: '“Wait—YOU post awkward baby pictures of me on Facebook all the time!”',
              setup: 'Own it with a laugh and model digital consent immediately!',
              script:
                '“Touché! Fair call—starting today I’ll ALWAYS ask your okay before posting any photo of you, because your digital footprint belongs to you too.”',
            },
            {
              id: 'sextortion',
              label: '“What if an online stranger ever demands money or threatens to share something?”',
              setup: 'Give {name} the crystal-clear 3-step emergency script ahead of time:',
              script:
                '“NEVER pay, NEVER send more, screenshot the profile, and walk straight to Mom or Dad—it is a known criminal scam, 0% your fault, and we report and shut it down immediately.”',
            },
          ],
          advisorPrompt:
            '“Give me a quick 5-minute Privacy Settings Checklist for a {ageShort} (location tags, private profiles, and respectful posting).”',
          beat4Kicker: 'This week’s 5-minute checkup',
          beat4Title: 'Pick one simple privacy habit to anchor together',
          beat4Lead: 'Respectful digital dignity protects today’s friendships and tomorrow’s doors.',
          moves: [
            {
              id: 'locoff',
              title: 'Turn OFF public live-location sharing (Snap Map / geotags) together',
              desc: 'Keep exact real-time location strictly between family and trusted safety check-ins.',
            },
            {
              id: 'modelask',
              title: 'Start asking {possessive} okay before posting ANY photo of {obj} online',
              desc: 'Modeling consent yourself teaches digital respect faster than any rule.',
            },
            {
              id: 'rescuepromise',
              title: 'State the zero-shame rescue guarantee clearly in the car this week',
              desc: '“If anyone ever pressures you for a photo or threatens you online, tell me immediately—zero shame, we fix it together.”',
            },
          ],
          closingNote:
            'When you treat {possessive} digital dignity with respect—even asking before posting family photos—{name} learns to guard both {poss} own privacy and {poss} friends’ trust.',
          pocketInsight:
            'Teach the 5-Second Screenshot Test, disable public live location maps, ask {possessive} consent before posting family pics, and guarantee zero-shame help if pressure ever hits.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery: '“How do you pull a 14-year-old happily away from screens for one awesome unplugged family tradition?”',
            title: 'Designing One Unplugged Family Ritual Everyone Enjoys',
            targetSlug: 'adolescent-unplugged-weekends-routine',
          },
          interactiveHighlights: ['3-Beat Digital Dignity', 'Zero-Shame Rescue Script'],
        },
      },
      {
        slug: 'adolescent-unplugged-weekends-routine',
        title: 'Designing One Unplugged Family Ritual Everyone Enjoys',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.leaf,
          illustrationCaption: 'Screen-free anchor · Real laughter beats rules',
          headline: 'Designing One Unplugged Family Ritual Everyone Enjoys',
          deck: 'Why announcing a mandatory “No-Tech Sunday!” sparks groans—and how letting your teen co-design one genuinely fun weekly analog ritual makes unplugging the highlight of the week.',
          sceneTime: '2:00 PM · SUNDAY AFTERNOON',
          sceneBody:
            'Everyone is home under the same roof, yet somehow every single person—including you—has drifted into a separate corner staring at a glowing rectangle. *You miss real laughs and shared memories before high school flies by—how do you spark an unplugged ritual a 14-year-old actually looks forward to?*',
          pollQuestion: 'Does weekend family time quietly dissolve into four separate screens?',
          pollOptions: [
            {
              id: 'separate',
              label: 'Yes—before we know it, the whole afternoon vanishes!',
              response:
                'Super common! Calling it “Family Unplugged Fun” instead of a “Screen Ban”—and letting {name} pick the food, music, or adventure—brings everyone happily off screens!',
            },
            {
              id: 'ideas',
              label: 'Need fresh teen-approved ideas that don’t feel cheesy',
              response:
                'Late-night ramen runs, bowling, paddleboarding, Mario Kart tournament on the big TV, or thrift-store challenges beat forced board games every time!',
            },
          ],
          beat2Kicker: 'Creating magnetic offline joy',
          beat2Title: 'Four simple ingredients of a teen-loved unplugged ritual',
          beat2Lead:
            'Unplugging only feels like deprivation when there’s nothing awesome replacing the screen. When a ritual brings great food, movement, music, and teen choice, phones stay forgotten in the basket! Tap all 4 below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-step teen-approved Unplugged Ritual',
          visualStageHint: 'Tap each step to design a tradition {name} actually loves',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Step 1 · Co-Pick',
                label: 'Teen Picks Vibe',
                title: 'Put {name} on the selection committee',
                desc: 'Skip forced “family hikes” if {pronoun} hates trails—try taco-truck taste tests, thrift-store $10 outfit swaps, climbing gyms, or midnight pancake breakfasts!',
                why: 'Co-design turns eye-rolls into genuine excitement.',
              },
              {
                timeOrCue: 'Step 2 · Short & Real',
                label: '2–3 Hours Clean',
                title: 'Start with a crisp 2-hour window—not an all-weekend ban',
                desc: '“Phones rest in the kitchen basket from Sunday 3–5 PM” feels totally doable and protects social check-ins afterward.',
                why: 'Manageable boundaries create joyful consistency week after week.',
              },
              {
                timeOrCue: 'Step 3 · Parents In',
                label: 'Zero Work Glances',
                title: 'Adults lock phones in the exact same basket—zero “quick emails”',
                desc: 'Your full undivided laughter proves offline life really IS richer than glowing rectangles.',
                why: 'Shared presence makes the ritual sacred.',
              },
              {
                timeOrCue: 'Step 4 · Keep It Light',
                label: 'Zero Lectures Allowed',
                title: 'Declare a strict “No Grades, Chores, or Advice” truce',
                desc: 'Protected pure-fun space refills the emotional bank account for the entire school week ahead.',
                why: 'Teens guard traditions where they feel 100% enjoyed, never evaluated.',
              },
            ],
          },
          almanacTruth:
            'You don’t compete with addictive apps by lecturing about screen limits—you compete with real-world laughter, awesome food, and a 2-hour weekly ritual with zero grades talk allowed.',
          scienceDeepDive:
            'Family-systems research (Fiese; Offer) demonstrates that predictable, enjoyment-centered family rituals during adolescence significantly buffer against screen overuse, loneliness, and parent-teen alienation—especially when adolescents have active agency in choosing the activity.',
          beat3Kicker: 'Practice pitching the tradition',
          beat3Title: 'Launch a 2-hour unplugged ritual without sounding cheesy',
          rehearsalTriggerSpeaker: '{Name} skeptical over dinner when you suggest unplugged time',
          rehearsalTriggerQuote: '“Ugh, a ‘Tech-Free Sunday’?! That sounds super cringe—I have stuff to do!”',
          rehearsalPrompt: 'Which strict framing guarantees eye-rolls?',
          instincts: [
            {
              id: 'force',
              label: '“Too bad—I’m turning off the Wi-Fi all Sunday so we can bond!”',
              whyTitle: 'Why that’s so tempting—and why forced bonding backfires',
              whyText:
                'Cutting Wi-Fi unilaterally creates sulky silence on the couch—whereas pitching a 2-hour teen-chosen adventure with zero lectures sparks real grins!',
            },
            {
              id: 'giveup',
              label: 'Back off completely and let every weekend drift apart.',
              whyTitle: 'Why that’s so tempting—and why teens secretly crave anchors',
              whyText:
                'Beneath cool independence, 14-year-olds deeply value knowing you still genuinely enjoy hanging out with them!',
            },
          ],
          calmScriptPlain:
            '“Haha fair—zero cheesy ‘mandatory bonding’ or Wi-Fi bans! Think of it like a 2-hour truce: Sunday 4 to 6, ALL phones stay in the basket, zero grades or chores talk allowed, and YOU get first pick of the adventure—bowling, boba & thrift-store challenge, or homemade ramen bar. What’s your vote?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'truce',
              text: 'zero cheesy ‘mandatory bonding’ or Wi-Fi bans! Think of it like a 2-hour truce: Sunday 4 to 6, ALL phones stay in the basket, zero grades or chores talk allowed',
              tag: 'No-Lectures Truce',
              note: 'Promise of zero nagging makes spending 2 hours with parents instantly appealing.',
            },
            { text: ', ' },
            {
              id: 'pick',
              text: 'and YOU get first pick of the adventure—bowling, boba & thrift-store challenge, or homemade ramen bar. What’s your vote?',
              tag: 'Teen-Picked Fun',
              note: 'Cool, concrete options turn skepticism into genuine interest right away.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Even let {name} bring one close buddy along occasionally!',
            'Keep your own phone 100% locked away—no sneaky work texts',
            'Keep the “No Grades / No Nagging” rule sacred during the ritual',
          ],
          pushbacks: [
            {
              id: 'busy',
              label: '“Sports tournaments eat up most of our weekends!”',
              setup: 'Shrink it cleanly to a 45-minute weeknight ritual—consistency beats length:',
              script:
                '“Even Thursday 8 PM phone-free milkshakes, Friday pancake breakfast, or a 30-minute dog walk works the exact same magic!”',
            },
            {
              id: 'grumpy',
              label: '“{Name} shows up slightly grumpy for the first 10 minutes”',
              setup: 'Stay warm, lighthearted, and unbothered—grumpiness melts fast once snacks and laughs kick in:',
              script:
                '“Don’t take initial teen resistance personally—keep the vibe light and delicious, and watch shoulders drop by minute fifteen.”',
            },
          ],
          advisorPrompt:
            '“Give me 10 genuinely cool, zero-cringe 2-hour unplugged weekend rituals that a {ageShort} will actually get excited about.”',
          beat4Kicker: 'This Sunday’s launch',
          beat4Title: 'Pick one easy step to spark your unplugged ritual',
          beat4Lead: 'Two phone-free hours a week builds memories that outlast every app ever built.',
          moves: [
            {
              id: 'pitch3',
              title: 'Pitch 3 cool 2-hour unplugged ideas at dinner and let {name} vote #1',
              desc: 'Include great food or movement + your ironclad “No Grades Talk” truce.',
            },
            {
              id: 'basketall',
              title: 'Drop YOUR phone into the basket visibly first before heading out',
              desc: 'Sets an unmistakable tone of full presence.',
            },
            {
              id: 'rotate',
              title: 'Rotate “Ritual Captain” each week so every family member gets a turn choosing',
              desc: 'Builds fairness, surprise, and genuine anticipation all week.',
            },
          ],
          closingNote:
            'Years from now, nobody remembers a single afternoon spent scrolling—{name} will remember the goofy thrift-store challenge, the terrible bowling scores, and the unmistakable warmth of a family that actually showed up.',
          pocketInsight:
            'Replace forced Wi-Fi bans with one 2-hour weekly unplugged ritual co-chosen by {name}—adult phones in the basket too, with a sacred “zero grades or nagging” truce.',
          nextEpisodeHook: null,
          interactiveHighlights: ['4-Step Unplugged Ritual', 'No-Lectures Truce Script'],
        },
      },
    ],
  }),
];
