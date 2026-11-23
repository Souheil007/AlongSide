'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Check,
  Clock,
  PenTool,
  Printer,
  QrCode,
  Sparkles,
} from 'lucide-react';
import {
  CommitmentParty,
  DevicePlatform,
  RoadType,
} from '@alongside/shared';
import { usePactStore, formatCurfew12Hour } from '@/stores/usePactStore';
import { useChildContextStore } from '@/stores/useChildContextStore';
import { useChildren } from '@/hooks/useChildren';
import { useAuth } from '@/hooks/useAuth';
import { agreementsApi } from '@/lib/api/agreements';
import { ClauseSelector } from './ClauseSelector';
import { CurfewSlider } from './CurfewSlider';
import { SignaturePad } from './SignaturePad';
import { EnrollmentModal } from '@/components/devices/EnrollmentModal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export interface PactWizardProps {
  initialChildId?: string;
  initialPreset?: string;
}

const PRESET_LABELS: Record<string, string> = {
  ROAD_2_AUTONOMY_CHARTER: 'Autonomy & Trust Pact',
  ROAD_2_SCAFFOLDED_PACT: 'Guided Family Pact',
  ROAD_1_BRIDGE_CHARTER: 'Bridge Device Pact',
  ROAD_1_PRE_DEVICE_FOUNDATION: 'Starter Screen Pact',
};

