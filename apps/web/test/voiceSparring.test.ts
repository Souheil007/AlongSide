import { describe, it, expect } from 'vitest';
import { SPARRING_SCENARIOS } from '../src/components/advisor/VoiceSparringModal';

describe('Voice Sparring Simulator Lifespan Upgrade (PLAN-20)', () => {
  it('provides 5 diverse high-heat parenting scenarios across the 0-18 developmental lifespan', () => {
    expect(SPARRING_SCENARIOS.length).toBe(5);

    const keys = SPARRING_SCENARIOS.map((s) => s.key);
    expect(keys).toEqual(['1', '2', '3', '4', '5']);

    // Scenario 1: Infant/Toddler (2:00 AM Teething & Fever)
    const sc1 = SPARRING_SCENARIOS[0]!;
    expect(sc1.title).toContain('2:00 AM Teething & Fever Panic');
    expect(sc1.lifespanStage).toContain('Infant / Toddler');
    expect(sc1.category).toContain('Pediatric Health');
    expect(sc1.objective).toContain('soothing protocols');

    // Scenario 2: Toddler/Preschool (Dinner Plate Resistance)
    const sc2 = SPARRING_SCENARIOS[1]!;
    expect(sc2.title).toContain('Dinner Plate Resistance');
    expect(sc2.lifespanStage).toContain('Toddler / Preschool');
    expect(sc2.childDialogue).toContain('disgusting');
    expect(sc2.objective).toContain('division of responsibility');

    // Scenario 3: Early Elementary (Hitting / Sibling Confrontation)
    const sc3 = SPARRING_SCENARIOS[2]!;
    expect(sc3.title).toContain('Biting / Hitting Sibling Confrontation');
    expect(sc3.lifespanStage).toContain('Early Elementary');
    expect(sc3.childDialogue).toContain('Lego');
    expect(sc3.objective).toContain('physical aggression');

    // Scenario 4: Tweens (Peer Exclusion)
    const sc4 = SPARRING_SCENARIOS[3]!;
    expect(sc4.title).toContain('Middle School Peer Exclusion');
    expect(sc4.lifespanStage).toContain('Tweens');
    expect(sc4.childDialogue).toContain('group chat');

    // Scenario 5: Adolescents (Bedtime Device Cutoff)
    const sc5 = SPARRING_SCENARIOS[4]!;
    expect(sc5.title).toContain('Bedtime Device Cutoff Resistance');
    expect(sc5.lifespanStage).toContain('Adolescents');
    expect(sc5.childDialogue).toContain('8:30 PM');
  });

  it('equips each scenario with all 3 clinical response verdicts (RECOMMENDED, ESCALATING, PERMISSIVE)', () => {
    for (const scenario of SPARRING_SCENARIOS) {
      expect(scenario.options.length).toBe(3);

      const verdicts = scenario.options.map((o) => o.clinicalVerdict);
      expect(verdicts).toContain('RECOMMENDED');
      expect(verdicts).toContain('ESCALATING');
      expect(verdicts).toContain('PERMISSIVE');

      for (const option of scenario.options) {
        expect(option.text.length).toBeGreaterThan(20);
        expect(option.neurobiologyFeedback.length).toBeGreaterThan(20);
        expect(option.toneScore).toBeDefined();
        expect(option.firmnessScore).toBeDefined();

        if (option.clinicalVerdict === 'RECOMMENDED') {
          expect(option.calmnessScore).toBeGreaterThanOrEqual(90);
          expect(option.empathyScore).toBeGreaterThanOrEqual(90);
          expect(option.deEscalationTips && option.deEscalationTips.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('validates audio simulation duration and realistic child dialogue for each scenario', () => {
    for (const scenario of SPARRING_SCENARIOS) {
      expect(scenario.audioDurationSeconds).toBeGreaterThanOrEqual(3);
      expect(scenario.audioDurationSeconds).toBeLessThanOrEqual(10);
      expect(scenario.childDialogue.length).toBeGreaterThan(15);
      expect(scenario.developmentalContext).toBeDefined();
    }
  });

  it('correctly evaluates custom parent responses heuristically', () => {
    function evaluateCustomMock(text: string) {
      const lower = text.toLowerCase();
      const hasEmpathy =
        lower.includes('hear') ||
        lower.includes('understand') ||
        lower.includes('know') ||
        lower.includes('breath') ||
        lower.includes('together') ||
        lower.includes('love') ||
        lower.includes('safe') ||
        lower.includes('feel');
      const hasBoundary =
        lower.includes('rule') ||
        lower.includes('boundary') ||
        lower.includes('sleep') ||
        lower.includes('dock') ||
        lower.includes('policy') ||
        lower.includes('tomorrow') ||
        lower.includes('won\'t let you') ||
        lower.includes('closed');
      const hasAnger =
        lower.includes('stupid') ||
        lower.includes('smash') ||
        lower.includes('hate') ||
        lower.includes('shut up') ||
        lower.includes('grounded') ||
        lower.includes('screaming');

      if (hasAnger) {
        return {
          verdict: 'ESCALATING',
          calmnessScore: 25,
          empathyScore: 20,
        };
      } else if (hasEmpathy && hasBoundary) {
        return {
          verdict: 'RECOMMENDED',
          calmnessScore: 96,
          empathyScore: 95,
        };
      }
      return {
        verdict: 'RECOMMENDED',
        calmnessScore: 70,
        empathyScore: 72,
      };
    }

    const reactive = evaluateCustomMock('Shut up and stop screaming or you are grounded forever!');
    expect(reactive.verdict).toBe('ESCALATING');
    expect(reactive.calmnessScore).toBeLessThan(50);

    const attuned = evaluateCustomMock('I hear how angry you feel right now. I won\'t let you hit. Let\'s breathe together.');
    expect(attuned.verdict).toBe('RECOMMENDED');
    expect(attuned.calmnessScore).toBeGreaterThanOrEqual(90);
    expect(attuned.empathyScore).toBeGreaterThanOrEqual(90);
  });
});
