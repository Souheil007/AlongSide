import {
  NutritionStage,
  type NutritionGuideDTO,
  type AllergenScheduleItemDTO,
  type ChokingHazardDTO,
} from '@alongside/shared';
import { apiClient } from './client';

export const CANONICAL_NUTRITION_GUIDES: NutritionGuideDTO[] = [
  {
    stage: NutritionStage.MILK_ONLY,
    stageName: 'Stage 1: Exclusive Liquid Nourishment',
    ageRange: '0–6 Months',
    title: 'The Liquid Foundation: Breastmilk & Infant Formula',
    summary:
      'Exclusive breastmilk or iron-fortified formula supplies 100% of the infant’s fluid and nutrient requirements. The gut mucosal lining is immature and cannot process solids or water before 6 months.',
    keyNutrients: [
      'Docosahexaenoic acid (DHA) for retinal and cortical synaptogenesis',
      'Vitamin D3 (400 IU daily supplementation recommended for breastfed infants)',
      'Lactose & Human Milk Oligosaccharides (HMOs) prebiotic gut flora nourishment',
    ],
    recommendedFoods: [
      'Exclusive breastmilk on demand (8–12 feeds per 24h for newborns)',
      'Iron-fortified infant formula according to standard pediatric reconstitution',
    ],
    foodsToAvoid: [
      {
        food: 'Water & Fruit Juices',
        hazardType: 'HYPONATREMIA_WATER_INTOXICATION',
        mechanism: 'Excess water dilutes infant serum sodium, leading to brain swelling and seizures.',
        strictAgeMonths: 6,
      },
      {
        food: 'Honey (Raw or Cooked)',
        hazardType: 'INFANT_BOTULISM',
        mechanism: 'Clostridium botulinum spores cause flaccid paralysis and respiratory arrest in infants.',
        strictAgeMonths: 12,
      },
      {
        food: 'Whole Cow’s Milk as Beverage',
        hazardType: 'RENAL_OVERLOAD_ANEMIA',
        mechanism: 'High protein and mineral content strains immature infant kidneys and causes micro-intestinal bleeding.',
        strictAgeMonths: 12,
      },
    ],
    blwTips: [
      'Watch for the 4 physiological readiness markers: (1) Sitting upright with minimal support; (2) Steady head and neck control; (3) Loss of the tongue-thrust extrusion reflex; (4) Grasping objects and bringing them to mouth.',
      'Do not rush solids before 6 months; early introduction increases choking risk and gastrointestinal upset.',
    ],
    dorPrinciples: {
      parentDecides: ['Offers breastmilk or formula in response to hunger cues.'],
      childDecides: ['When to latch, how vigorously to drink, and when to turn away / stop feeding.'],
      goldenRule: 'Trust your baby’s innate hunger-satiety signals. Never force a baby to finish a bottle.',
    },
  },
  {
    stage: NutritionStage.SOLIDS_INTRODUCED,
    stageName: 'Stage 2: Introducing Solids & Baby-Led Weaning',
    ageRange: '6–12 Months',
    title: 'Texture Exploration, Iron Powerfoods & Safe Allergens',
    summary:
      'At 6 months, gestational iron stores are depleted. Solids complement breastmilk/formula with a focus on iron-dense whole foods, soft graspable shapes, and early allergen exposure.',
    keyNutrients: [
      'Heme and non-heme Iron (pureed meats, lentils, beans, iron-fortified oats)',
      'Zinc for immune function and cellular growth',
      'Healthy dietary fats (avocado, olive oil, nut butters) for rapid myelination',
    ],
    recommendedFoods: [
      'Steamed broccoli florets, sweet potato wedges, and zucchini spears (soft enough to squash between thumb and forefinger)',
      'Slow-cooked shredded beef, dark poultry meat, mashed beans with cumin',
      'Full-fat plain Greek yogurt, pasteurized soft goat cheese, mashed ripe avocado',
      'Smooth thinned peanut butter mixed with warm breastmilk or applesauce',
    ],
    foodsToAvoid: [
      {
        food: 'Honey',
        hazardType: 'INFANT_BOTULISM',
        mechanism: 'Strictly prohibited under 12 months. Heat does NOT destroy botulinum spores.',
        strictAgeMonths: 12,
      },
      {
        food: 'Whole Grapes & Round Cherry Tomatoes',
        hazardType: 'FATAL_CHOKING_HAZARD',
        mechanism: 'Round diameter matches infant airway, creating an airtight tracheal plug.',
        strictAgeMonths: 48,
        exceptionAllowed: 'Must be sliced lengthwise into 4 thin spears before serving.',
      },
      {
        food: 'Added Sugars & High Sodium',
        hazardType: 'METABOLIC_FLAVOR_IMPRINTING',
        mechanism: 'Added salt strains infant kidneys; added sugars warp nascent palate preferences toward hyper-palatable foods.',
        strictAgeMonths: 24,
      },
    ],
    blwTips: [
      'Cut finger foods into the size and shape of an adult finger so baby can hold the bottom and gnaw the top.',
      'Understand Gagging vs. Choking: Gagging is loud, involves red face, tongue thrusting, and coughing (protective reflex). Choking is SILENT, child cannot cough or breathe, and lips turn blue.',
      'Never insert your fingers into a baby’s mouth to sweep away food (blind finger sweep can push food further into the airway).',
    ],
    dorPrinciples: {
      parentDecides: ['What nutritious foods are offered, when meal and snack times happen, and where baby sits (in high chair).'],
      childDecides: ['Whether to taste a food, which foods to explore, and how much to eat.'],
      goldenRule: 'Food before one is just for fun and skill-building; breastmilk/formula remains the primary calorie source.',
    },
  },
  {
    stage: NutritionStage.TODDLER_TABLE,
    stageName: 'Stage 3: Toddler Table & Picky Eating Mastery',
    ageRange: '1–5 Years',
    title: 'Conquering Food Neophobia with Division of Responsibility',
    summary:
      'At age 1, growth rate decelerates dramatically, causing physiological appetite drop. Toddlers naturally become suspicious of novel foods (evolutionary neophobia). Calm feeding boundaries prevent mealtime battles.',
    keyNutrients: [
      'Dietary Fiber (berries, chia seeds, whole grain sourdough, beans)',
      'Calcium (whole milk yogurt, fortified soy milk, sesame tahini) capped at 16–20 oz milk/day to prevent iron-deficiency anemia',
      'Vitamin C paired with iron-rich foods to enhance absorption',
    ],
    recommendedFoods: [
      'Deconstructed family dinners (served family-style in central bowls)',
      'Cruciferous vegetables offered alongside beloved dips (hummus, guacamole, tzatziki)',
      'Eggs prepared various ways (scrambled with cheese, hard-boiled wedges)',
      'Whole grain toast with almond butter and hemp seeds',
    ],
    foodsToAvoid: [
      {
        food: 'Popcorn & Whole Nuts',
        hazardType: 'TRACHEAL_ASPIRATION',
        mechanism: 'Unchewed kernels or nuts can be aspirated into the bronchus, causing chemical pneumonitis.',
        strictAgeMonths: 48,
      },
      {
        food: 'Excessive Cow’s Milk (>24 oz / 700 mL daily)',
        hazardType: 'MILK_ANEMIA',
        mechanism: 'Calcium blocks iron absorption in the gut; filling up on milk crowds out iron-dense solid foods.',
        strictAgeMonths: 60,
      },
    ],
    blwTips: [
      'Utilize Food Chaining: Pair 1 familiar "safe food" the toddler always eats with 1 tiny micro-portion of a challenging vegetable.',
      'Serve tiny portions: 1 tablespoon per year of age looks manageable and avoids overwhelming a cautious eater.',
      'Never force "one more bite" or use dessert as a reward for eating vegetables (which elevates sweets and devalues vegetables).',
    ],
    dorPrinciples: {
      parentDecides: ['What foods are served, what time meals are eaten, and where everyone sits (table with zero screens).'],
      childDecides: ['Whether to eat anything at all, and how much to eat from what is provided.'],
      goldenRule: 'Parents provide, child decides. No short-order cooking or making special separate meals.',
    },
  },
  {
    stage: NutritionStage.BALANCED_SCHOOL,
    stageName: 'Stage 4: Elementary School Fuel & Lunchboxes',
    ageRange: '6–12 Years',
    title: 'Sustained Cognitive Energy, School Lunches & Body Neutrality',
    summary:
      'School-age children require sustained glucose regulation for executive function, memory consolidation, and afternoon stamina. Fostering intuitive eating without diet culture shame builds lifelong metabolic health.',
    keyNutrients: [
      'Complex carbohydrates with low glycemic index (quinoa, rolled oats, sweet potatoes)',
      'Choline & Omega-3 EPA/DHA for neural focus and neuroplasticity',
      'Potassium & Magnesium for muscular recovery and calm nervous system regulation',
    ],
    recommendedFoods: [
      'Bento-style balanced lunchboxes: turkey roll-ups, edamame, grape skewers, pumpkin seeds, apple slices',
      'Warm oatmeal with chia seeds, cinnamon, and fresh blueberries before school',
      'Trail mix with pumpkin seeds, dried cranberries, and dark chocolate chips',
      'Hydration: Water and unsweetened herbal teas in reusable insulated bottles',
    ],
    foodsToAvoid: [
      {
        food: 'Energy Drinks & Caffeinated Sodas',
        hazardType: 'CARDIOVASCULAR_ARRHYTHMIA_SLEEP_DISRUPTION',
        mechanism: 'High caffeine and taurine trigger tachycardia, acute anxiety, and decimate adolescent deep REM sleep.',
        strictAgeMonths: 216,
      },
    ],
    blwTips: [
      'Involve school-age children in grocery selection and weekly meal prep.',
      'Frame food in terms of how it makes their body feel ("This gives you stamina for soccer practice") rather than good vs. bad.',
    ],
    dorPrinciples: {
      parentDecides: ['Maintains a home environment stocked with whole, nourishing foods and regular family dinner routines.'],
      childDecides: ['Managing their hunger cues, packing their lunch options within guardrails, and navigating school social food situations.'],
      goldenRule: 'Never moralize food into "good" and "bad". All foods fit in a healthy, guilt-free relationship with eating.',
    },
  },
  {
    stage: NutritionStage.PUBERTAL_GROWTH,
    stageName: 'Stage 5: Adolescent Athletic & Pubertal Nutrition',
    ageRange: '13–18 Years',
    title: 'Peak Pubertal Bone Density, Athletic Fuel & Shielding from Diet Culture',
    summary:
      'Adolescence represents the greatest physiological growth spurt since infancy. 40% of adult skeletal bone mass is deposited during pubertal years. Nutrition must support hormones, athletic training, and psychological body positivity.',
    keyNutrients: [
      'Iron (critical for menstruating teens and expanding adolescent blood volume)',
      'Calcium (1,300 mg daily) and Vitamin D for peak lifelong bone mineral accrual',
      'Adequate caloric intake to support hypothalamic-pituitary-gonadal hormone production',
    ],
    recommendedFoods: [
      'Post-workout recovery meals: Greek yogurt smoothies with berries, peanut butter, and spinach',
      'Hearty grain bowls with grilled salmon or tofu, roasted sweet potatoes, and tahini dressing',
      'Iron-dense snacks: roasted chickpeas, fortified whole grain cereals, sunflower seed butter with banana',
    ],
    foodsToAvoid: [
      {
        food: 'Restrictive Fad Diets & Pre-Workout Stimulants',
        hazardType: 'HORMONAL_SUPPRESSION_METABOLIC_DAMAGE',
        mechanism: 'Severe caloric restriction impairs pubertal maturation, triggers amenorrhea in girls, and fosters eating disorders.',
        strictAgeMonths: 216,
      },
    ],
    blwTips: [
      'Encourage consistent eating schedules; skipping breakfast is associated with cognitive fog and evening binge eating.',
      'Teach teenagers basic culinary autonomy (scrambling eggs, roasting sheet-pan veggies, cooking brown rice).',
    ],
    dorPrinciples: {
      parentDecides: ['Provides family groceries, models balanced eating without body commentary, and serves as an empathetic mentor.'],
      childDecides: ['All personal food choices outside the home, balancing sports nutrition, and honoring internal hunger-satiety cues.'],
      goldenRule: 'Body diversity is natural. Model joyful movement and nourishment without praising thinness or shaming appetite.',
    },
  },
];

