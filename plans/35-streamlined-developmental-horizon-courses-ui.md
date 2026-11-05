# Plan 35: Streamlined Developmental Horizon Courses & Category Advisory UI
**Plan ID:** `PLAN-35`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-33, PLAN-30  
**Estimated Scope:** Small  
**Paperclip Issue:** SOU-78 (Parent: SOU-77)  
**Status:** Complete (PR Pending)  

---

## 1. Objective & Business Value

Streamline the homepage **Developmental Horizon Advisory Section** (`apps/web/src/components/home/LifespanStageSelector.tsx`) to eliminate outdated pediatric triage / symptom emergency widgets, dense neurobiological descriptions, and slang cringe meters, focusing exclusively on AlongSide's core curriculum proposition:

> *"Focus on that section to point out that we have courses for each tier and tranche age, and that they are tailored to your child's age, and that we have different categories, and that is the only thing we should be showing up there. Keep it appealing, concise, and to the point—without bluffing with a lot of text."* (SOU-77)

By replacing the legacy 4-card layout (neurodevelopmental leap, priority chapter, youth culture slang, what-to-say script) and the outdated 2:00 AM pediatric fever simulation widget with a sleek, appealing 5-category tailored course grid, AlongSide reinforces its positioning as the serene, definitive **Platform Advisory Sanctuary & Prioritized Parent Intelligence Academy**.

---

## 2. Inputs & Architectural References

- **Parent Paperclip Task:** SOU-77 (`.paperclip-task.md`)
- **Canonical Design System:** [`design-system/alongside/MASTER.md`](../design-system/alongside/MASTER.md) (Taste 2: Editorial Pediatric Almanac)
- **Design Tokens & Typography:** Newsreader (`font-serif`), Inter (`font-sans`), JetBrains Mono (`font-mono`), Spruce Green (`#143D2B`), Spruce Light (`#EAF3EE`), Hairline Borders (`#E3E3DC`).
- **Canonical Academy Categories & Tiers:**
  - Categories: `BEHAVIOR_AND_EMOTIONS`, `HEALTH_AND_WELLNESS`, `NUTRITION_AND_FEEDING`, `DEVELOPMENT_AND_PLAY`, `DIGITAL_AND_DEVICES` ([`packages/shared/src/constants/index.ts`](../packages/shared/src/constants/index.ts))
  - Seed Curriculum: 30 canonical modules in [`packages/database/prisma/seed/academy.seed.ts`](../packages/database/prisma/seed/academy.seed.ts)
