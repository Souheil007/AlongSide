/**
 * @deprecated RETIRED IN SOU-86: AlongSide has permanently transitioned away from being a clinical symptom triage platform.
 * Retained solely for backward compatibility with legacy test suites.
 */
import {
  evaluatePediatricTriage,
  calculateAntipyreticDosing,
  type SymptomTriageEvaluationInput,
  type PediatricTriageDecision,
  type AntipyreticDosingRecommendation,
  TriageZone,
} from '@alongside/shared';

export interface PediatricTriageEngine {
  triageSymptom(input: SymptomTriageEvaluationInput): PediatricTriageDecision;
  calculateAntipyreticDosage(
    childWeightLbs: number,
    medication: 'ACETAMINOPHEN' | 'IBUPROFEN',
    ageMonths: number
  ): AntipyreticDosingRecommendation;
}

/**
 * Production Adapter at Seam 6: Barton Schmitt Pediatric Telephone Protocols & AAP triage rules.
 */
export class BartonSchmittTriageAdapter implements PediatricTriageEngine {
  triageSymptom(input: SymptomTriageEvaluationInput): PediatricTriageDecision {
    return evaluatePediatricTriage(input);
  }

  calculateAntipyreticDosage(
    childWeightLbs: number,
    medication: 'ACETAMINOPHEN' | 'IBUPROFEN',
    ageMonths: number
  ): AntipyreticDosingRecommendation {
    return calculateAntipyreticDosing(childWeightLbs, medication, ageMonths);
  }
}

/**
 * In-Memory Test Fake Adapter at Seam 6 for Fastify integration and unit tests.
 */
export class FakePediatricTriageAdapter implements PediatricTriageEngine {
  private customDecision: PediatricTriageDecision | null = null;
  private customDosing: AntipyreticDosingRecommendation | null = null;

  setTriageDecision(decision: PediatricTriageDecision): void {
    this.customDecision = decision;
  }

  setAntipyreticDosing(dosing: AntipyreticDosingRecommendation): void {
    this.customDosing = dosing;
  }

  triageSymptom(input: SymptomTriageEvaluationInput): PediatricTriageDecision {
    if (this.customDecision) {
      return this.customDecision;
    }
    // Default to the pure deterministic Barton Schmitt logic
    return evaluatePediatricTriage(input);
  }

  calculateAntipyreticDosage(
    childWeightLbs: number,
    medication: 'ACETAMINOPHEN' | 'IBUPROFEN',
    ageMonths: number
  ): AntipyreticDosingRecommendation {
    if (this.customDosing) {
      return this.customDosing;
    }
    return calculateAntipyreticDosing(childWeightLbs, medication, ageMonths);
  }
}
