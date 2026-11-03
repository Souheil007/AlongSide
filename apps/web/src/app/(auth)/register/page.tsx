import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Start 7-Day Free Trial — AlongSide Parent Intelligence',
  description: 'Create your parent account to begin your 7-day risk-free trial of AlongSide.',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}
