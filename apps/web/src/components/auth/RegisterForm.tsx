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
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const { register: registerAuth, isRegistering } = useAuth();
  const [serverError, setServerError] = React.useState<string | null>(null);

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
      router.push("/");
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Failed to create account. Please try again.");
      }
    }
  };

  const isLoading = isRegistering || isSubmitting;

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm border-slate-200">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 border border-teal-200 mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
          7-Day Risk-Free Trial • No Upfront Card
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
          Begin your family journey
        </CardTitle>
        <CardDescription className="text-sm text-slate-500">
          Create calm, clear digital boundaries tailored to your child’s development
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-4">
          {serverError && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-600" />
              <span>{serverError}</span>
            </div>
          )}

          <Input
            id="fullName"
            type="text"
            label="Full name"
            autoComplete="name"
            placeholder="Sarah Jenkins"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <Input
            id="email"
            type="email"
            label="Email address"
            autoComplete="email"
            placeholder="sarah@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="password"
            type="password"
            label="Password (min. 8 characters)"
            autoComplete="new-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600 space-y-1.5 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
              <span>What’s included in your trial:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-500 pl-1 text-[11px]">
              <li>Road 1 vs Road 2 child readiness roadmap</li>
              <li>Bilateral Family Pact builder & printable treaty</li>
              <li>Neutral bedtime curfew lockdown enforcement</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full min-h-[44px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating your account...
              </>
            ) : (
              "Start 7-Day Free Trial"
            )}
          </Button>

          <p className="text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-teal-700 hover:text-teal-800 underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
