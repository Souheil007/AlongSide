# Plan 43: Purge Legacy Clinical Symptom Triage, Child Health Logs & Ghost Tables
**Plan ID:** `PLAN-43`  
**Assignee:** Joint (Backend Agent & Frontend Agent)  
**Dependencies:** PLAN-40, PLAN-41, PLAN-42  
**Estimated Scope:** Medium (Database Schema Pruning, Migration, API Cleanliness & Shared Contract Hardening)  
**Status:** Ready for Review & Delegation  

---

## 1. Objective & Business Value

Following AlongSide's strategic transition documented in [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md#L18-L22) from a clinical symptom triage tool to an educational family operating system and pediatric sleep/wellness platform (Ages 0–18), several legacy database tables, dead enums, unused API endpoints, ghost schemas, and obsolete columns remained in the codebase.

The goal of this plan is to purge all dead clinical symptom triage code, ghost tables, and unused columns across the monorepo:
1. **Drop Dead & Ghost Tables from PostgreSQL (`packages/database`):**
   - Drop `symptom_protocols` (`SymptomProtocol` model — 8 Barton Schmitt telephone protocols).
   - Drop `child_health_logs` (`ChildHealthLog` model — fever and 3-zone triage logs).
   - Drop `user_script_bookmarks` (`UserScriptBookmark` model — a ghost table with zero queries, zero services, and zero frontend implementation).
   - Drop `enum TriageZone` (`RED`, `YELLOW`, `GREEN`).
2. **Drop Dead Column from Active Table (`packages/database`):**
   - In `milestones` table (`Milestone` model): Drop **`clinicalAuthority`** column (Choice A: eliminating unused medicalized citation metadata not rendered in the UI).
3. **Remove Dead Seed Scripts (`packages/database/prisma/seed/`):**
   - Delete `health.seed.ts` (which upserted Barton Schmitt protocols into `symptom_protocols`).
   - Unregister `seedHealthProtocols` from `packages/database/prisma/seed/index.ts`.
   - Remove `clinicalAuthority` from `milestones.seed.ts`.
4. **Clean Backend API (`apps/api/src/modules/health/`, `children/`, & `milestones/`):**
   - Delete `triage.engine.ts` (`BartonSchmittTriageAdapter`).
   - Remove clinical triage routes (`/protocols`, `/triage`, `/protocols/:slug`, `/logs/:childId`, `/logs`) from `health.routes.ts` while preserving the critical server uptime health ping (`GET /api/v1/health` -> `{ status: 'ok', uptime }`).
   - Remove the dead child health-log routes (`GET/POST /api/v1/children/:childId/health-logs`) from `children.routes.ts`.
   - Prune dead protocol and health-log methods from `health.repository.ts` and `health.service.ts`.
   - Remove `clinicalAuthority` mapping from `milestones.repository.ts` and response schemas in `milestones.routes.ts`.
   - Update `apps/api/test/health.test.ts` to assert the server health ping without asserting dead triage endpoints.
5. **Prune Shared Contracts (`packages/shared`):**
   - Remove `calculateAntipyreticDose()` and `evaluateSymptomTriage()` from `packages/shared/src/algorithms/pediatricHealth.ts`.
   - Remove `enum AntipyreticMedication` from `packages/shared/src/constants/index.ts`.
   - Remove `SymptomProtocolDTO`, `ChildHealthLogDTO`, `TriageResultDTO`, `TriageAssessmentRequestDTO`, and `AntipyreticDosingResultDTO` from `packages/shared/src/types/index.ts`.
   - Remove `clinicalAuthority` from `MilestoneDTO` in `packages/shared/src/types/index.ts`.
   - Prune obsolete triage Zod schemas from `packages/shared/src/schemas/`.
6. **Purge Retired Frontend Stubs (`apps/web`):**
   - Remove `apps/web/src/lib/api/health.ts` (which was marked `@deprecated RETIRED IN SOU-86` with mock Barton Schmitt protocols).
   - Remove `apps/web/test/healthTriageUI.test.ts` (testing the deprecated triage client).
   - Clean `clinicalAuthority` references from `apps/web/src/lib/api/milestones.ts`.

