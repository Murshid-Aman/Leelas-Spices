import { create } from 'zustand';
import { CartItem, ProductType } from '@/types';
import { MAX_CART_ITEMS } from '@/lib/constants';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: ProductType, variant?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, variant) => {
    const { items } = get();
    const selectedVariant = variant || product.variants[0]?.weight || '';
    const existing = items.find(
      (item) =>
        item.product.id === product.id &&
        item.selectedVariant === selectedVariant,
    );

    if (existing) {
      if (existing.quantity >= MAX_CART_ITEMS) return;
      set({
        items: items.map((item) =>
          item.product.id === product.id &&
          item.selectedVariant === selectedVariant
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({
        items: [...items, { product, quantity: 1, selectedVariant }],
      });
    }
    set({ isOpen: true });
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.product.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) {
      get().removeItem(productId);
      return;
    }
    if (quantity > MAX_CART_ITEMS) return;
    set({
      items: get().items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    });
  },

  clearCart: () => set({ items: [] }),
  toggleCart: () => set({ isOpen: !get().isOpen }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: () =>
    get().items.reduce((sum, item) => {
      const variant = item.product.variants.find(
        (v) => v.weight === item.selectedVariant,
      );
      const price = variant?.price ?? item.product.price;
      return sum + price * item.quantity;
    }, 0),
}));
