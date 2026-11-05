# Alongside — Platform Advisory Rearchitecture, Navigation Streamlining & Prioritized Academy Curriculum Specification
**Author:** Chief Technology Officer (CTO)  
**Status:** Canonical Architectural Specification  
**Version:** 2.5.0 (Parent Advisory & Intelligence Platform Transition)  
**Target Audience:** Frontend Agent, Backend Agent, Research Engineer, Product Leadership  
**Companion Documents:**  
- [`docs/PROJECT_SCOPE.md`](PROJECT_SCOPE.md) (Canonical Product Scope v2.4.0)  
- [`docs/system-architecture.md`](system-architecture.md) (System Architecture)  
- [`docs/codebase-design.md`](codebase-design.md) (Deep Modules & Seam Catalog)  
- [`docs/lifespan-parent-intelligence-academy-spec.md`](lifespan-parent-intelligence-academy-spec.md) (0–18 Lifespan Curriculum Specification)  
- [`docs/streamlined-navigation-and-tab-decluttering-spec.md`](streamlined-navigation-and-tab-decluttering-spec.md) (Navigation & Decluttering)  
- [`plans/README.md`](../plans/README.md) (Master Engineering Execution Index)  

---

## 1. Executive Summary & Strategic Rationale

In Paperclip task **SOU-65**, the CEO and Product Visionary presented a fundamental strategic alignment for AlongSide:
> *"I think we should make the platform have Home, Parent Intelligence Academy, and Sunday Youth Culture Digest as the feed... like the place that makes you keep up with your child and up to date with him. Inside Parent Intelligence Academy, we have health, nutrition, behaviors, and other things—mainly making the roadmap, giving advice, and creating a course for each category.  
> And I don't know if the services we are offering are useful or not. For example, in Health, when we are showing an antipyretic dosing calculator, I don't see this as a use case. I don't see it as a must or something really needed.  
> So for each course category, we can divide the course into chapters, and also order them by priority, so our platform will be more of an advisory platform—a place parents resort to in order to get a better education and understanding regarding their children."*

### 1.1 The CTO Strategic Verdict: Why This Idea is 10x Superior

The founder's insight diagnoses a universal failure mode in digital parenting products: **The Utility Feature Trap vs. The Advisory Sanctuary.**

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           THE DICHOTOMY OF PARENTING PLATFORMS                                  │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ THE UTILITY TRAP (What We Are Escaping):                                                        │
│ • Building disparate medical calculators (antipyretic fever dosage, oz/ml unit converters).     │
│ • Low retention: Used once every 4 months during a 2:00 AM acute fever; forgotten immediately. │
│ • High liability: Calculating medication doses invites pediatric clinical malpractice risk.    │
│ • Zero differentiation: Free calculators exist on every hospital website and medicine bottle.   │
│ • Cognitive overload: Fragmented across 6–7 top-level tabs that feel like administrative chore.│
│                                                                                                 │
│ THE ADVISORY SANCTUARY (What AlongSide v2.5.0 Is):                                              │
│ • High-retention, authoritative child intelligence: "Keep up with your child as they grow."    │
│ • Relieves parental anxiety: Explaining the neurobiology, developmental leaps, and psychology. │
│ • Actionable communication: Word-for-word scripts ("What to Say"), not abstract theories.      │
│ • Weekly living heartbeat: Sunday Youth Culture Digest decodes slang, gaming, and peer culture. │
│ • Serene cognitive load: 3 core navigation anchors + devices & omnipresent AI companion.       │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Why Retiring the "Antipyretic Dosing Calculator" is Essential:
1. **Clinical Liability vs. Zero Economic Value:** Dosing acetaminophen or ibuprofen based on parent-reported weight/age creates catastrophic liability for pediatric toxicity or under-dosing. Every pediatric bottle sold contains an FDA-mandated dosing chart, and pediatricians provide direct triage. Parents do not subscribe to an annual $79/yr Parent Calm system to perform basic arithmetic.
2. **Episodic Churn:** A medication calculator is an emergency utility. Parents visit it during illness, close the tab, and feel zero ongoing relationship with the brand.
3. **The True Value Proposition:** When a child has a fever or sleep regression, what parents truly need is **Pediatric Advisory Understanding**:
   - Understanding that fevers are an adaptive physiological defense, not a disease.
   - Knowing when to co-regulate, how to maintain hydration, and when to call the pediatrician vs. resting at home.
   - Establishing bedtime sleep architecture and nighttime soothing rituals.
   These belong in structured, prioritized **Parent Intelligence Academy Chapters**, not gimmick calculator widgets.

---

## 2. Navigation Architecture: What We Keep, Leave, and Show

### 2.1 The New Primary Navigation Shell

The primary desktop navigation bar in `apps/web/src/components/shared/Header.tsx` and mobile drawer in `MobileNav.tsx` will be streamlined to **4 core destinations**, eliminating visual fatigue:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   NEW ALONGSIDE v2.5 NAVBAR                                     │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [Logo + Multi-Child Pill]      [ Home ]  [ Academy ]  [ Youth Culture Digest ]  [ Family Pacts ]│
│                                                                        [ User Avatar Menu ]     │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

