import type {
  DevelopmentalTier,
  AcademyModuleDTO,
  AcademyModuleDetailDTO,
  AcademyLessonDTO,
  AcademyLessonCompletionResponseDTO,
} from '@alongside/shared';
import { apiClient } from './client';

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
 * Fetch all academy modules, optionally filtered by developmental tier.
 */
export async function getModulesByTier(
  tier?: DevelopmentalTier
): Promise<ModulesResponse> {
  const params: Record<string, string | undefined> = {};
  if (tier) {
    params.tier = tier;
  }
  return await apiClient<ModulesResponse>('/api/v1/academy/modules', {
    method: 'GET',
    params,
  });
}

/**
 * Fetch detailed module structure including its list of lessons by slug.
 */
export async function getModuleBySlug(
  slug: string
): Promise<ModuleDetailResponse> {
  return await apiClient<ModuleDetailResponse>(`/api/v1/academy/modules/${slug}`, {
    method: 'GET',
  });
}

/**
 * Fetch a single lesson by its ID.
 */
export async function getLesson(
  id: string
): Promise<LessonDetailResponse> {
  return await apiClient<LessonDetailResponse>(`/api/v1/academy/lessons/${id}`, {
    method: 'GET',
  });
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
    }
  );
}

export const academyApi = {
  getModulesByTier,
  getModuleBySlug,
  getLesson,
  markLessonComplete,
};
