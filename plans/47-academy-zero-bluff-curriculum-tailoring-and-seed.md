# Plan 47: Zero-Bluff Academy Curriculum Tailoring & Modular Seed Guard
**Plan ID:** `PLAN-47`  
**Assignee:** Backend Agent  
**Dependencies:** `PLAN-46`  
**Estimated Scope:** Large (Executed in 3 Quality-Checked Content Waves)  
**Paperclip Issue:** TBD (Phase 2 of Interactive Almanac v2 Rollout)

---

## 1. Objective & Business Value

Replace repetitive, boilerplate-heavy markdown essays across the Parent Intelligence Academy with **143 bespoke, zero-bluff Interactive Almanac v2 lessons** aligned to the founder-approved [**Curriculum Relevance Audit**](../docs/academy-curriculum-relevance-audit.md). Every surviving lesson delivers real parental impact, honors the strict Non-Clinical Mandate (SOU-86), eliminates academic jargon from headlines, attaches curated course-level Master Talks with verified timestamp jump chips, and passes automated CI content-quality tests.

---

## 2. Inputs & Architectural References

- **Curriculum Relevance Audit (Authoritative Roster):** [`docs/academy-curriculum-relevance-audit.md`](../docs/academy-curriculum-relevance-audit.md)
- **Canonical Specification:** [`docs/parent-intelligence-academy-interactive-almanac-v2-spec.md`](../docs/parent-intelligence-academy-interactive-almanac-v2-spec.md)
- **Approved Visual Prototype (Gold-Standard Copy Benchmark):** [`docs/design/academy-lesson-interactive-beats/indexv2.html`](../docs/design/academy-lesson-interactive-beats/indexv2.html)
- **Data Contract:** [`PLAN-46`](46-academy-interactive-almanac-v2-schema-and-api.md)

---

## 3. Preconditions & Dependency Verification

- Founder sign-off on [`docs/academy-curriculum-relevance-audit.md`](../docs/academy-curriculum-relevance-audit.md).
- `PLAN-46` merged (`AlmanacLessonPayloadSchema`, `interpolateChildCopy`, Prisma `almanacPayload` & `featuredVideoLecture` columns available).

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Decompose Monolithic `academy.seed.ts` Into Per-Tier Modules
1. Split the 5,509-line `packages/database/prisma/seed/academy.seed.ts` into maintainable, single-tier seed modules:
   - `packages/database/prisma/seed/academy/tier-0a-infancy.seed.ts`
   - `packages/database/prisma/seed/academy/tier-0b-toddler.seed.ts`
   - `packages/database/prisma/seed/academy/tier-0c-older-toddler.seed.ts`
   - `packages/database/prisma/seed/academy/tier-1-early-childhood.seed.ts`
   - `packages/database/prisma/seed/academy/tier-2-middle-childhood.seed.ts`
   - `packages/database/prisma/seed/academy/tier-3-pre-teen.seed.ts`
   - `packages/database/prisma/seed/academy/tier-4-early-adolescence.seed.ts`
   - `packages/database/prisma/seed/academy/tier-5-late-adolescence.seed.ts`
2. Keep `packages/database/prisma/seed/academy.seed.ts` as the thin aggregator + idempotent Prisma `upsert` runner (persisting `episodeRole`, `almanacPayload`, and module-level `featuredVideoLecture`, while cleanly removing the 17 retired/padded lessons on re-seed).

### Task 2: Fix Master Video Mismatches & Add Timestamp Jump Chips (`academyVideos.seed.ts`)
1. Remove the mismatched Burke Harris childhood-trauma video from `background-tv-and-acoustic-smog`.
2. Relocate Cal Newport's *Digital Minimalism & Deep Work* from `teen-zero-distracted-driving-pledge` to `play-teen-intellectual-mastery`.
3. Add 2–3 verified `jumpChips: Array<{ seconds, label }>` to every Master Talk in `packages/database/prisma/seed/academyVideos.seed.ts` (specifically segmenting talks > 20 min such as Huberman, Damour, Weinstein/James, Jensen, and Steinberg into crisp 2–3 min highlights).
4. Map **at most 1 `featuredVideoLecture` per course** cleanly (never repeating the same video across multiple lessons in a course).

