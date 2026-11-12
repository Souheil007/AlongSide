'use client';

import * as React from 'react';
import {
  Utensils,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Heart,
  Baby,
  Apple,
  Clock,
  BookOpen,
  Scale,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Dumbbell,
  Activity,
  Zap,
} from 'lucide-react';
import { NutritionStage, type NutritionGuideDTO } from '@alongside/shared';
import { CANONICAL_NUTRITION_GUIDES } from '@/lib/api/nutrition';
import { useChildContextStore } from '@/stores/useChildContextStore';
import { useChildAge } from '@/hooks/useChildAge';
import { Badge } from '@/components/ui/Badge';
import { BabyLedWeaningGuide } from './BabyLedWeaningGuide';
import { AllergenIntroductionTracker } from './AllergenIntroductionTracker';
import { ChokingHazardsWarningCard } from './ChokingHazardsWarningCard';
import { PickyEatingSolutions } from './PickyEatingSolutions';
import { SchoolLunchboxGuide } from './SchoolLunchboxGuide';
import { AdolescentFuelGuide } from './AdolescentFuelGuide';

interface NutritionDashboardViewProps {
  initialChildId?: string;
}

function getTailoredHeroSubtitle(stage: NutritionStage): string {
  switch (stage) {
    case NutritionStage.MILK_ONLY:
      return 'Exclusive liquid nourishment, responsive feeding cues, pediatric vitamin D supplementation, and physiological gut maturity.';
    case NutritionStage.SOLIDS_INTRODUCED:
      return 'Texture exploration, iron-rich powerfoods, baby-led weaning safety, and early allergen introduction based on the LEAP protocol.';
    case NutritionStage.TODDLER_TABLE:
      return 'Conquering developmental neophobia, Ellyn Satter Division of Responsibility (sDOR), tiny manageable portions, and zero mealtime stress.';
    case NutritionStage.BALANCED_SCHOOL:
      return 'Executive function fuel, sustained glucose breakfast stability, balanced 4-compartment school lunchboxes, and lifelong body neutrality.';
    case NutritionStage.PUBERTAL_GROWTH:
    default:
      return 'Peak lifetime bone mineral density (calcium 1,300mg), athletic training recovery, iron expansion, and shielding against caffeine and toxic diet culture.';
  }
}

