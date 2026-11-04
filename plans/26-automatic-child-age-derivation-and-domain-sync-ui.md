# Plan 26: Automatic Child Age Derivation & Domain Sync UI
**Plan ID:** `PLAN-26`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-04, PLAN-05, PLAN-16, PLAN-25  
**Estimated Scope:** Medium  
**Paperclip Issue:** SOU-59 (or assigned)  

---

## 1. Objective & Business Value

Following CEO feedback in task **SOU-57**, this plan implements the **Zero-Redundant-Age Architecture** across AlongSide.

When a parent registers or adds a child profile, the platform captures their age and birth month/year. The system continuously tracks their growth and knows their exact age every day. However, several domain tools currently violate this contract:
- `AntipyreticDosingCalculator.tsx` renders a manual numeric `<input id="age-months-input" />` asking parents: "Child Age (Months)".
- Other tools require parents to re-declare age or select age tiers manually.

This breaks the intelligent parenting OS experience. This plan introduces a centralized, reactive `useChildAge` hook and refactors all domain tools to automatically derive age in months, age in years, developmental tier, estimated weight, and pediatric contraindications directly from the active child profile—**never prompting parents for child age again**.

---

## 2. Inputs & Architectural References

- **Streamlined Navigation & Zero-Redundant-Age Spec:** [`docs/streamlined-navigation-and-tab-decluttering-spec.md`](../docs/streamlined-navigation-and-tab-decluttering-spec.md)
- **Codebase Design (Deep Modules & Seams):** [`docs/codebase-design.md`](../docs/codebase-design.md)
- **Child Context Store:** `apps/web/src/stores/useChildContextStore.ts`
- **Pediatric Health & Triage Spec:** [`docs/system-architecture.md`](../docs/system-architecture.md)

---

## 3. Preconditions & Dependency Verification

- `useChildContextStore` is operational with `ChildDTO` models storing `age`, `birthYear`, and `birthMonth`.
- `AntipyreticDosingCalculator.tsx` and `HealthDashboardView.tsx` are mounted and functioning.
- `npm run typecheck` passes with zero errors.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Implement the Authoritative `useChildAge` Hook
1. Create `apps/web/src/hooks/useChildAge.ts`:
   - Deep custom hook that reads `activeChild` from `useChildContextStore`.
   - Calculates:
     - `ageMonths`: Exact months elapsed if `birthYear` and `birthMonth` exist, or `age * 12 + 6`.
     - `ageYears`: Exact full years.
     - `ageDisplay`: Formatted string (e.g. `< 24` months $\to$ `"X mo"`, $\ge 24$ months $\to$ `"Y yrs"`).
     - `estimatedWeightLbs`: Barton Schmitt pediatric formula:
       * $< 12$ months: $\max(8, \text{round}(8 + 1.2 \times \text{ageMonths}))$.
       * $1$ year: $24$ lbs.
       * $\ge 2$ years: $\text{round}(20 + \text{ageYears} \times 5)$ lbs.
     - `developmentalTier`: Auto-derived tier (`INFANT_TODDLER`, `EARLY_CHILDHOOD`, `MIDDLE_CHILDHOOD`, `PRE_TEEN`, `TEEN`).
     - `feedingStage`: Recommended `NutritionStage` mapped to age.
     - `isUnder6Months`: Strict safety gate (contraindicates Ibuprofen).
     - `isAutoCalibrated`: Boolean indicating active child data was used.
   - Handles fallback states gracefully when no child is selected (defaults to 14 months / 24 lbs with `isAutoCalibrated: false`).