| Navigation Tab | Route | Core Value & Purpose | Why It Belongs in the Primary Header |
| :--- | :--- | :--- | :--- |
| **Home** | `/dashboard` | **The Child Cockpit & Daily Pulse:** Active child overview, developmental milestone status, active Academy course continuation, and daily co-regulation prompt. | The universal digital anchor for the parent's daily check-in. |
| **Parent Intelligence Academy** | `/academy` | **The Advisory Core:** Comprehensive 0–18 curriculum organized by 5 Categories, with Courses divided into Chapters ordered by Priority (Priority 1: Critical Foundations to Priority 3: Long-Term Growth). | The intellectual heart and educational powerhouse of AlongSide. |
| **Sunday Youth Culture Digest** | `/digest` | **The Living Weekly Feed:** "Keep up with your child"—slang decoder, trending media & games radar, exploit early warnings, and Sunday dinner conversation starters. | The high-frequency engagement engine driving weekly habit formation. |
| **Family Pacts & Devices** | `/devices` | **Bilateral Tech Governance:** Co-created family agreements, digital canvas signatures, bedtime hardware curfews (8:30 PM lock), and QR enrollment. | Houses our proprietary Pact-as-Code IP for screen and device management. |
| **Omnipresent AI Advisor** | `/advisor` + Bubble | **24/7 Clinical & Conversational Sparring:** Multi-child memory, roleplay simulations, and 250+ FAQ Vault search. | Accessible globally via `FloatingAdvisorBubble.tsx` and directly via `/advisor`. |

### 2.2 What We Leave & Retire from the Primary Navbar

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             WHAT WE ARE RETIRING FROM THE PRIMARY NAVBAR                         │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ❌ [Health]     ──> Absorbed into Academy: "Pediatric Health & Sleep Foundations"               │
│ ❌ [Nutrition]  ──> Absorbed into Academy: "Nutrition & Healthy Feeding Habits"                 │
│ ❌ [Behavior]   ──> Absorbed into Academy: "Behavior & Emotional Co-Regulation"                 │
│ ❌ [Play]       ──> Absorbed into Academy: "Cognitive Development & Purposeful Play"            │
│ ❌ Gimmick Tools──> Antipyretic calculator, raw dosing widgets, and isolated symptom checklists │
│                     are permanently purged.                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Safe Migration & Backward Compatibility:
- Parents who bookmark `/health`, `/nutrition`, `/behavior`, or `/brain-games` will be cleanly routed to the corresponding Academy Category view (`/academy?category=HEALTH_AND_WELLNESS`, `/academy?category=NUTRITION_AND_FEEDING`, etc.), maintaining zero broken links.
- The highest-value clinical scripts (HALT tantrum de-escalation, Picky Eating Division of Responsibility, Purposeful Play matrices) are promoted to **First-Class Prioritized Academy Chapters**.

---

## 3. Detailed Tab Anatomy: What Each Screen Contains

### 3.1 Tab 1: Home (`/dashboard`) — The Authenticated Child Advisory Cockpit
The authenticated Home screen serves as the daily digital anchor for modern parents, answering the foundational mandate: *"Keep up with your child and up to date with him"*. It eliminates disparate calculators and administrative clutter in favor of a calm, high-signal advisory feed:
- **Active Child Context Header (`ChildHeroCard`):** Displays avatar, child's name, dynamically derived exact age in months and years (`formatChildAge(child)`), developmental tier badge, and multi-child profile switcher.
- **Current Neurodevelopmental Leap Indicator:** Reassuring biological explanation of what the child's brain is undergoing right now (e.g. *Age 10–12: Adrenarche, Social Dopamine Sensitivity & Peer Identity Alignment*).
- **Road Status Indicator:** Pre-Device (Readiness Assessment Mode) vs Active-Device (Hardware Bedtime Dock Active).
- **Prioritized Academy "Continue Learning" Anchor (`ActiveChapterContinueCard`):** 
  - Direct connection into the active course for the child's tier.
  - Highlights the highest-priority incomplete chapter:
    * **Priority 1 (Critical & Foundational):** Red/amber badge — immediate friction de-escalation & core neurobiology.
    * **Priority 2 (Daily Routines & Co-Regulation):** Teal/emerald badge — daily habits and predictable rituals.
    * **Priority 3 (Advanced Scaffolding & Growth):** Purple badge — long-term resilience and future transitions.
  - Progress bar and estimated read time (e.g. *4 min read*).
  - 1-click CTA: "Resume Micro-Lesson" linking straight into `/academy/[slug]/[lessonSlug]`.
- **Sunday Youth Culture Digest Living Pulse (`SundayCultureDigestCard`):**
  - High-frequency weekly intelligence card displaying Issue # and edition.
  - **Trending Slang Word of the Week:** Phonetic pronunciation, definition, and visual 1–5 Cringe Meter rating (e.g. *Crashout* · Cringe 4/5).
  - **Sunday Dinner Table Conversation Starter:** Curated tier-tailored question with a 1-click "Copy Prompt" button.
  - **Exploit & Dark Pattern Early Warning:** Alert on predatory gaming mechanics or covert app bypasses.
  - 1-click CTA: "Read Full Digest" linking to `/digest`.
- **Daily Calm Advisory Script (`DailyAdvisoryScriptCard`):**
  - Word-for-word emotional dialogue script contrasting reactive mistakes (*"What NOT to Say"*) vs. empathetic, firm guidance (*"What TO Say"*).
  - 1-click CTA: "Practice in AI Sparring" launching the 24/7 AI Advisor with the scenario pre-loaded.
