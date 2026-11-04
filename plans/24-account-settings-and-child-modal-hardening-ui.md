# Plan 24: Account Settings & Family Management + Child Onboarding Modal Hardening UI
**Plan ID:** `PLAN-24`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-03, PLAN-05, PLAN-21, PLAN-22, PLAN-23  
**Estimated Scope:** Medium  
**Paperclip Issue:** SOU-56 (Subtask of SOU-50)  
**Status:** Complete (PR #36, Pending Human Merge)  

---

## 1. Objective & Business Value

Address two critical usability and functional gaps reported in Paperclip issue SOU-50:
1. **Missing Account Settings Page (`/settings`):**
   Currently, the Top Application Bar (`Header.tsx`) and mobile drawer point to `/#settings` (a dead anchor link). Parents have no dedicated surface to view or update their guardian profile, manage family children profiles, view subscription/trial status (as promised on the landing page and FAQs: "Cancel anytime with 1-click in account settings"), configure safety/email notification preferences (Sunday Youth Culture Digest, pediatric triage alerts), or manage security and session credentials.
2. **Broken "Add Another Child Profile" Modal Window (`ChildOnboardingModal.tsx`):**
   When parents click "Add Child Profile" or "Add Another Child Profile" from the child selector, dashboard banner, or devices view:
   - **Close Button Text Collision:** In `DialogContent` (`apps/web/src/components/ui/Dialog.tsx`), the close button (`X`) is positioned `absolute right-4 top-4`. In `ChildOnboardingFlow.tsx`, the card header places "Parent Calm Onboarding" at top right, causing ugly text and icon overlap.
   - **Disappearing Close Button on Scroll:** Because `overflow-y-auto` is set on the container that holds the absolute close button, scrolling down causes the close button to scroll out of view.
   - **Card-in-Dialog Double Border Slop:** `ChildOnboardingFlow` renders a full `<Card>` with its own borders, margins, and shadows inside `DialogContent`, causing awkward double-borders and misaligned paddings.
   - **Infants & Toddlers Missing (0–6 years old):** `ChildOnboardingFlow.tsx` hardcodes `YEARS = Array.from({ length: 18 }, (_, i) => currentYear - 7 - i) // Ages ~7 to 24`. In AlongSide v2.4.0 (the 0–18 Lifespan Family OS), birth years 2020–2026 are completely absent. Parents of infants, toddlers, and early elementary kids cannot select their child's birth year.
   - **Missing Lifespan Tiers:** `getTierDisplay(tier)` lacks display metadata for early childhood tiers (`TIER_0_INFANCY_TODDLER_0_3`, `TIER_1_EARLY_CHILDHOOD_4_6`), falling back to generic placeholder labels.

This plan delivers a dedicated, responsive **Account Settings & Family Management Hub** at `/settings` and hardens the **Child Onboarding Modal** with fixed header/footer geometry, full 0–18 age support, and clean state synchronization.

---

## 2. Inputs & Architectural References

- **Project Scope:** [`docs/PROJECT_SCOPE.md`](../docs/PROJECT_SCOPE.md)
- **Unified Navigation & Session Spec:** [`docs/holistic-redesign-and-navigation-spec.md`](../docs/holistic-redesign-and-navigation-spec.md)
- **Child Lifespan & Tiers Engine:** [`packages/shared/src/algorithms/childTier.ts`](../packages/shared/src/algorithms/childTier.ts)
- **Company Engineering Standard (The Ponytail Principle):** Minimal working surface area, zero unnecessary dependencies, deletion beats addition.

---

## 3. Preconditions & Dependency Verification

- `main` branch is up to date with Plan 21, Plan 22, and Plan 23 merged.
- Monorepo typecheck and all 357 unit tests pass cleanly.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Fix & Harden Child Onboarding Modal & Age Engine (`apps/web/src/components/children/`)
1. **Expand Age & Birth Year Range in `ChildOnboardingFlow.tsx`:**
   - Update `YEARS` to include birth years from `currentYear` (infant / age 0) down to `currentYear - 18` (age 18).
   - Set default birth year to `currentYear - 8` (middle childhood baseline).
2. **Full Lifespan Tier Display in `ChildOnboardingFlow.tsx`:**
   - Support all 6 canonical tiers:
     - `TIER_0_INFANCY_TODDLER_0_3`: "Infancy & Toddler (0–3)" • First Words, Motor, BLW, Teething
     - `TIER_1_EARLY_CHILDHOOD_4_6`: "Early Childhood (4–6)" • Preschool, Social-Emotional, Play
     - `TIER_2_MIDDLE_CHILDHOOD_7_9`: "Middle Childhood (7–9)" • Elementary Curiosity & Focus
     - `TIER_3_PRE_TEEN_10_12` / `TIER_2_AGES_10_11`: "Pre-Teen (10–12)" • Tween Shift & Device Readiness
     - `TIER_4_EARLY_ADOLESCENCE_13_15` / `TIER_3_AGES_12_13`: "Early Adolescence (13–15)" • Pubertal Transition & Curfew Lockout
     - `TIER_5_LATE_ADOLESCENCE_16_18` / `TIER_4_AGES_14_PLUS`: "Late Adolescence (16–18)" • Executive Autonomy & Self-Regulation
3. **Modal Layout Hardening (`ChildOnboardingModal.tsx` & `ChildOnboardingFlow.tsx`):**
   - Add `isModal?: boolean` prop to `ChildOnboardingFlow`.
   - When rendered inside `ChildOnboardingModal`:
     * Eliminate outer `<Card>` border, margin, and shadow.
     * Render fixed modal header with title, step progress pill, and a cleanly spaced close button that NEVER collides with header text.
     * Render scrollable body with comfortable padding (`px-6 py-5 max-h-[calc(85vh-140px)] overflow-y-auto`).
     * Render sticky footer with Back / Continue / Cancel / Submit buttons.
   - When child creation succeeds in modal mode:
     * Display a clean confirmation card with child avatar, name, and road badge.
     * Provide two clear actions: "Go to Dashboard (Active Profile)" and "Done & Close".
     * Automatically update `useChildContextStore` and select the newly created child as active.

### Task 2: Build Account Settings Page (`apps/web/src/app/(dashboard)/settings/page.tsx`)
1. Create React Server Component at `apps/web/src/app/(dashboard)/settings/page.tsx` with metadata: "Account & Family Settings • AlongSide".
2. Build interactive client view at `apps/web/src/components/settings/AccountSettingsView.tsx`:
   - **Parent Profile Card:**
     * Displays guardian avatar, full name, email, account role, and member since timestamp.
     * Profile update form with save feedback.
   - **Family Children Profiles Card:**
     * Lists all registered children in the family with initials, age, developmental horizon, road badge (Road 1: Pre-Device vs. Road 2: Active-Device).
     * "+ Add Another Child Profile" button opening `ChildOnboardingModal`.
     * Direct links to view child diagnostic readiness or agreements.
   - **Subscription & Billing Card ("Annual Hero Pass"):**
     * Current tier status (7-Day Risk-Free Trial or Annual Hero Pass).
     * Trial countdown banner (e.g., "Active 7-Day Risk-Free Trial • 6 days remaining").
     * Feature summary checklist (All 5 Lifespan Pillars, 24/7 AI Child Advisor, Bilateral Pacts).
     * 1-Click Cancel Trial / Manage Plan action with confirmation dialog.
   - **Family Notification & Safety Preferences:**
     * Toggles for Weekly Sunday Youth Culture Digest, Pediatric Health Alerts, and Bedtime Curfew Tamper SMS/Email.
   - **Security & Session Card:**
     * Change Password section with input validation.
     * Active device session indicators.
     * Log Out button wired to `useAuth.logout()`.
     * Danger Zone with account deletion confirmation dialog.

### Task 3: Unify Global Navigation Links (`Header.tsx` & `MobileNav.tsx`)
1. In `apps/web/src/components/shared/Header.tsx`:
   - Update line 414: change `href="/#settings"` to `href="/settings"`.
2. In `apps/web/src/components/shared/MobileNav.tsx`:
   - In the "More" drawer, add an explicit "Account & Family Settings" navigation row linking to `/settings`.

### Task 4: Automated Verification & Unit Tests
1. Add `apps/web/test/accountSettings.test.ts` verifying:
   - Rendering of Account Settings sections (Profile, Children, Subscription, Notifications, Security).
   - Display of registered children profiles and "+ Add Child Profile" trigger.
2. Add `apps/web/test/childOnboardingModal.test.ts` verifying:
   - Birth year options cover newborn / infant (age 0) up to age 18.
   - Modal renders without close-button collision.
   - Successful submission fires `onSuccess` and updates active child.
3. Verify monorepo type safety (`npm run typecheck`) and tests (`npm test`).

---

## 5. Specific Deliverables (Files to Create / Modify)

### `apps/web`:
- [ ] `apps/web/src/app/(dashboard)/settings/page.tsx` (New Account Settings route)
- [ ] `apps/web/src/components/settings/AccountSettingsView.tsx` (Complete settings management view)
- [ ] `apps/web/src/components/children/ChildOnboardingFlow.tsx` (Lifespan age range 0-18, tier display, modal mode)
- [ ] `apps/web/src/components/children/ChildOnboardingModal.tsx` (Hardened modal dialog shell)
- [ ] `apps/web/src/components/shared/Header.tsx` (Link to `/settings`)
- [ ] `apps/web/src/components/shared/MobileNav.tsx` (Link to `/settings` in More drawer)
- [ ] `apps/web/test/accountSettings.test.ts` (Automated unit tests)
- [ ] `apps/web/test/childOnboardingModal.test.ts` (Automated unit tests)

---

## 6. Definition of Done (DoD) & Verification Checklist

- [ ] Navigating to `/settings` renders the full Account & Family Settings page.
- [ ] User menu in `Header.tsx` links to `/settings` instead of dead anchor `/#settings`.
- [ ] Mobile navigation "More" drawer includes link to `/settings`.
- [ ] "Add Child Profile" modal allows selecting birth years from current year down to 18 years ago (Ages 0 to 18).
- [ ] Modal close button has clean clearance and never overlaps header text or scrolls away.
- [ ] No double-border or card-inside-dialog nesting glitches.
- [ ] Adding a child in modal mode immediately updates `useChildContextStore` and sets the child as active.
- [ ] `npm run typecheck` passes with zero errors monorepo-wide.
- [ ] All automated unit tests pass with 100% success.
- [ ] Diff audited with `ponytail-review` to ensure zero bloat.
