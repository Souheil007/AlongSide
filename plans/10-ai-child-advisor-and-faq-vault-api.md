# Plan 10: 24/7 AI Child Advisor & Modern Parenting FAQ Vault API
**Plan ID:** `PLAN-10`  
**Assignee:** Backend Agent  
**Dependencies:** PLAN-04, PLAN-08  
**Estimated Scope:** Large  
**Status:** Complete (Verified & Merged in PR #23)  
**Paperclip Issue:** SOU-34 (SOU-37)  

---

## 1. Objective & Business Value

Implement the production backend service for AlongSide's **24/7 AI Child Advisor** ("Ask Alongside Anything") and the **Living Modern Parenting FAQ Vault** (100+ clinical and pediatric-reviewed scenarios). 

The service features:
- **Resilient Multi-LLM Fallback Pipeline:** A robust, zero-downtime failover ladder orchestrated via deep module seams:
  1. **Primary:** OpenAI (`OPENAI_API_KEY`, configurable model e.g. `gpt-4o-mini` / `gpt-4o`)
  2. **Fallback 1:** Google Gemini (`GEMINI_API_KEY`, configurable model e.g. `gemini-1.5-flash` / `gemini-2.5-flash`)
  3. **Fallback 2:** Mistral AI (`MISTRAL_API_KEY`, using model `MISTRAL_MODEL=open-mistral-7b`)
  4. **Test Fake:** `DeterministicAiAdvisorFake` / `InMemoryLlmFake` for deterministic, zero-cost CI integration tests.
- **Low-Latency Server-Sent Events (SSE) Token Streaming:** Continuous token streaming (`text/event-stream`) for conversational chat and sparring without client disconnection.
- **Contextual RAG & Prompt Grounding:** Dynamic prompt injection using the child's developmental tier, road type (`PRE_DEVICE` vs `ACTIVE_DEVICE`), and top-matching clinical guidelines from the 100+ FAQ Vault.
- **Tenant Isolation & Conversation Persistence:** Stores conversation threads (`AiConversation`) and message histories (`AiMessage`) scoped to authenticated parent accounts.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 3: Pillar 3 "24/7 AI Child Advisor & Modern Parenting FAQ Vault")
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Data Flow 3.3: Streaming RAG Flow)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 6: AI Advisor & FAQ Endpoints)
- **Data Models:** [`docs/data-models.md`](../docs/data-models.md) (`AiConversation`, `AiMessage`, `FaqItem`, `FaqCategory`)
- **Codebase Design & Seam Catalog:** [`docs/codebase-design.md`](../docs/codebase-design.md) (Seam 2: 24/7 AI Child Advisor & Vector FAQ Retrieval)
- **Backend Protocol:** [`docs/backend-skill-matrix.md`](../docs/backend-skill-matrix.md)
- **Engineering Principles:** The Ponytail Principle (`.agents/rules/04-code-quality-and-testing.md`)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites Complete:**
  - `PLAN-04` (Child profile CRUD & developmental tiers): Verified in `apps/api/src/modules/children/`.
  - `PLAN-08` (Academy modules & youth culture digest): Verified in `apps/api/src/modules/academy/` and `apps/api/src/modules/digest/`.
- **Environment Variables:**
  - `OPENAI_API_KEY` (Primary provider)
  - `OPENAI_MODEL` (Default: `gpt-4o-mini`)
  - `GEMINI_API_KEY` (Fallback provider 1)
  - `GEMINI_MODEL` (Default: `gemini-1.5-flash`)
  - `MISTRAL_API_KEY` (Fallback provider 2)
  - `MISTRAL_MODEL` (Default: `open-mistral-7b`)