---

## 2. Complete 31-Table Codebase Audit & Decision Matrix

| # | Table / Model | Domain | Status | Action in PLAN-43 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `User` (`users`) | Auth | **Active** | Keep. Remove `scriptBookmarks` relation. |
| 2 | `Subscription` (`subscriptions`) | Billing | **Active** | Keep. All 9 columns active (Stripe sync). |
| 3 | `Child` (`children`) | Family | **Active** | Keep. Remove `healthLogs` relation. |
| 4 | `DeviceProfile` (`device_profiles`) | Devices | **Active** | Keep. All 13 columns active (Pact-as-Code MDM). |
| 5 | `Agreement` (`agreements`) | Pacts | **Active** | Keep. All 12 columns active (Bilateral Pact). |
| 6 | `AgreementClause` (`agreement_clauses`) | Pacts | **Active** | Keep. All 10 columns active. |
| 7 | `Quiz` (`quizzes`) | Quizzes | **Active** | Keep. Dynamic assessment definitions. |
| 8 | `QuizQuestion` (`quiz_questions`) | Quizzes | **Active** | Keep. Quiz question items. |
| 9 | `QuizOption` (`quiz_options`) | Quizzes | **Active** | Keep. Answer choices with weights. |
| 10 | `QuizAttempt` (`quiz_attempts`) | Quizzes | **Active** | Keep. User & child quiz scores (0-100). |
| 11 | `QuizResponse` (`quiz_responses`) | Quizzes | **Active** | Keep. Response record per attempt. |
| 12 | `AcademyModule` (`academy_modules`) | Academy | **Active** | Keep. 40 courses across 8 tiers. |
| 13 | `AcademyChapter` (`academy_chapters`) | Academy | **Active** | Keep. Priority-based chapter ordering. |
| 14 | `AcademyLesson` (`academy_lessons`) | Academy | **Active** | Keep. All enriched editorial fields active. |
| 15 | `AcademyProgress` (`academy_progress`) | Academy | **Active** | Keep. Lesson completion tracking. |
| 16 | `AiConversation` (`ai_conversations`) | AI Advisor | **Active** | Keep. Contextual chat sessions. |
| 17 | `AiMessage` (`ai_messages`) | AI Advisor | **Active** | Keep. Chat messages, token usage & FAQ IDs. |
| 18 | `FaqCategory` (`faq_categories`) | AI / FAQs | **Active** | Keep. FAQ category taxonomy. |
| 19 | `FaqItem` (`faq_items`) | AI / FAQs | **Active** | Keep. 100+ parenting FAQs & scripts. |
| 20 | `CultureDigest` (`culture_digests`) | Culture | **Active** | Keep. Weekly Sunday culture issues. |
| 21 | `SlangTerm` (`slang_terms`) | Culture | **Active** | Keep. Youth slang dictionary terms. |
| 22 | `ExploitAlert` (`exploit_alerts`) | Culture | **Active** | Keep. App bypass & security alerts. |
| 23 | `UserScriptBookmark` (`user_script_bookmarks`) | Scripts | **Ghost** | **DROP TABLE.** Unused anywhere in app. |
| 24 | `Milestone` (`milestones`) | Milestones | **Active** | Keep. **DROP COLUMN `clinicalAuthority`**. |
| 25 | `ChildMilestone` (`child_milestones`) | Milestones | **Active** | Keep. Child achievement tracking. |
| 26 | `SymptomProtocol` (`symptom_protocols`) | Clinical | **Dead** | **DROP TABLE.** Retired clinical triage. |
| 27 | `ChildHealthLog` (`child_health_logs`) | Clinical | **Dead** | **DROP TABLE.** Retired fever/triage logs. |
| 28 | `NutritionGuide` (`nutrition_guides`) | Nutrition | **Active** | Keep. 5 dietary stages (milk to teens). |
| 29 | `BrainGameActivity` (`brain_game_activities`) | Play | **Active** | Keep. Screen-free sensory & maker games. |
| 30 | `BehaviorGuide` (`behavior_guides`) | Psychology| **Active** | Keep. Tantrum co-regulation scripts. |
| 31 | `_prisma_migrations` | System | **Active** | Keep. Prisma internal migration tracking. |

