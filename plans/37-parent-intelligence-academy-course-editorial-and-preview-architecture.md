# Plan 37: Parent Intelligence Academy Editorial Course Content & Rich Preview Architecture
**Plan ID:** `PLAN-37`  
**Assignee:** Joint (Frontend Agent & Backend Agent)  
**Dependencies:** PLAN-30, PLAN-31, PLAN-35  
**Estimated Scope:** Medium  
**Paperclip Issue:** SOU-92  
**Status:** Approved Architectural Plan (Ready for Execution)  

---

## 1. Objective & Business Value

Upgrade the **Parent Intelligence Academy** from its current prototype state (21-word placeholder text stubs, generic 3-step action boilerplate, and opaque course preview cards) into an authoritative, serene **Editorial MasterClass & Multi-Modal Advisory Hub**:

1. **Rich Editorial Lesson Content (500–750 words per lesson):** Replace the 21-word placeholder bodies with the canonical 4-part lesson anatomy:
   - Part 1: The Kitchen-Table Scenario (Relatable hook & validation)
   - Part 2: The Developmental Neurobiology (The "Why" without medical jargon)
   - Part 3: Comparative Dialogue Table (What NOT to Say vs. What to Say Instead + Audio pronunciation tip)
   - Part 4: Tonight's 3-Step Action Protocol + Integrated AI Sparring Trigger
