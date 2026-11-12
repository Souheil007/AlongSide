import type {
  AiChatRequestInput,
  AiMessageDTO,
  FaqItemDTO,
} from '@alongside/shared';
import { DevelopmentalTier, RoadType, MessageRole } from '@alongside/shared';
import { apiClient, ApiClientError } from './client';

export interface SseContextEvent {
  type: 'context';
  matchedFaqs: string[];
}

export interface SseTokenEvent {
  type: 'token';
  content: string;
}

export interface SseDoneEvent {
  type: 'done';
  conversationId: string;
}

export interface SseEmergencyEvent {
  type: 'EMERGENCY_RED_FLAG';
  isEmergency: boolean;
  category: string;
  headline: string;
  directive: string;
  phoneDial: string;
  nearestFacilityGuidance: string;
  matchedTriggers: string[];
}

export type SseEvent = SseContextEvent | SseTokenEvent | SseDoneEvent | SseEmergencyEvent;

export interface StreamChatHandlers {
  onContext?: (data: SseContextEvent) => void;
  onEmergency?: (data: SseEmergencyEvent) => void;
  onToken?: (token: string) => void;
  onDone?: (data: SseDoneEvent) => void;
  onError?: (error: Error) => void;
}

export interface FaqSearchResponse {
  faqs: FaqItemDTO[];
}

/**
 * Curated Parenting FAQ Vault (Used as fallback when API is offline or initial seed)
 */