- **Dependencies:** Install `@fastify/sensible` (already present), and support adapters via native HTTP fetch or official SDKs without unnecessary bloat.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Living Modern Parenting FAQ Vault & Seed Data (100+ Scenarios)
1. Implement FAQ Repository and Service in `apps/api/src/modules/faqs/`:
   - `faqs.repository.ts`: Repository seam (`FaqRepository`) with `PrismaFaqRepository` and `InMemoryFaqRepository`.
   - `faqs.service.ts`: Domain service supporting search by keyword, category slug, developmental tier (`TIER_1_AGES_8_9` through `TIER_4_AGES_14_PLUS`), and road type (`PRE_DEVICE` vs `ACTIVE_DEVICE`).
   - `faqs.controller.ts`: Query validation and serialization.
   - `faqs.routes.ts`: Fastify plugin registering `GET /api/v1/faqs` and `GET /api/v1/faqs/categories`.
2. Author comprehensive seed script in `packages/database/prisma/seed/faqs.seed.ts`:
   - 100+ clinical and pediatric-reviewed scenarios across all 5 core categories:
     1. **Device Decisions & Smartwatches:** First phone age guidelines, smartwatch vs smartphone tradeoffs, school district policies.
     2. **Social Media & Group Chats:** Snapchat streak pressure, Discord server safety, TikTok algorithm rabbit holes, group chat exclusions.
     3. **Gaming & Microtransactions:** Roblox Robux pressures, Fortnite squad dynamics, dark patterns, predatory monetization.
     4. **Inappropriate Content & Online Safety:** Vault apps (Calculator+), stranger danger in DMs, anonymous Q&A apps (Sendit/NGL), accidental exposure.
     5. **Bedtime Battles & Sleep Hygiene:** 8:30 PM lockout resistance, bedroom phone docking, blue light & adolescent melatonin delay.
   - Every FAQ item includes rich `answerMarkdown` (psychological rationale) and an actionable `deEscalationScript` ("What to Say" word-for-word).
   - Wire `faqs.seed.ts` into `packages/database/prisma/seed/index.ts`.

### Task 2: Multi-LLM Provider Seam & Fallback Orchestration Engine
1. Define the LLM stream adapter contract in `apps/api/src/modules/ai-advisor/adapters/llm.adapter.ts`:
   ```typescript
   export interface LlmStreamChunk {
     content: string;
     done: boolean;
   }

   export interface LlmMessage {
     role: 'system' | 'user' | 'assistant';
     content: string;
   }

   export interface LlmStreamOptions {
     messages: LlmMessage[];
     temperature?: number;
     maxTokens?: number;
   }

   export interface LlmClientAdapter {
     readonly providerName: string;
     stream(options: LlmStreamOptions): AsyncIterable<string>;
   }
   ```
2. Implement Provider Adapters:
   - `openai.adapter.ts`: Primary adapter calling OpenAI Chat Completions streaming API (`OPENAI_API_KEY`, `OPENAI_MODEL`).
   - `gemini.adapter.ts`: First fallback adapter calling Google Gemini streaming API (`GEMINI_API_KEY`, `GEMINI_MODEL`).
   - `mistral.adapter.ts`: Second fallback adapter calling Mistral streaming API (`MISTRAL_API_KEY`, `MISTRAL_MODEL=open-mistral-7b`).
   - `fake.adapter.ts` (`DeterministicAiAdvisorFake`): Test adapter returning pre-defined token streams immediately, with configurable failure simulation to test fallback cascades.
3. Implement `MultiProviderLlmOrchestrator` (`llm-orchestrator.ts`):
   - Accepts an ordered list of adapters: `[openAiAdapter, geminiAdapter, mistralAdapter]`.
   - Iterates through the ladder upon connection errors, timeouts, rate limits (429), or 5xx server responses.
   - Emits structured Pino warnings upon fallback transition (`level: 'warn'`, `event: 'llm_fallback'`, `fromProvider`, `toProvider`, `reason`).
   - Ensures continuous, seamless SSE stream delivery to the client.

