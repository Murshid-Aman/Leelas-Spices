'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { ROUTES } from '@/lib/constants';
import { ArrowRight, Leaf, Sprout, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  const { t, language } = useTranslation();

  return (
    <div className="flex flex-col bg-[var(--color-bg-page)]">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden sm:h-[80vh]">
        <Image
          src="/images/about/hero.png"
          alt="Premium Spices"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 px-6 text-center">
          <h1 className={` text-4xl font-bold text-white md:text-7xl lg:text-8xl ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {t('about.title')}
          </h1>
          <p className={`mt-4 max-w-2xl text-base font-medium text-white/90 md:text-xl lg:text-2xl ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="mx-auto max-w-[1600px] px-4 py-24 md:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className={`text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-brand-primary)] ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('about.story_title')}
            </span>
            <h2 className={`mt-4  text-4xl font-bold text-[var(--color-text-heading)] md:text-5xl ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'en' ? "A Journey from Kerala's Heart" : "കേരളത്തിന്റെ ഹൃദയത്തിൽ നിന്നൊരു യാത്ര"}
            </h2>
            <p className={`mt-8 text-lg leading-relaxed text-[var(--color-text-heading)]/70 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {t('about.story_text')}
            </p>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-[var(--color-brand-primary)]">40+</span>
                <span className={`text-xs font-bold uppercase tracking-wider text-[var(--color-text-heading)]/50 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {language === 'en' ? 'Years of Excellence' : 'വർഷത്തെ മികവ്'}
                </span>
              </div>
              <div className="h-px w-full bg-[var(--color-text-heading)]/10 sm:h-12 sm:w-px" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-[var(--color-brand-primary)]">100%</span>
                <span className={`text-xs font-bold uppercase tracking-wider text-[var(--color-text-heading)]/50 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {language === 'en' ? 'Pure & Natural' : 'ശുദ്ധവും പ്രകൃതിദത്തവും'}
                </span>
              </div>
              <div className="h-px w-full bg-[var(--color-text-heading)]/10 sm:h-12 sm:w-px" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-[var(--color-brand-primary)]">50+</span>
                <span className={`text-xs font-bold uppercase tracking-wider text-[var(--color-text-heading)]/50 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {language === 'en' ? 'Artisanal Blends' : 'മസാലക്കൂട്ടുകൾ'}
                </span>
              </div>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[40px] shadow-2xl">
            <Image
              src="/images/about/process.png"
              alt="Traditional Grinding Process"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="bg-[var(--color-bg-muted)] py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-4 text-center">
          <h2 className={` text-4xl font-bold text-[var(--color-text-heading)] md:text-5xl ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {t('about.philosophy_title')}
          </h2>
          <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Value 1 */}
            <div className="flex flex-col items-center group">
              <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-[var(--color-bg-surface)] shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                <Image
                  src="/images/about/value-1.png"
                  alt={t('about.value1_title')}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className={`mt-8 text-xl font-bold text-[var(--color-text-heading)] ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {t('about.value1_title')}
              </h3>
              <p className={`mt-4 max-w-xs text-[var(--color-text-heading)]/60 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {t('about.value1_desc')}
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center group">
              <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-[var(--color-bg-surface)] shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                <Image
                  src="/images/about/value-2.png"
                  alt={t('about.value2_title')}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className={`mt-8 text-xl font-bold text-[var(--color-text-heading)] ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {t('about.value2_title')}
              </h3>
              <p className={`mt-4 max-w-xs text-[var(--color-text-heading)]/60 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {t('about.value2_desc')}
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center group">
              <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-[var(--color-bg-surface)] shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                <Image
                  src="/images/about/value-3.png"
                  alt={t('about.value3_title')}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className={`mt-8 text-xl font-bold text-[var(--color-text-heading)] ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {t('about.value3_title')}
              </h3>
              <p className={`mt-4 max-w-xs text-[var(--color-text-heading)]/60 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {t('about.value3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANTATION / SOURCING ── */}
      <section className="relative h-[50vh] min-h-[450px] w-full overflow-hidden sm:h-[60vh]">
        <Image
          src="/images/about/farm.png"
          alt="Kerala Spice Plantation"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent sm:from-black/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8">
            <div className="max-w-xl text-white">
              <h2 className={` text-3xl font-bold sm:text-4xl md:text-5xl ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {language === 'en' ? 'From Soil to Soul' : 'മണ്ണിൽ നിന്ന് മനസ്സിലേക്ക്'}
              </h2>
              <p className={`mt-6 text-base text-white/80 sm:text-lg ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {language === 'en' 
                  ? 'We source our spices from the mist-covered hills of Wayanad and Idukki, where the soil is rich and the air is pure. Every harvest is hand-picked at its peak to ensure the flavors you taste are exactly as nature intended.'
                  : 'വയനാട്ടിലെയും ഇടുക്കിയിലെയും മഞ്ഞുപൊതിഞ്ഞ കുന്നുകളിൽ നിന്നാണ് ഞങ്ങൾ മസാലകൾ ശേഖരിക്കുന്നത്. പ്രകൃതി ഉദ്ദേശിച്ച അതേ രുചി നിങ്ങൾക്ക് ലഭിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കാൻ ഓരോ വിളവെടുപ്പും അതിന്റെ ഉച്ചസ്ഥായിയിൽ തന്നെ കൈകൊണ്ട് തിരഞ്ഞെടുക്കുന്നു.'}
              </p>
              <Link 
                href={ROUTES.PRODUCTS}
                className={`mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--color-brand-primary)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[var(--color-brand-primary)] ${language === 'ml' ? 'font-malayalam' : ''}`}
              >
                {t('about.shop_now')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL QUOTE ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="flex justify-center text-[var(--color-brand-primary)]">
            <span className="text-6xl">&ldquo;</span>
          </div>
          <blockquote className={`-mt-6  text-3xl italic leading-relaxed text-[var(--color-text-heading)] md:text-4xl ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {language === 'en'
              ? 'Our spices are more than just ingredients; they are the memories of a home, the warmth of a tradition, and the heartbeat of Kerala.'
              : 'ഞങ്ങളുടെ മസാലകൾ വെറും ചേരുവകളല്ല; അവ ഒരു വീടിന്റെ ഓർമ്മകളാണ്, ഒരു പാരമ്പര്യത്തിന്റെ ഊഷ്മളതയാണ്, കേരളത്തിന്റെ ഹൃദയമിടിപ്പാണ്.'}
          </blockquote>
          <div className="mt-8 flex flex-col items-center">
            <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-full border-4 border-[var(--color-brand-primary)]/10 shadow-lg">
              <Image
                src="/images/about/founder.png"
                alt="Leela Amma"
                fill
                className="object-cover"
              />
            </div>
            <div className="h-12 w-px bg-[var(--color-brand-primary)]/20" />
            <cite className={`mt-4 text-lg font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)] not-italic ${language === 'ml' ? 'font-malayalam' : ''}`}>
              Leela Amma
            </cite>
            <span className={`text-xs font-medium text-[var(--color-text-heading)]/40 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              Founder, Leela&apos;s Spices
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
