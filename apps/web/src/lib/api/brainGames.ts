import {
  DevelopmentalTier,
  PlayCategory,
  type BrainGameActivityDTO,
} from '@alongside/shared';
import { apiClient } from './client';

export interface BoredomBusterPrompt {
  id: string;
  title: string;
  category: 'engineering' | 'art' | 'science' | 'mystery' | 'movement';
  categoryLabel: string;
  materials: string[];
  challenge: string;
  timeEstimateMinutes: number;
  neuroBenefit: string;
  secretTipForParents: string;
}

export const BOREDOM_BUSTER_PROMPTS: BoredomBusterPrompt[] = [
  {
    id: 'bb-marble-run',
    title: 'The Great Cardboard Gravity Rollercoaster',
    category: 'engineering',
    categoryLabel: 'Kinetic Engineering',
    materials: ['Cardboard tubes or cereal boxes', 'Painter’s tape', '1 marble or small ball', 'Plastic cup'],
    challenge:
      'Tape cardboard tracks to the wall or table so a marble rolled from the top takes at least 6 seconds to reach the bottom cup without falling off.',
    timeEstimateMinutes: 30,
    neuroBenefit: 'Kinetic physics intuition, iterative trial-and-error, and dopamine regulation.',
    secretTipForParents:
      'If they complain that tape doesn\'t hold, ask: "What could support it underneath?" Resist fixing it for them.',
  },
  {
    id: 'bb-secret-laser-maze',
    title: 'Hallway Secret Agent String Laser Maze',
    category: 'movement',
    categoryLabel: 'Sensory-Motor Agility',
    materials: ['Yarn, string, or painter’s tape', 'Quiet hallway or between chair legs', 'Small bell or paperclip (optional)'],
    challenge:
      'Tape string zigzagging across the hallway at various heights. Challenge family members to crawl from one end to the other without touching any string.',
    timeEstimateMinutes: 25,
    neuroBenefit: 'Proprioception, vestibular balance, spatial awareness, and motor planning.',
    secretTipForParents:
      'Time each run with a stopwatch. High physical engagement burns excess cortisol and resets overstimulation.',
  },
  {
    id: 'bb-surface-tension-lab',
    title: 'The Floating Paperclip Water Laboratory',
    category: 'science',
    categoryLabel: 'Physics & Chemistry',
    materials: ['Bowl of water', 'Dry metal paperclips', 'Small tissue paper square', 'Dish soap + toothpick'],
    challenge:
      'Can you make a metal paperclip float on water? Use a small piece of tissue paper underneath, then touch a drop of soap with a toothpick to watch water surface tension break!',
    timeEstimateMinutes: 20,
    neuroBenefit: 'Scientific hypothesis testing, fine motor precision, and observation endurance.',
    secretTipForParents:
      'Paperclips are denser than water; surface tension forms a molecular skin that holds them until surfactant breaks it.',
  },
  {
    id: 'bb-shadow-puppet-theater',
    title: 'Flashlight Shadow Creature Theater',
    category: 'art',
    categoryLabel: 'Dramatic Storytelling',
    materials: ['Flashlight or lamp', 'Dark room with a blank wall', 'Cardboard scraps, chopsticks or pencils, tape'],
    challenge:
      'Cut silhouette creatures or beasts out of cardboard, tape them to chopsticks, and put on a 2-minute original mystery play on the wall with light and shadow.',
    timeEstimateMinutes: 35,
    neuroBenefit: 'Symbolic narrative expression, Theory of Mind perspective-taking, and expressive language.',
    secretTipForParents:
      'Ask the child: "What problem is the shadow monster trying to solve?" Encourages third-person emotional processing.',
  },
  {
    id: 'bb-newspaper-tower',
    title: 'Free-Standing Newspaper Skyscraper Challenge',
    category: 'engineering',
    categoryLabel: 'Structural Geometry',
    materials: ['10 sheets of newspaper or junk mail', '12 inches of masking tape'],
    challenge:
      'Build the tallest free-standing tower possible using only 10 sheets of newspaper and 12 inches of tape. It must stay standing for at least 15 seconds without tipping.',
    timeEstimateMinutes: 25,
    neuroBenefit: 'Triangular structural geometry, resource constraint problem-solving, and patience.',
    secretTipForParents:
      'Rolling sheets tightly into rigid tubes creates triangular trusses that support immense vertical load.',
  },
  {
    id: 'bb-cryptic-cipher-hunt',
    title: 'The Caesar Cipher Living Room Treasure Hunt',
    category: 'mystery',
    categoryLabel: 'Cryptography & Logic',
    materials: ['Paper & pencil', 'A favorite book or hiding spot for a clue'],
    challenge:
      'Create a Caesar cipher by shifting each letter forward by 3 (A becomes D, B becomes E). Write 3 encoded clues leading to a hidden snack or note in the house.',
    timeEstimateMinutes: 30,
    neuroBenefit: 'Working memory manipulation, algorithmic decoding, and deductive reasoning.',
    secretTipForParents:
      'Give them a two-column decoder key (A→D, B→E...) so they focus on the linguistic thrill rather than arithmetic frustration.',
  },
];

