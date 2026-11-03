import Link from 'next/link';
import { Shield, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="no-print border-t border-slate-200/80 bg-slate-50/60 py-12 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">
                AlongSide
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Replacing anxiety and conflict with calm developmental science,
              collaborative family agreements, and neutral automated enforcement.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              The Two Roads
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#roads" className="hover:text-teal-700 transition-colors">
                  Road 1: Pre-Device (Readiness)
                </Link>
              </li>
              <li>
                <Link href="/#roads" className="hover:text-teal-700 transition-colors">
                  Road 2: Active-Device (Pact)
                </Link>
              </li>
              <li>
                <Link href="/#quiz" className="hover:text-teal-700 transition-colors">
                  Readiness Assessment (0–100)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#academy" className="hover:text-teal-700 transition-colors">
                  Parent Intelligence Academy
                </Link>
              </li>
              <li>
                <Link href="/#advisor" className="hover:text-teal-700 transition-colors">
                  24/7 AI Child Advisor
                </Link>
              </li>
              <li>
                <Link href="/#digest" className="hover:text-teal-700 transition-colors">
                  Sunday Culture Digest
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Peace of Mind
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register" className="hover:text-teal-700 transition-colors">
                  7-Day Risk-Free Trial
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  Built with <Heart className="h-3 w-3 text-red-500 fill-current" /> for parents
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AlongSide Systems, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Parent Calm Manifesto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
