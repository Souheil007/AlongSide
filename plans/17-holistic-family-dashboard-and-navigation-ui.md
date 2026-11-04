# Plan 17: Holistic Family Dashboard & Unified Navigation UI
**Plan ID:** `PLAN-17`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-03, PLAN-05, PLAN-16  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-41 (To be delegated)  
**Status:** ✅ Complete & Verified (PR #29)  

---

## 1. Objective & Business Value

Redesign the client architecture and navigation in `apps/web/` to transition AlongSide from a narrow device fork into **The Holistic Child Upbringing, Pediatric Health & Lifespan Family Operating System (Ages 0–18)**.

The Frontend Agent will:
- Implement a persistent, accessible **Global Multi-Child Switcher (`ChildSelector`)** in the application header, allowing parents to effortlessly switch between children (e.g. 14-month-old infant Mateo, 8-year-old elementary Maya, 15-year-old high schooler Julian) with instant reactive updates across the entire application via Zustand (`useChildContextStore`).
- Redesign the application navigation shell into a unified 7-hub navigation drawer and mobile tab bar:
  1. **Today & Milestones** (`/dashboard`): Home feed featuring today's developmental milestones ("When he moves, when he talks"), daily purposeful brain play, and daily nutrition tips.
  2. **Health Companion** (`/health`): Pediatric symptom triage ("Safe Resort"), fever protocols, and sleep regressions.
  3. **Nutrition & Food** (`/nutrition`): Feeding stages, BLW vs purees, safe allergen schedules, and picky eating solutions.
  4. **Brain Games & Play** (`/brain-games`): Age-indexed purposeful play matrix (puppets, sensory bins, blocks, logic puzzles, chess).
  5. **Behavior & Emotion** (`/behavior`): Tantrum decoding (HALT diagnostic) and word-for-word emotional co-regulation scripts.
  6. **24/7 AI Clinical Advisor** (`/advisor`): Multi-child contextual chat, voice sparring simulator, and 250+ scenario FAQ vault.
  7. **Modern World & Devices** (`/devices`): Sunday culture digest, slang decoders, "Thinking About a Device?" diagnostic, and Bilateral Family Pacts.
- Implement the redesigned `/dashboard` Home Feed displaying rich, age-tailored daily cards connected to the Fastify API.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 4.1: Navigation Architecture & Real-World Use Cases)
- **Technical Roadmap:** [`docs/technical-roadmap-v2.4.0.md`](../docs/technical-roadmap-v2.4.0.md) (Section 3 & 4)
- **System Architecture:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Client Layer & Seam 10)
- **Codebase Design Specification:** [`docs/codebase-design.md`](../docs/codebase-design.md) (Seam 10: Frontend Multi-Child State & Offline Sync)
- **Frontend Autonomous Skill Matrix:** [`docs/frontend-skill-matrix.md`](../docs/frontend-skill-matrix.md)
- **Design System & Taste Guidelines:** "Parent Calm" tokens, anti-slop visual standards.

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-03` (Next.js 15 PWA scaffold), `PLAN-05` (Child profile UI), and `PLAN-16` (Backend holistic schema & domain APIs) operational.
- **Verification:** Run `npm run typecheck --workspace=@alongside/web` to verify zero errors before starting.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Multi-Child Context Store (`apps/web/src/stores/`)
1. Implement `useChildContextStore.ts`:
   - State: `children: ChildDTO[]`, `activeChildId: string | null`, `isLoading: boolean`.
   - Actions: `setActiveChild(childId: string)`, `setChildren(children: ChildDTO[])`, `fetchChildren()`.
   - Persistence: Automatically sync active child ID with `localStorage` and URL query parameter (`?childId=...`).
   - Pure selectors: `selectActiveChild(state)`, `selectActiveTier(state)`.

### Task 2: Global Child Selector & Navigation Shell (`apps/web/src/components/shared/`)
1. Implement `ChildSelector.tsx`:
   - Accessible dropdown / segmented switcher positioned in the top navigation bar.
   - Displays child's name, age (e.g., "14 mo" or "8 yrs"), developmental tier badge, and avatar initials.
   - Includes "Add Child +" action opening the child onboarding modal.
2. Update `DashboardNav.tsx` and `MobileNav.tsx`:
   - Replace legacy bifurcated road links with the 7 canonical domain hub links:
     * Today & Milestones (`/dashboard`)
     * Health Companion (`/health`)
     * Nutrition Hub (`/nutrition`)
     * Brain Games (`/brain-games`)
     * Behavior Hub (`/behavior`)
     * AI Advisor (`/advisor`)
     * Devices & Culture (`/devices`)
   - Include clear visual active state indicators conforming to Parent Calm design tokens.

### Task 3: Redesigned Dashboard Home Feed (`apps/web/src/app/(dashboard)/dashboard/`)
1. Update `page.tsx` as a React Server Component (RSC) with Suspense boundaries.
2. Implement child feed client components:
   - `ChildHeroCard.tsx`: Warm greeting, child age, developmental tier, and current developmental horizon (e.g. "Leo is in the Speech & Walking Window").
   - `TodayMilestonesWidget.tsx`: Month-by-month gross/fine motor and speech benchmarks with 1-tap "Achieved!" checkboxes.
   - `DailyPlayActivityCard.tsx`: Today's recommended brain game / puppet activity (e.g. "Animal Puppet Vocal Mirroring").
   - `DailyNutritionTipCard.tsx`: Age-appropriate feeding tip (e.g., "Safe Early Allergen Exposure: How to introduce thinned peanut butter today").
   - `QuickHealthTriageLauncher.tsx`: 1-tap launcher for fever, cough, or rash concerns directing straight to the 3-Zone Triage Runner.
   - `AskAdvisorPromptBar.tsx`: Instant question input pre-filled with the active child's context.

### Task 4: Modern World & Devices Hub Migration (`apps/web/src/app/(dashboard)/devices/`)
1. Consolidate device governance, pacts, and culture digest into a unified hub at `/devices`:
   - Tab 1: "Thinking About a Device?" (Readiness diagnostic score, earned autonomy checklist).
   - Tab 2: Bilateral Family Pact (Pact-as-Code wizard, digital signatures, vector PDF export).
   - Tab 3: Active Device Curfews (Automated 8:30 PM bedtime lock status, QR enrollment screen).
   - Tab 4: Sunday Slang & Exploit Intel (Weekly youth culture digest, trending slang terms, exploit alerts).

---

## 5. Specific Deliverables (Files to Create / Modify)

### `apps/web`:
- [x] `apps/web/src/stores/useChildContextStore.ts`
- [x] `apps/web/src/components/shared/ChildSelector.tsx`
- [x] `apps/web/src/components/shared/DashboardNav.tsx`
- [x] `apps/web/src/components/shared/MobileNav.tsx`
- [x] `apps/web/src/app/(dashboard)/dashboard/page.tsx`
- [x] `apps/web/src/components/dashboard/ChildHeroCard.tsx`
- [x] `apps/web/src/components/dashboard/TodayMilestonesWidget.tsx`
- [x] `apps/web/src/components/dashboard/DailyPlayActivityCard.tsx`
- [x] `apps/web/src/components/dashboard/DailyNutritionTipCard.tsx`
- [x] `apps/web/src/components/dashboard/QuickHealthTriageLauncher.tsx`
- [x] `apps/web/src/components/dashboard/AskAdvisorPromptBar.tsx`
- [x] `apps/web/src/app/(dashboard)/devices/page.tsx`
- [x] `apps/web/test/childContextStore.test.ts`
- [x] `apps/web/test/dashboardFeed.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Compilation & Typecheck:**
   ```bash
   npm run typecheck --workspace=@alongside/web
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors.
2. **Multi-Child Switching Responsiveness:**
   *Pass criteria:* Switching from child A (14mo) to child B (12yo) immediately re-renders the Home Feed milestones, play activities, and nutrition tips without page reloads.
3. **Accessibility & Responsive Layout:**
   *Pass criteria:* Child switcher and 7-hub navigation drawer render without horizontal scroll on mobile (360px) and desktop (1440px) viewports with touch targets ≥ 44×44px.
4. **Ponytail Principle Diff Audit:**
   *Pass criteria:* Working diff audited via `ponytail-review` ensuring minimal component footprint and zero unnecessary dependencies.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Frontend Agent.
- ❌ **DO NOT** edit backend files in `apps/api/` or database schemas in `packages/database/`.
- ❌ **DO NOT** write backend SQL queries or Fastify route handlers.
- ❌ **DO NOT** hardcode mock API responses into presentational components; use isolated API client functions in `apps/web/src/lib/api/`.
- ✅ Work strictly inside `apps/web/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] `ChildSelector` component fully accessible and connected to `useChildContextStore`.
- [x] Navigation shell updated to the 7 canonical domain hubs.
- [x] Redesigned `/dashboard` Home Feed renders tailored milestone, play, and nutrition cards.
- [x] Modern World & Devices Hub consolidated under `/devices`.
- [x] Automated Vitest component tests pass with 100% success rate.
- [x] `npm run typecheck` exits with code 0.
- [x] Ponytail Principle diff audit passed.
- [x] Feature branch submitted as Pull Request targeting `main` with plain text (`.txt`) description (PR #29 merged).
