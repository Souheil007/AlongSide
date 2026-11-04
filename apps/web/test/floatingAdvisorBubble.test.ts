import { describe, expect, it, beforeEach } from 'vitest';
import { DevelopmentalTier, RoadType, type ChildDTO } from '@alongside/shared';
import {
  resolveContextualPrompts,
} from '../src/lib/advisor-context';
import { useAdvisorStore, useAiAdvisorChat } from '../src/hooks/useAiAdvisorChat';

const MOCK_CHILD_MATEO: ChildDTO = {
  id: 'child-mateo-14mo',
  userId: 'parent-1',
  name: 'Mateo',
  age: 1,
  birthYear: 2025,
  birthMonth: 8,
  roadType: RoadType.PRE_DEVICE,
  developmentalTier: 'TIER_0_INFANCY_TODDLER_0_3' as unknown as DevelopmentalTier,
  schoolGrade: 'Infant Daycare',
  latestAssessmentScore: null,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const MOCK_CHILD_MAYA: ChildDTO = {
  id: 'child-maya-8yo',
  userId: 'parent-1',
  name: 'Maya',
  age: 8,
  birthYear: 2018,
  birthMonth: 5,
  roadType: RoadType.PRE_DEVICE,
  developmentalTier: DevelopmentalTier.TIER_1_AGES_8_9,
  schoolGrade: '3rd Grade',
  latestAssessmentScore: 78,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('Omnipresent Floating AI Advisor Bubble & Contextual Triage Drawer UI Specification (PLAN-22)', () => {
  beforeEach(() => {
    useAdvisorStore.getState().resetChat();
  });

  describe('Contextual Prompt Resolver (resolveContextualPrompts)', () => {
    it('generates health triage prompts tailored with child name on /health', () => {
      const prompts = resolveContextualPrompts('/health', MOCK_CHILD_MATEO);
      expect(prompts.length).toBeGreaterThanOrEqual(3);
      expect(prompts.every((p) => p.category === 'health')).toBe(true);

      const feverPrompt = prompts.find((p) => p.id.includes('health-fever'));
      expect(feverPrompt).toBeDefined();
      expect(feverPrompt?.prompt).toBe(
        'Mateo has a 101.5°F fever — when should I call the doctor?'
      );

      const coughPrompt = prompts.find((p) => p.id.includes('health-cough-sleep'));
      expect(coughPrompt).toBeDefined();
      expect(coughPrompt?.prompt).toContain('help Mateo sleep with a cough');
    });

    it('generates nutrition & allergen prompts tailored for the active child on /nutrition', () => {
      const prompts = resolveContextualPrompts('/nutrition', MOCK_CHILD_MATEO);
      expect(prompts.length).toBeGreaterThanOrEqual(3);
      expect(prompts.every((p) => p.category === 'nutrition')).toBe(true);

      const peanutPrompt = prompts.find((p) => p.id.includes('nutrition-peanut-butter'));
      expect(peanutPrompt).toBeDefined();
      expect(peanutPrompt?.prompt).toBe(
        'How do I safely introduce thinned peanut butter to Mateo?'
      );

      const pickyPrompt = prompts.find((p) => p.id.includes('nutrition-picky-eating'));
      expect(pickyPrompt).toBeDefined();
      expect(pickyPrompt?.prompt).toContain('when Mateo refuses to eat anything green');
    });

    it('generates de-escalation and tantrum scripts on /behavior', () => {
      const prompts = resolveContextualPrompts('/behavior', MOCK_CHILD_MAYA);
      expect(prompts.length).toBeGreaterThanOrEqual(3);
      expect(prompts.every((p) => p.category === 'behavior')).toBe(true);

      const meltdownPrompt = prompts.find((p) => p.id.includes('behavior-meltdown-script'));
      expect(meltdownPrompt?.prompt).toBe(
        "Give me a 3-sentence de-escalation script for Maya's screaming meltdown."
      );

      const bedtimePrompt = prompts.find((p) => p.id.includes('behavior-bedtime-stall'));
      expect(bedtimePrompt?.prompt).toBe('How to handle bedtime stalling without yelling.');
    });

    it('generates device readiness, slang decoders, and curfew prompts on /devices', () => {
      const prompts = resolveContextualPrompts('/devices', MOCK_CHILD_MAYA);
      expect(prompts.length).toBeGreaterThanOrEqual(3);
      expect(prompts.every((p) => p.category === 'devices')).toBe(true);

      const phonePrompt = prompts.find((p) => p.id.includes('devices-first-phone'));
      expect(phonePrompt?.prompt).toBe('Is Maya ready for an Apple Watch or phone?');

      const slangPrompt = prompts.find((p) => p.id.includes('devices-slang-crashout'));
      expect(slangPrompt?.prompt).toBe("What does 'crashout' mean in tween slang?");
    });

    it('generates purposeful screen-free play prompts on /brain-games', () => {
      const prompts = resolveContextualPrompts('/brain-games', MOCK_CHILD_MATEO);
      expect(prompts.length).toBeGreaterThanOrEqual(3);
      expect(prompts.every((p) => p.category === 'brain-games')).toBe(true);

      const busterPrompt = prompts.find((p) => p.id.includes('games-boredom-buster'));
      expect(busterPrompt?.prompt).toContain('Quick 5-minute boredom buster game I can play with Mateo today.');
    });

    it('generates developmental milestone & resilience prompts on /dashboard or root', () => {
      const prompts = resolveContextualPrompts('/dashboard', MOCK_CHILD_MAYA);
      expect(prompts.length).toBeGreaterThanOrEqual(3);

      const milestonePrompt = prompts.find((p) => p.id.includes('dashboard-milestone'));
      expect(milestonePrompt?.prompt).toBe(
        'What is the most important milestone for a 8-year-old right now?'
      );
      expect(milestonePrompt?.label).toBe('8-Yr Milestone Check');
    });

    it('handles null active child gracefully with generic child references', () => {
      const prompts = resolveContextualPrompts('/health', null);
      expect(prompts.length).toBeGreaterThanOrEqual(3);

      const feverPrompt = prompts.find((p) => p.id.includes('health-fever'));
      expect(feverPrompt?.prompt).toBe(
        'My child has a 101.5°F fever — when should I call the doctor?'
      );

      const defaultPrompts = resolveContextualPrompts('/dashboard', null);
      const defaultMilestone = defaultPrompts.find((p) => p.id.includes('dashboard-milestone'));
      expect(defaultMilestone?.prompt).toContain('8-year-old');
    });
  });

  describe('Shared AI Advisor Store & Cross-View Continuity', () => {
    it('maintains conversation state across hook invocations between floating drawer and full studio', () => {
      const store = useAdvisorStore.getState();
      expect(store.messages).toHaveLength(0);

      store.addMessage({
        id: 'msg-1',
        conversationId: 'conv-test-1',
        role: 'USER',
        content: 'Mateo has a 101.5°F fever',
        createdAt: new Date().toISOString(),
      });

      store.addMessage({
        id: 'msg-2',
        conversationId: 'conv-test-1',
        role: 'ASSISTANT',
        content: 'Monitor for lethargy and ensure hydration.',
        matchedFaqIds: ['faq-fever-infant'],
        createdAt: new Date().toISOString(),
      });

      // A second consumer (such as AdvisorDashboardView) sees the exact same messages
      const updatedStore = useAdvisorStore.getState();
      expect(updatedStore.messages).toHaveLength(2);
      expect(updatedStore.messages[0]?.content).toBe('Mateo has a 101.5°F fever');
      expect(updatedStore.messages[1]?.content).toContain('Monitor for lethargy');
    });

    it('clears conversation state synchronously across all views', () => {
      const store = useAdvisorStore.getState();
      store.addMessage({
        id: 'msg-temp',
        conversationId: 'conv-temp',
        role: 'USER',
        content: 'Temporary question',
        createdAt: new Date().toISOString(),
      });

      expect(useAdvisorStore.getState().messages).toHaveLength(1);

      store.resetChat();

      expect(useAdvisorStore.getState().messages).toHaveLength(0);
      expect(useAdvisorStore.getState().conversationId).toBeNull();
      expect(useAdvisorStore.getState().activeStreamingText).toBe('');
      expect(useAdvisorStore.getState().isStreaming).toBe(false);
    });

    it('tracks active emergency state when red flag is triggered', () => {
      const store = useAdvisorStore.getState();
      expect(store.activeEmergency).toBeNull();

      store.setActiveEmergency({
        type: 'EMERGENCY_RED_FLAG',
        isEmergency: true,
        category: 'POISONING',
        headline: 'Suspected Battery Ingestion',
        directive: 'Seek immediate pediatric emergency room care. Do not induce vomiting.',
        phoneDial: '911',
        nearestFacilityGuidance: 'Proceed to nearest pediatric ER with fluoroscopy capability.',
        matchedTriggers: ['battery', 'button battery'],
      });

      expect(useAdvisorStore.getState().activeEmergency?.headline).toBe('Suspected Battery Ingestion');
      expect(useAdvisorStore.getState().activeEmergency?.phoneDial).toBe('911');
    });
  });
});
