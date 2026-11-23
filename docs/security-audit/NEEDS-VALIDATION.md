# Cloudflare Security Audit: Environmental Dependencies & Needs-Validation Register

In accordance with Cloudflare's `security-audit-skill` methodology, when a security control or risk factor depends on unobserved infrastructure, secrets, or deployment topology outside the local git repository, it must be recorded in `NEEDS-VALIDATION.md` with explicit validation steps rather than assumed.

---

## 1. Production Secrets & Cryptographic Keys
- **Dependency:** `JWT_SECRET`, `COOKIE_SECRET`, `APPLE_MDM_CERT`, `APPLE_MDM_KEY`, `STRIPE_WEBHOOK_SECRET`
- **Location:** Deployment Platform Environment Variables (Render / Cloud Run / Vercel)
- **Source Observation:** [apps/api/src/app.ts](file:///C:/GithubProjects/AlongSide/apps/api/src/app.ts#L175-L186) enforces that `JWT_SECRET` and `COOKIE_SECRET` must be at least 32 characters long in production and rejects startup if default dev secrets are used.
- **Unobserved Invariant:** Whether the production secrets deployed in Render / Cloud Run were generated with a cryptographically secure pseudo-random number generator (CSPRNG, e.g. `openssl rand -base64 48`) and are distinct from staging.
- **Validation Step:**
  ```bash
  # Verify secret entropy in production management console
  # Ensure APPLE_MDM_CERT contains a valid Apple Push Notification Service (APNs) MDM certificate.
  ```

---

## 2. Ingress Reverse Proxy & TLS Termination
- **Dependency:** Host Header & TLS Certificate Termination
- **Location:** Cloudflare / Vercel Edge / Render Ingress Gateway
- **Source Observation:** The Fastify server listens on HTTP port 4000. It relies on the upstream reverse proxy to terminate TLS (HTTPS) and strip untrusted `X-Forwarded-*` headers.
- **Validation Step:**
  Confirm in the hosting provider's dashboard that:
  1. Plain HTTP traffic is automatically redirected to HTTPS (HSTS enabled at the edge).
  2. The proxy strips incoming client-supplied `X-Forwarded-For` and `X-Forwarded-Proto` before injecting verified gateway headers.

---

## 3. Stripe Webhook Signature Verification
- **Dependency:** Stripe Webhook Signature Key (`STRIPE_WEBHOOK_SECRET`)
- **Location:** [apps/api/src/modules/billing/](file:///C:/GithubProjects/AlongSide/apps/api/src/modules/)
- **Source Observation:** Subscription billing relies on incoming webhook events from Stripe to renew or cancel trial passes.
- **Validation Step:**
  Confirm that webhook event delivery checks `stripe.webhooks.constructEvent(payload, signature, secret)` with the live endpoint signing secret, rejecting unsigned or replayed payloads.

---

## 4. PostgreSQL Vector Index Scaling (`pgvector`)
- **Dependency:** PostgreSQL 16 + `pgvector` HNSW / IVFFlat Indexing
- **Location:** Managed Database (Supabase / Neon / AWS RDS)
- **Source Observation:** `apps/api/src/modules/ai-advisor/embedding.service.ts` queries cosine distance over modern parenting FAQs.
- **Validation Step:**
  Verify that an IVFFlat or HNSW index (`CREATE INDEX ON "Faq" USING hnsw (embedding vector_cosine_ops);`) is maintained on the production database to prevent full-table sequential scans as the FAQ corpus expands.