---

## 3. Inputs & Architectural References

- **Project Scope Specification:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md#L18-L22) (Section 1.1: Platform Safe Harbor & De-Clinicalization)
- **Database Schema:** [`packages/database/prisma/schema.prisma`](../packages/database/prisma/schema.prisma)
- **Database Seed Index:** [`packages/database/prisma/seed/index.ts`](../packages/database/prisma/seed/index.ts)
- **Fastify Health Routes:** [`apps/api/src/modules/health/health.routes.ts`](../apps/api/src/modules/health/health.routes.ts)
- **Fastify Children Routes:** [`apps/api/src/modules/children/children.routes.ts`](../apps/api/src/modules/children/children.routes.ts)
- **Code Quality & Testing Principles:** [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md)
- **Git Commit Standards:** [`docs/engineering-standards/git-commit-standards.md`](../docs/engineering-standards/git-commit-standards.md)

---

## 4. Preconditions & Dependency Verification

1. Verify `npm run typecheck` passes across the monorepo with 0 errors before beginning.
2. Verify all active domain tables (`User`, `Child`, `DeviceProfile`, `Agreement`, `Quiz`, `AcademyModule`, `AiConversation`, `CultureDigest`, `Milestone`, `NutritionGuide`, `BrainGameActivity`, `BehaviorGuide`) remain completely functional.
3. Assert that the server health check endpoint `GET /api/v1/health` remains functional and intact for uptime monitoring.

---

## 5. Step-by-Step Implementation Tasks

### Task 1: Prune Database Models & Generate Migration (`packages/database`) [Assignee: Backend Agent]
1. In `packages/database/prisma/schema.prisma`:
   - Delete `model SymptomProtocol` (`@@map("symptom_protocols")`).
   - Delete `model ChildHealthLog` (`@@map("child_health_logs")`).
   - Delete `model UserScriptBookmark` (`@@map("user_script_bookmarks")`).
   - Delete `enum TriageZone`.
   - In `model Milestone`: Delete `clinicalAuthority String @default("CDC / AAP Bright Futures")`.
   - In `model User`: Remove `scriptBookmarks UserScriptBookmark[]`.
   - In `model Child`: Remove `healthLogs ChildHealthLog[]`.
2. Generate Prisma client: `npm run db:generate`.
3. Create a clean migration in `packages/database/prisma/migrations/20261119_purge_legacy_clinical_triage_and_ghost_tables/migration.sql` with:
   ```sql
   -- DropForeignKey
   ALTER TABLE "child_health_logs" DROP CONSTRAINT IF EXISTS "child_health_logs_childId_fkey";
   ALTER TABLE "child_health_logs" DROP CONSTRAINT IF EXISTS "child_health_logs_protocolId_fkey";
   ALTER TABLE "user_script_bookmarks" DROP CONSTRAINT IF EXISTS "user_script_bookmarks_userId_fkey";

   -- DropTable
   DROP TABLE IF EXISTS "child_health_logs";
   DROP TABLE IF EXISTS "symptom_protocols";
   DROP TABLE IF EXISTS "user_script_bookmarks";

   -- DropEnum
   DROP TYPE IF EXISTS "TriageZone";

   -- AlterTable
   ALTER TABLE "milestones" DROP COLUMN IF EXISTS "clinicalAuthority";
   ```
4. In `packages/database/prisma/seed/index.ts`:
   - Remove `import { seedHealthProtocols } from './health.seed.js';`.
   - Remove `await seedHealthProtocols(prisma);`.
   - Delete `packages/database/prisma/seed/health.seed.ts`.
5. In `packages/database/prisma/seed/milestones.seed.ts`:
   - Remove `clinicalAuthority` properties from seed records and upsert statements.

