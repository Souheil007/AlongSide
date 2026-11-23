# Alongside System Architecture & Security Reconnaissance

## 1. Product Overview, Principals & Protected Resources
**Alongside** is a parent-intelligence and family operating system designed to replace digital friction with evidence-based developmental science, bilateral family agreements, and neutral device enforcement.

### Principals & Normal Authority
- **Unauthenticated Visitor / Candidate Parent**: May browse public marketing pages, view public academy outlines, inspect public weekly culture digests, and call registration/login endpoints (`/api/v1/auth/*`).
- **Authenticated Parent Account**: Holds `USER` role. Authorized to manage their own household profile, create child profiles, view and execute assessment quizzes, co-generate bilateral family pacts, enroll managed devices via QR codes, and spar with the 24/7 AI Pediatric Advisor.
- **Child Profile (Subject)**: Non-authenticated data subject under parental guardianship. Holds developmental tier classifications (Tier 0 through Tier 4), dietary milestones, and device restriction configurations.
- **System Administrator**: Operator with maintenance authority over global content seeds, catalog items, and background digest sync jobs.

### Protected Resources
1. **Child Private Profile & Health State**: Development assessments, dietary milestones, behavioral observations, and age derivation records (`packages/database/prisma/schema.prisma`).
2. **Parent Account Credentials & Sessions**: Argon2id password hashes and Signed 7-day HTTP-only JWT session cookies (`alongside_session`).
3. **Bilateral Family Pacts & Digital Signatures**: Vector PDF agreements and cryptographic device management configurations (`.mobileconfig`).
4. **AI Advisor Context & Private Inquiries**: Streaming conversational logs and child-tailored prompt context.

---

## 2. Technical Stack & Deployment Model
- **Frontend App**: Next.js 15 (App Router, React 19) hosted on Vercel (`apps/web`). Utilizes Tailwind CSS v3.4, Radix UI, TanStack Query v5, Zustand v5, and Serwist PWA offline caching.
- **Backend API**: Fastify v5 on Node.js LTS v22 (`apps/api`), deployed in an isolated container service (Render / Cloud Run) listening on HTTP port 4000.
- **Data Persistence**: PostgreSQL 16 with `pgvector` extension orchestrated via Prisma ORM v6 (`packages/database`).
- **Shared Validation Layer**: Pure TypeScript Zod schemas, contract DTOs, and deterministic scoring math (`packages/shared`).
- **Offline Build & Test Limits**: All unit and integration suites run fully offline using Vitest and Fastify `.inject()` against in-memory repository fakes (`FakeAuthRepository`, `FakeChildrenRepository`, `FakeDevProfileSigner`).

---

## 3. Entry Surfaces & Source-to-Sink Lifecycles
1. **Public Web & Authentication Entry**:
   - Routes: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`, `GET /api/v1/auth/me`.
   - Lifecycle: Incoming JSON -> Ajv / Zod Schema Parse -> Argon2id Hash/Verify -> JWT Cookie `alongside_session` issuance.
2. **Child Profile & Family Pact Management**:
   - Routes: `/api/v1/children/*`, `/api/v1/agreements/*`, `/api/v1/devices/*`.
   - Lifecycle: Cookie Auth Prehandler -> User ID Scope Resolution -> Prisma Multi-Tenant Isolation (`userId == request.user.id`) -> Apple PKCS#7 / Android Policy Compilation.
3. **Conversational AI Child Advisor (SSE)**:
   - Route: `POST /api/v1/ai-advisor/chat`.
   - Lifecycle: Cookie Auth -> Clinical Safe Harbor Red-Flag Filter (emergency interception) -> Vector Cosine FAQ Retrieval (`pgvector`) -> System Prompt Assembly -> Multi-Provider LLM Stream (OpenAI / Anthropic / Gemini).
4. **Weekly Culture Digest & Ingestion Cron**:
   - Routes: `GET /api/v1/digest/latest`, `POST /api/v1/digest/issues/sync`.
   - Lifecycle: Header `X-Digest-Sync-Secret` Constant-Time Comparison -> RSS / YouTube Feed Fetch -> LLM Curate -> Seed Database.

---

## 4. Trust Boundaries & Strongest Source-Visible Controls
1. **Network Boundary (Browser <-> Fastify API)**:
   - Hardened dynamic CORS origin validation (`LOCALHOST_ORIGIN_REGEX`, `ALONGSIDE_VERCEL_REGEX`) strictly preventing unauthorized third-party origin reflection with credentials.
2. **Tenant Data Boundary (Parent A <-> Parent B)**:
   - Mandatory repository-level scoping where all child and agreement operations require the caller's JWT `userId`.
3. **Life-Safety Boundary (Pediatric Medical Emergency Redirection)**:
   - Pre-LLM deterministic regex matching in `safe-harbor.filter.ts` intercepting cyanosis, infant fever (<90 days), poisoning, and anaphylaxis prior to invoking any model.
4. **Client-Side Rendering Boundary (Untrusted Markdown to DOM)**:
   - Strict protocol filtering in `utils.ts` (`isSafeUrl`) rejecting `javascript:`, `data:`, `vbscript:`, and protocol-relative schemes.

---

## 5. Starting Paths
- `apps/api/src/app.ts` — Server entry point, plugins, CORS, and error handlers.
- `apps/api/src/plugins/auth.plugin.ts` — JWT session cookie management and revocation registry.
- `apps/api/src/modules/` — Domain modules, routes, and controllers.
- `apps/web/src/components/shared/` — Core UI components and safe markdown renderer.
- `packages/shared/src/schemas/` — Zod contract validation schemas.

---

## 6. Companion Selection Summary
Derived from `ATTACK-CLASSES.md`:
- **`WEB-PROTOCOL-AND-AUTH.md`**: Applied to JWT cookie lifecycle, SameSite cross-origin behavior, CORS, and endpoint authorization.
- **`CLIENT-SIDE.md`**: Applied to Next.js App Router RSC/client boundaries, safe URL routing, and PWA Service Worker caching policies.
- **`AI-AND-LLM.md`**: Applied to AI Advisor prompt assembly, indirect injection, and child context leakage.
- **`DATA-ISOLATION-AND-LIFECYCLE.md`**: Applied to multi-tenant user scoping and child privacy safeguards.
- **`RESOURCE-EXHAUSTION-AND-AVAILABILITY.md`**: Applied to Argon2 password hashing and unbounded SSE streams.