- **Bilateral Tech Governance & Bedtime Curfew Status (`BilateralPactStatusCard`):**
  - Displays neutral hardware curfew status (*"Bedtime Dock: 8:30 PM — Locked via Pact-as-Code · Zero Spyware"*) or First-Phone Readiness Score (*"Readiness Assessment: 78/100"*).
  - 1-click CTA linking to `/devices`.
- **Permanently Purged Clutter:** `QuickHealthTriageLauncher` (fever dosing calculators, medication forms, symptom checklists) is permanently removed from the homepage feed.

### 3.2 Tab 2: Parent Intelligence Academy (`/academy`) — The Advisory Sanctuary
- **Category Navigation Bar (5 Canonical Pillars):**
  1. `BEHAVIOR_AND_EMOTIONS` (Behavior & Emotional Co-Regulation)
  2. `HEALTH_AND_WELLNESS` (Pediatric Health, Sleep & Biological Rhythms)
  3. `NUTRITION_AND_FEEDING` (Nutrition, Allergen Exposure & Healthy Relationship with Food)
  4. `DEVELOPMENT_AND_PLAY` (Cognitive Leaps, Language & Purposeful Play)
  5. `DIGITAL_AND_DEVICES` (Modern Digital World, Screens & Device Sovereignty)
- **Active Child Age Calibration Pill:** Displays `Tailored for Leo (Age 10 · Pre-Teen)`, with an optional tier dropdown allowing parents to explore earlier or future developmental stages.
- **Course Catalog Grid:** Displays courses in the selected category for the child's tier, each displaying:
  - Course Title, Tier Badge, and Estimated Total Study Time.
  - Number of Chapters (divided and prioritized).
  - Overall Completion Progress Bar (`2 / 3 Chapters Completed`).
- **Course Roadmap & Chapter Breakdown (`/academy/[slug]`):**
  - Clinical Overview & Pediatric Rationale.
  - **Chapters Ordered by Priority:**
    - **Chapter 1: Priority 1 — Urgent & Foundational Foundations** (Red/Amber indicator: "Start Here — Immediate friction de-escalation").
    - **Chapter 2: Priority 2 — Daily Routines & Preventative Mastery** (Blue/Teal indicator: "Core daily habits and co-regulation rituals").
    - **Chapter 3: Priority 3 — Advanced Scaffolding & Future Leaps** (Purple indicator: "Long-term resilience and next-stage readiness").
- **Chapter Micro-Lesson Reader (`/academy/[slug]/[lessonSlug]`):**
  - Reading Time Badge (3–5 min read).
  - Neurobiological / Pediatric Foundation Article.
  - **Clinical Insight Callout Card:** Distinctive styled callout highlighting the core takeaway.
  - **Actionable Dialogue Speech Bubbles ("What to Say"):** Word-for-word scripts contrasting empathetic, non-punitive phrasing against common reactive mistakes.
  - **Action Protocol Checklist:** 3 concrete steps to implement at home today.
  - "Mark Chapter Complete" button updating user progress and unlocking the next priority chapter.

### 3.3 Tab 3: Sunday Youth Culture Digest (`/digest`) — The Living Weekly Feed
- **"Keep Up With Your Child" Feed Masthead:** Current edition issue header (e.g. *Volume 42: The Discord Server & Slang Radar*).
- **Searchable Slang Radar & Decoder:**
  - Real-time search filter: Parents type any unfamiliar word heard from their child (e.g. `rizz`, `skibidi`, `crash out`, `fanum tax`, `bet`, `cap`, `cooked`).
  - Slang Card: Definition, cultural origin, "Cringe Meter" (how awkward it sounds if a parent says it), and example dialogue.
- **Trending Platforms & Games Radar:**
  - Deep dive on trending games and social environments (Roblox, TikTok, Discord, BeReal, Snapchat).
  - What kids are doing on it, why it appeals to their developmental stage, and what parents should know without moral panic.
- **Exploit & Dark Pattern Early Warnings:**
  - Real alerts on predatory mechanics: in-game loot boxes, algorithmic notification spam, disappearing messaging risks.
- **Sunday Dinner Conversation Starters:**
  - 3–5 curated, non-cringe questions to ask at the dinner table that ignite organic family conversation.
  - Interactive "Copy to Clipboard" button and bookmarking.

### 3.4 Tab 4: Family Pacts & Modern Devices (`/devices`) — Bilateral Governance
- **"Thinking About Buying a Device?" Action Hub:** Readiness assessment quiz runner (Score 0–100) determining whether the child has developed necessary impulse control.
- **Bilateral Family Pact Wizard:** 4-step collaborative contract builder (Screen curfews, bedroom privacy, social media agreements, homework boundaries).
- **Digital Canvas Dual Signatures:** Bilateral parent and child signatures sealed into a formal family pact.
- **Pact-as-Code Hardware Enforcement:**
  - Apple `.mobileconfig` cryptographic compiler (`node-forge`).
  - Android Enterprise profile policy generator.
  - Single-scan QR code enrollment enforcing the neutral 8:30 PM bed dock with zero surveillance spyware.

