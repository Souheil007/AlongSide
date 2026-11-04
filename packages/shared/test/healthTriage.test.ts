import { describe, it, expect } from 'vitest';
import {
  evaluatePediatricTriage,
  calculateAntipyreticDosing,
} from '../src/algorithms/healthTriage.js';
import { TriageZone } from '../src/constants/index.js';

describe('healthTriage algorithm', () => {
  describe('evaluatePediatricTriage', () => {
    it('triggers RED zone emergency for neonate/infant < 90 days with fever >= 100.4 F', () => {
      const decision = evaluatePediatricTriage({
        childAgeMonths: 2,
        temperatureF: 100.6,
        symptoms: ['fever', 'fussiness'],
      });

      expect(decision.zone).toBe(TriageZone.RED);
      expect(decision.requiresEmergency911).toBe(true);
      expect(decision.conditionSuspected).toContain('Neonatal');
      expect(decision.recommendedDosing).toBeNull();
    });

    it('triggers RED zone emergency for respiratory retractions or stridor', () => {
      const decision = evaluatePediatricTriage({
        childAgeMonths: 18,
        temperatureF: 101.5,
        symptoms: ['cough', 'chest_retractions', 'stridor'],
      });

      expect(decision.zone).toBe(TriageZone.RED);
      expect(decision.requiresEmergency911).toBe(true);
      expect(decision.conditionSuspected).toContain('Respiratory Distress');
    });

    it('triggers RED zone emergency for hyperpyrexia >= 105.0 F or seizure', () => {
      const decision = evaluatePediatricTriage({
        childAgeMonths: 36,
        temperatureF: 105.2,
        symptoms: ['lethargy'],
      });

      expect(decision.zone).toBe(TriageZone.RED);
      expect(decision.requiresEmergency911).toBe(true);
    });

    it('evaluates YELLOW zone for ear pulling (suspected otitis media)', () => {
      const decision = evaluatePediatricTriage({
        childAgeMonths: 14,
        weightLbs: 24,
        temperatureF: 101.8,
        symptoms: ['ear_pulling', 'fever', 'night_waking'],
      });

      expect(decision.zone).toBe(TriageZone.YELLOW);
      expect(decision.requiresEmergency911).toBe(false);
      expect(decision.conditionSuspected).toContain('Otitis Media');
      expect(decision.recommendedDosing).not.toBeNull();
      expect(decision.recommendedDosing?.medication).toBe('ACETAMINOPHEN');
    });

    it('evaluates YELLOW zone for prolonged fever (> 72 hours)', () => {
      const decision = evaluatePediatricTriage({
        childAgeMonths: 24,
        weightLbs: 28,
        temperatureF: 101.0,
        durationHours: 80,
        symptoms: ['fever'],
      });

      expect(decision.zone).toBe(TriageZone.YELLOW);
      expect(decision.requiresEmergency911).toBe(false);
      expect(decision.conditionSuspected).toContain('Prolonged Pediatric Fever');
    });

    it('evaluates GREEN zone for mild viral symptoms', () => {
      const decision = evaluatePediatricTriage({
        childAgeMonths: 20,
        weightLbs: 26,
        temperatureF: 99.8,
        symptoms: ['runny_nose', 'mild_cough'],
      });

      expect(decision.zone).toBe(TriageZone.GREEN);
      expect(decision.requiresEmergency911).toBe(false);
      expect(decision.conditionSuspected).toContain('Viral');
    });
  });

  describe('calculateAntipyreticDosing', () => {
    it('contraindicates ibuprofen for infants under 6 months', () => {
      const dosing = calculateAntipyreticDosing(14, 'IBUPROFEN', 4);
      expect(dosing.contraindicated).toBe(true);
      expect(dosing.dosageMg).toBe(0);
      expect(dosing.notes).toContain('contraindicated');
    });

    it('contraindicates self-dosing for infants under 3 months', () => {
      const dosing = calculateAntipyreticDosing(10, 'ACETAMINOPHEN', 2);
      expect(dosing.contraindicated).toBe(true);
      expect(dosing.dosageMg).toBe(0);
    });

    it('calculates correct acetaminophen dosage for child over 3 months', () => {
      // 22 lbs = ~9.98 kg * 12.5 mg/kg = ~125 mg
      const dosing = calculateAntipyreticDosing(22, 'ACETAMINOPHEN', 12);
      expect(dosing.contraindicated).toBe(false);
      expect(dosing.dosageMg).toBe(125);
      expect(dosing.frequency).toContain('4 to 6 hours');
    });

    it('calculates correct ibuprofen dosage for child over 6 months', () => {
      // 22 lbs = ~9.98 kg * 10 mg/kg = ~100 mg
      const dosing = calculateAntipyreticDosing(22, 'IBUPROFEN', 12);
      expect(dosing.contraindicated).toBe(false);
      expect(dosing.dosageMg).toBe(100);
      expect(dosing.frequency).toContain('6 to 8 hours');
    });
  });
});
