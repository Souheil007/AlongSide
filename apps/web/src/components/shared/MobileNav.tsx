'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  Compass,
  BookOpen,
  Sparkles,
  Shield,
  MoreHorizontal,
  Settings,
  CreditCard,
  HelpCircle,
  X,
  ChevronRight,
  LogOut,
  Loader2,
  User as UserIcon,
  Bot,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ChildSelector } from '@/components/shared/ChildSelector';
import { useChildContextStore, ACTIVE_CHILD_STORAGE_KEY } from '@/stores/useChildContextStore';
import { cn } from '@/lib/utils';

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const PRIMARY_MOBILE_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Home', icon: Compass },
  { href: '/academy', label: 'Academy', icon: BookOpen, badge: 'Courses' },
  { href: '/digest', label: 'Digest', icon: Sparkles, badge: 'Weekly' },
  { href: '/devices', label: 'Devices', icon: Shield, badge: 'Pacts' },
];

export const MORE_MOBILE_ITEMS: NavItem[] = [
  { href: '/settings', label: 'Account & Family Settings', icon: Settings, badge: 'Profile' },
  { href: '/#pricing', label: 'Billing & Hero Pass', icon: CreditCard, badge: 'Hero' },
  { href: '/advisor', label: 'Help & Advisory Guidance', icon: HelpCircle, badge: 'Support' },
];

export interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();
  const [moreDrawerOpen, setMoreDrawerOpen] = React.useState(false);

  const isMoreActive =
    MORE_MOBILE_ITEMS.some((item) => pathname.startsWith(item.href)) ||
    pathname.startsWith('/advisor') ||
    pathname.startsWith('/settings');

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Safe fallback: force client store and query eviction even if API call fails
      queryClient.clear();
      useChildContextStore.getState().reset();
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.removeItem(ACTIVE_CHILD_STORAGE_KEY);
          window.sessionStorage.clear();
        } catch {
          // Safe fallback
        }
      }
    } finally {
      window.location.href = '/login?logged_out=true';
    }
  };

  return (
    <>
      {/* Fixed Bottom Mobile Navigation Bar with WCAG 2.1 AA >= 48px touch targets */}
      <nav
        aria-label="Mobile Navigation"
        className={cn(
          'md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#E3E3DC] bg-[#FBFBF9]/95 backdrop-blur-md px-2 py-1 shadow-lg no-print',
          className
        )}
      >
        <div className="flex items-center justify-around">
          {PRIMARY_MOBILE_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMoreDrawerOpen(false)}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-1 rounded-[5px] text-[10px] font-semibold transition-colors',
                  isActive
                    ? 'text-[#143D2B] bg-[#EAF3EE] font-bold'
                    : 'text-[#858C88] hover:text-[#111413] hover:bg-[#F4F4F0]'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      'h-5 w-5',
                      isActive ? 'text-[#143D2B]' : 'text-[#858C88]'
                    )}
                  />
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-2 h-2 w-2 rounded-full bg-[#143D2B]" />
                  )}
                </div>
                <span className="mt-0.5 tracking-tight font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* 5th Action: More Trigger Button (Touch target >= 48px) */}
          <button
            type="button"
            onClick={() => setMoreDrawerOpen(!moreDrawerOpen)}
            className={cn(
              'flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-1 rounded-[5px] text-[10px] font-semibold transition-colors',
              isMoreActive || moreDrawerOpen
                ? 'text-[#143D2B] bg-[#EAF3EE] font-bold'
                : 'text-[#858C88] hover:text-[#111413] hover:bg-[#F4F4F0]'
            )}
            aria-expanded={moreDrawerOpen}
            aria-label="More domain hubs and account settings"
          >
            <MoreHorizontal
              className={cn(
                'h-5 w-5',
                isMoreActive || moreDrawerOpen ? 'text-[#143D2B]' : 'text-[#858C88]'
              )}
            />
            <span className="mt-0.5 tracking-tight font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Expanded "More" Drawer for Mobile */}
      {moreDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-xs animate-in fade-in-0 duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setMoreDrawerOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 rounded-t-[16px] border-t border-[#E3E3DC] bg-white p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#E3E3DC] pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-[#143D2B] text-white shadow-2xs">
                  <Shield className="h-4 w-4" />
                </div>
                <h3 className="font-serif font-bold text-[#111413] text-sm">
                  AlongSide Hubs
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-[#F4F4F0] text-[#858C88] hover:bg-[#E3E3DC] focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Child Profile Switcher */}
            {isAuthenticated && (
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Active Child Profile:
                </span>
                <ChildSelector variant="compact" />
              </div>
            )}

            {/* AI Advisor Shortcut */}
            <div>
              <Link
                href="/advisor"
                onClick={() => setMoreDrawerOpen(false)}
                className={cn(
                  'flex min-h-[48px] items-center justify-between p-3 rounded-2xl border transition-all text-xs font-semibold',
                  pathname.startsWith('/advisor')
                    ? 'bg-teal-50/90 border-teal-300 text-teal-900'
                    : 'border-teal-200/60 bg-teal-50/40 hover:bg-teal-50 hover:border-teal-300 text-teal-950'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-2xs shrink-0">
                    <Bot className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      24/7 AI Child Advisor
                    </span>
                    <span className="text-[10px] text-teal-700 font-medium">
                      AI Advisor &amp; Voice Sparring
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-teal-600 shrink-0" />
              </Link>
            </div>

            {/* Secondary Resources & Settings Drawer Tray */}
            <div className="space-y-2">
              <div className="px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Secondary Resources &amp; Settings
              </div>
              {MORE_MOBILE_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = item.href.startsWith('/#') ? false : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreDrawerOpen(false)}
                    className={cn(
                      'flex min-h-[48px] items-center justify-between p-3 rounded-2xl border transition-all text-xs font-semibold',
                      isActive
                        ? 'bg-teal-50/90 border-teal-300 text-teal-900'
                        : 'border-slate-100 bg-slate-50/60 hover:bg-teal-50/50 hover:border-teal-200 text-slate-800'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-xl shadow-2xs shrink-0',
                          isActive ? 'bg-teal-600 text-white' : 'bg-white text-teal-700'
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] text-teal-700 font-medium">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                  </Link>
                );
              })}
            </div>

            {/* User Account & Hardened Logout Action */}
            {isAuthenticated && user && (
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="px-1 text-xs font-medium text-slate-700 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white shadow-2xs shrink-0">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-slate-900 text-xs truncate">
                      {user.fullName}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMoreDrawerOpen(false);
                    handleLogout();
                  }}
                  disabled={isLoggingOut}
                  className="w-full flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/70 px-4 py-2.5 text-xs font-semibold text-rose-800 hover:bg-rose-100 transition-colors disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin text-rose-600" />
                  ) : (
                    <LogOut className="h-4 w-4 text-rose-600" />
                  )}
                  <span>{isLoggingOut ? 'Logging out...' : 'Log out of AlongSide'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
