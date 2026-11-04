import { randomUUID } from 'node:crypto';
import {
  prisma as defaultPrisma,
  type PrismaClient,
} from '@alongside/database';
import type {
  AiConversationDTO,
  AiMessageDTO,
  MessageRole,
} from '@alongside/shared';

export interface AiAdvisorRepository {
  createConversation(
    userId: string,
    childId?: string | null,
    title?: string
  ): Promise<AiConversationDTO>;
  getConversation(
    id: string,
    userId: string
  ): Promise<AiConversationDTO | null>;
  listConversations(userId: string): Promise<AiConversationDTO[]>;
  saveMessage(
    conversationId: string,
    role: MessageRole,
    content: string,
    matchedFaqIds?: string[],
    tokensUsed?: number
  ): Promise<AiMessageDTO>;
}

export class PrismaAiAdvisorRepository implements AiAdvisorRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async createConversation(
    userId: string,
    childId?: string | null,
    title = 'Parenting Discussion'
  ): Promise<AiConversationDTO> {
    const conv = await this.prisma.aiConversation.create({
      data: {
        userId,
        childId: childId || null,
        title,
      },
    });

    return {
      id: conv.id,
      userId: conv.userId,
      childId: conv.childId,
      title: conv.title,
      createdAt: conv.createdAt.toISOString(),
      updatedAt: conv.updatedAt.toISOString(),
      messages: [],
    };
  }

  async getConversation(
    id: string,
    userId: string
  ): Promise<AiConversationDTO | null> {
    const conv = await this.prisma.aiConversation.findFirst({
      where: { id, userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conv) return null;

    return {
      id: conv.id,
      userId: conv.userId,
      childId: conv.childId,
      title: conv.title,
      createdAt: conv.createdAt.toISOString(),
      updatedAt: conv.updatedAt.toISOString(),
      messages: conv.messages.map((m) => ({
        id: m.id,
        conversationId: m.conversationId,
        role: m.role as MessageRole,
        content: m.content,
        matchedFaqIds: m.matchedFaqIds,
        tokensUsed: m.tokensUsed,
        createdAt: m.createdAt.toISOString(),
      })),
    };
  }

  async listConversations(userId: string): Promise<AiConversationDTO[]> {
    const conversations = await this.prisma.aiConversation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return conversations.map((conv) => ({
      id: conv.id,
      userId: conv.userId,
      childId: conv.childId,
      title: conv.title,
      createdAt: conv.createdAt.toISOString(),
      updatedAt: conv.updatedAt.toISOString(),
    }));
  }

  async saveMessage(
    conversationId: string,
    role: MessageRole,
    content: string,
    matchedFaqIds: string[] = [],
    tokensUsed = 0
  ): Promise<AiMessageDTO> {
    const message = await this.prisma.aiMessage.create({
      data: {
        conversationId,
        role,
        content,
        matchedFaqIds,
        tokensUsed,
      },
    });

    // Update conversation's updatedAt timestamp
    await this.prisma.aiConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return {
      id: message.id,
      conversationId: message.conversationId,
      role: message.role as MessageRole,
      content: message.content,
      matchedFaqIds: message.matchedFaqIds,
      tokensUsed: message.tokensUsed,
      createdAt: message.createdAt.toISOString(),
    };
  }
}

export class InMemoryAiAdvisorRepository implements AiAdvisorRepository {
  private conversations: Map<string, AiConversationDTO> = new Map();
  private messages: Map<string, AiMessageDTO[]> = new Map();

  async createConversation(
    userId: string,
    childId?: string | null,
    title = 'Parenting Discussion'
  ): Promise<AiConversationDTO> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const conv: AiConversationDTO = {
      id,
      userId,
      childId: childId || null,
      title,
      createdAt: now,
      updatedAt: now,
      messages: [],
    };
    this.conversations.set(id, conv);
    this.messages.set(id, []);
    return { ...conv };
  }

  async getConversation(
    id: string,
    userId: string
  ): Promise<AiConversationDTO | null> {
    const conv = this.conversations.get(id);
    if (!conv || conv.userId !== userId) return null;

    const msgs = this.messages.get(id) ?? [];
    return {
      ...conv,
      messages: [...msgs],
    };
  }

  async listConversations(userId: string): Promise<AiConversationDTO[]> {
    return Array.from(this.conversations.values())
      .filter((c) => c.userId === userId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async saveMessage(
    conversationId: string,
    role: MessageRole,
    content: string,
    matchedFaqIds: string[] = [],
    tokensUsed = 0
  ): Promise<AiMessageDTO> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const message: AiMessageDTO = {
      id,
      conversationId,
      role,
      content,
      matchedFaqIds,
      tokensUsed,
      createdAt: now,
    };

    const msgs = this.messages.get(conversationId) ?? [];
    msgs.push(message);
    this.messages.set(conversationId, msgs);

    const conv = this.conversations.get(conversationId);
    if (conv) {
      conv.updatedAt = now;
      this.conversations.set(conversationId, conv);
    }

    return message;
  }
}
