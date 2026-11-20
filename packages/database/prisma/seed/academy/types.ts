import type {
  AcademyCategory,
  AdaptiveModuleType,
  AlmanacLessonPayload,
  DevelopmentalTier,
  DialogueCardDTO,
  EpisodeRole,
  LessonArchetype,
  MasterVideoLectureDTO,
  ThirtySecondGlanceDTO,
} from '@alongside/shared';

export interface AcademyLessonSeedData {
  slug: string;
  title: string;
  archetype?: LessonArchetype | string | null;
  episodeRole?: EpisodeRole | null;
  contentMarkdown: string;
  readingMinutes: number;
  sortOrder: number;
  audioUrl?: string | null;
  audioDurationSeconds?: number | null;
  reliefTagline?: string | null;
  thirtySecondGlance?: ThirtySecondGlanceDTO | null;
  adaptiveModuleType?: AdaptiveModuleType | null;
  dialogueCards?: DialogueCardDTO[] | null;
  whatNotToSay?: string | null;
  deliveryTip?: string | null;
  videoLecture?: MasterVideoLectureDTO | null;
  almanacPayload?: AlmanacLessonPayload | null;
}

export interface AcademyChapterSeedData {
  slug: string;
  title: string;
  summary: string;
  priority: number; // 1 = Critical, 2 = Routines, 3 = Scaffolding
  sortOrder: number;
  lessons: AcademyLessonSeedData[];
}

export interface AcademyModuleSeedData {
  slug: string;
  category: AcademyCategory;
  title: string;
  reliefSubtitle?: string | null;
  tonightQuickWinTitle?: string | null;
  summary: string;
  coverImageUrl?: string | null;
  featuredVideoLecture?: MasterVideoLectureDTO | null;
  developmentalTier: DevelopmentalTier;
  sortOrder: number;
  chapters: AcademyChapterSeedData[];
  lessons: AcademyLessonSeedData[];
}
