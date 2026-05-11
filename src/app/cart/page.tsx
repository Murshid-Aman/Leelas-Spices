'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';

export default function CartPage() {
  const { items, clearCart, totalItems } = useCart();

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-spice-900 ">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <ShoppingBag className="h-16 w-16 text-spice-300" />
          <h2 className="mt-4 text-xl font-semibold text-spice-700">
            Your cart is empty
          </h2>
          <p className="mt-2 text-spice-500">
            Looks like you haven&apos;t added any spices yet.
          </p>
          <Link href={ROUTES.PRODUCTS} className="mt-6">
            <Button>
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-spice-500">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
              <button
                onClick={clearCart}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
            <div className="divide-y divide-spice-100 rounded-2xl border border-spice-100 bg-[#F8F1E4] p-4">
              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.selectedVariant}`}
                  item={item}
                />
              ))}
            </div>

            <Link
              href={ROUTES.PRODUCTS}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-saffron-600 hover:text-saffron-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
            <Link href={ROUTES.CHECKOUT} className="mt-4 block">
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
