'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Shield,
  Send,
  Square,
  Sparkles,
  Radio,
  BookOpen,
  RotateCcw,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useAiAdvisorChat } from '@/hooks/useAiAdvisorChat';
import { ChatFeed } from '@/components/advisor/ChatFeed';
import { QuickPrompts } from '@/components/advisor/QuickPrompts';
import { VoiceSparringModal } from '@/components/advisor/VoiceSparringModal';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function AdvisorDashboardView() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get('prompt') || '';

  const {
    messages,
    activeStreamingText,
    activeMatchedFaqs,
    isStreaming,
    isLoading,
    error,
    sendMessage,
    stopStreaming,
    clearConversation,
    retryLastMessage,
  } = useAiAdvisorChat();

  const [inputMessage, setInputMessage] = React.useState('');
  const [isSparringOpen, setIsSparringOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const autoSentRef = React.useRef(false);

  // If page was loaded with ?prompt=..., pre-populate or auto-send once
  React.useEffect(() => {
    if (initialPrompt && !autoSentRef.current && messages.length === 0) {
      autoSentRef.current = true;
      sendMessage(initialPrompt);
    }
  }, [initialPrompt, messages.length, sendMessage]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isStreaming) return;
    const msg = inputMessage;
    setInputMessage('');
    await sendMessage(msg);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
    sendMessage(prompt);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Rehearsal Hero Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-3 py-0.5 text-xs font-semibold text-teal-800">
              <Shield className="h-3.5 w-3.5 text-teal-600" />
              Developmental Neurobiology Vault
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              SSE Real-Time Stream
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            24/7 AI Child Advisor
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl leading-relaxed">
            Instant, judgment-free clinical guidance for acute parenting conflict.
            Transform dopamine crashes and phone battles into calm, collaborative agreements.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            onClick={() => setIsSparringOpen(true)}
            className="gap-2 border-teal-300 text-teal-800 hover:bg-teal-50 min-h-[44px]"
          >
            <Radio className="h-4 w-4 text-teal-600 animate-pulse" />
            <span>Voice Sparring Simulator</span>
          </Button>
          <Link href="/advisor/faqs">
            <Button
              variant="outline"
              className="gap-2 text-slate-700 hover:bg-slate-50 min-h-[44px]"
            >
              <BookOpen className="h-4 w-4 text-slate-500" />
              <span>Living FAQ Explorer</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Voice Sparring Callout Card */}
      <div className="rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 via-emerald-50/50 to-teal-50/20 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow">
            <Radio className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Need to Practice High-Heat Arguments?
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Step into the Voice Sparring Simulator to rehearse responses to bedtime meltdowns,
              Snapchat begging, and spying accusations with immediate clinical coaching.
            </p>
          </div>
        </div>
        <Button
          variant="default"
          onClick={() => setIsSparringOpen(true)}
          className="shrink-0 gap-1.5 text-xs min-h-[44px]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Launch Sparring Lab
        </Button>
      </div>

      {/* Chat Area Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden flex flex-col min-h-[550px] max-h-[750px]">
        {/* Chat Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Active Consultation Session
            </span>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearConversation}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors p-1"
              title="Reset conversation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear Chat</span>
            </button>
          )}
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FCFBF8]/40">
          <ChatFeed
            messages={messages}
            activeStreamingText={activeStreamingText}
            activeMatchedFaqs={activeMatchedFaqs}
            isStreaming={isStreaming}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={retryLastMessage}
                className="font-bold underline hover:text-rose-900"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Quick Prompts & Input Bar */}
        <div className="border-t border-slate-200/80 bg-white p-4 sm:p-5 space-y-3">
          {/* Quick Prompts Tray */}
          {messages.length === 0 && (
            <QuickPrompts
              onSelectPrompt={handleSelectQuickPrompt}
              disabled={isStreaming}
            />
          )}

          {/* Form Input */}
          <form onSubmit={handleSend} className="relative">
            <textarea
              ref={inputRef}
              rows={2}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
              placeholder="Ask anything... (e.g. 'My 11yo screamed at me when I told him screen time was over')"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-3 pr-24 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-60"
            />

            <div className="absolute right-2.5 bottom-3.5 flex items-center gap-1.5">
              {isStreaming ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={stopStreaming}
                  className="gap-1 text-xs border-rose-300 text-rose-700 hover:bg-rose-50"
                >
                  <Square className="h-3 w-3 fill-rose-600 text-rose-600" />
                  <span>Stop</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={!inputMessage.trim()}
                  className="gap-1.5 text-xs"
                >
                  <span>Send</span>
                  <Send className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </form>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3" />
              Grounded in pediatric & adolescent neuroscience
            </span>
          </div>
        </div>
      </div>

      {/* Voice Sparring Modal */}
      <VoiceSparringModal
        open={isSparringOpen}
        onOpenChange={setIsSparringOpen}
      />
    </div>
  );
}
