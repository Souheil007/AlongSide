import type {
  AiConversationDTO,
  AiMessageDTO,
  ChildDTO,
  FaqItemDTO,
} from '@alongside/shared';
import type { ChildrenRepository } from '../children/children.repository.js';
import type { AiAdvisorRepository } from './ai-advisor.repository.js';
import type { FaqRetrievalService } from './embedding.service.js';
import type { MultiProviderLlmOrchestrator } from './adapters/llm-orchestrator.js';
import {
  ClinicalSafeHarborFilter,
  type ClinicalEmergencyAlert,
} from './safe-harbor.filter.js';
import { buildAdvisorMessages } from './prompt.builder.js';

export interface ChatSessionResult {
  conversationId: string;
  matchedFaqs: FaqItemDTO[];
  childContext: {
    name: string;
    age?: number;
    ageMonths?: number;
    developmentalTier?: string;
    roadType?: string;
    dietaryStage?: string;
    allergies?: string[];
    recentHealthLogs?: string[];
  } | null;
  tokenStream: AsyncIterable<string>;
  saveAssistantResponse: (fullContent: string, tokensUsed?: number) => Promise<AiMessageDTO>;
  isEmergency?: boolean;
  emergencyAlert?: ClinicalEmergencyAlert | null;
}

export class AiAdvisorService {
  constructor(
    private readonly advisorRepository: AiAdvisorRepository,
    private readonly faqRetrievalService: FaqRetrievalService,
    private readonly llmOrchestrator: MultiProviderLlmOrchestrator,
    private readonly childrenRepository?: ChildrenRepository
  ) {}

  async startOrContinueChat(
    userId: string,
    input: {
      childId?: string;
      conversationId?: string;
      message: string;
    }
  ): Promise<ChatSessionResult> {
    const { message } = input;

    // 1. Resolve or create conversation
    let conversation: AiConversationDTO | null = null;
    if (input.conversationId) {
      conversation = await this.advisorRepository.getConversation(
        input.conversationId,
        userId
      );
    }

    if (!conversation) {
      const title =
        message.length > 50
          ? `${message.slice(0, 47).trim()}...`
          : message.trim();
      conversation = await this.advisorRepository.createConversation(
        userId,
        input.childId,
        title
      );
    }

    // 2. Resolve child profile if childId exists
    const effectiveChildId = input.childId || conversation.childId || undefined;
    let childProfile: ChildDTO | null = null;

    if (effectiveChildId && this.childrenRepository) {
      const childRecord = await this.childrenRepository.findById(
        effectiveChildId,
        userId
      );
      if (childRecord) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const calculatedAge = currentYear - childRecord.birthYear;
        const calculatedAgeMonths =
          (childRecord as any).ageMonths ??
          calculatedAge * 12 + (currentMonth - childRecord.birthMonth);

        childProfile = {
          id: childRecord.id,
          userId: childRecord.userId,
          name: childRecord.name,
          birthYear: childRecord.birthYear,
          birthMonth: childRecord.birthMonth,
          roadType: childRecord.roadType,
          developmentalTier: childRecord.developmentalTier,
          schoolGrade: childRecord.schoolGrade ?? undefined,
          dietaryStage: (childRecord as any).dietaryStage ?? undefined,
          allergies: (childRecord as any).allergies ?? undefined,
          recentHealthLogs: (childRecord as any).recentHealthLogs ?? undefined,
          pediatricNotes: (childRecord as any).pediatricNotes ?? undefined,
          age: calculatedAge,
          ageMonths: calculatedAgeMonths,
          createdAt: childRecord.createdAt.toISOString(),
          updatedAt: childRecord.updatedAt.toISOString(),
        };
      }
    }

    // 3. Clinical Safe Harbor Emergency Override Filter
    const emergencyAlert = ClinicalSafeHarborFilter.evaluate(message, childProfile);
    if (emergencyAlert) {
      // Save parent's user message
      await this.advisorRepository.saveMessage(
        conversation.id,
        'USER',
        message,
        []
      );

      const conversationId = conversation.id;
      const emergencyDirectiveText = `🚨 **EMERGENCY MEDICAL DIRECTIVE (${emergencyAlert.category})**\n\n**${emergencyAlert.headline}**\n\n${emergencyAlert.directive}\n\n📞 **Immediate Action:** Call ${emergencyAlert.phoneDial} or proceed to the nearest Pediatric Emergency Department.\n\n${emergencyAlert.nearestFacilityGuidance}`;

      return {
        conversationId,
        matchedFaqs: [],
        childContext: childProfile
          ? {
              name: childProfile.name,
              age: childProfile.age,
              ageMonths: childProfile.ageMonths ?? undefined,
              developmentalTier: childProfile.developmentalTier,
              roadType: childProfile.roadType,
              dietaryStage: childProfile.dietaryStage ?? undefined,
              allergies: childProfile.allergies ?? undefined,
              recentHealthLogs: childProfile.recentHealthLogs ?? undefined,
            }
          : null,
        tokenStream: (async function* () {
          yield emergencyDirectiveText;
        })(),
        isEmergency: true,
        emergencyAlert,
        saveAssistantResponse: async (fullContent: string, tokensUsed = 25) => {
          return this.advisorRepository.saveMessage(
            conversationId,
            'ASSISTANT',
            fullContent,
            [],
            tokensUsed
          );
        },
      };
    }

    // 4. Contextual FAQ Retrieval
    const matchedFaqs = await this.faqRetrievalService.retrieveRelevantFaqs(
      message,
      {
        tier: childProfile?.developmentalTier,
        road: childProfile?.roadType,
        limit: 3,
      }
    );

    const matchedFaqIds = matchedFaqs.map((f) => f.id);

    // 5. Save parent's user message
    await this.advisorRepository.saveMessage(
      conversation.id,
      'USER',
      message,
      matchedFaqIds
    );

    // 6. Build prompt with Alongside's 4 pillars & context
    const conversationHistory = (conversation.messages || []).map((m) => ({
      role: m.role === 'ASSISTANT' ? ('assistant' as const) : ('user' as const),
      content: m.content,
    }));

    const messages = buildAdvisorMessages(message, {
      child: childProfile,
      matchedFaqs,
      conversationHistory,
    });

    // 7. Generate stream via Multi-Provider Fallback Orchestrator
    const tokenStream = this.llmOrchestrator.stream({ messages });

    const conversationId = conversation.id;

    return {
      conversationId,
      matchedFaqs,
      childContext: childProfile
        ? {
            name: childProfile.name,
            age: childProfile.age,
            ageMonths: childProfile.ageMonths ?? undefined,
            developmentalTier: childProfile.developmentalTier,
            roadType: childProfile.roadType,
            dietaryStage: childProfile.dietaryStage ?? undefined,
            allergies: childProfile.allergies ?? undefined,
            recentHealthLogs: childProfile.recentHealthLogs ?? undefined,
          }
        : null,
      tokenStream,
      isEmergency: false,
      emergencyAlert: null,
      saveAssistantResponse: async (fullContent: string, tokensUsed = 0) => {
        return this.advisorRepository.saveMessage(
          conversationId,
          'ASSISTANT',
          fullContent,
          matchedFaqIds,
          tokensUsed
        );
      },
    };
  }

  async getConversation(
    id: string,
    userId: string
  ): Promise<AiConversationDTO | null> {
    return this.advisorRepository.getConversation(id, userId);
  }

  async listConversations(userId: string): Promise<AiConversationDTO[]> {
    return this.advisorRepository.listConversations(userId);
  }
}
