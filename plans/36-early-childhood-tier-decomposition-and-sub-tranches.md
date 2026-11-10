# Plan 36: Early Childhood Tier 0 Decomposition & Sub-Tranche Engine
**Plan ID:** `PLAN-36`  
**Assignee:** Joint (FE & BE)  
**Dependencies:** PLAN-30, PLAN-33, PLAN-35  
**Estimated Scope:** Large (Cross-monorepo tier expansion, migration & UI calibration)  
**Paperclip Issue:** SOU-84, SOU-90  
**Status:** Approved Architectural Plan (Audited & Synchronized with Monorepo Baseline)  

---

## 1. Objective & Business Value

Decompose the monolithic early childhood developmental tier (`TIER_0_INFANCY_TODDLER_0_3`, Ages 0–3) into **3 distinct, developmentally accurate canonical macro tiers**:
- **Tier 0A:** `TIER_0A_INFANCY_0_1` (Ages 0–1 / 0–12 Months: Somatic Regulation, Sleep Architecture & Feeding Foundations)
- **Tier 0B:** `TIER_0B_TODDLER_1_2` (Ages 1–2 / 12–24 Months: Locomotion, First Words & Amygdala Co-Regulation)
- **Tier 0C:** `TIER_0C_OLDER_TODDLER_2_3` (Ages 2–3 / 24–36 Months: Autonomy, Language Burst, Boundary Testing & Potty Learning)

Simultaneously introduce an **Intra-Tier Micro-Tranche Engine** (`EarlyChildhoodTranche`) that resolves granular sub-stages within Year 1 (0–3m Fourth Trimester, 4–6m Awakening/Allergens, 7–12m Mobile Explorer) and Years 1–3 without exploding top-level database enums or creating combinatorial course bloat.

### 1.1 Architectural Audit Findings (SOU-90)
This updated plan addresses two foundational engineering questions evaluated in Paperclip task SOU-90:
1. **Does the original plan cover everything that should be changed?**
   - **Finding:** No. The original draft missed critical parts of the application blast radius:
     - The central client-side reactive age derivation hook (`apps/web/src/hooks/useChildAge.ts`).
     - The active child store and developmental horizon resolver (`apps/web/src/stores/useChildContextStore.ts`).
     - The primary active child cockpit hero card (`apps/web/src/components/dashboard/ChildHeroCard.tsx`).
     - Fastify route JSON schema validators (`apps/api/src/modules/children/children.routes.ts`, `academy.routes.ts`, `faqs.routes.ts`) which enforce strict enum validation.
     - Database seed files beyond academy/milestones (`behavior.seed.ts`, `brainGames.seed.ts`, `faqs.seed.ts`, `health.seed.ts`).
     - The frontend offline/mock API data layer (`apps/web/src/lib/api/mocks.ts`, `advisor.ts`, `behavior.ts`, `brainGames.ts`, `milestones.ts`).
     - Over 10 existing unit and integration test suites that assert `TIER_0` or 6 canonical stages.
2. **Is the original plan up to date with our code?**
   - **Finding:** No. The original draft contained several discrepancies with the current repository:
     - Referenced non-existent files (`apps/web/src/components/children/ChildCard.tsx` and `DashboardView.tsx`).
     - Cited a clinical triage research document (`docs/research/pediatric-health-triage-protocols.md`) that was purged in SOU-86 (commit `9581bec`).
     - Conflicted with SOU-86's non-clinical family OS mandate by attempting to inject clinical symptom emergency red flags into the AI Advisor system prompt (which are already handled upstream by `ClinicalSafeHarborFilter` in `safe-harbor.filter.ts`).
     - Omitted recent major features: SOU-80's Living Cultural Magazine (`CulturalReelsView.tsx`, `WeeklyMagazineView.tsx`, `StageTailoredVocabularyView.tsx`) and SOU-85's bite-sized micro-stream academy architecture.

This revised plan provides 100% comprehensive, end-to-end coverage across all packages and workspaces.

---

## 2. Inputs & Architectural References

