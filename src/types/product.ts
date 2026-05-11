export interface ProductVariant {
  weight: string;
  price: number;
  sku: string;
}

export type ProductCategory =
  | 'whole-spices'
  | 'ground-spices'
  | 'spice-blends'
  | 'premium'
  | 'essentials';

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  featuredImage?: string;
  images: string[];
  category: ProductCategory;
  tags: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  origin: string;
}