---

### Task 2: Prune Shared Contracts & Algorithms (`packages/shared`) [Assignee: Backend Agent]
1. In `packages/shared/src/algorithms/pediatricHealth.ts`:
   - Delete `calculateAntipyreticDose()` and `evaluateSymptomTriage()`.
2. In `packages/shared/src/constants/index.ts`:
   - Remove `AntipyreticMedication` and `TriageZone` (if exported).
3. In `packages/shared/src/types/index.ts`:
   - Remove `SymptomProtocolDTO`, `ChildHealthLogDTO`, `TriageResultDTO`, `TriageAssessmentRequestDTO`, `AntipyreticDosingResultDTO`.
   - Remove `clinicalAuthority?: string` from `MilestoneDTO`.
4. In `packages/shared/src/schemas/`:
   - Remove `SymptomTriageInputSchema` and `LogHealthEventSchema`.
5. Run `npm run typecheck --workspace=@alongside/shared` and `npm test --workspace=@alongside/shared`.

---

### Task 3: Clean Backend API Modules & Tests (`apps/api`) [Assignee: Backend Agent]
1. Delete `apps/api/src/modules/health/triage.engine.ts`.
2. In `apps/api/src/modules/health/health.routes.ts`:
   - Keep only the root server ping route:
     ```ts
     fastify.get('/', async () => {
       return {
         status: 'ok',
         uptime: process.uptime(),
         timestamp: new Date().toISOString(),
       };
     });
     ```
   - Delete all clinical routes (`/protocols`, `/triage`, `/protocols/:slug`, `/logs/:childId`, `/logs`).
3. In `apps/api/src/modules/children/children.routes.ts`:
   - Remove `GET /api/v1/children/:childId/health-logs` and `POST /api/v1/children/:childId/health-logs`.
   - Remove `healthService` options if no longer needed by children routes.
4. Clean `apps/api/src/modules/health/health.repository.ts` and `apps/api/src/modules/health/health.service.ts` to remove protocol and child health-log database calls.
5. In `apps/api/src/modules/milestones/milestones.repository.ts` and `milestones.routes.ts`:
   - Remove `clinicalAuthority` from mapped objects and response DTO schemas.
6. In `apps/api/test/health.test.ts`:
   - Prune obsolete triage and symptom log tests. Keep and verify `GET /api/v1/health` (uptime check).
7. Run `npm run typecheck --workspace=@alongside/api` and `npm test --workspace=@alongside/api`.

---

### Task 4: Clean Retired Frontend Client & Tests (`apps/web`) [Assignee: Frontend Agent]
1. Delete `apps/web/src/lib/api/health.ts` (the deprecated client module).
2. Delete `apps/web/test/healthTriageUI.test.ts`.
3. In `apps/web/src/lib/api/milestones.ts`:
   - Remove `clinicalAuthority` from local fallback objects and typing.
4. Verify `apps/web/src/components/health/HealthDashboardView.tsx` and `SleepRegressionCompanion.tsx` continue rendering seamlessly.
5. Run `npm run typecheck --workspace=@alongside/web` and `npm test --workspace=@alongside/web`.

---

## 6. Specific Deliverables (Files to Create / Modify / Delete)

