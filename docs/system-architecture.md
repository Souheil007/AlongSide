# Alongside — System Architecture Specification
**Author:** Chief Technology Officer (CTO)  
**Status:** Approved for Engineering Implementation  
**Version:** 2.2.0 (The Comprehensive Parent Intelligence & Family Operating System)  
**Target Audience:** Frontend Engineer, Backend Engineer, DevOps, Stakeholders  
**Companion Deep-Dive:** [**Expert System Design Specification**](system-design-specification.md) (Capacity estimations, trade-off matrices, resilience protocols)  
**Deep Module & Seam Architecture:** [**Codebase Design Specification**](codebase-design.md) (Module depth, 7 canonical seams, test fake adapters, and Deletion Test)

---

## 1. High-Level Architecture Overview

AlongSide is engineered as a type-safe, decoupled monorepo separating the user-facing web/PWA presentation layer from the core domain API service. It unites **Parent Education & Awareness (The Mind)** with **Signed Device Governance (The Hand)**. For full quantitative capacity sizing (QPS, storage, bandwidth), trade-off analyses, and failure mitigation strategies, see the companion [**System Design Specification**](system-design-specification.md).

```mermaid
graph TD
    subgraph ClientLayer ["Client Layer (apps/web - Next.js 15 PWA)"]
        Browser["Parent Mobile Browser / Mobile PWA"]
        ServiceWorker["Service Worker (Serwist Offline Cache)"]
        AcademyPlayer["Academy Course & Lesson Player"]
        QuizRunner["Interactive Quiz & Assessment Runner"]
        AdvisorChat["24/7 AI Child Advisor & Sparring UI"]
        PactWizard["Bilateral Family Pact Wizard (Zustand)"]
        DeviceEnrollmentUI["One-Tap QR Code Enrollment Screen"]
        TanStackCache["TanStack Query Cache (v5)"]
    end

    subgraph SharedLayer ["Shared Contract Layer (packages/shared)"]
        ZodSchemas["Zod Request / Response Schemas"]
        DomainEnums["Domain Enums (RoadType, 4 Tiers, QuizTypes)"]
        ScoringEngines["Shared Assessment Scoring Algorithms"]
        DTOs["TypeScript DTO Interfaces & Contracts"]
    end

    subgraph ServiceLayer ["API Service Layer (apps/api - Fastify LTS 22)"]
        FastifyServer["Fastify HTTP Server (TypeScript)"]
        AuthModule["Auth & Session Guard (Argon2id + JWT Cookie)"]
        ChildrenModule["Child Profiles & Road Fork Controller"]
        AcademyModule["Parent Intelligence Academy Controller"]
        QuizModule["Interactive Quiz & Scoring Controller"]
        AiAdvisorModule["24/7 AI Advisor & Streaming RAG Engine"]
        AgreementModule["Bilateral Family Pact Controller"]
        DeviceProfileModule["Pact-as-Code Compiler & Cryptographic Signer"]
        DigestModule["Weekly Slang & Exploit Alert Controller"]
        BillingModule["Stripe Billing & 7-Day Trial Controller"]
    end

    subgraph DataLayer ["Data & Persistence Layer"]
        PostgresDB[("PostgreSQL 16 + pgvector (Relational & Embeddings)")]
        RedisCache[("Redis (Session Revocation & BullMQ Queue)")]
        AppleSigningCert[("Apple WWDR & Dev Signing Certificates")]
        ObjectStorage[("Encrypted Storage (PDF Agreements & Profiles)")]
    end

    Browser --> ServiceWorker
    Browser --> AcademyPlayer
    Browser --> QuizRunner
    Browser --> AdvisorChat
    Browser --> PactWizard
    Browser --> DeviceEnrollmentUI
    
    AcademyPlayer --> TanStackCache
    QuizRunner --> TanStackCache
    AdvisorChat -- "Server-Sent Events (SSE)" --> AiAdvisorModule
    PactWizard --> TanStackCache
    DeviceEnrollmentUI --> TanStackCache

    TanStackCache -- "HTTPS / JSON API" --> FastifyServer

    TanStackCache -. "Type Safety" .-> ZodSchemas
    FastifyServer -. "Schema Validation" .-> ZodSchemas

    FastifyServer --> AuthModule
    AuthModule --> ChildrenModule
    AuthModule --> AcademyModule
    AuthModule --> QuizModule
    AuthModule --> AiAdvisorModule
    AuthModule --> AgreementModule
    AuthModule --> DeviceProfileModule
    AuthModule --> DigestModule
    AuthModule --> BillingModule

    ChildrenModule --> PostgresDB
    AcademyModule --> PostgresDB
    QuizModule --> PostgresDB
    AiAdvisorModule -- "Vector Similarity (Cosine)" --> PostgresDB
    AgreementModule --> PostgresDB
    DeviceProfileModule --> AppleSigningCert
    DeviceProfileModule --> PostgresDB
    DigestModule --> PostgresDB
    BillingModule --> PostgresDB

    FastifyServer --> RedisCache
    DeviceProfileModule --> ObjectStorage
```

