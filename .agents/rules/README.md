# Alongside — Active Agent Rules (`.agents/rules/`)

This directory contains **active operational rules** automatically discovered and injected into AI agent execution contexts (Antigravity, Cursor, Windsurf, Paperclip).

---

## 🏛️ Architecture: `docs/` vs. `.agents/rules/`

| Dimension | `docs/` (Human & Reference Docs) | `.agents/rules/` (Active Agent Rules) |
| :--- | :--- | :--- |
| **Primary Audience** | Human engineers, architects, contributors, CTO. | Autonomous AI Agents (Frontend, Backend, QA, CTO). |
| **System Behavior** | Passive reference. Agents only see them if explicitly opened. | **Active injection.** Automatically discovered and loaded into context. |
| **Content Style** | Comprehensive, explanatory, diagrams, rationale, full specs. | Concise, imperative, zero-fluff constraints and guardrails. |
| **Size & Limits** | Unrestricted length and detail. | Optimized for LLM context budgets (< 24 KB per file). |

---

## 📋 Active Rule Index

1. [**`01-plan-standards.md`**](./01-plan-standards.md) — Plan naming syntax, mandatory 8 sections, and lifecycle verification.
2. [**`02-git-commits.md`**](./02-git-commits.md) — Conventional Commits v1.0.0 syntax, monorepo scopes, and banned commit patterns.
3. [**`03-agent-boundaries.md`**](./03-agent-boundaries.md) — Strict directory ownership (Frontend vs. Backend), cross-imports, and mocking protocols.
4. [**`04-code-quality-and-testing.md`**](./04-code-quality-and-testing.md) — Strict TypeScript, zero unhandled errors, test coverage, and security requirements.
5. [**`05-frontend-skill-matrix.md`**](./05-frontend-skill-matrix.md) — Frontend autonomous skill dispatch matrix, invocation rules, and quality gates.
6. [**`06-codebase-design.md`**](./06-codebase-design.md) — Deep module architecture, seam discipline, dependency acceptance, and the Deletion Test.
7. [**`07-backend-skill-matrix.md`**](./07-backend-skill-matrix.md) — Backend autonomous skill dispatch matrix, Fastify plugin encapsulation, schema serialization, Node.js v22 runtime patterns, and `.inject()` testing.
