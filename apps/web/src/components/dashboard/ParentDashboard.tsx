'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useChildren } from '@/hooks/useChildren';
import {
  type ChildDTO,
  RoadType,
  DevelopmentalTier,
} from '@alongside/shared';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChildOnboardingModal } from '@/components/children/ChildOnboardingModal';
import {
  Plus,
  Compass,
  Moon,
  Clock,
  Shield,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Smartphone,
  Watch,
  Tablet,
  CheckCircle2,
  User,
  Layers,
  MessageSquare,
  Lock,
} from 'lucide-react';

export interface ParentDashboardProps {
  initialChildId?: string;
}

function getTierBadge(tier: DevelopmentalTier) {
  switch (tier) {
    case DevelopmentalTier.TIER_1_AGES_8_9:
      return 'Tier 1 (Ages 8–9)';
    case DevelopmentalTier.TIER_2_AGES_10_11:
      return 'Tier 2 (Ages 10–11)';
    case DevelopmentalTier.TIER_3_AGES_12_13:
      return 'Tier 3 (Ages 12–13)';
    case DevelopmentalTier.TIER_4_AGES_14_PLUS:
      return 'Tier 4 (Ages 14+)';
    default:
      return 'Tier';
  }
}

export function ParentDashboard({ initialChildId }: ParentDashboardProps) {
  const router = useRouter();
  const { children, isLoading, refetchChildren } = useChildren();
  const [selectedChildId, setSelectedChildId] = React.useState<string | null>(initialChildId || null);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = React.useState(false);

  // Sync selected child with loaded children
  React.useEffect(() => {
    if (children.length > 0) {
      if (!selectedChildId || !children.some((c) => c.id === selectedChildId)) {
        const firstChild = children[0];
        if (firstChild) {
          setSelectedChildId(firstChild.id);
        }
      }
    } else {
      setSelectedChildId(null);
    }
  }, [children, selectedChildId]);

  const activeChild = children.find((c) => c.id === selectedChildId) || children[0] || null;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
        <p className="text-sm font-medium text-slate-600">Loading your parent dashboard...</p>
      </div>
    );
  }

  // Empty State: No child profiles registered yet
  if (!activeChild || children.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <Card className="border-dashed border-2 border-slate-300 bg-white/80 p-8 sm:p-12 text-center shadow-xs">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 mb-5">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome to the Alongside Parent Calm OS
          </h2>
          <p className="text-base text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
            Begin by onboarding your first child. We will calibrate our developmental blueprints to
            their exact age and digital situation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              size="lg"
              className="gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold min-h-[44px] px-8 shadow-sm"
              onClick={() => setIsOnboardingModalOpen(true)}
            >
              <Plus className="h-5 w-5" />
              Add First Child Profile
            </Button>
            <Link href="/children/new">
              <Button variant="outline" size="lg" className="min-h-[44px]">
                Full Onboarding Flow
              </Button>
            </Link>
          </div>

          <ChildOnboardingModal
            open={isOnboardingModalOpen}
            onOpenChange={setIsOnboardingModalOpen}
            onSuccess={(newChild) => {
              setIsOnboardingModalOpen(false);
              refetchChildren();
              setSelectedChildId(newChild.id);
            }}
          />
        </Card>
      </div>
    );
  }

  const isPreDevice = activeChild.roadType === RoadType.PRE_DEVICE;
  const hasAssessment =
    activeChild.latestAssessmentScore !== null &&
    activeChild.latestAssessmentScore !== undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar: Multi-child Switcher Tabs & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Family Operating System
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Developmental monitoring & bilateral agreements for your household.
          </p>
        </div>

        {/* Children Switcher & Add Child Button */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl">
            {children.map((child) => {
              const isSelected = child.id === activeChild.id;
              const childIsPre = child.roadType === RoadType.PRE_DEVICE;

              return (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => setSelectedChildId(child.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <User className="h-3.5 w-3.5 text-teal-600" />
                  <span>{child.name}</span>
                  <Badge
                    variant={childIsPre ? 'roadPre' : 'roadActive'}
                    className="text-[10px] px-1.5 py-0"
                  >
                    {childIsPre ? 'R1' : 'R2'}
                  </Badge>
                </button>
              );
            })}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsOnboardingModalOpen(true)}
            className="gap-1.5 text-xs min-h-[38px] shrink-0"
            title="Add another child"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add Child</span>
          </Button>
        </div>
      </div>

      {/* Active Child Profile Sub-Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl font-bold text-white shadow-xs ${
              isPreDevice ? 'bg-emerald-600' : 'bg-violet-600'
            }`}
          >
            {activeChild.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{activeChild.name}</h2>
              <Badge variant={isPreDevice ? 'roadPre' : 'roadActive'} className="text-xs">
                {isPreDevice ? 'Road 1: Pre-Device' : 'Road 2: Active-Device'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {getTierBadge(activeChild.developmentalTier)}
              </Badge>
            </div>
            <span className="text-xs text-slate-500">
              Age {activeChild.age} • {activeChild.schoolGrade || 'Grade unassigned'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPreDevice ? (
            <Link href={`/children/${activeChild.id}/readiness`}>
              <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                <Compass className="h-3.5 w-3.5" />
                {hasAssessment ? 'Retake Readiness' : 'Start Readiness Assessment'}
              </Button>
            </Link>
          ) : (
            <Link href={`/agreements/new?childId=${activeChild.id}`}>
              <Button size="sm" className="gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs">
                <FileCheck2 className="h-3.5 w-3.5" />
                Review Family Treaty
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROAD 1 VIEW: PRE-DEVICE PREPARATION & READINESS                           */}
      {/* ========================================================================= */}
      {isPreDevice && (
        <div className="space-y-8">
          {/* Hero Card: 10-Dimension Readiness Maturity Status */}
          <Card className="border-emerald-200/90 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 shadow-sm overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Badge variant="roadPre" className="text-xs">
                  Road 1 Milestone
                </Badge>
                <span className="text-xs text-emerald-800 font-medium">Pre-Unboxing Protocol</span>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900">
                First-Phone Readiness Assessment
              </CardTitle>
              <CardDescription className="text-sm text-slate-600 max-w-2xl">
                Before purchasing or handing over a personal smartphone, evaluate {activeChild.name}
                &apos;s impulse control, bedtime habits, and online safety instincts across 10
                clinical dimensions.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {hasAssessment ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl border border-emerald-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 text-2xl font-black shrink-0">
                      {activeChild.latestAssessmentScore}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900">
                          Overall Readiness Score: {activeChild.latestAssessmentScore}/100
                        </span>
                        <Badge
                          variant={activeChild.latestAssessmentScore! >= 75 ? 'success' : 'accent'}
                          className="text-[10px]"
                        >
                          {activeChild.latestAssessmentScore! >= 75
                            ? 'Ready for Bilateral Phone'
                            : 'Scaffolding Advised'}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">
                        {activeChild.latestAssessmentScore! >= 75
                          ? `${activeChild.name} demonstrated solid digital self-regulation and online safety awareness.`
                          : 'Specific dimensions (bedtime docking or impulse control) require structured pre-device coaching.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                      href={`/children/${activeChild.id}/readiness`}
                      className="w-full sm:w-auto"
                    >
                      <Button className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 gap-1.5 text-xs">
                        View Detailed Report
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-emerald-300 bg-emerald-50/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">
                        Readiness Assessment Pending (0 / 10 Dimensions Completed)
                      </h4>
                      <p className="text-xs text-emerald-800 mt-1 max-w-xl leading-relaxed">
                        Takes only 3 minutes. Evaluates executive function, screen transitions, and
                        digital trust to generate a personalized pre-unboxing agreement.
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/children/${activeChild.id}/readiness`}
                    className="w-full sm:w-auto shrink-0"
                  >
                    <Button className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold gap-2 shadow-sm min-h-[44px]">
                      Start 10-Dimension Assessment
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Bridge Device Step-Ladder Guide (4 Progressive Stages) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-emerald-600" />
                    The Bridge Device Step-Ladder Protocol
                  </h3>
                  <span className="text-xs text-slate-500">Gradual digital autonomy</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {/* Step 1: Living Room Shared Tablet */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase text-emerald-700 tracking-wider">
                        Stage 1
                      </span>
                      <Tablet className="h-4 w-4 text-slate-400" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Family Shared Tablet</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Used exclusively in high-visibility common areas. No bedroom use permitted.
                    </p>
                  </div>

                  {/* Step 2: Audio & GPS Watch */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase text-emerald-700 tracking-wider">
                        Stage 2
                      </span>
                      <Watch className="h-4 w-4 text-slate-400" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">GPS & Audio Watch</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Allows voice calling and location tracking without web browsers or social feeds.
                    </p>
                  </div>

                  {/* Step 3: Feature / Dumb Phone */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase text-emerald-700 tracking-wider">
                        Stage 3
                      </span>
                      <Smartphone className="h-4 w-4 text-slate-400" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Feature / Minimal Phone</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Basic SMS and navigation without algorithmic recommendation loops.
                    </p>
                  </div>

                  {/* Step 4: Bilateral Smartphone */}
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50/40 p-4 space-y-2 ring-1 ring-emerald-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider">
                        Stage 4: Milestone
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Bilateral Smartphone</h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Full device unlocked under an agreed Day-1 Family Pact and bedtime curfews.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pre-Unboxing Charter Callout */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-teal-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Day-1 Pre-Unboxing Family Charter
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 max-w-xl">
                    Co-sign bilateral commitments before the smartphone box is ever opened. When rules
                    are co-created before unboxing, compliance is 300% higher.
                  </p>
                </div>
                <Link
                  href={`/agreements/new?childId=${activeChild.id}&type=PRE_UNBOXING`}
                  className="w-full sm:w-auto shrink-0"
                >
                  <Button variant="outline" size="sm" className="w-full sm:w-auto gap-1 text-xs font-semibold">
                    Draft Pre-Unboxing Charter
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ROAD 2 VIEW: ACTIVE-DEVICE GOVERNANCE & SLEEP RESTORATION                 */}
      {/* ========================================================================= */}
      {!isPreDevice && (
        <div className="space-y-8">
          {/* Hero Card: 8:30 PM Bedtime Curfew & MDM Lockout Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: 8:30 PM Bedtime Curfew Lockout Card */}
            <Card className="lg:col-span-2 border-violet-200/90 bg-gradient-to-br from-violet-50/60 via-white to-slate-50 shadow-sm overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge variant="roadActive" className="text-xs">
                    Road 2 Priority
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-800">
                    <Clock className="h-3.5 w-3.5" />
                    Active Nightly Curfew: 8:30 PM
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900">
                  Bedtime Curfew & Neutral Device Lockout
                </CardTitle>
                <CardDescription className="text-sm text-slate-600 leading-relaxed">
                  Screen battles at bedtime trigger cortisol spikes that disrupt sleep. Our MDM profile
                  locks devices automatically at 8:30 PM, letting technology be the neutral enforcer.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="rounded-xl border border-violet-200 bg-white p-5 flex items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-800 shrink-0">
                      <Moon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          Nightly Bedroom Screen Curfew
                        </span>
                        <Badge variant="success" className="text-[10px] px-2 py-0">
                          Active Protocol
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Locks non-essential apps at 8:30 PM • Docks in family station by 9:00 PM.
                      </p>
                    </div>
                  </div>

                  <Link href={`/devices?childId=${activeChild.id}`}>
                    <Button variant="outline" size="sm" className="text-xs gap-1.5 shrink-0">
                      <Lock className="h-3.5 w-3.5" />
                      Curfew Settings
                    </Button>
                  </Link>
                </div>

                {/* Clinical Sleep Neurobiology Insight */}
                <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4 text-xs text-violet-950 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-violet-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Neurobiology Principle:</strong> Blue-spectrum light suppresses melatonin
                    by over 50% in adolescents. When devices lock automatically on schedule, parents
                    are relieved from being the nightly antagonist, preserving family harmony.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Right Col: Restorative Reset Family Treaty Status */}
            <Card className="border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <CardHeader className="pb-3">
                <Badge variant="secondary" className="w-fit text-xs font-semibold mb-1">
                  Bilateral Treaty
                </Badge>
                <CardTitle className="text-lg font-bold text-slate-900">
                  Restorative Reset Treaty
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 leading-relaxed">
                  A fresh, guilt-free reset agreement replacing past screen friction with mutual trust.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="rounded-lg bg-slate-50 p-3.5 space-y-2 border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Treaty Status:</span>
                    <span className="font-semibold text-slate-800">Ready to Negotiate</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Co-Signers:</span>
                    <span className="font-semibold text-slate-800">
                      Parent & {activeChild.name}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/agreements/new?childId=${activeChild.id}&preset=ROAD_2_SCAFFOLDED_PACT`}
                  className="w-full block"
                >
                  <Button className="w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold gap-1.5 text-xs min-h-[44px]">
                    <FileCheck2 className="h-4 w-4" />
                    Open Agreement Studio
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Sunday Culture Digest & Exploit Alerts Warning Card */}
          <Card className="border-amber-200/90 bg-gradient-to-r from-amber-50/50 via-white to-terracotta-50/30 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="accent" className="text-[10px] uppercase font-bold">
                      Weekly Exploit Early Warning
                    </Badge>
                    <span className="text-xs text-slate-500">Sunday Youth Digest</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Watch for &ldquo;Calculator Vault&rdquo; Apps & Ghost Accounts
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                    Tweens often install innocuous calculator or note apps with hidden pin codes to
                    store secret photo vaults. Use our non-accusatory conversation starter at dinner.
                  </p>
                </div>
              </div>

              <Link href="/digest" className="shrink-0 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full sm:w-auto gap-1 text-xs font-semibold">
                  View Full Digest
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* Shared Bottom Section: Academy & AI Child Advisor Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Parent Intelligence Academy Shortcut */}
        <Card className="border-slate-200 bg-white hover:border-teal-300 transition-colors shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold">
              <BookOpen className="h-4 w-4" />
              Parent Intelligence Academy
            </div>
            <CardTitle className="text-base font-bold text-slate-900">
              Tween Neurobiology: Adrenarche & The Peer Shift
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Why peer approval suddenly matters more than family praise at ages 10-12, and how to
              stay connected without hovering.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Link href="/academy">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                Explore Lesson Modules
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* 24/7 AI Child Advisor Shortcut */}
        <Card className="border-slate-200 bg-white hover:border-teal-300 transition-colors shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold">
              <MessageSquare className="h-4 w-4" />
              24/7 AI Child Advisor
            </div>
            <CardTitle className="text-base font-bold text-slate-900">
              Instant De-Escalation & Roleplay Simulator
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Facing an active screen blowout or bedtime argument? Get immediate, science-backed scripts
              to restore calm right now.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Link href={`/advisor?childId=${activeChild.id}`}>
              <Button size="sm" className="gap-1.5 text-xs bg-teal-600 hover:bg-teal-700">
                <Sparkles className="h-3.5 w-3.5" />
                Ask Advisor for Script
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <ChildOnboardingModal
        open={isOnboardingModalOpen}
        onOpenChange={setIsOnboardingModalOpen}
        onSuccess={(newChild) => {
          setIsOnboardingModalOpen(false);
          refetchChildren();
          setSelectedChildId(newChild.id);
        }}
      />
    </div>
  );
}