### Task 2: Refactor `AntipyreticDosingCalculator.tsx` to Eliminate Manual Age Input
1. In `apps/web/src/components/health/AntipyreticDosingCalculator.tsx`:
   - Import and invoke `useChildAge()`.
   - **Delete** the manual numeric input `<input id="age-months-input" />` and its surrounding state/label.
   - Replace with an informative, read-only calibration badge:
     ```tsx
     <div className="flex items-center justify-between rounded-xl border border-teal-200 bg-teal-50/70 p-3">
       <div className="flex items-center gap-2">
         <ShieldCheck className="h-4 w-4 text-teal-600" />
         <span className="text-xs font-semibold text-teal-900">
           {childAge.name} • {childAge.ageDisplay} ({childAge.ageMonths} months)
         </span>
       </div>
       <Badge variant="outline" className="text-[10px] bg-white text-teal-700 border-teal-300 font-bold">
         Auto-Calibrated
       </Badge>
     </div>
     ```
   - Automatically initialize weight from `childAge.estimatedWeightLbs`, allowing parents to adjust weight if known, while age remains locked to the verified profile.
   - Enforce the 6-month safety gate: if `childAge.isUnder6Months`, Ibuprofen is automatically disabled/unselectable with an explicit pediatric warning: *"Ibuprofen is strictly contraindicated for infants under 6 months. Acetaminophen is selected."*

### Task 3: Sync Child Age Auto-Derivation to Health Dashboard
1. In `apps/web/src/components/health/HealthDashboardView.tsx`:
   - Replace ad-hoc local calculations with `useChildAge()`.
   - Pass the derived `childAge.ageMonths` and `childAge.estimatedWeightLbs` directly into `AntipyreticDosingCalculator` and triage components.
   - Display active child's live age badge in the hero banner.

### Task 4: Automated Test Suite Verification
1. Create `apps/web/test/childAgeDerivation.test.ts`:
   - Test infant $< 6$ months: verifies exact month calculation, Ibuprofen contraindication flag = true, and weight estimate $\approx 12$–$15$ lbs.
   - Test toddler 14 months: verifies `ageDisplay === '14 mo'`, weight estimate $= 24$ lbs.
   - Test child 7 years: verifies `ageDisplay === '7 yrs'`, weight estimate $= 55$ lbs.
   - Test adolescent 14 years: verifies `ageDisplay === '14 yrs'`, pubertal feeding stage.
   - Test fallback when no active child is present: returns safe default values without throwing exceptions.
   - Assert `npm run typecheck` and `vitest` pass with 100% success.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `apps/web/src/hooks/useChildAge.ts`: Centralized, reactive child age derivation hook.
- [ ] `apps/web/src/components/health/AntipyreticDosingCalculator.tsx`: Removed manual age input, added auto-calibration badge.
- [ ] `apps/web/src/components/health/HealthDashboardView.tsx`: Refactored to consume `useChildAge`.
- [ ] `apps/web/test/childAgeDerivation.test.ts`: Automated test suite for age derivation & pediatric formulas.

---

## 6. Acceptance Criteria & Verification Plan

1. **Zero Age Input:** Navigating to Health $\to$ Dosing Calculator presents NO input field asking for age or months. The child's age is automatically populated and displayed.
2. **Safety Enforcement:** For an infant under 6 months, Ibuprofen is locked/disabled and Acetaminophen is selected with a clear clinical warning.
3. **Weight Calibration:** Weight default is automatically pre-filled using Barton Schmitt pediatric formula based on child's tracked age.
4. **Testing Verification:**
   ```bash
   npm run typecheck
   npm run test apps/web/test/childAgeDerivation.test.ts
   ```

---

## 7. Role Boundaries & Prohibitions

- **Assigned Agent:** `Frontend Agent`.
- ❌ **DO NOT** modify backend schemas or database tables.
- ❌ **DO NOT** remove the ability for parents to fine-tune child weight (weight fluctuates and parent precision is clinically valuable).
- ❌ **DO NOT** use external age calculation packages; use native TypeScript `Date` arithmetic.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] `npm run typecheck` exits with code 0.
- [ ] `vitest` unit tests pass with 100% success.
- [ ] PR description written in plain text (`.txt`) adhering to Conventional Commits.
- [ ] Ponytail audit completed: smallest complete change, no speculative bloat.
