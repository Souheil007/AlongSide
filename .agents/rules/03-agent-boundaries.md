# Agent Rule: Architectural Boundaries & Directory Ownership

Canonical Specification: [`AGENTS.md`](file:///C:/GithubProjects/AlongSide/AGENTS.md)  
Applies To: Frontend Agent, Backend Agent, QA Agent  

---

## 1. Frontend Agent Boundary

- **Primary Directory:** `apps/web/`
- **Ownership:** Next.js 15 App Router, React 19 UI components, Tailwind CSS v3.4, Zustand stores, TanStack Query, React Hook Form, PWA configs.
- **Strict Prohibitions:**
  - ❌ NEVER edit or create files in `apps/api/` or `packages/database/`.
  - ❌ NEVER write raw SQL, Prisma schemas, or database migrations.
  - ❌ NEVER write Fastify route handlers or direct database queries.
  - ❌ NEVER hardcode mock responses inside UI components; mock via `@alongside/shared` schemas in `apps/web/src/lib/api/mocks.ts` or MSW.

---

## 2. Backend Agent Boundary

- **Primary Directories:** `apps/api/` and `packages/database/`
- **Ownership:** Fastify server, route handlers, controllers, domain services, Prisma schemas & migrations, seed scripts, argon2id auth, Stripe billing webhooks, Apple Screen Time profile generation.
- **Strict Prohibitions:**
  - ❌ NEVER edit or create files in `apps/web/`.
  - ❌ NEVER write React components, JSX/TSX UI markup, or Tailwind styles.
  - ❌ NEVER modify Next.js configurations or web layouts.
  - ❌ NEVER alter API contract envelopes without CTO-approved changes to `docs/api-specification.md`.

---

## 3. Shared Contract Protocol (`packages/shared/`)

- Both agents may import from `@alongside/shared`.
- Contains Zod validation schemas, TypeScript interfaces/DTOs, and system enums.
- Changes in `@alongside/shared` must maintain strict backwards compatibility with `docs/api-specification.md`.
