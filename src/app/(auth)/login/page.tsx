'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useAuthStore } from '@/store/authStore';

import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || ROUTES.HOME;
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_TEST_EMAIL || '');
  const [password, setPassword] = useState(process.env.NEXT_PUBLIC_TEST_PASSWORD || '');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const dummyEmail = process.env.NEXT_PUBLIC_DUMMY_EMAIL;
      const dummyPassword = process.env.NEXT_PUBLIC_DUMMY_PASSWORD;

      if (email === dummyEmail && password === dummyPassword) {
        const user = {
          id: '1',
          name: 'Priya Sharma',
          email: dummyEmail,
          memberSince: 'March 2024',
          avatar: '/images/about/founder.png',
        };
        setUser(user);
        window.location.href = redirect;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch {
      setError(`Invalid email or password.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="mt-2 text-2xl font-bold text-[#3B2208] ">
          Welcome Back
        </h1>
        <p className="mt-1 text-xs text-[#3B2208]/50">
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
          {/* Email */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#3B2208]/40">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priya@example.com"
              required
              className="mt-1 w-full border-b border-[#3B2208]/12 bg-transparent pb-2 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#3B2208]/40">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1 w-full border-b border-[#3B2208]/12 bg-transparent pb-2 pr-10 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-2 text-[#3B2208]/30 hover:text-[#6B3D1E]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-full bg-[#6B3D1E] text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#5A3218] active:scale-[0.98] disabled:opacity-60 mt-2"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="mt-4 text-center text-xs text-[#3B2208]/50">
          Don't have an account?{' '}
          <Link href={ROUTES.REGISTER} className="font-bold text-[#6B3D1E] hover:underline underline-offset-4">
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
}
