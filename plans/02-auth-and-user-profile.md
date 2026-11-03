# Plan 02: Authentication, Session Cookies & Parent Account API
**Plan ID:** `PLAN-02`  
**Assignee:** Backend Agent  
**Dependencies:** PLAN-01  
**Estimated Scope:** Small  

---

## 1. Objective & Business Value

Implement secure, production-grade parent authentication using `argon2id` password hashing, stateless JWT session tokens delivered in `HttpOnly`, `Secure`, `SameSite=Strict` cookies, CSRF protection, and parent profile management endpoints. Provides seamless, privacy-hardened onboarding for parents into their 7-day risk-free trial.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 5: 7-Day Trial Onboarding)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Section 4: Privacy & Security)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 2: Authentication & User Profile)
- **Database Schema:** [`docs/data-models.md`](../docs/data-models.md) (`User`, `Subscription` models)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-01` completed (`packages/shared`, `packages/database`, and `apps/api` scaffold operational).
- **Verification:** Run `npx prisma validate --schema=packages/database/prisma/schema.prisma` and ensure `User` and `Subscription` models are available.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Password Hashing & Security Utilities
1. Install `argon2` in `apps/api/package.json`.
2. Implement `apps/api/src/modules/auth/auth.security.ts`:
   - `hashPassword(password: string): Promise<string>` using `argon2.hash(..., { type: argon2.argon2id })`.
   - `verifyPassword(hash: string, plain: string): Promise<boolean>`.

### Task 2: JWT Plugin & Cookie Session Management
1. Register `@fastify/jwt` and `@fastify/cookie` in `apps/api/src/plugins/auth.plugin.ts`.
2. Implement session helpers to issue `alongside_session` cookie on login/register with flags: `httpOnly: true`, `secure: process.env.NODE_ENV === 'production'`, `sameSite: 'strict'`, `path: '/'`, `maxAge: 7 * 24 * 60 * 60` (7 days).
3. Implement `authenticate` Fastify preHandler hook to verify cookie or `Authorization: Bearer` header, populating `request.user`.

### Task 3: Auth Route Handlers & Controllers
1. Implement `POST /api/v1/auth/register`:
   - Validates body against `RegisterUserSchema`.
   - Checks email uniqueness.
   - Creates `User` record with `passwordHash`.
   - Initializes `Subscription` record with `tier: "TRIAL"`, `trialEndsAt: now() + 7 days`.
   - Sets session cookie and returns HTTP 201 with `UserProfileDTO`.
2. Implement `POST /api/v1/auth/login`:
   - Validates against `LoginUserSchema`.
   - Verifies email and password using `verifyPassword`.
   - Sets session cookie and returns HTTP 200 with `UserProfileDTO`.
3. Implement `POST /api/v1/auth/logout`:
   - Clears `alongside_session` cookie and returns `{ "success": true }`.
4. Implement `GET /api/v1/auth/me`:
   - Protected endpoint returning authenticated parent profile, trial status, and children count.

### Task 4: Automated Integration Testing
1. Author Vitest tests in `apps/api/tests/modules/auth/auth.test.ts` using Fastify `.inject()`:
   - Registration with valid data -> 201 Created & cookie set.
   - Registration with duplicate email -> 409 Conflict.
   - Login with invalid credentials -> 401 Unauthorized.
   - `GET /api/v1/auth/me` with valid session cookie -> 200 OK.
   - `GET /api/v1/auth/me` without session -> 401 Unauthorized.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [x] `apps/api/src/modules/auth/auth.security.ts`
- [x] `apps/api/src/modules/auth/auth.repository.ts`
- [x] `apps/api/src/modules/auth/auth.service.ts`
- [x] `apps/api/src/modules/auth/auth.controller.ts`
- [x] `apps/api/src/modules/auth/auth.routes.ts`
- [x] `apps/api/src/plugins/auth.plugin.ts`
- [x] `apps/api/src/app.ts` (Register auth plugin and routes)
- [x] `apps/api/test/modules/auth/auth.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Type Checking:**
   ```bash
   npm run typecheck --workspace=@alongside/api
   ```
   *Pass criteria:* Zero TypeScript compile errors.
2. **Automated Integration Tests:**
   ```bash
   npm test --workspace=@alongside/api
   ```
   *Pass criteria:* All auth suite tests pass (100% pass rate).
3. **Session Cookie Assertion:**
   *Pass criteria:* Integration test asserts `set-cookie` header contains `HttpOnly`, `SameSite=Strict`.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Backend Agent.
- ❌ **DO NOT** edit or create files in `apps/web/`.
- ❌ **DO NOT** create Next.js login or register forms (Frontend Agent owns UI).
- ✅ Work exclusively inside `apps/api/src/modules/auth/`, plugins, and tests.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] Passwords hashed with `argon2id`.
- [x] Session tokens delivered in HttpOnly secure cookies.
- [x] `npm run typecheck` exits with code 0.
- [x] All Vitest Fastify inject tests pass.
- [x] Commits adhere to Conventional Commits (`feat(auth): ...`).
