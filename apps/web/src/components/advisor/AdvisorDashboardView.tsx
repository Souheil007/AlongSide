'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  BookOpen,
  RotateCcw,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { useAiAdvisorChat } from '@/hooks/useAiAdvisorChat';
import {
  useChildContextStore,
  selectActiveChild,
  formatChildAge,
  getChildDevelopmentalHorizon,
} from '@/stores/useChildContextStore';
import { ChatFeed } from '@/components/advisor/ChatFeed';
import { QuickPrompts } from '@/components/advisor/QuickPrompts';
import { AdvisorComposer } from '@/components/advisor/AdvisorComposer';

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
    activeEmergency,
    isStreaming,
    isLoading,
    error,
    sendMessage,
    stopStreaming,
    clearConversation,
    retryLastMessage,
  } = useAiAdvisorChat({ defaultChildId: activeChild?.id });

  const [inputMessage, setInputMessage] = React.useState('');
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const autoSentRef = React.useRef(false);

  // If page was loaded with ?prompt=..., auto-send on a fresh chat or pre-fill an active chat
  React.useEffect(() => {
    if (!initialPrompt || autoSentRef.current) return;
    autoSentRef.current = true;
    if (messages.length === 0) {
      sendMessage(initialPrompt, { childId: activeChild?.id });
    } else {
      setInputMessage(initialPrompt);
      inputRef.current?.focus();
    }
  }, [initialPrompt, messages.length, sendMessage, activeChild?.id]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isStreaming) return;
    const msg = inputMessage;
    setInputMessage('');
    await sendMessage(msg, { childId: activeChild?.id });
  };

  const handleSelectQuickPrompt = (prompt: string) => {
    setInputMessage('');
    sendMessage(prompt, { childId: activeChild?.id });
  };

  const hasConversation =
    messages.length > 0 || isStreaming || isLoading || Boolean(activeEmergency);

  return (
    <div className="mx-auto w-full max-w-[920px] space-y-5">
      {/* Editorial Nameplate & Quiet Actions */}
      <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
        <div className="min-w-0 space-y-1.5">
          <Link
            href="/dashboard"
            className="inline-flex min-h-[32px] items-center gap-1.5 text-[13px] font-medium text-[#69726D] transition-colors hover:text-[#131715]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>

          <h1 className="font-serif text-[32px] sm:text-[38px] font-normal leading-[1.08] tracking-[-0.025em] text-[#131715]">
            Parent Advisor
          </h1>

          <div
            data-testid="active-child-consultation-banner"
            className="flex flex-wrap items-center gap-2 text-[13.5px] text-[#59625D]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#143D2B] shrink-0" aria-hidden="true" />
            {activeChild ? (
              <span>
                Calibrated for{' '}
                <strong className="font-medium text-[#131715]">
                  {activeChild.name}
                </strong>
                {' · '}
                {formatChildAge(activeChild)}
                {activeHorizon?.stage || activeHorizon?.tierLabel
                  ? ` · ${activeHorizon.stage || activeHorizon.tierLabel}`
                  : ''}
              </span>
            ) : (
              <span>Ages 0–18 · Developmental guidance and calm scripts</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearConversation}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] border border-[rgba(19,23,21,0.14)] bg-white px-3.5 text-[13.5px] font-medium text-[#454D49] transition-colors hover:bg-[#F6F4EE] hover:text-[#131715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
            >
              <RotateCcw className="h-4 w-4 text-[#69726D]" aria-hidden="true" />
              <span>New chat</span>
            </button>
          )}

          <Link
            href="/advisor/faqs"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] border border-[rgba(19,23,21,0.14)] bg-white px-4 text-[13.5px] font-medium text-[#131715] transition-colors hover:bg-[#F6F4EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
          >
            <BookOpen className="h-4 w-4 text-[#69726D]" aria-hidden="true" />
            <span>FAQ Library</span>
          </Link>
        </div>
      </header>

      {/* Focused Consultation Workspace */}
      <section
        aria-label="Parent Advisor conversation"
        className="flex min-h-[480px] h-[calc(100vh-15.5rem)] max-h-[780px] flex-col overflow-hidden rounded-[16px] border border-[rgba(19,23,21,0.1)] bg-white"
      >
        {/* Scrollable Stage */}
        <div className="flex-1 overflow-y-auto bg-[#FAF9F5] px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto w-full max-w-[720px]">
            {!hasConversation ? (
              <div className="py-4 sm:py-8 space-y-8">
                <div className="space-y-2.5">
                  <div className="h-[2px] w-7 bg-[#143D2B]" aria-hidden="true" />
                  <h2 className="font-serif text-[26px] sm:text-[30px] font-normal leading-[1.18] tracking-[-0.02em] text-[#131715]">
                    {activeChild
                      ? `What is happening with ${activeChild.name} right now?`
                      : 'What moment are you navigating right now?'}
                  </h2>
                  <p className="max-w-[56ch] text-[14.5px] leading-[1.58] text-[#454D49]">
                    Describe an argument, bedtime stall, or screen boundary. You will get brief
                    developmental context and exact words to say out loud.
                  </p>
                </div>

                <QuickPrompts
                  onSelectPrompt={handleSelectQuickPrompt}
                  disabled={isStreaming}
                />
              </div>
            ) : (
              <ChatFeed
                variant="studio"
                messages={messages}
                activeStreamingText={activeStreamingText}
                activeMatchedFaqs={activeMatchedFaqs}
                activeEmergency={activeEmergency}
                isStreaming={isStreaming}
                isLoading={isLoading}
                childName={activeChild?.name}
              />
            )}

            {error && (
              <div
                role="alert"
                className="mt-4 flex items-center justify-between gap-3 rounded-[10px] border border-[#DC2626]/25 bg-[#FEF2F2] px-4 py-3 text-[13.5px] text-[#991B1B]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
                <button
                  type="button"
                  onClick={retryLastMessage}
                  className="shrink-0 font-semibold text-[#991B1B] underline underline-offset-2 hover:text-[#7F1D1D]"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Docked Composer */}
        <div className="shrink-0 border-t border-[rgba(19,23,21,0.09)] bg-white px-4 py-4 sm:px-8">
          <div className="mx-auto w-full max-w-[720px]">
            <AdvisorComposer
              variant="studio"
              textareaRef={inputRef}
              value={inputMessage}
              onChange={setInputMessage}
              onSubmit={handleSend}
              onStop={stopStreaming}
              isStreaming={isStreaming}
              placeholder={
                activeChild
                  ? `Ask about ${activeChild.name} — tantrums, bedtime stalls, or screen boundaries...`
                  : "Describe what just happened — e.g. 'My 11yo yelled when screen time ended'"
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
