'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useAuthStore } from '@/store/authStore';
import { register as registerApi } from '@/lib/api';

import { useSearchParams } from 'next/navigation';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || ROUTES.HOME;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const user = await registerApi({ name, email, password, confirmPassword: password });
      setUser(user);
      window.location.href = redirect;
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="mt-2 text-2xl font-bold text-[var(--color-text-heading)] ">
          Create Account
        </h1>
        <p className="mt-1 text-xs text-[var(--color-text-heading)]/50">
          Elevate your culinary journey today.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-100 p-2 text-[10px] text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/40">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Elias Thorne"
              required
              className="mt-1 w-full border-b border-[var(--color-text-heading)]/12 bg-transparent pb-2 text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-heading)]/25 focus:border-[var(--color-brand-primary)]/40 focus:outline-none transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/40">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="elias@atelier.com"
              required
              className="mt-1 w-full border-b border-[var(--color-text-heading)]/12 bg-transparent pb-2 text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-heading)]/25 focus:border-[var(--color-brand-primary)]/40 focus:outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/40">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1 w-full border-b border-[var(--color-text-heading)]/12 bg-transparent pb-2 pr-10 text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-heading)]/25 focus:border-[var(--color-brand-primary)]/40 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-2 text-[var(--color-text-heading)]/30 hover:text-[var(--color-brand-primary)]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-full bg-[var(--color-brand-primary)] text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[var(--color-brand-hover)] active:scale-[0.98] disabled:opacity-60 mt-2"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p className="mt-4 text-center text-xs text-[var(--color-text-heading)]/50">
          Already have an account?{' '}
          <Link href={ROUTES.LOGIN} className="font-bold text-[var(--color-brand-primary)] hover:underline underline-offset-4">
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
