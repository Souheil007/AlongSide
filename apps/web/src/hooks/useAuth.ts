'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  LoginUserInput,
  RegisterUserInput,
  UserDTO,
} from '@alongside/shared';
import { authApi } from '@/lib/api/auth';
import { ApiClientError } from '@/lib/api/client';
import { clearStoredSessionToken } from '@/lib/api/sessionToken';
import { resetAnalytics, trackEvent } from '@/lib/analytics/posthog';
import { useChildContextStore, ACTIVE_CHILD_STORAGE_KEY } from '@/stores/useChildContextStore';

export const AUTH_QUERY_KEY = ['auth', 'me'] as const;
export const AUTH_PROVIDERS_QUERY_KEY = ['auth', 'providers'] as const;

export function useAuthProviders() {
  return useQuery({
    queryKey: AUTH_PROVIDERS_QUERY_KEY,
    queryFn: async () => await authApi.getProviders(),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export function useAuth() {
  const queryClient = useQueryClient();

  // If user just logged out, prevent background re-fetching of user session
  const isLoggedOutParam =
    typeof window !== 'undefined' &&
    window.location.search.includes('logged_out=true');

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
        if (
          err instanceof ApiClientError &&
          (err.statusCode === 401 || err.status === 401 || err.code === 'UNAUTHORIZED')
        ) {
          return null;
        }
        throw err;
      }
    },
    enabled: !isLoggedOutParam,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  const applyAuthenticatedUser = (user: UserDTO) => {
    useChildContextStore.getState().reset();
    queryClient.removeQueries({ queryKey: ['children'] });
    queryClient.setQueryData(AUTH_QUERY_KEY, user);
  };

  const registerMutation = useMutation({
    mutationFn: async (input: RegisterUserInput) => {
      const response = await authApi.register(input);
      return response.user;
    },
    onSuccess: (user: UserDTO) => {
      applyAuthenticatedUser(user);
      trackEvent('auth_signed_up', { method: 'email' });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (input: LoginUserInput) => {
      const response = await authApi.login(input);
      return response.user;
    },
    onSuccess: (user: UserDTO) => {
      applyAuthenticatedUser(user);
      trackEvent('auth_logged_in', { method: 'email' });
    },
  });

  const enterDemoMutation = useMutation({
    mutationFn: async () => {
      return await authApi.enterDemo();
    },
    onSuccess: applyAuthenticatedUser,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await authApi.logout();
    },
    onSuccess: () => {
      const wasDemo = Boolean(queryClient.getQueryData<UserDTO | null>(AUTH_QUERY_KEY)?.isDemo);
      trackEvent('auth_logged_out', { was_demo: wasDemo });
      resetAnalytics();
      clearStoredSessionToken();
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
      queryClient.clear();
      useChildContextStore.getState().reset();
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.removeItem(ACTIVE_CHILD_STORAGE_KEY);
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('auth');
          window.sessionStorage.clear();
          // Explicit client cookie expiry fallback
          document.cookie = 'alongside_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;';
          document.cookie = 'alongside_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict;';
        } catch {
          // Safe fallback for restricted storage environments
        }
      }
    },
  });

  const resolvedUser = isLoggedOutParam && !data ? null : (data ?? null);

  return {
    user: resolvedUser,
    isLoading: isLoggedOutParam && !data ? false : isLoading,
    isAuthenticated: Boolean(resolvedUser),
    isDemo: Boolean(resolvedUser?.isDemo),
    isError,
    error,
    refetchUser: refetch,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    enterDemo: enterDemoMutation.mutateAsync,
    isEnteringDemo: enterDemoMutation.isPending,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
}
