# Plan 39: Parent Intelligence Academy 8-Tier Curriculum Synthesis & Master Video Lecture Integration
**Plan ID:** `PLAN-39`  
**Assignee:** Joint (Backend Agent & Frontend Agent)  
**Dependencies:** PLAN-36, PLAN-37, PLAN-38  
**Estimated Scope:** Large (Lifespan Course Synthesis, Video Schema & Multi-Modal Player)  
**Paperclip Issue:** SOU-102  
**Status:** Approved Architectural Plan (Ready for Delegation)  

---

## 1. Objective & Business Value

Synthesize Alongside's **48 whole-child clinical research documents** across all **8 developmental tiers** (`tier-0a` through `tier-5`) into **40 full-length, high-conversion Academy courses** (5 categories × 8 lifespan tiers). Integrate the **26 world-class curated master video lectures** (Prof. Alison Gopnik, Dr. Harvey Karp, Dr. Nadine Burke Harris, Dr. Daniel Siegel, Dr. Becky Kennedy, Jonathan Haidt, Dr. Matthew Walker, Dr. Lisa Damour, Dr. Carol Dweck, Dr. Angela Duckworth, etc.) with responsive in-app playback, parent hooks, and interactive takeaways.

### Core Deliverables:
1. **Tri-Modal Editorial MasterClass Standard:** Every one of the 40 courses provides 4 structured lessons (~16–20 min total) containing relatable kitchen-table scenarios, developmental neurobiology mechanisms, side-by-side comparative dialogue decks ("What NOT to Say", "Why It Backfires", "What to Say Instead" with delivery tips), and actionable 3-step household protocols.
2. **Master Video Lecture Multi-Modal Integration:** Expand `AcademyLesson` schema and DTOs with `videoLecture` (`videoUrl`, `title`, `presenter`, `channel`, `durationMinutes`, `parentHook`, `keyTakeaways`, `actionPrompt`).
3. **Frontend Responsive Video Player:** Build `LessonVideoPlayer.tsx` in `apps/web/src/components/academy/reader/` featuring lazy YouTube loading, 16:9 responsive layout, parent hook callouts, clinical takeaways drawer, and 1-click AI Advisor sparring launch.
4. **Curriculum Syllabus Drawer & Badge Upgrades:** Add `[ 🎬 Master Lecture ]` badges to course cards in `ModuleCard.tsx` and detail views.
5. **Calibrated Adaptive Interactive Widgets:** Connect the 5 category widgets (`SomaticBreathWidget`, `CircadianTimelineWidget`, `FeedingResponsibilityWidget`, `PurposefulPlayBlueprintWidget`, `PactClauseBridgeWidget`) to receive authentic tier-specific parameters.

---

## 2. Inputs & Architectural References

- **Canonical Synthesis Specification:** [`docs/parent-intelligence-academy-8-tier-curriculum-synthesis-spec.md`](../docs/parent-intelligence-academy-8-tier-curriculum-synthesis-spec.md) (Authored by CTO for SOU-102)
- **Course & Lesson Specifications:**
  - [`docs/parent-intelligence-academy-course-content-and-format-specification.md`](../docs/parent-intelligence-academy-course-content-and-format-specification.md) (SOU-92)
  - [`docs/parent-intelligence-academy-lesson-experience-and-ux-specification.md`](../docs/parent-intelligence-academy-lesson-experience-and-ux-specification.md) (SOU-98)
- **All 48 Whole-Child Research Documents Across 8 Tiers:**
  - [`docs/research/tier-0a-infancy-0-1/`](../docs/research/tier-0a-infancy-0-1/) (6 documents)
  - [`docs/research/tier-0b-toddler-1-2/`](../docs/research/tier-0b-toddler-1-2/) (6 documents)
  - [`docs/research/tier-0c-older-toddler-2-3/`](../docs/research/tier-0c-older-toddler-2-3/) (6 documents)
  - [`docs/research/tier-1-early-childhood-4-6/`](../docs/research/tier-1-early-childhood-4-6/) (6 documents)
  - [`docs/research/tier-2-middle-childhood-7-9/`](../docs/research/tier-2-middle-childhood-7-9/) (6 documents)
  - [`docs/research/tier-3-pre-teen-10-12/`](../docs/research/tier-3-pre-teen-10-12/) (6 documents)
  - [`docs/research/tier-4-early-adolescence-13-15/`](../docs/research/tier-4-early-adolescence-13-15/) (6 documents)
  - [`docs/research/tier-5-late-adolescence-16-18/`](../docs/research/tier-5-late-adolescence-16-18/) (6 documents)
