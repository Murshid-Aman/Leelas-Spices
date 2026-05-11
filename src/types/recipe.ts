export type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface RecipeType {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  calories: string;
  time: string;
  difficulty: RecipeDifficulty;
  likes: string;
  views: string;
  isNew?: boolean;
}
