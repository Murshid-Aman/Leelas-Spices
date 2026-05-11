import { ProductType } from '@/types';
import { ProductCard } from './ProductCard';
import { Spinner } from '@/components/ui/Spinner';

interface ProductGridProps {
  products: ProductType[] | undefined;
  isLoading: boolean;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  isLoading,
  emptyMessage = 'No spices found.',
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <span className="text-5xl mb-4">🌿</span>
        <p className="text-lg font-medium text-spice-600">{emptyMessage}</p>
        <p className="text-sm text-spice-400 mt-1">
          Check back later for new arrivals!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