### 3.5 The Public Advisory Sanctuary Landing Homepage (`/`)
The public-facing homepage (`apps/web/src/app/page.tsx`) serves as the welcoming front door for prospective parents, articulating the v2.5.0 value proposition and completely eliminating obsolete medical dosing calculator messaging:
- **Hero Section (`HeroSection.tsx`):**
  - Positioning Badge: *"Clinical Pediatric Science • Prioritized Parent Academy • Weekly Youth Culture Digest • Zero-Spyware Pacts"*.
  - Headline: *"The Parent Advisory Sanctuary: Keep Up With Your Child As They Grow."*
  - Subheadline: *"Replace parenting anxiety, guilt, and 2:00 AM panic Googling with clinical developmental science, prioritized 5-minute micro-courses, weekly youth culture intelligence, and bilateral screen pacts (Ages 0–18)."*
  - CTAs: "Start 7-Day Risk-Free Trial" (Primary) and "Explore 0–18 Advisory Curriculum" (Secondary anchor).
- **Interactive 6-Stage Lifespan Advisory Explorer (`LifespanStageSelector.tsx`):**
  - Interactive tabs covering all 6 tiers (Infants 0–3, Preschool 4–6, Elementary 7–9, Tweens 10–12, Early Adolescence 13–15, Late Adolescence 16–18).
  - Previews real UI cards for each stage:
    1. *Active Neurodevelopmental Leap* (biological brain changes).
    2. *Prioritized Academy Course* (Priority 1 Critical, Priority 2 Routines, Priority 3 Growth).
    3. *Youth Culture & Digital Reality* (slang, apps, peer dynamics).
    4. *Actionable Dialogue* (word-for-word empathy scripts).
- **The 3 Core Pillars Showcase (`PillarsShowcase.tsx`):**
  - Pillar 1: **Parent Intelligence Academy** (5 Categories with prioritized chapters) -> `/academy`.
  - Pillar 2: **Sunday Youth Culture Digest** (Slang Radar, Cringe Meter, Dinner Starters) -> `/digest`.
  - Pillar 3: **Bilateral Family Pacts & Devices** (Pact-as-Code, 8:30 PM dock, 0-100 readiness) -> `/devices`.
  - Global Companion: **24/7 AI Child Advisor** (Voice sparring, instant empathy scripts) -> `/advisor`.
- **Interactive Culture Playground Demo (`CulturePlaygroundDemo.tsx`):**
  - Live interactive playground allowing visitors to search modern slang terms (*Crashout*, *Rizz*, *Skibidi*) with live Cringe Meter ratings and draw dinner conversation starters.
- **Bilateral Tech Sovereignty Spotlight (`DeviceActionHubSpotlight.tsx`):**
  - Reframing screen time from punitive policing to collaborative rite-of-passage contracts.
- **Pricing & Risk-Free Onboarding (`PricingSection.tsx`):**
  - $79/yr Annual Hero Pass with 7-day upfront trial and 1-click cancellation.

---

## 4. The Academy Curriculum Taxonomy: Categories, Courses & Prioritized Chapters

Below is the canonical matrix of the **5 Categories** spanning all **6 Developmental Tiers**, divided into **Chapters Ordered by Priority**:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                ACADEMY HIERARCHICAL DATA MODEL                                  │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Category (e.g. BEHAVIOR_AND_EMOTIONS)                                                           │
│    └── Course / Module (e.g. "Preschool Big Feelings & Theory of Mind", Tier 1: 4–6y)           │
│           ├── Chapter 1 [Priority 1: Immediate & Critical]                                      │
│           │      ├── Lesson 1: Egocentrism vs Empathy: Why 4-Year-Olds Can't Share              │
│           │      └── Lesson 2: The Tantrum De-Escalation Script                                 │
│           ├── Chapter 2 [Priority 2: Daily Routines & Co-Regulation]                            │
│           │      ├── Lesson 1: Bedtime Resistance & Calming Anchors                             │
│           │      └── Lesson 2: Morning Transition Rituals                                       │
│           └── Chapter 3 [Priority 3: Advanced Scaffolding & Future Growth]                      │
│                  ├── Lesson 1: Fostering Frustration Tolerance                                  │
│                  └── Lesson 2: Preparing for Kindergarten Social Dynamics                       │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Category 1: Behavior & Emotional Co-Regulation (`BEHAVIOR_AND_EMOTIONS`)

