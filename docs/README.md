# Alongside — Documentation Directory

This directory contains the canonical product, architecture, standards, and evaluation documentation for the **Alongside** platform.

---

## Document Index

### 1. Product & Strategy
- [**`PROJECT_SCOPE.md`**](../PROJECT_SCOPE.md) — Product vision, customer personas, problem framing, MVP scope, and business model. Authored by the CEO.
- [**`COMPETITIVE_ANALYSIS.md`**](COMPETITIVE_ANALYSIS.md) — Comprehensive competitive intelligence, 6-silo landscape audit, quantitative comparison matrix, where competitors win vs. where we win, and strategic differentiation. Authored by the CEO.
- [**`PAUL_GRAHAM_ROAST.md`**](PAUL_GRAHAM_ROAST.md) — Paul Graham / YC-style brutal startup evaluation, fatal flaw breakdown, and strategic pivot roadmap.

### 2. Architecture & Technical Decisions
- [**`system-design-specification.md`**](system-design-specification.md) — Comprehensive Expert System Design Specification (100k+ DAU capacity sizing, component blueprints, trade-off matrices, failure resiliency protocols).
- [**`system-architecture.md`**](system-architecture.md) — System boundaries, data flow diagrams, security posture, and deployment topologies (v2.4.0).
- [**`system-design-tier-0-decomposition.md`**](system-design-tier-0-decomposition.md) — Early Childhood Tier 0 Decomposition and Sub-Tranche Engine Architecture (Ages 0–3).
- [**`platform-advisory-rearchitecture-and-academy-chapters-spec.md`**](platform-advisory-rearchitecture-and-academy-chapters-spec.md) — Advisory Platform Rearchitecture, Navigation Streamlining, and Prioritized Academy Curriculum Specification.
- [**`parent-intelligence-academy-course-content-and-format-specification.md`**](parent-intelligence-academy-course-content-and-format-specification.md) — Parent Intelligence Academy: Course Content, Length, Format & Multi-Modal Architecture Specification (SOU-92).
- [**`parent-intelligence-academy-lesson-experience-and-ux-specification.md`**](parent-intelligence-academy-lesson-experience-and-ux-specification.md) — Parent Intelligence Academy: Lesson Experience, Content Format & Multi-Modal UX Specification (SOU-98).
- [**`parent-intelligence-academy-8-tier-curriculum-synthesis-spec.md`**](parent-intelligence-academy-8-tier-curriculum-synthesis-spec.md) — Parent Intelligence Academy: 8-Tier Curriculum Synthesis, 40-Course Taxonomy & Master Video Lecture Integration Specification (SOU-102 / PLAN-39).
- [**`parent-intelligence-academy-lesson-content-audit-and-architecture.md`**](parent-intelligence-academy-lesson-content-audit-and-architecture.md) — Parent Intelligence Academy: Lesson Content Audit, 3 Archetypes, Unified Blog Reader & Platform-Wide De-Clinicalization Specification (SOU-113 / PLAN-40).
- [**`tech-stack-decision.md`**](tech-stack-decision.md) — Technology stack choices, rationale, and monorepo structure. Authored by the CTO.
- [**`data-models.md`**](data-models.md) — Canonical Prisma schema and data entity relationships (v2.4.0).
- [**`api-specification.md`**](api-specification.md) — REST API endpoints, schemas, authentication, and HTTP response envelopes (v2.4.0).

### 3. Design System & Design Explorations (`docs/design-system/` & `docs/design/`)
- [**`MASTER.md`**](design-system/MASTER.md) — Canonical AlongSide Master Design System (Taste 2: Editorial Pediatric Almanac, 3-layer tokens, typography scales, component rules).
- [**`culture-digest/`**](design/culture-digest/) — Sunday Youth Culture Digest visual designs, interactive HTML prototypes (Directions A–N), and comparison matrices.
- [**`design/academy-lesson-before-after/index.html`**](design/academy-lesson-before-after/index.html) — Interactive Before/After Visual Architecture: Unified Blog Reader, Archetypes, and Friction Purge (SOU-113 / PLAN-40).
- [**`docs/design/`**](design/) — Visual architecture benchmarks (Subframe, Vercel, Wise, Linear, Stripe).

