import type { PrismaClient } from '@prisma/client';
import { DevelopmentalTier, PlayCategory } from '@alongside/shared';

export interface BrainGameSeedData {
  targetTier: DevelopmentalTier;
  category: PlayCategory;
  title: string;
  summary: string;
  instructions: string;
  materialsNeeded: string[];
  targetSkills: string[];
  estimatedMinutes: number;
  isScreenFree: boolean;
}

export const BRAIN_GAMES_SEED: BrainGameSeedData[] = [
  // TIER 0A: INFANCY (0-1)
  {
    targetTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    category: PlayCategory.PUPPET,
    title: 'Barnyard Animal Puppet Sparring & Echoing',
    summary:
      'Interactive animal puppet play fostering vocal imitation, serve-and-return communication, and emotion recognition.',
    instructions:
      'Put an animal puppet (cow, sheep, or puppy) on your hand. Bring it to baby eye level (about 12 inches away). Make playful animal sounds ("Mooo!", "Baaah!") with exaggerated facial expressions. Pause and wait 5 full seconds for baby to vocalize, smile, or reach back. When they vocalize, echo their sound with the puppet nodding enthusiastically.',
    materialsNeeded: ['1 soft plush animal hand puppet or sock puppet'],
    targetSkills: ['Serve-and-return dialogue', 'Vocal imitation', 'Eye contact & joint attention'],
    estimatedMinutes: 10,
    isScreenFree: true,
  },

  // TIER 0B: TODDLER (1-2)
  {
    targetTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
    category: PlayCategory.SENSORY,
    title: 'Warm Water & Floating Forest Sensory Tub',
    summary:
      'Tactile splash bin developing fine motor pinching, temperature sensation, and early physics of buoyancy.',
    instructions:
      'Fill a shallow storage tub with 2 inches of lukewarm water. Float clean bath sponges, silicone cups, and large plastic leaves. Let toddler scoop water, squeeze sponges with two hands, and observe items sinking vs floating. Model pouring water from high to low.',
    materialsNeeded: ['Shallow plastic storage bin', 'Lukewarm water', 'Silicone cups', 'Bath sponges'],
    targetSkills: ['Bilateral hand strength', 'Tactile processing', 'Cause and effect'],
    estimatedMinutes: 15,
    isScreenFree: true,
  },

  // TIER 0C: OLDER TODDLER (2-3)
  {
    targetTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    category: PlayCategory.CONSTRUCTION,
    title: 'Soft Unit Block Tower Demolition',
    summary:
      'Building and toppling blocks to master spatial orientation, balance, and intentional motor planning.',
    instructions:
      'Build a 3-to-4 block tower together using soft foam or wooden unit blocks. Point to the tower: "Look at the tall tower! Ready, set... push!" Encourage toddler to reach out and gently topple the tower. Cheer enthusiastically when it falls, then hand them a block to place the foundation for the next tower.',
    materialsNeeded: ['Set of 6-10 soft foam or wooden unit blocks'],
    targetSkills: ['Spatial awareness', 'Grasp release control', 'Delayed gratification'],
    estimatedMinutes: 12,
    isScreenFree: true,
  },

  // TIER 1: EARLY CHILDHOOD (4-6)
  {
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    category: PlayCategory.CONSTRUCTION,
    title: 'Montessori Unit Block Bridge Challenge',
    summary:
      'Open-ended engineering challenge teaching structural stability, counterweights, and trial-and-error resilience.',
    instructions:
      'Challenge child to create a bridge between two block towers that a toy car can drive underneath. Experiment with different column widths and spanning blocks. If the span collapses, ask guiding questions: "What happens if we move the towers closer together?" or "Can we use a longer plank?"',
    materialsNeeded: ['Standard wooden unit block set', 'Small toy car or animal figurine'],
    targetSkills: ['Engineering intuition', 'Frustration tolerance', 'Spatial geometry'],
    estimatedMinutes: 20,
    isScreenFree: true,
  },
  {
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    category: PlayCategory.PUPPET,
    title: 'Emotion Puppet Theater & Problem Solving',
    summary:
      'Puppet dramatization of common preschool social frictions (sharing toys, feeling left out, big feelings).',
    instructions:
      'Use two puppets to act out a short 1-minute scenario where Puppet A takes Puppet B toy without asking. Have Puppet B look sad and cry: "Hey, I was playing with that!" Freeze the scene, turn to child and ask: "Puppet B feels really sad. What can Puppet A say or do to fix this?" Let child direct the resolution.',
    materialsNeeded: ['2 hand puppets or stuffed animals'],
    targetSkills: ['Empathy and Theory of Mind', 'Conflict de-escalation', 'Emotional vocabulary'],
    estimatedMinutes: 15,
    isScreenFree: true,
  },
  {
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    category: PlayCategory.SENSORY,
    title: 'Kinetic Sand Archaeological Dinosaur Dig',
    summary:
      'Fine-motor tactile search utilizing paintbrushes, spoons, and magnifying glasses to excavate hidden artifacts.',
    instructions:
      'Bury plastic dinosaur bones or polished stones inside a tray of kinetic sand. Provide child with a wooden spoon and clean paintbrush. Child must gently brush away the sand without disturbing the fragile artifact, then sort their discoveries by color or shape.',
    materialsNeeded: ['Kinetic sand or cornmeal tray', 'Small plastic figurines or stones', 'Clean paintbrush'],
    targetSkills: ['Finger isolation and tripod grip', 'Patience & focused attention', 'Sensory regulation'],
    estimatedMinutes: 20,
    isScreenFree: true,
  },

  // TIER 2: MIDDLE CHILDHOOD (7-9)
  {
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    category: PlayCategory.LOGIC_PUZZLE,
    title: 'Secret Agent Cipher & Coordinate Grid Search',
    summary:
      'Deductive riddle hunt using Caesar ciphers and coordinate grids to locate household treasure clues.',
    instructions:
      'Write 3 clues encoded with a simple A=1, B=2 cipher or a mirror alphabet cipher. Hide clues around the living room and provide a secret agent key card. Child must decode each clue mathematically, revealing the location of the next clue.',
    materialsNeeded: ['Paper', 'Pencil', 'Cipher decoder key', 'Small hidden token or bookmark'],
    targetSkills: ['Deductive logic', 'Symbolic substitution', 'Pattern recognition'],
    estimatedMinutes: 25,
    isScreenFree: true,
  },
  {
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    category: PlayCategory.BOREDOM_BUSTER,
    title: 'Living Room Floor is Lava Physics Obstacle Course',
    summary:
      'Dynamic physical agility course demanding motor sequencing, balance, and risk calibration.',
    instructions:
      'Lay couch cushions, yoga mats, and stepping stools across the room. Establish the rule: touching the rug resets the timer. Introduce rules like "Must balance a beanbag on your head across the hallway" or "Only single-foot hops between green cushions."',
    materialsNeeded: ['Couch cushions', 'Yoga mats or pillows', 'Timer / stopwatch'],
    targetSkills: ['Gross motor balance', 'Proprioceptive input', 'Strategic route planning'],
    estimatedMinutes: 30,
    isScreenFree: true,
  },

  // TIER 3: PRE-TEEN (10-12)
  {
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    category: PlayCategory.LOGIC_PUZZLE,
    title: 'Pawn Wars & Knight Tour Chess Mini-Games',
    summary:
      'Deconstructed chess drills emphasizing tactical anticipation, pawn structures, and geometric thinking.',
    instructions:
      'Set up only the 8 pawns on each side of the chess board. The first player to reach the opposite back rank wins. Once mastered, set up a single knight and challenge the player to visit all 4 corners of the board in the minimum number of legal moves.',
    materialsNeeded: ['Standard chess board and pieces'],
    targetSkills: ['Multi-step anticipation', 'Spatial geometry', 'Calculated risk-taking'],
    estimatedMinutes: 20,
    isScreenFree: true,
  },
  {
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    category: PlayCategory.MAKER,
    title: 'Cardboard Automata & Marble Coaster Engineering',
    summary:
      'Hands-on kinetic sculpture using gravity, inclined planes, and recycled cardboard tubes.',
    instructions:
      'Using recycled cardboard tubes, painter tape, and cardboard boxes, construct a multi-level marble run taped to a wall or door. The challenge: the marble must take at least 5 full seconds to travel from top to bottom without stalling or flying off tracks.',
    materialsNeeded: ['Paper towel rolls', 'Painter tape (wall-safe)', 'Marbles or wooden balls', 'Scissors'],
    targetSkills: ['Kinetic physics (friction & acceleration)', 'Structural design', 'Perseverance'],
    estimatedMinutes: 35,
    isScreenFree: true,
  },

  // TIER 4: EARLY ADOLESCENCE (13-15)
  {
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    category: PlayCategory.MAKER,
    title: 'Stop-Motion Claymation / Papercraft Film Studio',
    summary:
      'Creative visual storytelling, frame-by-frame pacing, and character development using screen-free physical sets.',
    instructions:
      'Build a miniature set inside a shoebox using construction paper and clay figurines. Plan an 8-frame storyboard with a beginning, dramatic twist, and conclusion. Capture 10 frames per second using a fixed phone mount, then add sound effects physically by recording kitchen items.',
    materialsNeeded: ['Modeling clay or paper cutouts', 'Shoebox or cardboard backdrop', 'Table lamp for lighting'],
    targetSkills: ['Visual storytelling', 'Patience & micro-detail focus', 'Creative craftsmanship'],
    estimatedMinutes: 45,
    isScreenFree: false,
  },
  {
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    category: PlayCategory.LOGIC_PUZZLE,
    title: 'Sudoku & Nonogram Logic Battle',
    summary:
      'Advanced algorithmic grid deduction developing working memory, elimination proofs, and mental stamina.',
    instructions:
      'Solve a 9x9 Medium Sudoku or a 15x15 Nonogram puzzle together. Practice verbalizing logical deductions: "This cell cannot be a 4 because Row 3 already contains 4 and Box 1 has 4. Therefore, by elimination..."',
    materialsNeeded: ['Pencil', 'Printed Sudoku or Nonogram grid booklet'],
    targetSkills: ['Executive function', 'Deductive elimination', 'Cognitive persistence'],
    estimatedMinutes: 25,
    isScreenFree: true,
  },

  // TIER 5: LATE ADOLESCENCE (16-18)
  {
    targetTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    category: PlayCategory.LOGIC_PUZZLE,
    title: 'Game Theory & The Iterated Prisoner Dilemma',
    summary:
      'Strategic simulation exploring trust, reciprocal altruism, and Tit-for-Tat mathematical dynamics.',
    instructions:
      'Play 10 consecutive rounds of a matrix decision game using playing cards (Red = Betray/Defect, Black = Cooperate). Calculate cumulative point outcomes after each round. Discuss why "Tit-for-Tat" (cooperate first, then mirror opponent last move) outperforms pure greed in repeated social interactions.',
    materialsNeeded: ['Deck of standard playing cards', 'Score sheet and pen'],
    targetSkills: ['Game theory & strategic empathy', 'Probabilistic forecasting', 'Ethics & reciprocity'],
    estimatedMinutes: 30,
    isScreenFree: true,
  },
];

export async function seedBrainGames(prisma: PrismaClient): Promise<void> {
  console.log(`[Seed] Seeding ${BRAIN_GAMES_SEED.length} purposeful brain games & activities...`);

  for (const item of BRAIN_GAMES_SEED) {
    const existing = await prisma.brainGameActivity.findFirst({
      where: {
        title: item.title,
        targetTier: item.targetTier,
      },
    });

    if (existing) {
      await prisma.brainGameActivity.update({
        where: { id: existing.id },
        data: {
          category: item.category,
          summary: item.summary,
          instructions: item.instructions,
          materialsNeeded: item.materialsNeeded,
          targetSkills: item.targetSkills,
          estimatedMinutes: item.estimatedMinutes,
          isScreenFree: item.isScreenFree,
        },
      });
    } else {
      await prisma.brainGameActivity.create({
        data: item,
      });
    }
  }

  console.log(`[Seed] Successfully seeded ${BRAIN_GAMES_SEED.length} brain games.`);
}
