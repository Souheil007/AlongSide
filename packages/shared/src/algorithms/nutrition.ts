import { DietaryStage } from '../constants/index.js';

export interface AllergenScheduleItem {
  allergen: string;
  targetAgeMonths: number;
  recommendedFormat: string;
  frequency: string;
  safetyWarning: string;
  isEligible: boolean;
}

export interface ChokingHazardCheckResult {
  hasChokingHazards: boolean;
  flaggedFoods: string[];
  safetyGuidance: string[];
}

const COMMON_CHOKING_HAZARDS = [
  { keyword: 'grape', guidance: 'Quarter grapes lengthwise into 4 thin slivers before serving.' },
  { keyword: 'hot dog', guidance: 'Slice hot dogs lengthwise into thin matchsticks, never coin rounds.' },
  { keyword: 'sausage', guidance: 'Quarter sausages lengthwise into thin strips.' },
  { keyword: 'whole nut', guidance: 'Never offer whole nuts to children under 4. Use smooth thinned nut butters instead.' },
  { keyword: 'peanut', formatCheck: true, guidance: 'Thin peanut butter with warm water, breastmilk, or yogurt. Thick sticky spoonfuls cause airway blockage.' },
  { keyword: 'popcorn', guidance: 'Popcorn is a severe aspiration risk for children under 4 years old.' },
  { keyword: 'raw carrot', guidance: 'Steam carrots until soft enough to smash between thumb and forefinger, or grate finely.' },
  { keyword: 'raw apple', guidance: 'Steam or bake apple slices until fork-tender, or grate thinly.' },
  { keyword: 'hard candy', guidance: 'Hard candies, cough drops, and lollipops are strict choking hazards.' },
  { keyword: 'marshmallow', guidance: 'Sticky marshmallows expand in the pharynx; avoid for toddlers.' },
];

/**
 * Resolves child's physiological dietary stage based on age in months.
 */
export function resolveDietaryStage(ageMonths: number): DietaryStage {
  if (ageMonths < 6) {
    return DietaryStage.MILK_ONLY;
  }
  if (ageMonths < 12) {
    return DietaryStage.SOLIDS_INTRODUCED;
  }
  if (ageMonths < 60) {
    return DietaryStage.TODDLER_TABLE;
  }
  if (ageMonths < 144) {
    return DietaryStage.BALANCED_SCHOOL;
  }
  return DietaryStage.PUBERTAL_GROWTH;
}

/**
 * Generates clinical early allergen introduction schedule based on AAP / LEAP trial guidelines.
 */
export function generateAllergenSchedule(childAgeMonths: number): AllergenScheduleItem[] {
  const allergens: AllergenScheduleItem[] = [
    {
      allergen: 'Peanut',
      targetAgeMonths: 6,
      recommendedFormat: 'Smooth peanut butter thinned with warm water, formula, or breastmilk (2 tsp)',
      frequency: '2-3 times per week to maintain immunological tolerance',
      safetyWarning: 'Never offer whole peanuts or thick sticky spoonfuls (choking hazard).',
      isEligible: childAgeMonths >= 4,
    },
    {
      allergen: 'Egg',
      targetAgeMonths: 6,
      recommendedFormat: 'Well-cooked scrambled egg yolk/white or baked egg muffin',
      frequency: 'Twice weekly',
      safetyWarning: 'Do not serve raw, runny, or soft-boiled eggs to infants.',
      isEligible: childAgeMonths >= 4,
    },
    {
      allergen: 'Dairy (Cow Milk Protein)',
      targetAgeMonths: 6,
      recommendedFormat: 'Plain whole-milk pasteurized Greek yogurt or cottage cheese',
      frequency: '2-3 times weekly',
      safetyWarning: 'Cow milk as a primary drink is contraindicated before 12 months, but cultured yogurt is safe.',
      isEligible: childAgeMonths >= 6,
    },
    {
      allergen: 'Tree Nuts (Almond / Cashew / Walnut)',
      targetAgeMonths: 7,
      recommendedFormat: 'Thinned smooth almond butter or finely milled nut flour stirred into oatmeal',
      frequency: 'Weekly rotation across tree nut varieties',
      safetyWarning: 'Never serve whole or chopped tree nuts.',
      isEligible: childAgeMonths >= 6,
    },
    {
      allergen: 'Fish (Salmon / Cod)',
      targetAgeMonths: 7,
      recommendedFormat: 'Flaked, deboned, cooked salmon mashed with avocado',
      frequency: '1-2 times weekly for DHA & omega-3 fatty acids',
      safetyWarning: 'Meticulously inspect for fine pin-bones before offering to baby.',
      isEligible: childAgeMonths >= 6,
    },
    {
      allergen: 'Sesame (Tahini)',
      targetAgeMonths: 8,
      recommendedFormat: 'Smooth tahini paste thinned into roasted vegetable purees or hummus',
      frequency: '1-2 times weekly',
      safetyWarning: 'Whole sesame seeds pass through undigested without exposure.',
      isEligible: childAgeMonths >= 7,
    },
    {
      allergen: 'Soy',
      targetAgeMonths: 8,
      recommendedFormat: 'Silken tofu strips or steamed mashed edamame puree',
      frequency: '1-2 times weekly',
      safetyWarning: 'Whole edamame beans are round choking hazards; mash thoroughly.',
      isEligible: childAgeMonths >= 7,
    },
    {
      allergen: 'Wheat',
      targetAgeMonths: 6,
      recommendedFormat: 'Fortified iron infant wheat cereal or soft cooked penne pasta',
      frequency: 'Several times weekly',
      safetyWarning: 'Start with single-grain wheat before complex mixed pastries.',
      isEligible: childAgeMonths >= 6,
    },
  ];

  return allergens;
}

/**
 * Validates food inputs against canonical choking hazards for children under 4 years old.
 */
export function validateChokingHazards(
  foods: string[],
  childAgeMonths: number
): ChokingHazardCheckResult {
  const isHighRiskAge = childAgeMonths < 48; // Under 4 years
  const flaggedFoods: string[] = [];
  const safetyGuidance: string[] = [];

  if (!isHighRiskAge) {
    return {
      hasChokingHazards: false,
      flaggedFoods: [],
      safetyGuidance: [],
    };
  }

  for (const food of foods) {
    const lower = food.toLowerCase();
    for (const hazard of COMMON_CHOKING_HAZARDS) {
      if (lower.includes(hazard.keyword)) {
        flaggedFoods.push(food);
        if (!safetyGuidance.includes(hazard.guidance)) {
          safetyGuidance.push(hazard.guidance);
        }
      }
    }
  }

  return {
    hasChokingHazards: flaggedFoods.length > 0,
    flaggedFoods,
    safetyGuidance,
  };
}
