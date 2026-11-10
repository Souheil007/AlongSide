# Plan 18: Pediatric Health Triage & Nutrition Hub UI
**Plan ID:** `PLAN-18`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-16, PLAN-17  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-42 (To be delegated)  
**Status:** ✅ Complete & Verified (PR #27) — *Clinical Triage Retired in SOU-86*  

> [!NOTE]
> **RETIRED CLINICAL TRIAGE COMPONENTS (SOU-86):**
> As part of AlongSide's transition away from a clinical platform in task SOU-86, all clinical symptom triage runners, Barton Schmitt algorithms, and emergency clinical triage elements in `/health` have been permanently retired. The `/health` route has been refactored into a Restorative Sleep & Circadian Rhythms companion elevated into the Parent Intelligence Academy (`/academy?category=HEALTH_AND_WELLNESS`). The Pediatric Nutrition & Feeding Hub (`/nutrition`) remains active as a core lifestyle and feeding pillar.

---

## 1. Objective & Business Value

Build the client user interfaces in `apps/web/` for AlongSide's **Pediatric Health & Symptom Companion ("The Safe Resort")** and the **Pediatric Nutrition, Diet & Healthy Feeding Hub ("What to Eat")**.

The Frontend Agent will:
- Implement the interactive **3-Zone Clinical Triage Runner** (`/health`), allowing anxious parents to input symptoms (fever, rashes, barking cough, ear pulling, vomiting) and receive clear, medically conservative Barton Schmitt triage directives (Red, Yellow, or Green zone).
- Implement the **Clinical Safe Harbor Emergency Banner** with an instant, high-contrast one-tap 911 / Emergency Services dialer when acute life-threat red flags are detected.
- Implement the **Pediatric Antipyretic Dosing Calculator** providing precise weight-based acetaminophen and ibuprofen dosages with pediatric contraindication safeguards (strictly blocking ibuprofen in infants under 6 months and blocking aspirin for all minors).
- Implement the **Pediatric Nutrition & Feeding Hub** (`/nutrition`), featuring feeding stage selectors, baby-led weaning (BLW) finger food preparation guides, a safe early allergen introduction checklist (4–11 months), visual choking hazards warnings, and the Ellyn Satter Division of Responsibility interactive guide for picky eating.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Pillars 2 and 3)
- **Technical Roadmap:** [`docs/technical-roadmap-v2.4.0.md`](../docs/technical-roadmap-v2.4.0.md) (Section 3 & Phase 3)
- **System Architecture:** [`docs/system-architecture.md`](../docs/system-architecture.md) (HealthHub & NutritionHub)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Sections 12 and 13)
- **Primary Source Research:** [`docs/research/pediatric-health-triage-protocols.md`](../docs/research/pediatric-health-triage-protocols.md)
- **Frontend Autonomous Skill Matrix:** [`docs/frontend-skill-matrix.md`](../docs/frontend-skill-matrix.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-16` (Health & Nutrition REST endpoints) and `PLAN-17` (Multi-child context store and navigation shell) completed.
- **Verification:** Ensure `/api/v1/health/triage` and `/api/v1/nutrition/guides` endpoints are responding.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Pediatric Health & Symptom Companion (`apps/web/src/app/(dashboard)/health/`)
1. Implement `page.tsx` as the main Health Sanctuary layout:
   - Displays current child health summary (last fever check, active symptoms).
   - "Start Symptom Check" primary action button.
   - Quick symptom selector pills: Fever, Cough/Breathing, Earache, Rash, Vomiting/Stomach, Teething.
2. Implement `SymptomTriageRunner.tsx` in `apps/web/src/components/health/`:
   - Step 1: Select symptoms and enter temperature (optional rectal/oral/axillary toggle).
   - Step 2: Emergency Red-Flag screening questions (e.g. "Is child struggling to breathe?", "Is child unusually limp or unresponsive?").
   - Step 3: Calibrated Results Card:
     * **Red Zone UI:** High-contrast red alert card with large "Call 911 Immediately" button and nearest ER directions.
     * **Yellow Zone UI:** Warm amber card detailing pediatrician contact guidance and a 1-tap "Export Doctor Visit Summary" button.
     * **Green Zone UI:** Calming sage green card detailing supportive home care measures, hydration guidelines, and rest tips.
3. Implement `AntipyreticDosingCalculator.tsx`:
   - Inputs child weight (lbs/kg) and age.
   - Outputs precise liquid acetaminophen or ibuprofen dose (ml and mg) with dosing syringe visual guide.
   - Strict warning banners: "Never give Ibuprofen to infants under 6 months" and "Never give Aspirin to children or teens (Reye's syndrome risk)".
4. Implement `SleepRegressionCompanion.tsx`:
   - Age-based sleep regression timelines (4-month cycle maturation, 8-month, 18-month).
   - Nap transition schedules (3-to-2 naps, 2-to-1 nap, dropping naps).

### Task 2: Pediatric Nutrition & Feeding Hub (`apps/web/src/app/(dashboard)/nutrition/`)
1. Implement `page.tsx` in `apps/web/src/app/(dashboard)/nutrition/`:
   - Feeding stage selector tabs:
     * Stage 1: Exclusive Milk / Formula (0–6m)
     * Stage 2: Introducing Solids & BLW (6–12m)
     * Stage 3: Toddler Table & Conquering Picky Eating (1–5y)
     * Stage 4: Elementary School Fuel & Lunchboxes (6–12y)
     * Stage 5: Adolescent Athletic & Pubertal Nutrition (13–18y)
2. Implement `BabyLedWeaningGuide.tsx` in `apps/web/src/components/nutrition/`:
   - Visual safety guide for finger food prep: slicing round foods (grapes, hotdogs, cherry tomatoes) lengthwise into thin spears.
   - Clarifying gagging vs. choking (the normal infant gag reflex vs. silent airway obstruction).
   - Strict "NO HONEY before 12 months" infant botulism alert card.
3. Implement `AllergenIntroductionTracker.tsx`:
   - Track early introduction of top 8 allergens (thinned peanut butter, baked egg, dairy, fish, tree nuts, wheat, soy, sesame).
   - Frequency log ensuring repeated exposure (2–3 times weekly) to maintain immunological tolerance.
4. Implement `PickyEatingSolutions.tsx`:
   - Ellyn Satter Division of Responsibility visual framework: Parent decides *What, When, Where*; Child decides *If and How Much*.
   - Food chaining planner: Pairing one familiar "safe food" with one micro-exposure to a new vegetable.

---

## 5. Specific Deliverables (Files to Create / Modify)

### `apps/web`:
- [x] `apps/web/src/app/(dashboard)/health/page.tsx`
- [x] `apps/web/src/components/health/SymptomTriageRunner.tsx`
- [x] `apps/web/src/components/health/EmergencyRedFlagBanner.tsx`
- [x] `apps/web/src/components/health/AntipyreticDosingCalculator.tsx`
- [x] `apps/web/src/components/health/SleepRegressionCompanion.tsx`
- [x] `apps/web/src/components/health/PediatricianVisitSummaryModal.tsx`
- [x] `apps/web/src/app/(dashboard)/nutrition/page.tsx`
- [x] `apps/web/src/components/nutrition/BabyLedWeaningGuide.tsx`
- [x] `apps/web/src/components/nutrition/AllergenIntroductionTracker.tsx`
- [x] `apps/web/src/components/nutrition/ChokingHazardsWarningCard.tsx`
- [x] `apps/web/src/components/nutrition/PickyEatingSolutions.tsx`
- [x] `apps/web/test/healthTriageUI.test.ts`
- [x] `apps/web/test/nutritionHubUI.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Compilation & Typecheck:**
   ```bash
   npm run typecheck --workspace=@alongside/web
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors.
2. **Clinical Safety Verification:**
   *Pass criteria:* Inputting a fever of 100.4°F for an infant under 90 days immediately renders the Red Zone emergency card with the 911 one-tap dialer.
3. **Pediatric Dosing Accuracy:**
   *Pass criteria:* Selecting infant age <6 months disables the Ibuprofen tab with an explicit contraindication explanation.
4. **Ponytail Principle Diff Audit:**
   *Pass criteria:* Working diff audited via `ponytail-review` ensuring minimal component footprint and zero speculative bloat.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Frontend Agent.
- ❌ **DO NOT** edit backend files in `apps/api/` or database schemas in `packages/database/`.
- ❌ **DO NOT** hardcode medical advice; wire all content to backend endpoints matching `docs/api-specification.md`.
- ✅ Work strictly inside `apps/web/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] 3-Zone Symptom Triage Runner functional with Barton Schmitt decision logic.
- [x] Emergency Red-Flag banner with one-tap 911 dialer verified.
- [x] Weight-based Antipyretic Dosing Calculator verified with contraindication guards.
- [x] Nutrition Hub with BLW safety guides and Allergen Tracker operational.
- [x] Automated Vitest component tests pass with 100% success rate.
- [x] `npm run typecheck` exits with code 0.
- [x] Ponytail Principle diff audit passed.
- [x] Feature branch submitted as Pull Request targeting `main` with plain text (`.txt`) description (PR #27 merged).
