# Plan 51: Culture & Trends Calm Weekly Hub, Week-Scoped Blogs/Videos & Saved UI
**Plan ID:** `PLAN-51`  
**Assignee:** Frontend Agent  
**Dependencies:** `PLAN-49` (runs in parallel with `PLAN-50`)  
**Estimated Scope:** Large  
**Paperclip Issue:** TBD (Phase 3 of Culture & Trends Weekly Hub Redesign)

---

## 1. Objective & Business Value

Deliver the redesigned, serene **Culture & Trends** weekly hub inside `apps/web/`, matching the editorial pacing, typography, and interaction craft of [`apps/web/public/explorations/digest-redesign-concept.html`](../apps/web/public/explorations/digest-redesign-concept.html). Parents enter a calm, child-calibrated sanctuary driven by the global header child switcher across all 6 age tiers, with a page-wide **Weekly Issue Selector** that scopes **`This Week`**, **`Blogs`**, and **`Videos`** cleanly to the selected week's real fetched articles and newly published embeddable YouTube talks — removing noisy `App & Media Watch` and standalone `Language Decoder` tabs while preserving a quiet optional 3-phrase strip strictly for ages `7–18`.

---

## 2. Inputs & Architectural References

- **Approved Visual & Interaction Prototype:** [`apps/web/public/explorations/digest-redesign-concept.html`](../apps/web/public/explorations/digest-redesign-concept.html)
- **Backend Contracts & API:** [`PLAN-49`](49-culture-digest-weekly-schema-and-api.md), [`docs/api-specification.md`](../docs/api-specification.md)
- **Design System Authority:** [`docs/design-system/MASTER.md`](../docs/design-system/MASTER.md) (*Taste 2: Editorial Pediatric Almanac* / Parent Calm)
- **Frontend Skill Matrix & Codebase Design:** [`docs/engineering-standards/frontend-skill-matrix.md`](../docs/engineering-standards/frontend-skill-matrix.md), [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md)
- **Git & Quality Standards:** [`docs/engineering-standards/git-commit-standards.md`](../docs/engineering-standards/git-commit-standards.md), [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md)

---

## 3. Preconditions & Dependency Verification

- `PLAN-49` merged (or mocked cleanly in `apps/web/src/lib/api/mocks/digestMocks.ts` matching `WeeklyDigestEditionDTO`, `DigestArticleDTO`, `DigestVideoDTO`, and `SavedDigestShortlistDTO` for parallel execution).
- Confirm global child selection persists via `apps/web/src/stores/useChildContextStore.ts` and `apps/web/src/components/shared/Header.tsx`.
- Confirm `npm run typecheck --workspace=@alongside/web` exits 0 prior to edits.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Typed API Client, Mock Fixtures & Deep State Hook (`apps/web/src/`)
1. Extend `apps/web/src/lib/api/digest.ts` with typed contract functions:
   - `listDigestIssues(tier?: DevelopmentalTier)` -> `GET /api/v1/digest/issues`
   - `getWeeklyDigestEdition(issueNumber: number | 'latest', params?: { tier?: DevelopmentalTier; childId?: string })` -> `GET /api/v1/digest/issues/:issueNumber`
   - `listDigestArticles(params: { issueNumber?: number; scope?: 'issue' | 'all'; tier?: DevelopmentalTier; unreadOnly?: boolean; q?: string })` -> `GET /api/v1/digest/articles`
   - `listDigestVideos(params: { issueNumber?: number; scope?: 'issue' | 'all'; tier?: DevelopmentalTier; durationBucket?: 'all' | 'short' | 'medium' | 'deep'; q?: string })` -> `GET /api/v1/digest/videos`
   - `getSavedDigestShortlist(tier?: DevelopmentalTier)` -> `GET /api/v1/digest/saved`
   - `upsertDigestInteraction(payload: { itemType: DigestItemType; itemId: string; childId?: string; isRead?: boolean; isSaved?: boolean })` -> `PUT /api/v1/digest/interactions`
