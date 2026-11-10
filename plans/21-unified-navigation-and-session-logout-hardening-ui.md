# Plan 21: Unified Navigation Shell & Complete Session Logout Hardening UI
**Plan ID:** `PLAN-21`  
**Assignee:** Frontend Agent (with Fastify Session Alignment)  
**Dependencies:** PLAN-03, PLAN-17  
**Estimated Scope:** Medium  
**Paperclip Issue:** SOU-48 (To be delegated)  
**Status:** Queued  

---

## 1. Objective & Business Value

Eliminate the confusing dual-navbar stacking in `apps/web/` and resolve the session logout failure reported by users. 

Currently:
1. When authenticated, parents see two stacked navigation bars on desktop: `<Header />` (sticky at `top-0`) and `<DashboardNav />` (sticky at `top-16`), which both render the exact same 7 domain destinations (`Today`, `Health`, `Nutrition`, `Play`, `Behavior`, `AI Advisor`, `Devices`). This wastes screen real estate and confuses users.
2. Clicking "Log out" does not navigate away, does not purge client-side React Query cache, and does not reset Zustand child context stores, leaving parents stranded on protected pages with broken states.

This plan consolidates navigation into a single, cohesive, high-leverage Top Application Bar for authenticated users, streamlines mobile navigation, and hardens the complete session logout lifecycle so parents can log out cleanly with 100% data eviction and instant redirection to `/login`.

---

## 2. Inputs & Architectural References

- **Holistic Redesign & Navigation Spec:** [`docs/holistic-redesign-and-navigation-spec.md`](../docs/holistic-redesign-and-navigation-spec.md)
- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md)
- **Codebase Design Specification:** [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md) (Seam 10: Frontend Multi-Child State & Offline Sync)
- **Frontend Autonomous Skill Matrix:** [`docs/engineering-standards/frontend-skill-matrix.md`](../docs/engineering-standards/frontend-skill-matrix.md)
- **Existing Implementation Files:**
  * `apps/web/src/components/shared/Header.tsx`
  * `apps/web/src/components/shared/DashboardNav.tsx`
  * `apps/web/src/components/shared/MobileNav.tsx`
  * `apps/web/src/app/(dashboard)/layout.tsx`
  * `apps/web/src/hooks/useAuth.ts`
  * `apps/web/src/stores/useChildContextStore.ts`
  * `apps/api/src/plugins/auth.plugin.ts`

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-03` (Frontend scaffold) and `PLAN-17` (Dashboard navigation) merged.
- **Verification:** Run `npm run typecheck --workspace=@alongside/web` to confirm zero baseline TypeScript errors.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Consolidate Authenticated Header Navigation (`apps/web/src/components/shared/Header.tsx`)
1. Refactor `Header.tsx` to serve as the single, authoritative application bar for both public and authenticated states:
   - **Authenticated State:**
     * Render AlongSide logo linking directly to `/dashboard`.
     * Embed `<ChildSelector variant="header" />` prominently next to the brand logo, displaying the active child's name, age, avatar initials, and quick tier badge.
     * Render the 6 desktop domain hub navigation links with active state pill styling (`bg-teal-50 text-teal-800 border-b-2 border-teal-600`):
       1. `Today` (`/dashboard`)
       2. `Health` (`/health`)
       3. `Nutrition` (`/nutrition`)
       4. `Play` (`/brain-games`)
       5. `Behavior` (`/behavior`)
       6. `Devices & Pacts` (`/devices`)
     * Move secondary links (`Parent Intelligence Academy` at `/academy` and `Sunday Culture Digest` at `/digest`) into a sleek "More" dropdown or User Menu.
     * Implement an accessible User Avatar & Account Menu:
       - Displays parent's full name and email.
       - Quick links to `Account Settings`, `Academy`, `Sunday Digest`, and `Billing / Hero Pass`.
       - Prominent **"Log out"** button with loading spinner and logout icon.
   - **Public State:**
     * Retain clean landing page navigation: `Lifespan Pillars`, `Pediatric Health`, `Modern Devices & Pacts`, `Pricing`.
     * Actions: `Log in` (Ghost button) and `Start 7-Day Free Trial` (Primary CTA).

### Task 2: Remove Redundant Dashboard Navbar (`apps/web/src/app/(dashboard)/layout.tsx`)
1. Edit `apps/web/src/app/(dashboard)/layout.tsx`:
   - Remove `<DashboardNav />` from the layout hierarchy.
   - Keep `<main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex-1">` directly under the root `<Header />`.
   - Keep `<MobileNav />` at the bottom for viewports under `md`.
