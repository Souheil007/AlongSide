# Parent Intelligence Academy — Zero-Bluff Curriculum Relevance Audit (All 40 Courses / 160 Lessons)
**Author:** Chief Technology Officer (CTO) & Product Design  
**Status:** Founder Review Gate (Phase 0 — Prerequisite to `PLAN-47` Content Authoring)  
**Target Spec:** [`docs/parent-intelligence-academy-interactive-almanac-v2-spec.md`](parent-intelligence-academy-interactive-almanac-v2-spec.md)  
**Source Audited:** [`packages/database/prisma/seed/academy.seed.ts`](../packages/database/prisma/seed/academy.seed.ts) & [`academyVideos.seed.ts`](../packages/database/prisma/seed/academyVideos.seed.ts)

---

## 1. Executive Summary & Audit Verdict

An exhaustive review of all **40 courses** and **160 lessons** across Alongside's 8 lifespan tiers (`Ages 0–18`) produced the following action summary:

| Metric | Current State (`academy.seed.ts`) | Target State (Post-Audit v2) |
| :--- | :---: | :---: |
| **Total Courses** | 40 (8 tiers × 5 categories) | **40** (all 8 tiers × 5 categories preserved, every title de-jargoned) |
| **Total Lessons** | 160 (forced 4 per course) | **143** (flexible **3 or 4 episodes** per course — **17 padded/duplicate/clinical lessons cut or merged**) |
| **Boilerplate Closing Notes** | 146 / 160 (91.3%) | **0 / 143 (0%)** — 100% bespoke closing notes enforced in CI |
| **Broken Template Variables** | 4 lessons (`"around  can test"`) | **0 / 143 (0%)** — verified by automated test |
| **Clinical / Triage Violations (SOU-86)** | 5 lessons | **0 / 143 (0%)** — reframed to non-clinical home comfort, habits & safety |
| **Academic / Textbook Jargon Titles** | 34 lessons | **0 / 143 (0%)** — rewritten into warm, human parent hooks |
| **Mismatched / Unsegmented Videos** | 3 critical mismatches (e.g., 138m Huberman, Trauma TED on Background TV, Deep Work on Distracted Driving) | **1 verified Master Talk per course** with **2–3 timestamp jump chips** |

### The 5-Point "Zero-Bluff" Gate Applied to Every Lesson
1. **Real Parent Need:** Solves a genuine recurring moment, worry, or high-leverage bonding opportunity for this exact age.
2. **Non-Clinical Boundary (SOU-86):** Zero medical triage, zero diagnostic screening, zero dosing.
3. **Flexible 3–4 Episode Honesty:** Never invent a weak 4th episode when 3 episodes cover the topic completely (`CUT_PADDING`).
4. **Human Headline, Science Inside Drawer:** Move clinical terms and theorist names (`Erikson`, `Csikszentmihalyi`, `Piaget`, `Anorexia`, `Nucleus Accumbens`) out of titles and into Beat 2's optional neuroscience drawer (`REFRAME_DEJARGON`).
5. **Visual & Interactive Fit:** Assign every surviving episode an exact `EpisodeRole`, `AlmanacVisualType`, and `EditorialIllustrationKey`.

### Legend
- **`KEEP_TAILOR`**: Strong real-world parent need; upgrade into bespoke 5-beat `AlmanacLessonPayload` + human headline polish.
- **`REFRAME_DEJARGON`**: Great underlying parent topic trapped in academic/textbook language; rewrite headline & flow in plain warm language.
- **`REFRAME_NON_CLINICAL`**: Violates SOU-86 clinical/triage boundary; reframe strictly into non-clinical home comfort, safety preparedness, and routine support.
- **`CUT_PADDING`**: Redundant or low-impact filler forced to reach 4 lessons; remove or fold key insight into an adjacent episode (tightening course to **3 sharp episodes**).

---

## 2. Critical Video Audit (`academyVideos.seed.ts` Fixes Required)

| Current Slug & Video | Audit Finding | Required Action in `PLAN-47` |
| :--- | :--- | :--- |
| `background-tv-and-acoustic-smog` → Dr. Nadine Burke Harris (*"How Childhood Trauma Affects Health"*, 16m) | **SEVERE TONE MISMATCH:** Comparing background TV in a living room to Adverse Childhood Experiences (ACEs) trauma triggers unnecessary parental guilt. | **REMOVE** from `digital-infant-zero-screens`; replace with Dr. Dimitri Christakis (*"Media and Children's Developing Brains"*, 14m) or keep course concise without mismatch. |
| `teen-zero-distracted-driving-pledge` → Cal Newport (*"Digital Minimalism & Deep Work"*, 44m) | **TOPIC MISMATCH:** Deep Work talk belongs to `play-teen-intellectual-mastery` (Study & Focus), NOT distracted driving. | **MOVE** Cal Newport to `play-teen-intellectual-mastery` with 3 timestamp jump chips (`2:15`, `14:40`, `28:10`). |
| `infant-safe-sleep-and-circadian-reset` → Huberman Lab (*"Protocols for Excellent Parenting"*, **138 min**) | **TOO LONG WITHOUT TIMESTAMPS:** 2h 18m embed intimidates exhausted new parents. | **SEGMENT** strictly with 3 curated 2–3 min timestamp jump chips (e.g., physiological sigh + circadian morning light) or swap for a crisp ≤15m pediatric sleep talk. |

---

## 3. Complete 40-Course Audit Matrix (Waves 1, 2 & 3)

---

### WAVE 1 — Flagship Launch: Ages 0–3 (15 Courses · 55 Surviving Episodes · 5 Padded Lessons Cut)

#### Tier 0A · Infancy (Ages 0–1) — 5 Courses (18 Episodes)

