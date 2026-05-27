"use client";

/**
 * useWishlist — reads/writes localStorage key "iroly-wishlist" (JSON array of bookIds).
 * SSR-safe: localStorage access is guarded.
 */

import { useState, useCallback } from "react";

const STORAGE_KEY = "iroly-wishlist";

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore storage errors
  }
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>(() => readIds());

  const isWishlisted = useCallback(
    (bookId: string): boolean => ids.includes(bookId),
    [ids],
  );

  const toggle = useCallback((bookId: string): void => {
    setIds((prev) => {
      const next = prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId];
      writeIds(next);
      return next;
    });
  }, []);

  return { isWishlisted, toggle };
}
