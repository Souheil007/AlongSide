# Plan 40: Academy Lesson Archetypes, Unified Blog Reader & Platform-Wide De-Clinicalization
**Plan ID:** `PLAN-40`  
**Assignee:** Joint (Backend Agent & Frontend Agent)  
**Dependencies:** PLAN-38, PLAN-39  
**Estimated Scope:** Large (Lesson Archetype Engine, Unified Editorial Blog Post & Platform-Wide De-Clinicalization)  
**Status:** Approved Architectural Plan (Ready for Delegation)  

---

## 1. Objective & Business Value

Restructure the **Parent Intelligence Academy** lesson experience around a **Single Unified Editorial Blog Post** driven by **3 distinct Lesson Archetypes** (`EVERYDAY_BEHAVIOR`, `CHILD_GROWTH_CONCEPT`, `PRACTICAL_FAMILY_GUIDE`), and **remove all cold "clinical" / medical-textbook terminology across the entire AlongSide platform**.

AlongSide is an **advisory and educational platform for parents**—not a hospital triage chart or a neurology textbook. Currently, all 160+ seeded lessons are forced into a single crisis-oriented template (`"💡 Why this happens"`, `"Real Family Friction"`, `"30-Second Crisis Glance"`, `"Developmental Neurobiology"`, `"Clinical Neurobiology Takeaway"`, `"Clinical Implementation & Parental Grounding"`) and cluttered with category widgets (`LessonAdaptiveModuleRenderer`), dead buttons (`Pin to Pocket Vault`, `Copy Script`, `Roleplay with AI`), and heavy top-of-page video embeds that push the written article below the fold. Furthermore, user-facing surfaces across the homepage, navigation, quizzes, AI Advisor, and Academy repeatedly use the word `"Clinical"` (`"Clinical Rationale"`, `"Clinical Focus"`, `"Clinical FAQ Vault"`, `"Clinical Key Takeaways"`).

### Core Deliverables:
1. **3-Archetype Lesson Classification & Schema (`@alongside/shared` & `packages/database`):** Every Academy lesson is classified into one of three archetypes (`EVERYDAY_BEHAVIOR`, `CHILD_GROWTH_CONCEPT`, `PRACTICAL_FAMILY_GUIDE`) with archetype-specific section headings, top banner labels, inline perspective-shift callouts, and unique parent closing reflections.
2. **Unified Rich Editorial Blog Post Reader (`LessonReaderView.tsx`):**
   - Consolidate all 4 parts of a lesson (`Part 1`, `Part 2 + Perspective Shift + Key Takeaway`, `Part 3 Comparative Scripts + Pushback Recovery`, `Part 4 Action Steps + Unique Parent Note`) inside **one continuous Editorial Blog Post container** (`lesson-article-container`).
   - Move `LessonVideoPlayer` **below** the unified blog post (`"Watch & Go Deeper"`).
   - Remove `LessonAdaptiveModuleRenderer` (Stage 5 interactive lab widgets), `LessonToolBridges` (`Pin to Pocket Vault` & `Roleplay with AI`), and the `Copy Script` button from the lesson reader flow.
3. **Complete Platform-Wide De-Clinicalization (`apps/web`, `apps/api`, `packages/shared`, `packages/database`):** Eliminate all user-facing occurrences of `"Clinical"` / `"clinical"` and dense medical textbook jargon across Academy lessons, Homepage (`LifespanStageSelector`, `PillarsShowcase`), Navigation (`DashboardNav`, `MobileNav`), Settings (`AccountSettingsView`), Quizzes (`ReadinessWizard`, `useReadinessStore`), and AI Advisor prompts, replacing them with warm, clear, parent-friendly advisory language.

---

## 2. Inputs & Architectural References

- **Lesson Audit & Architecture Specification:** [`docs/parent-intelligence-academy-lesson-content-audit-and-architecture.md`](../docs/parent-intelligence-academy-lesson-content-audit-and-architecture.md)
- **Interactive Before/After Visual Reference:** [`docs/design/academy-lesson-before-after/index.html`](../docs/design/academy-lesson-before-after/index.html)
- **Project Scope:** [`docs/PROJECT_SCOPE.md`](../docs/PROJECT_SCOPE.md)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md)
- **Data Models:** [`docs/data-models.md`](../docs/data-models.md)
- **Code Quality & Git Standards:** [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md), [`docs/engineering-standards/git-commit-standards.md`](../docs/engineering-standards/git-commit-standards.md)

