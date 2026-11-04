import {
  DevelopmentalTier,
  type BehaviorGuideDTO,
} from '@alongside/shared';
import { apiClient } from './client';

export interface BehaviorGuideUI extends BehaviorGuideDTO {
  category: 'tantrums' | 'defiance' | 'aggression' | 'sibling' | 'lying' | 'bedtime';
  categoryLabel: string;
  whatNotToSay: string;
  physiologicalTrigger: string;
}

export const CANONICAL_BEHAVIOR_GUIDES: BehaviorGuideUI[] = [
  // TIER 0: INFANCY & TODDLER (0-3)
  {
    id: 'beh-t0-grocery-meltdown',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    slug: 'toddler-grocery-store-meltdown',
    category: 'tantrums',
    categoryLabel: 'Tantrums & Meltdowns',
    triggerSituation: 'Explosive tantrum in the supermarket checkout aisle over a forbidden candy or toy.',
    underlyingNeed:
      'HALT vulnerability (Hungry, Anxious, Lonely, or Tired) combined with sensory overload and an immature prefrontal cortex unable to modulate acute disappointment.',
    physiologicalTrigger:
      'Cortisol surge + amygdala hijack; sensory stimulation from supermarket lights and sounds exceeds nervous system capacity.',
    whatNotToSay:
      'Stop crying right now or we are leaving immediately! Everyone is looking at you!',
    coRegulationScript:
      'You really, really wanted that candy. It looks sweet and colorful, and it is so hard to hear no when you want something right now. I hear you, sweetie. I am right here with you.',
    authoritativeLimit:
      'Gently place a protective hand on child shoulder or hold them calmly in your arms. "We are not buying the candy today. It is okay to be mad and cry. I will hold you while you let that out."',
  },
  {
    id: 'beh-t0-hitting-biting',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    slug: 'toddler-hitting-or-biting-frustration',
    category: 'aggression',
    categoryLabel: 'Hitting & Biting',
    triggerSituation: 'Child hits, bites, or throws a toy when an adult or playmate takes something away.',
    underlyingNeed:
      'Pre-verbal amygdala hijack: physical fight-or-flight response triggered before expressive language circuits can articulate "I was playing with that!".',
    physiologicalTrigger:
      'Motor impulse before verbal inhibition; broca\'s area is not yet mature enough to outrace the limbic fight reflex.',
    whatNotToSay:
      'Bad boy! Go sit in time-out right now and think about what you did! We don\'t like hitters.',
    coRegulationScript:
      'You were so mad when that toy was taken! Your body felt like exploding. It is okay to feel furious. Big feelings are safe with me.',
    authoritativeLimit:
      'Gently but firmly hold child hands down: "I will not let you hit or bite. Hitting hurts. You can stomp your feet or squeeze my hands tight, but hitting stops now."',
  },

  // TIER 1: EARLY CHILDHOOD (4-6)
  {
    id: 'beh-t1-bedtime-stall',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    slug: 'preschooler-bedtime-stall-and-refusal',
    category: 'bedtime',
    categoryLabel: 'Bedtime Stalls',
    triggerSituation: 'Repeated stall tactics, demands for 5 glasses of water, tears, and refusing to stay in bed at night.',
    underlyingNeed:
      'Separation anxiety in the dark, cortisol spikes from overtiredness, or fear of missing out on adult evening connection.',
    physiologicalTrigger:
      'Adenosine sleep pressure creates emotional dysregulation; darkness triggers evolutionary separation threat.',
    whatNotToSay:
      'You are driving me crazy! Go to sleep right now or tomorrow\'s park trip is canceled!',
    coRegulationScript:
      'Bedtime feels lonely sometimes, and saying goodbye to playtime is hard. I love you so much, and you are completely safe in this warm bed. My love stays with you all night long.',
    authoritativeLimit:
      'Establish a strict, predictable 3-step routine (Bath, 2 Books, Song). "We read our two books, and now our story time is complete. I will come back and check on you in 5 minutes once you are lying quietly."',
  },
  {
    id: 'beh-t1-screen-cutoff',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    slug: 'preschooler-screen-time-transition-meltdown',
    category: 'defiance',
    categoryLabel: 'Defiance & "No!"',
    triggerSituation: 'Screaming, collapsing on the floor, or thrashing when the TV or tablet is turned off.',
    underlyingNeed:
      'Sudden dopamine drop: digital screens provide continuous rapid dopamine stimulation; turning off the screen causes an abrupt neurochemical deficit that feels like physical distress.',
    physiologicalTrigger:
      'Dopamine withdrawal in the nucleus accumbens feels like physical pain to a young child.',
    whatNotToSay:
      'That\'s it! No iPad for a whole month! If you act like this you will never watch Bluey again!',
    coRegulationScript:
      'Turning off the show feels terrible right now. Your brain was having so much fun with Bluey, and your body feels sad and angry that it ended. Take a big dragon breath with me.',
    authoritativeLimit:
      'Provide a 2-minute visual countdown beforehand. When time is up, calmly turn off the device yourself without lecturing: "The show is all done for today. Would you like to march like an elephant or crawl like a bear to the dinner table?"',
  },

  // TIER 2: MIDDLE CHILDHOOD (7-9)
  {
    id: 'beh-t2-board-game-rage',
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    slug: 'middle-child-board-game-defeat-rage',
    category: 'tantrums',
    categoryLabel: 'Tantrums & Meltdowns',
    triggerSituation: 'Flipping the board game, accusing family members of cheating, or storming out after losing.',
    underlyingNeed:
      'Fragile early competence: self-worth is tightly coupled to winning; perceived failure feels like an existential rejection or evidence of personal inadequacy.',
    physiologicalTrigger:
      'Shame response triggers adrenergic surge, converting perceived loss into aggressive self-protection.',
    whatNotToSay:
      'You are such a sore loser! Nobody will ever want to play with you if you act like a baby!',
    coRegulationScript:
      'Losing feels heavy and unfair when you tried so hard to win. It is frustrating to watch someone else take the trophy. I know how much you wanted that victory.',
    authoritativeLimit:
      'It is normal to feel disappointed, but we respect the game and the players. We do not throw pieces or call names. Take a 5-minute breather on the porch, and then come help pack up the pieces.',
  },
  {
    id: 'beh-t2-sibling-conflict',
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    slug: 'sibling-toy-fighting-escalation',
    category: 'sibling',
    categoryLabel: 'Sibling Fighting',
    triggerSituation: 'Screaming matches and physical wrestling between siblings over who gets the game controller or favorite chair.',
    underlyingNeed:
      'Territorial scarcity anxiety and perceived favoritism; testing whether parental love and attention are equally distributed.',
    physiologicalTrigger:
      'Social hierarchy threat activating fight response; fear of displacement in the family ecosystem.',
    whatNotToSay:
      'You are the older one, you should know better! Give it to your brother right now!',
    coRegulationScript:
      'Both of you want this right now, and both of you are furious. I see two kids who love this game and feel crowded. Step apart and let your shoulders drop.',
    authoritativeLimit:
      'The item goes on the shelf for 10 minutes until you both agree on a timer schedule. I will not decide for you, but the fighting stops right now.',
  },

  // TIER 3: PRE-TEEN (10-12)
  {
    id: 'beh-t3-door-slam',
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    slug: 'tween-eye-roll-and-disrespectful-door-slam',
    category: 'defiance',
    categoryLabel: 'Defiance & "No!"',
    triggerSituation: 'Child rolls eyes, mutters "You ruin my entire life!", and slams bedroom door when asked to do homework.',
    underlyingNeed:
      'Budding adolescent autonomy clashing against dependence; hormonal surges (adrenarche) reducing impulse control while seeking dignity and privacy.',
    physiologicalTrigger:
      'Adrenarche hormonal fluctuations amplify reactivity; bedroom door represents boundary of personal autonomy.',
    whatNotToSay:
      'Do not roll your eyes at me! Open this door right now or I am taking your phone away permanently!',
    coRegulationScript:
      'I heard how furious you were. I love you too much to fight with you when you are this angry. Let me know when you are ready to talk.',
    authoritativeLimit:
      'Once calm: "You are allowed to feel angry and overwhelmed by homework, but slamming doors and eye-rolling are disrespectful. In our family, we speak with dignity. Let us sit down and break this assignment into 15-minute chunks together."',
  },
  {
    id: 'beh-t3-lying-secrecy',
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    slug: 'tween-lying-secret-device-use',
    category: 'lying',
    categoryLabel: 'Lying & Secrecy',
    triggerSituation: 'Caught hiding device under pillow past curfew or denying that homework was left incomplete.',
    underlyingNeed:
      'Fear of punishment, peer FOMO anxiety, and developing a private self-identity that feels unsafe to disclose.',
    physiologicalTrigger:
      'Fear of social death (disconnect from peers) outweighs rational risk of parental discipline.',
    whatNotToSay:
      'You are a liar! How can I ever trust a single word you say again? Give me all your electronics!',
    coRegulationScript:
      'I know you hid the phone because you were afraid I would be angry, and because talking to your friends felt really urgent. It took guts to admit the truth once caught.',
    authoritativeLimit:
      'Trust is built on transparency, not perfection. The phone stays in the kitchen basket for 48 hours to reset habits. We will review our agreement together on Sunday.',
  },

  // TIER 4: EARLY ADOLESCENCE (13-15)
  {
    id: 'beh-t4-phone-curfew-pushback',
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    slug: 'teen-bedtime-phone-curfew-defiance',
    category: 'defiance',
    categoryLabel: 'Defiance & "No!"',
    triggerSituation: 'Teen refuses to dock smartphone in the hallway charging station at 8:30 PM, claiming "All my friends are talking right now!".',
    underlyingNeed:
      'Intense Fear Of Missing Out (FOMO) and social anxiety; teen social currency is mediated through late-night group chats where exclusion feels catastrophic.',
    physiologicalTrigger:
      'Evolutionary social belonging hypersensitivity; exclusion signals peer death in ancestral neuroscience.',
    whatNotToSay:
      'I pay for this phone! Hand it over or I\'ll turn off the cellular service right this second!',
    coRegulationScript:
      'I know your friends are active right now, and I understand that feeling disconnected feels lonely. I am not trying to punish you or isolate you from your friends.',
    authoritativeLimit:
      'Our Bilateral Pact rule is clear: sleep and developing brains are protected in this house. Devices sleep in the charging basket at 8:30 PM so you wake up restored. Text your group chat: ‘Heading off to sleep, talk tomorrow morning.’ Hand the phone to the basket now.',
  },

  // TIER 5: LATE ADOLESCENCE (16-18)
  {
    id: 'beh-t5-academic-shutdown',
    targetTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    slug: 'older-teen-academic-shut-down-and-cynicism',
    category: 'lying',
    categoryLabel: 'Lying & Secrecy',
    triggerSituation: 'Teen stops doing schoolwork, becomes cynical, and says "None of this matters anyway, college is a scam".',
    underlyingNeed:
      'Overwhelming future anxiety, fear of adulthood failure, and emotional exhaustion masked as cynical indifference.',
    physiologicalTrigger:
      'Chronic stress response resulting in learned helplessness and dorsal vagal shutdown.',
    whatNotToSay:
      'With that attitude, you\'ll end up working minimum wage your whole life! You\'re throwing your future away!',
    coRegulationScript:
      'The expectations on you right now are enormous, and feeling overwhelmed makes anyone want to throw their hands up and walk away. You do not have to have your whole life figured out today. Let us just look at this week.',
    authoritativeLimit:
      'Cynicism is an easy defense against fear, but checking out will close doors you might want open later. We will not let you give up on yourself. Let us schedule an hour with your school counselor on Thursday, and we will walk in with you.',
  },
];

