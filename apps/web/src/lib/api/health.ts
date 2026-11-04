import {
  TriageZone,
  AntipyreticMedication,
  type TriageAssessmentRequestDTO,
  type TriageResultDTO,
  type SymptomProtocolDTO,
  type AntipyreticDosingResultDTO,
  evaluateSymptomTriage,
  calculateAntipyreticDose,
} from '@alongside/shared';
import { apiClient } from './client';

export const CANONICAL_HEALTH_PROTOCOLS: SymptomProtocolDTO[] = [
  {
    id: 'proto-fever',
    symptomKey: 'fever',
    title: 'Pediatric Fever & Temperature Evaluation',
    category: 'FEVER',
    summary:
      'Fever is a protective physiological immune response. In vaccinated children who remain alert and hydrated, fever itself does not cause harm. Triage focuses on child appearance, hydration, and age.',
    feverThresholdF: 100.4,
    redZoneCriteria: [
      'Infant under 90 days (<3 months) with rectal temperature >= 100.4°F (38.0°C) — emergency medical evaluation required',
      'Temperature >= 105.0°F (40.6°C) at any age',
      'Child is limp, unresponsive, difficult to awaken, or having a seizure',
      'Presence of non-blanching purple or dark red pinprick spots (petechiae)',
    ],
    yellowZoneCriteria: [
      'Infant 3–6 months with temperature >= 101.0°F',
      'Fever persisting > 72 hours (3 full days) in child >6 months',
      'Fever >= 102.5°F not responding to antipyretics with noticeable discomfort',
      'Child refusing all fluids for > 8 hours or showing signs of dehydration',
    ],
    greenZoneHomeCare: [
      'Dress in a single layer of breathable cotton clothing.',
      'Offer small sips of fluids (water, breastmilk, oral electrolyte solution) every 15–20 minutes.',
      'Administer weight-based acetaminophen or ibuprofen only if the child is uncomfortable or refusing fluids.',
    ],
    immediateActionRed: 'Call 911 immediately or go to the nearest Pediatric Emergency Department. Do not give fever reducers before evaluation for infants under 90 days.',
    primarySources: ['Barton Schmitt Pediatric Protocols', 'AAP HealthyChildren Fever Guidelines'],
  },
  {
    id: 'proto-respiratory',
    symptomKey: 'breathing_retractions',
    title: 'Respiratory Distress, RSV & Work of Breathing',
    category: 'RESPIRATORY',
    summary:
      'Assessment of work of breathing in infants and young children. Accessory muscle use indicates respiratory fatigue and potential hypoxemia.',
    redZoneCriteria: [
      'Subcostal, intercostal, or suprasternal retractions (skin sucking deep beneath ribs or at collarbone)',
      'Audible expiratory grunting (short groan with each exhale)',
      'Cyanosis (blue, purple, or gray discoloration of lips, gums, or tongue)',
      'Nasal flaring or head bobbing in rhythm with breathing',
    ],
    yellowZoneCriteria: [
      'Rapid breathing rate (>50 breaths/min in infants, >40 in toddlers) while resting calmly without fever',
      'Persistent wheezing or crackling in chest during exhalation',
      'Persistent moist cough with thick green mucus preventing sleep for > 3 days',
    ],
    greenZoneHomeCare: [
      'Run a cool-mist humidifier in child’s bedroom.',
      'Apply 2–3 drops of saline nasal spray per nostril and gently aspirate with bulb syringe before feeding.',
      'Keep child elevated slightly during restful periods.',
    ],
    immediateActionRed: 'Call 911 immediately. Keep child upright and quiet in your arms. Do not force fluids or oral medicine.',
    primarySources: ['AAP Clinical Practice Guideline: Bronchiolitis', 'WHO IMCI Protocols'],
  },
  {
    id: 'proto-croup',
    symptomKey: 'barking_cough',
    title: 'Croup (Laryngotracheobronchitis) & Stridor',
    category: 'RESPIRATORY',
    summary:
      'Viral swelling of the subglottic airway causing a distinctive barking, seal-like cough and potential inspiratory stridor.',
    redZoneCriteria: [
      'Inspiratory stridor (high-pitched squeaking sound when inhaling) while the child is resting quietly or sleeping',
      'Struggling to draw in air with neck or rib retractions',
      'Inability to swallow, excessive drooling, or leaning forward with mouth open',
    ],
    yellowZoneCriteria: [
      'Barking cough present without resting stridor (only heard when crying)',
      'Hoarse voice and low-grade fever (<101.5°F)',
      'Cough worsens predominantly between 10 PM and 4 AM',
    ],
    greenZoneHomeCare: [
      'Take child into a bathroom filled with warm shower steam for 15–20 minutes.',
      'Wrap child warmly and expose to cool night air (or open freezer door) for 10 minutes to constrict airway capillaries.',
      'Keep calm and reassure child; crying increases turbulent airflow and worsens subglottic swelling.',
    ],
    immediateActionRed: 'Call 911 immediately if resting stridor or drooling occurs. Paramedics can administer nebulized epinephrine and steroids.',
    primarySources: ['AAP Croup Management Guidelines', 'Children’s Hospital Colorado Protocols'],
  },
  {
    id: 'proto-ear',
    symptomKey: 'ear_pulling',
    title: 'Acute Otitis Media (Middle Ear Infection) & Earache',
    category: 'ENT',
    summary:
      'Eustachian tube dysfunction following viral upper respiratory infections, leading to fluid collection, middle ear pressure, and bacterial proliferation.',
    redZoneCriteria: [
      'Swelling, redness, or tenderness behind the ear over the mastoid bone (risk of mastoiditis)',
      'Stiff neck, extreme irritability, or child crying inconsolably when head is moved',
      'Facial weakness or drooping on one side',
    ],
    yellowZoneCriteria: [
      'Unilateral or bilateral ear pulling with persistent crying during bottle/breast feedings',
      'Clear, yellowish, or blood-tinged discharge draining from the ear canal (eardrum perforation)',
      'Ear pain lasting > 24 hours accompanied by fever > 101.5°F in a child older than 6 months',
    ],
    greenZoneHomeCare: [
      'Apply a warm, damp compress over the external ear for comfort.',
      'Dose weight-based acetaminophen or ibuprofen for pain relief.',
      'Schedule an in-person otoscopic exam with your pediatrician within 24 hours for accurate middle ear inspection.',
    ],
    immediateActionRed: 'Seek emergency care immediately if there is redness/swelling behind the ear or lethargy.',
    primarySources: ['AAP Clinical Practice Guideline: Acute Otitis Media'],
  },
  {
    id: 'proto-vomiting',
    symptomKey: 'vomiting',
    title: 'Viral Gastroenteritis, Vomiting & Pediatric Dehydration',
    category: 'GASTROINTESTINAL',
    summary:
      'Stomach bug causing gastric emptying dysfunction and fluid loss. The primary clinical danger in pediatric vomiting is rapid dehydration.',
    redZoneCriteria: [
      'Vomiting bright green (bilious) fluid or vomit containing coffee-ground dark blood',
      'Signs of severe dehydration: no urination/wet diaper in 12 hours, dry sticky mouth, no tears when crying, sunken fontanelle',
      'Child is limp, floppy, or difficult to rouse',
      'Severe, localized abdominal pain causing child to scream and double over with knees drawn to chest',
    ],
    yellowZoneCriteria: [
      'Inability to hold down liquids for > 8 hours in an infant or > 12 hours in a child',
      'Frequent vomiting accompanied by high fever (>102.5°F)',
      'Child produces fewer than 3 wet diapers in 24 hours',
    ],
    greenZoneHomeCare: [
      'Rest stomach for 30–60 minutes after a vomiting episode.',
      'Begin oral rehydration solution (Pedialyte) at 1 teaspoon (5 mL) every 5 minutes using a syringe.',
      'Slowly double fluid volume every 20 minutes if vomiting does not recur. Do not offer large volumes at once.',
    ],
    immediateActionRed: 'Call 911 or visit ER if vomit is bright green (bile), blood is present, or child is unresponsive.',
    primarySources: ['AAP Guidelines on Management of Acute Gastroenteritis', 'CDC Oral Rehydration'],
  },
  {
    id: 'proto-rash',
    symptomKey: 'rash',
    title: 'Pediatric Rashes & Dermatological Red Flags',
    category: 'SKIN',
    summary:
      'Most childhood rashes are harmless viral exanthems, but non-blanching purpuric spots or rapidly expanding red areas require urgent triage.',
    redZoneCriteria: [
      'Petechiae or purpura: tiny purple or dark red pinhead spots that do NOT turn white when a clear drinking glass is pressed firmly against them ("The Glass Test")',
      'Hives accompanied by lip, tongue, or facial swelling, difficulty breathing, or vomiting (anaphylaxis)',
      'Skin that appears scalded, peeling, or forming large painful blisters',
    ],
    yellowZoneCriteria: [
      'Target-like concentric red rings (bullseye erythema migrans — Lyme disease)',
      'Warm, tender, bright red spreading skin redness (cellulitis)',
      'Rash accompanied by fever > 101.5°F and eye redness with cracked red lips (Kawasaki disease concern)',
    ],
    greenZoneHomeCare: [
      'For common viral rashes (roseola, hand-foot-mouth), keep skin moisturized with gentle hypoallergenic ointment.',
      'Use lukewarm oatmeal baths to soothe itching.',
      'Keep child’s fingernails trimmed short to prevent secondary bacterial skin infections from scratching.',
    ],
    immediateActionRed: 'Call 911 immediately if rash does not blanch under glass pressure or is accompanied by swelling/breathing difficulty.',
    primarySources: ['NHS UK Glass Test Guidelines', 'AAP Dermatological Triage'],
  },
];

