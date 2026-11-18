import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DigestFeedHeader } from '../src/components/digest/DigestFeedHeader';
import { CulturalReelsView } from '../src/components/digest/CulturalReelsView';
import { WeeklyMagazineView } from '../src/components/digest/WeeklyMagazineView';
import { GenerationalTimeMirrorView } from '../src/components/digest/GenerationalTimeMirrorView';
import { DinnerConversationStarters } from '../src/components/digest/DinnerConversationStarters';
import { StageTailoredVocabularyView } from '../src/components/digest/StageTailoredVocabularyView';
import type { ChildDTO } from '@alongside/shared';

const mockTeenChild: ChildDTO = {
  id: 'child-teen',
  userId: 'user-1',
  name: 'Julian',
  age: 14,
  birthYear: 2012,
  birthMonth: 4,
  developmentalTier: 'TIER_4_ADOLESCENT' as any,
  roadType: 'ACTIVE_DEVICE' as any,
  schoolGrade: '9th',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('Sunday Youth Culture Digest GSAP Motion Overhaul', () => {
  it('DigestFeedHeader renders with GSAP target classes for editorial masthead unfold', () => {
    const html = renderToStaticMarkup(<DigestFeedHeader child={mockTeenChild} />);
    expect(html).toContain('digest-masthead-card');
    expect(html).toContain('digest-meta-pill');
    expect(html).toContain('digest-headline');
    expect(html).toContain('digest-subtitle');
  });

  it('CulturalReelsView renders with GSAP target classes for video reels entrance', () => {
    const html = renderToStaticMarkup(<CulturalReelsView child={mockTeenChild} />);
    expect(html).toContain('reels-header');
    expect(html).toContain('reel-card');
  });

  it('WeeklyMagazineView renders with GSAP target classes for lead and companion stories', () => {
    const html = renderToStaticMarkup(<WeeklyMagazineView child={mockTeenChild} />);
    expect(html).toContain('magazine-header');
    expect(html).toContain('magazine-lead-card');
    expect(html).toContain('magazine-companion-card');
  });

  it('GenerationalTimeMirrorView renders with GSAP target classes for Then vs. Now symmetrical reveal', () => {
    const html = renderToStaticMarkup(<GenerationalTimeMirrorView child={mockTeenChild} />);
    expect(html).toContain('time-mirror-header');
    expect(html).toContain('time-mirror-then');
    expect(html).toContain('time-mirror-now');
    expect(html).toContain('time-mirror-insight');
  });

  it('DinnerConversationStarters renders with GSAP target classes for tactile card shuffle and entrance', () => {
    const html = renderToStaticMarkup(<DinnerConversationStarters child={mockTeenChild} />);
    expect(html).toContain('dinner-container-card');
    expect(html).toContain('dinner-meta-badge');
    expect(html).toContain('dinner-interactive-card');
  });

  it('StageTailoredVocabularyView renders with GSAP target classes for vocabulary card stagger', () => {
    const html = renderToStaticMarkup(<StageTailoredVocabularyView child={mockTeenChild} />);
    expect(html).toContain('vocab-header');
    expect(html).toContain('vocab-term-card');
  });
});
