# Plan 09: Academy Course Player, Sunday Culture Digest & Offline PWA
**Plan ID:** `PLAN-09`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-03, PLAN-08  
**Estimated Scope:** Medium  

---

## 1. Objective & Business Value

Build the user-facing **Parent Intelligence Academy** course player and reader in `apps/web/`, featuring age-by-age neurodevelopmental modules and emotional language decoders. Implement the **Sunday Youth Culture Digest** feed (slang tags, exploit warnings, dinner conversation starters) and configure PWA service worker offline caching so parents can access crucial lessons and scripts anywhere, even without cell connectivity.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 3: Pillars 1 & 4)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Client Layer & PWA Offline Engine)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 5: Academy, Section 9: Digest)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-03` (Frontend scaffold) and `PLAN-08` (Academy & Digest backend API) completed.
- **Verification:** Assert `/api/v1/academy/modules` and `/api/v1/digest/latest` return seeded data.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Parent Intelligence Academy UI
1. Implement `apps/web/src/app/(dashboard)/academy/page.tsx`:
   - Developmental tier selector tabs (Ages 8–9, 10–11, 12–13, 14+), pre-selected to current active child.
   - Module grid with completion progress bars and estimated reading times.
2. Implement `apps/web/src/app/(dashboard)/academy/[slug]/[lessonSlug]/page.tsx`:
   - Distraction-free lesson reader.
   - Clinical insight highlights and "What to Say" callout cards.
   - One-tap "Mark Lesson Complete" button.

### Task 2: Sunday Youth Culture Digest UI
1. Implement `apps/web/src/app/(dashboard)/digest/page.tsx`:
   - Hero: Sunday Dinner Conversation Starter of the Week.
   - Slang Decoder Carousel: Interactive flashcards decoding emerging tween vocabulary with tone badges (Harmless vs. Toxic Alert).
   - Exploit Early Warning Section: Visual breakdowns of covert apps (Calculator vaults, proxy browsers) and step-by-step parent remedies.

### Task 3: PWA Offline Caching Engine
1. Configure Serwist runtime caching in `apps/web/next.config.mjs`:
   - Cache-first strategy for `/api/v1/academy/*` and `/api/v1/scripts/*`.
   - Stale-while-revalidate for `/api/v1/digest/*`.
2. Add offline banner notification indicating cached mode when network is lost.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [x] `apps/web/src/components/academy/ModuleCard.tsx`
- [x] `apps/web/src/components/academy/LessonReader.tsx`
- [x] `apps/web/src/components/digest/SlangCard.tsx`
- [x] `apps/web/src/components/digest/ExploitAlertCard.tsx`
- [x] `apps/web/src/components/shared/OfflineBanner.tsx`
- [x] `apps/web/src/app/(dashboard)/academy/page.tsx`
- [x] `apps/web/src/app/(dashboard)/academy/[slug]/[lessonSlug]/page.tsx`
- [x] `apps/web/src/app/(dashboard)/digest/page.tsx`

---

## 6. Acceptance Criteria & Verification Plan

1. **Frontend Compilation:**
   ```bash
   npm run typecheck --workspace=@alongside/web
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors.
2. **PWA Offline Verification:**
   *Pass criteria:* In browser DevTools Network tab, set to "Offline"; navigating to cached Academy lessons continues to display content without crashing.
3. **Responsive Mobile Testing:**
   *Pass criteria:* Lesson reader typography and slang cards adapt cleanly to mobile viewports.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Frontend Agent.
- ❌ **DO NOT** edit backend files in `apps/api/` or database schemas.
- ❌ **DO NOT** implement backend route handlers.
- ✅ Work exclusively inside `apps/web/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] Academy course player displays modules across all 4 tiers.
- [x] Sunday Culture Digest renders slang flashcards and exploit alerts.
- [x] Offline caching functional via PWA service worker.
- [x] `npm run typecheck` exits with code 0.
- [x] Commits adhere to Conventional Commits (`feat(web): ...`).