##### 1. `behavior-infant-coregulation` — **Calming Infant Crying & Reading Early Cues** *(4 Episodes · Art: `heart_bridge` · Master Talk: Dr. Harvey Karp, 12m)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `infant-somatic-soothing-sequence` · The 4-Step Somatic Soothing Sequence | `KEEP_TAILOR` | When {Name} Won’t Stop Crying at 6 PM | `FAST_WIN` | `BRAIN_BRIDGE` |
| 2 | `purple-crying-neurobiology` · The Neurobiology of PURPLE Crying | `REFRAME_DEJARGON` | Why Week-6 Evening Crying Isn’t Your Fault | `BRAIN_DECODER` | `LENS_EXPOSURE_MATRIX` |
| 3 | `infant-wake-windows-and-sleep-pressure` · Wake Windows & Sleep Pressure | `KEEP_TAILOR` | Catching Sleepy Cues Before the Overtired Spiral | `RHYTHM_RESET` | `CIRCADIAN_CURVE` |
| 4 | `serve-and-return-neural-architecture` · Serve-and-Return Attunement | `KEEP_TAILOR` | How Tiny Everyday Back-and-Forth Builds {Possessive} Brain | `LONG_TERM_BOND` | `SERVE_RETURN_LOOP` |

##### 2. `health-infant-sleep-foundations` — **Infant Sleep Rhythms & Restful Nights** *(3 Episodes · 1 Cut/Reframed · Art: `moon_bed`)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `infant-safe-sleep-and-circadian-reset` · Safe Sleep Standard & Circadian Reset | `KEEP_TAILOR` | Setting Up a Calm, Safe Nighttime Sleep Space | `FAST_WIN` | `ROUTINE_TIMELINE` |
| 2 | `four-month-sleep-regression-explained` · The 4-Month Sleep Shift | `KEEP_TAILOR` | Why {Name} Started Waking Every Hour Around Month Four | `BRAIN_DECODER` | `CIRCADIAN_CURVE` |
| 3 | `infant-temperature-and-fever-triage` · Pediatric Fever Triage | `REFRAME_NON_CLINICAL` | **REPLACE →** *Preparing for Sick Nights: Comfort Routines & Knowing When to Call Your Pediatrician* (`infant-sick-night-comfort-prep`) — strictly non-clinical home comfort + "always call your doctor for infants under 3 months" awareness, zero triage algorithms | `RHYTHM_RESET` | `ROUTINE_TIMELINE` |
| 4 | `infant-nocturnal-settling-routines` · Gentle Nocturnal Settling | `CUT_PADDING` | *Fold gentle 4-minute settling cues into Episode 1 so the course is 3 razor-sharp episodes with zero repetition.* | — | — |

##### 3. `nutrition-infant-first-foods` — **Starting Solids & Safe First Tastes** *(4 Episodes · Art: `plate`)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `early-allergen-introduction-science` · Critical 4–11 Month Allergen Window | `KEEP_TAILOR` | Introducing Peanut & Egg Safely Without Panic | `FAST_WIN` | `ROUTINE_TIMELINE` |
| 2 | `gagging-vs-choking-triage` · Gagging vs. Choking Triage | `REFRAME_NON_CLINICAL` | Why Gagging Is a Normal Learning Reflex *(plus safe food prep & infant CPR readiness — remove "Triage")* | `BRAIN_DECODER` | `SENSORY_LADDER` |
| 3 | `baby-led-weaning-vs-purees` · Baby-Led Weaning vs. Purées | `KEEP_TAILOR` | Purées, Finger Foods, or Both? Picking What Fits Your Family | `RHYTHM_RESET` | `SENSORY_LADDER` |
| 4 | `foods-to-avoid-in-infancy` · Strict Prohibitions: Honey, Cow's Milk & Hazards | `KEEP_TAILOR` | First-Year Kitchen Safety: What Waits Until Age One | `LONG_TERM_BOND` | `HABIT_GUARDRAIL` |

##### 4. `play-infant-sensory-language` — **First Sounds, Tummy Time & Sensory Play** *(4 Episodes · Art: `blocks_play` · Master Talk: Prof. Alison Gopnik, 18m)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `tummy-time-without-tears` · Tummy Time Without Tears | `KEEP_TAILOR` | Tummy Time {Name} Actually Enjoys (2 Minutes at a Time) | `FAST_WIN` | `ROUTINE_TIMELINE` |
| 2 | `vocal-echo-and-first-sounds` · The Vocal Echo Game: Igniting Broca's Area | `REFRAME_DEJARGON` | Turning Coos & Babbles Into {Possessive} First Conversations | `BRAIN_DECODER` | `SERVE_RETURN_LOOP` |
| 3 | `somatosensory-tactile-exploration` · Somatosensory Tactile Play | `REFRAME_DEJARGON` | Everyday Household Play (No Expensive Toys Required) | `RHYTHM_RESET` | `SENSORY_LADDER` |
| 4 | `puppet-sparring-and-joint-attention` · Puppet Sparring & Joint Attention | `REFRAME_DEJARGON` | Peek-a-Boo & Shared Giggles: How Social Connection Starts | `LONG_TERM_BOND` | `SERVE_RETURN_LOOP` |

##### 5. `digital-infant-zero-screens` — **Protecting Infant Focus in a Phone-Filled World** *(3 Episodes · 1 Cut · Art: `device_dock`)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `parental-technoference-and-still-face` · Technoference & The Digital Still-Face | `REFRAME_DEJARGON` | What {Name} Notices When Our Phone Buzzes Nearby | `FAST_WIN` | `SERVE_RETURN_LOOP` |
| 2 | `background-tv-and-acoustic-smog` · The Background TV Sweep | `REFRAME_DEJARGON` | Why Quiet Background Moments Boost Early Words | `BRAIN_DECODER` | `HABIT_GUARDRAIL` |
| 3 | `sensory-hyperstimulation-and-dopamine` · Why 'Baby Educational Videos' Trigger Meltdowns | `KEEP_TAILOR` | Do "Baby Learning Videos" Actually Work? (And What Helps Relatives Understand) | `RHYTHM_RESET` | `LENS_EXPOSURE_MATRIX` |
| 4 | `video-chatting-exception-and-relatives` · The Video Chatting Exception | `CUT_PADDING` | *Fold the 2-sentence FaceTime-with-grandparents exception directly into Episode 3 — no standalone lesson bluffing.* | — | — |

