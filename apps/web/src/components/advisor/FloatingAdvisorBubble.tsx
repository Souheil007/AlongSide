'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Bot,
  X,
  Send,
  Square,
  Sparkles,
  ExternalLink,
  RotateCcw,
  AlertCircle,
  AlertTriangle,
  Radio,
  Minimize2,
} from 'lucide-react';
import { useAiAdvisorChat } from '@/hooks/useAiAdvisorChat';
import { useChildContextStore, selectActiveChild, formatChildAge } from '@/stores/useChildContextStore';
import { resolveContextualPrompts, type ContextualPrompt } from '@/lib/advisor-context';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

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
  const feedEndRef = React.useRef<HTMLDivElement>(null);

  // Hide the floating bubble entirely on dedicated full-screen advisor routes
  const isAdvisorRoute = pathname?.startsWith('/advisor');

  // Generate route and child-tailored quick prompts
  const contextualPrompts = React.useMemo(() => {
    return resolveContextualPrompts(pathname || '/dashboard', activeChild);
  }, [pathname, activeChild]);

  // Handle ESC key to dismiss drawer
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll message feed
  React.useEffect(() => {
    if (isOpen) {
      feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, activeStreamingText]);

  if (isAdvisorRoute) {
    return null;
  }

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 1. Collapsed Floating Action Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={false}
          aria-label="Open 24/7 AI Child Advisor"
          className={cn(
            'fixed z-40 flex items-center gap-2.5 rounded-full bg-teal-700 text-white shadow-xl hover:bg-teal-800 hover:shadow-2xl active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-teal-500/30 no-print',
            // Mobile: positioned at bottom-20 (80px from bottom) to sit cleanly above MobileNav (h-14 / bottom-0)
            'bottom-20 right-4 p-3.5',
            // Desktop: bottom-6 right-6
            'md:bottom-6 md:right-6 md:px-4 md:py-3'
          )}
        >
          <div className="relative flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300" />
            </span>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold leading-tight">Ask Advisor</span>
            <span className="text-[10px] text-teal-100 font-medium leading-tight">
              24/7 Clinical AI
            </span>
          </div>
        </button>
      )}

      {/* 2. Expanded Slide-Over Drawer & Modal Backdrop */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="24/7 AI Child Advisor Chat"
            className={cn(
              'fixed z-50 flex flex-col bg-white shadow-2xl border border-slate-200/90 overflow-hidden no-print animate-in fade-in-0 duration-200',
              // Mobile: slide up bottom sheet
              'inset-x-0 bottom-0 top-14 rounded-t-3xl sm:top-auto sm:inset-x-auto',
              // Desktop: anchored bottom-right card
              'sm:bottom-6 sm:right-6 sm:w-[440px] sm:h-[640px] sm:max-h-[88vh] sm:rounded-3xl sm:slide-in-from-bottom-5'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/90 px-4 py-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white shadow-xs">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-sm leading-tight truncate">
                      24/7 AI Child Advisor
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-800 shrink-0">
                      Live
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium truncate">
                    {activeChild
                      ? `Advising for ${activeChild.name} (${formatChildAge(activeChild)})`
                      : 'Grounded in Pediatric Neuroscience'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Link
                  href="/advisor"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 text-[11px] font-bold text-teal-800 hover:text-teal-950 bg-teal-50 hover:bg-teal-100/90 border border-teal-200/70 rounded-lg px-2.5 py-1.5 transition-colors"
                  title="Open Full Voice Sparring Rehearsal Studio"
                >
                  <Radio className="h-3 w-3 text-teal-600 animate-pulse" />
                  <span className="hidden xs:inline">Full Studio</span>
                  <ExternalLink className="h-3 w-3 text-teal-600" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Minimize Advisor Chat"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Close Advisor Chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Emergency Alert (if triggered) */}
            {activeEmergency && (
              <div className="border-b border-rose-200 bg-rose-50 p-3 text-xs text-rose-900 shrink-0 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                  <span>{activeEmergency.headline || 'Immediate Medical Protocol Required'}</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {activeEmergency.directive}
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-bold">
                  <a
                    href={`tel:${activeEmergency.phoneDial || '911'}`}
                    className="inline-flex items-center gap-1 rounded bg-rose-600 px-2 py-0.5 text-white hover:bg-rose-700"
                  >
                    Call {activeEmergency.phoneDial || '911'}
                  </a>
                  <a
                    href="tel:18002221222"
                    className="inline-flex items-center gap-1 rounded border border-rose-400 bg-white px-2 py-0.5 text-rose-800 hover:bg-rose-100"
                  >
                    Poison Control (1-800-222-1222)
                  </a>
                </div>
              </div>
            )}

            {/* Contextual Quick Prompts Carousel Bar */}
            <div className="border-b border-slate-100 bg-slate-50/50 px-3 py-2 shrink-0">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                <Sparkles className="h-3 w-3 text-teal-600" />
                <span>Contextual Quick Questions (Tap to Ask)</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {contextualPrompts.map((cp) => (
                  <button
                    key={cp.id}
                    type="button"
                    disabled={isStreaming}
                    onClick={() => handlePromptClick(cp)}
                    className="shrink-0 rounded-full border border-slate-200/90 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-2xs hover:border-teal-400 hover:bg-teal-50 hover:text-teal-900 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {cp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FCFBF8]/40">
              {messages.length === 0 && !isStreaming && (
                <div className="my-auto flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 shadow-inner">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      How can I help right now?
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 max-w-xs leading-relaxed">
                      Instant, empathetic advice for acute tantrums, illness symptoms,
                      picky eating, or phone boundaries.
                    </p>
                  </div>
                </div>
              )}

              {messages.map((m) => {
                const isUser = m.role === 'USER';
                return (
                  <div
                    key={m.id}
                    className={cn(
                      'flex flex-col',
                      isUser ? 'items-end' : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs',
                        isUser
                          ? 'bg-teal-700 text-white rounded-br-xs'
                          : 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs'
                      )}
                    >
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    </div>

                    {!isUser && m.matchedFaqIds && m.matchedFaqIds.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {m.matchedFaqIds.slice(0, 2).map((faqId) => (
                          <Link
                            key={faqId}
                            href={`/advisor/faqs?q=${encodeURIComponent(faqId.replace(/^faq-/, ''))}`}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-1.5 py-0.5 text-[10px] font-medium text-teal-800 hover:bg-teal-100"
                          >
                            <span>Clinical FAQ reference</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Live Streaming Response */}
              {isStreaming && (
                <div className="flex flex-col items-start">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-xs bg-white border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 shadow-2xs leading-relaxed">
                    {activeStreamingText ? (
                      <p className="whitespace-pre-wrap">
                        {activeStreamingText}
                        <span className="inline-block h-3 w-1.5 ml-1 bg-teal-600 animate-pulse" />
                      </p>
                    ) : (
                      <div className="flex items-center gap-1.5 py-1 text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-teal-600 animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 rounded-full bg-teal-600 animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 rounded-full bg-teal-600 animate-bounce" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Stream Error Alert */}
              {error && (
                <div className="flex items-center justify-between gap-2 rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800">
                  <div className="flex items-center gap-1.5">
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

              <div ref={feedEndRef} />
            </div>

            {/* Input & Controls Bar */}
            <div className="border-t border-slate-100 bg-white p-3 space-y-2 shrink-0">
              <form onSubmit={handleSend} className="relative">
                <textarea
                  ref={inputRef}
                  rows={2}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isStreaming}
                  placeholder={`Ask about ${activeChild?.name || 'your child'}...`}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 pr-20 text-xs text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-60"
                />

                <div className="absolute right-2 bottom-3 flex items-center gap-1">
                  {isStreaming ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={stopStreaming}
                      className="h-7 px-2 text-[11px] border-rose-300 text-rose-700 hover:bg-rose-50"
                    >
                      <Square className="h-3 w-3 fill-rose-600 text-rose-600 mr-1" />
                      <span>Stop</span>
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="default"
                      size="sm"
                      disabled={!inputMessage.trim()}
                      className="h-7 px-2.5 text-[11px] bg-teal-700 hover:bg-teal-800"
                    >
                      <span>Send</span>
                      <Send className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </form>

              {/* Footer Meta Row */}
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Enter to send • Shift+Enter for new line</span>
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={clearConversation}
                    className="flex items-center gap-1 hover:text-rose-600 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