export interface HaltItem {
  letter: 'H' | 'A' | 'L' | 'T';
  name: string;
  trigger: string;
  symptoms: string[];
  physiologicalMechanism: string;
  immediateAction: string;
  script: string;
}

export const HALT_DIAGNOSTICS_DATA: HaltItem[] = [
  {
    letter: 'H',
    name: 'Hungry (Hypoglycemic Crash)',
    trigger: 'Blood Sugar Drop',
    symptoms: [
      'Last ate > 2.5 hours ago',
      'Sudden whining over minor physical sensations',
      'Glassy eyes, sudden clumsiness, or rapid irritability',
    ],
    physiologicalMechanism:
      'Hypoglycemia triggers an immediate adrenaline and cortisol release, hijacking executive function before rational thinking can occur.',
    immediateAction:
      'Offer protein + complex carbs (cheese stick, apple with peanut butter, berries, whole milk) without lecturing.',
    script:
      'Your body engine might be low on fuel right now. Let\'s pause and have a quick bite together before we try to fix anything else.',
  },
  {
    letter: 'A',
    name: 'Anxious / Angry (Autonomy Block & Fight Reflex)',
    trigger: 'Prefrontal Cortex Offline',
    symptoms: [
      'Clenched fists, flushed cheeks, clenched jaw',
      'Shouting "NO!" or throwing objects',
      'Inability to listen to logic or negotiate',
    ],
    physiologicalMechanism:
      'The amygdala perceives a threat (often an autonomy boundary or transition), shutting down prefrontal problem-solving circuits.',
    immediateAction:
      'Drop down to eye level. Reduce words by 80%. Provide physical grounding (open palms, slow breaths).',
    script:
      'You are really, really angry right now. Your body feels like lava. It is completely safe to feel mad. I am right here with you.',
  },
  {
    letter: 'L',
    name: 'Lonely (Attachment Rupture & Disconnection)',
    trigger: 'Attachment Tank Empty',
    symptoms: [
      'Clinginess or provocative negative attention-seeking',
      'Whining tone after parent has been on phone/laptop',
      'Regression into baby talk or sudden helplessness',
    ],
    physiologicalMechanism:
      'Children cannot self-regulate without co-regulation. Perceived social or emotional disconnection activates the mammalian panic system.',
    immediateAction:
      'Put all screens away. Offer 5 minutes of undistracted physical connection (snuggle, back rub, rough-and-tumble play).',
    script:
      'My hands are free. Do you want a big squeeze hug, or do you want to sit next to me until your heart feels warm again?',
  },
  {
    letter: 'T',
    name: 'Tired (Adenosine Sleep Pressure & Sensory Overload)',
    trigger: 'Overtiredness & Overstimulation',
    symptoms: [
      'Hyperactive frenetic energy (the second wind)',
      'Rubbing eyes, zoning out, repetitive crying',
      'Meltdowns over tiny sensory triggers (sock seam, tag, sound)',
    ],
    physiologicalMechanism:
      'High adenosine combined with overtired cortisol spikes creates a fragile state where transitions become neurologically impossible.',
    immediateAction:
      'Dim lights, turn off background noise/music, eliminate choices, transition directly into low-stimulation bedtime or rest.',
    script:
      'Your brain and body worked so hard today. You don\'t have to be big or strong right now. Let\'s dim the lights and rest together.',
  },
];

