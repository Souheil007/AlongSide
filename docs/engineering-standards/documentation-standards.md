# Alongside — Documentation & Docstring Standards
**Author:** Chief Technology Officer (CTO)  
**Status:** Approved Engineering Standards  
**Version:** 1.0.0  
**Target Audience:** Frontend Engineer, Backend Engineer, Technical Writers  

---

## 1. Documentation Philosophy

1. **Self-Documenting Code First:** Write clean, expressive variable and function names so code explains *what* it does.
2. **Document the "Why" and the Constraints:** Docstrings and comments must focus on *why* a particular architectural decision, business rule, or algorithmic threshold was chosen.
3. **Keep Comments Synchronized:** Out-of-date documentation is a bug. Whenever refactoring or updating logic, update the corresponding docstrings in the same commit.

---

## 2. Google-Style TSDoc Standards for TypeScript

Every exported function, service method, domain hook, and complex utility must have a concise Google-style TSDoc block.

### 2.1 Function & Method Docstrings

```typescript
/**
 * Calculates a composite digital readiness score based on diagnostic answers.
 *
 * Evaluates 10 core developmental dimensions (impulse control, peer pressure,
 * emotional regulation, household boundary adherence, online safety judgment, etc.)
 * and produces a weighted readiness index (0–100) used to recommend initial
 * Family Media Agreement terms and bridge device milestones.
 *
 * @param childAge - The chronological age of the child in whole years.
 * @param answers - Array of 10 scored diagnostic responses (1 to 5 scale).
 * @returns The calculated composite score (0-100) and recommended focus clauses.
 * @throws {ValidationError} If answers array does not contain exactly 10 valid items.
 *
 * @example
 * ```typescript
 * const result = calculateReadinessScore(10, diagnosticAnswers);
 * console.log(result.score); // 74
 * console.log(result.recommendedTier); // DevelopmentalTier.TIER_2_AGES_10_11
 * ```
 */
export function calculateReadinessScore(
  childAge: number,
  answers: DiagnosticAnswer[]
): ReadinessCalculationResult {
  // ...
}
```

### 2.2 React Custom Hook Docstrings

```typescript
/**
 * Hook for managing the multi-step Family Media Agreement creation workflow.
 *
 * Synchronizes in-flight clause selections and custom text with local draft
 * storage and validates step completeness before advancing the wizard.
 *
 * @param childId - UUID of the child profile for whom the agreement is being built.
 * @returns State and action handlers for the agreement wizard steps.
 */
export function useAgreementWizard(childId: string): AgreementWizardState {
  // ...
}
```

### 2.3 Interface & Type Docstrings

```typescript
/**
 * Represents a discrete, agreed-upon rule or parent commitment within a Family Agreement.
 */
export interface AgreementClauseDTO {
  /** Unique UUID identifier of the clause. */
  readonly id: string;
  /** Categorical grouping (e.g. SCREEN_TIME, PRIVACY_SAFETY, PARENT_COMMITMENT). */
  readonly category: ClauseCategory;
  /** The obligated party responsible for upholding this clause. */
  readonly party: CommitmentParty;
  /** The verbatim text of the agreed rule. */
  readonly ruleText: string;
  /** Indicates whether this rule was authored custom by the family or seeded from presets. */
  readonly isCustom: boolean;
  /** Display ordering sequence within the agreement view. */
  readonly orderIndex: number;
}
```

---

## 3. Fastify Route & OpenAPI Documentation

Every backend endpoint must register OpenAPI metadata in its Fastify schema definition. This ensures that the generated Swagger documentation (`/docs`) remains an accurate, interactive contract for the Frontend Engineer:

```typescript
fastify.post('/api/v1/quizzes/first-phone-readiness/attempts', {
  schema: {
    summary: 'Submit First-Phone Readiness Assessment',
    description: 'Processes 10-dimension maturity assessment and returns readiness score (0-100) with radar-chart breakdown and recommended agreement presets.',
    tags: ['Quizzes', 'Assessment'],
    body: SubmitQuizAttemptSchema,
    response: {
      200: QuizAttemptResponseEnvelopeSchema,
      400: ErrorEnvelopeSchema,
      401: ErrorEnvelopeSchema,
      404: ErrorEnvelopeSchema,
    },
  },
  handler: quizController.submitAttempt,
});
```

---

## 4. Module & File Headers

Every significant source file (domain services, entry points, stores, and controllers) should begin with a brief module header:

```typescript
/**
 * @fileoverview Agreement Domain Service.
 * Orchestrates template selection, clause customization, version increments,
 * and high-resolution PDF rendering for Family Media Agreements.
 *
 * @module modules/agreements/agreement-service
 */
```
