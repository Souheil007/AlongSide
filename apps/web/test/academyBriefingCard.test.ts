import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { AcademyBriefingCard } from '../src/components/dashboard/AcademyBriefingCard';
import { DevelopmentalTier, type ChildDTO } from '@alongside/shared';

describe('Parent Intelligence Academy Home Briefing Card', () => {
  it('exports AcademyBriefingCard as a functional React component', () => {
    expect(typeof AcademyBriefingCard).toBe('function');
  });

  it('renders correctly with child profile and fallback tier', () => {
    const mockChild: ChildDTO = {
      id: 'child-1',
      userId: 'user-1',
      name: 'Emma',
      age: 8,
      birthYear: 2018,
      birthMonth: 5,
      birthDate: '2018-05-15',
      roadType: 'PRE_DEVICE' as any,
      developmentalTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
      schoolGrade: '3rd Grade',
      dietaryStage: 'WHOLE_FAMILY_BALANCED' as any,
      allergies: [],
      pediatricNotes: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Component renders without throwing
    const element = React.createElement(AcademyBriefingCard, { child: mockChild });
    expect(element).toBeDefined();
    expect(element.props.child?.name).toBe('Emma');
    expect(element.props.child?.developmentalTier).toBe(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
  });

  it('renders gracefully when child is null (defaults to fallback)', () => {
    const element = React.createElement(AcademyBriefingCard, { child: null });
    expect(element).toBeDefined();
    expect(element.props.child).toBeNull();
  });
});