---

## 3. Preconditions & Dependency Verification

- Verify `PLAN-38` and `PLAN-39` reader components and seed structures are present in `apps/web/src/components/academy/` and `packages/database/prisma/seed/academy.seed.ts`.
- Verify `npm run typecheck` exits with code `0` across all workspaces before beginning modifications.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Shared Archetype Contracts & De-Clinicalized Parsers (`packages/shared`) [Assignee: Backend Agent]

1. **Define `LessonArchetype` & Archetype Metadata Contract in `packages/shared/src/constants/index.ts` and `packages/shared/src/types/index.ts`:**
   ```ts
   export const LessonArchetype = {
     EVERYDAY_BEHAVIOR: 'EVERYDAY_BEHAVIOR',
     CHILD_GROWTH_CONCEPT: 'CHILD_GROWTH_CONCEPT',
     PRACTICAL_FAMILY_GUIDE: 'PRACTICAL_FAMILY_GUIDE',
   } as const;

   export type LessonArchetype =
     (typeof LessonArchetype)[keyof typeof LessonArchetype];
   ```
   - Add `archetype?: LessonArchetype` to `AcademyLessonDTO` and `AcademyLessonSummaryDTO` in `packages/shared/src/types/index.ts` and `packages/shared/src/schemas/academy.ts`.

2. **Add `resolveLessonArchetype` & Archetype Labels Helper in `packages/shared/src/algorithms/academy.ts`:**
   - Implement `resolveLessonArchetype(slug: string, title: string, category?: AcademyCategory): LessonArchetype`:
     - `DEVELOPMENT_AND_PLAY` lessons (or lessons focused on milestones, brain growth concepts, vocal echo, puppet play, gut-brain connection, sleep cycle maturation, continuous partial attention) resolve to `CHILD_GROWTH_CONCEPT`.
     - `HEALTH_AND_WELLNESS` safety/fever/sleep-setup guides, nutrition grocery/batch-prep guides, and digital family system rules (driving pledge, unplugged weekends, digital covenant) resolve to `PRACTICAL_FAMILY_GUIDE`.
     - `BEHAVIOR_AND_EMOTIONS` and reactive mealtime/bedtime/screen conflict lessons resolve to `EVERYDAY_BEHAVIOR`.
   - Implement `getLessonArchetypeHeadings(archetype: LessonArchetype)` returning the non-clinical section headings for each archetype:

   | Field | `EVERYDAY_BEHAVIOR` | `CHILD_GROWTH_CONCEPT` | `PRACTICAL_FAMILY_GUIDE` |
   | :--- | :--- | :--- | :--- |
   | `bannerPrefix` | `💡 Why this happens:` | `🌱 How your child grows:` | `🧭 Parent's guide:` |
   | `quickReadTitle` | `⚡ The Short Version (30-Second Read)` | `⚡ Concept at a Glance (30-Second Read)` | `⚡ Quick Reference (30-Second Read)` |
   | `part1Eyebrow` | `Part 1 · A Moment Every Parent Knows` | `Part 1 · What You'll Notice` | `Part 1 · Why Clear Guidance Matters` |
   | `part1Title` | `What It Looks Like at Home` | `A New Stage of Growth` | `The Everyday Family Decision` |
   | `part2Eyebrow` | `Part 2 · Understanding Your Child` | `Part 2 · Why This Milestone Matters` | `Part 2 · What Every Parent Should Know` |
   | `part2Title` | `What's Going On Inside Their Growing Mind` | `How This Builds Confidence & Connection` | `The "Why" Behind the Guidance` |
   | `part3Eyebrow` | `Part 3 · Words That Help` | `Part 3 · Encouraging Their Curiosity` | `Part 3 · Common Myths vs. Helpful Habits` |
   | `part3Title` | `What to Say (and What If They Push Back?)` | `How to Spark & Nurture It Together` | `What to Avoid & What Helps Most` |
   | `part4Eyebrow` | `Part 4 · Putting It Into Practice` | `Part 4 · Fun Ideas for This Week` | `Part 4 · Your Home Checklist` |
   | `part4Title` | `3 Simple Steps to Try at Home` | `3 Simple Ways to Practice Together` | `3 Simple Steps to Keep Handy` |
   | `takeawayLabel` | `The Key Takeaway to Remember` | `The Key Takeaway to Remember` | `The Key Takeaway to Remember` |
   | `closingLabel` | `A Note for You as a Parent` | `A Note for You as a Parent` | `A Note for You as a Parent` |

