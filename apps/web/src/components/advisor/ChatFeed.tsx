'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  ArrowUpRight,
  ArrowDown,
  AlertTriangle,
  PhoneCall,
} from 'lucide-react';
import type { AiMessageDTO } from '@alongside/shared';
import type { SseEmergencyEvent } from '@/lib/api/advisor';
import { cn } from '@/lib/utils';
import { MarkdownMessage } from '@/components/shared/MarkdownMessage';

export interface StreamingScrollMetrics {
  scrollHeight: number;
  clientHeight: number;
  currentScrollTop: number;
  latestUserMessageTop: number | null;
  activeResponseTop: number | null;
  topPaddingPx?: number;
}

/**
 * Compute target scrollTop during streaming so the parent's question and
 * the opening of the AI response stay anchored in view rather than forcing
 * the viewport down with every streamed token.
 */
export function computeStreamingScrollTop({
  scrollHeight,
  clientHeight,
  currentScrollTop,
  latestUserMessageTop,
  activeResponseTop,
  topPaddingPx = 16,
}: StreamingScrollMetrics): number {
  const maxScrollTop = Math.max(0, scrollHeight - clientHeight);
  if (maxScrollTop === 0) return 0;

  let anchorTop: number | null = null;
  if (latestUserMessageTop !== null) {
    anchorTop = Math.max(0, latestUserMessageTop - topPaddingPx);
    if (activeResponseTop !== null) {
      const responseAnchorTop = Math.max(
        0,
        activeResponseTop - Math.floor(clientHeight * 0.35)
      );
      anchorTop = Math.max(anchorTop, responseAnchorTop);
    }
  } else if (activeResponseTop !== null) {
    anchorTop = Math.max(0, activeResponseTop - topPaddingPx);
  }

  const desiredTop =
    anchorTop !== null ? Math.min(maxScrollTop, anchorTop) : maxScrollTop;
  return Math.max(currentScrollTop, desiredTop);
}

export function isScrollNearBottom(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
  thresholdPx = 72
): boolean {
  return scrollHeight - scrollTop - clientHeight <= thresholdPx;
}