2. Add contract-compliant fallback mock data in `apps/web/src/lib/api/mocks/digestMocks.ts` covering all 6 canonical tiers across 3 weekly issues (`#42`, `#41`, `#40`) so local preview and parallel frontend dev never stall.
3. Author deep custom hook `apps/web/src/hooks/useCultureDigest.ts`:
   - Reads `activeChild` from `useChildContextStore(selectActiveChild)` and computes canonical bucket via `resolveDigestTierBucket()`.
   - Syncs `selectedIssueNumber` and `activeTab` (`week | blogs | videos | saved`) cleanly with URL search params (`?issue=42&tab=blogs`).
   - Enforces **week-scoped defaults** on `Blogs` and `Videos` (`blogsScope: 'issue' | 'all'` defaulting to `'issue'`, `videosScope: 'issue' | 'all'` defaulting to `'issue'`), resetting cleanly when the parent switches child or issue.
   - Manages minimalist `Blogs` filters (`blogReadFilter: 'all' | 'unread'`, `blogSearch`), `Videos` filters (`videoDuration: 'all' | 'short' | 'medium' | 'deep'`, `videoSearch`), and optimistic TanStack Query mutations (`markArticleRead`, `toggleSaveItem`) with automatic rollback on failure and guest `localStorage` fallback.

### Task 2: Editorial Nameplate, Page-Wide Week Picker & 4-Tab Bar (`DigestFeedHeader.tsx`)
1. Refactor `apps/web/src/components/digest/DigestFeedHeader.tsx`:
   - Clean display serif heading (`Culture & Trends`), metadata strip (`Issue No. {N} · {weekDateRange}` / `For {child.name}, {ageLabel} · {tierLabel}` / live `{readCount} of {total} read` or `All caught up`), and right-aligned **Weekly Issue Selector** dropdown (`Issue #42 · Nov 9–15`, `#41 · Nov 2–8`, ...).
   - Quiet archive return banner (`Reading archive edition: Issue #{N}... · Return to this week →`) whenever a past issue is selected.
   - 4 quiet underline tabs: **`This Week`** (or `Issue #{N}` label cue when archived), **`Blogs`** (live count for selected week), **`Videos`** (live count for selected week), **`Saved`** (total saved for active tier).
   - Zero duplicate child selector inside the page body (relies cleanly on the global header child switcher).

### Task 3: Tab 1 (`This Week`) — Calm 3-Band Single-Focus Vertical Rhythm
Build modular, zero-slop components under `apps/web/src/components/digest/` (zero decorative badges, zero emojis as icons, crisp Lucide icons, `>= 44×44px` touch targets, semantic CSS tokens from `globals.css`):
1. **`WatchThisWeekBand.tsx` (Band 1 — `Watch this week`):**
   - Clean 3-column video card row (automatically adapts to 2-column `.cols-2` when an edition has 2 talks, single-column on mobile).
   - Edge-to-edge 16:9 thumbnail (`hqdefault.jpg` with clean `scale(1.18)` letterbox crop), centered play button, non-wrapping format + duration pills, title, presenter/channel, truthful publish date (`Published Nov 13`), concise 2-line hook, and quiet icon-only bookmark button.
   - Clicking any card opens **`VideoTheaterModal.tsx`**.
2. **`ReadThisWeekBand.tsx` (Band 2 — `Read this week`):**
   - Homogeneous **7/5 magazine spread** (Blogs ONLY — zero competing sidebar widgets):
     - Left (7 cols): Lead Weekly Blog card (`This week's lead · {tier}`, topic label, publisher + publish date e.g. `Child Mind Institute · Nov 12`, read time, `✓ Read` status, serif headline, calm summary, single `Key shift` pull-bar, `Read preview →` / `Read again →` CTA, quiet bookmark).
     - Right (5 cols): 2 Companion Blogs stacked to equal height with topic, publisher, read time, headline, summary, and `Read →` trigger.
   - Clicking any blog opens **`BlogReaderDrawer.tsx`** and optimistically marks it read.
3. **`SundayTableCloserBand.tsx` (Band 3 — Sunday Table Closer):**
   - Full-width Deep Evening Spruce (`#10251C`) **Tonight's Dinner Question** card (`Copy question`, `Next prompt`, `Text partner`, expandable `Parent note & follow-up`, dark bookmark icon).
   - **`WeeklyPhrasesStrip.tsx`:** Rendered directly beneath the dinner card **strictly when `isSlangEligibleTier(tier)` is `true` (ages 7–18)** and completely omitted from DOM for ages `0–6`. Displays 3 quiet clickable phrase tiles expanding inline definition, parent-use gauge dots, calm script, and `Heard another word? Ask AI Advisor →` (pre-seeding the floating AI Advisor drawer with the active child).