3. **De-Clinicalize `resolveReliefTagline` and `parseThirtySecondGlance` in `packages/shared/src/algorithms/academy.ts`:**
   - Replace clinical jargon in `resolveReliefTagline` (`"autonomic surge"`, `"neophobic palate protection"`, `"synaptic arborization"`, `"Dopaminergic variable-reward hook"`) with warm, parent-friendly phrasing:
     - `BEHAVIOR_AND_EMOTIONS`: `"💡 A normal wave of big feelings at this age—never a sign of bad parenting or manipulation"`
     - `HEALTH_AND_WELLNESS`: `"🧭 A natural shift in your child's sleep and body rhythms—not stubborn defiance"`
     - `NUTRITION_AND_FEEDING`: `"🌱 A normal stage of cautious tasting—not intentional mealtime rejection"`
     - `DEVELOPMENT_AND_PLAY`: `"🌱 How your child's curious mind builds new skills through everyday play"`
     - `DIGITAL_AND_DEVICES`: `"🧭 Modern apps are engineered to hold attention—clear family habits beat willpower"`
   - Update `parseThirtySecondGlance` regex in `packages/shared/src/algorithms/academy.ts` to match both `> **Key Takeaway:**` and legacy `> **Clinical Insight:**` so no existing or updated seed fails parsing.

---

### Task 2: Database Seed & Backend API De-Clinicalization (`packages/database` & `apps/api`) [Assignee: Backend Agent]

1. **Add `archetype` Column to `AcademyLesson` in `packages/database/prisma/schema.prisma`:**
   - Add `archetype String @default("EVERYDAY_BEHAVIOR")` to `AcademyLesson`.
   - Update `apps/api/src/modules/academy/academy.repository.ts`, `academy.service.ts`, and `academy.routes.ts` to return `archetype` in lesson responses (falling back to `resolveLessonArchetype` if unset).

2. **De-Clinicalize All Seeded Lessons in `packages/database/prisma/seed/academy.seed.ts`:**
   - Assign the appropriate `archetype` (`EVERYDAY_BEHAVIOR`, `CHILD_GROWTH_CONCEPT`, `PRACTICAL_FAMILY_GUIDE`) to every lesson in `enrichAcademySeedModules`.
   - Replace `> **Clinical Insight:**` with `> **Key Takeaway:**` across `academy.seed.ts`.
   - Replace `### Clinical Implementation & Parental Grounding` and its copy-pasted 4-sentence boilerplate (*"When caregivers execute predictable, somatic co-regulation paired with unwavering loving containment, children's autonomic arousal downregulates rapidly..."*) with `### A Note for You as a Parent` and a **unique, warm, lesson-contextualized closing reflection** derived from each lesson's title, category, and archetype.
   - Replace user-facing `"clinical"` strings across `academy.seed.ts` and `academyVideos.seed.ts` with warm educational phrasing (`"research-backed"`, `"parent guide"`, `"developmental"`, `"practical"`).

3. **De-Clinicalize AI Advisor System Prompt (`apps/api/src/modules/ai-advisor/prompt.builder.ts`):**
   - Update `prompt.builder.ts` so the AI Child Advisor explicitly speaks as a **warm, educated, empathetic parenting advisor** in plain, relatable everyday language—never using hospital or neurology textbook jargon (`"ventromedial prefrontal cortex"`, `"periaqueductal gray"`, `"autonomic downregulation"`, `"Clinical Invariant"`) in responses to parents.

---

### Task 3: Unified Editorial Blog Post Reader & Removal of Widget/Button Clutter (`apps/web/src/components/academy/`) [Assignee: Frontend Agent]