export const CURATED_FAQS: FaqItemDTO[] = [
  // --- TIER 0: INFANCY & TODDLER (AGES 0–3) ---
  {
    id: 'faq-infant-fever-red-flag',
    categoryId: 'pediatric-health-and-sleep',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetRoad: RoadType.PRE_DEVICE,
    question: 'When is a fever considered a true emergency in an infant under 3 months?',
    answerMarkdown:
      'In infants under 90 days (and especially neonates under 28 days), a rectal temperature of 100.4°F (38.0°C) or higher is an acute medical emergency requiring immediate evaluation in an Emergency Department. Nascent neonatal immune systems carry high risks of invasive bacterial infections. Do not administer fever reducers prior to emergency evaluation.',
    deEscalationScript:
      '"Take a slow breath. Because baby is under 90 days old, hospital protocol requires immediate in-person evaluation by a pediatric team. We are going to pack a diaper bag and head to the nearest pediatric emergency room right now."',
    isFeatured: true,
  },
  {
    id: 'faq-blw-choking-vs-gagging',
    categoryId: 'nutrition-and-feeding',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetRoad: RoadType.PRE_DEVICE,
    question: 'How do I know if my baby is gagging or truly choking during baby-led weaning?',
    answerMarkdown:
      'Gagging is a loud, red-faced, protective tongue reflex that pushes unchewed food forward from the sensitive middle of the tongue. True choking is completely silent, pale or blue-lipped, with total airway obstruction. Loud and red, let them be; silent and blue, immediate CPR/back blows are required.',
    deEscalationScript:
      '"Gagging looks dramatic, but coughing and sputtering mean the airway is completely open and working. Stay calm, maintain steady eye contact, and let their reflex clear the food without sticking fingers into their mouth."',
    isFeatured: true,
  },
  {
    id: 'faq-toddler-tantrum-halt',
    categoryId: 'behavior-and-discipline',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetRoad: RoadType.PRE_DEVICE,
    question: 'My 2-year-old throws screaming floor tantrums when told "No". How do I co-regulate?',
    answerMarkdown:
      'The toddler prefrontal cortex has almost zero synaptic inhibitory control. An amygdala surge floods their developing nervous system with adrenaline and cortisol. Reasoning or punishing during an acute meltdown escalates panic. Co-regulation means being the calm anchor who regulates their emotional storm.',
    deEscalationScript:
      '"I am right here with you. It is okay to feel big mad that we had to leave the park. I will keep your body safe while the big feelings pass."',
    isFeatured: true,
  },
  {
    id: 'faq-infant-screens-zero',
    categoryId: 'modern-world-and-devices',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetRoad: RoadType.PRE_DEVICE,
    question: 'Can my 18-month-old watch educational cartoons, or should screens be zero?',
    answerMarkdown:
      'The American Academy of Pediatrics (AAP) strongly recommends zero solo screen time under age 2 (except video chatting with family). Rapid cuts, hyper-saturated colors, and flashing pixels overstimulate developing mirror neurons without providing language comprehension or 3D spatial motor feedback.',
    deEscalationScript:
      '"Young brains build neural pathways through 3D sensory touch and real reciprocal human eye contact, not flat pixels. Let\'s trade the screen for sensory wooden blocks or kitchen pots and pans."',
    isFeatured: false,
  },

  // --- TIER 1: EARLY CHILDHOOD (AGES 4–6) ---
  {
    id: 'faq-picky-eating-division',
    categoryId: 'nutrition-and-feeding',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetRoad: RoadType.PRE_DEVICE,
    question: 'My 4-year-old refuses everything except chicken nuggets and plain noodles. How do I break the cycle?',
    answerMarkdown:
      'Food neophobia (fear of new textures and tastes) peaks between ages 2 and 5. Under Ellyn Satter\'s Division of Responsibility, parents decide What, When, and Where; the child decides Whether and How Much. Bargaining ("Eat two bites of broccoli for dessert") elevates sugar value and reinforces vegetable aversion.',
    deEscalationScript:
      '"You do not have to eat the broccoli tonight; it can just sit on your learning plate so your eyes can meet it. We have bread and noodles here so your belly will feel satisfied."',
    isFeatured: true,
  },
  {
    id: 'faq-preschool-tablet-transitions',
    categoryId: 'SCREEN_BATTLES',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetRoad: RoadType.PRE_DEVICE,
    question: 'How do I transition my 5-year-old off the iPad without a screaming meltdown?',
    answerMarkdown:
      'Preschool dopamine circuits experience an acute drop when screens shut off abruptly. Young children do not understand abstract clock time ("5 minutes"). Anchoring transitions with visual countdown timers (Time Timer) and bridging activities (e.g. building train tracks) prevents sensory shock.',
    deEscalationScript:
      '"The visual timer is showing 5 minutes left. When the red section disappears, the bell will chime and we are going to build the wooden train track together in the living room."',
    isFeatured: false,
  },
  {
    id: 'faq-bedtime-monsters-nightlight',
    categoryId: 'pediatric-health-and-sleep',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetRoad: RoadType.PRE_DEVICE,
    question: 'My 5-year-old is suddenly terrified of shadows and monsters in the dark at bedtime.',
    answerMarkdown:
      'Theory of mind and imaginative storytelling blossom at ages 4–5, often outpacing early reality-testing circuits. Mocking or dismissing the fear ("Monsters aren\'t real") signals that their anxiety is invalid. Affirm safety, inspect the room together, and introduce warm-spectrum amber nightlights (below 3000K).',
    deEscalationScript:
      '"The shadows feel scary when the room gets dark, but I inspected every corner and our room is 100% safe. Let\'s turn on your amber nightlight and do our three slow belly breaths together."',
    isFeatured: false,
  },

  // --- TIER 2: MIDDLE CHILDHOOD (AGES 7–9) ---
  {
    id: 'faq-roblox-spending',
    categoryId: 'SCREEN_BATTLES',
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    targetRoad: RoadType.PRE_DEVICE,
    question: 'Child begged relentlessly for Roblox and Robux, and spent money without permission.',
    answerMarkdown:
      'Modern free-to-play games like Roblox use dark patterns (variable ratio reward schedules, artificial scarcity, and social avatar shaming) designed by behavioral economists. Children under 10 have not developed abstract financial comprehension; in-game gems do not register as real household money.',
    deEscalationScript:
      '"Games like Roblox are designed to trick our brains into feeling like digital skins define who we are. Spending real family money without asking crosses our family safety boundary. Together, we will turn on App Store purchase passwords right now, and you can earn Robux through weekend chores if you choose."',
    isFeatured: false,
  },
  {
    id: 'faq-elementary-lying-homework',
    categoryId: 'behavior-and-discipline',
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    targetRoad: RoadType.PRE_DEVICE,
    question: 'My 8-year-old lied to my face about finishing their homework. How should I handle dishonesty?',
    answerMarkdown:
      'Elementary school lying is almost always driven by fear of parental disappointment or executive function overwhelm, not malicious character flaws. Harsh interrogations push lying underground. Respond with curiosity and prioritize honesty over the missed task.',
    deEscalationScript:
      '"I care much more about your honesty than about unfinished worksheets. When you tell me the truth, we can team up to solve any hurdle. Let\'s sit down right now and finish the last three math problems side by side."',
    isFeatured: true,
  },

  // --- TIER 3: PRE-TEEN (AGES 10–12) ---
  {
    id: 'faq-screen-transitions',
    categoryId: 'SCREEN_BATTLES',
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    targetRoad: RoadType.ACTIVE_DEVICE,
    question: 'Why does my child explode or slam doors when told screen time is over?',
    answerMarkdown:
      'Video games and short-form video trigger intense surges of dopamine in the tween nucleus accumbens. When screens shut off abruptly, dopamine levels plummet below baseline within seconds. The prefrontal cortex—which regulates emotional inhibition—is still undergoing synaptic pruning and cannot counterbalance this acute drop. It is not character defiance; it is a neurochemical withdrawal shockwave.',
    deEscalationScript:
      '"I can see your brain was in hyper-focus mode, and pulling away right now feels jarring. Take three slow breaths with me. We\'ll set a 5-minute cooldown timer so you can save your progress safely before dinner."',
    isFeatured: true,
  },
  {
    id: 'faq-first-phone-plea',
    categoryId: 'PEER_PRESSURE',
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    targetRoad: RoadType.PRE_DEVICE,
    question: 'My 10-year-old says "Everyone else has Snapchat and you\'re ruining my life!" How do I respond?',
    answerMarkdown:
      'During adrenarche (ages 9-11), tween evolutionary biology shifts social approval from parents to the peer group. Feeling excluded feels like genuine existential threat to their limbic system. Dismissing their pain ("You don\'t need Snapchat") triggers shame and defensive hostility. Acknowledge the intense longing first before upholding the family boundary.',
    deEscalationScript:
      '"I hear how important staying in the loop with your friends is, and it hurts when you feel left out of the chatter. Our family rule is that smartphone social media waits until 8th grade because brain science proves tween brains deserve protection from algorithmic comparison. Let\'s host Maya and Sarah over this weekend for pizza and movie night instead."',
    isFeatured: true,
  },
  {
    id: 'faq-groupchat-anxiety',
    categoryId: 'SOCIAL_MEDIA',
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    targetRoad: RoadType.ACTIVE_DEVICE,
    question: 'My tween obsessively checks group chats and panics over "Left on Read".',
    answerMarkdown:
      'Read receipts and typing bubbles create asynchronous social pressure. Tweens misinterpret delays as rejection due to underdeveloped cognitive perspective taking (theory of mind). Help them establish digital boundaries and turn off read receipts.',
    deEscalationScript:
      '"When someone doesn\'t reply immediately, our imagination usually invents the worst story. Most often, they just sat down for dinner or their phone battery died. Let\'s turn off read receipts together so you aren\'t under constant pressure to reply instantaneously."',
    isFeatured: false,
  },

  // --- TIER 4: EARLY ADOLESCENCE (AGES 13–15) ---
  {
    id: 'faq-curfew-explosion',
    categoryId: 'BEDTIME_SLEEP',
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    targetRoad: RoadType.ACTIVE_DEVICE,
    question: 'Caught my child on their phone in bed at 11:00 PM. How do I address this without a screaming match?',
    answerMarkdown:
      'Blue light (460-480nm) suppresses pineal melatonin secretion by up to 88% in adolescents, delaying sleep onset by 90 minutes. Tweens also experience "vampire mode" FOMO—fear that late-night inside jokes happen without them. Confronting them in the dark while sleep-deprived escalates cortisol. Remove the device neutrally and hold the conversation after breakfast.',
    deEscalationScript:
      '"The phone needs to sleep in the kitchen charging dock right now. Your sleep is non-negotiable because your brain is growing while you rest. We will review our evening docking routine tomorrow morning after breakfast without any shouting."',
    isFeatured: true,
  },
  {
    id: 'faq-calculator-vault',
    categoryId: 'SECRET_APPS',
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    targetRoad: RoadType.ACTIVE_DEVICE,
    question: 'Found a hidden calculator vault app on my child\'s phone. Does this mean they are doing something illegal?',
    answerMarkdown:
      'Calculator vault apps disguise encrypted photo galleries and browsers behind functional keypad interfaces. While frightening to parents, 64% of tweens install them simply to conceal harmless memes, diary venting, or awkward selfies from parental scrutiny, rather than dangerous conduct. Overreacting with total confiscation drives secrecy underground. Investigate calmly with curiosity rather than interrogation.',
    deEscalationScript:
      '"I noticed the Calculator+ app on your home screen. I know having a private space to explore your thoughts feels essential at your age. But secret encrypted vaults create high risks for unmonitored digital predators and malware. Let\'s look through it together right now with zero punishment, and then remove the app in favor of clear family privacy zones."',
    isFeatured: true,
  },
  {
    id: 'faq-discord-bullying',
    categoryId: 'ONLINE_SAFETY',
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    targetRoad: RoadType.ACTIVE_DEVICE,
    question: 'My 13yo is being excluded or roasted in a school Discord server. What should we do?',
    answerMarkdown:
      'Digital social exclusion lights up the dorsal anterior cingulate cortex—the exact neural pathway that registers physical pain. Tweens often conceal bullying because they fear parents will take away their device, severing their remaining friendships. Reassure them immediately that their phone is safe, take screenshots for evidence, and teach them the difference between reacting and muting.',
    deEscalationScript:
      '"Thank you for having the courage to tell me. First promise: I am not going to confiscate your phone or ban you from talking to your friends. You do not have to carry this alone. Let\'s screenshot the thread together, mute notifications for that channel tonight, and brainstorm your options."',
    isFeatured: true,
  },

  // --- TIER 5: LATE ADOLESCENCE (AGES 16–18) ---
  {
    id: 'faq-teen-driving-focus',
    categoryId: 'modern-world-and-devices',
    targetTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    targetRoad: RoadType.ACTIVE_DEVICE,
    question: 'How do I enforce a zero-phone rule while my 16-year-old is driving?',
    answerMarkdown:
      'Texting or checking notifications while driving increases fatal accident risk by over 2300%. Invasive spyware apps trigger resentment and spoofing. Bilateral "Zero-Phone Cockpit" pacts—pairing Apple Driving Focus or Android Driving Mode with parental trust treaties—establish adult executive autonomy.',
    deEscalationScript:
      '"Driving is the greatest privilege and greatest responsibility you have. Our agreement is unconditional: driving focus goes on before the car leaves the driveway. If you ever feel in danger or need guidance, call me immediately with zero penalties."',
    isFeatured: true,
  },
  {
    id: 'faq-late-teen-burnout-doomscroll',
    categoryId: 'behavior-and-discipline',
    targetTier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    targetRoad: RoadType.ACTIVE_DEVICE,
    question: 'My 17-year-old is paralyzed by college pressure and doom-scrolls until 2:00 AM.',
    answerMarkdown:
      'Late adolescent doom-scrolling is rarely about hedonism; it functions as an emotional anesthetic to numb overwhelming existential performance pressure. Criticizing their work ethic increases paralysis. Partner with them to create a bedtime sensory decompression zone.',
    deEscalationScript:
      '"I see how intensely you are pushing yourself with applications and exams. You are not defined by an admissions letter. Tonight, let\'s shut down the laptop, put our phones in the dock, and get a solid 8 hours of sleep. Tomorrow we will tackle one single step."',
    isFeatured: false,
  },
];

