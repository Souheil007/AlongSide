import {
  ClauseCategory,
  CommitmentParty,
  DevelopmentalTier,
  RoadType,
  type AgreementClauseInput,
} from '@alongside/shared';

export interface PactPresetCategoryGroup {
  category: ClauseCategory;
  categoryLabel: string;
  clauses: AgreementClauseInput[];
}

export function getAgreementPresets(
  tier: DevelopmentalTier = DevelopmentalTier.TIER_2_AGES_10_11,
  roadType: RoadType = RoadType.ACTIVE_DEVICE
): AgreementClauseInput[] {
  const isPreDevice = roadType === RoadType.PRE_DEVICE;
  const clauses: AgreementClauseInput[] = [];
  let sortOrder = 0;

  // 1. SCREEN_TIME BUDGET
  if (isPreDevice) {
    clauses.push({
      category: ClauseCategory.SCREEN_TIME,
      party: CommitmentParty.CHILD,
      title: 'Shared Living Room Screen Budget',
      description:
        tier === DevelopmentalTier.TIER_1_AGES_8_9
          ? '45 minutes of recreational screen time per school day on family devices, strictly after homework and outdoor play.'
          : '60 minutes of daily screen time on family devices after responsibilities and family chores are complete.',
      isStandard: true,
      isCustom: false,
      sortOrder: sortOrder++,
    });
  } else {
    clauses.push({
      category: ClauseCategory.SCREEN_TIME,
      party: CommitmentParty.CHILD,
      title: 'Balanced Daily Screen Budget',
      description:
        tier === DevelopmentalTier.TIER_1_AGES_8_9
          ? 'Up to 1 hour of recreational screen time on school days, prioritizing offline play, reading, and bedtime.'
          : tier === DevelopmentalTier.TIER_2_AGES_10_11
          ? 'Up to 1.5 hours of recreational screen time on school days, with mandatory 15-minute breaks each hour.'
          : tier === DevelopmentalTier.TIER_3_AGES_12_13
          ? 'Up to 2 hours of weekday screen time, self-monitoring recreational apps vs educational research.'
          : 'Autonomous screen time management with evening shutoff to ensure at least 8.5 hours of uninterrupted sleep.',
      isStandard: true,
      isCustom: false,
      sortOrder: sortOrder++,
    });
  }

  // 2. DEVICE_CURFEW (Canonical 8:30 PM Bedtime Curfew)
  const curfewTime =
    tier === DevelopmentalTier.TIER_1_AGES_8_9
      ? '8:00 PM'
      : tier === DevelopmentalTier.TIER_2_AGES_10_11 || tier === DevelopmentalTier.TIER_3_AGES_12_13
      ? '8:30 PM'
      : '9:30 PM';

  clauses.push({
    category: ClauseCategory.DEVICE_CURFEW,
    party: CommitmentParty.CHILD,
    title: `${curfewTime} Bedtime Kitchen Docking`,
    description: `All personal and family devices dock in the kitchen charging basket every night at ${curfewTime} sharp. No screens or notifications in the bedroom overnight to protect melatonin release and circadian sleep.`,
    isStandard: true,
    isCustom: false,
    sortOrder: sortOrder++,
  });

  // 3. PRIVACY & SAFETY (Open-Door Safe Harbor)
  clauses.push({
    category: ClauseCategory.PRIVACY_SAFETY,
    party: CommitmentParty.CHILD,
    title: 'Open-Door Safety & Uncomfortable Encounters',
    description:
      'If I see, receive, or stumble upon anything online that feels uncomfortable, frightening, or predatory, I can bring it to my parents immediately without any risk of phone confiscation or anger.',
    isStandard: true,
    isCustom: false,
    sortOrder: sortOrder++,
  });

  // 4. PURCHASES & GROUP CHATS
  clauses.push({
    category: ClauseCategory.PURCHASES_CHATS,
    party: CommitmentParty.CHILD,
    title: 'Zero-Unauthorized Purchases & Group Chat Dignity',
    description:
      'No in-app purchases or subscriptions without explicit parent consent. In group chats, I will not participate in excluding classmates, gossip, or forwarding private screenshots without permission.',
    isStandard: true,
    isCustom: false,
    sortOrder: sortOrder++,
  });

  // 5. CONTENT BOUNDARIES (Age Gating)
  clauses.push({
    category: ClauseCategory.CONTENT_BOUNDARIES,
    party: CommitmentParty.CHILD,
    title: 'App Store Age Gating & Platform Ratings',
    description:
      tier === DevelopmentalTier.TIER_1_AGES_8_9
        ? 'Apps and games restricted to 9+ rating. Web browsing filtered with parental safe-search enabled.'
        : tier === DevelopmentalTier.TIER_2_AGES_10_11
        ? 'Apps and social games restricted to 12+ rating. Social media accounts remain private to verified real-life friends.'
        : 'Respecting platform minimum age guidelines (13+), keeping location sharing limited to family members only.',
    isStandard: true,
    isCustom: false,
    sortOrder: sortOrder++,
  });

  // 6. PARENT BILATERAL COMMITMENT: NO SNOOPING SAFE HARBOR
  clauses.push({
    category: ClauseCategory.PARENT_COMMITMENT,
    party: CommitmentParty.PARENT,
    title: 'No-Snooping Safe Harbor Guarantee',
    description:
      'Parents promise never to secretively read personal text messages or search histories behind your back. Any device review will be conducted together with you in the room, except in an immediate physical safety emergency.',
    isStandard: true,
    isCustom: false,
    sortOrder: sortOrder++,
  });

  // 7. PARENT BILATERAL COMMITMENT: DEVICE-FREE DINNERS & MODELING
  clauses.push({
    category: ClauseCategory.PARENT_COMMITMENT,
    party: CommitmentParty.PARENT,
    title: 'Device-Free Family Dinner & Mindful Modeling',
    description:
      'Parents commit to putting our own phones on silent and away from the dinner table, giving 100% focused attention to family conversations and modeling healthy digital limits.',
    isStandard: true,
    isCustom: false,
    sortOrder: sortOrder++,
  });

  // 8. PARENT BILATERAL COMMITMENT: NON-PUNITIVE TECH PROBLEM SOLVING
  clauses.push({
    category: ClauseCategory.PARENT_COMMITMENT,
    party: CommitmentParty.PARENT,
    title: 'Non-Punitive Tech Discussions',
    description:
      'Parents promise to listen with calm empathy rather than reflexively seizing devices when mistakes, screen transitions, or dopamine crashes happen.',
    isStandard: true,
    isCustom: false,
    sortOrder: sortOrder++,
  });

  return clauses;
}

