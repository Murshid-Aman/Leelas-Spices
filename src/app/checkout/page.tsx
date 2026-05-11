'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, ShieldCheck, CreditCard } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { ROUTES, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, totalItems, totalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingLabel =
    totalPrice >= FREE_SHIPPING_THRESHOLD ? 'Complimentary' : formatPrice(49);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    alert('Order placed successfully! (Demo)');
  };

  /* ── Empty Cart State ── */
  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FDFAF5] px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#3B2208]/5">
          <span className="text-4xl">🛒</span>
        </div>
        <h1 className="mt-5 text-2xl font-bold text-[#3B2208] ">Your cart is empty</h1>
        <p className="mt-2 text-sm text-[#3B2208]/45">Add some spices before checking out.</p>
        <Link
          href={ROUTES.PRODUCTS}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#6B3D1E] px-8 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#5A3218] transition-all"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-[#3B2208]  sm:text-4xl italic">
          Secure your sensory passage
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* ═══════════════════════════
                LEFT: Form Sections
                ═══════════════════════════ */}
            <div className="space-y-10">
              {/* ── 1. Delivery Details ── */}
              <section>
                <h2 className="flex items-center gap-2 text-lg font-bold text-[#6B3D1E] ">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6B3D1E]/10 text-xs font-bold text-[#6B3D1E]">1</span>
                  Delivery Details
                </h2>

                <div className="mt-6 space-y-5">
                  {/* Email */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">Email Address</label>
                    <input
                      type="email"
                      placeholder="curator@atelier.com"
                      required
                      className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                      id="checkout-email"
                    />
                  </div>

                  {/* First + Last Name */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">First Name</label>
                      <input
                        type="text"
                        required
                        className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                        id="checkout-first-name"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">Last Name</label>
                      <input
                        type="text"
                        required
                        className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                        id="checkout-last-name"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">Shipping Address</label>
                    <input
                      type="text"
                      placeholder="Street, Suite, Apartment"
                      required
                      className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                      id="checkout-address"
                    />
                  </div>

                  {/* City + Postal Code */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">City</label>
                      <input
                        type="text"
                        required
                        className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                        id="checkout-city"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">Postal Code</label>
                      <input
                        type="text"
                        required
                        className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                        id="checkout-postal"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 2. Payment Selection ── */}
              <section>
                <h2 className="flex items-center gap-2 text-lg font-bold text-[#6B3D1E] ">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6B3D1E]/10 text-xs font-bold text-[#6B3D1E]">2</span>
                  Payment Selection
                </h2>

                {/* Payment Method Selector */}
                <div className="mt-6 flex items-center gap-3 border-b-2 border-[#3B2208]/12 pb-4">
                  <CreditCard className="h-5 w-5 text-[#3B2208]/50" />
                  <span className="text-sm font-medium text-[#3B2208]">
                    Credit or <span className="underline underline-offset-2">Debit Card</span>
                  </span>
                  <div className="ml-auto flex gap-1.5">
                    <div className="h-6 w-9 rounded bg-[#1a1f71] flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white italic">VISA</span>
                    </div>
                    <div className="h-6 w-9 rounded bg-[#252525] flex items-center justify-center">
                      <span className="text-[7px] font-bold text-white">MC</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-5">
                  {/* Card Number */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 pr-10 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                        id="checkout-card"
                      />
                      <Lock className="absolute right-0 bottom-3 h-4 w-4 text-[#3B2208]/20" />
                    </div>
                  </div>

                  {/* Expiry + CVC */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                        id="checkout-expiry"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#3B2208]/40">Security Code</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        className="mt-1.5 w-full border-b-2 border-[#3B2208]/12 bg-transparent pb-2.5 text-sm text-[#3B2208] placeholder:text-[#3B2208]/25 focus:border-[#6B3D1E]/40 focus:outline-none transition-colors"
                        id="checkout-cvc"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Submit Button ── */}
              <div className="space-y-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-full bg-[#6B3D1E] text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#5A3218] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  id="confirm-pay"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm and Pay Securely'}
                </button>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3B2208]/35">
                    <ShieldCheck className="h-3.5 w-3.5" /> Encrypted Connection
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3B2208]/35">
                    <Lock className="h-3.5 w-3.5" /> Quality Guaranteed
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════
                RIGHT: Order Summary
                ═══════════════════════════ */}
            <aside className="lg:sticky lg:top-32 h-fit">
              <div className="rounded-2xl border border-[#3B2208]/8 bg-[#F8F1E4] p-6 sm:p-8">
                <h2 className="text-xl font-bold text-[#3B2208] ">Your Selection</h2>

                {/* Cart Items */}
                <div className="mt-6 space-y-5 divide-y divide-[#3B2208]/6">
                  {items.map((item) => {
                    const variant = item.product.variants.find((v) => v.weight === item.selectedVariant);
                    const price = variant?.price ?? item.product.price;
                    return (
                      <div key={`${item.product.id}-${item.selectedVariant}`} className="flex gap-4 pt-5 first:pt-0">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#F0E6D3]">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-bold text-[#3B2208] leading-tight">{item.product.name}</h4>
                            <span className="text-sm font-bold text-[#6B3D1E] flex-shrink-0">{formatPrice(price * item.quantity)}</span>
                          </div>
                          <p className="mt-0.5 text-[11px] uppercase tracking-wider text-[#3B2208]/35">
                            {item.selectedVariant}
                          </p>
                          <p className="mt-1 text-xs text-[#3B2208]/40">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-2.5 border-t border-[#3B2208]/8 pt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#3B2208]/55">Subtotal</span>
                    <span className="font-semibold text-[#3B2208]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#3B2208]/55">Bespoke Shipping</span>
                    <span className="font-medium text-[#6B3D1E] italic text-xs">{shippingLabel}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#3B2208]/8">
                    <span className="text-base font-semibold text-[#3B2208]">Total</span>
                    <span className="text-2xl font-bold text-[#3B2208]">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Quality Note */}
                <div className="mt-6 rounded-xl border border-[#3B2208]/6 bg-[#F8F1E4] p-4">
                  <p className="text-xs italic leading-relaxed text-[#3B2208]/45">
                    &ldquo;Each spice in your selection is hand-picked at peak potency.
                    We prepare your shipment in climate-controlled conditions to preserve
                    the volatile aromatic oils that define the Leela&rsquo;s experience.&rdquo;
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
}
