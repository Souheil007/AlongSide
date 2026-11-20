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

export const TIER_2_MIDDLE_CHILDHOOD_MODULES: AcademyModuleSeedData[] = [
  // ===========================================================================
  // COURSE 21: After-School Restraint Collapse, Siblings & Repair (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'behavior-elementary-impulses',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    developmentalTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    title: 'After-School Restraint Collapse, Siblings & Repair',
    reliefSubtitle:
      'Dissolve 4 PM after-school meltdowns, understand why impulse control still slips at age eight, end sibling fairness scorekeeping, and practice real repair',
    tonightQuickWinTitle: 'Episode 1: Why {Name} Falls Apart at 4 PM Right After School',
    summary:
      'Install a calm 20-minute after-school decompression bridge, decode ongoing prefrontal wiring in ages 7–9, step out of sibling “that’s not fair!” scorekeeping, and trade punitive grounding for meaningful repair.',
    coverImageUrl: 'https://assets.alongside.care/academy/behavior-elementary.png',
    sortOrder: 5,
    episodes: [
      {
        slug: 'elementary-after-school-decompression',
        title: 'Why {Name} Falls Apart at 4 PM Right After School',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: '3:45 PM · The zero-question decompression bridge',
          headline: 'Why {Name} Falls Apart at 4 PM Right After School',
          deck: 'Why teachers swear {name} is an angel all day—only for {obj} to snap, sob, or slam doors the second {pronoun} gets in your car.',
          sceneTime: '3:45 PM · CARPOOL PICKUP',
          sceneBody:
            'You smile warmly as {name} climbs into the backseat: “Hey sweetie! How was math? Did you turn in your reading log? Why is your jacket unzipped?” Instantly {name} snaps, “STOP INTERROGATING ME!” and bursts into tears over a missing pencil. *You literally just said hello—what happened?*',
          pollQuestion: 'Does your elementary child save {poss} biggest crashes for 3:45 PM?',
          pollOptions: [
            {
              id: 'daily',
              label: 'Almost every single school day',
              response:
                'Pediatric psychologists call this “After-School Restraint Collapse”—holding it together for 7 hours drains a child’s entire self-control tank, and YOU are the safe harbor where it finally spills.',
            },
            {
              id: 'homework',
              label: 'Explodes the second I mention homework',
              response:
                'Protecting 20–30 minutes of silent snack + movement before opening backpacks cuts homework resistance in half.',
            },
          ],
          beat2Kicker: 'The 4 PM rhythm reset',
          beat2Title: 'Refuel first, talk second, homework third',
          beat2Lead:
            'Seven hours of sitting still, navigating friendships, and following classroom rules burns glucose and emotional stamina to zero. Tap the 4-beat landing sequence below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 20-minute after-school decompression bridge',
          visualStageHint: 'Tap each beat from pickup to calm homework launch',
          visualConfig: {
            steps: [
              {
                timeOrCue: '3:40 PM',
                label: 'Silent Welcome',
                title: 'Warm smile + zero quiz questions at pickup',
                desc: 'Greet {name} with “So glad to see you!” and soft music—skip “How was school?” and backpack audits completely.',
                why: 'Eliminates instant cognitive overload when mental battery is at 1%.',
              },
              {
                timeOrCue: '3:45 PM',
                label: 'Protein Snack',
                title: 'Hand over water + steady fuel without asking',
                desc: 'Cheese stick, apple + peanut butter, or trail mix quietly waiting in the cupholder restores dropping blood sugar fast.',
                why: 'Hangry brains interpret friendly questions as attacks.',
              },
              {
                timeOrCue: '4:00 PM',
                label: '20-Min Unwind',
                title: 'Zero-demand movement or solo quiet time',
                desc: 'Bike ride, shooting hoops, drawing, or lying with the dog—no chores, no reminders, no screens yet.',
                why: 'Lets stress cortisol clear so the thinking cortex powers back up.',
              },
              {
                timeOrCue: '4:30 PM',
                label: 'Gentle Launch',
                title: 'Open folders together once energy steadies',
                desc: 'Now {name} can actually think—and often shares the real school story spontaneously!',
                why: 'A refueled brain finishes homework in half the time with zero tears.',
              },
            ],
          },
          almanacTruth:
            'After-school meltdowns aren’t disrespect—they are a compliment wrapped in sandpaper: {name} worked hard all day and finally feels safe enough with you to drop {poss} armor.',
          scienceDeepDive:
            'Coined by counselor Andrea Loewen Nair, After-School Restraint Collapse reflects ego-depletion of executive resources combined with late-afternoon hypoglycemia and accumulated sensory/social vigilance over a 6–7 hour school day.',
          beat3Kicker: 'Practice before 3:40 PM',
          beat3Title: 'Answer carpool snark without escalating into a lecture',
          rehearsalTriggerSpeaker: '{Name} tossing {poss} backpack onto the car floor',
          rehearsalTriggerQuote: '“Leave me ALONE! Today was the WORST and I’m NOT doing math!”',
          rehearsalPrompt: 'Which honest parent reaction jumps out fastest?',
          instincts: [
            {
              id: 'lecture',
              label: '“Don’t you dare talk to me like that after I drove across town to get you!”',
              whyTitle: 'Why that’s so tempting—and what happens next',
              whyText:
                'Sharp tone hurts when you’ve been excited to see {obj}! Yet matching heat confirms {poss} flooded alarm and ruins the whole evening.',
            },
            {
              id: 'probe',
              label: '“Tell me what happened right now! Who was mean to you at recess?”',
              whyTitle: 'Why that’s so tempting—and why kids clam up',
              whyText:
                'Rapid-fire questioning demands emotional analysis while {poss} tank is empty—leading straight to “NOTHING!”',
            },
          ],
          calmScriptPlain:
            '“Oof, sounds like school took everything out of you today. Zero questions from me right now—there’s cold water and crackers by your seat, and we’ll chill for twenty minutes when we get home.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'absorb',
              text: 'Oof, sounds like school took everything out of you today.',
              tag: 'Absorbs Without Taking Bait',
              note: 'Stays warm and unbothered while gently acknowledging a heavy day.',
            },
            { text: ' ' },
            {
              id: 'space',
              text: 'Zero questions from me right now—there’s cold water and crackers by your seat, and we’ll chill for twenty minutes when we get home.',
              tag: 'Immediate Relief Buffer',
              note: 'Handing over food + silence lets nervous tension evaporate in minutes.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Save “How was school?” for dinner or bedtime',
            'Keep a silent protein snack ready at pickup',
            'Address sharp tone gently an hour later once calm',
          ],
          pushbacks: [
            {
              id: 'rude',
              label: '“Wait—am I letting disrespect slide if I don’t correct the snap right away?”',
              setup: 'Hold a brief warm boundary calmly ONCE nervous systems cool—never mid-crash:',
              script:
                '“(Later at 5:30 PM) Hey, I know school wiped you out earlier. You can always tell me ‘I need quiet time,’ just without snapping at me—deal?”',
            },
            {
              id: 'sports',
              label: '“We have soccer practice right after school with zero buffer!”',
              setup: 'Turn the car ride itself into a 15-minute cozy snack sanctuary:',
              script:
                '“Play a favorite audiobook or quiet playlist with a solid snack in the car—zero talk about grades or chores until after practice.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) melts down every afternoon right after school—help me design a simple 25-minute landing routine before homework.”',
          beat4Kicker: 'Tomorrow at pickup',
          beat4Title: 'Pick one 4 PM peace move to try tomorrow',
          beat4Lead: 'Wait until you see how much faster homework goes after 20 quiet minutes.',
          moves: [
            {
              id: 'carsnack',
              title: 'Have water + a protein snack waiting before {name} gets in the car',
              desc: 'Hand it over with a warm smile and zero questions about school.',
            },
            {
              id: 'noq20',
              title: 'Run a “20-Minute Zero-Question Zone” tomorrow afternoon',
              desc: 'Notice how often {name} starts opening up voluntarily once you stop asking!',
            },
            {
              id: 'bedstory',
              title: 'Move school check-in to bedtime (“Best part + hardest part?”)',
              desc: 'Relaxed pillows unlock honest stories that 3:45 PM interrogation never touches.',
            },
          ],
          closingNote:
            'Being the safe landing pad where {name} can finally exhale after a demanding school day is quiet, unseen parenting gold.',
          pocketInsight:
            'Meet 3:45 PM pickup with a warm smile, waiting protein snack, and 20 minutes of zero-question decompression before mentioning homework.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Wait—if {name} KNOWS the house rule by heart, why did {pronoun} still blurt out or grab anyway?”',
            title: 'Why Impulse Control Still Slips at Age Eight',
            targetSlug: 'elementary-prefrontal-myelination',
          },
          interactiveHighlights: ['20-Min Landing Timeline', 'Zero-Interrogation Script'],
        },
      },
      {
        slug: 'elementary-prefrontal-myelination',
        title: 'Why Impulse Control Still Slips at Age Eight',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.cup,
          illustrationCaption: 'Ages 7–9 wiring · Knowing a rule vs. pausing in time',
          headline: 'Why Impulse Control Still Slips at Age Eight',
          deck: 'Why asking “WHAT WERE YOU THINKING?!” rarely gets a real answer—and how visual cues and pause rituals help developing prefrontal cables catch up.',
          sceneTime: '5:15 PM · KITCHEN HALLWAY',
          sceneBody:
            'You literally reminded {name} two minutes ago not to bounce the basketball indoors. *THUMP!* A lamp wobbles and {name} freezes with wide eyes. When you ask why {pronoun} did it, {pronoun} whispers honestly: “I don’t know!” *How can such a bright kid forget in sixty seconds?*',
          pollQuestion: 'Does {name} genuinely look surprised right after an impulsive slip?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes—{pronoun} knows the rule, then acts before thinking!',
              response:
                'You’re seeing the real gap between “knowing a rule” and “wiring fast braking cables” in ages 7–9. Myelination is accelerating right now—not finished yet!',
            },
            {
              id: 'repeat',
              label: 'I feel like I repeat the same reminders ten times',
              response:
                'Switching from shouting across the house to eye-level 1-step cues cuts repeated reminders dramatically.',
            },
          ],
          beat2Kicker: 'Inside {possessive} growing mind',
          beat2Title: 'Knowing a rule lives in a different circuit than pausing mid-impulse',
          beat2Lead:
            'Between ages 7 and 9, the brain is actively insulating prefrontal “pause cables” (myelination). Under excitement or rush, the action fires milliseconds faster than the brake. Toggle below.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Calm recall vs. fast-impulse slip',
          visualStageHint: 'Toggle steady focus vs. excited impulse',
          visualConfig: {
            calmToggleLabel: 'Eye-Level Pause Engaged',
            stormToggleLabel: 'Excited Impulse Slip',
            calmStatus: 'WORKING MEMORY + BRAKES SYNCED',
            stormStatus: 'ACTION FIRED BEFORE BRAKE ARRIVED',
            calmReadouts: [
              {
                name: 'Prefrontal Insulation',
                value: 'Actively Building',
                tone: 'spruce',
                desc: 'Calm eye contact and having {name} echo the next 1 step locks instructions straight into working memory.',
              },
              {
                name: 'Self-Correction',
                value: 'Growing Stronger',
                tone: 'spruce',
                desc: 'Practicing “rewind & redo” wires faster stopping signals without shame.',
              },
            ],
            stormReadouts: [
              {
                name: 'Excitement Signal',
                value: 'Lightning Fast',
                tone: 'amber',
                desc: 'Seeing a basketball sparks “bounce!” before the thoughtful rule check arrives.',
              },
              {
                name: '“What were you thinking?!”',
                value: 'Triggers Freeze',
                tone: 'amber',
                desc: 'Honestly, {pronoun} WASN’T thinking yet—shameful grilling just triggers defensiveness or lying.',
              },
            ],
          },
          almanacTruth:
            'In middle childhood, “I don’t know why I did it!” is usually the honest neurological truth—the impulse fired half a second faster than the brake arrived.',
          scienceDeepDive:
            'Developmental neuroimaging (Gogtay et al., PNAS; Diamond, 2013) confirms that dorsolateral prefrontal myelination surges across middle childhood (ages 7–9), creating uneven “hot” vs. “cool” executive performance: children recite rules accurately when calm yet still slip under high excitement or multi-step overload.',
          beat3Kicker: 'Practice a calm reset',
          beat3Title: 'Replace “What were you thinking?!” with a clean Rewind',
          rehearsalTriggerSpeaker: '{Name} freezing beside a wobbled lamp holding a basketball',
          rehearsalTriggerQuote: '“Oops! I forgot—I didn’t mean to hit the lamp!”',
          rehearsalPrompt: 'Which instant reaction pushes {name} into lying or hiding next time?',
          instincts: [
            {
              id: 'interrogate',
              label: '“WHAT WERE YOU THINKING?! I JUST told you two minutes ago!”',
              whyTitle: 'Why that’s so tempting—and what it teaches',
              whyText:
                'Repetition is maddening! Yet angry grilling teaches {name} that honest mistakes bring explosions—prompting sneaky cover-ups next time.',
            },
            {
              id: 'multistep',
              label: 'Rattle off a 5-step chain of instructions from the kitchen while {pronoun} {is} distracted.',
              whyTitle: 'Why that’s so tempting—and why steps 3–5 vanish',
              whyText:
                'Elementary working memory holds 2–3 chunks max—especially across rooms!',
            },
          ],
          calmScriptPlain:
            '“Whoa, close call! Your hands bounced faster than your brain’s brakes caught up. Let’s do a quick rewind—walk the ball straight to the porch bin and check that the lamp is steady.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'cool',
              text: 'Whoa, close call! Your hands bounced faster than your brain’s brakes caught up.',
              tag: 'Zero-Shame Accountability',
              note: 'Names the impulse accurately without turning {name} into a “bad listener.”',
            },
            { text: ' ' },
            {
              id: 'rewind',
              text: 'Let’s do a quick rewind—walk the ball straight to the porch bin and check that the lamp is steady.',
              tag: 'Muscle-Memory Rewind',
              note: 'Practicing the right physical action immediately rewires the habit far better than yelling.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Walk close and make warm eye contact before giving directions',
            'Keep instructions to 1–2 concrete steps (or a 3-item checklist)',
            'Ask {name} to echo the plan in {poss} own words',
          ],
          pushbacks: [
            {
              id: 'lies',
              label: '“{Name} blurts out ‘I didn’t do it!’ even while holding the ball”',
              setup: 'Recognize a panic-shield fib and give a calm honesty bridge:',
              script:
                '“Oops, I saw the bounce—sometimes when we feel scared of trouble our mouth blurts out a fib fast. Take a breath; you’re safe to tell me the truth and fix it.”',
            },
            {
              id: 'forgets',
              label: '“{Pronoun} forgets morning steps (shoes, teeth, backpack) every single day”',
              setup: 'Move reminders out of your voice and onto a simple 4-box fridge list:',
              script:
                '“Check your morning launch list—which step is left before we head out?”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) keeps forgetting basic daily steps and acting before thinking—how do I coach better follow-through without nagging all day?”',
          beat4Kicker: 'This week’s wiring habit',
          beat4Title: 'Pick one simple executive-function boost',
          beat4Lead: 'Support the developing circuit instead of fighting it.',
          moves: [
            {
              id: 'eyelevel',
              title: 'Walk into the same room before giving an instruction this week',
              desc: 'Touch a shoulder gently, get eye contact, and give max 2 concrete steps.',
            },
            {
              id: 'rewind',
              title: 'Try a playful “Rewind & Redo” instead of lecturing once',
              desc: 'Let {name} physically practice the calm choice right away so the brain stores the right track.',
            },
            {
              id: 'echoback',
              title: 'Ask “What’s your first move?” after giving a direction',
              desc: 'Saying it aloud locks the task straight into working memory.',
            },
          ],
          closingNote:
            'Every patient rewind and eye-level check-in lays down another layer of calm insulation on {possessive} growing prefrontal brakes.',
          pocketInsight:
            'Replace “What were you thinking?!” with a calm “Rewind & Redo,” give 1–2 eye-level steps, and let checklists hold morning routines.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“Why does measuring every single glass of juice down to the millimeter STILL fail to stop ‘That’s not fair!’?”',
            title: 'Sibling “That’s Not Fair!” Fights Without Keeping Score',
            targetSlug: 'elementary-sibling-fairness-routines',
          },
          interactiveHighlights: ['Impulse Brain Bridge', 'Rewind & Redo Script'],
        },
      },
      {
        slug: 'elementary-sibling-fairness-routines',
        title: 'Sibling “That’s Not Fair!” Fights Without Keeping Score',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Fair vs. identical · Dropping the scorekeeper clipboard',
          headline: 'Sibling “That’s Not Fair!” Fights Without Keeping Score',
          deck: 'Why trying to prove everything is mathematically 50/50 fuels endless scorekeeping—and the simple “What do YOU need?” shift that calms sibling rivalry.',
          sceneTime: '5:50 PM · DINNER TABLE',
          sceneBody:
            'You pour two glasses of lemonade and hand over two plates. Instantly {name} leans in like a forensic detective: “HER glass has TWO millimeters more! And she got the front seat yesterday—THIS HOUSE IS NEVER FAIR!” *You feel exhausted trying to keep an impossible spreadsheet of equality.*',
          pollQuestion: 'Does sibling fairness accounting hijack everyday moments?',
          pollOptions: [
            {
              id: 'spreadsheet',
              label: 'Yes—everything gets measured to the millimeter!',
              response:
                'Ages 7–9 are peak fairness-radar years! Underneath “Her cup has more” is almost always one quiet question: “Am I loved just as much?”',
            },
            {
              id: 'turns',
              label: 'Car seats and turns spark the loudest battles',
              response:
                'Installing one neutral rotating calendar (“Odd days / Even days”) eliminates 90% of front-seat and first-turn fights permanently!',
            },
          ],
          beat2Kicker: 'Dismantling rivalry',
          beat2Title: 'Trade equal scorekeeping for neutral systems + unique love',
          beat2Lead:
            'Debating millimeters confirms that parental love is a finite pie to fight over. Compare scorekeeping against neutral fairness guardrails below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Debating equality vs. neutral fairness guardrails',
          visualStageHint: 'Compare scorekeeping with calm unique-needs norms',
          visualConfig: {
            willpowerLabel: 'Equality Debating',
            willpowerTitle: 'Arguing back: “It IS the exact same amount!”',
            willpowerDesc:
              'Pulling out measuring cups or tallying yesterday’s favors proves that loud complaining gets you into an endless courtroom trial.',
            willpowerOutcome: 'Sharper comparison, sibling resentment, and parent fatigue.',
            guardrailLabel: 'Neutral Systems + Needs',
            guardrailTitle: '“Fair means everyone gets what THEY need”',
            guardrailDesc:
              'Use odd/even days for recurring turns (car seat, choosing music) and respond to complaints by looking ONLY at the child in front of you.',
            guardrailOutcome: 'Fewer comparisons and deeper trust that love isn’t a zero-sum pie.',
            environmentShifts: [
              '“Odd days = Child A, Even days = Child B” settles car seats, playlist, and dish order permanently.',
              'Try “One Cuts, One Chooses” for splitting the last brownie or pizza slice—instant self-enforcing peace.',
              'Answer “She got more!” by focusing straight on {name}: “Would you like a splash more in your cup?” (zero comparison).',
            ],
          },
          almanacTruth:
            'Kids don’t actually want to be loved “equally”—they want to feel loved uniquely. Answer “Her cup is bigger!” with “Want a tiny splash more in yours?” and skip the comparison entirely.',
          scienceDeepDive:
            'Sibling rivalry research (Faber & Mazlish; Dunn & Kendrick) highlights that parental comparisons—even well-intentioned proofs of mathematical equality—heighten competitive vigilance, whereas addressing each child’s individual need independently lowers rivalry markedly.',
          beat3Kicker: 'Practice at dinner',
          beat3Title: 'Step out of the fairness courtroom in ten seconds',
          rehearsalTriggerSpeaker: '{Name} glaring at a sibling’s plate or turn',
          rehearsalTriggerQuote: '“NOT FAIR! You ALWAYS give her the bigger piece AND she got to pick the movie!”',
          rehearsalPrompt: 'Which defensive reflex keeps the rivalry burning?',
          instincts: [
            {
              id: 'audit',
              label: '“That is NOT true! Last Tuesday YOU picked the movie AND got new sneakers!”',
              whyTitle: 'Why that’s so tempting—and why it backfires',
              whyText:
                'Keeping a mental ledger teaches kids to keep an even sharper ledger of every perceived slight.',
            },
            {
              id: 'scold',
              label: '“Stop whining and be grateful! Life isn’t fair!”',
              whyTitle: 'Why that’s so tempting—and what {name} misses',
              whyText:
                'Dismissing the complaint leaves the deeper feeling—“Do I matter as much?”—completely unanswered.',
            },
          ],
          calmScriptPlain:
            '“Sounds like you’re feeling left out right now—and you want to feel sure your turn matters too. Even days are your pick, so tomorrow’s movie is 100% yours. Right now, want a little extra splash in your cup?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'decode',
              text: 'Sounds like you’re feeling left out right now—and you want to feel sure your turn matters too.',
              tag: 'Answers the Hidden Need',
              note: 'Speaks straight to the longing underneath the comparison without taking the bait.',
            },
            { text: ' ' },
            {
              id: 'neutralrule',
              text: 'Even days are your pick, so tomorrow’s movie is 100% yours. Right now, want a little extra splash in your cup?',
              tag: 'Neutral Rule + Unique Focus',
              note: 'Lets the calendar hold the turn while giving {name} warm individual care.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Never compare siblings aloud—not even positively',
            'Let “Odd/Even Calendar Days” settle daily turns',
            'Use “One Splits, One Picks” for treats',
          ],
          pushbacks: [
            {
              id: 'lovemore',
              label: '“You love my brother/sister more than me!”',
              setup: 'Meet this tender ache warmly without arguing logic—speak straight to unique love:',
              script:
                '“Ouch, it hurts when your heart feels that way. I could never love anyone else the way I love YOU—nobody else has your exact laugh and wild inventions.”',
            },
            {
              id: 'diffbed',
              label: '“Why does my older sibling get a later bedtime?!”',
              setup: 'Anchor privileges clearly to age & growing responsibilities:',
              script:
                '“Every age unlocks new things—when you hit ten you’ll get that later bedtime too, AND you’ll get the bigger laundry job that goes with it!”',
            },
          ],
          advisorPrompt:
            '“My kids fight constantly over fairness, car seats, and who goes first—help me set up two simple neutral house rules tonight.”',
          beat4Kicker: 'This week’s peace guardrail',
          beat4Title: 'Pick one scorekeeping-killer to install',
          beat4Lead: 'Retire from refereeing millimeters for good.',
          moves: [
            {
              id: 'oddeven',
              title: 'Launch the “Odd Day / Even Day” house turn rule today',
              desc: 'One glance at the date settles front seat, playlist, and first dibs with zero arguments.',
            },
            {
              id: 'cutchoose',
              title: 'Use “One Cuts, One Chooses” next time snacks are split',
              desc: 'Watch two siblings instantly slice a brownie with laser precision and zero complaints!',
            },
            {
              id: 'uniquelove',
              title: 'Tell {name} one specific thing you love uniquely about {obj} tonight',
              desc: 'Feeling uniquely seen dissolves the urge to police a sibling’s plate.',
            },
          ],
          closingNote:
            'When you stop trying to divide everything into identical halves and start honoring each child’s unique place in your heart, the rivalry scoreboard quietly gathers dust.',
          pocketInsight:
            'Use neutral turn systems (Odd/Even calendar days, One-Cuts-One-Chooses) and answer “Not fair!” by speaking solely to {possessive} unique need.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery: '“When grounding and lectures only spark resentment, what actually teaches an 8-year-old accountability?”',
            title: 'Natural Repair After Mistakes (Instead of Grounding & Lectures)',
            targetSlug: 'elementary-restorative-justice-repair',
          },
          interactiveHighlights: ['Fairness Guardrail Flip', 'Zero-Scorekeeping Script'],
        },
      },
      {
        slug: 'elementary-restorative-justice-repair',
        title: 'Natural Repair After Mistakes (Instead of Grounding & Lectures)',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'True accountability · Fixing harm instead of stewing',
          headline: 'Natural Repair After Mistakes (Instead of Grounding & Lectures)',
          deck: 'Why taking away screens for a month makes kids focus on being mad at YOU—and how logical repair teaches honest ownership and character.',
          sceneTime: '6:40 PM · HALLWAY WALL',
          sceneBody:
            'In a burst of frustration, {name} kicked a hole in a sibling’s cardboard fort—or drew with permanent marker on the hallway paint. *Your stomach flips: you want accountability that actually sticks, not an angry standoff where nobody learns a thing.*',
          pollQuestion: 'Do big punishments (like week-long grounding) actually change behavior next time?',
          pollOptions: [
            {
              id: 'resent',
              label: 'Honestly no—they just get mad at me instead',
              response:
                'Spot on! Unrelated punishments pull a child’s entire focus onto “Mom is so mean!”—while logical, respectful repair keeps focus right on fixing the actual mess.',
            },
            {
              id: 'unsure',
              label: 'I want firm accountability without yelling or shaming',
              response:
                'Restorative repair is BOTH warmer AND firmer than grounding—because taking real action to make things right takes true courage!',
            },
          ],
          beat2Kicker: 'Growing real character',
          beat2Title: 'The 3-step repair loop builds honesty instead of hiding',
          beat2Lead:
            'Punishment asks “How do I make you pay?” Repair asks “What got hurt, how can you help fix it, and what’s the plan next time?” Tap the 3 beats below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-step elementary repair loop',
          visualStageHint: 'Tap each step to coach real accountability',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Cool down first',
                label: 'Wait for Calm',
                quote: '“We’re both too heated to fix this well right now—let’s take 15 minutes.”',
                desc: 'Skip the instant angry sentence; wait until both heart rates return to baseline.',
                brainNote: 'Accountability requires an online prefrontal cortex—shame shuts it down.',
              },
              {
                stepNum: '02',
                actor: 'Name the impact',
                label: 'Own the Harm',
                quote: '“The marker went on the wall—now we need a plan to make it right.”',
                desc: 'Keep your tone matter-of-fact and free of sarcasm or “I told you so.”',
                brainNote: 'Separates “I made a mistake” (fixable) from “I am a bad kid” (shame).',
              },
              {
                stepNum: '03',
                actor: 'Take real action',
                label: 'Make It Right',
                quote: 'Scrub the wall together, rebuild the fort, or earn back the broken part',
                desc: 'Follow through calmly on a logical action directly connected to the harm—then close the book with zero grudge.',
                brainNote: 'Wires genuine integrity and confidence that mistakes can be repaired.',
              },
            ],
          },
          almanacTruth:
            'Logical repair (“You broke the fort, so let’s grab tape and help rebuild it”) builds ten times more real responsibility than grounding a child in their room to stew.',
          scienceDeepDive:
            'Restorative discipline research in elementary settings shows that related, respectful repair actions strengthen internal moral reasoning and honesty, whereas harsh unrelated punishments increase concealment, externalized blame, and parent-child distance.',
          beat3Kicker: 'Practice after a real mistake',
          beat3Title: 'Hold firm, warm repair without lecturing or shaming',
          rehearsalTriggerSpeaker: '{Name} staring at permanent marker streaks on the hallway wall',
          rehearsalTriggerQuote: '“I didn’t mean for it to stay! Please don’t ground me from soccer!”',
          rehearsalPrompt: 'Which heated consequence misses the real lesson?',
          instincts: [
            {
              id: 'ground',
              label: '“No screens AND no soccer all weekend! Go to your room right now!”',
              whyTitle: 'Why that’s so tempting—and what gets lost',
              whyText:
                'Big consequences feel decisive in the heat of anger—yet canceling healthy team sports teaches nothing about caring for shared walls.',
            },
            {
              id: 'fixfor',
              label: 'Sigh, scrub the wall yourself silently while muttering under your breath.',
              whyTitle: 'Why that’s so tempting—and why it backfires',
              whyText:
                'Rescuing {obj} from cleanup deprives {name} of the proud feeling of actually repairing {poss} own mistake.',
            },
          ],
          calmScriptPlain:
            '“Oof, marker on the painted wall is a real mess—and I’m glad you didn’t hide it. You’re not grounded from soccer; right now your job is grabbing the magic sponge with me so we get this wall clean together.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'honest',
              text: 'Oof, marker on the painted wall is a real mess—and I’m glad you didn’t hide it.',
              tag: 'Rewards Honesty',
              note: 'Keeps truth-telling safe while still naming the real impact plainly.',
            },
            { text: ' ' },
            {
              id: 'related',
              text: 'You’re not grounded from soccer; right now your job is grabbing the magic sponge with me so we get this wall clean together.',
              tag: 'Firm Related Repair',
              note: 'Directly links the action to making the home whole again—zero grudge afterward.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Keep consequences related, respectful, and reasonable',
            'Work alongside {name} on hard cleanups with neutral warmth',
            'Once repaired, never bring it back up as ammunition',
          ],
          pushbacks: [
            {
              id: 'refusefix',
              label: '“{Name} crosses {poss} arms: ‘I’m NOT helping clean it!’”',
              setup: 'Hold a calm “When / Then” boundary without getting hooked into shouting:',
              script:
                '“No rush—you can take five minutes to cool off. Screens and play stay paused until we get our hallway wall clean together.”',
            },
            {
              id: 'parentyell',
              label: '“What if *I* already yelled and handed out a giant punishment?”',
              setup: 'Model repair yourself—watching a parent repair calmly is the single strongest lesson on Earth:',
              script:
                '“Hey, I lost my temper earlier and grounded you for a month out of anger. I’m sorry I yelled—the boundary still stands, so let’s trade that for a real plan to fix what broke.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) broke a house rule today and I want a related, respectful repair instead of grounding—what fits this situation?”',
          beat4Kicker: 'Next time a mistake happens',
          beat4Title: 'Pick one restorative habit to keep handy',
          beat4Lead: 'Mistakes are not detours from character—they are the main road.',
          moves: [
            {
              id: 'wait15',
              title: 'Wait 15 minutes before deciding any consequence this week',
              desc: 'Say calmly: “I’m too frustrated to decide fairly right now—we’ll figure out how to fix it after dinner.”',
            },
            {
              id: 'threeqs',
              title: 'Use the 3 Repair Questions once: “What happened? Who was affected? How can we make it right?”',
              desc: 'Hand {name} the dignity of helping design the repair.',
            },
            {
              id: 'modelrepair',
              title: 'Model one clean parental apology if you snap this week',
              desc: 'Zero guilt spiral—just “I got sharp earlier; I’m sorry. Let’s try that again.”',
            },
          ],
          closingNote:
            'Kids who learn to face mistakes honestly, scrub the wall, and rebuild what broke grow into adults you can trust when nobody is watching.',
          pocketInsight:
            'Wait until calm, name the impact cleanly, and assign a related repair action instead of unrelated grounding—then release the grudge completely.',
          nextEpisodeHook: null,
          interactiveHighlights: ['3-Step Repair Loop', 'Parent-Apology Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 22: 10-Hour Sleep, Growing Pains & Stress Signals (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'health-elementary-wellness',
    category: AcademyCategory.HEALTH_AND_WELLNESS,
    developmentalTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    title: '10-Hour Sleep, Growing Pains & Stress Signals',
    reliefSubtitle:
      'Protect the 10-hour school-night sleep bank, ease evening growing pains with daily outdoor light, and decode school-morning tummy aches calmly',
    tonightQuickWinTitle: 'Episode 1: Reclaiming the 10-Hour School-Night Sleep Bank',
    summary:
      'Anchor the 9–11 hour sleep bank elementary brains need for mood and learning, pair cozy comfort for evening limb aches with 60 minutes of daily outdoor play, and respond warmly when anxiety shows up in the body.',
    coverImageUrl: 'https://assets.alongside.care/academy/health-elementary.png',
    sortOrder: 5,
    episodes: [
      {
        slug: 'elementary-ten-hour-sleep-bank',
        title: 'Reclaiming the 10-Hour School-Night Sleep Bank',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: '8:15 PM · Guarding the 10-hour elementary sleep bank',
          headline: 'Reclaiming the 10-Hour School-Night Sleep Bank',
          deck: 'Why even 35 minutes of missing sleep shows up as hyperactivity, tears, or math meltdowns in ages 7–9—and how working backward from wake-up fixes bedtimes effortlessly.',
          sceneTime: '8:45 PM · SCHOOL NIGHT',
          sceneBody:
            'Between soccer practice, dinner, and homework, bedtime quietly drifted from 8:15 PM to 9:15 PM. Now mornings are a battle to wake {name} up, and {poss} teacher mentions fidgeting and quick tears by afternoon. *Wait—could thirty extra minutes of sleep really change the whole week?*',
          pollQuestion: 'How close does {name} get to 10 full hours on school nights?',
          pollOptions: [
            {
              id: 'short',
              label: 'Closer to 8.5–9 hours—evenings run late!',
              response:
                'Super common once sports and homework stack up! Even reclaiming 30 minutes of earlier lights-out produces noticeable mood and focus gains inside one week.',
            },
            {
              id: 'wired',
              label: 'In bed on time, yet lies awake chatting or reading late',
              response:
                'Dimming lamps and parking bright screens 60 minutes before bed helps elementary melatonin rise right on schedule.',
            },
          ],
          beat2Kicker: 'Inside {possessive} sleep clock',
          beat2Title: 'Count backward 10.5 hours from wake-up to find the sweet spot',
          beat2Lead:
            'Elementary brains consolidate reading, math facts, and emotional resilience during deep overnight sleep—and tired 8-year-olds look hyper, not sleepy! Tap each anchor below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'The 10-hour school-night sleep clock',
          visualStageHint: 'Tap each anchor from 6:45 AM wake to 8:15 PM lights-out',
          visualConfig: {
            stages: [
              {
                time: '6:45 AM',
                label: 'Natural Wake',
                level: 20,
                title: 'Waking without a battle is your sleep report card',
                desc: 'If {name} wakes smoothly on most mornings, {poss} overnight sleep bank is right on target.',
                tip: 'Open blinds immediately for bright morning daylight.',
              },
              {
                time: '4:30 PM',
                label: 'Outdoor Play',
                level: 50,
                title: 'Active afternoon daylight builds real sleep drive',
                desc: 'Running outside clears stress energy and anchors evening melatonin timing.',
                tip: 'Skip late-day sodas or chocolate milk after 3 PM.',
              },
              {
                time: '7:30 PM',
                label: 'Screens Off',
                level: 78,
                title: 'Dim house lights & park all glowing screens',
                desc: 'Warm lamps, cozy shower, and chapter-book reading cue the brain smoothly toward rest.',
                tip: 'Keep bedtime reading light and joyful—never a phonics drill.',
              },
              {
                time: '8:15 PM',
                label: '10.5h Bank',
                level: 95,
                title: 'Lights-out anchored backwards from wake time',
                desc: '6:45 AM minus 10.5 hours lands cleanly at 8:15 PM—protecting growth hormone and emotional calm.',
                tip: 'Shift bedtime earlier by just 15 minutes every 3 nights.',
              },
            ],
          },
          almanacTruth:
            'Tired 8-year-olds rarely yawn—they bounce off walls, argue over homework, and cry over tiny things. Protecting 10 hours of sleep is the highest-leverage mood upgrade in elementary school.',
          scienceDeepDive:
            'The American Academy of Sleep Medicine recommends 9–12 hours nightly for children ages 6–12. Experimental sleep-restriction studies (Gruber et al., Pediatrics) found that adding just 27–30 minutes of sleep per night measurably improved classroom attention and emotional lability within five school days.',
          beat3Kicker: 'Practice shifting bedtime earlier',
          beat3Title: 'Move lights-out earlier without a “My friends stay up till 10!” fight',
          rehearsalTriggerSpeaker: '{Name} protesting at 7:45 PM',
          rehearsalTriggerQuote: '“NOBODY in third grade goes to bed at 8:15! I’m NOT even sleepy!”',
          rehearsalPrompt: 'Which comeback invites an instant debate?',
          instincts: [
            {
              id: 'compare',
              label: '“I don’t care what your friends do—you’re grumpy every morning so go to bed!”',
              whyTitle: 'Why that’s so tempting—and why kids dig in',
              whyText:
                'Pointing out morning grumpiness feels accurate, yet triggers defensiveness—while framing sleep as athletic & brain superpower inspires pride!',
            },
            {
              id: 'skipwind',
              label: 'Let {obj} watch one more episode at 8:00 PM “just tonight.”',
              whyTitle: 'Why that’s so tempting—and why melatonin stalls',
              whyText:
                'Late bright light pushes sleepiness back 45 minutes—making 8:45 PM harder than 8:15 PM.',
            },
          ],
          calmScriptPlain:
            '“Wild how every family runs a different clock! In our house, sleep is our secret brain-and-sports fuel—how about lights-out at 8:15, and if you’re in bed by 7:50 you get 25 bonus minutes of reading with your book light?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'reframe',
              text: 'In our house, sleep is our secret brain-and-sports fuel',
              tag: 'Strength Frame',
              note: 'Connects sleep to growing stronger, faster, and sharper—things 7–9-year-olds actually care about.',
            },
            { text: '—' },
            {
              id: 'perk',
              text: 'how about lights-out at 8:15, and if you’re in bed by 7:50 you get 25 bonus minutes of reading with your book light?',
              tag: 'Big-Kid Ownership',
              note: 'Makes getting into bed early feel like earning a cool privilege instead of a punishment.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Shift bedtime gradually (15 min earlier every 3 nights)',
            'Offer a cozy clip-on warm amber book light',
            'Keep bedrooms 100% screen-free',
          ],
          pushbacks: [
            {
              id: 'latesports',
              label: '“Soccer practice doesn’t even end until 7:30 PM twice a week!”',
              setup: 'Streamline dinner and shower cleanly on practice nights, and guard early lights-out the other five nights:',
              script:
                '“On practice nights we do quick dinner, quick rinse, and straight into cozy pjs—then protect our 8:15 bank every non-practice night.”',
            },
            {
              id: 'cantfall',
              label: '“{Name} lies awake tossing for 45 minutes”',
              setup: 'Pair a calm body-scan or quiet audiobook so {poss} brain stops spinning:',
              script:
                '“Trying hard to fall asleep makes brains wake up! Listen to a calm chapter audiobook with lights low and let sleep sneak up on you.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) wakes at 6:45 AM and has evening activities—help me build a realistic 10-hour school-night schedule.”',
          beat4Kicker: 'This week’s sleep experiment',
          beat4Title: 'Pick one easy move to protect the sleep bank',
          beat4Lead: 'Even 20 extra minutes a night adds up to over 2 hours a week.',
          moves: [
            {
              id: 'shift15',
              title: 'Nudge bedtime 15 minutes earlier starting tonight',
              desc: 'Keep it breezy by pairing it with cozy reading or an audiobook.',
            },
            {
              id: 'screen60',
              title: 'Set a gentle 7:15 PM “All Screens Docked” alarm',
              desc: 'Let a calm chime—not your voice—signal evening wind-down.',
            },
            {
              id: 'booklight',
              title: 'Gift {name} a warm amber clip-on reading light',
              desc: 'Kids hop into bed 15 minutes faster when cozy reading feels like a big-kid perk.',
            },
          ],
          closingNote:
            'You’ll be amazed how many “behavior issues” quietly melt away the very week {possessive} 10-hour sleep bank gets back in the green.',
          pocketInsight:
            'Count backward 10–10.5 hours from school wake time, dock screens 60 minutes early, and make early bed feel like a perk with warm reading light.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“What actually causes evening leg aches—and why do eye doctors prescribe 60 minutes of outdoor light?”',
            title: 'Evening “Growing Pains” & 60 Minutes of Daily Outdoor Light',
            targetSlug: 'elementary-growth-plates-and-growing-pains',
          },
          interactiveHighlights: ['10-Hour Sleep Curve', 'Book-Light Perk Script'],
        },
      },
      {
        slug: 'elementary-growth-plates-and-growing-pains',
        title: 'Evening “Growing Pains” & 60 Minutes of Daily Outdoor Light',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Daylight play + warm calf rub · Growing bodies',
          headline: 'Evening “Growing Pains” & 60 Minutes of Daily Outdoor Light',
          deck: 'Why evening calf and shin aches often follow big active play days—plus why an hour outdoors every day is nature’s strongest protection for growing eyes and moods.',
          sceneTime: '8:25 PM · BEDROOM',
          sceneBody:
            '{Name} ran nonstop at recess and soccer today. Now right as lights go out, {pronoun} calls out rubbing both shins: “My legs ache SO bad!” *Meanwhile, you’ve also noticed {obj} sitting indoors glued to close-up books and screens all afternoon—how do you support {poss} fast-growing body calmly?*',
          pollQuestion: 'Have late-evening leg aches ever popped up right at bedtime?',
          pollOptions: [
            {
              id: 'yes',
              label: 'Yes—fine all day, then aching right at lights-out!',
              response:
                'That exact pattern—both legs aching in the evening after active days and feeling 100% fine by morning—is classic benign childhood leg aches! A warm pack and gentle massage soothe them fast (and always check in with your pediatrician if pain is ever one-sided, swollen, or persists in the morning).',
            },
            {
              id: 'outdoor',
              label: 'More worried about getting {obj} moving outdoors daily',
              response:
                'Even breaking 60 minutes into two breezy outdoor bursts protects eyesight, sleep, and mood dramatically.',
            },
          ],
          beat2Kicker: 'Supporting fast-growing elementary bodies',
          beat2Title: 'Four simple daily habits for growing legs, eyes, and energy',
          beat2Lead:
            'Elementary bodies grow in lively spurts—pairing daily outdoor daylight with simple evening comfort keeps kids strong and rested. Tap the 4 habits below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: '4 habits for strong eyes, muscles & evening comfort',
          visualStageHint: 'Tap each anchor from outdoor light to cozy evening care',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Daylight',
                label: '60-Min Outdoors',
                title: 'Natural outdoor light protects growing eyes',
                desc: 'Bright outdoor daylight and looking far across a yard or park stimulate retinal dopamine—helping prevent early nearsightedness.',
                why: 'Distance gazing outdoors gives close-up school eyes essential rest.',
              },
              {
                timeOrCue: 'Movement',
                label: 'Active Play',
                title: 'Running, biking & climbing build lifelong bone strength',
                desc: 'Doesn’t require organized leagues—scooters, backyard tag, or walking the dog all count!',
                why: 'Joyful shared movement sticks far longer than “go exercise!” commands.',
              },
              {
                timeOrCue: 'Evening',
                label: 'Warm Rub',
                title: 'Warm rice sock + gentle calf massage for tired legs',
                desc: 'Slow warm stretches and a cozy heating pack soothe evening muscle fatigue cleanly without dismissing {poss} discomfort.',
                why: 'Reassuring touch calms sore muscles and anxious bedtime thoughts together.',
              },
              {
                timeOrCue: 'Partnering',
                label: 'Check With Doctor',
                title: 'Always ask your pediatrician if pain looks unusual',
                desc: 'Any limping, joint swelling, redness, fever, or pain that stays in the morning deserves a prompt visit with your pediatric clinic.',
                why: 'Simple clarity keeps home comfort safely non-clinical.',
              },
            ],
          },
          almanacTruth:
            'Evening leg aches after big play days are real—not faking to stay up late—and pairing a 3-minute warm calf massage with daily outdoor daylight protects both growing muscles and eyes.',
          scienceDeepDive:
            'Randomized school trials (He et al., JAMA) confirmed that adding 40–60 minutes of daily outdoor daylight significantly lowers childhood myopia incidence. Pediatric consensus notes typical benign nocturnal limb pains occur bilaterally in the evening after active days and resolve by morning; persistent, unilateral, or joint-localized pain should be assessed by a pediatrician.',
          beat3Kicker: 'Practice at bedtime & after school',
          beat3Title: 'Soothe evening leg aches without feeling stalled',
          rehearsalTriggerSpeaker: '{Name} rubbing both calves at 8:20 PM',
          rehearsalTriggerQuote: '“Mom, my legs are throbbing! I can’t fall asleep!”',
          rehearsalPrompt: 'Which tired bedtime response accidentally makes kids feel unheard?',
          instincts: [
            {
              id: 'dismiss',
              label: '“You’re just making that up to stay awake! You ran fine at soccer!”',
              whyTitle: 'Why that’s so tempting—and why kids cry harder',
              whyText:
                'It’s wild how aches show up right at lights-out! Yet benign evening leg fatigue genuinely hurts once muscles stop moving—believing {obj} takes 3 minutes and calms everything fast.',
            },
            {
              id: 'push',
              label: 'Bark “Go play outside right now, you’re being lazy!” on sluggish weekends.',
              whyTitle: 'Why that’s so tempting—and what gets kids outdoors joyfully',
              whyText:
                'Inviting {obj} on a shared mission—kicking a ball, scouting cool bugs, or riding bikes together—works ten times better than scolding.',
            },
          ],
          calmScriptPlain:
            '“Your legs worked SO hard running and growing today—no wonder they feel achy now! Let’s warm up the cozy rice sock and do a slow two-minute calf stretch so your muscles can melt into sleep.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'believe',
              text: 'Your legs worked SO hard running and growing today—no wonder they feel achy now!',
              tag: 'Validates Body Signals',
              note: 'Reassures {name} immediately that you believe {poss} body and nothing scary is happening.',
            },
            { text: ' ' },
            {
              id: 'soothe',
              text: 'Let’s warm up the cozy rice sock and do a slow two-minute calf stretch so your muscles can melt into sleep.',
              tag: 'Warm Brief Comfort',
              note: 'Offers physical relief cleanly while keeping bedtime lights low and calm.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Keep lights dim during warm calf rubs',
            'Encourage water + light calf stretch after big sports days',
            'Call your pediatrician for any swelling, limping, or daytime pain',
          ],
          pushbacks: [
            {
              id: 'wontgoout',
              label: '“{Name} resists going outdoors after school”',
              setup: 'Make outdoor time social and low-pressure—even 15 minutes with you breaks inertia:',
              script:
                '“I need fresh air too—come shoot ten hoops or walk around the block with me while I stretch my legs!”',
            },
            {
              id: 'medicineq',
              label: '“Should I give anything for evening leg aches?”',
              setup: 'Warmth and gentle massage often do the trick; always follow your own pediatrician for any medication or dosing guidance:',
              script:
                '“Warmth, cozy stretches, and reassurance settle most tired-leg nights—and if aches keep waking {name} often, we’ll check right in with our pediatrician.”',
            },
          ],
          advisorPrompt:
            '“Give me 5 easy after-school outdoor movement ideas that even a reluctant {ageShort} actually gets excited about.”',
          beat4Kicker: 'This week’s body-care habit',
          beat4Title: 'Pick one simple comfort or daylight move',
          beat4Lead: 'Small daily habits protect growing eyes, muscles, and sleep all at once.',
          moves: [
            {
              id: 'ricesock',
              title: 'Keep a microwaveable warm rice sock or gentle lotion by the bedroom',
              desc: 'Makes soothing occasional evening leg aches effortless in two minutes.',
            },
            {
              id: 'walk15',
              title: 'Take a 15-minute family daylight walk after school or dinner',
              desc: 'Natural sunlight + distance gazing refreshes tired eyes and sparks great conversation.',
            },
            {
              id: 'stretch2',
              title: 'Add two fun 30-second calf stretches after soccer or big play days',
              desc: 'Wall push-ups and toe-reaches ease evening muscle tightness proactively.',
            },
          ],
          closingNote:
            'Listening calmly to {possessive} growing body—whether it’s tired evening legs or eyes craving afternoon sky—teaches {name} to care for {poss} health with ease.',
          pocketInsight:
            'Soothe evening leg aches with warmth, gentle calf massage, and pediatrician check-ins if ever unusual—and anchor 60 minutes of daily outdoor daylight for growing eyes.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“Why do worried 8-year-olds feel real stomachaches and headaches right before school?”',
            title: 'When Worry Shows Up as Headaches & Tummy Aches Before School',
            targetSlug: 'elementary-somatic-stress-signals',
          },
          interactiveHighlights: ['4-Habit Growth Map', 'Cozy Leg-Ache Script'],
        },
      },
      {
        slug: 'elementary-somatic-stress-signals',
        title: 'When Worry Shows Up as Headaches & Tummy Aches Before School',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.heart_bridge,
          illustrationCaption: 'Gut-brain link · Decoding real worry butterflies',
          headline: 'When Worry Shows Up as Headaches & Tummy Aches Before School',
          deck: 'Why Sunday-night or 7:45 AM tummy aches are real nervous-system signals—not “faking”—and how to calm {possessive} body while still keeping brave school momentum.',
          sceneTime: '7:45 AM · MONDAY MORNING',
          sceneBody:
            'No fever, normal appetite ten minutes ago—yet the moment shoes come out on Monday morning, {name} clutches {poss} stomach softly: “My tummy hurts so bad… I think I need to stay home.” *You’re torn between fearing you’ll miss a real bug and suspecting math-test butterflies.*',
          pollQuestion: 'Do mystery tummy aches or headaches show up mainly on school mornings?',
          pollOptions: [
            {
              id: 'mondays',
              label: 'Yes—almost always Sunday night or school mornings',
              response:
                'You’re seeing the real gut-brain connection in action! Once your pediatrician rules out medical causes, calm body-reset tools help kids walk through butterflies bravely.',
            },
            {
              id: 'unsure',
              label: 'Hard to tell when to push through vs. stay home',
              response:
                'Validating the real sensation first—never saying “You’re faking!”—while gently exploring what’s happening at school unlocks the truth surprisingly fast.',
            },
          ],
          beat2Kicker: 'Inside the gut-brain bridge',
          beat2Title: 'Stress signals feel 100% physical inside an 8-year-old belly',
          beat2Lead:
            'When a child worries about a spelling quiz or cafeteria seating, stress hormones shift blood flow away from digestion—creating very real cramps or tight temples. Toggle both states below.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Worry-tight belly vs. calm vagal reset',
          visualStageHint: 'Toggle stress alarm vs. calm belly breathing',
          visualConfig: {
            calmToggleLabel: 'Belly Breath Reset',
            stormToggleLabel: 'School-Morning Alarm',
            calmStatus: 'REST-AND-DIGEST SIGNAL ONLINE',
            stormStatus: 'STRESS BUTTERFLIES · REAL SENSATION',
            calmReadouts: [
              {
                name: 'Belly & Jaw Tension',
                value: 'Softening',
                tone: 'spruce',
                desc: 'Slow belly exhales signal the vagus nerve that the classroom isn’t a saber-toothed tiger.',
              },
              {
                name: 'Brave Step Confidence',
                value: 'Ready to Try',
                tone: 'spruce',
                desc: 'Feeling believed + having a tiny pocket coping plan builds lasting courage.',
              },
            ],
            stormReadouts: [
              {
                name: 'Gut-Brain Nerve',
                value: 'Knotted Tight',
                tone: 'amber',
                desc: 'Worry physically tightens stomach muscles—saying “You’re faking” only makes the knot tighter.',
              },
              {
                name: 'Avoidance Urge',
                value: 'Stay Home!',
                tone: 'amber',
                desc: 'Skipping school brings instant relief, yet makes tomorrow’s butterflies twice as loud.',
              },
            ],
          },
          almanacTruth:
            'A worry tummy ache is NOT faking—it is a real physical echo of stress. Validate the feeling warmly, rule out illness with your pediatrician when unsure, and coach brave body resets instead of avoidance.',
          scienceDeepDive:
            'Pediatric gastroenterology and anxiety research confirms that enteric nervous system reactivity makes functional abdominal discomfort one of the most common early manifestations of childhood stress in ages 7–9. Always partner with your pediatrician to evaluate recurring pain before attributing it solely to stress.',
          beat3Kicker: 'Practice at 7:45 AM',
          beat3Title: 'Believe the belly ache AND coach brave forward motion',
          rehearsalTriggerSpeaker: '{Name} curled on the couch holding {poss} stomach before bus time',
          rehearsalTriggerQuote: '“My stomach feels really tight… can I please just stay home today?”',
          rehearsalPrompt: 'Which common response accidentally keeps anxiety growing?',
          instincts: [
            {
              id: 'accuse',
              label: '“There’s nothing wrong with you! Stop making excuses and put your shoes on!”',
              whyTitle: 'Why that’s so tempting—and why kids feel trapped',
              whyText:
                'Accusing {obj} of faking teaches {name} to hide big worries—or feel panicked that nobody believes {poss} body.',
            },
            {
              id: 'keephome',
              label: 'Immediately let {obj} stay home on the couch with screens whenever butterflies hit.',
              whyTitle: 'Why that’s so tempting—and why Tuesday gets harder',
              whyText:
                'When staying home becomes the regular escape hatch for non-illness worry, school fear grows stronger every week.',
            },
          ],
          calmScriptPlain:
            '“I believe your tummy feels tight right now—sometimes our stomachs carry big butterflies when something at school feels tricky. Let’s take five slow balloon breaths together, check in with your body, and make a tiny brave plan for morning drop-off.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'believe',
              text: 'I believe your tummy feels tight right now—sometimes our stomachs carry big butterflies when something at school feels tricky.',
              tag: 'Believes & Normalizes',
              note: 'Instantly melts shame and opens the door for {name} to share what’s weighing on {poss} mind.',
            },
            { text: ' ' },
            {
              id: 'brave',
              text: 'Let’s take five slow balloon breaths together, check in with your body, and make a tiny brave plan for morning drop-off.',
              tag: 'Body Reset + Courage',
              note: 'Teaches {name} {pronoun} can carry mild butterflies AND still walk into a great day.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Always consult your pediatrician for recurring or red-flag pain',
            'Keep voice warm and unhurried—don’t panic over the clock',
            'Later that evening, gently ask what felt hardest at school',
          ],
          pushbacks: [
            {
              id: 'whatifreal',
              label: '“How do I know if it’s worry vs. actually getting sick?”',
              setup: 'Check simple objective cues calmly (fever, vomiting, diarrhea, low energy)—and call your pediatrician whenever unsure:',
              script:
                '“No fever or sick signs means we can safely try going in—and if you truly feel unwell at school, the nurse knows how to reach me right away.”',
            },
            {
              id: 'wontsay',
              label: '“{Name} insists nothing is wrong at school”',
              setup: 'Kids ages 7–9 often can’t pinpoint stress in the morning rush—try gentle detective chat at bedtime:',
              script:
                '“If your tummy could talk this morning, what part of the school day would it have been most nervous about—math, lunch, or recess?”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) gets frequent Monday morning stomachaches right before school—how can I support brave drop-offs calmly?”',
          beat4Kicker: 'This week’s calm reset',
          beat4Title: 'Pick one gut-brain tool to practice in daylight',
          beat4Lead: 'Teaching kids to decode body butterflies is a lifelong mental-health superpower.',
          moves: [
            {
              id: 'balloon',
              title: 'Practice 5 “Hand-on-Belly Balloon Breaths” tonight before sleep',
              desc: 'Rest a warm hand on the belly and inflate slowly for 4, exhale softly for 6—practice when calm so it works at 7:45 AM.',
            },
            {
              id: 'sundayprep',
              title: 'Add a cozy 5-minute Sunday evening “Week Preview”',
              desc: 'Lay out Monday’s outfit, pack the bag, and ask “Anything feel bumpy about tomorrow?” so surprises don’t ambush morning.',
            },
            {
              id: 'pedcheck',
              title: 'Mention recurring school-day aches at your next pediatric checkup',
              desc: 'Ruling out physical causes gives both you and {name} total peace of mind.',
            },
          ],
          closingNote:
            'When {name} learns that tight bellies aren’t emergencies—just messages {pronoun} can breathe through and share with you—you build deep emotional steadiness for life.',
          pocketInsight:
            'Never accuse {name} of faking school-morning aches: believe the sensation, partner with your pediatrician if recurring, reset with balloon breaths, and support brave attendance.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Gut-Brain Bridge Toggle', 'Brave Morning Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 23: School-Day Focus Fuel & Balanced Lunchboxes (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'nutrition-elementary-fuel',
    category: AcademyCategory.NUTRITION_AND_FEEDING,
    developmentalTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    title: 'School-Day Focus Fuel & Balanced Lunchboxes',
    reliefSubtitle:
      'Stop 10 AM sugar-crash fidgeting with fast protein mornings, co-design a 3-color lunchbox that comes home empty, and raise a kid who stays calm around treats',
    tonightQuickWinTitle: 'Episode 1: The Protein Morning Launch That Stops the 10 AM Focus Crash',
    summary:
      'Replace spiky sugary breakfasts with 3-minute steady-energy pairings, partner with your elementary child on a 3-color lunchbox they genuinely enjoy, and nurture a calm, guilt-free attitude around party cake and treats.',
    coverImageUrl: 'https://assets.alongside.care/academy/nutrition-elementary.png',
    sortOrder: 5,
    episodes: [
      {
        slug: 'elementary-morning-protein-focus',
        title: 'The Protein Morning Launch That Stops the 10 AM Focus Crash',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: '7:30 AM · Steady brain fuel for math class',
          headline: 'The Protein Morning Launch That Stops the 10 AM Focus Crash',
          deck: 'Why a sugary cereal or pastry breakfast spikes energy for 45 minutes—then drops focus and patience straight through the floor right during morning reading.',
          sceneTime: '7:35 AM · RUSHED SCHOOL MORNING',
          sceneBody:
            'You have seven minutes before the bus, so {name} inhales a bowl of sweet cereal or a toaster pastry and races out the door. By 10:15 AM, {poss} teacher notices restless tapping, daydreaming, and quick tears over a spelling mistake. *Wait—how much does breakfast really shape classroom focus?*',
          pollQuestion: 'How rushed are weekday breakfasts in your house?',
          pollOptions: [
            {
              id: 'rushed',
              label: 'Super rushed—we need 2-minute grab-and-go options!',
              response:
                'Zero need to flip gourmet omelets at 7 AM! Adding ONE fast protein or healthy fat beside a favorite carb (like peanut butter on toast or Greek yogurt + berries) flattens the entire morning crash.',
            },
            {
              id: 'notH',
              label: '{Name} barely feels hungry right after waking up',
              response:
                'Totally common! A tiny smooth protein drink or half a cheese roll-up before school + a solid mid-morning snack works wonders.',
            },
          ],
          beat2Kicker: 'Inside blood sugar & focus',
          beat2Title: 'Watch how protein + fiber turn a rollercoaster into steady focus',
          beat2Lead:
            'Refined morning carbs digest in a flash, triggering a sharp insulin dip right when classroom concentration peaks—often mimicking distractibility or crankiness. Tap the morning curve below.',
          visualType: AlmanacVisualType.CIRCADIAN_CURVE,
          visualStageTitle: 'The 7:30 AM to noon focus-fuel curve',
          visualStageHint: 'Tap each hour to see steady fuel vs. sugar dip',
          visualConfig: {
            stages: [
              {
                time: '7:30 AM',
                label: 'Pair Protein',
                title: 'Anchor fast carbs with protein or healthy fat',
                desc: 'Eggs, Greek yogurt, nut/seed butter, cheese, or smoothie protein slow digestion smoothly.',
                tip: 'Even keeping favorite cereal works—just add milk + a boiled egg or spoon of peanut butter!',
              },
              {
                time: '9:30 AM',
                label: 'Steady Brain',
                title: 'Even glucose fuels working memory & calm patience',
                desc: 'Instead of jittery restlessness, {possessive} prefrontal cortex gets steady slow-release energy.',
                tip: 'Send a refillable water bottle—even mild dehydration drains focus.',
              },
              {
                time: '10:30 AM',
                label: 'No Crash',
                title: 'Avoids the classic 10:30 AM “hangry wall”',
                desc: 'While solo-sugar breakfasts trigger adrenaline and irritability here, paired breakfasts cruise cleanly to lunch.',
                tip: 'Pack a simple cheese-and-apple snack if lunch is after 12:15 PM.',
              },
              {
                time: '12:15 PM',
                label: 'Happy Appetite',
                title: 'Arrives at lunch calmly hungry—not desperate',
                desc: 'Steady morning energy keeps afternoon play and homework dramatically smoother.',
                tip: 'Prep two grab-and-go breakfast options on Sunday night.',
              },
            ],
          },
          almanacTruth:
            'You never have to ban waffles or toast—simply pairing any quick morning carb with one easy protein (peanut butter, yogurt, cheese, or egg) keeps {possessive} focus steady straight through math class.',
          scienceDeepDive:
            'Controlled pediatric nutrition studies (Ingwersen et al., Appetite; Benton & Jarvis) found that lower-glycemic, protein-paired breakfasts significantly sustained elementary working memory and selective attention across late-morning testing compared to high-glycemic solo-sugar cereals.',
          beat3Kicker: 'Practice on a busy Tuesday',
          beat3Title: 'Upgrade breakfast without turning mornings into food policing',
          rehearsalTriggerSpeaker: '{Name} reaching for neon frosted cereal at 7:30 AM',
          rehearsalTriggerQuote: '“I ONLY want sweet cereal—eggs take forever and I’m not eating yogurt!”',
          rehearsalPrompt: 'Which stressful morning response starts a 7:30 AM argument?',
          instincts: [
            {
              id: 'lecture',
              label: '“That’s pure sugar! You’re going to bounce off the walls in school—eat eggs!”',
              whyTitle: 'Why that’s so tempting—and why kids dig in',
              whyText:
                'Calling favorite foods “bad” sparks instant resistance—and turns breakfast into a race against tears.',
            },
            {
              id: 'cave',
              label: 'Give up and pour solo sugary cereal with nothing beside it.',
              whyTitle: 'Why that’s so tempting—and the 15-second upgrade',
              whyText:
                'You can keep {poss} beloved carb AND add one simple teammate beside it in fifteen seconds!',
            },
          ],
          calmScriptPlain:
            '“Sweet cereal gives super-fast rocket fuel—let’s pair it with a ‘staying-power teammate’ so your brain doesn’t run out of gas before recess! Want a cheese stick, peanut-butter toast strips, or a quick vanilla smoothie cup alongside it?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'team',
              text: 'Sweet cereal gives super-fast rocket fuel—let’s pair it with a ‘staying-power teammate’ so your brain doesn’t run out of gas before recess!',
              tag: 'Teammate Frame, Zero Shame',
              note: 'Teaches real nutrition science (“quick fuel + staying-power fuel”) without demonizing carbs.',
            },
            { text: ' ' },
            {
              id: 'choices',
              text: 'Want a cheese stick, peanut-butter toast strips, or a quick vanilla smoothie cup alongside it?',
              tag: '2-Minute Choices',
              note: 'Gives {name} ownership over a super-fast protein add-on.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Use “quick energy + staying-power fuel” language',
            'Prep hard-boiled eggs or yogurt parfaits ahead on Sunday',
            'Never skip protein on big test or sports mornings',
          ],
          pushbacks: [
            {
              id: 'nohunger',
              label: '“{Name} genuinely says ‘My stomach feels weird eating early’”',
              setup: 'Offer tiny drinkable or bite-sized fuel plus a strong 10 AM school snack:',
              script:
                '“No big plate needed! Take four sips of a chocolate-banana milk smoothie for the ride, and we’ll pack cheese + pretzels for your 10 AM snack.”',
            },
            {
              id: 'allergy',
              label: '“We have nut or dairy allergies in our house!”',
              setup: 'Lean on easy allergy-friendly staying-power teammates:',
              script:
                '“Sunflower seed butter on waffles, turkey roll-ups, scrambled egg muffins, or fortified soy yogurt with berries deliver awesome morning protein cleanly.”',
            },
          ],
          advisorPrompt:
            '“Give me 7 super-fast 2-minute school-morning breakfasts with staying-power protein that a {ageShort} actually loves.”',
          beat4Kicker: 'Tomorrow morning’s 2-minute upgrade',
          beat4Title: 'Pick one easy protein pairing to test this week',
          beat4Lead: 'Tiny morning tweaks create calmer classrooms and smoother afternoons.',
          moves: [
            {
              id: 'pairone',
              title: 'Add ONE staying-power teammate beside tomorrow’s normal breakfast',
              desc: 'Peanut/sunflower butter on waffles, a cheese stick beside fruit, or Greek yogurt + honey.',
            },
            {
              id: 'sundayprep',
              title: 'Make one 5-minute grab-and-go batch on Sunday night',
              desc: 'Hard-boiled eggs, mini banana-oat muffins, or pre-portioned trail mix bags save weekday chaos.',
            },
            {
              id: 'waterbottle',
              title: 'Send a full cold water bottle every school morning',
              desc: 'Hydration keeps focus sharp and afternoon headaches away.',
            },
          ],
          closingNote:
            'Teaching an 8-year-old how “staying-power fuel” keeps {poss} brain feeling strong and steady hands {obj} a practical life skill {pronoun} will use long after elementary school.',
          pocketInsight:
            'Pair any fast morning carb with one 2-minute “staying-power” protein (nut/seed butter, yogurt, cheese, egg, or smoothie) to stop 10 AM focus crashes.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Why do carefully packed school lunches come home half-eaten—and how does a 3-color draft fix it?”',
            title: 'Partnering on a 3-Color Lunchbox {Name} Actually Eats',
            targetSlug: 'elementary-lunchbox-co-design',
          },
          interactiveHighlights: ['Morning Focus Curve', 'Staying-Power Script'],
        },
      },
      {
        slug: 'elementary-lunchbox-co-design',
        title: 'Partnering on a 3-Color Lunchbox {Name} Actually Eats',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: '3-color lunchbox · Co-designed for real cafeteria speed',
          headline: 'Partnering on a 3-Color Lunchbox {Name} Actually Eats',
          deck: 'Why kids often only get 12 real minutes to eat in a loud school cafeteria—and how co-packing a simple 3-color bento turns untouched lunches into happy empty boxes.',
          sceneTime: '4:00 PM · KITCHEN COUNTER',
          sceneBody:
            'You unzip {possessive} lunchbox and sigh: the whole turkey sandwich and soggy broccoli came straight back home untouched, while the granola bar wrapper is empty. *Meanwhile {name} is raiding the pantry starving—how do you pack a lunch {pronoun} actually eats at school?*',
          pollQuestion: 'Does half the lunchbox regularly make the round trip back home?',
          pollOptions: [
            {
              id: 'roundtrip',
              label: 'Yes—almost every week!',
              response:
                'Once you picture a noisy cafeteria where kids chat for 8 minutes and have 10 minutes left to open tricky packages, easy bite-sized “bento” compartments make instant sense!',
            },
            {
              id: 'bored',
              label: 'Gets tired of the same sandwich every day',
              response:
                'Letting {name} pick one item from each simple category the night before skyrockets buy-in AND saves you morning stress.',
            },
          ],
          beat2Kicker: 'Designing for real cafeteria life',
          beat2Title: 'Build a winning school lunch in 5 easy kid-friendly layers',
          beat2Lead:
            'Elementary kids eat far more when food is bite-sized, fast to open, and picked together the evening before. Tap the 5 simple lunchbox pieces below.',
          visualType: AlmanacVisualType.SENSORY_LADDER,
          visualStageTitle: 'The 5-part cafeteria-proof lunchbox',
          visualStageHint: 'Tap each slot to see what actually gets eaten in 15 minutes',
          visualConfig: {
            steps: [
              {
                label: 'Main',
                title: '1. Fast bite-sized protein + carb',
                desc: 'Pinwheel roll-ups, thermos pasta, cheese & crackers, or half-sandwich triangles—zero slow unwrapping.',
                tag: 'Slot 1 · Easy 2-bite main',
              },
              {
                label: 'Color 1',
                title: '2. Crisp ready-to-pop fruit',
                desc: 'Grapes, berries, peeled clementine segments, or apple slices with lemon—never tricky skins that eat up 5 minutes.',
                tag: 'Slot 2 · Sweet crunch',
              },
              {
                label: 'Color 2',
                title: '3. Easy crunchy veggie (optional dip)',
                desc: 'Mini cucumbers, snap peas, bell pepper strips, or cherry tomatoes—familiar crisp textures beat soggy steamed ones.',
                tag: 'Slot 3 · Bright crunch',
              },
              {
                label: 'Fun Side',
                title: '4. One joyful crunch or mini treat',
                desc: 'Pretzels, popcorn, or a tiny square of dark chocolate right inside the box—zero food hierarchy.',
                tag: 'Slot 4 · Joyful balance',
              },
              {
                label: 'Ownership',
                title: '5. {Name} packs 2 slots the night before',
                desc: 'Kids ages 7–9 take huge pride picking their own fruit and crunch from a fridge “Lunch Bin.”',
                tag: 'Slot 5 · Kid co-design',
              },
            ],
          },
          almanacTruth:
            'An untouched lunchbox is usually a cafeteria-logistics clue, not pickiness—bite-sized compartments packed together the night before get eaten twice as fast.',
          scienceDeepDive:
            'School cafeteria observational studies show elementary students average only 12–16 minutes of actual seated eating time after lining up and socializing; pre-sliced, easy-open portions and child co-selection significantly lower plate waste.',
          beat3Kicker: 'Practice at 4:00 PM',
          beat3Title: 'Troubleshoot an untouched lunchbox with curiosity, never guilt',
          rehearsalTriggerSpeaker: 'Unzipping a nearly full lunchbox on the counter',
          rehearsalTriggerQuote: '“I ran out of time! We were talking about Pokémon and then the bell rang!”',
          rehearsalPrompt: 'Which frustrated reaction makes kids toss leftovers in the school trash next time?',
          instincts: [
            {
              id: 'guilt',
              label: '“I worked hard packing this! What a waste of money—you HAVE to finish it!”',
              whyTitle: 'Why that’s so tempting—and what accidentally happens',
              whyText:
                'Food waste stings! Yet shaming untouched lunches often causes 8-year-olds to secretly dump food in the cafeteria bin so you won’t be mad.',
            },
            {
              id: 'guess',
              label: 'Silently keep packing the exact same sandwich tomorrow hoping it changes.',
              whyTitle: 'Why that’s so tempting—and the 30-second detective fix',
              whyText:
                'Asking one curious question (“Too big? Hard to open? Better as roll-ups?”) solves the mystery in seconds!',
            },
          ],
          calmScriptPlain:
            '“Whoa, lunchtime flies by fast when friends are chatting! No trouble at all—tell me like a lunch detective: was that sandwich too slow to eat, or would bite-sized crackers and turkey roll-ups be faster tomorrow?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'safe',
              text: 'Whoa, lunchtime flies by fast when friends are chatting! No trouble at all',
              tag: 'Keeps Honesty Safe',
              note: 'Guarantees {name} brings leftovers home honestly instead of hiding them in the school bin.',
            },
            { text: '—' },
            {
              id: 'detective',
              text: 'tell me like a lunch detective: was that sandwich too slow to eat, or would bite-sized crackers and turkey roll-ups be faster tomorrow?',
              tag: 'Co-Design Detective',
              note: 'Recruits {name} as partner to fix cafeteria friction immediately.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Make “always bring leftovers home so I know what worked” a zero-trouble rule',
            'Practice opening any new thermos or latch at home first',
            'Pack right after dinner while the kitchen is already open',
          ],
          pushbacks: [
            {
              id: 'onlychips',
              label: '“If {name} helps pack, {pronoun} only wants crackers and cookies!”',
              setup: 'Use simple category boundaries—you stock the bins, {pronoun} picks inside each category:',
              script:
                '“You’re the official picker! Grab one item from the Protein Bin, one from the Fruit Bin, one Crunchy Veggie, and one Fun Side.”',
            },
            {
              id: 'afterschool',
              label: '“Can {pronoun} eat untouched lunchbox leftovers as the 3:45 PM snack?”',
              setup: 'YES—zero waste and instant zero-prep after-school fuel:',
              script:
                '“Awesome bonus: whatever stays cold in your insulated box becomes your ready-to-go car snack on the ride home!”',
            },
          ],
          advisorPrompt:
            '“Help me build a simple 1-page ‘Mix & Match Lunchbox Menu’ for my {ageShort} with fast, easy-open cafeteria favorites.”',
          beat4Kicker: 'Tonight’s 5-minute experiment',
          beat4Title: 'Pick one easy lunchbox upgrade',
          beat4Lead: 'Hand over two compartments tonight and watch pride take off.',
          moves: [
            {
              id: 'binsetup',
              title: 'Create a 2-bin “Pack-Your-Own” zone in the fridge & pantry',
              desc: 'Let {name} pick {poss} own fruit + crunchy side every evening after dinner.',
            },
            {
              id: 'slicefast',
              title: 'Pre-peel clementines and cut sandwiches into fast grab triangles',
              desc: 'Removing 3 minutes of peeling often doubles what actually gets eaten at school.',
            },
            {
              id: 'detectiveq',
              title: 'Ask the zero-guilt Lunch Detective question once this week',
              desc: '“Which compartment was fastest and best today? Which one should we swap?”',
            },
          ],
          closingNote:
            'Co-packing a simple 3-color lunchbox doesn’t just cut food waste—it teaches {name} how to care for {poss} own energy every single day.',
          pocketInsight:
            'Solve untouched lunches with curiosity, never guilt: pack fast bite-sized compartments together the night before using a 3-color mix-and-match menu.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“How do you handle birthday parties, Halloween candy, and treats so {name} stays calm instead of sneaking sweets?”',
            title: 'Raising a Kid Who Feels Calm Around Birthday Cake & Treats',
            targetSlug: 'elementary-healthy-treat-mindset',
          },
          interactiveHighlights: ['5-Slot Bento Builder', 'Lunch-Detective Script'],
        },
      },
      {
        slug: 'elementary-healthy-treat-mindset',
        title: 'Raising a Kid Who Feels Calm Around Birthday Cake & Treats',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.plate,
          illustrationCaption: 'Party cake · Trusting fullness over food guilt',
          headline: 'Raising a Kid Who Feels Calm Around Birthday Cake & Treats',
          deck: 'Why strict food shaming (“Don’t eat that, it’s junk!”) backfires into secretive bingeing at friends’ houses—and how body-trust language builds lifelong balance.',
          sceneTime: '3:15 PM · SATURDAY BIRTHDAY PARTY',
          sceneBody:
            'At a classmate’s birthday party, you watch one kid whose home bans all sugar hover by the cupcake table stuffing four cupcakes in a row, while {name} eyes the frosting excitedly. *You want {name} to enjoy celebrations without feeling guilty OR going completely wild around sweets.*',
          pollQuestion: 'Do holidays, parties, or candy bowls ever make you unsure where to draw the line?',
          pollOptions: [
            {
              id: 'overeat',
              label: 'Yes—I worry {pronoun} won’t stop if I don’t police it',
              response:
                'That fear makes total sense! Surprisingly, kids whose homes treat sweets calmly (predictable structure + zero guilt) self-regulate around party food dramatically better over time.',
            },
            {
              id: 'bodytalk',
              label: 'I want to avoid passing down diet culture or food shame',
              response:
                'You are breaking a huge generational cycle! Neutral food language plus trusting {possessive} belly signals builds deep lifelong food peace.',
            },
          ],
          beat2Kicker: 'Building lifelong food peace',
          beat2Title: 'Compare food policing against calm body-trust guardrails',
          beat2Lead:
            'In ages 7–9, kids begin absorbing social messages about “good foods” vs. “bad foods” and body shapes. Calm structure with zero guilt keeps treats ordinary. Compare both approaches below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Strict food moralizing vs. calm treat balance',
          visualStageHint: 'Compare policing sweets with building internal trust',
          visualConfig: {
            willpowerLabel: 'Food Moralizing',
            willpowerTitle: 'Labeling foods “toxic/junk” & policing party plates',
            willpowerDesc:
              'Whispering “You’ve had enough sugar!” in front of friends sparks embarrassment, scarcity panic, and sneaking candy in bedrooms.',
            willpowerOutcome: 'Secret eating, food guilt, and disconnection from fullness.',
            guardrailLabel: 'Calm Body-Trust Structure',
            guardrailTitle: 'Predictable home rhythm + joyful, guilt-free celebrations',
            guardrailDesc:
              'Serve balanced everyday meals at home, allow normal joy at parties, and check in with how bodies FEEL rather than shaming calories.',
            guardrailOutcome: 'Kids listen to their own stomach and naturally stop when satisfied.',
            environmentShifts: [
              'Retire moral labels (“good/bad/junk/guilty”)—all foods fit inside a balanced life.',
              'At birthday parties, skip hovering over the cupcake plate—trust one festive afternoon!',
              'After holidays like Halloween, let {name} enjoy candy freely beside meals/snacks for a few days while novelty fades naturally.',
            ],
          },
          almanacTruth:
            'You can’t raise an intuitive, balanced adult through food guilt—kids learn to stop at one cupcake when they trust sweets aren’t disappearing forever.',
          scienceDeepDive:
            'Longitudinal feeding research (Fisher & Birch; Satter) demonstrates that heavy parental restriction of palatable foods predicts significantly greater eating in the absence of hunger (EAH) and secretive snacking by ages 7–9, whereas neutral structure supports healthy self-regulation.',
          beat3Kicker: 'Practice after a treat-heavy day',
          beat3Title: 'Coach body awareness warmly—even if {pronoun} overdoes candy once',
          rehearsalTriggerSpeaker: '{Name} groaning softly on the couch after eating too much party candy',
          rehearsalTriggerQuote: '“Ugh… my stomach feels kinda yucky from all those gummies.”',
          rehearsalPrompt: 'Which “I told you so!” reaction shuts down body learning?',
          instincts: [
            {
              id: 'toldyou',
              label: '“See?! I TOLD you not to eat all that junk! Now you learned your lesson!”',
              whyTitle: 'Why that’s so tempting—and what {name} absorbs',
              whyText:
                'Triumphant “I told you so” replaces gentle body wisdom with shame—teaching {obj} to hide stomachaches next time.',
            },
            {
              id: 'ban',
              label: 'Confiscate the remaining goodie bag permanently.',
              whyTitle: 'Why that’s so tempting—and why scarcity spikes',
              whyText:
                'Confiscation signals “Eat everything fast before Mom takes it!” next holiday.',
            },
          ],
          calmScriptPlain:
            '“Oof, too many sweet gummies all at once feels heavy in your belly—I’ve definitely done that too! Grab some cool water and let’s rest a minute; your tummy just gave you super helpful data for next time.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'relate',
              text: 'Oof, too many sweet gummies all at once feels heavy in your belly—I’ve definitely done that too!',
              tag: 'Warm Zero-Shame Empathy',
              note: 'Normalizes learning through real experience without lecturing or scolding.',
            },
            { text: ' ' },
            {
              id: 'data',
              text: 'Grab some cool water and let’s rest a minute; your tummy just gave you super helpful data for next time.',
              tag: 'Builds Internal Wisdom',
              note: 'Connects body feelings directly to future self-regulation—far stickier than rules.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Never comment negatively on your own body or “earning” food via exercise',
            'Keep everyday meals nourishing and party days joyful',
            'Let {name} leave half a treat behind without making a fuss',
          ],
          pushbacks: [
            {
              id: 'sneaking',
              label: '“I found empty candy wrappers hidden under {possessive} bed!”',
              setup: 'Respond with gentle curiosity—hiding wrappers almost always signals fear of judgment:',
              script:
                '“Hey, I spotted some wrappers when picking up—you’re not in trouble at all! Sweets aren’t forbidden here; let’s enjoy snacks in the kitchen together whenever we have them.”',
            },
            {
              id: 'schooltalk',
              label: '“School friends called {possessive} snack ‘unhealthy’ or ‘fattening’!”',
              setup: 'Anchor your home’s calm food philosophy cleanly:',
              script:
                '“Lots of people get confused about food rules! All foods give energy in different ways—some help us sprint and grow muscles, some are extra fun to taste, and every single body deserves kindness.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) goes overboard on sweets at friends’ houses—how do I reset treat habits calmly at home so the urgency fades?”',
          beat4Kicker: 'This week’s food-peace habit',
          beat4Title: 'Pick one gentle language shift to practice',
          beat4Lead: 'How we speak about food today becomes {possessive} inner voice for decades.',
          moves: [
            {
              id: 'retirejunk',
              title: 'Retire “bad / junk / guilty” food words at home all week',
              desc: 'Use neutral names (“cupcake,” “chips,” “berries”) and notice how much calmer meals feel.',
            },
            {
              id: 'nohover',
              title: 'Skip hovering over the snack table at the next party',
              desc: 'Feed a normal protein lunch beforehand, then let {name} enjoy the celebration freely.',
            },
            {
              id: 'bellycheck',
              title: 'Model listening to your own fullness casually at dinner',
              desc: '“That pasta was delicious, and my belly feels comfortably full—I’ll save the rest for tomorrow’s lunch.”',
            },
          ],
          closingNote:
            'Raising a child who can savor birthday cake with joy, stop when satisfied, and love {poss} strong growing body is one of the healthiest legacies you can ever hand down.',
          pocketInsight:
            'Drop moral food labels (“good/junk”), trust party days without hovering, and treat occasional candy tummy aches as calm body data—never “I told you so.”',
          nextEpisodeHook: null,
          interactiveHighlights: ['Body-Trust Guardrail Flip', 'Zero-Shame Candy Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 24: Boredom Tolerance, Board Games & Intrinsic Reading (3 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'play-elementary-logic-maker',
    category: AcademyCategory.DEVELOPMENT_AND_PLAY,
    developmentalTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    title: 'Boredom Tolerance, Board Games & Intrinsic Reading',
    reliefSubtitle:
      'Turn “I’m bored!” into hands-on cardboard engineering, coach graceful losing on board-game night, and spark joyful independent reading without homework pressure',
    tonightQuickWinTitle: 'Episode 1: Screen-Free Maker Challenges That Beat “I’m Bored!”',
    summary:
      'Protect healthy boredom as the launchpad for hands-on maker grit, turn weekly family board games into spatial strategy and graceful-losing labs, and build a cozy screen-free reading sanctuary that kids genuinely look forward to.',
    coverImageUrl: 'https://assets.alongside.care/academy/play-elementary.png',
    sortOrder: 5,
    episodes: [
      {
        slug: 'elementary-cardboard-maker-challenge',
        title: 'Screen-Free Maker Challenges That Beat “I’m Bored!”',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Maker box · From “I’m bored!” to invention',
          headline: 'Screen-Free Maker Challenges That Beat “I’m Bored!”',
          deck: 'Why rushing to entertain an 8-year-old steals the magic of creative boredom—and how one tape-and-cardboard “Maker Bin” turns rainy Saturdays into hours of grit.',
          sceneTime: '2:15 PM · RAINY SATURDAY',
          sceneBody:
            'Ten minutes after screens stay off, {name} drapes {obj}self upside down on the sofa: “There’s NOTHING to do! Can I play on the iPad?! I’m SO BORED!” *Your instinct wants to hand over a screen or become full-time activity director—yet what happens if you toss out one cardboard challenge instead?*',
          pollQuestion: 'How fast does “I’m bored!” turn into a screen request on weekends?',
          pollOptions: [
            {
              id: 'fast',
              label: 'Inside five minutes flat!',
              response:
                'Totally normal! Boredom feels slightly itchy for the first 7 minutes—right before the brain’s creative default-mode network fires up and invents something wild.',
            },
            {
              id: 'crafts',
              label: '{Name} loves building once {pronoun} gets a starting spark',
              response:
                'Keeping one low-cost “Maker Bin” ready turns that starting spark into 45 minutes of absorbed flow!',
            },
          ],
          beat2Kicker: 'The invention engine',
          beat2Title: 'Four simple beats from “I’m bored!” to proud maker grit',
          beat2Lead:
            'When a cardboard bridge collapses on try #1 and {name} reinforces it with masking tape on try #2, {pronoun} is building true perseverance and engineering intuition. Tap the 4 steps below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-step cardboard maker flow',
          visualStageHint: 'Tap each stage from itchy boredom to proud prototype',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Minutes 0–5',
                label: 'Ride Boredom',
                title: 'Welcome “I’m bored!” calmly without rescuing',
                desc: 'Smile and say “Awesome—boredom is where the best inventions start!” Resist handing over a tablet.',
                why: 'Short unstructured boredom switches on the brain’s creative daydreaming network.',
              },
              {
                timeOrCue: 'Minute 6',
                label: 'Open Maker Bin',
                title: 'Cardboard boxes, masking tape, string & scissors',
                desc: 'Keep shipping boxes, paper towel tubes, rubber bands, and foil in one corner bin—zero fancy kits needed.',
                why: 'Open-ended scrap materials spark 10x more invention than pre-built toys.',
              },
              {
                timeOrCue: 'Minute 10',
                label: '1-Line Mission',
                title: 'Toss out one playful engineering constraint',
                desc: '“Bet you can’t build a marble roller coaster—or a bridge strong enough to hold three cans of soup!”',
                why: 'A fun constraint focuses wild imagination into real problem-solving.',
              },
              {
                timeOrCue: 'Minute 25',
                label: 'Coach Grit',
                title: 'Celebrate flop #1 like a real engineer',
                desc: 'When tape slips or towers tilt, ask “Ooh, why did it bend there? What could reinforce it?”',
                why: 'Normalizing trial-and-error builds lasting resilience and grit.',
              },
            ],
          },
          almanacTruth:
            'Boredom isn’t an emergency for parents to fix—it is the quiet hallway right outside {possessive} next great invention.',
          scienceDeepDive:
            'Cognitive neuroscience research on the default mode network (DMN) and Dr. Angela Duckworth’s grit studies confirm that tolerating mild initial boredom and iterating through hands-on failures strengthens divergent thinking, spatial reasoning, and long-term perseverance.',
          beat3Kicker: 'Practice on a quiet afternoon',
          beat3Title: 'Answer “I’m bored!” without lecturing OR playing cruise director',
          rehearsalTriggerSpeaker: '{Name} groaning dramatically upside down on the couch',
          rehearsalTriggerQuote: '“I’m SOOOOO BORED! Nobody will play with me—can I just watch YouTube?”',
          rehearsalPrompt: 'Which everyday reflex accidentally shuts down creative grit?',
          instincts: [
            {
              id: 'fixit',
              label: 'Rattle off twelve suggestions while {name} shoots every single one down (“No! Boring! No!”).',
              whyTitle: 'Why that’s so tempting—and why kids say no to all twelve',
              whyText:
                'Playing “cruise director” turns boredom into a game of shooting down your ideas—while handing ownership right back sparks real agency.',
            },
            {
              id: 'snap',
              label: '“Well go clean your room then if you’re so bored!”',
              whyTitle: 'Why that’s so tempting—and why it misses the magic',
              whyText:
                'Treating boredom like a crime makes kids hide or beg for screens instead of learning to enjoy quiet creative space.',
            },
          ],
          calmScriptPlain:
            '“Ooh, boredom! That means your brain is clearing space for a brand-new invention. Screens are resting till 5—there’s a giant delivery box and a fresh roll of masking tape by the closet if you want to build a marble maze or secret fort!”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'welcome',
              text: 'Ooh, boredom! That means your brain is clearing space for a brand-new invention.',
              tag: 'Celebrates Boredom',
              note: 'Reframes an itchy feeling as an exciting creative launchpad.',
            },
            { text: ' ' },
            {
              id: 'spark',
              text: 'Screens are resting till 5—there’s a giant delivery box and a fresh roll of masking tape by the closet if you want to build a marble maze or secret fort!',
              tag: 'Clear Limit + Loose Spark',
              note: 'Holds the screen boundary warmly and drops one irresistible maker invitation without nagging.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Save one big Amazon box + cheap masking tape roll each week',
            'Never tidy up mid-invention—give a designated “In-Progress Corner”',
            'Praise redesigns (“Look how you fixed that wobble!”)',
          ],
          pushbacks: [
            {
              id: 'givesup',
              label: '“My invention broke—I’m TERRIBLE at building!”',
              setup: 'Normalize engineering flops with genuine curiosity:',
              script:
                '“Every real rocket engineer blows up Prototype #1! That’s literally how you discover where the weak spot is—want to grab a paper-towel tube as a pillar for Version 2?”',
            },
            {
              id: 'messy',
              label: '“Cardboard scraps end up everywhere!”',
              setup: 'Build a joyful 3-minute cleanup beat right into the maker pact:',
              script:
                '“Big inventions stay on the craft rug—and when we wrap up at 4:45 we do a 2-minute race to fill the recycling bin.”',
            },
          ],
          advisorPrompt:
            '“Give me 8 awesome 1-sentence cardboard-and-tape ‘Maker Challenges’ for a {ageShort} on a rainy weekend.”',
          beat4Kicker: 'This weekend’s maker setup',
          beat4Title: 'Pick one zero-cost spark to keep on standby',
          beat4Lead: 'One roll of masking tape buys more creative joy than a $60 plastic toy.',
          moves: [
            {
              id: 'makerbin',
              title: 'Start a “Maker Bin” with 1 cardboard box, masking tape, string & foil',
              desc: 'Tuck it in a closet so it’s ready the next time “I’m bored!” strikes.',
            },
            {
              id: 'ride7',
              title: 'Let {name} sit calmly in boredom for 7 full minutes once this weekend',
              desc: 'Smile, don’t rescue, and watch what {poss} imagination cooks up on minute eight.',
            },
            {
              id: 'praisegrit',
              title: 'Praise one messy redesign instead of the final polish',
              desc: '“You didn’t quit when the bridge collapsed—you tested three fixes until it held!”',
            },
          ],
          closingNote:
            'Every lopsided tape-and-cardboard prototype built out of a quiet afternoon wires {name} with the deep belief: “I can figure hard things out.”',
          pocketInsight:
            'Welcome “I’m bored!” cheerfully without rescuing—keep a cardboard-and-tape Maker Bin ready and celebrate every Version-1 flop as real grit.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Why do board games sometimes end in flipped boards at age 8—and how do you coach graceful losing?”',
            title: 'Board Game Night: Coaching Graceful Losing & Strategy',
            targetSlug: 'elementary-family-board-game-night',
          },
          interactiveHighlights: ['4-Step Maker Timeline', 'Anti-Boredom Script'],
        },
      },
      {
        slug: 'elementary-family-board-game-night',
        title: 'Board Game Night: Coaching Graceful Losing & Strategy',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.blocks_play,
          illustrationCaption: 'Game table · Safe gym for strategy & losing well',
          headline: 'Board Game Night: Coaching Graceful Losing & Strategy',
          deck: 'Why secretly letting an 8-year-old win every game backfires—and how weekly tabletop strategy games build spatial thinking, impulse brakes, and gracious losing.',
          sceneTime: '7:10 PM · FRIDAY GAME TABLE',
          sceneBody:
            'You drew a lucky card that puts you two spaces ahead. Instantly {name} shoves {poss} game piece over and shouts, “THIS GAME IS RIGGED! YOU’RE CHEATING! I QUIT!” *Family game night was supposed to be fun—why does losing sting like a bee at age eight?*',
          pollQuestion: 'Does losing a board game spark big tears or sudden quitting at your house?',
          pollOptions: [
            {
              id: 'tears',
              label: 'Yes—we’re almost afraid to play competitive games!',
              response:
                'Super common in ages 7–9! Competence and fairness matter deeply right now, so losing hits the ego hard—making your living room the absolute safest gym to practice surviving a loss.',
            },
            {
              id: 'letwin',
              label: 'I catch myself letting {obj} win to keep the peace',
              response:
                'Every loving parent has done that! Mixing cooperative games with honest, kind-hearted competition teaches kids that losing is survivable—and winning actually feels earned.',
            },
          ],
          beat2Kicker: 'Inside game-night brain growth',
          beat2Title: 'Strategy games wire spatial planning AND emotional bounce-back',
          beat2Lead:
            'Moving pieces, counting moves ahead, and surviving bad dice rolls train parietal spatial reasoning and emotional self-control together. Tap the 3 coaching beats below.',
          visualType: AlmanacVisualType.SERVE_RETURN_LOOP,
          visualStageTitle: 'The 3-beat graceful-losing coaching loop',
          visualStageHint: 'Tap each beat from pre-game setup to post-game handshake',
          visualConfig: {
            steps: [
              {
                stepNum: '01',
                actor: 'Model first',
                label: 'Lose Loudly & Cheerfully',
                quote: '“Whoa, I rolled a ONE?! Oof, my tummy wanted a six—alright, good luck to me next turn!”',
                desc: 'Let {name} see YOU feel mild disappointment when luck goes south—and laugh it off cleanly.',
                brainNote: 'Mirror neurons absorb your calm loss-recovery template directly.',
              },
              {
                stepNum: '02',
                actor: 'Think aloud',
                label: 'Coach Strategy',
                quote: '“Ooh, if I move here I block the road, OR I could grab wood—what would you try?”',
                desc: 'Sharing simple spatial thinking aloud exercises mental rotation and planning ahead without taking over.',
                brainNote: 'Fires parietal-prefrontal strategy circuits joyfully.',
              },
              {
                stepNum: '03',
                actor: 'Close warmly',
                label: 'Good-Game Ritual',
                quote: '“Losing stings for a minute—awesome strategy on turn five! Want a rematch tomorrow?”',
                desc: 'Hold a brief, kind “Good Game” high-five ritual regardless of score—zero gloating, zero shaming.',
                brainNote: 'Separates personal worth from a cardboard score.',
              },
            ],
          },
          almanacTruth:
            'Your living-room table is the safest place on Earth for {name} to learn that losing a game stings for sixty seconds—and doesn’t shrink {poss} worth by one millimeter.',
          scienceDeepDive:
            'Cognitive development research shows tabletop board and spatial strategy games strengthen parietal visuospatial working memory and numerical estimation, while supportive caregiver emotion-modeling during competitive play builds peer sportsmanship and frustration tolerance.',
          beat3Kicker: 'Practice at the game table',
          beat3Title: 'Hold the room steady when {name} wants to flip the board',
          rehearsalTriggerSpeaker: '{Name} shoving cards aside when falling behind',
          rehearsalTriggerQuote: '“I HATE this stupid game! I NEVER win anything—I’m quitting!”',
          rehearsalPrompt: 'Which reaction turns a teachable moment into shame?',
          instincts: [
            {
              id: 'soreloser',
              label: '“Stop being such a sore loser! Nobody at school will want to play with you!”',
              whyTitle: 'Why that’s so tempting—and why kids shut down',
              whyText:
                'You genuinely want {obj} to thrive with friends! Yet labeling {obj} a “sore loser” heaps social fear on top of sting—making quitting feel even safer.',
            },
            {
              id: 'rig',
              label: 'Quietly fudge your own roll so {name} suddenly takes the lead.',
              whyTitle: 'Why that’s so tempting—and why kids sense it',
              whyText:
                'Smart 8-year-olds spot fake wins fast—and miss the proud realization that they can survive losing and bounce back.',
            },
          ],
          calmScriptPlain:
            '“Oof, getting knocked back three spaces stings—I hate when the dice do that too! Take a 30-second water break if you want; we only play when everyone treats the pieces kindly. Want to finish strong together or try a team game next?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'sting',
              text: 'Oof, getting knocked back three spaces stings—I hate when the dice do that too!',
              tag: 'Normalizes the Sting',
              note: 'Shows that disappointment is 100% human—not a character flaw.',
            },
            { text: ' ' },
            {
              id: 'respect',
              text: 'Take a 30-second water break if you want; we only play when everyone treats the pieces kindly. Want to finish strong together or try a team game next?',
              tag: 'Warm Limit + Bounce-Back',
              note: 'Protects respectful play while giving {name} a dignified on-ramp back to the table.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Mix cooperative team games (Outfoxed!, Forbidden Island) with competitive ones',
            'Never gloat when you win—praise a smart move {pronoun} made',
            'Keep games crisp (15–25 minutes) before evening fatigue hits',
          ],
          pushbacks: [
            {
              id: 'cheating',
              label: '“{Name} sneaks an extra card or peeks at the deck”',
              setup: 'Treat elementary peeking lightly as intense desire to win—not moral collapse:',
              script:
                '“Haha, I saw that sneaky peek—wanting to win feels huge! Let’s put it back and play straight-up so when you DO beat me, you know 100% you earned it!”',
            },
            {
              id: 'gloats',
              label: '“When {name} DOES win, {pronoun} dances and rubs it in!”',
              setup: 'Coach gracious winning cheerfully right in the moment:',
              script:
                '“Awesome victory—celebrate your awesome strategy! Just remember our table rule: cheer YOUR win, never tease the other player.”',
            },
          ],
          advisorPrompt:
            '“Recommend 5 fun 20-minute strategy and cooperative board games for a {ageShort} who is practicing graceful losing.”',
          beat4Kicker: 'This week’s game night',
          beat4Title: 'Pick one fun sportsmanship move',
          beat4Lead: 'Twenty minutes at the table builds social skills that last through adulthood.',
          moves: [
            {
              id: 'coopgame',
              title: 'Play one cooperative “Us vs. the Game” board game this week',
              desc: 'Shared team strategy builds planning skills with zero sibling vs. parent sting.',
            },
            {
              id: 'modellose',
              title: 'Narrate your own calm reaction out loud next time you lose a turn',
              desc: '“Bummer, my plan got blocked! Deep breath—time to figure out Plan B.”',
            },
            {
              id: 'goodgame',
              title: 'Start a fun “Good Game + One Cool Move” closing ritual',
              desc: 'Every player high-fives and names one clever move someone else made.',
            },
          ],
          closingNote:
            'Every shaky high-five after a tough game teaches {name} a superpower most adults still admire: staying kind, curious, and steady even when luck turns.',
          pocketInsight:
            'Don’t fudge wins or shame tears—model calm losing aloud, blend cooperative and strategy games, and close with a warm “Good Game” ritual.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“Why do forced 20-minute reading logs kill the joy of books—and what sparks kids to read on their own?”',
            title: 'Building a Cozy Reading Habit Without Turning Books Into Homework',
            targetSlug: 'elementary-independent-reading-sanctuary',
          },
          interactiveHighlights: ['3-Beat Sportsmanship Loop', 'Graceful-Losing Script'],
        },
      },
      {
        slug: 'elementary-independent-reading-sanctuary',
        title: 'Building a Cozy Reading Habit Without Turning Books Into Homework',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.moon_bed,
          illustrationCaption: 'Cozy book nook · Reading for joy, never timers',
          headline: 'Building a Cozy Reading Habit Without Turning Books Into Homework',
          deck: 'Why setting a loud kitchen timer for “20 mandatory minutes of reading!” makes kids watch the clock—and how graphic novels, cozy nooks, and read-alouds ignite lifelong readers.',
          sceneTime: '7:40 PM · BEDROOM',
          sceneBody:
            'The school reading log demands twenty minutes signed every night. {Name} stares at the page sighing every thirty seconds: “How many minutes left? Is it done yet?” Yet five minutes earlier {pronoun} happily devoured a comic book on the couch. *Wait—do graphic novels and audiobooks actually count?*',
          pollQuestion: 'Does nightly reading currently feel more like a chore than a treat?',
          pollOptions: [
            {
              id: 'chore',
              label: 'Yes—lots of clock-watching and sighing',
              response:
                'You are NOT alone! External timers and quizzing turn magical stories into a school assignment—while choice, graphic novels, and cozy shared pages bring the spark straight back.',
            },
            {
              id: 'comics',
              label: '{Name} only wants graphic novels or funny series',
              response:
                'Celebration time! Literacy researchers confirm graphic novels carry rich vocabulary, complex plot inferences, and turn reluctant readers into unstoppable bookworms!',
            },
          ],
          beat2Kicker: 'Protecting intrinsic joy',
          beat2Title: 'Trade mandatory reading chores for an irresistible reading sanctuary',
          beat2Lead:
            'Kids fall in love with reading when books feel like cozy freedom, choice, and closeness—not a timed test. Compare both setups below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Timed reading chore vs. cozy reading sanctuary',
          visualStageHint: 'Compare mandatory logs with an effortless reading habit',
          visualConfig: {
            willpowerLabel: 'Timed Homework Drill',
            willpowerTitle: '“Read 20 minutes of a ‘real’ chapter book—no comics!”',
            willpowerDesc:
              'Setting a ticking timer and dismissing graphic novels teaches kids that reading is an annoying barrier standing between them and fun.',
            willpowerOutcome: 'Clock-watching, stalling, and dropping books the moment school ends.',
            guardrailLabel: 'Cozy Sanctuary Habit',
            guardrailTitle: 'Choice books + graphic novels + 15-min bedtime perk',
            guardrailDesc:
              'Pair a cozy pillow-and-lamp nook, weekly library choice, graphic novels, AND keep reading aloud together even after {name} can read solo.',
            guardrailOutcome: 'Kids stay under the covers sneaking “just one more chapter!”',
            environmentShifts: [
              'YES to graphic novels, joke books, sports almanacs, and audiobooks—all build genuine vocabulary and reading stamina!',
              'Keep reading aloud together 1–2 levels ABOVE {possessive} solo reading level—it keeps complex storytelling magical.',
              'Frame bedtime reading as staying up 15 minutes later with a book light—suddenly books feel like a golden privilege.',
            ],
          },
          almanacTruth:
            'The fastest way to grow a lifelong reader is letting {name} pick {poss} own books (yes, graphic novels!) and never stopping cozy read-alouds too early.',
          scienceDeepDive:
            'Scholastic’s Kids & Family Reading Report and literacy meta-analyses consistently identify self-selection of reading materials and continued parental read-alouds through ages 8–11 as the top two drivers of voluntary lifelong reading frequency and vocabulary expansion.',
          beat3Kicker: 'Practice before bedtime',
          beat3Title: 'Flip reading resistance into cozy excitement tonight',
          rehearsalTriggerSpeaker: '{Name} groaning over the school reading log',
          rehearsalTriggerQuote: '“Reading is BORING! Why can’t I just play my game instead?!”',
          rehearsalPrompt: 'Which well-meaning push makes reading feel even heavier?',
          instincts: [
            {
              id: 'lecture',
              label: '“If you don’t read 20 minutes you’ll fall behind in 4th grade! Start the timer now!”',
              whyTitle: 'Why that’s so tempting—and why kids dread pages',
              whyText:
                'Future-worry pressure turns reading into anxiety instead of adventure.',
            },
            {
              id: 'bancomics',
              label: '“Put that comic book down—read a ‘real’ book with just words!”',
              whyTitle: 'Why that’s so tempting—and why literacy experts cheer comics',
              whyText:
                'Graphic novels pack dense vocabulary, dialogue pacing, and visual inference—banning them removes the exact bridge into long chapter books!',
            },
          ],
          calmScriptPlain:
            '“Reading with a ticking clock DOES feel like a chore! How about we ditch the timer—you pick any graphic novel or funny book you want, or we trade pages aloud under a blanket with your warm book light?”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'agree',
              text: 'Reading with a ticking clock DOES feel like a chore!',
              tag: 'Honest Empathy',
              note: 'Takes away resistance instantly by acknowledging why forced logs feel stale.',
            },
            { text: ' ' },
            {
              id: 'cozy',
              text: 'How about we ditch the timer—you pick any graphic novel or funny book you want, or we trade pages aloud under a blanket with your warm book light?',
              tag: 'Choice + Closeness',
              note: '“You read a page, I read a page” cuts decoding fatigue in half while keeping stories joyful.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Take a monthly zero-rules library raid where {name} fills a tote freely',
            'Try “Popcorn Reading” (alternate paragraphs or pages aloud)',
            'Let {name} see YOU reading a real book for fun',
          ],
          pushbacks: [
            {
              id: 'schoollog',
              label: '“What about the teacher’s required 20-minute reading log?”',
              setup: 'Complete it warmly through shared pages or choice books—and keep the timer out of sight:',
              script:
                '“I’ll quietly glance at the clock myself while we snuggle and trade pages—zero beepers interrupting the story!”',
            },
            {
              id: 'struggles',
              label: '“What if decoding words actually feels genuinely hard for {name}?”',
              setup: 'Pair audiobooks WITH the physical book in hand (ear-reading + eye-reading) and chat early with {poss} teacher:',
              script:
                '“Following along in the print book while listening to the audiobook builds fluency with zero shame—and chatting calmly with {poss} teacher catches support needs early.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) resists nightly reading—recommend 5 hilarious, page-turning graphic novels or chapter series for {poss} age.”',
          beat4Kicker: 'This week’s cozy nook',
          beat4Title: 'Pick one simple move to make books magnetic',
          beat4Lead: 'Swap pressure for pillows, lamps, and freedom of choice.',
          moves: [
            {
              id: 'libraryraid',
              title: 'Do one zero-veto library visit where {name} picks 5 books freely',
              desc: 'Comics, Guinness World Records, joke books, fantasy—everything counts!',
            },
            {
              id: 'tradepages',
              title: 'Try “Trade-a-Page” cozy read-aloud twice this week',
              desc: 'Even strong 9-year-old readers melt into being read to at night.',
            },
            {
              id: 'bookbasket',
              title: 'Place a small inviting book basket right next to {possessive} pillow',
              desc: 'Easy visual reach beats books buried on a high shelf every time.',
            },
          ],
          closingNote:
            'When reading stops being a ticked box and becomes warm light, shared laughs, and wild adventures {pronoun} chose {obj}self, {name} carries a sanctuary in {poss} backpack for life.',
          pocketInsight:
            'Ditch ticking reading timers: welcome graphic novels and self-chosen library picks, keep reading aloud together, and make cozy bedtime reading a warm perk.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Reading Sanctuary Flip', 'Trade-a-Page Script'],
        },
      },
    ],
  }),

  // ===========================================================================
  // COURSE 25: First Video Games, Gaming Rage & Family Agreements (4 Episodes)
  // ===========================================================================
  buildBespokeCourse({
    slug: 'digital-elementary-first-gaming',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    developmentalTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    title: 'First Video Games, Gaming Rage & Family Agreements',
    reliefSubtitle:
      'Stop post-gaming controller meltdowns, decode Roblox & loot-box psychology, install a neutral work-before-play dock, and co-sign a first gaming pact',
    tonightQuickWinTitle: 'Episode 1: The 5-Minute Landing Strip That Stops Post-Game Rage',
    summary:
      'Replace abrupt controller-yanking wars with game-state landing strips, pull back the curtain on variable-reward loot boxes in kids’ games, establish an effortless homework-first docking routine, and co-write a clear 1-page family gaming agreement.',
    coverImageUrl: 'https://assets.alongside.care/academy/digital-elementary.png',
    sortOrder: 5,
    episodes: [
      {
        slug: 'elementary-post-game-decompression',
        title: 'The 5-Minute Landing Strip That Stops Post-Game Rage',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
        payload: {
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Game-state landing · Closing matches without rage',
          headline: 'The 5-Minute Landing Strip That Stops Post-Game Rage',
          deck: 'Why shouting “TURN IT OFF NOW!” mid-match triggers controller-throwing rage—and the 2-step game-state warning that brings calm power-downs back.',
          sceneTime: '5:25 PM · LIVING ROOM CONSOLE',
          sceneBody:
            'You walk past the TV and call out: “Time’s up—turn Minecraft off right now!” Instantly {name} shouts, “NO! MY HOUSE WILL GET BLOWN UP IF I DON’T SAVE!” and slams the controller onto the couch cushions. *Why does a peaceful kid turn volcanic the second gaming ends?*',
          pollQuestion: 'Does ending video-game time trigger instant snapping or controller rage?',
          pollOptions: [
            {
              id: 'rage',
              label: 'Yes—almost every shutoff turns into a huge fight',
              response:
                'Fast-paced gaming keeps adrenaline and dopamine cranked high—yanking the plug mid-round feels like tearing a half-built Lego castle straight out of {poss} hands.',
            },
            {
              id: 'save',
              label: 'It’s always “Wait, let me finish this round / save!”',
              response:
                'Switching from clock-time warnings to GAME-STATE warnings (“Finish this round, save at the checkpoint, then dock”) solves 80% of shutoff fights overnight!',
            },
          ],
          beat2Kicker: 'Inside the gamer brain',
          beat2Title: 'Fast adrenaline + sudden cutoff = instant lid flip',
          beat2Lead:
            'During an intense round, heart rate rises and stress hormones surge. Giving a warm game-state landing strip lets adrenaline coast down BEFORE the controller docks. Toggle below.',
          visualType: AlmanacVisualType.BRAIN_BRIDGE,
          visualStageTitle: 'Mid-match adrenaline vs. 5-minute landing strip',
          visualStageHint: 'Toggle abrupt cutoff vs. smooth game-state landing',
          visualConfig: {
            calmToggleLabel: 'Game-State Landing Strip',
            stormToggleLabel: 'Abrupt Mid-Match Cutoff',
            calmStatus: 'ADRENALINE COASTING · CALM DOCK',
            stormStatus: 'DOPAMINE CLIFF · INSTANT RAGE',
            calmReadouts: [
              {
                name: 'Game-State Cue',
                value: 'Save & Wrap',
                tone: 'spruce',
                desc: 'Sitting beside {name} for 2 minutes (“Show me your base before you save!”) bridges connection cleanly.',
              },
              {
                name: 'Post-Game Reset',
                value: 'Water + Stretch',
                tone: 'spruce',
                desc: 'A 3-minute physical reset (cold water, quick snack, stepping outside) drains lingering adrenaline fast.',
              },
            ],
            stormReadouts: [
              {
                name: 'Adrenaline & Dopamine',
                value: 'Cliff Drop',
                tone: 'amber',
                desc: 'Sudden shutdown mid-round feels like panic and loss—flipping {possessive} emotional lid immediately.',
              },
              {
                name: 'Parent-Child Friction',
                value: 'High Heat',
                tone: 'amber',
                desc: '“You’re banned for a month!” escalates rage instead of teaching self-stopping skills.',
              },
            ],
          },
          almanacTruth:
            'Give warnings in GAME time (“This is your last round, then save at the checkpoint”), never surprise clock time—and sit beside {name} for the final 60 seconds so you land together.',
          scienceDeepDive:
            'Pediatric digital-media research (Hiniker et al.; Heitner) shows that gaming elevates sympathetic arousal and goal-completion tension; abrupt interruption triggers frustration-aggression responses, whereas caregiver co-presence during the final minute and natural save-point endings sharply reduce post-play meltdowns.',
          beat3Kicker: 'Practice before the next match ends',
          beat3Title: 'Hold the shutoff calm even when {name} begs for one more round',
          rehearsalTriggerSpeaker: '{Name} tossing the controller angrily onto the rug',
          rehearsalTriggerQuote: '“UGHHH! I WAS ONE SECOND FROM WINNING! YOU RUINED EVERYTHING!”',
          rehearsalPrompt: 'Which heated reaction pours gasoline straight onto gaming rage?',
          instincts: [
            {
              id: 'ban',
              label: '“Throw that controller one more time and the console goes in the trash for a year!”',
              whyTitle: 'Why that’s so tempting—and what gets missed',
              whyText:
                'Protecting expensive gear matters! Yet yelling giant bans mid-adrenaline peak turns a 3-minute cooldown into an hour-long war.',
            },
            {
              id: 'onemore',
              label: '“Fine—play ONE more round so you end on a win, okay?”',
              whyTitle: 'Why that’s so tempting—and why rage gets louder',
              whyText:
                'Rewarding controller slams with bonus rounds accidentally teaches that rage unlocks extra time.',
            },
          ],
          calmScriptPlain:
            '“Whoa—losing right at the buzzer stings like crazy! Controllers stay gentle on the table, never thrown. Let’s take five minutes for cold water and a snack so your brain can land—and tomorrow we’ll set our ‘last-round’ cue five minutes earlier.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'cool',
              text: 'Whoa—losing right at the buzzer stings like crazy! Controllers stay gentle on the table, never thrown.',
              tag: 'Empathy + Gear Limit',
              note: 'Acknowledges the real game adrenaline while holding equipment safety calmly.',
            },
            { text: ' ' },
            {
              id: 'land',
              text: 'Let’s take five minutes for cold water and a snack so your brain can land—and tomorrow we’ll set our ‘last-round’ cue five minutes earlier.',
              tag: 'Physical Landing Strip',
              note: 'Skips lecturing while giving adrenaline a real biological off-ramp.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Sit beside {name} for the last 60 seconds (“Show me what you built!”)',
            'Warn by game state: “Save after this match / level”',
            'Keep cold water or a snack ready right after power-down',
          ],
          pushbacks: [
            {
              id: 'online',
              label: '“I CAN’T pause—it’s an online match with my friends!”',
              setup: 'Set the “No New Match” cutoff 10 minutes BEFORE dinner time:',
              script:
                '“Totally get you can’t pause mid-match! That’s why our rule is: zero new matches start after 5:15 so you finish clean with friends by 5:25.”',
            },
            {
              id: 'throws',
              label: '“{Name} slammed the controller hard anyway”',
              setup: 'Hold one calm, related 24-hour gear pause once everyone is cool:',
              script:
                '“I know you were frustrated—controllers break when slammed, so the console takes a 24-hour rest day tomorrow and we’ll try our landing strip again Thursday.”',
            },
          ],
          advisorPrompt:
            '“{Name} ({age}) gets really worked up turning off Minecraft/Roblox—help me design a smooth 5-minute game-state landing routine.”',
          beat4Kicker: 'Next gaming session',
          beat4Title: 'Pick one landing-strip upgrade to try today',
          beat4Lead: 'Two minutes of side-by-side curiosity beats twenty minutes of arguing.',
          moves: [
            {
              id: 'gamestate',
              title: 'Give your next warning in game time (“Finish this match, then save”)',
              desc: 'Ask {name} to tell YOU when the save icon finishes so {pronoun} owns the stop.',
            },
            {
              id: 'tour2min',
              title: 'Ask for a 60-second tour of {possessive} build before powering down',
              desc: 'Warm interest bridges the dopamine cliff effortlessly.',
            },
            {
              id: 'waterreset',
              title: 'Pair power-off with a 3-minute physical reset (water, snack, stretch)',
              desc: 'Drains lingering gaming adrenaline before homework or dinner.',
            },
          ],
          closingNote:
            'Sitting beside {name} for sixty curious seconds before powering off turns you from the fun-police into the mentor {pronoun} actually wants in {poss} corner.',
          pocketInsight:
            'Warn by game state (“Save after this match”), ask for a 60-second tour of {possessive} game before docking, and follow with a 3-minute water/movement reset.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 2 · 3 min',
            mystery: '“Why do free kids’ games like Roblox suddenly spark begging for $20 virtual coins and mystery boxes?”',
            title: 'Why Roblox & Loot Boxes Feel Like Slot Machines to an 8-Year-Old',
            targetSlug: 'elementary-variable-reward-schedules',
          },
          interactiveHighlights: ['Gamer Brain Bridge', 'Game-State Landing Script'],
        },
      },
      {
        slug: 'elementary-variable-reward-schedules',
        title: 'Why Roblox & Loot Boxes Feel Like Slot Machines to an 8-Year-Old',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
        payload: {
          episodeRole: EpisodeRole.BRAIN_DECODER,
          illustration: EditorialIllustrationKey.device_dock,
          illustrationCaption: 'Behind the curtain · Teaching kids how games hook brains',
          headline: 'Why Roblox & Loot Boxes Feel Like Slot Machines to an 8-Year-Old',
          deck: 'How “free-to-play” kids’ games borrow casino psychology—and why letting an 8-year-old peek behind the designer’s curtain builds instant scam-proofing.',
          sceneTime: '4:45 PM · LIVING ROOM',
          sceneBody:
            '{Name} runs over clutching the tablet, eyes wide: “PLEASE can I spend $10 on Robux right now?! There’s a LIMITED-TIME mystery egg and the timer runs out in four minutes!!” *Your alarm bells go off—why does a kids’ game look exactly like a Vegas casino countdown?*',
          pollQuestion: 'Have in-game currencies, countdown timers, or mystery boxes hit your house yet?',
          pollOptions: [
            {
              id: 'begging',
              label: 'Yes—constant begging for virtual coins and skins!',
              response:
                'Smart instincts! Kids ages 7–9 LOVE learning the “secret tricks” companies use to part players from their money—turning them from targets into sharp trick-spotters.',
            },
            {
              id: 'soon',
              label: 'Not yet, want to inoculate {obj} before Roblox starts',
              response:
                'Teaching {name} how countdown timers and mystery boxes work BEFORE encountering them is pure digital vaccination!',
            },
          ],
          beat2Kicker: 'Pulling back the curtain',
          beat2Title: 'Flip the lens from “awesome rare prize” to “slot-machine trick”',
          beat2Lead:
            'Unpredictable mystery boxes (“variable ratio rewards”) trigger bigger dopamine spikes than guaranteed prizes—the exact engine inside slot machines. Flip lenses and tap the 10-box odds test below.',
          visualType: AlmanacVisualType.LENS_EXPOSURE_MATRIX,
          visualStageTitle: 'Game-hype lens vs. trick-spotter lens',
          visualStageHint: 'Flip lenses, then tap mystery boxes 1–10 to see odds reality',
          visualConfig: {
            adultLabel: 'Game-hype lens',
            adultQuote: '“If I buy ONE more mystery egg before the timer hits zero, I’ll win the Legendary Dragon!”',
            adultSub: 'Flashing countdowns and fake urgency make an 8-year-old feel panicked that missing out ruins the game.',
            childLabel: 'Smart trick-spotter lens',
            childQuote: '“Aha! Studios hire grown-ups to add fake timers and 1% odds so kids spend real allowance!”',
            childSub: 'Once an 8-year-old spots the trick, {pronoun} feels proud outsmarting the studio instead of controlled by it.',
            exposureHeading: 'The 10-mystery-box reality check',
            exposureSub: 'Tap boxes 1–10 to watch real odds play out',
            totalDots: 10,
            defaultCount: 3,
            unitLabel: 'mystery box',
            lowMax: 4,
            midMax: 8,
            lowMsg: 'Boxes 1–4: Common duplicate items—yet flashy lights and “SO CLOSE!” sparks make your brain itch to buy #5.',
            midMsg: 'Boxes 5–8: $40 of real money gone for pixels while a brand-new “Even Rarer!” countdown already drops next Friday.',
            highMsg: 'Boxes 9–10: Realizing how rigged mystery odds work turns {name} into a savvy kid who laughs at fake timers!',
          },
          almanacTruth:
            'Eight-year-olds hate feeling tricked—showing {name} how studios engineer fake countdown timers and loot-box odds inoculates {obj} far better than just saying “No!”',
          scienceDeepDive:
            'Behavioral economics and pediatric media research (Zendle et al., Royal Society Open Science) identify loot boxes, virtual currencies that obscure real-dollar cost, and artificial FOMO countdowns as structurally akin to variable-ratio gambling schedules—heightening impulsivity in developing striatal reward circuits.',
          beat3Kicker: 'Practice when the countdown flashes',
          beat3Title: 'Turn a Robux plea into a proud “Trick-Spotter” moment',
          rehearsalTriggerSpeaker: '{Name} waving a flashing 3-minute countdown timer',
          rehearsalTriggerQuote: '“HURRY! Only 3 minutes left for the Golden Pet Egg—everyone in my class has one!”',
          rehearsalPrompt: 'Which rushed reply misses the chance to build lifelong media smarts?',
          instincts: [
            {
              id: 'buy',
              label: '“Ugh, fine—here’s $10 so you stop begging while I finish cooking!”',
              whyTitle: 'Why that’s so tempting—and what gets wired',
              whyText:
                'Ending frantic pleading feels relieving—yet teaches {name} that fake urgency works and fuels a bigger countdown plea next week.',
            },
            {
              id: 'snap',
              label: '“That’s a stupid waste of money! Stop asking me for dumb pixel pets!”',
              whyTitle: 'Why that’s so tempting—and why kids tune out',
              whyText:
                'Mocking something {pronoun} genuinely cares about shuts down trust—while teaming up to “spot the designer’s trick” feels cool and respectful.',
            },
          ],
          calmScriptPlain:
            '“Whoa, look at that flashing red countdown—that’s Trick #1 game companies use to make players panic-buy! Let’s spot how many tricks are on this screen together. In our house we skip mystery-chance eggs—if you want a game upgrade later, you can save allowance for something guaranteed.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'spot',
              text: 'Whoa, look at that flashing red countdown—that’s Trick #1 game companies use to make players panic-buy! Let’s spot how many tricks are on this screen together.',
              tag: 'Teammate Trick-Spotter',
              note: 'Recruits {possessive} pride—8-year-olds LOVE catching clever corporate tricks!',
            },
            { text: ' ' },
            {
              id: 'rule',
              text: 'In our house we skip mystery-chance eggs—if you want a game upgrade later, you can save allowance for something guaranteed.',
              tag: 'Zero-Gamble Guardrail',
              note: 'Draws a crisp line between fair upfront game purchases vs. rigged mystery boxes.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Turn off 1-click app-store purchasing & require parent password',
            'Disable open stranger text/voice chat in Roblox/Fortnite settings',
            'Translate virtual coins back into real dollars (“800 coins = $10, or two real scoops of ice cream!”)',
          ],
          pushbacks: [
            {
              id: 'ownmoney',
              label: '“Can I spend my OWN birthday money on mystery boxes?”',
              setup: 'Hold a clear family “No Mystery-Odds” policy while honoring real purchases:',
              script:
                '“Your birthday money is awesome—you can buy a full new game or a guaranteed item you actually see, just zero random mystery-chance spins.”',
            },
            {
              id: 'freegems',
              label: '“Someone in game chat offered me FREE Robux for my password!”',
              setup: 'Make reporting scammy chats 100% zero-trouble and praise {obj} like a hero:',
              script:
                '“100% classic scam! Nobody ever gives free coins for passwords—anytime someone messages weird offers, bring it straight to me with ZERO trouble and we’ll block them together.”',
            },
          ],
          advisorPrompt:
            '“Walk me through the 4 most important privacy and spending settings to lock down on Roblox or Nintendo Switch for a {ageShort}.”',
          beat4Kicker: 'This week’s 5-minute shield',
          beat4Title: 'Pick one easy digital-smarts move today',
          beat4Lead: 'Five minutes of curiosity beats years of financial and safety headaches.',
          moves: [
            {
              id: 'trickhunt',
              title: 'Play a 3-minute “Spot the Designer’s Trick” hunt beside {name}',
              desc: 'Look together for fake timers, daily-login streak guilts, and mystery boxes—make it a fun game!',
            },
            {
              id: 'lockpay',
              title: 'Verify parent-approval PIN is locked on every game store & chat',
              desc: 'Disable open stranger chat and set spending PINs cleanly once.',
            },
            {
              id: 'realprice',
              title: 'Translate virtual coins into real-world comparisons together',
              desc: '“Would you rather have one digital hat or a real Lego set you can hold?”',
            },
          ],
          closingNote:
            'When an eight-year-old laughs at a flashing countdown timer and says “Nice try, studio!”, you know you’ve built real internal wisdom no filter alone could match.',
          pocketInsight:
            'Pull back the curtain on loot boxes and fake countdowns like a teammate (“Spot the Trick!”), lock spending PINs, and ban mystery-chance purchases.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 3 · 3 min',
            mystery: '“How do you keep gaming from hijacking homework and outdoor play without constant nagging?”',
            title: 'Homework & Play Before Screens: A Neutral Daily Docking Routine',
            targetSlug: 'elementary-homework-first-digital-routine',
          },
          interactiveHighlights: ['10-Box Odds Check', 'Trick-Spotter Script'],
        },
      },
      {
        slug: 'elementary-homework-first-digital-routine',
        title: 'Homework & Play Before Screens: A Neutral Daily Docking Routine',
        readingMinutes: 3,
        audioDurationSeconds: 160,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.RHYTHM_RESET,
          illustration: EditorialIllustrationKey.clock_rhythm,
          illustrationCaption: 'Kitchen dock · Simple order beats daily nagging',
          headline: 'Homework & Play Before Screens: A Neutral Daily Docking Routine',
          deck: 'Why saying “You can game first if you promise to do homework later!” almost always ends in 7 PM tears—and the clean “When / Then” kitchen docking routine that runs itself.',
          sceneTime: '4:05 PM · LIVING ROOM',
          sceneBody:
            'You let {name} jump on the Switch “just for twenty minutes” right after school so {pronoun} could unwind. Now it’s 6:45 PM, homework still sits untouched in {poss} backpack, and getting {obj} to open a math sheet feels like climbing Everest. *Why is moving FROM gaming TO homework practically impossible?*',
          pollQuestion: 'Does gaming BEFORE responsibilities derail your evenings?',
          pollOptions: [
            {
              id: 'always',
              label: 'Yes—once screens turn on, nothing else gets done!',
              response:
                'Pure dopamine physics! Jumping from bright high-speed rewards down to a quiet black-and-white math sheet feels brutally boring—flipping the order fixes it overnight.',
            },
            {
              id: 'nag',
              label: 'I hate feeling like a nagging warden checking off tasks',
              response:
                'Putting controllers in one neutral kitchen dock paired with a 3-item checklist makes the ROUTINE the boss—not your voice!',
            },
          ],
          beat2Kicker: 'Installing the daily rhythm',
          beat2Title: 'The 4-step “Green Light” afternoon order',
          beat2Lead:
            'Letting screens come AFTER snack, outdoor/body play, and homework means {name} enjoys gaming 100% guilt-free—and you never nag at 7 PM again. Tap each beat below.',
          visualType: AlmanacVisualType.ROUTINE_TIMELINE,
          visualStageTitle: 'The 4-beat “Work & Play Before Screens” routine',
          visualStageHint: 'Tap each step to see evenings unlock smoothly',
          visualConfig: {
            steps: [
              {
                timeOrCue: 'Step 1 · 3:45 PM',
                label: 'Refuel First',
                title: 'Snack + 20 minutes of offline decompression',
                desc: 'Controllers stay calmly resting in the kitchen docking station while {name} eats and moves outside.',
                why: 'Refills energy without spiking high-speed screen dopamine prematurely.',
              },
              {
                timeOrCue: 'Step 2 · 4:15 PM',
                label: '3-Box Launch',
                title: 'Homework, empty lunchbox & 1 small chore',
                desc: 'A simple 3-box visual checklist on the fridge shows clearly when responsibilities are complete.',
                why: 'A rested afternoon brain finishes schoolwork twice as fast as a tired 7 PM brain.',
              },
              {
                timeOrCue: 'Step 3 · 4:45 PM',
                label: 'Green Light!',
                title: 'Unlocks guilt-free gaming window (e.g., 30–45 min)',
                desc: 'Once the 3 boxes are checked, {name} grabs the controller cleanly with zero hanging chores.',
                why: 'Transforms screens into a relaxed, earned wind-down—never a battleground.',
              },
              {
                timeOrCue: 'Step 4 · 5:30 PM',
                label: 'Back to Dock',
                title: 'Controllers return to the kitchen dock before dinner',
                desc: 'Charging stays outside bedrooms so dinner and sleep remain completely protected.',
                why: 'Neutral physical homes for gear eliminate nightly hiding or begging.',
              },
            ],
          },
          almanacTruth:
            'Never ask an 8-year-old brain to drop from high-speed gaming down into quiet math homework—put responsibilities and movement FIRST so gaming becomes pure, guilt-free fun.',
          scienceDeepDive:
            'Behavioral psychology’s Premack Principle confirms that placing lower-stimulation required tasks immediately prior to high-reward activities drastically increases autonomous follow-through while minimizing caregiver prompting and evening conflict.',
          beat3Kicker: 'Practice holding the “When / Then” line',
          beat3Title: 'Answer “Just 10 minutes first!” with calm warmth',
          rehearsalTriggerSpeaker: '{Name} reaching for the docked controller at 4:00 PM',
          rehearsalTriggerQuote: '“My brain is too tired for math—let me play ONE match first and I PROMISE I’ll do it right after!”',
          rehearsalPrompt: 'Which tired bargain breaks the entire evening?',
          instincts: [
            {
              id: 'promise',
              label: '“Okay, ONE match—but you BETTER not complain about math afterward!”',
              whyTitle: 'Why that’s so tempting—and why 5 PM turns rough',
              whyText:
                'Every kid truly means that promise at 4:00 PM! Yet twenty minutes of rapid gaming makes quiet math feel ten times harder afterward.',
            },
            {
              id: 'lecture',
              label: '“You broke that promise yesterday! Why can’t you be responsible?!”',
              whyTitle: 'Why that’s so tempting—and the lighter framing',
              whyText:
                'Skipping blame and leaning cheerfully on “Our Green-Light Order” keeps your tone calm and zero-drama.',
            },
          ],
          calmScriptPlain:
            '“Totally get that your brain needs a break before math! Let’s shoot hoops or take a 15-minute comic break first—controllers stay docked until the 3 Green-Light boxes are done, then you get your whole gaming time with zero nagging from me.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'honors',
              text: 'Totally get that your brain needs a break before math! Let’s shoot hoops or take a 15-minute comic break first',
              tag: 'Honors the Real Break Need',
              note: 'Offers a genuine offline brain-rest so {name} doesn’t feel pushed straight into homework.',
            },
            { text: '—' },
            {
              id: 'order',
              text: 'controllers stay docked until the 3 Green-Light boxes are done, then you get your whole gaming time with zero nagging from me.',
              tag: 'Neutral When/Then Order',
              note: 'Protects the sequence cleanly while promising zero hovering once earned.',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Use “When X is done, Then Y unlocks” instead of “No gaming until…”',
            'Keep one visible kitchen charging dock for controllers and tablets',
            'Never interrupt earned gaming time with surprise extra chores',
          ],
          pushbacks: [
            {
              id: 'nohw',
              label: '“What about days with zero homework?”',
              setup: 'Keep one fun offline anchor (20 min outdoor play or reading) in the Green-Light list so the rhythm stays steady:',
              script:
                '“Woohoo, zero homework day! Knock out 20 minutes of outdoor play and unpack your lunchbox, and green light is all yours.”',
            },
            {
              id: 'rushhw',
              label: '“{Name} scribbles messy homework in 2 minutes just to rush to screens!”',
              setup: 'Add a calm 30-second “Parent Quality Peek” as Box #3:',
              script:
                '“Let’s do a quick 30-second check together—once problems look clear and complete, controller unlocks cleanly!”',
            },
          ],
          advisorPrompt:
            '“Help me write a clean 3-box ‘Green-Light Checklist’ for my {ageShort}’s after-school routine before screens unlock.”',
          beat4Kicker: 'This week’s calm dock',
          beat4Title: 'Pick one simple move to make afternoons run themselves',
          beat4Lead: 'Set up the physical dock once and let the routine carry the weight.',
          moves: [
            {
              id: 'dockspot',
              title: 'Set up one neutral “Controller & Tablet Dock” on a kitchen shelf',
              desc: 'Charging happens in shared living space—never inside bedrooms.',
            },
            {
              id: 'fridge3',
              title: 'Write a 3-box “Green-Light List” on a dry-erase magnet together',
              desc: '1) Unpack lunchbox · 2) 20m outdoor/active break · 3) Homework check → Screens unlock!',
            },
            {
              id: 'whenthen',
              title: 'Swap “No screens until…” for “As soon as X is done, screens unlock!”',
              desc: 'Positive phrasing flips stubbornness into fast cooperation.',
            },
          ],
          closingNote:
            'When screens sit peacefully at the end of a clear, predictable afternoon rhythm, {name} learns self-management naturally—and your evenings get quiet again.',
          pocketInsight:
            'Dock controllers in the kitchen and run a 3-box “When / Then” Green-Light order (snack + movement + homework first) so gaming stays guilt-free.',
          nextEpisodeHook: {
            kicker: 'Up Next · Episode 4 · 3 min',
            mystery: '“How can a simple 1-page signed gaming agreement with an 8-year-old prevent years of future tech battles?”',
            title: 'Co-Writing {Possessive} First Family Gaming Agreement',
            targetSlug: 'elementary-bilateral-gaming-contract',
          },
          interactiveHighlights: ['4-Beat Green-Light Routine', 'When/Then Script'],
        },
      },
      {
        slug: 'elementary-bilateral-gaming-contract',
        title: 'Co-Writing {Possessive} First Family Gaming Agreement',
        readingMinutes: 3,
        audioDurationSeconds: 165,
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
        payload: {
          episodeRole: EpisodeRole.LONG_TERM_BOND,
          illustration: EditorialIllustrationKey.compass_teen,
          illustrationCaption: 'First gaming pact · Two-way signatures, zero guessing',
          headline: 'Co-Writing {Possessive} First Family Gaming Agreement',
          deck: 'Why unspoken gaming rules create endless moving goalposts—and how a cozy 1-page pact signed with real pens builds bilateral trust years before smartphones arrive.',
          sceneTime: '11:00 AM · SUNDAY KITCHEN TABLE',
          sceneBody:
            'Yesterday you felt relaxed and allowed an hour of Roblox; today you’re stressed so you snap “Off after 15 minutes!” {Name} explodes: “THAT’S NOT FAIR! You just make up rules whenever you’re mad!” *Honestly? {Pronoun} has a point—without a clear shared agreement, every day feels arbitrary.*',
          pollQuestion: 'Do gaming rules currently shift depending on how busy or tired you feel that day?',
          pollOptions: [
            {
              id: 'shifts',
              label: 'Yes—honestly it changes day by day!',
              response:
                'Every busy parent falls into ad-hoc screen calls! Putting 5 clear mutual promises on ONE fridge page—including YOUR promises as parent—brings instant calm predictability.',
            },
            {
              id: 'ready',
              label: 'Ready to co-sign a fair first gaming agreement together',
              response:
                'Co-signing a respectful pact at ages 7–9 builds the exact partnership muscle that makes tween phone pacts seamless later!',
            },
          ],
          beat2Kicker: 'Building bilateral trust early',
          beat2Title: 'Compare shifting parent decrees against a signed 2-way Family Pact',
          beat2Lead:
            'Kids ages 7–9 love fairness and official agreements! When BOTH parent and child sign real commitments (like “Parent gives a game-state warning instead of yelling”), follow-through jumps dramatically. Compare below.',
          visualType: AlmanacVisualType.HABIT_GUARDRAIL,
          visualStageTitle: 'Ad-hoc decrees vs. bilateral 1-page gaming pact',
          visualStageHint: 'Compare shifting rules with a signed two-way agreement',
          visualConfig: {
            willpowerLabel: 'Shifting Ad-Hoc Rules',
            willpowerTitle: 'Deciding limits on the fly based on mood',
            willpowerDesc:
              'Unwritten expectations make kids test constantly (“Maybe Mom is busy today and will give me an extra hour!”).',
            willpowerOutcome: 'Constant nagging, moving goalposts, and resentment.',
            guardrailLabel: '1-Page Bilateral Pact',
            guardrailTitle: '5 clear mutual clauses signed by BOTH parent & child',
            guardrailDesc:
              'Co-write hours, approved games, respectful voice, kitchen docking, AND parent promises—post it right beside the console.',
            guardrailOutcome: 'Point quietly to the signed page instead of arguing.',
            environmentShifts: [
              'Clause 1 (When & Where): Living room screens only, after Green-Light boxes, docked before dinner.',
              'Clause 2 (What & Who): Parent approves new games; voice/text chat stays friends-we-know-in-real-life only.',
              'Clause 3 (Parent Promise!): “I promise to give a game-state warning, never yank the cord mid-match, and play WITH you once a week!”',
            ],
          },
          almanacTruth:
            'A bilateral agreement—where YOU also sign promises like giving calm warnings and co-playing once a week—turns tech limits from top-down policing into a shared team contract.',
          scienceDeepDive:
            'Authoritative parenting research (Baumrind; Steinberg) and digital-citizenship frameworks (Heitner, Screenwise) demonstrate that transparent, co-constructed media agreements paired with parental co-engagement foster stronger internalized self-regulation than unilateral surveillance.',
          beat3Kicker: 'Practice drafting the pact together',
          beat3Title: 'Invite {name} to co-author the page on a calm Sunday morning',
          rehearsalTriggerSpeaker: 'Sitting down with a blank sheet and two markers on Sunday',
          rehearsalTriggerQuote: '“Ugh, a contract?! Does that mean you’re taking my games away?!”',
          rehearsalPrompt: 'Which framing immediately makes {name} defensive?',
          instincts: [
            {
              id: 'topdown',
              label: 'Slide over a typed list of 15 strict rules and demand a signature right now.',
              whyTitle: 'Why that’s so tempting—and why kids tune out',
              whyText:
                'A one-sided list of “Don’ts” feels like a prison sentence—zero buy-in, maximum loophole hunting.',
            },
            {
              id: 'skip',
              label: 'Avoid writing anything down so you don’t spark a disagreement.',
              whyTitle: 'Why that’s so tempting—and why written clarity is kinder',
              whyText:
                'Clear written agreements actually REDUCE arguments because nobody has to guess what’s coming.',
            },
          ],
          calmScriptPlain:
            '“Nope—it’s actually to PROTECT your gaming time so I stop changing the rules randomly! Let’s write our 5-line Gaming Agreement together—and you get to write TWO rules for ME too, like giving a calm last-round warning and playing Mario Kart with you on Fridays.”',
          calmScriptSegments: [
            { text: '“' },
            {
              id: 'protect',
              text: 'Nope—it’s actually to PROTECT your gaming time so I stop changing the rules randomly!',
              tag: 'Pro-Trust Frame',
              note: 'Flips instant suspicion into surprise and curiosity.',
            },
            { text: ' ' },
            {
              id: 'twoway',
              text: 'Let’s write our 5-line Gaming Agreement together—and you get to write TWO rules for ME too, like giving a calm last-round warning and playing Mario Kart with you on Fridays.',
              tag: 'True Two-Way Ownership',
              note: 'Giving {name} a real voice—including holding YOU accountable—makes {obj} guard the agreement proudly!',
            },
            { text: '”' },
          ],
          deliveryCues: [
            'Draft on a calm sunny weekend—NEVER right after a meltdown',
            'Keep it to 5 short lines on 1 page',
            'Sign with real pens and tape it near the TV or dock',
          ],
          pushbacks: [
            {
              id: 'breaksrule',
              label: '“What happens the first time {name} breaks a line on the pact?”',
              setup: 'Point gently to the page with zero yelling and treat it as a practice reset:',
              script:
                '“Let’s check Line 4 we both signed—remember our agreement on kind tone when turning off? Tomorrow we take a 1-day reset, then Thursday we’re right back on track.”',
            },
            {
              id: 'renegotiate',
              label: '“{Name} asks for weekend bonus time a few months later”',
              setup: 'Celebrate healthy negotiation! Review the pact calmly every 6 months:',
              script:
                '“Awesome job bringing that to me calmly instead of begging! Let’s schedule a 5-minute Pact Review on Saturday morning—showing steady docking all month earns bigger trust.”',
            },
          ],
          advisorPrompt:
            '“Help me draft a warm, 5-clause 1-page Family Gaming Agreement for my {ageShort} (including 2 parent promises!).”',
          beat4Kicker: 'This weekend’s 10-minute milestone',
          beat4Title: 'Pick one simple move to launch your bilateral pact',
          beat4Lead: 'Ten calm minutes today lay the trust track for the entire teen decade ahead.',
          moves: [
            {
              id: 'writepact',
              title: 'Draft & co-sign a 5-line Gaming Agreement with real pens this Sunday',
              desc: 'Include 3 kid commitments and 2 parent commitments—and post it right by the console.',
            },
            {
              id: 'coplay15',
              title: 'Schedule 15 minutes of side-by-side co-play this week',
              desc: 'Let {name} teach you {poss} favorite game—mentoring starts when you step into {poss} world.',
            },
            {
              id: 'pacttool',
              title: 'Explore Alongside’s Bilateral Family Pact builder when ready for devices',
              desc: 'This exact two-way trust muscle grows straight into smartphone agreements later.',
            },
          ],
          closingNote:
            'Signing a simple five-line gaming agreement beside your eight-year-old teaches something bigger than screen time: in this family, we keep our word to each other with respect.',
          pocketInsight:
            'Co-write a 5-line 1-page Gaming Agreement on a calm Sunday—including 2 parent promises (game-state warnings + weekly co-play)—and sign it with real pens.',
          nextEpisodeHook: null,
          interactiveHighlights: ['Bilateral Pact Flip', 'Two-Way Signing Script'],
        },
      },
    ],
  }),
];
