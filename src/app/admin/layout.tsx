'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdminAuthenticated, clearUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAdminAuthenticated && pathname !== ROUTES.ADMIN.LOGIN) {
      router.replace(ROUTES.ADMIN.LOGIN);
    }
    if (isMounted && isAdminAuthenticated && pathname === ROUTES.ADMIN.LOGIN) {
      router.replace(ROUTES.ADMIN.HOME);
    }
  }, [isAdminAuthenticated, isMounted, pathname, router]);

  if (!isMounted) return null;

  if (pathname === ROUTES.ADMIN.LOGIN) {
    return <>{children}</>;
  }

  if (!isAdminAuthenticated) {
    return null;
  }

  const navItems = [
    { label: 'Dashboard', href: ROUTES.ADMIN.HOME, icon: LayoutDashboard },
    { label: 'Products', href: ROUTES.ADMIN.PRODUCTS, icon: Package },
    { label: 'Orders', href: ROUTES.ADMIN.ORDERS, icon: ShoppingCart },
    { label: 'Users', href: ROUTES.ADMIN.USERS, icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[var(--color-bg-page)]">
      {/* ── Sidebar ── */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[var(--color-brand-primary)] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-28 items-center justify-center px-8 border-b border-white/10">
          <Link href={ROUTES.ADMIN.HOME} className="flex items-center justify-center w-full">
             <Image 
               src="/images/logo.png" 
               alt="Leela's Spices" 
               width={160} 
               height={80} 
               className="h-16 w-auto brightness-0 invert" 
             />
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl px-6 py-4 text-[15px] font-medium transition-all ${
                  isActive 
                    ? 'bg-white text-[var(--color-brand-primary)] shadow-lg shadow-black/10' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-[var(--color-brand-primary)]' : 'text-white/40'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <button 
            onClick={() => { 
              clearUser();
              window.location.href = ROUTES.HOME; 
            }}
            className="flex w-full items-center gap-4 rounded-2xl border border-white/10 px-6 py-4 text-[15px] font-medium text-white/60 transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex h-20 items-center justify-between border-b border-[var(--color-brand-primary)]/10 bg-[var(--color-bg-surface)] px-8">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-[var(--color-brand-primary)]">
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-6 ml-auto">
            <button className="relative p-2 text-[var(--color-brand-primary)]/40 hover:text-[var(--color-brand-primary)] transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-brand-primary)] ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-3 border-l pl-6 border-[var(--color-brand-primary)]/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[var(--color-text-heading)]">Admin Manager</p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-[var(--color-brand-primary)]/60">Super Admin</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[var(--color-brand-primary)] text-white flex items-center justify-center font-bold shadow-md shadow-[var(--color-brand-primary)]/20">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