---

#### Tier 0B · Younger Toddler (Ages 1–2) — 5 Courses (19 Episodes)

##### 6. `behavior-toddler-tantrums-co-regulation` — **Big Toddler Feelings, Biting & Calm Anchoring** *(4 Episodes · Art: `cup` · Master Talk: Dr. Daniel Siegel, 7m)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `toddler-floor-level-vagal-grounding` · Floor-Level Vagal Grounding Protocol | `REFRAME_DEJARGON` | What to Do in the First 10 Seconds of a Toddler Meltdown | `FAST_WIN` | `BRAIN_BRIDGE` |
| 2 | `toddler-amygdala-without-brakes` · The Toddler Amygdala: Why 18-Month-Olds Cannot Reason | `REFRAME_DEJARGON` | Why Logic Doesn’t Work Mid-Tantrum (Gas Pedal vs. Brakes) | `BRAIN_DECODER` | `BRAIN_BRIDGE` |
| 3 | `toddler-halt-metabolic-audit` · The HALT Metabolic & Sensory Routine | `REFRAME_DEJARGON` | Catching Meltdowns Early: Hunger, Tiredness & Overload | `RHYTHM_RESET` | `ROUTINE_TIMELINE` |
| 4 | `toddler-biting-hitting-redirect` · Transforming Biting & Hitting into Connection | `KEEP_TAILOR` | Staying Calm and Firm When {Name} Hits or Bites | `LONG_TERM_BOND` | `SERVE_RETURN_LOOP` |

##### 7. `health-toddler-sleep-and-nap-transitions` — **Toddler Nap Drops & Peaceful Bedtimes** *(3 Episodes · 1 Cut/Reframed · Art: `moon_bed`)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `toddler-two-to-one-nap-bridge` · The 2-to-1 Nap Transition Bridge | `KEEP_TAILOR` | Moving From Two Naps to One Without 5 PM Crashes | `FAST_WIN` | `CIRCADIAN_CURVE` |
| 2 | `toddler-cortisol-separation-sleep-neurobiology` · Separation Anxiety & Sleep Cortisol | `REFRAME_DEJARGON` | Why Bedtime Suddenly Feels Scary at 15–18 Months | `BRAIN_DECODER` | `LENS_EXPOSURE_MATRIX` |
| 3 | `toddler-cot-containment-and-winddown` · Safe Sleep Spaces & 4-Step Wind-Down | `KEEP_TAILOR` | A Predictable 15-Minute Bedtime Rhythm That Sticks | `RHYTHM_RESET` | `ROUTINE_TIMELINE` |
| 4 | `toddler-illness-recovery-and-hydration` · Pediatric Illness Protocol & Respiratory Triage | `CUT_PADDING` | **CUT (SOU-86 Clinical Triage Violation):** Keep this course 100% focused on toddler sleep & bedtime mastery (3 crisp episodes). | — | — |

##### 8. `nutrition-toddler-table-manners-picky-eaters` — **Toddler Appetite Shifts & Highchair Peace** *(4 Episodes · Art: `plate`)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `toddler-division-of-responsibility` · Ellyn Satter's Division of Responsibility | `REFRAME_DEJARGON` | Who Decides What (and How Much): Ending Highchair Battles | `FAST_WIN` | `HABIT_GUARDRAIL` |
| 2 | `toddler-physiological-anorexia-neurobiology` · Physiological Toddler Anorexia | `REFRAME_DEJARGON` | Why {Name} Suddenly Lives on Air and Three Berries *(removes scary clinical term "Anorexia")* | `BRAIN_DECODER` | `LENS_EXPOSURE_MATRIX` |
| 3 | `toddler-food-throwing-deescalation` · The 'No Throwing' Routine *(broken var)* | `KEEP_TAILOR` | Stopping Food Throwing Without Turning Dinner Into a Show | `RHYTHM_RESET` | `SERVE_RETURN_LOOP` |
| 4 | `toddler-nutritional-gateways-iron-fats` · Iron & Healthy Fats Scaffolding | `REFRAME_DEJARGON` | Simple Brain-Fuel Pairings for Tiny Toddler Tummies | `LONG_TERM_BOND` | `SENSORY_LADDER` |

##### 9. `play-toddler-locomotion-and-sensory-bins` — **First Words, Climbing & Busy Hands** *(4 Episodes · Art: `blocks_play` · Master Talk: Dr. Ross Greene, 11m)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `toddler-climbing-crash-pad` · The Indoor Climbing Zone | `KEEP_TAILOR` | Channeling Constant Climbing Safely (Without Saying "No" All Day) | `FAST_WIN` | `HABIT_GUARDRAIL` |
| 2 | `toddler-vestibular-proprioception-neurobiology` · Vestibular & Proprioceptive Systems | `REFRAME_DEJARGON` | Why Toddlers Crave Pushing, Lifting & Spinning ("Heavy Work") | `BRAIN_DECODER` | `BRAIN_BRIDGE` |
| 3 | `toddler-sensory-tub-routine` · The 10-Minute Sensory Tub Routine | `KEEP_TAILOR` | Easy 10-Minute Water & Kitchen Play That Buys You Dinner Prep Time | `RHYTHM_RESET` | `ROUTINE_TIMELINE` |
| 4 | `toddler-first-words-language-burst` · Scaffolding the 50-Word Burst | `KEEP_TAILOR` | Sparking First Words Naturally (Without Quizzing "Say Apple!") | `LONG_TERM_BOND` | `SERVE_RETURN_LOOP` |

