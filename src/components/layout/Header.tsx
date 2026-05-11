'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Search, User, Menu, X, ChevronDown } from 'lucide-react';
import { ROUTES, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useTranslation } from '@/context/LanguageContext';
import { MobileMenu } from './MobileMenu';

const SHOP_DROPDOWN = [
  { label: 'Whole Spices', href: `${ROUTES.PRODUCTS}?category=whole-spices` },
  { label: 'Ground & Powders', href: `${ROUTES.PRODUCTS}?category=ground-spices` },
  { label: 'Masala Blends', href: `${ROUTES.PRODUCTS}?category=spice-blends` },
  { label: 'Herbs', href: `${ROUTES.PRODUCTS}?category=herbs` },
  { label: 'Kerala Specials', href: `${ROUTES.PRODUCTS}?category=kerala-specials` },
  { label: 'Gift Sets', href: `${ROUTES.PRODUCTS}?category=gift-sets` },
];

const BUNDLES_DROPDOWN = [
  { label: 'Starter Pack', href: `${ROUTES.PRODUCTS}?bundle=starter-pack` },
  { label: "Chef's Selection", href: `${ROUTES.PRODUCTS}?bundle=chefs-selection` },
  { label: 'Kerala Kitchen Bundle', href: `${ROUTES.PRODUCTS}?bundle=kerala-kitchen` },
  { label: 'Festival Special', href: `${ROUTES.PRODUCTS}?bundle=festival-special` },
  { label: 'Corporate Gifting', href: `${ROUTES.PRODUCTS}?bundle=corporate-gifting` },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { totalItems, toggleCart } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const { language, setLanguage, t } = useTranslation();

  const NAV_LINKS = [
    { href: ROUTES.PRODUCTS, label: t('nav.shop'), dropdown: SHOP_DROPDOWN },
    { href: ROUTES.PRODUCTS + '?category=spice-blends', label: t('nav.bundles'), dropdown: BUNDLES_DROPDOWN },
    { href: '#', label: t('nav.recipes'), dropdown: null },
    { href: ROUTES.ABOUT, label: t('nav.about'), dropdown: null },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Layer 1 — Promo strip (green bg) */}
        <div className="w-full bg-[#4A7A30] py-2">
          <p className="text-center text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase sm:text-xs">
            {t('nav.free_shipping')} ₹{FREE_SHIPPING_THRESHOLD}
          </p>
        </div>

        {/* Accent line */}
        <div className="h-[3px] w-full bg-[#4A7A30]" />

        {/* Layer 2 — Main Navbar (white bg, logo + nav + actions) */}
        <div className="w-full border-b border-[#E0D4C0] bg-[#FDFAF5] shadow-sm">
          <div className="mx-auto flex h-[70px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-[#6B3D1E] transition-colors hover:bg-[#6B3D1E]/5 md:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Leela's Spices — Premium Indian Spices"
                width={120}
                height={56}
                className="h-12 w-auto sm:h-14"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 md:flex lg:gap-2" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[#6B3D1E] transition-colors hover:bg-[#6B3D1E]/5 hover:text-[#5A3218] lg:px-4"
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown className={`h-3.5 w-3.5 text-[#6B3D1E]/50 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Dropdown Panel */}
                  {link.dropdown && openDropdown === link.label && (
                    <div className="absolute left-0 top-full pt-2 z-50">
                      <div className="min-w-[220px] rounded-xl border border-[#6B3D1E]/10 bg-[#F8F1E4] py-2 shadow-xl shadow-black/8 animate-in fade-in slide-in-from-top-1 duration-200">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center px-5 py-2.5 text-sm text-[#3B2208]/70 transition-colors hover:bg-[#6B3D1E]/5 hover:text-[#6B3D1E]"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        ))}
                        <div className="mx-4 my-1.5 border-t border-[#3B2208]/6" />
                        <Link
                          href={link.href}
                          className="flex items-center px-5 py-2.5 text-sm font-semibold text-[#6B3D1E] hover:bg-[#6B3D1E]/5"
                          onClick={() => setOpenDropdown(null)}
                        >
                          View All {link.label} →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search + Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Bar */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B3D1E]/40" />
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-44 rounded-full border border-[#6B3D1E]/15 bg-[#6B3D1E]/[0.03] py-2 pl-9 pr-4 text-sm text-[#6B3D1E] placeholder:text-[#6B3D1E]/40 transition-all focus:w-56 focus:border-[#6B3D1E]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B3D1E]/10 lg:w-52 lg:focus:w-64 ${language === 'ml' ? 'font-malayalam' : ''}`}
                  id="header-search"
                />
              </div>

              {/* Wishlist */}
              <Link
                href={ROUTES.WISHLIST}
                className="relative hidden rounded-lg p-2 text-[#6B3D1E]/70 transition-colors hover:bg-[#6B3D1E]/5 hover:text-[#6B3D1E] sm:inline-flex"
                aria-label="Wishlist"
                id="wishlist-toggle"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#6B3D1E] text-[10px] font-bold text-white ring-2 ring-white">
                    {wishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative rounded-lg p-2 text-[#6B3D1E]/70 transition-colors hover:bg-[#6B3D1E]/5 hover:text-[#6B3D1E]"
                aria-label="Open cart"
                id="cart-toggle"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#6B3D1E] text-[10px] font-bold text-white ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Account */}
              <Link
                href={ROUTES.PROFILE}
                className="hidden rounded-lg p-2 text-[#6B3D1E]/70 transition-colors hover:bg-[#6B3D1E]/5 hover:text-[#6B3D1E] sm:inline-flex"
                aria-label="My Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Language Switcher */}
              <div className="hidden items-center ml-2 border-l border-[#6B3D1E]/10 pl-2 sm:flex">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-1 text-[10px] font-bold tracking-wider transition-colors ${
                    language === 'en' ? 'text-[#6B3D1E] underline underline-offset-4' : 'text-[#6B3D1E]/40 hover:text-[#6B3D1E]'
                  }`}
                >
                  EN
                </button>
                <span className="text-[#6B3D1E]/10 text-[10px]">|</span>
                <button
                  onClick={() => setLanguage('ml')}
                  className={`px-1.5 py-1 text-[10px] font-bold tracking-wider transition-colors font-malayalam ${
                    language === 'ml' ? 'text-[#6B3D1E] underline underline-offset-4' : 'text-[#6B3D1E]/40 hover:text-[#6B3D1E]'
                  }`}
                >
                  മല
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