export const CANONICAL_ALLERGEN_SCHEDULE: AllergenScheduleItemDTO[] = [
  {
    id: 'allergen-peanut',
    allergen: 'Peanut',
    priority: 1,
    recommendedStartMonth: 4,
    evidenceTrial: 'LEAP Trial (NEJM 2015) — 81% reduction in peanut allergy with early introduction',
    recommendedFormat: 'Smooth peanut butter thinned with warm water, breastmilk, or applesauce (2 tsp)',
    preparationInstructions:
      'Never offer whole peanuts or thick sticky spoonfuls (fatal choking hazards). Whisk 2 teaspoons of smooth creamy peanut butter with 2–3 teaspoons of warm water until smooth and liquid. Offer a tiny dab on baby’s lip first, wait 10 minutes, then feed remainder by spoon.',
    safetyWarning: 'Never offer whole peanuts or sticky spoonfuls to children under 4.',
    frequencyMaintenance: 'Offer 2 to 3 times per week consistently to maintain immunological tolerance in the gut.',
    status: 'NOT_STARTED',
  },
  {
    id: 'allergen-egg',
    allergen: 'Egg',
    priority: 2,
    recommendedStartMonth: 6,
    evidenceTrial: 'EAT Study (NEJM 2016) & PETIT Trial — early cooked egg prevents sensitization',
    recommendedFormat: 'Hard-boiled egg yolk mashed with avocado, or well-cooked baked egg muffin',
    preparationInstructions:
      'Ensure egg is fully cooked (firm yolk and whites). Puree or finely mash hard-boiled egg with breastmilk or formula, or bake an egg thoroughly into an infant pancake or muffin.',
    safetyWarning: 'Do not serve raw or runny egg whites before 12 months.',
    frequencyMaintenance: 'Offer twice weekly consistently.',
    status: 'NOT_STARTED',
  },
  {
    id: 'allergen-milk',
    allergen: 'Cow’s Milk (Dairy)',
    priority: 3,
    recommendedStartMonth: 6,
    evidenceTrial: 'ESPGHAN Guidelines & AAP Pediatric Nutrition Committee',
    recommendedFormat: 'Plain, unsweetened full-fat whole-milk Greek yogurt or whole-milk kefir',
    preparationInstructions:
      'Offer 1–2 teaspoons of whole-milk plain Greek yogurt on a pre-loaded spoon. Cultured dairy proteins are easier for infant intestines to digest than raw milk.',
    safetyWarning: 'Do not substitute cow’s milk for breastmilk or formula in bottles before 12 months.',
    frequencyMaintenance: 'Offer 3 times per week.',
    status: 'NOT_STARTED',
  },
  {
    id: 'allergen-treenuts',
    allergen: 'Tree Nuts (Almond, Cashew, Walnut)',
    priority: 4,
    recommendedStartMonth: 6,
    evidenceTrial: 'AAP Early Allergen Recommendations',
    recommendedFormat: 'Smooth, unsalted almond or cashew butter thinned into oatmeal or fruit puree',
    preparationInstructions:
      'Thoroughly stir 1 teaspoon of creamy almond butter into warm infant oatmeal or mashed banana until completely incorporated.',
    safetyWarning: 'Whole tree nuts are a critical choking hazard before age 4.',
    frequencyMaintenance: 'Rotate tree nut butters 2 times weekly.',
    status: 'NOT_STARTED',
  },
  {
    id: 'allergen-wheat',
    allergen: 'Wheat (Gluten)',
    priority: 5,
    recommendedStartMonth: 6,
    evidenceTrial: 'CELIPREV & PreventCD Celiac Disease Studies',
    recommendedFormat: 'Infant wheat cereal, soft toasted whole wheat sourdough strip',
    preparationInstructions:
      'Prepare infant whole wheat cereal with breastmilk, or offer a lightly toasted strip of crustless whole wheat bread for baby to gnaw.',
    safetyWarning: 'Avoid processed white bread that turns into a gummy paste in the roof of baby’s mouth.',
    frequencyMaintenance: 'Offer 2–3 times per week.',
    status: 'NOT_STARTED',
  },
  {
    id: 'allergen-fish',
    allergen: 'Fish (Salmon, Cod)',
    priority: 6,
    recommendedStartMonth: 6,
    evidenceTrial: 'EAT Study (NEJM 2016)',
    recommendedFormat: 'Flaked, boneless steamed wild salmon mashed with sweet potato',
    preparationInstructions:
      'Carefully inspect for all pin bones. Steam or bake fresh wild salmon without salt, then finely flake with a fork and mix with breastmilk or vegetable mash.',
    safetyWarning: 'Avoid predatory high-mercury fish (shark, swordfish, king mackerel, bigeye tuna).',
    frequencyMaintenance: 'Offer 1–2 times weekly (provides superior DHA/EPA).',
    status: 'NOT_STARTED',
  },
  {
    id: 'allergen-soy',
    allergen: 'Soy',
    priority: 7,
    recommendedStartMonth: 6,
    evidenceTrial: 'AAP Pediatric Allergy Guidelines',
    recommendedFormat: 'Steamed silken or firm tofu cut into soft graspable rectangular spears',
    preparationInstructions:
      'Cut refrigerated firm or silken organic tofu into finger-sized rectangular blocks. Lightly steam or offer cold directly on the high chair tray.',
    safetyWarning: 'Ensure tofu is soft enough to yield under gentle infant gum pressure.',
    frequencyMaintenance: 'Offer 1–2 times weekly.',
    status: 'NOT_STARTED',
  },
  {
    id: 'allergen-sesame',
    allergen: 'Sesame',
    priority: 8,
    recommendedStartMonth: 6,
    evidenceTrial: 'FASTER Act / EAT Study — Sesame recognized as major allergen',
    recommendedFormat: 'Smooth sesame tahini whisked into warm vegetable puree or spread thinly on toast',
    preparationInstructions:
      'Whisk 1 teaspoon of 100% pure roasted sesame tahini into warm squash or sweet potato puree.',
    safetyWarning: 'Do not offer whole sesame seeds as they pass through unabsorbed.',
    frequencyMaintenance: 'Offer 2 times weekly.',
    status: 'NOT_STARTED',
  },
];

