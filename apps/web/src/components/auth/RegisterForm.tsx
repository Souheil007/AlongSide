"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserSchema, type RegisterUserInput } from "@alongside/shared";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { ApiClientError } from "@/lib/api/client";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { AlongsideLogo } from "@/components/shared/AlongsideLogo";

export function RegisterForm() {
  const router = useRouter();
  const { register: registerAuth, isRegistering, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      window.location.replace("/dashboard");
    }
  }, [isAuthLoading, isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterUserInput) => {
    setServerError(null);
    try {
      await registerAuth(data);
      setRegisteredEmail(data.email);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Couldn't create your account. Please try again.");
      }
    }
  };

  const isLoading = isRegistering || isSubmitting;

  if (registeredEmail) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-sm border-[#E3E3DC] rounded-[10px] bg-white text-center p-6 sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF3EE] text-[#143D2B] mb-4">
          <CheckCircle2 className="h-6 w-6 text-[#143D2B]" />
        </div>
        <CardTitle className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#111413]">
          Account created
        </CardTitle>
        <p className="text-sm text-[#494F4C] mt-2 leading-relaxed">
          Your account for <span className="font-semibold text-[#111413]">{registeredEmail}</span> is ready. Sign in to add your first child profile.
        </p>
        <div className="mt-6">
          <Button
            type="button"
            variant="forest"
            onClick={() =>
              router.push(`/login?registered=true&email=${encodeURIComponent(registeredEmail)}`)
            }
            className="w-full min-h-[44px] font-semibold"
          >
            Sign in
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm border-[#E3E3DC] rounded-[10px] bg-white">
      <CardHeader className="space-y-1.5 text-center">
        <div className="flex justify-center pb-1">
          <Link href="/" aria-label="Alongside Home">
            <AlongsideLogo size="lg" showWordmark={false} />
          </Link>
        </div>
        <CardTitle className="font-serif text-3xl font-bold tracking-tight text-[#111413]">
          Create your free account
        </CardTitle>
        <CardDescription className="text-sm text-[#494F4C]">
          Calm parenting for ages 0–18. Free, no card needed.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-4">
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
            id="fullName"
            type="text"
            label="Your name"
            autoComplete="name"
            placeholder="Sarah Jenkins"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <Input
            id="email"
            type="email"
            label="Email"
            autoComplete="email"
            placeholder="sarah@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-xs font-semibold text-[#111413]">
                Password
              </label>
              <span className="text-xs text-[#858C88]">8+ characters</span>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
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
                Creating account...
              </>
            ) : (
              "Create free account"
            )}
          </Button>

          <p className="text-center text-xs text-[#858C88]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#143D2B] hover:underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
