# Alongside — Git Commit Message & Source Control Standards (Conventional Commits)
**Author:** Chief Technology Officer (CTO)  
**Status:** Canonical Engineering Standards  
**Version:** 1.0.0  
**Target Audience:** All Engineering Agents (Lead Technical Planner, Frontend Agent, Backend Agent, QA Agent)  

---

## 1. Purpose & Philosophy

In a multi-agent engineering organization where autonomous AI agents collaborate asynchronously on the same codebase, **disciplined version control is mission-critical**.

Adhering to strict Git commit standards:
1. **Eliminates Ambiguity:** Every commit communicates its exact intent, domain scope, and architectural impact at a glance.
2. **Automates Versioning & Changelogs:** Powers automated Semantic Versioning (SemVer) and release notes generation without manual bookkeeping.
3. **Streamlines Audits & Bisecting:** Enables instantaneous root-cause analysis when debugging regressions using `git bisect` and `git log`.
4. **Enforces Atomic Discipline:** Prevents sprawling, multi-purpose commits that entangle disparate features, refactors, and bug fixes.

All agents operating in the AlongSide repository must strictly comply with the **Conventional Commits v1.0.0** specification detailed below.

---

## 2. Conventional Commit Message Structure

Every Git commit message must adhere to the standard three-part format:

```
<type>[optional scope]: <imperative description>

[optional body]

[optional footer(s)]
```

```
       ┌────────────────────────────────────────────────────────────┐
       │ feat(agreements): add 3-tier preset clause generator       │ <── Header (Max 72 chars)
       │                                                            │
       │ Implements the core clause synthesis algorithm in the      │
       │ agreement domain service, dynamically selecting clauses    │ <── Body (Wrapped at 72 chars,
       │ based on child readiness score and developmental tier.     │     explains WHY and WHAT)
       │                                                            │
       │ Fixes SOU-6                                                │ <── Footer (Issue links &
       │ Co-authored-by: Backend Agent <backend@alongside.internal> │     Breaking changes)
       └────────────────────────────────────────────────────────────┘
```

---

## 3. Allowed Commit Types

Only the following standardized commit types are permitted. Agents must select the single most accurate type:

| Type | Intent & Usage | Example |
| :--- | :--- | :--- |
| **`feat`** | A new user-facing capability, API endpoint, or domain feature. | `feat(auth): implement argon2id password hashing` |
| **`fix`** | A bug fix correcting erroneous or unintended behavior. | `fix(pdf): correct page overflow on multi-clause agreement` |
| **`docs`** | Documentation changes only (specs, guides, docstrings, plans). | `docs(standards): author canonical git commit standards` |
| **`refactor`** | A code restructuring that neither fixes a bug nor adds a feature. | `refactor(diagnostic): extract scoring engine to pure service` |
| **`perf`** | A code change that specifically optimizes runtime performance. | `perf(database): add compound index for child agreement lookup` |
| **`test`** | Adding missing tests, updating test mocks, or improving test coverage. | `test(agreements): add unit tests for custom clause validation` |
| **`build`** | Changes affecting build tooling, monorepo workspaces, or compiler configs. | `build(tsconfig): enable strict null checks across workspaces` |
| **`ci`** | Changes to CI/CD workflows, test runners, or automation scripts. | `ci(github): add automated typecheck and vitest PR validation` |
| **`chore`** | Routine maintenance, dependency updates, or repo hygiene. | `chore(deps): update fastify to v4.26.2` |
| **`style`** | Code formatting, whitespace, or lint fixes without logic change. | `style(web): format agreement card components with prettier` |
| **`revert`** | Reverts a previous commit by SHA or description. | `revert: "feat(auth): implement argon2id password hashing"` |

---

## 4. Allowed Monorepo Scopes

The scope provides immediate architectural context within AlongSide's monorepo. Scopes must be in **lowercase kebab-case** enclosed in parentheses `(<scope>)`.

### 4.1 Application & Package Scopes
- `(api)`: `apps/api/` (Fastify server, routing, plugins, middleware).
- `(web)`: `apps/web/` (Next.js 15, App Router, React components, Zustand stores).
- `(shared)`: `packages/shared/` (Zod schemas, DTOs, constants, common types).
- `(database)`: `packages/database/` (Prisma schema, migrations, seed scripts).

### 4.2 Domain Feature Scopes
- `(auth)`: User registration, login, JWT session cookies, CSRF protection.
- `(child)`: Child profile creation, editing, and developmental tier mapping.
- `(diagnostic)`: 7-question readiness assessment, weighted scoring algorithm.
- `(agreements)`: Family Media Agreement wizard, clause customization, digital signing.
- `(pdf)`: PDF generation engine, vector print layouts, CSS print media.
- `(academy)`: Parent educational content, neurobiological guides, stage milestones.
- `(quiz)`: Interactive parent micro-quizzes, self-assessments, scoring rules.
- `(device-mdm)`: Signed Apple Screen Time / Android Enterprise configuration profiles.
- `(culture-digest)`: Weekly youth culture trends, slang decoders, exploit alerts.
- `(voice-coach)`: AI voice sparring simulator, de-escalation scenarios.
- `(billing)`: Stripe billing, subscription tiers, customer portal, webhooks.

