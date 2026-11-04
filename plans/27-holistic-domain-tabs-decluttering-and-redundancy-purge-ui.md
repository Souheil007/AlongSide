# Plan 27: Holistic Domain Tabs Decluttering & Redundancy Purge UI
**Plan ID:** `PLAN-27`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-18, PLAN-19, PLAN-25, PLAN-26  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-60 (or assigned)  

---

## 1. Objective & Business Value

Following CEO feedback in task **SOU-57**, this plan performs a thorough decluttering and redundancy purge across all core domain tabs (`Health`, `Nutrition`, `Play`, `Behavior`, and `Devices`).

Currently:
1. **Nutrition:** Renders 5 full-width lifespan feeding stages across the top of the page simultaneously, forcing a parent of a 14-month-old toddler to stare at "Pubertal Growth & Athletics" and "Milk Only".
2. **Play:** Displays manual tier filter buttons ("All Ages", "0-2", "3-5", etc.) instead of automatically presenting activities for the active child.
3. **Behavior:** Displays 7 horizontal dilemma buttons spanning all ages, forcing parents to scan through irrelevant age issues.
4. **Devices & Culture Digest:** Sunday Culture Digest is triplicated across the platform (Header dropdown, User dropdown, and Devices Hub Tab 4).
5. **Health:** Overwhelms anxious parents with walls of clinical text and redundant warning banners.

This plan declutters each domain tab to deliver an effortless, calm, and tailored user experience where content is automatically filtered to the active child's age while preserving secondary exploration.

---

## 2. Inputs & Architectural References

- **Streamlined Navigation & Tab Decluttering Spec:** [`docs/streamlined-navigation-and-tab-decluttering-spec.md`](../docs/streamlined-navigation-and-tab-decluttering-spec.md)
- **Automatic Child Age Derivation:** [`plans/26-automatic-child-age-derivation-and-domain-sync-ui.md`](26-automatic-child-age-derivation-and-domain-sync-ui.md)
- **Canonical Product Scope:** [`docs/PROJECT_SCOPE.md`](../docs/PROJECT_SCOPE.md)
- **Frontend Autonomous Skill Matrix:** [`docs/frontend-skill-matrix.md`](../docs/frontend-skill-matrix.md)

---

## 3. Preconditions & Dependency Verification

- Plan 25 (Streamlined Navigation) and Plan 26 (Automatic Child Age Derivation with `useChildAge`) are complete.
- `apps/web/src/components/health/**`, `nutrition/**`, `brain-games/**`, `behavior/**`, and `devices/**` exist and compile.
- `npm run typecheck` exits with code 0.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Nutrition Hub Decluttering & Developmental Stage Auto-Focus
1. In `apps/web/src/components/nutrition/NutritionDashboardView.tsx`:
   - Consume `useChildAge()`.
   - **Auto-select the active child's recommended feeding stage** (`childAge.feedingStage`).
   - Remove the prominent 5-stage button bar from the top hero banner.
   - Replace with a calm stage badge:
     ```tsx
     <div className="flex items-center gap-2">
       <span className="text-sm font-bold text-white">{currentGuide.stageName}</span>
       <Badge variant="outline" className="text-[10px] bg-emerald-500/20 text-emerald-200 border-emerald-400/40">
         Calibrated for {childAge.name} ({childAge.ageDisplay})
       </Badge>
     </div>
     ```
   - Place an unobtrusive expandable drawer or select menu: `"Explore other developmental stages (0–18)"` for parents wanting to look ahead or behind.
   - Filter subtabs contextually:
     * For children $\ge 3$ years: Default to balanced meals, collapse/hide Baby-Led Weaning.
     * For infants $< 1$ year: Highlight BLW and Safe Allergen Introduction.

### Task 2: Play Hub Decluttering & Age-Tier Auto-Filtering
1. In `apps/web/src/components/brain-games/PlayActivityCatalog.tsx`:
   - Consume `useChildAge()`.
   - Auto-set the active tier filter to `childAge.developmentalTier`.
   - Remove the 6 manual tier filter buttons (`TIER_FILTERS`) from the primary view.
   - Render a sleek active filter chip:
     `Showing purposeful play for {childAge.name} • {childAge.ageDisplay}` with a toggle button `View All Ages`.
2. In `apps/web/src/components/brain-games/BrainGamesDashboardView.tsx`:
   - Streamline header badges and category pills to reduce visual clutter.

