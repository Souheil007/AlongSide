import type { PrismaClient } from '@prisma/client';
import { DevelopmentalTier, MilestoneCategory } from '@alongside/shared';

export interface MilestoneSeedData {
  targetTier: DevelopmentalTier;
  targetAgeMonths: number;
  category: MilestoneCategory;
  title: string;
  description: string;
  signsToWatch: string;
  clinicalAuthority: string;
  sortOrder: number;
}

export const MILESTONES_SEED_DATA: MilestoneSeedData[] = [
  // TIER 0: INFANCY & TODDLER (0-3 Years / 0-36 Months)
  // 2 Months
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 2,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Social Smile',
    description: 'Calms down when spoken to or picked up; smiles responsively when you talk or smile at baby.',
    signsToWatch: 'Does not respond to loud sounds, does not watch things as they move, or does not smile at people.',
    clinicalAuthority: 'CDC Developmental Milestones (2022 Guidelines)',
    sortOrder: 1,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 2,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Tummy Time Head Lift',
    description: 'Holds head up when on tummy and pushes up slightly with forearms.',
    signsToWatch: 'Does not hold head up when pushed up on tummy; stiff or very floppy limbs.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 2,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 2,
    category: MilestoneCategory.SPEECH_LANGUAGE,
    title: 'Coos and Gurgles',
    description: 'Makes vocal sounds other than crying (oooh, aaah); turns head toward sound of caregiver voice.',
    signsToWatch: 'Does not make sounds or react to sudden sounds.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 3,
  },
  // 4 Months
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 4,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Spontaneous Chuckling & Smiling',
    description: 'Smiles spontaneously, especially at people; chuckles and coos when playful interaction occurs.',
    signsToWatch: 'Does not smile at caregiver, does not coo or make sounds.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 4,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 4,
    category: MilestoneCategory.FINE_MOTOR,
    title: 'Hands to Mouth & Toy Grasp',
    description: 'Brings hands to mouth; opens hands and bats at dangling toys; grasps small rattle.',
    signsToWatch: 'Does not bring objects to mouth; hands persistently fisted.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 5,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 4,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Steady Head Control',
    description: 'Holds head steady without support when held upright; rolls from tummy to back.',
    signsToWatch: 'Significant head lag when pulled to sit; cannot bear weight on legs when feet touch flat surface.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 6,
  },
  // 6 Months
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 6,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Tripod Sitting & Rolling',
    description: 'Rolls from tummy to back and back to tummy; sits with brief support leaning on hands (tripod posture).',
    signsToWatch: 'Cannot roll in either direction; extreme stiffness or floppiness.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 7,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 6,
    category: MilestoneCategory.SPEECH_LANGUAGE,
    title: 'Babbling Consonants (Ba-ba, Da-da)',
    description: 'Strings consonant-vowel sounds together (ba, da, ma); vocalizes excitement and displeasure.',
    signsToWatch: 'Does not make vowel sounds or respond to sounds around them.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 8,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 6,
    category: MilestoneCategory.COGNITIVE,
    title: 'Object Transfer & Curious Exploration',
    description: 'Passes a toy from one hand to the other; looks at self in mirror with curiosity.',
    signsToWatch: 'Does not reach for toys; does not bring objects to mouth.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 9,
  },
  // 9 Months
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 9,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Stranger Wariness & Attachment',
    description: 'Shows stranger anxiety; clingy with familiar adults; smiles and reaches for primary caregivers.',
    signsToWatch: 'Does not recognize familiar people; avoids eye contact.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 10,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 9,
    category: MilestoneCategory.FINE_MOTOR,
    title: 'Pincer Grasp Development',
    description: 'Uses thumb and index finger in crude pincer grasp to pick up small pieces of food (puff cereal).',
    signsToWatch: 'Does not pick up small objects; uses only one side of the body.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 11,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 9,
    category: MilestoneCategory.COGNITIVE,
    title: 'Object Permanence & Peek-a-Boo',
    description: 'Looks for things they see you hide under a cloth; loves peek-a-boo and dropping items to watch them fall.',
    signsToWatch: 'Does not search for dropped or hidden objects.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 12,
  },
  // 12 Months
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 12,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Cruising & Independent Standing',
    description: 'Pulls up to stand and walks holding onto furniture (cruising); may take first unsupported steps.',
    signsToWatch: 'Cannot stand with support; cannot crawl or drag body forward.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 13,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 12,
    category: MilestoneCategory.SPEECH_LANGUAGE,
    title: 'First Meaningful Words & Waving',
    description: 'Uses mama or dada with specific meaning; waves bye-bye; shakes head no.',
    signsToWatch: 'Does not wave or point; loses any previously acquired speech sounds.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 14,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 12,
    category: MilestoneCategory.COGNITIVE,
    title: 'Functional Object Use',
    description: 'Puts things in a container and takes them out; drinks from an open cup with assistance; brushes hair with brush.',
    signsToWatch: 'Does not imitate actions or use simple tools/toys functionally.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 15,
  },
  // 18 Months
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 18,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Independent Walking & Climbing',
    description: 'Walks independently without holding on; walks up steps with help; pulls toys while walking.',
    signsToWatch: 'Cannot walk independently; loses walking ability.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 16,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 18,
    category: MilestoneCategory.SPEECH_LANGUAGE,
    title: 'Word Spurt (10+ Words & Pointing)',
    description: 'Says 10 or more words clearly; points to show someone something interesting (shared attention).',
    signsToWatch: 'Fewer than 6 words; does not point to communicate desires or interests.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 17,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 18,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Simple Pretend Play',
    description: 'Feeds a stuffed animal or doll with a toy bottle; copies chores like wiping surfaces or sweeping.',
    signsToWatch: 'Does not notice or care when a caregiver leaves or returns; does not imitate.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 18,
  },
  // 24 Months (2 Years)
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 24,
    category: MilestoneCategory.SPEECH_LANGUAGE,
    title: 'Two-Word Phrases (More milk, Big truck)',
    description: 'Combines at least two words into simple phrases; vocabulary of 50+ words; points to pictures in books when named.',
    signsToWatch: 'Does not speak in 2-word phrases; does not imitate words and actions.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 19,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 24,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Running & Kicking a Ball',
    description: 'Runs steadily; kicks a ball forward; jumps down with both feet from a bottom stair.',
    signsToWatch: 'Cannot walk steadily; does not know how to run; frequent uncoordinated falls.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 20,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 24,
    category: MilestoneCategory.COGNITIVE,
    title: 'Two-Step Directions & Sorting',
    description: 'Follows 2-step instructions (e.g., "Pick up the ball and put it in the basket"); sorts shapes and colors.',
    signsToWatch: 'Does not follow simple commands; cannot copy a straight line.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 21,
  },
  // 36 Months (3 Years)
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 36,
    category: MilestoneCategory.SPEECH_LANGUAGE,
    title: 'Conversational Turn-Taking (3+ Word Sentences)',
    description: 'Asks who, what, where questions; talks well enough for strangers to understand most words.',
    signsToWatch: 'Speech is unclear to family; drools constantly; cannot speak in sentences.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 22,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 36,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Parallel to Cooperative Play & Emotion Recognition',
    description: 'Notices other children and joins them in play; shows affection for friends without prompting; calms down within 10 minutes after parent leaves.',
    signsToWatch: 'Extreme separation anxiety; avoids eye contact; shows no interest in other children.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 23,
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 36,
    category: MilestoneCategory.FINE_MOTOR,
    title: 'Draws a Circle & Uses Child Scissors',
    description: 'Draws a circle after being shown; turns door handles; unscrews jar lids; strings large beads.',
    signsToWatch: 'Cannot manipulate small objects; pencil grasp absent or extremely rigid.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 24,
  },

  // TIER 1: EARLY CHILDHOOD (4-6 Years / 48-72 Months)
  // 4 Years
  {
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetAgeMonths: 48,
    category: MilestoneCategory.COGNITIVE,
    title: 'Story Retelling & Counting to 10',
    description: 'Retells portions of a story; names some colors and numbers; understands time concepts like today and tomorrow.',
    signsToWatch: 'Cannot count 4 objects; does not understand concept of "same" vs "different".',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 25,
  },
  {
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetAgeMonths: 48,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Theory of Mind & Imaginative Roleplay',
    description: 'Plays "mom" or "dad"; negotiates solutions to conflicts in play; expresses sympathy when a peer is sad.',
    signsToWatch: 'Shows aggressive behavior without remorse; unable to engage in fantasy or pretend play.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 26,
  },
  {
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetAgeMonths: 48,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Hopping on One Foot & Tricycle Pedaling',
    description: 'Hops on one foot for several seconds; catches a bounced ball most of the time; pedals a tricycle smoothly.',
    signsToWatch: 'Cannot jump in place; cannot ride a tricycle or pedal.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 27,
  },
  // 5 Years
  {
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetAgeMonths: 60,
    category: MilestoneCategory.FINE_MOTOR,
    title: 'Prints Name & Uses Cutlery',
    description: 'Prints some letters or numbers; uses a fork and spoon adeptly; buttons clothing and zippers.',
    signsToWatch: 'Cannot draw a person with 6 body parts; cannot use scissors or grip pencil effectively.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 28,
  },
  {
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetAgeMonths: 60,
    category: MilestoneCategory.SPEECH_LANGUAGE,
    title: 'Complex Sentences with Future Tense',
    description: 'Uses future tense (e.g., "Grandma will be here tomorrow"); tells stories with a beginning, middle, and end.',
    signsToWatch: 'Does not speak in full sentences; stutters severely or has difficulty articulating sounds.',
    clinicalAuthority: 'CDC / AAP Bright Futures',
    sortOrder: 29,
  },

  // TIER 2: MIDDLE CHILDHOOD (7-9 Years / 84-108 Months)
  // 7 Years
  {
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    targetAgeMonths: 84,
    category: MilestoneCategory.COGNITIVE,
    title: 'Concrete Operational Thinking & Early Math',
    description: 'Demonstrates understanding of conservation of volume and mass; solves multi-step addition and subtraction problems.',
    signsToWatch: 'Significant difficulty understanding number relationships or letter-sound correspondence.',
    clinicalAuthority: 'AAP Bright Futures 4th Edition',
    sortOrder: 30,
  },
  {
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    targetAgeMonths: 84,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Peer Group Fairness & Rule Consciousness',
    description: 'Places high value on fair play and rules in board games and sports; forms strong best-friend affinities.',
    signsToWatch: 'Extreme difficulty taking turns; severe social isolation or inability to maintain any friendships.',
    clinicalAuthority: 'AAP Bright Futures 4th Edition',
    sortOrder: 31,
  },
  // 8-9 Years
  {
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    targetAgeMonths: 108,
    category: MilestoneCategory.COGNITIVE,
    title: 'Independent Reading for Pleasure & Logic',
    description: 'Reads chapter books independently with comprehension; grasps cause-and-effect in historical or scientific events.',
    signsToWatch: 'Cannot read simple sentences; severe working memory deficits.',
    clinicalAuthority: 'AAP Bright Futures 4th Edition',
    sortOrder: 32,
  },
  {
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    targetAgeMonths: 108,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Organized Team Sports & Bilateral Coordination',
    description: 'Coordinates complex motor sequences (dribbling a basketball, swimming stroke transitions, riding a 2-wheel bicycle).',
    signsToWatch: 'Persistent lack of balance; avoids all physical activities due to motor clumsiness.',
    clinicalAuthority: 'AAP Bright Futures 4th Edition',
    sortOrder: 33,
  },

  // TIER 3: PRE-TEEN (10-12 Years / 120-144 Months)
  // 10-11 Years
  {
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    targetAgeMonths: 120,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Adrenarche & Peer Cultural Orientation',
    description: 'Shifts social reference frame toward peer group norms, inside humor, and tween slang; navigates group dynamics.',
    signsToWatch: 'Severe social withdrawal, sudden loss of interest in peers, or persistent school refusal.',
    clinicalAuthority: 'AAP Bright Futures 4th Edition',
    sortOrder: 34,
  },
  {
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    targetAgeMonths: 132,
    category: MilestoneCategory.COGNITIVE,
    title: 'Abstract Reasoning & Perspective Taking',
    description: 'Understands multiple viewpoints on moral and ethical questions; recognizes sarcasm and nuanced intent.',
    signsToWatch: 'Rigid black-and-white thinking without ability to consider another person point of view.',
    clinicalAuthority: 'AAP Bright Futures 4th Edition',
    sortOrder: 35,
  },
  {
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    targetAgeMonths: 144,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Digital Identity & Privacy Awareness',
    description: 'Distinguishes between public digital sharing and private communication; begins negotiating personal boundaries.',
    signsToWatch: 'Unable to discern online stranger danger or shares private personal identifiers recklessly.',
    clinicalAuthority: 'AAP Bright Futures / Alongside Pediatric Guidelines',
    sortOrder: 36,
  },

  // TIER 4: EARLY ADOLESCENCE (13-15 Years / 156-180 Months)
  // 13-14 Years
  {
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    targetAgeMonths: 156,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Identity Formation & Emotional Autonomy',
    description: 'Forms independent musical, artistic, and social preferences; expresses individuation from parental beliefs respectfully.',
    signsToWatch: 'Persistent depressive affect, drastic changes in sleep or appetite, self-harm ideation.',
    clinicalAuthority: 'AAP Adolescent Health Guidelines',
    sortOrder: 37,
  },
  {
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    targetAgeMonths: 168,
    category: MilestoneCategory.COGNITIVE,
    title: 'Hypothetical Deductive Reasoning',
    description: 'Can formulate hypotheses and systematically test solutions in academic and social contexts.',
    signsToWatch: 'Severe academic disengagement or executive dysfunction preventing basic school completion.',
    clinicalAuthority: 'AAP Adolescent Health Guidelines',
    sortOrder: 38,
  },
  {
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    targetAgeMonths: 180,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Bilateral Agreement Adherence & Tech Regulation',
    description: 'Demonstrates capacity to follow household tech curfews (8:30 PM device dock) and self-monitor screen fatigue.',
    signsToWatch: 'Secretive late-night device hoarding accompanied by severe daytime academic drop and irritability.',
    clinicalAuthority: 'AAP Media Use Guidelines',
    sortOrder: 39,
  },

  // TIER 5: LATE ADOLESCENCE (16-18 Years / 192-216 Months)
  // 16-18 Years
  {
    targetTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    targetAgeMonths: 192,
    category: MilestoneCategory.COGNITIVE,
    title: 'Long-Term Planning & Consequence Evaluation',
    description: 'Plans college, vocational training, or employment pathways; manages complex scheduling and personal finances.',
    signsToWatch: 'Inability to foresee basic consequences of risky behavior or persistent impulse disregulation.',
    clinicalAuthority: 'AAP Bright Futures Young Adult Transition',
    sortOrder: 40,
  },
  {
    targetTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    targetAgeMonths: 204,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Civic Identity & Mature Conflict Resolution',
    description: 'Engages in community, civic, or ethical causes; resolves interpersonal disagreements with peers through dialogue.',
    signsToWatch: 'Violent or self-destructive conflict escalation; legal entanglements.',
    clinicalAuthority: 'AAP Bright Futures Young Adult Transition',
    sortOrder: 41,
  },
  {
    targetTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    targetAgeMonths: 216,
    category: MilestoneCategory.COGNITIVE,
    title: 'Independent Healthcare & Self-Advocacy',
    description: 'Schedules own medical and dental appointments; understands personal medical history, allergies, and prescriptions.',
    signsToWatch: 'Complete helplessness with basic daily life logistics and self-care maintenance.',
    clinicalAuthority: 'AAP Transition to Adult Care Clinical Report',
    sortOrder: 42,
  },
];

export async function seedMilestones(prisma: PrismaClient): Promise<void> {
  console.log(`[Seed] Seeding ${MILESTONES_SEED_DATA.length} canonical CDC & Bright Futures developmental milestones...`);

  for (const item of MILESTONES_SEED_DATA) {
    const existing = await prisma.milestone.findFirst({
      where: {
        title: item.title,
        targetTier: item.targetTier,
      },
    });

    if (existing) {
      await prisma.milestone.update({
        where: { id: existing.id },
        data: {
          targetAgeMonths: item.targetAgeMonths,
          category: item.category,
          description: item.description,
          signsToWatch: item.signsToWatch,
          clinicalAuthority: item.clinicalAuthority,
          sortOrder: item.sortOrder,
        },
      });
    } else {
      await prisma.milestone.create({
        data: item,
      });
    }
  }

  console.log(`[Seed] Successfully seeded ${MILESTONES_SEED_DATA.length} milestones.`);
}
