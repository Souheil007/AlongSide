# Architectural Decision Record: Core Technology Stack
**Status:** Approved (Updated for Scope v2.2.0 — The Comprehensive Parent Intelligence Platform)  
**Author:** Chief Technology Officer (CTO)  
**Date:** November 2026  
**Audience:** Engineering Team (Frontend Engineer, Backend Engineer), Product Team  

---

## 1. Context & Problem Statement

AlongSide has evolved from a simple static agreement generator into a comprehensive **Parent Intelligence Platform & Family Operating System** (documented in `PROJECT_SCOPE.md` v2.2.0). The platform unites deep parental education, interactive gamified assessments, 24/7 AI child guidance, and an operational "Pact-as-Code" device governance bridge.

The technical architecture must satisfy the following critical criteria:
1. **Instant Utility & Low Friction:** Parents are often tired and stressed when consulting AlongSide. Load times must be sub-second, mobile navigation fluid, and interactions empathetic.
2. **Multi-Platform Access (Web & Mobile PWA):** Parents access AlongSide across mobile devices (standing in the kitchen, school pickup line) and desktops (reviewing agreements, joint quizzes). A high-performance PWA delivers immediate app-like access without App Store install friction.
3. **24/7 AI Intelligence Layer (RAG & Low-Latency Streaming):** Deliver contextual, pediatrician- and psychologist-reviewed guidance in real time, personalized by child age tier and contextual road (`PRE_DEVICE` vs. `ACTIVE_DEVICE`).
4. **"Pact-as-Code" Native Device Management (MDM):** Compile bilateral family agreements into cryptographically signed Apple Declarative Management (`.mobileconfig`) and Android Enterprise enrollment payloads with zero-spyware guarantees.
5. **Interactive Gamified Assessment Engine:** Flexible quiz and diagnostic scoring across cultural fluency ("Do You Speak Tween?"), parenting styles, and first-phone readiness (0–100 score).
6. **Child & Family Privacy (Safe Harbor):** Collect minimum PII, encrypt minor data at rest and in transit, and strictly enforce tenant isolation (COPPA / GDPR-K compliance).
7. **Decoupled AI Agent Ownership:** Clean, enforceable architectural boundaries separating the **Frontend Agent** (`apps/web/`) and the **Backend Agent** (`apps/api/`, `packages/database/`).

---

## 2. Technology Stack Decision Matrix

| Architectural Layer | Chosen Technology | Rationale & Alternatives Considered |
| :--- | :--- | :--- |
| **Monorepo Architecture** | **npm Workspaces (`apps/web`, `apps/api`, `packages/shared`, `packages/database`)** | Lightweight, zero-config workspace isolation. Decouples Frontend Agent from Backend Agent with zero dependency collisions. |
| **Frontend Framework** | **Next.js 15 (App Router, React 19, TypeScript)** | React Server Components (RSC) for lightning-fast Academy modules and Culture digests; Client Components for multi-step Pact Wizard and interactive Quiz runners. |
| **Styling & Design System** | **Tailwind CSS v3.4 + Radix UI / `shadcn/ui`** | Headless accessible UI primitives with utility styling. Warm, non-punitive "Parent Calm" aesthetic with high visual polish and zero runtime CSS bloat. |
| **Client State & Data Fetching** | **TanStack Query (React Query v5) + Zustand** | TanStack Query handles server state caching, background invalidation, and optimistic updates; Zustand manages multi-step quiz and agreement wizard state. |
| **Offline PWA Engine** | **`@ducanh2912/next-pwa` (Serwist)** | Offline caching for crisis conversation scripts, platform decoders, and academy lessons. Instant "Add to Home Screen" on iOS/Android. |
| **Backend Runtime & Framework** | **Node.js (LTS v22) + Fastify (TypeScript)** | 2–3x throughput compared to Express, built-in schema serialization, low memory footprint, first-class TypeScript support, and native Server-Sent Events (SSE). |
| **Database & Vector Storage** | **PostgreSQL 16 with `pgvector`** | Relational integrity for parent-child-agreement hierarchies, JSONB for flexible quiz results, and unified vector embeddings for AI FAQ retrieval without third-party vector DB sprawl. |
| **ORM & Migrations** | **Prisma ORM** | Type-safe declarative data modeling, automatic migration management, and robust seed scripts for Academy modules and FAQ catalogs. |
| **Validation & Contracts** | **Zod (Shared via `@alongside/shared`)** | Single source of truth for runtime validation on both Fastify API route boundaries and React Hook Form client submissions. |
| **Authentication & Sessions** | **Argon2id + HTTP-only Secure JWT Cookie Rotation** | State-of-the-art password hashing with rotating JWT cookies. Immune to XSS token theft; supports CSRF double-submit protection. |
| **AI Orchestration & Streaming** | **Vercel AI SDK / OpenAI Client (`gpt-4o-mini` / `gpt-4o`)** | Streaming text generation over Fastify SSE for the 24/7 AI Advisor; cosine similarity retrieval over PostgreSQL `pgvector` for curated pediatric FAQs. |
| **Device Profile & Cryptography** | **`node-forge` + `plist` + `qrcode`** | Server-side generation and PKCS#7 / CMS cryptographic signing of Apple `.mobileconfig` profiles and Android Enterprise policies; QR code generation for 60-second mobile enrollment. |
| **Document Export** | **`@react-pdf/renderer` + Print CSS Stylesheet** | Refrigerator-ready print layouts via `@media print` CSS and downloadable vector PDF pacts with co-signature blocks. |
| **Background Jobs & Scheduling** | **BullMQ + Redis (or node-cron for local dev)** | Reliable async queue for Sunday morning Culture Digests, weekly parent nudges, and subscription renewal grace periods. |
| **Billing & Monetization** | **Stripe Billing (Node.js SDK)** | Stripe Checkout and Customer Portal integration supporting 7-day risk-free trials, $79/yr Annual Hero Pass, $9.99/mo Flex Pass, and webhook synchronization. |
| **Testing Suite** | **Vitest + Playwright** | Native ESM/TypeScript testing at blistering speed; Fastify `.inject()` integration tests; Playwright end-to-end verification for critical parent journeys. |

