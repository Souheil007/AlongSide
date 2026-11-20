# Plan 48: Academy Interactive Almanac v2 Course Arc & 5-Beat Reader UI
**Plan ID:** `PLAN-48`  
**Assignee:** Frontend Agent  
**Dependencies:** `PLAN-46`  
**Estimated Scope:** Large  
**Paperclip Issue:** TBD (Phase 3 of Interactive Almanac v2 Rollout)

---

## 1. Objective & Business Value

Ship the founder-approved **Interactive Almanac v2** course and lesson experience inside `apps/web/`, matching the visual fidelity, tonal calmness, and interactive craft of [`docs/design/academy-lesson-interactive-beats/indexv2.html`](../docs/design/academy-lesson-interactive-beats/indexv2.html). Parents enter a calm, child-calibrated, zero-spoiler reading and listening sanctuary with 5 tonal chapter bands, 7 interactive SVG mental models, tappable annotated calm scripts, unified live-building Pocket Cards, Co-Parent sharing, and bottom-anchored Master Talks with timestamp jump chips.

---

## 2. Inputs & Architectural References

- **Approved Visual Prototype (Pixel & Interaction Reference):** [`docs/design/academy-lesson-interactive-beats/indexv2.html`](../docs/design/academy-lesson-interactive-beats/indexv2.html)
- **Canonical Specification:** [`docs/parent-intelligence-academy-interactive-almanac-v2-spec.md`](../docs/parent-intelligence-academy-interactive-almanac-v2-spec.md)
- **Design System Authority:** [`docs/design-system/MASTER.md`](../docs/design-system/MASTER.md) (*Taste 2: Editorial Pediatric Almanac*)
- **Frontend Skill Matrix & Codebase Design:** [`docs/engineering-standards/frontend-skill-matrix.md`](../docs/engineering-standards/frontend-skill-matrix.md), [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md)
- **Shared Contracts & API:** [`PLAN-46`](46-academy-interactive-almanac-v2-schema-and-api.md)

---

## 3. Preconditions & Dependency Verification

- `PLAN-46` merged (or mocked cleanly in `apps/web/src/lib/api/mocks.ts` matching `AlmanacLessonPayload` for parallel development).
- Verify `apps/web/src/styles/globals.css` contains base Editorial Pediatric Almanac tokens (`--canvas`, `--ink`, `--accent-forest`, `--accent-amber`).

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Design Token Extensions & Deep Lesson State Hook (`apps/web/src/`)
1. Update `apps/web/src/styles/globals.css` with tonal band & Nightstand tokens:
   - Light: `--band-sand: #F3EFE6`, `--band-spruce: #EDF4F0`, `--art-wash: #EDE6D8`, `--art-wash-spruce: #DCEBE2`.
   - Nightstand warm dim scope (`.almanac-nightstand`): `--canvas: #151412`, `--band-sand: #1B1915`, `--band-spruce: #161C18`, `--elevated: #221F1B`, `--ink: #F2ECE1`, `--spruce: #72BC94`, `--amber: #E5A657`.
2. Update `apps/web/src/lib/api/academy.ts` and `apps/web/src/lib/api/mocks.ts`:
   - Add `updateLessonPlaybook(lessonId, payload)` hitting `PATCH /api/v1/academy/lessons/:id/playbook` with optimistic `localStorage` fallback.
   - Extend `markLessonComplete(lessonId, readingMinutes, playbookInput?)` to send `{ chosenMoveId, bookmarkedTruth, savedPushbackIds }`.
3. Create deep custom hook `apps/web/src/hooks/useAlmanacLessonState.ts`:
   - Encapsulates active beat `IntersectionObserver`, live scroll-percentage hairline (`0–100%`), `Read | Listen` companion narration with active beat highlight, Nightstand persistence, micro-poll choice, Beat 3 instinct/skip/annotation/pushback state, Beat 4→5 chosen move & bookmarks, and `sealAndSavePocketCard()` mutation.

### Task 2: Course Episode Arc View Upgrade (`BiteSizedCourseDetailView.tsx`)
1. Update `apps/web/src/components/academy/BiteSizedCourseDetailView.tsx`:
   - Render the 3–4 episodes with distinct role labels (`Episode 1 · The Fast Win`, `Episode 2 · The Brain Decoder`, `Episode 3 · The Rhythm Reset`, `Episode 4 · The Long-Term Bond`), child-calibrated titles via `interpolateChildCopy()`, interactive signature tags, and `Saved ✓` completion state.
   - Render the single **Featured Course Master Talk** (`AlmanacVideoShelf`) cleanly beneath the episode cards when `module.featuredVideoLecture` is present.

