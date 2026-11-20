# Plan 46: Academy Interactive Almanac v2 Contracts, Schema & API
**Plan ID:** `PLAN-46`  
**Assignee:** Backend Agent  
**Dependencies:** `PLAN-39`, `PLAN-40`, `PLAN-43`  
**Estimated Scope:** Medium  
**Paperclip Issue:** TBD (Phase 1 of Interactive Almanac v2 Rollout)

---

## 1. Objective & Business Value

Establish the strongly-typed `@alongside/shared` data contracts, pure child-personalization engine, additive Prisma schema, and Fastify API persistence layer powering **Interactive Almanac v2** across all 40 Parent Intelligence Academy courses. By adding a clean `AlmanacLessonPayload` JSON column alongside a deterministic fallback adapter (`resolveAlmanacLessonPayload`), the frontend (`PLAN-48`) can launch immediately with full backward compatibility while bespoke curriculum waves (`PLAN-47`) roll out incrementally with zero downtime.

---

## 2. Inputs & Architectural References

- **Canonical Specification:** [`docs/parent-intelligence-academy-interactive-almanac-v2-spec.md`](../docs/parent-intelligence-academy-interactive-almanac-v2-spec.md)
- **Curriculum Relevance Audit:** [`docs/academy-curriculum-relevance-audit.md`](../docs/academy-curriculum-relevance-audit.md)
- **Approved Visual Prototype:** [`docs/design/academy-lesson-interactive-beats/indexv2.html`](../docs/design/academy-lesson-interactive-beats/indexv2.html)
- **System Architecture:** [`docs/system-architecture.md`](../docs/system-architecture.md)
- **Codebase Design & Backend Skill Matrix:** [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md), [`docs/engineering-standards/backend-skill-matrix.md`](../docs/engineering-standards/backend-skill-matrix.md)
- **Git & Quality Standards:** [`docs/engineering-standards/git-commit-standards.md`](../docs/engineering-standards/git-commit-standards.md), [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md)

---

## 3. Preconditions & Dependency Verification

- Confirm `PLAN-43` (purge of legacy clinical triage tables) is merged and `npx prisma validate` exits 0.
- Confirm existing Academy API tests (`npm run test --workspace=@alongside/api`) pass before modifying schemas.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Shared Types, Zod Schemas & Pure Engines (`packages/shared`)
1. Update `packages/shared/src/types/index.ts` and `packages/shared/src/schemas/academy.ts`:
   - Add `EpisodeRole` (`FAST_WIN | BRAIN_DECODER | RHYTHM_RESET | LONG_TERM_BOND`), `AlmanacVisualType` (7 visual primitives), `EditorialIllustrationKey` (9 illustrations), `AnnotatedScriptSegment`, `VideoJumpChip`, `AlmanacLessonPayload`, and `LessonPlaybookStateDTO`.
   - Extend `MasterVideoLectureDTO` with optional `jumpChips?: VideoJumpChip[]`.
   - Extend `AcademyModuleDTO` with optional `featuredVideoLecture?: MasterVideoLectureDTO | null`.
   - Extend `AcademyLessonSummaryDTO` with optional `episodeRole?: EpisodeRole` and `interactiveHighlights?: string[]`.
   - Extend `AcademyLessonDTO` with optional `episodeRole?: EpisodeRole`, `almanacPayload?: AlmanacLessonPayload | null`, and `playbookState?: LessonPlaybookStateDTO`.
2. Add pure, zero-side-effect engines to `packages/shared/src/algorithms/academy.ts`:
   - `interpolateChildCopy(template: string, child?: ChildPersonalizationContext | null): string`:
     - Dynamically interpolates `{name}`, `{Name}`, `{possessive}`, `{pronoun}`, `{Pronoun}`, `{obj}`, `{poss}`, `{age}`, `{ageShort}`, and verb inflections (`{eats}`, `{Eats}`, `{pushes}`, `{is}`, `{cries}`, `{throws}`) from the active child's name, gender, and age.
     - Gracefully falls back to tier-appropriate neutral phrasing (`"your child"` / `"they"`) when no child is selected, guaranteeing **zero raw `{token}` leakage**.
   - `resolveAlmanacLessonPayload(lesson: AcademyLessonDTO): AlmanacLessonPayload`:
     - Returns `lesson.almanacPayload` directly when authored.
     - Deterministically maps legacy `contentMarkdown` lessons into a valid `AlmanacLessonPayload` (synthesizing scene, default visual model for category, instinct comparison + annotated calm script, pushbacks, 3 moves, and closing note) so all 40 courses render in v2 immediately during Wave 1→3 rollout.
