'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductType } from '@/types';

interface WishlistState {
  items: ProductType[];
  addItem: (product: ProductType) => void;
  removeItem: (id: string) => void;
  toggleItem: (product: ProductType) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const { items } = get();
        if (!items.find((item) => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      
      toggleItem: (product) => {
        const { items, addItem, removeItem } = get();
        if (items.find((item) => item.id === product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },
      
      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'leelas-wishlist',
    }
  )
);