export const CANONICAL_CHOKING_HAZARDS: ChokingHazardDTO[] = [
  {
    foodItem: 'Whole Grapes & Cherry Tomatoes',
    riskLevel: 'CRITICAL',
    mechanism:
      'The spherical diameter of whole grapes and cherry tomatoes perfectly matches the child’s subglottic trachea (~10–12 mm), forming an airtight suction seal that prevents airflow.',
    safeModification:
      'Slice lengthwise into quarters (4 long spears). NEVER slice into round circular coins. Quarter lengthwise until age 4.',
    avoidUntilAgeYears: 4,
  },
  {
    foodItem: 'Hot Dogs & Sausage Links',
    riskLevel: 'CRITICAL',
    mechanism:
      'The cylindrical shape and firm, compressible texture can wedge firmly in the larynx and expand slightly upon saliva contact.',
    safeModification:
      'Slice hot dogs lengthwise into 4 long strips, then chop crosswise into small bite-sized pieces. Never serve as round disks.',
    avoidUntilAgeYears: 4,
  },
  {
    foodItem: 'Raw Carrots & Raw Apples',
    riskLevel: 'HIGH',
    mechanism:
      'Extremely hard and brittle; toddlers bite off hard chunks that cannot be ground by nascent molars, resulting in whole chunks falling into the airway.',
    safeModification:
      'Steam carrots and apples until fork-tender and smash, or grate into fine, paper-thin shavings using a box grater.',
    avoidUntilAgeYears: 4,
  },
  {
    foodItem: 'Popcorn & Whole Nuts',
    riskLevel: 'CRITICAL',
    mechanism:
      'Lightweight, irregularly shaped kernels and hard nuts can be easily inhaled (aspirated) into the lungs when a child laughs, talks, or gasps, causing bronchial obstruction or chemical pneumonia.',
    safeModification:
      'Strictly avoid popcorn and whole nuts until at least age 4. Use smooth thinned nut butters or nut flours instead.',
    avoidUntilAgeYears: 4,
  },
  {
    foodItem: 'Large Spoonfuls of Sticky Peanut Butter',
    riskLevel: 'HIGH',
    mechanism:
      'Thick nut butter sticks to the palate and throat, making it impossible for young children to clear without choking.',
    safeModification:
      'Thin smooth nut butter with warm water, breastmilk, or applesauce, or spread in a paper-thin translucent layer on toast.',
    avoidUntilAgeYears: 3,
  },
  {
    foodItem: 'Hard Candies & Cough Drops',
    riskLevel: 'CRITICAL',
    mechanism:
      'Smooth, slick, and non-yielding; saliva lubricates the candy causing it to slip inadvertently down the pharynx into the trachea.',
    safeModification:
      'Strictly avoid hard candies. For sore throats in children >12 months, offer warm lemon water or 1/2 tsp of honey.',
    avoidUntilAgeYears: 5,
  },
];

