'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Shield,
  Send,
  Square,
  Sparkles,
  BookOpen,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
} from 'lucide-react';
import { useAiAdvisorChat } from '@/hooks/useAiAdvisorChat';
import {
  useChildContextStore,
  selectActiveChild,
  getChildDevelopmentalHorizon,
} from '@/stores/useChildContextStore';
import { ChatFeed } from '@/components/advisor/ChatFeed';
import { QuickPrompts } from '@/components/advisor/QuickPrompts';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function AdvisorDashboardView() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get('prompt') || '';

  const { children, activeChildId } = useChildContextStore();
  const activeChild = selectActiveChild({ children, activeChildId });
  const activeHorizon = activeChild
    ? getChildDevelopmentalHorizon(activeChild.developmentalTier || activeChild.age)
    : null;

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
  } = useAiAdvisorChat({ defaultChildId: activeChild?.id });

  const [inputMessage, setInputMessage] = React.useState('');
  const [isSparringOpen, setIsSparringOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const autoSentRef = React.useRef(false);

  // If page was loaded with ?prompt=..., pre-populate or auto-send once
  React.useEffect(() => {
    if (initialPrompt && !autoSentRef.current && messages.length === 0) {
      autoSentRef.current = true;
      sendMessage(initialPrompt, { childId: activeChild?.id });
    }
  }, [initialPrompt, messages.length, sendMessage, activeChild?.id]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isStreaming) return;
    const msg = inputMessage;
    setInputMessage('');
    await sendMessage(msg, { childId: activeChild?.id });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
    sendMessage(prompt, { childId: activeChild?.id });
  };

  return (
    <div className="space-y-6">
      {/* Navigation Synergy: Return to Overview */}
      <div className="flex items-center justify-between pb-1 font-mono">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-[#858C88] hover:text-[#111413] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Family Dashboard</span>
        </Link>
        <span className="text-[11px] text-[#858C88] hidden sm:inline">
          Full Rehearsal Studio &amp; Parenting Vault
        </span>
      </div>

      {/* Top Header & Rehearsal Hero Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1 font-mono">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF3EE] border border-[#E3E3DC] px-3 py-0.5 text-xs font-medium text-[#143D2B]">
              <Shield className="h-3.5 w-3.5 text-[#143D2B]" />
              Developmental Neurobiology Vault
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F4F4F0] border border-[#E3E3DC] px-2.5 py-0.5 text-xs font-medium text-[#494F4C]">
              SSE Real-Time Stream
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#111413]">
            24/7 AI Child Advisor
          </h1>
          <p className="mt-1 text-sm text-[#494F4C] max-w-2xl leading-relaxed">
            Instant, judgment-free developmental guidance for acute parenting conflict.
            Transform dopamine crashes and phone battles into calm, collaborative agreements.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/advisor/faqs">
            <Button
              variant="outline"
              className="gap-2 border-[#E3E3DC] text-[#111413] hover:bg-[#F4F4F0] min-h-[44px] rounded-[5px]"
            >
              <BookOpen className="h-4 w-4 text-[#858C88]" />
              <span>Living FAQ Explorer</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Chat Area Card */}
      <div className="rounded-[10px] border border-[#E3E3DC] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(17,20,19,0.04)] overflow-hidden flex flex-col min-h-[550px] max-h-[750px]">
        {/* Chat Header Bar */}
        <div className="flex items-center justify-between border-b border-[#E3E3DC] bg-[#F4F4F0] px-4 py-3 sm:px-6 font-mono">
          <div className="flex items-center gap-2">
            <div className="flex h-2.5 w-2.5 rounded-full bg-[#143D2B] animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-[#111413]">
              Active Consultation Session
            </span>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearConversation}
              className="flex items-center gap-1.5 text-xs font-mono text-[#858C88] hover:text-[#DC2626] transition-colors p-1"
              title="Reset conversation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear Chat</span>
            </button>
          )}
        </div>

        {/* Active Child Consultation Banner */}
        {activeChild && (
          <div
            data-testid="active-child-consultation-banner"
            className="border-b border-[#E3E3DC] bg-[#EAF3EE] px-4 py-2.5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-[#143D2B] font-mono"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="h-3.5 w-3.5 text-[#143D2B] shrink-0" />
              <span>
                Active Consultation: Calibrated for {activeChild.name} (Age {activeChild.age} ·{' '}
                {activeHorizon?.stage || activeHorizon?.tierLabel})
              </span>
            </span>
            <span className="text-[11px] text-[#143D2B]/80 font-normal">
              Responses grounded in this developmental neurobiology window
            </span>
          </div>
        )}

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FBFBF9]">
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
        <div className="border-t border-[#E3E3DC] bg-[#FFFFFF] p-4 sm:p-5 space-y-3">
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
              placeholder={
                activeChild
                  ? `Ask about ${activeChild.name}... (e.g. tantrums, bedtime stalls, phone boundaries)`
                  : "Ask anything... (e.g. 'My 11yo screamed at me when I told him screen time was over')"
              }
              className="w-full resize-none rounded-[5px] border border-[#E3E3DC] bg-[#FBFBF9] p-3 pr-24 text-sm text-[#111413] placeholder:text-[#858C88] focus:border-[#143D2B] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#143D2B] disabled:opacity-60"
            />

            <div className="absolute right-2.5 bottom-3.5 flex items-center gap-1.5">
              {isStreaming ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={stopStreaming}
                  className="gap-1 text-xs border-[#DC2626]/30 text-[#DC2626] hover:bg-[#FFF5F5] rounded-[5px]"
                >
                  <Square className="h-3 w-3 fill-[#DC2626] text-[#DC2626]" />
                  <span>Stop</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={!inputMessage.trim()}
                  className="gap-1.5 text-xs bg-[#111413] hover:bg-[#143D2B] text-white rounded-[5px] transition-colors"
                >
                  <span>Send</span>
                  <Send className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </form>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#858C88]">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3 text-[#143D2B]" />
              Grounded in pediatric & adolescent neuroscience
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
