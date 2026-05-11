import { ProductType } from '@/types';
import { MOCK_PRODUCTS } from './mockData';

/**
 * Fetch all products. Currently returns mock data.
 * Replace with axiosInstance call when backend is ready.
 */
export async function getProducts(): Promise<ProductType[]> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_PRODUCTS;
}

/**
 * Fetch a single product by slug. Currently returns mock data.
 */
export async function getProductBySlug(
  slug: string,
): Promise<ProductType | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Fetch products by category.
 */
export async function getProductsByCategory(
  category: string,
): Promise<ProductType[]> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_PRODUCTS.filter((p) => p.category === category);
}

/**
 * Fetch featured products.
 */
export async function getFeaturedProducts(): Promise<ProductType[]> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_PRODUCTS.filter((p) => p.isFeatured && !p.image.includes('placeholder.png'));
}
