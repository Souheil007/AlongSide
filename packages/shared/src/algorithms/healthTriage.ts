/**
 * @deprecated RETIRED IN SOU-86: AlongSide has permanently transitioned away from being a clinical symptom triage platform.
 * Retained solely for backward compatibility with legacy test suites.
 */
import { TriageZone } from '../constants/index.js';

export interface SymptomTriageEvaluationInput {
  childAgeMonths: number;
  weightLbs?: number;
  temperatureF?: number;
  temperatureMethod?: 'RECTAL' | 'AXILLARY' | 'ORAL' | 'TYMPANIC';
  symptoms: string[];
  durationHours?: number;
  behaviorNotes?: string;
}

export interface AntipyreticDosingRecommendation {
  medication: 'ACETAMINOPHEN' | 'IBUPROFEN';
  dosageMg: number;
  frequency: string;
  notes: string;
  contraindicated?: boolean;
}

export interface PediatricTriageDecision {
  zone: TriageZone;
  requiresEmergency911: boolean;
  conditionSuspected: string;
  clinicalRationale: string;
  immediateActions: string[];
  homeCareMeasures: string[];
  redFlagWarnings: string[];
  recommendedDosing?: AntipyreticDosingRecommendation | null;
  clinicalAuthority: string;
}

/**
 * Calculates weight-based pediatric antipyretic dosing following AAP standards.
 */
export function calculateAntipyreticDosing(
  weightLbs: number,
  medication: 'ACETAMINOPHEN' | 'IBUPROFEN',
  ageMonths: number
): AntipyreticDosingRecommendation {
  if (medication === 'IBUPROFEN' && ageMonths < 6) {
    return {
      medication: 'IBUPROFEN',
      dosageMg: 0,
      frequency: 'Never',
      notes: 'Ibuprofen is strictly contraindicated in infants under 6 months of age due to immature renal clearance.',
      contraindicated: true,
    };
  }

  if (ageMonths < 3) {
    return {
      medication,
      dosageMg: 0,
      frequency: 'Contact Pediatrician',
      notes: 'Infants under 3 months with fever require immediate physician evaluation prior to administering fever reducers.',
      contraindicated: true,
    };
  }

  const weightKg = weightLbs / 2.20462;

  if (medication === 'ACETAMINOPHEN') {
    // 10 to 15 mg/kg per dose, max 5 doses per 24 hours
    const dosageMg = Math.round(weightKg * 12.5);
    return {
      medication: 'ACETAMINOPHEN',
      dosageMg,
      frequency: 'Every 4 to 6 hours as needed (maximum 5 doses in 24 hours)',
      notes: 'Ensure proper measuring syringe. Infant liquid concentration is standardized at 160 mg / 5 mL.',
      contraindicated: false,
    };
  }

  // Ibuprofen: 10 mg/kg per dose, every 6 to 8 hours
  const dosageMg = Math.round(weightKg * 10);
  return {
    medication: 'IBUPROFEN',
    dosageMg,
    frequency: 'Every 6 to 8 hours as needed with food or milk (maximum 4 doses in 24 hours)',
    notes: 'Do not use on an empty stomach. Infant drops are 50 mg / 1.25 mL; children suspension is 100 mg / 5 mL.',
    contraindicated: false,
  };
}

/**
 * Executes 3-zone Barton Schmitt / AAP pediatric triage assessment.
 */
