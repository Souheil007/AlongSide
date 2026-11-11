import {
  AcademyCategory,
  DevelopmentalTier,
  AcademyCategoryStatsDTO,
  AcademyModuleDTO,
  AcademyModuleDetailDTO,
  AcademyLessonDTO,
  AcademyLessonCompletionResponseDTO,
} from '@alongside/shared';
import { apiClient } from './client';
import {
  MOCK_ACADEMY_CATEGORIES,
  MOCK_ACADEMY_MODULES,
  MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR,
  MOCK_LESSON_DETAIL_ADRENARCHE,
} from './mocks';

export interface CategoriesResponse {
  categories: AcademyCategoryStatsDTO[];
}

export interface ModulesResponse {
  modules: AcademyModuleDTO[];
}

export interface ModuleDetailResponse {
  module: AcademyModuleDetailDTO;
}

export interface LessonDetailResponse {
  lesson: AcademyLessonDTO;
}

/**
 * Fetch all canonical academy categories with course and lesson count statistics, optionally filtered by tier.
 */
export async function getAcademyCategories(params?: {
  tier?: DevelopmentalTier | string;
}): Promise<AcademyCategoryStatsDTO[]> {
  try {
    const queryParams: Record<string, string | undefined> = {};
    if (params?.tier && params.tier !== 'ALL') {
      queryParams.tier = params.tier;
    }
    const searchString = new URLSearchParams(
      Object.entries(queryParams).filter(
        (entry): entry is [string, string] => entry[1] !== undefined
      )
    ).toString();
    const endpoint = `/api/v1/academy/categories${searchString ? `?${searchString}` : ''}`;
    const res = await apiClient<CategoriesResponse>(endpoint, {
      method: 'GET',
    });
    return res.categories ?? [];
  } catch (err) {
    if (params?.tier && params.tier !== 'ALL') {
      return Object.values(AcademyCategory).map((cat) => {
        const catModules = MOCK_ACADEMY_MODULES.filter(
          (m) =>
            m.category === cat &&
            (m.developmentalTier === params.tier ||
              (params.tier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3 &&
                (m.developmentalTier === DevelopmentalTier.TIER_0A_INFANCY_0_1 ||
                  m.developmentalTier === DevelopmentalTier.TIER_0B_TODDLER_1_2 ||
                  m.developmentalTier === DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3 ||
                  m.developmentalTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3)))
        );
        const meta = MOCK_ACADEMY_CATEGORIES.find((c) => c.category === cat);
        return {
          category: cat,
          title: meta?.title ?? cat,
          description: meta?.description ?? '',
          moduleCount: catModules.length,
          lessonCount: catModules.reduce((acc, m) => acc + m.lessonCount, 0),
        };
      });
    }
    // Graceful offline fallback to canonical category metadata
    return MOCK_ACADEMY_CATEGORIES;
  }
}

const LOCAL_STORAGE_COMPLETED_KEY = 'alongside-completed-lessons';

export function getLocalCompletedLessonIds(): Set<string> {
  if (typeof window === 'undefined' || !window.localStorage) {
    return new Set<string>();
  }
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_COMPLETED_KEY);
    if (!raw) return new Set<string>();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set<string>();
  }
}

export function saveLocalCompletedLessonId(lessonId: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    const set = getLocalCompletedLessonIds();
    set.add(lessonId);
    window.localStorage.setItem(LOCAL_STORAGE_COMPLETED_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // silent fallback
  }
}

/**
 * Fetch all academy modules, optionally filtered by category and/or developmental tier.
 */
export async function getAcademyModules(params?: {
  category?: AcademyCategory | string;
  tier?: DevelopmentalTier | string;
}): Promise<AcademyModuleDTO[]> {
  let modules: AcademyModuleDTO[] = [];
  try {
    const queryParams: Record<string, string | undefined> = {};
    if (params?.category && params.category !== 'ALL') {
      queryParams.category = params.category;
    }
    if (params?.tier && params.tier !== 'ALL') {
      queryParams.tier = params.tier;
    }

    const res = await apiClient<ModulesResponse>('/api/v1/academy/modules', {
      method: 'GET',
      params: queryParams,
    });
    modules = res.modules ?? [];
  } catch (err) {
    // Offline fallback filtering
    let filtered = [...MOCK_ACADEMY_MODULES];
    if (params?.category && params.category !== 'ALL') {
      filtered = filtered.filter((m) => m.category === params.category);
    }
    if (params?.tier && params.tier !== 'ALL') {
      filtered = filtered.filter(
        (m) =>
          m.developmentalTier === params.tier ||
          (params.tier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3 &&
            (m.developmentalTier === DevelopmentalTier.TIER_0A_INFANCY_0_1 ||
              m.developmentalTier === DevelopmentalTier.TIER_0B_TODDLER_1_2 ||
              m.developmentalTier === DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3 ||
              m.developmentalTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3))
      );
    }
    modules = filtered;
  }

  // Merge locally completed lessons into module list
  const localCompleted = getLocalCompletedLessonIds();
  if (localCompleted.size > 0 && modules.length > 0) {
    modules = modules.map((m) => {
      if (!m.lessons || m.lessons.length === 0) return m;
      const updatedLessons = m.lessons.map((l) => ({
        ...l,
        isCompleted: l.isCompleted || localCompleted.has(l.id),
      }));
      const completedCount = updatedLessons.filter((l) => l.isCompleted).length;
      return {
        ...m,
        lessons: updatedLessons,
        completedLessonCount: Math.max(m.completedLessonCount, completedCount),
        isCompleted: m.lessonCount > 0 && completedCount === m.lessonCount,
      };
    });
  }

  return modules;
}