### Task 3: Interactive Almanac v2 Reader & 5-Beat Components (`apps/web/src/components/academy/almanac/`)
Create modular, zero-slop, keyboard-accessible components (zero emojis as icons; crisp Lucide + bespoke editorial SVGs; 44×44px min touch targets):
1. `AlmanacReaderNav.tsx` — Sticky bar (`← Course`, 5 beat dots on desktop, `Read | Listen` pill, Nightstand moon toggle, live `2px` Spruce scroll hairline along bottom edge).
2. `AlmanacMarginRail.tsx` — Quiet sticky left-margin chapter index (`01–05`, desktop `≥ 1180px`).
3. `AlmanacListenDock.tsx` — Docked companion narrator (visible only in `Listen` mode; preserves Web Speech / audio URL fallback from `AudioMemoPlayer.tsx`).
4. `EditorialSpotArt.tsx` — Library of 9 unboxed ink-and-wash SVG spot illustrations (`plate`, `leaf`, `cup`, `moon_bed`, `clock_rhythm`, `blocks_play`, `device_dock`, `heart_bridge`, `compass_teen`).
5. `AlmanacMirrorBeat.tsx` (Beat 1 — Archival Linen) — Child-calibrated `Newsreader` H1 + deck + unboxed art + 3-line scene + 1-tap check-in poll + optional quiet `X-min talk below ↓` anchor link.
6. `AlmanacBrainBeat.tsx` (Beat 2 — Full-Bleed Warm Sand) — Dispatches 1 of 7 interactive visuals in `almanac/visuals/`:
   - `SensoryLadderVisual.tsx` (animated overhead plate SVG + 5 ascending stepped rungs)
   - `LensExposureMatrixVisual.tsx` (`Adult Lens ↔ Brain Lens` toggle + tactile 20-sighting dot matrix)
   - `BrainBridgeVisual.tsx` (animated upstairs-brakes vs. downstairs-alarm SVG)
   - `CircadianCurveVisual.tsx` (interactive sleep-pressure / melatonin / cortisol curve)
   - `RoutineTimelineVisual.tsx` (interactive daily/evening rhythm strip)
   - `ServeReturnVisual.tsx` (interactive 3-beat reciprocal connection diagram)
   - `HabitGuardrailVisual.tsx` (`Willpower / Policing` vs. `Neutral Environment / Pact` toggle)
   - Plus bookmarkable `Key Idea to Keep` Amber pull-quote & collapsible neuroscience drawer.
7. `AlmanacRehearsalBeat.tsx` (Beat 3 — Archival Linen) — Child trigger bubble, zero-shame instinct options, `"Neither sounds like me — jump straight to the calm reframe →"` hatch, **Annotated Calm Script** (tappable underlined phrases + coaching badges — **no 6-second tone button**), tappable **Pushback Chips** with `Add phrase to Pocket Card`, and contextual **AI Advisor** handoff (opens `FloatingAdvisorBubble` / `/advisor` pre-seeded with active child + lesson context).
8. `AlmanacMoveBeat.tsx` (Beat 4 — Full-Bleed Soft Spruce) — 3 selectable experiment cards that live-populate Beat 5's Pocket Card with zero competing save banner.
9. `AlmanacPocketBeat.tsx` (Beat 5 — Archival Linen) — Bespoke closing reflection, **Unified Live-Building Pocket Card** (with animated `SAVED · ALMANAC` seal, live chosen move, bookmarked pushback backup, and **20-Second Co-Parent Share Modal** scoped cleanly inside `/academy`), **Optional Master Talk Shelf** (`AlmanacVideoShelf.tsx` cleanly below Beat 5 with lazy `youtube-nocookie.com/embed/{id}?autoplay=1&start={sec}&rel=0`, clickable timestamp jump chips, and 3-idea skim), and **Curiosity Cliffhanger `Up Next` Card**.