/**
 * Searches the Living Modern Parenting FAQ Vault.
 * Queries backend endpoint /api/v1/faqs, falling back seamlessly to local curated vault if backend is offline.
 */
export async function searchFaqs(params?: {
  q?: string;
  categoryId?: string;
  tier?: DevelopmentalTier | string;
  roadType?: RoadType | string;
}): Promise<FaqSearchResponse> {
  const queryParams: Record<string, string | undefined> = {};
  if (params?.q) queryParams.q = params.q;
  if (params?.categoryId && params.categoryId !== 'ALL') {
    queryParams.category = params.categoryId;
    queryParams.categoryId = params.categoryId;
  }
  if (params?.tier && params.tier !== 'ALL') queryParams.tier = params.tier;
  if (params?.roadType) queryParams.roadType = params.roadType;

  try {
    const res = await apiClient<{ success?: boolean; data?: { faqs: FaqItemDTO[] }; faqs?: FaqItemDTO[] }>(
      '/api/v1/faqs',
      {
        method: 'GET',
        params: queryParams,
      }
    );

    const faqs = res.data?.faqs || res.faqs;
    const total =
      res.data && typeof res.data === 'object' && 'total' in res.data
        ? (res.data as { total?: number }).total
        : undefined;

    // If backend returned actual seeded items, return them.
    // If backend database is unseeded (total === 0), fall back to curated vault.
    if (Array.isArray(faqs) && (total === undefined ? faqs.length > 0 : total > 0)) {
      return { faqs };
    }
  } catch (err) {
    // Graceful offline fallback
    console.warn('Backend FAQ endpoint offline; filtering local curated vault:', err);
  }

  // Local filtering fallback
  let filtered = [...CURATED_FAQS];
  if (params?.q) {
    const q = params.q.toLowerCase().trim();
    filtered = filtered.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answerMarkdown.toLowerCase().includes(q) ||
        f.deEscalationScript?.toLowerCase().includes(q)
    );
  }
  if (params?.categoryId && params.categoryId !== 'ALL') {
    filtered = filtered.filter((f) => f.categoryId === params.categoryId);
  }
  if (params?.tier && params.tier !== 'ALL') {
    const reqTier = params.tier;
    filtered = filtered.filter((f) => {
      if (!f.targetTier) return true;
      if (f.targetTier === reqTier) return true;
      // Equivalent mappings between canonical decomposed early childhood tiers and legacy Tier 0
      if (
        (f.targetTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3 &&
          (reqTier === DevelopmentalTier.TIER_0A_INFANCY_0_1 ||
            reqTier === DevelopmentalTier.TIER_0B_TODDLER_1_2 ||
            reqTier === DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3)) ||
        (reqTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3 &&
          (f.targetTier === DevelopmentalTier.TIER_0A_INFANCY_0_1 ||
            f.targetTier === DevelopmentalTier.TIER_0B_TODDLER_1_2 ||
            f.targetTier === DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3))
      ) return true;
      // Equivalent mappings between canonical 6 tiers and legacy tiers
      if (
        (reqTier === DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9 && f.targetTier === DevelopmentalTier.TIER_1_AGES_8_9) ||
        (reqTier === DevelopmentalTier.TIER_1_AGES_8_9 && f.targetTier === DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9)
      ) return true;
      if (
        (reqTier === DevelopmentalTier.TIER_3_PRE_TEEN_10_12 && f.targetTier === DevelopmentalTier.TIER_2_AGES_10_11) ||
        (reqTier === DevelopmentalTier.TIER_2_AGES_10_11 && f.targetTier === DevelopmentalTier.TIER_3_PRE_TEEN_10_12)
      ) return true;
      if (
        (reqTier === DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15 && f.targetTier === DevelopmentalTier.TIER_3_AGES_12_13) ||
        (reqTier === DevelopmentalTier.TIER_3_AGES_12_13 && f.targetTier === DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15)
      ) return true;
      if (
        (reqTier === DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18 && f.targetTier === DevelopmentalTier.TIER_4_AGES_14_PLUS) ||
        (reqTier === DevelopmentalTier.TIER_4_AGES_14_PLUS && f.targetTier === DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18)
      ) return true;
      return false;
    });
  }
  if (params?.roadType) {
    filtered = filtered.filter((f) => !f.targetRoad || f.targetRoad === params.roadType);
  }

  return { faqs: filtered };
}