### Task 4: Week-Scoped `Blogs`, Week-Scoped `Videos`, `Saved` & Overlays
1. **`BlogsTabView.tsx` (Minimalist Week-Scoped Blogs):**
   - Toolbar: **`All`** · **`Unread ({N})`** + subtle scope toggle (`This week (#{N})` active by default vs. `All weeks`) + Search input (`Search blogs for this age tier...`). **Zero `Feature essays` or `Myth checks` filter pills.**
   - Displays the top latest blog card for the selected week (when unfiltered) followed by a clean single-column editorial reading stream (`Publisher · Published date`, plain topic label, read time + `Read` indicator in left margin | serif headline + calm summary | quiet bookmark button).
   - Warm `"You're all caught up"` empty state when `Unread` has 0 remaining blogs.
2. **`VideosTabView.tsx` (Week-Scoped Theater + Shelf):**
   - Toolbar: duration chips (`All videos`, `Under 12 min`, `12–25 min`, `Deep dives`) + subtle scope toggle (`This week (#{N})` active by default vs. `All weeks`) + Search input.
   - Wide 7/5 live `youtube-nocookie.com` Theater Player at top (shows real `jumpChips` ONLY when `video.jumpChips?.length > 0`, expandable 3-bullet skim, presenter/channel + publish date, bookmark) + 3-column selectable video shelf underneath.
3. **`SavedShortlistView.tsx`:**
   - Displays user-persisted `Saved blogs`, `Saved videos`, and `Saved dinner questions` grouped cleanly with instant open, copy, and remove actions, plus a calm empty state.
4. **`BlogReaderDrawer.tsx` & `VideoTheaterModal.tsx`:**
   - `BlogReaderDrawer.tsx` (accessible Radix/focus-managed slide-over drawer, `Escape` + backdrop close):
     - For **fetched external blogs (`isOriginalEditorial === false`)**: displays publisher header (`{sourceName} · Published {date}`), serif title, Alongside's calm summary, `Key shift` callout, context/perspective note, primary external CTA **`Read full article on {sourceName} ↗`** (`href={sourceUrl}`, `target="_blank" rel="noopener noreferrer"`), `Ask AI Advisor`, `Text to partner`, bookmark button, and Academy course bridge.
     - For **Alongside original editorials (`isOriginalEditorial === true`)**: renders full structured paragraphs alongside `Key shift`, `Perspective`, and research citations.
   - `VideoTheaterModal.tsx` (centered dialog modal): mounts `youtube-nocookie.com/embed/{youtubeVideoId}?autoplay=1&start={sec}&rel=0` on open, supports clickable real `jumpChips` (if present) and 3-bullet skim, and destroys the iframe cleanly on close to stop playback immediately.

### Task 5: Wire `DigestDashboardClient.tsx`, Preserve RSC Boundary & Retire Legacy Clutter
1. Update `apps/web/src/components/digest/DigestDashboardClient.tsx` to compose `useCultureDigest`, `DigestFeedHeader`, the 4 tab panels, `BlogReaderDrawer`, and `VideoTheaterModal`.
2. Keep `apps/web/src/app/(dashboard)/digest/page.tsx` strictly as a React Server Component wrapping `<DigestDashboardClient />` in `<Suspense>` with updated calm metadata (`title: 'Culture & Trends'`).
3. Verify zero remaining callers and remove obsolete legacy digest components:
   - `CulturalReelsView.tsx`, `WeeklyMagazineView.tsx`, `GenerationalTimeMirrorView.tsx`, `StageTailoredVocabularyView.tsx`, `SlangDecoderView.tsx`, `SlangCard.tsx`, `ExploitAlertsView.tsx`, `ExploitAlertCard.tsx`.
