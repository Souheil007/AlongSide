'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  Shield,
  Menu,
  X,
  ArrowRight,
  LogOut,
  Loader2,
  ChevronDown,
  Compass,
  HeartPulse,
  Utensils,
  Puzzle,
  Brain,
  Smartphone,
  BookOpen,
  Sparkles,
  Bot,
  CreditCard,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { ChildSelector } from '@/components/shared/ChildSelector';
import { useChildContextStore, ACTIVE_CHILD_STORAGE_KEY } from '@/stores/useChildContextStore';
import { cn } from '@/lib/utils';

export interface NavLinkItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

export const AUTHENTICATED_CORE_LINKS: NavLinkItem[] = [
  { href: '/dashboard', label: 'Today' },
  { href: '/health', label: 'Health' },
  { href: '/nutrition', label: 'Nutrition' },
  { href: '/brain-games', label: 'Play' },
  { href: '/behavior', label: 'Behavior' },
  { href: '/devices', label: 'Devices & Pacts' },
];

export const AUTHENTICATED_SECONDARY_LINKS: NavLinkItem[] = [
  {
    href: '/academy',
    label: 'Parent Intelligence Academy',
    icon: BookOpen,
    description: 'Clinical neurobiology & masterclasses',
  },
  {
    href: '/digest',
    label: 'Sunday Culture Digest',
    icon: Sparkles,
    description: 'Slang decoder & youth culture radar',
  },
];

export const PUBLIC_NAV_LINKS: NavLinkItem[] = [
  { href: '/#features', label: 'Platform Pillars' },
  { href: '/health', label: 'Pediatric Health' },
  { href: '/devices', label: 'Modern Devices & Pacts' },
  { href: '/#pricing', label: 'Pricing' },
];