/**
 * Get featured FAQs for initial quick discovery
 */
export async function getFeaturedFaqs(): Promise<FaqSearchResponse> {
  try {
    const result = await searchFaqs();
    return { faqs: result.faqs.filter((f) => f.isFeatured) };
  } catch {
    return { faqs: CURATED_FAQS.filter((f) => f.isFeatured) };
  }
}

/**
 * Find matching curated response for simulated streaming fallback
 */
function findSimulatedResponse(message: string): {
  matchedFaqs: string[];
  tokens: string[];
} {
  const lower = message.toLowerCase();

  if (lower.includes('snapchat') || lower.includes('everyone has') || lower.includes('ruining my life')) {
    return {
      matchedFaqs: ['faq-first-phone-plea'],
      tokens: [
        'Take a deep breath—your 10-year-old’s plea is fueled by **adrenarche**, an evolutionary shift where peer approval suddenly triggers the brain’s social survival circuit.\n\n',
        'When they scream *"Everyone else has it!"*, their limbic system genuinely feels the terror of being ostracized. However, algorithmic social feeds are empirically proven to trigger social comparison loops in brains that have not yet developed prefrontal executive filters.\n\n',
        '### Recommended De-Escalation Script:\n\n',
        '> "I hear how much staying connected with your friends matters to you, and I promise I am not trying to isolate you. Our family policy is that algorithmic social media waits until 8th grade because science shows young brains deserve time to grow without online popularity metrics. Let\'s host Maya and Sarah over this Saturday for a movie and pizza night instead."',
      ],
    };
  }

  if (lower.includes('curfew') || lower.includes('past curfew') || lower.includes('phone in bed')) {
    return {
      matchedFaqs: ['faq-curfew-explosion'],
      tokens: [
        'Late-night device use is both a neurochemical lure and a circadian disruptor. Blue light from screens halts pineal melatonin production, delaying natural sleep by up to 90 minutes.\n\n',
        'Confronting a sleep-deprived tween in the dark almost always triggers an amygdala hijack (screaming, door slamming). The goal tonight is **neutral physical boundary enforcement**, followed by calm collaborative debriefing tomorrow.\n\n',
        '### What to Say Right Now:\n\n',
        '> "The phone sleeps in the kitchen charging dock right now. Your sleep is non-negotiable because your brain does its most important growing while you rest. We will talk about our evening docking routine tomorrow morning after breakfast without any yelling."',
      ],
    };
  }

  if (lower.includes('slammed door') || lower.includes('screen shutoff') || lower.includes('shut off') || lower.includes('explode')) {
    return {
      matchedFaqs: ['faq-screen-transitions'],
      tokens: [
        'What you just witnessed was **not a character failure or disrespect**—it was an acute **dopamine crash**.\n\n',
        'Interactive screens flood the tween brain with dopamine. Abrupt cutoffs plunge dopamine below baseline in under 30 seconds. Their developing prefrontal cortex cannot regulate that emotional freefall.\n\n',
        'Wait 5–10 minutes for their cortisol and adrenaline to settle before knocking on their door.\n\n',
        '### Word-for-Word Script:\n\n',
        '> "Leo, I know shutting down in the middle of a game felt awful, and having your game cut short is frustrating. Take three slow breaths with me. Next time, let\'s set a 5-minute cooldown timer so you can finish saving your progress before dinner."',
      ],
    };
  }

  if (lower.includes('calculator') || lower.includes('vault') || lower.includes('hidden app')) {
    return {
      matchedFaqs: ['faq-calculator-vault'],
      tokens: [
        'Finding a disguised calculator vault app can feel alarming, but take comfort: over 60% of tweens install these solely to hide harmless memes, awkward selfies, or private diary entries from parents, rather than dangerous conduct.\n\n',
        'Overreacting with punitive confiscation drives tech use into deeper secrecy. Approach with calm transparency.\n\n',
        '### What to Say:\n\n',
        '> "I noticed the Calculator+ app on your device. I know that having private space is a normal part of growing up. But secret encrypted vaults introduce high risks for unmonitored malware and predatory features. Let\'s look through it together right now with zero punishment, and replace it with clear family privacy boundaries."',
      ],
    };
  }

  if (lower.includes('discord') || lower.includes('bullied') || lower.includes('bullying') || lower.includes('group chat')) {
    return {
      matchedFaqs: ['faq-discord-bullying'],
      tokens: [
        'Digital exclusion triggers the same neurological pain receptors in the brain as physical injury. Tweens often hide bullying because they dread parents will confiscate their phone—cutting off their entire social lifeline.\n\n',
        'Give them the "Zero-Confiscation Safe Harbor" immediately so they feel safe communicating.\n\n',
        '### Script for Tonight:\n\n',
        '> "Thank you for trusting me with this. First promise: I am NOT going to take your phone away or cut you off from your friends. You do not have to carry this hurtful chatter alone. Let\'s screenshot the messages together, mute the channel tonight, and plan our next move over hot chocolate."',
      ],
    };
  }

  // General calm parenting response
  return {
    matchedFaqs: ['faq-screen-transitions', 'faq-first-phone-plea'],
    tokens: [
      'Parenting through digital friction requires **connection before correction**.\n\n',
      'When emotions are high, a child\'s logical brain (prefrontal cortex) goes offline and their emotional alarm system (amygdala) takes control. Demanding obedience in that moment only accelerates conflict.\n\n',
      '### Core Parent Calm Framework:\n\n',
      '1. **Validate the emotional reality**: *"I can see how much this matters to you."*\n',
      '2. **Anchor the biological boundary**: *"My job as your parent is protecting your sleep and brain health."*\n',
      '3. **Offer collaborative agency**: *"Let\'s review our Bilateral Agreement tomorrow and figure out a system that feels fair to both of us."*\n\n',
      '### What to Say Right Now:\n\n',
      '> "I love you too much to argue about this while we are both tired. Let\'s pause, take ten minutes to cool down, and talk this through together constructively."',
    ],
  };
}

