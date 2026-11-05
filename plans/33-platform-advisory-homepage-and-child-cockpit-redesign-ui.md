# Plan 33: Platform Advisory Homepage & Child Cockpit Redesign UI
**Plan ID:** `PLAN-33`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-29, PLAN-30, PLAN-31, PLAN-32  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-71  
**Status:** Completed (Awaiting Human Squash Merge — PR #53)  

---

## 1. Objective & Business Value

Redesign both facets of the AlongSide Homepage—the **Authenticated Child Advisory Cockpit (`/dashboard`)** and the **Public Advisory Sanctuary Landing Page (`/`)**—to fully align with **AlongSide v2.5.0: The Platform Advisory Sanctuary & Prioritized Parent Intelligence Academy**.

In Paperclip task **SOU-65**, the CEO and Product Visionary established that AlongSide must be:
> *"The place that makes you keep up with your child and up to date with him... an advisory platform, a place parents resort to in order to get a better education and understanding regarding their children."*

Following the successful execution and merge of Plans 29–32 (streamlined 4-tab navbar, canonical 5 categories & prioritized chapters API, Academy curriculum explorer, and Sunday Culture Digest living feed), the existing homepage interfaces remain frozen in legacy paradigms:
1. **Authenticated Dashboard (`/dashboard`):** Still contains `QuickHealthTriageLauncher.tsx` ("Weight-based dosing & safe fever duration protocols", symptom checklists), which promotes the exact low-retention, high-liability clinical calculator trap explicitly rejected by product leadership. It also lacks a first-class connection to the new Prioritized Academy Chapters and Sunday Culture Digest living feed.
2. **Public Landing Homepage (`/`):** Still promotes obsolete v2.4.0 medical triage and symptom math ("From 2:00 AM pediatric fever triage..."), links to retired routes (`/health`, `/nutrition`, `/behavior`), and fails to showcase the core v2.5.0 advisory value proposition: **"Keep up with your child as they grow."**

This plan delivers a unified, serene, and high-retention advisory homepage experience across both public and authenticated contexts, turning AlongSide into the definitive digital sanctuary for modern parents.

---

## 2. Inputs & Architectural References

- **Canonical Advisory Specification:** [`docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md`](../docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md) (Sections 1, 2, 3.1, 3.5)
- **Canonical Product Scope:** [`docs/PROJECT_SCOPE.md`](../docs/PROJECT_SCOPE.md)
- **System Architecture:** [`docs/system-architecture.md`](../docs/system-architecture.md)
- **Codebase Design Specification:** [`docs/codebase-design.md`](../docs/codebase-design.md) (Deep modules & clean seams)
- **Frontend Autonomous Skill Matrix:** [`docs/frontend-skill-matrix.md`](../docs/frontend-skill-matrix.md)
- **Plan Standards:** [`docs/plan-standards.md`](../docs/plan-standards.md)
- **Merged PRs from Phase 9:**
  - PR #48: `feat(web): navigation & platform shell advisory pivot` (Plan 29)
  - PR #49: `feat(api): academy categories & prioritized chapters API` (Plan 30)
  - PR #50: `feat(web): sunday culture digest living feed and dinner starters` (Plan 32)
  - PR #51: `feat(web): parent intelligence academy curriculum explorer and chapter reader` (Plan 31)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** Plans 29, 30, 31, and 32 are merged into `main` (verified commits `85efe44`, `4c43554`, `5782845`, `97a8e05`).
- **Data Contracts:**
  - `@alongside/shared` exports canonical constants: `AcademyCategory`, `ChapterPriority`, `DevelopmentalTier`, `RoadType`.
  - Fastify API endpoints operational:
    - `GET /api/v1/academy/categories` & `GET /api/v1/academy/modules`
    - `GET /api/v1/digest/latest`
    - `GET /api/v1/children`
    - `POST /api/v1/ai-advisor/chat`
- **Verification:** Run `npm run typecheck` across all workspaces to confirm zero TypeScript compilation errors.

---

## 4. Step-by-Step Implementation Tasks

### Part A: The Authenticated Child Advisory Cockpit (`/dashboard`)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATED HOME COCKPIT (/dashboard)                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [Child Avatar + Name]  [Leo · 10 yrs, 4 mos · Pre-Teen]  [Road: Active-Device]         │
│ ACTIVE LEAP: Adrenarche, Social Dopamine Sensitivity & Peer Orientation               │
├──────────────────────────────────────────────────┬─────────────────────────────────────┤
│ 1. PRIORITIZED ACADEMY: CONTINUE LEARNING        │ 2. THIS WEEK'S CULTURE PULSE (DIGEST│
│ • Chapter 1: Amygdala Meltdown De-escalation     │ • Issue #42: Slang Radar & Memes    │
│   [Priority 1: Critical & Foundational]          │ • Word of the Week: "Crashout"      │
│ • Category: Behavior & Emotions                  │   (Cringe Meter: 4/5)               │
│ • Progress: [████████░░░░] 1 of 3 Chapters       │ • Dinner Starter: "Funniest meme?"  │
│ • [ Resume Micro-Lesson (4 min) → ]             │ • Early Alert: Lootbox Dopamine     │
│                                                  │ • [ Read Full Digest → ]            │
├──────────────────────────────────────────────────┴─────────────────────────────────────┤
│ 3. DAILY CALM ADVISORY SCRIPT & ACTIONABLE DIALOGUE                                    │
│ • Today's Scenario: When Leo says "All my friends have phones except me!"              │
│ • What NOT to Say: "You don't need what everyone else has."                            │
│ • What TO Say: "I hear that it feels lonely when friends talk about group chats..."    │
│ • [ Practice in AI Voice Sparring Simulator → ]                                        │
├──────────────────────────────────────────────────┬─────────────────────────────────────┤
│ 4. BILATERAL TECH & CURFEW STATUS                │ 5. ASK 24/7 AI CHILD ADVISOR        │
│ • Active Bedtime Hardware Dock: 8:30 PM Lock     │ • Quick prompt chips for Leo        │
│ • Enforced via Pact-as-Code · Zero Spyware       │ • "How to handle bedtime protests"  │
│ • [ View Bilateral Pact & Device Rules → ]       │ • [ Ask Instant Advisor → ]         │
└──────────────────────────────────────────────────┴─────────────────────────────────────┘
```

#### Task 1: Authenticated Child Advisory Hero Card (`apps/web/src/components/dashboard/ChildHeroCard.tsx` / `ChildAdvisoryHeroCard.tsx`)
1. Modernize `ChildHeroCard.tsx` into an authoritative developmental advisory cockpit:
   - Displays active child's name, avatar, and dynamically derived exact age in months and years (`formatChildAge(child)`).
   - Developmental Tier indicator badge (`Pre-Teen (Ages 10–12)`).
   - **Current Neurodevelopmental Leap Indicator**: Reassuring biological explanation of what the child's brain is experiencing today:
     * *Tier 0 (0–3y):* Sensory Co-Regulation & Pre-Verbal Secure Attachment.
     * *Tier 1 (4–6y):* Theory of Mind, Emotional Autonomy & Impulse Scaffolding.
     * *Tier 2 (7–9y):* Prefrontal Inhibitory Control & Cooperative Play Strategy.
     * *Tier 3 (10–12y):* Adrenarche, Social Dopamine Shift & Peer Identity Alignment.
     * *Tier 4 (13–15y):* Biological Circadian Delay & Algorithmic Feed Resistance.
     * *Tier 5 (16–18y):* Executive Autonomy, Digital Footprint & Young Adult Sovereignty.
   - Road Status Pill: Pre-Device (Readiness Assessment Mode) vs Active-Device (Hardware Bedtime Dock Active).
   - Friendly date header and multi-child switch trigger.

#### Task 2: Priority 1-2-3 Academy "Continue Learning" Anchor (`apps/web/src/components/dashboard/ActiveChapterContinueCard.tsx`)
1. Create `ActiveChapterContinueCard.tsx` to directly anchor the homepage to the Parent Intelligence Academy:
   - Queries `getAcademyModules({ tier: effectiveTier })` or uses active child progress.
   - Finds the highest-priority incomplete course and chapter for the child's tier.
   - Displays:
     * Course Title (e.g. *"Tween Adrenarche & Emotional Volatility"*).
     * Active Chapter Title (e.g. *"Chapter 1: The Biological Awakening to Peer Status & Mood Swings"*).
     * **Distinctive Priority Badge**:
       - Priority 1: `Critical & Foundational` (Rose/Amber badge — "Start Here").
       - Priority 2: `Daily Routines & Co-Regulation` (Teal/Emerald badge).
       - Priority 3: `Advanced Scaffolding & Growth` (Indigo/Purple badge).
     * Category Tag: e.g. `Behavior & Emotions` or `Pediatric Health & Sleep`.
     * Estimated study time (e.g. `4 min read`).
     * Progress bar: `Chapter 1 of 3 Completed (33%)`.
     * Direct CTA Button: `Resume Micro-Lesson` linking to `/academy/[slug]/[lessonSlug]`.
     * Secondary link: `Browse All 5 Categories` linking to `/academy`.

#### Task 3: Weekly Youth Culture Digest Live Briefing Card (`apps/web/src/components/dashboard/SundayCultureDigestCard.tsx`)
1. Upgrade `SundayCultureDigestCard.tsx` to serve as the high-frequency weekly culture pulse:
   - Queries `getLatestDigest()` with resilient fallbacks.
   - Current Edition tag: `Issue #42 · Sunday Youth Culture Digest`.
   - **Trending Slang Word of the Week**: Term, phonetic pronunciation, definition, and visual Cringe Meter (1–5) (e.g. *Crashout* — "Explosive reaction to minor friction", Cringe 4/5).
   - **Sunday Dinner Table Conversation Starter**: Thought-provoking question tailored to the child's age tier with a 1-click `Copy Prompt` button.
   - **Exploit & Dark Pattern Early Warning**: Alert tag warning of current predatory mechanics (e.g. *Disguised Calculator Vault apps* or *Roblox trade scams*) with calm parental guidance.
   - Primary CTA: `Explore Slang Radar & Full Digest` linking to `/digest`.

#### Task 4: Daily Calm Advisory Script & Actionable Dialogue (`apps/web/src/components/dashboard/DailyAdvisoryScriptCard.tsx`)
1. Create `DailyAdvisoryScriptCard.tsx`:
   - Presents a daily word-for-word dialogue script tailored to the child's developmental tier.
   - Highlights the contrast:
     * ❌ **What NOT to Say (Reactive):** Dismissive or punitive responses.
     * ✅ **What TO Say (Empathetic & Firm):** Calm co-regulation language based on developmental neurobiology.
   - Includes a 1-click `Practice in AI Sparring` button linking to `/advisor?scenario=...` with the prompt pre-loaded in the AI Child Advisor.

#### Task 5: Bilateral Tech Governance & Bedtime Curfew Status (`apps/web/src/components/dashboard/BilateralPactStatusCard.tsx`)
1. Create `BilateralPactStatusCard.tsx`:
   - For **Active-Device** children:
     * Displays Bedtime Dock status: *"Bedtime Dock: 8:30 PM — Hardware Enforced"*.
     * Reassures with *"Zero Spyware · Pact-as-Code Protection"*.
     * Displays pact agreement date and dual signatures indicator.
     * CTA: `Review Family Pact & Schedule` -> `/devices`.
   - For **Pre-Device** children:
     * Displays First-Phone Readiness Score: *"Readiness Assessment: 78/100"*.
     * Suggests the next developmental milestone before smartphone unboxing.
     * CTA: `Retake Readiness Assessment` -> `/devices`.

#### Task 6: Assemble the Authenticated Home Feed & Permanently Purge Medical Calculator Clutter (`apps/web/src/components/dashboard/HolisticHomeFeed.tsx`)
1. Overhaul `HolisticHomeFeed.tsx`:
   - **PERMANENTLY PURGE** `QuickHealthTriageLauncher.tsx` from the feed. Eliminate all mentions of "Weight-based dosing" and medication calculators.
   - Layout the 4 core advisory sections:
     * Top: `ChildHeroCard` (Advisory Horizon & Active Leap).
     * Primary Grid (Left Column 7 cols):
       - `ActiveChapterContinueCard` (Priority 1–3 Academy Chapter).
       - `DailyAdvisoryScriptCard` (Word-for-Word Dialogue Script).
     * Secondary Grid (Right Column 5 cols):
       - `SundayCultureDigestCard` (Slang Radar, Cringe Meter, Dinner Starter).
       - `BilateralPactStatusCard` (8:30 PM Dock or Readiness Score).
       - `AskAdvisorPromptBar` (Contextual sparring prompts).
   - Ensure seamless backward compatibility for all props (`initialChildId`).

---

### Part B: The Public Advisory Sanctuary Landing Homepage (`/`)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PUBLIC LANDING HOMEPAGE (apps/web/src/app/page.tsx)             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION:                                                                          │
│ "The Parent Advisory Sanctuary: Keep Up With Your Child As They Grow."                 │
│ Clinical science, prioritized micro-courses, youth culture digest & bilateral pacts.   │
│ [ Start 7-Day Free Trial ]   [ Explore 0–18 Advisory Curriculum ]                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ INTERACTIVE LIFESPAN ADVISORY EXPLORER (6 TIERS: 0-3, 4-6, 7-9, 10-12, 13-15, 16-18)   │
│ Toggle any age to preview real platform cards:                                         │
│ • Active Neurodevelopmental Leap  • Prioritized Academy Chapter (P1, P2, P3)          │
│ • Youth Culture & Slang Reality   • Word-for-Word Empathy Script ("What to Say")       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ THE 3 CORE ADVISORY PILLARS SHOWCASE:                                                  │
│ 1. Parent Intelligence Academy (5 Categories · Priority 1 to 3 Chapters)              │
│ 2. Sunday Youth Culture Digest (Weekly Feed · Slang Radar · Dinner Starters)           │
│ 3. Bilateral Family Pacts & Devices (Pact-as-Code · 8:30 PM Dock · 0-100 Readiness)   │
│ + Omnipresent 24/7 AI Child Advisor (Roleplay Sparring & Instant Guidance)             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ LIVE INTERACTIVE DEMO: SUNDAY SLANG RADAR & DINNER STARTERS PLAYGROUND                 │
│ Test terms like "Crashout", "Rizz", "Skibidi" with live Cringe Meter & Draw Starters    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ BILATERAL TECH SOVEREIGNTY: PACT-AS-CODE (Zero Spyware · Bedtime Curfews)             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CLINICAL AUTHORITY & TESTIMONIALS  •  PRICING ($79/yr Hero Pass)  •  ADVISORY FAQ      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Task 7: Modernize the Public Hero Section (`apps/web/src/components/home/HeroSection.tsx`)
1. Update `HeroSection.tsx`:
   - Positioning Badge: `Clinical Pediatric Science • Prioritized Parent Academy • Weekly Youth Culture Digest • Zero-Spyware Pacts`.
   - Headline:  
     `The Parent Advisory Sanctuary: Keep Up With Your Child As They Grow.`
   - Subheadline:  
     `Replace parenting anxiety, guilt, and 2:00 AM panic Googling with clinical developmental science, prioritized 5-minute micro-courses, weekly youth culture intelligence, and bilateral screen pacts (Ages 0–18).`
   - Primary CTAs:  
     `Start 7-Day Risk-Free Trial` (Primary) and `Explore Advisory Curriculum` (Secondary anchor scroll).
   - Trust Badges:  
     `Pediatric Neurobiology`, `AAP & CDC Milestones`, `Zero-Spyware Privacy Pledge`, `Cancel Anytime 1-Click`.

#### Task 8: Interactive 6-Stage Lifespan Advisory Explorer (`apps/web/src/components/home/LifespanStageSelector.tsx`)
1. Evolve `LifespanStageSelector.tsx` to cover all 6 canonical lifespan tiers:
   - Stage 0: Infants & Toddlers (Ages 0–3)
   - Stage 1: Early Childhood (Ages 4–6)
   - Stage 2: Middle Childhood (Ages 7–9)
   - Stage 3: Pre-Teens & Tweens (Ages 10–12)
   - Stage 4: Early Adolescence (Ages 13–15)
   - Stage 5: Late Adolescence & Launch (Ages 16–18)
2. For each stage, render 4 concrete, interactive preview cards:
   - **Card 1: Neurodevelopmental Leap:** The brain science and emotional leaps happening at this stage.
   - **Card 2: Prioritized Academy Chapter:** Showing course title with Priority 1 (`Critical Foundations`), Priority 2 (`Daily Routines`), or Priority 3 (`Growth`).
   - **Card 3: Youth Culture & Slang:** What peer culture, games, and memes kids encounter at this stage.
   - **Card 4: Actionable Dialogue ("What to Say"):** Exact empathetic wording to use during conflict.

#### Task 9: The 3 Core Pillars Architecture Showcase (`apps/web/src/components/home/PillarsShowcase.tsx`)
1. Update `PillarsShowcase.tsx` to align with AlongSide v2.5.0:
   - **Pillar 1: Parent Intelligence Academy (The Advisory Core):**
     * 5 canonical categories: Behavior & Emotions, Pediatric Health & Sleep, Nutrition & Feeding, Development & Play, Modern Digital World.
     * Courses divided into prioritized chapters (Priority 1 Critical to Priority 3 Scaffolding).
     * Links directly to `/academy`.
   - **Pillar 2: Sunday Youth Culture Digest (The Weekly Living Feed):**
     * "Keep up with your child": Searchable slang decoder with 1-5 Cringe Meter, Exploit Early Warnings, and Sunday dinner conversation starters.
     * Links directly to `/digest`.
   - **Pillar 3: Bilateral Family Pacts & Modern Devices (Tech Sovereignty):**
     * Pact-as-Code hardware curfews (8:30 PM bed dock), First-Phone Readiness assessment (0-100), digital signatures, zero spyware.
     * Links directly to `/devices`.
   - **Global Companion: 24/7 AI Child Advisor:**
     * Voice sparring simulator, instant empathy scripts, multi-child memory.
     * Links directly to `/advisor`.

#### Task 10: Interactive Sunday Culture Playground Demo (`apps/web/src/components/home/CulturePlaygroundDemo.tsx`)
1. Create `CulturePlaygroundDemo.tsx` embedded on the public landing page:
   - An interactive widget where visiting parents can type or click modern slang terms (*"Crashout"*, *"Rizz"*, *"Skibidi"*, *"Cooked"*, *"Fanum Tax"*) to see instant definitions and the visual Cringe Meter.
   - Includes an interactive "Draw Sunday Dinner Starter" button showing how AlongSide sparks organic family dinner conversations.

#### Task 11: Assemble Redesigned Public Homepage (`apps/web/src/app/page.tsx`)
1. Integrate the modernized components in `page.tsx`:
   - `<HeroSection />`
   - `<LifespanStageSelector />`
   - `<PillarsShowcase />`
   - `<CulturePlaygroundDemo />`
   - `<DeviceActionHubSpotlight />`
   - `<ClinicalAuthorityTestimonials />`
   - `<PricingSection />`
   - `<FaqSection />`
2. Eradicate all legacy links pointing to retired `/health`, `/nutrition`, and `/behavior` standalone pages; ensure all CTAs route to `/academy?category=...`, `/digest`, or `/register`.

---

## 5. Specific Deliverables (Files to Create / Modify)

### `apps/web`:
- [ ] `apps/web/src/components/dashboard/ChildHeroCard.tsx` (Update with developmental leap indicators & advisory horizon)
- [ ] `apps/web/src/components/dashboard/ActiveChapterContinueCard.tsx` (New: Priority 1-2-3 Academy continue learning card)
- [ ] `apps/web/src/components/dashboard/SundayCultureDigestCard.tsx` (Update with slang radar, cringe meter & dinner starter)
- [ ] `apps/web/src/components/dashboard/DailyAdvisoryScriptCard.tsx` (New: Daily dialogue script & sparring launcher)
- [ ] `apps/web/src/components/dashboard/BilateralPactStatusCard.tsx` (New: Bedtime dock & readiness score status)
- [ ] `apps/web/src/components/dashboard/HolisticHomeFeed.tsx` (Assemble advisory home feed; completely purge `QuickHealthTriageLauncher`)
- [ ] `apps/web/src/components/home/HeroSection.tsx` (Update public hero with v2.5.0 Advisory Sanctuary positioning)
- [ ] `apps/web/src/components/home/LifespanStageSelector.tsx` (Update with 6-stage advisory preview cards)
- [ ] `apps/web/src/components/home/PillarsShowcase.tsx` (Update with the 3 Core Pillars + AI Advisor)
- [ ] `apps/web/src/components/home/CulturePlaygroundDemo.tsx` (New: Interactive slang & dinner starter demo)
- [ ] `apps/web/src/app/page.tsx` (Assemble redesigned public homepage)
- [ ] `apps/web/test/advisoryHomepageFeed.test.tsx` (New: Vitest suite verifying advisory cards, priority badges & purged calculator)

---

## 6. Acceptance Criteria & Verification Plan

1. **Authenticated Cockpit (`/dashboard`):**
   - Active child header displays child name, derived exact age, tier badge, and current neurodevelopmental leap.
   - `ActiveChapterContinueCard` displays the highest-priority incomplete chapter with a Priority badge (Priority 1, 2, or 3) and 1-click CTA linking to `/academy/[slug]/[lesson]`.
   - `SundayCultureDigestCard` displays Issue #, trending slang word with Cringe Meter, Sunday dinner conversation starter, and 1-click CTA linking to `/digest`.
   - `DailyAdvisoryScriptCard` displays empathetic word-for-word dialogue and AI voice sparring trigger.
   - `BilateralPactStatusCard` displays bedtime dock status (8:30 PM lock) or readiness score (0–100).
   - **`QuickHealthTriageLauncher` is completely absent from the page.** Zero medication dosing calculator inputs or weight division references exist.
2. **Public Landing Homepage (`/`):**
   - Hero section clearly states *"The Parent Advisory Sanctuary: Keep Up With Your Child As They Grow"*.
   - Lifespan Stage Selector allows toggling across all 6 tiers (0–3 through 16–18), displaying concrete leap, course, culture, and dialogue previews.
   - 3 Pillars section highlights Academy (5 categories, prioritized chapters), Sunday Culture Digest (slang radar, dinner starters), and Family Pacts (Pact-as-Code).
   - Zero broken or retired links (`/health`, `/nutrition` standalone pages are replaced with `/academy?category=...` or `/register`).
3. **Automated Testing & Static Analysis:**
   - `npm run typecheck` passes with exit code 0 across all 4 monorepo packages.
   - Vitest test suite `apps/web/test/advisoryHomepageFeed.test.tsx` passes with 100% success.
   - Pre-commit diff audited with `ponytail-review` to ensure zero speculative bloat.

---

## 7. Role Boundaries & Prohibitions

- **Assigned Agent:** **Frontend Agent** (`apps/web`).
- ❌ **DO NOT** edit files inside `apps/api/` or `packages/database/`.
- ❌ **DO NOT** write backend SQL queries or Fastify route handlers; reuse existing endpoints in `apps/web/src/lib/api/`.
- ❌ **DO NOT** re-introduce antipyretic dosing calculators, weight division inputs, or medical dosage forms.
- ❌ **DO NOT** create shallow wrapper components without behavioral leverage.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct `apps/web/` directories.
- [x] Authenticated `/dashboard` prominently displays Child Advisory Horizon, Priority 1–3 Academy card, Sunday Culture Digest card, Daily Script, and Pact status.
- [x] `QuickHealthTriageLauncher` and all medical dosing calculator elements permanently purged from `/dashboard`.
- [x] Public `/` homepage showcases the v2.5.0 Advisory Sanctuary positioning, 6-stage lifespan explorer, and 3 Core Pillars.
- [x] `npm run typecheck` exits with code 0.
- [x] Vitest test suite passes with 100% success (34/34 web suites, 490/490 tests monorepo-wide).
- [x] Diff audited with `ponytail-review` verifying the smallest complete change.
- [x] Feature branch `feat/SOU-71-platform-advisory-homepage-and-child-cockpit-redesign-ui` pushed and PR opened targeting `main` with plain text (`.txt`) description.
