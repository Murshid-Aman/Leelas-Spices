'use client';

import { useWishlistStore } from '@/store/wishlistStore';
import { ProductType } from '@/types';

export function useWishlist() {
  const store = useWishlistStore();

  return {
    items: store.items,
    totalItems: store.items.length,
    addItem: store.addItem,
    removeItem: store.removeItem,
    toggleItem: store.toggleItem,
    isInWishlist: store.isInWishlist,
    clearWishlist: store.clearWishlist,
  };
}