| Tier & Age | Course Title & Slug | Prioritized Chapters |
| :--- | :--- | :--- |
| **Tier 0 (0–3y)** | *Sensory Overload & Infant Co-Regulation* (`behavior-infant-coregulation`) | • **Ch 1 (P1 - Critical):** The Immature Amygdala: Why Toddlers Melt Down & How to Anchor Calm<br/>• **Ch 2 (P2 - Routines):** The HALT Diagnostic: Decoding Hungry, Angry, Lonely, Tired Cues<br/>• **Ch 3 (P3 - Scaffolding):** Establishing Pre-Verbal Connection & Secure Attachment Rituals |
| **Tier 1 (4–6y)** | *Preschool Big Feelings & Theory of Mind* (`behavior-preschool-feelings`) | • **Ch 1 (P1 - Critical):** Theory of Mind: Why 4-Year-Olds Struggle to Share and Cooperate<br/>• **Ch 2 (P2 - Routines):** Ending Bedtime Battles: Sleep Pressure, Blue Light & Anchors<br/>• **Ch 3 (P3 - Scaffolding):** Early Boundary Setting: Consistent Limits Without Shaming |
| **Tier 2 (7–9y)** | *Elementary Impulse Control & Sibling Dynamics* (`behavior-elementary-impulses`) | • **Ch 1 (P1 - Critical):** Dopamine Loops & Stopping Resistance: De-escalating Post-Play Rage<br/>• **Ch 2 (P2 - Routines):** Sibling Rivalry: Moving From Judge/Jury to Mediation<br/>• **Ch 3 (P3 - Scaffolding):** Building Frustration Tolerance & Growth Mindset in Schoolwork |
| **Tier 3 (10–12y)** | *Tween Adrenarche & Emotional Volatility* (`behavior-tween-adrenarche`) | • **Ch 1 (P1 - Critical):** Adrenarche: The Biological Awakening to Peer Status & Mood Swings<br/>• **Ch 2 (P2 - Routines):** De-escalating Eye-Rolls & Snark: The 3-Step Empathetic Reset<br/>• **Ch 3 (P3 - Scaffolding):** Group Chat Friction, FOMO & The Agony of Social Exclusion |
| **Tier 4 (13–15y)** | *Adolescent Identity, Defiance & Boundaries* (`behavior-adolescent-identity`) | • **Ch 1 (P1 - Critical):** Defusing High-Intensity Arguments: The Pause Before Reaction Protocol<br/>• **Ch 2 (P2 - Routines):** Shifting From Manager to Mentor: Collaborative Problem Solving<br/>• **Ch 3 (P3 - Scaffolding):** When Agreements Break: The Non-Punitive Repair Blueprint |
| **Tier 5 (16–18y)** | *Late Teen Autonomy & Emotional Sovereignty* (`behavior-teen-autonomy`) | • **Ch 1 (P1 - Critical):** High-Stakes Respect: Navigating Driving, Curfews & Independence<br/>• **Ch 2 (P2 - Routines):** Graduated Privileges: Earning Freedom Through Reliability<br/>• **Ch 3 (P3 - Scaffolding):** Preparing for the Adult Launch: Emotional Self-Sovereignty |

---

### 4.2 Category 2: Pediatric Health, Sleep & Biological Rhythms (`HEALTH_AND_WELLNESS`)
*(Note: Replaces gimmick calculation widgets with authoritative pediatric advisory frameworks)*

| Tier & Age | Course Title & Slug | Prioritized Chapters |
| :--- | :--- | :--- |
| **Tier 0 (0–3y)** | *Infant Health Foundations & Sleep Architecture* (`health-infant-sleep-foundations`) | • **Ch 1 (P1 - Critical):** Demystifying Fevers: Immune Biology, Hydration & Red-Flag Triage<br/>• **Ch 2 (P2 - Routines):** Sleep Architecture: Circadian Anchors, Wake Windows & Nap Drops<br/>• **Ch 3 (P3 - Scaffolding):** When to Call the Pediatrician vs. Comforting at Home |
| **Tier 1 (4–6y)** | *Preschool Immunity & Restorative Rest* (`health-preschool-immunity`) | • **Ch 1 (P1 - Critical):** Daycare & School Germs: The Developing Immune System & Recovery<br/>• **Ch 2 (P2 - Routines):** Night Terrors, Nightmares & Separation Anxiety at Night<br/>• **Ch 3 (P3 - Scaffolding):** Outdoor Movement, Sunlight Exposure & Natural Immune Buffering |
| **Tier 2 (7–9y)** | *Middle Childhood Physical Health & Sleep* (`health-elementary-wellness`) | • **Ch 1 (P1 - Critical):** Protecting the 9–11 Hour Sleep Window from Evening Overstimulation<br/>• **Ch 2 (P2 - Routines):** Pediatric Sports Hydration, Growth Plate Safety & Overuse Prevention<br/>• **Ch 3 (P3 - Scaffolding):** Illness Convalescence: Rebuilding Energy Without Early Burnout |
| **Tier 3 (10–12y)** | *Pubertal Physical Leaps & Circadian Delays* (`health-tween-circadian-leaps`) | • **Ch 1 (P1 - Critical):** The 1.5-Hour Melatonin Shift: Why Tweens Can't Sleep at 9:00 PM<br/>• **Ch 2 (P2 - Routines):** Body Changes, Hygiene & Hormonal Shifts: Calm Conversations<br/>• **Ch 3 (P3 - Scaffolding):** Screen Glow & Blue Light: The Science of Nighttime Hardware Docks |
| **Tier 4 (13–15y)** | *Adolescent Sleep Protection & Athletic Health* (`health-adolescent-sleep-protection`) | • **Ch 1 (P1 - Critical):** The Biological 2-Hour Circadian Delay & The Neutral 8:30 Bedtime Dock<br/>• **Ch 2 (P2 - Routines):** Adolescent Athletics: Rest Days, Sleep Deprivation & Injury Risks<br/>• **Ch 3 (P3 - Scaffolding):** Chronic Fatigue Syndrome & Academic Burnout: Warning Signs |
| **Tier 5 (16–18y)** | *Young Adult Physical Autonomy & Wellness* (`health-young-adult-wellness`) | • **Ch 1 (P1 - Critical):** Healthcare Independence: Managing Appointments, Insurance & Refills<br/>• **Ch 2 (P2 - Routines):** Sleep Hygiene Under Academic Pressure: Breaking All-Nighter Habits<br/>• **Ch 3 (P3 - Scaffolding):** Lifelong Physical Fitness, Mental Balance & Preventative Health |

---

### 4.3 Category 3: Nutrition & Healthy Feeding Habits (`NUTRITION_AND_FEEDING`)

