'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    quote: '"The aroma took me straight back to my grandmother\'s kitchen."',
    name: 'Vikram S.',
    role: 'VERIFIED BUYER',
    avatar: '/images/testimonials/vikram.png',
    stars: 4,
  },
  {
    quote: '"Their cardamom is on another level. Rich, bold, and incredibly fragrant."',
    name: 'Anjali M.',
    role: 'HOME COOK',
    avatar: '/images/testimonials/anjali.png',
    stars: 5,
  },
  {
    quote: '"You can actually taste the freshness — nothing like store-bought spices."',
    name: 'Elena R.',
    role: 'FOOD CRITIC',
    avatar: '/images/testimonials/elena.png',
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-[var(--color-bg-muted)] py-20 lg:py-28 overflow-hidden" id="community-testimonials">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-green-deep)]">
            Our Community
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[var(--color-text-heading)] sm:text-4xl lg:text-5xl ">
            What Our Community Says
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-heading)]/50 sm:text-lg max-w-xl mx-auto">
            Real stories from passionate cooks and spice lovers.
          </p>
        </div>

        {/* Testimonial Cards — Scattered Layout */}
        <div className="relative mx-auto max-w-[900px] min-h-[480px] sm:min-h-[520px]">
          {/* Card 1 — Left, tilted */}
          <div
            className="absolute left-0 top-6 sm:top-8 w-[260px] sm:w-[290px] z-10 transition-transform duration-500 hover:scale-105 hover:z-30"
            style={{ transform: 'rotate(-6deg)' }}
          >
            <div className="rounded-2xl bg-[var(--color-bg-surface)] p-6 shadow-lg">
              {/* Stars */}
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: testimonials[0].stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-saffron-400 text-saffron-400"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-text-heading)]/70 italic">
                {testimonials[0].quote}
              </p>
              <div className="mt-5 flex items-center gap-3">
                {testimonials[0].avatar && (
                  <div className="relative h-9 w-9 overflow-hidden rounded-full">
                    <Image
                      src={testimonials[0].avatar}
                      alt={testimonials[0].name}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-[var(--color-text-heading)]">
                    {testimonials[0].name}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-heading)]/40">
                    {testimonials[0].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Center, prominent */}
          <div
            className="absolute left-1/2 top-1/2 w-[280px] sm:w-[320px] z-20 transition-transform duration-500 hover:scale-105 hover:z-30"
            style={{ transform: 'translate(-50%, -50%) rotate(1deg)' }}
          >
            <div className="rounded-2xl bg-[var(--color-bg-surface)] p-7 sm:p-8 shadow-xl border border-saffron-200/40">
              <p className="text-base sm:text-lg leading-relaxed text-[var(--color-text-heading)] font-medium">
                {testimonials[1].quote}
              </p>
              {/* Decorative quotation mark */}
              <div className="absolute top-5 right-6 text-saffron-300/60 text-5xl  leading-none select-none">
                &rdquo;
              </div>
              <div className="mt-6 flex items-center gap-3">
                {testimonials[1].avatar && (
                  <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-saffron-200">
                    <Image
                      src={testimonials[1].avatar}
                      alt={testimonials[1].name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                )}
                <div>
                  <p className="text-base font-bold text-[var(--color-text-heading)]">
                    {testimonials[1].name}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-heading)]/40">
                    {testimonials[1].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 — Right, tilted */}
          <div
            className="absolute right-0 bottom-4 sm:bottom-0 w-[250px] sm:w-[280px] z-10 transition-transform duration-500 hover:scale-105 hover:z-30"
            style={{ transform: 'rotate(4deg)' }}
          >
            <div className="rounded-2xl bg-[var(--color-bg-surface)] p-6 shadow-lg">
              {/* Stars */}
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: testimonials[2].stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-saffron-400 text-saffron-400"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-text-heading)]/70 italic">
                {testimonials[2].quote}
              </p>
              <div className="mt-5">
                <p className="text-sm font-bold text-[var(--color-text-heading)]">
                  {testimonials[2].name}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-heading)]/40">
                  {testimonials[2].role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
