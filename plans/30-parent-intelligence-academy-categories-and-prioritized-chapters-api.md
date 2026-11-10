# Plan 30: Parent Intelligence Academy Categories & Prioritized Chapters API
**Plan ID:** `PLAN-30`  
**Assignee:** Backend Agent  
**Dependencies:** PLAN-01, PLAN-08, PLAN-16, PLAN-28  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-65  

---

## 1. Objective & Business Value
To transform AlongSide into an authoritative **Parent Advisory & Child Intelligence Platform**, this plan evolves the backend data architecture of the Parent Intelligence Academy. It replaces flat, single-tier course listings with a structured **Category -> Course -> Prioritized Chapter -> Lesson** hierarchy.

Courses are categorized across 5 canonical pillars:
1. `BEHAVIOR_AND_EMOTIONS` (Behavior & Emotional Co-Regulation)
2. `HEALTH_AND_WELLNESS` (Pediatric Health, Sleep & Biological Rhythms)
3. `NUTRITION_AND_FEEDING` (Nutrition, Allergen Exposure & Healthy Relationship with Food)
4. `DEVELOPMENT_AND_PLAY` (Cognitive Leaps, Language & Purposeful Play)
5. `DIGITAL_AND_DEVICES` (Modern Digital World, Screens & Device Sovereignty)

Each course is divided into **Chapters ordered by priority** (`priority: 1 = Critical Foundations, 2 = Daily Routines, 3 = Long-Term Scaffolding`), enabling parents to immediately address acute developmental friction and progress through structured, calm guidance.

---

## 2. Inputs & Architectural References
- **Advisory Platform Specification:** [`docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md`](../docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md)
- **Codebase Design Specification:** [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md) (Deep Modules & Seam Catalog)
- **Backend Skill Matrix:** [`docs/engineering-standards/backend-skill-matrix.md`](../docs/engineering-standards/backend-skill-matrix.md), [`.agents/rules/07-backend-skill-matrix.md`](../.agents/rules/07-backend-skill-matrix.md)
- **Prisma Schema & Data Models:** [`docs/data-models.md`](../docs/data-models.md)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md)

---

## 3. Preconditions & Dependency Verification
- Verify that PLAN-28 is merged and canonical 0–18 lifespan tiers (`TIER_0_INFANCY_TODDLER_0_3` through `TIER_5_LATE_ADOLESCENCE_16_18`) are active in `packages/database/prisma/schema.prisma` and `@alongside/shared`.
- Verify database connectivity and test suite execution via `npm run test` in `apps/api`.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Update Shared Contracts Layer (`packages/shared`)
1. In `packages/shared/src/constants/index.ts`, define:
   ```typescript
   export const AcademyCategory = {
     BEHAVIOR_AND_EMOTIONS: 'BEHAVIOR_AND_EMOTIONS',
     HEALTH_AND_WELLNESS: 'HEALTH_AND_WELLNESS',
     NUTRITION_AND_FEEDING: 'NUTRITION_AND_FEEDING',
     DEVELOPMENT_AND_PLAY: 'DEVELOPMENT_AND_PLAY',
     DIGITAL_AND_DEVICES: 'DIGITAL_AND_DEVICES',
   } as const;
   export type AcademyCategory = (typeof AcademyCategory)[keyof typeof AcademyCategory];

   export const ChapterPriority = {
     PRIORITY_1_CRITICAL: 1,
     PRIORITY_2_ROUTINES: 2,
     PRIORITY_3_SCAFFOLDING: 3,
   } as const;
   export type ChapterPriority = (typeof ChapterPriority)[keyof typeof ChapterPriority];
   ```
2. In `packages/shared/src/schemas/academy.ts`, export `AcademyCategorySchema` and update `AcademyModulesQuerySchema` to accept optional `category` and `tier`.
3. In `packages/shared/src/types/index.ts`, define `AcademyChapterDTO` and expand `AcademyModuleDTO` to include `category: AcademyCategory` and `chapters: AcademyChapterDTO[]`.

### Task 2: Prisma Schema Evolution & Migration
1. In `packages/database/prisma/schema.prisma`:
   - Add enum `AcademyCategory`:
     ```prisma
     enum AcademyCategory {
       BEHAVIOR_AND_EMOTIONS
       HEALTH_AND_WELLNESS
       NUTRITION_AND_FEEDING
       DEVELOPMENT_AND_PLAY
       DIGITAL_AND_DEVICES
     }
     ```
   - Update `AcademyModule`:
     - Add `category AcademyCategory @default(DIGITAL_AND_DEVICES)`
     - Add relation: `chapters AcademyChapter[]`
     - Add index: `@@index([category, developmentalTier])`
   - Add model `AcademyChapter`:
     ```prisma
     model AcademyChapter {
       id                 String             @id @default(uuid())
       moduleId           String
       module             AcademyModule      @relation(fields: [moduleId], references: [id], onDelete: Cascade)
       slug               String
       title              String
       summary            String
       priority           Int                @default(1)
       sortOrder          Int                @default(0)
       createdAt          DateTime           @default(now())
       updatedAt          DateTime           @updatedAt

       lessons            AcademyLesson[]

       @@unique([moduleId, slug])
       @@map("academy_chapters")
     }
     ```
   - Update `AcademyLesson`:
     - Add `chapterId String?`
     - Add `chapter AcademyChapter? @relation(fields: [chapterId], references: [id], onDelete: Cascade)`
