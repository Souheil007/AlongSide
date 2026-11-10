# Plan 34: Universal Cross-Tab Reactive Child Context Synchronization & Multi-Child Tailoring UI
**Plan ID:** `PLAN-34`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-29, PLAN-30, PLAN-31, PLAN-32, PLAN-33  
**Estimated Scope:** Medium  
**Paperclip Issue:** `SOU-72`  

---

## 1. Objective & Business Value

In multi-child households, parents simultaneously guide children across wildly differing developmental stages (e.g., Mateo at 14 months, Maya at 8 years, and Julian at 14 years). 

The platform must deliver a seamless, zero-flicker **Universal Cross-Tab Reactive Child Tailoring** experience:
> **Whenever a parent switches their active child in the top navigation bar (or mobile drawer), EVERY tab, feed, course explorer, culture radar, device dock, and AI consultation across the entire AlongSide platform MUST automatically and immediately tailor its content, developmental stage, recommendations, and active views to that newly selected child.**

This eliminates parental cognitive load, ensures developmental accuracy, prevents presenting irrelevant content (e.g. teen slang or phone curfews for a 1-year-old infant), and cements AlongSide v2.5.0 as the definitive multi-child Family Operating System.

---

## 2. Inputs & Architectural References
- **Canonical Advisory Spec:** [`docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md`](../docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md) (Section 3.6: Universal Cross-Tab Reactive Child Context Synchronization Standard)
- **Codebase Design Specification:** [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md) (Deep Client Modules & Single Source of Truth)
- **Frontend Autonomous Skill Matrix:** [`docs/engineering-standards/frontend-skill-matrix.md`](../docs/engineering-standards/frontend-skill-matrix.md)
- **Child Context Store:** [`apps/web/src/stores/useChildContextStore.ts`](../apps/web/src/stores/useChildContextStore.ts)
- **Global Header & Navigation:** [`apps/web/src/components/shared/Header.tsx`](../apps/web/src/components/shared/Header.tsx) & [`ChildSelector.tsx`](../apps/web/src/components/shared/ChildSelector.tsx)
- **Parent Intelligence Academy:** [`apps/web/src/components/academy/AcademyCatalogClient.tsx`](../apps/web/src/components/academy/AcademyCatalogClient.tsx) & [`ModuleDetailClient.tsx`](../apps/web/src/components/academy/ModuleDetailClient.tsx)
- **Sunday Youth Culture Digest:** [`apps/web/src/components/digest/DigestDashboardClient.tsx`](../apps/web/src/components/digest/DigestDashboardClient.tsx), [`SlangDecoderView.tsx`](../apps/web/src/components/digest/SlangDecoderView.tsx), [`ExploitAlertsView.tsx`](../apps/web/src/components/digest/ExploitAlertsView.tsx)
- **Family Pacts & Devices Hub:** [`apps/web/src/components/devices/DevicesManagementView.tsx`](../apps/web/src/components/devices/DevicesManagementView.tsx)
- **24/7 AI Child Advisor:** [`apps/web/src/components/advisor/AdvisorDashboardView.tsx`](../apps/web/src/components/advisor/AdvisorDashboardView.tsx) & [`FaqExplorerView.tsx`](../apps/web/src/components/advisor/FaqExplorerView.tsx)

---

## 3. Preconditions & Dependency Verification
- [x] PLAN-29 (Streamlined 4-tab primary navigation shell) merged into `main`.
- [x] PLAN-30 (Canonical 5 categories & 3-priority chapter API) merged into `main`.
- [x] PLAN-31 (Academy curriculum explorer & chapter reader UI) merged into `main`.
- [x] PLAN-32 (Sunday Culture Digest living feed & dinner starters UI) merged into `main`.
- [x] PLAN-33 (Advisory Homepage & Child Cockpit redesign UI) merged into `main`.
- [x] Static typecheck (`npm run typecheck`) and monorepo test suite pass with 100% success.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Pure Child Domain Resolvers & Context Store Hardening (`apps/web/src/stores/useChildContextStore.ts`)
1. Author pure, deterministic selector helpers:
   - `resolveChildSlangTier(child: ChildDTO | null): 'ALL' | 'ELEMENTARY' | 'TWEEN' | 'TEEN' | 'EARLY_CHILDHOOD'`:
     - `age <= 6`: `'EARLY_CHILDHOOD'`
     - `age >= 7 && age <= 9`: `'ELEMENTARY'`
     - `age >= 10 && age <= 12`: `'TWEEN'`
     - `age >= 13`: `'TEEN'`
   - `resolveChildDevicesDefaultTab(child: ChildDTO | null): 'readiness' | 'curfews'`:
     - If `child?.roadType === RoadType.PRE_DEVICE` -> `'readiness'`
     - If `child?.roadType === RoadType.ACTIVE_DEVICE` -> `'curfews'`
     - Fallback: `'readiness'` if age <= 9, else `'curfews'`.
