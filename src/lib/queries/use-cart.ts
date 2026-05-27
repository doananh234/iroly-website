"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next/client";
import type { CartItem } from "@/types";

const CART_COOKIE = "iroly-cart";

function readCart(): CartItem[] {
  try {
    const raw = getCookie(CART_COOKIE);
    if (!raw) return [];
    return JSON.parse(raw as string) as CartItem[];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  setCookie(CART_COOKIE, JSON.stringify(items), { maxAge: 60 * 60 * 24 * 30 });
}

export function useCart() {
  const queryClient = useQueryClient();
  const cartKey = ["cart"];

  const { data: items = [] } = useQuery({
    queryKey: cartKey,
    queryFn: readCart,
    staleTime: 0,
  });

  const addMutation = useMutation({
    mutationFn: async (bookId: string) => {
      const current = readCart();
      const existing = current.find((item) => item.bookId === bookId);
      let updated: CartItem[];
      if (existing) {
        updated = current.map((item) =>
          item.bookId === bookId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        updated = [...current, { bookId, quantity: 1 }];
      }
      writeCart(updated);
      return updated;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(cartKey, data);
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (bookId: string) => {
      const current = readCart();
      const updated = current.filter((item) => item.bookId !== bookId);
      writeCart(updated);
      return updated;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(cartKey, data);
    },
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      writeCart([]);
      return [];
    },
    onSuccess: (data) => {
      queryClient.setQueryData(cartKey, data);
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ bookId, quantity }: { bookId: string; quantity: number }) => {
      const current = readCart();
      let updated: CartItem[];
      if (quantity <= 0) {
        updated = current.filter((item) => item.bookId !== bookId);
      } else {
        updated = current.map((item) =>
          item.bookId === bookId ? { ...item, quantity } : item,
        );
      }
      writeCart(updated);
      return updated;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(cartKey, data);
    },
  });

  return {
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    add: (bookId: string) => addMutation.mutate(bookId),
    remove: (bookId: string) => removeMutation.mutate(bookId),
    clear: () => clearMutation.mutate(),
    updateQuantity: (bookId: string, quantity: number) =>
      updateQuantityMutation.mutate({ bookId, quantity }),
  };
}