---

## 3. Deep-Dive Architectural Decisions

### 3.1 AI Architecture: PostgreSQL `pgvector` vs. External Vector DBs
- **Decision:** Use PostgreSQL 16 with the native `pgvector` extension for storing and searching vector embeddings of the 100+ Modern Parenting FAQs and clinical pediatric guidance.
- **Rationale:** 
  - Avoids infrastructure sprawl (no separate Pinecone, Qdrant, or Weaviate clusters).
  - Enables transactional joins between child context (age tier, road type) and FAQ embeddings in a single database query.
  - Cost-efficient and fully compatible with existing backup/restore pipelines.

### 3.2 "Pact-as-Code" Device Management: Native Profiles vs. Spyware MDM
- **Decision:** Architect AlongSide as an open, transparent Apple Declarative Management / `.mobileconfig` and Android Enterprise configuration generator rather than an invasive surveillance agent.
- **Rationale:**
  - **Zero Spyware Guarantee:** Never monitor keystrokes, read private messages, or track stealth GPS. AlongSide acts as a **neutral hardware referee** (8:30 PM bedtime curfew and category app gating).
  - **Zero App Store Rejection Risk:** Standard iOS `.mobileconfig` profiles are installed natively through Apple Settings via Safari, bypassing invasive VPN/MDM app store bans.
  - **Cryptographic Trust:** Profiles are signed using Apple-recognized digital certificates (`node-forge` PKCS#7), ensuring tamper resistance and instant verification on the child's device.

### 3.3 Contextual Road Fork Architecture (Road 1 vs. Road 2)
- **Decision:** The child entity explicitly models `roadType`:
  - `PRE_DEVICE`: Child does not yet own a personal smartphone (Ages 8–11+). Focuses on Readiness Assessments (0–100), bridge devices, and pre-unboxing "Day 1 Charters".
  - `ACTIVE_DEVICE`: Child already possesses a smartphone (Ages 9–14+). Focuses on Restorative Digital Reset treaties, signed profile bedtime lockouts (8:30 PM), and exploit early warnings.
- **Rationale:** Prevents product fragmentation. Road selection acts as a dynamic personalization lens across Academy modules, quizzes, and AI Advisor context.

### 3.4 4-Tier Developmental Neurobiology Taxonomy
- **Decision:** Migrate from 3 crude tiers to 4 precise neurodevelopmental tiers:
  1. `TIER_1_AGES_8_9`: Early Curiosity & Impulse Centers (Prefrontal cortex formation, shared screens).
  2. `TIER_2_AGES_10_11`: Tween Awakening & Peer Shift (Adrenarche, social validation, FOMO).
  3. `TIER_3_AGES_12_13`: Pubertal Shift & Circadian Sleep Delay (Melatonin delay, emotional amygdala reactivity).
  4. `TIER_4_AGES_14_PLUS`: Teens, Autonomy & Transition to Self-Regulation (Graduated privileges, trust).

---

## 4. Consequences & Operational Trade-offs

### Advantages:
1. **Unmatched Value Proposition:** Solves both parental anxiety (Academy, Quizzes, 24/7 AI) and parental exhaustion (automated 8:30 PM hardware lockdown).
2. **Defensible Moat:** The combination of clinical child psychology content and cryptographically signed device profiles prevents commoditization.
3. **High Developer Velocity:** Clear agent boundaries allow Frontend and Backend engineers to build in parallel using strict Zod schema contracts and Fastify inject tests.

### Mitigations:
- **Device Profile Installation Friction:** Apple requires users to approve downloaded profiles in iOS Settings.  
  *Mitigation:* Provide an interactive, 3-step visual walkthrough and 60-second video animation guiding parents through the Settings approval screen.
- **AI Hallucination Risk:** Parents need medically sound, pediatric-backed guidance.  
  *Mitigation:* Strict RAG grounding on curated FAQ records, system prompt guardrails, and explicit disclaimers for acute crisis scenarios.
