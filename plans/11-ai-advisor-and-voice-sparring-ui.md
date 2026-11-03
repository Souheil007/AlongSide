# Plan 11: 24/7 AI Advisor Chat, Living FAQ Explorer & Sparring UI
**Plan ID:** `PLAN-11`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-03, PLAN-10  
**Estimated Scope:** Medium  

---

## 1. Objective & Business Value

Build the real-time **24/7 AI Child Advisor** conversational chat interface in `apps/web/`, supporting streaming token rendering (SSE), situational quick-prompts ("What to say right now during an explosive argument"), the searchable **Living Modern Parenting FAQ Explorer** (100+ scenarios), and the interactive **AI Voice Sparring Simulator** rehearsal interface.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 3: Pillar 3)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Client Layer)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 6: AI Advisor & FAQ Endpoints)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-03` (Frontend scaffold) and `PLAN-10` (AI Advisor backend API & FAQ vault) completed.
- **Verification:** Ensure `/api/v1/ai-advisor/chat` SSE stream and `/api/v1/faqs` are responding.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Real-Time Streaming Chat Interface
1. Implement custom hook `useAiAdvisorChat.ts` in `apps/web/src/hooks/`:
   - Uses `EventSource` or `fetch` with `ReadableStream` to consume SSE tokens chunk-by-chunk.
   - Manages messages array, active streaming buffer, and matched FAQ reference pills.
2. Implement `apps/web/src/components/advisor/ChatFeed.tsx`:
   - Empathetic chat bubbles with distinct styling for parent and AlongSide AI.
   - Formatted word-for-word conversation script callouts with "Copy Script" button.
3. Implement `apps/web/src/components/advisor/QuickPrompts.tsx`:
   - 1-tap situational starters:
     - *"My 10yo wants Snapchat because everyone has it"*
     - *"Caught my child on phone past curfew"*
     - *"Child slammed door during screen shutoff"*

### Task 2: Living Modern Parenting FAQ Explorer
1. Implement `apps/web/src/app/(dashboard)/advisor/faqs/page.tsx`:
   - Search input with debounce.
   - Category filter pills (Devices, Social Media, Gaming, Scary Content, Bedtime).
   - Expandable FAQ cards featuring clinical answers and de-escalation scripts.

### Task 3: Interactive Voice Sparring Simulator UI
1. Implement `apps/web/src/components/advisor/VoiceSparringModal.tsx`:
   - Rehearsal simulator where parents practice handling an upset child.
   - Audio waveform animation and prompt scenarios (Scenario A: Begging for phone; Scenario B: Bedtime refusal; Scenario C: Accusing parent of spying).
   - Real-time coaching tips on tone and boundary firmness.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `apps/web/src/hooks/useAiAdvisorChat.ts`
- [ ] `apps/web/src/components/advisor/ChatFeed.tsx`
- [ ] `apps/web/src/components/advisor/QuickPrompts.tsx`
- [ ] `apps/web/src/components/advisor/FaqSearchCard.tsx`
- [ ] `apps/web/src/components/advisor/VoiceSparringModal.tsx`
- [ ] `apps/web/src/app/(dashboard)/advisor/page.tsx`
- [ ] `apps/web/src/app/(dashboard)/advisor/faqs/page.tsx`

---

## 6. Acceptance Criteria & Verification Plan

1. **Frontend Compilation:**
   ```bash
   npm run typecheck --workspace=@alongside/web
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors.
2. **Streaming Text Verification:**
   *Pass criteria:* Asking a question streams response tokens smoothly without layout shifts or text flicker.
3. **FAQ Search Verification:**
   *Pass criteria:* Searching for "Roblox" instantly filters FAQ items to gaming & microtransaction questions.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Frontend Agent.
- ❌ **DO NOT** edit backend files in `apps/api/` or manage OpenAI API keys on client.
- ❌ **DO NOT** touch Prisma database schemas.
- ✅ Work exclusively inside `apps/web/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] Real-time SSE streaming rendered smoothly.
- [ ] Living FAQ Explorer searchable by keyword and category.
- [ ] Voice Sparring UI modal functional with scenario selection.
- [ ] `npm run typecheck` exits with code 0.
- [ ] Commits adhere to Conventional Commits (`feat(web): ...`).
