# Agent Rule: Backend Autonomous Skill Matrix & Fastify/Node.js Protocol

Canonical Specification: [`docs/engineering-standards/backend-skill-matrix.md`](file:///C:/GithubProjects/AlongSide/docs/engineering-standards/backend-skill-matrix.md)  
Applies To: Backend Agent, API Engineers, Autonomous Task Runners  

---

## 1. Autonomous Skill Dispatch Imperative

The Backend Agent MUST autonomously invoke its core backend skills based on **implicit architectural need and task lifecycle**, even when tasks do NOT explicitly name a skill:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SKILL DISPATCH OVERVIEW                         │
├─────────────────────┬───────────────────┬──────────────────────────────┤
│ Lifecycle Stage     │ Skills to Invoke  │ Key Mandate                  │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ 1. Governance       │ paperclip         │ Checkout, plans, docs, done  │
│ 2. Deep Modules     │ codebase-design   │ Deep modules, clean seams    │
│ 3. Fastify & Plugins│ fastify-best-prac.│ Plugins, encapsulation, fp   │
│ 4. Validation/Serial│ fastify-best-prac.│ Ajv schemas, fast-json-string│
│ 5. Node.js v22      │ node              │ Type stripping, import type  │
│ 6. Error & Logging  │ fastify-best-prac.│ Centralized errors, Pino log │
│ 7. Testing          │ fastify-best-prac.│ app.inject(), test fakes     │
│ 8. Pre-Commit Audit │ ponytail-review   │ Deletion check, zero bloat   │
└─────────────────────┴───────────────────┴──────────────────────────────┘
```

---

## 2. Skill Trigger & Execution Rules

### Rule 2.1: Fastify Plugin Architecture (`fastify-best-practices`)
- **MANDATORY:** Domain route modules in `apps/api/src/modules/**` MUST remain encapsulated plugins (DO NOT wrap in `fastify-plugin`). Register them with distinct route prefixes (`/api/v1/<domain>`).
- **MANDATORY:** Only cross-cutting infrastructure decorators (Prisma singleton, Redis client, auth decorators) may be wrapped with `fastify-plugin` (`import fp from 'fastify-plugin'`).
- **FORBIDDEN:** Never register global hooks or root decorators from inside a domain route module.

### Rule 2.2: Schemas & High-Performance Serialization (`fastify-best-practices`)
- **MANDATORY:** Every Fastify route MUST define an input schema (`body`, `querystring`, `params`) and explicit `response` schemas (e.g. `200`, `201`, `400`, `404`).
- **MANDATORY:** Derive schemas from `@alongside/shared` Zod definitions or compile JSON schemas with Ajv.
- **FORBIDDEN:** Do NOT return raw database models without serialization filtering; response schemas ensure private fields (passwords, salts, internal metadata) are never leaked.

### Rule 2.3: Node.js LTS v22 & Native TypeScript (`node`)
- **MANDATORY:** All type-only imports MUST use `import type { ... }` to guarantee clean Node 22 type stripping.
- **MANDATORY:** Use `const` objects with `as const` and union types instead of TypeScript `enum` constructs.
- **MANDATORY:** Use `node:stream/promises` `pipeline()` for stream transformations and SSE event streaming. Never use unhandled `.pipe()`.

### Rule 2.4: Centralized Error Handling & Pino Logging (`fastify-best-practices` & `node`)
- **MANDATORY:** Fastify server must register a single centralized `setErrorHandler()` mapping domain errors to AlongSide standard JSON error envelopes.
- **MANDATORY:** Log request errors using child loggers: `request.log.error({ err, userId }, 'Operation failed')`.
- **FORBIDDEN:** Never leak raw stack traces or internal database errors to HTTP clients in production.

### Rule 2.5: Deep Modules & Seam Discipline (`codebase-design`)
- **MANDATORY:** Domain modules (Agreements, Child Profiling, Device Profiles, Quizzes) must expose narrow, high-leverage interfaces that hide internal details (XML compilation, cryptography, vector math).
- **MANDATORY:** External I/O dependencies (Stripe billing, OpenAI streaming, Apple PKCS#7 signing) MUST be accepted via constructor or parameter at designated seams, with matching in-memory test fakes.
- **FORBIDDEN:** Never write shallow pass-through services that do nothing except forward calls 1:1 to Prisma.

### Rule 2.6: Integration Testing with Fastify Inject (`fastify-best-practices`)
- **MANDATORY:** Fastify integration tests MUST use `app.inject()` with Vitest.
- **FORBIDDEN:** Never spin up physical HTTP listening ports (`app.listen()`) in automated unit or integration tests.
- **MANDATORY:** Supply in-memory test fake adapters during test app initialization to ensure 100% deterministic, offline execution.

### Rule 2.7: Graceful Shutdown (`node` & `fastify-best-practices`)
- **MANDATORY:** Use `close-with-grace` to handle SIGTERM/SIGINT. Cleanly close Fastify (`await app.close()`) to drain active connections before disconnecting Prisma Client.

### Rule 2.8: Pre-PR Ponytail Diff Audit (`ponytail-review` & `paperclip`)
- **MANDATORY:** Before completing a task, inspect your git diff:
  1. *Does every line need to exist?*
  2. *Can speculative or redundant code be deleted?*
  3. *Did I introduce unnecessary npm dependencies?*
- **MANDATORY:** Verify `tsc --noEmit` exits with 0 and all tests pass with 100% success.
- **MANDATORY:** Update Paperclip task document with clickable links and mark task `done`.
