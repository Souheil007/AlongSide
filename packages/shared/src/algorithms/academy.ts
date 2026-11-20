import {
  AcademyCategory,
  AlmanacVisualType,
  DevelopmentalTier,
  EditorialIllustrationKey,
  EpisodeRole,
  Gender,
  LessonArchetype,
} from '../constants/index.js';
import type {
  AcademyLessonDTO,
  ActionProtocolItem,
  AdaptiveModuleType,
  AlmanacLessonPayload,
  AnnotatedScriptSegment,
  ChildPersonalizationContext,
  DialogueCardDTO,
  LessonArchetypeHeadings,
  ThirtySecondGlanceDTO,
} from '../types/index.js';

export function resolveAdaptiveModuleType(
  category?: AcademyCategory
): AdaptiveModuleType {
  switch (category) {
    case AcademyCategory.BEHAVIOR_AND_EMOTIONS:
      return 'SOMATIC_RESET';
    case AcademyCategory.HEALTH_AND_WELLNESS:
      return 'CIRCADIAN_TIMELINE';
    case AcademyCategory.NUTRITION_AND_FEEDING:
      return 'FEEDING_LADDER';
    case AcademyCategory.DEVELOPMENT_AND_PLAY:
      return 'PLAY_BLUEPRINT';
    case AcademyCategory.DIGITAL_AND_DEVICES:
      return 'PACT_CLAUSE';
    default:
      return 'SOMATIC_RESET';
  }
}

export function resolveLessonArchetype(
  slug: string,
  title: string,
  category?: AcademyCategory
): LessonArchetype {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();

  // 1. Practical family guides: safety, fever, sleep setup, nutrition grocery/prep, digital pledges/rules
  if (
    category === AcademyCategory.HEALTH_AND_WELLNESS &&
    (s.includes('fever') ||
      s.includes('sleep-setup') ||
      s.includes('safe-sleep') ||
      s.includes('first-aid') ||
      s.includes('guide') ||
      t.includes('guide') ||
      t.includes('fever') ||
      t.includes('safety') ||
      t.includes('routine'))
  ) {
    return LessonArchetype.PRACTICAL_FAMILY_GUIDE;
  }
  if (
    category === AcademyCategory.NUTRITION_AND_FEEDING &&
    (s.includes('grocery') ||
      s.includes('batch-prep') ||
      s.includes('meal-plan') ||
      s.includes('budget') ||
      t.includes('grocery') ||
      t.includes('batch') ||
      t.includes('plan'))
  ) {
    return LessonArchetype.PRACTICAL_FAMILY_GUIDE;
  }
  if (
    category === AcademyCategory.DIGITAL_AND_DEVICES &&
    (s.includes('driving-pledge') ||
      s.includes('unplugged') ||
      s.includes('covenant') ||
      s.includes('contract') ||
      s.includes('curfew') ||
      t.includes('pledge') ||
      t.includes('covenant') ||
      t.includes('agreement') ||
      t.includes('rules'))
  ) {
    return LessonArchetype.PRACTICAL_FAMILY_GUIDE;
  }

  // 2. Child growth concepts: development & play, milestones, brain growth, curiosity, vocal echo, puppet play, gut-brain, sleep maturation, partial attention
  if (
    category === AcademyCategory.DEVELOPMENT_AND_PLAY ||
    s.includes('milestone') ||
    s.includes('vocal-echo') ||
    s.includes('puppet') ||
    s.includes('gut-brain') ||
    s.includes('maturation') ||
    s.includes('continuous-partial-attention') ||
    s.includes('shared-attention') ||
    t.includes('milestone') ||
    t.includes('vocal echo') ||
    t.includes('puppet') ||
    t.includes('how your') ||
    t.includes('grows') ||
    t.includes('brain') ||
    t.includes('maturation')
  ) {
    return LessonArchetype.CHILD_GROWTH_CONCEPT;
  }

  // 3. Fallback for behavior & emotions or reactive situations
  return LessonArchetype.EVERYDAY_BEHAVIOR;
}

