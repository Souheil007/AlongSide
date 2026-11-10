# Plan 28: Parent Intelligence Academy Lifespan Curriculum & Tier Expansion (Ages 0–18)
**Plan ID:** `PLAN-28`  
**Assignee:** Joint (CTO & Specialized Engineering Team)  
**Dependencies:** PLAN-08, PLAN-09, PLAN-16, PLAN-25  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-55  

---

## 1. Objective & Business Value

In Paperclip task **SOU-55**, leadership highlighted that the Parental Intelligence Academy had not been updated to reflect AlongSide's transition to a **Universal Lifespan Family OS (Ages 0–18)**:
> *"Our parental intelligence academy is not updated, it still doesn't have courses for all the tiers and ages we are offering, since we are handling ages from 0–18, we have to fix it and update it."*

Previously, the Academy was restricted to 4 legacy tiers covering ages 8–18. Parents of infants, toddlers, and preschoolers (Ages 0–6) had zero neurodevelopmental guidance, and older adolescents (16–18) lacked structured preparation for adult autonomy.

This plan executes a comprehensive overhaul:
1. Expands the shared contract schema (`AcademyTierSchema`) to validate all 6 canonical lifespan tiers (`TIER_0_INFANCY_TODDLER_0_3` through `TIER_5_LATE_ADOLESCENCE_16_18`) while retaining full backward compatibility for legacy tier queries.
2. Authors 6 comprehensive, pediatrician- and neuroscientist-backed course modules and 18 structured micro-lessons in `packages/database/prisma/seed/academy.seed.ts`.
3. Upgrades Fastify routes and `AcademyRepository` with bidirectional tier equivalence matching.
4. Enhances the frontend catalog (`AcademyCatalogClient.tsx`) with 6 distinct lifespan tabs, automatic active-child tier pre-selection, and polished badges in `ModuleCard.tsx`.
5. Updates the full test suite across `@alongside/api` and `@alongside/web`.

---

## 2. Inputs & Architectural References

- **Academy Lifespan Spec:** [`docs/lifespan-parent-intelligence-academy-spec.md`](../docs/lifespan-parent-intelligence-academy-spec.md)
- **Product Scope v2.4.0:** [`docs/PROJECT_SCOPE.md`](../docs/PROJECT_SCOPE.md)
- **Data Models:** [`docs/data-models.md`](../docs/data-models.md)
- **System Architecture:** [`docs/system-architecture.md`](../docs/system-architecture.md)
- **Code Quality Principles:** [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md)
- **Git Commit Standards:** [`docs/engineering-standards/git-commit-standards.md`](../docs/engineering-standards/git-commit-standards.md)

---

## 3. Preconditions & Monorepo State

- `packages/shared/src/constants/index.ts` defines all 6 canonical lifespan tiers:
  * `TIER_0_INFANCY_TODDLER_0_3`
  * `TIER_1_EARLY_CHILDHOOD_4_6`
  * `TIER_2_MIDDLE_CHILDHOOD_7_9`
  * `TIER_3_PRE_TEEN_10_12`
  * `TIER_4_EARLY_ADOLESCENCE_13_15`
  * `TIER_5_LATE_ADOLESCENCE_16_18`
- `packages/database/prisma/schema.prisma` enum `DevelopmentalTier` includes all 6 tiers.
- Existing tests in `@alongside/api` and `@alongside/web` pass.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Expand Shared Validation Schema (`packages/shared/src/schemas/academy.ts`)
- Update `AcademyTierSchema` to a `z.enum` including all 6 canonical lifespan tiers and 4 legacy aliases.
- Ensure `AcademyModulesQuerySchema` consumes the expanded enum.

### Task 2: Fastify Route Schema & Serialization (`apps/api/src/modules/academy/academy.routes.ts`)
- Update Fastify `querystring.tier` schema to validate all 10 tier values (6 canonical + 4 legacy).
- Update Fastify response serializer `academyModuleDtoSchema.developmentalTier` to support all 10 tier values.

### Task 3: Bidirectional Tier Equivalence (`apps/api/src/modules/academy/academy.repository.ts`)
- Author `getEquivalentTiers(tier: string): string[]` mapping legacy query params to canonical representations and vice versa.
- Update `PrismaAcademyRepository.findModules()` to query across equivalent tiers.
- Update `InMemoryAcademyRepository.findModules()` to filter across equivalent tiers.

