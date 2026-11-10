# Plan 36: Early Childhood Tier 0 Decomposition & Sub-Tranche Engine
**Plan ID:** `PLAN-36`  
**Assignee:** Joint (FE & BE)  
**Dependencies:** PLAN-30, PLAN-33, PLAN-35  
**Estimated Scope:** Medium  
**Paperclip Issue:** SOU-84  
**Status:** Approved Architectural Plan (Ready for Agent Delegation)  

---

## 1. Objective & Business Value

Decompose the monolithic early childhood developmental tier (`TIER_0_INFANCY_TODDLER_0_3`, Ages 0–3) into **3 distinct, developmentally accurate canonical macro tiers**:
- **Tier 0A:** `TIER_0A_INFANCY_0_1` (Ages 0–1 / 0–12 Months: Somatic Regulation, Sleep Architecture & Feeding Foundations)
- **Tier 0B:** `TIER_0B_TODDLER_1_2` (Ages 1–2 / 12–24 Months: Locomotion, First Words & Amygdala Co-Regulation)
- **Tier 0C:** `TIER_0C_OLDER_TODDLER_2_3` (Ages 2–3 / 24–36 Months: Autonomy, Language Burst, Boundary Testing & Potty Learning)

Simultaneously introduce an **Intra-Tier Micro-Tranche Engine** (`EarlyChildhoodTranche`) that resolves granular sub-stages within Year 1 (0–3m Fourth Trimester, 4–6m Awakening/Allergens, 7–12m Mobile Explorer) and Years 1–3 without exploding top-level database enums or creating combinatorial course bloat.

This transition resolves a foundational product and medical trust barrier: parents of newborns are no longer presented with toddler tantrum guides, and parents of 3-year-olds are no longer shown infant sleep-sack advice.

---

## 2. Inputs & Architectural References

- **Canonical System Design Specification:** [`docs/system-design-tier-0-decomposition.md`](../docs/system-design-tier-0-decomposition.md)
- **Master Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md)
- **Codebase Design Principles:** [`docs/codebase-design.md`](../docs/codebase-design.md) (Deep modules, in-memory fakes, clean seams)
- **Clinical & Developmental Research:**
  - [`docs/research/developmental-milestones-0-18.md`](../docs/research/developmental-milestones-0-18.md) (CDC 75th percentile milestones)
  - [`docs/research/pediatric-health-triage-protocols.md`](../docs/research/pediatric-health-triage-protocols.md) (Neonatal fever emergency triage)
  - [`docs/research/pediatric-nutrition-feeding-science.md`](../docs/research/pediatric-nutrition-feeding-science.md) (Allergen exposure windows & BLW)
- **Team Governance:** [`AGENTS.md`](../AGENTS.md) and [`docs/plan-standards.md`](../docs/plan-standards.md)

---

## 3. Preconditions & Dependency Verification

- **Codebase Baseline:** Repository on `main` branch with all tests passing (`npm run typecheck`, `npm test` exit 0).
- **Prisma Migration State:** Current database migration chain clean; PostgreSQL 16 instance accessible.
- **Shared Package Linking:** `@alongside/shared` exports build cleanly via `npm run build -w packages/shared`.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Database Schema Evolution & Additive Enum Migration (`packages/database`) [Assignee: Backend Agent]
1. Update `packages/database/prisma/schema.prisma`:
   - Expand `DevelopmentalTier` enum with `TIER_0A_INFANCY_0_1`, `TIER_0B_TODDLER_1_2`, and `TIER_0C_OLDER_TODDLER_2_3`.
   - Preserve `TIER_0_INFANCY_TODDLER_0_3` and legacy aliases (`TIER_1_AGES_8_9`, etc.) for zero-downtime backward compatibility.
2. Generate PostgreSQL migration:
   - Add new enum values via `ALTER TYPE "DevelopmentalTier" ADD VALUE ...`.
   - Author a safe data migration step that updates existing `children` records where `developmentalTier = 'TIER_0_INFANCY_TODDLER_0_3'`:
     * If `age <= 1` $\implies$ `'TIER_0A_INFANCY_0_1'`.
     * If `age == 2` $\implies$ `'TIER_0B_TODDLER_1_2'`.
     * If `age == 3` $\implies$ `'TIER_0C_OLDER_TODDLER_2_3'`.
3. Update `packages/database/prisma/seed/` to seed tailored courses, milestones, and behavioral guides for `TIER_0A`, `TIER_0B`, and `TIER_0C`.

