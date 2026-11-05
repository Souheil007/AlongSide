import {
  AcademyCategory,
  type DevelopmentalTier,
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
          (m) => m.category === cat && m.developmentalTier === params.tier
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

/**
 * Fetch all academy modules, optionally filtered by category and/or developmental tier.
 */
export async function getAcademyModules(params?: {
  category?: AcademyCategory | string;
  tier?: DevelopmentalTier | string;
}): Promise<AcademyModuleDTO[]> {
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
    return res.modules ?? [];
  } catch (err) {
    // Offline fallback filtering
    let filtered = [...MOCK_ACADEMY_MODULES];
    if (params?.category && params.category !== 'ALL') {
      filtered = filtered.filter((m) => m.category === params.category);
    }
    if (params?.tier && params.tier !== 'ALL') {
      filtered = filtered.filter((m) => m.developmentalTier === params.tier);
    }
    return filtered;
  }
}

/**
 * Fetch detailed module structure including its prioritized chapters and lessons.
 */
export async function getAcademyModuleBySlug(
  slug: string
): Promise<AcademyModuleDetailDTO> {
  try {
    const res = await apiClient<ModuleDetailResponse>(`/api/v1/academy/modules/${slug}`, {
      method: 'GET',
    });
    return res.module;
  } catch (err) {
    if (slug === MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.slug) {
      return MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR;
    }
    const foundModule = MOCK_ACADEMY_MODULES.find((m) => m.slug === slug);
    if (foundModule) {
      return {
        ...foundModule,
        chapters: MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.chapters,
        lessons: MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.lessons,
      };
    }
    throw err;
  }
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
  try {
    return await apiClient<LessonDetailResponse>(`/api/v1/academy/lessons/${id}`, {
      method: 'GET',
    });
  } catch (err) {
    if (id === MOCK_LESSON_DETAIL_ADRENARCHE.id) {
      return { lesson: MOCK_LESSON_DETAIL_ADRENARCHE };
    }
    throw err;
  }
}

/**
 * Mark a lesson complete for the authenticated parent.
 */
export async function markLessonComplete(
  id: string
): Promise<AcademyLessonCompletionResponseDTO> {
  return await apiClient<AcademyLessonCompletionResponseDTO>(
    `/api/v1/academy/lessons/${id}/complete`,
    {
      method: 'POST',
      body: JSON.stringify({}),
    }
  );
}

export const academyApi = {
  getAcademyCategories,
  getAcademyModules,
  getAcademyModuleBySlug,
  getModulesByTier,
  getModuleBySlug,
  getLesson,
  markLessonComplete,
};