export const CANONICAL_BRAIN_GAMES: BrainGameActivityDTO[] = [
  // --- TIER 0: INFANCY & TODDLER (0–3 YRS) ---
  {
    id: 'bg-t0-puppet-mirror',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    category: PlayCategory.PUPPET,
    title: 'Animal Puppet Vocal Mirroring & Peek-a-Boo',
    summary: 'Face-to-face vocal turn-taking using a soft animal puppet to stimulate mirror neurons and reciprocal dialogue.',
    instructions:
      'Place a friendly hand puppet or clean sock on your hand. Bring the puppet to eye level with your baby (~12–18 inches away). Have the puppet make gentle, exaggerated vowel and animal sounds ("Ooooh!", "Moo!", "Baaa!"). Pause for 5 seconds to let your child copy the sound or reach out.',
    materialsNeeded: ['1 plush animal puppet or clean soft sock', 'Quiet, distraction-free corner'],
    targetSkills: ['Vocal turn-taking', 'Mirror neuron speech activation', 'Joint visual attention'],
    estimatedMinutes: 10,
    isScreenFree: true,
  },
  {
    id: 'bg-t0-sensory-water-ice',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    category: PlayCategory.SENSORY,
    title: 'Warm & Cool Sensory Water Basin',
    summary: 'Tactile temperature and texture exploration strengthening nerve ending density in the fingertips.',
    instructions:
      'Fill a shallow baking dish with warm water and float 3 large ice cubes along with 2 silicone spoons. Allow baby to splash, grasp the melting cubes, and experience safe thermal contrast with close supervision.',
    materialsNeeded: ['Shallow plastic tub or baking sheet', 'Lukewarm water', 'Large ice cubes', 'Towel'],
    targetSkills: ['Tactile sensory integration', 'Pincer grip manipulation', 'Cause & effect discovery'],
    estimatedMinutes: 15,
    isScreenFree: true,
  },
  {
    id: 'bg-t0-stack-and-topple',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    category: PlayCategory.CONSTRUCTION,
    title: 'Cause-and-Effect Soft Cup Stacking',
    summary: 'Spatial geometry and object permanence through building up and knocking down.',
    instructions:
      'Stack 3 soft cups or lightweight wooden blocks in front of your toddler. Count aloud: "One, two, three... crash!" Let them topple the tower with their hands. Repeat with delighted anticipation to reinforce neurological predictability.',
    materialsNeeded: ['3-5 nesting cups or soft foam blocks'],
    targetSkills: ['Object permanence', 'Bilateral hand control', 'Cause-and-effect anticipation'],
    estimatedMinutes: 12,
    isScreenFree: true,
  },

  // --- TIER 1: EARLY CHILDHOOD (4–6 YRS) ---
  {
    id: 'bg-t1-puppet-sparring',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    category: PlayCategory.PUPPET,
    title: 'Puppet Emotional Sparring: The Frustrated Dragon',
    summary: 'Third-person projective play that teaches tantrum de-escalation and emotional vocabulary before meltdowns happen.',
    instructions:
      'Your puppet acts as "Barnaby the Dragon", who just built a tall tower that fell over. Barnaby groans, stomps, and says: "I want to smash everything!" Ask your child: "Barnaby feels fiery angry! What can we teach Barnaby to help him breathe?" Practice belly breathing together.',
    materialsNeeded: ['Dragon or monster puppet', 'Wooden building blocks or cardboard boxes'],
    targetSkills: ['Emotional regulation', 'Perspective taking (Theory of Mind)', 'Impulse pause'],
    estimatedMinutes: 15,
    isScreenFree: true,
  },
  {
    id: 'bg-t1-block-symmetry',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    category: PlayCategory.CONSTRUCTION,
    title: 'Mirror-Image Architectural Blocks',
    summary: 'Spatial reasoning and bilateral hand coordination through symmetrical structure building.',
    instructions:
      'Lay a ribbon down the center of a table as the "mirror line". Place 3 colored blocks on your side in an L-shape. Invite your child to replicate the mirror pattern on their side. Gradually increase complexity with arches and cylinders.',
    materialsNeeded: ['Wooden or foam building blocks', 'Ribbon or tape for divider'],
    targetSkills: ['Spatial working memory', 'Bilateral motor planning', 'Geometric visual symmetry'],
    estimatedMinutes: 20,
    isScreenFree: true,
  },
  {
    id: 'bg-t1-sensory-rice-bin',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    category: PlayCategory.SENSORY,
    title: 'Archaeological Rice & Hidden Gem Excavation',
    summary: 'Tactile sensory soothing and fine motor tweezers grasp preparing for pencil grip.',
    instructions:
      'Fill a tub with dry uncooked rice or dry lentils. Bury 6 small plastic dinosaurs, coins, or glass gems. Provide measuring cups, funnels, and kitchen tongs. Encourage child to sift and extract artifacts without spilling.',
    materialsNeeded: ['Plastic tub', '2 lbs dry uncooked rice', 'Kitchen tongs / measuring spoons', 'Hidden small toys'],
    targetSkills: ['Tripod pencil grip development', 'Sensory down-regulation', 'Sustained focus'],
    estimatedMinutes: 25,
    isScreenFree: true,
  },

  // --- TIER 2: MIDDLE CHILDHOOD (7–9 YRS) ---
  {
    id: 'bg-t2-logic-blindfold',
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    category: PlayCategory.LOGIC_PUZZLE,
    title: 'Blindfold Tactile Architect',
    summary: 'Non-visual tactile deduction and spatial description building mental visualization circuits.',
    instructions:
      'One player is blindfolded. The other player hands them 5 distinct wooden objects (cone, sphere, cube, pyramid, arch). By touch alone, the blindfolded player must identify each shape and stack them in ascending order of flat surface area.',
    materialsNeeded: ['Sleep mask or bandana', 'Assorted 3D geometric wooden shapes'],
    targetSkills: ['Haptic perception', 'Descriptive vocabulary', 'Working memory under sensory restriction'],
    estimatedMinutes: 15,
    isScreenFree: true,
  },
  {
    id: 'bg-t2-boredom-invention',
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    category: PlayCategory.MAKER,
    title: '15-Minute Cardboard Marble Coaster',
    summary: 'Kinetic gravity engineering and resilient frustration tolerance when designs fail.',
    instructions:
      'Give your child 3 paper towel tubes, masking tape, and a marble. Challenge them to build a track taped to the wall or table that slows the marble down so it takes at least 5 full seconds to travel to the bottom cup.',
    materialsNeeded: ['Cardboard tubes', 'Masking / painter tape', '1 marble or wooden ball', 'Stopwatch'],
    targetSkills: ['Iterative problem solving', 'Kinetic physics intuition', 'Frustration tolerance'],
    estimatedMinutes: 25,
    isScreenFree: true,
  },
  {
    id: 'bg-t2-chess-tactics',
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    category: PlayCategory.LOGIC_PUZZLE,
    title: 'Chess Micro-Tactics: The Knight’s Fork Riddle',
    summary: 'Executive inhibitory control and multi-step cognitive branching using chess pieces.',
    instructions:
      'Set up a simplified 4x4 or 8x8 board with 1 White Knight and 3 Black target pieces (King, Queen, Rook). Challenge the child to find the single square where the Knight attacks two high-value pieces simultaneously without being captured.',
    materialsNeeded: ['Chess board and pieces', 'Timer'],
    targetSkills: ['Multi-step spatial planning', 'Inhibitory impulse control', 'Strategic branching'],
    estimatedMinutes: 20,
    isScreenFree: true,
  },

  // --- TIER 3: PRE-TEEN (10–12 YRS) ---
  {
    id: 'bg-t3-logic-two-truths',
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    category: PlayCategory.LOGIC_PUZZLE,
    title: 'Cryptic Two Truths & A Neuro-Lie',
    summary: 'Critical thinking, dopamine skepticism, and verbal forensic questioning.',
    instructions:
      'Each player writes down 3 statements about human behavior, internet algorithms, or their day: 2 true facts and 1 cleverly constructed lie. Players take turns cross-examining each other using non-accusatory open questions to deduce the false statement.',
    materialsNeeded: ['Index cards', 'Pens'],
    targetSkills: ['Forensic skepticism', 'Dopamine loop awareness', 'Non-verbal cue detection'],
    estimatedMinutes: 20,
    isScreenFree: true,
  },
  {
    id: 'bg-t3-maker-catapult',
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    category: PlayCategory.MAKER,
    title: 'Precision Craft Stick Tension Catapult',
    summary: 'Hooke’s Law elastic potential energy and target trajectory accuracy.',
    instructions:
      'Stack 7 jumbo craft sticks together and bind both ends with rubber bands. Wedge a cross stick and plastic spoon between them. Test launching marshmallows or pom-poms into 3 bowls placed at 3, 5, and 8 feet.',
    materialsNeeded: ['Jumbo craft sticks', 'Rubber bands', 'Plastic spoon', 'Marshmallows or mini pom-poms'],
    targetSkills: ['Mechanical engineering', 'Trajectory estimation', 'Data recording & calibration'],
    estimatedMinutes: 30,
    isScreenFree: true,
  },

  // --- TIER 4: EARLY ADOLESCENCE (13–15 YRS) ---
  {
    id: 'bg-t4-debate-sparring',
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    category: PlayCategory.BOREDOM_BUSTER,
    title: 'Family Dinner Dilemma Sparring: AI & Autonomy',
    summary: 'Structured bilateral debate fostering formal operational cognitive maturity without family hostility.',
    instructions:
      'Draw a modern ethics dilemma card at dinner (e.g. "Should schools ban generative AI essays or teach prompt auditing?"). Flip a coin: heads argues affirmative, tails argues negative. Each side gets 2 minutes of uninterrupted argumentation, followed by 1 rebuttal.',
    materialsNeeded: ['Dilemma prompts or news clippings', 'Kitchen timer'],
    targetSkills: ['Formal operational logic', 'Perspective synthesis', 'Emotional de-escalation in debate'],
    estimatedMinutes: 25,
    isScreenFree: true,
  },

  // --- TIER 5: LATE ADOLESCENCE (16–18 YRS) ---
  {
    id: 'bg-t5-cryptic-cipher',
    targetTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    category: PlayCategory.LOGIC_PUZZLE,
    title: 'Cryptographic Frequency Analysis Challenge',
    summary: 'Linguistic patterns, mathematical frequency analysis, and codebreaking.',
    instructions:
      'Take a short paragraph from a favorite book and replace each letter with a fixed symbol or number shift. Use standard English letter frequency tables (E, T, A, O, I, N are most frequent) to decipher the encrypted message without a key.',
    materialsNeeded: ['Grid notebook', 'Pen', 'Frequency chart printout'],
    targetSkills: ['Cryptanalysis', 'Statistical deduction', 'High-order working memory'],
    estimatedMinutes: 35,
    isScreenFree: true,
  },
];

