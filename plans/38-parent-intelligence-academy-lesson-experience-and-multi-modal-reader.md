# Plan 38: Parent Intelligence Academy Lesson Experience & Multi-Modal Reader Architecture
**Plan ID:** `PLAN-38`  
**Assignee:** Joint (Frontend Agent & Backend Agent)  
**Dependencies:** PLAN-30, PLAN-31, PLAN-37  
**Estimated Scope:** Medium  
**Paperclip Issue:** SOU-98  
**Status:** Approved Architectural Plan (Ready for Execution)  

---

## 1. Objective & Business Value

Define and implement the authoritative, serene, and engaging **Lesson Experience** for the AlongSide Parent Intelligence Academy. Address the Founder's core strategic inquiries in SOU-98 by transforming the lesson screen into an appealing **Multi-Modal Almanac & Interactive Sandbox**:

1. **Multi-Modal Balance (The Tri-Modal Formula):** Replace dense text walls and heavy video dependencies with a synchronized tri-modal composition:
   - Primary: Structured Editorial Markdown with tactile interactive micro-widgets (500–750 words, ~3.5 min read).
   - Audio: 90-second Clinician Voice Briefing / Audio Memo for hands-free listening while holding an infant or doing household chores.
   - Visual: Silent-first micro-infographics and physical body positioning diagrams.
2. **The 70/30 Invariant vs. Adaptive Rule:**
   - 70% Invariant Cognitive Backbone: Every lesson follows the predictable 4-phase rhythm (Emotional Hook $\to$ Neurobiology $\to$ Dialogue Script $\to$ Action Protocol).
   - 30% Dynamic Adaptive Modules: UI widgets adapt specifically to the Academy Category (e.g. Somatic Breathing for Behavior, Circadian Clock for Sleep, Division of Responsibility for Feeding, Family Pact Clause for Digital) and Developmental Tier (Infant non-verbal soothing to Teen autonomy negotiation).
3. **8 High-Appeal Lesson Hook Elements:** Implement the 10-Second Relief Masthead, the 30-Second Crisis Glance drawer, the Kitchen-Table Scenario, the Neurobiology "Aha!" Mechanism Card, the Interactive Dialogue Deck ("Say This / Not That" with 1-click copy), Tonight's Action Checklist, Active Tool Bridges (AI Sparring), and the Milestone Continuation Hook.
4. **Cognitive Ergonomics for Exhausted Parents:** Introduce a 1-tap "🌙 Nightstand Dim / Warm" mode for bedside reading in dark rooms, real-time scroll progress tracking, and distraction-free typography.

---

## 2. Inputs & Architectural References

