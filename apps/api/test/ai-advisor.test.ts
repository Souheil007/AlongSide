import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { InMemoryChildrenRepository } from '../src/modules/children/children.repository.js';
import { InMemoryFaqRepository } from '../src/modules/faqs/faqs.repository.js';
import { InMemoryAiAdvisorRepository } from '../src/modules/ai-advisor/ai-advisor.repository.js';
import { DeterministicAiAdvisorFake } from '../src/modules/ai-advisor/adapters/fake.adapter.js';
import { MultiProviderLlmOrchestrator } from '../src/modules/ai-advisor/adapters/llm-orchestrator.js';
import { RoadType } from '@alongside/shared';

function parseSseEvents(payload: string): Array<{ type: string; [key: string]: any }> {
  const events: Array<{ type: string; [key: string]: any }> = [];
  const lines = payload.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('data:')) {
      const jsonStr = trimmed.slice(5).trim();
      try {
        events.push(JSON.parse(jsonStr));
      } catch {
        // Skip non-JSON
      }
    }
  }

  return events;
}

describe('24/7 AI Child Advisor & Multi-LLM Fallback Engine API (PLAN-10)', () => {
  let app: FastifyInstance;
  let inMemoryAuthRepo: InMemoryAuthRepository;
  let inMemoryChildrenRepo: InMemoryChildrenRepository;
  let inMemoryFaqRepo: InMemoryFaqRepository;
  let inMemoryAdvisorRepo: InMemoryAiAdvisorRepository;

  let fakeOpenAi: DeterministicAiAdvisorFake;
  let fakeGemini: DeterministicAiAdvisorFake;
  let fakeMistral: DeterministicAiAdvisorFake;
  let orchestrator: MultiProviderLlmOrchestrator;

  let userACookie: string;
  let userBCookie: string;

  beforeEach(async () => {
    inMemoryAuthRepo = new InMemoryAuthRepository();
    inMemoryChildrenRepo = new InMemoryChildrenRepository();
    inMemoryFaqRepo = new InMemoryFaqRepository();
    inMemoryAdvisorRepo = new InMemoryAiAdvisorRepository();

    fakeOpenAi = new DeterministicAiAdvisorFake({
      providerName: 'openai',
      tokens: ['First, ', 'take a deep breath. ', 'What you just witnessed was a dopamine crash.'],
    });
    fakeGemini = new DeterministicAiAdvisorFake({
      providerName: 'gemini',
      tokens: ['Gemini fallback: ', 'Stay calm and acknowledge ', 'the transition.'],
    });
    fakeMistral = new DeterministicAiAdvisorFake({
      providerName: 'mistral',
      tokens: ['Mistral open-mistral-7b: ', 'Here is your word-for-word ', 'bedtime script.'],
    });

    orchestrator = new MultiProviderLlmOrchestrator({
      adapters: [fakeOpenAi, fakeGemini, fakeMistral],
      logger: { warn: () => {} },
    });

    app = await buildApp({
      logger: false,
      authRepository: inMemoryAuthRepo,
      childrenRepository: inMemoryChildrenRepo,
      faqsRepository: inMemoryFaqRepo,
      aiAdvisorRepository: inMemoryAdvisorRepo,
      llmOrchestrator: orchestrator,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });

    // Register Parent A
    const resA = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'sarah.parent@example.com',
        password: 'Password123!',
        fullName: 'Sarah Jenkins',
      },
    });
    expect(resA.statusCode).toBe(201);
    const cookiesA = resA.headers['set-cookie'] as string | string[];
    userACookie = (Array.isArray(cookiesA) ? cookiesA[0] : cookiesA) ?? '';

    // Register Parent B
    const resB = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'mark.parent@example.com',
        password: 'Password123!',
        fullName: 'Mark Jenkins',
      },
    });
    expect(resB.statusCode).toBe(201);
    const cookiesB = resB.headers['set-cookie'] as string | string[];
    userBCookie = (Array.isArray(cookiesB) ? cookiesB[0] : cookiesB) ?? '';
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Authentication Gates', () => {
    it('rejects unauthenticated requests to POST /api/v1/ai-advisor/chat with 401', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        payload: {
          message: 'How do I handle Roblox screen time meltdowns?',
        },
      });

      expect(response.statusCode).toBe(401);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('UNAUTHORIZED');
    });

    it('rejects unauthenticated requests to GET /api/v1/ai-advisor/conversations with 401', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/ai-advisor/conversations',
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('Streaming SSE Token Delivery & Prompt Grounding', () => {
    it('streams SSE tokens, returns matched FAQ context, and persists conversation', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: {
          cookie: userACookie,
        },
        payload: {
          message: 'My 11yo screamed at me when I told him screen time was over and slammed his door.',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toContain('text/event-stream');

      const events = parseSseEvents(response.body);
      expect(events.length).toBeGreaterThanOrEqual(4);

      // 1. Context Event
      const contextEvent = events.find((e) => e.type === 'context');
      expect(contextEvent).toBeDefined();
      expect(Array.isArray(contextEvent!.matchedFaqs)).toBe(true);
      expect(contextEvent!.matchedFaqs.length).toBeGreaterThan(0);

      // 2. Token Events
      const tokenEvents = events.filter((e) => e.type === 'token');
      expect(tokenEvents.length).toBeGreaterThanOrEqual(3);
      const fullText = tokenEvents.map((t) => t.content).join('');
      expect(fullText).toContain('dopamine crash');

      // 3. Done Event
      const doneEvent = events.find((e) => e.type === 'done');
      expect(doneEvent).toBeDefined();
      expect(doneEvent!.conversationId).toBeDefined();

      // 4. Verify Conversation Persistence
      const listRes = await app.inject({
        method: 'GET',
        url: '/api/v1/ai-advisor/conversations',
        headers: {
          cookie: userACookie,
        },
      });
      expect(listRes.statusCode).toBe(200);
      const conversations = listRes.json().data.conversations;
      expect(conversations.length).toBe(1);
      expect(conversations[0].id).toBe(doneEvent!.conversationId);

      // 5. Retrieve Conversation Details with Message History
      const detailRes = await app.inject({
        method: 'GET',
        url: `/api/v1/ai-advisor/conversations/${doneEvent!.conversationId}`,
        headers: {
          cookie: userACookie,
        },
      });
      expect(detailRes.statusCode).toBe(200);
      const convDetail = detailRes.json().data.conversation;
      expect(convDetail.messages.length).toBe(2);
      expect(convDetail.messages[0].role).toBe('USER');
      expect(convDetail.messages[0].content).toContain('screamed at me');
      expect(convDetail.messages[1].role).toBe('ASSISTANT');
      expect(convDetail.messages[1].content).toContain('dopamine crash');
    });

    it('injects child profile context (name, age, tier, road) when childId is provided', async () => {
      // Create child Leo for Parent A
      const childRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: {
          cookie: userACookie,
        },
        payload: {
          name: 'Leo',
          birthYear: 2014,
          birthMonth: 5,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      expect(childRes.statusCode).toBe(201);
      const childId = childRes.json().data.child.id;

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: {
          cookie: userACookie,
        },
        payload: {
          childId,
          message: 'Leo says everyone in his class has an iPhone and he is the only one left out.',
        },
      });

      expect(response.statusCode).toBe(200);
      const events = parseSseEvents(response.body);

      const contextEvent = events.find((e) => e.type === 'context');
      expect(contextEvent).toBeDefined();
      expect(contextEvent!.childContext).toBeDefined();
      expect(contextEvent!.childContext.name).toBe('Leo');
      expect(contextEvent!.childContext.roadType).toBe(RoadType.PRE_DEVICE);
    });

    it('enforces cross-user tenant isolation on conversation retrieval', async () => {
      // Parent A creates conversation
      const chatRes = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: {
          cookie: userACookie,
        },
        payload: {
          message: 'Parent A private consultation query.',
        },
      });
      const events = parseSseEvents(chatRes.body);
      const convId = events.find((e) => e.type === 'done')!.conversationId;

      // Parent B attempts to access Parent A's conversation
      const unauthorizedRes = await app.inject({
        method: 'GET',
        url: `/api/v1/ai-advisor/conversations/${convId}`,
        headers: {
          cookie: userBCookie,
        },
      });

      expect(unauthorizedRes.statusCode).toBe(404);
      expect(unauthorizedRes.json().error.code).toBe('CONVERSATION_NOT_FOUND');
    });
  });

  describe('Multi-LLM Fallback Orchestration Cascade', () => {
    it('seamlessly fails over from OpenAI to Gemini when primary fails', async () => {
      // Simulate primary provider failure (OpenAI timeout/429)
      fakeOpenAi.setFailure(true, Infinity, new Error('OpenAI 429 Too Many Requests'));

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: {
          cookie: userACookie,
        },
        payload: {
          message: 'How do I talk about Snapchat streaks?',
        },
      });

      expect(response.statusCode).toBe(200);
      const events = parseSseEvents(response.body);
      const tokenEvents = events.filter((e) => e.type === 'token');
      const text = tokenEvents.map((t) => t.content).join('');

      // Verify response came from Gemini fallback
      expect(text).toContain('Gemini fallback:');
      expect(fakeOpenAi.callCount).toBe(1);
      expect(fakeGemini.callCount).toBe(1);
      expect(fakeMistral.callCount).toBe(0);
    });

    it('seamlessly cascades through OpenAI -> Gemini -> Mistral (open-mistral-7b) when first two fail', async () => {
      // Simulate failure of both OpenAI and Gemini
      fakeOpenAi.setFailure(true, Infinity, new Error('OpenAI 500 Internal Error'));
      fakeGemini.setFailure(true, Infinity, new Error('Gemini Quota Exceeded'));

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: {
          cookie: userACookie,
        },
        payload: {
          message: 'My daughter is terrified of breaking her 100-day streak.',
        },
      });

      expect(response.statusCode).toBe(200);
      const events = parseSseEvents(response.body);
      const tokenEvents = events.filter((e) => e.type === 'token');
      const text = tokenEvents.map((t) => t.content).join('');

      // Verify response came from Mistral (Fallback 2: open-mistral-7b)
      expect(text).toContain('Mistral open-mistral-7b:');
      expect(fakeOpenAi.callCount).toBe(1);
      expect(fakeGemini.callCount).toBe(1);
      expect(fakeMistral.callCount).toBe(1);
    });

    it('returns RFC 7807 503 error envelope when all configured LLM providers fail', async () => {
      // Simulate catastrophic failure of all 3 providers
      fakeOpenAi.setFailure(true, Infinity, new Error('OpenAI Down'));
      fakeGemini.setFailure(true, Infinity, new Error('Gemini Down'));
      fakeMistral.setFailure(true, Infinity, new Error('Mistral Down'));

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: {
          cookie: userACookie,
        },
        payload: {
          message: 'Emergency question when all services are down.',
        },
      });

      expect(response.statusCode).toBe(503);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('ALL_LLM_PROVIDERS_UNAVAILABLE');
      expect(payload.error.message).toContain('All configured AI providers failed');
    });
  });

  describe('Clinical Safe Harbor Emergency Overrides & Whole-Child Grounding (PLAN-20)', () => {
    it('halts LLM streaming and emits EMERGENCY_RED_FLAG for acute infant fever and respiratory distress', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: {
          cookie: userACookie,
        },
        payload: {
          message: 'My 2-month-old has a 101 fever and struggling to breathe',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toContain('text/event-stream');

      const events = parseSseEvents(response.body);
      const emergencyEvent = events.find((e) => e.type === 'EMERGENCY_RED_FLAG');
      expect(emergencyEvent).toBeDefined();
      expect(emergencyEvent!.isEmergency).toBe(true);
      expect(emergencyEvent!.phoneDial).toBe('911');
      expect(emergencyEvent!.directive).toContain('911');
      expect(emergencyEvent!.directive).toContain('Pediatric Emergency Department');

      // Verify speculative LLM streaming was completely halted (zero calls to LLM orchestrator)
      expect(fakeOpenAi.callCount).toBe(0);

      // Verify done event was emitted cleanly
      const doneEvent = events.find((e) => e.type === 'done');
      expect(doneEvent).toBeDefined();
    });

    it('triggers EMERGENCY_RED_FLAG for button battery ingestion', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: {
          cookie: userACookie,
        },
        payload: {
          message: 'Help, my toddler swallowed a button battery!',
        },
      });

      expect(response.statusCode).toBe(200);
      const events = parseSseEvents(response.body);
      const emergencyEvent = events.find((e) => e.type === 'EMERGENCY_RED_FLAG');
      expect(emergencyEvent).toBeDefined();
      expect(emergencyEvent!.category).toBe('TOXIC_INGESTION');
      expect(emergencyEvent!.directive).toContain('Poison Control');
      expect(fakeOpenAi.callCount).toBe(0);
    });

    it('injects rich whole-child contextual memory (dietaryStage, allergies, recentHealthLogs) into advisor prompt', async () => {
      const childRes = await app.inject({
        method: 'POST',
        url: '/api/v1/children',
        headers: {
          cookie: userACookie,
        },
        payload: {
          name: 'Maya',
          birthYear: 2023,
          birthMonth: 8,
          roadType: RoadType.PRE_DEVICE,
        },
      });
      expect(childRes.statusCode).toBe(201);
      const childId = childRes.json().data.child.id;

      // Update in-memory child record with rich whole-child fields
      const childRecord = (inMemoryChildrenRepo as any).children.get(childId);
      if (childRecord) {
        childRecord.dietaryStage = 'SOLIDS_INTRODUCED';
        childRecord.allergies = ['Peanut', 'Egg'];
        childRecord.recentHealthLogs = ['Mild teething fever (99.8F) on Monday'];
      }

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/ai-advisor/chat',
        headers: {
          cookie: userACookie,
        },
        payload: {
          childId,
          message: 'Can I offer Maya steamed sweet potato sticks for lunch?',
        },
      });

      expect(response.statusCode).toBe(200);
      const events = parseSseEvents(response.body);
      const contextEvent = events.find((e) => e.type === 'context');
      expect(contextEvent).toBeDefined();
      expect(contextEvent!.childContext).toBeDefined();
      expect(contextEvent!.childContext.name).toBe('Maya');
      expect(contextEvent!.childContext.dietaryStage).toBe('SOLIDS_INTRODUCED');
      expect(contextEvent!.childContext.allergies).toEqual(['Peanut', 'Egg']);
    });
  });
});
