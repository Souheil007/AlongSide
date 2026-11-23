import Link from 'next/link';
import { AlongsideLogo } from '@/components/shared/AlongsideLogo';

export function Footer() {
  return (
    <footer className="no-print border-t border-[rgba(19,23,21,0.09)] bg-[#FAF9F5] pt-14 pb-8 text-[#454D49]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8 pb-6">
          <div>
            <Link href="/" className="inline-block group" aria-label="Alongside Home">
              <AlongsideLogo size="sm" />
            </Link>
            <p className="mt-3 max-w-[34ch] text-[14.5px] leading-[1.55] text-[#454D49]">
              Developmental science, calm scripts, and built-in OS parental control guides for ages 0 to 18.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[14px] font-medium text-[#454D49]"
          >
            <Link href="/#studio" className="hover:text-[#143D2B] transition-colors">
              How it works
            </Link>
            <Link href="/#device-safety" className="hover:text-[#143D2B] transition-colors">
              Device safety
            </Link>
            <Link href="/#science" className="hover:text-[#143D2B] transition-colors">
              Philosophy
            </Link>
            <Link href="/#pricing" className="hover:text-[#143D2B] transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-[#143D2B] transition-colors">
              Log in
            </Link>
          </nav>
        </div>

        <div
          aria-hidden="true"
          className="font-serif font-normal text-[56px] sm:text-[108px] lg:text-[152px] leading-[0.9] tracking-[-0.04em] text-[#143D2B]/[0.08] select-none mb-4"
        >
          Alongside
        </div>

        <div className="pt-5 border-t border-[rgba(19,23,21,0.09)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-[#69726D]">
          <p>© {new Date().getFullYear()} Alongside Systems, Inc.</p>
          <div className="flex flex-wrap gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Built-In OS Controls</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
