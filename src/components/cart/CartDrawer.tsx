'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { ROUTES, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    totalPrice,
    totalItems,
    updateQuantity,
    removeItem,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  const shippingLabel =
    totalPrice >= FREE_SHIPPING_THRESHOLD
      ? 'FREE'
      : `Free over ${formatPrice(FREE_SHIPPING_THRESHOLD)}`;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel — slides from right */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-[#FDFAF5] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* ─── Header ─── */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[#3B2208]/10">
          <div>
            <h2 className="text-2xl font-bold text-[#3B2208] ">
              Your Cart
            </h2>
            <p className="mt-0.5 text-xs uppercase tracking-wider text-[#3B2208]/40 font-medium">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in curation
            </p>
          </div>
          <button
            onClick={closeCart}
            className="rounded-lg p-1.5 text-[#3B2208]/40 transition-colors hover:bg-[#3B2208]/5 hover:text-[#3B2208]"
            aria-label="Close cart"
            id="close-cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ─── Cart Items ─── */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#3B2208]/5">
                <span className="text-4xl">🛒</span>
              </div>
              <p className="mt-4 text-lg font-semibold text-[#3B2208]">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-[#3B2208]/45">
                Add some aromatic spices to get started!
              </p>
              <button
                onClick={closeCart}
                className="mt-6 inline-flex h-10 items-center justify-center rounded-full border-2 border-[#6B3D1E] px-6 text-xs font-bold uppercase tracking-wider text-[#6B3D1E] transition-all hover:bg-[#6B3D1E]/5"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* Item list */
            <div className="space-y-0 divide-y divide-[#3B2208]/8">
              {items.map((item) => {
                const variant = item.product.variants.find(
                  (v) => v.weight === item.selectedVariant,
                );
                const price = variant?.price ?? item.product.price;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedVariant}`}
                    className="flex gap-4 py-5 first:pt-0"
                  >
                    {/* Product image */}
                    <div className="relative h-[80px] w-[80px] flex-shrink-0 overflow-hidden rounded-xl bg-[#F0E6D3]">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Info + controls */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#3B2208] leading-tight">
                            {item.product.name}
                          </h4>
                          <p className="mt-0.5 text-xs text-[#3B2208]/45">
                            {item.selectedVariant}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-2 p-1 text-[#3B2208]/25 transition-colors hover:text-red-500"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="inline-flex items-center rounded-lg border border-[#3B2208]/12 bg-[#F8F1E4]">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="px-2.5 py-1.5 text-[#3B2208]/40 hover:text-[#3B2208] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[1.75rem] text-center text-sm font-semibold text-[#3B2208]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="px-2.5 py-1.5 text-[#3B2208]/40 hover:text-[#3B2208] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Item price */}
                        <span className="text-base font-bold text-[#3B2208]">
                          {formatPrice(price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── Footer (only when items exist) ─── */}
        {items.length > 0 && (
          <div className="border-t border-[#3B2208]/10 px-6 py-5 space-y-4">
            {/* Coupon Code */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#3B2208]/40">
                Curation Code
              </label>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 rounded-lg border border-[#3B2208]/12 bg-[#F8F1E4] px-3.5 py-2 text-sm text-[#3B2208] placeholder:text-[#3B2208]/30 focus:border-[#6B3D1E]/40 focus:outline-none focus:ring-1 focus:ring-[#6B3D1E]/20"
                  id="coupon-code-input"
                />
                <button className="text-xs font-bold uppercase tracking-wider text-[#6B3D1E] hover:text-[#5A3218] transition-colors px-1">
                  Apply
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#3B2208]/55">Subtotal</span>
                <span className="font-semibold text-[#3B2208]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#3B2208]/55">Shipping</span>
                <span className="font-medium text-[#3B2208]/55 italic text-xs">
                  {shippingLabel}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-2 border-t border-[#3B2208]/8">
              <span className="text-base font-semibold text-[#3B2208]">
                Total
              </span>
              <span className="text-2xl font-bold text-[#3B2208]">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 pt-1">
              <Link href={ROUTES.CHECKOUT} onClick={closeCart} className="block">
                <button className="w-full h-12 rounded-full bg-[#6B3D1E] text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#5A3218] active:scale-[0.98]">
                  Proceed to Checkout
                </button>
              </Link>
              <Link href={ROUTES.CART} onClick={closeCart} className="block">
                <button className="w-full h-11 rounded-full border-2 border-[#3B2208]/15 bg-[#F8F1E4] text-sm font-bold uppercase tracking-wider text-[#3B2208] transition-all hover:bg-[#3B2208]/5 active:scale-[0.98]">
                  View Detailed Cart
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