2. Clean up or deprecate `apps/web/src/components/shared/DashboardNav.tsx`:
   - Mark as deprecated or repurpose into domain sub-view breadcrumbs if needed, ensuring it is never mounted directly underneath `<Header />`.

### Task 3: Streamline Mobile Navigation Bar (`apps/web/src/components/shared/MobileNav.tsx`)
1. Update `MobileNav.tsx` to provide 5 thumb-friendly actions:
   - `Today` (`/dashboard` - Compass icon)
   - `Health` (`/health` - HeartPulse icon)
   - `Play` (`/brain-games` - Puzzle icon)
   - `Devices` (`/devices` - Smartphone icon)
   - `More` (Menu icon) — opens a slide-up drawer containing `Nutrition`, `Behavior`, `Academy`, `Sunday Digest`, `Child Switcher`, and `Log out`.
2. Ensure touch target heights are strictly ≥ 48px conforming to WCAG 2.1 AA and `ui-ux-pro-max`.

### Task 4: Fix Complete Session Logout Lifecycle (`apps/web/src/hooks/useAuth.ts` & `Header.tsx`)
1. Enhance `useChildContextStore.ts`:
   - Add a `reset()` action that clears `children: []`, `activeChildId: null`, and removes `alongside_active_child_id` from `localStorage`.
2. Update `useAuth.ts`:
   - In `logoutMutation.onSuccess`:
     * Execute `queryClient.clear()` to purge all cached child queries, health logs, nutrition data, and agreements.
     * Call `useChildContextStore.getState().reset()` to flush in-memory child profiles.
     * Clear any auth tokens or session metadata from `localStorage` / `sessionStorage`.
3. In `Header.tsx` (and `MobileNav.tsx` drawer):
   - Enhance `handleLogout`:
     ```typescript
     const handleLogout = async () => {
       try {
         await logout();
       } finally {
         window.location.href = '/login?logged_out=true';
       }
     };
     ```
   - Using `window.location.href` guarantees a clean, unpoisoned browser context reload, completely evicting any stale memory states and redirecting straight to the login page.
4. Verify Fastify cookie options in `apps/api/src/plugins/auth.plugin.ts`:
   - Ensure `clearSessionCookie` sets `path: '/'`, `sameSite: 'lax'`, and matching domain so browser cookies are reliably evicted even in cross-port localhost development.

---

## 5. Specific Deliverables (Files to Create / Modify)

### `apps/web`:
- [ ] `apps/web/src/components/shared/Header.tsx` (Single unified app bar, active child switcher, user dropdown, hardened logout)
- [ ] `apps/web/src/app/(dashboard)/layout.tsx` (Remove duplicate `<DashboardNav />`)
- [ ] `apps/web/src/components/shared/MobileNav.tsx` (Streamlined 5-tab mobile bar + 'More' sheet)
- [ ] `apps/web/src/hooks/useAuth.ts` (Full queryClient eviction and store reset on logout)
- [ ] `apps/web/src/stores/useChildContextStore.ts` (Add `reset()` store action)
- [ ] `apps/web/src/app/(auth)/login/page.tsx` (Optional: display friendly banner when `?logged_out=true` is present)

### `apps/api`:
- [ ] `apps/api/src/plugins/auth.plugin.ts` (Ensure cookie clearance parameters match development and production environments)

---

## 6. Definition of Done (DoD) & Verification Checklist

- [ ] Desktop dashboard shows exactly **one** top navigation bar; `<DashboardNav />` duplicate is completely gone.
- [ ] All 6 core domain links (`Today`, `Health`, `Nutrition`, `Play`, `Behavior`, `Devices`) navigate correctly with active state indicators.
- [ ] Active child selector is cleanly visible and functional in the unified header.
- [ ] Clicking "Log out" immediately calls the logout API, clears TanStack Query cache, resets Zustand store, and navigates to `/login`.
- [ ] Mobile navigation bar renders at bottom of viewport without obscuring content or overlapping the floating advisor bubble.
- [ ] `npm run typecheck` exits with code 0 across the monorepo.
- [ ] Diff audited with `ponytail-review` against over-engineering and speculative bloat.