2. Harden `setActiveChild(childId: string)`:
   - Sets `activeChildId: childId` in Zustand.
   - Syncs `localStorage.setItem(ACTIVE_CHILD_STORAGE_KEY, childId)`.
   - Safely updates browser URL query string `?childId=<id>` via `window.history.replaceState`.
   - Dispatches a custom window event (`alongside:child-change`) so any decoupled non-React or cross-island listeners synchronize cleanly.

### Task 2: Parent Intelligence Academy Reactive Calibration (`apps/web/src/components/academy/`)
1. In [`AcademyCatalogClient.tsx`](../apps/web/src/components/academy/AcademyCatalogClient.tsx):
   - Listen reactively to `activeChildId` and `activeChild?.developmentalTier` / `activeChild?.age`.
   - When active child changes, immediately re-calibrate `selectedTier` to the new child's normalized tier.
   - Update `ActiveChildCalibrationBanner` to show the active child's name, age, and developmental stage label.
   - TanStack Query automatically refetches `/api/v1/academy/modules?category=...&tier=...` filtered to the newly selected child's tier.
2. In [`ModuleDetailClient.tsx`](../apps/web/src/components/academy/ModuleDetailClient.tsx):
   - Access `activeChild` from `useChildContextStore`.
   - Render a contextual calibration status chip:
     - If `module.developmentalTier` matches the active child: *"✓ Calibrated for [ChildName] (Age [X])"*.
     - If `module.developmentalTier` differs: *"Stage Note: This course covers [ModuleTierLabel]. Active child [ChildName] is in [ChildTierLabel]."* with a 1-tap button to view courses calibrated for [ChildName].

### Task 3: Sunday Youth Culture Digest Reactive Calibration (`apps/web/src/components/digest/`)
1. In [`DigestDashboardClient.tsx`](../apps/web/src/components/digest/DigestDashboardClient.tsx):
   - Pass `child={activeChild}` into both `SlangDecoderView` and `ExploitAlertsView`.
2. In [`SlangDecoderView.tsx`](../apps/web/src/components/digest/SlangDecoderView.tsx):
   - Accept optional `child?: ChildDTO | null` prop.
   - Add a `useEffect` that updates `selectedTier` whenever `child?.id` or `child?.age` changes, defaulting to `resolveChildSlangTier(child)`.
   - When child is `EARLY_CHILDHOOD` (age <= 6, e.g. Mateo at 14 months):
     - Display an empathetic Parent Calm notice: *"👶 Early Childhood Screen-Free Window: Mateo is in a screen-free developmental stage. Modern slang is not yet relevant, but browse below for an early glimpse into future youth culture!"*
   - Render a child calibration badge in the header: *"Calibrated for [ChildName] · [TierLabel]"*.
3. In [`ExploitAlertsView.tsx`](../apps/web/src/components/digest/ExploitAlertsView.tsx):
   - Accept optional `child?: ChildDTO | null` prop.
   - When a child is active, badge alerts with a high-relevance indicator:
     - For elementary/tween (ages 7–12): Highlight in-game currency/loot boxes (*Roblox*, *Fortnite*).
     - For teens (ages 13–18): Highlight ephemeral messaging and raid bots (*Discord*, *Snapchat*, *Finsta*).

### Task 4: Family Pacts & Devices Hub Reactive Tailoring (`apps/web/src/components/devices/DevicesManagementView.tsx`)
1. In [`DevicesManagementView.tsx`](../apps/web/src/components/devices/DevicesManagementView.tsx):
   - When `activeChild` changes, automatically re-evaluate `activeTab`:
     - If the newly selected child is `RoadType.PRE_DEVICE`, flip `activeTab` to `'readiness'` ("1. Thinking About a Device?").
     - If the newly selected child is `RoadType.ACTIVE_DEVICE`, flip `activeTab` to `'curfews'` ("3. Active Device Curfews").
   - In Tab 3 ("Active Device Curfews"):
     - Visually highlight and focus the active child's device card with a prominent `ring-2 ring-teal-500 bg-teal-50/20` border and an `"Active Selected Child"` badge.
     - Move the active child's card to the top of the list or mark it prominently so parents immediately see the selected child's lock status (8:30 PM) and QR code enrollment button.
   - In Tab 2 ("Bilateral Family Pact"):
     - Tailor child commitments to the active child's name and developmental stage.
   - In Tab 4 ("Youth Culture & Slang Radar"):
     - Tailor the Sunday dinner starter prompt and trending slang to the active child's developmental tier.

