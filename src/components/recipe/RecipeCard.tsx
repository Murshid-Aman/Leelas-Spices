'use client';

import Image from 'next/image';
import { Flame, Clock, Heart, Eye, MoreVertical } from 'lucide-react';
import { RecipeType } from '@/types';

interface RecipeCardProps {
  recipe: RecipeType;
  featured?: boolean;
}

export function RecipeCard({ recipe, featured = false }: RecipeCardProps) {
  return (
    <div className={`group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col ${featured ? 'md:rotate-[-2deg]' : ''}`}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {recipe.isNew && (
          <span className="absolute top-4 left-4 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            New
          </span>
        )}
        <button className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-[#3B2208] line-clamp-1 group-hover:text-[#6B3D1E] transition-colors">
            {recipe.title}
          </h3>
        </div>
        
        <p className="text-xs text-[#3B2208]/60 line-clamp-2 mb-4 leading-relaxed">
          {recipe.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-[#F8F1E4] text-[#6B3D1E] text-[10px] font-semibold px-3 py-1 rounded-lg">
            {recipe.category}
          </span>
          <span className="bg-[#F8F1E4] text-[#6B3D1E]/70 text-[10px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
            <Flame size={10} /> {recipe.calories}
          </span>
          <span className="bg-[#F8F1E4] text-[#6B3D1E]/70 text-[10px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
            <Clock size={10} /> {recipe.time}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-[#F0E6D3] flex items-center justify-between">
          <div className="flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            {recipe.difficulty}
          </div>
          <div className="flex items-center gap-3 text-[#3B2208]/40 text-[11px] font-semibold">
            <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors">
              <Heart size={12} /> {recipe.likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} /> {recipe.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