export function getLessonArchetypeHeadings(
  archetype?: LessonArchetype
): LessonArchetypeHeadings {
  switch (archetype) {
    case LessonArchetype.CHILD_GROWTH_CONCEPT:
      return {
        bannerPrefix: '🌱 How your child grows:',
        quickReadTitle: '⚡ Concept at a Glance (30-Second Read)',
        part1Eyebrow: "Part 1 · What You'll Notice",
        part1Title: 'A New Stage of Growth',
        part2Eyebrow: 'Part 2 · Why This Milestone Matters',
        part2Title: 'How This Builds Confidence & Connection',
        part3Eyebrow: 'Part 3 · Encouraging Their Curiosity',
        part3Title: 'How to Spark & Nurture It Together',
        part4Eyebrow: 'Part 4 · Fun Ideas for This Week',
        part4Title: '3 Simple Ways to Practice Together',
        takeawayLabel: 'The Key Takeaway to Remember',
        closingLabel: 'A Note for You as a Parent',
      };
    case LessonArchetype.PRACTICAL_FAMILY_GUIDE:
      return {
        bannerPrefix: "🧭 Parent's guide:",
        quickReadTitle: '⚡ Quick Reference (30-Second Read)',
        part1Eyebrow: 'Part 1 · Why Clear Guidance Matters',
        part1Title: 'The Everyday Family Decision',
        part2Eyebrow: 'Part 2 · What Every Parent Should Know',
        part2Title: 'The "Why" Behind the Guidance',
        part3Eyebrow: 'Part 3 · Common Myths vs. Helpful Habits',
        part3Title: 'What to Avoid & What Helps Most',
        part4Eyebrow: 'Part 4 · Your Home Checklist',
        part4Title: '3 Simple Steps to Keep Handy',
        takeawayLabel: 'The Key Takeaway to Remember',
        closingLabel: 'A Note for You as a Parent',
      };
    case LessonArchetype.EVERYDAY_BEHAVIOR:
    default:
      return {
        bannerPrefix: '💡 Why this happens:',
        quickReadTitle: '⚡ The Short Version (30-Second Read)',
        part1Eyebrow: 'Part 1 · A Moment Every Parent Knows',
        part1Title: 'What It Looks Like at Home',
        part2Eyebrow: 'Part 2 · Understanding Your Child',
        part2Title: "What's Going On Inside Their Growing Mind",
        part3Eyebrow: 'Part 3 · Words That Help',
        part3Title: 'What to Say (and What If They Push Back?)',
        part4Eyebrow: 'Part 4 · Putting It Into Practice',
        part4Title: '3 Simple Steps to Try at Home',
        takeawayLabel: 'The Key Takeaway to Remember',
        closingLabel: 'A Note for You as a Parent',
      };
  }
}

export function resolveReliefTagline(
  title: string,
  category?: AcademyCategory
): string {
  switch (category) {
    case AcademyCategory.BEHAVIOR_AND_EMOTIONS:
      return '💡 A normal wave of big feelings at this age—never a sign of bad parenting or manipulation';
    case AcademyCategory.HEALTH_AND_WELLNESS:
      return "🧭 A natural shift in your child's sleep and body rhythms—not stubborn defiance";
    case AcademyCategory.NUTRITION_AND_FEEDING:
      return '🌱 A normal stage of cautious tasting—not intentional mealtime rejection';
    case AcademyCategory.DEVELOPMENT_AND_PLAY:
      return "🌱 How your child's curious mind builds new skills through everyday play";
    case AcademyCategory.DIGITAL_AND_DEVICES:
      return '🧭 Modern apps are engineered to hold attention—clear family habits beat willpower';
    default:
      return '💡 A normal part of growing up—not a parenting inadequacy';
  }
}

