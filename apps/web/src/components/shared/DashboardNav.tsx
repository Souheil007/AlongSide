'use client';

/**
 * @deprecated Deprecated in PLAN-21. Primary navigation is now consolidated into the single
 * unified Header application bar (`apps/web/src/components/shared/Header.tsx`).
 * Retained for secondary sub-view domain breadcrumbs and test suite compatibility (`DOMAIN_HUBS`).
 * Do NOT mount directly underneath <Header /> in top-level dashboard layouts.
 */

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  HeartPulse,
  Utensils,
  Puzzle,
  Brain,
  Bot,
  Smartphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DomainHubItem {
  href: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description: string;
}

export const DOMAIN_HUBS: DomainHubItem[] = [
  {
    href: '/dashboard',
    label: 'Today & Milestones',
    shortLabel: 'Today',
    icon: Compass,
    description: "Daily milestone feed, purposeful play & nutrition tips",
  },
  {
    href: '/health',
    label: 'Health Companion',
    shortLabel: 'Health',
    icon: HeartPulse,
    badge: 'Sleep & Calm',
    description: 'Pediatric sleep architecture, bedtime routines & circadian rhythms',
  },
  {
    href: '/nutrition',
    label: 'Nutrition & Food',
    shortLabel: 'Nutrition',
    icon: Utensils,
    description: 'Baby-led weaning, safe allergen exposure & picky eating',
  },
  {
    href: '/brain-games',
    label: 'Brain Games & Play',
    shortLabel: 'Play',
    icon: Puzzle,
    description: 'Age-indexed purposeful play matrix & boredom busters',
  },
  {
    href: '/behavior',
    label: 'Behavior & Emotion',
    shortLabel: 'Behavior',
    icon: Brain,
    badge: 'HALT',
    description: 'Tantrum decoding & word-for-word co-regulation scripts',
  },
  {
    href: '/advisor',
    label: '24/7 AI Advisor',
    shortLabel: 'AI Advisor',
    icon: Bot,
    badge: 'AI Advisor',
    description: 'Multi-child AI advisor, voice sparring & 250+ FAQ vault',
  },
  {
    href: '/devices',
    label: 'Modern World & Devices',
    shortLabel: 'Devices',
    icon: Smartphone,
    badge: 'Pact-as-Code',
    description: 'Bilateral family pacts, curfews & Sunday culture digest',
  },
];

export interface DashboardNavProps {
  className?: string;
}

export function DashboardNav({ className }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Holistic Family OS Hubs"
      className={cn(
        'w-full bg-white/80 backdrop-blur-sm border-b border-slate-200/80 sticky top-16 z-30 shadow-2xs no-print',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar scroll-smooth">
          {DOMAIN_HUBS.map((hub) => {
            const Icon = hub.icon;
            const isActive =
              hub.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(hub.href);

            return (
              <Link
                key={hub.href}
                href={hub.href}
                className={cn(
                  'group flex min-h-[44px] items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 select-none',
                  isActive
                    ? 'bg-teal-700 text-white shadow-sm ring-1 ring-teal-800'
                    : 'text-slate-600 hover:bg-teal-50 hover:text-teal-900 border border-transparent hover:border-teal-200/60'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={cn(
                    'h-4 w-4 transition-transform group-hover:scale-110',
                    isActive ? 'text-emerald-100' : 'text-teal-600'
                  )}
                />
                <span className="font-medium tracking-tight">
                  <span className="hidden md:inline">{hub.label}</span>
                  <span className="md:hidden">{hub.shortLabel}</span>
                </span>

                {hub.badge && (
                  <span
                    className={cn(
                      'hidden lg:inline-flex rounded-full px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider',
                      isActive
                        ? 'bg-emerald-900/60 text-emerald-100 border border-emerald-400/30'
                        : 'bg-teal-50 text-teal-700 border border-teal-200/80 group-hover:bg-teal-100'
                    )}
                  >
                    {hub.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