export function evaluatePediatricTriage(
  input: SymptomTriageEvaluationInput
): PediatricTriageDecision {
  const { childAgeMonths, temperatureF = 0, symptoms = [], durationHours = 0 } = input;
  const symptomList = symptoms.map((s) => s.toLowerCase());

  // RED ZONE RULE 1: Infant < 90 days (< 3 months) with rectal fever >= 100.4°F
  if (childAgeMonths < 3 && temperatureF >= 100.4) {
    return {
      zone: TriageZone.RED,
      requiresEmergency911: true,
      conditionSuspected: 'Neonatal / Early Infant Fever (Potential Serious Bacterial Infection)',
      clinicalRationale:
        `Fever of ${temperatureF}°F in an infant under 90 days represents a medical emergency due to an immature immune system and risk of rapid bacterial sepsis.`,
      immediateActions: [
        'Proceed immediately to the nearest Emergency Department or call 911.',
        'Do NOT administer infant acetaminophen before medical evaluation unless directly instructed by an ER physician.',
      ],
      homeCareMeasures: ['Keep infant calm and dressed in one light layer.'],
      redFlagWarnings: [
        'Lethargy (cannot wake baby to feed)',
        'Weak or high-pitched cry',
        'Pale, mottled, or gray skin color',
      ],
      recommendedDosing: null,
      clinicalAuthority: 'Barton Schmitt Pediatric Telephone Protocols / AAP Neonatal Sepsis Guidelines',
    };
  }

  // RED ZONE RULE 2: Respiratory distress / stridor / retractions
  const hasRespiratoryEmergency = symptomList.some(
    (s) =>
      s.includes('retraction') ||
      s.includes('stridor') ||
      s.includes('grunt') ||
      s.includes('cyanosis') ||
      s.includes('blue_lips') ||
      s.includes('difficulty_breathing') ||
      s.includes('gasping')
  );

  if (hasRespiratoryEmergency) {
    return {
      zone: TriageZone.RED,
      requiresEmergency911: true,
      conditionSuspected: 'Acute Pediatric Respiratory Distress / Upper Airway Obstruction',
      clinicalRationale:
        'Intercostal or subcostal retractions, audible stridor, or cyanosis indicate respiratory compromise requiring immediate acute stabilization.',
      immediateActions: [
        'Call 911 immediately.',
        'Keep child calm in an upright sitting position. Agitation worsens airway narrowing.',
        'Do NOT put anything in child mouth.',
      ],
      homeCareMeasures: ['If croup is suspected while waiting for EMS, sit in a steamy bathroom for 5 minutes.'],
      redFlagWarnings: [
        'Flaring nostrils or head bobbing with each breath',
        'Inability to speak or cry due to lack of breath',
        'Bluish discoloration around lips or tongue',
      ],
      recommendedDosing: null,
      clinicalAuthority: 'AAP Pediatric Emergency Airway Guidelines',
    };
  }

  // RED ZONE RULE 3: Extreme fever >= 105.0°F or seizure / unresponsiveness
  const hasNeurologicalRedFlag = symptomList.some(
    (s) => s.includes('seizure') || s.includes('unresponsive') || s.includes('stiff_neck') || s.includes('petechiae')
  );

  if (temperatureF >= 105.0 || hasNeurologicalRedFlag) {
    return {
      zone: TriageZone.RED,
      requiresEmergency911: true,
      conditionSuspected: 'Severe Hyperpyrexia / Meningeal or Neurological Red Flag',
      clinicalRationale:
        'Temperature >= 105.0°F, non-blanching petechial purpura, or altered mental status require urgent emergency room resuscitation.',
      immediateActions: [
        'Call 911 or proceed immediately to the Emergency Room.',
        'If having a seizure, place child on their side on the floor away from sharp objects.',
      ],
      homeCareMeasures: ['Do NOT use cold baths or alcohol rubs (causes shivering and core temperature spike).'],
      redFlagWarnings: [
        'Non-blanching purple rash spots',
        'Extreme lethargy or neck stiffness (inability to touch chin to chest)',
      ],
      recommendedDosing: null,
      clinicalAuthority: 'AAP Emergency Care Guidelines',
    };
  }

  // YELLOW ZONE RULE 1: Ear pulling / Otitis Media
  const hasEarPulling = symptomList.some((s) => s.includes('ear_pulling') || s.includes('ear_pain') || s.includes('otitis'));
  if (hasEarPulling) {
    const dosing = input.weightLbs ? calculateAntipyreticDosing(input.weightLbs, 'ACETAMINOPHEN', childAgeMonths) : null;
    return {
      zone: TriageZone.YELLOW,
      requiresEmergency911: false,
      conditionSuspected: 'Suspected Acute Otitis Media / Middle Ear Effusion',
      clinicalRationale:
        `Fever of ${temperatureF > 0 ? temperatureF + '°F' : 'present'} with unilateral ear pulling or night waking indicates likely middle ear pressure or acute otitis media.`,
      immediateActions: [
        'Schedule a pediatrician appointment within 24 hours for pneumatic otoscopic exam.',
        'Provide comfort care and pain relief with weight-based antipyretics.',
      ],
      homeCareMeasures: [
        'Offer frequent small sips of fluids to promote swallowing and equalize Eustachian tube pressure.',
        'Keep child slightly elevated during sleep to relieve ear pressure.',
      ],
      redFlagWarnings: [
        'Swelling, redness, or tenderness behind the ear (mastoiditis warning sign)',
        'Drainage of blood or foul pus from ear canal',
        'Stridor, chest retractions, or high fever >= 104°F',
      ],
      recommendedDosing: dosing,
      clinicalAuthority: 'Barton Schmitt Pediatric Telephone Protocols / AAP Otitis Media Clinical Practice Guideline',
    };
  }

  // YELLOW ZONE RULE 2: Prolonged fever (> 72 hours) or moderate dehydration
  const hasProlongedFever = durationHours >= 72 || (temperatureF >= 102.0 && durationHours >= 48);
  const hasDehydration = symptomList.some((s) => s.includes('dehydration') || s.includes('dry_mouth') || s.includes('no_tears'));

  if (hasProlongedFever || hasDehydration) {
    const dosing = input.weightLbs ? calculateAntipyreticDosing(input.weightLbs, 'ACETAMINOPHEN', childAgeMonths) : null;
    return {
      zone: TriageZone.YELLOW,
      requiresEmergency911: false,
      conditionSuspected: hasDehydration ? 'Mild to Moderate Dehydration' : 'Prolonged Pediatric Fever (> 72 Hours)',
      clinicalRationale:
        hasDehydration
          ? 'Reduced urinary frequency (< 3 wet diapers in 24h) or dry mucous membranes requires oral rehydration protocol and clinic evaluation.'
          : 'Fever lasting over 72 hours warrants in-person clinical assessment to rule out secondary bacterial infection, urinary tract infection, or pneumonia.',
      immediateActions: [
        'Contact child pediatrician for same-day or next-morning clinic appointment.',
        hasDehydration ? 'Administer oral rehydration solution (Pedialyte) 5 mL every 5 minutes.' : 'Continue fluid hydration.',
      ],
      homeCareMeasures: [
        'Offer small, frequent volumes rather than large gulps.',
        'Track wet diapers and fluid intake on a sheet.',
      ],
      redFlagWarnings: [
        'No wet diapers in 8 hours (or 12 hours for older child)',
        'Sunken eyes or fontanelle (soft spot)',
        'Child becomes floppy or impossible to console',
      ],
      recommendedDosing: dosing,
      clinicalAuthority: 'AAP Clinical Practice Guidelines',
    };
  }

  // GREEN ZONE: Supportive Home Care
  const dosing = input.weightLbs ? calculateAntipyreticDosing(input.weightLbs, 'ACETAMINOPHEN', childAgeMonths) : null;
  return {
    zone: TriageZone.GREEN,
    requiresEmergency911: false,
    conditionSuspected: 'Mild Viral Upper Respiratory Syndrome / Teething Comfort Care',
    clinicalRationale:
      'Symptoms are consistent with a self-limiting viral episode without acute red flags or respiratory compromise.',
    immediateActions: [
      'Supportive home care with rest, fluids, and light, breathable clothing.',
      'Treat the child comfort, not the thermometer reading alone.',
    ],
    homeCareMeasures: [
      'Offer favorite fluids, ice pops, or breastmilk/formula frequently.',
      'Use cool-mist humidifier in child sleeping area.',
      'Administer weight-based acetaminophen or ibuprofen only if child is uncomfortable or irritable.',
    ],
    redFlagWarnings: [
      'Fever rises above 104.0°F or lasts longer than 72 hours',
      'Child develops chest retractions, rapid breathing, or grunting',
      'Child refuses all liquids for more than 4 consecutive hours',
    ],
    recommendedDosing: dosing,
    clinicalAuthority: 'AAP Supportive Pediatric Care Standards',
  };
}
