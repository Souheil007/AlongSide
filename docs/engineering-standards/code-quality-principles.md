# Alongside — Code Quality, Security & Testing Principles
**Author:** Chief Technology Officer (CTO)  
**Status:** Approved Engineering Standards  
**Version:** 1.0.0  
**Target Audience:** Frontend Engineer, Backend Engineer, Code Reviewers  

---

## 1. Clean Code & Architecture Principles

### 1.1 Separation of Concerns
1. **Frontend Presentation vs. State:**
   - Presentational components must be purely declarative and decoupled from raw network calls.
   - All server queries and mutations must live in custom React hooks leveraging TanStack Query (e.g. `useChildProfiles`, `useAgreementMutation`).
   - Complex multi-step client state (like the Agreement Builder wizard) belongs in dedicated Zustand stores, not sprawling local `useState` clusters.
2. **Backend Controller vs. Service vs. Data Access:**
   - **Controllers (Routes):** Parse and validate incoming requests using Zod schemas, invoke the corresponding domain service, and return formatted responses.
   - **Domain Services:** Contain pure business logic (e.g. readiness score calculation, clause recommendation logic, PDF rendering).
   - **Data Access:** All database interactions are encapsulated through the Prisma client in `packages/database`. Raw SQL queries are prohibited unless explicitly approved by the CTO for performance indexing.

### 1.2 TypeScript Strictness & Type Safety
- `strict: true` is strictly enforced in all `tsconfig.json` configurations.
- `any` is strictly prohibited. If a type cannot be strictly inferred, use `unknown` and apply a Zod parse or type guard.
- Shared domain contracts must be imported from `@alongside/shared`. Never duplicate interface definitions across frontend and backend.

### 1.3 Deep Module Design & Seam Discipline
Alongside enforces the canonical [**Codebase Design Specification**](codebase-design.md):
1. **Depth as Leverage:** Design modules with small public interfaces and rich implementations. Avoid shallow pass-through services that merely forward calls to Prisma or downstream libraries without enforcing domain invariants.
2. **The Deletion Test:** Every module must earn its keep. If deleting the module causes complexity to disappear, it was an unnecessary shallow wrapper. If complexity scatters across callers, it is a deep module.
3. **Accept Dependencies at Seams:** Domain services and compilers must accept collaborating adapters via constructor or parameters (e.g. `ProfileSigner`, `LlmAdapter`, `BillingGateway`). Never instantiate hardcoded API singletons inside domain logic.
4. **Interface is the Test Surface:** Callers and tests cross the exact same seam. External I/O seams must provide both production adapters and in-memory test fake adapters (`FakeDevProfileSigner`, `DeterministicAiAdvisorFake`, `FakeBillingGateway`).
5. **Pure Functional Cores:** Domain scoring and rule engines in `packages/shared` (`ReadinessScorer`, `PactRuleEngine`) must be pure deterministic functions with zero side effects.

---

## 2. Robust Error Handling

### 2.1 Universal Error Philosophy
- **Never Swallow Errors Silently:** Every caught exception must either be handled with user-facing recovery or logged with full structured context.
- **Fail Fast & Explicitly:** Validate inputs at system boundaries before allocating resources or querying the database.

### 2.2 Backend Error Taxonomy
All backend errors inherit from a base `AppError`:

```typescript
export abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errorCode: string;

  constructor(message: string, public readonly details?: unknown) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  readonly statusCode = 404;
  readonly errorCode = 'RESOURCE_NOT_FOUND';
}

export class ValidationError extends AppError {
  readonly statusCode = 400;
  readonly errorCode = 'VALIDATION_FAILED';
}

export class UnauthorizedError extends AppError {
  readonly statusCode = 401;
  readonly errorCode = 'UNAUTHORIZED';
}

export class ForbiddenError extends AppError {
  readonly statusCode = 403;
  readonly errorCode = 'FORBIDDEN';
}
```

