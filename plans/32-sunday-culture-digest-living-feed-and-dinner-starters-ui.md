# Plan 32: Sunday Culture Digest Living Feed & Dinner Starters UI
**Plan ID:** `PLAN-32`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-03, PLAN-09, PLAN-28, PLAN-29  
**Estimated Scope:** Medium  
**Paperclip Issue:** SOU-65  

---

## 1. Objective & Business Value
A cornerstone of the user's vision for AlongSide is establishing **Sunday Youth Culture Digest (`/digest`) as the Living Feed** that helps parents continuously "keep up with your child and stay up to date as they grow."

This plan upgrades the `/digest` page into an engaging, high-retention weekly briefing. It provides parents with an instant **Searchable Slang Decoder**, an **Exploit & Dark Pattern Radar** (protecting kids from in-game predatory microtransactions and algorithmic traps), and **Sunday Dinner Conversation Starters** (engaging, non-cringe dialogue prompts to ignite authentic family conversation).

---

## 2. Inputs & Architectural References
- **Advisory Platform Specification:** [`docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md`](../docs/platform-advisory-rearchitecture-and-academy-chapters-spec.md)
- **Frontend Skill Matrix:** [`docs/frontend-skill-matrix.md`](../docs/frontend-skill-matrix.md), [`.agents/rules/05-frontend-skill-matrix.md`](../.agents/rules/05-frontend-skill-matrix.md)
- **Culture Digest Backend API:** [`docs/api-specification.md`](../docs/api-specification.md) (`GET /api/digest/latest`, `GET /api/digest/slang`, `GET /api/digest/exploits`)
- **Parent Calm Design System:** [`docs/system-architecture.md`](../docs/system-architecture.md)

---

## 3. Preconditions & Dependency Verification
- Verify that PLAN-29 has elevated `/digest` to the primary navigation bar.
- Verify that `useChildContextStore` provides active child's age and developmental tier to tailor conversation prompts.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Feed Masthead & Edition Navigator (`apps/web/src/app/(dashboard)/digest/page.tsx`)
1. Create `DigestFeedHeader.tsx`:
   - Masthead: *"Sunday Youth Culture Digest — The Living Feed to Keep Up With Your Child"*.
   - Edition pill: `Volume 42 · Released Sunday 8:00 AM`.
   - Age calibration badge: `Tailored for Leo (Age 10 · Pre-Teen)`.

### Task 2: Searchable Slang Radar & Decoder (`SlangDecoderView.tsx`)
1. Build `SlangDecoderView.tsx`:
   - Interactive search input with instant filtering: *"Search any word your child said (e.g., rizz, skibidi, crash out, bet)..."*
   - Slang card grid displaying:
     - Word title & phonetic pronunciation.
     - Modern meaning & cultural origin (TikTok, Twitch, Gaming).
     - **Cringe Meter** (1–5 scale indicating how awkward it sounds if a parent says it out loud).
     - Example conversation quote.
   - Filter pills by tier: All, Elementary (7–9), Tween (10–12), Teen (13–18).

### Task 3: Exploit & Dark Pattern Early Warnings (`ExploitAlertsView.tsx`)
1. Build `ExploitAlertsView.tsx`:
   - Alert cards categorizing predatory mechanics:
     - 🚨 **High Alert:** Roblox in-game gambling wheels & unauthorized Robux gifting.
     - ⚠️ **Medium Alert:** Discord server raid bots & disappearing photo requests.
     - ℹ️ **Notice:** TikTok algorithmic infinite scroll autoplay hooks.
   - Each card provides a calm, objective summary and an actionable **"Parent Action Protocol"** without moral panic.

### Task 4: Sunday Dinner Conversation Starters (`DinnerConversationStarters.tsx`)
1. Build `DinnerConversationStarters.tsx`:
   - Curates 3–5 open-ended, non-judgmental dinner questions tailored to the child's developmental tier:
     - Pre-Teen example: *"If your favorite game or YouTuber had to survive in a zombie apocalypse, who gets eliminated first and why?"*
     - Teen example: *"Do you think people our age are happier or more stressed because of group chats?"*
   - Interactive features:
     - "Copy Question" button with toast notification.
     - "Shuffle Question" generator.
     - "Save to Sunday Dinner List" bookmarking.

### Task 5: Component Verification & Unit Tests
1. In `apps/web/test/sundayCultureFeed.test.tsx`:
   - Assert slang search filters items dynamically on input change.
   - Assert Cringe Meter renders accurate visual indicators.
   - Assert Sunday dinner questions adapt to the active child's developmental tier.
   - Assert copy-to-clipboard fires correctly.

---

## 5. Specific Deliverables (Files to Create / Modify)
- [ ] `apps/web/src/components/digest/DigestFeedHeader.tsx` (Masthead and issue navigator)
- [ ] `apps/web/src/components/digest/SlangDecoderView.tsx` (Searchable slang directory with cringe meter)
- [ ] `apps/web/src/components/digest/ExploitAlertsView.tsx` (Predatory tech and dark pattern alerts)
- [ ] `apps/web/src/components/digest/DinnerConversationStarters.tsx` (Interactive dinner starters)
- [ ] `apps/web/src/app/(dashboard)/digest/page.tsx` (Full living feed layout)
- [ ] `apps/web/test/sundayCultureFeed.test.tsx` (Vitest test suite)

---

## 6. Acceptance Criteria & Verification Plan
- [ ] Digest loads as the primary cultural feed with zero lag.
- [ ] Slang search bar filters instantaneously across 50+ modern terms.
- [ ] Sunday dinner conversation starters provide non-cringe questions tailored to active child's age.
- [ ] Exploit alerts offer calm, actionable guidance without fear-mongering.
- [ ] Responsive across mobile (360px) and desktop (1440px).
- [ ] `npm run typecheck` and `npm run test` exit with code 0.

---

## 7. Role Boundaries & Prohibitions
- ❌ **DO NOT** edit backend Fastify routes or database schemas (Backend Agent domain).
- ❌ **DO NOT** use unverified slang definitions; strictly align with youth culture research in `docs/research/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist
- [ ] All UI components created and accessible.
- [ ] Passes `ponytail-review` audit for zero speculative bloat.
- [ ] Conventional commit created.
- [ ] Pull request submitted with plain text (`.txt`) description.