### Task 4: Wire `LessonReaderClient.tsx` & `LessonReaderView.tsx` + Retire Legacy Clutter
1. Wire `useChildContextStore` (`selectActiveChild`) into `apps/web/src/components/academy/LessonReaderClient.tsx` and pass `activeChild` + full episode navigation to `LessonReaderView.tsx`.
2. Replace the legacy white-card blog post in `LessonReaderView.tsx` with the 5-Beat Interactive Almanac v2 composition via `resolveAlmanacLessonPayload(lesson)`.
3. Remove `LessonThirtySecondGlance` (top spoiler) and `LessonReliefMasthead` badge stacks from the lesson view (delete unused legacy files if zero remaining callers exist).
4. Preserve App Router Server Component boundary in `apps/web/src/app/(dashboard)/academy/[slug]/[lessonSlug]/page.tsx`.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `apps/web/src/styles/globals.css`
- [ ] `apps/web/src/lib/api/academy.ts`
- [ ] `apps/web/src/lib/api/mocks.ts`
- [ ] `apps/web/src/hooks/useAlmanacLessonState.ts`
- [ ] `apps/web/src/components/academy/BiteSizedCourseDetailView.tsx`
- [ ] `apps/web/src/components/academy/LessonReaderClient.tsx`
- [ ] `apps/web/src/components/academy/LessonReaderView.tsx`
- [ ] `apps/web/src/components/academy/almanac/AlmanacReaderNav.tsx`
- [ ] `apps/web/src/components/academy/almanac/AlmanacMarginRail.tsx`
- [ ] `apps/web/src/components/academy/almanac/AlmanacListenDock.tsx`
- [ ] `apps/web/src/components/academy/almanac/EditorialSpotArt.tsx`
- [ ] `apps/web/src/components/academy/almanac/AlmanacMirrorBeat.tsx`
- [ ] `apps/web/src/components/academy/almanac/AlmanacBrainBeat.tsx`
- [ ] `apps/web/src/components/academy/almanac/AlmanacRehearsalBeat.tsx`
- [ ] `apps/web/src/components/academy/almanac/AlmanacMoveBeat.tsx`
- [ ] `apps/web/src/components/academy/almanac/AlmanacPocketBeat.tsx`
- [ ] `apps/web/src/components/academy/almanac/AlmanacVideoShelf.tsx`
- [ ] `apps/web/src/components/academy/almanac/PartnerShareModal.tsx`
- [ ] `apps/web/src/components/academy/almanac/visuals/` (7 interactive visual components)
- [ ] `apps/web/src/components/academy/__tests__/AlmanacLessonReader.test.tsx`

---

## 6. Acceptance Criteria & Verification Plan

```bash
npm run typecheck --workspace=@alongside/web
npm run lint --workspace=@alongside/web
npm run test --workspace=@alongside/web
```

- All Vitest + React Testing Library specs pass (testing child interpolation, Beat 2 visuals, Beat 3 annotated phrases + skip hatch + pushback bookmarks, Beat 4→5 live Pocket Card sealing, Co-Parent share copy, and Master Talk timestamp jump chips).
- Visual browser check at `1440px`, `768px`, and `390px` (Light Almanac + Nightstand Dim) confirms:
  - Zero horizontal overflow (`scrollWidth <= innerWidth`).
  - Zero top spoiler drawer (`LessonThirtySecondGlance` gone) and zero 6-second tone button.
  - All touch targets ≥ 44×44px, contrast ≥ 4.5:1, and `2px` mobile progress hairline smoothly tracks scroll.
  - Full-bleed tonal bands render edge-to-edge cleanly without breaking dashboard layout shell.

---

## 7. Role Boundaries & Prohibitions

- **Strict Frontend Scope:** Do NOT edit files inside `apps/api/` or `packages/database/`.
- Keep page roots (`apps/web/src/app/**`) as React Server Components; isolate `'use client'` boundaries cleanly.
- Strictly zero emoji UI icons, zero generic SaaS gradients/glows, zero raw hex values outside semantic CSS variables.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and verified against [`indexv2.html`](../docs/design/academy-lesson-interactive-beats/indexv2.html) and [`MASTER.md`](../docs/design-system/MASTER.md).
- [ ] `npm run typecheck`, `npm run lint`, and `npm test` pass 100%.
- [ ] Real-browser visual inspection passed at `1440px`, `768px`, and `390px` (Light & Nightstand).
- [ ] `ponytail-review` diff audit passed with zero speculative bloat.
- [ ] Conventional Commits used and plain-text PR opened targeting `main` (left open for human merge).
