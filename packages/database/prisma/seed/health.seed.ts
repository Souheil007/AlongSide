import type { PrismaClient } from '@prisma/client';
import { DevelopmentalTier } from '@alongside/shared';

export interface SymptomProtocolSeedData {
  slug: string;
  title: string;
  summary: string;
  targetTiers: DevelopmentalTier[];
  redFlags: string[];
  yellowFlags: string[];
  greenHomeCare: string[];
  contraindications: string[];
  clinicalAuthority: string;
}

export const SYMPTOM_PROTOCOLS_SEED: SymptomProtocolSeedData[] = [
  {
    slug: 'fever-hyperpyrexia',
    title: 'Pediatric Fever & Hyperpyrexia Triage',
    summary:
      'Age-stratified fever triage protocol distinguishing benign immune response from potential neonatal sepsis or hyperpyrexia.',
    targetTiers: [
      DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
      DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
      DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
      DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
      DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
      DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    ],
    redFlags: [
      'Infant under 90 days with rectal temperature >= 100.4°F (38.0°C) or < 97.0°F (36.1°C)',
      'Temperature >= 105.0°F (40.6°C) at any age',
      'Child is limp, unresponsive, or difficult to wake',
      'Stiff neck (inability to touch chin to chest) or non-blanching purple/red spots on skin (petechiae)',
      'First febrile seizure lasting > 5 minutes or accompanied by focal twitching',
    ],
    yellowFlags: [
      'Fever lasting more than 72 hours (3 full days) without clear cause',
      'Temperature >= 102.0°F in infant 3 to 6 months',
      'Child displays ear pulling, persistent crying, or burning pain on urination',
      'Fever went away for 24+ hours and then returned higher (bacterial superinfection sign)',
      'Signs of mild dehydration: fewer than 3 wet diapers in 24 hours',
    ],
    greenHomeCare: [
      'Dress child in a single layer of light, breathable clothing; do not bundle in heavy blankets',
      'Offer small, frequent sips of cool fluids, breastmilk, or electrolyte solutions',
      'Treat the child comfort, not the thermometer number alone',
      'Use weight-based acetaminophen (10-15 mg/kg) every 4-6 hours PRN, or ibuprofen (5-10 mg/kg) if >= 6 months',
      'Lukewarm sponging is optional only if child finds it soothing; never use cold water or alcohol',
    ],
    contraindications: [
      'NEVER administer Aspirin (acetylsalicylic acid) to anyone under 19 due to fatal risk of Reye syndrome',
      'NEVER administer Ibuprofen to infants under 6 months due to immature renal clearance',
      'NEVER administer OTC multi-symptom cold/cough syrups to children under 4 to 6 years of age',
      'Do NOT use rubbing alcohol baths or ice baths (induces peripheral vasoconstriction and shivering spikes)',
    ],
    clinicalAuthority: 'Barton Schmitt Pediatric Telephone Protocols / AAP Clinical Report on Fever Management',
  },
  {
    slug: 'respiratory-distress-rsv',
    title: 'Pediatric Respiratory Distress, RSV & Bronchiolitis',
    summary:
      'Work of breathing (WOB) assessment identifying acute airway obstruction, intercostal retractions, and bronchiolitis.',
    targetTiers: [
      DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
      DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    ],
    redFlags: [
      'Severe retractions: chest or stomach sucking in deeply between or beneath ribs with every breath',
      'Audible grunting sound at exhalation (infant vocal cords slamming shut to retain air)',
      'Cyanosis: blue, dusky, or pale gray discoloration around lips, mouth, or nail beds',
      'Nasal flaring or rhythmic head bobbing with breaths in an infant',
      'Child cannot speak, cry, or nurse because they cannot catch their breath',
    ],
    yellowFlags: [
      'Breathing noticeably faster than normal (respiratory rate > 50 breaths/min in infant, > 40 in toddler)',
      'Persistent wheezing or rattling in chest that does not clear after gentle nasal suctioning',
      'Fluid intake reduced by 50% due to nasal congestion and labored breathing',
      'Persistent cough interfering with sleep for more than 4 consecutive nights',
    ],
    greenHomeCare: [
      'Saline nasal drops (2-3 drops per nostril) followed by gentle bulb or nasal aspirator suctioning before feeds and sleep',
      'Run a cool-mist humidifier in the child bedroom near the crib',
      'Keep infant upright or elevate caregiver chest during contact naps to ease diaphragmatic excursion',
      'Offer smaller, more frequent milk feeds to avoid fatiguing the baby',
    ],
    contraindications: [
      'NEVER use OTC decongestants, antihistamines, or medicated chest rubs containing camphor in infants < 2 years',
      'Do NOT prop baby up with loose pillows or sleep positioners in an unsupervised crib (SIDS risk)',
      'Do NOT force large feeds when child is breathing rapidly (aspiration risk)',
    ],
    clinicalAuthority: 'AAP Clinical Practice Guideline: Diagnosis and Management of Bronchiolitis / Barton Schmitt',
  },
  {
    slug: 'croup-barking-cough',
    title: 'Croup & Upper Airway Laryngeal Spasm',
    summary:
      'Acute subglottic swelling triage with distinctive seal-like barking cough and inspiratory stridor management.',
    targetTiers: [
      DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
      DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    ],
    redFlags: [
      'Stridor at REST: high-pitched whistling or squeaking sound when inhaling while calm and resting',
      'Severe suprasternal or tracheal tugging (skin above collarbone pulling inward)',
      'Drooling, inability to swallow own saliva, or leaning forward with mouth open (epiglottitis warning)',
      'Agitation turning into lethargy or cyanosis around mouth',
    ],
    yellowFlags: [
      'Barking cough and mild stridor only when agitated or crying that does not resolve after 15 minutes of cool air',
      'Fever >= 102.0°F with croup symptoms lasting beyond 3 nights',
      'Child sounds hoarse and uncomfortable during daytime',
    ],
    greenHomeCare: [
      'Cool night air: bundle child in a jacket and sit outside in crisp night air for 10-15 minutes',
      'Steam bathroom: sit with child in a closed bathroom filled with steam from a hot shower for 10 minutes',
      'Keep child as calm as possible (crying triples airway resistance and worsens stridor)',
      'Offer cold clear liquids or breastmilk after the spasm settles',
    ],
    contraindications: [
      'Do NOT examine throat with a tongue depressor or spoon (can trigger acute laryngospasm/airway arrest)',
      'Do NOT give cough suppressants or codeine formulations',
    ],
    clinicalAuthority: 'Barton Schmitt Protocols / AAP Pediatric Emergency Medicine',
  },
  {
    slug: 'acute-otitis-media',
    title: 'Acute Otitis Media & Middle Ear Effusion',
    summary:
      'Guidance for unilateral ear pulling, nighttime crying, Eustachian tube dysfunction, and watchful waiting protocols.',
    targetTiers: [
      DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
      DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
      DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    ],
    redFlags: [
      'Redness, tenderness, or swelling behind the ear pushing the outer ear forward (mastoiditis emergency)',
      'Facial nerve weakness: one side of child face drooping when crying or smiling',
      'Blood or thick yellow foul-smelling pus pouring from ear canal with sudden high fever',
      'Severe dizziness, loss of balance, or stiff neck with earache',
    ],
    yellowFlags: [
      'Persistent unilateral ear tugging with fever > 101.0°F for > 24 hours',
      'Child wakes screaming from sleep clutching ear; pain worsens when lying flat',
      'Symptoms persist past 48 hours of initial symptom onset',
      'Child has history of recurrent tympanostomy tube placements and complains of muffled hearing',
    ],
    greenHomeCare: [
      'Warm or cool compress held gently against the affected ear',
      'Weight-based acetaminophen or ibuprofen for pain relief (ear pain is intense at night)',
      'Elevate the head of child bed slightly (or hold child upright during feeds) to reduce middle ear pressure',
      'Offer water or breastmilk frequently; swallowing encourages Eustachian tube drainage',
    ],
    contraindications: [
      'NEVER insert cotton swabs, oils, or ear drops into the ear canal if tympanic membrane rupture or ear tubes are present',
      'Do NOT give leftover oral antibiotics without pediatric pneumatic otoscopic confirmation',
    ],
    clinicalAuthority: 'AAP Clinical Practice Guideline: The Diagnosis and Management of Acute Otitis Media',
  },
  {
    slug: 'pediatric-dehydration-gastroenteritis',
    title: 'Pediatric Dehydration & Viral Gastroenteritis',
    summary:
      'Fluid volume monitoring, oral rehydration therapy (ORT) protocols, and urine output thresholds for stomach illnesses.',
    targetTiers: [
      DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
      DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
      DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
      DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    ],
    redFlags: [
      'No urine output / zero wet diapers in 8+ hours (infant) or 12+ hours (older child)',
      'Child is limp, abnormally sleepy, cannot make eye contact, or cries without tears',
      'Sunken anterior fontanelle (soft spot), dry cracked lips, and deep sunken eyes',
      'Capillary refill time > 3 seconds (skin remains white after pressing fingernail or chest)',
      'Vomit contains bright green bile or coffee-ground dark blood',
    ],
    yellowFlags: [
      'More than 6-8 watery diarrhea stools in 24 hours',
      'Unable to keep down even tiny sips of electrolyte solution for more than 4 consecutive hours',
      'Diarrhea stool contains visible bright red blood or copious mucus',
      'Vomiting persists beyond 24 hours',
    ],
    greenHomeCare: [
      'Oral Rehydration Solution (Pedialyte or generic electrolyte fluid): 5 mL (1 teaspoon) every 5 minutes using a syringe',
      'Do NOT offer plain water in large quantities to infants (risk of hyponatremic seizures)',
      'Resume regular diet (BRAT diet is outdated; offer normal bland starches, yogurt, lean poultry) as tolerated once vomiting halts for 4-6h',
      'Continue breastfeeding on demand',
    ],
    contraindications: [
      'NEVER give anti-diarrheal medications (loperamide/Imodium) to infants or children (risk of toxic megacolon)',
      'Do NOT give undiluted fruit juices, sodas, or sports drinks (high osmolarity worsens diarrhea)',
      'Do NOT withhold food for 24+ hours; early refeeding promotes gut mucosal repair',
    ],
    clinicalAuthority: 'AAP / CDC Guidelines on the Management of Acute Gastroenteritis in Children',
  },
  {
    slug: 'pediatric-rashes-petechiae',
    title: 'High-Acuity Pediatric Rashes, Hives & Petechiae',
    summary:
      'Glass test / blanching assessment distinguishing benign viral exanthems from petechial purpura and anaphylaxis.',
    targetTiers: [
      DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
      DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
      DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
      DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
      DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
      DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    ],
    redFlags: [
      'Petechiae or Purpura: pinpoint red or purple spots that DO NOT BLANCH (fade) when pressed firmly with a clear drinking glass (Meningococcemia alert)',
      'Hives accompanied by facial swelling, lip/tongue puffiness, vomiting, or wheezing (Anaphylaxis - call 911 / use EpiPen)',
      'Rash looks like boiling water scald (skin peeling or sloughing off)',
      'Rash accompanied by extreme lethargy and high fever',
    ],
    yellowFlags: [
      'Spreading bright red rash that is hot to touch, swollen, and tender (suspected cellulitis)',
      'Bulls-eye target rash expanding outwards (suspected Lyme disease)',
      'Honey-colored crusting blisters around nose and mouth (impetigo requiring topical antibiotics)',
      'Hives that persist for more than 48 hours without respiratory compromise',
    ],
    greenHomeCare: [
      'Viral exanthems (e.g., Roseola, fifth disease): supportive care; rash usually appears as fever breaks and resolves spontaneously',
      'Cool oatmeal baths or calamine lotion for itch relief',
      'Trim child fingernails short to prevent secondary bacterial infection from scratching',
      'Oral cetirizine or diphenhydramine for mild isolated allergic hives (under pediatrician guidance)',
    ],
    contraindications: [
      'Do NOT pop or scratch open blisters or crusted sores',
      'Do NOT apply steroid creams (hydrocortisone) to suspected fungal, herpes, or chickenpox lesions',
    ],
    clinicalAuthority: 'AAP Dermatology Section / Barton Schmitt Triage Standards',
  },
];

export async function seedHealthProtocols(prisma: PrismaClient): Promise<void> {
  console.log(`[Seed] Seeding ${SYMPTOM_PROTOCOLS_SEED.length} canonical Barton Schmitt symptom triage protocols...`);

  for (const item of SYMPTOM_PROTOCOLS_SEED) {
    await prisma.symptomProtocol.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        summary: item.summary,
        targetTiers: item.targetTiers,
        redFlags: item.redFlags,
        yellowFlags: item.yellowFlags,
        greenHomeCare: item.greenHomeCare,
        contraindications: item.contraindications,
        clinicalAuthority: item.clinicalAuthority,
      },
      create: item,
    });
  }

  console.log(`[Seed] Successfully seeded ${SYMPTOM_PROTOCOLS_SEED.length} symptom protocols.`);
}
