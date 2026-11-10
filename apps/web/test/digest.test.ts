import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { ExploitSeverity } from '@alongside/shared';
import { getSlangToneDetails } from '../src/components/digest/SlangCard';
import { getSeverityDetails } from '../src/components/digest/ExploitAlertCard';
import {
  getLatestDigest,
  searchSlang,
  getExploitAlerts,
} from '../src/lib/api/digest';

describe('Sunday Youth Culture Digest Component & API Specification', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });
  describe('Slang Tone Classification', () => {
    it('classifies red flag and toxic slang terms with high-alert styling', () => {
      const toxic1 = getSlangToneDetails('Toxic Alert');
      expect(toxic1.type).toBe('TOXIC');
      expect(toxic1.label).toContain('Toxic Alert / Red Flag');
      expect(toxic1.badgeClass).toContain('rose');

      const toxic2 = getSlangToneDetails('Severe Red Flag');
      expect(toxic2.type).toBe('TOXIC');

      const toxic3 = getSlangToneDetails('Derogatory Slang');
      expect(toxic3.type).toBe('TOXIC');
    });

    it('classifies caution-level slang terms with amber styling', () => {
      const caution1 = getSlangToneDetails('Caution Recommended');
      expect(caution1.type).toBe('CAUTION');
      expect(caution1.label).toBe('Use Caution');
      expect(caution1.badgeClass).toContain('amber');

      const caution2 = getSlangToneDetails('Borderline Warning');
      expect(caution2.type).toBe('CAUTION');
    });

    it('classifies playful, venting, and harmless slang with calm emerald styling', () => {
      const harmless1 = getSlangToneDetails('Harmless Slang');
      expect(harmless1.type).toBe('HARMLESS');
      expect(harmless1.badgeClass).toContain('emerald');

      const harmless2 = getSlangToneDetails('Playful or venting');
      expect(harmless2.type).toBe('HARMLESS');
      expect(harmless2.label).toBe('Playful or venting');
      expect(harmless2.badgeClass).toContain('emerald');
    });
  });

  describe('Exploit Severity Details & Remedy Parsing', () => {
    it('provides distinct badge styling and iconography across all 4 severity tiers', () => {
      const critical = getSeverityDetails(ExploitSeverity.CRITICAL);
      expect(critical.label).toContain('Critical');
      expect(critical.badgeClass).toContain('rose');

      const high = getSeverityDetails(ExploitSeverity.HIGH);
      expect(high.label).toContain('High');
      expect(high.badgeClass).toContain('orange');

      const medium = getSeverityDetails(ExploitSeverity.MEDIUM);
      expect(medium.label).toContain('Medium');
      expect(medium.badgeClass).toContain('amber');

      const low = getSeverityDetails(ExploitSeverity.LOW);
      expect(low.label).toContain('Awareness');
      expect(low.badgeClass).toContain('slate');
    });

    it('splits multiline or numbered parent remedies into distinct actionable steps', () => {
      const complexRemedy =
        '1. Check Settings > General > iPhone Storage for duplicate calculator apps. 2. Ask child neutrally about unknown passcodes. 3. Update Bilateral Pact.';
      const steps = complexRemedy
        .split(/(?:\d+\.\s+|\n+|;\s+)/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      expect(steps).toHaveLength(3);
      expect(steps[0]).toContain('Check Settings');
      expect(steps[1]).toContain('Ask child neutrally');
      expect(steps[2]).toContain('Update Bilateral Pact');
    });
  });

  describe('Digest API Client', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('invokes GET /api/v1/digest/latest and returns the latest issue', async () => {
      const mockDigest = {
        id: 'dig-1',
        issueNumber: 42,
        publishDate: '2026-11-01T00:00:00.000Z',
        title: 'Crashout and Vault Apps',
        summary: 'Tween breakdown',
        conversationStarter: 'What was your funniest meme this week?',
        slangTerms: [
          {
            id: 'slang-1',
            term: 'Crashout',
            definition: 'Explosive emotional reaction',
            exampleSentence: 'He had a crashout over his math test',
            contextTone: 'Playful or venting',
          },
        ],
        exploitAlerts: [
          {
            id: 'exp-1',
            appName: 'Calculator+',
            exploitDescription: 'Secret photo vault',
            howKidsBypass: 'Looks like working calculator',
            parentRemedy: 'Inspect storage usage',
            severity: ExploitSeverity.HIGH,
          },
        ],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: { digest: mockDigest },
        }),
      });

      const res = await getLatestDigest();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/digest/latest'),
        expect.any(Object)
      );
      expect(res.digest.issueNumber).toBe(42);
      expect(res.digest.slangTerms).toHaveLength(1);
      expect(res.digest.exploitAlerts).toHaveLength(1);
    });

    it('invokes GET /api/v1/digest/slang with search term query parameter', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: {
            slangTerms: [
              {
                id: 'slang-2',
                term: 'Rizz',
                definition: 'Charisma',
                exampleSentence: 'Unspoken rizz',
                contextTone: 'Harmless Slang',
              },
            ],
          },
        }),
      });

      const res = await searchSlang('rizz');
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/digest/slang?q=rizz&term=rizz'),
        expect.any(Object)
      );
      expect(res.slangTerms).toHaveLength(1);
      expect(res.slangTerms[0]?.term).toBe('Rizz');
    });

    it('invokes GET /api/v1/digest/exploits with severity query parameter', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: {
            exploitAlerts: [
              {
                id: 'exp-crit',
                appName: 'Tor Proxy Browser',
                exploitDescription: 'Bypasses router DNS locks',
                howKidsBypass: 'Encrypted onion routing',
                parentRemedy: 'Block app installation via Pact profile',
                severity: ExploitSeverity.CRITICAL,
              },
            ],
          },
        }),
      });

      const res = await getExploitAlerts(ExploitSeverity.CRITICAL);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/digest/exploits?severity=CRITICAL'),
        expect.any(Object)
      );
      expect(res.exploitAlerts[0]?.severity).toBe('CRITICAL');
    });
  });
});