export function parseDialogueCards(
  contentMarkdown: string,
  defaultDeliveryTip?: string | null
): DialogueCardDTO[] {
  const cards: DialogueCardDTO[] = [];

  let tip = defaultDeliveryTip || '';
  const tipMatch = contentMarkdown.match(
    /###\s*Delivery Tip:?\s*\n>\s*([^\n]+)/i
  );
  if (tipMatch && tipMatch[1]) {
    tip = tipMatch[1].trim();
  }

  const part3Index = contentMarkdown.indexOf(
    '## Part 3: Comparative Dialogue Scripts'
  );
  if (part3Index !== -1) {
    const afterPart3 = contentMarkdown.slice(part3Index);
    const tableLines = afterPart3.split('\n');
    for (const line of tableLines) {
      if (line.startsWith('## Part 4')) break;
      const trimmed = line.trim();
      if (
        !trimmed.startsWith('|') ||
        trimmed.includes('What NOT to Say') ||
        trimmed.includes(':---')
      ) {
        continue;
      }
      const cells = trimmed
        .split('|')
        .map((c) => c.trim())
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      const c0 = cells[0];
      const c1 = cells[1];
      const c2 = cells[2];
      if (c0 && c1 && c2) {
        cards.push({
          instinctiveMistake: c0.replace(/^["']|["']$/g, ''),
          whyItBackfires: c1,
          empatheticScript: c2.replace(/^["']|["']$/g, ''),
          deliveryTip: tip,
        });
      }
    }
  }

  if (cards.length === 0 && defaultDeliveryTip) {
    cards.push({
      instinctiveMistake: 'Reacting with irritation or invalidation',
      whyItBackfires: 'Escalates autonomic fight-or-flight arousal in child',
      empatheticScript:
        'I am right here with you. We can take this slow together.',
      deliveryTip: defaultDeliveryTip,
    });
  }

  return cards;
}

export function parseThirtySecondGlance(
  contentMarkdown: string,
  cards: DialogueCardDTO[],
  title: string
): ThirtySecondGlanceDTO {
  const exactWords =
    cards[0]?.empatheticScript ||
    'I see how big this feels. I am right here with you.';

  let coreProblem = '';
  const clinicalMatch = contentMarkdown.match(
    />\s*\*\*(?:Key Takeaway|Clinical Insight|Developmental Insight):?\*\*:?\s*([^\n]+)/i
  );
  if (clinicalMatch && clinicalMatch[1]) {
    coreProblem = clinicalMatch[1].trim();
  } else if (cards[0]?.whyItBackfires) {
    coreProblem = cards[0].whyItBackfires;
  } else {
    coreProblem = `A normal wave of big feelings during ${title.toLowerCase()} as their brain builds regulation.`;
  }

  let immediateShift = '';
  const action1Match = contentMarkdown.match(
    /## Part 4[^\n]*\n(?:1\.\s*|1\)\s*)([^\n]+)/i
  );
  if (action1Match && action1Match[1]) {
    immediateShift = action1Match[1].trim();
  } else if (cards[0]?.deliveryTip) {
    immediateShift = cards[0].deliveryTip;
  } else {
    immediateShift =
      'Drop below child eye level, take a slow diaphragmatic breath, and speak under 8 words.';
  }

  return {
    coreProblem,
    immediateShift,
    exactWords,
  };
}

/**
 * Extracts structured action checklist protocol items from lesson markdown (Part 4).
 * Returns array of { id, label, detail } items.
 */
export function parseActionProtocolItems(
  contentMarkdown: string
): ActionProtocolItem[] {
  if (!contentMarkdown) return [];

  const part4Match = contentMarkdown.match(
    /## Part 4:[^\n]*\n([\s\S]*?)(?=###|##|$)/i
  );
  if (!part4Match || !part4Match[1]) return [];

  const lines = part4Match[1].split('\n').map((l) => l.trim()).filter(Boolean);
  const items: ActionProtocolItem[] = [];

  for (const line of lines) {
    const match = line.match(/^\d+\.\s*(?:\*\*)?([^:\n*]+)(?:\*\*)?:\s*([\s\S]+)$/);
    if (match && match[1] && match[2]) {
      items.push({
        id: `step-${items.length + 1}`,
        label: match[1].replace(/^\*\*|\*\*$/g, '').trim(),
        detail: match[2].trim(),
      });
    } else {
      const simpleMatch = line.match(/^\d+\.\s*(.+)$/);
      if (simpleMatch && simpleMatch[1]) {
        items.push({
          id: `step-${items.length + 1}`,
          label: simpleMatch[1].trim(),
        });
      }
    }
  }

  return items;
}

// -----------------------------------------------------------------------------
// INTERACTIVE ALMANAC v2 PURE ENGINES (PLAN-46)
// -----------------------------------------------------------------------------

export interface EpisodeRoleMetadata {
  role: EpisodeRole;
  label: string;
  shortLabel: string;
  accent: 'spruce' | 'amber';
}

export function getEpisodeRoleMeta(
  role?: EpisodeRole | string | null
): EpisodeRoleMetadata {
  switch (role) {
    case EpisodeRole.BRAIN_DECODER:
      return {
        role: EpisodeRole.BRAIN_DECODER,
        label: 'The Brain Decoder',
        shortLabel: 'Brain Decoder',
        accent: 'amber',
      };
    case EpisodeRole.RHYTHM_RESET:
      return {
        role: EpisodeRole.RHYTHM_RESET,
        label: 'The Rhythm Reset',
        shortLabel: 'Rhythm Reset',
        accent: 'spruce',
      };
    case EpisodeRole.LONG_TERM_BOND:
      return {
        role: EpisodeRole.LONG_TERM_BOND,
        label: 'The Long-Term Bond',
        shortLabel: 'Long-Term Bond',
        accent: 'spruce',
      };
    case EpisodeRole.FAST_WIN:
    default:
      return {
        role: EpisodeRole.FAST_WIN,
        label: 'The Fast Win',
        shortLabel: 'Fast Win',
        accent: 'spruce',
      };
  }
}

export function resolveEpisodeRoleFromSortOrder(
  sortOrder: number
): EpisodeRole {
  if (sortOrder <= 1) return EpisodeRole.FAST_WIN;
  if (sortOrder === 2) return EpisodeRole.BRAIN_DECODER;
  if (sortOrder === 3) return EpisodeRole.RHYTHM_RESET;
  return EpisodeRole.LONG_TERM_BOND;
}

interface ResolvedChildTokens {
  name: string;
  Name: string;
  possessive: string;
  Possessive: string;
  pronoun: string;
  Pronoun: string;
  obj: string;
  poss: string;
  Poss: string;
  age: string;
  ageShort: string;
  isPronounPlural: boolean;
}

function getTierAgeFallbacks(tier?: DevelopmentalTier | string | null): {
  label: string;
  age: string;
  ageShort: string;
} {
  switch (tier) {
    case DevelopmentalTier.TIER_0A_INFANCY_0_1:
      return { label: 'your baby', age: 'Ages 0–1', ageShort: 'baby' };
    case DevelopmentalTier.TIER_0B_TODDLER_1_2:
      return { label: 'your toddler', age: 'Ages 1–2', ageShort: 'toddler' };
    case DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3:
    case DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3:
      return { label: 'your toddler', age: 'Ages 2–3', ageShort: 'toddler' };
    case DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6:
      return {
        label: 'your preschooler',
        age: 'Ages 4–6',
        ageShort: 'preschooler',
      };
    case DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9:
    case DevelopmentalTier.TIER_1_AGES_8_9:
      return {
        label: 'your child',
        age: 'Ages 7–9',
        ageShort: 'elementary child',
      };
    case DevelopmentalTier.TIER_3_PRE_TEEN_10_12:
    case DevelopmentalTier.TIER_2_AGES_10_11:
      return { label: 'your tween', age: 'Ages 10–12', ageShort: 'tween' };
    case DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15:
    case DevelopmentalTier.TIER_3_AGES_12_13:
      return { label: 'your teen', age: 'Ages 13–15', ageShort: 'teen' };
    case DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18:
    case DevelopmentalTier.TIER_4_AGES_14_PLUS:
      return { label: 'your teen', age: 'Ages 16–18', ageShort: 'teen' };
    default:
      return { label: 'your child', age: 'this stage', ageShort: 'child' };
  }
}

function formatChildAgeLabels(
  child: ChildPersonalizationContext,
  tierFallback: { age: string; ageShort: string }
): { age: string; ageShort: string } {
  if (typeof child.ageMonths === 'number' && Number.isFinite(child.ageMonths) && child.ageMonths >= 0) {
    const months = Math.floor(child.ageMonths);
    if (months < 12) {
      return {
        age: months === 1 ? '1 mo' : `${months} mos`,
        ageShort: `${months}-month-old`,
      };
    }
    if (months < 36) {
      const yrs = Math.floor(months / 12);
      const rem = months % 12;
      const age =
        rem === 0
          ? `${yrs} ${yrs === 1 ? 'yr' : 'yrs'}`
          : `${yrs} ${yrs === 1 ? 'yr' : 'yrs'} ${rem} ${rem === 1 ? 'mo' : 'mos'}`;
      const ageShort =
        rem >= 5 && rem <= 7
          ? `${yrs}.5-year-old`
          : `${yrs}-year-old`;
      return { age, ageShort };
    }
    const yrs = Math.floor(months / 12);
    return { age: `${yrs} yrs`, ageShort: `${yrs}-year-old` };
  }

  if (typeof child.age === 'number' && Number.isFinite(child.age) && child.age >= 0) {
    const yrs = Math.floor(child.age);
    if (yrs === 0) {
      return { age: 'Under 1 yr', ageShort: 'baby' };
    }
    return {
      age: yrs === 1 ? '1 yr' : `${yrs} yrs`,
      ageShort: `${yrs}-year-old`,
    };
  }

  return tierFallback;
}

function resolveChildTokens(
  child?: ChildPersonalizationContext | null,
  fallbackTier?: DevelopmentalTier | string | null
): ResolvedChildTokens {
  const tier = child?.developmentalTier ?? fallbackTier ?? null;
  const tierFallback = getTierAgeFallbacks(tier);
  const rawName = child?.name?.trim();

  if (!rawName) {
    const label = tierFallback.label;
    const capLabel = label.charAt(0).toUpperCase() + label.slice(1);
    return {
      name: label,
      Name: capLabel,
      possessive: `${label}’s`,
      Possessive: `${capLabel}’s`,
      pronoun: 'they',
      Pronoun: 'They',
      obj: 'them',
      poss: 'their',
      Poss: 'Their',
      age: tierFallback.age,
      ageShort: tierFallback.ageShort,
      isPronounPlural: true,
    };
  }

  const capName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const possSuffix = rawName.toLowerCase().endsWith('s') ? '’' : '’s';
  const normalizedGender =
    typeof child?.gender === 'string' ? child.gender.toUpperCase() : '';

  let pronoun = 'they';
  let obj = 'them';
  let poss = 'their';
  let isPronounPlural = true;

  if (normalizedGender === Gender.FEMALE) {
    pronoun = 'she';
    obj = 'her';
    poss = 'her';
    isPronounPlural = false;
  } else if (normalizedGender === Gender.MALE) {
    pronoun = 'he';
    obj = 'him';
    poss = 'his';
    isPronounPlural = false;
  }

  const { age, ageShort } = formatChildAgeLabels(child!, tierFallback);

  return {
    name: rawName,
    Name: capName,
    possessive: `${rawName}${possSuffix}`,
    Possessive: `${capName}${possSuffix}`,
    pronoun,
    Pronoun: pronoun.charAt(0).toUpperCase() + pronoun.slice(1),
    obj,
    poss,
    Poss: poss.charAt(0).toUpperCase() + poss.slice(1),
    age,
    ageShort,
    isPronounPlural,
  };
}

const VERB_INFLECTIONS: Record<string, { singular: string; plural: string }> = {
  eats: { singular: 'eats', plural: 'eat' },
  Eats: { singular: 'Eats', plural: 'Eat' },
  pushes: { singular: 'pushes', plural: 'push' },
  is: { singular: 'is', plural: 'are' },
  Is: { singular: 'Is', plural: 'Are' },
  cries: { singular: 'cries', plural: 'cry' },
  throws: { singular: 'throws', plural: 'throw' },
  wants: { singular: 'wants', plural: 'want' },
  gets: { singular: 'gets', plural: 'get' },
  has: { singular: 'has', plural: 'have' },
  does: { singular: 'does', plural: 'do' },
  says: { singular: 'says', plural: 'say' },
  looks: { singular: 'looks', plural: 'look' },
  feels: { singular: 'feels', plural: 'feel' },
  grabs: { singular: 'grabs', plural: 'grab' },
  refuses: { singular: 'refuses', plural: 'refuse' },
  wakes: { singular: 'wakes', plural: 'wake' },
  sleeps: { singular: 'sleeps', plural: 'sleep' },
  rolls: { singular: 'rolls', plural: 'roll' },
  hits: { singular: 'hits', plural: 'hit' },
  bites: { singular: 'bites', plural: 'bite' },
};

/**
 * Pure child-calibration interpolator for Interactive Almanac v2 copy.
 * Guarantees grammatical agreement whether the active child is male, female,
 * or neutral fallback ("your toddler" / "they"), and leaves zero raw `{token}` artifacts.
 */
export function interpolateChildCopy(
  template: string,
  child?: ChildPersonalizationContext | null,
  fallbackTier?: DevelopmentalTier | string | null
): string {
  if (!template || !template.includes('{')) {
    return template;
  }

  const tokens = resolveChildTokens(child, fallbackTier);

  // Track whether the most recent subject token in the current sentence/clause was {name}/{Name}
  // (always singular: "Maya" or "your toddler") vs {pronoun}/{Pronoun} (plural when "they").
  let lastSubjectWasName = false;

  const replaced = template.replace(/\{([a-zA-Z]+)\}/g, (match, key: string) => {
    switch (key) {
      case 'name':
        lastSubjectWasName = true;
        return tokens.name;
      case 'Name':
        lastSubjectWasName = true;
        return tokens.Name;
      case 'possessive':
        return tokens.possessive;
      case 'Possessive':
        return tokens.Possessive;
      case 'pronoun':
        lastSubjectWasName = false;
        return tokens.pronoun;
      case 'Pronoun':
        lastSubjectWasName = false;
        return tokens.Pronoun;
      case 'obj':
        return tokens.obj;
      case 'poss':
        return tokens.poss;
      case 'Poss':
        return tokens.Poss;
      case 'age':
        return tokens.age;
      case 'ageShort':
        return tokens.ageShort;
      default: {
        const verb = VERB_INFLECTIONS[key];
        if (verb) {
          const usePlural = !lastSubjectWasName && tokens.isPronounPlural;
          return usePlural ? verb.plural : verb.singular;
        }
        return match;
      }
    }
  });

  return replaced;
}

export function resolveDefaultVisualType(
  category?: AcademyCategory,
  slug?: string
): AlmanacVisualType {
  const s = (slug ?? '').toLowerCase();
  if (s.includes('neophobia') || s.includes('beige') || s.includes('anorexia')) {
    return AlmanacVisualType.LENS_EXPOSURE_MATRIX;
  }
  if (s.includes('sleep') || s.includes('nap') || s.includes('circadian') || s.includes('wake-window')) {
    return AlmanacVisualType.CIRCADIAN_CURVE;
  }
  if (s.includes('serve-and-return') || s.includes('vocal') || s.includes('dialogue') || s.includes('repair')) {
    return AlmanacVisualType.SERVE_RETURN_LOOP;
  }
  switch (category) {
    case AcademyCategory.NUTRITION_AND_FEEDING:
      return AlmanacVisualType.SENSORY_LADDER;
    case AcademyCategory.HEALTH_AND_WELLNESS:
      return AlmanacVisualType.CIRCADIAN_CURVE;
    case AcademyCategory.DEVELOPMENT_AND_PLAY:
      return AlmanacVisualType.SERVE_RETURN_LOOP;
    case AcademyCategory.DIGITAL_AND_DEVICES:
      return AlmanacVisualType.HABIT_GUARDRAIL;
    case AcademyCategory.BEHAVIOR_AND_EMOTIONS:
    default:
      return AlmanacVisualType.BRAIN_BRIDGE;
  }
}

export function resolveDefaultIllustration(
  category?: AcademyCategory,
  slug?: string,
  tier?: DevelopmentalTier | string | null
): EditorialIllustrationKey {
  const s = (slug ?? '').toLowerCase();
  if (s.includes('neophobia') || s.includes('beige') || s.includes('green')) {
    return EditorialIllustrationKey.leaf;
  }
  if (s.includes('sleep') || s.includes('nap') || s.includes('bed') || s.includes('night')) {
    return EditorialIllustrationKey.moon_bed;
  }
  if (
    tier === DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15 ||
    tier === DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18
  ) {
    if (category === AcademyCategory.DIGITAL_AND_DEVICES) {
      return EditorialIllustrationKey.device_dock;
    }
    return EditorialIllustrationKey.compass_teen;
  }
  switch (category) {
    case AcademyCategory.NUTRITION_AND_FEEDING:
      return EditorialIllustrationKey.plate;
    case AcademyCategory.HEALTH_AND_WELLNESS:
      return EditorialIllustrationKey.moon_bed;
    case AcademyCategory.DEVELOPMENT_AND_PLAY:
      return EditorialIllustrationKey.blocks_play;
    case AcademyCategory.DIGITAL_AND_DEVICES:
      return EditorialIllustrationKey.device_dock;
    case AcademyCategory.BEHAVIOR_AND_EMOTIONS:
    default:
      return tier === DevelopmentalTier.TIER_0A_INFANCY_0_1
        ? EditorialIllustrationKey.heart_bridge
        : EditorialIllustrationKey.cup;
  }
}

function stripMarkdownFormatting(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^>\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractMarkdownSectionParagraphs(
  markdown: string,
  sectionHeaderPattern: RegExp
): string[] {
  const match = markdown.match(sectionHeaderPattern);
  if (!match || match.index === undefined) return [];
  const after = markdown.slice(match.index + match[0].length);
  const nextSectionIdx = after.search(/\n##\s+/);
  const body = nextSectionIdx === -1 ? after : after.slice(0, nextSectionIdx);
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(
      (block) =>
        block.length > 0 &&
        !block.startsWith('|') &&
        !block.startsWith('###') &&
        !block.startsWith('>') &&
        !/^\d+\./.test(block)
    )
    .map(stripMarkdownFormatting);
}

function buildAnnotatedSegmentsFromScript(
  script: string,
  deliveryTip?: string
): AnnotatedScriptSegment[] {
  const cleaned = script.replace(/^[“"]|[”"]$/g, '').trim();
  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length <= 1) {
    return [
      { text: '“' },
      {
        id: 'anchor',
        text: cleaned || 'I am right here with you. Let us take this slow together.',
        tag: 'Calm Anchor',
        note:
          deliveryTip ||
          'Short, warm, matter-of-fact words lower nervous-system defensiveness so connection returns first.',
      },
      { text: '”' },
    ];
  }

  const segments: AnnotatedScriptSegment[] = [{ text: '“' }];
  const tags = ['Drops Alarm', 'Clear Anchor', 'Next Calm Step'];
  const notes = [
    'Signals safety and genuine understanding before setting a boundary—stopping escalation in the first few seconds.',
    deliveryTip ||
      'Holds a steady, predictable boundary without lecturing, bargaining, or shaming.',
    'Gives {name} a concrete, achievable next step while keeping warmth intact.',
  ];

  sentences.forEach((sentence, idx) => {
    if (idx > 0) {
      segments.push({ text: ' ' });
    }
    if (idx < 3) {
      segments.push({
        id: `seg-${idx + 1}`,
        text: sentence,
        tag: tags[idx] ?? 'Calm Anchor',
        note: notes[idx] ?? notes[0]!,
      });
    } else {
      segments.push({ text: sentence });
    }
  });
  segments.push({ text: '”' });
  return segments;
}

/**
 * Deterministic adapter guaranteeing EVERY lesson across all 40 courses renders
 * as a complete Interactive Almanac v2 experience. Returns bespoke `almanacPayload`
 * directly when authored; otherwise cleanly synthesizes a schema-valid v2 payload
 * from legacy markdown, dialogue cards, and action checklist items.
 */
export function resolveAlmanacLessonPayload(
  lesson: AcademyLessonDTO
): AlmanacLessonPayload {
  if (lesson.almanacPayload) {
    return lesson.almanacPayload;
  }

  const category = lesson.module?.category;
  const tier = lesson.module?.developmentalTier;
  const markdown = lesson.contentMarkdown || '';
  const dialogueCards =
    lesson.dialogueCards && lesson.dialogueCards.length > 0
      ? lesson.dialogueCards
      : parseDialogueCards(markdown, lesson.deliveryTip);
  const actionItems =
    lesson.actionProtocolItems && lesson.actionProtocolItems.length > 0
      ? lesson.actionProtocolItems
      : parseActionProtocolItems(markdown);

  const part1Paras = extractMarkdownSectionParagraphs(
    markdown,
    /##\s+Part 1[^\n]*\n/i
  );
  const part2Paras = extractMarkdownSectionParagraphs(
    markdown,
    /##\s+Part 2[^\n]*\n/i
  );

  const takeawayMatch = markdown.match(
    />\s*\*\*(?:Key Takeaway|Clinical Insight|Developmental Insight):?\*\*:?\s*([^\n]+)/i
  );
  const almanacTruth =
    (takeawayMatch?.[1] && stripMarkdownFormatting(takeawayMatch[1])) ||
    lesson.thirtySecondGlance?.coreProblem ||
    'Steady connection and predictable rhythms do far more than lectures or willpower in hard moments.';

  const sceneBody =
    part1Paras[0] ||
    `It is the middle of a busy week, and the moment you were hoping would go smoothly with {name} starts slipping sideways. *You pause and wonder what actually helps right now.*`;

  const rawPart2First = (part2Paras[0] || '').trim();
  const rawPart2Rest = part2Paras
    .slice(1)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && p !== rawPart2First)
    .join(' ');

  const categoryScienceNote = (() => {
    switch (category) {
      case AcademyCategory.HEALTH_AND_WELLNESS:
        return 'Circadian pacemaker neurons in the suprachiasmatic nucleus respond strongly to light, temperature, and predictable timing cues, gradually stabilizing sleep architecture and autonomic recovery across childhood.';
      case AcademyCategory.NUTRITION_AND_FEEDING:
        return 'Sensory-integration and appetite-regulation pathways mature through repeated low-pressure exposures; removing mealtime threat signals keeps the insula and gustatory cortex receptive to gradual curiosity.';
      case AcademyCategory.DEVELOPMENT_AND_PLAY:
        return 'Self-directed play and back-and-forth caregiver attunement stimulate prefrontal-striatal networks, strengthening working memory, cognitive flexibility, and intrinsic motivation far more effectively than drills.';
      case AcademyCategory.DIGITAL_AND_DEVICES:
        return 'Variable-ratio digital rewards engage dopaminergic prediction loops faster than still-myelinating prefrontal braking circuits can disengage; predictable environmental boundaries protect sleep and attention without willpower battles.';
      case AcademyCategory.BEHAVIOR_AND_EMOTIONS:
      default:
        return 'During acute emotional surges, limbic threat circuits temporarily outpace prefrontal braking pathways; calm caregiver co-regulation lowers autonomic arousal so reflective thinking and skill learning can re-engage.';
    }
  })();

  let beat2Lead =
    rawPart2First ||
    `Understanding what is happening underneath {possessive} behavior shifts the entire room from frustration into calm curiosity.`;

  let scienceDeepDive = rawPart2Rest;
  if (!scienceDeepDive) {
    const sentences = rawPart2First
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (sentences.length >= 3) {
      beat2Lead = sentences.slice(0, 2).join(' ');
      scienceDeepDive = sentences.slice(2).join(' ');
    } else {
      scienceDeepDive = categoryScienceNote;
    }
  }
  if (scienceDeepDive.trim().toLowerCase() === beat2Lead.trim().toLowerCase()) {
    scienceDeepDive = categoryScienceNote;
  }

  const primaryCard = dialogueCards[0];
  const secondaryCard = dialogueCards[1];
  const calmScript =
    primaryCard?.empatheticScript ||
    'I see this feels hard right now. I am right here with you, and we will figure out the next step together.';

  const instincts = [
    {
      id: 'instinct-1',
      label: `“${(
        primaryCard?.instinctiveMistake ||
        lesson.whatNotToSay ||
        'Why do we have to fight about this every single day? Just cooperate!'
      ).replace(/^[“"]|[”"]$/g, '')}”`,
      whyTitle: 'Why that feels so natural—and what {poss} brain hears',
      whyText:
        primaryCard?.whyItBackfires ||
        'When we feel stretched thin, urgency sneaks into our voice. To a stressed child, urgency registers as threat, which pauses listening and escalates pushback.',
    },
    {
      id: 'instinct-2',
      label: `“${(
        secondaryCard?.instinctiveMistake ||
        'Fine—never mind, I will just give in or handle it myself so we can stop arguing.'
      ).replace(/^[“"]|[”"]$/g, '')}”`,
      whyTitle: 'Why that feels so natural—and what {poss} brain hears',
      whyText:
        secondaryCard?.whyItBackfires ||
        'Dropping the boundary brings instant quiet, which every tired parent craves. Over time, though, unpredictable limits leave {obj} pushing harder tomorrow to test where the steady wall actually is.',
    },
  ];

  const pushbacks = [
    {
      id: 'pushback-1',
      label: '“{Name} pushes back even louder”',
      setup:
        'Keep your posture relaxed and repeat the same steady boundary in fewer words:',
      script: secondaryCard?.empatheticScript
        ? `“${secondaryCard.empatheticScript.replace(/^[“"]|[”"]$/g, '')}”`
        : '“I hear how much you do not want this right now. The boundary stays steady, and I am right here while you let that feeling out.”',
    },
    {
      id: 'pushback-2',
      label: '“I already lost my cool earlier today”',
      setup:
        'A warm 15-second repair teaches more resilience than never losing patience:',
      script:
        '“Earlier I got overwhelmed and my voice got too loud. That was on me—let us try our calm reset together right now.”',
    },
  ];

  const fallbackMoves = [
    {
      id: 'move-1',
      title: 'Pause for one slow exhale before speaking',
      desc: 'Drop your shoulders and soften your vocal pitch first so {possessive} nervous system reads safety.',
    },
    {
      id: 'move-2',
      title: 'Use the calm phrase word-for-word once tonight',
      desc: 'Keep your delivery under two short sentences without adding a lecture at the end.',
    },
    {
      id: 'move-3',
      title: 'Adjust the environment 10 minutes earlier',
      desc: 'Set up one predictable cue before friction peaks so the routine does the heavy lifting for you.',
    },
  ];

  const moves =
    actionItems.length >= 3
      ? actionItems.slice(0, 3).map((item, idx) => ({
          id: item.id || `move-${idx + 1}`,
          title: item.label,
          desc: item.detail || fallbackMoves[idx]!.desc,
        }))
      : [
          ...actionItems.map((item, idx) => ({
            id: item.id || `move-${idx + 1}`,
            title: item.label,
            desc: item.detail || fallbackMoves[idx % 3]!.desc,
          })),
          ...fallbackMoves.slice(actionItems.length),
        ].slice(0, 3);

  const visualType = resolveDefaultVisualType(category, lesson.slug);
  const illustration = resolveDefaultIllustration(category, lesson.slug, tier);
  const episodeRole =
    lesson.episodeRole || resolveEpisodeRoleFromSortOrder(lesson.sortOrder);

  const visualTitles: Record<AlmanacVisualType, { title: string; hint: string }> = {
    [AlmanacVisualType.SENSORY_LADDER]: {
      title: 'The 5-step sensory comfort ladder',
      hint: 'Tap any step to watch comfort build',
    },
    [AlmanacVisualType.LENS_EXPOSURE_MATRIX]: {
      title: 'Flip the lens & see familiarity grow',
      hint: 'Compare lenses, then tap exposures below',
    },
    [AlmanacVisualType.BRAIN_BRIDGE]: {
      title: 'Upstairs brakes vs. downstairs alarm',
      hint: 'Toggle calm vs. overloaded state',
    },
    [AlmanacVisualType.CIRCADIAN_CURVE]: {
      title: 'Biological rhythm across the day',
      hint: 'Tap each window to spot the sweet spot',
    },
    [AlmanacVisualType.ROUTINE_TIMELINE]: {
      title: 'The friction-free rhythm strip',
      hint: 'Tap each beat of the routine',
    },
    [AlmanacVisualType.SERVE_RETURN_LOOP]: {
      title: 'The 3-beat connection loop',
      hint: 'Step through serve, pause, and warm echo',
    },
    [AlmanacVisualType.HABIT_GUARDRAIL]: {
      title: 'Willpower policing vs. neutral guardrail',
      hint: 'Toggle both approaches to compare',
    },
  };

  return {
    episodeRole,
    illustration,
    illustrationCaption: `Editorial field guide · ${lesson.module?.title ?? 'Parent Intelligence Academy'}`,
    headline: lesson.title,
    deck:
      (lesson.reliefTagline ?? '')
        .replace(/^[^\w"“]+/, '')
        .trim() ||
      'A practical mental model and calm words you can put to work today—without lectures or guesswork.',
    sceneTime: 'EVERYDAY MOMENT AT HOME',
    sceneBody,
    pollQuestion: 'Does this moment feel familiar in your home lately?',
    pollOptions: [
      {
        id: 'often',
        label: 'Yes—almost every week',
        response:
          'You are in good company. Moments like this spike right on schedule around {age}—and one small environmental shift takes the edge right off.',
      },
      {
        id: 'sometimes',
        label: 'Now and then',
        response:
          'Spotting the pattern while things are still manageable makes it much easier to practice calmly before stress peaks.',
      },
      {
        id: 'ahead',
        label: 'Just preparing ahead',
        response:
          'Knowing what is coming before it arrives keeps you steady and confident when the first bump shows up.',
      },
    ],
    beat2Kicker: 'Inside {possessive} growing mind',
    beat2Title: 'What is really happening underneath',
    beat2Lead,
    visualType,
    visualStageTitle: visualTitles[visualType].title,
    visualStageHint: visualTitles[visualType].hint,
    almanacTruth,
    scienceDeepDive,
    beat3Kicker: 'Practice before the moment arrives',
    beat3Title: 'What helps in the first ten seconds',
    rehearsalTriggerSpeaker: 'The tense moment with {name}',
    rehearsalTriggerQuote:
      '“Right when everyone is tired, the resistance spikes and your patience is running thin.”',
    rehearsalPrompt:
      'Which response feels closest to your honest instinct? Tap to see how {name} experiences it:',
    instincts,
    calmScriptPlain: `“${calmScript.replace(/^[“"]|[”"]$/g, '')}”`,
    calmScriptSegments: buildAnnotatedSegmentsFromScript(
      calmScript,
      lesson.deliveryTip ?? primaryCard?.deliveryTip
    ),
    deliveryCues: [
      lesson.deliveryTip || primaryCard?.deliveryTip || 'Lower your vocal pitch and slow down',
      'Keep it brief—under two sentences',
      'Hold warmth and boundary together',
    ],
    pushbacks,
    advisorPrompt: `“{Name} ({age}) is struggling with ${lesson.title.toLowerCase()} tonight—what calm words fit our exact situation right now?”`,
    beat4Kicker: 'Tonight’s small experiment',
    beat4Title: 'Pick just one move to try next',
    beat4Lead:
      'Your pick automatically updates your Pocket Card below so you walk away with one clear, low-stress plan.',
    moves,
    closingNote:
      'Measure tonight by the steadiness you bring to the room—not instant perfection. Small, calm repetitions quietly build lasting habits with {name}.',
    pocketInsight: almanacTruth,
    nextEpisodeHook: null,
  };
}