### Task 4: Complete Lifespan Curriculum Dataset (`packages/database/prisma/seed/academy.seed.ts`)
- Author 6 rich neurodevelopmental modules with 18 structured micro-lessons:
  1. **Tier 0 (Ages 0–3):** `infant-sensory-milestones-and-coregulation`
     * *Sensory Overload & The Immature Amygdala: Why Toddlers Melt Down*
     * *Zero Screens Before Age 2: The Neuroscience of 3D Language Acquisition*
     * *The Calm Anchor: How Parents Wire Nervous System Resilience*
  2. **Tier 1 (Ages 4–6):** `early-childhood-executive-function-and-play`
     * *Theory of Mind: Why 4-Year-Olds Struggle to Share and Cooperate*
     * *Purposeful Play vs. Fast-Paced Animation: Building Sustained Attention Spans*
     * *Ending Bedtime Battles: Sleep Pressure, Blue Light & Predictable Anchors*
  3. **Tier 2 (Ages 7–9):** `early-impulse-centers-and-shared-media`
     * *The Dopamine Loop: Why Stopping Gameplay Causes Meltdowns*
     * *Co-Viewing & The Scaffolded Experience: Side-by-Side Guidance*
     * *Setting Digital Boundaries Without Triggering Shame*
  4. **Tier 3 (Ages 10–12):** `tween-neurobiology-and-adrenarche`
     * *Adrenarche: The Biological Awakening to Social Standing*
     * *Group Chats, Disappearing Messages & Silent Exclusion*
     * *De-escalating Screen Friction: The 3-Step Empathetic Reset*
  5. **Tier 4 (Ages 13–15):** `pubertal-circadian-delay-and-sleep`
     * *The 2-Hour Melatonin Shift: Why They Can't Sleep at 9:00 PM*
     * *The Refrigerator Basket: Making the 8:30 PM Curfew Neutral*
     * *Algorithmic Feeds: How Infinite Scrolls Exploit Fatigued Brains*
  6. **Tier 5 (Ages 16–18):** `teen-autonomy-and-graduated-privileges`
     * *Moving From Surveillance to Bilateral Agreements: Why Spyware Fails*
     * *Permanence, Screenshots & Impulse Reflection*
     * *When Agreements Break: The Non-Punitive Repair Blueprint*
- Ensure each lesson contains a structured `> **Clinical Insight:**` callout and a `**What to Say:**` actionable dialogue line.

### Task 5: Frontend Catalog Client Upgrades (`apps/web/src/components/academy/AcademyCatalogClient.tsx`)
- Update `TIER_TABS` to render all 6 canonical lifespan tiers (Ages 0–18).
- Implement `normalizeChildTier()` to map any active child profile's tier into its corresponding canonical tab.
- Highlight the active tab and display child-specific personalization callouts.

### Task 6: Module Card Visual Badging (`apps/web/src/components/academy/ModuleCard.tsx`)
- Update `getTierBadgeInfo` with distinct, accessible color tokens for all 6 tiers:
  * Tier 0 (Rose): `bg-rose-50 text-rose-800 border-rose-200`
  * Tier 1 (Amber): `bg-amber-50 text-amber-800 border-amber-200`
  * Tier 2 (Emerald): `bg-emerald-50 text-emerald-800 border-emerald-200`
  * Tier 3 (Teal): `bg-teal-50 text-teal-800 border-teal-200`
  * Tier 4 (Indigo): `bg-indigo-50 text-indigo-800 border-indigo-200`
  * Tier 5 (Purple): `bg-purple-50 text-purple-800 border-purple-200`
- Maintain fallback cases for legacy tier strings to prevent visual regressions.

### Task 7: Academy Hero Copy Upgrade (`apps/web/src/app/(dashboard)/academy/page.tsx`)
- Update hero copy to reflect the whole-child 0–18 lifespan curriculum rather than only tween screen dynamics.

### Task 8: Automated Test Verification
- Update `apps/api/test/academy.test.ts` to assert 6 seeded modules, filtering by canonical `TIER_0`, legacy backward compatibility, and error handling.
- Update `apps/web/test/academy.test.ts` to assert all 6 lifespan badge mappings and legacy compatibility.
- Execute full monorepo typecheck (`npm run typecheck`) and test suite (`npm test`).

---

## 5. Verification & Definition of Done (DoD)

- [x] All 6 canonical lifespan tiers have dedicated modules and 18 structured micro-lessons.
- [x] `packages/shared/src/schemas/academy.ts` accepts all 6 canonical tiers + legacy aliases.
- [x] Fastify routes validate and serialize all 6 tiers without 400 errors.
- [x] `AcademyCatalogClient.tsx` displays 6 lifespan tabs covering ages 0–18.
- [x] `ModuleCard.tsx` styles all 6 tiers with appropriate badge tokens.
- [x] `npm run typecheck` passes with 0 errors across all workspaces.
- [x] `npm test` passes with 43 test files and 391 tests passing.
- [x] Ponytail audit passed (minimal diff size, zero redundant packages).
