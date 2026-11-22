import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  HeroSection,
  HERO_AGE_MOMENTS,
  ProductStudioSection,
  STUDIO_ADVISOR_SCENARIOS,
  STUDIO_SLANG_ITEMS,
  STUDIO_DINNER_QUESTIONS,
  ScreenPactSection,
  PricingAndFaqSection,
} from '../src/components/home';
import { DailyAdvisoryScriptCard } from '../src/components/dashboard/DailyAdvisoryScriptCard';
import { SleepRegressionCompanion } from '../src/components/health/SleepRegressionCompanion';
import { PickyEatingSolutions } from '../src/components/nutrition/PickyEatingSolutions';
import { AdolescentFuelGuide } from '../src/components/nutrition/AdolescentFuelGuide';
import { DevelopmentalTier, RoadType, type ChildDTO } from '@alongside/shared';

const mockMaya: ChildDTO = {
  id: 'child-maya',
  userId: 'parent-1',
  name: 'Maya',
  gender: 'FEMALE',
  birthYear: 2015,
  birthMonth: 5,
  age: 11,
  schoolGrade: '6th Grade',
  developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  roadType: RoadType.PRE_DEVICE,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('Interactive Layout Stability (Zero-Shift CSS Grid Stacks)', () => {
  it('pre-stacks all 5 HeroSection age moments in a single grid cell so age switches cannot shift the hero', () => {
    const html = renderToStaticMarkup(<HeroSection />);
    for (const moment of HERO_AGE_MOMENTS) {
      expect(html).toContain(moment.child);
    }
    expect(html).toContain('col-start-1 row-start-1');
    expect(html).toContain('invisible pointer-events-none select-none');
  });

  it('pre-stacks all 3 ProductStudioSection tabs plus advisor scenarios, slang items, and dinner questions', () => {
    const html = renderToStaticMarkup(<ProductStudioSection />);
    expect(html).toContain('id="studio-panel-advisor"');
    expect(html).toContain('id="studio-panel-academy"');
    expect(html).toContain('id="studio-panel-digest"');
    for (const scenario of STUDIO_ADVISOR_SCENARIOS) {
      expect(html).toContain(scenario.whyHeading.replace(/&/g, '&amp;'));
    }
    for (const slang of STUDIO_SLANG_ITEMS) {
      expect(html).toContain(slang.definition.replace(/'/g, '&#x27;'));
    }
    for (const q of STUDIO_DINNER_QUESTIONS) {
      expect(html).toContain(q);
    }
  });

  it('pre-stacks both 4:00 PM and 8:30 PM states in ScreenPactSection so curfew toggles cause 0px shift', () => {
    const html = renderToStaticMarkup(<ScreenPactSection />);
    expect(html).toContain('8:30 PM · Bedtime dock active');
    expect(html).toContain('4:00 PM · Agreed apps open');
    expect(html).toContain('Apps pause automatically at 8:30 PM');
    expect(html).toContain('Homework finished first');
    expect(html).toContain('col-start-1 row-start-1');
  });

  it('pre-stacks both Annual and Monthly notes in PricingAndFaqSection', () => {
    const html = renderToStaticMarkup(<PricingAndFaqSection />);
    expect(html).toContain('Regularly $79 / year');
    expect(html).toContain('Regularly $9.99 / month');
    expect(html).toContain('col-start-1 row-start-1');
  });

  it('pre-stacks reactive and calm scripts in DailyAdvisoryScriptCard spruce variant', () => {
    const html = renderToStaticMarkup(
      <DailyAdvisoryScriptCard child={mockMaya} variant="spruce" />
    );
    expect(html).toContain('I hear how lonely');
    expect(html).toContain('You don’t need what everyone else has');
    expect(html).toContain('col-start-1 row-start-1');
  });

  it('pre-stacks multi-tab panels across Health and Nutrition interactive companions', () => {
    const sleepHtml = renderToStaticMarkup(<SleepRegressionCompanion />);
    expect(sleepHtml).toContain('The Permanent Sleep Cycle Shift');
    expect(sleepHtml).toContain('Vivid Imagination &amp; Bedtime Fears');
    expect(sleepHtml).toContain('col-start-1 row-start-1');

    const pickyHtml = renderToStaticMarkup(<PickyEatingSolutions />);
    expect(pickyHtml).toContain('Crispy Fast-Food French Fries');
    expect(pickyHtml).toContain('Goldfish or Saltine Crackers');
    expect(pickyHtml).toContain('col-start-1 row-start-1');

    const fuelHtml = renderToStaticMarkup(<AdolescentFuelGuide />);
    expect(fuelHtml).toContain('The 45-Minute Post-Workout Recovery Window');
    expect(fuelHtml).toContain('Shielding Adolescents from Algorithmic Diet Culture');
    expect(fuelHtml).toContain('col-start-1 row-start-1');
  });
});
