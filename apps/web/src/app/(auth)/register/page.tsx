import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Free Account',
  description: 'Calm parenting for ages 0–18. Free early access, no credit card needed.',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}