- **Canonical Specification:** [`docs/parent-intelligence-academy-lesson-experience-and-ux-specification.md`](../docs/parent-intelligence-academy-lesson-experience-and-ux-specification.md) (Authored by CTO for SOU-98)
- **Course & Syllabi Specification:** [`docs/parent-intelligence-academy-course-content-and-format-specification.md`](../docs/parent-intelligence-academy-course-content-and-format-specification.md) (SOU-92)
- **Advisory Platform Architecture:** [`docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md`](../docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md)
- **Master Design System:** [`docs/design-system/MASTER.md`](../docs/design-system/MASTER.md) (Taste 2: Editorial Pediatric Almanac)
- **Team Governance:** [`AGENTS.md`](../AGENTS.md) and [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisite Plans Merged:**
  - `PLAN-30` (Academy Categories & Prioritized Chapters API) operational in `apps/api`.
  - `PLAN-31` (Academy Curriculum Explorer & Chapter Reader UI) operational in `apps/web`.
  - `PLAN-37` (Course Editorial & Preview Architecture) data models and seeds verified.
- **Repository Health:** Clean git working tree, `npm run typecheck` exits with code 0 across all workspaces.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Shared Schema & DTO Expansion (`packages/shared`) [Assignee: Backend Agent]
1. **Expand `packages/shared/src/types/index.ts` and `schemas/academy.ts`:**
   - Add `reliefTagline?: string` to `AcademyLessonDTO` and `AcademyLessonSummaryDTO`.
   - Add `thirtySecondGlance?: { coreProblem: string; immediateShift: string; exactWords: string; }` to `AcademyLessonDTO`.
   - Add `adaptiveModuleType?: 'SOMATIC_RESET' | 'CIRCADIAN_TIMELINE' | 'FEEDING_LADDER' | 'PLAY_BLUEPRINT' | 'PACT_CLAUSE'` to `AcademyLessonDTO`.
   - Add `dialogueCards?: { instinctiveMistake: string; whyItBackfires: string; empatheticScript: string; deliveryTip: string; }[]` to `AcademyLessonDTO`.
2. **Export updated types and schema validators in `@alongside/shared`.**

---

### Task 2: Backend Database Seed & API Endpoint Hardening (`packages/database` & `apps/api`) [Assignee: Backend Agent]
1. **Update `packages/database/prisma/seed/academy.seed.ts`:**
   - Enhance lesson records with `reliefTagline`, `thirtySecondGlance`, and category-specific `adaptiveModuleType` metadata.
   - Ensure `whatNotToSay` and `deliveryTip` fields are fully populated with authentic, non-boilerplate content derived from `docs/research/`.
2. **Update `apps/api/src/modules/academy/academy.repository.ts` & `academy.controller.ts`:**
   - Ensure `getLessonById` and `getLessonBySlug` return the enriched DTO fields.
   - Verify serialization with fast-json-stringify and Zod schemas.

---

### Task 3: Multi-Modal Lesson Reader Decomposed Component Architecture (`apps/web`) [Assignee: Frontend Agent]
1. **Decompose `LessonReaderView.tsx` into Deep, Testable Sub-Components in `apps/web/src/components/academy/reader/`:**
   - `LessonReliefMasthead.tsx`: Breadcrumb navigation, lesson title, guilt-release tagline, reading timer, and audio memo player bar.
   - `LessonThirtySecondGlance.tsx`: Collapsible "In a Rush?" crisis executive summary box with smooth animation.
   - `LessonDialogueDeck.tsx`: Tactile "Say This / Not That" comparative script cards with 1-click clipboard copy button, copy toast confirmation, and delivery tips.
   - `LessonActionChecklist.tsx`: Interactive 3-step action checklist with persistent local state.
   - `LessonToolBridges.tsx`: 1-click launcher buttons for AI Sparring bot (`/advisor`), Family Pact clause insertion, and Pocket Script Vault saving.
   - `LessonFooterNav.tsx`: "Complete Lesson" button, chapter progress bar, and "Next Up" lesson preview card.
2. **Assemble the decomposed components inside `LessonReaderView.tsx`:**
   - Keep `LessonReaderView.tsx` lean, declarative, and focused solely on layout orchestration.

---

### Task 4: Specialized Category & Tier Adaptive Interactive Widgets (`apps/web`) [Assignee: Frontend Agent]
1. **Build `LessonAdaptiveModuleRenderer.tsx` with 5 Category-Specific Widgets:**
   - **`SomaticBreathWidget.tsx` (Behavior & Emotions):** Interactive 4s inhale / 6s exhale circular breathing animation to help dysregulated parents calm their vagal tone before handling a meltdown.
   - **`CircadianTimelineWidget.tsx` (Health & Sleep):** Visual 24-hour sleep/wake window bar indicating optimal bedtime windows and pediatric red flags.
   - **`FeedingResponsibilityWidget.tsx` (Nutrition & Feeding):** Interactive 2x2 Division of Responsibility card (Parent's Role vs. Child's Role).
   - **`PurposefulPlayBlueprintWidget.tsx` (Development & Play):** Low-prep activity card with household materials list and language expansion prompts.
   - **`PactClauseBridgeWidget.tsx` (Digital & Devices):** Visual device curfew rule card with 1-click "Add to Family Pact" trigger.

---

### Task 5: Nightstand Mode, Reading Progress Bar & Audio Player Controls (`apps/web`) [Assignee: Frontend Agent]
1. **Implement `NightstandModeToggle.tsx`:**
   - Header button toggling dark/warm sepia parchment mode (`bg-[#1E1C1A]` or `bg-[#FAF7F2]`) with muted low-contrast text for bedside reading in dark rooms.
   - Persist state in `localStorage` under `alongside-nightstand-mode`.
2. **Implement Viewport Scroll Progress Bar:**
   - Fixed 2px emerald progress indicator tracking scroll depth from 0% to 100%.
3. **Enhance Native Audio Memo Player:**
   - Styled HTML5 audio controls (Play/Pause, 15s skip back, 1x/1.25x/1.5x speed toggle) matching the Parent Calm design system.

---

### Task 6: Unit & Integration Test Suites (`apps/web` & `apps/api`) [Assignee: Joint]
1. **Frontend Unit Tests in `apps/web/test/academyLessonReaderView.test.tsx` & `academyAdaptiveModules.test.tsx`:**
   - Test rendering of 10-second relief masthead, 30-second glance drawer, and dialogue deck.
   - Test script copy button interaction (`navigator.clipboard.writeText`).
   - Test checklist toggle persistence.
   - Test Nightstand Mode toggle state change.
   - Test category adaptive widget rendering based on `adaptiveModuleType`.
2. **Backend Integration Tests in `apps/api/test/academy.test.ts`:**
   - Test lesson detail endpoint returns enriched DTO with relief tagline and dialogue cards.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `packages/shared/src/types/index.ts` — Enhanced `AcademyLessonDTO` with relief tagline, 30-second glance, and dialogue deck types.
- [ ] `packages/database/prisma/seed/academy.seed.ts` — Enriched seed data with authentic scripts, relief tags, and adaptive module metadata.
- [ ] `apps/web/src/components/academy/reader/LessonReliefMasthead.tsx` — Relief tagline, breadcrumbs, and audio memo bar.
- [ ] `apps/web/src/components/academy/reader/LessonThirtySecondGlance.tsx` — Collapsible 30-second crisis summary drawer.
- [ ] `apps/web/src/components/academy/reader/LessonDialogueDeck.tsx` — Say This / Not That cards with 1-click clipboard copy.
- [ ] `apps/web/src/components/academy/reader/LessonActionChecklist.tsx` — Interactive 3-step action checklist.
- [ ] `apps/web/src/components/academy/reader/LessonAdaptiveModuleRenderer.tsx` — Category-specific adaptive widgets (Somatic, Sleep, Nutrition, Play, Pact).
- [ ] `apps/web/src/components/academy/reader/NightstandModeToggle.tsx` — Bedside dark/warm reading mode toggle.
- [ ] `apps/web/src/components/academy/LessonReaderView.tsx` — Refactored, declarative master reader assembling decomposed components.
- [ ] `apps/web/test/academyLessonReaderView.test.tsx` — Comprehensive frontend unit tests.
- [ ] `apps/web/test/academyAdaptiveModules.test.tsx` — Unit tests for category-specific adaptive widgets.

---

## 6. Acceptance Criteria & Test Verification

- [ ] **Multi-Modal Verification:** Lessons feature clear audio memo controls, relief taglines, and structured editorial markdown.
- [ ] **30-Second Glance:** Collapsible crisis drawer provides instant 3-bullet takeaway without requiring long reading.
- [ ] **Dialogue Usability:** Script copier writes to clipboard and shows toast feedback.
- [ ] **Category Adaptation:** Different categories render their respective adaptive widget (Somatic breath widget on Behavior lessons; sleep timeline on Health lessons).
- [ ] **Nightstand Mode:** Toggle smoothly transitions reader into dark/warm low-glare mode.
- [ ] **Typecheck Cleanliness:** `npm run typecheck` exits 0 across all workspaces.
- [ ] **Automated Tests:** 100% of test suites pass (`npm test`).
- [ ] **Ponytail Audit:** Working diff audited with `ponytail-review` against over-engineering.

---

## 7. Role Boundaries & Prohibitions

- ❌ **Frontend Agent:** Do NOT alter database migrations or Prisma schema files.
- ❌ **Backend Agent:** Do NOT author React TSX components in `apps/web/src/components/academy/`.
- ❌ **Both Agents:** Do NOT add heavy external video/audio player libraries (`video.js`, `howler`, `framer-motion`) when native HTML5 and CSS transitions suffice.
- ❌ **Zero Direct Commits to `main`:** Author changes on feature branch `feat/sou-98-academy-lesson-experience-and-reader`. Open PR for human squash merge.

---

## 8. Definition of Done (DoD) Checklist

- [ ] All deliverables in Section 5 are created and verified.
- [ ] Multi-modal reader components satisfy the 70/30 invariant/adaptive rule.
- [ ] `npm run typecheck` exits 0 with no errors.
- [ ] Automated tests pass with 100% success rate.
- [ ] Ponytail audit verifies minimal diff size and zero speculative bloat.
- [ ] PR submitted targeting `main` with plain text (`.txt`) description referencing `Fixes SOU-98`.
