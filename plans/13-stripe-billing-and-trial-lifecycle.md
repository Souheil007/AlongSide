# Plan 13: Stripe 7-Day Trial, $79/yr Hero Pass & Webhook Sync
**Plan ID:** `PLAN-13`  
**Assignee:** Backend Agent  
**Dependencies:** PLAN-02  
**Estimated Scope:** Medium  

---

## 1. Objective & Business Value

Implement Stripe subscription billing supporting the high-conviction monetization model defined in `PROJECT_SCOPE.md` v2.2.0: upfront 7-day risk-free trial, auto-converting to the **$79/year Annual Hero Pass** (~$6.58/mo) or **$9.99/month Flex Pass**, alongside Stripe Customer Portal management and reliable webhook synchronization.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 5: Business Model & Monetization)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (BillingModule)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 10: Billing & Subscriptions)
- **Database Schema:** [`docs/data-models.md`](../docs/data-models.md) (`Subscription`, `SubscriptionTier`)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-02` (Authentication & user profile) completed.
- **Dependencies:** Install `stripe` SDK in `apps/api/package.json` and configure `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Stripe Service & Checkout Session Creation
1. Implement `apps/api/src/modules/billing/stripe.service.ts`:
   - `createCheckoutSession(userId: string, email: string, tier: 'ANNUAL_HERO' | 'MONTHLY_FLEX', successUrl: string, cancelUrl: string)`:
     - Configures Stripe Checkout Session with `subscription_data: { trial_period_days: 7 }`.
     - Maps tier to Stripe Price ID ($79/year Hero Pass or $9.99/month Flex).
   - `createPortalSession(userId: string, returnUrl: string)`:
     - Generates Stripe Customer Portal session URL for subscription upgrades, cancellations, and billing history.

### Task 2: Fastify Webhook Handler
1. Implement Fastify raw body plugin in `apps/api/src/plugins/raw-body.plugin.ts` for Stripe signature verification.
2. Implement route `POST /api/v1/billing/webhook`:
   - Validates `stripe-signature` header using `stripe.webhooks.constructEvent`.
   - Handles `checkout.session.completed`: updates `Subscription` with `stripeCustomerId`, `stripeSubscriptionId`, and `tier`.
   - Handles `customer.subscription.updated`: synchronizes `trialEndsAt`, `currentPeriodEnd`, and active status.
   - Handles `customer.subscription.deleted`: sets `isActive: false` and revokes premium access.

### Task 3: Subscription Guard Middleware
1. Implement `requireActiveSubscription` preHandler hook in `apps/api/src/modules/billing/billing.guard.ts`:
   - Checks if user's subscription is in an active trial (`trialEndsAt > now()`) or active paid tier.
   - Restricts access to device profile compilation if trial has expired without payment.

### Task 4: Automated Testing
1. Author Vitest tests in `apps/api/tests/modules/billing/billing.test.ts`:
   - Checkout session generation -> asserts Stripe API called with trial parameters.
   - Webhook processing with mock Stripe events -> asserts database subscription record updated accurately.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `apps/api/src/plugins/raw-body.plugin.ts`
- [ ] `apps/api/src/modules/billing/stripe.service.ts`
- [ ] `apps/api/src/modules/billing/billing.guard.ts`
- [ ] `apps/api/src/modules/billing/billing.controller.ts`
- [ ] `apps/api/src/modules/billing/billing.routes.ts`
- [ ] `apps/api/tests/modules/billing/billing.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Type Checking:**
   ```bash
   npm run typecheck --workspace=@alongside/api
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors.
2. **Automated Test Suite:**
   ```bash
   npm test --workspace=@alongside/api
   ```
   *Pass criteria:* All billing tests pass (100% pass rate).
3. **Webhook Verification:**
   *Pass criteria:* Processing `customer.subscription.updated` event successfully updates database state.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Backend Agent.
- ❌ **DO NOT** edit files in `apps/web/`.
- ❌ **DO NOT** write React billing pages or pricing tables.
- ✅ Work exclusively inside `apps/api/` and `packages/database/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] Upfront 7-day trial parameter configured on Stripe checkout sessions.
- [ ] Stripe webhook signature verification strictly enforced.
- [ ] `npm run typecheck` exits with code 0.
- [ ] All automated tests pass.
- [ ] Commits adhere to Conventional Commits (`feat(billing): ...`).
