import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { ShieldCheck } from 'lucide-react';
import { AuthTransition } from '@/components/auth/AuthTransition';

export const metadata: Metadata = {
  title: {
    default: 'Welcome | Leela\'s Spices',
    template: '%s | Leela\'s Spices',
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen items-center justify-center bg-[var(--color-bg-page)] px-4 overflow-hidden">
      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-[550px]">
        <div className="rounded-3xl bg-[var(--color-bg-surface)]/80 p-8 pt-12 sm:p-10 sm:pt-14 shadow-[0_8px_30px_var(--color-shadow-sm)] backdrop-blur-xl border border-white h-[640px] flex flex-col">
          {/* Shared Logo Header */}
          <div className="mb-6 text-center">
            <Link href={ROUTES.HOME} className="inline-block transition-transform hover:scale-105 active:scale-95">
              <Image
                src="/images/logo.png"
                alt="Leela's Spices"
                width={120}
                height={56}
                className="h-12 w-auto mx-auto"
                priority
              />
            </Link>
          </div>

          <AuthTransition className="flex-grow flex flex-col justify-start">
            {children}
          </AuthTransition>

          {/* Shared Divider & Social Login */}
          <div className="mt-4 space-y-4">
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-[var(--color-text-heading)]/6"></div>
              <span className="mx-4 flex-shrink text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/20">
                Or continue with
              </span>
              <div className="flex-grow border-t border-[var(--color-text-heading)]/6"></div>
            </div>

            <button
              type="button"
              className="flex w-full h-11 items-center justify-center gap-3 rounded-full border border-[var(--color-text-heading)]/10 bg-[var(--color-bg-page)]/50 px-4 text-sm font-semibold text-[var(--color-text-heading)] transition-all hover:bg-[var(--color-text-heading)]/3 hover:border-[var(--color-text-heading)]/20"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="var(--color-google-blue)"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="var(--color-google-green)"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="var(--color-google-yellow)"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="var(--color-google-red)"
                />
              </svg>
              Google
            </button>
          </div>

          {/* Shared Footer Branding */}
          <div className="mt-6 text-center pb-2">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/35">
              <ShieldCheck className="h-3 w-3" /> Authentic Heritage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