| Tier & Age | Course Title & Slug | Prioritized Chapters |
| :--- | :--- | :--- |
| **Tier 0 (0–3y)** | *Infant First Foods & Allergen Introduction* (`nutrition-infant-first-foods`) | • **Ch 1 (P1 - Critical):** Safe Early Allergen Exposure: Window of Opportunity & Safety Signs<br/>• **Ch 2 (P2 - Routines):** Baby-Led Weaning vs Purées: Choking Prevention & Gagging Science<br/>• **Ch 3 (P3 - Scaffolding):** Toddler Food Strikes: Ellyn Satter’s Division of Responsibility |
| **Tier 1 (4–6y)** | *Preschool Picky Eating & Family Meal Harmony* (`nutrition-preschool-picky-eating`) | • **Ch 1 (P1 - Critical):** Ending the Dinner Table Battle: Removing Coercion & Pressure<br/>• **Ch 2 (P2 - Routines):** Sensory Texture Aversion: Gentle Exposure Therapy Without Shame<br/>• **Ch 3 (P3 - Scaffolding):** De-mystifying Sugar & Treats: Neutralizing Sweet Obsessions |
| **Tier 2 (7–9y)** | *Elementary Fuel & Sustained Focus* (`nutrition-elementary-fuel`) | • **Ch 1 (P1 - Critical):** School Lunchbox Blueprint: Protein & Complex Carbs for Attention<br/>• **Ch 2 (P2 - Routines):** The 3:30 PM Hangry Meltdown: High-Fiber, Protein Snacking Rituals<br/>• **Ch 3 (P3 - Scaffolding):** Kitchen Agency: Involving 7–9 Year Olds in Simple Meal Preparation |
| **Tier 3 (10–12y)** | *Pre-Teen Growth Spurts & Food Relationship* (`nutrition-tween-growth-spurts`) | • **Ch 1 (P1 - Critical):** Fuelling the Pre-Pubertal Growth Spurt: Calorie Demands & Micronutrients<br/>• **Ch 2 (P2 - Routines):** Promoting Positive Body Image: Neutral, Non-Judgmental Food Talk<br/>• **Ch 3 (P3 - Scaffolding):** Social Snacking: Navigating Fast Food and Peer Pressure Gracefully |
| **Tier 4 (13–15y)** | *Adolescent Metabolic Demands & Sports Nutrition* (`nutrition-adolescent-sports-fuel`) | • **Ch 1 (P1 - Critical):** High-Calorie Demands of Rapid Bone & Muscle Growth in Puberty<br/>• **Ch 2 (P2 - Routines):** Pre-Game and Post-Workout Fueling: Hydration & Electrolytes<br/>• **Ch 3 (P3 - Scaffolding):** Spotting Warning Signs: Recognizing Disordered Eating & Restriction Early |
| **Tier 5 (16–18y)** | *Teen Food Sovereignty & Lifelong Habits* (`nutrition-teen-food-sovereignty`) | • **Ch 1 (P1 - Critical):** Cooking 5 Wholesome Meals From Scratch Before Leaving Home<br/>• **Ch 2 (P2 - Routines):** The Caffeine & Energy Drink Epidemic: Biological Cardiovascular Realities<br/>• **Ch 3 (P3 - Scaffolding):** Intuitive Eating: Sustaining Metabolic Health Into Adulthood |

---

### 4.4 Category 4: Cognitive Development & Purposeful Play (`DEVELOPMENT_AND_PLAY`)

| Tier & Age | Course Title & Slug | Prioritized Chapters |
| :--- | :--- | :--- |
| **Tier 0 (0–3y)** | *Infant Sensory Awakening & Language Bursts* (`play-infant-sensory-language`) | • **Ch 1 (P1 - Critical):** The 3D Video Deficit: Why Screens Cannot Teach First Words<br/>• **Ch 2 (P2 - Routines):** Serve-and-Return Conversation: Wiring Infant Neural Synapses<br/>• **Ch 3 (P3 - Scaffolding):** Sensory Bins, Puppet Play & Fine-Motor Hand-Eye Coordination |
| **Tier 1 (4–6y)** | *Imaginative Play & Executive Function* (`play-preschool-executive-function`) | • **Ch 1 (P1 - Critical):** Purposeful Play vs. Fast-Paced Animation: Building Sustained Attention<br/>• **Ch 2 (P2 - Routines):** Block Building & Symbolic Roleplay: Scaffolding Prefrontal Cortex<br/>• **Ch 3 (P3 - Scaffolding):** The Boredom Threshold: Fostering Independent Creative Play |
| **Tier 2 (7–9y)** | *Logic, Spatial Strategy & Creative Maker Play* (`play-elementary-logic-maker`) | • **Ch 1 (P1 - Critical):** Spatial Reasoning & Strategy Games: Chess, Puzzles & Cognitive Maps<br/>• **Ch 2 (P2 - Routines):** Hands-On Maker Projects: Cardboard Engineering vs Passive Media<br/>• **Ch 3 (P3 - Scaffolding):** Cooperative Board Games: Teaching Sportsmanship & Delayed Reward |
| **Tier 3 (10–12y)** | *Pre-Teen Focus, Flow State & Deep Hobbies* (`play-tween-flow-hobbies`) | • **Ch 1 (P1 - Critical):** Cultivating The Flow State: Protecting Uninterrupted Creative Hobbies<br/>• **Ch 2 (P2 - Routines):** Metacognitive Study Rituals: How the Tween Brain Encodes Knowledge<br/>• **Ch 3 (P3 - Scaffolding):** Digital Creation vs Consumption: Coding, Digital Art & Music Scaffolding |
| **Tier 4 (13–15y)** | *Critical Thinking & Media Literacy* (`play-adolescent-critical-thinking`) | • **Ch 1 (P1 - Critical):** Deconstructing Algorithmic Echo Chambers & AI-Generated Media<br/>• **Ch 2 (P2 - Routines):** Deep Work Mastery: Overcoming Continuous Partial Attention<br/>• **Ch 3 (P3 - Scaffolding):** Collaborative Projects: Organizing Teams, Clubs & Real-World Ventures |
| **Tier 5 (16–18y)** | *Intellectual Mastery & Real-World Strategy* (`play-teen-intellectual-mastery`) | • **Ch 1 (P1 - Critical):** Long-Range Executive Prioritization: Managing Academics & Passions<br/>• **Ch 2 (P2 - Routines):** Socratic Debate & Intellectual Disagreement Without Contempt<br/>• **Ch 3 (P3 - Scaffolding):** Financial Architecture: Budgeting, Compounding & Strategic Thinking |