---

## 2. Monorepo Directory Structure

The repository is structured as standard npm workspaces. Each package maintains clear ownership boundaries.

```
AlongSide/
├── .github/                      # CI/CD Workflows (Lint, Typecheck, Test, Build)
├── .agents/                      # AI Agent Governance & Machine-Enforceable Rules
│   └── rules/                    # High-priority rules for autonomous agents
├── apps/
│   ├── web/                      # Frontend Application (Next.js 15, Tailwind, shadcn/ui)
│   │   ├── public/               # Static assets, PWA icons, manifest.json
│   │   ├── src/
│   │   │   ├── app/              # Next.js App Router (pages and layouts)
│   │   │   │   ├── (auth)/       # Authentication (login, register, forgot-password)
│   │   │   │   ├── (dashboard)/  # Authenticated parent application routes
│   │   │   │   │   ├── dashboard/    # Primary parent hub & contextual road view
│   │   │   │   │   ├── children/     # Child onboarding, road selection & profiles
│   │   │   │   │   ├── academy/      # Parent Intelligence Academy (lessons by tier)
│   │   │   │   │   ├── quizzes/      # Interactive assessment suite (Tween slang, style)
│   │   │   │   │   ├── advisor/      # 24/7 AI Child Advisor chat & voice sparring
│   │   │   │   │   ├── pacts/        # Bilateral Family Pact builder & signatures
│   │   │   │   │   ├── devices/      # Signed profile enrollment, QR code & 8:30 PM lock
│   │   │   │   │   ├── digest/       # Sunday youth culture & exploit early warnings
│   │   │   │   │   ├── library/      # Scripts, platform decoders & offline reference
│   │   │   │   │   └── settings/     # Account, billing, trial status & co-parents
│   │   │   │   ├── api/          # Minimal frontend route proxies (if needed)
│   │   │   │   ├── layout.tsx    # Root layout with providers & fonts
│   │   │   │   └── page.tsx      # Landing page / marketing hero & road overview
│   │   │   ├── components/       # Reusable UI components
│   │   │   │   ├── ui/           # Radix / shadcn/ui primitives (button, dialog, tabs)
│   │   │   │   ├── academy/      # Course cards, lesson reader, progress tracker
│   │   │   │   ├── quizzes/      # Quiz card, multi-choice question, score summary
│   │   │   │   ├── advisor/      # Chat feed, streaming bubble, quick-prompts, sparring
│   │   │   │   ├── pacts/        # Clause checklist, trade-off sliders, co-signature pad
│   │   │   │   ├── devices/      # QR enrollment card, curfew countdown, lock status
│   │   │   │   ├── digest/       # Weekly briefing card, slang tags, exploit alert badges
│   │   │   │   └── shared/       # ParentCalm header, navigation, modals, error boundaries
│   │   │   ├── hooks/            # Custom hooks (useAuth, useQuizRunner, useAiChat)
│   │   │   ├── lib/              # API client (Ky/fetch), PDF export, local storage
│   │   │   ├── stores/           # Zustand stores (pact builder draft, quiz runner state)
│   │   │   └── styles/           # Tailwind config & ParentCalm design tokens
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/                      # Backend API Server (Node.js LTS 22, Fastify, TypeScript)
│       ├── src/
│       │   ├── config/           # Environment variables, logger, cert paths
│       │   ├── plugins/          # Fastify plugins (JWT, CORS, SSE, Database, Swagger)
│       │   ├── modules/          # Domain feature modules
│       │   │   ├── auth/         # Register, login, refresh, password reset
│       │   │   ├── users/        # Parent profile, subscription state
│       │   │   ├── children/     # Child CRUD, Road 1 vs Road 2 bifurcation
│       │   │   ├── academy/      # Age-by-age developmental modules & lessons
│       │   │   ├── quizzes/      # Assessment runner, multi-dimensional scoring
│       │   │   ├── ai-advisor/   # 24/7 AI chat, streaming SSE, vector similarity RAG
│       │   │   ├── faqs/         # 100+ Modern Parenting FAQ repository & search
│       │   │   ├── agreements/   # Bilateral Family Pact generator & PDF export
│       │   │   ├── device-profiles/# Apple .mobileconfig & Android Enterprise compiler & PKCS#7 signer
│       │   │   ├── digest/       # Sunday culture briefing, slang decoders, exploit alerts
│       │   │   ├── scripts/      # Situation-specific de-escalation conversation scripts
│       │   │   └── billing/      # Stripe Checkout, 7-day trials, webhooks
│       │   ├── common/           # HTTP responses, domain errors, pagination
│       │   ├── index.ts          # Server entry point
│       │   └── app.ts            # Fastify application factory
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── shared/                   # Shared TypeScript contracts and validation
│   │   ├── src/
│   │   │   ├── schemas/          # Zod validation schemas (auth, child, pact, quiz, ai)
│   │   │   ├── types/            # Domain interfaces and DTOs
│   │   │   ├── constants/        # Enums (RoadType, DevelopmentalTier, QuizType, Curfew)
│   │   │   ├── algorithms/       # Quiz scoring math & readiness index calculator
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── database/                 # Prisma ORM & PostgreSQL Database Layer
│       ├── prisma/
│       │   ├── schema.prisma     # Canonical database schema (with pgvector)
│       │   ├── migrations/       # SQL migration history
│       │   └── seed/             # Seed scripts (Academy modules, 100+ FAQs, slang catalog)
│       ├── src/
│       │   ├── client.ts         # Singleton Prisma client export
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── docs/                         # Canonical Architecture, Standards & Specifications (CTO)
├── plans/                        # Discrete Agent Execution Plans (CTO)
├── AGENTS.md                     # Engineering team responsibilities and boundaries
├── PROJECT_SCOPE.md              # Canonical Product Scope v2.2.0 (CEO)
├── README.md                     # Monorepo Executive Overview & Architecture
├── package.json                  # Root npm workspace definition
└── tsconfig.base.json            # Base TypeScript configuration
```

