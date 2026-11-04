/**
 * Clinical Safe Harbor Emergency Override Filter
 * Canonical Barton Schmitt & AAP Pediatric Safe Harbor Protocol
 * Conforms to PLAN-20 and docs/research/pediatric-health-triage-protocols.md
 */

export interface ClinicalEmergencyAlert {
  isEmergency: boolean;
  category:
    | 'RESPIRATORY_DISTRESS'
    | 'INFANT_FEVER'
    | 'TOXIC_INGESTION'
    | 'ANAPHYLAXIS'
    | 'NEUROLOGICAL_EMERGENCY';
  headline: string;
  directive: string;
  phoneDial: string;
  nearestFacilityGuidance: string;
  matchedTriggers: string[];
}

export interface ChildClinicalContext {
  name?: string;
  age?: number | null;
  ageMonths?: number | null;
  developmentalTier?: string | null;
}

export class ClinicalSafeHarborFilter {
  /**
   * Evaluates parent inquiry and child context for acute pediatric life-threat red flags.
   * Returns a structured emergency alert if emergency criteria are satisfied; otherwise null.
   */
  static evaluate(
    message: string,
    childContext?: ChildClinicalContext | null
  ): ClinicalEmergencyAlert | null {
    const text = message.toLowerCase();

    // 1. Respiratory Distress & Work of Breathing Red Flags
    const respiratoryPatterns: Array<{ regex: RegExp; label: string }> = [
      { regex: /\b(blue\s+(lips|mouth|tongue|face)|cyanosis)\b/i, label: 'cyanosis / blue lips' },
      { regex: /\b(chest\s+retractions?|subcostal\s+retractions?|ribs?\s+pulling\s+in|chest\s+caving\s+in)\b/i, label: 'chest retractions' },
      { regex: /\b(struggling\s+to\s+breathe|gasping\s+for\s+air|cannot\s+breathe|can't\s+breathe|trouble\s+breathing)\b/i, label: 'struggling to breathe' },
      { regex: /\b(stridor\s+at\s+rest|grunting\s+with\s+breathing|involuntary\s+grunt|head\s+bobbing)\b/i, label: 'stridor / grunting' },
      { regex: /\b(choking\s+on|airway\s+blocked)\b/i, label: 'choking' },
    ];

    const matchedRespiratory = respiratoryPatterns
      .filter((p) => p.regex.test(text))
      .map((p) => p.label);

    if (matchedRespiratory.length > 0) {
      return {
        isEmergency: true,
        category: 'RESPIRATORY_DISTRESS',
        headline: 'CRITICAL EMERGENCY: Severe Respiratory Distress Detected',
        directive:
          'Call 911 or proceed immediately to the nearest Pediatric Emergency Department. Inward chest retractions, cyanosis, and grunting are signs of impending respiratory failure.',
        phoneDial: '911',
        nearestFacilityGuidance:
          'Keep the child upright and calm. Do NOT attempt to feed, give water, or administer oral medication while the child is struggling to breathe.',
        matchedTriggers: matchedRespiratory,
      };
    }

    // 2. Early Infant Fever (<90 Days / <3 Months) Red Flag
    const isInfantByContext =
      childContext &&
      ((childContext.ageMonths !== undefined &&
        childContext.ageMonths !== null &&
        childContext.ageMonths < 3) ||
        (childContext.age === 0 && childContext.ageMonths === undefined));

    const infantAgeInText =
      /\b([0-2]\s*[-–]?\s*month|1\s*[-–]?\s*month|2\s*[-–]?\s*month|newborn|neonate|[1-8]\s*[-–]?\s*weeks?)\b/i.test(
        text
      );

    const hasFeverInText =
      /\b(fever|100\.4|101|102|103|104|temp(erature)?\s+of\s+10[0-4]|febrile|burning\s+up)\b/i.test(
        text
      );

    if ((isInfantByContext || infantAgeInText) && hasFeverInText) {
      const triggers = ['infant <90 days', 'fever'];
      if (infantAgeInText) triggers.push('infant age in query');
      return {
        isEmergency: true,
        category: 'INFANT_FEVER',
        headline: 'CRITICAL EMERGENCY: Neonatal / Early Infant Fever (<90 Days)',
        directive:
          'Take infant to the nearest Pediatric Emergency Department or call 911 immediately. Fevers ≥ 100.4°F in infants under 90 days require urgent clinical evaluation for invasive bacterial infection.',
        phoneDial: '911',
        nearestFacilityGuidance:
          'Do NOT administer infant Tylenol or fever reducers prior to emergency evaluation, as this masks crucial diagnostic temperature curves.',
        matchedTriggers: triggers,
      };
    }

    // 3. Toxic Ingestion / Foreign Body
    const toxicPatterns: Array<{ regex: RegExp; label: string }> = [
      { regex: /\b(button\s+battery|swallowed\s+(a\s+)?battery|coin\s+battery)\b/i, label: 'button battery ingestion' },
      { regex: /\b(swallowed\s+(a\s+)?magnet|multiple\s+magnets)\b/i, label: 'magnet ingestion' },
      { regex: /\b(drank\s+(bleach|cleaner|detergent|chemical)|poison(ing|ed)?|swallowed\s+pills)\b/i, label: 'toxic substance ingestion' },
    ];

    const matchedToxic = toxicPatterns
      .filter((p) => p.regex.test(text))
      .map((p) => p.label);

    if (matchedToxic.length > 0) {
      return {
        isEmergency: true,
        category: 'TOXIC_INGESTION',
        headline: 'CRITICAL EMERGENCY: High-Risk Ingestion / Poisoning',
        directive:
          'Proceed immediately to the nearest Pediatric Emergency Department or call 911 / Poison Control (1-800-222-1222). Button batteries and magnets cause catastrophic tissue necrosis within 2 hours.',
        phoneDial: '911',
        nearestFacilityGuidance:
          'Do NOT induce vomiting. Keep child calm and bring the packaging or remaining pieces to the emergency department.',
        matchedTriggers: matchedToxic,
      };
    }

    // 4. Anaphylaxis
    const anaphylaxisPatterns: Array<{ regex: RegExp; label: string }> = [
      { regex: /\b(anaphylaxis|throat\s+(closing|tightening)|tongue\s+swelling)\b/i, label: 'airway anaphylaxis' },
      { regex: /\b(hives\s+(and|with)\s+vomiting|hives\s+and\s+dizziness|lip\s+swelling\s+and\s+vomiting)\b/i, label: 'multisystem allergic reaction' },
      { regex: /\b(needs?\s+(an\s+)?epipen|administer\s+epinephrine)\b/i, label: 'epinephrine indicated' },
    ];

    const matchedAnaphylaxis = anaphylaxisPatterns
      .filter((p) => p.regex.test(text))
      .map((p) => p.label);

    if (matchedAnaphylaxis.length > 0) {
      return {
        isEmergency: true,
        category: 'ANAPHYLAXIS',
        headline: 'CRITICAL EMERGENCY: Severe Anaphylactic Reaction',
        directive:
          'Administer Epinephrine Auto-Injector (Auvi-Q / EpiPen) into the outer middle thigh immediately and call 911. Biphasic reactions can occur hours later.',
        phoneDial: '911',
        nearestFacilityGuidance:
          'Lay child flat with legs elevated unless vomiting or struggling to breathe. Do not delay epinephrine for oral antihistamines.',
        matchedTriggers: matchedAnaphylaxis,
      };
    }

    // 5. Acute Neurological / Sepsis Red Flags
    const neuroPatterns: Array<{ regex: RegExp; label: string }> = [
      { regex: /\b(unresponsive|won't\s+wake\s+up|cannot\s+wake\s+up|unarousable|unconscious)\b/i, label: 'unresponsive / coma' },
      { regex: /\b(active\s+seizure|convulsing|seizure\s+lasting)\b/i, label: 'active seizure' },
      { regex: /\b(stiff\s+neck\s+(and|with)\s+fever|petechial\s+rash|purple\s+spots\s+not\s+(fading|blanching))\b/i, label: 'meningitis / sepsis indicators' },
    ];

    const matchedNeuro = neuroPatterns
      .filter((p) => p.regex.test(text))
      .map((p) => p.label);

    if (matchedNeuro.length > 0) {
      return {
        isEmergency: true,
        category: 'NEUROLOGICAL_EMERGENCY',
        headline: 'CRITICAL EMERGENCY: Severe Neurological / Sepsis Red Flag',
        directive:
          'Call 911 immediately. Unresponsiveness, ongoing seizures, and non-blanching purple rashes require urgent emergency life-support intervention.',
        phoneDial: '911',
        nearestFacilityGuidance:
          'Place child on their side in the recovery position to maintain airway patency. Do not restrain limbs during seizures.',
        matchedTriggers: matchedNeuro,
      };
    }

    return null;
  }
}
