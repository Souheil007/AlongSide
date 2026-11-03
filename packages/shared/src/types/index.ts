import type {
  AgreementStatus,
  ClauseCategory,
  CommitmentParty,
  DevelopmentalTier,
  DevicePlatform,
  DeviceProfileStatus,
  ExploitSeverity,
  MessageRole,
  QuizType,
  RoadType,
  Role,
  SubscriptionTier,
} from '../constants/index.js';

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
  birthYear: number;
  birthMonth: number;
  age: number;
  roadType: RoadType;
  developmentalTier: DevelopmentalTier;
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

export interface AcademyModuleDTO {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImageUrl?: string | null;
  developmentalTier: DevelopmentalTier;
  sortOrder: number;
  lessonCount: number;
  completedLessonCount: number;
  isCompleted: boolean;
}

export interface AcademyLessonSummaryDTO {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  readingMinutes: number;
  sortOrder: number;
  isCompleted: boolean;
}

export interface AcademyLessonDTO {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  contentMarkdown: string;
  readingMinutes: number;
  sortOrder: number;
  isCompleted: boolean;
  module?: {
    id: string;
    slug: string;
    title: string;
    developmentalTier: DevelopmentalTier;
  };
}

export interface AcademyModuleDetailDTO extends AcademyModuleDTO {
  lessons: AcademyLessonSummaryDTO[];
}

export interface AcademyProgressDTO {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  completedAt: string;
}

export interface AcademyLessonCompletionResponseDTO {
  progress: AcademyProgressDTO;
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
  type: 'context' | 'token' | 'done' | 'error';
  matchedFaqs?: (string | { id: string; question: string; categorySlug?: string; deEscalationScript?: string | null })[];
  content?: string;
  conversationId?: string;
  messageId?: string;
  tokensUsed?: number;
  code?: string;
  message?: string;
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


