'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X, ArrowRight, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { ChildSelector } from '@/components/shared/ChildSelector';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();

  const navLinks = isAuthenticated
    ? [
        { href: '/dashboard', label: 'Today' },
        { href: '/health', label: 'Health' },
        { href: '/nutrition', label: 'Nutrition' },
        { href: '/brain-games', label: 'Play' },
        { href: '/behavior', label: 'Behavior' },
        { href: '/advisor', label: 'AI Advisor' },
        { href: '/devices', label: 'Devices' },
      ]
    : [
        { href: '/#roads', label: 'The Two Roads' },
        { href: '/#features', label: 'Platform Pillars' },
        { href: '/health', label: 'Pediatric Health' },
        { href: '/advisor', label: 'AI Advisor' },
        { href: '/devices', label: 'Devices & Pacts' },
        { href: '/#pricing', label: 'Pricing' },
      ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Handled silently
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
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

        {/* Global Multi-Child Switcher when Authenticated */}
        {isAuthenticated && (
          <div className="flex items-center">
            <ChildSelector variant="header" />
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/dashboard'
                ? pathname === '/dashboard'
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

        {/* Desktop Auth CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'text-teal-700 font-semibold hover:text-teal-800 hover:bg-teal-50 text-xs',
                    pathname === '/dashboard' && 'bg-teal-50'
                  )}
                >
                  Dashboard
                </Button>
              </Link>
              <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5 max-w-[130px] truncate">
                <UserIcon className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                <span className="truncate">{user.fullName}</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="gap-1 text-xs px-2.5 h-8"
              >
                <LogOut className="h-3.5 w-3.5" />
                Log out
              </Button>
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

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          {isAuthenticated && (
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Active Child Profile:</span>
              <ChildSelector variant="compact" />
            </div>
          )}

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/dashboard'
                  ? pathname === '/dashboard'
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
            })}
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
                  <UserIcon className="h-4 w-4 text-teal-600" />
                  {user.fullName} ({user.email})
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center gap-2 text-xs"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-center gap-1.5">
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
