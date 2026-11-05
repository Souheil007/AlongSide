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
    <Card className="w-full max-w-md mx-auto shadow-sm border-[#E3E3DC] rounded-[10px] bg-white">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-[#EAF3EE] px-3 py-1 text-xs font-mono font-semibold text-[#143D2B] border border-[#143D2B]/20 mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-[#143D2B]" />
          7-DAY TRIAL • NO UPFRONT CHARGE
        </div>
        <CardTitle className="font-serif text-3xl font-bold tracking-tight text-[#111413]">
          Begin your family journey
        </CardTitle>
        <CardDescription className="text-sm text-[#494F4C]">
          Create calm, clear digital boundaries tailored to your child’s development
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

          <div className="rounded-[5px] bg-[#F4F4F0] p-3 text-xs text-[#494F4C] space-y-1.5 border border-[#E3E3DC]">
            <div className="flex items-center gap-2 text-[#111413] font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#143D2B]" />
              <span>What’s included in your trial:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[#494F4C] pl-1 text-[11px]">
              <li>Continuous 0–18 Lifespan Advisory roadmap</li>
              <li>Bilateral Family Pact builder &amp; vector agreement</li>
              <li>Neutral 8:30 PM bedtime curfew hardware lock</li>
            </ul>
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
                Creating your account...
              </>
            ) : (
              "Start 7-Day Free Trial"
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
