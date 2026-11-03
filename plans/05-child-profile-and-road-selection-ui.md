# Plan 05: Child Onboarding, Road Selection & Assessment Wizard UI
**Plan ID:** `PLAN-05`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-03, PLAN-04  
**Estimated Scope:** Medium  

---

## 1. Objective & Business Value

Implement the child onboarding experience in `apps/web/` featuring the contextual road fork: dynamically steering the parent into **Road 1 (Pre-Device Preparation)** or **Road 2 (Active-Device Governance)**. Build the 10-dimension First-Phone Readiness Assessment wizard, displaying the 0–100 maturity score and a personalized action roadmap.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 4: The Two Contextual Roads)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Client Layer)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 3: Children, Section 4: Quizzes)
- **Shared Validation Schemas:** `packages/shared/src/schemas/child.ts`, `quiz.ts`
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-03` (Frontend scaffold) and `PLAN-04` (Children & readiness backend API) completed.
- **Verification:** Assert `apps/web/src/hooks/useAuth.ts` is functional and backend routes `/api/v1/children` are documented.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Child Onboarding & Road Selection Flow
1. Implement `apps/web/src/app/(dashboard)/children/new/page.tsx`:
   - Step 1: Child Basic Info (Name, Birth Year, Birth Month, Grade).
   - Step 2: Contextual Road Selection (Visual card toggle between "No Personal Smartphone Yet - Preparing" vs. "Already Has Smartphone - Managing").
   - Connect to `CreateChildSchema` using React Hook Form.
2. Implement child query hook in `apps/web/src/hooks/useChildren.ts` using TanStack Query.

### Task 2: First-Phone Readiness Assessment Wizard (Road 1)
1. Implement Zustand assessment store in `apps/web/src/stores/useReadinessStore.ts` tracking 10 question responses and current step.
2. Build interactive wizard component in `apps/web/src/components/quizzes/ReadinessWizard.tsx`:
   - Visual progress bar.
   - Empathetic Likert-scale / multiple-choice cards.
   - Clean transitions between questions.
3. Implement Assessment Result Card displaying:
   - Overall Score (Radial gauge / animated bar 0–100).
   - Dimension breakdown (Executive Function, Emotional Maturity, Boundary Compliance).
   - Recommended next step: "Build Day 1 Pre-Unboxing Charter" or "Bridge Device Step-Ladder".

### Task 3: Contextual Parent Dashboard View
1. Implement `apps/web/src/app/(dashboard)/dashboard/page.tsx`:
   - Dynamically renders Road 1 Hero card (Readiness score, Bridge device guides) OR Road 2 Hero card (Bedtime lockout status, Curfew countdown, Active digital reset treaty).
   - Child profile switcher tabs for multi-child families.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `apps/web/src/stores/useReadinessStore.ts`
- [ ] `apps/web/src/hooks/useChildren.ts`
- [ ] `apps/web/src/components/children/ChildOnboardingModal.tsx`
- [ ] `apps/web/src/components/quizzes/ReadinessWizard.tsx`
- [ ] `apps/web/src/components/quizzes/ReadinessScoreCard.tsx`
- [ ] `apps/web/src/app/(dashboard)/children/new/page.tsx`
- [ ] `apps/web/src/app/(dashboard)/children/[id]/readiness/page.tsx`
- [ ] `apps/web/src/app/(dashboard)/dashboard/page.tsx`

---

## 6. Acceptance Criteria & Verification Plan

1. **Frontend Type Check:**
   ```bash
   npm run typecheck --workspace=@alongside/web
   ```
   *Pass criteria:* Zero TypeScript compile errors.
2. **Component Rendering & State Verification:**
   *Pass criteria:* Selecting `PRE_DEVICE` prompts the Readiness Assessment; selecting `ACTIVE_DEVICE` redirects to the Active Treaty dashboard.
3. **Responsive Mobile Check:**
   *Pass criteria:* Readiness wizard controls and slider elements function flawlessly on mobile viewport (375px width).

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Frontend Agent.
- ❌ **DO NOT** edit backend files in `apps/api/` or database schemas in `packages/database/`.
- ❌ **DO NOT** implement backend route handlers.
- ✅ Work exclusively inside `apps/web/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] Child road fork visually clear and intuitive.
- [ ] Readiness assessment displays multi-dimensional score.
- [ ] `npm run typecheck` exits with code 0.
- [ ] Commits adhere to Conventional Commits (`feat(web): ...`).
