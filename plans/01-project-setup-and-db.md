# Plan 01: Monorepo Workspace Setup, Shared Package & Prisma Database
**Plan ID:** `PLAN-01`  
**Assignee:** Backend Agent  
**Dependencies:** None  
**Estimated Scope:** Foundational  
**Status:** Completed & Verified  

---

## 1. Objective & Business Value

Establish the foundational monorepo workspace structure, the `@alongside/shared` contract package (containing Zod validation schemas, domain enums, and scoring algorithms), the `@alongside/database` Prisma ORM package with PostgreSQL 16 and `pgvector` support, and scaffold the Fastify API server in `apps/api/`. This plan establishes the entire persistent data model and contract layer powering the v2.2.0 platform.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md)
- **System Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md)
- **Database Schema Specification:** [`docs/data-models.md`](../docs/data-models.md)
- **Tech Stack Decision Record:** [`docs/tech-stack-decision.md`](../docs/tech-stack-decision.md)
- **Code Quality & Git Standards:** [`docs/code-quality-principles.md`](../docs/code-quality-principles.md), [`docs/git-commit-standards.md`](../docs/git-commit-standards.md)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Dependencies:** None (First plan in sequence).
- **Environment:** Node.js LTS v22 and npm installed locally.
- **Docker:** Local Docker Engine operational for PostgreSQL container execution.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Root Monorepo Configuration
1. Initialize root `package.json` with npm workspaces (`apps/*`, `packages/*`) and global scripts (`build`, `lint`, `test`, `typecheck`).
2. Author root `tsconfig.base.json` targeting ES2022 with strict mode, NodeNext module resolution, and path mappings for `@alongside/shared` and `@alongside/database`.
3. Configure `.gitignore` to exclude `node_modules/`, `dist/`, `.next/`, `*.env`, `.env.local`, and build artifacts.
4. Create `.env.example` defining `DATABASE_URL`, `JWT_SECRET`, `PORT=4000`, `CORS_ORIGIN=http://localhost:3000`, `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`.

### Task 2: Implement Shared Contract Package (`packages/shared/`)
1. Create `packages/shared/package.json` with `@alongside/shared` name and TypeScript build tooling.
2. Implement domain constants and enums in `packages/shared/src/constants/index.ts`:
   - `RoadType`: `PRE_DEVICE`, `ACTIVE_DEVICE`
   - `DevelopmentalTier`: `TIER_1_AGES_8_9`, `TIER_2_AGES_10_11`, `TIER_3_AGES_12_13`, `TIER_4_AGES_14_PLUS`
   - `SubscriptionTier`: `TRIAL`, `ANNUAL_HERO`, `MONTHLY_FLEX`, `INSTITUTIONAL`
   - `QuizType`: `CULTURAL_FLUENCY_TWEEN`, `PARENTING_STYLE_CONFLICT`, `FIRST_PHONE_READINESS`, `HOUSEHOLD_SCREEN_AUDIT`, `JOINT_DISCOVERY_BRIDGE`
   - `ClauseCategory`: `SCREEN_TIME`, `DEVICE_CURFEW`, `PRIVACY_SAFETY`, `PURCHASES_CHATS`, `CONTENT_BOUNDARIES`, `PARENT_COMMITMENT`
   - `DeviceProfileStatus`: `PENDING_ENROLLMENT`, `ACTIVE`, `REVOKED`, `EXPIRED`
   - `DevicePlatform`: `APPLE_IOS`, `ANDROID_ENTERPRISE`
3. Implement Zod validation schemas in `packages/shared/src/schemas/`:
   - `auth.ts`: `RegisterUserSchema`, `LoginUserSchema`
   - `child.ts`: `CreateChildSchema`, `UpdateChildSchema`
   - `pact.ts`: `CreateAgreementSchema`, `SignAgreementSchema`, `CompileProfileSchema`
   - `quiz.ts`: `SubmitQuizAttemptSchema`
   - `ai.ts`: `AiChatRequestSchema`
