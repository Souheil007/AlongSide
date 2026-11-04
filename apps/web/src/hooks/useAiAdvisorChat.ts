'use client';

import { useCallback, useEffect } from 'react';
import { create } from 'zustand';
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

interface AdvisorStoreState {
  messages: AiMessageDTO[];
  activeStreamingText: string;
  activeMatchedFaqs: string[];
  activeEmergency: SseEmergencyEvent | null;
  isStreaming: boolean;
  isLoading: boolean;
  error: string | null;
  conversationId: string | null;
  lastUserMessage: string | null;

  setMessages: (messages: AiMessageDTO[]) => void;
  addMessage: (message: AiMessageDTO) => void;
  setActiveStreamingText: (text: string) => void;
  setActiveMatchedFaqs: (faqs: string[]) => void;
  setActiveEmergency: (emergency: SseEmergencyEvent | null) => void;
  setIsStreaming: (streaming: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (err: string | null) => void;
  setConversationId: (id: string | null) => void;
  setLastUserMessage: (msg: string | null) => void;
  resetChat: () => void;
}

export const useAdvisorStore = create<AdvisorStoreState>((set) => ({
  messages: [],
  activeStreamingText: '',
  activeMatchedFaqs: [],
  activeEmergency: null,
  isStreaming: false,
  isLoading: false,
  error: null,
  conversationId: null,
  lastUserMessage: null,

  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((s) => ({ messages: [...s.messages, message] })),
  setActiveStreamingText: (activeStreamingText) => set({ activeStreamingText }),
  setActiveMatchedFaqs: (activeMatchedFaqs) => set({ activeMatchedFaqs }),
  setActiveEmergency: (activeEmergency) => set({ activeEmergency }),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setConversationId: (conversationId) => set({ conversationId }),
  setLastUserMessage: (lastUserMessage) => set({ lastUserMessage }),
  resetChat: () =>
    set({
      messages: [],
      activeStreamingText: '',
      activeMatchedFaqs: [],
      activeEmergency: null,
      isStreaming: false,
      isLoading: false,
      error: null,
      conversationId: null,
      lastUserMessage: null,
    }),
}));

let activeAbortController: AbortController | null = null;
let activeStreamingTextAcc = '';
let activeMatchedFaqsAcc: string[] = [];

export function useAiAdvisorChat(options: UseAiAdvisorChatOptions = {}): UseAiAdvisorChatReturn {
  const store = useAdvisorStore();

  useEffect(() => {
    if (options.initialMessages && options.initialMessages.length > 0 && store.messages.length === 0) {
      store.setMessages(options.initialMessages);
    }
    if (options.initialConversationId && !store.conversationId) {
      store.setConversationId(options.initialConversationId);
    }
  }, [options.initialMessages, options.initialConversationId, store]);

  const stopStreaming = useCallback(() => {
    if (activeAbortController) {
      activeAbortController.abort();
      activeAbortController = null;
    }

    if (activeStreamingTextAcc.trim()) {
      const partialMessage: AiMessageDTO = {
        id: `msg-${Date.now()}`,
        conversationId: store.conversationId || `conv-${Date.now()}`,
        role: 'ASSISTANT' as MessageRole,
        content: activeStreamingTextAcc,
        matchedFaqIds: [...activeMatchedFaqsAcc],
        createdAt: new Date().toISOString(),
      };
      store.addMessage(partialMessage);
    }

    activeStreamingTextAcc = '';
    activeMatchedFaqsAcc = [];
    store.setIsStreaming(false);
    store.setIsLoading(false);
    store.setActiveStreamingText('');
    store.setActiveMatchedFaqs([]);
  }, [store]);

  const clearConversation = useCallback(() => {
    stopStreaming();
    store.resetChat();
  }, [stopStreaming, store]);

  const sendMessage = useCallback(
    async (messageText: string, sendOptions?: { childId?: string }) => {
      const trimmed = messageText.trim();
      if (!trimmed || store.isStreaming) return;

      store.setError(null);
      store.setActiveEmergency(null);
      store.setIsLoading(true);
      store.setIsStreaming(true);
      store.setActiveStreamingText('');
      store.setActiveMatchedFaqs([]);
      activeStreamingTextAcc = '';
      activeMatchedFaqsAcc = [];
      store.setLastUserMessage(trimmed);

      const currentConvId = store.conversationId || `conv-${Date.now()}`;
      if (!store.conversationId) {
        store.setConversationId(currentConvId);
      }

      // Add user message immediately
      const userMessage: AiMessageDTO = {
        id: `user-${Date.now()}`,
        conversationId: currentConvId,
        role: 'USER' as MessageRole,
        content: trimmed,
        createdAt: new Date().toISOString(),
      };
      store.addMessage(userMessage);

      const controller = new AbortController();
      activeAbortController = controller;

      try {
        await streamAiAdvisorChat(
          {
            conversationId: currentConvId,
            childId: sendOptions?.childId || options.defaultChildId,
            message: trimmed,
          },
          {
            onContext: (context: SseContextEvent) => {
              activeMatchedFaqsAcc = context.matchedFaqs;
              store.setActiveMatchedFaqs(context.matchedFaqs);
            },
            onEmergency: (emergencyData: SseEmergencyEvent) => {
              store.setIsLoading(false);
              store.setActiveEmergency(emergencyData);
            },
            onToken: (token: string) => {
              store.setIsLoading(false);
              activeStreamingTextAcc += token;
              store.setActiveStreamingText(activeStreamingTextAcc);
            },
            onDone: (doneData) => {
              const fullContent = activeStreamingTextAcc;
              const matched = [...activeMatchedFaqsAcc];

              const assistantMessage: AiMessageDTO = {
                id: `ai-${Date.now()}`,
                conversationId: doneData.conversationId || currentConvId,
                role: 'ASSISTANT' as MessageRole,
                content: fullContent,
                matchedFaqIds: matched.length > 0 ? matched : undefined,
                createdAt: new Date().toISOString(),
              };

              store.addMessage(assistantMessage);
              store.setActiveStreamingText('');
              store.setActiveMatchedFaqs([]);
              activeStreamingTextAcc = '';
              activeMatchedFaqsAcc = [];
              store.setIsStreaming(false);
              store.setIsLoading(false);
              activeAbortController = null;
            },
            onError: (streamErr) => {
              store.setError(streamErr.message || 'Stream connection interrupted');
              store.setIsStreaming(false);
              store.setIsLoading(false);
              activeAbortController = null;
            },
          },
          { signal: controller.signal }
        );
      } catch (err: unknown) {
        if (controller.signal.aborted) {
          return;
        }
        const msg = err instanceof Error ? err.message : 'Failed to connect to AI Advisor';
        store.setError(msg);
        store.setIsStreaming(false);
        store.setIsLoading(false);
        activeAbortController = null;
      }
    },
    [options.defaultChildId, store]
  );

  const retryLastMessage = useCallback(async () => {
    if (store.lastUserMessage && !store.isStreaming) {
      await sendMessage(store.lastUserMessage);
    }
  }, [sendMessage, store.lastUserMessage, store.isStreaming]);

  return {
    messages: store.messages,
    activeStreamingText: store.activeStreamingText,
    activeMatchedFaqs: store.activeMatchedFaqs,
    activeEmergency: store.activeEmergency,
    isStreaming: store.isStreaming,
    isLoading: store.isLoading,
    error: store.error,
    conversationId: store.conversationId,
    sendMessage,
    stopStreaming,
    clearConversation,
    retryLastMessage,
  };
}