### Task 3: Vector Embedding & FAQ Retrieval Seam
1. Implement `embedding.service.ts`:
   - `EmbeddingAdapter` seam with `OpenAiEmbeddingAdapter` (using `text-embedding-3-small`) and `InMemoryEmbeddingFake`.
   - Retrieval utility finding top 3 matching clinical guidelines from `FaqItem` matching the parent's incoming prompt.

### Task 4: 24/7 AI Child Advisor Streaming Service & Controller
1. Implement `prompt.builder.ts`:
   - System prompt grounding AlongSide's 4 core pillars:
     1. Empathy first (validate feelings, no shaming).
     2. Developmental neurobiology (explain dopamine, impulse control, melatonin).
     3. Bilateral collaboration (invite child to problem-solve).
     4. Neutral enforcement ("The Pact docks the device at 8:30 PM, not mom being mean").
   - Dynamic contextual injection: Child's name, age, developmental tier, road type (`PRE_DEVICE` vs `ACTIVE_DEVICE`), and matched FAQ clinical dialogue scripts.
2. Implement Fastify streaming endpoint `POST /api/v1/ai-advisor/chat`:
   - Headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`.
   - Protocol stream events:
     - `data: {"type": "context", "matchedFaqs": [...]}`
     - `data: {"type": "token", "content": "..."}`
     - `data: {"type": "done", "conversationId": "..."}`
   - Persistence: Saves parent query and AI response in `AiConversation` and `AiMessage`.
3. Implement Conversation History Endpoints:
   - `GET /api/v1/ai-advisor/conversations`: List parent's past conversations.
   - `GET /api/v1/ai-advisor/conversations/:id`: Retrieve conversation history.

### Task 5: App Server Registration (`apps/api/src/app.ts`)
1. Register `faqsRoutes` under `/api/v1/faqs`.
2. Register `aiAdvisorRoutes` under `/api/v1/ai-advisor`.
3. Support dependency injection of adapters in `buildApp(opts)` for zero-mock, zero-network Fastify `.inject()` integration tests.

### Task 6: Shared Schemas (`packages/shared/`)
1. Create `packages/shared/src/schemas/ai.ts` and `faq.ts`:
   - `AiChatRequestSchema`, `AiChatStreamEventSchema`, `AiConversationSchema`.
   - `FaqQuerySchema`, `FaqItemSchema`, `FaqCategorySchema`.
   - Re-export in `packages/shared/src/schemas/index.ts` and `packages/shared/src/index.ts`.

### Task 7: Comprehensive Automated Integration Tests
1. Author Vitest integration tests in `apps/api/test/ai-advisor.test.ts` and `apps/api/test/faqs.test.ts`:
   - Fastify `.inject()` testing without physical TCP ports.
   - Test FAQ filtering by category, developmental tier, road type, and search keyword.
   - Test multi-LLM fallback cascade:
     * Primary OpenAI failure -> smoothly fails over to Gemini.
     * Gemini failure -> smoothly fails over to Mistral (`MISTRAL_MODEL=open-mistral-7b`).
     * All providers failing -> returns clean RFC 7807 error envelope.
   - Test SSE stream delivery and event formatting (`context`, `token`, `done`).
   - Test conversation persistence in `AiConversation` and `AiMessage`.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [x] `packages/shared/src/schemas/ai.ts` (Update/complete schemas)
- [x] `packages/shared/src/schemas/faq.ts` (FAQ query and response schemas)
- [x] `packages/shared/src/schemas/index.ts` (Re-exports)
- [x] `packages/database/prisma/seed/faqs.seed.ts` (100+ Modern Parenting FAQs)
- [x] `packages/database/prisma/seed/index.ts` (Seed coordinator)
- [x] `apps/api/src/modules/faqs/faqs.repository.ts` (Prisma + InMemory fake)
- [x] `apps/api/src/modules/faqs/faqs.service.ts`
- [x] `apps/api/src/modules/faqs/faqs.controller.ts`
- [x] `apps/api/src/modules/faqs/faqs.routes.ts`
- [x] `apps/api/src/modules/ai-advisor/adapters/llm.adapter.ts` (Seam interface)
- [x] `apps/api/src/modules/ai-advisor/adapters/openai.adapter.ts` (Primary)
- [x] `apps/api/src/modules/ai-advisor/adapters/gemini.adapter.ts` (Fallback 1)
- [x] `apps/api/src/modules/ai-advisor/adapters/mistral.adapter.ts` (Fallback 2: `open-mistral-7b`)
- [x] `apps/api/src/modules/ai-advisor/adapters/fake.adapter.ts` (In-memory test fake)
- [x] `apps/api/src/modules/ai-advisor/adapters/llm-orchestrator.ts` (Failover ladder)
- [x] `apps/api/src/modules/ai-advisor/embedding.service.ts`
- [x] `apps/api/src/modules/ai-advisor/prompt.builder.ts`
- [x] `apps/api/src/modules/ai-advisor/ai-advisor.repository.ts`
- [x] `apps/api/src/modules/ai-advisor/ai-advisor.service.ts`
- [x] `apps/api/src/modules/ai-advisor/ai-advisor.controller.ts`
- [x] `apps/api/src/modules/ai-advisor/ai-advisor.routes.ts`
- [x] `apps/api/src/app.ts` (Route and DI wiring)
- [x] `apps/api/test/faqs.test.ts` (FAQ integration tests)
- [x] `apps/api/test/ai-advisor.test.ts` (Advisor & fallback integration tests)

---

## 6. Acceptance Criteria & Verification Plan

1. **Type Checking:**
   ```bash
   npm run typecheck
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors across all monorepo workspaces.

