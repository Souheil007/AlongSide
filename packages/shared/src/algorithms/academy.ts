import { AcademyCategory } from '../constants/index.js';
import type {
  ActionProtocolItem,
  AdaptiveModuleType,
  DialogueCardDTO,
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

export function resolveReliefTagline(
  title: string,
  category?: AcademyCategory
): string {
  switch (category) {
    case AcademyCategory.BEHAVIOR_AND_EMOTIONS:
      return '💡 100% normal autonomic surge at this developmental stage, not a discipline failure';
    case AcademyCategory.HEALTH_AND_WELLNESS:
      return '💡 Pediatric biological rhythm shift, not stubborn bedtime defiance';
    case AcademyCategory.NUTRITION_AND_FEEDING:
      return '💡 Natural neophobic palate protection, not intentional mealtime rejection';
    case AcademyCategory.DEVELOPMENT_AND_PLAY:
      return '💡 Rapid synaptic arborization at play, not attention deficiency';
    case AcademyCategory.DIGITAL_AND_DEVICES:
      return '💡 Dopaminergic variable-reward hook, not moral weakness';
    default:
      return '💡 Normal neurodevelopmental milestone, not a parenting inadequacy';
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
    />\s*\*\*Clinical Insight:\*\*\s*([^\n]+)/i
  );
  if (clinicalMatch && clinicalMatch[1]) {
    coreProblem = clinicalMatch[1].trim();
  } else if (cards[0]?.whyItBackfires) {
    coreProblem = cards[0].whyItBackfires;
  } else {
    coreProblem = `Autonomic arousal during ${title.toLowerCase()} without prefrontal emotional braking.`;
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

