# Plan 12: Interactive Assessment Suite & Cultural Fluency Quizzes
**Plan ID:** `PLAN-12`  
**Assignee:** Joint (FE & BE)  
**Dependencies:** PLAN-04, PLAN-05  
**Estimated Scope:** Medium  

---

## 1. Objective & Business Value

Implement the complete gamified **Interactive Assessment Suite** to make parent education engaging, habit-forming, and actionable. Features the weekly *"Do You Speak Tween?"* Cultural Fluency Quiz, the *Parenting Style & Conflict Profiler*, the *Household Tech Health & Sleep Friction Audit*, and the collaborative *Joint Parent-Child Discovery Bridge Quiz*.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 3: Pillar 2 "Interactive Quizzes, Assessments & Cultural Fluency Checks")
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (QuizModule & QuizRunner)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 4: Quizzes)
- **Database Schema:** [`docs/data-models.md`](../docs/data-models.md) (`Quiz`, `QuizQuestion`, `QuizOption`, `QuizAttempt`)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-04` (Readiness scoring engine) and `PLAN-05` (Quiz UI primitives) completed.
- **Verification:** Ensure `QuizType` enum and models exist in `packages/database`.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Backend Domain Service & Seed Catalog (Backend Agent)
1. Implement seed scripts in `packages/database/prisma/seed/quizzes.seed.ts` for:
   - `CULTURAL_FLUENCY_TWEEN`: 5 slang/meme questions with explanations.
   - `PARENTING_STYLE_CONFLICT`: 8 situational questions evaluating Authoritarian vs. Permissive vs. Authoritative tendencies.
   - `HOUSEHOLD_SCREEN_AUDIT`: 6 questions identifying evening friction points.
   - `JOINT_DISCOVERY_BRIDGE`: 6 two-player questions designed for parent and child to take together.
2. Implement `apps/api/src/modules/quizzes/quizzes.service.ts`:
   - `getQuizzes()`: Lists active quizzes with estimated minutes.
   - `getQuizByType(type: QuizType)`: Retrieves questions, options, and explanations.
   - `submitQuizAttempt(userId: string, data: SubmitQuizAttemptInput)`: Computes dimension scores and persists attempt.
3. Implement routes in `apps/api/src/modules/quizzes/quizzes.routes.ts`.

### Task 2: Frontend Quiz Runner & Animations (Frontend Agent)
1. Implement Zustand quiz runner store in `apps/web/src/stores/useQuizRunnerStore.ts`.
2. Implement dynamic quiz runner component in `apps/web/src/components/quizzes/QuizRunner.tsx`:
   - Card transitions with micro-animations.
   - Instant visual feedback on correct answers and slang explanations.
3. Implement quiz result breakdown cards:
   - Parenting Style Radar / Bar chart showing Mentorship balance.
   - Joint Parent-Child comparison summary highlighting shared values.
4. Implement `apps/web/src/app/(dashboard)/quizzes/page.tsx` (Quiz hub) and `/quizzes/[type]/page.tsx` (Active quiz session).

---

## 5. Specific Deliverables (Files to Create / Modify)

### Backend Deliverables:
- [ ] `packages/database/prisma/seed/quizzes.seed.ts`
- [ ] `apps/api/src/modules/quizzes/quizzes.service.ts`
- [ ] `apps/api/src/modules/quizzes/quizzes.controller.ts`
- [ ] `apps/api/src/modules/quizzes/quizzes.routes.ts`
- [ ] `apps/api/tests/modules/quizzes/quizzes.test.ts`

### Frontend Deliverables:
- [ ] `apps/web/src/stores/useQuizRunnerStore.ts`
- [ ] `apps/web/src/components/quizzes/QuizRunner.tsx`
- [ ] `apps/web/src/components/quizzes/QuizResultCard.tsx`
- [ ] `apps/web/src/app/(dashboard)/quizzes/page.tsx`
- [ ] `apps/web/src/app/(dashboard)/quizzes/[type]/page.tsx`

---

## 6. Acceptance Criteria & Verification Plan

1. **Type Checking:**
   ```bash
   npm run typecheck --workspaces
   ```
   *Pass criteria:* Clean compilation across all workspaces.
2. **Seed & API Test:**
   ```bash
   npm test --workspace=@alongside/api
   ```
   *Pass criteria:* Vitest verifies quiz attempt calculations and scoring persistence.
3. **Interactive UI Verification:**
   *Pass criteria:* Completing the "Do You Speak Tween?" quiz displays correct slang explanations and summary score.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Joint (FE & BE).
- Backend Agent edits `apps/api/` and `packages/database/`.
- Frontend Agent edits `apps/web/`.
- Neither agent may cross their respective directory boundary.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All 4 quizzes seeded and operational.
- [ ] Multi-dimensional scoring algorithms verified.
- [ ] Interactive UI delivers instant educational feedback.
- [ ] `npm run typecheck` exits with code 0.
- [ ] Commits adhere to Conventional Commits (`feat(quiz): ...`).
