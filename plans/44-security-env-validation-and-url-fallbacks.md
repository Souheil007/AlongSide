# Engineering Execution Plan: PLAN-44
# Security Environment Validation, URL Fallback Hardening & Env Documentation

**Plan ID:** PLAN-44  
**Assignee:** Joint (FE & BE)  
**Dependencies:** PLAN-02, PLAN-03, PLAN-43  
**Status:** Complete  
**Scope:** `apps/api/src/app.ts`, `apps/api/src/plugins/auth.plugin.ts`, `apps/web/src/lib/api/agreements.ts`, `apps/web/src/lib/api/devices.ts`, `.env.example`, `packages/database/.env`  

---

## 1. Objective & Business Value

Eliminate critical security risks and configuration fragility across the Alongside monorepo by:
1. Enforcing strict, fail-fast production startup assertions in Fastify so that default development secrets (`dev_jwt_secret_*`, `dev_secret_cookie_*`) can never be used in a production environment (`NODE_ENV === 'production'`).
2. Correcting hardcoded frontend fallback ports in `agreements.ts` and `devices.ts` from dead port `3001` to canonical Fastify API port `4000`.
3. Standardizing and documenting all environment variables across `.env.example` (fixing the `/api/v1` discrepancy on `NEXT_PUBLIC_API_URL` and adding documentation for Mistral, Gemini, OpenAI model overrides, Apple MDM certificates, and server host).

---

## 2. Inputs & Architectural References

- `AGENTS.md` (Security & Code Quality Principles)
- `apps/api/src/app.ts` (Fastify Server Factory & Options)
- `apps/api/src/plugins/auth.plugin.ts` (JWT & Session Cookie Plugin)
- `apps/web/src/lib/api/agreements.ts` (PDF Export URL resolver)
- `apps/web/src/lib/api/devices.ts` (OTA and QR Enrollment URL resolver)
- `.env.example` (Master Environment Documentation)

---

## 3. Preconditions & Dependency Verification

- [x] PLAN-43 merged into `main` with legacy triage and dead tables purged.
- [x] Monorepo passes `typecheck` with 0 errors.
- [x] Test suite passing 100% across shared, api, and web workspaces.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Backend Production Secret Hardening (`apps/api`)
- In `apps/api/src/app.ts`:
  - When `process.env.NODE_ENV === 'production'`, inspect `jwtSecret` and `cookieSecret`.
  - Throw a descriptive, fatal configuration error if `jwtSecret` or `cookieSecret` is undefined, empty, or matching the known development fallback strings.
  - Retain development fallbacks when `NODE_ENV !== 'production'` so unit and integration test runs remain fast and friction-free.
- In `apps/api/src/plugins/auth.plugin.ts`:
  - Ensure same strict checks apply if initialized directly in production.
- Author unit tests verifying that `buildApp()` throws in production mode with dev secrets, and boots cleanly with valid production secrets.

### Task 2: Frontend API Port Standardization (`apps/web`)
- In `apps/web/src/lib/api/agreements.ts`:
  - Update `getAgreementPdfUrl` fallback from `http://localhost:3001` to `http://localhost:4000`.
- In `apps/web/src/lib/api/devices.ts`:
  - Update `API_BASE_URL` fallback from `http://localhost:3001` to `http://localhost:4000`.

### Task 3: Master Environment Documentation Alignment (`.env.example`)
- In `.env.example`:
  - Fix `NEXT_PUBLIC_API_URL=http://localhost:4000` (removing the duplicate `/api/v1`).
  - Add documentation and placeholders for:
    - `HOST=0.0.0.0`
    - `OPENAI_MODEL=gpt-4o-mini`
    - `GEMINI_API_KEY=your_gemini_api_key_here`
    - `GEMINI_MODEL=gemini-1.5-flash`
    - `MISTRAL_API_KEY=your_mistral_api_key_here`
    - `MISTRAL_MODEL=open-mistral-7b`
    - `APPLE_MDM_CERT=your_apple_mdm_cert_pem_here`
    - `APPLE_MDM_KEY=your_apple_mdm_key_pem_here`
- Sync `packages/database/.env` if necessary.

---

## 5. Specific Deliverables (Files to Create / Modify)

| File | Action | Description |
| :--- | :--- | :--- |
| `plans/44-security-env-validation-and-url-fallbacks.md` | Create | Master plan documentation. |
| `plans/README.md` | Modify | Index PLAN-44 in roadmap. |
| `apps/api/src/app.ts` | Modify | Add fail-fast production secret validation. |
| `apps/api/test/appProductionSecurity.test.ts` | Create | Vitest test suite asserting fail-fast startup behavior. |
| `apps/web/src/lib/api/agreements.ts` | Modify | Standardize fallback URL to port 4000. |
| `apps/web/src/lib/api/devices.ts` | Modify | Standardize fallback URL to port 4000. |
| `.env.example` | Modify | Standardize `NEXT_PUBLIC_API_URL` and add missing env vars. |

---

## 6. Acceptance Criteria & Verification Plan

1. **Production Boot Guard:** Calling `buildApp()` with `NODE_ENV=production` and default dev secrets throws a fatal error containing `FATAL: JWT_SECRET must be explicitly configured in production`.
2. **Development Unblocked:** Calling `buildApp()` with `NODE_ENV=development` or `test` boots with zero errors using local defaults.
3. **Frontend URLs:** Both `getAgreementPdfUrl('123')` and `getEnrollmentQrCodeUrl('abc')` return `http://localhost:4000/...` when `process.env.NEXT_PUBLIC_API_URL` is unset.
4. **Clean Typecheck & Test Passes:** `npm run typecheck` passes with 0 errors; all test suites pass 100%.

---

## 7. Role Boundaries & Prohibitions

- ❌ DO NOT log raw secret values or tokens.
- ❌ DO NOT break backwards compatibility with test harnesses that instantiate `buildApp()` with in-memory options.
- ❌ DO NOT commit any real private keys or API tokens to `.env.example`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables authored and located in canonical directories.
- [x] Production secret assertion implemented and verified with Vitest.
- [x] Port fallbacks updated and verified in `apps/web`.
- [x] Master `.env.example` synchronized and aligned.
- [x] Monorepo `typecheck` exits with 0 errors.
- [x] Monorepo `npm test` passes 100%.
- [x] Conventional Commit v1.0.0 prepared on dedicated branch.
- [x] PR opened targeting `main` for human review.
