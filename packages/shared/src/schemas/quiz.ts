import { z } from 'zod';
import { QuizType } from '../constants/index.js';

export const QuizResponseInputSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  selectedOptionId: z.string().min(1, 'Selected option ID is required'),
});

export type QuizResponseInput = z.infer<typeof QuizResponseInputSchema>;

export const SubmitQuizAttemptSchema = z.object({
  quizId: z.string().min(1, 'Quiz ID is required'),
  childId: z.string().uuid().optional(),
  responses: z.array(QuizResponseInputSchema).min(1, 'At least one response is required'),
});

export type SubmitQuizAttemptInput = z.infer<typeof SubmitQuizAttemptSchema>;

export const QuizQuerySchema = z.object({
  type: z.enum([
    QuizType.CULTURAL_FLUENCY_TWEEN,
    QuizType.PARENTING_STYLE_CONFLICT,
    QuizType.FIRST_PHONE_READINESS,
    QuizType.HOUSEHOLD_SCREEN_AUDIT,
    QuizType.JOINT_DISCOVERY_BRIDGE,
  ]),
});

export type QuizQueryInput = z.infer<typeof QuizQuerySchema>;
