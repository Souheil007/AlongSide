# Plan 14: End-to-End Integration, Playwright Verification & Launch Hardening
**Plan ID:** `PLAN-14`  
**Assignee:** Joint (FE & BE)  
**Dependencies:** PLAN-07, PLAN-09, PLAN-11, PLAN-12, PLAN-13, PLAN-16, PLAN-17, PLAN-18, PLAN-19, PLAN-20  
**Estimated Scope:** Large  

---

## 1. Objective & Business Value

Execute complete end-to-end integration and launch hardening across the full AlongSide v2.4.0 Holistic Child Upbringing, Pediatric Health & Lifespan Family OS platform. Author comprehensive Playwright E2E suites verifying critical user journeys across all 7 balanced pillars (Pediatric Health Triage, Nutrition, Milestones, Brain Games, AI Advisor, and Modern World & Device Pacts), audit security headers and rate limits, configure GitHub Actions CI/CD pipelines, and guarantee zero regressions.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 6: Success Metrics & KPIs, Section 7: Phased Roadmap)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (All sections)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md)
- **Code Quality & Testing Principles:** [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** All previous plans (`PLAN-01` through `PLAN-13`) completed and verified against their respective DoD criteria.
- **Verification:** Fastify API server and Next.js PWA web app build and run without errors.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Playwright E2E Test Suite (Joint FE & BE)
1. Install `@playwright/test` and configure `playwright.config.ts` in root monorepo.
2. Implement Critical Journey 1: **Road 1 (Pre-Device Preparation)** in `tests/e2e/road1-pre-device.spec.ts`:
   - Parent registers account (7-day trial).
   - Adds 9-year-old child -> selects `PRE_DEVICE`.
   - Completes 10-dimension Readiness Assessment -> asserts radial gauge renders score.
   - Generates and views Pre-Unboxing Day 1 Charter.
3. Implement Critical Journey 2: **Road 2 (Active-Device Governance)** in `tests/e2e/road2-active-device.spec.ts`:
   - Parent adds 12-year-old child -> selects `ACTIVE_DEVICE`.
   - Opens Pact Wizard -> configures 8:30 PM bedtime curfew.
   - Signs canvas on parent and child sides.
   - Clicks "Deploy to Device" -> verifies enrollment QR code modal renders.
4. Implement Critical Journey 3: **24/7 AI Child Advisor & Quizzes** in `tests/e2e/ai-and-quizzes.spec.ts`:
   - Asks parenting question in chat -> verifies streaming text arrives and displays script callout.
   - Takes "Do You Speak Tween?" quiz -> verifies slang feedback cards.
5. Implement Critical Journey 4: **Lifespan Holistic Upbringing, Health Triage & Milestones** in `tests/e2e/holistic-lifespan-os.spec.ts`:
   - Switches child in `ChildSelector` to infant Mateo (14mo).
   - Verifies Today's Milestones render walking/speech benchmarks.
   - Executes 3-zone health triage for fever + ear pulling -> asserts Yellow Zone triage result and medication dosing.
   - Verifies Nutrition BLW guide and Allergen schedule checklist render accurately.
   - Views daily puppet game activity card.

### Task 2: Security & Production Hardening (Backend Agent)
1. Configure `@fastify/helmet` with strict Content Security Policy (CSP).
2. Configure `@fastify/rate-limit` on auth and AI endpoints (max 10 requests/min).
3. Validate CORS origins in `apps/api/src/plugins/cors.plugin.ts`.

### Task 3: CI/CD GitHub Actions Pipeline
1. Create `.github/workflows/ci.yml`:
   - Runs on push to `main` and pull requests.
   - Steps: Setup Node.js 22, npm ci, `npm run lint`, `npm run typecheck`, `npm test`, Playwright E2E test execution.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `playwright.config.ts`
- [ ] `tests/e2e/road1-pre-device.spec.ts`
- [ ] `tests/e2e/road2-active-device.spec.ts`
- [ ] `tests/e2e/ai-and-quizzes.spec.ts`
- [ ] `tests/e2e/holistic-lifespan-os.spec.ts`
- [ ] `apps/api/src/plugins/security.plugin.ts`
- [ ] `.github/workflows/ci.yml`

---

## 6. Acceptance Criteria & Verification Plan

1. **Global Type Checking & Linting:**
   ```bash
   npm run typecheck
   npm run lint
   ```
   *Pass criteria:* Zero TypeScript compile errors, zero linter warnings.
2. **Global Unit & Integration Tests:**
   ```bash
   npm test
   ```
   *Pass criteria:* 100% test pass rate across all packages and workspaces.
3. **Playwright E2E Verification:**
   ```bash
   npx playwright test
   ```
   *Pass criteria:* All end-to-end browser journeys pass with green checkmarks.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Joint (FE & BE).
- Backend Agent owns `apps/api/src/plugins/security.plugin.ts` and backend assertions.
- Frontend Agent owns Next.js production builds and client selectors in Playwright.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] Playwright E2E tests verify Road 1, Road 2, AI Chat, and Quizzes.
- [ ] GitHub Actions CI workflow configured.
- [ ] `npm run typecheck` exits with code 0.
- [ ] `npm test` passes with 100% success.
- [ ] All commits adhere to Conventional Commits (`feat(e2e): ...`).
