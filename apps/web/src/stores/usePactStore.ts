import { create } from 'zustand';
import {
  ClauseCategory,
  CommitmentParty,
  DevelopmentalTier,
  RoadType,
  type AgreementClauseInput,
  type DeviceProfileDTO,
} from '@alongside/shared';

export function formatCurfew12Hour(time24: string): string {
  const parts = time24.split(':');
  if (parts.length < 2) return time24;
  const hours = parseInt(parts[0] || '20', 10);
  const minutes = parts[1] || '30';
  if (isNaN(hours)) return time24;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${minutes} ${ampm}`;
}

export function getDefaultClausesForTierAndRoad(
  tier: DevelopmentalTier = DevelopmentalTier.TIER_2_AGES_10_11,
  roadType: RoadType = RoadType.ACTIVE_DEVICE,
  curfewTime = '20:30'
): AgreementClauseInput[] {
  const isPreDevice = roadType === RoadType.PRE_DEVICE;
  const formattedCurfew = formatCurfew12Hour(curfewTime);

  const clauses: AgreementClauseInput[] = [
    {
      category: ClauseCategory.SCREEN_TIME,
      party: CommitmentParty.CHILD,
      title: isPreDevice
        ? 'Shared Family Screen Budget'
        : 'Balanced Daily Screen Budget',
      description: isPreDevice
        ? '45 to 60 minutes of daily fun screen time on communal family devices, after homework and offline play are wrapped up.'
        : tier === DevelopmentalTier.TIER_1_AGES_8_9
        ? 'Up to 1 hour of fun screen time on school days, saving plenty of room for outdoor play, reading, and sleep.'
        : tier === DevelopmentalTier.TIER_2_AGES_10_11
        ? 'Up to 1.5 hours of fun screen time on school days, taking a quick stretch break every hour.'
        : tier === DevelopmentalTier.TIER_3_AGES_12_13
        ? 'Up to 2 hours of weekday fun screen time, keeping schoolwork and social scrolling clearly separate.'
        : 'Self-managed daily screen time with an evening wind-down that protects 8.5 hours of real sleep.',
      isStandard: true,
      isCustom: false,
      sortOrder: 0,
    },
    {
      category: ClauseCategory.DEVICE_CURFEW,
      party: CommitmentParty.CHILD,
      title: `${formattedCurfew} Bedtime Kitchen Docking`,
      description: `Every night at ${formattedCurfew}, my device plugs in at the kitchen charging spot (never in the bedroom) so my brain gets deep, uninterrupted sleep.`,
      isStandard: true,
      isCustom: false,
      sortOrder: 1,
    },
    {
      category: ClauseCategory.PRIVACY_SAFETY,
      party: CommitmentParty.CHILD,
      title: 'Open-Door Safety & Uncomfortable Encounters',
      description:
        'If I see something weird, scary, or mean online, or make a mistake, I will bring it straight to my parents, knowing I will get calm help instead of getting yelled at.',
      isStandard: true,
      isCustom: false,
      sortOrder: 2,
    },
    {
      category: ClauseCategory.PURCHASES_CHATS,
      party: CommitmentParty.CHILD,
      title: 'Ask Before Buying & Kind Group Chats',
      description:
        'I will always ask before spending money or signing up for subscriptions. In group chats, I will skip piling on others and never forward private screenshots.',
      isStandard: true,
      isCustom: false,
      sortOrder: 3,
    },
    {
      category: ClauseCategory.CONTENT_BOUNDARIES,
      party: CommitmentParty.CHILD,
      title: 'Check New Apps & Games Together',
      description:
        'Before downloading a new app, game, or social platform, we take two minutes together to check age ratings and set chat privacy to safe defaults.',
      isStandard: true,
      isCustom: false,
      sortOrder: 4,
    },
    {
      category: ClauseCategory.PARENT_COMMITMENT,
      party: CommitmentParty.PARENT,
      title: 'Zero Stealth Surveillance & Respect for Privacy',
      description:
        'We promise never to install secret spyware or read your private messages behind your back. Any check-in on settings or safety happens openly, side by side.',
      isStandard: true,
      isCustom: false,
      sortOrder: 5,
    },
    {
      category: ClauseCategory.PARENT_COMMITMENT,
      party: CommitmentParty.PARENT,
      title: 'Screen-Free Family Meals & Modeling Presence',
      description:
        'We will silence and park our own phones during family dinners, car chats, and bedtime wind-down, because the house rules apply to grown-ups too.',
      isStandard: true,
      isCustom: false,
      sortOrder: 6,
    },
    {
      category: ClauseCategory.PARENT_COMMITMENT,
      party: CommitmentParty.PARENT,
      title: 'No-Shame Digital Recovery',
      description:
        'When a digital mistake happens, we promise to take a breath and help you solve it calmly rather than blowing up or yanking your device in anger.',
      isStandard: true,
      isCustom: false,
      sortOrder: 7,
    },
  ];

  return clauses;
}

export const CANONICAL_PRESET_CLAUSES = getDefaultClausesForTierAndRoad();

export interface PactState {
  // Metadata & Context
  childId: string | null;
  childName: string;
  developmentalTier: DevelopmentalTier;
  roadType: RoadType;
  agreementTitle: string;
  recommendedPreset: string | null;

  // Clause Configuration
  clauses: AgreementClauseInput[]; // Active clauses included in the pact
  catalogClauses: AgreementClauseInput[]; // All available (active + paused) clauses so toggling off never deletes them
  curfewTime: string; // 24h format "20:30"

  // Bilateral Co-Signing
  parentSignature: string | null; // Data URL PNG
  childSignature: string | null; // Data URL PNG

  // Wizard Lifecycle
  activeStep: number; // 1: Foundations & Curfew, 2: Promises, 3: Co-Signing, 4: Sealed & Deploy
  agreementId: string | null;
  isSaving: boolean;
  isCompiling: boolean;
  compiledProfile: DeviceProfileDTO | null;
  error: string | null;

  // Actions
  initializeWizard: (
    childId: string,
    childName: string,
    tier?: DevelopmentalTier,
    roadType?: RoadType,
    preset?: string | null
  ) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTitle: (title: string) => void;
  setCurfewTime: (curfewTime: string) => void;
  setClauses: (clauses: AgreementClauseInput[]) => void;
  toggleClause: (clause: AgreementClauseInput) => void;
  updateClause: (title: string, updates: Partial<AgreementClauseInput>) => void;
  addCustomClause: (clause: {
    category: ClauseCategory;
    party: CommitmentParty;
    title: string;
    description: string;
  }) => void;
  removeClause: (title: string) => void;
  setParentSignature: (dataUrl: string | null) => void;
  setChildSignature: (dataUrl: string | null) => void;
  setAgreementId: (id: string | null) => void;
  setCompiledProfile: (profile: DeviceProfileDTO | null) => void;
  setIsSaving: (isSaving: boolean) => void;
  setIsCompiling: (isCompiling: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  childId: null,
  childName: '',
  developmentalTier: DevelopmentalTier.TIER_2_AGES_10_11,
  roadType: RoadType.ACTIVE_DEVICE,
  agreementTitle: 'Family Tech Agreement',
  recommendedPreset: null as string | null,
  clauses: CANONICAL_PRESET_CLAUSES,
  catalogClauses: CANONICAL_PRESET_CLAUSES,
  curfewTime: '20:30',
  parentSignature: null,
  childSignature: null,
  activeStep: 1,
  agreementId: null,
  isSaving: false,
  isCompiling: false,
  compiledProfile: null,
  error: null,
};

function syncCurfewInClauseList(
  list: AgreementClauseInput[],
  formattedCurfew: string
): AgreementClauseInput[] {
  return list.map((c) => {
    if (c.category === ClauseCategory.DEVICE_CURFEW && c.isStandard) {
      return {
        ...c,
        title: `${formattedCurfew} Bedtime Kitchen Docking`,
        description: `Every night at ${formattedCurfew}, my device plugs in at the kitchen charging spot (never in the bedroom) so my brain gets deep, uninterrupted sleep.`,
      };
    }
    return c;
  });
}

export const usePactStore = create<PactState>((set, get) => ({
  ...initialState,

  initializeWizard: (childId, childName, tier, roadType, preset = null) => {
    const activeTier = tier || DevelopmentalTier.TIER_2_AGES_10_11;
    const activeRoad = roadType || RoadType.ACTIVE_DEVICE;
    const defaultCurfew = '20:30';
    const initialClauses = getDefaultClausesForTierAndRoad(
      activeTier,
      activeRoad,
      defaultCurfew
    );

    set({
      childId,
      childName,
      developmentalTier: activeTier,
      roadType: activeRoad,
      agreementTitle: `${childName}'s Family Tech Agreement`,
      recommendedPreset: preset ?? null,
      clauses: initialClauses,
      catalogClauses: initialClauses,
      curfewTime: defaultCurfew,
      parentSignature: null,
      childSignature: null,
      activeStep: 1,
      agreementId: null,
      compiledProfile: null,
      error: null,
    });
  },

  setStep: (activeStep) => {
    if (activeStep >= 1 && activeStep <= 4) {
      set({ activeStep });
    }
  },

  nextStep: () => {
    const { activeStep } = get();
    if (activeStep < 4) {
      set({ activeStep: activeStep + 1 });
    }
  },

  prevStep: () => {
    const { activeStep } = get();
    if (activeStep > 1) {
      set({ activeStep: activeStep - 1 });
    }
  },

  setTitle: (agreementTitle) => {
    set({ agreementTitle });
  },

  setCurfewTime: (curfewTime) => {
    const formatted = formatCurfew12Hour(curfewTime);
    const { clauses, catalogClauses } = get();

    set({
      curfewTime,
      clauses: syncCurfewInClauseList(clauses, formatted),
      catalogClauses: syncCurfewInClauseList(catalogClauses, formatted),
    });
  },

  setClauses: (clauses) => {
    set({ clauses });
  },

  toggleClause: (targetClause) => {
    const { clauses, catalogClauses } = get();
    const exists = clauses.some((c) => c.title === targetClause.title);
    const inCatalog = catalogClauses.some((c) => c.title === targetClause.title);

    if (exists) {
      set({
        clauses: clauses.filter((c) => c.title !== targetClause.title),
        catalogClauses: inCatalog ? catalogClauses : [...catalogClauses, targetClause],
      });
    } else {
      const nextClause = {
        ...targetClause,
        sortOrder: clauses.length,
      };
      set({
        clauses: [...clauses, nextClause],
        catalogClauses: inCatalog ? catalogClauses : [...catalogClauses, nextClause],
      });
    }
  },

  updateClause: (title, updates) => {
    const { clauses, catalogClauses } = get();
    set({
      clauses: clauses.map((c) => (c.title === title ? { ...c, ...updates } : c)),
      catalogClauses: catalogClauses.map((c) =>
        c.title === title ? { ...c, ...updates } : c
      ),
    });
  },

  addCustomClause: ({ category, party, title, description }) => {
    const { clauses, catalogClauses } = get();
    const newClause: AgreementClauseInput = {
      category,
      party,
      title: title.trim(),
      description: description.trim(),
      isStandard: false,
      isCustom: true,
      sortOrder: clauses.length,
    };
    set({
      clauses: [...clauses, newClause],
      catalogClauses: [...catalogClauses, newClause],
    });
  },

  removeClause: (title) => {
    const { clauses, catalogClauses } = get();
    set({
      clauses: clauses.filter((c) => c.title !== title),
      catalogClauses: catalogClauses.filter((c) => c.title !== title),
    });
  },

  setParentSignature: (parentSignature) => {
    set({ parentSignature });
  },

  setChildSignature: (childSignature) => {
    set({ childSignature });
  },

  setAgreementId: (agreementId) => {
    set({ agreementId });
  },

  setCompiledProfile: (compiledProfile) => {
    set({ compiledProfile });
  },

  setIsSaving: (isSaving) => {
    set({ isSaving });
  },

  setIsCompiling: (isCompiling) => {
    set({ isCompiling });
  },

  setError: (error) => {
    set({ error });
  },

  reset: () => {
    set({ ...initialState });
  },
}));