### Task 5: 24/7 AI Child Advisor & Clinical FAQ Reactive Calibration (`apps/web/src/components/advisor/`)
1. In [`AdvisorDashboardView.tsx`](../apps/web/src/components/advisor/AdvisorDashboardView.tsx):
   - Access `activeChild` from `useChildContextStore`.
   - Pass `defaultChildId: activeChild?.id` into `useAiAdvisorChat({ defaultChildId: activeChild?.id })`.
   - Pass `{ childId: activeChild?.id }` in `sendMessage`.
   - Add an Active Child Consultation banner above the chat feed: *"Active Consultation: Calibrated for [ChildName] (Age [X] · [StageName])"*.
   - Dynamically update the textarea placeholder: `"Ask about [ChildName]... (e.g. tantrums, bedtime stalls, phone boundaries)"`.
2. In [`FaqExplorerView.tsx`](../apps/web/src/components/advisor/FaqExplorerView.tsx):
   - Add a `useEffect` that automatically updates `selectedTier` to `activeChildLifespanTier` whenever `activeChild?.id` or `activeChild?.developmentalTier` changes.

### Task 6: Automated Integration Test Suite (`apps/web/test/universalChildTailoring.test.tsx`)
1. Author comprehensive Vitest test suite asserting:
   - Selecting Mateo (14 mo, Tier 0, Road 1) updates Home feed, Academy catalog tier, Culture digest early childhood notice, and Devices hub default tab to `'readiness'`.
   - Selecting Julian (14 yrs, Tier 4, Road 2) updates Home feed, Academy catalog tier, Culture digest slang tier to `'TEEN'`, and Devices hub default tab to `'curfews'` with Julian's card highlighted.
   - Switching children while remaining on `/academy`, `/digest`, or `/devices` triggers immediate, reactive component updates without page reloads.

---

## 5. Specific Deliverables (Files to Create / Modify)
- [x] `apps/web/src/stores/useChildContextStore.ts` (Pure helpers: `resolveChildSlangTier`, `resolveChildDevicesDefaultTab`, hardened `setActiveChild`)
- [x] `apps/web/src/components/academy/AcademyCatalogClient.tsx` (Reactive tier sync upon active child switch)
- [x] `apps/web/src/components/academy/ModuleDetailClient.tsx` (Active child stage match chip)
- [x] `apps/web/src/components/digest/DigestDashboardClient.tsx` (Propagate active child into slang & exploits views)
- [x] `apps/web/src/components/digest/SlangDecoderView.tsx` (Child prop, reactive tier default, early childhood notice)
- [x] `apps/web/src/components/digest/ExploitAlertsView.tsx` (Child prop, stage relevance badges)
- [x] `apps/web/src/components/devices/DevicesManagementView.tsx` (Reactive tab switching, active child card highlight)
- [x] `apps/web/src/components/advisor/AdvisorDashboardView.tsx` (Active child consultation banner, defaultChildId, dynamic placeholder)
- [x] `apps/web/src/components/advisor/FaqExplorerView.tsx` (Reactive tier filter synchronization)
- [x] `apps/web/test/universalChildTailoring.test.tsx` (Comprehensive cross-tab reactive tailoring test suite)
- [x] `plans/34-universal-cross-tab-reactive-child-tailoring-ui.md` (This engineering plan)
- [x] `plans/README.md` (Updated master roadmap index)
- [x] `docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md` (Section 3.6 Standard)

---

## 6. Acceptance Criteria & Verification Plan

```bash
# 1. Typecheck all workspaces (must exit 0)
npm run typecheck

# 2. Run new cross-tab reactive tailoring tests
npm test apps/web/test/universalChildTailoring.test.tsx

# 3. Run full web test suite
npm test --prefix apps/web

# 4. Run monorepo test harness (all 480+ tests must pass)
npm test

# 5. Ponytail diff audit
# Assert zero extraneous packages, zero breaking changes to existing contracts
```

---

## 7. Role Boundaries & Prohibitions
- **Frontend Agent Boundary:** All changes must strictly reside in `apps/web/` and `plans/`. Zero edits to `apps/api/` or `packages/database/`.
- **Zero New Dependencies:** Use existing React 19, Zustand, Tailwind CSS, Lucide icons, and TanStack Query.
- **Ponytail Principle:** Smallest complete change; pure functional selectors; no unnecessary wrappers or state managers.

---

## 8. Definition of Done (DoD) Sign-Off Checklist
- [x] All deliverables created and located in correct directories.
- [x] Plan strictly adheres to [`docs/engineering-standards/plan-standards.md`](../docs/engineering-standards/plan-standards.md).
- [x] Code strictly follows [`docs/engineering-standards/naming-conventions.md`](../docs/engineering-standards/naming-conventions.md) and [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md).
- [x] `npm run typecheck` exits with code 0 across all workspaces.
- [x] Automated tests pass with 100% success rate (54 test suites, 513 tests passing).
- [x] Diff audited against the Ponytail Principle (`ponytail-review`).
- [x] Pull request opened targeting `main` with plain text (`.txt`) description (PR #55 merged).
