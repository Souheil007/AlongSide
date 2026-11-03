# Plan 08: Parent Intelligence Academy Modules & Youth Culture Digest API
**Plan ID:** `PLAN-08`  
**Assignee:** Backend Agent  
**Dependencies:** PLAN-01  
**Estimated Scope:** Medium  
**Status:** Completed & Verified  

---

## 1. Objective & Business Value

Implement the backend domain services, REST endpoints, and database seed scripts for the **Parent Intelligence Academy** (structured neurodevelopmental modules and emotional language decoders across all 4 age tiers) and the **Weekly Youth Culture & Exploit Digest** (Sunday briefings, trending slang definitions, hidden bypass tricks, and family dinner conversation starters).

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 3: Pillars 1 & 4)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Service Layer)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 5: Academy, Section 9: Digest)
- **Database Schema:** [`docs/data-models.md`](../docs/data-models.md) (`AcademyModule`, `AcademyLesson`, `AcademyProgress`, `CultureDigest`, `SlangTerm`, `ExploitAlert`)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-01` completed (`packages/database` and Prisma client available).
- **Verification:** Assert models `AcademyModule`, `CultureDigest`, and `SlangTerm` exist in Prisma schema.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Parent Intelligence Academy Domain Service
1. Implement `apps/api/src/modules/academy/academy.service.ts`:
   - `getModulesByTier(tier: DevelopmentalTier, userId: string)`: Returns modules with parent completion progress.
   - `getModuleBySlug(slug: string)`: Returns module details and lesson list.
   - `getLessonById(lessonId: string)`.
   - `markLessonComplete(userId: string, lessonId: string)`: Upserts `AcademyProgress` record.
2. Implement Fastify routes in `apps/api/src/modules/academy/academy.routes.ts`.

### Task 2: Youth Culture & Exploit Alert Domain Service
1. Implement `apps/api/src/modules/digest/digest.service.ts`:
   - `getLatestDigest()`: Retrieves current Sunday briefing, slang terms, and exploit early warnings.
   - `searchSlang(term: string)`: Returns slang definition, example sentences, and tone flag (harmless play vs. toxic subculture).
   - `getExploitAlerts()`: Returns security bypass alerts (calculator vaults, proxy browsers, Sendit/NGL).
2. Implement Fastify routes in `apps/api/src/modules/digest/digest.routes.ts`.

### Task 3: Comprehensive Database Seed Scripts
1. Implement `packages/database/prisma/seed/academy.seed.ts`:
   - Seed core modules for each tier:
     - Tier 1 (8–9): Early Impulse Centers & Shared Media.
     - Tier 2 (10–11): The Tween Brain, Adrenarche & The Peer Shift.
     - Tier 3 (12–13): Pubertal Circadian Delay & Bedroom Phone Curfews.
     - Tier 4 (14+): The Autonomy Transition & Graduated Privileges.
2. Implement `packages/database/prisma/seed/digest.seed.ts`:
   - Seed initial Sunday briefing issue with slang dictionary (*crashout, rizz, skibidi, looksmaxing, cooked*) and exploit alerts (*Calculator Vault, Google Translate Proxy*).
3. Connect into `packages/database/prisma/seed/index.ts` and verify with `npm run db:seed`.

### Task 4: Automated Integration Testing
1. Author Vitest tests in `apps/api/tests/modules/academy/academy.test.ts`:
   - Query modules by tier -> returns proper modules.
   - Complete lesson -> progress record created and percentage updated.
2. Author Vitest tests in `apps/api/tests/modules/digest/digest.test.ts`:
   - Get latest digest -> returns slang items and dinner question.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [x] `packages/database/prisma/seed/academy.seed.ts`
- [x] `packages/database/prisma/seed/digest.seed.ts`
- [x] `packages/database/prisma/seed/index.ts`
- [x] `apps/api/src/modules/academy/academy.repository.ts`
- [x] `apps/api/src/modules/academy/academy.service.ts`
- [x] `apps/api/src/modules/academy/academy.controller.ts`
- [x] `apps/api/src/modules/academy/academy.routes.ts`
- [x] `apps/api/src/modules/digest/digest.repository.ts`
- [x] `apps/api/src/modules/digest/digest.service.ts`
- [x] `apps/api/src/modules/digest/digest.controller.ts`
- [x] `apps/api/src/modules/digest/digest.routes.ts`
- [x] `apps/api/test/academy.test.ts`
- [x] `apps/api/test/digest.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Type Checking:**
   ```bash
   npm run typecheck --workspace=@alongside/api
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors.
2. **Database Seed Verification:**
   ```bash
   npm run db:seed --workspace=@alongside/database
   ```
   *Pass criteria:* Successfully inserts modules, lessons, and slang terms without errors.
3. **Integration Test Suite:**
   ```bash
   npm test --workspace=@alongside/api
   ```
   *Pass criteria:* 100% of academy and digest test suites pass.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Backend Agent.
- ❌ **DO NOT** edit files in `apps/web/`.
- ❌ **DO NOT** create React UI cards or course player components.
- ✅ Work exclusively inside `apps/api/` and `packages/database/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] Seed data accurately covers all 4 neurodevelopmental age tiers.
- [x] Slang dictionary and exploit alerts seeded.
- [x] `npm run typecheck` exits with code 0.
- [x] All automated tests pass.
- [x] Commits adhere to Conventional Commits (`feat(academy): ...`).
