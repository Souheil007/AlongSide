import type { PrismaClient } from '@prisma/client';
import { DevelopmentalTier } from '@alongside/shared';

export interface BehaviorGuideSeedData {
  targetTier: DevelopmentalTier;
  slug: string;
  triggerSituation: string;
  underlyingNeed: string;
  coRegulationScript: string;
  authoritativeLimit: string;
}

export const BEHAVIOR_GUIDES_SEED: BehaviorGuideSeedData[] = [
  // TIER 0: INFANCY & TODDLER (0-3)
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    slug: 'toddler-grocery-store-meltdown',
    triggerSituation: 'Explosive tantrum in the supermarket checkout aisle over a forbidden candy or toy.',
    underlyingNeed:
      'HALT vulnerability (Hungry, Anxious, Lonely, or Tired) combined with sensory overload and an immature prefrontal cortex unable to modulate acute disappointment.',
    coRegulationScript:
      '"You really, really wanted that candy. It looks sweet and colorful, and it is so hard to hear no when you want something right now. I hear you, sweetie. I am right here with you."',
    authoritativeLimit:
      'Gently place a protective hand on child shoulder or hold them calmly in your arms. "We are not buying the candy today. It is okay to be mad and cry. I will hold you while you let that out."',
  },
  {
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    slug: 'toddler-hitting-or-biting-frustration',
    triggerSituation: 'Child hits, bites, or throws a toy when an adult or playmate takes something away.',
    underlyingNeed:
      'Pre-verbal amygdala hijack: physical fight-or-flight response triggered before expressive language circuits can articulate "I was playing with that!".',
    coRegulationScript:
      '"You were so mad when that toy was taken! Your body felt like exploding. It is okay to feel furious."',
    authoritativeLimit:
      'Gently but firmly hold child hands down: "I will not let you hit or bite. Hitting hurts. You can stomp your feet or squeeze my hands tight, but hitting stops now."',
  },

  // TIER 1: EARLY CHILDHOOD (4-6)
  {
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    slug: 'preschooler-bedtime-stall-and-refusal',
    triggerSituation: 'Repeated stall tactics, demands for 5 glasses of water, tears, and refusing to stay in bed at night.',
    underlyingNeed:
      'Separation anxiety in the dark, cortisol spikes from overtiredness, or fear of missing out on adult evening connection.',
    coRegulationScript:
      '"Bedtime feels lonely sometimes, and saying goodbye to playtime is hard. I love you so much, and you are completely safe in this warm bed. My love stays with you all night long."',
    authoritativeLimit:
      'Establish a strict, predictable 3-step routine (Bath, 2 Books, Song). "We read our two books, and now our story time is complete. I will come back and check on you in 5 minutes once you are lying quietly."',
  },
  {
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    slug: 'preschooler-screen-time-transition-meltdown',
    triggerSituation: 'Screaming, collapsing on the floor, or thrashing when the TV or tablet is turned off.',
    underlyingNeed:
      'Sudden dopamine drop: digital screens provide continuous rapid dopamine stimulation; turning off the screen causes an abrupt neurochemical deficit that feels like physical distress.',
    coRegulationScript:
      '"Turning off the show feels terrible right now. Your brain was having so much fun with Bluey, and your body feels sad and angry that it ended. Take a big dragon breath with me."',
    authoritativeLimit:
      'Provide a 2-minute visual countdown beforehand. When time is up, calmly turn off the device yourself without lecturing: "The show is all done for today. Would you like to march like an elephant or crawl like a bear to the dinner table?"',
  },

  // TIER 2: MIDDLE CHILDHOOD (7-9)
  {
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    slug: 'middle-child-board-game-defeat-rage',
    triggerSituation: 'Flipping the board game, accusing family members of cheating, or storming out after losing.',
    underlyingNeed:
      'Fragile early competence: self-worth is tightly coupled to winning; perceived failure feels like an existential rejection or evidence of personal inadequacy.',
    coRegulationScript:
      '"Losing feels heavy and unfair when you tried so hard to win. It is frustrating to watch someone else take the trophy. I know how much you wanted that victory."',
    authoritativeLimit:
      '"It is normal to feel disappointed, but we respect the game and the players. We do not throw pieces or call names. Take a 5-minute breather on the porch, and then come help pack up the pieces."',
  },

  // TIER 3: PRE-TEEN (10-12)
  {
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    slug: 'tween-eye-roll-and-disrespectful-door-slam',
    triggerSituation: 'Child rolls eyes, mutters "You ruin my entire life!", and slams bedroom door when asked to do homework.',
    underlyingNeed:
      'Budding adolescent autonomy clashing against dependence; hormonal surges (adrenarche) reducing impulse control while seeking dignity and privacy.',
    coRegulationScript:
      'Do not knock immediately or shout back. Wait 10 minutes until cortisol clears. Speak through or outside the door: "I heard how furious you were. I love you too much to fight with you when you are this angry. Let me know when you are ready to talk."',
    authoritativeLimit:
      'Once calm: "You are allowed to feel angry and overwhelmed by homework, but slamming doors and eye-rolling are disrespectful. In our family, we speak with dignity. Let us sit down and break this assignment into 15-minute chunks together."',
  },

  // TIER 4: EARLY ADOLESCENCE (13-15)
  {
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    slug: 'teen-bedtime-phone-curfew-defiance',
    triggerSituation: 'Teen refuses to dock smartphone in the hallway charging station at 8:30 PM, claiming "All my friends are talking right now!".',
    underlyingNeed:
      'Intense Fear Of Missing Out (FOMO) and social anxiety; teen social currency is mediated through late-night group chats where exclusion feels catastrophic.',
    coRegulationScript:
      '"I know your friends are active right now, and I understand that feeling disconnected feels lonely. I am not trying to punish you or isolate you from your friends."',
    authoritativeLimit:
      '"Our Bilateral Pact rule is clear: sleep and developing brains are protected in this house. Devices sleep in the charging basket at 8:30 PM so you wake up restored. Text your group chat: ‘Heading off to sleep, talk tomorrow morning.’ Hand the phone to the basket now."',
  },

  // TIER 5: LATE ADOLESCENCE (16-18)
  {
    targetTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    slug: 'older-teen-academic-shut-down-and-cynicism',
    triggerSituation: 'Teen stops doing schoolwork, becomes cynical, and says "None of this matters anyway, college is a scam".',
    underlyingNeed:
      'Overwhelming future anxiety, fear of adulthood failure, and emotional exhaustion masked as cynical indifference.',
    coRegulationScript:
      '"The expectations on you right now are enormous, and feeling overwhelmed makes anyone want to throw their hands up and walk away. You do not have to have your whole life figured out today. Let us just look at this week."',
    authoritativeLimit:
      '"Cynicism is an easy defense against fear, but checking out will close doors you might want open later. We will not let you give up on yourself. Let us schedule an hour with your school counselor on Thursday, and we will walk in with you."',
  },
];

export async function seedBehaviorGuides(prisma: PrismaClient): Promise<void> {
  console.log(`[Seed] Seeding ${BEHAVIOR_GUIDES_SEED.length} behavioral translation guides & de-escalation scripts...`);

  for (const item of BEHAVIOR_GUIDES_SEED) {
    await prisma.behaviorGuide.upsert({
      where: { slug: item.slug },
      update: {
        targetTier: item.targetTier,
        triggerSituation: item.triggerSituation,
        underlyingNeed: item.underlyingNeed,
        coRegulationScript: item.coRegulationScript,
        authoritativeLimit: item.authoritativeLimit,
      },
      create: item,
    });
  }

  console.log(`[Seed] Successfully seeded ${BEHAVIOR_GUIDES_SEED.length} behavior guides.`);
}