Fastify registers a global error handler plugin that catches unhandled exceptions, logs them via Pino with redacting sensitive fields, and transforms them into standard API error envelopes.

### 2.3 Frontend Error Handling & Resilience
- **React Error Boundaries:** Every primary page layout (Dashboard, Agreement Builder, Script Reader) must be wrapped in a localized React Error Boundary with a calming "Something went wrong" fallback and a "Retry" button.
- **Optimistic UI with Rollback:** On bookmarking scripts or saving agreement clauses, use TanStack Query optimistic updates with automatic rollback if the network mutation fails.

---

## 3. Security & Privacy Standards

### 3.1 Child & Family Privacy (COPPA & GDPR-K Conscious)
Even though Alongside is parent-operated, the system stores sensitive information regarding children's digital habits, developmental readiness, and behavioral challenges:
1. **Data Minimization:** No child email, phone number, physical address, school name, or social security numbers are ever accepted.
2. **Strict Multi-Tenant Scoping:** Every Prisma read or write against `Child`, `Agreement`, or `DiagnosticAssessment` must include `where: { userId: currentParentId }`.
3. **Audit Trails:** Sensitive changes (such as digital signing or account deletion) are timestamped with IP and user-agent context.

### 3.2 Authentication & Token Security
- Passwords must meet OWASP guidelines (minimum 8 characters, checked against common password lists) and be hashed using `argon2id`.
- Access and refresh tokens are stored in `HttpOnly`, `Secure`, `SameSite=Strict` cookies. Tokens are never exposed to browser `localStorage` or `sessionStorage` to eliminate XSS token theft vectors.
- Rate limiting is enforced on all authentication routes (`/api/v1/auth/*`) to prevent credential stuffing.

### 3.3 Input Sanitization & Content Security
- All user-supplied strings rendered into HTML or PDFs (e.g. custom agreement clauses, child names) must be strictly sanitized to prevent HTML injection / XSS.
- React's default JSX escaping must be respected. Never use `dangerouslySetInnerHTML` without DOMPurify sanitization.

---

## 4. Testing Standards & Expectations

Every feature delivered to Alongside must be accompanied by comprehensive automated tests.

### 4.1 Testing Pyramid
1. **Unit Tests (Vitest):**
   - **Target:** 85%+ code coverage on pure business logic.
   - **Mandatory Areas:**
     - 10-dimension First-Phone Readiness assessment scoring algorithm (0–100 scale).
     - Bilateral agreement clause generator and 4-tier neurodevelopmental rule mapper.
     - Shared Zod validation schemas (`@alongside/shared`).
     - Pact-as-Code profile compiler and PKCS#7 signature validation wrappers.
     - Frontend date, time, tier formatting, and radar-chart calculation utilities.
2. **Integration Tests (Fastify Inject & Supertest):**
   - **Target:** All API route endpoints.
   - Test full request/response cycle against a test PostgreSQL database (running via Docker or test container).
   - Verify proper 400, 401, 403, and 404 responses for invalid inputs or unauthorized tenants.
   - Verify Server-Sent Events (SSE) token streaming for AI Advisor endpoints.
   - Verify signed `.mobileconfig` payload structure and MIME types (`application/x-apple-aspen-config`).
3. **End-to-End Tests (Playwright):**
   - **Critical User Flows:**
     - Flow 1: Parent registration -> Child onboarding with Contextual Road Fork (`PRE_DEVICE` / `ACTIVE_DEVICE`) -> Readiness assessment -> Bilateral pact co-negotiation -> QR device enrollment.
     - Flow 2: Academy lesson progression -> Offline Sunday Culture Digest reader -> 24/7 AI Child Advisor chat with streaming responses.
     - Flow 3: Stripe 7-day trial activation -> Annual Hero Pass conversion and billing portal access.

### 4.2 Test Execution Rule
Code cannot be merged into the default branch if:
- Any unit, integration, or e2e test fails.
- TypeScript compiler (`tsc --noEmit`) reports any errors.
- ESLint reports any warnings or errors.
