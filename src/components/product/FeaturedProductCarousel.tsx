'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { useCart } from '@/hooks/useCart';

interface FeaturedProductCarouselProps {
  products: ProductType[];
}

export function FeaturedProductCarousel({ products }: FeaturedProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addItem } = useCart();
  const router = useRouter();

  const product = products[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, products.length]);

  const handleBuyNow = () => {
    addItem(product);
    router.push(ROUTES.CHECKOUT);
  };

  if (!product) return null;

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative">
      {/* Product Card */}
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left — Image */}
          <div className="relative flex items-center justify-center py-6 md:py-8">
            <div className="relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80">
              <Image
                src={product.featuredImage || product.image}
                alt={`${product.name} — premium Indian spice from ${product.origin}`}
                fill
                className="object-contain drop-shadow-2xl transition-all duration-500"
                sizes="(max-width: 768px) 300px, 400px"
                priority
              />
            </div>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col items-start px-4 md:px-0">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]/70">
              Featured Artisanal Selection
            </span>

            <h3 className="mt-2 text-2xl font-bold text-[var(--color-text-heading)] sm:text-3xl lg:text-4xl lg:leading-tight ">
              {product.name}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-heading)]/60 max-w-md">
              {product.shortDescription}. {product.description.slice(0, 150)}...
            </p>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[var(--color-text-heading)] ">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-[var(--color-text-heading)]/50">
                / {product.variants[0]?.weight}
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => addItem(product)}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-brand-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
                id={`featured-add-to-cart-${product.slug}`}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="inline-flex h-12 items-center justify-center rounded-lg border-[1.5px] border-[var(--color-green-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-[var(--color-green-primary)] transition-all hover:bg-[var(--color-green-primary)]/5 active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Left / Right arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg-surface)] shadow-md text-[var(--color-text-heading)]/60 transition-all hover:shadow-lg hover:text-[var(--color-brand-primary)] sm:left-2 lg:-left-4"
        aria-label="Previous product"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg-surface)] shadow-md text-[var(--color-text-heading)]/60 transition-all hover:shadow-lg hover:text-[var(--color-brand-primary)] sm:right-2 lg:-right-4"
        aria-label="Next product"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-[3px] rounded-full transition-all duration-300 ${index === currentIndex
              ? 'w-8 bg-[var(--color-text-heading)]'
              : 'w-4 bg-[var(--color-text-heading)]/20 hover:bg-[var(--color-text-heading)]/40'
              }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