1. **Refactor `apps/web/src/components/academy/LessonReaderView.tsx` into a Single Unified Editorial Blog Post:**
   - **Move Video Below the Blog Post:** Remove `LessonVideoPlayer` from above the article (currently lines 533–542) and render it **below** the unified blog post card under a `"Watch & Go Deeper"` section header when `lesson.videoLecture` is present.
   - **Dock Compact Audio Bar & Collapsible 30-Sec Quick Read Inside the Blog Header:**
     - Keep `AudioMemoPlayer` docked cleanly inside the blog post `<header>` (`"Listen to Article"`).
     - Render the collapsible `"⚡ Quick 30-Sec Read"` drawer directly inside the blog post header instead of a separate standalone crisis box.
   - **Use Archetype-Driven Section Headings:** Call `getLessonArchetypeHeadings(lesson.archetype)` so `Part 1`, `Part 2`, `Part 3`, `Part 4`, the top highlight banner (`💡 Why this happens` vs. `🌱 How your child grows` vs. `🧭 Parent's guide`), the `Key Takeaway` pullquote, and `A Note for You as a Parent` display the exact headings for that lesson's archetype—with **zero** occurrences of the word `"Clinical"` or `"Developmental Neurobiology"`.
   - **Integrate `Part 3` Comparative Scripts & `Part 4` Action Steps Inside the Unified Blog Post Body:**
     - Render the side-by-side script comparison (`🛑 Common Reaction` vs. `✅ Try Saying This Instead` + `🎙️ Tone & Body Language Tip`) directly inside `Part 3` of the `<article data-testid="lesson-article-container">` flow instead of a detached card below the blog post.
     - Render the interactive 3-step checklist (`Part 4`) directly inside the `<article>` container, followed by `A Note for You as a Parent` at the bottom of the blog post.
   - **Remove Friction Widgets & Dead Utility Buttons:**
     - Remove `<LessonAdaptiveModuleRenderer />` from `LessonReaderView.tsx`.
     - Remove `<LessonToolBridges />` (`Pin to Pocket Vault` and `Roleplay with AI`) from `LessonReaderView.tsx`.
     - Remove the `Copy Script` clipboard button from the dialogue comparison.

2. **Delete All Dead & Orphaned Academy Reader & Retired Clinical Triage Files (`git rm`) (`apps/web`):**
   - Delete the following **13 dead/orphaned files** completely from the repository and remove their barrel exports from `apps/web/src/components/academy/reader/index.ts`:
     1. `apps/web/src/components/academy/LessonReader.tsx` *(1-line pass-through alias with zero production imports; fails Deletion Test)*
     2. `apps/web/src/components/academy/reader/LessonToolBridges.tsx` *(Orphaned component writing to dead `localStorage` key `alongside-script-vault` with zero readers in `apps/web`)*
     3. `apps/web/src/components/academy/reader/LessonAdaptiveModuleRenderer.tsx` *(Retired Stage 5 Interactive Lab dispatcher)*
     4. `apps/web/src/components/academy/reader/CircadianTimelineWidget.tsx` *(Already disabled in code via comment, sitting as dead code)*
     5. `apps/web/src/components/academy/reader/SomaticBreathWidget.tsx` *(Orphaned category widget only used by deleted `LessonAdaptiveModuleRenderer`)*
     6. `apps/web/src/components/academy/reader/FeedingResponsibilityWidget.tsx` *(Orphaned category widget only used by deleted `LessonAdaptiveModuleRenderer`)*
     7. `apps/web/src/components/academy/reader/PurposefulPlayBlueprintWidget.tsx` *(Orphaned category widget only used by deleted `LessonAdaptiveModuleRenderer`)*
     8. `apps/web/src/components/academy/reader/PactClauseBridgeWidget.tsx` *(Orphaned category widget only used by deleted `LessonAdaptiveModuleRenderer`)*
     9. `apps/web/src/components/academy/reader/LessonDialogueDeck.tsx` *(Detached duplicate dialogue card with `Copy Script` button, superseded by inline Part 3 comparison in `LessonReaderView.tsx`)*
     10. `apps/web/test/academyAdaptiveModules.test.tsx` *(Unit test file exclusively testing the deleted `LessonAdaptiveModuleRenderer` and its 5 deleted widgets)*
     11. `apps/web/src/components/health/EmergencyRedFlagBanner.tsx` *(Marked `@deprecated RETIRED IN SOU-86`, zero imports in `apps/web/src/`)*
     12. `apps/web/src/components/health/PediatricianVisitSummaryModal.tsx` *(Marked `@deprecated RETIRED IN SOU-86`, only imported by dead `SymptomTriageRunner.tsx`)*
     13. `apps/web/src/components/health/SymptomTriageRunner.tsx` *(Marked `@deprecated RETIRED IN SOU-86`, zero imports in `apps/web/src/`)*
   - Update `apps/web/test/academyLessonReaderView.test.tsx` and `apps/web/test/declutterAndCultureDigest.test.ts` to remove dead test blocks referencing `LessonToolBridges`, `LessonDialogueDeck`, and `SymptomTriageRunner.tsx`.

