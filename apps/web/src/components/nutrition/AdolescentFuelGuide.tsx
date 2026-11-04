'use client';

import * as React from 'react';
import {
  Flame,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Clock,
  Heart,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  Dumbbell,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export function AdolescentFuelGuide() {
  const [activeTab, setActiveTab] = React.useState<'athletic' | 'bone' | 'caffeine' | 'culture'>('athletic');

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="rounded-2xl border border-indigo-200/90 bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-white p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-800">
              <Dumbbell className="h-4 w-4 text-indigo-600" />
              <span>Adolescence & Pubertal Athletes (Ages 12–18)</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Peak Pubertal Growth, Athletic Fuel & Metabolic Protection
            </h3>
          </div>
          <Badge variant="outline" className="text-xs bg-indigo-100/70 border-indigo-300 text-indigo-800 self-start sm:self-auto">
            Hormonal & Musculoskeletal
          </Badge>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
          Adolescence represents the most accelerated biological growth spurt since infancy. Caloric and micronutrient demands reach peak lifelong levels to fuel height acceleration, hormonal balance, expanded blood volume, and athletic stamina.
        </p>
      </div>

      {/* Segmented Sub-Navigation */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('athletic')}
          className={cn(
            'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer border',
            activeTab === 'athletic'
              ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          )}
        >
          <Activity className="h-3.5 w-3.5" />
          <span>Athletic Training & Recovery</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bone')}
          className={cn(
            'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer border',
            activeTab === 'bone'
              ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          )}
        >
          <Zap className="h-3.5 w-3.5" />
          <span>Peak Bone Density (Calcium & Iron)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('caffeine')}
          className={cn(
            'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer border',
            activeTab === 'caffeine'
              ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
              : 'border-rose-200 bg-rose-50/50 text-rose-800 hover:bg-rose-100'
          )}
        >
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Energy Drinks & Caffeine Toxicity</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('culture')}
          className={cn(
            'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer border',
            activeTab === 'culture'
              ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          )}
        >
          <Heart className="h-3.5 w-3.5" />
          <span>Shielding from Toxic Diet Culture</span>
        </button>
      </div>

      {/* Tab 1: Athletic Fuel */}
      {activeTab === 'athletic' && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5 animate-in fade-in">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <Activity className="h-4 w-4 text-indigo-600" />
              <span>The 45-Minute Post-Workout Recovery Window</span>
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              During intense varsity sports or training, glycogen depletion and micro-muscle tears occur. The optimal replenishment ratio is <strong>3:1 carbs-to-protein</strong> within 45 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-2">
              <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                <span>Pre-Workout Fuel (60–90m Prior)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Easily digestible complex carbs with minimal fat/fiber: banana with tablespoon of almond butter, or sourdough toast with honey and water.
              </p>
            </div>

            <div className="rounded-xl border border-purple-100 bg-purple-50/40 p-4 space-y-2">
              <div className="font-bold text-purple-950 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-purple-600" />
                <span>Immediate Post-Workout (0–45m)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Greek yogurt smoothie with frozen berries and spinach, chocolate milk, or edamame and brown rice bowl to restore glycogen.
              </p>
            </div>

            <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4 space-y-2">
              <div className="font-bold text-teal-950 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                <span>Hydration & Electrolytes</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Plain water for practices under 60 minutes. For vigorous sweating over 60 minutes, add coconut water or a pinch of salt with lemon. Avoid neon commercial sports drinks with excessive dye.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bone Density */}
      {activeTab === 'bone' && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5 animate-in fade-in">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <Zap className="h-4 w-4 text-indigo-600" />
              <span>The Lifetime Bone Mineral Accrual Window</span>
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Nearly <strong>40% of adult skeletal bone mass</strong> is laid down during the 4 pubertal years. This window closes by early adulthood and cannot be retroactively recovered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4 space-y-2">
              <div className="font-bold text-amber-950 text-sm">Target: 1,300 mg Calcium Daily</div>
              <p className="text-slate-700 leading-relaxed">
                Teens need 4 daily servings of calcium-rich foods: fortified plant milks, plain whole Greek yogurt, dark leafy greens (kale, bok choy), sesame tahini, and canned wild salmon with soft bones.
              </p>
            </div>

            <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-4 space-y-2">
              <div className="font-bold text-rose-950 text-sm">Iron for Blood Volume & Menstruation</div>
              <p className="text-slate-700 leading-relaxed">
                Rapid muscle mass expansion and menstrual cycles sharply increase iron requirements. Pair plant-based iron (lentils, spinach, pumpkin seeds) with vitamin C (citrus, bell peppers) for 3x absorption.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Caffeine & Energy Drinks */}
      {activeTab === 'caffeine' && (
        <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/70 p-5 sm:p-7 shadow-xs space-y-4 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-sm">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-rose-950">
                Energy Drinks, Pre-Workouts & Adolescent Cardiac Risks
              </h4>
              <p className="text-xs text-rose-900 leading-relaxed max-w-2xl">
                The American Academy of Pediatrics states unequivocally that <strong>energy drinks have no place in the diet of children and adolescents</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="rounded-xl border border-rose-200 bg-white p-3.5 space-y-1.5 shadow-2xs">
              <div className="font-bold text-rose-900">Cardiovascular Risks:</div>
              <p className="text-slate-600 leading-relaxed">
                Doses of 200–300 mg of caffeine paired with taurine, guarana, and ginseng induce acute tachycardia, arterial stiffness, and dangerous ventricular arrhythmias in adolescent hearts.
              </p>
            </div>

            <div className="rounded-xl border border-rose-200 bg-white p-3.5 space-y-1.5 shadow-2xs">
              <div className="font-bold text-rose-900">Circadian Sleep Decimation:</div>
              <p className="text-slate-600 leading-relaxed">
                Caffeine has a 6-hour half-life. An energy drink consumed at 4:00 PM blocks adenosine receptors until midnight, destroying deep restorative slow-wave sleep when growth hormones are secreted.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Diet Culture Protection */}
      {activeTab === 'culture' && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-4 animate-in fade-in">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <Heart className="h-4 w-4 text-purple-600" />
              <span>Shielding Adolescents from Algorithmic Diet Culture</span>
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Social media algorithms target adolescents with extreme "What I Eat in a Day" videos, unproven fitness supplements, and restrictive detoxes that accelerate eating disorders.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <p>
              Pediatricians encourage parents to maintain <strong>Intuitive Eating Principles</strong>:
            </p>
            <ul className="space-y-2 pl-4 list-disc text-slate-600">
              <li><strong>Zero Calorie Counting or Macro Tracking:</strong> Tracking apps correlate strongly with orthorexia and obsessive eating thoughts in adolescents.</li>
              <li><strong>Reject Good vs. Bad Food Dichotomies:</strong> All foods fit into a healthy, joyful lifestyle. Denying cravings triggers rebound binge cycles.</li>
              <li><strong>Focus on Vitality Over Aesthetics:</strong> Affirm your teen's strength, agility, energy, and cognitive sharpness rather than physical appearance or clothing size.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
