'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { AiMessageDTO, MessageRole } from '@alongside/shared';
import {
  streamAiAdvisorChat,
  type SseContextEvent,
  type SseEmergencyEvent,
} from '@/lib/api/advisor';

export interface UseAiAdvisorChatOptions {
  initialConversationId?: string;
  defaultChildId?: string;
  initialMessages?: AiMessageDTO[];
}

export interface UseAiAdvisorChatReturn {
  messages: AiMessageDTO[];
  activeStreamingText: string;
  activeMatchedFaqs: string[];
  activeEmergency: SseEmergencyEvent | null;
  isStreaming: boolean;
  isLoading: boolean;
  error: string | null;
  conversationId: string | null;
  sendMessage: (messageText: string, options?: { childId?: string }) => Promise<void>;
  stopStreaming: () => void;
  clearConversation: () => void;
  retryLastMessage: () => Promise<void>;
}

export function useAiAdvisorChat(options: UseAiAdvisorChatOptions = {}): UseAiAdvisorChatReturn {
  const [messages, setMessages] = useState<AiMessageDTO[]>(options.initialMessages || []);
  const [activeStreamingText, setActiveStreamingText] = useState<string>('');
  const [activeMatchedFaqs, setActiveMatchedFaqs] = useState<string[]>([]);
  const [activeEmergency, setActiveEmergency] = useState<SseEmergencyEvent | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(
    options.initialConversationId || null
  );

  const abortControllerRef = useRef<AbortController | null>(null);
  const streamingTextRef = useRef<string>('');
  const matchedFaqsRef = useRef<string[]>([]);
  const lastUserMessageRef = useRef<string | null>(null);

  // Clean up any ongoing stream on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    if (streamingTextRef.current.trim()) {
      // Commit partial text as assistant message
      const partialMessage: AiMessageDTO = {
        id: `msg-${Date.now()}`,
        conversationId: conversationId || `conv-${Date.now()}`,
        role: 'ASSISTANT' as MessageRole,
        content: streamingTextRef.current,
        matchedFaqIds: [...matchedFaqsRef.current],
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, partialMessage]);
    }

    setIsStreaming(false);
    setIsLoading(false);
    setActiveStreamingText('');
    setActiveMatchedFaqs([]);
    streamingTextRef.current = '';
    matchedFaqsRef.current = [];
  }, [conversationId]);

  const clearConversation = useCallback(() => {
    stopStreaming();
    setMessages([]);
    setConversationId(null);
    setError(null);
    setActiveEmergency(null);
    lastUserMessageRef.current = null;
  }, [stopStreaming]);

  const sendMessage = useCallback(
    async (messageText: string, sendOptions?: { childId?: string }) => {
      const trimmed = messageText.trim();
      if (!trimmed || isStreaming) return;

      setError(null);
      setActiveEmergency(null);
      setIsLoading(true);
      setIsStreaming(true);
      setActiveStreamingText('');
      setActiveMatchedFaqs([]);
      streamingTextRef.current = '';
      matchedFaqsRef.current = [];
      lastUserMessageRef.current = trimmed;

      const currentConvId = conversationId || `conv-${Date.now()}`;
      if (!conversationId) {
        setConversationId(currentConvId);
      }

      // Add user message immediately
      const userMessage: AiMessageDTO = {
        id: `user-${Date.now()}`,
        conversationId: currentConvId,
        role: 'USER' as MessageRole,
        content: trimmed,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        await streamAiAdvisorChat(
          {
            conversationId: currentConvId,
            childId: sendOptions?.childId || options.defaultChildId,
            message: trimmed,
          },
          {
            onContext: (context: SseContextEvent) => {
              matchedFaqsRef.current = context.matchedFaqs;
              setActiveMatchedFaqs(context.matchedFaqs);
            },
            onEmergency: (emergencyData: SseEmergencyEvent) => {
              setIsLoading(false);
              setActiveEmergency(emergencyData);
            },
            onToken: (token: string) => {
              setIsLoading(false);
              streamingTextRef.current += token;
              setActiveStreamingText(streamingTextRef.current);
            },
            onDone: (doneData) => {
              const fullContent = streamingTextRef.current;
              const matched = [...matchedFaqsRef.current];

              const assistantMessage: AiMessageDTO = {
                id: `ai-${Date.now()}`,
                conversationId: doneData.conversationId || currentConvId,
                role: 'ASSISTANT' as MessageRole,
                content: fullContent,
                matchedFaqIds: matched.length > 0 ? matched : undefined,
                createdAt: new Date().toISOString(),
              };

              setMessages((prev) => [...prev, assistantMessage]);
              setActiveStreamingText('');
              setActiveMatchedFaqs([]);
              streamingTextRef.current = '';
              matchedFaqsRef.current = [];
              setIsStreaming(false);
              setIsLoading(false);
              abortControllerRef.current = null;
            },
            onError: (streamErr) => {
              setError(streamErr.message || 'Stream connection interrupted');
              setIsStreaming(false);
              setIsLoading(false);
              abortControllerRef.current = null;
            },
          },
          { signal: controller.signal }
        );
      } catch (err: unknown) {
        if (controller.signal.aborted) {
          // Handled via stopStreaming
          return;
        }
        const msg = err instanceof Error ? err.message : 'Failed to connect to AI Advisor';
        setError(msg);
        setIsStreaming(false);
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [conversationId, isStreaming, options.defaultChildId]
  );

  const retryLastMessage = useCallback(async () => {
    if (lastUserMessageRef.current && !isStreaming) {
      await sendMessage(lastUserMessageRef.current);
    }
  }, [sendMessage, isStreaming]);

  return {
    messages,
    activeStreamingText,
    activeMatchedFaqs,
    activeEmergency,
    isStreaming,
    isLoading,
    error,
    conversationId,
    sendMessage,
    stopStreaming,
    clearConversation,
    retryLastMessage,
  };
}