function resolveScrollContainer(
  feedEl: HTMLDivElement | null,
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
): HTMLElement | null {
  if (scrollContainerRef?.current) return scrollContainerRef.current;
  if (typeof window === 'undefined') return null;

  let node = feedEl?.parentElement ?? null;
  while (node) {
    const overflowY = window.getComputedStyle(node).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

function getOffsetWithinContainer(
  targetEl: HTMLElement | null,
  containerEl: HTMLElement
): number | null {
  if (!targetEl) return null;
  return (
    targetEl.getBoundingClientRect().top -
    containerEl.getBoundingClientRect().top +
    containerEl.scrollTop
  );
}

export interface ChatFeedProps {
  messages: AiMessageDTO[];
  activeStreamingText?: string;
  activeMatchedFaqs?: string[];
  activeEmergency?: SseEmergencyEvent | null;
  isStreaming?: boolean;
  isLoading?: boolean;
  variant?: 'studio' | 'drawer';
  childName?: string | null;
  onNavigateAway?: () => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function ChatFeed({
  messages,
  activeStreamingText = '',
  activeMatchedFaqs = [],
  activeEmergency = null,
  isStreaming = false,
  isLoading = false,
  variant = 'studio',
  childName,
  onNavigateAway,
  scrollContainerRef,
  className,
}: ChatFeedProps) {
  const feedRef = React.useRef<HTMLDivElement>(null);
  const latestUserMessageRef = React.useRef<HTMLDivElement>(null);
  const activeResponseRef = React.useRef<HTMLDivElement>(null);
  const userDetachedRef = React.useRef(false);
  const didInitialScrollRef = React.useRef(false);
  const prevUserCountRef = React.useRef(
    messages.filter((m) => m.role === 'USER').length
  );
  const prevEmergencyRef = React.useRef<SseEmergencyEvent | null>(activeEmergency);
  const lastProgrammaticTopRef = React.useRef<number | null>(null);
  const [showJumpToBottom, setShowJumpToBottom] = React.useState(false);

  const syncJumpButton = React.useCallback((container: HTMLElement) => {
    setShowJumpToBottom(
      !isScrollNearBottom(
        container.scrollTop,
        container.scrollHeight,
        container.clientHeight
      )
    );
  }, []);

  React.useEffect(() => {
    const container = resolveScrollContainer(feedRef.current, scrollContainerRef);
    if (!container) return;

    const markUserDetached = () => {
      userDetachedRef.current = true;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'PageUp' ||
        e.key === 'PageDown' ||
        e.key === 'Home' ||
        e.key === 'End' ||
        e.key === ' '
      ) {
        userDetachedRef.current = true;
      }
    };

    const handleScroll = () => {
      if (
        lastProgrammaticTopRef.current !== null &&
        Math.abs(container.scrollTop - lastProgrammaticTopRef.current) > 12
      ) {
        userDetachedRef.current = true;
      }
      syncJumpButton(container);
    };

    container.addEventListener('wheel', markUserDetached, { passive: true });
    container.addEventListener('touchstart', markUserDetached, { passive: true });
    container.addEventListener('pointerdown', markUserDetached, { passive: true });
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('scroll', handleScroll, { passive: true });

    syncJumpButton(container);

    return () => {
      container.removeEventListener('wheel', markUserDetached);
      container.removeEventListener('touchstart', markUserDetached);
      container.removeEventListener('pointerdown', markUserDetached);
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerRef, syncJumpButton]);

  React.useEffect(() => {
    if (didInitialScrollRef.current) return;
    didInitialScrollRef.current = true;

    const container = resolveScrollContainer(feedRef.current, scrollContainerRef);
    if (!container) return;

    if (messages.length > 0 && !isStreaming && !isLoading) {
      container.scrollTop = container.scrollHeight;
      lastProgrammaticTopRef.current = container.scrollTop;
      syncJumpButton(container);
    }
    // Run once on initial mount for pre-existing conversation history
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (activeEmergency && activeEmergency !== prevEmergencyRef.current) {
      const container = resolveScrollContainer(feedRef.current, scrollContainerRef);
      if (container) {
        lastProgrammaticTopRef.current = 0;
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    prevEmergencyRef.current = activeEmergency;
  }, [activeEmergency, scrollContainerRef]);

  React.useEffect(() => {
    const container = resolveScrollContainer(feedRef.current, scrollContainerRef);
    const userMessageCount = messages.filter((m) => m.role === 'USER').length;
    const isNewUserTurn = userMessageCount > prevUserCountRef.current;
    prevUserCountRef.current = userMessageCount;

    if (!container) return;

    const latestUserMessageTop = getOffsetWithinContainer(
      latestUserMessageRef.current,
      container
    );
    const activeResponseTop = getOffsetWithinContainer(
      activeResponseRef.current,
      container
    );

    if (isNewUserTurn) {
      userDetachedRef.current = false;
      const target = computeStreamingScrollTop({
        scrollHeight: container.scrollHeight,
        clientHeight: container.clientHeight,
        currentScrollTop: 0,
        latestUserMessageTop,
        activeResponseTop,
      });
      lastProgrammaticTopRef.current = target;
      container.scrollTop = target;
      syncJumpButton(container);
      return;
    }

    if ((isStreaming || isLoading) && !userDetachedRef.current) {
      const target = computeStreamingScrollTop({
        scrollHeight: container.scrollHeight,
        clientHeight: container.clientHeight,
        currentScrollTop: container.scrollTop,
        latestUserMessageTop,
        activeResponseTop,
      });
      if (target > container.scrollTop + 1) {
        lastProgrammaticTopRef.current = target;
        container.scrollTop = target;
      }
    }

    syncJumpButton(container);
  }, [messages, activeStreamingText, isStreaming, isLoading, scrollContainerRef, syncJumpButton]);

  const handleJumpToBottom = React.useCallback(() => {
    const container = resolveScrollContainer(feedRef.current, scrollContainerRef);
    if (!container) return;
    userDetachedRef.current = true;
    const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
    lastProgrammaticTopRef.current = maxScroll;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [scrollContainerRef]);

  const isDrawer = variant === 'drawer';

  let latestUserIndex = -1;
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i]?.role === 'USER') {
      latestUserIndex = i;
      break;
    }
  }

  return (
    <div
      ref={feedRef}
      className={cn(
        'flex flex-col',
        isDrawer ? 'space-y-4' : 'space-y-6',
        className
      )}
    >
      {activeEmergency && (
        <EmergencyDirectiveBanner emergency={activeEmergency} compact={isDrawer} />
      )}

      {messages.map((message, index) => (
        <MessageItem
          key={message.id}
          message={message}
          variant={variant}
          onNavigateAway={onNavigateAway}
          containerRef={index === latestUserIndex ? latestUserMessageRef : undefined}
        />
      ))}

      {isStreaming && activeStreamingText && (
        <StreamingMessageItem
          content={activeStreamingText}
          matchedFaqIds={activeMatchedFaqs}
          variant={variant}
          onNavigateAway={onNavigateAway}
          containerRef={activeResponseRef}
        />
      )}

      {isLoading && !activeStreamingText && (
        <div
          ref={activeResponseRef}
          className="almanac-rise-in flex flex-col items-start gap-1.5"
        >
          <div className="flex items-center gap-2 text-[12px] font-medium text-[#143D2B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#143D2B]" aria-hidden="true" />
            <span>Parent Advisor</span>
          </div>
          <div
            className={cn(
              'inline-flex items-center gap-2.5 rounded-[12px] rounded-tl-[3px] border border-[rgba(19,23,21,0.08)] bg-[#F6F5F0] text-[#454D49]',
              isDrawer ? 'px-3.5 py-2.5 text-[13.5px]' : 'px-4 py-3 text-[14px]'
            )}
          >
            <span className="inline-flex items-center gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-[#143D2B]/40 animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#143D2B]/65 animate-pulse [animation-delay:180ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#143D2B] animate-pulse [animation-delay:360ms]" />
            </span>
            <span>
              {childName
                ? `Preparing calm words for ${childName}...`
                : 'Preparing calm guidance...'}
            </span>
          </div>
        </div>
      )}

      {showJumpToBottom && (
        <div className="sticky bottom-3 z-10 flex h-0 items-end justify-center pointer-events-none">
          <button
            type="button"
            onClick={handleJumpToBottom}
            aria-label="Scroll to latest message"
            className="pointer-events-auto inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-[rgba(19,23,21,0.14)] bg-white/95 px-3.5 py-1.5 text-[12.5px] font-medium text-[#143D2B] shadow-[0_4px_14px_rgba(19,23,21,0.12)] backdrop-blur-sm transition-colors hover:bg-[#E8F1EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
          >
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isStreaming ? 'Follow response' : 'Jump to bottom'}</span>
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * High-contrast clinical medical safety card when an emergency red flag triggers.
 */
export function EmergencyDirectiveBanner({
  emergency,
  compact = false,
}: {
  emergency: SseEmergencyEvent;
  compact?: boolean;
}) {
  return (
    <div
      role="alert"
      className={cn(
        'almanac-rise-in rounded-[12px] border border-[#DC2626]/30 bg-[#FEF2F2] text-[#7F1D1D]',
        compact ? 'p-3.5 space-y-2' : 'p-5 space-y-3'
      )}
    >
      <div className="flex items-center gap-2 font-semibold text-[#991B1B] text-[13.5px]">
        <AlertTriangle className="h-4 w-4 text-[#DC2626] shrink-0" aria-hidden="true" />
        <span>{emergency.headline || 'Immediate medical evaluation required'}</span>
      </div>
      <p className={cn('leading-[1.55] text-[#7F1D1D]', compact ? 'text-[13px]' : 'text-[14px]')}>
        {emergency.directive}
      </p>
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <a
          href={`tel:${emergency.phoneDial || '911'}`}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[8px] bg-[#DC2626] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#B91C1C]"
        >
          <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Call {emergency.phoneDial || '911'}</span>
        </a>
        <a
          href="tel:18002221222"
          className="inline-flex min-h-[44px] items-center rounded-[8px] border border-[#DC2626]/30 bg-white px-3.5 text-[13px] font-medium text-[#991B1B] transition-colors hover:bg-[#FEE2E2]"
        >
          Poison Control (1-800-222-1222)
        </a>
      </div>
    </div>
  );
}

function MessageItem({
  message,
  variant,
  onNavigateAway,
  containerRef,
}: {
  message: AiMessageDTO;
  variant: 'studio' | 'drawer';
  onNavigateAway?: () => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const isParent = message.role === 'USER';
  const isDrawer = variant === 'drawer';
  const isEmergency =
    !isParent &&
    (message.content.includes('EMERGENCY MEDICAL DIRECTIVE') ||
      message.content.includes('🚨'));

  if (isEmergency) {
    return (
      <div
        ref={containerRef}
        role="alert"
        className={cn(
          'almanac-rise-in rounded-[12px] border border-[#DC2626]/30 bg-[#FEF2F2] text-[#7F1D1D]',
          isDrawer ? 'p-4 space-y-2.5' : 'p-5 space-y-3'
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#991B1B]">
            <AlertTriangle className="h-4 w-4 text-[#DC2626] shrink-0" aria-hidden="true" />
            <span>Emergency safety guidance</span>
          </span>
          <span className="text-[11.5px] text-[#991B1B]/75 tabular-nums">
            {formatMessageTime(message.createdAt)}
          </span>
        </div>
        <div className="text-[14px] leading-[1.6] text-[#131715] whitespace-pre-wrap">
          {message.content.replace(/🚨\s*/g, '')}
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#DC2626]/15">
          <a
            href="tel:911"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] bg-[#DC2626] px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#B91C1C]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            <span>Call 911 immediately</span>
          </a>
          <span className="text-[12.5px] text-[#7F1D1D]">
            Immediate in-person pediatric evaluation required.
          </span>
        </div>
      </div>
    );
  }

  if (isParent) {
    return (
      <div ref={containerRef} className="almanac-rise-in flex flex-col items-end gap-1">
        <div
          className={cn(
            'rounded-[12px] rounded-br-[3px] bg-[#143D2B] text-[#FAF9F5]',
            isDrawer
              ? 'max-w-[88%] px-3.5 py-2.5 text-[14px] leading-[1.52]'
              : 'max-w-[82%] sm:max-w-[72%] px-4 py-3 text-[14.5px] leading-[1.55]'
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="px-1 text-[11px] text-[#7A827E] tabular-nums">
          {formatMessageTime(message.createdAt)}
        </span>
      </div>
    );
  }

  const matchedFaqs = message.matchedFaqIds ?? [];

  return (
    <div ref={containerRef} className="almanac-rise-in flex flex-col items-start gap-1.5">
      <div className="flex items-center gap-2 px-0.5 text-[12px]">
        <span className="font-medium text-[#143D2B]">Parent Advisor</span>
        <span className="text-[#131715]/20" aria-hidden="true">
          ·
        </span>
        <span className="text-[#7A827E] tabular-nums">
          {formatMessageTime(message.createdAt)}
        </span>
      </div>

      <div
        className={cn(
          'w-full rounded-[12px] rounded-tl-[3px] border border-[rgba(19,23,21,0.08)] bg-[#F6F5F0] text-[#303633]',
          isDrawer ? 'px-3.5 py-3.5' : 'px-5 py-4'
        )}
      >
        <MessageBody content={message.content} variant={variant} />

        {matchedFaqs.length > 0 && (
          <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-[rgba(19,23,21,0.08)] pt-3">
            <span className="text-[12px] text-[#69726D]">Related guide</span>
            {matchedFaqs.slice(0, isDrawer ? 1 : 3).map((faqId) => (
              <Link
                key={faqId}
                href={`/advisor/faqs?q=${encodeURIComponent(cleanFaqId(faqId))}`}
                onClick={onNavigateAway}
                className="inline-flex min-h-[32px] items-center gap-1 rounded-[6px] bg-white border border-[rgba(19,23,21,0.1)] px-2.5 text-[12px] font-medium text-[#143D2B] transition-colors hover:border-[#143D2B]/40 hover:bg-[#E8F1EC]"
              >
                <span>{cleanFaqId(faqId)}</span>
                <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StreamingMessageItem({
  content,
  matchedFaqIds = [],
  variant,
  onNavigateAway,
  containerRef,
}: {
  content: string;
  matchedFaqIds?: string[];
  variant: 'studio' | 'drawer';
  onNavigateAway?: () => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const isDrawer = variant === 'drawer';

  return (
    <div ref={containerRef} className="almanac-rise-in flex flex-col items-start gap-1.5">
      <div className="flex items-center gap-2 px-0.5 text-[12px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#143D2B]" aria-hidden="true" />
        <span className="font-medium text-[#143D2B]">Parent Advisor</span>
        <span className="text-[#7A827E]">Writing...</span>
      </div>

      <div
        className={cn(
          'w-full rounded-[12px] rounded-tl-[3px] border border-[#143D2B]/20 bg-[#F6F5F0] text-[#303633]',
          isDrawer ? 'px-3.5 py-3.5' : 'px-5 py-4'
        )}
      >
        <MessageBody content={content} variant={variant} isStreaming />

        {matchedFaqIds.length > 0 && (
          <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-[rgba(19,23,21,0.08)] pt-3">
            <span className="text-[12px] text-[#69726D]">Matched guide</span>
            {matchedFaqIds.slice(0, isDrawer ? 1 : 3).map((faqId) => (
              <Link
                key={faqId}
                href={`/advisor/faqs?q=${encodeURIComponent(cleanFaqId(faqId))}`}
                onClick={onNavigateAway}
                className="inline-flex min-h-[32px] items-center gap-1 rounded-[6px] bg-white border border-[rgba(19,23,21,0.1)] px-2.5 text-[12px] font-medium text-[#143D2B]"
              >
                <span>{cleanFaqId(faqId)}</span>
                <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MessageBody({
  content,
  variant,
  isStreaming = false,
}: {
  content: string;
  variant: 'studio' | 'drawer';
  isStreaming?: boolean;
}) {
  const parts = splitScriptsAndText(content);
  const isDrawer = variant === 'drawer';

  return (
    <div className="space-y-3">
      {parts.map((part, index) => {
        if (part.type === 'script') {
          return (
            <DeEscalationScriptCallout
              key={`script-${index}`}
              script={part.content}
              compact={isDrawer}
            />
          );
        }
        return (
          <MarkdownMessage
            key={`text-${index}`}
            content={part.content}
            className={cn(
              'text-[#303633]',
              isDrawer ? 'text-[14px] leading-[1.58]' : 'text-[14.5px] leading-[1.62]'
            )}
          />
        );
      })}
      {isStreaming && (
        <span
          className="inline-block h-[14px] w-[2px] bg-[#143D2B] align-middle"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * Editorial word-for-word script slip anchored by a spruce vertical rule.
 */
export function DeEscalationScriptCallout({
  script,
  compact = false,
}: {
  script: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  const cleanScript = script.replace(/^>\s*/gm, '').trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Safe fallback when clipboard API is unavailable
    }
  };

  return (
    <div
      className={cn(
        'my-2 rounded-r-[10px] rounded-l-[2px] border border-[rgba(19,23,21,0.08)] border-l-[3px] border-l-[#143D2B] bg-white',
        compact ? 'p-3.5' : 'p-4 sm:p-5'
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[12px] font-semibold text-[#143D2B]">
          What to say
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            'inline-flex min-h-[44px] sm:min-h-[32px] items-center gap-1.5 rounded-[6px] border px-3 sm:px-2.5 text-[12px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]',
            copied
              ? 'border-[#143D2B] bg-[#143D2B] text-white'
              : 'border-[rgba(19,23,21,0.12)] bg-[#FAF9F5] text-[#454D49] hover:border-[#143D2B]/40 hover:bg-[#E8F1EC] hover:text-[#143D2B]'
          )}
          aria-label={copied ? 'Copied script' : 'Copy word-for-word script'}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <p
        className={cn(
          'font-serif text-[#131715] leading-[1.48]',
          compact ? 'text-[15.5px]' : 'text-[16.5px] sm:text-[17px]'
        )}
      >
        {cleanScript}
      </p>
    </div>
  );
}

interface ContentPart {
  type: 'text' | 'script';
  content: string;
}

function splitScriptsAndText(content: string): ContentPart[] {
  const lines = content.split('\n');
  const parts: ContentPart[] = [];
  let currentText = '';
  let currentScript = '';
  let inScript = false;

  for (const line of lines) {
    if (line.trim().startsWith('>')) {
      if (!inScript) {
        if (currentText.trim()) {
          parts.push({ type: 'text', content: currentText });
          currentText = '';
        }
        inScript = true;
      }
      currentScript += (currentScript ? '\n' : '') + line;
    } else {
      if (inScript) {
        if (currentScript.trim()) {
          parts.push({ type: 'script', content: currentScript });
          currentScript = '';
        }
        inScript = false;
      }
      currentText += (currentText ? '\n' : '') + line;
    }
  }

  if (inScript && currentScript.trim()) {
    parts.push({ type: 'script', content: currentScript });
  } else if (currentText.trim()) {
    parts.push({ type: 'text', content: currentText });
  }

  return parts.length > 0 ? parts : [{ type: 'text', content }];
}

function cleanFaqId(id: string): string {
  return id
    .replace(/^faq-/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function formatMessageTime(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}
