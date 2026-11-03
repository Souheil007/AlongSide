# Alongside — Backend Autonomous Skill Invocation Matrix & Fastify/Node.js Engineering Protocol
**Author:** Chief Technology Officer (CTO) & Backend Lead  
**Status:** Canonical Engineering Protocol  
**Version:** 1.0.0  
**Target Audience:** Backend Agent, Platform Engineers, Autonomous Runners  
**Active Operational Rule:** [`.agents/rules/07-backend-skill-matrix.md`](file:///C:/GithubProjects/AlongSide/.agents/rules/07-backend-skill-matrix.md)

---

## 1. Executive Summary & Core Imperative

In our autonomous multi-agent engineering organization, engineering responsibilities are strictly divided by architectural boundaries. The **Backend Agent** is the sole owner of `apps/api/` and `packages/database/`, responsible for delivering high-performance, fault-tolerant REST APIs, real-time AI streaming, cryptographic device profiles, and database operations.

Real-world backend tasks often arrive as concise directives:
- *"Add child age tier endpoint"*
- *"Implement Apple .mobileconfig PKCS#7 signing"*
- *"Create Sunday culture digest cron job"*
- *"Wire Fastify SSE streaming for 24/7 AI child advisor"*

Such prompts **do not explicitly say**:
- "Wrap plugins in `fastify-plugin` to avoid scope trapping when registering global decorators."
- "Pre-compile JSON schemas with Ajv and configure `fast-json-stringify` for high-throughput responses."
- "Use `app.inject()` with in-memory test fakes instead of spinning up raw network ports in Vitest."
- "Implement graceful shutdown using `close-with-grace` to drain in-flight SSE streams and close PostgreSQL connection pools."
- "Leverage Node.js LTS v22 native type stripping with `import type` and const objects instead of runtime transpiler bloat."
- "Enforce deep domain module interfaces conforming to [docs/codebase-design.md](file:///C:/GithubProjects/AlongSide/docs/codebase-design.md)."

**The Golden Principle of Autonomous Backend Skill Execution:**
> The Backend Agent must infer required technical standards and specialized skills from the **implicit architectural layer, runtime environment (Node.js LTS v22), framework paradigms (Fastify v4/v5 + TypeScript), and lifecycle stage** of every task, proactively applying verified patterns to guarantee production resilience, sub-millisecond overhead, and zero architectural drift.

---

## 2. Recommended & Installed Backend Agent Skills

Through our ecosystem evaluation via the Skills package manager (`npx skills find`), the following authoritative, battle-tested agent skills have been selected and installed into the Alongside agent workspace:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                BACKEND SKILL PORTFOLIO                                 │
├──────────────────────────┬─────────────────────────────┬───────────┬───────────────────┤
│ Skill Package Identifier │ Source & Maintainer         │ Installs  │ Core Specialty    │
├──────────────────────────┼─────────────────────────────┼───────────┼───────────────────┤
│ fastify-best-practices   │ mcollina/skills             │ 88.6K     │ Fastify Plugins,  │
│                          │ (Matteo Collina, Fastify    │           │ Schemas, Hooks,   │
│                          │  Lead & Node.js TSC Member) │           │ .inject() Testing │
├──────────────────────────┼─────────────────────────────┼───────────┼───────────────────┤
│ node                     │ mcollina/skills             │ 6.0K      │ Node.js LTS v22,  │
│                          │ (Matteo Collina)            │           │ Type Stripping,   │
│                          │                             │           │ Async Streams     │
├──────────────────────────┼─────────────────────────────┼───────────┼───────────────────┤
│ typescript-best-practices│ cursor/plugins              │ 9.1K      │ Strict TS Types,  │
│                          │ (Cursor Team)               │           │ Zero any, Unions  │
├──────────────────────────┼─────────────────────────────┼───────────┼───────────────────┤
│ codebase-design          │ Internal / Antigravity      │ Canonical │ Deep Modules,     │
│                          │ (AlongSide Architecture)    │           │ Clean Seams, Fakes│
├──────────────────────────┼─────────────────────────────┼───────────┼───────────────────┤
│ ponytail-review          │ Internal / Antigravity      │ Canonical │ Lazy Senior Dev,  │
│                          │ (AlongSide Standards)       │           │ Deletion & Polish │
├──────────────────────────┼─────────────────────────────┼───────────┼───────────────────┤
│ paperclip                │ Internal / Antigravity      │ Canonical │ Task Governance,  │
│                          │ (Team Orchestration)        │           │ Document Sync     │
└──────────────────────────┴─────────────────────────────┴───────────┴───────────────────┘
```

### Installation & Inspection Commands
To verify or reinstall these skills in any runner or global environment:
```bash
# Fastify Best Practices (88.6K installs - Matteo Collina)
npx skills add mcollina/skills@fastify-best-practices -g -y

# Node.js LTS v22 & Native Type Stripping (6K installs - Matteo Collina)
npx skills add mcollina/skills@node -g -y

# TypeScript Best Practices (9.1K installs - Cursor)
npx skills add cursor/plugins@typescript-best-practices -g -y
```

---

## 3. Autonomous Backend Skill Decision Matrix

The Backend Agent must autonomously activate the following skills across each lifecycle stage:

| Lifecycle Stage | Skills to Invoke | Mandate & Autonomous Action | Catastrophic Risk Avoided |
| :--- | :--- | :--- | :--- |
| **1. Governance & Sync** | `paperclip` | Check out issue via `POST /api/issues/{id}/checkout`. Read ancestor context and wake comments. Persist plans and deliverables via `PUT /api/issues/{id}/documents/{key}`. | Prevents split-brain executions, conflicting PRs, lost requirements, and orphaned tasks. |
| **2. Architectural Design** | `codebase-design`, `ponytail` | Author deep domain modules. Design narrow, leverage-dense interfaces (e.g. `PactCompiler`, `AiAdvisorService`). Separate external I/O behind clean seams with in-memory test fakes. Apply Ponytail Principle: eliminate speculative code. | Prevents shallow pass-through services that wrap Prisma 1:1, untestable tight coupling, and maintenance bloat. |
| **3. Fastify Server & Plugins** | `fastify-best-practices` | Structure server as composable plugins. Use `fastify-plugin` (`fp`) only for cross-cutting infrastructure (auth, Prisma decorator, telemetry). Keep domain modules encapsulated with route prefixes (`/api/v1/children`, `/api/v1/ai-advisor`). | Prevents decorator encapsulation leaks, plugin registration race conditions, and uncontained route collisions. |
| **4. Validation & Serialization** | `fastify-best-practices`, `typescript-best-practices` | Compile input schemas (body, querystring, params) and output schemas (`response[200]`). Integrate shared Zod contracts via `@alongside/shared` with Ajv JSON Schema compilation. | Prevents silent data tampering, unvalidated payloads, and slow JSON stringification bottlenecking throughput. |
| **5. Node.js v22 Runtime** | `node` | Use Node.js LTS v22 native patterns: `import type`, `const` objects instead of TypeScript enums, native ESM, and `node:stream/promises` `pipeline()`. Avoid heavy compilation layers. | Prevents runtime build crashes, slow container cold-starts, and bundle memory overhead. |
| **6. Error Handling & Pino** | `fastify-best-practices`, `node` | Utilize centralized Fastify `setErrorHandler()`. Map domain errors (e.g., `NotFoundError`, `UnauthorizedError`) to standard RFC 7807 / AlongSide error envelopes. Use child Pino loggers with `request.id`. | Prevents unhandled promise rejections, crash-on-error bugs, leaked stack traces in production, and unsearchable logs. |
| **7. Teardown & Lifecycle** | `node`, `fastify-best-practices` | Implement graceful shutdown with `close-with-grace`. Drain ongoing Fastify SSE connections, flush telemetry buffers, and cleanly disconnect Prisma Client. | Prevents dropped database connections, corrupted ongoing transactions, and orphaned child processes during deployments. |
| **8. Automated Testing** | `fastify-best-practices`, `codebase-design` | Write integration tests using Fastify's `app.inject()` and Vitest. Pass in-memory test fakes (`FakeBillingGateway`, `DeterministicAiAdvisorFake`) at seam boundaries. Assert status codes, headers, and payloads. | Prevents flaky port-binding collisions in CI, slow network calls, and reliance on brittle external third-party APIs. |
| **9. Diff Audit & Review** | `ponytail-review`, `paperclip` | Perform pre-commit self-review: ask "Did I write unnecessary code? Can lines be deleted?". Verify `tsc --noEmit` exits 0 and test suites pass 100%. Commit with Conventional Commits. | Prevents regressions, bloated pull requests, and non-standard git commit history. |

---

## 4. Canonical Technical Principles: Node.js (LTS v22) + Fastify (TypeScript)

### 4.1 Fastify Encapsulation & Plugin Hierarchy
Fastify features an internal tree structure for scoping plugins, decorators, and hooks:
1. **Root Instance (`app`):** Global configurations (Pino logger, CORS, Helmet, cookie parsers).
2. **Infrastructure Plugins (Wrapped with `fastify-plugin`):**
   - Must use `import fp from 'fastify-plugin'`.
   - Decorates `FastifyInstance` with singleton clients (e.g. `fastify.prisma`, `fastify.config`).
   - Breaks encapsulation intentionally so child contexts inherit the decorator.
3. **Domain Route Plugins (Encapsulated):**
   - **DO NOT** wrap in `fastify-plugin`.
   - Scoped to route prefixes:
     ```ts
     await app.register(childrenRoutes, { prefix: '/api/v1/children' });
     await app.register(advisorRoutes, { prefix: '/api/v1/ai-advisor' });
     ```
   - Hooks registered inside these plugins (`onRequest`, `preHandler`) apply ONLY to their nested routes.

### 4.2 High-Throughput Validation & Response Serialization
Fastify's speed advantage over Express stems directly from pre-compiling JSON Schemas:
- **Request Validation (Ajv):** Validates `params`, `query`, and `body` before reaching the route handler. Invalid requests immediately return `400 Bad Request` without entering business logic.
- **Response Serialization (`fast-json-stringify`):**
  - Defining `response: { 200: responseSchema }` generates specialized C-like string-building functions.
  - Automatically strips sensitive fields (e.g. `passwordHash`, `internalAuditNotes`) that are not defined in the schema.
  - Achieves up to **300% higher JSON serialization throughput** compared to `JSON.stringify()`.

### 4.3 Node.js LTS v22 Runtime & Type Stripping Standards
With Node.js 22.6+, native TypeScript execution via type stripping is supported:
- **`import type` Mandatory:** All type-only imports MUST use `import type { ... }` so the type stripper can erase the statement without leaving dangling runtime identifiers.
- **No Enums:** Use `const` objects with `as const` and union types:
  ```ts
  // ✅ Recommended
  export const RoadType = {
    PRE_DEVICE: 'PRE_DEVICE',
    ACTIVE_DEVICE: 'ACTIVE_DEVICE',
  } as const;
  export type RoadType = typeof RoadType[keyof typeof RoadType];

  // ❌ Forbidden
  export enum RoadType { ... }
  ```
- **Stream Pipelines:** Never use raw `.pipe()`. Always use `await pipeline()` from `node:stream/promises` to ensure unhandled stream errors propagate and cleanup file descriptors automatically.

### 4.4 Graceful Shutdown Pattern
Using `close-with-grace` ensures zero dropped requests:
```ts
import closeWithGrace from 'close-with-grace';

closeWithGrace({ delay: 5000 }, async ({ err, signal }) => {
  if (err) {
    app.log.error({ err }, 'Forced shutdown due to error');
  } else {
    app.log.info({ signal }, 'Graceful shutdown initiated');
  }
  
  // Close Fastify server (drains in-flight requests)
  await app.close();
  
  // Disconnect database
  await prisma.$disconnect();
});
```

### 4.5 Testing with `app.inject()` & In-Memory Fakes
The Backend Agent must never start raw TCP HTTP listeners during unit/integration tests:
```ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../app.js';
import { FakeBillingGateway } from '../modules/billing/test-fakes.js';

describe('POST /api/v1/children', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp({
      billingGateway: new FakeBillingGateway(),
    });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates a child profile and returns 201 Created', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/children',
      headers: { authorization: 'Bearer test-jwt' },
      payload: {
        name: 'Alex',
        birthYear: 2014,
        roadType: 'PRE_DEVICE',
      },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body.data.name).toBe('Alex');
    expect(body.data.developmentalTier).toBe('TWEEN_EMERGENCE');
  });
});
```

---

## 5. Definition of Done (DoD) for Backend Deliverables

The Backend Agent may mark a backend task complete **only** when all of the following are satisfied:
- [ ] Code is strictly isolated to `apps/api/` and `packages/database/` (or shared contracts in `packages/shared/`).
- [ ] All Fastify plugins correctly apply `fastify-plugin` where global scope is needed, or remain encapsulated for route modules.
- [ ] Route endpoints define both request validation schemas and typed response serialization schemas.
- [ ] External seams (Stripe, OpenAI, Apple PKCS#7 signing) accept dependencies and provide in-memory test fakes.
- [ ] Integration tests use `app.inject()` and achieve 100% pass rate in Vitest.
- [ ] `npm run typecheck` exits with 0 errors.
- [ ] The Ponytail Principle is satisfied: zero speculative code or unnecessary dependencies.
- [ ] Git commit adheres strictly to Conventional Commits v1.0.0.