---

## 3. Core System Data Flows

### 3.1 Contextual Road Fork & Child Onboarding Flow
```mermaid
sequenceDiagram
    autonumber
    actor Parent as Parent User
    participant Web as Next.js Web/PWA
    participant API as Fastify API
    participant DB as PostgreSQL

    Parent->>Web: Input Child Name, Birthdate & Device Status
    alt No Personal Smartphone Yet
        Web->>Web: Set roadType = PRE_DEVICE
    else Already Has Smartphone
        Web->>Web: Set roadType = ACTIVE_DEVICE
    end

    Web->>API: POST /api/v1/children
    API->>DB: Create Child record with assigned DevelopmentalTier & RoadType
    API-->>Web: Return ChildDTO

    alt PRE_DEVICE (Road 1)
        Web->>API: GET /api/v1/quizzes/first-phone-readiness
        API-->>Web: Return 10-dimension assessment questions
        Parent->>Web: Completes readiness assessment
        Web->>API: POST /api/v1/quizzes/attempts
        API-->>Web: Return Readiness Score (0-100) & Pre-Unboxing Day 1 Charter preset
    else ACTIVE_DEVICE (Road 2)
        Web->>API: GET /api/v1/agreements/presets?roadType=ACTIVE_DEVICE
        API-->>Web: Return Restorative Digital Reset template (curfew: 8:30 PM)
    end
```

