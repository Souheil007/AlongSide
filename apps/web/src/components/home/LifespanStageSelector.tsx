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
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { AcademyCategory, DevelopmentalTier } from '@alongside/shared';
import { Button } from '@/components/ui/Button';

export interface StageLesson {
  num: string;
  title: string;
  dur: string;
}

export interface StageCourse {
  category: AcademyCategory;
  categoryLabel: string;
  categoryIcon: LucideIcon;
  title: string;
  summary: string;
  slug: string;
  lessonCount: number;
  durationMinutes: number;
  clinicalNote: string;
  lessons: StageLesson[];
}

export interface StageData {
  id: string;
  tier: DevelopmentalTier;
  tabLabel: string;
  shortLabel: string;
  ageLabel: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  courses: StageCourse[];
}

/**
 * Canonical 8 Developmental Lifespan Advisory Tiers (AlongSide v2.6.0)
 * Covering all 8 tiers: 0A (0-1), 0B (1-2), 0C (2-3), 1 (4-6), 2 (7-9), 3 (10-12), 4 (13-15), 5 (16-18)
 * Each tier showcases the 5 canonical Academy category courses tailored to child age,
 * complete with clinical rationale notes and 3-lesson micro-syllabi (40 courses total).
 */
export const CANONICAL_8_LIFESPAN_STAGES: StageData[] = [
  {
    id: 'infancy-0-1',
    tier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
    tabLabel: 'Infancy',
    shortLabel: 'Infants',
    ageLabel: 'Ages 0–1',
    title: 'Physical Health, Sleep Architecture & Safe Feeding Foundations',
    subtitle: 'Circadian entrainment, exclusive milk/formula foundations, responsive soothing & secure attachment.',
    icon: Baby,
    courses: [
      {
        category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        categoryLabel: 'Behavior & Emotions',
        categoryIcon: Brain,
        title: 'Sensory Overload & Infant Co-Regulation',
        summary: 'Master how the newborn and infant brain builds secure attachment, why crying curves peak at 6-8 weeks, and how to anchor parental calm.',
        slug: 'behavior-infant-coregulation',
        lessonCount: 3,
        durationMinutes: 13,
        clinicalNote: 'Clinical Focus: Infant limbic system, crying curves & vagal tone co-regulation.',
        lessons: [
          { num: '01', title: 'Infant Limbic System & The Crying Curve', dur: '4 min' },
          { num: '02', title: 'Vagal Tone & Physical Soothing Cadence', dur: '5 min' },
          { num: '03', title: 'Sensory Resets for Overwhelmed Parents', dur: '4 min' },
        ],
      },
      {
        category: AcademyCategory.HEALTH_AND_WELLNESS,
        categoryLabel: 'Pediatric Health & Sleep',
        categoryIcon: HeartPulse,
        title: 'Infant Health Foundations & Sleep Architecture',
        summary: 'Circadian entrainment, wake windows (45-90 min), safe sleep ergonomics, and fever triage thresholds in the first 90 days.',
        slug: 'health-infant-sleep-foundations',
        lessonCount: 3,
        durationMinutes: 13,
        clinicalNote: 'Clinical Focus: Cortisol cycles, wake window tracking & neonatal fever thresholds.',
        lessons: [
          { num: '01', title: 'Circadian Rhythms & 4-Month Sleep Regression', dur: '4 min' },
          { num: '02', title: 'Safe Sleep Guidelines & Swaddle Transition', dur: '4 min' },
          { num: '03', title: 'Fever Guidelines in the First 90 Days', dur: '5 min' },
        ],
      },
      {
        category: AcademyCategory.NUTRITION_AND_FEEDING,
        categoryLabel: 'Nutrition & Mealtime',
        categoryIcon: Utensils,
        title: 'Infant First Foods & Allergen Introduction',
        summary: 'Exclusive breastmilk/formula foundations, recognizing early readiness signs, and the critical 4–6 month allergen tolerance window.',
        slug: 'nutrition-infant-first-foods',
        lessonCount: 3,
        durationMinutes: 13,
        clinicalNote: 'Clinical Focus: The 4-6 month immunological window for peanut and egg tolerance.',
        lessons: [
          { num: '01', title: 'Feeding Cues vs Tired Signs in Early Infancy', dur: '4 min' },
          { num: '02', title: 'The 4–6 Month Critical Allergen Window', dur: '5 min' },
          { num: '03', title: 'First Purees and Spoon-Feeding Pacing', dur: '4 min' },
        ],
      },
      {
        category: AcademyCategory.DEVELOPMENT_AND_PLAY,
        categoryLabel: 'Development & Play',
        categoryIcon: Puzzle,
        title: 'Serve-and-Return Attunement & Floor Time',
        summary: 'Mirror neuron attunement, vocal turn-taking, tummy time progression, and tactile sensory discovery.',
        slug: 'play-infant-sensory-language',
        lessonCount: 3,
        durationMinutes: 12,
        clinicalNote: 'Clinical Focus: Serve-and-return synaptogenesis & tummy-time motor milestones.',
        lessons: [
          { num: '01', title: 'The Science of Serve-and-Return Interaction', dur: '4 min' },
          { num: '02', title: 'Tummy Time Milestones & Gross Motor Scaffolding', dur: '4 min' },
          { num: '03', title: 'Sensory Puppet Play & Eye-Contact Attunement', dur: '4 min' },
        ],
      },
      {
        category: AcademyCategory.DIGITAL_AND_DEVICES,
        categoryLabel: 'Digital & Devices',
        categoryIcon: Smartphone,
        title: 'Zero Screens Under 2 & Parent Tech Modeling',
        summary: 'Zero-screen clinical rules, parental technoference prevention, and establishing nursery tech-free sanctuaries.',
        slug: 'digital-infant-zero-screens',
        lessonCount: 3,
        durationMinutes: 12,
        clinicalNote: 'Clinical Focus: AAP zero-screen mandate & infant gaze attachment buffers.',
        lessons: [
          { num: '01', title: 'Why Developing Neural Paths Require Zero Screens', dur: '4 min' },
          { num: '02', title: 'Parent Phubbing and Infant Eye-Contact Delay', dur: '4 min' },
          { num: '03', title: 'Creating Screen-Free Nurseries and Sanctuaries', dur: '4 min' },
        ],
      },
    ],
  },
  {
    id: 'toddler-1-2',
    tier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
    tabLabel: 'Younger Toddler',
    shortLabel: 'Toddlers (1–2)',
    ageLabel: 'Ages 1–2',
    title: 'Locomotion, First Words & Amygdala Co-Regulation',
    subtitle: 'Walking agility, pre-verbal meltdowns, external nervous system co-regulation & exploratory boundaries.',
    icon: Baby,
    courses: [
      {
        category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        categoryLabel: 'Behavior & Emotions',
        categoryIcon: Brain,
        title: 'Pre-Verbal Tantrums & Biting De-escalation',
        summary: 'Limbic overflow in 1-2 year olds, pre-verbal frustration, redirecting biting/hitting, and calm boundary containment.',
        slug: 'behavior-toddler-biting-tantrums',
        lessonCount: 3,
        durationMinutes: 13,
        clinicalNote: 'Clinical Focus: Amygdala limbic overflow & sensory containment without punitive isolation.',
        lessons: [
          { num: '01', title: 'Why 1-Year-Olds Hit, Bite, and Drop to the Floor', dur: '4 min' },
          { num: '02', title: 'The External Nervous System: Parent Co-Regulation', dur: '5 min' },
          { num: '03', title: 'De-escalating Public Meltdowns Without Bribes', dur: '4 min' },
        ],
      },
      {
        category: AcademyCategory.HEALTH_AND_WELLNESS,
        categoryLabel: 'Pediatric Health & Sleep',
        categoryIcon: HeartPulse,
        title: 'Toddler Sleep Regressions & 2-to-1 Nap Transitions',
        summary: 'Navigating the 15-month sleep regression, moving from 2 naps to 1, and establishing bedtime consistency.',
        slug: 'health-toddler-nap-transitions',
        lessonCount: 3,
        durationMinutes: 13,
        clinicalNote: 'Clinical Focus: Sleep consolidation cycles & cortisol stabilization during nap transitions.',
        lessons: [
          { num: '01', title: 'The 2-to-1 Nap Transition Signs & Schedule', dur: '4 min' },
          { num: '02', title: 'Separation Anxiety at Bedtime: Calming Anchors', dur: '5 min' },
          { num: '03', title: 'Toddler Teething Pain & Nighttime Disruption', dur: '4 min' },
        ],
      },
      {
        category: AcademyCategory.NUTRITION_AND_FEEDING,
        categoryLabel: 'Nutrition & Mealtime',
        categoryIcon: Utensils,
        title: 'Toddler Table Foods & Baby-Led Weaning',
        summary: 'Finger foods, family table integration, gagging vs choking distinction, and balanced nutrient pacing.',
        slug: 'nutrition-toddler-table-transition',
        lessonCount: 3,
        durationMinutes: 13,
        clinicalNote: 'Clinical Focus: Hypopharyngeal choking vs gagging reflexes and division of mealtime responsibility.',
        lessons: [
          { num: '01', title: 'Choking vs Gagging: The Hypopharyngeal Reflex', dur: '4 min' },
          { num: '02', title: 'Transitioning to Whole Milk & Water Cups', dur: '4 min' },
          { num: '03', title: 'Division of Responsibility at the Toddler Table', dur: '5 min' },
        ],
      },
      {
        category: AcademyCategory.DEVELOPMENT_AND_PLAY,
        categoryLabel: 'Development & Play',
        categoryIcon: Puzzle,
        title: 'First Words & Cause-and-Effect Locomotion Play',
        summary: 'Walking agility, expressive vocabulary emergence, naming objects, and simple obstacle courses.',
        slug: 'development-toddler-locomotion-play',
        lessonCount: 3,
        durationMinutes: 12,
        clinicalNote: 'Clinical Focus: First 50 words threshold and vestibular proprioception in upright locomotion.',
        lessons: [
          { num: '01', title: 'First 50 Words & Language Burst Milestones', dur: '4 min' },
          { num: '02', title: 'Gross Motor Locomotion & Fall-Safe Exploration', dur: '4 min' },
          { num: '03', title: 'Container Play & Cause-and-Effect Exploration', dur: '4 min' },
        ],
      },
      {
        category: AcademyCategory.DIGITAL_AND_DEVICES,
        categoryLabel: 'Digital & Devices',
        categoryIcon: Smartphone,
        title: 'Background TV Elimination & Sensory Protection',
        summary: 'How ambient TV noise interrupts toddler play focus and speech development, plus audio-only alternatives.',
        slug: 'digital-toddler-background-screens',
        lessonCount: 3,
        durationMinutes: 12,
        clinicalNote: 'Clinical Focus: Auditory processing fragmentation from background media ("technoference").',
        lessons: [
          { num: '01', title: 'The Hidden Cognitive Cost of Background Screens', dur: '4 min' },
          { num: '02', title: 'Ambient Noise vs Toddler Deep Focus Play', dur: '4 min' },
          { num: '03', title: 'Audio Stories & Music as Screen Replacements', dur: '4 min' },
        ],
      },
    ],
  },
  {
    id: 'older-toddler-2-3',
    tier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    tabLabel: 'Older Toddler',
    shortLabel: 'Toddlers (2–3)',
    ageLabel: 'Ages 2–3',
    title: 'Autonomy, Boundary Testing & Potty Readiness',
    subtitle: 'Willful autonomy, firm loving limits without shame, emotional labeling & toilet learning readiness.',
    icon: Baby,
    courses: [
      {
        category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        categoryLabel: 'Behavior & Emotions',
        categoryIcon: Brain,
        title: 'Autonomy Battles, Limit Setting & Grocery Tantrums',
        summary: 'Navigating Erikson\'s Autonomy vs Shame, setting loving firm limits without guilt, and handling the "No!" phase.',
        slug: 'behavior-older-toddler-grocery-tantrum',
        lessonCount: 3,
        durationMinutes: 13,
        clinicalNote: 'Clinical Focus: Eriksonian autonomy development & boundary containment without shame.',
        lessons: [
          { num: '01', title: 'Autonomy vs Shame: The Neurobiology of "No!"', dur: '4 min' },
          { num: '02', title: 'Loving Limits: Holding Firm Without Yelling', dur: '5 min' },
          { num: '03', title: 'Grocery Store Tantrum Protocol: Step-by-Step', dur: '4 min' },
        ],
      },
      {
        category: AcademyCategory.HEALTH_AND_WELLNESS,
        categoryLabel: 'Pediatric Health & Sleep',
        categoryIcon: HeartPulse,
        title: 'Physiological Potty Learning & Night Enuresis',
        summary: 'Assessing neurological and physical readiness for toilet training, eliminating pressure, and handling accidents.',
        slug: 'health-older-toddler-potty-learning',
        lessonCount: 3,
        durationMinutes: 13,
        clinicalNote: 'Clinical Focus: Autonomic bladder control myelination & stress-free toilet protocols.',
        lessons: [
          { num: '01', title: 'Readiness Signs: When the Nervous System is Ready', dur: '4 min' },
          { num: '02', title: 'Child-Led Potty Routine Without Coercion', dur: '5 min' },
          { num: '03', title: 'Accidents, Regression & Nighttime Enuresis', dur: '4 min' },
        ],
      },
      {
        category: AcademyCategory.NUTRITION_AND_FEEDING,
        categoryLabel: 'Nutrition & Mealtime',
        categoryIcon: Utensils,
        title: 'Toddler Food Strikes & Pressure-Free Meals',
        summary: 'Managing natural food neophobia, repetitive menu demands, and zero-battle mealtime strategies.',
        slug: 'nutrition-older-toddler-picky-eating',
        lessonCount: 3,
        durationMinutes: 13,
        clinicalNote: 'Clinical Focus: Evolutionary food neophobia & eliminating mealtime power struggles.',
        lessons: [
          { num: '01', title: 'Developmental Food Neophobia Explained', dur: '4 min' },
          { num: '02', title: 'The "One Safe Food" Plate Architecture', dur: '4 min' },
          { num: '03', title: 'Preventing Power Struggles at Dinner', dur: '5 min' },
        ],
      },
      {
        category: AcademyCategory.DEVELOPMENT_AND_PLAY,
        categoryLabel: 'Development & Play',
        categoryIcon: Puzzle,
        title: 'Block Construction, Turn Taking & Early Pre-K Play',
        summary: 'Pretend play, simple peer parallel play turning into associative play, and fine motor scissor/crayon readiness.',
        slug: 'development-older-toddler-constructive-play',
        lessonCount: 3,
        durationMinutes: 12,
        clinicalNote: 'Clinical Focus: Pre-operational symbolic play & delay-of-gratification scaffolding.',
        lessons: [
          { num: '01', title: 'Parallel to Associative Play Transitions', dur: '4 min' },
          { num: '02', title: 'Block Towers & Spatial Problem Solving', dur: '4 min' },
          { num: '03', title: 'Turn-Taking Games and Delayed Gratification', dur: '4 min' },
        ],
      },
      {
        category: AcademyCategory.DIGITAL_AND_DEVICES,
        categoryLabel: 'Digital & Devices',
        categoryIcon: Smartphone,
        title: 'Screen-Free Transition Rituals & Calming Alternatives',
        summary: 'Handling device transition meltdowns, intentional co-viewing rules if used, and tactile wind-downs.',
        slug: 'digital-older-toddler-co-viewing',
        lessonCount: 3,
        durationMinutes: 12,
        clinicalNote: 'Clinical Focus: Dopaminergic transition crashes & tactile sensory bridge rituals.',
        lessons: [
          { num: '01', title: 'Why Ending Screen Time Causes Severe Dysregulation', dur: '4 min' },
          { num: '02', title: 'Visual Timers & Tactile Transition Bridges', dur: '4 min' },
          { num: '03', title: 'Active Co-Viewing: Asking Narrative Questions', dur: '4 min' },
        ],
      },
    ],
  },
  {
    id: 'early-childhood',
    tier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    tabLabel: 'Early Childhood',
    shortLabel: 'Early',
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
        clinicalNote: 'Clinical Focus: Frontal lobe maturation & verbal naming of emotional states.',
        lessons: [
          { num: '01', title: 'Prefrontal Development & Overwhelm Triggers', dur: '4 min' },
          { num: '02', title: 'Scripting Co-Regulation in the Storm', dur: '5 min' },
          { num: '03', title: 'Post-Tantrum Repair & Safety', dur: '3 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Delta-wave sleep transitions & parasomnias.',
        lessons: [
          { num: '01', title: 'Daycare Illness Cycles & Natural Immunity', dur: '4 min' },
          { num: '02', title: 'Night Terrors vs Nightmares Differences', dur: '4 min' },
          { num: '03', title: 'Wind-Down Rituals for Sensory Preschoolers', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Ellyn Satter Division of Responsibility protocol.',
        lessons: [
          { num: '01', title: 'The Division of Responsibility in Feeding', dur: '4 min' },
          { num: '02', title: 'Sensory Sensitivities to Textures', dur: '4 min' },
          { num: '03', title: 'Neutral Exposure: Ending Dinner Struggles', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Theory of Mind development & cooperative play.',
        lessons: [
          { num: '01', title: 'The Cognitive Architecture of Pretend Play', dur: '4 min' },
          { num: '02', title: 'Sharing & Turn-Taking Conflict', dur: '4 min' },
          { num: '03', title: 'Fostering Sibling Harmony', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Dopamine saturation in high-BPM preschool animations.',
        lessons: [
          { num: '01', title: 'Fast-Paced vs Slow Animation Overstimulation', dur: '4 min' },
          { num: '02', title: 'Co-Viewing Strategies for Media Literacy', dur: '4 min' },
          { num: '03', title: 'Visual Timers & Tear-Free Screen Transitions', dur: '4 min' },
        ],
      },
    ],
  },
  {
    id: 'middle-childhood',
    tier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    tabLabel: 'Middle Childhood',
    shortLabel: 'Middle',
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
        clinicalNote: 'Clinical Focus: Executive function scaffolding & metacognition.',
        lessons: [
          { num: '01', title: 'Scaffolding Working Memory in Grade School', dur: '4 min' },
          { num: '02', title: 'Teaching Self-Advocacy in the Classroom', dur: '4 min' },
          { num: '03', title: 'Managing Sibling Rivalry & Justice', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Growth plate protection & deep REM sleep cycles.',
        lessons: [
          { num: '01', title: 'Recognizing Growth Spurts & Needs', dur: '4 min' },
          { num: '02', title: 'Youth Athletics: Injury Prevention', dur: '4 min' },
          { num: '03', title: 'Consistent 9-Hour Sleep Schedules', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Body image formation & glycemic stability.',
        lessons: [
          { num: '01', title: 'Fostering Intuitive Eating Cues', dur: '4 min' },
          { num: '02', title: 'Neutral Body Language at Home', dur: '4 min' },
          { num: '03', title: 'Packing School Lunches for Focus', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Peer validation & reciprocal social play.',
        lessons: [
          { num: '01', title: 'The Shift Toward Peer Validation', dur: '4 min' },
          { num: '02', title: 'Navigating Cliques & Playground Politics', dur: '4 min' },
          { num: '03', title: 'Preserving Unstructured Curiosity', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Variable ratio schedules in sandbox gaming.',
        lessons: [
          { num: '01', title: 'Deconstructing Video Game Dopamine Loops', dur: '5 min' },
          { num: '02', title: 'The Living Room Open-Screen Rule', dur: '5 min' },
          { num: '03', title: 'Pre-Agreed Session Wrap-Ups', dur: '4 min' },
        ],
      },
    ],
  },
  {
    id: 'pre-teens',
    tier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    tabLabel: 'Pre-Teens & Tweens',
    shortLabel: 'Tweens',
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
        clinicalNote: 'Clinical Focus: Limbic system sensitivity & puberty gonadotropins.',
        lessons: [
          { num: '01', title: 'The Amygdala-Prefrontal Gap in Tweens', dur: '5 min' },
          { num: '02', title: 'From Co-Regulation to Guided Autonomy', dur: '5 min' },
          { num: '03', title: 'Navigating Mood Swings with Empathy', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Circadian phase delay & pubertal skin changes.',
        lessons: [
          { num: '01', title: 'The Melatonin Shift: Why Tweens Resist Sleep', dur: '5 min' },
          { num: '02', title: 'Puberty Physical Changes & Body Odor', dur: '5 min' },
          { num: '03', title: 'Tech-Free Bedroom Sleep Sanctuary', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Bone mineral accretion & macronutrient density.',
        lessons: [
          { num: '01', title: 'Nutritional Surges During Peak Growth', dur: '4 min' },
          { num: '02', title: 'Snack Autonomy: Teaching Balanced Choices', dur: '4 min' },
          { num: '03', title: 'Deconstructing Energy Drinks Marketing', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Intrinsic motivation & identity development.',
        lessons: [
          { num: '01', title: 'Fostering Authentic Passions Beyond School', dur: '4 min' },
          { num: '02', title: 'Creative Outlets as Stress Buffers', dur: '5 min' },
          { num: '03', title: 'Balancing Scheduled Activities & Downtime', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Bilateral family agreements & neutral sleep docks.',
        lessons: [
          { num: '01', title: 'Group Chat Dynamics, FOMO & Peer Pressure', dur: '5 min' },
          { num: '02', title: 'Drafting the Bilateral Family Agreement', dur: '5 min' },
          { num: '03', title: 'The Neutral 8:30 PM Hardware Bed Dock', dur: '4 min' },
        ],
      },
    ],
  },
  {
    id: 'early-adolescence',
    tier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    tabLabel: 'Early Adolescence',
    shortLabel: 'Teens',
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
        clinicalNote: 'Clinical Focus: Synaptic pruning in the prefrontal cortex & individuation.',
        lessons: [
          { num: '01', title: 'Individuation: Why Teens Pull Away', dur: '4 min' },
          { num: '02', title: 'Mental Health Triage: Anxiety vs Stress', dur: '5 min' },
          { num: '03', title: 'Moving from Manager to Consultant Parent', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Sleep debt accumulation & mood vulnerability.',
        lessons: [
          { num: '01', title: 'The 2-Hour Circadian Phase Delay in Teens', dur: '4 min' },
          { num: '02', title: 'Melatonin Suppression & Late-Night Screens', dur: '5 min' },
          { num: '03', title: 'Building Realistic Weekend Sleep Balance', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Orthorexia prevention & adolescent body neutrality.',
        lessons: [
          { num: '01', title: 'Empowering Healthy Cooking & Independence', dur: '5 min' },
          { num: '02', title: 'Guarding Against Social Media Diet Fads', dur: '5 min' },
          { num: '03', title: 'Athlete Fueling: Pre-Game Prep & Hydration', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Positive Youth Development (PYD) framework.',
        lessons: [
          { num: '01', title: 'Youth Leadership, Volunteering & Social Connection', dur: '4 min' },
          { num: '02', title: 'Physical Expression as Emotional Anchors', dur: '5 min' },
          { num: '03', title: 'Mentorship Networks Outside Immediate Family', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Algorithmic social comparison & digital privacy.',
        lessons: [
          { num: '01', title: 'Deconstructing Algorithmic Attention Feeds', dur: '5 min' },
          { num: '02', title: 'Digital Permanence, Sexting & Legal Facts', dur: '5 min' },
          { num: '03', title: 'Self-Imposed Phone Boundaries with Friends', dur: '4 min' },
        ],
      },
    ],
  },
  {
    id: 'late-adolescence',
    tier: DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
    tabLabel: 'Late Adolescence',
    shortLabel: 'Launch',
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
        clinicalNote: 'Clinical Focus: Prefrontal myelination & adult executive agency.',
        lessons: [
          { num: '01', title: 'Scaffolding Long-Term Time Management', dur: '4 min' },
          { num: '02', title: 'Managing High Stakes Academic Transition Stress', dur: '5 min' },
          { num: '03', title: 'The Consultant Parent: Full Autonomy Prep', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Healthcare transition readiness & adult health literacy.',
        lessons: [
          { num: '01', title: 'Transitioning to Independent Medical Care', dur: '4 min' },
          { num: '02', title: 'Recognizing Burnout & Depression Symptoms', dur: '4 min' },
          { num: '03', title: 'Healthy Sleep Practices for College Life', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Lifelong metabolic resilience & nutritional budgeting.',
        lessons: [
          { num: '01', title: 'Grocery Shopping, Nutritional Labels & Budgeting', dur: '4 min' },
          { num: '02', title: 'Caffeine, Supplements & Alcohol Facts', dur: '4 min' },
          { num: '03', title: 'Sustained Energy Strategies for Exams', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Purpose-driven vocational identity & adult resilience.',
        lessons: [
          { num: '01', title: 'Discovering Core Values & Purpose Pathways', dur: '4 min' },
          { num: '02', title: 'Deep Friendships vs Acquaintance Networks', dur: '5 min' },
          { num: '03', title: 'Cultivating Recharging Movement & Rituals', dur: '4 min' },
        ],
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
        clinicalNote: 'Clinical Focus: Autonomous digital citizenship & cybersecurity defenses.',
        lessons: [
          { num: '01', title: 'Professional Digital Reputation Management', dur: '4 min' },
          { num: '02', title: 'Guarding Against Cyber Fraud & Identity Theft', dur: '5 min' },
          { num: '03', title: 'Autonomous Tech Boundaries for Adult Life', dur: '4 min' },
        ],
      },
    ],
  },
];

/**
 * Backward-compatible alias for CANONICAL_8_LIFESPAN_STAGES.
 */
export const CANONICAL_6_LIFESPAN_STAGES: StageData[] = CANONICAL_8_LIFESPAN_STAGES;

/**
 * Backward-compatible 4-stage array mapping to PLAN-23 expectations.
 */
export const LIFESPAN_STAGES: StageData[] = [
  {
    ...CANONICAL_8_LIFESPAN_STAGES[0]!,
    id: 'infants-toddlers',
    tabLabel: 'Infants & Toddlers',
    shortLabel: 'Infants',
    ageLabel: 'Ages 0–3',
    title: 'Physical Health, Milestones & Safe Feeding',
  },
  CANONICAL_8_LIFESPAN_STAGES[3]!,
  CANONICAL_8_LIFESPAN_STAGES[4]!,
  {
    ...CANONICAL_8_LIFESPAN_STAGES[5]!,
    id: 'preteens-adolescents',
    tabLabel: 'Pre-Teens & Adolescents',
    shortLabel: 'Teens',
    ageLabel: 'Ages 10–18',
    title: 'Autonomy, Modern Tech & Youth Culture',
  },
];

export function LifespanStageSelector() {
  const [activeStageId, setActiveStageId] = useState<string>('infancy-0-1');
  const [selectedCategory, setSelectedCategory] = useState<AcademyCategory>(
    AcademyCategory.BEHAVIOR_AND_EMOTIONS
  );

  const activeStage =
    CANONICAL_8_LIFESPAN_STAGES.find((s) => s.id === activeStageId) ??
    CANONICAL_8_LIFESPAN_STAGES[0]!;

  const activeCourse =
    activeStage.courses.find((c) => c.category === selectedCategory) ??
    activeStage.courses[0]!;

  const ActiveCategoryIcon = activeCourse.categoryIcon;

  const handleStageKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % CANONICAL_8_LIFESPAN_STAGES.length;
      setActiveStageId(CANONICAL_8_LIFESPAN_STAGES[nextIndex]!.id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex =
        (currentIndex - 1 + CANONICAL_8_LIFESPAN_STAGES.length) %
        CANONICAL_8_LIFESPAN_STAGES.length;
      setActiveStageId(CANONICAL_8_LIFESPAN_STAGES[prevIndex]!.id);
    }
  };

  return (
    <section id="stages" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
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

      {/* Calibrated Lifespan Spectrum Rail (8-Segment Wrapped Pill Rail) */}
      <div className="mb-6 space-y-3">
        <div
          role="tablist"
          aria-label="Developmental Horizons (Ages 0 to 18)"
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-[#F4F4F0] border border-[#E3E3DC] rounded-xl shadow-inner w-full"
        >
          {CANONICAL_8_LIFESPAN_STAGES.map((stage, idx) => {
            const isActive = stage.id === activeStageId;
            const StageIcon = stage.icon;

            return (
              <button
                key={stage.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveStageId(stage.id)}
                onKeyDown={(e) => handleStageKeyDown(e, idx)}
                className={`relative flex flex-col items-center justify-center py-2 px-1 sm:px-2 rounded-lg transition-all duration-200 cursor-pointer min-h-[46px] select-none text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-1 ${
                  isActive
                    ? 'bg-[#143D2B] text-white shadow-[0_2px_8px_rgba(20,61,43,0.22)] border border-[#143D2B]'
                    : 'bg-transparent text-[#494F4C] hover:text-[#111413] hover:bg-white/80 border border-transparent'
                }`}
              >
                {/* Desktop/Tablet Icon */}
                <StageIcon
                  className={`hidden md:block h-3.5 w-3.5 mb-0.5 ${
                    isActive ? 'text-[#EAF3EE]' : 'text-[#858C88]'
                  }`}
                />

                {/* Primary Age Anchor (Crisp & Legible on All Screens) */}
                <span
                  className={`font-mono text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-[#111413]'
                  }`}
                >
                  {stage.ageLabel.replace('Ages ', '')}
                </span>

                {/* Responsive Label: Micro on Mobile, Full on Desktop */}
                <span
                  className={`text-[9px] sm:text-[11px] font-medium leading-tight truncate w-full ${
                    isActive ? 'text-[#EAF3EE]' : 'text-[#6B726E]'
                  }`}
                >
                  <span className="inline md:hidden">{stage.shortLabel}</span>
                  <span className="hidden md:inline">{stage.tabLabel}</span>
                </span>

                {/* Active Indicator Pip */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#143D2B] ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* WHOLE-CHILD HORIZON COMPASS ARCHITECTURE (DESIGN C.3) */}
      <div className="rounded-[10px] border border-[#E3E3DC] bg-white p-5 sm:p-8 shadow-[0_4px_16px_rgba(20,61,43,0.06)] space-y-6 sm:space-y-8">
        
        {/* Upper Compass Segment Arc Hub */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#143D2B]/30" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#143D2B]">
              WHOLE-CHILD COMPASS // {activeStage.ageLabel} • 5 PILLARS OF DEVELOPMENT
            </span>
            <span className="w-8 h-px bg-[#143D2B]/30" />
          </div>

          {/* Interactive 5-Domain Connected Arc Bar */}
          <div
            role="tablist"
            aria-label="Core Growth Pillars"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full max-w-5xl"
          >
            {activeStage.courses.map((course) => {
              const CategoryIcon = course.categoryIcon;
              const isSelected = course.category === selectedCategory;

              return (
                <div key={course.slug} className="relative flex flex-col">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(course.category)}
                    className={`w-full text-left sm:text-center p-3.5 sm:p-4 rounded-[8px] border transition-all cursor-pointer flex flex-col items-start sm:items-center gap-1.5 min-h-[44px] ${
                      isSelected
                        ? 'bg-[#143D2B] text-white border-[#143D2B] shadow-[0_4px_14px_rgba(20,61,43,0.22)] -translate-y-0.5'
                        : 'bg-[#F4F4F0] text-[#111413] border-[#E3E3DC] hover:border-[#143D2B]/40 hover:bg-white hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-1 w-full justify-start sm:justify-center">
                      <CategoryIcon
                        className={`h-5 w-5 shrink-0 ${
                          isSelected ? 'text-[#EAF3EE]' : 'text-[#143D2B]'
                        }`}
                      />
                      <span
                        className={`text-xs font-bold leading-tight ${
                          isSelected ? 'text-white' : 'text-[#111413]'
                        }`}
                      >
                        {course.categoryLabel}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-serif font-semibold line-clamp-1 hidden sm:block ${
                        isSelected ? 'text-[#EAF3EE]' : 'text-[#494F4C]'
                      }`}
                    >
                      {course.title}
                    </span>

                    <span
                      className={`font-mono text-[10px] ${
                        isSelected ? 'text-[#D1FAE5]' : 'text-[#858C88]'
                      }`}
                    >
                      {course.durationMinutes} min • {course.lessonCount} lessons
                    </span>
                  </button>

                  {/* Desktop Pointer Triangle */}
                  {isSelected && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#143D2B] z-10"
                    />
                  )}

                  {/* Direct Accessible Anchor */}
                  <Link
                    href={`/academy/${course.slug}`}
                    className="sr-only"
                  >
                    {course.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lower Stage: Connected Spotlight Panel */}
        <div className="rounded-[10px] border border-[#E3E3DC] bg-[#F4F4F0] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left Column: Spotlight Course Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-[#143D2B] uppercase tracking-wider bg-[#EAF3EE] px-2.5 py-1 rounded-full border border-[#143D2B]/20">
              <ActiveCategoryIcon className="h-3.5 w-3.5" />
              <span>
                PILLAR FOCUS • {activeCourse.categoryLabel} • {activeStage.ageLabel}
              </span>
            </div>

            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#111413] leading-snug tracking-tight">
              {activeCourse.title}
            </h4>

            <p className="text-sm sm:text-base text-[#494F4C] leading-relaxed">
              {activeCourse.summary}
            </p>

            <div className="rounded-[6px] border-l-4 border-l-[#143D2B] border border-[#E3E3DC] bg-white p-3.5 sm:p-4 text-xs sm:text-sm text-[#494F4C] leading-relaxed shadow-xs">
              <strong className="font-bold text-[#111413] block sm:inline">
                Clinical Rationale:{' '}
              </strong>
              <span>{activeCourse.clinicalNote}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link href={`/academy/${activeCourse.slug}`}>
                <Button
                  variant="forest"
                  size="lg"
                  className="w-full sm:w-auto gap-2 font-bold min-h-[44px] shadow-sm"
                >
                  <span>Start Pillar Course in Academy</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href={`/academy?tier=${activeStage.tier}`}
                className="text-xs font-bold text-[#143D2B] hover:text-[#0C2419] flex items-center justify-center sm:justify-start gap-1 font-mono py-2"
              >
                <span>View all {activeStage.tabLabel} modules</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Right Column: Inside This Pillar (3-Lesson Micro-Syllabus Drawer) */}
          <div className="lg:col-span-5">
            <div className="rounded-[8px] border border-[#E3E3DC] bg-white p-4 sm:p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#EDEDEA]">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#858C88] flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-[#143D2B]" />
                  Inside This Pillar (3 Lessons)
                </span>
                <span className="font-mono text-[11px] font-bold text-[#143D2B]">
                  ⏱️ {activeCourse.durationMinutes} min total
                </span>
              </div>

              <div className="space-y-1">
                {activeCourse.lessons?.map((lesson) => (
                  <div
                    key={lesson.num}
                    className="flex items-baseline justify-between gap-3 py-2 border-b border-[#EDEDEA] last:border-b-0"
                  >
                    <div className="flex items-baseline gap-2.5 min-w-0">
                      <span className="font-mono text-xs font-bold text-[#143D2B] shrink-0">
                        § {lesson.num}
                      </span>
                      <span className="text-xs sm:text-[13px] font-semibold text-[#111413] leading-snug truncate sm:whitespace-normal">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#858C88] shrink-0">
                      {lesson.dur}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