/**
 * Stages of the "15-Minute Whining Valley" for parent guidance.
 */
export const WHINING_VALLEY_STAGES = [
  {
    stage: 'Phase 1: Minutes 0–5',
    title: 'The Dopamine Drop & Protest Peak',
    description:
      'When screens are withheld or ended, the brain experiences an acute neurochemical dopamine dip. The child whines, insists "there is nothing to do in this whole house," and demands rescue.',
    parentAction:
      'Validate with warmth, do NOT offer digital rescue: "It is totally normal to feel bored. Your brain is just resetting. Boredom is where our best creative ideas live."',
    badge: 'Normalize & Validate',
  },
  {
    stage: 'Phase 2: Minutes 5–10',
    title: 'Restless Wandering & Default Mode Network',
    description:
      'The child wanders aimlessly, touches objects, groans, or lays dramatically on the floor. Internally, the brain\'s Default Mode Network (DMN) is booting up, scanning memory and curiosity for stimuli.',
    parentAction:
      'Environmental Staging: Casually place raw open-ended materials (cardboard, tape, paperclips, markers) on the table without instructing them to use it. Stay busy with your own quiet task.',
    badge: 'Stage Environment',
  },
  {
    stage: 'Phase 3: Minutes 10–15+',
    title: 'Autonomous Flow & Imaginative Ignition',
    description:
      'The internal narrative engine takes over. The child picks up an object, invents a rule, begins building or pretending, and enters a self-directed flow state that can last 45–90 minutes.',
    parentAction:
      'Disappear into the background: Do not interrupt, over-praise, or direct the play. Let their intrinsic motivation flourish.',
    badge: 'Fade to Background',
  },
];

