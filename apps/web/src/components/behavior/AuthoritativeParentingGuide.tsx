'use client';

import * as React from 'react';
import {
  Heart,
  Shield,
  Wind,
  CheckCircle2,
  Sparkles,
  Play,
  Square,
  AlertCircle,
  HelpCircle,
  Smile,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function AuthoritativeParentingGuide() {
  const [isBreathingActive, setIsBreathingActive] = React.useState(false);
  const [breathPhase, setBreathPhase] = React.useState<
    'Inhale deeply through nose...' | 'Top-off quick inhale...' | 'Long slow exhale through mouth...'
  >('Inhale deeply through nose...');
  const [breathProgress, setBreathProgress] = React.useState(0);

  // Breathing loop for Physiological Sigh (2s inhale + 1s quick inhale + 5s exhale = 8s cycle)
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let cycleTime = 0;

    if (isBreathingActive) {
      interval = setInterval(() => {
        cycleTime = (cycleTime + 100) % 8000;
        setBreathProgress(cycleTime / 8000);

        if (cycleTime < 2200) {
          setBreathPhase('Inhale deeply through nose...');
        } else if (cycleTime < 3200) {
          setBreathPhase('Top-off quick inhale...');
        } else {
          setBreathPhase('Long slow exhale through mouth...');
        }
      }, 100);
    } else {
      setBreathProgress(0);
      setBreathPhase('Inhale deeply through nose...');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathingActive]);

  return (
    <div className="space-y-6">
      {/* High Warmth + High Boundaries Overview */}
      <Card className="border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-teal-50/40 via-white to-slate-50 border-b border-slate-100 p-5 sm:p-6 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white shadow-xs">
                <Shield className="h-4 w-4" />
              </span>
              <Badge
                variant="outline"
                className="text-[11px] font-bold text-teal-900 bg-teal-50 border-teal-200"
              >
                Diana Baumrind Framework
              </Badge>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              High Warmth + High Boundaries
            </span>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            Authoritative Parenting & The "Time-In" Architecture
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-slate-600">
            Why punitive isolation damages attachment, and how physical co-regulation builds resilient emotional regulation circuits.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-6 space-y-6">
          {/* Comparison: Time-Outs vs Time-Ins */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Traditional Time-Out */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Punitive Isolation
                </span>
                <span className="text-[10px] font-bold text-rose-600 uppercase bg-rose-100 px-2 py-0.5 rounded">
                  Time-Outs
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                “Go to your room and don’t come out until you can act right!”
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                When a child’s nervous system is dysregulated, being physically locked away triggers primal mammalian panic: <em>“I am unsafe and unloved when I have big feelings.”</em> They learn suppression or deceit, not regulation.
              </p>
              <div className="rounded-lg bg-white/80 p-2.5 text-[11px] text-rose-950 border border-rose-200">
                <strong>Brain Effect:</strong> High cortisol, defensive rage, perceived abandonment.
              </div>
            </div>

            {/* Authoritative Time-In */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-5 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Attachment Regulation
                </span>
                <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5 rounded">
                  Time-Ins (AlongSide)
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                “I won't let you hit. I am sitting right here with you until your body feels calm.”
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                You hold the behavioral boundary firmly (hitting stops immediately), but you provide physical presence: <em>“Your big feelings are safe with me. You don't have to carry this storm alone.”</em>
              </p>
              <div className="rounded-lg bg-white/80 p-2.5 text-[11px] text-emerald-950 border border-emerald-200">
                <strong>Brain Effect:</strong> Vagal nerve activation, mirror neuron calming, secure attachment.
              </div>
            </div>
          </div>

          {/* 4 Steps to Co-Regulation */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-slate-900">
              The 4 Steps of Authoritative Co-Regulation:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  step: '01',
                  title: 'Regulate Yourself First',
                  desc: 'Your calm is contagious. If your heart is racing, your child matches your adrenaline. Take a breath before speaking.',
                },
                {
                  step: '02',
                  title: 'Connect Before Correct',
                  desc: 'Drop down to eye level. Keep hands open. Silence or gentle humming co-regulates faster than lecturing words.',
                },
                {
                  step: '03',
                  title: 'Name It to Tame It',
                  desc: 'Give the feeling a label: “You are furious that screen time ended.” Naming the emotion transfers activation to the prefrontal cortex.',
                },
                {
                  step: '04',
                  title: 'Hold Boundary with Kind Eyes',
                  desc: '“We can be mad, but we do not throw toys.” Maintain the rule calmly without anger or sarcasm.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 space-y-1.5"
                >
                  <span className="text-base font-black text-teal-700">
                    {item.step}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Physiological Reset Breath for Dysregulated Parents */}
      <Card className="border-teal-200 bg-gradient-to-br from-teal-50/60 via-white to-teal-50/30 shadow-xs">
        <CardHeader className="p-5 sm:p-6 pb-3 border-b border-teal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white shadow-xs">
                <Wind className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-bold text-slate-900">
                The Parent Physiological Sigh (Instant Cortisol Reset)
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-600">
              Stanford Neurobiology (Dr. Andrew Huberman): Two quick inhales through the nose, followed by one long, slow sigh out the mouth. Rapidly pops collapsed alveoli and triggers heart-rate deceleration.
            </CardDescription>
          </div>

          <Button
            type="button"
            onClick={() => setIsBreathingActive(!isBreathingActive)}
            className={`min-h-[44px] gap-2 font-bold text-xs shrink-0 ${
              isBreathingActive
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
            }`}
          >
            {isBreathingActive ? (
              <>
                <Square className="h-3.5 w-3.5 fill-current" />
                <span>Stop Breathing Pacer</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Start 1-Minute Reset Breath</span>
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
          {/* Animated Breath Visualizer */}
          <div className="relative flex items-center justify-center h-44 w-44">
            <div
              className="absolute rounded-full border-4 border-teal-300 transition-all duration-300"
              style={{
                width: isBreathingActive
                  ? `${100 + breathProgress * 70}px`
                  : '110px',
                height: isBreathingActive
                  ? `${100 + breathProgress * 70}px`
                  : '110px',
                backgroundColor: isBreathingActive
                  ? 'rgba(45, 106, 79, 0.12)'
                  : 'rgba(45, 106, 79, 0.05)',
              }}
            />
            <div className="relative flex flex-col items-center justify-center p-4">
              <Wind
                className={`h-8 w-8 text-teal-700 transition-transform ${
                  isBreathingActive ? 'animate-pulse scale-110' : ''
                }`}
              />
              <span className="text-xs font-black text-teal-900 mt-1 uppercase tracking-wider">
                {isBreathingActive ? 'Breathe' : 'Ready'}
              </span>
            </div>
          </div>

          {/* Current Breath Phase Guidance */}
          <div className="space-y-1 max-w-md">
            <h4 className="text-sm font-extrabold text-slate-900">
              {isBreathingActive ? breathPhase : 'Click Start to Pace Your Breathing'}
            </h4>
            <p className="text-xs text-slate-600">
              Pattern: Inhale deep (2s) → Sniff quick top-off (1s) → Slow sigh exhale (5s). Repeat 3 times to completely neutralize fight-or-flight panic.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
