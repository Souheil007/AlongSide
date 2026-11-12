import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import {
  DevelopmentalTier,
  RoadType,
  type ChildDTO,
} from '@alongside/shared';
import {
  CULTURAL_REELS_BY_STAGE,
  resolveReelsStage,
} from '../src/components/digest/CulturalReelsView';
import {
  MAGAZINE_ARTICLES_BY_STAGE,
  resolveMagazineStage,
} from '../src/components/digest/WeeklyMagazineView';
import {
  GENERATIONAL_MIRRORS_BY_STAGE,
  resolveMirrorStage,
} from '../src/components/digest/GenerationalTimeMirrorView';
import {
  STAGE_VOCABULARY_DATA,
  resolveVocabStage,
  StageTailoredVocabularyView,
  VOCABULARY_PAGE_SIZE,
} from '../src/components/digest/StageTailoredVocabularyView';

describe('Culture Digest: Direction L Living Cultural Magazine Specification', () => {
  const mockJulian: ChildDTO = {
    id: 'child-julian',
    userId: 'parent-1',
    name: 'Julian',
    age: 14,
    birthYear: 2012,
    birthMonth: 8,
    roadType: RoadType.ACTIVE_DEVICE,
    developmentalTier: DevelopmentalTier.TIER_4_AGES_14_PLUS,
    schoolGrade: '9th Grade',
    latestAssessmentScore: 92,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockMaya: ChildDTO = {
    id: 'child-maya',
    userId: 'parent-1',
    name: 'Maya',
    age: 8,
    birthYear: 2018,
    birthMonth: 5,
    roadType: RoadType.PRE_DEVICE,
    developmentalTier: DevelopmentalTier.TIER_1_AGES_8_9,
    schoolGrade: '3rd Grade',
    latestAssessmentScore: 74,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockMateo: ChildDTO = {
    id: 'child-mateo',
    userId: 'parent-1',
    name: 'Mateo',
    age: 1,
    birthYear: 2025,
    birthMonth: 9,
    roadType: RoadType.PRE_DEVICE,
    developmentalTier: 'TIER_0_INFANCY_TODDLER_0_3' as unknown as DevelopmentalTier,
    schoolGrade: 'Infant Daycare',
    latestAssessmentScore: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe('1. Pillar 1: 45-Second Parent Reels (CulturalReelsView)', () => {
    it('resolves correct stage for infant, elementary, and adolescent children', () => {
      expect(resolveReelsStage(mockMateo)).toBe('INFANT');
      expect(resolveReelsStage(mockMaya)).toBe('ELEMENTARY');
      expect(resolveReelsStage(mockJulian)).toBe('ADOLESCENT');
      expect(resolveReelsStage(null)).toBe('ADOLESCENT');
    });

    it('contains 3 high-impact reels tailored for adolescents', () => {
      const adolescentReels = CULTURAL_REELS_BY_STAGE.ADOLESCENT;
      expect(adolescentReels).toHaveLength(3);
      expect(adolescentReels.some((r) => r.title.includes('Crashout'))).toBe(true);
      expect(adolescentReels.some((r) => r.title.includes('Discord Voice Calls'))).toBe(true);
      expect(adolescentReels.some((r) => r.title.includes('Aura Points'))).toBe(true);

      const crashoutReel = adolescentReels.find((r) => r.title.includes('Crashout'));
      expect(crashoutReel?.script).toContain("It sounds like people were on edge at school today");
      expect(crashoutReel?.pediatricTitle).toContain('Why Teens Dread Losing Composure');
    });

    it('contains 3 developmentally calibrated reels for elementary children', () => {
      const elemReels = CULTURAL_REELS_BY_STAGE.ELEMENTARY;
      expect(elemReels).toHaveLength(3);
      expect(elemReels.some((r) => r.title.includes('Pokemon Card Economy'))).toBe(true);
      expect(elemReels.some((r) => r.title.includes('Roblox Obbies'))).toBe(true);
      expect(elemReels.some((r) => r.title.includes('Squishmallows'))).toBe(true);
    });

    it('contains 3 sensory-acoustic reels for infants and toddlers', () => {
      const infantReels = CULTURAL_REELS_BY_STAGE.INFANT;
      expect(infantReels).toHaveLength(3);
      expect(infantReels.some((r) => r.title.includes('Ms. Rachel'))).toBe(true);
      expect(infantReels.some((r) => r.title.includes('High-Chair Gravity'))).toBe(true);
      expect(infantReels.some((r) => r.title.includes('Mirror Neurons'))).toBe(true);
    });
  });

  describe('2. Pillar 2: Weekly Magazine & Field Dispatches (WeeklyMagazineView)', () => {
    it('resolves magazine stage correctly across the lifespan', () => {
      expect(resolveMagazineStage(mockMateo)).toBe('INFANT');
      expect(resolveMagazineStage(mockMaya)).toBe('ELEMENTARY');
      expect(resolveMagazineStage(mockJulian)).toBe('ADOLESCENT');
    });

    it('features 1 lead story and 2 companion essays with actionable takeaways for teens', () => {
      const articles = MAGAZINE_ARTICLES_BY_STAGE.ADOLESCENT;
      expect(articles).toHaveLength(3);
      const lead = articles.find((a) => a.isLead);
      expect(lead).toBeDefined();
      expect(lead?.title).toContain('The Algorithmic Rage-Bait Trap');
      expect(lead?.content.length).toBeGreaterThanOrEqual(2);
      expect(lead?.takeaway).toContain('corporate manipulation');
    });

    it('features age-relevant elementary blacktop and digital ethics essays', () => {
      const articles = MAGAZINE_ARTICLES_BY_STAGE.ELEMENTARY;
      expect(articles.some((a) => a.title.includes('Blacktop Barter Market'))).toBe(true);
      expect(articles.some((a) => a.title.includes('Minecraft Bedrock'))).toBe(true);
      expect(articles.some((a) => a.title.includes('Pre-Device Sanctuary Advantage'))).toBe(true);
    });

    it('features infant acoustic nesting and speech phoneme essays', () => {
      const articles = MAGAZINE_ARTICLES_BY_STAGE.INFANT;
      expect(articles.some((a) => a.title.includes('Acoustic Nesting'))).toBe(true);
      expect(articles.some((a) => a.title.includes('Pre-Verbal Phonemes'))).toBe(true);
      expect(articles.some((a) => a.title.includes('High-Chair Sensory Architecture'))).toBe(true);
    });
  });

  describe('3. Pillar 3: Generational Time Mirror (GenerationalTimeMirrorView)', () => {
    it('compares past era (1999) with present era (2026) across 4 dimensions', () => {
      const teenMirror = GENERATIONAL_MIRRORS_BY_STAGE.ADOLESCENT;
      expect(teenMirror.dimensions).toHaveLength(4);
      expect(teenMirror.dimensions.some((d) => d.then.includes('AOL Instant Messenger'))).toBe(true);
      expect(teenMirror.dimensions.some((d) => d.now.includes('Discord persistent voice'))).toBe(true);
      expect(teenMirror.insight).toContain('Every generation invents a cultural clubhouse');
    });

    it('adapts generational dimensions for elementary and toddler stages', () => {
      const elemMirror = GENERATIONAL_MIRRORS_BY_STAGE.ELEMENTARY;
      expect(elemMirror.dimensions.some((d) => d.then.includes('Pogs, Slammers'))).toBe(true);
      expect(elemMirror.dimensions.some((d) => d.now.includes('Pokemon cards'))).toBe(true);

      const infantMirror = GENERATIONAL_MIRRORS_BY_STAGE.INFANT;
      expect(infantMirror.dimensions.some((d) => d.then.includes('Barney tapes'))).toBe(true);
      expect(infantMirror.dimensions.some((d) => d.now.includes('Ms. Rachel songs'))).toBe(true);
    });
  });

  describe('4. Pillar 4: Stage-Tailored Micro-Language Decoder (StageTailoredVocabularyView)', () => {
    it('marks adolescents eligible for slang with modern peer vocabulary (12 extended terms)', () => {
      const teenConfig = STAGE_VOCABULARY_DATA.ADOLESCENT;
      expect(teenConfig.eligibleForSlang).toBe(true);
      expect(teenConfig.terms.length).toBe(12);
      expect(teenConfig.terms.some((t) => t.word === 'Crashout')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Aura Points')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Cooked')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Locked In')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Rizz')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Mewing')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Sigma')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Delulu')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Side Eye')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Main Character')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Rent Free')).toBe(true);
      expect(teenConfig.terms.some((t) => t.word === 'Valid')).toBe(true);
    });

    it('marks elementary eligible for playground and gaming vernacular (12 extended terms)', () => {
      const elemConfig = STAGE_VOCABULARY_DATA.ELEMENTARY;
      expect(elemConfig.eligibleForSlang).toBe(true);
      expect(elemConfig.terms.length).toBe(12);
      expect(elemConfig.terms.some((t) => t.word === 'Griefing')).toBe(true);
      expect(elemConfig.terms.some((t) => t.word === 'No Backsies')).toBe(true);
      expect(elemConfig.terms.some((t) => t.word === 'Duping')).toBe(true);
      expect(elemConfig.terms.some((t) => t.word === 'Bruh / Oof')).toBe(true);
      expect(elemConfig.terms.some((t) => t.word.includes('Nerfed'))).toBe(true);
      expect(elemConfig.terms.some((t) => t.word === 'Spawn Camping')).toBe(true);
      expect(elemConfig.terms.some((t) => t.word === 'NPC')).toBe(true);
      expect(elemConfig.terms.some((t) => t.word.includes('Clutched'))).toBe(true);
      expect(elemConfig.terms.some((t) => t.word === 'Sus')).toBe(true);
      expect(elemConfig.terms.some((t) => t.word.includes('Cap'))).toBe(true);
      expect(elemConfig.terms.some((t) => t.word === 'Jinx')).toBe(true);
      expect(elemConfig.terms.some((t) => t.word === 'Tryhard')).toBe(true);
    });

    it('strictly marks infants NOT eligible for slang and displays pre-verbal signal decoder (8 extended terms)', () => {
      const infantConfig = STAGE_VOCABULARY_DATA.INFANT;
      expect(infantConfig.eligibleForSlang).toBe(false);
      expect(infantConfig.terms.length).toBe(8);
      expect(infantConfig.bannerNotice).toContain('Youth internet slang is not applicable to an infant');
      expect(infantConfig.terms.some((t) => t.word === 'Referential Pointing')).toBe(true);
      expect(infantConfig.terms.some((t) => t.word === 'Lip Trills / Raspberries')).toBe(true);
      expect(infantConfig.terms.some((t) => t.word.includes('Ba-Ba'))).toBe(true);
      expect(infantConfig.terms.some((t) => t.word.includes('Dunstan'))).toBe(true);
    });

    it('renders clean 4-per-page pagination with Previous and Next controls (Option 1)', () => {
      const mockElemChild: ChildDTO = {
        ...mockJulian,
        id: 'child-elem',
        name: 'Sam',
        age: 8,
        developmentalTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
      };

      const html = renderToStaticMarkup(
        <StageTailoredVocabularyView child={mockElemChild} />
      );

      // Verify page 1 shows terms 1 to 4 of 12
      expect(html).toContain('Showing 1–4 of 12 terms');
      expect(html).toContain('Previous 4');
      expect(html).toContain('Next 4');
      expect(html).toContain('Page 1 of 3');

      // Verify Page 1 terms are rendered
      expect(html).toContain('Griefing');
      expect(html).toContain('No Backsies');
      expect(html).toContain('Duping');
      expect(html).toContain('Bruh / Oof');

      // Verify Page 2 terms are sliced out of initial page 1 markup
      expect(html).not.toContain('Spawn Camping');
      expect(html).not.toContain('Tryhard');
    });
  });
});
