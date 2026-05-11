'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Star,
  Minus,
  Plus,
  Truck,
  Leaf,
  ShieldCheck,
  Globe,
  FlaskConical,
  UtensilsCrossed,
  Quote,
  StarHalf,
  ShoppingCart,
  FileText,
  Mountain,
  MessageSquare,
  PenLine,
  User,
  ArrowRight,
  Zap,
  Package,
} from 'lucide-react';
import { ProductType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { useCart } from '@/hooks/useCart';
import { useTranslation } from '@/context/LanguageContext';

interface ProductDetailProps {
  product: ProductType;
}

/* ────────────────────────────────────────────
   Static review data (since the API doesn't provide reviews)
   ──────────────────────────────────────────── */
const SAMPLE_REVIEWS = [
  {
    name: 'Ananya K.',
    date: '2 weeks ago',
    rating: 5,
    text: '"This tastes exactly like the pickle my grandmother used to make. The mango pieces are firm and the spice level is perfectly balanced. A true taste of home."',
  },
  {
    name: 'Julian M.',
    date: '1 month ago',
    rating: 5,
    text: '"The quality of the oil and spices is evident from the first bite. It\'s much more refined than store-bought pickles. Worth every penny."',
  },
];

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.weight || '',
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'usage'>('description');
  const { addItem, openCart } = useCart();
  const { t, language } = useTranslation();
  const router = useRouter();

  const currentVariant = product.variants.find(
    (v) => v.weight === selectedVariant,
  );
  const currentPrice = currentVariant?.price ?? product.price;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant);
    }
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant);
    }
    router.push(ROUTES.CHECKOUT);
  };

  const allImages = product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="flex flex-col">
      {/* ═══════════════════════════════════════════
          SECTION 1: Product Hero (Image + Details)
          ═══════════════════════════════════════════ */}
      <section className="grid gap-8 md:grid-cols-[45%_1fr] lg:grid-cols-[42%_1fr] lg:gap-16">
        {/* ── Left: Image Gallery ── */}
        {/* ── Left: Image Gallery ── */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Thumbnail Strip */}
          <div className="flex md:flex-col gap-3 order-last md:order-first justify-start">
              {allImages.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-16 w-16 md:h-[72px] md:w-[72px] overflow-hidden rounded-xl border-2 transition-all shrink-0 ${
                    selectedImage === i
                      ? 'border-[#4A7A30] ring-2 ring-[#4A7A30]/20'
                      : 'border-[#3B2208]/10 hover:border-[#3B2208]/30'
                  }`}
                  id={`thumbnail-${i}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </button>
              ))}
              {/* Optional Down Arrow Button as seen in image */}
              <button className="flex h-16 w-16 md:h-[72px] md:w-[72px] shrink-0 items-center justify-center rounded-xl border border-[#3B2208]/10 transition-all hover:bg-[#3B2208]/5">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B2208" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </button>
          </div>

          {/* Main Image */}
          <div className="relative flex-1 w-full aspect-square overflow-hidden rounded-2xl bg-[#F0E6D3] border border-[#3B2208]/8">
            <Image
              src={allImages[selectedImage] || product.image}
              alt={`${product.name} — premium Indian spice`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* ── Right: Product Info ── */}
        <div className="flex flex-col">
          {/* Star Rating + Review Count + Bestseller */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex">
                <Star className="h-4 w-4 fill-[#C8922A] text-[#C8922A]" />
                <Star className="h-4 w-4 fill-[#C8922A] text-[#C8922A]" />
                <Star className="h-4 w-4 fill-[#C8922A] text-[#C8922A]" />
                <Star className="h-4 w-4 fill-[#C8922A] text-[#C8922A]" />
                <StarHalf className="h-4 w-4 fill-[#C8922A] text-[#C8922A]" />
              </div>
              <span className="text-sm font-bold text-[#3B2208]">4.7</span>
              <span className={`text-sm text-[#3B2208]/60 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                (189 {t('products.reviews').toLowerCase()})
              </span>
            </div>
            <div className="h-4 w-[1px] bg-[#3B2208]/15"></div>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F8F1E4] px-2 py-0.5 text-xs font-bold text-[#6B3D1E]">
              <span>🔥</span> Bestseller
            </span>
          </div>

          {/* Product Name */}
          <h1 className="mt-3 text-3xl font-bold text-[#3B2208] lg:text-4xl leading-tight">
            {product.name}
          </h1>

          <p className="mt-3 text-[15px] font-normal leading-relaxed text-[#3B2208]/60">
            Hand-sorted from the misty highlands of Idukki, Kerala.
          </p>

          {/* Pill Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8F1E4] px-3 py-1.5 text-xs font-bold text-[#3B2208]/80">
              <Leaf className="h-3.5 w-3.5 text-[#4A7A30]" /> 100% Natural
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8F1E4] px-3 py-1.5 text-xs font-bold text-[#3B2208]/80">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C8302A]" /> No Additives
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8F1E4] px-3 py-1.5 text-xs font-bold text-[#3B2208]/80">
              <Globe className="h-3.5 w-3.5 text-[#2D4A1E]" /> Ethically Sourced
            </span>
          </div>

          {/* Price Box */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center rounded-2xl border border-[#3B2208]/10 bg-[#F8F1E4]/50 p-5 gap-4">
            <div className="flex flex-col flex-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#3B2208]">
                  ₹399
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-[#3B2208]/35 line-through sm:text-lg">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
              <span className="mt-1 text-sm text-[#3B2208]/60">
                Inclusive of all taxes
              </span>
            </div>
            <div className="hidden sm:block h-12 w-[1px] bg-[#3B2208]/10"></div>
            <div className="flex items-start gap-3 flex-1">
              <Truck className="mt-0.5 h-5 w-5 text-[#3B2208]/60" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#3B2208]">
                  Ships in 2–3 business days
                </span>
                <span className="mt-0.5 text-xs text-[#3B2208]/50">
                  Reliable & on time delivery
                </span>
              </div>
            </div>
          </div>

          {/* Variant Selector */}
          {product.variants.length > 1 && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-bold text-[#3B2208]">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.sku}
                    onClick={() => setSelectedVariant(variant.weight)}
                    className={`rounded-xl border px-6 py-2.5 text-sm font-bold transition-all ${
                      selectedVariant === variant.weight
                        ? 'border-[#4A7A30] bg-[#4A7A30] text-white'
                        : 'border-[#3B2208]/15 bg-transparent text-[#3B2208]/80 hover:border-[#3B2208]/30'
                    }`}
                    id={`variant-${variant.sku}`}
                  >
                    {variant.weight}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Buttons Row */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="inline-flex h-12 items-center rounded-xl border border-[#3B2208]/15 bg-transparent">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-[#3B2208]/50 hover:text-[#3B2208] transition-colors"
                  aria-label="Decrease quantity"
                  id="qty-decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2rem] text-center text-base font-bold text-[#3B2208]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-[#3B2208]/50 hover:text-[#3B2208] transition-colors"
                  aria-label="Increase quantity"
                  id="qty-increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 gap-3">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 inline-flex h-12 items-center justify-center rounded-xl border-[1.5px] border-[#4A7A30] bg-transparent px-5 text-sm font-bold text-[#4A7A30] transition-all hover:bg-[#4A7A30]/5 active:scale-[0.98] sm:px-6 ${language === 'ml' ? 'font-malayalam' : ''}`}
                id="add-to-cart-detail"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t('products.add_to_cart')}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className={`flex-1 inline-flex h-12 items-center justify-center rounded-xl bg-[#4A7A30] px-5 text-sm font-bold text-white transition-all hover:bg-[#3D6628] active:scale-[0.98] sm:px-6 ${language === 'ml' ? 'font-malayalam' : ''}`}
                id="buy-now-detail"
              >
                <Zap className="mr-2 h-4 w-4 fill-white" />
                {t('products.buy_now')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: The Craft (Tabs)
          ═══════════════════════════════════════════ */}
      <section className="mt-16 grid gap-8 md:grid-cols-[320px_1fr] lg:mt-24 lg:gap-16">
        {/* Left column — "The Craft" Card */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[#F8F1E4] p-8 lg:p-10 h-fit border border-[#3B2208]/5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EBE1D1] text-[#3B2208]">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <h2 className={`mt-8 text-3xl font-bold text-[#3B2208] lg:text-4xl ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {t('products.the_craft')}
          </h2>
          <div className="mt-4 h-1 w-10 rounded-full bg-[#4A7A30]"></div>
          <p className="mt-8 text-[15px] font-normal leading-relaxed text-[#3B2208]/70 relative z-10">
            <span className="text-xl font-serif text-[#4A7A30] font-bold mr-1">"</span>
            Every jar is a testament to the patient art of pickling—an alchemy of sun, salt, and spice that captures the fleeting essence of harvest.
            <span className="text-xl font-serif text-[#4A7A30] font-bold ml-1">"</span>
          </p>
          
          {/* Decorative subtle background shapes */}
          <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full border-[20px] border-[#EBE1D1]/40 mix-blend-multiply"></div>
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full border-[10px] border-[#EBE1D1]/40 mix-blend-multiply"></div>
        </div>

        {/* Right column — Tabs + Content */}
        <div className="flex flex-col justify-start pt-2">
          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-[#3B2208]/10">
            {(['description', 'ingredients', 'usage'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex items-center gap-2 pb-3 text-[15px] font-bold capitalize transition-all ${
                    isActive ? 'text-[#3B2208]' : 'text-[#3B2208]/50 hover:text-[#3B2208]/70'
                  } ${language === 'ml' ? 'font-malayalam' : ''}`}
                  id={`tab-${tab}`}
                >
                  {/* Icons for tabs */}
                  {tab === 'description' && <FileText className="h-4 w-4" />}
                  {tab === 'ingredients' && <Leaf className="h-4 w-4" />}
                  {tab === 'usage' && <UtensilsCrossed className="h-4 w-4" />}
                  
                  {tab === 'description' ? (language === 'ml' ? 'വിവരണം' : 'Description') : 
                   tab === 'ingredients' ? (language === 'ml' ? 'ചേരുവകൾ' : 'Ingredients') : 
                   (language === 'ml' ? 'ഉപയോഗം' : 'Usage')}

                   {/* Active Underline */}
                   {isActive && (
                     <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#4A7A30]"></span>
                   )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="mt-10">
            {activeTab === 'description' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F0EBE1] text-[#4A7A30]">
                    <Mountain className="h-6 w-6" />
                  </div>
                  <h3 className={`text-2xl font-bold text-[#3B2208] ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    Heritage & Artisanal Process
                  </h3>
                </div>
                <div className="pl-[76px]">
                  <p className="text-[15px] leading-relaxed text-[#3B2208]/70">
                    {product.description} Aromatic green cardamom pods from the misty hills of Kerala's Idukki district. These bold, plump pods burst with a complex symphony of eucalyptus, mint, and citrus notes. Perfect for chai, biryanis, and Indian desserts like kheer and gulab jamun.
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#3B2208]/70">
                    Hand-harvested at the peak of maturity, each batch undergoes a meticulous sun-drying process to preserve its essential oils and vibrant green color. This careful attention to detail ensures that every pod delivers maximum flavor and aroma to your culinary creations.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F0EBE1] text-[#4A7A30]">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#3B2208]">
                    Pure & Natural Ingredients
                  </h3>
                </div>
                <div className="pl-[76px]">
                  <p className="text-[15px] leading-relaxed text-[#3B2208]/70">
                    Every ingredient is hand-selected for quality. Our {product.name.toLowerCase()} features the finest raw materials sourced directly from {product.origin}, prepared using traditional techniques passed down through generations.
                  </p>
                  <ul className="mt-5 space-y-3 text-[15px] text-[#3B2208]/70">
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A7A30] mt-0.5">•</span>
                      <span><strong className="text-[#3B2208]">100% Whole Spices:</strong> No fillers, no powders, just the pure, unadulterated spice.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A7A30] mt-0.5">•</span>
                      <span><strong className="text-[#3B2208]">Zero Artificial Additives:</strong> Completely free from synthetic colors, preservatives, or anti-caking agents.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A7A30] mt-0.5">•</span>
                      <span><strong className="text-[#3B2208]">Ethically Sourced:</strong> Directly procured from small-scale farmers in {product.origin}.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F0EBE1] text-[#4A7A30]">
                    <UtensilsCrossed className="h-6 w-6" />
                  </div>
                  <h3 className={`text-2xl font-bold text-[#3B2208] ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    Culinary Applications
                  </h3>
                </div>
                <div className="pl-[76px]">
                  <p className="text-[15px] leading-relaxed text-[#3B2208]/70">
                    A highly versatile ingredient that elevates both sweet and savory dishes. Its unique flavor profile complements traditional curries, baked goods, and even specialty beverages.
                  </p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                     <div className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] p-5">
                       <h4 className="font-bold text-[#3B2208] text-sm">Everyday Cooking</h4>
                       <p className="text-[13px] leading-relaxed mt-1.5 text-[#3B2208]/60">Crush lightly and add to your morning tea or coffee for an aromatic start.</p>
                     </div>
                     <div className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] p-5">
                       <h4 className="font-bold text-[#3B2208] text-sm">Storage Tips</h4>
                       <p className="text-[13px] leading-relaxed mt-1.5 text-[#3B2208]/60">Store in a cool, dry place away from direct sunlight to preserve the volatile oils.</p>
                     </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: Customer Reviews
          ═══════════════════════════════════════════ */}
      <section className="mt-16 rounded-[2rem] bg-[#FDFAF5] p-8 sm:p-10 lg:mt-24 lg:p-12 border border-[#3B2208]/5">
        {/* Header row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF0E2] text-[#4A7A30]">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className={`text-3xl font-bold text-[#3B2208] ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {t('products.what_customers_say')}
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex">
                  <Star className="h-4 w-4 fill-[#C8922A] text-[#C8922A]" />
                  <Star className="h-4 w-4 fill-[#C8922A] text-[#C8922A]" />
                  <Star className="h-4 w-4 fill-[#C8922A] text-[#C8922A]" />
                  <Star className="h-4 w-4 fill-[#C8922A] text-[#C8922A]" />
                  <StarHalf className="h-4 w-4 fill-[#C8922A] text-[#C8922A]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-bold text-[#3B2208]">4.7</span>
                  <span className="text-[#3B2208]/30">|</span>
                  <span className={`text-[15px] font-normal text-[#3B2208]/50 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    5.0 {t('products.average')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#3B2208]/20 bg-white px-6 text-sm font-bold text-[#3B2208] transition-all hover:bg-[#3B2208]/5 ${language === 'ml' ? 'font-malayalam' : ''}`}
            id="write-review"
          >
            <PenLine className="h-4 w-4" />
            {t('products.write_review')}
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {SAMPLE_REVIEWS.map((review) => (
            <div key={review.name} className="rounded-2xl bg-[#F6F4EF] p-6 border border-[#3B2208]/5">
              {/* Reviewer info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF0E2] text-[#4A7A30]">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-[15px] font-bold text-[#3B2208]">{review.name}</span>
                </div>
                <span className="text-[13px] font-medium text-[#3B2208]/40">{review.date}</span>
              </div>
              
              {/* Stars */}
              <div className="mt-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < review.rating
                        ? 'fill-[#C8922A] text-[#C8922A]'
                        : 'fill-[#3B2208]/15 text-[#3B2208]/15'
                    }`}
                  />
                ))}
              </div>
              
              {/* Review text */}
              <p className="mt-4 text-[15px] leading-relaxed text-[#3B2208]/70">
                <span className="text-xl font-serif font-bold text-[#4A7A30] mr-1">"</span>
                {review.text.replace(/^"|"$/g, '')}
                <span className="text-xl font-serif font-bold text-[#4A7A30] ml-1">"</span>
              </p>
            </div>
          ))}
        </div>

        {/* Read All Reviews link */}
        <div className="mt-10 border-t border-[#3B2208]/10 pt-8 text-center">
          <button className={`inline-flex items-center gap-2 text-[15px] font-bold text-[#2D4A1E] transition-colors hover:text-[#4A7A30] border-b border-[#2D4A1E]/30 pb-0.5 ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {t('products.read_all')} {product.reviewCount} {t('products.reviews')}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
