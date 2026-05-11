'use client';

import { RecipeHero } from '@/components/recipe/RecipeHero';
import { RecipeStats } from '@/components/recipe/RecipeStats';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { RECOMMENDED_RECIPES, POPULAR_RECIPES } from '@/lib/api/recipeData';
import { ChefHat, Trophy } from 'lucide-react';

export default function RecipesPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF5] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 mb-16">
          <RecipeHero />
          <div className="hidden lg:block">
            <RecipeStats />
          </div>
        </div>

        {/* Recommended Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
             <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <ChefHat className="text-orange-600" size={24} />
             </div>
             <h2 className="text-3xl font-black text-[#3B2208]">Recommended</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {RECOMMENDED_RECIPES.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} featured={recipe.difficulty === 'Hard'} />
            ))}
          </div>
        </section>

        {/* Popular Section */}
        <section>
          <div className="flex items-center gap-3 mb-10">
             <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <Trophy className="text-yellow-600" size={24} />
             </div>
             <h2 className="text-3xl font-black text-[#3B2208]">Popular</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {POPULAR_RECIPES.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
            {/* Duplicate some for effect if needed, but we have 4 already */}
          </div>
        </section>
      </div>
    </main>
  );
}
