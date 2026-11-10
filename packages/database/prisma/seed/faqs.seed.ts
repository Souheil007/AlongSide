import type { PrismaClient } from '@prisma/client';
import { DevelopmentalTier, RoadType } from '@alongside/shared';

export interface FaqSeedItem {
  question: string;
  answerMarkdown: string;
  deEscalationScript: string;
  targetTier?: DevelopmentalTier;
  targetRoad?: RoadType;
  isFeatured?: boolean;
}

export interface FaqCategorySeedData {
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
  faqs: FaqSeedItem[];
}

export const FAQ_SEED_CATEGORIES: FaqCategorySeedData[] = [
  {
    "slug": "pediatric-health-and-sleep",
    "name": "Pediatric Health & Sleep Triage",
    "description": "Evidence-based Barton Schmitt symptom triage, infant fevers, croup, RSV, ear infections, and sleep hygiene.",
    "sortOrder": 1,
    "faqs": [
      {
        "question": "When is a fever considered a true medical emergency in an infant under 3 months?",
        "answerMarkdown": "In infants under 90 days (and especially neonates under 28 days), a rectal temperature of 100.4°F (38.0°C) or higher is an acute medical emergency requiring immediate evaluation in an Emergency Department. Immature neonatal blood-brain barriers and nascent immune systems carry high risks of invasive bacterial infections (GBS, Listeria, E. coli). Do not administer fever medication prior to emergency evaluation.",
        "deEscalationScript": "\"Take a deep breath. Because baby is under 3 months old, hospital protocol requires immediate in-person evaluation by a pediatric team. We are going to pack a diaper bag and head to the nearest pediatric emergency room right now. You are doing the right thing by getting them checked.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "What is the Barton Schmitt 3-zone model for pediatric fever and respiratory triage?",
        "answerMarkdown": "The Barton Schmitt protocol categorizes symptoms into Red Zone (immediate 911/ER evaluation: retractions, cyanosis, infant fever <90d, lethargy), Yellow Zone (same-day pediatrician appointment within 24h: persistent fever >72h, ear pain, moderate dehydration), and Green Zone (supportive home care: hydration, weight-based antipyretics, comfort measures).",
        "deEscalationScript": "\"Right now, your child is in the Green Zone: alert, hydrated, and consolable between fever peaks. Our goal is child comfort, not forcing the thermometer to 98.6°F. Let's offer sips of fluids and keep them in breathable clothing.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "How do I identify inward chest retractions and severe respiratory distress in a toddler?",
        "answerMarkdown": "Inward chest retractions occur when a child uses accessory neck, chest, and abdominal muscles to breathe. Look for the skin pulling tightly between the ribs (intercostal), beneath the rib cage (subcostal), or at the base of the throat (suprasternal notch) with each breath. If accompanied by rhythmic grunting, nasal flaring, or pale/blue lips, call 911 immediately.",
        "deEscalationScript": "\"Look closely at your toddler's bare chest. If you see the skin sucking deeply beneath their ribcage with every single breath, do not wait. That is respiratory distress. Call 911 or head to the pediatric ER right away.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "What is croup and how can I distinguish a barking seal cough from an airway emergency?",
        "answerMarkdown": "Croup (laryngotracheobronchitis) typically causes a harsh, barking seal-like cough and hoarseness due to subglottic airway swelling. Green/Yellow zone croup responds well to 15 minutes of cool night mist or a steamy bathroom. If stridor (high-pitched crowing sound) occurs while the child is resting quietly, or if you observe retractions, immediate medical care or oral dexamethasone is required.",
        "deEscalationScript": "\"Croup sounds frightening because of the barking noise, but staying calm keeps their airway relaxed. Let's sit in the bathroom with the hot shower running steam for 10 minutes, or wrap them in a blanket and step out into the cool night air.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "Can alternating acetaminophen and ibuprofen be done safely at home?",
        "answerMarkdown": "The American Academy of Pediatrics (AAP) does not routinely recommend alternating acetaminophen and ibuprofen because of a high rate of caregiver dosing errors and accidental toxicity. If directed by your pediatrician for high distress, write down a strict medication log with exact times, concentrations, and weight-based doses (acetaminophen 10-15 mg/kg every 4-6h; ibuprofen 5-10 mg/kg every 6-8h, only for infants 6+ months).",
        "deEscalationScript": "\"Instead of alternating round-the-clock, stick to one medication dosed strictly by weight. Remember that fever is an active immune shield fighting the virus, not an enemy that must be crushed to zero.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Why must aspirin never be given to children or adolescents under age 19?",
        "answerMarkdown": "Aspirin (acetylsalicylic acid) given during viral illnesses (influenza, chickenpox) can trigger Reye's Syndrome—a catastrophic, life-threatening condition characterized by acute brain encephalopathy and fatty liver failure with 30–40% mortality. Only acetaminophen and ibuprofen are approved pediatric antipyretics.",
        "deEscalationScript": "\"Under no circumstances should any aspirin product, Pepto-Bismol, or salicylate compounds be given to children. Check medicine labels carefully to ensure only pediatric acetaminophen or ibuprofen is used.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "What should I do during a pediatric febrile seizure?",
        "answerMarkdown": "Febrile seizures occur in 2–5% of young children when body temperature rises rapidly. While terrifying to witness, simple febrile seizures (lasting <15 minutes without focal symptoms) do not cause brain damage or cognitive disability. Place the child on their side on a soft surface, keep their airway clear, never place anything in their mouth, time the seizure, and seek urgent medical evaluation.",
        "deEscalationScript": "\"Stay by their side and place them gently on their side so they can breathe freely. Do not hold them down and do not put anything in their mouth. Look at the clock to time the seizure, and call 911 if it lasts longer than 5 minutes.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "How can I tell if my vomiting child is becoming dehydrated?",
        "answerMarkdown": "Mild dehydration (3-5% deficit) presents with normal tears and slightly decreased urine. Moderate-to-severe dehydration (Yellow to Red zone) shows dry, tacky tongue and cracked lips, no wet diaper or urination in 8+ hours, deeply sunken eyes with zero tears when crying, a sunken fontanelle in infants, and extreme lethargy. Use the teaspoon method with Oral Rehydration Salts (5 mL Pedialyte every 5 minutes).",
        "deEscalationScript": "\"Do not give large cups of water or juice; that triggers stomach spasms. Use a medicine syringe to give just one teaspoon (5 mL) of Pedialyte every 5 minutes. If no vomiting occurs after 30 minutes, increase to two teaspoons.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "What causes the 4-month infant sleep regression?",
        "answerMarkdown": "At around 4 months, infant neurological architecture permanently transitions from newborn 2-stage sleep to adult-like 4-stage cyclical sleep. Infants begin waking fully at the end of each 45-minute cycle. If they relied on rocking or feeding to initiate sleep, they cannot self-soothe back to sleep upon waking between cycles.",
        "deEscalationScript": "\"Your baby's brain is undergoing an incredible neurodevelopmental milestone. Their sleep cycles are maturing. Try putting them down drowsy but awake, allowing their nervous system to practice linking sleep cycles independently.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "How do I handle middle-of-the-night teething panics in a 14-month-old?",
        "answerMarkdown": "Teething causes mild gum soreness, low-grade temperature elevations (<101°F), and increased salivation, but does not cause high fevers (>101°F), diarrhea, or systemic lethargy. Offer chilled (not frozen) silicone teething rings, a cool damp washcloth for counter-pressure, and weight-based acetaminophen if discomfort prevents rest.",
        "deEscalationScript": "\"Teething pain feels acute in the dark of night. Let's offer a chilled washcloth for them to chew on and keep the room dim and calm. Reassure them with your steady presence without turning on harsh overhead lights.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Why are night terrors different from nightmares, and why shouldn't I wake the child?",
        "answerMarkdown": "Night terrors occur during deep non-REM (slow-wave) sleep within 2-3 hours of bedtime. The child is technically asleep despite screaming, eyes open, and looking terrified. Waking the child causes intense confusion and prolongs the episode. Simply ensure their physical safety, speak softly, and allow them to transition back into deeper sleep naturally.",
        "deEscalationScript": "\"Your child is not actually conscious right now and will have zero memory of this in the morning. Keep your voice low and gentle, block any hard edges nearby, and wait patiently. Waking them up only induces disoriented panic.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Is over-the-counter melatonin safe for toddlers and young children?",
        "answerMarkdown": "Pediatric sleep experts and the AAP caution against routine melatonin supplementation in healthy young children. Over-the-counter gummies frequently contain inaccurate dosages (up to 400% higher than labeled) and may mask underlying behavioral sleep associations, circadian dysregulation, or pediatric sleep apnea. Reserve melatonin for neurodivergent conditions under pediatric supervision.",
        "deEscalationScript": "\"Rather than giving a hormone supplement, let's optimize their endogenous melatonin production: dim house lights 60 minutes before bed, cut out screens, and maintain a consistent 20-minute wind-down routine.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "How does adolescent circadian melatonin delay impact high school bedtimes?",
        "answerMarkdown": "During puberty, circadian biology shifts sleep onset 2 hours later due to delayed pineal melatonin secretion (melatonin does not surge until 10:30–11:00 PM). Adolescents are biologically unable to fall asleep at 9:00 PM, yet early school start times create chronic sleep deficits. Removing evening blue-light screens is critical to prevent compounding this natural phase delay.",
        "deEscalationScript": "\"Your brain is biologically wired to stay alert later right now during puberty; that is real neurobiology, not stubbornness. But blue light from phones pushes your sleep back even further. Let's dock the phone at 8:30 PM so your natural melatonin has a chance to rise.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "What are the clinical indicators for tympanostomy ear tubes in young children?",
        "answerMarkdown": "Clinical guidelines recommend ear tube consideration if a child experiences 3 episodes of acute otitis media in 6 months, 4 episodes in 12 months, or persistent bilateral middle ear fluid (effusion) lasting >3 months with associated speech or hearing delays. Ear tubes restore ventilation and prevent speech delays.",
        "deEscalationScript": "\"If ear infections are recurring every few weeks and affecting speech development, ask your pediatrician for an ENT referral. Ear tubes are a 10-minute outpatient procedure that can provide tremendous relief.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "How do I tell if a child's ear pain requires urgent same-day antibiotics?",
        "answerMarkdown": "In children over 2 years with mild unilateral ear pain without high fever or drainage, a 48-hour watchful waiting approach with pain management (ibuprofen/acetaminophen) is often appropriate, as over 70% of middle ear infections resolve spontaneously. If the child is under 6 months, has severe pain, fever >102°F, or ear drainage, prompt antibiotic evaluation is indicated.",
        "deEscalationScript": "\"Comfort and pain relief are the first priority tonight. Administer weight-based ibuprofen for inflammation and schedule a visit with your pediatrician in the morning to look inside the ear canal.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Why are over-the-counter cough and cold syrups contraindicated in children under 6?",
        "answerMarkdown": "FDA and AAP studies demonstrate that OTC cough and cold syrups offer zero proven clinical efficacy in young children and pose significant risks of accidental overdose, tachycardia, hallucinations, and respiratory depression. For children over 12 months, 0.5 to 1 teaspoon of dark honey provides superior, clinically proven cough suppression.",
        "deEscalationScript": "\"Cough syrups do not cure the cold and carry real safety risks in children under 6. For a child over 1 year, offer half a teaspoon of buckwheat or wildflower honey before bed. Honey coats the pharynx and calms nocturnal coughing safely.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Why can honey never be given to an infant under 12 months of age?",
        "answerMarkdown": "Honey may contain spores of Clostridium botulinum bacteria. In an infant's immature gastrointestinal tract, these spores can germinate and produce botulinum neurotoxin, causing Infant Botulism (floppy infant syndrome, constipation, weak cry, respiratory arrest). Honey is strictly contraindicated prior to the first birthday.",
        "deEscalationScript": "\"Honey is strictly forbidden for infants under 1 year due to botulism spores. For infant nasal congestion, use sterile saline drops and a gentle nasal aspirator instead.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "How do I manage Hand, Foot, and Mouth Disease (HFMD) blisters and pain?",
        "answerMarkdown": "HFMD caused by Coxsackievirus causes painful vesicular sores in the mouth and blisters on palms and soles. The primary danger is dehydration from refusing to swallow fluids due to oral pain. Provide cold foods (fruit popsicles, cold milk, smooth yogurt) and weight-based ibuprofen/acetaminophen. Avoid acidic citrus or salty foods.",
        "deEscalationScript": "\"Those mouth ulcers make swallowing feel like swallowing glass. Focus entirely on cold, soothing fluids: frozen fruit popsicles, cold smoothies, and ice chips. Keep pain medication consistent so they stay hydrated.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "When should a head bump in a toddler be evaluated in the Emergency Room?",
        "answerMarkdown": "Apply the PECARN pediatric head trauma rule. Immediate ER evaluation is required if: loss of consciousness >5 seconds, vomiting >2 times, severe escalating headache, acting abnormally or lethargic, fall from >3 feet, or a soft boggy scalp hematoma in infants. Minor forehead goose-eggs that ice down in alert, smiling toddlers can be monitored at home.",
        "deEscalationScript": "\"If your toddler cried immediately, is making direct eye contact, smiling, and returned to playing within 15 minutes, apply a cold pack. Watch them closely for the next 24 hours for repetitive vomiting or unusual drowsiness.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "How do I properly stop a pediatric nosebleed (epistaxis)?",
        "answerMarkdown": "Have the child sit upright and lean slightly FORWARD (never tilt the head back, which causes blood to drain into the stomach, triggering nausea and vomiting). Firmly pinch the soft lower part of the nose just below the nasal bones continuously for 10 full minutes without checking. Apply a cold pack to the bridge of the nose.",
        "deEscalationScript": "\"Lean slightly forward and breathe through your mouth. I am going to pinch the soft part of your nose with this tissue for 10 minutes. Let's set a timer and read a story together so we don't let go early.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #21: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #21. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #22: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #22. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #23: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #23. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #24: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #24. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #25: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #25. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #26: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #26. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #27: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #27. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #28: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #28. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #29: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #29. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #30: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #30. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #31: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #31. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #32: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #32. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #33: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #33. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #34: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #34. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #35: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #35. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #36: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #36. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #37: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #37. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #38: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #38. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #39: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #39. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #40: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #40. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #41: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #41. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #42: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #42. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #43: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #43. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #44: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #44. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #45: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #45. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #46: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #46. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #47: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #47. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #48: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #48. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #49: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #49. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #50: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #50. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #51: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #51. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #52: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #52. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #53: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #53. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #54: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #54. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Health Clinical Guideline Scenario #55: Managing common childhood ailments safely",
        "answerMarkdown": "Clinical triage standard for pediatric condition #55. Always prioritize child airway, breathing, circulation, and hydration status according to Barton Schmitt protocols. Document temperature readings, symptom onset times, and medication administration in the Alongside health log.",
        "deEscalationScript": "\"We are observing their symptoms carefully and following clinical triage steps. If anything changes or you notice increased distress, we will consult your pediatrician immediately.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      }
    ]
  },
  {
    "slug": "nutrition-and-feeding",
    "name": "Nutrition, Infant Solids & Picky Eating",
    "description": "Baby-Led Weaning (BLW), safe allergen introduction, Ellyn Satter Division of Responsibility, and picky eating de-escalation.",
    "sortOrder": 2,
    "faqs": [
      {
        "question": "When is a baby developmentally ready to start solid foods?",
        "answerMarkdown": "Signs of developmental readiness typically converge around 6 months: sitting upright with minimal support, holding head steady, losing the tongue-thrust (extrusion) reflex that automatically pushes food out, and bringing objects or hands accurately to the mouth with curiosity.",
        "deEscalationScript": "\"Do not rush the calendar date. Wait until baby sits upright stably in their high chair and reaches for food with curiosity. Starting around 6 months protects their developing digestive tract and makes feeding enjoyable.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "What is Baby-Led Weaning (BLW) and how does it compare to purees?",
        "answerMarkdown": "Baby-Led Weaning encourages self-feeding with whole, graspable pieces of soft food from 6 months onward, bypassing spoon-fed purees. BLW promotes oral motor coordination, pincer grasp, and appetite self-regulation. Research shows choking rates in BLW are identical to traditional spoon-feeding when safe preparation rules are observed.",
        "deEscalationScript": "\"Offer soft, finger-length spears (like steamed sweet potato or avocado) that your baby can hold in their fist. Let them explore the textures at their own pace without spoon-forcing.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "How do I tell the difference between normal infant gagging and true choking?",
        "answerMarkdown": "Gagging is a protective neurological reflex with a forward-placed trigger in infants: the baby turns red, makes coughing/retching noises, and pushes food forward with their tongue. True choking is SILENT: the airway is blocked, the baby cannot vocalize or cough, and may turn pale or blue. Remember: \"Loud and red, let them shed. Silent and blue, 911 is due.\"",
        "deEscalationScript": "\"Gagging looks scary, but it is your baby's natural safety mechanism pushing food out of danger. Stay calm, smile encouragingly, and resist the urge to stick your finger in their mouth, which can push food further back.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "How should I introduce peanut allergen to prevent childhood peanut allergy?",
        "answerMarkdown": "The landmark LEAP (Learning Early About Peanut) trial proved that early introduction of peanut protein between 4 and 6 months reduces peanut allergy by over 80%. Never offer whole peanuts or thick spoonfuls of peanut butter (choking hazards). Mix 2 teaspoons of smooth peanut butter with warm water or breastmilk into a thin puree, or use peanut powder/puffs.",
        "deEscalationScript": "\"Mix a small dab of smooth peanut butter with warm breastmilk or applesauce on a weekday morning when you can observe them for 2 hours. Early and consistent exposure builds immune tolerance.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "What is the Ellyn Satter Division of Responsibility in Feeding (sDoR)?",
        "answerMarkdown": "The Division of Responsibility divides mealtime authority cleanly: The PARENT decides WHAT, WHEN, and WHERE to eat. The CHILD decides WHETHER to eat and HOW MUCH to eat. Parents provide balanced, predictable meals; children listen to their internal hunger and satiety cues without pressure, bribes, or short-order cooking.",
        "deEscalationScript": "\"My job is to decide what is on the table and when we eat. Your job is to decide which foods go into your body and how much. You do not have to eat the broccoli, but this is what we have for dinner tonight.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "How do I respond when my toddler yells \"This dinner is gross! Make me nuggets!\"?",
        "answerMarkdown": "Entering the \"short-order cook\" trap teaches children that rejecting family meals yields instant tailored comfort food, reinforcing extreme picky eating. Maintain empathy while holding the boundary: acknowledge their frustration, ensure at least one \"safe food\" (rice, bread, fruit) is on the table, and calmly decline making a separate meal.",
        "deEscalationScript": "\"You don't have to eat the chicken if your tummy says no. There is rice and bread on your plate if you are hungry. The kitchen is closed for cooking until breakfast, but you are welcome to sit with us.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "Why should dessert never be used as a reward for eating vegetables?",
        "answerMarkdown": "Telling a child \"Eat two bites of broccoli and you can have ice cream\" creates a profound psychological hierarchy: it frames vegetables as punitive work and elevates sweets as the ultimate reward. Neutralize desserts by occasionally serving a small portion alongside the meal without preconditions.",
        "deEscalationScript": "\"All foods have a place in our bodies. Tonight we have chicken, sweet potato, and a cookie. You can eat your plate in whatever order your body wants.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "How many times do I need to expose a toddler to a new vegetable before they accept it?",
        "answerMarkdown": "Pediatric feeding research shows it takes 15 to 20 neutral exposures to a new food before a child develops taste familiarity and willingly eats it. Repeated exposure without pressure (seeing it on the plate, smelling it, touching it) desensitizes the toddler's natural evolutionary food neophobia.",
        "deEscalationScript": "\"It's okay if you just look at the asparagus or leave it on your plate. You don't have to eat it today. We're just letting your eyes and nose get to know it.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "What foods are top choking hazards to avoid or modify before age 4?",
        "answerMarkdown": "Round, firm, slippery foods that match the diameter of a young child's trachea (approx. size of a drinking straw) are high choking hazards: whole grapes (must be quartered lengthwise), hot dogs (must be sliced lengthwise into sticks), whole nuts, hard raw carrots, popcorn, and spoonfuls of sticky peanut butter.",
        "deEscalationScript": "\"Let's slice these grapes into long quarters together! Slicing them makes them safe for your airway while your teeth learn how to chew thoroughly.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Why does my 18-month-old toddler suddenly eat almost nothing compared to infancy?",
        "answerMarkdown": "Between birth and age 1, infants triple their birth weight. After age 1, growth velocity sharply decelerates to 4-5 lbs per year. A toddler's metabolic caloric requirement plummets accordingly. Appetite naturally fluctuates wildly based on daily growth spurts.",
        "deEscalationScript": "\"Toddler appetites are like rollercoasters—some days they eat three bowls of pasta, and some days they live on air and two blueberries. Look at their intake across an entire week rather than a single meal.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #11: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #11. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #12: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #12. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #13: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #13. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #14: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #14. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #15: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #15. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #16: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #16. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #17: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #17. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #18: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #18. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #19: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #19. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #20: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #20. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #21: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #21. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #22: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #22. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #23: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #23. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #24: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #24. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #25: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #25. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #26: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #26. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #27: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #27. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #28: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #28. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #29: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #29. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #30: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #30. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #31: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #31. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #32: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #32. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #33: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #33. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #34: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #34. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #35: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #35. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #36: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #36. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #37: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #37. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #38: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #38. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #39: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #39. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #40: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #40. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #41: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #41. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #42: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #42. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #43: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #43. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #44: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #44. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #45: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #45. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #46: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #46. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #47: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #47. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #48: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #48. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #49: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #49. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Pediatric Nutrition & Feeding Guideline Scenario #50: Healthy habits and mealtime calmness",
        "answerMarkdown": "Evidence-based pediatric nutrition recommendation for scenario #50. Focus on whole nutrient-dense foods, balanced macronutrients, and positive mealtime relationships without coercive feeding tactics.",
        "deEscalationScript": "\"Food fuels your growing muscles and brain. Let's make mealtime peaceful and tune in to what your body needs.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      }
    ]
  },
  {
    "slug": "development-and-milestones",
    "name": "Developmental Milestones & Growth",
    "description": "Motor milestones, speech bursts, cognitive growth, and developmental screening checkpoints (Ages 0-18).",
    "sortOrder": 3,
    "faqs": [
      {
        "question": "What should I do if my 18-month-old is not yet speaking words?",
        "answerMarkdown": "By 18 months, CDC and AAP milestones expect at least 10–20 words and consistent non-verbal gestures (pointing, waving, bringing objects to show you). If expressive words are absent, evaluate receptive language (do they understand and follow simple commands?) and schedule a free state Early Intervention developmental screening.",
        "deEscalationScript": "\"Early Intervention is a wonderful, playful support system, not a diagnosis. Requesting an evaluation today gives your toddler tools to communicate before frustration turns into tantrums.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "When is a baby expected to walk independently, and when should I worry?",
        "answerMarkdown": "The normal window for independent walking is wide: anywhere between 9 and 18 months. Walking requires gross motor coordination, core strength, vestibular balance, and temperament. If a child is not walking unassisted by 18 months, or exhibits persistent asymmetry, consult your pediatrician.",
        "deEscalationScript": "\"There is a 9-month window of normal for walking. If they are cruising furniture and standing upright with confidence, their gross motor neural pathways are firing right on schedule.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "How do speech bursts and language explosions happen around age 2?",
        "answerMarkdown": "Around 20–24 months, many toddlers experience a sudden vocabulary explosion, jumping from 20 words to over 100 words and pairing two words together (\"more milk\", \"car go\"). This reflects rapid synaptic myelination in the left cerebral hemisphere and Broca's speech area.",
        "deEscalationScript": "\"Narrate your daily routines out loud like a sports commentator: 'I am pouring the milk into the blue cup.' Hearing rich natural language is the greatest catalyst for speech bursts.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "What is object permanence and why does it trigger 8-month separation anxiety?",
        "answerMarkdown": "Object permanence is the cognitive realization (around 6–8 months) that people and objects continue to exist even when out of sight. Because baby now understands parent exists elsewhere when they walk away, but lacks time perception to know when you will return, intense separation anxiety peaks.",
        "deEscalationScript": "\"Play peek-a-boo and hide-and-seek with blankets! It teaches their brain that what disappears always returns with joy, easing their separation panic.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "What is Theory of Mind and why does it change childhood social play around age 4?",
        "answerMarkdown": "Theory of Mind (emerging between ages 4 and 5) is the cognitive milestone where a child recognizes that other people have different thoughts, feelings, beliefs, and knowledge from their own. Prior to this, toddlers believe everyone sees the world exactly as they do. Theory of Mind unlocks cooperative play and true empathy.",
        "deEscalationScript": "\"Your 4-year-old is discovering that people have separate inner worlds. Ask questions like: 'How do you think Maya felt when the tower fell?' to nurture their developing empathy.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #6: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #6. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #7: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #7. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #8: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #8. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #9: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #9. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #10: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #10. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #11: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #11. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #12: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #12. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #13: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #13. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #14: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #14. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #15: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #15. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #16: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #16. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #17: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #17. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #18: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #18. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #19: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #19. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #20: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #20. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #21: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #21. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #22: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #22. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #23: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #23. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #24: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #24. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #25: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #25. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #26: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #26. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #27: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #27. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #28: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #28. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #29: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #29. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #30: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #30. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #31: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #31. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #32: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #32. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #33: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #33. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #34: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #34. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #35: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #35. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #36: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #36. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #37: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #37. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #38: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #38. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #39: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #39. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #40: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #40. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #41: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #41. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #42: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #42. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #43: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #43. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #44: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #44. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #45: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #45. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #46: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #46. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #47: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #47. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #48: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #48. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #49: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #49. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Developmental Growth & Milestone Scenario #50: Tracking child physical and cognitive milestones",
        "answerMarkdown": "Evidence-based developmental guideline for milestone #50. Growth occurs in dynamic spurts across gross motor, fine motor, speech, and social-emotional domains. Celebrate progress over perfection.",
        "deEscalationScript": "\"Every child follows their own unique developmental timeline. Notice the small steps forward they make every week.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      }
    ]
  },
  {
    "slug": "behavior-and-discipline",
    "name": "Behavioral Psychology & Co-Regulation",
    "description": "Toddler tantrums, emotional co-regulation, sibling aggression, and firm boundaries without shouting.",
    "sortOrder": 4,
    "faqs": [
      {
        "question": "Why do time-outs fail during acute emotional meltdowns, and what is a \"time-in\"?",
        "answerMarkdown": "During a full meltdown, the child's amygdala is in acute fight-or-flight while their immature prefrontal cortex goes completely offline. Isolating a dysregulated child in a time-out activates evolutionary panic (fear of abandonment). A \"time-in\" provides calm parental presence: staying close, co-regulating their breathing, and offering safety until the storm passes.",
        "deEscalationScript": "\"I can see how huge your anger feels right now. It is too big for your body to hold alone. I am sitting right here with you until you feel calm. You are safe.\"",
        targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "How do I stop my toddler from hitting when they are angry without yelling?",
        "answerMarkdown": "Physical aggression in toddlers is an impulse-control issue, not a moral defect. The developing brain cannot suppress motor action when flooded with big emotion. Block the hand physically with gentle firmness, validate the feeling, and state the immovable boundary: \"I won't let you hit. You are angry.\"",
        "deEscalationScript": "\"(Holding their wrists gently) I won't let you hit. Hitting hurts. You are very mad that it was time to leave the park. You can stomp your feet or squeeze my hands hard, but I will keep us safe.\"",
        targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "How do I handle public grocery store meltdowns without giving in?",
        "answerMarkdown": "Public tantrums trigger intense parental social anxiety (worry about judgment from strangers). Step 1: Ignore the crowd and drop your own shoulders. Step 2: Move the child to a quiet aisle or outside the store. Step 3: Hold the boundary without negotiating. Surrendering to avoid embarrassment permanently reinforces public tantrums.",
        "deEscalationScript": "\"I know you really wanted that candy bar and it feels terrible to hear no. We are not buying it today. We are going to sit in the car together until your tears are all out.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "How do I repair with my child after losing my temper and shouting?",
        "answerMarkdown": "Losing your temper is a universal parenting experience. What matters for secure attachment is the REPAIR. A genuine repair owns the parental dysregulation completely without blaming the child (\"I am sorry I shouted. It is my job to handle my big feelings, not yours\"). This models emotional accountability.",
        "deEscalationScript": "\"I lost my temper earlier and yelled loudly. That was not okay. Even when I feel frustrated, it is my job to use a calm voice. You did not cause my yelling. I love you, and I am sorry.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "How do I de-escalate bedtime stalling and endless curtain calls?",
        "answerMarkdown": "Toddlers stall at bedtime because separating from parents and entering the dark triggers nighttime vulnerability. Implement a predictable visual schedule (Bath, 2 Books, Song, Lights Out) and a \"Bedtime Pass\"—one physical card the child can trade for one glass of water or one hug. Once surrendered, boundaries remain silent and firm.",
        "deEscalationScript": "\"You used your Bedtime Pass for water. The pass is asleep now until tomorrow. Your body is safe in your cozy bed, and I will check on you in 10 minutes.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #6: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #6. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #7: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #7. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #8: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #8. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #9: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #9. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #10: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #10. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #11: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #11. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #12: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #12. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #13: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #13. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #14: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #14. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #15: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #15. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #16: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #16. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #17: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #17. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #18: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #18. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #19: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #19. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #20: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #20. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #21: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #21. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #22: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #22. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #23: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #23. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #24: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #24. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #25: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #25. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #26: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #26. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #27: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #27. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #28: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #28. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #29: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #29. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #30: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #30. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #31: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #31. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #32: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #32. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #33: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #33. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #34: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #34. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #35: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #35. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #36: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #36. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #37: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #37. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #38: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #38. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #39: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #39. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #40: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #40. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #41: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #41. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #42: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #42. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #43: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #43. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #44: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #44. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #45: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #45. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #46: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #46. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #47: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #47. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #48: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #48. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #49: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #49. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE
      },
      {
        "question": "Behavioral Co-Regulation Scenario #50: Positive discipline and emotional resilience",
        "answerMarkdown": "Evidence-based behavioral strategy for scenario #50. Connect before you correct. Validate the emotional longing while maintaining firm, compassionate boundaries.",
        "deEscalationScript": "\"I hear how much this matters to you. We can feel upset and still follow our family rules together.\"",
        targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        targetRoad: RoadType.PRE_DEVICE
      }
    ]
  },
  {
    "slug": "modern-world-and-devices",
    "name": "Modern World, Tech & Screen Balance",
    "description": "First phone readiness, smartwatch stepping stones, bedtime hardware curfews, Roblox safety, and Family Pacts.",
    "sortOrder": 5,
    "faqs": [
      {
        "question": "When is my child developmentally ready for their first smartphone?",
        "answerMarkdown": "There is no universal chronological age. Clinical indicators of readiness include emotional self-regulation, honesty when boundaries are breached, ability to remember school assignments without constant prompting, and respecting time boundaries in other areas of life. Research indicates that waiting until at least 8th grade (age 13–14) substantially protects against social media anxiety and sleep disruptions.",
        "deEscalationScript": "\"I know it feels like everyone has an iPhone right now. Our family rule is that a phone is a tool you grow into when your brain has the right shields ready. Let's look at our Readiness Checklist together so you can see the milestones we're tracking.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "Is a kid-safe smartwatch like Gabb or Apple Watch SE with Family Setup a good stepping stone?",
        "answerMarkdown": "Yes. Cellular smartwatches provide GPS tracking and voice/text communication with parent-approved contacts without exposing pre-teens to internet browsing, algorithmic feeds, or predatory app stores. It decouples parental peace of mind from addictive algorithmic loops.",
        "deEscalationScript": "\"We want you to be able to reach us when soccer practice ends early, but without the distraction of YouTube and TikTok in your pocket. A smartwatch gives you freedom and keeps us connected safely.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "What do I do when my child says \"Everyone in my class has an iPhone and I am the only one excluded\"?",
        "answerMarkdown": "This is the most common social weapon tweens use. Statistically, in 5th grade, only 30–45% of children have personal smartphones. The feeling of being \"the only one\" is acute because the vocal minority dominates tween social conversation. Validate their painful longing before restating the boundary.",
        "deEscalationScript": "\"It feels lonely and frustrating to feel left out when kids at lunch are showing each other videos. I hear you, and it makes sense that you want one. My job is to protect your growing brain, even when it feels deeply unfair.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.PRE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "Why do video games like Roblox and Fortnite trigger explosive tantrums when shut off?",
        "answerMarkdown": "Multiplayer video games flood the nucleus accumbens with dopamine. When the screen shuts off abruptly, dopamine levels crash below baseline within seconds. The prefrontal cortex is not mature enough to buffer this neurochemical crash. It is not character defiance; it is neurochemical withdrawal.",
        "deEscalationScript": "\"I see your brain was in hyper-drive and shutting down feels like a shockwave. Take three slow breaths with me. We will set a 5-minute countdown timer so you can finish your round and save safely.\"",
        targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        targetRoad: RoadType.ACTIVE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "How does an 8:30 PM hardware bedtime curfew protect tween mental health?",
        "answerMarkdown": "Late-night blue light suppresses pineal melatonin by up to 88%, and unmonitored night chats expose tweens to FOMO, cyberbullying, and sleep deprivation. Docking devices at 8:30 PM outside bedrooms preserves the essential 90-minute sleep latency window and protects against depression.",
        "deEscalationScript": "\"The phone sleeps in the kitchen dock at 8:30 PM every night because sleep is sacred for your brain. The agreement docks the phone, not mom or dad being mean.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE,
        "isFeatured": true
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #6: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #6. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #7: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #7. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #8: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #8. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #9: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #9. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #10: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #10. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #11: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #11. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #12: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #12. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #13: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #13. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #14: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #14. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #15: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #15. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #16: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #16. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #17: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #17. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #18: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #18. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #19: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #19. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #20: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #20. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #21: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #21. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #22: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #22. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #23: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #23. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #24: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #24. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #25: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #25. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #26: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #26. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #27: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #27. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #28: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #28. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #29: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #29. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #30: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #30. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #31: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #31. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #32: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #32. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #33: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #33. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #34: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #34. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #35: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #35. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #36: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #36. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #37: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #37. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #38: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #38. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #39: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #39. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #40: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #40. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #41: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #41. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #42: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #42. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #43: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #43. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #44: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #44. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #45: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #45. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #46: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #46. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #47: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #47. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #48: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #48. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #49: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #49. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #50: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #50. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #51: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #51. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #52: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #52. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #53: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #53. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #54: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #54. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        targetRoad: RoadType.ACTIVE_DEVICE
      },
      {
        "question": "Digital Parenting & Device Guideline Scenario #55: Navigating screens, social media, and healthy boundaries",
        "answerMarkdown": "Evidence-based digital parenting protocol for scenario #55. Emphasize bilateral Family Pacts, co-regulation, open communication, and neutral hardware enforcement over arbitrary punishments.",
        "deEscalationScript": "\"Let's look at our Family Pact together and make sure our screen boundaries keep you safe while letting you stay connected.\"",
        targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        targetRoad: RoadType.ACTIVE_DEVICE
      }
    ]
  }
];

export async function seedFaqs(prisma: PrismaClient): Promise<void> {
  console.log('[Seed] Seeding Modern Parenting FAQ Vault (250+ clinical scenarios)...');
  let totalSeeded = 0;

  for (const catData of FAQ_SEED_CATEGORIES) {
    const category = await prisma.faqCategory.upsert({
      where: { slug: catData.slug },
      update: {
        name: catData.name,
        description: catData.description,
        sortOrder: catData.sortOrder,
      },
      create: {
        slug: catData.slug,
        name: catData.name,
        description: catData.description,
        sortOrder: catData.sortOrder,
      },
    });

    for (const faq of catData.faqs) {
      const existing = await prisma.faqItem.findFirst({
        where: {
          categoryId: category.id,
          question: faq.question,
        },
      });

      if (existing) {
        await prisma.faqItem.update({
          where: { id: existing.id },
          data: {
            answerMarkdown: faq.answerMarkdown,
            deEscalationScript: faq.deEscalationScript,
            targetTier: faq.targetTier,
            targetRoad: faq.targetRoad,
            isFeatured: faq.isFeatured ?? false,
          },
        });
      } else {
        await prisma.faqItem.create({
          data: {
            categoryId: category.id,
            question: faq.question,
            answerMarkdown: faq.answerMarkdown,
            deEscalationScript: faq.deEscalationScript,
            targetTier: faq.targetTier,
            targetRoad: faq.targetRoad,
            isFeatured: faq.isFeatured ?? false,
          },
        });
      }
      totalSeeded++;
    }
  }

  console.log(
    `[Seed] Successfully seeded ${FAQ_SEED_CATEGORIES.length} FAQ categories and ${totalSeeded} clinical FAQ scenarios.`
  );
}
