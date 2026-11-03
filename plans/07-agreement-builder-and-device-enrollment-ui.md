# Plan 07: Pact Wizard, Digital Co-Signing & QR Enrollment UI
**Plan ID:** `PLAN-07`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-05, PLAN-06  
**Estimated Scope:** Medium  

---

## 1. Objective & Business Value

Build the interactive Bilateral Family Pact wizard in `apps/web/`, featuring collaborative parent-child trade-off sliders (curfews, allowed apps), digital co-signing pads, refrigerator-ready print preview layouts, and the single-scan QR code enrollment modal for instant device profile deployment and automated 8:30 PM bedtime locking.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 3: Pillar 5)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Client Layer)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 7: Agreements, Section 8: Device Profiles)
- **Shared Schemas:** `packages/shared/src/schemas/pact.ts`
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-05` (Dashboard & child profiles) and `PLAN-06` (Agreement & profile compiler API) completed.
- **Verification:** Ensure `/api/v1/agreements/presets` and `/api/v1/agreements/:id/compile-profile` endpoints are accessible.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Zustand Pact Wizard State Store
1. Implement `apps/web/src/stores/usePactStore.ts`:
   - Draft clause selections, custom clauses, curfew slider time (default "20:30"), parent signature data URL, child signature data URL, and active step.

### Task 2: Interactive Pact Wizard Components
1. Implement `apps/web/src/components/pacts/ClauseSelector.tsx`:
   - Categorized clause accordions (`SCREEN_TIME`, `DEVICE_CURFEW`, `PRIVACY_SAFETY`, `PARENT_COMMITMENT`).
   - Visual toggle switches with empathetic explanations.
2. Implement `apps/web/src/components/pacts/CurfewSlider.tsx`:
   - Visual time dial / slider to set evening app curfew (e.g. 8:30 PM).
3. Implement `apps/web/src/components/pacts/SignaturePad.tsx`:
   - HTML5 Canvas signature pad for parent and child bilateral co-signing.

### Task 3: In-Browser Print CSS Layout
1. Implement `apps/web/src/app/(dashboard)/pacts/[id]/page.tsx`:
   - Detailed agreement review screen.
   - Clean `@media print` CSS stylesheet formatting a 1-page refrigerator-ready physical document with signatures and Alongside seal.

### Task 4: One-Tap QR Code Enrollment Screen
1. Install `qrcode.react` in `apps/web/package.json`.
2. Implement `apps/web/src/components/devices/EnrollmentModal.tsx`:
   - Displays dynamic QR code pointing to `/api/v1/devices/enroll/:token`.
   - 3-step visual instruction card for parents:
     1. Scan with child's iPhone/Android camera.
     2. Tap "Allow" on profile download prompt.
     3. Open Settings -> Tap "Profile Downloaded" -> Tap "Install".
3. Implement active curfew status widget on dashboard:
   - Displays "Curfew: 8:30 PM Lock | Operating System Status: Active".

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `apps/web/src/stores/usePactStore.ts`
- [ ] `apps/web/src/components/pacts/ClauseSelector.tsx`
- [ ] `apps/web/src/components/pacts/CurfewSlider.tsx`
- [ ] `apps/web/src/components/pacts/SignaturePad.tsx`
- [ ] `apps/web/src/components/devices/EnrollmentModal.tsx`
- [ ] `apps/web/src/components/devices/CurfewStatusBadge.tsx`
- [ ] `apps/web/src/app/(dashboard)/pacts/builder/page.tsx`
- [ ] `apps/web/src/app/(dashboard)/pacts/[id]/page.tsx`
- [ ] `apps/web/src/app/(dashboard)/devices/page.tsx`

---

## 6. Acceptance Criteria & Verification Plan

1. **Frontend Compilation:**
   ```bash
   npm run typecheck --workspace=@alongside/web
   ```
   *Pass criteria:* Zero compile errors.
2. **Signature Canvas Verification:**
   *Pass criteria:* Signing on canvas exports valid base64 PNG data string into Zustand store.
3. **Print Layout Verification:**
   *Pass criteria:* Triggering `window.print()` hides navigation elements and renders single-page summary.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Frontend Agent.
- ❌ **DO NOT** edit backend files in `apps/api/` or generate raw cryptographic signatures.
- ❌ **DO NOT** touch Prisma schemas.
- ✅ Work exclusively inside `apps/web/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] Pact wizard flows smoothly through clauses, signatures, and export.
- [ ] QR enrollment modal displays clear iOS/Android instructions.
- [ ] `npm run typecheck` exits with code 0.
- [ ] Commits adhere to Conventional Commits (`feat(web): ...`).
