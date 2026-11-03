# Agent Rule: Plan Authoring & Naming Standards

Canonical Specification: [`docs/plan-standards.md`](file:///C:/GithubProjects/AlongSide/docs/plan-standards.md)  
Applies To: CTO Agent, Technical Planners, Executing Engineers  

---

## 1. Plan File Naming Syntax (STRICT)

All engineering plans MUST be placed in `plans/` using two-digit zero-padded kebab-case:
```
plans/[XX]-[short-kebab-case-descriptive-title].md
```
- ✅ `plans/01-project-setup-and-db.md`
- ✅ `plans/06-agreement-engine-and-pdf-backend.md`
- ❌ FORBIDDEN: `plans/plan1.md`, `plans/01_auth.md`, PascalCase, or snake_case.

Plan ID reference format: `PLAN-[XX]` (e.g., `PLAN-01`, `PLAN-06`).

---

## 2. Mandatory 8-Section Plan Structure

Every plan authored MUST contain the following 8 sections in exact sequence:
1. **Metadata Header:** Plan ID, Assigned Agent (`Backend Agent`, `Frontend Agent`, `Joint`), Dependencies (`PLAN-[YY]` or `None`), Scope estimate.
2. **Objective & Business Value:** Problem statement aligned with `PROJECT_SCOPE.md`.
3. **Inputs & Architectural References:** Markdown links to `docs/*.md`.
4. **Preconditions & Dependency Verification:** Assert predecessor plans are `done`.
5. **Step-by-Step Implementation Tasks:** Numbered tasks with exact file paths, schemas, and code blocks.
6. **Specific Deliverables (Files to Create / Modify):** Actionable checkbox checklist of every target file.
7. **Acceptance Criteria & Test Verification:** Executable verification commands (`npm run typecheck`, `npm test`, Fastify inject, Vitest).
8. **Role Boundaries & Prohibitions:** Explicit list of forbidden directories and actions for the executing agent.
9. **Definition of Done (DoD) Checklist:** Final quality signoff items.

---

## 3. Plan Execution & Ownership Constraints

- **Single-Agent Ownership:** An execution plan must be assigned to ONE executing agent (`Backend Agent` OR `Frontend Agent`). If a feature requires both, split into two sequential plans (e.g. `PLAN-04` Backend, `PLAN-05` Frontend).
- **Dependency Enforcement:** Never start a plan whose prerequisite plans have not been verified and completed.
