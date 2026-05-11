'use client';

import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/constants';

export function CartSummary() {
  const { totalPrice, totalItems } = useCart();

  const shippingCost =
    totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = totalPrice + shippingCost;

  return (
    <div className="rounded-2xl border border-spice-100 bg-spice-50/50 p-6">
      <h3 className="text-lg font-bold text-spice-900 ">
        Order Summary
      </h3>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-spice-600">
            Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </span>
          <span className="font-medium text-spice-900">
            {formatPrice(totalPrice)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-spice-600">Shipping</span>
          <span className="font-medium text-spice-900">
            {shippingCost === 0 ? (
              <span className="text-emerald-600">FREE</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>

        {totalPrice < FREE_SHIPPING_THRESHOLD && totalPrice > 0 && (
          <div className="rounded-xl bg-saffron-50 p-3">
            <p className="text-xs text-saffron-700">
              🚚 Add{' '}
              <span className="font-semibold">
                {formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)}
              </span>{' '}
              more for free shipping!
            </p>
            <div className="mt-2 h-1.5 rounded-full bg-saffron-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-curry-500 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (totalPrice / FREE_SHIPPING_THRESHOLD) * 100,
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="border-t border-spice-200 pt-3">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-spice-900">
              Total
            </span>
            <span className="text-xl font-bold text-spice-900">
              {formatPrice(orderTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
