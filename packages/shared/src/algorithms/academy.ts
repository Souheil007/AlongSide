import { AcademyCategory, LessonArchetype } from '../constants/index.js';
import type {
  ActionProtocolItem,
  AdaptiveModuleType,
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

