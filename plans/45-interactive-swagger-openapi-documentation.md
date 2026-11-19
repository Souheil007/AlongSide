# Engineering Execution Plan: PLAN-45
# Interactive Swagger UI & OpenAPI Specification for Fastify Backend

**Plan ID:** PLAN-45  
**Assignee:** Backend Agent  
**Dependencies:** PLAN-02, PLAN-43, PLAN-44  
**Status:** Complete  
**Scope:** `apps/api/package.json`, `apps/api/src/app.ts`, `apps/api/test/swaggerDocs.test.ts`  

---

## 1. Objective & Business Value

Provide interactive OpenAPI 3.0 documentation and an in-browser Swagger UI dashboard for the Alongside backend API on `http://localhost:4000/docs`. Enables developers, testers, and product stakeholders to:
1. Inspect all available API endpoints, methods, parameters, and request/response payloads directly in a web browser.
2. Execute live interactive API requests ("Try it out") without requiring external tools like Postman.
3. Automatically redirect browser requests from `http://localhost:4000/api/v1` and `http://localhost:4000/documentation` to the interactive `/docs` UI.
4. Provide structured JSON endpoint directory when `GET /api/v1` is requested via cURL or API clients.

---

## 2. Inputs & Architectural References

- `docs/api-specification.md` (Authoritative REST API contracts)
- Fastify v5 Official Documentation (`@fastify/swagger` and `@fastify/swagger-ui`)
- `apps/api/src/app.ts` (Fastify Server Factory)

---

## 3. Preconditions & Dependency Verification

- [x] PLAN-44 merged into `main` with production secret validation and port 4000 fallbacks.
- [x] `@fastify/swagger` and `@fastify/swagger-ui` installed in `@alongside/api`.
- [x] All existing monorepo unit and integration tests passing.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Register Swagger & Swagger UI in Fastify Factory (`apps/api/src/app.ts`)
- Import `@fastify/swagger` and `@fastify/swagger-ui`.
- Register `@fastify/swagger` before route plugins with OpenAPI 3.0 specification metadata:
  - Title: Alongside API
  - Description: Alongside Holistic Child Upbringing, Pediatric Health & Lifespan Family OS API
  - Version: 1.0.0
  - Tags and security schemes (`alongside_session` cookie).
- Register `@fastify/swagger-ui` at route prefix `/docs`.
- Add `GET /api/v1` route that:
  - Redirects browser clients (`Accept: text/html`) to `/docs`.
  - Returns structured endpoint map for programmatic clients (`Accept: application/json`).
- Add `GET /documentation` redirecting to `/docs`.

### Task 2: Automated Integration Tests (`apps/api/test/swaggerDocs.test.ts`)
- Test `GET /docs` returns status 200 with HTML Swagger UI.
- Test `GET /docs/json` returns valid OpenAPI 3.0 specification JSON containing defined endpoints.
- Test `GET /api/v1` redirects HTML requests to `/docs` and returns JSON endpoint directory for JSON requests.
- Test `GET /documentation` redirects to `/docs`.

---

## 5. Specific Deliverables (Files to Create / Modify)

| File | Action | Description |
| :--- | :--- | :--- |
| `plans/45-interactive-swagger-openapi-documentation.md` | Create | Master plan documentation. |
| `plans/README.md` | Modify | Index PLAN-45 in roadmap. |
| `apps/api/package.json` | Modify | Add `@fastify/swagger` and `@fastify/swagger-ui`. |
| `apps/api/src/app.ts` | Modify | Register swagger plugins, `/docs`, and `/api/v1` directory routes. |
| `apps/api/test/swaggerDocs.test.ts` | Create | Vitest suite asserting Swagger UI and OpenAPI JSON endpoints. |

---

## 6. Acceptance Criteria & Verification Plan

1. **Swagger UI Accessible:** `GET /docs` returns status 200 and serves HTML with Swagger UI assets.
2. **OpenAPI JSON Spec:** `GET /docs/json` returns valid OpenAPI 3.0 JSON with info, paths, and components.
3. **Smart `/api/v1` Route:**
   - Request with `Accept: text/html` returns 302 redirect to `/docs`.
   - Request with `Accept: application/json` returns 200 with directory of endpoints.
4. **Clean Typecheck & Test Passes:** `npm run typecheck` and `npm test` pass with 100% success.

---

## 7. Role Boundaries & Prohibitions

- ❌ DO NOT expose private secrets or sensitive environment credentials in Swagger specs.
- ❌ DO NOT break existing route handler schemas or DTO validation contracts.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] Swagger and Swagger UI registered in `apps/api/src/app.ts`.
- [x] Integration test suite authored in `apps/api/test/swaggerDocs.test.ts`.
- [x] Monorepo `typecheck` exits with 0 errors.
- [x] Monorepo `npm test` passes 100%.
- [x] Conventional Commit v1.0.0 prepared on dedicated branch.
- [x] PR opened targeting `main` for human review.