### Task 2: Shared Contracts & Pure Algorithmic Resolution (`packages/shared`) [Assignee: Backend Agent]
1. In `packages/shared/src/constants/index.ts`:
   - Add `TIER_0A_INFANCY_0_1`, `TIER_0B_TODDLER_1_2`, and `TIER_0C_OLDER_TODDLER_2_3` to `DevelopmentalTier`.
   - Define runtime `EarlyChildhoodTranche` enum (`INFANT_FOURTH_TRIMESTER_0_3M`, `INFANT_AWAKENING_4_6M`, `INFANT_MOBILE_EXPLORER_7_12M`, `TODDLER_FIRST_STEPS_12_18M`, `TODDLER_LANGUAGE_BURST_18_24M`, `OLDER_TODDLER_AUTONOMY_24_30M`, `OLDER_TODDLER_PRESCHOOL_PREP_30_36M`).
2. In `packages/shared/src/algorithms/childTier.ts`:
   - Update `mapAgeToLifespanTier` to accept `(ageYears: number, ageMonths?: number)` and map to `TIER_0A`, `TIER_0B`, or `TIER_0C`.
   - Author `resolveEarlyChildhoodTranche(ageMonths: number): EarlyChildhoodTranche | null`.
   - Ensure `mapAgeToDevelopmentalTier` retains full backward compatibility for legacy callers.
3. In `packages/shared/src/schemas/`:
   - Update `academy.ts`, `child.ts`, `faq.ts`, and `pact.ts` Zod schemas to validate new tier values.
4. Author comprehensive unit tests in `packages/shared/test/childTier.test.ts` covering month-by-month boundary conditions (e.g. 0m, 3m, 6m, 12m, 24m, 36m).

### Task 3: Backend API Service & Route Verification (`apps/api`) [Assignee: Backend Agent]
1. Verify child creation and update endpoints (`POST /api/v1/children`, `PATCH /api/v1/children/:id`) correctly derive and validate `TIER_0A`, `TIER_0B`, and `TIER_0C`.
2. Ensure Academy routes (`GET /api/v1/academy/categories`, `GET /api/v1/academy/modules`) filter accurately across the 3 decomposed tiers.
3. Update Fastify integration tests in `apps/api/test/children.test.ts` and `apps/api/test/academy.test.ts` to assert that infant and toddler profiles receive the correct decomposed tier and modules.

### Task 4: Frontend Horizon Stage Selector Expansion (`apps/web`) [Assignee: Frontend Agent]
1. In `apps/web/src/components/home/LifespanStageSelector.tsx`:
   - Replace `CANONICAL_6_LIFESPAN_STAGES` with `CANONICAL_8_LIFESPAN_STAGES`.
   - Create distinct stage entries for:
     * `infancy-0-1`: Tier 0A (`Ages 0–1`, "Physical Health, Sleep & Safe Feeding Foundations")
     * `toddler-1-2`: Tier 0B (`Ages 1–2`, "Locomotion, Language Bursts & Co-Regulation")
     * `older-toddler-2-3`: Tier 0C (`Ages 2–3`, "Autonomy, Boundary Testing & Potty Readiness")
   - Style the selector buttons as an 8-segment wrapped pill bar with responsive grid layout (4 columns on desktop, 2-row wrapped grid on mobile) adhering to the Editorial Pediatric Almanac design system (`MASTER.md`).
2. Connect each stage to its canonical 5 category courses with clear lesson counts, duration, and slugs.

### Task 5: Child Onboarding, Cockpit & Age Badge Hardening (`apps/web`) [Assignee: Frontend Agent]
1. Update child age and tier display helpers:
   - In `apps/web/src/components/children/ChildCard.tsx` and `ChildOnboardingFlow.tsx`:
     * When `ageYears <= 1`, display age in months (e.g., `"4 Months Old"` instead of `"0 Years Old"`).
     * Render the micro-tranche label (e.g., `"Awakening & Allergen Window"` for 4–6m).
2. Update `ActiveChildCalibrationBanner.tsx` and `DashboardView.tsx` to handle `TIER_0A`, `TIER_0B`, and `TIER_0C` theme palettes and badges.

### Task 6: Clinical AI Advisor Context Invariant Injection (`apps/api`) [Assignee: Joint (FE & BE)]
1. Update `apps/api/src/modules/ai-advisor/ai-advisor.service.ts`:
   - When building the system prompt for a child in `TIER_0A_INFANCY_0_1`, inject high-priority clinical invariants:
     * Infant fever $\ge 100.4^\circ\text{F}$ under 90 days = RED ZONE EMERGENCY.
     * AAP zero screen rule under 24 months.
     * Breastmilk/formula exclusively under 4 months; LEAP allergen window at 4–6 months.
   - For `TIER_0B_TODDLER_1_2`: inject physiological anorexia reassurance, 2-to-1 nap transition, and external nervous system anchoring for tantrums.
   - For `TIER_0C_OLDER_TODDLER_2_3`: inject autonomy support, potty learning readiness, and boundary consistency without shame.