4. Author Vitest + React Testing Library specs in `apps/web/src/components/digest/__tests__/CultureDigest.test.tsx`:
   - Switching issues updates `This Week`, `Blogs`, and `Videos` to reflect the selected week by default, and widening to `All weeks` surfaces archive items.
   - Minimalist `All` / `Unread` blog filter decrements count when opening a blog and hides read posts under `Unread`.
   - Ages `0–3` and `4–6` hide `WeeklyPhrasesStrip` completely; ages `7–18` render and expand the 3 phrases.
   - Clicking a video opens `VideoTheaterModal` with `youtube-nocookie.com` iframe and destroys it on `Escape`.
   - External blog drawer renders canonical `Read full article on {sourceName} ↗` link with `rel="noopener noreferrer"`.

---

## 5. Specific Deliverables (Files to Create / Modify / Delete)

- [ ] `apps/web/src/lib/api/digest.ts`
- [ ] `apps/web/src/lib/api/mocks/digestMocks.ts`
- [ ] `apps/web/src/hooks/useCultureDigest.ts`
- [ ] `apps/web/src/app/(dashboard)/digest/page.tsx`
- [ ] `apps/web/src/components/digest/DigestDashboardClient.tsx`
- [ ] `apps/web/src/components/digest/DigestFeedHeader.tsx`
- [ ] `apps/web/src/components/digest/WatchThisWeekBand.tsx`
- [ ] `apps/web/src/components/digest/ReadThisWeekBand.tsx`
- [ ] `apps/web/src/components/digest/SundayTableCloserBand.tsx`
- [ ] `apps/web/src/components/digest/WeeklyPhrasesStrip.tsx`
- [ ] `apps/web/src/components/digest/BlogsTabView.tsx`
- [ ] `apps/web/src/components/digest/VideosTabView.tsx`
- [ ] `apps/web/src/components/digest/SavedShortlistView.tsx`
- [ ] `apps/web/src/components/digest/BlogReaderDrawer.tsx`
- [ ] `apps/web/src/components/digest/VideoTheaterModal.tsx`
- [ ] `apps/web/src/components/digest/__tests__/CultureDigest.test.tsx`
- [ ] Delete unused legacy files: `CulturalReelsView.tsx`, `WeeklyMagazineView.tsx`, `GenerationalTimeMirrorView.tsx`, `StageTailoredVocabularyView.tsx`, `SlangDecoderView.tsx`, `SlangCard.tsx`, `ExploitAlertsView.tsx`, `ExploitAlertCard.tsx`

---

## 6. Acceptance Criteria & Verification Plan

```bash
npm run typecheck --workspace=@alongside/web
npm run lint --workspace=@alongside/web
npm run test --workspace=@alongside/web -- CultureDigest
npm run test --workspace=@alongside/web
```

- Real-browser visual inspection at `1440px`, `768px`, and `390px` confirms:
  - Zero horizontal scroll (`scrollWidth <= innerWidth`), zero console errors, zero broken YouTube thumbnails.
  - `Blogs` and `Videos` tabs immediately update when switching the weekly Issue Selector, with `All` / `Unread` minimalist filtering on `Blogs`.
  - Ages `0–3` and `4–6` show zero slang UI; ages `7–18` show the quiet 3-phrase strip below the Dinner Closer.
  - Touch targets `>= 44×44px`, contrast `>= 4.5:1`, and all external blog links open safely with `rel="noopener noreferrer"`.

---

## 7. Role Boundaries & Prohibitions

- **Strict Frontend Scope:** Do NOT edit files inside `apps/api/` or `packages/database/`.
- Do NOT mark `apps/web/src/app/(dashboard)/digest/page.tsx` as `'use client'`; keep it a Server Component.
- Do NOT reintroduce `App & Media Watch`, standalone `Language Decoder`, `Feature essays`, or `Myth checks` filter chips.
- Zero emojis as UI icons, zero generic AI gradient cards, zero hardcoded inline mock payloads inside UI components (isolate fallback mocks strictly in `apps/web/src/lib/api/mocks/digestMocks.ts`).

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created, legacy clutter removed, and verified against [`digest-redesign-concept.html`](../apps/web/public/explorations/digest-redesign-concept.html).
- [ ] `npm run typecheck`, `npm run lint`, and `npm test` pass 100%.
- [ ] Real-browser visual verification passed at `1440px`, `768px`, and `390px`.
- [ ] `ponytail-review` diff audit passed with zero speculative bloat.
- [ ] Conventional Commits used and plain-text PR opened targeting `main` (left open for human merge).
