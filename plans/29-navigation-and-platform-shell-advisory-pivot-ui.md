# Plan 29: Navigation & Platform Shell Advisory Pivot UI
**Plan ID:** `PLAN-29`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-25, PLAN-27, PLAN-28  
**Estimated Scope:** Medium  
**Paperclip Issue:** SOU-65  

---

## 1. Objective & Business Value
In AlongSide v2.5.0, the platform executes a strategic pivot from a fragmented collection of 6-7 domain utility tabs to an authoritative **Parent Advisory & Child Intelligence Platform**. This plan updates the primary application navigation shell in `apps/web/src/components/shared/Header.tsx` and `apps/web/src/components/shared/MobileNav.tsx`. 

It establishes a serene, focused 4-tab primary navigation structure:
`[ Home | Parent Intelligence Academy | Sunday Youth Culture Digest | Family Pacts & Devices ]`

It retires disjointed standalone tabs (`/health`, `/nutrition`, `/behavior`, `/brain-games`) from the top-level header while preserving clean route redirects to their corresponding Academy categories (`/academy?category=...`), eliminating visual clutter and cognitive fatigue.

---

## 2. Inputs & Architectural References
- **Advisory Platform Specification:** [`docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md`](../docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md)
- **Canonical Scope:** [`docs/PROJECT_SCOPE.md`](../docs/PROJECT_SCOPE.md)
- **Navigation & Decluttering Spec:** [`docs/streamlined-navigation-and-tab-decluttering-spec.md`](../docs/streamlined-navigation-and-tab-decluttering-spec.md)
- **Frontend Skill Matrix & Boundaries:** [`docs/frontend-skill-matrix.md`](../docs/frontend-skill-matrix.md), [`.agents/rules/05-frontend-skill-matrix.md`](../.agents/rules/05-frontend-skill-matrix.md)
- **Git Commit Standards:** [`docs/git-commit-standards.md`](../docs/git-commit-standards.md)

---

## 3. Preconditions & Dependency Verification
- Verify that `Header.tsx` is currently mounting `AUTHENTICATED_CORE_LINKS`.
- Verify that the omnipresent `FloatingAdvisorBubble.tsx` is mounted and operational across all dashboard routes.
- Verify that user account dropdown governance from PLAN-25 is strictly preserved (scoped to credentials, settings, billing, and hardened logout).

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Update Navigation Constants in `Header.tsx`
1. In `apps/web/src/components/shared/Header.tsx`, update `AUTHENTICATED_CORE_LINKS` to exactly 4 destinations:
   ```typescript
   export const AUTHENTICATED_CORE_LINKS: NavLinkItem[] = [
     { href: '/dashboard', label: 'Home' },
     { href: '/academy', label: 'Parent Academy', icon: BookOpen },
     { href: '/digest', label: 'Culture Digest', icon: Sparkles },
     { href: '/devices', label: 'Family Pacts & Devices', icon: Shield },
   ];
   ```
2. Deprecate and remove redundant `AUTHENTICATED_SECONDARY_LINKS` that previously hid Academy and Culture Digest in obscure secondary menus.
3. Ensure active tab styling properly highlights `/academy` and `/digest` when user is viewing sub-routes (e.g. `/academy/[slug]`, `/academy/[slug]/[lessonSlug]`).

### Task 2: Synchronize Mobile Navigation Drawer (`MobileNav.tsx`)
1. In `apps/web/src/components/shared/MobileNav.tsx`, align mobile drawer links with the updated 4 primary destinations.
2. Group secondary resources (Settings, Billing, Support) into a clean bottom drawer tray.
3. Maintain minimum 44×44px touch targets for all mobile drawer touchable elements.

### Task 3: Seamless Fallback Redirection for Retired Tabs
1. Update route handlers or page roots in:
   - `apps/web/src/app/(dashboard)/health/page.tsx`
   - `apps/web/src/app/(dashboard)/nutrition/page.tsx`
   - `apps/web/src/app/(dashboard)/behavior/page.tsx`
   - `apps/web/src/app/(dashboard)/brain-games/page.tsx`
2. Add a prominent advisory banner linking directly to the corresponding Academy Category:
   - "This domain has been elevated into the Parent Intelligence Academy with prioritized chapters and actionable scripts. [Explore Health & Sleep Courses →]"
   - Or automatically redirect to `/academy?category=HEALTH_AND_WELLNESS`, etc., ensuring zero 404s or broken bookmarks.
3. Completely purge the deprecated antipyretic dosing calculator and raw weight calculation inputs from the UI.

### Task 4: Automated Verification & Unit Tests
1. Update existing navigation test suites (`apps/web/test/navigationDeclutter.test.ts` or new `apps/web/test/advisoryNavigationPivot.test.ts`).
2. Assert that `AUTHENTICATED_CORE_LINKS` contains exactly 4 elements: Home, Parent Academy, Culture Digest, and Family Pacts.
3. Assert that `/health`, `/nutrition`, `/behavior`, and `/brain-games` are NOT present in the top-level navigation array.

---

## 5. Specific Deliverables (Files to Create / Modify)
- [ ] `apps/web/src/components/shared/Header.tsx` (Update core links and active states)
- [ ] `apps/web/src/components/shared/MobileNav.tsx` (Align mobile navigation with 4-tab shell)
- [ ] `apps/web/src/app/(dashboard)/health/page.tsx` (Purge antipyretic calculator, add Academy Category banner/redirect)
- [ ] `apps/web/test/advisoryNavigationPivot.test.ts` (Automated Vitest test suite for 4-tab navbar)

---

## 6. Acceptance Criteria & Verification Plan
- [ ] Top navigation displays exactly 4 tabs on desktop: Home, Parent Academy, Culture Digest, Family Pacts & Devices.
- [ ] Academy and Culture Digest are directly accessible with one click from anywhere in the application.
- [ ] Antipyretic dosing calculator is completely absent from the user interface.
- [ ] Active child selector remains accessible next to the logo.
- [ ] Floating AI Advisor bubble remains accessible on all screens.
- [ ] `npm run typecheck` and `npm run test` exit with code 0 across the entire workspace.

---

## 7. Role Boundaries & Prohibitions
- ❌ **DO NOT** modify backend Fastify route handlers or database schema files (Backend Agent domain).
- ❌ **DO NOT** break user account dropdown scoping (keep settings and logout separate from domain links).
- ❌ **DO NOT** mark page root components `'use client'`; keep page roots as React Server Components (RSC).

---

## 8. Definition of Done (DoD) Sign-Off Checklist
- [ ] All tasks completed and verified with tests.
- [ ] Code follows `docs/naming-conventions.md` and `docs/frontend-skill-matrix.md`.
- [ ] Working git diff passes `ponytail-review`.
- [ ] Atomic conventional commit created.
- [ ] Pull request submitted with plain text (`.txt`) description.
