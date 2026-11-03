'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  QrCode,
  ShieldCheck,
  Lock,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  FileCheck2,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { RoadType, DevicePlatform, DeviceProfileStatus } from '@alongside/shared';
import { useChildren } from '@/hooks/useChildren';
import { usePactStore, formatCurfew12Hour } from '@/stores/usePactStore';
import { CurfewStatusBadge } from './CurfewStatusBadge';
import { EnrollmentModal } from './EnrollmentModal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function DevicesManagementView() {
  const { children, isLoading } = useChildren();
  const store = usePactStore();

  const [enrollmentModalOpen, setEnrollmentModalOpen] = React.useState(false);
  const [selectedChild, setSelectedChild] = React.useState<{
    id: string;
    name: string;
    curfew: string;
  } | null>(null);

  const handleOpenEnrollment = (childId: string, childName: string, curfew = '20:30') => {
    setSelectedChild({
      id: childId,
      name: childName,
      curfew,
    });
    setEnrollmentModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
        <p className="text-sm font-medium text-slate-600">
          Loading device profiles and curfew schedules...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-600 text-white shadow-xs">
              <Smartphone className="h-3.5 w-3.5" />
            </span>
            <Badge variant="roadActive" className="text-[10px]">
              Road 2 Pact-as-Code
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Enrolled Family Devices & Automated Curfews
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage single-scan Apple iOS and Android Enterprise profiles enforcing the canonical 8:30 PM bedtime lock.
          </p>
        </div>

        <Link href="/pacts/builder">
          <Button className="gap-2 text-xs bg-violet-600 hover:bg-violet-700 shadow-sm self-start sm:self-auto">
            <FileCheck2 className="h-4 w-4" />
            New Family Pact Wizard
          </Button>
        </Link>
      </div>

      {/* Hero Explainer Card */}
      <Card className="border-violet-200/90 bg-gradient-to-br from-violet-50/60 via-cream-50 to-purple-50/40 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-violet-600" />
                <h3 className="text-base font-bold text-slate-900">
                  How Neutral &ldquo;Pact-as-Code&rdquo; Eliminates Bedtime Screaming
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adversarial device confiscations trigger intense dopamine drops and resentment. Alongside translates your bilateral agreement directly into an Apple or Android configuration profile. At 8:30 PM, the operating system neutrally pauses recreational apps. The phone locks itself—parents never have to play the villain.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="p-3 bg-white rounded-xl border border-violet-200 shadow-xs text-center">
                <span className="block text-lg font-black text-violet-950">
                  8:30 PM
                </span>
                <span className="block text-[10px] text-violet-700 font-medium">
                  Default Lock
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-xs text-center">
                <span className="block text-lg font-black text-emerald-950">
                  100%
                </span>
                <span className="block text-[10px] text-emerald-700 font-medium">
                  Parent Calls Active
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrolled Devices List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Family Devices ({children.length})
          </h2>
          <span className="text-xs text-slate-500">
            Automatic Heartbeat & Tamper Verification
          </span>
        </div>

        {children.length === 0 ? (
          <Card className="p-8 text-center border-dashed border-slate-300">
            <p className="text-xs text-slate-500 mb-3">
              No children profiles found in your family OS.
            </p>
            <Link href="/children/new">
              <Button size="sm">Add Child Profile</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {children.map((child) => {
              const isRoad1 = child.roadType === RoadType.PRE_DEVICE;
              const curfew = store.curfewTime || '20:30';
              const formattedCurfew = formatCurfew12Hour(curfew);

              return (
                <Card
                  key={child.id}
                  className="border-slate-200/90 hover:border-slate-300 transition-all shadow-xs"
                >
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      {/* Left: Child & Device Info */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-lg font-bold text-slate-900">
                            {child.name}&apos;s Device
                          </h3>
                          <Badge
                            variant={isRoad1 ? 'roadPre' : 'roadActive'}
                            className="text-[10px]"
                          >
                            {isRoad1
                              ? 'Road 1: Pre-Device'
                              : 'Road 2: Active Governance'}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            Age {child.age} • Grade {child.schoolGrade || 'N/A'}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="pt-1">
                          <CurfewStatusBadge
                            status={DeviceProfileStatus.ACTIVE}
                            bedtimeCurfewTime={curfew}
                            platform={DevicePlatform.APPLE_IOS}
                            tamperDetected={false}
                          />
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleOpenEnrollment(child.id, child.name, curfew)
                          }
                          className="w-full sm:w-auto gap-1.5 text-xs border-violet-200 text-violet-900 hover:bg-violet-50"
                        >
                          <QrCode className="h-3.5 w-3.5 text-violet-700" />
                          Scan QR Enrollment
                        </Button>

                        <Link href={`/pacts/builder?childId=${child.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto gap-1.5 text-xs"
                          >
                            <FileCheck2 className="h-3.5 w-3.5 text-slate-600" />
                            Edit Agreement
                          </Button>
                        </Link>

                        <Link href={`/pacts/${store.agreementId || 'current'}`}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full sm:w-auto text-xs text-teal-700 hover:bg-teal-50"
                          >
                            Print Treaty
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Safety & Tamper Safeguard Note */}
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-600">
          <span className="font-bold text-slate-900 block">
            Cryptographic Safety & Emergency Guarantee
          </span>
          <p className="text-[11px] leading-relaxed">
            Every AlongSide device profile is cryptographically signed using Apple PKCS#7 certificates. If a child removes the profile in device settings, an automated tamper webhook notifies parents immediately. Furthermore, <strong>emergency phone calls to parents and 911 are never locked</strong>.
          </p>
        </div>
      </div>

      {/* QR Code Enrollment Modal */}
      {selectedChild && (
        <EnrollmentModal
          isOpen={enrollmentModalOpen}
          onClose={() => setEnrollmentModalOpen(false)}
          enrollmentToken={`tok_${selectedChild.id.substring(0, 8)}`}
          childName={selectedChild.name}
          curfewTime={selectedChild.curfew}
          platform={DevicePlatform.APPLE_IOS}
        />
      )}
    </div>
  );
}