---

## 5. Specific Deliverables (Files to Create / Modify)

### Shared Contract Layer:
- `packages/shared/src/constants/index.ts` — Add `TIER_0A`, `TIER_0B`, `TIER_0C` and `EarlyChildhoodTranche`.
- `packages/shared/src/algorithms/childTier.ts` — Add `resolveEarlyChildhoodTranche` and update `mapAgeToLifespanTier`.
- `packages/shared/src/schemas/academy.ts` — Update Zod enums.
- `packages/shared/src/schemas/child.ts` — Update child DTO schemas.
- `packages/shared/test/childTier.test.ts` — Unit test suite for new tier and tranche logic.

### Database Layer:
- `packages/database/prisma/schema.prisma` — Update `DevelopmentalTier` enum.
- `packages/database/prisma/migrations/*_tier_0_decomposition/migration.sql` — SQL migration script.
- `packages/database/prisma/seed/academy.seed.ts` — Seed modules for 0A, 0B, 0C across all 5 categories.
- `packages/database/prisma/seed/milestones.seed.ts` — Seed CDC 75th percentile milestones linked to 0A, 0B, 0C.

### Backend API:
- `apps/api/src/modules/children/children.service.ts` — Update tier derivation logic.
- `apps/api/src/modules/ai-advisor/ai-advisor.service.ts` — Inject clinical prompt invariants.
- `apps/api/test/children.test.ts` — Integration tests for 0A, 0B, 0C child profiles.
- `apps/api/test/academy.test.ts` — Integration tests for 0A, 0B, 0C course filtering.

### Frontend Web:
- `apps/web/src/components/home/LifespanStageSelector.tsx` — Evolve to `CANONICAL_8_LIFESPAN_STAGES`.
- `apps/web/src/components/children/ChildOnboardingFlow.tsx` — Month-accurate age inputs and tranche preview.
- `apps/web/src/components/children/ChildCard.tsx` — Infant month badge and tier label formatting.
- `apps/web/src/components/academy/ActiveChildCalibrationBanner.tsx` — Calibration styling for 0A, 0B, 0C.

---

## 6. Acceptance Criteria & Verification Plan

### Automated Test Verification:
1. **Shared Algorithms:**
   ```bash
   npm test -w packages/shared -- test/childTier.test.ts
   ```
   Asserts that 2-month-old $\to$ `TIER_0A` / `INFANT_FOURTH_TRIMESTER_0_3M`, 15-month-old $\to$ `TIER_0B` / `TODDLER_FIRST_STEPS_12_18M`, and 30-month-old $\to$ `TIER_0C` / `OLDER_TODDLER_AUTONOMY_24_30M`.
2. **Backend Fastify Integration Tests:**
   ```bash
   npm test -w apps/api -- test/children.test.ts test/academy.test.ts
   ```
   Asserts status 200/201, correct DTO payloads, and zero regression on existing Tiers 1–5.
3. **TypeScript Monorepo Typecheck:**
   ```bash
   npm run typecheck
   ```
   Must exit with code 0 across all workspaces.

---

## 7. Role Boundaries & Prohibitions

- **CTO Mandate:** Maintain architectural integrity, author specifications, and delegate tasks. Zero direct application edits.
- **Frontend Agent Mandate:** Confined strictly to `apps/web/`. Must not edit Prisma models, SQL, or Fastify route handlers.
- **Backend Agent Mandate:** Confined strictly to `apps/api/`, `packages/database/`, and `@alongside/shared`. Must not edit React components or CSS.
- **Zero Autonomous Merge Gate:** Pull requests must remain open for human review.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables authored in designated paths.
- [ ] Prisma schema migrated with zero data loss on existing `TIER_0` records.
- [ ] `@alongside/shared` exports updated with full backward compatibility.
- [ ] 15 tailored early childhood Academy courses (5 categories $\times$ 3 tiers) seeded.
- [ ] Homepage stage selector renders all 8 canonical lifespan tiers cleanly on mobile (360px) and desktop (1440px).
- [ ] `npm run typecheck` exits with code 0.
- [ ] Automated unit and integration test suites pass with 100% success.
- [ ] Pull requests opened targeting `main` with plain text (`.txt`) descriptions and issue IDs linked (`Fixes SOU-84`).
