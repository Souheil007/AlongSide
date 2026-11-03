'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  ChildDTO,
  CreateChildInput,
  UpdateChildInput,
  SubmitReadinessAssessmentInput,
} from '@alongside/shared';
import {
  getChildren,
  getChild,
  createChild,
  updateChild,
  deleteChild,
  submitReadinessAssessment,
  type ReadinessAssessmentAttemptDTO,
  type DeleteChildResponse,
} from '@/lib/api/children';

export const CHILDREN_QUERY_KEY = ['children'] as const;
export const childQueryKey = (id: string) => ['children', id] as const;

/**
 * Mutation hook to register a new child profile.
 */
export function useCreateChild() {
  const queryClient = useQueryClient();

  return useMutation<{ child: ChildDTO }, Error, CreateChildInput>({
    mutationFn: async (input: CreateChildInput) => {
      return await createChild(input);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CHILDREN_QUERY_KEY });
      queryClient.setQueryData(childQueryKey(data.child.id), data);
    },
  });
}

/**
 * Mutation hook to update an existing child profile.
 */
export function useUpdateChild() {
  const queryClient = useQueryClient();

  return useMutation<
    { child: ChildDTO },
    Error,
    { id: string; data: UpdateChildInput }
  >({
    mutationFn: async ({ id, data }) => {
      return await updateChild(id, data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(childQueryKey(data.child.id), data);
      queryClient.invalidateQueries({ queryKey: CHILDREN_QUERY_KEY });
    },
  });
}

/**
 * Mutation hook to delete a child profile.
 */
export function useDeleteChild() {
  const queryClient = useQueryClient();

  return useMutation<DeleteChildResponse, Error, string>({
    mutationFn: async (childId: string) => {
      return await deleteChild(childId);
    },
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: childQueryKey(deletedId) });
      queryClient.invalidateQueries({ queryKey: CHILDREN_QUERY_KEY });
    },
  });
}

/**
 * Mutation hook to submit 10-dimension First-Phone Readiness Assessment responses.
 */
export function useSubmitReadinessAssessment() {
  const queryClient = useQueryClient();

  return useMutation<
    { attempt: ReadinessAssessmentAttemptDTO },
    Error,
    { childId: string; data: SubmitReadinessAssessmentInput }
  >({
    mutationFn: async ({ childId, data }) => {
      return await submitReadinessAssessment(childId, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: childQueryKey(variables.childId) });
      queryClient.invalidateQueries({ queryKey: CHILDREN_QUERY_KEY });
    },
  });
}

/**
 * Hook to retrieve all children for the current parent.
 */
export function useChildren() {
  const queryClient = useQueryClient();
  const createMutation = useCreateChild();

  const query = useQuery<{ children: ChildDTO[] }, Error, ChildDTO[]>({
    queryKey: CHILDREN_QUERY_KEY,
    queryFn: async () => {
      return await getChildren();
    },
    select: (data) => data.children || [],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    children: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    refetchChildren: query.refetch,
    createChild: createMutation.mutateAsync,
    isCreatingChild: createMutation.isPending,
    createChildError: createMutation.error,
  };
}

/**
 * Hook to retrieve a single child profile by ID.
 */
export function useChild(id?: string) {
  const updateMutation = useUpdateChild();
  const deleteMutation = useDeleteChild();
  const submitReadinessMutation = useSubmitReadinessAssessment();

  const query = useQuery<{ child: ChildDTO } | null, Error, ChildDTO | null>({
    queryKey: id ? childQueryKey(id) : ['children', 'unselected'],
    queryFn: async () => {
      if (!id) return null;
      return await getChild(id);
    },
    select: (data) => (data ? data.child : null),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });

  return {
    child: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    refetchChild: query.refetch,
    updateChild: (data: UpdateChildInput) => {
      if (!id) throw new Error('Cannot update child without child ID');
      return updateMutation.mutateAsync({ id, data });
    },
    isUpdatingChild: updateMutation.isPending,
    deleteChild: () => {
      if (!id) throw new Error('Cannot delete child without child ID');
      return deleteMutation.mutateAsync(id);
    },
    isDeletingChild: deleteMutation.isPending,
    submitReadiness: (data: SubmitReadinessAssessmentInput) => {
      if (!id) throw new Error('Cannot submit readiness without child ID');
      return submitReadinessMutation.mutateAsync({ childId: id, data });
    },
    isSubmittingReadiness: submitReadinessMutation.isPending,
    submitReadinessError: submitReadinessMutation.error,
  };
}
