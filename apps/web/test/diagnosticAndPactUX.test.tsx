import { describe, expect, it, beforeEach } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  CANONICAL_READINESS_QUESTIONS,
  personalizeReadinessCopy,
  useReadinessStore,
} from '@/stores/useReadinessStore';
import { usePactStore } from '@/stores/usePactStore';
import { ReadinessWizard } from '@/components/quizzes/ReadinessWizard';
import { ReadinessScoreCard } from '@/components/quizzes/ReadinessScoreCard';
import { ClauseSelector } from '@/components/pacts/ClauseSelector';
import { CurfewSlider } from '@/components/pacts/CurfewSlider';
import { SignaturePad } from '@/components/pacts/SignaturePad';
import {
  CommitmentParty,
  DevelopmentalTier,
  RoadType,
  calculateReadinessScore,
  type ChildDTO,
} from '@alongside/shared';

function renderWithQuery(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return renderToStaticMarkup(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
}

const sampleChild: ChildDTO = {
  id: 'child-leo-10',
  userId: 'parent-1',
  name: 'Leo',
  gender: 'MALE',
  birthYear: new Date().getFullYear() - 10,
  birthMonth: 5,
  age: 10,
  roadType: RoadType.PRE_DEVICE,
  developmentalTier: DevelopmentalTier.TIER_2_AGES_10_11,
  schoolGrade: '5th Grade',
  latestAssessmentScore: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('Diagnostic & Pact Wizard Redesign UX', () => {
  beforeEach(() => {
    useReadinessStore.getState().reset();
    usePactStore.getState().reset();
  });

  describe('Readiness Diagnostic Content & Layout', () => {
    it('contains zero raw HTML entity bugs and includes scannable option headlines and chapters', () => {
      for (const q of CANONICAL_READINESS_QUESTIONS) {
        expect(q.questionText).not.toContain('&apos;');
        expect(q.expertInsight).not.toContain('&apos;');
        expect(q.sceneTag.length).toBeGreaterThan(4);
        expect(q.shortLabel.length).toBeGreaterThan(4);
        for (const opt of q.options) {
          expect(opt.headline.length).toBeGreaterThan(3);
          expect(opt.text).not.toContain('&apos;');
        }
      }
    });

    it('personalizes child name cleanly into everyday vignette questions', () => {
      const rendered = personalizeReadinessCopy(
        CANONICAL_READINESS_QUESTIONS[0]!.questionText,
        'Leo'
      );
      expect(rendered).toContain('Leo');
      expect(rendered).not.toContain('{name}');
    });

    it('renders the Editorial Almanac diagnostic card with 3 chapters and zero violet styling', () => {
      const html = renderWithQuery(
        <ReadinessWizard child={sampleChild} childId={sampleChild.id} childName="Leo" />
      );

      expect(html).toContain('Device readiness check-in');
      expect(html).toContain('Everyday Rhythms');
      expect(html).toContain('Online Instincts');
      expect(html).toContain('Trust &amp; Teamwork');
      expect(html).toContain('Dinner is on the table');
      expect(html).toContain('You call Leo for dinner');
      expect(html).toContain('Wraps up on their own');
      expect(html).toContain('Why we ask this');
      expect(html).not.toContain('violet-');
    });

    it('routes ReadinessScoreCard directly to /devices?tab=controls with zero pact wording', () => {
      const result = calculateReadinessScore(
        CANONICAL_READINESS_QUESTIONS.map((q) => ({
          questionId: q.id,
          dimensionKey: q.dimensionKey,
          score: 7,
          maxScore: 10,
          selectedOptionId: q.options[1]!.id,
        }))
      );

      const html = renderWithQuery(
        <ReadinessScoreCard
          childId="child-leo-10"
          childName="Leo"
          result={result}
        />
      );

      expect(html).toContain('/devices?tab=controls&amp;childId=child-leo-10');
      expect(html).not.toContain('/agreements/new');
      expect(html).not.toContain('/pacts/builder');
      expect(html).not.toContain('Family Pact');
      expect(html).toContain('Everyday Rhythms');
      expect(html).toContain('Stopping screens');
      expect(html).not.toContain('violet-');
    });
    it('resets prior answers and score when switching to a different child profile', () => {
      const store = useReadinessStore.getState();
      store.setChild('child-leo-10', 'Leo');
      const firstQ = CANONICAL_READINESS_QUESTIONS[0]!;
      store.setAnswer(firstQ.dimensionKey, {
        questionId: firstQ.id,
        dimensionKey: firstQ.dimensionKey,
        score: 10,
        maxScore: 10,
        selectedOptionId: firstQ.options[0]!.id,
      });
      store.computeLocalResult();
      expect(useReadinessStore.getState().result).not.toBeNull();

      // Switching to another child clears Child A's state cleanly
      useReadinessStore.getState().setChild('child-maya-8', 'Maya');
      const nextState = useReadinessStore.getState();
      expect(nextState.childId).toBe('child-maya-8');
      expect(nextState.childName).toBe('Maya');
      expect(nextState.result).toBeNull();
      expect(Object.keys(nextState.answers)).toHaveLength(0);
      expect(nextState.currentQuestionIndex).toBe(0);
    });
  });

  describe('Pact Wizard Content, Bug Fixes & Layout', () => {
    it('keeps toggled-off clauses inside catalogClauses so families can toggle them back on', () => {
      const store = usePactStore.getState();
      store.initializeWizard(
        'child-leo-10',
        'Leo',
        DevelopmentalTier.TIER_2_AGES_10_11,
        RoadType.ACTIVE_DEVICE
      );

      const initialCatalogCount = usePactStore.getState().catalogClauses.length;
      const target = usePactStore.getState().clauses[0]!;

      store.toggleClause(target);
      expect(usePactStore.getState().clauses.some((c) => c.title === target.title)).toBe(false);
      expect(usePactStore.getState().catalogClauses.length).toBe(initialCatalogCount);
      expect(
        usePactStore.getState().catalogClauses.some((c) => c.title === target.title)
      ).toBe(true);

      // Re-toggling brings the exact promise back into active clauses
      usePactStore.getState().toggleClause(target);
      expect(usePactStore.getState().clauses.some((c) => c.title === target.title)).toBe(true);
      expect(usePactStore.getState().catalogClauses.length).toBe(initialCatalogCount);
    });

    it('synchronizes inline wording edits across both active clauses and catalogClauses', () => {
      const store = usePactStore.getState();
      store.initializeWizard(
        'child-leo-10',
        'Leo',
        DevelopmentalTier.TIER_2_AGES_10_11,
        RoadType.ACTIVE_DEVICE
      );
      const original = usePactStore.getState().clauses[0]!;
      store.updateClause(original.title, {
        title: 'After-Homework Screen Deal',
        description: 'Screens open for 1 hour after homework and soccer practice.',
      });

      const state = usePactStore.getState();
      expect(state.clauses.some((c) => c.title === 'After-Homework Screen Deal')).toBe(true);
      expect(state.catalogClauses.some((c) => c.title === 'After-Homework Screen Deal')).toBe(true);
    });

    it('renders CurfewSlider with warm Almanac timeline and zero violet styling', () => {
      const html = renderWithQuery(<CurfewSlider />);
      expect(html).toContain('When do screens go to sleep?');
      expect(html).toContain('8:30 PM');
      expect(html).toContain('8:00 PM');
      expect(html).toContain('30-min heads-up');
      expect(html).toContain('Safety never locks.');
      expect(html).not.toContain('violet-');
    });

    it('renders ClauseSelector with bilateral balance, inline edit controls, and quick family ideas', () => {
      const html = renderWithQuery(<ClauseSelector />);
      expect(html).toContain('A real deal goes both ways');
      expect(html).toContain('What your child agrees to');
      expect(html).toContain('What parents agree to');
      expect(html).toContain('Ask before posting family photos');
      expect(html).toContain('Edit wording');
      expect(html).not.toContain('violet-');
    });

    it('renders SignaturePad with both Draw and Type modes in archival warmth', () => {
      const html = renderWithQuery(
        <SignaturePad
          label="Child Signature"
          signatoryName="Leo"
          party={CommitmentParty.CHILD}
          commitmentPledge="I promise to dock my device at 8:30 PM."
          value={null}
          onChange={() => {}}
        />
      );

      expect(html).toContain('Hand the screen to Leo');
      expect(html).toContain('Draw');
      expect(html).toContain('Type');
      expect(html).toContain('Sign with a finger, stylus, or mouse');
      expect(html).not.toContain('violet-');
    });
  });
});
