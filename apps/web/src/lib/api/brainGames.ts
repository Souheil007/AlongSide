import {
  DevelopmentalTier,
  PlayCategory,
  type BrainGameActivityDTO,
} from '@alongside/shared';
import { apiClient } from './client';

export const CANONICAL_BRAIN_GAMES: BrainGameActivityDTO[] = [
  // --- TIER 0: INFANCY & TODDLER (0–3 YRS) ---
  {
    id: 'bg-t0-puppet-mirror',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    category: PlayCategory.PUPPET,
    title: 'Animal Puppet Vocal Mirroring',
    summary: 'Using a plush hand puppet to lower affective anxiety and stimulate early mirror neuron speech imitation.',
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
    if (query?.category) params.set('category', query.category);

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
  if (query?.category) {
    activities = activities.filter((bg) => bg.category === query.category);
  }

  return activities.length > 0 ? activities : CANONICAL_BRAIN_GAMES;
}