---

### 4.5 Category 5: Modern Digital World, Screens & Device Sovereignty (`DIGITAL_AND_DEVICES`)

| Tier & Age | Course Title & Slug | Prioritized Chapters |
| :--- | :--- | :--- |
| **Tier 0 (0–3y)** | *Zero Screens Under 2 & Parent Tech Modeling* (`digital-infant-zero-screens`) | • **Ch 1 (P1 - Critical):** Protecting Infant Retinal & Brain Development: The Zero-Screen Rule<br/>• **Ch 2 (P2 - Routines):** Parental Phubbing & "Technoference": Protecting Eye Contact<br/>• **Ch 3 (P3 - Scaffolding):** Establishing Device-Free Sanctuaries in the Nursery and Dining Area |
| **Tier 1 (4–6y)** | *Preschool Media Curation & Stopping Transitions* (`digital-preschool-media-curation`) | • **Ch 1 (P1 - Critical):** Slow-Tempo vs Hyper-Stimulating Media: Preventing Tantrum Crashes<br/>• **Ch 2 (P2 - Routines):** Co-Viewing Protocols: Discussing Emotions and Lessons in Shows<br/>• **Ch 3 (P3 - Scaffolding):** The Visual Timer & Transition Ritual: Turning Off Screens Peacefully |
| **Tier 2 (7–9y)** | *First Gaming, Dopamine Loops & Readiness* (`digital-elementary-first-gaming`) | • **Ch 1 (P1 - Critical):** The Dopamine Engine of Roblox & Minecraft: Why Stopping Hurts<br/>• **Ch 2 (P2 - Routines):** The First Phone Readiness Assessment: Assessing Impulse Control<br/>• **Ch 3 (P3 - Scaffolding):** The Open Living Room Rule: Transparent, Shared Screen Spaces |
| **Tier 3 (10–12y)** | *Tween Smartphone Transition & Family Pacts* (`digital-tween-smartphone-pacts`) | • **Ch 1 (P1 - Critical):** Group Chats, Silent Exclusion & The Agony of Unread Messages<br/>• **Ch 2 (P2 - Routines):** Drafting the Bilateral Family Pact: Collaborative Rules & Signatures<br/>• **Ch 3 (P3 - Scaffolding):** The Neutral 8:30 PM Refrigerator Basket Dock: Protecting Circadian Sleep |
| **Tier 4 (13–15y)** | *Adolescent Algorithmic Feeds & Digital Reputation* (`digital-adolescent-algorithmic-feeds`) | • **Ch 1 (P1 - Critical):** Algorithmic Rabbit Holes: How Feeds Exploit Fatigued Brains<br/>• **Ch 2 (P2 - Routines):** Digital Permanence, Screenshots & Impulse Reflection Before Sending<br/>• **Ch 3 (P3 - Scaffolding):** Moving From Spyware to Trust: Non-Punitive Repair After Breach |
| **Tier 5 (16–18y)** | *Teen Digital Independence & Young Adult Covenant* (`digital-teen-digital-independence`) | • **Ch 1 (P1 - Critical):** Transitioning to Full Digital Sovereignty: Self-Regulated Screen Limits<br/>• **Ch 2 (P2 - Routines):** Cyber Safety: Phishing, Sextortion Scams & Identity Protection<br/>• **Ch 3 (P3 - Scaffolding):** The Bilateral Young Adult Covenant: Respecting Privacy & Independence |

---

## 5. Technical Architecture & Database Contracts

### 5.1 Shared Category & Priority Enums (`packages/shared`)

In `packages/shared/src/constants/index.ts`, define canonical enums:

```typescript
export const AcademyCategory = {
  BEHAVIOR_AND_EMOTIONS: 'BEHAVIOR_AND_EMOTIONS',
  HEALTH_AND_WELLNESS: 'HEALTH_AND_WELLNESS',
  NUTRITION_AND_FEEDING: 'NUTRITION_AND_FEEDING',
  DEVELOPMENT_AND_PLAY: 'DEVELOPMENT_AND_PLAY',
  DIGITAL_AND_DEVICES: 'DIGITAL_AND_DEVICES',
} as const;

export type AcademyCategory = (typeof AcademyCategory)[keyof typeof AcademyCategory];

export const ChapterPriority = {
  PRIORITY_1_CRITICAL: 1,      // Urgent / Foundational — Immediate friction de-escalation
  PRIORITY_2_ROUTINES: 2,      // Core daily routines and co-regulation habits
  PRIORITY_3_SCAFFOLDING: 3,   // Advanced growth and future developmental scaffolding
} as const;

export type ChapterPriority = (typeof ChapterPriority)[keyof typeof ChapterPriority];
```

