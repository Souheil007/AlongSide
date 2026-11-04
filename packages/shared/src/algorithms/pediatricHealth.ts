import {
  TriageZone,
  TemperatureMethod,
  AntipyreticMedication,
} from '../constants/index.js';
import type {
  AntipyreticDosingResultDTO,
  TriageResultDTO,
  TriageAssessmentRequestDTO,
} from '../types/index.js';

export const LBS_TO_KG = 0.453592;

/**
 * Calculates weight-based pediatric antipyretic dosing for Acetaminophen and Ibuprofen
 * with clinical contraindication guards (AAP / Barton Schmitt clinical standards).
 */
export function calculateAntipyreticDose(
  weightLbs: number,
  childAgeMonths: number,
  medication: AntipyreticMedication = AntipyreticMedication.ACETAMINOPHEN
): AntipyreticDosingResultDTO {
  const safeWeightLbs = Math.max(4, weightLbs);
  const weightKg = Number((safeWeightLbs * LBS_TO_KG).toFixed(2));

  // Contraindication Guard 1: Ibuprofen in infants under 6 months
  if (medication === AntipyreticMedication.IBUPROFEN && childAgeMonths < 6) {
    return {
      medication,
      isContraindicated: true,
      contraindicationReason:
        'Ibuprofen is strictly contraindicated in infants under 6 months of age due to immature renal clearance, risk of acute kidney injury, and gastric irritation.',
      weightLbs: safeWeightLbs,
      weightKg,
      childAgeMonths,
      recommendedDoseMg: 0,
      recommendedDoseMl: 0,
      liquidConcentration: '100 mg / 5 mL (Children’s liquid)',
      frequencyHours: 6,
      frequencyDescription: 'DO NOT ADMINISTER (Contraindicated for age < 6 months)',
      maxDosesPer24h: 0,
      maxDailyMg: 0,
      clinicalSafetyNotes: [
        'Strictly avoid Ibuprofen under 6 months of age.',
        'If fever reduction or pain relief is required, consult your pediatrician for infant Acetaminophen dosing.',
        'Never administer Aspirin to any child or teenager (fatal Reye’s syndrome risk).',
      ],
    };
  }

  if (medication === AntipyreticMedication.IBUPROFEN) {
    // 10 mg/kg per dose (standard pediatric guidance: 5-10 mg/kg)
    const rawMg = weightKg * 10.0;
    const recommendedDoseMg = Math.min(400, Math.round(rawMg / 10) * 10 || 50);
    // Standard liquid: 100 mg / 5 mL (20 mg/mL)
    const recommendedDoseMl = Number((recommendedDoseMg / 20).toFixed(1));
    const maxDailyMg = Math.min(1200, Math.round(weightKg * 40));

    return {
      medication,
      isContraindicated: false,
      weightLbs: safeWeightLbs,
      weightKg,
      childAgeMonths,
      recommendedDoseMg,
      recommendedDoseMl,
      liquidConcentration: '100 mg / 5 mL (20 mg/mL)',
      frequencyHours: 6,
      frequencyDescription: 'Every 6 to 8 hours as needed for comfort. Do not exceed 4 doses in 24 hours.',
      maxDosesPer24h: 4,
      maxDailyMg,
      clinicalSafetyNotes: [
        'Always use the syringe or dosing cup that came with the medicine; household teaspoons are inaccurate.',
        'Ensure child is well-hydrated before administering Ibuprofen.',
        'Never give Aspirin or products containing bismuth subsalicylate (e.g. Pepto-Bismol) to children.',
      ],
    };
  }

  // Acetaminophen (Tylenol)
  // 12.5 mg/kg per dose (standard pediatric guidance: 10-15 mg/kg)
  const rawMg = weightKg * 12.5;
  const recommendedDoseMg = Math.min(1000, Math.round(rawMg / 10) * 10 || 40);
  // Standard liquid: 160 mg / 5 mL (32 mg/mL)
  const recommendedDoseMl = Number((recommendedDoseMg / 32).toFixed(1));
  const maxDailyMg = Math.min(3000, Math.round(weightKg * 75));

  return {
    medication: AntipyreticMedication.ACETAMINOPHEN,
    isContraindicated: false,
    weightLbs: safeWeightLbs,
    weightKg,
    childAgeMonths,
    recommendedDoseMg,
    recommendedDoseMl,
    liquidConcentration: '160 mg / 5 mL (32 mg/mL)',
    frequencyHours: 4,
    frequencyDescription: 'Every 4 to 6 hours as needed for comfort. Do not exceed 5 doses in 24 hours.',
    maxDosesPer24h: 5,
    maxDailyMg,
    clinicalSafetyNotes: [
      'Always verify that no other multi-symptom cold or cough medicine contains acetaminophen to prevent accidental overdose.',
      'Always use a calibrated oral syringe for infants and young toddlers.',
      'Never give Aspirin to any minor under 19 years old (Reye’s syndrome risk).',
    ],
  };
}

