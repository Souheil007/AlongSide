'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Baby,
  Smile,
  Sparkles,
  Smartphone,
  Moon,
  GraduationCap,
  Brain,
  HeartPulse,
  Utensils,
  Puzzle,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { AcademyCategory, DevelopmentalTier } from '@alongside/shared';
import { Button } from '@/components/ui/Button';

export interface StageCourse {
  category: AcademyCategory;
  categoryLabel: string;
  categoryIcon: LucideIcon;
  title: string;
  summary: string;
  slug: string;
  lessonCount: number;
  durationMinutes: number;
}

export interface StageData {
  id: string;
  tier: DevelopmentalTier;
  tabLabel: string;
  ageLabel: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  courses: StageCourse[];
}

/**
 * Canonical 6 Developmental Lifespan Advisory Tiers (AlongSide v2.5.0)
 * Covering all 6 tiers: 0-3, 4-6, 7-9, 10-12, 13-15, 16-18
 * Each tier showcases the 5 canonical Academy category courses tailored to child age.
 */
export const CANONICAL_6_LIFESPAN_STAGES: StageData[] = [
  {
    id: 'infants-toddlers',
    tier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    tabLabel: 'Infants & Toddlers',
    ageLabel: 'Ages 0–3',
    title: 'Physical Health, Milestones & Safe Feeding',
    subtitle: 'Curated foundational guidance across sleep architecture, allergen introduction, and pre-verbal co-regulation.',
    icon: Baby,
    courses: [
      {
        category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        categoryLabel: 'Behavior & Emotions',
        categoryIcon: Brain,
        title: 'Sensory Overload & Infant Co-Regulation',
        summary: 'Master how the 0-3 infant and toddler brain builds secure attachment, why pre-verbal emotional meltdowns occur, and how to anchor calm.',
        slug: 'behavior-infant-coregulation',
        lessonCount: 3,
        durationMinutes: 13,
      },
      {
        category: AcademyCategory.HEALTH_AND_WELLNESS,
        categoryLabel: 'Pediatric Health & Sleep',
        categoryIcon: HeartPulse,
        title: 'Infant Health Foundations & Sleep Architecture',
        summary: 'Understanding fever physiology, hydration, wake windows, and pediatric triage.',
        slug: 'health-infant-sleep-foundations',
        lessonCount: 3,
        durationMinutes: 13,
      },
      {
        category: AcademyCategory.NUTRITION_AND_FEEDING,
        categoryLabel: 'Nutrition & Mealtime',
        categoryIcon: Utensils,
        title: 'Infant First Foods & Allergen Introduction',
        summary: 'Safe allergen exposure window, BLW vs purees, and toddler food strikes.',
        slug: 'nutrition-infant-first-foods',
        lessonCount: 3,
        durationMinutes: 13,
      },
      {
        category: AcademyCategory.DEVELOPMENT_AND_PLAY,
        categoryLabel: 'Development & Play',
        categoryIcon: Puzzle,
        title: 'Infant Sensory Awakening & Language Bursts',
        summary: 'Video deficit effect, serve-and-return communication, and tactile fine motor play.',
        slug: 'play-infant-sensory-language',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.DIGITAL_AND_DEVICES,
        categoryLabel: 'Digital & Devices',
        categoryIcon: Smartphone,
        title: 'Zero Screens Under 2 & Parent Tech Modeling',
        summary: 'Zero-screen rules, parental phubbing ("technoference"), and device-free sanctuaries.',
        slug: 'digital-infant-zero-screens',
        lessonCount: 3,
        durationMinutes: 12,
      },
    ],
  },
  {
    id: 'early-childhood',
    tier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    tabLabel: 'Early Childhood',
    ageLabel: 'Ages 4–6',
    title: 'Emotional Regulation, Picky Eating & Symbolic Play',
    subtitle: 'Mastering Theory of Mind, grocery-store meltdowns, table harmony, and gentle media transitions.',
    icon: Smile,
    courses: [
      {
        category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        categoryLabel: 'Behavior & Emotions',
        categoryIcon: Brain,
        title: 'Preschool Big Feelings & Theory of Mind',
        summary: 'Understanding emotional egocentrism, bedtime friction, and early boundary setting without shame.',
        slug: 'behavior-preschool-feelings',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.HEALTH_AND_WELLNESS,
        categoryLabel: 'Pediatric Health & Sleep',
        categoryIcon: HeartPulse,
        title: 'Preschool Immunity & Restorative Rest',
        summary: 'Recovering from daycare germs, managing night terrors, and daily outdoor movement.',
        slug: 'health-preschool-immunity',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.NUTRITION_AND_FEEDING,
        categoryLabel: 'Nutrition & Mealtime',
        categoryIcon: Utensils,
        title: 'Preschool Picky Eating & Family Meal Harmony',
        summary: 'Ending dinner table battles, texture exposure, and demystifying sweet obsessions.',
        slug: 'nutrition-preschool-picky-eating',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.DEVELOPMENT_AND_PLAY,
        categoryLabel: 'Development & Play',
        categoryIcon: Puzzle,
        title: 'Imaginative Play & Executive Function',
        summary: 'Sustained attention vs fast media, block building, and the boredom threshold.',
        slug: 'play-preschool-executive-function',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.DIGITAL_AND_DEVICES,
        categoryLabel: 'Digital & Devices',
        categoryIcon: Smartphone,
        title: 'Preschool Media Curation & Stopping Transitions',
        summary: 'Slow-tempo curation, co-viewing rituals, and visual timer transitions.',
        slug: 'digital-preschool-media-curation',
        lessonCount: 3,
        durationMinutes: 12,
      },
    ],
  },
  {
    id: 'middle-childhood',
    tier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    tabLabel: 'Middle Childhood',
    ageLabel: 'Ages 7–9',
    title: 'Cognitive Brain Games & Social Foundations',
    subtitle: 'Elementary impulse control, sibling dynamic mediation, maker engineering, and healthy gaming readiness.',
    icon: Sparkles,
    courses: [
      {
        category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        categoryLabel: 'Behavior & Emotions',
        categoryIcon: Brain,
        title: 'Elementary Impulse Control & Sibling Dynamics',
        summary: 'Navigating dopamine transition resistance, stopping anger, and mediating sibling rivalry.',
        slug: 'behavior-elementary-impulses',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.HEALTH_AND_WELLNESS,
        categoryLabel: 'Pediatric Health & Sleep',
        categoryIcon: HeartPulse,
        title: 'Middle Childhood Physical Health & Sleep',
        summary: 'Protecting 9-11 hour sleep windows, pediatric sports injury prevention, and convalescence.',
        slug: 'health-elementary-wellness',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.NUTRITION_AND_FEEDING,
        categoryLabel: 'Nutrition & Mealtime',
        categoryIcon: Utensils,
        title: 'Elementary Fuel & Sustained Focus',
        summary: 'Brain fuel lunchboxes, 3:30 PM hangry meltdowns, and kitchen agency.',
        slug: 'nutrition-elementary-fuel',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.DEVELOPMENT_AND_PLAY,
        categoryLabel: 'Development & Play',
        categoryIcon: Puzzle,
        title: 'Logic, Spatial Strategy & Creative Maker Play',
        summary: 'Spatial reasoning, cardboard maker engineering, and cooperative board games.',
        slug: 'play-elementary-logic-maker',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.DIGITAL_AND_DEVICES,
        categoryLabel: 'Digital & Devices',
        categoryIcon: Smartphone,
        title: 'First Gaming, Dopamine Loops & Readiness',
        summary: 'Roblox/Minecraft dopamine engines, smartphone readiness indicators, and open room rules.',
        slug: 'digital-elementary-first-gaming',
        lessonCount: 3,
        durationMinutes: 14,
      },
    ],
  },
  {
    id: 'pre-teens',
    tier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    tabLabel: 'Pre-Teens & Tweens',
    ageLabel: 'Ages 10–12',
    title: 'Autonomy, Modern Tech & Youth Culture',
    subtitle: 'Navigating adrenarche, pubertal physical leaps, deep flow state hobbies, and bilateral phone agreements.',
    icon: Smartphone,
    courses: [
      {
        category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        categoryLabel: 'Behavior & Emotions',
        categoryIcon: Brain,
        title: 'Tween Adrenarche & Emotional Volatility',
        summary: 'Decoding adrenarche, peer obsession, eye-rolls, and group chat social friction.',
        slug: 'behavior-tween-adrenarche',
        lessonCount: 3,
        durationMinutes: 14,
      },
      {
        category: AcademyCategory.HEALTH_AND_WELLNESS,
        categoryLabel: 'Pediatric Health & Sleep',
        categoryIcon: HeartPulse,
        title: 'Pubertal Physical Leaps & Circadian Delays',
        summary: 'Melatonin phase delay, pubertal hygiene, and evening screen hardware boundaries.',
        slug: 'health-tween-circadian-leaps',
        lessonCount: 3,
        durationMinutes: 14,
      },
      {
        category: AcademyCategory.NUTRITION_AND_FEEDING,
        categoryLabel: 'Nutrition & Mealtime',
        categoryIcon: Utensils,
        title: 'Pre-Teen Growth Spurts & Food Relationship',
        summary: 'Fueling bone leaps, non-judgmental body image conversations, and peer snacking.',
        slug: 'nutrition-tween-growth-spurts',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.DEVELOPMENT_AND_PLAY,
        categoryLabel: 'Development & Play',
        categoryIcon: Puzzle,
        title: 'Pre-Teen Focus, Flow State & Deep Hobbies',
        summary: 'Protecting uninterrupted creative hobbies, metacognitive study, and creative tech.',
        slug: 'play-tween-flow-hobbies',
        lessonCount: 3,
        durationMinutes: 13,
      },
      {
        category: AcademyCategory.DIGITAL_AND_DEVICES,
        categoryLabel: 'Digital & Devices',
        categoryIcon: Smartphone,
        title: 'Tween Smartphone Transition & Family Pacts',
        summary: 'Group chat anxiety, drafting bilateral agreements, and the neutral 8:30 PM bed dock.',
        slug: 'digital-tween-smartphone-pacts',
        lessonCount: 3,
        durationMinutes: 14,
      },
    ],
  },
  {
    id: 'early-adolescence',
    tier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    tabLabel: 'Early Adolescence',
    ageLabel: 'Ages 13–15',
    title: 'Biological Circadian Delay & Algorithmic Defense',
    subtitle: 'Protecting adolescent sleep architecture, sports nutrition, media literacy, and digital reputation.',
    icon: Moon,
    courses: [
      {
        category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        categoryLabel: 'Behavior & Emotions',
        categoryIcon: Brain,
        title: 'Adolescent Identity, Defiance & Boundaries',
        summary: 'Transforming power struggles into collaborative problem-solving and non-punitive repair.',
        slug: 'behavior-adolescent-identity',
        lessonCount: 3,
        durationMinutes: 13,
      },
      {
        category: AcademyCategory.HEALTH_AND_WELLNESS,
        categoryLabel: 'Pediatric Health & Sleep',
        categoryIcon: HeartPulse,
        title: 'Adolescent Sleep Protection & Athletic Health',
        summary: 'The 2-hour biological circadian delay, athletic rest days, and avoiding burnout.',
        slug: 'health-adolescent-sleep-protection',
        lessonCount: 3,
        durationMinutes: 13,
      },
      {
        category: AcademyCategory.NUTRITION_AND_FEEDING,
        categoryLabel: 'Nutrition & Mealtime',
        categoryIcon: Utensils,
        title: 'Adolescent Metabolic Demands & Sports Nutrition',
        summary: 'Pubertal caloric requirements, pre/post workout hydration, and spotting disordered eating.',
        slug: 'nutrition-adolescent-sports-fuel',
        lessonCount: 3,
        durationMinutes: 14,
      },
      {
        category: AcademyCategory.DEVELOPMENT_AND_PLAY,
        categoryLabel: 'Development & Play',
        categoryIcon: Puzzle,
        title: 'Critical Thinking & Media Literacy',
        summary: 'Deconstructing AI and algorithmic feeds, deep work mastery, and team ventures.',
        slug: 'play-adolescent-critical-thinking',
        lessonCount: 3,
        durationMinutes: 13,
      },
      {
        category: AcademyCategory.DIGITAL_AND_DEVICES,
        categoryLabel: 'Digital & Devices',
        categoryIcon: Smartphone,
        title: 'Adolescent Algorithmic Feeds & Digital Reputation',
        summary: 'Algorithmic rabbit holes, screenshot permanence, and building trust after breach.',
        slug: 'digital-adolescent-algorithmic-feeds',
        lessonCount: 3,
        durationMinutes: 14,
      },
    ],
  },
  {
    id: 'late-adolescence',
    tier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    tabLabel: 'Late Adolescence',
    ageLabel: 'Ages 16–18',
    title: 'Executive Autonomy, Digital Footprint & Launch',
    subtitle: 'Guiding adult sovereignty, lifelong food habits, intellectual strategy, and young adult digital covenants.',
    icon: GraduationCap,
    courses: [
      {
        category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        categoryLabel: 'Behavior & Emotions',
        categoryIcon: Brain,
        title: 'Late Teen Autonomy & Emotional Sovereignty',
        summary: 'Navigating driving, curfews, mutual respect, and preparing for the adult launch.',
        slug: 'behavior-teen-autonomy',
        lessonCount: 3,
        durationMinutes: 13,
      },
      {
        category: AcademyCategory.HEALTH_AND_WELLNESS,
        categoryLabel: 'Pediatric Health & Sleep',
        categoryIcon: HeartPulse,
        title: 'Young Adult Physical Autonomy & Wellness',
        summary: 'Healthcare independence, breaking all-nighter habits, and preventative wellness.',
        slug: 'health-young-adult-wellness',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.NUTRITION_AND_FEEDING,
        categoryLabel: 'Nutrition & Mealtime',
        categoryIcon: Utensils,
        title: 'Teen Food Sovereignty & Lifelong Habits',
        summary: '5 scratch meals before leaving home, the energy drink epidemic, and intuitive eating.',
        slug: 'nutrition-teen-food-sovereignty',
        lessonCount: 3,
        durationMinutes: 12,
      },
      {
        category: AcademyCategory.DEVELOPMENT_AND_PLAY,
        categoryLabel: 'Development & Play',
        categoryIcon: Puzzle,
        title: 'Intellectual Mastery & Real-World Strategy',
        summary: 'Long-range executive prioritization, Socratic debate, and personal financial architecture.',
        slug: 'play-teen-intellectual-mastery',
        lessonCount: 3,
        durationMinutes: 13,
      },
      {
        category: AcademyCategory.DIGITAL_AND_DEVICES,
        categoryLabel: 'Digital & Devices',
        categoryIcon: Smartphone,
        title: 'Teen Digital Independence & Young Adult Covenant',
        summary: 'Full digital sovereignty, cyber defense against scams, and respectful bilateral privacy.',
        slug: 'digital-teen-digital-independence',
        lessonCount: 3,
        durationMinutes: 13,
      },
    ],
  },
];