3. Add comprehensive unit tests in `packages/shared/test/academyAlmanac.test.ts`.

### Task 2: Additive Prisma Migration (`packages/database`)
1. Update `packages/database/prisma/schema.prisma`:
   - On `AcademyModule`: add `featuredVideoLecture Json?`.
   - On `AcademyLesson`: add `episodeRole String @default("FAST_WIN")` and `almanacPayload Json?`.
   - On `AcademyProgress`: add `chosenMoveId String?`, `bookmarkedTruth Boolean @default(false)`, and `savedPushbackIds String[] @default([])`.
2. Create additive SQL migration `packages/database/prisma/migrations/20261120_academy_interactive_almanac_v2/migration.sql` and run `npx prisma validate && npx prisma generate`.

### Task 3: Fastify Academy API & Repository Seam (`apps/api`)
1. Update `AcademyRepository` interface, `PrismaAcademyRepository`, and `InMemoryAcademyRepository` in `apps/api/src/modules/academy/academy.repository.ts`:
   - Hydrate `featuredVideoLecture`, `episodeRole`, `almanacPayload`, and `playbookState` on `findModuleBySlug`, `findLessonById`, and `findLessonBySlug`.
   - Extend `markLessonComplete(userId, lessonId, playbookInput?)` to atomically persist `chosenMoveId`, `bookmarkedTruth`, and `savedPushbackIds` alongside `isCompleted: true`.
   - Add `saveLessonPlaybook(userId, lessonId, playbookInput)` to persist mid-lesson bookmarks (`Save idea`, `Add phrase to Pocket Card`) and selected tonight move without requiring completion first.
2. Update `apps/api/src/modules/academy/academy.routes.ts`, `academy.controller.ts`, and `academy.service.ts`:
   - Add JSON schema validation & serialization for new fields on `GET /modules/:slug`, `GET /lessons/:id`, `GET /lessons/by-slug/:slug`.
   - Extend `POST /api/v1/academy/lessons/:id/complete` body schema with optional `{ chosenMoveId?: string, bookmarkedTruth?: boolean, savedPushbackIds?: string[] }`.
   - Register `PATCH /api/v1/academy/lessons/:id/playbook` (authenticated) returning `{ success: true, data: { playbookState } }`.
3. Add Fastify `.inject()` integration tests in `apps/api/tests/academyAlmanac.test.ts` using `InMemoryAcademyRepository` (zero physical TCP sockets).

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `packages/shared/src/types/index.ts`
- [ ] `packages/shared/src/schemas/academy.ts`
- [ ] `packages/shared/src/algorithms/academy.ts`
- [ ] `packages/shared/test/academyAlmanac.test.ts`
- [ ] `packages/database/prisma/schema.prisma`
- [ ] `packages/database/prisma/migrations/20261120_academy_interactive_almanac_v2/migration.sql`
- [ ] `apps/api/src/modules/academy/academy.repository.ts`
- [ ] `apps/api/src/modules/academy/academy.service.ts`
- [ ] `apps/api/src/modules/academy/academy.controller.ts`
- [ ] `apps/api/src/modules/academy/academy.routes.ts`
- [ ] `apps/api/tests/academyAlmanac.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

```bash
npm run build --workspace=@alongside/shared
npm run test --workspace=@alongside/shared
npx prisma validate --schema=packages/database/prisma/schema.prisma
npm run test --workspace=@alongside/api
npm run typecheck
```

- `interpolateChildCopy()` passes 100% of male, female, and generic child test cases with zero `{token}` leakage.
- `resolveAlmanacLessonPayload()` safely transforms both bespoke v2 lessons and legacy markdown lessons into schema-valid `AlmanacLessonPayload` objects.
- `PATCH /api/v1/academy/lessons/:id/playbook` and `POST /api/v1/academy/lessons/:id/complete` return `200` with persisted `playbookState`, and `401`/`404` on unauthenticated or missing lessons.

---

## 7. Role Boundaries & Prohibitions

- **Strict Backend Scope:** Do NOT edit files inside `apps/web/`.
- Preserve full backward compatibility for existing API response fields (`contentMarkdown`, `dialogueCards`, `videoLecture`) so frontend transitions smoothly.
- Keep `InMemoryAcademyRepository` strictly in parity with `PrismaAcademyRepository`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] Code strictly follows naming, codebase-design, and Fastify best-practice standards.
- [ ] `npm run typecheck` exits with code 0.
- [ ] All `@alongside/shared` and `apps/api` unit/integration tests pass 100%.
- [ ] `ponytail-review` diff audit passed with zero speculative bloat.
- [ ] Conventional Commits used and plain-text PR opened targeting `main` (left open for human merge).
