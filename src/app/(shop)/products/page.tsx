'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductCategory } from '@/types';
import { useTranslation } from '@/context/LanguageContext';

const CATEGORY_DATA: Record<string, { title: string; description: string; accent: string }> = {
  all: {
    title: 'Our Spice Collection',
    description: "Discover the full range of Leela's premium spices, handpicked and expertly curated for the authentic taste of India.",
    accent: 'text-[var(--color-brand-primary)]'
  },
  'whole-spices': {
    title: 'Whole Spices',
    description: 'Pure, unground spices that retain their essential oils and aroma for maximum flavor and freshness.',
    accent: 'text-[var(--color-green-deep)]'
  },
  'ground-spices': {
    title: 'Ground & Powders',
    description: 'Finely milled spices that offer convenience without compromising on potency. Perfect for flavorful cooking.',
    accent: 'text-[var(--color-gold-accent)]'
  },
  'spice-blends': {
    title: 'Authentic Blends',
    description: 'Traditional Indian masala mixes crafted from traditional family recipes, balancing flavor and spice perfectly.',
    accent: 'text-[var(--color-brand-warm)]'
  },
  'premium': {
    title: 'Premium Selection',
    description: 'Our most exclusive and rare spices, sourced from the finest estates for those who demand the very best.',
    accent: 'text-[var(--color-brand-primary)]'
  },
  'essentials': {
    title: 'Kitchen Essentials',
    description: 'The foundation of every great Indian dish. High-quality basics that no kitchen should be without.',
    accent: 'text-[var(--color-text-heading)]'
  }
};

function ProductsContent() {
  const { t, language } = useTranslation();
  
  const CATEGORIES = [
    { value: 'all', label: t('products.all') },
    { value: 'whole-spices', label: t('products.whole') },
    { value: 'ground-spices', label: t('products.ground') },
    { value: 'spice-blends', label: t('products.blends') },
    { value: 'premium', label: t('products.premium') },
    { value: 'essentials', label: t('products.essentials') },
  ];

  const SORT_OPTIONS = [
    { value: 'featured', label: t('sort.featured') },
    { value: 'price-asc', label: t('sort.price_low') },
    { value: 'price-desc', label: t('sort.price_high') },
    { value: 'rating', label: t('sort.rating') },
    { value: 'newest', label: t('sort.newest') },
  ];

  const searchParams = useSearchParams();
  const { data: products, isLoading } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Sync category and search with URL search params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && CATEGORIES.some(c => c.value === categoryParam)) {
      setCategory(categoryParam);
    } else {
      setCategory('all');
    }

    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Filter by search
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)),
      );
    }

    // Filter by category
    if (category !== 'all') {
      result = result.filter((p) => p.category === (category as ProductCategory));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, search, category, sortBy]);

  const currentCategoryData = CATEGORY_DATA[category] || CATEGORY_DATA.all;

  return (
    <div className="bg-[var(--color-bg-page)] min-h-screen">
      {/* Category Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden border-b border-[var(--color-brand-primary)]/5 sm:pt-16 sm:pb-20">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(var(--color-brand-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-center sm:text-left">
            <span className={`text-[11px] font-bold uppercase tracking-[0.3em] mb-4 block ${currentCategoryData.accent} ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {category === 'all' ? (language === 'ml' ? 'ശേഖരം' : 'The Collection') : CATEGORIES.find(c => c.value === category)?.label}
            </span>
            <h1 className="text-4xl font-bold text-[var(--color-text-heading)]  mb-6 tracking-tight sm:text-5xl">
              {currentCategoryData.title}
            </h1>
            <p className="text-base text-[var(--color-text-heading)]/60 leading-relaxed sm:text-lg">
              {currentCategoryData.description}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
        {/* Toolbar: Search, Filter, Sort */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-[var(--color-text-heading)]/10 pb-10">
          {/* Categories Tab-like Filter */}
          <div className="-mx-4 flex items-center gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide lg:mx-0 lg:flex-wrap lg:px-0 lg:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  category === cat.value
                    ? 'bg-[var(--color-brand-primary)] text-white shadow-lg shadow-[var(--color-brand-primary)]/20'
                    : 'bg-[var(--color-text-heading)]/5 text-[var(--color-text-heading)]/50 hover:bg-[var(--color-text-heading)]/10 hover:text-[var(--color-brand-primary)]'
                } ${language === 'ml' ? 'font-malayalam' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-text-heading)]/30 transition-colors group-focus-within:text-[var(--color-brand-primary)]" />
              <input
                type="text"
                placeholder={t('products.find_spice')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full sm:w-72 rounded-full border border-[var(--color-text-heading)]/10 bg-[var(--color-bg-surface)] py-2.5 pl-11 pr-4 text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-heading)]/30 shadow-sm focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-primary)]/5 transition-all ${language === 'ml' ? 'font-malayalam' : ''}`}
              />
            </div>

            {/* Sort Select */}
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-full border border-[var(--color-text-heading)]/10 bg-[var(--color-bg-surface)] py-2.5 pl-5 pr-11 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-heading)]/60 shadow-sm focus:border-[var(--color-brand-primary)] focus:text-[var(--color-brand-primary)] focus:outline-none transition-all cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {t('products.sort_by')}: {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-text-heading)]/30 pointer-events-none group-hover:text-[var(--color-brand-primary)] transition-colors" />
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!isLoading && (
          <div className="mb-10 flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-heading)]/40 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('products.showing')} {filtered.length} {filtered.length === 1 ? t('products.item') : t('products.items')}
            </span>
            
            <div className="flex items-center gap-4">
              <button className="text-[var(--color-brand-primary)]" aria-label="Grid view">
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button className="text-[var(--color-text-heading)]/30 hover:text-[var(--color-brand-primary)]" aria-label="List view">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="transition-all duration-500">
          <ProductGrid
            products={filtered}
            isLoading={isLoading}
            emptyMessage="No spices match your search. Try a different keyword or category."
          />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-page)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-brand-primary)] border-t-transparent" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
