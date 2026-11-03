import { z } from 'zod';

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