- **Canonical System Design Specification:** [`docs/system-design-tier-0-decomposition.md`](../docs/system-design-tier-0-decomposition.md)
- **Master Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md)
- **Codebase Design Principles:** [`docs/codebase-design.md`](../docs/codebase-design.md) (Deep modules, in-memory fakes, clean seams)
- **Developmental Research & Foundations:**
  - [`docs/research/developmental-milestones-0-18.md`](../docs/research/developmental-milestones-0-18.md) (CDC 75th percentile milestones)
  - [`docs/research/pediatric-nutrition-feeding-science.md`](../docs/research/pediatric-nutrition-feeding-science.md) (Allergen exposure windows & BLW)
  - [`docs/research/age-by-age-neurodevelopment-matrix.md`](../docs/research/age-by-age-neurodevelopment-matrix.md) (Neurobiology from birth to 18)
- **Team Governance:** [`AGENTS.md`](../AGENTS.md) and [`docs/plan-standards.md`](../docs/plan-standards.md)
- **Platform Strategic Boundary:** Non-Clinical Family OS Mandate ([`README.md`](../README.md) & [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) v2.4.0)

---

## 3. Preconditions & Dependency Verification

- **Codebase Baseline:** Repository on `main` branch with test suites passing.
- **Database & Prisma Baseline:** PostgreSQL 16 active with `pgvector`; clean Prisma migration history.
- **Contract Layer Linked:** `@alongside/shared` compiles cleanly via `npm run build -w packages/shared`.
- **Preceding Plans:** PLAN-30 (Academy Categories API), PLAN-33 (Advisory Homepage), PLAN-35 (Streamlined Developmental Horizon UI) merged and verified.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Database Schema Evolution, Additive Migration & Multi-Seed Updates (`packages/database`) [Assignee: Backend Agent]
1. Update `packages/database/prisma/schema.prisma`:
   - Expand `DevelopmentalTier` enum with `TIER_0A_INFANCY_0_1`, `TIER_0B_TODDLER_1_2`, and `TIER_0C_OLDER_TODDLER_2_3`.
   - Preserve `TIER_0_INFANCY_TODDLER_0_3` and legacy aliases (`TIER_1_AGES_8_9`, etc.) for zero-downtime backward compatibility.
2. Generate PostgreSQL migration:
   - Add new enum values via `ALTER TYPE "DevelopmentalTier" ADD VALUE ...`.
   - Author a safe data migration step that updates existing `children` records where `developmentalTier = 'TIER_0_INFANCY_TODDLER_0_3'`:
     * If `age <= 1` $\implies$ `'TIER_0A_INFANCY_0_1'`.
     * If `age == 2` $\implies$ `'TIER_0B_TODDLER_1_2'`.
     * If `age == 3` $\implies$ `'TIER_0C_OLDER_TODDLER_2_3'`.
3. Update ALL seed files in `packages/database/prisma/seed/`:
   - **`academy.seed.ts`**: Seed 15 tailored early childhood modules (5 categories $\times$ 3 tiers: 0A, 0B, 0C) with bite-sized chapters and lessons.
   - **`milestones.seed.ts`**: Retarget the 24 early childhood milestones:
     * Months 2, 4, 6, 9, 12 $\to$ `TIER_0A_INFANCY_0_1`
     * Months 15, 18, 24 $\to$ `TIER_0B_TODDLER_1_2`
     * Months 30, 36 $\to$ `TIER_0C_OLDER_TODDLER_2_3`
   - **`behavior.seed.ts`**:
     * Add 2 new infant guides for `TIER_0A_INFANCY_0_1` (purple crying / pre-verbal soothing and sensory overload).
     * Retarget existing toddler guides to `TIER_0B_TODDLER_1_2` (hitting/biting under frustration) and `TIER_0C_OLDER_TODDLER_2_3` (grocery store tantrum / autonomy testing).
   - **`brainGames.seed.ts`**:
     * Retarget barnyard animal puppet play $\to$ `TIER_0A_INFANCY_0_1` (serve-and-return).
     * Retarget warm water sensory tub $\to$ `TIER_0B_TODDLER_1_2` (fine motor & tactile).
     * Retarget unit block tower demolition $\to$ `TIER_0C_OLDER_TODDLER_2_3` (spatial planning & delayed gratification).
   - **`faqs.seed.ts`**:
     * Categorize the 50+ early childhood FAQs across `TIER_0A` (sleep architecture, milk/solids, wake windows), `TIER_0B` (walking safety, 2-to-1 naps, first tantrums), and `TIER_0C` (potty learning, boundary testing, neophobia).
   - **`health.seed.ts`**:
     * Add `TIER_0A_INFANCY_0_1`, `TIER_0B_TODDLER_1_2`, and `TIER_0C_OLDER_TODDLER_2_3` to `targetTiers` arrays across symptom protocols.

