# Plan 20: AI Child Advisor Lifespan RAG & Voice Sparring Upgrade
**Plan ID:** `PLAN-20`  
**Assignee:** Joint (FE & BE)  
**Dependencies:** PLAN-10, PLAN-11, PLAN-16, PLAN-17, PLAN-18, PLAN-19  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-45  
**Status:** Completed & Verified — *Refactored to Non-Clinical in SOU-86*  

> [!NOTE]
> **NON-CLINICAL PARENTING ADVISOR TRANSITION (SOU-86):**
> As part of AlongSide's transition away from a clinical platform in task SOU-86, the AI Advisor and FAQ vault have been refactored to focus purely on developmental neurobiology, evidence-based milestone guidance, and collaborative parenting communication scripts. Clinical symptom triage claims have been retired.

---

## 1. Objective & Business Value

Upgrade AlongSide's **24/7 AI Child Advisor & Interactive Voice Sparring Simulator** to support the comprehensive v2.4.0 Whole-Child Lifespan and Pediatric Health domain.

The joint engineering team will:
- **Backend Agent:** Expand the Fastify `ai-advisor` module to ingest the full **Living Clinical Parenting FAQ Vault (250+ Scenarios)** spanning pediatric fever triage, infant solids, toddler tantrums, and peer dynamics into `pgvector`. Implement the **Clinical Safe Harbor Override Filter** detecting acute life-threat red flags (respiratory retractions, poisoning, infant fever <90d) to immediately halt speculative text generation and return emergency protocol directives. Inject rich multi-child contextual memory (age in months, developmental tier, dietary stage, known allergies, recent health logs) into LLM system prompts.
- **Frontend Agent:** Upgrade the Next.js **AI Voice Sparring Simulator** (`/advisor/sparring`) to provide 5 diverse, emotionally charged parenting scenarios spanning infancy through adolescence, accompanied by real-time vocal tone analysis and calming feedback.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 3: Pillar 6 "24/7 Clinical AI Advisor, Voice Sparring & 250+ Scenario FAQ Vault")
- **Technical Roadmap:** [`docs/technical-roadmap-v2.4.0.md`](../docs/technical-roadmap-v2.4.0.md) (Section 3 & Phase 5)
- **System Architecture:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Data Flow 4.3: Whole-Child Streaming RAG Flow)
- **Codebase Design Specification:** [`docs/codebase-design.md`](../docs/codebase-design.md) (Seam 2: 24/7 Clinical AI Advisor)
- **Primary Source Research:** [`docs/research/pediatric-health-triage-protocols.md`](../docs/research/pediatric-health-triage-protocols.md)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 6 & 12)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-10` (AI Advisor backend), `PLAN-11` (AI Advisor UI), and `PLAN-16` through `PLAN-19` completed.
- **Verification:** Ensure `/api/v1/ai-advisor/chat` SSE stream and `/api/v1/faqs` are responding cleanly.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Backend Whole-Child Clinical RAG & Emergency Shield (Backend Agent)
1. Ingest 250+ Curated FAQs into `packages/database/prisma/seed/faqs.seed.ts` categorized across:
   - `PEDIATRIC_HEALTH_AND_SLEEP` (Fevers, croup, RSV, ear infections, sleep regressions)
   - `NUTRITION_AND_FEEDING` (Infant solids, BLW spears, allergen safety, picky eating)
   - `DEVELOPMENT_AND_MILESTONES` (When he moves, speech bursts, cognitive growth)
   - `BEHAVIOR_AND_DISCIPLINE` (Tantrums, hitting, defiance, time-ins, boundary holding)
   - `MODERN_WORLD_AND_DEVICES` (Smartwatch bridge, Roblox, social media, bedtime locks)
2. Update `apps/api/src/modules/ai-advisor/ai-advisor.service.ts`:
   - Implement `ClinicalSafeHarborFilter`: Regex and semantic keyword detector for emergency red flags (e.g., "blue lips", "chest retractions", "swallowed battery", "infant fever 102").
   - When emergency detected: Halts LLM streaming, emits high-priority `type: "EMERGENCY_RED_FLAG"` SSE chunk with one-tap emergency dialer directive and nearest pediatric ER guidance.
   - Inject rich Child Context:
     ```typescript
     const childContext = `Child Profile:
     - Name: ${child.name}
     - Age: ${childAgeDescription} (Developmental Tier: ${child.developmentalTier})
     - Dietary Stage: ${child.dietaryStage}
     - Known Allergies: ${child.allergies.join(', ') || 'None'}
     - Recent Health Events: ${recentHealthLogs}`;
     ```
3. Update Vitest test suite `apps/api/test/ai-advisor.test.ts` to assert:
   - Clinical safe harbor emergency overrides.
   - Multi-child context grounding in streamed responses.

### Task 2: Frontend Voice Sparring Simulator Upgrade (Frontend Agent)
1. Upgrade `apps/web/src/components/advisor/VoiceSparringModal.tsx` to include 5 Lifespan Scenarios:
   - **Scenario 1 (Infant/Toddler):** *2:00 AM Teething & Fever Panic* — Rehearsing staying calm while soothing a crying, feverish toddler and remembering Barton Schmitt comfort protocols.
   - **Scenario 2 (Toddler/Preschool):** *Dinner Plate Resistance ("This dinner is gross!")* — Practicing holding the division of responsibility boundary without yelling or short-order cooking.
   - **Scenario 3 (Early Elementary):** *Biting / Hitting Sibling Confrontation* — Practicing blocking physical aggression with warmth: *"I won't let you hit. You are angry."*
   - **Scenario 4 (Tweens):** *Middle School Peer Exclusion* — Supporting an 11-year-old crying over being left out of a class group chat without overreacting.
   - **Scenario 5 (Adolescents):** *Bedtime Device Cutoff Resistance* — Neutral enforcement of the 8:30 PM hardware lockout without parental yelling.
2. Implement live feedback scoring:
   - AI evaluates parental tone, calmness, empathetic validation, and firmness on a 0–100 scale.
   - Provides instant de-escalation tips and recommended dialogue adjustments.

---

## 5. Specific Deliverables (Files to Create / Modify)

### `packages/database` & `apps/api`:
- [x] `packages/database/prisma/seed/faqs.seed.ts`
- [x] `apps/api/src/modules/ai-advisor/safe-harbor.filter.ts`
- [x] `apps/api/src/modules/ai-advisor/ai-advisor.service.ts`
- [x] `apps/api/src/modules/ai-advisor/ai-advisor.routes.ts`
- [x] `apps/api/test/ai-advisor.test.ts`

### `apps/web`:
- [x] `apps/web/src/components/advisor/VoiceSparringModal.tsx`
- [x] `apps/web/src/components/advisor/SparringScenarioCard.tsx`
- [x] `apps/web/src/components/advisor/SparringFeedbackCard.tsx`
- [x] `apps/web/src/components/advisor/ChatFeed.tsx`
- [x] `apps/web/test/voiceSparring.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Compilation & Typecheck:**
   ```bash
   npm run typecheck
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors across all workspaces.
2. **Clinical Emergency Override Verification:**
   *Pass criteria:* Inquiring with "My 2-month-old has a 101 fever and struggling to breathe" immediately emits the `EMERGENCY_RED_FLAG` SSE event with 911 emergency directives and halts speculative text generation.
3. **Voice Sparring Simulation:**
   *Pass criteria:* All 5 scenarios can be selected and rehearsed, delivering constructive feedback on parental tone and empathy validation.
4. **Ponytail Principle Diff Audit:**
   *Pass criteria:* Working diff audited via `ponytail-review` ensuring minimal diff size and zero speculative bloat.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Joint (FE & BE).
- Backend Agent owns `apps/api/src/modules/ai-advisor/` and `packages/database/prisma/seed/faqs.seed.ts`.
- Frontend Agent owns `apps/web/src/components/advisor/VoiceSparringModal.tsx`.
- Neither agent may compromise the Clinical Safe Harbor emergency override.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] 250+ FAQ Vault seeded across all 5 clinical categories.
- [x] Clinical Safe Harbor Emergency Override verified in Fastify API.
- [x] Multi-child contextual memory injected into AI streaming prompts.
- [x] Voice Sparring Simulator equipped with 5 lifespan rehearsal scenarios.
- [x] Automated integration and component tests pass with 100% success rate.
- [x] `npm run typecheck` exits with code 0.
- [x] Ponytail Principle diff audit passed.
- [x] Feature branch submitted as Pull Request targeting `main` with plain text (`.txt`) description.
