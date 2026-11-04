# Plan 25: Streamlined Navigation & Account Menu Decluttering UI
**Plan ID:** `PLAN-25`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-21, PLAN-23, PLAN-24  
**Estimated Scope:** Medium  
**Paperclip Issue:** SOU-58 (or assigned)  

---

## 1. Objective & Business Value

Following CEO feedback in task **SOU-57**, this plan streamlines AlongSide's primary navigation shell and purges severe redundancy across the authenticated user interface.

Currently:
1. The primary dashboard is labeled **"Today"**, confusing parents who expect a central **"Home"** overview of their child's development.
2. The authenticated header renders 6 tabs plus a clumsy **"More"** dropdown (Parent Academy & Sunday Culture Digest), cluttering the desktop header.
3. The User Account Dropdown renders 4 redundant domain links (`Family Dashboard`, `Parent Academy`, `Sunday Culture Digest`, `24/7 AI Child Advisor`), conflating application navigation with account governance.
4. The Home feed (`HolisticHomeFeed.tsx`) ends with a redundant "Family OS Domain Hubs" card that repeats links already visible in the top navigation bar.

This plan renames "Today" to **"Home"**, establishes a clean, balanced 6-tab primary navigation bar (`Home | Health | Nutrition | Play | Behavior | Devices`), cleans up the User Profile Dropdown to focus strictly on account management, and removes duplicate link cards from the Home feed.

---

## 2. Inputs & Architectural References

- **Streamlined Navigation Spec:** [`docs/streamlined-navigation-and-tab-decluttering-spec.md`](../docs/streamlined-navigation-and-tab-decluttering-spec.md)
- **Canonical Product Scope:** [`docs/PROJECT_SCOPE.md`](../docs/PROJECT_SCOPE.md)
- **System Architecture:** [`docs/system-architecture.md`](../docs/system-architecture.md)
- **Code Quality & Testing Principles:** [`docs/code-quality-principles.md`](../docs/code-quality-principles.md)
- **Git Commit Standards:** [`docs/git-commit-standards.md`](../docs/git-commit-standards.md)

---

## 3. Preconditions & Dependency Verification

- Plan 21 (Unified Navigation Shell) and Plan 24 (Account Settings & Child Modal Hardening) are complete and operational in `apps/web/`.
- `apps/web/src/components/shared/Header.tsx`, `MobileNav.tsx`, and `apps/web/src/components/dashboard/HolisticHomeFeed.tsx` exist and are tested.
- `npm run typecheck` exits with code 0 across the monorepo.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Rename "Today" to "Home" in Navigation & Page Titles
1. In `apps/web/src/components/shared/Header.tsx`:
   - Update `AUTHENTICATED_CORE_LINKS`:
     ```typescript
     export const AUTHENTICATED_CORE_LINKS: NavLinkItem[] = [
       { href: '/dashboard', label: 'Home' },
       { href: '/health', label: 'Health' },
       { href: '/nutrition', label: 'Nutrition' },
       { href: '/brain-games', label: 'Play' },
       { href: '/behavior', label: 'Behavior' },
       { href: '/devices', label: 'Devices' },
     ];
     ```
2. In `apps/web/src/components/shared/MobileNav.tsx`:
   - Update the first navigation action label from `'Today'` to `'Home'`.
3. In `apps/web/src/app/(dashboard)/dashboard/page.tsx`:
   - Update page metadata title:
     ```typescript
     export const metadata: Metadata = {
       title: 'Home • AlongSide Family Operating System',
       description:
         'Daily developmental milestones, purposeful brain play, pediatric health triage, and personalized nutrition for your family.',
     };
     ```

### Task 2: Clean Up the User Account Dropdown
1. In `apps/web/src/components/shared/Header.tsx`, locate the user dropdown menu (`userMenuOpen && ...`):
   - **Remove** the redundant quick navigation links:
     - ❌ `Family Dashboard` (`/dashboard`)
     - ❌ `Parent Academy` (`/academy`)
     - ❌ `Sunday Culture Digest` (`/digest`)
     - ❌ `24/7 AI Child Advisor` (`/advisor`)
   - **Retain and polish** account-specific items:
     - User Identity Card: Initials, Full Name, Email, and Subscription Status badge (`Parent Calm Account` / `Hero Pass`).
     - `Account Settings` (`/settings`) with `Settings` icon.
     - `Billing & Hero Pass` (`/#pricing` or billing management) with `CreditCard` icon.
     - `Help & Clinical Guidance` (link to `/advisor` or support trigger) with `HelpCircle` icon.
     - Hardened session `Log out` button with loading state.