2. **Automated Integration Tests:**
   ```bash
   npm test
   ```
   *Pass criteria:* 100% of tests passing with zero physical TCP listening ports.

3. **Multi-LLM Fallback Cascade Verification:**
   *Pass criteria:* Unit/integration test verifies that simulating OpenAI failure triggers failover to Gemini, and simulating Gemini failure triggers failover to Mistral (`MISTRAL_MODEL=open-mistral-7b`).

4. **Database FAQ Seed Verification:**
   *Pass criteria:* 100+ clinical and pediatric-reviewed FAQs seeded into database across all 5 core categories and 4 developmental tiers.

5. **SSE Token Streaming Protocol:**
   *Pass criteria:* `POST /api/v1/ai-advisor/chat` delivers properly formatted `data: {"type": ...}\n\n` SSE events and saves conversation history in database.

6. **Ponytail Principle Diff Audit:**
   *Pass criteria:* Working diff audited via `ponytail-review` ensuring minimal diff size, clean seams, zero speculative bloat, and zero unnecessary dependencies.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Backend Agent (`21d61c16-ef6a-4672-8653-392a8481930a`).
- ❌ **DO NOT** edit files inside `apps/web/`.
- ❌ **DO NOT** author React components, JSX/TSX UI code, or Tailwind classes.
- ❌ **DO NOT** break REST API response contracts defined in `docs/api-specification.md`.
- ❌ **DO NOT** hardcode external API client instances directly inside route handlers; inject adapters via parameters or constructors at designated seams.
- ✅ Work strictly inside `apps/api/`, `packages/database/`, and `@alongside/shared`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] Multi-LLM fallback pipeline implemented (OpenAI -> Gemini -> Mistral `open-mistral-7b`).
- [x] In-memory test fake adapter provided with configurable failure simulation.
- [x] 100+ Modern Parenting FAQs seeded across all 5 categories and 4 developmental tiers.
- [x] SSE streaming endpoint operational with child context injection and conversation persistence.
- [x] Fastify `.inject()` integration tests pass with 100% success rate.
- [x] `npm run typecheck` exits with code 0 across all workspaces.
- [x] Ponytail Principle diff audit passed.
- [x] Feature branch submitted as Pull Request targeting `main` with plain text (`.txt`) description.
