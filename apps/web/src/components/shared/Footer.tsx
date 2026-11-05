import Link from 'next/link';
import { Shield, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="no-print border-t border-[#E3E3DC] bg-[#F4F4F0] py-12 text-[#494F4C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[#143D2B] text-white">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-serif font-bold text-[#111413] tracking-tight text-xl">
                AlongSide <em className="italic font-normal text-[#143D2B]">Almanac</em>
              </span>
            </div>
            <p className="text-sm text-[#494F4C] leading-relaxed">
              Replacing anxiety and conflict with calm developmental science,
              collaborative family agreements, and neutral automated enforcement.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#111413] mb-3">
              The Architecture
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#stages" className="hover:text-[#143D2B] transition-colors">
                  Lifespan Stages (Ages 0–18)
                </Link>
              </li>
              <li>
                <Link href="/#pillars" className="hover:text-[#143D2B] transition-colors">
                  3 Core Advisory Pillars
                </Link>
              </li>
              <li>
                <Link href="/#devices-hub" className="hover:text-[#143D2B] transition-colors">
                  Family Pacts &amp; Devices Hub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#111413] mb-3">
              Platform Pillars
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#pillars" className="hover:text-[#143D2B] transition-colors">
                  Parent Intelligence Academy
                </Link>
              </li>
              <li>
                <Link href="/#digest" className="hover:text-[#143D2B] transition-colors">
                  Sunday Culture Digest
                </Link>
              </li>
              <li>
                <Link href="/#devices-hub" className="hover:text-[#143D2B] transition-colors">
                  Bilateral Family Pacts &amp; Curfews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#111413] mb-3">
              Peace of Mind
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register" className="hover:text-[#143D2B] transition-colors">
                  7-Day Risk-Free Trial
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-[#858C88]">
                  Built with <Heart className="h-3 w-3 text-red-500 fill-current" /> for parents
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E3E3DC] flex flex-col sm:flex-row items-center justify-between text-xs text-[#858C88] gap-4">
          <p>© {new Date().getFullYear()} AlongSide Systems, Inc. All rights reserved.</p>
          <div className="flex gap-6 font-mono text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Parent Calm Manifesto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
