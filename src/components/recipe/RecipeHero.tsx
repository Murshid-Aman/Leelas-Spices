'use client';

import { Plus } from 'lucide-react';

export function RecipeHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-text-heading)] to-[var(--color-brand-primary)] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg shadow-amber-900/20">
      <div className="flex flex-col items-center md:items-start text-center md:text-left z-10">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
          Got a Recipe <br className="hidden md:block" /> That Rocks?
        </h1>
        <p className="text-amber-50 text-sm md:text-base mb-8 max-w-md opacity-90">
          Share it & Shine! Your recipe might just become the next big hit!
        </p>
        
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider">
            Gain Recognition
          </span>
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider">
            Inspire Others
          </span>
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider">
            Showcase Your Skills
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated Emoji Container */}
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/20 group-hover:scale-110 transition-transform duration-500">
             <span className="text-6xl md:text-7xl animate-bounce">🌶️</span>
          </div>
          {/* Decorative sparks */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-amber-300 rounded-full animate-pulse" />
        </div>
        <button className="bg-white text-[var(--color-brand-primary)] font-bold px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300">
          <Plus size={20} />
          Add Recipe
        </button>
      </div>

      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
    </div>
  );
}
