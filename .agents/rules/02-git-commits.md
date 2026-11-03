# Agent Rule: Conventional Commits & Branch Naming

Canonical Specification: [`docs/git-commit-standards.md`](file:///C:/GithubProjects/AlongSide/docs/git-commit-standards.md)  
Applies To: All Autonomous Agents, Engineers, and Authors  

---

## 1. Commit Message Syntax (STRICT)

All Git commit messages MUST strictly conform to Conventional Commits v1.0.0:
```
<type>(<scope>): <imperative description>

[optional body]

[optional footer(s)]
```

### Allowed Types:
- `feat`: New feature or user-facing capability
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Formatting, semi-colons, whitespace
- `refactor`: Code restructure without bug fix or new feature
- `perf`: Performance optimization
- `test`: Adding or updating test suites
- `build`: Build system or dependency updates
- `ci`: CI/CD automation changes
- `chore`: Maintenance tasks

### Allowed Monorepo Scopes:
- Package scopes: `api`, `web`, `shared`, `database`
- Domain scopes: `auth`, `diagnostic`, `agreements`, `academy`, `quiz`, `device-mdm`, `billing`
- Governance scopes: `plans`, `docs`, `standards`, `agents`

### Commit Message Rules:
- Description MUST use imperative, present tense ("add", "fix", not "added", "fixes").
- First letter lowercase, NO trailing period.
- Footers must link issues (e.g. `Fixes SOU-6`).

---

## 2. Pre-Commit Quality Gate: Ponytail Review (`ponytail-review`)

Before staging and executing any `git commit`, agents MUST run an automated or self-guided **Ponytail Review** (`ponytail-review` skill) on their working diff (`git diff HEAD`):

1. **Anti-Bloat & YAGNI Audit:**
   - Did I add any files, helpers, wrappers, or speculative options that were not requested?
   - Can this solution be achieved with fewer lines or native platform APIs?
   - Deletion beats addition: Are dead code and obsolete comments cleaned up?
2. **Blast Radius & Caller Check:**
   - Did I grep and verify all callers, tests, exports, and configs affected by this change?
3. **Edge Case & Test Verification:**
   - Is new non-trivial logic guarded by an assert-based unit test?
4. **Actionable Remediation:**
   - Fix all findings identified by `ponytail-review` BEFORE committing.

---

## 3. Banned Anti-Patterns (ZERO TOLERANCE)

The following commit messages are strictly forbidden and will be rejected:
- ❌ `wip`, `update`, `fixed stuff`, `changes`, `commit`
- ❌ Commits with empty messages
- ❌ Mega-commits touching both `apps/api` and `apps/web` simultaneously
- ❌ Commits containing plaintext secrets (`.env`), API keys, or credentials
- ❌ Commits containing build artifacts (`dist/`, `node_modules/`, `.next/`)

---

## 4. Feature Branch Naming Syntax

All feature branches must follow:
```
<type>/<issue-id>-<short-description>
```
Examples:
- `feat/SOU-6-readiness-diagnostic-api`
- `fix/SOU-12-bedtime-lock-timezone`
- `docs/SOU-4-parent-intelligence-scope`

---

## 5. Branch & Pull Request (PR) Mandate (STRICT)

To eliminate merge conflicts and ensure thorough code review:
- **Zero Direct Commits to `main` for Code:** All changes to `apps/api/`, `apps/web/`, `packages/shared/`, and `packages/database/` MUST be developed on an isolated feature branch and merged via Pull Request (PR). Direct commits to `main` are strictly prohibited.
- **Task Lifecycle:**
  1. **Branch:** `git checkout -b <type>/<issue-id>-<short-description>` from latest `main`.
  2. **Implement & Test:** Write modular code, run test suite (`npm test`).
  3. **Verify:** Execute `npm run typecheck`, `npm run lint`.
  4. **Ponytail Audit:** Run `ponytail-review` on working diff (`git diff HEAD`).
  5. **Commit:** Atomic Conventional Commits referencing the issue.
  6. **Push & PR:** `git push origin <branch-name>` and create a PR targeting `main`. Ensure the PR title follows Conventional Commits syntax (`<type>(<scope>): <summary>`).
- **Squash Commit & PR Body Formatting: Plain Text (`.txt`) ONLY (STRICT):**
  * **Zero Markdown Syntax:** When writing the PR description or squash commit message, write in **clean plain text (`.txt` style)**. NEVER use Markdown (`.md`).
  * GitHub squash merges copy the PR body directly into the commit message. In git terminal logs (`git log`, `git show`), Markdown is never rendered and raw `##`, `**bold**`, `[link](url)` clutter the history.
  * **Prohibited:** `## Summary`, `[**Plan**](...)`, `**Title**:`, backtick blocks.
  * **Required:** Plain uppercase section headers (`SUMMARY:`, `DELIVERABLES:`, `VERIFICATION:`), clean `- ` bullets, plain file paths, and hard line wraps at ~72 characters.
- **Squash & Merge & Branch Auto-Deletion (MANDATORY):**
  * Every pull request merged into `main` MUST be **Squashed and Merged**. Standard merge commits and rebase merges are strictly disabled.
  * The squash commit description on `main` must be verified as plain text (`.txt`).
  * The feature branch is **automatically deleted** immediately upon merge to prevent stale branch drift and maintain a clean repository.
- **Exception:** Only pure repository governance/doc updates authored directly by the CTO or single-agent initial workspace bootstrapping may commit directly to `main`.
