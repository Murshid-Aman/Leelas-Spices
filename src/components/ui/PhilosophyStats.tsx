'use client';

import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Mountain, Leaf, FlaskConical } from 'lucide-react';

export function PhilosophyStats() {
  const stats = [
    {
      icon: Mountain,
      value: 12,
      suffix: '',
      label: 'TERROIRS',
      desc: 'Diverse regions, exceptional origin',
    },
    {
      icon: Leaf,
      value: 100,
      suffix: '%',
      label: 'TRACEABLE',
      desc: 'From farm to you, complete transparency',
    },
    {
      icon: FlaskConical,
      value: 0,
      suffix: '%',
      label: 'ADDITIVES',
      desc: 'Pure spices, nothing added',
    },
  ];

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center rounded-xl bg-[var(--color-bg-page-alt)] p-6 text-center transition-all duration-300 hover:shadow-lg border border-[var(--color-text-heading)]/5"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-text-heading)]/5 text-[var(--color-text-heading)]/70">
            <stat.icon className="h-5 w-5" strokeWidth={1.2} />
          </div>
          <div className="flex items-baseline justify-center">
            <AnimatedCounter
              end={stat.value}
              suffix={stat.suffix}
              duration={2000 + idx * 200}
              className="text-3xl font-bold text-[var(--color-text-heading)]"
            />
          </div>
          <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-heading)]/60">
            {stat.label}
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-text-heading)]/40 max-w-[140px]">
            {stat.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
