# Plan 19: Brain Games, Puppets & Behavioral Psychology UI
**Plan ID:** `PLAN-19`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-16, PLAN-17  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-43 (To be delegated)  
**Status:** Queued  

---

## 1. Objective & Business Value

Build the client user interfaces in `apps/web/` for AlongSide's **Brain Games, Sensory Play & Early Toys Hub ("Puppets & Brain Games")** and the **Behavioral Psychology & Cultural Advisor Hub ("Translating Tantrums to Needs")**.

The Frontend Agent will:
- Implement the interactive **Brain Games & Play Enrichment Hub** (`/brain-games`), providing age-indexed purposeful play activities grounded in Harvard Center on the Developing Child ("Serve and Return") research and Montessori principles:
  * Infancy & Toddlerhood (0–3): Animal puppet theater, sensory bins, high-contrast cards, and cause-and-effect stacking.
  * Preschool & Early Childhood (4–6): Open-ended wooden unit blocks, Magna-Tiles construction challenges, and dramatic roleplay.
  * Middle Childhood & Pre-Teens (7–12): Strategic board games (Chess, Catan), logic riddles, and spatial brain teasers.
  * Adolescents & Teens (13–18): Maker challenges, science experiments, and creative writing sparks.
- Implement the **"Boredom Buster" Protocol Generator**, helping parents embrace boredom as a healthy neurological catalyst for creativity without defaulting to screen rescue.
- Implement the **Behavioral Psychology & Cultural Advisor Hub** (`/behavior`), featuring the interactive **HALT Diagnostic** (translating tantrums into Hungry, Anxious/Angry, Lonely, or Tired needs), word-for-word calming de-escalation scripts, and authoritative parenting frameworks ("Time-Ins" and firm boundaries with warmth).

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Pillars 4 and 5)
- **Technical Roadmap:** [`docs/technical-roadmap-v2.4.0.md`](../docs/technical-roadmap-v2.4.0.md) (Section 3 & Phase 4)
- **System Architecture:** [`docs/system-architecture.md`](../docs/system-architecture.md) (PlayHub & BehaviorHub)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Sections 14 and 15)
- **Frontend Autonomous Skill Matrix:** [`docs/frontend-skill-matrix.md`](../docs/frontend-skill-matrix.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-16` (Brain games & behavior API endpoints) and `PLAN-17` (Multi-child context store and navigation shell) operational.
- **Verification:** Ensure `/api/v1/brain-games` and `/api/v1/behavior/guides` endpoints are responding.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Brain Games, Sensory Play & Early Toys Hub (`apps/web/src/app/(dashboard)/brain-games/`)
1. Implement `page.tsx` in `apps/web/src/app/(dashboard)/brain-games/`:
   - Active child play banner: "Today's Brain Game for [Child Name]".
   - Filter pills by category: Puppets & Face-to-Face, Sensory Bins, Blocks & Construction, Logic Riddles, Chess & Strategy, Boredom Busters.
2. Implement `DailyBrainGameCard.tsx` in `apps/web/src/components/brain-games/`:
   - Displays today's recommended activity with estimated time, required materials, and targeted neurodevelopmental skill badge (e.g. "Mirror Neurons", "Spatial Geometry", "Working Memory").
   - 1-tap "We Played This!" completion button triggering cheerful micro-celebration animation.
3. Implement `PuppetTheaterGuide.tsx`:
   - Interactive visual guide on using soft animal hand puppets for vocal mirroring, turn-taking, and soothing bedtime routines.
4. Implement `BoredomBusterGenerator.tsx`:
   - Random screen-free creative challenge generator: providing a random prompt using simple household materials (cardboard, masking tape, markers, water).
   - Includes parental guidance: "How to survive the 15-minute whining period before deep imaginative play begins."

### Task 2: Behavioral Psychology & Cultural Advisor Hub (`apps/web/src/app/(dashboard)/behavior/`)
1. Implement `page.tsx` in `apps/web/src/app/(dashboard)/behavior/`:
   - Search input for behavioral dilemmas (e.g. "tantrum at bedtime", "hitting little brother", "whining in car").
   - Quick situation buttons: Tantrums & Meltdowns, Defiance & "No!", Hitting & Biting, Sibling Fighting, Lying & Secrecy.
2. Implement `HaltDiagnosticModal.tsx` in `apps/web/src/components/behavior/`:
   - Quick 4-step checklist: Is the child **H**ungry? **A**nxious or Angry? **L**onely (needing connection)? **T**ired?
   - Outputs immediate regulation recommendation before attempting discipline.
3. Implement `DeEscalationScriptCard.tsx`:
   - Empathetic script card featuring word-for-word dialogue callouts:
     * *What NOT to say* (e.g., "Stop crying right now or no dessert!").
     * *What TO say* (e.g., "I won't let you hit. You are angry. I am right here with you until your body feels calm.").
   - "Copy Script" button with toast notification.
4. Implement `AuthoritativeParentingGuide.tsx`:
   - High Warmth + High Boundaries framework.
   - Explaining "Time-Ins" (staying physically close to co-regulate) vs. punitive isolation.
   - Physiological reset breath visual guide for dysregulated parents.

---

## 5. Specific Deliverables (Files to Create / Modify)

### `apps/web`:
- [ ] `apps/web/src/app/(dashboard)/brain-games/page.tsx`
- [ ] `apps/web/src/components/brain-games/DailyBrainGameCard.tsx`
- [ ] `apps/web/src/components/brain-games/PuppetTheaterGuide.tsx`
- [ ] `apps/web/src/components/brain-games/BoredomBusterGenerator.tsx`
- [ ] `apps/web/src/components/brain-games/PlayActivityCatalog.tsx`
- [ ] `apps/web/src/app/(dashboard)/behavior/page.tsx`
- [ ] `apps/web/src/components/behavior/HaltDiagnosticModal.tsx`
- [ ] `apps/web/src/components/behavior/DeEscalationScriptCard.tsx`
- [ ] `apps/web/src/components/behavior/AuthoritativeParentingGuide.tsx`
- [ ] `apps/web/test/brainGamesUI.test.ts`
- [ ] `apps/web/test/behaviorHubUI.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Compilation & Typecheck:**
   ```bash
   npm run typecheck --workspace=@alongside/web
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors.
2. **Age-Adaptive Play Rendering:**
   *Pass criteria:* Viewing the hub with an infant (14mo) shows puppet theater and sensory bins; switching to a 10yo shows logic riddles and chess strategies.
3. **Script Copy & Accessibility:**
   *Pass criteria:* Clicking "Copy Script" copies the exact empathy dialogue to clipboard; all cards meet WCAG 2.1 AA contrast standards.
4. **Ponytail Principle Diff Audit:**
   *Pass criteria:* Working diff audited via `ponytail-review` ensuring minimal component footprint and zero speculative bloat.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Frontend Agent.
- ❌ **DO NOT** edit backend files in `apps/api/` or database schemas in `packages/database/`.
- ❌ **DO NOT** author raw SQL queries or Fastify route handlers.
- ✅ Work strictly inside `apps/web/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] Brain Games Hub operational with category filters and "We Played This!" tracking.
- [ ] Puppet Theater guide and Boredom Buster generator functional.
- [ ] Behavior Hub operational with HALT diagnostic and copyable de-escalation scripts.
- [ ] Automated Vitest component tests pass with 100% success rate.
- [ ] `npm run typecheck` exits with code 0.
- [ ] Ponytail Principle diff audit passed.
- [ ] Feature branch submitted as Pull Request targeting `main` with plain text (`.txt`) description.