### Task 3: Phased Bespoke v2 Content Authoring (Zero-Bluff Quality Standard)
1. **Wave 1 (Flagship Launch — Ages 0–3):** Author 100% bespoke `AlmanacLessonPayload` objects across all **15 courses / 55 surviving lessons** in Tiers `0A`, `0B`, and `0C` (including reframing `infant-temperature-and-fever-triage` → `infant-sick-night-comfort-prep`, removing "Triage" from `gagging-vs-choking`, removing "Anorexia" from toddler appetite, fixing broken variables, and cutting the 5 padded lessons).
2. **Wave 2 (Childhood — Ages 4–9):** Author 100% bespoke `AlmanacLessonPayload` objects across all **10 courses / 35 surviving lessons** in Tiers `1` and `2` (cutting/merging 5 padded lessons, fixing broken variables, removing academic jargon).
3. **Wave 3 (Pre-Teen & Teen — Ages 10–18):** Author 100% bespoke `AlmanacLessonPayload` objects across all **15 courses / 53 surviving lessons** in Tiers `3`, `4`, and `5` (reframing concussion/eating-disorder clinical items to non-clinical family support & safety habits, cutting/merging 7 padded/duplicate lessons).

### Task 4: Automated "Zero-Bluff & Content Integrity" CI Guard (`packages/database/test/`)
1. Create `packages/database/test/academyCurriculumQuality.test.ts` validating every seeded course & lesson:
   - **Zero Boilerplate Check:** Fails if any lesson contains `"can test even the most patient caregiver"`, `"quiet wonders of parenting"`, or duplicate closing notes across different lessons.
   - **Zero Clinical Triage Check (SOU-86):** Fails if any title or slug contains forbidden triage/diagnostic terms (`Triage`, `Anorexia`, `Symptom Checker`, `Screening for Disordered Eating`).
   - **Zero Broken Interpolation Check:** Runs `interpolateChildCopy()` across `MALE`, `FEMALE`, and `null` child fixtures on every string field of every lesson and asserts zero residual `{...}` tokens and zero double-space gaps (`/\s{2,}/`).
   - **Schema & Episode-Arc Validation:** Asserts every Wave-completed lesson passes `AlmanacLessonPayloadSchema.safeParse()`, has 2+ annotated calm-script segments, 2+ lesson-specific pushback chips, and 3 distinct tonight moves.
   - **Course Video Hygiene Check:** Asserts no course duplicates the exact same `videoUrl` across multiple lessons.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `packages/database/prisma/seed/academy/tier-0a-infancy.seed.ts` (Wave 1)
- [ ] `packages/database/prisma/seed/academy/tier-0b-toddler.seed.ts` (Wave 1)
- [ ] `packages/database/prisma/seed/academy/tier-0c-older-toddler.seed.ts` (Wave 1)
- [ ] `packages/database/prisma/seed/academy/tier-1-early-childhood.seed.ts` (Wave 2)
- [ ] `packages/database/prisma/seed/academy/tier-2-middle-childhood.seed.ts` (Wave 2)
- [ ] `packages/database/prisma/seed/academy/tier-3-pre-teen.seed.ts` (Wave 3)
- [ ] `packages/database/prisma/seed/academy/tier-4-early-adolescence.seed.ts` (Wave 3)
- [ ] `packages/database/prisma/seed/academy/tier-5-late-adolescence.seed.ts` (Wave 3)
- [ ] `packages/database/prisma/seed/academy.seed.ts`
- [ ] `packages/database/prisma/seed/academyVideos.seed.ts`
- [ ] `packages/database/test/academyCurriculumQuality.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

```bash
npm run test --workspace=@alongside/database
npm run test --workspace=@alongside/api
npm run typecheck
```

- `academyCurriculumQuality.test.ts` exits 0 with 100% pass rate across all 40 courses.
- Idempotent seed execution (`npm run db:seed`) completes cleanly with zero duplicate slugs or foreign-key errors.

---

## 7. Role Boundaries & Prohibitions

- **Strict Database/Seed Scope:** Do NOT edit files inside `apps/web/`.
- Do NOT invent fake statistics, fake citations, or clinical medical dosing advice.
- Keep `contentMarkdown` populated cleanly as plain-text backup alongside `almanacPayload` for search/RAG/fallback compatibility.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All 3 waves authored per [`docs/academy-curriculum-relevance-audit.md`](../docs/academy-curriculum-relevance-audit.md) (may be shipped as 3 clean incremental PRs: Wave 1 → Wave 2 → Wave 3).
- [ ] `academyCurriculumQuality.test.ts` passes 100% (0 boilerplate, 0 clinical triage, 0 broken templates).
- [ ] `npm run typecheck` and `npm test` exit 0.
- [ ] Conventional Commits used and plain-text PR opened targeting `main` (left open for human merge).
