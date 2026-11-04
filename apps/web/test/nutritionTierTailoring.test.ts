import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { SchoolLunchboxGuide } from '../src/components/nutrition/SchoolLunchboxGuide';
import { AdolescentFuelGuide } from '../src/components/nutrition/AdolescentFuelGuide';
import { NutritionDashboardView } from '../src/components/nutrition/NutritionDashboardView';
import { deriveChildAge } from '../src/hooks/useChildAge';
import { NutritionStage } from '@alongside/shared';

describe('Nutrition Tier Tailoring Specification', () => {
  it('exports SchoolLunchboxGuide and AdolescentFuelGuide as functional components', () => {
    expect(typeof SchoolLunchboxGuide).toBe('function');
    expect(typeof AdolescentFuelGuide).toBe('function');
    expect(typeof NutritionDashboardView).toBe('function');
  });

  it('correctly maps school-age children (6–12) to BALANCED_SCHOOL stage', () => {
    const child8yo = deriveChildAge({ age: 8, name: 'Emma' });
    expect(child8yo.feedingStage).toBe(NutritionStage.BALANCED_SCHOOL);
    expect(child8yo.ageYears).toBe(8);
  });

  it('correctly maps adolescents (13–18) to PUBERTAL_GROWTH stage', () => {
    const teen15yo = deriveChildAge({ age: 15, name: 'Sam' });
    expect(teen15yo.feedingStage).toBe(NutritionStage.PUBERTAL_GROWTH);
    expect(teen15yo.ageYears).toBe(15);
  });

  it('correctly maps infants under 6 months to MILK_ONLY stage', () => {
    const infant3mo = deriveChildAge({ age: 0, ageMonths: 3, name: 'Lucas' });
    expect(infant3mo.feedingStage).toBe(NutritionStage.MILK_ONLY);
    expect(infant3mo.isUnder6Months).toBe(true);
  });

  it('correctly maps infants 6–12 months to SOLIDS_INTRODUCED stage', () => {
    const infant7mo = deriveChildAge({ age: 0, ageMonths: 7, name: 'Maya' });
    expect(infant7mo.feedingStage).toBe(NutritionStage.SOLIDS_INTRODUCED);
    expect(infant7mo.isUnder6Months).toBe(false);
  });

  it('renders SchoolLunchboxGuide element without throwing', () => {
    const element = React.createElement(SchoolLunchboxGuide);
    expect(element).toBeDefined();
  });

  it('renders AdolescentFuelGuide element without throwing', () => {
    const element = React.createElement(AdolescentFuelGuide);
    expect(element).toBeDefined();
  });
});
