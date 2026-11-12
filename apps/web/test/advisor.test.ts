import { describe, expect, it } from 'vitest';
import { DevelopmentalTier } from '@alongside/shared';
import {
  searchFaqs,
  getFeaturedFaqs,
  streamAiAdvisorChat,
  CURATED_FAQS,
  type StreamChatHandlers,
} from '../src/lib/api/advisor';
import { SITUATIONAL_PROMPTS } from '../src/components/advisor/QuickPrompts';
import {
  formatTierBadge,
  formatCategoryBadge,
} from '../src/components/advisor/FaqCard';

describe('24/7 AI Advisor & Living FAQ Explorer Specification (PLAN-11)', () => {
  describe('Curated FAQ Vault & Search Engine', () => {
    it('contains comprehensive scenarios covering all key digital milestones', () => {
      expect(CURATED_FAQS.length).toBeGreaterThanOrEqual(7);

      const ids = CURATED_FAQS.map((f) => f.id);
      expect(ids).toContain('faq-screen-transitions');
      expect(ids).toContain('faq-first-phone-plea');
      expect(ids).toContain('faq-curfew-explosion');
      expect(ids).toContain('faq-calculator-vault');
      expect(ids).toContain('faq-discord-bullying');
      expect(ids).toContain('faq-roblox-spending');
    });

    it('filters FAQs by keyword across question, answer, and de-escalation scripts', async () => {
      // Search for Roblox microtransactions
      const robloxResults = await searchFaqs({ q: 'roblox' });
      expect(robloxResults.faqs.length).toBeGreaterThanOrEqual(1);
      expect(
        robloxResults.faqs.some(
          (f) => f.question.includes('Roblox') || f.question.includes('Robux')
        )
      ).toBe(true);

      // Search for Snapchat
      const snapResults = await searchFaqs({ q: 'snapchat' });
      expect(snapResults.faqs.length).toBeGreaterThanOrEqual(1);
      expect(snapResults.faqs[0]?.question).toContain('Snapchat');

      // Search for calculator vault
      const vaultResults = await searchFaqs({ q: 'calculator' });
      expect(vaultResults.faqs.length).toBeGreaterThanOrEqual(1);
      expect(vaultResults.faqs[0]?.question.toLowerCase()).toContain('calculator vault');

      // Non-existent search query returns empty
      const emptyResults = await searchFaqs({ q: 'xyz123randomnonexistenttopic' });
      expect(emptyResults.faqs).toHaveLength(0);
    });

    it('filters FAQs by category accurately', async () => {
      const bedtimeFaqs = await searchFaqs({ categoryId: 'BEDTIME_SLEEP' });
      expect(bedtimeFaqs.faqs.length).toBeGreaterThanOrEqual(1);
      expect(bedtimeFaqs.faqs.every((f) => f.categoryId === 'BEDTIME_SLEEP')).toBe(true);

      const secretApps = await searchFaqs({ categoryId: 'SECRET_APPS' });
      expect(secretApps.faqs.length).toBeGreaterThanOrEqual(1);
      expect(secretApps.faqs.every((f) => f.categoryId === 'SECRET_APPS')).toBe(true);
    });

    it('filters FAQs by developmental tier accurately', async () => {
      const tier1Faqs = await searchFaqs({ tier: DevelopmentalTier.TIER_1_AGES_8_9 });
      expect(tier1Faqs.faqs.length).toBeGreaterThanOrEqual(1);
      expect(
        tier1Faqs.faqs.every(
          (f) =>
            !f.targetTier ||
            f.targetTier === DevelopmentalTier.TIER_1_AGES_8_9 ||
            f.targetTier === DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9
        )
      ).toBe(true);

      const tier2Faqs = await searchFaqs({ tier: DevelopmentalTier.TIER_2_AGES_10_11 });
      expect(tier2Faqs.faqs.length).toBeGreaterThanOrEqual(2);
    });

    it('retrieves featured FAQs for quick initial display', async () => {
      const featured = await getFeaturedFaqs();
      expect(featured.faqs.length).toBeGreaterThanOrEqual(3);
      expect(featured.faqs.every((f) => f.isFeatured)).toBe(true);
    });
  });

  describe('Streaming SSE Chat Engine & Fallback Simulation', () => {
    it('streams simulated response chunks, matched FAQs, and triggers completion callbacks', async () => {
      const tokens: string[] = [];
      let matchedFaqsReceived: string[] = [];
      let conversationIdReceived = '';

      const handlers: StreamChatHandlers = {
        onContext: (ctx) => {
          matchedFaqsReceived = ctx.matchedFaqs;
        },
        onToken: (tok) => {
          tokens.push(tok);
        },
        onDone: (done) => {
          conversationIdReceived = done.conversationId;
        },
      };

      await streamAiAdvisorChat(
        {
          message: 'My 10yo wants Snapchat because everyone has it',
        },
        handlers
      );

      expect(matchedFaqsReceived).toContain('faq-first-phone-plea');
      expect(tokens.length).toBeGreaterThan(5);
      const combined = tokens.join('');
      expect(combined).toContain('adrenarche');
      expect(combined).toContain('Recommended De-Escalation Script:');
      expect(conversationIdReceived).toMatch(/^conv-/);
    });

    it('respects AbortSignal to immediately cancel streaming', async () => {
      const controller = new AbortController();
      controller.abort();

      const tokens: string[] = [];
      await streamAiAdvisorChat(
        { message: 'Child slammed door during screen shutoff' },
        {
          onToken: (t) => tokens.push(t),
        },
        { signal: controller.signal }
      );

      // Since aborted before first token, no tokens should accumulate
      expect(tokens).toHaveLength(0);
    });
  });

  describe('Situational Quick Prompts Specification', () => {
    it('contains all 5 canonical emergency prompt starters', () => {
      expect(SITUATIONAL_PROMPTS).toHaveLength(5);

      const prompts = SITUATIONAL_PROMPTS.map((p) => p.prompt);
      expect(prompts).toContain('My 10yo wants Snapchat because everyone has it');
      expect(prompts).toContain('Caught my child on phone past curfew');
      expect(prompts).toContain('Child slammed door during screen shutoff');
      expect(prompts).toContain('Found hidden calculator vault app on iPad');
      expect(prompts).toContain('My 13yo is being bullied on Discord');
    });

    it('associates each prompt with an empathetic icon and category tag', () => {
      for (const item of SITUATIONAL_PROMPTS) {
        expect(item.id).toBeDefined();
        expect(item.label.length).toBeGreaterThan(5);
        expect(item.category).toBeDefined();
        expect(item.icon).toBeDefined();
      }
    });
  });

  describe('FAQ Card Badges & Presentation', () => {
    it('formats developmental tier badges with designated colors and labels', () => {
      const t1 = formatTierBadge(DevelopmentalTier.TIER_1_AGES_8_9);
      expect(t1.label).toContain('Ages 8-9');
      expect(t1.badgeClass).toContain('emerald');

      const t2 = formatTierBadge(DevelopmentalTier.TIER_2_AGES_10_11);
      expect(t2.label).toContain('Ages 10-11');
      expect(t2.badgeClass).toContain('teal');

      const t3 = formatTierBadge(DevelopmentalTier.TIER_3_AGES_12_13);
      expect(t3.label).toContain('Ages 12-13');
      expect(t3.badgeClass).toContain('indigo');

      const t4 = formatTierBadge(DevelopmentalTier.TIER_4_AGES_14_PLUS);
      expect(t4.label).toContain('Ages 14+');
      expect(t4.badgeClass).toContain('purple');

      const defaultTier = formatTierBadge(null);
      expect(defaultTier.label).toBe('All Developmental Tiers');
    });

    it('formats category badges with contextual theme styling', () => {
      const screenBattles = formatCategoryBadge('SCREEN_BATTLES');
      expect(screenBattles.label).toContain('Screen Battles');
      expect(screenBattles.badgeClass).toContain('amber');

      const peerPressure = formatCategoryBadge('PEER_PRESSURE');
      expect(peerPressure.label).toContain('Peer Pressure');
      expect(peerPressure.badgeClass).toContain('rose');

      const bedtime = formatCategoryBadge('BEDTIME_SLEEP');
      expect(bedtime.label).toContain('Bedtime');
      expect(bedtime.badgeClass).toContain('blue');

      const secretApps = formatCategoryBadge('SECRET_APPS');
      expect(secretApps.label).toContain('Secret Vaults');
      expect(secretApps.badgeClass).toContain('violet');
    });
  });
});
