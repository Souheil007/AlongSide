import { describe, expect, it } from 'vitest';
import {
  TriageZone,
  AntipyreticMedication,
  evaluateSymptomTriage,
  calculateAntipyreticDose,
} from '@alongside/shared';
import {
  CANONICAL_HEALTH_PROTOCOLS,
  runSymptomTriage,
  getHealthProtocols,
  calculateDosing,
} from '../src/lib/api/health';

describe('Pediatric Health Triage & Symptom Companion Specification (PLAN-18)', () => {
  describe('Barton Schmitt 3-Zone Clinical Triage Algorithm', () => {
    it('Rule 1A: Strictly triggers RED ZONE for neonatal fever (<90 days with temp >= 100.4°F)', () => {
      const result = evaluateSymptomTriage({
        childAgeMonths: 2, // 60 days
        temperatureF: 100.4,
        symptoms: ['fever'],
      });

      expect(result.zone).toBe(TriageZone.RED);
      expect(result.requiresEmergency911).toBe(true);
      expect(result.conditionSuspected).toContain('Neonatal Febrile Illness');
      expect(result.immediateActions.some((a) => a.includes('911') || a.includes('Emergency Department'))).toBe(true);
      expect(result.immediateActions.some((a) => a.includes('Do not give acetaminophen or ibuprofen'))).toBe(true);
      expect(result.recommendedDosing).toBeNull();
    });

    it('Rule 1B: Strictly triggers RED ZONE for respiratory distress (chest retractions, stridor, cyanosis)', () => {
      const resultRetractions = evaluateSymptomTriage({
        childAgeMonths: 14,
        symptoms: ['breathing_retractions', 'cough'],
      });
      expect(resultRetractions.zone).toBe(TriageZone.RED);
      expect(resultRetractions.requiresEmergency911).toBe(true);
      expect(resultRetractions.conditionSuspected).toContain('Respiratory Distress');

      const resultStridor = evaluateSymptomTriage({
        childAgeMonths: 24,
        symptoms: ['stridor', 'barking_cough'],
      });
      expect(resultStridor.zone).toBe(TriageZone.RED);
      expect(resultStridor.requiresEmergency911).toBe(true);
    });

    it('Rule 1C: Strictly triggers RED ZONE for acute life-threats (unresponsiveness, petechiae, facial swelling)', () => {
      const resultUnresponsive = evaluateSymptomTriage({
        childAgeMonths: 18,
        symptoms: ['unresponsive', 'fever'],
      });
      expect(resultUnresponsive.zone).toBe(TriageZone.RED);
      expect(resultUnresponsive.requiresEmergency911).toBe(true);

      const resultPetechiae = evaluateSymptomTriage({
        childAgeMonths: 36,
        symptoms: ['non_blanching_rash'],
      });
      expect(resultPetechiae.zone).toBe(TriageZone.RED);
      expect(resultPetechiae.conditionSuspected).toContain('Neurological, Systemic Allergic or Meningococcal');
    });

    it('Rule 1D: Strictly triggers RED ZONE for extreme hyperpyrexia (temp >= 105.0°F)', () => {
      const result = evaluateSymptomTriage({
        childAgeMonths: 24,
        temperatureF: 105.2,
        symptoms: ['fever'],
      });
      expect(result.zone).toBe(TriageZone.RED);
      expect(result.requiresEmergency911).toBe(true);
      expect(result.conditionSuspected).toContain('Extreme Hyperpyrexia');
    });

    it('Rule 2: Triggers YELLOW ZONE for acute pediatric concerns needing evaluation within 24h', () => {
      // Ear pulling
      const resultEar = evaluateSymptomTriage({
        childAgeMonths: 14,
        temperatureF: 101.5,
        symptoms: ['ear_pulling'],
      });
      expect(resultEar.zone).toBe(TriageZone.YELLOW);
      expect(resultEar.conditionSuspected).toContain('Ear');
      expect(resultEar.immediateActions.some((a) => a.includes('pediatrician') || a.includes('otoscopic'))).toBe(true);

      // Barking cough (Croup without resting stridor)
      const resultCroup = evaluateSymptomTriage({
        childAgeMonths: 24,
        temperatureF: 100.8,
        symptoms: ['barking_cough'],
      });
      expect(resultCroup.zone).toBe(TriageZone.YELLOW);
      expect(resultCroup.conditionSuspected).toContain('Croup');

      // Fever persisting > 72 hours
      const resultFeverDuration = evaluateSymptomTriage({
        childAgeMonths: 18,
        temperatureF: 101.8,
        durationHours: 76,
        symptoms: ['fever', 'fever_over_3_days'],
      });
      expect(resultFeverDuration.zone).toBe(TriageZone.YELLOW);
      expect(resultFeverDuration.conditionSuspected).toContain('>72 hours');
      expect(resultFeverDuration.clinicalRationale).toContain('pediatrician within 24 hours');
    });

    it('Rule 3: Triggers GREEN ZONE for mild self-limiting symptoms with home care guidance', () => {
      const result = evaluateSymptomTriage({
        childAgeMonths: 18,
        temperatureF: 100.6,
        durationHours: 12,
        symptoms: ['teething'],
      });
      expect(result.zone).toBe(TriageZone.GREEN);
      expect(result.homeCareMeasures.length).toBeGreaterThanOrEqual(2);
      expect(result.recommendedDosing).not.toBeNull();
    });
  });

  describe('Pediatric Antipyretic Dosing Calculator & Contraindications', () => {
    it('strictly contraindicates Ibuprofen in infants under 6 months', () => {
      const doseUnder6m = calculateAntipyreticDose(14, 4, AntipyreticMedication.IBUPROFEN);
      expect(doseUnder6m.isContraindicated).toBe(true);
      expect(doseUnder6m.recommendedDoseMg).toBe(0);
      expect(doseUnder6m.recommendedDoseMl).toBe(0);
      expect(doseUnder6m.contraindicationReason).toContain('Ibuprofen is strictly contraindicated in infants under 6 months');
      expect(doseUnder6m.clinicalSafetyNotes.some((n) => n.includes('Aspirin'))).toBe(true);
    });

    it('calculates safe, weight-calibrated Acetaminophen doses for infants and toddlers', () => {
      // 24 lbs toddler (~10.89 kg) -> ~136 mg -> rounded to ~140 mg
      const dose = calculateAntipyreticDose(24, 14, AntipyreticMedication.ACETAMINOPHEN);
      expect(dose.isContraindicated).toBe(false);
      expect(dose.recommendedDoseMg).toBeGreaterThanOrEqual(130);
      expect(dose.recommendedDoseMg).toBeLessThanOrEqual(160);
      expect(dose.recommendedDoseMl).toBeGreaterThanOrEqual(4.0);
      expect(dose.recommendedDoseMl).toBeLessThanOrEqual(5.0);
      expect(dose.liquidConcentration).toBe('160 mg / 5 mL (32 mg/mL)');
      expect(dose.frequencyHours).toBe(4);
    });

    it('calculates safe, weight-calibrated Ibuprofen doses for children >= 6 months', () => {
      // 22 lbs child (~9.98 kg) -> ~100 mg (100 mg / 5 mL = 5.0 mL)
      const dose = calculateAntipyreticDose(22, 12, AntipyreticMedication.IBUPROFEN);
      expect(dose.isContraindicated).toBe(false);
      expect(dose.recommendedDoseMg).toBe(100);
      expect(dose.recommendedDoseMl).toBe(5.0);
      expect(dose.liquidConcentration).toBe('100 mg / 5 mL (20 mg/mL)');
      expect(dose.frequencyHours).toBe(6);
      expect(dose.maxDosesPer24h).toBe(4);
    });

    it('enforces Aspirin warning across all pediatric antipyretic calculations', () => {
      const tylenolDose = calculateAntipyreticDose(30, 36, AntipyreticMedication.ACETAMINOPHEN);
      expect(tylenolDose.clinicalSafetyNotes.some((n) => n.toLowerCase().includes('aspirin') && n.includes('Reye'))).toBe(true);

      const advilDose = calculateAntipyreticDose(30, 36, AntipyreticMedication.IBUPROFEN);
      expect(advilDose.clinicalSafetyNotes.some((n) => n.toLowerCase().includes('aspirin'))).toBe(true);
    });
  });

  describe('Offline Fallback & Protocol Repository', () => {
    it('provides rich canonical health protocols covering fever, croup, respiratory, and earache', async () => {
      const protocols = await getHealthProtocols();
      expect(protocols.length).toBeGreaterThanOrEqual(4);

      const keys = protocols.map((p) => p.symptomKey);
      expect(keys).toContain('fever');
      expect(keys).toContain('breathing_retractions');
      expect(keys).toContain('barking_cough');
      expect(keys).toContain('ear_pulling');
    });

    it('runs runSymptomTriage with pure local fallback when offline', async () => {
      const result = await runSymptomTriage({
        childAgeMonths: 14,
        temperatureF: 101.5,
        symptoms: ['ear_pulling'],
      });
      expect(result).toBeDefined();
      expect(result.zone).toBe(TriageZone.YELLOW);
      expect(result.conditionSuspected).toContain('Ear');
    });
  });
});
