"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserSchema, type LoginUserInput } from "@alongside/shared";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { ApiClientError } from "@/lib/api/client";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { AlongsideLogo } from "@/components/shared/AlongsideLogo";

export function LoginForm() {
  const searchParams = useSearchParams();
  const isLoggedOut = searchParams?.get("logged_out") === "true";
  const isRegistered = searchParams?.get("registered") === "true";
  const queryEmail = searchParams?.get("email") || "";
  const { login, isLoggingIn, isAuthenticated, user: authUser, isLoading: isAuthLoading } = useAuth();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  // If already authenticated and not explicitly viewing the logout banner, redirect to dashboard or onboarding
  React.useEffect(() => {
    if (!isAuthLoading && isAuthenticated && !isLoggedOut) {
      const destination =
        !authUser?.childrenCount || authUser.childrenCount === 0
          ? "/children/new"
          : "/dashboard";
      window.location.replace(destination);
    }
  }, [isAuthLoading, isAuthenticated, authUser, isLoggedOut]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: queryEmail,
      password: "",
    },
  });

  React.useEffect(() => {
    if (queryEmail) {
      setValue("email", queryEmail);
    }
  }, [queryEmail, setValue]);

  const onSubmit = async (data: LoginUserInput) => {
    setServerError(null);
    try {
      const user = await login(data);
      const destination =
        !user?.childrenCount || user.childrenCount === 0
          ? "/children/new"
          : "/dashboard";
      window.location.replace(destination);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Couldn't sign in. Check your email and password and try again.");
      }
    }
  };

  const isLoading = isLoggingIn || isSubmitting;

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm border-[#E3E3DC] rounded-[10px] bg-white">
      <CardHeader className="space-y-1.5 text-center">
        <div className="flex justify-center pb-1">
          <Link href="/" aria-label="Alongside Home">
            <AlongsideLogo size="lg" showWordmark={false} />
          </Link>
        </div>
        <CardTitle className="font-serif text-3xl font-bold tracking-tight text-[#111413]">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm text-[#494F4C]">
          Sign in to your family space.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-4">
          {isRegistered && !serverError && (
            <div
              role="status"
              className="flex items-start gap-2.5 rounded-[5px] border border-[#143D2B]/20 bg-[#EAF3EE] p-3 text-xs text-[#143D2B]"
            >
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#143D2B]" />
              <span>Account created. Sign in below to add your first child profile.</span>
            </div>
          )}
          {isLoggedOut && !serverError && (
            <div
              role="status"
              className="flex items-start gap-2.5 rounded-[5px] border border-[#143D2B]/20 bg-[#EAF3EE] p-3 text-xs text-[#143D2B]"
            >
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#143D2B]" />
              <span>You&apos;ve been signed out.</span>
            </div>
          )}

          {serverError && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-[5px] border border-red-200 bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-600" />
              <span>{serverError}</span>
            </div>
          )}

          <Input
            id="email"
            type="email"
            label="Email"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-semibold text-[#111413]">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="pr-16"
                error={errors.password?.message}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute right-1 top-0 inline-flex h-11 min-w-[44px] items-center justify-center rounded-[4px] px-2.5 text-xs font-semibold text-[#858C88] transition-colors hover:text-[#111413] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full min-h-[44px] font-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-center text-xs text-[#858C88]">
            New here?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#143D2B] hover:underline underline-offset-2"
            >
              Create free account
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