### Task 3: Streamline Desktop Navigation & Eliminate Clumsy "More" Dropdown
1. In `apps/web/src/components/shared/Header.tsx`:
   - Remove the `moreMenuRef` dropdown from the primary desktop navigation bar.
   - The primary navigation bar now cleanly displays the 6 core tabs:
     `Home` • `Health` • `Nutrition` • `Play` • `Behavior` • `Devices`
   - Culture Digest features are integrated directly inside Devices (`/devices?tab=digest`), and Academy features are accessible via dedicated links or the Home briefing.
2. In `apps/web/src/components/shared/MobileNav.tsx`:
   - Keep the 5 thumb-friendly mobile tabs: `Home`, `Health`, `Play`, `Devices`, and `More` (which triggers the slide-up secondary drawer with Behavior, Academy, Settings).

### Task 4: Purge Redundant "Family OS Domain Hubs" Card from Home Feed
1. In `apps/web/src/components/dashboard/HolisticHomeFeed.tsx`:
   - Delete the bottom `<Card>` component in the right column (`Family OS Domain Hubs`, lines 96–188) that repeats links to Academy, Devices, Nutrition, and Brain Games.
   - Replace with a serene, focused widget or let the right column cleanly conclude with the `DailyNutritionTipCard` and `AskAdvisorPromptBar`.
   - This eliminates cognitive clutter and makes the Home feed clean and focused.

### Task 5: Automated Test Suite Verification
1. Create or update `apps/web/test/navigationDecluttering.test.ts`:
   - Assert `AUTHENTICATED_CORE_LINKS` contains `'Home'` at `/dashboard`.
   - Assert `AUTHENTICATED_CORE_LINKS` does not exceed 6 canonical items.
   - Assert user account menu does NOT render links to `/dashboard`, `/academy`, or `/digest`.
   - Assert user account menu correctly contains `/settings` and logout.
   - Assert `npm run typecheck` and `vitest` pass with 100% success.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `apps/web/src/components/shared/Header.tsx`: Updated links, "Home" rename, cleaned user dropdown, streamlined nav.
- [ ] `apps/web/src/components/shared/MobileNav.tsx`: Updated "Home" label and streamlined mobile actions.
- [ ] `apps/web/src/app/(dashboard)/dashboard/page.tsx`: Updated page title and metadata to "Home".
- [ ] `apps/web/src/components/dashboard/HolisticHomeFeed.tsx`: Removed redundant Domain Hubs link card.
- [ ] `apps/web/test/navigationDecluttering.test.ts`: Automated test suite for streamlined navigation.

---

## 6. Acceptance Criteria & Verification Plan

1. **Naming Verification:** Navigating to `/dashboard` displays "Home" highlighted in the top navbar and "Home • AlongSide" in the browser tab.
2. **User Dropdown Hygiene:** Clicking the parent avatar reveals strictly user identity, Account Settings, Billing, and Logout. Zero duplicate links to dashboard, academy, or digest.
3. **No Header Overcrowding:** The top desktop navbar contains exactly 6 clean tabs with zero line-wrapping or awkward "More" dropdowns.
4. **Home Feed Calm:** The Home feed no longer renders the redundant "Family OS Domain Hubs" card at the bottom of the right column.
5. **Testing Verification:**
   ```bash
   npm run typecheck
   npm run test apps/web/test/navigationDecluttering.test.ts
   ```

---

## 7. Role Boundaries & Prohibitions

- **Assigned Agent:** `Frontend Agent` (UI, components, tests).
- ❌ **DO NOT** edit backend files (`apps/api/**`, `packages/database/**`).
- ❌ **DO NOT** introduce external UI packages.
- ❌ **DO NOT** break existing child switching or logout workflows.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] `npm run typecheck` exits with code 0 across the monorepo.
- [ ] `vitest` unit tests pass with 100% success.
- [ ] PR description written in plain text (`.txt`) adhering to Conventional Commits.
- [ ] Ponytail audit completed: smallest complete change, no speculative bloat.