##### 10. `digital-toddler-screen-tantrums-and-coping` — **Calm Screen Limits & Phone-Snatching Peace** *(4 Episodes · Art: `device_dock` · Master Talk: Dr. Dimitri Christakis, 14m)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `toddler-screen-transition-stoplight` · The 2-Minute Visual Stoplight | `KEEP_TAILOR` | Turning Off the Screen Without a Meltdown | `FAST_WIN` | `ROUTINE_TIMELINE` |
| 2 | `toddler-video-deficit-effect` · The Video Deficit Effect | `REFRAME_DEJARGON` | Why Toddlers Learn Words From Faces, Not Tablets | `BRAIN_DECODER` | `SERVE_RETURN_LOOP` |
| 3 | `toddler-screen-free-bedroom-audit` · The Screen-Free Bedroom Sanctuary | `KEEP_TAILOR` | Protecting Evening Calm With Screen-Free Zones | `RHYTHM_RESET` | `HABIT_GUARDRAIL` |
| 4 | `toddler-phone-snatching-response` · Responding to Phone Snatching | `KEEP_TAILOR` | What to Do When {Name} Grabs for Your Phone in Public | `LONG_TERM_BOND` | `BRAIN_BRIDGE` |

---

#### Tier 0C · Older Toddler (Ages 2–3) — 5 Courses (18 Episodes)

##### 11. `behavior-older-toddler-defiance-boundaries` — **Navigating "NO!", Transitions & Warm Limits** *(4 Episodes · Art: `cup` · Master Talk: Dr. Laura Markham, 12m)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `older-toddler-two-choice-autonomy` · The 2-Choice Autonomy Offer | `KEEP_TAILOR` | The Two-Choice Shift That Melts Instant Power Struggles | `FAST_WIN` | `HABIT_GUARDRAIL` |
| 2 | `older-toddler-erikson-autonomy-vs-shame` · Erikson's Autonomy vs. Shame | `REFRAME_DEJARGON` | Why Everything Is "NO!" at Age Two (And Why It’s Healthy) | `BRAIN_DECODER` | `BRAIN_BRIDGE` |
| 3 | `older-toddler-visual-transition-ladders` · Visual Transition Ladders | `KEEP_TAILOR` | Leaving the Playground Without Carrying a Screaming Toddler | `RHYTHM_RESET` | `ROUTINE_TIMELINE` |
| 4 | `older-toddler-repair-after-rupture` · Loving Containment & Repair | `KEEP_TAILOR` | Holding Firm Limits Without Shame (And Repairing When You Lose Cool) | `LONG_TERM_BOND` | `SERVE_RETURN_LOOP` |

##### 12. `health-older-toddler-toilet-and-bedtime` — **Potty Learning, Night Waking & Daily Hygiene** *(4 Episodes · Art: `moon_bed` · Master Talk: Dr. Becky Kennedy, 15m)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `older-toddler-toilet-readiness-test` · Low-Pressure Toilet Readiness Test | `KEEP_TAILOR` | Potty Learning Without Bribes, Sticker Charts, or Power Struggles | `FAST_WIN` | `HABIT_GUARDRAIL` |
| 2 | `older-toddler-night-terrors-vs-nightmares` · Night Terrors vs. Nightmares | `REFRAME_DEJARGON` | Nightmares vs. Night Terrors: Knowing Which One You’re Seeing at 1 AM | `BRAIN_DECODER` | `CIRCADIAN_CURVE` |
| 3 | `older-toddler-big-bed-transition` · The Big Bed Transition | `KEEP_TAILOR` | Moving to a Big-Kid Bed Without 12 Curtain Calls | `RHYTHM_RESET` | `ROUTINE_TIMELINE` |
| 4 | `older-toddler-somatic-hygiene-routines` · Tooth Brushing & Handwashing Peace | `KEEP_TAILOR` | Making Toothbrushing Playful Instead of a Wrestling Match | `LONG_TERM_BOND` | `SERVE_RETURN_LOOP` |

##### 13. `nutrition-older-toddler-independence-and-snacking` — **Toddler Mealtimes Without Battles** *(4 Episodes · Art: `plate` / `leaf` · Master Talk: Dr. Becky Kennedy TED, 14m)* *(Matches `indexv2.html`!)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `older-toddler-one-safe-food-rule` · The 'One Safe Food' Rule *(broken var)* | `KEEP_TAILOR` | Why {Name} Suddenly Only {Eats} Beige Food | `FAST_WIN` | `SENSORY_LADDER` |
| 2 | `older-toddler-food-neophobia-evolution` · Food Neophobia: Bitter Toxins | `REFRAME_DEJARGON` | The Ancient Survival Instinct Behind the "Beige Phase" | `BRAIN_DECODER` | `LENS_EXPOSURE_MATRIX` |
| 3 | `older-toddler-scheduled-snack-windows` · Scheduled Snack Windows | `KEEP_TAILOR` | Closing the Kitchen Between Snacks to Bring Back Dinner Appetite | `RHYTHM_RESET` | `ROUTINE_TIMELINE` |
| 4 | `older-toddler-kitchen-sensory-exploration` · Sensory Food Bridges | `KEEP_TAILOR` | Tiny Sous-Chef: Low-Pressure Kitchen Play That Sparks Tasting | `LONG_TERM_BOND` | `SENSORY_LADDER` |

##### 14. `play-older-toddler-symbolic-play-and-blocks` — **Independent Play, Books & First Friendships** *(3 Episodes · 1 Cut · Art: `blocks_play` · Master Talk: Dr. Jack Shonkoff, 6m)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `older-toddler-open-ended-blocks` · The Open-Ended Block Challenge | `KEEP_TAILOR` | Sparking 20 Minutes of Independent Play With Simple Blocks | `FAST_WIN` | `ROUTINE_TIMELINE` |
| 2 | `older-toddler-daily-story-immersion` · Dialogic Storybook Reading | `REFRAME_DEJARGON` | Turning Bedtime Stories Into Vocabulary & Empathy Gold | `BRAIN_DECODER` | `SERVE_RETURN_LOOP` |
| 3 | `older-toddler-parallel-to-cooperative-play` · Parallel to Cooperative Play | `KEEP_TAILOR` | Playdates at Age Two: Navigating Toy Grabbing & First Friends | `LONG_TERM_BOND` | `LENS_EXPOSURE_MATRIX` |
| 4 | `older-toddler-symbolic-representation-brain` · Symbolic Play & Object Substitution | `CUT_PADDING` | *Fold the "cardboard box = rocket ship" brain insight directly into Episode 1 so the course is 3 high-utility episodes.* | — | — |

