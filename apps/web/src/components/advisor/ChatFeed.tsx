'use client';

import * as React from 'react';
import {
  Shield,
  User,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  Loader2,
  AlertTriangle,
  PhoneCall,
} from 'lucide-react';
import type { AiMessageDTO } from '@alongside/shared';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ChatFeedProps {
  messages: AiMessageDTO[];
  activeStreamingText?: string;
  activeMatchedFaqs?: string[];
  isStreaming?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function ChatFeed({
  messages,
  activeStreamingText = '',
  activeMatchedFaqs = [],
  isStreaming = false,
  isLoading = false,
  className,
}: ChatFeedProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const feedContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom as tokens stream in
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeStreamingText, isLoading]);

  const hasMessages = messages.length > 0 || isStreaming || isLoading;

  if (!hasMessages) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 shadow-sm mb-4">
          <Shield className="h-8 w-8 text-teal-600" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-slate-900">
          24/7 AI Child Advisor
        </h3>
        <p className="mt-2 max-w-md text-sm text-slate-600 leading-relaxed">
          Ground your parenting in developmental neurobiology. Ask about an active argument,
          a boundary battle, or what word-for-word words to say during an emotional crash.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            <Sparkles className="h-3 w-3 text-teal-600" /> Zero Judgment
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            <BookOpen className="h-3 w-3 text-teal-600" /> Pediatric Science
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            <Copy className="h-3 w-3 text-teal-600" /> Word-for-Word Scripts
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={feedContainerRef}
      className={cn('flex flex-col space-y-6 overflow-y-auto px-1 py-4', className)}
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Active Streaming Token Bubble */}
      {isStreaming && activeStreamingText && (
        <StreamingBubble
          content={activeStreamingText}
          matchedFaqIds={activeMatchedFaqs}
        />
      )}

      {/* Loading state before first token */}
      {isLoading && !activeStreamingText && (
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
            <span className="font-medium text-slate-600">
              Consulting pediatric neurobiology vault...
            </span>
          </div>
        </div>
      )}

      <div ref={bottomRef} className="h-2" />
    </div>
  );
}

/**
 * Message Bubble for standard parent and assistant messages
 */
