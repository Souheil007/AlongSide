import type {
  ChildDTO,
  CreateChildInput,
  UpdateChildInput,
  SubmitReadinessAssessmentInput,
  ReadinessAssessmentResult,
} from '@alongside/shared';
import { apiClient } from './client';

export type {
  ChildDTO,
  CreateChildInput,
  UpdateChildInput,
  SubmitReadinessAssessmentInput,
  ReadinessAssessmentResult,
};

export interface ReadinessAssessmentAttemptDTO {
  id: string;
  quizId?: string;
  childId: string;
  overallScore: number;
  dimensionScores: Record<string, number>;
  isReadyForPersonalPhone: boolean;
  recommendation: string;
  recommendedRoadmapPreset: string;
  strengths: string[];
  growthAreas: string[];
  completedAt: string;
}

export interface ChildListResponse {
  children: ChildDTO[];
}

export interface ChildResponse {
  child: ChildDTO;
}

export interface DeleteChildResponse {
  message: string;
  id?: string;
}

export interface SubmitReadinessAssessmentResponse {
  attempt: ReadinessAssessmentAttemptDTO;
}

/**
 * Fetch all children profiles associated with the authenticated parent.
 */
export async function getChildren(): Promise<{ children: ChildDTO[] }> {
  return await apiClient<ChildListResponse>('/api/v1/children', {
    method: 'GET',
  });
}

/**
 * Fetch a single child profile by ID.
 */
export async function getChild(id: string): Promise<{ child: ChildDTO }> {
  return await apiClient<ChildResponse>(`/api/v1/children/${id}`, {
    method: 'GET',
  });
}

/**
 * Create a new child profile with contextual road assignment.
 */
export async function createChild(input: CreateChildInput): Promise<{ child: ChildDTO }> {
  return await apiClient<ChildResponse>('/api/v1/children', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

/**
 * Update an existing child profile.
 */
export async function updateChild(
  id: string,
  input: UpdateChildInput
): Promise<{ child: ChildDTO }> {
  return await apiClient<ChildResponse>(`/api/v1/children/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

/**
 * Delete a child profile and related data.
 */
export async function deleteChild(id: string): Promise<DeleteChildResponse> {
  return await apiClient<DeleteChildResponse>(`/api/v1/children/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Submit responses for the 10-dimension First-Phone Readiness Assessment.
 */
export async function submitReadinessAssessment(
  childId: string,
  input: SubmitReadinessAssessmentInput
): Promise<{ attempt: ReadinessAssessmentAttemptDTO }> {
  return await apiClient<SubmitReadinessAssessmentResponse>(
    `/api/v1/children/${childId}/readiness-assessment`,
    {
      method: 'POST',
      body: JSON.stringify(input),
    }
  );
}

// Aliases for backwards compatibility and ergonomic usage
export const fetchChildren = async (): Promise<ChildDTO[]> => {
  const res = await getChildren();
  return res.children || [];
};

export const fetchChild = async (id: string): Promise<ChildDTO> => {
  const res = await getChild(id);
  return res.child;
};

export const submitChildReadinessAssessment = async (
  childId: string,
  input: SubmitReadinessAssessmentInput
): Promise<ReadinessAssessmentAttemptDTO> => {
  const res = await submitReadinessAssessment(childId, input);
  return res.attempt;
};

export const childrenApi = {
  list: fetchChildren,
  getChildren,
  getById: fetchChild,
  getChild,
  create: createChild,
  update: updateChild,
  delete: deleteChild,
  submitReadiness: submitReadinessAssessment,
  submitChildReadinessAssessment,
};
