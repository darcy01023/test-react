import { create } from "zustand";
import type { Product } from "../types/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  items: CartItem[];

  addItem: (product: Product) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;

  getQuantity: (productId: string) => number;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product._id === product._id,
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        items: [...state.items, { product, quantity: 1 }],
      };
    }),

  increment: (productId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    })),

  decrement: (productId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    })),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.product._id !== productId,
      ),
    })),

  clearCart: () => set({ items: [] }),

  getQuantity: (productId) => {
    const item = get().items.find(
      (item) => item.product._id === productId,
    );

    return item?.quantity ?? 0;
  },

  getTotalQuantity: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ),
}));