### Task 2: Shared Contracts, Micro-Tranches & Pure Algorithms (`packages/shared`) [Assignee: Backend Agent]
1. In `packages/shared/src/constants/index.ts`:
   - Add `TIER_0A_INFANCY_0_1`, `TIER_0B_TODDLER_1_2`, and `TIER_0C_OLDER_TODDLER_2_3` to `DevelopmentalTier`.
   - Define runtime `EarlyChildhoodTranche` enum:
     * `INFANT_FOURTH_TRIMESTER_0_3M`
     * `INFANT_AWAKENING_4_6M`
     * `INFANT_MOBILE_EXPLORER_7_12M`
     * `TODDLER_FIRST_STEPS_12_18M`
     * `TODDLER_LANGUAGE_BURST_18_24M`
     * `OLDER_TODDLER_AUTONOMY_24_30M`
     * `OLDER_TODDLER_PRESCHOOL_PREP_30_36M`
2. In `packages/shared/src/algorithms/childTier.ts`:
   - Update `mapAgeToLifespanTier(ageYears: number, ageMonths?: number): DevelopmentalTier`:
     * If `ageMonths !== undefined && ageMonths <= 36`:
       - `ageMonths <= 12` $\implies$ `TIER_0A_INFANCY_0_1`
       - `ageMonths <= 24` $\implies$ `TIER_0B_TODDLER_1_2`
       - `ageMonths <= 36` $\implies$ `TIER_0C_OLDER_TODDLER_2_3`
     * Else fallback: `ageYears <= 1` $\implies$ `TIER_0A`, `ageYears === 2` $\implies$ `TIER_0B`, `ageYears === 3` $\implies$ `TIER_0C`.
   - Author `resolveEarlyChildhoodTranche(ageMonths: number): EarlyChildhoodTranche | null`.
   - Update `calculateLifespanTier(birthYear: number, birthMonth: number, currentDate?: Date, ageMonths?: number)` to compute and pass `ageMonths`.
   - Ensure `mapAgeToDevelopmentalTier` retains full backward compatibility for legacy callers.
3. In `packages/shared/src/types/index.ts`:
   - Verify `ChildDTO` includes `ageMonths?: number | null;` and `earlyChildhoodTranche?: EarlyChildhoodTranche | null;`.
4. In `packages/shared/src/schemas/`:
   - Update `academy.ts`: Add new tiers to `AcademyTierSchema`.
   - Update `child.ts`: Update `CreateChildSchema` and `UpdateChildSchema`.
   - Update `faq.ts` and `pact.ts`: Validate new tier values.
5. Author comprehensive unit tests in `packages/shared/test/childTier.test.ts` covering month-by-month boundary conditions (0m, 3m, 6m, 12m, 18m, 24m, 30m, 36m) and verifying backward compatibility.

### Task 3: Backend Fastify API Hardening, Route Schemas & Age Calculation (`apps/api`) [Assignee: Backend Agent]
1. Update Fastify route JSON schemas with new enum values:
   - `apps/api/src/modules/children/children.routes.ts`: Update `childDtoSchema.properties.developmentalTier.enum`.
   - `apps/api/src/modules/academy/academy.routes.ts`: Update `tierEnum` to include `TIER_0A_INFANCY_0_1`, `TIER_0B_TODDLER_1_2`, and `TIER_0C_OLDER_TODDLER_2_3`.
   - `apps/api/src/modules/faqs/faqs.routes.ts`: Update `querystring.properties.tier.enum`.