export function getInitials(name?: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  const first = parts[0]?.charAt(0) ?? 'U';
  if (parts.length === 1) return first.toUpperCase();
  const last = parts[parts.length - 1]?.charAt(0) ?? '';
  return (first + last).toUpperCase();
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = React.useState(false);

  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();

  const userMenuRef = React.useRef<HTMLDivElement>(null);
  const moreMenuRef = React.useRef<HTMLDivElement>(null);

  // Close menus on click outside or Escape key
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setMoreMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
        setMoreMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Hardened session logout: flush React Query, reset Zustand child context, purge storage, and reload to /login
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

  const isLinkActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const isMoreActive = AUTHENTICATED_SECONDARY_LINKS.some((item) =>
    pathname.startsWith(item.href)
  );

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-2 sm:gap-4">
        {/* Left Section: Brand Logo & Global Multi-Child Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            href={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="AlongSide Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Shield className="h-5 w-5 text-emerald-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                AlongSide
              </span>
              <span className="text-[10px] font-medium tracking-wide uppercase text-teal-700 -mt-1 hidden sm:inline-block">
                Parent Calm System
              </span>
            </div>
          </Link>

          {/* Child Selector embedded next to brand logo for authenticated parents */}
          {isAuthenticated && (
            <div className="hidden sm:flex items-center pl-1 sm:pl-2 border-l border-slate-200">
              <ChildSelector variant="header" />
            </div>
          )}
        </div>

        {/* Center Section: Desktop Navigation Links */}
        {isAuthenticated ? (
          <nav
            aria-label="Domain Hub Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-semibold"
          >
            {AUTHENTICATED_CORE_LINKS.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 border-b-2 whitespace-nowrap',
                    isActive
                      ? 'bg-teal-50 text-teal-800 border-teal-600 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50 border-transparent font-medium'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Sleek "More" Dropdown for Secondary Navigation */}
            <div ref={moreMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={cn(
                  'px-2.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-all duration-150 border-b-2 select-none',
                  isMoreActive || moreMenuOpen
                    ? 'bg-teal-50 text-teal-800 border-teal-600 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50 border-transparent font-medium'
                )}
                aria-expanded={moreMenuOpen}
                aria-haspopup="menu"
              >
                <span>More</span>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform duration-150',
                    moreMenuOpen && 'rotate-180'
                  )}
                />
              </button>

              {moreMenuOpen && (
                <div
                  role="menu"
                  className="absolute left-0 mt-2 w-64 origin-top-left rounded-2xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150 z-50"
                >
                  <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Parent Intelligence
                  </div>
                  <div className="space-y-1">
                    {AUTHENTICATED_SECONDARY_LINKS.map((item) => {
                      const Icon = item.icon || Sparkles;
                      const isActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreMenuOpen(false)}
                          role="menuitem"
                          className={cn(
                            'flex items-start gap-2.5 rounded-xl p-2 text-xs transition-colors',
                            isActive
                              ? 'bg-teal-50 text-teal-900 font-semibold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-teal-800'
                          )}
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 mt-0.5">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">
                              {item.label}
                            </span>
                            <span className="text-[10px] text-slate-500 leading-tight">
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <nav
            aria-label="Public Navigation"
            className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600"
          >
            {PUBLIC_NAV_LINKS.map((link) => {
              const isActive =
                link.href.startsWith('/#')
                  ? false
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-teal-700 py-1 border-b-2 border-transparent',
                    isActive
                      ? 'text-teal-700 font-bold border-teal-600'
                      : 'text-slate-600'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Section: Desktop User Account Menu or Public CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isAuthenticated && user ? (
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={cn(
                  'flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-2.5 py-1.5 text-xs font-medium text-slate-800 shadow-2xs transition-all hover:border-teal-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-600/30',
                  userMenuOpen && 'border-teal-500 ring-2 ring-teal-500/20'
                )}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                aria-label="User account menu"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-[11px] font-bold text-white shadow-2xs">
                  {getInitials(user.fullName)}
                </div>
                <div className="hidden xl:flex flex-col text-left max-w-[120px]">
                  <span className="truncate font-semibold text-slate-900 text-xs">
                    {user.fullName}
                  </span>
                  <span className="truncate text-[10px] text-slate-500 font-normal">
                    {user.email}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 text-slate-400 transition-transform duration-200',
                    userMenuOpen && 'rotate-180 text-teal-600'
                  )}
                />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150 z-50"
                >
                  {/* Account Info Header */}
                  <div className="p-2.5 border-b border-slate-100 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white shadow-2xs">
                        {getInitials(user.fullName)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="truncate font-bold text-slate-900 text-xs">
                          {user.fullName}
                        </span>
                        <span className="truncate text-[10px] text-slate-500">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="rounded-md bg-teal-50 px-1.5 py-0.5 text-[10px] font-semibold text-teal-700 border border-teal-200/60">
                        Parent Calm Account
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Quick Navigation Items */}
                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-800 transition-colors"
                    >
                      <Compass className="h-4 w-4 text-teal-600" />
                      <span>Family Dashboard</span>
                    </Link>
                    <Link
                      href="/academy"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-800 transition-colors"
                    >
                      <BookOpen className="h-4 w-4 text-teal-600" />
                      <span>Parent Academy</span>
                    </Link>
                    <Link
                      href="/digest"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-800 transition-colors"
                    >
                      <Sparkles className="h-4 w-4 text-teal-600" />
                      <span>Sunday Culture Digest</span>
                    </Link>
                    <Link
                      href="/advisor"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-800 transition-colors"
                    >
                      <Bot className="h-4 w-4 text-teal-600" />
                      <span>24/7 AI Child Advisor</span>
                    </Link>
                    <Link
                      href="/#pricing"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-800 transition-colors"
                    >
                      <CreditCard className="h-4 w-4 text-teal-600" />
                      <span>Billing &amp; Hero Pass</span>
                    </Link>
                    <Link
                      href="/#settings"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-800 transition-colors"
                    >
                      <Settings className="h-4 w-4 text-teal-600" />
                      <span>Account Settings</span>
                    </Link>
                  </div>

                  {/* Hardened Logout Action */}
                  <div className="pt-1 mt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex min-h-[38px] items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <Loader2 className="h-4 w-4 animate-spin text-rose-600" />
                      ) : (
                        <LogOut className="h-4 w-4 text-rose-600" />
                      )}
                      <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="gap-1.5 shadow-sm">
                  Start 7-Day Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile View Right Controls: Child Selector + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && (
            <div className="sm:hidden flex items-center">
              <ChildSelector variant="compact" />
            </div>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          {isAuthenticated && (
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Active Child Profile:
              </span>
              <ChildSelector variant="compact" />
            </div>
          )}

          <nav className="flex flex-col space-y-1">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Domain Hubs
                </div>
                {AUTHENTICATED_CORE_LINKS.map((link) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                        isActive
                          ? 'bg-teal-50 text-teal-800'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-teal-800'
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Parent Intelligence
                </div>
                {AUTHENTICATED_SECONDARY_LINKS.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                        isActive
                          ? 'bg-teal-50 text-teal-800'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-teal-800'
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </>
            ) : (
              PUBLIC_NAV_LINKS.map((link) => {
                const isActive =
                  link.href.startsWith('/#')
                    ? false
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-teal-50 text-teal-800'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-teal-800'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })
            )}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 flex items-center justify-between"
                >
                  <span>Go to Family Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="px-3 text-xs font-medium text-slate-700 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-600 text-[10px] font-bold text-white">
                    {getInitials(user.fullName)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-slate-900 truncate">
                      {user.fullName}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  disabled={isLoggingOut}
                  className="w-full justify-center gap-2 text-xs text-rose-700 hover:bg-rose-50 hover:text-rose-800 min-h-[44px]"
                >
                  {isLoggingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin text-rose-600" />
                  ) : (
                    <LogOut className="h-4 w-4 text-rose-600" />
                  )}
                  <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center min-h-[44px]">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-center gap-1.5 min-h-[44px]">
                    Start 7-Day Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