/**
 * Streams AI Child Advisor responses via Server-Sent Events (SSE).
 * Uses live backend if reachable; smoothly falls back to simulated neurobiological stream
 * with realistic token chunks if the backend is offline.
 */
export async function streamAiAdvisorChat(
  input: AiChatRequestInput,
  handlers: StreamChatHandlers,
  options?: { signal?: AbortSignal; tokenDelayMs?: number }
): Promise<void> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = `${API_BASE_URL.replace(/\/$/, '')}/api/v1/ai-advisor/chat`;

  if (options?.signal?.aborted) {
    return;
  }

  let usedLiveStream = false;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      credentials: 'include',
      body: JSON.stringify(input),
      signal: options?.signal,
    });

    if (response.ok && response.body) {
      usedLiveStream = true;
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data:')) {
            const jsonStr = trimmed.slice(5).trim();
            if (!jsonStr) continue;
            try {
              const eventData: SseEvent = JSON.parse(jsonStr);
              if (eventData.type === 'context') {
                handlers.onContext?.(eventData);
              } else if (eventData.type === 'EMERGENCY_RED_FLAG') {
                handlers.onEmergency?.(eventData);
              } else if (eventData.type === 'token') {
                handlers.onToken?.(eventData.content);
              } else if (eventData.type === 'done') {
                handlers.onDone?.(eventData);
              }
            } catch {
              // Ignore non-json heartbeat lines
            }
          }
        }
      }
      return;
    }
  } catch {
    if (options?.signal?.aborted) {
      return;
    }
    // Network error or 404/500: proceed to simulated fallback stream
  }

  if (options?.signal?.aborted) {
    return;
  }

  if (!usedLiveStream) {
    // Resilient fallback streaming simulator
    const simulated = findSimulatedResponse(input.message);
    handlers.onContext?.({
      type: 'context',
      matchedFaqs: simulated.matchedFaqs,
    });

    const delayMs = options?.tokenDelayMs !== undefined ? options.tokenDelayMs : 2;

    for (const chunk of simulated.tokens) {
      if (options?.signal?.aborted) return;
      // Break large chunks into smaller tokens for natural streaming rhythm
      const words = chunk.split(/(\s+)/);
      for (const word of words) {
        if (options?.signal?.aborted) return;
        handlers.onToken?.(word);
        if (delayMs > 0) {
          await new Promise((res) => setTimeout(res, delayMs));
        }
      }
    }

    handlers.onDone?.({
      type: 'done',
      conversationId: input.conversationId || `conv-${Date.now()}`,
    });
  }
}
