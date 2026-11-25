'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginUserSchema,
  RegisterUserSchema,
  type LoginUserInput,
  type RegisterUserInput,
} from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import { useAuth, useAuthProviders } from '@/hooks/useAuth';
import { authApi } from '@/lib/api/auth';
import { ApiClientError } from '@/lib/api/client';
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Sparkles } from 'lucide-react';
import { AlongsideLogo } from '@/components/shared/AlongsideLogo';
import { cn } from '@/lib/utils';

export interface PasswordlessAuthCardProps {
  mode?: 'login' | 'register';
}

function GoogleMark() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.08 3.56-5.15 3.56-8.65Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.07.72-2.44 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.28v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29A7.2 7.2 0 0 1 4.9 12c0-.8.14-1.57.38-2.29V6.61H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.61l4 3.1C6.23 6.86 8.88 4.75 12 4.75Z"
      />
    </svg>
  );
}

export function PasswordlessAuthCard({ mode = 'login' }: PasswordlessAuthCardProps) {
  const searchParams = useSearchParams();
  const isLoggedOut = searchParams?.get('logged_out') === 'true';
  const authErrorParam = searchParams?.get('error');
  const queryEmail = searchParams?.get('email') || '';

  const {
    user: authUser,
    isAuthenticated,
    isDemo,
    isLoading: isAuthLoading,
    register: registerAuth,
    isRegistering,
    login,
    isLoggingIn,
    enterDemo,
    isEnteringDemo,
  } = useAuth();
  const { data: providers, isError: isProvidersError } = useAuthProviders();

  const [emailPanelToggled, setEmailPanelToggled] = React.useState<boolean | null>(null);
  const [emailMode, setEmailMode] = React.useState<'login' | 'register'>(mode);
  const [showPassword, setShowPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const registerForm = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      fullName: '',
      email: queryEmail,
      password: '',
    },
  });

  const loginForm = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: queryEmail,
      password: '',
    },
  });

  React.useEffect(() => {
    if (queryEmail) {
      registerForm.setValue('email', queryEmail);
      loginForm.setValue('email', queryEmail);
    }
  }, [queryEmail, registerForm, loginForm]);

  React.useEffect(() => {
    if (!isAuthLoading && isAuthenticated && !isDemo && !isLoggedOut) {
      const destination =
        !authUser?.childrenCount || authUser.childrenCount === 0
          ? '/children/new'
          : '/dashboard';
      window.location.replace(destination);
    }
  }, [isAuthLoading, isAuthenticated, isDemo, authUser, isLoggedOut]);

  const showEmailFallback =
    emailPanelToggled ?? Boolean(isProvidersError || (providers && !providers.google));

  const handleEnterDemo = async () => {
    setServerError(null);
    try {
      await enterDemo();
      window.location.replace('/dashboard');
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else {
        setServerError('Could not open the live demo right now. Please try again.');
      }
    }
  };

  const handleRegisterSubmit = async (data: RegisterUserInput) => {
    setServerError(null);
    try {
      const user = await registerAuth(data);
      const destination =
        !user?.childrenCount || user.childrenCount === 0
          ? '/children/new'
          : '/dashboard';
      window.location.replace(destination);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Could not create your account. Please try again.');
      }
    }
  };

  const handleLoginSubmit = async (data: LoginUserInput) => {
    setServerError(null);
    try {
      const user = await login(data);
      const destination =
        !user?.childrenCount || user.childrenCount === 0
          ? '/children/new'
          : '/dashboard';
      window.location.replace(destination);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Could not sign in. Check your email and password and try again.');
      }
    }
  };

  const heading =
    mode === 'register' ? 'Get free early access' : 'Welcome to Alongside';
  const subtitle = 'Calm guidance for ages 0 to 18. Free during early access.';

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm border-[#E3E3DC] rounded-[12px] bg-white">
      <CardHeader className="space-y-1.5 text-center">
        <div className="flex justify-center pb-1">
          <Link href="/" aria-label="Alongside Home">
            <AlongsideLogo size="lg" showWordmark={false} />
          </Link>
        </div>
        <CardTitle className="font-serif text-3xl font-normal tracking-tight text-[#111413]">
          {heading}
        </CardTitle>
        <CardDescription className="text-sm text-[#494F4C]">{subtitle}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoggedOut && !serverError && (
          <div
            role="status"
            className="flex items-start gap-2.5 rounded-[8px] border border-[#143D2B]/20 bg-[#EAF3EE] p-3 text-xs text-[#143D2B]"
          >
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-[#143D2B]" />
            <span>You&apos;ve been signed out.</span>
          </div>
        )}

        {authErrorParam === 'google_auth_failed' && !serverError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-[8px] border border-red-200 bg-red-50 p-3 text-xs text-red-800"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-red-600" />
            <span>
              Google sign-in could not be completed. Try again or continue with email below.
            </span>
          </div>
        )}

        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-[8px] border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-red-600" />
            <span>{serverError}</span>
          </div>
        )}

        <div className="space-y-2.5">
          {providers?.google && (
            <a
              href={authApi.getGoogleAuthUrl()}
              className="inline-flex w-full min-h-[46px] items-center justify-center gap-2.5 rounded-[8px] bg-[#143D2B] px-4 text-sm font-medium text-white hover:bg-[#0E2B1E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white">
                <GoogleMark />
              </span>
              <span>Continue with Google</span>
            </a>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={handleEnterDemo}
            disabled={isEnteringDemo}
            className="w-full min-h-[46px] gap-2 border-[#D7DDD8] bg-[#FAF9F5] text-[#131715] hover:bg-[#F2F0E9]"
          >
            {isEnteringDemo ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#143D2B]" />
            ) : (
              <Sparkles className="h-4 w-4 text-[#143D2B]" />
            )}
            <span>
              {isEnteringDemo ? 'Opening live demo...' : 'Explore live demo (no signup)'}
            </span>
          </Button>
        </div>

        <div className="pt-1 border-t border-[#F0EFE9]">
          <button
            type="button"
            aria-expanded={showEmailFallback}
            onClick={() => setEmailPanelToggled(!showEmailFallback)}
            className="w-full min-h-[40px] flex items-center justify-between text-xs font-medium text-[#494F4C] hover:text-[#143D2B] transition-colors"
          >
            <span>Or continue with email</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-150',
                showEmailFallback && 'rotate-180'
              )}
            />
          </button>

          {showEmailFallback && (
            <div className="mt-3 space-y-4">
              <div
                role="tablist"
                aria-label="Email authentication mode"
                className="grid grid-cols-2 rounded-[8px] bg-[#F2F0E9] p-1 gap-1"
              >
                {(['register', 'login'] as const).map((tab) => {
                  const active = emailMode === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => {
                        setEmailMode(tab);
                        setServerError(null);
                      }}
                      className={cn(
                        'min-h-[36px] rounded-[6px] text-xs font-medium transition-colors',
                        active
                          ? 'bg-white text-[#143D2B] shadow-2xs'
                          : 'text-[#494F4C] hover:text-[#111413]'
                      )}
                    >
                      {tab === 'register' ? 'Create account' : 'Sign in'}
                    </button>
                  );
                })}
              </div>

              {emailMode === 'register' ? (
                <form
                  onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
                  noValidate
                  className="space-y-3.5"
                >
                  <Input
                    id="register-fullName"
                    type="text"
                    label="Your name"
                    autoComplete="name"
                    placeholder="Sarah Jenkins"
                    error={registerForm.formState.errors.fullName?.message}
                    {...registerForm.register('fullName')}
                  />

                  <Input
                    id="register-email"
                    type="email"
                    label="Email"
                    autoComplete="email"
                    placeholder="sarah@example.com"
                    error={registerForm.formState.errors.email?.message}
                    {...registerForm.register('email')}
                  />

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="register-password"
                        className="block text-xs font-semibold text-[#111413]"
                      >
                        Password
                      </label>
                      <span className="text-xs text-[#858C88]">8+ characters</span>
                    </div>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="Create a password"
                        className="pr-16"
                        error={registerForm.formState.errors.password?.message}
                        {...registerForm.register('password')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        aria-pressed={showPassword}
                        className="absolute right-1 top-0 inline-flex h-11 min-w-[44px] items-center justify-center rounded-[4px] px-2.5 text-xs font-semibold text-[#858C88] transition-colors hover:text-[#111413]"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="forest"
                    className="w-full min-h-[44px] font-semibold"
                    disabled={isRegistering || registerForm.formState.isSubmitting}
                  >
                    {isRegistering || registerForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create free account'
                    )}
                  </Button>
                </form>
              ) : (
                <form
                  onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                  noValidate
                  className="space-y-3.5"
                >
                  <Input
                    id="login-email"
                    type="email"
                    label="Email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    error={loginForm.formState.errors.email?.message}
                    {...loginForm.register('email')}
                  />

                  <div className="space-y-1.5">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-semibold text-[#111413]"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="pr-16"
                        error={loginForm.formState.errors.password?.message}
                        {...loginForm.register('password')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        aria-pressed={showPassword}
                        className="absolute right-1 top-0 inline-flex h-11 min-w-[44px] items-center justify-center rounded-[4px] px-2.5 text-xs font-semibold text-[#858C88] transition-colors hover:text-[#111413]"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="forest"
                    className="w-full min-h-[44px] font-semibold"
                    disabled={isLoggingIn || loginForm.formState.isSubmitting}
                  >
                    {isLoggingIn || loginForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
