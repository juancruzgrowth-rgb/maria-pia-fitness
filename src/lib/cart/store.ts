"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PRODUCTS, type Currency } from "@/lib/products";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  currency: Currency;
  isOpen: boolean;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  setCurrency: (currency: Currency) => void;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      currency: "ARS",
      isOpen: false,
      addItem: (productId) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === productId,
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { productId, quantity: 1 }],
            isOpen: true,
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.productId !== productId)
              : state.items.map((item) =>
                  item.productId === productId ? { ...item, quantity } : item,
                ),
        })),
      setCurrency: (currency) => set({ currency }),
      setOpen: (isOpen) => set({ isOpen }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "mp-cep-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        currency: state.currency,
      }),
    },
  ),
);

export interface CartLine {
  productId: string;
  quantity: number;
  name: string;
  duration: string;
  unitPrice: number;
  lineTotal: number;
}

export function getCartLines(
  items: CartItem[],
  currency: Currency,
): CartLine[] {
  return items
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) return null;
      const unitPrice = product.prices[currency];
      return {
        productId: item.productId,
        quantity: item.quantity,
        name: product.name,
        duration: product.duration,
        unitPrice,
        lineTotal: unitPrice * item.quantity,
      };
    })
    .filter((line): line is CartLine => line !== null);
}

export function getCartTotal(items: CartItem[], currency: Currency): number {
  return getCartLines(items, currency).reduce(
    (sum, line) => sum + line.lineTotal,
    0,
  );
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
