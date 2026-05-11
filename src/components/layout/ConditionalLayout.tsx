'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ROUTES } from '@/lib/constants';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes where Header and Footer should be hidden
  const hideLayout = pathname.startsWith('/admin') || pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER;

  if (hideLayout) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
