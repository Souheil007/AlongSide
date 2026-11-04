import type { ChildDTO } from '@alongside/shared';

export interface ContextualPrompt {
  id: string;
  label: string;
  prompt: string;
  category:
    | 'health'
    | 'nutrition'
    | 'behavior'
    | 'devices'
    | 'brain-games'
    | 'academy'
    | 'digest'
    | 'general';
}

interface PromptTemplate {
  id: string;
  labelTemplate: string;
  promptTemplate: string;
  category: ContextualPrompt['category'];
}

const HEALTH_TEMPLATES: PromptTemplate[] = [
  {
    id: 'health-fever',
    labelTemplate: '101.5°F Fever Guidance',
    promptTemplate: '[Child] has a 101.5°F fever — when should I call the doctor?',
    category: 'health',
  },
  {
    id: 'health-cough-sleep',
    labelTemplate: 'Nighttime Cough Relief',
    promptTemplate:
      'What are safe non-medicinal ways to help [Child] sleep with a cough?',
    category: 'health',
  },
  {
    id: 'health-tummy-ache',
    labelTemplate: 'Tummy Ache Red Flags',
    promptTemplate:
      "How can I tell if [Child]'s tummy ache needs an urgent clinic visit?",
    category: 'health',
  },
];

const NUTRITION_TEMPLATES: PromptTemplate[] = [
  {
    id: 'nutrition-peanut-butter',
    labelTemplate: 'Allergen Introduction',
    promptTemplate:
      'How do I safely introduce thinned peanut butter to [Child]?',
    category: 'nutrition',
  },
  {
    id: 'nutrition-picky-eating',
    labelTemplate: 'Picky Eating Strategy',
    promptTemplate:
      'What should I do when [Child] refuses to eat anything green at dinner?',
    category: 'nutrition',
  },
  {
    id: 'nutrition-food-strike',
    labelTemplate: 'Food Strike Nutrition',
    promptTemplate:
      'Is [Child] getting adequate iron and nutrients during food strikes?',
    category: 'nutrition',
  },
];

const BEHAVIOR_TEMPLATES: PromptTemplate[] = [
  {
    id: 'behavior-meltdown-script',
    labelTemplate: 'Meltdown De-escalation',
    promptTemplate:
      "Give me a 3-sentence de-escalation script for [Child]'s screaming meltdown.",
    category: 'behavior',
  },
  {
    id: 'behavior-bedtime-stall',
    labelTemplate: 'Bedtime Stalling Script',
    promptTemplate: 'How to handle bedtime stalling without yelling.',
    category: 'behavior',
  },
  {
    id: 'behavior-halt-trigger',
    labelTemplate: 'Pre-Dinner HALT Trigger',
    promptTemplate:
      'Why does [Child] get dysregulated right before dinner (HALT)?',
    category: 'behavior',
  },
];

const DEVICES_TEMPLATES: PromptTemplate[] = [
  {
    id: 'devices-first-phone',
    labelTemplate: 'First-Device Readiness',
    promptTemplate: 'Is [Child] ready for an Apple Watch or phone?',
    category: 'devices',
  },
  {
    id: 'devices-slang-crashout',
    labelTemplate: "Decode 'Crashout' Slang",
    promptTemplate: "What does 'crashout' mean in tween slang?",
    category: 'devices',
  },
  {
    id: 'devices-curfew-lock',
    labelTemplate: 'Bedtime Curfew Lock',
    promptTemplate:
      'How to enforce an 8:30 PM bedtime curfew without an argument.',
    category: 'devices',
  },
];

const BRAIN_GAMES_TEMPLATES: PromptTemplate[] = [
  {
    id: 'games-boredom-buster',
    labelTemplate: '5-Min Boredom Buster',
    promptTemplate:
      'Quick 5-minute boredom buster game I can play with [Child] today.',
    category: 'brain-games',
  },
  {
    id: 'games-screen-free-coop',
    labelTemplate: 'Executive Function Play',
    promptTemplate:
      "What screen-free cooperative activities build [Child]'s executive function?",
    category: 'brain-games',
  },
  {
    id: 'games-sensory-calm',
    labelTemplate: 'Calming Sensory Play',
    promptTemplate:
      'How does purposeful sensory play reduce evening anxiety in [Child]?',
    category: 'brain-games',
  },
];

