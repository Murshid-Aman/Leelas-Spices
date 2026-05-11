'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sprout, MapPin, GitBranch, FlameKindling } from 'lucide-react';
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
      <section className="relative overflow-hidden bg-[#F0E6D3] py-16 lg:py-24" id="featured-products">
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
          <div className="mb-12 text-center">
            <h2 className={`text-3xl font-bold text-[#3B2208] sm:text-4xl lg:text-5xl  ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.featured_title')}
            </h2>
            <p className={`mt-3 text-base text-[#3B2208]/50 sm:text-lg ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.featured_desc')}
            </p>
          </div>

          {/* Carousel */}
          <FeaturedProductCarousel products={featuredProducts} />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#F0E6D3] py-20 lg:py-28" id="our-philosophy">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-10 md:grid-cols-[45%_1fr] lg:gap-16">
            {/* Left — Image with quote overlay */}
            <div className="relative min-h-[480px] md:min-h-[560px]">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/philosophy.png"
                  alt="Artisan hand-sorting premium whole spices in warm sunlight"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              {/* Quote overlay — positioned at bottom-right, overlapping image edge */}
              <div className="absolute -bottom-4 right-0 max-w-[220px] rounded-lg bg-[#6B3D1E] px-5 py-4 shadow-lg md:right-[-16px]">
                <p className="text-[13px] italic leading-relaxed text-white/90">
                  &ldquo;We don&apos;t sell spices; we curate moments of sensory clarity.&rdquo;
                </p>
              </div>
            </div>

            {/* Right — Content */}
            <div className="flex flex-col justify-center py-4 md:py-8">
              <span className={`text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3B2208]/40 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {t('home.philosophy_label')}
              </span>

              <h2 className={`mt-6 text-[2.5rem] font-bold leading-[1.08] text-[#3B2208] sm:text-[3rem] lg:text-[3.5rem]  ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {t('home.philosophy_title')}
              </h2>

              <p className="mt-8 max-w-[480px] text-[15px] leading-[1.8] text-[#3B2208]/55">
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
      <section className="bg-[#F0E6D3] py-20 lg:py-28" id="explore-categories">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14 text-center">
            <h2 className={`text-3xl font-bold text-[#3B2208] sm:text-4xl lg:text-5xl  ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.explore_title')}
            </h2>
            <p className={`mt-4 text-base text-[#3B2208]/50 sm:text-lg max-w-2xl mx-auto ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.explore_desc')}
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                title: t('products.whole'),
                subtitle: 'Cardamom, Cloves, Pepper',
                image: '/images/categories/whole-spices.png',
                href: '/products?category=whole-spices',
              },
              {
                title: t('products.ground'),
                subtitle: 'Turmeric, Chilli, Coriander',
                image: '/images/categories/ground-spices.png',
                href: '/products?category=ground-spices',
              },
              {
                title: t('products.blends'),
                subtitle: 'Garam Masala, Special Mixes',
                image: '/images/categories/spice-blends.png',
                href: '/products?category=spice-blends',
              },
            ].map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={category.image}
                    alt={`${category.title} — premium Indian spice collection`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                {/* Label */}
                <div className="mt-5 text-center">
                  <h3 className={`text-xl font-bold text-[#3B2208] sm:text-2xl  ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    {category.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B2208]/40 sm:text-xs">
                    {category.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="bg-[#F0E6D3] py-20 lg:py-28 border-y border-[#3B2208]/10" id="our-promise">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14 text-center">
            <span className={`text-xs font-semibold uppercase tracking-[0.25em] text-[#6B3D1E] ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('home.promise_label')}
            </span>
            <h2 className={`mt-4 text-3xl font-bold text-[#3B2208] sm:text-4xl lg:text-5xl  ${language === 'ml' ? 'font-malayalam' : ''}`}>
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
                className="group flex flex-col items-center rounded-2xl bg-[#F8F1E4] px-6 py-10 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F0E6D3]">
                  <item.icon className="h-6 w-6 text-[#6B3D1E] transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className={`text-lg font-bold text-[#3B2208]  ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {item.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed text-[#3B2208]/50 max-w-[220px] ${language === 'ml' ? 'font-malayalam' : ''}`}>
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