- **Frontend Execution Protocol:** [`docs/frontend-skill-matrix.md`](../docs/frontend-skill-matrix.md) and [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Codebase Cleanliness:** Working tree clean on latest `main` (commit `df3f6c5` containing merged PR #66).
- **TypeScript & Test Baseline:** Run `npm run typecheck` and `npm test` across monorepo to ensure zero pre-existing errors.
- **Data Contracts:** Verify `@alongside/shared` exports `AcademyCategory` and `DevelopmentalTier`.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Streamline Data Structures in `LifespanStageSelector.tsx`
1. Redefine `StageData` interface to strictly focus on category-tailored courses:
   ```typescript
   export interface StageCourse {
     category: AcademyCategory;
     categoryLabel: string;
     categoryIcon: LucideIcon;
     title: string;
     summary: string;
     slug: string;
     lessonCount: number;
     durationMinutes: number;
   }

   export interface StageData {
     id: string;
     tier: DevelopmentalTier;
     tabLabel: string;
     ageLabel: string;
     title: string;
     subtitle: string;
     icon: LucideIcon;
     courses: StageCourse[];
   }
   ```
2. Populate `CANONICAL_6_LIFESPAN_STAGES` with the exact 5 courses for each of the 6 developmental tiers from `packages/database/prisma/seed/academy.seed.ts`:
   - **Tier 0 (Ages 0–3: Infants & Toddlers):**
     * Behavior: "Sensory Overload & Infant Co-Regulation"
     * Health: "Infant Health Foundations & Sleep Architecture"
     * Nutrition: "Infant First Foods & Allergen Introduction"
     * Play: "Infant Sensory Awakening & Language Bursts"
     * Digital: "Zero Screens Under 2 & Parent Tech Modeling"
   - **Tier 1 (Ages 4–6: Early Childhood):**
     * Behavior: "Preschool Big Feelings & Theory of Mind"
     * Health: "Preschool Immunity & Restorative Rest"
     * Nutrition: "Preschool Picky Eating & Family Meal Harmony"
     * Play: "Imaginative Play & Executive Function"
     * Digital: "Preschool Media Curation & Stopping Transitions"
   - **Tier 2 (Ages 7–9: Middle Childhood):**
     * Behavior: "Elementary Impulse Control & Sibling Dynamics"
     * Health: "Middle Childhood Physical Health & Sleep"
     * Nutrition: "Elementary Fuel & Sustained Focus"
     * Play: "Logic, Spatial Strategy & Creative Maker Play"
     * Digital: "First Gaming, Dopamine Loops & Readiness"
   - **Tier 3 (Ages 10–12: Pre-Teens & Tweens):**
     * Behavior: "Tween Adrenarche & Emotional Volatility"
     * Health: "Pubertal Physical Leaps & Circadian Delays"
     * Nutrition: "Pre-Teen Growth Spurts & Food Relationship"
     * Play: "Pre-Teen Focus, Flow State & Deep Hobbies"
     * Digital: "Tween Smartphone Transition & Family Pacts"
   - **Tier 4 (Ages 13–15: Early Adolescence):**
     * Behavior: "Adolescent Identity, Defiance & Boundaries"
     * Health: "Adolescent Sleep Protection & Athletic Health"
     * Nutrition: "Adolescent Metabolic Demands & Sports Nutrition"
     * Play: "Critical Thinking & Media Literacy"
     * Digital: "Adolescent Algorithmic Feeds & Digital Reputation"
   - **Tier 5 (Ages 16–18: Late Adolescence):**
     * Behavior: "Late Teen Autonomy & Emotional Sovereignty"
     * Health: "Young Adult Physical Autonomy & Wellness"
     * Nutrition: "Teen Food Sovereignty & Lifelong Habits"
     * Play: "Intellectual Mastery & Real-World Strategy"
     * Digital: "Teen Digital Independence & Young Adult Covenant"
3. Preserve backward-compatible `LIFESPAN_STAGES` export.

### Task 2: Redesign the Presentation Layer (`LifespanStageSelector.tsx`)
1. **Section Header:**
   - Publication badge: `VOL. XXIV // CONTINUOUS LIFESPAN (0–18)`
   - Title: `Tailored Advisory for Every <em className="italic font-normal text-[#143D2B]">Developmental Horizon</em>`
   - Concise subtitle: "Every age presents distinct developmental leaps and parenting challenges. Explore our clinical curriculum tailored specifically for your child's age across 5 core growth categories."
2. **Horizon Selector Tabs:**
   - 6 responsive horizontal buttons with `min-h-[44px]`, clean hairline border `#E3E3DC`, active state with white background, spruce icon, and pill age tag.
3. **Stage Summary Banner:**
   - Stage Horizon Pill: `HORIZON // {activeStage.ageLabel}`
   - Headline: `{activeStage.title}`
   - Subtitle: Crisp 1-sentence value statement explaining the developmental focus.
   - Action Button: `Explore {activeStage.tabLabel} Curriculum` linking to `/academy?tier=${activeStage.tier}`.
4. **5-Category Tailored Course Grid:**
   - Clean, appealing responsive grid (1 col mobile, 2 col sm, 3 col lg/xl) presenting the 5 tailored course cards:
     * Card Header: Category pill badge with icon and category label (e.g., 🧠 Behavior & Emotions, 🩺 Health & Sleep, 🥑 Nutrition & Mealtime, 🧩 Development & Play, 📱 Digital & Devices).
     * Card Body: Course title in bold, followed by a crisp 1–2 sentence summary explaining the actionable guidance.
     * Card Footer: Micro-lesson count + duration tag (e.g. `3 lessons • ~12 min`) and an inviting `View Course →` link directly targeting the module.
5. **Purge Outdated Widgets:**
   - Completely remove the legacy 4 preview cards (neurodevelopmental leap, priority chapter with clinical dialogue badge, youth culture slang with cringe score, dialogue hit script).
   - Completely remove the 2:00 AM pediatric triage simulation card (fever 101.2°F, baked peanut butter allergen, Barton Schmitt Emergency standards).
6. **Reassuring Footer Bar:**
   - Quiet, confident footer callout confirming that all 5 courses are tailored specifically to the selected age band, with a direct CTA to "Browse All Academy Categories →" linking to `/academy`.

### Task 3: Unit Testing & Verification (`LifespanStageSelector.test.tsx`)
1. Create `apps/web/src/components/home/LifespanStageSelector.test.tsx`:
   - Renders section title and 6 developmental horizon tabs.
   - Verifies active stage changes on tab click.
   - Verifies all 5 category cards are rendered for the selected tier.
   - Verifies links route to `/academy` with tier or module parameters.
   - Verifies zero obsolete clinical fever triage or Barton Schmitt text appears.
2. Run test suite: `npm test LifespanStageSelector`.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [x] `plans/35-streamlined-developmental-horizon-courses-ui.md` (This plan file)
- [x] `plans/README.md` (Update index with Plan 35 entry and dependency graph)
- [x] `apps/web/src/components/home/LifespanStageSelector.tsx` (Streamline data and UI)
- [x] `apps/web/src/components/home/LifespanStageSelector.test.tsx` (Comprehensive unit test suite)

---

## 6. Verification & Definition of Done (DoD) Checklist

- [x] `plans/35-streamlined-developmental-horizon-courses-ui.md` created adhering to `docs/plan-standards.md`.
- [x] Outdated triage/emergency widgets and slang cringe meters fully removed from `LifespanStageSelector.tsx`.
- [x] Section showcases all 6 age tranches (0-3, 4-6, 7-9, 10-12, 13-15, 16-18) and the 5 tailored categories.
- [x] No walls of text or bluffing; layout is appealing, concise, and aligned with Editorial Pediatric Almanac design tokens.
- [x] `npm run typecheck` exits with 0 errors across all workspaces.
- [x] `npm test` passes 100% with no regressions.
- [x] `ponytail-review` audit executed on `git diff HEAD`.
- [x] Feature branch pushed and Pull Request opened targeting `main` with plain text (`.txt`) description.
- [x] Pull Request remains **OPEN** for human review and Squash & Merge.
