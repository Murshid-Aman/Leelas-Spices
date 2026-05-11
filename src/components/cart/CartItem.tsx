'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const variant = item.product.variants.find(
    (v) => v.weight === item.selectedVariant,
  );
  const price = variant?.price ?? item.product.price;

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-spice-50">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h4 className="text-sm font-semibold text-spice-900">
              {item.product.name}
            </h4>
            <p className="text-xs text-spice-500">{item.selectedVariant}</p>
          </div>
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-spice-400 transition-colors hover:text-red-500"
            aria-label={`Remove ${item.product.name} from cart`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          {/* Quantity controls */}
          <div className="inline-flex items-center rounded-lg border border-spice-200 text-sm">
            <button
              onClick={() =>
                updateQuantity(item.product.id, item.quantity - 1)
              }
              className="px-2 py-1 text-spice-500 hover:text-spice-700"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="min-w-[2rem] text-center font-medium text-spice-900">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.product.id, item.quantity + 1)
              }
              className="px-2 py-1 text-spice-500 hover:text-spice-700"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <span className="font-semibold text-spice-900">
            {formatPrice(price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
