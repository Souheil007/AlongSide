'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateChildSchema,
  type CreateChildInput,
  type ChildDTO,
  RoadType,
  calculateChildAge,
  calculateChildAgeMonths,
  calculateLifespanTier,
  resolveEarlyChildhoodTranche,
  DevelopmentalTier,
  EarlyChildhoodTranche,
} from '@alongside/shared';
import { useCreateChild } from '@/hooks/useChildren';
import { useChildContextStore } from '@/stores/useChildContextStore';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Compass,
  Moon,
  X,
  User,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChildOnboardingFlowProps {
  onSuccess?: (child: ChildDTO) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const currentYear = new Date().getFullYear();
// Covers full 0-18 age spectrum (currentYear down to currentYear - 18)
export const ONBOARDING_YEARS = Array.from({ length: 19 }, (_, i) => currentYear - i);

export function getTierDisplay(tier: DevelopmentalTier | string) {
  switch (tier) {
    case DevelopmentalTier.TIER_0A_INFANCY_0_1:
      return {
        name: 'Infancy (0–12 mo)',
        focus: 'Somatic Regulation, Sleep Architecture & Feeding Foundations',
        badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      };
    case DevelopmentalTier.TIER_0B_TODDLER_1_2:
      return {
        name: 'Younger Toddler (1–2 yrs)',
        focus: 'Locomotion, First Words & Amygdala Co-Regulation',
        badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    case DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3:
      return {
        name: 'Older Toddler (2–3 yrs)',
        focus: 'Autonomy, Boundary Testing & Potty Readiness',
        badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
      };
    case DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3:
      return {
        name: 'Infancy & Toddler (0–3)',
        focus: 'First Words, Motor, BLW & Teething',
        badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    case DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6:
      return {
        name: 'Early Childhood (4–6)',
        focus: 'Preschool, Social-Emotional & Play',
        badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    case DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9:
    case DevelopmentalTier.TIER_1_AGES_8_9:
      return {
        name: 'Middle Childhood (7–9)',
        focus: 'Elementary Curiosity & Focus',
        badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      };
    case DevelopmentalTier.TIER_3_PRE_TEEN_10_12:
    case DevelopmentalTier.TIER_2_AGES_10_11:
      return {
        name: 'Pre-Teen (10–12)',
        focus: 'Tween Shift & Device Readiness',
        badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      };
    case DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15:
    case DevelopmentalTier.TIER_3_AGES_12_13:
      return {
        name: 'Early Adolescence (13–15)',
        focus: 'Pubertal Transition & Curfew Lockout',
        badgeColor: 'bg-violet-50 text-violet-800 border-violet-200',
      };
    case DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18:
    case DevelopmentalTier.TIER_4_AGES_14_PLUS:
      return {
        name: 'Late Adolescence (16–18)',
        focus: 'Executive Autonomy & Self-Regulation',
        badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      };
    default:
      return {
        name: 'Developmental Horizon',
        focus: 'Calibrated Neurodevelopment',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      };
  }
}

export function ChildOnboardingFlow({
  onSuccess,
  onCancel,
  isModal = false,
}: ChildOnboardingFlowProps) {
  const router = useRouter();
  const [step, setStep] = React.useState<1 | 2>(1);
  const [createdChild, setCreatedChild] = React.useState<ChildDTO | null>(null);
  const [apiError, setApiError] = React.useState<string | null>(null);

  const { mutateAsync: createChildMutation, isPending: isSubmitting } = useCreateChild();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm<CreateChildInput>({
    resolver: zodResolver(CreateChildSchema),
    defaultValues: {
      name: '',
      birthYear: currentYear - 8, // default ~8 years old (middle childhood baseline)
      birthMonth: 6,
      roadType: RoadType.PRE_DEVICE,
      schoolGrade: '',
    },
    mode: 'onChange',
  });

  const watchedBirthYear = watch('birthYear');
  const watchedBirthMonth = watch('birthMonth');
  const watchedRoadType = watch('roadType');
  const watchedName = watch('name');

  const calculatedAge = React.useMemo(() => {
    if (!watchedBirthYear || !watchedBirthMonth) return 8;
    return calculateChildAge(Number(watchedBirthYear), Number(watchedBirthMonth));
  }, [watchedBirthYear, watchedBirthMonth]);

  const calculatedAgeMonths = React.useMemo(() => {
    if (!watchedBirthYear || !watchedBirthMonth) return 8 * 12;
    return calculateChildAgeMonths(
      new Date(Number(watchedBirthYear), Number(watchedBirthMonth) - 1, 1)
    );
  }, [watchedBirthYear, watchedBirthMonth]);

  const microTranche = React.useMemo(() => {
    if (calculatedAgeMonths > 36) return null;
    return resolveEarlyChildhoodTranche(calculatedAgeMonths);
  }, [calculatedAgeMonths]);

  const calculatedAgeDisplay =
    calculatedAgeMonths < 24 ? `${calculatedAgeMonths} mo` : `${calculatedAge} yrs`;

  const calculatedTier = React.useMemo(() => {
    if (!watchedBirthYear || !watchedBirthMonth) return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
    return calculateLifespanTier(
      Number(watchedBirthYear),
      Number(watchedBirthMonth),
      new Date(),
      calculatedAgeMonths
    );
  }, [watchedBirthYear, watchedBirthMonth, calculatedAgeMonths]);

  const tierInfo = getTierDisplay(calculatedTier);

  const handleNextStep = async () => {
    const isStepValid = await trigger(['name', 'birthYear', 'birthMonth']);
    if (isStepValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: CreateChildInput) => {
    setApiError(null);
    try {
      const response = await createChildMutation({
        name: data.name.trim(),
        birthYear: Number(data.birthYear),
        birthMonth: Number(data.birthMonth),
        roadType: data.roadType,
        schoolGrade: data.schoolGrade?.trim() || undefined,
        developmentalTier: calculatedTier,
      });

      // Synchronize with active household context store
      const store = useChildContextStore.getState();
      const existing = store.children;
      if (!existing.some((c) => c.id === response.child.id)) {
        store.setChildren([...existing, response.child]);
      }
      store.setActiveChild(response.child.id);

      setCreatedChild(response.child);
      if (onSuccess) {
        onSuccess(response.child);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to create child profile. Please check your inputs.';
      setApiError(message);
    }
  };

  // If successfully created, display contextual decision screen
  if (createdChild) {
    const isPreDevice = createdChild.roadType === RoadType.PRE_DEVICE;

    if (isModal) {
      return (
        <div className="flex flex-col bg-white overflow-hidden rounded-2xl">
          {/* Fixed Modal Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 border border-teal-200 text-teal-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-tight">
                  {createdChild.name}&apos;s Profile is Ready!
                </h3>
                <p className="text-xs text-slate-500">
                  Added to family household • Active profile selected
                </p>
              </div>
            </div>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Scrollable Body */}
          <div className="px-6 py-5 max-h-[calc(85vh-140px)] overflow-y-auto space-y-4">
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white font-bold text-base shrink-0 shadow-xs">
                {createdChild.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-slate-900 text-sm">{createdChild.name}</h4>
                  <Badge variant={isPreDevice ? 'roadPre' : 'roadActive'}>
                    {isPreDevice ? 'Road 1: Pre-Device' : 'Road 2: Active-Device'}
                  </Badge>
                  <Badge variant="outline" className="text-[11px]">
                    {tierInfo.name}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Calculated age: {createdChild.age} yrs • Focus: {tierInfo.focus}
                </p>
              </div>
            </div>

            {isPreDevice ? (
              <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 space-y-2">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Compass className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-emerald-950">
                      Recommended Next Step: First-Phone Readiness Assessment
                    </h5>
                    <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                      Evaluate behavioral and emotional maturity across 10 dimensions before unboxing.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-violet-200/80 bg-violet-50/50 p-4 space-y-2">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-violet-100 text-violet-800 shrink-0 mt-0.5">
                    <Moon className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-violet-950">
                      Recommended Next Step: Bedtime Curfew &amp; Family Treaty
                    </h5>
                    <p className="text-xs text-violet-800 mt-1 leading-relaxed">
                      Enroll their smartphone for the 8:30 PM bedtime lockout to protect sleep.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Modal Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="text-slate-700 min-h-[44px]"
            >
              Done &amp; Close
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (onCancel) onCancel();
                router.push(`/dashboard?childId=${createdChild.id}`);
              }}
              className="bg-teal-600 hover:bg-teal-700 text-white min-h-[44px] px-5 gap-1.5 font-semibold"
            >
              Go to Dashboard (Active Profile)
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Card className="max-w-2xl mx-auto shadow-sm border-slate-200 bg-white">
        <CardHeader className="text-center pb-4 pt-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 border border-teal-200 mb-2">
            <CheckCircle2 className="h-7 w-7 text-teal-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            {createdChild.name}&apos;s Profile is Ready!
          </CardTitle>
          <CardDescription className="text-base text-slate-600 max-w-md mx-auto">
            Configured for{' '}
            <span className="font-semibold text-slate-800">
              {isPreDevice ? 'Road 1: Pre-Device Preparation' : 'Road 2: Active-Device Governance'}
            </span>
            .
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-6 sm:px-8 pb-8">
          {isPreDevice ? (
            <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-950">
                    Recommended Next Step: First-Phone Readiness Assessment
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                    Evaluate {createdChild.name}&apos;s behavioral and emotional maturity across 10
                    dimensions (impulse control, bedtime docking, stranger safety) to generate their
                    personalized readiness score and unboxing charter.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white gap-2 font-medium"
                  onClick={() => router.push(`/children/${createdChild.id}/readiness`)}
                >
                  Start 10-Dimension Assessment
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="sm:w-auto text-slate-700"
                  onClick={() => router.push(`/dashboard?childId=${createdChild.id}`)}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-violet-200/80 bg-violet-50/50 p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-violet-100 text-violet-800 shrink-0">
                  <Moon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-violet-950">
                    Recommended Next Step: Active Digital Treaty &amp; Bedtime Curfew
                  </h4>
                  <p className="text-xs sm:text-sm text-violet-800 mt-1 leading-relaxed">
                    Set up your 8:30 PM Bedtime Curfew and co-review the Restorative Reset Treaty to
                    protect sleep and eliminate nightly device battles.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  className="flex-1 bg-violet-700 hover:bg-violet-800 text-white gap-2 font-medium"
                  onClick={() => router.push(`/dashboard?childId=${createdChild.id}`)}
                >
                  Open Active Parent Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="sm:w-auto text-slate-700"
                  onClick={() => router.push(`/agreements/new?childId=${createdChild.id}`)}
                >
                  Co-Create Family Pact
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Core Form Content
  const formBody = (
    <>
      {apiError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {apiError}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          {/* Child's Name */}
          <div className="space-y-2">
            <label htmlFor="child-name" className="text-sm font-semibold text-slate-900">
              Child&apos;s First Name <span className="text-terracotta-600">*</span>
            </label>
            <Input
              id="child-name"
              placeholder="e.g. Leo, Maya, Oliver, Sofia"
              {...register('name')}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && (
              <p className="text-xs text-red-600 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Birth Month & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="birth-month" className="text-sm font-semibold text-slate-900">
                Birth Month <span className="text-terracotta-600">*</span>
              </label>
              <Controller
                name="birthMonth"
                control={control}
                render={({ field }) => (
                  <select
                    id="birth-month"
                    className="w-full h-11 min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    {MONTHS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.birthMonth && (
                <p className="text-xs text-red-600 font-medium">{errors.birthMonth.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="birth-year" className="text-sm font-semibold text-slate-900">
                Birth Year <span className="text-terracotta-600">*</span>
              </label>
              <Controller
                name="birthYear"
                control={control}
                render={({ field }) => (
                  <select
                    id="birth-year"
                    className="w-full h-11 min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    {ONBOARDING_YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y} {y === currentYear ? '(Newborn / < 1 yr)' : `(Age ~${currentYear - y})`}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.birthYear && (
                <p className="text-xs text-red-600 font-medium">{errors.birthYear.message}</p>
              )}
            </div>
          </div>

          {/* Live Developmental Tier Feedback Box */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Neurodevelopmental Lifespan Profile
              </span>
              <span className="text-xs font-medium text-slate-500">
                Calculated Age: <strong className="text-slate-800">{calculatedAgeDisplay}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <Badge className={`text-xs font-semibold px-2.5 py-0.5 ${tierInfo.badgeColor}`}>
                {tierInfo.name}
              </Badge>
              {microTranche && (
                <Badge variant="outline" className="text-[10px] font-mono text-slate-700 bg-white border-slate-300">
                  Sub-Tranche: {microTranche.replace(/_/g, ' ')}
                </Badge>
              )}
              <span className="text-xs text-slate-600">{tierInfo.focus}</span>
            </div>
          </div>

          {/* School Grade (Optional) */}
          <div className="space-y-2">
            <label htmlFor="school-grade" className="text-sm font-semibold text-slate-900">
              School Grade / Daycare <span className="text-xs font-normal text-slate-500">(Optional)</span>
            </label>
            <Input
              id="school-grade"
              placeholder="e.g. Daycare, Kindergarten, 5th Grade, Middle School"
              {...register('schoolGrade')}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600">
            AlongSide uses two dedicated roads because managing a first phone before purchase
            is fundamentally different than resetting habits on a device they already hold.
          </p>

          {/* Road Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Road 1: PRE_DEVICE */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setValue('roadType', RoadType.PRE_DEVICE)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setValue('roadType', RoadType.PRE_DEVICE);
                }
              }}
              className={`relative flex flex-col justify-between rounded-xl border-2 p-5 text-left transition-all cursor-pointer min-h-[180px] ${
                watchedRoadType === RoadType.PRE_DEVICE
                  ? 'border-emerald-600 bg-emerald-50/60 shadow-sm ring-2 ring-emerald-600/20'
                  : 'border-slate-200 hover:border-emerald-300 bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="roadPre" className="text-xs">
                    Road 1: Pre-Device
                  </Badge>
                  {watchedRoadType === RoadType.PRE_DEVICE && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  )}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    No Personal Smartphone Yet
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Preparing, evaluating readiness, and establishing healthy digital habits before
                    unboxing.
                  </p>
                </div>
              </div>

              <ul className="mt-4 space-y-1.5 border-t border-emerald-200/50 pt-3 text-[11px] text-emerald-900">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                  10-Dimension First-Phone Readiness Assessment
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                  Bridge Device Step-Ladder Guide
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                  Day-1 Pre-Unboxing Family Charter
                </li>
              </ul>
            </div>

            {/* Road 2: ACTIVE_DEVICE */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setValue('roadType', RoadType.ACTIVE_DEVICE)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setValue('roadType', RoadType.ACTIVE_DEVICE);
                }
              }}
              className={`relative flex flex-col justify-between rounded-xl border-2 p-5 text-left transition-all cursor-pointer min-h-[180px] ${
                watchedRoadType === RoadType.ACTIVE_DEVICE
                  ? 'border-violet-600 bg-violet-50/60 shadow-sm ring-2 ring-violet-600/20'
                  : 'border-slate-200 hover:border-violet-300 bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="roadActive" className="text-xs">
                    Road 2: Active-Device
                  </Badge>
                  {watchedRoadType === RoadType.ACTIVE_DEVICE && (
                    <CheckCircle2 className="h-5 w-5 text-violet-600 shrink-0" />
                  )}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Already Has a Smartphone
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Restoring sleep, replacing conflict with curfews, and establishing bilateral
                    co-regulation.
                  </p>
                </div>
              </div>

              <ul className="mt-4 space-y-1.5 border-t border-violet-200/50 pt-3 text-[11px] text-violet-900">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-violet-600 shrink-0" />
                  8:30 PM Bedtime Automated Curfew Lockout
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-violet-600 shrink-0" />
                  Restorative Reset Family Treaty
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-violet-600 shrink-0" />
                  Weekly Youth Slang &amp; Exploit Early Warnings
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // If in Modal Presentation Mode: Fixed Header, Scrollable Body, Sticky Footer, No Double Borders
  if (isModal) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white overflow-hidden rounded-2xl"
      >
        {/* Fixed Modal Header with Zero-Collision Close Button */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-xs font-semibold gap-1 bg-teal-50 border-teal-200 text-teal-800">
                <Sparkles className="h-3 w-3 text-teal-600" />
                Step {step} of 2: {step === 1 ? 'Child Profile' : 'Contextual Road'}
              </Badge>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {step === 1 ? 'Add Child Profile' : 'Choose Contextual Road'}
            </h3>
            <p className="text-xs text-slate-500">
              {step === 1
                ? 'Developmentally calibrated blueprints for ages 0–18.'
                : `Select the digital situation describing ${watchedName || 'your child'} today.`}
            </p>
          </div>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-teal-600"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="px-6 py-5 max-h-[calc(85vh-140px)] overflow-y-auto space-y-6">
          {formBody}
        </div>

        {/* Sticky Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
          {step === 2 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
              className="gap-1.5 text-slate-700 min-h-[44px]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : onCancel ? (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="text-slate-600 hover:text-slate-900 min-h-[44px]"
            >
              Cancel
            </Button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <Button
              type="button"
              onClick={handleNextStep}
              className="gap-1.5 bg-teal-600 hover:bg-teal-700 text-white min-h-[44px] px-6 font-semibold"
            >
              Continue to Road Selection
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="gap-1.5 bg-teal-600 hover:bg-teal-700 text-white min-h-[44px] px-6 font-semibold shadow-xs"
            >
              Create Child Profile
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    );
  }

  // Standalone Card Mode (non-modal)
  return (
    <Card className="max-w-2xl mx-auto shadow-sm border-slate-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge variant="default" className="text-xs font-semibold gap-1 bg-teal-50 border-teal-200 text-teal-800">
            <Sparkles className="h-3 w-3 text-teal-600" />
            Step {step} of 2: {step === 1 ? 'Child Profile' : 'Contextual Road Selection'}
          </Badge>
          <span className="text-xs font-medium text-slate-500">Parent Calm Onboarding</span>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
          {step === 1 ? 'Add Child Profile' : 'Choose Your Contextual Road'}
        </CardTitle>
        <CardDescription className="text-sm text-slate-600">
          {step === 1
            ? 'We customize developmentally calibrated blueprints based on your child’s age and developmental stage.'
            : `Select the digital situation that accurately describes ${watchedName || 'your child'} today.`}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {formBody}

          {/* Flow Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step === 2 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Profile
              </Button>
            ) : onCancel ? (
              <Button type="button" variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
            ) : (
              <div />
            )}

            {step === 1 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                className="gap-1.5 bg-teal-600 hover:bg-teal-700 text-white min-h-[44px] px-6"
              >
                Continue to Road Selection
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                className="gap-1.5 bg-teal-600 hover:bg-teal-700 text-white min-h-[44px] px-6 font-semibold shadow-sm"
              >
                Create Child Profile
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
