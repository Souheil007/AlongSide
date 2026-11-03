# Plan 04: Child Profile CRUD, Contextual Road Fork & Readiness API
**Plan ID:** `PLAN-04`  
**Assignee:** Backend Agent  
**Dependencies:** PLAN-02  
**Estimated Scope:** Medium  
**Status:** Completed & Verified  

---

## 1. Objective & Business Value

Implement the child profile management module with immediate contextual road bifurcation (`PRE_DEVICE` vs. `ACTIVE_DEVICE`), automatic mapping into the 4 neurodevelopmental age tiers (`TIER_1_AGES_8_9`, `TIER_2_AGES_10_11`, `TIER_3_AGES_12_13`, `TIER_4_AGES_14_PLUS`), and the 10-dimension First-Phone Readiness Assessment evaluation engine. This personalizes the entire AlongSide platform according to the child's exact developmental reality.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 3: Pillars 1 & 2, Section 4: Two Contextual Roads)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Data Flow 3.1)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 3: Children, Section 4: Quizzes)
- **Database Schema:** [`docs/data-models.md`](../docs/data-models.md) (`Child`, `Quiz`, `QuizAttempt` models)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-02` completed (Authenticated parent session available).
- **Verification:** Ensure `authenticate` middleware is working via `apps/api/src/plugins/auth.plugin.ts`.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Developmental Tier Calculation Logic
1. Implement `calculateDevelopmentalTier(birthYear: number, birthMonth: number): DevelopmentalTier` in `packages/shared/src/algorithms/childTier.ts`:
   - Ages 8–9 -> `TIER_1_AGES_8_9`
   - Ages 10–11 -> `TIER_2_AGES_10_11`
   - Ages 12–13 -> `TIER_3_AGES_12_13`
   - Ages 14+ -> `TIER_4_AGES_14_PLUS`

### Task 2: Child Profile CRUD Service & Controller
1. Implement `apps/api/src/modules/children/children.service.ts`:
   - `createChild(userId: string, data: CreateChildInput)`: Validates input, calculates developmental tier, persists `Child` record.
   - `getChildrenByUserId(userId: string)`: Returns array of children with their active road type and enrolled device profile status.
   - `getChildById(userId: string, childId: string)`: Enforces tenant isolation (`where: { id: childId, userId }`).
   - `updateChild(userId: string, childId: string, data: UpdateChildInput)`.
   - `deleteChild(userId: string, childId: string)`.
2. Implement Fastify routes in `apps/api/src/modules/children/children.routes.ts`:
   - `POST /api/v1/children`
   - `GET /api/v1/children`
   - `GET /api/v1/children/:id`
   - `PUT /api/v1/children/:id`
   - `DELETE /api/v1/children/:id`

### Task 3: First-Phone Readiness Assessment API
1. Implement readiness scoring algorithm in `packages/shared/src/algorithms/readinessScoring.ts`:
   - 10 evaluated dimensions (executive function, online safety, bedtime habits, peer pressure resilience, etc.).
   - Computes overall score (0–100) and dimension breakdown JSON.
2. Implement `POST /api/v1/children/:id/readiness-assessment`:
   - Records quiz responses in `QuizAttempt` and `QuizResponse` tables.
   - Calculates overall score and returns actionable recommendation roadmap (e.g. `ROAD_1_BRIDGE_CHARTER` if < 75).

### Task 4: Automated Integration Testing
1. Author Vitest tests in `apps/api/test/children.test.ts`:
   - Create child with `roadType: PRE_DEVICE` -> asserts correct developmental tier calculated.
   - List children -> returns only current user's children (tenant isolation check).
   - Attempting to read another parent's child -> returns 404/403.
   - Submit readiness assessment -> asserts 0–100 score calculated and persisted.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [x] `packages/shared/src/algorithms/childTier.ts`
- [x] `packages/shared/src/algorithms/readinessScoring.ts`
- [x] `apps/api/src/modules/children/children.repository.ts`
- [x] `apps/api/src/modules/children/children.service.ts`
- [x] `apps/api/src/modules/children/children.controller.ts`
- [x] `apps/api/src/modules/children/children.routes.ts`
- [x] `apps/api/src/app.ts` (Register children routes)
- [x] `apps/api/test/children.test.ts`
- [x] `packages/shared/test/childTier.test.ts`
- [x] `packages/shared/test/quizScoring.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Type Checking:**
   ```bash
   npm run typecheck --workspaces
   ```
   *Pass criteria:* Zero compile errors across shared and api packages.
2. **Integration Test Suite:**
   ```bash
   npm test --workspace=@alongside/api
   ```
   *Pass criteria:* All children module tests pass with 100% success.
3. **Tenant Isolation Verification:**
   *Pass criteria:* Querying child profile belonging to another user returns 404 Not Found.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Backend Agent.
- ❌ **DO NOT** edit or create files in `apps/web/`.
- ❌ **DO NOT** build child onboarding frontend forms.
- ✅ Work exclusively inside `apps/api/` and `packages/shared/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] 4 developmental tiers correctly assigned based on birthdate.
- [x] Tenant isolation strictly enforced on all child queries.
- [x] `npm run typecheck` exits with code 0.
- [x] All automated tests pass.
- [x] Commits adhere to Conventional Commits (`feat(children): ...`).