### Task 3: Behavior Hub Decluttering & Age-Prioritized Dilemmas
1. In `apps/web/src/components/behavior/BehaviorDashboardView.tsx`:
   - Consume `useChildAge()`.
   - Auto-filter dilemma scripts to `childAge.developmentalTier`.
   - Instead of rendering all 7 dilemma buttons (`SITUATION_BUTTONS`) equally, surface the top 3-4 dilemmas calibrated for the child's age:
     * Toddler / Preschool: Tantrums & Meltdowns, Defiance & "No!", Hitting & Biting.
     * Elementary: Sibling Fighting, Lying & Secrecy, Bedtime Stalls.
     * Pre-Teen / Teen: Digital Defiance, Group Chat Drama, Secrecy & Autonomy.
   - Provide a clean "Browse all dilemmas" dropdown for other situations.
   - Ensure the 1-tap HALT diagnostic ("Hungry, Angry, Lonely, Tired") is immediately visible and accessible.

### Task 4: Devices Hub & Sunday Culture Digest Consolidation
1. In `apps/web/src/components/devices/DevicesManagementView.tsx`:
   - Polish Tab 4: "Youth Culture & Slang Radar" so it serves as the canonical home for weekly youth slang terms, exploit alerts, and dinner table conversation starters.
   - In `apps/web/src/app/(dashboard)/digest/page.tsx`:
     - Clean up the standalone `/digest` page to seamlessly integrate with Devices Hub or redirect to `/devices?tab=digest`.
2. Auto-calibrate curfew recommendations in `DevicesManagementView`:
   - Pre-select 8:00 PM for kids under 9, 8:30 PM for kids 9–12, and 9:30 PM for teens.

### Task 5: Health Hub Hero & Clinical Copy Streamlining
1. In `apps/web/src/components/health/HealthDashboardView.tsx`:
   - Shorten the hero text to a crisp 2-sentence clinical reassurance.
   - Remove repetitive symptom links that appear in both the hero and quick launcher.
   - Ensure the 3 subtabs ("Symptom Triage", "Dosing Calculator", "Sleep Regression") remain clean, distinct, and zero-clutter.

### Task 6: Automated Test Suite Verification
1. Create `apps/web/test/tabDecluttering.test.ts`:
   - Verify Nutrition Hub automatically selects `TODDLER_TABLE` for a 2-year-old child and hides non-essential stages by default.
   - Verify Play Catalog automatically filters activities to the child's developmental tier.
   - Verify Behavior Hub surfaces age-calibrated dilemma scenarios.
   - Verify Devices Hub renders the integrated Culture & Slang Radar without requiring a separate disjointed tab.
   - Assert `npm run typecheck` and `vitest` pass with 100% success.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `apps/web/src/components/nutrition/NutritionDashboardView.tsx`: Stage auto-selection, collapsed 5-stage selector, contextual subtabs.
- [ ] `apps/web/src/components/brain-games/PlayActivityCatalog.tsx`: Auto-tier filtering, decluttered filter chips.
- [ ] `apps/web/src/components/behavior/BehaviorDashboardView.tsx`: Age-calibrated dilemma prioritization, auto-tier filter.
- [ ] `apps/web/src/components/devices/DevicesManagementView.tsx`: Consolidated Youth Culture & Slang Radar, auto-curfew calibration.
- [ ] `apps/web/src/components/health/HealthDashboardView.tsx`: Streamlined hero copy and unified triage tabs.
- [ ] `apps/web/test/tabDecluttering.test.ts`: Automated test suite verifying decluttered behavior across all 5 domain tabs.

---

## 6. Acceptance Criteria & Verification Plan

1. **Nutrition Calm:** Navigating to `/nutrition` immediately shows the active child's feeding recommendations without presenting 5 competing stage tabs.
2. **Play Catalog Personalization:** Navigating to `/brain-games` displays activities matching the child's developmental tier by default.
3. **Behavior Relevance:** Navigating to `/behavior` surfaces scenarios relevant to the child's age bracket.
4. **Culture Digest Consolidation:** Youth slang and exploit alerts are accessible directly within Devices Hub.
5. **Testing Verification:**
   ```bash
   npm run typecheck
   npm run test apps/web/test/tabDecluttering.test.ts
   ```

---

## 7. Role Boundaries & Prohibitions

- **Assigned Agent:** `Frontend Agent`.
- ❌ **DO NOT** delete the underlying data sets for other stages (parents must always be able to view them via "Explore all stages").
- ❌ **DO NOT** edit backend Fastify routes or database schemas.
- ❌ **DO NOT** install new dependencies.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] `npm run typecheck` exits with code 0 across the monorepo.
- [ ] `vitest` unit tests pass with 100% success.
- [ ] PR description written in plain text (`.txt`) adhering to Conventional Commits.
- [ ] Ponytail audit completed: smallest complete change, no speculative bloat.
