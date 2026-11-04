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
  Compass,
  Tablet,
  Watch,
  Award,
  Layers,
  Flame,
  Search,
  MessageSquare,
} from 'lucide-react';
import {
  RoadType,
  DevicePlatform,
  DeviceProfileStatus,
  type ChildDTO,
  type SlangTermDTO,
  type ExploitAlertDTO,
} from '@alongside/shared';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { useChildren } from '@/hooks/useChildren';
import { usePactStore, formatCurfew12Hour } from '@/stores/usePactStore';
import { CurfewStatusBadge } from './CurfewStatusBadge';
import { EnrollmentModal } from './EnrollmentModal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { SlangCard } from '@/components/digest/SlangCard';
import { ExploitAlertCard } from '@/components/digest/ExploitAlertCard';
import { getLatestDigest } from '@/lib/api/digest';

export interface DevicesManagementViewProps {
  initialTab?: string;
}

/**
 * Auto-calibrates curfew recommendations based on child age:
 * - Kids under 9: 8:00 PM (20:00)
 * - Kids 9–12: 8:30 PM (20:30)
 * - Teens 13+: 9:30 PM (21:30)
 */
export function getRecommendedCurfew(age: number): {
  time24: string;
  time12: string;
  rationale: string;
} {
  if (age < 9) {
    return {
      time24: '20:00',
      time12: '8:00 PM',
      rationale: 'Elementary sleep protection (8:00 PM lock, 9-11 hours required)',
    };
  }
  if (age <= 12) {
    return {
      time24: '20:30',
      time12: '8:30 PM',
      rationale: 'Pre-teen melatonin release & un-docked bedroom protection (8:30 PM lock)',
    };
  }
  return {
    time24: '21:30',
    time12: '9:30 PM',
    rationale: 'Adolescent circadian rhythm & autonomous wind-down (9:30 PM lock)',
  };
}