### 4. Product Launch & Media Production
- [**`higgsfield-seedance-demo-video-prompts.md`**](higgsfield-seedance-demo-video-prompts.md) — Canonical AlongSide Demo Videos: Higgsfield Seedance 2.5 Production Prompts, Motion Choreography & Native Audio Specification (SOU-111).
- [**`higgsfield-seedance-demo-video-prompts-cheat-sheet.md`**](higgsfield-seedance-demo-video-prompts-cheat-sheet.md) — Quick-copy prompt cheat sheet and 1-click Higgsfield CLI / MCP runner for Seedance 2.5 480p 30s demo videos (SOU-111).
- [**`launch-demo-video-production-prompt-suite.md`**](launch-demo-video-production-prompt-suite.md) — Canonical AlongSide Launch Demo Video Production Prompt Suite, Cinematographic Storyboard & Claude MCP Specification (SOU-101).
- [**`launch-demo-video-quick-prompts.md`**](launch-demo-video-quick-prompts.md) — Quick-copy prompt cheat sheet for Claude MCP, Midjourney, Flux, and TTS audio synthesis (SOU-101).

### 5. Engineering Standards (`docs/engineering-standards/`)
Canonical human and agent engineering standards:
- [**`codebase-design.md`**](engineering-standards/codebase-design.md) — Deep module architecture, seam catalog (7 canonical seams), test fake adapters, and leverage principles.
- [**`frontend-skill-matrix.md`**](engineering-standards/frontend-skill-matrix.md) — Frontend autonomous skill dispatch matrix, invocation rules, and quality gates.
- [**`backend-skill-matrix.md`**](engineering-standards/backend-skill-matrix.md) — Backend autonomous skill dispatch matrix, Fastify plugin encapsulation, Node.js LTS v22 runtime patterns, and `.inject()` testing.
- [**`plan-standards.md`**](engineering-standards/plan-standards.md) — Canonical rules for engineering plan authoring, naming conventions, and lifecycle.
- [**`git-commit-standards.md`**](engineering-standards/git-commit-standards.md) — Conventional Commits v1.0.0, branch naming, monorepo scopes, and anti-patterns.
- [**`code-quality-principles.md`**](engineering-standards/code-quality-principles.md) — Architectural principles, SOLID/DRY guidelines, error handling, and test requirements.
- [**`naming-conventions.md`**](engineering-standards/naming-conventions.md) — File, variable, database, and API route naming standards.
- [**`documentation-standards.md`**](engineering-standards/documentation-standards.md) — Canonical rules for code comments, PR descriptions, and markdown documentation.

### 6. Active AI Agent Rules (`.agents/rules/`)
Machine-enforceable rules automatically discovered and loaded into autonomous agent system prompts:
- [**`01-plan-standards.md`**](../.agents/rules/01-plan-standards.md) — Plan syntax & mandatory structure.
- [**`02-git-commits.md`**](../.agents/rules/02-git-commits.md) — Conventional commit rules & banned anti-patterns.
- [**`03-agent-boundaries.md`**](../.agents/rules/03-agent-boundaries.md) — Frontend vs Backend directory ownership.
- [**`04-code-quality-and-testing.md`**](../.agents/rules/04-code-quality-and-testing.md) — TypeScript, testing & security enforcement.
- [**`05-frontend-skill-matrix.md`**](../.agents/rules/05-frontend-skill-matrix.md) — Frontend autonomous skill invocation matrix and design critique gates.
- [**`06-codebase-design.md`**](../.agents/rules/06-codebase-design.md) — Deep modules, seam catalog, dependency acceptance, and the Deletion Test.
- [**`07-backend-skill-matrix.md`**](../.agents/rules/07-backend-skill-matrix.md) — Backend autonomous skill invocation matrix, Fastify plugin encapsulation, schema serialization, Node.js v22 runtime patterns, and `.inject()` testing.