/**
 * Fetch detailed module structure including its prioritized chapters and lessons.
 */
export async function getAcademyModuleBySlug(
  slug: string
): Promise<AcademyModuleDetailDTO> {
  let mod: AcademyModuleDetailDTO;
  try {
    const res = await apiClient<ModuleDetailResponse>(`/api/v1/academy/modules/${slug}`, {
      method: 'GET',
    });
    mod = res.module;
  } catch (err) {
    if (slug === MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.slug) {
      mod = MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR;
    } else {
      const foundModule = MOCK_ACADEMY_MODULES.find((m) => m.slug === slug);
      if (foundModule) {
        mod = {
          ...foundModule,
          chapters: MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.chapters,
          lessons: MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.lessons,
        };
      } else {
        throw err;
      }
    }
  }

  // Merge locally completed lessons into module detail
  const localCompleted = getLocalCompletedLessonIds();
  if (localCompleted.size > 0 && mod.lessons) {
    mod.lessons = mod.lessons.map((l) => ({
      ...l,
      isCompleted: l.isCompleted || localCompleted.has(l.id),
    }));
    mod.completedLessonCount = mod.lessons.filter((l) => l.isCompleted).length;
    mod.isCompleted = mod.lessonCount > 0 && mod.completedLessonCount === mod.lessonCount;
    if (mod.chapters) {
      mod.chapters = mod.chapters.map((ch) => {
        const chLessons = (ch.lessons || []).map((l) => ({
          ...l,
          isCompleted: l.isCompleted || localCompleted.has(l.id),
        }));
        const chCompleted = chLessons.filter((l) => l.isCompleted).length;
        return {
          ...ch,
          lessons: chLessons,
          completedLessonCount: chCompleted,
          isCompleted: chLessons.length > 0 && chCompleted === chLessons.length,
        };
      });
    }
  }

  return mod;
}

/**
 * Fetch all academy modules, optionally filtered by developmental tier (legacy backward compatibility).
 */
export async function getModulesByTier(
  tier?: DevelopmentalTier
): Promise<ModulesResponse> {
  const modules = await getAcademyModules(tier ? { tier } : undefined);
  return { modules };
}

/**
 * Fetch detailed module structure including its list of lessons by slug (legacy backward compatibility).
 */
export async function getModuleBySlug(
  slug: string
): Promise<ModuleDetailResponse> {
  const module = await getAcademyModuleBySlug(slug);
  return { module };
}

/**
 * Fetch a single lesson by its ID.
 */
export async function getLesson(
  id: string
): Promise<LessonDetailResponse> {
  let res: LessonDetailResponse;
  try {
    res = await apiClient<LessonDetailResponse>(`/api/v1/academy/lessons/${id}`, {
      method: 'GET',
    });
  } catch (err) {
    if (id === MOCK_LESSON_DETAIL_ADRENARCHE.id) {
      res = { lesson: MOCK_LESSON_DETAIL_ADRENARCHE };
    } else {
      throw err;
    }
  }

  const localCompleted = getLocalCompletedLessonIds();
  if (localCompleted.has(res.lesson.id)) {
    res.lesson.isCompleted = true;
  }
  return res;
}

/**
 * Mark a lesson complete for the authenticated parent (with local storage fallback).
 */
export async function markLessonComplete(
  id: string
): Promise<AcademyLessonCompletionResponseDTO> {
  // Always mark completed in local storage for instant optimistic persistence
  saveLocalCompletedLessonId(id);

  try {
    return await apiClient<AcademyLessonCompletionResponseDTO>(
      `/api/v1/academy/lessons/${id}/complete`,
      {
        method: 'POST',
        body: JSON.stringify({}),
      }
    );
  } catch (err) {
    // If guest, offline, or session expired, return successful optimistic response
    return {
      progress: {
        id: `local-progress-${id}`,
        userId: 'local-parent',
        lessonId: id,
        isCompleted: true,
        completedAt: new Date().toISOString(),
      },
      module: {
        id: 'local-module',
        slug: 'current-course',
        title: 'Current Course',
        lessonCount: 4,
        completedLessonCount: 1,
        percentComplete: 25,
        isCompleted: false,
      },
    };
  }
}
