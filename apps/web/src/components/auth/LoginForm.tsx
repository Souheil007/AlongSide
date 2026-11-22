"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLoggedOut = searchParams?.get("logged_out") === "true";
  const isRegistered = searchParams?.get("registered") === "true";
  const queryEmail = searchParams?.get("email") || "";
  const { login, isLoggingIn, isAuthenticated, user: authUser, isLoading: isAuthLoading } = useAuth();
  const [serverError, setServerError] = React.useState<string | null>(null);

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
      // Use window.location.replace to clear search parameters (e.g. logged_out=true)
      // and ensure a clean navigation to the authenticated application layout
      window.location.replace(destination);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Failed to sign in. Please verify your credentials and try again.");
      }
    }
  };

  const isLoading = isLoggingIn || isSubmitting;

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm border-[#E3E3DC] rounded-[10px] bg-white">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center pb-2">
          <Link href="/" aria-label="AlongSide Home">
            <AlongsideLogo size="lg" showWordmark={false} />
          </Link>
        </div>
        <CardTitle className="font-serif text-3xl font-bold tracking-tight text-[#111413]">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm text-[#494F4C]">
          Enter your parent email and password to access your family dashboard
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-4">
          {isRegistered && !serverError && (
            <div
              role="status"
              className="flex items-start gap-2.5 rounded-[8px] border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900"
            >
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
              <div>
                <p className="font-semibold">Account created successfully!</p>
                <p className="text-emerald-700 mt-0.5">
                  Please sign in with your password to set up your first child profile.
                </p>
              </div>
            </div>
          )}
          {isLoggedOut && !serverError && (
            <div
              role="status"
              className="flex items-start gap-2.5 rounded-[5px] border border-[#143D2B]/20 bg-[#EAF3EE] p-3 text-sm text-[#143D2B]"
            >
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#143D2B]" />
              <span>You have been successfully logged out of your AlongSide account.</span>
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
            label="Email address"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />
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
              "Sign in to AlongSide"
            )}
          </Button>

          <p className="text-center text-xs text-[#858C88]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#143D2B] hover:underline underline-offset-2"
            >
              Get free early access
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