export function NutritionDashboardView({ initialChildId }: NutritionDashboardViewProps) {
  const { activeChildId, setActiveChild } = useChildContextStore();
  const childAge = useChildAge();

  // Sync initial child ID if passed via props
  React.useEffect(() => {
    if (initialChildId && initialChildId !== activeChildId) {
      setActiveChild(initialChildId);
    }
  }, [initialChildId, activeChildId, setActiveChild]);

  // Selected feeding stage defaults to active child's calibrated recommendation
  const [selectedStage, setSelectedStage] = React.useState<NutritionStage>(childAge.feedingStage);
  const [isStageDrawerOpen, setIsStageDrawerOpen] = React.useState(false);
  const [activeSubTab, setActiveSubTab] = React.useState<string>('overview');

  // Update selected stage when active child recommendation changes
  React.useEffect(() => {
    setSelectedStage(childAge.feedingStage);
    setActiveSubTab('overview');
  }, [childAge.feedingStage]);

  const currentGuide =
    CANONICAL_NUTRITION_GUIDES.find((g) => g.stage === selectedStage) ||
    CANONICAL_NUTRITION_GUIDES[1]!;

  const isMatchingActiveChild = selectedStage === childAge.feedingStage;
  const childName = childAge.name || 'Your child';

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Hero Header Banner */}
      <section
        aria-label="Pediatric Nutrition Overview"
        className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white p-6 sm:p-8 shadow-md"
      >
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
              <span>Evidence-Based Pediatric Nutrition • AAP & Ellyn Satter sDOR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Pediatric Nutrition & Healthy Feeding Hub
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {getTailoredHeroSubtitle(selectedStage)}
            </p>
          </div>

          {/* Active Child Calm Stage Badge */}
          <div className="shrink-0 rounded-2xl border border-emerald-400/20 bg-white/10 p-4 backdrop-blur-md min-w-[240px]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Apple className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
                  Child Nutrition Profile
                </div>
                <div className="text-base font-bold text-white">
                  {childName} ({childAge.ageDisplay})
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between border-t border-emerald-500/20 pt-2 text-xs text-emerald-200/90">
              <span className="font-semibold text-white">{currentGuide.stageName.split(':')[0]}</span>
              <Badge variant="outline" className="text-[10px] bg-emerald-500/20 text-emerald-200 border-emerald-400/40">
                {isMatchingActiveChild ? 'Calibrated Stage' : 'Inspecting Stage'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Collapsible Developmental Stage Selector */}
        <div className="relative z-10 mt-6 pt-4 border-t border-emerald-800/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200/80">
                Active Stage:
              </span>
              <span className="text-xs font-bold text-white">{currentGuide.stageName}</span>
              <span className="text-[11px] text-emerald-300/80">({currentGuide.ageRange})</span>
            </div>

            <button
              type="button"
              onClick={() => setIsStageDrawerOpen(!isStageDrawerOpen)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-white transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>{isStageDrawerOpen ? 'Hide other stages' : 'Explore other developmental stages (0–18)'}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isStageDrawerOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {isStageDrawerOpen && (
            <div className="mt-3 flex flex-wrap gap-2 pt-2 animate-in fade-in" role="tablist">
              {CANONICAL_NUTRITION_GUIDES.map((g) => {
                const isSelected = selectedStage === g.stage;
                const isMatchingChild = childAge.feedingStage === g.stage;
                return (
                  <button
                    key={g.stage}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedStage(g.stage);
                      setActiveSubTab('overview');
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-white shadow-xs ring-2 ring-emerald-300'
                        : 'border border-emerald-400/20 bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <span>{g.stageName.split(':')[0]}</span>
                    <span className="text-[11px] font-medium opacity-80">({g.ageRange})</span>
                    {isMatchingChild && (
                      <span className="ml-1 rounded-full bg-white/25 px-1.5 py-0.2 text-[9px] font-black uppercase">
                        For {childName}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Contextual Subtabs Navigation strictly tailored to selectedStage */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-px" aria-label="Nutrition Navigation">
          {/* 1. Overview Tab (Present on all stages) */}
          <button
            type="button"
            onClick={() => setActiveSubTab('overview')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeSubTab === 'overview'
                ? 'border-emerald-600 text-emerald-900'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Stage Overview & Nutrients</span>
          </button>

          {/* 2. STAGE 1: MILK ONLY (0–6 Months) */}
          {selectedStage === NutritionStage.MILK_ONLY && (
            <>
              <button
                type="button"
                onClick={() => setActiveSubTab('readiness')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeSubTab === 'readiness'
                    ? 'border-emerald-600 text-emerald-900'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                <Baby className="h-4 w-4" />
                <span>Solids Readiness Markers</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('hazards')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeSubTab === 'hazards'
                    ? 'border-rose-600 text-rose-900'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Strict Infant Safety</span>
              </button>
            </>
          )}

          {/* 3. STAGE 2: SOLIDS INTRODUCED & BLW (6–12 Months) */}
          {selectedStage === NutritionStage.SOLIDS_INTRODUCED && (
            <>
              <button
                type="button"
                onClick={() => setActiveSubTab('blw')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeSubTab === 'blw'
                    ? 'border-emerald-600 text-emerald-900'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                <Baby className="h-4 w-4" />
                <span>Baby-Led Weaning & Slicing</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('allergens')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeSubTab === 'allergens'
                    ? 'border-teal-600 text-teal-900'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Top 8 Allergen Tracker</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('choking')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeSubTab === 'choking'
                    ? 'border-rose-600 text-rose-900'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Choking Hazards</span>
              </button>
            </>
          )}

          {/* 4. STAGE 3: TODDLER TABLE & PICKY EATING (1–5 Years) */}
          {selectedStage === NutritionStage.TODDLER_TABLE && (
            <>
              <button
                type="button"
                onClick={() => setActiveSubTab('picky')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeSubTab === 'picky'
                    ? 'border-amber-600 text-amber-900'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                <Scale className="h-4 w-4" />
                <span>Picky Eating & sDOR</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('choking')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeSubTab === 'choking'
                    ? 'border-rose-600 text-rose-900'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Choking Hazards</span>
              </button>
            </>
          )}

          {/* 5. STAGE 4: BALANCED SCHOOL & LUNCHBOXES (6–12 Years) */}
          {selectedStage === NutritionStage.BALANCED_SCHOOL && (
            <>
              <button
                type="button"
                onClick={() => setActiveSubTab('school')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeSubTab === 'school'
                    ? 'border-emerald-600 text-emerald-900'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                <Apple className="h-4 w-4" />
                <span>School Lunchboxes & Brain Fuel</span>
              </button>
            </>
          )}

          {/* 6. STAGE 5: PUBERTAL GROWTH & ATHLETES (13–18 Years) */}
          {selectedStage === NutritionStage.PUBERTAL_GROWTH && (
            <>
              <button
                type="button"
                onClick={() => setActiveSubTab('adolescent')}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeSubTab === 'adolescent'
                    ? 'border-indigo-600 text-indigo-900'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                <Dumbbell className="h-4 w-4" />
                <span>Athletic Fuel & Metabolic Protection</span>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Main Tab Content Display */}
      <div className="transition-opacity duration-200">
        {/* Generic Stage Overview (Dynamic for all stages) */}
        {activeSubTab === 'overview' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  <span>{currentGuide.stageName}</span>
                  <span>•</span>
                  <span>Target Age: {currentGuide.ageRange}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-950 mt-1">
                  {currentGuide.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                  {currentGuide.summary}
                </p>
              </div>

              {/* Nutrients & Foods Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Key Nutrients */}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 space-y-3">
                  <div className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-700" />
                    <span>Target Neurobiological Nutrients</span>
                  </div>
                  <ul className="space-y-2 text-slate-700 leading-relaxed">
                    {currentGuide.keyNutrients.map((n, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-emerald-700">•</span>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Foods */}
                <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4 space-y-3">
                  <div className="font-bold text-teal-950 text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-700" />
                    <span>Recommended Powerfoods</span>
                  </div>
                  <ul className="space-y-2 text-slate-700 leading-relaxed">
                    {currentGuide.recommendedFoods.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-teal-700">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Foods to Strictly Avoid (Hazard Mechanisms) */}
              <div className="rounded-xl border-2 border-rose-200 bg-rose-50/50 p-4 sm:p-5 space-y-3">
                <div className="font-bold text-rose-950 text-xs sm:text-sm flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-rose-600" />
                  <span>Strict Pediatric Hazard Warnings (Foods to Avoid)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {currentGuide.foodsToAvoid.map((item, idx) => (
                    <div key={idx} className="rounded-lg border border-rose-200 bg-white p-3 space-y-1">
                      <div className="font-bold text-rose-900 flex items-center justify-between">
                        <span>{item.food}</span>
                        <span className="text-[10px] bg-rose-100 px-1.5 py-0.5 rounded font-black text-rose-800">
                          {item.strictAgeMonths
                            ? item.strictAgeMonths < 120
                              ? `< ${item.strictAgeMonths} mo`
                              : `< ${Math.round(item.strictAgeMonths / 12)} yrs`
                            : 'Strict Caution'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 leading-relaxed">
                        <strong>Hazard:</strong> {item.mechanism}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Division of Responsibility Golden Rule */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-emerald-600" />
                  <span>Ellyn Satter Division of Responsibility Golden Rule:</span>
                </div>
                <p className="text-slate-700 italic font-medium leading-relaxed pl-6">
                  "{currentGuide.dorPrinciples.goldenRule}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Infant Stage 1 Readiness */}
        {activeSubTab === 'readiness' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Baby className="h-5 w-5 text-emerald-600" />
                <span>The 4 Physiological Readiness Signs for Solids (Month 6)</span>
              </h3>
              <p className="text-xs text-slate-600">
                The AAP recommends introducing solids strictly around 6 months when all four physiological developmental criteria are met.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {currentGuide.blwTips.map((tip, idx) => (
                <div key={idx} className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 space-y-1">
                  <div className="font-bold text-emerald-950">Milestone {idx + 1}</div>
                  <p className="text-slate-700 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Infant Stage 1 Hazards */}
        {activeSubTab === 'hazards' && (
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/60 p-6 space-y-4">
            <h3 className="text-lg font-bold text-rose-950 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
              <span>Strict Prohibitions Before 12 Months</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-rose-200 bg-white p-4 space-y-1">
                <span className="font-bold text-rose-900 text-sm">1. Water & Diluted Juices (&lt; 6 months)</span>
                <p className="text-slate-600 leading-relaxed">
                  Infant kidneys cannot excrete excess water rapidly. Extra water causes <strong>hyponatremia</strong> (dilution of serum sodium), leading to cerebral edema and seizures.
                </p>
              </div>
              <div className="rounded-xl border border-rose-200 bg-white p-4 space-y-1">
                <span className="font-bold text-rose-900 text-sm">2. Honey (&lt; 12 months)</span>
                <p className="text-slate-600 leading-relaxed">
                  Infant Botulism: Clostridium botulinum spores germinate in the immature infant gut, producing neurotoxins that cause flaccid paralysis and respiratory arrest. Cooking or baking does NOT inactivate spores.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* BLW Guide */}
        {activeSubTab === 'blw' && (
          <section aria-label="Baby-Led Weaning Guide">
            <BabyLedWeaningGuide />
          </section>
        )}

        {/* Allergen Tracker */}
        {activeSubTab === 'allergens' && (
          <section aria-label="Safe Allergen Introduction Tracker">
            <AllergenIntroductionTracker />
          </section>
        )}

        {/* Choking Hazards */}
        {activeSubTab === 'choking' && (
          <section aria-label="Choking Hazards Warning Card">
            <ChokingHazardsWarningCard />
          </section>
        )}

        {/* Picky Eating */}
        {activeSubTab === 'picky' && (
          <section aria-label="Picky Eating and Division of Responsibility">
            <PickyEatingSolutions />
          </section>
        )}

        {/* School Fuel */}
        {activeSubTab === 'school' && (
          <section aria-label="School Lunchbox and Brain Fuel Guide">
            <SchoolLunchboxGuide />
          </section>
        )}

        {/* Adolescent Fuel */}
        {activeSubTab === 'adolescent' && (
          <section aria-label="Adolescent Athletic Fuel and Pubertal Guide">
            <AdolescentFuelGuide />
          </section>
        )}
      </div>

      {/* Clinical Reference Safe Harbor Footer */}
      <footer className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 text-xs text-slate-600 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <ShieldCheck className="h-4 w-4 text-emerald-700" />
          <span>Evidence-Based Family Nutrition Guide</span>
        </div>
        <p className="leading-relaxed">
          Nutrition recommendations are developed in alignment with the American Academy of Pediatrics (AAP) Committee on Nutrition, the European Society for Paediatric Gastroenterology, Hepatology and Nutrition (ESPGHAN), the LEAP (Learning Early About Peanut Allergy) Trial, and the Ellyn Satter Institute Division of Responsibility. Always consult your child’s pediatrician before introducing new diets or managing suspected food allergies.
        </p>
      </footer>
    </div>
  );
}