/**
 * Fetch daily brain game recommendation for a specific child or developmental tier.
 */
export async function getDailyBrainGame(
  childId?: string,
  tier?: string
): Promise<BrainGameActivityDTO> {
  try {
    const params = new URLSearchParams();
    if (childId) params.set('childId', childId);
    if (tier) params.set('tier', tier);

    const qs = params.toString();
    const endpoint = `/api/v1/brain-games/daily${qs ? `?${qs}` : ''}`;
    const res = await apiClient<{ activity: BrainGameActivityDTO }>(endpoint);
    if (res?.activity) {
      return res.activity;
    }
  } catch {
    // Offline / fallback handling
  }

  // Pure fallback matching child tier
  if (tier) {
    const matched = CANONICAL_BRAIN_GAMES.find(
      (bg) => bg.targetTier === tier || bg.targetTier.includes(tier)
    );
    if (matched) return matched;
  }

  return CANONICAL_BRAIN_GAMES[0]!;
}

/**
 * List brain game activities by tier or category.
 */
export async function getBrainGamesCatalog(query?: {
  tier?: string;
  category?: string;
}): Promise<BrainGameActivityDTO[]> {
  try {
    const params = new URLSearchParams();
    if (query?.tier) params.set('tier', query.tier);
    if (query?.category && query.category !== 'all') {
      params.set('category', query.category);
    }

    const qs = params.toString();
    const endpoint = `/api/v1/brain-games${qs ? `?${qs}` : ''}`;
    const res = await apiClient<{ activities: BrainGameActivityDTO[] }>(endpoint);
    if (res?.activities && res.activities.length > 0) {
      return res.activities;
    }
  } catch {
    // Offline fallback
  }

  let activities = [...CANONICAL_BRAIN_GAMES];
  if (query?.tier) {
    activities = activities.filter(
      (bg) => bg.targetTier === query.tier || bg.targetTier.includes(query.tier!)
    );
  }
  if (query?.category && query.category !== 'all') {
    activities = activities.filter((bg) => bg.category === query.category);
  }

  return activities.length > 0 ? activities : CANONICAL_BRAIN_GAMES;
}