/**
 * Backward-compatible 4-stage array mapping to PLAN-23 expectations.
 */
export const LIFESPAN_STAGES: StageData[] = [
  CANONICAL_6_LIFESPAN_STAGES[0]!,
  CANONICAL_6_LIFESPAN_STAGES[1]!,
  CANONICAL_6_LIFESPAN_STAGES[2]!,
  {
    ...CANONICAL_6_LIFESPAN_STAGES[3]!,
    id: 'preteens-adolescents',
    tabLabel: 'Pre-Teens & Adolescents',
    ageLabel: 'Ages 10–18',
    title: 'Autonomy, Modern Tech & Youth Culture',
  },
];

export function LifespanStageSelector() {
  const [activeStageId, setActiveStageId] = useState<string>('infants-toddlers');

  const activeStage =
    CANONICAL_6_LIFESPAN_STAGES.find((s) => s.id === activeStageId) ?? CANONICAL_6_LIFESPAN_STAGES[0]!;

  return (
    <section id="stages" className="pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
      {/* Editorial Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E3E3DC] bg-white px-3 py-1 text-xs font-semibold text-[#143D2B]">
          <span className="font-mono text-[11px] uppercase tracking-wider">
            VOL. XXIV // CONTINUOUS LIFESPAN (0–18)
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#111413]">
          Tailored Advisory for Every <em className="italic font-normal text-[#143D2B]">Developmental Horizon</em>
        </h2>
        <p className="text-base text-[#494F4C] leading-relaxed">
          Every age presents distinct developmental leaps and parenting challenges. Explore our clinical curriculum tailored specifically for your child&apos;s age across 5 core growth categories.
        </p>
      </div>

      {/* Responsive Horizontal Age Stage Tabs (6 Stages) */}
      <div
        role="tablist"
        aria-label="Developmental Horizons"
        className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 mb-8 no-scrollbar bg-[#F4F4F0] border border-[#E3E3DC] p-1.5 rounded-[6px]"
      >
        {CANONICAL_6_LIFESPAN_STAGES.map((stage) => {
          const isActive = stage.id === activeStageId;
          const StageIcon = stage.icon;
          return (
            <button
              key={stage.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveStageId(stage.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-[5px] text-xs font-bold shrink-0 transition-all cursor-pointer min-h-[44px] ${
                isActive
                  ? 'bg-white text-[#111413] shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-[#E3E3DC]'
                  : 'bg-transparent text-[#494F4C] hover:text-[#111413] hover:bg-white/60'
              }`}
            >
              <StageIcon className={`h-4 w-4 ${isActive ? 'text-[#143D2B]' : 'text-[#858C88]'}`} />
              <span>{stage.tabLabel}</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-[#EAF3EE] text-[#143D2B] font-semibold' : 'bg-[#E3E3DC]/60 text-[#494F4C]'
                }`}
              >
                {stage.ageLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Presentation: Banner + 5-Category Course Grid */}
      <div className="space-y-6">
        {/* Stage Header Banner */}
        <div className="rounded-[10px] border border-[#E3E3DC] bg-white text-[#111413] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_1px_2px_rgba(17,20,19,0.04)]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#143D2B] bg-[#EAF3EE] px-2.5 py-0.5 rounded-full border border-[#143D2B]/20">
                HORIZON // {activeStage.ageLabel}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#111413]">
              {activeStage.title}
            </h3>
            <p className="text-sm text-[#494F4C] leading-relaxed">
              {activeStage.subtitle}
            </p>
          </div>

          <Link href={`/academy?tier=${activeStage.tier}`} className="shrink-0">
            <Button
              variant="forest"
              size="lg"
              className="gap-2 font-bold min-h-[44px] shadow-sm"
            >
              <span>Explore {activeStage.tabLabel} Curriculum</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* 5-Category Tailored Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {activeStage.courses.map((course) => {
            const CategoryIcon = course.categoryIcon;
            return (
              <div
                key={course.slug}
                className="group rounded-[10px] border border-[#E3E3DC] bg-white p-5 flex flex-col justify-between hover:border-[#143D2B]/30 hover:shadow-[0_2px_8px_rgba(20,61,43,0.06)] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#143D2B] bg-[#EAF3EE] border border-[#143D2B]/15 px-2.5 py-0.5 rounded-full">
                      <CategoryIcon className="h-3 w-3" />
                      {course.categoryLabel}
                    </span>
                    <span className="font-mono text-[10px] text-[#858C88] font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.durationMinutes} min
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#111413] leading-snug group-hover:text-[#143D2B] transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs text-[#494F4C] leading-relaxed line-clamp-3 mt-2">
                    {course.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EDEDEA] flex items-center justify-between text-xs">
                  <span className="text-[#858C88] font-mono text-[11px] flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {course.lessonCount} lessons
                  </span>
                  <Link
                    href={`/academy/${course.slug}`}
                    className="font-bold text-[#143D2B] hover:text-[#0C2419] inline-flex items-center gap-1 group/link"
                  >
                    <span>View Course</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Reassuring Footer Callout */}
        <div className="rounded-[10px] border border-[#E3E3DC] bg-[#F4F4F0] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF3EE] text-[#143D2B]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#111413]">
                <strong className="text-[#143D2B] font-bold">Continuous Lifespan Curriculum:</strong> 5 tailored clinical modules calibrated for {activeStage.ageLabel} ({activeStage.tabLabel})
              </p>
              <p className="text-xs text-[#494F4C]">
                Clinically peer-reviewed guidance covering every core developmental domain without shame or surveillance.
              </p>
            </div>
          </div>
          <Link href="/academy" className="shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 font-bold text-xs border-[#E3E3DC] bg-white hover:bg-[#EAF3EE] text-[#143D2B]"
            >
              <span>Browse All Academy Categories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