### 3.2 Pact-to-Profile Compilation & QR Device Enrollment Flow
```mermaid
sequenceDiagram
    autonumber
    actor Parent as Parent User
    actor Child as Child User
    participant Web as Next.js Web/PWA
    participant API as Fastify API
    participant Signer as PKCS#7 Signing Service
    participant ChildDevice as Child's Smartphone (iOS / Android)

    Parent->>Web: Open Bilateral Family Pact Wizard
    Parent->>Child: Co-negotiate bedtime curfew (8:30 PM), app categories & study hours
    Parent->>Web: Both parties sign digitally on canvas
    Web->>API: POST /api/v1/agreements
    API-->>Web: Return AgreementDetailDTO (status: SIGNED)

    Parent->>Web: Click "Deploy to Device"
    Web->>API: POST /api/v1/agreements/{id}/compile-profile
    API->>API: Generate XML .mobileconfig / Android Enterprise Policy payload
    API->>Signer: Sign payload with Apple Developer / WWDR Certificate
    Signer-->>API: Cryptographically signed .mobileconfig payload
    API-->>Web: Return EnrollmentToken & QR Code URL

    Web->>Web: Display Single-Scan Enrollment QR Code
    Child->>ChildDevice: Scan QR Code with Camera
    ChildDevice->>API: GET /api/v1/devices/enroll/{token}
    API-->>ChildDevice: Deliver signed .mobileconfig profile (Content-Type: application/x-apple-aspen-config)
    ChildDevice->>ChildDevice: System Settings prompts "Profile Downloaded" -> One-tap install
    ChildDevice-->>API: Webhook confirmation (Status: ACTIVE)
    Note over ChildDevice: At 8:30 PM, the OS automatically locks non-exempt apps.
```

### 3.3 24/7 AI Child Advisor Streaming RAG Flow
```mermaid
sequenceDiagram
    autonumber
    actor Parent as Parent User
    participant Web as Next.js Web/PWA
    participant API as Fastify API (AiAdvisorModule)
    participant VectorDB as PostgreSQL (pgvector)
    participant LLM as OpenAI (GPT-4o)

    Parent->>Web: Ask acute question ("Why is my 11yo secretive with phone?")
    Web->>API: POST /api/v1/ai-advisor/chat (SSE Stream)
    API->>API: Compute query vector embedding (text-embedding-3-small)
    API->>VectorDB: Cosine similarity search on FaqItems & Clinical Guidance (Child Tier: TIER_2_AGES_10_11)
    VectorDB-->>API: Top 3 matched clinical guidance documents & de-escalation scripts
    
    API->>LLM: Stream prompt with Child Context + Pediatric Guidelines + User Question
    LLM-->>API: Stream tokens chunk-by-chunk
    API-->>Web: Server-Sent Events (SSE) data stream
    Web->>Parent: Real-time rendered empathetic coaching & word-for-word scripts
```

---

## 4. Privacy, Security & Zero-Spyware Safe Harbor Architecture

Minor privacy and family safety are core architectural invariants:

1. **The Zero-Spyware Safe Harbor Guarantee:**
   - AlongSide **never** collects, logs, or transmits keystrokes, personal messages, browsing histories, camera feeds, or stealth GPS locations.
   - Enforced policies operate exclusively at the **operating system perimeter**: scheduled curfews (8:30 PM bedtime app lock), App Store category age gating, and family dinner pauses.
   - **Emergency Exemption:** Emergency phone calls (911/112), incoming/outgoing parent phone calls, and trusted medical/help hotlines are strictly whitelisted and never locked out.
2. **Child Data Minimization:**
   - Only child first name (or nickname), birth month/year, and device platform are persisted.
   - No phone numbers, serial numbers, or IMEIs are required for enrollment.
3. **Cryptographic Integrity:**
   - Passwords hashed using `argon2id`.
   - Apple `.mobileconfig` profiles signed via PKCS#7 using strict SHA-256 certificate chains.
   - Session tokens delivered exclusively in `HttpOnly`, `Secure`, `SameSite=Strict` cookies.
4. **Tenant Isolation:**
   - Multi-tenant data segregation enforced at the ORM layer: all queries for children, agreements, and quiz attempts require `where: { userId: currentParentId }`.

---

## 5. Deployment & Runtime Infrastructure

```mermaid
graph LR
    subgraph CDN ["Edge & CDN"]
        Cloudflare["Cloudflare CDN (WAF, SSL, DDoS Mitigation)"]
    end

    subgraph Compute ["Compute Services"]
        WebPWA["Next.js 15 PWA (Vercel / Cloud Run Container)"]
        ApiServer["Fastify Node.js 22 LTS (Railway / ECS Container)"]
    end

    subgraph ManagedData ["Managed Cloud Data"]
        Postgres["Neon / Supabase PostgreSQL 16 (pgvector enabled)"]
        RedisQueue["Upstash Redis (BullMQ queue & sessions)"]
        S3Bucket["Cloudflare R2 / AWS S3 (PDF Agreements & Profiles)"]
    end

    Cloudflare --> WebPWA
    Cloudflare --> ApiServer
    ApiServer --> Postgres
    ApiServer --> RedisQueue
    ApiServer --> S3Bucket
```
