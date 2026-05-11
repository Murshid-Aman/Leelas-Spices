'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/lib/constants';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Ignore admin routes for this guard
      if (pathname.startsWith('/admin')) return;

      const isAuthPage = pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER;
      const protectedRoutes = [ROUTES.PROFILE, ROUTES.CHECKOUT, ROUTES.WISHLIST];
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
      
      // If NOT authenticated and trying to access a PROTECTED route, redirect to login
      if (!isAuthenticated && isProtectedRoute) {
        router.replace(`${ROUTES.LOGIN}?redirect=${pathname}`);
      }
      
      // If IS authenticated and on an AUTH page, redirect to home
      if (isAuthenticated && isAuthPage) {
        router.replace(ROUTES.HOME);
      }
    }
  }, [isAuthenticated, isMounted, pathname, router]);

  // Don't render anything until we've checked auth status on client side
  if (!isMounted) return null;

  // Admin routes pass through
  if (pathname.startsWith('/admin')) return <>{children}</>;

  const isAuthPage = pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER;
  const protectedRoutes = [ROUTES.PROFILE, ROUTES.CHECKOUT, ROUTES.WISHLIST];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Only block rendering if unauthenticated and on a protected route
  if (!isAuthenticated && isProtectedRoute) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#FDFAF5]">
        <div className="animate-pulse text-[#6B3D1E] font-bold text-xl uppercase tracking-widest">
          Leela&apos;s Spices
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