3. **De-Clinicalize Supporting Academy Reader Components (`apps/web/src/components/academy/`):**
   - `apps/web/src/components/academy/reader/AudioMemoPlayer.tsx`: Change spoken fallback string from `"Evidence-based clinical guidance from AlongSide Pediatric Academy"` to `"Practical, research-backed parenting guidance from AlongSide Academy."`
   - `apps/web/src/components/academy/reader/LessonVideoPlayer.tsx`:
     - Replace `"Click to load master lecture and clinical analysis"` with `"Click to watch this talk"`.
     - Replace `"Clinical Video Hook"` with `"Why This Talk Matters"`.
     - Replace `"Clinical Key Takeaways ({n} Core Concepts)"` with `"Key Takeaways ({n} Core Ideas)"`.
   - `apps/web/src/components/academy/reader/LessonThirtySecondGlance.tsx`:
     - Replace `"In a Rush? 30-Second Crisis Glance"` / `"Tonight's 10-Second Emergency Protocol"` / `"The Biological Trap (Core Problem)"` with `"⚡ Quick 30-Second Read"`, `"What's Going On"`, `"Your Best First Move"`, and `"What to Say"`.

---

### Task 4: Platform-Wide De-Clinicalization Across Homepage, Navigation, Quizzes & Mock Data (`apps/web`) [Assignee: Frontend Agent]

Remove every remaining user-facing `"Clinical"` / `"clinical"` label across `apps/web/src/`:

1. **Homepage Components (`apps/web/src/components/home/`):**
   - `LifespanStageSelector.tsx`:
     - Rename UI label `"Clinical Rationale:"` (line 1046) to `"Why This Matters:"`.
     - Replace `"Explore our clinical curriculum tailored specifically for your child's age"` (line 871) with `"Explore our practical, research-backed courses tailored for your child's age"`.
     - Replace all 40 `"Clinical Focus: ..."` strings and `"Zero-screen clinical rules"` with warm, parent-friendly `"Focus: ..."` strings.
   - `PillarsShowcase.tsx`:
     - Replace `"AlongSide converges prioritized clinical education..."` (line 214) with `"AlongSide brings together stage-by-stage parent courses, weekly youth culture guides, and family screen agreements in one calm place."`
     - Replace `"Clinical FAQ Vault"` (line 301) and `"Trained on 260+ clinical parenting FAQs and developmental neurobiology"` (line 308) with `"Parenting Q&A Library"` and `"Grounded in 260+ real-life parenting questions and child development research"`.
   - `ClinicalAuthorityTestimonials.tsx`:
     - Update any section headers or badges so they highlight `"Trusted by Child Development Experts & Educators"` rather than cold clinical labels.

2. **Navigation & Settings (`apps/web/src/components/shared/` & `settings/`):**
   - `DashboardNav.tsx` (line 77): Change `'Multi-child AI advisor & 250+ FAQ clinical vault'` to `'24/7 AI parenting advisor & 250+ Q&A library'`.
   - `MobileNav.tsx` (line 215): Change `'AI Child Advisor & Clinical Vault'` to `'AI Child Advisor & Q&A Library'`.
   - `AccountSettingsView.tsx` (line 582): Change `'24/7 AI Child Advisor & Clinical FAQ Vault'` to `'24/7 AI Child Advisor & Parenting Q&A Library'`.

3. **Quizzes & Readiness Store (`apps/web/src/components/quizzes/` & `stores/`):**
   - `ReadinessWizard.tsx` (line 216): Change `<strong>Developmental Neurobiology:</strong>` to `<strong>Why This Matters:</strong>`.
   - `useReadinessStore.ts`: Ensure all explanation strings use clear, supportive advisory language free of `"clinical"` jargon.

