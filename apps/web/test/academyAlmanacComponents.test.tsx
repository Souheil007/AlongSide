import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  EditorialIllustrationKey,
  Gender,
  interpolateChildCopy,
  DevelopmentalTier,
} from '@alongside/shared';
import {
  AlmanacBrainBeat,
  AlmanacListenDock,
  AlmanacRehearsalBeat,
  AlmanacVideoShelf,
  BrainBridgeVisual,
  CircadianCurveVisual,
  EditorialSpotArt,
  extractYouTubeVideoId,
  HabitGuardrailVisual,
  LensExposureMatrixVisual,
  PartnerShareModal,
  RoutineTimelineVisual,
  SensoryLadderVisual,
  ServeReturnVisual,
} from '../src/components/academy/almanac';
import { buildAlmanacNarrationScript } from '../src/hooks/useAlmanacLessonState';
import { MOCK_LESSON_DETAIL_ADRENARCHE } from '../src/lib/api/mocks';

describe('PLAN-48: Interactive Almanac v2 Visuals, Art, Audio & Modal Components', () => {
  const childMaya = {
    name: 'Maya',
    gender: Gender.FEMALE,
    ageMonths: 30,
    developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
  };
  const tMaya = (s: string) => interpolateChildCopy(s, childMaya);

  it('renders all 7 interactive Beat 2 concept visuals with zero raw tokens', () => {
    const visuals = [
      { id: 'visual-sensory-ladder', el: <SensoryLadderVisual t={tMaya} /> },
      { id: 'visual-lens-exposure-matrix', el: <LensExposureMatrixVisual t={tMaya} /> },
      { id: 'visual-brain-bridge', el: <BrainBridgeVisual t={tMaya} /> },
      { id: 'visual-circadian-curve', el: <CircadianCurveVisual t={tMaya} /> },
      { id: 'visual-routine-timeline', el: <RoutineTimelineVisual t={tMaya} /> },
      { id: 'visual-serve-return-loop', el: <ServeReturnVisual t={tMaya} /> },
      { id: 'visual-habit-guardrail', el: <HabitGuardrailVisual t={tMaya} /> },
    ];

    for (const v of visuals) {
      const html = renderToStaticMarkup(v.el);
      expect(html).toContain(`data-testid="${v.id}"`);
      expect(html).not.toMatch(/\{[a-zA-Z]+\}/);
    }
  });

  it('renders all 9 unboxed editorial spot art illustrations cleanly', () => {
    const keys = Object.values(EditorialIllustrationKey);
    expect(keys).toHaveLength(9);

    for (const key of keys) {
      const html = renderToStaticMarkup(
        <EditorialSpotArt illustration={key} caption={`Caption for ${key}`} />
      );
      expect(html).toContain(`data-testid="editorial-art-${key}"`);
      expect(html).toContain('<svg');
      expect(html).toContain(`Caption for ${key}`);
    }
  });

  it('renders Beat 3 annotated calm script, coaching badge, pushback chips, and zero 6s tone button', () => {
    const payload = MOCK_LESSON_DETAIL_ADRENARCHE.almanacPayload!;
    const html = renderToStaticMarkup(
      <AlmanacRehearsalBeat
        payload={payload}
        selectedInstinctId={payload.instincts[0]!.id}
        skippedInstinct={false}
        activeAnnotationId="steady"
        selectedPushbackId={payload.pushbacks[0]!.id}
        savedPushbackIds={[payload.pushbacks[0]!.id]}
        onSelectInstinct={vi.fn()}
        onSkipInstinct={vi.fn()}
        onToggleAnnotation={vi.fn()}
        onSelectPushback={vi.fn()}
        onToggleSavePushback={vi.fn()}
        onOpenAdvisor={vi.fn()}
        childShortName="Maya"
        isNarrating={false}
        t={tMaya}
      />
    );

    expect(html).toContain('data-testid="reframe-reveal-panel"');
    expect(html).toContain('data-testid="annotated-calm-script"');
    expect(html).toContain('data-testid="script-annot-steady"');
    expect(html).toContain('data-testid="script-annotation-callout"');
    expect(html).toContain('Zero-Bait Empathy');
    expect(html).toContain('data-testid="pushback-answer-box"');
    expect(html).toContain('Saved to Pocket Card');
    expect(html).toContain('Ask AI Advisor about Maya');
    // Founder removal check
    expect(html).not.toContain('Hear the calm tone');
    expect(html).not.toMatch(/\{[a-zA-Z]+\}/);
  });

  it('hides Beat 2 neuroscience disclosure when scienceDeepDive duplicates beat2Lead', () => {
    const duplicatePayload = {
      ...MOCK_LESSON_DETAIL_ADRENARCHE.almanacPayload!,
      beat2Lead: 'Identical explanation text for {name}.',
      scienceDeepDive: 'Identical explanation text for {name}.',
    };
    const html = renderToStaticMarkup(
      <AlmanacBrainBeat
        payload={duplicatePayload}
        bookmarkedTruth={false}
        onToggleBookmarkTruth={vi.fn()}
        isNarrating={false}
        t={tMaya}
      />
    );

    expect(html).toContain('Identical explanation text for Maya.');
    expect(html).not.toContain('data-testid="science-deep-dive-toggle"');
  });

  it('renders Beat 3 skip hatch before an instinct is chosen', () => {
    const payload = MOCK_LESSON_DETAIL_ADRENARCHE.almanacPayload!;
    const html = renderToStaticMarkup(
      <AlmanacRehearsalBeat
        payload={payload}
        selectedInstinctId={null}
        skippedInstinct={false}
        activeAnnotationId={null}
        selectedPushbackId={null}
        savedPushbackIds={[]}
        onSelectInstinct={vi.fn()}
        onSkipInstinct={vi.fn()}
        onToggleAnnotation={vi.fn()}
        onSelectPushback={vi.fn()}
        onToggleSavePushback={vi.fn()}
        onOpenAdvisor={vi.fn()}
        childShortName={null}
        isNarrating={false}
        t={tMaya}
      />
    );

    expect(html).toContain('data-testid="skip-instinct-btn"');
    expect(html).not.toContain('data-testid="reframe-reveal-panel"');
  });

  it('extracts YouTube IDs across all URL formats and renders jumpChips on AlmanacVideoShelf', () => {
    expect(extractYouTubeVideoId('https://www.youtube.com/watch?v=XT_6Lvkhxvo')).toBe('XT_6Lvkhxvo');
    expect(extractYouTubeVideoId('https://youtu.be/XT_6Lvkhxvo')).toBe('XT_6Lvkhxvo');
    expect(extractYouTubeVideoId('https://www.youtube-nocookie.com/embed/XT_6Lvkhxvo?rel=0')).toBe('XT_6Lvkhxvo');

    const html = renderToStaticMarkup(
      <AlmanacVideoShelf
        video={{
          videoUrl: 'https://www.youtube.com/watch?v=XT_6Lvkhxvo',
          title: 'Calm Parenting Under Stress',
          presenter: 'Dr. Becky Kennedy',
          channel: 'Huberman Lab',
          durationMinutes: 14,
          parentHook: 'Calm adults steady the room first.',
          keyTakeaways: ['Idea 1', 'Idea 2', 'Idea 3'],
          jumpChips: [
            { seconds: 65, label: 'Start of core framework' },
            { seconds: 240, label: 'Repair script' },
          ],
        }}
      />
    );

    expect(html).toContain('img.youtube.com/vi/XT_6Lvkhxvo/hqdefault.jpg');
    expect(html).toContain('1:05');
    expect(html).toContain('4:00');
    expect(html).toContain('Read the 3 core ideas instead');
  });

  it('renders PartnerShareModal and AlmanacListenDock cleanly when open/visible', () => {
    const modalHtml = renderToStaticMarkup(
      <PartnerShareModal
        isOpen={true}
        onClose={vi.fn()}
        headline="One Safe Food on Every Plate"
        calmScript="You don't have to eat it tonight."
        chosenMoveTitle="Add one safe anchor food to dinner"
        savedPushbackScript="Dinner is over—we'll eat again at breakfast."
        childLabel="Maya (2 yrs 6 mos)"
      />
    );

    expect(modalHtml).toContain('data-testid="partner-share-modal"');
    expect(modalHtml).toContain('20-Second Co-Parent Share');
    expect(modalHtml).toContain('Copy Share Note');
    expect(modalHtml).toContain('Maya (2 yrs 6 mos)');

    const dockHtml = renderToStaticMarkup(
      <AlmanacListenDock
        visible={true}
        isPlaying={true}
        playbackSpeed={1.25}
        audioSeconds={45}
        totalAudioSeconds={165}
        speakingBeat={1}
        audioRef={{ current: null }}
        onAudioError={vi.fn()}
        onTogglePlay={vi.fn()}
        onCycleSpeed={vi.fn()}
      />
    );

    expect(dockHtml).toContain('data-testid="almanac-listen-dock"');
    expect(dockHtml).toContain('0:45 / 2:45');
    expect(dockHtml).toContain('1.25x');
    expect(dockHtml).toContain('Now reading: 02 Inside Mind');
  });

  it('builds a clean spoken narration script with zero asterisk or raw token leakage', () => {
    const { fullText, estimatedSeconds } = buildAlmanacNarrationScript(
      MOCK_LESSON_DETAIL_ADRENARCHE.almanacPayload!,
      tMaya
    );

    expect(fullText).toContain('Maya');
    expect(fullText).not.toContain('*');
    expect(fullText).not.toMatch(/\{[a-zA-Z]+\}/);
    expect(estimatedSeconds).toBeGreaterThanOrEqual(45);
  });
});
