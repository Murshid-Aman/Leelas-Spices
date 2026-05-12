'use client';

import { useWishlist } from '@/hooks/useWishlist';
import { ProductCard } from '@/components/product/ProductCard';
import { useTranslation } from '@/context/LanguageContext';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function WishlistPage() {
  const { items, totalItems } = useWishlist();
  const { t, language } = useTranslation();

  return (
    <div className="bg-[var(--color-bg-page)] min-h-[70vh] py-12 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className={`text-4xl font-bold text-[var(--color-text-heading)]  ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' ? 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ടവ' : 'My Wishlist'}
            </h1>
            <p className={`mt-2 text-[var(--color-text-heading)]/50 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {totalItems} {totalItems === 1 ? (language === 'ml' ? 'ഐറ്റം' : 'item') : (language === 'ml' ? 'ഐറ്റങ്ങൾ' : 'items')} {language === 'ml' ? 'സേവ് ചെയ്തിട്ടുണ്ട്' : 'saved in your collection'}
            </p>
          </div>
          
          {totalItems > 0 && (
             <Link 
               href={ROUTES.PRODUCTS}
               className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--color-brand-primary)] hover:underline ${language === 'ml' ? 'font-malayalam' : ''}`}
             >
               {language === 'ml' ? 'കൂടുതൽ സ്പൈസുകൾ കാണുക' : 'Continue Shopping'} <ArrowRight className="h-4 w-4" />
             </Link>
          )}
        </div>

        {totalItems === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/5 text-[var(--color-brand-primary)]/20 mb-6">
              <Heart className="h-12 w-12" />
            </div>
            <h2 className={`text-2xl font-bold text-[var(--color-text-heading)]  ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' ? 'വിഷ്‌ലിസ്റ്റ് കാലിയാണ്' : 'Your wishlist is empty'}
            </h2>
            <p className={`mt-3 max-w-md text-[var(--color-text-heading)]/50 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' 
                ? 'നിങ്ങൾക്കിഷ്ടപ്പെട്ട മസാലകൾ പിന്നീട് വാങ്ങാനായി സേവ് ചെയ്തു വെക്കാം.' 
                : "Explore our premium collection and save your favorite spices for later."}
            </p>
            <Link 
              href={ROUTES.PRODUCTS}
              className={`mt-10 rounded-full bg-[var(--color-brand-primary)] px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[var(--color-brand-hover)] hover:shadow-xl active:scale-95 ${language === 'ml' ? 'font-malayalam' : ''}`}
            >
              {language === 'ml' ? 'ഇപ്പോൾ ഷോപ്പ് ചെയ്യുക' : 'Shop Now'}
            </Link>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
