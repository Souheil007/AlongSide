import { z } from 'zod';
import { MessageRole } from '../constants/index.js';

export const AiChatRequestSchema = z.object({
  childId: z.string().uuid().optional(),
  conversationId: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(4000, 'Message cannot exceed 4000 characters'),
});

export type AiChatRequestInput = z.infer<typeof AiChatRequestSchema>;

export const AiMatchedFaqSchema = z.object({
  id: z.string(),
  question: z.string(),
  categorySlug: z.string().optional(),
  deEscalationScript: z.string().nullable().optional(),
});

export type AiMatchedFaqDto = z.infer<typeof AiMatchedFaqSchema>;

export const AiChatStreamEventContextSchema = z.object({
  type: z.literal('context'),
  matchedFaqs: z.array(z.union([z.string(), AiMatchedFaqSchema])),
  childContext: z
    .object({
      name: z.string(),
      age: z.number().optional(),
      developmentalTier: z.string().optional(),
      roadType: z.string().optional(),
    })
    .optional(),
});

export const AiChatStreamEventTokenSchema = z.object({
  type: z.literal('token'),
  content: z.string(),
});

export const AiChatStreamEventDoneSchema = z.object({
  type: z.literal('done'),
  conversationId: z.string(),
  messageId: z.string().optional(),
  tokensUsed: z.number().int().optional(),
});

export const AiChatStreamEventErrorSchema = z.object({
  type: z.literal('error'),
  code: z.string(),
  message: z.string(),
});

export const AiChatStreamEventSchema = z.discriminatedUnion('type', [
  AiChatStreamEventContextSchema,
  AiChatStreamEventTokenSchema,
  AiChatStreamEventDoneSchema,
  AiChatStreamEventErrorSchema,
]);

export type AiChatStreamEvent = z.infer<typeof AiChatStreamEventSchema>;

export const AiMessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  role: z.nativeEnum(MessageRole),
  content: z.string(),
  matchedFaqIds: z.array(z.string()).default([]),
  tokensUsed: z.number().int().default(0),
  createdAt: z.string().datetime().or(z.date()).optional(),
});

export type AiMessageDto = z.infer<typeof AiMessageSchema>;

export const AiConversationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  childId: z.string().nullable().optional(),
  title: z.string(),
  createdAt: z.string().datetime().or(z.date()).optional(),
  updatedAt: z.string().datetime().or(z.date()).optional(),
  messages: z.array(AiMessageSchema).optional(),
});

export type AiConversationDto = z.infer<typeof AiConversationSchema>;
