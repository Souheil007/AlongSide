import type { PrismaClient } from '@prisma/client';
import { DietaryStage } from '@alongside/shared';

export interface NutritionGuideSeedData {
  stage: DietaryStage;
  title: string;
  ageBracket: string;
  guidelinesMarkdown: string;
  safeFoods: string[];
  chokingHazards: string[];
  allergenProtocol?: string;
  pickyEatingTips?: string;
}

export const NUTRITION_GUIDES_SEED: NutritionGuideSeedData[] = [
  {
    stage: DietaryStage.MILK_ONLY,
    title: 'Exclusive Liquid Nutrition (Breastmilk & Infant Formula)',
    ageBracket: '0 to 6 Months',
    guidelinesMarkdown: `
### AAP & WHO Guidance: The Foundation of Infant Gut Health
For the first 6 months of life, infants require only human breastmilk or iron-fortified infant formula. No water, tea, juices, or cereals in the bottle are needed or recommended.

#### Key Principles:
- **Responsive Feeding:** Feed on infant demand cues (rooting, hand-to-mouth, smacking lips) rather than rigid clock schedules.
- **Vitamin D Supplementation:** Breastfed and partially breastfed infants require 400 IU of liquid Vitamin D daily starting in the first days of life to prevent rickets.
- **No Water Needed:** Baby kidneys cannot handle plain water loads before 6 months; extra water can lead to dangerous water intoxication and hyponatremic seizures.
    `.trim(),
    safeFoods: [
      'Human breastmilk (direct nursing or pumped)',
      'Iron-fortified infant formula',
      'Vitamin D3 drops (400 IU daily for breastfed infants)',
    ],
    chokingHazards: [
      'Infant cereal added to bottles (severe aspiration hazard)',
      'Water, juices, cow milk, or plant-based milks',
      'Honey (infantile botulism risk before 12 months)',
    ],
    allergenProtocol: 'Maternal consumption of common allergens during lactation is encouraged; early passive exposure through breastmilk promotes immune tolerance.',
    pickyEatingTips: 'Paced bottle feeding mimics natural breastfeeding resistance and prevents overfeeding distress.',
  },
  {
    stage: DietaryStage.SOLIDS_INTRODUCED,
    title: 'Complementary Solids, Baby-Led Weaning (BLW) & Early Allergens',
    ageBracket: '6 to 12 Months',
    guidelinesMarkdown: `
### Readiness Cues & Safe Shape Modifications (Solid Starts Framework)
Solids begin when the infant displays all 4 developmental readiness signs: (1) sits upright with minimal support, (2) good head and neck control, (3) reaches for food and brings items to mouth, and (4) loss of tongue-thrust reflex.

#### Baby-Led Weaning (BLW) vs. Purees:
Both methods are clinically valid. For BLW, foods must be cut into **adult finger-sized spears** soft enough to smash between thumb and forefinger.

#### Iron Priority:
Infant innate iron stores deplete by 6 months. Prioritize iron-dense first foods: pureed liver, grass-fed beef, egg yolks, lentil dal, and hemp seed sprinkles.
    `.trim(),
    safeFoods: [
      'Steamed broccoli spears with stem handle',
      'Avocado spears rolled in ground hemp seeds for grip',
      'Soft-cooked sweet potato wedges',
      'Slow-cooked shredded beef or dark turkey meat',
      'Mashed hard-boiled egg yolk with breastmilk',
      'Full-fat unsweetened plain Greek yogurt',
    ],
    chokingHazards: [
      'Whole round grapes, cherry tomatoes, and cherries (must be quartered lengthwise)',
      'Whole nuts and thick peanut butter globs (must be thinned with water/puree)',
      'Hot dogs, sausage rounds, and cheese sticks (must be sliced into thin lengthwise strips)',
      'Raw hard vegetables (carrots, apples, celery)',
      'Popcorn, hard candies, marshmallows, and chewing gum',
      'Honey (strictly prohibited under 12 months due to Clostridium botulinum spores)',
    ],
    allergenProtocol: 'Introduce the Top 9 allergens (peanut, egg, milk, tree nuts, soy, wheat, fish, shellfish, sesame) starting between 4-11 months. Introduce one allergen at a time in the morning during a weekday, maintaining exposure 2-3 times per week to prevent allergic sensitization (LEAP Study Protocol).',
    pickyEatingTips: 'Gagging is a loud, active, protective reflex that moves food forward on the tongue; choking is silent, terrifying, and requires immediate back blows. Expect mess and exploration before actual caloric consumption.',
  },
  {
    stage: DietaryStage.TODDLER_TABLE,
    title: 'Toddler Table, Division of Responsibility & Picky Eating',
    ageBracket: '1 to 5 Years',
    guidelinesMarkdown: `
### Ellyn Satter Division of Responsibility in Feeding (sDOR)
Toddlerhood brings a physiological growth deceleration and normal developmental neophobia (fear of new foods). Attempting to force, bribe, or negotiate eating backfires and escalates power struggles.

#### Division of Responsibility:
- **Parent Decides:** WHAT, WHEN, and WHERE to eat.
- **Child Decides:** WHETHER to eat and HOW MUCH to eat.

#### Nutritional Anchors:
Transition from formula to whole cow milk or fortified soy milk (limited to 16–20 oz/day to prevent iron deficiency anemia). Offer balanced meals with fat, protein, and complex fiber.
    `.trim(),
    safeFoods: [
      'Quartered meatballs and tender shredded chicken',
      'Steamed carrot rounds smashed flat',
      'Cut berries and quartered grapes',
      'Oatmeal with chia seeds and nut butter swirl',
      'Whole grain toast soldiers with hummus',
      'Steamed edamame beans popped from pods',
    ],
    chokingHazards: [
      'Whole round fruits (blueberries must be flattened; grapes quartered)',
      'Whole spoonfuls of sticky nut butter',
      'Hard pretzels, popcorn, and tortilla chips',
      'Hard candy, gummy vitamins, and chewing gum',
    ],
    allergenProtocol: 'Continue regular, diverse dietary inclusion of all allergens. If an allergic reaction was previously documented, maintain strict avoidance and keep emergency auto-injectors current.',
    pickyEatingTips: 'Always include at least one "safe/familiar food" on the plate that your child reliably enjoys. Never become a short-order cook. Use de-escalating neutral dialogue: "You don’t have to eat it. It can just sit on your plate."',
  },
  {
    stage: DietaryStage.BALANCED_SCHOOL,
    title: 'School Lunchboxes, Energy Stability & Screen-Free Meals',
    ageBracket: '6 to 12 Years',
    guidelinesMarkdown: `
### Sustained Cognitive Energy & The Family Meal Table
Elementary and pre-teen children experience intense cognitive demands, athletic commitments, and increasing dietary autonomy.

#### School Meal Principles:
- **The 3-Compartment Rule:** Every lunch contains (1) sustained protein/fat (beans, eggs, turkey, sunflower butter), (2) complex whole grain fiber, and (3) colorful fruit/vegetable crunch.
- **Hydration:** Replace juices and sodas with pure water; mild dehydration mimics brain fog and fatigue.
- **Family Dinner Shield:** Regular family dinners without television, iPads, or smartphones are scientifically linked to higher academic resilience, lower adolescent depression, and balanced dietary habits.
    `.trim(),
    safeFoods: [
      'Turkey and cheddar roll-ups with cucumber matchsticks',
      'Quinoa and black bean burrito bowls with salsa and guacamole',
      'Greek yogurt bowls with berries and pumpkin seeds',
      'Apple slices with sunflower seed butter dip',
      'Lentil pasta with marinara and ground turkey',
    ],
    chokingHazards: [
      'Choking risks decrease, but eating while running, laughing vigorously, or on trampolines remains hazardous.',
    ],
    allergenProtocol: 'Train child in school cafeteria safety, recognizing personal allergic symptoms, and never sharing lunchbox items with peers possessing severe allergies.',
    pickyEatingTips: 'Involve your child in Sunday grocery planning and lunchbox assembly. Food prep participation increases vegetable tasting rates by 300%.',
  },
  {
    stage: DietaryStage.PUBERTAL_GROWTH,
    title: 'Adolescent Growth Spurt, Athletic Fuel & Body Autonomy',
    ageBracket: '13 to 18 Years',
    guidelinesMarkdown: `
### Pubertal Micronutrient Acceleration & Metabolic Demand
Adolescence is the second most rapid growth period after infancy. Bone mineral density peaks during these years, requiring high calcium and Vitamin D, while blood volume expansion demands increased bioavailable iron.

#### Key Nutritional Priorities:
- **Iron & Calcium:** Teen athletes and menstruating teens need increased dietary iron (spinach, lentils, red meat) paired with Vitamin C for absorption, and 1,300 mg of dietary calcium daily.
- **Ultra-Processed Food Guardrails:** Limit energy drinks, high-sugar coffee drinks, and fast foods that disrupt adolescent circadian rhythms and skin barrier integrity.
- **Intuitive Eating & Body Positivity:** Guard against diet culture, crash dieting, or compulsive sports supplement use.
    `.trim(),
    safeFoods: [
      'Hearty grain bowls with roasted salmon, sweet potato, and avocado',
      'Protein smoothies with berries, Greek yogurt, spinach, and chia seeds',
      'Bean and cheese quesadillas with pico de gallo',
      'Trail mix with almonds, walnuts, pumpkin seeds, and dark chocolate chips',
      'Grilled chicken or tofu stir-fry with brown rice and broccoli',
    ],
    chokingHazards: [
      'High-risk choking is rare; primary risk shifts to energy drink toxicity and high caffeine loads (>100 mg/day).',
    ],
    allergenProtocol: 'Adolescents must carry their own epinephrine auto-injectors and know how to self-advocate in restaurants and social gatherings.',
    pickyEatingTips: 'Frame food choices around energy, sports performance, and cognitive clarity rather than body weight or aesthetics.',
  },
];

export async function seedNutritionGuides(prisma: PrismaClient): Promise<void> {
  console.log(`[Seed] Seeding ${NUTRITION_GUIDES_SEED.length} pediatric nutrition guides...`);

  for (const item of NUTRITION_GUIDES_SEED) {
    await prisma.nutritionGuide.upsert({
      where: { stage: item.stage },
      update: {
        title: item.title,
        ageBracket: item.ageBracket,
        guidelinesMarkdown: item.guidelinesMarkdown,
        safeFoods: item.safeFoods,
        chokingHazards: item.chokingHazards,
        allergenProtocol: item.allergenProtocol,
        pickyEatingTips: item.pickyEatingTips,
      },
      create: item,
    });
  }

  console.log(`[Seed] Successfully seeded ${NUTRITION_GUIDES_SEED.length} nutrition guides.`);
}