const ACADEMY_TEMPLATES: PromptTemplate[] = [
  {
    id: 'academy-dopamine',
    labelTemplate: 'Dopamine & Screens',
    promptTemplate:
      "How does dopamine affect [Child]'s impulse control during screen transitions?",
    category: 'academy',
  },
  {
    id: 'academy-authoritative',
    labelTemplate: 'Authoritative Boundaries',
    promptTemplate:
      'What does developmental neuroscience say about authoritative vs permissive parenting?',
    category: 'academy',
  },
  {
    id: 'academy-coregulation',
    labelTemplate: 'Emotional Co-regulation',
    promptTemplate:
      'How to explain brain development to [Child] simply.',
    category: 'academy',
  },
];

const DIGEST_TEMPLATES: PromptTemplate[] = [
  {
    id: 'digest-slang-tags',
    labelTemplate: 'Decode Slang Tags',
    promptTemplate: "What does 'crashout' mean in tween slang?",
    category: 'digest',
  },
  {
    id: 'digest-roblox-safety',
    labelTemplate: 'Roblox & Discord Safety',
    promptTemplate:
      'What should I know about Roblox and Discord safety this week?',
    category: 'digest',
  },
  {
    id: 'digest-dinner-starter',
    labelTemplate: 'Sunday Dinner Starter',
    promptTemplate:
      'Sunday dinner conversation starter to connect with [Child].',
    category: 'digest',
  },
];

const DEFAULT_DASHBOARD_TEMPLATES: PromptTemplate[] = [
  {
    id: 'dashboard-milestone',
    labelTemplate: '[Age]-Yr Milestone Check',
    promptTemplate:
      'What is the most important milestone for a [Age]-year-old right now?',
    category: 'general',
  },
  {
    id: 'dashboard-boredom-buster',
    labelTemplate: '5-Min Boredom Buster',
    promptTemplate:
      'Quick 5-minute boredom buster game I can play with [Child] today.',
    category: 'brain-games',
  },
  {
    id: 'dashboard-resilience',
    labelTemplate: 'Emotional Resilience',
    promptTemplate:
      "How can I support [Child]'s emotional resilience this week?",
    category: 'general',
  },
];

function replacePlaceholders(
  template: string,
  childName: string,
  ageStr: string
): string {
  let result = template;
  if (result.startsWith('[Child]')) {
    const capitalized = childName.charAt(0).toUpperCase() + childName.slice(1);
    result = capitalized + result.slice('[Child]'.length);
  }
  result = result.replace(/\[Child\]/g, childName);
  result = result.replace(/\[Age\]/g, ageStr);
  return result;
}

/**
 * Pure contextual quick prompt resolver.
 * Maps current navigation route and active child profile into 3-4 situational questions.
 */
export function resolveContextualPrompts(
  pathname: string,
  child: ChildDTO | null
): ContextualPrompt[] {
  const childName = child?.name?.trim() ? child.name.trim() : 'my child';
  const ageStr =
    child?.age !== undefined && child.age !== null ? String(child.age) : '8';

  const normalized = pathname.toLowerCase();

  let templates: PromptTemplate[];

  if (normalized.startsWith('/health')) {
    templates = HEALTH_TEMPLATES;
  } else if (normalized.startsWith('/nutrition')) {
    templates = NUTRITION_TEMPLATES;
  } else if (normalized.startsWith('/behavior')) {
    templates = BEHAVIOR_TEMPLATES;
  } else if (
    normalized.startsWith('/devices') ||
    normalized.startsWith('/pacts')
  ) {
    templates = DEVICES_TEMPLATES;
  } else if (normalized.startsWith('/brain-games')) {
    templates = BRAIN_GAMES_TEMPLATES;
  } else if (normalized.startsWith('/academy')) {
    templates = ACADEMY_TEMPLATES;
  } else if (normalized.startsWith('/digest')) {
    templates = DIGEST_TEMPLATES;
  } else {
    templates = DEFAULT_DASHBOARD_TEMPLATES;
  }

  return templates.map((t) => ({
    id: `${t.id}-${child?.id ?? 'generic'}`,
    label: replacePlaceholders(t.labelTemplate, childName, ageStr),
    prompt: replacePlaceholders(t.promptTemplate, childName, ageStr),
    category: t.category,
  }));
}
