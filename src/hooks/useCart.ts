'use client';

import { useCartStore } from '@/store/cartStore';
import { ProductType } from '@/types';

export function useCart() {
  const store = useCartStore();

  return {
    items: store.items,
    isOpen: store.isOpen,
    totalItems: store.totalItems(),
    totalPrice: store.totalPrice(),
    addItem: (product: ProductType, variant?: string) =>
      store.addItem(product, variant),
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    toggleCart: store.toggleCart,
    openCart: store.openCart,
    closeCart: store.closeCart,
  };
}
