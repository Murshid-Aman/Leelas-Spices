'use client';

import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export function PhilosophyStats() {
  return (
    <div className="mt-12 flex items-start gap-0">
      <div className="flex-1 text-center">
        <AnimatedCounter
          end={12}
          duration={2000}
          className="text-[1.75rem] font-bold text-[#3B2208] sm:text-[2rem] "
        />
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B3D1E]/50 sm:text-[11px]">
          Terroirs
        </p>
      </div>
      <div className="w-px self-stretch bg-[#3B2208]/15" />
      <div className="flex-1 text-center">
        <AnimatedCounter
          end={100}
          suffix="%"
          duration={2200}
          className="text-[1.75rem] font-bold text-[#3B2208] sm:text-[2rem] "
        />
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B3D1E]/50 sm:text-[11px]">
          Traceable
        </p>
      </div>
      <div className="w-px self-stretch bg-[#3B2208]/15" />
      <div className="flex-1 text-center">
        <AnimatedCounter
          end={0}
          suffix="%"
          duration={1500}
          className="text-[1.75rem] font-bold text-[#3B2208] sm:text-[2rem] "
        />
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B3D1E]/50 sm:text-[11px]">
          Additives
        </p>
      </div>
    </div>
  );
}
