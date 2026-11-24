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
  Gender,
  calculateChildAge,
  calculateChildAgeMonths,
  calculateLifespanTier,
  resolveEarlyChildhoodTranche,
  DevelopmentalTier,
} from '@alongside/shared';
import { useCreateChild } from '@/hooks/useChildren';
import { useChildContextStore } from '@/stores/useChildContextStore';
import {
  CheckCircle2,
  ArrowRight,
  Compass,
  Moon,
  X,
  Plus,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChildOnboardingFlowProps {
  onSuccess?: (child: ChildDTO) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export const MONTHS = [
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
  const [createdChild, setCreatedChild] = React.useState<ChildDTO | null>(null);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [overrideEarlyPhone, setOverrideEarlyPhone] = React.useState(false);
  const [showOptionalSchool, setShowOptionalSchool] = React.useState(false);

  const { children: existingChildren } = useChildContextStore();
  const hasExistingChildren = Boolean(existingChildren && existingChildren.length > 0);

  const { mutateAsync: createChildMutation, isPending: isSubmitting } = useCreateChild();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateChildInput>({
    resolver: zodResolver(CreateChildSchema),
    defaultValues: {
      name: '',
      gender: undefined,
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
  const watchedGender = watch('gender');
  const watchedSchoolGrade = watch('schoolGrade');

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
  const cleanStageName = tierInfo.name.split(' (')[0];

  // Auto-switch roadType to PRE_DEVICE for young children unless parent explicitly overrides
  const isEarlyChildhood = calculatedAge <= 6;
  const showEarlyScreenFreeNote = isEarlyChildhood && !overrideEarlyPhone && watchedRoadType === RoadType.PRE_DEVICE;

  const onSubmit = async (data: CreateChildInput) => {
    setApiError(null);
    try {
      const response = await createChildMutation({
        name: data.name.trim(),
        gender: data.gender || undefined,
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

  // =========================================================================
  // SUCCESS / COMPLETION SCREENS
  // =========================================================================
  if (createdChild) {
    const isPreDevice = createdChild.roadType === RoadType.PRE_DEVICE;

    if (isModal) {
      return (
        <div className="flex flex-col h-full bg-[#FAF9F5] overflow-hidden text-[#111413]">
          {/* Header */}
          <div className="px-6 sm:px-8 py-5 border-b border-[#E3E3DC] bg-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EAF3EE] text-[#143D2B] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-normal text-[#111413]">
                  {createdChild.name} is added
                </h3>
                <p className="text-xs text-[#494F4C]">
                  Active household profile calibrated
                </p>
              </div>
            </div>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#858C88] hover:text-[#111413] hover:bg-[#F4F4F0] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 px-6 sm:px-8 py-6 flex flex-col justify-center space-y-4 overflow-y-auto">
            <div className="p-4 rounded-2xl bg-white border border-[#E3E3DC] shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#143D2B] text-white font-serif text-lg font-semibold flex items-center justify-center shrink-0">
                {createdChild.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-sm text-[#111413]">{createdChild.name}</h4>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F4F4F0] text-[#143D2B]">
                    {cleanStageName} · {createdChild.age} yrs
                  </span>
                </div>
                <p className="text-xs text-[#858C88] mt-0.5">
                  {isPreDevice ? 'Road 1 · Pre-Device' : 'Road 2 · Active Phone'}
                  {createdChild.gender ? ` • ${createdChild.gender === 'MALE' ? 'Boy' : 'Girl'}` : ''}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#EAF3EE] border border-[#D1E7DD] text-xs text-[#143D2B] space-y-1">
              <p className="font-semibold">
                {isPreDevice ? 'Next recommended milestone:' : 'Next recommended step:'}
              </p>
              <p className="text-[#0E2B1E] leading-relaxed">
                {isPreDevice
                  ? 'First-Phone Readiness Assessment evaluates impulse control, stranger instincts, and sleep boundaries.'
                  : 'Enroll their smartphone with bedtime lockout to protect restorative sleep.'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-4 border-t border-[#E3E3DC] bg-white flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-[#E3E3DC] bg-white text-xs font-semibold text-[#494F4C] hover:bg-[#F4F4F0] transition-colors"
            >
              Done &amp; Close
            </button>
            <button
              type="button"
              onClick={() => {
                if (onCancel) onCancel();
                router.push(`/dashboard?childId=${createdChild.id}`);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      );
    }

    // Standalone Setup Completion Screen
    return (
      <div className="max-w-2xl mx-auto p-8 sm:p-12 text-center bg-[#FAF9F5] rounded-3xl border border-[#E5E2D9] shadow-sm my-6">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#EAF3EE] text-[#143D2B] flex items-center justify-center border border-[#D1E7DD]">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#111413] tracking-tight">
          {createdChild.name}&apos;s profile is calibrated
        </h2>
        <p className="text-sm text-[#494F4C] mt-2 max-w-md mx-auto">
          Configured for {cleanStageName} ({createdChild.age} yrs) on{' '}
          <strong className="text-[#143D2B]">
            {isPreDevice ? 'Road 1: Pre-Device Preparation' : 'Road 2: Active Phone'}
          </strong>
          .
        </p>

        <div className="mt-8 p-6 rounded-2xl bg-white border border-[#E3E3DC] text-left max-w-lg mx-auto shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#EAF3EE] text-[#143D2B] shrink-0">
              {isPreDevice ? <Compass className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#111413]">
                {isPreDevice
                  ? 'Recommended Next Step: First-Phone Readiness'
                  : 'Recommended Next Step: Bedtime Curfew & Parental Controls'}
              </h4>
              <p className="text-xs text-[#494F4C] mt-1 leading-relaxed">
                {isPreDevice
                  ? `Evaluate ${createdChild.name}'s emotional and digital maturity across 10 dimensions before unboxing.`
                  : `Configure automatic 8:30 PM bedtime downtime and content safeguards for ${createdChild.name}'s phone.`}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => {
                if (isPreDevice) {
                  router.push(`/children/${createdChild.id}/readiness`);
                } else {
                  router.push(`/devices?tab=controls&childId=${createdChild.id}`);
                }
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>{isPreDevice ? 'Start 10-Dimension Assessment' : 'Set Up Parental Controls'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => router.push(`/dashboard?childId=${createdChild.id}`)}
              className="py-3 px-4 rounded-xl border border-[#E3E3DC] bg-white hover:bg-[#F4F4F0] text-xs font-semibold text-[#494F4C] transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHARED FORM FIELDS (NAME, GENDER, BIRTHDATE, STAGE, PHONE, SCHOOL)
  // =========================================================================
  const formFields = (
    <div className="space-y-3.5 sm:space-y-4">
      {apiError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 font-medium">
          {apiError}
        </div>
      )}

      {/* Row 1: First Name & Gender Toggle */}
      <div className="grid grid-cols-[1.15fr_0.85fr] gap-3 items-end">
        <div>
          <label htmlFor="child-first-name" className="block text-xs font-semibold text-[#111413] mb-1.5">
            First name <span className="text-[#B45309]">*</span>
          </label>
          <input
            id="child-first-name"
            type="text"
            placeholder="e.g. Maya"
            {...register('name')}
            aria-invalid={Boolean(errors.name)}
            className="w-full h-10 rounded-xl border border-[#E3E3DC] bg-white px-3 text-xs text-[#111413] placeholder-[#858C88] focus:border-[#143D2B] focus:outline-none focus:ring-2 focus:ring-[#143D2B]/15 transition-colors"
          />
        </div>

        <div>
          <div className="text-xs font-semibold text-[#111413] mb-1.5">
            Boy or girl <span className="text-[#B45309]">*</span>
          </div>
          <div className="grid grid-cols-2 gap-1 p-0.5 bg-[#F4F4F0] rounded-xl border border-[#E3E3DC] h-10">
            <button
              type="button"
              onClick={() => setValue('gender', Gender.MALE, { shouldValidate: true })}
              className={cn(
                'text-xs font-semibold rounded-lg transition-all flex items-center justify-center',
                watchedGender === Gender.MALE
                  ? 'bg-white text-[#143D2B] shadow-2xs font-semibold'
                  : 'text-[#494F4C] hover:text-[#111413]'
              )}
            >
              Boy
            </button>
            <button
              type="button"
              onClick={() => setValue('gender', Gender.FEMALE, { shouldValidate: true })}
              className={cn(
                'text-xs font-semibold rounded-lg transition-all flex items-center justify-center',
                watchedGender === Gender.FEMALE
                  ? 'bg-white text-[#143D2B] shadow-2xs font-semibold'
                  : 'text-[#494F4C] hover:text-[#111413]'
              )}
            >
              Girl
            </button>
          </div>
        </div>
      </div>
      {(errors.name || errors.gender) && (
        <p className="text-[11px] text-rose-600 font-medium">
          {errors.name?.message || errors.gender?.message}
        </p>
      )}

      {/* Row 2: Birth Month & Year */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="birth-month-select" className="block text-xs font-semibold text-[#111413] mb-1.5">
            Birth month <span className="text-[#B45309]">*</span>
          </label>
          <Controller
            name="birthMonth"
            control={control}
            render={({ field }) => (
              <select
                id="birth-month-select"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-[#E3E3DC] bg-white px-3 text-xs text-[#111413] focus:border-[#143D2B] focus:outline-none focus:ring-2 focus:ring-[#143D2B]/15 transition-colors cursor-pointer"
              >
                {MONTHS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div>
          <label htmlFor="birth-year-select" className="block text-xs font-semibold text-[#111413] mb-1.5">
            Birth year <span className="text-[#B45309]">*</span>
          </label>
          <Controller
            name="birthYear"
            control={control}
            render={({ field }) => (
              <select
                id="birth-year-select"
                value={field.value}
                onChange={(e) => {
                  field.onChange(Number(e.target.value));
                  setOverrideEarlyPhone(false);
                }}
                className="w-full h-10 rounded-xl border border-[#E3E3DC] bg-white px-3 text-xs text-[#111413] focus:border-[#143D2B] focus:outline-none focus:ring-2 focus:ring-[#143D2B]/15 transition-colors cursor-pointer font-mono"
              >
                {ONBOARDING_YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y} {y === currentYear ? '(Newborn)' : `(~${currentYear - y} yrs)`}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </div>

      {/* Row 3: Crisp One-Line Stage Strip */}
      <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#F4F4F0] border border-[#E3E3DC] text-xs">
        <span className="font-semibold text-[#143D2B]">{cleanStageName}</span>
        <span className="text-[#494F4C] font-mono font-medium">{calculatedAgeDisplay}</span>
      </div>

      {/* Row 4: Phone Toggle (Segmented or Screen-free note for ages 0–6) */}
      <div>
        {showEarlyScreenFreeNote ? (
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F4F4F0] border border-[#E3E3DC] text-xs">
            <span className="text-[#494F4C]">
              <strong className="text-[#143D2B] font-semibold">Ages 0–6</strong> · Screen-free &amp; shared device
            </span>
            <button
              type="button"
              onClick={() => setOverrideEarlyPhone(true)}
              className="text-xs font-semibold text-[#143D2B] hover:underline transition-all"
            >
              Has a phone?
            </button>
          </div>
        ) : (
          <div>
            <div className="text-xs font-semibold text-[#111413] mb-1.5">
              Personal phone right now?
            </div>
            <div className="grid grid-cols-2 gap-1 p-0.5 bg-[#F4F4F0] rounded-xl border border-[#E3E3DC] h-10">
              <button
                type="button"
                onClick={() => setValue('roadType', RoadType.PRE_DEVICE)}
                className={cn(
                  'text-xs font-semibold rounded-lg transition-all flex items-center justify-center',
                  watchedRoadType === RoadType.PRE_DEVICE
                    ? 'bg-white text-[#143D2B] shadow-2xs font-semibold'
                    : 'text-[#494F4C] hover:text-[#111413]'
                )}
              >
                Not yet
              </button>
              <button
                type="button"
                onClick={() => setValue('roadType', RoadType.ACTIVE_DEVICE)}
                className={cn(
                  'text-xs font-semibold rounded-lg transition-all flex items-center justify-center',
                  watchedRoadType === RoadType.ACTIVE_DEVICE
                    ? 'bg-white text-[#143D2B] shadow-2xs font-semibold'
                    : 'text-[#494F4C] hover:text-[#111413]'
                )}
              >
                Yes, has a phone
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Row 5: School / Daycare (Optional Expandable) */}
      <div>
        {!showOptionalSchool && !watchedSchoolGrade ? (
          <button
            type="button"
            onClick={() => setShowOptionalSchool(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#494F4C] hover:text-[#143D2B] transition-colors py-1"
          >
            <Plus className="w-3.5 h-3.5 text-[#143D2B]" />
            <span>School or daycare <span className="text-[#858C88]">(optional)</span></span>
          </button>
        ) : (
          <div className="animate-in fade-in-0 duration-200">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="school-grade-input" className="text-xs font-semibold text-[#111413]">
                School or daycare
              </label>
              <span className="text-[11px] text-[#858C88]">Optional</span>
            </div>
            <input
              id="school-grade-input"
              type="text"
              placeholder="e.g. Daycare, Kindergarten, 5th Grade"
              {...register('schoolGrade')}
              className="w-full h-10 rounded-xl border border-[#E3E3DC] bg-white px-3 text-xs text-[#111413] placeholder-[#858C88] focus:border-[#143D2B] focus:outline-none focus:ring-2 focus:ring-[#143D2B]/15 transition-colors"
            />
          </div>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // PRESENTATION 1: MODAL / SLIDE-OVER DRAWER (ADD ANOTHER CHILD)
  // =========================================================================
  if (isModal) {
    const previewName = watchedName?.trim() ? watchedName.trim() : 'a sibling';

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full bg-[#FAF9F5] text-[#111413] overflow-hidden"
      >
        {/* Banner with Sibling Photo & Existing Child Badges */}
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ height: 'clamp(132px, 24vh, 206px)' }}
        >
          {/* Sibling Photo */}
          <img
            src="/images/home/generated-siblings-play.jpg"
            alt="Siblings playing together"
            className="w-full h-full object-cover object-[center_28%]"
          />
          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2016]/90 via-[#0E2016]/40 to-[#0E2016]/20" />

          {/* Banner Floating Content */}
          <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between text-white z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {existingChildren &&
                  existingChildren.slice(0, 3).map((child) => (
                    <span
                      key={child.id}
                      className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-medium text-white shadow-2xs"
                    >
                      {child.name}, {child.age}
                    </span>
                  ))}
                <span className="px-2.5 py-1 rounded-full bg-[#FAF9F5] text-[#143D2B] text-[11px] font-semibold shadow-2xs">
                  + {watchedName?.trim() ? watchedName.trim() : 'New child'}
                </span>
              </div>

              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-white drop-shadow-xs">
              Add a sibling
            </h2>
          </div>
        </div>

        {/* Drawer Body: Optically Centered with Zero Scrollbar on Desktop */}
        <div className="flex-1 px-6 sm:px-8 py-4 sm:py-6 flex flex-col justify-center overflow-y-auto">
          <div className="my-auto">
            {formFields}
          </div>
        </div>

        {/* Pinned Drawer Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-[#E3E3DC] bg-white flex items-center justify-between gap-3 shrink-0">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-[#E3E3DC] text-xs font-semibold text-[#494F4C] hover:bg-[#F4F4F0] transition-colors"
            >
              Cancel
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl bg-[#143D2B] hover:bg-[#0E2B1E] disabled:opacity-60 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <span>Add {previewName} &amp; switch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>
    );
  }

  // =========================================================================
  // PRESENTATION 2: STANDALONE SUNLIT FOLIO (FIRST-TIME SETUP)
  // =========================================================================
  return (
    <div className="w-full bg-[#FAF9F5] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] min-h-[640px] lg:min-h-[720px] rounded-3xl overflow-hidden border border-[#E5E2D9] shadow-sm">
      {/* Left Column: Father & Daughter Reading Photo Pane */}
      <div className="relative min-h-[260px] lg:min-h-[720px] overflow-hidden bg-[#1B3428] flex flex-col justify-between p-6 sm:p-8 lg:p-10 text-[#FAF9F5]">
        <img
          src="/images/home/left_facing_father_daughter_reading.jpg"
          alt="Father and daughter reading together in warm afternoon light"
          className="absolute inset-0 w-full h-full object-cover object-[62%_34%]"
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111915]/30 via-[#111915]/10 to-[#0E2219]/90" />

        {/* Top: Brand Badge */}
        <div className="relative z-10 flex items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF9F5]/90 backdrop-blur-md text-[#111413]">
            <img
              src="/brand/alongside-logo-full-256.png"
              alt="Alongside"
              className="w-5 h-5 rounded-md object-contain"
            />
            <span className="font-serif text-sm font-semibold tracking-tight">Alongside</span>
          </div>
        </div>

        {/* Bottom: Editorial Warm Quote */}
        <div className="relative z-10 space-y-2 max-w-sm">
          <p className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-white drop-shadow-xs">
            Every age has its own wiring. Set up once, and the whole guide adapts to them.
          </p>
          <p className="text-xs text-white/80 leading-relaxed">
            Daily scripts, 5-minute chapters, and built-in parental controls for ages 0–18.
          </p>
        </div>
      </div>

      {/* Right Column: Clean Craft Form */}
      <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-[#FAF9F5]">
        <div className="max-w-md w-full mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#111413] tracking-tight leading-tight">
            {hasExistingChildren ? 'Add a child' : 'Add your first child'}
          </h1>
          <p className="text-xs sm:text-sm text-[#494F4C] mt-1.5 leading-relaxed">
            {hasExistingChildren
              ? 'Calibrate age-tailored blueprints and device boundaries for another child.'
              : 'You can add siblings anytime after this.'}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 sm:mt-8 space-y-6">
            {formFields}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-[#143D2B] hover:bg-[#0E2B1E] disabled:opacity-60 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Calibrating blueprint...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
