# Plan 31: Parent Intelligence Academy Curriculum Explorer & Chapter Reader UI
**Plan ID:** `PLAN-31`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-03, PLAN-09, PLAN-28, PLAN-29, PLAN-30  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-65  

---

## 1. Objective & Business Value
To deliver on AlongSide's mission as an authoritative **Parent Advisory & Child Intelligence Sanctuary**, this plan completely redesigns the Parent Intelligence Academy UI (`/academy`). 

It transforms the experience from a generic video course catalog into an interactive, prioritized advisory curriculum tailored to the parent's active child. Parents can navigate by **5 core developmental categories**, explore courses divided into **Chapters ordered by priority** (Priority 1: Critical Foundations to Priority 3: Long-Term Growth), and read actionable micro-lessons featuring **Clinical Insights** and **"What to Say" speech bubbles**.

---

## 2. Inputs & Architectural References
- **Advisory Platform Specification:** [`docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md`](../docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md)
- **Frontend Skill Matrix:** [`docs/engineering-standards/frontend-skill-matrix.md`](../docs/engineering-standards/frontend-skill-matrix.md), [`.agents/rules/05-frontend-skill-matrix.md`](../.agents/rules/05-frontend-skill-matrix.md)
- **Parent Calm Design System:** [`docs/system-architecture.md`](../docs/system-architecture.md)
- **Backend API Contract:** PLAN-30 (`GET /api/academy/categories`, `GET /api/academy/modules`, `GET /api/academy/modules/:slug`)

---

## 3. Preconditions & Dependency Verification
- Verify that PLAN-29 has elevated `/academy` to the primary navigation bar.
- Verify that PLAN-30 API contracts (`AcademyCategory`, `AcademyChapterDTO`) are published in `@alongside/shared`.
- Verify TanStack React Query is operational for fetching academy data.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: API Client Layer Integration (`apps/web/src/lib/api/academy.ts`)
1. Update `apps/web/src/lib/api/academy.ts` to support category-based queries:
   ```typescript
   export async function getAcademyCategories(): Promise<AcademyCategoryStatsDTO[]> { ... }
   export async function getAcademyModules(params?: { category?: string; tier?: string }): Promise<AcademyModuleDTO[]> { ... }
   export async function getAcademyModuleBySlug(slug: string): Promise<AcademyModuleDetailDTO> { ... }
   ```
2. Update mock data in `apps/web/src/lib/api/mocks.ts` to include sample chapters for all 5 categories so the UI renders seamlessly even in offline or disconnected states.

### Task 2: Category Selector & Catalog Explorer (`apps/web/src/app/(dashboard)/academy/page.tsx`)
1. Build `CategoryPills.tsx`:
   - Interactive horizontal pills for all 5 categories:
     - 🧠 Behavior & Emotions
     - 🩺 Pediatric Health & Sleep
     - 🥗 Nutrition & Feeding
     - 🧩 Development & Play
     - 📱 Modern Digital World
   - Support URL synchronization via query parameter `?category=...`.
2. Build `ActiveChildCalibrationBanner.tsx`:
   - Displays: `Calibrated for Leo (Age 10 · Pre-Teen)`.
   - Includes one-click tier selector modal/dropdown to let parents explore upcoming or earlier childhood phases.
3. Build `CourseCardGrid.tsx`:
   - Responsive grid displaying course cards with category badge, tier badge, progress percentage bar, and total chapter count.

### Task 3: Prioritized Chapter Roadmap (`apps/web/src/app/(dashboard)/academy/[slug]/page.tsx`)
1. Create `ChapterRoadmapView.tsx`:
   - Groups course lessons into distinct, visually prominent **Chapters ordered by priority**:
     - **Chapter 1: Priority 1 (Urgent & Foundational Foundations)** — Styled with amber/rose accents: *"Start here for acute friction and core neurobiology."*
     - **Chapter 2: Priority 2 (Daily Routines & Co-Regulation)** — Styled with teal/emerald accents: *"Daily habits and preventative rituals."*
     - **Chapter 3: Priority 3 (Advanced Scaffolding & Growth)** — Styled with indigo/purple accents: *"Long-term emotional intelligence and transitions."*
   - Each chapter card displays: Chapter Title, Summary, Priority Badge, Lesson Count, and Completion Status (`Completed` vs `Start Chapter`).

### Task 4: Rich Micro-Lesson Reader (`apps/web/src/app/(dashboard)/academy/[slug]/[lessonSlug]/page.tsx`)
1. In `LessonReaderView.tsx`, implement intelligent markdown parsing:
   - Extract `> **Clinical Insight:** ...` blocks and render them in a custom **Clinical Insight Callout Card** with pediatric badge and calm backdrop.
   - Extract `**What to Say:** "..."` blocks and render them as **Actionable Dialogue Speech Bubbles** with parent avatar and clear phonetic delivery tips.
   - Format action protocols as interactive checkboxes.
2. Add "Complete Chapter & Continue" button triggering optimistic React Query mutation and advancing the user to the next prioritized chapter.

### Task 5: Automated Verification & Vitest Component Tests
1. Author `apps/web/test/academyPrioritizedCurriculum.test.tsx`:
   - Assert all 5 categories render and filter modules correctly.
   - Assert chapters are rendered strictly in priority order (Priority 1 before Priority 2 and 3).
   - Assert "Clinical Insight" callouts and "What to Say" dialogue bubbles render accessible semantic HTML.

---

## 5. Specific Deliverables (Files to Create / Modify)
- [x] `apps/web/src/lib/api/academy.ts` (Category and chapter API client methods)
- [x] `apps/web/src/components/academy/CategoryPills.tsx` (5-category filter pills)
- [x] `apps/web/src/components/academy/ChapterRoadmapView.tsx` (Prioritized chapter cards)
- [x] `apps/web/src/components/academy/LessonReaderView.tsx` (Rich clinical insights and dialogue reader)
- [x] `apps/web/src/app/(dashboard)/academy/page.tsx` (Main catalog page with category selector)
- [x] `apps/web/src/app/(dashboard)/academy/[slug]/page.tsx` (Course roadmap with prioritized chapters)
- [x] `apps/web/test/academyPrioritizedCurriculum.test.tsx` (Vitest test suite)

---

## 6. Acceptance Criteria & Verification Plan
- [x] Category selector lets parents filter across all 5 canonical categories.
- [x] Active child age calibration badge is visible and automatically tailors course listings.
- [x] Courses display chapters ordered strictly by Priority 1, 2, and 3.
- [x] Micro-lesson reader renders clinical insights and dialogue scripts cleanly without raw markdown symbols (`**`, `>`).
- [x] Progress is recorded and persisted to backend API.
- [x] `npm run typecheck` and `npm run test` exit with code 0.

---

## 7. Role Boundaries & Prohibitions
- ❌ **DO NOT** edit backend Fastify routes or database schemas (Backend Agent domain).
- ❌ **DO NOT** use raw CSS or inline styles; strictly utilize Tailwind CSS tokens from `globals.css`.
- ❌ **DO NOT** mark entire page files `'use client'`; keep page roots as RSC.

---

## 8. Definition of Done (DoD) Sign-Off Checklist
- [x] All UI components created, accessible, and responsive across mobile and desktop.
- [x] Passes `ponytail-review` audit for clean, minimal diff.
- [x] Conventional commit created.
- [x] Pull request submitted with plain text (`.txt`) description.
