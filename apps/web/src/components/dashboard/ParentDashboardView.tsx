'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Compass,
  Smartphone,
  ShieldCheck,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  MessageSquare,
  AlertTriangle,
  Award,
  CheckCircle2,
  Calendar,
  Lock,
  FileCheck2,
  Users,
} from 'lucide-react';
import {
  RoadType,
  DevelopmentalTier,
  type ChildDTO,
} from '@alongside/shared';
import { useAuth } from '@/hooks/useAuth';
import { useChildren } from '@/hooks/useChildren';
import { useChildContextStore, selectActiveChild } from '@/stores/useChildContextStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { ChildOnboardingModal } from '@/components/children/ChildOnboardingModal';

export function ParentDashboardView() {
  const { user } = useAuth();
  const { children: storeChildren, activeChildId, setActiveChild } = useChildContextStore();
  const { children: queryChildren, isLoading } = useChildren();
  const children = storeChildren.length > 0 ? storeChildren : queryChildren;
  const activeChild = selectActiveChild({ children, activeChildId });
  const [onboardingOpen, setOnboardingOpen] = React.useState(false);

  const selectedChildId = activeChild?.id ?? null;
  const setSelectedChildId = (id: string) => setActiveChild(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
        <p className="text-sm font-medium text-slate-600">
          Loading your family operating system...
        </p>
      </div>
    );
  }

  // Zero-State: When no children exist
  if (children.length === 0) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 py-6">
        <div className="text-center space-y-3">
          <Badge variant="default" className="text-xs px-3 py-1">
            Welcome to AlongSide
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Welcome, {user?.fullName || 'Parent'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            AlongSide replaces daily screen battles with calm developmental science, bilateral family treaties, and neutral automated curfews.
          </p>
        </div>

        <Card className="border-teal-200/80 bg-gradient-to-br from-white via-[#FAF9F5] to-teal-50/30 p-6 sm:p-8 text-center space-y-6 shadow-md">
          <div className="h-16 w-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-sm">
            <Users className="h-8 w-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-slate-900">
              Personalize with Your First Child
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every child develops at their own pace. Add your child to activate their customized Road Fork (Pre-Device Preparation vs. Active-Device Governance).
            </p>
          </div>

          <div className="pt-2">
            <Button
              size="lg"
              onClick={() => setOnboardingOpen(true)}
              className="gap-2 shadow-sm font-semibold"
            >
              <Plus className="h-5 w-5" />
              Add Child Profile & Select Road
            </Button>
          </div>

          {/* Quick Preview of the 2 Roads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-6 border-t border-slate-200/70">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
              <Badge variant="roadPre" className="text-[11px]">
                Road 1: Pre-Device
              </Badge>
              <h3 className="text-sm font-bold text-slate-900">
                No Personal Smartphone Yet
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Objective 10-dimension readiness scoring (0–100), bridge devices, and pre-unboxing Day 1 charters.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
              <Badge variant="roadActive" className="text-[11px]">
                Road 2: Active-Device
              </Badge>
              <h3 className="text-sm font-bold text-slate-900">
                Already Has a Smartphone
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Restorative digital resets, automated 8:30 PM bedtime locking, and weekly exploit alerts without spyware.
              </p>
            </div>
          </div>
        </Card>

        <ChildOnboardingModal
          open={onboardingOpen}
          onOpenChange={setOnboardingOpen}
        />
      </div>
    );
  }

  const isRoad1 = activeChild?.roadType === RoadType.PRE_DEVICE;
  const isRoad2 = activeChild?.roadType === RoadType.ACTIVE_DEVICE;

  const tierNameMap: Record<DevelopmentalTier, string> = {
    [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]: 'Tier 0: Ages 0–3 (Sensory & Motor)',
    [DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6]: 'Tier 1: Ages 4–6 (Imagination & Play)',
    [DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]: 'Tier 2: Ages 7–9 (Early Concrete Operations)',
    [DevelopmentalTier.TIER_3_PRE_TEEN_10_12]: 'Tier 3: Ages 10–12 (Peer Social & Pubertal)',
    [DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]: 'Tier 4: Ages 13–15 (Circadian & Identity)',
    [DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]: 'Tier 5: Ages 16–18 (High Autonomy & Digital Agency)',
    [DevelopmentalTier.TIER_1_AGES_8_9]: 'Tier 1: Ages 8–9 (Impulse Centers)',
    [DevelopmentalTier.TIER_2_AGES_10_11]: 'Tier 2: Ages 10–11 (Peer Shift)',
    [DevelopmentalTier.TIER_3_AGES_12_13]: 'Tier 3: Ages 12–13 (Circadian Shift)',
    [DevelopmentalTier.TIER_4_AGES_14_PLUS]: 'Tier 4: Ages 14+ (High Autonomy)',
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Child Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Family Operating System
          </h1>
          <p className="text-slate-600 text-sm mt-0.5">
            Empathetic guidance and automated device boundaries for {user?.fullName || 'your family'}.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOnboardingOpen(true)}
            className="gap-1.5 text-xs text-slate-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Another Child
          </Button>
        </div>
      </div>

      {/* Child Switcher Tabs / Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {children.map((child) => {
          const isSelected = child.id === activeChild?.id;
          const childIsRoad1 = child.roadType === RoadType.PRE_DEVICE;

          return (
            <button
              key={child.id}
              type="button"
              onClick={() => setSelectedChildId(child.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-left transition-all shrink-0 min-h-[44px] ${
                isSelected
                  ? 'border-teal-600 bg-white shadow-sm ring-1 ring-teal-600'
                  : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
              }`}
            >
              <div
                className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  childIsRoad1
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-violet-100 text-violet-800'
                }`}
              >
                {child.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {child.name}
                </p>
                <p className="text-[10px] text-slate-500">
                  {childIsRoad1 ? 'Road 1: Pre-Device' : 'Road 2: Active-Device'}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Child Overview Header */}
      {activeChild && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            <div
              className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold text-base ${
                isRoad1 ? 'bg-emerald-100 text-emerald-800' : 'bg-violet-100 text-violet-800'
              }`}
            >
              {activeChild.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{activeChild.name}</h2>
                <Badge variant={isRoad1 ? 'roadPre' : 'roadActive'} className="text-[11px]">
                  {isRoad1 ? 'Road 1: Pre-Device Preparation' : 'Road 2: Active-Device Governance'}
                </Badge>
              </div>
              <p className="text-xs text-slate-600">
                Age {activeChild.age} • {tierNameMap[activeChild.developmentalTier] || activeChild.developmentalTier}
                {activeChild.schoolGrade ? ` • ${activeChild.schoolGrade}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {isRoad1 && (
              <Link href={`/children/${activeChild.id}/readiness`}>
                <Button size="sm" variant="outline" className="text-xs gap-1.5">
                  <Award className="h-3.5 w-3.5 text-teal-600" />
                  {activeChild.latestAssessmentScore !== null
                    ? `Assessment (${activeChild.latestAssessmentScore}/100)`
                    : 'Take Readiness Assessment'}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* DYNAMIC HERO SECTION: ROAD 1 vs ROAD 2 */}
      {isRoad1 && activeChild && (
        <div className="space-y-6">
          {/* Road 1 Hero Card: Pre-Device Preparation */}
          <Card className="border-emerald-200/90 bg-gradient-to-br from-white via-[#FAF9F5] to-emerald-50/30 shadow-sm overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="roadPre" className="text-xs">
                    Road 1 Command Center
                  </Badge>
                  <span className="text-xs text-slate-500">Proactive Pre-Smartphone Protocol</span>
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {activeChild.name}&apos;s First-Phone Readiness Pathway
              </CardTitle>
              <CardDescription className="text-slate-600 text-sm">
                Objective maturity benchmarks to answer &ldquo;Not &lsquo;No&rsquo;, but &lsquo;When&rsquo;&rdquo; without daily conflict.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 rounded-xl bg-white border border-emerald-100 shadow-sm">
                {/* Readiness Score Status */}
                <div className="md:col-span-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-slate-900">
                      10-Dimension Readiness Assessment
                    </h3>
                  </div>

                  {activeChild.latestAssessmentScore !== null ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-50">
                          <span className="text-lg font-extrabold text-emerald-950">
                            {activeChild.latestAssessmentScore}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Current Maturity Score: {activeChild.latestAssessmentScore}/100
                          </p>
                          <p className="text-xs text-slate-600">
                            Evaluated across executive function, bedtime habits, and online safety.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link href={`/children/${activeChild.id}/readiness`}>
                          <Button size="sm" variant="default" className="gap-1.5 shadow-sm">
                            View Full Score Breakdown
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        You have not yet evaluated {activeChild.name}&apos;s digital maturity. Taking the 10-dimension assessment provides an objective 0–100 score and developmental action roadmap.
                      </p>
                      <Link href={`/children/${activeChild.id}/readiness`}>
                        <Button size="sm" className="gap-1.5 shadow-sm">
                          Start 10-Dimension Audit (10 mins)
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Milestone Step-Ladder */}
                <div className="md:col-span-6 space-y-2 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 pt-4 md:pt-0">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Pre-Device Milestone Step-Ladder
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/60 border border-emerald-100/70">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 mt-0.5 ${
                          activeChild.latestAssessmentScore !== null
                            ? 'text-emerald-600'
                            : 'text-slate-400'
                        }`}
                      />
                      <div>
                        <span className="font-semibold text-emerald-950">
                          Step 1: Clinical Readiness Assessment
                        </span>
                        <p className="text-emerald-800 text-[11px]">
                          {activeChild.latestAssessmentScore !== null
                            ? `Completed (Score: ${activeChild.latestAssessmentScore}/100)`
                            : 'Pending parent evaluation'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                      <Compass className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900">
                          Step 2: Bridge Device Trial
                        </span>
                        <p className="text-slate-600 text-[11px]">
                          Calling-only smartwatch or family tablet for gradual autonomy.
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/pacts/builder?childId=${activeChild.id}`}
                      className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/70 hover:border-emerald-300 transition-colors"
                    >
                      <FileCheck2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-900">
                            Step 3: Day 1 Pre-Unboxing Charter
                          </span>
                          <ArrowRight className="h-3 w-3 text-emerald-700" />
                        </div>
                        <p className="text-slate-600 text-[11px]">
                          Co-negotiate boundaries before the device is ever purchased or unboxed.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isRoad2 && activeChild && (
        <div className="space-y-6">
          {/* Road 2 Hero Card: Active-Device Governance */}
          <Card className="border-violet-200/90 bg-gradient-to-br from-white via-[#FAF9F5] to-violet-50/30 shadow-sm overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="roadActive" className="text-xs">
                    Road 2 Command Center
                  </Badge>
                  <span className="text-xs text-slate-500">Active-Device Neutral Governance</span>
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {activeChild.name}&apos;s Restorative Digital Treaty
              </CardTitle>
              <CardDescription className="text-slate-600 text-sm">
                Neutral automated curfews and restorative agreements replacing adversarial phone confiscations.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 rounded-xl bg-white border border-violet-100 shadow-sm">
                {/* Bedtime Lockout Status */}
                <div className="md:col-span-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-violet-600" />
                    <h3 className="text-base font-bold text-slate-900">
                      Bedtime Curfew Lockout
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-lg bg-violet-50/60 border border-violet-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-violet-900">
                        Nightly Downtime Schedule
                      </span>
                      <Badge variant="roadActive" className="text-[10px]">
                        Active (8:30 PM Lock)
                      </Badge>
                    </div>
                    <p className="text-xs text-violet-800 leading-relaxed">
                      All non-emergency apps freeze automatically at 8:30 PM to protect melatonin onset and circadian sleep architecture.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Link href="/devices">
                      <Button size="sm" variant="outline" className="text-xs gap-1.5 border-violet-200 text-violet-900 hover:bg-violet-50">
                        <Lock className="h-3.5 w-3.5 text-violet-600" />
                        Configure Curfew Hours
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Digital Reset Treaty Overview */}
                <div className="md:col-span-6 space-y-3 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 pt-4 md:pt-0">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-teal-700" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Bilateral Family Pact Status
                    </h4>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-slate-600 leading-relaxed">
                      A mutual agreement where {activeChild.name} commits to bedtime docking, and parents commit to zero stealth surveillance and device-free dinners.
                    </p>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">
                        Status: Digital Reset Draft
                      </span>
                      <Link href={`/pacts/builder?childId=${activeChild.id}`}>
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-teal-700 hover:bg-teal-50 p-1.5 gap-1">
                          Edit Clauses & Sign
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Access Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Parent Academy */}
        <Card className="border-slate-200/80 hover:border-slate-300 transition-colors bg-white">
          <CardHeader className="pb-2">
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-1">
              <BookOpen className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-bold text-slate-900">
              Parent Academy
            </CardTitle>
            <CardDescription className="text-xs text-slate-600">
              Micro-lessons on tween neurobiology and modern screen limits.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">
            <p className="text-xs text-slate-600 mb-3">
              {isRoad1
                ? 'Curated: "How to Say No to the 5th Grade Smartphone Beg"'
                : 'Curated: "Restoring Bedtime Peace After Screen Addictions"'}
            </p>
            <Link href="/academy">
              <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                Explore Academy Lessons
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* 24/7 AI Child Advisor */}
        <Card className="border-slate-200/80 hover:border-slate-300 transition-colors bg-white">
          <CardHeader className="pb-2">
            <div className="h-9 w-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-1">
              <MessageSquare className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-bold text-slate-900">
              24/7 AI Child Advisor
            </CardTitle>
            <CardDescription className="text-xs text-slate-600">
              Clinical scripts and voice sparring for tough digital talks.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">
            <p className="text-xs text-slate-600 mb-3">
              Practice de-escalating phone arguments with pediatric psychologist AI.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs gap-1.5"
              onClick={() => alert('AI Advisor sparring interface available in PLAN-11.')}
            >
              Start Conversation Sparring
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Culture Digest */}
        <Card className="border-slate-200/80 hover:border-slate-300 transition-colors bg-white">
          <CardHeader className="pb-2">
            <div className="h-9 w-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
              <Sparkles className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-bold text-slate-900">
              Sunday Culture Digest
            </CardTitle>
            <CardDescription className="text-xs text-slate-600">
              Decoders for tween slang, viral memes, and app bypasses.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">
            <p className="text-xs text-slate-600 mb-3">
              Stay ahead of hidden calculator vaults and algorithmic trends.
            </p>
            <Link href="/digest">
              <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                View Weekly Slang & Alerts
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <ChildOnboardingModal
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
      />
    </div>
  );
}
