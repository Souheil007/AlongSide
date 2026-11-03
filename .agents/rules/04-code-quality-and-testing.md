# Agent Rule: Code Quality, Security & Verification Standards

Canonical Specification: [`docs/code-quality-principles.md`](file:///C:/GithubProjects/AlongSide/docs/code-quality-principles.md) & [`docs/naming-conventions.md`](file:///C:/GithubProjects/AlongSide/docs/naming-conventions.md)  
Applies To: All Engineering Agents  

---

## 1. Type Safety & Quality Gates

- **Zero TypeScript Errors:** `npm run typecheck` (`tsc --noEmit`) must exit with code 0 before completing any task.
- **Zero `any` Types:** Explicit typing or `unknown` with runtime type narrowing (Zod) is mandatory.
- **Strict Linting:** `npm run lint` must pass with zero errors and zero warnings.

---

## 2. Testing Requirements

- **100% Test Pass Rate:** `npm test` must succeed with zero failures.
- **Backend Tests:** Every Fastify endpoint must have integration tests using Fastify `.inject()`, validating HTTP status codes, headers, and response schema envelopes against `docs/api-specification.md`.
- **Pure Unit Tests:** Business logic engines (Scoring Engine, Agreement Generator, Slang Classifier) must be pure functions with 100% unit test coverage in Vitest.

---

## 3. Security & Data Protection (ZERO COMPROMISE)

- **Password Hashing:** Use `argon2id` exclusively (minimum 19 MiB memory, 2 iterations, 1 parallelism).
- **Session Security:** Use HttpOnly, Secure, SameSite=Strict cookies with CSRF token verification.
- **Child Privacy & Safe Harbor:** Under COPPA/GDPR-K, NEVER log, store, or transmit child message contents, keystrokes, or background location. Emergency dialing and parent messaging must remain unblocked 24/7.
- **Secrets:** NEVER commit `.env`, API keys, or private certificates to git.

---

## 4. Pre-Commit Ponytail Review (`ponytail-review`)

- **Diff Quality Audit:** Before committing code or completing tasks, agents must execute a `ponytail-review` audit on the git diff.
- **Enforce Minimal Footprint:** Confirm zero speculative bloat, zero unnecessary third-party packages, and that deletion beats addition.
- **Blast Radius & Completeness:** Ensure every caller, export, test, and config touched by the change remains valid and error-free.
