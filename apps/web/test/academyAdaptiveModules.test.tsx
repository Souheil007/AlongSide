import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AcademyCategory } from '@alongside/shared';
import {
  SomaticBreathWidget,
  CircadianTimelineWidget,
  FeedingResponsibilityWidget,
  PurposefulPlayBlueprintWidget,
  PactClauseBridgeWidget,
  LessonAdaptiveModuleRenderer,
} from '../src/components/academy/reader';

describe('Plan 38: Category-Specific Adaptive Lesson Modules', () => {
  describe('1. SomaticGrounding Breath Widget (Behavior & Emotions)', () => {
    it('renders 4s inhale / 6s exhale circular breathing guide and clinical vagal context', () => {
      const html = renderToStaticMarkup(
        React.createElement(SomaticBreathWidget, {
          isNightstandMode: false,
        })
      );

      expect(html).toContain('data-testid="somatic-breath-widget"');
      expect(html).toContain('data-testid="breath-toggle-btn"');
      expect(html).toContain('Vagal Grounding · Physiological Sigh (4s In / 6s Out)');
      expect(html).toContain('Start 4s/6s Breathing');
      expect(html).toContain('Why Caregiver Vagal Tone Regulates the Child');
      expect(html).toContain('Extending your exhale to');
      expect(html).toContain('stimulates the vagus nerve');
    });
  });

  describe('2. Circadian Timeline Widget (Health & Restorative Sleep)', () => {
    it('renders 24-hour sleep/wake timeline, melatonin window, and pediatric red flags', () => {
      const html = renderToStaticMarkup(
        React.createElement(CircadianTimelineWidget, {
          isNightstandMode: false,
        })
      );

      expect(html).toContain('data-testid="circadian-timeline-widget"');
      expect(html).toContain('Restorative Sleep · 24-Hour Circadian Window');
      expect(html).toContain('07:00 AM');
      expect(html).toContain('02:30 PM');
      expect(html).toContain('07:15 PM');
      expect(html).toContain('08:30 PM');
      expect(html).toContain('Melatonin Window Opens');
      expect(html).toContain('Optimal Deep NREM Target');
      expect(html).toContain('Pediatric Red Flags: When to Consult a Clinician');
      expect(html).toContain('Chronic nighttime mouth-breathing, snoring with audible pauses');
    });
  });

  describe('3. Feeding Responsibility Widget (Nutrition & Feeding)', () => {
    it('renders 2x2 Ellyn Satter Division of Responsibility and 5-step exposure ladder', () => {
      const html = renderToStaticMarkup(
        React.createElement(FeedingResponsibilityWidget, {
          isNightstandMode: false,
        })
      );

      expect(html).toContain('data-testid="feeding-responsibility-widget"');
      expect(html).toContain('Division of Responsibility · Ellyn Satter Clinical Model');
      expect(html).toContain('The Parent Decides (The Boundary)');
      expect(html).toContain('WHAT');
      expect(html).toContain('WHEN');
      expect(html).toContain('WHERE');
      expect(html).toContain('The Child Decides (Autonomy)');
      expect(html).toContain('IF');
      expect(html).toContain('HOW MUCH');
      expect(html).toContain('The 5-Step Texture Exposure Progression');
      expect(html).toContain('See &amp; Tolerate');
      expect(html).toContain('Touch &amp; Explore');
      expect(html).toContain('Smell &amp; Kiss');
      expect(html).toContain('Lick &amp; Taste');
      expect(html).toContain('Chew &amp; Swallow');
    });
  });

  describe('4. Purposeful Play Blueprint Widget (Cognitive Development & Play)', () => {
    it('renders 5-minute low-prep activity guide, household materials, and language sparks', () => {
      const html = renderToStaticMarkup(
        React.createElement(PurposefulPlayBlueprintWidget, {
          isNightstandMode: false,
        })
      );

      expect(html).toContain('data-testid="purposeful-play-widget"');
      expect(html).toContain('Purposeful Play · 5-Minute Low-Prep Developmental Lab');
      expect(html).toContain('Household Items Needed:');
      expect(html).toContain('Empty cardboard box or shoe box');
      expect(html).toContain('2 wooden kitchen spoons or spatulas');
      expect(html).toContain('Language Expansion Prompts');
      expect(html).toContain('What do you predict will happen if we slide the spoon down the ramp?');
    });
  });

  describe('5. Pact Clause Bridge Widget (Digital Health & Devices)', () => {
    it('renders curfew rule card with 1-click Add to Family Pact button', () => {
      const html = renderToStaticMarkup(
        React.createElement(PactClauseBridgeWidget, {
          curfewTime: '08:30 PM',
          clauseTitle: 'Curfew Phone Parking: Bedtime Lockout at 8:30 PM',
          isNightstandMode: false,
        })
      );

      expect(html).toContain('data-testid="pact-clause-bridge-widget"');
      expect(html).toContain('Pact-as-Code · Bilateral Device Agreement Bridge');
      expect(html).toContain('Curfew Phone Parking: Bedtime Lockout at 8:30 PM');
      expect(html).toContain('data-testid="add-clause-pact-btn"');
      expect(html).toContain('Add to Family Pact');
      expect(html).toContain('Neutral MDM Enforcement');
    });
  });

  describe('6. LessonAdaptiveModuleRenderer Dispatcher', () => {
    it('dispatches SomaticBreathWidget for SOMATIC_RESET or BEHAVIOR_AND_EMOTIONS', () => {
      const htmlExplicit = renderToStaticMarkup(
        React.createElement(LessonAdaptiveModuleRenderer, {
          adaptiveModuleType: 'SOMATIC_RESET',
        })
      );
      expect(htmlExplicit).toContain('data-testid="somatic-breath-widget"');

      const htmlCategory = renderToStaticMarkup(
        React.createElement(LessonAdaptiveModuleRenderer, {
          category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
        })
      );
      expect(htmlCategory).toContain('data-testid="somatic-breath-widget"');
    });

    it('dispatches CircadianTimelineWidget for CIRCADIAN_TIMELINE or HEALTH_AND_WELLNESS', () => {
      const htmlExplicit = renderToStaticMarkup(
        React.createElement(LessonAdaptiveModuleRenderer, {
          adaptiveModuleType: 'CIRCADIAN_TIMELINE',
        })
      );
      expect(htmlExplicit).toContain('data-testid="circadian-timeline-widget"');

      const htmlCategory = renderToStaticMarkup(
        React.createElement(LessonAdaptiveModuleRenderer, {
          category: AcademyCategory.HEALTH_AND_WELLNESS,
        })
      );
      expect(htmlCategory).toContain('data-testid="circadian-timeline-widget"');
    });

    it('dispatches FeedingResponsibilityWidget for FEEDING_LADDER or NUTRITION_AND_FEEDING', () => {
      const htmlExplicit = renderToStaticMarkup(
        React.createElement(LessonAdaptiveModuleRenderer, {
          adaptiveModuleType: 'FEEDING_LADDER',
        })
      );
      expect(htmlExplicit).toContain('data-testid="feeding-responsibility-widget"');

      const htmlCategory = renderToStaticMarkup(
        React.createElement(LessonAdaptiveModuleRenderer, {
          category: AcademyCategory.NUTRITION_AND_FEEDING,
        })
      );
      expect(htmlCategory).toContain('data-testid="feeding-responsibility-widget"');
    });

    it('dispatches PurposefulPlayBlueprintWidget for PLAY_BLUEPRINT or DEVELOPMENT_AND_PLAY', () => {
      const htmlExplicit = renderToStaticMarkup(
        React.createElement(LessonAdaptiveModuleRenderer, {
          adaptiveModuleType: 'PLAY_BLUEPRINT',
        })
      );
      expect(htmlExplicit).toContain('data-testid="purposeful-play-widget"');

      const htmlCategory = renderToStaticMarkup(
        React.createElement(LessonAdaptiveModuleRenderer, {
          category: AcademyCategory.DEVELOPMENT_AND_PLAY,
        })
      );
      expect(htmlCategory).toContain('data-testid="purposeful-play-widget"');
    });

    it('dispatches PactClauseBridgeWidget for PACT_CLAUSE or DIGITAL_AND_DEVICES', () => {
      const htmlExplicit = renderToStaticMarkup(
        React.createElement(LessonAdaptiveModuleRenderer, {
          adaptiveModuleType: 'PACT_CLAUSE',
        })
      );
      expect(htmlExplicit).toContain('data-testid="pact-clause-bridge-widget"');

      const htmlCategory = renderToStaticMarkup(
        React.createElement(LessonAdaptiveModuleRenderer, {
          category: AcademyCategory.DIGITAL_AND_DEVICES,
        })
      );
      expect(htmlCategory).toContain('data-testid="pact-clause-bridge-widget"');
    });
  });
});
