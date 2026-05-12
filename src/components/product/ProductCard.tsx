'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Leaf } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ProductType } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useTranslation } from '@/context/LanguageContext';

interface ProductCardProps {
  product: ProductType;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { t, language } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }
    addItem(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }
    toggleItem(product);
  };

  return (
    <div
      className="group relative flex flex-col rounded-[1.75rem] bg-[var(--color-bg-surface)] transition-all duration-500 hover:shadow-2xl w-full border border-gray-100/50 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── IMAGE AREA ── */}
      <div className="relative aspect-square overflow-hidden bg-transparent flex items-center justify-center">
        {/* Brand Pill */}
        <div className="absolute top-4 left-4 z-10 flex items-center justify-center bg-[var(--color-bg-surface)] rounded-full p-2 shadow-md transition-transform duration-300 group-hover:scale-110">
          <Leaf className="h-4 w-4 text-[var(--color-brand-primary)]" />
        </div>

        {/* Product Image */}
        <Link href={ROUTES.PRODUCT_DETAIL(product.slug)} className="block relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={product.isFeatured}
          />
        </Link>

        {/* Pagination Dots (Visual Only) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-60">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-green-primary)]" />
          <div className="h-1.5 w-1.5 rounded-full bg-gray-200" />
          <div className="h-1.5 w-1.5 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* ── INFO AREA ── */}
      <div className="flex flex-col p-5 pt-1 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center rounded-full bg-[var(--color-green-sage)]/20 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--color-green-deep)] sm:px-4 sm:py-1.5 sm:text-[10px]">
            {product.isFeatured ? 'Best Seller' : product.isNew ? 'New Arrival' : 'Premium Spices'}
          </span>
          
          <button
            onClick={handleWishlist}
            className={cn(
              "p-1 transition-all duration-300 active:scale-90",
              isInWishlist(product.id) ? "text-red-500 scale-110" : "text-gray-300 hover:text-red-400"
            )}
            aria-label={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
          </button>
        </div>

        <Link href={ROUTES.PRODUCT_DETAIL(product.slug)}>
          <h3 className={cn(
            "text-[16px] font-bold text-[var(--color-text-dark)] leading-tight line-clamp-2 min-h-[2.4rem] hover:text-[var(--color-brand-primary)] transition-colors sm:text-[18px] sm:min-h-[2.8rem]",
            language === 'ml' && "font-malayalam"
          )}>
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5 sm:text-[11px]">Price</span>
            <span className="text-lg font-bold text-[var(--color-gold-primary)] sm:text-xl">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-[var(--color-brand-primary)] px-5 py-2.5 text-xs font-bold text-[var(--color-text-inverse)] transition-all hover:bg-[var(--color-brand-hover)] active:scale-95 shadow-xl shadow-black/10"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