export async function getBehaviorGuides(
  tier?: string,
  category?: string
): Promise<BehaviorGuideUI[]> {
  try {
    const params = new URLSearchParams();
    if (tier) params.set('tier', tier);

    const qs = params.toString();
    const endpoint = `/api/v1/behavior/guides${qs ? `?${qs}` : ''}`;
    const res = await apiClient<{ guides: BehaviorGuideDTO[] }>(endpoint);

    if (res?.guides && res.guides.length > 0) {
      // Merge with UI attributes from canonical dataset
      return res.guides.map((g) => {
        const canonical = CANONICAL_BEHAVIOR_GUIDES.find(
          (c) => c.slug === g.slug || c.id === g.id
        );
        return {
          ...g,
          category: canonical?.category ?? 'tantrums',
          categoryLabel: canonical?.categoryLabel ?? 'Behavior Guide',
          whatNotToSay:
            canonical?.whatNotToSay ??
            'Stop acting this way immediately or there will be consequences!',
          physiologicalTrigger:
            canonical?.physiologicalTrigger ??
            'Nervous system dysregulation under acute emotional stress.',
        };
      });
    }
  } catch {
    // Offline / local fallback
  }

  let guides = [...CANONICAL_BEHAVIOR_GUIDES];
  if (tier) {
    guides = guides.filter(
      (g) => g.targetTier === tier || g.targetTier.includes(tier)
    );
  }
  if (category && category !== 'all') {
    guides = guides.filter((g) => g.category === category);
  }

  return guides.length > 0 ? guides : CANONICAL_BEHAVIOR_GUIDES;
}

export async function getBehaviorGuideBySlug(
  slug: string
): Promise<BehaviorGuideUI | null> {
  try {
    const endpoint = `/api/v1/behavior/guides/${slug}`;
    const res = await apiClient<{ guide: BehaviorGuideDTO }>(endpoint);
    if (res?.guide) {
      const canonical = CANONICAL_BEHAVIOR_GUIDES.find(
        (c) => c.slug === res.guide.slug
      );
      return {
        ...res.guide,
        category: canonical?.category ?? 'tantrums',
        categoryLabel: canonical?.categoryLabel ?? 'Behavior Guide',
        whatNotToSay:
          canonical?.whatNotToSay ??
          'Stop acting this way immediately or there will be consequences!',
        physiologicalTrigger:
          canonical?.physiologicalTrigger ??
          'Nervous system dysregulation under acute emotional stress.',
      };
    }
  } catch {
    // Fallback
  }

  const found = CANONICAL_BEHAVIOR_GUIDES.find((g) => g.slug === slug);
  return found ?? null;
}