2. Generate Prisma Client and create migration.

### Task 3: Deep Module API Implementation (`apps/api/src/modules/academy/`)
1. Update `AcademyRepository`:
   - Implement `findCategoriesWithStats()` returning module and lesson counts per category.
   - Implement `findModules(filters: { category?: AcademyCategory; tier?: DevelopmentalTier })` returning modules ordered by tier and priority.
   - Implement `findModuleBySlug(slug: string)` with nested chapters ordered by `priority ASC, sortOrder ASC` and their child lessons.
2. Update `academy.routes.ts`:
   - `GET /api/academy/categories` — list the 5 categories with metadata and course counts.
   - `GET /api/academy/modules` — query modules filtered by `?category=` and `?tier=`.
   - `GET /api/academy/modules/:slug` — retrieve full course with prioritized chapter hierarchy.

### Task 4: Seed Canonical Prioritized Curriculum
1. In `packages/database/prisma/seed.ts` (or `packages/database/prisma/seeds/academy.seed.ts`):
   - Seed courses for all 5 categories across all 6 developmental tiers (as specified in Section 4 of `docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md`).
   - For every course, seed 3 distinct chapters:
     - **Chapter 1 (Priority 1: Critical & Foundational)**
     - **Chapter 2 (Priority 2: Daily Routines & Co-Regulation)**
     - **Chapter 3 (Priority 3: Advanced Scaffolding & Growth)**
   - Wire lessons to their corresponding chapters with markdown content containing `> **Clinical Insight:**` and `**What to Say:** "..."` blocks.

### Task 5: Fastify Integration Testing
1. In `apps/api/test/academyPrioritizedChapters.test.ts`:
   - Assert `GET /api/academy/categories` returns all 5 categories with status 200.
   - Assert `GET /api/academy/modules?category=BEHAVIOR_AND_EMOTIONS` filters accurately.
   - Assert `GET /api/academy/modules/:slug` returns chapters sorted strictly by `priority ASC`.
   - Verify backward compatibility: ensure existing queries without category filter return all modules safely.

---

## 5. Specific Deliverables (Files to Create / Modify)
- [ ] `packages/shared/src/constants/index.ts` (Add `AcademyCategory` & `ChapterPriority`)
- [ ] `packages/shared/src/schemas/academy.ts` (Add category & chapter validation schemas)
- [ ] `packages/shared/src/types/index.ts` (Add `AcademyChapterDTO` & updated module DTOs)
- [ ] `packages/database/prisma/schema.prisma` (Add `AcademyCategory`, `AcademyChapter` model)
- [ ] `apps/api/src/modules/academy/academy.repository.ts` (Implement category & chapter queries)
- [ ] `apps/api/src/modules/academy/academy.routes.ts` (Add category endpoint & chapter serialization)
- [ ] `packages/database/prisma/seed.ts` (Seed 5 categories & prioritized chapters)
- [ ] `apps/api/test/academyPrioritizedChapters.test.ts` (Fastify `.inject()` integration tests)

---

## 6. Acceptance Criteria & Verification Plan
- [ ] Schema compiles and Prisma client generates with zero errors.
- [ ] `GET /api/academy/categories` returns 5 categories: `BEHAVIOR_AND_EMOTIONS`, `HEALTH_AND_WELLNESS`, `NUTRITION_AND_FEEDING`, `DEVELOPMENT_AND_PLAY`, `DIGITAL_AND_DEVICES`.
- [ ] `GET /api/academy/modules/:slug` returns chapters ordered by priority (`1`, `2`, `3`).
- [ ] All integration tests pass 100% via Vitest.
- [ ] `npm run typecheck` exits with code 0.

---

## 7. Role Boundaries & Prohibitions
- ❌ **DO NOT** edit React files in `apps/web/` (Frontend Agent domain).
- ❌ **DO NOT** author shallow pass-through services; enforce domain invariants inside `AcademyRepository` and `AcademyService`.
- ❌ **DO NOT** break existing API response contracts for legacy consumers.

---

## 8. Definition of Done (DoD) Sign-Off Checklist
- [ ] All database models, schemas, and routes created and verified.
- [ ] Seed script executes reliably with idempotency.
- [ ] Code passes `ponytail-review` audit for zero bloat.
- [ ] Conventional commit created.
- [ ] Pull request submitted with plain text (`.txt`) description.
