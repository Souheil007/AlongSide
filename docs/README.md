# Alongside — Documentation Directory

This directory contains the canonical product, architecture, standards, and evaluation documentation for the **Alongside** platform.

---

## Document Index

### 1. Product & Strategy
- [**`PROJECT_SCOPE.md`**](PROJECT_SCOPE.md) — Product vision, customer personas, problem framing, MVP scope, and business model. Authored by the CEO.
- [**`PAUL_GRAHAM_ROAST.md`**](PAUL_GRAHAM_ROAST.md) — Paul Graham / YC-style brutal startup evaluation, fatal flaw breakdown, and strategic pivot roadmap.

### 2. Architecture & Technical Decisions
- [**`system-design-specification.md`**](system-design-specification.md) — Comprehensive Expert System Design Specification (100k+ DAU capacity sizing, component blueprints, trade-off matrices, failure resiliency protocols).
- [**`tech-stack-decision.md`**](tech-stack-decision.md) — Technology stack choices, rationale, and monorepo structure. Authored by the CTO.
- [**`system-architecture.md`**](system-architecture.md) — System boundaries, data flow diagrams, security posture, and deployment topologies.
- [**`data-models.md`**](data-models.md) — Canonical Prisma schema and data entity relationships.
- [**`api-specification.md`**](api-specification.md) — REST API endpoints, schemas, authentication, and HTTP response envelopes.

### 3. Engineering Standards (Human Reference)
- [**`codebase-design.md`**](codebase-design.md) — Deep module architecture, seam catalog (7 canonical seams), test fake adapters, and leverage principles.
- [**`frontend-skill-matrix.md`**](frontend-skill-matrix.md) — Frontend autonomous skill dispatch matrix, invocation rules, and quality gates.
- [**`backend-skill-matrix.md`**](backend-skill-matrix.md) — Backend autonomous skill dispatch matrix, Fastify plugin encapsulation, Node.js LTS v22 runtime patterns, and `.inject()` testing.
- [**`plan-standards.md`**](plan-standards.md) — Canonical rules for engineering plan authoring, naming conventions, and lifecycle.
- [**`git-commit-standards.md`**](git-commit-standards.md) — Conventional Commits v1.0.0, branch naming, monorepo scopes, and anti-patterns.
- [**`code-quality-principles.md`**](code-quality-principles.md) — Architectural principles, SOLID/DRY guidelines, error handling, and test requirements.
- [**`naming-conventions.md`**](naming-conventions.md) — File, variable, database, and API route naming standards.
- [**`documentation-standards.md`**](documentation-standards.md) — Canonical rules for code comments, PR descriptions, and markdown documentation.

### 4. Active AI Agent Rules (`.agents/rules/`)
Machine-enforceable rules automatically discovered and loaded into autonomous agent system prompts:
- [**`01-plan-standards.md`**](../.agents/rules/01-plan-standards.md) — Plan syntax & mandatory structure.
- [**`02-git-commits.md`**](../.agents/rules/02-git-commits.md) — Conventional commit rules & banned anti-patterns.
- [**`03-agent-boundaries.md`**](../.agents/rules/03-agent-boundaries.md) — Frontend vs Backend directory ownership.
- [**`04-code-quality-and-testing.md`**](../.agents/rules/04-code-quality-and-testing.md) — TypeScript, testing & security enforcement.
- [**`05-frontend-skill-matrix.md`**](../.agents/rules/05-frontend-skill-matrix.md) — Frontend autonomous skill invocation matrix and design critique gates.
- [**`06-codebase-design.md`**](../.agents/rules/06-codebase-design.md) — Deep modules, seam catalog, dependency acceptance, and the Deletion Test.
- [**`07-backend-skill-matrix.md`**](../.agents/rules/07-backend-skill-matrix.md) — Backend autonomous skill invocation matrix, Fastify plugin encapsulation, schema serialization, Node.js v22 runtime patterns, and `.inject()` testing.

### 5. Research & Child Development Knowledge Base (`docs/research/`)
Authored by the Research Engineer to de-risk engineering and populate the Parent Intelligence Academy and AI Advisor:
- [**`child-development-research-journey-plan.md`**](research/child-development-research-journey-plan.md) — Comprehensive multi-phase research journey plan, age-tier developmental matrix (Ages 5–18+), primary source taxonomy (AAP, APA, NIH, Pew), real parent voice mining strategy (Reddit, X), youth slang lexicon, and covert device exploit catalog.
- [**`age-by-age-neurodevelopment-matrix.md`**](research/age-by-age-neurodevelopment-matrix.md) — Deep neurodevelopmental profiles, dopamine reward loops, pubertal circadian phase shifts (+2hr melatonin delay), emotional language decoders, and word-for-word scripts across all 6 age cohorts.
- [**`modern-parenting-faq-vault-100.md`**](research/modern-parenting-faq-vault-100.md) — Living vault of 100+ clinical and pediatric-reviewed modern parenting questions, neurobiological rationales, and 3-step word-for-word crisis scripts across 5 core domains.
- [**`parent-social-sentiment-and-real-voices.md`**](research/parent-social-sentiment-and-real-voices.md) — Deep social mining report of authentic parent distress across Reddit (`r/Parenting`, `r/daddit`, `r/ParentingTeens`), X, and Substack, analyzing the top 10 flashpoints and forensic failure modes of legacy tools (Bark, Apple Screen Time, paper pacts).
- [**`youth-slang-and-device-exploit-catalog.md`**](research/youth-slang-and-device-exploit-catalog.md) — Complete 50+ term youth slang lexicon categorized by safety (Green, Yellow, Red) and 15+ real-world device bypass exploits (Calculator Vaults, Apple Notes browsers, time-zone spoofing) with AlongSide zero-spyware MDM countermeasures.
- [**`PLAN-15: Child Development Research & Knowledge Base`**](../plans/15-child-development-research-and-knowledge-base.md) — Official engineering execution plan for the research journey.