4. **Nutrition & Mock Data (`apps/web/src/components/nutrition/` & `apps/web/src/lib/api/`):**
   - `BabyLedWeaningGuide.tsx` (line 229): Change `"Absolute Clinical Prohibition"` to `"Important Safety Rule"`.
   - `NutritionDashboardView.tsx` (line 536): Change `"Pediatric Nutrition Authority & Clinical Safe Harbor"` to `"Evidence-Based Family Nutrition Guide"`.
   - `apps/web/src/lib/api/mocks.ts`: Replace `"with clinical ease"`, `"clinical trials prove"`, and `"Clinical AAP rationale"` with warm advisory equivalents.

5. **Update Affected Frontend Unit Tests:**
   - Update `apps/web/src/components/home/LifespanStageSelector.test.tsx`, `apps/web/src/components/academy/reader/__tests__/LessonVideoPlayer.test.tsx`, and any LessonReader tests to assert the new warm advisory labels (`"Why This Matters:"`, `"Key Takeaways (3 Core Ideas)"`, `"The Key Takeaway to Remember"`, etc.) and verify that `"Clinical Neurobiology Takeaway"` and `"Clinical Rationale:"` no longer appear in rendered HTML.

---

## 5. Specific Deliverables (Files to Create / Modify)

### Shared & Backend (`Backend Agent`)
- [ ] `packages/shared/src/constants/index.ts` (Add `LessonArchetype`)
- [ ] `packages/shared/src/types/index.ts` (Add `LessonArchetype`, `LessonArchetypeHeadings`, update `AcademyLessonDTO`)
- [ ] `packages/shared/src/schemas/academy.ts` (Add `archetype` field validation)
- [ ] `packages/shared/src/algorithms/academy.ts` (Add `resolveLessonArchetype`, `getLessonArchetypeHeadings`, de-clinicalize `resolveReliefTagline` and `parseThirtySecondGlance`)
- [ ] `packages/database/prisma/schema.prisma` (Add `archetype` to `AcademyLesson`)
- [ ] `packages/database/prisma/seed/academy.seed.ts` (Assign `archetype`, replace `Clinical Insight` and copy-pasted grounding boilerplate, de-clinicalize copy)
- [ ] `apps/api/src/modules/academy/academy.repository.ts` & `academy.routes.ts` (Serialize `archetype`)
- [ ] `apps/api/src/modules/ai-advisor/prompt.builder.ts` (Enforce warm, non-clinical parent advisor voice)

### Frontend (`Frontend Agent`)
- [ ] `apps/web/src/components/academy/LessonReaderView.tsx` (Unified Editorial Blog Post, archetype-driven headings, video moved below article, remove `LessonAdaptiveModuleRenderer`, `LessonToolBridges`, and `Copy Script`, remove all `"Clinical"` labels)
- [ ] `apps/web/src/components/academy/reader/index.ts` (Remove barrel exports for deleted dead components/widgets)
- [ ] `apps/web/src/components/academy/reader/LessonVideoPlayer.tsx` (De-clinicalize video hook & takeaway labels)
- [ ] `apps/web/src/components/academy/reader/AudioMemoPlayer.tsx` (De-clinicalize spoken fallback intro)
- [ ] `apps/web/src/components/academy/reader/LessonThirtySecondGlance.tsx` (De-clinicalize quick-read summary labels)
- [ ] `apps/web/src/components/home/LifespanStageSelector.tsx` & `LifespanStageSelector.test.tsx` (Replace `"Clinical Rationale:"` and `"Clinical Focus:"` with `"Why This Matters:"` and `"Focus:"`)
- [ ] `apps/web/src/components/home/PillarsShowcase.tsx` (Replace `"Clinical FAQ Vault"` and `"clinical education"`)
- [ ] `apps/web/src/components/shared/DashboardNav.tsx`, `MobileNav.tsx`, `apps/web/src/components/settings/AccountSettingsView.tsx` (Replace `"Clinical Vault"` with `"Parenting Q&A Library"`)
- [ ] `apps/web/src/components/quizzes/ReadinessWizard.tsx`, `apps/web/src/components/nutrition/BabyLedWeaningGuide.tsx`, `apps/web/src/components/nutrition/NutritionDashboardView.tsx`, `apps/web/src/lib/api/mocks.ts` (Remove remaining user-facing `"Clinical"` labels)