4. Implement TypeScript DTOs and interfaces in `packages/shared/src/types/index.ts`.
5. Implement quiz scoring algorithms in `packages/shared/src/algorithms/quizScoring.ts`.
6. Export all types, constants, schemas, and utilities from `packages/shared/src/index.ts`.

### Task 3: Implement Database Layer (`packages/database/`)
1. Create `packages/database/package.json` with `@alongside/database` name, Prisma ORM, and client dependencies.
2. Implement `prisma/schema.prisma` matching [`docs/data-models.md`](../docs/data-models.md) verbatim.
3. Configure `src/client.ts` exporting a singleton instance of `PrismaClient`.
4. Create root `docker-compose.yml` declaring:
   - `postgres`: PostgreSQL 16 image with `pgvector` extension enabled, ports `5432:5432`.
5. Execute initial migration `prisma migrate dev --name init_canonical_v2_2_schema` and verify client generation.

### Task 4: Scaffold Fastify API Server (`apps/api/`)
1. Create `apps/api/package.json` with Fastify LTS v22, `@fastify/cors`, `@fastify/cookie`, `@fastify/sensible`, `zod`, `@alongside/shared`, `@alongside/database`.
2. Configure `apps/api/src/app.ts` as the Fastify application factory with error handling, schema serialization, and CORS.
3. Implement `apps/api/src/modules/health/` with `GET /api/v1/health` returning uptime and status.
4. Implement `apps/api/src/index.ts` server entrypoint listening on port 4000.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [x] `package.json` (Root monorepo workspace)
- [x] `tsconfig.base.json`
- [x] `.gitignore`
- [x] `.env.example`
- [x] `docker-compose.yml`
- [x] `packages/shared/package.json`
- [x] `packages/shared/tsconfig.json`
- [x] `packages/shared/src/constants/index.ts`
- [x] `packages/shared/src/schemas/auth.ts`
- [x] `packages/shared/src/schemas/child.ts`
- [x] `packages/shared/src/schemas/pact.ts`
- [x] `packages/shared/src/schemas/quiz.ts`
- [x] `packages/shared/src/schemas/ai.ts`
- [x] `packages/shared/src/types/index.ts`
- [x] `packages/shared/src/algorithms/quizScoring.ts`
- [x] `packages/shared/src/index.ts`
- [x] `packages/database/package.json`
- [x] `packages/database/tsconfig.json`
- [x] `packages/database/prisma/schema.prisma`
- [x] `packages/database/src/client.ts`
- [x] `packages/database/src/index.ts`
- [x] `apps/api/package.json`
- [x] `apps/api/tsconfig.json`
- [x] `apps/api/src/app.ts`
- [x] `apps/api/src/index.ts`
- [x] `apps/api/src/modules/health/health.routes.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Workspace Compilation:**
   ```bash
   npm run typecheck
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors across all workspaces.
2. **Prisma Schema Validation:**
   ```bash
   npx prisma validate --schema=packages/database/prisma/schema.prisma
   ```
   *Pass criteria:* "The schema at packages/database/prisma/schema.prisma is valid."
3. **Health Check Verification:**
   ```bash
   npm run test --workspace=@alongside/api
   ```
   *Pass criteria:* Fastify `.inject()` test on `GET /api/v1/health` asserts status 200 and `{ "status": "ok" }`.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Backend Agent.
- ❌ **DO NOT** create or modify files inside `apps/web/`.
- ❌ **DO NOT** write React UI components or frontend logic.
- ✅ Work exclusively inside `packages/shared/`, `packages/database/`, `apps/api/`, and root workspace config files.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] Schema strictly matches `docs/data-models.md` v2.2.0.
- [x] `npm run typecheck` exits with code 0.
- [x] Automated tests pass with 100% success.
- [x] Git commit messages follow Conventional Commits (`feat(setup): ...`).