### 4.3 Governance & Repository Scopes
- `(plans)`: Discrete engineering execution plans in `plans/*.md`.
- `(docs)`: Architecture records, API specs, and project documentation in `docs/*.md`.
- `(standards)`: Engineering governance, naming conventions, quality guidelines.
- `(agents)`: Agent prompt definitions, role descriptions, and team governance.
- `(repo)`: Monorepo root configuration, workspace setup, `.gitignore`.

---

## 5. Message Formatting Rules

### 5.1 Subject Line (Header)
1. **Imperative Mood:** Use the imperative present tense ("add", "implement", "fix", "remove", "refactor"). Never use past tense ("added", "fixed") or third-person ("adds", "fixes").
   - ✅ `feat(api): add health check route`
   - ❌ `feat(api): added health check route`
   - ❌ `feat(api): adds health check route`
2. **Lowercase First Letter:** The character immediately following the colon and space must be lowercase:
   - ✅ `fix(auth): sanitize cookie domain parameter`
   - ❌ `fix(auth): Sanitize cookie domain parameter`
3. **No Trailing Period:** Do not end the subject line with a period or punctuation mark:
   - ✅ `refactor(web): extract modal component to shared UI`
   - ❌ `refactor(web): extract modal component to shared UI.`
4. **Length Restriction:** The complete header (`<type>(<scope>): <subject>`) must not exceed **72 characters** (optimal: 50 characters).

### 5.2 Commit Body
1. **Explain the "Why" and "What":** The body should articulate the motivation behind the change and summarize what was altered, contrasting the new behavior with the previous behavior.
2. **Line Wrapping:** Every line in the commit body must be hard-wrapped at **72 characters**.
3. **Blank Line Separation:** Always leave a blank line between the header and the body, and between paragraphs.

### 5.3 Commit Footer & Issue Linking
1. **Issue References:** Link Paperclip tasks and GitHub issues in the footer using standard issue keywords:
   - `Fixes SOU-6` (closes task upon merge)
   - `Closes SOU-12`
   - `Relates to SOU-4`
   - `Refs #42`
2. **Breaking Changes:** Any commit introducing a breaking API contract, database schema break, or incompatible migration must include:
   - An exclamation mark `!` in the header: `feat(api)!: alter user profile response envelope`
   - A dedicated `BREAKING CHANGE:` footer detailing the break and migration path:
     ```
     BREAKING CHANGE: The `user_profiles` table has renamed `age` to `birth_date`.
     All API clients must update payload schemas to ISO 8601 strings.
     ```
3. **Agent Attribution:** When committing as an autonomous agent, include co-authorship metadata:
   ```
   Co-authored-by: Backend Agent <backend@alongside.internal>
   ```

---

## 6. Complete Commit Examples

### 6.1 Standard Feature Commit
```
feat(agreements): implement 3-tier agreement clause generator

Generate bilateral family media clauses dynamically mapped to the child's
developmental tier and diagnostic readiness score. Supports custom clause
injection and parental overrides.

Fixes SOU-6
Co-authored-by: Backend Agent <backend@alongside.internal>
```

### 6.2 Bug Fix Commit
```
fix(web): prevent hydration mismatch on agreement signature canvas

Defer canvas initialization until after the component mounts on the client,
preventing Next.js SSR hydration errors in React 19.

Fixes SOU-18
Co-authored-by: Frontend Agent <frontend@alongside.internal>
```

