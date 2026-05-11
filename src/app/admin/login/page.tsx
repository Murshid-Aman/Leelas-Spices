'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/lib/constants';
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAdminAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      setAdminAuthenticated(true);
      router.replace(ROUTES.ADMIN.HOME);
    } else {
      setError('Invalid administrative credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFAF5] px-4 py-12">
      {/* Main Card Container */}
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-[#F8F1E4] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#3B2208]/5">
          {/* Logo Header */}
          <div className="mb-10 text-center">
            <Link href={ROUTES.HOME} className="inline-block transition-transform hover:scale-105 active:scale-95">
              <Image
                src="/images/logo.png"
                alt="Leela's Spices"
                width={120}
                height={56}
                className="h-14 w-auto mx-auto"
                priority
              />
            </Link>
          </div>

          <div className="mb-10 text-center">
            <h1 className="mt-8 text-3xl font-bold text-[#3B2208] ">
              Admin Console
            </h1>
            <p className="mt-2 text-sm text-[#3B2208]/50">
              Log in with your administrator credentials.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-100 p-3 text-xs text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">Admin Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@leelas.com"
                  required
                  className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 pr-10 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-2.5 text-[#3B2208]/30 hover:text-[#6B3D1E]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full bg-[#6B3D1E] text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#5A3218] active:scale-[0.98] disabled:opacity-60"
            >
              {isLoading ? 'Authenticating...' : 'Enter Dashboard'}
            </button>
          </form>

          {/* Footer Branding */}
          <div className="mt-12 text-center border-t border-[#3B2208]/6 pt-8">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3B2208]/35 mb-2">
              <ShieldCheck className="h-3.5 w-3.5" /> Secure Admin Access
            </div>
            <p className="text-[10px] text-[#3B2208]/30 leading-relaxed max-w-[200px] mx-auto">
              Authorized access only. All activities are logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
