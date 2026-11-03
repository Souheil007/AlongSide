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
import {
  SPARRING_SCENARIOS,
} from '../src/components/advisor/VoiceSparringModal';

describe('24/7 AI Advisor, Living FAQ Explorer & Voice Sparring Specification (PLAN-11)', () => {
  describe('Curated FAQ Vault & Search Engine', () => {
    it('contains comprehensive clinical scenarios covering all key digital milestones', () => {
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
      expect(robloxResults.faqs).toHaveLength(1);
      expect(robloxResults.faqs[0]?.question).toContain('Robux');

      // Search for Snapchat
      const snapResults = await searchFaqs({ q: 'snapchat' });
      expect(snapResults.faqs.length).toBeGreaterThanOrEqual(1);
      expect(snapResults.faqs[0]?.question).toContain('Snapchat');

      // Search for calculator vault
      const vaultResults = await searchFaqs({ q: 'calculator' });
      expect(vaultResults.faqs.length).toBeGreaterThanOrEqual(1);
      expect(vaultResults.faqs[0]?.question).toContain('calculator vault');

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
          (f) => !f.targetTier || f.targetTier === DevelopmentalTier.TIER_1_AGES_8_9
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

  describe('Interactive Voice Sparring Simulator Scenarios & Coaching', () => {
    it('defines the 3 canonical high-heat conflict scenarios', () => {
      expect(SPARRING_SCENARIOS).toHaveLength(3);

      const keys = SPARRING_SCENARIOS.map((s) => s.key);
      expect(keys).toContain('A');
      expect(keys).toContain('B');
      expect(keys).toContain('C');

      const titles = SPARRING_SCENARIOS.map((s) => s.title);
      expect(titles).toContain('The Phone Plea');
      expect(titles).toContain('The Curfew Explosion');
      expect(titles).toContain('The Trust Accusation');
    });

    it('provides realistic child objection dialogues and duration timings for audio simulation', () => {
      for (const scenario of SPARRING_SCENARIOS) {
        expect(scenario.childDialogue.length).toBeGreaterThan(20);
        expect(scenario.audioDurationSeconds).toBeGreaterThanOrEqual(3);
        expect(scenario.developmentalContext).toBeDefined();
      }
    });

    it('supplies 3 distinct response patterns (Recommended, Punitive, Concession) for each scenario', () => {
      for (const scenario of SPARRING_SCENARIOS) {
        expect(scenario.options).toHaveLength(3);

        const recommended = scenario.options.find((o) => o.clinicalVerdict === 'RECOMMENDED');
        expect(recommended).toBeDefined();
        expect(recommended?.toneType).toBe('EMPATHETIC_FIRM');
        expect(recommended?.toneScore).toContain('(');
        expect(recommended?.firmnessScore).toContain('(');
        expect(recommended?.neurobiologyFeedback.length).toBeGreaterThan(25);

        const escalating = scenario.options.find((o) => o.clinicalVerdict === 'ESCALATING');
        expect(escalating).toBeDefined();
        expect(escalating?.toneType).toBe('DEFENSIVE_PUNITIVE');

        const permissive = scenario.options.find((o) => o.clinicalVerdict === 'PERMISSIVE');
        expect(permissive).toBeDefined();
        expect(permissive?.toneType).toBe('PASSIVE_CONCESSION');
      }
    });
  });
});
