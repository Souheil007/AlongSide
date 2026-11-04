'use client';

import * as React from 'react';
import {
  UtensilsCrossed,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  Heart,
  Scale,
  Smile,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FoodChainOption {
  category: string;
  safeFood: string;
  bridgeStep1: string;
  bridgeStep2: string;
  targetFood: string;
  sensoryBridge: string;
}

export function PickyEatingSolutions() {
  const [selectedChainIndex, setSelectedChainIndex] = React.useState<number>(0);

  const chains: FoodChainOption[] = [
    {
      category: 'Crispy & Salty',
      safeFood: 'Crispy Fast-Food French Fries',
      bridgeStep1: 'Homemade baked potato wedges seasoned with sea salt',
      bridgeStep2: 'Baked sweet potato fries with same texture & dip',
      targetFood: 'Roasted carrot sticks / zucchini fries',
      sensoryBridge: 'Maintains identical crunchy mouthfeel and beloved dipping sauce while transitioning color and micronutrient density.',
    },
    {
      category: 'Beige & Breaded',
      safeFood: 'Processed Fried Chicken Nuggets',
      bridgeStep1: 'Panko-crusted baked chicken breast strips',
      bridgeStep2: 'Crushed-cracker crusted white fish sticks',
      targetFood: 'Salmon cakes or breaded roasted cauliflower bites',
      sensoryBridge: 'Preserves the golden breaded outer crust while introducing varied proteins and subtle vegetable mashes inside.',
    },
    {
      category: 'Smooth & Pureed',
      safeFood: 'Smooth Strawberry Yogurt Pouches',
      bridgeStep1: 'Full-fat plain Greek yogurt mixed with 50% fruit puree',
      bridgeStep2: 'Smoothie bowl with spinach blended until completely smooth',
      targetFood: 'Soft fresh strawberry slices dipped in plain yogurt',
      sensoryBridge: 'Maintains smooth viscosity and sweetness while gradually weaning off ultra-processed pouch textures.',
    },
    {
      category: 'Crunchy Crackers',
      safeFood: 'Goldfish or Saltine Crackers',
      bridgeStep1: 'Whole grain pita chips with hummus or cream cheese dip',
      bridgeStep2: 'Thin cucumber rounds or bell pepper spears with same dip',
      targetFood: 'Raw bell pepper sticks and snap peas',
      sensoryBridge: 'Anchors on the satisfying audible crunch and dip ritual, transforming dry starch into crisp raw produce.',
    },
  ];

  const currentChain = chains[selectedChainIndex] || chains[0]!;

  const calmRules = [
    {
      title: '1. No Short-Order Cooking',
      desc: 'Prepare ONE family meal. Always guarantee at least 1 familiar "safe food" is on the table that your child readily eats.',
    },
    {
      title: '2. Never Bribe with Dessert',
      desc: '"Two more bites of broccoli to get ice cream" elevates dessert into a prize and reinforces that vegetables are unpleasant chores.',
    },
    {
      title: '3. The 1 Tablespoon Age Rule',
      desc: 'Serve tiny introductory portions (1 tablespoon per year of age). A mountain of novel food creates immediate visual overwhelm.',
    },
    {
      title: '4. Respect the 15–20 Exposures Rule',
      desc: 'It takes an average of 15 to 20 neutral, low-pressure exposures before a child willingly tastes and accepts a new vegetable.',
    },
    {
      title: '5. Zero Screens at the Table',
      desc: 'Distracted eating overrides internal satiety cues and disconnects the child from tactile and sensory learning about food.',
    },
    {
      title: '6. Neutral Response to Refusal',
      desc: 'If child says "Yuck, I don’t like this!", respond calmly: "You don’t have to eat it. You just need to keep us company at the table."',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Ellyn Satter Division of Responsibility Framework */}
      <div className="rounded-2xl border border-teal-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-200/60 shadow-2xs">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Gold Standard Feeding Science
                </span>
                <span className="text-xs text-slate-500">• Ellyn Satter Institute</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                The Division of Responsibility (sDOR) in Feeding
              </h3>
            </div>
          </div>
          <div className="rounded-full bg-teal-100/70 px-3.5 py-1 text-xs font-bold text-teal-900 self-start sm:self-center">
            Parents Provide • Child Decides
          </div>
        </div>

        {/* Two-Column Roles Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Parent Column */}
          <div className="rounded-2xl border-2 border-teal-200 bg-teal-50/40 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-teal-950 font-bold text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white text-xs font-black">
                P
              </span>
              <span>Parent’s Sole Responsibilities</span>
            </div>
            <ul className="space-y-2 text-xs text-teal-900 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-teal-700 text-sm leading-none">•</span>
                <span><strong>WHAT:</strong> Parent chooses and prepares wholesome, nourishing meals (including at least 1 safe food).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-teal-700 text-sm leading-none">•</span>
                <span><strong>WHEN:</strong> Parent establishes predictable, regular meal and snack intervals (spaced 2.5–3.5 hours apart).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-teal-700 text-sm leading-none">•</span>
                <span><strong>WHERE:</strong> Parent designates the physical eating environment (seated together at the dining table, zero screens).</span>
              </li>
            </ul>
          </div>

          {/* Child Column */}
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-black">
                C
              </span>
              <span>Child’s Sole Responsibilities</span>
            </div>
            <ul className="space-y-2 text-xs text-indigo-900 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-indigo-700 text-sm leading-none">•</span>
                <span><strong>WHETHER:</strong> Child decides whether they will eat any of the foods provided at this mealtime.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-indigo-700 text-sm leading-none">•</span>
                <span><strong>HOW MUCH:</strong> Child honors their internal physiological hunger and satiety cues without pressure or forced bites.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-indigo-700 text-sm leading-none">•</span>
                <span><strong>AUTONOMY:</strong> Child experiences freedom from coercion, fostering lifelong intuitive eating and metabolic trust.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Food Chaining Planner */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Interactive Food Chaining Planner
              </h3>
              <p className="text-xs text-slate-500">
                Gradual sensory bridging from beloved "safe foods" to nutrient-dense vegetables
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1" role="tablist">
            {chains.map((chain, idx) => (
              <button
                key={chain.category}
                type="button"
                role="tab"
                aria-selected={selectedChainIndex === idx}
                onClick={() => setSelectedChainIndex(idx)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  selectedChainIndex === idx
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {chain.category}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Chain Stepper Flow */}
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50/30 p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            {/* Step 1: Safe Food */}
            <div className="rounded-xl border border-emerald-300 bg-white p-3.5 space-y-1 shadow-2xs">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                Base Safe Food
              </div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">
                {currentChain.safeFood}
              </div>
              <div className="text-[11px] text-slate-500">100% accepted food</div>
            </div>

            {/* Step 2: Bridge 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                Micro-Bridge 1
              </div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">
                {currentChain.bridgeStep1}
              </div>
              <div className="text-[11px] text-slate-500">Subtle texture tweak</div>
            </div>

            {/* Step 3: Bridge 2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                Micro-Bridge 2
              </div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">
                {currentChain.bridgeStep2}
              </div>
              <div className="text-[11px] text-slate-500">Color / nutrient shift</div>
            </div>

            {/* Step 4: Target Food */}
            <div className="rounded-xl border border-teal-300 bg-teal-50/70 p-3.5 space-y-1 shadow-2xs">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800">
                Target Exposure
              </div>
              <div className="font-bold text-teal-950 text-xs sm:text-sm">
                {currentChain.targetFood}
              </div>
              <div className="text-[11px] text-teal-700">Full vegetable expansion</div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-white p-3 text-xs text-amber-950 flex items-start gap-2.5">
            <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Sensory Bridge Strategy:</span>
              <p className="text-slate-700 leading-relaxed">{currentChain.sensoryBridge}</p>
            </div>
          </div>
        </div>
      </div>

      {/* The 6 Calm Mealtime Rules */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
          <Heart className="h-4 w-4 text-teal-600" />
          <span>The 6 Non-Negotiable Calm Mealtime Rules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {calmRules.map((rule, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/40 p-3.5 space-y-1 text-xs">
              <div className="font-bold text-slate-900 text-xs">{rule.title}</div>
              <p className="text-slate-600 leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
