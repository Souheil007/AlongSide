import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PasswordlessAuthCard } from '@/components/auth/PasswordlessAuthCard';

export const metadata: Metadata = {
  title: 'Get In',
  description: 'Sign in or explore the live Alongside demo with Google, Demo Mode, or email.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="h-96 w-full max-w-md animate-pulse rounded-2xl bg-slate-100" />}>
        <PasswordlessAuthCard mode="login" />
      </Suspense>
    </div>
  );
}