##### 15. `digital-older-toddler-audiobooks-and-co-viewing` — **Calm Shows, Audio Stories & Screen Peace** *(3 Episodes · 1 Cut · Art: `device_dock`)*
| # | Current Slug & Title | Verdict | New Human Almanac Headline | Role | Visual Model |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `older-toddler-slow-paced-media-audit` · Slow-Paced Media Audit | `KEEP_TAILOR` | Why Some Shows Leave {Name} Wired (And How to Pick Calm Ones) | `FAST_WIN` | `LENS_EXPOSURE_MATRIX` |
| 2 | `older-toddler-audio-stories-routine` · Audiobooks & Tonieboxes | `KEEP_TAILOR` | Audio Stories: Screen-Free Quiet Time That Actually Works | `RHYTHM_RESET` | `ROUTINE_TIMELINE` |
| 3 | `older-toddler-co-viewing-dialogue` · Active Co-Viewing Protocol | `KEEP_TAILOR` | Turning Occasional Screen Time Into Shared Connection | `LONG_TERM_BOND` | `SERVE_RETURN_LOOP` |
| 4 | `older-toddler-orienting-reflex-overload` · Orienting Reflex Overload | `CUT_PADDING` | *Duplicates Episode 1's fast-cut brain science — merge its visual mechanism into Episode 1's Beat 2.* | — | — |

---

### WAVE 2 — Childhood: Ages 4–9 (10 Courses · 35 Surviving Episodes · 5 Padded Lessons Cut/Merged)

#### Tier 1 · Early Childhood (Ages 4–6) — 5 Courses (18 Episodes)

| Course | Surviving Episodes (Verdicts & De-Jargoned Headlines) | Cuts / Reframes | Master Talk |
| :--- | :--- | :--- | :--- |
| **16. `behavior-preschool-feelings`**<br/>*Preschool Big Feelings, Sharing & Siblings* | 1. **Putting Words to Big Feelings Before They Explode** (`FAST_WIN` · `BRAIN_BRIDGE`)<br/>2. **Why Sharing Feels Impossible at Age Four** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `LENS_EXPOSURE_MATRIX`)<br/>3. **Ending the 10-Excuse Bedtime Stall** (`RHYTHM_RESET` · `ROUTINE_TIMELINE`)<br/>4. **Coaching Siblings Through Fights Without Playing Judge** (`LONG_TERM_BOND` · `SERVE_RETURN_LOOP`) | 0 cut — all 4 are daily preschool pain points | — |
| **17. `health-preschool-immunity`**<br/>*Preschool Rest, Quiet Time & Sick-Day Comfort* | 1. **Dropping the Final Nap: Installing a Daily Quiet Hour** (`FAST_WIN` · `CIRCADIAN_CURVE`)<br/>2. **Why 8–10 Daycare Colds a Year Is Normal (Building Calm Routines)** (`BRAIN_DECODER` · `LENS_EXPOSURE_MATRIX`)<br/>3. **Sick-Day Comfort & Easy Preventive Habits (Teeth, Eyes, Sleep)** (`REFRAME_NON_CLINICAL` · `RHYTHM_RESET` · `ROUTINE_TIMELINE`) | **1 merged (`preschool-daycare-viral-comfort` + `preventive-wellness`)** → 3 crisp non-clinical episodes | — |
| **18. `nutrition-preschool-picky-eating`**<br/>*Preschool Sweets, Texture Sensitivity & Family Meals* | 1. **Serving Dessert Without Turning Sweets Into an Obsession** (`FAST_WIN` · `HABIT_GUARDRAIL`)<br/>2. **Why Textures & Mixed Foods Feel Overwhelming at Age Five** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `SENSORY_LADDER`)<br/>3. **Family-Style Bowls: Ending Short-Order Cooking for Good** (`RHYTHM_RESET` · `ROUTINE_TIMELINE`)<br/>4. **Playful Taste Adventures Without Dinner Pressure** (`LONG_TERM_BOND` · `LENS_EXPOSURE_MATRIX`) | 0 cut — all 4 address real 4–6 eating friction | — |
| **19. `play-preschool-executive-function`**<br/>*Self-Control Games, Outdoor Play & School Readiness* | 1. **Freeze Dance & Stop-Go Games That Build Real Self-Control** (`FAST_WIN` · `BRAIN_BRIDGE`)<br/>2. **Why Pretend Play Beats Worksheets for Kindergarten Readiness** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `SERVE_RETURN_LOOP`)<br/>3. **Outdoor Loose-Parts Play & Fine-Motor Prep (Sticks, Clay, Scissors)** (`LONG_TERM_BOND` · `ROUTINE_TIMELINE`) | **1 merged (`nature-loose-parts` + `fine-motor`)** → 3 tight episodes | Dr. Carol Dweck (*Growth Mindset*, 10m) |
| **20. `digital-preschool-media-curation`**<br/>*Ending "One More Episode" & Screen-Free Zones* | 1. **The Timer Pact That Ends "Just One More Episode!"** (`FAST_WIN` · `HABIT_GUARDRAIL`)<br/>2. **How Kids' Apps Are Engineered to Keep Little Eyes Hooked** (`BRAIN_DECODER` · `LENS_EXPOSURE_MATRIX`)<br/>3. **Screen-Free Meals & Bedrooms (Without Feeling Like the Bad Guy)** (`RHYTHM_RESET` · `ROUTINE_TIMELINE`)<br/>4. **The 5-Minute Bridge: Moving From Screens Back to Real Play** (`LONG_TERM_BOND` · `SERVE_RETURN_LOOP`) | 0 cut — high daily urgency | Jonathan Haidt (*Screens & Childhood*, 22m — 3 jump chips) |

#### Tier 2 · Middle Childhood (Ages 7–9) — 5 Courses (17 Episodes)

