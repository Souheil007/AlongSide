import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Get Free Early Access',
  description: 'Create your parent account for free early access to Alongside - no credit card required.',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}
