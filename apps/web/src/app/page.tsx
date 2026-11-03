import Link from 'next/link';
import {
  Shield,
  Compass,
  BookOpen,
  MessageSquare,
  FileCheck2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Smartphone,
  Sliders,
  Sparkle,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <Badge variant="default" className="gap-1.5 py-1 px-3 text-xs bg-teal-50 border-teal-200 text-teal-800">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            The Parent Calm System • Clinical Neurobiology & Bilateral Collaboration
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Replace screen conflict with{' '}
            <span className="text-teal-700 underline decoration-teal-300 underline-offset-8">
              calm developmental science
            </span>
            .
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
            You don&apos;t need to be the &ldquo;bad guy&rdquo; or a covert spy. Alongside helps you
            evaluate smartphone readiness, co-create bilateral family pacts, and let neutral
            curfews enforce bedtime peace.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 shadow-md">
                Start 7-Day Risk-Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/#roads" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore The Two Roads
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-6 pt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 7-day full access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Cancel anytime with 1 click
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> No predatory surveillance
            </span>
          </div>
        </div>
      </section>

      {/* The Two Roads Section (Bifurcation Core) */}
      <section id="roads" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="outline" className="text-xs uppercase tracking-wider text-slate-600">
            Contextual Road Fork
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Where is your child on their digital journey?
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Every child’s brain develops at a different cadence. Rather than generic screen rules,
            Alongside adapts directly to your reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Road 1: Pre-Device */}
          <Card className="border-2 border-emerald-200/90 bg-gradient-to-br from-white to-emerald-50/40 relative overflow-hidden transition-shadow hover:shadow-lg">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-emerald-100 rounded-full blur-2xl opacity-50" />
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="roadPre" className="text-xs">
                  Road 1 • Ages 9–13
                </Badge>
                <Compass className="h-6 w-6 text-emerald-700" />
              </div>
              <CardTitle className="text-2xl text-slate-900">
                Pre-Device: Delay &amp; Readiness
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                For parents resisting the pressure to buy a smartphone before their child is
                cognitively and emotionally equipped.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>First-Phone Readiness Assessment (0–100):</strong> Objective,
                    neurodevelopmental evaluation of impulse control, executive function, and social resilience.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Delay Coalition Builder:</strong> Connect with parents in your child&apos;s
                    school or grade to commit together to delayed smartphone adoption.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>De-Escalation Scripts:</strong> Word-for-word responses when your child says,
                    <em>&ldquo;Everyone else has an iPhone!&rdquo;</em>
                  </span>
                </li>
              </ul>

              <div className="pt-4">
                <Link href="/register?road=PRE_DEVICE">
                  <Button variant="outline" className="w-full border-emerald-300 text-emerald-800 hover:bg-emerald-50">
                    Explore Road 1 Toolkit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Road 2: Active-Device */}
          <Card className="border-2 border-violet-200/90 bg-gradient-to-br from-white to-violet-50/40 relative overflow-hidden transition-shadow hover:shadow-lg">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-violet-100 rounded-full blur-2xl opacity-50" />
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="roadActive" className="text-xs">
                  Road 2 • Active Device
                </Badge>
                <Smartphone className="h-6 w-6 text-violet-700" />
              </div>
              <CardTitle className="text-2xl text-slate-900">
                Active-Device: Bilateral Pact &amp; Curfew
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                For families already navigating an existing phone, tablet, or gaming console
                without resorting to secret spyware.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Bilateral Family Media Agreement:</strong> Co-negotiated mutual
                    commitments signed digitally by both parent and child.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Neutral Bedtime Curfew (8:30 PM):</strong> Cryptographic device profile
                    locks the screen automatically. The software is the boundary, eliminating nightly shouting matches.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sunday Culture Digest:</strong> Early warning intelligence on hidden app
                    vaults, exploit bypasses, and viral slang.
                  </span>
                </li>
              </ul>

              <div className="pt-4">
                <Link href="/register?road=ACTIVE_DEVICE">
                  <Button variant="outline" className="w-full border-violet-300 text-violet-800 hover:bg-violet-50">
                    Explore Road 2 Toolkit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5 Core Pillars Feature Grid */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="outline" className="text-xs uppercase tracking-wider text-slate-600">
            Platform Architecture
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built on the 4 Tenets of Parent Calm
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Non-judgmental empathy, science-backed neurobiology, bilateral agreements, and neutral enforcement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <Card className="hover:border-teal-300 transition-colors">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Parent Intelligence Academy</CardTitle>
              <CardDescription>
                Bite-sized masterclasses breaking down dopaminergic loops, prefrontal cortex maturity, and social contagion.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Transform anxious reactions into calm, grounded authority with clinical insights tailored to your child&apos;s developmental tier.
            </CardContent>
          </Card>

          {/* Pillar 2 */}
          <Card className="hover:border-teal-300 transition-colors">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <MessageSquare className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">24/7 AI Child Advisor</CardTitle>
              <CardDescription>
                Real-time de-escalation coach and sparring simulator backed by our curated Modern Parenting FAQ Vault.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Practice difficult conversations before having them in real life. Receive exact wording for high-stakes conflicts in seconds.
            </CardContent>
          </Card>

          {/* Pillar 3 */}
          <Card className="hover:border-teal-300 transition-colors">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-violet-100 flex items-center justify-center text-violet-700">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Bilateral Family Pact</CardTitle>
              <CardDescription>
                Digital contract wizard turning arbitrary rules into shared agreements signed on screen by both parent and child.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Kids respect boundaries they helped construct. Includes vector PDF certificate export for the refrigerator.
            </CardContent>
          </Card>

          {/* Pillar 4 */}
          <Card className="hover:border-teal-300 transition-colors">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <Lock className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Neutral Bedtime Curfew</CardTitle>
              <CardDescription>
                Cryptographic Apple &amp; Android profiles enforce 8:30 PM sleep cutoffs directly on the hardware.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Stop arguing every night. When the phone locks automatically, you are free to be the comforting parent, not the disciplinarian.
            </CardContent>
          </Card>

          {/* Pillar 5 */}
          <Card className="hover:border-teal-300 transition-colors md:col-span-2">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
                <Sparkle className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Sunday Youth Culture Digest</CardTitle>
              <CardDescription>
                Your weekly intelligence briefing decoding emerging tween slang, covert vault apps, and Sunday dinner talking points.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Stay ahead of digital trends without feeling clueless. Decode words like <em>skibidi</em>, <em>crashout</em>, and <em>rizz</em> before they disrupt family communication.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing / Trial Onboarding CTA */}
      <section id="pricing" className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full scroll-mt-24">
        <div className="rounded-2xl border border-teal-200 bg-gradient-to-b from-teal-50/60 to-white p-8 sm:p-12 text-center shadow-sm">
          <Badge variant="default" className="mb-4">
            7-Day Risk-Free Trial
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Start your journey toward bedtime peace today
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-base">
            Get unlimited access to the Parent Intelligence Academy, AI Child Advisor,
            Family Pact Builder, and Sunday Culture Digest for 7 full days.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8 text-left">
            <div className="rounded-xl border border-teal-300 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase text-teal-700">Hero Pass (Recommended)</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">$79 <span className="text-sm font-normal text-slate-500">/ year</span></div>
              <div className="text-xs text-slate-500 mt-1">Includes all children &amp; unlimited pact exports</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase text-slate-500">Flex Monthly</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">$9.99 <span className="text-sm font-normal text-slate-500">/ month</span></div>
              <div className="text-xs text-slate-500 mt-1">Month-to-month flexibility</div>
            </div>
          </div>

          <Link href="/register">
            <Button size="lg" className="px-10 h-12 text-base shadow-md gap-2">
              Begin 7-Day Free Trial
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-xs text-slate-500 mt-3">
            No charge during your first 7 days. Cancel anytime with a single click.
          </p>
        </div>
      </section>
    </div>
  );
}
