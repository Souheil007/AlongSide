import type {
  AcademyCategory,
  AgreementStatus,
  AlmanacVisualType,
  ChapterPriority,
  ClauseCategory,
  CommitmentParty,
  DevelopmentalTier,
  DevicePlatform,
  DeviceProfileStatus,
  DietaryStage,
  DigestContentStatus,
  DigestIssueStatus,
  DigestItemType,
  EarlyChildhoodTranche,
  EditorialIllustrationKey,
  EpisodeRole,
  ExploitSeverity,
  Gender,
  MessageRole,
  MilestoneCategory,
  MilestoneStatus,
  PlayCategory,
  QuizType,
  RoadType,
  Role,
  SubscriptionTier,
  NutritionStage,
  LessonArchetype,
} from '../constants/index.js';

export type {
  AlmanacVisualType,
  EarlyChildhoodTranche,
  EditorialIllustrationKey,
  EpisodeRole,
  LessonArchetype,
};

export interface LessonArchetypeHeadings {
  bannerPrefix: string;
  quickReadTitle: string;
  part1Eyebrow: string;
  part1Title: string;
  part2Eyebrow: string;
  part2Title: string;
  part3Eyebrow: string;
  part3Title: string;
  part4Eyebrow: string;
  part4Title: string;
  takeawayLabel: string;
  closingLabel: string;
}

export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
}

export interface UserSubscriptionDTO {
  tier: SubscriptionTier;
  isActive: boolean;
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
}

export interface UserDTO {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  createdAt: string;
  subscription?: UserSubscriptionDTO | null;
  childrenCount?: number;
}

