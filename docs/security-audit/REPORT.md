# Cloudflare Security Audit Report: Alongside Platform

**Target Repository:** Alongside (`apps/api`, `apps/web`, `packages/database`, `packages/shared`)  
**Audit Framework:** [Cloudflare Security Audit Skill](https://github.com/cloudflare/security-audit-skill)  
**Run ID:** `alongside-sec-audit-2026-11-23`  
**Profile:** Standard  
**Date:** November 23, 2026  
**Auditor:** Chief Technology Officer (CTO) / Security Architecture Agent  

---

## 1. Executive Summary

A comprehensive, defense-in-depth source code security audit was conducted across the **Alongside** digital-parenting platform using Cloudflare's 6-phase vulnerability discovery and validation framework.

The audit covered:
- **Web Protocol & Authentication** (`WEB-PROTOCOL-AND-AUTH.md`): JWT session lifecycle, SameSite cookie transport, CORS origin reflection, and CSRF attack surfaces.
- **Client-Side Security** (`CLIENT-SIDE.md`): DOM XSS in React/Next.js components, markdown rendering pipelines, and PWA Service Worker caching policies.
- **AI & LLM Integration** (`AI-AND-LLM.md`): Prompt injection vectors, child PII context leakage, RAG vector retrieval, and pediatric emergency safe harbor filters.
- **Data Isolation & Multi-Tenancy** (`DATA-ISOLATION-AND-LIFECYCLE.md`): Insecure Direct Object References (IDOR), child profile tenancy scoping, and developmental milestone storage.
- **Resource Exhaustion & Availability** (`RESOURCE-EXHAUSTION-AND-AVAILABILITY.md`): Argon2id password hashing CPU consumption, unbounded SSE connections, and payload bounds.

### Findings Breakdown
- **Critical Severity:** 0
- **High Severity:** 0 (Prior CORS Origin Reflection & Markdown Link XSS remediated in commit `9a2ead1`)
- **Medium Severity:** 2
- **Low Severity:** 2
- **Coverage Ledger Units:** 6 evaluated and verified against `validate-coverage-ledger.cjs`

---

## 2. Findings Matrix

| Finding ID | Title | Subsystem | Severity | Confidence | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `alongside:sec:auth-unthrottled-rate-limit:001` | Unthrottled Password Verification on `/login` and `/register` | `apps/api/src/modules/auth` | **Medium** | High | Confirmed |
| `alongside:sec:device-profile-silent-unsigned-fallback:001` | Silent Fail-Open to Unsigned Apple Device Management Profiles | `apps/api/src/modules/device-profiles` | **Medium** | High | Confirmed |
| `alongside:sec:ai-advisor-indirect-prompt-injection:001` | Indirect Prompt Injection via Unsanitized Child Name in AI Context | `apps/api/src/modules/ai-advisor` | **Low** | High | Confirmed |
| `alongside:sec:missing-security-headers:001` | Absence of Defensive HTTP Security Headers (`@fastify/helmet`) | `apps/api/src` | **Low** | High | Confirmed |

*(Note: The previously identified High-severity vulnerabilities — CORS wildcard reflection with credentials in `apps/api/src/app.ts` and `javascript:` URI execution in markdown links — were resolved and regression-tested prior to this report).*

---

## 3. Architecture & Attack Surface Analysis

### 3.1 Network & Web Protocol Surface
The Fastify v5 server runs on Node.js LTS v22. In the preceding sprint, the CORS origin evaluator was hardened with strict regex boundaries (`LOCALHOST_ORIGIN_REGEX` and `ALONGSIDE_VERCEL_REGEX`), preventing arbitrary third-party origins from receiving reflected origins with `credentials: true`. 
- **CSRF Analysis:** The session cookie (`alongside_session`) is transmitted with `SameSite: 'none'` in production to support decoupled frontend/backend domains. Because all mutation routes require `Content-Type: application/json` and CORS strictly validates preflight `Origin` headers, cross-site HTML form submissions (`multipart/form-data` or `application/x-www-form-urlencoded`) are rejected by Fastify's content-type parser before reaching route handlers.
- **Rate Limiting Deficit:** While functional security is sound, authentication routes lack brute-force request quotas, creating an availability risk given Argon2id's intentional computational intensity.

### 3.2 Mobile MDM & Cryptographic Boundary
Apple configuration profiles (`.mobileconfig`) enforce bedtime screen curfews and age-rating limits. Profiles are compiled to XML and wrapped in a PKCS#7 CMS signed envelope with SHA-256. 
- **Fail-Open Risk:** The signer catches cryptographic exceptions and emits an unsigned profile with `isSigned: false`. In production, this degrades trust, prompting iOS to display an untrusted red badge.

### 3.3 AI Pediatric Advisor & LLM Safety Boundary
The 24/7 AI Advisor Sparring engine incorporates a deterministic pre-LLM regex filter (`ClinicalSafeHarborFilter`) that intercepts acute life-threat red flags (infant fever under 90 days, cyanosis, magnet/battery ingestion, anaphylaxis) before calling external models.
- **Context Injection Risk:** Child attributes are interpolated into the system prompt template using string literals (`${child.name}`). Crafting a child name with markdown section breaks allows a user to break out of the profile bullet list and inject custom system directives.

---

## 4. Remediation Action Plan

1. **Immediate (Sprint Priority):**
   - Install `@fastify/rate-limit` in `apps/api` and assign `config: { rateLimit: { max: 10, timeWindow: '1 minute' } }` to `/api/v1/auth/login` and `/api/v1/auth/register`.
   - Install `@fastify/helmet` with API-tailored headers (`contentSecurityPolicy: false`) on the root Fastify instance.
2. **Short-Term:**
   - Enforce fail-closed verification in `AppleMobileConfigSigner`: if `process.env.NODE_ENV === 'production'` and certificates are missing, throw an explicit `ConfigurationError`.
   - Wrap child context attributes in `prompt.builder.ts` inside `<child_profile>` XML delimiters and strip control tokens (`\n`, `###`).
3. **Environment Hardening:**
   - Verify that production deployment environments (Render, Cloud Run, Vercel) populate `APPLE_MDM_CERT`, `APPLE_MDM_KEY`, and `STRIPE_WEBHOOK_SECRET`.

---

## 5. Artifact Reference
- [architecture.md](file:///C:/GithubProjects/AlongSide/docs/security-audit/architecture.md) — Architectural reconnaissance and trust boundaries
- [coverage-ledger.json](file:///C:/GithubProjects/AlongSide/docs/security-audit/coverage-ledger.json) — Formally validated coverage ledger (6 units)
- [findings.json](file:///C:/GithubProjects/AlongSide/docs/security-audit/findings.json) — Schema-validated JSON findings record
- [FINDINGS-DETAIL.md](file:///C:/GithubProjects/AlongSide/docs/security-audit/FINDINGS-DETAIL.md) — Comprehensive technical traces and reproduction steps
- [NEEDS-VALIDATION.md](file:///C:/GithubProjects/AlongSide/docs/security-audit/NEEDS-VALIDATION.md) — Unobserved external dependencies and deployment controls
