import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Offline PWA & Connectivity Engine Specification', () => {
  describe('Runtime Caching Rules in next.config.mjs', () => {
    it('configures cache-first strategy for academy and script routes', () => {
      const configPath = path.resolve(__dirname, '../next.config.mjs');
      const configContent = fs.readFileSync(configPath, 'utf-8');

      // Academy cache-first
      expect(configContent).toContain('api\\/v1\\/academy');
      expect(configContent).toContain('"CacheFirst"');
      expect(configContent).toContain('alongside-academy-cache');

      // Scripts cache-first
      expect(configContent).toContain('api\\/v1\\/scripts');
      expect(configContent).toContain('alongside-scripts-cache');
    });

    it('configures stale-while-revalidate strategy for digest updates', () => {
      const configPath = path.resolve(__dirname, '../next.config.mjs');
      const configContent = fs.readFileSync(configPath, 'utf-8');

      expect(configContent).toContain('api\\/v1\\/digest');
      expect(configContent).toContain('"StaleWhileRevalidate"');
      expect(configContent).toContain('alongside-digest-cache');
    });
  });

  describe('Offline Notification Contract', () => {
    it('defines accessible ARIA live attributes for offline states', () => {
      const bannerPath = path.resolve(
        __dirname,
        '../src/components/shared/OfflineBanner.tsx'
      );
      const bannerContent = fs.readFileSync(bannerPath, 'utf-8');

      expect(bannerContent).toContain('role="status"');
      expect(bannerContent).toContain('aria-live="polite"');
      expect(bannerContent).toContain('Offline Mode:');
      expect(bannerContent).toContain('Back Online:');
      expect(bannerContent).toContain('available offline from your local cache');
    });
  });
});
