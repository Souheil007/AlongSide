'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  MessageCircle,
  X,
  Maximize2,
  RotateCcw,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react';
import { useAiAdvisorChat } from '@/hooks/useAiAdvisorChat';
import {
  useChildContextStore,
  selectActiveChild,
  formatChildAge,
} from '@/stores/useChildContextStore';
import dynamic from 'next/dynamic';
import {
  resolveContextualPrompts,
  type ContextualPrompt,
} from '@/lib/advisor-context';
import { cn } from '@/lib/utils';

const ChatFeed = dynamic(
  () => import('@/components/advisor/ChatFeed').then((mod) => mod.ChatFeed),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 p-6 space-y-4 animate-pulse">
        <div className="h-16 bg-slate-200/60 rounded-xl" />
        <div className="h-20 bg-slate-200/40 rounded-xl w-3/4 ml-auto" />
      </div>
    ),
  }
);

const AdvisorComposer = dynamic(
  () => import('@/components/advisor/AdvisorComposer').then((mod) => mod.AdvisorComposer),
  { ssr: false }
);

export function FloatingAdvisorBubble() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputMessage, setInputMessage] = React.useState('');

  const activeChild = useChildContextStore(selectActiveChild);
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
  } = useAiAdvisorChat({
    defaultChildId: activeChild?.id,
  });

  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Hide the floating launcher on dedicated full-screen advisor routes
  const isAdvisorRoute = pathname?.startsWith('/advisor');

  // Generate route- and child-calibrated starter prompts
  const contextualPrompts = React.useMemo(() => {
    return resolveContextualPrompts(pathname || '/dashboard', activeChild);
  }, [pathname, activeChild]);

  // Handle Escape key and cross-page `alongside:open-advisor` trigger
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    const handleOpenAdvisor = (e: Event) => {
      const custom = e as CustomEvent<{ prompt?: string }>;
      if (custom.detail?.prompt) {
        setInputMessage(custom.detail.prompt);
      }
      setIsOpen(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('alongside:open-advisor', handleOpenAdvisor);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('alongside:open-advisor', handleOpenAdvisor);
    };
  }, [isOpen]);

  // Focus composer shortly after opening
  React.useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  if (isAdvisorRoute) {
    return null;
  }

  const hasConversation =
    messages.length > 0 || isStreaming || isLoading || Boolean(activeEmergency);

  const childContextLabel = activeChild
    ? `For ${activeChild.name}, ${formatChildAge(activeChild)}`
    : 'Ages 0–18 · Pediatric guidance';

  const handleSend = async () => {
    if (!inputMessage.trim() || isStreaming) return;
    const text = inputMessage;
    setInputMessage('');
    await sendMessage(text, { childId: activeChild?.id });
  };

  const handlePromptClick = async (prompt: ContextualPrompt) => {
    if (isStreaming) return;
    setInputMessage('');
    await sendMessage(prompt.prompt, { childId: activeChild?.id });
  };

  return (
    <>
      {/* 1. Collapsed Floating Launcher */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={false}
          aria-label="Open Parent Advisor"
          className={cn(
            'fixed z-40 inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#143D2B] text-[#FAF9F5] border border-white/10',
            'shadow-[0_8px_24px_rgba(19,23,21,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]',
            'hover:bg-[#0E2B1E] hover:shadow-[0_12px_28px_rgba(19,23,21,0.2)] active:scale-[0.98]',
            'transition-[background-color,transform,box-shadow] duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-2 no-print',
            'bottom-20 right-4 px-4 md:bottom-6 md:right-6 md:px-5'
          )}
        >
          <span className="relative flex items-center justify-center">
            <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
            {messages.length > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#A7D7BE] ring-2 ring-[#143D2B]"
                aria-hidden="true"
              />
            )}
          </span>
          <span className="text-[13.5px] font-medium tracking-[-0.005em] whitespace-nowrap">
            Ask Advisor
          </span>
        </button>
      )}

      {/* 2. Opened Slide-Over Sheet / Floating Panel */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            className="sm:hidden fixed inset-0 z-50 bg-[#131715]/35 transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Parent Advisor"
            className={cn(
              'almanac-rise-in fixed z-50 flex flex-col overflow-hidden bg-[#FAF9F5] border border-[rgba(19,23,21,0.12)] shadow-[0_20px_50px_rgba(19,23,21,0.16)] no-print',
              // Mobile: clean bottom sheet
              'inset-x-0 bottom-0 top-12 rounded-t-[20px] sm:top-auto sm:inset-x-auto',
              // Desktop: calm anchored workspace card
              'sm:bottom-6 sm:right-6 sm:w-[440px] sm:h-[620px] sm:max-h-[84vh] sm:rounded-[16px]'
            )}
          >
            {/* Mobile Sheet Handle */}
            <div className="sm:hidden flex justify-center bg-white pt-2.5 pb-1">
              <div className="h-1 w-9 rounded-full bg-[#131715]/15" />
            </div>

            {/* Quiet 2-Zone Header */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[rgba(19,23,21,0.09)] bg-white px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#E8F1EC] text-[#143D2B]">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[14.5px] font-semibold leading-tight text-[#131715]">
                    Parent Advisor
                  </span>
                  <span className="truncate text-[12px] leading-snug text-[#69726D]">
                    {childContextLabel}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={clearConversation}
                    className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-[8px] text-[#59625D] transition-colors hover:bg-[#F2F0E9] hover:text-[#131715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                    aria-label="Start new conversation"
                    title="New conversation"
                  >
                    <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                )}

                <Link
                  href="/advisor"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-[8px] text-[#59625D] transition-colors hover:bg-[#F2F0E9] hover:text-[#131715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                  aria-label="Open full Parent Advisor workspace"
                  title="Open full workspace"
                >
                  <Maximize2 className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-[8px] text-[#59625D] transition-colors hover:bg-[#F2F0E9] hover:text-[#131715] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
                  aria-label="Close Parent Advisor"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Body: Calm Opening State or Unified Conversation Feed */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-5 py-5">
              {!hasConversation ? (
                <div className="flex min-h-full flex-col justify-between gap-6">
                  <div className="pt-2">
                    <div className="mb-3.5 h-[2px] w-6 bg-[#143D2B]" aria-hidden="true" />
                    <h2 className="font-serif text-[25px] font-normal leading-[1.2] tracking-[-0.02em] text-[#131715]">
                      {activeChild
                        ? `What happened with ${activeChild.name}?`
                        : 'What can we work through?'}
                    </h2>
                    <p className="mt-2 text-[14px] leading-[1.55] text-[#454D49]">
                      Describe the moment to get brief brain-science context and exact, calm words to say.
                    </p>
                  </div>

                  <div className="space-y-2.5 pb-1">
                    <p className="text-[12px] font-medium text-[#69726D]">
                      Suggested for right now
                    </p>
                    <div className="flex flex-col gap-2">
                      {contextualPrompts.map((cp) => (
                        <button
                          key={cp.id}
                          type="button"
                          disabled={isStreaming}
                          onClick={() => handlePromptClick(cp)}
                          className={cn(
                            'group flex min-h-[52px] w-full items-center justify-between gap-3 rounded-[10px] border border-[rgba(19,23,21,0.09)] bg-white px-3.5 py-2.5 text-left',
                            'transition-colors duration-150 hover:border-[#143D2B]/40 hover:bg-[#F6F5F0] active:scale-[0.99]',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] disabled:opacity-50'
                          )}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="text-[13.5px] font-medium leading-snug text-[#131715]">
                              {cp.label}
                            </div>
                            <div className="mt-0.5 truncate text-[12px] text-[#69726D]">
                              {cp.prompt}
                            </div>
                          </div>
                          <ArrowUpRight
                            className="h-4 w-4 shrink-0 text-[#8A918D] transition-colors group-hover:text-[#143D2B]"
                            aria-hidden="true"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <ChatFeed
                    variant="drawer"
                    messages={messages}
                    activeStreamingText={activeStreamingText}
                    activeMatchedFaqs={activeMatchedFaqs}
                    activeEmergency={activeEmergency}
                    isStreaming={isStreaming}
                    isLoading={isLoading}
                    childName={activeChild?.name}
                    onNavigateAway={() => setIsOpen(false)}
                    scrollContainerRef={scrollContainerRef}
                  />

                  {error && (
                    <div
                      role="alert"
                      className="mt-3 flex items-center justify-between gap-3 rounded-[10px] border border-[#DC2626]/25 bg-[#FEF2F2] px-3.5 py-2.5 text-[13px] text-[#991B1B]"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0" aria-hidden="true" />
                        <span className="truncate">{error}</span>
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
                </>
              )}
            </div>

            {/* Clean Docked Composer */}
            <div className="shrink-0 border-t border-[rgba(19,23,21,0.09)] bg-white px-4 py-3">
              <AdvisorComposer
                variant="drawer"
                textareaRef={inputRef}
                value={inputMessage}
                onChange={setInputMessage}
                onSubmit={handleSend}
                onStop={stopStreaming}
                isStreaming={isStreaming}
                placeholder={
                  activeChild
                    ? `Ask about ${activeChild.name}...`
                    : 'Describe what just happened...'
                }
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