export interface ChildDTO {
  id: string;
  userId: string;
  name: string;
  gender: Gender;
  birthYear: number;
  birthMonth: number;
  birthDate?: string | null;
  age: number;
  ageMonths?: number | null;
  earlyChildhoodTranche?: EarlyChildhoodTranche | null;
  roadType: RoadType;
  developmentalTier: DevelopmentalTier;
  dietaryStage?: DietaryStage | string | null;
  allergies?: string[] | null;
  recentHealthLogs?: string[] | null;
  pediatricNotes?: string | null;
  schoolGrade?: string | null;
  deviceProfileStatus?: DeviceProfileStatus | null;
  latestAssessmentScore?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AgreementClauseDTO {
  id: string;
  agreementId: string;
  category: ClauseCategory;
  party: CommitmentParty;
  title: string;
  description: string;
  isStandard: boolean;
  isCustom: boolean;
  sortOrder: number;
}

export interface AgreementDTO {
  id: string;
  userId: string;
  childId: string;
  title: string;
  status: AgreementStatus;
  developmentalTier: DevelopmentalTier;
  roadType: RoadType;
  parentSignature?: string | null;
  childSignature?: string | null;
  signedAt?: string | null;
  pdfExportUrl?: string | null;
  clauses?: AgreementClauseDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface DeviceProfileDTO {
  id: string;
  childId: string;
  agreementId?: string | null;
  platform: DevicePlatform;
  status: DeviceProfileStatus;
  enrollmentToken: string;
  bedtimeCurfewTime: string;
  isLockdownActive: boolean;
  tamperDetected: boolean;
  enrolledAt?: string | null;
  lastHeartbeatAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QuizOptionDTO {
  id: string;
  optionText: string;
  isCorrect?: boolean;
  feedbackText?: string | null;
  sortOrder: number;
}

export interface QuizQuestionDTO {
  id: string;
  quizId: string;
  questionText: string;
  explanation?: string | null;
  dimensionKey?: string | null;
  sortOrder: number;
  options: QuizOptionDTO[];
}

export interface QuizDTO {
  id: string;
  type: QuizType;
  title: string;
  description: string;
  estimatedMinutes: number;
  questions: QuizQuestionDTO[];
}

export interface QuizAttemptDTO {
  id: string;
  quizId: string;
  userId: string;
  childId?: string | null;
  overallScore: number;
  dimensionScores?: Record<string, number> | null;
  recommendation?: string;
  recommendedRoadmapPreset?: string;
  completedAt: string;
}

export interface AiMessageDTO {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  matchedFaqIds?: string[];
  tokensUsed?: number;
  createdAt: string;
}

export interface FaqItemDTO {
  id: string;
  categoryId: string;
  categorySlug?: string;
  categoryName?: string;
  targetTier?: DevelopmentalTier | null;
  targetRoad?: RoadType | null;
  question: string;
  answerMarkdown: string;
  deEscalationScript?: string | null;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SlangTermDTO {
  id: string;
  term: string;
  definition: string;
  exampleSentence: string;
  contextTone: string;
}

export interface ExploitAlertDTO {
  id: string;
  appName: string;
  exploitDescription: string;
  howKidsBypass: string;
  parentRemedy: string;
  severity: ExploitSeverity;
}

export interface CultureDigestDTO {
  id: string;
  issueNumber: number;
  publishDate: string;
  title: string;
  summary: string;
  conversationStarter: string;
  slangTerms: SlangTermDTO[];
  exploitAlerts: ExploitAlertDTO[];
}

export type DigestQueryScope = 'issue' | 'all';
export type DigestVideoDurationBucket = 'all' | 'short' | 'medium' | 'deep';

export interface DigestIssueSummaryDTO {
  id: string;
  issueNumber: number;
  publishDate: string;
  weekStart: string;
  weekEnd: string;
  title: string;
  summary: string;
  status: DigestIssueStatus;
  articleCount: number;
  videoCount: number;
}

export interface DigestArticleDTO {
  id: string;
  digestId: string;
  issueNumber: number;
  title: string;
  summary: string;
  keyShift: string;
  perspectiveNote?: string | null;
  topicLabel: string;
  readMinutes: number;
  sourceName: string;
  sourceDomain: string;
  sourceUrl: string;
  authorName?: string | null;
  imageUrl?: string | null;
  publishedAt: string;
  isOriginalEditorial: boolean;
  contentMarkdown?: string | null;
  sourcesText?: string | null;
  targetTiers: DevelopmentalTier[];
  isLead: boolean;
  sortOrder: number;
  isRead: boolean;
  isSaved: boolean;
}

export interface DigestVideoDTO {
  id: string;
  digestId: string;
  issueNumber: number;
  youtubeVideoId: string;
  videoUrl: string;
  title: string;
  presenter: string;
  channelName: string;
  channelId?: string | null;
  publishedAt: string;
  durationMinutes: number;
  formatLabel: string;
  takeaway: string;
  jumpChips?: VideoJumpChip[];
  skimBullets: string[];
  targetTiers: DevelopmentalTier[];
  isEmbeddable: boolean;
  sortOrder: number;
  isSaved: boolean;
}

export interface DigestDinnerPromptDTO {
  id: string;
  digestId: string;
  issueNumber: number;
  question: string;
  parentTip: string;
  followUp: string;
  targetTiers: DevelopmentalTier[];
  sortOrder: number;
  isSaved: boolean;
}

export interface DigestPhraseDTO {
  id: string;
  digestId: string;
  issueNumber: number;
  word: string;
  shortMeaning: string;
  fullMeaning: string;
  cringeLevel: number;
  cringeLabel: string;
  calmScript: string;
  targetTiers: DevelopmentalTier[];
  sortOrder: number;
}

export interface WeeklyDigestEditionDTO {
  issue: DigestIssueSummaryDTO;
  resolvedTier: DevelopmentalTier;
  videos: DigestVideoDTO[];
  articles: DigestArticleDTO[];
  dinnerPrompts: DigestDinnerPromptDTO[];
  phrases: DigestPhraseDTO[];
  readArticleCount: number;
  totalArticleCount: number;
}

export interface SavedDigestShortlistDTO {
  articles: DigestArticleDTO[];
  videos: DigestVideoDTO[];
  dinnerPrompts: DigestDinnerPromptDTO[];
  totalCount: number;
}

export interface DigestInteractionResultDTO {
  itemType: DigestItemType;
  itemId: string;
  isRead: boolean;
  isSaved: boolean;
}

export interface DigestArticlesResponseDTO {
  articles: DigestArticleDTO[];
  unreadCount: number;
  totalInScope: number;
  issueNumber?: number;
}

export interface DigestVideosResponseDTO {
  videos: DigestVideoDTO[];
  totalInScope: number;
  issueNumber?: number;
}

export interface AcademyCategoryStatsDTO {
  category: AcademyCategory;
  title: string;
  description: string;
  moduleCount: number;
  lessonCount: number;
}

export interface AcademyChapterDTO {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  summary: string;
  priority: number; // 1 = Critical, 2 = Routines, 3 = Scaffolding
  sortOrder: number;
  lessonCount: number;
  completedLessonCount: number;
  isCompleted: boolean;
  lessons: AcademyLessonSummaryDTO[];
}

export interface AcademyModuleDTO {
  id: string;
  category: AcademyCategory;
  slug: string;
  title: string;
  summary: string;
  reliefSubtitle?: string;
  tonightQuickWinTitle?: string;
  coverImageUrl?: string | null;
  developmentalTier: DevelopmentalTier;
  sortOrder: number;
  chapterCount?: number;
  lessonCount: number;
  completedLessonCount: number;
  isCompleted: boolean;
  hasMasterLecture?: boolean;
  featuredVideoLecture?: MasterVideoLectureDTO | null;
  lessons?: AcademyLessonSummaryDTO[];
}

export type AdaptiveModuleType =
  | 'SOMATIC_RESET'
  | 'CIRCADIAN_TIMELINE'
  | 'FEEDING_LADDER'
  | 'PLAY_BLUEPRINT'
  | 'PACT_CLAUSE';

export interface ThirtySecondGlanceDTO {
  coreProblem: string;
  immediateShift: string;
  exactWords: string;
}
export type ThirtySecondGlance = ThirtySecondGlanceDTO;

export interface DialogueCardDTO {
  instinctiveMistake: string;
  whyItBackfires: string;
  empatheticScript: string;
  deliveryTip: string;
}
export type DialogueCardItem = DialogueCardDTO;

export interface VideoJumpChip {
  seconds: number;
  label: string;
}

export interface MasterVideoLectureDTO {
  videoUrl: string;
  title: string;
  presenter: string;
  channel: string;
  durationMinutes: number;
  parentHook?: string;
  keyTakeaways?: string[];
  actionPrompt?: string;
  jumpChips?: VideoJumpChip[];
}

export interface AnnotatedScriptSegment {
  id?: string;
  text: string;
  tag?: string;
  note?: string;
}

export interface AlmanacPollOption {
  id: string;
  label: string;
  response: string;
}

export interface AlmanacInstinctOption {
  id: string;
  label: string;
  whyTitle: string;
  whyText: string;
}

export interface AlmanacPushbackOption {
  id: string;
  label: string;
  setup: string;
  script: string;
}

export interface AlmanacMoveOption {
  id: string;
  title: string;
  desc: string;
}

export interface AlmanacNextEpisodeHook {
  kicker?: string;
  mystery: string;
  title?: string;
  targetSlug?: string;
}

export interface AlmanacLessonPayload {
  episodeRole: EpisodeRole;
  illustration: EditorialIllustrationKey;
  illustrationCaption: string;
  headline: string;
  deck: string;
  sceneTime: string;
  sceneBody: string;
  pollQuestion: string;
  pollOptions: AlmanacPollOption[];
  beat2Kicker: string;
  beat2Title: string;
  beat2Lead: string;
  visualType: AlmanacVisualType;
  visualStageTitle: string;
  visualStageHint: string;
  visualConfig?: Record<string, unknown>;
  almanacTruth: string;
  scienceDeepDive: string;
  beat3Kicker: string;
  beat3Title: string;
  rehearsalTriggerSpeaker: string;
  rehearsalTriggerQuote: string;
  rehearsalPrompt: string;
  instincts: AlmanacInstinctOption[];
  calmScriptPlain: string;
  calmScriptSegments: AnnotatedScriptSegment[];
  deliveryCues: string[];
  pushbacks: AlmanacPushbackOption[];
  advisorPrompt: string;
  beat4Kicker: string;
  beat4Title: string;
  beat4Lead: string;
  moves: AlmanacMoveOption[];
  closingNote: string;
  pocketInsight: string;
  nextEpisodeHook?: AlmanacNextEpisodeHook | null;
  interactiveHighlights?: string[];
}

export interface LessonPlaybookStateDTO {
  isCompleted: boolean;
  chosenMoveId: string | null;
  bookmarkedTruth: boolean;
  savedPushbackIds: string[];
  completedAt?: string | null;
}

export interface LessonPlaybookInputDTO {
  chosenMoveId?: string | null;
  bookmarkedTruth?: boolean;
  savedPushbackIds?: string[];
}

export interface ChildPersonalizationContext {
  name?: string | null;
  gender?: Gender | string | null;
  age?: number | null;
  ageMonths?: number | null;
  developmentalTier?: DevelopmentalTier | string | null;
}

export interface ActionProtocolItem {
  id: string;
  label: string;
  detail?: string;
}

export interface AcademyLessonSummaryDTO {
  id: string;
  moduleId: string;
  chapterId?: string | null;
  slug: string;
  title: string;
  readingMinutes: number;
  sortOrder: number;
  isCompleted: boolean;
  audioUrl?: string;
  audioDurationSeconds?: number;
  reliefTagline?: string;
  whatNotToSay?: string;
  empatheticScript?: string;
  deliveryTip?: string;
  videoLecture?: MasterVideoLectureDTO | null;
  archetype?: LessonArchetype;
  episodeRole?: EpisodeRole;
  interactiveHighlights?: string[];
}

export interface AcademyLessonDTO {
  id: string;
  moduleId: string;
  chapterId?: string | null;
  slug: string;
  title: string;
  contentMarkdown: string;
  readingMinutes: number;
  sortOrder: number;
  isCompleted: boolean;
  audioUrl?: string;
  audioDurationSeconds?: number;
  reliefTagline?: string;
  thirtySecondGlance?: ThirtySecondGlanceDTO;
  adaptiveModuleType?: AdaptiveModuleType;
  dialogueCards?: DialogueCardDTO[];
  actionProtocolItems?: ActionProtocolItem[];
  adaptiveModulePayload?: Record<string, unknown> | null;
  whatNotToSay?: string;
  deliveryTip?: string;
  videoLecture?: MasterVideoLectureDTO | null;
  archetype?: LessonArchetype;
  episodeRole?: EpisodeRole;
  almanacPayload?: AlmanacLessonPayload | null;
  playbookState?: LessonPlaybookStateDTO;
  module?: {
    id: string;
    slug: string;
    title: string;
    developmentalTier: DevelopmentalTier;
    category?: AcademyCategory;
  };
  chapter?: {
    id: string;
    slug: string;
    title: string;
    priority: number;
  } | null;
}

export interface AcademyModuleDetailDTO extends AcademyModuleDTO {
  chapters: AcademyChapterDTO[];
  lessons: AcademyLessonSummaryDTO[];
}

export interface AcademyProgressDTO {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  completedAt: string;
  chosenMoveId?: string | null;
  bookmarkedTruth?: boolean;
  savedPushbackIds?: string[];
}

export interface AcademyLessonCompletionResponseDTO {
  progress: AcademyProgressDTO;
  playbookState?: LessonPlaybookStateDTO;
  module: {
    id: string;
    slug: string;
    title: string;
    lessonCount: number;
    completedLessonCount: number;
    percentComplete: number;
    isCompleted: boolean;
  };
}

// ----------------------------------------------------
// 24/7 AI ADVISOR & FAQ VAULT DTOS
// ----------------------------------------------------

export interface FaqCategoryDTO {
  id: string;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
  faqCount?: number;
}

export interface FaqListResponseDTO {
  faqs: FaqItemDTO[];
  total: number;
  limit: number;
  offset: number;
}

export interface AiChatStreamEventDTO {
  type: 'context' | 'token' | 'done' | 'error' | 'EMERGENCY_RED_FLAG';
  matchedFaqs?: (string | { id: string; question: string; categorySlug?: string; deEscalationScript?: string | null })[];
  content?: string;
  conversationId?: string;
  messageId?: string;
  tokensUsed?: number;
  code?: string;
  message?: string;
  category?: string;
  title?: string;
  directive?: string;
  immediateActions?: string[];
  callNumber?: string;
  rationale?: string;
  clinicalAuthority?: string;
}

export interface AiConversationDTO {
  id: string;
  userId: string;
  childId?: string | null;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages?: AiMessageDTO[];
}

// ----------------------------------------------------
// HOLISTIC CHILD UPBRINGING & PEDIATRIC HEALTH DTOS (v2.4.0)
// ----------------------------------------------------

export interface MilestoneDTO {
  id: string;
  targetTier: DevelopmentalTier;
  targetAgeMonths: number;
  category: MilestoneCategory;
  title: string;
  description: string;
  signsToWatch: string;
  clinicalAuthority?: string;
  sortOrder: number;
  status?: MilestoneStatus;
  achievedAt?: string | null;
  parentNotes?: string | null;
}

export interface ChildMilestoneDTO {
  id: string;
  childId: string;
  milestoneId: string;
  status: MilestoneStatus;
  achievedAt?: string | null;
  parentNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionGuideDTO {
  id?: string;
  stage: NutritionStage;
  stageName: string;
  ageBracket?: string;
  ageRange: string;
  title: string;
  summary: string;
  keyNutrients: string[];
  recommendedFoods: string[];
  foodsToAvoid: {
    food: string;
    hazardType: string;
    mechanism: string;
    strictAgeMonths?: number;
    exceptionAllowed?: string | boolean;
  }[];
  blwTips: string[];
  dorPrinciples: {
    parentDecides: string[];
    childDecides: string[];
    goldenRule: string;
  };
  guidelinesMarkdown?: string;
  safeFoods?: string[];
  chokingHazards?: string[];
  allergenProtocol?: string | null;
  pickyEatingTips?: string | null;
}

export interface BrainGameActivityDTO {
  id: string;
  targetTier: DevelopmentalTier;
  category: PlayCategory;
  title: string;
  summary: string;
  instructions: string;
  materialsNeeded: string[];
  targetSkills: string[];
  estimatedMinutes: number;
  isScreenFree: boolean;
}

export interface BehaviorGuideDTO {
  id: string;
  targetTier: DevelopmentalTier;
  slug: string;
  triggerSituation: string;
  underlyingNeed: string;
  coRegulationScript: string;
  authoritativeLimit: string;
}

export interface AllergenScheduleItemDTO {
  id: string;
  allergen: string;
  recommendedStartMonth: number;
  priority: number;
  evidenceTrial: string;
  recommendedFormat: string;
  preparationInstructions: string;
  safetyWarning: string;
  frequencyMaintenance: string;
  status?: 'NOT_STARTED' | 'INTRODUCED_TOLERATED' | 'REACTION_OBSERVED';
  introducedDate?: string;
}

export interface ChokingHazardDTO {
  foodItem: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  mechanism: string;
  safeModification: string;
  avoidUntilAgeYears: number;
}