2. **Standard 4-Lesson Course Progression (16–20 min total):** Expand each course from 3 single-sentence stubs to 4 structured, progressive lessons (Lesson 1: Tonight's Quick Win $\to$ Lesson 2: Biological Root Cause $\to$ Lesson 3: Household Routines $\to$ Lesson 4: Long-term Boundaries & Repair).
3. **High-Conversion Course Preview Cards (`ModuleCard.tsx`):** Upgrade catalog cards to display a concrete **Relief Subtitle**, **Tonight's Quick Win Teaser**, **Feature Badges** (`[ 🎧 Audio Memo ]`, `[ 💬 Script Vault ]`, `[ 🤖 AI Sparring ]`), and an expandable **Curriculum Syllabus Drawer**.
4. **Enhanced Course Detail & Reader Experience (`BiteSizedCourseDetailView.tsx` & `LessonReaderView.tsx`):**
   - Render comparative dialogue tables cleanly with 1-click script copying.
   - Display a functional audio memo briefing player.
   - Link lessons directly to the AI Advisor for simulated roleplay practice.

---

## 2. Inputs & Architectural References

- **Canonical Specification:** [`docs/parent-intelligence-academy-course-content-and-format-specification.md`](../docs/parent-intelligence-academy-course-content-and-format-specification.md) (Authored by CTO in SOU-92)
- **Advisory Rearchitecture Specification:** [`docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md`](../docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md)
- **Whole-Child Research Foundations:**
  - [`docs/research/parent-social-sentiment-and-real-voices.md`](../docs/research/parent-social-sentiment-and-real-voices.md) (Authentic parent flashpoints)
  - [`docs/research/age-by-age-neurodevelopment-matrix.md`](../docs/research/age-by-age-neurodevelopment-matrix.md) (Neurobiology from birth to 18)
  - [`docs/research/modern-parenting-faq-vault-100.md`](../docs/research/modern-parenting-faq-vault-100.md) (100+ clinical Q&A scripts)
- **Team Governance:** [`AGENTS.md`](../AGENTS.md) and [`docs/engineering-standards/plan-standards.md`](../docs/engineering-standards/plan-standards.md)
- **Design System:** [`design-system/alongside/MASTER.md`](../design-system/alongside/MASTER.md) (Taste 2: Editorial Pediatric Almanac)

---

## 3. Preconditions & Dependency Verification

- **Prerequisite Plans Merged:**
  - `PLAN-30` (Academy Categories & Prioritized Chapters API) verified in `apps/api/src/modules/academy`.
  - `PLAN-31` (Academy Curriculum Explorer & Chapter Reader UI) verified in `apps/web/src/components/academy`.
  - `PLAN-35` (Streamlined Developmental Horizon Courses UI) verified.
- **Repository Health:** Clean git working tree, `npm run typecheck` exits with code 0 across all workspaces.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Backend Database Seed & Schema Enrichment (`packages/database` & `packages/shared`) [Assignee: Backend Agent]
1. **Update Academy DTOs and Shared Schemas in `packages/shared/src/schemas/academy.ts`:**
   - Add `reliefSubtitle?: string` to `AcademyModuleDTO` and `AcademyModuleDetailDTO`.
   - Add `tonightQuickWinTitle?: string` to `AcademyModuleDTO`.
   - Add `audioUrl?: string` and `audioDurationSeconds?: number` to `AcademyLessonSummaryDTO` and `AcademyLessonDTO`.
   - Add `whatNotToSay?: string` and `deliveryTip?: string` to lesson response structures.
2. **Enrich `packages/database/prisma/seed/academy.seed.ts`:**
   - Update `AcademyLessonSeedData` and `buildModule` helper to support:
     * `body`: Rich 500-word markdown narrative with real kitchen-table scenarios.
     * `whatNotToSay`: The instinctive mistake phrase and why it escalates.
     * `deliveryTip`: Vocal pitch, posture, eye contact, and pacing guidance.
     * Unique, non-boilerplate `actionProtocol` steps for each individual lesson.
   - Expand the 30 canonical modules with genuine, clinically accurate content derived from `docs/research/` instead of 20-word stubs.
   - Ensure each module has 4 structured lessons (Tonight's Win, Biological Root, Household Routine, Boundary/Repair).
3. **Execute and Verify Database Seeding:**
   - Run `npx prisma db seed` in `packages/database` and verify data persistence.

---

### Task 2: Frontend Course Card Redesign with Syllabus Preview Drawer (`apps/web`) [Assignee: Frontend Agent]
1. **Revamp `apps/web/src/components/academy/ModuleCard.tsx`:**
   - Integrate `reliefSubtitle` below the module title in Newsreader serif italic.
   - Display a **"Tonight's Quick Win" callout strip** highlighting Lesson 1.
   - Render feature pills:
     * `[ 🎧 Audio Memo ]`
     * `[ 💬 Script Vault ]`
     * `[ 🤖 AI Sparring ]`
   - Add an interactive, expandable **Curriculum Syllabus Drawer** (`ChevronDown` toggle) that lists all 4 lesson titles with estimated read times, allowing parents to see the full roadmap before opening the course.
2. **Update `CourseCardGrid.tsx`:**
   - Ensure cards align cleanly in responsive 1-, 2-, and 3-column layouts with smooth expansion animations.

---

### Task 3: Enhanced Course Detail & Syllabus View (`apps/web`) [Assignee: Frontend Agent]
1. **Upgrade `apps/web/src/components/academy/BiteSizedCourseDetailView.tsx`:**
   - Connect the top **Audio Memo Player** to real audio narration or responsive Web Speech API / synthesized audio fallback with play/pause/scrub controls.
   - Highlight the **3 Core Walkaways**:
     * 1. The Neurobiological Root Cause explained.
     * 2. Verbatim dialogue scripts with delivery tips.
     * 3. Printable action protocol for the household.
   - Structure the 4 lessons into:
     * **Part 1 · Immediate Relief for Tonight (Lesson 1)** with elevated hero card styling.
     * **Part 2 · Household Habits for the Weekend (Lessons 2–4)**.

---

### Task 4: Upgraded Editorial Lesson Reader with Comparative Dialogue Tables (`apps/web`) [Assignee: Frontend Agent]
1. **Enhance `apps/web/src/components/academy/LessonReaderView.tsx`:**
   - Upgrade markdown parser in `renderFormattedContent` to detect and render **Comparative Dialogue Tables**:
     * Red-tinted "What NOT to Say" box (explaining why instinctive reactions backfire).
     * Green/Amber-tinted "What to Say Instead" box with high-visibility copy button.
     * Delivery tip badge (posture, vocal cadence, eye-level positioning).
   - Add 1-click **"Practice with AI Advisor"** action button in the footer that launches the AI sparring chat with this lesson's scenario pre-populated.
   - Render interactive action checkboxes that persist completion to the parent's account.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `packages/shared/src/schemas/academy.ts` — Updated DTOs with relief subtitles, audio metadata, and dialogue comparisons.
- [ ] `packages/database/prisma/seed/academy.seed.ts` — Enriched course content, 4-part lesson anatomy, authentic scenarios, and unique action protocols.
- [ ] `apps/web/src/components/academy/ModuleCard.tsx` — Upgraded preview card with relief subtitle, syllabus drawer, and format pills.
- [ ] `apps/web/src/components/academy/BiteSizedCourseDetailView.tsx` — Enhanced course detail view with functional audio briefing player and takeaways.
- [ ] `apps/web/src/components/academy/LessonReaderView.tsx` — Upgraded editorial reader supporting comparative dialogue tables and AI sparring launcher.
- [ ] `apps/web/test/academyCourseCard.test.tsx` — Unit test verifying syllabus drawer expansion, relief subtitle rendering, and format pills.
- [ ] `apps/web/test/academyLessonReaderView.test.tsx` — Unit test verifying comparative dialogue parsing, script copy, and checklist interactivity.

---

## 6. Acceptance Criteria & Test Verification

- [ ] **Content Depth Verification:** Average lesson word count in seed data increases from 21 words to $\ge 500$ words.
- [ ] **Curriculum Expansion:** Every canonical course contains 4 structured lessons totaling 16–22 minutes of high-value guidance.
- [ ] **Preview Usability:** Course cards on `/academy` display the relief subtitle, Tonight's Win teaser, and syllabus preview toggle.
- [ ] **Comparative Scripts:** Lesson reader renders clear "What NOT to Say vs. What to Say Instead" blocks with functioning clipboard copy.
- [ ] **Typecheck Cleanliness:** `npm run typecheck` exits 0 across `apps/web`, `apps/api`, `packages/shared`, and `packages/database`.
- [ ] **Automated Tests:** All unit and integration test suites pass with 100% success (`npm test`).
- [ ] **Ponytail Audit:** Diffs reviewed with `ponytail-review` to ensure zero speculative dependencies or bloat.

---

## 7. Role Boundaries & Prohibitions

- ❌ **Frontend Agent:** Do NOT modify `packages/database/prisma/schema.prisma` or backend Fastify controllers.
- ❌ **Backend Agent:** Do NOT modify React components in `apps/web/src/components/academy/`.
- ❌ **Both Agents:** Do NOT add heavy external audio/video player libraries (`video.js`, `howler`) when native HTML5 `<audio>` and standard browser APIs suffice.
- ❌ **Zero Direct Commits to `main`:** Work on isolated feature branch `feat/sou-92-academy-course-editorial-architecture`. Open PR for human squash merge.

---

## 8. Definition of Done (DoD) Checklist

- [ ] All 30 canonical modules seeded with rich 500+ word lessons following the 4-part anatomy.
- [ ] Course cards display relief subtitles and syllabus drawer previews.
- [ ] Comparative dialogue tables and delivery tips rendered in `LessonReaderView.tsx`.
- [ ] Functional audio memo player interface wired in `BiteSizedCourseDetailView.tsx`.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm test` passes with 100% success.
- [ ] Ponytail audit completed and verified.
- [ ] PR submitted with plain text (`.txt`) description referencing `Fixes SOU-92`.
