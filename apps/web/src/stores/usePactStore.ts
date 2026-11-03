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
        ? '45 to 60 minutes of daily recreational screen time on communal family devices, strictly after homework and outdoor play.'
        : tier === DevelopmentalTier.TIER_1_AGES_8_9
        ? 'Up to 1 hour of recreational screen time on school days, prioritizing offline play, reading, and bedtime.'
        : tier === DevelopmentalTier.TIER_2_AGES_10_11
        ? 'Up to 1.5 hours of recreational screen time on school days, with mandatory 15-minute breaks each hour.'
        : tier === DevelopmentalTier.TIER_3_AGES_12_13
        ? 'Up to 2 hours of weekday screen time, self-monitoring recreational apps vs educational research.'
        : 'Autonomous screen time management with evening shutoff to ensure at least 8.5 hours of uninterrupted sleep.',
      isStandard: true,
      isCustom: false,
      sortOrder: 0,
    },
    {
      category: ClauseCategory.DEVICE_CURFEW,
      party: CommitmentParty.CHILD,
      title: `${formattedCurfew} Bedtime Kitchen Docking`,
      description: `All devices dock in the kitchen charging basket every night at ${formattedCurfew} sharp. No screens or notifications in the bedroom overnight to protect melatonin release and circadian sleep.`,
      isStandard: true,
      isCustom: false,
      sortOrder: 1,
    },
    {
      category: ClauseCategory.PRIVACY_SAFETY,
      party: CommitmentParty.CHILD,
      title: 'Open-Door Safety & Uncomfortable Encounters',
      description:
        'If I see, receive, or stumble upon anything online that feels uncomfortable, frightening, or predatory, I can bring it to my parents immediately without any risk of phone confiscation or anger.',
      isStandard: true,
      isCustom: false,
      sortOrder: 2,
    },
    {
      category: ClauseCategory.PURCHASES_CHATS,
      party: CommitmentParty.CHILD,
      title: 'Zero-Unauthorized Purchases & Group Chat Dignity',
      description:
        'No in-app purchases or subscriptions without explicit parent consent. In group chats, I will not participate in excluding classmates, gossip, or forwarding private screenshots without permission.',
      isStandard: true,
      isCustom: false,
      sortOrder: 3,
    },
    {
      category: ClauseCategory.CONTENT_BOUNDARIES,
      party: CommitmentParty.CHILD,
      title: 'Age-Appropriate Content & App Verification',
      description:
        'New apps, games, or social platforms are reviewed together with parents before installation, focusing on age ratings and safe chat defaults.',
      isStandard: true,
      isCustom: false,
      sortOrder: 4,
    },
    {
      category: ClauseCategory.PARENT_COMMITMENT,
      party: CommitmentParty.PARENT,
      title: 'Zero Stealth Surveillance & Respect for Privacy',
      description:
        'Parents promise never to install hidden keystroke loggers or read private text messages behind your back. Any boundary inspection will always be transparent and done together.',
      isStandard: true,
      isCustom: false,
      sortOrder: 5,
    },
    {
      category: ClauseCategory.PARENT_COMMITMENT,
      party: CommitmentParty.PARENT,
      title: 'Screen-Free Family Meals & Modeling Presence',
      description:
        'Parents commit to putting our own phones on silent and away during dinner, bedtime chats, and family conversations to model mindful tech presence.',
      isStandard: true,
      isCustom: false,
      sortOrder: 6,
    },
    {
      category: ClauseCategory.PARENT_COMMITMENT,
      party: CommitmentParty.PARENT,
      title: 'No-Shame Digital Recovery',
      description:
        'When digital mistakes occur, parents promise to respond with calm coaching and restorative learning rather than explosive anger or sudden device bans.',
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

  // Clause Configuration
  clauses: AgreementClauseInput[];
  curfewTime: string; // 24h format "20:30"

  // Bilateral Co-Signing
  parentSignature: string | null; // Data URL PNG
  childSignature: string | null; // Data URL PNG

  // Wizard Lifecycle
  activeStep: number; // 1: Clauses/Curfew, 2: Review, 3: Co-Signing, 4: Activation/Enrollment
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
    roadType?: RoadType
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
  clauses: CANONICAL_PRESET_CLAUSES,
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

export const usePactStore = create<PactState>((set, get) => ({
  ...initialState,

  initializeWizard: (childId, childName, tier, roadType) => {
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
      clauses: initialClauses,
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
    const { clauses } = get();

    // Synchronize the curfew clause with the new curfew time
    const updatedClauses = clauses.map((c) => {
      if (c.category === ClauseCategory.DEVICE_CURFEW) {
        return {
          ...c,
          title: `${formatted} Bedtime Kitchen Docking`,
          description: `All devices dock in the kitchen charging basket every night at ${formatted} sharp. No screens or notifications in the bedroom overnight to protect melatonin release and circadian sleep.`,
        };
      }
      return c;
    });

    set({ curfewTime, clauses: updatedClauses });
  },

  setClauses: (clauses) => {
    set({ clauses });
  },

  toggleClause: (targetClause) => {
    const { clauses } = get();
    const exists = clauses.some((c) => c.title === targetClause.title);

    if (exists) {
      // Remove it
      set({ clauses: clauses.filter((c) => c.title !== targetClause.title) });
    } else {
      // Add it
      set({
        clauses: [
          ...clauses,
          {
            ...targetClause,
            sortOrder: clauses.length,
          },
        ],
      });
    }
  },

  updateClause: (title, updates) => {
    const { clauses } = get();
    set({
      clauses: clauses.map((c) => (c.title === title ? { ...c, ...updates } : c)),
    });
  },

  addCustomClause: ({ category, party, title, description }) => {
    const { clauses } = get();
    const newClause: AgreementClauseInput = {
      category,
      party,
      title: title.trim(),
      description: description.trim(),
      isStandard: false,
      isCustom: true,
      sortOrder: clauses.length,
    };
    set({ clauses: [...clauses, newClause] });
  },

  removeClause: (title) => {
    const { clauses } = get();
    set({ clauses: clauses.filter((c) => c.title !== title) });
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
