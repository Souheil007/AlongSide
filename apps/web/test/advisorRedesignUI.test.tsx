import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { AiMessageDTO } from '@alongside/shared';
import {
  ChatFeed,
  DeEscalationScriptCallout,
  EmergencyDirectiveBanner,
  computeStreamingScrollTop,
  isScrollNearBottom,
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

  describe('Streaming scroll anchoring (computeStreamingScrollTop & isScrollNearBottom)', () => {
    it('keeps fresh conversation anchored near user question instead of pushing top of long streaming answer off-screen', () => {
      const target = computeStreamingScrollTop({
        scrollHeight: 1400,
        clientHeight: 500,
        currentScrollTop: 0,
        latestUserMessageTop: 24,
        activeResponseTop: 120,
      });
      expect(target).toBe(8);
    });

    it('advances scroll in multi-turn chat until latest question reaches top padding, then holds steady while answer grows', () => {
      const initialTarget = computeStreamingScrollTop({
        scrollHeight: 1600,
        clientHeight: 500,
        currentScrollTop: 600,
        latestUserMessageTop: 950,
        activeResponseTop: 1030,
      });
      expect(initialTarget).toBe(934);

      // More tokens stream in, increasing scrollHeight without shifting the anchor
      const midStreamTarget = computeStreamingScrollTop({
        scrollHeight: 2100,
        clientHeight: 500,
        currentScrollTop: initialTarget,
        latestUserMessageTop: 950,
        activeResponseTop: 1030,
      });
      expect(midStreamTarget).toBe(934);
    });

    it('adjusts anchor for very tall user prompts so opening of AI response stays visible', () => {
      const target = computeStreamingScrollTop({
        scrollHeight: 1800,
        clientHeight: 500,
        currentScrollTop: 400,
        latestUserMessageTop: 500,
        activeResponseTop: 900,
      });
      // responseAnchorTop = 900 - floor(500 * 0.35) = 900 - 175 = 725 > 484
      expect(target).toBe(725);
    });

    it('never scrolls backwards when currentScrollTop is already past the anchor', () => {
      const target = computeStreamingScrollTop({
        scrollHeight: 2000,
        clientHeight: 500,
        currentScrollTop: 1200,
        latestUserMessageTop: 950,
        activeResponseTop: 1030,
      });
      expect(target).toBe(1200);
    });

    it('returns 0 for short conversations that fit within the viewport', () => {
      const target = computeStreamingScrollTop({
        scrollHeight: 420,
        clientHeight: 500,
        currentScrollTop: 0,
        latestUserMessageTop: 20,
        activeResponseTop: 90,
      });
      expect(target).toBe(0);
    });

    it('detects whether scroll position is near bottom for jump button visibility', () => {
      expect(isScrollNearBottom(850, 1400, 500)).toBe(true); // 50px remaining <= 72px
      expect(isScrollNearBottom(828, 1400, 500)).toBe(true); // exact 72px boundary
      expect(isScrollNearBottom(700, 1400, 500)).toBe(false); // 200px remaining > 72px
    });
  });
});