export function DevicesManagementView({
  initialTab = 'curfews',
}: DevicesManagementViewProps) {
  const normalizedInitialTab = initialTab === 'digest' ? 'culture' : initialTab;
  const [activeTab, setActiveTab] = React.useState(normalizedInitialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab === 'digest' ? 'culture' : initialTab);
    }
  }, [initialTab]);

  const { children, activeChildId, setActiveChild } = useChildContextStore();
  const { children: queryChildren, isLoading } = useChildren();
  const pactStore = usePactStore();

  const [enrollmentModalOpen, setEnrollmentModalOpen] = React.useState(false);
  const [selectedChild, setSelectedChild] = React.useState<{
    id: string;
    name: string;
    curfew: string;
  } | null>(null);

  // Slang & Exploits state for Tab 4
  const [slangTerms, setSlangTerms] = React.useState<SlangTermDTO[]>([]);
  const [exploitAlerts, setExploitAlerts] = React.useState<ExploitAlertDTO[]>([]);
  const [digestLoading, setDigestLoading] = React.useState(false);

  React.useEffect(() => {
    let isCancelled = false;
    async function loadDigest() {
      try {
        setDigestLoading(true);
        const res = await getLatestDigest();
        if (!isCancelled && res?.digest) {
          setSlangTerms(res.digest.slangTerms || []);
          setExploitAlerts(res.digest.exploitAlerts || []);
        }
      } catch {
        // Fallback demo data
      } finally {
        if (!isCancelled) setDigestLoading(false);
      }
    }
    loadDigest();
    return () => {
      isCancelled = true;
    };
  }, []);

  const activeChild = selectActiveChild({ children, activeChildId });

  // Automatically tailor default tab based on active child's road type when no custom tab was requested
  React.useEffect(() => {
    if (activeChild?.roadType && initialTab === 'curfews') {
      if (activeChild.roadType === RoadType.PRE_DEVICE) {
        setActiveTab('readiness');
      } else if (activeChild.roadType === RoadType.ACTIVE_DEVICE) {
        setActiveTab('curfews');
      }
    }
  }, [activeChild?.id, activeChild?.roadType, initialTab]);

  const handleOpenEnrollment = (childId: string, childName: string, curfew = '20:30') => {
    setSelectedChild({
      id: childId,
      name: childName,
      curfew,
    });
    setEnrollmentModalOpen(true);
  };

  const hasAssessment =
    activeChild?.latestAssessmentScore !== null &&
    activeChild?.latestAssessmentScore !== undefined;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-600 text-white shadow-xs">
              <Smartphone className="h-3.5 w-3.5" />
            </span>
            <Badge variant="roadActive" className="text-[10px]">
              Modern World & Devices Hub
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Devices, Pacts & Youth Culture
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Readiness diagnostic scoring, bilateral family media treaties, automated 8:30 PM curfews, and Sunday culture intel.
          </p>
        </div>

        <Link href="/pacts/builder">
          <Button className="min-h-[44px] gap-2 text-xs bg-violet-600 hover:bg-violet-700 shadow-sm self-start sm:self-auto font-semibold">
            <FileCheck2 className="h-4 w-4" />
            Launch Pact Wizard
          </Button>
        </Link>
      </div>

      {/* 4 Canonical Hub Tabs */}
      <Tabs defaultValue={normalizedInitialTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto no-scrollbar h-auto p-1.5 bg-slate-100 rounded-2xl gap-1">
          <TabsTrigger
            value="readiness"
            className="min-h-[40px] px-4 py-2 text-xs font-semibold gap-1.5 rounded-xl shrink-0"
          >
            <Compass className="h-3.5 w-3.5 text-emerald-600" />
            <span>1. Thinking About a Device?</span>
          </TabsTrigger>
          <TabsTrigger
            value="pacts"
            className="min-h-[40px] px-4 py-2 text-xs font-semibold gap-1.5 rounded-xl shrink-0"
          >
            <FileCheck2 className="h-3.5 w-3.5 text-teal-600" />
            <span>2. Bilateral Family Pact</span>
          </TabsTrigger>
          <TabsTrigger
            value="curfews"
            className="min-h-[40px] px-4 py-2 text-xs font-semibold gap-1.5 rounded-xl shrink-0"
          >
            <Lock className="h-3.5 w-3.5 text-violet-600" />
            <span>3. Active Device Curfews</span>
          </TabsTrigger>
          <TabsTrigger
            value="culture"
            className="min-h-[40px] px-4 py-2 text-xs font-semibold gap-1.5 rounded-xl shrink-0"
          >
            <Flame className="h-3.5 w-3.5 text-amber-600" />
            <span>4. Youth Culture & Slang Radar</span>
          </TabsTrigger>
        </TabsList>

        {/* ========================================================================= */}
        {/* TAB 1: THINKING ABOUT A DEVICE? (READINESS DIAGNOSTIC & BRIDGE DEVICES)  */}
        {/* ========================================================================= */}
        <TabsContent value="readiness" className="space-y-6">
          <Card className="border-emerald-200/90 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-emerald-100">
              <div className="flex items-center justify-between">
                <Badge variant="roadPre" className="text-xs">
                  Pre-Unboxing Protocol
                </Badge>
                <span className="text-xs text-emerald-800 font-semibold">10 Clinical Dimensions</span>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">
                First-Phone Readiness Pathway: Not &ldquo;No&rdquo;, but &ldquo;When&rdquo;
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Before purchasing or handing over a personal smartphone, objectively evaluate impulse control, bedtime habits, and online safety awareness without conflict.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6">
              {/* Early Childhood Stage Screen Guidance for ages 0-6 */}
              {activeChild && activeChild.age <= 6 && (
                <div className="rounded-2xl border border-teal-200/90 bg-teal-50/60 p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shrink-0 shadow-2xs">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-teal-950">
                      Preschool &amp; Early Childhood Screen Balance (Ages 0–6)
                    </h4>
                    <p className="text-xs text-teal-900 leading-relaxed max-w-3xl">
                      Pediatric guidelines (AAP) recommend zero solo screen time under 2 years, and high-quality co-viewing limited to 1 hour daily for ages 2–5. Personal smartphones and social media are not developmentally recommended at this stage.
                    </p>
                  </div>
                </div>
              )}

              {/* Readiness Score Status */}
              {activeChild && hasAssessment ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-900 text-2xl font-black shrink-0">
                      {activeChild.latestAssessmentScore}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900">
                          {activeChild.name}&apos;s Readiness Score: {activeChild.latestAssessmentScore}/100
                        </span>
                        <Badge
                          variant={activeChild.latestAssessmentScore! >= 75 ? 'success' : 'accent'}
                          className="text-[10px]"
                        >
                          {activeChild.latestAssessmentScore! >= 75
                            ? 'Ready for Bilateral Phone'
                            : 'Scaffolding Recommended'}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
                        {activeChild.latestAssessmentScore! >= 75
                          ? `${activeChild.name} demonstrates solid executive function and safe habits for a supervised smartphone.`
                          : 'Specific dimensions (bedtime docking, homework transitions) need pre-device scaffolding.'}
                      </p>
                    </div>
                  </div>

                  <Link href={`/children/${activeChild.id}/readiness`}>
                    <Button className="min-h-[44px] bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs gap-1.5 shadow-2xs">
                      <span>View 10-Dimension Report</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                      <Compass className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">
                        Readiness Assessment Pending
                      </h4>
                      <p className="text-xs text-emerald-800 mt-1 max-w-xl leading-relaxed">
                        Take the 10-dimension assessment (3 minutes) to evaluate impulse control, screen transitions, and social trustworthiness.
                      </p>
                    </div>
                  </div>

                  {activeChild && (
                    <Link href={`/children/${activeChild.id}/readiness`}>
                      <Button className="min-h-[44px] bg-emerald-700 hover:bg-emerald-800 text-white font-semibold gap-2 shadow-2xs text-xs">
                        <span>Start 10-Dimension Audit</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              )}

              {/* 4-Stage Bridge Device Ladder */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-emerald-600" />
                    The Bridge Device Autonomy Ladder (4 Stages)
                  </h3>
                  <span className="text-[11px] text-slate-400">Gradual digital independence</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-emerald-700">Stage 1</span>
                      <Tablet className="h-4 w-4 text-slate-400" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">Living Room Shared Tablet</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Used only in common areas. Zero bedroom access permitted.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-emerald-700">Stage 2</span>
                      <Watch className="h-4 w-4 text-slate-400" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">Calling & GPS Watch</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Voice calling & safety tracking with zero addictive social feeds.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-emerald-700">Stage 3</span>
                      <Smartphone className="h-4 w-4 text-slate-400" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">Minimalist Feature Phone</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      SMS and navigation without algorithmic recommendation loops.
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-300 bg-emerald-50/50 p-4 space-y-1.5 ring-1 ring-emerald-500/20 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-emerald-800">Stage 4: Milestone</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">Bilateral Smartphone</h4>
                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      Full smartphone unlocked under an agreed Day-1 Family Pact.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================================================= */}
        {/* TAB 2: BILATERAL FAMILY PACT (PACT-AS-CODE WIZARD & TREATY STUDIO)       */}
        {/* ========================================================================= */}
        <TabsContent value="pacts" className="space-y-6">
          <Card className="border-teal-200/90 bg-white shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs font-bold text-teal-800 border-teal-200 bg-teal-50">
                  Bilateral Treaty Studio
                </Badge>
                <span className="text-xs text-slate-500">Mutual Commitments</span>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">
                Co-Created Family Media Agreements
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When rules are negotiated bilaterally rather than handed down unilaterally, compliance is 300% higher and defiance disappears.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Child Commitments Card */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                    {activeChild?.name || 'Child'}&apos;s Commitments
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span>Docks phone at family charging station by 8:30 PM nightly.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span>Finishes homework and household chores before recreational screen time.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span>Zero disguised vault apps or secret accounts.</span>
                    </li>
                  </ul>
                </div>

                {/* Parent Commitments Card */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-teal-600" />
                    Parent&apos;s Commitments
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span>Zero stealth spyware reading personal text messages.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span>Device-free dinner table: parents put away work phones too.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span>No punitive confiscation when child reports troubling online encounters.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href={`/pacts/builder${activeChild ? `?childId=${activeChild.id}` : ''}`}>
                  <Button className="min-h-[44px] bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs gap-2 shadow-2xs">
                    <FileCheck2 className="h-4 w-4" />
                    <span>Open Agreement Builder & Sign</span>
                  </Button>
                </Link>

                <Link href={`/pacts/${pactStore.agreementId || 'current'}`}>
                  <Button variant="outline" className="min-h-[44px] text-xs font-semibold gap-1.5">
                    <span>View / Print Family Treaty (PDF)</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================================================= */}
        {/* TAB 3: ACTIVE DEVICE CURFEWS & MDM PROFILES                              */}
        {/* ========================================================================= */}
        <TabsContent value="curfews" className="space-y-6">
          {/* Hero Explainer Card */}
          <Card className="border-violet-200/90 bg-gradient-to-br from-violet-50/60 via-cream-50 to-purple-50/40 shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-violet-600" />
                    <h3 className="text-base font-bold text-slate-900">
                      How Neutral &ldquo;Pact-as-Code&rdquo; Eliminates Bedtime Screaming
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Adversarial phone confiscations trigger intense cortisol spikes. AlongSide translates your bilateral pact into an Apple iOS or Android Enterprise configuration profile. At 8:30 PM, the operating system neutrally pauses recreational apps. The phone locks itself—parents never play the villain.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="p-3 bg-white rounded-xl border border-violet-200 shadow-xs text-center">
                    <span className="block text-lg font-black text-violet-950">8:30 PM</span>
                    <span className="block text-[10px] text-violet-700 font-medium">Default Lock</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-xs text-center">
                    <span className="block text-lg font-black text-emerald-950">100%</span>
                    <span className="block text-[10px] text-emerald-700 font-medium">Parent Calls Active</span>
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
                <p className="text-xs text-slate-500 mb-3">No child profiles found in your household.</p>
                <Link href="/children/new">
                  <Button size="sm">Add Child Profile</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {children.map((child) => {
                  const isRoad1 = child.roadType === RoadType.PRE_DEVICE;
                  const recommendedCurfew = getRecommendedCurfew(child.age);
                  const effectiveCurfew = pactStore.curfewTime || recommendedCurfew.time24;

                  return (
                    <Card
                      key={child.id}
                      className="border-slate-200/90 hover:border-slate-300 transition-all shadow-xs"
                    >
                      <CardContent className="p-5 sm:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h3 className="text-lg font-bold text-slate-900">
                                {child.name}&apos;s Device Profile
                              </h3>
                              <Badge
                                variant={isRoad1 ? 'roadPre' : 'roadActive'}
                                className="text-[10px]"
                              >
                                {isRoad1 ? 'Road 1: Pre-Device' : 'Road 2: Active Governance'}
                              </Badge>
                              <span className="text-xs text-slate-500">
                                Age {child.age} • Grade {child.schoolGrade || 'N/A'}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <CurfewStatusBadge
                                status={DeviceProfileStatus.ACTIVE}
                                bedtimeCurfewTime={effectiveCurfew}
                                platform={DevicePlatform.APPLE_IOS}
                                tamperDetected={false}
                              />
                              <span className="text-[10px] font-bold text-violet-800 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
                                Calibrated ({recommendedCurfew.time12})
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenEnrollment(child.id, child.name, effectiveCurfew)}
                              className="min-h-[44px] w-full sm:w-auto gap-1.5 text-xs border-violet-200 text-violet-900 hover:bg-violet-50 font-semibold"
                            >
                              <QrCode className="h-4 w-4 text-violet-700" />
                              Scan QR Enrollment
                            </Button>

                            <Link href={`/pacts/builder?childId=${child.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="min-h-[44px] w-full sm:w-auto gap-1.5 text-xs font-semibold"
                              >
                                <FileCheck2 className="h-4 w-4 text-slate-600" />
                                Edit Curfew
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

          {/* Safety & Emergency Guarantee Note */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-slate-600">
              <span className="font-bold text-slate-900 block">
                Cryptographic Safety & Emergency Guarantee
              </span>
              <p className="text-[11px] leading-relaxed">
                Every Alongside device profile is cryptographically signed with Apple PKCS#7 certificates. If a profile is removed in device settings, parents receive an immediate tamper webhook. Crucially, <strong>emergency calls to parents and 911 are never locked</strong>.
              </p>
            </div>
          </div>
        </TabsContent>

        {/* ========================================================================= */}
        {/* TAB 4: YOUTH CULTURE & SLANG RADAR                                       */}
        {/* ========================================================================= */}
        <TabsContent value="culture" className="space-y-6">
          <Card className="border-amber-200/90 bg-gradient-to-r from-amber-50/40 via-white to-transparent shadow-xs">
            <CardHeader className="pb-3 border-b border-amber-100">
              <div className="flex items-center justify-between">
                <Badge variant="accent" className="text-[10px] font-bold uppercase">
                  Youth Culture & Slang Radar
                </Badge>
                <Link
                  href="/devices?tab=digest"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  <span>Culture Radar Direct</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">
                Youth Culture Intel, Slang Decoders & Exploit Warnings
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Stay effortlessly informed on viral tween memes, secret calculator vault bypasses, and conversational dinner scripts.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6">
              {/* Sunday Dinner Table Conversation Starter */}
              <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-teal-950 text-xs sm:text-sm">
                  <MessageSquare className="h-4 w-4 text-teal-700" />
                  <span>Sunday Dinner Table Conversation Starter</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed pl-6">
                  &ldquo;If an app has a secret calculator code, does that count as healthy personal privacy or covert secrecy? What is the difference between keeping a personal diary vs. hiding an encrypted vault?&rdquo;
                </p>
                <p className="text-[11px] text-teal-800/80 pl-6 font-medium">
                  Tip: Ask with genuine curiosity during Sunday dinner without accusatory questioning or confiscating devices.
                </p>
              </div>
              {/* Exploit Alerts Row */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Active Exploit Early Warnings
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="destructive" className="text-[10px]">
                        Severity: High
                      </Badge>
                      <span className="text-[10px] text-slate-500 font-medium">Bypass App</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Disguised &ldquo;Calculator Vault&rdquo; Apps
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Functional calculator apps that open a secret encrypted photo vault when a specific passcode is entered. Use our non-accusatory Sunday dinner script to discuss healthy privacy vs. secrecy.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px]">
                        Severity: Medium
                      </Badge>
                      <span className="text-[10px] text-slate-500 font-medium">Account Intel</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Ghost & Spam (Finsta) Accounts
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Secondary accounts created to escape parental or algorithmic scrutiny. Frame the conversation around algorithmic dopamine exhaustion rather than spying.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slang Decoders Grid */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-amber-600" />
                  Trending Tween & Teen Slang Decoders
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">&ldquo;Rizz&rdquo;</h4>
                      <Badge variant="outline" className="text-[9px] bg-emerald-50 text-emerald-800 border-emerald-200">
                        Harmless
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Short for charisma. Ability to charm or flirt effortlessly.
                    </p>
                    <span className="text-[10px] text-slate-400 block pt-1 italic">
                      Example: &ldquo;He&apos;s got unspoken rizz.&rdquo;
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">&ldquo;Sigma&rdquo;</h4>
                      <Badge variant="outline" className="text-[9px] bg-amber-50 text-amber-800 border-amber-200">
                        Watch Context
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A self-reliant, cool lone wolf. Often used ironically, but can sometimes echo &ldquo;alpha male&rdquo; internet subcultures.
                    </p>
                    <span className="text-[10px] text-slate-400 block pt-1 italic">
                      Example: &ldquo;He is a total sigma grindset.&rdquo;
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">&ldquo;Fanum Tax&rdquo;</h4>
                      <Badge variant="outline" className="text-[9px] bg-emerald-50 text-emerald-800 border-emerald-200">
                        Playful Meme
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Stealing a bite of a friend&apos;s food. Originates from streamer Fanum who humorously &ldquo;taxed&rdquo; Kai Cenat&apos;s snacks.
                    </p>
                    <span className="text-[10px] text-slate-400 block pt-1 italic">
                      Example: &ldquo;Give me a french fry, that&apos;s the fanum tax.&rdquo;
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
