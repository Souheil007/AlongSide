import * as React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AdvisoryDomainBannerProps {
  category: string;
  categoryLabel: string;
  title?: string;
  description: string;
  actionText: string;
  href: string;
  className?: string;
}

export function AdvisoryDomainBanner({
  categoryLabel,
  title = 'This domain has been elevated into the Parent Intelligence Academy',
  description,
  actionText,
  href,
  className,
}: AdvisoryDomainBannerProps) {
  return (
    <aside
      aria-label="Parent Intelligence Academy Advisory Elevation Banner"
      className={cn(
        'relative overflow-hidden rounded-2xl border border-teal-200/90 bg-gradient-to-r from-teal-50/90 via-emerald-50/60 to-white p-4 sm:p-5 shadow-xs transition-all',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-2xs mt-0.5">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-teal-100/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800 border border-teal-200">
                <Sparkles className="h-3 w-3 text-teal-600" />
                Academy Advisory Sanctuary
              </span>
              <span className="text-xs font-semibold text-teal-700">
                {categoryLabel}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>

        <div className="shrink-0 pt-1 sm:pt-0">
          <Link
            href={href}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <span>{actionText}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
