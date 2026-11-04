'use client';

import * as React from 'react';
import {
  Apple,
  Sparkles,
  CheckCircle2,
  Clock,
  Heart,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface BentoBoxBlueprint {
  title: string;
  category: string;
  items: string[];
  clinicalBenefit: string;
}

const BENTO_COMPARTMENTS: BentoBoxBlueprint[] = [
  {
    category: '1. Sustained Protein',
    title: 'Muscle & Synaptic Repair',
    items: [
      'Rolled turkey or roast chicken wraps with hummus',
      'Shelled edamame with a pinch of sea salt',
      'Hard-boiled pasture-raised eggs (cut in halves)',
      'Cubed organic cheddar or baked tofu bites',
    ],
    clinicalBenefit: 'Amino acids stabilize neurotransmitters and prevent mid-morning glucose spikes and crashes.',
  },
  {
    category: '2. Low-Glycemic Complex Carbs',
    title: 'Prefrontal Glucose Fuel',
    items: [
      'Whole-wheat sourdough pita pockets',
      'Cold quinoa salad with diced cucumbers and olive oil',
      'Rolled oat energy bites with chia and sunflower butter',
      'Roasted sweet potato coins with cinnamon',
    ],
    clinicalBenefit: 'Slow-release glycogen fuels continuous executive attention without hyperactive insulin swings.',
  },
  {
    category: '3. Antioxidant Brain Produce',
    title: 'Cellular Protection & Hydration',
    items: [
      'Fresh blueberries, raspberries, or sliced strawberries',
      'Crisp sugar snap peas and Persian cucumber spears',
      'Sweet baby bell pepper rings with tzatziki dip',
      'Crispy honeycrisp apple slices with lemon rinse',
    ],
    clinicalBenefit: 'Polyphenols protect cortical neurons while high water content sustains classroom hydration.',
  },
  {
    category: '4. Healthy Fats & Micronutrient Crunch',
    title: 'Omega-3s & Neural Sheathing',
    items: [
      'Roasted salted pumpkin seeds (pepitas)',
      'Individual guacamole or hummus dipping cup',
      'Crispy roasted spiced chickpeas',
      'Hemp-heart sprinkled melon balls',
    ],
    clinicalBenefit: 'Healthy unsaturated fats support continuing axonal myelination throughout middle childhood.',
  },
];

export function SchoolLunchboxGuide() {
  const [selectedCompartment, setSelectedCompartment] = React.useState<number>(0);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-white p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Apple className="h-4 w-4 text-emerald-600" />
              <span>Elementary & Middle Childhood (Ages 6–12)</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              School Lunchboxes, Cognitive Energy & Body Neutrality
            </h3>
          </div>
          <Badge variant="outline" className="text-xs bg-emerald-100/70 border-emerald-300 text-emerald-800 self-start sm:self-auto">
            Focus & Sustained Energy
          </Badge>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
          School-age children experience intense cognitive demands combined with physical recess bursts. Balanced low-glycemic fueling prevents the classic 10:30 AM classroom brain fog and 3:30 PM post-school emotional crashes.
        </p>
      </div>

      {/* Interactive 4-Compartment Bento Blueprint */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h4 className="text-base font-bold text-slate-950 flex items-center gap-2">
            <Zap className="h-4 w-4 text-emerald-600" />
            <span>The 4-Compartment Cognitive Bento Blueprint</span>
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Select a compartment to explore high-nutrient, school-friendly recommendations that stay fresh without heating.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {BENTO_COMPARTMENTS.map((comp, idx) => {
            const isSelected = selectedCompartment === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCompartment(idx)}
                className={cn(
                  'rounded-xl p-3 text-left transition-all cursor-pointer border',
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                )}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  {comp.category}
                </div>
                <div className="text-xs font-semibold mt-0.5 line-clamp-1">
                  {comp.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Compartment Detail */}
        {BENTO_COMPARTMENTS[selectedCompartment] && (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-5 space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <div className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>Recommended Items for {BENTO_COMPARTMENTS[selectedCompartment].category}</span>
              </div>
              <p className="text-xs text-emerald-800 font-medium">
                {BENTO_COMPARTMENTS[selectedCompartment].clinicalBenefit}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BENTO_COMPARTMENTS[selectedCompartment].items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="rounded-lg border border-emerald-200/70 bg-white p-3 text-xs text-slate-800 font-medium flex items-center gap-2.5 shadow-2xs"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-800">
                    {itemIdx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Routine Strategies: Morning Stability & The 3:30 PM Window */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Clock className="h-4 w-4 text-teal-600" />
            <span>The 10:30 AM Brain Fog Prevention</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            High-sugar breakfast cereals trigger a rapid glucose spike followed by an acute insulin-driven crash by mid-morning.
          </p>
          <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-3 text-xs space-y-1.5 text-slate-700">
            <div className="font-bold text-teal-950">Brain-Stable Morning Combos:</div>
            <ul className="space-y-1 pl-4 list-disc text-slate-600">
              <li>Oatmeal topped with hemp seeds and blueberries</li>
              <li>Whole grain toast with nut/seed butter and banana coins</li>
              <li>Scrambled eggs with melted cheese in a warm mini tortilla</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Heart className="h-4 w-4 text-rose-600" />
            <span>Taming the 3:30 PM After-School Crash</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            School meltdowns upon arriving home are often physiological: exhausted dopamine and depleted glycogen.
          </p>
          <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-3 text-xs space-y-1.5 text-slate-700">
            <div className="font-bold text-rose-950">De-escalation Through Immediate Food:</div>
            <ul className="space-y-1 pl-4 list-disc text-slate-600">
              <li>Place a platter of sliced apples, cheese sticks, and pretzels on the counter before starting questions.</li>
              <li>Offer a large glass of cold water (mild dehydration mimics irritability).</li>
              <li>Avoid asking about homework or grades until food has been eaten.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Body Neutrality & Food Moralizing Protection */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-2 text-xs text-slate-700">
        <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-700" />
          <span>Body-Neutral Language: How to Talk About Food</span>
        </div>
        <p className="leading-relaxed">
          Between ages 6 and 12, children absorb cultural messages about body weight, "junk" food, and morality. Clinical pediatric advice emphasizes <strong>neutrality</strong>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
            <span className="font-bold text-emerald-900 block mb-1">Say This (Functional Energy):</span>
            <span className="italic text-slate-700">"This meal has protein and complex carbs that give you stamina to play soccer all afternoon."</span>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-3">
            <span className="font-bold text-rose-900 block mb-1">Avoid This (Moralizing / Shame):</span>
            <span className="italic text-slate-700">"That food is bad for you and will make you gain weight. You have to earn dessert."</span>
          </div>
        </div>
      </div>
    </div>
  );
}
