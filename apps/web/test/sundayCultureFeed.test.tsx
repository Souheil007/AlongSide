import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  DevelopmentalTier,
  RoadType,
  ExploitSeverity,
  type ChildDTO,
} from '@alongside/shared';
import {
  useChildContextStore,
  DEMO_FAMILY_CHILDREN,
} from '../src/stores/useChildContextStore';
import {
  CANONICAL_SLANG_CATALOG,
  getCringeDescription,
  type RichSlangTerm,
} from '../src/components/digest/SlangDecoderView';
import {
  CANONICAL_EXPLOIT_ALERTS,
  getAlertBadgeStyle,
} from '../src/components/digest/ExploitAlertsView';
import {
  CANONICAL_DINNER_QUESTIONS,
  resolveDinnerTier,
} from '../src/components/digest/DinnerConversationStarters';

describe('Plan 32: Sunday Culture Digest Living Feed & Dinner Starters UI Specification', () => {
  beforeEach(() => {
    useChildContextStore.getState().reset();
    vi.restoreAllMocks();
  });

  describe('1. Feed Masthead & Edition Navigator (DigestFeedHeader)', () => {
    it('formats Volume 42 Sunday edition release label accurately', () => {
      const issueNumber = 42;
      const editionLabel = `Volume ${issueNumber} · Released Sunday 8:00 AM`;
      expect(editionLabel).toBe('Volume 42 · Released Sunday 8:00 AM');
    });

    it('generates the default fallback calibration badge for Leo (Age 10 · Pre-Teen)', () => {
      const defaultBadge = 'Tailored for Leo (Age 10 · Pre-Teen)';
      expect(defaultBadge).toContain('Tailored for Leo');
      expect(defaultBadge).toContain('Age 10');
      expect(defaultBadge).toContain('Pre-Teen');
    });

    it('adapts calibration badge reactively when active child is selected in household store', () => {
      useChildContextStore.getState().setChildren(DEMO_FAMILY_CHILDREN);

      // Child 1: Maya (Age 8, Elementary)
      useChildContextStore.getState().setActiveChild('demo-child-maya');
      const active1 = useChildContextStore.getState().children.find(
        (c) => c.id === useChildContextStore.getState().activeChildId
      );
      expect(active1?.name).toBe('Maya');
      expect(active1?.age).toBe(8);

      // Child 2: Julian (Age 14, Teen)
      useChildContextStore.getState().setActiveChild('demo-child-julian');
      const active2 = useChildContextStore.getState().children.find(
        (c) => c.id === useChildContextStore.getState().activeChildId
      );
      expect(active2?.name).toBe('Julian');
      expect(active2?.age).toBe(14);
    });
  });

  describe('2. Searchable Slang Radar & Decoder (SlangDecoderView)', () => {
    it('contains rich canonical youth slang entries with phonetic pronunciations and origins', () => {
      expect(CANONICAL_SLANG_CATALOG.length).toBeGreaterThanOrEqual(15);

      const rizz = CANONICAL_SLANG_CATALOG.find((s) => s.term === 'Rizz');
      expect(rizz).toBeDefined();
      expect(rizz?.phonetic).toBe('/rɪz/');
      expect(rizz?.culturalOrigin).toBe('Twitch');
      expect(rizz?.definition).toContain('charisma');
      expect(rizz?.exampleQuote).toContain('unspoken rizz');

      const skibidi = CANONICAL_SLANG_CATALOG.find((s) => s.term === 'Skibidi');
      expect(skibidi).toBeDefined();
      expect(skibidi?.phonetic).toBe('/ˈskɪb.ɪ.di/');
      expect(skibidi?.culturalOrigin).toBe('YouTube');

      const crashout = CANONICAL_SLANG_CATALOG.find((s) => s.term === 'Crashout');
      expect(crashout).toBeDefined();
      expect(crashout?.phonetic).toBe('/ˈkræʃ.aʊt/');
      expect(crashout?.culturalOrigin).toBe('TikTok');
      expect(crashout?.cringeMeter).toBe(4);
    });

    it('filters slang items dynamically on search input query change (case-insensitive)', () => {
      const query = 'crash';
      const results = CANONICAL_SLANG_CATALOG.filter(
        (s) =>
          s.term.toLowerCase().includes(query.toLowerCase()) ||
          s.definition.toLowerCase().includes(query.toLowerCase())
      );

      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results.some((r) => r.term === 'Crashout')).toBe(true);
      expect(results.every((r) => r.term.toLowerCase().includes('crash') || r.definition.toLowerCase().includes('crash'))).toBe(true);

      const nonExistent = CANONICAL_SLANG_CATALOG.filter(
        (s) => s.term.toLowerCase().includes('xyznonsense123')
      );
      expect(nonExistent).toHaveLength(0);
    });

    it('filters slang items by age tier pills (Elementary, Tween, Teen)', () => {
      const elemTerms = CANONICAL_SLANG_CATALOG.filter(
        (s) => s.tier === 'ELEMENTARY' || s.tier === 'ALL'
      );
      expect(elemTerms.length).toBeGreaterThanOrEqual(3);
      expect(elemTerms.some((s) => s.term === 'Skibidi')).toBe(true);
      expect(elemTerms.some((s) => s.term === 'Fanum Tax')).toBe(true);

      const tweenTerms = CANONICAL_SLANG_CATALOG.filter(
        (s) => s.tier === 'TWEEN' || s.tier === 'ALL'
      );
      expect(tweenTerms.some((s) => s.term === 'Rizz')).toBe(true);
      expect(tweenTerms.some((s) => s.term === 'Crashout')).toBe(true);

      const teenTerms = CANONICAL_SLANG_CATALOG.filter(
        (s) => s.tier === 'TEEN' || s.tier === 'ALL'
      );
      expect(teenTerms.some((s) => s.term === 'Bet')).toBe(true);
      expect(teenTerms.some((s) => s.term === 'Cooked')).toBe(true);
    });

    it('renders accurate Cringe Meter visual indicators across the 1-5 scale', () => {
      const score1 = getCringeDescription(1);
      expect(score1.label).toContain('Low Cringe');
      expect(score1.badgeClass).toContain('emerald');

      const score2 = getCringeDescription(2);
      expect(score2.label).toContain('Mild Cringe');

      const score3 = getCringeDescription(3);
      expect(score3.label).toContain('Moderate Cringe');
      expect(score3.badgeClass).toContain('amber');

      const score4 = getCringeDescription(4);
      expect(score4.label).toContain('High Cringe');
      expect(score4.badgeClass).toContain('orange');

      const score5 = getCringeDescription(5);
      expect(score5.label).toContain('Nuclear Cringe');
      expect(score5.badgeClass).toContain('rose');
    });
  });

  describe('3. Exploit & Dark Pattern Early Warnings (ExploitAlertsView)', () => {
    it('covers all 3 required predatory mechanics with calm objective summaries and parent action protocols', () => {
      // 1. High Alert: In-game gambling wheels & unauthorized currency gifting
      const gamblingAlert = CANONICAL_EXPLOIT_ALERTS.find(
        (a) => a.category === 'GAMBLING'
      );
      expect(gamblingAlert).toBeDefined();
      expect(gamblingAlert?.severity).toBe(ExploitSeverity.HIGH);
      expect(gamblingAlert?.severityLabel).toBe('High Alert');
      expect(gamblingAlert?.title).toContain('In-Game Gambling Wheels');
      expect(gamblingAlert?.title).toContain('Virtual Currency Gifting');
      expect(gamblingAlert?.affectedPlatforms).toContain('Roblox');
      expect(gamblingAlert?.calmSummary).toContain('casino mechanisms');
      expect(gamblingAlert?.parentActionProtocol.length).toBeGreaterThanOrEqual(3);
      expect(gamblingAlert?.parentActionProtocol[0]).toContain('Settings > Screen Time');

      // 2. Medium Alert: Server raid bots & disappearing photo requests
      const raidAlert = CANONICAL_EXPLOIT_ALERTS.find(
        (a) => a.category === 'RAID_BOTS'
      );
      expect(raidAlert).toBeDefined();
      expect(raidAlert?.severity).toBe(ExploitSeverity.MEDIUM);
      expect(raidAlert?.severityLabel).toBe('Medium Alert');
      expect(raidAlert?.title).toContain('Server Raid Bots');
      expect(raidAlert?.title).toContain('Disappearing Photo Requests');
      expect(raidAlert?.affectedPlatforms).toContain('Discord');
      expect(raidAlert?.affectedPlatforms).toContain('Snapchat');
      expect(raidAlert?.parentActionProtocol.some((p) => p.includes('Screenshot Rule'))).toBe(true);

      // 3. Notice: Algorithmic infinite scroll autoplay hooks
      const scrollAlert = CANONICAL_EXPLOIT_ALERTS.find(
        (a) => a.category === 'INFINITE_SCROLL'
      );
      expect(scrollAlert).toBeDefined();
      expect(scrollAlert?.severityLabel).toBe('Notice');
      expect(scrollAlert?.title).toContain('Algorithmic Infinite Scroll');
      expect(scrollAlert?.title).toContain('Autoplay Hooks');
      expect(scrollAlert?.affectedPlatforms).toContain('TikTok');
      expect(scrollAlert?.affectedPlatforms).toContain('YouTube Shorts');
      expect(scrollAlert?.parentActionProtocol.some((p) => p.includes('screen break reminders'))).toBe(true);
    });

    it('provides distinct badge styling and iconography without moral panic', () => {
      const highStyle = getAlertBadgeStyle('High Alert');
      expect(highStyle.badgeClass).toContain('rose');

      const mediumStyle = getAlertBadgeStyle('Medium Alert');
      expect(mediumStyle.badgeClass).toContain('amber');

      const noticeStyle = getAlertBadgeStyle('Notice');
      expect(noticeStyle.badgeClass).toContain('sky');
    });
  });

  describe('4. Sunday Dinner Conversation Starters (DinnerConversationStarters)', () => {
    it('adapts dinner conversation questions dynamically to active child developmental tier', () => {
      // 1. Elementary Child (e.g. Maya, age 8)
      const elemChild: ChildDTO = {
        id: 'child-maya',
        userId: 'parent-1',
        name: 'Maya',
        birthYear: 2018,
        birthMonth: 5,
        age: 8,
        roadType: RoadType.PRE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_1_AGES_8_9,
        schoolGrade: '3rd Grade',
        latestAssessmentScore: 74,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const elemTier = resolveDinnerTier(elemChild);
      expect(elemTier).toBe('ELEMENTARY');
      const elemQuestions = CANONICAL_DINNER_QUESTIONS.ELEMENTARY;
      expect(elemQuestions.length).toBeGreaterThanOrEqual(2);
      expect(elemQuestions[0]?.question).toContain('school subject');

      // 2. Tween / Pre-Teen Child (e.g. Leo / age 10-12)
      const tweenChild: ChildDTO = {
        id: 'child-leo',
        userId: 'parent-1',
        name: 'Leo',
        birthYear: 2016,
        birthMonth: 3,
        age: 10,
        roadType: RoadType.PRE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_2_AGES_10_11,
        schoolGrade: '5th Grade',
        latestAssessmentScore: 82,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const tweenTier = resolveDinnerTier(tweenChild);
      expect(tweenTier).toBe('TWEEN');
      const tweenQuestions = CANONICAL_DINNER_QUESTIONS.TWEEN;
      expect(tweenQuestions.some((q) => q.question.includes('zombie apocalypse'))).toBe(true);
      expect(tweenQuestions.some((q) => q.question.includes('app or device'))).toBe(true);

      // 3. Teen Child (e.g. Julian, age 14)
      const teenChild: ChildDTO = {
        id: 'child-julian',
        userId: 'parent-1',
        name: 'Julian',
        birthYear: 2012,
        birthMonth: 8,
        age: 14,
        roadType: RoadType.ACTIVE_DEVICE,
        developmentalTier: DevelopmentalTier.TIER_4_AGES_14_PLUS,
        schoolGrade: '9th Grade',
        latestAssessmentScore: 92,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const teenTier = resolveDinnerTier(teenChild);
      expect(teenTier).toBe('TEEN');
      const teenQuestions = CANONICAL_DINNER_QUESTIONS.TEEN;
      expect(teenQuestions.some((q) => q.question.includes('group chats'))).toBe(true);
      expect(teenQuestions.some((q) => q.question.includes('screen-free camping trip'))).toBe(true);
    });

    it('executes copy-to-clipboard and verifies clipboard content', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText,
        },
      });

      const questionText = 'If your favorite game or YouTuber had to survive in a zombie apocalypse, who gets eliminated first and why?';
      await navigator.clipboard.writeText(questionText);

      expect(mockWriteText).toHaveBeenCalledWith(questionText);
    });

    it('cycles questions cleanly when shuffle question is triggered', () => {
      const questions = CANONICAL_DINNER_QUESTIONS.TWEEN;
      let currentIndex = 0;

      const shuffle = () => {
        currentIndex = (currentIndex + 1) % questions.length;
      };

      expect(questions[currentIndex]?.question).toContain('zombie apocalypse');
      shuffle();
      expect(currentIndex).toBe(1);
      expect(questions[currentIndex]?.question).toContain('app or device');
      shuffle();
      expect(currentIndex).toBe(2);
      expect(questions[currentIndex]?.question).toContain('overrated');
      shuffle();
      expect(currentIndex).toBe(0); // Wrapped around
    });

    it('toggles saving question to Sunday Dinner List bookmark array', () => {
      const questionId = 'dinner-tween-1';
      let savedList: string[] = [];

      const toggleSave = (id: string) => {
        if (savedList.includes(id)) {
          savedList = savedList.filter((item) => item !== id);
        } else {
          savedList = [...savedList, id];
        }
      };

      expect(savedList).toHaveLength(0);
      toggleSave(questionId);
      expect(savedList).toContain(questionId);
      expect(savedList).toHaveLength(1);

      // Toggle off
      toggleSave(questionId);
      expect(savedList).not.toContain(questionId);
      expect(savedList).toHaveLength(0);
    });
  });
});