| Course | Surviving Episodes (Verdicts & De-Jargoned Headlines) | Cuts / Reframes | Master Talk |
| :--- | :--- | :--- | :--- |
| **21. `behavior-elementary-impulses`**<br/>*After-School Restraint Collapse, Siblings & Repair* | 1. **Why {Name} Falls Apart at 4 PM Right After School** (`FAST_WIN` · `ROUTINE_TIMELINE`)<br/>2. **Why Impulse Control Still Slips at Age Eight** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `BRAIN_BRIDGE`)<br/>3. **Sibling "That’s Not Fair!" Fights Without Keeping Score** *(fixes broken var)* (`RHYTHM_RESET` · `HABIT_GUARDRAIL`)<br/>4. **Natural Repair After Mistakes (Instead of Grounding & Lectures)** (`LONG_TERM_BOND` · `SERVE_RETURN_LOOP`) | 0 cut — every single one is peak 7–9 family life | — |
| **22. `health-elementary-wellness`**<br/>*10-Hour Sleep, Growing Pains & Stress Signals* | 1. **Reclaiming the 10-Hour School-Night Sleep Bank** (`FAST_WIN` · `CIRCADIAN_CURVE`)<br/>2. **Evening "Growing Pains" & 60 Minutes of Daily Outdoor Light** (`BRAIN_DECODER` · `ROUTINE_TIMELINE`)<br/>3. **When Worry Shows Up as Headaches & Tummy Aches Before School** (`LONG_TERM_BOND` · `BRAIN_BRIDGE`) | **1 merged (`growing-pains` + `outdoor-play`)** → 3 sharp episodes | — |
| **23. `nutrition-elementary-fuel`**<br/>*School-Day Focus Fuel & Balanced Lunchboxes* | 1. **The Protein Morning Launch That Stops the 10 AM Focus Crash** (`FAST_WIN` · `CIRCADIAN_CURVE`)<br/>2. **Partnering on a 3-Color Lunchbox {Name} Actually Eats** (`RHYTHM_RESET` · `SENSORY_LADDER`)<br/>3. **Raising a Kid Who Feels Calm Around Birthday Cake & Treats** (`LONG_TERM_BOND` · `HABIT_GUARDRAIL`) | **1 merged (`glycemic-index` brain insight folded into Ep. 1 Beat 2)** → 3 crisp episodes | — |
| **24. `play-elementary-logic-maker`**<br/>*Boredom Tolerance, Board Games & Intrinsic Reading* | 1. **Screen-Free Maker Challenges That Beat "I’m Bored!"** (`FAST_WIN` · `ROUTINE_TIMELINE`)<br/>2. **Board Game Night: Coaching Graceful Losing & Strategy** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `SERVE_RETURN_LOOP`)<br/>3. **Building a Cozy Reading Habit Without Turning Books Into Homework** (`LONG_TERM_BOND` · `HABIT_GUARDRAIL`) | **1 cut (`parietal-cortex-spatial-logic` — academic padding folded into Ep. 2 Beat 2)** → 3 crisp episodes | Dr. Angela Duckworth (*Grit*, 6m) |
| **25. `digital-elementary-first-gaming`**<br/>*First Video Games, Gaming Rage & Family Agreements* | 1. **The 5-Minute Landing Strip That Stops Post-Game Rage** (`FAST_WIN` · `BRAIN_BRIDGE`)<br/>2. **Why Roblox & Loot Boxes Feel Like Slot Machines to an 8-Year-Old** (`BRAIN_DECODER` · `LENS_EXPOSURE_MATRIX`)<br/>3. **Homework & Play Before Screens: A Neutral Daily Docking Routine** *(fixes broken var)* (`RHYTHM_RESET` · `ROUTINE_TIMELINE`)<br/>4. **Co-Writing {Possessive} First Family Gaming Agreement** (`LONG_TERM_BOND` · `HABIT_GUARDRAIL`) | 0 cut — flagship Alongside core topic | Dr. Devorah Heitner (*Mentoring Over Monitoring*, 16m) |

---

### WAVE 3 — Pre-Teen & Teen: Ages 10–18 (15 Courses · 53 Surviving Episodes · 7 Padded/Duplicate Lessons Cut/Merged)

#### Tier 3 · Pre-Teen (Ages 10–12) — 5 Courses (20 Episodes — Peak Tween Relevance)

