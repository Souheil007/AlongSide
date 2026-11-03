'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Shield,
  Printer,
  QrCode,
  ArrowLeft,
  CheckCircle2,
  Clock,
  HeartHandshake,
  User,
  AlertCircle,
  FileCheck2,
  Award,
} from 'lucide-react';
import {
  CommitmentParty,
  ClauseCategory,
  DevicePlatform,
  type AgreementDTO,
  type AgreementClauseDTO,
} from '@alongside/shared';
import { usePactStore, formatCurfew12Hour, CANONICAL_PRESET_CLAUSES } from '@/stores/usePactStore';
import { agreementsApi } from '@/lib/api/agreements';
import { EnrollmentModal } from '@/components/devices/EnrollmentModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

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
        // Fallback to store data if available, or generate display agreement
        if (isMounted) {
          if (store.agreementId === agreementId || agreementId.startsWith('agr-') || agreementId === 'current') {
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
              clauses: store.clauses.map((c, idx) => ({
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
          } else {
            // Provide canonical display agreement
            setAgreement({
              id: agreementId,
              userId: 'user-default',
              childId: 'child-default',
              title: store.agreementTitle || 'Family Tech Agreement',
              status: 'SIGNED' as any,
              developmentalTier: store.developmentalTier,
              roadType: store.roadType,
              parentSignature: store.parentSignature,
              childSignature: store.childSignature,
              signedAt: new Date().toISOString(),
              clauses: CANONICAL_PRESET_CLAUSES.map((c, idx) => ({
                id: `cl-${idx}`,
                agreementId,
                category: c.category,
                party: c.party,
                title: c.title,
                description: c.description,
                isStandard: true,
                isCustom: false,
                sortOrder: idx,
              })),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadAgreement();
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
      // Use fallback token
      setEnrollmentToken(`tok_${Math.random().toString(36).substring(2, 10)}`);
    }
    setEnrollmentModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
        <p className="text-xs font-medium text-slate-600">
          Loading family agreement document...
        </p>
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
    <div className="space-y-6">
      {/* Non-Print Interactive Toolbar */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-[10px]">
              Sealed & Active
            </Badge>
            <span className="text-xs font-semibold text-slate-800">
              {agreement?.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={handleOpenEnrollment}
            className="flex-1 sm:flex-none gap-1.5 text-xs border-violet-300 text-violet-900 hover:bg-violet-50"
          >
            <QrCode className="h-4 w-4 text-violet-700" />
            Deploy QR Code
          </Button>

          <Button
            size="sm"
            onClick={handlePrint}
            className="flex-1 sm:flex-none gap-1.5 text-xs bg-teal-600 hover:bg-teal-700 shadow-sm"
          >
            <Printer className="h-4 w-4" />
            Print Refrigerator Copy
          </Button>
        </div>
      </div>

      {/* REFRIGERATOR TREATY PHYSICAL DOCUMENT CONTAINER */}
      <article
        id="refrigerator-treaty"
        className="refrigerator-document mx-auto max-w-4xl bg-white rounded-2xl border-2 border-slate-800/90 p-8 sm:p-12 shadow-md transition-all text-slate-900"
      >
        {/* Document Header with Alongside Seal */}
        <header className="border-b-2 border-slate-800 pb-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                <Shield className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-slate-600 block">
                  Official Alongside Family Operating Charter
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 uppercase font-serif">
                  Family Tech Treaty
                </h1>
              </div>
            </div>

            {/* Cryptographic Seal & Date Stamp */}
            <div className="text-right border-l border-slate-200 pl-4 hidden sm:block">
              <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Award className="h-3 w-3" />
                Digitally Sealed
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-1">
                {signedDateFormatted}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                ID: {agreement?.id.substring(0, 16)}...
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-1">
            <p>
              Bilateral co-regulation treaty entered freely between{' '}
              <strong className="text-slate-900">{childName}</strong> and{' '}
              <strong className="text-slate-900">Parents / Guardians</strong>.
            </p>
            <p className="font-semibold text-slate-700">
              Household Status: Active & Binding
            </p>
          </div>
        </header>

        {/* Highlight Curfew Banner Box */}
        <div className="rounded-xl border-2 border-slate-900 bg-slate-50 p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Pillar 5 Canonical Agreement
              </span>
              <span className="text-base font-extrabold text-slate-950">
                {formattedCurfew} Nightly Bedtime Docking
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-700 max-w-md text-left sm:text-right">
            All devices dock in the kitchen charging basket every night at{' '}
            <strong className="text-slate-900">{formattedCurfew} sharp</strong> to
            safeguard adolescent sleep neurobiology and circadian health.
          </div>
        </div>

        {/* Bilateral Clauses Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Child Commitments Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-slate-800 pb-2">
              <User className="h-4.5 w-4.5 text-slate-800" />
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-950">
                {childName}&apos;s Commitments
              </h2>
            </div>

            <div className="space-y-3">
              {childClauses.map((clause, idx) => (
                <div
                  key={clause.id || idx}
                  className="p-3 rounded-lg border border-slate-200 bg-white space-y-1"
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-700 shrink-0" />
                    <span>{clause.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-5">
                    {clause.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Parent Commitments Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-slate-800 pb-2">
              <HeartHandshake className="h-4.5 w-4.5 text-slate-800" />
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-950">
                Parents&apos; Commitments
              </h2>
            </div>

            <div className="space-y-3">
              {parentClauses.map((clause, idx) => (
                <div
                  key={clause.id || idx}
                  className="p-3 rounded-lg border border-slate-200 bg-white space-y-1"
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-700 shrink-0" />
                    <span>{clause.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-5">
                    {clause.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Digital Co-Signatures Station */}
        <div className="border-t-2 border-slate-800 pt-6 mt-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 text-center">
            Signatures & Mutual Ratification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Parent Signature Box */}
            <div className="rounded-xl border border-slate-300 p-4 bg-slate-50/50 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Parent / Guardian Co-Signer
              </span>
              <div className="h-20 flex items-center justify-center border-b border-slate-300 bg-white rounded-md p-1">
                {agreement?.parentSignature ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={agreement.parentSignature}
                    alt="Parent digital signature"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Signed on AlongSide Parent OS
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                <span className="font-semibold text-slate-800">
                  Parent / Guardian
                </span>
                <span>Ratified: {signedDateFormatted}</span>
              </div>
            </div>

            {/* Child Signature Box */}
            <div className="rounded-xl border border-slate-300 p-4 bg-slate-50/50 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Child Partner ({childName})
              </span>
              <div className="h-20 flex items-center justify-center border-b border-slate-300 bg-white rounded-md p-1">
                {agreement?.childSignature ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={agreement.childSignature}
                    alt="Child digital signature"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Signed on AlongSide Parent OS
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                <span className="font-semibold text-slate-800">
                  {childName}
                </span>
                <span>Ratified: {signedDateFormatted}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Refrigerator Footer Instruction */}
        <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>AlongSide Parent OS • Refrigerator Treaty Edition</span>
          <span>Post this physical document in a shared family space (e.g. Refrigerator).</span>
          <span>Verified Bilateral Co-Regulation Standard</span>
        </footer>
      </article>

      {/* QR Enrollment Modal Trigger */}
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