### 5.2 Prisma Schema Hierarchy (`packages/database/prisma/schema.prisma`)

We evolve the Academy schema by adding the `AcademyCategory` enum, adding `category` to `AcademyModule`, and adding `AcademyChapter` as the intermediate grouping model between `AcademyModule` and `AcademyLesson`:

```prisma
enum AcademyCategory {
  BEHAVIOR_AND_EMOTIONS
  HEALTH_AND_WELLNESS
  NUTRITION_AND_FEEDING
  DEVELOPMENT_AND_PLAY
  DIGITAL_AND_DEVICES
}

model AcademyModule {
  id                 String             @id @default(uuid())
  category           AcademyCategory    @default(DIGITAL_AND_DEVICES)
  developmentalTier  DevelopmentalTier
  slug               String             @unique
  title              String
  summary            String
  coverImageUrl      String?
  sortOrder          Int                @default(0)
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt

  chapters           AcademyChapter[]
  lessons            AcademyLesson[]

  @@map("academy_modules")
}

model AcademyChapter {
  id                 String             @id @default(uuid())
  moduleId           String
  module             AcademyModule      @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  slug               String
  title              String
  summary            String
  priority           Int                @default(1) // 1 = Critical, 2 = Routines, 3 = Scaffolding
  sortOrder          Int                @default(0)
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt

  lessons            AcademyLesson[]

  @@unique([moduleId, slug])
  @@map("academy_chapters")
}

model AcademyLesson {
  id                 String             @id @default(uuid())
  moduleId           String
  module             AcademyModule      @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  chapterId          String?
  chapter            AcademyChapter?    @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  slug               String
  title              String
  contentMarkdown    String
  readingMinutes     Int                @default(4)
  sortOrder          Int                @default(0)
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt

  progressRecords    AcademyProgress[]

  @@unique([moduleId, slug])
  @@map("academy_lessons")
}
```

### 5.3 DTO Contracts (`packages/shared/src/types/index.ts`)

```typescript
export interface AcademyChapterDTO {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  summary: string;
  priority: number; // 1, 2, or 3
  sortOrder: number;
  lessonCount: number;
  completedLessonCount: number;
  isCompleted: boolean;
  lessons: AcademyLessonSummaryDTO[];
}

export interface AcademyModuleDetailDTO extends AcademyModuleDTO {
  category: AcademyCategory;
  chapters: AcademyChapterDTO[];
  lessons: AcademyLessonSummaryDTO[];
}
```

---

## 6. Execution Roadmap & Engineering Plan Delegation

To implement this vision without breaking existing features or causing merge conflicts, the CTO has authored five discrete execution plans in `plans/`:

| Plan ID | Title | Assignee | Scope & Mandate |
| :--- | :--- | :--- | :--- |
| **`PLAN-29`** | **Navigation & Platform Shell Advisory Pivot UI** | **Frontend Agent** | Streamline primary desktop header (`Header.tsx`) and mobile navigation (`MobileNav.tsx`) to `[ Home \| Academy \| Youth Culture Digest \| Family Pacts ]`. Retire standalone `/health`, `/nutrition`, `/behavior`, `/brain-games` from top navigation bar with clean fallback routing. (Complete - PR #48) |
| **`PLAN-30`** | **Parent Intelligence Academy Categories & Prioritized Chapters API** | **Backend Agent** | Evolve database schema with `AcademyCategory` and `AcademyChapter` models. Add category and chapter queries to Fastify routes. Seed canonical curriculum data across 5 categories and 6 lifespan tiers with prioritized chapters. (Complete - PR #49) |
| **`PLAN-31`** | **Parent Intelligence Academy Curriculum Explorer & Chapter Reader UI** | **Frontend Agent** | Redesign `/academy` with Category selector tabs, developmental tier auto-calibration pill, prioritized chapter cards (Priority 1, 2, 3 badges), and rich micro-lesson reader with "Clinical Insight" callouts and "What to Say" dialogue bubbles. (Complete - PR #51) |
| **`PLAN-32`** | **Sunday Culture Digest Living Feed & Dinner Starters UI** | **Frontend Agent** | Elevate `/digest` into the primary "Keep Up With Your Child" Living Feed, featuring current week's edition, searchable Slang Decoder with instant filtering, Exploit & Dark Pattern Early Warnings, and interactive Sunday Dinner Conversation Starters. (Complete - PR #50) |
| **`PLAN-33`** | **Platform Advisory Homepage & Child Cockpit Redesign UI** | **Frontend Agent** | Redesign both the authenticated Child Advisory Cockpit (`/dashboard`) and the public landing homepage (`/`). Anchor home to Priority 1–3 Academy chapters, Sunday culture briefing, daily empathy scripts, and bedtime curfew status while completely purging legacy medication calculators. |

---

## 7. Pre-Commit Review & Verification Checklist
- [x] All 5 core categories and 6 developmental tiers mapped with clinical foundations.
- [x] Clear resolution on why antipyretic dosing calculators are purged (zero economic value, high liability, episodic churn).
- [x] Navigation bar strictly streamlined to 4 core tabs + user account menu.
- [x] Deep module and seam architecture preserved with backward compatibility for existing Academy consumers.
- [x] All plans authoritatively comply with [`docs/plan-standards.md`](plan-standards.md).
