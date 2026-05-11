'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SPICES = [
  { src: '/images/hero-scroll/star-anise.png', alt: 'Star Anise', size: 180, top: '10%', left: '5%', rotation: -15 },
  { src: '/images/hero-scroll/cinnamon.png', alt: 'Cinnamon Sticks', size: 150, top: '20%', right: '8%', rotation: 25 },
  { src: '/images/hero-scroll/Peppercorn.png', alt: 'Black Peppercorns', size: 120, bottom: '15%', left: '12%', rotation: 10 },
  { src: '/images/hero-scroll/Cardamom.png', alt: 'Green Cardamom', size: 140, bottom: '25%', right: '5%', rotation: -20 },
  { src: '/images/hero-scroll/Fresh_Turmeric.png', alt: 'Turmeric Root', size: 160, top: '45%', left: '2%', rotation: 30 },
  { src: '/images/hero-scroll/star-anise.png', alt: 'Star Anise', size: 130, top: '65%', right: '3%', rotation: -10 },
];

export function FloatingSpices() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const floaters = containerRef.current?.querySelectorAll('.spice-floater');
    if (!floaters) return;

    floaters.forEach((el, i) => {
      gsap.to(el, {
        y: `+=${15 + i * 5}`,
        x: `+=${10 - i * 3}`,
        rotation: `+=${5 + i}`,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {SPICES.map((spice, i) => (
        <div
          key={i}
          className="spice-floater absolute opacity-40 blur-[1px]"
          style={{
            width: spice.size,
            height: spice.size,
            top: spice.top,
            left: spice.left,
            right: spice.right,
            bottom: spice.bottom,
            transform: `rotate(${spice.rotation}deg)`,
          }}
        >
          <Image
            src={spice.src}
            alt={spice.alt}
            fill
            className="object-contain"
            sizes={`${spice.size}px`}
          />
        </div>
      ))}
    </div>
  );
}
