# Plan 10: 24/7 AI Child Advisor & Modern Parenting FAQ Vault API
**Plan ID:** `PLAN-10`  
**Assignee:** Backend Agent  
**Dependencies:** PLAN-04, PLAN-08  
**Estimated Scope:** Large  

---

## 1. Objective & Business Value

Implement the backend service for the **24/7 AI Child Advisor** ("Ask Alongside Anything") and the **Living Modern Parenting FAQ Vault** (100+ clinical and pediatric-reviewed scenarios). Features low-latency Server-Sent Events (SSE) token streaming, contextual RAG grounded in PostgreSQL vector embeddings, and dynamic prompt injection using the child's developmental tier, road type, and household friction points.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 3: Pillar 3 "24/7 AI Child Advisor & Modern Parenting FAQ Vault")
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Data Flow 3.3: Streaming RAG Flow)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 6: AI Advisor & FAQ Endpoints)
- **Database Schema:** [`docs/data-models.md`](../docs/data-models.md) (`AiConversation`, `AiMessage`, `FaqItem`, `FaqCategory`)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-04` (Child profiles) and `PLAN-08` (Academy modules) completed.
- **Dependencies:** Install `@fastify/sensible`, `openai` (or `@ai-sdk/openai`), and configure `OPENAI_API_KEY` in environment.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Living Modern Parenting FAQ Vault & Seed Data
1. Implement FAQ service in `apps/api/src/modules/faqs/faqs.service.ts`:
   - Search FAQs by keyword, category, developmental tier, and road type.
   - Vector similarity search against FAQ embeddings.
2. Implement comprehensive seed script in `packages/database/prisma/seed/faqs.seed.ts`:
   - 100+ expert-reviewed questions and answers organized across categories:
     - Device Decisions & Smartwatches
     - Social Media & Group Chats (Snapchat, Discord)
     - Gaming & Robux Microtransactions
     - Inappropriate Content & Online Safety
     - Bedtime Battles & Sleep Hygiene

### Task 2: Vector Embedding & Similarity Search
1. Implement embedding utility in `apps/api/src/modules/ai-advisor/embedding.service.ts`:
   - Generates text embeddings using `text-embedding-3-small`.
2. Implement semantic retrieval query against `FaqItem` table finding top 3 matching clinical guidelines for incoming parent prompts.

### Task 3: 24/7 AI Child Advisor Streaming Service (SSE)
1. Implement system prompt builder in `apps/api/src/modules/ai-advisor/prompt.builder.ts`:
   - Injects Alongside's authoritative mentorship philosophy ("Educate First, Partner Always, Enforce Neutrally").
   - Injects Child context: Name, Age, Developmental Tier (e.g. `TIER_2_AGES_10_11`), Road Type (`PRE_DEVICE` vs `ACTIVE_DEVICE`), and matched FAQ clinical scripts.
   - Emphasizes word-for-word conversational scripts and de-escalation cooldown periods.
2. Implement Fastify streaming endpoint `POST /api/v1/ai-advisor/chat`:
   - Sets headers `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`.
   - Streams chunks to client: `{ "type": "context", "matchedFaqs": [...] }`, `{ "type": "token", "content": "..." }`, `{ "type": "done" }`.
   - Persists user prompt and assistant response in `AiConversation` and `AiMessage`.

### Task 4: Automated Integration Testing
1. Author Vitest tests in `apps/api/tests/modules/ai-advisor/ai-advisor.test.ts`:
   - Search FAQs with filters -> returns matching items.
   - Contextual prompt builder -> verifies child tier and road type are correctly injected.
   - Chat endpoint -> verifies SSE stream delivery and conversation history persistence.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `packages/database/prisma/seed/faqs.seed.ts`
- [ ] `apps/api/src/modules/faqs/faqs.service.ts`
- [ ] `apps/api/src/modules/faqs/faqs.controller.ts`
- [ ] `apps/api/src/modules/faqs/faqs.routes.ts`
- [ ] `apps/api/src/modules/ai-advisor/embedding.service.ts`
- [ ] `apps/api/src/modules/ai-advisor/prompt.builder.ts`
- [ ] `apps/api/src/modules/ai-advisor/ai-advisor.service.ts`
- [ ] `apps/api/src/modules/ai-advisor/ai-advisor.controller.ts`
- [ ] `apps/api/src/modules/ai-advisor/ai-advisor.routes.ts`
- [ ] `apps/api/tests/modules/ai-advisor/ai-advisor.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Type Checking:**
   ```bash
   npm run typecheck --workspace=@alongside/api
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors.
2. **Seed Script Verification:**
   ```bash
   npm run db:seed --workspace=@alongside/database
   ```
   *Pass criteria:* Successfully loads 100+ FAQ items into database.
3. **SSE Streaming Verification:**
   *Pass criteria:* Integration test asserts stream emits events with `data: {"type": "token", ...}` and terminates with `{"type": "done"}`.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Backend Agent.
- ❌ **DO NOT** edit files in `apps/web/`.
- ❌ **DO NOT** write React chat components or client UI.
- ✅ Work exclusively inside `apps/api/` and `packages/database/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] 100+ Modern Parenting FAQs seeded.
- [ ] SSE streaming endpoint operational with child context injection.
- [ ] `npm run typecheck` exits with code 0.
- [ ] All automated tests pass.
- [ ] Commits adhere to Conventional Commits (`feat(ai): ...`).