function MessageBubble({ message }: { message: AiMessageDTO }) {
  const isParent = message.role === 'USER';
  const isEmergency =
    !isParent &&
    (message.content.includes('EMERGENCY MEDICAL DIRECTIVE') ||
      message.content.includes('🚨'));

  if (isEmergency) {
    return (
      <div className="flex items-start gap-3 justify-start w-full my-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-sm border-2 border-rose-300 bg-rose-50/95 p-5 shadow-md text-slate-900">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-sm">
              <AlertTriangle className="h-3.5 w-3.5" />
              Emergency Safety Guidance Override
            </span>
            <span className="text-[10px] text-rose-800 font-semibold">
              {formatMessageTime(message.createdAt)}
            </span>
          </div>
          <div className="mt-3 text-sm text-slate-900 leading-relaxed whitespace-pre-wrap font-medium">
            {message.content}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-rose-200">
            <a
              href="tel:911"
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-rose-700 transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
              Call 911 Immediately
            </a>
            <span className="text-xs text-rose-900 font-medium">
              Immediate in-person pediatric evaluation required. Do not administer oral medications.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isParent ? 'flex-row-reverse justify-start' : 'justify-start'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm',
          isParent
            ? 'bg-slate-800 text-slate-100'
            : 'bg-teal-600 text-white'
        )}
      >
        {isParent ? (
          <User className="h-4 w-4" />
        ) : (
          <Shield className="h-4 w-4 text-emerald-100" />
        )}
      </div>

      {/* Content Bubble */}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm sm:max-w-[78%]',
          isParent
            ? 'rounded-tr-sm bg-slate-900 text-slate-100'
            : 'rounded-tl-sm border border-slate-200/80 bg-white text-slate-800'
        )}
      >
        <div className="flex items-center justify-between gap-4 mb-1">
          <span
            className={cn(
              'text-[11px] font-semibold uppercase tracking-wider',
              isParent ? 'text-slate-400' : 'text-teal-700'
            )}
          >
            {isParent ? 'Parent' : 'AlongSide AI Advisor'}
          </span>
          <span className="text-[10px] text-slate-400">
            {formatMessageTime(message.createdAt)}
          </span>
        </div>

        {/* Message Body with Script Detection */}
        <MessageContent content={message.content} isParent={isParent} />

        {/* Matched FAQ Pills */}
        {message.matchedFaqIds && message.matchedFaqIds.length > 0 && (
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
            <span className="text-[11px] font-medium text-slate-500">
              Referenced Neurobiology FAQ:
            </span>
            {message.matchedFaqIds.map((faqId) => (
              <Link
                key={faqId}
                href={`/advisor/faqs?q=${encodeURIComponent(cleanFaqId(faqId))}`}
                className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-800 hover:bg-teal-100 transition-colors"
              >
                <BookOpen className="h-3 w-3 text-teal-600" />
                <span>{cleanFaqId(faqId)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Streaming Bubble for live SSE chunks
 */
function StreamingBubble({
  content,
  matchedFaqIds = [],
}: {
  content: string;
  matchedFaqIds?: string[];
}) {
  return (
    <div className="flex items-start gap-3 justify-start animate-in fade-in duration-200">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
        <Shield className="h-4 w-4 text-emerald-100" />
      </div>

      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-teal-200/80 bg-white px-5 py-3.5 text-slate-800 shadow-sm sm:max-w-[78%] ring-1 ring-teal-500/10">
        <div className="flex items-center justify-between gap-4 mb-1">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-teal-700">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            AlongSide AI Advisor (Streaming)
          </span>
        </div>

        <MessageContent content={content} isParent={false} isStreaming />

        {matchedFaqIds.length > 0 && (
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
            <span className="text-[11px] font-medium text-slate-500">
              Matched FAQ Vault:
            </span>
            {matchedFaqIds.map((faqId) => (
              <span
                key={faqId}
                className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-800"
              >
                <BookOpen className="h-3 w-3 text-teal-600" />
                <span>{cleanFaqId(faqId)}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Splits and parses message content, isolating quote/scripts into dedicated copyable callout cards.
 */
function MessageContent({
  content,
  isParent,
  isStreaming = false,
}: {
  content: string;
  isParent: boolean;
  isStreaming?: boolean;
}) {
  if (isParent) {
    return <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>;
  }

  // Parse blockquotes (`> "..."` or `> ...`) as word-for-word scripts
  const parts = splitScriptsAndText(content);

  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {parts.map((part, index) => {
        if (part.type === 'script') {
          return (
            <DeEscalationScriptCallout
              key={`script-${index}`}
              script={part.content}
            />
          );
        }
        return (
          <div
            key={`text-${index}`}
            className="text-slate-700 leading-relaxed space-y-2 whitespace-pre-wrap"
          >
            {renderFormattedText(part.content)}
          </div>
        );
      })}
      {isStreaming && (
        <span className="inline-block h-3.5 w-1.5 bg-teal-600 animate-pulse ml-0.5 align-middle" />
      )}
    </div>
  );
}

/**
 * High-contrast copyable callout card for word-for-word scripts
 */
export function DeEscalationScriptCallout({ script }: { script: string }) {
  const [copied, setCopied] = React.useState(false);

  const cleanScript = script.replace(/^>\s*/gm, '').trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-2.5 rounded-xl border border-teal-200/90 bg-teal-50/60 p-4 transition-all hover:bg-teal-50">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800">
          <Sparkles className="h-3.5 w-3.5 text-teal-600" />
          <span>What to Say (Word-for-Word Script)</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
            copied
              ? 'bg-teal-700 text-white'
              : 'border border-teal-300 bg-white text-teal-800 hover:bg-teal-100/80 active:scale-95'
          )}
          title="Copy dialogue script"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-white" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Script</span>
            </>
          )}
        </button>
      </div>
      <p className="font-serif italic text-sm text-slate-800 leading-relaxed bg-white/70 rounded-lg p-3 border border-teal-100">
        {cleanScript}
      </p>
    </div>
  );
}

/**
 * Helpers for parsing markdown blockquotes
 */
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

function renderFormattedText(text: string) {
  return text.split('\n').map((line, idx) => {
    if (line.startsWith('### ')) {
      return (
        <h4 key={idx} className="font-bold text-slate-900 text-sm mt-2 mb-1">
          {line.replace('### ', '')}
        </h4>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <h3 key={idx} className="font-bold text-slate-900 text-base mt-2 mb-1">
          {line.replace('## ', '')}
        </h3>
      );
    }
    return <span key={idx} className="block">{line}</span>;
  });
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
