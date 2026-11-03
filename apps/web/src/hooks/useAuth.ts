'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { LoginUserInput, RegisterUserInput, UserDTO } from '@alongside/shared';
import { authApi } from '@/lib/api/auth';
import { ApiClientError } from '@/lib/api/client';

export const AUTH_QUERY_KEY = ['auth', 'me'] as const;

export function useAuth() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      try {
        const response = await authApi.getMe();
        return response.user;
      } catch (err) {
        if (err instanceof ApiClientError && err.statusCode === 401) {
          return null;
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  const registerMutation = useMutation({
    mutationFn: async (input: RegisterUserInput) => {
      const response = await authApi.register(input);
      return response.user;
    },
    onSuccess: (user: UserDTO) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (input: LoginUserInput) => {
      const response = await authApi.login(input);
      return response.user;
    },
    onSuccess: (user: UserDTO) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await authApi.logout();
    },
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
    },
  });

  return {
    user: data ?? null,
    isLoading,
    isAuthenticated: Boolean(data),
    isError,
    error,
    refetchUser: refetch,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
}
