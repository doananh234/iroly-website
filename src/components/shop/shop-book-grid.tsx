/**
 * Shop book grid with sort toolbar and pagination.
 * Delegates rendering and client-side "Load 24 more" to ShopBookGridClient.
 */
import { ShopBookGridClient } from "./shop-book-grid-client";
import type { FallbackBook } from "@/data/fallback";

interface ShopBookGridProps {
  books: FallbackBook[];
  totalCount: number;
}

export function ShopBookGrid({ books, totalCount }: ShopBookGridProps) {
  return <ShopBookGridClient books={books} totalCount={totalCount} />;
}
