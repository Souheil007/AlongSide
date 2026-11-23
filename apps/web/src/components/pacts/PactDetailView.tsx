'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Printer,
  QrCode,
  ArrowLeft,
  Check,
  Clock,
  Award,
} from 'lucide-react';
import {
  CommitmentParty,
  DevicePlatform,
  type AgreementDTO,
} from '@alongside/shared';
import {
  usePactStore,
  formatCurfew12Hour,
  CANONICAL_PRESET_CLAUSES,
} from '@/stores/usePactStore';
import { agreementsApi } from '@/lib/api/agreements';
import { EnrollmentModal } from '@/components/devices/EnrollmentModal';
import { Button } from '@/components/ui/Button';
import { AlongsideLogo } from '@/components/shared/AlongsideLogo';

export interface PactDetailViewProps {
  agreementId: string;
}

export function PactDetailView({ agreementId }: PactDetailViewProps) {
  const store = usePactStore();
  const [agreement, setAgreement] = React.useState<AgreementDTO | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = React.useState(false);
  const [enrollmentToken, setEnrollmentToken] = React.useState(`tok_${Date.now()}`);

  React.useEffect(() => {
    let isMounted = true;

    async function loadAgreement() {
      setIsLoading(true);
      try {
        const res = await agreementsApi.getById(agreementId);
        if (isMounted && res?.data?.agreement) {
          setAgreement(res.data.agreement);
        }
      } catch {
        if (isMounted) {
          const sourceClauses =
            store.agreementId === agreementId ||
            agreementId.startsWith('agr-') ||
            agreementId === 'current'
              ? store.clauses
              : CANONICAL_PRESET_CLAUSES;

          setAgreement({
            id: agreementId,
            userId: 'current-user',
            childId: store.childId || 'child-default',
            title: store.agreementTitle || 'Family Tech Agreement',
            status: 'SIGNED' as any,
            developmentalTier: store.developmentalTier,
            roadType: store.roadType,
            parentSignature: store.parentSignature,
            childSignature: store.childSignature,
            signedAt: new Date().toISOString(),
            clauses: sourceClauses.map((c, idx) => ({
              id: `cl-${idx}`,
              agreementId,
              category: c.category,
              party: c.party,
              title: c.title,
              description: c.description,
              isStandard: c.isStandard ?? true,
              isCustom: c.isCustom ?? false,
              sortOrder: c.sortOrder ?? idx,
            })),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadAgreement();
    return () => {
      isMounted = false;
    };
  }, [agreementId, store]);

  const handlePrint = () => {
    window.print();
  };

  const handleOpenEnrollment = async () => {
    try {
      const res = await agreementsApi.compileProfile(agreementId, {
        platform: DevicePlatform.APPLE_IOS,
        bedtimeCurfewTime: store.curfewTime || '20:30',
      });
      if (res?.data?.profile?.enrollmentToken) {
        setEnrollmentToken(res.data.profile.enrollmentToken);
      }
    } catch {
      setEnrollmentToken(`tok_${Math.random().toString(36).substring(2, 10)}`);
    }
    setEnrollmentModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--spruce)] border-t-transparent" />
        <p className="text-sm text-[var(--body)]">Preparing your family pact...</p>
      </div>
    );
  }

  const childName = store.childName || 'Child';
  const curfewTime = store.curfewTime || '20:30';
  const formattedCurfew = formatCurfew12Hour(curfewTime);

  const displayClauses = agreement?.clauses || [];
  const childClauses = displayClauses.filter(
    (c) => c.party === CommitmentParty.CHILD
  );
  const parentClauses = displayClauses.filter(
    (c) => c.party === CommitmentParty.PARENT
  );

  const signedDateFormatted = agreement?.signedAt
    ? new Date(agreement.signedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Interactive Toolbar (Hidden on Print) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-[14px] border border-[var(--hairline)] bg-[var(--elevated)] p-4">
        <div className="flex items-center gap-3">
          <Link
            href="/devices"
            className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-[var(--body)] hover:text-[var(--ink)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Devices</span>
          </Link>
          <span className="text-[var(--hairline)]" aria-hidden="true">
            |
          </span>
          <span className="text-[13px] font-semibold text-[var(--spruce)]">
            Sealed · {signedDateFormatted}
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={handleOpenEnrollment}
            className="flex-1 sm:flex-none gap-1.5 min-h-[42px] rounded-[8px]"
          >
            <QrCode className="h-4 w-4 text-[var(--spruce)]" aria-hidden="true" />
            <span>Device QR setup</span>
          </Button>

          <Button
            size="sm"
            variant="forest"
            onClick={handlePrint}
            className="flex-1 sm:flex-none gap-1.5 min-h-[42px] rounded-[8px]"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            <span>Print fridge copy</span>
          </Button>
        </div>
      </div>

      {/* Archival 1-Page Refrigerator Treaty */}
      <article
        id="refrigerator-treaty"
        className="refrigerator-document rounded-[18px] border border-[#D8CEB8] bg-[#FAF7F2] p-7 sm:p-11 text-[var(--ink)]"
      >
        <header className="border-b-2 border-[var(--spruce)] pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <AlongsideLogo size="lg" showWordmark={false} priority />
              <div>
                <span className="block text-[12px] font-semibold text-[var(--amber)]">
                  Alongside Family Charter
                </span>
                <h1 className="font-serif-almanac text-[28px] sm:text-[34px] font-semibold leading-tight text-[var(--ink)]">
                  {agreement?.title || 'Family Tech Treaty'}
                </h1>
              </div>
            </div>

            <div className="sm:text-right sm:border-l sm:border-[#E6DEC9] sm:pl-4">
              <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--spruce)]">
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>Co-signed &amp; sealed</span>
              </div>
              <div className="text-[13px] font-medium text-[var(--ink)] mt-0.5">
                {signedDateFormatted}
              </div>
            </div>
          </div>

          <p className="mt-4 pt-3 border-t border-[#E6DEC9] text-[13.5px] text-[var(--body)]">
            A mutual agreement created together by{' '}
            <strong className="text-[var(--ink)]">{childName}</strong> and{' '}
            <strong className="text-[var(--ink)]">Parents / Guardians</strong>.
          </p>
        </header>

        {/* Highlighted Bedtime Dock Strip */}
        <div className="rounded-[12px] border border-[var(--spruce-border)] bg-[var(--spruce-soft)] p-4 mb-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--spruce)] text-white">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <span className="block text-[12px] font-semibold text-[var(--spruce)]">
                Nightly bedtime dock
              </span>
              <span className="font-serif-almanac text-[20px] font-semibold text-[var(--ink)] tabular-nums">
                {formattedCurfew} in the kitchen
              </span>
            </div>
          </div>
          <p className="text-[13px] text-[var(--body)] max-w-sm sm:text-right leading-relaxed">
            Devices plug in outside the bedroom at <strong className="text-[var(--ink)]">{formattedCurfew}</strong> so everyone wakes up rested.
          </p>
        </div>

        {/* Two-Party Promises Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 border-b border-[var(--spruce)] pb-2 text-[14px] font-semibold text-[var(--ink)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--spruce)]" aria-hidden="true" />
              <span>{childName}&apos;s promises</span>
            </h2>

            <div className="space-y-2.5">
              {childClauses.map((clause, idx) => (
                <div
                  key={clause.id || idx}
                  className="rounded-[10px] border border-[#E6DEC9] bg-white p-3.5 space-y-1"
                >
                  <div className="flex items-start gap-2 text-[13.5px] font-semibold text-[var(--ink)]">
                    <Check className="h-4 w-4 text-[var(--spruce)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{clause.title}</span>
                  </div>
                  <p className="text-[12.5px] text-[var(--body)] leading-relaxed pl-6">
                    {clause.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="flex items-center gap-2 border-b border-[var(--amber)] pb-2 text-[14px] font-semibold text-[var(--ink)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--amber)]" aria-hidden="true" />
              <span>Parents&apos; promises</span>
            </h2>

            <div className="space-y-2.5">
              {parentClauses.map((clause, idx) => (
                <div
                  key={clause.id || idx}
                  className="rounded-[10px] border border-[#E6DEC9] bg-white p-3.5 space-y-1"
                >
                  <div className="flex items-start gap-2 text-[13.5px] font-semibold text-[var(--ink)]">
                    <Check className="h-4 w-4 text-[var(--amber)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{clause.title}</span>
                  </div>
                  <p className="text-[12.5px] text-[var(--body)] leading-relaxed pl-6">
                    {clause.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Signatures Block */}
        <div className="border-t-2 border-[#E6DEC9] pt-6">
          <h3 className="text-[13px] font-semibold text-[var(--mute)] mb-4 text-center">
            Signed together on {signedDateFormatted}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-[12px] border border-[#E6DEC9] bg-white p-4 space-y-2">
              <span className="text-[12px] font-semibold text-[var(--amber)] block">
                Parent / Guardian
              </span>
              <div className="h-20 flex items-center justify-center border-b border-[#E6DEC9] p-1">
                {agreement?.parentSignature ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={agreement.parentSignature}
                    alt="Parent digital signature"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="font-serif-almanac italic text-sm text-[var(--mute)]">
                    Signed on Alongside
                  </span>
                )}
              </div>
              <div className="text-[12px] text-[var(--mute)]">
                Parent / Guardian · {signedDateFormatted}
              </div>
            </div>

            <div className="rounded-[12px] border border-[#E6DEC9] bg-white p-4 space-y-2">
              <span className="text-[12px] font-semibold text-[var(--spruce)] block">
                {childName}
              </span>
              <div className="h-20 flex items-center justify-center border-b border-[#E6DEC9] p-1">
                {agreement?.childSignature ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={agreement.childSignature}
                    alt="Child digital signature"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="font-serif-almanac italic text-sm text-[var(--mute)]">
                    Signed on Alongside
                  </span>
                )}
              </div>
              <div className="text-[12px] text-[var(--mute)]">
                {childName} · {signedDateFormatted}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 pt-4 border-t border-[#E6DEC9] text-[11.5px] text-[var(--mute)] flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>Alongside · Refrigerator Edition</span>
          <span>Hang somewhere shared, like the fridge or hallway charging spot.</span>
        </footer>
      </article>

      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        enrollmentToken={enrollmentToken}
        childName={childName}
        curfewTime={curfewTime}
        platform={DevicePlatform.APPLE_IOS}
      />
    </div>
  );
}
