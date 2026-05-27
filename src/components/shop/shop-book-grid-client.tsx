"use client";
/**
 * Client wrapper for ShopBookGrid that manages visible count state.
 * Renders book grid with client-side "Load 24 more" pagination.
 */
import { useState } from "react";
import { useTranslations } from "next-intl";
import { BookCard } from "@/components/book-card";
import type { FallbackBook } from "@/data/fallback";

const PAGE_SIZE = 24;

interface ShopBookGridClientProps {
  books: FallbackBook[];
  totalCount: number;
}

export function ShopBookGridClient({ books, totalCount }: ShopBookGridClientProps) {
  const t = useTranslations("shop");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleBooks = books.slice(0, visibleCount);
  const hasMore = visibleCount < books.length;
  const shown = visibleBooks.length;

  return (
    <div>
      {/* Toolbar row */}
      <div
        className="mb-[18px] flex items-baseline justify-between"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="text-[13px]" style={{ color: "var(--iroly-fg-muted)" }}>
          {t("toolbar.showingRange", { shown, total: totalCount })}
        </div>
        <div className="flex items-center gap-2 text-[13px]" style={{ color: "var(--iroly-fg-muted)" }}>
          {t("toolbar.view")}:
          <button
            className="flex items-center justify-center rounded p-1 hover:bg-black/5"
            aria-label="Grid view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Book grid — 3 cols (comfy) */}
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {visibleBooks.map((book) => (
            <BookCard
              key={book.id}
              href={`/shop/${book.id}`}
              book={{
                id: book.id,
                title: book.title,
                series: book.series,
                coverUrl: book.coverUrl,
                price: book.price,
                oldPrice: book.oldPrice ?? undefined,
                badge: book.badge ?? undefined,
                backgroundColor: book.backgroundColor,
                difficulty: book.difficulty,
                specifications: { pages: book.pages },
              }}
              density="comfy"
            />
        ))}
      </div>

      {/* Load more — hidden when all books are shown */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--iroly-border)] bg-[var(--iroly-card)] px-6 py-3 text-[14px] font-bold text-[var(--iroly-fg)] hover:bg-black/5"
            style={{ cursor: "pointer", fontFamily: "inherit" }}
          >
            {t("toolbar.loadMoreCount", { count: PAGE_SIZE })}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