export function getGroupedAgreementPresets(
  tier: DevelopmentalTier = DevelopmentalTier.TIER_2_AGES_10_11,
  roadType: RoadType = RoadType.ACTIVE_DEVICE
): PactPresetCategoryGroup[] {
  const clauses = getAgreementPresets(tier, roadType);
  const categoryLabels: Record<ClauseCategory, string> = {
    [ClauseCategory.SCREEN_TIME]: 'Screen Time Budgets',
    [ClauseCategory.DEVICE_CURFEW]: 'Bedtime & Curfew Boundaries',
    [ClauseCategory.PRIVACY_SAFETY]: 'Privacy, Trust & Safety',
    [ClauseCategory.PURCHASES_CHATS]: 'Purchases & Group Chat Civility',
    [ClauseCategory.CONTENT_BOUNDARIES]: 'Content & App Boundaries',
    [ClauseCategory.PARENT_COMMITMENT]: 'Parent Bilateral Commitments',
  };

  const map = new Map<ClauseCategory, AgreementClauseInput[]>();
  for (const clause of clauses) {
    const existing = map.get(clause.category) ?? [];
    existing.push(clause);
    map.set(clause.category, existing);
  }

  const result: PactPresetCategoryGroup[] = [];
  for (const [category, groupedClauses] of map.entries()) {
    result.push({
      category,
      categoryLabel: categoryLabels[category] ?? category,
      clauses: groupedClauses,
    });
  }

  return result;
}