### 7. Whole-Child Research & Knowledge Base (`docs/research/`)
Authored by the Research Engineer to de-risk engineering and ground Alongside in whole-child developmental psychology, neurobiology, and authentic parent sentiment:
- [**`docs/research/README.md`**](research/README.md) — **Master Index of the 8 Lifespan Developmental Tier Research Vaults** (48 canonical research documents across all ages from 0 to 18).
- [**`tier-0a-infancy-0-1/`**](research/tier-0a-infancy-0-1/) — Infancy (Ages 0–1 / 0–12m): Somatic Regulation, Sleep Architecture & Feeding Foundations.
- [**`tier-0b-toddler-1-2/`**](research/tier-0b-toddler-1-2/) — Young Toddler (Ages 1–2 / 12–24m): Locomotion, Receptive/Expressive Gap & Co-Regulation.
- [**`tier-0c-older-toddler-2-3/`**](research/tier-0c-older-toddler-2-3/) — Older Toddler (Ages 2–3 / 24–36m): Autonomy vs Shame, Potty Learning & Boundary Testing.
- [**`tier-1-early-childhood-4-6/`**](research/tier-1-early-childhood-4-6/) — Early Childhood (Ages 4–6): Theory of Mind, Cooperative Rules & Screen Introduction.
- [**`tier-2-middle-childhood-7-9/`**](research/tier-2-middle-childhood-7-9/) — Middle Childhood (Ages 7–9): Adrenarche Awakening, Concrete Operations & Sports.
- [**`tier-3-pre-teen-10-12/`**](research/tier-3-pre-teen-10-12/) — Pre-Teen / Tweens (Ages 10–12): Gonadarche, Social Brain dACC Pain & Group Chats.
- [**`tier-4-early-adolescence-13-15/`**](research/tier-4-early-adolescence-13-15/) — Early Adolescence (Ages 13–15): Peak Puberty, +2h Circadian Shift & Digital Amnesties.
- [**`tier-5-late-adolescence-16-18/`**](research/tier-5-late-adolescence-16-18/) — Late Adolescence / Launch (Ages 16–18+): Executive Maturation & Digital Sovereignty.
- [**`developmental-milestones-0-18.md`**](research/developmental-milestones-0-18.md) — Comprehensive Lifespan Developmental Milestones (Ages 0–18), CDC 2022 revised 75th percentile benchmarks, month-by-month and year-by-year progression across gross/fine motor, speech bursts, intelligibility percentages, and red-flag screening triggers (ASQ-3 / M-CHAT-R/F).
- [**`pediatric-nutrition-feeding-science.md`**](research/pediatric-nutrition-feeding-science.md) — Pediatric Nutrition & Feeding Science: infant solids introduction, BLW vs purees, early allergen introduction (LEAP / EAT trials), choking prevention vs gagging reflex, strict infant prohibitions (<1y), and toddler picky eating solutions via Ellyn Satter's Division of Responsibility.
- [**`brain-games-sensory-play-toys.md`**](research/brain-games-sensory-play-toys.md) — Brain Games, Sensory Play & Early Toys/Puppets: cognitive enrichment, Harvard Serve & Return interaction framework, Montessori sensitive periods, AAP play guidelines, and age-indexed toy/activity matrices from high-contrast puppets to Socratic lateral thinking.
- [**`age-by-age-neurodevelopment-matrix.md`**](research/age-by-age-neurodevelopment-matrix.md) — Comprehensive Whole-Child Developmental, Biological & Behavioral Matrix across all 6 cohorts with physical growth, endocrine shifts, dACC social pain circuitry, pubertal +2hr circadian delay, and emotional language decoders.
- [**`modern-parenting-faq-vault-100.md`**](research/modern-parenting-faq-vault-100.md) — Living vault of pediatric-reviewed modern parenting questions, neurobiological rationales, and 3-step connection-first scripts across emotional regulation, puberty, school transitions, screen boundaries, and complex digital culture.
- [**`parent-social-sentiment-and-real-voices.md`**](research/parent-social-sentiment-and-real-voices.md) — Deep social mining report of authentic parent distress across Reddit (`r/Parenting`, `r/daddit`, `r/Mommit`, `r/ParentingTeens`), analyzing the 10 acute flashpoints (meltdowns, adrenarche, school anxiety, bedroom withdrawal) and failure modes of legacy tools.
- [**`youth-slang-and-device-exploit-catalog.md`**](research/youth-slang-and-device-exploit-catalog.md) — Complete 50+ term youth slang lexicon categorized by safety (Green, Yellow, Red) and 15+ real-world device bypass exploits (Calculator Vaults, Apple Notes browsers, time-zone spoofing) with AlongSide zero-spyware MDM countermeasures.
- [**`knowledge-base-literature-and-source-ecosystem.md`**](research/knowledge-base-literature-and-source-ecosystem.md) — Canonical Knowledge Base literature, blogs, institutional research authorities, and PostgreSQL 16 `pgvector` RAG schema architecture.
- [**`PLAN-15: Whole-Child Development Research & Knowledge Base`**](../plans/15-child-development-research-and-knowledge-base.md) — Official engineering execution plan for the whole-child research journey.
