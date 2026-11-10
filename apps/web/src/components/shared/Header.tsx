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
  BookOpen,
  Sparkles,
  CreditCard,
  Settings,
  HelpCircle,
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
  { href: '/dashboard', label: 'Home' },
  { href: '/academy', label: 'Parent Academy', icon: BookOpen },
  { href: '/digest', label: 'Culture Digest', icon: Sparkles },
  { href: '/devices', label: 'Family Pacts & Devices', icon: Shield },
];

/**
 * @deprecated Redundant secondary links removed in AlongSide v2.5.0; Academy and Digest are now core navigation links.
 */
export const AUTHENTICATED_SECONDARY_LINKS: NavLinkItem[] = [];

export const PUBLIC_NAV_LINKS: NavLinkItem[] = [
  { href: '/#pillars', label: 'Core Pillars' },
  { href: '/#stages', label: 'Lifespan Stages' },
  { href: '/#devices-hub', label: 'Family Pacts & Devices' },
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

  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();

  const userMenuRef = React.useRef<HTMLDivElement>(null);

  // Close menus on click outside or Escape key
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
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

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-[#E3E3DC] bg-[#FBFBF9]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-2 sm:gap-4">
        {/* Left Section: Brand Logo & Global Multi-Child Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            href={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="AlongSide Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#143D2B] text-white shadow-sm transition-transform group-hover:scale-105">
              <Shield className="h-4.5 w-4.5 text-emerald-100" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#111413] leading-tight">
                AlongSide <em className="italic font-normal text-[#143D2B]">Almanac</em>
              </span>
              <span className="font-mono text-[9px] font-semibold tracking-wider uppercase text-[#143D2B] -mt-0.5 hidden sm:inline-block">
                Pediatric Sanctuary • Lifespan 0–18
              </span>
            </div>
          </Link>

          {/* Child Selector embedded next to brand logo for authenticated parents */}
          {isAuthenticated && (
            <div className="hidden sm:flex items-center pl-1 sm:pl-2 border-l border-[#E3E3DC]">
              <ChildSelector variant="header" />
            </div>
          )}
        </div>

        {/* Center Section: Desktop Navigation Links */}
        {isAuthenticated ? (
          <nav
            aria-label="Domain Hub Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold"
          >
            {AUTHENTICATED_CORE_LINKS.map((link) => {
              const isActive = isLinkActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-all duration-150 border-b-2 whitespace-nowrap',
                    isActive
                      ? 'bg-[#EAF3EE] text-[#143D2B] border-[#143D2B] font-bold shadow-2xs'
                      : 'text-[#494F4C] hover:text-[#111413] hover:bg-[#F4F4F0] border-transparent font-medium'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        'h-3.5 w-3.5 shrink-0',
                        isActive ? 'text-[#143D2B]' : 'text-[#858C88]'
                      )}
                    />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        ) : (
          <nav
            aria-label="Public Navigation"
            className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#494F4C]"
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
                    'transition-colors hover:text-[#111413] py-1 border-b-2 border-transparent font-medium',
                    isActive
                      ? 'text-[#143D2B] font-bold border-[#143D2B]'
                      : 'text-[#494F4C]'
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
                  'flex min-h-[40px] items-center gap-2 rounded-[5px] border border-[#E3E3DC] bg-white px-2.5 py-1.5 text-xs font-medium text-[#111413] shadow-2xs transition-all hover:border-[#111413] hover:bg-[#F4F4F0] focus:outline-none focus:ring-2 focus:ring-[#143D2B]/30',
                  userMenuOpen && 'border-[#143D2B] ring-2 ring-[#143D2B]/20'
                )}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                aria-label="User account menu"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#143D2B] text-[11px] font-bold text-white shadow-2xs">
                  {getInitials(user.fullName)}
                </div>
                <div className="hidden xl:flex flex-col text-left max-w-[120px]">
                  <span className="truncate font-semibold text-[#111413] text-xs">
                    {user.fullName}
                  </span>
                  <span className="truncate text-[10px] text-[#858C88] font-normal font-mono">
                    {user.email}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 text-[#858C88] transition-transform duration-200',
                    userMenuOpen && 'rotate-180 text-[#143D2B]'
                  )}
                />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-64 origin-top-right rounded-[10px] border border-[#E3E3DC] bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150 z-50"
                >
                  {/* Account Info Header */}
                  <div className="p-2.5 border-b border-[#E3E3DC] flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#143D2B] text-xs font-bold text-white shadow-2xs">
                        {getInitials(user.fullName)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="truncate font-bold text-[#111413] text-xs">
                          {user.fullName}
                        </span>
                        <span className="truncate text-[10px] text-[#858C88] font-mono">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="rounded-full bg-[#EAF3EE] px-2 py-0.5 text-[10px] font-semibold text-[#143D2B] border border-[#143D2B]/20 font-mono uppercase tracking-wider">
                        VOL. XXIV // ADVISORY
                      </span>
                      <span className="text-[10px] text-[#858C88] font-medium font-mono">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Account Navigation Items */}
                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-[5px] px-2.5 py-2 text-xs font-medium text-[#494F4C] hover:bg-[#F4F4F0] hover:text-[#111413] transition-colors"
                    >
                      <Settings className="h-4 w-4 text-[#143D2B]" />
                      <span>Account Settings</span>
                    </Link>
                    <Link
                      href="/#pricing"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-[5px] px-2.5 py-2 text-xs font-medium text-[#494F4C] hover:bg-[#F4F4F0] hover:text-[#111413] transition-colors"
                    >
                      <CreditCard className="h-4 w-4 text-[#143D2B]" />
                      <span>Billing &amp; Hero Pass</span>
                    </Link>
                    <Link
                      href="/advisor"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-[5px] px-2.5 py-2 text-xs font-medium text-[#494F4C] hover:bg-[#F4F4F0] hover:text-[#111413] transition-colors"
                    >
                      <HelpCircle className="h-4 w-4 text-[#143D2B]" />
                      <span>Advisory Guidance &amp; FAQ</span>
                    </Link>
                  </div>

                  {/* Hardened Logout Action */}
                  <div className="pt-1 mt-1 border-t border-[#E3E3DC]">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex min-h-[38px] items-center gap-2.5 rounded-[5px] px-2.5 py-2 text-left text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors disabled:opacity-50"
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
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="pill" size="sm" className="gap-1.5 shadow-sm">
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] p-2 text-[#494F4C] hover:bg-[#F4F4F0] hover:text-[#111413] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
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
        <div className="md:hidden border-b border-[#E3E3DC] bg-[#FBFBF9] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          {isAuthenticated && (
            <div className="pb-3 border-b border-[#E3E3DC] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#858C88]">
                Active Child Profile:
              </span>
              <ChildSelector variant="compact" />
            </div>
          )}

          <nav className="flex flex-col space-y-1">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#858C88]">
                  Navigation
                </div>
                {AUTHENTICATED_CORE_LINKS.map((link) => {
                  const isActive = isLinkActive(link.href);
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-2.5 rounded-[5px] px-3 py-2 text-sm font-semibold transition-colors min-h-[44px]',
                        isActive
                          ? 'bg-[#EAF3EE] text-[#143D2B]'
                          : 'text-[#494F4C] hover:bg-[#F4F4F0] hover:text-[#111413]'
                      )}
                    >
                      {Icon && (
                        <Icon
                          className={cn(
                            'h-4 w-4 shrink-0',
                            isActive ? 'text-[#143D2B]' : 'text-[#858C88]'
                          )}
                        />
                      )}
                      <span>{link.label}</span>
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
                      'rounded-[5px] px-3 py-2 text-sm font-semibold transition-colors min-h-[44px] flex items-center',
                      isActive
                        ? 'bg-[#EAF3EE] text-[#143D2B]'
                        : 'text-[#494F4C] hover:bg-[#F4F4F0] hover:text-[#111413]'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })
            )}
          </nav>

          <div className="pt-3 border-t border-[#E3E3DC] flex flex-col gap-2.5">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-[5px] px-3 py-2 text-sm font-semibold text-[#143D2B] bg-[#EAF3EE] hover:bg-[#D1E7DD] flex items-center justify-between min-h-[44px]"
                >
                  <span>Go to Home</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="px-3 text-xs font-medium text-[#494F4C] flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#143D2B] text-[10px] font-bold text-white">
                    {getInitials(user.fullName)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-[#111413] truncate">
                      {user.fullName}
                    </span>
                    <span className="text-[10px] text-[#858C88] font-mono truncate">
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
                  <Button variant="pill" className="w-full justify-center gap-1.5 min-h-[44px]">
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
