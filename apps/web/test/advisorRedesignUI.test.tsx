import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { AiMessageDTO } from '@alongside/shared';
import {
  ChatFeed,
  DeEscalationScriptCallout,
  EmergencyDirectiveBanner,
} from '../src/components/advisor/ChatFeed';
import { AdvisorComposer } from '../src/components/advisor/AdvisorComposer';
import { QuickPrompts } from '../src/components/advisor/QuickPrompts';

describe('Parent Advisor Unified Editorial Redesign UI', () => {
  const sampleMessages: AiMessageDTO[] = [
    {
      id: 'm-user-1',
      conversationId: 'conv-1',
      role: 'USER',
      content: 'Maya slammed her door when screen time ended.',
      createdAt: '2026-11-22T15:30:00.000Z',
    },
    {
      id: 'm-ai-1',
      conversationId: 'conv-1',
      role: 'ASSISTANT',
      content:
        'Abrupt screen cutoffs cause a quick dopamine drop.\n\n> "I hear how hard it is to pause mid-game. Let us take two slow breaths, then wrap this round in five minutes."',
      matchedFaqIds: ['faq-screen-transitions'],
      createdAt: '2026-11-22T15:30:05.000Z',
    },
  ];

  it('renders unified ChatFeed with copyable word-for-word script slip and related guide link in both drawer and studio variants', () => {
    const drawerHtml = renderToStaticMarkup(
      <ChatFeed variant="drawer" messages={sampleMessages} childName="Maya" />
    );
    const studioHtml = renderToStaticMarkup(
      <ChatFeed variant="studio" messages={sampleMessages} childName="Maya" />
    );

    for (const html of [drawerHtml, studioHtml]) {
      expect(html).toContain('Maya slammed her door when screen time ended.');
      expect(html).toContain('Parent Advisor');
      expect(html).toContain('What to say');
      expect(html).toContain('Copy');
      expect(html).toContain('I hear how hard it is to pause mid-game');
      expect(html).toContain('Screen Transitions');
      expect(html).toContain('/advisor/faqs?q=Screen%20Transitions');
      // Ensures legacy teal/slate AI slop is gone
      expect(html).not.toContain('bg-teal-600');
      expect(html).not.toContain('Zero Judgment');
    }
  });

  it('renders DeEscalationScriptCallout without italic strain and with clean Copy button', () => {
    const html = renderToStaticMarkup(
      <DeEscalationScriptCallout script='> "You are safe. We will figure this out together."' />
    );
    expect(html).toContain('What to say');
    expect(html).toContain('Copy');
    expect(html).toContain('You are safe. We will figure this out together.');
    expect(html).not.toContain('italic');
  });

  it('renders EmergencyDirectiveBanner with accessible 911 and Poison Control tel links', () => {
    const html = renderToStaticMarkup(
      <EmergencyDirectiveBanner
        emergency={{
          type: 'EMERGENCY_RED_FLAG',
          isEmergency: true,
          category: 'POISONING',
          headline: 'Suspected Battery Ingestion',
          directive: 'Seek immediate pediatric emergency evaluation.',
          phoneDial: '911',
          nearestFacilityGuidance: 'Go to nearest pediatric ER.',
          matchedTriggers: ['battery'],
        }}
      />
    );
    expect(html).toContain('role="alert"');
    expect(html).toContain('Suspected Battery Ingestion');
    expect(html).toContain('href="tel:911"');
    expect(html).toContain('href="tel:18002221222"');
  });

  it('renders AdvisorComposer with Send action when idle and Stop action when streaming', () => {
    const idleHtml = renderToStaticMarkup(
      <AdvisorComposer
        value="How do I handle bedtime stalling?"
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        onStop={vi.fn()}
        isStreaming={false}
        placeholder="Ask about Maya..."
        variant="studio"
      />
    );
    expect(idleHtml).toContain('aria-label="Send message"');
    expect(idleHtml).toContain('Grounded in pediatric neurobiology');

    const streamingHtml = renderToStaticMarkup(
      <AdvisorComposer
        value=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        onStop={vi.fn()}
        isStreaming={true}
        placeholder="Ask about Maya..."
        variant="drawer"
      />
    );
    expect(streamingHtml).toContain('aria-label="Stop response"');
    expect(streamingHtml).toContain('Stop');
  });

  it('renders QuickPrompts with calm editorial labels and no legacy uppercase chrome', () => {
    const html = renderToStaticMarkup(
      <QuickPrompts onSelectPrompt={vi.fn()} />
    );
    expect(html).toContain('Common moments to start with');
    expect(html).toContain('10yo wants Snapchat');
    expect(html).not.toContain('INSTANT CONFLICT STARTERS');
    expect(html).not.toContain('bg-teal-50');
  });
});