### 6.3 Breaking Change Commit
```
refactor(api)!: standardize REST response envelopes to JSend standard

Wrap all successful controller outputs in `{ status: 'success', data: ... }`
and errors in `{ status: 'fail' | 'error', message: ... }`.

BREAKING CHANGE: Removes top-level raw JSON objects from `/api/v1/*` routes.
All frontend API client callers must unpack `response.data`.

Fixes SOU-22
```

### 6.4 Documentation & Governance Commit
```
docs(standards): create plan authoring and git commit standards

Define canonical authoring syntax, document structures, and Conventional
Commits conventions for all autonomous engineering agents.

Fixes SOU-6
Co-authored-by: CTO <cto@alongside.internal>
```

---

## 7. Branch Naming Standards

All feature branches must correspond directly to an assigned Paperclip issue and follow this naming pattern:

```
<type>/<issue-id>-<short-kebab-description>
```

### Allowed Branch Types:
- `feat/`: New feature or implementation plan.
- `fix/`: Bug fix or patch.
- `test/`: Automated test suite additions.
- `docs/`: Documentation or specification authoring.
- `refactor/`: Code reorganization without functional change.
- `chore/`: Dependency, toolchain, or repository maintenance.

### Examples:
- ✅ `feat/SOU-6-readiness-diagnostic-api`
- ✅ `feat/SOU-7-agreement-builder-wizard`
- ✅ `fix/SOU-12-pdf-export-margins`
- ✅ `docs/SOU-4-architecture-specifications`
- ❌ `my-branch` (Missing type, issue ID, and kebab syntax)
- ❌ `feat_sou_6` (Underscores are forbidden; use hyphens and slashes)

---

## 8. Pre-Commit Verification & Ponytail Review Protocol

Before staging changes and running `git commit`, all engineering agents must execute the following 4-step verification gate:

1. **Static Analysis & Typecheck:**
   ```bash
   npm run typecheck && npm run lint
   ```
2. **Automated Unit & Integration Tests:**
   ```bash
   npm test
   ```
3. **Ponytail Diff Audit (`ponytail-review`):**
   Execute the `ponytail-review` skill against the local git diff (`git diff HEAD` or compare branch against `main`):
   - **YAGNI & Bloat Check:** Verify whether any speculative features, wrappers, or unnecessary npm dependencies were introduced. Verify if native code or existing helpers can replace new abstractions.
   - **Blast Radius Verification:** Grep all callers, configuration, types, and fixtures touched by the changes.
   - **Deletion Over Addition:** Ensure dead code, commented-out sections, and obsolete types are purged rather than preserved.
   - **Edge-Case Self-Checks:** Ensure non-trivial branches, security boundaries, and parsers have corresponding unit tests.
4. **Remediation & Commit:**
   Resolve any findings surfaced by the review before creating the atomic Conventional Commit.

---

## 9. Branching & Pull Request (PR) Workflow Mandate

In AlongSide's multi-agent development environment, multiple autonomous agents (Frontend, Backend, Lead Planner) execute concurrently. To maintain repository stability, eliminate merge hazards, and enable thorough code review:

### 9.1 Mandatory PR Rule for All Feature Code
- **Zero Direct Commits to `main`:** All changes involving application source code (`apps/web/`, `apps/api/`, `packages/shared/`, `packages/database/`) **MUST** be developed on an isolated feature branch and merged via Pull Request.
- Committing directly to `main` for code changes is strictly prohibited.

### 9.2 Agent Branch & PR Lifecycle
1. **Branch Out from Main:**
   ```bash
   git checkout main && git pull origin main
   git checkout -b <type>/<issue-id>-<short-kebab-description>
   ```
2. **Implement & Test:** Write the minimal working solution adhering to Ponytail principles.
3. **Run Pre-Commit Verification:**
   ```bash
   npm run typecheck && npm run lint && npm test
   ```
4. **Audit with Ponytail Review:**
   Run `ponytail-review` on `git diff HEAD`. Resolve all bloat or broken caller warnings.
5. **Atomic Commit:**
   ```bash
   git commit -m "<type>(<scope>): <imperative summary>" -m "Fixes <issue-id>"
   ```
6. **Push Branch & Open PR:**
   ```bash
   git push origin <type>/<issue-id>-<short-kebab-description>
   ```
   Open a Pull Request targeting `main`. The PR body must include:
   - Summary of changes
   - Issue reference (`Fixes SOU-X`)
   - Test verification output
   - Ponytail review audit confirmation

### 9.3 Squash & Merge & Branch Auto-Deletion (MANDATORY)
To guarantee a linear, audit-ready Git history on `main`:
1. **Squash and Merge Exclusively:** Every pull request merged into `main` MUST be merged using **Squash and Merge**. Merge commits and rebase merges are disabled repository-wide.
2. **Squash Commit Header:** The squash commit message title must follow Conventional Commits: `<type>(<scope>): <summary> (#<pr-number>)`.
3. **Automatic Branch Deletion:** Feature branches are configured to be **automatically deleted** immediately upon merge by GitHub. Agents must not reuse old branches; each task starts fresh from the latest `main`.

### 9.4 Permitted Exceptions (Direct Commit to `main`)
Direct commits to `main` are restricted exclusively to:
- Pure repository documentation, architecture specifications, or plans authored directly by the CTO (`docs/*.md`, `plans/*.md`).
- Initial single-agent project bootstrapping before multi-agent execution begins.

---

## 10. Anti-Patterns & Strict Prohibitions

The following practices are **strictly prohibited** for all engineering agents:

1. ❌ **Direct Commits to `main` for Application Code:**
   - Pushing feature implementations or refactors directly to `main` without an isolated branch and PR.
2. ❌ **Vague or Sloppy Commit Messages:**
   - Prohibited messages: `wip`, `update`, `fixed stuff`, `changes`, `cleanup`, `fix bug`, `asdf`.
3. ❌ **Mega-Commits (Violating Atomicity):**
   - Committing backend route implementation, frontend UI, database migrations, and unrelated refactoring into a single monolithic commit. Every commit must represent a single logical unit of work.
4. ❌ **Committing Generated Artifacts:**
   - Never commit `node_modules/`, `dist/`, `.next/`, `coverage/`, `*.log`, or temporary scratch files.
5. ❌ **Committing Secrets & Sensitive Credentials:**
   - Never commit `.env` files, production JWT secrets, Stripe live keys, database passwords, or private keys.
6. ❌ **Bypassing Verification (`--no-verify`):**
   - Agents must never use `--no-verify` to bypass pre-commit linters, typechecks, or test suites. Every commit must leave the repository in a passing state (`tsc --noEmit` exits 0).