/**
 * Barton Schmitt 3-Zone Pediatric Clinical Symptom Triage Evaluator
 */
export function evaluateSymptomTriage(request: TriageAssessmentRequestDTO): TriageResultDTO {
  const ageMonths = request.childAgeMonths ?? 12;
  const tempF = request.temperatureF ?? null;
  const symptoms = (request.symptoms ?? []).map((s) => s.toLowerCase().trim());
  const durationHours = request.durationHours ?? 0;
  const behaviorNotes = request.behaviorNotes ?? '';

  // ----------------------------------------------------
  // 1. RED ZONE: ACUTE LIFE-THREAT & NEONATAL EMERGENCY
  // ----------------------------------------------------

  // Rule 1A: Neonatal Fever (<90 days with temp >= 100.4°F)
  if (ageMonths < 3 && tempF !== null && tempF >= 100.4) {
    return {
      zone: TriageZone.RED,
      requiresEmergency911: true,
      conditionSuspected: 'Neonatal Febrile Illness (High Sepsis / Meningitis Risk)',
      clinicalRationale:
        'Any infant younger than 90 days with a temperature of 100.4°F (38.0°C) or higher requires immediate emergency evaluation. Young infants have immature blood-brain barriers and immune systems and may deteriorate rapidly without obvious symptoms.',
      immediateActions: [
        'Call 911 or take your infant to the nearest Pediatric Emergency Department immediately.',
        'Do not give acetaminophen or ibuprofen before emergency medical evaluation, as it masks critical diagnostic signs.',
        'Keep infant calm, breathing freely, and warm in a single comfortable swaddle layer.',
      ],
      homeCareMeasures: [
        'Do not attempt home remedies or cold baths.',
        'Have health insurance, child birth records, and diaper bag ready for admission.',
      ],
      redFlagWarnings: [
        'Lethargy or unresponsiveness',
        'Inability to feed or suck',
        'Weak or high-pitched cry',
        'Bulging soft spot (fontanelle)',
      ],
      recommendedDosing: null,
      clinicalAuthority: 'Barton Schmitt Pediatric Telephone Protocols / AAP Neonatal Triage Guideline',
    };
  }

  // Rule 1B: Respiratory Distress Red Flags
  const respiratoryRedFlags = [
    'breathing_retractions',
    'stridor',
    'cyanosis',
    'grunting',
    'struggling_to_breathe',
    'blue_lips',
  ];
  const hasRespiratoryEmergency = symptoms.some((s) => respiratoryRedFlags.includes(s));
  if (hasRespiratoryEmergency) {
    return {
      zone: TriageZone.RED,
      requiresEmergency911: true,
      conditionSuspected: 'Severe Respiratory Distress / Impending Respiratory Failure',
      clinicalRationale:
        'Signs of accessory muscle usage (chest or neck retractions), stridor at rest, or discoloration around lips indicate compromised airway or severe hypoxemia.',
      immediateActions: [
        'Call 911 immediately.',
        'Keep the child upright in your lap to maximize chest expansion. Keep calm; anxiety increases airway resistance.',
        'Do not force fluids, food, or oral medications into a struggling airway.',
      ],
      homeCareMeasures: [
        'Stay near open fresh air or a steamy bathroom while awaiting paramedics if croup is suspected and airway is open.',
      ],
      redFlagWarnings: [
        'Audible grunting or whistling with each breath',
        'Bluish, purple, or pale tongue or inner gums',
        'Head bobbing in rhythm with breathing',
      ],
      recommendedDosing: null,
      clinicalAuthority: 'AAP Emergency Care Guidelines & Barton Schmitt Protocols',
    };
  }

  // Rule 1C: Neurological / Unresponsiveness / Seizure / Anaphylaxis Red Flags
  const acuteLifeThreats = [
    'unresponsive',
    'limp',
    'seizure',
    'anaphylaxis',
    'swelling_face_throat',
    'purple_spots',
    'non_blanching_rash',
  ];
  const hasLifeThreat = symptoms.some((s) => acuteLifeThreats.includes(s));
  if (hasLifeThreat) {
    return {
      zone: TriageZone.RED,
      requiresEmergency911: true,
      conditionSuspected: 'Acute Neurological, Systemic Allergic or Meningococcal Emergency',
      clinicalRationale:
        'Sudden unresponsiveness, non-blanching purple spots (petechiae/purpura), seizure activity, or facial/throat swelling with hives are immediate medical emergencies.',
      immediateActions: [
        'Call 911 immediately.',
        'If anaphylaxis is suspected and an Epinephrine auto-injector (EpiPen) is available, administer into outer mid-thigh right away.',
        'If child is seizing, place on their side on a soft surface away from hard objects. Do not put anything in their mouth.',
      ],
      homeCareMeasures: [
        'Remain with child and monitor breathing until paramedics arrive.',
      ],
      redFlagWarnings: [
        'Airway obstruction or inability to swallow saliva',
        'Purple or blood-red spots that do not turn white when pressed with a clear glass',
      ],
      recommendedDosing: null,
      clinicalAuthority: 'Barton Schmitt Protocols / AAP Pediatric Life Support',
    };
  }

  // Rule 1D: Extreme Hyperpyrexia
  if (tempF !== null && tempF >= 105.0) {
    return {
      zone: TriageZone.RED,
      requiresEmergency911: true,
      conditionSuspected: 'Extreme Hyperpyrexia (Temperature >= 105.0°F)',
      clinicalRationale:
        'A body temperature of 105.0°F (40.6°C) or higher requires urgent physician evaluation to identify bacterial focus or underlying environmental heat illness.',
      immediateActions: [
        'Call 911 or head to the nearest Emergency Department.',
        'Remove heavy clothing; sponge with lukewarm (NOT cold) water.',
      ],
      homeCareMeasures: ['Never use ice water baths or rubbing alcohol.'],
      redFlagWarnings: ['Delirium, confusion, stiff neck, or extreme lethargy'],
      recommendedDosing: calculateAntipyreticDose(ageMonths >= 6 ? 22 : 12, ageMonths, AntipyreticMedication.ACETAMINOPHEN),
      clinicalAuthority: 'AAP Clinical Triage & Barton Schmitt Guidelines',
    };
  }

  // ----------------------------------------------------
  // 2. YELLOW ZONE: PROMPT PEDIATRICIAN EVALUATION (<24H)
  // ----------------------------------------------------

  const yellowZoneSymptoms = [
    'ear_pulling',
    'earache',
    'barking_cough',
    'vomiting_stomach_flu',
    'vomiting',
    'suspected_uti',
    'spreading_rash',
    'mild_dehydration',
    'fever_over_3_days',
  ];

  const hasYellowSymptom = symptoms.some((s) => yellowZoneSymptoms.includes(s));
  const hasPersistentFever = durationHours >= 72 || symptoms.includes('fever_over_3_days');
  const hasModerateFever = tempF !== null && tempF >= 102.5;
  const isInfant3To6mWithFever = ageMonths >= 3 && ageMonths < 6 && tempF !== null && tempF >= 101.0;

  if (hasYellowSymptom || hasPersistentFever || hasModerateFever || isInfant3To6mWithFever) {
    let conditionSuspected = 'Pediatric Symptom Requiring Physician Evaluation';
    if (symptoms.includes('ear_pulling') || symptoms.includes('earache')) {
      conditionSuspected = 'Suspected Acute Otitis Media (Middle Ear Infection) or Teething';
    } else if (symptoms.includes('barking_cough')) {
      conditionSuspected = 'Suspected Croup (Laryngotracheobronchitis)';
    } else if (symptoms.includes('vomiting') || symptoms.includes('vomiting_stomach_flu')) {
      conditionSuspected = 'Viral Gastroenteritis (Watch Fluid Hydration)';
    } else if (hasPersistentFever) {
      conditionSuspected = 'Prolonged Febrile Illness (>72 hours)';
    } else if (isInfant3To6mWithFever) {
      conditionSuspected = 'Infant Fever (3–6 Months) — Needs Pediatric Exam';
    }

    return {
      zone: TriageZone.YELLOW,
      requiresEmergency911: false,
      conditionSuspected,
      clinicalRationale:
        'Your child presents symptoms that are safe for supportive home care overnight, but warrant an evaluation by your pediatrician within 24 hours to diagnose and prevent complications.',
      immediateActions: [
        'Contact your pediatrician’s office or nurse triage line to book a visit within 24 hours.',
        'Use the "Export Pediatrician Visit Summary" below to share your symptom timeline, temperatures, and fluid intake with the doctor.',
        'Offer weight-based fever/pain medication if your child is uncomfortable or refusing fluids.',
      ],
      homeCareMeasures: [
        'Offer small, frequent sips of electrolyte solution (Pedialyte), breastmilk, formula, or water.',
        'Maintain a comfortable room temperature (68–72°F) and single-layer cotton pajamas.',
        'For nasal congestion or barking cough, use cool-mist humidifier or sit in a steamy bathroom for 15 minutes.',
      ],
      redFlagWarnings: [
        'If child develops chest retractions (skin sucking between ribs) or fast breathing, escalate to Red Zone / 911.',
        'If child produces zero wet diapers in 8 hours or has dry cracked lips and sunken eyes.',
        'If child becomes unusually drowsy and hard to awaken.',
      ],
      recommendedDosing: calculateAntipyreticDose(
        ageMonths >= 12 ? 24 : ageMonths >= 6 ? 18 : 12,
        ageMonths,
        ageMonths >= 6 ? AntipyreticMedication.IBUPROFEN : AntipyreticMedication.ACETAMINOPHEN
      ),
      clinicalAuthority: 'Barton Schmitt Pediatric Telephone Protocols / AAP',
    };
  }

  // ----------------------------------------------------
  // 3. GREEN ZONE: SUPPORTIVE HOME CARE & MONITORING
  // ----------------------------------------------------

  return {
    zone: TriageZone.GREEN,
    requiresEmergency911: false,
    conditionSuspected: 'Mild Viral Symptom / Low-Acuity Illness',
    clinicalRationale:
      'Your child’s symptoms are consistent with a routine self-limiting viral illness or teething. The immune system is functioning normally. In an alert, playful, and hydrated child, supportive home care is the safest course of action.',
    immediateActions: [
      'Focus on hydration and comfort rather than eliminating the fever entirely.',
      'Fever is a healthy immune defense that activates white blood cells and slows viral replication.',
      'Dose weight-based Acetaminophen or Ibuprofen only if your child is in distress or uncomfortable.',
    ],
    homeCareMeasures: [
      'Offer favorite fluids frequently (water, breastmilk, diluted 100% juice, fruit popsicles, or electrolyte solutions).',
      'Encourage restful, low-key activities (books, puzzles, cuddling).',
      'Use saline nasal drops and a bulb aspirator before feeding or sleeping if congested.',
    ],
    redFlagWarnings: [
      'Fever persisting beyond 72 hours (3 full days).',
      'Child stops drinking or has fewer than 3 wet diapers in 24 hours.',
      'Appearance of a new spreading rash or rapid breathing.',
    ],
    recommendedDosing: calculateAntipyreticDose(
      ageMonths >= 12 ? 24 : ageMonths >= 6 ? 18 : 12,
      ageMonths,
      ageMonths >= 6 ? AntipyreticMedication.IBUPROFEN : AntipyreticMedication.ACETAMINOPHEN
    ),
    clinicalAuthority: 'American Academy of Pediatrics (HealthyChildren.org) / Barton Schmitt Protocols',
  };
}
