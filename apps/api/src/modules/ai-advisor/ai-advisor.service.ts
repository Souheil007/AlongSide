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
import { buildAdvisorMessages } from './prompt.builder.js';

export interface ChatSessionResult {
  conversationId: string;
  matchedFaqs: FaqItemDTO[];
  childContext: {
    name: string;
    age?: number;
    developmentalTier?: string;
    roadType?: string;
  } | null;
  tokenStream: AsyncIterable<string>;
  saveAssistantResponse: (fullContent: string, tokensUsed?: number) => Promise<AiMessageDTO>;
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
        const calculatedAge = currentYear - childRecord.birthYear;
        childProfile = {
          id: childRecord.id,
          userId: childRecord.userId,
          name: childRecord.name,
          birthYear: childRecord.birthYear,
          birthMonth: childRecord.birthMonth,
          roadType: childRecord.roadType,
          developmentalTier: childRecord.developmentalTier,
          schoolGrade: childRecord.schoolGrade ?? undefined,
          age: calculatedAge,
          createdAt: childRecord.createdAt.toISOString(),
          updatedAt: childRecord.updatedAt.toISOString(),
        };
      }
    }

    // 3. Contextual FAQ Retrieval
    const matchedFaqs = await this.faqRetrievalService.retrieveRelevantFaqs(
      message,
      {
        tier: childProfile?.developmentalTier,
        road: childProfile?.roadType,
        limit: 3,
      }
    );

    const matchedFaqIds = matchedFaqs.map((f) => f.id);

    // 4. Save parent's user message
    await this.advisorRepository.saveMessage(
      conversation.id,
      'USER',
      message,
      matchedFaqIds
    );

    // 5. Build prompt with Alongside's 4 pillars & context
    const conversationHistory = (conversation.messages || []).map((m) => ({
      role: m.role === 'ASSISTANT' ? ('assistant' as const) : ('user' as const),
      content: m.content,
    }));

    const messages = buildAdvisorMessages(message, {
      child: childProfile,
      matchedFaqs,
      conversationHistory,
    });

    // 6. Generate stream via Multi-Provider Fallback Orchestrator
    const tokenStream = this.llmOrchestrator.stream({ messages });

    const conversationId = conversation.id;

    return {
      conversationId,
      matchedFaqs,
      childContext: childProfile
        ? {
            name: childProfile.name,
            age: childProfile.age,
            developmentalTier: childProfile.developmentalTier,
            roadType: childProfile.roadType,
          }
        : null,
      tokenStream,
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