/**
 * Executes 3-Zone Symptom Triage Assessment via REST API with offline fallback.
 */
export async function runSymptomTriage(
  request: TriageAssessmentRequestDTO
): Promise<TriageResultDTO> {
  try {
    const res = await apiClient<{ success: boolean; data: { triageResult: TriageResultDTO } }>(
      '/api/v1/health/triage',
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
    if (res?.data?.triageResult) {
      return res.data.triageResult;
    }
  } catch (err) {
    // Graceful offline fallback to canonical Barton Schmitt algorithmic evaluation
    console.warn('Backend Health Triage endpoint offline; running client Barton Schmitt evaluator:', err);
  }

  return evaluateSymptomTriage(request);
}

/**
 * Retrieves symptom protocols library with offline fallback.
 */
export async function getHealthProtocols(): Promise<SymptomProtocolDTO[]> {
  try {
    const res = await apiClient<{ success: boolean; data: { protocols: SymptomProtocolDTO[] } }>(
      '/api/v1/health/protocols',
      {
        method: 'GET',
      }
    );
    if (res?.data?.protocols && res.data.protocols.length > 0) {
      return res.data.protocols;
    }
  } catch (err) {
    // Offline fallback
  }

  return CANONICAL_HEALTH_PROTOCOLS;
}

/**
 * Pure weight-based antipyretic dosing helper.
 */
export function calculateDosing(
  weightLbs: number,
  ageMonths: number,
  medication: AntipyreticMedication = AntipyreticMedication.ACETAMINOPHEN
): AntipyreticDosingResultDTO {
  return calculateAntipyreticDose(weightLbs, ageMonths, medication);
}
