'use client';

import Link from 'next/link';
import { X, Home, ShoppingBag, LogIn, UserPlus, Info, User, ChefHat } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useTranslation } from '@/context/LanguageContext';
import { useAuthStore } from '@/store/authStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t, language, setLanguage } = useTranslation();
  const { isAuthenticated } = useAuthStore();

  const MENU_ITEMS: Array<{ href: string; label: string; icon: React.ElementType }> = [
    { href: ROUTES.HOME, label: t('nav.home') || 'Home', icon: Home },
    { href: ROUTES.PRODUCTS, label: t('nav.shop') || 'Shop', icon: ShoppingBag },
    { href: ROUTES.RECIPES, label: t('nav.recipes') || 'Recipes', icon: ChefHat },
    { href: ROUTES.ABOUT, label: t('nav.about') || 'About', icon: Info },
  ];

  if (isAuthenticated) {
    MENU_ITEMS.push({ href: ROUTES.PROFILE, label: 'My Profile', icon: User });
  } else {
    MENU_ITEMS.push(
      { href: ROUTES.LOGIN, label: t('nav.login') || 'Login', icon: LogIn },
      { href: ROUTES.REGISTER, label: t('nav.register') || 'Register', icon: UserPlus }
    );
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-72 transform bg-[var(--color-bg-dark)] shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className={`text-lg font-bold text-white  ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {language === 'ml' ? 'മെനു' : 'Menu'}
          </span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-white/80 transition-colors hover:bg-white/5 hover:text-white ${language === 'ml' ? 'font-malayalam' : ''}`}
              >
                <Icon className="h-5 w-5 text-[var(--color-brand-primary)]" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Language Switcher */}
        <div className="mt-auto p-6 border-t border-white/10">
          <p className={`text-xs font-bold uppercase tracking-widest text-white/40 mb-4 ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {language === 'ml' ? 'ഭാഷ മാറ്റുക' : 'Change Language'}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setLanguage('en');
                onClose();
              }}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                language === 'en' 
                  ? 'bg-[var(--color-brand-primary)] text-white shadow-lg' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              English
            </button>
            <button
              onClick={() => {
                setLanguage('ml');
                onClose();
              }}
              className={`flex-1 rounded-xl py-3 text-sm font-bold font-malayalam transition-all ${
                language === 'ml' 
                  ? 'bg-[var(--color-brand-primary)] text-white shadow-lg' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              മലയാളം
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
