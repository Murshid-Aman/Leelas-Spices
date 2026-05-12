'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sprout, MapPin, GitBranch, FlameKindling, Leaf, Sparkles, Wind, Star } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { getFeaturedProducts } from '@/lib/api';
import { ProductType } from '@/types';
import { Button } from '@/components/ui/Button';
import { FeaturedProductCarousel } from '@/components/product/FeaturedProductCarousel';
import { PhilosophyStats } from '@/components/ui/PhilosophyStats';
import { Testimonials } from '@/components/ui/Testimonials';
import { HeroScroll } from '@/components/ui/HeroScroll';
import { useTranslation } from '@/context/LanguageContext';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const { t, language } = useTranslation();

  useEffect(() => {
    getFeaturedProducts().then(setFeaturedProducts);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Scroll — Anti-Gravity Section */}
      <HeroScroll />

      {/* Featured Products */}
      <section className="relative overflow-hidden bg-[var(--color-bg-muted)] py-12 lg:py-16" id="featured-products">
        {/* Pattern background overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'url(/images/spice-pattern-bg.png)',
            backgroundSize: '600px',
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <h2 className={`text-2xl font-bold text-[var(--color-text-heading)] sm:text-3xl lg:text-4xl  ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.featured_title')}
            </h2>
            <p className={`mt-2 text-sm text-[var(--color-text-heading)]/50 sm:text-base ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.featured_desc')}
            </p>
          </div>

          {/* Carousel */}
          <FeaturedProductCarousel products={featuredProducts} />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[var(--color-bg-surface)] py-12 lg:py-16" id="our-philosophy">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-[45%_1fr] lg:gap-16">
            {/* Left — Image with unique shape & circular quote */}
            <div className="relative">
              {/* Decorative Leaf Icon (top-left) */}
              <div className="absolute -left-8 -top-8 z-10 hidden lg:block opacity-10">
                <Leaf className="h-32 w-32 text-[var(--color-text-heading)] rotate-[-45deg]" strokeWidth={0.5} />
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-bl-2xl rounded-tr-2xl rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] shadow-xl">
                <Image
                  src="/images/philosophy.png"
                  alt="Artisan hand-sorting premium whole spices in warm sunlight"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>

              {/* Circular Quote overlay — positioned at bottom-right */}
              <div className="absolute -bottom-8 -right-4 flex h-44 w-44 items-center justify-center rounded-full bg-[var(--color-text-heading)] p-6 text-center shadow-xl md:-right-8 md:h-52 md:w-52">
                {/* Leaf icon inside quote */}
                <div className="absolute top-6">
                  <Leaf className="h-4 w-4 text-white/20" />
                </div>
                <p className="text-[12px] font-medium italic leading-relaxed text-white/90 md:text-[14px]">
                  &ldquo;We don&apos;t sell spices; we curate moments of sensory clarity.&rdquo;
                </p>
                {/* Outer ring decoration */}
                <div className="absolute inset-2 rounded-full border border-white/10" />
              </div>

              {/* Decorative Leaf Icon (bottom-left) */}
              <div className="absolute -bottom-12 -left-12 z-10 hidden lg:block opacity-10">
                <Leaf className="h-40 w-40 text-[var(--color-text-heading)] rotate-[15deg]" strokeWidth={0.5} />
              </div>
            </div>

            {/* Right — Content */}
            <div className="flex flex-col py-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-[var(--color-text-heading)]/40" />
                <span className={`text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-text-heading)]/40 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {t('home.philosophy_label')}
                </span>
              </div>

              <h2 className={`mt-3 max-w-lg text-[2.25rem] font-bold leading-[1.1] text-[var(--color-text-heading)] sm:text-[2.75rem] lg:text-[3rem] font-serif ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {t('home.philosophy_title')}
              </h2>

              <div className="mt-6 h-1 w-10 bg-[var(--color-text-heading)]/20" />

              <p className="mt-8 max-w-[500px] text-[15px] leading-[1.7] text-[var(--color-text-heading)]/60">
                Every spice begins its story at the source. From the highlands
                of Kerala to carefully curated farms, we handpick ingredients at
                their peak and preserve their natural essence. Through
                thoughtful sourcing and meticulous processing, we bring you
                spices that are rich in aroma, purity, and character.
              </p>

              {/* Stats */}
              <PhilosophyStats />
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Spices */}
      <section className="bg-[var(--color-bg-page-alt)] py-16 lg:py-24" id="explore-categories">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Leaf className="h-3.5 w-3.5 text-[var(--color-text-heading)]/40" />
              <span className={`text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--color-text-heading)]/40 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                EXPLORE OUR SPICES
              </span>
            </div>
            <h2 className={`text-3xl font-bold text-[var(--color-text-heading)] sm:text-4xl lg:text-5xl font-serif ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.explore_title')}
            </h2>
            <p className={`mt-4 text-sm text-[var(--color-text-heading)]/50 sm:text-base max-w-2xl mx-auto ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.explore_desc')}
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid gap-x-8 gap-y-20 md:grid-cols-3 pt-20">
            {[
              {
                title: t('products.whole'),
                label: 'Artisan',
                desc: 'Carefully handpicked whole spices that lock in natural oils and bold aromas.',
                image: '/images/categories/whole.png',
                href: '/products?category=whole-spices',
                color: 'bg-[var(--color-green-primary)]',
                btnTextColor: 'text-[var(--color-green-primary)]'
              },
              {
                title: t('products.ground'),
                label: 'Finely',
                desc: 'Finely ground for rich color, depth, and flavor that elevates every recipe.',
                image: '/images/categories/powder.png',
                href: '/products?category=ground-spices',
                color: 'bg-[var(--color-text-heading)]',
                btnTextColor: 'text-[var(--color-text-heading)]'
              },
              {
                title: t('products.blends'),
                label: 'Signature',
                desc: 'Expertly balanced spice blends crafted for authentic, unforgettable taste.',
                image: '/images/categories/powder.png',
                href: '/products?category=spice-blends',
                color: 'bg-[var(--color-green-primary)]',
                btnTextColor: 'text-[var(--color-green-primary)]'
              },
            ].map((category) => (
              <div
                key={category.title}
                className="group relative flex flex-col transition-all duration-500 hover:-translate-y-2"
              >
                {/* Background Card */}
                <div className={`absolute inset-0 top-12 rounded-[2rem] ${category.color} shadow-xl z-0`} />

                {/* Floating Spice Image */}
                <div className="relative -mt-24 mb-4 self-center w-full aspect-[16/12] transition-transform duration-700 group-hover:scale-110 z-20">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Content Section */}
                <div className="relative z-10 flex flex-1 flex-col px-8 pb-10">
                  <span className="text-[22px] font-medium text-white/90 italic font-serif leading-none tracking-tight">
                    {category.label}
                  </span>
                  <h3 className={`mt-1 text-3xl font-extrabold text-white tracking-tight ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    {category.title}
                  </h3>

                  <div className="mt-6 mb-8 h-px w-full bg-white/10" />

                  <p className="mb-10 text-[14px] leading-relaxed text-white/80 line-clamp-3 font-medium">
                    {category.desc}
                  </p>

                  <div className="mt-auto">
                    <Link
                      href={category.href}
                      className={`bg-white ${category.btnTextColor} inline-flex h-12 items-center justify-center rounded-full px-10 text-[11px] font-extrabold uppercase tracking-[0.25em] transition-all duration-300 hover:shadow-lg hover:bg-white/90 active:scale-95 shadow-md`}
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="bg-[var(--color-bg-muted)] py-16 lg:py-24 border-y border-[var(--color-text-heading)]/10" id="our-promise">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className={`text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-brand-primary)] ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.promise_label')}
            </span>
            <h2 className={`mt-3 text-2xl font-bold text-[var(--color-text-heading)] sm:text-3xl lg:text-4xl  ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.promise_title')}
            </h2>
          </div>

          {/* Promise Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Sprout,
                title: language === 'ml' ? '100% പ്രകൃതിദത്തം' : '100% Natural',
                desc: language === 'ml' ? 'മായമില്ലാത്ത, പ്രകൃതിദത്തമായ മസാലകൾ.' : 'No additives, no artificial colors. Just pure, unaltered spices.',
              },
              {
                icon: MapPin,
                title: language === 'ml' ? 'നേരിട്ടുള്ള ശേഖരണം' : 'Source Driven',
                desc: language === 'ml' ? 'മികച്ച കൃഷിയിടങ്ങളിൽ നിന്ന് നേരിട്ട്.' : 'Carefully selected from trusted farms across rich growing regions.',
              },
              {
                icon: GitBranch,
                title: language === 'ml' ? 'ഗുണമേന്മയുള്ളവ' : 'Fully Traceable',
                desc: language === 'ml' ? 'ഓരോ മസാലയുടെയും ചരിത്രം അറിയാം.' : 'Every spice has a story you can trace back to its origin.',
              },
              {
                icon: FlameKindling,
                title: language === 'ml' ? 'പരിമിതമായ ബാച്ചുകൾ' : 'Small Batch Crafted',
                desc: language === 'ml' ? 'പുതുമ നിലനിർത്താൻ ചെറിയ ബാച്ചുകളായി.' : 'Processed in limited quantities to preserve freshness and aroma.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group flex flex-col items-center rounded-2xl bg-[var(--color-bg-surface)] px-6 py-10 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-muted)]">
                  <item.icon className="h-6 w-6 text-[var(--color-brand-primary)] transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className={`text-lg font-bold text-[var(--color-text-heading)]  ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {item.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed text-[var(--color-text-heading)]/50 max-w-[220px] ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <Testimonials />
    </div>
  );
}