### Dead Files to Delete Completely (`git rm`)
- [ ] `apps/web/src/components/academy/LessonReader.tsx`
- [ ] `apps/web/src/components/academy/reader/LessonToolBridges.tsx`
- [ ] `apps/web/src/components/academy/reader/LessonAdaptiveModuleRenderer.tsx`
- [ ] `apps/web/src/components/academy/reader/CircadianTimelineWidget.tsx`
- [ ] `apps/web/src/components/academy/reader/SomaticBreathWidget.tsx`
- [ ] `apps/web/src/components/academy/reader/FeedingResponsibilityWidget.tsx`
- [ ] `apps/web/src/components/academy/reader/PurposefulPlayBlueprintWidget.tsx`
- [ ] `apps/web/src/components/academy/reader/PactClauseBridgeWidget.tsx`
- [ ] `apps/web/src/components/academy/reader/LessonDialogueDeck.tsx`
- [ ] `apps/web/test/academyAdaptiveModules.test.tsx`
- [ ] `apps/web/src/components/health/EmergencyRedFlagBanner.tsx`
- [ ] `apps/web/src/components/health/PediatricianVisitSummaryModal.tsx`
- [ ] `apps/web/src/components/health/SymptomTriageRunner.tsx`

---

## 6. Acceptance Criteria & Verification Plan

1. **Typecheck & Lint Verification:**
   ```bash
   npm run typecheck
   npm run lint
   ```
   Both commands must exit with code `0`.

2. **Automated Test Suites:**
   ```bash
   npm test
   ```
   All unit and integration tests across `packages/shared`, `apps/api`, and `apps/web` must pass 100%.

3. **Zero User-Facing "Clinical" Jargon Verification:**
   - Verify that `LessonReaderView.tsx`, `LessonVideoPlayer.tsx`, `LifespanStageSelector.tsx`, `PillarsShowcase.tsx`, `DashboardNav.tsx`, `MobileNav.tsx`, and `AccountSettingsView.tsx` contain **zero** user-facing strings with the word `"Clinical"` or `"clinical"`.
   - Verify that each of the 3 Lesson Archetypes (`EVERYDAY_BEHAVIOR`, `CHILD_GROWTH_CONCEPT`, `PRACTICAL_FAMILY_GUIDE`) renders its distinct top banner and Part 1–4 headings inside the unified `<article data-testid="lesson-article-container">` blog post, with `LessonVideoPlayer` rendered below the blog post.

---

## 7. Role Boundaries & Prohibitions

- **Backend Agent:** Restricted strictly to `packages/shared/`, `packages/database/`, and `apps/api/`. Must not modify React components in `apps/web/`.
- **Frontend Agent:** Restricted strictly to `apps/web/` (and consuming `@alongside/shared`). Must not modify `apps/api/` or `packages/database/`.
- **Zero Autonomous Merging:** Per `AGENTS.md`, neither agent nor the CTO may merge the resulting Pull Request(s); PRs must be opened with plain-text descriptions targeting `main` and left open for human review and Squash Merge.

---

## 8. Definition of Done (DoD) Sign-Off Checklist
- [ ] All deliverables created and located in correct directories.
- [ ] Every Academy lesson resolves to one of the 3 `LessonArchetype` values (`EVERYDAY_BEHAVIOR`, `CHILD_GROWTH_CONCEPT`, `PRACTICAL_FAMILY_GUIDE`) and renders inside the single Unified Editorial Blog Post container.
- [ ] `LessonAdaptiveModuleRenderer`, `LessonToolBridges` (`Pin to Vault` / `Roleplay`), and `Copy Script` are removed from the lesson reader flow, and `LessonVideoPlayer` is positioned below the blog post.
- [ ] All user-facing `"Clinical"` / `"clinical"` labels and repetitive grounding boilerplate are replaced with warm, parent-friendly advisory language.
- [ ] `npm run typecheck` exits with code 0.
- [ ] `npm test` passes with 100% success across all workspaces.
- [ ] Ponytail diff review (`ponytail-review`) completed with zero speculative bloat.
- [ ] All commits adhere to Conventional Commits v1.0.0 standard.
