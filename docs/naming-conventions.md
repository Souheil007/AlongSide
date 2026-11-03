# Alongside — Naming Conventions & Code Style Guide
**Author:** Chief Technology Officer (CTO)  
**Status:** Approved Engineering Standards  
**Version:** 1.0.0  
**Target Audience:** Frontend Engineer, Backend Engineer, QA  

---

## 1. Database & Persistence Layer

| Entity | Convention | Example | Notes |
| :--- | :--- | :--- | :--- |
| **Database Tables** | `snake_case` (plural) | `users`, `agreement_clauses`, `app_decoders` | Explicitly mapped via Prisma `@@map("table_name")` |
| **Prisma Models** | `PascalCase` (singular) | `User`, `AgreementClause`, `AppDecoder` | Canonical model name in schema |
| **Prisma Fields** | `camelCase` | `userId`, `subscriptionTier`, `createdAt` | Prisma maps automatically to DB columns |
| **Database Columns** | `snake_case` | `user_id`, `subscription_tier`, `created_at` | Mapped via `@map("column_name")` when necessary |
| **Primary Keys** | `id` | `id: String @id @default(uuid()) @db.Uuid` | Always UUID v4 |
| **Foreign Keys** | `camelCase` with entity suffix | `userId`, `childId`, `agreementId` | Always reference parent primary key |
| **Enums (DB & Prisma)**| `PascalCase` type, `UPPER_SNAKE_CASE` values | `DevelopmentalTier`: `TIER_1_AGES_8_9`, `TIER_2_AGES_10_11`, `TIER_3_AGES_12_13`, `TIER_4_AGES_14_PLUS` | Unambiguous constant representations |

---

## 2. TypeScript & Application Code

### 2.1 Identifiers
- **Variables & Object Properties:** `camelCase`
  ```typescript
  const currentChildAge = 10;
  const agreementSummary = { totalClauses: 5 };
  ```
- **Functions & Methods:** `camelCase`, beginning with a clear verb:
  ```typescript
  function calculateReadinessScore(answers: DiagnosticAnswer[]): number { ... }
  async function generateAgreementPdf(agreementId: string): Promise<Buffer> { ... }
  ```
- **Classes, Types, Interfaces & Type Aliases:** `PascalCase`
  ```typescript
  interface ChildProfileDTO { ... }
  class AgreementDomainService { ... }
  type DiagnosticResult = { ... };
  ```
- **Constants & Enums:** `UPPER_SNAKE_CASE`
  ```typescript
  const MAX_RETRY_ATTEMPTS = 3;
  const DEFAULT_AGREEMENT_VALIDITY_MONTHS = 6;
  ```
- **Boolean Variables:** Prefix with `is`, `has`, `should`, or `can`:
  ```typescript
  const isPremiumUser = true;
  const hasAgreedToTerms = false;
  const canEditClauses = true;
  ```

---

## 3. Frontend & React Components

### 3.1 File & Directory Naming
- **React Components:** `PascalCase.tsx`
  - Examples: `AgreementBuilder.tsx`, `ScriptCard.tsx`, `DiagnosticQuestionCard.tsx`.
- **Custom Hooks:** `useCamelCase.ts`
  - Examples: `useChildProfile.ts`, `useOfflineScripts.ts`, `useAgreementWizard.ts`.
- **Zustand Stores:** `use[Domain]Store.ts`
  - Examples: `useAgreementWizardStore.ts`, `useAuthStore.ts`.
- **Next.js App Router Files:** Canonical Next.js lowercase filenames:
  - `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`.

### 3.2 Component Design & Prop Typing
- Every component must declare an explicit `Props` interface named `[ComponentName]Props`:
  ```typescript
  export interface ScriptCardProps {
    readonly script: ConversationScriptDTO;
    readonly onBookmarkToggle: (scriptId: string) => void;
    readonly className?: string;
  }

  export function ScriptCard({ script, onBookmarkToggle, className }: ScriptCardProps) {
    // ...
  }
  ```
- Avoid anonymous default exports. Use named exports or named function declarations for improved stack traces and fast-refresh reliability:
  ```typescript
  // Preferred:
  export default function AgreementPage() { ... }
  ```

---

## 4. REST API Endpoint Conventions

1. **Plural Resource Nouns:**
   - `/api/v1/children` (not `/api/v1/child`)
   - `/api/v1/agreements` (not `/api/v1/agreement`)
   - `/api/v1/scripts` (not `/api/v1/script`)
2. **Kebab-Case for Multi-Word Segments:**
   - `/api/v1/app-decoders`
   - `/api/v1/developmental-guidebook`
   - `/api/v1/agreements/:id/export-pdf`
3. **HTTP Verb Semantics:**
   - `GET`: Safe, idempotent read operations.
   - `POST`: Create a new resource or trigger an action (e.g. `/api/v1/agreements/:id/sign`).
   - `PUT`: Full replacement or idempotent update of an existing resource.
   - `PATCH`: Partial update of specific fields.
   - `DELETE`: Remove a resource.

---

## 5. Git & Source Control Standards

> **Authoritative Specification:** For complete guidelines on commit types, monorepo scopes, formatting rules, breaking changes, and prohibitions, see [**`docs/git-commit-standards.md`**](git-commit-standards.md).

### 5.1 Branch Naming Convention
Branches must adhere to the format `<type>/<issue-id>-<short-description>`:
- `feat/SOU-6-readiness-diagnostic-api`
- `feat/SOU-7-agreement-builder-wizard`
- `fix/SOU-12-pdf-export-margins`
- `test/SOU-15-scoring-algorithm-vitest`
- `docs/SOU-4-architecture-specifications`

### 5.2 Commit Messages (Conventional Commits v1.0.0)
All commit messages must follow the Conventional Commits format:
`<type>(<scope>): <concise description in imperative mood>`

**Allowed Types:**
- `feat`: A new user-facing or API feature.
- `fix`: A bug fix.
- `docs`: Documentation changes only.
- `style`: Changes that do not affect code logic (formatting, semi-colons).
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: Code change that improves performance.
- `test`: Adding or updating automated tests.
- `build`: Changes to build systems or external dependencies.
- `ci`: Changes to CI configuration and automation scripts.
- `chore`: Build system, configuration, or dependency updates.
- `revert`: Reverts a previous commit.

**Examples:**
- `feat(agreements): add 3-tier preset clause generator`
- `fix(auth): correct cookie domain on local https environments`
- `test(diagnostic): add edge cases for 7-question score calculation`
- `docs(standards): author canonical plan authoring guidelines`