- **Team Governance:** [`AGENTS.md`](../AGENTS.md) and [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisite Plans Merged:**
  - `PLAN-36` (Tier 0 Decomposition) and `PLAN-37` (Editorial Course Content) operational in repository.
  - `PLAN-38` (Multi-Modal Lesson Reader Architecture) operational with decomposed reader components.
- **Repository Health:** Clean git working tree, `npm run typecheck` exits with code 0 across all workspaces.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Backend Foundation — Master Video Schema, Shared DTOs & 40-Course Seed Pipeline (`packages/database`, `packages/shared`, `apps/api`) [Assignee: Backend Agent]
1. **Expand Shared Schemas in `packages/shared/src/schemas/academy.ts` and `types/index.ts`:**
   - Define `MasterVideoLectureSchema` and `MasterVideoLectureDTO`:
     * `videoUrl: string`
     * `title: string`
     * `presenter: string`
     * `channel: string`
     * `durationMinutes: number`
     * `parentHook?: string`
     * `keyTakeaways?: string[]`
     * `actionPrompt?: string`
   - Add `videoLecture?: MasterVideoLectureDTO | null` to `AcademyLessonDTO` and `AcademyLessonSummaryDTO`.
   - Export updated types in `packages/shared/src/index.ts`.
2. **Update Prisma Schema & Migration (`packages/database/prisma/`):**
   - In `schema.prisma`, add `videoLecture Json?` to `AcademyLesson` model.
   - Run `npx prisma db push` or create additive migration.
3. **Synthesize Database Seeds in `packages/database/prisma/seed/academy.seed.ts`:**
   - Incorporate the research from all 48 tier documents (`01` through `06` across all 8 tiers).
   - Ensure all 40 courses (5 categories × 8 tiers) have authentic titles, relief subtitles, tonight's quick win titles, 3 chapters, and 4 rich lessons.
   - Attach the 26 curated Master Video Lectures from `06-video-multimedia-curriculum-and-lectures.md` to their corresponding flagship lessons.
   - Run seed verification: `npm run db:seed -w packages/database`.
4. **Harden Fastify API Serialization (`apps/api/src/modules/academy/`):**
   - Ensure `academy.routes.ts`, `academy.repository.ts`, and `academy.controller.ts` serialize `videoLecture` accurately.
   - Add Fastify `.inject()` integration tests in `apps/api/test/academy.test.ts` asserting 200 OK and presence of `videoLecture` with valid YouTube URL, presenter, and takeaways.

---

### Task 2: Frontend UI — Responsive Master Video Player, Syllabus Badges & Tier Calibration (`apps/web`) [Assignee: Frontend Agent]
1. **Build `apps/web/src/components/academy/reader/LessonVideoPlayer.tsx`:**
   - Create responsive 16:9 video container (`aspect-video rounded-2xl overflow-hidden border border-[#EBE7DF] bg-stone-900 shadow-sm`).
   - Implement lazy YouTube embed (`iframe` with `loading="lazy"` and clean title).
   - Include presenter & channel badge (`Dr. Harvey Karp · Happiest Baby · 12:45`).
   - Render parent hook callout strip in Newsreader italic below the player.
   - Add expandable **Key Takeaways Drawer** rendering the 3 clinical concepts.
   - Add 1-click **Interactive Action Prompt** triggering `/advisor` AI sparring.
2. **Integrate into Lesson Reader (`apps/web/src/components/academy/reader/`):**
   - Integrate `LessonVideoPlayer` into `LessonReaderView.tsx` right below `LessonReliefMasthead.tsx`.
   - Update `LessonReliefMasthead.tsx` to display `[ 🎬 Master Lecture ]` badge when `videoLecture` is present.
3. **Enhance Syllabus Drawer & Course Cards (`apps/web/src/components/academy/ModuleCard.tsx`):**
   - Display `[ 🎬 Master Lecture ]` pill alongside `[ 🎧 Audio Memo ]`, `[ 💬 Script Vault ]`, and `[ 🤖 AI Sparring ]`.
   - Mark lessons containing master videos with a video icon in the expandable syllabus drawer.
4. **Calibrate Category-Adaptive Interactive Widgets:**
   - Ensure `SomaticBreathWidget`, `CircadianTimelineWidget`, `FeedingResponsibilityWidget`, `PurposefulPlayBlueprintWidget`, and `PactClauseBridgeWidget` render appropriate tier-specific parameters based on the active child's developmental tier.
5. **Author Frontend Vitest Suite:**
   - Author unit/component tests in `apps/web/src/components/academy/reader/__tests__/LessonVideoPlayer.test.tsx` verifying render, badge display, and takeaway drawer toggle.

---

## 5. Specific Deliverables (Files to Create / Modify)

### Backend Agent Deliverables:
- `packages/shared/src/schemas/academy.ts` (Add MasterVideoLectureSchema & lesson video fields)
- `packages/shared/src/types/index.ts` (Export MasterVideoLectureDTO)
- `packages/database/prisma/schema.prisma` (Add videoLecture Json? to AcademyLesson)
- `packages/database/prisma/seed/academy.seed.ts` (Comprehensive 40-course synthesis with 26 master videos)
- `apps/api/src/modules/academy/academy.repository.ts` (Return videoLecture field)
- `apps/api/src/modules/academy/academy.controller.ts` (Serialize videoLecture)
- `apps/api/test/academy.test.ts` (Integration tests for video lecture fields)

### Frontend Agent Deliverables:
- `apps/web/src/components/academy/reader/LessonVideoPlayer.tsx` (New component)
- `apps/web/src/components/academy/reader/index.ts` (Export LessonVideoPlayer)
- `apps/web/src/components/academy/LessonReaderView.tsx` (Embed LessonVideoPlayer)
- `apps/web/src/components/academy/reader/LessonReliefMasthead.tsx` (Add video badge)
- `apps/web/src/components/academy/ModuleCard.tsx` (Add video pill & syllabus indicator)
- `apps/web/src/components/academy/reader/__tests__/LessonVideoPlayer.test.tsx` (Vitest tests)

---

## 6. Acceptance Criteria & Verification Plan

1. **Shared Contract:** `@alongside/shared` compiles cleanly (`npm run build -w packages/shared`) and exports `MasterVideoLectureDTO`.
2. **Database & Seeding:** `npm run db:seed -w packages/database` executes cleanly, populating all 40 courses and 26 master video lectures.
3. **Backend API:** Fastify endpoint `GET /api/v1/academy/lessons/:id` and `GET /api/v1/academy/modules/:slug/lessons/:lessonSlug` return HTTP 200 with full `videoLecture` object where configured.
4. **Frontend UI:**
   - Lessons with a master lecture render `LessonVideoPlayer` seamlessly with thumbnail, embed, parent hook, and takeaways drawer.
   - Course cards in the catalog display `[ 🎬 Master Lecture ]` badge.
   - Vitest unit tests pass 100% in `apps/web`.
5. **Code Quality:** `npm run typecheck` and `npm run lint` pass across all workspaces with zero errors.

---

## 7. Role Boundaries & Prohibitions

- **Chief Technology Officer (CTO):** Authors architecture, specifications, plans, and delegates via Paperclip. Zero application code.
- **Backend Agent:** Owns `packages/shared`, `packages/database`, and `apps/api`. No React/TSX/CSS edits.
- **Frontend Agent:** Owns `apps/web`. No backend routes, Prisma schemas, or direct database queries.
- **PR Mandate:** Feature branches only (`feat/SOU-102-backend-academy-8-tier-synthesis` and `feat/SOU-102-frontend-academy-master-video-player`). Plain text (`.txt`) PR descriptions. PRs left OPEN for human squash merge.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All 40 courses across 5 categories and 8 tiers synthesized with research from `docs/research/tier-*`.
- [ ] 26 Master Video Lectures integrated with schema, DTO, seeds, and frontend player.
- [ ] `packages/shared/src/schemas/academy.ts` and `types/index.ts` updated with `MasterVideoLectureDTO`.
- [ ] `packages/database/prisma/schema.prisma` updated and seeds populated.
- [ ] `LessonVideoPlayer.tsx` created and tested in `apps/web`.
- [ ] Fastify `.inject()` integration tests passing in `apps/api/test/academy.test.ts`.
- [ ] Vitest tests passing in `apps/web`.
- [ ] `npm run typecheck` exits with code 0 across all workspaces.
- [ ] Feature branches pushed and PRs opened with plain text (`.txt`) descriptions.
- [ ] PRs left OPEN for human approval and merge (zero autonomous merging).