| Course | Surviving Episodes (Verdicts & De-Jargoned Headlines) | Cuts / Reframes | Master Talk |
| :--- | :--- | :--- | :--- |
| **26. `behavior-tween-adrenarche`**<br/>*Eye-Rolls, Mood Swings & Staying Close to Your Tween* | 1. **Staying Steady When Sarcasm & Eye-Rolls Start** (`FAST_WIN` · `BRAIN_BRIDGE`)<br/>2. **Why Mood Swings Spike at Age 10 (Before Visible Puberty)** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `LENS_EXPOSURE_MATRIX`)<br/>3. **The Car-Ride Secret: Why Side-by-Side Talks Unlock Tweens** (`RHYTHM_RESET` · `SERVE_RETURN_LOOP`)<br/>4. **Repairing Warmth After Slammed Doors** (`LONG_TERM_BOND` · `HABIT_GUARDRAIL`) | 0 cut — massive daily parent pain | Dr. Sarah-Jayne Blakemore (*Adolescent Brain*, 14m) |
| **27. `health-tween-circadian-leaps`**<br/>*Tween Sleep Shifts, Hygiene Dignity & Sports Recovery* | 1. **Why {Name} Suddenly Can’t Fall Asleep at 9 PM Anymore** (`FAST_WIN` · `CIRCADIAN_CURVE`)<br/>2. **The 2-Hour Evening Wind-Down That Works With Puberty** (`RHYTHM_RESET` · `ROUTINE_TIMELINE`)<br/>3. **Talking About Deodorant & Skin Care Without Shame** (`LONG_TERM_BOND` · `SERVE_RETURN_LOOP`)<br/>4. **Protecting Growing Bones & Hydration in Youth Sports** (`BRAIN_DECODER` · `HABIT_GUARDRAIL`) | 0 cut — practical, high-impact | Dr. Lisa Damour (*Emotional Shock Absorber*, 48m — 3 jump chips) |
| **28. `nutrition-tween-growth-spurts`**<br/>*Ravenous Growth Spurts, Body Neutrality & First Meals* | 1. **Why {Name} Is Suddenly Raiding the Pantry at 9 PM** (`FAST_WIN` · `ROUTINE_TIMELINE`)<br/>2. **The Growth-Spurt Appetite Surge (Normalizing Big Hunger)** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `CIRCADIAN_CURVE`)<br/>3. **Body-Neutral Table Talk: Protecting Self-Esteem Early** (`RHYTHM_RESET` · `SERVE_RETURN_LOOP`)<br/>4. **Three Real Meals Every 12-Year-Old Can Cook With Pride** (`LONG_TERM_BOND` · `SENSORY_LADDER`) | 0 cut — deeply relevant | — |
| **29. `play-tween-flow-hobbies`**<br/>*Real-World Passions, Quitting & Deep Focus* | 1. **Helping {Name} Find a Real-World Hobby (Without Pushing)** (`FAST_WIN` · `HABIT_GUARDRAIL`)<br/>2. **Why Tweens Want to Quit Right Before They Get Good** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `LENS_EXPOSURE_MATRIX`)<br/>3. **Navigating Team Dynamics, Coaches & Peer Pressure** (`RHYTHM_RESET` · `SERVE_RETURN_LOOP`)<br/>4. **Protecting Real Focus in a Distracted World** (`REFRAME_DEJARGON` · `LONG_TERM_BOND` · `ROUTINE_TIMELINE`) | 0 cut — de-jargoned (`Csikszentmihalyi` moved to science drawer) | — |
| **30. `digital-tween-smartphone-pacts`**<br/>*First-Phone Readiness, Group Chats & Bilateral Pacts* | 1. **Is {Name} Actually Ready for a First Smartphone?** (`FAST_WIN` · `HABIT_GUARDRAIL`)<br/>2. **Group Chats, Left-on-Read & Tween FOMO** (`BRAIN_DECODER` · `LENS_EXPOSURE_MATRIX`)<br/>3. **The 8:30 PM Central Charging Dock (Neutral House Law)** (`RHYTHM_RESET` · `ROUTINE_TIMELINE`)<br/>4. **Co-Signing a Bilateral Family Phone Pact Together** (`LONG_TERM_BOND` · `SERVE_RETURN_LOOP`) | 0 cut — core Alongside flagship course | Drs. Weinstein & James (*Behind Their Screens*, 52m — 3 jump chips) |

#### Tier 4 · Early Adolescence (Ages 13–15) — 5 Courses (17 Episodes)

| Course | Surviving Episodes (Verdicts & De-Jargoned Headlines) | Cuts / Reframes | Master Talk |
| :--- | :--- | :--- | :--- |
| **31. `behavior-adolescent-identity`**<br/>*Defusing Teen Pushback, Risk & Mutual Trust* | 1. **Validate First, Problem-Solve Second: Defusing 60-Second Blowups** (`FAST_WIN` · `BRAIN_BRIDGE`)<br/>2. **Why Smart 14-Year-Olds Still Take Impulsive Risks Around Friends** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `LENS_EXPOSURE_MATRIX`)<br/>3. **Co-Created House Rules Teens Actually Respect** (`RHYTHM_RESET` · `HABIT_GUARDRAIL`)<br/>4. **Rebuilding Trust After a Broken Rule (Without Grudges)** (`LONG_TERM_BOND` · `SERVE_RETURN_LOOP`) | 0 cut — peak 13–15 value | Dr. Laurence Steinberg (*Peer Multiplier*, 62m — 3 jump chips) |
| **32. `health-adolescent-sleep-protection`**<br/>*Teen Sleep Debt, Nightstand Boundaries & Stress Recovery* | 1. **Keeping Phones Out of Teen Bedrooms Without a War** (`FAST_WIN` · `HABIT_GUARDRAIL`)<br/>2. **How Chronic Sleep Debt Mimics Anxiety & Mood Disorders** (`BRAIN_DECODER` · `CIRCADIAN_CURVE`)<br/>3. **Everyday Stress Recovery: Breath, Movement & Sports Rest Days** (`REFRAME_NON_CLINICAL` · `RHYTHM_RESET` · `ROUTINE_TIMELINE`) | **1 cut/reframed (`adolescent-concussion-and-overuse-triage` removed as clinical triage; rest-day recovery merged into Ep. 3)** → 3 crisp episodes | Dr. Matthew Walker (*How Teenagers Sleep*, 12m) |
| **33. `nutrition-adolescent-sports-fuel`**<br/>*Teen Energy, Body Confidence & Ditching Energy Drinks* | 1. **Ditching Energy Drinks & Afternoon Caffeine Crashes** (`FAST_WIN` · `CIRCADIAN_CURVE`)<br/>2. **Fueling Active Teens & Growth Spurts (Iron, Protein & Real Snacks)** (`BRAIN_DECODER` · `ROUTINE_TIMELINE`)<br/>3. **Protecting Healthy Body Image & Spotting When to Reach Out for Help** (`REFRAME_NON_CLINICAL` · `LONG_TERM_BOND` · `SERVE_RETURN_LOOP`) | **1 merged (`post-workout-recovery` + `bone-density-iron` merged; `eating-disorder-red-flags` reframed from clinical screening to supportive family conversation + professional referral)** → 3 episodes | — |
| **34. `play-adolescent-critical-thinking`**<br/>*Healthy Debate, Passion Projects & Mentors* | 1. **Turning Teen Arguments Into Respectful Dinner Debates** (`FAST_WIN` · `SERVE_RETURN_LOOP`)<br/>2. **Backing Self-Directed Passion Projects Without Taking Over** (`RHYTHM_RESET` · `HABIT_GUARDRAIL`)<br/>3. **Why One Trusted Non-Parent Adult Mentor Changes Everything** (`LONG_TERM_BOND` · `LENS_EXPOSURE_MATRIX`) | **1 cut (`adolescent-metacognition-and-logic` — textbook Piaget fluff folded into Ep. 1 Beat 2)** → 3 crisp episodes | Dr. Frances Jensen (*The Teenage Brain*, 54m — 3 jump chips) |
| **35. `digital-adolescent-algorithmic-feeds`**<br/>*Algorithms, Social Comparison & Digital Footprint* | 1. **Resetting Toxic Social Feeds Together (Without Spying)** (`FAST_WIN` · `HABIT_GUARDRAIL`)<br/>2. **Why "Likes" & Silent Snaps Hit Teen Self-Worth So Hard** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `BRAIN_BRIDGE`)<br/>3. **Digital Footprint Talks Teens Actually Take Seriously** (`RHYTHM_RESET` · `SERVE_RETURN_LOOP`)<br/>4. **Designing One Unplugged Family Ritual Everyone Enjoys** (`LONG_TERM_BOND` · `ROUTINE_TIMELINE`) | 0 cut — high parental urgency | — |