- [ ] `packages/database/prisma/schema.prisma` (Modified — remove models `SymptomProtocol`, `ChildHealthLog`, `UserScriptBookmark`, enum `TriageZone`, column `Milestone.clinicalAuthority`)
- [ ] `packages/database/prisma/migrations/20261119_purge_legacy_clinical_triage_and_ghost_tables/migration.sql` (Created — SQL DDL dropping dead tables, enum & column)
- [ ] `packages/database/prisma/seed/index.ts` (Modified — remove health protocol seed registration)
- [ ] `packages/database/prisma/seed/health.seed.ts` (Deleted)
- [ ] `packages/database/prisma/seed/milestones.seed.ts` (Modified — remove `clinicalAuthority`)
- [ ] `packages/shared/src/algorithms/pediatricHealth.ts` (Modified or Deleted)
- [ ] `packages/shared/src/constants/index.ts` (Modified — remove `AntipyreticMedication`)
- [ ] `packages/shared/src/types/index.ts` (Modified — remove triage/health-log DTOs, remove `clinicalAuthority` from `MilestoneDTO`)
- [ ] `packages/shared/src/schemas/child.ts` / `shared/src/schemas/index.ts` (Modified — remove dead health schemas)
- [ ] `apps/api/src/modules/health/triage.engine.ts` (Deleted)
- [ ] `apps/api/src/modules/health/health.routes.ts` (Modified — keep only server uptime ping)
- [ ] `apps/api/src/modules/health/health.service.ts` (Modified — clean dead methods)
- [ ] `apps/api/src/modules/health/health.repository.ts` (Modified — clean dead methods)
- [ ] `apps/api/src/modules/milestones/milestones.repository.ts` (Modified — remove `clinicalAuthority`)
- [ ] `apps/api/src/modules/milestones/milestones.routes.ts` (Modified — remove `clinicalAuthority`)
- [ ] `apps/api/src/modules/children/children.routes.ts` (Modified — remove child health-log endpoints)
- [ ] `apps/api/test/health.test.ts` (Modified — test server uptime only)
- [ ] `apps/web/src/lib/api/health.ts` (Deleted)
- [ ] `apps/web/src/lib/api/milestones.ts` (Modified — remove `clinicalAuthority`)
- [ ] `apps/web/test/healthTriageUI.test.ts` (Deleted)

---

## 7. Acceptance Criteria & Test Verification

1. **Prisma Schema Validation:**
   ```bash
   npm run db:validate
   npm run db:generate
   ```
   Must exit with code `0`.
2. **Type Safety Across Monorepo:**
   ```bash
   npm run typecheck
   ```
   Must exit with code `0` across all packages (`@alongside/shared`, `@alongside/database`, `@alongside/api`, `@alongside/web`).
3. **Automated Test Suite Execution:**
   ```bash
   npm test
   ```
   All test suites in `apps/api` and `apps/web` must pass with 100% success.
4. **Server Uptime Endpoint Verification:**
   `GET /api/v1/health` must return HTTP `200` with `{ "status": "ok" }`.
5. **Database Purity:**
   `symptom_protocols`, `child_health_logs`, `user_script_bookmarks`, and `Milestone.clinicalAuthority` must no longer exist in the Prisma client models.

---

## 8. Role Boundaries & Prohibitions

- ❌ **DO NOT** modify any active domain models (`User`, `Child`, `DeviceProfile`, `Agreement`, `Quiz`, `AcademyModule`, `AiConversation`, `CultureDigest`, `NutritionGuide`, `BrainGameActivity`, `BehaviorGuide`).
- ❌ **DO NOT** modify `SleepRegressionCompanion.tsx` or `HealthDashboardView.tsx` in `apps/web/src/components/health/`.
- ❌ **DO NOT** delete the server uptime endpoint `GET /api/v1/health`.
- ❌ **DO NOT** commit application code directly to `main`; work on dedicated feature branch and open a PR.

---

## 9. Definition of Done (DoD) Checklist

- [ ] Plan approved by human user / engineering review.
- [ ] Dead database models and ghost tables removed from `schema.prisma`.
- [ ] `clinicalAuthority` column removed from `Milestone` model.
- [ ] Migration generated and committed in `packages/database/prisma/migrations/`.
- [ ] Dead seed file `health.seed.ts` deleted and unlinked from seed index.
- [ ] Shared clinical triage algorithms, DTOs, and medication dosing functions purged.
- [ ] Backend triage engine deleted; dead routes cleanly removed from `apps/api`.
- [ ] Deprecated frontend client and obsolete test suite removed from `apps/web`.
- [ ] `npm run typecheck` exits 0 with zero errors.
- [ ] `npm test` passes with 100% green tests.
- [ ] Diff audited with `ponytail-review` to ensure smallest complete change.
- [ ] Conventional Commit submitted and PR opened targeting `main`.
