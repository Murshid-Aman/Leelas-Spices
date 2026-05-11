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
          <div className="relative flex items-center justify-center py-8 md:py-12">
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B3D1E]/70">
              Featured Artisanal Selection
            </span>

            <h3 className="mt-3 text-3xl font-bold text-[#3B2208] sm:text-4xl lg:text-[2.75rem] lg:leading-tight ">
              {product.name}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-[#3B2208]/60 max-w-md">
              {product.shortDescription}. {product.description.slice(0, 150)}...
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#3B2208] ">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-[#3B2208]/50">
                / {product.variants[0]?.weight}
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => addItem(product)}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#6B3D1E] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#5A3218] active:scale-[0.98]"
                id={`featured-add-to-cart-${product.slug}`}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="inline-flex h-12 items-center justify-center rounded-lg border-[1.5px] border-[#4A7A30] px-8 text-sm font-semibold uppercase tracking-wider text-[#4A7A30] transition-all hover:bg-[#4A7A30]/5 active:scale-[0.98]"
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
        className="absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F1E4] shadow-md text-[#3B2208]/60 transition-all hover:shadow-lg hover:text-[#6B3D1E] sm:left-2 lg:-left-4"
        aria-label="Previous product"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F1E4] shadow-md text-[#3B2208]/60 transition-all hover:shadow-lg hover:text-[#6B3D1E] sm:right-2 lg:-right-4"
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
              ? 'w-8 bg-[#3B2208]'
              : 'w-4 bg-[#3B2208]/20 hover:bg-[#3B2208]/40'
              }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