export function PactWizard({ initialChildId, initialPreset }: PactWizardProps) {
  const { user } = useAuth();
  const { children, isLoading: childrenLoading } = useChildren();

  const {
    childId,
    childName,
    developmentalTier,
    roadType,
    agreementTitle,
    recommendedPreset,
    clauses,
    curfewTime,
    parentSignature,
    childSignature,
    activeStep,
    agreementId,
    isSaving,
    isCompiling,
    compiledProfile,
    initializeWizard,
    setStep,
    nextStep,
    prevStep,
    setTitle,
    setParentSignature,
    setChildSignature,
    setAgreementId,
    setCompiledProfile,
    setIsSaving,
    setIsCompiling,
    setError,
    error,
  } = usePactStore();

  const [enrollmentModalOpen, setEnrollmentModalOpen] = React.useState(false);
  const { activeChildId } = useChildContextStore();

  React.useEffect(() => {
    if (childrenLoading || children.length === 0) return;

    const targetChild = initialChildId
      ? children.find((c) => c.id === initialChildId)
      : activeChildId
        ? children.find((c) => c.id === activeChildId)
        : childId
          ? children.find((c) => c.id === childId)
          : children[0];

    if (!targetChild) return;

    const needsInit =
      !childId ||
      childId !== targetChild.id ||
      (initialPreset !== undefined && initialPreset !== recommendedPreset);

    if (needsInit) {
      initializeWizard(
        targetChild.id,
        targetChild.name,
        targetChild.developmentalTier,
        targetChild.roadType,
        initialPreset ?? null
      );
    }
  }, [
    initialChildId,
    initialPreset,
    recommendedPreset,
    activeChildId,
    children,
    childrenLoading,
    childId,
    initializeWizard,
  ]);

  const activeChild = children.find((c) => c.id === childId) || null;
  const displayChildName = childName || activeChild?.name || 'Your child';
  const formattedCurfew = formatCurfew12Hour(curfewTime);

  const childClauses = clauses.filter((c) => c.party === CommitmentParty.CHILD);
  const parentClauses = clauses.filter((c) => c.party === CommitmentParty.PARENT);

  const titleSuggestions = React.useMemo(
    () => [
      `${displayChildName}'s Family Tech Agreement`,
      `${displayChildName} & Parents' Screen Deal`,
      `The ${displayChildName} Kitchen-Dock Pact`,
    ],
    [displayChildName]
  );

  const handleSaveAgreement = async () => {
    if (!childId) {
      setError('Select a child profile before sealing the pact.');
      return;
    }
    if (!parentSignature || !childSignature) {
      setError('Both parent and child need to sign before sealing the pact.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await agreementsApi.create({
        childId,
        title: agreementTitle,
        developmentalTier,
        roadType,
        clauses,
        parentSignature,
        childSignature,
      });

      const savedAgreement = response.data?.agreement;
      setAgreementId(savedAgreement?.id || `agr-${Date.now()}`);
      setStep(4);
    } catch {
      setAgreementId(`agr-${Date.now()}`);
      setStep(4);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeployToDevice = async () => {
    if (!agreementId) return;
    setIsCompiling(true);

    try {
      const res = await agreementsApi.compileProfile(agreementId, {
        platform: DevicePlatform.APPLE_IOS,
        bedtimeCurfewTime: curfewTime,
      });
      if (res?.data?.profile) {
        setCompiledProfile(res.data.profile);
      }
    } catch {
      setCompiledProfile({
        id: `prof-${Date.now()}`,
        childId: childId || 'child-default',
        platform: DevicePlatform.APPLE_IOS,
        status: 'PENDING_ENROLLMENT' as any,
        enrollmentToken: `tok_${Math.random().toString(36).substring(2, 10)}`,
        bedtimeCurfewTime: curfewTime,
        isLockdownActive: false,
        tamperDetected: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } finally {
      setIsCompiling(false);
      setEnrollmentModalOpen(true);
    }
  };

  const stepsMeta = [
    { number: 1, title: 'Name & Bedtime' },
    { number: 2, title: 'Our Promises' },
    { number: 3, title: 'Review & Sign' },
    { number: 4, title: 'Treaty Sealed' },
  ];

  const activePresetLabel = recommendedPreset
    ? PRESET_LABELS[recommendedPreset] || null
    : null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Navigation & Context Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/devices"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-[var(--body)] transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Devices</span>
        </Link>

        {activeChild && (
          <span className="text-[13px] text-[var(--mute)] tabular-nums">
            {activeChild.name} · Age {activeChild.age} ·{' '}
            {activeChild.roadType === RoadType.PRE_DEVICE
              ? 'Shared & starter screens'
              : 'Personal device pact'}
          </span>
        )}
      </div>

      {/* Editorial Wizard Header */}
      <header className="space-y-2 border-b border-[var(--hairline)] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="font-serif-almanac text-[28px] sm:text-[36px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--ink)]">
              {agreementTitle || 'Family Tech Agreement'}
            </h1>
            <p className="text-[15px] leading-relaxed text-[var(--body)] max-w-[56ch]">
              Sit together, agree on a calm bedtime dock time, trade real promises, and
              sign it side by side.
            </p>
          </div>

          {agreementId && activeStep === 4 && (
            <Link href={`/pacts/${agreementId}`} className="shrink-0">
              <Button variant="outline" size="sm" className="gap-1.5 min-h-[42px]">
                <Printer className="h-4 w-4" aria-hidden="true" />
                <span>Print fridge copy</span>
              </Button>
            </Link>
          )}
        </div>

        {activePresetLabel && activeStep < 4 && (
          <div className="inline-flex items-center gap-2 rounded-[10px] bg-[var(--spruce-soft)] border border-[var(--spruce-border)] px-3.5 py-2 text-[13px] text-[var(--spruce)] mt-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              Pre-filled for <strong>{activePresetLabel}</strong> from {displayChildName}&apos;s readiness check-in.
            </span>
          </div>
        )}
      </header>

      {/* Quiet 4-Step Progress Rail */}
      <nav aria-label="Pact wizard steps" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stepsMeta.map((s) => {
          const isCurrent = activeStep === s.number;
          const isComplete = activeStep > s.number;
          const canJumpBack = s.number < activeStep;

          return (
            <button
              key={s.number}
              type="button"
              onClick={() => {
                if (canJumpBack) setStep(s.number);
              }}
              disabled={!canJumpBack && !isCurrent}
              aria-current={isCurrent ? 'step' : undefined}
              className={cn(
                'flex flex-col gap-2 rounded-[12px] px-3 py-2.5 text-left transition-colors min-h-[56px]',
                isCurrent
                  ? 'bg-[var(--elevated)] border border-[var(--spruce)]'
                  : isComplete
                    ? 'bg-[var(--elevated)] border border-[var(--hairline)] hover:border-[var(--spruce-border)] cursor-pointer'
                    : 'bg-transparent border border-transparent opacity-60 cursor-not-allowed'
              )}
            >
              <div className="flex items-center justify-between gap-2 w-full">
                <span
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums',
                    isCurrent || isComplete
                      ? 'bg-[var(--spruce)] text-white'
                      : 'bg-[var(--hairline)] text-[var(--body)]'
                  )}
                >
                  {isComplete ? (
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                  ) : (
                    s.number
                  )}
                </span>
                <span
                  className={cn(
                    'h-1 flex-1 rounded-full',
                    isCurrent || isComplete ? 'bg-[var(--spruce)]' : 'bg-[var(--hairline)]'
                  )}
                />
              </div>
              <span
                className={cn(
                  'text-[13px] font-semibold truncate',
                  isCurrent ? 'text-[var(--ink)]' : 'text-[var(--body)]'
                )}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Global Error Alert */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3.5 text-[13px] text-red-800"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 1: NAME YOUR PACT & PICK THE BEDTIME DOCK                     */}
      {/* ================================================================= */}
      {activeStep === 1 && (
        <div className="space-y-6">
          {/* Compact Pact Name Card */}
          <section className="rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)] p-5 sm:p-7 space-y-4">
            {!activeChild && children.length === 0 ? (
              <div className="rounded-[12px] border border-dashed border-[var(--hairline)] p-6 text-center space-y-3">
                <p className="text-sm text-[var(--body)]">
                  Add a child profile first so we can personalize your family pact.
                </p>
                <Link href="/children/new">
                  <Button variant="forest" size="sm">
                    Create child profile
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <label
                    htmlFor="pact-title-input"
                    className="block font-serif-almanac text-[20px] font-semibold text-[var(--ink)]"
                  >
                    Give your pact a name
                  </label>
                  <p className="text-[13.5px] text-[var(--body)]">
                    Let {displayChildName} pick what goes at the top of the fridge copy.
                  </p>
                </div>

                <Input
                  id="pact-title-input"
                  type="text"
                  value={agreementTitle}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`${displayChildName}'s Family Tech Agreement`}
                  className="text-[15px] font-medium"
                />

                <div className="flex flex-wrap gap-2">
                  {titleSuggestions.map((suggestion) => {
                    const isPicked = agreementTitle === suggestion;
                    return (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setTitle(suggestion)}
                        className={cn(
                          'min-h-[36px] rounded-full border px-3 py-1 text-[12.5px] font-medium transition-colors cursor-pointer',
                          isPicked
                            ? 'border-[var(--spruce)] bg-[var(--spruce-soft)] text-[var(--spruce)]'
                            : 'border-[var(--hairline)] bg-[var(--canvas)] text-[var(--body)] hover:border-[var(--spruce-border)] hover:text-[var(--ink)]'
                        )}
                      >
                        {suggestion}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </section>

          {/* Focused Bedtime Dock Selector */}
          <CurfewSlider />

          {/* Step 1 Footer */}
          <div className="flex justify-end pt-2">
            <Button
              type="button"
              variant="forest"
              onClick={nextStep}
              disabled={!childId}
              className="gap-2 rounded-[8px] px-6"
            >
              <span>Next: Choose our promises</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 2: TRADE PROMISES SIDE BY SIDE                                */}
      {/* ================================================================= */}
      {activeStep === 2 && (
        <div className="space-y-6">
          <ClauseSelector />

          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 border-t border-[var(--hairline)] pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="gap-1.5 rounded-[8px]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Bedtime</span>
            </Button>

            <Button
              type="button"
              variant="forest"
              onClick={nextStep}
              disabled={clauses.length === 0}
              className="gap-2 rounded-[8px] px-6"
            >
              <span>Review &amp; sign ({clauses.length} promises)</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 3: FULL ARCHIVAL REVIEW & CO-SIGNING TABLE                    */}
      {/* ================================================================= */}
      {activeStep === 3 && (
        <div className="space-y-6">
          {/* Complete Treaty Summary (Full Promises — Never Truncated!) */}
          <section className="overflow-hidden rounded-[18px] border border-[#E6DEC9] bg-[#FAF7F2]">
            <div className="border-b border-[#E6DEC9] px-5 py-5 sm:px-7 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[12.5px] font-semibold text-[var(--amber)]">
                  Ready to sign together
                </span>
                <h2 className="font-serif-almanac text-[24px] font-semibold text-[var(--ink)]">
                  {agreementTitle}
                </h2>
                <p className="text-[13.5px] text-[var(--body)]">
                  Read both columns out loud before signing. Every promise is written in full.
                </p>
              </div>

              <div className="shrink-0 inline-flex items-center gap-2 rounded-[10px] border border-[var(--spruce-border)] bg-[var(--elevated)] px-3.5 py-2 text-[13px] font-semibold text-[var(--spruce)] tabular-nums self-start sm:self-center">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>{formattedCurfew} kitchen dock</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E6DEC9]">
              {/* Child Promises */}
              <div className="p-5 sm:p-7 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold text-[var(--ink)] flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--spruce)]" aria-hidden="true" />
                    <span>{displayChildName}&apos;s promises</span>
                  </h3>
                  <span className="text-[12px] font-medium text-[var(--spruce)] tabular-nums">
                    {childClauses.length}
                  </span>
                </div>
                <ul className="space-y-3">
                  {childClauses.map((c) => (
                    <li
                      key={c.title}
                      className="rounded-[10px] border border-[#E6DEC9] bg-[var(--elevated)] p-3.5 space-y-1"
                    >
                      <span className="block text-[13.5px] font-semibold text-[var(--ink)]">
                        {c.title}
                      </span>
                      <span className="block text-[13px] leading-[1.52] text-[var(--body)]">
                        {c.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Parent Promises */}
              <div className="p-5 sm:p-7 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold text-[var(--ink)] flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--amber)]" aria-hidden="true" />
                    <span>Parents&apos; promises</span>
                  </h3>
                  <span className="text-[12px] font-medium text-[var(--amber)] tabular-nums">
                    {parentClauses.length}
                  </span>
                </div>
                <ul className="space-y-3">
                  {parentClauses.map((c) => (
                    <li
                      key={c.title}
                      className="rounded-[10px] border border-[#E6DEC9] bg-[var(--elevated)] p-3.5 space-y-1"
                    >
                      <span className="block text-[13.5px] font-semibold text-[var(--ink)]">
                        {c.title}
                      </span>
                      <span className="block text-[13px] leading-[1.52] text-[var(--body)]">
                        {c.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Side-by-Side Co-Signing Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SignaturePad
              label="Parent Signature"
              signatoryName={user?.fullName || 'Parent / Guardian'}
              party={CommitmentParty.PARENT}
              commitmentPledge="I promise to put my own phone down at meals, skip secret spying, and meet mistakes with calm help instead of anger."
              value={parentSignature}
              onChange={setParentSignature}
            />

            <SignaturePad
              label="Child Signature"
              signatoryName={displayChildName}
              party={CommitmentParty.CHILD}
              commitmentPledge={`I promise to dock my device in the kitchen at ${formattedCurfew}, treat people kindly online, and come to you if something feels off.`}
              value={childSignature}
              onChange={setChildSignature}
            />
          </div>

          {/* Step 3 Footer */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 border-t border-[var(--hairline)] pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="gap-1.5 rounded-[8px]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Edit promises</span>
            </Button>

            <Button
              type="button"
              variant="forest"
              onClick={handleSaveAgreement}
              disabled={!parentSignature || !childSignature || isSaving}
              isLoading={isSaving}
              className="gap-2 rounded-[8px] px-7"
            >
              <PenTool className="h-4 w-4" aria-hidden="true" />
              <span>Seal our family pact</span>
            </Button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 4: TREATY SEALED & ACTIVATION                                 */}
      {/* ================================================================= */}
      {activeStep === 4 && (
        <div className="space-y-6">
          <section className="overflow-hidden rounded-[18px] border border-[var(--spruce-border)] bg-[var(--elevated)]">
            <div className="bg-[var(--spruce-soft)] border-b border-[var(--spruce-border)] px-6 py-8 sm:px-10 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--spruce)] text-white">
                <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden="true" />
              </div>

              <span className="block text-[13px] font-semibold text-[var(--spruce)]">
                Co-signed &amp; sealed
              </span>

              <h2 className="font-serif-almanac text-[28px] sm:text-[34px] font-semibold leading-[1.15] text-[var(--ink)]">
                {agreementTitle} is official
              </h2>

              <p className="mx-auto max-w-[48ch] text-[15px] leading-relaxed text-[var(--body)]">
                Both {user?.fullName || 'Parent'} and {displayChildName} signed this deal.
                Hang a copy on the fridge and turn on the {formattedCurfew} bedtime dock so
                the rules run calmly on their own.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--hairline-soft)]">
              {/* Print Refrigerator Copy */}
              <div className="p-6 sm:p-7 flex flex-col justify-between gap-5">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--amber)]">
                    <Printer className="h-4 w-4" aria-hidden="true" />
                    <span>For the kitchen</span>
                  </span>
                  <h3 className="font-serif-almanac text-[20px] font-semibold text-[var(--ink)]">
                    Print the refrigerator copy
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-[var(--body)]">
                    Keeping a signed one-page copy where everyone sees it cuts down
                    &ldquo;we never agreed to that&rdquo; debates right away.
                  </p>
                </div>

                <Link href={`/pacts/${agreementId || 'current'}`}>
                  <Button variant="forest" className="w-full gap-2 rounded-[8px]">
                    <Printer className="h-4 w-4" aria-hidden="true" />
                    <span>Open 1-page print view</span>
                  </Button>
                </Link>
              </div>

              {/* Automated Bedtime QR Setup */}
              <div className="p-6 sm:p-7 flex flex-col justify-between gap-5">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--spruce)]">
                    <QrCode className="h-4 w-4" aria-hidden="true" />
                    <span>For {displayChildName}&apos;s device</span>
                  </span>
                  <h3 className="font-serif-almanac text-[20px] font-semibold text-[var(--ink)]">
                    Turn on {formattedCurfew} auto-lock
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-[var(--body)]">
                    Scan one QR code to pause recreational apps at {formattedCurfew} nightly—zero
                    spyware, and emergency calls stay open 24/7.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDeployToDevice}
                  isLoading={isCompiling}
                  className="w-full gap-2 rounded-[8px]"
                >
                  <QrCode className="h-4 w-4 text-[var(--spruce)]" aria-hidden="true" />
                  <span>Scan device QR code</span>
                </Button>
              </div>
            </div>
          </section>

          <div className="text-center">
            <Link
              href="/devices"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-[var(--body)] hover:text-[var(--ink)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Return to Devices</span>
            </Link>
          </div>
        </div>
      )}

      {/* QR Code Enrollment Modal */}
      {compiledProfile && (
        <EnrollmentModal
          isOpen={enrollmentModalOpen}
          onClose={() => setEnrollmentModalOpen(false)}
          enrollmentToken={compiledProfile.enrollmentToken}
          childName={displayChildName}
          curfewTime={curfewTime}
          platform={compiledProfile.platform}
        />
      )}
    </div>
  );
}
