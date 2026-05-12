'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SLIDES = [
  { id: 1, image: '/images/hero-1.png' },
  { id: 2, image: '/images/hero-2.png' },
];

export function HeroScroll() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const slidesWrapperRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % SLIDES.length;
      handleSlideChange(nextSlide, 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSlideChange = (index: number, forcedDirection?: number) => {
    if (index === currentSlide || isAnimating.current) return;

    const prevIndex = currentSlide;
    setCurrentSlide(index); 
    isAnimating.current = true;
    
    const direction = forcedDirection !== undefined ? forcedDirection : (index > prevIndex ? 1 : -1);
    const slides = slidesWrapperRef.current?.children;
    if (!slides) return;

    const outgoingSlide = slides[prevIndex] as HTMLElement;
    const incomingSlide = slides[index] as HTMLElement;

    if (!outgoingSlide || !incomingSlide) {
      isAnimating.current = false;
      return;
    }

    // Ensure both are visible before animation
    gsap.set(incomingSlide, { 
      xPercent: 100 * direction, 
      opacity: 1,
      visibility: 'visible',
      zIndex: 10 
    });
    gsap.set(outgoingSlide, { 
      zIndex: 5,
      visibility: 'visible'
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(outgoingSlide, { opacity: 0, visibility: 'hidden' });
        isAnimating.current = false;
      }
    });

    tl.to(outgoingSlide, {
      xPercent: -100 * direction,
      duration: 1.2,
      ease: 'power3.inOut'
    });

    tl.to(incomingSlide, {
      xPercent: 0,
      duration: 1.2,
      ease: 'power3.inOut'
    }, 0);
  };

  // Initial setup and spinning badge
  useGSAP(() => {
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: 'none',
      });
    }

    // Set initial visibility of slides
    if (slidesWrapperRef.current) {
      const slides = slidesWrapperRef.current.children;
      gsap.set(slides, { opacity: 0, visibility: 'hidden', xPercent: 0 });
      gsap.set(slides[0], { opacity: 1, visibility: 'visible' });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-[var(--color-bg-dark)]" id="hero-carousel">
      {/* ── IMAGE SLIDES ── */}
      <div ref={slidesWrapperRef} className="relative h-full w-full">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`${i === 0 ? 'relative' : 'absolute inset-0'} w-full overflow-hidden`}
          >
            <Image
              src={slide.image}
              alt=""
              width={1920}
              height={800}
              className="w-full h-auto block"
              priority={i === 0}
              onError={(e) => {
                // Fallback to a placeholder if the local file is missing
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop';
              }}
            />
          </div>
        ))}
      </div>

      {/* ── CAROUSEL INDICATORS ── */}
      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleSlideChange(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              currentSlide === i ? 'w-10 bg-white' : 'w-3 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── SPINNING BUY NOW BADGE ── */}
      <div className="absolute bottom-6 right-6 z-[40] sm:bottom-10 sm:right-10">
        <div className="relative flex h-[80px] w-[80px] items-center justify-center sm:h-[95px] sm:w-[95px]">
          <div ref={badgeRef} className="absolute inset-0">
            <svg viewBox="0 0 110 110" className="h-full w-full">
              <defs>
                <path id="badge-circle" d="M 55,55 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
              </defs>
              <text className="fill-white text-[12px] font-bold uppercase tracking-[0.3em]">
                <textPath href="#badge-circle">
                  ★ BUY NOW ★ SHOP LEELAS ★ BUY NOW ★ SHOP LEELAS
                </textPath>
              </text>
            </svg>
          </div>
          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
