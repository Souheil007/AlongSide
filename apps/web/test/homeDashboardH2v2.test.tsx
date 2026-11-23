import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DevelopmentalTier,
  RoadType,
  type ChildDTO,
} from '@alongside/shared';
import { ChildHeroCard } from '../src/components/dashboard/ChildHeroCard';
import { AskAdvisorPromptBar } from '../src/components/dashboard/AskAdvisorPromptBar';
import { ActiveChapterContinueCard } from '../src/components/dashboard/ActiveChapterContinueCard';
import { DailyAdvisoryScriptCard } from '../src/components/dashboard/DailyAdvisoryScriptCard';
import { SundayCultureDigestCard } from '../src/components/dashboard/SundayCultureDigestCard';

function wrapQuery(ui: React.ReactElement) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return renderToStaticMarkup(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
}

const mayaPreDeviceAssessed: ChildDTO = {
  id: 'child-maya',
  userId: 'parent-souheil',
  name: 'Maya',
  gender: 'FEMALE',
  birthYear: 2015,
  birthMonth: 5,
  age: 11,
  schoolGrade: '6th Grade',
  developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  roadType: RoadType.PRE_DEVICE,
  latestAssessmentScore: 78,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const mayaActiveDevice: ChildDTO = {
  ...mayaPreDeviceAssessed,
  id: 'child-maya-r2',
  roadType: RoadType.ACTIVE_DEVICE,
};

const leoToddler: ChildDTO = {
  id: 'child-leo',
  userId: 'parent-souheil',
  name: 'Leo',
  gender: 'MALE',
  birthYear: 2023,
  birthMonth: 2,
  age: 3,
  schoolGrade: null,
  developmentalTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
  roadType: RoadType.PRE_DEVICE,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('Logged-in Home Dashboard H2v2 (Photo Cockpit + Flagship Curriculum Centerpiece)', () => {
  it('renders panoramic photo hero with frosted Dr. Alongside omnibar and live Readiness Score for assessed tween', () => {
    const html = renderToStaticMarkup(
      <ChildHeroCard
        child={mayaPreDeviceAssessed}
        parentName="Souheil"
        streakDays={4}
        minsLearnedThisWeek={18}
        variant="photo-cockpit"
        advisorSlot={<AskAdvisorPromptBar child={mayaPreDeviceAssessed} variant="hero" />}
      />
    );

    expect(html).toContain('Welcome home, Souheil.');
    expect(html).toContain('Maya');
    expect(html).toContain('/images/home/hero-sanctuary.jpg');
    expect(html).toContain('Readiness Score');
    expect(html).toContain('78');
    expect(html).toContain('/children/child-maya/readiness');
    expect(html).toContain('Console Meltdown');
    expect(html).toContain('Peer Phone Pressure');
    expect(html).toContain('Slammed Bedroom Door');
  });

  it('renders Device Safety OS Controls badge for Road 2 Active-Device child and AAP Media Limit for toddler Leo', () => {
    const r2Html = renderToStaticMarkup(
      <ChildHeroCard
        child={mayaActiveDevice}
        parentName="Souheil"
        variant="photo-cockpit"
        advisorSlot={<AskAdvisorPromptBar child={mayaActiveDevice} variant="hero" />}
      />
    );
    expect(r2Html).toContain('Device Safety');
    expect(r2Html).toContain('OS Parental Controls');
    expect(r2Html).toContain('/devices?tab=controls&amp;childId=child-maya-r2');

    const leoHtml = renderToStaticMarkup(
      <ChildHeroCard
        child={leoToddler}
        parentName="Souheil"
        variant="photo-cockpit"
        advisorSlot={<AskAdvisorPromptBar child={leoToddler} variant="hero" />}
      />
    );
    expect(leoHtml).toContain('30m');
    expect(leoHtml).toContain('Daily Media Limit');
    expect(leoHtml).toContain('TV Shutoff Tantrum');
    expect(leoHtml).not.toContain('Console Meltdown');
    expect(leoHtml).not.toContain('Readiness Score');
  });

  it('renders flagship full-width Curriculum Roadmap with clickable chapter nodes and Today Active Lesson CTA', () => {
    const html = wrapQuery(<ActiveChapterContinueCard child={mayaPreDeviceAssessed} />);

    expect(html).toContain('Parent Intelligence Academy • Active Course');
    expect(html).toContain('Curriculum Roadmap');
    expect(html).toContain('Click any chapter node');
    expect(html).toContain('Active Now');
    expect(html).toContain('Read Lesson');
  });

  it('renders Deep-Spruce Script card with Instead of / Try saying toggle and Used this tonight CTA', () => {
    const html = renderToStaticMarkup(
      <DailyAdvisoryScriptCard child={mayaPreDeviceAssessed} variant="spruce" />
    );

    expect(html).toContain('10-Second Script');
    expect(html).toContain('Instead of');
    expect(html).toContain('Try saying');
    expect(html).toContain('Copy words');
    expect(html).toContain('Used this tonight');
    expect(html).toContain('I hear how lonely');
  });

  it('renders H2v2 Daily Ritual Trio (Polaroid Sunday Table + Slang Decoder) and Widescreen Featured Weekly Talk for tweens', () => {
    const html = wrapQuery(
      <SundayCultureDigestCard
        child={mayaPreDeviceAssessed}
        variant="h2v2"
        scriptSlot={<DailyAdvisoryScriptCard child={mayaPreDeviceAssessed} variant="spruce" />}
      />
    );

    expect(html).toContain('/images/home/sunday-table.jpg');
    expect(html).toContain('Sunday Table Spark');
    expect(html).toContain('Shuffle card');
    expect(html).toContain('Schoolyard Decoder');
    expect(html).toContain('Crashout');
    expect(html).toContain('Featured Talk');
    expect(html).toContain('Open Culture &amp; Trends Hub');
    expect(html).toContain('href="/digest"');
  });

  it('switches H2v2 Decoder card to Screen-Free Play Ideas and early-childhood talk for toddler Leo', () => {
    const html = wrapQuery(
      <SundayCultureDigestCard
        child={leoToddler}
        variant="h2v2"
        scriptSlot={<DailyAdvisoryScriptCard child={leoToddler} variant="spruce" />}
      />
    );

    expect(html).toContain('Screen-Free Play');
    expect(html).not.toContain('Schoolyard Decoder');
    expect(html).toContain('Serve &amp; Return');
  });
});
