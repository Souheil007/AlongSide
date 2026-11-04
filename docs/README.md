# Alongside — Documentation Directory

This directory contains the canonical product, architecture, standards, and evaluation documentation for the **Alongside** platform.

---

## Document Index

### 1. Product & Strategy
- [**`PROJECT_SCOPE.md`**](PROJECT_SCOPE.md) — Product vision, customer personas, problem framing, MVP scope, and business model. Authored by the CEO.
- [**`PAUL_GRAHAM_ROAST.md`**](PAUL_GRAHAM_ROAST.md) — Paul Graham / YC-style brutal startup evaluation, fatal flaw breakdown, and strategic pivot roadmap.

### 2. Architecture & Technical Decisions
- [**`technical-roadmap-v2.4.0.md`**](technical-roadmap-v2.4.0.md) — Canonical Technical Roadmap for Version 2.4.0 (The Holistic Child Upbringing, Pediatric Health & Lifespan Family OS). Authored by the CTO.
- [**`system-design-specification.md`**](system-design-specification.md) — Comprehensive Expert System Design Specification (100k+ DAU capacity sizing, component blueprints, trade-off matrices, failure resiliency protocols).
- [**`tech-stack-decision.md`**](tech-stack-decision.md) — Technology stack choices, rationale, and monorepo structure. Authored by the CTO.
- [**`system-architecture.md`**](system-architecture.md) — System boundaries, data flow diagrams, security posture, and deployment topologies (v2.4.0).
- [**`data-models.md`**](data-models.md) — Canonical Prisma schema and data entity relationships (v2.4.0).
- [**`api-specification.md`**](api-specification.md) — REST API endpoints, schemas, authentication, and HTTP response envelopes (v2.4.0).

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

### 5. Whole-Child Research & Knowledge Base (`docs/research/`)
Authored by the Research Engineer to de-risk engineering and ground Alongside in whole-child developmental psychology, neurobiology, and authentic parent sentiment:
- [**`child-development-research-journey-plan.md`**](research/child-development-research-journey-plan.md) — Canonical Whole-Child Research Journey Plan analyzing 6 developmental cohorts (Ages 5–18+) across 6 dimensions: cognitive architecture (how they think), hormones & physical biology (adrenarche/gonadarche), behavioral comportment & regulation, environmental & systemic transitions, peer social life, and modern digital intersection.
- [**`pediatric-health-triage-protocols.md`**](research/pediatric-health-triage-protocols.md) — Canonical Pediatric Symptom Triage Protocols, age-stratified fever thresholds (neonate <28d through 18y), respiratory distress pyramid, dehydration scoring, anaphylaxis protocols, and antipyretic dosing matrices (AAP / Barton Schmitt / NHS).
- [**`developmental-milestones-0-18.md`**](research/developmental-milestones-0-18.md) — Comprehensive Lifespan Developmental Milestones (Ages 0–18), CDC 2022 revised 75th percentile benchmarks, month-by-month and year-by-year progression across gross/fine motor, speech bursts, intelligibility percentages, and red-flag screening triggers (ASQ-3 / M-CHAT-R/F).
- [**`pediatric-nutrition-feeding-science.md`**](research/pediatric-nutrition-feeding-science.md) — Pediatric Nutrition & Feeding Science: infant solids introduction, BLW vs purees, early allergen introduction (LEAP / EAT trials), choking prevention vs gagging reflex, strict infant prohibitions (<1y), and toddler picky eating solutions via Ellyn Satter's Division of Responsibility.
- [**`brain-games-sensory-play-toys.md`**](research/brain-games-sensory-play-toys.md) — Brain Games, Sensory Play & Early Toys/Puppets: cognitive enrichment, Harvard Serve & Return interaction framework, Montessori sensitive periods, AAP play guidelines, and age-indexed toy/activity matrices from high-contrast puppets to Socratic lateral thinking.
- [**`age-by-age-neurodevelopment-matrix.md`**](research/age-by-age-neurodevelopment-matrix.md) — Comprehensive Whole-Child Developmental, Biological & Behavioral Matrix across all 6 cohorts with physical growth, endocrine shifts, dACC social pain circuitry, pubertal +2hr circadian delay, and emotional language decoders.
- [**`modern-parenting-faq-vault-100.md`**](research/modern-parenting-faq-vault-100.md) — Living vault of pediatric-reviewed modern parenting questions, neurobiological rationales, and 3-step connection-first scripts across emotional regulation, puberty, school transitions, screen boundaries, and complex digital culture.
- [**`parent-social-sentiment-and-real-voices.md`**](research/parent-social-sentiment-and-real-voices.md) — Deep social mining report of authentic parent distress across Reddit (`r/Parenting`, `r/daddit`, `r/Mommit`, `r/ParentingTeens`), analyzing the 10 acute flashpoints (meltdowns, adrenarche, school anxiety, bedroom withdrawal) and failure modes of legacy tools.
- [**`youth-slang-and-device-exploit-catalog.md`**](research/youth-slang-and-device-exploit-catalog.md) — Complete 50+ term youth slang lexicon categorized by safety (Green, Yellow, Red) and 15+ real-world device bypass exploits (Calculator Vaults, Apple Notes browsers, time-zone spoofing) with AlongSide zero-spyware MDM countermeasures.
- [**`knowledge-base-literature-and-source-ecosystem.md`**](research/knowledge-base-literature-and-source-ecosystem.md) — Canonical Knowledge Base literature, blogs, institutional research authorities, and PostgreSQL 16 `pgvector` RAG schema architecture.
- [**`PLAN-15: Whole-Child Development Research & Knowledge Base`**](../plans/15-child-development-research-and-knowledge-base.md) — Official engineering execution plan for the whole-child research journey.