2. Update `apps/api/src/modules/children/children.service.ts`:
   - In `createChild` & `updateChild`: Use `calculateLifespanTier` with `birthYear` and `birthMonth`.
   - In `mapToDTO`: Compute and return `ageMonths = calculateChildAgeMonths(record.birthDate || new Date(record.birthYear, record.birthMonth - 1, 1))`.
3. Update Fastify integration test suites:
   - `apps/api/test/children.test.ts`: Verify 0A, 0B, 0C derivation and `ageMonths` return.
   - `apps/api/test/academy.test.ts` & `academyPrioritizedChapters.test.ts`: Verify module filtering for 0A, 0B, 0C.
   - `apps/api/test/faqs.test.ts`, `behavior.test.ts`, `brain-games.test.ts`, `milestones.test.ts`: Ensure zero 400 validation regressions when filtering by decomposed tiers.

### Task 4: AI Child Advisor Developmental Neurobiology Prompt Injection (`apps/api`) [Assignee: Backend Agent]
1. Update `apps/api/src/modules/ai-advisor/prompt.builder.ts`:
   - In `buildAdvisorSystemPrompt(context)`:
     * When child is in `TIER_0A_INFANCY_0_1`: Inject Somatic Regulation & Circadian Foundations (wake windows 45–90m, 4-month sleep regression, serve-and-return attunement, exclusive milk/formula under 4m, allergen window at 4–6m).
     * For `TIER_0B_TODDLER_1_2`: Inject Amygdala Co-Regulation & Locomotion (toddler tantrums as pre-verbal limbic overflow, adult as external nervous system, physiological toddler anorexia reassurance, 2-to-1 nap drop).
     * For `TIER_0C_OLDER_TODDLER_2_3`: Inject Autonomy & Boundary Testing (Erikson's Autonomy vs Shame, setting firm loving limits without shame/anger, toilet learning readiness, language burst scaffolding).
   - Note: Emergency crisis guardrails (including neonatal fever <90 days) remain securely enforced upstream by `ClinicalSafeHarborFilter` in `safe-harbor.filter.ts`.

### Task 5: Reactive Child Age Derivation, Store & Cockpit Modernization (`apps/web`) [Assignee: Frontend Agent]
1. In `apps/web/src/hooks/useChildAge.ts`:
   - Update `deriveDevelopmentalTier(ageYears: number, ageMonths?: number): DevelopmentalTier`:
     * Incorporate `ageMonths`:
       - `ageMonths <= 12` $\implies$ `TIER_0A_INFANCY_0_1`
       - `ageMonths <= 24` $\implies$ `TIER_0B_TODDLER_1_2`
       - `ageMonths <= 36` $\implies$ `TIER_0C_OLDER_TODDLER_2_3`
     * Fallback to `ageYears`: `ageYears <= 1` $\to$ `TIER_0A`, `ageYears === 2` $\to$ `TIER_0B`, `ageYears === 3` $\to$ `TIER_0C`.
   - Add `earlyChildhoodTranche: EarlyChildhoodTranche | null` to `ChildAgeProfile`.
2. In `apps/web/src/stores/useChildContextStore.ts`:
   - Update `getChildDevelopmentalHorizon(tierOrAge)`:
     * Add dedicated metadata for `TIER_0A_INFANCY_0_1` ("Infancy & Somatic Regulation", Ages 0–1), `TIER_0B_TODDLER_1_2` ("Younger Toddlerhood & Locomotion", Ages 1–2), and `TIER_0C_OLDER_TODDLER_2_3` ("Older Toddlerhood & Autonomy", Ages 2–3).
3. In `apps/web/src/components/dashboard/ChildHeroCard.tsx`:
   - Replace `[DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]` in `DEVELOPMENTAL_LEAPS` with distinct leap definitions for `TIER_0A`, `TIER_0B`, and `TIER_0C`.

### Task 6: Homepage 8-Stage Horizon Selector Expansion & Almanac Styling (`apps/web`) [Assignee: Frontend Agent]
1. In `apps/web/src/components/home/LifespanStageSelector.tsx`:
   - Replace `CANONICAL_6_LIFESPAN_STAGES` with `CANONICAL_8_LIFESPAN_STAGES` (retaining backward-compatible export alias).
   - Define 8 stages:
     1. `infancy-0-1`: Tier 0A (`Ages 0–1`, "Physical Health, Sleep Architecture & Safe Feeding Foundations")
     2. `toddler-1-2`: Tier 0B (`Ages 1–2`, "Locomotion, First Words & Amygdala Co-Regulation")
     3. `older-toddler-2-3`: Tier 0C (`Ages 2–3`, "Autonomy, Boundary Testing & Potty Readiness")
     4. `early-childhood-4-6`: Tier 1 (`Ages 4–6`)
     5. `middle-childhood-7-9`: Tier 2 (`Ages 7–9`)
     6. `pre-teens-10-12`: Tier 3 (`Ages 10–12`)
     7. `early-adolescence-13-15`: Tier 4 (`Ages 13–15`)
     8. `late-adolescence-16-18`: Tier 5 (`Ages 16–18`)
   - Style the selector buttons as an 8-segment wrapped pill rail conforming to Editorial Pediatric Almanac guidelines (`MASTER.md`).
2. Update unit test `apps/web/src/components/home/LifespanStageSelector.test.tsx` to assert all 8 stages and 40 category courses.

### Task 7: Child Onboarding Flow, Modal & Account Settings Tier Hardening (`apps/web`) [Assignee: Frontend Agent]
1. In `apps/web/src/components/children/ChildOnboardingFlow.tsx`:
   - Update `getTierDisplay(tier)` to handle `TIER_0A_INFANCY_0_1`, `TIER_0B_TODDLER_1_2`, and `TIER_0C_OLDER_TODDLER_2_3`.
   - Render micro-tranche preview badge for children $\le 36$ months.
2. In `apps/web/src/components/settings/AccountSettingsView.tsx`:
   - Verify child profile cards format infant ages accurately (e.g. `"4 mo"` instead of `"0 yrs"`) and display decomposed tier badges.

### Task 8: Academy Catalog, Behavior, Play & Culture Digest Stage Adaptation (`apps/web`) [Assignee: Frontend Agent]
1. In `apps/web/src/components/academy/ActiveChildCalibrationBanner.tsx`:
   - Expand `TIER_OPTIONS` and `getTierStageName()` with `TIER_0A`, `TIER_0B`, and `TIER_0C`.
2. In `apps/web/src/components/academy/AcademyCatalogClient.tsx`:
   - Update `normalizeTier()` to handle 0A, 0B, 0C.
3. In `apps/web/src/components/academy/ModuleCard.tsx`:
   - Add switch cases for 0A, 0B, 0C badge color schemes.
4. In `apps/web/src/components/dashboard/AcademyBriefingCard.tsx`:
   - Add switch cases for 0A, 0B, 0C.
5. In `apps/web/src/components/behavior/BehaviorDashboardView.tsx`:
   - Update `TIER_OPTIONS` filter dropdown to include 0A, 0B, 0C.
6. In `apps/web/src/components/brain-games/PlayActivityCatalog.tsx`:
   - Update `TIER_FILTERS` tab list to include 0A, 0B, 0C.
7. In `apps/web/src/components/advisor/FaqExplorerView.tsx` & `FaqCard.tsx`:
   - Update `TIER_TABS` and `FaqCard` badge styling for 0A, 0B, 0C.
8. In `apps/web/src/components/digest/` (`CulturalReelsView.tsx`, `WeeklyMagazineView.tsx`, `GenerationalTimeMirrorView.tsx`, `StageTailoredVocabularyView.tsx`):
   - Refine `resolveVocabStage`, `resolveReelsStage`, etc. to distinguish infant acoustic signals (0–12m) from toddler first-word explosion (12–36m).

### Task 9: Frontend API Mock Layer Synchronization (`apps/web`) [Assignee: Frontend Agent]
1. Update mock datasets in `apps/web/src/lib/api/`:
   - `mocks.ts`: Add demo courses for 0A, 0B, 0C.
   - `advisor.ts`: Distribute early childhood mock FAQs across 0A, 0B, 0C.
   - `behavior.ts`: Add 0A infant soothing guide and retarget toddler guides to 0B/0C.
   - `brainGames.ts`: Retarget activities across 0A, 0B, 0C.
   - `milestones.ts`: Retarget milestones across 0A, 0B, 0C.

---

## 5. Specific Deliverables (Files to Create / Modify)

### Shared Contract Layer (`packages/shared`):
- `packages/shared/src/constants/index.ts` — Add `TIER_0A`, `TIER_0B`, `TIER_0C` and `EarlyChildhoodTranche`.
- `packages/shared/src/types/index.ts` — Ensure `ageMonths` and `earlyChildhoodTranche` are on `ChildDTO`.
- `packages/shared/src/algorithms/childTier.ts` — Author `resolveEarlyChildhoodTranche`; update `mapAgeToLifespanTier` and `calculateLifespanTier`.
- `packages/shared/src/schemas/academy.ts` — Update `AcademyTierSchema`.
- `packages/shared/src/schemas/child.ts` — Update `CreateChildSchema` and `UpdateChildSchema`.
- `packages/shared/src/schemas/faq.ts` — Update `FaqQuerySchema`.
- `packages/shared/src/schemas/pact.ts` — Update `CreateAgreementSchema`.
- `packages/shared/test/childTier.test.ts` — Comprehensive unit test suite for decomposed tiers and micro-tranches.

### Database Layer (`packages/database`):
- `packages/database/prisma/schema.prisma` — Expand `DevelopmentalTier` enum.
- `packages/database/prisma/migrations/*_tier_0_decomposition/migration.sql` — Additive SQL migration script.
- `packages/database/prisma/seed/academy.seed.ts` — Seed 15 courses for 0A, 0B, 0C.
- `packages/database/prisma/seed/milestones.seed.ts` — Retarget early childhood milestones to 0A, 0B, 0C.
- `packages/database/prisma/seed/behavior.seed.ts` — Add infant soothing guides and retarget toddler guides.
- `packages/database/prisma/seed/brainGames.seed.ts` — Retarget play activities across 0A, 0B, 0C.
- `packages/database/prisma/seed/faqs.seed.ts` — Retarget FAQs across 0A, 0B, 0C.
- `packages/database/prisma/seed/health.seed.ts` — Update symptom protocol target tiers.

### Backend API (`apps/api`):
- `apps/api/src/modules/children/children.routes.ts` — Update route validation enum.
- `apps/api/src/modules/children/children.service.ts` — Derive lifespan tier with ageMonths; return ageMonths in DTO.
- `apps/api/src/modules/academy/academy.routes.ts` — Update `tierEnum`.
- `apps/api/src/modules/faqs/faqs.routes.ts` — Update `querystring.tier.enum`.
- `apps/api/src/modules/ai-advisor/prompt.builder.ts` — Inject developmental neurobiology invariants for 0A, 0B, 0C.
- `apps/api/test/children.test.ts` — Integration tests for 0A, 0B, 0C child profiles.
- `apps/api/test/academy.test.ts` — Integration tests for 0A, 0B, 0C course filtering.
- `apps/api/test/academyPrioritizedChapters.test.ts` — Category course counting integration tests.

### Frontend Web (`apps/web`):
- `apps/web/src/hooks/useChildAge.ts` — Month-accurate tier derivation and tranche resolution.
- `apps/web/src/stores/useChildContextStore.ts` — Decomposed developmental horizon metadata.
- `apps/web/src/components/dashboard/ChildHeroCard.tsx` — Decomposed developmental leaps.
- `apps/web/src/components/home/LifespanStageSelector.tsx` — Expand to `CANONICAL_8_LIFESPAN_STAGES`.
- `apps/web/src/components/home/LifespanStageSelector.test.tsx` — 8-stage unit test assertions.
- `apps/web/src/components/children/ChildOnboardingFlow.tsx` — Decomposed tier badges and tranche preview.
- `apps/web/src/components/academy/ActiveChildCalibrationBanner.tsx` — Decomposed tier options.
- `apps/web/src/components/academy/AcademyCatalogClient.tsx` — Decomposed tier normalization.
- `apps/web/src/components/academy/ModuleCard.tsx` — Decomposed badge styling.
- `apps/web/src/components/dashboard/AcademyBriefingCard.tsx` — Decomposed briefing badges.
- `apps/web/src/components/behavior/BehaviorDashboardView.tsx` — Decomposed tier options.
- `apps/web/src/components/brain-games/PlayActivityCatalog.tsx` — Decomposed tier filters.
- `apps/web/src/components/advisor/FaqExplorerView.tsx` & `FaqCard.tsx` — Decomposed tier tabs and cards.
- `apps/web/src/components/digest/StageTailoredVocabularyView.tsx` & Reels/Magazine views — Infant vs toddler separation.
- `apps/web/src/lib/api/mocks.ts`, `advisor.ts`, `behavior.ts`, `brainGames.ts`, `milestones.ts` — Synchronized mock data.

---

## 6. Acceptance Criteria & Verification Plan

### Automated Test Verification:
1. **Shared Algorithms & Tranches:**
   ```bash
   npm test -w packages/shared -- test/childTier.test.ts
   ```
   Asserts:
   - 2 months $\to$ `TIER_0A_INFANCY_0_1` / `INFANT_FOURTH_TRIMESTER_0_3M`
   - 5 months $\to$ `TIER_0A_INFANCY_0_1` / `INFANT_AWAKENING_4_6M`
   - 10 months $\to$ `TIER_0A_INFANCY_0_1` / `INFANT_MOBILE_EXPLORER_7_12M`
   - 15 months $\to$ `TIER_0B_TODDLER_1_2` / `TODDLER_FIRST_STEPS_12_18M`
   - 22 months $\to$ `TIER_0B_TODDLER_1_2` / `TODDLER_LANGUAGE_BURST_18_24M`
   - 28 months $\to$ `TIER_0C_OLDER_TODDLER_2_3` / `OLDER_TODDLER_AUTONOMY_24_30M`
   - 34 months $\to$ `TIER_0C_OLDER_TODDLER_2_3` / `OLDER_TODDLER_PRESCHOOL_PREP_30_36M`
2. **Backend Fastify Integration Tests:**
   ```bash
   npm test -w apps/api -- test/children.test.ts test/academy.test.ts test/academyPrioritizedChapters.test.ts
   ```
   Asserts status 200/201, correct DTO payloads with `ageMonths`, and zero regression on existing Tiers 1–5.
3. **Frontend Component & Horizon Tests:**
   ```bash
   npm test -w apps/web -- src/components/home/LifespanStageSelector.test.tsx test/childAgeDerivation.test.ts
   ```
   Asserts 8 stages render properly and child age derivation calculates 0A, 0B, 0C reactively.
4. **TypeScript Monorepo Typecheck:**
   ```bash
   npm run typecheck
   ```
   Must exit with code 0 across all 4 workspaces (`shared`, `database`, `api`, `web`).

---

## 7. Role Boundaries & Prohibitions

- **CTO Mandate:** Maintain architectural integrity, author specifications, and delegate tasks. Zero direct application edits.
- **Frontend Agent Mandate:** Confined strictly to `apps/web/`. Must not edit Prisma models, SQL, or Fastify route handlers.
- **Backend Agent Mandate:** Confined strictly to `apps/api/`, `packages/database/`, and `@alongside/shared`. Must not edit React components or CSS.
- **Zero Autonomous Merge Gate:** Pull requests must remain open for human review.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables authored in designated paths across `shared`, `database`, `api`, and `web`.
- [ ] Prisma schema migrated with zero data loss on existing `TIER_0` records.
- [ ] `@alongside/shared` exports updated with full backward compatibility.
- [ ] All database seeds (`academy`, `milestones`, `behavior`, `brainGames`, `faqs`, `health`) updated for 0A, 0B, 0C.
- [ ] Fastify route JSON schemas updated so `tier=TIER_0A_INFANCY_0_1` passes validation.
- [ ] `useChildAge` hook and `useChildContextStore` provide reactive month-accurate 0A, 0B, 0C derivation.
- [ ] Homepage stage selector renders all 8 canonical lifespan tiers cleanly on mobile (360px) and desktop (1440px).
- [ ] `npm run typecheck` exits with code 0 across the entire monorepo.
- [ ] Automated unit and integration test suites pass with 100% success.
- [ ] Pull requests opened targeting `main` with plain text (`.txt`) descriptions and issue IDs linked (`Fixes SOU-84`).