/**
 * Retrieves nutrition guides by stage with offline fallback.
 */
export async function getNutritionGuides(
  stage?: NutritionStage
): Promise<NutritionGuideDTO[]> {
  try {
    const params: Record<string, string | undefined> = {};
    if (stage) params.stage = stage;
    const res = await apiClient<{ success: boolean; data: { guides: NutritionGuideDTO[] } }>(
      '/api/v1/nutrition/guides',
      {
        method: 'GET',
        params,
      }
    );
    if (res?.data?.guides && res.data.guides.length > 0) {
      return res.data.guides;
    }
  } catch (err) {
    // Offline fallback
  }

  if (stage) {
    return CANONICAL_NUTRITION_GUIDES.filter((g) => g.stage === stage);
  }
  return CANONICAL_NUTRITION_GUIDES;
}

/**
 * Retrieves safe allergen introduction schedule with offline fallback.
 */
export async function getAllergenSchedule(
  childAgeMonths?: number
): Promise<AllergenScheduleItemDTO[]> {
  try {
    const params: Record<string, string | undefined> = {};
    if (childAgeMonths !== undefined) params.childAgeMonths = String(childAgeMonths);
    const res = await apiClient<{ success: boolean; data: { schedule: AllergenScheduleItemDTO[] } }>(
      '/api/v1/nutrition/allergens',
      {
        method: 'GET',
        params,
      }
    );
    if (res?.data?.schedule && res.data.schedule.length > 0) {
      return res.data.schedule;
    }
  } catch (err) {
    // Offline fallback
  }

  return CANONICAL_ALLERGEN_SCHEDULE;
}

/**
 * Retrieves choking hazard classification and safe modification guide with offline fallback.
 */
export async function getChokingHazards(): Promise<ChokingHazardDTO[]> {
  try {
    const res = await apiClient<{ success: boolean; data: { hazards: ChokingHazardDTO[] } }>(
      '/api/v1/nutrition/choking-hazards',
      {
        method: 'GET',
      }
    );
    if (res?.data?.hazards && res.data.hazards.length > 0) {
      return res.data.hazards;
    }
  } catch (err) {
    // Offline fallback
  }

  return CANONICAL_CHOKING_HAZARDS;
}
