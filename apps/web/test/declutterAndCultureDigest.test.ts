import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { calculateEstimatedWeightLbs } from '../src/hooks/useChildAge';

describe('Decluttering, Realistic Pediatric Weight & Sunday Culture Digest Specification', () => {
  const webRoot = path.resolve(__dirname, '..');

  describe('1. Play Tab (Brain Games) Decluttering', () => {
    it('removes the redundant "Go to Behavior Hub (HALT)" button', () => {
      const filePath = path.join(
        webRoot,
        'src/components/brain-games/BrainGamesDashboardView.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).not.toContain('Go to Behavior Hub (HALT)');
      expect(content).not.toContain('href="/behavior"');
    });
  });

  describe('2. Behavior Tab Dilemma Redundancy Removal', () => {
    it('removes the redundant second dilemma calibration card in Scripts vault while preserving stage toggle', () => {
      const filePath = path.join(
        webRoot,
        'src/components/behavior/BehaviorDashboardView.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf8');

      // The redundant card previously had: Active Age Calibration Status Chip & View All Toggle
      expect(content).not.toContain('Active Age Calibration Status Chip & View All Toggle');
      // The dilemma header now cleanly houses the stage filter toggle
      expect(content).toContain('isViewingAllAges ? \'All Age Dilemmas:\' : \'Calibrated Dilemmas:\'');
      expect(content).toContain('isViewingAllAges ? \'Filter to \' + childAge.name : \'View All Ages\'');
    });
  });

  describe('3. Pediatric Weight Calculation & Editable Input in Health Triage', () => {
    it('calculates realistic weight for an 8-year-old (~60 lbs / ~27 kg) instead of absurd 224 lbs', () => {
      // 8 years = 96 to 102 months
      const weightLbs = calculateEstimatedWeightLbs(96, 8);
      expect(weightLbs).toBe(60);
      const weightKg = Number((weightLbs * 0.453592).toFixed(1));
      expect(weightKg).toBe(27.2);
    });

    it('ensures SymptomTriageRunner uses calculateEstimatedWeightLbs and provides editable input', () => {
      const filePath = path.join(
        webRoot,
        'src/components/health/SymptomTriageRunner.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf8');

      // Uses proper Barton Schmitt / CDC derivation
      expect(content).toContain('calculateEstimatedWeightLbs(computedMonths, Math.floor(computedMonths / 12))');
      // Does not use the broken computedMonths * 2.2 formula
      expect(content).not.toContain('computedMonths * 2.2');
      // Provides editable weight input
      expect(content).toContain('id="triage-weight-input"');
      expect(content).toContain('onChange={(e) => setWeightLbs(');
    });
  });

  describe('4. Sunday Culture Digest Page & Home Feed Integration', () => {
    it('restores /digest page to render DigestDashboardClient with full intel and search', () => {
      const filePath = path.join(
        webRoot,
        'src/app/(dashboard)/digest/page.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('DigestDashboardClient');
      expect(content).not.toContain('redirect(\'/devices?tab=digest\')');
    });

    it('mounts SundayCultureDigestCard cleanly on HolisticHomeFeed', () => {
      const filePath = path.join(
        webRoot,
        'src/components/dashboard/HolisticHomeFeed.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('SundayCultureDigestCard');
      expect(content).toContain('<SundayCultureDigestCard child={activeChild} />');
    });

    it('validates SundayCultureDigestCard renders dinner table prompt, slang chips and link', () => {
      const filePath = path.join(
        webRoot,
        'src/components/dashboard/SundayCultureDigestCard.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('Sunday Youth Culture Digest');
      expect(content).toContain('Sunday Dinner Table Starter');
      expect(content).toContain('Trending Radar:');
      expect(content).toContain('href="/digest"');
    });
  });
});