#### Tier 5 · Late Adolescence (Ages 16–18) — 5 Courses (16 Episodes)

| Course | Surviving Episodes (Verdicts & De-Jargoned Headlines) | Cuts / Reframes | Master Talk |
| :--- | :--- | :--- | :--- |
| **36. `behavior-teen-autonomy`**<br/>*Shifting From Manager to Trusted Consultant* | 1. **The Consultant Shift: Giving Advice Your 17-Year-Old Actually Wants** (`FAST_WIN` · `SERVE_RETURN_LOOP`)<br/>2. **Launching Real Life Skills: Sleep, Money & Daily Ownership** (`RHYTHM_RESET` · `ROUTINE_TIMELINE`)<br/>3. **Building the Lifelong Adult-to-Adult Bond Before They Leave Home** (`LONG_TERM_BOND` · `HABIT_GUARDRAIL`) | **1 cut (`teen-frontal-lobe-maturation-25` — abstract neuroscience padding folded into Ep. 1 Beat 2)** → 3 crisp episodes | Julie Lythcott-Haims (*Without Over-Parenting*, 14m) |
| **37. `health-young-adult-wellness`**<br/>*Young Adult Health Habits & Honest Safety Talks* | 1. **Handing Over Appointments, Prescriptions & Everyday Health Ownership** (`FAST_WIN` · `ROUTINE_TIMELINE`)<br/>2. **Honest, Non-Preachy Conversations About Alcohol & Vaping** (`BRAIN_DECODER` · `SERVE_RETURN_LOOP`)<br/>3. **Beating All-Nighters & Protecting Sleep Before College/Work** (`RHYTHM_RESET` · `CIRCADIAN_CURVE`)<br/>4. **Creating an Emergency "No-Questions-Asked Ride Home" Pact** (`LONG_TERM_BOND` · `HABIT_GUARDRAIL`) | Replaced generic `lifelong-health-maintenance` boilerplate with high-impact *No-Questions-Asked Ride Home Pact*! | Dr. Jeffrey Arnett (*Emerging Adulthood*, 16m) |
| **38. `nutrition-teen-food-sovereignty`**<br/>*Feeding Yourself Independently & Food-Mood Basics* | 1. **The 20-Minute First-Apartment Grocery Run** (`FAST_WIN` · `ROUTINE_TIMELINE`)<br/>2. **How Everyday Food & Skipped Meals Shape Teen Mood & Energy** (`REFRAME_DEJARGON` · `BRAIN_DECODER` · `CIRCADIAN_CURVE`)<br/>3. **30-Minute Sunday Prep & Trusting Hunger Signals for Life** (`LONG_TERM_BOND` · `HABIT_GUARDRAIL`) | **1 merged (`batch-cooking` + `intuitive-eating`)** → 3 practical launching episodes | — |
| **39. `play-teen-intellectual-mastery`**<br/>*Focused Studying, Burnout & Mapping Next Steps* | 1. **Why Constant Phone Switching Doubles Homework Stress** (`REFRAME_DEJARGON` · `FAST_WIN` · `BRAIN_BRIDGE`)<br/>2. **Building Calm, Focused Study Blocks Without Burnout** (`REFRAME_DEJARGON` · `RHYTHM_RESET` · `ROUTINE_TIMELINE`)<br/>3. **Compass Over Rigid Plan: Helping Teens Navigate College & Career Pressure** (`LONG_TERM_BOND` · `SERVE_RETURN_LOOP`) | **1 merged (`creative-solitude` folded into Ep. 3; removed Cal Newport title jargon)** → 3 episodes | Cal Newport (*Digital Minimalism & Focus*, 44m — moved here with 3 jump chips!) |
| **40. `digital-teen-digital-independence`**<br/>*Safe Driving, Intentional Feeds & Adult Digital Habits* | 1. **The Zero-Texting Driving Pledge (And Setting Auto-Silence Together)** (`FAST_WIN` · `HABIT_GUARDRAIL`)<br/>2. **Auditing Your Own Attention: Muting, Unfollowing & Taking Back Peace** (`BRAIN_DECODER` · `LENS_EXPOSURE_MATRIX`)<br/>3. **The Young Adult Digital Handover: Stepping Out of Controls Into Trust** (`LONG_TERM_BOND` · `SERVE_RETURN_LOOP`) | **1 cut (`continuous-partial-attention` — duplicated Course 39 Ep. 1!)** → 3 sharp episodes | — |

---

## 4. Founder Sign-Off Summary Before `PLAN-47` Execution

- **Total Courses:** 40 (zero empty categories or broken URL slugs; legacy redirects preserved via `SLUG_ALIASES`).
- **Total Lessons:** **143 zero-bluff episodes** (down from 160 forced slots — **17 padded/duplicate/clinical lessons cleanly retired or merged**).
- **Zero-Bluff Guarantee:** Every single surviving episode maps to a concrete parental need, a bespoke visual model, an annotated calm script, real pushback twists, a non-clinical boundary, and 100% original closing copy enforced by CI (`packages/database/test/academyCurriculumQuality.test.ts`).
